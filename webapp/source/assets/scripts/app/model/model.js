// Model
FAVOMO.app.model = (function () {
	var model = FAVOMO.model || {},
		_data;

	_data = [
		{
			talk: 'Hi, I am Model',
			name: 'Model'
		}
	];
	// do eeet
	function _Model (name) {
		this.name = name;
		this.get = function () {
			console.log(this.name + '.get()', model[name]._data);
			return model[name]._data;
		};
	}
	_Model.prototype.set = function (data) {
		console.log(this.name + '.set()',data);
		this._data = data;
	};
	// _Model.prototype.get = function () {
	// debugger;
	// 	console.log(this.name + '.get()',this._data);
	// 	return this._data;
	// };
	// reveal
	return {
		Model: _Model
	};
})();