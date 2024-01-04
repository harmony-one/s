import express from 'express';
import WalletManager from '../blockchain/WalletManager';

const router = express.Router();
const walletManager = new WalletManager();

router.get('/base', async (req, res) => {
  const balance = await walletManager.getBalance('base', 'USDC');
  res.send(`${balance} USDC`);
});

router.get('/harmony', async (req, res) => {
  const balance = await walletManager.getBalance('harmony');
  res.send(`${balance} ONE`);
});

export default router;
