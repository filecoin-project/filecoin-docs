---
title: "Consensus"
description: ""
lead: ""
draft: true
images: []
type: docs
menu:
  basics:
    parent: "basics-the-blockchain"
    identifier: "consensus-688d0e228f7debf695c906ad442cb462"
weight: 100
toc: true
draft: false
---

## Overview

In the Filecoin blockchain, network _{{< tooltip "consensus" >}}_ is achieved through the Expected Consenus (EC) algorithm. At a high-level, EC achieves consensus by running an election at every {{< tooltip "epoch" >}} where a set number of participants may become eligible to submit a block to the chain. This page discusses EC in further detail.

### Benefits of Expected Consensus

Expected Consensus (EC) was designed such that the process to determine which network participant(s) may submit a block is:

   - Secret
   - Fair
   - Verifiable


Secrecy is achieved in the following ways:

1. Election winners remain anonymous until they submit a  

Fairness is achieved in the following ways:

Verifiability is acheived in the following ways:

1. Participants selected to submit a block will be chosen based on a probability proportional to their {{< tooltip "power" >}}.

1. More than one 


<!-- 
TODO
chain weighting / selection
https://spec.filecoin.io/algorithms/expected_consensus/
edit info
!-->

It is possible for forks to emerge naturally in Expected Consensus. EC relies on weighted chains in order to quickly converge on ‘one true chain’, with every block adding to the chain’s weight. This means the heaviest chain should reflect the most amount of work performed, or in Filecoin’s case, the biggest amount of committed storage.

In short, the weight at each block is equal to its ParentWeight plus that block’s delta weight. Details of Filecoin’s chain weighting function are included here.



<!-- 
TODO 
EC overall
https://spec.filecoin.io/algorithms/expected_consensus/
edit info
!-->

Expected Consensus (EC) is a probabilistic Byzantine fault-tolerant consensus protocol. At a high level, it operates by running a leader election every epoch in which, on expectation, a set number of participants may be eligible to submit a block. EC guarantees that these winners will be anonymous until they reveal themselves by submitting a proof that they have been elected, the ElectionProof. Each winning miner can submit one such proof per round and will be rewarded proportionally to its power. From this point on, each wining miner also creates a proof of storage (aka Winning PoSt). Each proof can be derived from a properly formatted beacon entry, as described below.

All valid blocks submitted in a given round form a Tipset. Every block in a Tipset adds weight to its chain. The ‘best’ chain is the one with the highest weight, which is to say that the fork choice rule is to choose the heaviest known chain. For more details on how to select the heaviest chain, see Chain Selection. While on expectation at least one block will be generated at every round, in cases where no one finds a block in a given round, a miner can simply run leader election again for the next epoch with the appropriate random seed, thereby ensuring liveness in the protocol.

The randomness used in the proofs is generated from DRAND, an unbiasable randomness generator, through a beacon. When the miner wants to publish a new block, they invoke the getRandomness function providing the chain height (i.e., epoch) as input. The randomness value is returned through the DRAND beacon and included in the block. For the details of DRAND and its implementation, please consult the project’s documentation and specification.

<!-- 
TODO 
Storage power consensus
https://spec.filecoin.io/systems/filecoin_blockchain/storage_power_consensus/
edit info
!-->

The Storage Power Consensus (SPC) subsystem is the main interface which enables Filecoin nodes to agree on the state of the system. Storage Power Consensus accounts for individual storage miners' effective power over consensus in given chains in its Power Table. It also runs Expected Consensus (the underlying consensus algorithm in use by Filecoin), enabling storage miners to run leader election and generate new blocks updating the state of the Filecoin system.

Succinctly, the SPC subsystem offers the following services:

Access to the Power Table for every subchain, accounting for individual storage miner power and total power on-chain.

Access to Expected Consensus for individual storage miners, enabling:

Access to verifiable randomness Tickets as provided by drand for the rest of the protocol.
Running Leader Election to produce new blocks.
Running Chain Selection across subchains using EC’s weighting function.
Identification of the most recently finalized tipset, for use by all protocol participants.
