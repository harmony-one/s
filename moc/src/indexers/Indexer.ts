import { ethers } from 'ethers';
import { TransactionResponse } from '../types/customTypes';
import { query } from '../db/db';
import { getAmount } from '../utils/price';
import { getDstAsset, getDstChain } from '../utils/chain';
import { config } from '../config';

// TODO: uniformed logging
export interface ExtendedTransactionResponse extends TransactionResponse {
  amount?: ethers.BigNumber;
}

abstract class Indexer {
  // TODO: accessibility
  // TODO: remove dstChain and asset
  public txs: ExtendedTransactionResponse[] = [];
  protected provider: ethers.providers.JsonRpcProvider;
  protected lastBlockNum: number | null = null;
  private chain: string;
  private dstChain: string;
  private asset: string;
  private interval: number;

  constructor(chain: string, dstChain: string, asset: string, rpc: string, interval: number = 5000) {
    this.provider = new ethers.providers.JsonRpcProvider(rpc);
    this.chain = chain;
    this.dstChain = dstChain;
    this.asset = asset;
    this.interval = interval;
  }

  public getTxs(): ExtendedTransactionResponse[] {
    return this.txs;
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

  public async start() {
    this.log('Starting Indexer');

    setInterval(async () => {
      const newTxs = await this.fetchTxs();
      for (const tx of newTxs) {
        try {
          this.log('Handle Tx:', tx.hash);
          const dstTx = await this.handleTx(tx);
          await this.saveTx(tx, dstTx);

        } catch (error) {
          this.error(`Failed to process transaction ${tx.hash}`, error as Error);
        }
      }
    }, this.interval);
  }

  protected abstract fetchTxs(): Promise<ExtendedTransactionResponse[]>;

  protected abstract handleTx(tx: ExtendedTransactionResponse): Promise<ExtendedTransactionResponse>;

  protected getAmount(tx: TransactionResponse): number {
    return getAmount(tx, this.dstChain);
  }

  protected async saveTx(tx: ExtendedTransactionResponse, dstTx: ExtendedTransactionResponse): Promise<void> {
    try {
      const insertQuery = `
      INSERT INTO transactions (address, src_chain, src_hash, dst_chain, dst_hash, asset, amount) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;

      await query(insertQuery, [tx.from, this.chain, tx.hash, getDstChain(this.chain), dstTx.hash, getDstAsset(this.chain), this.getAmount(dstTx)]);
      this.log('Transaction saved:', tx.hash);
    } catch (error) {
      this.error('Failed to save transaction', error as Error);
    }
  }

  protected isFundingTx(address: string): boolean {
    return config.wallet.FUNDING_ADDRESS.includes(address);
  }
}

export default Indexer;
