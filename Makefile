start:
	forever start app.js;

stop:
	forever stop app.js

list:
	forever list;

restart: stop start

.PHONY: start stop list restart