---
description: >-
  Test funds are available to developer so that they can test their smart
  contracts and applications within the confines of a test network. This page
  covers how to get test funds.
---

# Get test tokens

## Calibration testnet

MetaMask is one of the easier ways to manage addresses on the Calibration testnet. MetaMask uses the `t4` [address type](../filecoin-evm-runtime/address-types.md), which allows developers to create and manage Solidity contracts easily. Follow the [MetaMask setup guide](../../basics/assets/metamask-setup.md) if you havn’t set up an address in your MetaMask wallet yet.

1. In your browser, open MetaMask and copy your address to your clipboard.
2. Go to [faucet.calibration.fildev.network](https://faucet.calibration.fildev.network/) and click **Faucet** from the menu.
3. Paste your address into the address field, complete the **I am human** CAPTCHA, and then click **Send.**
4. The faucet should give you a link to the transaction.
5. The block explorer will show you the transaction history for your address. After a couple of minutes, you should see 5 `tFIL` transferred to your address.
6. Open MetaMask to confirm that you received the `tFIL`.

That’s all there is to it! Getting `tFil` is easy!

## Local testnet

Before we begin, you must have a local testnet running. Follow the [Run a local network guide](https://docs.filecoin.io/networks/local-testnet/set-up/) if you haven’t got a local testnet set up yet.

1. Change directory to where you created the `lotus` and `lotus-miner` binaries. If you followed the [Run a local network guide](https://docs.filecoin.io/networks/local-testnet/set-up/) these binaries will be in `~/lotus-devnet`:

```
cd ~/lotus-devnet
```

2. View the wallets available on this node with `lotus wallet list`:

```
./lotus wallet list
```

3. Create the send request with `lotus send`, supplying the pre-mined `t3q4o...` address as the `--from` address, the new `t1snl...` address as the receiving address, and the amount of FIL we want to send:

```
./lotus send --from <PRE-MINED ADDRESS> <TO ADDRESS> <VALUE>
```

For example:

```
./lotus send --from t3q4o7gkwe7p7xokhgws4rwntj7yqfhpj5pm6cqc7dycl7cwk4uvgh2odwdvge5re7ne5gcc6xluifss5uu5cq t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq 2000
```

4. Check the balance of your new `t1snl...` address with `lotus wallet balance`:

```shell
./lotus wallet balance <ADDRESS>
```

For example:

```
./lotus wallet balance t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq
```

If you want to manage your local testnet tokens in MetaMask you will need to create a `t4` address. You can create a `t4` address using `lotus wallet new deleated`. Once you have a `t4` address you can [connect MetaMask to your local testnet](https://docs.filecoin.io/basics/assets/metamask-setup/) to see the new balance within the MetaMask extension.
