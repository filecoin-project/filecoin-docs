---
title: Store data
description: Get stuck into storing your data on the Filecoin network. This section covers packaging your dat, importing it into your local Lotus lite-node, finding a miner through the MinerX progra, creating a storage deal, and then waiting for the deal to complete! 
---

# Store data

Get stuck into storing your data on the Filecoin network. This section covers packaging your dat, importing it into your local Lotus lite-node, finding a miner through the MinerX progra, creating a storage deal, and then waiting for the deal to complete! 

:::danger
Do not store personal data on the Filecoin network, even if it's encrypted. Access control is on the roadmap, but until then only store public and static data on the Filecoin network. 
:::

## Things to note

As you're going through this section, make a note of the following variables: 

| Variable | Description | Example |
| --- | --- | --- |
| Payload CID | The content identifer of the data that you want to store using Filecoin. | `bafk2bzaceajz56zudni2hli7id6jvvpo5n4wj5eoxm5xwj2ipthwc2pkgowwu` |
| Miner ID | The unique identifier for each miner. | `f01000`
| Deal CID | The content identifer for a deal made with a miner. | `bafyreict2zhkbwy2arri3jgthk2jyznck47umvpqis3hc5oclvskwpteau` | 

## Prepare your data

For the purposes of this tutorial, we're going to create a dummy 4GB file full of random data.

1. Create a block of random data to _pad_ the total size of our payload:

    If you're on macOS run:

    ```shell
    dd if=/dev/urandom of=4gb-filecoin-payload.bin bs=1m count=4096 
    ```

    If you're on Linux run: 

    ```shell
    dd if=/dev/urandom of=padded-4gb-filecoin-payload.bin bs=1M count=4096
    ```

We now have our payload file ready to be stored using the Filecoin network.

## Add data to Lotus

We need to tell our Lotus lite-node which file we want to store using Filecoin.

1. Import the payload into the `lotus daemon` using the `import` command: 

    ```shell
    lotus client import ~/4gb-filecoin-payload.bin 
    ```

    Lotus creates a distributed acyclic graphs (DAG) based off the payload. This process takes a few minutes. Once's it's complete Lotus will output the root CID of the payload.

    ```shell
    > Import 3, Root bafykb...
    ```

1. Make a note of the CID `bafykb...`; we'll use it in an upcoming section.

Now that Lotus knows which file we want to use, we can create a deal with a Filecoin miner to store our data!

## Find a miner 

Before we can store data, we need to select a suitable miner. The Filecoin network allows data storage miners to compete with one another by offering different terms for pricing, acceptable data sizes, and other important deal parameters. You should also take the location of the miner into consideration; the closer the miner is to you then the faster the storage and retrieval process will be. 

There are a few resources available for finding dependable miners that will accept your data. 

### MinerX 

<!-- TODO: Explain what MinerX is. -->

1. Go to [plus.fil.org/miners](https://plus.fil.org/miners/).
1. Using the table, find a miner that suits your needs. For the sake of this tutorial, look for a miner that is:
    a. Offering verified-data deals for 0 FIL.
    a. Close to you.
 
1. Once you have found a suitable miner, copy their `miner_id` from the **Miner ID** column:

    ![](./images/miner-x-listings.png)

    Some miners list multiple miner IDs. For these miners, just copy one of the IDs:

    ![](./images/miner-with-multiple-miner-ids.png)

1. Write down the ID of the miner you want to use. We'll be referring to it in the next section.

### Miner reputation systems 

The MinerX program is a great resource, but it represents a small portion of the entire Filecoin mining community. Filecoin reputation systems like [FilRep](https://filrep.io) can help compare miners based on their past performance and provide useful information about the deal parameters that a miner will accept.

Using FilRep you can see and compare important miner parameters and metrics including location, storage power in the network, pricing, and overall success rate. The column selection widget lets you see even more details, including the minimum and maximum file sizes that a miner will accept:

![](./images/filrep-select-columns.png)

Miner reputation systems can be used alongside programs like MinerX to find the best miner for your needs. To see what FilRep has to say about a member of the MinerX program, just paste the **Miner ID** from the MinerX list into the search box at [filrep.io](https://filrep.io).

## Create a deal 

To complete this section you need the data CID you received after running `lotus client import` and the ID of a miner you want to use.

1. Start the interactive deal process:

    ```shell
    lotus client deal
    ```

    The interactive deal assistant will now ask you some questions.

1. Specify the CID of the file you want to backup on Filecoin. This is the CID that you got from running `lotus client import ~/filecoin-payload.tar`:

    ```shell
    Data CID (from lotus client import): bafykbz...
    ```

1. Wait for Lotus to finish building the `.car` file.

    ```shell
    > .. calculating data size 
    ```

    The duration of this process depends on the size of your file and the specification of your Lotus node. Lotus took around 25 minutes to build the `.car` file of a ~7.5GB file with an 8-core CPU and 16GB RAM.

1. Enter the number of days you want to keep this file on Filecoin for. The minimum is 180 days:

    ```shell
    > Deal duration (days): 180 
    ``` 

1. Tell Lotus whether or not this is a Filecoin+ deal. Since we signed up to Filecoin+ and added some DataCap to our wallet in an earlier step, we'll select `yes` here:

    ```shell
    > Make this a verified deal? (yes/no): yes
    ```

1. Enter the miner ID from the previous section: 

    ```shell
    > Miner Addresses (f0.. f0..), none to find: f01000 
    ```

1. Enter `0` if you are asked how much FIL we are willing to spend for this storage deal:

    ```shell
    > Maximum budget (FIL): 0
    ```

    Since we picked a miner that is accepting 0 FIL deals for verified storage deals, and we are a _verified client_, then we don't actually need to spend any FIL here!

1. Specify how many miners you want your file to be replicated over. The default it one 

    ```shell
    Deals to make (1): 1
    ```

1. Confirm your transaction:

    ```shell
    > -----
    > Proposing from f136b5uqa73jni2rr745d3nek4uw6qiy6b6zmmvcq
    >         Balance: 2 FIL
    > 
    > Piece size: 8GiB (Payload size: 7.445GiB)
    > Duration: 7200h0m0s
    > Total price: ~0 FIL (0 FIL per epoch)
    > Verified: true
    > 
    > Accept (yes/no): yes
    ```

1. Lotus will returns a **Deal CID**:

    ```shell
    .. executing
    Deal (f01000) CID: bafyreict2zhkbwy2arri3jgthk2jyznck47umvpqis3hc5oclvskwpteau
    ```

1. Take a note of the deal CID `bafyre...`.

## Check the deal status 

We need to wait for the miner to accept our deal and _seal_ the data. This process can take up to 24 hours to complete, depending on how much data we asked the miner to store.

1. List successful and pending deals by using the `list-deals` command:

    ```shell
    lotus client list-deals
    ```

    If you cannot see your deal in the list, the deal may have failed. Use `--show-failed` to see failed deals:

    ```shell
    lotus client list-deals --show-failed
    ```

### Deal states

Because of the complex nature of Lotus and the Filecoin network, deals can be in one of many different states:

| State | Description |
| --- | --- |
| StorageDealUnknown | The current status of a deal is undefined or unknown. This could be because your full-node is out of sync. |
| StorageDealProposalNotFound | Your full-node cannot find the deal you are looking for. This could be because it doesn't exist, or your full-node is out of sync. |
| StorageDealProposalRejected | The miner has chosen not to accept this deal. The miner may have provided a reason along-side this status message, but not always. |
| StorageDealProposalAccepted | The miner intends to accept a storage deal proposal, however the miner has not made any commitment to do so at this point. |
| StorageDealStaged | The deal has been published and data is ready to be put into a sector. At this point the miner has fully committed to storing your data. |
| StorageDealSealing | The miner is sealing data into a sector. The larger your data-payload the longer this will take. |
| StorageDealFinalizing | All the data is within the sector, and the miner is performing the final checks to make sure that all the data is correct. |
| StorageDealActive | The data is in a sealed sector and the miner can provide the data back to you. |
| StorageDealExpired | A deal has passed it's final epoch. The miner could potentially still have the data available, but is under no obligation to provide it to anyone. |
| StorageDealSlashed | The data was in a sector, and the miner got slashed for failing to prove that the data was available. |
| StorageDealRejecting | The miner has rejected the deal. This comes immediately before StorageDealProposalRejected. |
| StorageDealFailing | Something has gone wrong in a deal. Once data is cleaned up the deal will finalize. |
| StorageDealFundsReserved | Your FIL has been deposited into escrow and is ready to be used to pay for the deal. |
| StorageDealCheckForAcceptance | The client is waiting for a miner to seal and publish a deal. |
| StorageDealValidating | The miner is validating that the deal parameters are good for a proposal. |
| StorageDealAcceptWait | The miner is running custom decision logic to decide whether or not to accept the deal. The deal will have this status until the custom logic comes to a decision. |
| StorageDealStartDataTransfer | The miner is ready to accept data from the client Lotus node. |
| StorageDealTransferring | Data is being transfered from the client Lotus node to the miner. |
| StorageDealWaitingForData | Either a manual transfer is taking place, or the miner has not received a data-transfer request from the client. |
| StorageDealVerifyData | All the data has been transfered, and the miner is now attempting to verify it against the PieceCID. |
| StorageDealReserveProviderFunds | The miner is checking that it has enough FIL for the deal. |
| StorageDealReserveClientFunds | The client is checking that is has enough FIL for the deal.|
| StorageDealProviderFunding | The miner has deposited funds into StorageMarketActor and is waiting for the funds to appear. |
| StorageDealClientFunding | The client has deposited funds into the StorageMarketActor and is waiting for the funds to appear. |
| StorageDealPublish | The deal is ready to be published on-chain. |
| StorageDealPublishing | The deal has been published, but is yet to appear on-chain. |
| StorageDealError | There has been an unforseen error. No further updates will occur. |
| StorageDealProviderTransferAwaitRestart | The miner restarted while data was being transferred from the client to the miner. Once the miner is back online it will wait for the client to resume the tranfer. |
| StorageDealClientTransferRestart | A storage deal data transfer from a client to a miner is restarting after a pause, likely caused by StorageDealProviderTransferAwaitRestart. |
| StorageDealAwaitingPreCommit | A deal is ready and must be pre-committed. |

This list comes from the [Lotus project GitHub repository](https://github.com/filecoin-project/go-fil-markets/blob/master/storagemarket/dealstatus.go).

## Next steps

Now that you've added some data onto the Filecoin network [we can move into retrieving data →](./retrieve-data)
