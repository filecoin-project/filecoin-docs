---
title: "Remix"
description: "Remix is a popular web-based integrated development environment (IDE) for developing and testing smart contracts on the Ethereum blockchain. It is an official tool provided by the Ethereum Foundation, and it offers a variety of features that make it easier for developers to write and debug smart contracts. The Filecoin EVM runtime allows developers to use Ethereum tooling, like Remix, with the Filecoin network."
lead: "Remix is a popular web-based integrated development environment (IDE) for developing and testing smart contracts on the Ethereum blockchain. It is an official tool provided by the Ethereum Foundation, and it offers a variety of features that make it easier for developers to write and debug smart contracts. The Filecoin EVM runtime allows developers to use Ethereum tooling, like Remix, with the Filecoin network."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: "remix-4c28be2b94737a684948515c69efbf89"
weight: 460
toc: true
aliases:
    - "/developers/smart-contracts/how-tos/deploy-a-contract/"
---

## Launch an ERC-20 token

As a simple introduction, we're going to use Remix to create an ERC-20 token on the Filecoin network. In this guide, we're using the Calibration testnet, but this process is the same for mainnet.

{{< alert >}}
This guide assumes you've already connected your MetaMask extension to a Filecoin network. If you haven't done so yet, [check out this guide to add the Hyperspace testnet to MetaMask]({{< relref "/basics/assets/metamask-setup" >}}).
{{< /alert >}}

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

{{< alert >}}
This guide assumes you've already connected your MetaMask extension to a Filecoin network. If you haven't done so yet, [check out this guide to add the Hyperspace testnet to MetaMask]({{< relref "/basics/assets/metamask-setup" >}}).
{{< /alert >}}

1. Click the **Deploy** tab from the left.

    ![Select the deploy tab.](deploy-tab.png)

1. Under the **Environment** dropdown, select **Injected Provider - MetaMask**.

    ![Select MetaMask within Remix.](deploy-select-metamask.png)

1. MetaMask will open a new window confirming that you want to connect your account to Remix.
1. Click **Next**:

    ![Click next in MetaMask.](deploy-metamask-click-next.png)

1. Click **Connect** to connect your `tFIL` account to Remix.

    ![Click Connect in MetaMask.](deploy-metamask-click-connect.png)

1. Back in Remix, under the **Account** field, you'll see that it says something like `0x11F... (5 ether)`. This value is 5 `tFIL`, but Remix doesn't support the Filecoin network, so it doesn't understand what `tFIL` is. This isn't a problem; it's just a little quirk of using Remix.

    ![Remix and MetaMask linked.](deploy-remix-metamask-linked.png)

1. Under the **Contract** dropdown, ensure the contract you created is selected.

    ![Select contract in Remix.](deploy-select-contract.png)

1. Click **Deploy**.

    ![Click Deploy in Remix.](deploy-remix-deploy.png)

1. MetaMask will open a window and as you to confirm the transaction. Scroll down and click **Confirm** to have MetaMask deploy the contract. If you're deploying to mainnet, we advise you to [adjust your gas fees](#adjusting-your-gas-fees) for a cheaper deployment.

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

    ![Open the deployed contracts dropdown.](use-mint-select-deployed-contracts.png)

1. Expand the `mint` method. You must fill in two fields here: `to` and `amount`.

    ![Open the mint method.](use-mint-open-mint.png)

1. The `to` field specifies where address you want these initial tokens sent. Open MetaMask, copy your address, and paste it into this field.

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

And that's it! Deploying an ERC-20 token on Filecoin is simple!

### Adjusting your gas fees

Remix uses a default of 2.5 nanoFIL per gas as a priority fee, which is usually too high for the Filecoin network. If you don't adjust this, you may end up overpaying when deploying to mainnet. We recommend that you switch from the site-suggested gas fees to oracle-supplied gas fees when deploying your contract.

1. When the deployment transaction confirmation pop-up window shows up, click on **Site suggested**.

    ![MetaMask showing a deployment transaction confirmation window, with the gas configuration option highlighted.](gas-prompt.png)

1. Switch to **Market**, **Aggressive**, or **Low**. The **Market** option is generally suitable for most situations.

    ![MetaMash showing the gas fee editor.](gas-fee-editor.png)
