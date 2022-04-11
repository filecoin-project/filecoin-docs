---
title: "Writing guide"
description: "Learn the specifics of how to write documentation for the Filecoin project."
menu:
    about:
        parent: "about-filecoin-contribute"
aliases:
    - /community/contribute/writing-guide/
---

This guide explains things to keep in mind when writing for Filecoin's documentation. While the [grammar, formatting, and style guide]({{< relref "./grammar-formatting-and-style.md" >}}) lets you know the rules you should follow, this guide will help you to properly structure your writing and choose the correct tone for your audience.

## Walkthroughs

The purpose of a walkthrough is to tell the user _how_ to do something. They do not need to convince the reader of something or explain a concept. Walkthroughs are a list of steps the reader must follow to achieve a process or function.

The vast majority of documentation within the Filecoin Docs project falls under the _Walkthrough_ category. Walkthroughs are generally quite short, have a neutral tone, and teach the reader how to achieve a particular process or function. They present the reader with concrete steps on where to go, what to type, and things they should click on. There is little to no _conceptual_ information within walkthroughs.

### Goals

Use the following goals when writing walkthroughs:

| Goal          | Keyword     | Explanation                                                       |
| ------------- | ----------- | ----------------------------------------------------------------- |
| **Audience**  | _General_   | Easy for anyone to read with minimal effort.                      |
| **Formality** | _Neutral_   | Slang is restricted, but standard casual expressions are allowed. |
| **Domain**    | _Technical_ | Acronyms and tech-specific language is used and expected.         |
| **Tone**      | _Neutral_   | Writing contains little to no emotion.                            |
| **Intent**    | _Instruct_  | Tell the reader _how_ to do something.                            |

#### Function or process

The end goal of a walkthrough is for the reader to achieve a very particular function. _Installing the Filecoin Desktop application_ is an example. Following this walkthrough isn't going to teach the reader much about working with the decentralized web or what Filecoin is. Still, by the end, they'll have the Filecoin Desktop application installed on their computer.

#### Short length

Since walkthroughs cover one particular function or process, they tend to be quite short. The estimated reading time of a walkthrough is somewhere between 2 and 10 minutes. Most of the time, the most critical content in a walkthrough is presented in a numbered list. Images and gifs can help the reader understand what they should be doing.

If a walkthrough is converted into a video, that video should be no longer than 5 minutes.

### Walkthrough structure

Walkthroughs are split into three major sections:

1. What we're about to do.
2. The steps we need to do.
3. Summary of what we just did, and potential next steps.

## Conceptual articles

Articles are written with the intent to inform and explain something. These articles don't contain any steps or actions that the reader has to perform _right now_.

These articles are vastly different in tone when compared to walkthroughs. Some topics and concepts can be challenging to understand, so creative writing and interesting diagrams are highly sought-after for these articles. Whatever writers can do to make a subject more understandable, the better.

### Article goals

Use the following goals when writing conceptual articles:

| Goal          | Keyword                  | Explanation                                                                      |
| ------------- | ------------------------ | -------------------------------------------------------------------------------- |
| **Audience**  | _Knowledgeable_          | Requires a certain amount of focus to understand.                                |
| **Formality** | _Neutral_                | Slang is restricted, but standard casual expressions are allowed.                |
| **Domain**    | _Any_                    | Usually _technical_, but depends on the article.                                 |
| **Tone**      | _Confident and friendly_ | The reader must feel confident that the writer knows what they're talking about. |
| **Intent**    | _Describe_               | Tell the reader _why_ something does the thing that it does, or why it exists.   |

### Article structure

Articles are separated into five major sections:

1. Introduction to the thing we're about to explain.
2. What the thing is.
3. Why it's essential.
4. What other topics it relates to.
5. Summary review of what we just read.

## Tutorials

When writing a tutorial, you're teaching a reader how to achieve a complex end-goal. Tutorials are a mix of walkthroughs and conceptual articles. Most tutorials will span several pages, and contain multiple walkthroughs within them.

Take the hypothetical tutorial _Get up and running with Filecoin_, for example. This tutorial will likely have the following pages:

1. A brief introduction to what Filecoin is.
2. Choose and install a command line client.
3. Understanding storage deals.
4. Import and store a file.

Pages `1` and `3` are conceptual articles, describing particular design patterns and ideas to the reader. All the other pages are walkthroughs instructing the user how to perform one specific action.

When designing a tutorial, keep in mind the walkthroughs and articles that already exist, and note down any additional content items that would need to be completed before creating the tutorial.
