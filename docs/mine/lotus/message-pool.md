---
title: 'Lotus Miner: the message pool'
description: 'The Message Pool (mpool) is the component of lotus that handles pending messages for inclusion in the chain.'
breadcrumb: 'Message Pool'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} Messages are added to the mpool either directly for locally published messages or through pubsub propagation. Whenever a miner is ready to create a block for a tipset, it invokes the mpool selection algorithm which selects an appropriate set of messages such that it optimizes miner reward and chain capacity.

When messages are executed, they use _gas_. The amount of _gas_ used, the parameters attached to each message and the Network's current _BaseFee_ determine the final FIL-cost to include the transaction in the chain. Part of that cost is burned by the network. The other part is given to the miner of the first block that includes the transaction as a reward.

The different caps and fees for messages are explained below, along with instructions on how to inspect and interact with the message pool.

::: tip
Lotus provides the tooling to interact with the message pool with the `lotus mpool` subcommands.
:::

[[TOC]]

## Message selection

When mining a new block, miners must select a set of messages for inclusion in a way that maximizes the reward. Given how message distribution works, using pubsub, and that miners do not communicate their tickets to each other, it is not possible to fully determine if a different miner will also include the message on a different block in the new tipset, and perhaps get the reward instead if their block executes first. The problem is NP-hard (an instance of knapsack packing) so, at best, an approximation can be made to the optimal selection in a reasonable amount of time.

Lotus employs a sophisticated algorithm for selecting messages for inclusion from the pool, given the ticket quality of a miner. The ticket quality reflects the probability of execution order for a block in the tipset. Given the ticket quality the algorithm computes the probability of each block, and picks dependent chains of messages such that the reward is maximized, while also optimizing the capacity of the chain.

If the ticket quality is sufficiently high, then a greedy selection algorithm is used instead that simply picks dependent chains of maximum reward. Note that pending message chains from priority addresses are always selected, regardless of their profitability.

## Gas, fees, limits and caps

When a message is executed it consumes _gas_. The total gas consumed by a message directly affects the cost to place that message in the blockchain, which is a price that the sender will have to pay.

::: tip
Lotus can be configured with several addresses to have more granular control over fees and limits depending on the operation and avoid head-of-line blocking, particularly for high value operations such as _WindowPoSts_. Check the [miner addresses guide](miner-addresses.md).
:::

The [How Filecoin works page](../../about-filecoin/how-filecoin-works.md) explains gas-usage and fee in more detail. As an additional tip, you can use Lotus to find out about the current _BaseFee_:

```sh
# Will print the last BaseFee in attoFIL
lotus chain head | xargs lotus chain getblock | jq -r .ParentBaseFee
```

## Checking for pending messages

If messages are not deemed attractive enough by miners to be included in new blocks, they may become stuck in the message pool. This is usually a consequence of the _GasFeeCap_ being too low, for example, when the Network's _BaseFee_ is high. It can also be a consequence of the _GasPremium_ being too low if the network is congested.

You can check for messages currently in the pool and specifically sent by your node with:

```sh
lotus mpool pending --local
```

For each message you will be able to see key information like the _GasLimit_, the _GasFeeCap_ and the _GasPremium_ values, explained above.

To reduce the output to the messages key values you can use:

```sh
lotus mpool pending --local | grep "Nonce" -A5
```

In order to avoid messages from staying long periods in the pool when they are sent, it is possible to adjust the [Lotus Miner fees in the configuration](miner-configuration.md) and use [additional control addresses for _WindowPoSts_](miner-addresses.md). Existing messages can be replaced at any time with the procedure explained below.

## Replacing messages in the pool

You can replace messages in the pool by pushing a new message with the same `Nonce` that has a **new `GasPremium` that is at least 25% larger than that of the original message**. To this effect, the easiest is to use:

```sh
lotus mpool replace --auto <from> <nonce>
```

The above command will replace the associated message in the pool and automatically reprice it with a new _GasPremium_ and _GasFeeCap_ as estimated from the current network conditions. You can also set `--fee-limit` if you wish to limit the total amount to spend for the message. All other flags are ignored.

::: warning
`--fee-limit` uses units of FIL with decimals support, whereas `--max-fee` uses `attoFIL`.
:::  

Alternatively, the _GasPremium_, _GasFeeCap_ can be set manually with their respective flags:

```sh
lotus mpool replace --gas-feecap <feecap> --gas-premium <premium> <from> <nonce>
```

If the new _gas premium_ is lower than the 1.25 ratio to the original, the message will not be included in the pool. Additional message fields, like the recipient of the transaction, can be changed when using the [`MpoolPush` API method](../../reference/lotus-api.md) directly. In this case the new message will need to be locally signed first.

The _GasLimit_ should not be changed under normal circumstances. For instructions on how to use the optional flag to replace the _GasLimit_ please consult

```sh
lotus mpool replace --help
```
