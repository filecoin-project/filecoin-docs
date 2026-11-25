---
description: >-
  Oracle networks with contracts on Filecoin (Pyth, Tellor and eOracle), their
  contract addresses, and how oracles feed offchain data to smart contracts.
---

# Oracles

**An oracle is a service that reads data from outside the chain and publishes it to a smart contract. A contract can't fetch external data itself, because every node has to compute the same result, so it relies on an oracle to supply it.**

The oracles below are third-party services. Check each service's documentation for the current network support and addresses before you build on one.

Oracles let you add features such as:

* **Price feeds.** DeFi protocols, such as lending, need token prices.
* **Cross-chain deal verification.** Apps on other chains can check the status and proofs of a storage deal.
* **Automated deal renewal.** An oracle reports deal status so that deals can be renewed and repaired.

## Pyth

[Pyth](https://pyth.network/) publishes price data supplied directly by financial institutions across traditional finance and crypto. Each feed has a price and a confidence interval. See [Pyth confidence intervals](https://docs.pyth.network/price-feeds/best-practices#confidence-intervals).

| Network | Address |
| --- | --- |
| Mainnet | [`0xA2aa501b19aff244D90cc15a4Cf739D2725B5729`](https://filecoin.blockscout.com/address/0xA2aa501b19aff244D90cc15a4Cf739D2725B5729?tab=contract) |
| Calibration | [`0xA2aa501b19aff244D90cc15a4Cf739D2725B5729`](https://calibration.filfox.info/en/address/0xA2aa501b19aff244D90cc15a4Cf739D2725B5729) |

Find the price feed ID for FIL on [Pyth price feed IDs](https://pyth.network/developers/price-feed-ids). Search for `FIL`.

More: [Pyth documentation](https://docs.pyth.network/), [best practices](https://docs.pyth.network/price-feeds/best-practices) and [historical prices](https://docs.pyth.network/metrics/).

## Tellor

[Tellor](https://tellor.io/) is an optimistic oracle. Don't accept a price instantly. Wait a few minutes before you rely on it. It offers a price feed and a data oracle, and the data oracle can provide Filecoin-specific data, such as the reputation of storage providers, which a lending protocol could use to set interest rates.

| Name | Address | Mainnet | Calibration |
| --- | --- | --- | --- |
| Bridged TRB | `0x045CE60839d108B43dF9e703d4b25402a6a28a0d` | Yes |  |
| Playground/TRB | `0x15e6Cc0D69A162151Cadfba035aa10b82b12b970` |  | Yes |
| Oracle | `0xb2CB696fE5244fB9004877e58dcB680cB86Ba444` | Yes | Yes |
| Governance | `0xb55bB55f7D8b4F26Bd18198088C96488D95cab39` | Yes | Yes |
| Autopay | `0x60cBf3991F05a0671250e673Aa166e9D1A0C662E` | Yes | Yes |
| TellorFlex | `0xb2CB696fE5244fB9004877e58dcB680cB86Ba444` | Yes | Yes |
| QueryDataStorage | `0xf44166ca8bdB612268a4D401e4c5147968E5a190` | Yes | Yes |
| Multisig | `0x34Fae97547E990ef0E05e05286c51E4645bf1A85` | Yes | Yes |

More: [Tellor documentation](https://docs.tellor.io/), the [Filecoin storage insurance contract](https://github.com/tellor-io/filecoin-query-insurance-impl/tree/main), and the [FVM Dataverse hackathon talk](https://www.youtube.com/watch?v=AQIDqTLguyI).

## eOracle

[eOracle](https://www.eoracle.io/) provides price feeds and custom data feeds, secured by restaked ETH. Its contracts are on [Calibration](../../networks/calibration.md) only.

| Name | Address | Mainnet | Calibration |
| --- | --- | --- | --- |
| EOFeedManager | `0x4BCafd5f3fB32221BaEAF6B986d1449772885D1E` |  | Yes |
| EOFeedAdapter - AUD/USD | `0x6243357B9241Fe9C3BAfbA79DeD3300a855113FA` |  | Yes |
| EOFeedAdapter - BTC/USD | `0x705256d9B37950628F97A1a8De7Ab557345a0A80` |  | Yes |
| EOFeedAdapter - ETH/USD | `0x2bada837140A310f4A1d9D0e7fab114da6b87031` |  | Yes |
| EOFeedAdapter - EUR/USD | `0x7C01e105B9c3772Bc72ef55F450b9B96f81EDE82` |  | Yes |
| EOFeedAdapter - FIL/USD | `0x335C47CF754cf7f5d6DF78EF9fAb065aa5988D89` |  | Yes |
| EOFeedAdapter - GBP/USD | `0x2Af9bb239936aC3e5a35CC804CD09a8CF3B589e7` |  | Yes |
| EOFeedAdapter - LINK/USD | `0x7E8326Fd75aCa5A7dF43E999A1119c392EDFC93a` |  | Yes |
| EOFeedAdapter - SOL/USD | `0x7E3e2953d69890f6B7E5831144986113E9199593` |  | Yes |
| EOFeedAdapter - USDT/USD | `0x30f43F80279b7BB1b9206896DB90Aabf69494c16` |  | Yes |
| EOFeedAdapter - XAU/USD | `0x8609B3087D473cD2B6bc7674dD54FF13c909027f` |  | Yes |
| EOFeedAdapter - sFRAX/FRAX | `0xd56f6CC400f3bFC77faeC4bBb1e0400c6A26A925` |  | Yes |
| EOFeedAdapter - sfrxETH/frxETH | `0x626A1Cb309289Eb542710D6093C6341562769983` |  | Yes |
| EOFeedAdapter - stETH/ETH | `0x0834Bb4baf2758a3642636C89D18F97ED6672D1C` |  | Yes |

More: [eOracle on GitHub](https://github.com/eoracle).

## Related pages

* [FVM advanced](README.md): tools and services for FVM developers.
* [Filecoin EVM runtime](../filecoin-evm-runtime.md): what Ethereum compatibility covers on Filecoin.
* [Multicall](multicall.md): batch many calls into one.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/advanced/oracles)
