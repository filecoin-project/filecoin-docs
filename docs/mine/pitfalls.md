## Fund management
### Pledges

* **In the case of pledging, it's optimal to balance out the chance of failure across alotted funds and resources.** For this reason, it is advised to paralellize as much as possible by breaking down available capacity into multiple sectors. For example, running 5 32GB sectors simutaneously may be a useful mitigation to complete loss due to a single error -- but note that, if all 5 sectors were to go down due to an error at the same time, it would result in a significantly higher loss of collateral. It is up to the miners to determine their acceptable level of risk.


* If you run out of collateral (you pledge collateral at the beginning), if sector fails to progress past one of the stages before proving, collateral is locked into that sector, one less sector’s worth of collateral towards minimum miner size and winning blocks
<-- direct copy from notes, need some clarity -->


* **Pledging sectors is not currently an easily automatable process.** This is something that we hope to improve on over the coming weeks.

* **Pledging will often consume too much of the miner’s resources.** This can starve other tasks the miner is performing of computational power, and thus will fail to keep up with ChainNotify events (e.g. Wait Seed -- the one before commit), and keep pledging over and over again.




## Resource management

* **Currently, resource management is a difficult process in Filecoin**; yet conversely, knowing if you have enough resources is important for Lotus to operate correctly. 


* **Lotus acts as if it is memory hungry, but it does not account for the ability to simply ask the OS to free up some more RAM.** This results in task scheduling failures, even if the task is run within the binary itself. If the miner is using the default Lotus sector storage module, this is something to be aware of. This can be resolved by either overprovisioning memory, or rewriting certain parts of the module.

* **Running out of storage capacity on a remote worker node can be bandwidth costly.** Remote workers bring a sector to their local storage, and if maximum capacity is reached before it is completed, the miner will delete it entirely, causing a penalty and a restart.


* **Having a quality mining rig is critical, and no simple nor stock options exist.** <-- not done -->

## Environment configuration

* Importance of how chain data is stored and handled
* Currently difficult to do remote lotus daemon
* Proofs lib must be configured via environment variables


### Fork recovery

* difficult to know what fork currently on
* difficult to acknowledge when behind
* Fork recovery instructions

## Key backups and best security practices

* Secure storage and backup of private keys
* Hardening OS configuration
* Key migration process
* hardware wallets
