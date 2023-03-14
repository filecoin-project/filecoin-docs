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




