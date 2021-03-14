/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Neso"] = factory();
	else
		root["Neso"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/Carousel.js":
/*!*********************************!*\
  !*** ./src/classes/Carousel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Carousel)\n/* harmony export */ });\nclass Carousel {\n  constructor(element) {\n    this.carousel = element;\n    this.currentItem = 0;\n    this.items = this.carousel.querySelectorAll('.carousel-item');\n    this.track = this.carousel.querySelector('.carousel-track');\n    this.indicators = this.carousel.querySelectorAll('.carousel-indicator');\n    this.registerListeners();\n  }\n\n  registerListeners() {\n    this.carousel.addEventListener('click', event => {\n      if (event.target.matches('.carousel-indicator')) {\n        this.pause();\n        this.slideTo(event.target.getAttribute('data-slide-to'));\n        this.play();\n      }\n\n      if (event.target.closest('.carousel-prev')) {\n        this.pause();\n        this.slideTo(this.getPreviousItem());\n        this.play();\n      }\n\n      if (event.target.closest('.carousel-next')) {\n        this.pause();\n        this.slideTo(this.getNextItem());\n        this.play();\n      }\n    });\n\n    window.onresize = () => {\n      this.track.scrollLeft = this.calculateTrackScrollLeft();\n    };\n  }\n\n  slideTo(itemTo) {\n    this.setCurrentItem(itemTo);\n    this.track.scrollTo({\n      behavior: \"smooth\",\n      top: 0,\n      left: this.calculateTrackScrollLeft()\n    });\n    this.indicators.forEach((indicator, key) => {\n      if (indicator.classList.contains('active')) {\n        indicator.classList.remove('active');\n      }\n\n      if (this.currentItem == key) {\n        indicator.classList.add('active');\n      }\n    });\n  }\n\n  play() {\n    this.interval = setInterval(() => {\n      this.slideTo(this.getNextItem());\n    }, 5000);\n  }\n\n  pause() {\n    clearInterval(this.interval);\n  }\n\n  setCurrentItem(item) {\n    this.currentItem = parseInt(item);\n  }\n\n  calculateTrackScrollLeft() {\n    return Math.floor(this.track.scrollWidth * (this.currentItem / this.items.length));\n  }\n\n  getNextItem() {\n    if (this.currentItem === this.items.length - 1) {\n      return 0;\n    } else {\n      return this.currentItem + 1;\n    }\n  }\n\n  getPreviousItem() {\n    if (this.currentItem === 0) {\n      return this.items.length - 1;\n    } else {\n      return this.currentItem - 1;\n    }\n  }\n\n}\n\n//# sourceURL=webpack://Neso/./src/classes/Carousel.js?");

/***/ }),

/***/ "./src/classes/NavBar.js":
/*!*******************************!*\
  !*** ./src/classes/NavBar.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NavBar)\n/* harmony export */ });\nclass NavBar {\n  constructor(navBar) {\n    this.navBar = navBar;\n    this.toggleBtn = navBar.querySelector('.nav-menu-toggle');\n    this.menu = this.navBar.querySelector('.nav-main');\n    this.animation = null;\n    this.isClosing = false;\n    this.isExpanding = false;\n    this.isMenuOpen = false;\n    this.registerListeners();\n  }\n\n  registerListeners() {\n    this.navBar.addEventListener('click', event => {\n      if (event.target.closest('.nav-menu-toggle')) {\n        this.toggleBtnClick(event);\n      }\n\n      if (event.target.closest('.nav-dropdown-toggle')) {\n        this.openOrCloseNavDropdown(event);\n      }\n    }, false);\n    this.navBar.closest('body').addEventListener('click', event => {\n      if (!event.target.closest('.nav-dropdown-toggle')) {\n        this.navBar.querySelectorAll('.dropdown-show').forEach((shownDropdown, i) => {\n          this.toggleNavDropdown(shownDropdown);\n        });\n      }\n    });\n    window.addEventListener('resize', event => {\n      if (window.innerWidth > 768) {\n        this.menu.removeAttribute('style');\n      }\n    });\n  }\n\n  openOrCloseNavMenu() {\n    const navMenu = this.navBar.querySelector('.nav-main');\n    const dropdowns = this.navBar.querySelectorAll('.nav-dropdown');\n    navMenu.classList.toggle('nav-active');\n\n    if (!navMenu.classList.contains('nav-active')) {\n      this.navBar.querySelectorAll('.dropdown-show').forEach((shownDropdown, i) => {\n        this.toggleNavDropdown(shownDropdown);\n      });\n    }\n  }\n\n  openOrCloseNavDropdown(e) {\n    const nav = this.navBar.querySelector('nav');\n    const dropdown = e.target.closest('.nav-list-item').querySelector('.nav-dropdown');\n\n    if (this.navBar.querySelectorAll('.dropdown-show').length > 0) {\n      this.navBar.querySelectorAll('.dropdown-show').forEach((shownDropdown, i) => {\n        if (shownDropdown !== dropdown) {\n          this.toggleNavDropdown(shownDropdown);\n        }\n      });\n    }\n\n    this.toggleNavDropdown(dropdown);\n  }\n\n  toggleNavDropdown(dropdown) {\n    dropdown.classList.toggle('dropdown-show');\n    dropdown.parentNode.querySelector('.nav-dropdown-toggle').classList.toggle('nav-dropdown-show');\n  } // Function called when user clicks on the nav menu toggle\n\n\n  toggleBtnClick(event) {\n    event.preventDefault();\n\n    if (this.isClosing || !this.isNavMenuOpen) {\n      this.openMenu();\n    } else if (this.isExpanding || this.isNavMenuOpen) {\n      this.closeMenu();\n    }\n  } // Function called to close the content with an animation\n\n\n  closeMenu() {\n    this.isClosing = true;\n    const startHeight = `${this.menu.offsetHeight}px`;\n    const endHeight = '0px';\n\n    if (this.animation) {\n      this.animation.cancel();\n    }\n\n    this.animation = this.menu.animate({\n      height: [startHeight, endHeight],\n      opacity: [1, 0]\n    }, {\n      duration: 400,\n      easing: 'ease-out'\n    });\n    this.menu.style.height = endHeight;\n\n    this.animation.onfinish = () => this.onAnimationFinish(false);\n\n    this.animation.oncancel = () => this.isClosing = false;\n  } // Function called to open the element after click\n\n\n  openMenu() {\n    this.isNavMenuOpen = true;\n    window.requestAnimationFrame(() => this.expand());\n  } // Function called to expand the content with an animation\n\n\n  expand() {\n    this.isExpanding = true;\n    const startHeight = `0px`;\n    const endHeight = `${this.menu.querySelector('.nav-list').offsetHeight}px`;\n\n    if (this.animation) {\n      this.animation.cancel();\n    }\n\n    this.animation = this.menu.animate({\n      height: [startHeight, endHeight],\n      opacity: [0, 1]\n    }, {\n      duration: 400,\n      easing: 'ease-out'\n    });\n    this.menu.style.height = endHeight;\n    this.menu.style.opacity = 1;\n\n    this.animation.onfinish = () => this.onAnimationFinish(true);\n\n    this.animation.oncancel = () => this.isExpanding = false;\n  } // Callback when the shrink or expand animations are done\n\n\n  onAnimationFinish(isNavMenuOpen) {\n    this.isNavMenuOpen = isNavMenuOpen;\n    this.menu.classList.toggle('menu-open', isNavMenuOpen);\n    this.animation = null;\n    this.isClosing = false;\n    this.isExpanding = false;\n\n    if (this.isNavMenuOpen) {\n      this.menu.style.height = 'auto';\n    }\n  }\n\n}\n\n//# sourceURL=webpack://Neso/./src/classes/NavBar.js?");

/***/ }),

/***/ "./src/neso-src.js":
/*!*************************!*\
  !*** ./src/neso-src.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NavBar\": () => (/* reexport safe */ _classes_NavBar_js__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"Carousel\": () => (/* reexport safe */ _classes_Carousel_js__WEBPACK_IMPORTED_MODULE_1__.default)\n/* harmony export */ });\n/* harmony import */ var _classes_NavBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/NavBar.js */ \"./src/classes/NavBar.js\");\n/* harmony import */ var _classes_Carousel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Carousel.js */ \"./src/classes/Carousel.js\");\n\n\n\n\n//# sourceURL=webpack://Neso/./src/neso-src.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/neso-src.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});