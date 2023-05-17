---
title: "ERC-20 quickstart"
description: "In this quickstart tutorial we'll walk through how to deploy your first smart-contract to the Filecoin network. We're going to install a browser-based wallet called Metamask, create a new wallet address, supply some test currency to that wallet, and then use a browser-based development environment called Remix to deploy a smart contract to the Filecoin network."
lead: "In this quickstart tutorial we'll walk through how to deploy your first smart-contract to the Filecoin network. We're going to install a browser-based wallet called Metamask, create a new wallet address, supply some test currency to that wallet, and then use a browser-based development environment called Remix to deploy a smart contract to the Filecoin network."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-fundamentals"
    identifier: "erc-20-quickstart-0be0da9b102ca7f5af95f58567cc2bae"
weight: 141
toc: true
aliases:
    - "/fvm/how-tos/quickstart"
    - "/fvm/basics/quickstart/"
    - "/developers/smart-contracts/quickstart/"
---

We're going to be creating an ERC-20 token in this quickstart. The ERC-20 contract is used a lot in representing a massive array of tokens across multiple blockchains, primarily the Ethereum blockchain.

{{< alert "info" >}}
If you're an Ethereum developer, check out the [FEVM Hardhat kit]({{< relref "/smart-contracts/developing-contracts/hardhat" >}}).
{{< /alert >}}

## Accounts and assets

We're going to be using MetaMask, a cryptocurrency wallet that lives in your browser making it very easy for users to interact with web3-based sites!

### Create a wallet

Before we can interact with the Filecoin network, we need funds. But before we can get any funds, we need somewhere to put them!

1. Open your browser and visit the [MetaMask website](https://metamask.io/).
1. Install the wallet by clicking the **Download for** button. MetaMask is available for Brave, Chrome, Edge, Firefox, and Opera.
1. Once you have installed MetaMask, it will open a **Get started** window.

    ![Get started with MetaMask.](metamask-get-started.png)

1. Click **Create a new wallet**.
1. Enter a password to secure your MetaMask wallet. You will need to enter this password every time you use the wallet.

    ![Create a password for your MetaMask wallet.](metamask-create-password.png)

1. Follow the prompts until you get to the **Secret Recovery Phrase** window. Read the information about what this _recovery phrase_ is on this page.
1. Eventually you should get to the _Wallet creation success_ page!

    ![Wallet creation successful!](metamask-creation-success.png)

1. Once you've done that, you should have your account set up!

    ![Default MetaMask page.](metamask-default-page.png)

### Switch networks

You may notice that we are currently connected to the **Ethereum Mainnet**. We need to point MetaMask to the Filecoin network, specifically the [Hyperspace testnet]({{< relref "/networks/hyperspace/details" >}}). We'll use a website called [chainlist.org](https://chainlist.org/) to give MetaMask the information it needs quickly.

1. Go to [chainlist.org](https://chainlist.org/).
1. Enable the **Testnets** toggle and enter `Filecoin` into the search bar.

    ![Search for Filecoin testnets in Chainlist.](chainlist-search-for-filecoin-testnets.png)

1. Scroll down to find the **Filecoin -- Hyperspace** testnet:

    ![Find the Hyperspace testnet.](chainlist-select-hyperspace.png)

1. In MetaMask click **Next**.

    ![Click next in MetaMask.](chainlist-connect-with-metamask.png)

1. Click **Connect**:

    ![Click connect in MetaMask.](chainlist-click-connect-in-metamask.png)

1. Click **Approve** when prompted to _Allow this site to add a network_:

    ![Approve the new network in MetaMask](chainlist-approve-new-network.png)

1. Click **Switch network** when prompted by MetaMask:

    ![Switch networks in MetaMask.](chainlist-switch-network.png)

1. Open MetaMask from the browser extensions tab:

    ![Open MetaMask from the browser extensions tab.](chainlist-open-metamask.png)

1. You should see the Filecoin Hyperspace testnet listed at the top:

    ![MetaMask on the Filecoin Hyperspace testnet.](chainlist-hyperspace-added.png)

Nice! Now we've got the Filecoin Hyperspace testnet set up within MetaMask. You'll notice that our MetaMask window shows `0 TFIL`. Test-filecoin (`TFIL`) is `FIL` that has no value in the _real world_, and developers use it for testing. We'll grab some `TFIL` next.

### Get some funds

1. In your browser, open MetaMask and copy your address to your clipboard:

    ![Copy your address to your clipboard.](faucet-get-address.png)

1. Go to [hyperspace.yoga](https://hyperspace.yoga) and click **Faucet** from the menu.

    ![Go to the Faucet section of the website.](faucet-click-faucet.png)

1. Paste your address into the address field, complete the **I am human** captcha, and then click **Send**:

    ![Verify you're a human.](faucet-verify.png)

1. The faucet should give you a link to the transaction:

    ![Click on the message link.](faucet-get-message-link.png)

1. The block explorer will show you the transaction history for your address. After a couple of minutes, you should see 5 `tFIL` transferred to your address.

    ![Show the message confirmation in a block explorer.](faucet-show-message-confirmation.png)

1. Open MetaMask to confirm that you received the `tFIL`:

    ![MetaMask showing a balance of FIL.](faucet-metamask-with-balance.png)

That's all there is to it! Getting `tFil` is easy!

## Contract creation

The development environment we're going to be using is called Remix, viewable at [remix.ethereum.org](https://remix.ethereum.org/). Remix is an incredibly sophisticated tool, and there's a lot you can play around with! In this tutorial however, we're going to stick to the very basics. If you want to learn more, check out [the Remix documentation](https://remix-ide.readthedocs.io/en/latest/).

### Create a workspace

In Remix, workspaces are where you can create a contract, or group of contracts, for each project. Let's create a new workspace to create our new ERC-20 token.

1. Open [remix.ethereum.org](https://remix.ethereum.org).
1. Click the `+` icon next to **Workspaces** to create a new workspace:

    ![Create a new workspace.](create-a-workspace-add.png)

1. In the **Choose a template** dropdown, select **ERC 20**.
1. Select the **Mintable** checkbox.
1. Enter a fun name for your token in the **Workspace name** field. Something like `CorgiCoin` works fine.
1. Click **OK** to create your new workspace.

    ![Set workspace details.](create-a-workspace-details.png)

### Customize the contract

The contract template we're using is pretty simple. We just need to modify a couple of variables.

1. Under the **contract** directory, click **MyToken.sol**.

    ![Open the MyToken contract.](customize-open-mytoken-contract.png)

1. In the editor panel, replace `MyToken` with whatever you'd like to name your token. In this example, we'll use `CorgiCoin`.

    ![Change token name.](customize-change-token-name.png)

1. On the same line, replace the second string with whatever you want the symbol of your token to be. In this example, we'll use `CRG`.

    ![Change token ticket.](customize-change-token-ticker.png)

That's all we need to change within this contract. You can see on line 4 that this contract is importing another contract from `@openzeppelin` for us, meaning that we can keep our custom token contract simple.

### Compile

1. Click the green play symbol at the top of the workspace to compile your contract. You can also press `CMD` + `s` on MacOS or `CTRL` + `s` on Linux and Windows.

    ![Compile the contract.](compile-compile.png)

1. Remix automatically fetches the two `import` contracts from the top of our `.sol` contract. You can see these imported contracts under the `.deps` directory. You can browse the contracts there, but Remix will not save any changes you make.

    ![Compile and get the dependencies](compile-deps.png)

### Deploy

Now that we've successfully compiled our contract, we need to deploy it somewhere! This is where our previous MetaMask setup comes into play.

1. Click the **Deploy** tab from the left.

    ![Select the deploy tab.](deploy-tab.png)

1. Under the **Environment** dropdown, select **Injected Provider - MetaMask**.

    ![Select MetaMask within Remix.](deploy-select-metamask.png)

1. MetaMask will open a new window confirming that you want to connect your account to Remix.
1. Click **Next**:

    ![Click next in MetaMask.](deploy-metamask-click-next.png)

1. Click **Connect** to connect your `tFIL` account to Remix.

    ![Click Connect in MetaMask.](deploy-metamask-click-connect.png)

1. Back in Remix, under the **Account** field, you'll see that it says something like `0x11F... (5 ether)`. This value is 5 `tFIL`, but Remix doesn't natively support the Filecoin network so doesn't understand what `tFIL` is. This isn't a problem, it's just a little quirk of using Remix.

    ![Remix and MetaMask linked.](deploy-remix-metamask-linked.png)

1. Under the **Contract** dropdown, ensure the contract you created is selected.

    ![Select contract in Remix.](deploy-select-contract.png)

1. Click **Deploy**.

    ![Click Deploy in Remix.](deploy-remix-deploy.png)

1. MetaMask will open a window and as you to confirm the transaction. Scroll down and click **Confirm** to have MetaMask deploy the contract.

    ![Remix and MetaMask deploying a contract.](deploy-metamask-confirm.png)

1. Back in Remix, a message at the bottom of the screen shows that the creation of your token is pending.

    ![Deployment confirmation in Remix.](deploy-remix-confirmation.png)

1. Wait around 90 seconds for the deployment to complete.

    ![Deployment complete.](deploy-complete.png)

On the Filecoin network, a new set of blocks, also called a tipset, is created every thirty seconds. When deploying a contract, the transaction needs to be received by the network, and then the network needs to confirm the contract. This process takes around one to two tipsets to process -- or around 60 to 90 seconds.

## Use your contract

Now that we've compiled and deployed the contract, it's time to actually interact with it!

### Mint your tokens

Let's call a method within the deployed contract to mint some tokens.

1. Back in Remix, open the **Deployed Contracts** dropdown, within the **Deploy** sidebar tab.

    ![](use-mint-select-deployed-contracts.png)

1. Expand the `mint` method. You must fill in two fields here: `to` and `amount`.

    ![Open the mint method.](use-mint-open-mint.png)

1. The `to` field specifies where address you want these initial tokens sent to. Open MetaMask, copy your address, and paste it into this field.

    ![Enter your address.](use-mint-enter-address.png)

1. This field expects an `attoFil` value. 1 `FIL` is equal to 1,000,000,000,000,000,000 `attoFil`. So if you wanted to mint 100 `FIL`, you would enter `100` followed by 18 zeros: `100000000000000000000`.
1. Click **Transact**.

    ![Click transact.](use-mint-transact.png)

1. MetaMask will open a window and ask you to confirm the transaction:

    ![Confirm message in MetaMask.](use-mint-metamask-confirm.png)

Again, you must wait for the network to process the transaction, which should take about 90 seconds. You can move on to the next section while you're waiting.

### Add to MetaMask

Currently, MetaMask has no idea what our token is or what it even does. We can fix this by explicitly telling MetaMask the address of our contract.

1. Go back to Remix and open the **Deploy** sidebar tab.
1. Under **Deployed Contracts**, you should see your contract address at the top. Click the copy icon to copy the address to your clipboard:

    ![Copy your contract address.](add-copy.png)

1. Open MetaMask, select **Assets**, and click **Import your tokens**:

    ![Import your address details.](add-assets.png)

1. In the **Token contract address** field, paste the contract address you just copied from Remix and then click **Add custom token**. MetaMask should autofill the rest of the information based on what it can find from the Filecoin network.

    ![Complete your asset details.](add-import.png)

1. Click **Import token**:
1. You should now be able to see that you have 100 of your tokens within your MetaMask wallet!

    ![MetaMask showing a new token.](add-complete.png)

### Share your tokens

Having a bunch of tokens in your personal MetaMask is nice, but why not send some tokens to a friend? Your friend needs to create a wallet in MetaMask as we did in the [Create a wallet](#create-a-wallet) and [Switch networks](#switch-networks) sections. They will also need to import your contract deployment address like you did in the [Add your tokens to MetaMask](#add-your-tokens-to-metamask) section. Remember, you need to pay gas for every transaction that you make! If your friend tries to send some of your tokens to someone else but can't, it might be because they [don't have any `tFil`](#get-some-funds).

