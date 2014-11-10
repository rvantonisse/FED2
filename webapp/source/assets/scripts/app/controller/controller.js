// Controller
FAVOMO.controller = (function () {
	var controller = controller || {},
		_view = FAVOMO.view,
		_model = FAVOMO.model;
	// do eeet
	function _Controller (name) {
		this.name = name;
		this.model = _model[name] || name + ' model';
		this.view = _view[name] || name + ' view';
	}

	function _init () {
		// Init? init?! INNIT?!!
	}
	return {
		init: _init
	};
})();