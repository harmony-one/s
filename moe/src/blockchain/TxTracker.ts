// monitoring and processing transactions
import 'dotenv/config';
import { ethers } from 'ethers';

class TxTracker {

  // TODO: db
  // private db: any;

  public network: string;
  public address: string;
  private provider: ethers.providers.JsonRpcProvider;
  private lastBlockNum: number | null;

  constructor(rpc: string, address: string, network: string) {
    this.provider = new ethers.providers.JsonRpcProvider(rpc);
    this.address = address.toLowerCase();
    this.lastBlockNum = null;
    this.network = network;
  }

  async fetchTxs(): Promise<ethers.providers.TransactionResponse[]> {
    let txs: ethers.providers.TransactionResponse[] = [];
    try {
      const latestBlockNum = await this.provider.getBlockNumber();
      if (this.lastBlockNum === null) {
        this.lastBlockNum = latestBlockNum - 1;
      }

      if (this.lastBlockNum + 1 < latestBlockNum) {
        for (let blockNum = this.lastBlockNum + 1; blockNum <= latestBlockNum; blockNum++) {
          console.log(`[TxTracker][fetchTxs] Fetching txs from block ${blockNum}`);
          const block = await this.provider.getBlockWithTransactions(blockNum);
          const trackedTxs = block.transactions.filter(tx =>
            (tx.to && tx.to.toLowerCase() === this.address) ||
            (tx.from && tx.from.toLowerCase() === this.address)
          );
          txs.push(...trackedTxs);
        }
        this.lastBlockNum = latestBlockNum;
        console.log('[TxTracker][fetchTxs] lastBlockNum updated to', latestBlockNum);
      }
    } catch (error) {
      console.error('[TxTracker][fetchTxs] Error fetching transactions:', error);
    }
    return txs;
  }

}

export default TxTracker;
