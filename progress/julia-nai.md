1. **AGI-Powered Financial Advisory for Cryptocurrency Traders**: Uniswap’s new extension strives to make trading easier. Uniswap V4 will introduce a new layer of custom tailoring to a portfolio management with the hooks. Developing an AGI-powered financial feature within the Voice AI app, specifically tailored for crypto traders could leverage Uniswap V4’s new functionality to bring a level of safety to personal fund management with spreads, limit orders, and dynamic fees. This service would provide real-time, conversational updates on market trends, portfolio advice, and strategy optimization, directly addressing the use case of updates for stock traders mentioned under "AGI (100x humans): Voice in 2024." We can look at automated portfolio rebalancing strategies that can be automatically performed on the user’s behalf to hit their targets. 
2. **Edge’s Principle of Data Ownership**: Edge’s fundamental mission is to empower individuals to have full control over their digital lives. Many individuals either accept or do not know the extent to which their online presence is traced and sold. We want to give users the ability to get a share of that back. Would people be willing to hand over more information if they are fairly compensated for it? Should models trained on that data pay our “royalties” in perpetuity? It seems unreasonable to be able to make these payment calculations fairly, but blockchain gives us this opportunity. If we are able to tokenize not only the data that is used to train a model, but also the model itself, we can examine how best to compensate the most key components to getting these models to work. 
3. **Decentralized Social Gaming and AI Challenges**: The in built badge game at ETHDenver did not have very high engagement. Most people did not even know they could setup their badge to be scanned. Looking at the leaderboard of scans, the highest amount was 88 scans. When I asked people if I could scan their badges, most were surprised to learn for the first time that the badges were even scannable. But, they seemed to really engage with the idea once they had set it up. This shows the potential market for a h.country style connection game. Continue the development of h.country and launching a series of challenges that utilize Harmony's chain to create decentralized social games. These could involve AI-driven puzzles, trivia, and other interactive games that encourage social bonding and engagement, tying into the concept of "Social (100% bonding)" through innovative, playful experiences.
4. **Ease of User Access**: Many projects have graduated into the phase of making their product easier to use. They are working on developing features that abstract away a lot of the tedious (and often roadblocking) steps that users have to take to engage with their products. Taking the time to really consider how we design products should be a top priority. We can continue to fork primitives, but if no-one builds the abstraction layer, it will be a tough road to user acquisition. Gone are the days of interacting directly with smart contracts. We want to push our Shard 1, but out portal to move ONE from Shard 0 to Shard 1 is broken. The currently only viable method I have found is through the CLI tools. One first step I want to take is a simplistic wallet that has behind-the-scenes shard transfers. If you want to send ONE to someone on shard 1, your ONE is automatically sent to shard 1 first and vice versa. 
5. **Developer Access to Shard 1 Data**: We discussed quite extensively the idea that any developer may have access to h.country data through Shard 1. They could build any client, any indexer, looking for the action specifications that we have already defined. This is very similar to the way the ordinals JSONs are defined. However, we can make it even easier for developers. In the same way that we have RPC endpoints that you can hit to easily fetch data about our chain, we want to make it even easier to fetch h.country data. Data availability and the ease at which that data can be accessed is a crucial step in ensuring developers will actually use the information that we are providing. 
6. **Enhanced Social Engagement through Embedded Distributions**: To enhance social engagement, we should focus on developing open ranking systems and embedding distribution mechanisms directly into social networking, content sharing, and community building features. h.country has only scratched the surface of finding chains between people. Given enough sources and enough interactions, we can find arbitrary chains between anything and anyone. If someone wants to find a new hobby, we should be able to find them a hobby better than they can do so themselves. This approach aims to personalize and enrich user interactions by prioritizing high-rank and quality, incentivizing participation through rewards. By integrating these systems, we seek to foster a vibrant, interactive community environment that encourages active contribution and meaningful connections among users.


2023-02-12 Mon:\
Change log for Remote Emitter

**Major Changes**
- [Added](https://github.com/Aishlia/remote-emitter/commit/e076cbbef889f74a4c0d6ed278b870888e7f3bd2) support for posting images.
- [Added](https://github.com/Aishlia/remote-emitter/commit/6503e1fee7b4fb9439c4c539e92b90d48817f703) connections between users that use the same hashtag. (ie. @BeautifulJewel82 ↔ @DeterminedXenops71 -#cats- @EnergeticHunter60 → @UniquePiano39 ← @AncientCat37)
    - In this instance, DeterminedXenops and EnergeticHunter both used #cats in a post completing the chain between BeautifulJewel and AncientCat.
    - Mentions are considered a better connection than using hashtags so are ranked higher
    - Hashtags are treated as Hashtag nodes in graph so a path involving the same users and only mentions will be shorter.

---

2023-02-11 Sun: [7 hours] \
Change log for Remote Emitter

**Major Changes**
- [Rewrote](https://github.com/Aishlia/remote-emitter/commit/2a42c762dd741290e4ed2d0b16048bbf891b7f84) connections logic to utilize Neo4j graph db. Users are now stored as nodes and their connects are vertices. 6th degree connection displays faster than Firestore implimentation's calculation of 3rd degree. 
- Removed directionality of connections (temp removal). For now, all mentions are treated as bi-directional.
- [Redesigned](https://github.com/Aishlia/remote-emitter/commit/ee36638d4b313aa92e526b7f33094c8e7b295ff0) graph data structure. Re-added connection directionality. Connection type is now stored in vertices. (@UniqueRobot65 ↔ @VibrantBee22 ← @ZealousWanderer97 → @QuirkyXenops7)


**Minor Changes**
- Updated frontend to properly display new information. When a user clicks on another user's profile, they see the chain of users that connects them (ie. @me - @friend - @friend2 - @friend3 - @target_user)
- [Removed](https://github.com/Aishlia/remote-emitter/commit/63dd92734a7cc982451d402745b926e3be372b7d) formatPath function
- [Readded](https://github.com/Aishlia/remote-emitter/commit/b516fa6906c7752721294ad6fc303fa6651d19b5) location data. Not sure when I accidentally removed it
- [Adjusted](https://github.com/Aishlia/remote-emitter/commit/9fe92e3dedb9a412b8234eb9e8999b39f87c228f) graph query to remove extra names. Connection chains start with the viewing user and end with the profile being viewed.
- [Add](https://github.com/Aishlia/remote-emitter/commit/b13361084841e0c67c163bfbfa2c473c9e3eb8a8) prevention of double submitting with submit state. New submitions not allowed when submit state is on. 

2023-02-10 Sat: [4 hours] \
🧧🧨🔴 Happy New Year 🐲🐉🏮 \
Change log for Remote Emitter

**Major Changes**
- Changed chain logic. Added semi-functioning directionality. @a mentioning @b should be counted as @a → @b. @b then mentioning @a back should be counted as @a ↔ @b

**Minor Changes**
- Minor CSS changes for mobile view

2023-02-09 Fri: \
Change log for Remote Emitter

**Major Changes**
- [Added](https://github.com/Aishlia/remote-emitter/commit/5da19d881c538c33c33701f6aa5fa6c36331d902) new Firestore interests collection to store followed hashtags. Users who use a hastag are now following that hastag.
- [Added](https://github.com/Aishlia/remote-emitter/commit/1d9ac584f575e5f3a8937916d127c6c26ca437eb) global view and home view to HomePage. Global view shows all posts, home view shows only posts tagged with a hastag that the user is following.

**Minor Changes**
- Finally [ran](https://github.com/Aishlia/remote-emitter/commit/99dfbd879bea76cd0c9278337357030c0445579c) prettier
- [Wrote](https://github.com/Aishlia/remote-emitter/commit/c4c2d18d887dd8f58def86df1d9ac03a4b8370c4) README overview of how Firestore collections are used

2023-02-08 Thu: \
Change log for Remote Emitter

**Major Changes**
- [Added](https://github.com/Aishlia/remote-emitter/commit/04caf6a9ab13729a50e52a5919c68ab31c9dfa1a) Heatmap POC
- [Created](https://github.com/Aishlia/remote-emitter/commit/be61e64c70d7642454c359ef70e05b7fb00ae4a6) POC for connection chain calculation using new Firestore collection "connections"

**Minor Changes**
- [Added](https://github.com/Aishlia/remote-emitter/commit/810d17d8227eca7c7a301a2f9aaa18a9eb672acb) links to global heatmap to HomePage
- [Removed](https://github.com/Aishlia/remote-emitter/commit/a52fbd1b3bbcc14ef09e9047d6080e598276b828) unused const assignment

2023-02-07 Wed: \
Change log for Remote Emitter
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

2023-01-06 Tue: Planned high level objective for webapp (Remote Emitter). Added spam filter to prevent repeat messages. 

2023-02-05 Mon: Created test webapp with nosql client-side db. User can post a message and set some username. The message is posted with the current location and timestamp. Clicking on a username loads a /<username> page with all posts from that username. 

---

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
