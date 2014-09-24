(function() {
	'use strict';

	// Define myApp
	var rvaApp = rvaApp || {};

	// myApp controller
	rvaApp.controller = {
		init: function() {
			rvaApp.router.init();
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
		about: ["title", "description"],
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

	// Start myApp :)
	rvaApp.controller.init();

}());