---
title: 为何选择 Filecoin？
description: 探索使 Filecoin 成为引人注目的文件存储系统的功能。
---

# 为何选择 Filecoin？

这时一个功能概览，它们让 Filecoin 成为引人注目的文件存储系统。本概览面向那些已经接触过大规模数据存储（例如：云存储或点对点存储网络）的人。

### 开放的市场

在 Filecoin 网路中，文件存储和取回在开放的市场中协商。无需特权，任何人都可以加入到 Filecoin 网络。运行一个矿机仅需要接入互联网和空闲的磁盘空间。通过降低准入门槛，Filecoin 将无数的独立存储提供者组成了一个繁荣的生态系统。

### 有竞争力的价格

存储和检索的价格由供需双方决定，不受任何定价部门制约。Filecoin 让可靠的存储拥有极具竞争力的价格。矿工之间的竞争基于存储、可靠性和速度，而不是营销或其他试图锁定用户的手段。

### 可靠的存储

由于是付费存储，Filecoin 为文件在一定的时间段内持续可用提供了一个可行的经济理由。文件被存储在可靠且妥善联网的计算机中。

### 自愈能力

Filecoin 网络持续验证文件是否被妥善存储。Filecoin 区块链拥有内建的自愈功能，探测到故障矿机时，文件会被自动分发到其他可用的矿机上。

### 可验证性追踪

In the process of self-healing, Filecoin generates verifiable traces that files have been stored correctly over time. Clients can efficiently scan these traces to confirm that their files have been stored correctly, even if the client was offline at the time. Any observer can check any miner’s track record and will notice if the miner has been faulty or offline in the past.

::: callout
[Learn about storage verification at ProtoSchool](https://proto.school/#/verifying-storage-on-filecoin)
:::

### 重声誉，轻营销

In Filecoin, storage providers prove their reliability through their track record published on the blockchain, not through marketing claims published by the provider themselves. Users don’t need to rely on status pages or self-reported statistics from storage providers.

### 自由交易

Users get to choose their own tradeoffs between cost, redundancy and speed. Users are not limited to a set list of data centers offered by their provider, but can choose to store their files on any miner participating in Filecoin.

### 使用清空的存储

Filecoin puts disk space that would otherwise sit empty to use. Miners are incentivized to join Filecoin because they get paid for their participation, unlike other distributed networks where there is no economic incentive. Filecoin also makes it easy to join because miners self-manage their storage, earning Filecoin tokens without needing human supervision.

### 审查免疫

Filecoin resists censorship because there is no central provider that can be coerced into deleting files or withholding service. The network is made up of many different computers run by many different people and organizations. Faulty or malicious actors are noticed by the network and removed automatically.

### 有用的区块链

In Filecoin, miners are rewarded for providing storage, not for performing wasteful computations. Filecoin secures its blockchain using proof of file replication and proof of storage over time. It doesn’t rely on energy-intensive proof-of-work schemes like other blockchains. Miners are incentivized to amass hard drives and put them to use by storing files. Filecoin doesn’t incentivize hoarding of graphics cards or application-specific integrated circuits for the sole purpose of mining.

### 为其他区块链提供存储

Filecoin’s blockchain is designed to facilitate the storing of large files, whereas other blockchains can typically only store very small amounts of data, very expensively. Filecoin can provide storage to other blockchains, allowing them to store large files. In the future, mechanisms will be added to Filecoin enabling transactions on Filecoin’s blockchain to interoperate with transactions on other blockchains.

### 内容寻址

Files are referred to by the data they contain, not by fragile identifiers such as URLs. Files remain available no matter where they are hosted or who they are hosted by. When a file becomes popular it can be quickly distributed by swarms of computers instead of relying on a central computer which can become overloaded by network traffic.

When multiple users store the same file (and choose to make the file public by not encrypting it), everyone who wants to download the file benefits from Filecoin keeping it available. No matter where a file is downloaded from, downloaders can verify that they have received the correct file and that it is intact.

### 内容分发网络

Retrieval miners are computers that have good network connections to lots of users who want to download files. By prefetching popular files and distributing them to nearby users, retrieval miners are rewarded for making network traffic flow smoothly and files download quickly.

### 单一协议

Applications implementing Filecoin can store their data on any miner using the same protocol. There isn’t a different API to implement for each provider. Applications wishing to support several different providers aren’t limited to the lowest-common-denominator set of features supported by all their providers.

### 没有壁垒

Migrating to a different storage provider is made easier because they all offer the same set of services and API. Users aren’t locked in to providers because they rely on a particular feature of the provider. In addition, files are content-addressed, which enables them to be transferred directly between miners without the user having to download and re-upload the files.

Traditional cloud storage providers lock users in by making it cheap to store files but expensive to retrieve them again. Filecoin avoids this by facilitating a retrieval market where miners compete to give users their files back as fast as possible, at the lowest possible price.

### 开放源代码

The code that runs both clients and storage providers is open source. Storage providers don’t have to develop their own software for managing their infrastructure. Everyone benefits from improvements made to Filecoin’s code.

### 活跃的社区

Filecoin has an active community of contributors to answer questions and help newcomers get started. There is an open dialog between users, developers and storage providers. If you need help, you will likely be able to reach the person who designed or built the system in question. Reach out on [Filecoin’s chat and forums](../community/chat-and-discussion-forums.md).
