---
description: >-
  This page discusses the basic 101-level knowledge of deal renewal for storage providers (and clients).
---

# Deal Renewal 101

Renewing Filecoin storage deals involves a set of steps to ensure that your data remains stored on the Filecoin network as your original storage deal approaches its expiration. Here is an outline of how that process might look like.

We will demonstrate most of the commands with [Lotus](../../nodes/full-nodes/basic-setup.md#basic-setup), but hopefully you can follow along using other alternatives.

## 1. Monitor Deal Expirations

- **Track deal expiration**: Use a tool like Lotus or Filfox (Filecoin Explorer) to monitor the expiration dates of your existing storage deals.
- **Set up alerts**: It’s a good practice to set up notifications or alerts so you are aware when deals are nearing expiration.

Here are basic ways you can track and monitor deals:

### 1.1 Check Deal Expiration Using Lotus CLI

Use the Lotus CLI to query information about your active storage deals:

```bash
lotus client list-deals
```

This will show a list of deals with information like the deal ID, deal state, expiration height, and more.

### 1.2 Create a Script to Check Expiring Deals

You can create a bash or Python script to automatically check for deals nearing expiration and trigger an alert when a deal is about to expire. For example, the script can compare the current block height with the expiration height of the deals.

#### Bash Script Example

```bash
#!/bin/bash

# Get current block height
current_block_height=$(lotus chain head | grep Height | awk '{print $2}')

# List deals and extract expiration information
lotus client list-deals | while read -r deal
do
  expiration=$(echo $deal | awk '{print $5}')  # Assuming expiration is in the 5th column
  if [ $((expiration - current_block_height)) -lt 1000 ]; then  # Check if the expiration is within 1000 blocks
    echo "Deal with ID $deal is expiring soon!"
    # Add custom alert code here, like sending an email or message to your team.
  fi
done
```

### 1.3 Set Up a Cron Job

You can automate the script to run periodically using cron (Linux/Mac).

#### Example cron job (runs every 6 hours)

```bash
0 */6 * * * /path/to/your/script.sh
```

This will check for deals expiring within a certain block height window and send a notification.

## 2. Prepare for Renewal

- **Ensure sufficient funds**: Make sure you have enough FIL (Filecoin tokens) in your wallet to renew your storage deal, as renewing will require paying storage miners.
- **Data retrieval (optional)**: If you need to modify or update your stored data, [retrieve it](../../builder-cookbook/data-storage/retrieve-data.md) from the Filecoin network before renewing the deal.

### 3. Choose New Deal Parameters

- **Duration of the new deal**: Decide on the duration for which you want the data to be stored in the renewal period. Filecoin storage deals have a fixed term, so choose how long the new deal will last. Check out the [minimum duration](../../basics/project-and-community/filecoin-faqs.md#whats-the-minimum-time-period-for-the-storage-contract-between-the-provider-and-the-buyer) for a storage deal. Note that durations are in epoches, which are about 30 seconds.
- **Storage providers**: You may renew the deal with the same storage provider or choose a new one depending on pricing and reliability. If you provide top-notched service to assist clients in renewal, chances are they will stay on.
- **Deal pricing**: Storage prices fluctuate based on market conditions and miner offerings. Check the current storage pricing before renewing the deal to ensure you’re getting a competitive rate.

### 4. Submit a New Storage Deal

- **Using Lotus**: To renew, you essentially submit a new storage deal with the same or updated data to the network.
- **Lotus CLI**: If using Lotus, you can use the following command to renew the deal:

```shell
lotus client renew [dealID] [duration]
```

### 5. Verify Deal Renewal

- **Check deal status**: Once the deal is confirmed, you can verify the new deal via the Filecoin explorer (like Filfox or Glif) or through your Lotus client.
- **Ensure data redundancy (Optional)**: It’s recommended to store data with multiple providers to ensure redundancy in case one becomes unavailable.

### 6. Automate Renewals (Optional)

- **Set up automatic renewal**: If you have many deals or want to streamline the process, you can automate the renewal of storage deals by using the following methods:

#### Renew with custom scripts

Write a script in your favorite language to call Lotus API to trigger renewals before the expiration date.

Here is a simple bash script example:

```bash
#!/bin/bash

# Get current block height
current_block_height=$(lotus chain head | grep Height | awk '{print $2}')

duration=18000

# List deals and extract expiration information
lotus client list-deals | while read -r deal
do
  expiration=$(echo $deal | awk '{print $5}')  # Assuming expiration is in the 5th column
  if [ $((expiration - current_block_height)) -lt 1000 ]; then  # Check if the expiration is within 1000 blocks
    echo "Deal with ID $deal is expiring soon!"
    # Automatically call `lotus renew` command
    lotus client renew $deal $duration
  fi
done
```

Or in Python:

```python
#!/usr/bin/env python3

import subprocess

# Set the duration
duration = 18000

# Function to get the current block height
def get_current_block_height():
    result = subprocess.run(["lotus", "chain", "head"], capture_output=True, text=True)
    for line in result.stdout.splitlines():
        if "Height" in line:
            return int(line.split()[1])
    return None

# Function to list deals and extract deal information
def list_deals():
    result = subprocess.run(["lotus", "client", "list-deals"], capture_output=True, text=True)
    return result.stdout.splitlines()

# Function to renew a deal
def renew_deal(deal_id, duration):
    subprocess.run(["lotus", "client", "renew", deal_id, str(duration)])

# Main script
def main():
    # Get the current block height
    current_block_height = get_current_block_height()

    if current_block_height is None:
        print("Error: Unable to get current block height")
        return

    # List all deals
    deals = list_deals()

    # Process each deal
    for deal in deals:
        deal_info = deal.split()

        # Assuming deal_id is in the 1st column and expiration is in the 5th column (0-indexed)
        deal_id = deal_info[0]
        expiration = int(deal_info[4])

        # Check if the expiration is within 1000 blocks
        if (expiration - current_block_height) < 1000:
            print(f"Deal with ID {deal_id} is expiring soon!")
            # Automatically renew the deal
            renew_deal(deal_id, duration)

# Run the script
if __name__ == "__main__":
    main()

```

#### Renew with smart contracts

To learn how to create a smart contract on Filecoin to automate renewals, head over to a new adventure in [Data replication, renewal, and repair (RaaS)](../../smart-contracts/programmatic-storage/raas.md).

### Key Considerations

- **On-chain costs**: Every storage deal incurs transaction costs on the Filecoin network, so keep track of current gas fees.
- **Data availability**: Ensure that your data remains available during the renewal process by renewing well before the expiration of the current deal.
- **Data retrieval vs renewal**: Depending on your needs, you may choose to retrieve the data from the miner, modify it, and submit it as a new deal or simply renew the deal as-is.

By following these steps, you can ensure that your clients' data stays available on the Filecoin network by renewing the storage deals on time.
