#!/usr/bin/env bash
export NODE_ENV=$1;
export GMAIL_PASSWORD=$2;

set -e

echo -e '--> Initializing application...\n';

echo -e '--> Installing dependencies...\n';

#npm install;
#npm install mocha nodemon gulp -g;

echo -e '--> Creating the config file...\n';

cp config.js.tpl config.js

echo -e '--> Building front-end unicorns...\n';

#gulp build

echo -e '--> Done.\n'

echo -e '--> Starting application...\n';

nodemon server.js

