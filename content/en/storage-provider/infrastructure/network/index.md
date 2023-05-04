---
title: "Network"
description: "There are multiple aspects to be discussed when it comes to network requirements. Bandwidth, Vlans, and redundancy are all areas of interest."
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
weight: 520
toc: true
---

When setting up a network, there are various factors to consider to ensure optimal performance and reliability. From internet bandwidth to internal connectivity and redundancy, a well-designed network can greatly enhance productivity and prevent downtime.

## Internet bandwidth

The amount of internet bandwidth required for a network largely depends on the size of the organization and customer expectations. A bandwidth between 1Gbps and 10Gbps is generally sufficient for most organizations, but the specific requirements should be determined based on the expected traffic. A minimum bandwidth of 10Gbps is recommended for setups that include a [Saturn](https://saturn.tech) node. Saturn requires a high-speed connection to handle large amounts of data.

## LAN bandwidth

The bandwidth between different components of a network is also important, especially when transferring data between servers. The internal connectivity between servers should be at least 10Gbps to ensure that planned sealing capacity is not limited by network performance. It is important to ensure that the servers and switches are capable of delivering the required throughput, and that firewalls are not the bottleneck for this throughput.

## VLANs

Virtual Local Area Networks (VLANs) are commonly used to separate network traffic and enhance security. However, if firewall rules are implemented between VLANs, the firewall can become the bottleneck. To prevent this, it is recommended to keep all sealing workers, Lotus miners, and storage systems in the same VLAN. This allows for data access and transfer without involving routing and firewalling, thus improving network performance.

## Redundancy

Network redundancy is crucial to prevent downtime and ensure uninterrupted operations. By implementing redundancy, individual networking components can fail without disrupting the entire network. Common industry standards for network redundancy include NIC (network interface card) bonding, LACP (Link Aggregation Control Protocol), or MCLAG (Multi-Chassis Link Aggregation Group).

## Common topologies

Depending on the size of the network, different network topologies may be used to optimize performance and scalability. For larger networks, a spine-leaf architecture may be used, while smaller networks may use a simple two-tier architecture. 

Spine-leaf architectures provide predictable latency and linear scalability by having multiple L2 leaf switches that connect to the spine switches. On the other hand, smaller networks can be set up with redundant L3 switches or a collapsed spine/leaf design that connect to redundant routers/firewalls. 

It is important to determine the appropriate topology based on the specific needs of the organization.

{{< sp-calls-to-action >}}
