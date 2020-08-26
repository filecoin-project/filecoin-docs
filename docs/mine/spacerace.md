---
title: Space Race
description: An overview of the 'Space Race', the Filecoin testnet incentive program.
---

# The Filecoin Space Race

The testnet incentives program (also known as the 'Space Race') is a collaborative competition intended to stress-test the network, encourage participation worldwide, and help miners get ready to run the world's biggest decentralized storage network.

## Structure and rules

The competition's basic structure is simple: for three weeks, miners will compete to onboard as much storage capacity as possible to the network. The top 100 miners globally and the top 50 miners from each continent, will earn Filecoin rewards based on how much storage they and the network achieve during the test period.

A miner's location, for regional leaderboards, is the physical location of the mining operation. Operations split between multiple regions must run separate miners. Miners will be required to submit documentation verifying their location claims. Claiming to be from a different location will disqualify you from rewards and leaderboard inclusion.

## How do I participate?

You must be able to run at least one miner to participate.

**The calibration period is currently open.** To join, run at least one miner on the [calibration devnet](https://docs.filecoin.io/how-to/networks/#calibration-devnet). A preview of calibration standings is available on the [Preview Dashboard](https://calibration.spacerace.filecoin.io/).

The competition period is not yet open. The competition will include a full dashboard where miners can view global and regional reward tiers, individual miner storage power, deal success rate, and sector life-cycle command completion, all in real-time. Miners will also be able to submit information for location verification and display their individual or company names alongside their miner ID.

For help or additional questions, join the [#space-race](https://filecoinproject.slack.com/archives/C0179RNEMU4) channel on the Filecoin Slack.

## What are the possible rewards?

Prizes will be awarded for both storage rewards and block rewards.

### Storage Rewards

The top 50 miners in each region and globally are eligible to split a reward pool of up to 4mm FIL, depending on regional network storage achieved.

| Total FIL rewards (global pool) | Global network storage achieved |
| ------------------------------- | ------------------------------- |
| 100k FIL                        | 5 PiB                           |
| 200k FIL                        | 10 PiB                          |
| 300k FIL                        | 25 PiB                          |
| 500k FIL                        | 50 PiB                          |
| 1MM FIL \*                      | 100 PiB                         |

- Only unlocked if each region achieves at least 1PiB of storage

| Total FIL rewards (regional pool) | Regional network storage achieved |
| --------------------------------- | --------------------------------- |
| 25k FIL                           | 100 TiB                           |
| 50k FIL                           | 500 TiB                           |
| 100k FIL                          | 1 PiB                             |
| 250k FIL                          | 5 PiB                             |
| 500k FIL                          | 10 PiB                            |

### Block Rewards

The top 20 FIL-denominated block reward producers who are also eligible to receive Space Race rewards will share a reward pool of 100k FIL on a pro rata basis. For example, if you receive 100,000 FIL in block rewards, and the top 20 producers cumulatively receive 2,000,000 FIL, you would be eligible to receive an additional 5,000 FIL. Like other competition rewards, any FIL received will vest linearly over six months. During the Space Race, miners can check their total block rewards mined on the [Block Reward Dashboard](https://reward.testnet.filecoin.io/d/P_Q13JnMz/top-miners-by-block-reward?orgId=1&refresh=25s&from=now-30m&to=now&kiosk).

Any rewards earned will be encoded into the genesis block and will vest linearly over six months from mainnet launch.

## Frequently asked questions

#### What branch and network will be used for the Space Race?

The Space Race competition will run on the [Testnet](https://docs.filecoin.io/how-to/networks/#testnet) network.

#### Where can I get test FIL?

You can get FIL from the [faucet](https://spacerace.faucet.glif.io).

#### Where can I track Space Race progress and Testnet network stats?

The [Competition Dashboard](https://spacerace.filecoin.io/) is where you can track Space Race storage progress and register your miner(s).

Block Rewards standings are listed on the [Block Rewards Dashboard](https://reward.testnet.filecoin.io/), and network stats on the [Testnet Network Stats](https://stats.testnet.filecoin.io/) page.

#### How is the "location" of a mining operation determined?

The "location" of a storage mining operation is the location of the storage and sealing hardware for the operation. Since the hardware is what matters, it is not acceptable to relay from hardware in Continent A to a Lotus node in Continent B and try to claim Continent B rewards.

Thus, to verify location claims, the Filecoin team will be implementing a custom-built software suite running during the competition and will be doing hands-on verification during and after the competition. **Please do not try to "spoof" your location – we have many layers of detection in place and a team in place to ensure fairness**; if you are thinking about using a proxy or a VPN to hide your location, think again.

Any miner found misrepresenting their location will result in a _total forfeiture of all rewards_, across all associated miners.

#### Is a static IP required?

A public IP is required so that your miner can make storage and retrieval deals and compete in Space Race. This can achieved through a static IP, or a relay or VPN. The majority of deal errors found during calibration period werre caused by IP address and other connectivity issues, so we highly recommend following the [Improving connectivity](https://docs.filecoin.io/mine/connectivity/) steps.

#### How exactly is deal success measured?

Once your miner is online, the dealbot will automatically begin making storage and retrieval deals. Only deals made through the dealbot count towards deal success rate for this competition. To qualify for rewards, your miner must show >=80% success in both storage and retrieval deals during the competition period.

To see a detailed log of all deal attempts for your miner, visit the [Space Race Dashboard](https://spacerace.filecoin.io) and search for your miner ID.

#### How are regional and global storage achieved measured?

Each region (regional or global) unlocks additional FIL rewards by collectively adding more storage to the network. Miners with any deal success rate count toward the regional and global storage mounts. However, winners in each region will need to meet deal success rate minimums (described above) to be eligible for rewards.

#### Can I run multiple miners?

Yes, you can combine your competition results from multiple miners. Once the competition begins, register all your miners with the same email address. Then, email mining@filecoin.io during the first week of the competition and ask for those miners to be combined on the leaderboard. The miners will be displayed together under a common name (your company name, for example) and treated as one miner for purposes of calculating rankings and rewards.

#### How are rewards distributed?

If you're eligible for rewards, someone from CoinList will reach out to your provided email address shortly after the competition to conduct AML/KYC and coordinate delivery of the tokens. You will have the option to receive rewards directly to your wallet.

#### How do I prioritize deals from competition bots?

By default, Lotus nodes accept all inbound deals that match their criteria. However, during the Space Race competition, miners may want to limit the clients to avoid spam deals from malicious agents.

To filter deals based on certain parameters, modify the `~/.lotusminer/config.toml` file to include a `Filter` param. This param should be a shell command that will be run when processing a deal proposal. Deals are accepted if the `Filter`'s exit code is 0. For any other exit code, deals will be rejected.

```
~/.lotusminer/config.toml

[Dealmaking]
Filter = <shell command>

## Reject all deals
Filter = "false"

## Accept all deals
Filter = "true"

## Only accept deals from the 4 competition dealbots
Filter = "jq -e '.Proposal.Client == \"t1nslxql4pck5pq7hddlzym3orxlx35wkepzjkm3i\" or .Proposal.Client == \"t1stghxhdp2w53dym2nz2jtbpk6ccd4l2lxgmezlq\" or .Proposal.Client == \"t1mcr5xkgv4jdl3rnz77outn6xbmygb55vdejgbfi\" or .Proposal.Client == \"t1qiqdbbmrdalbntnuapriirduvxu5ltsc5mhy7si\" '"
```

You can also write advanced deal filters based on any field in deal info (for example, you may wish to accept only `VerifiedClient` deals). Deal info is piped into `stdin` as JSON.

#### Will the bot retry a deal if it fails mid-way?

The answer is no — the bot will do a new deal later instead. It is difficult to tell the exact retry times, because the timings scale up and down with the power of individual miners. Moreover we reserve the right to change some of the retry parameters as the race progresses. All in all, remember that the race is designed to maximally stress-test the network layer, and reveal various failure modes, so that future applications built on top will be able to make correct risk tradeoffs. The 80% success rate has been selected by careful evaluation of the current state of lotus.

In short, it is expected that you may not be able to hit 100% throughout the entire competition. Focus on keeping your head above 90%, and keeping your PoSTs flowing!

#### How do I change gas fees?

If you would like to change the default gas fees to accelerate your messages, edit the `~/.lotusminer/config.toml` config file.

```
[Fees]
  MaxPreCommitGasFee = "0.05 FIL"
  MaxCommitGasFee = "0.05 FIL"
  MaxWindowPoStGasFee = "50 FIL"
```

#### How do I demonstrate a sector upgrade?

To be eligible for Space Race rewards, you will need to demonstrate at least _one_ sector upgrade per miner.

1. Run `lotus-miner sectors list`.
2. From the results, find a CommittedCapacity sector. It will look like this: `1: Proving sSet: YES active: YES tktH: XXXX seedH: YYYY deals: [0]`. In this case, `1` represents the sector number.
3. Use that sector number to run `./lotus-miner sectors mark-for-upgrade $SECTOR_NUMBER`.
4. There is **no immediate feedback** that `mark-for-upgrade` has succeeded or failed. However, within 24 hours, the `active: YES` should change to `active: NO`. This result will also be visible on the calibration/competition Dashboard.

**Notice:** At the moment, there is a small bug that causes to the `lotus-miner sectors mark-for-upgrade $SECTOR_NUMBER` command to **possibly** be ignored when attempting to seal said sector. This will be fixed after the race begins, but in the meantime, have no fear: sealing can be attempted multiple times without any adverse effects.

To check if your sector upgrade was successful:

- After the next sector featuring deals from the dealbot completes sealing, find out which sector was replaced with a CC sector:

```
for s in $( seq $( lotus-miner sectors list | wc -l ) ) ; do lotus-miner sectors status --log $s | grep -Eo 'ReplaceCapacity":true' && echo $s; done`
```

- The replaced CC sector should list the chain-height at which it will become inactive:

```
lotus-miner sectors status --on-chain-info $SECTOR_NUMBER | grep OnTime
```

- If the deal is marked as successful on the dashboard but the above commands do not return the expected result, simply repeat steps #1-3 above.

## Additional notes

- If a bug is identified during the competition that threatens the validity of the power table, the Filecoin team may end the competition early. Rewards will still be awarded for the period prior to the discovery of the bug. If such a bug is responsibly disclosed to the Filecoin team, the team reporting it will be eligible for rewards of up to 250k FIL, depending on the severity and practicality of the bug, as determined by the Filecoin team.

- While we don't expect it, in the unlikely event that Protocol Labs or the Filecoin Foundation determine in their sole discretion that legal or regulatory issues prevent the delivery of any portion of rewards, the rewards may be restructured, postponed, or canceled.
