start:
	forever start app.js;

stop:
	forever stop app.js

list:
	forever list;

test:
	mocha --ui bdd -R spec

restart: stop start

.PHONY: start stop list restart test