import 'dotenv/config'
import express from 'express';
import Web3 from 'web3';
import { EventData } from 'web3-eth-contract';

const app = express();
const port = 3000;

const arbitrumWSS = process.env.ARBITRUM_SEPOLIA_WSS as string;

const arbitrumProvider = new Web3.providers.WebsocketProvider(arbitrumWSS);

const web3Arbitrum = new Web3(arbitrumProvider);

const arbitrumLogs: string[] = [];

const arbitrumAddress = process.env.ARBITRUM_SEPOLIA_ADDRESS as string;

const arbitrumJson = require("../bridge/artifacts/contracts/Bridge.sol/Bridge.json");
const arbitrumContract = new web3Arbitrum.eth.Contract(arbitrumJson.abi, arbitrumAddress);

arbitrumContract.events.allEvents({
    fromBlock: 'latest'
})
.on('data', (event: EventData) => {
    arbitrumLogs.push(JSON.stringify(event));
    console.log('New Arbitrum Event:', event);
})
.on('error', (error: Error) => {
    console.error('Arbitrum Event Error:', error);
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Relayer Service</h1>
        <p><strong>Arbitrum Sepolia RPC WSS:</strong> ${arbitrumWSS}</p>
        <p><strong>Arbitrum Sepolia Contract Address:</strong> ${arbitrumAddress}</p>
    `);
});

app.get('/arbitrumSepolia', (req, res) => {
    res.json(arbitrumLogs);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
