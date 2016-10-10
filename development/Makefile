default: dev

dev: pre-steps dependencies webpack serve

pre-steps: /usr/local/bin/webpack
/usr/local/bin/webpack:
	npm install -g webpack

dependencies: ./node_modules
./node_modules: ./package.json
	npm install

webpack:
	webpack --watch --progress --colors &

serve:
	node server.js
	open http://localhost:9000/

prod:
	webpack -p --config webpack.config.prod.js --progress --colors

publish:
	cd ../public && cp index.html 200.html && surge
