---
title: Building with Lotus APIs
description: Lotus offers a built-in JSON-RPC API for developers who need direct, protocol-level control for building tools and applications. Several client libraries are available.
menu:
    build:
        parent: "build-get-started"
weight: 40
---

Lotus offers a JSON-RPC API to connect directly to the Filecoin network for detailed control of messages and other network interactions. 

Several API client libraries are available. They take care of the low-level logic of connecting to Lotus node, requesting and handing the response, and more. 

- [filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/)
- [filecoin-js-signer](https://github.com/blitslabs/filecoin-js-signer)
- [Filecoin Signing Tools](https://github.com/Zondax/filecoin-signing-tools)

To use the complete API, you'll need to run your own node locally. For read-only access, you can also use a hosted endpoint such as those provided by [Glif](https://lotus.filecoin.io/developers/glif-nodes/) or [Infura](https://blog.infura.io/introducing-infura-support-for-filecoin-developers/). (Note: Application developers seeking simple ways to store data on Filecoin should use a storage helper instead.)

In this tutorial, we will run a local Lotus node and use the filecoin.js library. It is divided into the following parts:

1. [Setup](#setup)
2. [Query basic chain data](#query-basic-chain-data)
3. [Manage wallets and FIL tokens](#manage-wallets-and-FIL-tokens)
4. [Make a storage deal](#make-a-storage-deal)

## Prerequisites

Before getting started, you should be familiar with:

- [How Filecoin works](https://docs.filecoin.io/about-filecoin/how-filecoin-works/)
- [Using the Lotus command line](https://lotus.filecoin.io/lotus/manage/lotus-cli/)

Also, make sure you have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## 1. Setup

In this section, you'll set up your Lotus node, install the filecoin.js library, and confirm that they work together correctly.

### Set up Lotus node

Follow the steps to [Install a Lotus node](https://lotus.filecoin.io/docs/set-up/install/), then sync it to the [Calibration test network](https://docs.filecoin.io/networks/overview/#calibration).

To summarize, you need to:

1. Download the Lotus source code. The version number of the latest release can be found on the [lotus releases](https://github.com/filecoin-project/lotus/releases) page.

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   git checkout <vX.X.X> # tag for the latest release
   ```

2. Build and install Lotus for the Calibration network

   ```shell
   make clean calibnet # Calibration with min 32GiB sectors
   sudo make install
   ```

3. Download the latest chain snapshot using the CID listed under "Genesis CAR file" (https://docs.filecoin.io/networks/overview/#calibration). Then sync to the network (it will take several hours to fully sync the chain).

   ```shell
   lotus daemon --import-snapshot <path-to-calibration-snapshot>
   ```

4. [Create a wallet](https://lotus.filecoin.io/lotus/manage/manage-fil/#creating-a-wallet) and request some test FIL from the [Faucet](https://faucet.calibration.fildev.network/).

4. [Enable remote API access to your Lotus node](https://lotus.filecoin.io/developers/api-access/).


### Verify your setup

Let's check the status of your local node:

  ```shell with-output
  # Check if the node is synced to the highest tipset
  lotus sync wait
  ```

  ```shell
  Worker: 10161; Base: 778820; Target: 778820 (diff: 0)
  State: complete; Current Epoch: 778820; Todo: 0
  
  Done!
  ```

Now, let's check that the test FIL has landed in your wallet:

  ```shell with-output
  # Check wallet balance
  lotus wallet list 
  ```

  ```shell
  Address                                    Balance        Nonce  
  t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma  100 FIL          0
  ```

### Create a node.js project

Now, let's set up a Node.js project with the necessary dependencies.

1. Create a new Node.js project.

   ```shell
   mkdir build-with-lotus && cd build-with-lotus
   npm init #Initialize the project
   ```
   
2. Install the filecoin.js library.

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

## 2. Query basic chain data

Blockchain data is a fundamental part of any blockchain network. Using the Lotus API, you can query chain data, including tipsets, blocks, messages, network status, storage deals, storage provider details, and more.

Let's look at some common chain data-related packages in the filecoin.js library's LotusClient. 

- `LotusClient.common` - methods to get node info
- `LotusClient.chain` - methods to interact with the blockchain
- `LotusClient.wallet` - methods to manage wallets on the Lotus node
- `LotusClient.client` - methods to interact with the storage and retrieval markets as a client
- `LotusClient.paych` - methods to interact with and manage payment channels
- `LotusClient.state` - methods to query, inspect, and interact with chain state
- ...and more

In the previous step, we already created a `chainDataQuery.mjs` file to demonstrate the basic steps to connect to the Lotus node and initialize a LotusClient to query chain data. Now let's write more code in there to learn other query functions that do not require an auth token.

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

    With a given Calibration wallet address, you can query its balance by calling lotusClient.wallet.balance() function.

    ```javascript
    //Query Wallet balance
    const walletBalance = await lotusClient.wallet.balance("t1ne72cbn6r55wea7ifjv4ypyti7t2df5dumsjhzq");
    ```
Apart from the basic data queries shown above, there are many more features. Please see the [Lotus JSON-RPC API Reference](https://lotus.filecoin.io/developers/apis/json-rpc/) for all Lotus API definitions. Note that some API calls require an [authorization token](https://lotus.filecoin.io/developers/api-access/#obtaining-tokens).

## Manage wallets and FIL tokens

Filecoin wallets represent the account (or address) that you will use to manage FIL tokens, sign transactions to store and retrieve data, pay for gas fees for every transaction, and more. In this section, we will demonstrate different ways to manage your Filecoin wallet as well as FIL token. There are two Filecoin wallet types:

1. [Lotus wallets](#create-and-manage-lotus-wallets): hosted in Lotus node
2. [Light wallets](#create-and-manage-light-wallet): detached from any node and represented by key pairs

### Create and manage Lotus wallets

Lotus wallets are created and hosted in the Lotus node. When the Lotus node is running, the wallet is opened in the node and you can manage your wallet's addresses and balances via the command line or RPC API calls. You will need an auth token with sign permissions.

1. First, let's make sure your local Lotus node is running and the wallet address contains some mock FIL tokens.

    ```shell with-output
    # Check wallet balance
    lotus wallet list 
    ```

    ```shell
    Address                                    Balance        Nonce  
    t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma  100 FIL          0
    ```

    Generate an authorization token with sign permission.

    ```shell with-output
    lotus auth create-token --perm sign
    ```

    ```shell
    # This will be your auth token, record it and use later
    eyJhbGciOiJIUzI1NiIsInRaaaaaa.xxxxxxx.bbbbbbbbbbbvq1W0ZjqrXHygd6fBRk
    ```

2. Create `lotusWallet.mjs` file

    Let's create a `lotusWallet.mjs` file in the same project for all the wallet-related code in this tutorial. First, import modules from filecoin.js and initialize the necessary components (HttpJsonRpcConnector, LotusClient, and LotusWalletProvider).

    In `lotusWallet.mjs`, add the following code to get started.

    ```javascript
    import { HttpJsonRpcConnector, LotusWalletProvider, LotusClient} from "filecoin.js";
    import BigNumber from "bignumber.js";
    
    //Use your localNodeUrl and auth token to interact with Lotus wallet
    const localNodeUrl = "http://127.0.0.1:1234/rpc/v0";
    const signAuthToken ="<YOUR-SIGN-AUTH-TOKEN>"
    const httpConnector = new HttpJsonRpcConnector({ url: localNodeUrl, token: signAuthToken });
    const lotusClient = new LotusClient(httpConnector);
    const lotusWallet = new LotusWalletProvider(lotusClient);
    ```

3. Create a new wallet address

    Let's create a second wallet address so we can test transfers. The new address will be created in your Lotus node and start with 0 token balance.

    Add the following code to the `lotusWallet.mjs`.

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

    You can run the NodeJS command to test this code.

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

    Now, let's try to transfer the FIL token to this new address. Under the hood, this will create a transaction to transfer FIL token from fromAddress to toAddress, sign the transaction using the Lotus wallet, and send the signed transaction to the Lotus node. Fortunately, these processes are taken care of by filecoin.js so that you can do all these by calling the lotusWallet.sendMessage(params) methods.

    In `lotusWallet.mjs`, add the following code:

    ```javascript
    async function transferFIL(){
        try {
            const fromAddress = await lotusWallet.getDefaultAddress();
            const toAddress = "t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa";
    
            // SendMessage will create a message, assign a nounce, 
            // Sign the message using the fromAddress and push it to mpool
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
    // Test FIL transfer function
    transferFIL();
    ```

    ```shell with-output
    # Run the code to test the FIL transfer
    ~/build-with-lotus $ node lotusWallet.mjs
    ```

    ```shell
    #Message CID could be used to check the message from any blockchain explorer
    message CID:  {
      '/': 'bafy2bzacecrrnelqjqhsspfayzcxmx4nhaw6t7j5dpexuxix5jkgloyze2jpu'
    }
    ```

5. Check wallet balance

   Now, you should have created a new address in your Lotus node and also transferred some FIL tokens to it. Next, let's query the balance of all your wallet addresses in the Lotus node. 

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
   //Test walletBalance function
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

### Create and manage light wallets

The `filecoin.js` library also supports creating a light wallet from a mnemonic and a password. As long as you have the mnemonic and password of your wallet, you can recover it anywhere and use it by sending PRC requests to any Lotus full nodes.

1. Create `lightWallet.mjs` file

   In your `build-with-lotus` project, let's create a `lightWallet.mjs` file. Since we are using a light wallet, we will use the Glif hosted endpoint as the connection to the Filecoin network to send transactions. First, we import all the modules and create a connection and lightWallet client using the Glif endpoint's URL.

   ```javascript
   import { HttpJsonRpcConnector, LotusClient, LightWalletProvider,MnemonicWalletProvider} from "filecoin.js";
   import BigNumber from "bignumber.js";
   
   const glifNodeurl = "https://calibration.node.glif.io";
   const glifNodeConn = new HttpJsonRpcConnector({url:glifNodeurl});
   const glifClient = new LotusClient(glifNodeConn);
   ```

2. Create a new light wallet

   When creating a light wallet using the BIP39 standard, it is very important to back up the mnemonic code, encryptedWallet, and your password. Do not share them — anyone who has this information will have control of your light wallet and assets!

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
   // Test the function
   createLightWallet()
   ```

   ```shell
   # Make sure to backup your mnemonic, encryptedWallet, and password and keep them safe.
   mnemonic: mouse escape tilt destroy xxx top yyy spice art zzz price image
   encryptedWallet: {......}
   Wallet Address: t1qfyuosiqgoycy5ojwsxtpnlp44orxg4gtmuhhaq
   ```

   Before moving to the next step, use your light wallet address to request some mock FIL tokens from the [Calibration Faucet](https://faucet.calibration.fildev.network/).

3. Create a FIL transfer transaction

   Let's transfer some FIL from your light wallet to another wallet. 

   ```javascript
   async function sendFromLightWallet(){
       try {
          //This is just for demo. We do NOT recommend exposing your mnemonic and password in code.
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
   
         	//Sign and send the message
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
   #Run the code to test this transfer
   ~/build-with-lotus $ node lightWallet.mjs
   ```

   ```shell
   {
     '/': 'bafy2bzaceamdsqcc3jccrhvwrz6kmpujfkg6crwynmrtal2nsmwkqv22bktrs'
   }
   ```

   After the message containing this transfer makes it on-chain, you will be able to see it via the [Filecoin Calibration Explorer] (https://calibration.filscan.io/tipset/message-list) website.

By now, you have learned how to create a wallet on the Lotus node via RPC API call as well as create a light wallet and manage its assets via hosted Glif node. If you are interested in exploring more features of Lotus, keep following this tutorial. You can also go to the [Lotus JSON-RPC API](https://lotus.filecoin.io/developers/apis/json-rpc/) and start creating your own projects on Filecoin.

## Make a storage deal

Storing data is one of the most important features of Filecoin. In this section, we will walk through the whole end-to-end process of storing your data decentralized on the Filecoin network. It covers importing your data to the local Lotus node, making a storage deal with a storage provider, and then waiting for the deal to complete. Let's dive in.

1. Setup

Start by generating an admin authorization token. This is required to import data into the Lotus node.

```shell with-output
lotus auth create-token --perm admin
```

```shell
# Record and back up your auth token for later
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......n7ugba1aJECuZXkMgJxHUH08MKTENQ-hAtsosDu-HXg
```

Create a `storeFile.mjs` file in your `build-with-lotus` project and add the following code.

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

2. Import data

   The next step is to import your data to the Lotus node. This returns a CID which is the unique fingerprint of your data, and how you will refer to your data in future steps. 

   ```javascript
   //1. import files to Lotus node.
   const importResult = await lotusClient.client.import({
   	Path: "<The-path-to-your-file>",
   	IsCAR: false,
   });
   console.log(importResult.Root);//Your data CID which will represent your data on Filecon
   ```

3. Storage provider query

   Next, we need to find a storage provider that is willing to accept your storage deal.

   Since we are using the calibration network for this tutorial, find storage providers using the following command. It will return a list of `asks` from the storage providers which are actively accepting deals, containing the details of their storage asks.

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

   If you are working on Filecoin Mainnet, you can also use the [Filecoin Plus](https://lotus.filecoin.io/tutorials/store-and-retrieve/store-data/#find-a-storage-provider-via-filecoin-plus) program to find storage providers offering free storage for verified clients.

   ```javascript
   //2. query Miner offers for storing this file
   const queryOffer = await lotusClient.client.minerQueryOffer('t01105', importResult.Root);
   console.log(queryOffer);
   const isActive = importResult.Root["/"] === queryOffer.Root["/"];
   console.log("Miner is active ?", isActive);
   ```

4. Create a storage deal with a storage provider

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

   By this step, you have made a storage deal with a storage provider successfully. The Lotus node will start processing the data and sending it to the storage provider. Your storage deal will need to go through many sub-processes to be finalized on-chain. See the [Deal states](https://lotus.filecoin.io/tutorials/lotus/store-and-retrieve/store-data/#deal-states) table for more details.
   
You can check the status of your storage deal via the Lotus command line using its CID. 

   ```shell with-output
   lotus client list-deals --show-failed
   ```

   ```shell
   DealCid      DealId  Provider  State                     On Chain?  Slashed?  PieceCID     Size       Price             Duration  Verified  
   ...dbuwcbjq  0       t024557   StorageDealFundsReserved  N          N         ...7rkejcnq  3.969 MiB  0 FIL             522909    false     
   ...pkbhfkju  0       t01105    StorageDealError          N          N         ...7rkejcnq  3.969 MiB  0.0000177158 FIL  88579     false  
   ...wb4wiuwq  0       t01105    StorageDealClientFunding  N          N         ...7rkejcnq  3.969 MiB  0.0001041094 FIL  520547    false 
   ```

Congratulations on making it all the way through this tutorial! In this tutorial, we learned the basics of interacting with the Filecoin network using an API client library and local Lotus node. This can serve as the foundation for you explore the complete [Lotus JSON-RPC API](https://lotus.filecoin.io/developers/apis/json-rpc/).
