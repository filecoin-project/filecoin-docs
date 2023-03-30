---
title: "Network"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-infrastructure"
    identifier: "network-f01027668c6cdc4e458959c512d126b0"
weight: 142
toc: true
---

There are multiple aspects to be considered when it comes to network requirements.

## Internet bandwidth

First of all there is the internet bandwidth. Depending on the deal size and customer expectations you will need anything between 1Gbps and 10Gbps. It is possible to run at 1Gbps, but you will not receive client data faster than ~100 MB/s, which might be insufficient.
If you would be running a [Saturn](https://strn.network) L1 CDN node on your setup as well, 10Gbps is the minimum requirement.

## LAN bandwidth

The network bandwidth for the copying data between the PC1 and PC2 stages is also important. Any planned sealing capacity will be limited by the network performance between PC1 and PC2. Internal connectivity should be at least 10Gbps.

Keep in mind that not just your servers and switches must be capable of delivering the required throughput, but also make sure your firewall doesn't limit the overall throughput.

## VLANs

The same applies to inter-VLAN traffic. If you use firewall rules between your VLANs (which you should), your firewall is again likely to be the bottleneck. It is strongly advised to have all sealing workers, the Lotus miner and the storage system in the same VLAN. These systems require data access and copy data across each other via your network. Having them in the same VLAN keeps all traffic between them at layer 2, not involving routing and firewalling.

## Redundancy

Apart from performance, redundancy on a network level is very important, so that individual networking components can fail (and be replaced) without breaking the whole network. Concepts like NIC bonding, LACP and MCLAG are industry standards when it comes to architecting a redundant network.

## Common topologies

Depending on the size of your setup you might choose for a more scalable network architecture like spine-leaf, or stay with a simple 2-tier architecture (collapsed core).

Spine-leaf network architectures are the best choice when you need to scale horizontally at Layer 2. Having more L2 leaf switches that connect to the spine switches provides predictable latency and linear scalability of your setup.

This architecture is only required though if you plan to outgrow the typical maximum of 48 ports on your access switch. Smaller setups can easily be set up with redundant L3 switches that connect into redundant routers/firewalls.
