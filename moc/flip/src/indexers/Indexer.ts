import { BigNumber, ethers } from 'ethers';
import {DBTransaction, TransactionResponse} from '../types/customTypes';
import {getPendingTransactions, query} from '../db/db';
import {convertOneToToken, convertTokenToOne, getAmount} from '../utils/price';
import { getDstAsset, getDstChain } from '../utils/chain';
import {PriceProvider} from "../services/PriceProvider";
import { config } from '../config';

// TODO: uniformed logging
export interface ExtendedTransactionResponse extends TransactionResponse {
  amount?: ethers.BigNumber;
  cappedAmount?: ethers.BigNumber;
  remainderAmount?: ethers.BigNumber;
  reamainderValue?: number;
}

const INTERVAL = 500 // 500 ms
const MAX_RETRIES = 3;

abstract class Indexer {
  // TODO: accessibility
  public txs: ExtendedTransactionResponse[] = [];
  protected provider: ethers.providers.JsonRpcProvider;
  protected lastBlockNum: number | null = null;
  private chain: string;
  private interval: number;
  private priceProvider = new PriceProvider()

  constructor(chain: string, rpc: string, interval: number = INTERVAL) {
    this.provider = new ethers.providers.JsonRpcProvider(rpc);
    this.chain = chain;
    this.interval = interval;
  }

  protected log(message: string, ...args: any[]) {
    let logMessage = `[${this.chain}Indexer] ${message}`;
    if (args.length > 0) {
      logMessage += `${args.map(arg => JSON.stringify(arg)).join(' ')}`;
    }
    console.log(logMessage);
  }

  protected error(message: string, error: Error) {
    console.error(`[${this.chain}Indexer] ${message}:`, error);
  }

  // TODO: look into listening to new blocks
  public async start() {
    this.log('Starting Indexer');

    this.pendingTransactionsLoop()

    const processIndexing = async () => {
      let retryCount = 0;

      while (retryCount <= MAX_RETRIES) {
        try {
          const currBlockNum = await this.fetchBlockNum();
          if (this.lastBlockNum && this.lastBlockNum < currBlockNum) {
            for (let blockNum = this.lastBlockNum + 1; blockNum <= currBlockNum; blockNum++) {
              const newTxs = await this.fetchTxs(blockNum);

              for (const tx of newTxs) {
                try {
                  this.log(`Handling Transaction: ${tx.hash}`);
                  await this.processNewTx(tx)
                } catch (error) {
                  this.error(`Failed to process transaction: {tx.hash}`, error as Error);
                }
              }
              this.lastBlockNum = blockNum;
              this.log(`Updated blockNum: ${blockNum}`);
            }
          }
          break; // break the loop on successful execution
        } catch (error) {
          this.error('Error during indexing:', error as Error);
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            this.log(`Retrying: attempt ${retryCount}/${MAX_RETRIES}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // exponential back-off
          } else {
            this.log('Max retries reached. Proceeding to next cycle.');
            break;
          }
        }
      }

      setTimeout(processIndexing, this.interval);
    }

    processIndexing();
  }

  protected async pendingTransactionsLoop() {
    try {
      await this.processPendingTransactions()
    } catch (e) {
      console.log('Error on processing pending transactions:', e)
    } finally {
      setTimeout(() => this.pendingTransactionsLoop(), 10_000)
    }
  }

  protected async processPendingTransactions() {
    const txs = await getPendingTransactions()
    for(const tx of txs) {
      const result = await this.handleTx(tx)
      this.log(`Handled Transaction ${result.hash}`);
    }
  }

  protected async fetchBlockNum(): Promise<number> {
    const currBlockNum = await this.provider.getBlockNumber();
    if (this.lastBlockNum === null) {
      this.lastBlockNum = currBlockNum - 1;
    }
    return currBlockNum;
  }

  protected abstract fetchTxs(blockNum: number): Promise<ExtendedTransactionResponse[]>;

  protected abstract handleTx(tx: DBTransaction): Promise<TransactionResponse>;

  protected async processNewTx(tx: TransactionResponse): Promise<void> {
    const amountOne = tx.value
    const amountUsd = convertOneToToken(BigNumber.from(amountOne))

    const { transfer: transferLimitUsd } = config.rateLimit
    const transfersCount = amountUsd.toNumber() / transferLimitUsd

      let amountLeft = amountOne
    const maxAmount = convertTokenToOne(BigNumber.from(transferLimitUsd))

    for(let i= 0; i < transfersCount; i++) {
      const amount = amountLeft.gt(maxAmount) ? maxAmount : amountLeft
      await this.addTxToQuery(tx, amount.toString())
      amountLeft = amountLeft.sub(amount)
    }

    this.log(`Transaction added to query: ${tx.hash}`);
  }

  protected async addTxToQuery(tx: ExtendedTransactionResponse, amount: string): Promise<void> {
    try {
      const insertQuery = `
      INSERT INTO transactions_v1 (address, src_chain, src_hash, dst_chain, dst_hash, asset, amount) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const res = await query(insertQuery, [tx.from, this.chain, tx.hash, getDstChain(this.chain), "", getDstAsset(this.chain), amount]);
    } catch (error) {
      this.error('Failed to save transaction', error as Error);
    }
  }

  public getTxs(): ExtendedTransactionResponse[] {
    return this.txs;
  }

  // TODO: check parsing;
  protected getAmount(tx: TransactionResponse): number {
    return getAmount(tx, getDstChain(this.chain));
  }

  protected isFundingTx(address: string): boolean {
    return config.wallet.FUNDING_ADDRESS.includes(address.toLowerCase());
  }
}

export default Indexer;
