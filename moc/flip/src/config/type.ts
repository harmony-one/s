// TODO: ensure the required values are loaded
interface ChainConfig {
  chain: string;
  rpcUrl: string;
  apiKey: string;
  funders: string[];
  native: boolean; // set to true if accepting native asset
}

interface HarmonyConfig extends ChainConfig {
  keys: KeyPair[];
  indexerInfo: Map<string, IndexerInfo>;
  dstChains: { [address: string]: string };
}

interface CrossChainConfig extends ChainConfig {
  key: KeyPair;
  tokens?: TokenConfig[];
  indexerInfo: IndexerInfo;
}

interface KeyPair {
  dstChain?: string, // destination chain (i.e. Base, BSC, etc)
  pubKey: string,
  privKey: string
}

interface TokenConfig {
  symbol: string,
  decimal: number,
  contractAddress: string,
  abi: any; // TODO: check type
}

interface IndexerInfo {
  url: string;
  apiKey: string;
}

export { ChainConfig, HarmonyConfig, CrossChainConfig, KeyPair, TokenConfig, IndexerInfo };