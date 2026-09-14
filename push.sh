#!/bin/bash
rm -f .git/HEAD.lock .git/index.lock
git add public/index.html
git commit -m "${1:-update}"
git push origin main
