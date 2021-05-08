# Neso

Neso is a small JavaScript library used to house reusable components I've created whilst working on 
projects. 

It currently only has one nav bar component, but the aim is to fill it with more so that anyone can 
reach for it.

## Using code in the `dist` directory 
Production ready code is provided in the `dist` directory and can be linked to from your HTML using 
the following `link` and `script` tags to your HTML:

- `<link rel="stylesheet" href="neso.css">`
- `<script src="neso.js"></script>`

## Installing via NPM
Install using NPM on the command line as follows: `npm install neso-js`


## NavBar
The NavBar component is a responsive nav menu that supports one level of dropdowns. 
Progressive enhancement is built in, so it is usable when JavaScript is not available. It also supports `prefers-reduced-motion` with the main menu
toggle animation on small screens being reduced from `400ms` to `10ms`.

There are light and dark variants available. The default colour palette of the light scheme is sky blue,
and the dark scheme uses three shades of grey. To use the dark scheme, add the `neso-nav-dark` class to the `nav` element's `class` 
attribute.

Example HTML can be found in the [/dist/index.html](https://github.com/anthony-dee/Neso/blob/main/dist/index.html "/dist/index.html on GitHub") on Github.


### Initialisation using code in the `dist` directory
The NavBar component can be initialised in JavaScript as follows:

```
const nav = document.querySelectorAll('nav');
new Neso.NavBar(nav);
```

### Initialisation using code installed via NPM
Initialising the NavBar component:
```
// Import the full Neso library and instantiate using "new Neso.NavBar(navElement)"

import * as Neso from "neso-js";
const nav = new Neso.NavBar(document.querySelector('nav'));
```
