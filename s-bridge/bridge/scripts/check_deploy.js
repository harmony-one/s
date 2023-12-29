require('dotenv').config();

const Web3 = require('web3');
const bridgeJson = require("../artifacts/contracts/Bridge.sol/Bridge.json");

function getProviderUrl(network) {
  switch (network) {
      case 'testnet':
          return process.env.HARMONY_TESTNET_RPC;
      case 'sepolia':
          return process.env.ARBITRUM_SEPOLIA_RPC;
      default:
          throw new Error(`Unknown network: ${network}`);
  }
}

function getContractAddress(network) {
  switch (network) {
    case 'testnet':
        return "0x109Ca5dB92d90b47E95004ec8F0C769DbB892EeF";
    case 'sepolia':
        return "0x109Ca5dB92d90b47E95004ec8F0C769DbB892EeF";
    default:
        throw new Error(`Unknown network: ${network}`);
}
}

async function main() {
  const network = process.argv[2];
  if (!network) {
      throw new Error('Please specify a network (testnet or sepolia)');
  }

  const providerUrl = getProviderUrl(network);
  console.log("Provider URL: ", providerUrl);
  const web3 = new Web3(providerUrl);

  const contractAddress = getContractAddress(network);
  const contractABI = bridgeJson.abi;

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const owner = await contract.methods.owner().call();
  console.log("Owner: ", owner);

  const trustedSigner = await contract.methods.trustedSigner().call();
  console.log("Trusted Signer: ", trustedSigner);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })