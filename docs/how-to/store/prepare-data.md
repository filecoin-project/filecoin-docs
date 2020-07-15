---
title: Preparing data
description: Learn how to prepare data for storage.
---

# Is this section for you?

Most likely you will use Filecoin as a part of a larger system (eg. [Textile Hub](https://docs.textile.io/hub/), [Starling](https://github.com/filecoin-project/starling), [Space Daemon](https://blog.fleek.co/posts/daemon-release)) that takes care of many details for you.

If you would like to store data directly onto Filecoin using a Filecoin implementation such as [Lotus](https://lotu.sh/), you will need to understand some basic concepts and limits.

### Sector Sizes

When you store data directly on the Filecoin Network as part of a deal, the total amount of data be must fit within a single sector. If you need to store data that is larger than a single sector, you must split the data and store it in separate sectors using multiple deals.

The simplest data source that Filecoin supports is a single file uploaded to a Filecoin node. Additionally, some Filecoin nodes can import data from sources on the network such as IPFS, referenced by a content identifier (CID). When storing content referenced by a CID, the combined amount of data must have a byte count which is smaller than the sector size.

**How big is a sector?** The Filecoin network supports several sector sizes, and storage miners will specify which size(s) they’re offering so you can select the best option for you. Miners can seal and unseal smaller sectors in less time, while larger sectors allow miners to seal more data in a single operation.

Miners will typically pack several different deals into a single sector if they will fit. Larger sectors give miners more flexibility in combining deals, but miners may also have to wait longer to find enough data before they seal the sector. If the data to seal is smaller than the sector, the sealing process will pad the sector with empty (wasted) data. Miners are required to store a copy of a sector until all the deals sealed within have expired. Once a sector is sealed, it is impossible to modify or add data to it. Losing or destroying a sector prematurely will incur a penalty for the miner.

Testnet and Mainnet will only support 32GiB and 64GiB sectors. Smaller sector sizes are available to developers, which seal faster, but are not secure enough to use in the production network.

Note that there is a small amount of overhead required by the proofs, so in practice, the maximum file size is slightly smaller than the physical sector size. There is also a minimum file size.

| Sector Size       | Minimum File Size | Maximum File Size    | Overhead          |
| ----------------- | ----------------- | -------------------- | ----------------- |
| 2KiB (dev only)   | 128 bytes         | 2,032 bytes          | 16 bytes          |
| 8MiB (dev only)   | 128 bytes         | 8,323,072 bytes      | 65,536 bytes      |
| 512MiB (dev only) | 128 bytes         | 532,676,608 bytes    | 4,194,304 bytes   |
| 32GiB             | 128 bytes         | 34,091,302,912 bytes | 268,435,456 bytes |
| 64GiB             | 128 bytes         | 68,182,605,824 bytes | 536,870,912 bytes |

**FIXME**: These aren't the real limits ... do some testing to determine actual limits.

In the future, Filecoin may support additional proofs which may have different sector sizes.

### For data larger than a sector

If an individual file is larger, you’ll have to split it into multiple smaller files first. There are many ways to do this. Check out the [large files](./large-files) tutorial for a simple way to do this using standard Unix command line tools.

### For files within a directory

Each storage deal is for a single file. To store many files within a directory structure in a single storage operation (also known as storage deal), first flatten them into .zip, .car, or another archive file format. You can also store files in IPFS and create a storage deal for the CID if all the data will fit into a single sector. Other systems which store their data on Filecoin (such as [Textile Buckets](https://docs.textile.io/buckets/)) may take care of this for you.

### IPLD and CAR files

[IPLD](https://ipld.io/) is a data model for working with hash-linked data structures which is used natively by systems such as [IPFS](https://ipfs.io/) and Filecoin. IPLD data structures can be stored in binary files, known as CAR files ([Content Addressible Archive](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md)) that can imported or exported from Filecoin, IPFS or other systems that support it. It is possible to sync data from IPFS into Filecoin directly over the network using a CID, and then retrieve it as a CAR file, or vice-versa.

### Offline Deals

If you have huge amounts of data, sending it all to a Filecoin miner via the Internet may not be possible. Filecoin also supports "Offline Deals", where you
can negotiate a deal, and then put the data on physical media such as hard drives and ship it to the miner. See [Offline Deals](./offline-deals.md) to learn more.
