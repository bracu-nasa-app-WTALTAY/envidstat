
--------------------------------------------------------
	SIMPLIFIED LOCAL DIRECTORY TREE					   |
--------------------------------------------------------
/
	/.git
		HEAD
		INDEX
	/machine-learning
		...
	/web
		/express-server
			/build
				/static
					/js
				_redirects
				index.html
			server.js
			package.json
		/react-client
			/public
				index.html
			/src
				/components
					/Maps
				index.js
			package.json
		TASKS.md
	.gitignore
	.gitmodules
	README.md
	LICENSE

-------------------------------------------------------
	BRANCHES WITH DESCRIPTION						  |
-------------------------------------------------------
(master)	->	Stable branch which has everything as
				mentioned in the SIMPLIFIED LOCAL
				DIRECTORY TREE. Stays in github
				
(heroku)	->	Stable branch which has all the files 
				necessary to deploy to heroku
				
(netlify)	->	Stable branch which has all the files 
				necessary to deploy to netlify

-------------------------------------------------------
	SEPERATE TREE									  |
-------------------------------------------------------

(master):

/
	/.git
		HEAD
		INDEX
	/web
		/node-server
			/build				- gitignore
				/static
					/js
				_redirects
				index.html
			server.js
			package.json
		/react-client
			/build				- gitignore
			/public
				index.html
			/src
				/components
					/Maps
				index.js
		TASKS.md
	.gitignore
	.gitmodules
	README.md
	LICENSE
	
(heroku):
/
	/build
		/static
			/js
		_redirects				- gitignore
		index.html
	server.js
	package.json
	
(netlify):
/
	/static
		/js
	_redirects	->		/*		/index.html	
	index.html

-------------------------------------------------------
	MERGED TREE										  |
-------------------------------------------------------

/																							(master /)
	/.git
		HEAD
		INDEX
	/web
		/express-server																		(heroku /)
			/build																			(netlify /)
				/static
					/js
				_redirects	->		/*		/index.html	
				index.html
			server.js
			package.json
		/react-client
			/build			->		../react-client/build
			/public
				index.html
			/src
				/components
					/Maps
				index.js
			package.json	->	"build:server" : "mv build"
		TASKS.md
	.gitignore
	.gitmodules
	README.md
	LICENSE
