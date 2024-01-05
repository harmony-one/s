import { config } from '../config';
import { BASE, walletManager } from '../server';
import Indexer, { ExtendedTransactionResponse } from './Indexer';

class BaseIndexer extends Indexer {

  constructor(rpc: string) {
    super(BASE, rpc);
  }

  protected async fetchTxs(): Promise<ExtendedTransactionResponse[]> {
    const newTxs: ExtendedTransactionResponse[] = [];
    const tokenContract = walletManager.getTokenContract();
    try {
      const currBlockNum = await this.provider.getBlockNumber();
      if (this.lastBlockNum === null) {
        this.lastBlockNum = currBlockNum - 1;
      }

      for (let blockNum = this.lastBlockNum + 1; blockNum <= currBlockNum; blockNum++) {
        const block = await this.provider.getBlockWithTransactions(blockNum);

        for (const tx of block.transactions) {
          if (tx.to && tx.to.toLowerCase() === config.contracts.BASE_USDC.toLowerCase()) {
            try {
              const receipt = await this.provider.getTransactionReceipt(tx.hash);
              receipt.logs.forEach(log => {
                const parsedLog = tokenContract.interface.parseLog(log);
                if (parsedLog.name === 'Transfer' && parsedLog.args.to.toLowerCase() === config.wallet.ADDRESS) {
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
      }

      this.lastBlockNum = currBlockNum;
      this.log(`lastBlockNum updated to ${currBlockNum}`);
    } catch (error) {
      this.error('Error fetching transactions', error as Error);
    }
    return newTxs;
  }

  protected async handleTx(tx: ExtendedTransactionResponse) {
    try {
      const amount = walletManager.convertTokenToOne(tx.amount!); // amount should always be present for Transfer events
      const response = await walletManager.sendOne(tx.from, amount);
      this.log(`Handled Transaction ${response.hash} on Harmony`);
    } catch (error) {
      this.error('Failed to handle tx', error as Error);
    }
  }
}

export default BaseIndexer;