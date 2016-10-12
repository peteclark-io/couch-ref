dependencies: brew npm firebase jq gdate secret

brew: /usr/local/bin/brew
/usr/local/bin/brew:
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

npm: /usr/local/bin/npm
/usr/local/bin/npm:
	brew install node

firebase: /usr/local/bin/firebase
/usr/local/bin/firebase:
	npm install -g firebase-tools

jq: /usr/local/bin/jq
/usr/local/bin/jq:
	brew install jq

gdate: /usr/local/bin/gdate
/usr/local/bin/gdate:
	brew install coreutils

secret: ./.secret
./.secret:
	echo "IMPORTANT: Please add a .secret file with the required credentials for firebase!"
