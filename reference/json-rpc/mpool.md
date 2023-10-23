# Mpool

The Mpool methods are for interacting with the message pool. The message pool
manages all incoming and outgoing 'messages' going over the network.

## MpoolBatchPush

MpoolBatchPush batch pushes a signed message to mempool.

Perms: write

Inputs:

```json
[
  [
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
  ]
]
```

Response:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

## MpoolBatchPushMessage

MpoolBatchPushMessage batch pushes a unsigned message to mempool.

Perms: sign

Inputs:

```json
[
  [
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
  {
    "MaxFee": "0",
    "MsgUuid": "07070707-0707-0707-0707-070707070707"
  }
]
```

Response:

```json
[
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
]
```

## MpoolBatchPushUntrusted

MpoolBatchPushUntrusted batch pushes a signed message to mempool from untrusted sources.

Perms: write

Inputs:

```json
[
  [
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
  ]
]
```

Response:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

## MpoolCheckMessages

MpoolCheckMessages performs logical checks on a batch of messages

Perms: read

Inputs:

```json
[
  [
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
      "ValidNonce": true
    }
  ]
]
```

Response:

```json
[
  [
    {
      "Cid": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "Code": 0,
      "OK": true,
      "Err": "string value",
      "Hint": {
        "abc": 123
      }
    }
  ]
]
```

## MpoolCheckPendingMessages

MpoolCheckPendingMessages performs logical checks for all pending messages from a given address

Perms: read

Inputs:

```json
["f01234"]
```

Response:

```json
[
  [
    {
      "Cid": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "Code": 0,
      "OK": true,
      "Err": "string value",
      "Hint": {
        "abc": 123
      }
    }
  ]
]
```

## MpoolCheckReplaceMessages

MpoolCheckReplaceMessages performs logical checks on pending messages with replacement

Perms: read

Inputs:

```json
[
  [
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
  ]
]
```

Response:

```json
[
  [
    {
      "Cid": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "Code": 0,
      "OK": true,
      "Err": "string value",
      "Hint": {
        "abc": 123
      }
    }
  ]
]
```

## MpoolClear

MpoolClear clears pending messages from the mpool.
If clearLocal is true, ALL messages will be cleared.
If clearLocal is false, local messages will be protected, all others will be cleared.

Perms: write

Inputs:

```json
[true]
```

Response: `{}`

## MpoolGetConfig

MpoolGetConfig returns (a copy of) the current mpool config

Perms: read

Inputs: `null`

Response:

```json
{
  "PriorityAddrs": ["f01234"],
  "SizeLimitHigh": 123,
  "SizeLimitLow": 123,
  "ReplaceByFeeRatio": 1.23,
  "PruneCooldown": 60000000000,
  "GasLimitOverestimation": 12.3
}
```

## MpoolGetNonce

MpoolGetNonce gets next nonce for the specified sender.
Note that this method may not be atomic. Use MpoolPushMessage instead.

Perms: read

Inputs:

```json
["f01234"]
```

Response: `42`

## MpoolPending

MpoolPending returns pending mempool messages.

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
]
```

## MpoolPush

MpoolPush pushes a signed message to mempool.

Perms: write

Inputs:

```json
[
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
]
```

Response:

```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MpoolPushMessage

MpoolPushMessage atomically assigns a nonce, signs, and pushes a message
to mempool.
maxFee is only used when GasFeeCap/GasPremium fields aren't specified

When maxFee is set to 0, MpoolPushMessage will guess appropriate fee
based on current chain conditions

Perms: sign

Inputs:

```json
[
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
  },
  {
    "MaxFee": "0",
    "MsgUuid": "07070707-0707-0707-0707-070707070707"
  }
]
```

Response:

```json
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
```

## MpoolPushUntrusted

MpoolPushUntrusted pushes a signed message to mempool from untrusted sources.

Perms: write

Inputs:

```json
[
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
]
```

Response:

```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MpoolSelect

MpoolSelect returns a list of pending messages for inclusion in the next block

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
  12.3
]
```

Response:

```json
[
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
]
```

## MpoolSetConfig

MpoolSetConfig sets the mpool config to (a copy of) the supplied config

Perms: admin

Inputs:

```json
[
  {
    "PriorityAddrs": ["f01234"],
    "SizeLimitHigh": 123,
    "SizeLimitLow": 123,
    "ReplaceByFeeRatio": 1.23,
    "PruneCooldown": 60000000000,
    "GasLimitOverestimation": 12.3
  }
]
```

Response: `{}`

## MpoolSub

Perms: read

Inputs: `null`

Response:

```json
{
  "Type": 0,
  "Message": {
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
}
```
