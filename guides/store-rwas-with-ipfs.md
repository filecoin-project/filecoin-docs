---
description: >-
  Link a tokenized asset to its offchain records, such as deeds and appraisals, by storing them on Filecoin and recording their CIDs onchain.
---

# Store RWAs with IPFS

**A tokenized asset depends on offchain records: deeds, appraisals, certifications. Store those records on Filecoin, record each one's CID in your onchain app, and anyone can later check that a record is exactly the one the asset points to.**

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me try the Filecoin RWA demo and verify its records by following this page:
https://docs.filecoin.io/guides/store-rwas-with-ipfs.md

1. Use the Calibration testnet until I tell you to use mainnet.
2. Send me any approval or funding link, then wait for me. Never ask me for a private key or seed phrase.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* [Git](https://git-scm.com)
* Node.js 24 or newer
* No wallet. The demo runs on Avalanche Fuji and Filecoin Calibration with its own test data
{% endhint %}

## How it works

1. The issuer adds a record, such as a deed.
2. IPFS gives it a CID made from its content. Change the record and the CID changes.
3. Filecoin stores the record, and providers prove they keep it.
4. Your app records the CID with the asset onchain. The demo uses Avalanche.
5. Anyone can fetch the record and check it matches that CID.

## Step 1: Open the demo

The [working demo](https://sgtpooki.github.io/Avalanche-IPFS-Filecoin-RWA-reference-Architecture/) publishes a synthetic property record set for 123 Main Street: a deed, a survey, a parcel file, and two tax assessments.

## Step 2: Verify it from a terminal

```sh
git clone https://github.com/SgtPooki/Avalanche-IPFS-Filecoin-RWA-reference-Architecture.git
cd Avalanche-IPFS-Filecoin-RWA-reference-Architecture
npm ci
npm run verify
```

## Step 3: See tampering caught

| Document | CID |
| --- | --- |
| `deed.pdf` (original) | `bafkreidh5qsi5z6uo2thzvynr27ioajoviafqiveunrielhugyj65l6rzu` |
| `deed-tampered.pdf` (one line edited) | `bafkreiausintabvl4n4hvgv2jdmazvy35bg26gku2ufu2bosxhrd7dzxqi` |

In the demo, open **Check a document** and drop in either file. It's hashed in your browser, not uploaded, and the edited copy is reported as not a document of record.

## Build it for your asset

* **Store records** with the [Filecoin SDK](../store-data/tools/filecoin-sdk.md), as the demo does.
* **Anchor** a manifest CID in a registry contract on your chain.
* **Verify** by re-hashing retrieved bytes and checking the data set's proof status.

See the [implementation guide](https://github.com/SgtPooki/Avalanche-IPFS-Filecoin-RWA-reference-Architecture#fork-map).

## Limits

Verification shows the content was stored and hasn't changed. It doesn't show that a deed is legitimate.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm run verify` fails to fetch a record | Wait a few minutes, then try again. Gateways can be slow to return new content |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Keep immutable, auditable records](keep-immutable-auditable-records.md)
* [Reliability and proofs](../store-data/overview/reliability-and-proofs.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/store-rwas-with-ipfs)
