	Author: Roel Antonisse
	Last updated: 29/10/2014

# FED2
This repository is created for educational purpose. [The Web-application posted here](https://github.com/rvantonisse/FED2/tree/master/webapp) is a final product created as assesment of [the course Front-end development 2](https://github.com/CMDA/FED2) followed at the University of applied sciences Amsterdam, Communication & Multimedia design (Course contents my differ with future courses).

## Course contents

1. HTML5 API's
	* localStorage
2. JavaScript
	* no jQuery
	* OOP
	* Routing
	* Templating
	* AJAX calls
	* Data manipulation
3. Git version control
4. Code conventions and best practices

## Code conventions

### General

* Progressive enhancement
* WCAG 2.0 conformance level 2
* Comments and naming in [English](http://coub.com/view/3xx0dgl0) for better sharing.

### HTML

* HTML5
* Set language and sublanguage for pages `<html lang="en-GB">`
* HTML attribute order:
	1. id as link and form hooks
	2. class as CSS hook
	3. data-* as JS hook
	4. Tag specific: target, type, for, etc
	5. Other globals: alt, title, lang, etc
	6. ARIA
	7. Tabindex last

### CSS

* elements with css have a `class` attribute.
* Be specific; do not use the "*"-selector
* Property order:
	1. Positioning
	2. Box model (width/padding/margin)
	3. Typography
	4. Colour
	5. Effects / animation
	6. Other
* Return multiple selections:

		a:hover,
		a:focus { ... }

### JS

* OOP
* DRY KISS
* variable styling
	* camelCase
	* CONSTANT or MODULENAME
	* Constructor
