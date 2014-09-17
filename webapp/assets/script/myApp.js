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
					console.log('About section');
				},
				movies: function() {
					console.log('Movie section');
				}
			});
		}
	};


}());