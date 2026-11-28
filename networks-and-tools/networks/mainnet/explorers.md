---
description: >-
  A block explorer is a tool that allows users to view and search the contents
  of blocks on a blockchain. This page covers available explorers for the
  Filecoin mainnet.
---

# Explorers

Block explorers allow you to view the details of the Filecoin network on a single website. Individual block explorers contain different features that may be useful. None of these sites are created or maintained by Protocol Labs or the Filecoin Foundation. This list is in alphabetical order:

### Beryx

Website [beryx.io](https://beryx.io/)

### Filfox

Website: [filfox.info](https://filfox.info/en/)

### Filscan

Website: [filscan.io](https://filscan.io)

### Blockscout Open-Source FEVM Explorer

Website: [filecoin.blockscout.com](https://filecoin.blockscout.com/)

Use the [Blockscout multichain API](https://docs.blockscout.com/devs/blockscout-api) to query indexed addresses, blocks, and transactions. Get an API key from the [Blockscout Developer Portal](https://dev.blockscout.com/). For REST requests, use `https://api.blockscout.com/{chain_id}/api/v2/` with chain ID `314` for Filecoin mainnet or `314159` for Calibration.

## API requests

If you have access to a Filecoin node, you can send a JSON-RPC request to get block information.

To get the head tipset:

```shell
curl --location --request POST 'https://api.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"Filecoin.ChainHead",
    "params": null,
    "id":1
}' | jq
```

Print a block:

```shell
curl --location --request POST 'https://api.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"Filecoin.ChainGetBlock",
    "params": [{"/": "bafy2bzacebpgpa7elb5uwqxbiljlzgbmpenv4yw2e3gpcjk7ssxv2ijv3ecv2"}],
    "id":1
}' | jq
```

Print message information:

```shell
curl --location --request POST 'https://api.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"Filecoin.ChainGetMessage",
    "params": [{"/": "bafy2bzacebpgpa7elb5uwqxbiljlzgbmpenv4yw2e3gpcjk7ssxv2ijv3ecv2"}],
    "id":1
}' | jq
```



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/networks-and-tools/networks/mainnet/explorers)
