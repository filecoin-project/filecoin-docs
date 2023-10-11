---
description: >-
    This page discusses the Filecoin Improvement Proposal (FIP) process, and how the Filecoin community can get involved.
---

# The FIPs process
# Filecoin Improvement Proposals (FIPs)

Filecoin Improvement Proposals (FIPs) can be authored by anyone in the community, and are the main mechanism for governing the Filecoin Network. A FIP provides the technical specifications of a feature, documents the rationale for the proposal, and documents both consensus and dissenting opinions. In this way, FIPs provide a historical record of the decisions made by the community for Filecoin’s features, technical input, and design decisions. FIPs are also a way to track the progress of implementation and who has authored or suggested improvements.

A FIP is an important piece of the governance process within Filecoin for several key reasons:

-It gives community members a chance to guide the network by making recommendations which may then be implemented

-It creates an important forum for community engagement where people can come together to discuss proposed ideas and work together in collaboration to explore solutions

-It creates an open record of all ideas proposed, the conversation around those ideas, and why they were or were not implemented

-It provides a clear process for making changes to the network and clearly defines the roles that people within the community can play in terms of shaping the proposals, making edits or recommendations, and moving the FIP through the stages from creation to implementation

FIPs should be contain a single idea or proposal, and be focused on how this proposal will improve the network. The more concise and focused the FIP, the more likely it is to succeed and be implemented.

There are five categories of FIPs, listed in order of increasing complexity and risk to the network:

**Network Standards (FRCs)**—These FIPs do not require consensus, and are proposals to document network best practices and key recommendations

**Technical FIPs**—These FIPs require consensus and are for changes to the core protocol stack

**Cryptoeconomic FIPs**—These FIPs are to propose changes that will affect the economic policy of the network, or for changes that are likely to have a substantial impact on existing token dynamics and network incentives

**Community FIPs**—These FIPs introduce structural or programmatic changes to the Filecoin Community, including changes to its governance process

**Security FIPs**—These FIPs are for emergency technical changes to the core protocol in event of attack, capture, outage, or other immediate threats to the network 

## FIP Roles, Stages, and Paths to Acceptance

Every FIP requires the participation of the community. As a FIP moves through the path to acceptance, it will go through several key statuses that require the community to interact in different ways. These statuses tell us where the FIP is on the path to acceptance and create an important record of community involvement and the historical considerations for the network. As a community member, it is critical to participate in the FIP process—this is the way to have your voice heard, to shape the network, and to usher in important changes that represent the needs of Filecoin at any given point in time.

### FIP Roles

There are five key roles involved in the FIP process: 

- The FIP author or champion
    
    This is the person who writes the FIP and proposes it to the community, to guide the discussions through the appropriate forums, and to build community consensus around the idea 
    
- The FIP editors
    
    This is the person who reads the FIP draft, and confirms that it makes technical sense, checks the language, and makes any needed recommendations for changes
    
- The Filecoin Core Developers
    
    These are the people who help write the code for the Filecoin network, and will ultimately code the changes for accepted FIPs
    
- The Filecoin Community
    
    These are the members of the community who will offer feedback, and who the FIP champion will try to build consensus with
    
- The Community Guild
    
    The Community Guild is a governing institution that is made up of representatives from each of the following community groups:
    
    - Storage Providers
    - Clients
    - Tokenholders
    - Developers
    - Filecoin Foundation
    - Core Devs
    - Protocol Labs
    
    The Guild plays a critical role in the FIP approval process, and they are especially critical for high-risk and complex FIPs. 
    
    The goal of the Guild is to provide clear, transparent, and expert guidance through the FIP approval process. As FIPs grow in risk and complexity, it is critical that the level of certainty in the FIP itself grows in equal measure. This is where the Guild becomes a vital piece of the governing body of the community—because the Guild is comprised of representatives from the above groups, they are able to provide expertise, technical understanding, and a important checks and balances in the system. The Guild decentralizes the “expert function” away from just Core Devs. 
    
    The Guild has the ability to veto community votes on especially complex or risky FIPs, and requires hard consensus in order to move forward. 
    

Before you begin writing a FIP, check in with the community. You want to ensure that you idea is new, has adequate support, can be applied to the whole community, and has not been previously researched and rejected. The best ways to check in with the community are the I[ssues section of the Github Repository](https://github.com/filecoin-project/FIPs/issues), the [Filecoin Discourse Forum](https://discuss.filecoin.io/), and the [Filecoin community chat](https://docs.filecoin.io/basics/project-and-community/chat-and-discussion-forums).  

### FIP Statuses

All proposed FIPs go through the same process, and have similar stages that the FIP champion is responsible for seeing through. FIPs are created as Pull Requests in GitHub, and the FIP editors will process the Pull Requests through the following statuses:

- Work in Progress (WIP)
    
    After the champion has asked the Filecoin community whether or not an idea has any chance of support, they can write a draft FIP as a pull request. 
    
    If the WIP looks good, a FIP editor will assign the FIP a number and merge your pull request. 
    
    If the WIP is unfocused, too broad, a duplication of effort, technically unsound, does not have give clear motivation, does not address issues with backward compatibility, or is not in line with the Filecoin improvement principals, the WIP will be denied at this stage. The FIP author can that edit the WIP and resubmit, depending on the reason the WIP was denied.
    
    For Community, Cryptoeconomic, and Technical Core FIPs, this is the stage where a **Community Temperature Check** must be done. The Temperature Check is a simple tool that is used to gauge early-stage community support for FIP drafts. These checks are non-binding, anonymous, and are meant only to help indicate community prioritization of FIPs at the WIP stage. 
    
- Draft
    
    After the WIP is merged, you can keep submitting follow-up pull requests with additional changes until you believe that the FIP is ready to move onto the next stage. A FIP remains in Draft status until it is implemented, at which point it is considered for promotion to the next status (this is not the same for Core FIPs). 
    
    Once the FIP champion and FIP editors believe the FIP is ready, the FIP editor will assign Last Call status and set a review date (usually 14 days later). 
    
    If the FIP editors believe that changes still need to be made to the draft, Last Call status will be denied. The goal is for FIPs to only enter Last Call status once, so it is important for them to be polished and technically sound at this stage. 
    
- Last Call
    
    During Last Call, the FIP is listed prominently on the Filecoin website. After the Last Call period ends, there are three different directions a FIP can go:
    
    -Reversion to Draft: If a FIP reaches Last Call but the community believes that it needs changes or is not technically sound or viable, the FIP will revert to Draft status. 
    
    -Accepted (Core FIPs only): A successful Last Call without changes will become Accepted.
    
    -Final (Not Core FIPs): A successful Last Call with needed changes will become Final.
    
- Accepted (Core FIPs only)
    
    Accepted FIPs move into the hands of the the Filecoin implementation developers. They decide whether or not encode it into their clients as part of a consensus upgrade, and this process is outside of the FIP process.
    
    For a Standard Track Core FIP to be considered Final, it must be implemented in at least two viable Filecoin clients (currently, Lotus, Venus, and Forest). A Pull Request to update the spec of the text of the spec and describe the protocol changes must be submitted to the [Filecoin Specification repository](https://github.com/filecoin-project/specs) before the FIP can proceed to Final status. When the implementation is complete and has been adopted by the community, the status will be changed to Final. 
    
- Final
    
    A FIP in Final status represents the current state of Filecoin. A Final FIP should only be updated to correct errors.
    
- Other statuses
    
    Deferred: Core FIPs that have been put off for a future consensus upgrade 
    
    Rejected: A FIP that is fundamentally broken or unworkable, or a Core FIP that was rejected by the Core Devs and will not be implemented
    
    Active: This is similar to Final status, but it denotes a FIP that maybe be updated without changing its FIP number
    
    Superseded: A FIP that was previously Final, but is no longer considered state-of-the-art because a newer FIP has taken its place and updated it; the newer FIP will be in Final status, and will reference the Superseded FIP
    

### What needs to be in a FIP?

For a FIP to be successful, it should contain the following parts. It also needs to be written in [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) format so that it will display properly.

- Preamble
    
    Each FIP must begin with a standard metadata header section called RFC 822. This style of header gives us important information about what is in the body of the FIP, and it is critical for building tools to organize, manage, and record documents on the web. The preamble needs to include a FIP number, a short and descriptive title, and author details. 
    
    You can find FIP templates [here[.
    
- Simple Summary
    
    Each FIP should be explained in simple, clear language that is easy to understand. The summary is for a wide audience that includes non-technical and technically included people. If you struggle it explain it simply, consider chatting with the community to make sure you understand the subject deeply enough.
    
- Abstract
    
    The abstract should be 200 words or less, and needs to describe the technical issue being addressed. 
    
- Motivation (Optional)
    
    Having a motivation for a proposed FIP is an important way of gaining community buy-in, and it is especially important for FIPs that propose changes to the Filecoin protocol. This section should clearly address why the existing protocol solutions in place are inadequate to address the problem, and how the FIP solves that problem. FIP submissions without clear and compelling motivations are very likely to be rejected. 
    
- Specification
    
    For any new feature or process, technical specifications are required. These should be detailed enough to allowing competing and interoperable implementations for any of the current Filecoin platforms. 
    
- Rationale
    
    The rationale gives the details of what motivated the design and why particular design decisions were made. The rationale is different than the motivation; where the motivation gives the reason for the FIP proposal, the rationale explains why the proposed FIP is designed the way it is and how that supports the motivation. It should also include alternate designs that were considered, related work (for example, how the feature will be supported in other languages)
    
- Backwards Compatibility
    
    For any FIP that is not backwards compatible (meaning, older version will not work without special adaptions or modifications), a section must be included that explains what the incompatibilities are and and what their severity is. The FIP champion also needs to propose how to deal with these incompatibilities. FIPs that do not have a clear plan for handling backwards compatibility are likely to be rejected.
    
- Test Cases
    
    If a FIP requires consensus, test cases must be included. All other FIPs can choose whether or not to include links to test cases.
    
- Security Considerations
    
    All FIPs need to have a section that discusses the security implications and concerns of the proposed change. Consider including any information that might be important for security discussions, make note of any risks, and detail any security-relevant design decisions made. 
    
    Other things to consider including are:
    
    -any important previous discussions 
    
    -security concerns
    
    -implementation or client-specific guidance or pitfalls
    
    -an outline of threats and risks, and how they are being addressed in the FIP
    
    Any FIP that does not include a security section will be rejected. A FIP cannot make it to Final status without a Security Considerations discussion that is deemed sufficient by the FIP reviewers. 
    
- Implementations
    
    For a FIP to be moved to Final status, the actual code for the proposed changes needs to be written and committed—this is known as implementation. However, this step doesn’t need to be completed for the proposed FIP to be merged as a draft in Github and be considered Accepted. 
    
- Copyright Waiver
    
    All FIPs are required to be in the public domain, and Filecoin is an open source project. 
    

### Pathways to FIP Acceptance

Once your FIP is drafted, it is time to hit the road toward Acceptance. 

FIPs with different levels of complexity have different pathways for reaching consensus so that the community can align the scope of the FIP, the complexity of the change, and the need for due diligence and community participation in the FIP process. This also means that the community can set appropriate thresholds for the acceptance of different types of FIPs. 

The details of how each FIP can reach Acceptance is detailed below:

- Community FIP
    
    **When the FIP is at the WIP stage**, it is time to do a Community Temperature Check. The Temperature Check is a simple tool that is used to gauge early-stage community support for FIP drafts. These checks are non-binding, anonymous, and are meant only to help indicate community prioritization of FIPs at the WIP stage. 
    
    If there is early support from the community for a Community FIP, the FIP can move to Draft status and then Last Call. **When the FIP is in Last Call**, the FIP will move to a Community Vote **and** Community Guild Consensus. 
    
    The Community Vote will happen via a voting tool for hard consensus and will be off-chain with the option to either accept or reject. 
    
    The Community Guild will hold a session to discuss the FIP and vote. The Guild will vote in a private, recorded meeting that will be made available after the fact for transparency. 
    
    If both the Community and the Guild vote to pass the FIP, it will be moved to Accepted status and be moved to the implementation stage. 
    
    If the Community votes to pass the FIP but the Guild does not,
    
    If the Guild votes to pass the FIP but Community does not, 
    
    If the FIP does not pass at this stage, then it will be rejected. 
    
- Network Standards (FRCs)
    
    **When a Network Standards FIP reaches the Last Call stage**, a presentation on the proposal will be made to the Core Devs. The Core Devs will audit the proposal and conduct a review.
    
    These FIPs require soft consensus to pass. If soft consensus is achieved, the FIP passes. If not, it is rejected. 
    
- Cryptoeconomic FIP
    
    Cryptoeconomic FIPs are some of the most complex FIPs in the Filecoin ecosystem because they come with the most risk and can usher in very complicated changes to our systems. 
    
    **When the FIP is at the WIP stage**, it is time to do a Community Temperature Check. The Temperature Check is a simple tool that is used to gauge early-stage community support for FIP drafts. These checks are non-binding, anonymous, and are meant only to help indicate community prioritization of FIPs at the WIP stage. 
    
    If there is early support from the community for a Community FIP, the FIP can move to Draft status and then Last Call. **When the FIP is in Last Call**, the FIP will move to a Community Vote **and** Community Guild Consensus. 
    
    The Community Vote will happen via a voting tool for hard consensus and will be off-chain with the option to either accept or reject. 
    
    The Community Guild will hold a session to discuss the FIP and vote. The Guild will vote in a private, recorded meeting that will be made available after the fact for transparency. 
    
    If both the Community and the Guild vote to pass the FIP, it will be moved to Accepted status and be moved to the implementation stage. 
    
    If the Community and the Guild are at odds on the vote, if the FIP becomes contentious, or if there is not clear consensus with either the Guild or the Community, the following outcome matrix will be used to determine whether or not the FIP is accepted. 
    
    ![Screenshot 2023-10-03 at 8.56.10 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/c89addf5-1c49-42bf-acfc-70e44c06122c/a558bfd0-7762-4cf5-9b96-ef69cedf5091/Screenshot_2023-10-03_at_8.56.10_PM.png)
    
- Technical Core FIP
    
    **When the FIP is at the WIP stage**, it is time to do a Community Temperature Check. The Temperature Check is a simple tool that is used to gauge early-stage community support for FIP drafts. These checks are non-binding, anonymous, and are meant only to help indicate community prioritization of FIPs at the WIP stage. 
    
    If there is early support from the community for a Community FIP, the FIP can move to Draft status and then Last Call. 
    
    **When the technical FIP reaches the Last Call stage**, a presentation on the proposal will be made to the Core Devs. The Core Devs will audit the proposal and conduct a review.
    
    These FIPs require soft consensus to pass. If the FIP does not achieve soft consensus from the community, it will move to a vote. If the FIP receives hard consensus from the community vote, the FIP is accepted and moved to Accepted status. 
    
    If the FIP does not achieve hard consensus to pass, then the FIP is rejected. 
    
- Security FIP
    
    When a Security issue is identified, a Security FIP is opened. **At the Last Call stage**, the Core Devs make a recommendation, perform an audit, and review the FIP. 
    
    After the Core Devs do their review, the FIP goes to the Community Guild. The Guild conducts their own review and audit of the security issue and proposed solutions. 
    
    If the Guild reaches hard consensus to accept, then the FIP is accepted. 
    
    If the Guild does not reach consensus to accept, then the FIP is rejected.
