---
title: "Block explorers"
description: "There are several ways to explore and get insights from the Filecoin network."
lead: "There are several ways to explore and get insights from the Filecoin network."
draft: false
images: []
type: docs
menu:
  developers:
    parent: "lorem"
    identifier: "block-explorers-09748f8479fcadf867afa042f9e4e1a7"
weight: 100
toc: true
aliases:
    - /get-started/explore-the-network/
---

## Account, actor & message explorers

These explorers allow you to view the states of Filecoin accounts and actors (smart contracts) and the details of messages sent across the network.

### Glif Explorer

Website: [explorer.glif.io](https://explorer.glif.io)

## Block explorers

Block explorers allow you to view the details of the Filecoin network on a single website. Individual block explorers contain different features that may be useful. None of these sites are created or maintained by Protocol Labs or the Filecoin Foundation. This list is in alphabetical order:

### Filfox

Website: [filfox.io](https://filfox.io)

![Filfox website.](filfox.png)

### Filscan

Website: [filscan.io](https://filscan.io)

![Filscan website.](filscan.png)

### Filscout

Website: [filscout](https://filscout.io)

![Filscout website.](filscout.png)

## Lotus

Once you are [set up with Lotus](https://lotus.filecoin.io), you can use the command line to query information about the network.

Get the head tipset:

```shell
lotus chain head
```

Print a block:

```shell
lotus chain getblock <block_cid>
```

Print message information:

```shell
lotus chain getmessage <message_cid>
```

For additional chain-related commands:

```shell
lotus chain --help
```
