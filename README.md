# Neso

Neso is a small JavaScript library used to house reusable components I've created whilst working on 
projects. 

It currently only has one nav bar component, but the aim is to fill it with more so that anyone can 
reach for it.

Production ready code is provided in the `dist` directory and can be linked to from your HTML using 
the following `link` and `script` tags to your HTML:

- `<link rel="stylesheet" href="main.css">`
- `<script src="neso.js"></script>`

Info about installing via NPM to follow.

## NavBar
The NavBar component is a responsive nav menu that supports one level of dropdowns below the main menu. 
Progressive enhancement is built in (see the `.no-js` styles in `/src/_partials/_navbar.scss`, 
so it is usable when JavaScript is not available. It also supports `prefers-reduced-motion` with main menu
toggle animation on small screen being reduced to `10ms` instead of `400ms`.

There are light and dark variants available. The default colour palette of the light scheme is sky blue,
and the dark scheme uses three shades of grey. To use the dark scheme, add the `neso-nav-dark` class to the `nav` element's `class` 
attribute.

The NavBar component can be initialised in JavaScript as follows:

```
const nav = document.querySelectorAll('nav');
new Neso.NavBar(nav);
```
