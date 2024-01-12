import { BASE, HARMONY } from "../server";

function getDstChain(chain: string): string {
  if (chain === HARMONY) {
    return BASE;
  } else {
    return HARMONY;
  }
}

function getDstAsset(chain: string): string {
  if (chain === HARMONY) {
    return 'USDC';
  } else {
    return 'ONE';
  }
}

function shortenHash(hash: string): string {
  if (!hash || hash.length < 12) {
    return hash;
  }
  const firstPart = hash.slice(0, 10);
  const lastPart = hash.slice(-6);
  return `${firstPart}...${lastPart}`;
}

function getExplorer(chain: string, hash: string): string {
  if (chain === HARMONY) {
    return `https://explorer.harmony.one/tx/${hash}`;
  } else {
    return `https://basescan.org/tx/${hash}`;
  }
}

function isAddrEqual(addr1: string, addr2: string): boolean {
  return addr1.toLowerCase() === addr2.toLowerCase();
}

export { getDstChain, getDstAsset, shortenHash, getExplorer, isAddrEqual };