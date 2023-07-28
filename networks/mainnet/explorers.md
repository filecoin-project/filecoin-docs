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

![Beryx website.](https://docs.filecoin.io/networks/mainnet/explorers/beryx\_hu84492b243d8c64825d405f43fe45559f\_233311\_2880x0\_resize\_q75\_h2\_box\_3.webp)

### Filfox

Website: [filfox.io](https://filfox.io)

![Filfox website.](https://docs.filecoin.io/networks/mainnet/explorers/filfox\_hu5e433edb7cfc564d1ac7c07faa492571\_92672\_1842x0\_resize\_q75\_h2\_box\_3.webp)

### Filexplore

Website: [explorer.filmine.io](https://explorer.filmine.io/)

### Filscan

Website: [filscan.io](https://filscan.io)

![Filscan website.](https://docs.filecoin.io/networks/mainnet/explorers/filscan\_hu92d81e9a3a2f1f5710fc13f1e869bf3b\_130725\_1841x0\_resize\_q75\_h2\_box\_3.webp)

### Filscout

Website: [Filscout](https://filscout.io)

![Filscout website.](https://docs.filecoin.io/networks/mainnet/explorers/filscout\_hu4405f3082e1746dd19fbaab3ffc2aa03\_88354\_1841x0\_resize\_q75\_h2\_box\_3.webp)

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
