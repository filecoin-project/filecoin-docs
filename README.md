# Filecoin Docs

DAWN IS LEARNING!

[![Build status icon.](https://img.shields.io/circleci/project/github/ipfs/ipfs-docs/master.svg?style=flat-square)](https://circleci.com/gh/ipfs/ipfs-docs)
[![Made by icon.](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai/)
[![Project icon.](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)

 This repository organizes overall documentation issues across the Filecoin project.

**If you'd just like to read the Filecoin docs, we recommend the website version of the info contained in this repo! https://docs.filecoin.io/**

## Get involved

We would **love ❤️ your help** to improve existing items or make new ones even better!


### Issues

If you find something wrong within this repository, please raise an [issue here →](https://github.com/filecoin-project/filecoin-docs/issues). Unless the issue is urgent, updates will be batch-merged into `main` on Tuesdays or Thursdays.

If you are attempting to close an issue, great! Thanks for the help! Please leave a comment within the issue requesting to be assigned to that issue **before** submitting a pull request. This minimizes the chance of multiple different contributors duplicating work by submitting pull requests for the same issue. If you submit a pull request to an issue _without_ first being assigned to it, that pull request may not be accepted.

### Suggestions

Everyone has an opinion when it comes to docs, and **that's a good thing**! Having folks from different backgrounds add to a discussion empowers everyone within that discussion. So if you've got something to add or would like to bring up a topic for discussion about the Filecoin Docs project, please do so! [Just create an issue using the `kind/discussion` tag!](https://github.com/filecoin-project/filecoin-docs/labels/kind%2Fdiscussion).

#### Pull requests welcome

Feel free to submit pull requests with any changes you'd like to see! If you're simply changing a typo or editing out a styling bug, you can add `ciskip` to the title of your pull request to stop Filecorgi from running.

## Project set up

If you want to build this site locally, run the following:

1. Clone this repository:

   ```bash
   git clone https://github.com/filecoin-project/filecoin-docs.git
   ```

1. Move into the `filecoin-docs` folder and install the NPM dependencies:

   ```bash
   cd filecoin-docs
   npm install
   ```

1. Boot up the application in _dev mode_:

   ```bash
   npm start
   ```

1. Open [localhost:1313](http://localhost:1313/) in your browser.
1. Close the local server with `CTRL` + `c`.
1. To restart the local server, run `npm start` from within the `filecoin-docs` folder.
1. To publish the site run: ```npm run build``` The project will be built and saved to /public.

## License

Dual-licensed by Protocol Labs under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0) and [MIT](http://opensource.org/licenses/MIT) terms, as explained in the [Permissive License Stack](https://protocol.ai/blog/announcing-the-permissive-license-stack/):
