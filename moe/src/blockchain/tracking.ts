import { ethers } from 'ethers';
import TxTracker from './TxTracker';

interface NetworkTracker {
  tracker: TxTracker;
  transactions: ethers.providers.TransactionResponse[];
}

const HARMONY_RPC = process.env.HARMONY_RPC || 'https://api.s0.b.hmny.io';
const BASE_RPC = process.env.BASE_RPC || 'https://mainnet.base.org';
const ADDRESS = process.env.ADDRESS || '';

const harmonyTracker: NetworkTracker = {
  tracker: new TxTracker(HARMONY_RPC, ADDRESS, 'harmony'),
  transactions: []
};

const baseTracker: NetworkTracker = {
  tracker: new TxTracker(BASE_RPC, ADDRESS, 'base'),
  transactions: []
};

export const networkTrackers = {
  'harmony': harmonyTracker,
  'base': baseTracker
};
