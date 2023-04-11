---
title: "Ways to contribute"
description: "How to contribute to Filecoin."
lead: "So you want to contribute to Filecoin and the ecosystem? Here is a quick listing of things we need help with and how you can get started. Even if what you want to do is not listed here, we probably accept contributions for it! If you're unsure, please open a issue."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-project-and-community"
    identifier: "ways-to-contribute-41e93d9c8658007bc8ff0980e5ebee0f"
weight: 100
toc: true
aliases:
    - "/about-filecoin/ways-to-contribute"
    - "/community/contribute/ways-to-contribute/"
    - "/about/contribute/ways-to-contribute/"
    - "/about/contribute/contribution-tutorial/"
    - "/about/contribute/grammar-and-formatting/"
    - "/about/contribute/writing-guide/"
---

## Ways to contribute

### Code

Filecoin and its sister-projects are big, with lots of code written in multiple languages. We always need help writing and maintaining code, but it can be daunting to just jump in. We use the label _Help Wanted_ on features or bugfixes that people can help out with. They are an excellent place for you to start contributing code.

The biggest and most active repositories we have today are:

- [filecoin-project/venus](https://github.com/filecoin-project/venus)
- [filecoin-project/lotus](https://github.com/filecoin-project/lotus)
- [filecoin-project/rust-fil-proofs](https://github.com/filecoin-project/rust-fil-proofs)

If you want to start contributing to the core of Filecoin, those repositories are a great place start. But the _Help Wanted_ label exists in several related projects:

- [IPFS](https://github.com/ipfs)
- [libp2p](https://github.com/libp2p)
- [IPLD](https://github.com/libp2p)
- [Multiformats](https://github.com/multiformats)

### Documentation

Filecoin is a huge project and undertaking, and with lots of code comes the need for lots of good documentation! However, we need a lot more help to write the awesome docs the project needs. If writing technical documentation is your area, we’d absolutely love your help!

Before contributing to the Filecoin docs, please read these quick guides; they'll save you time and help keep the docs accurate and consistent!

1. [Style and formatting guide]({{< relref "#grammar-and-formatting" >}})
2. [Writing guide]({{< relref "#writing-guide" >}})

If you have never contributed to an open-source project before, or just need a refresher, take a look at the [contribution tutorial]({{< relref "#contribution-tutorial" >}}).

### Community

If interacting with people is your favorite thing to do in this world, join the [Filecoin chat and discussion forums]({{< relref "chat-and-discussion-forums" >}}) to say hello, meet others who share your goals, and connect with other members of the community.

### Build Applications

Filecoin is designed for you to integrate into your own applications and services.

Get started by looking at the list of projects currently built on Filecoin. Build anything you think is missing! If you're unsure about something, you can join the chat and discussion forums to get help or feedback on your specific problem/idea. You can also apply for a Filecoin Developer Grant to support the development of your project.

- [Filecoin Dev Grants](https://filecoin.io/grants/)

### Protocol Design

Filecoin is ultimately about building better protocols, and we always welcome ideas and feedback on how to improve those protocols.

- [filecoin-project/specs](https://github.com/filecoin-project/specs)
- [Filecoin Research Website](https://research.filecoin.io/)

### Research

Finally, we see Protocol Labs as a research lab, where YOUR ideas can become technologies that have a real impact on the world. If you're interested in contributing to our research, please reach out to [research@protocol.ai](mailto:research@protocol.ai) for more information. Include what your interests are so we can make sure you get to work on something fun and valuable.

## Contribution tutorial

While the [grammar, formatting, and style]({{< relref "#grammar-and-formatting" >}}) and the [writing guide]({{< relref "#writing-guide" >}}) can both help you write excellent content for the Filecoin Docs project, they don't delve into how you can actually submit you content changes. This guide will walk you through finding an issue, fixing it, and then submitting your fix to the `filecoin-project/filecoin-docs` project.

There are plenty of small-sized issues around Filecoin documentation that make for easy, helpful contributions to the Filecoin project. Here, we'll walk through:

1. Finding an issue.
2. Discussing the issue.
3. Creating a fix.
4. Submitting a _pull request_.
5. Waiting for a review.
6. Merging your fix.

This may look like a lot of steps for a small issue fix, but they're all necessary to make sure we keep the docs in this project up to standard. Plus, you're not on your own — half these steps can be completed by Filecoin docs project maintainers!

### Finding an issue

The Filecoin project is hosted in GitHub. There's a bunch of reasons for this, one of them being that GitHub comes with an issue tracker, which enables the core Filecoin team to field problems from the community. All community issues can read the docs, find issues, and raise issues in the docs repository (called a _repo_ for short).

All issues involving the Filecoin docs themselves can be found here in the `filecoin-project/filecoin-docs` repo under the [**Issues** tab](https://github.com/filecoin-project/filecoin-docs/issues/). Here you can see all the issues that are currently open. We try to tag each issue with relevant descriptive tags. Tags like _difficulty_ and _size_ can give a sense of the amount of effort a task will take to complete.

Let's jump into finding an issue.

1. Go to the Filecoin Docs repository at [github.com/filecoin-project/filecoin-docs](https://github.com/filecoin-project/filecoin-docs).
2. Select the **Issues** tab.
3. Click the **Label** dropdown and select the **help wanted** tag.
4. Select an issue that interests you.

Make a note of the issue number and keep it handy for later.

### Discussing the issue

As you can probably tell from the available tags, there are lots of different types of issues. Some are tiny one-sentence changes, and others are sizable projects that require a rewrite of several pages. For small issues, there may be very little or no discussion. There's no need to waste everybody's time talking about changing a broken link. But more significant issues will likely need input from different members of the project.

When adding to a discussion, remember that it may take days or weeks to conclude an issue. With this in mind, try to include all the relevant information anyone might need within each message.

Let's add to the discussion of the issue you've chosen:

1. Read through all the previous posts to get up to speed about the issue.
2. Add any comments you feel are necessary.
3. If you still want to tackle this issue, post a message saying that you'd like to take ownership of it.

Once you've claimed ownership of an issue, a project maintainer will assign you to it. If this is a large issue, someone from the Filecoin team will check in with you from time to time and make sure you've got everything you need to progress with the issue.

### Creating a fix

If you've got this far, then you should have an issue in hand and a basic idea of how to fix it. Next up is implementing your fix! The process goes something like this:

1. Create a _fork_.
2. Make changes locally on your machine.
3. Push your changes.

A _fork_ of a project is your own personal copy of that project. You can make as many changes to this copy whenever you want, because you own it. The idea is that you can modify this personal copy and send your changes to the project team, who can then review all the work you've done.

Here is the process for creating a fork of an existing piece of Filecoin documentation:

1. Go to the `filecoin-project/filecoin-docs` repository in [GitHub](https://github.com/filecoin-project/filecoin-docs).
2. Select **Fork** to create a copy of the project.
3. Clone your copy of the project down to your local machine:

   ```shell
   git clone https://github.com/YOUR_USERNAME/filecoin-docs.git
   ```

4. Make your changes locally.
5. Once all your changes are complete, make sure to push everything back to GitHub:

   ```shell
   git add .
   git commit -m "Fixed a broken URL, issue #123."
   git push
   ```

When adding a commit comment that actively fixes an issue within the project, try to summarize the fix in a few words, and quote the issue number. Following this convention makes it easier for other people to quickly see what you've done.

### Create a pull request

Once you're done making commits, and are ready to get a core team member's review of your work, it's time to create a pull request.

1. Go to the `filecoin-project/filecoin-docs` repository on [GitHub](https://github.com/filecoin-project/filecoin-docs).
2. Select the **Pull requests** tab.
3. Click **New pull request**.
4. Click **compare across forks** and select your repository from the **head repository** dropdown.
5. Leave a comment to expand upon your changes.
6. Click **Create pull request**.

GitHub will check if your changes create any merge conflicts with the branch you are trying to merge into.

### Waiting for a review

All pull requests from the community must be reviewed by at least one project member before they are merged in. Depending on the size of the pull request, this could take anywhere from a few minutes to a few days to review everything. Depending on the complexity of the pull request, there may be further discussion regarding your changes. Keep returning to GitHub and checking your notifications page to make sure you don't miss anything.

### Merge your fix

Once your pull request has been approved, a project member with the correct rights will merge it. You'll be notified as soon as the merge is complete.

### Finishing up

So there you have it! You've successfully completed your first contribution to the Filecoin documentation. We're always on the lookout for great writers and educators to help us improve the Filecoin docs and make the internet better for everyone, so keep up the good work!

## Writing guide

This guide explains things to keep in mind when writing for Filecoin's documentation. While the [grammar, formatting, and style guide]({{< relref "#grammar-and-formatting" >}}) lets you know the rules you should follow, this guide will help you to properly structure your writing and choose the correct tone for your audience.

### Terms to avoid

It's important that the docs use clear, accurate language when describing Filecoin collateral markets, including in the context of FVM, especially due to the delicate pairing of cryptocurrency and the legal system. See the table below, and consider using the alternatives whenever possible.

| Don't use | Alternatives |    
| --- | --- | 
| Loan, borrow (as a verb) | Lease | 
| Loan (as a noun) | Collateral, Lease | 
| Interest rate, Interest | Leasing fees |
| Lender, Investor, Capital contributor | Token holder |
| Miner | Storage provider |
| Lending FIL | Leasing FIL |
| Staking FIL | Pledging FIL |
| Capital or Capital markets | Collateral or FIL collateral markets

- **Avoid**: _The FVM was created to enable developers to build new use cases on top of the Filecoin network, such as data access control, data DAOs, perpetual storage, and **loans**._
- **Use**: _The FVM was created to enable developers to build new use cases on top of the Filecoin network, such as data access control, data DAOs, perpetual storage, and **FIL collateral markets**._

- **Avoid**: _Tracks the amount each **lender** deposits and their gain/loss._
- **Use**: _Tracks the amount each **token holder** deposits and their **fees**._

### Walkthroughs

The purpose of a walkthrough is to tell the user _how_ to do something. They do not need to convince the reader of something or explain a concept. Walkthroughs are a list of steps the reader must follow to achieve a process or function.

The vast majority of documentation within the Filecoin Docs project falls under the _Walkthrough_ category. Walkthroughs are generally quite short, have a neutral tone, and teach the reader how to achieve a particular process or function. They present the reader with concrete steps on where to go, what to type, and things they should click on. There is little to no _conceptual_ information within walkthroughs.

#### Goals

Use the following goals when writing walkthroughs:

| Goal          | Keyword     | Explanation                                                       |
| ------------- | ----------- | ----------------------------------------------------------------- |
| **Audience**  | _General_   | Easy for anyone to read with minimal effort.                      |
| **Formality** | _Neutral_   | Slang is restricted, but standard casual expressions are allowed. |
| **Domain**    | _Technical_ | Acronyms and tech-specific language is used and expected.         |
| **Tone**      | _Neutral_   | Writing contains little to no emotion.                            |
| **Intent**    | _Instruct_  | Tell the reader _how_ to do something.                            |

##### Function or process

The end goal of a walkthrough is for the reader to achieve a very particular function. _Installing the Filecoin Desktop application_ is an example. Following this walkthrough isn't going to teach the reader much about working with the decentralized web or what Filecoin is. Still, by the end, they'll have the Filecoin Desktop application installed on their computer.

##### Short length

Since walkthroughs cover one particular function or process, they tend to be quite short. The estimated reading time of a walkthrough is somewhere between 2 and 10 minutes. Most of the time, the most critical content in a walkthrough is presented in a numbered list. Images and gifs can help the reader understand what they should be doing.

If a walkthrough is converted into a video, that video should be no longer than 5 minutes.

#### Walkthrough structure

Walkthroughs are split into three major sections:

1. What we're about to do.
2. The steps we need to do.
3. Summary of what we just did, and potential next steps.

### Conceptual articles

Articles are written with the intent to inform and explain something. These articles don't contain any steps or actions that the reader has to perform _right now_.

These articles are vastly different in tone when compared to walkthroughs. Some topics and concepts can be challenging to understand, so creative writing and interesting diagrams are highly sought-after for these articles. Whatever writers can do to make a subject more understandable, the better.

#### Article goals

Use the following goals when writing conceptual articles:

| Goal          | Keyword                  | Explanation                                                                      |
| ------------- | ------------------------ | -------------------------------------------------------------------------------- |
| **Audience**  | _Knowledgeable_          | Requires a certain amount of focus to understand.                                |
| **Formality** | _Neutral_                | Slang is restricted, but standard casual expressions are allowed.                |
| **Domain**    | _Any_                    | Usually _technical_, but depends on the article.                                 |
| **Tone**      | _Confident and friendly_ | The reader must feel confident that the writer knows what they're talking about. |
| **Intent**    | _Describe_               | Tell the reader _why_ something does the thing that it does, or why it exists.   |

#### Article structure

Articles are separated into five major sections:

1. Introduction to the thing we're about to explain.
2. What the thing is.
3. Why it's essential.
4. What other topics it relates to.
5. Summary review of what we just read.

### Tutorials

When writing a tutorial, you're teaching a reader how to achieve a complex end-goal. Tutorials are a mix of walkthroughs and conceptual articles. Most tutorials will span several pages, and contain multiple walkthroughs within them.

Take the hypothetical tutorial _Get up and running with Filecoin_, for example. This tutorial will likely have the following pages:

1. A brief introduction to what Filecoin is.
2. Choose and install a command line client.
3. Understanding storage deals.
4. Import and store a file.

Pages `1` and `3` are conceptual articles, describing particular design patterns and ideas to the reader. All the other pages are walkthroughs instructing the user how to perform one specific action.

When designing a tutorial, keep in mind the walkthroughs and articles that already exist, and note down any additional content items that would need to be completed before creating the tutorial.
