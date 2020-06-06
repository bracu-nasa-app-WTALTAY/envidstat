
--------------------------------------
	SIMPLIFIED LOCAL DIRECTORY TREE					   
--------------------------------------

```css
/
	/.git
		HEAD
		INDEX
	/machine-learning
		/Data cleaning_pulling
		/Dataset
		/Get weather prediction
		/Model
		/Side Datasets
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
```

-------------------------------------------------------
	BRANCHES WITH DESCRIPTION
-------------------------------------------------------

```text
(master)			->	Stable branch which has everything as
						mentioned in the SIMPLIFIED LOCAL
						DIRECTORY TREE. Stays in github
				
(express-server)	->	Stable branch which has all the files 
						necessary to deploy to heroku
				
(netlify)			->	Stable build directory from
						(express-server) which has all the
						files necessary to deploy to netlify
```

-------------------------------------------------------
	SEPERATE TREE
-------------------------------------------------------

```css
(master):

/
	/.git
		HEAD
		INDEX
	/machine-learning
		/Data cleaning_pulling
		/Dataset
		/Get weather prediction
		/Model
		/Side Datasets
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
	
(express-server):
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

```

-------------------
	MERGED TREE										  
-------------------

```css
/								(master /)
	/.git
		HEAD
		INDEX
	/machine-learning
		/Data cleaning_pulling
		/Dataset
		/Get weather prediction
		/Model
		/Side Datasets
	/web
		/express-server			(express-server /)
			/build				(netlify /)
				/static
					/js
				_redirects	->	(/*		/index.html	
				index.html						*/
			server.js
			package.json
		/react-client
			/build			->	../react-client/build
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
```