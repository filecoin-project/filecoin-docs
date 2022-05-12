---
title: Building with Lotus APIs
description: Lotus offers a built-in JSON-RPC API for developers who need direct, protocol-level control for building tools and applications. Several client libraries are available.
menu:
    build:
        parent: "build-get-started"
weight: 40
---

Lotus offers a JSON-RPC API to connect directly to the Filecoin network for detailed control of messages and other network interactions. 

Several API client libraries are available. These libraries manage the low-level logic of connecting to Lotus node, making requests, and handing the responses.

- [filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/)
- [filecoin-js-signer](https://github.com/blitslabs/filecoin-js-signer)
- [Filecoin Signing Tools](https://github.com/Zondax/filecoin-signing-tools)

To use the complete API, we'll need to run our own node locally. For read-only access, you can also use a hosted node such as those provided by [Glif](https://lotus.filecoin.io/developers/glif-nodes/) or [Infura](https://blog.infura.io/introducing-infura-support-for-filecoin-developers/). 

In this tutorial we'll set up a Lotus node locally and use the filecoin.js library to interact with it. 

## Prerequisites

Before getting started, you should be familiar with:

- [How Filecoin works](https://docs.filecoin.io/about-filecoin/how-filecoin-works/)
- [Using the Lotus command line](https://lotus.filecoin.io/lotus/manage/lotus-cli/)

Also, make sure you have the following dependencies installed with the latest version:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- The dependencies listed on the [Install a Lotus node page](https://lotus.filecoin.io/lotus/install/prerequisites/)

## Setup

In this section, we'll set up a Lotus node, install the filecoin.js library, and confirm that they work together correctly.

### Lotus node

The following the steps walk-through how to install a Lotus node. Further, more detailed, instructions are available on the [Install a Lotus node page](https://lotus.filecoin.io/docs/set-up/install/).

1. Download the Lotus source code. The version number of the latest release can be found on the [lotus releases](https://github.com/filecoin-project/lotus/releases) page:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus
   git checkout vX.X.X # tag for the latest release
   ```

1. Build and install Lotus for the Calibration network:

   ```shell
   make clean calibnet
   sudo make install
   ```

1. Download the latest chain snapshot using the CID listed under `Genesis CAR file` (https://docs.filecoin.io/networks/overview/#calibration). Then sync to the network which will take several hours to fully sync the chain:

   ```shell
   lotus daemon --import-snapshot curl -sI https://www.mediafire.com/file/q7tc2bmcc9d09vv/lotus_cali_snapshot_2021_07_14_high_73770.car.tar.xz/file
   ```

1. [Create a wallet](https://lotus.filecoin.io/lotus/manage/manage-fil/#creating-a-wallet) and request some test FIL from the [Faucet](https://faucet.calibration.fildev.network/).
1. [Enable remote API access to your Lotus node](https://lotus.filecoin.io/developers/api-access/).

### Verify your setup

To make sure everything's running and set up properly, we should check a couple of things.

1. First, check the status of your local node:

  ```shell with-output
  lotus sync wait
  ```

  ```shell
  > Worker: 10161; Base: 778820; Target: 778820 (diff: 0)
  > State: complete; Current Epoch: 778820; Todo: 0
  > 
  > Done!
  ```

  This tells us that our node is fully synced and ready to go.

1. Next, let's check that the test FIL has landed in your wallet:

  ```shell with-output
  lotus wallet list 
  ```

  ```shell
  Address                                    Balance        Nonce  
  t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma  100 FIL          0
  ```

  This tells us that the testnet faucet was able to send us some test FIL.

### Create a Node.js project

Let's set up a Node.js project with the necessary dependencies.

1. Create a new Node.js project.

   ```shell
   mkdir build-with-lotus && cd build-with-lotus
   npm init
   ```
   
2. Install the filecoin.js library.

   ```shell
   npm install filecoin.js
   ```

### Test a simple function

Now we're ready to connect to our Lotus node and interact with the Lotus APIs. Let's write a simple script to query the Lotus version to verify if everything works as expected.

1. Create a `chainDataQuery.mjs` file in your project and add the following code.

    ```javascript
    // Import necessary packages
    import { HttpJsonRpcConnector, LotusClient } from "filecoin.js";

    // Use the local node URL to create a connection to your Lotus node
    const localNodeUrl = "http://127.0.0.1:1234/rpc/v0";
    const localConnector = new HttpJsonRpcConnector({ url: localNodeUrl });

    // lotusClient exposes all Lotus APIs
    const lotusClient = new LotusClient(localConnector);
    const version = await lotusClient.common.version();
    console.log(version);
    ```

2. Run the following command in your project directory:

    ```shell with-output
    node basicQuery.mjs
    ```

    This will output something like:

    ```shell
    {
      Version: '1.15.0+calibnet+git.0ac1bbc7a',
      APIVersion: 66816,
      BlockDelay: 30
    }
    ```

If everything is set up correctly, your code will be able to connect to the Lotus node and return the chain data as shown above. Check the [Lotus Troubleshooting](https://lotus.filecoin.io/lotus/manage/troubleshooting/) if you run into any errors here. 

## Get chain data

Blockchain data is a fundamental part of any blockchain network. Using the Lotus API you can query chain data, including tipsets, blocks, messages, network status, storage deals, storage provider details, and more.

Let's look at some common chain data-related packages in the filecoin.js library's LotusClient:

- `LotusClient.common` - get node info
- `LotusClient.chain` - interact with the blockchain
- `LotusClient.wallet` - manage wallets on the Lotus node
- `LotusClient.client` - interact with the storage and retrieval markets as a client
- `LotusClient.paych` - interact with and manage payment channels
- `LotusClient.state` - query, inspect, and interact with chain state

In the previous step, we created a `chainDataQuery.mjs` file to demonstrate the basic steps to connect to the Lotus node and initialize a `LotusClient` to query chain data. Next, let's use some more functions that don't require an authentication token.

1. Get current chain head:

   We can add the following code in `chainDataQuery.mjs` to query current head of the chain. 

     ```javascript with-output
      //Query the current block head
      const chainHead = await lotusClient.chain.getHead();
      console.log(chainHead);
     ```
   As a result, it will return the current head of the chain, including current block height, a list of blocks, and a list of CIDs.
      ```shell
      {
        Cids: [
          {'/': 'bafy2bzacecdkonmhngylnnhrk4azkg2wkgcm6cnm5qn5sk4ww5cszjlvkgkd6'},
          {'/': 'bafy2bzaceaglcpzhd5gfrzdyt7ce3e5asnbfz3s3stbqyxniziny5snewbpbg'}
          ],
        Blocks: [
          {...},
          # long list of additional blocks
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
    Using the above code in`chainDataQuery.mjs` , we can also retrieve messages from a certain block height. And the returned message body will look like the following .
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

Filecoin wallets hold the addresses that you can use to manage FIL tokens, sign transactions, and pay for gas fees. In this section, we will demonstrate different ways to manage your Filecoin wallet. There are two types of Filecoin wallet:

1. [Lotus wallets](#lotus-wallets) that are held directly in Lotus node.
2. [Light wallets](#light-wallet) that are detached from any node, and are managed by key-pairs.

### Lotus wallets

Lotus wallets are created and hosted in the Lotus node. When the Lotus node is running, the wallet is opened in the node and you can manage your wallet's addresses and balances using the command line or API calls. You will need an authorization token with sign permissions to interact with a wallet. Authorization tokens are often called _auth tokens_.

1. First, let's make sure your local Lotus node is running and the wallet address contains some testnet FIL.

    ```shell with-output
    lotus wallet list 
    ```

    This will output something like:

    ```shell
    Address                                    Balance        Nonce  
    t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma  100 FIL          0
    ```

1. Next, generate an authorization token with _sign_ permission:

    ```shell with-output
    lotus auth create-token --perm sign
    ```

    This will output your auth token. Save this somewhere, we'll be using it later:

    ```shell
eyJhbGciOiJIUzI1NiIsInRaaaaaa.xxxxxxx.bbbbbbbbbbbvq1W0ZjqrXHygd6fBRk
    ```

1. Create a new file called `lotusWallet.mjs` in the same project as earlier. This is where we'll write all out wallet-related code.
1. In `lotusWallet.mjs` import modules from filecoin.js and initialize the `HttpJsonRpcConnector`, `LotusClient`, and `LotusWalletProvider` components:

    ```javascript
    import { HttpJsonRpcConnector, LotusWalletProvider, LotusClient} from "filecoin.js";
    import BigNumber from "bignumber.js";
    
    // Use your localNodeUrl and auth token to interact with Lotus wallet
    const localNodeUrl = "http://127.0.0.1:1234/rpc/v0";
    const signAuthToken ="<YOUR-SIGN-AUTH-TOKEN>"
    const httpConnector = new HttpJsonRpcConnector({ url: localNodeUrl, token: signAuthToken });
    const lotusClient = new LotusClient(httpConnector);
    const lotusWallet = new LotusWalletProvider(lotusClient);
    ```

1. Let's create a second wallet address so we can test transfers. The new address will be created in your Lotus node and start with 0 token balance:

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

    // Test newWallet function.
    newWallet();
    ```

1. Run the script to create the new address:

    ```shell with-output
    node lotusWallet.mjs 
    ```

    This will output something like:

    ```shell
    new wallet address:  t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa
    ```

1. You can also verify if the new wallet address is created in your local Lotus node using Lotus CLI command:

    ```shell with-output
    lotus wallet list
    ```

    This will output smething like:

    ```shell
    Address                                    Balance       Nonce   Default  
    t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma  100 FIL         0        X        
    t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa  0 FIL           0              #This is the new created address
    ```

1. Now, let's try to transfer the FIL token to this new address. Under the hood, this will create a transaction to transfer FIL token from `fromAddress` to `toAddress`, sign the transaction using the Lotus wallet, and send the signed transaction to the Lotus node. Fortunately, these processes are taken care of by filecoin.js so that you can do all these by calling the `lotusWallet.sendMessage(params)` methods. Add the following code to `lotusWallet.mjs`:

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

1. Run the code to test the transfer of FIL:

    ```shell with-output
    node lotusWallet.mjs
    ```

    This will output a message CID. You can use this CID to check the message by pasting it into a block explorer:

    ```shell
    message CID:  {
      '/': 'bafy2bzacecrrnelqjqhsspfayzcxmx4nhaw6t7j5dpexuxix5jkgloyze2jpu'
    }
    ```

1. Now, you should have created a new address in your Lotus node and also transferred some FIL tokens to it. Next, let's query the balance of all your wallet addresses in the Lotus node:

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

   // Test walletBalance function
   walletBalance();
   ```

1. Run the code to test the FIL transfer:

   ```shell with-output
   node lotusWallet.mjs
   ```

   This will output the FIL values in attoFIL:

   ```shell
   t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma : 89999999675971952500
   t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa : 10000000000000000000
   ```

1. You can also check the balance directly in your Lotus node through the command line:

    ```shell with-output
    lotus wallet list
    ```

    This will output something like:

    ```shell
    Address                                    Balance                     Nonce  Default  
    t154xvuihhicgluafwmohwzwmtmqp44pwwgewyvma  89.9999996759719525 FIL     2      X        
    t1ax5kdqxrrecxpyys6svvxjing7shqju26ytcsoa  10 FIL
    ```

    Notice that the sum of both balances is slightly less than 100 FIL. This is because we had to pay gas to transfer FIL from one address to another. Every process that makes a _state change_ on the blockchain incurs a gas cost.

### Light wallets

The `filecoin.js` library also supports creating a light wallet using a _mnemonic_ and a password. As long as you have the mnemonic and password of your wallet, you can recover it anywhere and use it by sending PRC requests to any Lotus full nodes.

1. In your `build-with-lotus` project, let's create a `lightWallet.mjs` file. Since we are using a light wallet, we will use the Glif hosted endpoint as the connection to the Filecoin network to send transactions. First, we import all the modules and create a connection and lightWallet client using the Glif endpoint's URL:

    ```javascript
    import { HttpJsonRpcConnector, LotusClient, LightWalletProvider,MnemonicWalletProvider} from "filecoin.js";
    import BigNumber from "bignumber.js";
    
    const glifNodeurl = "https://calibration.node.glif.io";
    const glifNodeConn = new HttpJsonRpcConnector({url:glifNodeurl});
    const glifClient = new LotusClient(glifNodeConn);
    ```

2. When creating a light wallet using the BIP39 standard, it is very important to backup the mnemonic code, the `encryptedWallet` object, and your password. Do not share them — anyone who has this information will have control of your light wallet and assets!

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

1. Calling the `createLightWallet()` function will output your mnemonic, `encryptedWallet` object, and your wallet address:

    ```shell
    mnemonic: mouse escape tilt destroy xxx top yyy spice art zzz price image
    encryptedWallet: {......}
    Wallet Address: t1qfyuosiqgoycy5ojwsxtpnlp44orxg4gtmuhhaq
    ```

    Make sure to backup these three items by saving and storing `encryptedWallet`  as a json file, and recording mnemonic and wallet address somewhere safe.

1. Request some FIL tokens from the [Calibration Faucet](https://faucet.calibration.fildev.network/) using the wallet address you just received.
1. Next let's transfer some FIL from your light wallet to another wallet:

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

    // Test the function
    sendFromLightWallet();
    ```

1. Run the code to test this transfer:

    ```shell with-output
    node lightWallet.mjs
    ```

    This will output a message CID.

    ```shell
    {
      '/': 'bafy2bzaceamdsqcc3jccrhvwrz6kmpujfkg6crwynmrtal2nsmwkqv22bktrs'
    }
    ```

    After the message containing this transfer makes it on-chain, you will be able to see it using the [Filecoin Calibration Explorer](https://calibration.filscan.io/tipset/message-list) website.

By this point we've learned how to create a wallet on the Lotus node using an RPC API call, as well as create a light wallet and manage it's assets through a hosted Glif node. If you are interested in exploring more features of Lotus, keep following this tutorial. You can also go to the [Lotus JSON-RPC API](https://lotus.filecoin.io/developers/apis/json-rpc/) and start creating your own projects on Filecoin.

## Make a storage deal

Storing data is one of the most important features of Filecoin. In this section, we'll walk through the end-to-end process of storing your data on the Filecoin network. We'll start by importing your data to the local Lotus node, then make a storage deal with a storage provider, and finally wait for the deal to complete. Let's dive in!

1. Start by generating an admin auth token. This is required to import data into the Lotus node:

    ```shell with-output
    lotus auth create-token --perm admin
    ```

    This will output your auth token. Make a note of this, we'll be using it later.

    ```shell
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......n7ugba1aJECuZXkMgJxHUH08MKTENQ-hAtsosDu-HXg
    ```

1. Create a `storeFile.mjs` file in your `build-with-lotus` project and add the following boilerplate code:

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

3. The next step is to import your data to the Lotus node:

    ```javascript
    const importResult = await lotusClient.client.import({
        Path: "PATH_TO_YOUR_FILE",
        IsCAR: false,
    });
    
    console.log(importResult.Root);
    ```

    This returns a CID of your data we'll use to refer to the data in future steps:

    ```json
    {
      '/': 'bafykbzaceclwpu76hyjemz3ggynjek4y2mh47pwamfp3rk3icnjvsmhsumio6'
    }
    ```

3. Next, we need to find a storage provider that is willing to accept your storage deal. Since we are using the calibration network for this tutorial, we can use the `list-asks` to find storage providers. It will return a list of `asks` from the storage providers which are actively accepting deals, containing the details of their storage asks:

    ```shell with-output
    lotus client list-asks
    ```

    This will output something like:

    ```shell
    .. querying asks
    * Queried 43 asks, got 8 responses
    t029598: min:256 B max:32 GiB price:0 FIL/GiB/Epoch verifiedPrice:0 FIL/GiB/Epoch ping:340.644025ms
    t031337: min:256 B max:32 GiB price:0 FIL/GiB/Epoch verifiedPrice:0 FIL/GiB/Epoch ping:342.296042ms
    t01105: min:256 B max:32 GiB price:0.0000000002 FIL/GiB/Epoch verifiedPrice:0.00000000002 FIL/GiB/Epoch ping:589.173496ms
    t032368: min:256 B max:32 GiB price:0.0000000005 FIL/GiB/Epoch verifiedPrice:0.00000000005 FIL/GiB/Epoch ping:294.554013ms
    ```

    As a side note; if you were working on Filecoin Mainnet, you could use the [Filecoin Plus](https://lotus.filecoin.io/tutorials/store-and-retrieve/store-data/#find-a-storage-provider-via-filecoin-plus) program to find storage providers offering free storage for verified clients:


1. Pick a storage provider ID from the `list-asks` response and add it into the following code. Replace `t00001` with the storage provider ID you picked:

    ```javascript
    //2. query Miner offers for storing this file
    const queryOffer = await lotusClient.client.minerQueryOffer('t00001', importResult.Root);
    console.log(queryOffer);
    const isActive = importResult.Root["/"] === queryOffer.Root["/"];
    console.log("Provider is active: ", isActive);
    ```

    If the storage provider you picked is active, the above code will output:

    ```plaintext
    Provider is active: true
    ```

4. Create a storage deal with a storage provider. Replace `t00001` with the storage provider ID you chose:

    ```javascript
    //3. start storage deal with SP
    if(isActive){
      const dealCid = await lotusClient.client.startDeal({
        Data: {
          TransferType: 'graphsync',
          Root: importResult.Root,
        },
        Miner: 't00001',
        Wallet: await lotusWallet.getDefaultAddress(),
        EpochPrice: ,
        MinBlocksDuration: 518400,
      });
      console.log("dealCID is ", dealCid);
    }
    ```

1. Let's run the js code to store a file on Filecoin:

    ```shell with-output
    node lightWallet.mjs
    ```

    If everything runs successfully the script will output a deal CID:

    ```json
    {
      '/': 'bafy2bzaceamdsqcc3jccrhvwrz6kmpujfkg6crwynmrtal2nsmwkqv22bktrs'
    }
    ```

By this step, you have made a storage deal with a storage provider successfully. The Lotus node will start processing the data and sending it to the storage provider. Your storage deal will need to go through many sub-processes to be finalized on-chain. See the [Deal states](https://lotus.filecoin.io/tutorials/lotus/store-and-retrieve/store-data/#deal-states) table for more details.

You can check the status of your storage deal via the Lotus command line using its CID. 

```shell with-output
lotus client list-deals --show-failed
```

This should output something like:

```shell
DealCid      DealId  Provider  State                     On Chain?  Slashed?  PieceCID     Size       Price             Duration  Verified  
...dbuwcbjq  0       t024557   StorageDealFundsReserved  N          N         ...7rkejcnq  3.969 MiB  0 FIL             522909    false     
...pkbhfkju  0       t01105    StorageDealError          N          N         ...7rkejcnq  3.969 MiB  0.0000177158 FIL  88579     false  
...wb4wiuwq  0       t01105    StorageDealClientFunding  N          N         ...7rkejcnq  3.969 MiB  0.0001041094 FIL  520547    false 
```

Congratulations on making it all the way through this tutorial! In this tutorial, we learned the basics of interacting with the Filecoin network using an API client library and local Lotus node. This can serve as the foundation for you explore the complete [Lotus JSON-RPC API](https://lotus.filecoin.io/developers/apis/json-rpc/).
