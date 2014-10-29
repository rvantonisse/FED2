// Namespace the app
// var MYAPP = MYAPP || {};

MYAPP.model = (function (MYAPP) {
	// Dependencies and variable initiation
	var _helpers = MYAPP.helpers,
		_pages,
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
			}
		}
	};
	_init = function (callback) {
		var getJSON = _getJSON,
			isLocalStorage = _isLocalStorage,
			updateLocalStorage = _updateLocalStorage,
			getLocalStorage = _getLocalStorage,
			setMovies = _setMovies;

		// check if the browser supports localStorage
		if(window.localStorage) {
			// console.log('LocalStorage!');
			// Check if _appData is stored locally for quick loading
			if(isLocalStorage('MYAPPMovies')) {
				// console.log('rvaAppDatabase is locally stored');
				setMovies(getLocalStorage('MYAPPMovies'));
				// Update data in the background
				updateLocalStorage(function () {
					setMovies(getLocalStorage('MYAPPMovies'));
				});
				callback();
			} else {
				// If rvaAppDatabase is not locally stored
				updateLocalStorage(function () {
					setMovies(getLocalStorage('MYAPPMovies'));
				});
				callback();
			}
		} else {
			// No localStorage available, load page as normal
			// console.log('No localStorage...');
			getJSON('http://dennistel.nl/movies', function(data) {
				// console.log('appData.getData().callback');
				setMovies(data || []);
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
		// console.log('updateLocalStorage()');
		if(window.navigator.onLine) {
			// Dostuff
			// console.log('Connected to internet');
			getJSON('http://dennistel.nl/movies', function(data) {
				// console.log('appData.getData().callback');
				setLocalStorage('MYAPPMovies', data);
			});
		} else {
			// not online dont try to load data
			console.log('No internet connection');
			// setTimeout(_updateLocalStorage(), 60000);
		}
		callback();
	};

	// Check for data in localStorage
	_isLocalStorage = function(name) {
		// console.log('isLocallyStored(' + name + ')');
		return (window.localStorage[name] !== undefined);
	};
	/*
	** _setLocalStorage(data)
	** Save data into localStorage
	 */
	_setLocalStorage = function(name, data) {
		// console.log('saveToLocalStorage(' + name + ', ' + data + ')');
		window.localStorage[name] = JSON.stringify(data);
	};
	/*
	** getFromLocalStorage(data)
	** Get data from local storage
	 */
	_getLocalStorage = function(name) {
		return JSON.parse(window.localStorage[name]);
	};

	_setMovies = function (data) {
		console.log('model.setMovies(' + data + ')');
		var movies = [],
			results = data,
			result,
			niceUrl = _helpers.niceUrl;
			// console.log(results);
		for(result = 0; result < results.length; result++) {
			var thisMovie = results[result];
			movies[result] = {
				id: thisMovie.id,
				releaseDate: thisMovie.release_date,
				title: thisMovie.title,
				url: niceUrl(thisMovie.title),
				description: thisMovie.simple_plot,
				plot: thisMovie.plot,
				cover: thisMovie.cover,
				genres: thisMovie.genres,
				rating: thisMovie.reviews
			};
		}
		_appData.pages.movies.content = movies;
		return true;
	};

	// Export private methods and properties for public use.
	return {
		init: _init,
		pages: _appData.pages
	};
}(MYAPP || {}));