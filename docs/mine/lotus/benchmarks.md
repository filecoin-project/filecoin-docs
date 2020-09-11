---
title: 'Lotus Miner: Benchmarks'
description: 'This guides describe how to perform some benchmarks using Lotus.'
breadcrumb: 'Benchmarks'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Lotus comes with a [benchmarking tool](https://github.com/filecoin-project/lotus/tree/master/cmd/lotus-bench) that can be used to test how long the different, resource-intensive mining operations take.

## Installation

Run the following command in the Lotus repository folder (that you checked out during the [installation](../../store/lotus/installation.md):

```
make lotus-bench
```

This will produce a `lotus-bench` binary in the current folder.

## Usage

```sh
./lotus-bench --help
```

Use the self-documenting feature of the tool to explore the different commands. For example, you can test sealing by running:

```sh
./lotus-bench sealing --sector-size=2KiB
```
