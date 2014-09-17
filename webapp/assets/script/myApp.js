(function() {
	'use strict';

	// Define myApp
	var myApp = myApp || {};

	// myApp controller
	myApp.controller = {
		foo: 'bar',
		init: function() {
			myApp.router.init();
		}
	};

	myApp.router = {
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
	// Start myApp :)
	myApp.controller.init();

}());