// Namespace the app
var MYAPP = MYAPP || {};

MYAPP.model = (function (MYAPP) {
	// Dependencies and variable initiation
	var _helpers = MYAPP.helpers,
		_arrayHelpers = _helpers.arrayMethods,
		_appData,
		_init,
		_getJSON,
		_setLocalStorage,
		_getLocalStorage,
		_isLocalStorage,
		_updateLocalStorage,
		_setMovies,
		_getMovies;

	// All app data
	_appData = {
		database: [],
		pages: {
			about: {
				title: 'About this app',
				content: [
					{ text: 'Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let\'s get him some rocks. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. bruce... i\'m god. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can\'t now, being dead and all. rehabilitated? well, now let me see. you know, i don\'t have any idea what that means. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. rehabilitated? well, now let me see. you know, i don\'t have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can\'t now, being dead and all.'},
					{ text: 'I did the same thing to gandhi, he didn\'t eat for three weeks. bruce... i\'m god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i\'m god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn\'t eat for three weeks.'},
					{ text: 'Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy.'},
					{ text: 'That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn\'t eat for three weeks. the man likes to play chess; let\'s get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. i don\'t think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world.'}
				]
			},
			movies: {
				title: 'My favourite movies',
				content: []
			},
			movie: {
				title: 'movie',
				content: []
			},
			genre: {
				title: 'genre',
				content: [{}]
			}
		}
	};
	_init = function (callback) {
		var getJSON = _getJSON,
			isLocalStorage = _isLocalStorage,
			updateLocalStorage = _updateLocalStorage,
			getLocalStorage = _getLocalStorage,
			setDatabase = _setDatabase,
			setMovies = _setMovies;

		// check if the browser supports localStorage
		if(window.localStorage) {
			// console.log('LocalStorage!');
			// Check if _appData is stored locally for quick loading
			if(isLocalStorage('MYAPPMovies')) {
				// console.log('rvaAppDatabase is locally stored');
				setDatabase(getLocalStorage('MYAPPMovies'));
				// Update data in the background
				updateLocalStorage(function () {
					setDatabase(getLocalStorage('MYAPPMovies'));
					setMovies();
					callback();
				});
			} else {
				// If rvaAppDatabase is not locally stored retrieve the data and store it locally
				updateLocalStorage(function () {
					setDatabase(getLocalStorage('MYAPPMovies'));
					setMovies();
					callback();
				});
			}
		} else {
			// No localStorage available, load page as normal
			// console.log('No localStorage...');
			getJSON('http://dennistel.nl/movies', function(data) {
				// console.log('appData.getData().callback');
				setDatabase(data);
				callback();
			});
		}
	};
	// xhr function
	_getJSON = function (url, callback) {
		console.log('model.getData(' + url + ', ' + callback + ')');
		var xhr,
			versions,
			i;
		// Compatibillity with IE / legacy browsers
		if(typeof XMLHttpRequest !== 'undefined') {
			xhr = new XMLHttpRequest();
		} else {
			versions = [
				"MSXML2.XmlHttp.5.0",
				"MSXML2.XmlHttp.4.0",
				"MSXML2.XmlHttp.3.0",
				"MSXML2.XmlHttp.2.0",
				"Microsoft.XmlHttp"
			];

			for(i = 0; i < versions.length; i++) {
				try {
					xhr = new ActiveXObject(versions[i]);
					break;
				} catch(e) {}
			}
		}

		xhr.open('GET', url, true);
		xhr.onreadystatechange = function () {
			if(xhr.readyState < 4) {
				return;
			}

			if(xhr.status !== 200) {
				return;
			}

			// all is well
			if(xhr.readyState === 4) {
				callback(JSON.parse(xhr.responseText));
			}
		};
		// Set headers?
		// Preflight?
		xhr.send();
	};

	// Update the appData
	_updateLocalStorage = function(callback) {
		var getJSON = _getJSON,
			setLocalStorage = _setLocalStorage;
		console.log('updateLocalStorage()');
		if(window.navigator.onLine) {
			// console.log('Connected to internet');
			getJSON('http://dennistel.nl/movies', function(data) {
				// console.log('appData.getData().callback');
				setLocalStorage('MYAPPMovies', data);
				callback();
			});
		} else {
			// not online do not load data
			console.log('No internet connection');
			callback();
		}
	};

	// Check for data in localStorage
	_isLocalStorage = function(name) {
		console.log('isLocallyStored(' + name + ')');
		return (window.localStorage[name] !== undefined);
	};
	/*
	** _setLocalStorage(data)
	** Save data into localStorage
	 */
	_setLocalStorage = function(name, data) {
		console.log('setLocalStorage(' + name + ', ' + data + ')');
		window.localStorage[name] = JSON.stringify(data);
	};
	/*
	** getFromLocalStorage(data)
	** Get data from local storage
	 */
	_getLocalStorage = function(name) {
		console.log('getLocalStorage(' + name + ')');
		return JSON.parse(window.localStorage[name]);
	};
	// Set the appdata database
	function _setDatabase(data) {
		console.log('setDatabase()',data);
		if (data !== [] && data !== undefined) {
			_appData.database = data;
			return true;
		}

		return false;
	}
	_setMovies = function () {
		console.log('model.setMovies()');
		var movies = [],
			results = [],
			result,
			niceUrl = _helpers.niceUrl;
			results = _appData.database;

			// console.log(results);
		for(result = 0; result < results.length; result++) {
			var thisMovie = results[result];
			movies[result] = {
				id: thisMovie.id,
				title: thisMovie.title,
				releaseDate: thisMovie.release_date,
				genres: thisMovie.genres,
				actors: thisMovie.actors,
				url: niceUrl(thisMovie.title),
				description: thisMovie.simple_plot,
				plot: thisMovie.plot,
				reviewScore: getReviewScoreAvg(thisMovie.reviews),
				cover: thisMovie.cover
			};
		}
		_appData.pages.movies.content = movies;
		return true;
	};
	// Set the asked movie
	function _setMovie(movie) {
		console.log('setMovie(' + movie + ')');
		var movies = _appData.pages.movies.content,
			thisMovie = {},
			where = _arrayHelpers.where,
			el = _helpers.el;
		// push in the requested movie to movies
		thisMovie = where(movies, {url: movie});

		_appData.pages.movie['content'] = thisMovie[0];
		_appData.pages.movie['title'] = thisMovie[0].title;
		console.log('Movie title: ', thisMovie);
	}
	// Set the current genre by using underscore's filter() and contains()
	function _setGenre(genre) {
		console.log('setGenre(' + genre + ')');
		var filter = _arrayHelpers.filter,
			contains = _arrayHelpers.contains,
			niceUrl = _helpers.niceUrl,
			getLocalStorage = _getLocalStorage,
			data = _appData.pages.movies['content'],
			movies = [];
			// Create comparable genre values
			for (var i = 0; i < data.length; i++) {
				var genres = data[i].genres;
				for (var j = 0; j < genres.length; j++) {
					data[i].genres[j] = niceUrl(genres[j]);
				}
			}
			// put the movies with genre into 'movies' by using filter() and contains()
			movies = filter(data, function(movie) {
				return contains(movie.genres, genre);
			});
			// Store it to the genre model
			_appData.pages.genre['content'] = movies;
			_appData.pages.genre['title'] = genre;
	}
	// Get all review scores and create an average rounded score
	function getReviewScoreAvg(reviews) {
		console.log('getReviewScoreAvg()', reviews);
		// If reviews are empty return with a string
		if (reviews.length < 1) {
			return 'Not reviewed yet.';
		}
		var map = _arrayHelpers.map, // This is _.map()
			reduce = _arrayHelpers.reduce, // This is _.reduce()
			reviewScores,
			reviewScoreAvg;
			// Get all review.score's with map
			reviewScores = map(reviews, function (review) {
				return review.score;
			});
			// console.log('reviewScores: ', reviewScores);
			// Reduce the scores to an average
			reviewScoreAvg = reduce(reviewScores, function (a,b) {
				return a + b;
			}, 0);
			// console.log('reviewScoreAvg: ', reviewScoreAvg);
			// Devide by the amount of reviews
			reviewScoreAvg = reviewScoreAvg/reviewScores.length;
			// Make it a nice looking 2 digit decimal number
			reviewScoreAvg = Math.round(reviewScoreAvg * 100)/100;
			// return the review score average
			// console.log('review score average: ', reviewScoreAvg);
			return reviewScoreAvg;
	}

	// Export private methods and properties for public use.
	return {
		init: _init,
		pages: _appData.pages,
		setGenre: _setGenre,
		setMovie: _setMovie,
		setMovies: _setMovies
	};
}(MYAPP || {}));