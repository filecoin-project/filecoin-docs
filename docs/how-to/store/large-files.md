---
title: Very large files
description: Learn how to store very large files.
---

# Storing very large files

When storing files larger than 1 terabyte (1 TB), there are a few important considerations:

## Recommended file format: CAR

Filecoin can store any file format; but for very large files, it is recommended to use [CAR (Content Addressable ARchive) format](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md). CAR files have a header block containing the root CIDs of the graphs in the file, thus allowing for more granular retrieval queries.

[TODO: Example of real data indexed and pointers to the subset that can grab that specific data, to help ppl think about splitting data up better for their use cases and specific file formats.]

## Maximizing storage

The simple recommendation is that files must be smaller than a sector. Colloquially, sectors are referred to as 1MB, 32GB, etc. To fully maximize storage usage, chunks can be fractionally larger. This is due to a combination of quirks:

- **Binary size:** Filecoin uses base 2 (binary) sizes. A "1MB sector" is actually 1MiB, or 1,048,576 bytes not 1,000,000 bytes.
- **Padding:** For every 256 bits, subtract 2 bits (used by the Proofs processes). The remainder, 254 bits, is the usable storage space.

**Example:**
A 1MiB sector is 1,048,576 bytes. Next, multiply that by 254/256. Result: a 1MiB sector can hold 1,040,384 bytes of stored data.

| Sector Size | Simplified Max Filesize     | Absolute Max Filesize |
| ----------- | --------------------------- | --------------------- |
| 2KiB        | 2KB (2,000 bytes)           | 2,032 bytes           |
| 8MiB        | 8MB (8,000,000 bytes)       | 8,323,072 bytes       |
| 512MiB      | 512MB (512,000,000 bytes)   | 532,676,608 bytes     |
| 32GiB       | 32GB (32,000,000,000 bytes) | 34,091,302,912 bytes  |

## Storage deals with offline data transfer

Filecoin's offline data transfer feature is recommended for petabyte-scale datasets and larger. This allows users with very large datasets to complete the data transfer step offline (e.g. by shipping hard drives from the client to the storage miner), while the storage deal continues to work as intended on-chain.

It is implemented via a flag on the storage deal command that tells the client not to transfer the data over the network, and provides a piece CID (a unique identifier describing the data) to the miner instead, which a miner must then match for the deal to go through. This gives the client node flexibility in how it can set up the deal — for example, passing miners a specific location on a hard drive for the data they can use to generate the piece CID. 

### Performing deals with an offline data transfer

This section outlines the steps required to perform a storage deal through an offline data transfer.

#### Generate a unique piece CID

1. Use the Lotus client to generate a CAR file of the input:
    ```
    lotus client generate-car <inputPath> <outputPath>.
    ```
    
2. Use the Lotus client to generate the piece CID:
    ```
    lotus client commP <inputCarFilePath> <minerAddress>
    ```

#### Identify a suitable miner
Currently, 

####  Propose an offline deal
Propose the offline deal with the miner:

```
lotus client deal --manual-piece-cid=CID --manual-piece-size=datasize <Data CID> <miner> <price> <duration>
```

#### Transfer the data to the miner offline
This can be done several ways, such as shipping hard drives from the client to the storage miner.

#### Finalizing: The miner's role
The miner can import the data and deal manually with:

```            
lotus-miner deals import-data <dealCid> <filePath>
```

Once the first Proof of Spacetime (PoSt) hits the chain, the storage deal is considered active. 
