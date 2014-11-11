FAVOMO.Controller = (function (FAVOMO) {
	var Controller,
		model = FAVOMO.model,
		view = FAVOMO.view,
		controller = FAVOMO.controller;

	function _Controller (name) {
		this.name = name || 'mvc' + (Object.keys(controller).length + 1);
		this.view = view[name].element;
		this.model = model[name];
		this.route = '';
		this.path = view[name].getPath();
		console.log('controller.' + this.name + ' is loaded');
		return this;
	}
	_Controller.prototype.init = function () {
		_route(this.path);

	};
	function _route (path) {
		console.log(this.name + '.route(' + path + ')');
		var showView = _showView;
		routie(path, function (param) {
			showView(path,param);
		});
	}
	function _showView (path, param) {
		console.log(this.name + '.showView(' + path + ', ' + param + ')');
	}
	Controller = _Controller;

	return Controller;
}(FAVOMO || {}));