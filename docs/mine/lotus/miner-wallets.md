---
title: 'Lotus Miner: Wallets'
description: 'A miner can be configured with an owner address, a worker address and additional control addresses. These allow granularity in how the funds sent and received from the miner are managed and provide additional security to the mining operation.'
breadcrumb: 'Miner Wallets'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

During miner initialization, a miner actor is created on the chain. This actor gives the miner its ID (and looks like `t0...`). The miner actor be in charge of collecting all the payments sent to the miner (as identified by its ID).

The Lotus Miner daemon, in turn, performs the operations as required by the network during and can use different Lotus Node wallets to pay the fees or interact with the Miner actor. Information on how to manage Lotus wallets [can be found here](../../get-started/lotus/send-and-receive-fil.md).

The different types of wallets associated to a miner are described below:

[[TOC]]

## The owner address

The owner address corresponds to a Lotus Node wallet address that is provided during the [miner initialization](miner-setup.md). It is a privilegdged address since it is the only one able to withdraw funds from the miner actor and pay for any miner-actor-triggered changes.

The owner address will be used as worker and control address if none are defined.

Given the high value of this wallet, we recommend using a separate worker address and keeping the owner address offline as a cold wallet.

## The worker address

Then provided, the worker address is used to sign blocks and submit proofs associated with this miner (otherwise the owner address is used). It must be a BLS address and can be specified during `init` with the `--worker` flag.

The worker address is used to sign and send various types of messages (WHICH ONES? including the createStorageMiner message), which means it needs to pay for the gas of those messages. Make sure you keep an eye on its balance!

## Control addresses

Control addresses can be used to pay for WindowPoSt messages (ONLY?).

WindowPoSt is the mechanism through which storage is verified in Filecoin and which requires miners to submit proofs for all sectors every 24h. Those proofs are submitted as messages to the chain which pay the respective fees.

Because many other mining related actions require sending messages to the chain, and not all of those are "high value", it may be desirable to use a separate account to send PoSt messages from. This allows for setting lower GasFeeCaps on the lower value messages without creating head-of-line blocking problems for the PoSt messages in congested chain conditions.

To set this up, first create a new wallet, and send it some funds to it for gas fees:

```sh
lotus wallet new bls
t3defg...

lotus send t3defg... 100
```

Next add the control address:

```sh
lotus-miner actor control set --really-do-it t3defg...
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

Finally, check the miner control address list to make sure the address was correctly setup:

```sh
lotus-miner actor control list
name       ID      key           use    balance
owner      t01111  t3abcd...  other  300 FIL
worker     t01111  t3abcd...  other  300 FIL
control-0  t02222  t3defg...  post   100 FIL
```

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

## Adding funds to the owner address

```bash
./lotus send --from=<worker_address> <miner_id> <amount>
```

::: tip
Since the worker address pays for the gas of the send message as well, so don't send the full amount of your worker balance!
:::

## Withdrawing miner funds to the owner address

To withdraw funds from the Miner actor to the owner address run:

```bash
lotus-miner actor withdraw <amount>
```

::: tip
Note that the owner address will need to be available in the Lotus Node and have enough funds to pay for the gas for this transaction.
:::
