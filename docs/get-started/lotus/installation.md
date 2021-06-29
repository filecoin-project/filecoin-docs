---
title: 'Lotus: install and setup'
description: 'This guide covers how to install the Lotus applications and launch a Lotus Node.'
breadcrumb: 'Install and setup'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} This guide covers installing `lotus`, `lotus-miner`, and `lotus-worker` to your computer, and then runs through setting up a Lotus node. For information on running the miner, check the [Lotus Miner documentation](/mine/lotus/).

## Running in the cloud

As an alternative to running locally, you can also run Lotus on a cloud provider. The easiest and cheapest path is to use [the one-click application in the DigitalOcean marketplace](https://marketplace.digitalocean.com/apps/filecoin-lotus?refcode=f37c84619fb2). In addition to being a one-click deployment, you will receive a $100 credit with DigitalOcean for using the provided referral link.

Other options, including Amazon Web Services, are covered in [Running in the cloud](running-in-the-cloud.md).

## Minimal requirements

To run a Lotus node your computer must have:

- macOS or Linux installed. Windows is not yet supported.
- 8-core CPU and 32 GiB RAM. Models with support for _Intel SHA Extensions_ (AMD since Zen microarchitecture or Intel since Ice Lake) will significantly speed things up.
- Enough space to store the current Lotus chain (preferably on an SSD storage medium). The chain grows at approximately 38 GiB per day. The chain can be [synced from trusted state snapshots and compacted or pruned](chain.md) to a minimum size of around 33Gib.  The full history was around 10TiB in June of 2021.

:::warning
These are the minimal requirements to run a Lotus node. [Hardware requirements for Miners](../../mine/hardware-requirements.md) are different.
:::

## Linux

The following instructions are specific to Linux installations. Head to the [macOS](#macos) section if you want to install Lotus on a Mac.

There are several ways to install Lotus on Linux:

+ [Snap package manager](#snap-package-manager)
+ [AppImages](#appimage)
+ [Building from source](#building-from-source).

:::warning Miners should build from source
Building Lotus from source allows you to strictly configure how Lotus runs and how it communicates with its dependencies. Miners looking to improve their system efficiency should [install Lotus by building from source](#building-from-source).
:::

### Snap package manager

To install Lotus using Snap, run:

```shell
snap install lotus-filecoin
```

You can also install nightly builds by using the `--edge` flag. These builds are created every night from the `master` branch [Lotus GitHub repository](https://github.com/filecoin-project/lotus).

```shell
snap install lotus-filecoin --edge
```

You can find out more about this Snap [over at Snapcraft.io](https://snapcraft.io/lotus-filecoin).

### AppImage

[AppImages](https://appimage.org/) are portable applications that allow developers to package software and dependencies in a single executable. AppImages run on most Linux-based operating systems.

1. Go to the latest [releases page in the Lotus GitHub repository](https://github.com/filecoin-project/lotus/releases/latest).
1. Under **Assets**, download the AppImage.
1. Open a terminal window and move to the location where you downloaded the AppImage. This location is likely your **Downloads** folder:

    ```shell
    cd ~/Downloads
    ```

1. Make the AppImage executable:

    ```shell
    chmod +x lotus_v1.10.0_linux-amd64.appimage
    ```

1. You can now run the AppImage file by double-clicking on it or opening it from a terminal window:

    ```shell
    ./lotus-v1.10.0_linx-amd64.appimage
    ```

### Building from source

You can build the Lotus executables from source by following these steps.

#### Software dependencies

You will need the following software installed to install and run Lotus.

#### System-specific

Building Lotus requires some system dependencies, usually provided by your distribution.

Arch:

```shell
sudo pacman -Syu opencl-icd-loader gcc git bzr jq pkg-config opencl-icd-loader opencl-headers opencl-nvidia hwloc 
```

Ubuntu/Debian:

```shell
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
```

Fedora:

```shell
sudo dnf -y install gcc make git bzr jq pkgconfig mesa-libOpenCL mesa-libOpenCL-devel opencl-headers ocl-icd ocl-icd-devel clang llvm wget hwloc libhwloc-dev
```

OpenSUSE:

```shell
sudo zypper in gcc git jq make libOpenCL1 opencl-headers ocl-icd-devel clang llvm hwloc && sudo ln -s /usr/lib64/libOpenCL.so.1 /usr/lib64/libOpenCL.so
```

Amazon Linux 2:

```shell
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm; sudo yum install -y git gcc bzr jq pkgconfig clang llvm mesa-libGL-devel opencl-headers ocl-icd ocl-icd-devel hwloc-devel
```

#### Rustup

Lotus needs [rustup](https://rustup.rs). The easiest way to install it is:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### Go

To build Lotus, you need a working installation of [Go 1.16.4 or higher](https://golang.org/dl/):

```shell
wget -c https://golang.org/dl/go1.16.4.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
```

:::tip
You'll need to add `/usr/local/go/bin` to your path. For most Linux distributions you can run something like:

```shell
echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc && source ~/.bashrc
```

See the [official Golang installation instructions](https://golang.org/doc/install) if you get stuck.
:::

#### Build and install Lotus

Once all the dependencies are installed, you can build and install Lotus. 

1. Clone the repository:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Checkout the release for the network you wish to use.

   To join mainnet, checkout the [latest release](https://github.com/filecoin-project/lotus/releases).

   If you are changing networks from a previous Lotus installation or there has been a network reset, read the [Switch networks guide](./switch-networks.md) before proceeding.

   For networks other than mainnet, look up the current branch or tag/commit for the network you want to join in the [Filecoin networks dashboard](https://network.filecoin.io), then build Lotus for your specific network below.

   ```sh
   git checkout <tag_or_branch>
   # For example:
   git checkout <vX.X.X> # tag for a release
   ```

   Currently, the latest code on the _master_ branch corresponds to the mainnet.

1. If you are in China, see "[Lotus: tips when running in China](tips-running-in-china.md)".

1. Depending on your CPU model, you will want to export additional environment variables:

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

   This is due to a Lotus bug that prevents Lotus from running on a processor without `adx` instruction support and should be fixed soon.

1. Build and install Lotus

   Lotus is compiled to operate on a single network,  run one of the following commands to build the lotus node for the specific lotus network.

   ```sh
   # join mainnet 
   make clean all 
   
   # Or to join a testnet or devnet:
   make clean calibnet # Calibration with min 32GiB sectors
   make clean nerpanet # Nerpa with min 512MiB sectors
   
   sudo make install
   ```

   This will put `lotus`, `lotus-miner` and `lotus-worker` in `/usr/local/bin`.

   `lotus` will use the `$HOME/.lotus` folder by default for storage (configuration, chain data, wallets). See [advanced options](configuration-and-advanced-usage.md) for information on how to customize the Lotus folder.

   Once the installation is finished, use the command down below to ensure lotus is installed successfully for the right network. 

   ```sh
   lotus --version
   > lotus version 1.9.0+calibnet+git.ada7f97ba
   ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

#### Native Filecoin FFI

Some newer CPU architectures like AMD's Zen and Intel's Ice Lake have support for SHA extensions. Having these extensions enabled significantly speeds up your Lotus node. To make full use of your processor's capabilities, make sure you set the following variables **before building from source**:

```sh
export RUSTFLAGS="-C target-cpu=native -g"
export FFI_BUILD_FROM_SOURCE=1
```

This method of building does not produce portable binaries. Make sure you run the binary on the same computer as you built it.

#### Systemd service files

Lotus provides **generic** Systemd service files. They can be installed with:

```sh
make install-daemon-service
make install-miner-service
```

::: warning
Provided service files should be **inspected and edited** according to user needs as they are very generic and may lack specific environment variables and settings needed by the users.

One example is that logs are redirected to files in `/var/log/lotus` by default and not visible in `journalctl`.
:::

## MacOS

These instructions are specific to macOS. You can install Lotus on macOS 10.11 El Capitan or higher. If you are installing Lotus on a Linux distribution, head over to the [Linux section](#linux).

There are several ways to install Lotus on macOS:

- [Install with Homebrew](#install-with-homebrew).
- [Build from source](#build-from-source).

:::warning Miners should build from source
Building Lotus from source allows you to strictly configure how Lotus runs and how it communicates with its dependencies. Miners looking to improve their system efficiency should [install Lotus by building from source](#build-from-source).
:::

### Install with Homebrew

You can quickly install Lotus using Homebrew on macOS. 

1. Add the `filecoin-project/lotus` tap:

   ```shell
   brew tap filecoin-project/lotus
   ```

1. Install Lotus:

    ```shell
    brew install lotus
    ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

### Build from source

You can build the Lotus executables from source by following these steps.

#### Software dependencies

You must have XCode and Homebrew installed to build Lotus from source.

##### XCode Command Line Tools

Lotus requires that X-Code CLI tools be installed before building the Lotus binaries.

1. Check if you already have the XCode Command Line Tools installed via the CLI, run:

    ```shell
    xcode-select -p

    > /Library/Developer/CommandLineTools
    ```

    If this command returns a path, then you have Xcode already installed! You can [move on to installing dependencies with Homebrew](#homebrew). 

   :::warning
   If the above command doesn't return a path, install Xcode: 

   ```shell
   xcode-select --install
   ```
   :::

Next up is installing Lotus' dependencies using Homebrew.

##### Homebrew

We recommend that macOS users use [Homebrew](https://brew.sh) to install each of the necessary packages.

1. Use the command `brew install` to install the following packages:

   ```shell
   brew install go bzr jq pkg-config rustup hwloc
   ```

Next up is cloning the Lotus repository and building the executables.

#### Build and install Lotus

The installation instructions are different depending on which CPU is in your Mac:

- [M1-based CPUs](#m1-based-cpus)
- [Intel and AMD-based CPUs](#intel-and-amd-based-cpus)

##### M1-based CPUs 

:::warning
These instructions are for installing Lotus on an M1-based Mac. If you have an Intel or AMD-based CPU, use the [Intel and AMD-based CPU instructions ↓](#intel-and-amd-based-cpus)
:::

1. Clone the repository:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Run `git checkout <RELEASE TAG>` to checkout to the latest Lotus release:

    ```shell
    git checkout v1.10.0
    ```

    You can use any tag listed on the [Lotus GitHub release page](https://github.com/filecoin-project/lotus/releases) to checkout to that specific release.

    :::tip
    If you want to checkout to a network other than mainnet, take a look at the [Switching networks guide →](./switch-networks.md)
    :::

1. Update the project submodules:

    ```shell
    git submodule update --init --recursive
    ```

1. Create necessary environment variable to allow Lotus to run on ARM architecture:

    ```shell
    export GOARCH=arm64
    export CGO_ENABLED=1
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    ```

1. Move into the `extern/filecoin-ffi` directory and checkout to the `m1-portable` branch:

    ```shell
    cd extern/filecoin-ffi
    git fetch -a
    git checkout master
    ```

1. Create the `filecoin-ffi` executables:

    ```shell
    make clean
    make
    ```

1. Move back to the root Lotus directory and create the `lotus` daemon:

    ```shell
    cd ../../
    make lotus
    ```

1. Run the final `make` command to move this `lotus` executable to `/usr/local/bin`. This allows you to run `lotus` from any directory.

    ```shell
    sudo make install
    ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

##### Intel and AMD-based CPUs

:::warning
These instructions are for installing Lotus on an Intel or AMD-based Mac. If you have an M1-based CPU, use the [M1-based CPU instructions ↑](#m1-based-cpus)
:::

1. Clone the repository:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Run `git checkout <RELEASE TAG>` to checkout to the latest Lotus release:

    ```shell
    git checkout v1.10.0
    ```

    You can use any tag listed on the [Lotus GitHub release page](https://github.com/filecoin-project/lotus/releases) to checkout to that specific release.

    :::tip
    If you want to checkout to a network other than mainnet, take a look at the [Switching networks guide →](./switch-networks.md)
    :::

1. If you are in China, take a look at some [tips for running Lotus in China](./tips-running-in-china.md)".
1. Some older Intel and AMD processors without the ADX instruction support may panic with illegal instruction errors. To fix this, add the `CGO_CFLAGS` environment variable:

   ```sh
   export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
   export CGO_CFLAGS="-D__BLST_PORTABLE__"
   ```

   This is due to a Lotus bug that prevents Lotus from running on a processor without `adx` instruction support, and should be fixed soon.

1. Build and install Lotus:

   ```shell
   make clean && make all 
   sudo make install
   ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

## Start the Lotus daemon and sync the chain

The `lotus` application runs as a daemon and a client to control and interact with that daemon. A daemon is a long-running program that is usually run in the background.

When using _mainnet_, we recommend you start the daemon [syncing from a trusted state snapshot](chain.md#lightweight-snapshot). In any case, you can start the daemon with the following command:

```sh
lotus daemon
```

During the first run, Lotus will:

- Set up its data folder at `~/.lotus`.
- Download the necessary proof parameters. This is a few gigabytes of data that is downloaded once.
- Import the snapshot (if specified) and start syncing the Lotus chain.

The daemon will start producing lots of log messages right away. From this point, you will have to work on a new terminal. Any`lotus` commands you run now will communicate with the running daemon.

:::tip
Do not be concerned by the number of warnings and sometimes errors showing in the logs. They are a normal part of the daemon lifecycle as it participates in the globally distributed consensus network.
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

Lotus comes with built-in CLI documentation.

```sh
lotus
  - chain: Interact with filecoin blockchain
  - client: Make deals, store data, retrieve data
  - wallet: Manage wallet
  - net: Manage P2P Network
  - sync: Inspect or interact with the chain syncer
  ...
  
# Show general help
lotus --help
# Show help for the "client" to make deals, store data, retrieve data
lotus client --help
```

For example, after your Lotus daemon has been running for a few minutes, use `lotus sync` to check the sync status of your lotus node.

```sh
lotus net sync

> sync status:
...
> 	Target:	[bafy2bzaceaki6bjhe2lxmtyexcff6vh5y5uw4tmbjr3gatwvh5dhaqqb2ykaa] (320791)
> 	Stage: complete
> 	Height: 320791
...
```

Or use `lotus net` to check the number of other peers that it is connected to in the Filecoin network.

```sh
lotus net peers

> 12D3KooWSDqWSDNZtpJae15FBGpJLeLmyabUfZmWDWEjqEGtUF8N, [/ip4/58.144.221.27/tcp/33425]
> 12D3KooWRTQoDUhWVZH9z5u9XmaFDvFw14YkcW7dSBFJ8CuzDHnu, [/ip4/67.212.85.202/tcp/10906]
```

Or check the current version of your Lotus node as well as network. 

```sh
lotus version

> Daemon:  1.9.0+calibnet+git.ada7f97ba+api1.3.0
> Local: lotus version 1.9.0+calibnet+git.ada7f97ba
# running lotus v1.9.0 on Calibration testnet
```

## Stop the Lotus daemon

To gracefully stop the running lotus daemon (required when restarting the daemon to update Lotus), use the following command:

```sh
lotus daemon stop
## When running with systemd do:
# systemctl stop lotus-daemon
```

