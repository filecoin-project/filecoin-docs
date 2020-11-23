---
title: 'Lotus Miner: Benchmarks'
description: 'This guides describe how to perform some benchmarks using Lotus.'
breadcrumb: 'Benchmarks'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Lotus comes with a [benchmarking tool](https://github.com/filecoin-project/lotus/tree/master/cmd/lotus-bench) that can be used to test how long each resource-intensive mining operation takes.

## Installation

1. You must have the Lotus repository on your computer. If you do not have an existing copy of the repository, [clone it from GitHub](https://github.com/filecoin-project/lotus/):

   ```bash
   git clone https://github.com/filecoin-project/lotus.git ~/lotus

   > Cloning into '/root/lotus'...
   > remote: Enumerating objects: 93, done.
   > ...
   > Resolving deltas: 100% (51531/51531), done.
   ```

1. The `lotus` binary must be built and within the `~/lotus` repository folder. If you just cloned the repository now, or have misplaced the `lotus` binary, build the project:

   ```bash
   cd ~/lotus
   make clean all && make install


   > rm -rf  build/.filecoin-install build/.update-modules  lotus lotus-miner lotus-worker lotus-shed lotus-gateway lotus-seed lotus-pond lotus-townhall lotus-fountain lotus-chainwatch lotus-bench lotus-stats lotus-pcr lotus-health lotus-wallet testground
   > make -C extern/filecoin-ffi/ clean
   > ...
   > install -C ./lotus /usr/local/bin/lotus
   > install -C ./lotus-miner /usr/local/bin/lotus-miner
   > install -C ./lotus-worker /usr/local/bin/lotus-worker
   ```

1. Call `make lotus-bench` to build the Lotus benchmark binary:

   ```bash
   make lotus-bench

   > rm -f lotus-bench
   > go build -o lotus-bench ./cmd/lotus-bench
   > ...
   > go run github.com/GeertJohan/go.rice/rice append --exec lotus-bench -i ./build
   ```

   This will produce a `lotus-bench` binary in the current folder.

1. You can now run `lotus-bench` against your system.

## Usage

Use the self-documenting feature of the tool to explore the different commands.

```bash
    ./lotus-bench --help

    > NAME:
    > lotus-bench - Benchmark performance of lotus on your hardware
    >
    > USAGE:
    > lotus-bench [global options] command [command options] [arguments...]
    >
    > VERSION:
    > 1.2.0
    >
    > COMMANDS:
    > prove    Benchmark a proof computation
    > sealing
    > import   benchmark chain import and validation
    > help, h  Shows a list of commands or help for one command
    >
    > GLOBAL OPTIONS:
    > --help, -h     show help (default: false)
    > --version, -v  print the version (default: false)
```

## Commands

### Prove

Benchmark a proof computation using `lotus-bench prove [command options] [arguments...]`. For example:

```bash
./lotus-bench prove
```

### Sealing

### Import
