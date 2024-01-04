import express from 'express';
import 'dotenv/config';
import TxTracker from './blockchain/TxTracker';
import { ethers } from 'ethers';

const app = express();
const port = process.env.PORT;

const INTERVAL = 5000; // 5 seconds
const RPC = process.env.HARMONY_RPC || 'https://api.s0.b.hmny.io';

const tracker = new TxTracker(RPC, "");
const txs: ethers.providers.TransactionResponse[] = [];
setInterval(async () => {
  try {
    console.log('Fetching transactions');
    const newTxs = await tracker.fetchTxs();
    txs.push(...newTxs);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}, INTERVAL);

app.get('/', (req, res) => {
  res.send('Minimal-on-Chain (MoE) Services via .country Calldata for Swaps & Bridges');
});

app.get('/harmony', (req, res) => {
  res.json(txs);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
