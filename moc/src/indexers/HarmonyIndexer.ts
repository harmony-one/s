import Indexer from "./Indexer";
import {DBTransaction, TransactionResponse} from "../types/customTypes";
import {config} from "../config";
import {HARMONY, walletManager} from "../server";
import {convertOneToToken} from "../utils/price";
import {isAddrEqual} from "../utils/chain";
import {BigNumber} from "ethers";

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

  protected async handleTx(tx: DBTransaction): Promise<TransactionResponse> {
    const amount = convertOneToToken(BigNumber.from(tx.amount));
    return await walletManager.sendToken(tx.address, amount) as TransactionResponse
  }
}

export default HarmonyIndexer;
