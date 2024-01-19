import 'dotenv/config';
import { ChainConfig, KeyPair, TokenConfig } from '../type';

const key: KeyPair = {
  pubKey: process.env.BSC_ADDRESS || '',
  privKey: process.env.BSC_PRIVATE_KEY || ''
}

function loadFunders(): string[] {
  if (process.env.BSC_FUNDER) {
    return process.env.BSC_FUNDER?.split(',');
  }
  return [];
}

const tokens: TokenConfig[] = [
  // USDT
  {
    symbol: 'USDT',
    decimal: 18,
    contractAddress: '0x55d398326f99059fF775485246999027B3197955',
    abi: require('./abis/usdt.json')
  }
]

const bscConfig: ChainConfig = {
  chain: 'BSC',
  rpcUrl: process.env.BSC_RPC || 'https://bsc-dataseed.binance.org',
  keys: key,
  funders: loadFunders(),
  native: false,
  tokens: tokens,
}

export default bscConfig;