// direct interactions with the blockchain, such as sending and receiving funds, and querying balances

// TODO: generalize for any network

import 'dotenv/config';
import { BigNumber, ethers } from 'ethers';
import BASE_USDC_ABI from '../abis/base_usdc.json';

type TransactionReceipt = ethers.providers.TransactionReceipt;

const BASE_USDC_ADDR = process.env.BASE_USDC || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

const RPCS = {
  'harmony': process.env.HARMONY_RPC || 'https://api.s0.b.hmny.io',
  'base': process.env.BASE_RPC || 'https://mainnet.base.org'
}

class WalletManager {
  private wallets: Map<string, ethers.Wallet>;

  constructor() {
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('Private key not found');
    }

    this.wallets = new Map<string, ethers.Wallet>();
    Object.entries(RPCS).forEach(([key, rpcUrl]) => {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const wallet = new ethers.Wallet(privateKey, provider);
      this.wallets.set(key, wallet);
    });
  }

  async getBalance(network: string, tokenType?: string): Promise<number> {
    // normalize
    tokenType = tokenType?.toLowerCase();

    if (tokenType && tokenType !== 'usdc') {
      throw new Error(`Unsupported token type: ${tokenType}`);
    }

    if (!this.wallets.has(network)) {
      throw new Error(`Unsupported network: ${network}`);
    }

    if (tokenType === 'usdc') {
      const baseWallet = this.wallets.get('base');
      if (!baseWallet) {
        throw new Error('Base wallet not found');
      }

      const contract = new ethers.Contract(BASE_USDC_ADDR, BASE_USDC_ABI, baseWallet);
      const address = await baseWallet.getAddress();
      const balance = await contract.balanceOf(address);
      return parseFloat(ethers.utils.formatUnits(balance, 6));
    } else {
      // balance of native token
      const harmonyWallet = this.wallets.get('harmony');
      if (!harmonyWallet) {
        throw new Error('Harmony wallet not found');
      }

      const balance = await harmonyWallet.getBalance();
      return parseFloat(ethers.utils.formatEther(balance));
    }
  }

  // TODO: return transaction
  async sendUSDC(toAddr: string, amountInOne: BigNumber): Promise<void> {
    const usdcAmount = this.getUsdcPrice(amountInOne);
    const baseWallet = this.wallets.get('base');
    if (!baseWallet) {
      throw new Error('Base wallet not found');
    }

    const contract = new ethers.Contract(BASE_USDC_ADDR, BASE_USDC_ABI, baseWallet);
    await contract.transfer(toAddr, usdcAmount);
  }

  // TODO: return transaction
  async sendONE(toAddress: string, amountInUSDC: BigNumber): Promise<void> {
    const oneAmount = this.getOnePrice(amountInUSDC);
    const harmonyWallet = this.wallets.get('harmony');
    if (!harmonyWallet) {
      throw new Error('Harmony wallet not found');
    }

    await harmonyWallet.sendTransaction({
      to: toAddress,
      value: oneAmount
    });
  }

  // TODO: use binance.us price
  // NOTE: assumes 1 ONE = 0.02 USDC 
  getOnePrice(amountInUSDC: BigNumber): BigNumber {
    const conversionRate = ethers.utils.parseUnits('0.02', 6);
    return amountInUSDC.mul(ethers.utils.parseUnits('1', 18)).div(conversionRate);
  }

  getUsdcPrice(amountInONE: BigNumber): BigNumber {
    const conversionRate = ethers.utils.parseUnits('0.02', 6);
    return amountInONE.mul(conversionRate).div(ethers.utils.parseUnits('1', 18));
  }

  // async sendTokens(toAddr: string, amount: number, tokenType?: string): Promise<TransactionReceipt | ethers.ContractTransaction> {
  //   if (tokenType && tokenType !== 'ONE' && tokenType !== 'USDC') {
  //     throw new Error(`Unsupported token type: ${tokenType}`);
  //   }

  //   if (tokenType === 'USDC') {
  //     const baseWallet = this.wallets.get('base');
  //     if (!baseWallet) {
  //       throw new Error('Base wallet not found');
  //     }

  //     const contract = new ethers.Contract(BASE_USDC_ADDR, BASE_USDC_ABI, baseWallet);
  //     const transaction = await contract.transfer(toAddr, ethers.utils.parseUnits(amount.toString(), 6));
  //     return transaction.wait();
  //   } else {
  //     const harmonyWallet = this.wallets.get('harmony');
  //     if (!harmonyWallet) {
  //       throw new Error('Harmony wallet not found');
  //     }

  //     const transaction = await harmonyWallet.sendTransaction({
  //       to: toAddr,
  //       value: ethers.utils.parseEther(amount.toString())
  //     });
  //     return transaction.wait();
  //   }
  // }

}

export default WalletManager;