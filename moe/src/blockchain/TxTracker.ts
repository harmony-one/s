// monitoring and processing transactions
import 'dotenv/config';
import { ethers } from 'ethers';

class TxTracker {

  // TODO: db
  // private db: any;

  private provider: ethers.providers.JsonRpcProvider;
  private address: string;
  private lastBlockNum: number | null;

  constructor(rpc: string, address: string) {
    this.provider = new ethers.providers.JsonRpcProvider(rpc);
    this.address = address.toLowerCase();
    this.lastBlockNum = null;
  }

  async fetchTxs() {
    let txs: ethers.providers.TransactionResponse[] = [];
    try {
      const latestBlockNum = await this.provider.getBlockNumber();
      if (this.lastBlockNum === null || this.lastBlockNum !== latestBlockNum) {
        const block = await this.provider.getBlockWithTransactions(latestBlockNum);
        const trackedTxs = block.transactions.filter(tx =>
          (tx.to && tx.to.toLowerCase() === this.address)
          || (tx.from && tx.from.toLowerCase() === this.address)
        )
        txs = trackedTxs;
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
