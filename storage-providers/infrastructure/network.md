---
description: >-
  This page covers topics related to internet bandwidth requirements, LAN
  bandwidth considerations, the use of VLANs for network traffic separation,
  network redundancy measures, and common topologies.
---

# Network

## Internet bandwidth

The amount of internet bandwidth required for a network largely depends on the size of the organization and customer expectations. A bandwidth between 1 Gbps and 10 Gbps is generally sufficient for most organizations, but the specific requirements should be determined based on the expected traffic. A minimum bandwidth of 10 Gbps is recommended for setups that include a [Saturn](https://saturn.tech) node. Saturn requires a high-speed connection to handle large amounts of data.

## LAN bandwidth

The bandwidth between different components of a network is also important, especially when transferring data between servers. The internal connectivity between servers should be at least 10 Gbps to ensure that planned sealing capacity is not limited by network performance. It is important to ensure that the servers and switches are capable of delivering the required throughput, and that firewalls are not the bottleneck for this throughput.

## VLANs

Virtual Local Area Networks (VLANs) are commonly used to separate network traffic and enhance security. However, if firewall rules are implemented between VLANs, the firewall can become the bottleneck. To prevent this, it is recommended to keep all sealing workers, Lotus miners, and storage systems in the same VLAN. This allows for data access and transfer without involving routing and firewalls, thus improving network performance.

## Redundancy

Network redundancy is crucial to prevent downtime and ensure uninterrupted operations. By implementing redundancy, individual networking components can fail without disrupting the entire network. Common industry standards for network redundancy include NIC (network interface card) bonding, LACP (Link Aggregation Control Protocol), or MCLAG (Multi-Chassis Link Aggregation Group).

## Common topologies

Depending on the size of the network, different network topologies may be used to optimize performance and scalability. For larger networks, a spine-leaf architecture may be used, while smaller networks may use a simple two-tier architecture.

Spine-leaf architectures provide predictable latency and linear scalability by having multiple L2 leaf switches that connect to the spine switches. On the other hand, smaller networks can be set up with redundant L3 switches or a collapsed spine/leaf design that connect to redundant routers/firewalls.

It is important to determine the appropriate topology based on the specific needs of the organization.



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/storage-providers/infrastructure/network)
