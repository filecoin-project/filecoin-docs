---
title: "Client Contract Tutorial"
description: "A tutorial on how to use the Client Contract to make storage deals via smart contracts."
lead: "The Client Contract allows developers to create storage deals programmatically via smart contracts."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: "client-contract-tutorial"
weight: 460
toc: true
aliases:
    - "/developers/infrastructure/libraries/"
---
## Creating Storage Deals Via Smart Contracts

In this tutorial, we will cover the background of creating storage deals via smart contracts and how to create storage deals with smart contracts on the FEVM (Ethereum Virtual Machine on top of the Filecoin blockchain). Before continuing you will need the following software preinstalled on your computer: \
 \




* Git
* NodeJS
* Yarn or NPM (Yarn is used in this tutorial)
* A code editor such as VS Code
* [A wallet with Calibration testnet FIL](https://docs.filecoin.io/developers/smart-contracts/quickstart/#create-a-wallet)

You can find a video form of this walkthrough on [ETHGlobal’s YouTube Channel](https://www.youtube.com/watch?v=27EV3gQGY9k). 


## Why Smart Contract Storage Deals


### Regular Storage Deal Creation Workflow

Filecoin is a blockchain tailor-made for processing **_storage deals. _**Before the FVM storage deals followed the following workflow in the diagram below: \


 \


<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")


This requires a lot of different actions to be taken by both the client and the storage provider. But with the advent of the Filecoin Virtual Machine, “[smart contracts](https://docs.filecoin.io/developers/smart-contracts/filecoin-virtual-machine/)” can be deployed on top of the Filecoin blockchain. This allows developers to access and now create Filecoin Storage Deals within smart contracts! And thus, now developers can also create new storage deals on the Filecoin blockchain. This reduces the number of actions clients and storage providers have to take to generate storage deals.


### Smart Contract Storage Deals Workflow

To create storage deals, smart contracts need a specific Solidity event called `DealProposalCreate`. Storage Providers running [Boost software](https://boost.filecoin.io/) can then listen for this event and, if the deal is acceptable to them, pick up the deal automatically. The workflow can be seen below.

 \
 \


<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")
  

 


## Tutorial

Let’s now run through how to create storage deals via smart contracts.


###  \
 \
Getting the FEVM Deal Making Kit

Open up a terminal, or command prompt, go to the directory of your choice, and type in the following command:

`git clone --recurse-submodules

 https://github.com/filecoin-project/fvm-starter-kit-deal-making.git`

This will copy the fvm deal making kit into your current directory and initiate the `go-generate-car` submodule. Now change into that directory by typing the following command in: \
 \
`cd fvm-starter-kit-deal-making` 

Now type in the following command to download all the dependencies needed for this repo: \
 \
`yarn`

Now that all the packages are downloaded we will need to add a .env with your private key. This is so the hardhat kit knows what wallet to use for transactions. Open up the repo in your code editor of choice and find the file titled `.env.example`. Rename the file to `.env`. Now replace the fake private key with your actual private key. If you are using Metamask, follow [this tutorial to get your private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key#:~:text=On%20the%20account%20page%2C%20click,click%20%E2%80%9CConfirm%E2%80%9D%20to%20proceed.). Remember to take precautions to never share your private key with anyone or check it into git! The .gitignore of the hardhat kit is already set to ignore .env files.

Finally, we’ll deploy our contracts. Type in the following command:

`yarn hardhat deploy`

This should compile and deploy all the contracts including the client contract which is the one we will be interacting with. Copy and take note of the address of the deployed contract for later. 


### Preparing a File for Storage

Before storing a file with a storage provider, it needs to be prepared by turning it into a .car file and the metadata must be recorded. To do this, the hardhat kit has a tool, written in the language Go, [which can do this for you](https://github.com/filecoin-project/fevm-hardhat-kit/tree/main/tools). However, we will use the [FVM Data Depot website](https://data.lighthouse.storage/). This website will automatically convert files to the .car format, output all the necessary metadata, and act as an HTTP retrieval point for the storage providers.

First, go to the [FVM Data Depot website](https://data.lighthouse.storage/), and create an account.

Once in create, click upload file in the top right corner and select a file you wish to upload. \


You can then click on the “File ID” of the file to read all the relevant metadata. \


The metadata we will need to save for later are: Piece CID, Payload CID, Car Size, Piece Size, and URL. We will pass these through in the next step when invoking the MakeDealProposal method. 

 \
Invoke the MakeDealProposal Method

Now that we have the .car file prepared in Data Depot, we will invoke the MakeDealProposal method on the smart contract we deployed earlier. To do this we will run the make-deal-proposal task in hardhat. Note that it takes a lot of parameters! You will need to change the following parameters for your contract and file: \




* Contract: this should point to the address of your deployed ClientContract.sol
* Piece-cid: this should be the piece-cid of your .car file we saved earlier
* Piece-size: The size of the full piece-size that we got earlier
* Car-size : The size of the .car file that we got earlier
* Start-Epoch: The block number you want the deal to begin on. It should be a block in the future. You can find the current block number on [FilFox Calibration](https://calibration.filfox.info/en). 
* End-Epoch: The block number you want the deal to end on. It should be a block in the future and sometime after the Start-Epoch. You can find the current block number on [FilFox Calibration](https://calibration.filfox.info/en). 
* Location-Ref: The location of where the storage provider can find the .car file. We copied this earlier from web3.storage’s ipfs gateway.

An example command is: \
 \
`yarn hardhat make-deal-proposal --contract 0x0219eB1740C315fe5e20612D7E13AE2A883dB3f4 --piece-cid baga6ea4seaqn4eomxfk3ttog7lnvlvedu7nia377w4gotw2pm746k6kq7gwe6ga --piece-size 2097152 --verified-deal false --car-size 1439368 --label baga6ea4seaqn4eomxfk3ttog7lnvlvedu7nia377w4gotw2pm746k6kq7gwe6ga --start-epoch 180000 --end-epoch 700000 --storage-price-per-epoch 0 --provider-collateral 0 --client-collateral 0 --extra-params-version 1 --location-ref[ ](https://bafybeidguwwno5ohjss7g4l6ygvyy3dzxxrkkgtxqkobnnxnu62aw4ipxa.ipfs.w3s.link/ipfs/bafybeidguwwno5ohjss7g4l6ygvyy3dzxxrkkgtxqkobnnxnu62aw4ipxa/baga6ea4seaqn4eomxfk3ttog7lnvlvedu7nia377w4gotw2pm746k6kq7gwe6ga.car)https://data-depot.lighthouse.storage/api/download/download_car?fileId=65e0bdfa-5fd3-4de7-ade1-045a8c7b353c.car--skip-ipni-announce true --remove-unsealed-copy true`

Note that parameters such as the collateral and price per epoch parameters are set to 0. On mainnet these would be determined by storage providers, but since this is Calibrationnet they should pick up the jobs even with these parameters set to 0.


### Storage Provider Picks up Job

Now if you’ve invoked the task with all the correct parameters, the method will execute on-chain and emit an event that boost storage providers will be listening to. If the deal was well-formed and the parameters are acceptable, they will download the .car file, double-check to ensure the piece-cid and piece-size match the deal and publish your storage deal! This could take up to a day. Once the deal is published you can find it on Cali Filfox. The client in the deal should be the t4 address of the smart contract we called “MakeStorageDeal” on.


### Conclusion

During this tutorial, we have shown the significance of making deals via smart contracts and then walked through making a storage deal using the fvm deal making kit and web3.storage. Developers can make use of this workflow to integrate decentralized storage on Filecoin with their smart contracts and decentralized applications. 



