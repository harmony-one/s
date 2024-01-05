## Minimal-on-Chain (MoE) Services via .country Calldata for Swaps & Bridges
Swap native tokens or bridge across networks without signing transactions with smart contracts. Send $ONE tokens to a plain wallet address on usdc.country and receive $USDC. Optionally specify a target network and a wallet address one/0x…  in the transaction field calldata to bridge. Support the top 1000 networks and assets via auctioned domain names such as btc.country and eth.country. 
Easy onboarding with any wallets to acquire any native tokens. Eliminate security risks with smart contracts, transaction signing, frontend deploys, bridge custody, asset whitelists, or miner extractions. Like Over-The-Counter (OTC) services but via inscription, or intent-based protocols like Uniswap X, Anoma, Chainflip, Across. See Harmony 2024 Roadmap.
 
For example, the website usdc.country is a minimal page that reads:

We as the usdc.country operator hold the wallet labelled “ted” for the two networks with the same address: the first wallet ted:one with $ONE tokens on Harmony ONE network, while the second wallet ted:base with $USDC tokens on Coinbase BASE network.

For example, a user Alice sends $10 in $USDC tokens on Base from her wallet alice:base to our wallet ted:base. Off chain, our backend tracks all transfer transactions toward our wallet on Base. At the conversative pricing (using the high price of the last hour on Binance) of $0.100, as an illustration, we send 100 $ONE tokens on Harmony from our wallet ted:one to her wallet alice:one.

In reverse, for example, a user Bob sends 100 $ONE tokens on Harmony from his wallet bob:one to our wallet ted:one. Off chain, our backend tracks all transfer transactions toward our wallet on Harmony. At the conversative pricing (using the low price of the last hour on Binance) of $0.995, as an illustration, we send $99.5 in $USDC tokens on Base from our wallet ted:base to his wallet bob:base.

On the main webpage, the latest high price is next to the ted:base wallet address and the latest low price is next to the ted:one wallet address. Anyone can verify the past transactions of usdc.country on Harmony’s block explorer and Base’s block explorer.

Both Harmony and Base networks produce blocks every two seconds. Sending ERC-20 or HRC-20 coins costs less than $0.01 on Harmony and, most recently, about $0.05 on Base. In total, bridging native tokens $USDC on Base to and from $ONE on Harmony can be as fast as four seconds and as cheap as $0.06.

We as the usdc.country operator is staking 100,000 $ONE tokens as the bond for good service under a 2-out-of-3 multisig wallet with .country governors. Users may dispute bad pricing or lost transactions within our service guideline and our bond amount. To provide sufficient liquidity on both sides, we regularly rebalance the assets on the wallets ted:one and ted:base via centralized exchanges.

We cover the cost of backend infrastructure, exchange operations, and governance engagement. We make money from the price difference of bridging the two tokens and from rebalancing the two wallets. We lease the premium domain usdc.country for trust and branding from monthly open auctions.
