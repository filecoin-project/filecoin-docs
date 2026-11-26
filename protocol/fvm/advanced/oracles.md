---
description: >-
  Oracle networks with contracts on Filecoin (RedStone and Tellor), their
  contract addresses, and how oracles feed offchain data to smart contracts.
---

# Oracles

**An oracle is a service that reads data from outside the chain and publishes it to a smart contract. A contract can't fetch external data itself, because every node has to compute the same result, so it relies on an oracle to supply it.**

The oracles below are third-party services. Check each service's documentation for the current network support and addresses before you build on one.

Oracles let you add features such as:

* **Price feeds.** DeFi protocols, such as lending, need token prices.
* **Cross-chain deal verification.** Apps on other chains can check the status and proofs of a storage deal.
* **Automated deal renewal.** An oracle reports deal status so that deals can be renewed and repaired.

## RedStone

[RedStone](https://www.redstone.finance/) data infrastructure is live on Filecoin Mainnet. It starts with a FIL/USD push feed that gives contracts on the FVM an onchain dollar price for FIL. The feed updates on every 0.5% price move, and at least every four hours. See the [RedStone announcement](https://www.redstone.finance/blog/redstone-data-infrastructure-is-now-live-on-filecoin/).

| Network | Adapter address |
| --- | --- |
| Mainnet | [`0xEba3D85957DA385d68eCcabEEC9f591B61258753`](https://filecoin.blockscout.com/address/0xEba3D85957DA385d68eCcabEEC9f591B61258753) |
| Calibration | [`0xB08342D907D2df47B6F73e25F4fa033978B344B1`](https://filecoin-testnet.blockscout.com/address/0xB08342D907D2df47B6F73e25F4fa033978B344B1) |

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

## Related pages

* [FVM advanced](README.md): tools and services for FVM developers.
* [Filecoin EVM runtime](../filecoin-evm-runtime.md): what Ethereum compatibility covers on Filecoin.
* [Multicall](multicall.md): batch many calls into one.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/advanced/oracles)
