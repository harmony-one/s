import { BASE, CrossChainConfig, HARMONY, KeyPair, TokenConfig } from '../type';
import usdc from './abis/usdc.json';

const key: KeyPair = {
  pubKey: process.env.BASE_ADDRESS || '',
  privKey: process.env.BASE_PRIVATE_KEY || '',
  dstChain: HARMONY
}

const tokens: TokenConfig[] = [
  // USDC
  {
    symbol: 'USDC',
    decimal: 6,
    contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    abi: usdc
  },
  // // rETH
  // {
  //   symbol: 'rETH',
  //   decimal: 18,
  //   contractAddress: '0xB6fe221Fe9EeF5aBa221c348bA20A1Bf5e73624c',
  //   abi: require('./abis/reth.json')
  // }
]

const baseConfig: CrossChainConfig = {
  chain: BASE,
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