---
title: "Grammar and formatting"
description: "Learn the syntax and formatting rules for writing documentation for the Filecoin project."
menu:
    about:
        parent: "about-filecoin-contribute"
aliases:
    - /community/contribute/grammar-formatting-and-style/
---

This page details the syntax and formatting rules for writing Filecoin documentation. For more conceptual ideas of writing, check out the [writing guide]({{< relref "./writing-guide.md" >}}).

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

When referring to the token used as Filecoin's currency, the name `FIL`, is preferred; it is alternatively denoted by the Unicode symbol for an integral with a double stroke (⨎). These symbols can be used as suffixes or prefixes, as seen fit:

- Unit prefix: **100 FIL**.
- Unit suffix: **FIL 100**.
- Symbol prefix: **⨎100**.
- Symbol suffix: **100 ⨎**.

The smallest and most common denomination of FIL is the `attoFIL` (10^-18 FIL).

> The collateral for this storage deal is five FIL.

> I generated ⨎100 as a storage provider last month!

> My wallet has thirty filecoin.

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

![Screenshot of some Markdown in VSCode showing an error.](no-empty-links-error.png)

The extension summarizes all the warnings within the open file at the bottom of the editor:

![Screenshot of VSCode with a summary of markdown errors.](markdown-error-summary.png)

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

##### Command-line examples

This project supports a special `with-output` tag that can be applied to markdown code blocks to support command-line examples.
When you add `with-output` to a code block, the code block that immediately follows it will be styled as the "output" block. This
lets the reader easily distinguish between input and output, and allows them to copy just the input portion to their clipboard using
the clipboard button.

Note that you must include the language tag (for example, `shell`, or `bash`) as well as the `with-output` tag, and the output code block must immediately follow the input block.

Here's an example of using the `with-output` tag:

````markdown
    ```shell with-output
    lotus-miner info
    ```
    ```
    Miner: t0103
    Sector Size: 16.0 MiB
    Power: 0 B / 16.0 MiB (0%)
    Worker use:
        Local: 0 / 2 (+1 reserved)
        **Remote: 0 / 1**
    PoSt Submissions: Not Proving
    Sectors:  map[Committing:0 Proving:0 Total:0]
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

If you have command-line output that isn't directly "tied" to a corresponding input block, you can use the `output` tag to get
a similar visual styling to the `with-output` block. This can be useful when you want to add some explanatory text between input and output blocks:

````markdown
  ```shell with-output
  some-shell-command
  ```

  Here's some text that explains the output...

  ```text output
  The command output...
  ```
````

Note that you must have a language hint (e.g. `text`) and the `output` tag for the styles to be applied correctly.

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

<pre class="prettyprint lang-html">
&#123;&#123;&#60; alert icon="tip" &#62; &#125;&#125;
This is a tip
&#123;&#123;&#60; /alert &#62; &#125;&#125;

&#123;&#123;&#60; alert icon="callout" &#62; &#125;&#125;
This is a callout
&#123;&#123;&#60; /alert &#62; &#125;&#125;

&#123;&#123;&#60; alert icon="warning" &#62;&#125;&#125;
This is a dangerous warning
&#123;&#123;&#60; /alert &#62; &#125;&#125;
</pre>

##### Output

This output is not supported by Github Flavoured Markdown (GFM). However, they render properly when viewed through VuePress at [docs.filecoin.io/community/contribute/grammar-formatting-and-style](https://docs.filecoin.io/community/contribute/grammar-formatting-and-style/#custom-containers).

{{< alert icon="tip" >}}
This is a tip
{{< /alert >}}

{{< alert icon="callout" >}}
This is a callout
{{< /alert >}}

{{< alert icon="warning" >}}
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

```
concepts/
├── content-addressed-data.md
├── proof-of-spacetime
│   └── index.md
│   └── proof-of-spacetime.png
└── proof-of-replication.md
```

There are no images within `proof-of-replication.md` or `content-addressed-data.md`, so those articles do not need to be in their own folders.

### File names

All file names are lower-case with dashes `-` between words, including image files:

```
concepts/
├── content-addressed-data.md
├── images
│   └── proof-of-spacetime
│       └── post-diagram.png
└── proof-of-replication.md
└── proof-of-spacetime.md
```
