---
title: "Best practices"
description: "This page describes best practices for testing, developing and deploying smart contracts on the Filecoin network."
lead: "This page describes best practices for testing, developing and deploying smart contracts on the Filecoin network."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: "foundry-c9d70a9bb594275b17454ac6fc9abfaa"
weight: 410
---

{{< beta-warning >}}

## Transactions

Best practices for transactions are described below.

### Consistently generating transaction receipts

Since receipts in Filecoin are generated in the next tipset, depending on when a transaction is submitted to the mempool, the receipt may take between 30 and 90 seconds to return. To consistently return transaction receipts when deploying a transaction or awaiting confirmation, change the default transaction receipt timeout (60000 ms or 1 minute for many toolchains) to 90 seconds or more. An example that sets `timeout` to `180000` (3 minutes) for an Open Zeppelin upgradeable proxy is as follows:

```js
const deployment = await upgrades.deployProxy(contract, preparedArguments, {
    timeout: 180000
});
```

## Storage deal making

### Improve the acceptance rate of your deal proposal

Storage Providers (SPs) are incentivized to accept deal proposals that meet certain parameters such as minimum deal size or [FIL+ datacap verified](https://filplus.info/). If your deal proposal is not well aligned with those parameters, it may take longer for your proposal to be accepted and your data to be stored. To improve rate at which your storage deal proposals are accepted, ensure you have the recommended aount of funds in your contract, and that your deal meets the minimum deal size, based on whether you have datacap (verified deals) or not (unverified deals):

Do you have datacap? | Funds in contract ($ per TiB per year) | Minimum deal size
-- | -- | --
Yes | $0 | 512 MB (4GB preferred)
No | $240 | 512 MB (4GB preferred)

You can apply for datacap verification on the [Filecoin mainnet](https://filplus.info/) and the [Hyperspace testnet](https://hyperspace.yoga/#notary). Select **Automatic Verification** for deal sizes greater than 32GB and **General Verification** for deal sizes less than 32GB.  
