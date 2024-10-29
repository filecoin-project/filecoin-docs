---
description: >-
  This page describes how sealing-as-a-service works, and the benefits to
  storage providers.
---

# Sealing-as-a-service

Storage providers with hardware cost or availability constraints can use _Sealing-as-a-service_, in which another provider performs sector sealing on the storage providers behalf. This page describes how sealing-as-a-service works, and the benefits to storage providers.

### Overview

In a traditional setup, a storage provider needs high-end hardware to build out a [sealing pipeline](sealing-pipeline.md). Storage providers with hardware cost or availability constraints can use _Sealing-as-a-Service_ providers, where another provider performs sector sealing on the storage provider’s behalf. In this model, the following occurs:

1. The storage provider provides the data to the sealer
2. The sealer seals the data into sectors.
3. The sealer returns the sealed sectors in exchange for a service cost.

### Benefits

Sealing-as-a-service provides multiple benefits for storage providers:

* Available storage can be filled faster, thereby maximizing block rewards, without investing in a complex, expensive sealing pipeline.
* Bigger deals can be onboarded, as Sealing-as-a-Service essentially offers a burst capability in your sealing capacity. Thus, storage providers can take on larger deals without worrying about sealing time and not meeting client expectations.
* Storage capacity on the Filecoin network can be expanded without investing in a larger sealing pipeline.

Other solutions are possible where the sealing partner seals committed capacity (CC) sectors for you, which you in turn [snap up](../filecoin-deals/snap-deals.md) to data sectors.

See the following video from [Aligned](https://aligned.co/sealing-as-a-service) about their offering of Sealing-as-a-Service:

{% embed url="https://www.youtube.com/watch?v=v4l1lGsUXvs" %}



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/storage-providers/architecture/sealing-as-a-service)
