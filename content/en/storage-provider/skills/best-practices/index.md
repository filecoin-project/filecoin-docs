---
title: "Best practices"
description: "This page describes best practices for storage providers on the Filecoin network.."
lead: "This page describes best practices for storage providers on the Filecoin network."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-skills"
    identifier: "best-practices-258bdc45ab2de852423d8ef2306e83bd"
weight: 800
aliases:
---

<!--
PLEASE READ BEFORE EDITING THIS PAGE

If you are adding a best practice, tip or trick, format it similar to 
the example shown in the comment box below:
!-->

<!--

## Transactions

Best practices for transactions are described below.

### Consistently generating transaction receipts

Since receipts in Filecoin are generated in the next tipset, depending on when a transaction is submitted to the mempool, the receipt may take between 30 and 90 seconds to return. To consistently return transaction receipts when deploying a transaction or awaiting confirmation, change the default transaction receipt timeout (60000 ms or 1 minute for many toolchains) to 90 seconds or more. An example that sets `timeout` to `180000` (3 minutes) for an Open Zeppelin upgradeable proxy is as follows:

```js
const deployment = await upgrades.deployProxy(contract, preparedArguments, {
    timeout: 180000
});
```

!-->