2023-12-30 Sat: [Added](https://github.com/harmony-one/s/pull/4/files) implimentation started on Friday for interactino with safe ABI. sendToken uses execTransaction from safe. Currently using a placeholdre ERC20 ABI in getERC20ABI().

2023-12-29 Fri: Read through Gnosis safe [source code](https://github.com/safe-global/safe-contracts/blob/main/contracts/Safe.sol) and Protofire gnosis python CLI [source code](https://github.com/harmony-one/safe-cli) to find relevant contract. Worked on generating ABI from contract that matches expected ABI of our safe implimentation.

2023-12-28 Thu: Worked on the Gnosis interaction. [Refactored](https://github.com/harmony-one/s/pull/2) gnosis function logic. 

2023-12-27 Wed: Researched various implementations of interactions with Gnosis Safe. Reviewed safe contracts to get a better understanding of what needs to be implemented.

2023-12-26 Tue: [Added](https://github.com/harmony-one/s/commit/e2cb652e89681a48dc7f412962e3064a9a94d9b6) test for create wallet function and testing TODO. [Created](https://github.com/harmony-one/s/commit/1e69377af23a9e5feef4addb87e5926bd6d3c09c) Gnosis send framework and reorganized files. [Added](https://github.com/harmony-one/s/commit/78c0424688880f6449ca6b207d9b419eccc845ff) check balance for gnosis safe. Validated metric collection for VoiceAI.

2023-12-25: Christmas OOO

---

2023-12-24 Sun: Assisted in comparing alternate bridge effectiveness and fees.

2023-12-23 Sat: Began writing testing for wallet.

2023-12-22 Fri: Reviewed [dependency source code](https://github.com/ethereum/go-ethereum) to see how much needs to be re-written. Wallet currently utilizes 5 go-ethereum imports and approximatly 20 external functions.

2023-12-21 Thu: [Added](https://github.com/harmony-one/s/commit/4a40d98bb398f25ecd9c7b9a2e63baa640aaa2ad) framework for Gnosis safe interactions focusing on approving pending transactions. [Reworked](https://github.com/harmony-one/s/commit/d1b31b16d20a6423852f69af25796c5c883bb87e) parsing logic to improve consistency and clarity.

2023-12-20 Wed: [Created](https://github.com/harmony-one/s/commit/5fa578235ebf035b1f78b8564a1401697f55cded) go implementation of wallet with ability to create new wallets, receive tokens, check balance, and import wallet. [Added](https://github.com/harmony-one/s/commit/54b5c65708ea4bfeb8a9e5e3bccc37305f940260) send token functionality.

2023-12-19 Tue: [Created](https://github.com/harmony-one/s/commit/8b1a61d65068d27dcb035ec0a3636d3e38fb7505) c test function for pulling balance data. 
