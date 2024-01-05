import { ethers } from 'ethers';
import { TransactionResponse } from '../types/customTypes';
import { config } from '../config';
import { BASE, HARMONY, walletManager } from '../server';

// TODO: db setup
// TODO: for erc-20 transfers, need to monitor tx sent to the contract

export interface ExtendedTransactionResponse extends TransactionResponse {
  amount?: ethers.BigNumber;
}

abstract class Indexer {
  // SECURITY: accessibility
  public txs: ExtendedTransactionResponse[];
  protected provider: ethers.providers.JsonRpcProvider;
  protected lastBlockNum: number | null;
  private chain: string;
  // private dstChain: string;
  private interval: number;

  constructor(chain: string, rpc: string, interval: number = 5000) {
    this.provider = new ethers.providers.JsonRpcProvider(rpc);
    this.txs = [];
    this.lastBlockNum = null;
    this.chain = chain;
    // this.dstChain = dstChain;
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

  public async start() {
    this.log('Starting Indexer');

    setInterval(async () => {
      const newTxs = await this.fetchTxs();
      for (const tx of newTxs) {
        try {
          this.log('Handle Tx:', tx.hash);
          this.handleTx(tx);
        } catch (error) {
          this.error(`Failed to process transaction ${tx.hash}`, error as Error);
        }
      }
    }, this.interval);
  }

  protected abstract fetchTxs(): Promise<ExtendedTransactionResponse[]>;

  // TODO: update return type
  protected abstract handleTx(tx: ExtendedTransactionResponse): any;
}

export default Indexer;
