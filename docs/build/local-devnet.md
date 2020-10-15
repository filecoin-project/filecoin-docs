---
title: 'Run a Filecoin local devnet'
description: 'Running a Filecoin network locally can be extremely useful for developers willing to build and test their applications on top of Filecoin and other ecosystem tools. This page provides guidance on different methods to run Filecoin locally.'
breadcrumb: 'Local devnet'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

## Textile's `lotus-devnet`

Textile developers have created a quick way to run a Lotus Devnet (with or without Docker) for testing purposes. Apart from being very easy to setup, its main advantange is the use of a mocked _sectorbuilder_ so that expensive operations like sealing feel like a breeze.

You can read documentation, instructions and support options in the source repository: [https://github.com/textileio/lotus-devnet](https://github.com/textileio/lotus-devnet).

## Devnet with vanilla Lotus binaries

This approach uses stock Lotus binaries (see the [installation instructions](../get-started/lotus/installation.md) for reference) and will launch Lotus using small 2KiB sectors, which allow regular workstations to perform mining operations.

If you are building Lotus >= 0.7.1 and have an **older Intel or AMD processor** (MacOS), set the following ENV variables before running `make 2k`:

```
export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
export CGO_CFLAGS="-D__BLST_PORTABLE__"
```

If you have a running installation of Lotus, make sure that configuration paths do not conflict by setting custom ones:

```sh
# Make sure these are always set before running the commands.
export LOTUS_PATH=~/.lotusDevnet
export LOTUS_MINER_PATH=~/.lotusminerDevnet
```

To get started, build the Lotus binaries in debug mode, enabling the use of 2048 byte sectors:

```sh
# After cloning the Lotus repository
make 2k
```

Set the `LOTUS_SKIP_GENESIS_CHECK` environment variable to `_yes_`. This tells your Lotus node that it's okay if the genesis being used doesn't match any baked-in genesis.

```sh
export LOTUS_SKIP_GENESIS_CHECK=_yes_
```

Download the 2048 byte parameters:

```sh
./lotus fetch-params 2048
```

Pre-seal some sectors:

```sh
./lotus-seed pre-seal --sector-size 2KiB --num-sectors 2
```

Create the genesis block and start up the first node:

```sh
./lotus-seed genesis new localnet.json
./lotus-seed genesis add-miner localnet.json ~/.genesis-sectors/pre-seal-t01000.json
./lotus daemon --lotus-make-genesis=devgen.car --genesis-template=localnet.json --bootstrap=false
```

Then, in another console, import the genesis miner key:

```sh
./lotus wallet import --as-default ~/.genesis-sectors/pre-seal-t01000.key
```

Set up the genesis miner:

```sh
./lotus-miner init --genesis-miner --actor=t01000 --sector-size=2KiB --pre-sealed-sectors=~/.genesis-sectors --pre-sealed-metadata=~/.genesis-sectors/pre-seal-t01000.json --nosync
```

Now, finally, start up the miner:

```sh
./lotus-miner run --nosync
```

If all went well, you will have your own local Lotus Devnet running.
