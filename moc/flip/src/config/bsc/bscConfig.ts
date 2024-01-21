import 'dotenv/config';
import { CrossChainConfig, KeyPair, TokenConfig } from '../type';

const key: KeyPair = {
  pubKey: process.env.BSC_ADDRESS || '',
  privKey: process.env.BSC_PRIVATE_KEY || ''
}

const tokens: TokenConfig[] = [
  // USDT
  {
    symbol: 'USDT',
    decimal: 18,
    contractAddress: '0x55d398326f99059fF775485246999027B3197955',
    abi: require('./abis/usdt.json')
  }
];

// const indexerMap: Map<string, IndexerInfo> = new Map();
// indexerMap.set(process.env.BSC_ADDRESS!, {
//   url: process.env.HARMONY_URL!,
//   apiKey: process.env.HARMONY_API_KEY!
// });

const bscConfig: CrossChainConfig = {
  chain: 'BSC',
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