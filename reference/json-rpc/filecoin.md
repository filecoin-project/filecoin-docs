# Filecoin

## FilecoinAddressToEthAddress

FilecoinAddressToEthAddress converts any Filecoin address to an EthAddress.

This method supports all Filecoin address types:

- "f0" and "f4" addresses: Converted directly.
- "f1", "f2", and "f3" addresses: First converted to their corresponding "f0" ID address, then to an EthAddress.

Requirements:

- For "f1", "f2", and "f3" addresses, they must be instantiated on-chain, as "f0" ID addresses are only assigned to actors when they are created on-chain.
  The simplest way to instantiate an address on chain is to send a transaction to the address.

Note on chain reorganizations:
"f0" ID addresses are not permanent and can be affected by chain reorganizations. To account for this,
the API includes a `blkNum` parameter, which specifies the block number that is used to determine the tipset state to use for converting an
"f1"/"f2"/"f3" address to an "f0" address. This parameter functions similarly to the `blkNum` parameter in the existing `EthGetBlockByNumber` API.
See https://docs.alchemy.com/reference/eth-getblockbynumber for more details.

Parameters:

- ctx: The context for the API call.
- filecoinAddress: The Filecoin address to convert.
- blkNum: The block number or state for the conversion. Defaults to "finalized" for maximum safety.
  Possible values: "pending", "latest", "finalized", "safe", or a specific block number represented as hex.

Perms: read

Inputs:

```json
["f01234", "finalized"]
```

Response:

```json
"0x5cbeecf99d3fdb3f25e309cc264f240bb0664031"
```
