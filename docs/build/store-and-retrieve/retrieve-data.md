---
title: Retrieve data
description: Learn how to get data out of the Filecoin network using Lotus. The final piece of this tutorial is downloading data from the Filecoin network. The process is pretty simple, and can be completed with just one command.
---

# Retrieve data

In the previous step you stored some data on the Filecoin network. It takes anywhere from 24 to 48 hours for a miner to _seal_ the data, so if you finished the previous step moment ago then your data likely isn't available for download just yet. Instead, we're going to grab some data that is already sealed and ready to download!

## Send a retrieval request

The structure for a retrieval command is:

```shell
lotus client retrieve --miner <MINER ID> <DATA CID> ~/output-file
```

To finish off this tutorial, you can retieve a file using the following information:

| Miner ID | Data CID |
| --- | --- |
| `f071624` | `bafyaa6asgafcmalqudsaeihulnwwprgo2nji3xt27abm6s6bse2yx4avwrykncjqefsnxhu3pyjaagelucbyabasf4fcmalqudsaeidj3qs3xbcfyymp7kwu7355decs3ix4srn5cb5sxblqu6vjt3wwqyjaaghyv6xxmcqtbabbrswpv33aiieaqcaiabbazlh245q` |

Using the template above, your command should look like this:

```shell
lotus client retrieve --miner f071624 bafyaa6asgafcmalqudsaeihulnwwprgo2nji3xt27abm6s6bse2yx4avwrykncjqefsnxhu3pyjaagelucbyabasf4fcmalqudsaeidj3qs3xbcfyymp7kwu7355decs3ix4srn5cb5sxblqu6vjt3wwqyjaaghyv6xxmcqtbabbrswpv33aiieaqcaiabbazlh245q ~/output-file.tar
```

After submitting this command, your Lotus lite-node will send the retrieval deal to the miner and wait for a response:

```shell
> Recv: 0 B, Paid 0 FIL, ClientEventOpen (DealStatusNew)
> Recv: 0 B, Paid 0 FIL, ClientEventDealProposed (DealStatusWaitForAcceptance)
> Recv: 120 B, Paid 0 FIL, ClientEventBlocksReceived (DealStatusWaitForAcceptance)
> ...
```

This can time some time depending on how congested the network is at the time. You must keep the `lotus daemon` running.

Once the request has been receieved and processed by the miner, your Lotus lite-node will start downloading the data to your computer.

```shell
>
>
```

## Next steps

To finish off this tutorial [let's review everything you did →](./conclusion)

