// Namespaces
var MYAPP = MYAPP || {};
MYAPP.modules = MYAPP.modules || {};
MYAPP.view = MYAPP.view || {};

// Start router module
MYAPP.modules.router = (function (MYAPP) {
	// Loading dependencies and declaring variables
	var _renderView = MYAPP.view.render,
		_paths = [],
		_defaultPath,
		_showPath,
		_showView = MYAPP.view.show,
		_init,
		_render;

	// These are your routes/paths
	// I chose for a more modulair approach,
	// to prevent calling routie on multiple places within the app.
	// Paths are in routie compliant format
	_paths = [
		'about',
		'movies',
		'movies/:movie',
		'' // Empty path to handle a default path later
	];
	// Default route/path. always first entry of _paths
	_defaultPath = _paths[0];

	// Initiate the router
	_init = function () {
		var render = _render;
		// Initiate router
		console.log('router.init()');
		render();
	};

	// Make the route visible on the webpage
	_showPath = function (path, param) {
		var defaultPath = _defaultPath,
			isDeepPath,
			cleanPath,
			showView = _showView;

		// Check if it is a deeper path
		isDeepPath = function (path) {
			return (path.indexOf(':') > 0);
		};
		cleanPath = function (path) {
			return path.substring(path.indexOf(':') + 1);
		};

		// use the default route
		if (path === '') {
			path = defaultPath;
		}
		// Clean the route to a view
		if (isDeepPath(path)) {
			path = cleanPath(path);
			console.log('Path: ' + path);
		}

		// A param will be set by routie when we use a dynamic path like "movies/:movie"
		// If it is not empty we can use the param to send it to the view.
		if (param !== '') {

		}

		console.log('showPath(' + path + ', ' + param + ')');
		showView(path);
	};

	// Render the paths to routie
	_render = function () {
		console.log('router.render()');
		var paths = _paths,
			showPath = _showPath,
			path,
			renderPath;
		// To render one path to routie
		renderPath = function (path) {
			console.log('renderPath(' + path +')');
			routie(path, function (param) {
				showPath(path, param || '');
			});
		};
		// paths walkthrough
		for (path = 0; path < paths.length; path++) {
			renderPath(paths[path]);
		}
	};

	// Export to the outside world into MYAPP.modules.router
	return {
		// stuff
		init: _init,
	};
}(MYAPP || {})); // Invoke the router and give it all other MYAPP modules.
