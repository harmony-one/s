# Minimal Social Wallet: Limit exposure and sign with confidence
## Table of Content
- [Overview](https://github.com/harmony-one/s/tree/main/s-msw#overview)
- [minimalSingleOwner.sol](https://github.com/harmony-one/s/tree/main/s-msw#minimalSingleOwner.sol)
- [minimalMultiOwner.sol](https://github.com/harmony-one/s/tree/main/s-msw#minimalMultiOwner.sol)
- [poc](https://github.com/harmony-one/s/tree/main/s-msw#poc.sol)

## Overview
When signing a transaction, one small mistake can drain your entire wallet. Malicious code could be hiding anywhere, and while whitelists exist, this is a labor intensive process that is prone to human oversight. Minimal Social Wallet aims to limit your exposure through simple and easy to understand contracts. The contract can either have multiple or a single owner. Let's look at the single owner case first. A user hard codes their hot wallet address and deploys the minimalSingleOwner.sol contract. From any wallet, they can send ONE to the contract. When the user wants more funds in their hot wallet, they just have to send an empty transaction (value 0 ONE) to the contract and the contract automatically sends back ONE. Their wallet address is hard coded into the contract, so no other wallets could trigger the send action. 

In the multi owner case, multiple users hard code their wallet addresses and a hot wallet address and the contract is deployed. Any wallet can send ONE to the contract. If one of the owners sends a transaction to the contract, the contract sends a hard coded amount of ONE to the hot wallet address. \
<img src="https://github.com/harmony-one/s/assets/18436006/fb771082-8c02-45c1-9f5b-62d611ae650a" alt="diagram" width="500"/>

## minimalMultiOwner.sol
```
pragma solidity ^0.8.0;

contract HarmonyWallet {
    receive() external payable {
        if ((msg.sender == address(0xA) || msg.sender == address(0xB))) {
            payable(address(0xC)).transfer(100 ether);
        }
    }

    fallback() external payable {}
}
```
We declare a contract called HarmonyWallet. The `receive() external payable` allows the contract to recieve funds through a send transaction without having to interact with a specific function. We can then trigger actions when payment is recieved. We can check if the sender of the transaction is one of the owner `(msg.sender == address(0xA) || msg.sender == address(0xB))`. The `0xA` and `0xB` values should be the wallet addresses of the owners (ie. the wallets that can trigger a transfer of funds). If we wanted to add more owners, we could just have to add more conditions (ie. `(msg.sender == address(0xA) || msg.sender == address(0xB)) || msg.sender == address(0x1)) || ... `). If the contract recieves a transaction from one of the hard coded owner addresses, 100 ONE is sent to to the hard coded hot wallet through `payable(address(0xC)).transfer(100 ether);`. `0xC` should be changed to the intended hot wallet address. `100 ether` can also be changed to reflect how many ONE should be sent per refill action. 

## minimalSingleOwner.sol
```
pragma solidity ^0.8.0;

contract HarmonyWallet {
    receive() external payable {
        if (msg.sender == address(0xA) && msg.value == 0) {
            payable(address(0xA)).transfer(100 ether);
        }
    }

    fallback() external payable {}
}
```
We declare a contract called HarmonyWallet. The `receive() external payable` allows the contract to recieve funds through a send transaction without having to interact with a specific function. We can then trigger actions when payment is recieved. We check if the sender of the transaction is the owner; `0xA` should be changed to the owner's hot wallet address. If the sender of the transaction is the owner and the transaction has a value of 0 ONE, then the contract sends the owner 100 ONE through `payable(address(0xA)).transfer(100 ether);`. `0xA` and `100 ether` should be changed to the owner's hot wallet address and the amount of ONE that should be sent back per refill action. Any other incoming ONE sent to the contract will just be held for the owner's future use. 
## poc

