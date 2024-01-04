import express from 'express';
import 'dotenv/config';
import { ethers } from 'ethers';
import balanceRoutes from './routes/balanceRoutes';
import transactionRoutes from './routes/transactionRoutes';
import { networkTrackers } from './blockchain/tracking';
import WalletManager from './blockchain/WalletManager';

const app = express();
const port = process.env.PORT || 3000;
const INTERVAL = 5000; // 5 seconds

const walletManager = new WalletManager();

setInterval(async () => {
  Object.entries(networkTrackers).forEach(async ([key, network]) => {
    console.log(`Fetching transaction for ${key}`);
    try {
      const newTxs = await network.tracker.fetchTxs();
      network.transactions.push(...newTxs);

      for (const tx of newTxs) {
        if (key === 'harmony' && tx.to && tx.to.toLowerCase() === network.tracker.address.toLowerCase()) {
          // if ONE is received on Harmony, send USDC on Base

          console.log(`Received ${ethers.utils.formatEther(tx.value)} ONE on Harmony from ${tx.from}`);
          console.log(`Preparing to send equivalent USDC to ${tx.from} on Base network`);

          // send USDC on Base
          await walletManager.sendUSDC(tx.from, tx.value);
          console.log(`Sent equivalent USDC to ${tx.from} on Base network`);
        } else if (key === 'base') {
          // if USDC is received on Base, send ONE on Harmony
          // TODO: finish logic
          // await walletManager.sendONE(tx.from, tx.amount);
        }
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  });
}, INTERVAL);

app.use('/balance', balanceRoutes);
app.use('/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Minimal-on-Chain (MoE) Services via .country Calldata for Swaps & Bridges');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
