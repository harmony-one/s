import app from './app';
import { config } from './config';
import WalletManager from './services/WalletManager';
// import abi from './abis/base_usdc.json';
import abi from './abis/bsc_usdt.json';
import HarmonyIndexer from './indexers/HarmonyIndexer';
import BaseIndexer from './indexers/BaseIndexer';
import priceRoutes from './routes/priceRoutes';
import remainderRoutes from './routes/remainderRoutes';
import { fetchPrice } from './utils/price';
import { getAllTransactions } from './db/db';
import { getExplorer, shortenHash } from './utils/chain';
import { formatDate } from './utils/utils';
import { CAP } from './utils/dollar';

const PORT = config.express.PORT;
export const HARMONY = 'Harmony';
export const BSC = 'BSC';

// initialize and export walletManager
export const walletManager = new WalletManager(config.rpc.HARMONY_RPC, config.rpc.BSC_RPC, abi, config.contracts.BSC_USDT);

// initialize and start the indexers
const harmonyIndexer = new HarmonyIndexer(config.rpc.HARMONY_RPC);
harmonyIndexer.start();

const bscIndexer = new BaseIndexer(config.rpc.BSC_RPC);
bscIndexer.start();

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
    const address = await walletManager.getAddress();
    let htmlResponse = `<h1>Flip: ${address}</h1>`;

    htmlResponse += `<h3>DO NOT attempt to send more than $${CAP} of any asset.</h3>`;
    htmlResponse += '<h3>DO NOT attempt to send any other assets than native ONE (Harmony) or USDT (BSC), all other funds will be lost.</h3>';
    htmlResponse += '<h2>Welcome to usdt.country – Flip Tokens with Ease!</h2>'
    htmlResponse += '<h3>What is it?</h3>';
    htmlResponse += '<p>usdt.country offers a revolutionary service that allows you to swap native tokens seamlessly. No smart contracts, no transaction signing – just send $ONE to receive $USDT. (more asset support coming soon)</p>';

    htmlResponse += '<h3>How it works?</h3>';
    htmlResponse += '<p>First, you send $ONE tokens to a wallet address on usdt.country. Next, our system automatically calculates the equivalent amount in $USDT based on the current exchange rate and sends it to your specified wallet. Finally, you can access your $USDT on the BSC network using your original address in as little as 4 seconds, for less than $0.10! It\'s that easy – no smart contracts, no transaction signing, just quick and secure token swaps. (this process in reverse will also work, send USDT on BSC and receive ONE on Harmony!)</p>';

    htmlResponse += '<h3>Why is it useful?</h3>';
    htmlResponse += '<p>Our service provides a secure, cost-effective, and rapid solution for native token swaps. By eliminating the complexities and risks of traditional methods, we make it easier for you to manage your assets across different networks.</p>';
    htmlResponse += '<p>Start trading smarter with usdt.country – where speed, security, and simplicity come together.</p>';


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
        <td>${formatDate(tx.date)}</td>
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
