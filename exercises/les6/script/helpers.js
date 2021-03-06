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

	// Events
	// Transitionend
	/* From Modernizr */
	function _whichTransitionEvent(){
		var t,
			el = document.createElement('fakeelement'),
			transitions = {
				'transition':'transitionend',
				'OTransition':'oTransitionEnd',
				'MozTransition':'transitionend',
				'WebkitTransition':'webkitTransitionEnd'
			};

		for (t in transitions) {
			if (el.style[t] !== undefined) {
				return transitions[t];
			}
		}
	}

	// String manipulation
	_niceUrl = function(url) {
		// console.log('niceUrl(' + url + ')');
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
		contains: _underscore.contains,
		indexOf: _underscore.indexOf,
		where: _underscore.where,
		sortBy: _underscore.sortBy,
		groupBy: _underscore.groupBy
	};

	// Export privates to public
	return {
		el: _el,
		els: _els,
		niceUrl: _niceUrl,
		transitionEnd: _whichTransitionEvent,
		arrayMethods: _arrayMethods
	};
}(MYAPP || {}));