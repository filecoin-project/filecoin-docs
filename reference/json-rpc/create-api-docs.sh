#!/bin/bash

# ---------------------
# This script grabs the Lotus JSON-RPC API methods from github.com/filecoin-project/lotus and splits it into individual files. It also runs Prettier against each file, and reduces the header levels.
# To run this script, install Prettier with `npm install -g prettier` and execute the file with ./create-api-docs.sh
# ---------------------

# Download the Markdown file.
curl -o api.md https://raw.githubusercontent.com/filecoin-project/lotus/master/documentation/en/api-v1-unstable-methods.md

# Define the output directory.
output_dir="./"

# Create the output directory if it doesn't exist.
mkdir -p "$output_dir"

# Read the Markdown file line by line.
while IFS= read -r line; do

  # Check if the line starts with "## ".
  if [[ $line == "## "* ]]; then

    # Extract the header text.
    header=$(echo "$line" | sed 's/^## //')

    # Remove any special characters from the header text to create a lowercase filename.
    filename=$(echo "$header" | tr -cd '[:alnum:]\n' | tr '[:upper:]' '[:lower:]')

    # Create a new file for each header.
    if [[ $filename != "tableofcontents" ]]; then
      output_file="$output_dir/$filename.md"
      echo "# $header" > "$output_file"
    fi
  elif [[ $line == "### "* ]]; then

    # Modify the line to start with "## ".
    modified_line=$(echo "$line" | sed 's/^### /## /')

    # Append the modified line to the current output file.
    echo "$modified_line" >> "$output_file"
  elif [[ $line == "#### "* ]]; then

    # Modify the line to start with "### ".
    modified_line=$(echo "$line" | sed 's/^#### /### /')

    # Append the modified line to the current output file.
    echo "$modified_line" >> "$output_file"
  elif [[ -n "$output_file" ]]; then

    # Append the line to the current output file.
    echo "$line" >> "$output_file"
  fi

done < api.md

# Remove the temporary api.md and .md files.
rm api.md .md

# Run prettier on each generated file.
for file in "$output_dir"/*.md; do
  npx prettier --write "$file"
done

