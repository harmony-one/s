import { BigNumber, ethers } from 'ethers';
import { config } from '../config';
import { BASE, HARMONY, walletManager } from '../server';
import { isAddrEqual } from '../utils/chain';
import { limitOne } from '../utils/dollar';
import {convertOneToToken, convertTokenToOne} from '../utils/price';
import Indexer, { ExtendedTransactionResponse } from './Indexer';
import {DBTransaction, TransactionResponse} from "../types/customTypes";

class BaseIndexer extends Indexer {

  constructor(rpc: string) {
    super(BASE, rpc);
  }

  protected async fetchTxs(blockNum: number): Promise<ExtendedTransactionResponse[]> {
    const newTxs: ExtendedTransactionResponse[] = [];
    const tokenContract = walletManager.getTokenContract();

    try {
      const block = await this.provider.getBlockWithTransactions(blockNum);
      for (const tx of block.transactions) {
        if (tx.to && isAddrEqual(tx.to, config.contracts.BASE_USDC)
          && tx.from && !this.isFundingTx(tx.from)) {
          try {
            const receipt = await this.provider.getTransactionReceipt(tx.hash);
            receipt.logs.forEach(log => {
              const parsedLog = tokenContract.interface.parseLog(log);
              if (parsedLog.name === 'Transfer' && parsedLog.args.to.toLowerCase() === config.wallet.ADDRESS.toLowerCase()) {
                newTxs.push({
                  ...tx,
                  amount: parsedLog.args.value, // include the transferred amount
                });
              }
            });
          } catch (parseError) {
            this.error(`Error parsing transaction ${tx.hash}`, parseError as Error);
          }
        }
      }
    } catch (error) {
      this.error('Error fetching transactions', error as Error);
    }

    return newTxs;
  }

  protected async handleTx(tx: DBTransaction): Promise<ExtendedTransactionResponse> {
    const amount = convertOneToToken(BigNumber.from(tx.amount));
    return await walletManager.sendToken(tx.address, amount) as TransactionResponse
  }
}

export default BaseIndexer;
