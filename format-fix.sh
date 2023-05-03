#!/bin/bash

fileList=$(git diff --diff-filter=d --cached --name-only)
mdFileList=$(echo "$fileList" | grep -E '\.(md)$')

echo "\nFORMATTING AUTOMATICALLY FIXABLE ERRORS... \n"
npx markdownlint-cli2 ${mdFileList[*]} "$@"

echo "\nPRINTING UPDATED FORMATTING ERRORS REPORT... \n"
npx markdownlint-cli2 ${mdFileList[*]} "$@"
exit 0