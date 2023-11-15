---
description: >-
  In this quickstart tutorial we’ll walk through how to deploy your first
  smart-contract to the Filecoin network.
---

# ERC-20 quickstart

We’re going to install a browser-based wallet called MetaMask, create a new wallet address, supply some test currency to that wallet, and then use a browser-based development environment called Remix to deploy a smart contract to the Filecoin network. We’re going to be creating an ERC-20 token in this quickstart. The ERC-20 contract is used a lot in representing a massive array of tokens across multiple blockchains, primarily the Ethereum blockchain.

{% hint style="info" %}
If you’re an Ethereum developer, check out the [FEVM Hardhat kit](../developing-contracts/hardhat.md).
{% endhint %}

## Accounts and assets

We’re going to be using MetaMask, a cryptocurrency wallet that lives in your browser making it very easy for users to interact with web3-based sites!

### Create a wallet

Before we can interact with the Filecoin network, we need funds. But before we can get any funds, we need somewhere to put them!

1. Open your browser and visit the [MetaMask website](https://metamask.io/).
2. Install the wallet by clicking the **Download for** button. MetaMask is available for Brave, Chrome, Edge, Firefox, and Opera.
3.  Once you have installed MetaMask, it will open a **Get started** window.

    ![Get started with MetaMask.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-mm-get-started.webp)
4. Click **Create a new wallet**.
5.  Enter a password to secure your MetaMask wallet. You will need to enter this password every time you use the wallet.

    ![Create a password for your MetaMask wallet.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-mm-create-password.webp)
6. Follow the prompts until you get to the **Secret Recovery Phrase** window. Read the information about what this _recovery phrase_ is on this page.
7.  Eventually you should get to the _Wallet creation success_ page!

    ![Wallet creation successful!](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-mm-creation-success.webp)
8.  Once you’ve done that, you should have your account set up!

    ![Default MetaMask page.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-mm-default-page.webp)

### Switch networks

You may notice that we are currently connected to the **Ethereum Mainnet**. We need to point MetaMask to the Filecoin network, specifically the [Calibration testnet](../../networks/calibration/). We’ll use a website called [chainlist.network](https://chainlist.network) to give MetaMask the information it needs quickly.

1. Go to [chainlist.network](https://chainlist.network).
2.  Enable the **Testnets** toggle and enter `Filecoin` into the search bar.

    ![Search for Filecoin testnets in Chainlist.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-chainlist-search.webp)
3. Scroll down to find the **Filecoin – Calibration** **testnet**.
4.  In MetaMask click **Next**.

    ![Click next in MetaMask.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-chainlist-connect-mm.webp)
5. Click **Connect.**
6. Click **Approve** when prompted to _Allow this site to add a network._
7. Click **Switch network** when prompted by MetaMask.
8.  Open MetaMask from the browser extensions tab:

    ![Open MetaMask from the browser extensions tab.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-chainlist-open-mm.webp)
9. You should see the _Filecoin Calibration_ testnet listed at the top.

Nice! Now we’ve got the Filecoin Calibration testnet set up within MetaMask. You’ll notice that our MetaMask window shows `0 TFIL`. Test-filecoin (`TFIL`) is `FIL` that has no value in the _real world_, and developers use it for testing. We’ll grab some `TFIL` next.

### Get some funds

1.  In your browser, open MetaMask and copy your address to your clipboard:

    ![Copy your address to your clipboard.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-faucet-get-address.webp)
2. Go to [faucet.calibration.fildev.network](https://faucet.calibration.fildev.network/) and click **Send Funds.**
3. Paste your address into the address field, and click **Send Funds**.
4. The faucet will show a transaction ID. You can copy this ID into a Calibration testnet [block explorer](../../networks/calibration/explorers.md) to view your transaction. After a couple of minutes, you should see some `tFIL` transferred to your address.

That’s all there is to it! Getting `tFil` is easy!

## Contract creation

The development environment we’re going to be using is called Remix, viewable at [remix.ethereum.org](https://remix.ethereum.org/). Remix is an incredibly sophisticated tool, and there’s a lot you can play around with! In this tutorial however, we’re going to stick to the very basics. If you want to learn more, check out [the Remix documentation](https://remix-ide.readthedocs.io/en/latest/).

### Create a workspace

In Remix, workspaces are where you can create a contract, or group of contracts, for each project. Let’s create a new workspace to create our new ERC-20 token.

1. Open [remix.ethereum.org](https://remix.ethereum.org).
2. Open the dropdown menu and click **create a new workspace**.

    ![Create a new workspace.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-dropdown.webp)
3. In the **Choose a template** dropdown, select **ERC20**.
4. Under **Customize template** > **Features**, check the **Mintable** box.
5. Enter a fun name for your token in the **Workspace name** field. Something like `CorgiCoin` works fine.
6.  Click **OK** to create your new workspace.

    ![Set workspace details.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-details.webp)

### Customize the contract

The contract template we’re using is pretty simple. We just need to modify a couple of variables.
1.  Click the compiler icon to open the compiler panel. Update the compiler version by selecting `0.8.20` from the compiler dropdown.

    ![Update the compiler version](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-compiler.webp)
2.  Under the **contract** directory, click **MyToken.sol**.

    ![Open the MyToken contract.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-customize.webp)
3.  In the editor panel, replace `MyToken` with whatever you’d like to name your token. In this example, we’ll use `CorgiCoin`.

    ![Change token name.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-token-name.webp)
4.  On the same line, replace the second string with whatever you want the symbol of your token to be. In this example, we’ll use `CRG`.

    ![Change token ticket.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-ticker.webp)

That’s all we need to change within this contract. You can see on line 4 that this contract is importing another contract from `@openzeppelin` for us, meaning that we can keep our custom token contract simple.

### Compile

1.  Click the green play symbol at the top of the workspace to compile your contract. You can also press `CMD` + `s` on MacOS or `CTRL` + `s` on Linux and Windows.

    ![Compile the contract.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-play.webp)
2.  Remix automatically fetches the three `import` contracts from the top of our `.sol` contract. You can see these imported contracts under the `.deps` directory. You can browse the contracts there, but Remix will not save any changes you make.

    ![Compile and get the dependencies](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-expand.webp)

### Deploy

Now that we’ve successfully compiled our contract, we need to deploy it somewhere! This is where our previous MetaMask setup comes into play.

1.  Click the **Deploy** tab from the left.

    ![Select the deploy tab.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-compile-button.webp)
2.  Under the **Environment** dropdown, select **Injected Provider - MetaMask**.

    ![Select MetaMask within Remix.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-inject-meta.webp)
3. MetaMask will open a new window confirming that you want to connect your account to Remix.
4.  Click **Next**:

    ![Click next in MetaMask.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-mm-next.webp)
5.  Click **Connect** to connect your `tFIL` account to Remix.

    ![Click Connect in MetaMask.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-mm-connect.webp)
6.  Back in Remix, under the **Account** field, you’ll see that it says something like `0x11F... (5 ether)`. This value is 5 `tFIL`, but Remix doesn’t support the Filecoin network so doesn’t understand what `tFIL` is. This isn’t a problem, it’s just a little quirk of using Remix.

    ![Remix and MetaMask linked.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-accountid.webp)
7.  Under the **Contract** dropdown, ensure the contract you created is selected.

    ![Select contract in Remix.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-deploy-select.webp)

8.  Gather your MetaMask account address and populate the deploy field in Remix.

    ![Copy the address in MetaMask](../../.gitbook/assets/smart-contract-fundamentals-erc-20-quickstart-mm-account.webp)

    ![Populate the deploy address](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-deploy-address.webp)
9.  Click **Deploy**.

    ![Click Deploy in Remix.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-click-deploy.webp)
10. MetaMask will open a window and as you to confirm the transaction. Scroll down and click **Confirm** to have MetaMask deploy the contract.
11. Back in Remix, a message at the bottom of the screen shows that the creation of your token is pending.

    ![Deployment confirmation in Remix.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-confirmation.webp)
12. Wait around 90 seconds for the deployment to complete.

    ![Deployment complete.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-remix-complete.webp)

On the Filecoin network, a new set of blocks, also called a tipset, is created every thirty seconds. When deploying a contract, the transaction needs to be received by the network, and then the network needs to confirm the contract. This process takes around one to two tipsets to process – or around 60 to 90 seconds.

## Use your contract

Now that we’ve compiled and deployed the contract, it’s time to actually interact with it!

### Mint your tokens

Let’s call a method within the deployed contract to mint some tokens.

1.  Back in Remix, open the **Deployed Contracts** dropdown, within the **Deploy** sidebar tab.

    ![Deploy the contracts.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-use-mint.webp)
2.  Expand the `mint` method. You must fill in two fields here: `to` and `amount`.

    ![Open the mint method.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-open-mint.webp)
3.  The `to` field specifies where address you want these initial tokens sent to. Open MetaMask, copy your address, and paste it into this field.

    ![Enter your address.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-enter-address.webp)
4. This field expects an `attoFil` value. 1 `FIL` is equal to 1,000,000,000,000,000,000 `attoFil`. So if you wanted to mint 100 `FIL`, you would enter `100` followed by 18 zeros: `100000000000000000000`.
5.  Click **Transact**.

    ![Click transact.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-transact.webp)
6.  MetaMask will open a window and ask you to confirm the transaction:

    ![Confirm message in MetaMask.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-mm-confirm.webp)

Again, you must wait for the network to process the transaction, which should take about 90 seconds. You can move on to the next section while you’re waiting.

### Add to MetaMask

Currently, MetaMask has no idea what our token is or what it even does. We can fix this by explicitly telling MetaMask the address of our contract.

1. Go back to Remix and open the **Deploy** sidebar tab.
2.  Under **Deployed Contracts**, you should see your contract address at the top. Click the copy icon to copy the address to your clipboard:

    ![Copy your contract address.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-use-mint-copy.webp)
3.  Open MetaMask, select **Assets**, and click **Import your tokens**:

    ![Import your address details.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-use-mint-add-asset.webp)
4.  In the **Token contract address** field, paste the contract address you just copied from Remix and then click **Add custom token**. MetaMask should autofill the rest of the information based on what it can find from the Filecoin network.

    ![Complete your asset details.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-use-mint-import.webp)
5. Click **Import token**:
6.  You should now be able to see that you have 100 of your tokens within your MetaMask wallet!

    ![MetaMask showing a new token.](../../.gitbook/assets/smart-contracts-fundamentals-erc-20-quickstart-use-mint-complete.webp)

### Share your tokens

Having a bunch of tokens in your personal MetaMask is nice, but why not send some tokens to a friend? Your friend needs to create a wallet in MetaMask as we did in the [Create a wallet](erc-20-quickstart.md#create-a-wallet) and [Switch networks](erc-20-quickstart.md#switch-networks) sections. They will also need to import your contract deployment address like you did in the [Add your tokens to MetaMask](../../basics/assets/metamask-setup.md) section. Remember, you need to pay gas for every transaction that you make! If your friend tries to send some of your tokens to someone else but can’t, it might be because they don’t have any `tFil`.
