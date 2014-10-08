;(function(w, undefined) {
	'use strict';

	// Define myApp
	var rvaApp = rvaApp || {},
		reference = 'rvaApp',
		oldReference = w[reference];

	// myApp controller
	rvaApp.controller = {
		init: function() {
			console.log('Initiating app:');
			rvaApp.appData.getData('http://dennistel.nl/movies', function(data) {
				rvaApp.appData.views.movies = JSON.parse(data);
				console.log('movies after loading data');
				console.log(rvaApp.appData.views.movies);
				rvaApp.router.init();
				rvaApp.template.init();
			});
		}
	};

	// Router
	rvaApp.router = {
		init: function() {
			this.render(this.paths);
		},
		paths: [
			'',
			'about',
			'movies'
		],
		/*
		** Render method to display the triggered route
		** If path is an object with paths re-call render on each path.
		** Then run routie(path,function), calling the template.showView method on path
		** @param: path
		 */
		render: function(path) {
			// Routie(path, fn)
			if(typeof path === 'object') {
				for(var p in path) {
					this.render(path[p]);
				}
			} else {
				// Set Default page to 'about'
				if(path === '') {
					routie(this.paths[1]);
				}
				routie(path, function() {
					rvaApp.template.showView(path);
				});
			}
		}
	};

	// App content
	rvaApp.appData = {
		//simple XHR request in pure JavaScript
		//https://gist.github.com/iwek/5599777
		getData: function(url, callback) {
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
		setData: function(data, target) {
			console.log('Setting data');
			console.log('Target before:');
			console.log(target);
			target = data;
			console.log('Target after:');
			console.log(rvaApp.appData.views.movies);
		},
		getMovies: function() {
			console.log('Getting movies...');
			var movies = {},
				results = rvaApp.appData.views.movies;
				console.log(results);
			for(var result = 0; result < results.length; result++) {
				var thisMovie = results[result];
				movies[result] = {
					id: thisMovie.id,
					releaseDate: thisMovie.release_date,
					title: thisMovie.title,
					description: thisMovie.simple_plot,
					plot: thisMovie.plot,
					cover: thisMovie.cover
				};
			}
			console.log('this are the movies:');
			console.log(movies);
			return movies;
		},
		views: {
			about: {
				title: 'About FavoMo',
				description: 'This is an application showing all my favourite movies! (Yawn...)'
			},
			movies: {}
		}
	};

	// App templating
	rvaApp.template = {
		init: function() {
			this.render(this.views);
		},
		/*
		** Views to render
		** views:
		**  element: [HTML-element]
		**  meta: [JSON data object]
		**  directives: [transparency directives]
		 */
		views: {
			about: {
				title: 'about',
				element: document.querySelector('[data-route="about"]'),
				meta: rvaApp.appData.views.about
			},
			movies: {
				title: 'movies',
				element: document.querySelector('[data-bind="movies"]'),
				meta: rvaApp.appData.getMovies(),
				directives: {
					cover: {
						src: function(params) {
							return this.cover;
						},
						alt: function(params) {
							return this.title + " cover";
						}
					}
				}
			}
		},
		// Render all views
		render: function(views) {
			for(var view in views) {
				this.renderView(views[view]);
			}
		},
		// render one view
		renderView: function(view) {
			Transparency.render(view.element, view.meta, view.directives);
		},
		// getView(string); Search for a view in the template.views
		getView: function(view) {
			return this.views[view];
		},
		showView: function(route) {
			console.log('Route: ' + route);
			var views = document.querySelectorAll('section[data-route]');
			// console.log('Views:');
			for(var view = 0; view < views.length; view++) {
				// console.log(views[view]);
				if(views[view].classList.contains('visible')) {
					views[view].classList.remove('visible');
				}
				if(views[view].dataset.route === route) {
					views[view].classList.add('visible');
				}
			}
		}
	};
	// My app export
	rvaApp.export = {
		movies: rvaApp.template.views.movies.meta
	};
	w[reference] = rvaApp.export;

	// Start myApp :)
	rvaApp.controller.init();


}(this));