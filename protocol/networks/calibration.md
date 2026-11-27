---
description: >-
  Calibration testnet reference: chain ID 314159, RPC endpoints, faucet,
  explorers, bootstrap peers, genesis and snapshots for testing without real
  FIL.
---

# Calibration

**Calibration is the most realistic simulation of Mainnet. Use it to test apps, smart contracts and storage deals with free test FIL.**

Chain ID: `314159`. It runs the same sector sizes (32 GiB and 64 GiB) and the EVM runtime as [Mainnet](mainnet.md), so providers see realistic sealing performance and hardware needs, and clients can store and retrieve real data.

## Connect

| Setting | Value |
| --- | --- |
| Chain ID | `314159` |
| Currency symbol | `tFIL` |
| HTTPS RPC | `https://api.calibration.node.glif.io/rpc/v1` |
| WebSocket RPC | `wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1` |

To add it to MetaMask, see [Wallets](../fil/wallets.md#add-filecoin-to-metamask).

To run a node, use a lite node for the fastest start:

```shell
FULLNODE_API_INFO=wss://wss.calibration.node.glif.io/apigw/lotus lotus daemon --lite
```

Or run a full node from a snapshot. Download the [latest snapshot](https://forest-archive.chainsafe.dev/latest/calibnet/), then:

```shell
lotus daemon --import-snapshot <calibnet-snapshot-file>
```

To check that an endpoint works:

```shell
curl -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"Filecoin.ChainHead","params":[],"id":1}' \
  https://api.calibration.node.glif.io/rpc/v1
```

## Get test FIL

Test FIL (`tFIL`) has no value. Get it from a faucet:

* [Chainsafe faucet](https://faucet.calibnet.chainsafe-fil.io)
* [Zondax faucet](https://beryx.zondax.ch/faucet/)
* [Forest Explorer faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet)
* [USDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc), for test USDFC

## Genesis

| Property | Value |
| --- | --- |
| CAR file | `QmbHZuVjgtxvgtcE5H3FpE1ywEyawYmZcbx4Eh47WZ7YF8` |
| Reset timestamp | `1667326380` (`2022-11-01T18:13:00Z`) |
| Genesis block CID | `bafy2bzacecyaggy24wol5ruvs6qm73gjibs2l2iyhcqmvi7r7a4ph7zx3yqd4` |
| SHA-1 digest | `f9004d1266e0b023a018eb2fe6bb403cb8204df4` |

## Network parameters

| Parameter | Value |
| --- | --- |
| Supported sector sizes | 32 GiB and 64 GiB |
| Minimum consensus power | 32 GiB |
| Epoch duration | 30 seconds |
| Expected leaders per epoch | 5 |
| WindowPoSt proving period | 2,880 epochs (24 hours) |
| WindowPoSt challenge window | 60 epochs (30 minutes) |
| WindowPoSt deadlines per period | 48 |
| Pre-commit challenge delay | 150 epochs |

## Bootstrap peers

Bootstrap peers are in the Lotus repository, at `build/bootstrap/calibnet.pi` on the [latest release](https://github.com/filecoin-project/lotus/releases/latest/).

## Block explorers

* [Beryx](https://beryx.zondax.ch)
* [Filfox](https://calibration.filfox.info)
* [Filscan](https://calibration.filscan.io/)
* [Blockscout](https://filecoin-testnet.blockscout.com): an open-source explorer for the EVM runtime

## Public RPC endpoints

[Chainlist](https://chainlist.org/?search=filecoin&testnets=true) lists available endpoints. Select **Include Testnets** to see test networks. Public endpoints are limited to read-only [JSON-RPC calls](../../reference/json-rpc/README.md), plus [`MpoolPush`](../../reference/json-rpc/mpool.md) for messages that are already signed.

| Provider | Endpoints |
| --- | --- |
| [Chain.Love](https://calibration.filecoin.chain.love/rpc) | HTTPS `https://calibration.filecoin.chain.love/rpc/v1`. For WebSocket, see the [Chain.Love Calibration RPC page](https://calibration.filecoin.chain.love/rpc). |
| [Ankr](https://www.ankr.com/rpc/filecoin) | HTTPS `https://rpc.ankr.com/filecoin_testnet` |

{% hint style="info" %}
Public hosted endpoints guarantee only the latest 2,000 blocks.
{% endhint %}

With a Glif lite node, leave `/rpc/v1` off the WebSocket address.

## Resources

* [Latest lightweight snapshot](https://forest-archive.chainsafe.dev/latest/calibnet/) and [full archive](https://forest-archive.chainsafe.dev/list/), generated with [Forest](https://github.com/ChainSafe/forest) by [ChainSafe](https://chainsafe.io/)
* Slack: [#fil-net-calibration-discuss](https://filecoinproject.slack.com/archives/C01D42NNLMS) for Calibration, [#fil-network-announcements](https://filecoinproject.slack.com/archives/C01AC6999KQ) for updates, and [#fil-help](https://filecoinproject.slack.com/archives/CEGN061C5) for questions

## Related pages

* [Quickstart: ERC-20](../fvm/erc-20-quickstart.md): deploy your first contract on Calibration.
* [Local testnet](local-testnet.md): run a private network on your own machine.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/networks/calibration)
