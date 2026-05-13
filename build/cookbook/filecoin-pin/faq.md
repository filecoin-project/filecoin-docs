# FAQ

## What is Filecoin Pin?

Filecoin Pin stores IPFS content on the Filecoin Network of decentralized Storage Providers. It enables developers to programmatically pay for storage and retrieval with Filecoin Pay. When SPs prove storage, they are paid from the developers' Filecoin Pay Account.

***

### How can I use Filecoin Pin today?

Three paths are available:

* **CLI:** Upload files from your terminal on Filecoin Mainnet. Fund storage from your own wallet. [Get started here](getting-started.md).
* **GitHub Action:** Automate pinning of websites or build artifacts in your CI/CD pipeline.
* **Website (demo):** Upload files in your browser using a pre-funded test wallet on Calibration testnet.

***

### What do I need to get started?

* You can find different links related to Filecoin Pin here: [Filecoin Pin documentation](README.md)

***

### How do payments and approvals work?

* **Website (demo):** The demo wallet handles payments. It has been prefunded with testnet USDFC and FIL. Users don't need to connect their own wallet.
* **CLI / GitHub Action:** Your wallet handles payments on Mainnet. You approve and deposit USDFC funds through Filecoin Pay once, then the CLI manages payments automatically.

{% hint style="info" %}
Storage providers receive payment after cryptographically proving data possession.
{% endhint %}

***

### How does auto-funding work?

Use `--auto-fund` when uploading. The CLI calculates storage costs automatically. It deposits the right amount of USDFC to your payment rail.

{% hint style="info" %}
No manual deposit calculations needed. The system handles it.
{% endhint %}

***

### How long is my data stored?

On **Mainnet** (the default), data persists as long as you maintain deposits in Filecoin Pay. Storage providers must prove they hold your data daily or they stop receiving payment. The CLI supports auto-funding to keep your runway healthy.

On **Calibration testnet** (the demo website), data has no persistence guarantees. Treat it as a demo environment only.

***

### What is a Data Set?

A Data Set groups your uploads together. Each upload becomes a "piece" within the Data Set. Multiple files you upload share the same payment rail.

Check your Data Set with `filecoin-pin data-set <id>`.

***

### How do I retrieve my data?

Three methods:

1. **IPFS Gateways:** Use public gateways with your root CID: `https://gateway.example.com/ipfs/<root-cid>`
2. **Direct from Storage Provider:** Get the direct download URL from `filecoin-pin data-set <id>`
3. **IPFS Tools:** Use Kubo, Helia, IPFS Desktop with your root CID.

***

### What is a piece CID vs root CID?

**Root CID** (bafybei...) is your IPFS content identifier. Use this to retrieve your data.

**Piece CID** (bafkzci...) is the Filecoin commitment. Storage Providers prove they store this piece.

{% hint style="info" %}
Both are linked cryptographically on-chain.
{% endhint %}

***

### How do I verify my data is actually stored?

Two ways to verify:

1. **CLI:** Run `filecoin-pin data-set <id>` to see on-chain verification. Check proof status and piece details.
2. **PDP Explorer:** Visit `https://pdp.vxb.ai/calibration/dataset/{datasetID}` to view proofs in your browser.

{% hint style="info" %}
Both methods show CommP and proof state directly from blockchain state.
{% endhint %}

***

### How do I access the code for the dApp and CLI?

See the repos as reference implementations and to fork for my own project?

* **Website**: [https://github.com/filecoin-project/filecoin-pin-website](https://github.com/filecoin-project/filecoin-pin-website)
* **CLI:** [https://github.com/filecoin-project/filecoin-pin](https://github.com/filecoin-project/filecoin-pin)

***

## References

* Filecoin Pin CLI Docs: [Filecoin Pin documentation](README.md)
* Filecoin Pin dApp Repo: [https://github.com/filecoin-project/filecoin-pin-website](https://github.com/filecoin-project/filecoin-pin-website)
* Synapse SDK: [https://github.com/FilOzone/synapse-sdk](https://github.com/FilOzone/synapse-sdk)
* USDFC documentation: [https://docs.secured.finance/usdfc-stablecoin/getting-started](https://docs.secured.finance/usdfc-stablecoin/getting-started)
