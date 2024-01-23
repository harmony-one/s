import app from './app';
import { chainConfig } from './config/index';
import { fetchPrice } from './utils/price';
import { BASE, BSC, CrossChainConfig, HARMONY, HarmonyConfig } from './config/type';
import GeneralIndexer from './indexers/GeneralIndexer';
import HarmonyIndexer from './indexers/HarmonyIndexer';
import HarmonyManager from './services/HarmonyManager';
import GeneralManager from './services/GeneralManager';
import { getAllRemainders, getChainTransactions } from './db/db';

const PRICE_FETCH_INTERVAL = 60 * 60 * 1000; // 60 minutes

async function fetchPriceWithInterval(): Promise<void> {
  try {
    const priceData = await fetchPrice();
    console.log('Price data fetched: ', priceData);
  } catch (error) {
    console.error('Error fetching price data:', error);
  }
};

function setupIndexerAndManager() {
  if (chainConfig.chain === HARMONY) {
    indexer = new HarmonyIndexer(chainConfig as HarmonyConfig);
    indexer.start();
    transactionManager = new HarmonyManager(chainConfig as HarmonyConfig);
  } else {
    indexer = new GeneralIndexer(chainConfig as CrossChainConfig);
    indexer.start();
    transactionManager = new GeneralManager(chainConfig as CrossChainConfig);
  }
}

function configurePort() {
  if (process.env.NODE_ENV === 'development') {
    switch (chainConfig.chain) {
      case BASE: return 3001;
      case BSC: return 3002;
      default: return 3000;
    }
  }
  return process.env.PORT! || 3000;
}

function setupRoutes() {
  app.post('/', async (req, res) => transactionManager.handleRequest(req, res));
  app.get('/health', (_, res) => res.send('ok'));
  app.get('/txs', async (_, res) => res.json(await getChainTransactions(chainConfig.chain)));
  app.get('/remainders', async (_, res) => res.json(await getAllRemainders()));
}

function startServer() {
  setupIndexerAndManager();
  const PORT = configurePort();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  setupRoutes();
}

fetchPriceWithInterval();
setInterval(fetchPriceWithInterval, PRICE_FETCH_INTERVAL);
startServer();


export var transactionManager: GeneralManager | HarmonyManager;
export var indexer: GeneralIndexer | HarmonyIndexer;