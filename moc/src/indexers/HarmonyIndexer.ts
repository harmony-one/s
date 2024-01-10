import Indexer, { ExtendedTransactionResponse } from "./Indexer";
import { TransactionResponse } from "../types/customTypes";
import { config } from "../config";
import { BASE, HARMONY, walletManager } from "../server";
import { convertOneToToken } from "../utils/price";

class HarmonyIndexer extends Indexer {

  constructor(rpc: string) {
    super(HARMONY, rpc);
  }

  protected async fetchTxs(): Promise<TransactionResponse[]> {
    const newTxs: TransactionResponse[] = [];
    try {
      const currBlockNum = await this.provider.getBlockNumber();
      if (this.lastBlockNum === null) {
        this.lastBlockNum = currBlockNum - 1;
      }
      if (this.lastBlockNum + 1 < currBlockNum) {
        for (let blockNum = this.lastBlockNum + 1; blockNum <= currBlockNum; blockNum++) {
          const block = await this.provider.getBlockWithTransactions(blockNum);
          const filteredTxs = block.transactions.filter(tx => tx.to && tx.to.toLowerCase() === config.wallet.ADDRESS.toLowerCase());
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

  protected async handleTx(tx: TransactionResponse): Promise<ExtendedTransactionResponse> {
    try {
      const amount = convertOneToToken(tx.value);
      const response = await walletManager.sendToken(tx.from, amount) as TransactionResponse;
      this.log(`Handled Transaction ${response.hash} on Base`);
      return {
        ...response,
        amount
      };
    } catch (error) {
      this.error('Failed to handle tx', error as Error);
      throw error;
    }
  }
}

export default HarmonyIndexer;