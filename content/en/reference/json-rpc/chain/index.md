---
title: "Chain"
draft: false
images: []
type: docs
menu:
  reference:
    parent: "reference-json-rpc"
    identifier: "chain-f5c211d9072c9151128eb9597f12d127"
weight: 100
toc: true
aliases:
    - "/developers/reference/json-rpc/chain/"
---

The Chain method group contains methods for interacting with the
blockchain, but that do not require any form of state computation.

## ChainDeleteObj

ChainDeleteObj deletes node referenced by the given CID

Perms: admin

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `{}`

## ChainExport

ChainExport returns a stream of bytes with CAR dump of chain data.
The exported chain data includes the header chain from the given tipset
back to genesis, the entire genesis state, and the most recent 'nroots'
state trees.
If oldmsgskip is set, messages from before the requested roots are also not included.

Perms: read

Inputs:

```json
[
  10101,
  true,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"Ynl0ZSBhcnJheQ=="`

## ChainGetBlock

ChainGetBlock returns the block specified by the given CID.

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
{
  "Miner": "f01234",
  "Ticket": {
    "VRFProof": "Ynl0ZSBhcnJheQ=="
  },
  "ElectionProof": {
    "WinCount": 9,
    "VRFProof": "Ynl0ZSBhcnJheQ=="
  },
  "BeaconEntries": [
    {
      "Round": 42,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  ],
  "WinPoStProof": [
    {
      "PoStProof": 8,
      "ProofBytes": "Ynl0ZSBhcnJheQ=="
    }
  ],
  "Parents": [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    }
  ],
  "ParentWeight": "0",
  "Height": 10101,
  "ParentStateRoot": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "ParentMessageReceipts": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Messages": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "BLSAggregate": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "Timestamp": 42,
  "BlockSig": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "ForkSignaling": 42,
  "ParentBaseFee": "0"
}
```

## ChainGetBlockMessages

ChainGetBlockMessages returns messages stored in the specified block.

Note: If there are multiple blocks in a tipset, it's likely that some
messages will be duplicated. It's also possible for blocks in a tipset to have
different messages from the same sender at the same nonce. When that happens,
only the first message (in a block with lowest ticket) will be considered
for execution

NOTE: THIS METHOD SHOULD ONLY BE USED FOR GETTING MESSAGES IN A SPECIFIC BLOCK

DO NOT USE THIS METHOD TO GET MESSAGES INCLUDED IN A TIPSET
Use ChainGetParentMessages, which will perform correct message deduplication

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
{
  "BlsMessages": [
    {
      "Version": 42,
      "To": "f01234",
      "From": "f01234",
      "Nonce": 42,
      "Value": "0",
      "GasLimit": 9,
      "GasFeeCap": "0",
      "GasPremium": "0",
      "Method": 1,
      "Params": "Ynl0ZSBhcnJheQ==",
      "CID": {
        "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
      }
    }
  ],
  "SecpkMessages": [
    {
      "Message": {
        "Version": 42,
        "To": "f01234",
        "From": "f01234",
        "Nonce": 42,
        "Value": "0",
        "GasLimit": 9,
        "GasFeeCap": "0",
        "GasPremium": "0",
        "Method": 1,
        "Params": "Ynl0ZSBhcnJheQ==",
        "CID": {
          "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
        }
      },
      "Signature": {
        "Type": 2,
        "Data": "Ynl0ZSBhcnJheQ=="
      },
      "CID": {
        "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
      }
    }
  ],
  "Cids": [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    }
  ]
}
```

## ChainGetGenesis

ChainGetGenesis returns the genesis tipset.

Perms: read

Inputs: `null`

Response:

```json
{
  "Cids": null,
  "Blocks": null,
  "Height": 0
}
```

## ChainGetMessage

ChainGetMessage reads a message referenced by the specified CID from the
chain blockstore.

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
{
  "Version": 42,
  "To": "f01234",
  "From": "f01234",
  "Nonce": 42,
  "Value": "0",
  "GasLimit": 9,
  "GasFeeCap": "0",
  "GasPremium": "0",
  "Method": 1,
  "Params": "Ynl0ZSBhcnJheQ==",
  "CID": {
    "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
  }
}
```

## ChainGetMessagesInTipset

ChainGetMessagesInTipset returns message stores in current tipset

Perms: read

Inputs:

```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:

```json
[
  {
    "Cid": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Message": {
      "Version": 42,
      "To": "f01234",
      "From": "f01234",
      "Nonce": 42,
      "Value": "0",
      "GasLimit": 9,
      "GasFeeCap": "0",
      "GasPremium": "0",
      "Method": 1,
      "Params": "Ynl0ZSBhcnJheQ==",
      "CID": {
        "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
      }
    }
  }
]
```

## ChainGetNode

Perms: read

Inputs:

```json
[
  "string value"
]
```

Response:

```json
{
  "Cid": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Obj": {}
}
```

## ChainGetParentMessages

ChainGetParentMessages returns messages stored in parent tipset of the
specified block.

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
[
  {
    "Cid": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Message": {
      "Version": 42,
      "To": "f01234",
      "From": "f01234",
      "Nonce": 42,
      "Value": "0",
      "GasLimit": 9,
      "GasFeeCap": "0",
      "GasPremium": "0",
      "Method": 1,
      "Params": "Ynl0ZSBhcnJheQ==",
      "CID": {
        "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
      }
    }
  }
]
```

## ChainGetParentReceipts

ChainGetParentReceipts returns receipts for messages in parent tipset of
the specified block. The receipts in the list returned is one-to-one with the
messages returned by a call to ChainGetParentMessages with the same blockCid.

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
[
  {
    "ExitCode": 0,
    "Return": "Ynl0ZSBhcnJheQ==",
    "GasUsed": 9
  }
]
```

## ChainGetPath

ChainGetPath returns a set of revert/apply operations needed to get from
one tipset to another, for example:

```plaintext
       to
        ^
from   tAA
  ^     ^
tBA    tAB
 ^---*--^
     ^
    tRR
```

Would return `[revert(tBA), apply(tAB), apply(tAA)]`

Perms: read

Inputs:

```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:

```json
[
  {
    "Type": "string value",
    "Val": {
      "Cids": null,
      "Blocks": null,
      "Height": 0
    }
  }
]
```

## ChainGetRandomnessFromBeacon

ChainGetRandomnessFromBeacon is used to sample the beacon for randomness.

Perms: read

Inputs:

```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  2,
  10101,
  "Ynl0ZSBhcnJheQ=="
]
```

Response: `"Bw=="`

## ChainGetRandomnessFromTickets

ChainGetRandomnessFromTickets is used to sample the chain for randomness.

Perms: read

Inputs:

```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  2,
  10101,
  "Ynl0ZSBhcnJheQ=="
]
```

Response: `"Bw=="`

## ChainGetTipSet

ChainGetTipSet returns the tipset specified by the given TipSetKey.

Perms: read

Inputs:

```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:

```json
{
  "Cids": null,
  "Blocks": null,
  "Height": 0
}
```

## ChainGetTipSetByHeight

ChainGetTipSetByHeight looks back for a tipset at the specified epoch.
If there are no blocks at the specified epoch, a tipset at an earlier epoch
will be returned.

Perms: read

Inputs:

```json
[
  10101,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:

```json
{
  "Cids": null,
  "Blocks": null,
  "Height": 0
}
```

## ChainHasObj

ChainHasObj checks if a given CID exists in the chain blockstore.

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `true`

## ChainHead

ChainHead returns the current head of the chain.

Perms: read

Inputs: `null`

Response:

```json
{
  "Cids": null,
  "Blocks": null,
  "Height": 0
}
```

## ChainNotify

ChainNotify returns channel with chain head updates.
First message is guaranteed to be of length `1`, and type `current`.

Perms: read

Inputs: `null`

Response:

```json
[
  {
    "Type": "string value",
    "Val": {
      "Cids": null,
      "Blocks": null,
      "Height": 0
    }
  }
]
```

## ChainReadObj

ChainReadObj reads IPLD nodes referenced by the specified CID from chain
blockstore and returns raw bytes.

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `"Ynl0ZSBhcnJheQ=="`

## ChainSetHead

ChainSetHead forcefully sets current chain head. Use with caution.

Perms: admin

Inputs:

```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `{}`

## ChainStatObj

ChainStatObj returns statistics about the graph referenced by 'obj'.
If 'base' is also specified, then the returned stat will be a diff
between the two objects.

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
{
  "Size": 42,
  "Links": 42
}
```

## ChainTipSetWeight

ChainTipSetWeight computes weight for the specified tipset.

Perms: read

Inputs:

```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`
