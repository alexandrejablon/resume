start:
	forever start resume-app.js;

stop:
	forever stop resume-app.js

restart:
	forever restart resume-app.js

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