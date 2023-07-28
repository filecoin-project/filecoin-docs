---
description: >-
  While Filecoin shares some similarities to other file storage solutions, the
  protocol has significant differences that one should consider.
---

# Filecoin compared to

Filecoin combines many elements of other file storage and distribution systems. What makes Filecoin unique is that it runs on an open, peer-to-peer network while still providing economic incentives and proofs to ensure files are being stored correctly. This page compares Filecoin against other technologies that share some of the same properties.

* [Filecoin vs. Amazon S3, Google Cloud Storage](filecoin-compared-to.md#filecoin-vs.-amazon-s3-google-cloud-storage)
* [Filecoin vs. Bitcoin](filecoin-compared-to.md#filecoin-tokens-fil-vs.-bitcoin-tokens-btc)

#### Filecoin vs. Amazon S3, Google Cloud Storage

|                             | Filecoin                                                                                          | Amazon S3, Google Cloud Storage                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Main use case               | Storing files at hypercompetitive prices                                                          | Storing files using a familiar, widely-supported service                                 |
| Pricing                     | Determined by a hypercompetitive open market                                                      | Set by corporate pricing departments                                                     |
| Centralization              | Many small, independent storage providers                                                         | A handful of large companies                                                             |
| Reliability stats           | Independently checked by the network and publicly verifiable                                      | Companies self-report their own stats                                                    |
| API                         | Applications can access all storage providers using the Filecoin protocol                         | Applications must implement a different API for each storage provider                    |
| Retrieval                   | Competitive market for retrieving files                                                           | Typically more expensive than storing files to lock users in                             |
| Fault handling              | If a file is lost, the user is refunded automatically by the network                              | Companies can offer users credit if files are lost or unavailable                        |
| Support                     | If something goes wrong, the Filecoin protocol determines what happens without human intervention | If something goes wrong, users contact the support help desk to seek resolution          |
| Physical location           | Miners located anywhere in the world                                                              | Limited to where provider’s data centres are located                                     |
| Becoming a storage provider | Low barrier to entry for storage providers (computer, hard drive, internet connection)            | High barrier to entry for storage providers (legal agreements, marketing, support staff) |

#### Filecoin tokens (FIL) vs. Bitcoin tokens (BTC)

|                     | FIL                                                                  | BTC                                                                   |
| ------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Main use case       | File storage                                                         | Payment network                                                       |
| Data storage        | Good at storing large amounts of data inexpensively                  | Small amounts of data can be stored on blockchain at significant cost |
| Proof               | Blockchain secured using proof of replication and proof of spacetime | Blockchain secured using proof of work                                |
| Consensus power     | Miners with the most storage have the most power                     | Miners with the most computational speed have the most power          |
| Mining hardware     | Hard drives, GPUs, and CPUs                                          | ASICs                                                                 |
| Mining usefulness   | Mining results in peoples’ files being stored                        | Mining results in heat                                                |
| Types of provider   | Storage provider, retrieval provider, repair provider                | All providers perform proof of work                                   |
| Uptime requirements | Storage providers rewarded for uptime, penalized for downtime        | Miners can go offline without being penalized                         |
| Network status      | Mainnet running since 2020                                           | Mainnet running since 2009                                            |
