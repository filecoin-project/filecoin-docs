---
title: Retrieve data
description: Learn how to get data out of the Filecoin network using Lotus. The final piece of this tutorial is downloading data from the Filecoin network. This section covers creating a retrieval deal with a storage provider and downloading the data through your local Lotus lite-node. 
---

# Retrieve data

In the previous step, you stored some data on the Filecoin network. It takes anywhere from 24 to 48 hours for a storage provider to _seal_ the data, so if you finished the previous step moment ago, then your data likely isn't available for download just yet. Instead, we're going to grab some data that is already sealed and ready to download!

## Check address balance

Before you can retrieve data from a storage provider, you need to check that you have enough FIL to pay for the retrieval.

1. List all the addresses on this Lotus lite-node:

    ```shell
    lotus wallet list

    ```

    Lotus will output something like:

    ```shell
    > Address                                    Balance  Nonce  Default  
    > f16mwizoeloamhp4dea4uy367mlihddw2mflnb5vy  10 FIL   0      X  
    ```

    Any balance above 0.1 FIL is enough to retrieve the data we are requesting in this tutorial. 

:::warning Low or no balance
If you do not have enough FIL, you need to transfer some FIL to this account. You can either do this by using a cryptocurrency exchange or having a friend send you FIL. The address `f1...` listed when you run `lotus wallet list` is your public address; use this when requesting money from an exchange or your friend.

Check out the [Managing assets section](../../../about-filecoin/managing-assets) for information on [withdrawing FIL from an exchange →](../../../about-filecoin/managing-assets/#exchanges)
:::

## Send a retrieval request

The structure for a retrieval command is:

```shell
lotus client retrieve --miner <MINER ID> <DATA CID> ~/output-file
```

To finish off this tutorial, you can retrieve a file using the following information:

| Miner ID | Data CID |
| --- | --- |
| `f071624` | `bafyaa6asgafcmalqudsaeihulnwwprgo2nji3xt27abm6s6bse2yx4avwrykncjqefsnxhu3pyjaagelucbyabasf4fcmalqudsaeidj3qs3xbcfyymp7kwu7355decs3ix4srn5cb5sxblqu6vjt3wwqyjaaghyv6xxmcqtbabbrswpv33aiieaqcaiabbazlh245q` |

1. Using the template above, create the following command: 

    ```shell
    lotus client retrieve --miner f071624 bafyaa6asgafcmalqudsaeihulnwwprgo2nji3xt27abm6s6bse2yx4avwrykncjqefsnxhu3pyjaagelucbyabasf4fcmalqudsaeidj3qs3xbcfyymp7kwu7355decs3ix4srn5cb5sxblqu6vjt3wwqyjaaghyv6xxmcqtbabbrswpv33aiieaqcaiabbazlh245q ~/output-file.tar
    ```

    After submitting this command, your Lotus lite-node will send the retrieval deal to the storage provider and wait for a response:

    ```shell
    > > Recv: 0 B, Paid 0 FIL, ClientEventOpen (DealStatusNew)
    > > Recv: 0 B, Paid 0 FIL, ClientEventDealProposed (DealStatusWaitForAcceptance)
    > > Recv: 120 B, Paid 0 FIL, ClientEventBlocksReceived (DealStatusWaitForAcceptance)
    > > ...
    ```

1. Wait for the process to finish:

    ```shell
    > > Recv: 1.231 GiB, Paid 0.000000002569142626 FIL, ClientEventAllBlocksReceived (DealStatusSendFundsLastPayment)
    > > Recv: 1.231 GiB, Paid 0.000000002644070646 FIL, ClientEventPaymentSent (DealStatusFinalizing)
    > > Recv: 1.231 GiB, Paid 0.000000002644070646 FIL, ClientEventComplete (DealStatusCompleted)
    > Success
    ```

    This process can take some time, depending on how congested the network is and how much load this storage provider is under. You must keep the `lotus daemon` running. Once the request has been received and processed by the storage provider, your Lotus lite-node will start downloading the data to your computer.

1. This step is optional and is not critical to this tutorial. You now have a file called `output-file.tar` in your _Home_ `~` directory. You can unpack it with `tar xvf ~/output-file.tar`:

    ```shell
    tar xvf ~/output-file.tar

    > regolith-isos/
    > regolith-isos/regolith-20.04.0-1.4.1-desktop-amd64.iso
    > regolith-isos/padding.file 
    ```

    Again, unpacking the `output-file.tar` file is not critical for the completion of this tutorial. The `output-file.tar` file is about 30 GiB, so unpacking it with `tar xvf` could take a while. 

1. That's it!

This is the end of the Filecoin _store and retrieve_ tutorial series!
