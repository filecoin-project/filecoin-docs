# Filecoin Pin Launch -  FAQ

### What is Filecoin Pin?

Filecoin Pin stores IPFS content on the Filecoin Network of decentralized Storage Providers. It enables developers to programmatically pay for storage and retrieval with Filecoin Pay. When SPs prove storage, they are paid from the developers' Filecoin Pay Account.

***

### How can I use Filecoin Pin today?

Two paths are available:

1. **Website**: Upload files in your browser. Uses a pre-funded wallet.
2. **CLI**: Upload files from your terminal. Fund storage from your own wallet.

{% hint style="info" %}
**Both run on the Calibration testnet**. They use `tFIL` and `USDFC`.&#x20;
{% endhint %}

{% hint style="danger" %}
Data has no persistence guarantees while on Calibnet.
{% endhint %}

***

### What do I need to get started?

* Go to the Filecoin Pin dApp: [https://pin.filecoin.cloud/](https://pin.filecoin.cloud/) where you can upload Filecoin IPFS to the Filecoin Storage Network
* CLI quickstart: [https://docs.filecoin.io/builder-cookbook/filecoin-onchain-cloud/filecoin-pin](https://docs.filecoin.io/builder-cookbook/filecoin-onchain-cloud/filecoin-pin) (this is pending PR [https://github.com/filecoin-project/filecoin-docs/pulls](https://github.com/filecoin-project/filecoin-docs/pulls) )

***

### How do payments and approvals work?

* **Website**: The demo wallet handles payments. It has been prefunded with testnet USDFC and tFIL. Users don't need to connect their own wallet.
* **CLI**: Your test wallet handles payments. You approve and deposit funds through the Filecoin Pay smart contracts.

{% hint style="info" %}
Storage providers receive payment after cryptographically proving possession of your data.
{% endhint %}

***

### How does auto-funding work?

Use `--auto-fund` when uploading with `add`. The CLI calculates storage costs automatically. It deposits the right amount of USDFC to your payment rail.

{% hint style="info" %}
No manual deposit calculations needed. The system handles it.
{% endhint %}

***

### How long is my data stored?

This runs on Calibration testnet only. Treat it as a demo. No duration guarantees exist for Website or CLI.

Mainnet will offer persistence guarantees. Data persists while you maintain deposits. The CLI supports auto-funding for storage.

***

### What is a Data Set?

A Data Set groups your uploads together. Each upload becomes a "piece" within the Data Set. Multiple files you upload share the same payment rail.

Check your Data Set with `filecoin-pin data-set <id>`.

***

### How do I retrieve my data?

Three primary methods:

1. **IPFS Gateways**: Use public gateways with your root CID: `https://gateway.example.com/ipfs/<root-cid>`
2. **Direct from Storage Provider**: Get the direct download URL from `filecoin-pin data-set <id>`
3. **IPFS** Tools: Use Kubo, Helia, IPFS Desktop with your root CID.

***

### What is a piece CID vs root CID?

* **Root CID** (bafybei...) is your IPFS content identifier. Use this to retrieve your data.
* **Piece CID** (bafkzci...) is the Filecoin commitment. Storage Providers prove they store this piece.

***

### How do I verify my data is actually stored?

Run `filecoin-pin data-set <id>` to see on-chain verification. Check proof status and piece details.

Every piece shows its CommP and proof state. This data comes directly from blockchain state.

You can go to the Explorer with your data-set id: [https://pdp.vxb.ai/calibration/dataset/170](https://pdp.vxb.ai/calibration/dataset/170)

***

### How do I access the code for the dApp and CLI?

See the repos as reference implementations and to fork for my own project?

* Website: [https://github.com/filecoin-project/filecoin-pin-website](https://github.com/filecoin-project/filecoin-pin-website)
* CLI: [https://github.com/filecoin-project/filecoin-pin](https://github.com/filecoin-project/filecoin-pin)

***

### References

* Filecoin Pin CLI Docs: [https://docs.filecoin.io/builder-cookbook/filecoin-onchain-cloud/filecoin-pin](https://docs.filecoin.io/builder-cookbook/filecoin-onchain-cloud/filecoin-pin)
* Filecoin Pin CLI Repo: [https://github.com/filecoin-project/filecoin-pin](https://github.com/filecoin-project/filecoin-pin)
* Filecoin Pin Demo dApp: https://pin.filecoin.cloud/
* Filecoin Pin dApp Repo: [https://github.com/filecoin-project/filecoin-pin-website](https://github.com/filecoin-project/filecoin-pin-website)
* Synapse SDK: [https://github.com/FilOzone/synapse-sdk](https://github.com/FilOzone/synapse-sdk)
* USDFC documentation: [https://usdfc.io/](https://usdfc.io/) (or project docs as available)

\
