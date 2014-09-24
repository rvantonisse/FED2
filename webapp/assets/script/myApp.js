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
					rvaApp.sections.toggle();
				},
				movies: function() {
					// Do stuff when #movies is triggered
					console.log('Movie section');
					rvaApp.sections.toggle();
				}
			});
		}
	};

	// App content
	rvaApp.content = {
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
			Transparency.render(document.querySelector('[data-bind="movies"]'), movies, directives);
		},
		toggle: function(route) {
			console.log("Section toggle: ");
/*			console.log(this);
			var sections = this;
			for(var section in sections) {
				console.log("looping through sections");
				console.log(section);
				if(!section.classList.contains('visible') && section !== route) {
					section.classList.remove('visible');
				} else {
					section.classList.add('visible');
				}
			}
*/		}
	};

	// Start myApp :)
	rvaApp.controller.init();

}());