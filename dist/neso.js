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

/***/ "./src/js/classes/Carousel.js":
/*!************************************!*\
  !*** ./src/js/classes/Carousel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Carousel)\n/* harmony export */ });\nclass Carousel {\n  constructor(element) {\n    this.carousel = element;\n    this.currentItem = 0;\n    this.items = this.carousel.querySelectorAll('.carousel-item');\n    this.track = this.carousel.querySelector('.carousel-track');\n    this.indicators = this.carousel.querySelectorAll('.carousel-indicator');\n    this.registerListeners();\n  }\n\n  registerListeners() {\n    this.carousel.addEventListener('click', event => {\n      if (event.target.matches('.carousel-indicator')) {\n        this.pause();\n        this.slideTo(event.target.getAttribute('data-slide-to'));\n        this.play();\n      }\n\n      if (event.target.closest('.carousel-prev')) {\n        this.pause();\n        this.slideTo(this.getPreviousItem());\n        this.play();\n      }\n\n      if (event.target.closest('.carousel-next')) {\n        this.pause();\n        this.slideTo(this.getNextItem());\n        this.play();\n      }\n    });\n\n    window.onresize = () => {\n      this.track.scrollLeft = this.calculateTrackScrollLeft();\n    };\n  }\n\n  slideTo(itemTo) {\n    this.setCurrentItem(itemTo);\n    this.track.scrollTo({\n      behavior: \"smooth\",\n      top: 0,\n      left: this.calculateTrackScrollLeft()\n    });\n    this.indicators.forEach((indicator, key) => {\n      if (indicator.classList.contains('active')) {\n        indicator.classList.remove('active');\n      }\n\n      if (this.currentItem == key) {\n        indicator.classList.add('active');\n      }\n    });\n  }\n\n  play() {\n    this.interval = setInterval(() => {\n      this.slideTo(this.getNextItem());\n    }, 5000);\n  }\n\n  pause() {\n    clearInterval(this.interval);\n  }\n\n  setCurrentItem(item) {\n    this.currentItem = parseInt(item);\n  }\n\n  calculateTrackScrollLeft() {\n    return Math.floor(this.track.scrollWidth * (this.currentItem / this.items.length));\n  }\n\n  getNextItem() {\n    if (this.currentItem === this.items.length - 1) {\n      return 0;\n    } else {\n      return this.currentItem + 1;\n    }\n  }\n\n  getPreviousItem() {\n    if (this.currentItem === 0) {\n      return this.items.length - 1;\n    } else {\n      return this.currentItem - 1;\n    }\n  }\n\n}\n\n//# sourceURL=webpack://Neso/./src/js/classes/Carousel.js?");

/***/ }),

/***/ "./src/js/classes/NavBar.js":
/*!**********************************!*\
  !*** ./src/js/classes/NavBar.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NavBar)\n/* harmony export */ });\n/* harmony import */ var _scss_partials_navbar_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/_partials/_navbar.scss */ \"./src/scss/_partials/_navbar.scss\");\n\nclass NavBar {\n  constructor(navBar) {\n    this.navBar = navBar;\n    this.toggleBtn = navBar.querySelector('.nav-menu-toggle');\n    this.menu = this.navBar.querySelector('.nav-main');\n    this.animation = null;\n    this.isClosing = false;\n    this.isExpanding = false;\n    this.isMenuOpen = false;\n    this.registerListeners();\n  }\n\n  registerListeners() {\n    this.navBar.addEventListener('click', event => {\n      if (event.target.closest('.nav-menu-toggle')) {\n        this.toggleBtnClick(event);\n      }\n\n      if (event.target.closest('.nav-dropdown-toggle')) {\n        this.openOrCloseNavDropdown(event);\n      }\n    }, false);\n    this.navBar.closest('body').addEventListener('click', event => {\n      if (!event.target.closest('.nav-dropdown-toggle')) {\n        this.navBar.querySelectorAll('.dropdown-show').forEach((shownDropdown, i) => {\n          this.toggleNavDropdown(shownDropdown);\n        });\n      }\n    });\n  }\n\n  openOrCloseNavMenu() {\n    const navMenu = this.navBar.querySelector('.nav-main');\n    const dropdowns = this.navBar.querySelectorAll('.nav-dropdown');\n    navMenu.classList.toggle('nav-active');\n\n    if (!navMenu.classList.contains('nav-active')) {\n      this.navBar.querySelectorAll('.dropdown-show').forEach((shownDropdown, i) => {\n        this.toggleNavDropdown(shownDropdown);\n      });\n    }\n  }\n\n  openOrCloseNavDropdown(e) {\n    const nav = this.navBar.querySelector('nav');\n    const dropdown = e.target.closest('.nav-list-item').querySelector('.nav-dropdown');\n\n    if (this.navBar.querySelectorAll('.dropdown-show').length > 0) {\n      this.navBar.querySelectorAll('.dropdown-show').forEach((shownDropdown, i) => {\n        if (shownDropdown !== dropdown) {\n          this.toggleNavDropdown(shownDropdown);\n        }\n      });\n    }\n\n    this.toggleNavDropdown(dropdown);\n  }\n\n  toggleNavDropdown(dropdown) {\n    dropdown.classList.toggle('dropdown-show');\n    dropdown.parentNode.querySelector('.nav-dropdown-toggle').classList.toggle('nav-dropdown-show');\n  } // Function called when user clicks on the nav menu toggle\n\n\n  toggleBtnClick(event) {\n    event.preventDefault();\n\n    if (this.isClosing || !this.isNavMenuOpen) {\n      this.openMenu();\n    } else if (this.isExpanding || this.isNavMenuOpen) {\n      this.closeMenu();\n    }\n  } // Function called to close the content with an animation\n\n\n  closeMenu() {\n    this.isClosing = true;\n    const startHeight = `${this.menu.offsetHeight}px`;\n    const endHeight = '0px';\n\n    if (this.animation) {\n      this.animation.cancel();\n    }\n\n    this.animation = this.menu.animate({\n      height: [startHeight, endHeight],\n      opacity: [1, 0]\n    }, {\n      duration: 400,\n      easing: 'ease-out'\n    });\n    this.menu.style.height = endHeight;\n\n    this.animation.onfinish = () => this.onAnimationFinish(false);\n\n    this.animation.oncancel = () => this.isClosing = false;\n  } // Function called to open the element after click\n\n\n  openMenu() {\n    this.isNavMenuOpen = true;\n    window.requestAnimationFrame(() => this.expand());\n  } // Function called to expand the content with an animation\n\n\n  expand() {\n    this.isExpanding = true;\n    const startHeight = `0px`;\n    const endHeight = `${this.menu.querySelector('.nav-list').offsetHeight}px`;\n\n    if (this.animation) {\n      this.animation.cancel();\n    }\n\n    this.animation = this.menu.animate({\n      height: [startHeight, endHeight],\n      opacity: [0, 1]\n    }, {\n      duration: 400,\n      easing: 'ease-out'\n    });\n    this.menu.style.height = endHeight;\n    this.menu.style.opacity = 1;\n\n    this.animation.onfinish = () => this.onAnimationFinish(true);\n\n    this.animation.oncancel = () => this.isExpanding = false;\n  } // Callback when the shrink or expand animations are done\n\n\n  onAnimationFinish(isNavMenuOpen) {\n    this.isNavMenuOpen = isNavMenuOpen;\n    this.menu.classList.toggle('menu-open', isNavMenuOpen);\n    this.animation = null;\n    this.isClosing = false;\n    this.isExpanding = false;\n\n    if (this.isNavMenuOpen) {\n      this.menu.style.height = 'auto';\n    }\n  }\n\n}\n\n//# sourceURL=webpack://Neso/./src/js/classes/NavBar.js?");

/***/ }),

/***/ "./src/js/neso-src.js":
/*!****************************!*\
  !*** ./src/js/neso-src.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NavBar\": () => (/* reexport safe */ _classes_NavBar_js__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"Carousel\": () => (/* reexport safe */ _classes_Carousel_js__WEBPACK_IMPORTED_MODULE_1__.default)\n/* harmony export */ });\n/* harmony import */ var _classes_NavBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/NavBar.js */ \"./src/js/classes/NavBar.js\");\n/* harmony import */ var _classes_Carousel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Carousel.js */ \"./src/js/classes/Carousel.js\");\n\n\n\n\n//# sourceURL=webpack://Neso/./src/js/neso-src.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/_partials/_navbar.scss":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/_partials/_navbar.scss ***!
  \**********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"nav {\\n  position: sticky;\\n  top: 0;\\n  z-index: 10;\\n  background-color: #1b1b1b;\\n  box-sizing: border-box;\\n  transition: all 400ms;\\n}\\nnav .nav-list {\\n  grid-column-start: 1;\\n  grid-column-end: 12;\\n  list-style: none;\\n  margin: 0;\\n  padding: 0;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: flex-start;\\n  align-items: center;\\n  text-align: center;\\n}\\nnav .nav-list .nav-list-item {\\n  width: 100%;\\n}\\nnav .nav-list .nav-list-item .nav-list-item-anchor {\\n  display: block;\\n  color: white;\\n  text-decoration: none;\\n  padding: 0.5em;\\n}\\nnav .nav-list .nav-list-item .nav-list-item-anchor.active, nav .nav-list .nav-list-item .nav-list-item-anchor:hover, nav .nav-list .nav-list-item .nav-list-item-anchor.nav-dropdown-show {\\n  background-color: #353535;\\n}\\nnav .nav-list .nav-list-item .nav-dropdown-name {\\n  display: block;\\n  box-sizing: border-box;\\n}\\nnav .nav-list .nav-list-item .nav-dropdown-toggle {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n}\\nnav .nav-list .nav-list-item .nav-dropdown-toggle-caret {\\n  margin-left: 0.5em;\\n}\\nnav .nav-list .nav-list-item .nav-dropdown {\\n  height: 0;\\n  background-color: #353535;\\n  transition: opacity 200ms;\\n  display: none;\\n}\\nnav .nav-list .nav-list-item .nav-dropdown.dropdown-show {\\n  height: auto;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n}\\nnav .nav-list .nav-list-item .nav-dropdown a {\\n  box-sizing: border-box;\\n  padding: 0.5em 0;\\n  color: white;\\n  text-decoration: none;\\n  white-space: nowrap;\\n  width: 100%;\\n}\\nnav .nav-list .nav-list-item .nav-dropdown a:hover {\\n  background-color: #4e4e4e;\\n}\\nnav .nav-list .nav-list-item-main > .nav-menu-toggle {\\n  display: block;\\n  background-color: transparent;\\n  border: 0;\\n  padding: 1em;\\n}\\nnav .nav-list .nav-list-item-main > .nav-menu-toggle:hover {\\n  background-color: #353535;\\n}\\nnav .nav-list .nav-main {\\n  background-color: #1b1b1b;\\n  height: 0;\\n  opacity: 0;\\n  overflow: hidden;\\n}\\nnav .nav-list .nav-main.menu-open {\\n  height: auto;\\n  opacity: 1;\\n}\\nnav .nav-list > .nav-list-item.nav-list-item-main {\\n  display: flex;\\n  justify-content: space-between;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://Neso/./src/scss/_partials/_navbar.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://Neso/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./src/scss/_partials/_navbar.scss":
/*!*****************************************!*\
  !*** ./src/scss/_partials/_navbar.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./_navbar.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/_partials/_navbar.scss\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://Neso/./src/scss/_partials/_navbar.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://Neso/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/neso-src.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});