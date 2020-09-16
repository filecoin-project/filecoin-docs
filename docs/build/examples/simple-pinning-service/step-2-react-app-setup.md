---
title: Step 2 - Run the React app
description: This article describes how to run the React app for the Powergate Pinning Service tutorial.
---

# Step 2 - Run the React app

## Requirements

1. [Node.js](https://nodejs.org/en/download/)
2. [Xcode CommandLineTools](https://developer.apple.com/library/archive/technotes/tn2339/_index.html#//apple_ref/doc/uid/DTS40014588-CH1-WHAT_IS_THE_COMMAND_LINE_TOOLS_PACKAGE_)
3. [Metamask Plugin](https://metamask.io/)

## Steps

1. Clone the React app:

```bash
git clone https://github.com/dappkit/powergate-pinning-service
```

2. Open the [powergate-pinning-service](https://github.com/dappkit/powergate-pinning-service) project in a text editor.
3. Run the following commands to start the app:

```bash
npm ci
npm start
```

The pinning service app starts.

::: tip
This tutorial uses [React](https://reactjs.org/) as the UI library and [Redux](https://redux.js.org/) for application state management. You can use any other library or framework to build such an app.
:::

::: tip
**NOTE:** This sample app is just to showcase how to use Powergate. If you are using Powergate regularly, you may want to keep the powergate libraries in your backend.
:::
