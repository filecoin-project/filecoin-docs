---
description: >-
  Move content you have already pinned on IPFS onto Filecoin Onchain Cloud
  without changing your CIDs.
---

# Migrating IPFS pins to Filecoin Onchain Cloud

IPFS2FOC exists to bring content you have already pinned on IPFS onto Filecoin Onchain Cloud. Once your existing CIDs are moved, everything you upload from then on should go through [Filecoin Pin](../README.md).

***

## What is IPFS2FOC?

[**IPFS2FOC**](https://github.com/FilOzone/ipfs2foc) is a migration tool that seamlessly transfers content from IPFS to the Filecoin Onchain Cloud. It takes a list of CIDs you already have pinned - whether on a pinning service like Pinata or Storacha, or any public IPFS gateway - and commits that data directly to Filecoin storage providers.

Once migrated, your data is paid for onchain and backed by Filecoin's ongoing cryptographic proofs of possession, ensuring verifiable, long-term persistence.

{% hint style="info" %}
**IPFS2FOC is a bridge, and it is moving.** Bulk migration is actively being moved into a native `filecoin-pin migrate` subcommand, so that migrating an existing inventory and pinning new content end up in one tool. Until that lands, `ipfs2foc` is how you move an inventory across - [migrate from the command line](command-line.md) is the path to use today.
{% endhint %}

### Key features and guarantees

* **Zero CID changes** - The defining property of IPFS2FOC is that your CIDs are immutable. The tool never re-encodes or re-chunks your data. Every object remains byte-for-byte identical to its original state.
* **Preserved links and embeds** - Because your original CIDs are preserved, every existing link, reference, app integration, and web embed you have already published keeps working without modification.
* **Identical retrieval** - After the migration, you continue to retrieve your content exactly as you always have: by its original CID, over standard IPFS networks and trusted gateways.
* **Verifiable onchain end state** - The end state of your migration is not a dashboard claim. Storage deals, provider commitments, and proofs of possession are verified directly against the Filecoin blockchain itself.

***

## Who is IPFS2FOC for?

IPFS2FOC is built for anyone who relies on IPFS for content addressing and wants to move that content wholesale onto Filecoin storage providers, for the verifiable durability, cryptographic guarantees, and decentralized backing they bring. That is the whole qualification - you have CIDs today, and you want all of them on Filecoin Onchain Cloud, migrated efficiently and resumably rather than one upload at a time.

It is a one-time tool. Once the existing IPFS content you care about is on Filecoin Onchain Cloud, IPFS2FOC is no longer needed.

{% hint style="info" %}
If you have no existing pins and simply want to start storing content on Filecoin, you do not need IPFS2FOC. Go straight to [Filecoin Pin](../README.md).
{% endhint %}

### Primary use cases

* **Teams migrating pinning providers** - Built for teams offboarding from traditional pinning services. If your content is already public and addressable on IPFS, re-uploading everything one-by-one is inefficient, time-consuming, and may end up storing the content using different hashing algorithms, resulting in broken links. IPFS2FOC manages this process for you.
* **Projects with immutable CIDs** - Essential for projects where changing a content identifier is simply not an option, including:
  * **NFT metadata and media** - Smart contracts referencing fixed IPFS URIs that cannot be edited.
  * **Dataset releases and scientific archives** - Published research data that must remain byte-for-byte identical for citation and reproducibility.
  * **Documentation sites and web apps** - Published links, static assets, and embeds that would break if re-hashed.
  * **Permanent archives** - Long-term historical data where address stability is critical.

***

## IPFS2FOC and Filecoin Pin

These two tools are companions, and it is worth being precise about which does what.

|                      | IPFS2FOC                             | Filecoin Pin              |
| -------------------- | ------------------------------------ | ------------------------- |
| **Purpose**          | Move content already pinned on IPFS  | Pin new content           |
| **When you use it**  | Once, during your transition         | Every day, ongoing        |
| **Input**            | A list of CIDs you already have      | Files you are uploading now |

The intended path is a single handoff:

1. Move your existing pins across with **IPFS2FOC**.
2. From that point forward, everything new goes through **Filecoin Pin**.

That handoff is being collapsed into one tool: as noted above, bulk migration is moving into the native `filecoin-pin migrate` subcommand.

***

## Where your content is fetched from

The migration reads each CID from an HTTPS gateway, and that gateway has to return content in a **verifiable** form - bytes that re-hash back to the CID being requested. A gateway that reassembles content into an ordinary file response cannot be used, because the storage provider re-validates what it receives before committing anything.

Support varies by pinning provider. Some serve the required format out of the box, some depend on per-bucket or per-account configuration, and one cannot be used as a source directly at all.

| Where your pins live today | Gateway to pass to `--gateway` | Works as a source?                                                                                                          |
| -------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Pinata**                 | `https://gateway.pinata.cloud` | Yes. Both the shared gateway and dedicated `*.mypinata.cloud` hostnames.                                                     |
| **Public IPFS network**    | `https://trustless-gateway.link` | Yes. A public, no-account trustless gateway, and the tool's default.                                                       |
| **Filebase**               | `https://<bucket>.myfilebase.com` | Depends on the bucket's gateway configuration - some buckets return reassembled files. Probe each bucket before you run.  |
| **Storj**                  | A gateway-MT share link        | Only with share links generated for raw or trustless linksharing. Default share links return landing pages and do not work. |
| **nft.storage (classic)**  | `https://nftstorage.link`      | Mixed. Behavior changed across their own migration, so probe the specific CIDs you care about.                               |
| **web3.storage (w3up)**    | None per account               | Not directly - there is no per-account gateway to target. You'll need to expose the same CIDs through a gateway you control. |
| **Self-hosted Kubo**       | Your own HTTPS host            | Yes, on a public hostname with valid TLS, with `Gateway.DeserializedResponses` set to `false`, and holding the CIDs locally. |

On w3up, your options are a self-hosted Kubo node, a Pinata account pinning the same CIDs, or `trustless-gateway.link` if the content is on the public IPFS network.

### Probe before you plan a run

Provider behavior drifts, so confirm a gateway serves your content before spending anything. Check a single CID with `ipfs2foc probe <cid> --gateway <url>`, or pre-flight a whole list with `ipfs2foc analyze --cids cids.txt --gateway <url>` to get a pass rate.

| Result | What it means                                                                                                                                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OK`   | The gateway serves verifiable content for that CID. Use it - pass it with `--gateway` on every command in your run.                                                                                                                |
| `WARN` | The gateway responded, but not with verifiable content. It cannot be a source - pick another row from the table above.                                                                                                             |
| `FAIL` | The request did not complete at all. This covers everything from a DNS failure to a blocked TLS connection, and public gateways are not reachable from every network. Try another gateway before assuming your content is at fault. |

***

## How a migration works

Four stages, all driven by one command.

1. **Read** - For each CID, the tool fetches the content from a public IPFS gateway and computes its Filecoin piece commitment. Nothing is uploaded and nothing is charged at this stage; it is a measurement pass.
2. **Pack** - Many objects are bundled into larger pieces before any onchain commitments are made. This is what makes the migration affordable, as onchain cost scales with the number of _pieces_, not with the number of CIDs. Packing thousands of small IPFS files costs roughly the same in onchain confirmation fees as migrating a single file.
3. **Upload** - Your machine streams each packed piece directly to a storage provider. By default your data is stored across two storage providers for redundancy. The primary provider receives the initial upload directly from your machine, while the secondary provider automatically pulls its copy from the primary. The data is deleted from your local machine as soon as it is confirmed as stored with a Filecoin Onchain Cloud storage provider.
4. **Commit** - The new pieces are committed and recorded onchain in batches. Upon completion, the tool outputs a summary containing your Data Set IDs and direct Filecoin explorer links. Once committed, storage providers must continuously generate cryptographic Proofs of Data Possession (PDP) on a recurring schedule to remain eligible for automated onchain payment.

Data sets are created automatically during the run with IPFS indexing enabled, which is what keeps every original CID retrievable by its own identifier afterwards.

***

## Next steps

* [**Migrate from the command line**](command-line.md) - the full walkthrough, from install through to onchain verification.
* [**Filecoin Pin**](../README.md) - where all your new uploads should go once the migration is done.
* [**IPFS2FOC on GitHub**](https://github.com/FilOzone/ipfs2foc) - source code and full command reference.
