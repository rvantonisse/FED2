// Controller
FavoMo.controller = (function (FavoMo) {
	var controller = controller || {},
		_view = FavoMo.view,
		_model = FavoMo.model;
	// do eeet
	function _Controller (name) {
		this.name = name;
		this.model = _model[name] || name + ' model';
		this.view = _view[name] || name + ' view';
	}

	controller.movies = new _Controller('movies');
	console.log(movies.name);

	return {
		init: _init
	};
})(FavoMo || {});