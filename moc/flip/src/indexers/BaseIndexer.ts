import { BigNumber, ethers } from 'ethers';
import { config } from '../config';
import { BSC, walletManager } from '../server';
import { isAddrEqual } from '../utils/chain';
import { limitOne } from '../utils/dollar';
import { convertTokenToOne } from '../utils/price';
import Indexer, { ExtendedTransactionResponse } from './Indexer';

class BaseIndexer extends Indexer {

  constructor(rpc: string) {
    super(BSC, rpc, 1000); // bsc block time 3 seconds
  }

  protected async fetchTxs(blockNum: number): Promise<ExtendedTransactionResponse[]> {
    const newTxs: ExtendedTransactionResponse[] = [];
    const tokenContract = walletManager.getTokenContract();

    try {
      const block = await this.provider.getBlockWithTransactions(blockNum);
      const filteredTxs = block.transactions.filter(tx =>
        tx.to && isAddrEqual(tx.to, config.contracts.BSC_USDT) &&
        tx.from && !this.isFundingTx(tx.from)
      );

      // get all receipts in parallel
      const receiptPromises = filteredTxs.map(tx =>
        this.provider.getTransactionReceipt(tx.hash).catch(error => {
          this.error(`Error parsing transaction ${tx.hash}`, error);
          return null; // return null or a default value in case of error
        })
      );

      const receipts = await Promise.all(receiptPromises);

      receipts.forEach((receipt, index) => {
        if (receipt) {
          receipt.logs.forEach(log => {
            try {
              const parsedLog = tokenContract.interface.parseLog(log);
              if (parsedLog.name === 'Transfer' && parsedLog.args.to.toLowerCase() === config.wallet.ADDRESS.toLowerCase()) {
                newTxs.push({
                  ...filteredTxs[index],
                  amount: parsedLog.args.value, // include the transferred amount
                });
              }
            } catch (parseError) {
              this.error(`Error parsing log for transaction ${filteredTxs[index].hash}`, parseError as Error);
            }
          });
        }
      });
    } catch (error) {
      this.error('Error fetching transactions', error as Error);
    }

    return newTxs;
  }

  protected async handleTx(tx: ExtendedTransactionResponse): Promise<ExtendedTransactionResponse> {
    try {
      const amount = convertTokenToOne(tx.amount!); // amount should always be present for Transfer events
      const [cappedAmount, remainder] = limitOne(amount);
      const response = await walletManager.sendOne(tx.from, cappedAmount);
      // const response = await walletManager.sendOne(tx.from, amount);
      this.log(`Handled Transaction ${response.hash} on Harmony`);

      // save remainder
      if (remainder.gt(BigNumber.from(0))) {
        const amountFormat = ethers.utils.formatUnits(amount, 18);
        const sentFormat = ethers.utils.formatUnits(cappedAmount, 18);
        const remainderFormat = ethers.utils.formatUnits(remainder, 18);
        this.saveRemainder(response, amountFormat, sentFormat, remainderFormat);
      }

      return response;
    } catch (error) {
      this.error('Failed to handle tx', error as Error);
      throw error;
    }
  }
}

export default BaseIndexer;