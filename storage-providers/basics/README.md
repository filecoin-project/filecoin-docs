---
description: >-
  This page will help you understand how to plan a profitable business, design a
  suitable storage provider architecture, and make the right hardware
  investments.
keywords: "earn FIL, Filecoin rewards, storage provider rewards, stake FIL, staking FIL, Filecoin staking, become storage provider, FIL staking alternative"
---

# Basics

The Filecoin network provides decentralized data storage and makes sure data is verified, always available, and immutable. Storage providers in the Filecoin network are in charge of storing, providing content and issuing new blocks.

To become a storage provider in the Filecoin network you need a range of technical, financial and business skills. We will explain all the key concepts you need to understand in order to design a suitable architecture, make the right hardware investments, and run a profitable storage provider business.

Follow these steps to begin your storage provider journey:

1. Understand Filecoin economics
2. Plan your business
3. Make sure you have the right skills
4. Build the right infrastructure

## Understand Filecoin economics

To understand how you can run a profitable business as a Filecoin storage provider, it is important to make sure you understand the economics of Filecoin. Once you understand all core concepts, you can build out a strategy for your desired ROI.

Storage providers can also add additional value to clients when they offer certain certifications. These can enable a storage provider to charge customers additional fees for storing data in compliance with those standards, for example, HIPAA, SOC2, PCI, GDPR and others.

[Filecoin economics ->](../filecoin-economics/storage-proving.md)

## Plan your business <a href="#plan-your-business" id="plan-your-business"></a>

The hardware and other requirements for running a Filecoin storage provider business are significantly higher than regular blockchain mining operations. The mechanisms are designed this way because, in contrast to some other blockchain solutions, where you can simply configure one or more nodes to “mine” tokens, the Filecoin network’s primary goal is to provide decentralized storage for humanity’s most valuable data.

You need to understand the various earning mechanisms in the Filecoin network.

[Filecoin deals ->](../filecoin-deals/storage-deals.md)

### Daily fees and startup readiness (FIP-0100)

With the activation of [FIP-0100](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0100.md) in network version 25, all new sectors — and any sectors that are extended or updated — incur a daily fee.

This fee replaces the previous batch fee model and introduces a predictable cost structure tied to each sector’s quality-adjusted power and the network’s circulating supply.

The fee begins accruing the day after a sector is committed or extended. It is deducted automatically at the end of each proving deadline.

The network first draws from vesting block rewards. If those are insufficient, it draws from the miner’s available balance. If both are empty, the unpaid amount becomes **fee debt**.

Fee debt does not directly cause faults. However, it can impact operations:

- A miner with fee debt may be blocked from submitting certain messages (e.g., pre-commits or recoveries).
- If the balance is too low to pay for WindowPoSt messages, sectors may fault.
- Critically, a miner with outstanding fee debt cannot win block rewards until the debt is repaid.

To avoid this, storage providers should:

- Keep a FIL buffer in the miner actor’s balance.
- Avoid fully withdrawing unlocked funds unless upcoming rewards will cover future fees.

### Startup considerations

Miners become eligible to win block rewards once they reach **10 TiB of raw byte power (RBP)**.

However, rewards are not guaranteed as soon as that threshold is met. Block production is probabilistic, and smaller miners may wait longer to win a block — especially when competing against larger ones.

This creates a funding gap during the startup phase.

New storage providers must plan for this by funding their miner actor with enough FIL to:

- Cover daily fees during onboarding,
- Support message submission (like WindowPoSt),
- And continue sealing until rewards start arriving.

While the amount of FIL required is relatively small compared to overall infrastructure costs, it is operationally critical. Without it, the miner may become stuck — unable to seal new sectors, submit required messages, or produce blocks and win block rewards due to fee debt or insufficient balance.

To estimate how much FIL may be needed, review the [FIP-0100 discussion thread](https://github.com/filecoin-project/FIPs/discussions/1105) or use the [real-time fee calculator](https://penalty.660688.xyz/dailyfee) to model your expected onboarding rate.

## Make sure you have the right skills <a href="#make-sure-you-have-the-right-skills" id="make-sure-you-have-the-right-skills"></a>

As will become clear, running a storage operation is a serious business, with client data and pledged funds at stake. You will be required to run a highly-available service, and there are automatic financial penalties if you cannot demonstrate data availability to the network. There are many things that can go wrong in a data center, on your network, on your OS, or at an application level.

You will need skilled people to operate your storage provider business. Depending on the size and complexity of your setup this can be 1 person with skills across many different domains, or multiple dedicated people or teams.

[People and skills ->](../skills/linux.md)

## Build the right infrastructure <a href="#build-the-right-infrastructure" id="build-the-right-infrastructure"></a>

At the lowest level, you will need datacenter infrastructure. You need people capable of architecting, racking, wiring and operating infrastructure components. Alternatively, you can get it collocated, or even entirely as a service from a datacenter provider.

Take availability and suitable redundancy into consideration when choosing your datacenter or collocation provider. Any unavailability of your servers, network or storage can result in automatic financial penalties on the Filecoin network.

[Software architecture ->](../architecture/lotus-components.md)

[Infrastructure ->](../skills/storage.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/storage-providers/basics)
