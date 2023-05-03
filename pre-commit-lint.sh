#!/bin/bash

PREFIX="ERRORS FOUND: "
DOCS="FOR STEPS ON HOW TO FIX SPELLING, FORMATTING AND BROKEN LINKS, SEE"
fileList=$(git diff --diff-filter=d --cached --name-only)
mdFileList=$(echo "$fileList" | grep -E '\.(md)$')

echo " "
echo "PRE-COMMIT SPELLING, FORMATTING AND BROKEN LINK CHECK FOR CHANGED FILES: "

if [ ${#mdFileList} -gt 0 ]; then
    errors=0
    echo "------------"
    for file in $mdFileList; do
        echo "$file"
    done
    echo "------------"
    echo "YOU MUST FIX ANY ERRORS FOUND BEFORE YOU CAN COMMIT."
    echo "$DOCS DOCLINK.\n"

    echo "CHECKING SPELLING \n"
    npx mdspell -r -a -n --en-us ${mdFileList[*]} "$@"
    spellPassed=$?

    echo "\nCHECKING LINKS \n"
    npx markdown-link-check -q -p ${mdFileList[*]} "$@"
    linksPassed=$?

    echo "\nCHECKING FORMATTING \n"
    npx markdownlint-cli2 ${mdFileList[*]} "$@"
    formatPassed=$?

    errorDescr=""

    if [ $linksPassed -ne 0 ]; then
        errorDescr+="\n-BROKEN LINKS. SEE DOCLINK.\n"
        errors=1
    fi
    if [ $spellPassed -ne 0 ]; then        
        errorDescr+="\n-SPELLING ERRORS. SEE DOCLINK.\n"
        errors=1
    fi
    if [ $formatPassed -ne 0 ]; then
        errorDescr+="\n-FORMATTING ERRORS. SEE DOCLINK.\n"
        errors=1
    fi
    if [ "$errors" -eq 1 ]; then
        echo " "
        echo "---------"
        echo "$PREFIX"
        echo "$errorDescr"
        echo "FIX THE ERRORS AND TRY AGAIN."
        exit 1
    else
        echo " "
        echo "YAY! NO ERRORS FOUND :) COMMITTING..."
        exit 0
    fi
else
    echo "..."
    echo "NO MARKDOWN FILES CHANGED. COMPLETE."
    echo " "
    exit 0
fi
