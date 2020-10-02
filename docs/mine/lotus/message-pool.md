---
title: 'Lotus Miner: the message pool'
description: 'The Message Pool (mpool) is the component of lotus that handles pending messages for inclusion in the chain.'
breadcrumb: 'Message Pool'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} Messages are added to the mpool either directly for locally published messages or through pubsub propagation. Whenever a miner is ready to create a block for a tipset, it invokes the mpool selection algorithm which selects an appropriate set of messages such that it optimizes miner reward and chain capacity.

When messages are executed, they use _gas_. The amount of _gas_ used, the parameters attached to each message and the Network's current _BaseFee_ determine how much FIL will be spent to include that message in the chain and how much of that expense will be given to the miner as reward, or burned.

The different caps and fees for messages are explained below, along with instructions on how to inspect and modify the current local message pool.

::: tip
Lotus provides the tooling to interact with the message pool with the `lotus mpool` subcommands.
:::

[[TOC]]

## Message selection

When mining a new block, miners must select a set of messages inclusion in a way that maximizes the reward. Given how message distribution works, using pubsub, and that miners do not communicate their tickets to each other, it is not possible to fully determine if a different miner will also include the message on a different block in the new tipset, and perhaps get the reward instead if their block executes first. The problem is NP-hard (a instance of knapsack packing) so, at best, an approximation can be made to the optimal selection in a reasonable amount of time.

Lotus employs a sophisticated algorithm for selecting messages for inclusion from the pool, given the ticket quality of a miner. The ticket quality reflects the probability of execution order for a block in the tipset. Given the ticket quality the algorithm computes the probability of each block, and picks dependent chains of messages such that the reward is maximized, while also optimizing the capacity of the chain.

If the ticket quality is sufficiently high, then a greedy selection algorithm is used instead that simply picks dependent chains of maximum reward. Note that pending message chains from priority addresses are always selected, regardless of their profitability.

## Gas, fees, limits and caps

When a message is executed it consumes _gas_. The total gas by a message directly affects the cost to place that message in the blockchain, that the sender will have to pay.

In the Filecoin Network, a dynamic **_BaseFee_**, measured in attoFIL/gas units, specifies how much FIL gets burned for every message based on the _gas_ they used for their execution. The _BaseFee_ gets automatically updated according to the network congestion parameters (block sizes). The current value can be obtained from one of the [block explorers](../../get-started/explore-the-network.md) or by looking at the current head:

```sh
# Will print the last BaseFee in attoFIL
lotus chain head | xargs lotus chain getblock | jq -r .ParentBaseFee
```

Apart from the _BaseFee_, every message in the message pool has the following gas-related fields:

- **_GasLimit_**: it is measured in gas units. It a hard limit on the amount of gas that a message's execution can consume. A message consumes gas for every fundamental operation it takes (see [prices](https://github.com/filecoin-project/lotus/blob/d678fe4bfa5b4c70bcebd46cdc38aafc452b42d1/chain/vm/gas.go#L87)). Messages can fail if they runs out of gas fails, at which point every modification to the state is reverted. Whether the execution is successful or not, the miner is given a reward calculated as _GasLimit _ GasPremium\*.
- **_GasPremium_**: it is measured in attoFIL/gas units. It indicates how much a miner earns as their reward for including a message. A message typically earns its miner _GasLimit \* GasPremium_ attoFIL.
- **_GasFeeCap_**: it is measured attoFIL/gas units. Its purpose is to establish a hard limit on the amount of FIL a message can cost its sender. A sender is guaranteed that a message will never cost them more than _GasLimit \* GasFeeCap_, not including any value that the message includes for its recipient. The total fee (in attoFIL/gas) for a message is _GasPremium + BaseFee_. Given that _GasPremium_ is set by the sender, _GasFeeCap_ essentially serves as a safeguard against a high, unexpected _BaseFee_.

Note that if a message's _GasFeeCap_ is lower than the _BaseFee_, then the remainder comes from the miner (as a penalty). If _BaseFee + GasPremium_ is less than the message's _GasFeeCap_, then the miner might not earn the entire _GasLimit \* GasPremium_ reward.

## Checking for pending messages in the local pool

If messages are not deemed attractive enough by miners to be included in new blocks, they may become stuck in the local message pool. This is usually a consequence of the _GasFeeCap_ being too low, for example, when the Network's _BaseFee_ is high. It can also be a consequence of the _GasPremium_ being too low if the network is congested.

You can check for messages currently in the local pool with:

```sh
lotus mpool pending --local
```

For each message you will be able to see key information like the _GasLimit_, the _GasFeeCap_ and the _GasPremium_ values, explained above.

## Replacing messages in the messages pool

You can replace messages in the pool by pushing a new message with the same `Nonce` that has a **new `GasPremium` that is at least 25% larger than that of the original message**. To this effect, the easiest is to use:

```sh
lotus mpool replace --auto <from> <nonce>
```

The above command will replace the associated message in the pool and automatically reprice it with a new _GasPremium_ and _GasFeeCap_ as estimated from the current network conditions. You can also set `--max-fee` if you wish to limit the total amoun to spend for the message. All other flags are ignored.

Alternatively, the _GasPremium_, _GasFeeCap_ and, optionally, _GasLimit_ can be set manually with their respective flags:

```sh
lotus mpool replace --gas-feecap <feecap> --gas-premuim <premium> --gas-limit <limit> <from> <nonce>
```

If the new _gas premium_ is lower than the 1.25 ratio to the original, the message will not be included in the pool. Additional message fields, like the recipient of the transaction, can be changed when using the [`MpoolPush` API method](../../reference/lotus-api.md) directly. In this case the new message will need to be locally signed first.
