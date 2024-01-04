import { BigNumber, ethers } from 'ethers';
import { TransactionResponse } from '../types/customTypes';

// TODO: add logger

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

  public async sendOne(address: string, amount: BigNumber): Promise<TransactionResponse> {
    try {
      const tx = {
        to: address,
        value: ethers.utils.parseEther(amount.toString()),
      };
      return await this.wallet.sendTransaction(tx);
    } catch (error) {
      throw new Error(`Failed to send ONE: ${error}`);
    }
  }

  // TODO: handle estimatedGas
  // TODO: handle reverted tx
  // TODO: update return type
  public async sendToken(address: string, amount: BigNumber): Promise<void> {
    try {
      // const estimatedGasLimit = await this.baseTokenContract.estimateGas.transfer(address, adjAmount);
      // const gasLimit = estimatedGasLimit.add(ethers.utils.parseUnits('10000', 'wei')); // buffer
      const tx = await this.baseTokenContract.transfer(address, amount, { gasLimit: '2100000' });
      return tx;
    } catch (error) {
      throw new Error(`Failed to send USDC: ${error}`);
    }
  }
}

export default WalletManager;
