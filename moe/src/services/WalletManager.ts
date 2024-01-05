import { BigNumber, ethers } from 'ethers';
import { TransactionResponse } from '../types/customTypes';

// TODO: add logger

// TODO: get estimated gas pricec
const HARMONY_GAS_LIMIT = '40000';

class WalletManager {
  private wallet: ethers.Wallet;
  private harmonyProvider: ethers.providers.JsonRpcProvider;
  private baseProvider: ethers.providers.JsonRpcProvider;
  private baseTokenContract: ethers.Contract;

  constructor(harmonyRpcUrl: string, baseRpcUrl: string, baseTokenAbi: any, baseTokenAddress: string) {
    this.harmonyProvider = new ethers.providers.JsonRpcProvider(harmonyRpcUrl);
    this.baseProvider = new ethers.providers.JsonRpcProvider(baseRpcUrl);

    if (!process.env.PRIVATE_KEY) {
      throw new Error("Private key not defined");
    }

    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.harmonyProvider);
    this.baseTokenContract = new ethers.Contract(baseTokenAddress, baseTokenAbi, this.wallet.connect(this.baseProvider));
  }

  // TODO: use binance.us price
  // NOTE: assumes 1 ONE = 0.02 USDC 
  public convertTokenToOne(amount: BigNumber): BigNumber {
    const conversionRate = ethers.utils.parseUnits('0.02', 6);
    return amount.mul(ethers.utils.parseUnits('1', 18)).div(conversionRate);
  }

  // TODO: use binance.us price
  // NOTE: assumes 1 ONE = 0.02 USDC 
  public convertOneToToken(amount: BigNumber): BigNumber {
    const conversionRate = ethers.utils.parseUnits('0.02', 6);
    return amount.mul(conversionRate).div(ethers.utils.parseUnits('1', 18));
  }

  // TODO: handle reverted tx
  public async sendOne(address: string, amount: BigNumber): Promise<TransactionResponse> {
    const MIN_GAS_PRICE = ethers.utils.parseUnits('100', 'gwei'); // 100 GWEI
    const txRequest = {
      to: address,
      value: amount,
      gasPrice: MIN_GAS_PRICE
    };

    try {
      // estimate the gas limit
      let estimatedGasLimit = await this.wallet.estimateGas(txRequest);

      // include the estimated gas limit in the transaction
      const tx = {
        ...txRequest,
        gasLimit: estimatedGasLimit
      };

      return await this.wallet.sendTransaction(tx);
    } catch (error) {
      // check if the error is due to insufficient gas
      try {
        const tx = {
          ...txRequest,
          gasLimit: ethers.utils.hexlify(40000) // setting gas limit to 25000
        };
        return await this.wallet.sendTransaction(tx);
      } catch (secondError) {
        throw new Error(`Failed to send ONE even with adjusted gas limit: ${secondError}`);
      }
    }
  }

  // TODO: handle reverted tx
  public async sendToken(address: string, amount: BigNumber): Promise<TransactionResponse> {
    try {
      const estimatedGasLimit = await this.baseTokenContract.estimateGas.transfer(address, amount);
      const gasLimit = estimatedGasLimit.add(ethers.utils.parseUnits('10000', 'wei')); // buffer
      const tx = await this.baseTokenContract.transfer(address, amount, { gasLimit: gasLimit });
      return tx;
    } catch (error) {
      throw new Error(`Failed to send USDC: ${error}`);
    }
  }

  public getTokenContract(): ethers.Contract {
    return this.baseTokenContract;
  }
}

export default WalletManager;
