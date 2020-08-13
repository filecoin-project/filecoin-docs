---
title: Space Race
description: An overview of the 'Space Race', the Filecoin testnet incentive program.
---

# The Filecoin Space Race

The testnet incentives program (also known as the 'Space Race') is a collaborative competition intended to stress-test the network, encourage participation all over the world, and help miners get ready to run the world’s biggest decentralized storage network. 

## Structure and rules 

The competition’s basic structure is simple: for three weeks, miners will compete to onboard as much storage capacity as possible to the network. The top 100 miners globally, as well as the top 50 miners from each continent, will earn Filecoin rewards based on how much storage they and the network achieve during the test period.

A miner’s “location,” for regional leaderboards, is the physical location of the mining operation. Operations split between multiple regions must run multiple miners. Miners will be required to submit documentation verifying their location claims. Claiming to be from a different location will disqualify you from rewards and leaderboard inclusion.

## How do I participate?

You must be able to run at least 1 miner to participate. 

**The calibration period is currently open.** To join, run at least 1 miner on the [calibration devnet](https://docs.filecoin.io/how-to/networks/#calibration-devnet). A preview of calibration standings is available on the [Preview Dashboard](https://calibration.spacerace.filecoin.io/). 

The competition period is not yet open. The competition will include a full dashboard where miners can view global and regional reward tiers, as well as individual miner storage power, deal success rate, and sector life cycle command completion, in real-time. Miners will also be able to submit information for location verification, and display their names (individual or company) alongside their miner ID.

For help or additional questions, join the [#space-race](https://filecoinproject.slack.com/archives/C0179RNEMU4) channel on the Filecoin Slack. 

## What are the possible rewards?

  > **NOTICE:** In order to qualify for rewards, users must “claim” their miner ID from the dashboard following the provided instructions before the competition ends, and pass an AML/KYC check.

There are two ways miners can earn additional rewards outside their mining efforts:
* The total size of the reward pool increases alongside total network storage capacity.
* The total pool of rewards is split between eligible mining operations pro rata, based on how much storage they add as a percentage of total network storage.

| Total FIL rewards (global pool)	| Global network storage achieved |
|------|------|
| 100k FIL | 5 PiB| 
| 200k FIL	| 10 PiB| 
| 300k FIL	| 25 PiB| 
| 500k FIL	| 50 PiB| 
| 1MM FIL *	| 100 PiB| 
* Only unlocked if each region achieves at least 1PiB of storage

|	Total FIL rewards (regional pool)|		Regional network storage achieved|	
|------|------|
|	25k FIL |	100 TiB|	
|	50k FIL	|	500 TiB|	
|	100k FIL	|	1 PiB|	
|	250k FIL	|	5 PiB|	
|	500k FIL	|	10 PiB|	

Any rewards earned will be encoded into the genesis block and will vest linearly over six months from mainnet launch.

## Frequently asked questions

#### What branch and network will be used for the Space Race?

The [calibration devnet](https://docs.filecoin.io/how-to/networks/#calibration-devnet) is designed for the initial calibration phase in order to prepare equipment and client setups. Once the competition has started, the [testnet](https://docs.filecoin.io/how-to/networks/#testnet) will be the used network.

#### How is the "location" of a mining operation determined?

The “location” of a storage mining operation is the location of the storage and sealing hardware for the operation. Since the hardware is what matters, it is not acceptable to relay from hardware in Continent A to a Lotus node in Continent B and try to claim Continent B rewards.

Thus, to verify location claims, the Filecoin team will be implementing a custom-built software suite running during the competition, and will be doing hands-on verification during and after the competition. **Please do not try to “spoof” your location – we have many layers of detection in place and a team in place to ensure fairness**; if you are thinking about using a proxy or a VPN to hide your location, think again.

Any miner found misrepresenting their location will result in a *total forfeiture of all rewards*, across all associated miners.

#### Is a static IP required?

A public IP is required so that your miner can make storage and retrieval deals and compete in Space Race. This can achieved through a static IP, or a relay or VPN. See the [Improving connectivity](https://docs.filecoin.io/mine/connectivity/) page for more details.

#### How exactly is deal success measured?
Once your miner is online, the dealbot will automatically begin making storage and retrieval deals. Only deals made through the dealbot count towards deal success rate for this competition. To qualify for rewards, your miner must show >90% success in both storage and retreival deals during the competition period.

To see a detailed log of all deal attempts for your miner, visit the [Calibration Dashboard](https://calibration.spacerace.filecoin.io/) and search for your miner ID.

#### Can I run multiple miners?
Yes, you can combine your competition results from multiple miners. Once the competition begins, register all your miners with the same email address. Then, email mining@filecoin.io during the first week of the competition and ask for those miners to be combined on the leaderboard. The miners will be displayed together under a common name (your company name, for example) and treated as one miner for purposes of calculating rankings and rewards.

#### How are rewards distributed?
If you’re eligible for rewards, someone from CoinList will reach out to your provided email address shortly after the competition to conduct AML/KYC and coordinate delivery of the tokens. You will have the option to receive rewards directly to your wallet.

#### How do I prioritize deals from competition bots?
By default, Lotus nodes accept all inbound deals that match their criteria. 
However, during the Space Race competition, miners may want to limit the clients to avoid spam deals from malicious agents.
To do this, modify the `~/.lotusminer/config.toml` file to include a `Filter` param.
This param should be a shell command that will be run when processing a deal proposal. 

```
~/.lotusminer/config.toml

[Dealmaking]
Filter = <shell command>
```

The deal info is piped into `stdin` as JSON. Deals are accepted if the `Filter`'s
 exit code is 0. For any other exit code, deals will be rejected. Examples:

```
## Reject all deals
Filter = "false"

## Accept all deals
Filter = "true"

### Only accept deals from client t3abcd
Filter = "jq -e '.Proposal.Client == \"t3abcd\"'"
```
#### How do I change gas fees?

To change your default gas fees, edit the `~/.lotusminer/config.toml` config file. 

```
[Fees]
  MaxPreCommitGasFee = "1 FIL"
  MaxCommitGasFee = "1 FIL"
  MaxWindowPoStGasFee = "50 FIL"
```

## Additional notes

* If a bug is identified during the competition that threatens the validity of the power table, the Filecoin team may end the competition early. Rewards will still be awarded for the period prior to the discovery of the bug. If such a bug is responsibly disclosed to the Filecoin team, the team reporting it will be eligible for rewards of up to 250k FIL, depending on the severity and practicality of the bug, as determined by the Filecoin team.

* While we don’t expect it, in the unlikely event that Protocol Labs or the Filecoin Foundation determine in their sole discretion that legal or regulatory issues prevent the delivery of any portion of rewards, the rewards may be restructured, postponed, or cancelled.
