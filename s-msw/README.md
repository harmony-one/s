# Minimal Social Wallet: Limit exposure and sign with confidence
## Table of Content
- [Overview](https://github.com/harmony-one/s/tree/main/s-msw#overview)
- [minimalSingleOwner.sol](https://github.com/harmony-one/s/tree/main/s-msw#minimalSingleOwner.sol)
- [minimalMultiOwner.sol](https://github.com/harmony-one/s/tree/main/s-msw#minimalMultiOwner.sol)
- [poc](https://github.com/harmony-one/s/tree/main/s-msw#poc.sol)
- 
## Overview
When signing a transaction, one small mistake can drain your entire wallet. Malicious code could be hiding anywhere, and while whitelists exist, this is a labor intensive process that is prone to human oversight. Minimal Social Wallet aims to limit your exposure through simple and easy to understand contracts. The contract can either have multiple or a single owner. Let's look at the single owner case first. A user hard codes their hot wallet address and deploys the minimalSingleOwner.sol contract. From any wallet, they can send ONE to the contract. When the user wants more funds in their hot wallet, they just have to send an empty transaction (value 0 ONE) to the contract and the contract automatically sends back ONE. Their wallet address is hard coded into the contract, so no other wallets could trigger the send action. 

In the multi owner case, multiple users hard code their wallet addresses and a hot wallet address and the contract is deployed. Any wallet can send ONE to the contract. If one of the owners sends a transaction to the contract, the contract sends a hard coded amount of ONE to the hot wallet address. \
<img src="https://github.com/harmony-one/s/assets/18436006/fb771082-8c02-45c1-9f5b-62d611ae650a" alt="diagram" width="500"/>

## minimalMultiOwner.sol


