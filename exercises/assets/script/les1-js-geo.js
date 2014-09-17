var myGeoApp = (function() {
	'use strict';

	/*
	** GPS object
	 */
	var gps = {
		init: function() {
			debug_message("Controleer of GPS beschikbaar is...");

			ET.addListener(GPS_AVAILABLE, _start_interval);
			ET.addListener(GPS_UNAVAILABLE, function(){debug_message('GPS is niet beschikbaar.')});

			(geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);

		},
		startInterval: function() {},
		coords: {
			update: function() {},
			set: function() {}
		},

	};

	/*
	** MAPPING
	 */
	var map = {
		generate: function() {},
		position: {
			update: function() {},
		}
	};

	/*
	** HELPER
	 */
	var helper = {
		isNumber: function() {}
	};

	/*
	** DEBUGGING
	*/
	var debug = {};

}());