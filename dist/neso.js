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

/***/ "./src/js/classes/navBar.js":
/*!**********************************!*\
  !*** ./src/js/classes/navBar.js ***!
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
    this.navBar.classList.remove('no-js');
    this.menuToggle = this.navBar.querySelector('.nav-menu-toggle');
    this.menu = this.navBar.querySelector('.nav-main-menu');

    if (window.innerWidth >= 768) {
      this.menu.setAttribute('aria-hidden', 'false');
    }

    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.transitionTime = this.prefersReducedMotion ? 10 : 400;
    this.setMenuHeight();
    document.documentElement.style.setProperty('--nav-height', `${this.getMenuHeight()}px`);
    this.easing = 'ease';
    this.animation = null;
    this.isNavMenuOpen = false;
    this.isClosing = false;
    this.isExpanding = false;
    this.currentMenuButton = false;
    this.registerListeners();
    this.calculateOpenMenuHeight();
    this.setAriaAttributes();
  }

  registerListeners() {
    this.navBar.addEventListener('click', event => {
      if (event.target.closest('.nav-menu-toggle')) {
        const menuWasClosed = this.menuToggle.getAttribute('aria-expanded') === 'false';

        if (menuWasClosed) {
          this.menuToggle.setAttribute('aria-expanded', 'true');
          this.menu.setAttribute('aria-hidden', 'false');
        } else {
          this.menuToggle.setAttribute('aria-expanded', 'false');
          this.menu.setAttribute('aria-hidden', 'true');
        }

        this.toggleMainMenu(event);
      }

      if (event.target.closest('.nav-dropdown-toggle')) {
        const button = event.target; // close an open dropdown if there is one

        if (this.currentMenuButton && this.currentMenuButton !== button) {
          this.toggleDropdown(this.currentMenuButton);
        }

        this.toggleDropdown(button);
      }
    }, false);
    document.addEventListener('click', e => {
      this.closeOpenMenu(e);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.menu.setAttribute('aria-hidden', 'false');
        this.menu.removeAttribute('style');
      } else {
        if (!this.isNavMenuOpen) {
          this.menuToggle.setAttribute('aria-expanded', 'false');
          this.menu.setAttribute('aria-hidden', 'true');
        } else {
          this.menu.style.height = 'auto';
        }
      }
    });
  }

  setAriaAttributes() {
    this.navBar.setAttribute('aria-label', 'Site Navigation Menu');

    if (window.innerWidth >= 768) {
      this.menuToggle.setAttribute('aria-expanded', 'true');
      this.menu.setAttribute('aria-hidden', 'false');
    } else {
      this.menuToggle.setAttribute('aria-expanded', 'false');
      this.menu.setAttribute('aria-hidden', 'true');
    }

    this.menuToggle.setAttribute('aria-controls', this.menu.getAttribute('id'));
    this.navBar.querySelectorAll('.nav-list-dropdown').forEach(dropdown => {
      let toggle = dropdown.querySelector('.nav-dropdown-toggle');
      let menu = dropdown.querySelector('.nav-dropdown');
      toggle.setAttribute('aria-controls', menu.getAttribute('id'));
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  }

  closeOpenMenu(e) {
    if (this.currentMenuButton && !e.target.closest('.nav-list-dropdown')) {
      this.toggleDropdown(this.currentMenuButton);
    }
  }

  toggleDropdown(button) {
    const dropdown = document.getElementById(button.getAttribute('aria-controls'));

    if ('true' === button.getAttribute('aria-expanded')) {
      button.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
      this.currentMenuButton = false;
    } else {
      button.setAttribute('aria-expanded', 'true');
      dropdown.setAttribute('aria-hidden', 'false');
      this.currentMenuButton = button;
    }
  } // Function called when user clicks on the nav menu toggle


  toggleMainMenu(event) {
    event.preventDefault();

    if (this.isClosing || !this.isNavMenuOpen) {
      this.openMenu();
    } else if (this.isExpanding || this.isNavMenuOpen) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.isClosing = true;
    const startHeight = `${this.menu.offsetHeight}px`;
    const endHeight = '0px';

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.menu.animate({
      height: [startHeight, endHeight]
    }, {
      duration: this.transitionTime,
      easing: this.easing
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
    const endHeight = `${this.menuHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.menu.animate({
      height: [startHeight, endHeight]
    }, {
      duration: this.transitionTime,
      easing: this.easing
    });
    this.menu.style.height = endHeight;

    this.animation.onfinish = () => this.onAnimationFinish(true);

    this.animation.oncancel = () => this.isExpanding = false;
  } // Callback when the shrink or expand animations are done


  onAnimationFinish(isNavMenuOpen) {
    this.isNavMenuOpen = isNavMenuOpen;
    this.menu.classList.toggle('menu-open', this.isNavMenuOpen);
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;

    if (this.isNavMenuOpen) {
      this.menu.style.height = 'auto';
    }
  }

  getMenuHeight() {
    return this.menuHeight;
  }

  setMenuHeight() {
    this.menuHeight = this.calculateOpenMenuHeight();
  }

  calculateOpenMenuHeight() {
    let height = 0;

    for (let i = 0; i < this.menu.children.length; i++) {
      height += this.menu.children[i].offsetHeight;
    }

    return height;
  }

}

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
___CSS_LOADER_EXPORT___.push([module.id, "nav.neso-nav.no-js .nav-head > .nav-menu-toggle {\n  visibility: hidden;\n}\nnav.neso-nav.no-js .nav-main-menu {\n  height: auto;\n}\nnav.neso-nav.no-js .nav-list-dropdown[focus-within] > .nav-dropdown-toggle {\n  background-color: #d9ffff;\n}\nnav.neso-nav.no-js .nav-list-dropdown[focus-within] > .nav-dropdown {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\nnav.neso-nav.no-js .nav-list-dropdown:focus-within > .nav-dropdown-toggle {\n  background-color: #d9ffff;\n}\nnav.neso-nav.no-js .nav-list-dropdown:focus-within > .nav-dropdown {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\nnav.neso-nav {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  font-family: sans-serif;\n  color: #000000;\n  background-color: #a6ffff;\n}\nnav.neso-nav * {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\nnav.neso-nav .nav-container {\n  width: min(100%, 800px);\n  margin: 0 auto;\n}\nnav.neso-nav .nav-head {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 0.5em;\n}\nnav.neso-nav .nav-head > .nav-brand {\n  color: #000000;\n  text-decoration: none;\n}\nnav.neso-nav .nav-head > .nav-menu-toggle {\n  display: block;\n  border: 0;\n  cursor: pointer;\n  background-color: transparent;\n  padding: 0.5em;\n  height: 32px;\n  width: 32px;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='32' height='32' version='1.1' viewBox='0 0 8.4667 8.4667' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(0 -288.53)' fill='none' stroke='%23000' stroke-linecap='round'%3E%3Cpath d='m1.0583 289.59h6.35' stroke-width='.9466'/%3E%3Cpath d='m1.0583 292.77h6.35' stroke-width='.9466'/%3E%3Cpath d='m1.0583 295.94h6.35' stroke-width='.9466'/%3E%3C/g%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: center;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n}\nnav.neso-nav .nav-head > .nav-menu-toggle:first-child {\n  margin-left: auto;\n}\nnav.neso-nav .nav-head > .nav-menu-toggle > span {\n  position: absolute;\n  clip: rect(1px, 1px, 1px, 1px);\n  padding: 0;\n  border: 0;\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n}\nnav.neso-nav .nav-head > .nav-menu-toggle:hover {\n  background-color: #d9ffff;\n}\nnav.neso-nav .nav-main-menu {\n  -webkit-transition: height 400ms;\n  transition: height 400ms;\n  overflow: hidden;\n}\nnav.neso-nav .nav-main-menu[aria-hidden=true] {\n  visibility: hidden;\n  height: 0;\n}\nnav.neso-nav .nav-main-menu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  text-align: center;\n}\nnav.neso-nav .nav-main-menu .nav-list-item {\n  width: 100%;\n}\nnav.neso-nav .nav-main-menu .nav-list-item.nav-list-dropdown > .nav-dropdown-toggle[aria-expanded=true] {\n  background-color: #d9ffff;\n}\nnav.neso-nav .nav-main-menu .nav-list-item.nav-list-dropdown > .nav-dropdown-toggle[aria-expanded=true] ~ .nav-dropdown {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\nnav.neso-nav .nav-main-menu .nav-list-item .nav-list-item-anchor {\n  display: block;\n  width: 100%;\n  color: #000000;\n  text-decoration: none;\n  padding: 0.5em;\n  cursor: pointer;\n}\nnav.neso-nav .nav-main-menu .nav-list-item .nav-list-item-anchor.active, nav.neso-nav .nav-main-menu .nav-list-item .nav-list-item-anchor:hover {\n  background-color: #d9ffff;\n}\nnav.neso-nav .nav-main-menu .nav-list-item .nav-dropdown-name {\n  display: block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\nnav.neso-nav .nav-main-menu .nav-list-item .nav-dropdown-toggle {\n  display: block;\n  border: none;\n  background-color: #a6ffff;\n  font-size: 1em;\n}\nnav.neso-nav .nav-main-menu .nav-list-item .nav-dropdown-toggle::after {\n  content: \"\";\n  display: inline-block;\n  height: 10px;\n  width: 10px;\n  margin-left: 0.5em;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='2.6458mm' height='2.3207mm' version='1.1' viewBox='0 0 2.6458 2.3207' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='matrix(.66666 0 0 .66666 -27.141 -84.563)'%3E%3Cpath d='m40.876 127.01h3.6398l-1.8199 3.1521z' fill='%23000000' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='.32901' style='paint-order:normal'/%3E%3C/g%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: center;\n  text-decoration: none;\n}\nnav.neso-nav .nav-main-menu .nav-list-item .nav-dropdown {\n  background-color: #d9ffff;\n  display: none;\n  list-style: none;\n  padding-left: 0;\n}\nnav.neso-nav .nav-main-menu .nav-list-item .nav-dropdown > li {\n  width: 100%;\n}\nnav.neso-nav .nav-main-menu .nav-list-item .nav-dropdown[aria-hidden=false] {\n  visibility: visible;\n}\nnav.neso-nav .nav-main-menu .nav-list-item .nav-dropdown a {\n  display: block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 0.5em 0;\n  color: #000000;\n  text-decoration: none;\n  white-space: nowrap;\n}\nnav.neso-nav .nav-main-menu .nav-list-item .nav-dropdown a:hover {\n  background-color: #f2ffff;\n}\n\n@media screen and (min-width: 768px) {\n  nav.neso-nav.no-js .nav-list-dropdown:hover > .nav-dropdown-toggle {\n    background-color: #d9ffff;\n  }\n  nav.neso-nav.no-js .nav-list-dropdown:hover > .nav-dropdown {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  nav.neso-nav .nav-container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  nav.neso-nav .nav-head > .nav-menu-toggle {\n    visibility: hidden;\n  }\n  nav.neso-nav .nav-main-menu {\n    padding: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    position: static;\n    overflow: visible;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  nav.neso-nav .nav-main-menu[aria-hidden=false] {\n    height: auto;\n  }\n  nav.neso-nav .nav-main-menu .nav-list-item {\n    width: auto;\n  }\n  nav.neso-nav .nav-main-menu .nav-list-item:not(:last-child) {\n    margin-right: 0.5em;\n  }\n  nav.neso-nav .nav-main-menu .nav-list-item.nav-list-dropdown {\n    position: relative;\n  }\n  nav.neso-nav .nav-main-menu .nav-list-item .nav-dropdown {\n    position: absolute;\n    z-index: 10;\n    top: 100%;\n    left: 0;\n    -webkit-box-align: start;\n    -ms-flex-align: start;\n    align-items: start;\n    padding: 0.4em 0;\n  }\n  nav.neso-nav .nav-main-menu .nav-list-item .nav-dropdown a {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    width: 100%;\n    text-align: left;\n    padding: 0.2em 1em;\n  }\n}\nnav.neso-nav.neso-nav-dark {\n  background-color: #1b1b1b;\n  color: #FFFFFF;\n}\nnav.neso-nav.neso-nav-dark.no-js .nav-list-dropdown:hover > .nav-dropdown-toggle, nav.neso-nav.neso-nav-dark.no-js .nav-list-dropdown[focus-within] > .nav-dropdown-toggle {\n  background-color: #353535;\n}\nnav.neso-nav.neso-nav-dark.no-js .nav-list-dropdown:hover > .nav-dropdown-toggle, nav.neso-nav.neso-nav-dark.no-js .nav-list-dropdown:focus-within > .nav-dropdown-toggle {\n  background-color: #353535;\n}\nnav.neso-nav.neso-nav-dark .nav-head > .nav-menu-toggle {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='32' height='32' version='1.1' viewBox='0 0 8.4667 8.4667' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(0 -288.53)' fill='none' stroke='%23FFF' stroke-linecap='round'%3E%3Cpath d='m1.0583 289.59h6.35' stroke-width='.9466'/%3E%3Cpath d='m1.0583 292.77h6.35' stroke-width='.9466'/%3E%3Cpath d='m1.0583 295.94h6.35' stroke-width='.9466'/%3E%3C/g%3E%3C/svg%3E\");\n}\nnav.neso-nav.neso-nav-dark .nav-head > .nav-menu-toggle:hover {\n  background-color: #353535;\n}\nnav.neso-nav.neso-nav-dark .nav-brand {\n  color: #FFFFFF;\n}\nnav.neso-nav.neso-nav-dark .nav-list-item.nav-list-dropdown > .nav-dropdown-toggle[aria-expanded=true] {\n  background-color: #353535;\n}\nnav.neso-nav.neso-nav-dark .nav-list-item .nav-list-item-anchor {\n  color: #FFFFFF;\n}\nnav.neso-nav.neso-nav-dark .nav-list-item .nav-list-item-anchor.active, nav.neso-nav.neso-nav-dark .nav-list-item .nav-list-item-anchor:hover {\n  background-color: #353535;\n}\nnav.neso-nav.neso-nav-dark .nav-list-item .nav-dropdown-toggle {\n  background-color: #1b1b1b;\n}\nnav.neso-nav.neso-nav-dark .nav-list-item .nav-dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='2.6458mm' height='2.3207mm' version='1.1' viewBox='0 0 2.6458 2.3207' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='matrix(.66666 0 0 .66666 -27.141 -84.563)'%3E%3Cpath d='m40.876 127.01h3.6398l-1.8199 3.1521z' fill='%23FFFFFF' stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='.32901' style='paint-order:normal'/%3E%3C/g%3E%3C/svg%3E\");\n}\nnav.neso-nav.neso-nav-dark .nav-list-item .nav-dropdown {\n  background-color: #353535;\n}\nnav.neso-nav.neso-nav-dark .nav-list-item .nav-dropdown a {\n  color: #FFFFFF;\n}\nnav.neso-nav.neso-nav-dark .nav-list-item .nav-dropdown a:hover {\n  background-color: #414141;\n}", "",{"version":3,"sources":["webpack://./src/scss/_partials/_navbar.scss"],"names":[],"mappings":"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","sourcesContent":["@use \"sass:color\";\r\n\r\n$_navBaseColor: darken(#bfffff, 5%);\r\n$_dropdownBGColor: lighten($_navBaseColor, 10%);\r\n$_hoverColor: lighten($_dropdownBGColor, 5%);\r\n$_textColor: #000000;\r\n\r\n@mixin navDropdownShow {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n}\r\n\r\nnav.neso-nav.no-js {\r\n  .nav-head > .nav-menu-toggle {\r\n    visibility: hidden;\r\n  }\r\n  .nav-main-menu {\r\n    height: auto;\r\n  }\r\n  .nav-list-dropdown[focus-within] {\r\n    & > .nav-dropdown-toggle {\r\n      background-color: $_dropdownBGColor;\r\n    }\r\n    & > .nav-dropdown {\r\n      @include navDropdownShow;\r\n    }\r\n  }\r\n  .nav-list-dropdown:focus-within {\r\n    & > .nav-dropdown-toggle {\r\n      background-color: $_dropdownBGColor;\r\n    }\r\n    & > .nav-dropdown {\r\n      @include navDropdownShow;\r\n    }\r\n  }\r\n}\r\n\r\nnav.neso-nav {\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 10;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  font-family: sans-serif;\r\n  color: $_textColor;\r\n  background-color: $_navBaseColor;\r\n  * {\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n  }\r\n  .nav-container {\r\n    width: min(100%, 800px);\r\n    margin: 0 auto;\r\n  }\r\n  .nav-head {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    padding: 0.5em;\r\n  }\r\n  .nav-head > .nav-brand {\r\n    color: $_textColor;\r\n    text-decoration: none;\r\n  }\r\n  .nav-head > .nav-menu-toggle {\r\n    display: block;\r\n    border: 0;\r\n    cursor: pointer;\r\n    background-color: transparent;\r\n    padding: 0.5em;\r\n    height: 32px;\r\n    width: 32px;\r\n    background-image: url(\"data:image/svg+xml,%3Csvg width='32' height='32' version='1.1' viewBox='0 0 8.4667 8.4667' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(0 -288.53)' fill='none' stroke='%23000' stroke-linecap='round'%3E%3Cpath d='m1.0583 289.59h6.35' stroke-width='.9466'/%3E%3Cpath d='m1.0583 292.77h6.35' stroke-width='.9466'/%3E%3Cpath d='m1.0583 295.94h6.35' stroke-width='.9466'/%3E%3C/g%3E%3C/svg%3E\");\r\n    background-repeat: no-repeat;\r\n    background-position: center;\r\n    -webkit-box-sizing: content-box;\r\n            box-sizing: content-box;\r\n    &:first-child {\r\n      margin-left: auto;\r\n    }\r\n    & > span {\r\n      position: absolute;\r\n      clip: rect(1px, 1px, 1px, 1px);\r\n      padding: 0;\r\n      border: 0;\r\n      height: 1px;\r\n      width: 1px;\r\n      overflow: hidden;\r\n    }\r\n    &:hover {\r\n      background-color: $_dropdownBGColor;\r\n    }\r\n  }\r\n  .nav-main-menu {\r\n    -webkit-transition: height 400ms;\r\n    transition: height 400ms;\r\n    overflow: hidden;\r\n    &[aria-hidden=\"true\"] {\r\n      visibility: hidden;\r\n      height: 0;\r\n    }\r\n  }\r\n  .nav-main-menu {\r\n    list-style: none;\r\n    margin: 0;\r\n    padding: 0;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -webkit-box-pack: start;\r\n        -ms-flex-pack: start;\r\n            justify-content: flex-start;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    text-align: center;\r\n    .nav-list-item {\r\n      width: 100%;\r\n      &.nav-list-dropdown {\r\n        & > .nav-dropdown-toggle[aria-expanded=\"true\"] {\r\n          background-color: $_dropdownBGColor;\r\n          & ~ .nav-dropdown {\r\n            @include navDropdownShow;\r\n          }\r\n        }\r\n      }\r\n      .nav-list-item-anchor {\r\n        display: block;\r\n        width: 100%;\r\n        color: $_textColor;\r\n        text-decoration: none;\r\n        padding: 0.5em;\r\n        cursor: pointer;\r\n        &.active, &:hover {\r\n          background-color: $_dropdownBGColor;\r\n        }\r\n      }\r\n      .nav-dropdown-name {\r\n        display: block;\r\n        -webkit-box-sizing: border-box;\r\n                box-sizing: border-box;\r\n      }\r\n      .nav-dropdown-toggle {\r\n        display: block;\r\n        border: none;\r\n        background-color: $_navBaseColor;\r\n        font-size: 1em;\r\n        &::after {\r\n          content: \"\";\r\n          display: inline-block;\r\n          height: 10px;\r\n          width: 10px;\r\n          margin-left: 0.5em;\r\n          background-image: url(\"data:image/svg+xml,%3Csvg width='2.6458mm' height='2.3207mm' version='1.1' viewBox='0 0 2.6458 2.3207' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='matrix(.66666 0 0 .66666 -27.141 -84.563)'%3E%3Cpath d='m40.876 127.01h3.6398l-1.8199 3.1521z' fill='%23000000' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='.32901' style='paint-order:normal'/%3E%3C/g%3E%3C/svg%3E\");\r\n          background-repeat: no-repeat;\r\n          background-position: center;\r\n          text-decoration: none;\r\n        }\r\n      }\r\n      .nav-dropdown {\r\n        background-color: $_dropdownBGColor;\r\n        display: none;\r\n        list-style: none;\r\n        padding-left: 0;\r\n        & > li {\r\n          width: 100%;\r\n        }\r\n        &[aria-hidden=\"false\"] {\r\n          visibility: visible;\r\n        }\r\n      }\r\n      .nav-dropdown a {\r\n        display: block;\r\n        -webkit-box-sizing: border-box;\r\n                box-sizing: border-box;\r\n        padding: 0.5em 0;\r\n        color: $_textColor;\r\n        text-decoration: none;\r\n        white-space: nowrap;\r\n        &:hover {\r\n          background-color: $_hoverColor;\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n@media screen and (min-width: 768px) {\r\n  nav.neso-nav.no-js {\r\n    .nav-list-dropdown:hover {\r\n      & > .nav-dropdown-toggle {\r\n        background-color: $_dropdownBGColor;\r\n      }\r\n      & > .nav-dropdown {\r\n        @include navDropdownShow;\r\n      }\r\n    }\r\n  }\r\n  nav.neso-nav {\r\n    .nav-container {\r\n      display: -webkit-box;\r\n      display: -ms-flexbox;\r\n      display: flex;\r\n    }\r\n    .nav-head > .nav-menu-toggle {\r\n      visibility: hidden;\r\n    }\r\n    .nav-main-menu {\r\n      padding: 0;\r\n      display: -webkit-box;\r\n      display: -ms-flexbox;\r\n      display: flex;\r\n      position: static;\r\n      overflow: visible;\r\n      -webkit-box-orient: horizontal;\r\n      -webkit-box-direction: normal;\r\n          -ms-flex-direction: row;\r\n              flex-direction: row;\r\n      &[aria-hidden=\"false\"] {\r\n        height: auto;\r\n      }\r\n      .nav-list-item {\r\n        width: auto;\r\n        &:not(:last-child) {\r\n          margin-right: 0.5em;\r\n        }\r\n        &.nav-list-dropdown {\r\n          position: relative;\r\n        }\r\n        .nav-dropdown {\r\n          position: absolute;\r\n          z-index: 10;\r\n          top: 100%;\r\n          left: 0;\r\n          -webkit-box-align: start;\r\n              -ms-flex-align: start;\r\n                  align-items: start;\r\n          padding: 0.4em 0;\r\n        }\r\n        .nav-dropdown a {\r\n          -webkit-box-sizing: border-box;\r\n                  box-sizing: border-box;\r\n          width: 100%;\r\n          text-align: left;\r\n          padding: 0.2em 1em;\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nnav.neso-nav.neso-nav-dark {\r\n  $_navBaseColor: #1b1b1b;\r\n  $_dropdownBGColor: lighten($_navBaseColor, 10%);\r\n  $_hoverColor: lighten($_dropdownBGColor, 5%);\r\n  $_textColor: #FFFFFF;\r\n\r\n  &.no-js {\r\n    .nav-list-dropdown:hover, .nav-list-dropdown[focus-within] {\r\n      & > .nav-dropdown-toggle {\r\n        background-color: $_dropdownBGColor;\r\n      }\r\n    }\r\n    .nav-list-dropdown:hover, .nav-list-dropdown:focus-within {\r\n      & > .nav-dropdown-toggle {\r\n        background-color: $_dropdownBGColor;\r\n      }\r\n    }\r\n  }\r\n\r\n  background-color: $_navBaseColor;\r\n  color: $_textColor;\r\n  .nav-head > .nav-menu-toggle {\r\n    background-image: url(\"data:image/svg+xml,%3Csvg width='32' height='32' version='1.1' viewBox='0 0 8.4667 8.4667' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(0 -288.53)' fill='none' stroke='%23FFF' stroke-linecap='round'%3E%3Cpath d='m1.0583 289.59h6.35' stroke-width='.9466'/%3E%3Cpath d='m1.0583 292.77h6.35' stroke-width='.9466'/%3E%3Cpath d='m1.0583 295.94h6.35' stroke-width='.9466'/%3E%3C/g%3E%3C/svg%3E\");\r\n    &:hover {\r\n      background-color: $_dropdownBGColor;\r\n    }\r\n  }\r\n\r\n  .nav-brand {\r\n    color: $_textColor;\r\n  }\r\n\r\n  .nav-list-item {\r\n    &.nav-list-dropdown {\r\n      & > .nav-dropdown-toggle[aria-expanded=\"true\"] {\r\n        background-color: $_dropdownBGColor;\r\n      }\r\n    }\r\n    .nav-list-item-anchor {\r\n      color: $_textColor;\r\n      &.active, &:hover {\r\n        background-color: $_dropdownBGColor;\r\n      }\r\n    }\r\n    .nav-dropdown-toggle {\r\n      background-color: $_navBaseColor;\r\n      &::after {\r\n        background-image: url(\"data:image/svg+xml,%3Csvg width='2.6458mm' height='2.3207mm' version='1.1' viewBox='0 0 2.6458 2.3207' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='matrix(.66666 0 0 .66666 -27.141 -84.563)'%3E%3Cpath d='m40.876 127.01h3.6398l-1.8199 3.1521z' fill='%23FFFFFF' stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='.32901' style='paint-order:normal'/%3E%3C/g%3E%3C/svg%3E\");\r\n      }\r\n    }\r\n    .nav-dropdown {\r\n      background-color: $_dropdownBGColor;\r\n    }\r\n    .nav-dropdown a {\r\n      color: $_textColor;\r\n      &:hover {\r\n        background-color: $_hoverColor;\r\n      }\r\n    }\r\n  }\r\n}"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: white;\n  margin: 0;\n}\n\n.container {\n  padding: 1rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.container h1 {\n  font-size: 68px;\n  text-align: center;\n}", "",{"version":3,"sources":["webpack://./src/scss/test.scss"],"names":[],"mappings":"AAEA;EACI,uBAAA;EACA,SAAA;AADJ;;AAIA;EACI,aAAA;EACA,oBAAA;EACA,oBAAA;EACA,aAAA;AADJ;AAEI;EACI,eAAA;EACA,kBAAA;AAAR","sourcesContent":["$bg: blue;\r\n\r\nbody {\r\n    background-color: white;\r\n    margin: 0;\r\n}\r\n\r\n.container {\r\n    padding: 1rem;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    h1 {\r\n        font-size: 68px;\r\n        text-align: center;\r\n    }\r\n}"],"sourceRoot":""}]);
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
/* harmony export */   "NavBar": function() { return /* reexport safe */ _classes_navBar_js__WEBPACK_IMPORTED_MODULE_0__.default; }
/* harmony export */ });
/* harmony import */ var _classes_navBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/navBar.js */ "./src/js/classes/navBar.js");


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=neso.js.map