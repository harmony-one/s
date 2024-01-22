import app from './app';
import express from 'express';
import cors from 'cors';

// import cors from 'cors';
// import { config } from './config';
// import WalletManager from './services/WalletManager';
// // import abi from './abis/base_usdc.json';
// import abi from './abis/bsc_usdt.json';
// import HarmonyIndexer from './indexers/HarmonyIndexer';
// import BaseIndexer from './indexers/BaseIndexer';
// import priceRoutes from './routes/priceRoutes';
// import remainderRoutes from './routes/remainderRoutes';
// import { fetchPrice } from './utils/price';
// import { getAllTransactions } from './db/db';
// import { getExplorer, shortenHash } from './utils/chain';
// import { formatDate } from './utils/utils';
// import { CAP } from './utils/dollar';

// TODO: refactor ./utils/

import { chainConfig } from './config/index';
import GeneralIndexer from './indexers/GeneralIndexer';
import HarmonyIndexer from './indexers/HarmonyIndexer';
import { CrossChainConfig, HarmonyConfig } from './config/type';
import HarmonyManager from './services/HarmonyManager';
import { fetchPrice } from './utils/price';
import GeneralManager from './services/GeneralManager';
import { getAllRemainders, getAllTransactions, getChainTransactions } from './db/db';

app.use(cors());
app.use(express.json());

console.log(chainConfig);

// fetch and configure price
const fetchPriceWithInterval = async () => {
  try {
    const priceData = await fetchPrice();
    console.log('Price data fetched: ', priceData);
  } catch (error) {
    console.error('Error fetching price data:', error);
  }
};

fetchPriceWithInterval();
setInterval(fetchPriceWithInterval, 60 * 60 * 1000); // 60 minutes

export var transactionManager: GeneralManager | HarmonyManager;
export var indexer: GeneralIndexer | HarmonyIndexer;
function startServer() {
  if (chainConfig.chain === 'Harmony') {
    indexer = new HarmonyIndexer(chainConfig as HarmonyConfig);
    indexer.start();
    transactionManager = new HarmonyManager(chainConfig as HarmonyConfig);

    app.listen(3000, () => {
      console.log(`Server running on port ${3000}`);
    });
  } else if (chainConfig.chain === 'Base') {
    indexer = new GeneralIndexer(chainConfig as CrossChainConfig);
    indexer.start();
    transactionManager = new GeneralManager(chainConfig as CrossChainConfig);

    app.listen(3001, () => {
      console.log(`Server running on port ${3001}`);
    });
  } else {
    indexer = new GeneralIndexer(chainConfig as CrossChainConfig);
    indexer.start();
    transactionManager = new GeneralManager(chainConfig as CrossChainConfig);

    app.listen(3002, () => {
      console.log(`Server running on port ${3002}`);
    });
  }
}

app.post('/', async (req, res) => {
  console.log(req.body);
  await transactionManager.handleRequest(req, res);
});

app.get('/txs', async (req, res) => {
  const txs = await getChainTransactions(chainConfig.chain);
  res.json(txs);
});

app.get('/remainders', async (_, res) => {
  const remainders = await getAllRemainders();
  res.json(remainders);
})

startServer();