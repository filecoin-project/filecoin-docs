#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)
fileList=$(git diff --diff-filter=d --cached --name-only)
mdFileList=$(echo "$fileList" | grep -E '\.(md)$')

# Intro message, explaining what's about to happen.
# -------------------------------------------------
echo " "
echo "${bold}PRE-COMMIT CHECK${normal}"
echo "We're checking all markdown files changed in this commit for"
echo "any broken links, spelling mistakes, for formatting errors."
# -------------------------------------------------


if [ ${#mdFileList} -gt 0 ]; then

    errors=0
    echo "The following files were changed in this commit:"
    for file in $mdFileList; do
        echo "$file"
    done

    echo " "
    echo "${bold}CHECKING SPELLING${normal} \n"
    npx mdspell -r -a -n --en-us ${mdFileList[*]} "$@"
    spellPassed=$?

    echo "${bold}CHECKING LINKS${normal} \n"
    npx markdown-link-check -q -p ${mdFileList[*]} "$@"
    linksPassed=$?

    echo "${bold}CHECKING FORMATTING${normal} \n"
    npx markdownlint-cli2 ${mdFileList[*]} "$@"
    formatPassed=$?

    errorDescr=""

    if [ $linksPassed -ne 0 ]; then
        errorDescr+="\n- Broken links."
        errors=1
    fi
    if [ $spellPassed -ne 0 ]; then        
        errorDescr+="\n- Spelling errors."
        errors=1
    fi
    if [ $formatPassed -ne 0 ]; then
        errorDescr+="\n- Markdown formatting errors."
        errors=1
    fi
    if [ "$errors" -eq 1 ]; then
        echo " "
        echo "---------------------------"
        echo "${bold}YOUR COMMIT CONTAINS ERRORS${normal}"
        echo "$errorDescr"
        echo "Check $DOCLINK for details on how to fix these errors."
        exit 1
    else
        echo " "
        echo "--------------------"
        echo "${bold}No errors were found!${normal}"
        exit 0
    fi
else

    echo "----------------------------------------------"
    echo "No markdown files were changed in this commit."
    echo "Skipping checks..."
    echo "----------------------------------------------"
    exit 0
fi
