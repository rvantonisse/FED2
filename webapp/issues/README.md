# Issue tracking

Format:

	title
	date reported / date solved if so
	description
	status: solved/unsolved
	solution

## Issues

### Rendering of imported movie data into page

	Reported: 08/10/2014
	status: unsolved
	description:
		Need help with rendering the imported data with __appData.getData()__ and set into __appData.views.movies__. Initially __appData.views.movies__ is set to be an empty object. As the data gets loaded, the callback function should set the data as object into __appData.views.movies__. With __appData.getMovies()__ called by __template.views.movies.meta__ I want to reset the data into another data format and return it back to __template.views.movies.meta__ when it is used by __template.renderView__. I have exported __template.views.movies.meta__ as __window.rvaApp.movies__, this will generate the right data, but it is not rendered right into the movies pageview.

### myApp.js rvaApp.router.render() using function from rvaApp.template.toggle()

	Reported: 24/09/14
	Status: solved 01/10/14
	Sollution:
		Use a function call instead of creating one in the for-loop. I have passed the wrong values as "path" in router.render. When "path" is an object I had to pass "path[p]" instead of just "p".


__Description__
I am trying to use the router [Routie](http://projects.jga.me/routie/) in combination with template engine [Transparency](https://github.com/leonidas/transparency). I have both declared in separate objects and I am trying to let them do stuff together:
When a hash like `#about` appears in the adressbar Routie should render that and make an action happen. This action is defined in my template object as a function; toggle(). Simply put: when pressing a link "about", Routie should activate `rvaApp.template.toggle('about')`
The code:

	// Router module
	rvaApp.router = {
		init: function() {
			this.render(this.paths);
		},
		paths: [
			'about',
			'movies'
		],
		render: function(path) {
			// Routie(path, fn)
			var fn = rvaApp.template.toggle;
			console.log(typeof fn + ': ');
			console.log(fn);
			if(typeof path === 'object') {
				console.log('Router render: path is an object');
				for(var p in path) {
					console.log('path[' + p + ']: ' + path[p]);
					this.render(p);
				}
			} else {
				console.log('Router render: path is a(n) ' + typeof path);
				routie(path, function() {
					fn(path);
				});
			}
		}
	};

	// App template
	rvaApp.template = {
		init: function() {
			this.views.about();
			this.views.movies();
		},
		views: {
			about: function() {
				var meta = rvaApp.pageContent.about;
				Transparency.render(document.querySelector('[data-route="about"]'),meta);
			},
			movies: function() {
				var movies = rvaApp.pageContent.movies;
				var directives = {
					cover: {
						src: function(params) {
							return this.cover;
						},
						alt: function(params) {
							return this.title + " cover";
						}
					}
				};
				Transparency.render(document.querySelector('[data-bind="movies"]'), movies, directives);
			}
		},
		toggle: function(route) {
			console.log('Route: ' + route);
			var views = document.querySelectorAll('section[data-route]');
			console.log('Views:');
			for(var view = 0; view < views.length; view++) {
				console.log(views[view]);
				if(views[view].classList.contains('visible')) {
					views[view].classList.remove('visible');
				}
				if(views[view].dataset.route === route) {
					views[view].classList.add('visible');
				}
			}
		}
	};
