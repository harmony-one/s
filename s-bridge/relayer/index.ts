import 'dotenv/config';
import express from 'express';
import { ethers } from 'ethers';

const app = express();
const port = 3000;

const arbitrumRPC = process.env.ARBITRUM_SEPOLIA_RPC as string;
const provider = new ethers.providers.JsonRpcProvider(arbitrumRPC);

const arbitrumLogs: string[] = [];
const contractAddress = process.env.ARBITRUM_SEPOLIA_ADDRESS as string;
const contractArtifact = require("../bridge/artifacts/contracts/Bridge.sol/Bridge.json");
const contractInterface = new ethers.utils.Interface(contractArtifact.abi);

let lastCheckedBlock: number | null = null;

async function pollTransactions() {
	try {
			const latest = await provider.getBlockNumber();
			if (lastCheckedBlock === null || lastCheckedBlock !== latest) {
					const block = await provider.getBlockWithTransactions(latest);
					const contractTransactions = block.transactions.filter(tx => tx.to && tx.to.toLowerCase() === contractAddress.toLowerCase());

					for (const tx of contractTransactions) {
							const receipt = await provider.getTransactionReceipt(tx.hash);
							for (const log of receipt.logs) {
									if (log.address.toLowerCase() === contractAddress.toLowerCase()) {
											const parsedLog = contractInterface.parseLog(log);
											arbitrumLogs.push(JSON.stringify(parsedLog));
											console.log('Event emitted in tx:', parsedLog);
									}
							}
					}

					lastCheckedBlock = latest;
			}
	} catch (error) {
			console.error('Error:', error);
	}
}

setInterval(pollTransactions, 1000); // Poll every second

app.get('/', (req, res) => {
    res.send(`
        <h1>Relayer Service</h1>
        <p><strong>Arbitrum Sepolia RPC URL:</strong> ${arbitrumRPC}</p>
        <p><strong>Arbitrum Sepolia Contract Address:</strong> ${contractAddress}</p>
    `);
});

app.get('/arbitrumSepolia', (req, res) => {
    res.json(arbitrumLogs);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
