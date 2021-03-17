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

/***/ "./src/js/classes/Carousel.js":
/*!************************************!*\
  !*** ./src/js/classes/Carousel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Carousel)
/* harmony export */ });
/* harmony import */ var _scss_partials_carousel_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/_partials/_carousel.scss */ "./src/scss/_partials/_carousel.scss");

class Carousel {
  constructor(element) {
    this.carousel = element;
    this.currentItem = 0;
    this.items = this.carousel.querySelectorAll('.carousel-item');
    this.track = this.carousel.querySelector('.carousel-track');
    this.indicators = this.carousel.querySelectorAll('.carousel-indicator');
    this.registerListeners();
  }

  registerListeners() {
    this.carousel.addEventListener('click', event => {
      if (event.target.matches('.carousel-indicator')) {
        this.pause();
        this.slideTo(event.target.getAttribute('data-slide-to'));
        this.play();
      }

      if (event.target.closest('.carousel-prev')) {
        this.pause();
        this.slideTo(this.getPreviousItem());
        this.play();
      }

      if (event.target.closest('.carousel-next')) {
        this.pause();
        this.slideTo(this.getNextItem());
        this.play();
      }
    });

    window.onresize = () => {
      this.track.scrollLeft = this.calculateTrackScrollLeft();
    };
  }

  slideTo(itemTo) {
    this.setCurrentItem(itemTo);
    this.track.scrollTo({
      behavior: "smooth",
      top: 0,
      left: this.calculateTrackScrollLeft()
    });
    this.indicators.forEach((indicator, key) => {
      if (indicator.classList.contains('active')) {
        indicator.classList.remove('active');
      }

      if (this.currentItem == key) {
        indicator.classList.add('active');
      }
    });
  }

  play() {
    this.interval = setInterval(() => {
      this.slideTo(this.getNextItem());
    }, 5000);
  }

  pause() {
    clearInterval(this.interval);
  }

  setCurrentItem(item) {
    this.currentItem = parseInt(item);
  }

  calculateTrackScrollLeft() {
    return Math.floor(this.track.scrollWidth * (this.currentItem / this.items.length));
  }

  getNextItem() {
    if (this.currentItem === this.items.length - 1) {
      return 0;
    } else {
      return this.currentItem + 1;
    }
  }

  getPreviousItem() {
    if (this.currentItem === 0) {
      return this.items.length - 1;
    } else {
      return this.currentItem - 1;
    }
  }

}

/***/ }),

/***/ "./src/js/classes/NavBar.js":
/*!**********************************!*\
  !*** ./src/js/classes/NavBar.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavBar)
/* harmony export */ });
/* harmony import */ var _scss_partials_navbar_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/_partials/_navbar.scss */ "./src/scss/_partials/_navbar.scss");
/* harmony import */ var _scss_test_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scss/test.scss */ "./src/scss/test.scss");


class NavBar {
  constructor(navBar) {
    this.navBar = navBar;
    this.toggleBtn = navBar.querySelector('.nav-menu-toggle');
    this.menu = this.navBar.querySelector('.nav-main');
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.isMenuOpen = false;
    this.registerListeners();
  }

  registerListeners() {
    this.navBar.addEventListener('click', event => {
      if (event.target.closest('.nav-menu-toggle')) {
        this.toggleBtnClick(event);
      }

      if (event.target.closest('.nav-dropdown-toggle')) {
        this.openOrCloseNavDropdown(event);
      }
    }, false);
    this.navBar.closest('body').addEventListener('click', event => {
      if (!event.target.closest('.nav-dropdown-toggle')) {
        this.navBar.querySelectorAll('.dropdown-show').forEach((shownDropdown, i) => {
          this.toggleNavDropdown(shownDropdown);
        });
      }
    });
  }

  openOrCloseNavMenu() {
    const navMenu = this.navBar.querySelector('.nav-main');
    const dropdowns = this.navBar.querySelectorAll('.nav-dropdown');
    navMenu.classList.toggle('nav-active');

    if (!navMenu.classList.contains('nav-active')) {
      this.navBar.querySelectorAll('.dropdown-show').forEach((shownDropdown, i) => {
        this.toggleNavDropdown(shownDropdown);
      });
    }
  }

  openOrCloseNavDropdown(e) {
    const nav = this.navBar.querySelector('nav');
    const dropdown = e.target.closest('.nav-list-item').querySelector('.nav-dropdown');

    if (this.navBar.querySelectorAll('.dropdown-show').length > 0) {
      this.navBar.querySelectorAll('.dropdown-show').forEach((shownDropdown, i) => {
        if (shownDropdown !== dropdown) {
          this.toggleNavDropdown(shownDropdown);
        }
      });
    }

    this.toggleNavDropdown(dropdown);
  }

  toggleNavDropdown(dropdown) {
    dropdown.classList.toggle('dropdown-show');
    dropdown.parentNode.querySelector('.nav-dropdown-toggle').classList.toggle('nav-dropdown-show');
  } // Function called when user clicks on the nav menu toggle


  toggleBtnClick(event) {
    event.preventDefault();

    if (this.isClosing || !this.isNavMenuOpen) {
      this.openMenu();
    } else if (this.isExpanding || this.isNavMenuOpen) {
      this.closeMenu();
    }
  } // Function called to close the content with an animation


  closeMenu() {
    this.isClosing = true;
    const startHeight = `${this.menu.offsetHeight}px`;
    const endHeight = '0px';

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.menu.animate({
      height: [startHeight, endHeight],
      opacity: [1, 0]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    this.menu.style.height = endHeight;

    this.animation.onfinish = () => this.onAnimationFinish(false);

    this.animation.oncancel = () => this.isClosing = false;
  } // Function called to open the element after click


  openMenu() {
    this.isNavMenuOpen = true;
    window.requestAnimationFrame(() => this.expand());
  } // Function called to expand the content with an animation


  expand() {
    this.isExpanding = true;
    const startHeight = `0px`;
    const endHeight = `${this.menu.querySelector('.nav-list').offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.menu.animate({
      height: [startHeight, endHeight],
      opacity: [0, 1]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    this.menu.style.height = endHeight;
    this.menu.style.opacity = 1;

    this.animation.onfinish = () => this.onAnimationFinish(true);

    this.animation.oncancel = () => this.isExpanding = false;
  } // Callback when the shrink or expand animations are done


  onAnimationFinish(isNavMenuOpen) {
    this.isNavMenuOpen = isNavMenuOpen;
    this.menu.classList.toggle('menu-open', isNavMenuOpen);
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;

    if (this.isNavMenuOpen) {
      this.menu.style.height = 'auto';
    }
  }

}

/***/ }),

/***/ "./src/scss/_partials/_carousel.scss":
/*!*******************************************!*\
  !*** ./src/scss/_partials/_carousel.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/_partials/_navbar.scss":
/*!*****************************************!*\
  !*** ./src/scss/_partials/_navbar.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/test.scss":
/*!****************************!*\
  !*** ./src/scss/test.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/js/neso-src.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavBar": () => (/* reexport safe */ _classes_NavBar_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "Carousel": () => (/* reexport safe */ _classes_Carousel_js__WEBPACK_IMPORTED_MODULE_1__.default)
/* harmony export */ });
/* harmony import */ var _classes_NavBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/NavBar.js */ "./src/js/classes/NavBar.js");
/* harmony import */ var _classes_Carousel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Carousel.js */ "./src/js/classes/Carousel.js");



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=neso.js.map