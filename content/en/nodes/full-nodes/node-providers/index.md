---
title: "Node providers"
description: "This page covers what remote nodes are, and how developers can use them to connect to the Filecoin network."
lead: "A node providers, sometimes specifically called a _remote node providers_, are services that offers access to remote nodes on the Filecoin network."
draft: false
images: []
type: docs
menu:
  nodes:
    parent: "nodes-full-nodes"    
    identifier: "node-providers-58a50d5583518ff60c2c708c895fee07"
weight: 100
toc: true
aliases:
    - "/nodes/node-providers"
    - "/nodes/node-providers/ankr"
    - "/nodes/node-providers/chainstack"
    - "/nodes/node-providers/glif"
---

Nodes are essential components of the Filecoin network. They maintain copies of the blockchain's entire transaction history and verify the validity of new transactions and blocks. Running a node requires significant computational resources and storage capacity, which can be demanding for individual developers or teams.

## Benefits

Remote node providers address this challenge by hosting and maintaining Filecoin nodes on behalf of their clients. By utilizing a remote node provider, developers can access blockchain data, submit transactions, and query the network without the need to synchronize the entire blockchain or manage the infrastructure themselves. This offers convenience and scalability, particularly for applications or services that require frequent and real-time access to blockchain data.

Remote node providers typically offer APIs or other communication protocols to facilitate seamless integration with their hosted nodes. These APIs allow developers to interact with the Filecoin network, retrieve data, and execute transactions programmatically.

## Potential drawbacks

It's important to note that when using a remote node provider, developers are relying on the provider's infrastructure and trustworthiness. You should carefully choose a reliable and secure provider to ensure the integrity and privacy of their interactions with the blockchain network.

Node providers often limit the specifications of the nodes that they offer. Some developers may need particularly speedy nodes or nodes that contain the entire history of the blockchain (which can be incredibly expensive to store).

## Node providers

There are multiple node providers for the Filecoin mainnet and each of the testnets. Checkout the [Networks section]({{< relref "networks" >}}) for details.
