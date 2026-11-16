---
description: >-
  The checks to run on Calibration Testnet before you move to Mainnet and take
  real client data.
---

# Verify and go live

**Run these checks on Calibration Testnet first.** When your setup passes them and has proved for a few days, repeat the same setup on Mainnet.

## Warm storage (PDP)

* [ ] All three containers are healthy: `docker compose ps`.
* [ ] Forest has caught up with the chain.
* [ ] Every step in the dashboard's PDP Guide is green.
* [ ] From outside your network, `curl https://<your-domain>` returns a "Hello" from Curio.
* [ ] Your offering has your Service URL and `serviceStatus` set to `prod`.
* [ ] Your PDP wallet has FIL for proof messages.
* [ ] The **PDP Overview** page shows proofs passing.

After you register, the network tests your node and the working group approves you before client data arrives. Keep the node online while you wait.

## Sealing (PoRep)

* [ ] Lotus, your chain node, has caught up: `lotus sync wait` returns.
* [ ] A test proof works: `curio test window-post task --addr <minerID>`.
* [ ] A test sector goes through every sealing stage: `curio seal events --actor <minerID>`.
* [ ] Your miner shows power: `sptool --actor <minerID> info`.
* [ ] Daily proofs pass at every deadline in the dashboard.
* [ ] Worker and sender wallets, and your miner, have FIL for messages and daily fees.
* [ ] The owner key is backed up offline, and YugabyteDB is backed up.

You can win blocks once you have 10 TiB of power.

## Get discovered by clients

Clients find data by its CID through network indexers (IPNI). Curio's market tells indexers about your data over HTTPS, and indexers fetch the details from your domain. So your market domain must be reachable from outside.

To check, look up a CID you store:

```sh
curl https://cid.contact/cid/<cid>
```

If your provider shows up, clients can find you.

## Move to Mainnet

* **Warm storage:** use the `filecoin/curio-pdp:latest` image, a Mainnet domain and new data folders. Fund the PDP wallet with about 8 FIL.
* **Sealing:** build Lotus and Curio for Mainnet, create new wallets, and fund them with real FIL for your pledge.
* **Archival storage:** FCSS runs on Mainnet only. Register with FCSS once your Mainnet cluster passes the sealing checks. See [Provide archival storage](provide-archival-storage.md).

## Next steps

* [Monitor proofs and faults](monitor-proofs-and-faults.md)
* [Payouts and withdrawals](payouts-and-withdrawals.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/verify-and-go-live)
