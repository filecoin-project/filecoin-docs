---
title: 'Lotus Miner: Use a separate address for WindowPoSt messages'
description: 'This guide explains how to separate the wallet used to send WindowPoSt messages from other wallets used by the miner so that customized gas fee limits can be used issuing these high-value transactions.'
breadcrumb: 'Separate address for WindowPoSt messages'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

WindowPoSt is the mechanism through which storage is verified in Filecoin and which requires miners to submit proofs for all sectors every 24h. Those proofs are submitted as messages to the chain which pay the respective fees.

Because many other mining related actions require sending messages to the chain, and not all of those are "high value", it may be desirable to use a separate account to send PoSt messages from. This allows for setting lower GasFeeCaps on the lower value messages without creating head-of-line blocking problems for the PoSt messages in congested chain conditions

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
