require('dotenv').config();
const Web3 = require('web3');
const bridgeJson = require("../artifacts/contracts/Bridge.sol/Bridge.json"); // Adjust the path as needed

async function main() {
    const web3 = new Web3(process.env.HARMONY_TESTNET_RPC);

    // Replace these with actual addresses and private keys
    const ownerAddress = '0x23719c80171E1c533E58cE757084f6b225721D95';
    const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;
    const trustedSignerAddress = '0x90C06060C026B65212F7695f4f9A4E244Cfb9ACd';

    console.log("Owner address:", ownerAddress);
    console.log("Trusted Signer address:", trustedSignerAddress);

    // Add the owner account to web3
    const account = web3.eth.accounts.privateKeyToAccount(ownerPrivateKey);
    web3.eth.accounts.wallet.add(account);

    // Get the contract ABI and bytecode
    const contractABI = bridgeJson.abi;
    const contractBytecode = bridgeJson.bytecode;

    // Create and deploy the contract
    const BridgeContract = new web3.eth.Contract(contractABI);
    const deployTx = BridgeContract.deploy({
        data: contractBytecode,
        arguments: [trustedSignerAddress]
    });

    const gasEstimate = await deployTx.estimateGas();
    const bridge = await deployTx.send({
        from: ownerAddress,
        gas: 5000000
    });

    console.log("Bridge address:", bridge.options.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
