set -e
npm run build
cd docs
npm run build --production
cd dist
git init
git config user.name Gerald
git config user.email gera2ld@163.com
git add .
git commit -m 'Auto deploy to github-pages'
git push -f git@github.com:gera2ld/vueleton.git master:gh-pages
