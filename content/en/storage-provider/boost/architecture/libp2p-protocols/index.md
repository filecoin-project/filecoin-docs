---
title: "Libp2p protocols"
description: "Boost supports the same libp2p protocols as legacy markets, and adds new versions of the protocols used to propose a storage deal and to check the deal's status."
lead: "Boost supports the same libp2p protocols as legacy markets, and adds new versions of the protocols used to propose a storage deal and to check the deal's status."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "libp2p-protocols-49573e61b1174eecb97353d8ab432d6e"
weight: 40
toc: true
---

## Propose Storage Deal Protocol

The client makes a deal proposal over `v1.2.0` of the Propose Storage Deal Protocol: `/fil/storage/mk/1.2.0`

It is a request / response protocol, where the request and response are CBOR-marshalled.

### Request

| Field              | Type               | Description                                                                                        |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------------------- |
| DealUUID           | uuid               | A uuid for the deal specified by the client                                                        |
| IsOffline          | boolean            | Indicates whether the deal is online or offline                                                    |
| ClientDealProposal | ClientDealProposal | Same as `<v1 proposal>.DealProposal`                                                               |
| DealDataRoot       | cid                | The root cid of the CAR file. Same as `<v1 proposal>.Piece.Root`                                   |
| Transfer.Type      | string             | eg "http"                                                                                          |
| Transfer.ClientID  | string             | Any id the client wants (useful for matching logs between client and server)                       |
| Transfer.Params    | byte array         | Interpreted according to `Type`. eg for "http" `Transfer.Params` contains the http headers as JSON |

| Transfer.Size      | integer            | The size of the data that is sent across the network                                               |

### Response


| Field    | Type    | Description                                        |

| -------- | ------- | -------------------------------------------------- |
| Accepted | boolean | Indicates whether the deal proposal was accepted   |
| Message  | string  | A message about why the deal proposal was rejected |

## Storage Deal Status Protocol


The client requests the status of a deal over `v1.2.0` of the Storage Deal Status Protocol: `/fil/storage/status/1.2.0`


It is a request / response protocol, where the request and response are CBOR-marshalled.

### Request


| Field     | Type                                                                                                                                      | Description                                        |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |

| DealUUID  | uuid                                                                                                                                      | The uuid of the deal                               |
| Signature | [Signature](https://github.com/filecoin-project/go-state-types/blob/057cdfb837f7a0309c1607c7c4640f315e51d7af/crypto/signature.go#L36-L39) | A signature over the uuid with the client's wallet |

### Response

| Field               | Type         | Description                                                                                                                                                                                   |
| ------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DealUUID            | uuid         | The uuid of the deal                                                                                                                                                                          |
| Error               | string       | Non-empty if there's an error getting the deal status                                                                                                                                         |
| IsOffline           | boolean      | Indicates whether the deal is online or offline                                                                                                                                               |
| TransferSize        | integer      | The total size of the transfer in bytes                                                                                                                                                       |
| NBytesReceived      | integer      | The number of bytes that have been downloaded                                                                                                                                                 |
| DealStatus.Error    | string       | Non-empty if the deal has failed                                                                                                                                                              |
| DealStatus.Status   | string       | The [checkpoint](https://github.com/filecoin-project/boost/blob/4fb17ba117784479e09db4012a3abf9862b8afd9/storagemarket/types/dealcheckpoints/checkpoints.go#L7-L15) that the deal has reached |
| DealStatus.Proposal | DealProposal |                                                                                                                                                                                               |
| SignedProposalCid   | cid          | cid of the client deal proposal + signature                                                                                                                                                   |
| PublishCid          | cid          | The cid of the publish message, if the deal has been published                                                                                                                                |
| ChainDealID         | integer      | The ID of the deal on chain, if it's been published                                                                                                                                           |
