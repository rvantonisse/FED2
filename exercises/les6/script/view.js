// Namespace the app
var MYAPP = MYAPP || {};
// MYAPP.model = MYAPP.model || {};

MYAPP.view = (function (MYAPP) {
	// Dependencies
	var _helpers = MYAPP.helpers,
		_el = _helpers.el,
		_els = _helpers.els,
		_niceUrl = _helpers.niceUrl,
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
					},
					genres: {
						genre: {
							text: function () {
								return this.value;
							},
							href: function () {
								return '#movies/genre/' + _niceUrl(this.value);
							},
						}
					},
					link: {
						text: function (params) {
							return params.value + ' ' + this.title;
						},
						href: function (params) {
							return params.value + 'movies/' + this.url;
						}
					},
					description: {
						text: function (params) {
							return this.description + ' ' + params.value;
						}
					},
					reviewScore: {
						text: function (params) {
							return params.value + this.reviewScore;
						}
					}
				}
			}
		},
		movie: {
			title: 'movie',
			element: _el('[data-route="movie"]'),
			model: _models.movie,
			directives: {
				title: {
					text: function (params) {
						return this.content.title;
					}
				},
				content: {
					cover: {
						src: function (params) {
							return this.cover;
						},
						alt: function (params) {
							return this.title + ' cover';
						}
					},
					genres: {
						genre: {
							text: function () {
								return this.value;
							},
							href: function () {
								return '#movies/genre/' + _niceUrl(this.value);
							},
						}
					},
					link: {
						text: function (params) {
							return params.value + ' ' + this.title;
						},
						href: function (params) {
							return params.value + 'movies/' + this.url;
						}
					},
					plot: {
						text: function (params) {
							return this.plot + ' ' + params.value;
						}
					},
					reviewScore: {
						text: function (params) {
							return params.value + this.reviewScore;
						}
					}
				}
			}
		},
		genre: {
			title: 'genre',
			element: _el('[data-route="genre"]'),
			model: _models.genre,
			directives: {
				title: {
					text: function (params) {
						return 'My favourite ' + this.title + ' movies';
					}
				},
				content: {
					cover: {
						src: function (params) {
							return this.cover;
						},
						alt: function (params) {
							return this.title + ' cover';
						}
					},
					genres: {
						genre: {
							text: function () {
								return this.value;
							},
							href: function () {
								return '#movies/genre/' + _niceUrl(this.value);
							},
						}
					},
					link: {
						text: function (params) {
							return params.value + ' ' + this.title;
						},
						href: function (params) {
							return params.value + 'movies/' + this.url;
						}
					},
					description: {
						text: function (params) {
							return this.description + ' ' + params.value;
						}
					},
					reviewScore: {
						text: function (params) {
							return params.value + this.reviewScore;
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
		_toggleLoader('off');
		for (view in views) {
			render(views[view].title);
		}
	};
	function _toggleLoader (state) {
		var loader = _el('[data-bind="loader"]'),
			on = 'loader-on',
			off = 'loader-off';
		if (state === 'on') {
			loader.classList.remove('hidden');
			setTimeout(function () {
				loader.classList.remove(off);
				loader.classList.add(on);
			},100);
		}
		if (state === 'off') {
			loader.classList.remove(on);
			loader.classList.add(off);
			setTimeout(function () {
				loader.classList.add('hidden');
			},500);
		}
	}
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
	_show = function (view, param) {
		console.log('view.show(' + view + ')');
		var i,
			viewEls = _els('.page'),
			render = _render,
			setGenre = MYAPP.model.setGenre,
			setMovie = MYAPP.model.setMovie,
			setMovies = MYAPP.model.setMovies,
			transitionEnd = _helpers.transitionEnd();

		function toggleVisibility (el) {
			console.log('toggleVisibility(' + el.dataset.route + ')');
			if (el.classList.contains('hidden')) {
				el.classList.remove('hidden');
				setTimeout(function () {
					transform(el);
				},100);
			} else {
				transform(el);
				el.classList.add('hidden');
			}
		}

		function transform (el) {
			console.log('transform(' + el.dataset.route + ')');
			if (el.classList.contains('transformed')) {
				el.classList.remove('transformed');
			} else {
				el.classList.add('transformed');
			}
		}
		// Set / render pages first before showing them
		if (view === 'genre') {
			setGenre(param);
		}
		if (view === 'movie') {
			setMovie(param);
		}
		if (view === 'movies') {
			setMovies();
		}
		render(view);
		// Make other views disappear and the requested view appear
		for (i = 0; i < viewEls.length; i++) {
			var thisViewEl = viewEls[i],
				thisRoute = viewEls[i].dataset.route;

			// Hide all views
			if (!thisViewEl.classList.contains('hidden')) {
				toggleVisibility(thisViewEl);
			}
			if (view === thisRoute && thisViewEl.classList.contains('hidden')) {
				toggleVisibility(thisViewEl);
				window.scrollTo(0,0); // Return to the top of the page
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