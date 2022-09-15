<!-- HEADER -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br>

<picture align=center>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/9611008/185500541-565c4d4d-660b-43e8-bc4e-00e9e8fb48b2.png">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/9611008/185500539-e0a0e852-c3b6-452b-bc7c-fe2fd165fc15.png">
    <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
</picture>

<br>
<br>

<p align="center"> This repository manages the documentation for the <a href="https://filecoin.io">Filecoin network</a>. This repo also contains the build scripts and tools to create the Filecoin docs website. <a href="https://docs.filecoin.io/">Explore the docs →</a></p>

<!-- /HEADER -->



<!-- TABLE OF CONTENTS -->
## Table of contents

- [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [About the project](#about-the-project)
    - [Files and folders](#files-and-folders)
- [Contributing](#contributing)
- [Issues](#issues)
- [License](#license)
- [Acknowledgments](#acknowledgments)
<!-- /TABLE OF CONTENTS -->



<!-- GETTING STARTED-->
## Getting Started

To get a local version of the site up and running, follow these simple example steps.
<!-- /GETTING STARTED-->



<!-- PREREQUISITIES -->
### Prerequisites

To run these commands, you must have [NPM installed](https://www.npmjs.com/). If you already have NPM installed, make sure you are running the latest version:

```shell
npm install npm@latest -g
```
<!-- /PREREQUISITIES -->



<!-- INSTALLATION -->
### Installation

Follow these steps to run a copy of this site on your local computer. 

1. Clone this repo:

    ```shell
    git clone https://github.com/filecoin-project/filecoin-docs
    ```

1. Move into the new folder and download the dependencies:

    ```shell
    cd filecoin-docs
    npm install
    ```

1. Build the project and serve it locally using Hugo's built-in server:

    ```shell
    npm run build
    ```

1. Visit [localhost:1313](http://localhost:1313) to view the site.
1. Press `CTRL` + `c` in the terminal to stop the local server.
<!-- /INSTALLATION -->



<!-- ABOUT THE PROJECT -->
## About the project

[![FVM Homepage][product-screenshot]](https://docs.filecoin.io/)

This repository manages the documentation for the Filecoin project. This repo also contains the build scripts and tools to create the Filecoin docs website and the API documentation. If you want to learn about Filecoin, how it works, or how to build on it, then you're in the right place.

### Files and folders

This section lists the various files and folders and defines the purpose for each of them.

| Name | Purpose |
| --- | --- |
| `.git`, `.github` | Manage the git configurations and contain information for GitHub constant integrations. |
| `README.md` | This file. Acts as an introduction to this repo, along with how to spin up a local copy of the `docs.filecoin.io` site. |
| `archetypes/` | Used by Hugo to programmatically create new pages. |
| `assets/` | Assets like JavaScript and fonts used by Hugo to create the static site. These assets are not explorable in a built site and must be referenced before the site is built. |
| `babel.config.js` | A configuration file used for the Babel JS compiler. |
| `config/` | Contains the configuration files for Hugo. Things like the topbar menu and site title can be managed within this directory. |
| `content/` | This is where all the `.md` files live that control the content of this site. This is where most contributions happen. |
| `data/` | Extra variables for Hugo to use when building pages can be supplied here. These variables act just like front-matter variables. See [Data Templates](https://gohugo.io/templates/data-templates/) in the Hugo docs for more info. |
| `functions/` | Functions that can be called from any template, partial, or shortcode within Hugo. |
| `i18n/` | Contains files specific to managing different languages. |
| `layouts/` | This is where web developers will spend most of their time. This folder contains the shortcodes and partials that Hugo uses to scaffold and build the site. |
| `/node_modules/` | Where NPM throws it's packages. If you see this in GitHub, something's gone wrong. It should only show up on your computer after you run `npm install`. |
| `package-lock.json` | One of the NPM configuration files. Specifies which version of packages to download. |
| `package.json` | Another one of the NPM configuration files. Specifies which packages to download but doesn't specify which _version_ of the package to grab.
| `resources/` | A cache where Hugo throws generated files like CSS and JSON after `npm run build` has been called. Unless `npm run clean` is called, Hugo will re-use these files when calling `npm run build`. |
| `static/` | Images, css, fonts, and other misc files available at `docs.filecoin.io/` when the site is built. For example, `docs.filecoin.io/site.webmanifest`.
| `theme.toml` | A Hugo configuration file that specifies which theme to use. This file should not change that often. |
<!-- /ABOUT THE PROJECT -->



<!-- CONTRIBUTING -->
## Contributing

Want to help out? Pull requests (PRs) are always welcome! If you want to help out but aren't sure where to start, check out the [issues board](https://github.com/filecoin-project/filecoin-docs/issues).
<!-- /CONTRIBUTING -->



<!-- ISSUES -->
## Issues 

Found a problem with the Filecoin docs site? [Please raise an issue](https://github.com/filecoin-project/filecoin-docs/issues/new). Be as specific and descriptive as possible; screenshots help!
<!-- /ISSUES -->



<!-- LICENSE -->
## License

Dual-licensed: [MIT](./LICENSE-MIT), [Apache Software License v2](./LICENSE-APACHE), by way of the [Permissive License Stack](https://protocol.ai/blog/announcing-the-permissive-license-stack/).
<!-- /LICENSE -->


<!-- TODO
## Contact

Project Link: [https://github.com/filecoin-project/filecoin-docs](https://github.com/filecoin-project/filecoin-docs)
-->



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

- [Fleek](https://fleek.co) web hosting
- [Hugo](https://gohugo.io) static site generator 
- [Doks](https://getdoks.org) starter theme 
<!-- /ACKNOWLEDGMENTS -->



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/filecoin-project/filecoin-docs.svg?style=for-the-badge
[contributors-url]: https://github.com/filecoin-project/filecoin-docs/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/filecoin-project/filecoin-docs.svg?style=for-the-badge
[forks-url]: https://github.com/filecoin-project/filecoin-docs/network/members
[stars-shield]: https://img.shields.io/github/stars/filecoin-project/filecoin-docs.svg?style=for-the-badge
[stars-url]: https://github.com/filecoin-project/filecoin-docs/stargazers
[issues-shield]: https://img.shields.io/github/issues/filecoin-project/filecoin-docs.svg?style=for-the-badge
[issues-url]: https://github.com/filecoin-project/filecoin-docs/issues
[license-shield]: https://img.shields.io/badge/license-MIT-blueviolet?style=for-the-badge
[license-url]: https://github.com/filecoin-project/filecoin-docs/blob/master/LICENSE.txt
[product-screenshot]: ./static/images/filecoin-docs-homepage.png
<!-- /MARKDOWN LINKS & IMAGES -->

<!-- markdownlint-disable-file -->
