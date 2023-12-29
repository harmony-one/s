2023-12-28 Thu: Fixed monitor logic for the relayer. Subscribe is not supported for Harmony network, also web3js causes problem in abi decoding with hardhat environment, thus changed the logic to poll transactions every 1 second. The monitor is working as expected now.

2023-12-27 Wed: Initiated development for relayer for signature verification. Also, looking at ways to possibly implement Circle's CCTP to the bridge.

2023-12-26 Tue: Researched over Circle's cross chain transfer protocol. Built simple smart contract utilizing the protocol.

---

2023-12-24 Sun: Testnet testing the bridge transacitons. Working as expected.

2023-12-23 Sat: Generalized bridge logic to be deployed on any chains. Generalized Bridge.sol now can deposit and withdraw tokens. In need of Harmony Testnet tokens in order to deploy and test out transactions.

2023-12-22 Fri: [Developed](https://github.com/harmony-one/s/tree/bridge/s-bridge/bridge) smart contracts to facilitate the transfer of assets from Harmony to Arbitrum (ETA: Arbitrum to Harmony 12/23). [Implemented](https://github.com/harmony-one/s/tree/bridge/s-bridge/bridge) verification logic using signatures authenticated by the relayer, ensuring cross chain validation.

2023-12-21 Thu: Researched into bridge implementation and studied solidity to began smart contract development. Also researched for secure ways to authenticate transactions between different chains, mostly [signature proofs vs merkle tree](https://github.com/harmony-one/s/blob/bridge/s-bridge/bridge/README.md). 
