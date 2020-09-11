---
title: 'Lotus Miner: Custom GPUs'
description: 'This guide explains how to benchmark and test GPUs model that is not explicitally supported by the Lotus Miner.'
breadcrumb: 'Custom GPUs'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

The list of known-to-work supported GPUs is in the [hardware-requirements](../hardware-requirements.md).

## Enabling a custom GPU

If you want to test a GPU that is not explicitly supported, set the following environment variable:

```sh
export BELLMAN_CUSTOM_GPU="<NAME>:<NUMBER_OF_CORES>"
```

Here is an example of trying a GeForce GTX 1660 Ti with 1536 cores:

```sh
export BELLMAN_CUSTOM_GPU="GeForce GTX 1660 Ti:1536"
```

::: tip
To get the number of cores for your GPU, you will need to check your card's specifications.
:::

## Testing whether the GPU is used

First, to watch GPU utilization run `nvtop` in one terminal, then in a separate terminal, run the [benchmarking tool](benchmarks.md) to simulate sealing of a sector of small size:

```sh
./lotus-bench sealing --sector-size=2KiB
```

This process uses a fair amount of GPU, and generally takes ~4 minutes to complete. If you do not see any activity in nvtop from lotus during the entire process, it is likely something is misconfigured with your GPU.
