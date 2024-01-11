import Indexer, { ExtendedTransactionResponse } from "./Indexer";
import { TransactionResponse } from "../types/customTypes";
import { config } from "../config";
import { BASE, HARMONY, walletManager } from "../server";
import { convertOneToToken } from "../utils/price";
import { isAddrEqual } from "../utils/chain";
import { limitToken } from "../utils/dollar";

class HarmonyIndexer extends Indexer {

  constructor(rpc: string) {
    super(HARMONY, rpc);
  }

  protected async fetchTxs(blockNum: number): Promise<TransactionResponse[]> {
    const newTxs: TransactionResponse[] = [];
    try {
      const block = await this.provider.getBlockWithTransactions(blockNum);
      const filteredTxs = block.transactions.filter(tx =>
        tx.from && !this.isFundingTx(tx.from) && tx.to && isAddrEqual(tx.to, config.wallet.ADDRESS));
      newTxs.push(...filteredTxs);
    } catch (error) {
      this.error('Error fetching transactions', error as Error);
    }
    return newTxs;
  }

  protected async handleTx(tx: TransactionResponse): Promise<ExtendedTransactionResponse> {
    try {
      const amount = convertOneToToken(tx.value);
      const [cappedAmount, remainder] = limitToken(amount);
      // const response = await walletManager.sendToken(tx.from, amount) as TransactionResponse;
      const response = await walletManager.sendToken(tx.from, cappedAmount) as TransactionResponse;
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