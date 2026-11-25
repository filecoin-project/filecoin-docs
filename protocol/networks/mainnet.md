---
description: >-
  Filecoin Mainnet parameters: chain ID 314, RPC endpoints, block explorers,
  bootstrap peers, sector sizes and expected performance.
---

# Mainnet

**Mainnet is the production Filecoin network. It began at block 148,888 and supports 32 GiB and 64 GiB sectors.**

Chain ID: `314`.

## Genesis

| Property | Value |
| --- | --- |
| CAR file | `QmavMCf95w2UMYGD1J5GpHcWBWXR2jTFYmtAkgeroMmpk1` |
| Reset timestamp | `2020-08-24T22:00:00Z` |
| Genesis block CID | `bafy2bzacecnamqgqmifpluoeldx7zzglxcljo6oja4vrmtj7432rphldpdmm2` |
| SHA-1 digest | `4782cb42b4b01793b5cd9f593cc3dc87b6d3c7b4` |

## Network parameters

| Parameter | Value |
| --- | --- |
| Supported sector sizes | 32 GiB and 64 GiB |
| Minimum consensus power | 10 TiB |
| Epoch duration | 30 seconds |
| Expected leaders per epoch | 5 |
| WindowPoSt proving period | 2,880 epochs (24 hours) |
| WindowPoSt challenge window | 60 epochs (30 minutes) |
| WindowPoSt deadlines per period | 48 |
| Pre-commit challenge delay | 150 epochs |

## Bootstrap peers

Bootstrap peers are in the Lotus repository, at `build/bootstrap/mainnet.pi` on the [latest release](https://github.com/filecoin-project/lotus/releases/latest/).

## RPC endpoints

[Chainlist](https://chainlist.org/?search=filecoin&testnets=false) keeps a dynamically updated list of Mainnet RPC endpoints. To check how each performs, see the [Filecoin ETH RPC Benchmark](https://benchmark-rpc.vercel.app/).

Public endpoints are limited to the read-only [Filecoin JSON-RPC API](../../reference/json-rpc/README.md), including the read-only [Eth methods](../../reference/json-rpc/eth.md). The exceptions are [`MpoolPush`](../../reference/json-rpc/mpool.md#mpoolpush) and [`EthSendRawTransaction`](../../reference/json-rpc/eth.md#ethsendrawtransaction), which send messages that are already signed.

{% hint style="info" %}
Most public endpoints guarantee only recent state: the latest 2,000 blocks, about 16.67 hours. For an archival node, contact a provider.
{% endhint %}

| Provider | HTTPS | WSS | Notes |
| --- | --- | --- | --- |
| [Chain.Love](https://filecoin.chain.love/rpc) | `https://filecoin.chain.love/rpc/v1` | See the [Chain.Love RPC page](https://filecoin.chain.love/rpc) | Read-only methods and `MpoolPush` |
| [Ankr](https://www.ankr.com/rpc/filecoin) | `https://rpc.ankr.com/filecoin` | On request | All Filecoin and Eth methods, including `MpoolPush` |
| [Chainup Cloud](https://cloud.chainup.com/) | `https://filecoin.chainup.net/rpc/v1` | `wss://filecoin.chainup.net/rpc/v1` | |
| [Lava](https://www.lavanet.xyz/) | `https://filecoin.lava.build` | | All Filecoin and Eth methods, including `MpoolPush` |
| [NOWNodes](https://nownodes.io/) | `https://fil.nownodes.io` | | Requires an API key |

Glif also offers a [Lotus Lite node](../../storage-providers/nodes/lite-nodes/spin-up-a-lite-node.md) endpoint. A lite node runs on low-end hardware and signs messages locally without a full node:

```shell
FULLNODE_API_INFO=wss://wss.node.glif.io/apigw/lotus lotus daemon --lite
```

With a lite node, leave `/rpc/v1` off Glif's WebSocket address.

## Block explorers

None of these explorers is created or maintained by Protocol Labs or the Filecoin Foundation.

* [Beryx](https://beryx.zondax.ch/)
* [Filfox](https://filfox.info/en/)
* [Filscan](https://filscan.io)
* [Blockscout](https://filecoin.blockscout.com/): an open-source explorer for the EVM runtime

If you have access to a node, you can also query block data with JSON-RPC. This request returns the head [tipset](../concepts/blocks-and-tipsets.md):

```shell
curl -X POST 'https://api.node.glif.io/rpc/v1' \
  --header 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"Filecoin.ChainHead","params":null,"id":1}' | jq
```

Use `Filecoin.ChainGetBlock` and `Filecoin.ChainGetMessage` with a CID in `params`, for example `[{"/": "<CID>"}]`, to read a block or a message.

## Performance

Filecoin's performance is set mainly by its security parameters and proof constructions, so it's hard to give exact benchmarks. These rules of thumb help you judge whether the network fits your use case.

* **Transfers.** A message that transfers FIL usually lands in about one epoch, around 30 seconds. For high-value transfers, 120 epochs (1 hour) is a conservative number of confirmations.
* **Storing data.** After a deal is accepted, the client and provider fund the deal, the data transfers, and the provider publishes the deal onchain. For a small file this takes minutes, and the data transfer is usually the slowest part. The provider then seals the sector, which takes hours.
* **Retrieving data.** If the provider keeps an unsealed copy, it can serve the data quickly. If it doesn't, it has to unseal the sector first, which takes about as long as sealing.

Because of this, native Filecoin storage compares to warm or cold storage.

> **Note:** These timings describe working with the network directly. If you store data through Filecoin Onchain Cloud (FOC), the service handles deals and onchain consensus in the background, so your upload can complete in seconds. See [Build a storage service](../../guides/build-a-storage-service.md).

## Resources

* [Latest lightweight snapshot](https://forest-archive.chainsafe.dev/latest/mainnet/) and [full archive](https://forest-archive.chainsafe.dev/list/), generated with [Forest](https://github.com/ChainSafe/forest) by [ChainSafe](https://chainsafe.io/)
* [Status page and incidents](https://filecoin.statuspage.io/)
* [Forest Explorer faucet](https://forest-explorer.chainsafe.dev/faucet/mainnet)
* Slack: [#fil-network-announcements](https://filecoinproject.slack.com/archives/C01AC6999KQ) for updates and [#fil-help](https://filecoinproject.slack.com/archives/CEGN061C5) for questions

## Related pages

* [Wallets](../fil/wallets.md): choose a wallet and connect it to Filecoin.
* [Get FIL](../fil/get-fil.md): buy FIL and withdraw it safely.
* [Gas](../fvm/gas.md): how gas is charged and estimated.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/networks/mainnet)
