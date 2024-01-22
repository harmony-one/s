import express from 'express';
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { HarmonyConfig } from "../config/type";
import { convertOneToToken, getNumberAmount } from "../utils/price";
import { tokenConfigs } from "../config";
import { indexer } from '../server';
import { saveRemainder, saveTransction } from '../db/db';
import { limitToken } from '../utils/priceRateLimit';

class HarmonyManager {
  private config: HarmonyConfig;
  private walletMap: Map<string, ethers.Wallet> = new Map();
  private dstMap: Map<string, string> = new Map();

  constructor(config: HarmonyConfig) {
    this.config = config;
    config.keys.forEach(keyPair => {
      this.walletMap.set(keyPair.pubKey.toLowerCase(), new ethers.Wallet(keyPair.privKey, indexer.getProvider()));
      this.dstMap.set(keyPair.pubKey, keyPair.dstChain);
    });
  }

  async sendRequest(srcHash: string, dstAddress: string, walletAddress: string, tokenAddress: string, amount: BigNumber) {
    const indexerInfo = this.config.indexerInfo.get(walletAddress);
    if (!indexerInfo) {
      console.error(`URL mapping for ${walletAddress} does not exist`);
      return;
    }

    const tokenConfig = tokenConfigs.get(tokenAddress);
    if (!tokenConfig) {
      console.error(`Token ${tokenAddress} not supported`);
      return;
    }

    const totalAmount = convertOneToToken(amount, tokenConfig.decimal);
    const [cappedAmount, remainder, conversionRate] = limitToken(totalAmount, tokenConfig.decimal);
    console.log(`Sender: ${dstAddress} / Wallet: ${walletAddress} / Token: ${tokenConfig.symbol} / Amount: ${totalAmount} / Capped: ${cappedAmount.toString()}`);

    try {
      const data = {
        srcHash: srcHash,
        dstAddress: dstAddress,
        walletAddress: walletAddress,
        tokenAddress: tokenAddress,
        amount: cappedAmount.toString(),
        apiKey: this.config.apiKey,
        remainderInfo: {
          totalAmount: totalAmount.toString(),
          remainder: remainder.toString(),
          conversionRate: conversionRate,
        }
      };
      // const data = {
      //   srcHash: srcHash,
      //   dstAddress: dstAddress,
      //   walletAddress: walletAddress,
      //   tokenAddress: tokenAddress,
      //   amount: conversionAmount.toString(),
      //   apiKey: this.config.apiKey,
      // };
      const response = await axios.post(indexerInfo.url, data);
      // TODO: fix logging
      console.log('Completed:', response.data.txHash);
    } catch (error) {
      // TODO: revert transaction
      if (error instanceof Error) {
        console.error('Error sending request', error.message);
      } else {
        console.error('Error sending request');
      }
    }
  }

  // TODO: need to await??
  async handleRequest(req: express.Request, res: express.Response) {
    try {
      const { srcHash, dstAddress, walletAddress, tokenAddress, amount, apiKey, remainderInfo } = req.body;
      if (!this.verifyApiKey(walletAddress, apiKey)) {
        res.status(401).send('Invalid API key');
        return;
      }

      const wallet = this.walletMap.get(walletAddress.toLowerCase());
      if (!wallet) {
        res.status(500).send(`Wallet ${walletAddress} not setup`);
        return;
      }

      const minGasPrice = ethers.utils.parseUnits('100', 'gwei'); // 100 GWEI
      const txRequest = {
        to: dstAddress,
        value: BigNumber.from(amount),
        gasPrice: minGasPrice
      };

      let estimatedGasLimit = await wallet.estimateGas(txRequest);
      const tx = {
        ...txRequest,
        gasLimit: estimatedGasLimit
      };

      const txResponse = await wallet.sendTransaction(tx);
      console.log('Handled Tx:', txResponse.hash);
      res.status(200).send({
        txHash: txResponse.hash
      });

      const srcChain = this.dstMap.get(walletAddress)!;
      await saveTransction(
        dstAddress, srcChain, srcHash, this.config.chain, txResponse.hash, 'ONE', getNumberAmount(amount, 18)
      );

      const { totalAmount, remainder, conversionRate } = remainderInfo;
      if (BigNumber.from(remainder).gt(BigNumber.from(0))) {
        await saveRemainder(
          dstAddress, this.config.chain, txResponse.hash, 'ONE',
          ethers.utils.formatUnits(totalAmount, 18), ethers.utils.formatUnits(amount, 18), ethers.utils.formatUnits(remainder, 18), conversionRate
        );
      }
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).send('Internal server error');
    }
  }

  verifyApiKey(walletAddress: string, apiKey: string): boolean {
    return this.config.indexerInfo.has(walletAddress)
      && this.config.indexerInfo.get(walletAddress)?.apiKey === apiKey;
  }
}

export default HarmonyManager;