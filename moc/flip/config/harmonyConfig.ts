import 'dotenv/config';
import { ChainConfig, KeyPair } from './type';

const keys: KeyPair[] = [
  {
    dstChain: 'Base',
    pubKey: process.env.BASE_ADDRESS || '',
    privKey: process.env.BASE_PRIVATE_KEY || '',
  },
  {
    dstChain: 'BSC',
    pubKey: process.env.BSC_ADDRESS || '',
    privKey: process.env.BSC_PRIVATE_KEY || '',
  }
  // add other chains
];

function loadFunders(): string[] {
  if (process.env.HARMONY_FUNDERS) {
    return process.env.HARMONY_FUNDERS?.split(',');
  }
  return [];
}

const harmonyConfig: ChainConfig = {
  chain: 'Harmony',
  rpcUrl: process.env.HARMONY_RPC || 'https://api.s0.t.hmny.io',
  keys: keys,
  funders: loadFunders(),
  native: true,
  dstChains: {
    'Base': keys[0].pubKey,
    'BSC': keys[1].pubKey
  }
}

export default harmonyConfig;