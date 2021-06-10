---
title: 'Lotus: install and setup'
description: 'This guide covers how to install the Lotus applications and launch a Lotus Node.'
breadcrumb: 'Install and setup'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} This guide covers installing `lotus`, `lotus-miner` and `lotus-worker` to your computer, and then runs through setting up a Lotus node. For information on running the miner, check the [Lotus Miner documentation](/mine/lotus/).

## Running in the cloud

As an alternative to running locally, you can also run Lotus on a cloud provider. The easiest and cheapest path is to use [the one-click application in the DigitalOcean marketplace](https://marketplace.digitalocean.com/apps/filecoin-lotus?refcode=f37c84619fb2). In addition to being a one-click deployment, you will receive a $100 credit with DigitalOcean for using the provided referral link.

Other options, including Amazon Web Services, are covered in [Running in the cloud](running-in-the-cloud.md).

## Minimal requirements

To run a Lotus node, your computer must have:

- macOS or Linux installed. Windows is not yet supported.
- 8-core CPU and 32 GiB RAM. Models with support for _Intel SHA Extensions_ (AMD since Zen microarchitecture, or Intel since Ice Lake) will significantly speed things up.
- Enough space to store the current Lotus chain (preferably on an SSD storage medium). The chain grows at approximately 38 GiB per day. The chain can be also [synced from trusted state snapshots and compacted](chain.md).

:::warning
These are the minimal requirements to run a Lotus node. [Hardware requirements for Miners](../../mine/hardware-requirements.md) are different.
:::

## Linux

The following instructions are specific to Linux installations. Head to the [macOS](#macos) section if you want to install Lotus on a Mac.

Users can install Lotus on Linux using the [Snap package manager](#snap-package-manager), [AppImages](#appimages), or by [building from source](#build-from-source).

:::warning Miners should build from source
Building Lotus from source allows your to strickly configure how Lotus runs, and how it communicates with it's dependencies. Miners looking to improve their system efficency should [install Lotus by building from source](#build-from-source).
:::

### Snap package manager

<div>
<iframe src="https://snapcraft.io/lotus-filecoin/embedded?button=black" frameborder="0" width="100%" height="330px" style="border: 1px solid #CCC; border-radius: 2px;"></iframe>
</div>

```shell
snap install lotus-filecoin
```

You can also install nightly builds by using the `--edge` flag. These builds are created every night from the `master` branch [Lotus GitHub repository](https://github.com/filecoin-project/lotus).

```shell
snap install lotus-filecoin --edge
```

### AppImage

[AppImages](https://appimage.org/) are portable applications that allow developers to package software and dependencies in a single executable. AppImages run on most Linux-based operating systems.

1. Go to the latest [releases page in the Lotus GitHub repository](https://github.com/filecoin-project/lotus/releases/latest).
1. Under **Assets**, download the AppImage.
1. Open a terminal window and move to the location where you downloaded the AppImage to. This is likely your **Downloads** folder:

    ```shell
    cd ~/Downloads
    ```

1. Make the AppImage executable:

    ```shell
    chmod +x lotus_v1.10.0_linux-amd64.appimage
    ```

1. You can now run the AppImage file by double-clicking on it, or opening it from a terminal window:

    ```shell
    ./lotus-v1.10.0_linx-amd64.appimage
    ```

## Build from source

### Software dependencies

You will need the following software installed to install and run Lotus.

#### System-specific

Building Lotus requires some system dependencies, usually provided by your distribution.

Arch:

```bash
sudo pacman -Syu opencl-icd-loader gcc git bzr jq pkg-config opencl-icd-loader opencl-headers opencl-nvidia hwloc 
```

Ubuntu/Debian:

```bash
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
```

Fedora:

```bash
sudo dnf -y install gcc make git bzr jq pkgconfig mesa-libOpenCL mesa-libOpenCL-devel opencl-headers ocl-icd ocl-icd-devel clang llvm wget hwloc libhwloc-dev
```

OpenSUSE:

```bash
sudo zypper in gcc git jq make libOpenCL1 opencl-headers ocl-icd-devel clang llvm hwloc && sudo ln -s /usr/lib64/libOpenCL.so.1 /usr/lib64/libOpenCL.so
```

Amazon Linux 2:

```bash
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm; sudo yum install -y git gcc bzr jq pkgconfig clang llvm mesa-libGL-devel opencl-headers ocl-icd ocl-icd-devel hwloc-devel
```

#### Rustup

Lotus needs [rustup](https://rustup.rs). The easiest way to install it is:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### Go

To build Lotus, you need a working installation of [Go 1.15.5 or higher](https://golang.org/dl/):

```bash
wget -c https://golang.org/dl/go1.16.2.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
```

:::tip
You'll need to add `/usr/local/go/bin` to your path. For most Linux distributions you can run something like:

```shell
echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc && source ~/.bashrc
```

See the [official Golang installation instructions](https://golang.org/doc/install) if you get stuck.
:::

### Build and install Lotus

Once all the dependencies are installed, you can build and install the Lotus suite (`lotus`, `lotus-miner`, and `lotus-worker`).

1. Clone the repository:

   ```sh
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

2. To join mainnet, checkout the [latest release](https://github.com/filecoin-project/lotus/releases).

   If you are changing networks from a previous Lotus installation or there has been a network reset, read the [Switch networks guide](./switch-networks.md) before proceeding.

   For networks other than mainnet, look up the current branch or tag/commit for the network you want to join in the [Filecoin networks dashboard](https://network.filecoin.io), then build Lotus for your specific network below.

   ```sh
   git checkout <tag_or_branch>
   # For example:
   git checkout <vX.X.X> # tag for a release
   ```

   Currently, the latest code on the _master_ branch corresponds to mainnet.

3. If you are in China, see "[Lotus: tips when running in China](tips-running-in-china.md)".
4. Depending on your CPU model, you will want to export additional environment variables:

   If you have **an AMD Zen or Intel Ice Lake CPU (or later)**, enable the use of SHA extensions by adding these two environment variables:

   ```sh
   export RUSTFLAGS="-C target-cpu=native -g"
   export FFI_BUILD_FROM_SOURCE=1
   ```

   See the [Native Filecoin FFI section](#native-filecoin-ffi) for more details about this process.

   Some older Intel and AMD processors without the ADX instruction support may panic with illegal instruction errors. To fix this, add the `CGO_CFLAGS` environment variable:

   ```sh
   export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
   export CGO_CFLAGS="-D__BLST_PORTABLE__"
   ```

   This is due to a Lotus bug that prevents Lotus from running on a processor without `adx` instruction support, and should be fixed soon.

5. Build and install Lotus:

   ```sh
   make clean all

   # Or to join a testnet or devnet:
   make clean calibnet # Calibration with min 32GiB sectors
   make clean nerpanet # Nerpa with min 512MiB sectors

   sudo make install
   ```

   This will put `lotus`, `lotus-miner` and `lotus-worker` in `/usr/local/bin`.

   `lotus` will use the `$HOME/.lotus` folder by default for storage (configuration, chain data, wallets, etc). See [advanced options](configuration-and-advanced-usage.md) for information on how to customize the Lotus folder.

6. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

#### Native Filecoin FFI

Some newer CPU architectures like AMD's Zen and Intel's Ice Lake, have support for SHA extensions. Having these extensions enabled significantly speeds up your Lotus node. To make full use of your processor's capabilities, make sure you set the following variables **before building from source**:

```sh
export RUSTFLAGS="-C target-cpu=native -g"
export FFI_BUILD_FROM_SOURCE=1
```

This method of building does not produce portable binaries. Make sure you run the binary on the same computer as you built it.

### Systemd service files

Lotus provides **generic** Systemd service files. They can be installed with:

```sh
make install-daemon-service
make install-miner-service
```

::: warning
Provided service files should be **inspected and edited** according to user needs as they are very generic and may lack specific environment variabes and settings needed by the users.

One example is that logs are redirected to files in `/var/log/lotus` by default and not visible in `journalctl`.
:::

## macOS

These instructions are specific to macOS. You can install Lotus on MacOS 10.11 (El Capitan, 2015) or higher. If you are installing Lotus on a Linux distribution, head over to the [Linux section](#linux).

:::warning
Due to CPU architecture limitations, M1-based Mac computers cannot run a Lotus full-node. Adding support is on the Lotus road-map. M1-based Mac computers can run a [Lotus lite-node](../../build/lotus/lotus-lite.md).
:::

### XCode Command Line Tools

Lotus requires that X-Code CLI tools be installed before building the Lotus binaries.

1. Check if you already have the XCode Command Line Tools installed via the CLI, run:

   ```sh
   xcode-select -p

   > /Library/Developer/CommandLineTools
   ```

   If this command returns a path, you can move on to the [next step](#install-homebrew). Otherwise, to install via the CLI, run:

   ```sh
   xcode-select --install
   ```

1. To update, run:

   ```sh
   sudo rm -rf /Library/Developer/CommandLineTools
   xcode-select --install

   > Password:
   > xcode-select: note: install requested for command line developer tools
   ```

### Install Homebrew

We recommend that macOS users use [Homebrew](https://brew.sh) to install each of the necessary packages.

1. Use the command `brew install` to install the following packages:

   ```sh
   brew install go bzr jq pkg-config rustup hwloc
   ```

1. Clone the repository:

   ```sh
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. To join mainnet, checkout the [latest release](https://github.com/filecoin-project/lotus/releases).

   If you are changing networks from a previous Lotus installation or there has been a network reset, read the [Switch networks guide](./switch-networks.md) before proceeding.

   For networks other than mainnet, look up the current branch or tag/commit for the network you want to join in the [Filecoin networks dashboard](https://network.filecoin.io), then build Lotus for your specific network below.

   ```shell
   git checkout v1.8.0
   ```

   You can also check out to the `master` branch for the bleeding-edge mainnet release:

   ```shell
   git checkout master
   ```

1. If you are in China, see "[Lotus: tips when running in China](tips-running-in-china.md)".
1. Some older Intel and AMD processors without the ADX instruction support may panic with illegal instruction errors. To fix this, add the `CGO_CFLAGS` environment variable:

   ```sh
   export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
   export CGO_CFLAGS="-D__BLST_PORTABLE__"
   ```

   This is due to a Lotus bug that prevents Lotus from running on a processor without `adx` instruction support, and should be fixed soon.

1. Build Lotus:

   ```sh
   make clean && make all # mainnet

   # Or to join a testnet or devnet:
   make clean && make calibnet # Calibration with min 32 GiB sectors
   make clean && make nerpanet # Nerpa with min 512 MiB sectors

   sudo make install
   ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

## Start the Lotus daemon and sync the chain

The `lotus` application runs as a daemon and a client to control and interact with that daemon. A daemon is a long-running program that is usually run in the background.

When using _mainnet_, we recommend you start the daemon [syncing from a trusted state snapshot](chain.md#lightweight-snapshot). In any case, you can start the deamon with the following command:

```sh
lotus daemon
```

During the first run, Lotus will:

- Set up its data folder at `~/.lotus`.
- Download the necessary proof parameters. This is a few gigabytes of data that is downloaded once.
- Import the snapshot (if specified) and start syncing the Lotus chain.

The daemon will start producing lots of log messages right away. From this point, you will have to work on a new terminal and `lotus` commands will communicate with the running daemon.

:::tip
Do not be concerned by the number of warnings and sometimes errors showing in the logs. They are a normal part of the daemon lifecycle as it participates in the global distributed consensus network.
:::

If you used snapshots, subsequent daemon starts can proceed as normal without any options:

```sh
lotus daemon
## When running with systemd do:
# systemctl start lotus-daemon
```

For more information about syncing and snapshots, [see the Chain management section](./chain.md).

We recommend waiting until the syncing process has completed, which should be relatively fast when using trusted state snapshot imports:

```sh
lotus sync wait
```

## Interact with the daemon

The `lotus` command allows you to interact with a _running_ Lotus daemon. The `lotus-miner` and `lotus-worker` commands work in the same way.

Lotus comes with built-in CLI documentation:

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

## Stop the Lotus daemon

To gracefully stop the running lotus daemon (required when restarting the daemon to update Lotus), use the following command:

```sh
lotus daemon stop
## When running with systemd do:
# systemctl stop lotus-daemon
```
