---
title: "Client contract tutorial"
description: "A tutorial on how to use the client contract to make storage deals using smart contracts."
lead: "The Client Contract allows developers to create storage deals programmatically via smart contracts."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: "client-contract-tutorial"
weight: 490
toc: true
aliases:
    - "/developers/infrastructure/libraries/"
---

In this tutorial, we will cover the background of creating storage deals via smart contracts and how to create storage deals with smart contracts on the FEVM (Ethereum Virtual Machine on top of the Filecoin blockchain). Before continuing, you will need the following software preinstalled on your computer:

- Git
- NodeJS
- Yarn or NPM (Yarn is used in this tutorial)
- A code editor such as VS Code
- [A wallet with Calibration testnet FIL]({{< relref "/networks/calibration/details" >}})

You can find a video form of this walkthrough on [ETHGlobal’s YouTube Channel](https://www.youtube.com/watch?v=27EV3gQGY9k). 

## Dealmaking workflows

Before we get started, we recommend reading about programmatic storage with Filecoin here. There are two methods to programmtic storage, which are direct dealmaking and aggregated dealmaking. We will cover direct dealmaking with the client contract tutorial.

## Steps

Let’s now run through how to create storage deals via smart contracts.

### Setup

First, let's grab the kit and set up the development environment.

1. Clone the Filecoin virtual machine deal-making kit, including all submodules:

    ```shell
    git clone --recurse-submodules https://github.com/filecoin-project/fvm-starter-kit-deal-making.git
    ```

    This will copy the fvm deal-making kit into your current directory and initiate the `go-generate-car` submodule. 

1. Moving into the `fvm-starter-kit-deal-making` directory and grab all the dependencies using `yarn`:

    ```shell
    cd fvm-starter-kit-deal-making
    yarn
    ```

1. Now that all the packages are downloaded, we will need to create a `.env` file with your private key. This is so the hardhat kit knows what wallet to use for transactions. Open up the repo in your code editor of choice and find the file titled `.env.example`. Rename the file to `.env`. 

    ```
    mv .env.example .env
    ```

1. Replace the example private key with your actual private key. If you are using Metamask, follow [this tutorial to get your private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key#:~:text=On%20the%20account%20page%2C%20click,click%20%E2%80%9CConfirm%E2%80%9D%20to%20proceed.). 

    Remember to take precautions to never share your private key with anyone or check it into Git! The `.gitignore` of the hardhat kit is already set to ignore `.env` files.

1. Deploy the contracts with `hardhat`:

    ```shell
    yarn hardhat deploy
    ```

    This should compile and deploy all the contracts, including the client contract, which is the one we will be interacting with. Copy and take note of the address of the deployed contract for later. 

### Preparing a file for storage

Before storing a file with a storage provider, it needs to be prepared by turning it into a `.car` file, and the metadata must be recorded. To do this the Hardhat kit has a tool [which can do this for you](https://github.com/filecoin-project/fevm-hardhat-kit/tree/main/tools). However, to keep things nice and simple, we're going to use the [FVM Data Depot website](https://data.lighthouse.storage/). This website will automatically convert files to the `.car` format, output all the necessary metadata, and act as an HTTP retrieval point for the storage providers.

1. Go to the [FVM Data Depot website](https://data.lighthouse.storage/) and create an account.
1. Click **Upload File** and select a file you wish to upload.
1. Select the **File ID** of the file to read all the relevant metadata. Make a note of the:

    - Piece CID
    - Payload CID
    - Car size
    - Piece size
    - URL

    We'll use this information in the next step when invoking the `MakeDealProposal` method. 

### Invoke the MakeDealProposal method

Now that we have the `.car` file prepared in the data depot, we can invoke the MakeDealProposal method on the smart contract we deployed earlier. To do this, we will run the `make-deal-proposal` task in Hardhat. There are quite a few parameters to include in this call:

- `contract`: the address of your deployed `ClientContract.sol`
- `piece-cid: gathered from the previous step.
- `piece-size`: gathered from the previous step.
- `car-size`: gathered from the previous step.
- `start-epoch`: The block number you want the deal to begin on. It should be a block in the future. You can find the current block number on [FilFox Calibration](https://calibration.filfox.info/en). 
- `end-epoch`: The block number you want the deal to end on. It should be a block in the future and after the `Start-Epoch`. You can find the current block number on [FilFox Calibration](https://calibration.filfox.info/en). 
- `location-ref`: The location of where the storage provider can find the .car file. This is the `URL` from the previous step.

When calling the `make-deal-proposal` task in Hardhat, your command will look something like this:

```shell
yarn hardhat make-deal-proposal \ 
    --contract 0x0219eB1740C315fe5e20612D7E13AE2A883dB3f4 \
    --piece-cid baga6ea4seaqn4eomxfk3ttog7lnvlvedu7nia377w4gotw2pm746k6kq7gwe6ga \
    --piece-size 2097152 \
    --verified-deal false \
    --car-size 1439368 \
    --label baga6ea4seaqn4eomxfk3ttog7lnvlvedu7nia377w4gotw2pm746k6kq7gwe6ga \
    --start-epoch 180000 \
    --end-epoch 700000 \
    --storage-price-per-epoch 0 \
    --provider-collateral 0 \
    --client-collateral 0 \
    --extra-params-version 1 \
    --location-ref "https://bafybeidguwwno5ohjss7g4l6ygvyy3dzxxrkkgtxqkobnnxnu62aw4ipxa.ipfs.w3s.link/ipfs/bafybeidguwwno5ohjss7g4l6ygvyy3dzxxrkkgtxqkobnnxnu62aw4ipxa/baga6ea4seaqn4eomxfk3ttog7lnvlvedu7nia377w4gotw2pm746k6kq7gwe6ga.car \
    --skip-ipni-announce true \
    --remove-unsealed-copy true \
```

Parameters such as the `collateral` and `price-per-epoch` are set to `0`. On mainnet, these would be determined by storage providers, but since this is on the Calibration testnet, the storage providers should pick up the jobs even with these parameters set to `0`.

### Storage provider picks up the job

Now if you’ve invoked the task with all the correct parameters, the method will execute on-chain and emit an event that Boost storage providers will be listening to. If the deal is well-formed and the parameters are acceptable, they will download the .car file, double-check to ensure the `piece-cid` and `piece-size` match the deal and publish your storage deal! This could take up to a day. Once the deal is published, you can find it on a [Calibration testnet block explorer]({{< relref "/networks/calibration/explorers" >}}). The client in the deal should be the `t4` address of the smart contract we called `MakeStorageDeal` on.

### Monitoring deal proposal acceptance

After emitting an event and waiting for storage providers to accept your deal, you can monitor its status on a provided Boost logs dashboard. This feature is only available on the Calibration testnet. [See this guide on GitHub](https://github.com/filecoin-project/community/discussions/659) for help diagnosing why deals might not be accepted and adjusting your proposal for re-submission.

### Conclusion

During this tutorial, we have shown the significance of making deals using smart contracts and then walked through making a storage deal using the FVM deal-making kit and web3.storage. Developers can make use of this workflow to integrate decentralized storage on Filecoin with their smart contracts and decentralized applications. 
