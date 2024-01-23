import { BASE, BSC, HARMONY, HarmonyConfig, IndexerInfo, KeyPair } from './type';

const keys: KeyPair[] = [
  {
    dstChain: BASE,
    pubKey: process.env.BASE_ADDRESS || '',
    privKey: process.env.BASE_PRIVATE_KEY || '',
  },
  {
    dstChain: BSC,
    pubKey: process.env.BSC_ADDRESS || '',
    privKey: process.env.BSC_PRIVATE_KEY || '',
  }
  // add other chains
];

const indexerMap: Map<string, IndexerInfo> = new Map();

// Base
indexerMap.set(process.env.BASE_ADDRESS!, {
  url: process.env.BASE_URL!,
  apiKey: process.env.BASE_API_KEY!
});

// BSC
indexerMap.set(process.env.BSC_ADDRESS!, {
  url: process.env.BSC_URL!,
  apiKey: process.env.BSC_API_KEY!
});

const harmonyConfig: HarmonyConfig = {
  chain: HARMONY,
  rpcUrl: process.env.HARMONY_RPC || 'https://api.s0.t.hmny.io',
  keys: keys,
  funders: process.env.HARMONY_FUNDER ? process.env.HARMONY_FUNDER?.split(',') : [],
  native: true,
  dstChains: {
    'Base': keys[0].pubKey,
    'BSC': keys[1].pubKey
  },
  apiKey: process.env.HARMONY_API_KEY!,
  indexerInfo: indexerMap
}

export default harmonyConfig;