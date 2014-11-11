FAVOMO.Model = (function (FAVOMO) {
	var Model,
		model = FAVOMO.model;

	function _Model (name, data) {
		this.name = name || 'mvc' + (Object.keys(model).length + 1);
		this.data = data || [];
		console.log('model.' + this.name + ' is loaded');
		return this;
	}
	// Prototypes?
	// Get model data?
	// Set model data?
	Model = _Model;

	return Model;
}(FAVOMO || {}));