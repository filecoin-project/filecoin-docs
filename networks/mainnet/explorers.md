---
description: >-
  A block explorer is a tool that allows users to view and search the contents
  of blocks on a blockchain. This page covers available explorers for the
  Filecoin mainnet.
---

# Explorers

## Account, actor & message explorers

These explorers allow you to view the states of Filecoin accounts and actors (smart contracts) and the details of messages sent across the network.

### Glif Explorer

Website: [explorer.glif.io](https://explorer.glif.io)

## Block explorers

Block explorers allow you to view the details of the Filecoin network on a single website. Individual block explorers contain different features that may be useful. None of these sites are created or maintained by Protocol Labs or the Filecoin Foundation. This list is in alphabetical order:

### Beryx

Website [beryx.zondax.ch](https://beryx.zondax.ch/)

### Filfox

Website: [filfox.io](https://filfox.io)

### Filscan

Website: [filscan.io](https://filscan.io)

### Filutils

Website: [filutils.com](https://www.filutils.com/en)

### Starboard

Website: [fvm.starboard.ventures](https://fvm.starboard.ventures/)

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
