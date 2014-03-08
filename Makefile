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
	npm install; npm install mocha forever gulp -g;

build:
	gulp build

init:
	cp conf.js.tpl conf.js

.PHONY: start stop restart list test install build init