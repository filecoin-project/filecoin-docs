---
title: Web Applications With Textile & React
description: Learn how to build a Filecoin Web Application with Textile & React
---

# How to build a Filecoin application using Slate React System and Textile's Powergate. (MacOS)

This tutorial is a **step by step guide** for how to build your own [Filecoin web application](https://filecoin.io) using [Textile's Powergate](https://github.com/textileio/powergate) and Slate's [React Component Library](https://slate.host/system). After following these steps you will learn how to:

- Set up your development environment
- Run your web application
- Import Slate React Components
- Integrate Powergate
- Create a Powergate authentication token
- Create a new Filecoin address
- Send funds between Filecoin Addresses

There are some other concepts you will be exposed to as you work through this tutorial:

- Writing applications with [React](https://reactjs.org/)
- Using a server side rendering framework known as [NextJS](https://nextjs.org/)
- Styling React components with [Emotion](https://emotion.sh/docs/introduction)
- Gaining additional language features using [Babel](https://babeljs.io/)

## Set up your environment (MacOS)

- You need to install `node` and `go` to build all the necessary dependencies.
- You need to install XCode Command Line Tools if you haven't already.
- Visit [https://brew.sh/](https://brew.sh/) if you need a dependency manager. This will make it easier to install `node` and `go`.

First check if MacOS XCode Command Line Tools are installed (You may have done it already):

```
xcode-select -p
```

If there is no response, then install them using this command:

```
xcode-select --install
```

Then install both `node` and `go`

```sh
brew install node.
brew install go.
```

Congrats! Once this finishes you will be able to start your project. Find a directory on your computer. Create a directory named `my-powergate-project`:

```sh
mkdir my-powergate-project
```

Afterwards create files named `package.json` and `.babelrc`.

```sh
cd my-powergate-project
touch package.json
touch .babelrc
```

You will need to add contents to both `package.json` and `.babelrc`, for the sake of speed, just copy and paste the contents below:

#### /package.json

```sh
{
  "name": "my-powergate-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "@emotion/core": "^10.0.28",
    "@emotion/cache": "11.0.0-next.12",
    "@emotion/css": "11.0.0-next.12",
    "@emotion/react": "11.0.0-next.12",
    "@emotion/server": "11.0.0-next.12",
    "@emotion/styled": "11.0.0-next.12",
    "@emotion/babel-preset-css-prop": "^10.0.27",
    "next": "latest",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "@textile/powergate-client": "0.1.0",
    "slate-react-system": "0.0.6"
  }
}

```

#### /.babelrc

```sh
{
  "presets": [
    [
      "next/babel",
      {
        "transform-runtime": {
          "useESModules": false
        }
      }
    ],
    "@emotion/babel-preset-css-prop"
  ]
}
```

- This tutorial is not time proof, as updates occur to the libraries you may have to update the dependencies.
- It may feel like a lot, but this is the last time we need to worry about this in the tutorial.
- Feel free to ask us if any of this is confusing! We're more than willing to help.

Now run `npm install`. Once that command has finished, you can create a `pages` directory and the necessary files for `NextJS` to function properly:

```sh
mkdir pages
cd pages
touch index.js
touch _app.js
touch _document.js
```

For the sake of time, populate the files with the contents below:

#### /pages/\_document.js

```js
import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from '@emotion/server'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = extractCritical(initialProps.html)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      )
    }
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
```

#### /pages/\_app.js

```js
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  )
}

export default MyApp
```

In your index.js

```js
import * as React from 'react'

import { css } from '@emotion/react'

const STYLES_PAGE = css`
  margin: 0;
  padding: 0;
`

export default class TestPage extends React.Component {
  render() {
    return <div css={STYLES_PAGE}>Hey everyone!</div>
  }
}
```

You should be ready to go! If there is any reason you got stuck or it was too difficult, you can go [here](https://github.com/filecoin-project/slate-react-system/tree/master/example) and start from this example.

## Run your web application

In your terminal client, run the following:

```sh
next
```

You should see the following in your terminal screen:

<img width="842" alt="Screen Shot 2020-07-14 at 7 05 00 PM" src="https://user-images.githubusercontent.com/310223/87494960-240a1c80-c605-11ea-9f1b-70262918781b.png">

If you visit `localhost:3000` in your browser, it should render a web page.

## Import Slate React Components

In `/pages/index.js` you can import `slate-react-system`.

```js
import * as React from 'react'
import * as System from 'slate-react-system'
```

Once you add `slate-react-system`. There are a ton of components you can use in your web application! A list of design system components live here: [https://slate.host/system](https://slate.host/system).

Lets start with a button:

```js
import * as React from 'react'
import * as System from 'slate-react-system'

import { css } from '@emotion/react'

const STYLES_PAGE = css`
  margin: 0;
  padding: 0;
`

export default class TestPage extends React.Component {
  _handleClick = () => alert('You clicked me!')

  render() {
    return (
      <div css={STYLES_PAGE}>
        <System.ButtonPrimary onClick={this._handleClick}>
          Hello There
        </System.ButtonPrimary>
      </div>
    )
  }
}
```

<img width="967" alt="Screen Shot 2020-07-14 at 7 07 10 PM" src="https://user-images.githubusercontent.com/310223/87495012-3c7a3700-c605-11ea-815b-7b1eeb48c01d.png">

Some of these components will require Powergate to function.

## Integrate Powergate

Your web application should be running at this point. Now it is time to run [Powergate](https://github.com/textileio/powergate) on your machine. You will need to do the following:

```sh
git clone https://github.com/textileio/powergate.git
cd powergate
cd docker
make localnet
```

Once your localnet is running, you can add this code to `/pages/index.js`.

```js
// NOTE:
// This is how you use the createPow constructor:
// createPow({ host: "http://0.0.0.0:6002" });
import { createPow } from '@textile/powergate-client'
```

Now we can use `slate-react-system` components that depend on Powergate running.

## Create a Powergate authentication token

Here is how we add a component that can generate an authentication token.

```js
import * as React from 'react'
import * as System from 'slate-react-system'

import { css } from '@emotion/react'
import { createPow } from '@textile/powergate-client'

const STYLES_PAGE = css`
  margin: 0;
  padding: 0;
`

export default class TestPage extends React.Component {
  PG = null
  state = { token: null }

  _handleCreateToken = async () => {
    this.PG = createPow({ host: 'http://0.0.0.0:6002' })

    const FFS = await this.PG.ffs.create()

    this.setState({ token: FFS.token ? FFS.token : null })

    this.PG.setToken(FFS.token)
  }

  render() {
    return (
      <div css={STYLES_PAGE}>
        <System.CreateToken onClick={this._handleCreateToken}>
          Hello There
        </System.CreateToken>
      </div>
    )
  }
}
```

Here is how we add a refresh button and get the updated Powergate state once you have a token.

```js
import * as React from 'react'
import * as System from 'slate-react-system'

import { css } from '@emotion/react'
import { createPow } from '@textile/powergate-client'

const STYLES_PAGE = css`
  margin: 0;
  padding: 0;
`

export default class TestPage extends React.Component {
  PG = null
  state = { token: null, info: null, addrsList: [] }

  _handleCreateToken = async () => {
    this.PG = createPow({ host: 'http://0.0.0.0:6002' })

    const FFS = await this.PG.ffs.create()

    this.setState({ token: FFS.token ? FFS.token : null })

    this.PG.setToken(FFS.token)
  }

  _handleRefresh = async () => {
    const { addrsList } = await this.PG.ffs.addrs()
    const { info } = await this.PG.ffs.info()
    this.setState({ addrsList, info })
  }

  render() {
    return (
      <div css={STYLES_PAGE}>
        <System.CreateToken onClick={this._handleCreateToken}>
          Hello There
        </System.CreateToken>
        <System.ButtonPrimary onClick={this._handleRefresh}>
          Refresh
        </System.ButtonPrimary>
      </div>
    )
  }
}
```

Your screen should look something like this:

<img width="967" alt="Screen Shot 2020-07-14 at 7 08 14 PM" src="https://user-images.githubusercontent.com/310223/87495118-70555c80-c605-11ea-8e7f-fea0928f2518.png">

- Some components require a Powergate Token to function.
- All components will render even if you don't have a Powergate Token.

Let's add a component to see a list of Filecoin addresses:

```js
import * as React from 'react'
import * as System from 'slate-react-system'

import { css } from '@emotion/react'
import { createPow } from '@textile/powergate-client'

const STYLES_PAGE = css`
  margin: 0;
  padding: 0;
`

export default class TestPage extends React.Component {
  PG = null
  state = { token: null, info: null, addrsList: [] }

  _handleCreateToken = async () => {
    this.PG = createPow({ host: 'http://0.0.0.0:6002' })

    const FFS = await this.PG.ffs.create()

    this.setState({ token: FFS.token ? FFS.token : null })

    this.PG.setToken(FFS.token)
  }

  _handleRefresh = async () => {
    const { addrsList } = await this.PG.ffs.addrs()
    const { info } = await this.PG.ffs.info()
    this.setState({ addrsList, info })
  }

  render() {
    const { token, info } = this.state

    return (
      <div css={STYLES_PAGE}>
        <System.CreateToken onClick={this._handleCreateToken}>
          Hello There
        </System.CreateToken>

        <System.ButtonPrimary onClick={this._handleRefresh}>
          Refresh
        </System.ButtonPrimary>

        {info ? <System.FilecoinBalancesList data={info.balancesList} /> : null}
      </div>
    )
  }
}
```

- Whenever you make changes such as add a new address or send Filecoin, you can hit refresh and see updates!
- This is a good starting point for adding other state altering components.

## Create a new Filecoin address

Create a class member function for the create address handler.

```js
_handleCreateAddress = async ({ name, type, makeDefault }) => {
  const response = await this.PG.ffs.newAddr(name, type, makeDefault)
}
```

Add the component to the return value of `render()`

```js
<System.CreateFilecoinAddress onSubmit={this._handleCreateAddress} />
```

Now when you hit **Refresh** you should see a new address after you use the component.

## Send funds between Filecoin Addresses

Create a class member function for the send Filecoin address handler.

```js
_handleSendFilecoin = async ({ source, target, amount }) => {
  const response = await this.PG.ffs.sendFil(source, target, amount)
}
```

Add the component to the return value of `render()`

```js
<System.SendAddressFilecoin onSubmit={this._handleSendFilecoin} />
```

Now when you hit **Refresh** you should see the balances have been updated for Filecoin you are sending between addresses.

## Complete example

Here is a complete snippet for your `/pages/index.js` if you followed all the steps.

```js
import * as React from 'react'
import * as System from 'slate-react-system'

import { css } from '@emotion/react'
import { createPow } from '@textile/powergate-client'

const STYLES_PAGE = css`
  margin: 0;
  padding: 0;
`

export default class TestPage extends React.Component {
  PG = null
  state = { token: null, info: null, addrsList: [] }

  _handleCreateToken = async () => {
    this.PG = createPow({ host: 'http://0.0.0.0:6002' })

    const FFS = await this.PG.ffs.create()

    this.setState({ token: FFS.token ? FFS.token : null })

    this.PG.setToken(FFS.token)
  }

  _handleCreateAddress = async ({ name, type, makeDefault }) => {
    const response = await this.PG.ffs.newAddr(name, type, makeDefault)
  }

  _handleSendFilecoin = async ({ source, target, amount }) => {
    const response = await this.PG.ffs.sendFil(source, target, amount)
  }

  _handleRefresh = async () => {
    const { addrsList } = await this.PG.ffs.addrs()
    const { info } = await this.PG.ffs.info()
    this.setState({ addrsList, info })
  }

  render() {
    const { token, info } = this.state

    return (
      <div css={STYLES_PAGE}>
        <System.CreateToken onClick={this._handleCreateToken}>
          Hello There
        </System.CreateToken>

        <System.ButtonPrimary onClick={this._handleRefresh}>
          Refresh
        </System.ButtonPrimary>

        {info ? <System.FilecoinBalancesList data={info.balancesList} /> : null}

        {info ? (
          <System.CreateFilecoinAddress onSubmit={this._handleCreateAddress} />
        ) : null}

        {info ? (
          <System.SendAddressFilecoin onSubmit={this._handleSendFilecoin} />
        ) : null}
      </div>
    )
  }
}
```

That should get your started!

- For more components, check out [https://slate.host/system](https://slate.host/system)
- To see more of whats possible, check out the [JS-Powergate-Library](https://github.com/textileio/js-powergate-client)!

Thank you taking the time to read this! Happy hacking :)
