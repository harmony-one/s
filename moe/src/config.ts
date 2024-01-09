import dotenv from 'dotenv';

dotenv.config();

export const config = {
  wallet: {
    ADDRESS: process.env.ADDRESS || '0xbf033d91fa2a37e14aca24e2c06c2f041be7ae38',
  },
  express: {
    PORT: process.env.PORT || 3000,
  },
  rpc: {
    HARMONY_RPC: process.env.HARMONY_RPC || 'https://api.s0.t.hmny.io',
    BASE_RPC: process.env.BASE_RPC || 'https://mainnet.base.org',
  },
  contracts: {
    BASE_USDC: process.env.BASE_USDC || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
  price: {
    URL: process.env.PRICE_API || ''
  }
};
