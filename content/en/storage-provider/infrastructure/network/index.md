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
    parent: "lorem"
    identifier: "network-f01027668c6cdc4e458959c512d126b0"
weight: 142
toc: true
---

There are multiple aspects to be discussed when it comes to network requirements.
First of all there is the internet bandwidth. Depending on the deal size and customer expectations you will need anything between 1Gbps and 10Gbps. It is possible to run at 1Gbps but you will not receive client data faster than ~100 MB/s, which might be insufficient.
If you would be running a Saturn L1 CDN node on your setup as well, 10Gbps is a requirement.

The network bandwidth for the copy task between PC1 and PC2 are also a important. Our theoretical 7TiB/day sealing capacity will be hindered by the network performance between PC1 and PC2. Any internal connectivity should be at least 10Gbps, with faster connectivity being more favorable.

Keep in mind that not just your servers and switches must be capable of delivering the required throughput, but also your firewall. If your Boost instance sits behind your firewall, you will not get data in any faster than what the firewall is capable of.

The same applies to inter-VLAN traffic. If you use firewall rules between your VLANs (which you should), your firewall is again likely to be the bottleneck. It is strongly advised to have all sealing workers, the Lotus miner and the storage system in the same VLAN. These systems require data access and copy data across each other via your network. Having them in the same VLAN keeps all traffic between them at layer 2, not involving routing and firewalling.