<div align=center>
    
[![MIT License](https://img.shields.io/badge/license-MIT-blueviolet?style=for-the-badge)](https://protocol.ai/blog/announcing-the-permissive-license-stack/)
[![Website status](https://img.shields.io/website.svg?style=for-the-badge&url=https%3A%2F%2Fdocs.filecoin.io)](https://docs.filecoin.io/)
[![Backlog](https://img.shields.io/badge/backlog-Updated-blue?style=for-the-badge)](https://github.com/orgs/filecoin-project/projects/103/views/1)
[![Check Links](https://img.shields.io/github/actions/workflow/status/filecoin-project/filecoin-docs/check-external-links.yml?style=for-the-badge&label=External%20link%20checker)](https://github.com/filecoin-project/filecoin-docs/actions/workflows/check-external-links.yml)

</div>

## Table of contents <!-- omit in toc -->

- [About this repo](#about-this-repo)
- [Contributing](#contributing)
  - [Link checking](#link-checking)
- [Issues](#issues)
  - [Backlog](#backlog)
  - [Priority](#priority)
- [License](#license)

## About this repo

This repository manages the documentation for the [Filecoin network](https://filecoin.io). The content is built and hosted by [GitBook](https://gitbook.com). View the docs site at [docs.filecoin.io](https://docs.filecoin.io).

## Publishing
This repo is synced to [GitBook](https://gitbook.com) using [GitBook's GitSync](https://gitbook.com/docs/getting-started/git-sync).  When a PR to `main` is merged, a new GitBook is published.  This happens as a result of the GitBook applicaiton, not a GitHub Action workflow in the repo.  

PRs also generate preview links so one can preview the site before merging.  Per [GitBook GitSync integration](https://app.gitbook.com/o/NNmD4UvLc26b1TmEYgzE/s/xNWFG7bQkjLkl5BBGjbD/~/integrations/github), preview links from fork PRs have been enabled.  

[SEAD](https://sead.ai/) has admin access to the Filecoin GitBook organization.  Access can be requested through the FIL Slack #sead-filecoinio-support.

## Contributing

Want to help out? Pull requests (PRs) are always welcome! If you want to help out but aren't sure where to start, check out the [issues board](https://github.com/filecoin-project/filecoin-docs/issues).

### Link checking

Links are checked using [lychee-action](https://github.com/lycheeverse/lychee-action) as configured by [check-external-links.yml](.github/workflows/check-external-links.yml).  Working links are required before merging.  If you have a link that should be excluded from checking:
1. wrap it in `` `backticks` `` OR
2. wrap it in `<code>` blocks OR
3. use [`.lycheeignore`](https://github.com/lycheeverse/lychee-action?tab=readme-ov-file#excluding-links-from-getting-checked) 



## Issues 

Found a problem with the Filecoin docs site? [Please raise an issue](https://github.com/filecoin-project/filecoin-docs/issues/new). Be as specific and descriptive as possible; screenshots help!

### Backlog

You can view the backlog of issues, as well as what we're working on next, [over on the project board](https://github.com/orgs/filecoin-project/projects/103/views/1)

### Priority

We use `p` tags to define the priority of an issue. The priority is defined by the docs team using the following definitions:

| Label | Impact | Due date | Example |
| ----- | ------ | -------- | ------- |
| P0 | Severely business-impacting | Same day. Drop everything and fix it immediately. | The website is down. |
| P1 | Business-impacting. | Within three days. | The API endpoint for a project is about to change. |
| P2 | Planned project request. | Within two weeks. | A new method will soon be added to a project API. |
| P3 | Suggestion or conceptual update. | No due date. | A blog post discussing the benefits of decentralization for web developers. |
| P4 | Deprioritized suggestions. These will not be addressed unless significant activity or community requests are received. | No due date. | Translate the docs into Klingon. |

## License

Dual-licensed: MIT, Apache Software License v2, by way of the [Permissive License Stack](https://protocol.ai/blog/announcing-the-permissive-license-stack/).
