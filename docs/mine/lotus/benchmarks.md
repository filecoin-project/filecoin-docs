---
title: 'Lotus Miner: Benchmarks'
description: 'Lotus comes with a benchmarking tool that can be used to test how long each resource-intensive mining operation takes. This guide describes how to install the benchmarking tool, and some basic operations.'
breadcrumb: 'Benchmarks'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Installation

1. You must have the Lotus repository on your computer. If you do not have an existing copy of the repository, [clone it from GitHub](https://github.com/filecoin-project/lotus/):

   ```bash
   git clone https://github.com/filecoin-project/lotus.git ~/lotus

   > Cloning into '/root/lotus'...
   > remote: Enumerating objects: 93, done.
   > ...
   > Resolving deltas: 100% (51531/51531), done.
   ```

1. The `lotus` binary must be built and within the `~/lotus` repository folder. If you just cloned the repository or have misplaced the `lotus` binary, build the project:

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

Available options:

| Options              | Description                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `--no-gpu`           | Disable gpu usage for the benchmark run (default: false).                                |
| `--miner-addr value` | Pass miner address (only necessary if using existing sectorbuilder) (default: "t01000"). |
| `--help, -h`         | Show help (default: false).                                                              |

### Sealing

Benchmark a sealing computation using `lotus-bench sealing [command options] [arguments...]`. For example:

```bash
./lotus-bench sealing

> 2020-11-23T18:05:22.028Z        INFO    lotus-bench     lotus-bench/main.go:78  Starting lotus-bench
> ...
> ----
> results (v28) (536870912)
> seal: addPiece: 21.783625761s (23.5 MiB/s)
> seal: preCommit phase 1: 4m45.456592593s (1.794 MiB/s)
> seal: preCommit phase 2: 5m39.64126859s (1.507 MiB/s)
> seal: commit phase 1: 48.158372ms (10.38 GiB/s)
> seal: commit phase 2: 2m10.561079144s (3.922 MiB/s)
> seal: verify: 6.236412ms
> unseal: 3m52.85376877s  (2.199 MiB/s)
>
> generate candidates: 231.814µs (2.106 TiB/s)
> compute winning post proof (cold): 23.405645045s
> compute winning post proof (hot): 22.507299071s
> verify winning post proof (cold): 257.502167ms
> verify winning post proof (hot): 7.473581ms
>
> compute window post proof (cold): 7.132316755s
> compute window post proof (hot): 6.893502363s
> verify window post proof (cold): 57.524992ms
> verify window post proof (hot): 5.629919ms
```

Available options:

| Option                                     | Description                                                                                  |
| ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `--storage-dir value`                      | Path to the storage directory that will store sectors long term (default: "~/.lotus-bench"). |
| `--sector-size value`                      | Size of the sectors in bytes, i.e. 32GiB (default: "512MiB").                                |
| `--no-gpu`                                 | Disable gpu usage for the benchmark run (default: false).                                    |
| `--miner-addr value`                       | Pass miner address (only necessary if using existing sectorbuilder) (default: "t01000")      |
| `--benchmark-existing-sectorbuilder value` | pass a directory to run post timings on an existing sectorbuilder                            |
| `--json-out`                               | output results in json format (default: false)                                               |
| `--skip-commit2`                           | skip the commit2 (snark) portion of the benchmark (default: false)                           |
| `--skip-unseal`                            | skip the unseal portion of the benchmark (default: false)                                    |
| `--save-commit2-input value`               | Save commit2 input to a file                                                                 |
| `--num-sectors value`                      | (default: 1)                                                                                 |
| `--parallel value`                         | (default: 1)                                                                                 |
| `--help, -h`                               | show help (default: false)                                                                   |

### Import

Benchmark chain import and validation using `lotus-bench import command [command options] [arguments...]`. For example:

```bash
./lotus-bench import analyze import.car
```

Available commands:

| Command   | Description                |
| --------- | -------------------------- |
| `analyze` | Analyze a `.car` file.     |
| `help`    | Show the help information. |

Available options:

| Option                              | Description                                                                                                                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--start-tipset value`              | start validation at the given tipset key; in format cid1,cid2,cid3...                                                                                                                                                                   |
| `--end-tipset value`                | halt validation at the given tipset key; in format cid1,cid2,cid3...                                                                                                                                                                    |
| `--genesis-tipset value`            | genesis tipset key; in format cid1,cid2,cid3...                                                                                                                                                                                         |
| `--start-height value`              | start validation at given height; beware that chain traversal by height is very slow (default: 0)                                                                                                                                       |
| `--end-height value`                | halt validation after given height; beware that chain traversal by height is very slow (default: 0)                                                                                                                                     |
| `--batch-seal-verify-threads value` | set the parallelism factor for batch seal verification (default: 4)                                                                                                                                                                     |
| `--repodir value`                   | set the repo directory for the lotus bench run (defaults to /tmp)                                                                                                                                                                       |
| `--syscall-cache value`             | read and write syscall results from datastore                                                                                                                                                                                           |
| `--export-traces`                   | should we export execution traces (default: true)                                                                                                                                                                                       |
| `--no-import`                       | should we import the chain? if set to true chain has to be previously imported (default: false)                                                                                                                                         |
| `--global-profile`                  | (default: true)                                                                                                                                                                                                                         |
| `--only-import`                     | (default: false)                                                                                                                                                                                                                        |
| `--use-pebble`                      | (default: false)                                                                                                                                                                                                                        |
| `--use-native-badger`               | (default: false)                                                                                                                                                                                                                        |
| `--car value`                       | path to CAR file; required for import; on validation, either a CAR path or the --head flag are required                                                                                                                                 |
| `--head value`                      | tipset key of the head, useful when benchmarking validation on an existing chain store, where a CAR is not available; if both --car and --head are provided, --head takes precedence over the CAR root; the format is cid1,cid2,cid3... |
| `--help, -h`                        | show help (default: false)                                                                                                                                                                                                              |
| `--version, -v`                     | print the version (default: false)                                                                                                                                                                                                      |

