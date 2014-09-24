;(function() {
	'use strict';

	// Define myApp
	var rvaApp = rvaApp || {};

	// myApp controller
	rvaApp.controller = {
		init: function() {
			rvaApp.router.init();
			rvaApp.template.init();
		}
	};

	// Router module
	rvaApp.router = {
		init: function() {
			this.render(this.paths);
		},
		paths: [
			'about',
			'movies'
		],
		render: function(path) {
			// Routie(path, fn)
			if(typeof path === 'object') {
				for(var p in path) {
					this.render(path[p]);
				}
			} else {
				console.log(path);
				routie(path, function() {
					rvaApp.template.toggle(path);
				});
			}
		}
	};

	// App content
	rvaApp.pageContent = {
		about: {
			title: "About FavoMo",
			description: "This is an application showing all my favourite movies! (Yawn...)"
		},
		movies: [
			{
				title: "Shawshank Redemption",
				releaseDate: "14 October 1994",
				description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
				cover: "assets/content/movies/images/shawshank-redemption.jpg"
			},
			{
				title: "The Godfather",
				releaseDate: "24 March 1972",
				description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
				cover: "assets/content/movies/images/the-godfather.jpg"
			},
			{
				title: "Pulp Fiction",
				releaseDate: "14 October 1994",
				description: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
				cover: "assets/content/movies/images/pulp-fiction.jpg"
			}]
	};

	// App templating
	rvaApp.template = {
		init: function() {
			this.views.about();
			this.views.movies();
		},
		views: {
			about: function() {
				var meta = rvaApp.pageContent.about;
				Transparency.render(document.querySelector('[data-route="about"]'),meta);
			},
			movies: function() {
				var movies = rvaApp.pageContent.movies;
				var directives = {
					cover: {
						src: function(params) {
							return this.cover;
						},
						alt: function(params) {
							return this.title + " cover";
						}
					}
				};
				Transparency.render(document.querySelector('[data-bind="movies"]'), movies, directives);
			}
		},
		// Render all views
		render: function(views) {
			Transparency.render(selector,content,directives);
		},
		toggle: function(route) {
			console.log('Route: ' + route);
			var views = document.querySelectorAll('section[data-route]');
			console.log('Views:');
			for(var view = 0; view < views.length; view++) {
				console.log(views[view]);
				if(views[view].classList.contains('visible')) {
					views[view].classList.remove('visible');
				}
				if(views[view].dataset.route === route) {
					views[view].classList.add('visible');
				}
			}
		}
	};

	// Start myApp :)
	rvaApp.controller.init();

}());