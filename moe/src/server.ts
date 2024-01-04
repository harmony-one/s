import app from './app';
import { config } from './config';
import Indexer from './indexers/Indexer';
import WalletManager from './services/WalletManager';
import abi from './abis/base_usdc.json';

const PORT = process.env.PORT || 3000;
export const HARMONY = 'Harmony';
export const BASE = 'Base';

// initialize and export walletManager
export const walletManager = new WalletManager(config.rpc.HARMONY_RPC, config.rpc.BASE_RPC, abi, config.contracts.BASE_USDC);

// initialize and start the indexers
const harmonyIndexer = new Indexer(HARMONY, BASE, config.rpc.HARMONY_RPC);
harmonyIndexer.start();

const baseIndexer = new Indexer(BASE, HARMONY, config.rpc.BASE_RPC);
baseIndexer.start();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
