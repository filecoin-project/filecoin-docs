---
title: "Multisig wallets"
description: "How to programmatically create and manage multi-signature (multisig) wallets on Filecoin"
menu:
    build:
        parent: "protocol-layer"
weight: 40
---

A single key is subject to accidents such as loss of the physical device. It is now a common feature for crypto wallets to provide multiple-signature (multisig) support. Whether it is one user with multiple keys to a wallet (one user with three devices), or multiple users needed to review and approve a transaction (one business account with multiple partners), multisig wallets provide additional security, flexibility, and recoverability.

#### Create a multisig wallet via Lotus command line

If you have a Lotus node running, use `lotus msig create` to create a multisig wallet:

```
$ lotus msig create signerAddress1 signerAddress2 signerAddress3..
```

To use this multisig wallet for transactions and more, see [Lotus Docs - Multisug](https://lotus.filecoin.io/lotus/manage/multisig/). 

#### Create a multisig wallet via Filecoin.js

You can also create and manage multisig wallets using the JSON RPC API provided by [Filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/). 

Step 1: Create a npm project with a name:

```
$ mkdir filecoinjs-msigwallet-demo
```

```
$ npm init
```

Step 2: Run Lotus daemon & obtain API token with admin permission: 

```
$ lotus daemon
```

This will expose an HTTP JSON RPC interface at [http://127.0.0.1:1234/rpc/v0](http://127.0.0.1:1234/rpc/v0). Use the following command to generate an API token with “admin” permission: 

```
$ lotus auth create-token --perm admin
```

Step 3: Create an app.mjs script (we are using ECMAScript Module), and copy-paste the following code: 

```
import { HttpJsonRpcConnector, LotusWalletProvider, LotusClient } from 'filecoin.js';

(async () => {

  const connector = new HttpJsonRpcConnector({ url: "http://127.0.0.1:1234/rpc/v0", token: "your lotus API token with admin permission" });

  const client = new LotusClient(connector);
  const version = await client.common.version();
  console.log("Lotus version number is " + version.Version + ";\n");

  const walletLotusHttp = new LotusWalletProvider(client);
  let address1 = await walletLotusHttp.newAddress();
  let address2 = await walletLotusHttp.newAddress();
  let address3 = await walletLotusHttp.newAddress();
  console.log("New wallet addresses:")
  console.log("address1: " + address1 + ";");
  console.log("address2: " + address2 + ";");
  console.log("address3: " + address3 + ";\n");

  const defaultAddress = await walletLotusHttp.getDefaultAddress();
  console.log("defaultAddress is: " + defaultAddress + ";\n");

  const msigWalletAddress = await walletLotusHttp.msigCreate(2, [address1, address2, address3], 0, 0, "1000", defaultAddress);
  console.log("Multisig Wallet Address: " + msigWalletAddress['/'] + ";");

})().then().catch();
```

Let's review what happens in this script. First, a `connector` instance is created with a lotus API address using API token created in the previous step. A lotus `client` is instantiated to provide the ability to interact with the [client methods](https://lotus.filecoin.io/reference/lotus/client/). To verify it is working, we use `client.common.version()` to print the lotus version information. 

To create a multisig wallet, we first need to create a few standard wallets using the `.newAddress()` method. Together, these wallets will be the multiple signers of the new multisig wallet. In the code above, three wallets are created. Then, we need to find out the [default wallet address](https://lotus.filecoin.io/lotus/manage/manage-fil/#listing-addresses) of your lotus node using `.getDefaultAddress()`.

Finally, we create the multisig wallet with the `.msigCreate()` function, and specify the number of approvers we require, the list of approving addresses, the beginning epoch time, epoch duration, the amount and the default address. The response is a CID that represents the multisig wallet's address. 

Finally, let's run the script. It should output the addresses of the wallet you've created, as well as the defaultAddress.

```
$ node app.mjs
Lotus version number is: 1.15.0+calibnet+git.0ac1bbc7a;

New wallet addresses: 

address1: t1vjqy7z2abh6np6yctswzvhg63kaidziikzqcyyy;
address2: t1gimvgk456kw7y5z4fmmwqd5p3lceyhczyx4sdvq;
address3: t1c6ksnaetxel2ijodxb6d3fkic7r7rxhyj7x6uqq;

defaultAddress is :t3udehaprwyx7p4afb44qvkc3ljdkj4wcncnjuyzkik6iqfbkgohdtkfhaycou5et2k4xvtqpxqfizw3mqmu3q;
```

This multisig wallet address can be used to propose, approve, or cancel a multisig wallet transaction. More methods are available in the [Msig reference](https://lotus.filecoin.io/reference/lotus/msig/).
