---
title: 'Lotus: installation'
description: 'This guide covers how to install the Lotus applications and launch a Lotus Node.'
breadcrumb: 'Installation'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}. Sucessfully completing the instructions below will install all `lotus`, `lotus-miner` and `lotus-worker` in your system. However, after that guide focuses in running `lotus`. For information on running the miner, check the [Lotus Miner documentation](../../mine/lotus/README.md).

[[TOC]]

## Minimal requirements

:::warning
These are the minimal requirements for a Lotus Node. [Hardware requirements for Miners](../../mine/hardware-requirements.md) are different.
:::

- Lotus only runs on **Linux** and **MacOS** systems.
- Minimal hardware requirements:
  - 4-core CPU. A CPU model with support for _Intel SHA Extensions_ (AMD since Zen microarchitecture, or Intel since Ice Lake) will speed things up significantly.
  - 8 GiB RAM
  - Enough space to store the Lotus chain (preferably on an SSD storage medium). The chain grows at approximately 12 GiB per week.

## Linux

### Dependencies

#### System dependencies

First of all, building Lotus will require installing some system dependencies, usually provided by your distribution (all below running in recent versions).

For Arch Linux:

```sh
sudo pacman -Syu opencl-icd-loader gcc git bzr jq pkg-config opencl-icd-loader opencl-headers
```

For Ubuntu (and probably any Debian-flavoured system):

```sh
sudo apt update
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl
sudo apt upgrade
```

For Fedora:

```sh
sudo dnf -y update
sudo dnf -y install gcc git bzr jq pkgconfig mesa-libOpenCL mesa-libOpenCL-devel opencl-headers ocl-icd ocl-icd-devel clang llvm
```

For OpenSUSE:

```sh
sudo zypper in gcc git jq make libOpenCL1 opencl-headers ocl-icd-devel clang llvm
sudo ln -s /usr/lib64/libOpenCL.so.1 /usr/lib64/libOpenCL.so
```

#### Rustup

Lotus needs [rustup](https://rustup.rs/). The offical installation as last time this guide was updated amounted to:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

:::tip
Make sure your `$PATH` variable is correctly configured after the rustup installation so that `cargo` and `rustc` are found in their rustup-configured locations.
:::

#### Go

To build lotus you will need a working installation of **[Go >= 1.14](https://golang.org/dl/)**. Follow the [installation instructions](https://golang.org/doc/install), which generally amount to:

```sh
# Example! Check the installation instructions.
wget -c https://dl.google.com/go/go1.14.7.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
```

:::tip
Feel free to replace the version if newer versions of Go have come out.
:::

### Build and install Lotus

With all the above, you are ready to build and install the Lotus suite (`lotus`, `lotus-miner` and `lotus-worker`):

```sh
git clone https://github.com/filecoin-project/lotus.git
cd lotus/
```

::: warning
At this point, you can checkout the branch corresponding to the [network you want to join](switch-networks.md#rebuild-and-install-lotus-on-the-right-branch). Lookup the right branch or tag for network in the [networks dashboard](https://networks.filecoin.io) and do:

```sh
git checkout <branch_or_tag>
```

Currently the _master_ branch corresponds to **testnet**.
:::

::: tip
If you are in China, check out the specific [tips](tips-running-in-china.md). They will save you hours.
:::

To build Lotus do:

```sh
make clean all
sudo make install
```

This will put `lotus`, `lotus-miner` and `lotus-worker` in `/usr/local/bin`.

`lotus` will use the `$HOME/.lotus` folder by default for storage (configuration, chain data, wallets...). See [advanced options](configuration-and-advanced-usage.md) for information on how to customize the Lotus folder.

#### Native Filecoin FFI

Some newer processors (AMD Zen (and later), Intel Ice Lake) have support SHA extensions. To make full use of your processor's capabilities, make sure you set the following variables BEFORE building from source (as described above):

```sh
export RUSTFLAGS="-C target-cpu=native -g"
export FFI_BUILD_FROM_SOURCE=1
```

::: warning
This method of building does not produce portable binaries! Make sure you run the binary in the same machine as you built it.
:::

### Systemd service files

Lotus provides Systemd service files. They can be installed with:

```sh
make install-daemon-service
make install-miner-service
```

After that, you should be able to control Lotus using `systemctl [start|stop] lotus-daemon`.

::: tip
By default, the `lotus-daemon` service file redirects the logging output to `/var/log/lotus/daemon.log`, so `journalctl` displays nothing.
:::

## MacOS

### Install XCode Command Line Tools

To check if you already have the XCode Command Line Tools installed via the CLI, run:

```sh
xcode-select -p
```

If this command returns a path, you can move on to the next step. Otherwise, to install via the CLI, run:

```sh
xcode-select --install
```

To update, run:

```sh
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
```

### Install HomeBrew

We recommend that MacOS users use [HomeBrew](https://brew.sh) to install each the necessary packages.

Check if you have HomeBrew:

```sh
brew -v
```

This command returns a version number if you have HomeBrew installed and nothing otherwise.

In your terminal, enter this command to install Homebrew:

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Use the command `brew install` to install the following packages:

```sh
brew install go bzr jq pkg-config rustup
```

Clone:

```sh
git clone https://github.com/filecoin-project/lotus.git
cd lotus/
```

::: warning
At this point, you can checkout the branch corresponding to the [network you want to join](switch-networks.md#rebuild-and-install-lotus-on-the-right-branch). Lookup the right branch or tag for network in the [networks dashboard](https://networks.filecoin.io) and do:

```sh
git checkout <branch_or_tag>
```

Currently the _master_ branch corresponds to **testnet**.
:::

Build:

```sh
make clean && make all
sudo make install
```

## Start the Lotus daemon

Your Lotus binaries (particularly `lotus`) have been installed and be ready to be launched.

The `lotus` application both runs as a daemon (a long-running program, usually run in the background) and as a client to control and interact with that daemon. To start the Lotus daemon run:

```sh
lotus daemon
## When running with systemd do:
# systemctl start lotus-daemon
```

During the first start Lotus will:

- Setup its data folder at `~/.lotus`
- Download the necessary proof parameters (a few gigabytes of data that needs to be fetched only once)
- Start syncing the Lotus chain

The daemon will start producing a lot of log messages right away.

:::tip
Do not be appalled by the amount of warnings and sometimes errors showing in the logs, there are usually part of the usual functioning of the daemon as part of a distributed network.
:::

## Chain sync

As in many other blockchains, the Lotus Node will need to sync to the _tip_ of the chain after learning about this. We call this process _chain sync_. First the headers for every block will be synced from tip to bottom, afterwards blocks will be fetched and verified (slow!) from bottom to top. To inspect the current sync status run:

```sh
lotus sync status
```

You can also interactively wait for the chain to be fully synced:

```
lotus sync wait
```

:::tip
Syncing the Filecoin chain is a VERY slow process and the chain grows at a very fast pace. A network 100 days old will take about 25 days to sync from scratch.

As a temporal workaround (until the syncing mechanism is improved), we are offering chain state snapshots that can be downloaded and used to initialize the daemon.

You can [download the latest state snapshot here](https://very-temporary-spacerace-chain-snapshot.s3-us-west-2.amazonaws.com/Spacerace_stateroots_snapshot_latest.car)

Then start your lotus daemon with:

```sh
lotus daemon --import-snapshot <snapshot>.car
```

For more information about chain snapshots, read [this](chain-snapshots.md).
:::

## Interact with the daemon

As shown in a few examples above, the `lotus` command allows to interact with the running daemon and it will be used profusely through the documentation (`lotus-miner` and `lotus-worker` are the same).

This _command-line-interface (CLI)_ is self-documenting:

```sh
# Show general help
lotus --help
# Show specific help for the "client" subcommand
lotus client --help
```

For example, after your Lotus daemon has been running for a few minutes, use `lotus` to check the number of other peers that it is connected to in the Filecoin network:

```sh
lotus net peers
```
