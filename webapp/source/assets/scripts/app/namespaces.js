var FAVOMO = (function () {
	var namespaces = {};
	namespaces._namespace = function (namespaceString) {
		var parts = namespaceString.split('.'),
			parent = namespaces,
			i;

		if (parts[0] === 'namespaces') {
			parts = parts.slice(1);
		}

		for (i = 0; i < parts.length; i++) {
			if (typeof parent[parts[i]] === 'undefined') {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};

	// call the namespaces
	namespaces._namespace('helpers');
	namespaces._namespace('app.model');
	namespaces._namespace('app.view');
	namespaces._namespace('app.controller');

	// No more need for the _namespace method
	delete namespaces._namespace;
	// Reveal
	return namespaces;

})();