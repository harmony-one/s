import 'dotenv/config';
import { BSC, CrossChainConfig, HARMONY, KeyPair, TokenConfig } from '../type';
import usdt from './abis/usdt.json';

const key: KeyPair = {
  pubKey: process.env.BSC_ADDRESS || '',
  privKey: process.env.BSC_PRIVATE_KEY || '',
  dstChain: HARMONY
}

const tokens: TokenConfig[] = [
  // USDT
  {
    symbol: 'USDT',
    decimal: 18,
    contractAddress: '0x55d398326f99059fF775485246999027B3197955',
    abi: usdt
  }
];

const bscConfig: CrossChainConfig = {
  chain: BSC,
  rpcUrl: process.env.BSC_RPC || 'https://bsc-dataseed.binance.org',
  key: key,
  funders: process.env.BSC_FUNDER ? process.env.BSC_FUNDER?.split(',') : [],
  native: false,
  tokens: tokens,
  apiKey: process.env.BSC_API_KEY!,
  indexerInfo: {
    url: process.env.HARMONY_URL!,
    apiKey: process.env.HARMONY_API_KEY!
  }
}

export default bscConfig;