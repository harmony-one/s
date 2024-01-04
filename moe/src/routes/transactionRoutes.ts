import express from 'express';
import { networkTrackers } from '../blockchain/tracking';

const router = express.Router();

router.get('/harmony', (req, res) => {
  res.json(networkTrackers.harmony.transactions);
});

router.get('/base', (req, res) => {
  res.json(networkTrackers.base.transactions);
});

export default router;
