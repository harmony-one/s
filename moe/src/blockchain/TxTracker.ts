// monitoring and processing transactions
import 'dotenv/config';
import { ethers } from 'ethers';

class TxTracker {
  // TODO: db
  // private db: any;

  private provider: ethers.providers.JsonRpcProvider;
  // TODO: address
  // private address: string;
  private lastBlockNum: number | null;

  constructor(rpc: string) {
    this.provider = new ethers.providers.JsonRpcProvider(rpc);
    // this.address = address;
    this.lastBlockNum = null;
  }

  async fetchTxs() {
    let txs: ethers.providers.TransactionResponse[] = [];
    try {
      const latestBlockNum = await this.provider.getBlockNumber();
      if (this.lastBlockNum === null || this.lastBlockNum !== latestBlockNum) {
        const block = await this.provider.getBlockWithTransactions(latestBlockNum);
        txs = block.transactions;
        this.lastBlockNum = latestBlockNum;
        console.log('[TxTracker][fetchTxs] lastBlockNum updated to', latestBlockNum);
      }
    } catch (error) {
      console.log('Error:', error);
    }
    return txs;
  }
}

export default TxTracker;
