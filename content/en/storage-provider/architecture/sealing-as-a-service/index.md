---
title: "Sealing-as-a-service"
description: "This page covers what Sealing-as-a-service providers are, and how storage providers can utilize them in their infrastructure architecture."
lead: "Storage providers with hardware cost or availability constraints can use _Sealing-as-a-service_, in which another provider performs sector sealing on the storage providers behalf. This page describes how sealing-as-a-service works, and the benefits to storage providers."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-architecture"
    identifier: "sealing-as-a-service-65969c343e79242db575a1cb8e5a69b9"
weight: 440
toc: true
---

## Overview

In a traditional setup, a storage provider needs high-end hardware to build out a [sealing pipeline]({{<relref "sealing-pipeline">}}). Storage providers with hardware cost or availability constraints can use _Sealing-as-a-Service_ providers, where another provider performs sector sealing on the storage provider's behalf. In this model, the following occurs:

1. The storage provider provides the data to the sealer
1. The sealer seals the data into sectors.
1. The sealer returns the sealed sectors in exchange for a service cost.

## Benefits

Sealing-as-a-service provides multiple benefits for storage providers:

- Available storage can be filled faster, thereby maximizing block rewards, without investing in a complex, expensive sealing pipeline.
- Bigger deals can be onboarded, as Sealing-as-a-Service essentially offers a burst capability in your sealing capacity. Thus, storage providers can take on larger deals without worrying about sealing time and not meeting client expectations.
- Storage capacity on the Filecoin network can be expanded without investing in a larger sealing pipeline.

Other solutions are possible where the sealing partner seals committed capacity (CC) sectors for you, which you in turn [snap up]({{<relref "snap-deals">}}) to data sectors.

See the following video from [Aligned](https://aligned.co/sealing-as-a-service) about their offering of Sealing-as-a-Service:

{{< youtube "v4l1lGsUXvs" >}}
