---
title: "Set up"
description: "Local networks are a useful way to get started with Filecoin development. Everything happens locally on your computer, and the system requirements are quite low. This guide covers how to start a local network."
lead: "Local networks are a useful way to get started with Filecoin development. Everything happens locally on your computer, and the system requirements are quite low. This guide covers how to start a local network using Lotus as the Filecoin node implementation."
draft: false
images: []
type: docs
menu:
  networks:
    parent: "networks-local-testnet"
    identifier: "set-up-72a301344c7e2a40efea82726d9b66b8"
weight: 100
toc: true
---

A Filecoin network has two node types: storage provider nodes and client nodes. In our local developer network (devnet), we're going to create a single storage provider node to handle our requests, and we'll also create a client node to pass information into our network. Both of these nodes run in the terminal. In total, we'll have three terminal windows open at once.

## Prerequisites

The nodes we're going to run have relatively lightweight hardware requirements. However, since we're running multiple instances at once it's recommended that your computer meets the following requirements:

1. At least 8 GiB of RAM
1. A quad-core CPU.
1. (Optional) Because parts of this tutorial require multiple terminal windows, install a terminal multiplexer like [Tmux](https://github.com/tmux/tmux).

To build the nodes, you'll need some specific software. Run the following command to install the software prerequisites:

{{< tabs tabTotal="2">}}
{{< tab tabName="MacOS" >}}
<br>

1. Open a terminal window.
1. Check that you have [Homebrew](https://brew.sh/) installed.

    ```shell
    brew --version
    ```

    ```plaintext
    Homebrew 3.6.18
    ...
    ```

    If you do not see a version number. or receive an error message, install [Homebrew](https://brew.sh/).


1. Ensure you have [XCode](https://developer.apple.com/xcode/) installed.

    ```shell
    xcode-select -p
    ```

    ```plaintext
    /Library/Developer/CommandLineTools
    ```
    
    If you do not see the output above. or receive an error message, install [XCode](https://developer.apple.com/xcode/).

1. Install the following dependencies:

    ```shell
    brew install go bzr jq pkg-config hwloc coreutils
    ```

1. Install Rust:

    ```shell
    curl https://sh.rustup.rs -sSf | sh -s -- -y
    ```

    ```plaintext
    ...
    Rust is installed now. Great!    
    ...
    ```

1. Source the `~/.cargo/env` config file:

    ```shell
    source "$HOME/.cargo/env"
    ```

{{< /tab >}}
{{< tab tabName="Ubuntu" >}}

<br>

1. Install the following dependencies:

    ```shell
    sudo apt update -y
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y
    ```

1. Install Go and add `/usr/local/go/bin` to your `$PATH` variable:

    ```shell
    wget -c https://golang.org/dl/go1.18.8.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
    ```

1. You may need to export `/usr/local/go/bin` to your `$PATH`. This process changes depending on which shell you're using:

    | Shell | Export to `$PATH` example |
    | ----- | ------- |
    | Bash | `echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc`
    | ZSH | `echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.zshrc && source ~/.zshrc`

1. Install Rust and source the `~/.cargo/env` config file:

    ```shell
    curl https://sh.rustup.rs -sSf | sh -s -- -y
    source "$HOME/.cargo/env"
    ```
1. Done! You can move on to the [Pre-build](#pre-build) section.

{{< /tab >}}
{{< /tabs >}}

## Pre-build

Before we can build the Lotus binaries, there's some setup we need to do. We'll create the executable binaries within a new `~/lotus-devnet`.

{{< tabs tabTotal="3">}}
{{< tab tabName="MacOS-Intel" >}}
<br>

1. Clone the repository:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git ~/lotus-devnet
    cd lotus/
    ```

1. Checkout to the latest stable branch:

    ```shell
    git checkout releases
    ```

1. Done! You can move on to the [Build](#build) section.

{{< /tab >}}
{{< tab tabName="MacOS-M1/M2" >}}
<br>

1. Clone the repository into a new `~/lotus-devnet` directory:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git ~/lotus-devnet
    cd ~/lotus-devnet
    ```

1. Checkout to the latest stable branch:

    ```shell
    git checkout releases
    ```

1. Create the necessary environment variables to allow Lotus to run on M1 architecture:

    ```shell
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
    ```

1. Done! You can move on to the [Build](#build) section.

{{< /tab >}}
{{< tab tabName="Ubuntu" >}}
<br>

1. Clone the repository into a new `~/lotus-devnet` directory:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git ~/lotus-devnet
    cd ~/lotus-devnet
    ```

1. Checkout to the latest stable branch:

    ```shell
    git checkout releases
    ```

1. If your processor was released later than an AMD Zen or Intel Ice Lake CPU, enable the use of SHA extensions by adding these two environment variables:

    ```shell
    export RUSTFLAGS="-C target-cpu=native -g"
    export FFI_BUILD_FROM_SOURCE=1
    ```

    If in doubt, ignore this command and move on to [the next section](#build).

1. Done! You can move on to the [Build](#build) section.

{{< /tab >}}
{{< /tabs >}}

## Build

1. Create the `2k` binary for Lotus:

    ```shell
    make 2k
    ```

    ```plaintext
    git submodule update --init --recursive
    Submodule 'extern/filecoin-ffi' (https://github.com/filecoin-project/filecoin-ffi.git) registered for path 'extern/filecoin-ffi'
    Submodule 'extern/serialization-vectors' (https://github.com/filecoin-project/serialization-vectors.git) registered for path 'extern/serialization-vectors'

    ...
    ```

    This process will take about 5 minutes to complete.

1. Fetch the proving parameters for a 2048-byte sector size:

    ```shell
    ./lotus fetch-params 2048
    ```

    ```plaintext
    2023-01-31T10:44:43.058-0400    INFO    paramfetch      go-paramfetch@v0.0.4/paramfetch.go:244  Fetching /var/tmp/filecoin-proof-parameters/v28-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-8-0-559e581f022bb4e4ec6e719e563bf0e026ad6de42e56c18714a2c692b1b88d7e.vk from https://proofs.filecoin.io/ipfs
    2023-01-31T10:44:43.058-0400    INFO    paramfetch      go-paramfetch@v0.0.4/paramfetch.go:262  GET https://proofs.filecoin.io/ipfs/QmZCvxKcKP97vDAk8Nxs9R1fWtqpjQrAhhfXPoCi1nkDoF 13.32 KiB / 13.32 KiB [===========================================================================================================================================] 100.00% 155.63 KiB/s 0

    ...
    ```

    This process downloads a few files totalling to around 2 GiB in size. Depending on your internet speed, this process can take a few minutes to complete.

1. Pre-seal two sectors for the genesis block:

    ```shell
    ./lotus-seed pre-seal --sector-size 2KiB --num-sectors 2
    ```

    ```plaintext
    sector-id: {{1000 1} 5}, piece info: {2048 baga6ea4seaqf7ovs6euxa4ktencg2gza7lua32l2ugqu76uqgvnjocek6gtoufi}
    2023-01-31T10:49:46.562-0400    WARN    preseal seed/seed.go:175        PreCommitOutput: {{1000 1} 5} bagboea4b5abcamxkzmzcciabqqk3xuuvj3k23nfuojboopyw3kg2mblhj6mzipii baga6ea4seaqf7ovs6euxa4ktencg2gza7lua32l2ugqu76uqgvnjocek6gtoufi
    2023-01-31T10:49:46.562-0400    WARN    preseal seed/seed.go:100        PeerID not specified, generating dummy

    ...
    ```

1. Create the genesis block:

    ```shell
    ./lotus-seed genesis new localnet.json
    ```

1. Create a pre-miner and an address with some funds: 

    ```shell
    ./lotus-seed genesis add-miner localnet.json ~/.genesis-sectors/pre-seal-t01000.json
    ```

    ```plaintext
    2023-01-31T10:52:03.855-0400    INFO    lotus-seed      lotus-seed/genesis.go:129       Adding miner t01000 to genesis template
    2023-01-31T10:52:03.855-0400    INFO    lotus-seed      lotus-seed/genesis.go:146       Giving t3q4o7gkwe7p7xokhgws4rwntj7yqfhpj5pm6cqc7dycl7cwk4uvgh2odwdvge5re7ne5gcc6xluifss5uu5cq some initial balance
    ```

Our Lotus installation is now ready to start running the nodes!

## Start the nodes

As mentioned earlier, we will be running two types of a node: a storage provider node and a client node. In the Lotus project, a storage provider node is referred to as a _miner_. Since we're going to run multiple nodes, you'll need to have at least three terminal windows open. If your terminal emulator supports tabs, consider using them to help organize your setup.

### Client

1. Open a new terminal window.
1. Move into the `~/lotus-devnet` directory:

    ```shell
    cd ~/lotus-devnet
    ```

1. Export the devnet-specific variables again to make sure we don't interfere with any existing Lotus installations on your system:

    ```shell
    export LOTUS_PATH=~/.lotus-local-net
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

    Because environmental variables are reset when you open a new terminal window, these variables must be exported every time we start a new terminal.

1. Start the client node using `lotus daemon`:

    ```shell
    ./lotus daemon --lotus-make-genesis=devgen.car --genesis-template=localnet.json --bootstrap=false
    ```

    ```plaintext
    2023-01-31T10:57:41.022-0400    INFO    main    lotus/daemon.go:218     lotus repo: /home/johnny/.lotus
    2023-01-31T10:57:41.022-0400    INFO    repo    repo/fsrepo.go:265      Initializing repo at '/home/johnny/.lotus'
    2023-01-31T10:57:41.022-0400    INFO    paramfetch      go-paramfetch@v0.0.4/paramfetch.go:209  Parameter file /var/tmp/filecoin-proof-parameters/v28-stacked-proof-of-replication-merkletree-poseidon_hasher-8-0-0-sha256_hasher-ecd683648512ab1765faa2a5f14bab48f676e633467f0aa8aad4b55dcb0652bb.vk is ok 
    ```

1. This command will continue to run. Leave this window open.

### Storage provider

1. Open a new terminal window.
1. Move into the `~/lotus-devnet` directory:

    ```shell
    cd ~/lotus-devnet
    ```

1. Export the devnet-specific variables again to make sure we don't interfere with any existing Lotus installations on your system:

    ```shell
    export LOTUS_PATH=~/.lotus-local-net
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

1. Import the genesis miner key:

    ```shell
    ./lotus wallet import --as-default ~/.genesis-sectors/pre-seal-t01000.key 
    ```

    ```plaintext
    imported key t3q4o7gkwe7p7xokhgws4rwntj7yqfhpj5pm6cqc7dycl7cwk4uvgh2odwdvge5re7ne5gcc6xluifss5uu5cq successfully!
    ```

1. Initialize the genesis miner:

    ```shell
    ./lotus-miner init --genesis-miner --actor=t01000 --sector-size=2KiB --pre-sealed-sectors=~/.genesis-sectors --pre-sealed-metadata=~/.genesis-sectors/pre-seal-t01000.json --nosync 
    ```

    ```plaintext
    2023-01-31T11:04:46.148-0400    INFO    main    lotus-miner/init.go:130 Initializing lotus miner
    2023-01-31T11:04:46.148-0400    INFO    main    lotus-miner/init.go:157 Checking proof parameters

    ...

    2023-01-31T11:04:46.148-0400    INFO    main    lotus-miner/init.go:283 Miner successfully created, you can now start it with 'lotus-miner run'
    ```

    This process take a few minutes to complete.

1. Start the storage provider node with `lotus-miner run`:

    ```shell
    ./lotus-miner run --nosync 
    ```

    This terminal window will continue to run. You must run all further commands from a new terminal window.

We now have a client node and a storage provider node successfully talking to each other! Next up, we can send requests to our client node to ensure everything is set up correctly.

## Get some FIL

Now that we've got our local devnet running let's create a new wallet and send some funds from our miner account to that new wallet.

### Create a wallet

There are multiple ways to create a new wallet. The simplest way is to use the Lotus CLI directly:

1. Open a new terminal window.
1. Move into the `~/lotus-devnet` directory:

    ```shell
    cd ~/lotus-devnet
    ```

1. Export the devnet-specific variables again to make sure we don't interfere with any existing Lotus installations on your system:

    ```shell
    export LOTUS_PATH=~/.lotus-local-net
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

1. Create a new wallet with `lotus wallet new`:

    ```shell
    ./lotus wallet new
    ```

    ```plaintext
    t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq
    ```

1. View the wallets available on this node with `lotus wallet list`:

    ```shell
    ./lotus wallet list
    ```

    ```plaintext
    Address                                                                                 Balance                          Nonce  Default
    t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq                                               0 FIL                            0
    t3q4o7gkwe7p7xokhgws4rwntj7yqfhpj5pm6cqc7dycl7cwk4uvgh2odwdvge5re7ne5gcc6xluifss5uu5cq  49999999.999763880085417692 FIL  2      X
    ```

1. You can now close this terminal window, or you can keep it open for the next section.

### Send funds

We can now send FIL from the pre-mined `t3q4o7g...` account to our new `t1snly7...` account with `lotus send`:

1. If you closed the terminal windows from the last section, open a new terminal window, move into the `~/lotus-devnet` directory, and export the devnnet-specific variables again with:

    ```shell
    cd ~/lotus-devnet
    export LOTUS_PATH=~/.lotus-local-net
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

1. View the wallets available on this node with `lotus wallet list`:

    ```shell
    ./lotus wallet list
    ```

    ```plaintext
    Address                                                                                 Balance                          Nonce  Default
    t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq                                               0 FIL                            0
    t3q4o7gkwe7p7xokhgws4rwntj7yqfhpj5pm6cqc7dycl7cwk4uvgh2odwdvge5re7ne5gcc6xluifss5uu5cq  49999999.999763880085417692 FIL  2      X
    ```

    In the above example, the `t3q4o...` address is the _pre-mined_ address we created in an earlier step. This has a very large balance of FIL. We want to send FIL from this pre-mined address to our new `t1snl...` address.

1. Create the send request with `lotus send`, supplying the pre-mined `t3q4o...` address as the `--from` address, the new `t1snl...` address as the receiving address, and the amount of FIL we want to send:

    ```shell
    ./lotus send --from <PRE-MINED ADDRESS> <TO ADDRESS> <VALUE>
    ```

    For example:

    ```shell
    ./lotus send --from t3q4o7gkwe7p7xokhgws4rwntj7yqfhpj5pm6cqc7dycl7cwk4uvgh2odwdvge5re7ne5gcc6xluifss5uu5cq t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq 2000
    ```

    ```plaintext
    bafy2bzaceaqzbgiazwvtpago6wpkxl42puxfkvwv5cwjpime2irqatamji2bq
    ```

1. Check the balance of your new `t1snl...` address with `lotus wallet balance`:

    ```shell
    ./lotus wallet balance <ADDRESS>
    ```

    For example:

    ```shell
    ./lotus wallet balance t1snly7vh4mjtjznwze56ihrdhzfwvbajywwmrenq
    ```

    ```plaintext
    2000 FIL
    ```

1. You can now close this terminal window, or you can keep it open for the next section.

## Stop and restart

You'll eventually want to stop your local devnet from running or may need to restart it. Follow these steps.

### Stop the devnet

1. Open the storage provider terminal window.
1. Press `CTRL` + `c` to stop the node. The node will print `Graceful shutdown successful` once it has fully stopped:

    ```plaintext
    # CTRL + c 
    ```

    ```shell
    ...

    2023-02-14T10:54:42.030-0400    DEBUG   advmgr  sealer/sched_worker.go:603      worker 1fa5f6b1-eb4d-4d92-98b1-6114a0d7695d dropped
    2023-02-14T10:54:42.056-0400    INFO    builder node/shutdown.go:44     miner shut down successfully
    2023-02-14T10:54:42.056-0400    WARN    builder node/shutdown.go:47     Graceful shutdown successful
    ```
1. You can now close the storage provider terminal window.
1. Open the client terminal window.
1. Press `CTRL` + `c` to stop the node. The node will print `Graceful shutdown successful` once it has fully stopped:

    ```plaintext
    # CTRL + c 
    ```

    ```shell
    ...

    2023-02-14T10:55:42.475-0400    INFO    badgerbs        v2@v2.2007.3/db.go:554  Force compaction on level 0 done
    2023-02-14T10:55:42.502-0400    INFO    builder node/shutdown.go:44     node shut down successfully
    2023-02-14T10:55:42.502-0400    WARN    builder node/shutdown.go:47     Graceful shutdown successful
    ```
1. You can now close the client terminal window.

### Restart the devnet

1. Open a new terminal window, move into the `~/lotus-devnet` directory, and export the devnnet-specific variables again with:

    ```shell
    cd ~/lotus-devnet
    export LOTUS_PATH=~/.lotus-local-net
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

1. Start the client node with `lotus daemon`:

    ```shell
    ./lotus daemon --lotus-make-genesis=devgen.car --genesis-template=localnet.json --bootstrap=false
    ```

    ```plaintext
    2023-01-31T10:57:41.022-0400    INFO    main    lotus/daemon.go:218     lotus repo: /home/johnny/.lotus
    2023-01-31T10:57:41.022-0400    INFO    repo    repo/fsrepo.go:265      Initializing repo at '/home/johnny/.lotus'
    2023-01-31T10:57:41.022-0400    INFO    paramfetch      go-paramfetch@v0.0.4/paramfetch.go:209  Parameter file /var/tmp/filecoin-proof-parameters/v28-stacked-proof-of-replication-merkletree-poseidon_hasher-8-0-0-sha256_hasher-ecd683648512ab1765faa2a5f14bab48f676e633467f0aa8aad4b55dcb0652bb.vk is ok 
    ```

1. This command will continue to run. Leave this window open.
1. For the storage provider node, open a new terminal window, move into the `~/lotus-devnet` directory, and export the devnnet-specific variables again with:

    ```shell
    cd ~/lotus-devnet
    export LOTUS_PATH=~/.lotus-local-net
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

1. Restart the storage provider node with `lotus-miner run`:

    ```shell
    ./lotus-miner run --nosync
    ```

    ```plaintext
    2023-01-31T12:54:12.009-0400    INFO    main    lotus-miner/run.go:98   Checking full node sync status
    2023-01-31T12:54:12.013-0400    INFO    modules modules/core.go:64      memory limits initialized    {"max_mem_heap": 0, "total_system_mem": 16444395520, "effective_mem_limit": 16444395520}
    2023-01-31T12:54:12.013-0400    WARN    modules modules/core.go:124     failed to initialize cgroup-driven watchdog; err: failed to load cgroup for process: cgroups: cgroup mountpoint does not exist
    ```

1. This command will continue to run. Leave this window open.
1. You must run all further commands from a new terminal window.

## Next steps

To summarize, you've started a local devnet, funded a new address, and exported that address to a file! You've got all the pieces ready to start developing applications on Filecoin! Next up, [try adding this local testnet to MetaMask]({{< relref "/networks/local-testnet/add-to-metamask" >}}).

---

## Troubleshooting

Running into issues? Check out these troubleshooting steps to figure out what's going on.

### Could not get API info for FullNode

You may encounter the following error message:

```plaintext
ERROR: could not get API info for FullNode: could not get api endpoint: API not running (no endpoint
```

If you receive this error when trying to call your Lotus daemon, either your `lotus daemon` isn't running (see [Restart the devnet](#restart-the-devnet)) or you haven't re-exported the necessary variables (see [the #Build section](#build)).
