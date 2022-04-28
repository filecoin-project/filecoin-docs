---
title: Building with Lotus APIs
description: Lotus offers a built-in JSON-RPC API for developers who need direct, protocol-level control for building tools and applications. Several client libraries are available.
menu:
    build:
        parent: "build-get-started"
weight: 40
---

In the Filecoin ecosystem, there are various node solutions to connect to the Filecoin network and provide functions via RPC API calls. Developers can either install and run their own Lotus node locally to interact with the Filecoin network, or connect to other Lotus nodes hosted by Glif or Infura.

Developers can also use the API client libraries to utilize the features of Filecoin Network since those libraries take care of the low-level logic of connecting to Lotus node, requesting and handing the response via simple calls, etc. Currently, there are many libraries available:

- [filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/)
- [filecoin-js-signer](https://github.com/blitslabs/filecoin-js-signer)
- [Filecoin Signing Tools](https://github.com/Zondax/filecoin-signing-tools)

In this tutorial, we will run a local Lotus node and use the filecoin.js library to walk through the following examples: 

- Setting up a local Lotus node and connecting to [Calibration Testnet](https://docs.filecoin.io/networks/#calibration)
- Using filecoin.js to write code to interact with Filecoin Network to
   - query basic blockchain info
   - manage Lotus wallet
   - manage light wallet
   - make a storage deal

## Prerequisites

Before getting started, you should be familiar with:

- [How Filecoin works](https://docs.filecoin.io/about-filecoin/how-filecoin-works/)
- [How to install a Lotus node for the Calibration network](https://lotu.sh/lotus/install/prerequisites/#supported-platforms)
- [How to use Lotus command line](https://lotu.sh/lotus/manage/lotus-cli/)

Also, make sure you have all the dependencies installed:

- A fully-synced Lotus node on the calibration testnet
- Node.js
- NPM

## Setup

Before you start writing code to interact with hosted local Lotus node, you should make sure everything is set up properly. Especially ensure you have a local Lotus node fully synced for Calibration TestNet. 

### Set up lotus node

If you have not installed a Lotus node locally and fully synced for Calibration TestNet, you should go back and do it following the guild to [Install and launch a Lotus node](https://lotus.filecoin.io/docs/set-up/install/).

1. Download Lotus source code for the latest release

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   git checkout <vX.X.X> # tag for a release, currently v1.15.0
   ```

2. Build and install Lotus for Calibnet

   ```shell
   make clean calibnet # Calibration with min 32GiB sectors
   sudo make install
   ```

3. Fast sync using latest snapshot (still need several hours to fully sync the chain)

   ```shell
   lotus daemon --import-snapshot <path-to-calibration-snapshot>
   ```

4. [Create a wallet](https://lotu.sh/lotus/manage/manage-fil/#creating-a-wallet) and request some TestNet FIL from [Faucet](https://faucet.calibration.fildev.network/)

4. [Enable remote API access to your Lotus node](https://lotu.sh/developers/api-access/)

If everything set up correctly, you should be able to verify to:

- make sure that everything is working correctly, check the status of your local node:

  ```shell with-output
  #Check if the node sync to the highest tipset
  lotus sync wait
  ```

  ```shell
  Worker: 10161; Base: 778820; Target: 778820 (diff: 0)
  State: complete; Current Epoch: 778820; Todo: 0
  
  Done!
  ```

- Check your wallet balance

  ```shell with-output
  #Check wallet balance
  lotus wallet list 
  ```

  ```shell
  Address                                    Balance        Nonce  
  t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma  100 FIL          0
  ```

### Create a node.js project

Let's also set up a Node.js project with necessary dependencies, we will write basic javascript functions to focus more on learning the code to interact with Filecoin Network. 

1. Create a new node.js project

   ```shell
   mkdir build-with-lotus && cd build-with-lotus
   npm init #Initialize an project
   ```
   
2. Install the fielcoin.js library

   ```shell
   npm install filecoin.js
   ```


### Test a simple function call

Now you're ready to write code to connect to your Lotus node and interact with the Lotus APIs. Let's write a simple script to query the Lotus version to verify if everything works as expected.

1. Create a `chainDataQuery.mjs` file in your project and add the following code. We use the `mjs` file format because it supports import statements.

    ```javascript
    //1. Import necessary packages
    import { HttpJsonRpcConnector, LotusClient } from "filecoin.js";

    //2. Use the local node URL to create a connection to your Lotus node
    const localNodeUrl = "http://127.0.0.1:1234/rpc/v0";
    const localConnector = new HttpJsonRpcConnector({ url: localNodeUrl });

    //3. lotusClient exposes all Lotus APIs
    const lotusClient = new LotusClient(localConnector);
    const version = await lotusClient.common.version();
    console.log(version);
    ```

2. Run the following command in your project directory:

    ```shell with-output
    ~/build-with-lotus $ node basicQuery.mjs
    ```

    ```shell
    {
      Version: '1.15.0+calibnet+git.0ac1bbc7a',
      APIVersion: 66816,
      BlockDelay: 30
    }
    ```

If everything is set up correctly, your code will be able to connect to the Lotus node and return the chain data as shown above. Now, you're ready to explore more API features.

## Query chain data

Blockchain data is a fundamental part of any blockchain network. Using Lotus APIs, you can query chain data, including tipsets, blocks, messages, network status, storage deals, storage provider details, and more.

Let's look at some common chain data-related packages in the filecoin.js library's LotusClient. 

- `LotusClient.common` - methods to get node info
- `LotusClient.chain` - methods to interact with the blockchain
- `LotusClient.wallet` - methods to manage wallet on the Lotus node
- `LotusClient.client` - methods to interact with the storage and retrieval markets as a client
- `LotusClient.paych` - methods to interact with and manage payment channels
- `LotusClient.state` - methods to query, inspect, and interact with chain state
- more ...

In the previous step, we already created a `chainDataQuery.mjs` file to demonstrate the basic steps to connect to the Lotus node and initialize a LotusClient to query chain data. Now let's write more code in there to learn other query functions that do not require auth-token to interact with the Lotus node.

1. Get current chain head

   This function will return the current head of the chain, including current block height, a list of blocks, and a list of CIDs.
     ```javascript with-output
      //Query the current block head
      const chainHead = await lotusClient.chain.getHead();
      console.log(chainHead);
     ```

      ```shell
      {
        Cids: [
          {'/': 'bafy2bzacecdkonmhngylnnhrk4azkg2wkgcm6cnm5qn5sk4ww5cszjlvkgkd6'},
          {'/': 'bafy2bzaceaglcpzhd5gfrzdyt7ce3e5asnbfz3s3stbqyxniziny5snewbpbg'}
          ],
        Blocks: [
          {...},
          {...}
          ],
        Height: 781268
      }
      ```

2. Get messages in a block

    ```javascript with-output
    //Query all the messages in a block
    const tipSet = await lotusClient.chain.getTipSetByHeight(781267);
    const messages = await lotusClient.chain.getBlockMessages(tipSet.Cids[0]);
    console.log(messages);
    ```

    ```shell
    {
      BlsMessages: [
        {
          Version: 0,
          To: 't3ukhj6tpkgxjknu54opiaej2vrjz7nh7gzodkqlhpfphc6gxkogzmojv2cnlpgcuwkvnyhloctnc6lmlvceuq',
          From: 't3ws4jhb7g4n5s7t3mwsc2enzfija2kzo3p7vkqdqbiaqrabqhmfxzzy3knrvn3ykp75okab6pse2nxud3ineq',
          ...
        }
      ],
      SecpkMessages: [ { Message: [Object], Signature: [Object], CID: [Object] } ],
      Cids: [
        {'/': 'bafy2bzaceapv6ms4m3x4gdaefmpilgsqfhfsrvrciw4iux4n7va47es4vudpa'},
        {'/': 'bafy2bzaceaxaz5ews6a2jnwmeafhi2p5xpwjz7kogilakblp3q3wpxa3ax2xy'}
      ]
    }
    ```

3. Get wallet balance

    With a given TestNet wallet address, you can query its balance by calling lotusClient.wallet.balance() function.

    ```javascript
    //Query Wallet balance
    const walletBalance = await lotusClient.wallet.balance("t1ne72cbn6r55wea7ifjv4ypyti7t2df5dumsjhzq");
    ```

Apart from the basic data queries shown above, there are more features that Lotus APIs provide. But different API calls require different levels of permission API token to access the API endpoints and obtain data from the Filecoin network. Please check the [JSON-RPC API](https://lotu.sh/developers/apis/json-rpc/) for all Lotus API definitions, and generate your auth token to access those APIs accordingly. To learn how to generate auth-token, check the instruction for [obtaining tokens](https://lotus.filecoin.io/developers/api-access/#obtaining-tokens).

## Managing wallet and FIL

The Filecoin wallet represents the account/address that you will use in the Filecoin network to manage FIL tokens, to sign any transactions to store and retrieve data, to pay for gas fees for every transaction, etc. In this section, we will demonstrate different ways to manage your Filecoin wallet as well as FIL token using the following wallet types:

1. Lotus wallet: hosted in Lotus node
2. Light wallet: detached to any node and represented by key pairs.

### Lotus Wallet

Lotus wallet is created and hosted in the Lotus node. When the Lotus node is running, the wallet is opened in the node and you can manage your wallet addresses as well as FIL token via the command line or RPC API calls with the right level of auth-token.

1. First, let's make sure your local Lotus node is running and the wallet address is filled with some TestNet FIL token from the first step.

    ```shell with-output
    #Check wallet balance
    lotus wallet list 
    ```

    ```shell
    Address                                    Balance        Nonce  
    t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma  100 FIL          0
    ```

    You need to generate an authorization token with sign permission via command line which you will use later in the code to create wallet and sign token transfer transaction.

    ```shell with-output
    lotus auth create-token --perm sign
    ```

    ```shell
    #this will be your auth token, record it and use later
    eyJhbGciOiJIUzI1NiIsInRaaaaaa.xxxxxxx.bbbbbbbbbbbvq1W0ZjqrXHygd6fBRk
    ```

2. Create `lotusWallet.mjs` file

    Let's create a `lotusWallet.mjs` file in the node.js project for all the Lotus wallet-related code. First, import modules from filecoin.js and also initialize some necessary components, like HttpJsonRpcConnector, LotusClient as well as LotusWalletProvider.

    In `lotusWallet.mjs`, add the following code to get started.

    ```javascript
    import { HttpJsonRpcConnector, LotusWalletProvider, LotusClient} from "filecoin.js";
    import BigNumber from "bignumber.js";
    
    //Use your localNodeUrl and authToken to interact with Lotus wallet
    const localNodeUrl = "http://127.0.0.1:1234/rpc/v0";
    const signAuthToken ="<YOUR-SIGN-AUTH-TOKEN>"
    const httpConnector = new HttpJsonRpcConnector({ url: localNodeUrl, token: signAuthToken });
    const lotusClient = new LotusClient(httpConnector);
    const lotusWallet = new LotusWalletProvider(lotusClient);
    ```

3. Create a new wallet address

    You can directly connect to your local lotus node and create a new wallet address. The new address will be created in your Lotus node and with 0 token balance.

    Let's use the following code to create a new wallet to the `lotusWallet.mjs`.

    ```javascript
    async function newWallet(){
        try {
            const account = await lotusWallet.newAddress();
            const hasWallet = await lotusWallet.hasAddress(account);
            if(hasWallet){console.log("new wallet address: ", account)}
        } catch (error) {
            console.log(error);
        }
    }
    //Test newWallet function.
    newWallet();
    ```

    You can run the nodeJs command under your project to test this code.

    ```shell with-output
    ~/build-with-lotus $ node lotusWallet.mjs 
    ```

    ```shell
    new wallet address:  t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa
    ```

    You can also verify if the new wallet address is created in your local Lotus node using Lotus CLI command.

    ```shell with-output
    lotus wallet list
    ```

    ```shell
    Address                                    Balance       Nonce   Default  
    t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma  100 FIL         0        X        
    t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa  0 FIL           0              #This is the new created address
    ```

4. Transfer FIL to the new address

    Now, let's try to transfer the FIL token to this new address. What you need to do is to create a transaction to transfer FIL token from fromAddress to toAddress, sign this transaction using the Lotus wallet, and send the signed transaction to the Lotus node. Fortunately, these processes are taken care of by filecoin.js so that you can do all these by calling the lotusWallet.sendMessage(params) methods with required params.

    In `lotusWallet.mjs`, you can add these codes to do the job.

    ```javascript
    async function transferFIL(){
        try {
            const fromAddress = await lotusWallet.getDefaultAddress();
            const toAddress = "t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa";
    
            //SendMessage will create a message, assign a nounce, 
            //sign the message using the fromAddress and push it to mpool
            const msgResult = await lotusWallet.sendMessage({
                From: fromAddress,
                To: toAddress,
                Value: new BigNumber(10000000000000000000)//in autoFIL
              });
    
            console.log("message: ", msgResult);
        } catch (error) {
            console.log(error);
        }
    }
    //Test FIL transfer function
    transferFIL();
    ```

    ```shell with-output
    #Run the code to test the FIL transfer
    ~/build-with-lotus $ node lotusWallet.mjs
    ```

    ```shell
    #Message CID could be used to check the message from any blockchain explorer
    message CID:  {
      '/': 'bafy2bzacecrrnelqjqhsspfayzcxmx4nhaw6t7j5dpexuxix5jkgloyze2jpu'
    }
    ```

5. Check wallet balance

   Now, you should have created a new address in your Lotus node and also transferred some FIL tokens to it. Let's write code to query the balance of all your wallet addresses in the Lotus node. 

   ```javascript
   async function walletBalance(){
       try {
           //Get the list of wallet address on your Lotus node & query their balance
           const walletAdds = await lotusWallet.getAddresses();
           walletAdds.forEach(async(address) => {
               try {
                   const balance = await lotusWallet.getBalance(address);
                   console.log(address + " : "+balance);
               } catch (error) {
                   console.log(error);
               }
           });
       } catch (error) {
           console.log(error);
       }
   }
   //Test walleBalance function
   walletBalance();
   ```

   ```shell with-output
   #Run the code to test the FIL transfer
   ~/build-with-lotus $ node lotusWallet.mjs
   ```

   ```shell
   #FIL balance in attoFIL
   t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma : 89999999675971952500
   t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa : 10000000000000000000
   ```

   You can also check the balance directly in your Lotus node via command line.

   ```shell with-output
   lotus wallet list
   ```

   ```shell
   Address                                    Balance                     Nonce  Default  
   t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma  89.9999996759719525 FIL     2      X        
   t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa  10 FIL

### Light Wallet

`filecoin.js` also supports creating a light wallet from a mnemonic and a password. As long as you have the mnemonic and password of your wallet, you can recover it anywhere and use it by sending PRC requests to any lotus full nodes. Rather than relaying on a full built-in Lotus node for Lotus wallet.

1. Create `lightWallet.mjs` file

   In your node.js project, let's create a `lightWallet.mjs` file. Since we are using a light wallet, we will use Glif node as the connection to the Filecoin network to send transactions. First, we import all the modules and create a connection and lightWallet client using the Glif node URL.

   ```javascript
   import { HttpJsonRpcConnector, LotusClient, LightWalletProvider,MnemonicWalletProvider} from "filecoin.js";
   import BigNumber from "bignumber.js";
   
   const glifNodeurl = "https://calibration.node.glif.io";
   const glifNodeConn = new HttpJsonRpcConnector({url:glifNodeurl});
   const glifClient = new LotusClient(glifNodeConn);
   ```

2. Create a new light wallet

   When creating a light wallet using the BIP39 standard, it is very important to back up the mnemonic code, encryptedWallet, and your password. Do not share them — anyone who has this information will have control of your light wallet and assets.

   ```javascript with-output
   async function createLightWallet(){
       try {
         
           const lightWallet = new LightWalletProvider(glifClient, () => { return '<YOUR-Password>' }, 'test');
           let mnemonic = await lightWallet.createLightWallet('<YOUR-Password>');
         	console.log(mnemonic);
         
           let encryptedWallet = lightWallet.keystore.serialize();
         	console.log(encryptedWallet);
   
           const lightWalletAddress = await lightWallet.getDefaultAddress();
           console.log(lightWalletAddress);
       } catch (error) {
           console.log(error);
       }
   }
   //Test the function
   createLightWallet()
   ```

   ```shell
   #Make sure to backup your mnemonic, encryptedWallet, and password and keep them safe.
   mnemonic: mouse escape tilt destroy xxx top yyy spice art zzz price image
   encryptedWallet: {......}
   Wallet Address: t1qfyuosiqgoycy5ojwsxtpnlp44orxg4gtmuhhaq
   ```

   Once you create a light wallet, request some TestNet FIL tokens from [Calibration Faucet](https://faucet.calibration.fildev.network/) for the next step.

3. Create a FIL transfer transaction

   Now you create a light wallet and fill it with some TestNet FIL token. We can create a FIL transfer message, sign it with a light wallet, and sent it to the Glif node.

   ```javascript
   async function sendFromLightWallet(){
       try {
          //This is just for demo. NOT recommend to expose your mnemonic and password in code.
           const mnemonic = '<YOUR mnemonic code>';
         	const pw = '<YOUR-Password>';
           const lightWallet = new LightWalletProvider(glifClient, () => { return pw }, 'test');
           await lightWallet.recoverLightWallet(mnemonic, pw);
           const lightWalletAddress = await lightWalletHttp.getDefaultAddress();
           
         	//Create a FIL transfer message
           const message = await lightWallet.createMessage({
               From: lightWalletAddress,
               To: "t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa",
               Value: new BigNumber(15000000000000000000)//in autoFIL
           });
   
         	//Sign and send the message vai Glif Node API
           const signedMessage = await lightWallet.signMessage(message);
           const msgCid = await lightWallet.sendSignedMessage(signedMessage);
           console.log(msgCid);
       } catch (error) {
           console.log(error);
       }
   }
   //Test the function
   sendFromLightWallet();
   ```

   ```shell with-output
   #Run the js code to test transfer
   ~/build-with-lotus $ node lightWallet.mjs
   ```

   ```shell
   {
     '/': 'bafy2bzaceamdsqcc3jccrhvwrz6kmpujfkg6crwynmrtal2nsmwkqv22bktrs'
   }
   ```

   After the message persists on-chain, you will be able to verify the transfer message on [Filecoin Calibration Explore](https://calibration.filscan.io/tipset/message-detail?cid=bafy2bzaceamdsqcc3jccrhvwrz6kmpujfkg6crwynmrtal2nsmwkqv22bktrs).

By far, you have learned how to write code to create a wallet on the Lotus node via RPC API call as well as create a light wallet and manage its assets via hosted Glif node. If you are interested to explore more features of Lotus, keep following this tutorial or you can start creating your projects on Filecoin.

## Making a storage deal

As the decentralized storage network, storing data is definitely one of the most important features of Filecoin. In this part, we will walk you through the whole end-to-end process of storing your data decentralized on the Filecoin network. It covers importing your data to the local Lotus node, making a storage deal with the storage provider, and then waiting for the deal to complete. Let's dive into it.

The operation of important data into the Lotus node requires an admin authentication token, let's generate it first for later.

```shell with-output
lotus auth create-token --perm admin
```

```shell
#Record and back up your auth token for later
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......n7ugba1aJECuZXkMgJxHUH08MKTENQ-hAtsosDu-HXg
```

First, we will create a `storeFile.mjs` and add the following code structure in there.

```javascript
import { HttpJsonRpcConnector, LotusClient} from "filecoin.js";

const localNode = "http://127.0.0.1:1234/rpc/v0";
const adminAuthToken="<Your-admin-auth-token>"
const localConnector = new HttpJsonRpcConnector({ url: localNode, token: adminAuthToken });
const lotusClient = new LotusClient(localConnector);
const lotusWallet = new LotusWalletProvider(lotusClient);

async function storeFile(){
  try {
    //1. import data to lotus
    
    //2. query storage provider's offer for storing this file
    
    //3. start storage deal with SP
    
  } catch (error) {
    console.log(error);
  }
  
}
storeFile();
```

1. Import data

   The first step is to import your data to the Lotus node and let the Lotus node knows which file will be stored using its CID which is the unique fingerprint of your data. 

   ```javascript
   //1. import files to Lotus node.
   const importResult = await lotusClient.client.import({
   	Path: "<The-path-to-your-file>",
   	IsCAR: false,
   });
   console.log(importResult.Root);//Your data CID which will represent your data on Filecon
   ```

2. Storage provider query

   Once your data is imported, lotus will know which file you want to store by its CID. Then in order to store this data on the Filecoin network, we need to find a storage provider which is willing to accept your storage deal.

   Since we are using the calibration network for this tutorial, find storage providers using the following lotus command. It will return a list of asks from the storage providers on the calibration network which are actively accepting deals.

   ```shell with-output
   lotus client list-asks
   ```

   ```shell
   .. querying asks
   * Queried 43 asks, got 8 responses
   t029598: min:256 B max:32 GiB price:0 FIL/GiB/Epoch verifiedPrice:0 FIL/GiB/Epoch ping:340.644025ms
   t031337: min:256 B max:32 GiB price:0 FIL/GiB/Epoch verifiedPrice:0 FIL/GiB/Epoch ping:342.296042ms
   t01105: min:256 B max:32 GiB price:0.0000000002 FIL/GiB/Epoch verifiedPrice:0.00000000002 FIL/GiB/Epoch ping:589.173496ms
   t032368: min:256 B max:32 GiB price:0.0000000005 FIL/GiB/Epoch verifiedPrice:0.00000000005 FIL/GiB/Epoch ping:294.554013ms
   ```

   But if you are working on Filecoin MainNet, you can use [find a storage provider via Filecoin Plus](https://lotu.sh/tutorials/store-and-retrieve/store-data/#find-a-storage-provider-via-filecoin-plus) program to find the storage providers to offer free storage for verified clients.

   ```javascript
   //2. query Miner offers for storing this file
   const queryOffer = await lotusClient.client.minerQueryOffer('t01105', importResult.Root);
   console.log(queryOffer);
   const isActive = importResult.Root["/"] === queryOffer.Root["/"];
   console.log("Miner is active ?", isActive);
   ```

3. Create a storage deal with a storage provider

    If this SP is active, you can start making storage deals with it.

   ```javascript
   //3. start storage deal with SP
   if(isActive){
     const dealCid = await lotusClient.client.startDeal({
       Data: {
         TransferType: 'graphsync',
         Root: importResult.Root,
       },
       Miner: 't01105',
       Wallet: await lotusWallet.getDefaultAddress(),
       EpochPrice: ,
       MinBlocksDuration: 518400,
     });
     console.log("dealCID is ", dealCid);
   }
   ```

   Let's run the js code to store a file on Filecoin.

   ```shell with-output
   ~/build-with-lotus $ node lightWallet.mjs
   ```

   ```
   {
     '/': 'bafy2bzaceamdsqcc3jccrhvwrz6kmpujfkg6crwynmrtal2nsmwkqv22bktrs'
   }
   ```

   By this step, you have made a storage deal with a storage provider successfully. Lotus node will start processing the data with the storage provider. The storage deal will need to go through many different processes to be finalized on-chain. You can also check the status of your storage deal via the Lotus command line using its CID. See the[ Processing states](https://lotu.sh/tutorials/store-and-retrieve/store-data/#processing-states) table below to find out which states happen and when.

   ```shell with-output
   lotus client list-deals --show-failed
   ```

   ```shell
   DealCid      DealId  Provider  State                     On Chain?  Slashed?  PieceCID     Size       Price             Duration  Verified  
   ...dbuwcbjq  0       t024557   StorageDealFundsReserved  N          N         ...7rkejcnq  3.969 MiB  0 FIL             522909    false     
   ...pkbhfkju  0       t01105    StorageDealError          N          N         ...7rkejcnq  3.969 MiB  0.0000177158 FIL  88579     false  
   ...wb4wiuwq  0       t01105    StorageDealClientFunding  N          N         ...7rkejcnq  3.969 MiB  0.0001041094 FIL  520547    false 
   ```

Congratulations. Now, you should have learned and tried the fundamental steps to interact with the Filecoin network using the API client library and hosted Lotus node. It could serve as the foundation for you to try and explore a lot more features that the Filecoin network has to offer.
