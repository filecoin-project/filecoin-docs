---
description: >-
  Run a private Filecoin network on your machine with Lotus. Step-by-step setup
  with 2 KiB sectors, a storage provider, a client and funded test wallets.
---

# Local testnet

**A local testnet is a private Filecoin network on your own machine. It has one storage provider node and one client node, uses 2 KiB sectors so sealing is fast, and gives you as much test FIL as you need.**

> **Which local testnet?** This page sets up a private Filecoin network with Lotus, to test the base protocol: storage providers, sealing and the chain itself. If you are building on Filecoin Onchain Cloud (FOC), use the FOC local devnet in [Store Data](../../store-data/resources/local-devnet.md) instead. It is a separate setup.
>
> This page uses Lotus, the reference implementation of the Filecoin protocol, to run the local network. To run a storage provider on Mainnet, we recommend Curio instead. See [Provide Storage](../../provide-storage/overview.md).

Chain ID: `31415926`. You will have three terminal windows open at once: the client node, the storage provider node, and one for commands.

## Prerequisites

* At least 8 GiB of RAM and a quad-core CPU.
* Optionally, a terminal multiplexer such as [tmux](https://github.com/tmux/tmux).
* The Go version Lotus requires. See `GO_VERSION_MIN` in the [Lotus repository](https://github.com/filecoin-project/lotus).

### Install dependencies

**macOS**

1. Check that [Homebrew](https://brew.sh/) and [Xcode](https://developer.apple.com/xcode/) are installed (`brew --version`, `xcode-select -p`), and install them if not.
2. Install the dependencies:

   ```shell
   brew install go bzr jq pkg-config hwloc coreutils
   ```
3. Install Rust:

   ```shell
   curl https://sh.rustup.rs -sSf | sh -s -- -y
   source "$HOME/.cargo/env"
   ```

**Ubuntu**

1. Install the dependencies:

   ```shell
   sudo apt update -y
   sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y
   ```
2. Install Go from [go.dev/dl](https://go.dev/dl/) and add `/usr/local/go/bin` to your `PATH`.
3. Install Rust:

   ```shell
   curl https://sh.rustup.rs -sSf | sh -s -- -y
   source "$HOME/.cargo/env"
   ```

## Build Lotus

1. Clone Lotus into `~/lotus-devnet` and check out the latest stable branch:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git ~/lotus-devnet
   cd ~/lotus-devnet
   git checkout releases
   ```
2. Set the build variables for your machine.

   * macOS on Apple silicon:

     ```shell
     export LIBRARY_PATH=/opt/homebrew/lib
     export FFI_BUILD_FROM_SOURCE=1
     export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
     ```
   * Ubuntu on a CPU newer than AMD Zen or Intel Ice Lake, to enable SHA extensions:

     ```shell
     export RUSTFLAGS="-C target-cpu=native -g"
     export FFI_BUILD_FROM_SOURCE=1
     ```
   * Otherwise, skip this step.
3. Build the binaries with 2 KiB sector support. This takes about 5 minutes:

   ```shell
   make 2k
   ```
4. Fetch the proving parameters for a 2048-byte sector. This downloads about 2 GiB:

   ```shell
   ./lotus fetch-params 2048
   ```

## Create the genesis block

1. Pre-seal two sectors:

   ```shell
   ./lotus-seed pre-seal --sector-size 2KiB --num-sectors 2
   ```
2. Create the genesis template:

   ```shell
   ./lotus-seed genesis new localnet.json
   ```
3. Add a pre-miner, and an address with funds, to it:

   ```shell
   ./lotus-seed genesis add-miner localnet.json ~/.genesis-sectors/pre-seal-t01000.json
   ```

## Start the nodes

In every new terminal window, move into `~/lotus-devnet` and export these variables first. They keep the devnet apart from any other Lotus install, and they reset whenever you open a new terminal:

```shell
cd ~/lotus-devnet
export LOTUS_PATH=~/.lotus-local-net
export LOTUS_MINER_PATH=~/.lotus-miner-local-net
export LOTUS_SKIP_GENESIS_CHECK=_yes_
export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
export CGO_CFLAGS="-D__BLST_PORTABLE__"
```

### Client node

In a new terminal, with the variables set, start the client node. It keeps running, so leave the window open:

```shell
./lotus daemon --lotus-make-genesis=devgen.car --genesis-template=localnet.json --bootstrap=false
```

### Storage provider node

In a second terminal, with the variables set:

1. Import the genesis miner key:

   ```shell
   ./lotus wallet import --as-default ~/.genesis-sectors/pre-seal-t01000.key
   ```
2. Initialize the genesis miner. This takes a few minutes:

   ```shell
   ./lotus-miner init --genesis-miner --actor=t01000 --sector-size=2KiB --pre-sealed-sectors=~/.genesis-sectors --pre-sealed-metadata=~/.genesis-sectors/pre-seal-t01000.json --nosync
   ```
3. Start the storage provider node. It keeps running, so leave the window open:

   ```shell
   ./lotus-miner run --nosync
   ```

Your client and storage provider nodes are now talking to each other. Run all further commands from a third terminal, with the variables set.

## Get test FIL

Create a wallet, then send it FIL from the pre-mined address.

1. Create a wallet:

   ```shell
   ./lotus wallet new
   ```
2. List the wallets on the node. The pre-mined `t3` address holds a very large balance and is the default:

   ```shell
   ./lotus wallet list
   ```
3. Send FIL from the pre-mined address to your new one:

   ```shell
   ./lotus send --from <PRE-MINED ADDRESS> <TO ADDRESS> <VALUE>
   ```

   For example, to send 2,000 FIL:

   ```shell
   ./lotus send --from t3q4o7gkwe7p7xokhgws4rwntj7yqfhpj5pm6cqc7dycl7cwk4uvgh2odwdvge5re7ne5gcc6xluifss5uu5cq t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq 2000
   ```
4. Check the new balance:

   ```shell
   ./lotus wallet balance <ADDRESS>
   ```

To use the balance in MetaMask, create a delegated (`t4`) address with `lotus wallet new delegated`, then [connect MetaMask to the local testnet](../fil/wallets.md#add-filecoin-to-metamask).

## Stop and restart

To stop the devnet, press `Ctrl+C` in the storage provider window and then in the client window. Each prints `Graceful shutdown successful` when it has stopped.

To restart it, open two new terminals, set the variables, and run the same two commands as before: `lotus daemon` with the same flags in one, and `lotus-miner run --nosync` in the other.

## Troubleshooting

**`could not get API info for FullNode`**: your `lotus daemon` isn't running, or you haven't exported the variables in this terminal. Start the daemon, or export them again.

## Next steps

* [Wallets](../fil/wallets.md)
* [Calibration](calibration.md): test on a public network next
* [Mainnet](mainnet.md): parameters, RPC endpoints and explorers for the production network.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/networks/local-testnet)
