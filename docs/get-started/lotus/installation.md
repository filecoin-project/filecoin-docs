---
title: 'Lotus: install and setup'
description: 'This guide covers how to install the Lotus applications and launch a Lotus Node.'
breadcrumb: 'Install and setup'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}. This guide covers installing `lotus`, `lotus-miner` and `lotus-worker` to your computer, and then runs through setting up a Lotus node. For information on running the miner, check the [Lotus Miner documentation](../../mine/lotus/README.md).

## Minimal requirements

To run a Lotus node, your computer must have:

- macOS or Linux installed. Windows is not yet supported.
- 8-core CPU and 32 GiB RAM. Models with support for _Intel SHA Extensions_ (AMD since Zen microarchitecture, or Intel since Ice Lake) will significantly speed things up.
- Enough space to store the current Lotus chain (preferably on an SSD storage medium). The chain grows at approximately 12 GiB per week. The chain can be also [synced from trusted state snapshots and compacted](chain.md).

:::warning
These are the minimal requirements to run a Lotus node. [Hardware requirements for Miners](../../mine/hardware-requirements.md) are different.
:::

## Linux

The following instructions are specific to Linux installations. Head to the [macOS](#macos) section if you want to install Lotus on a Mac.

### Software dependencies

You will need the following software installed to install and run Lotus.

#### System-specific

Building Lotus requires some system dependencies, usually provided by your distribution.

Arch:

```bash
sudo pacman -Syu opencl-icd-loader gcc git bzr jq pkg-config opencl-icd-loader opencl-headers hwloc
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

:::tip
Make sure your `$PATH` variable is correctly configured after the rustup installation so that `cargo` and `rustc` are found in their rustup-configured locations.
:::

#### Go

To build Lotus, you need a working installation of [Go 1.15.5 or higher](https://golang.org/dl/):

```bash
wget -c https://golang.org/dl/go1.16.2.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
```

:::tip
You'll need to add `/usr/local/go/bin` to your path. For most Linux distributions you can run something like:

```shell
echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc && ~/.bashrc
```

Check out the [official Golang installation instructions](https://golang.org/doc/install) if you get stuck.
:::

### Build and install Lotus

Once all the dependencies are installed, you can build and install the Lotus suite (`lotus`, `lotus-miner`, and `lotus-worker`).

1. Clone the repository:

   ```sh
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

2. Checkout the branch corresponding to the network you want to join. If you want to run the _latest_ version of Lotus on `mainnet`, checkout to the `master` branch. If you want to use a specific release, then see the [Releases section in GitHub](https://github.com/filecoin-project/lotus/releases).

   If you are changing networks from a previous Lotus installation or there has been a network reset, read the [Switch networks guide](./switch-networks.md) before proceeding. You can look up the correct branch or tag for the network you want to join in the [networks dashboard](https://networks.filecoin.io):

   ```sh
   git checkout <branch_or_tag>
   # For example:
   git checkout master # mainnet
   git checkout ntwk-calibration # calibration-net
   git checkout ntwk-nerpa # nerpa-net
   ```

   Currently, the _master_ branch corresponds to **mainnet**.

3. If you are in China, check out the specific [tips](tips-running-in-china.md).
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

   This is due to a Lotus bug that prevents Lotus from running on processor without `adx` instruction support, and should be fixed soon.

5. Build and install Lotus:

   ```sh
   make clean all
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

These instructions are specific to macOS. If you are installing Lotus on a Linux distribution, head over to the [Linux section](#linux).

### XCode Command Line Tools

Lotus requires that X-Code CLI tools be installed before building the Lotus binaries.

1. Check if you already have the XCode Command Line Tools installed via the CLI, run:

   ```sh
   xcode-select -p
   ```

   If this command returns a path, you can move on to the [next step](#install-homebrew). Otherwise, to install via the CLI, run:

   ```sh
   xcode-select --install
   ```

1. To update, run:

   ```sh
   sudo rm -rf /Library/Developer/CommandLineTools
   xcode-select --install
   ```

### Install Homebrew

We recommend that MacOS users use [Homebrew](https://brew.sh) to install each of the necessary packages.

1. Use the command `brew install` to install the following packages:

   ```sh
   brew install go bzr jq pkg-config rustup hwloc
   ```

1. Clone the repository:

   ```sh
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Checkout the branch corresponding to the network you want to join. If you are changing networks from a previous Lotus installation or there has been a network reset, read the [Switch networks guide](./switch-networks.md) before proceeding. You can look up the correct branch or tag for the network you want to join in the [networks dashboard](https://networks.filecoin.io):

   ```sh
   git checkout <branch_or_tag>
   # For example:
   git checkout master # mainnet
   git checkout ntwk-calibration # calibration-net
   git checkout ntwk-nerpa # nerpa-net
   ```

   Currently, the _master_ branch corresponds to **mainnet**.

1. If you are in China, check out the specific [tips](tips-running-in-china.md).

1. Some older Intel and AMD processors without the ADX instruction support may panic with illegal instruction errors. To fix this, add the `CGO_CFLAGS` environment variable:

   ```sh
   export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
   export CGO_CFLAGS="-D__BLST_PORTABLE__"
   ```

   This is due to a Lotus bug that prevents Lotus from running on processor without `adx` instruction support, and should be fixed soon.

1. Build Lotus:

   ```sh
   make clean && make all
   sudo make install
   ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

## Start the Lotus daemon and sync the chain

The `lotus` application runs as a daemon and a client to control and interact with that daemon. A daemon is a long-running program that is usually run in the background.

When using _mainnet_, we recommend to start the daemon [syncing from a trusted state snapshot](chain.md#lightweight-snapshot). In any case, you can start the deamon with the following command:

```sh
lotus daemon
```

During the first run, Lotus will:

- Setup its data folder at `~/.lotus`.
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

In order to gracefully stop the running lotus daemon (required when restarting the daemon to update Lotus), use the following command:

```sh
lotus daemon stop
## When running with systemd do:
# systemctl stop lotus-daemon
```
