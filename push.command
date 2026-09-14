#!/bin/bash
cd "$(dirname "$0")"
rm -f .git/HEAD.lock .git/index.lock
git add public/index.html
git commit -m "fix: annotations via rAF + setAttribute, no CSS animation"
git push
echo ""
echo "Done. Press any key to close."
read -n 1
