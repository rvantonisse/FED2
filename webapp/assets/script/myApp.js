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

	rvaApp.content = {
		about: [
			title = "About this app",
			description = "Some random gibberish text... Totally not about this application."
			],
		movies: [
			{
				title: "Shawshank Redemption",
				releaseDate: "",
				description: "",
				cover: ""
			},
			{
				title: "The Godfather",
				releaseDate: "",
				description: "",
				cover: ""
			},
			{
				title: "Pulp Fiction",
				releaseDate: "",
				description: "",
				cover: "assets/content/movies/images/pulp-fiction.jpg"
			}]
	};
	// Start myApp :)
	rvaApp.controller.init();

}());