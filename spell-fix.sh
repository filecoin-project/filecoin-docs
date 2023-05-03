#!/bin/bash

fileList=$(git diff --diff-filter=d --cached --name-only)
mdFileList=$(echo "$fileList" | grep -E '\.(md)$')

echo "\nPRINTING SPELLING ERRORS REPORT... \n"
npx mdspell -r -a -n --en-us ${mdFileList[*]} "$@"

echo "\nENTERING INTERACTIVE SPELLING FIX MODE... \n"
npx mdspell -a -n --en-us "${mdFileList[*]}"

echo "\nEXITING"

exit 0