---
title: 'Run a Filecoin local dev-net'
description: 'Running a Filecoin network locally can be extremely useful for developers wanting to build and test their applications. This page provides guidance on different methods to run a Filecoin network locally.'
breadcrumb: 'Local dev-net'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Manual set up

You can spin up a dev-net using the regular Lotus binaries. This method will launch Lotus using 2 KiB sectors, allowing systems with fewer resources to run a dev-net. This solution runs comfortably on a computer with 2 CPU cores and 4 GB RAM.

This process requires you to use multiple terminal windows, so you might find a terminal multiplexer like [Tmux](https://github.com/tmux/tmux) helpful.

1. Some older Intel and AMD processors without support for the [ADX instruction set](https://en.wikipedia.org/wiki/Intel_ADX) may panic with illegal instruction errors. To fix this, add the `CGO_CFLAGS` environment variable:

   ```shell
   export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
   export CGO_CFLAGS="-D__BLST_PORTABLE__"
   ```

1. Replace `LOTUS_PATH` and `LOTUS_MINER_PATH` with temporary values:

   ```shell
   export LOTUS_PATH=~/.lotusDevnet
   export LOTUS_MINER_PATH=~/.lotusminerDevnet
   ```

   If you add these values to a configuration file like `~/.bashrc` you will have to remove them if you want to run a node on the Filecoin mainnet.

1. Clone the Lotus repository:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus
   ```

1. Make the Lotus binaries in debug mode using 2048 byte sectors:

   ```shell with-output
   make 2k
   ```
   ```
   git submodule update --init --recursive
   Submodule 'extern/filecoin-ffi' (https://github.com/filecoin-project/filecoin-ffi.git) registered for path 'extern/filecoin-ffi'
   ...
   ```

1. Lotus will automatically look for the genesis of the Filecoin mainnet. Skip this step using the `LOTUS_SKIP_GENESIS_CHECK` environment variable:

   ```shell
   export LOTUS_SKIP_GENESIS_CHECK=_yes_
   ```

1. Grab the 2048 byte parameters:

   ```shell with-output
   ./lotus fetch-params 2048
   ```
   ```
   2021-02-23T10:58:01.469-0500    INFO    build   go-paramfetch@v0.0.2-0.20200701152213-3e0f0afdc261/paramfetch.go:138  Parameter file /var/tmp/filecoin-proof-parameters/v28-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-0cfb4f178bbb71cf2ecfcd42accce558b27199ab4fb59cb78f2483fe21ef36d9.vk is ok
   ...
   c261/paramfetch.go:162  parameter and key-fetching complete
   ```

1. Pre-seal some sectors for the genesis block:

   ```shell with-output
   ./lotus-seed pre-seal --sector-size 2KiB --num-sectors 2
   ```
   ```
   sector-id: {{1000 0} 0}, piece info: {2048 baga6ea4seaqoej3hzxzqr5y25ibovtjrhed7yba5vm6gwartr5hsgcbao7aluki}
   ...
   2021-02-23T10:59:36.937-0500    INFO    preseal seed/seed.go:232        Writing preseal manifest to /home/user/.genesis-sectors/pre-seal-t01000.json
   ```

1. Create the genesis block:

   ```shell
   ./lotus-seed genesis new localnet.json
   ```

1. Fund the default account with some FIL:

   ```shell with-output
   ./lotus-seed genesis add-miner localnet.json ~/.genesis-sectors/pre-seal-t01000.json
   ```
   ```
   t3wknmlrksha5itapqstc46zdals676h67vjl7lg2lvmrxozzuth6hovuuamgfbk6cqgha3m3qfo4fxmuhubha some initial balance
   ```

1. Start the first node:

   ```shell
   ./lotus daemon --lotus-make-genesis=devgen.car --genesis-template=localnet.json --bootstrap=false
   ```

1. Create a new terminal window or tab and re-export the `LOTUS_PATH` and `LOTUS_MINER_PATH` variables:

   ```shell
   export LOTUS_PATH=~/.lotusDevnet
   export LOTUS_MINER_PATH=~/.lotusminerDevnet
   ```

   If you added the above variables to a configuration file like `~/.bashrc` then you can just source that file:

   ```shell
   source ~/.bashrc
   ```

1. Import the genesis miner key:

   ```shell with-output
   ./lotus wallet import --as-default ~/.genesis-sectors/pre-seal-t01000.key
   ```
   ```
   imported key t3sxyian3zr52a32r7gpyx55rhf4wmbsm7e6ir3ygcaytrl44txwxwyron7uo4pbbqvmsaek36gqbjmmpwkwga successfully!
   ```

1. Set up the genesis miner. This process can take a few minutes:

   ```shell with-output
   ./lotus-miner init --genesis-miner --actor=t01000 --sector-size=2KiB --pre-sealed-sectors=~/.genesis-sectors --pre-sealed-metadata=~/.genesis-sectors/pre-seal-t01000.json --nosync
   ```
   ```
   2021-02-23T11:05:17.941-0500    INFO    main    lotus-storage-miner/init.go:124 Initializing lotus miner
   ...
   2021-02-23T16:55:57.257Z        INFO    main    lotus-storage-miner/init.go:494 Importing pre-sealed sector metadata for t01000
   2021-02-23T16:55:57.266Z        INFO    main    lotus-storage-miner/init.go:266 Miner successfully created, you can now start it with 'lotus-miner run'
   ```

1. Start the miner:

   ```shell with-output
   ./lotus-miner run --nosync
   ```
   ```
   2021-02-23T16:58:13.493Z        INFO    main    lotus-storage-miner/run.go:95   Checking full node sync status
   2021-02-23T16:58:13.501Z        INFO    modules modules/core.go:64      memory limits initialized       {"max_mem_heap": 0, "total_system_mem": 2101817344, "effective_mem_limit": 2101817344}
   ...
   ```

You now have a Lotus node and a miner running! You can interact with it

## Textile cointainer

The developers at Textile have created a quick way to run a Lotus dev-net for testing purposes. Apart from being easy to set up, an advantage of this dev-net is using a mocked `sector builder, which makes expensive operations like sealing much easier.

Head to the [textileio/lotus-devnet GitHub repository](https://github.com/textileio/lotus-devnet) to learn how to set up a node on the Textile dev-net.
