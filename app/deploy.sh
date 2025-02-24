echo "Switching to master branch"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server"
scp -r build/* root@104.237.146.170:/var/www/retrogr.am/

echo "Done!"