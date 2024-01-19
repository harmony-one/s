import 'dotenv/config';
import { ChainConfig, KeyPair, TokenConfig } from '../type';

const key: KeyPair = {
  pubKey: process.env.BASE_ADDRESS || '',
  privKey: process.env.BASE_PRIVATE_KEY || ''
}

function loadFunders(): string[] {
  if (process.env.BASE_FUNDER) {
    return process.env.BASE_FUNDER?.split(',');
  }
  return [];
}

const tokens: TokenConfig[] = [
  // USDC
  {
    symbol: 'USDC',
    decimal: 6,
    contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    abi: require('./abis/usdc.json')
  },
  // DAI
  {
    symbol: 'rETH',
    decimal: 18,
    contractAddress: '0xB6fe221Fe9EeF5aBa221c348bA20A1Bf5e73624c',
    abi: require('./abis/rETH.json')
  }
]

const baseConfig: ChainConfig = {
  chain: 'Base',
  rpcUrl: process.env.BASE_RPC || 'https://mainnet.base.org',
  keys: key,
  funders: loadFunders(),
  native: false,
  tokens: tokens,
}

export default baseConfig;