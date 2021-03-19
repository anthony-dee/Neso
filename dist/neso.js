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
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/classes/Carousel.js":
/*!************************************!*\
  !*** ./src/js/classes/Carousel.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Carousel; }
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NavBar; }
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/scss/_partials/_carousel.scss":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/scss/_partials/_carousel.scss ***!
  \******************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".carousel {\n  position: relative;\n  width: 100%;\n}\n.carousel .carousel-indicators {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n  -ms-flex-pack: space-evenly;\n  justify-content: space-evenly;\n  margin: 0.5rem 0 1.5rem;\n  padding-left: 0;\n  list-style: none;\n  z-index: 20;\n}\n.carousel .carousel-indicators .carousel-indicator {\n  height: 2rem;\n  width: 2rem;\n  border-radius: 50%;\n  background-color: white;\n  -webkit-box-shadow: 3px 5px 0 black;\n  box-shadow: 3px 5px 0 black;\n  opacity: 0.6;\n  -webkit-transition: opacity 0.2s;\n  transition: opacity 0.2s;\n  cursor: pointer;\n}\n.carousel .carousel-indicators .carousel-indicator.active, .carousel .carousel-indicators .carousel-indicator:hover {\n  opacity: 1;\n}\n.carousel .carousel-track {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n  overflow: hidden;\n  background-color: #d5dbdb;\n}\n.carousel .carousel-track .carousel-item {\n  position: relative;\n  width: 100%;\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n}\n.carousel .carousel-track .carousel-item .carousel-img {\n  width: 100%;\n}\n.carousel .carousel-track .carousel-item .carousel-caption {\n  text-align: center;\n  position: absolute;\n  left: 10%;\n  right: 10%;\n  bottom: 4rem;\n  color: white;\n}\n.carousel .carousel-track .carousel-item .carousel-caption h1 {\n  margin: 0;\n}\n.carousel .carousel-prev {\n  left: 0;\n}\n.carousel .carousel-prev:hover {\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(213, 219, 219, 0.6)), to(transparent));\n  background-image: linear-gradient(90deg, rgba(213, 219, 219, 0.6), transparent);\n}\n.carousel .carousel-next {\n  right: 0;\n}\n.carousel .carousel-next:hover {\n  background-image: -webkit-gradient(linear, right top, left top, from(rgba(213, 219, 219, 0.6)), to(transparent));\n  background-image: linear-gradient(270deg, rgba(213, 219, 219, 0.6), transparent);\n}\n.carousel .carousel-prev, .carousel .carousel-next {\n  z-index: 20;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 10%;\n  cursor: pointer;\n  opacity: 0.6;\n}\n.carousel .carousel-prev svg, .carousel .carousel-next svg {\n  -webkit-filter: drop-shadow(3px 5px 0 black);\n  filter: drop-shadow(3px 5px 0 black);\n}\n.carousel .carousel-prev:hover, .carousel .carousel-next:hover {\n  cursor: pointer;\n  opacity: 1;\n}\n\n@media screen and (max-width: 576px) {\n  .carousel .carousel-indicators .carousel-indicator {\n    height: 1rem;\n    width: 1rem;\n  }\n  .carousel .carousel-track .carousel-item .carousel-caption {\n    bottom: 3rem;\n  }\n  .carousel .carousel-track .carousel-item .carousel-caption h1 {\n    font-size: 2rem;\n  }\n  .carousel .carousel-prev svg, .carousel .carousel-next svg {\n    height: 1.333334rem;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/_partials/_carousel.scss"],"names":[],"mappings":"AAOA;EACE,kBAAA;EACA,WAAA;AANF;AAOE;EACE,kBAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,8BAAA;EACI,2BAAA;EACI,6BAAA;EACR,uBAAA;EACA,eAAA;EACA,gBAAA;EACA,WAAA;AALJ;AAMI;EACE,YAxBa;EAyBb,WAzBa;EA0Bb,kBAAA;EACA,uBAAA;EACA,mCAAA;EACQ,2BAAA;EACR,YAAA;EACA,gCAAA;EACA,wBAAA;EACA,eAAA;AAJN;AAKM;EACE,UAAA;AAHR;AAOE;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,qBAAA;EACI,iBAAA;EACJ,gBAAA;EACA,yBA9CQ;AAyCZ;AAMI;EACE,kBAAA;EACA,WAAA;EACA,mBAAA;EACI,kBAAA;EACI,cAAA;AAJd;AAKM;EACE,WAAA;AAHR;AAKM;EACE,kBAAA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,YAAA;EACA,YAAA;AAHR;AAIQ;EACE,SAAA;AAFV;AAOE;EACE,OAAA;AALJ;AAMI;EACE,gHAAA;EACA,+EAAA;AAJN;AAOE;EACE,QAAA;AALJ;AAMI;EACE,gHAAA;EACA,gFAAA;AAJN;AAOE;EACE,WAAA;EACA,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,wBAAA;EACI,qBAAA;EACI,uBAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,kBAAA;EACA,MAAA;EACA,SAAA;EACA,UAAA;EACA,eAAA;EACA,YAAA;AALJ;AAMI;EACE,4CAAA;EACQ,oCAAA;AAJd;AAMI;EACE,eAAA;EACA,UAAA;AAJN;;AASA;EAEI;IACE,YAAA;IACA,WAAA;EAPJ;EAWM;IACE,YAAA;EATR;EAUQ;IACE,eAAA;EARV;EAaE;IACE,mBAAA;EAXJ;AACF","sourcesContent":["@use \"sass:color\";\r\n\r\n$_indicatorHeight: 2rem;\r\n$_indicatorsMarginBlockStart: 0.5rem;\r\n$_indicatorsMarginBlockEnd: 1.5rem;\r\n$_bgColour: #d5dbdb;\r\n\r\n.carousel {\r\n  position: relative;\r\n  width: 100%;\r\n  .carousel-indicators {\r\n    position: absolute;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: space-evenly;\r\n        -ms-flex-pack: space-evenly;\r\n            justify-content: space-evenly;\r\n    margin: $_indicatorsMarginBlockStart 0 $_indicatorsMarginBlockEnd;\r\n    padding-left: 0;\r\n    list-style: none;\r\n    z-index: 20;\r\n    .carousel-indicator {\r\n      height: $_indicatorHeight;\r\n      width: $_indicatorHeight;\r\n      border-radius: 50%;\r\n      background-color: white;\r\n      -webkit-box-shadow: 3px 5px 0 black;\r\n              box-shadow: 3px 5px 0 black;\r\n      opacity: 0.6;\r\n      -webkit-transition: opacity 0.2s;\r\n      transition: opacity 0.2s;\r\n      cursor: pointer;\r\n      &.active, &:hover {\r\n        opacity: 1;\r\n      }\r\n    }\r\n  }\r\n  .carousel-track {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -ms-flex-wrap: nowrap;\r\n        flex-wrap: nowrap;\r\n    overflow: hidden;\r\n    background-color: $_bgColour;\r\n    .carousel-item {\r\n      position: relative;\r\n      width: 100%;\r\n      -webkit-box-flex: 0;\r\n          -ms-flex: 0 0 100%;\r\n              flex: 0 0 100%;\r\n      .carousel-img {\r\n        width: 100%;\r\n      }\r\n      .carousel-caption {\r\n        text-align: center;\r\n        position: absolute;\r\n        left: 10%;\r\n        right: 10%;\r\n        bottom: $_indicatorsMarginBlockStart + $_indicatorsMarginBlockEnd + $_indicatorHeight;\r\n        color: white;\r\n        h1 {\r\n          margin: 0;\r\n        }\r\n      }\r\n    }\r\n  }\r\n  .carousel-prev {\r\n    left: 0;\r\n    &:hover {\r\n      background-image: -webkit-gradient(linear, left top, right top, from(color.adjust($_bgColour, $alpha: -0.4)), to(transparent));\r\n      background-image: linear-gradient(90deg, color.adjust($_bgColour, $alpha: -0.4), transparent);\r\n    }\r\n  }\r\n  .carousel-next {\r\n    right: 0;\r\n    &:hover {\r\n      background-image: -webkit-gradient(linear, right top, left top, from(color.adjust($_bgColour, $alpha: -0.4)), to(transparent));\r\n      background-image: linear-gradient(270deg, color.adjust($_bgColour, $alpha: -0.4), transparent);\r\n    }\r\n  }\r\n  .carousel-prev, .carousel-next {\r\n    z-index: 20;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    -webkit-box-align:  center;\r\n        -ms-flex-align:  center;\r\n            align-items:  center;\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    width: 10%;\r\n    cursor: pointer;\r\n    opacity: 0.6;\r\n    svg {\r\n      -webkit-filter: drop-shadow(3px 5px 0 black);\r\n              filter: drop-shadow(3px 5px 0 black);\r\n    }\r\n    &:hover {\r\n      cursor: pointer;\r\n      opacity: 1;\r\n    }\r\n  }\r\n}\r\n\r\n@media screen and (max-width: 576px) {\r\n  .carousel {\r\n    .carousel-indicators .carousel-indicator {\r\n      height: $_indicatorHeight / 2;\r\n      width: $_indicatorHeight / 2;\r\n    }\r\n    .carousel-track {\r\n      .carousel-item {\r\n        .carousel-caption {\r\n          bottom: $_indicatorsMarginBlockStart + $_indicatorsMarginBlockEnd + ($_indicatorHeight / 2);\r\n          h1 {\r\n            font-size: 2rem;\r\n          }\r\n        }\r\n      }\r\n    }\r\n    .carousel-prev svg, .carousel-next svg {\r\n      height: $_indicatorHeight * 0.666667;\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/scss/_partials/_navbar.scss":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/scss/_partials/_navbar.scss ***!
  \****************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "nav {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  background-color: #1b1b1b;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  /*transition for nav open/close animation on mobiles*/\n  -webkit-transition: all 400ms;\n  transition: all 400ms;\n}\nnav .nav-list {\n  grid-column-start: 1;\n  grid-column-end: 12;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  text-align: center;\n}\nnav .nav-list .nav-list-item {\n  width: 100%;\n}\nnav .nav-list .nav-list-item .nav-list-item-anchor {\n  display: block;\n  color: white;\n  text-decoration: none;\n  padding: 0.5em;\n}\nnav .nav-list .nav-list-item .nav-list-item-anchor.active, nav .nav-list .nav-list-item .nav-list-item-anchor:hover, nav .nav-list .nav-list-item .nav-list-item-anchor.nav-dropdown-show {\n  background-color: #353535;\n}\nnav .nav-list .nav-list-item .nav-dropdown-name {\n  display: block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\nnav .nav-list .nav-list-item .nav-dropdown-toggle {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\nnav .nav-list .nav-list-item .nav-dropdown-toggle-caret {\n  margin-left: 0.5em;\n}\nnav .nav-list .nav-list-item .nav-dropdown {\n  height: 0;\n  background-color: #353535;\n  -webkit-transition: opacity 200ms;\n  transition: opacity 200ms;\n  display: none;\n}\nnav .nav-list .nav-list-item .nav-dropdown.dropdown-show {\n  height: auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\nnav .nav-list .nav-list-item .nav-dropdown a {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 0.5em 0;\n  color: white;\n  text-decoration: none;\n  white-space: nowrap;\n  width: 100%;\n}\nnav .nav-list .nav-list-item .nav-dropdown a:hover {\n  background-color: #4e4e4e;\n}\nnav .nav-list .nav-list-item-main > .nav-menu-toggle {\n  display: block;\n  background-color: transparent;\n  border: 0;\n  padding: 1em;\n}\nnav .nav-list .nav-list-item-main > .nav-menu-toggle:hover {\n  background-color: #353535;\n}\nnav .nav-list .nav-main {\n  background-color: #1b1b1b;\n  height: 0;\n  opacity: 0;\n  overflow: hidden;\n}\nnav .nav-list .nav-main.menu-open {\n  height: auto;\n  opacity: 1;\n}\nnav .nav-list > .nav-list-item.nav-list-item-main {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n\n@media screen and (min-width: 768px) {\n  nav .nav-list {\n    grid-column-start: 2;\n    grid-column-end: 14;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  nav .nav-list .nav-list-item {\n    width: auto;\n  }\n  nav .nav-list .nav-list-item.nav-list-item-dropdown {\n    position: relative;\n  }\n  nav .nav-list .nav-list-item .nav-dropdown {\n    position: absolute;\n    z-index: 10;\n    top: 100%;\n    left: 0;\n    -webkit-box-align: start;\n    -ms-flex-align: start;\n    align-items: start;\n    padding: 0.4em 0;\n  }\n  nav .nav-list .nav-list-item .nav-dropdown a {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    width: 100%;\n    text-align: left;\n    padding: 0.2em 1em;\n  }\n  nav .nav-list .nav-list-item.nav-list-item-main > .nav-menu-toggle {\n    display: none;\n  }\n  nav .nav-list .nav-main {\n    height: auto;\n    padding: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    position: static;\n    opacity: 1;\n    overflow: visible;\n  }\n  nav .nav-list .nav-main .nav-list .nav-list-item {\n    margin-right: 1em;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/_partials/_navbar.scss"],"names":[],"mappings":"AAGA;EACE,gBAAA;EACA,MAAA;EACA,WAAA;EACA,yBAPU;EAQV,8BAAA;EACQ,sBAAA;EACR,qDAAA;EACA,6BAAA;EACA,qBAAA;AAFF;AAGE;EACE,oBAAA;EACA,mBAAA;EACA,gBAAA;EACA,SAAA;EACA,UAAA;EACA,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,uBAAA;EACI,oBAAA;EACI,2BAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,kBAAA;AADJ;AAEI;EACE,WAAA;AAAN;AACM;EACE,cAAA;EACA,YAAA;EACA,qBAAA;EACA,cAAA;AACR;AAAQ;EACE,yBAxCS;AA0CnB;AACM;EACE,cAAA;EACA,8BAAA;EACQ,sBAAA;AAChB;AACM;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,wBAAA;EACI,qBAAA;EACI,uBAAA;AAChB;AACM;EACE,kBAAA;AACR;AACM;EACE,SAAA;EAEA,yBAjEW;EAkEX,iCAAA;EACA,yBAAA;EACA,aAAA;AAAR;AACQ;EACE,YAAA;EACA,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;AAClB;AAEM;EACE,8BAAA;EACQ,sBAAA;EACR,gBAAA;EACA,YAAA;EACA,qBAAA;EACA,mBAAA;EACA,WAAA;AAAR;AACQ;EACE,yBAAA;AACV;AAGI;EACE,cAAA;EACA,6BAAA;EACA,SAAA;EACA,YAAA;AADN;AAEM;EACE,yBAtGW;AAsGnB;AAGI;EACE,yBA3GM;EA4GN,SAAA;EACA,UAAA;EACA,gBAAA;AADN;AAEM;EACE,YAAA;EACA,UAAA;AAAR;AAGI;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,yBAAA;EACI,sBAAA;EACI,8BAAA;AADd;;AAKA;EAEI;IACE,oBAAA;IACA,mBAAA;IACA,8BAAA;IACA,6BAAA;IACI,uBAAA;IACI,mBAAA;EAHZ;EAII;IACE,WAAA;EAFN;EAGM;IACE,kBAAA;EADR;EAGM;IACE,kBAAA;IACA,WAAA;IACA,SAAA;IACA,OAAA;IACA,wBAAA;IACI,qBAAA;IACI,kBAAA;IACR,gBAAA;EADR;EAGM;IACE,8BAAA;IACQ,sBAAA;IACR,WAAA;IACA,gBAAA;IACA,kBAAA;EADR;EAII;IACE,aAAA;EAFN;EAII;IACE,YAAA;IACA,UAAA;IACA,oBAAA;IACA,oBAAA;IACA,aAAA;IACA,gBAAA;IACA,UAAA;IACA,iBAAA;EAFN;EAGM;IACE,iBAAA;EADR;AACF","sourcesContent":["$_navBlack: #1b1b1b;\r\n$_dropdownBGColor: lighten($_navBlack, 10%);\r\n\r\nnav {\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 10;\r\n  background-color: $_navBlack;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  /*transition for nav open/close animation on mobiles*/\r\n  -webkit-transition: all 400ms;\r\n  transition: all 400ms;\r\n  .nav-list {\r\n    grid-column-start: 1;\r\n    grid-column-end: 12;\r\n    list-style: none;\r\n    margin: 0;\r\n    padding: 0;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -webkit-box-pack: start;\r\n        -ms-flex-pack: start;\r\n            justify-content: flex-start;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    text-align: center;\r\n    .nav-list-item {\r\n      width: 100%;\r\n      .nav-list-item-anchor {\r\n        display: block;\r\n        color: white;\r\n        text-decoration: none;\r\n        padding: 0.5em;\r\n        &.active, &:hover, &.nav-dropdown-show {\r\n          background-color: $_dropdownBGColor;\r\n        }\r\n      }\r\n      .nav-dropdown-name {\r\n        display: block;\r\n        -webkit-box-sizing: border-box;\r\n                box-sizing: border-box;\r\n      }\r\n      .nav-dropdown-toggle {\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        -webkit-box-align: center;\r\n            -ms-flex-align: center;\r\n                align-items: center;\r\n        -webkit-box-pack: center;\r\n            -ms-flex-pack: center;\r\n                justify-content: center;\r\n      }\r\n      .nav-dropdown-toggle-caret {\r\n        margin-left: 0.5em;\r\n      }\r\n      .nav-dropdown {\r\n        height: 0;\r\n\r\n        background-color: $_dropdownBGColor;\r\n        -webkit-transition: opacity 200ms;\r\n        transition: opacity 200ms;\r\n        display: none;\r\n        &.dropdown-show {\r\n          height: auto;\r\n          display: -webkit-box;\r\n          display: -ms-flexbox;\r\n          display: flex;\r\n          -webkit-box-orient: vertical;\r\n          -webkit-box-direction: normal;\r\n              -ms-flex-direction: column;\r\n                  flex-direction: column;\r\n          -webkit-box-align: center;\r\n              -ms-flex-align: center;\r\n                  align-items: center;\r\n        }\r\n      }\r\n      .nav-dropdown a {\r\n        -webkit-box-sizing: border-box;\r\n                box-sizing: border-box;\r\n        padding: 0.5em 0;\r\n        color: white;\r\n        text-decoration: none;\r\n        white-space: nowrap;\r\n        width: 100%;\r\n        &:hover {\r\n          background-color: lighten($_dropdownBGColor, 10%);\r\n        }\r\n      }\r\n    }\r\n    .nav-list-item-main > .nav-menu-toggle {\r\n      display: block;\r\n      background-color: transparent;\r\n      border: 0;\r\n      padding: 1em;\r\n      &:hover {\r\n        background-color: $_dropdownBGColor;\r\n      }\r\n    }\r\n    .nav-main {\r\n      background-color: $_navBlack;\r\n      height: 0;\r\n      opacity: 0;\r\n      overflow: hidden;\r\n      &.menu-open {\r\n        height: auto;\r\n        opacity: 1;\r\n      }\r\n    }\r\n    & > .nav-list-item.nav-list-item-main {\r\n      display: -webkit-box;\r\n      display: -ms-flexbox;\r\n      display: flex;\r\n      -webkit-box-pack: justify;\r\n          -ms-flex-pack: justify;\r\n              justify-content: space-between;\r\n    }\r\n  }\r\n}\r\n@media screen and (min-width: 768px) {\r\n  nav {\r\n    .nav-list {\r\n      grid-column-start: 2;\r\n      grid-column-end: 14;\r\n      -webkit-box-orient: horizontal;\r\n      -webkit-box-direction: normal;\r\n          -ms-flex-direction: row;\r\n              flex-direction: row;\r\n      .nav-list-item {\r\n        width: auto;\r\n        &.nav-list-item-dropdown {\r\n          position: relative;\r\n        }\r\n        .nav-dropdown {\r\n          position: absolute;\r\n          z-index: 10;\r\n          top: 100%;\r\n          left: 0;\r\n          -webkit-box-align: start;\r\n              -ms-flex-align: start;\r\n                  align-items: start;\r\n          padding: 0.4em 0;\r\n        }\r\n        .nav-dropdown a {\r\n          -webkit-box-sizing: border-box;\r\n                  box-sizing: border-box;\r\n          width: 100%;\r\n          text-align: left;\r\n          padding: 0.2em 1em;\r\n        }\r\n      }\r\n      .nav-list-item.nav-list-item-main > .nav-menu-toggle {\r\n        display: none;\r\n      }\r\n      .nav-main {\r\n        height: auto;\r\n        padding: 0;\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        position: static;\r\n        opacity: 1;\r\n        overflow: visible;\r\n        .nav-list .nav-list-item {\r\n          margin-right: 1em;\r\n        }\r\n        .nav-main-menu {\r\n\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/scss/test.scss":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/scss/test.scss ***!
  \***************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: blue;\n}\n\n.container {\n  padding: 1rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background: -webkit-gradient(linear, left bottom, left top, from(black), to(white));\n  background: linear-gradient(to top, black, white);\n}\n.container h1 {\n  font-size: 68px;\n  text-align: center;\n}", "",{"version":3,"sources":["webpack://./src/scss/test.scss"],"names":[],"mappings":"AAEA;EACI,sBAHC;AAEL;;AAIA;EACI,aAAA;EACA,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,mFAAA;EACA,iDAAA;AADJ;AAEI;EACI,eAAA;EACA,kBAAA;AAAR","sourcesContent":["$bg: blue;\r\n\r\nbody {\r\n    background-color: $bg;\r\n}\r\n\r\n.container {\r\n    padding: 1rem;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    background: -webkit-gradient(linear, left bottom, left top, from(black), to(white));\r\n    background: linear-gradient(to top, black, white);\r\n    h1 {\r\n        font-size: 68px;\r\n        text-align: center;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ (function(module) {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/scss/_partials/_carousel.scss":
/*!*******************************************!*\
  !*** ./src/scss/_partials/_carousel.scss ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_carousel_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/postcss-loader/dist/cjs.js!./_carousel.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/scss/_partials/_carousel.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_carousel_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_carousel_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/scss/_partials/_navbar.scss":
/*!*****************************************!*\
  !*** ./src/scss/_partials/_navbar.scss ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/postcss-loader/dist/cjs.js!./_navbar.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/scss/_partials/_navbar.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/scss/test.scss":
/*!****************************!*\
  !*** ./src/scss/test.scss ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_test_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!./test.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/scss/test.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_test_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_test_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!****************************!*\
  !*** ./src/js/neso-src.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavBar": function() { return /* reexport safe */ _classes_NavBar_js__WEBPACK_IMPORTED_MODULE_0__.default; },
/* harmony export */   "Carousel": function() { return /* reexport safe */ _classes_Carousel_js__WEBPACK_IMPORTED_MODULE_1__.default; }
/* harmony export */ });
/* harmony import */ var _classes_NavBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/NavBar.js */ "./src/js/classes/NavBar.js");
/* harmony import */ var _classes_Carousel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Carousel.js */ "./src/js/classes/Carousel.js");



}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=neso.js.map