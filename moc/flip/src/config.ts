import dotenv from 'dotenv';

dotenv.config();

// load funding address
var fundingAddress: string[] = [];
if (process.env.FUNDING_ADDRESS) {
  fundingAddress = process.env.FUNDING_ADDRESS.split(',')
    .map(address => address.toLowerCase());
}

export const config = {
  wallet: {
    ADDRESS: process.env.ADDRESS || '',
    FUNDING_ADDRESS: fundingAddress,
  },
  express: {
    PORT: process.env.PORT || 3000,
  },
  rpc: {
    HARMONY_RPC: process.env.HARMONY_RPC || 'https://api.s0.t.hmny.io',
    BASE_RPC: process.env.BASE_RPC || 'https://mainnet.base.org',
    BSC_RPC: process.env.BSC_RPC || 'https://bsc-dataseed1.binance.org'
  },
  contracts: {
    BASE_USDC: process.env.BASE_USDC || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    BSC_USDT: process.env.BSC_USDT || '0x55d398326f99059fF775485246999027B3197955'
  },
  price: {
    URL: process.env.PRICE_URL || ''
  },
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
  }
};
