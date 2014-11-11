// Movies model
FAVOMO.model.movies = (function (FAVOMO) {
	var model = new FAVOMO.Model('movies'),
		_data;

	// Set the _data
	function _set (data) {
		console.log('model.' + model.name + '.set()',data);
		var movies = [],
			results = data,
			result,
			niceUrl = FAVOMO.helpers.niceUrl;

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
				reviewScore: _getReviewScoreAvg(thisMovie.reviews),
				cover: thisMovie.cover
			};
		}
		_appData.pages.movies.content = movies;
	}
	model.set = _set;

	function _get() {
		console.log('model.' + model.name + '.get()');
		return _appData.pages.movies.content;
	}
	model.get = _get;

	// Get all review scores and create an average rounded score
	function _getReviewScoreAvg(reviews) {
		console.log('getReviewScoreAvg()', reviews);
		// If reviews are empty return with a string
		if (reviews.length < 1) {
			return 'Not reviewed yet.';
		}
		var arr = FAVOMO.helpers.array,
			map = arr.map, // This is _.map()
			reduce = arr.reduce, // This is _.reduce()
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

	// do eeet
	return model;
}(FAVOMO || {}));