---
title: 'Lotus Miner: connectivity'
description: 'This guides shows how to verify that a miner is reachable on its IP addresses when needed.'
breadcrumb: 'Connectivity'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} This complements the [connectivity section](miner-setup.md#connectivity-to-the-miner) in the setup instructions and the [seal workers](seal-workers.md) guide.

[[TOC]]

## Finding your public IP address

Usually, you can find your public IP address using a service like ifconfig.me. Running the following command from the miner machine shows which IP is seen by others:

```sh
curl ifconfig.me
```

::: warning
The returned IP will not be the right one in some setups in which outgoing traffic is routed through a different exit point (i.e. a NAT gateway), than incoming traffic, and thus, presents a different IP. You should be familiar with your own network setup!
:::

## Testing connectivity to your an IP address/port

There are different methods to test this:

- For checking publicly-accessible IPs, you can use one of the [many online checkers](https://www.yougetsignal.com/tools/open-ports/)
- For LANs (but also for public IPs), you use the netcat tool from a different computer: `ncat -w 5 <PUBLIC_IP> <PORT>` (if it returns with a non-zero exit code or an error it means that a connection cannot be stablished.
- Also Telnet: `telnet <PUBLIC_IP> <PORT>`.
- You can use your favourite search engine for more ways specifically related to your setup and environment.
