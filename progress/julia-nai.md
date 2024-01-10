2023-01-09 Tue: Planned btc.country setup and researched methods for deriving receipt address from send address on Bitcoin. [Created](https://github.com/harmony-one/s/commit/91071fd9cfaf9389c984b5d10b9009e3cbe23610) quick bridge stats scraper. Currently gets transaction value and number of transactions in various statuses (waiting, in progress, error, success etc.) for the last week. [Added](https://github.com/harmony-one/s/commit/95c3d3bf40930020af74089668029a21f7da16bf) list of networks by number of transactions. Reviewed pricing model for moc.

2023-01-08 Mon: [Reviewed](https://lucid.app/lucidchart/e2275294-1899-4f72-a1e8-d934146d2942/edit?invitationId=inv_49cc2640-ae23-4c26-aed0-d95e788e3ca6) moc setup and btc.country.

2023-01-07 Sun: Reviewed Q1 roadmap.

2023-01-06 Sat: Tested custom ownable function added in PR#8.

2023-01-05 Fri: Reviewed [steemit.com](https://steemit.com/) reward structure implimentation with Casey— created first draft reward tiers for A tokens. [Added](https://github.com/harmony-one/s/pull/9) custom burn function to remove ERC20Burnable.sol dependency from OpenZeppelin and removed ERC20FlashMint.sol dependency.

2023-01-04 Thu: [Added](https://github.com/harmony-one/s/pull/8) custom ownable functions to enable removal of Ownable.sol dependency from OpenZeppelin (more notes in PR#8). [Created](https://lucid.app/lucidchart/e2275294-1899-4f72-a1e8-d934146d2942/edit?invitationId=inv_49cc2640-ae23-4c26-aed0-d95e788e3ca6) basic framework for user interaction with .country and reward structure with A tokens. 

2023-01-03 Wed: Researched other decentralized management application, and wrote some [notes](https://github.com/harmony-one/s/commit/427ece5f557f53b637d884389ba207ad4ba10acf) on how .country single letter sites could be governed. 

2023-01-02 Tue: [Created](https://github.com/harmony-one/s/pull/5) contract for tokens. Researched best methods for token allocation and tokenomics for governance letter tokens.

2024-01-01 Mon: New Years OOO

---

2023-12-31 Sun: Continues debugging sendToken.

2023-12-30 Sat: [Added](https://github.com/harmony-one/s/pull/4/files) implementation started on Friday for interaction with safe ABI. sendToken uses execTransaction from safe. Currently using a placeholder ERC20 ABI in getERC20ABI().

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
