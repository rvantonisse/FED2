FAVOMO.View = (function (FAVOMO) {
	var helpers = FAVOMO.helpers,
		view = FAVOMO.view,
		View;

	function _View (name) {
		var el = helpers.el;

		this.name = name || 'mvc' + (Object.keys(view).length + 1);
		this.element = el('[data-route="' + name + '"]');
		this.model = [];
		this.directives = {};
		console.log('view.' + this.name + ' is loaded');
		return this;
	}
	_View.prototype.render = function () {
		var tr = Transparency.render,
			el = this.element,
			model = this.model,
			directives = this.directives;

			try {
				tr(el,model,directives);
			} catch (e) {
				console.log(e);
			}
	};
	View = _View;
	// give this awesome constructor
	return View;
}(FAVOMO || {}));