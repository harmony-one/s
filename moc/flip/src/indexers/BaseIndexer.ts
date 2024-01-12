import { BigNumber, ethers } from 'ethers';
import { config } from '../config';
import { BASE, HARMONY, walletManager } from '../server';
import { isAddrEqual } from '../utils/chain';
import { limitOne } from '../utils/dollar';
import { convertTokenToOne } from '../utils/price';
import Indexer, { ExtendedTransactionResponse } from './Indexer';

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