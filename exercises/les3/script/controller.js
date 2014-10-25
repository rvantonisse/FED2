var MYAPP = MYAPP || {};
MYAPP.modules = MYAPP.modules || {};

MYAPP.controller = (function (MYAPP) {
	// Dependencies and private
	var _model = MYAPP.model,
		_modules = MYAPP.modules,
		_router = _modules.router,
		_template = _modules.template;

	var init = function () {
		// Initiate stuff
		console.log('controller.init()');
		_router.init();
	};

	// Reveal controller object
	return {
		init: init
	};
}(MYAPP || {}));
