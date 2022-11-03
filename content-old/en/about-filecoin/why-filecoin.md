---
title: "Why Filecoin"
description: "Explore the features that make Filecoin a compelling system for storing files."
menu:
    about:
        parent: "about-filecoin-basics"
weight: 30
---

This is an overview of features offered by Filecoin that make it a compelling system for storing files. This overview is intended for people already involved in large-scale data storage, for example, cloud storage or peer-to-peer storage networks.

### Verifiable storage

Filecoin has built-in processes to check the history of files and verify that they have been stored correctly over time. Every storage provider proves that they are maintaining their files in every 24-hour window. Clients can efficiently scan this history to confirm that their files have been stored correctly, even if the client was offline at the time. Any observer can check any storage provider’s track record and will notice if the provider has been faulty or offline in the past.

{{< alert icon="tip" >}}
[Learn about storage verification at ProtoSchool](https://proto.school/#/verifying-storage-on-filecoin)
{{< /alert >}}

### Open market

In Filecoin, file storage and retrieval deals are negotiated in open markets. Anybody can join the Filecoin network without needing permission. Running a storage provider only requires an internet connection and spare disk space. By lowering the barriers to entry, Filecoin enables a thriving ecosystem of many independent storage providers.

### Competitive prices

Prices for storage and retrieval are determined by supply and demand, not corporate pricing departments. Filecoin makes reliable storage available at hyper-competitive prices. Miners compete based on their storage, reliability, and speed rather than through marketing or locking users in.

### Reliable storage

Because storage is paid for, Filecoin provides a viable economic reason for files to stay available over time. Files are stored on computers that are reliable and well-connected to the internet.

### Reputation, not marketing

In Filecoin, storage providers prove their reliability through their track record published on the blockchain, not through marketing claims published by the providers themselves. Users don’t need to rely on status pages or self-reported statistics from storage providers.

### Choice of tradeoffs

Users get to choose their own tradeoffs between cost, redundancy, and speed. Users are not limited to a set group of data centers offered by their provider but can choose to store their files on any storage provider participating in Filecoin.

### Censorship resistance

Filecoin resists censorship because no central provider can be coerced into deleting files or withholding service. The network is made up of many different computers run by many different people and organizations. Faulty or malicious actors are noticed by the network and removed automatically.

### Useful blockchain

In Filecoin, storage providers are rewarded for providing storage, not for performing wasteful computations. Filecoin secures its blockchain using proof of file replication and proof of storage over time. It doesn’t rely on energy-intensive proof-of-work schemes like other blockchains. Miners are incentivized to amass hard drives and put them to use by storing files. Filecoin doesn’t incentivize hoarding of graphics cards or application-specific integrated circuits for the sole purpose of mining.

### Provides storage to other blockchains

Filecoin’s blockchain is designed to store large files, whereas other blockchains can typically only store tiny amounts of data, very expensively. Filecoin can provide storage to other blockchains, allowing them to store large files. In the future, mechanisms will be added to Filecoin, enabling Filecoin’s blockchain to interoperate with transactions on other blockchains.

### Content addressing

Files are referred to by the data they contain, not by fragile identifiers such as URLs. Files remain available no matter where they are hosted or who they are hosted by. When a file becomes popular, it can be quickly distributed by swarms of computers instead of relying on a central computer, which can become overloaded by network traffic.

When multiple users store the same file (and choose to make the file public by not encrypting it), everyone who wants to download the file benefits from Filecoin keeping it available. No matter where a file is downloaded from, downloaders can verify that they have received the correct file and that it is intact.

### Content distribution network

Retrieval providers are computers that have good network connections to lots of users who want to download files. By prefetching popular files and distributing them to nearby users, retrieval providers are rewarded for making network traffic flow smoothly, and files download quickly.

### Single protocol

Applications implementing Filecoin can store their data on any storage provider using the same protocol. There isn’t a different API to implement for each provider. Applications wishing to support several different providers aren’t limited to the lowest-common-denominator set of features supported by all their providers.

### No lock-in

Migrating to a different storage provider is made easier because they all offer the same services and APIs. Users aren’t locked into providers because they rely on a particular feature of the provider. Also, files are content-addressed, enabling them to be transferred directly between providers without the user having to download and re-upload the files.

Traditional cloud storage providers lock users by making it cheap to store files but expensive to retrieve them again. Filecoin avoids this by facilitating a retrieval market where providers compete to give users their files back as fast as possible, at the lowest possible price.

### Open source code

The code that runs both clients and storage providers is open-source. Storage providers don’t have to develop their own software for managing their infrastructure. Everyone benefits from improvements made to Filecoin’s code.

### Active community

Filecoin has an active community of contributors to answer questions and help newcomers get started. There is an open dialog between users, developers, and storage providers. If you need help, you can reach the person who designed or built the system in question. Reach out on [Filecoin’s chat and forums]({{< relref "chat-and-discussion-forums" >}}).
