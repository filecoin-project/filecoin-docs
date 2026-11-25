---
description: >-
  How block rewards work after Solstice: the consensus, service and burn
  streams, and how storage power wins blocks.
---

# Block rewards

**Block rewards are the FIL the network pays to storage providers that win the right to produce a block. Providers with more storage power win more often.**

For how winners are chosen, see [Consensus](../concepts/consensus.md). For what a provider earns in practice, see [How storage providers earn](../../provide-storage/how-storage-providers-earn.md).

## How a provider earns a block reward

At the start of each epoch, which lasts 30 seconds, the network elects a few storage providers to produce a block. The more storage power a provider has, the more likely it is to be elected. A provider needs at least 10 TiB of storage power to be eligible.

An elected provider must submit a [WinningPoSt](storage-proving.md#winningpost) proof. If it does and it produces a block, it receives the consensus share of that block's reward (see [How each reward is split](#how-each-reward-is-split)) and the fees for the messages it includes.

## Where the FIL comes from

Block rewards are minted from two sources:

* **Simple minting.** 330 million FIL is released on a 6-year half-life schedule. About 97% of it is released over roughly 30 years. The network pays this out whatever its capacity.
* **Baseline minting.** Up to 770 million FIL is released based on network performance: the closer the network's raw storage capacity is to a baseline that grows over time, the more of it is minted.

So the FIL per block reward changes over time. Current values are listed on block explorers such as [Filfox](https://filfox.info/en). For the full supply, see [The FIL token](../fil/the-fil-token.md).

## How each reward is split

Since the Solstice network upgrade (network version 29, [FIP-0118](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0118.md)), which activated on [Mainnet](../networks/mainnet.md) on 19 October 2026, each newly minted block reward is divided into streams:

| Stream | Paid to | Share |
| --- | --- | --- |
| Consensus | The provider that won the block | Starts at 95% and ramps down to 50% over about nine quarters |
| Service | Registered service orchestrators, who turn it into paying storage demand | Starts at 5%. It rises in 5-point steps each quarter, up to a ceiling, only if that quarter's Filecoin Pay volume meets a target |
| Burn | The burn account | Whatever remains |

A quarter is 262,974 epochs, about 91 days. Gas fees still go in full to the provider that wins the block, and penalties are assessed as before. The weights are set by governed contracts and can change, so check the FIP and the [Reward actor](../../reference/built-in-actors/README.md) for the current values.

### What counts as meeting a target

A quarter's target is met when the onchain settlement volume processed through Filecoin Pay, on (payer, operator) pairs registered to a service orchestrator, reaches that quarter's target amount.

### The quarterly targets

The first target is $3,500 a quarter, close to Filecoin Pay's quarterly volume when FIP-0118 was written. Each later target is 2.7 times the one before: $3.5K, $9.45K, $25.5K, $68.9K, $186K, $502K, $1.36M, and $3.66M for the last step, from 45% to 50%. The service share is capped at its ceiling.

### When targets are missed: burn

The consensus share drops continuously, but the service share is only raised when a quarterly gate is checked. Whatever neither stream receives is burned:

* Even if every target is hit on time, 0.9% to 5.9% of block rewards are burned, because of the brief lag between the continuous consensus drop and the quarterly gate checks.
* Each missed gate adds another 5 percentage points to the burn rate.
* If no target is ever met, the service share stays capped at 10%, and up to 40% of every block reward is burned once the consensus share reaches its 50% floor.

## Vesting

"Vesting" describes three different things on Filecoin. Check which one a page means before you compare numbers.

| Kind | What it covers | Status |
| --- | --- | --- |
| Block reward vesting | A winning provider's block reward does not all become available at once. It vests over time. | Ongoing. The schedule is on [Payouts and withdrawals](../../provide-storage/payouts-and-withdrawals.md). |
| Unminted block rewards pool | The FIL that has not yet been minted as block rewards. See [Where the FIL comes from](#where-the-fil-comes-from). | Ongoing. |
| Genesis pool | FIL allocated at the network's launch. | Complete. |

For the supply each pool contributes, see [The FIL token](../fil/the-fil-token.md).

## Next steps

* [Slashing](slashing.md): the penalties that reduce what a provider keeps.
* [Committed capacity](committed-capacity.md): how providers build storage power without customer data.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/economics/block-rewards)
