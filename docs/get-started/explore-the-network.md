---
title: Explore the network
description: There are several ways to explore and get insights from the Filecoin network.
breadcrumb: 'Explore the Network'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

## Block explorers

| Name                                                 | Screenshot                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| [Filscan](https://filscan.io/)                       | <img src="./images/explore-the-filecoin-chain/filscan.png" width="400">   |
| [Filscout](https://filscout.io/)                     | <img src="./images/explore-the-filecoin-chain/filscout.png" width="400">  |
| [Filfox](https://filfox.io/)                         | <img src="./images/explore-the-filecoin-chain/filfox.png" width="400">    |
| [Filplorer](https://filplorer.com/)                  | <img src="./images/explore-the-filecoin-chain/filplorer.png" width="400"> |
| [1475 Explorer](https://1475ipfs.com/#/blockBrowser) | <img src="./images/explore-the-filecoin-chain/1475ipfs.png" width="400">  |

## Lotus

Once you are [setup with Lotus](lotus/README.md) you can use the command line to query information about the nework.

Get the head tipset:

```sh
lotus chain head
```

Print a block:

```sh
lotus chain getblock <block_cid>
```

Print message information:

```sh
lotus chain getmessage <message_cid>
```

For additional chain-related commands check:

```sh
lotus chain --help
```
