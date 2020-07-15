---
title: Very large files
description: Learn how to store very large files.
---

# Storing very large files

When storing files larger than 1 terabyte (1 TB), there are a few important considerations:

## Recommended file format: CAR

Filecoin can store any file format; but for very large files, it is recommended to use [CAR (Content Addressable ARchive) format](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md). CAR files have a header block containing the root CIDs of the graphs in the file, thus allowing for more granular retrieval queries.

[TODO: Example of real data indexed and pointers to the subset that can grab that specific data, to help ppl think about splitting data up better for their use cases and specific file formats.]

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

#### Propose an offline deal

Propose the offline deal with the miner:

```
lotus client deal --manual-piece-cid=CID --manual-piece-size=datasize <Data CID> <miner> <price> <duration>
```

#### Transfer the data to the miner offline

This can be done several ways, such as shipping hard drives from the client to the storage miner.

#### Finalizing: The miner's role

The miner can import the data and deal manually with:

```
lotus-storage-miner deals import-data <dealCid> <filePath>
```

Once the first Proof of Spacetime (PoSt) hits the chain, the storage deal is considered active.
