---
title: 'Lotus Miner: Wallets'
description: 'A miner can be configured with an owner address, a worker address and additional control addresses. These allow granularity in how the funds sent and received from the miner are managed and provide additional security to the mining operation.'
breadcrumb: 'Miner Wallets'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

During miner initialization, a _miner actor_ is created on the chain. This actor gives the miner its ID: `t0...`. The miner actor is in charge of collecting all the payments sent to the miner when, for example, honoring the different types of deals.

The Lotus Miner daemon, in turn, performs the operations as required by the network during and can use different Lotus Node wallets to pay the fees or interact with the _miner actor_. Information on how to manage Lotus wallets [can be found here](../../get-started/lotus/send-and-receive-fil.md).

::: tip
We use the terms _wallet_ and _address_ rather interchangeably in this document. A Lotus _wallet_ is identified by its _address_.
:::

The currently configured wallets used by a miner can be listed with:

```sh
lotus-miner actor control list
```

The different types of wallets associated to a miner are described below:

[[TOC]]

## The owner address

The owner address corresponds to a Lotus Node wallet address that is provided during the [miner initialization](miner-setup.md). The _owner address_ is only needed when:

- Changing the owner or the worker address in the _miner actor_
- Withdrawing balance from the _miner actor_
- Submit _WindowPoSts_ (**unless _control addresses_ are defined and have enough balance**, see below)

The wallet associated to the _owner address_ is designed to be kept offline as a cold wallet, given that it should not be used often and it is critical to safeguard the miner's funds. In production environments, we strongly recommend using separate _owner_ and _worker_ addresses.

The owner address can be updated with the following command:

```sh
lotus-miner actor set-owner --really-do-it <address>
```

The old and the new address must be available in the Lotus node. For the new address, you can [create a new one or import an existing one](../../get-started/lotus/send-and-receive-fil.md).

## The worker address

The _worker address_ is used to send and pay for day-to-day operations performed by the miner:

- Initializing the miner on the chain
- Changing the miner peer id or the multiaddresses
- Interacting with market and payment channel actors
- Signing new blocks
- Submitting proofs, declaring faults. _WindowPoSts_ are submitted using the _worker address_ if:
  - Control addresses are not defined or do not have enough balance
  - The _owner address_ does not have enough balance

Thus, unlike the _owner wallet_, the _worker wallet_ must necessarily be a _hot_ wallet. The Lotus Miner will trigger all the necessary transactions using the Lotus Node to which it is connected. The _worker address_ must have enough funds to pay for the day-to-day operations of the miner, including initialization.

## Control addresses

_Control addresses_ can be used to submit _WindowPoSts_ proofs to the chain. _WindowPoSt_ is the mechanism through which storage is verified in Filecoin and which requires miners to submit proofs for all sectors every 24h. Those proofs are submitted as messages to the chain and therefore need to pay the respective fees.

Many mining related actions require sending messages to the chain but not all of those are as "high value" as _WindowPoSts_. For this reason, it is recommended to use _control addresses_ as a way to avoid head-of-line blocking problems in congested chain conditions.

Multiple _control addresses_ can be created and configured in a Lotus Miner. The first _control address_ found to have enough funds to submit a _WindowPoSt_ transaction will be used. Otherwise Lotus fails over to the _owner_ and ultimately to the _worker_ address.

To set up a _control address_, first, create a new wallet and send it some funds to it for gas fees:

```sh
lotus wallet new bls
t3defg...

lotus send --from <address> t3defg... 100
```

Next, let the miner know about the new address:

```sh
$ lotus-miner actor control set --really-do-it t3defg...
Add t3defg...
Message CID: bafy2..
```

Wait for the message to land on chain:

```sh
lotus state wait-msg bafy2..
...
Exit Code: 0
...
```

Finally, check the miner control address list to make sure the address was correctly added:

```sh
$ lotus-miner actor control list
name       ID      key           use    balance
owner      t01111  t3abcd...  other  300 FIL
worker     t01111  t3abcd...  other  300 FIL
control-0  t02222  t3defg...  post   100 FIL
```

You can repeat this procedure to add additional addresses.

## Managing balances

To get the balances associated with your miner wallet, run:

```bash
$ lotus-miner info
Miner: t01000
Sector Size: 2 KiB
Byte Power:   100 KiB / 100 KiB (100.0000%)
Actual Power: 1e+03 Ki / 1e+03 Ki (100.0000%)
	Committed: 100 KiB
	Proving: 100 KiB
Below minimum power threshold, no blocks will be won
Deals: 0, 0 B
	Active: 0, 0 B (Verified: 0, 0 B)

Miner Balance: 10582.321501530685596531 FIL
	PreCommit:   0.000000286878768791 FIL
	Pledge:      0.00002980232192 FIL
	Locked:      10582.321420164834231291 FIL
	Available:   0.000051276650676449 FIL
Worker Balance: 49999999.999834359275302423 FIL
Market (Escrow):  0 FIL
Market (Locked):  0 FIL
```

Here, miner id is `t01000`, and it has total balance of `10582.321501530685596531 FIL` with an available balance of `0.000051276650676449 FIL` that can be used as collateral/pay for the pledge. The worker balance is `49999999.999834359275302423 FIL`.

## Withdrawing funds from the Miner actor

The funds in the _Miner actor_ can be withdrawn to the _owner address_ using:

```bash
lotus-miner actor withdraw <amount>
```

::: tip
Note that the owner address will need to be available in the Lotus Node and have enough funds to pay for the gas for this transaction. Thus, cold wallets will need to be temporally imported for the operation to succeed.
:::
