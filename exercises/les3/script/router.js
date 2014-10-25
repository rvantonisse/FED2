// Namespaces
var MYAPP = MYAPP || {};
MYAPP.modules = MYAPP.modules || {};
MYAPP.view = MYAPP.view || {};

MYAPP.modules.router = (function (MYAPP) {
	var _renderView = MYAPP.view.render,
		_paths = [],
		_defaultPath,
		_showPath,
		_init,
		_render;

	_paths = [
		'',
		'about',
		'movies',
		'movies/:movie'
	];
	_defaultPath = _paths[1] || 'home';

	_showPath = function (path, param) {
		var defaultPath = _defaultPath;
		if (path === '') {
			path = defaultPath;
		}
		if (param !== '') {

		}
		console.log('showPath(' + path + ', ' + param + ')');
	};

	_init = function () {
		var render = _render;
		// Initiate router
		console.log('router.init()');
		render();
	};
	_render = function () {
		console.log('router.render()');
		var paths = _paths,
			showPath = _showPath,
			path,
			renderPath;
		renderPath = function (path) {
			routie(path, function(param) {
				// console.log('Param: ' + param);
				showPath(path, param || '');
			});
		};

		for(path = 0; path < paths.length; path++) {
			renderPath(paths[path]);
		}
	};

	// Export
	return {
		// stuff
		init: _init,
	};
}(MYAPP || {}));
