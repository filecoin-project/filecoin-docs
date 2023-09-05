---
description: >-
  The Msig methods are used to interact with multisig wallets on the Filecoin
  network.
---

# Msig

## MsigAddApprove

MsigAddApprove approves a previously proposed AddSigner message It takes the following parameters: , , , , ,

Perms: sign

Inputs:


```json
[
  "f01234",
  "f01234",
  42,
  "f01234",
  "f01234",
  true
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigAddCancel

MsigAddCancel cancels a previously proposed AddSigner message It takes the following parameters: , , , ,

Perms: sign

Inputs:


```json
[
  "f01234",
  "f01234",
  42,
  "f01234",
  true
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigAddPropose

MsigAddPropose proposes adding a signer in the multisig It takes the following parameters: , , ,

Perms: sign

Inputs:


```json
[
  "f01234",
  "f01234",
  "f01234",
  true
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigApprove

MsigApprove approves a previously-proposed multisig message by transaction ID It takes the following parameters: ,

Perms: sign

Inputs:


```json
[
  "f01234",
  42,
  "f01234"
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigApproveTxnHash

MsigApproveTxnHash approves a previously-proposed multisig message, specified using both transaction ID and a hash of the parameters used in the proposal. This method of approval can be used to ensure you only approve exactly the transaction you think you are. It takes the following parameters: , , , , , , ,

Perms: sign

Inputs:


```json
[
  "f01234",
  42,
  "f01234",
  "f01234",
  "0",
  "f01234",
  42,
  "Ynl0ZSBhcnJheQ=="
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigCancel

MsigCancel cancels a previously-proposed multisig message It takes the following parameters: , , , , , ,

Perms: sign

Inputs:


```json
[
  "f01234",
  42,
  "f01234",
  "0",
  "f01234",
  42,
  "Ynl0ZSBhcnJheQ=="
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigCreate

MsigCreate creates a multisig wallet It takes the following parameters: , , , ,

Perms: sign

Inputs:


```json
[
  42,
  [
    "f01234"
  ],
  10101,
  "0",
  "f01234",
  "0"
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigGetAvailableBalance

MsigGetAvailableBalance returns the portion of a multisig’s balance that can be withdrawn or spent

Perms: read

Inputs:


```json
[
  "f01234",
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

## MsigGetPending

MsigGetPending returns pending transactions for the given multisig wallet. Once pending transactions are fully approved, they will no longer appear here.

Perms: read

Inputs:


```json
[
  "f01234",
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
    "ID": 9,
    "To": "f01234",
    "Value": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "Approved": [
      "f01234"
    ]
  }
]
```

## MsigGetVested

MsigGetVested returns the amount of FIL that vested in a multisig in a certain period. It takes the following parameters: , ,

Perms: read

Inputs:


```json
[
  "f01234",
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

Response: `"0"`

## MsigGetVestingSchedule

MsigGetVestingSchedule returns the vesting details of a given multisig.

Perms: read

Inputs:


```json
[
  "f01234",
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
  "InitialBalance": "0",
  "StartEpoch": 10101,
  "UnlockDuration": 10101
}
```

## MsigPropose

MsigPropose proposes a multisig message It takes the following parameters: , , , , ,

Perms: sign

Inputs:


```json
[
  "f01234",
  "f01234",
  "0",
  "f01234",
  42,
  "Ynl0ZSBhcnJheQ=="
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigRemoveSigner

MsigRemoveSigner proposes the removal of a signer from the multisig. It accepts the multisig to make the change on, the proposer address to send the message from, the address to be removed, and a boolean indicating whether or not the signing threshold should be lowered by one along with the address removal.

Perms: sign

Inputs:


```json
[
  "f01234",
  "f01234",
  "f01234",
  true
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigSwapApprove

MsigSwapApprove approves a previously proposed SwapSigner It takes the following parameters: , , , , ,

Perms: sign

Inputs:


```json
[
  "f01234",
  "f01234",
  42,
  "f01234",
  "f01234",
  "f01234"
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigSwapCancel

MsigSwapCancel cancels a previously proposed SwapSigner message It takes the following parameters: , , , ,

Perms: sign

Inputs:


```json
[
  "f01234",
  "f01234",
  42,
  "f01234",
  "f01234"
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## MsigSwapPropose

MsigSwapPropose proposes swapping 2 signers in the multisig It takes the following parameters: , , ,

Perms: sign

Inputs:


```json
[
  "f01234",
  "f01234",
  "f01234",
  "f01234"
]
```

Response:


```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```
