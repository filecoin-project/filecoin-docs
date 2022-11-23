---
title: "Explore the network"
description: "There are several ways to explore and get insights from the Filecoin network."
menu:
    getstarted:
        parent: "getstarted-explore"
weight: 7
---

## Account, actor & message explorers

Account, actor & transaction explors allow you to view the states of a Fielcoin accounts and actors(smart contracts) and the details of the messages sent in the Filecoin network.

### Glif Explorer
Website: [https://explorer.glif.io](https://explorer.glif.io)

## Block explorers

Block explorers allow you to view the details of the Filecoin network on a single website. Individual block explorers contain different features that may be useful. None of these sites are created or maintained by Protocol Labs or the Filecoin Foundation. This list is in alphabetical order:

### Filfox

Website: [filfox.io](https://filfox.io)

![](filfox.png)

### Filscan

Website: [filscan.io](https://filscan.io)

![](filscan.png)

### Filscout

Website: [filscout](https://filscout.io)

![](filscout.png)

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

