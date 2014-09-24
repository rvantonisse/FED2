;(function() {
	'use strict';

	// Define myApp
	var rvaApp = rvaApp || {};

	// myApp controller
	rvaApp.controller = {
		init: function() {
			rvaApp.router.init();
			rvaApp.sections.init();
		}
	};

	// Router module
	rvaApp.router = {
		init: function() {
			routie({
				about: function() {
					// Do stuff when #about is triggered
					console.log('About section');
				},
				movies: function() {
					// Do stuff when #movies is triggered
					console.log('Movie section');
				}
			});
		}
	};

	// App content
	rvaApp.content = {
		about: {
			title: "about my app",
			description: "description of my app"
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
	rvaApp.sections = {
		init: function() {
			rvaApp.sections.about();
			rvaApp.sections.movies();
		},
		about: function() {
			var about = rvaApp.content.about;
			Transparency.render(document.querySelector('[data-route="about"]'),about);
		},
		movies: function() {
			var movies = rvaApp.content.movies;
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
			Transparency.render(document.querySelector('[data-route="movies"]'), movies, directives);
		}
	};

	// Start myApp :)
	rvaApp.controller.init();

}());