---
title: 'Docker and Kubernetes'
description: 'Run applications with dockerized-lotus'
breadcrumb: 'Docker and Kubernetes'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}. Running lotus with Docker makes it easy to run lotus for local development and run your applicaiton in professional environments.

## Docker

### Local Docker

Docker images are created each night and for every release. There are two images available.

The first image is `filecoin/lotus`. The entrypoint of this image will download the latest stateroots when the
image is started for the first time. This behavior of this image is similar AWS AMIs, DigitalOcean images, and snap packages.
If you aren't sure how to get started with docker or which one to use, this one is recommended.

```
docker run -p 1234:1234 -d filecoin/lotus:nightly
```

The second image is `filecoin/lotus-all-in-one`. This image has no entrypoint, and it contains additional binaries that might be useful
in some situations. The behavior of this image is similar to running lotus or any of the associated utilities on the command-line. Use
this image if you need greater control over lotus arguments or if you would like to use one of the built-in lotus utilities.

The following example would run the lotus binary and download the latest stateroots, placing the lotus repository into the current directory.

```
docker run -p 1234:1234 -v "${PWD}"/repo:/var/lib/lotus filecoin/lotus-all-in-one:nightly lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car
```

### Docker-Compose (optionally: docker swarm)

There is an example docker-compose file in the lotus github repository. By default, this image will start a lotus fullnode and a lotus
gateway. When writing lotus apps locally, these containers can be used to test against the full and gateway apis.

This will start lotus and the gateway with docker-compose, building lotus from source.

```
git clone https://git@github.com/filecoin-project/lotus
cd lotus
docker-compose up -d
```

## Write a docker-ized lotus application!

Lets deploy a basic lotus application. This application will demonstrate how to write an application that targets a dockerized lotus.
Once finished, we will prepare a docker-compose file for futher development. Once we are satisfied, we will deploy to a kubernetes cluster.

This github repo has a basic lotus application. It's not the most useful, nor the most featureful, but it should be enough to demonstrate
how to package and deploy applications that work well with the lotus docker images. By default, this application simply counts
the number of blocks it sees when there are head changes, and keeps track of the totals.

```
git clone https://github.com/coryschwartz/lotus-chain-notify-example.
```

main.go:

```
package main

import (
	"encoding/json"
	"net/http"
	"os"
	"sync"
	"time"

	logging "github.com/ipfs/go-log/v2"
	"github.com/urfave/cli/v2"

	"github.com/filecoin-project/lotus/api"
	lcli "github.com/filecoin-project/lotus/cli"
)

var log = logging.Logger("main")

func init() {
	logging.SetLogLevel("main", "INFO")
}

func fullnodeServices(cctx *cli.Context) lcli.ServicesAPI {
	var svcs lcli.ServicesAPI
	var err error
	for {
		svcs, err = lcli.GetFullNodeServices(cctx)
		if err == nil {
			break
		}
		log.Info("waiting for fullnode to become available")
		time.Sleep(time.Second * 10)
	}
	return svcs
}

func gatewayAPI(cctx *cli.Context) api.Gateway {
	var api api.Gateway
	var err error
	for {
		api, _, err = lcli.GetGatewayAPI(cctx)
		if err == nil {
			break
		}
		log.Info("waiting for gateway to become available")
		time.Sleep(time.Second * 10)
	}
	return api
}

func main() {
	app := &cli.App{
		Name: "example",
		Action: func(cctx *cli.Context) error {
			// svcs := fullnodeServices(cctx)
			// api := svcs.FullNodeAPI()
			api := gatewayAPI(cctx)
			ch, err := api.ChainNotify(cctx.Context)
			if err != nil {
				return err
			}
			cmu := sync.Mutex{}
			ctr := map[string]int64{
				"total_blocks":  0,
				"total_changes": 0,
				"base_fee":      0,
			}
			go func() {
				for hcs := range ch {
					for _, hc := range hcs {
						cmu.Lock()
						num_blocks := len(hc.Val.Blocks())
						log.Infow("head change", "type", hc.Type, "num_blocks", num_blocks)
						ctr["total_blocks"] += int64(num_blocks)
						ctr["total_changes"] += 1
						cmu.Unlock()
					}
				}
			}()
			// go func() {
			// 	for range time.NewTicker(time.Minute).C {
			// 		fee, err := svcs.GetBaseFee(cctx.Context)
			// 		if err != nil {
			// 			log.Warn("error getting base fee: %w", err)
			// 		}
			// 		cmu.Lock()
			// 		ctr["base_fee"] = fee.Int64()
			// 		cmu.Unlock()
			// 	}
			// }()
			return http.ListenAndServe(":9999", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				json.NewEncoder(w).Encode(ctr)
			}))
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Warnf("%w", err)
	}
}
```

Notice that this application, by default, works perfectly fine with lotus gateways. We can try it now using the public endpoint `api.chain.love`

```
FULLNODE_API_INFO=wss://api.chain.love go run main.go
```

in another terminal, after some time you will see a few changes counted.

```
curl localhost:8080
{"base_fee":0,"total_blocks":7,"total_changes":2}
```

But there is something wrong with this output -- the "base_fee" key never changes! Some of the API endpoints are not accessible through
the limited Gateway api, and they must be used against a full lotus node. Lets make some changes to the code so the fullnode API is used
instead of the gateway API.

You can simply uncomment the code that is commented out in the example. Edit the code so that:

* the fullnode API is used
* The go func toward the bottom (the one that retrieves the base fee) is uncommented

To make the code work with a full node, we will use docker-compose.

The git repository linked above has a docker-compose file already. It is pasted here as well. The thing to notice here is that
the FULLNODE_API_INFO environment variable points to the DNS name of the other docker container. This example uses the official nightly
lotus docker build.

```
version: "3.8"

services:
  lotus-chain-notify:
    build:
      context: .
    ports:
      - 8080:8080
    environment:
      - FULLNODE_API_INFO=/dns/lotus-fullnode/tcp/1234
  lotus-fullnode:
    image: filecoin/lotus:nightly

```

To use it, use the same docker-compose command we saw earlier in this tutorial. Be aware, that the initial state root download can take
quite some time. Grab a coffee. Go for a walk. This is frequently a 40GB download. Future restarts will be much faster since the state will have already been downloaded.

```
docker-compose up -d
```

once lotus has completed its initialization, local development is easy. Go ahead, add a few new features! As you do so, you can start
new copies of your applications by building and re-deploying with docker-compose the lotus container for your application will continue
to run while the lotus fullnode continues running.

```
# (edit code)
docker-compose build
docker-compose up -d
```

## Run your container on Kubernetes

Running your application on kubernetes is not as difficult as it may first seem. In fact, the same docker images you were just using
in your docker-compose application can be used on kuberentes. There are a number of good helm charts for running lotus in kubernetes

* here
* here
* here

This one is produced by the lotus infrastructure team to enable rapid development and deployment. With this helm chart, your application
should work the same in kubernetes as it does in docker-compose.

In kubernetes-speak, it will create a statefulset that has at least two containers, one for your application, and one for lotus. Lets see how it works. By default, the lotus instance will run as a "lite" node since this is the most common deployment, but you can see from
comments how to change it to a full node if necessary.


1. Push your docker image to docker hub, or another container repository. (replace the image name with your own!)

```
docker build -t coryschwartz/lotus-chain-notify-example .
docker push coryschwartz/lotus-chain-notify-example

```

2. Add the helm repo

```
helm repo add filecoin https://filecoin-project.github.io/helm-charts
```


3. Edit the values file to use your own image

4. Install with helm

```
helm install example filecoin/lotus-bundle -f values.yaml
```

