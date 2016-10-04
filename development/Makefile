default: prod

dev:
	webpack --watch --progress --colors

serve:
	cd dist && serve

prod:
	webpack -p --config webpack.config.prod.js --progress --colors

publish:
	cd ../public && cp index.html 200.html && surge
