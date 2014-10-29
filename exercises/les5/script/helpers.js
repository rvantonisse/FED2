// Namespacing
var MYAPP = MYAPP || {};

MYAPP.helpers = (function (MYAPP) {
	// Dependencies
	var _el,
		_els,
		_niceUrl;

	_el = function (query) {
		return document.querySelector(query);
	};
	_els = function (query) {
		return document.querySelectorAll(query);
	};
	_niceUrl = function(url) {
		console.log('niceUrl(' + url + ')');
		// To lowercase
		url = url.toLowerCase(url);
		// Replace space with '-'
		url = url.replace(/ /g, '-');
		return url;
	};

	// Export privates to public
	return {
		el: _el,
		els: _els,
		niceUrl: _niceUrl
	};
}(MYAPP || {}));