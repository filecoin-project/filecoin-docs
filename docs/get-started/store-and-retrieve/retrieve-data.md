---
title: Retrieve data
description: The final piece of this tutorial is downloading data from the Filecoin network. This section covers creating a retrieval deal with a storage provider and downloading the data through your local Lotus lite-node.
---

# Retrieve data

The final piece of this tutorial is downloading data from the Filecoin network. This section covers creating a retrieval deal with a storage provider and downloading the data through your local Lotus lite-node.

## Collect deal information

You need two pieces of information to retrieve data from a miner:

- The _Data CID_, sometimes called the _label_. This is the content identifier for the all the data stored in a single deal.
- The _Provider ID_ with whom you made to original deal to store the data with. This is sometimes called the _Miner ID_. 

If you are still connected to the same Lotus node that originally made the deal, then this process is very simple. Lotus nodes keep a log of all the deals it has made.

:::warning Working from a different Lotus node
If you need to find deal information about a particular address, but you don't have access to the Lotus node that originally made the deal, then the steps are slighly different. The easiest way to get the above information is to use an external tool like [filfox.io](https://filfox.io). Take a look at the [retrieving data section](../../store/lotus/retrieve-data/) for more information.
:::

To get the information you need:

1. List the deals that this node has made:

    ```shell
    lotus client list-deals --verbose

    > Created          DealCid                                                      DealId  Provider  State                     On Chain?  Slashed?  PieceCID                                                          Size       Price           Duration  TransferChannelID                                                                                                              TransferStatus  Verified  Message
    > May 11 22:54:45  bafyreigbt6ymhierghhjba6htch6immn6qnnrcku3z7masnmhgm5ibdiya  0       f0100 StorageDealFundsReserved  N          N         baga6ea4seaqelwsq2q4z7utvxdwpunid773rwxfzkvxckmr3nvztssczmkux2fi  7.938 GiB  0 FIL           522077
    ```

    Lotus spits out a lot of information here. If you find it hard to read, try adding `| less -S` onto the end of the command. This will force the terminal to display the output horizontally. In this view you can use the arrow keys to scroll left and right. Press `q` to exit this view.

1. Make a note of the `DealCid` and the `Provider`. In the example above the `DealCid` is `baftyr...` and the `Provider` is `f01001`. 

## Check that your upload has finished

Before you can retrieve data from a storage provider, that storage provider needs to have that data in the first place. In normal circumstances you'd be retrieving your data days or weeks after it was sent to a storage provider. However, we've been running through the process at lightening speed throughout this tutorial. So with that in mind, let's check to see if your data as finished transfering to the storage provider.

1. Use `lotus client list-transfers` to view any pending transfers:

    ```shell
    lotus client list-transfers

    > Sending Channels
    > 
    > 
    > ... 
    ```

    If there is no information in the **Sending** or **Receiving** channels then you're all set! [Move onto the next step ↓](#send-a-retrieval-request). 

1. If you have transfers still pending, you may see something like this:

    ```shell
    lotus client list-transfers

    > Sending Channels
    > 
    > ID                   Status   Sending To   Root Cid     Initiated?  Transferred  Voucher                                   
    > 1620782601911586915  Ongoing  ...KPFTTwY7  ...zyd3kapm  Y           3.301GiB     ...bqhcidjmajbelhlxfqry3d7qlu3tvar45a"}}  
    > ...
    ```

You cannot retrieve data from a storage provider that has not yet finished receiving your inital data upload. To complete this tutorial, you can either wait for the upload from your Lotus node to complete, or use the following information to create a retrieval deal for a file we uploaded to a miner.

| Provider ID | Data CID |
| --- | --- |
| `` | `` | 

The data listed above is a 5GB dummy file made up of random data from `/dev/random` on a Ubuntu machine. 

## Send a retrieval request

The retrieval command is fairly simple. We just need to add the _Provider ID_ and _Data CID_ we got from the previous step, along with where we want to save the downloaded file to.

1. Use the `retrieve` command to request data from a miner:

    ```shell
    lotus client retrieve --miner <PROVIDER ID> <DATA CID> ~/output-file
    ```

    Replace `<PROVIDER ID>` and `<DATA CID>` in the above command with your _Provider ID_ and _Data CID_, respectively.

1. After submitting `retrieve` command, your Lotus lite-node will send the retrieval deal to the storage provider and wait for a response:

    ```shell
    > Recv: 0 B, Paid 0 FIL, ClientEventOpen (DealStatusNew)
    > Recv: 0 B, Paid 0 FIL, ClientEventDealProposed (DealStatusWaitForAcceptance)
    > Recv: 120 B, Paid 0 FIL, ClientEventBlocksReceived (DealStatusWaitForAcceptance)
    > ...
    ```

    This can take some time depending on how congested the network is and how much load this storage provider is under. You must keep the `lotus daemon` running. Once the request has been received and processed by the storage provider, your Lotus lite-node will start downloading the data to your computer.

1. Wait for the download to complete. Again, the speed of this process depends on your connection to the miner and the size of your download. When creating this tutorial, it took us around 3 minutes to download a 5GB file from a miner.
1. Once the download is complete, you should have a file in your home directory called `output-file`.

## Next steps

To finish off this tutorial [let's review everything you did →](./conclusion)

