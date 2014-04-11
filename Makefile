start:
	forever -o out.log -e err.log start resume-app.js

stop:
	forever stop resume-app.js

restart:
	forever -o out.log -e err.log restart resume-app.js -l log.log -o out.log -e err.log

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