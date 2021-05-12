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

1. List deals that this node has made.
1. Get info.
1. Write it down.

## Send a retrieval request

The retrieval command is fairly simple. We just need to add the _Provider ID_ and _Data CID_ we got from the previous step, along with where we want to save the downloaded file to. The structure for a retrieval command is:

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

