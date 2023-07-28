---
description: >-
  This page describes block rewards in Filecoin, where storage providers are
  elected to produce new blocks and earn FIL as rewards.
---

# Block rewards

## What are block rewards?

WinningPoSt (short for [Winning Proof of SpaceTime](https://spec.filecoin.io/algorithms/pos/post/)) is the cryptographic challenge through which storage providers are rewarded for their contributions to the network. At the beginning of each epoch (1 epoch = 30 seconds), a small number of storage providers are elected by the network to mine new [blocks](../../reference/general/glossary.md#block). Each elected storage provider who successfully creates a block is granted Filecoin tokens by means of a _block reward_. The amount of FIL per block reward varies over time and is listed on various blockchain explorers like [Filfox](https://filfox.info/en).

The election mechanism of the Filecoin network is based on the “storage power” of the storage providers. A minimum of 10 TiB in storage power is required to be eligible for WinningPoSt, and hence to earn block rewards. The more storage power a storage provider has, the more likely they will be elected to mine a block. This concept becomes incredibly advantageous in the context of [Filecoin Plus verified deals](../../basics/how-storage-works/filecoin-plus.md).

## Filecoin’s storage capacity

The Filecoin network is composed of storage providers who offer storage capacity to the network. This capacity is used to secure the network, as it takes a significant amount of storage to take part in the consensus mechanism. This large capacity makes it impractical for a single party to reach 51% of the network power, since an attacker would need 10 EiB in storage to control the network. Therefore, it is important that the raw capacity also referred to as _raw byte power_, remains high. The Filecoin spec also included a _baseline power_ above which the network yields maximum returns for the storage providers.

The graph below shows the evolution of network capacity on the Filecoin network. As can be seen, the baseline power goes up over time (and becomes exponential). This means from May 2021 to February 2023 the network yielded maximum returns for storage providers. However, in recent history, Quality Adjusted Power (QAP) has taken over as a leading indicator of relevance for the Filecoin network. QAP is the result of the multiplier when storing verified deals:

<figure><img src="https://docs.filecoin.io/storage-provider/filecoin-economics/block-rewards/capacity_hucae1100079a6c2042249cc1b2d9e4bf1_232738_1725x0_resize_q75_h2_box_3.webp" alt=""><figcaption></figcaption></figure>

Check out the Starboard dashboard for the most up-to-date [Network Storage Capacity](https://dashboard.starboard.ventures/capacity-services#network-storage-capacity).

## Impact of storage capacity on block rewards

As mentioned before, when the Raw Byte Power is above the Baseline Power, storage providers yield maximum returns. When building a business plan as a storage provider, it is important not to rely solely on block rewards. Block rewards are an incentive mechanism for storage providers. However, they are volatile and depend on the state of the network, which is largely beyond the control of storage providers.

The amount of FIL that is flowing to the storage provider per earned block reward is based on a combination of simple minting and baseline minting. Simple minting is the minimum amount of FIL any block will always have, which is 5.5. Baseline minting is the extra FIL on top of the 5.5 that comes from how close the Raw Byte Power is to the Baseline Power.

The below graph shows the evolution of FIL per block reward over time:

<figure><img src="https://docs.filecoin.io/storage-provider/filecoin-economics/block-rewards/blockrewards_hu5b84e6fec805895d08ed475aa385a4a9_134941_1725x0_resize_q75_h2_box_3.webp" alt=""><figcaption></figcaption></figure>

There is a positive side to releasing less FIL per block reward too. As Filecoin has a capped maximum token supply of 2 billion FIL, the slower minting rate allows for minting over a longer period. A lower circulating supply also has a positive effect on the price of FIL.

See the [Crypto Economics](../../basics/what-is-filecoin/crypto-economics.md) page of this documentation and the [Filecoin spec](https://spec.filecoin.io/#section-systems.filecoin\_token.minting\_model) for more information.

## Filecoin’s storage capacity

The Filecoin network is composed of storage providers who offer storage capacity to the network. This capacity is used to secure the network, as it takes a significant amount of storage to take part in the consensus mechanism. This large capacity makes it impractical for a single party to reach 51% of the network power, since an attacker would need 10 EiB in storage to control the network. Therefore, it is important that the raw capacity also referred to as _raw byte power_, remains high. The Filecoin spec also included a _baseline power_ above which the network yields maximum returns for the storage providers.

The graph below shows the evolution of network capacity on the Filecoin network. As can be seen, the baseline power goes up over time (and becomes exponential). This means from May 2021 to February 2023 the network yielded maximum returns for storage providers. However, in recent history, Quality Adjusted Power (QAP) has taken over as a leading indicator of relevance for the Filecoin network. QAP is the result of the multiplier when storing verified deals:

<figure><img src="https://docs.filecoin.io/storage-provider/filecoin-economics/block-rewards/capacity_hucae1100079a6c2042249cc1b2d9e4bf1_232738_1725x0_resize_q75_h2_box_3.webp" alt=""><figcaption></figcaption></figure>

Check out the Starboard dashboard for the most up-to-date [Network Storage Capacity](https://dashboard.starboard.ventures/capacity-services#network-storage-capacity).

## Impact of storage capacity on block rewards

As mentioned before, when the Raw Byte Power is above the Baseline Power, storage providers yield maximum returns. When building a business plan as a storage provider, it is important not to rely solely on block rewards. Block rewards are an incentive mechanism for storage providers. However, they are volatile and depend on the state of the network, which is largely beyond the control of storage providers.

The amount of FIL that is flowing to the storage provider per earned block reward is based on a combination of simple minting and baseline minting. Simple minting is the minimum amount of FIL any block will always have, which is 5.5. Baseline minting is the extra FIL on top of the 5.5 that comes from how close the Raw Byte Power is to the Baseline Power.

The below graph shows the evolution of FIL per block reward over time:

<figure><img src="https://docs.filecoin.io/storage-provider/filecoin-economics/block-rewards/blockrewards_hu5b84e6fec805895d08ed475aa385a4a9_134941_1725x0_resize_q75_h2_box_3.webp" alt=""><figcaption></figcaption></figure>

There is a positive side to releasing less FIL per block reward too. As Filecoin has a capped maximum token supply of 2 billion FIL, the slower minting rate allows for minting over a longer period. A lower circulating supply also has a positive effect on the price of FIL.

See the [Crypto Economics](../../basics/what-is-filecoin/crypto-economics.md) page of this documentation and the [Filecoin spec](https://spec.filecoin.io/#section-systems.filecoin\_token.minting\_model) for more information.
