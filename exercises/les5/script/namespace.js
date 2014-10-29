var MYAPP = MYAPP || {};


/*
** namespace function from Stoyan Stefanov
** JavaScript Patterns O'Reilly 2010
** namespace(ns_string)
 */
MYAPP.define = function (namespaceString) {
	var parts = namespaceString.split('.'),
		parent = MYAPP,
		i;

	if (parts[0] === 'MYAPP') {
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