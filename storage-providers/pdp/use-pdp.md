---
description: >-
  This guide walks you through using the PDP client tool (pdptool) to interact
  with a Filecoin Storage Provider running the Proof of Data Possession (PDP)
  service.
---

# Use PDP

PDP ensures that your data is verifiably stored by a Filecoin Storage Provider using cryptographic proofs without needing to retrieve the file itself.

### Prerequisites

Before beginning, ensure:

* You have access to a terminal with internet connectivity
* Your system has pdptool installed (bundled with Curio)

### If pdptool is not installed:

* **Option 1**: Clone Curio and build pdptool:

```sh
git clone 
https://github.com/filecoin-project/curio.git

cd curio
cd cmd/pdptool
go build .
```

* **Option 2**: Install the [Docker version ](https://github.com/LesnyRumcajs/pdp)of pdptool - Provided by our friends at [ChainSafe](https://chainsafe.io/)

***

### Authenticate Your Client  (JWT Token)

You first need to authenticate your pdptool with a PDP-enabled Storage Provider

Generate a service secret:

```sh
./pdptool create-service-secret
```

```sh
# Example output:

-----BEGIN PUBLIC KEY-----
LxP9MzVmHdC7KwYBvNAo1jXuIRfGXqQyo2JzE4Uctn0a5eFZbs6Wlvq3dKYgphTD
XAqRsm38LPt2iVcGb9MruZJxEkBhO71wDdNyaFMoXpCJnUqRAezvKlfbIg==
-----END PUBLIC KEY-----
```

{% hint style="success" %}
Reach out in the [#fil-pdp](https://filecoinproject.slack.com/archives/C0717TGU7V2) channel in Filecoin Slack to register your public key with a PDP-enabled Storage Provider
{% endhint %}

***

### Connect to a PDP Service

Start by pinging the PDP service to confirm availability:

```sh
./pdptool ping --service-url https://yablu.net --service-name pdp-service
```

{% hint style="success" %}
You should see something like:
{% endhint %}

```sh
Ping successful: Service is reachable and JWT token is valid.
```

***

### Create a Proof Set

Start by creating an empty proof set. This step must happen **before** uploading files:

```sh
./pdptool create-proof-set \
  --service-url https://yablu.net \
  --service-name pdp-service \
  --recordkeeper 0x6170dE2b09b404776197485F3dc6c968Ef948505
```

```sh
# Example output:

Proof set creation initiated successfully.
Location: /pdp/proof-sets/created/0xf91617ef532748efb5a51e64391112e5328fbd9a5b9ac20e5127981cea0012a5
Response: 
```

Use the `0x`  transaction hash from the previous output to monitor proof set creation status:

```sh
./pdptool get-proof-set-create-status \
  --service-url https://yablu.net \
  --service-name pdp-service \
  --tx-hash 0xf91617ef532748efb5a51e64391112e5328fbd9a5b9ac20e5127981cea0012a5
```

{% hint style="success" %}
You should see something like:
{% endhint %}

```sh
Proof Set Creation Status:
Transaction Hash: 0xf91617ef532748efb5a51e64391112e5328fbd9a5b9ac20e5127981cea0012a5
Transaction Status: confirmed
Transaction Successful: true
Proofset Created: true
ProofSet ID: 43
```

{% hint style="info" %}
The proof set creation process can take a few seconds to complete
{% endhint %}

***

### Upload Files to the Storage Provider

Once your proof set is ready, you can begin uploading files:

```sh
./pdptool upload-file --service-url https://yablu.net --service-name pdp-service /path/to/file.ext
```

{% hint style="success" %}
Example output:
{% endhint %}

```sh
0: pieceSize: 65536
baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli:baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli
```

***

### 🌳 Add File Roots to Proof Set

After uploading each file, extract its CID and add it to your proof set:

```sh
./pdptool add-roots \
  --service-url https://yablu.net \
  --service-name pdp-service \
  --proof-set-id <PROOF-SET-ID> \
  --root <CID1>+<CID2>+<CID3>...
```

Example using the information returned in the previous steps:

```sh
./pdptool add-roots \
  --service-url https://yablu.net \
  --service-name pdp-service \
  --proof-set-id 43 \
  --root baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli:baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli
```

{% hint style="info" %}
In the above example, `--proof-set-id` came from the [Create Proof Set](use-pdp.md#create-a-proof-set) step, and `--root` from the [Upload Files to the Storage Provider](use-pdp.md#upload-files-to-the-storage-provider) step.
{% endhint %}

{% hint style="success" %}
Example output:
{% endhint %}

```sh
Roots added to proof set ID 43 successfully.
Response: 
```

***

### View a Piece or Proof Set

You can retrieve a proof set or inspect a file root directly:

```sh
./pdptool get-proof-set \
  --service-url https://yablu.net \
  --service-name pdp-service 43
```

{% hint style="success" %}
Example output:
{% endhint %}

```sh
Proof Set ID: 43
Next Challenge Epoch: 2577608
Roots:
  - Root ID: 0
    Root CID: baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli
    Subroot CID: baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli
    Subroot Offset: 0
```

***

### Retrieve From a Proof Set

Download a file using an ordered chunks list:

```sh
./pdptool download-file \
  --service-url https://yablu.net \
  --chunk-file chunks.list \
  --output-file file.ext
```

{% hint style="info" %}
💡In the above example, `–chunk-file` and `–output-file` flags were defined in the [Upload Files to the Storage Provider step](use-pdp.md#upload-files-to-the-storage-provider)
{% endhint %}

***

### You’re Done!

You’ve now:

✅ Connected to a PDP-enabled storage provider\
✅ Created a proof set\
✅ Uploaded files and added file roots\
✅ Verified availability and proof status

🧭 Next: Track your proof sets in the PDP Explorer

* [Calibration PDP Explorer](https://calibration.pdp-explorer.eng.filoz.org)
* [Mainnet PDP Explorer](https://pdp-explorer.eng.filoz.org)&#x20;

💬 Questions? Join the conversation on Filecoin Slack: [#fil-pdp](https://filecoinproject.slack.com/archives/C0717TGU7V2)
