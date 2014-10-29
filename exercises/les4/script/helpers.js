// Namespacing
var MYAPP = MYAPP || {};

MYAPP.helpers = (function (MYAPP) {
	// Dependencies
	var _el,
		_els;
	_el = function (query) {
		return document.querySelector(query);
	};
	_els = function (query) {
		return document.querySelectorAll(query);
	};
	// Export privates to public
	return {
		el: _el,
		els: _els
	};
}(MYAPP || {}));