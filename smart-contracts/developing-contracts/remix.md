---
description: >-
  The Filecoin EVM runtime allows developers to use Ethereum tooling, like
  Remix, with the Filecoin network.
---

# Remix

## Launch an ERC-20 token

As a simple introduction, we’re going to use Remix to create an ERC-20 token on the Filecoin network. In this guide, we’re using the Calibration testnet, but this process is the same for mainnet.

This guide assumes you’ve already connected your [MetaMask extension to a Filecoin network](../../basics/assets/metamask-setup.md).

### Create a workspace

In Remix, workspaces are where you can create a contract, or group of contracts, for each project. Let’s create a new workspace to create our new ERC-20 token.

1. Open [remix.ethereum.org](https://remix.ethereum.org).
2.  Click the `+` icon next to **Workspaces** to create a new workspace:

    ![Create a new workspace.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/create-a-workspace-add\_hu3544d968bcfb3c9e6b50e74a9c440a60\_252468\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3. In the **Choose a template** dropdown, select **ERC 20**.
4. Select the **Mintable** checkbox.
5. Enter a fun name for your token in the **Workspace name** field. Something like `CorgiCoin` works fine.
6.  Click **OK** to create your new workspace.

    ![Set workspace details.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/create-a-workspace-details\_hube86baae893ca7489237727aa1192243\_224220\_1440x0\_resize\_q75\_h2\_box\_3.webp)

### Customize the contract

The contract template we’re using is pretty simple. We just need to modify a couple of variables.

1.  Under the **contract** directory, click **MyToken.sol**.

    ![Open the MyToken contract.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/customize-open-mytoken-contract\_hud7e61ed658807253f66a5d33b477e01a\_176123\_1440x0\_resize\_q75\_h2\_box\_3.webp)
2.  In the editor panel, replace `MyToken` with whatever you’d like to name your token. In this example, we’ll use `CorgiCoin`.

    ![Change token name.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/customize-change-token-name\_hu2cbf839b1a6648e961f05af53eb7653d\_176671\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3.  On the same line, replace the second string with whatever you want the symbol of your token to be. In this example, we’ll use `CRG`.

    ![Change token ticket.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/customize-change-token-ticker\_huf68f1887fa70b7da410ea4444d02407a\_177337\_1440x0\_resize\_q75\_h2\_box\_3.webp)

That’s all we need to change within this contract. You can see on line 4 that this contract is importing another contract from `@openzeppelin` for us, meaning that we can keep our custom token contract simple.

### Compile

1.  Click the green play symbol at the top of the workspace to compile your contract. You can also press `CMD` + `s` on MacOS or `CTRL` + `s` on Linux and Windows.

    ![Compile the contract.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/compile-compile\_hua008cb1425d8e699523982de82d086e6\_177342\_1440x0\_resize\_q75\_h2\_box\_3.webp)
2.  Remix automatically fetches the two `import` contracts from the top of our `.sol` contract. You can see these imported contracts under the `.deps` directory. You can browse the contracts there, but Remix will not save any changes you make.

    ![Compile and get the dependencies](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/compile-deps\_hu91fca83f29d2c07e42bb219cc12af660\_213060\_1440x0\_resize\_q75\_h2\_box\_3.webp)

### Deploy

Now that we’ve successfully compiled our contract, we need to deploy it somewhere! This is where our previous MetaMask setup comes into play.

1.  Click the **Deploy** tab from the left.

    ![Select the deploy tab.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/deploy-tab\_hud8ad825a3229451eb9f33260cded9c88\_213640\_1440x0\_resize\_q75\_h2\_box\_3.webp)
2.  Under the **Environment** dropdown, select **Injected Provider - MetaMask**.

    ![Select MetaMask within Remix.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/deploy-select-metamask\_hue094c1e03ed9437e22a423a820b20012\_203343\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3. MetaMask will open a new window confirming that you want to connect your account to Remix.
4.  Click **Next**:

    ![Click next in MetaMask.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/deploy-metamask-click-next\_hud1d7264ddc01962bbb056b4040d90271\_74136\_472x0\_resize\_q75\_h2\_box\_3.webp)
5.  Click **Connect** to connect your `tFIL` account to Remix.

    ![Click Connect in MetaMask.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/deploy-metamask-click-connect\_hue0c5471d5ca0a62c4d46fd7bc5d991ec\_77745\_472x0\_resize\_q75\_h2\_box\_3.webp)
6.  Back in Remix, under the **Account** field, you’ll see that it says something like `0x11F... (5 ether)`. This value is 5 `tFIL`, but Remix doesn’t support the Filecoin network, so it doesn’t understand what `tFIL` is. This isn’t a problem; it’s just a little quirk of using Remix.

    ![Remix and MetaMask linked.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/deploy-remix-metamask-linked\_hu1d1ee55b6ed02255ea72c518c814a29a\_197965\_1440x0\_resize\_q75\_h2\_box\_3.webp)
7.  Under the **Contract** dropdown, ensure the contract you created is selected.

    ![Select contract in Remix.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/deploy-select-contract\_hu5e7dd01aaa120ef2206ebfbec574837a\_198604\_1440x0\_resize\_q75\_h2\_box\_3.webp)
8.  Click **Deploy**.

    ![Click Deploy in Remix.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/deploy-remix-deploy\_hu7d78b47d33a9107814817c1ce5c2db9d\_197089\_1440x0\_resize\_q75\_h2\_box\_3.webp)
9.  MetaMask will open a window and as you to confirm the transaction. Scroll down and click **Confirm** to have MetaMask deploy the contract. If you’re deploying to mainnet, we advise you to [adjust your gas fees](remix.md#adjusting-your-gas-fees) for a cheaper deployment.

    ![Remix and MetaMask deploying a contract.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/deploy-metamask-confirm\_hu8f8bebb32e8c0ba30dbbff4c277be15a\_100144\_472x0\_resize\_q75\_h2\_box\_3.webp)
10. Back in Remix, a message at the bottom of the screen shows that the creation of your token is pending.

    ![Deployment confirmation in Remix.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/deploy-remix-confirmation\_hu2ce492dd8e8f73d723714a6aeb26c7eb\_196738\_1440x0\_resize\_q75\_h2\_box\_3.webp)
11. Wait around 90 seconds for the deployment to complete.

    ![Deployment complete.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/deploy-complete\_hub7644b2b384e37ee39cd1cf1d0e7c9a8\_202424\_1440x0\_resize\_q75\_h2\_box\_3.webp)

On the Filecoin network, a new set of blocks, also called a tipset, is created every thirty seconds. When deploying a contract, the transaction needs to be received by the network, and then the network needs to confirm the contract. This process takes around one to two tipsets to process – or around 60 to 90 seconds.

## Use your contract

Now that we’ve compiled and deployed the contract, it’s time to actually interact with it!

### Mint your tokens

Let’s call a method within the deployed contract to mint some tokens.

1.  Back in Remix, open the **Deployed Contracts** dropdown, within the **Deploy** sidebar tab.

    ![Open the deployed contracts dropdown.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/use-mint-select-deployed-contracts\_huc0d6079c3a4c4c93fde007b27e2319d6\_210692\_1440x0\_resize\_q75\_h2\_box\_3.webp)
2.  Expand the `mint` method. You must fill in two fields here: `to` and `amount`.

    ![Open the mint method.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/use-mint-open-mint\_hu835f48577cac4328c6955393ad248405\_203507\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3.  The `to` field specifies where address you want these initial tokens sent. Open MetaMask, copy your address, and paste it into this field.

    ![Enter your address.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/use-mint-enter-address\_hu9b950178cfa4efdd49257d6b3ad2d5dc\_245526\_1440x0\_resize\_q75\_h2\_box\_3.webp)
4. This field expects an `attoFil` value. 1 `FIL` is equal to 1,000,000,000,000,000,000 `attoFil`. So if you wanted to mint 100 `FIL`, you would enter `100` followed by 18 zeros: `100000000000000000000`.
5.  Click **Transact**.

    ![Click transact.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/use-mint-transact\_hu2b5f6b0ab363a16a4c7172f64481f865\_206043\_1440x0\_resize\_q75\_h2\_box\_3.webp)
6.  MetaMask will open a window and ask you to confirm the transaction:

    ![Confirm message in MetaMask.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/use-mint-metamask-confirm\_hu6eedb17ce45ca43ac3b3704425bea985\_111697\_472x0\_resize\_q75\_h2\_box\_3.webp)

Again, you must wait for the network to process the transaction, which should take about 90 seconds. You can move on to the next section while you’re waiting.

### Add to MetaMask

Currently, MetaMask has no idea what our token is or what it even does. We can fix this by explicitly telling MetaMask the address of our contract.

1. Go back to Remix and open the **Deploy** sidebar tab.
2.  Under **Deployed Contracts**, you should see your contract address at the top. Click the copy icon to copy the address to your clipboard:

    ![Copy your contract address.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/add-copy\_hud51bf04b34178abb42060ceaf8225bc6\_207922\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3.  Open MetaMask, select **Assets**, and click **Import your tokens**:

    ![Import your address details.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/add-assets\_huabd43a42375e7ef0ceb93c97cbc49990\_24935\_396x0\_resize\_q75\_h2\_box\_3.webp)
4.  In the **Token contract address** field, paste the contract address you just copied from Remix and then click **Add custom token**. MetaMask should autofill the rest of the information based on what it can find from the Filecoin network.

    ![Complete your asset details.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/add-import\_hu0bcddb02b98f502a14688f8ea268902a\_25932\_391x0\_resize\_q75\_h2\_box\_3.webp)
5. Click **Import token**:
6.  You should now be able to see that you have 100 of your tokens within your MetaMask wallet!

    ![MetaMask showing a new token.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/add-complete\_hu7727a8c6e2339e54b232800da45abf9c\_26627\_391x0\_resize\_q75\_h2\_box\_3.webp)

And that’s it! Deploying an ERC-20 token on Filecoin is simple!

### Adjusting your gas fees

Remix uses a default of 2.5 nanoFIL per gas as a priority fee, which is usually too high for the Filecoin network. If you don’t adjust this, you may end up overpaying when deploying to mainnet. We recommend that you switch from the site-suggested gas fees to oracle-supplied gas fees when deploying your contract.

1.  When the deployment transaction confirmation pop-up window shows up, click on **Site suggested**.

    ![MetaMask showing a deployment transaction confirmation window, with the gas configuration option highlighted.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/gas-prompt\_hu6953c5772e8dfeacdd95653787b0d0b4\_54409\_944x0\_resize\_q75\_h2\_box\_3.webp)
2.  Switch to **Market**, **Aggressive**, or **Low**. The **Market** option is generally suitable for most situations.

    ![MetaMash showing the gas fee editor.](https://docs.filecoin.io/smart-contracts/developing-contracts/remix/gas-fee-editor\_hu15488a7c23aa2387332d1bbc60c104e0\_56644\_944x0\_resize\_q75\_h2\_box\_3.webp)
