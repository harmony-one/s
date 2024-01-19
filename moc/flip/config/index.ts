import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { ChainConfig } from './type';
import harmonyConfig from './harmonyConfig';
import bscConfig from './bsc/bscConfig';
import baseConfig from './base/baseConfig';

const argv = yargs(hideBin(process.argv))
  .option('chain', {
    alias: 'c',
    describe: 'Select the blockchain',
    type: 'string',
    demandOption: true
  })
  .parseSync();

let chainConfig: ChainConfig;
const chain = argv.chain ? argv.chain.toLowerCase() : '';

switch (chain) {
  case 'harmony':
    chainConfig = harmonyConfig;
    break;
  case 'bsc':
    chainConfig = bscConfig;
    break;
  case 'base':
    chainConfig = baseConfig;
    break;
  default:
    throw new Error('Invalid or no blockchain specified. Use --chain to specify the blockchain.');
}

export default chainConfig;
