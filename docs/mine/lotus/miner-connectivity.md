---
title: 'Lotus Miner: connectivity'
description: 'This guides shows how to verify that a miner is reachable on its public IP addresses.'
breadcrumb: 'Connectivity'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} This complements the [connectivity section](miner-setup.md#connectivity-to-the-miner) in the setup instructions.

[[TOC]]

## Finding your public IP address

Usually, you can find your public IP address using a service like ifconfig.me. Running the following command from the miner machine shows which IP is seen by others:

```sh
curl ifconfig.me
```

::: warning
The returned IP will not be the right one in some setups in which outgoing traffic is routed through a different exit point (i.e. a NAT gateway), than incoming traffic, and thus, presents a different IP. You should be familiar with your own network setup!
:::

## Testing connectivity to your public IP address/port

There are different methods to test this:

- You can use one of the [many online checkers](https://www.yougetsignal.com/tools/open-ports/)
- You can use IPFS on different machine: `ipfs swarm connect /ip4/<PUBLIC_IP>/tcp/<PORT>/p2p/<MINER_ID>` (the miner ID can be obtained with `lotus-miner net id`.
- You use the netcat tool from a different computer: `ncat -w 5 <PUBLIC_IP> <PORT>` (if it returns with a non-zero exit code or an error it means that a connection cannot be stablished.
- You can use your favourite search engine for more ways.
