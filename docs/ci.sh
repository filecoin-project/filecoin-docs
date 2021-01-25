[[ "$TRAVIS_PULL_REQUEST" == "false" ]] && exit 0 # bypass script if not a pull request

echo "Testing on commit range: $TRAVIS_COMMIT_RANGE"

DO_PAGE_CHECKS=1
if [[ $TRAVIS_PULL_REQUEST_BRANCH == *"ciskip"* ]]; then
  DO_PAGE_CHECKS=0
fi
# Image optimization
echo "Compressing PNGs..."
PNGS_CHANGED=`(git diff --name-only $TRAVIS_COMMIT_RANGE || true) | grep .png`
for png in $PNGS_CHANGED; do
  optipng -o 7 $png
done

echo "Compressing JPGs..."
JPGS_CHANGED=`(git diff --name-only $TRAVIS_COMMIT_RANGE || true) | grep .jpg`
for jpg in $JPGS_CHANGED; do
  jpegoptim -f --strip-all $jpg
done

echo "Compressing GIFs..."
GIFS_CHANGED=`(git diff --name-only $TRAVIS_COMMIT_RANGE || true) | grep .gif`
for gif in $GIFS_CHANGED; do
  optipng -o 7 $gif
done

if [ -z "$(git status --porcelain)" ]; then
  # Working directory clean
  COMMENT="$COMMENT
- Image optimization came back clean!"
else
  # Uncommitted changes
  git remote add fdocs https://${GHTOKEN}@github.com/filecoin-project/filecoin-docs.git > /dev/null 2>&1
  git fetch fdocs
  git checkout $TRAVIS_PULL_REQUEST_BRANCH
  git add .
  git commit -m "Automatically optimized images. [ci skip]"
  git push --set-upstream pdocs $TRAVIS_PULL_REQUEST_BRANCH
  COMMENT="$COMMENT
- I optimized some images for you! See the commit with the comment \`Automatically optimized images [ci skip]\` in this PR for details."
fi

echo "Run npm install"
npm install
echo "Run docs build"
BUILDRESULT=$(npm run docs:build)

BUILDATTEMPT=$?
[[ $BUILDATTEMPT -eq 0 ]] && COMMENT="$COMMENT
- Vuepress build was successful!" || COMMENT="$COMMENT
- Vuepress build failed...

\`\`\`
$BUILDRESULT
\`\`\`"

pip install bs4
pip install requests

if [[ $DO_PAGE_CHECKS -eq 1 ]]; then
  echo "Run the language checker..."
  MDS_CHANGED=`(git diff --name-only $TRAVIS_COMMIT_RANGE || true) | grep .md`
  if [ -z $MDS_CHANGED ]
  then
    COMMENT="$COMMENT
- No markdown files were changed, so no page checks were run!"
  else
    COMMENT="$COMMENT
<details><summary>Possible Grammar and Outbound Link Errors</summary>

"
    for md in $MDS_CHANGED; do
      LANGCHECK=$(python docs/page-checker.py $md $LANGUAGETOOLS_USERNAME $LANGUAGETOOLS_API_KEY)
      COMMENT="$COMMENT
$LANGCHECK"
    done
    COMMENT="$COMMENT

</details>"
  fi
else
  COMMENT="$COMMENT
- Skipped doing per-page checks because branch name included \`ciskip\`."
fi

: '
echo "Delete old bot comments..."
OLDCOMMENTSJSON=$(curl -H "Authorization: token $GHTOKEN"  -X GET https://api.github.com/repos/filecoin-project/filecoin-docs/issues/$TRAVIS_PULL_REQUEST/comments)

OLDCOMMENTS=$(echo $OLDCOMMENTSJSON | jq ".[] | select(.user.id ==$DO_ENGINEERING_BOT_USER_ID) | .id" --jsonargs)

for i in $OLDCOMMENTS; do curl -i -H "Authorization: token $GHTOKEN" -X DELETE https://api.github.com/repos/filecoin-project/filecoin-docs/issues/comments/$i; done

echo "Post the new bot comment!"
JSONIFIED_COMMENT="$( jq -nc --arg str "$COMMENT" '{"body": $str}' )"
echo -e ">> Sending results in a comment on the Github pull request #$TRAVIS_PULL_REQUEST:"
curl -i -H "Authorization: token $GHTOKEN" \
    -H "Content-Type: application/json" \
    -X POST -d "$JSONIFIED_COMMENT" \
    https://api.github.com/repos/filecoin-project/filecoin-docs/issues/$TRAVIS_PULL_REQUEST/comments
'
