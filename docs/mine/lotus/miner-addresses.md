---
title: 'Lotus Miner: Addresses'
description: 'A miner can be configured with an owner address, a worker address, and additional control addresses. These allow granularity in how the funds sent and received from the miner are managed and provide additional security to the mining operation.'
breadcrumb: 'Miner addresses'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

During miner initialization, a _miner actor_ is created on the chain, and this actor gives the miner its ID `t0...`. The miner actor is in charge of collecting all the payments sent to the miner. For example, when a payment is sent for honoring the different types of deals, that payment goes to the miner actor, not the miner itself.

The Lotus Miner daemon performs the operations required by the network and can use different Lotus node wallets to pay the fees or interact with the _miner actor_. Check out the [Lotus Getting Started guide](../../get-started/lotus/send-and-receive-fil.md) for more information on how to manage Lotus wallets.

The currently configured addresses used by a miner can be listed with:

```sh
lotus-miner actor control list
```

The different types of addresses associated with a miner are described below:

## The owner address

The owner address corresponds to a Lotus node address provided during the [miner initialization](miner-setup.md). The _owner address_ is only needed when:

- Changing the owner or the worker address in the _miner actor_.
- Withdrawing balance from the _miner actor_.
- Submit _WindowPoSts_, **unless _control addresses_ are defined and have enough balance** (continued below).

The address chosen to be the miner's _owner address_ is designed to be kept offline in _cold storage_, or backed up by a [hardware wallet](../../get-started/lotus/ledger). In production environments, we strongly recommend using separate _owner_ and _worker_ addresses.

The owner address can be updated with the following command:

```sh
lotus-miner actor set-owner --really-do-it <address>
```

The old and the new address must be available to the Lotus node. You can [create a new address or import an existing one](../../get-started/lotus/send-and-receive-fil.md).

## The worker address

The _worker address_ is used to send and pay for day-to-day operations performed by the miner:

- Initializing the miner on the chain.
- Changing the miner peer id or the multiaddresses.
- Interacting with market and payment channel actors.
- Signing new blocks.
- Submitting proofs, declaring faults. _WindowPoSts_ are submitted using the _worker address_ if:
  - Control addresses are not defined or do not have enough balance.
  - The _owner address_ does not have enough balance.

Unlike the _owner address_, the address set as the miner's _worker address_ should be part of the Lotus local wallet and accessible by the miner. The Lotus Miner will trigger all the necessary transactions using the Lotus node to which it is connected. The _worker address_ must have enough funds to pay for the day-to-day operations of the miner, including initialization.

## Control addresses

_Control addresses_ can be used to submit _WindowPoSts_ proofs to the chain. _WindowPoSt_ is the mechanism through which storage is verified in Filecoin and which requires miners to submit proofs for all sectors every 24 hours. Those proofs are submitted as messages to the blockchain and therefore need to pay the respective fees.

Many mining-related actions require sending messages to the chain, but not all of those are as high-value as _WindowPoSts_. We recommended using _control addresses_ to avoid head-of-line blocking problems in congested chain conditions. [Head-of-line blocking](https://en.wikipedia.org/wiki/Head-of-line_blocking) is a performance-limiting phenomenon that occurs when the first transaction holds up a line of transactions.

Multiple _control addresses_ can be created and configured in a Lotus miner. The first _control address_ found to have enough funds to submit a _WindowPoSt_ transaction will be used. Otherwise, Lotus fails over to the _owner_ and ultimately to the _worker_ address.

To set up a _control address_:

1. Create a new address and send it some funds for gas fees:

   ```sh
   lotus wallet new bls
   > f3defg...

   lotus send --from <address> f3defg... 100
   ```

1. Inform the miner of the new address:

   ```sh
   lotus-miner actor control set --really-do-it f3defg...

   > Add f3defg...
   > Message CID: bafy2...
   ```

1. Wait for the message to land on chain:

   ```sh
   lotus state wait-msg bafy2...

   > ...
   > Exit Code: 0
   > ...
   ```

1. Check the miner control address list to make sure the address was correctly added:

   ```sh
   lotus-miner actor control list

   > name       ID      key           use    balance
   > owner      t01111  f3abcd...  other  300 FIL
   > worker     t01111  f3abcd...  other  300 FIL
   > control-0  t02222  f3defg...  post   100 FIL
   ```

Repeat this procedure to add additional addresses.

## Managing balances

Get the balances associated with a miner wallet by calling `info`:

```bash
lotus-miner info

> Miner: t01000
> Sector Size: 2 KiB
> Byte Power:   100 KiB / 100 KiB (100.0000%)
> Actual Power: 1e+03 Ki / 1e+03 Ki (100.0000%)
>   Committed: 100 KiB
>   Proving: 100 KiB
> Below minimum power threshold, no blocks will be won
> Deals: 0, 0 B
>   Active: 0, 0 B (Verified: 0, 0 B)
>
> Miner Balance: 10582.321501530685596531 FIL
>   PreCommit:   0.000000286878768791 FIL
>   Pledge:      0.00002980232192 FIL
>   Locked:      10582.321420164834231291 FIL
>   Available:   0.000051276650676449 FIL
> Worker Balance: 49999999.999834359275302423 FIL
> Market (Escrow):  0 FIL
> Market (Locked):  0 FIL
```

In this example, the miner ID is `t01000`, it has a total balance of `10582.321501530685596531 FIL`, and an available balance of `0.000051276650676449 FIL` that can be used as collateral or to pay for the pledge. The worker balance is `49999999.999834359275302423 FIL`.

## Withdrawing funds from the Miner actor

Transfer funds from the Miner actor address to the owner address by calling `actor withdraw`:

```bash
lotus-miner actor withdraw <amount>
```

::: tip
The owner's address will need to be available in the Lotus node and have enough funds to pay for the gas for this transaction. Cold addresses will need to be temporally imported for the operation to succeed.
:::
