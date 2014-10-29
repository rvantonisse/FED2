// Namespace the app
var MYAPP = MYAPP || {};
// MYAPP.model = MYAPP.model || {};

MYAPP.view = (function (MYAPP) {
	// Dependencies
	var _helpers = MYAPP.helpers,
		_el = _helpers.el,
		_els = _helpers.els,
		_views,
		_init,
		_render,
		_show,
		_models = MYAPP.model.pages;

	// Views in transparency format
	_views = {
		about: {
			title: 'about',
			element: _el('[data-route="about"]'),
			model: _models.about,
			directives: {}
		},
		movies: {
			title: 'movies',
			element: _el('[data-route="movies"]'),
			model: _models.movies,
			directives: {
				content: {
					cover: {
						src: function (params) {
							return this.cover;
						},
						alt: function (params) {
							return this.title + ' cover';
						}
					}
				}
			}
		}
	};
	// Initiate view
	_init = function () {
		console.log('view.init()');
		var render = _render,
			views = _views,
			view;

		for (view in views) {
			render(views[view].title);
		}
	};
	// Render a view
	_render = function (view) {
		console.log('view.render(' + view + ')');
		// dependencies
		var tr = Transparency.render,
			thisView = _views[view],
			element = thisView.element,
			model = thisView.model,
			directives = thisView.directives;

		tr(element,model,directives);
	};
	// Only show the passed view
	_show = function (view) {
		console.log('view.show(' + view + ')');
		var i,
			views = _els('[data-route]');

		// Make the view appear and make other views disappear
		for (i = 0; i < views.length; i++) {
			var thisClassList = views[i].classList,
				css = 'visible',
				thisRoute = views[i].dataset.route;
			// Check if thisClasslist contains the css and if thisRoute is not the view to be shown
			if (thisClassList.contains(css) && thisRoute !== view) {
				thisClassList.remove(css);
			}
			// Add the css to thisClassList if thisRoute is the view to be shown
			else if (thisRoute === view) {
				thisClassList.add(css);
			}
		}
	};
	// Export privates to the public
	return {
		init: _init,
		render: _render,
		show: _show
	};
}(MYAPP || {}));