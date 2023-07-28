---
description: >-
  Test funds are available to developer so that they can test their smart
  contracts and applications within the confines of a test network. This page
  covers how to get test funds.
---

# Get test tokens

## Calibration testnet

MetaMask is one of the easier ways to manage addresses on the Calibration testnet. MetaMask uses the `t4` [address type](../filecoin-evm-runtime/address-types.md), which allows developers to create and manage Solidity contracts easily. Follow the [MetaMask setup guide](../../basics/assets/metamask-setup.md) if you havn’t set up an address in your MetaMask wallet yet. w

1.  In your browser, open MetaMask and copy your address to your clipboard:

    ![Copy your address to your clipboard.](https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens/faucet-get-address\_hu511fb870b227f441051bc067b9f419d0\_204132\_441x0\_resize\_q75\_h2\_box\_3.webp)
2.  Go to [faucet.calibration.fildev.network](https://faucet.calibration.fildev.network/) and click **Faucet** from the menu.

    ![Go to the Faucet section of the website.](https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens/faucet-click-faucet\_hucd411a0ea04eb18d1b1a0bd763aca72c\_1572753\_1440x0\_resize\_q75\_h2\_box\_3.webp)
3.  Paste your address into the address field, complete the **I am human** CAPTCHA, and then click **Send**:

    ![](https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens/faucet-verify\_huf20c2a4bf454bdefc9cb52bafd199d7f\_1516790\_1440x0\_resize\_q75\_h2\_box\_3.webp)
4.  The faucet should give you a link to the transaction:

    ![Click on the message link.](https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens/faucet-get-message-link\_hu1d32f6e01b5d8981fc5506fca28ac2cc\_1527414\_1440x0\_resize\_q75\_h2\_box\_3.webp)
5.  The block explorer will show you the transaction history for your address. After a couple of minutes, you should see 5 `tFIL` transferred to your address.

    ![Show the message confirmation in a block explorer.](https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens/faucet-show-message-confirmation\_hu8feed5339173096a46c1b426854a47c1\_156184\_1440x0\_resize\_q75\_h2\_box\_3.webp)
6.  Open MetaMask to confirm that you received the `tFIL`:

    ![MetaMask showing a balance of FIL.](https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens/faucet-metamask-with-balance\_hu243fdbf61ffe9fb951abf6d2da3277e9\_17000\_382x0\_resize\_q75\_h2\_box\_3.webp)

That’s all there is to it! Getting `tFil` is easy!

## Local testnet

Before we begin, you must have a local testnet running. Follow the [Run a local network guide](https://docs.filecoin.io/networks/local-testnet/set-up/) if you haven’t got a local testnet set up yet.

1.  Change directory to where you created the `lotus` and `lotus-miner` binaries. If you followed the [Run a local network guide](https://docs.filecoin.io/networks/local-testnet/set-up/) these binaries will be in `~/lotus-devnet`:

    ```
    ```

* ```shell
  cd ~/lotus-devnet
  ```
*   View the wallets available on this node with `lotus wallet list`:

    ```
    ```
*   ```shell
    ./lotus wallet list
    ```

    ```plaintext
    Address                                                                                 Balance                          Nonce  Default
    t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq                                               0 FIL                            0
    t3q4o7gkwe7p7xokhgws4rwntj7yqfhpj5pm6cqc7dycl7cwk4uvgh2odwdvge5re7ne5gcc6xluifss5uu5cq  49999999.999763880085417692 FIL  2      X
    ```
*   Create the send request with `lotus send`, supplying the pre-mined `t3q4o...` address as the `--from` address, the new `t1snl...` address as the receiving address, and the amount of FIL we want to send:

    ```
    ```

```shell
./lotus send --from <PRE-MINED ADDRESS> <TO ADDRESS> <VALUE>
```

For example:

```
```

*   ```shell
    ./lotus send --from t3q4o7gkwe7p7xokhgws4rwntj7yqfhpj5pm6cqc7dycl7cwk4uvgh2odwdvge5re7ne5gcc6xluifss5uu5cq t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq 2000
    ```

    ```plaintext
    bafy2bzaceaqzbgiazwvtpago6wpkxl42puxfkvwv5cwjpime2irqatamji2bq
    ```
*   Check the balance of your new `t1snl...` address with `lotus wallet balance`:

    ```
    ```

```shell
./lotus wallet balance <ADDRESS>
```

For example:

```
```

1.  ```shell
    ./lotus wallet balance t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq
    ```

    ```plaintext
    2000 FIL
    ```

If you want to manage your local testnet tokens in MetaMask you will need to create a `t4` address. You can create a `t4` address using `lotus wallet new deleated`. Once you have a `t4` address you can [connect MetaMask to your local testnet](https://docs.filecoin.io/basics/assets/metamask-setup/) to see the new balance within the MetaMask extension.
