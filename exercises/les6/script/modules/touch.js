// Namespace
var MYAPP = MYAPP || {};
MYAPP.modules = MYAPP.modules || {};

MYAPP.modules.touch = (function (MYAPP) {
	// Dependencies
	var _helpers = MYAPP.helpers,
		_el = _helpers.el,
		_view = MYAPP.view,

		_touch = {};

	// Movie detail page only
	_touch.swipeToMovie = new Hammer(_el('[data-route="movie"]'));
	_touch.swipeToMovie.on('swiperight swipeleft', function (ev) {
		var nextMovie = _view.nextMovie,
			prevMovie = _view.prevMovie;
		// Go to next movie
		if (ev.type === 'swipeleft') {
			nextMovie();
		}
		if (ev.type === 'swiperight') {
			prevMovie();
		}
	});


	// Reveal
	return {};
}(MYAPP || {}));