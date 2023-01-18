---
title: "Quickstart"
description: "If you're an experienced EVM developer, check out the [**FEVM Hardhat kit**](https://github.com/filecoin-project/fevm-hardhat-kit) which uses the Zondax [Filecoin Solidity library](https://github.com/Zondax/filecoin-solidity). Otherwise in this quickstart tutorial we'll walk through how to deploy your first smart-contract to the Filecoin network using Remix."
lead: "If you're an experienced EVM developer, check out the [**FEVM Hardhat kit**](https://github.com/filecoin-project/fevm-hardhat-kit) which uses Zondax's [Filecoin Solidity library](https://github.com/Zondax/filecoin-solidity). <br><br>Otherwise in this quickstart tutorial we'll walk through how to deploy your first smart-contract to the Filecoin network using Remix."
draft: false
images: []
type: docs
menu:
  developers:
    parent: "lorem"
    identifier: "developers-smart-contracts-quickstart-5690c04dabf53b73935eb90a54e22b95"
weight: 5
toc: true
aliases:
    - /fvm/how-tos/quickstart
    - /fvm/basics/quickstart/
---

{{< beta-warning >}}

We're going to be creating an ERC-20 token in this quickstart. The ERC-20 contract is used a lot in representing a massive array of tokens across multiple blockchains, primarily the Ethereum blockchain.

## Accounts and assets

We're going to be using MetaMask, a cryptocurrency wallet that lives in your browser making it very easy for users to interact with web3-based sites!

### Create a wallet

Before we can interact with the Filecoin network, we need funds. But before we can get any funds, we need somewhere to put them!

1. Open your browser and visit the [MetaMask website](https://metamask.io/).
1. Install the wallet by clicking the **Download for** button. MetaMask is available for Brave, Chrome, Edge, Firefox, and Opera.
1. Once you have installed MetaMask, it will open a **Get started** window.

    ![Get started with MetaMask.](metamask-get-started.png)

1. Follow the prompts until you MetaMask asks if you are **New to MetaMask**.
1. Because you still need an account on the Filecoin network, select **Create a wallet**.

    ![Create a wallet in MetaMask.](metamask-create-new-wallet.png)

1. Enter a secure password. You will use this password every time you want to open this wallet in this browser.
1. Click **Next** until you get to the **Secret Recovery Phrase** window. Read the information about what this _recovery phrase_ is on this page.
1. Once you've followed the instructions and saved your recovery phrase, click **Next**.
1. Confirm that you saved the recovery phrase correctly by clicking on the words in order.
1. Once you've done that, you should have your account set up!

### Switch networks

You may notice that we are currently connected to the **Ethereum Mainnet**. We need to point MetaMask to the Filecoin network, specifically the _Wallaby testnet_. We'll use a website called [chainlist.org](https://chainlist.org/) to give MetaMask the information it needs quickly.

1. Go to [chainlist.org](https://chainlist.org/).
1. Enable the **Testnets** toggle and enter `Filecoin` into the search bar.

    ![Select a testnet in Chainlist.](chainlist-select-test-networks.png)

1. Scroll down to find the **Filecoin -- Wallaby** testnet:

    ![Find the Filecoin Wallaby testnet in Chainlist.](chainlist-filecoin-wallaby.png)

1. In MetaMask click **Next** and then **Continue** when prompted to connect Chainlist.org to MetaMask:

    ![Connect Chainlist to MetaMask.](chainlist-connect-with-metamask.png)

1. Back on the Chainlist.org page, click the **Filecoin -- Wallaby** testnet connect button again.
1. In MetaMask click **Approve** when prompted to _Allow this site to add a network_:

    ![Allow Chainlist to change networks.](chainlist-allow-site-to-add-a-network.png)

1. Click **Switch network** when prompted by MetaMask:

    ![Switch networks with Chainlist.](chainlist-switch-network.png)

1. Open MetaMask, and you should see that you're now on the Filecoin Wallaby testnet:

    ![Complete the process with Chainlist.](chainlist-complete.png)

Nice! Now we've got the Filecoin Wallaby testnet set up within MetaMask. You'll notice that our MetaMask window shows `0 TFIL`. Test-filecoin (`TFIL`) is `FIL` that has no value in the _real world_, and developers use it for testing. We'll grab some `TFIL` next.

### Get some funds

1. Open your browser and open MetaMask.
1. Click your account to copy the address to your clipboard:

    ![Select your account in MetaMask.](faucet-select-account-in-metamask.png)

1. Go to [wallaby.network](https://wallaby.network/#faucet) and scrolldown to the **Faucet** section.
1. Paste your address into the address field, complete the **I am human** captcha, and then click **Send**:

    ![Click the send button in MetaMask.](faucet-click-send.png)

1. The faucet should give you a link to the transaction. Click it to view your transaction:

    ![Click the transaction link on the faucet.](faucet-transaction-link.png)

1. The block explorer will show you the transaction history for your address. After a couple of minutes, you should see 5000 `tFIL` transferred to your address.
1. Open MetaMask to confirm that you received the `tFIL`:

    ![View your funds in MetaMask.](faucet-metamask-with-funds.png)

That's all there is to it! Getting `tFil` is easy!

## Contract creation

The development environment we're going to be using is called Remix, viewable at [remix.ethereum.org](https://remix.ethereum.org/). Remix is an incredibly sophisticated tool, and there's a lot you can play around with! In this tutorial however, we're going to stick to the very basics. If you want to learn more, check out [the Remix documentation](https://remix-ide.readthedocs.io/en/latest/).

### Create a workspace

In Remix, workspaces are siloed environments where you can create a contract, or group of contracts, for each project. Let's create a new workspace to create our new ERC-20 token.

1. Open [remix.ethereum.org](https://remix.ethereum.org).
1. Click the `+` icon next to **Workspaces** to create a new workspace:

    ![Create a new Remix workspace.](remix-new-workspace.png)

1. In the **Choose a template** dropdown, select **ERC 20**.
1. Select the **Mintable** checkbox.
1. Enter a fun name for your token in the **Workspace name** field. Something like `CorgiCoin` works fine.

    ![Name your workspace in Remix.](remix-create-workspace.png)

1. Click **OK** to create your new workspace.

### Customize the contract

The contract template we're using is pretty simple; we just need to modify a couple of variables.

1. Under the **contract** directory, click **MyToken.sol**.
1. In the editor panel, replace `MyToken` with whatever you'd like to name your token. In this example, we'll use `CorgiCoin`.
1. On the same line, replace the second string with whatever you want the symbol of your token to be. In this example, we'll use `CRG`.

    ![Edit your contract in Remix.](remix-edit-contract.png)

That's all we need to change within this contract. You can see on line 4 that this contract is importing another contract from `@openzeppelin` for us, meaning that we can keep our custom token contract simple.

### Compile

1. Click the green play symbol at the top of the workspace to compile your contract. You can also press `CMD` + `s` on MacOS or `CTRL` + `s` on Linux and Windows.
1. Remix automatically fetches the two `import` contracts from the top of our `.sol` contract. You can see these imported contracts under the `.deps` directory. You can browse the contracts there, but Remix will not save any changes you make.

![Remix showing imported contracts.](remix-imported-contracts.png)

### Deploy

Now that we've successfully compiled our contract, we need to deploy it somewhere! This is where our previous MetaMask setup comes into play.

1. Click the **Deploy** tab from the left.

    ![Click deploy within Remix.](remix-click-deploy.png)

1. Under the **Environment** dropdown, select **Injected Provider - MetaMask**.

    ![Select the proper network within Remix.](remix-select-network-dropdown.png)

1. MetaMask will open a new window confirming that you want to connect your account to Remix.
1. Click **Next** and then **Connect** to connect your `tFIL` account to Remix.
1. Back in Remix, under the **Account** field, you'll see that it says something like `0x5A5... (5000 ether)`. This value is 5000 `tFIL`, but Remix doesn't natively support the Filecoin network and thus doesn't understand what `tFIL` is. This isn't a problem; it's just a little quirk of using Remix.

    ![Remix showing 5000 tFil.](remix-5000-tfil.png)

1. Under the **Contract** dropdown, ensure the contract you created is selected.

    ![Select your contract in Remix.](remix-select-contract.png)

1. Click **Deploy**.

    ![Remix showing the deploy button.](remix-deploy-button.png)

1. MetaMask will open a window and as you to confirm the transaction. Scroll down and click **Confirm** to have MetaMask deploy the contract.
1. Back in Remix, a message at the bottom of the screen shows that the creation of your token is pending.

    ![A pending transaction in Remix.](remix-transaction-pending.png)

1. Wait around 90 seconds for the deployment to complete.

On the Filecoin network, a new set of blocks, also called a tipset, is created every thirty seconds. When deploying a contract, the transaction needs to be received by the network, and then the network needs to confirm the contract. This process takes around one to two tipsets to process -- or around 60 to 90 seconds.

## Use your contract

Now that we've compiled and deployed the contract, it's time to actually interact with it!

### Mint your tokens

Let's call a method within the deployed contract to mint some tokens.

1. Back in Remix, open the **Deployed Contracts** dropdown, within the **Deploy** sidebar tab.

    ![Remix showing my deployed contracts.](remix-deployed-contracts-dropdown.png)

1. Expand the `mint` method. You must fill in two fields here: `to` and `amount`.

    ![Remix showing the mint method of a contract.](remix-expand-mint-method.png)

1. The `to` field specifies where address you want these initial tokens sent to. Open MetaMask, copy your address, and paste it into this field.

    ![Add an address into Remix.](remix-add-address.png)

1. This field expects an `attoFil` value. 1 `FIL` is equal to 1,000,000,000,000,000,000 `attoFil`. So if you wanted to mint 100 `FIL`, you would enter `100` followed by 18 zeros: `100000000000000000000`.

    ![Enter a value into Remix.](remix-add-number.png)

1. Click **Transact**.

    ![Click transact in Remix.](remix-click-transact.png)

1. MetaMask will open a window and ask you to confirm the transaction. Again, you must wait for the network to process the transaction, which should take about 90 seconds. You can move on to the next section while you're waiting.

    ![Remix pending the minting of a contract.](remix-mint-pending.png)

### Add to MetaMask

Currently, MetaMask has no idea what our token is or what it even does. We can fix this by explicitly telling MetaMask the address of our contract.

1. Go back to Remix and open the **Deploy** sidebar tab.
1. Under **Deployed Contracts**, you should see your contract address at the top. Click the copy icon to copy the address to your clipboard.

    ![Copy your contract's deployment address.](remix-copy-deploy-address.png)

1. Open MetaMask, select **Assets**, and click **Import your tokens**:

    ![Importing tokens into MetaMask.](metamask-assets-import-tokens.png)

1. In the **Token contract address** field, paste the contract address you just copied from Remix and then click **Add custom token**. MetaMask should autofill the rest of the information based on what it can find from the Filecoin network.

    ![Import your tokens into MataMask.](metamask-import-tokens-autofil.png)

1. Click **Import token**.

    ![Click the import token button in MetaMask.](metamask-import-token.png)

1. You should now be able to see that you have 100 of your tokens within your MetaMask wallet!

    ![Final token import page in MetaMask.](metamask-tokens-finished.png)

### Share your tokens

Having a bunch of tokens in your personal MetaMask is nice, but why not send some tokens to a friend? Your friend needs to create a wallet in MetaMask as we did in the [Create a wallet](#create-a-wallet) and [Switch networks](#switch-networks) sections. They will also need to import your contract deployment address like you did in the [Add your tokens to MetaMask](#add-your-tokens-to-metamask) section. Remember, you need to pay gas for every transaction that you make! If your friend tries to send some of your tokens to someone else but can't, it might be because they [don't have any `tFil`](#get-some-funds).
