// Model
FavoMo.model = (function (FavoMo) {
	var model = model || {};
	// do eeet
	function _Model (name) {
		this.name = name;
	}
	_Model.prototype.set = function (data) {
		console.log(this.name + '.set()',data);
		this._data = data;
	};
	_Model.prototype.get = function () {
		console.log(this.name + '.get()',data);
		return this._data;
	};
	// reveal
	return {
		Model: _Model
	};
})(FavoMo || {});