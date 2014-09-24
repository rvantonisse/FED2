# FED2
CMDA Front-end development 2

## Getting started

1. Clone this repo `$ git clone https://github.com/rvantonisse/FED2.git`
2. Buy me a beer for all hard work done. :)

## Code conventions

### General

* Use 4 space tabs for indention
* Validate before committing
* DRY KISS ;)

### HTML

* Use HTML5 DOCTYPE `<!DOCTYPE html>`
* Set language and sublanguage for pages `<html lang="en-GB">`
* Set HTML5 charset `<meta charset="utf-8">`
* HTML attribute order:
	1. id as link and form hooks
	2. class as CSS hook
	3. data-* as JS hook
	4. Tag specific: target, type, for, etc
	5. Other globals: alt, title, lang, etc
	6. Tabindex last

### CSS

* Do not use "*" and id "#" selectors
* Property order:
	1. Positioning
	2. Box model
	3. Typography
	4. Colour
	5. Effects / animation
	6. Other
* Return multiple selections:

		a:hover,
		a:focus { ... }

### JS

* Scope it, prevent globals
* variable styling
	* camelCase
	* CONSTANT
	* Constructor
