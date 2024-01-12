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
  },
  contracts: {
    BASE_USDC: process.env.BASE_USDC || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
  price: {
    URL: process.env.PRICE_URL || ''
  },
  rateLimit: {
    transfer: process.env.RATE_LIMIT_TRANSFER || '10',
    address: process.env.RATE_LIMIT_ADDRESS_VALUE || '10',
    address_ttl: process.env.RATE_LIMIT_ADDRESS_TTL || '3600', // seconds
  },
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
  }
};
