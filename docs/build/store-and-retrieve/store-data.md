---
title: Store data
description: Lorem ipsum. 
---

<!-- TODO: create a useful description/intro for this page. -->

# Store data

Now we can get started with _storing_ the stuff we want to archive on Filecoin. We first need to prepare it into a format that Lotus can manage.

## Prepare your data

We want to store the [ISS_COORDS_2021-03-25 dataset](https://data.nasa.gov/Space-Science/ISS_COORDS_2021-03-25/qti9-kibp) from NASA. If you've got some other data you'd prefer to store on Filecoin, go ahead and up that!

:::danger
Do not store personal data on the Filecoin network, even if it's encrypted. Access control is on the roadmap, but until then only store public and static data on the Filecoin network. 
:::

1. Download the ISS_COORDS_2021-03-25 dataset, extract it, and move the files into a new folder called `filecoin-package`:

    ```shell
    cd ~
    curl -o ISS_COORDS_DATASET.tar.gz https://ipfs.io/ipfs/QmYtymZ8C3yYWU6V7kbcS2mQx92be1Lwt1Ufa7JBo3Zd2Y
    tar -xvzf ISS_COORDS_DATASET.tar.gz
    mkdir ~/filecoin-payload-folder
    mv ISS_COORDS_DATASET/* ~/filecoin-payload-folder 
    ```

1. Move out of the `filecoin-payload-folder` and pack everything into a `.tar` file:

    ```shell
    cd ~
    tar -cvf ~/filecoin-payload.tar ~/filecoin-payload-folder
    ```

We now have our payload file ready to be stored using the Filecoin network.

## Add data to Lotus

We need to tell our Lotus lite-node which file we want to store using Filecoin.

1. Import the payload into the `lotus daemon` using the `import` command: 

    ```shell
    lotus client import ~/filecoin-payload.tar 
    ```

    Lotus creates a distributed-asyclic-graph (DAG) based off the payload. This process takes a few minutes. Once's it's complete Lotus will output the root CID of the payload.

    ```shell
    > Import 3, Root bafykb...
    ```

1. Make a note of the CID. We'll be using it in an upcoming section.

Now that Lotus knows which file we want to use, we can create a deal with a Filecoin miner to store our data!

## Find a miner through the MinerX program

<!-- TODO: explain what the MinerX program is, why it exists, and why we need to use it instaed of using vanilla-Filecoin. -->

1. Go to [plus.fil.org/miners](https://plus.fil.org/miners/).
1. Using the table, find a miner that suits your needs. For the sake of this tutorial, look for a miner that is:
2. 
    a. Close to you.
    a. Offering verified-data deals for 0 FIL.
    
1. Once you have found a suitable miner, copy their `miner_id` from the **Miner ID** column:

    ![](./images/miner-x-listings.png)

    Some miners list multiple miner IDs. For these miners, just copy one of the IDs:

    ![](./images/miner-with-multiple-miner-ids.png)

1. Write down ID of the miner you want to use. We'll be referring to it in the next section.

## Create a deal 

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
    > Deal duration (days): 365 
    ``` 

1. Tell Lotus whether or not this is a Filecoin+ deal. Since we signed up to Filecoin+ and added some DataCap to our wallet in an earlier step, we'll select `yes` here:

    ```shell
    > Make this a verified deal? (yes/no): yes
    ```

1. Enter the miner ID from the previous section: 

    ```shell
    > Miner Addresses (f0.. f0..), none to find: f3141592654 
    ```

    <!-- TODO: find out what happens after you throw in a MINER_ID. -->

1. Enter `0` when asked how much FIL we are willing to spend for this storage deal:

    ```shell
    > Maximum budget (FIL): 0.5
    ```

    <!-- TODO: find out what happens after you throw in a MINER_ID. -->

    Normally, we would enter a value of around `0.5 FIL` here. However, since we picked a miner that is accepting 0 FIL deals for verified storage deals, and we are a verified client, then we don't actually need to spend any FIL here!

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
    Deal (f023978) CID: bafyreict2zhkbwy2arri3jgthk2jyznck47umvpqis3hc5oclvskwpteau
    ```

## Wait for the deal to complete

We need to wait for the miner to accept our deal and _seal_ the data. This process can take up to 24 hours to complete, depending on how much data we asked the miner to store.

1. List successful and pending deals by using the `list-deals` command:

    ```shell
    lotus client list-deals
    
    >
    ```
    <!-- TODO: show what happens when you list the deals. -->

    If you cannot see your deal in the list, the deal may have failed. Use `--list-failed` to see failed deals:

    ```shell
    lotus client list-deals --list-failed

    > 
    ```

    <!-- TODO: show what happens when you list failed the deals. -->

<!-- TODO: add a conclusiong to the storage deal steps. -->
