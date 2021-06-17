---
title: 'Lotus: switch networks'
description: There may be times, particularly when testing, where you wish to switch to a different Filecoin network or need to reconnect to a testing network after a network reset. This guide will show you how to switch between various Filecoin networks with Lotus.
breadcrumb: Switch networks
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

As we mentioned in the [installation guide](installation.md), Lotus is compiled to operate on a single network, and the information in the configuration folder corresponds to that network. Based on difference needs from development, there are multiple networks for you to build and test on Filecoin.

+ Local devnet - [You can run a local devnet](https://docs.filecoin.io/build/local-devnet/#manual-set-up)
+ Testnets
  + [Calibnet](https://network.filecoin.io/#calibration)
  + [Nerpanet](https://network.filecoin.io/#nerpa)
+ [Mainnet](https://network.filecoin.io/#mainnet)

You can choose one of the following methods to switch to a different network.

## Clean, rebuild, reinstall

The first method is the simplest. In this approach, you remove all the data related to the network you were running on before and launch a Lotus binary built to run on the new one:

1. Shut down the Lotus daemon if it is currently running.
1. Remove the `~/.lotus` folder, or whatever you set `$LOTUS_PATH` to. The default is `~/.lotus`. 
1. Clone the Lotus repository and move into the `lotus` folder:

    ```shell
    git clone https://github.com/filecoin-project/lotus
    cd lotus
    ```

1. Build the `lotus` executable using `make clean ...` to specify which network you want to join:

    | Network | Build command | Description |
    | --- | --- | --- |
    | Mainnet | `make clean all` | The production Filecoin network. FIL has real-world value on this network. |
    | Calibnet | `make clean calibnet` | A test network with a minimum sector size of 32 GiB. FIL has no real-world value on this network. |
    | Nerpanet | `make clean nerpanet` | A test network with a minimum sector size of 512 MiB. FIL has no real-world value on this network. |

1. Start the Lotus daemon again and let it sync to the new network:

    ```shell
    lotus daemon
    ```

:::tip Run on a different `$LOTUS_PATH`
This process deletes everything from the old network, including wallets. If you are on `mainnet` and are switching to `calibnet` but you want to keep all your `mainnet` data intact for when you switch back, change your `$LOTUS_PATH` before running `lotus daemon`:

To change your `$LOTUS_PATH` run: `export LOTUS_PATH=~/.new-lotus-path`.
:::

## Backing up Lotus data

If you wish to backup Lotus data, copy the `~/.lotus` (or `$LOTUS_PATH`) folder somewhere. This will take quite a while if the Lotus node has synced the whole network.

Another alternative is to [export your wallets](send-and-receive-fil.md) and also [export the chain](chain.md) for later re-import on a newly installed Lotus Node.
