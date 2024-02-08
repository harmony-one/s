2023-02-06 Tue: Change log for Remote Emitter:
- Introduced session-based unique names
- Linked @mentions to user pages.
- **Added # tagging functionality with /tag/\<tag\>**
- Updated homepage logo for return navigation
- Shortened datetime and address displays\
/\ v0.0.0
- Made usernames non-editable; set Cloudflare environment variables
- Removed submit button from UserPage; removed send button from HomePage
- **Added mention array and hashtag array columns to database**
- Added posts and mentions buttons to profile
- **Introduced top 3 hashtags feature**
- Linked main username on HomePage to /\<username\>

2023-02-05 Mon: Created test webapp with nosql client-side db. User can post a message and set some username. The message is posted with the current location and timestamp. Clicking on a username loads a /<username> page with all posts from that username. 

2023-02-4 Sun: [2 hours] Began creation of testing webapp that compares various location service APIs to see which is most accurate under a variety of conditions. 

2023-02-3 Sat: [5 hours] [Created](https://github.com/harmony-one/s/commit/7b770fcee25c79ff4ed6868fb86fa71e6cf64ab0) webpage to display location data from OpenStreetMap Nominatim API. [Created](https://github.com/harmony-one/s/commit/0c9ad101603b14b927f19a63fcf7c114b1a9495e) iOS app to display location data via Apple NSLocation data. Working on allowing specific location and coordinate dump. [Reviewed](https://aws.amazon.com/blogs/mobile/add-a-map-to-your-webpage-with-amazon-location-service/) archetecture for amazon location services mapping. Began setup of demo with service.

2023-02-2 Fri: Researched potential location tracking methods and the limitations of airdrop and NFC on iPhone.

2023-02-01 Thu: Created a test of in-mem data. No issues with querying from 100k rows of wallets stored in mem (no internet connection needed). Massive slow downs by 200k rows. 

2023-01-31 Wed: [Created](https://github.com/harmony-one/s/commit/fc87750c2e77a58921d7306ff30390da12373b03) base of PmF. [Implemented](https://github.com/harmony-one/s/commit/91264c4bb5cf5053decc122172189068795a1aa7) wallet lookup based on last 4 digits and emoji encoding and 2 error codes. 

*2023-01-30 Tue: Review code changes to 1Bot for image inscription. Review method for image storage (either store images or use Telegram API to fetch images on page load). If open-source social collection project is found, see if feasible to implement prior to ETHDenver. Work on the framework for the chained lottery.

*2023-01-29 Mon: Trying Phantom quests. Look for open source projects that use a social collection aspect that doesn't require NFC. Review code changes to 1Bot that remove all but 1 ONE from user wallet to cover gas fees for inscription of images.

---

2023-01-28 Sun: Tested Phantom mobile.

2023-01-27 Sat: Continued using Diamond on Deso and testing various social finance products. 

2023-01-26 Fri: Interview candidated. "share" button on 1Bot image generation to inscribe prompt and put on last 2 letters of txn .county. Tested DeSo Diamond. 

2023-01-25 Thu: Planned new lottery system for social referrals

2023-01-24 Wed: Footprint SQL queries to gather lottery stats. 8 hours in, approximately 512 total inscriptions and 22 unique addresses.

2023-01-23 Tue: [Pushed](https://github.com/harmony-one/s/commit/34cc3c3e6d80cf63071a23a134012b0b301e8d0e) minimal multi-owner contract, and [pushed](https://github.com/harmony-one/s/commit/db2a42f1478528752efcb5b9bb010a61c8f3a5a3) minimal single-owner contract. [Wrote](https://github.com/harmony-one/s/blob/main/s-msw/README.md) README.md.
 
2023-01-22 Mon: [Created](https://github.com/Aishlia/PaperTradesBot/commit/f2c6b20d58c70c0fe387ffa752a82088277a743c) telegram paper trades bot. [Fixed](https://github.com/Aishlia/PaperTradesBot/commit/9b839cada02f2e7153648aeeb9216113f2693aeb) logic of bot. [Added](https://github.com/Aishlia/PaperTradesBot/commit/cce2fd7ba8d93178c9a03b7cdd33e722789b2873) live price fetch. 

---

2023-01-21 Sun: Inlined variables and simplified Minimal Social Wallet. 

2023-01-20 Sat: Researched Polymarket and searched for similar projects. 

2023-01-19 Fri: Monitored Onescriptions ONES launch and gathered basic launch stats.

2023-01-18 Thu: Found new lead for senior eng position. Prototyped new pool based flip with Theo. Setup and tested podcast. 

2023-01-17 Wed: Pulled protocol stats for Harmony, Polygon, Avalanche, and Near from footprint and API calls. Created spreadsheet comparing gas fees, utilization, and other stats for Harmony, Polygon, and Avalanche (could not find reliable easily accessible sources for Near). 

2023-01-16 Tue: Tested interacting with inscriptions on Avalanche (AVAV on Avascriptions). Minted inscription tokens and listed new tokens. Generated graphic for Harmony x Onescription announcement. 

2023-01-15 Mon: Fed Holiday

---

2023-01-14 Sun: Wrote speaker bios and other response questions for team members for ETHDenver applications. 

2023-01-13 Sat: Tested minimal secure wallet. 

2023-01-12 Fri: Created POC for a contract that holds ONE tokens for you. This limits your hot wallet's exposure. When you need more tokens, you can send a transaction work 0 ONE to the contract and the contract will automatically send you 100 ONE tokens back. This way, you still have access to all of your funds, but in the event you sign something you shouldn't, your exposure is limited to however much you want to refill your account with. [Contract](https://explorer.harmony.one/address/0x80a7f21728d263a64a4acac56e9c43dea997ee30) and [code](https://github.com/harmony-one/s/commit/fc63f102bf473ce615f94cbcaab11e558f141f35).

2023-01-11 Thu:[Added](https://github.com/harmony-one/s/commit/ce97d2b7aeadfbe18735a43abea1d5df8f8e59a9) fee counter for bridge stats to find gas charged across bridge transactions from fly.io. Generated and designed graphic for Harmony 2024: ONE Finality substack post. 

2023-01-10 Wed:[Found](https://github.com/harmony-one/s/commit/dfa3fdeea1b30d5c14946936b9a0375063c7ade1) top 3 pairs from Harmony to other chains and top 3 pairs from other chains to Harmony on the bridge. Created manual prototype for BTC - ONE flip using call data and OP_RETURN. Created front end with hex converter. 

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
