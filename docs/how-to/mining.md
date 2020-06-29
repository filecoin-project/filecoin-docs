# Mining in Filecoin

In most blockchain protocols, "miners" are the participants on the network that do the work necessary to advance the blockchain and maintain its validity. For providing these services, miners are compensated in the native cryptocurrency. The term "miner" emerged in the initial Proof-of-Work era, comparing the work done by hardware miners using computational power to secure blockchains with that of gold miners whom expended vast physical resources for a chance at a large payout.

Mining in Filecoin works quite differently however -- instead of contributing computational power, miners contribute storage capacity to be used in deals with clients looking to store data.

## Types of miners

The Filecoin network will have multiple types of miners:

* Storage miners, responsible for storing files and data on the network.
* Retrieval miners, responsible for providing quick pipes to retrieve files.
* Repair miners, which are to be implemented.

**Storage miners** are the heart of the network. They earn Filecoin by storing data for clients, and computing cryptographic proofs to verify storage across time. The probability of earning the block reward and transaction fees is proportional to the amount of storage the miner contributes to the Filecoin network, and not hashing power.

**Retrieval miners** are the veins of the network. They earn Filecoin by winning bids and mining fees for a particular file, which are determined by the market value of said file's size. A retrieval miner’s bandwidth and bid/initial response time for deals (i.e., latency and proximity to clients) will determine its ability to close retrieval deals on the network. The maximum bandwidth of a retrieval miner will set the total quantity of deals it can make.

In the current implementation, the focus is mostly on storage miners, which sell storage capacity in exchange for FIL. The below sections discuss how to initiate, maintain and receive rewards for a storage miner.

### Coming from another ecosystem?
<-- TBD -->

## Hardware recommendations

The current recommended system specifications for operating a storage miner are:

* An 8+ core CPU
* A NVIDIA-manufactured GPU chip (to be expanded on)
* A dedicated SSD to act as a large cache store (512GB+)
* A large amount of RAM for computing data replication (128GB+)

### Aren't these requirements comparatively high?

<-- still need to think about how to phrase this -->

## Getting started as a miner

For instructions on getting the Filecoin network running and a miner initialized, see the [Lotus client manual](https://lotu.sh/).

## All about deals

<-- bckground -->

<-- instructions, setting up ask - need advising here -->

By default, all Filecoin miners are set to auto-accept any deal that meets their criteria. For those that wish to curate the deals being stored on their system, it is possible to disable the auto-accepting feature with:
<-- need lotus instructions-->

For comprehensive information on how deals are performed on the Filecoin network, see [this section of the documentation](https://docs.filecoin.io/how-to/store-making-storage-deals/).

## Getting rewards

Rewards are automatically deposited into a miner's associated withdrawl wallet as they continue to perform their duties over time. Miners also have a chance at recieving a block reward, allowing them to receive the collected fees associated with it. Their chance at receiving this reward is directly proportional to the amount of storage space the miner is contributing to the network.

All rewards are briefly locked upon being received <-- until certain confirmation count or? -->

<-- checking rewards --> 

<-- withdraw instructions -->

## Uptime, slashing and penalties
<-- intro and links to slashing resources -->

### PoSt challenge windows

In order to test miners uptime quality, PoSt challenges are issued every 24 hours. A miner can miss several of these challenges before eventually being penalized for their inactivity.

<-- checking PoSt window? ->

### Slashing for malicious actions

Miners may also recieve a heavy slashing for performing an action that goes against the network itself, such as submitting 2 blocks built on the same parent tipset. 
