# Msig

The Msig methods are used to interact with multisig wallets on the
filecoin network

## MsigAddApprove

MsigAddApprove approves a previously proposed AddSigner message
It takes the following params: <multisig address>, <sender address of the approve msg>, <proposed message ID>,
<proposer address>, <new signer>, <whether the number of required signers should be increased>

Perms: sign

Inputs:

```json
["f01234", "f01234", 42, "f01234", "f01234", true]
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
  "ValidNonce": true
}
```

## MsigAddCancel

MsigAddCancel cancels a previously proposed AddSigner message
It takes the following params: <multisig address>, <sender address of the cancel msg>, <proposed message ID>,
<new signer>, <whether the number of required signers should be increased>

Perms: sign

Inputs:

```json
["f01234", "f01234", 42, "f01234", true]
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
  "ValidNonce": true
}
```

## MsigAddPropose

MsigAddPropose proposes adding a signer in the multisig
It takes the following params: <multisig address>, <sender address of the propose msg>,
<new signer>, <whether the number of required signers should be increased>

Perms: sign

Inputs:

```json
["f01234", "f01234", "f01234", true]
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
  "ValidNonce": true
}
```

## MsigApprove

MsigApprove approves a previously-proposed multisig message by transaction ID
It takes the following params: <multisig address>, <proposed transaction ID> <signer address>

Perms: sign

Inputs:

```json
["f01234", 42, "f01234"]
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
  "ValidNonce": true
}
```

## MsigApproveTxnHash

MsigApproveTxnHash approves a previously-proposed multisig message, specified
using both transaction ID and a hash of the parameters used in the
proposal. This method of approval can be used to ensure you only approve
exactly the transaction you think you are.
It takes the following params: <multisig address>, <proposed message ID>, <proposer address>, <recipient address>, <value to transfer>,
<sender address of the approve msg>, <method to call in the proposed message>, <params to include in the proposed message>

Perms: sign

Inputs:

```json
["f01234", 42, "f01234", "f01234", "0", "f01234", 42, "Ynl0ZSBhcnJheQ=="]
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
  "ValidNonce": true
}
```

## MsigCancel

MsigCancel cancels a previously-proposed multisig message
It takes the following params: <multisig address>, <proposed transaction ID> <signer address>

Perms: sign

Inputs:

```json
["f01234", 42, "f01234"]
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
  "ValidNonce": true
}
```

## MsigCancelTxnHash

MsigCancel cancels a previously-proposed multisig message
It takes the following params: <multisig address>, <proposed transaction ID>, <recipient address>, <value to transfer>,
<sender address of the cancel msg>, <method to call in the proposed message>, <params to include in the proposed message>

Perms: sign

Inputs:

```json
["f01234", 42, "f01234", "0", "f01234", 42, "Ynl0ZSBhcnJheQ=="]
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
  "ValidNonce": true
}
```

## MsigCreate

MsigCreate creates a multisig wallet
It takes the following params: <required number of senders>, <approving addresses>, <unlock duration>
<initial balance>, <sender address of the create msg>, <gas price>

Perms: sign

Inputs:

```json
[42, ["f01234"], 10101, "0", "f01234", "0"]
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
  "ValidNonce": true
}
```

## MsigGetAvailableBalance

MsigGetAvailableBalance returns the portion of a multisig's balance that can be withdrawn or spent

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

MsigGetPending returns pending transactions for the given multisig
wallet. Once pending transactions are fully approved, they will no longer
appear here.

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
    "Approved": ["f01234"]
  }
]
```

## MsigGetVested

MsigGetVested returns the amount of FIL that vested in a multisig in a certain period.
It takes the following params: <multisig address>, <start epoch>, <end epoch>

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

MsigPropose proposes a multisig message
It takes the following params: <multisig address>, <recipient address>, <value to transfer>,
<sender address of the propose msg>, <method to call in the proposed message>, <params to include in the proposed message>

Perms: sign

Inputs:

```json
["f01234", "f01234", "0", "f01234", 42, "Ynl0ZSBhcnJheQ=="]
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
  "ValidNonce": true
}
```

## MsigRemoveSigner

MsigRemoveSigner proposes the removal of a signer from the multisig.
It accepts the multisig to make the change on, the proposer address to
send the message from, the address to be removed, and a boolean
indicating whether or not the signing threshold should be lowered by one
along with the address removal.

Perms: sign

Inputs:

```json
["f01234", "f01234", "f01234", true]
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
  "ValidNonce": true
}
```

## MsigSwapApprove

MsigSwapApprove approves a previously proposed SwapSigner
It takes the following params: <multisig address>, <sender address of the approve msg>, <proposed message ID>,
<proposer address>, <old signer>, <new signer>

Perms: sign

Inputs:

```json
["f01234", "f01234", 42, "f01234", "f01234", "f01234"]
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
  "ValidNonce": true
}
```

## MsigSwapCancel

MsigSwapCancel cancels a previously proposed SwapSigner message
It takes the following params: <multisig address>, <sender address of the cancel msg>, <proposed message ID>,
<old signer>, <new signer>

Perms: sign

Inputs:

```json
["f01234", "f01234", 42, "f01234", "f01234"]
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
  "ValidNonce": true
}
```

## MsigSwapPropose

MsigSwapPropose proposes swapping 2 signers in the multisig
It takes the following params: <multisig address>, <sender address of the propose msg>,
<old signer>, <new signer>

Perms: sign

Inputs:

```json
["f01234", "f01234", "f01234", "f01234"]
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
  "ValidNonce": true
}
```
