import { BigNumber, ethers } from 'ethers';
import { TransactionResponse } from '../types/customTypes';

class HarmonyWalletManager {
  private wallet: ethers.Wallet;
  private provider: ethers.providers.JsonRpcProvider;

  constructor(rpcUrl: string) {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    if (!process.env.PRIVATE_KEY) {
      throw new Error("Private key not defined");
    }

    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
  }

  // TODO: use binance.us price
  // NOTE: assumes 1 ONE = 0.02 USDC 
  public convertUsdcToOne(amount: BigNumber): BigNumber {
    const conversionRate = ethers.utils.parseUnits('0.02', 6);
    return amount.mul(ethers.utils.parseUnits('1', 18)).div(conversionRate);
  }

  public async sendOne(address: string, amount: BigNumber): Promise<TransactionResponse> {
    const tx = {
      to: address,
      value: ethers.utils.parseEther(amount.toString()),
    };
    return await this.wallet.sendTransaction(tx);
  }
}

export default HarmonyWalletManager;