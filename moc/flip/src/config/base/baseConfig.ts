import 'dotenv/config';
import { CrossChainConfig, KeyPair, TokenConfig } from '../type';

const key: KeyPair = {
  pubKey: process.env.BASE_ADDRESS || '',
  privKey: process.env.BASE_PRIVATE_KEY || ''
}

const tokens: TokenConfig[] = [
  // USDC
  {
    symbol: 'USDC',
    decimal: 6,
    contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    abi: require('./abis/usdc.json')
  },
  // // rETH
  // {
  //   symbol: 'rETH',
  //   decimal: 18,
  //   contractAddress: '0xB6fe221Fe9EeF5aBa221c348bA20A1Bf5e73624c',
  //   abi: require('./abis/reth.json')
  // }
]

// const indexerMap: Map<string, IndexerInfo> = new Map();
// indexerMap.set(process.env.BASE_ADDRESS!, {
//   url: process.env.HARMONY_URL!,
//   apiKey: process.env.HARMONY_API_KEY!
// });

const baseConfig: CrossChainConfig = {
  chain: 'Base',
  rpcUrl: process.env.BASE_RPC || 'https://mainnet.base.org',
  key: key,
  funders: process.env.BASE_FUNDER ? process.env.BASE_FUNDER?.split(',') : [],
  native: false,
  tokens: tokens,
  apiKey: process.env.BASE_API_KEY!,
  indexerInfo: {
    url: process.env.HARMONY_URL!,
    apiKey: process.env.HARMONY_API_KEY!
  }
}

export default baseConfig;