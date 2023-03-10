---
title: "Network skills"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "Network-skills-573588bb794fe86159ac9bf17e40fecb"
weight: 210
toc: true
---
Understanding networking is an important part of building a high performing, well balanced Storage Provider setup. Not having the right network architecture will easily lead to bad performance. Knowing where the bottlenecks in the setup are, is important.
## Performance
As we are dealing with high network throughput requirements between multiple systems (to and from Boost, between the PC1 and PC2 workers and from PC2 to lotus-miner) it is worth learning to work with `iperf` and `iperf3` which allow for easy network benchmarking.

As a Storage Provider you also have to make the trade-off between performance and cost for your setup. Not everybody needs 100 GbE. It requires some calculation to know if you should invest in a higher bandwidth network or not.

## Segmentation
A Storage Provider setup has a mixture of public-facing components (Lotus daemon and Boost for instance) and internal systems. It is therefore wise to implement VLAN tagging and segment your network appropriately. With that you can implement firewall rules across your network segments.

## Redundancy
Apart from performance is redundancy on a network level very important. Concepts like NIC bonding, LACP and MCLAG are industry standards when it comes to architecting a redundant network.

## Architectures
Depending on the size of your setup you might choose for a more scalable network architecture like spine-leaf, or stay with a simple 2-tier architecture (collapsed core).

Spine-leaf network architectures are the best choice when you need to scale horizontally at Layer 2. Having more L2 leaf switches that connect to the spine switches provides predictable latency and linear scalability of your setup. 

This architecture is only required though if you plan to outgrow the typical limit of 48 ports on your access switch. Smaller setups can easily be set up with redundant L3 switches that connect into redundant routers/firewalls.



