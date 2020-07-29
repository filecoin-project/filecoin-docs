---
title: IPFS 与 Filecoin
description: 了解 IPFS 与 Filecoin 之间的关系以及在应用方面的差异。
---

# IPFS 与 Filecoin

Filecoin 和 IPFS 是去中心化网络中存储与共享数据的互补的协议。当然，用户并不需要同时使用 Filecoin 和 IPFS，二者的结合解决了当前 web 2.0 网络的重大缺陷。这篇内容会介绍这两个协议的关系，协助用户根据实际需求进行选择搭配。

## 用激励提升数据的可靠性

[IPFS](https://ipfs.io) 是一个开源免费的网络栈协议，它使得用户之间可以存储和传输可验证的数据。IPFS 用户通过 [pinning](https://docs-beta.ipfs.io/concepts/persistence/#pinning-in-context) 将数据持久的存储在自己或第三方的云服务上面，抑或是通过由独立的用户组成的面向社区的系统来共享资源，从而确保内容持久存在。

Filecoin 希望通过内建经济激励机制，促进用户在存储节点市场中以比较有竞争力的价格实现长期的分布式文件存储，同时又能保持 IPFS 网络提供的效率和弹性。

## 不同的持久化策略：我该用哪个？

取决于你的实际用例，以下几种数据持久化策略都可能适合你。

### 使用 IPFS

就像前面介绍的，在 IPFS 网络中，主机使用 pinning 功能让数据持久化的保存在主机中。当用户节点离线时，为了保留数据数据，用户必须依赖其他的节点去 pin 住它那些要保留的数据，或者使用中心化的 pinning 服务（通常是在云计算平台上运行长期的在线的节点）。

当一个或多个组织在内部网络（Intranet）上共享流行文件时，依赖无私的 peers 来缓存数据可能会很有效。也可以依靠健壮的社会契约来确保内容长期托管和维护。IPFS 网络中的大多数用户使用 pinning 服务。

### 使用 Filecoin

最后一个选项是将你的数据存储在像 Filecoin 一样的去中心化的存储市场上。在 Filecoin 的体系中，客户定期的向矿工支付少量的费用来存储文件，矿工持续的去验证客户文件的完整性并进行存储，同时确保用户可以快速的取回文件。这种付费存储机制，让 Filecoin 矿工有动力确保客户的文件被妥善存储。相比于 IPFS 网络中保障文件妥善存储要依赖其他网络用户的慷慨而言，Filecoin 的付费存储机制显然更有优势。

## 由 IPFS 驱动的 Filecoin

首先，重要的是我们需要了解 Filecoin 建立在 IPFS 之上。Filecoin 旨在实现与 IPFS 底层功能的高度无缝集成的存储市场，从这种意义上来说，他们是彼此联结的，同时又可以被完全的分离开来。用户不需要与 Filecoin 交互也能使用 IPFS。

Filecoin 中与 IPFS 共享的一些功能包括：

- [IPLD](https://ipld.io/) 在区块链数据结构中的应用
- 通过 [libp2p](https://libp2p.io/) 在 Filecoin 节点之间建立安全连接
- [libp2p](https://libp2p.io/) pubsub 促进 Filecoin 节点之间的消息传递和区块传播
- Filecoin 中的 CID 与 IPFS 共享同一套哈希规范
- [graphsync](https://github.com/ipfs/go-graphsync) 应用于节点之间的数据传输，未来将实现 IPFS 与 Filecoin 节点之间建立直连传输。

**希望了解更多？** 这里很快会更新有关两种协议的更多示例！
