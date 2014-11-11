FAVOMO.view.about = (function (FAVOMO) {
	var view = new FAVOMO.View('about'),
		_path = 'about';

	function _getPath () {
		return _path;
	}
	view.getPath = _getPath;
	return view;
}(FAVOMO || {}));