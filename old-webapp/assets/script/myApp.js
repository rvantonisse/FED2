;(function(w, undefined) {
	'use strict';

	// Define myApp
	var rvaApp = rvaApp || {},
		reference = 'rvaApp',
		oldReference = w[reference];

	// myApp controller
	rvaApp.controller = {
		init: function() {
			// debugger;
			// console.log('controller.init()');
			rvaApp.appData.init(function() {
				// console.log('appData.init().callback');
				rvaApp.router.init();
				rvaApp.template.init();
			});
		}
	};

	// App content
	rvaApp.appData = {
		init: function(callback) {
			// console.log('appData.init(' + callback + ')');
			var self = this;

			// check if the browser supports localStorage
			if(window.localStorage) {
				// console.log('LocalStorage!');
				// Check if rvaAppDatabase is stored locally for quick loading
				if(this.isLocallyStored('rvaAppDatabase')) {
					// console.log('rvaAppDatabase is locally stored');
					this.dataBase = self.getFromLocalStorage('rvaAppDatabase');
					// Update data in the background
					this.updateLocalStorage(callback);
				} else {
					// If rvaAppDatabase is not locally stored
					this.updateLocalStorage(callback);
				}
			} else {
				// No localStorage available, load page as normal
				// console.log('No localStorage...');
				this.getData('http://dennistel.nl/movies', function(data) {
					// console.log('appData.getData().callback');
					self.dataBase = JSON.parse(data);
					callback();
				});
			}
		},
		// Update the appData
		updateLocalStorage: function(callback) {
			// console.log('updateLocalStorage()');
			var self = this;
			if(window.navigator.onLine) {
				// Dostuff
				// console.log('Connected to internet');
				this.getData('http://dennistel.nl/movies', function(data) {
					// console.log('appData.getData().callback');
					self.saveToLocalStorage('rvaAppDatabase', JSON.parse(data));
				});
			} else {
				// not online dont try to load data
				// console.log('No internet connection');
			}
			callback();
		},
		// Check for data in localStorage
		isLocallyStored: function(name) {
			// console.log('isLocallyStored(' + name + ')');
			return (window.localStorage[name] !== undefined);
		},
		/*
		** saveToLocalStorage(data)
		** Save data into localStorage
		 */
		saveToLocalStorage: function(name, data) {
			// console.log('saveToLocalStorage(' + name + ', ' + data + ')');
			window.localStorage[name] = JSON.stringify(data);
		},
		/*
		** getFromLocalStorage(data)
		** Get data from local storage
		 */
		getFromLocalStorage: function(name) {
			return JSON.parse(window.localStorage[name]);
		},
		//simple XHR request in pure JavaScript
		//https://gist.github.com/iwek/5599777
		getData: function(url, callback) {
			// console.log('appData.getData(' + url + ', ' + callback + ')');
			var xhr;

			if(typeof XMLHttpRequest !== 'undefined') {
				xhr = new XMLHttpRequest();
			} else {
				var versions = [
					"MSXML2.XmlHttp.5.0",
					"MSXML2.XmlHttp.4.0",
					"MSXML2.XmlHttp.3.0",
					"MSXML2.XmlHttp.2.0",
					"Microsoft.XmlHttp"
				];

				for(var i = 0, len = versions.length; i < len; i++) {
					try {
						xhr = new ActiveXObject(versions[i]);
						break;
					} catch(e) {}
				}
			}

			xhr.open('GET', url, true);
			xhr.onreadystatechange = function () {
				if(xhr.readyState < 4) {
					return;
				}

				if(xhr.status !== 200) {
					return;
				}

				// all is well
				if(xhr.readyState === 4) {
					callback(xhr.responseText);
				}
			};
			// Set headers?
			// Preflight?
			xhr.send();
		},
		// get all movie data from appData.views.movies and return the right movie format
		getMovies: function() {
			// console.log('appData.getMovies()');
			// console.log('This:');
			var movies = [],
				results = this.dataBase,
				niceUrl = rvaApp.helpers.niceUrl;
				// console.log(results);
			for(var result = 0; result < results.length; result++) {
				var thisMovie = results[result];
				movies[result] = {
					id: thisMovie.id,
					releaseDate: thisMovie.release_date,
					title: thisMovie.title,
					url: niceUrl(thisMovie.title),
					description: thisMovie.simple_plot,
					plot: thisMovie.plot,
					cover: thisMovie.cover
				};
			}
			// console.log('Movies:');
			// console.log(movies);
			return movies;
		},
		getMovie: function(param) {
			console.log('getMovie(' + param + ')');
			var movie = {},
				results = this.dataBase;
			console.log('Movies:', results);
			for(var result = 0; result < results.length; result++) {
				var thisMovie = results[result];
				console.log('This movie:', thisMovie);
				if(thisMovie.url === param) {
					movie = thisMovie;
				}
			}
			return movie;
		},
		dataBase: [],
		views: {
			about: {
				title: 'About FavoMo',
				description: 'This is an application showing all my favourite movies! (Yawn...)'
			},
			// actors: [],
			// directors: [],
			movies: []
		}
	};

	// Router
	rvaApp.router = {
		init: function() {
			// console.log('router.init()');
			this.render(this.paths);
		},
		paths: [
			'',
			'movies',
			'movies/:movie',
			// 'movies/actors',
			// 'movies/actors/:actor',
			// 'movies/directors',
			// 'movies/directors/:director',
			'about'
		],
		/*
		** Render method to display the triggered route
		** If path is an object with paths re-call render on each path.
		** Then run routie(path,function), calling the template.showView method on path
		** @param: path
		 */
		render: function(path) {
			console.log('router.render(' + path + ')');
			// Routie(path, fn)
			if(typeof path === 'object') {
				for(var p in path) {
					this.render(path[p]);
				}
			} else {
				// Set Default page to 'about'
				if(path === '') {
					// My default path is always the second path in router.paths
					// Let routie set the hash
					routie(this.paths[1]);
				}
				routie(path, function(param) {
					// console.log('Param: ' + param);
					rvaApp.template.showView(path, param);
				});
			}
		}
	};


	// App templating
	rvaApp.template = {
		init: function() {
			// console.log('template.init()');
			this.render(this.views);
		},
		/*
		** Views to render
		** views:
		**  element: [HTML-element]
		**  meta: [JSON data object] !Make sure this is an Array!
		**  directives: [transparency directives]
		 */
		views: {
			about: {
				title: 'about',
				element: document.querySelector('[data-route="about"]'),
				meta: function(){
					return rvaApp.appData.views.about;
				}
			},
			movies: {
				title: 'movies',
				element: document.querySelector('[data-bind="movies"]'),
				// This should be a simple referrence to appData.views.movies, but is a function instead
				// returning the value returned by appData.getMovies().
				meta: function() {
					// console.log('template.views.meta()');
					return rvaApp.appData.getMovies();
				},
				directives: {
					link: {
						href: function(params) {
							return '#movies/' + this.url;
						}
					},
					cover: {
						src: function(params) {
							return this.cover;
						},
						alt: function(params) {
							return this.title + " cover";
						}
					}
				}
			},
			movie: {
				title: 'movie',
				element: document.querySelector('[data-route="movie"]'),
				meta: function(param) {
					console.log('movie.meta(' + param + ')');
					return rvaApp.appData.getMovie(param);
				},
				directives: {}
			},
			actors: {
				title: 'actors',
				element: document.querySelector('[data-route="actors"]'),
				meta: [],
				directives: {}
			}
		},
		// Render all views with renderView()
		render: function(views) {
			console.log('template.render(' + views + ')');
			for(var view in views) {
				this.renderView(views[view]);
			}
		},
		// render one view and if view.meta is a function, execute it and store back into view.meta as data
		// Then activate transparency passing element, meta and directives
		renderView: function(view, param) {
			//console.log('template.renderView(' + view.title + ', ' + param + ')');
			//console.log('View:', view);
			//if(typeof view.meta === 'function') {
			//
				var data = view.meta(param);
			//}
			Transparency.render(view.element, data, view.directives);
		},
		// Make a view visible by adding the visible class. First remove the visible class from all views
		showView: function(route, param) {
			var views = document.querySelectorAll('section[data-route]');
			console.log('showView(' + route + ')');
			if(param) {
				console.log('With param: ' + param);
				// Clean the route to a view
				if(route.indexOf(':') > 0) {
					route = route.substring(route.indexOf(':') + 1);
					console.log('Route: ' + route);
				}
				console.log('View?', this.views[route]);
				this.renderView(this.views[route], param);
			}
			for(var view = 0; view < views.length; view++) {
				if(views[view].classList.contains('visible')) {
					views[view].classList.remove('visible');
				}
				if(views[view].dataset.route === route) {
					views[view].classList.add('visible');
				}
			}
		}
	};

	// My helpers
	rvaApp.helpers = {
		niceUrl: function(url) {
			console.log('niceUrl(' + url + ')');
			// To lowercase
			url = url.toLowerCase(url);
			// Replace space with '-'
			url = url.replace(/ /g, '-');
			return url;
		}
	};

	// My app export
	rvaApp.export = {
		movies: rvaApp.template.views.movies.meta,
		movie: rvaApp.template.views.movie.meta
	};
	w[reference] = rvaApp.export;

	// Start myApp :)
	rvaApp.controller.init();


}(this));