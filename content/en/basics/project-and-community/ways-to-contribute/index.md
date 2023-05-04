---
title: "Ways to contribute"
description: "How to contribute to Filecoin."
lead: "So you want to contribute to Filecoin and the ecosystem? Here is a quick listing of things to which you can contribute and an overview on how you can get started. The community also welcomes other contributions - even if what you want to do is not yet listed here! If you're unsure, please open a issue."
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

Filecoin is a huge project and undertaking, and with lots of code comes the need for lots of good documentation! However, we need a lot more help to write the awesome docs the project needs. If writing technical documentation is your area, any and all help is welcome!

Before contributing to the Filecoin docs, please read these quick guides; they'll save you time and help keep the docs accurate and consistent!

1. [Style and formatting guide]({{< relref "#grammar-and-formatting" >}})
2. [Writing guide]({{< relref "#writing-guide" >}})

If you have never contributed to an open-source project before, or just need a refresher, take a look at the [contribution tutorial]({{< relref "#contribution-tutorial" >}}).

### Community

If interacting with people is your favorite thing to do in this world, join the [Filecoin chat and discussion forums]({{< relref "chat-and-discussion-forums" >}}) to say hello, meet others who share your goals, and connect with other members of the community. You should also consider joining [Filecoin Slack](https://filecoin.io/slack). 

### Build Applications

Filecoin is designed for you to integrate into your own applications and services.

Get started by looking at the list of projects currently built on Filecoin. Build anything you think is missing! If you're unsure about something, you can join the chat and discussion forums to get help or feedback on your specific problem/idea. You can also join a Filecoin Hackathon, apply for a Filecoin Developer Grant or apply to the Filecoin accelerator program to support the development of your project.

- [Filecoin Hackathons](https://hackathons.filecoin.io/)
- [Filecoin Dev Grants](https://filecoin.io/grants/)
- [Filecoin Accelerator Program](https://ecosystem-wg.notion.site/Protocol-Labs-Accelerator-Program-d45d8792a7d544eca9beb7d3e3d3b05d)

### Protocol Design

Filecoin is ultimately about building better protocols, and the community always welcome ideas and feedback on how to improve those protocols.

- [filecoin-project/specs](https://github.com/filecoin-project/specs)

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

## Grammar and formatting

## Grammar and spelling

Here are some language-specific rules that the Filecoin documentation follows. If you use a writing service like [Grammarly](https://www.grammarly.com/), most of these rules are turned on by default.

### American English

While Filecoin is a global project, the fact is that American English is the most commonly used _style_ of English used today. With that in mind, when writing content for the Filecoin project, use American English spelling. The basic rules for converting other styles of English into American English are:

1. Swap the `s` for a `z` in words like _categorize_ and _pluralize_.
2. Remove the `u` from words like _color_ and _honor_.
3. Swap `tre` for `ter` in words like _center_.

### The Oxford comma

In a list of three or more items, follow each item except the last with a comma `,`:

| Use                           | Don't use                    |
| ----------------------------- | ---------------------------- |
| One, two, three, and four.    | One, two, three and four.    |
| Henry, Elizabeth, and George. | Henry, Elizabeth and George. |

### References to Filecoin

As a proper noun, the name "Filecoin" (capitalized) should be used only to refer to the overarching project, to the protocol, or to the project's canonical network:

> Filecoin [the project] has attracted contributors from around the globe!
> Filecoin [the protocol] rewards contributions of data storage instead of computation!
> Filecoin [the network] is currently storing 50 PiB of data!

The name can also be used as an adjective:

> The Filecoin ecosystem is thriving!
> I love contributing to Filecoin documentation!

When referring to the token used as Filecoin's currency, the name `FIL`, is preferred. It is alternatively denoted by the Unicode symbol for an integral with a double stroke ⨎:

- Unit prefix: **100 FIL**.
- Symbol prefix: **⨎100**.

The smallest and most common denomination of FIL is the `attoFIL` (10^-18 FIL).

> The collateral for this storage deal is 5 FIL.
> I generated ⨎100 as a storage provider last month!

Examples of discouraged usage:

> Filecoin rewards storage providers with Filecoin.
> There are many ways to participate in the filecoin community.
> My wallet has thirty filecoins.

Consistency in the usage of these terms helps keep these various concepts distinct.

### References to Lotus

Lotus is the main implementation of Filecoin. As such, it is frequently referenced in the Filecoin documentation. When referring to the Lotus implementation, use a capital _L_. A lowercase _l_ should only be used when referring to the Lotus executable commands such as `lotus daemon`. Lotus executable commands should always be within code blocks:

````markdown
1. Start the Lotus daemon:

   ```shell
   lotus daemon
   ```

2. After your Lotus daemon has been running for a few minutes, use `lotus` to check the number of other peers that it is connected to in the Filecoin network:

   ```shell
   lotus net peers
   ```
````

### Acronyms

If you have to use an acronym, spell the full phrase first and include the acronym in parentheses `()` the first time it is used in each document. Exception: This generally isn't necessary for commonly-encountered acronyms like _IPFS_, unless writing for a stand-alone article that may not be presented alongside project documentation.

> Virtual Machine (VM), Decentralized Web (DWeb).

## Formatting

How the Markdown syntax looks, and code formatting rules to follow.

### Syntax

The Filecoin Docs project follows the _GitHub Flavoured Markdown_ syntax for markdown. This way, all articles display properly within GitHub itself. This gives readers the option to view articles on [the docs website](https://docs.filecoin.io) or [its GitHub repo](https://github.com/filecoin-project/filecoin-docs).

### Rules

We use the rules set out in the [VSCode Markdownlint](https://github.com/DavidAnson/vscode-markdownlint) extension. You can import these rules into any text editor like Vim or Sublime. All rules are listed [within the Markdownlint repository](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md).

We highly recommend installing [VSCode](https://code.visualstudio.com/) with the [Markdownlint](https://github.com/DavidAnson/vscode-markdownlint) extension to help with your writing. The extension shows warnings within your markdown whenever your copy doesn't conform to a rule.

## Style

The following rules explain how we organize and structure our writing. The rules outlined here are in addition to the [rules](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md) found within the [Markdownlinter extension](https://github.com/DavidAnson/vscode-markdownlint).

### Text

The following rules apply to editing and styling text.

#### Titles

1. All titles follow sentence structure. Only _names_ and _places_ are capitalized, along with the first letter of the title. All other letters are lower-case:

   ```markdown
   ## This is a title

   ### Only capitalize names and places

   #### The capital city of France is Paris
   ```

2. Every article starts with a _front-matter_ title and description:

   ```markdown
   ---
   title: Example article
   description: This is a brief description that shows up in link teasers in services like Twitter and Slack.
   ---

   ## This is a subtitle

   Example body text.
   ```

   In the above example `title:` serves as a `<h1>` or `#` tag. There is only ever one title of this level in each article.

3. Titles do not contain punctuation. If you have a question within your title, rephrase it as a statement:

   ```markdown
   <!-- This title is wrong. -->
   ## What is Filecoin?

   <!-- This title is better. -->
   ## Filecoin explained
   ```

#### Bold text

Double asterisks `**` are used to define **boldface** text. Use bold text when the reader must interact with something displayed as text: buttons, hyperlinks, images with text in them, window names, and icons.

```markdown
In the **Login** window, enter your email into the **Username** field and click **Sign in**.
```

#### Italics

Underscores `_` are used to define _italic_ text. Style the names of things in italics, except input fields or buttons:

```markdown
Here are some American things:

- The _Spirit of St Louis_.
- The _White House_.
- The United States _Declaration of Independence_.

Try entering them into the **American** field and clicking **Accept**.
```

Quotes or sections of quoted text are styled in italics and surrounded by double quotes `"`:

```markdown
In the wise words of Winnie the Pooh _"People say nothing is impossible, but I do nothing every day."_
```

#### Code blocks

Tag code blocks with the syntax of the core they are presenting:

```markdown
    ```javascript
    console.log(error);
    ```
```

Output from command-line actions can be displayed by adding another codeblock directly after the input codeblock. Here's an example telling the use to run `go version` and then the output of that command in a seperate codeblock immediately after the first:

````markdown
    ```shell 
    go version
    ```

    ```plaintext
    go version go1.19.7 darwin/arm64
    ```
````

Command-line examples can be truncated with three periods `...` to remove extraneous information:

````markdown
    ```shell
    lotus-miner info
    ```

    ```shell
    Miner: t0103
    Sector Size: 16.0 MiB
    ...
    Sectors:  map[Committing:0 Proving:0 Total:0]
    ```
````

#### Inline code tags

Surround directories, file names, and version numbers between inline code tags `` ` ``.

```markdown
Version `1.2.0` of the program is stored in `~/code/examples`. Open `exporter.exe` to run the program.
```

#### List items

All list items follow sentence structure. Only _names_ and _places_ are capitalized, along with the first letter of the list item. All other letters are lowercase:

1. Never leave Nottingham without a sandwich.
2. Brian May played guitar for Queen.
3. Oranges.

List items end with a period `.`, or a colon `:` if the list item has a sub-list:

1. Charles Dickens novels:
   1. Oliver Twist.
   2. Nicholas Nickelby.
   3. David Copperfield.
2. J.R.R Tolkien non-fiction books:
   1. The Hobbit.
   2. Silmarillion.
   3. Letters from Father Christmas.

##### Unordered lists

Use the dash character `-` for un-numbered list items:

```markdown
- An apple.
- Three oranges.
- As many lemons as you can carry.
- Half a lime.
```

#### Special characters

Whenever possible, spell out the name of the special character, followed by an example of the character itself within a code block.

```markdown
Use the dollar sign `$` to enter debug-mode.
```

#### Keyboard shortcuts

When instructing the reader to use a keyboard shortcut, surround individual keys in code tags:

```shell
Press `ctrl` + `c` to copy the highlighted text.
```

The plus symbol `+` stays outside of the code tags.

#### Custom containers

Custom containers can be defined by their types, titles, and contents.

##### Input

```markdown
&#123;&#123;&#60; alert  &#62; &#125;&#125;
This is a tip
&#123;&#123;&#60; /alert &#62; &#125;&#125;

&#123;&#123;&#60; alert icon="callout" &#62; &#125;&#125;
This is a callout
&#123;&#123;&#60; /alert &#62; &#125;&#125;

&#123;&#123;&#60; alert  &#62;&#125;&#125;
This is a dangerous warning
&#123;&#123;&#60; /alert &#62; &#125;&#125;
```

##### Output

This output is not supported by Github Flavoured Markdown (GFM). However, they render properly when viewed through VuePress at [docs.filecoin.io/community/contribute/grammar-formatting-and-style](https://docs.filecoin.io/community/contribute/grammar-formatting-and-style/#custom-containers).

{{< alert  >}}
This is a tip
{{< /alert >}}

{{< alert icon="callout" >}}
This is a callout
{{< /alert >}}

{{< alert  >}}
This is a dangerous warning
{{< /alert >}}

### Images

The following rules and guidelines define how to use and store images.

#### Alt text

All images contain alt text so that screen-reading programs can describe the image to users with limited sight:

```markdown
![Screenshot of an image being uploaded through the Filecoin command line.](filecoin-image-upload-screen.png)
```

#### Storage location

Store images in the same folder as the content that you're referencing the image from. This will require you to create a new folder with the same name as the title of your content, and then add your `.md` content into that folder as `index.md`. The images then go into that folder.

```markdown
![Proof of Spacetime diagram.](proof-of-spacetime.png)
```

The directory structure of this article looks like this:

```plaintext
concepts/
├── content-addressed-data.md
├── proof-of-spacetime
│   └── index.md
│   └── proof-of-spacetime.png
└── proof-of-replication.md
```

There are no images within `proof-of-replication.md` or `content-addressed-data.md`, so those articles do not need to be in their own folders.

### File names

All file names are lower-case with dashes `-` between words, including image files:

```plaintext
concepts/
├── content-addressed-data.md
├── images
│   └── proof-of-spacetime
│       └── post-diagram.png
└── proof-of-replication.md
└── proof-of-spacetime.md
```
