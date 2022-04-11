---
title: "Contribution tutorial"
description: "Contribute to Filecoin documentation by finding issues, fixing them, and submitting them to the project."
editLink: false
menu:
    about:
        parent: "about-filecoin-contribute"
aliases:
    - /community/contribute/contribution-tutorial/
---

While the [grammar, formatting, and style]({{< relref "./grammar-formatting-and-style.md" >}}) and the [writing guide]({{< relref "./writing-guide.md" >}}) can both help you write excellent content for the Filecoin Docs project, they don't delve into how you can actually submit you content changes. This guide will walk you through finding an issue, fixing it, and then submitting your fix to the `filecoin-project/filecoin-docs` project.

There are plenty of small-sized issues around Filecoin documentation that make for easy, helpful contributions to the Filecoin project. Here, we'll walk through:

1. Finding an issue.
2. Discussing the issue.
3. Creating a fix.
4. Submitting a _pull request_.
5. Waiting for a review.
6. Merging your fix.

This may look like a lot of steps for a small issue fix, but they're all necessary to make sure we keep the docs in this project up to standard. Plus, you're not on your own — half these steps can be completed by Filecoin docs project maintainers!

## Finding an issue

The Filecoin project is hosted in GitHub. There's a bunch of reasons for this, one of them being that GitHub comes with an issue tracker, which enables the core Filecoin team to field problems from the community. All community issues can read the docs, find issues, and raise issues in the docs repository (called a _repo_ for short).

All issues involving the Filecoin docs themselves can be found here in the `filecoin-project/filecoin-docs` repo under the [**Issues** tab](https://github.com/filecoin-project/filecoin-docs/issues/). Here you can see all the issues that are currently open. We try to tag each issue with relevant descriptive tags. Tags like _difficulty_ and _size_ can give a sense of the amount of effort a task will take to complete.

Let's jump into finding an issue.

1. Go to the Filecoin Docs repository at [github.com/filecoin-project/filecoin-docs](https://github.com/filecoin-project/filecoin-docs).
2. Select the **Issues** tab.
3. Click the **Label** dropdown and select the **help wanted** tag.
4. Select an issue that interests you.

Make a note of the issue number and keep it handy for later.

## Discussing the issue

As you can probably tell from the available tags, there are lots of different types of issues. Some are tiny one-sentence changes, and others are sizable projects that require a rewrite of several pages. For small issues, there may be very little or no discussion. There's no need to waste everybody's time talking about changing a broken link. But more significant issues will likely need input from different members of the project.

When adding to a discussion, remember that it may take days or weeks to conclude an issue. With this in mind, try to include all the relevant information anyone might need within each message.

Let's add to the discussion of the issue you've chosen:

1. Read through all the previous posts to get up to speed about the issue.
2. Add any comments you feel are necessary.
3. If you still want to tackle this issue, post a message saying that you'd like to take ownership of it.

Once you've claimed ownership of an issue, a project maintainer will assign you to it. If this is a large issue, someone from the Filecoin team will check in with you from time to time and make sure you've got everything you need to progress with the issue.

## Creating a fix

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

## Create a pull request

Once you're done making commits, and are ready to get a core team member's review of your work, it's time to create a pull request.

1. Go to the `filecoin-project/filecoin-docs` repository on [GitHub](https://github.com/filecoin-project/filecoin-docs).
2. Select the **Pull requests** tab.
3. Click **New pull request**.
4. Click **compare across forks** and select your repository from the **head repository** dropdown.
5. Leave a comment to expand upon your changes.
6. Click **Create pull request**.

GitHub will check if your changes create any merge conflicts with the branch you are trying to merge into.

## Waiting for a review

All pull requests from the community must be reviewed by at least one project member before they are merged in. Depending on the size of the pull request, this could take anywhere from a few minutes to a few days to review everything. Depending on the complexity of the pull request, there may be further discussion regarding your changes. Keep returning to GitHub and checking your notifications page to make sure you don't miss anything.

## Merge your fix

Once your pull request has been approved, a project member with the correct rights will merge it. You'll be notified as soon as the merge is complete.

## Finishing up

So there you have it! You've successfully completed your first contribution to the Filecoin documentation. We're always on the lookout for great writers and educators to help us improve the Filecoin docs and make the internet better for everyone, so keep up the good work!
