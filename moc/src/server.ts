import app from './app';
import { config } from './config';
import WalletManager from './services/WalletManager';
import abi from './abis/base_usdc.json';
import HarmonyIndexer from './indexers/HarmonyIndexer';
import BaseIndexer from './indexers/BaseIndexer';
import priceRoutes from './routes/priceRoutes';
import remainderRoutes from './routes/remainderRoutes';
import { fetchPrice } from './utils/price';
import { getAllTransactions } from './db/db';
import { getExplorer, shortenHash } from './utils/chain';

const PORT = config.express.PORT;
export const HARMONY = 'Harmony';
export const BASE = 'Base';

// initialize and export walletManager
export const walletManager = new WalletManager(config.rpc.HARMONY_RPC, config.rpc.BASE_RPC, abi, config.contracts.BASE_USDC);

// initialize and start the indexers
const harmonyIndexer = new HarmonyIndexer(config.rpc.HARMONY_RPC);
harmonyIndexer.start();

const baseIndexer = new BaseIndexer(config.rpc.BASE_RPC);
baseIndexer.start();

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

// root
app.get('/', async (req, res) => {
  try {

    const transactions = await getAllTransactions();
    // TODO: amount: show dollar equivalent
    let htmlResponse = `<h1>Transaction Data</h1>`;
    htmlResponse += '<h2>Do not send more than $1 for now, as the service only flips up to that amount.</h2>';

    const address = await walletManager.getAddress();
    htmlResponse += `<h2>Flip Address: ${address}</h2>`;
    htmlResponse += `<table border="1">
    <tr>
      <th>ID</th>
      <th>Address</th>
      <th>Source Chain</th>
      <th>Source Tx Hash</th>
      <th>Destination Chain</th>
      <th>Destination Tx Hash</th>
      <th>Asset</th>
      <th>Amount</th>
      <th>Date</th>
    </tr>`;

    for (const tx of transactions) {
      htmlResponse += `<tr>
        <td>${tx.id}</td>
        <td>${shortenHash(tx.address)}</a></td>
        <td>${tx.src_chain}</td>
        <td><a href="${getExplorer(tx.src_chain, tx.src_hash)}" target="_blank">${shortenHash(tx.src_hash)}</a></td>
        <td>${tx.dst_chain}</td>
        <td><a href="${getExplorer(tx.dst_chain, tx.dst_hash)}" target="_blank">${shortenHash(tx.dst_hash)}</a></td>
        <td>${tx.asset}</td>
        <td>${parseFloat(tx.amount).toFixed(6)}</td>
        <td>${tx.date}</td>
      </tr>`;
    }

    htmlResponse += `</table>`;

    res.send(htmlResponse);

  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Error fetching transactions');
  }
});

// price route
app.use('/price', priceRoutes);

// remainder route
app.use('/remainder', remainderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
