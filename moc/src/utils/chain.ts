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

export { getDstChain, getDstAsset };