var MYAPP = MYAPP || {};
MYAPP.modules = MYAPP.modules || {};
MYAPP.model = MYAPP.model || {};
MYAPP.view = MYAPP.view || {};

MYAPP.controller = (function (MYAPP) {
	// Dependencies
	var _model = MYAPP.model,
		_modules = MYAPP.modules,
		_router = _modules.router,
		_view = MYAPP.view,
		_init;

	_init = function () {
		console.log('controller.init()');
		var router = _router,
			view = _view,
			model = _model;

		// Initiate stuff
		console.log('controller.init()');
		model.init(function () {
			router.init();
			view.init();
		});
	};



	// Reveal controller object
	return {
		init: _init
	};
}(MYAPP || {}));
