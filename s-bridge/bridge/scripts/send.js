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

async function main() {
  const amountGwei = process.argv[2];
  if (!amountGwei) {
    throw new Error("specify amount");
  }

  const network = process.argv[3];
  if (!network) {
    throw new Error('specify a network (testnet or sepolia)');
  }

  const providerUrl = getProviderUrl(network);
  console.log("Provider URL: ", providerUrl);
  const web3 = new Web3(providerUrl);

  const contractAddress = "0x109Ca5dB92d90b47E95004ec8F0C769DbB892EeF";
  const contractABI = bridgeJson.abi;

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const fromAddress = '0x23719c80171E1c533E58cE757084f6b225721D95';
  const privateKey = process.env.OWNER_PRIVATE_KEY;

  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  const amountInWei = web3.utils.toWei(amountGwei, 'gwei');
  const gasLimit = 600000; // adjust the gas limit as necessary

  try {
    const depositTx = await contract.methods.deposit().send({
      from: fromAddress,
      value: amountInWei,
      gas: gasLimit
    });

    console.log("Transaction successful:", depositTx);
  } catch (error) {
    console.error("Error sending deposit transaction:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })