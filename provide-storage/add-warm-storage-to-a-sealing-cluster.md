---
description: >-
  Add warm storage to a Curio cluster that already seals and proves sectors,
  and earn USDFC on the same hardware.
---

# Add warm storage to a sealing cluster

**If you already run a Curio sealing cluster, you can also take warm storage clients on it.** PDP reuses your chain node, database, disks and HTTPS setup. You don't need a second Curio-PDP stack.

PDP data isn't sealed and isn't stored in your sectors. It adds no storage power and doesn't change your block rewards. It earns warm storage fees in USDFC.

{% hint style="warning" %}
**Curio labels this feature alpha.** PDP runs in the same Curio processes that send your daily proofs. Try it on Calibration Testnet first. If you don't want to run an alpha feature next to your sealed sectors, run Curio-PDP on a separate server instead. See [Provide warm storage](provide-warm-storage.md).
{% endhint %}

## Before you start

* A running sealing cluster. See [Build a sealing cluster](build-a-sealing-cluster.md).
* A domain with an A record that points to the Curio machine that will serve PDP. Open TCP ports 80 and 443 to it.
* Hard disk set aside for PDP data.
* FIL for a new PDP wallet: about 8 FIL on Mainnet, or 5 test FIL on Calibration Testnet.

## Step 1: Turn on Lotus's Ethereum RPC

PDP talks to its contracts through your Lotus node. On the Lotus machine:

```sh
sed -i 's/^\( *\)#*EnableEthRPC = .*/\1EnableEthRPC = true/; s/^\( *\)#*EnableIndexer = .*/\1EnableIndexer = true/' ~/.lotus/config.toml
```

Then restart Lotus.

## Step 2: Update Curio

The normal Curio release includes PDP. Upgrade to a recent release, because Curio adds the PDP database tables when it starts. Check the startup logs for the database upgrade.

## Step 3: Attach PDP storage

On the machine that owns the PDP disk:

```sh
curio cli storage attach --init --store --allow-types piece /mnt/pdp
```

To keep PDP data off your sealed-sector disks, add `"DenyTypes": ["piece"]` to the `sectorstore.json` file of each of those paths, then restart Curio on that machine.

## Step 4: Add a pdp layer

Create the layer with `curio config edit pdp`:

```toml
[Subsystems]
EnableParkPiece = true
EnablePDP = true
EnableCommP = true
EnableMoveStorage = true
```

PDP also needs Curio's HTTPS server. If you set up the storage market, it's already on. If not, add this to the `base` layer:

```toml
[HTTP]
Enable = true
DomainName = "pdp.example.com"
ListenAddress = "0.0.0.0:443"
```

Add `pdp` to `CURIO_LAYERS` in `/etc/curio.env` on the machine that serves HTTPS, for example `CURIO_LAYERS=gui,post,seal,pdp`. Then restart Curio:

```sh
sudo systemctl restart curio.service
```

If Curio can't use port 443, run `sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/curio` and restart again.

## Step 5: Create and fund the PDP wallet

Create a new wallet just for PDP, separate from your owner and worker wallets:

```sh
lotus wallet new delegated
lotus wallet export <new-address> | xxd -r -p | jq -r '.PrivateKey' | base64 -d | xxd -p -c 32
```

The second command prints the private key. In the Curio dashboard, open **PDP**, then **Owner Address**, then **Import Key**, and paste it. Fund the 0x address shown, and keep it topped up.

Don't leave the key in your shell history or in files. Curio stores it in YugabyteDB, so keep backing up the database.

## Step 6: Check and register

From outside your network:

```sh
curl https://pdp.example.com
```

You should get a "Hello" from Curio. Then register on the dashboard's **PDP** page, the same way as in [Provide warm storage](provide-warm-storage.md#step-5-follow-the-pdp-guide), Step 5.

Keep the PDP wallet funded, watch PDP proofs next to your daily sector proofs, and upgrade Curio often while this feature is changing.

## Next steps

* [Verify and go live](verify-and-go-live.md)
* [Monitor proofs and faults](monitor-proofs-and-faults.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/add-warm-storage-to-a-sealing-cluster)
