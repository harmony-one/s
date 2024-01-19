// TODO: ensure the required values are loaded

interface ChainConfig {
  chain: string;
  rpcUrl: string;
  keys: KeyPair | KeyPair[]; // multiple key pairs for Harmony
  funders: string[];
  native: boolean; // set to true if accepting native asset
  tokens?: TokenConfig[];
  dstChains?: { [address: string]: string };
}

interface KeyPair {
  dstChain?: string, // destination chain (i.e. Base, BSC, etc)
  pubKey: string,
  privKey: string
}

interface TokenConfigs {
  [address: string]: TokenConfig
}

interface TokenConfig {
  symbol: string,
  decimal: number,
  contractAddress: string,
  abi: any; // TODO: check type
}

export { ChainConfig, KeyPair, TokenConfig };