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

    ![Get started with MetaMask.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/metamask-get-started\_hubd87f51222cef23b4584f06a75381eb8\_130601\_1440x0\_resize\_q75\_h2\_box\_3.webp)
4. Click **Create a new wallet**.
5.  Enter a password to secure your MetaMask wallet. You will need to enter this password every time you use the wallet.

    ![Create a password for your MetaMask wallet.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/metamask-create-password\_hue9c404715b48a6381759eeb79b68ded5\_137274\_1440x0\_resize\_q75\_h2\_box\_3.webp)
6. Follow the prompts until you get to the **Secret Recovery Phrase** window. Read the information about what this _recovery phrase_ is on this page.
7.  Eventually you should get to the _Wallet creation success_ page!

    ![Wallet creation successful!](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/metamask-creation-success\_hu989f3159e1f03457290d4ab6b61ff0e8\_154228\_1440x0\_resize\_q75\_h2\_box\_3.webp)
8.  Once you’ve done that, you should have your account set up!

    ![Default MetaMask page.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/metamask-default-page\_huf0cf1610c1311b796ca76739af126df8\_125149\_1440x0\_resize\_q75\_h2\_box\_3.webp)

### Switch networks

You may notice that we are currently connected to the **Ethereum Mainnet**. We need to point MetaMask to the Filecoin network, specifically the [Calibration testnet](../../networks/calibration/). We’ll use a website called [chainlist.network](https://chainlist.network) to give MetaMask the information it needs quickly.

1. Go to [chainlist.network](https://chainlist.network).
2.  Enable the **Testnets** toggle and enter `Filecoin` into the search bar.

    ![Search for Filecoin testnets in Chainlist.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/chainlist-search-for-filecoin-testnets\_huc27ede2cc3f9bb9a8b1870794192d0bd\_183995\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3. Scroll down to find the **Filecoin – Calibration** **testnet**.
4.  In MetaMask click **Next**.

    ![Click next in MetaMask.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/chainlist-connect-with-metamask\_hue5974ce963f74c507793823e9688818a\_74488\_472x0\_resize\_q75\_h2\_box\_3.webp)
5. Click **Connect.**
6. Click **Approve** when prompted to _Allow this site to add a network._
7. Click **Switch network** when prompted by MetaMask.
8.  Open MetaMask from the browser extensions tab:

    ![Open MetaMask from the browser extensions tab.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/chainlist-open-metamask\_hue2b98da3d87e14ee45292be421d87001\_204364\_1440x0\_resize\_q75\_h2\_box\_3.webp)
9. You should see the _Filecoin Calibration_ testnet listed at the top.

Nice! Now we’ve got the Filecoin Calibration testnet set up within MetaMask. You’ll notice that our MetaMask window shows `0 TFIL`. Test-filecoin (`TFIL`) is `FIL` that has no value in the _real world_, and developers use it for testing. We’ll grab some `TFIL` next.

### Get some funds

1.  In your browser, open MetaMask and copy your address to your clipboard:

    ![Copy your address to your clipboard.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/faucet-get-address\_hu511fb870b227f441051bc067b9f419d0\_204132\_441x0\_resize\_q75\_h2\_box\_3.webp)
2. Go to [faucet.calibration.fildev.network](https://faucet.calibration.fildev.network/) and click **Send Funds.**
3. Paste your address into the address field, and click **Send Funds**.
4. The faucet will show a transaction ID. You can copy this ID into a Calibration testnet [block explorer](../../networks/calibration/explorers.md) to view your transaction. After a couple of minutes, you should see some `tFIL` transferred to your address.

That’s all there is to it! Getting `tFil` is easy!

## Contract creation

The development environment we’re going to be using is called Remix, viewable at [remix.ethereum.org](https://remix.ethereum.org/). Remix is an incredibly sophisticated tool, and there’s a lot you can play around with! In this tutorial however, we’re going to stick to the very basics. If you want to learn more, check out [the Remix documentation](https://remix-ide.readthedocs.io/en/latest/).

### Create a workspace

In Remix, workspaces are where you can create a contract, or group of contracts, for each project. Let’s create a new workspace to create our new ERC-20 token.

1. Open [remix.ethereum.org](https://remix.ethereum.org).
2.  Click the `+` icon next to **Workspaces** to create a new workspace:

    ![Create a new workspace.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/create-a-workspace-add\_hu3544d968bcfb3c9e6b50e74a9c440a60\_252468\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3. In the **Choose a template** dropdown, select **ERC 20**.
4. Select the **Mintable** checkbox.
5. Enter a fun name for your token in the **Workspace name** field. Something like `CorgiCoin` works fine.
6.  Click **OK** to create your new workspace.

    ![Set workspace details.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/create-a-workspace-details\_hube86baae893ca7489237727aa1192243\_224220\_1440x0\_resize\_q75\_h2\_box\_3.webp)

### Customize the contract

The contract template we’re using is pretty simple. We just need to modify a couple of variables.

1.  Under the **contract** directory, click **MyToken.sol**.

    ![Open the MyToken contract.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/customize-open-mytoken-contract\_hud7e61ed658807253f66a5d33b477e01a\_176123\_1440x0\_resize\_q75\_h2\_box\_3.webp)
2.  In the editor panel, replace `MyToken` with whatever you’d like to name your token. In this example, we’ll use `CorgiCoin`.

    ![Change token name.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/customize-change-token-name\_hu2cbf839b1a6648e961f05af53eb7653d\_176671\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3.  On the same line, replace the second string with whatever you want the symbol of your token to be. In this example, we’ll use `CRG`.

    ![Change token ticket.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/customize-change-token-ticker\_huf68f1887fa70b7da410ea4444d02407a\_177337\_1440x0\_resize\_q75\_h2\_box\_3.webp)

That’s all we need to change within this contract. You can see on line 4 that this contract is importing another contract from `@openzeppelin` for us, meaning that we can keep our custom token contract simple.

### Compile

1.  Click the green play symbol at the top of the workspace to compile your contract. You can also press `CMD` + `s` on MacOS or `CTRL` + `s` on Linux and Windows.

    ![Compile the contract.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/compile-compile\_hua008cb1425d8e699523982de82d086e6\_177342\_1440x0\_resize\_q75\_h2\_box\_3.webp)
2.  Remix automatically fetches the two `import` contracts from the top of our `.sol` contract. You can see these imported contracts under the `.deps` directory. You can browse the contracts there, but Remix will not save any changes you make.

    ![Compile and get the dependencies](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/compile-deps\_hu91fca83f29d2c07e42bb219cc12af660\_213060\_1440x0\_resize\_q75\_h2\_box\_3.webp)

### Deploy

Now that we’ve successfully compiled our contract, we need to deploy it somewhere! This is where our previous MetaMask setup comes into play.

1.  Click the **Deploy** tab from the left.

    ![Select the deploy tab.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/deploy-tab\_hud8ad825a3229451eb9f33260cded9c88\_213640\_1440x0\_resize\_q75\_h2\_box\_3.webp)
2.  Under the **Environment** dropdown, select **Injected Provider - MetaMask**.

    ![Select MetaMask within Remix.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/deploy-select-metamask\_hue094c1e03ed9437e22a423a820b20012\_203343\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3. MetaMask will open a new window confirming that you want to connect your account to Remix.
4.  Click **Next**:

    ![Click next in MetaMask.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/deploy-metamask-click-next\_hud1d7264ddc01962bbb056b4040d90271\_74136\_472x0\_resize\_q75\_h2\_box\_3.webp)
5.  Click **Connect** to connect your `tFIL` account to Remix.

    ![Click Connect in MetaMask.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/deploy-metamask-click-connect\_hue0c5471d5ca0a62c4d46fd7bc5d991ec\_77745\_472x0\_resize\_q75\_h2\_box\_3.webp)
6.  Back in Remix, under the **Account** field, you’ll see that it says something like `0x11F... (5 ether)`. This value is 5 `tFIL`, but Remix doesn’t support the Filecoin network so doesn’t understand what `tFIL` is. This isn’t a problem, it’s just a little quirk of using Remix.

    ![Remix and MetaMask linked.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/deploy-remix-metamask-linked\_hu1d1ee55b6ed02255ea72c518c814a29a\_197965\_1440x0\_resize\_q75\_h2\_box\_3.webp)
7.  Under the **Contract** dropdown, ensure the contract you created is selected.

    ![Select contract in Remix.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/deploy-select-contract\_hu5e7dd01aaa120ef2206ebfbec574837a\_198604\_1440x0\_resize\_q75\_h2\_box\_3.webp)
8.  Click **Deploy**.

    ![Click Deploy in Remix.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/deploy-remix-deploy\_hu7d78b47d33a9107814817c1ce5c2db9d\_197089\_1440x0\_resize\_q75\_h2\_box\_3.webp)
9. MetaMask will open a window and as you to confirm the transaction. Scroll down and click **Confirm** to have MetaMask deploy the contract.
10. Back in Remix, a message at the bottom of the screen shows that the creation of your token is pending.

    ![Deployment confirmation in Remix.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/deploy-remix-confirmation\_hu2ce492dd8e8f73d723714a6aeb26c7eb\_196738\_1440x0\_resize\_q75\_h2\_box\_3.webp)
11. Wait around 90 seconds for the deployment to complete.

    ![Deployment complete.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/deploy-complete\_hub7644b2b384e37ee39cd1cf1d0e7c9a8\_202424\_1440x0\_resize\_q75\_h2\_box\_3.webp)

On the Filecoin network, a new set of blocks, also called a tipset, is created every thirty seconds. When deploying a contract, the transaction needs to be received by the network, and then the network needs to confirm the contract. This process takes around one to two tipsets to process – or around 60 to 90 seconds.

## Use your contract

Now that we’ve compiled and deployed the contract, it’s time to actually interact with it!

### Mint your tokens

Let’s call a method within the deployed contract to mint some tokens.

1.  Back in Remix, open the **Deployed Contracts** dropdown, within the **Deploy** sidebar tab.

    ![Deploy the contracts.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/use-mint-select-deployed-contracts\_huc0d6079c3a4c4c93fde007b27e2319d6\_210692\_1440x0\_resize\_q75\_h2\_box\_3.webp)
2.  Expand the `mint` method. You must fill in two fields here: `to` and `amount`.

    ![Open the mint method.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/use-mint-open-mint\_hu835f48577cac4328c6955393ad248405\_203507\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3.  The `to` field specifies where address you want these initial tokens sent to. Open MetaMask, copy your address, and paste it into this field.

    ![Enter your address.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/use-mint-enter-address\_hu9b950178cfa4efdd49257d6b3ad2d5dc\_245526\_1440x0\_resize\_q75\_h2\_box\_3.webp)
4. This field expects an `attoFil` value. 1 `FIL` is equal to 1,000,000,000,000,000,000 `attoFil`. So if you wanted to mint 100 `FIL`, you would enter `100` followed by 18 zeros: `100000000000000000000`.
5.  Click **Transact**.

    ![Click transact.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/use-mint-transact\_hu2b5f6b0ab363a16a4c7172f64481f865\_206043\_1440x0\_resize\_q75\_h2\_box\_3.webp)
6.  MetaMask will open a window and ask you to confirm the transaction:

    ![Confirm message in MetaMask.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/use-mint-metamask-confirm\_hu6eedb17ce45ca43ac3b3704425bea985\_111697\_472x0\_resize\_q75\_h2\_box\_3.webp)

Again, you must wait for the network to process the transaction, which should take about 90 seconds. You can move on to the next section while you’re waiting.

### Add to MetaMask

Currently, MetaMask has no idea what our token is or what it even does. We can fix this by explicitly telling MetaMask the address of our contract.

1. Go back to Remix and open the **Deploy** sidebar tab.
2.  Under **Deployed Contracts**, you should see your contract address at the top. Click the copy icon to copy the address to your clipboard:

    ![Copy your contract address.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/add-copy\_hud51bf04b34178abb42060ceaf8225bc6\_207922\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3.  Open MetaMask, select **Assets**, and click **Import your tokens**:

    ![Import your address details.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/add-assets\_huabd43a42375e7ef0ceb93c97cbc49990\_24935\_396x0\_resize\_q75\_h2\_box\_3.webp)
4.  In the **Token contract address** field, paste the contract address you just copied from Remix and then click **Add custom token**. MetaMask should autofill the rest of the information based on what it can find from the Filecoin network.

    ![Complete your asset details.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/add-import\_hu0bcddb02b98f502a14688f8ea268902a\_25932\_391x0\_resize\_q75\_h2\_box\_3.webp)
5. Click **Import token**:
6.  You should now be able to see that you have 100 of your tokens within your MetaMask wallet!

    ![MetaMask showing a new token.](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/add-complete\_hu7727a8c6e2339e54b232800da45abf9c\_26627\_391x0\_resize\_q75\_h2\_box\_3.webp)

### Share your tokens

Having a bunch of tokens in your personal MetaMask is nice, but why not send some tokens to a friend? Your friend needs to create a wallet in MetaMask as we did in the [Create a wallet](erc-20-quickstart.md#create-a-wallet) and [Switch networks](erc-20-quickstart.md#switch-networks) sections. They will also need to import your contract deployment address like you did in the [Add your tokens to MetaMask](../../basics/assets/metamask-setup.md) section. Remember, you need to pay gas for every transaction that you make! If your friend tries to send some of your tokens to someone else but can’t, it might be because they don’t have any `tFil`.
