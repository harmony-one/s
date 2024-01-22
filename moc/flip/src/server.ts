import app from './app';
import 'dotenv/config';
import { chainConfig } from './config/index';
import { fetchPrice } from './utils/price';
import { CrossChainConfig, HarmonyConfig } from './config/type';
import GeneralIndexer from './indexers/GeneralIndexer';
import HarmonyIndexer from './indexers/HarmonyIndexer';
import HarmonyManager from './services/HarmonyManager';
import GeneralManager from './services/GeneralManager';
import { getAllRemainders, getChainTransactions } from './db/db';

const PORT = process.env.PORT || 3000;

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
  } else if (chainConfig.chain === 'Base') {
    indexer = new GeneralIndexer(chainConfig as CrossChainConfig);
    indexer.start();
    transactionManager = new GeneralManager(chainConfig as CrossChainConfig);
  } else {
    indexer = new GeneralIndexer(chainConfig as CrossChainConfig);
    indexer.start();
    transactionManager = new GeneralManager(chainConfig as CrossChainConfig);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

app.get('/health', async (_, res) => {
  res.send('ok');
});

app.post('/', async (req, res) => {
  console.log(req.body);
  await transactionManager.handleRequest(req, res);
});

app.get('/txs', async (_, res) => {
  const txs = await getChainTransactions(chainConfig.chain);
  res.json(txs);
});

app.get('/remainders', async (_, res) => {
  const remainders = await getAllRemainders();
  res.json(remainders);
});

startServer();