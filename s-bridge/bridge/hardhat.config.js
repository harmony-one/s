require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    arbitrumSepolia: {
      accounts: [process.env.OWNER_PRIVATE_KEY, process.env.SIGNER_PRIVATE_KEY],
      chainId: 421614,
      url: process.env.ARBITRUM_SEPOLIA_RPC,
    },
    testnet: {
      url: process.env.HARMONY_TESTNET_RPC,
      chaindId: 1666700000,
      accounts: [process.env.OWNER_PRIVATE_KEY, process.env.SIGNER_PRIVATE_KEY],
    }
  }
};
