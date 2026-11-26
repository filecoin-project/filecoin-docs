---
description: >-
  The functions of the Service Provider Registry, the onchain list of storage providers and what they offer.
---

# Service Provider Registry contract

**The Service Provider Registry lists every registered provider: its name, payee address and products.** A product is a service the provider offers, such as PDP storage, with **capabilities** stored as key and value pairs, such as the service URL and location.

Being registered isn't the same as being approved. FWSS keeps the **approved** list, and the Endorsements contract keeps the **endorsed** list. The Filecoin SDK puts the first copy with an endorsed provider and other copies with approved providers.

Source: [FilOzone/filecoin-services](https://github.com/FilOzone/filecoin-services). Addresses: [Contract addresses](addresses.md).

## Functions a provider calls

| Function | What it does |
| --- | --- |
| `registerProvider(payee, name, description, productType, capabilityKeys, capabilityValues)` | Registers a provider with its first product |
| `updateProviderInfo(name, description)` | Changes the name or description |
| `addProduct(productType, capabilityKeys, capabilityValues)` | Adds a product |
| `updateProduct(productType, capabilityKeys, capabilityValues)` | Changes a product's capabilities |
| `removeProduct(productType)` | Removes a product |
| `removeProvider()` | Removes the provider from the registry |

## Read functions

| Function | Returns |
| --- | --- |
| `getProvider(providerId)` | A provider's details |
| `getProviderByAddress(providerAddress)`, `getProviderIdByAddress(providerAddress)` | A provider, or its ID, from its address |
| `getProviderPayee(providerId)` | The address that receives payments |
| `getAllActiveProviders(offset, limit)` | A page of active providers |
| `getProvidersByProductType(productType, onlyActive, offset, limit)` | Providers that offer a product |
| `getProductCapabilities(providerId, productType, keys)` | Chosen capabilities of a product |
| `getAllProductCapabilities(providerId, productType)` | All capabilities of a product |
| `isProviderActive(providerId)`, `isRegisteredProvider(provider)` | Whether a provider is active or registered |
| `activeProviderCount()` | How many providers are active |

## Endorsements contract

A separate contract that holds the list of endorsed provider IDs. An endorsed provider is an approved provider that has also made extra service promises, such as support response times. Providers are added and removed by hand.

| Function | What it does |
| --- | --- |
| `getProviderIds()` | All endorsed provider IDs |
| `containsProviderId(providerId)` | Whether a provider is endorsed |
| `addProviderId(providerId)`, `removeProviderId(providerId)` | Add or remove a provider (owner only) |

In the Filecoin SDK: `getEndorsedProviderIds` from `@filoz/synapse-core/endorsements`. Address: see [Contract addresses](addresses.md).

## Next steps

* [Add warm storage to a sealing cluster](../../provide-storage/add-warm-storage-to-a-sealing-cluster.md): how providers register through Curio.
* [Contract addresses](addresses.md): where the registry is deployed.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/reference/contracts/service-provider-registry)
