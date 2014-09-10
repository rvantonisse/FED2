(function(){
	'use strict';

	// 3.1 Constructor
	function Person(name) {
		this.name = name;
		this.speak = function() {
			console.log("Hello! My name is " + this.name + "!");
		};
	}
	var bob = new Person("bob");
	bob.speak();

	// 3.2 Prototypes
	Person.prototype.walk = function() {
		console.log(this.name + " is walking down the street...");
	};
	Person.prototype.eat = function(food) {
		console.log(this.name + " bites the " + food + "...");
	};

	bob.eat("banana");

	// 3.3 Object literal
	var bob2 = {
		name: "bob",
		speak: function() {
			console.log("Hello! My name is " + this.name + "!");
		},
		walk: function(shoes) {
			console.log(this.name + " is walking down the street with his " + shoes + " on...");
		},
		eat: function(food) {
			console.log(this.name + " is biting a " + food + "...");
		}
	};
	bob2.eat("apple");
}());