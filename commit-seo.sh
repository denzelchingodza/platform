#!/bin/bash
# Run this from ~/platform after removing lock files:
#   rm -f ~/platform/.git/index.lock ~/platform/.git/HEAD.lock
# Then: bash ~/platform/commit-seo.sh

set -e
cd "$(dirname "$0")"

git add public/index.html
git commit -m "seo: add canonical URL"

git add public/index.html
git commit -m "seo: add Open Graph and Twitter Card meta tags"

git add public/favicon.svg public/index.html
git commit -m "seo: add favicon SVG and theme-color meta"

git add public/index.html
git commit -m "seo: add Person JSON-LD structured data"

git add public/robots.txt
git commit -m "seo: add robots.txt"

git add public/sitemap.xml
git commit -m "seo: add sitemap.xml"

git add public/llms.txt
git commit -m "seo: add llms.txt for AI crawlers"

git add public/404.html
git commit -m "seo: add custom 404.html"

git add public/og-image.png
git commit -m "seo: add og-image.png social preview"

git add public/index.html
git commit -m "nav: remove DC logo, add scramble hover effect on links"

echo ""
echo "Done — $(git log --oneline -12 | wc -l) recent commits:"
git log --oneline -12
echo ""
echo "Now push: git push"
