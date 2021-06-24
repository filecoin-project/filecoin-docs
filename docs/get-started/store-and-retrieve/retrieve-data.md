---
title: Retrieve data
description: Learn how to get data out of the Filecoin network using Lotus. The final piece of this tutorial is downloading data from the Filecoin network. This section covers creating a retrieval deal with a storage provider and downloading the data through your local Lotus lite-node. 
---

# Retrieve data

In the previous step, you stored some data on the Filecoin network. It takes anywhere from 24 to 48 hours for a storage provider to _seal_ the data, so if you finished the previous step moment ago, then your data likely isn't available for download just yet. But don't worry, you can still follow this page to retrieve some data we already put on the Filecoin network. 

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

## Get the deal information

Before you can send a retrieval request, you need to collect some information to structure the command. You will need:

| Variable | Description |
| --- | --- |
| `MINER ID` | This is the ID of the storage provider where the data is stored. |
| `DATA CID` | The `DATA CID`. This variable is also sometimes called the `PAYLOAD CID`. |
| `ADDRESS` | The public address that was initially used to create the storage deal. |

We're going to gather this information now.

1. Copy this address to your clipboard: `f16wc2ees6nkmk4pguoaaly4zdkeemaajjbv7aqgq`.

    :::tip Using a different address
    If you want to retrieve data that you stored using a different address, list your address using `lotus wallet list` and copy it to your clipboard. You will not be able to retrieve data stored less than 24 hours ago.
    :::

1. Go to [filecoin.tools](https://filecoin.tools).
1. Paste the address in the search bar and press `ENTER` to search for deals made by that address:

    ![Filecoin.tools showing all the deals made by a single address.](./images/filecoin-tools-search-address.png)

    :::warning Using a different address
    The default address supplied in this tutorial `f16wc2ees...` has only submitted one storage deal, so you'll only see one row in [filecoin.tools](https://filecoin.tools/f16wc2ees6nkmk4pguoaaly4zdkeemaajjbv7aqgq). If you are using a different address, you may see multiple rows. If you don't see _any_ rows, the address you searched for has not yet completed a deal. The address may have submitted a deal, but the miner is yet to _seal_ the data. Deals will only show up here once the miner has completed sealing the data.
    :::

1. Click anywhere on a row to view information about that specific deal:

    ![Information about a particular deal.](./images/filecoin-tools-show-details.png)

1. Make a note of the **Payload CID** and the **Miner ID**. You'll need both of these to create the retrieval command in the next step.

## Send a retrieval request

The structure for a retrieval command is:

```shell
lotus client retrieve --miner <MINER ID> <DATA CID> ~/output-file
```

1. Using the template above, create the command substituting the variables you got in the previous step. Your command should look something like this: 

    ```shell
    lotus client retrieve --miner f01278 mAXCg5AIgjVjEjFzXIO2fTUdaWKEGmeOevU76fzC/JgNp37oRrQI output-file
    ```

1. Run the command. After submitting this command, your Lotus lite-node will send the retrieval deal to the storage provider and wait for a response:

    ```shell
    > Recv: 0 B, Paid 0 FIL, ClientEventOpen (DealStatusNew)
    > Recv: 0 B, Paid 0 FIL, ClientEventDealProposed (DealStatusWaitForAcceptance)
    > Recv: 0 B, Paid 0 FIL, ClientEventDealAccepted (DealStatusAccepted)
    > ...
    ```

1. Wait for the process to finish:

    ```shell
    > Recv: 5.078 GiB, Paid 0 FIL, ClientEventBlocksReceived (DealStatusWaitingForLastBlocks)
    > Recv: 5.078 GiB, Paid 0 FIL, ClientEventAllBlocksReceived (DealStatusCompleted)
    > Success
    ```

    This process can take some time, depending on how congested the network is and how much load this storage provider is under. You must keep the `lotus daemon` running. Once the request has been received and processed by the storage provider, your Lotus lite-node will start downloading the data to your computer.

1. That's it!

## Next steps

This marks the end of the Filecoin Store and Retrieve tutorial series! By now you should have a good understanding of how the storage and retrieval process works on the Filecoin network, and also have some ideas on how to integrate this process into your projects! Feel free to carry on playing around with storing and retrieving data using Lotus and Filecoin. If you need a hand or get stuck, check out the [Filecoin Slack](https://filecoin.io/slack/).

