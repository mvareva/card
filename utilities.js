(() => {
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __markAsModule = (target) => __defProp(target, "__esModule", {
		value: true
	});
	var __commonJS = (cb, mod) => function __require() {
		return mod || (0, cb[Object.keys(cb)[0]])((mod = {
			exports: {}
		}).exports, mod), mod.exports;
	};
	var __reExport = (target, module, desc) => {
		if (module && typeof module === "object" || typeof module === "function") {
			for (let key of __getOwnPropNames(module))
				if (!__hasOwnProp.call(target, key) && key !== "default")
					__defProp(target, key, {
						get: () => module[key],
						enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable
					});
		}
		return target;
	};
	var __toModule = (module) => {
		return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {
			get: () => module.default,
			enumerable: true
		} : {
			value: module,
			enumerable: true
		})), module);
	};

	// ns-hugo:/home/runner/work/cv/cv/assets/scripts/libraries/smooth-scroll.js
	var require_smooth_scroll = __commonJS({
		"ns-hugo:/home/runner/work/cv/cv/assets/scripts/libraries/smooth-scroll.js"(exports, module) {
			"use strict";

			function polyfill() {
				var w = window;
				var d = document;
				if ("scrollBehavior" in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {
					return;
				}
				var Element = w.HTMLElement || w.Element;
				var SCROLL_TIME = 468;
				var original = {
					scroll: w.scroll || w.scrollTo,
					scrollBy: w.scrollBy,
					elementScroll: Element.prototype.scroll || scrollElement,
					scrollIntoView: Element.prototype.scrollIntoView
				};
				var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;

				function isMicrosoftBrowser(userAgent) {
					var userAgentPatterns = ["MSIE ", "Trident/", "Edge/"];
					return new RegExp(userAgentPatterns.join("|")).test(userAgent);
				}
				var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

				function scrollElement(x, y) {
					this.scrollLeft = x;
					this.scrollTop = y;
				}

				function ease(k) {
					return 0.5 * (1 - Math.cos(Math.PI * k));
				}

				function shouldBailOut(firstArg) {
					if (firstArg === null || typeof firstArg !== "object" || firstArg.behavior === void 0 || firstArg.behavior === "auto" || firstArg.behavior === "instant") {
						return true;
					}
					if (typeof firstArg === "object" && firstArg.behavior === "smooth") {
						return false;
					}
					throw new TypeError("behavior member of ScrollOptions " + firstArg.behavior + " is not a valid value for enumeration ScrollBehavior.");
				}

				function hasScrollableSpace(el, axis) {
					if (axis === "Y") {
						return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
					}
					if (axis === "X") {
						return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
					}
				}

				function canOverflow(el, axis) {
					var overflowValue = w.getComputedStyle(el, null)["overflow" + axis];
					return overflowValue === "auto" || overflowValue === "scroll";
				}

				function isScrollable(el) {
					var isScrollableY = hasScrollableSpace(el, "Y") && canOverflow(el, "Y");
					var isScrollableX = hasScrollableSpace(el, "X") && canOverflow(el, "X");
					return isScrollableY || isScrollableX;
				}

				function findScrollableParent(el) {
					while (el !== d.body && isScrollable(el) === false) {
						el = el.parentNode || el.host;
					}
					return el;
				}

				function step(context) {
					var time = now();
					var value;
					var currentX;
					var currentY;
					var elapsed = (time - context.startTime) / SCROLL_TIME;
					elapsed = elapsed > 1 ? 1 : elapsed;
					value = ease(elapsed);
					currentX = context.startX + (context.x - context.startX) * value;
					currentY = context.startY + (context.y - context.startY) * value;
					context.method.call(context.scrollable, currentX, currentY);
					if (currentX !== context.x || currentY !== context.y) {
						w.requestAnimationFrame(step.bind(w, context));
					}
				}

				function smoothScroll(el, x, y) {
					var scrollable;
					var startX;
					var startY;
					var method;
					var startTime = now();
					scrollable = el;
					startX = el.scrollLeft;
					startY = el.scrollTop;
					method = scrollElement;
					step({
						scrollable,
						method,
						startTime,
						startX,
						startY,
						x: 0,
						y
					});
				}
				w.scroll = w.scrollTo = function() {
					if (arguments[0] === void 0) {
						return;
					}
					if (shouldBailOut(arguments[0]) === true) {
						original.scroll.call(w, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] !== "object" ? arguments[0] : w.scrollX || w.pageXOffset, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : w.scrollY || w.pageYOffset);
						return;
					}
					smoothScroll.call(w, d.body, arguments[0].left !== void 0 ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== void 0 ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
				};
				w.scrollBy = function() {
					if (arguments[0] === void 0) {
						return;
					}
					if (shouldBailOut(arguments[0])) {
						original.scrollBy.call(w, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] !== "object" ? arguments[0] : 0, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : 0);
						return;
					}
					smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
				};
				Element.prototype.scroll = Element.prototype.scrollTo = function() {
					if (arguments[0] === void 0) {
						return;
					}
					if (shouldBailOut(arguments[0]) === true) {
						if (typeof arguments[0] === "number" && arguments[1] === void 0) {
							throw new SyntaxError("Value could not be converted");
						}
						original.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left : typeof arguments[0] !== "object" ? ~~arguments[0] : this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top : arguments[1] !== void 0 ? ~~arguments[1] : this.scrollTop);
						return;
					}
					var left = arguments[0].left;
					var top = arguments[0].top;
					smoothScroll.call(this, this, typeof left === "undefined" ? this.scrollLeft : ~~left, typeof top === "undefined" ? this.scrollTop : ~~top);
				};
				Element.prototype.scrollBy = function() {
					if (arguments[0] === void 0) {
						return;
					}
					if (shouldBailOut(arguments[0]) === true) {
						original.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
						return;
					}
					this.scroll({
						left: ~~arguments[0].left + this.scrollLeft,
						top: ~~arguments[0].top + this.scrollTop,
						behavior: arguments[0].behavior
					});
				};
				Element.prototype.scrollIntoView = function() {
					if (shouldBailOut(arguments[0]) === true) {
						original.scrollIntoView.call(this, arguments[0] === void 0 ? true : arguments[0]);
						return;
					}
					var scrollableParent = findScrollableParent(this);
					var parentRects = scrollableParent.getBoundingClientRect();
					var clientRects = this.getBoundingClientRect();
					var clientLeft = clientRects.left - parseInt(w.getComputedStyle(this).scrollMarginLeft, 10);
					var clientTop = clientRects.top - parseInt(w.getComputedStyle(this).scrollMarginTop, 10);
					smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientLeft - parentRects.left, scrollableParent.scrollTop + clientTop - parentRects.top);
				};
			}
			if (typeof exports === "object" && typeof module !== "undefined") {
				module.exports = {
					polyfill
				};
			} else {
				polyfill();
			}
		}
	});

	// ns-hugo:/home/runner/work/cv/cv/assets/scripts/utilities/focus.js
	var ShowFocusClass = "focus";
	var Focus = class {
		constructor() {
			ShowFocusOnTabPress();
			RemoveFocusOnClick();
		}
	};
	var ShowFocusOnTabPress = () => {
		document.addEventListener("keydown", (e) => {
			if (e.which == 9) {
				document.documentElement.classList.add(ShowFocusClass);
			}
		});
	};
	var RemoveFocusOnClick = () => {
		document.addEventListener("click", (e) => {
			if (e.clientX == 0 && e.clientY == 0)
				return;
			document.documentElement.classList.remove(ShowFocusClass);
		});
	};

	// ns-hugo:/home/runner/work/cv/cv/assets/scripts/utilities/viewporter.js
	var html = document.documentElement;
	var checkElementDims = (cssProperties) => {
		const testElement = document.createElement("div");
		testElement.style.cssText = cssProperties;
		html.insertBefore(testElement, html.firstChild);
		const testElementDims = {
			"width": testElement.offsetWidth,
			"height": testElement.offsetHeight
		};
		html.removeChild(testElement);
		return testElementDims;
	};
	var updateValue = (cssVariable, cssValue) => {
		cssValue ? html.style.setProperty(cssVariable, ` ${cssValue}px`) : html.style.removeProperty(cssVariable);
	};
	var updateVhOffset = () => {
		const initialVisibleHeight = checkElementDims("position: fixed; top: 0; bottom: 0;")["height"];
		const visibleHeight = window.innerHeight;
		const vh100 = checkElementDims("position: fixed; top: 0; height: 100vh")["height"];
		const vhOffset = vh100 - Math.min(initialVisibleHeight, visibleHeight);
		updateValue("--vh--offset", vhOffset);
		if (vhOffset)
			updateValue("--vh--initial", visibleHeight);
	};
	var updateScrollbarWidth = () => {
		html.style.setProperty(`overflow-y`, ` scroll`);
		const percent100 = checkElementDims("position: fixed; top: 0; width: 100%; height: 200vh;")["width"];
		const scrollbarWidth = window.innerWidth - percent100;
		html.style.removeProperty(`overflow-y`);
		updateValue("--scrollbar", scrollbarWidth);
	};
	var Viewporter = class {
		constructor() {
			this.orientationChanged = false;
			document.addEventListener("DOMContentLoaded", () => {
				updateVhOffset();
				updateScrollbarWidth();
			});
			window.addEventListener("orientationchange", () => {
				this.orientationChanged = true;
				setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
				setTimeout(() => this.orientationChanged = false, 750);
			});
			window.addEventListener("resize", () => {
				updateScrollbarWidth();
				if (this.orientationChanged)
					updateVhOffset();
			});
		}
	};

	// <stdin>
	var import_smooth_scroll = __toModule(require_smooth_scroll());
	new Focus();
	new Viewporter();
	new import_smooth_scroll.default.polyfill();
})();
