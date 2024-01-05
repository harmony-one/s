import { BigNumber, ethers } from 'ethers';

class BaseWalletManager {
  private wallet: ethers.Wallet;
  private provider: ethers.providers.JsonRpcProvider;
  private tokenContract: ethers.Contract;

  constructor(rpcUrl: string, abi: any, tokenAddress: string) {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    if (!process.env.PRIVATE_KEY) {
      throw new Error("Private key not defined");
    }

    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.tokenContract = new ethers.Contract(tokenAddress, abi, this.wallet);
  }

  // TODO: use binance.us price
  // NOTE: assumes 1 ONE = 0.02 USDC 
  public convertOneToToken(amount: BigNumber): BigNumber {
    const conversionRate = ethers.utils.parseUnits('0.02', 6);
    return amount.mul(conversionRate).div(ethers.utils.parseUnits('1', 18));
  }

  public async sendToken(address: string, amount: number): Promise<void> {
    await this.tokenContract.transfer(address, amount);

    // TODO: return transaction receipt
  }

  public getTokenContract(): ethers.Contract {
    return this.tokenContract;
  }
}

export default BaseWalletManager;