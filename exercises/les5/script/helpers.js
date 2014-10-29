// Namespacing
var MYAPP = MYAPP || {};

MYAPP.helpers = (function (MYAPP) {
	// Dependencies
	var _underscore = _,
		_arrayMethods = {},
		_el,
		_els,
		_niceUrl;

	// DOM selecting
	_el = function (query) {
		return document.querySelector(query);
	};
	_els = function (query) {
		return document.querySelectorAll(query);
	};

	// String manipulation
	_niceUrl = function(url) {
		console.log('niceUrl(' + url + ')');
		// To lowercase
		url = url.toLowerCase(url);
		// Replace space with '-'
		url = url.replace(/ /g, '-');
		return url;
	};

	// Array helper functions from underscore.js
	_arrayMethods = {
		map: _underscore.map,
		reduce: _underscore.reduce,
		filter: _underscore.filter,
		where: _underscore.where,
		sortBy: _underscore.sortBy,
		groupBy: _underscore.groupBy
	};

	// Export privates to public
	return {
		el: _el,
		els: _els,
		niceUrl: _niceUrl,
		arrayMethods: _arrayMethods
	};
}(MYAPP || {}));