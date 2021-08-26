---
title: 'Lotus Miner: connectivity'
description: 'This guide shows tips and tricks to improve miner connectivity.'
breadcrumb: 'Connectivity'
---

# {{ $frontmatter.title }}

Filecoin miners, like participants in all peer-to-peer protocols, require a steady and quality pool of peers to communicate with in order to perform their various functions. {{ $frontmatter.description }} This complements the [connectivity section](miner-setup.md#connectivity-to-the-miner) in the setup instructions and the [seal workers](seal-workers.md) guide.

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

- For checking publicly-accessible IPs, you can use one of the many online checkers like [this](https://www.yougetsignal.com/tools/open-ports/), or [this](https://ping.eu/port-chk).
- For LANs (but also for public IPs), you use the netcat tool from a different computer: `ncat -w 5 <PUBLIC_IP> <PORT>` (if it returns with a non-zero exit code or an error it means that a connection cannot be stablished.
- Also Telnet: `telnet <PUBLIC_IP> <PORT>`.
- You can use your favourite search engine for more ways specifically related to your setup and environment.

## Lotus miner reachability

When the lotus miner is running and reachable, it should report it with:

```sh
$ lotus-miner net reachability
AutoNAT status:  Public
Public address:  /ip4/<IP>/tcp/<port>
```

Verify that the Public address corresponds to what you expect. `AutoNAT status: Private` means that the Lotus Miner is not reachable on any of the announced addresses.

## Checking peer count

To ensure storage and retrieval deals operate smoothly, it is recommended to check how many peers a miner is connected to after each start-up:

```sh
lotus-miner net peers
```

The peer count should increase soon after starting the miner. You can also manually connect to peers with:

```sh
lotus-miner net connect <address1> <address2>...
```

An list of bootstrap peers is available for [mainnet](https://github.com/filecoin-project/lotus/blob/master/build/bootstrap/mainnet.pi) Bootstrap peers are unique per network, so be sure to use the list corresponding to your desired network.  Other bootstrap lists are located [here](https://github.com/filecoin-project/lotus/blob/master/build/bootstrap/).

## Port forwarding

If you are running on a NAT'ed environment (i.e. the usual case in a home setup, where there is a router that controls access from and to the internet), sometimes it is necessary to enable port forwarding from an external port to the miner's port.

:::tip
Instructions vary wildy depending on brand model. Please use your favourite search engine to discover how to enable port forwarding for your router
:::

## Obtaining a public IP

If you do not control the NAT/Firewall that your device is behind (such as within enterprise networks and other firewalls), there is an alternative solution for you. You can set up a **relay endpoint** so that your miner can relay its internet traffic through an external, publicly dialable endpoint.

There are multiple ways to achieve this:

- Using A VPN service. We recommend Wireguard-powered IPv6 VPN services which will provide you with a publicly routable IPv6 address.
- Using an [SSH Reverse Tunnel](https://www.howtogeek.com/428413/what-is-reverse-ssh-tunneling-and-how-to-use-it) to set up a proxy between a machine with a public IP and the miner.

## Common errors

The [troubleshooting page](miner-troubleshooting.md#common-connectivity-errors) has a list of common connectivity errors.
