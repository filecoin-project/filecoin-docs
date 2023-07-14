#!/bin/bash

fileList=$(git diff --diff-filter=d --cached --name-only)
mdFileList=$(echo "$fileList" | grep -E '\.(md)$')

echo "\nCHECKING FOR BROKEN LINKS... \n"
npx markdown-link-check --config .mdlinkcheck-config.json -q -p $mdFileList "$@"

exit 0
