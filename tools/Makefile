dependencies: get-brew get-npm get-firebase get-jq get-gdate get-secret

get-brew: /usr/local/bin/brew
/usr/local/bin/brew:
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

get-npm: /usr/local/bin/npm
/usr/local/bin/npm:
	brew install node

get-firebase: /usr/local/bin/firebase
/usr/local/bin/firebase:
	npm install -g firebase-tools

get-jq: /usr/local/bin/jq
/usr/local/bin/jq:
	brew install jq

get-gdate: /usr/local/bin/gdate
/usr/local/bin/gdate:
	brew install coreutils

get-secret: ./.secret
./.secret:
	echo "IMPORTANT: Please add a .secret file with the required credentials for firebase!"
