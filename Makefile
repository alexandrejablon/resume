start:
	forever start app.js;

stop:
	forever stop app.js

restart: stop start

list:
	forever list;

test:
	mocha --ui bdd -R spec

install:
	npm install; npm install mocha forever -g;

.PHONY: start stop list restart test