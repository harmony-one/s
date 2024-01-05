import { ethers } from 'ethers';
import { TransactionResponse } from '../types/customTypes';
import { config } from '../config';
import { BASE, HARMONY, walletManager } from '../server';

// TODO: db setup
// TODO: for erc-20 transfers, need to monitor tx sent to the contract
class Indexer {
  // SECURITY: accessibility
  public txs: TransactionResponse[];
  protected provider: ethers.providers.JsonRpcProvider;
  protected lastBlockNum: number | null;
  private srcNetwork: string;
  private dstNetwork: string;
  private interval: number;

  constructor(srcNetwork: string, dstNetwork: string, rpc: string, interval: number = 5000) {
    this.provider = new ethers.providers.JsonRpcProvider(rpc);
    this.txs = [];
    this.lastBlockNum = null;
    this.srcNetwork = srcNetwork;
    this.dstNetwork = dstNetwork;
    this.interval = interval;
  }

  protected log(message: string) {
    console.log(`[${this.srcNetwork}Indexer] ${message}`);
  }

  protected error(message: string, error: Error) {
    console.error(`[${this.srcNetwork}Indexer] ${message}:`, error);
  }

  public async start() {
    this.log('Starting Indexer');

    setInterval(async () => {
      const newTxs = await this.fetchTxs();
      for (const tx of newTxs) {
        try {
          this.log(`GOTTEEE: ${tx}`);
          if (this.dstNetwork === BASE) {
            const amount = walletManager.convertOneToToken(tx.value);
            await walletManager.sendToken(tx.from, amount);
          } else { // BASE
            // TODO: complete the following
            // const amount = walletManager.convertTokenToOne();
            // const response = await walletManager.sendOne(tx.from, amount);
            // console.log(response);
          }
        } catch (error) {
          this.error(`Failed to process transaction ${tx.hash}`, error as Error);
        }
      }
    }, this.interval);
  }

  public async fetchTxs(): Promise<TransactionResponse[]> {
    const newTxs: TransactionResponse[] = [];
    try {
      const currBlockNum = await this.provider.getBlockNumber();
      if (this.lastBlockNum === null) {
        this.lastBlockNum = currBlockNum - 1;
      }

      if (this.lastBlockNum + 1 < currBlockNum) {
        for (let blockNum = this.lastBlockNum + 1; blockNum <= currBlockNum; blockNum++) {
          const block = await this.provider.getBlockWithTransactions(blockNum);
          const filteredTxs = block.transactions.filter(tx => tx.to && tx.to.toLowerCase() === config.wallet.ADDRESS);
          newTxs.push(...filteredTxs);
        }
        this.lastBlockNum = currBlockNum;
        this.log(`lastBlockNum updated to ${currBlockNum}`);
      }
    } catch (error) {
      this.error('Error fetching transactions', error as Error);
    }
    return newTxs;
  }
}

export default Indexer;
