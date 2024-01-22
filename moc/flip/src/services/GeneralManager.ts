import express from 'express';
import { BigNumber, ethers } from "ethers";
import axios from "axios";
import { tokenConfigs } from "../config";
import { CrossChainConfig, HARMONY } from "../config/type";
import { convertTokenToOne, getNumberAmount } from "../utils/price";
import { indexer } from '../server';
import GeneralIndexer from '../indexers/GeneralIndexer';
import { saveTransction } from '../db/db';

class GeneralManager {
  private config: CrossChainConfig;
  private wallet: ethers.Wallet;

  constructor(config: CrossChainConfig) {
    this.config = config;
    this.wallet = new ethers.Wallet(config.key.privKey, indexer.getProvider()); // TODO: manager relies on indexer
  }

  async sendRequest(srcHash: string, dstAddress: string, walletAddress: string, tokenAddress: string, amount: BigNumber) {
    const indexerInfo = this.config.indexerInfo;
    const tokenConfig = tokenConfigs.get(tokenAddress);
    if (!tokenConfig) {
      console.error(`Token ${tokenAddress} not supported`);
      return;
    }
    const conversionAmount = convertTokenToOne(amount, tokenConfig.decimal);
    console.log(`Sender: ${dstAddress} / Wallet: ${walletAddress} / Token: ONE / Amount: ${conversionAmount.toString()}`);

    try {
      const response = await axios.post(indexerInfo.url, {
        srcHash: srcHash,
        dstAddress: dstAddress,
        walletAddress: walletAddress,
        tokenAddress: tokenAddress,
        amount: conversionAmount.toString(),
        apiKey: this.config.apiKey
      });
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

  async handleRequest(req: express.Request, res: express.Response) {
    try {
      const { srcHash, dstAddress, walletAddress, tokenAddress, amount, apiKey } = req.body;
      if (!this.verifyApiKey(apiKey)) {
        res.status(401).send('Invalid API key');
        return;
      }

      const tokenContract = (indexer as GeneralIndexer).getTokenContract(tokenAddress);
      const tokenConfig = tokenConfigs.get(tokenAddress);
      if (!tokenContract || !tokenConfig) {
        res.status(500).send(`Token ${tokenAddress} not setup`);
        return;
      }

      const provider = indexer.getProvider();
      const gasPrice = await provider.getGasPrice();
      const tx = await tokenContract
        .connect(this.wallet)
        .transfer(dstAddress, amount, { gasPrice: gasPrice });

      console.log('Handled Tx:', tx.hash);
      res.status(200).send({
        txHash: tx.hash
      });

      await saveTransction(
        dstAddress, HARMONY, srcHash, this.config.chain, tx.hash, tokenConfig.symbol, getNumberAmount(amount, tokenConfig.decimal)
      );
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).send('Internal server error');
    }
  }

  verifyApiKey(apiKey: string): boolean {
    return this.config.indexerInfo.apiKey === apiKey;
  }
}

export default GeneralManager;