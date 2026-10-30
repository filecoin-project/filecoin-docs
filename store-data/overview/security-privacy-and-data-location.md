---
description: >-
  Data on Filecoin Cloud is public by default and readable by anyone with its
  CID; encrypt before upload for privacy, choose providers by region for data
  location, and audit every proof and payment onchain.
---

# Security, privacy and data location

**Data you store in Filecoin Cloud warm storage is public: anyone with its ID can download it.** To keep data private, encrypt it before you upload. You can choose which providers keep your copies, and every proof and payment is recorded onchain, so you can audit them.

## Who can read your data

* **Warm storage.** Providers serve your files over HTTPS to anyone who has the PieceCID. Links are not secret. Providers can also read what they store.
* **Cold storage.** Each deal is public or private. Anyone can retrieve a public deal's data. Only you, and wallets you approve, can retrieve a private deal's data.

If your data is sensitive, encrypt it first.

## Encrypt before you upload

Encrypt files on your own machine, then upload the encrypted files. You keep the keys, and Filecoin Cloud never sees them. To read the data later, download it and decrypt it with your key.

You are responsible for your keys. If you lose a key, no one can recover the data. Integrated tools such as [Lighthouse encryption](https://docs.lighthouse.storage/how-to/upload-encrypted-data) and its [access-control conditions](https://docs.lighthouse.storage/how-to/encryption-features/access-control-conditions) can help.

## Control who can store and delete

Only your wallet can pay for storage. To let an app or agent store data for you, give it a session key: it can upload and delete, but it can't move your funds, and you can revoke it at any time. See [Delegate access with session keys](../warm-storage/delegate-access-with-session-keys.md).

## Where your data is stored

Providers are independent operators, listed onchain in the Service Provider Registry. By default the SDK picks providers for you. You can choose specific providers instead, for example to keep copies in one region. See Select providers by region.

## Proof that your data is intact

* Providers prove they have your data in every proving period, and each proof is recorded onchain.
* The PieceCID is made from your data, so the CLI and SDK can check that what you download is exactly what you stored.

See [Reliability and proofs](reliability-and-proofs.md).

## Deleting data

When you delete a file, the provider is asked to remove it, and proofs and billing for it stop. Filecoin Cloud can't prove that a provider has erased the bytes. If data must be unreadable after you delete it, encrypt it before upload and destroy the key.

## Common questions from security teams

| Question | Answer |
| --- | --- |
| Does Filecoin Cloud encrypt my data? | No. Encrypt it before you upload. |
| Who can download my data? | Anyone with its ID, for warm storage. Only you, for a private cold storage deal. |
| Can I keep data in one region? | Yes, by choosing providers in that region. |
| Can I audit storage and payments? | Yes. Every proof and payment is onchain. |
| What about certifications and contracts? | [Talk to sales](https://filecoin.cloud). |

## Next steps

* [Choose a storage option](../../getting-started/choose-a-storage-option.md).
* [Enterprise developers](../../getting-started/paths/enterprise-developers.md): storing company data on Filecoin.
* [AI developers](../../getting-started/paths/ai-developers.md): storing agent memory, datasets and model weights.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/overview/security-privacy-and-data-location)
