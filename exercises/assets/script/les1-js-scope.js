
(function() {
	'use strict';

	//  4.1 Local scope
	function scope(amount) {
		var max, min, iterator;
		min = 0;
		max = 10;
		iterator = 2;
		for(amount; amount < min; amount =- iterator) {
			return function(number) {
				return number % amount;
			};
		}
	}

	// 4.2 Global scope
	var max, min, iterator;

	// 4.3 Closure
	// When there are variables defined inside a function it stays there untill summoned.
	// See code above for example
}());