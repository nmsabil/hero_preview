/*
 Copyright (c) 2016 Federico Zivolo and contributors
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license  Bootstrap v4.3.1 (https://getbootstrap.com/)
 Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (t) {
     var f = 0;
     return function () {
          return f < t.length ? {
               done: !1,
               value: t[f++]
          } : {
               done: !0
          }
     }
};
$jscomp.arrayIterator = function (t) {
     return {
          next: $jscomp.arrayIteratorImpl(t)
     }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, f, R) {
     if (t == Array.prototype || t == Object.prototype) return t;
     t[f] = R.value;
     return t
};
$jscomp.getGlobal = function (t) {
     t = ["object" == typeof globalThis && globalThis, t, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
     for (var f = 0; f < t.length; ++f) {
          var R = t[f];
          if (R && R.Math == Math) return R
     }
     throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (t, f) {
     var R = $jscomp.propertyToPolyfillSymbol[f];
     if (null == R) return t[f];
     R = t[R];
     return void 0 !== R ? R : t[f]
};
$jscomp.polyfill = function (t, f, R, N) {
     f && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(t, f, R, N) : $jscomp.polyfillUnisolated(t, f, R, N))
};
$jscomp.polyfillUnisolated = function (t, f, R, N) {
     R = $jscomp.global;
     t = t.split(".");
     for (N = 0; N < t.length - 1; N++) {
          var A = t[N];
          if (!(A in R)) return;
          R = R[A]
     }
     t = t[t.length - 1];
     N = R[t];
     f = f(N);
     f != N && null != f && $jscomp.defineProperty(R, t, {
          configurable: !0,
          writable: !0,
          value: f
     })
};
$jscomp.polyfillIsolated = function (t, f, R, N) {
     var A = t.split(".");
     t = 1 === A.length;
     N = A[0];
     N = !t && N in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
     for (var h = 0; h < A.length - 1; h++) {
          var p = A[h];
          if (!(p in N)) return;
          N = N[p]
     }
     A = A[A.length - 1];
     R = $jscomp.IS_SYMBOL_NATIVE && "es6" === R ? N[A] : null;
     f = f(R);
     null != f && (t ? $jscomp.defineProperty($jscomp.polyfills, A, {
          configurable: !0,
          writable: !0,
          value: f
     }) : f !== R && (void 0 === $jscomp.propertyToPolyfillSymbol[A] && ($jscomp.propertyToPolyfillSymbol[A] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(A) :
          $jscomp.POLYFILL_PREFIX + A), A = $jscomp.propertyToPolyfillSymbol[A], $jscomp.defineProperty(N, A, {
               configurable: !0,
               writable: !0,
               value: f
          })))
};
$jscomp.initSymbol = function () { };
$jscomp.polyfill("Symbol", function (t) {
     if (t) return t;
     var f = function (A, h) {
          this.$jscomp$symbol$id_ = A;
          $jscomp.defineProperty(this, "description", {
               configurable: !0,
               writable: !0,
               value: h
          })
     };
     f.prototype.toString = function () {
          return this.$jscomp$symbol$id_
     };
     var R = 0,
          N = function (A) {
               if (this instanceof N) throw new TypeError("Symbol is not a constructor");
               return new f("jscomp_symbol_" + (A || "") + "_" + R++, A)
          };
     return N
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function (t) {
     if (t) return t;
     t = Symbol("Symbol.iterator");
     for (var f = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), R = 0; R < f.length; R++) {
          var N = $jscomp.global[f[R]];
          "function" === typeof N && "function" != typeof N.prototype[t] && $jscomp.defineProperty(N.prototype, t, {
               configurable: !0,
               writable: !0,
               value: function () {
                    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
               }
          })
     }
     return t
}, "es6",
     "es3");
$jscomp.iteratorPrototype = function (t) {
     t = {
          next: t
     };
     t[Symbol.iterator] = function () {
          return this
     };
     return t
};
$jscomp.createTemplateTagFirstArg = function (t) {
     return t.raw = t
};
$jscomp.createTemplateTagFirstArgWithRaw = function (t, f) {
     t.raw = f;
     return t
};
Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
Element.prototype.closest || (Element.prototype.closest = function (t) {
     var f = this;
     if (!document.documentElement.contains(f)) return null;
     do {
          if (f.matches(t)) return f;
          f = f.parentElement || f.parentNode
     } while (null !== f && 1 === f.nodeType);
     return null
});
(function () {
     function t(y) {
          function z(Z) {
               Z.element.removeAttribute("data-cmp-is");
               L(Z.options);
               E(Z.element);
               ba._elements.item && (ba._elements.item = Array.isArray(ba._elements.item) ? ba._elements.item : [ba._elements.item], ba._elements.button = Array.isArray(ba._elements.button) ? ba._elements.button : [ba._elements.button], ba._elements.panel = Array.isArray(ba._elements.panel) ? ba._elements.panel : [ba._elements.panel], ba._properties.singleExpansion && (Z = ta(), 0 === Z.length && V(0), 1 < Z.length && V(Z.length - 1)), ra(), S(),
                    window.Granite && window.Granite.author && window.Granite.author.MessageChannel && (new window.Granite.author.MessageChannel("cqauthor", window)).subscribeRequestMessage("cmp.panelcontainer", function (fa) {
                         if (fa.data && "cmp-accordion" === fa.data.type && fa.data.id === ba._elements.self.dataset.cmpPanelcontainerId && "navigate" === fa.data.operation) {
                              var Fa = ba._properties.singleExpansion;
                              ba._properties.singleExpansion = !0;
                              V(fa.data.index);
                              ba._properties.singleExpansion = Fa
                         }
                    }))
          }
          function E(Z) {
               ba._elements = {};
               ba._elements.self =
                    Z;
               Z = ba._elements.self.querySelectorAll("[data-cmp-hook-accordion]");
               for (var fa = 0; fa < Z.length; fa++) {
                    var Fa = Z[fa];
                    if (Fa.closest(".cmp-accordion") === ba._elements.self) {
                         var Da = "accordion";
                         Da = Da.charAt(0).toUpperCase() + Da.slice(1);
                         Da = Fa.dataset["cmpHook" + Da];
                         ba._elements[Da] ? (Array.isArray(ba._elements[Da]) || (ba._elements[Da] = [ba._elements[Da]]), ba._elements[Da].push(Fa)) : ba._elements[Da] = Fa
                    }
               }
          }
          function L(Z) {
               ba._properties = {};
               for (var fa in u)
                    if (u.hasOwnProperty(fa)) {
                         var Fa = u[fa],
                              Da = null;
                         Z && null != Z[fa] &&
                              (Da = Z[fa], Fa && "function" === typeof Fa.transform && (Da = Fa.transform(Da)));
                         null === Da && (Da = u[fa]["default"]);
                         ba._properties[fa] = Da
                    }
          }
          function S() {
               var Z = ba._elements.button;
               if (Z)
                    for (var fa = 0; fa < Z.length; fa++)(function (Fa) {
                         Z[fa].addEventListener("click", function (Da) {
                              V(Fa);
                              Oa(Fa)
                         });
                         Z[fa].addEventListener("keydown", function (Da) {
                              var W = ba._elements.button.length - 1;
                              switch (Da.keyCode) {
                                   case N.ARROW_LEFT:
                                   case N.ARROW_UP:
                                        Da.preventDefault();
                                        0 < Fa && Oa(Fa - 1);
                                        break;
                                   case N.ARROW_RIGHT:
                                   case N.ARROW_DOWN:
                                        Da.preventDefault();
                                        Fa < W && Oa(Fa + 1);
                                        break;
                                   case N.HOME:
                                        Da.preventDefault();
                                        Oa(0);
                                        break;
                                   case N.END:
                                        Da.preventDefault();
                                        Oa(W);
                                        break;
                                   case N.ENTER:
                                   case N.SPACE:
                                        Da.preventDefault(), V(Fa), Oa(Fa)
                              }
                         })
                    })(fa)
          }
          function V(Z) {
               if (Z = ba._elements.item[Z])
                    if (ba._properties.singleExpansion) {
                         for (var fa = 0; fa < ba._elements.item.length; fa++) ba._elements.item[fa] !== Z && X(ba._elements.item[fa]) && Q(ba._elements.item[fa], !1);
                         Q(Z, !0)
                    } else Q(Z, !X(Z))
          }
          function Q(Z, fa) {
               fa ? Z.setAttribute(p.item.expanded, "") : Z.removeAttribute(p.item.expanded);
               ea(Z)
          }
          function X(Z) {
               return Z &&
                    Z.dataset && void 0 !== Z.dataset.cmpExpanded
          }
          function ea(Z) {
               if (X(Z)) {
                    var fa = ba._elements.item.indexOf(Z); - 1 < fa && (Z = ba._elements.button[fa], fa = ba._elements.panel[fa], Z.classList.add(h.button.expanded), Z.setAttribute("aria-expanded", !0), fa.classList.add(h.panel.expanded), fa.classList.remove(h.panel.hidden), fa.setAttribute("aria-hidden", !1), ba._properties.singleExpansion && (Z.classList.add(h.button.disabled), Z.setAttribute("aria-disabled", !0)))
               } else fa = ba._elements.item.indexOf(Z), -1 < fa && (Z = ba._elements.button[fa],
                    fa = ba._elements.panel[fa], Z.classList.remove(h.button.disabled), Z.classList.remove(h.button.expanded), Z.removeAttribute("aria-disabled"), Z.setAttribute("aria-expanded", !1), fa.classList.add(h.panel.hidden), fa.classList.remove(h.panel.expanded), fa.setAttribute("aria-hidden", !0))
          }
          function ra() {
               for (var Z = 0; Z < ba._elements.item.length; Z++) ea(ba._elements.item[Z])
          }
          function ta() {
               for (var Z = [], fa = 0; fa < ba._elements.item.length; fa++) {
                    var Fa = ba._elements.item[fa];
                    X(Fa) && Z.push(Fa)
               }
               return Z
          }
          function Oa(Z) {
               ba._elements.button[Z].focus()
          }
          var ba = this;
          y && y.element && z(y)
     }
     function f(y) {
          y = y.dataset;
          var z = [],
               E = "accordion";
          E = E.charAt(0).toUpperCase() + E.slice(1);
          E = ["is", "hook" + E];
          for (var L in y)
               if (y.hasOwnProperty(L)) {
                    var S = y[L];
                    0 === L.indexOf("cmp") && (L = L.slice(3), L = L.charAt(0).toLowerCase() + L.substring(1), -1 === E.indexOf(L) && (z[L] = S))
               } return z
     }
     function R() {
          for (var y = document.querySelectorAll(A.self), z = 0; z < y.length; z++) new t({
               element: y[z],
               options: f(y[z])
          });
          y = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
          z = document.querySelector("body");
          (new y(function (E) {
               E.forEach(function (L) {
                    L = [].slice.call(L.addedNodes);
                    0 < L.length && L.forEach(function (S) {
                         S.querySelectorAll && [].slice.call(S.querySelectorAll(A.self)).forEach(function (V) {
                              new t({
                                   element: V,
                                   options: f(V)
                              })
                         })
                    })
               })
          })).observe(z, {
               subtree: !0,
               childList: !0,
               characterData: !0
          })
     }
     var N = {
          ENTER: 13,
          SPACE: 32,
          END: 35,
          HOME: 36,
          ARROW_LEFT: 37,
          ARROW_UP: 38,
          ARROW_RIGHT: 39,
          ARROW_DOWN: 40
     },
          A = {
               self: '[data-cmp-is\x3d"accordion"]'
          },
          h = {
               button: {
                    disabled: "cmp-accordion__button--disabled",
                    expanded: "cmp-accordion__button--expanded"
               },
               panel: {
                    hidden: "cmp-accordion__panel--hidden",
                    expanded: "cmp-accordion__panel--expanded"
               }
          },
          p = {
               item: {
                    expanded: "data-cmp-expanded"
               }
          },
          u = {
               singleExpansion: {
                    "default": !1,
                    transform: function (y) {
                         return !(null === y || "undefined" === typeof y)
                    }
               }
          };
     "loading" !== document.readyState ? R() : document.addEventListener("DOMContentLoaded", R)
})();
Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
Element.prototype.closest || (Element.prototype.closest = function (t) {
     var f = this;
     if (!document.documentElement.contains(f)) return null;
     do {
          if (f.matches(t)) return f;
          f = f.parentElement || f.parentNode
     } while (null !== f && 1 === f.nodeType);
     return null
});
(function () {
     function t(h) {
          function p(V) {
               V.element.removeAttribute("data-cmp-is");
               y(V.element);
               S._active = u(S._elements.tab);
               S._elements.tabpanel && (E(), z());
               window.Granite && window.Granite.author && window.Granite.author.MessageChannel && (new window.Granite.author.MessageChannel("cqauthor", window)).subscribeRequestMessage("cmp.panelcontainer", function (Q) {
                    Q.data && "cmp-tabs" === Q.data.type && Q.data.id === S._elements.self.dataset.cmpPanelcontainerId && "navigate" === Q.data.operation && (S._active = Q.data.index, E())
               })
          }
          function u(V) {
               if (V)
                    for (var Q = 0; Q < V.length; Q++)
                         if (V[Q].classList.contains(A.active.tab)) return Q;
               return 0
          }
          function y(V) {
               S._elements = {};
               S._elements.self = V;
               V = S._elements.self.querySelectorAll("[data-cmp-hook-tabs]");
               for (var Q = 0; Q < V.length; Q++) {
                    var X = V[Q];
                    if (X.closest(".cmp-tabs") === S._elements.self) {
                         var ea = "tabs";
                         ea = ea.charAt(0).toUpperCase() + ea.slice(1);
                         ea = X.dataset["cmpHook" + ea];
                         S._elements[ea] ? (Array.isArray(S._elements[ea]) || (S._elements[ea] = [S._elements[ea]]), S._elements[ea].push(X)) : S._elements[ea] =
                              X
                    }
               }
          }
          function z() {
               var V = S._elements.tab;
               if (V)
                    for (var Q = 0; Q < V.length; Q++)(function (X) {
                         V[Q].addEventListener("click", function (ea) {
                              L(X)
                         });
                         V[Q].addEventListener("keydown", function (ea) {
                              var ra = S._active,
                                   ta = S._elements.tab.length - 1;
                              switch (ea.keyCode) {
                                   case N.ARROW_LEFT:
                                   case N.ARROW_UP:
                                        ea.preventDefault();
                                        0 < ra && L(ra - 1);
                                        break;
                                   case N.ARROW_RIGHT:
                                   case N.ARROW_DOWN:
                                        ea.preventDefault();
                                        ra < ta && L(ra + 1);
                                        break;
                                   case N.HOME:
                                        ea.preventDefault();
                                        L(0);
                                        break;
                                   case N.END:
                                        ea.preventDefault(), L(ta)
                              }
                         })
                    })(Q)
          }
          function E() {
               var V =
                    S._elements.tabpanel,
                    Q = S._elements.tab;
               if (V)
                    if (Array.isArray(V))
                         for (var X = 0; X < V.length; X++) X === parseInt(S._active) ? (V[X].classList.add(A.active.tabpanel), V[X].removeAttribute("aria-hidden"), Q[X].classList.add(A.active.tab), Q[X].setAttribute("aria-selected", !0), Q[X].setAttribute("tabindex", "0")) : (V[X].classList.remove(A.active.tabpanel), V[X].setAttribute("aria-hidden", !0), Q[X].classList.remove(A.active.tab), Q[X].setAttribute("aria-selected", !1), Q[X].setAttribute("tabindex", "-1"));
                    else V.classList.add(A.active.tabpanel),
                         Q.classList.add(A.active.tab)
          }
          function L(V) {
               S._active = V;
               E();
               var Q = window.scrollX || window.pageXOffset,
                    X = window.scrollY || window.pageYOffset;
               S._elements.tab[V].focus();
               window.scrollTo(Q, X)
          }
          var S = this;
          h && h.element && p(h)
     }
     function f(h) {
          h = h.dataset;
          var p = [],
               u = "tabs";
          u = u.charAt(0).toUpperCase() + u.slice(1);
          u = ["is", "hook" + u];
          for (var y in h)
               if (h.hasOwnProperty(y)) {
                    var z = h[y];
                    0 === y.indexOf("cmp") && (y = y.slice(3), y = y.charAt(0).toLowerCase() + y.substring(1), -1 === u.indexOf(y) && (p[y] = z))
               } return p
     }
     function R() {
          for (var h =
               document.querySelectorAll(A.self), p = 0; p < h.length; p++) new t({
                    element: h[p],
                    options: f(h[p])
               });
          h = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
          p = document.querySelector("body");
          (new h(function (u) {
               u.forEach(function (y) {
                    y = [].slice.call(y.addedNodes);
                    0 < y.length && y.forEach(function (z) {
                         z.querySelectorAll && [].slice.call(z.querySelectorAll(A.self)).forEach(function (E) {
                              new t({
                                   element: E,
                                   options: f(E)
                              })
                         })
                    })
               })
          })).observe(p, {
               subtree: !0,
               childList: !0,
               characterData: !0
          })
     }
     var N = {
          END: 35,
          HOME: 36,
          ARROW_LEFT: 37,
          ARROW_UP: 38,
          ARROW_RIGHT: 39,
          ARROW_DOWN: 40
     },
          A = {
               self: '[data-cmp-is\x3d"tabs"]',
               active: {
                    tab: "cmp-tabs__tab--active",
                    tabpanel: "cmp-tabs__tabpanel--active"
               }
          };
     "loading" !== document.readyState ? R() : document.addEventListener("DOMContentLoaded", R)
})();
(function () {
     function t(p) {
          function u(ia) {
               ia.element.removeAttribute("data-cmp-is");
               z(ia.options);
               y(ia.element);
               W._active = 0;
               W._paused = !1;
               W._elements.item && (ta(), E(), fa(), ra());
               window.Granite && window.Granite.author && window.Granite.author.MessageChannel && (new window.Granite.author.MessageChannel("cqauthor", window)).subscribeRequestMessage("cmp.panelcontainer", function (va) {
                    va.data && "cmp-carousel" === va.data.type && va.data.id === W._elements.self.dataset.cmpPanelcontainerId && "navigate" === va.data.operation &&
                         ba(va.data.index)
               })
          }
          function y(ia) {
               W._elements = {};
               W._elements.self = ia;
               ia = W._elements.self.querySelectorAll("[data-cmp-hook-carousel]");
               for (var va = 0; va < ia.length; va++) {
                    var Ga = ia[va],
                         Pa = "carousel";
                    Pa = Pa.charAt(0).toUpperCase() + Pa.slice(1);
                    Pa = Ga.dataset["cmpHook" + Pa];
                    W._elements[Pa] ? (Array.isArray(W._elements[Pa]) || (W._elements[Pa] = [W._elements[Pa]]), W._elements[Pa].push(Ga)) : W._elements[Pa] = Ga
               }
          }
          function z(ia) {
               W._properties = {};
               for (var va in h)
                    if (h.hasOwnProperty(va)) {
                         var Ga = h[va],
                              Pa = null;
                         ia && null != ia[va] &&
                              (Pa = ia[va], Ga && "function" === typeof Ga.transform && (Pa = Ga.transform(Pa)));
                         null === Pa && (Pa = h[va]["default"]);
                         W._properties[va] = Pa
                    }
          }
          function E() {
               W._elements.previous && W._elements.previous.addEventListener("click", function () {
                    ba(0 === W._active ? W._elements.item.length - 1 : W._active - 1)
               });
               W._elements.next && W._elements.next.addEventListener("click", function () {
                    ba(Oa())
               });
               var ia = W._elements.indicator;
               if (ia)
                    for (var va = 0; va < ia.length; va++)(function (Ga) {
                         ia[va].addEventListener("click", function (Pa) {
                              Z(Ga)
                         })
                    })(va);
               W._elements.pause &&
                    W._properties.autoplay && W._elements.pause.addEventListener("click", Q);
               W._elements.play && W._properties.autoplay && W._elements.play.addEventListener("click", X);
               W._elements.self.addEventListener("keydown", L);
               W._properties.autopauseDisabled || (W._elements.self.addEventListener("mouseenter", S), W._elements.self.addEventListener("mouseleave", V))
          }
          function L(ia) {
               var va = W._active,
                    Ga = W._elements.indicator.length - 1;
               switch (ia.keyCode) {
                    case N.ARROW_LEFT:
                    case N.ARROW_UP:
                         ia.preventDefault();
                         0 < va && Z(va - 1);
                         break;
                    case N.ARROW_RIGHT:
                    case N.ARROW_DOWN:
                         ia.preventDefault();
                         va < Ga && Z(va + 1);
                         break;
                    case N.HOME:
                         ia.preventDefault();
                         Z(0);
                         break;
                    case N.END:
                         ia.preventDefault();
                         Z(Ga);
                         break;
                    case N.SPACE:
                         W._properties.autoplay && ia.target !== W._elements.previous && ia.target !== W._elements.next && (ia.preventDefault(), W._paused ? ea() : (W._paused = !0, Fa(), ra())), ia.target === W._elements.pause && W._elements.play.focus(), ia.target === W._elements.play && W._elements.pause.focus()
               }
          }
          function S(ia) {
               Fa()
          }
          function V(ia) {
               fa()
          }
          function Q(ia) {
               W._paused = !0;
               Fa();
               ra();
               W._elements.play.focus()
          }
          function X() {
               ea();
               W._elements.pause.focus()
          }
          function ea() {
               var ia = W._paused = !1;
               W._elements.self.parentElement && (ia = W._elements.self.parentElement.querySelector(":hover") === W._elements.self);
               !W._properties.autopauseDisabled && ia || fa();
               ra()
          }
          function ra() {
               Da(W._elements.pause, W._paused);
               Da(W._elements.play, !W._paused)
          }
          function ta() {
               var ia = W._elements.item,
                    va = W._elements.indicator;
               if (ia)
                    if (Array.isArray(ia))
                         for (var Ga = 0; Ga < ia.length; Ga++) Ga === parseInt(W._active) ? (ia[Ga].classList.add("cmp-carousel__item--active"), ia[Ga].removeAttribute("aria-hidden"),
                              va[Ga].classList.add("cmp-carousel__indicator--active"), va[Ga].setAttribute("aria-selected", !0), va[Ga].setAttribute("tabindex", "0")) : (ia[Ga].classList.remove("cmp-carousel__item--active"), ia[Ga].setAttribute("aria-hidden", !0), va[Ga].classList.remove("cmp-carousel__indicator--active"), va[Ga].setAttribute("aria-selected", !1), va[Ga].setAttribute("tabindex", "-1"));
                    else ia.classList.add("cmp-carousel__item--active"), va.classList.add("cmp-carousel__indicator--active")
          }
          function Oa() {
               return W._active === W._elements.item.length -
                    1 ? 0 : W._active + 1
          }
          function ba(ia) {
               0 > ia || ia > W._elements.item.length - 1 || (W._active = ia, ta(), W._elements.self.parentElement && W._elements.self.parentElement.querySelector(":hover") !== W._elements.self && fa())
          }
          function Z(ia) {
               ba(ia);
               var va = window.scrollX || window.pageXOffset,
                    Ga = window.scrollY || window.pageYOffset;
               W._elements.indicator[ia].focus();
               window.scrollTo(va, Ga)
          }
          function fa() {
               !W._paused && W._properties.autoplay && (Fa(), W._autoplayIntervalId = window.setInterval(function () {
                    if (!document.visibilityState || !document.hidden) {
                         var ia =
                              W._elements.indicators;
                         ia !== document.activeElement && ia.contains(document.activeElement) ? Z(Oa()) : ba(Oa())
                    }
               }, W._properties.delay))
          }
          function Fa() {
               window.clearInterval(W._autoplayIntervalId);
               W._autoplayIntervalId = null
          }
          function Da(ia, va) {
               ia && (!1 !== va ? (ia.disabled = !0, ia.classList.add("cmp-carousel__action--disabled")) : (ia.disabled = !1, ia.classList.remove("cmp-carousel__action--disabled")))
          }
          var W = this;
          p && p.element && u(p)
     }
     function f(p) {
          p = p.dataset;
          var u = [],
               y = "carousel";
          y = y.charAt(0).toUpperCase() + y.slice(1);
          y = ["is", "hook" + y];
          for (var z in p)
               if (p.hasOwnProperty(z)) {
                    var E = p[z];
                    0 === z.indexOf("cmp") && (z = z.slice(3), z = z.charAt(0).toLowerCase() + z.substring(1), -1 === y.indexOf(z) && (u[z] = E))
               } return u
     }
     function R() {
          for (var p = document.querySelectorAll(A.self), u = 0; u < p.length; u++) new t({
               element: p[u],
               options: f(p[u])
          });
          p = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
          u = document.querySelector("body");
          (new p(function (y) {
               y.forEach(function (z) {
                    z = [].slice.call(z.addedNodes);
                    0 < z.length && z.forEach(function (E) {
                         E.querySelectorAll && [].slice.call(E.querySelectorAll(A.self)).forEach(function (L) {
                              new t({
                                   element: L,
                                   options: f(L)
                              })
                         })
                    })
               })
          })).observe(u, {
               subtree: !0,
               childList: !0,
               characterData: !0
          })
     }
     var N = {
          SPACE: 32,
          END: 35,
          HOME: 36,
          ARROW_LEFT: 37,
          ARROW_UP: 38,
          ARROW_RIGHT: 39,
          ARROW_DOWN: 40
     },
          A = {
               self: '[data-cmp-is\x3d"carousel"]'
          },
          h = {
               autoplay: {
                    "default": !1,
                    transform: function (p) {
                         return !(null === p || "undefined" === typeof p)
                    }
               },
               delay: {
                    "default": 5E3,
                    transform: function (p) {
                         p = parseFloat(p);
                         return isNaN(p) ? null : p
                    }
               },
               autopauseDisabled: {
                    "default": !1,
                    transform: function (p) {
                         return !(null ===
                              p || "undefined" === typeof p)
                    }
               }
          };
     "loading" !== document.readyState ? R() : document.addEventListener("DOMContentLoaded", R)
})();
window.Element && !Element.prototype.closest && (Element.prototype.closest = function (t) {
     t = (this.document || this.ownerDocument).querySelectorAll(t);
     var f = this,
          R;
     do
          for (R = t.length; 0 <= --R && t.item(R) !== f;); while (0 > R && (f = f.parentElement));
     return f
});
window.Element && !Element.prototype.matches && (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (t) {
     t = (this.document || this.ownerDocument).querySelectorAll(t);
     for (var f = t.length; 0 <= --f && t.item(f) !== this;);
     return -1 < f
});
Object.assign || (Object.assign = function (t, f) {
     if (null === t) throw new TypeError("Cannot convert undefined or null to object");
     for (var R = Object(t), N = 1; N < arguments.length; N++) {
          var A = arguments[N];
          if (null !== A)
               for (var h in A) Object.prototype.hasOwnProperty.call(A, h) && (R[h] = A[h])
     }
     return R
});
(function (t) {
     t.forEach(function (f) {
          f.hasOwnProperty("remove") || Object.defineProperty(f, "remove", {
               configurable: !0,
               enumerable: !0,
               writable: !0,
               value: function () {
                    this.parentNode.removeChild(this)
               }
          })
     })
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
(function () {
     function t(u) {
          u = u.dataset;
          var y = [],
               z = "image";
          z = z.charAt(0).toUpperCase() + z.slice(1);
          z = ["is", "hook" + z];
          for (var E in u)
               if (u.hasOwnProperty(E)) {
                    var L = u[E];
                    0 === E.indexOf("cmp") && (E = E.slice(3), E = E.charAt(0).toLowerCase() + E.substring(1), -1 === z.indexOf(E) && (y[E] = L))
               } return y
     }
     function f(u) {
          function y(X) {
               X.element.removeAttribute("data-cmp-is");
               var ea = X.options;
               Q._properties = {};
               for (var ra in h)
                    if (h.hasOwnProperty(ra)) {
                         var ta = h[ra];
                         Q._properties[ra] = ea && null != ea[ra] ? ta && "function" === typeof ta.transform ?
                              ta.transform(ea[ra]) : ea[ra] : h[ra]["default"]
                    } X = X.element;
               Q._elements = {};
               Q._elements.self = X;
               X = Q._elements.self.querySelectorAll("[data-cmp-hook-image]");
               for (ea = 0; ea < X.length; ea++) ra = X[ea], ta = "image", ta = ta.charAt(0).toUpperCase() + ta.slice(1), Q._elements[ra.dataset["cmpHook" + ta]] = ra;
               if (Q._elements.noscript) {
                    Q._elements.container = Q._elements.link ? Q._elements.link : Q._elements.self;
                    X = Q._elements.noscript.textContent.trim();
                    X = X.replace(/&(amp;)*lt;/g, "\x3c");
                    X = X.replace(/&(amp;)*gt;/g, "\x3e");
                    X = (new DOMParser).parseFromString(X,
                         "text/html");
                    ea = X.querySelector(N.image);
                    ea.removeAttribute("src");
                    Q._elements.container.insertBefore(ea, Q._elements.noscript);
                    (X = X.querySelector(N.map)) && Q._elements.container.insertBefore(X, Q._elements.noscript);
                    Q._elements.noscript.parentNode.removeChild(Q._elements.noscript);
                    Q._elements.container.matches(N.image) ? Q._elements.image = Q._elements.container : Q._elements.image = Q._elements.container.querySelector(N.image);
                    Q._elements.map = Q._elements.container.querySelector(N.map);
                    Q._elements.areas = Q._elements.container.querySelectorAll(N.area);
                    if (Q._properties.lazy) {
                         X = Q._elements.image.getAttribute("width");
                         ea = Q._elements.image.getAttribute("height");
                         if (X && ea) {
                              ra = A.style;
                              ra["padding-bottom"] = ea / X * 100 + "%";
                              for (var Oa in ra) ra.hasOwnProperty(Oa) && (Q._elements.image.style[Oa] = ra[Oa])
                         }
                         Q._elements.image.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
                         Q._elements.image.classList.add(A.cssClass);
                         Q._lazyLoaderShowing = !0
                    }
                    Q._elements.map && Q._elements.image.addEventListener("load", V);
                    window.addEventListener("scroll",
                         Q.update);
                    window.addEventListener("resize", S);
                    window.addEventListener("update", Q.update);
                    Q._elements.image.addEventListener("cmp-image-redraw", Q.update);
                    Q.update()
               }
          }
          function z() {
               var X = Q._properties.widths && 0 < Q._properties.widths.length;
               if (X) {
                    var ea = Q._elements.self;
                    for (var ra = ea.clientWidth; 0 === ra && ea.parentNode;) ea = ea.parentNode, ra = ea.clientWidth;
                    ea = ra * p;
                    ra = Q._properties.widths.length;
                    for (var ta = 0; ta < ra - 1 && Q._properties.widths[ta] < ea;) ta++;
                    ea = "." + Q._properties.widths[ta].toString()
               } else ea = "";
               ea =
                    Q._properties.src.replace("{.width}", ea);
               Q._elements.image.getAttribute("src") !== ea && (Q._elements.image.setAttribute("src", ea), X || window.removeEventListener("scroll", Q.update));
               Q._lazyLoaderShowing && Q._elements.image.addEventListener("load", E)
          }
          function E() {
               Q._elements.image.classList.remove(A.cssClass);
               for (var X in A.style) A.style.hasOwnProperty(X) && (Q._elements.image.style[X] = "");
               Q._elements.image.removeEventListener("load", E);
               Q._lazyLoaderShowing = !1
          }
          function L() {
               if (Q._elements.areas && 0 < Q._elements.areas.length)
                    for (var X =
                         0; X < Q._elements.areas.length; X++) {
                         var ea = Q._elements.image.width,
                              ra = Q._elements.image.height;
                         if (ea && ra) {
                              var ta = Q._elements.areas[X].dataset.cmpRelcoords;
                              if (ta) {
                                   ta = ta.split(",");
                                   for (var Oa = Array(ta.length), ba = 0; ba < Oa.length; ba++) Oa[ba] = 0 === ba % 2 ? parseInt(ta[ba] * ea) : parseInt(ta[ba] * ra);
                                   Q._elements.areas[X].coords = Oa
                              }
                         }
                    }
          }
          function S() {
               Q.update();
               L()
          }
          function V() {
               L()
          }
          var Q = this;
          Q.update = function () {
               if (Q._properties.lazy) {
                    if (null === Q._elements.container.offsetParent) var X = !1;
                    else {
                         X = window.pageYOffset;
                         var ea =
                              X + document.documentElement.clientHeight,
                              ra = Q._elements.container.getBoundingClientRect().top + X;
                         X = ra + Q._elements.container.clientHeight >= X - 0 && ra <= ea + 0
                    }
                    X && z()
               } else z()
          };
          u && u.element && y(u)
     }
     function R() {
          for (var u = document.querySelectorAll(N.self), y = 0; y < u.length; y++) new f({
               element: u[y],
               options: t(u[y])
          });
          u = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
          y = document.querySelector("body");
          (new u(function (z) {
               z.forEach(function (E) {
                    E = [].slice.call(E.addedNodes);
                    0 < E.length &&
                         E.forEach(function (L) {
                              L.querySelectorAll && [].slice.call(L.querySelectorAll(N.self)).forEach(function (S) {
                                   new f({
                                        element: S,
                                        options: t(S)
                                   })
                              })
                         })
               })
          })).observe(y, {
               subtree: !0,
               childList: !0,
               characterData: !0
          })
     }
     var N = {
          self: '[data-cmp-is\x3d"image"]',
          image: '[data-cmp-hook-image\x3d"image"]',
          map: '[data-cmp-hook-image\x3d"map"]',
          area: '[data-cmp-hook-image\x3d"area"]'
     },
          A = {
               cssClass: "cmp-image__image--is-loading",
               style: {
                    height: 0,
                    "padding-bottom": ""
               }
          },
          h = {
               widths: {
                    "default": [],
                    transform: function (u) {
                         var y = [];
                         u.split(",").forEach(function (z) {
                              z =
                                   parseFloat(z);
                              isNaN(z) || y.push(z)
                         });
                         return y
                    }
               },
               lazy: {
                    "default": !1,
                    transform: function (u) {
                         return !(null === u || "undefined" === typeof u)
                    }
               },
               src: {}
          },
          p = window.devicePixelRatio || 1;
     "loading" !== document.readyState ? R() : document.addEventListener("DOMContentLoaded", R)
})();
(function () {
     function t(z) {
          z = z.dataset;
          var E = [],
               L = "search";
          L = L.charAt(0).toUpperCase() + L.slice(1);
          L = ["is", "hook" + L];
          for (var S in z)
               if (z.hasOwnProperty(S)) {
                    var V = z[S];
                    0 === S.indexOf("cmp") && (S = S.slice(3), S = S.charAt(0).toLowerCase() + S.substring(1), -1 === L.indexOf(S) && (E[S] = V))
               } return E
     }
     function f(z, E) {
          z && (!1 !== E ? (z.style.display = "block", z.setAttribute("aria-hidden", !1)) : (z.style.display = "none", z.setAttribute("aria-hidden", !0)))
     }
     function R(z) {
          var E = [];
          if (z && z.elements)
               for (var L = 0; L < z.elements.length; L++) {
                    var S =
                         z.elements[L];
                    !S.disabled && S.name && (S = [S.name, encodeURIComponent(S.value)], E.push(S.join("\x3d")))
               }
          return E.join("\x26")
     }
     function N(z, E) {
          if (z && E)
               if (3 === z.nodeType) {
                    var L = z.nodeValue;
                    E = E.exec(L);
                    if (L && E) {
                         L = document.createElement("mark");
                         L.className = "cmp-search__item-mark";
                         L.appendChild(document.createTextNode(E[0]));
                         var S = z.splitText(E.index);
                         S.nodeValue = S.nodeValue.substring(E[0].length);
                         z.parentNode.insertBefore(L, S)
                    }
               } else if (z.hasChildNodes())
                    for (L = 0; L < z.childNodes.length; L++) N(z.childNodes[L],
                         E)
     }
     function A(z) {
          z.element && z.element.removeAttribute("data-cmp-is");
          this._cacheElements(z.element);
          this._setupProperties(z.options);
          this._action = this._elements.form.getAttribute("action");
          this._resultsOffset = 0;
          this._hasMoreResults = !0;
          this._elements.input.addEventListener("input", this._onInput.bind(this));
          this._elements.input.addEventListener("focus", this._onInput.bind(this));
          this._elements.input.addEventListener("keydown", this._onKeydown.bind(this));
          this._elements.clear.addEventListener("click",
               this._onClearClick.bind(this));
          document.addEventListener("click", this._onDocumentClick.bind(this));
          this._elements.results.addEventListener("scroll", this._onScroll.bind(this));
          this._makeAccessible()
     }
     function h() {
          for (var z = document.querySelectorAll(p.self), E = 0; E < z.length; E++) new A({
               element: z[E],
               options: t(z[E])
          });
          z = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
          E = document.querySelector("body");
          (new z(function (L) {
               L.forEach(function (S) {
                    S = [].slice.call(S.addedNodes);
                    0 < S.length && S.forEach(function (V) {
                         V.querySelectorAll && [].slice.call(V.querySelectorAll(p.self)).forEach(function (Q) {
                              new A({
                                   element: Q,
                                   options: t(Q)
                              })
                         })
                    })
               })
          })).observe(E, {
               subtree: !0,
               childList: !0,
               characterData: !0
          })
     }
     var p = {
          self: '[data-cmp-is\x3d"search"]',
          item: {
               self: '[data-cmp-hook-search\x3d"item"]',
               title: '[data-cmp-hook-search\x3d"itemTitle"]',
               focused: ".cmp-search__item--is-focused"
          }
     },
          u = {
               minLength: {
                    "default": 3,
                    transform: function (z) {
                         z = parseFloat(z);
                         return isNaN(z) ? null : z
                    }
               },
               resultsSize: {
                    "default": 10,
                    transform: function (z) {
                         z =
                              parseFloat(z);
                         return isNaN(z) ? null : z
                    }
               }
          },
          y = 0;
     A.prototype._displayResults = function () {
          0 === this._elements.input.value.length ? (f(this._elements.clear, !1), this._cancelResults()) : (this._elements.input.value.length < this._properties.minLength || this._updateResults(), f(this._elements.clear, !0))
     };
     A.prototype._onScroll = function (z) {
          this._elements.results.scrollTop + 2 * this._elements.results.clientHeight >= this._elements.results.scrollHeight && (this._resultsOffset += this._properties.resultsSize, this._displayResults())
     };
     A.prototype._onInput = function (z) {
          var E = this;
          E._cancelResults();
          this._timeout = setTimeout(function () {
               E._displayResults()
          }, 300)
     };
     A.prototype._onKeydown = function (z) {
          switch (z.keyCode) {
               case 9:
                    this._resultsOpen() && z.preventDefault();
                    break;
               case 13:
                    z.preventDefault();
                    this._resultsOpen() && (z = this._elements.results.querySelector(p.item.focused)) && z.click();
                    break;
               case 27:
                    this._cancelResults();
                    break;
               case 38:
                    this._resultsOpen() && (z.preventDefault(), this._stepResultFocus(!0));
                    break;
               case 40:
                    this._resultsOpen() ? (z.preventDefault(),
                         this._stepResultFocus()) : this._onInput()
          }
     };
     A.prototype._onClearClick = function (z) {
          z.preventDefault();
          this._elements.input.value = "";
          f(this._elements.clear, !1);
          f(this._elements.results, !1)
     };
     A.prototype._onDocumentClick = function (z) {
          var E = this._elements.input.contains(z.target);
          z = this._elements.results.contains(z.target);
          E || z || f(this._elements.results, !1)
     };
     A.prototype._resultsOpen = function () {
          return "none" !== this._elements.results.style.display
     };
     A.prototype._makeAccessible = function () {
          var z = "cmp-search-results-" +
               y;
          this._elements.input.setAttribute("aria-owns", z);
          this._elements.results.id = z;
          y++
     };
     A.prototype._generateItems = function (z, E) {
          var L = this;
          z.forEach(function (S) {
               var V = document.createElement("span");
               V.innerHTML = L._elements.itemTemplate.innerHTML;
               V.querySelectorAll(p.item.title)[0].appendChild(document.createTextNode(S.title));
               V.querySelectorAll(p.item.self)[0].setAttribute("href", S.url);
               E.innerHTML += V.innerHTML
          })
     };
     A.prototype._markResults = function () {
          var z = this._elements.results.querySelectorAll(p.item.self),
               E = this._elements.input.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$\x26");
          E = new RegExp("(" + E + ")", "gi");
          for (var L = this._resultsOffset - 1; L < z.length; ++L) N(z[L], E)
     };
     A.prototype._stepResultFocus = function (z) {
          var E = this._elements.results.querySelectorAll(p.item.self),
               L = this._elements.results.querySelector(p.item.focused);
          L = Array.prototype.indexOf.call(E, L);
          if (0 < E.length)
               if (z) {
                    if (1 <= L && (E[L].classList.remove("cmp-search__item--is-focused"), E[L - 1].classList.add("cmp-search__item--is-focused")), z = this._elements.results.querySelector(p.item.focused)) z =
                         this._elements.results.scrollTop - z.offsetTop, 0 < z && (this._elements.results.scrollTop -= z)
               } else if (0 > L ? E[0].classList.add("cmp-search__item--is-focused") : L + 1 < E.length && (E[L].classList.remove("cmp-search__item--is-focused"), E[L + 1].classList.add("cmp-search__item--is-focused")), z = this._elements.results.querySelector(p.item.focused)) z = z.offsetTop + z.offsetHeight - this._elements.results.scrollTop - this._elements.results.clientHeight, 0 < z ? this._elements.results.scrollTop += z : this._onScroll()
     };
     A.prototype._updateResults =
          function () {
               var z = this;
               if (z._hasMoreResults) {
                    var E = new XMLHttpRequest,
                         L = z._action + "?" + R(z._elements.form) + "\x26resultsOffset\x3d" + z._resultsOffset;
                    E.open("GET", L, !0);
                    E.onload = function () {
                         setTimeout(function () {
                              f(z._elements.loadingIndicator, !1);
                              f(z._elements.icon, !0)
                         }, 300);
                         if (200 <= E.status && 400 > E.status) {
                              var S = JSON.parse(E.responseText);
                              0 < S.length ? (z._generateItems(S, z._elements.results), z._markResults(), f(z._elements.results, !0)) : z._hasMoreResults = !1;
                              0 < z._elements.results.querySelectorAll(p.item.self).length %
                                   z._properties.resultsSize && (z._hasMoreResults = !1)
                         }
                    };
                    f(z._elements.loadingIndicator, !0);
                    f(z._elements.icon, !1);
                    E.send()
               }
          };
     A.prototype._cancelResults = function () {
          clearTimeout(this._timeout);
          this._resultsOffset = this._elements.results.scrollTop = 0;
          this._hasMoreResults = !0;
          this._elements.results.innerHTML = ""
     };
     A.prototype._cacheElements = function (z) {
          this._elements = {};
          this._elements.self = z;
          z = this._elements.self.querySelectorAll("[data-cmp-hook-search]");
          for (var E = 0; E < z.length; E++) {
               var L = z[E],
                    S = "search";
               S = S.charAt(0).toUpperCase() +
                    S.slice(1);
               this._elements[L.dataset["cmpHook" + S]] = L
          }
     };
     A.prototype._setupProperties = function (z) {
          this._properties = {};
          for (var E in u)
               if (u.hasOwnProperty(E)) {
                    var L = u[E];
                    this._properties[E] = z && null != z[E] ? L && "function" === typeof L.transform ? L.transform(z[E]) : z[E] : u[E]["default"]
               }
     };
     "loading" !== document.readyState ? h() : document.addEventListener("DOMContentLoaded", h)
})();
(function () {
     function t(h) {
          h = h.dataset;
          var p = [],
               u = "formText";
          u = u.charAt(0).toUpperCase() + u.slice(1);
          u = ["is", "hook" + u];
          for (var y in h)
               if (h.hasOwnProperty(y)) {
                    var z = h[y];
                    0 === y.indexOf("cmp") && (y = y.slice(3), y = y.charAt(0).toLowerCase() + y.substring(1), -1 === u.indexOf(y) && (p[y] = z))
               } return p
     }
     function f(h) {
          h.element && h.element.removeAttribute("data-cmp-is");
          this._cacheElements(h.element);
          this._setupProperties(h.options);
          this._elements.input.addEventListener("invalid", this._onInvalid.bind(this));
          this._elements.input.addEventListener("input",
               this._onInput.bind(this))
     }
     function R() {
          for (var h = document.querySelectorAll(N.self), p = 0; p < h.length; p++) new f({
               element: h[p],
               options: t(h[p])
          });
          h = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
          p = document.querySelector("body");
          (new h(function (u) {
               u.forEach(function (y) {
                    y = [].slice.call(y.addedNodes);
                    0 < y.length && y.forEach(function (z) {
                         z.querySelectorAll && [].slice.call(z.querySelectorAll(N.self)).forEach(function (E) {
                              new f({
                                   element: E,
                                   options: t(E)
                              })
                         })
                    })
               })
          })).observe(p, {
               subtree: !0,
               childList: !0,
               characterData: !0
          })
     }
     var N = {
          self: '[data-cmp-is\x3d"formText"]'
     },
          A = {
               constraintMessage: {},
               requiredMessage: {}
          };
     f.prototype._onInvalid = function (h) {
          h.target.setCustomValidity("");
          h.target.validity.typeMismatch ? this._properties.constraintMessage && h.target.setCustomValidity(this._properties.constraintMessage) : h.target.validity.valueMissing && this._properties.requiredMessage && h.target.setCustomValidity(this._properties.requiredMessage)
     };
     f.prototype._onInput = function (h) {
          h.target.setCustomValidity("")
     };
     f.prototype._cacheElements = function (h) {
          this._elements = {};
          this._elements.self = h;
          h = this._elements.self.querySelectorAll("[data-cmp-hook-form-text]");
          for (var p = 0; p < h.length; p++) {
               var u = h[p],
                    y = "formText";
               y = y.charAt(0).toUpperCase() + y.slice(1);
               this._elements[u.dataset["cmpHook" + y]] = u
          }
     };
     f.prototype._setupProperties = function (h) {
          this._properties = {};
          for (var p in A)
               if (A.hasOwnProperty(p)) {
                    var u = A[p];
                    this._properties[p] = h && null != h[p] ? u && "function" === typeof u.transform ? u.transform(h[p]) : h[p] : A[p]["default"]
               }
     };
     "loading" !== document.readyState ? R() : document.addEventListener("DOMContentLoaded", R)
})();
! function (t, f) {
     "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? f(t, !0) : function (R) {
          if (!R.document) throw Error("jQuery requires a window with a document");
          return f(R)
     } : f(t)
}("undefined" != typeof window ? window : this, function (t, f) {
     function R(a, b, e) {
          var m, q, w = (e = e || Aa).createElement("script");
          if (w.text = a, b)
               for (m in Bc) (q = b[m] || b.getAttribute && b.getAttribute(m)) && w.setAttribute(m, q);
          e.head.appendChild(w).parentNode.removeChild(w)
     }
     function N(a) {
          return null == a ? a + "" : "object" ==
               typeof a || "function" == typeof a ? cc[mc.call(a)] || "object" : typeof a
     }
     function A(a) {
          var b = !!a && "length" in a && a.length,
               e = N(a);
          return !sa(a) && !nb(a) && ("array" === e || 0 === b || "number" == typeof b && 0 < b && b - 1 in a)
     }
     function h(a, b) {
          return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
     }
     function p(a, b, e) {
          return sa(b) ? l.grep(a, function (m, q) {
               return !!b.call(m, q, m) !== e
          }) : b.nodeType ? l.grep(a, function (m) {
               return m === b !== e
          }) : "string" != typeof b ? l.grep(a, function (m) {
               return -1 < Jb.call(b, m) !== e
          }) : l.filter(b, a, e)
     }
     function u(a,
          b) {
          for (;
               (a = a[b]) && 1 !== a.nodeType;);
          return a
     }
     function y(a) {
          return a
     }
     function z(a) {
          throw a;
     }
     function E(a, b, e, m) {
          var q;
          try {
               a && sa(q = a.promise) ? q.call(a).done(b).fail(e) : a && sa(q = a.then) ? q.call(a, b, e) : b.apply(void 0, [a].slice(m))
          } catch (w) {
               e.apply(void 0, [w])
          }
     }
     function L() {
          Aa.removeEventListener("DOMContentLoaded", L);
          t.removeEventListener("load", L);
          l.ready()
     }
     function S(a, b) {
          return b.toUpperCase()
     }
     function V(a) {
          return a.replace(Rc, "ms-").replace(vb, S)
     }
     function Q() {
          this.expando = l.expando + Q.uid++
     }
     function X(a,
          b, e) {
          var m, q;
          if (void 0 === e && 1 === a.nodeType)
               if (m = "data-" + b.replace(Sc, "-$\x26").toLowerCase(), "string" == typeof (e = a.getAttribute(m))) {
                    try {
                         e = "true" === (q = e) || "false" !== q && ("null" === q ? null : q === +q + "" ? +q : Ub.test(q) ? JSON.parse(q) : q)
                    } catch (w) { }
                    bb.set(a, b, e)
               } else e = void 0;
          return e
     }
     function ea(a, b, e, m) {
          var q, w, x = 20,
               D = m ? function () {
                    return m.cur()
               } : function () {
                    return l.css(a, b, "")
               },
               F = D(),
               J = e && e[3] || (l.cssNumber[b] ? "" : "px"),
               P = a.nodeType && (l.cssNumber[b] || "px" !== J && +F) && Vb.exec(l.css(a, b));
          if (P && P[3] !== J) {
               F /= 2;
               J =
                    J || P[3];
               for (P = +F || 1; x--;) l.style(a, b, P + J), 0 >= (1 - w) * (1 - (w = D() / F || .5)) && (x = 0), P /= w;
               P *= 2;
               l.style(a, b, P + J);
               e = e || []
          }
          return e && (P = +P || +F || 0, q = e[1] ? P + (e[1] + 1) * e[2] : +e[2], m && (m.unit = J, m.start = P, m.end = q)), q
     }
     function ra(a, b) {
          for (var e, m, q, w, x, D, F, J = [], P = 0, I = a.length; P < I; P++)(m = a[P]).style && (e = m.style.display, b ? ("none" === e && (J[P] = na.get(m, "display") || null, J[P] || (m.style.display = "")), "" === m.style.display && dc(m) && (J[P] = (F = x = w = void 0, x = (q = m).ownerDocument, D = q.nodeName, (F = Cc[D]) || (w = x.body.appendChild(x.createElement(D)),
               F = l.css(w, "display"), w.parentNode.removeChild(w), "none" === F && (F = "block"), Cc[D] = F)))) : "none" !== e && (J[P] = "none", na.set(m, "display", e)));
          for (P = 0; P < I; P++) null != J[P] && (a[P].style.display = J[P]);
          return a
     }
     function ta(a, b) {
          var e;
          return e = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && h(a, b) ? l.merge([a], e) : e
     }
     function Oa(a, b) {
          for (var e = 0, m = a.length; e < m; e++) na.set(a[e], "globalEval", !b || na.get(b[e], "globalEval"))
     }
     function ba(a, b, e, m, q) {
          for (var w, x, D, F, J = b.createDocumentFragment(), P = [], I = 0, aa = a.length; I < aa; I++)
               if ((w = a[I]) || 0 === w)
                    if ("object" === N(w)) l.merge(P, w.nodeType ? [w] : w);
                    else if (Tc.test(w)) {
                         x = x || J.appendChild(b.createElement("div"));
                         D = (Dc.exec(w) || ["", ""])[1].toLowerCase();
                         D = db[D] || db._default;
                         x.innerHTML = D[1] + l.htmlPrefilter(w) + D[2];
                         for (D = D[0]; D--;) x = x.lastChild;
                         l.merge(P, x.childNodes);
                         (x = J.firstChild).textContent = ""
                    } else P.push(b.createTextNode(w));
          J.textContent = "";
          for (I = 0; w = P[I++];)
               if (m && -1 < l.inArray(w,
                    m)) q && q.push(w);
               else if (F = Kb(w), x = ta(J.appendChild(w), "script"), F && Oa(x), e)
                    for (D = 0; w = x[D++];) Ec.test(w.type || "") && e.push(w);
          return J
     }
     function Z() {
          return !0
     }
     function fa() {
          return !1
     }
     function Fa(a, b) {
          a: {
               try {
                    var e = Aa.activeElement;
                    break a
               } catch (m) { }
               e = void 0
          }
          return a === e == ("focus" === b)
     }
     function Da(a, b, e, m, q, w) {
          var x, D;
          if ("object" == typeof b) {
               for (D in "string" != typeof e && (m = m || e, e = void 0), b) Da(a, D, e, m, b[D], w);
               return a
          }
          if (null == m && null == q ? (q = e, m = e = void 0) : null == q && ("string" == typeof e ? (q = m, m = void 0) : (q = m, m = e,
               e = void 0)), !1 === q) q = fa;
          else if (!q) return a;
          return 1 === w && (x = q, (q = function (F) {
               return l().off(F), x.apply(this, arguments)
          }).guid = x.guid || (x.guid = l.guid++)), a.each(function () {
               l.event.add(this, b, q, m, e)
          })
     }
     function W(a, b, e) {
          e ? (na.set(a, b, !1), l.event.add(a, b, {
               namespace: !1,
               handler: function (m) {
                    var q, w, x = na.get(this, b);
                    if (1 & m.isTrigger && this[b])
                         if (x.length) (l.event.special[b] || {}).delegateType && m.stopPropagation();
                         else {
                              if (x = wb.call(arguments), na.set(this, b, x), q = e(this, b), this[b](), x !== (w = na.get(this, b)) || q ?
                                   na.set(this, b, !1) : w = {}, x !== w) return m.stopImmediatePropagation(), m.preventDefault(), w && w.value
                         }
                    else x.length && (na.set(this, b, {
                         value: l.event.trigger(l.extend(x[0], l.Event.prototype), x.slice(1), this)
                    }), m.stopImmediatePropagation())
               }
          })) : void 0 === na.get(a, b) && l.event.add(a, b, Z)
     }
     function ia(a, b) {
          return h(a, "table") && h(11 !== b.nodeType ? b : b.firstChild, "tr") && l(a).children("tbody")[0] || a
     }
     function va(a) {
          return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
     }
     function Ga(a) {
          return "true/" === (a.type || "").slice(0,
               5) ? a.type = a.type.slice(5) : a.removeAttribute("type"), a
     }
     function Pa(a, b) {
          var e, m, q, w, x;
          if (1 === b.nodeType) {
               if (na.hasData(a) && (x = na.get(a).events))
                    for (m in na.remove(b, "handle events"), x) {
                         var D = 0;
                         for (e = x[m].length; D < e; D++) l.event.add(b, m, x[m][D])
                    }
               bb.hasData(a) && (q = bb.access(a), w = l.extend({}, q), bb.set(b, w))
          }
     }
     function zb(a, b, e, m) {
          b = Lb(b);
          var q, w, x, D = 0,
               F = a.length,
               J = F - 1,
               P = b[0],
               I = sa(P);
          if (I || 1 < F && "string" == typeof P && !Ha.checkClone && Fc.test(P)) return a.each(function (ja) {
               var ka = a.eq(ja);
               I && (b[0] = P.call(this,
                    ja, ka.html()));
               zb(ka, b, e, m)
          });
          if (F && (w = (q = ba(b, a[0].ownerDocument, !1, a, m)).firstChild, 1 === q.childNodes.length && (q = w), w || m)) {
               for (x = (w = l.map(ta(q, "script"), va)).length; D < F; D++) {
                    var aa = q;
                    D !== J && (aa = l.clone(aa, !0, !0), x && l.merge(w, ta(aa, "script")));
                    e.call(a[D], aa, D)
               }
               if (x)
                    for (q = w[w.length - 1].ownerDocument, l.map(w, Ga), D = 0; D < x; D++) aa = w[D], Ec.test(aa.type || "") && !na.access(aa, "globalEval") && l.contains(q, aa) && (aa.src && "module" !== (aa.type || "").toLowerCase() ? l._evalUrl && !aa.noModule && l._evalUrl(aa.src, {
                         nonce: aa.nonce ||
                              aa.getAttribute("nonce")
                    }, q) : R(aa.textContent.replace(Uc, ""), aa, q))
          }
          return a
     }
     function Wb(a, b, e) {
          for (var m = b ? l.filter(b, a) : a, q = 0; null != (b = m[q]); q++) e || 1 !== b.nodeType || l.cleanData(ta(b)), b.parentNode && (e && Kb(b) && Oa(ta(b, "script")), b.parentNode.removeChild(b));
          return a
     }
     function Mb(a, b, e) {
          var m, q, w, x, D = a.style;
          return (e = e || ec(a)) && ("" !== (x = e.getPropertyValue(b) || e[b]) || Kb(a) || (x = l.style(a, b)), !Ha.pixelBoxStyles() && Ab.test(x) && Vc.test(b) && (m = D.width, q = D.minWidth, w = D.maxWidth, D.minWidth = D.maxWidth = D.width =
               x, x = e.width, D.width = m, D.minWidth = q, D.maxWidth = w)), void 0 !== x ? x + "" : x
     }
     function Nb(a, b) {
          return {
               get: function () {
                    if (!a()) return (this.get = b).apply(this, arguments);
                    delete this.get
               }
          }
     }
     function nc(a) {
          var b;
          if (!(b = l.cssProps[a] || Xb[a])) {
               if (!(a in oc)) {
                    a: {
                         b = a;
                         for (var e = b[0].toUpperCase() + b.slice(1), m = Gc.length; m--;)
                              if ((b = Gc[m] + e) in oc) break a; b = void 0
                    }
                    a = Xb[a] = b || a
               }
               b = a
          }
          return b
     }
     function pc(a, b, e) {
          return (a = Vb.exec(b)) ? Math.max(0, a[2] - (e || 0)) + (a[3] || "px") : b
     }
     function fc(a, b, e, m, q, w) {
          var x = "width" === b ? 1 : 0,
               D = 0,
               F = 0;
          if (e === (m ? "border" : "content")) return 0;
          for (; 4 > x; x += 2) "margin" === e && (F += l.css(a, e + ob[x], !0, q)), m ? ("content" === e && (F -= l.css(a, "padding" + ob[x], !0, q)), "margin" !== e && (F -= l.css(a, "border" + ob[x] + "Width", !0, q))) : (F += l.css(a, "padding" + ob[x], !0, q), "padding" !== e ? F += l.css(a, "border" + ob[x] + "Width", !0, q) : D += l.css(a, "border" + ob[x] + "Width", !0, q));
          return !m && 0 <= w && (F += Math.max(0, Math.ceil(a["offset" + b[0].toUpperCase() + b.slice(1)] - w - F - D - .5)) || 0), F
     }
     function gc(a, b, e) {
          var m = ec(a),
               q = (!Ha.boxSizingReliable() || e) && "border-box" ===
                    l.css(a, "boxSizing", !1, m),
               w = q,
               x = Mb(a, b, m),
               D = "offset" + b[0].toUpperCase() + b.slice(1);
          if (Ab.test(x)) {
               if (!e) return x;
               x = "auto"
          }
          return (!Ha.boxSizingReliable() && q || !Ha.reliableTrDimensions() && h(a, "tr") || "auto" === x || !parseFloat(x) && "inline" === l.css(a, "display", !1, m)) && a.getClientRects().length && (q = "border-box" === l.css(a, "boxSizing", !1, m), (w = D in a) && (x = a[D])), (x = parseFloat(x) || 0) + fc(a, b, e || (q ? "border" : "content"), w, m, x) + "px"
     }
     function eb(a, b, e, m, q) {
          return new eb.prototype.init(a, b, e, m, q)
     }
     function hc() {
          B && (!1 ===
               Aa.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(hc) : t.setTimeout(hc, l.fx.interval), l.fx.tick())
     }
     function Hc() {
          return t.setTimeout(function () {
               r = void 0
          }), r = Date.now()
     }
     function Ob(a, b) {
          var e, m = 0,
               q = {
                    height: a
               };
          for (b = b ? 1 : 0; 4 > m; m += 2 - b) q["margin" + (e = ob[m])] = q["padding" + e] = a;
          return b && (q.opacity = q.width = a), q
     }
     function ic(a, b, e) {
          for (var m, q = (hb.tweeners[b] || []).concat(hb.tweeners["*"]), w = 0, x = q.length; w < x; w++)
               if (m = q[w].call(e, b, a)) return m
     }
     function hb(a, b, e) {
          var m, q = 0,
               w = hb.prefilters.length,
               x = l.Deferred().always(function () {
                    delete D.elem
               }),
               D = function () {
                    if (m) return !1;
                    var J = r || Hc();
                    J = Math.max(0, F.startTime + F.duration - J);
                    for (var P = 1 - (J / F.duration || 0), I = 0, aa = F.tweens.length; I < aa; I++) F.tweens[I].run(P);
                    return x.notifyWith(a, [F, P, J]), 1 > P && aa ? J : (aa || x.notifyWith(a, [F, 1, 0]), x.resolveWith(a, [F]), !1)
               },
               F = x.promise({
                    elem: a,
                    props: l.extend({}, b),
                    opts: l.extend(!0, {
                         specialEasing: {},
                         easing: l.easing._default
                    }, e),
                    originalProperties: b,
                    originalOptions: e,
                    startTime: r || Hc(),
                    duration: e.duration,
                    tweens: [],
                    createTween: function (J, P) {
                         J = l.Tween(a, F.opts, J, P, F.opts.specialEasing[J] ||
                              F.opts.easing);
                         return F.tweens.push(J), J
                    },
                    stop: function (J) {
                         var P = 0,
                              I = J ? F.tweens.length : 0;
                         if (m) return this;
                         for (m = !0; P < I; P++) F.tweens[P].run(1);
                         return J ? (x.notifyWith(a, [F, 1, 0]), x.resolveWith(a, [F, J])) : x.rejectWith(a, [F, J]), this
                    }
               });
          e = F.props;
          ! function (J, P) {
               var I, aa, ja, ka, za;
               for (I in J)
                    if (ja = P[aa = V(I)], ka = J[I], Array.isArray(ka) && (ja = ka[1], ka = J[I] = ka[0]), I !== aa && (J[aa] = ka, delete J[I]), (za = l.cssHooks[aa]) && "expand" in za)
                         for (I in ka = za.expand(ka), delete J[aa], ka) I in J || (J[I] = ka[I], P[I] = ja);
                    else P[aa] =
                         ja
          }(e, F.opts.specialEasing);
          for (; q < w; q++)
               if (b = hb.prefilters[q].call(F, a, e, F.opts)) return sa(b.stop) && (l._queueHooks(F.elem, F.opts.queue).stop = b.stop.bind(b)), b;
          return l.map(e, ic, F), sa(F.opts.start) && F.opts.start.call(a, F), F.progress(F.opts.progress).done(F.opts.done, F.opts.complete).fail(F.opts.fail).always(F.opts.always), l.fx.timer(l.extend(D, {
               elem: a,
               anim: F,
               queue: F.opts.queue
          })), F
     }
     function Bb(a) {
          return (a.match(Ya) || []).join(" ")
     }
     function xb(a) {
          return a.getAttribute && a.getAttribute("class") || ""
     }
     function jc(a) {
          return Array.isArray(a) ?
               a : "string" == typeof a && a.match(Ya) || []
     }
     function qc(a, b, e, m) {
          var q;
          if (Array.isArray(b)) l.each(b, function (w, x) {
               e || xd.test(a) ? m(a, x) : qc(a + "[" + ("object" == typeof x && null != x ? w : "") + "]", x, e, m)
          });
          else if (e || "object" !== N(b)) m(a, b);
          else
               for (q in b) qc(a + "[" + q + "]", b[q], e, m)
     }
     function Ic(a) {
          return function (b, e) {
               "string" != typeof b && (e = b, b = "*");
               var m = 0,
                    q = b.toLowerCase().match(Ya) || [];
               if (sa(e))
                    for (; b = q[m++];) "+" === b[0] ? (b = b.slice(1) || "*", (a[b] = a[b] || []).unshift(e)) : (a[b] = a[b] || []).push(e)
          }
     }
     function rc(a, b, e, m) {
          function q(D) {
               var F;
               return w[D] = !0, l.each(a[D] || [], function (J, P) {
                    J = P(b, e, m);
                    return "string" != typeof J || x || w[J] ? x ? !(F = J) : void 0 : (b.dataTypes.unshift(J), q(J), !1)
               }), F
          }
          var w = {},
               x = a === Wc;
          return q(b.dataTypes[0]) || !w["*"] && q("*")
     }
     function ha(a, b) {
          var e, m, q = l.ajaxSettings.flatOptions || {};
          for (e in b) void 0 !== b[e] && ((q[e] ? a : m || (m = {}))[e] = b[e]);
          return m && l.extend(!0, a, m), a
     }
     var pb = [],
          Cb = Object.getPrototypeOf,
          wb = pb.slice,
          Lb = pb.flat ? function (a) {
               return pb.flat.call(a)
          } : function (a) {
               return pb.concat.apply([], a)
          },
          sc = pb.push,
          Jb = pb.indexOf,
          cc = {},
          mc = cc.toString,
          qb = cc.hasOwnProperty,
          Jc = qb.toString,
          tc = Jc.call(Object),
          Ha = {},
          sa = function (a) {
               return "function" == typeof a && "number" != typeof a.nodeType && "function" != typeof a.item
          },
          nb = function (a) {
               return null != a && a === a.window
          },
          Aa = t.document,
          Bc = {
               type: !0,
               src: !0,
               nonce: !0,
               noModule: !0
          },
          l = function (a, b) {
               return new l.fn.init(a, b)
          };
     l.fn = l.prototype = {
          jquery: "3.6.0",
          constructor: l,
          length: 0,
          toArray: function () {
               return wb.call(this)
          },
          get: function (a) {
               return null == a ? wb.call(this) : 0 > a ? this[a + this.length] : this[a]
          },
          pushStack: function (a) {
               a =
                    l.merge(this.constructor(), a);
               return a.prevObject = this, a
          },
          each: function (a) {
               return l.each(this, a)
          },
          map: function (a) {
               return this.pushStack(l.map(this, function (b, e) {
                    return a.call(b, e, b)
               }))
          },
          slice: function () {
               return this.pushStack(wb.apply(this, arguments))
          },
          first: function () {
               return this.eq(0)
          },
          last: function () {
               return this.eq(-1)
          },
          even: function () {
               return this.pushStack(l.grep(this, function (a, b) {
                    return (b + 1) % 2
               }))
          },
          odd: function () {
               return this.pushStack(l.grep(this, function (a, b) {
                    return b % 2
               }))
          },
          eq: function (a) {
               var b =
                    this.length;
               a = +a + (0 > a ? b : 0);
               return this.pushStack(0 <= a && a < b ? [this[a]] : [])
          },
          end: function () {
               return this.prevObject || this.constructor()
          },
          push: sc,
          sort: pb.sort,
          splice: pb.splice
     };
     l.extend = l.fn.extend = function () {
          var a, b, e, m, q, w = arguments[0] || {},
               x = 1,
               D = arguments.length,
               F = !1;
          "boolean" == typeof w && (F = w, w = arguments[x] || {}, x++);
          "object" == typeof w || sa(w) || (w = {});
          for (x === D && (w = this, x--); x < D; x++)
               if (null != (a = arguments[x]))
                    for (b in a) {
                         var J = a[b];
                         "__proto__" !== b && w !== J && (F && J && (l.isPlainObject(J) || (m = Array.isArray(J))) ?
                              (e = w[b], q = m && !Array.isArray(e) ? [] : m || l.isPlainObject(e) ? e : {}, m = !1, w[b] = l.extend(F, q, J)) : void 0 !== J && (w[b] = J))
                    }
          return w
     };
     l.extend({
          expando: "jQuery" + ("3.6.0" + Math.random()).replace(/\D/g, ""),
          isReady: !0,
          error: function (a) {
               throw Error(a);
          },
          noop: function () { },
          isPlainObject: function (a) {
               var b, e;
               return !(!a || "[object Object]" !== mc.call(a)) && (!(b = Cb(a)) || "function" == typeof (e = qb.call(b, "constructor") && b.constructor) && Jc.call(e) === tc)
          },
          isEmptyObject: function (a) {
               for (var b in a) return !1;
               return !0
          },
          globalEval: function (a,
               b, e) {
               R(a, {
                    nonce: b && b.nonce
               }, e)
          },
          each: function (a, b) {
               var e, m = 0;
               if (A(a))
                    for (e = a.length; m < e && !1 !== b.call(a[m], m, a[m]); m++);
               else
                    for (m in a)
                         if (!1 === b.call(a[m], m, a[m])) break;
               return a
          },
          makeArray: function (a, b) {
               b = b || [];
               return null != a && (A(Object(a)) ? l.merge(b, "string" == typeof a ? [a] : a) : sc.call(b, a)), b
          },
          inArray: function (a, b, e) {
               return null == b ? -1 : Jb.call(b, a, e)
          },
          merge: function (a, b) {
               for (var e = +b.length, m = 0, q = a.length; m < e; m++) a[q++] = b[m];
               return a.length = q, a
          },
          grep: function (a, b, e) {
               var m = [],
                    q = 0,
                    w = a.length;
               for (e = !e; q <
                    w; q++) !b(a[q], q) !== e && m.push(a[q]);
               return m
          },
          map: function (a, b, e) {
               var m, q, w = 0,
                    x = [];
               if (A(a))
                    for (m = a.length; w < m; w++) null != (q = b(a[w], w, e)) && x.push(q);
               else
                    for (w in a) null != (q = b(a[w], w, e)) && x.push(q);
               return Lb(x)
          },
          guid: 1,
          support: Ha
     });
     "function" == typeof Symbol && (l.fn[Symbol.iterator] = pb[Symbol.iterator]);
     l.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
          cc["[object " + b + "]"] = b.toLowerCase()
     });
     var Fb = function (a) {
          function b(v, C, H, G) {
               var M, U, T, oa, Y = C && C.ownerDocument;
               var pa = C ? C.nodeType : 9;
               if (H = H || [], "string" != typeof v || !v || 1 !== pa && 9 !== pa && 11 !== pa) return H;
               if (!G && (ib(C), C = C || ya, Ra)) {
                    if (11 !== pa && (oa = yd.exec(v)))
                         if (M = oa[1])
                              if (9 === pa) {
                                   if (!(U = C.getElementById(M))) return H;
                                   if (U.id === M) return H.push(U), H
                              } else {
                                   if (Y && (U = Y.getElementById(M)) && Ja(C, U) && U.id === M) return H.push(U), H
                              }
                         else {
                              if (oa[2]) return Pb.apply(H, C.getElementsByTagName(v)), H;
                              if ((M = oa[3]) && la.getElementsByClassName && C.getElementsByClassName) return Pb.apply(H, C.getElementsByClassName(M)), H
                         }
                    if (!(!la.qsa || Kc[v +
                         " "] || Qa && Qa.test(v) || 1 === pa && "object" === C.nodeName.toLowerCase())) {
                         if (M = v, Y = C, 1 === pa && (zd.test(v) || gd.test(v))) {
                              (Y = Xc.test(v) && I(C.parentNode) || C) === C && la.scope || ((T = C.getAttribute("id")) ? T = T.replace(hd, id) : C.setAttribute("id", T = wa));
                              for (pa = (M = Qb(v)).length; pa--;) M[pa] = (T ? "#" + T : ":scope") + " " + ja(M[pa]);
                              M = M.join(",")
                         }
                         try {
                              return Pb.apply(H, Y.querySelectorAll(M)), H
                         } catch (Ba) {
                              Kc(v, !0)
                         } finally {
                              T === wa && C.removeAttribute("id")
                         }
                    }
               }
               return rb(v.replace(Lc, "$1"), C, H, G)
          }
          function e() {
               var v = [];
               return function M(H,
                    G) {
                    return v.push(H + " ") > ua.cacheLength && delete M[v.shift()], M[H + " "] = G
               }
          }
          function m(v) {
               return v[wa] = !0, v
          }
          function q(v) {
               var C = ya.createElement("fieldset");
               try {
                    return !!v(C)
               } catch (H) {
                    return !1
               } finally {
                    C.parentNode && C.parentNode.removeChild(C)
               }
          }
          function w(v, C) {
               v = v.split("|");
               for (var H = v.length; H--;) ua.attrHandle[v[H]] = C
          }
          function x(v, C) {
               var H = C && v,
                    G = H && 1 === v.nodeType && 1 === C.nodeType && v.sourceIndex - C.sourceIndex;
               if (G) return G;
               if (H)
                    for (; H = H.nextSibling;)
                         if (H === C) return -1;
               return v ? 1 : -1
          }
          function D(v) {
               return function (C) {
                    return "input" ===
                         C.nodeName.toLowerCase() && C.type === v
               }
          }
          function F(v) {
               return function (C) {
                    var H = C.nodeName.toLowerCase();
                    return ("input" === H || "button" === H) && C.type === v
               }
          }
          function J(v) {
               return function (C) {
                    return "form" in C ? C.parentNode && !1 === C.disabled ? "label" in C ? "label" in C.parentNode ? C.parentNode.disabled === v : C.disabled === v : C.isDisabled === v || C.isDisabled !== !v && Ad(C) === v : C.disabled === v : "label" in C && C.disabled === v
               }
          }
          function P(v) {
               return m(function (C) {
                    return C = +C, m(function (H, G) {
                         for (var M, U = v([], H.length, C), T = U.length; T--;) H[M =
                              U[T]] && (H[M] = !(G[M] = H[M]))
                    })
               })
          }
          function I(v) {
               return v && "undefined" != typeof v.getElementsByTagName && v
          }
          function aa() { }
          function ja(v) {
               for (var C = 0, H = v.length, G = ""; C < H; C++) G += v[C].value;
               return G
          }
          function ka(v, C, H) {
               var G = C.dir,
                    M = C.next,
                    U = M || G,
                    T = H && "parentNode" === U,
                    oa = yb++;
               return C.first ? function (Y, pa, Ba) {
                    for (; Y = Y[G];)
                         if (1 === Y.nodeType || T) return v(Y, pa, Ba);
                    return !1
               } : function (Y, pa, Ba) {
                    var Ta, Sa, xa, Ea = [Ka, oa];
                    if (Ba)
                         for (; Y = Y[G];) {
                              if ((1 === Y.nodeType || T) && v(Y, pa, Ba)) return !0
                         } else
                         for (; Y = Y[G];)
                              if (1 === Y.nodeType ||
                                   T)
                                   if (Sa = (xa = Y[wa] || (Y[wa] = {}))[Y.uniqueID] || (xa[Y.uniqueID] = {}), M && M === Y.nodeName.toLowerCase()) Y = Y[G] || Y;
                                   else {
                                        if ((Ta = Sa[U]) && Ta[0] === Ka && Ta[1] === oa) return Ea[2] = Ta[2];
                                        if ((Sa[U] = Ea)[2] = v(Y, pa, Ba)) return !0
                                   } return !1
               }
          }
          function za(v) {
               return 1 < v.length ? function (C, H, G) {
                    for (var M = v.length; M--;)
                         if (!v[M](C, H, G)) return !1;
                    return !0
               } : v[0]
          }
          function La(v, C, H, G, M) {
               for (var U, T = [], oa = 0, Y = v.length, pa = null != C; oa < Y; oa++)(U = v[oa]) && (H && !H(U, G, M) || (T.push(U), pa && C.push(oa)));
               return T
          }
          function sb(v, C, H, G, M, U) {
               return G &&
                    !G[wa] && (G = sb(G)), M && !M[wa] && (M = sb(M, U)), m(function (T, oa, Y, pa) {
                         var Ba, Ta = [],
                              Sa = [],
                              xa = oa.length,
                              Ea;
                         if (!(Ea = T)) {
                              Ea = C || "*";
                              for (var Ia = Y.nodeType ? [Y] : Y, tb = [], ab = 0, Xa = Ia.length; ab < Xa; ab++) b(Ea, Ia[ab], tb);
                              Ea = tb
                         }
                         Ea = !v || !T && C ? Ea : La(Ea, Ta, v, Y, pa);
                         Ia = H ? M || (T ? v : xa || G) ? [] : oa : Ea;
                         if (H && H(Ea, Ia, Y, pa), G) {
                              var Ua = La(Ia, Sa);
                              G(Ua, [], Y, pa);
                              for (Y = Ua.length; Y--;)(Ba = Ua[Y]) && (Ia[Sa[Y]] = !(Ea[Sa[Y]] = Ba))
                         }
                         if (T) {
                              if (M || v) {
                                   if (M) {
                                        Ua = [];
                                        for (Y = Ia.length; Y--;)(Ba = Ia[Y]) && Ua.push(Ea[Y] = Ba);
                                        M(null, Ia = [], Ua, pa)
                                   }
                                   for (Y = Ia.length; Y--;)(Ba =
                                        Ia[Y]) && -1 < (Ua = M ? Yb(T, Ba) : Ta[Y]) && (T[Ua] = !(oa[Ua] = Ba))
                              }
                         } else Ia = La(Ia === oa ? Ia.splice(xa, Ia.length) : Ia), M ? M(null, oa, Ia, pa) : Pb.apply(oa, Ia)
                    })
          }
          function Za(v) {
               var C, H, G = v.length,
                    M = ua.relative[v[0].type];
               var U = M || ua.relative[" "];
               for (var T = M ? 1 : 0, oa = ka(function (Ba) {
                    return Ba === C
               }, U, !0), Y = ka(function (Ba) {
                    return -1 < Yb(C, Ba)
               }, U, !0), pa = [function (Ba, Ta, Sa) {
                    Ba = !M && (Sa || Ta !== Rb) || ((C = Ta).nodeType ? oa(Ba, Ta, Sa) : Y(Ba, Ta, Sa));
                    return C = null, Ba
               }]; T < G; T++)
                    if (U = ua.relative[v[T].type]) pa = [ka(za(pa), U)];
                    else {
                         if ((U = ua.filter[v[T].type].apply(null,
                              v[T].matches))[wa]) {
                              for (H = ++T; H < G && !ua.relative[v[H].type]; H++);
                              return sb(1 < T && za(pa), 1 < T && ja(v.slice(0, T - 1).concat({
                                   value: " " === v[T - 2].type ? "*" : ""
                              })).replace(Lc, "$1"), U, T < H && Za(v.slice(T, H)), H < G && Za(v = v.slice(H)), H < G && ja(v))
                         }
                         pa.push(U)
                    } return za(pa)
          }
          var jb, la, ua, Ca, Wa, Qb, uc, rb, Rb, kb, lb, ib, ya, Ma, Ra, Qa, fb, $a, Ja, wa = "sizzle" + 1 * new Date,
               Va = a.document,
               Ka = 0,
               yb = 0,
               Zb = e(),
               Mc = e(),
               jd = e(),
               Kc = e(),
               Yc = function (v, C) {
                    return v === C && (lb = !0), 0
               },
               Bd = {}.hasOwnProperty,
               $b = [],
               Cd = $b.pop,
               Dd = $b.push,
               Pb = $b.push,
               kd = $b.slice,
               Yb =
                    function (v, C) {
                         for (var H = 0, G = v.length; H < G; H++)
                              if (v[H] === C) return H;
                         return -1
                    },
               Ed = /[\x20\t\r\n\f]+/g,
               Lc = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
               Fd = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
               gd = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
               zd = /[\x20\t\r\n\f]|>/,
               Gd = /:((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,
               Hd = /^(?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+$/,
               Nc = {
                    ID: /^#((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)/,
                    CLASS: /^\.((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)/,
                    TAG: /^((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+|[*])/,
                    ATTR: /^\[[\x20\t\r\n\f]*((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+))|)[\x20\t\r\n\f]*\]/,
                    PSEUDO: /^:((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,
                    CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
                    bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
                    needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
               },
               Id = /HTML$/i,
               Jd = /^(?:input|select|textarea|button)$/i,
               Kd = /^h\d$/i,
               vc = /^[^{]+\{\s*\[native \w/,
               yd = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
               Xc = /[+~]/,
               Db = /\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\([^\r\n\f])/g,
               Eb = function (v, C) {
                    v = "0x" + v.slice(1) -
                         65536;
                    return C || (0 > v ? String.fromCharCode(v + 65536) : String.fromCharCode(v >> 10 | 55296, 1023 & v | 56320))
               },
               hd = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
               id = function (v, C) {
                    return C ? "\x00" === v ? "\ufffd" : v.slice(0, -1) + "\\" + v.charCodeAt(v.length - 1).toString(16) + " " : "\\" + v
               },
               ld = function () {
                    ib()
               },
               Ad = ka(function (v) {
                    return !0 === v.disabled && "fieldset" === v.nodeName.toLowerCase()
               }, {
                    dir: "parentNode",
                    next: "legend"
               });
          try {
               Pb.apply($b = kd.call(Va.childNodes), Va.childNodes), $b[Va.childNodes.length].nodeType
          } catch (v) {
               Pb = {
                    apply: $b.length ? function (C, H) {
                         Dd.apply(C, kd.call(H))
                    } : function (C, H) {
                         for (var G = C.length, M = 0; C[G++] = H[M++];);
                         C.length = G - 1
                    }
               }
          }
          for (jb in la = b.support = {}, Wa = b.isXML = function (v) {
               var C = v && (v.ownerDocument || v).documentElement;
               return !Id.test(v && v.namespaceURI || C && C.nodeName || "HTML")
          }, ib = b.setDocument = function (v) {
               var C, H;
               v = v ? v.ownerDocument || v : Va;
               return v != ya && 9 === v.nodeType && v.documentElement && (Ma = (ya = v).documentElement, Ra = !Wa(ya), Va != ya && (H = ya.defaultView) && H.top !== H && (H.addEventListener ? H.addEventListener("unload",
                    ld, !1) : H.attachEvent && H.attachEvent("onunload", ld)), la.scope = q(function (G) {
                         return Ma.appendChild(G).appendChild(ya.createElement("div")), "undefined" != typeof G.querySelectorAll && !G.querySelectorAll(":scope fieldset div").length
                    }), la.attributes = q(function (G) {
                         return G.className = "i", !G.getAttribute("className")
                    }), la.getElementsByTagName = q(function (G) {
                         return G.appendChild(ya.createComment("")), !G.getElementsByTagName("*").length
                    }), la.getElementsByClassName = vc.test(ya.getElementsByClassName), la.getById =
                    q(function (G) {
                         return Ma.appendChild(G).id = wa, !ya.getElementsByName || !ya.getElementsByName(wa).length
                    }), la.getById ? (ua.filter.ID = function (G) {
                         var M = G.replace(Db, Eb);
                         return function (U) {
                              return U.getAttribute("id") === M
                         }
                    }, ua.find.ID = function (G, M) {
                         if ("undefined" != typeof M.getElementById && Ra) return (G = M.getElementById(G)) ? [G] : []
                    }) : (ua.filter.ID = function (G) {
                         var M = G.replace(Db, Eb);
                         return function (U) {
                              return (U = "undefined" != typeof U.getAttributeNode && U.getAttributeNode("id")) && U.value === M
                         }
                    }, ua.find.ID = function (G,
                         M) {
                         if ("undefined" != typeof M.getElementById && Ra) {
                              var U, T = M.getElementById(G);
                              if (T) {
                                   if ((U = T.getAttributeNode("id")) && U.value === G) return [T];
                                   var oa = M.getElementsByName(G);
                                   for (M = 0; T = oa[M++];)
                                        if ((U = T.getAttributeNode("id")) && U.value === G) return [T]
                              }
                              return []
                         }
                    }), ua.find.TAG = la.getElementsByTagName ? function (G, M) {
                         return "undefined" != typeof M.getElementsByTagName ? M.getElementsByTagName(G) : la.qsa ? M.querySelectorAll(G) : void 0
                    } : function (G, M) {
                         var U = [],
                              T = 0;
                         M = M.getElementsByTagName(G);
                         if ("*" === G) {
                              for (; G = M[T++];) 1 ===
                                   G.nodeType && U.push(G);
                              return U
                         }
                         return M
                    }, ua.find.CLASS = la.getElementsByClassName && function (G, M) {
                         if ("undefined" != typeof M.getElementsByClassName && Ra) return M.getElementsByClassName(G)
                    }, fb = [], Qa = [], (la.qsa = vc.test(ya.querySelectorAll)) && (q(function (G) {
                         var M;
                         Ma.appendChild(G).innerHTML = "\x3ca id\x3d'" + wa + "'\x3e\x3c/a\x3e\x3cselect id\x3d'" + wa + "-\r\\' msallowcapture\x3d''\x3e\x3coption selected\x3d''\x3e\x3c/option\x3e\x3c/select\x3e";
                         G.querySelectorAll("[msallowcapture^\x3d'']").length && Qa.push("[*^$]\x3d[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                         G.querySelectorAll("[selected]").length || Qa.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                         G.querySelectorAll("[id~\x3d" + wa + "-]").length || Qa.push("~\x3d");
                         (M = ya.createElement("input")).setAttribute("name", "");
                         G.appendChild(M);
                         G.querySelectorAll("[name\x3d'']").length || Qa.push("\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*\x3d[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                         G.querySelectorAll(":checked").length ||
                              Qa.push(":checked");
                         G.querySelectorAll("a#" + wa + "+*").length || Qa.push(".#.+[+~]");
                         G.querySelectorAll("\\\f");
                         Qa.push("[\\r\\n\\f]")
                    }), q(function (G) {
                         G.innerHTML = "\x3ca href\x3d'' disabled\x3d'disabled'\x3e\x3c/a\x3e\x3cselect disabled\x3d'disabled'\x3e\x3coption/\x3e\x3c/select\x3e";
                         var M = ya.createElement("input");
                         M.setAttribute("type", "hidden");
                         G.appendChild(M).setAttribute("name", "D");
                         G.querySelectorAll("[name\x3dd]").length && Qa.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?\x3d");
                         2 !== G.querySelectorAll(":enabled").length &&
                              Qa.push(":enabled", ":disabled");
                         Ma.appendChild(G).disabled = !0;
                         2 !== G.querySelectorAll(":disabled").length && Qa.push(":enabled", ":disabled");
                         G.querySelectorAll("*,:x");
                         Qa.push(",.*:")
                    })), (la.matchesSelector = vc.test($a = Ma.matches || Ma.webkitMatchesSelector || Ma.mozMatchesSelector || Ma.oMatchesSelector || Ma.msMatchesSelector)) && q(function (G) {
                         la.disconnectedMatch = $a.call(G, "*");
                         $a.call(G, "[s!\x3d'']:x");
                         fb.push("!\x3d", ":((?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?\x3d)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)")
                    }),
                    Qa = Qa.length && new RegExp(Qa.join("|")), fb = fb.length && new RegExp(fb.join("|")), C = vc.test(Ma.compareDocumentPosition), Ja = C || vc.test(Ma.contains) ? function (G, M) {
                         var U = 9 === G.nodeType ? G.documentElement : G;
                         M = M && M.parentNode;
                         return G === M || !(!M || 1 !== M.nodeType || !(U.contains ? U.contains(M) : G.compareDocumentPosition && 16 & G.compareDocumentPosition(M)))
                    } : function (G, M) {
                         if (M)
                              for (; M = M.parentNode;)
                                   if (M === G) return !0;
                         return !1
                    }, Yc = C ? function (G, M) {
                         if (G === M) return lb = !0, 0;
                         var U = !G.compareDocumentPosition - !M.compareDocumentPosition;
                         return U || (1 & (U = (G.ownerDocument || G) == (M.ownerDocument || M) ? G.compareDocumentPosition(M) : 1) || !la.sortDetached && M.compareDocumentPosition(G) === U ? G == ya || G.ownerDocument == Va && Ja(Va, G) ? -1 : M == ya || M.ownerDocument == Va && Ja(Va, M) ? 1 : kb ? Yb(kb, G) - Yb(kb, M) : 0 : 4 & U ? -1 : 1)
                    } : function (G, M) {
                         if (G === M) return lb = !0, 0;
                         var U = 0,
                              T = G.parentNode,
                              oa = M.parentNode,
                              Y = [G],
                              pa = [M];
                         if (!T || !oa) return G == ya ? -1 : M == ya ? 1 : T ? -1 : oa ? 1 : kb ? Yb(kb, G) - Yb(kb, M) : 0;
                         if (T === oa) return x(G, M);
                         for (; G = G.parentNode;) Y.unshift(G);
                         for (G = M; G = G.parentNode;) pa.unshift(G);
                         for (; Y[U] === pa[U];) U++;
                         return U ? x(Y[U], pa[U]) : Y[U] == Va ? -1 : pa[U] == Va ? 1 : 0
                    }), ya
          }, b.matches = function (v, C) {
               return b(v, null, null, C)
          }, b.matchesSelector = function (v, C) {
               if (ib(v), !(!la.matchesSelector || !Ra || Kc[C + " "] || fb && fb.test(C) || Qa && Qa.test(C))) try {
                    var H = $a.call(v, C);
                    if (H || la.disconnectedMatch || v.document && 11 !== v.document.nodeType) return H
               } catch (G) {
                    Kc(C, !0)
               }
               return 0 < b(C, ya, null, [v]).length
          }, b.contains = function (v, C) {
               return (v.ownerDocument || v) != ya && ib(v), Ja(v, C)
          }, b.attr = function (v, C) {
               (v.ownerDocument || v) !=
                    ya && ib(v);
               var H = ua.attrHandle[C.toLowerCase()];
               H = H && Bd.call(ua.attrHandle, C.toLowerCase()) ? H(v, C, !Ra) : void 0;
               return void 0 !== H ? H : la.attributes || !Ra ? v.getAttribute(C) : (H = v.getAttributeNode(C)) && H.specified ? H.value : null
          }, b.escape = function (v) {
               return (v + "").replace(hd, id)
          }, b.error = function (v) {
               throw Error("Syntax error, unrecognized expression: " + v);
          }, b.uniqueSort = function (v) {
               var C, H = [],
                    G = 0,
                    M = 0;
               if (lb = !la.detectDuplicates, kb = !la.sortStable && v.slice(0), v.sort(Yc), lb) {
                    for (; C = v[M++];) C === v[M] && (G = H.push(M));
                    for (; G--;) v.splice(H[G], 1)
               }
               return kb = null, v
          }, Ca = b.getText = function (v) {
               var C, H = "",
                    G = 0;
               if (C = v.nodeType)
                    if (1 === C || 9 === C || 11 === C) {
                         if ("string" == typeof v.textContent) return v.textContent;
                         for (v = v.firstChild; v; v = v.nextSibling) H += Ca(v)
                    } else {
                         if (3 === C || 4 === C) return v.nodeValue
                    }
               else
                    for (; C = v[G++];) H += Ca(C);
               return H
          }, (ua = b.selectors = {
               cacheLength: 50,
               createPseudo: m,
               match: Nc,
               attrHandle: {},
               find: {},
               relative: {
                    "\x3e": {
                         dir: "parentNode",
                         first: !0
                    },
                    " ": {
                         dir: "parentNode"
                    },
                    "+": {
                         dir: "previousSibling",
                         first: !0
                    },
                    "~": {
                         dir: "previousSibling"
                    }
               },
               preFilter: {
                    ATTR: function (v) {
                         return v[1] = v[1].replace(Db, Eb), v[3] = (v[3] || v[4] || v[5] || "").replace(Db, Eb), "~\x3d" === v[2] && (v[3] = " " + v[3] + " "), v.slice(0, 4)
                    },
                    CHILD: function (v) {
                         return v[1] = v[1].toLowerCase(), "nth" === v[1].slice(0, 3) ? (v[3] || b.error(v[0]), v[4] = +(v[4] ? v[5] + (v[6] || 1) : 2 * ("even" === v[3] || "odd" === v[3])), v[5] = +(v[7] + v[8] || "odd" === v[3])) : v[3] && b.error(v[0]), v
                    },
                    PSEUDO: function (v) {
                         var C, H = !v[6] && v[2];
                         return Nc.CHILD.test(v[0]) ? null : (v[3] ? v[2] = v[4] || v[5] || "" : H && Gd.test(H) && (C = Qb(H, !0)) && (C = H.indexOf(")",
                              H.length - C) - H.length) && (v[0] = v[0].slice(0, C), v[2] = H.slice(0, C)), v.slice(0, 3))
                    }
               },
               filter: {
                    TAG: function (v) {
                         var C = v.replace(Db, Eb).toLowerCase();
                         return "*" === v ? function () {
                              return !0
                         } : function (H) {
                              return H.nodeName && H.nodeName.toLowerCase() === C
                         }
                    },
                    CLASS: function (v) {
                         var C = Zb[v + " "];
                         return C || (C = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + v + "([\\x20\\t\\r\\n\\f]|$)"), Zb(v, function (H) {
                              return C.test("string" == typeof H.className && H.className || "undefined" != typeof H.getAttribute && H.getAttribute("class") || "")
                         }))
                    },
                    ATTR: function (v,
                         C, H) {
                         return function (G) {
                              G = b.attr(G, v);
                              return null == G ? "!\x3d" === C : !C || (G += "", "\x3d" === C ? G === H : "!\x3d" === C ? G !== H : "^\x3d" === C ? H && 0 === G.indexOf(H) : "*\x3d" === C ? H && -1 < G.indexOf(H) : "$\x3d" === C ? H && G.slice(-H.length) === H : "~\x3d" === C ? -1 < (" " + G.replace(Ed, " ") + " ").indexOf(H) : "|\x3d" === C && (G === H || G.slice(0, H.length + 1) === H + "-"))
                         }
                    },
                    CHILD: function (v, C, H, G, M) {
                         var U = "nth" !== v.slice(0, 3),
                              T = "last" !== v.slice(-4),
                              oa = "of-type" === C;
                         return 1 === G && 0 === M ? function (Y) {
                              return !!Y.parentNode
                         } : function (Y, pa, Ba) {
                              var Ta, Sa, xa, Ea;
                              pa = U !== T ? "nextSibling" : "previousSibling";
                              var Ia = Y.parentNode,
                                   tb = oa && Y.nodeName.toLowerCase(),
                                   ab = !Ba && !oa,
                                   Xa = !1;
                              if (Ia) {
                                   if (U) {
                                        for (; pa;) {
                                             for (xa = Y; xa = xa[pa];)
                                                  if (oa ? xa.nodeName.toLowerCase() === tb : 1 === xa.nodeType) return !1;
                                             var Ua = pa = "only" === v && !Ua && "nextSibling"
                                        }
                                        return !0
                                   }
                                   if (Ua = [T ? Ia.firstChild : Ia.lastChild], T && ab)
                                        for (Xa = (Ea = (Ta = (Ba = (Sa = (xa = Ia)[wa] || (xa[wa] = {}))[xa.uniqueID] || (Sa[xa.uniqueID] = {}))[v] || [])[0] === Ka && Ta[1]) && Ta[2], xa = Ea && Ia.childNodes[Ea]; xa = ++Ea && xa && xa[pa] || (Xa = Ea = 0) || Ua.pop();) {
                                             if (1 === xa.nodeType &&
                                                  ++Xa && xa === Y) {
                                                  Ba[v] = [Ka, Ea, Xa];
                                                  break
                                             }
                                        } else if (ab && (Xa = Ea = (Ta = ((Sa = (xa = Y)[wa] || (xa[wa] = {}))[xa.uniqueID] || (Sa[xa.uniqueID] = {}))[v] || [])[0] === Ka && Ta[1]), !1 === Xa)
                                        for (;
                                             (xa = ++Ea && xa && xa[pa] || (Xa = Ea = 0) || Ua.pop()) && ((oa ? xa.nodeName.toLowerCase() !== tb : 1 !== xa.nodeType) || !++Xa || (ab && ((Ba = (Sa = xa[wa] || (xa[wa] = {}))[xa.uniqueID] || (Sa[xa.uniqueID] = {}))[v] = [Ka, Xa]), xa !== Y)););
                                   return (Xa -= M) === G || 0 == Xa % G && 0 <= Xa / G
                              }
                         }
                    },
                    PSEUDO: function (v, C) {
                         var H, G = ua.pseudos[v] || ua.setFilters[v.toLowerCase()] || b.error("unsupported pseudo: " +
                              v);
                         return G[wa] ? G(C) : 1 < G.length ? (H = [v, v, "", C], ua.setFilters.hasOwnProperty(v.toLowerCase()) ? m(function (M, U) {
                              for (var T, oa = G(M, C), Y = oa.length; Y--;) M[T = Yb(M, oa[Y])] = !(U[T] = oa[Y])
                         }) : function (M) {
                              return G(M, 0, H)
                         }) : G
                    }
               },
               pseudos: {
                    not: m(function (v) {
                         var C = [],
                              H = [],
                              G = uc(v.replace(Lc, "$1"));
                         return G[wa] ? m(function (M, U, T, oa) {
                              var Y;
                              T = G(M, null, oa, []);
                              for (oa = M.length; oa--;)(Y = T[oa]) && (M[oa] = !(U[oa] = Y))
                         }) : function (M, U, T) {
                              return C[0] = M, G(C, null, T, H), C[0] = null, !H.pop()
                         }
                    }),
                    has: m(function (v) {
                         return function (C) {
                              return 0 <
                                   b(v, C).length
                         }
                    }),
                    contains: m(function (v) {
                         return v = v.replace(Db, Eb),
                              function (C) {
                                   return -1 < (C.textContent || Ca(C)).indexOf(v)
                              }
                    }),
                    lang: m(function (v) {
                         return Hd.test(v || "") || b.error("unsupported lang: " + v), v = v.replace(Db, Eb).toLowerCase(),
                              function (C) {
                                   var H;
                                   do
                                        if (H = Ra ? C.lang : C.getAttribute("xml:lang") || C.getAttribute("lang")) return (H = H.toLowerCase()) === v || 0 === H.indexOf(v + "-"); while ((C = C.parentNode) && 1 === C.nodeType);
                                   return !1
                              }
                    }),
                    target: function (v) {
                         var C = a.location && a.location.hash;
                         return C && C.slice(1) === v.id
                    },
                    root: function (v) {
                         return v === Ma
                    },
                    focus: function (v) {
                         return v === ya.activeElement && (!ya.hasFocus || ya.hasFocus()) && !!(v.type || v.href || ~v.tabIndex)
                    },
                    enabled: J(!1),
                    disabled: J(!0),
                    checked: function (v) {
                         var C = v.nodeName.toLowerCase();
                         return "input" === C && !!v.checked || "option" === C && !!v.selected
                    },
                    selected: function (v) {
                         return v.parentNode && v.parentNode.selectedIndex, !0 === v.selected
                    },
                    empty: function (v) {
                         for (v = v.firstChild; v; v = v.nextSibling)
                              if (6 > v.nodeType) return !1;
                         return !0
                    },
                    parent: function (v) {
                         return !ua.pseudos.empty(v)
                    },
                    header: function (v) {
                         return Kd.test(v.nodeName)
                    },
                    input: function (v) {
                         return Jd.test(v.nodeName)
                    },
                    button: function (v) {
                         var C = v.nodeName.toLowerCase();
                         return "input" === C && "button" === v.type || "button" === C
                    },
                    text: function (v) {
                         var C;
                         return "input" === v.nodeName.toLowerCase() && "text" === v.type && (null == (C = v.getAttribute("type")) || "text" === C.toLowerCase())
                    },
                    first: P(function () {
                         return [0]
                    }),
                    last: P(function (v, C) {
                         return [C - 1]
                    }),
                    eq: P(function (v, C, H) {
                         return [0 > H ? H + C : H]
                    }),
                    even: P(function (v, C) {
                         for (var H = 0; H < C; H += 2) v.push(H);
                         return v
                    }),
                    odd: P(function (v, C) {
                         for (var H = 1; H < C; H += 2) v.push(H);
                         return v
                    }),
                    lt: P(function (v, C, H) {
                         for (C = 0 > H ? H + C : C < H ? C : H; 0 <= --C;) v.push(C);
                         return v
                    }),
                    gt: P(function (v, C, H) {
                         for (H = 0 > H ? H + C : H; ++H < C;) v.push(H);
                         return v
                    })
               }
          }).pseudos.nth = ua.pseudos.eq, {
               radio: !0,
               checkbox: !0,
               file: !0,
               password: !0,
               image: !0
          }) ua.pseudos[jb] = D(jb);
          for (jb in {
               submit: !0,
               reset: !0
          }) ua.pseudos[jb] = F(jb);
          return aa.prototype = ua.filters = ua.pseudos, ua.setFilters = new aa, Qb = b.tokenize = function (v, C) {
               var H, G, M, U, T, oa;
               if (T = Mc[v + " "]) return C ? 0 : T.slice(0);
               T = v;
               var Y = [];
               for (oa = ua.preFilter; T;) {
                    for (U in H && !(G = Fd.exec(T)) || (G && (T = T.slice(G[0].length) || T), Y.push(M = [])), H = !1, (G = gd.exec(T)) && (H = G.shift(), M.push({
                         value: H,
                         type: G[0].replace(Lc, " ")
                    }), T = T.slice(H.length)), ua.filter) !(G = Nc[U].exec(T)) || oa[U] && !(G = oa[U](G)) || (H = G.shift(), M.push({
                         value: H,
                         type: U,
                         matches: G
                    }), T = T.slice(H.length));
                    if (!H) break
               }
               return C ? T.length : T ? b.error(v) : Mc(v, Y).slice(0)
          }, uc = b.compile = function (v, C) {
               var H, G, M, U, T = [],
                    oa = [],
                    Y = jd[v + " "];
               if (!Y) {
                    C || (C = Qb(v));
                    for (H = C.length; H--;)(Y = Za(C[H]))[wa] ?
                         T.push(Y) : oa.push(Y);
                    (Y = jd(v, (G = 0 < T.length, M = 0 < oa.length, U = function (pa, Ba, Ta, Sa, xa) {
                         var Ea, Ia, tb = 0,
                              ab = "0",
                              Xa = pa && [],
                              Ua = [],
                              md = Rb,
                              nd = pa || M && ua.find.TAG("*", xa),
                              od = Ka += null == md ? 1 : Math.random() || .1,
                              Ld = nd.length;
                         for (xa && (Rb = Ba == ya || Ba || xa); ab !== Ld && null != (Ea = nd[ab]); ab++) {
                              if (M && Ea) {
                                   var Zc = 0;
                                   for (Ba || Ea.ownerDocument == ya || (ib(Ea), Ta = !Ra); Ia = oa[Zc++];)
                                        if (Ia(Ea, Ba || ya, Ta)) {
                                             Sa.push(Ea);
                                             break
                                        } xa && (Ka = od)
                              }
                              G && ((Ea = !Ia && Ea) && tb--, pa && Xa.push(Ea))
                         }
                         if (tb += ab, G && ab !== tb) {
                              for (Zc = 0; Ia = T[Zc++];) Ia(Xa, Ua, Ba, Ta);
                              if (pa) {
                                   if (0 <
                                        tb)
                                        for (; ab--;) Xa[ab] || Ua[ab] || (Ua[ab] = Cd.call(Sa));
                                   Ua = La(Ua)
                              }
                              Pb.apply(Sa, Ua);
                              xa && !pa && 0 < Ua.length && 1 < tb + T.length && b.uniqueSort(Sa)
                         }
                         return xa && (Ka = od, Rb = md), Xa
                    }, G ? m(U) : U))).selector = v
               }
               return Y
          }, rb = b.select = function (v, C, H, G) {
               var M, U, T, oa, Y, pa = "function" == typeof v && v,
                    Ba = !G && Qb(v = pa.selector || v);
               if (H = H || [], 1 === Ba.length) {
                    if (2 < (U = Ba[0] = Ba[0].slice(0)).length && "ID" === (T = U[0]).type && 9 === C.nodeType && Ra && ua.relative[U[1].type]) {
                         if (!(C = (ua.find.ID(T.matches[0].replace(Db, Eb), C) || [])[0])) return H;
                         pa && (C = C.parentNode);
                         v = v.slice(U.shift().value.length)
                    }
                    for (M = Nc.needsContext.test(v) ? 0 : U.length; M-- && (T = U[M], !ua.relative[oa = T.type]);)
                         if ((Y = ua.find[oa]) && (G = Y(T.matches[0].replace(Db, Eb), Xc.test(U[0].type) && I(C.parentNode) || C))) {
                              if (U.splice(M, 1), !(v = G.length && ja(U))) return Pb.apply(H, G), H;
                              break
                         }
               }
               return (pa || uc(v, Ba))(G, C, !Ra, H, !C || Xc.test(v) && I(C.parentNode) || C), H
          }, la.sortStable = wa.split("").sort(Yc).join("") === wa, la.detectDuplicates = !!lb, ib(), la.sortDetached = q(function (v) {
               return 1 & v.compareDocumentPosition(ya.createElement("fieldset"))
          }),
               q(function (v) {
                    return v.innerHTML = "\x3ca href\x3d'#'\x3e\x3c/a\x3e", "#" === v.firstChild.getAttribute("href")
               }) || w("type|href|height|width", function (v, C, H) {
                    if (!H) return v.getAttribute(C, "type" === C.toLowerCase() ? 1 : 2)
               }), la.attributes && q(function (v) {
                    return v.innerHTML = "\x3cinput/\x3e", v.firstChild.setAttribute("value", ""), "" === v.firstChild.getAttribute("value")
               }) || w("value", function (v, C, H) {
                    if (!H && "input" === v.nodeName.toLowerCase()) return v.defaultValue
               }), q(function (v) {
                    return null == v.getAttribute("disabled")
               }) ||
               w("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function (v, C, H) {
                    var G;
                    if (!H) return !0 === v[C] ? C.toLowerCase() : (G = v.getAttributeNode(C)) && G.specified ? G.value : null
               }), b
     }(t);
     l.find = Fb;
     l.expr = Fb.selectors;
     l.expr[":"] = l.expr.pseudos;
     l.uniqueSort = l.unique = Fb.uniqueSort;
     l.text = Fb.getText;
     l.isXMLDoc = Fb.isXML;
     l.contains = Fb.contains;
     l.escapeSelector = Fb.escape;
     var Gb = function (a, b, e) {
          for (var m = [], q = void 0 !== e;
               (a = a[b]) && 9 !== a.nodeType;)
               if (1 ===
                    a.nodeType) {
                    if (q && l(a).is(e)) break;
                    m.push(a)
               } return m
     },
          wc = function (a, b) {
               for (var e = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && e.push(a);
               return e
          },
          Oc = l.expr.match.needsContext,
          Hb = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
     l.filter = function (a, b, e) {
          var m = b[0];
          return e && (a = ":not(" + a + ")"), 1 === b.length && 1 === m.nodeType ? l.find.matchesSelector(m, a) ? [m] : [] : l.find.matches(a, l.grep(b, function (q) {
               return 1 === q.nodeType
          }))
     };
     l.fn.extend({
          find: function (a) {
               var b, e = this.length,
                    m = this;
               if ("string" !=
                    typeof a) return this.pushStack(l(a).filter(function () {
                         for (b = 0; b < e; b++)
                              if (l.contains(m[b], this)) return !0
                    }));
               var q = this.pushStack([]);
               for (b = 0; b < e; b++) l.find(a, m[b], q);
               return 1 < e ? l.uniqueSort(q) : q
          },
          filter: function (a) {
               return this.pushStack(p(this, a || [], !1))
          },
          not: function (a) {
               return this.pushStack(p(this, a || [], !0))
          },
          is: function (a) {
               return !!p(this, "string" == typeof a && Oc.test(a) ? l(a) : a || [], !1).length
          }
     });
     var gb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
     (l.fn.init = function (a, b, e) {
          var m, q;
          if (!a) return this;
          if (e =
               e || $c, "string" == typeof a) {
               if (!(m = "\x3c" === a[0] && "\x3e" === a[a.length - 1] && 3 <= a.length ? [null, a, null] : gb.exec(a)) || !m[1] && b) return !b || b.jquery ? (b || e).find(a) : this.constructor(b).find(a);
               if (m[1]) {
                    if (b = b instanceof l ? b[0] : b, l.merge(this, l.parseHTML(m[1], b && b.nodeType ? b.ownerDocument || b : Aa, !0)), Hb.test(m[1]) && l.isPlainObject(b))
                         for (m in b) sa(this[m]) ? this[m](b[m]) : this.attr(m, b[m]);
                    return this
               }
               return (q = Aa.getElementById(m[2])) && (this[0] = q, this.length = 1), this
          }
          return a.nodeType ? (this[0] = a, this.length = 1, this) :
               sa(a) ? void 0 !== e.ready ? e.ready(a) : a(l) : l.makeArray(a, this)
     }).prototype = l.fn;
     var $c = l(Aa);
     var Pc = /^(?:parents|prev(?:Until|All))/,
          xc = {
               children: !0,
               contents: !0,
               next: !0,
               prev: !0
          };
     l.fn.extend({
          has: function (a) {
               var b = l(a, this),
                    e = b.length;
               return this.filter(function () {
                    for (var m = 0; m < e; m++)
                         if (l.contains(this, b[m])) return !0
               })
          },
          closest: function (a, b) {
               var e, m = 0,
                    q = this.length,
                    w = [],
                    x = "string" != typeof a && l(a);
               if (!Oc.test(a))
                    for (; m < q; m++)
                         for (e = this[m]; e && e !== b; e = e.parentNode)
                              if (11 > e.nodeType && (x ? -1 < x.index(e) : 1 === e.nodeType &&
                                   l.find.matchesSelector(e, a))) {
                                   w.push(e);
                                   break
                              } return this.pushStack(1 < w.length ? l.uniqueSort(w) : w)
          },
          index: function (a) {
               return a ? "string" == typeof a ? Jb.call(l(a), this[0]) : Jb.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
          },
          add: function (a, b) {
               return this.pushStack(l.uniqueSort(l.merge(this.get(), l(a, b))))
          },
          addBack: function (a) {
               return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
          }
     });
     l.each({
          parent: function (a) {
               return (a = a.parentNode) && 11 !== a.nodeType ? a :
                    null
          },
          parents: function (a) {
               return Gb(a, "parentNode")
          },
          parentsUntil: function (a, b, e) {
               return Gb(a, "parentNode", e)
          },
          next: function (a) {
               return u(a, "nextSibling")
          },
          prev: function (a) {
               return u(a, "previousSibling")
          },
          nextAll: function (a) {
               return Gb(a, "nextSibling")
          },
          prevAll: function (a) {
               return Gb(a, "previousSibling")
          },
          nextUntil: function (a, b, e) {
               return Gb(a, "nextSibling", e)
          },
          prevUntil: function (a, b, e) {
               return Gb(a, "previousSibling", e)
          },
          siblings: function (a) {
               return wc((a.parentNode || {}).firstChild, a)
          },
          children: function (a) {
               return wc(a.firstChild)
          },
          contents: function (a) {
               return null != a.contentDocument && Cb(a.contentDocument) ? a.contentDocument : (h(a, "template") && (a = a.content || a), l.merge([], a.childNodes))
          }
     }, function (a, b) {
          l.fn[a] = function (e, m) {
               var q = l.map(this, b, e);
               return "Until" !== a.slice(-5) && (m = e), m && "string" == typeof m && (q = l.filter(m, q)), 1 < this.length && (xc[a] || l.uniqueSort(q), Pc.test(a) && q.reverse()), this.pushStack(q)
          }
     });
     var Ya = /[^\x20\t\r\n\f]+/g;
     l.Callbacks = function (a) {
          var b, e;
          a = "string" == typeof a ? (b = a, e = {}, l.each(b.match(Ya) || [], function (aa, ja) {
               e[ja] = !0
          }), e) : l.extend({}, a);
          var m, q, w, x, D = [],
               F = [],
               J = -1,
               P = function () {
                    x = x || a.once;
                    for (w = m = !0; F.length; J = -1)
                         for (q = F.shift(); ++J < D.length;) !1 === D[J].apply(q[0], q[1]) && a.stopOnFalse && (J = D.length, q = !1);
                    a.memory || (q = !1);
                    m = !1;
                    x && (D = q ? [] : "")
               },
               I = {
                    add: function () {
                         return D && (q && !m && (J = D.length - 1, F.push(q)), function ka(ja) {
                              l.each(ja, function (za, La) {
                                   sa(La) ? a.unique && I.has(La) || D.push(La) : La && La.length && "string" !== N(La) && ka(La)
                              })
                         }(arguments), q && !m && P()), this
                    },
                    remove: function () {
                         return l.each(arguments, function (aa, ja) {
                              for (var ka; - 1 <
                                   (ka = l.inArray(ja, D, ka));) D.splice(ka, 1), ka <= J && J--
                         }), this
                    },
                    has: function (aa) {
                         return aa ? -1 < l.inArray(aa, D) : 0 < D.length
                    },
                    empty: function () {
                         return D && (D = []), this
                    },
                    disable: function () {
                         return x = F = [], D = q = "", this
                    },
                    disabled: function () {
                         return !D
                    },
                    lock: function () {
                         return x = F = [], q || m || (D = q = ""), this
                    },
                    locked: function () {
                         return !!x
                    },
                    fireWith: function (aa, ja) {
                         return x || (ja = [aa, (ja = ja || []).slice ? ja.slice() : ja], F.push(ja), m || P()), this
                    },
                    fire: function () {
                         return I.fireWith(this, arguments), this
                    },
                    fired: function () {
                         return !!w
                    }
               };
          return I
     };
     l.extend({
          Deferred: function (a) {
               var b = [
                    ["notify", "progress", l.Callbacks("memory"), l.Callbacks("memory"), 2],
                    ["resolve", "done", l.Callbacks("once memory"), l.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", l.Callbacks("once memory"), l.Callbacks("once memory"), 1, "rejected"]
               ],
                    e = "pending",
                    m = {
                         state: function () {
                              return e
                         },
                         always: function () {
                              return q.done(arguments).fail(arguments), this
                         },
                         "catch": function (w) {
                              return m.then(null, w)
                         },
                         pipe: function () {
                              var w = arguments;
                              return l.Deferred(function (x) {
                                   l.each(b, function (D,
                                        F) {
                                        var J = sa(w[F[4]]) && w[F[4]];
                                        q[F[1]](function () {
                                             var P = J && J.apply(this, arguments);
                                             P && sa(P.promise) ? P.promise().progress(x.notify).done(x.resolve).fail(x.reject) : x[F[0] + "With"](this, J ? [P] : arguments)
                                        })
                                   });
                                   w = null
                              }).promise()
                         },
                         then: function (w, x, D) {
                              function F(P, I, aa, ja) {
                                   return function () {
                                        var ka = this,
                                             za = arguments,
                                             La = function () {
                                                  var Za;
                                                  if (!(P < J)) {
                                                       if ((Za = aa.apply(ka, za)) === I.promise()) throw new TypeError("Thenable self-resolution");
                                                       var jb = Za && ("object" == typeof Za || "function" == typeof Za) && Za.then;
                                                       sa(jb) ? ja ?
                                                            jb.call(Za, F(J, I, y, ja), F(J, I, z, ja)) : (J++, jb.call(Za, F(J, I, y, ja), F(J, I, z, ja), F(J, I, y, I.notifyWith))) : (aa !== y && (ka = void 0, za = [Za]), (ja || I.resolveWith)(ka, za))
                                                  }
                                             },
                                             sb = ja ? La : function () {
                                                  try {
                                                       La()
                                                  } catch (Za) {
                                                       l.Deferred.exceptionHook && l.Deferred.exceptionHook(Za, sb.stackTrace), J <= P + 1 && (aa !== z && (ka = void 0, za = [Za]), I.rejectWith(ka, za))
                                                  }
                                             };
                                        P ? sb() : (l.Deferred.getStackHook && (sb.stackTrace = l.Deferred.getStackHook()), t.setTimeout(sb))
                                   }
                              }
                              var J = 0;
                              return l.Deferred(function (P) {
                                   b[0][3].add(F(0, P, sa(D) ? D : y, P.notifyWith));
                                   b[1][3].add(F(0, P, sa(w) ? w : y));
                                   b[2][3].add(F(0, P, sa(x) ? x : z))
                              }).promise()
                         },
                         promise: function (w) {
                              return null != w ? l.extend(w, m) : m
                         }
                    },
                    q = {};
               return l.each(b, function (w, x) {
                    var D = x[2],
                         F = x[5];
                    m[x[1]] = D.add;
                    F && D.add(function () {
                         e = F
                    }, b[3 - w][2].disable, b[3 - w][3].disable, b[0][2].lock, b[0][3].lock);
                    D.add(x[3].fire);
                    q[x[0]] = function () {
                         return q[x[0] + "With"](this === q ? void 0 : this, arguments), this
                    };
                    q[x[0] + "With"] = D.fireWith
               }), m.promise(q), a && a.call(q, q), q
          },
          when: function (a) {
               var b = arguments.length,
                    e = b,
                    m = Array(e),
                    q = wb.call(arguments),
                    w = l.Deferred(),
                    x = function (D) {
                         return function (F) {
                              m[D] = this;
                              q[D] = 1 < arguments.length ? wb.call(arguments) : F;
                              --b || w.resolveWith(m, q)
                         }
                    };
               if (1 >= b && (E(a, w.done(x(e)).resolve, w.reject, !b), "pending" === w.state() || sa(q[e] && q[e].then))) return w.then();
               for (; e--;) E(q[e], x(e), w.reject);
               return w.promise()
          }
     });
     var ad = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
     l.Deferred.exceptionHook = function (a, b) {
          t.console && t.console.warn && a && ad.test(a.name) && t.console.warn("jQuery.Deferred exception: " + a.message, a.stack,
               b)
     };
     l.readyException = function (a) {
          t.setTimeout(function () {
               throw a;
          })
     };
     var yc = l.Deferred();
     l.fn.ready = function (a) {
          return yc.then(a)["catch"](function (b) {
               l.readyException(b)
          }), this
     };
     l.extend({
          isReady: !1,
          readyWait: 1,
          ready: function (a) {
               (!0 === a ? --l.readyWait : l.isReady) || (l.isReady = !0) !== a && 0 < --l.readyWait || yc.resolveWith(Aa, [l])
          }
     });
     l.ready.then = yc.then;
     "complete" === Aa.readyState || "loading" !== Aa.readyState && !Aa.documentElement.doScroll ? t.setTimeout(l.ready) : (Aa.addEventListener("DOMContentLoaded", L), t.addEventListener("load",
          L));
     var ub = function (a, b, e, m, q, w, x) {
          var D = 0,
               F = a.length,
               J = null == e;
          if ("object" === N(e))
               for (D in q = !0, e) ub(a, b, D, e[D], !0, w, x);
          else if (void 0 !== m && (q = !0, sa(m) || (x = !0), J && (x ? (b.call(a, m), b = null) : (J = b, b = function (P, I, aa) {
               return J.call(l(P), aa)
          })), b))
               for (; D < F; D++) b(a[D], e, x ? m : m.call(a[D], D, b(a[D], e)));
          return q ? a : J ? b.call(a) : F ? b(a[0], e) : w
     },
          Rc = /^-ms-/,
          vb = /-([a-z])/g,
          ac = function (a) {
               return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
          };
     Q.uid = 1;
     Q.prototype = {
          cache: function (a) {
               var b = a[this.expando];
               return b || (b = {},
                    ac(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                         value: b,
                         configurable: !0
                    }))), b
          },
          set: function (a, b, e) {
               var m;
               a = this.cache(a);
               if ("string" == typeof b) a[V(b)] = e;
               else
                    for (m in b) a[V(m)] = b[m];
               return a
          },
          get: function (a, b) {
               return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][V(b)]
          },
          access: function (a, b, e) {
               return void 0 === b || b && "string" == typeof b && void 0 === e ? this.get(a, b) : (this.set(a, b, e), void 0 !== e ? e : b)
          },
          remove: function (a, b) {
               var e = a[this.expando];
               if (void 0 !== e) {
                    if (void 0 !==
                         b) {
                         var m = (b = Array.isArray(b) ? b.map(V) : (b = V(b)) in e ? [b] : b.match(Ya) || []).length;
                         for (; m--;) delete e[b[m]]
                    } (void 0 === b || l.isEmptyObject(e)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
               }
          },
          hasData: function (a) {
               a = a[this.expando];
               return void 0 !== a && !l.isEmptyObject(a)
          }
     };
     var na = new Q,
          bb = new Q,
          Ub = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
          Sc = /[A-Z]/g;
     l.extend({
          hasData: function (a) {
               return bb.hasData(a) || na.hasData(a)
          },
          data: function (a, b, e) {
               return bb.access(a, b, e)
          },
          removeData: function (a, b) {
               bb.remove(a, b)
          },
          _data: function (a, b, e) {
               return na.access(a, b, e)
          },
          _removeData: function (a, b) {
               na.remove(a, b)
          }
     });
     l.fn.extend({
          data: function (a, b) {
               var e, m, q, w = this[0],
                    x = w && w.attributes;
               if (void 0 === a) {
                    if (this.length && (q = bb.get(w), 1 === w.nodeType && !na.get(w, "hasDataAttrs"))) {
                         for (e = x.length; e--;) x[e] && 0 === (m = x[e].name).indexOf("data-") && (m = V(m.slice(5)), X(w, m, q[m]));
                         na.set(w, "hasDataAttrs", !0)
                    }
                    return q
               }
               return "object" == typeof a ? this.each(function () {
                    bb.set(this, a)
               }) : ub(this, function (D) {
                    var F;
                    if (w && void 0 === D) return void 0 !== (F =
                         bb.get(w, a)) ? F : void 0 !== (F = X(w, a)) ? F : void 0;
                    this.each(function () {
                         bb.set(this, a, D)
                    })
               }, null, b, 1 < arguments.length, null, !0)
          },
          removeData: function (a) {
               return this.each(function () {
                    bb.remove(this, a)
               })
          }
     });
     l.extend({
          queue: function (a, b, e) {
               var m;
               if (a) return b = (b || "fx") + "queue", m = na.get(a, b), e && (!m || Array.isArray(e) ? m = na.access(a, b, l.makeArray(e)) : m.push(e)), m || []
          },
          dequeue: function (a, b) {
               b = b || "fx";
               var e = l.queue(a, b),
                    m = e.length,
                    q = e.shift(),
                    w = l._queueHooks(a, b);
               "inprogress" === q && (q = e.shift(), m--);
               q && ("fx" === b && e.unshift("inprogress"),
                    delete w.stop, q.call(a, function () {
                         l.dequeue(a, b)
                    }, w));
               !m && w && w.empty.fire()
          },
          _queueHooks: function (a, b) {
               var e = b + "queueHooks";
               return na.get(a, e) || na.access(a, e, {
                    empty: l.Callbacks("once memory").add(function () {
                         na.remove(a, [b + "queue", e])
                    })
               })
          }
     });
     l.fn.extend({
          queue: function (a, b) {
               var e = 2;
               return "string" != typeof a && (b = a, a = "fx", e--), arguments.length < e ? l.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                    var m = l.queue(this, a, b);
                    l._queueHooks(this, a);
                    "fx" === a && "inprogress" !== m[0] && l.dequeue(this, a)
               })
          },
          dequeue: function (a) {
               return this.each(function () {
                    l.dequeue(this,
                         a)
               })
          },
          clearQueue: function (a) {
               return this.queue(a || "fx", [])
          },
          promise: function (a, b) {
               var e, m = 1,
                    q = l.Deferred(),
                    w = this,
                    x = this.length,
                    D = function () {
                         --m || q.resolveWith(w, [w])
                    };
               "string" != typeof a && (b = a, a = void 0);
               for (a = a || "fx"; x--;)(e = na.get(w[x], a + "queueHooks")) && e.empty && (m++, e.empty.add(D));
               return D(), q.promise(b)
          }
     });
     var Qc = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
          Vb = new RegExp("^(?:([+-])\x3d|)(" + Qc + ")([a-z%]*)$", "i"),
          ob = ["Top", "Right", "Bottom", "Left"],
          Ib = Aa.documentElement,
          Kb = function (a) {
               return l.contains(a.ownerDocument,
                    a)
          },
          bd = {
               composed: !0
          };
     Ib.getRootNode && (Kb = function (a) {
          return l.contains(a.ownerDocument, a) || a.getRootNode(bd) === a.ownerDocument
     });
     var dc = function (a, b) {
          return "none" === (a = b || a).style.display || "" === a.style.display && Kb(a) && "none" === l.css(a, "display")
     },
          Cc = {};
     l.fn.extend({
          show: function () {
               return ra(this, !0)
          },
          hide: function () {
               return ra(this)
          },
          toggle: function (a) {
               return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                    dc(this) ? l(this).show() : l(this).hide()
               })
          }
     });
     var kc, mb = /^(?:checkbox|radio)$/i,
          Dc = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
          Ec = /^$|^module$|\/(?:java|ecma)script/i;
     var Sb = Aa.createDocumentFragment().appendChild(Aa.createElement("div"));
     (kc = Aa.createElement("input")).setAttribute("type", "radio");
     kc.setAttribute("checked", "checked");
     kc.setAttribute("name", "t");
     Sb.appendChild(kc);
     Ha.checkClone = Sb.cloneNode(!0).cloneNode(!0).lastChild.checked;
     Sb.innerHTML = "\x3ctextarea\x3ex\x3c/textarea\x3e";
     Ha.noCloneChecked = !!Sb.cloneNode(!0).lastChild.defaultValue;
     Sb.innerHTML = "\x3coption\x3e\x3c/option\x3e";
     Ha.option = !!Sb.lastChild;
     var db = {
          thead: [1, "\x3ctable\x3e", "\x3c/table\x3e"],
          col: [2, "\x3ctable\x3e\x3ccolgroup\x3e", "\x3c/colgroup\x3e\x3c/table\x3e"],
          tr: [2, "\x3ctable\x3e\x3ctbody\x3e", "\x3c/tbody\x3e\x3c/table\x3e"],
          td: [3, "\x3ctable\x3e\x3ctbody\x3e\x3ctr\x3e", "\x3c/tr\x3e\x3c/tbody\x3e\x3c/table\x3e"],
          _default: [0, "", ""]
     };
     db.tbody = db.tfoot = db.colgroup = db.caption = db.thead;
     db.th = db.td;
     Ha.option || (db.optgroup = db.option = [1, "\x3cselect multiple\x3d'multiple'\x3e", "\x3c/select\x3e"]);
     var Tc = /<|&#?\w+;/,
          bc = /^([^.]*)(?:\.(.+)|)/;
     l.event = {
          global: {},
          add: function (a, b, e, m, q) {
               var w, x, D, F, J, P, I, aa;
               var ja = na.get(a);
               if (ac(a))
                    for (e.handler && (e = (w = e).handler, q = w.selector), q && l.find.matchesSelector(Ib, q), e.guid || (e.guid = l.guid++), (F = ja.events) || (F = ja.events = Object.create(null)), (x = ja.handle) || (x = ja.handle = function (za) {
                         return "undefined" != typeof l && l.event.triggered !== za.type ? l.event.dispatch.apply(a, arguments) : void 0
                    }), ja = (b = (b || "").match(Ya) || [""]).length; ja--;) {
                         var ka = aa = (D = bc.exec(b[ja]) || [])[1];
                         D = (D[2] ||
                              "").split(".").sort();
                         ka && (P = l.event.special[ka] || {}, ka = (q ? P.delegateType : P.bindType) || ka, P = l.event.special[ka] || {}, J = l.extend({
                              type: ka,
                              origType: aa,
                              data: m,
                              handler: e,
                              guid: e.guid,
                              selector: q,
                              needsContext: q && l.expr.match.needsContext.test(q),
                              namespace: D.join(".")
                         }, w), (I = F[ka]) || ((I = F[ka] = []).delegateCount = 0, P.setup && !1 !== P.setup.call(a, m, D, x) || a.addEventListener && a.addEventListener(ka, x)), P.add && (P.add.call(a, J), J.handler.guid || (J.handler.guid = e.guid)), q ? I.splice(I.delegateCount++, 0, J) : I.push(J), l.event.global[ka] = !0)
                    }
          },
          remove: function (a, b, e, m, q) {
               var w, x, D, F, J, P, I, aa, ja = na.hasData(a) && na.get(a);
               if (ja && (F = ja.events)) {
                    for (J = (b = (b || "").match(Ya) || [""]).length; J--;)
                         if (P = aa = (D = bc.exec(b[J]) || [])[1], I = (D[2] || "").split(".").sort(), P) {
                              var ka = l.event.special[P] || {};
                              var za = F[P = (m ? ka.delegateType : ka.bindType) || P] || [];
                              D = D[2] && new RegExp("(^|\\.)" + I.join("\\.(?:.*\\.|)") + "(\\.|$)");
                              for (x = w = za.length; w--;) {
                                   var La = za[w];
                                   !q && aa !== La.origType || e && e.guid !== La.guid || D && !D.test(La.namespace) || m && m !== La.selector && ("**" !== m || !La.selector) ||
                                        (za.splice(w, 1), La.selector && za.delegateCount--, ka.remove && ka.remove.call(a, La))
                              }
                              x && !za.length && (ka.teardown && !1 !== ka.teardown.call(a, I, ja.handle) || l.removeEvent(a, P, ja.handle), delete F[P])
                         } else
                              for (P in F) l.event.remove(a, P + b[J], e, m, !0);
                    l.isEmptyObject(F) && na.remove(a, "handle events")
               }
          },
          dispatch: function (a) {
               var b, e, m, q, w = Array(arguments.length),
                    x = l.event.fix(a);
               var D = (na.get(this, "events") || Object.create(null))[x.type] || [];
               var F = l.event.special[x.type] || {};
               w[0] = x;
               for (b = 1; b < arguments.length; b++) w[b] =
                    arguments[b];
               if (x.delegateTarget = this, !F.preDispatch || !1 !== F.preDispatch.call(this, x)) {
                    var J = l.event.handlers.call(this, x, D);
                    for (b = 0;
                         (m = J[b++]) && !x.isPropagationStopped();)
                         for (x.currentTarget = m.elem, D = 0;
                              (q = m.handlers[D++]) && !x.isImmediatePropagationStopped();) x.rnamespace && !1 !== q.namespace && !x.rnamespace.test(q.namespace) || (x.handleObj = q, x.data = q.data, void 0 !== (e = ((l.event.special[q.origType] || {}).handle || q.handler).apply(m.elem, w)) && !1 === (x.result = e) && (x.preventDefault(), x.stopPropagation()));
                    return F.postDispatch &&
                         F.postDispatch.call(this, x), x.result
               }
          },
          handlers: function (a, b) {
               var e, m, q, w = [],
                    x = b.delegateCount,
                    D = a.target;
               if (x && D.nodeType && !("click" === a.type && 1 <= a.button))
                    for (; D !== this; D = D.parentNode || this)
                         if (1 === D.nodeType && ("click" !== a.type || !0 !== D.disabled)) {
                              var F = [];
                              var J = {};
                              for (e = 0; e < x; e++) void 0 === J[q = (m = b[e]).selector + " "] && (J[q] = m.needsContext ? -1 < l(q, this).index(D) : l.find(q, this, null, [D]).length), J[q] && F.push(m);
                              F.length && w.push({
                                   elem: D,
                                   handlers: F
                              })
                         } return D = this, x < b.length && w.push({
                              elem: D,
                              handlers: b.slice(x)
                         }),
                              w
          },
          addProp: function (a, b) {
               Object.defineProperty(l.Event.prototype, a, {
                    enumerable: !0,
                    configurable: !0,
                    get: sa(b) ? function () {
                         if (this.originalEvent) return b(this.originalEvent)
                    } : function () {
                         if (this.originalEvent) return this.originalEvent[a]
                    },
                    set: function (e) {
                         Object.defineProperty(this, a, {
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                              value: e
                         })
                    }
               })
          },
          fix: function (a) {
               return a[l.expando] ? a : new l.Event(a)
          },
          special: {
               load: {
                    noBubble: !0
               },
               click: {
                    setup: function (a) {
                         a = this || a;
                         return mb.test(a.type) && a.click && h(a, "input") && W(a,
                              "click", Z), !1
                    },
                    trigger: function (a) {
                         a = this || a;
                         return mb.test(a.type) && a.click && h(a, "input") && W(a, "click"), !0
                    },
                    _default: function (a) {
                         a = a.target;
                         return mb.test(a.type) && a.click && h(a, "input") && na.get(a, "click") || h(a, "a")
                    }
               },
               beforeunload: {
                    postDispatch: function (a) {
                         void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                    }
               }
          }
     };
     l.removeEvent = function (a, b, e) {
          a.removeEventListener && a.removeEventListener(b, e)
     };
     l.Event = function (a, b) {
          if (!(this instanceof l.Event)) return new l.Event(a, b);
          a && a.type ?
               (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && !1 === a.returnValue ? Z : fa, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a;
          b && l.extend(this, b);
          this.timeStamp = a && a.timeStamp || Date.now();
          this[l.expando] = !0
     };
     l.Event.prototype = {
          constructor: l.Event,
          isDefaultPrevented: fa,
          isPropagationStopped: fa,
          isImmediatePropagationStopped: fa,
          isSimulated: !1,
          preventDefault: function () {
               var a = this.originalEvent;
               this.isDefaultPrevented = Z;
               a && !this.isSimulated && a.preventDefault()
          },
          stopPropagation: function () {
               var a = this.originalEvent;
               this.isPropagationStopped = Z;
               a && !this.isSimulated && a.stopPropagation()
          },
          stopImmediatePropagation: function () {
               var a = this.originalEvent;
               this.isImmediatePropagationStopped = Z;
               a && !this.isSimulated && a.stopImmediatePropagation();
               this.stopPropagation()
          }
     };
     l.each({
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          "char": !0,
          code: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: !0
     }, l.event.addProp);
     l.each({
          focus: "focusin",
          blur: "focusout"
     }, function (a, b) {
          l.event.special[a] = {
               setup: function () {
                    return W(this, a, Fa), !1
               },
               trigger: function () {
                    return W(this, a), !0
               },
               _default: function () {
                    return !0
               },
               delegateType: b
          }
     });
     l.each({
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout"
     }, function (a, b) {
          l.event.special[a] = {
               delegateType: b,
               bindType: b,
               handle: function (e) {
                    var m, q = e.relatedTarget,
                         w = e.handleObj;
                    return q && (q === this || l.contains(this, q)) || (e.type = w.origType, m = w.handler.apply(this, arguments), e.type = b), m
               }
          }
     });
     l.fn.extend({
          on: function (a, b, e, m) {
               return Da(this, a, b, e, m)
          },
          one: function (a, b, e, m) {
               return Da(this, a, b, e, m, 1)
          },
          off: function (a, b, e) {
               var m, q;
               if (a && a.preventDefault && a.handleObj) return m = a.handleObj, l(a.delegateTarget).off(m.namespace ?
                    m.origType + "." + m.namespace : m.origType, m.selector, m.handler), this;
               if ("object" == typeof a) {
                    for (q in a) this.off(q, b, a[q]);
                    return this
               }
               return !1 !== b && "function" != typeof b || (e = b, b = void 0), !1 === e && (e = fa), this.each(function () {
                    l.event.remove(this, a, e, b)
               })
          }
     });
     var cd = /<script|<style|<link/i,
          Fc = /checked\s*(?:[^=]|=\s*.checked.)/i,
          Uc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
     l.extend({
          htmlPrefilter: function (a) {
               return a
          },
          clone: function (a, b, e) {
               var m, q, w, x = a.cloneNode(!0),
                    D = Kb(a);
               if (!(Ha.noCloneChecked || 1 !== a.nodeType &&
                    11 !== a.nodeType || l.isXMLDoc(a))) {
                    var F = ta(x);
                    var J = 0;
                    for (m = (q = ta(a)).length; J < m; J++) {
                         var P = q[J];
                         var I = F[J];
                         void 0;
                         "input" === (w = I.nodeName.toLowerCase()) && mb.test(P.type) ? I.checked = P.checked : "input" !== w && "textarea" !== w || (I.defaultValue = P.defaultValue)
                    }
               }
               if (b)
                    if (e)
                         for (q = q || ta(a), F = F || ta(x), J = 0, m = q.length; J < m; J++) Pa(q[J], F[J]);
                    else Pa(a, x);
               return 0 < (F = ta(x, "script")).length && Oa(F, !D && ta(a, "script")), x
          },
          cleanData: function (a) {
               for (var b, e, m, q = l.event.special, w = 0; void 0 !== (e = a[w]); w++)
                    if (ac(e)) {
                         if (b = e[na.expando]) {
                              if (b.events)
                                   for (m in b.events) q[m] ?
                                        l.event.remove(e, m) : l.removeEvent(e, m, b.handle);
                              e[na.expando] = void 0
                         }
                         e[bb.expando] && (e[bb.expando] = void 0)
                    }
          }
     });
     l.fn.extend({
          detach: function (a) {
               return Wb(this, a, !0)
          },
          remove: function (a) {
               return Wb(this, a)
          },
          text: function (a) {
               return ub(this, function (b) {
                    return void 0 === b ? l.text(this) : this.empty().each(function () {
                         1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = b)
                    })
               }, null, a, arguments.length)
          },
          append: function () {
               return zb(this, arguments, function (a) {
                    1 !== this.nodeType && 11 !== this.nodeType &&
                         9 !== this.nodeType || ia(this, a).appendChild(a)
               })
          },
          prepend: function () {
               return zb(this, arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                         var b = ia(this, a);
                         b.insertBefore(a, b.firstChild)
                    }
               })
          },
          before: function () {
               return zb(this, arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this)
               })
          },
          after: function () {
               return zb(this, arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
               })
          },
          empty: function () {
               for (var a, b = 0; null != (a = this[b]); b++) 1 ===
                    a.nodeType && (l.cleanData(ta(a, !1)), a.textContent = "");
               return this
          },
          clone: function (a, b) {
               return a = null != a && a, b = null == b ? a : b, this.map(function () {
                    return l.clone(this, a, b)
               })
          },
          html: function (a) {
               return ub(this, function (b) {
                    var e = this[0] || {},
                         m = 0,
                         q = this.length;
                    if (void 0 === b && 1 === e.nodeType) return e.innerHTML;
                    if ("string" == typeof b && !cd.test(b) && !db[(Dc.exec(b) || ["", ""])[1].toLowerCase()]) {
                         b = l.htmlPrefilter(b);
                         try {
                              for (; m < q; m++) 1 === (e = this[m] || {}).nodeType && (l.cleanData(ta(e, !1)), e.innerHTML = b);
                              e = 0
                         } catch (w) { }
                    }
                    e &&
                         this.empty().append(b)
               }, null, a, arguments.length)
          },
          replaceWith: function () {
               var a = [];
               return zb(this, arguments, function (b) {
                    var e = this.parentNode;
                    0 > l.inArray(this, a) && (l.cleanData(ta(this)), e && e.replaceChild(b, this))
               }, a)
          }
     });
     l.each({
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith"
     }, function (a, b) {
          l.fn[a] = function (e) {
               for (var m = [], q = l(e), w = q.length - 1, x = 0; x <= w; x++) e = x === w ? this : this.clone(!0), l(q[x])[b](e), sc.apply(m, e.get());
               return this.pushStack(m)
          }
     });
     var Ab = new RegExp("^(" + Qc + ")(?!px)[a-z%]+$", "i"),
          ec = function (a) {
               var b = a.ownerDocument.defaultView;
               return b && b.opener || (b = t), b.getComputedStyle(a)
          },
          Tb = function (a, b, e) {
               var m, q = {};
               for (m in b) q[m] = a.style[m], a.style[m] = b[m];
               for (m in e = e.call(a), b) a.style[m] = q[m];
               return e
          },
          Vc = new RegExp(ob.join("|"), "i");
     ! function () {
          function a() {
               if (F) {
                    D.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
                    F.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
                    Ib.appendChild(D).appendChild(F);
                    var J = t.getComputedStyle(F);
                    b = "1%" !== J.top;
                    x = 12 === Math.round(parseFloat(J.marginLeft));
                    F.style.right = "60%";
                    q = 36 === Math.round(parseFloat(J.right));
                    e = 36 === Math.round(parseFloat(J.width));
                    F.style.position = "absolute";
                    m = 12 === Math.round(parseFloat(F.offsetWidth / 3));
                    Ib.removeChild(D);
                    F = null
               }
          }
          var b, e, m, q, w, x, D = Aa.createElement("div"),
               F = Aa.createElement("div");
          F.style && (F.style.backgroundClip = "content-box", F.cloneNode(!0).style.backgroundClip = "", Ha.clearCloneStyle = "content-box" ===
               F.style.backgroundClip, l.extend(Ha, {
                    boxSizingReliable: function () {
                         return a(), e
                    },
                    pixelBoxStyles: function () {
                         return a(), q
                    },
                    pixelPosition: function () {
                         return a(), b
                    },
                    reliableMarginLeft: function () {
                         return a(), x
                    },
                    scrollboxSize: function () {
                         return a(), m
                    },
                    reliableTrDimensions: function () {
                         var J, P, I, aa;
                         return null == w && (J = Aa.createElement("table"), P = Aa.createElement("tr"), I = Aa.createElement("div"), J.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", P.style.cssText = "border:1px solid", P.style.height =
                              "1px", I.style.height = "9px", I.style.display = "block", Ib.appendChild(J).appendChild(P).appendChild(I), aa = t.getComputedStyle(P), w = parseInt(aa.height, 10) + parseInt(aa.borderTopWidth, 10) + parseInt(aa.borderBottomWidth, 10) === P.offsetHeight, Ib.removeChild(J)), w
                    }
               }))
     }();
     var Gc = ["Webkit", "Moz", "ms"],
          oc = Aa.createElement("div").style,
          Xb = {},
          g = /^(none|table(?!-c[ea]).+)/,
          n = /^--/,
          c = {
               position: "absolute",
               visibility: "hidden",
               display: "block"
          },
          d = {
               letterSpacing: "0",
               fontWeight: "400"
          };
     l.extend({
          cssHooks: {
               opacity: {
                    get: function (a,
                         b) {
                         if (b) return a = Mb(a, "opacity"), "" === a ? "1" : a
                    }
               }
          },
          cssNumber: {
               animationIterationCount: !0,
               columnCount: !0,
               fillOpacity: !0,
               flexGrow: !0,
               flexShrink: !0,
               fontWeight: !0,
               gridArea: !0,
               gridColumn: !0,
               gridColumnEnd: !0,
               gridColumnStart: !0,
               gridRow: !0,
               gridRowEnd: !0,
               gridRowStart: !0,
               lineHeight: !0,
               opacity: !0,
               order: !0,
               orphans: !0,
               widows: !0,
               zIndex: !0,
               zoom: !0
          },
          cssProps: {},
          style: function (a, b, e, m) {
               if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var q, w, x, D = V(b),
                         F = n.test(b),
                         J = a.style;
                    if (F || (b = nc(D)), x = l.cssHooks[b] || l.cssHooks[D],
                         void 0 === e) return x && "get" in x && void 0 !== (q = x.get(a, !1, m)) ? q : J[b];
                    "string" === (w = typeof e) && (q = Vb.exec(e)) && q[1] && (e = ea(a, b, q), w = "number");
                    null != e && e == e && ("number" !== w || F || (e += q && q[3] || (l.cssNumber[D] ? "" : "px")), Ha.clearCloneStyle || "" !== e || 0 !== b.indexOf("background") || (J[b] = "inherit"), x && "set" in x && void 0 === (e = x.set(a, e, m)) || (F ? J.setProperty(b, e) : J[b] = e))
               }
          },
          css: function (a, b, e, m) {
               var q, w, x, D = V(b);
               return n.test(b) || (b = nc(D)), (x = l.cssHooks[b] || l.cssHooks[D]) && "get" in x && (q = x.get(a, !0, e)), void 0 === q && (q =
                    Mb(a, b, m)), "normal" === q && b in d && (q = d[b]), "" === e || e ? (w = parseFloat(q), !0 === e || isFinite(w) ? w || 0 : q) : q
          }
     });
     l.each(["height", "width"], function (a, b) {
          l.cssHooks[b] = {
               get: function (e, m, q) {
                    if (m) return !g.test(l.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? gc(e, b, q) : Tb(e, c, function () {
                         return gc(e, b, q)
                    })
               },
               set: function (e, m, q) {
                    var w, x = ec(e),
                         D = !Ha.scrollboxSize() && "absolute" === x.position,
                         F = (D || q) && "border-box" === l.css(e, "boxSizing", !1, x);
                    q = q ? fc(e, b, q, F, x) : 0;
                    return F && D && (q -= Math.ceil(e["offset" +
                         b[0].toUpperCase() + b.slice(1)] - parseFloat(x[b]) - fc(e, b, "border", !1, x) - .5)), q && (w = Vb.exec(m)) && "px" !== (w[3] || "px") && (e.style[b] = m, m = l.css(e, b)), pc(0, m, q)
               }
          }
     });
     l.cssHooks.marginLeft = Nb(Ha.reliableMarginLeft, function (a, b) {
          if (b) return (parseFloat(Mb(a, "marginLeft")) || a.getBoundingClientRect().left - Tb(a, {
               marginLeft: 0
          }, function () {
               return a.getBoundingClientRect().left
          })) + "px"
     });
     l.each({
          margin: "",
          padding: "",
          border: "Width"
     }, function (a, b) {
          l.cssHooks[a + b] = {
               expand: function (e) {
                    var m = 0,
                         q = {};
                    for (e = "string" == typeof e ?
                         e.split(" ") : [e]; 4 > m; m++) q[a + ob[m] + b] = e[m] || e[m - 2] || e[0];
                    return q
               }
          };
          "margin" !== a && (l.cssHooks[a + b].set = pc)
     });
     l.fn.extend({
          css: function (a, b) {
               return ub(this, function (e, m, q) {
                    var w, x = {},
                         D = 0;
                    if (Array.isArray(m)) {
                         q = ec(e);
                         for (w = m.length; D < w; D++) x[m[D]] = l.css(e, m[D], !1, q);
                         return x
                    }
                    return void 0 !== q ? l.style(e, m, q) : l.css(e, m)
               }, a, b, 1 < arguments.length)
          }
     });
     ((l.Tween = eb).prototype = {
          constructor: eb,
          init: function (a, b, e, m, q, w) {
               this.elem = a;
               this.prop = e;
               this.easing = q || l.easing._default;
               this.options = b;
               this.start = this.now =
                    this.cur();
               this.end = m;
               this.unit = w || (l.cssNumber[e] ? "" : "px")
          },
          cur: function () {
               var a = eb.propHooks[this.prop];
               return a && a.get ? a.get(this) : eb.propHooks._default.get(this)
          },
          run: function (a) {
               var b, e = eb.propHooks[this.prop];
               return this.options.duration ? this.pos = b = l.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), e && e.set ? e.set(this) : eb.propHooks._default.set(this),
                    this
          }
     }).init.prototype = eb.prototype;
     (eb.propHooks = {
          _default: {
               get: function (a) {
                    var b;
                    return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = l.css(a.elem, a.prop, "")) && "auto" !== b ? b : 0
               },
               set: function (a) {
                    l.fx.step[a.prop] ? l.fx.step[a.prop](a) : 1 !== a.elem.nodeType || !l.cssHooks[a.prop] && null == a.elem.style[nc(a.prop)] ? a.elem[a.prop] = a.now : l.style(a.elem, a.prop, a.now + a.unit)
               }
          }
     }).scrollTop = eb.propHooks.scrollLeft = {
          set: function (a) {
               a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] =
                    a.now)
          }
     };
     l.easing = {
          linear: function (a) {
               return a
          },
          swing: function (a) {
               return .5 - Math.cos(a * Math.PI) / 2
          },
          _default: "swing"
     };
     l.fx = eb.prototype.init;
     l.fx.step = {};
     var r, B, K = /^(?:toggle|show|hide)$/,
          O = /queueHooks$/;
     l.Animation = l.extend(hb, {
          tweeners: {
               "*": [function (a, b) {
                    var e = this.createTween(a, b);
                    return ea(e.elem, a, Vb.exec(b), e), e
               }]
          },
          tweener: function (a, b) {
               sa(a) ? (b = a, a = ["*"]) : a = a.match(Ya);
               for (var e, m = 0, q = a.length; m < q; m++) e = a[m], hb.tweeners[e] = hb.tweeners[e] || [], hb.tweeners[e].unshift(b)
          },
          prefilters: [function (a,
               b, e) {
               var m, q, w, x, D, F, J, P = "width" in b || "height" in b,
                    I = this,
                    aa = {},
                    ja = a.style,
                    ka = a.nodeType && dc(a),
                    za = na.get(a, "fxshow");
               for (m in e.queue || (null == (x = l._queueHooks(a, "fx")).unqueued && (x.unqueued = 0, D = x.empty.fire, x.empty.fire = function () {
                    x.unqueued || D()
               }), x.unqueued++, I.always(function () {
                    I.always(function () {
                         x.unqueued--;
                         l.queue(a, "fx").length || x.empty.fire()
                    })
               })), b)
                    if (q = b[m], K.test(q)) {
                         if (delete b[m], w = w || "toggle" === q, q === (ka ? "hide" : "show")) {
                              if ("show" !== q || !za || void 0 === za[m]) continue;
                              ka = !0
                         }
                         aa[m] = za && za[m] ||
                              l.style(a, m)
                    } if ((b = !l.isEmptyObject(b)) || !l.isEmptyObject(aa))
                    for (m in P && 1 === a.nodeType && (e.overflow = [ja.overflow, ja.overflowX, ja.overflowY], null == (F = za && za.display) && (F = na.get(a, "display")), "none" === (J = l.css(a, "display")) && (F ? J = F : (ra([a], !0), F = a.style.display || F, J = l.css(a, "display"), ra([a]))), ("inline" === J || "inline-block" === J && null != F) && "none" === l.css(a, "float") && (b || (I.done(function () {
                         ja.display = F
                    }), null == F && (J = ja.display, F = "none" === J ? "" : J)), ja.display = "inline-block")), e.overflow && (ja.overflow =
                         "hidden", I.always(function () {
                              ja.overflow = e.overflow[0];
                              ja.overflowX = e.overflow[1];
                              ja.overflowY = e.overflow[2]
                         })), b = !1, aa) b || (za ? "hidden" in za && (ka = za.hidden) : za = na.access(a, "fxshow", {
                              display: F
                         }), w && (za.hidden = !ka), ka && ra([a], !0), I.done(function () {
                              for (m in ka || ra([a]), na.remove(a, "fxshow"), aa) l.style(a, m, aa[m])
                         })), b = ic(ka ? za[m] : 0, m, I), m in za || (za[m] = b.start, ka && (b.end = b.start, b.start = 0))
          }],
          prefilter: function (a, b) {
               b ? hb.prefilters.unshift(a) : hb.prefilters.push(a)
          }
     });
     l.speed = function (a, b, e) {
          var m = a &&
               "object" == typeof a ? l.extend({}, a) : {
               complete: e || !e && b || sa(a) && a,
               duration: a,
               easing: e && b || b && !sa(b) && b
          };
          return l.fx.off ? m.duration = 0 : "number" != typeof m.duration && (m.duration in l.fx.speeds ? m.duration = l.fx.speeds[m.duration] : m.duration = l.fx.speeds._default), null != m.queue && !0 !== m.queue || (m.queue = "fx"), m.old = m.complete, m.complete = function () {
               sa(m.old) && m.old.call(this);
               m.queue && l.dequeue(this, m.queue)
          }, m
     };
     l.fn.extend({
          fadeTo: function (a, b, e, m) {
               return this.filter(dc).css("opacity", 0).show().end().animate({
                    opacity: b
               },
                    a, e, m)
          },
          animate: function (a, b, e, m) {
               var q = l.isEmptyObject(a),
                    w = l.speed(b, e, m);
               b = function () {
                    var x = hb(this, l.extend({}, a), w);
                    (q || na.get(this, "finish")) && x.stop(!0)
               };
               return b.finish = b, q || !1 === w.queue ? this.each(b) : this.queue(w.queue, b)
          },
          stop: function (a, b, e) {
               var m = function (q) {
                    var w = q.stop;
                    delete q.stop;
                    w(e)
               };
               return "string" != typeof a && (e = b, b = a, a = void 0), b && this.queue(a || "fx", []), this.each(function () {
                    var q = !0,
                         w = null != a && a + "queueHooks",
                         x = l.timers,
                         D = na.get(this);
                    if (w) D[w] && D[w].stop && m(D[w]);
                    else
                         for (w in D) D[w] &&
                              D[w].stop && O.test(w) && m(D[w]);
                    for (w = x.length; w--;) x[w].elem !== this || null != a && x[w].queue !== a || (x[w].anim.stop(e), q = !1, x.splice(w, 1));
                    !q && e || l.dequeue(this, a)
               })
          },
          finish: function (a) {
               return !1 !== a && (a = a || "fx"), this.each(function () {
                    var b = na.get(this),
                         e = b[a + "queue"];
                    var m = b[a + "queueHooks"];
                    var q = l.timers,
                         w = e ? e.length : 0;
                    b.finish = !0;
                    l.queue(this, a, []);
                    m && m.stop && m.stop.call(this, !0);
                    for (m = q.length; m--;) q[m].elem === this && q[m].queue === a && (q[m].anim.stop(!0), q.splice(m, 1));
                    for (m = 0; m < w; m++) e[m] && e[m].finish &&
                         e[m].finish.call(this);
                    delete b.finish
               })
          }
     });
     l.each(["toggle", "show", "hide"], function (a, b) {
          var e = l.fn[b];
          l.fn[b] = function (m, q, w) {
               return null == m || "boolean" == typeof m ? e.apply(this, arguments) : this.animate(Ob(b, !0), m, q, w)
          }
     });
     l.each({
          slideDown: Ob("show"),
          slideUp: Ob("hide"),
          slideToggle: Ob("toggle"),
          fadeIn: {
               opacity: "show"
          },
          fadeOut: {
               opacity: "hide"
          },
          fadeToggle: {
               opacity: "toggle"
          }
     }, function (a, b) {
          l.fn[a] = function (e, m, q) {
               return this.animate(b, e, m, q)
          }
     });
     l.timers = [];
     l.fx.tick = function () {
          var a, b = 0,
               e = l.timers;
          for (r =
               Date.now(); b < e.length; b++)(a = e[b])() || e[b] !== a || e.splice(b--, 1);
          e.length || l.fx.stop();
          r = void 0
     };
     l.fx.timer = function (a) {
          l.timers.push(a);
          l.fx.start()
     };
     l.fx.interval = 13;
     l.fx.start = function () {
          B || (B = !0, hc())
     };
     l.fx.stop = function () {
          B = null
     };
     l.fx.speeds = {
          slow: 600,
          fast: 200,
          _default: 400
     };
     l.fn.delay = function (a, b) {
          return a = l.fx && l.fx.speeds[a] || a, b = b || "fx", this.queue(b, function (e, m) {
               var q = t.setTimeout(e, a);
               m.stop = function () {
                    t.clearTimeout(q)
               }
          })
     };
     var ca = Aa.createElement("input");
     var da = Aa.createElement("select").appendChild(Aa.createElement("option"));
     ca.type = "checkbox";
     Ha.checkOn = "" !== ca.value;
     Ha.optSelected = da.selected;
     (ca = Aa.createElement("input")).value = "t";
     ca.type = "radio";
     Ha.radioValue = "t" === ca.value;
     var ma = l.expr.attrHandle;
     l.fn.extend({
          attr: function (a, b) {
               return ub(this, l.attr, a, b, 1 < arguments.length)
          },
          removeAttr: function (a) {
               return this.each(function () {
                    l.removeAttr(this, a)
               })
          }
     });
     l.extend({
          attr: function (a, b, e) {
               var m, q, w = a.nodeType;
               if (3 !== w && 8 !== w && 2 !== w) return "undefined" == typeof a.getAttribute ? l.prop(a, b, e) : (1 === w && l.isXMLDoc(a) || (q = l.attrHooks[b.toLowerCase()] ||
                    (l.expr.match.bool.test(b) ? qa : void 0)), void 0 !== e ? null === e ? void l.removeAttr(a, b) : q && "set" in q && void 0 !== (m = q.set(a, e, b)) ? m : (a.setAttribute(b, e + ""), e) : q && "get" in q && null !== (m = q.get(a, b)) ? m : null == (m = l.find.attr(a, b)) ? void 0 : m)
          },
          attrHooks: {
               type: {
                    set: function (a, b) {
                         if (!Ha.radioValue && "radio" === b && h(a, "input")) {
                              var e = a.value;
                              return a.setAttribute("type", b), e && (a.value = e), b
                         }
                    }
               }
          },
          removeAttr: function (a, b) {
               var e = 0,
                    m = b && b.match(Ya);
               if (m && 1 === a.nodeType)
                    for (; b = m[e++];) a.removeAttribute(b)
          }
     });
     var qa = {
          set: function (a,
               b, e) {
               return !1 === b ? l.removeAttr(a, e) : a.setAttribute(e, e), e
          }
     };
     l.each(l.expr.match.bool.source.match(/\w+/g), function (a, b) {
          var e = ma[b] || l.find.attr;
          ma[b] = function (m, q, w) {
               var x, D, F = q.toLowerCase();
               return w || (D = ma[F], ma[F] = x, x = null != e(m, q, w) ? F : null, ma[F] = D), x
          }
     });
     var Na = /^(?:input|select|textarea|button)$/i,
          cb = /^(?:a|area)$/i;
     l.fn.extend({
          prop: function (a, b) {
               return ub(this, l.prop, a, b, 1 < arguments.length)
          },
          removeProp: function (a) {
               return this.each(function () {
                    delete this[l.propFix[a] || a]
               })
          }
     });
     l.extend({
          prop: function (a,
               b, e) {
               var m, q, w = a.nodeType;
               if (3 !== w && 8 !== w && 2 !== w) return 1 === w && l.isXMLDoc(a) || (b = l.propFix[b] || b, q = l.propHooks[b]), void 0 !== e ? q && "set" in q && void 0 !== (m = q.set(a, e, b)) ? m : a[b] = e : q && "get" in q && null !== (m = q.get(a, b)) ? m : a[b]
          },
          propHooks: {
               tabIndex: {
                    get: function (a) {
                         var b = l.find.attr(a, "tabindex");
                         return b ? parseInt(b, 10) : Na.test(a.nodeName) || cb.test(a.nodeName) && a.href ? 0 : -1
                    }
               }
          },
          propFix: {
               "for": "htmlFor",
               "class": "className"
          }
     });
     Ha.optSelected || (l.propHooks.selected = {
          get: function (a) {
               a = a.parentNode;
               return a && a.parentNode &&
                    a.parentNode.selectedIndex, null
          },
          set: function (a) {
               a = a.parentNode;
               a && (a.selectedIndex, a.parentNode && a.parentNode.selectedIndex)
          }
     });
     l.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function () {
          l.propFix[this.toLowerCase()] = this
     });
     l.fn.extend({
          addClass: function (a) {
               var b, e, m, q, w, x, D, F = 0;
               if (sa(a)) return this.each(function (J) {
                    l(this).addClass(a.call(this, J, xb(this)))
               });
               if ((b = jc(a)).length)
                    for (; e = this[F++];)
                         if (q = xb(e), m = 1 === e.nodeType &&
                              " " + Bb(q) + " ") {
                              for (x = 0; w = b[x++];) 0 > m.indexOf(" " + w + " ") && (m += w + " ");
                              q !== (D = Bb(m)) && e.setAttribute("class", D)
                         } return this
          },
          removeClass: function (a) {
               var b, e, m, q, w, x, D, F = 0;
               if (sa(a)) return this.each(function (J) {
                    l(this).removeClass(a.call(this, J, xb(this)))
               });
               if (!arguments.length) return this.attr("class", "");
               if ((b = jc(a)).length)
                    for (; e = this[F++];)
                         if (q = xb(e), m = 1 === e.nodeType && " " + Bb(q) + " ") {
                              for (x = 0; w = b[x++];)
                                   for (; - 1 < m.indexOf(" " + w + " ");) m = m.replace(" " + w + " ", " ");
                              q !== (D = Bb(m)) && e.setAttribute("class", D)
                         } return this
          },
          toggleClass: function (a, b) {
               var e = typeof a,
                    m = "string" === e || Array.isArray(a);
               return "boolean" == typeof b && m ? b ? this.addClass(a) : this.removeClass(a) : sa(a) ? this.each(function (q) {
                    l(this).toggleClass(a.call(this, q, xb(this), b), b)
               }) : this.each(function () {
                    var q, w;
                    if (m) {
                         var x = 0;
                         var D = l(this);
                         for (w = jc(a); q = w[x++];) D.hasClass(q) ? D.removeClass(q) : D.addClass(q)
                    } else void 0 !== a && "boolean" !== e || ((q = xb(this)) && na.set(this, "__className__", q), this.setAttribute && this.setAttribute("class", q || !1 === a ? "" : na.get(this, "__className__") ||
                         ""))
               })
          },
          hasClass: function (a) {
               var b, e = 0;
               for (a = " " + a + " "; b = this[e++];)
                    if (1 === b.nodeType && -1 < (" " + Bb(xb(b)) + " ").indexOf(a)) return !0;
               return !1
          }
     });
     var lc = /\r/g;
     l.fn.extend({
          val: function (a) {
               var b, e, m, q = this[0];
               return arguments.length ? (m = sa(a), this.each(function (w) {
                    var x;
                    1 === this.nodeType && (null == (x = m ? a.call(this, w, l(this).val()) : a) ? x = "" : "number" == typeof x ? x += "" : Array.isArray(x) && (x = l.map(x, function (D) {
                         return null == D ? "" : D + ""
                    })), (b = l.valHooks[this.type] || l.valHooks[this.nodeName.toLowerCase()]) && "set" in b &&
                    void 0 !== b.set(this, x, "value") || (this.value = x))
               })) : q ? (b = l.valHooks[q.type] || l.valHooks[q.nodeName.toLowerCase()]) && "get" in b && void 0 !== (e = b.get(q, "value")) ? e : "string" == typeof (e = q.value) ? e.replace(lc, "") : null == e ? "" : e : void 0
          }
     });
     l.extend({
          valHooks: {
               option: {
                    get: function (a) {
                         var b = l.find.attr(a, "value");
                         return null != b ? b : Bb(l.text(a))
                    }
               },
               select: {
                    get: function (a) {
                         var b, e, m = a.options,
                              q = a.selectedIndex,
                              w = "select-one" === a.type,
                              x = w ? null : [],
                              D = w ? q + 1 : m.length;
                         for (e = 0 > q ? D : w ? q : 0; e < D; e++)
                              if (!(!(b = m[e]).selected && e !==
                                   q || b.disabled || b.parentNode.disabled && h(b.parentNode, "optgroup"))) {
                                   if (a = l(b).val(), w) return a;
                                   x.push(a)
                              } return x
                    },
                    set: function (a, b) {
                         var e, m, q = a.options;
                         b = l.makeArray(b);
                         for (var w = q.length; w--;)((m = q[w]).selected = -1 < l.inArray(l.valHooks.option.get(m), b)) && (e = !0);
                         return e || (a.selectedIndex = -1), b
                    }
               }
          }
     });
     l.each(["radio", "checkbox"], function () {
          l.valHooks[this] = {
               set: function (a, b) {
                    if (Array.isArray(b)) return a.checked = -1 < l.inArray(l(a).val(), b)
               }
          };
          Ha.checkOn || (l.valHooks[this].get = function (a) {
               return null ===
                    a.getAttribute("value") ? "on" : a.value
          })
     });
     Ha.focusin = "onfocusin" in t;
     var pd = /^(?:focusinfocus|focusoutblur)$/,
          qd = function (a) {
               a.stopPropagation()
          };
     l.extend(l.event, {
          trigger: function (a, b, e, m) {
               var q, w, x, D, F, J, P = [e || Aa],
                    I = qb.call(a, "type") ? a.type : a;
               var aa = qb.call(a, "namespace") ? a.namespace.split(".") : [];
               if (q = J = w = e = e || Aa, 3 !== e.nodeType && 8 !== e.nodeType && !pd.test(I + l.event.triggered) && (-1 < I.indexOf(".") && (I = (aa = I.split(".")).shift(), aa.sort()), x = 0 > I.indexOf(":") && "on" + I, (a = a[l.expando] ? a : new l.Event(I, "object" ==
                    typeof a && a)).isTrigger = m ? 2 : 3, a.namespace = aa.join("."), a.rnamespace = a.namespace ? new RegExp("(^|\\.)" + aa.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = void 0, a.target || (a.target = e), b = null == b ? [a] : l.makeArray(b, [a]), F = l.event.special[I] || {}, m || !F.trigger || !1 !== F.trigger.apply(e, b))) {
                    if (!m && !F.noBubble && !nb(e)) {
                         var ja = F.delegateType || I;
                         for (pd.test(ja + I) || (q = q.parentNode); q; q = q.parentNode) P.push(q), w = q;
                         w === (e.ownerDocument || Aa) && P.push(w.defaultView || w.parentWindow || t)
                    }
                    for (aa = 0;
                         (q = P[aa++]) && !a.isPropagationStopped();) J =
                              q, a.type = 1 < aa ? ja : F.bindType || I, (D = (na.get(q, "events") || Object.create(null))[a.type] && na.get(q, "handle")) && D.apply(q, b), (D = x && q[x]) && D.apply && ac(q) && (a.result = D.apply(q, b), !1 === a.result && a.preventDefault());
                    return a.type = I, m || a.isDefaultPrevented() || F._default && !1 !== F._default.apply(P.pop(), b) || !ac(e) || x && sa(e[I]) && !nb(e) && ((w = e[x]) && (e[x] = null), l.event.triggered = I, a.isPropagationStopped() && J.addEventListener(I, qd), e[I](), a.isPropagationStopped() && J.removeEventListener(I, qd), l.event.triggered = void 0,
                         w && (e[x] = w)), a.result
               }
          },
          simulate: function (a, b, e) {
               a = l.extend(new l.Event, e, {
                    type: a,
                    isSimulated: !0
               });
               l.event.trigger(a, null, b)
          }
     });
     l.fn.extend({
          trigger: function (a, b) {
               return this.each(function () {
                    l.event.trigger(a, b, this)
               })
          },
          triggerHandler: function (a, b) {
               var e = this[0];
               if (e) return l.event.trigger(a, b, e, !0)
          }
     });
     Ha.focusin || l.each({
          focus: "focusin",
          blur: "focusout"
     }, function (a, b) {
          var e = function (m) {
               l.event.simulate(b, m.target, l.event.fix(m))
          };
          l.event.special[b] = {
               setup: function () {
                    var m = this.ownerDocument || this.document ||
                         this,
                         q = na.access(m, b);
                    q || m.addEventListener(a, e, !0);
                    na.access(m, b, (q || 0) + 1)
               },
               teardown: function () {
                    var m = this.ownerDocument || this.document || this,
                         q = na.access(m, b) - 1;
                    q ? na.access(m, b, q) : (m.removeEventListener(a, e, !0), na.remove(m, b))
               }
          }
     });
     var zc = t.location,
          rd = Date.now(),
          dd = /\?/;
     l.parseXML = function (a) {
          var b;
          if (!a || "string" != typeof a) return null;
          try {
               var e = (new t.DOMParser).parseFromString(a, "text/xml")
          } catch (m) { }
          return b = e && e.getElementsByTagName("parsererror")[0], e && !b || l.error("Invalid XML: " + (b ? l.map(b.childNodes,
               function (m) {
                    return m.textContent
               }).join("\n") : a)), e
     };
     var xd = /\[\]$/,
          sd = /\r?\n/g,
          Md = /^(?:submit|button|image|reset|file)$/i,
          Nd = /^(?:input|select|textarea|keygen)/i;
     l.param = function (a, b) {
          var e, m = [],
               q = function (w, x) {
                    x = sa(x) ? x() : x;
                    m[m.length] = encodeURIComponent(w) + "\x3d" + encodeURIComponent(null == x ? "" : x)
               };
          if (null == a) return "";
          if (Array.isArray(a) || a.jquery && !l.isPlainObject(a)) l.each(a, function () {
               q(this.name, this.value)
          });
          else
               for (e in a) qc(e, a[e], b, q);
          return m.join("\x26")
     };
     l.fn.extend({
          serialize: function () {
               return l.param(this.serializeArray())
          },
          serializeArray: function () {
               return this.map(function () {
                    var a = l.prop(this, "elements");
                    return a ? l.makeArray(a) : this
               }).filter(function () {
                    var a = this.type;
                    return this.name && !l(this).is(":disabled") && Nd.test(this.nodeName) && !Md.test(a) && (this.checked || !mb.test(a))
               }).map(function (a, b) {
                    a = l(this).val();
                    return null == a ? null : Array.isArray(a) ? l.map(a, function (e) {
                         return {
                              name: b.name,
                              value: e.replace(sd, "\r\n")
                         }
                    }) : {
                         name: b.name,
                         value: a.replace(sd, "\r\n")
                    }
               }).get()
          }
     });
     var Od = /%20/g,
          Pd = /#.*$/,
          Qd = /([?&])_=[^&]*/,
          Rd = /^(.*?):[ \t]*([^\r\n]*)$/gm,
          Sd = /^(?:GET|HEAD)$/,
          Td = /^\/\//,
          td = {},
          Wc = {},
          ud = "*/".concat("*"),
          ed = Aa.createElement("a");
     ed.href = zc.href;
     l.extend({
          active: 0,
          lastModified: {},
          etag: {},
          ajaxSettings: {
               url: zc.href,
               type: "GET",
               isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(zc.protocol),
               global: !0,
               processData: !0,
               async: !0,
               contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
               accepts: {
                    "*": ud,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
               },
               contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
               },
               responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
               },
               converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": l.parseXML
               },
               flatOptions: {
                    url: !0,
                    context: !0
               }
          },
          ajaxSetup: function (a, b) {
               return b ? ha(ha(a, l.ajaxSettings), b) : ha(l.ajaxSettings, a)
          },
          ajaxPrefilter: Ic(td),
          ajaxTransport: Ic(Wc),
          ajax: function (a, b) {
               function e(Ca, Wa, Qb, uc) {
                    var rb, Rb, kb, lb, ib, ya = Wa;
                    ua || (ua = !0, D && t.clearTimeout(D), m = void 0, w = uc || "", la.readyState = 0 < Ca ? 4 : 0, rb = 200 <=
                         Ca && 300 > Ca || 304 === Ca, Qb && (lb = function (Ma, Ra, Qa) {
                              for (var fb, $a, Ja, wa, Va = Ma.contents, Ka = Ma.dataTypes;
                                   "*" === Ka[0];) Ka.shift(), void 0 === fb && (fb = Ma.mimeType || Ra.getResponseHeader("Content-Type"));
                              if (fb)
                                   for ($a in Va)
                                        if (Va[$a] && Va[$a].test(fb)) {
                                             Ka.unshift($a);
                                             break
                                        } if (Ka[0] in Qa) Ja = Ka[0];
                              else {
                                   for ($a in Qa) {
                                        if (!Ka[0] || Ma.converters[$a + " " + Ka[0]]) {
                                             Ja = $a;
                                             break
                                        }
                                        wa || (wa = $a)
                                   }
                                   Ja = Ja || wa
                              }
                              if (Ja) return Ja !== Ka[0] && Ka.unshift(Ja), Qa[Ja]
                         }(I, la, Qb)), !rb && -1 < l.inArray("script", I.dataTypes) && 0 > l.inArray("json", I.dataTypes) &&
                         (I.converters["text script"] = function () { }), lb = function (Ma, Ra, Qa, fb) {
                              var $a, Ja, wa, Va, Ka, yb = {},
                                   Zb = Ma.dataTypes.slice();
                              if (Zb[1])
                                   for (wa in Ma.converters) yb[wa.toLowerCase()] = Ma.converters[wa];
                              for (Ja = Zb.shift(); Ja;)
                                   if (Ma.responseFields[Ja] && (Qa[Ma.responseFields[Ja]] = Ra), !Ka && fb && Ma.dataFilter && (Ra = Ma.dataFilter(Ra, Ma.dataType)), Ka = Ja, Ja = Zb.shift())
                                        if ("*" === Ja) Ja = Ka;
                                        else if ("*" !== Ka && Ka !== Ja) {
                                             if (!(wa = yb[Ka + " " + Ja] || yb["* " + Ja]))
                                                  for ($a in yb)
                                                       if ((Va = $a.split(" "))[1] === Ja && (wa = yb[Ka + " " + Va[0]] || yb["* " +
                                                            Va[0]])) {
                                                            !0 === wa ? wa = yb[$a] : !0 !== yb[$a] && (Ja = Va[0], Zb.unshift(Va[1]));
                                                            break
                                                       } if (!0 !== wa)
                                                  if (wa && Ma["throws"]) Ra = wa(Ra);
                                                  else try {
                                                       Ra = wa(Ra)
                                                  } catch (Mc) {
                                                       return {
                                                            state: "parsererror",
                                                            error: wa ? Mc : "No conversion from " + Ka + " to " + Ja
                                                       }
                                                  }
                                        }
                              return {
                                   state: "success",
                                   data: Ra
                              }
                         }(I, lb, la, rb), rb ? (I.ifModified && ((ib = la.getResponseHeader("Last-Modified")) && (l.lastModified[q] = ib), (ib = la.getResponseHeader("etag")) && (l.etag[q] = ib)), 204 === Ca || "HEAD" === I.type ? ya = "nocontent" : 304 === Ca ? ya = "notmodified" : (ya = lb.state, Rb = lb.data, rb = !(kb =
                              lb.error))) : (kb = ya, !Ca && ya || (ya = "error", 0 > Ca && (Ca = 0))), la.status = Ca, la.statusText = (Wa || ya) + "", rb ? ka.resolveWith(aa, [Rb, ya, la]) : ka.rejectWith(aa, [la, ya, kb]), la.statusCode(La), La = void 0, F && ja.trigger(rb ? "ajaxSuccess" : "ajaxError", [la, I, rb ? Rb : kb]), za.fireWith(aa, [la, ya]), F && (ja.trigger("ajaxComplete", [la, I]), --l.active || l.event.trigger("ajaxStop")))
               }
               "object" == typeof a && (b = a, a = void 0);
               b = b || {};
               var m, q, w, x, D, F, J, P, I = l.ajaxSetup({}, b),
                    aa = I.context || I,
                    ja = I.context && (aa.nodeType || aa.jquery) ? l(aa) : l.event,
                    ka =
                         l.Deferred(),
                    za = l.Callbacks("once memory"),
                    La = I.statusCode || {},
                    sb = {},
                    Za = {},
                    jb = "canceled",
                    la = {
                         readyState: 0,
                         getResponseHeader: function (Ca) {
                              var Wa;
                              if (ua) {
                                   if (!x)
                                        for (x = {}; Wa = Rd.exec(w);) x[Wa[1].toLowerCase() + " "] = (x[Wa[1].toLowerCase() + " "] || []).concat(Wa[2]);
                                   Wa = x[Ca.toLowerCase() + " "]
                              }
                              return null == Wa ? null : Wa.join(", ")
                         },
                         getAllResponseHeaders: function () {
                              return ua ? w : null
                         },
                         setRequestHeader: function (Ca, Wa) {
                              return null == ua && (Ca = Za[Ca.toLowerCase()] = Za[Ca.toLowerCase()] || Ca, sb[Ca] = Wa), this
                         },
                         overrideMimeType: function (Ca) {
                              return null ==
                                   ua && (I.mimeType = Ca), this
                         },
                         statusCode: function (Ca) {
                              var Wa;
                              if (Ca)
                                   if (ua) la.always(Ca[la.status]);
                                   else
                                        for (Wa in Ca) La[Wa] = [La[Wa], Ca[Wa]];
                              return this
                         },
                         abort: function (Ca) {
                              Ca = Ca || jb;
                              return m && m.abort(Ca), e(0, Ca), this
                         }
                    };
               if (ka.promise(la), I.url = ((a || I.url || zc.href) + "").replace(Td, zc.protocol + "//"), I.type = b.method || b.type || I.method || I.type, I.dataTypes = (I.dataType || "*").toLowerCase().match(Ya) || [""], null == I.crossDomain) {
                    a = Aa.createElement("a");
                    try {
                         a.href = I.url, a.href = a.href, I.crossDomain = ed.protocol + "//" +
                              ed.host != a.protocol + "//" + a.host
                    } catch (Ca) {
                         I.crossDomain = !0
                    }
               }
               if (I.data && I.processData && "string" != typeof I.data && (I.data = l.param(I.data, I.traditional)), rc(td, I, b, la), ua) return la;
               for (J in (F = l.event && I.global) && 0 == l.active++ && l.event.trigger("ajaxStart"), I.type = I.type.toUpperCase(), I.hasContent = !Sd.test(I.type), q = I.url.replace(Pd, ""), I.hasContent ? I.data && I.processData && 0 === (I.contentType || "").indexOf("application/x-www-form-urlencoded") && (I.data = I.data.replace(Od, "+")) : (P = I.url.slice(q.length), I.data &&
                    (I.processData || "string" == typeof I.data) && (q += (dd.test(q) ? "\x26" : "?") + I.data, delete I.data), !1 === I.cache && (q = q.replace(Qd, "$1"), P = (dd.test(q) ? "\x26" : "?") + "_\x3d" + rd++ + P), I.url = q + P), I.ifModified && (l.lastModified[q] && la.setRequestHeader("If-Modified-Since", l.lastModified[q]), l.etag[q] && la.setRequestHeader("If-None-Match", l.etag[q])), (I.data && I.hasContent && !1 !== I.contentType || b.contentType) && la.setRequestHeader("Content-Type", I.contentType), la.setRequestHeader("Accept", I.dataTypes[0] && I.accepts[I.dataTypes[0]] ?
                         I.accepts[I.dataTypes[0]] + ("*" !== I.dataTypes[0] ? ", " + ud + "; q\x3d0.01" : "") : I.accepts["*"]), I.headers) la.setRequestHeader(J, I.headers[J]);
               if (I.beforeSend && (!1 === I.beforeSend.call(aa, la, I) || ua)) return la.abort();
               if (jb = "abort", za.add(I.complete), la.done(I.success), la.fail(I.error), m = rc(Wc, I, b, la)) {
                    if (la.readyState = 1, F && ja.trigger("ajaxSend", [la, I]), ua) return la;
                    I.async && 0 < I.timeout && (D = t.setTimeout(function () {
                         la.abort("timeout")
                    }, I.timeout));
                    try {
                         var ua = !1;
                         m.send(sb, e)
                    } catch (Ca) {
                         if (ua) throw Ca;
                         e(-1, Ca)
                    }
               } else e(-1,
                    "No Transport");
               return la
          },
          getJSON: function (a, b, e) {
               return l.get(a, b, e, "json")
          },
          getScript: function (a, b) {
               return l.get(a, void 0, b, "script")
          }
     });
     l.each(["get", "post"], function (a, b) {
          l[b] = function (e, m, q, w) {
               return sa(m) && (w = w || q, q = m, m = void 0), l.ajax(l.extend({
                    url: e,
                    type: b,
                    dataType: w,
                    data: m,
                    success: q
               }, l.isPlainObject(e) && e))
          }
     });
     l.ajaxPrefilter(function (a) {
          for (var b in a.headers) "content-type" === b.toLowerCase() && (a.contentType = a.headers[b] || "")
     });
     l._evalUrl = function (a, b, e) {
          return l.ajax({
               url: a,
               type: "GET",
               dataType: "script",
               cache: !0,
               async: !1,
               global: !1,
               converters: {
                    "text script": function () { }
               },
               dataFilter: function (m) {
                    l.globalEval(m, b, e)
               }
          })
     };
     l.fn.extend({
          wrapAll: function (a) {
               var b;
               return this[0] && (sa(a) && (a = a.call(this[0])), b = l(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
               }).append(this)), this
          },
          wrapInner: function (a) {
               return sa(a) ? this.each(function (b) {
                    l(this).wrapInner(a.call(this, b))
               }) : this.each(function () {
                    var b =
                         l(this),
                         e = b.contents();
                    e.length ? e.wrapAll(a) : b.append(a)
               })
          },
          wrap: function (a) {
               var b = sa(a);
               return this.each(function (e) {
                    l(this).wrapAll(b ? a.call(this, e) : a)
               })
          },
          unwrap: function (a) {
               return this.parent(a).not("body").each(function () {
                    l(this).replaceWith(this.childNodes)
               }), this
          }
     });
     l.expr.pseudos.hidden = function (a) {
          return !l.expr.pseudos.visible(a)
     };
     l.expr.pseudos.visible = function (a) {
          return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
     };
     l.ajaxSettings.xhr = function () {
          try {
               return new t.XMLHttpRequest
          } catch (a) { }
     };
     var Ud = {
          0: 200,
          1223: 204
     },
          Ac = l.ajaxSettings.xhr();
     Ha.cors = !!Ac && "withCredentials" in Ac;
     Ha.ajax = Ac = !!Ac;
     l.ajaxTransport(function (a) {
          var b, e;
          if (Ha.cors || Ac && !a.crossDomain) return {
               send: function (m, q) {
                    var w, x = a.xhr();
                    if (x.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                         for (w in a.xhrFields) x[w] = a.xhrFields[w];
                    for (w in a.mimeType && x.overrideMimeType && x.overrideMimeType(a.mimeType), a.crossDomain || m["X-Requested-With"] || (m["X-Requested-With"] = "XMLHttpRequest"), m) x.setRequestHeader(w, m[w]);
                    b = function (D) {
                         return function () {
                              b &&
                                   (b = e = x.onload = x.onerror = x.onabort = x.ontimeout = x.onreadystatechange = null, "abort" === D ? x.abort() : "error" === D ? "number" != typeof x.status ? q(0, "error") : q(x.status, x.statusText) : q(Ud[x.status] || x.status, x.statusText, "text" !== (x.responseType || "text") || "string" != typeof x.responseText ? {
                                        binary: x.response
                                   } : {
                                        text: x.responseText
                                   }, x.getAllResponseHeaders()))
                         }
                    };
                    x.onload = b();
                    e = x.onerror = x.ontimeout = b("error");
                    void 0 !== x.onabort ? x.onabort = e : x.onreadystatechange = function () {
                         4 === x.readyState && t.setTimeout(function () {
                              b &&
                                   e()
                         })
                    };
                    b = b("abort");
                    try {
                         x.send(a.hasContent && a.data || null)
                    } catch (D) {
                         if (b) throw D;
                    }
               },
               abort: function () {
                    b && b()
               }
          }
     });
     l.ajaxPrefilter(function (a) {
          a.crossDomain && (a.contents.script = !1)
     });
     l.ajaxSetup({
          accepts: {
               script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
          },
          contents: {
               script: /\b(?:java|ecma)script\b/
          },
          converters: {
               "text script": function (a) {
                    return l.globalEval(a), a
               }
          }
     });
     l.ajaxPrefilter("script", function (a) {
          void 0 === a.cache && (a.cache = !1);
          a.crossDomain && (a.type =
               "GET")
     });
     l.ajaxTransport("script", function (a) {
          var b, e;
          if (a.crossDomain || a.scriptAttrs) return {
               send: function (m, q) {
                    b = l("\x3cscript\x3e").attr(a.scriptAttrs || {}).prop({
                         charset: a.scriptCharset,
                         src: a.url
                    }).on("load error", e = function (w) {
                         b.remove();
                         e = null;
                         w && q("error" === w.type ? 404 : 200, w.type)
                    });
                    Aa.head.appendChild(b[0])
               },
               abort: function () {
                    e && e()
               }
          }
     });
     var vd, wd = [],
          fd = /(=)\?(?=&|$)|\?\?/;
     l.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function () {
               var a = wd.pop() || l.expando + "_" + rd++;
               return this[a] = !0, a
          }
     });
     l.ajaxPrefilter("json jsonp",
          function (a, b, e) {
               var m, q, w, x = !1 !== a.jsonp && (fd.test(a.url) ? "url" : "string" == typeof a.data && 0 === (a.contentType || "").indexOf("application/x-www-form-urlencoded") && fd.test(a.data) && "data");
               if (x || "jsonp" === a.dataTypes[0]) return m = a.jsonpCallback = sa(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, x ? a[x] = a[x].replace(fd, "$1" + m) : !1 !== a.jsonp && (a.url += (dd.test(a.url) ? "\x26" : "?") + a.jsonp + "\x3d" + m), a.converters["script json"] = function () {
                    return w || l.error(m + " was not called"), w[0]
               }, a.dataTypes[0] = "json", q =
                    t[m], t[m] = function () {
                         w = arguments
                    }, e.always(function () {
                         void 0 === q ? l(t).removeProp(m) : t[m] = q;
                         a[m] && (a.jsonpCallback = b.jsonpCallback, wd.push(m));
                         w && sa(q) && q(w[0]);
                         w = q = void 0
                    }), "script"
          });
     Ha.createHTMLDocument = ((vd = Aa.implementation.createHTMLDocument("").body).innerHTML = "\x3cform\x3e\x3c/form\x3e\x3cform\x3e\x3c/form\x3e", 2 === vd.childNodes.length);
     l.parseHTML = function (a, b, e) {
          return "string" != typeof a ? [] : ("boolean" == typeof b && (e = b, b = !1), b || (Ha.createHTMLDocument ? ((m = (b = Aa.implementation.createHTMLDocument("")).createElement("base")).href =
               Aa.location.href, b.head.appendChild(m)) : b = Aa), w = !e && [], (q = Hb.exec(a)) ? [b.createElement(q[1])] : (q = ba([a], b, w), w && w.length && l(w).remove(), l.merge([], q.childNodes)));
          var m, q, w
     };
     l.fn.load = function (a, b, e) {
          var m, q, w, x = this,
               D = a.indexOf(" ");
          return -1 < D && (m = Bb(a.slice(D)), a = a.slice(0, D)), sa(b) ? (e = b, b = void 0) : b && "object" == typeof b && (q = "POST"), 0 < x.length && l.ajax({
               url: a,
               type: q || "GET",
               dataType: "html",
               data: b
          }).done(function (F) {
               w = arguments;
               x.html(m ? l("\x3cdiv\x3e").append(l.parseHTML(F)).find(m) : F)
          }).always(e &&
               function (F, J) {
                    x.each(function () {
                         e.apply(this, w || [F.responseText, J, F])
                    })
               }), this
     };
     l.expr.pseudos.animated = function (a) {
          return l.grep(l.timers, function (b) {
               return a === b.elem
          }).length
     };
     l.offset = {
          setOffset: function (a, b, e) {
               var m, q, w, x = l.css(a, "position"),
                    D = l(a),
                    F = {};
               "static" === x && (a.style.position = "relative");
               var J = D.offset();
               var P = l.css(a, "top");
               var I = l.css(a, "left");
               ("absolute" === x || "fixed" === x) && -1 < (P + I).indexOf("auto") ? (w = (m = D.position()).top, q = m.left) : (w = parseFloat(P) || 0, q = parseFloat(I) || 0);
               sa(b) && (b =
                    b.call(a, e, l.extend({}, J)));
               null != b.top && (F.top = b.top - J.top + w);
               null != b.left && (F.left = b.left - J.left + q);
               "using" in b ? b.using.call(a, F) : D.css(F)
          }
     };
     l.fn.extend({
          offset: function (a) {
               if (arguments.length) return void 0 === a ? this : this.each(function (q) {
                    l.offset.setOffset(this, a, q)
               });
               var b, e, m = this[0];
               return m ? m.getClientRects().length ? (b = m.getBoundingClientRect(), e = m.ownerDocument.defaultView, {
                    top: b.top + e.pageYOffset,
                    left: b.left + e.pageXOffset
               }) : {
                    top: 0,
                    left: 0
               } : void 0
          },
          position: function () {
               if (this[0]) {
                    var a, b = this[0],
                         e = {
                              top: 0,
                              left: 0
                         };
                    if ("fixed" === l.css(b, "position")) var m = b.getBoundingClientRect();
                    else {
                         m = this.offset();
                         var q = b.ownerDocument;
                         for (a = b.offsetParent || q.documentElement; a && (a === q.body || a === q.documentElement) && "static" === l.css(a, "position");) a = a.parentNode;
                         a && a !== b && 1 === a.nodeType && ((e = l(a).offset()).top += l.css(a, "borderTopWidth", !0), e.left += l.css(a, "borderLeftWidth", !0))
                    }
                    return {
                         top: m.top - e.top - l.css(b, "marginTop", !0),
                         left: m.left - e.left - l.css(b, "marginLeft", !0)
                    }
               }
          },
          offsetParent: function () {
               return this.map(function () {
                    for (var a =
                         this.offsetParent; a && "static" === l.css(a, "position");) a = a.offsetParent;
                    return a || Ib
               })
          }
     });
     l.each({
          scrollLeft: "pageXOffset",
          scrollTop: "pageYOffset"
     }, function (a, b) {
          var e = "pageYOffset" === b;
          l.fn[a] = function (m) {
               return ub(this, function (q, w, x) {
                    var D;
                    if (nb(q) ? D = q : 9 === q.nodeType && (D = q.defaultView), void 0 === x) return D ? D[b] : q[w];
                    D ? D.scrollTo(e ? D.pageXOffset : x, e ? x : D.pageYOffset) : q[w] = x
               }, a, m, arguments.length)
          }
     });
     l.each(["top", "left"], function (a, b) {
          l.cssHooks[b] = Nb(Ha.pixelPosition, function (e, m) {
               if (m) return m = Mb(e,
                    b), Ab.test(m) ? l(e).position()[b] + "px" : m
          })
     });
     l.each({
          Height: "height",
          Width: "width"
     }, function (a, b) {
          l.each({
               padding: "inner" + a,
               content: b,
               "": "outer" + a
          }, function (e, m) {
               l.fn[m] = function (q, w) {
                    var x = arguments.length && (e || "boolean" != typeof q),
                         D = e || (!0 === q || !0 === w ? "margin" : "border");
                    return ub(this, function (F, J, P) {
                         var I;
                         return nb(F) ? 0 === m.indexOf("outer") ? F["inner" + a] : F.document.documentElement["client" + a] : 9 === F.nodeType ? (I = F.documentElement, Math.max(F.body["scroll" + a], I["scroll" + a], F.body["offset" + a], I["offset" +
                              a], I["client" + a])) : void 0 === P ? l.css(F, J, D) : l.style(F, J, P, D)
                    }, b, x ? q : void 0, x)
               }
          })
     });
     l.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
          l.fn[b] = function (e) {
               return this.on(b, e)
          }
     });
     l.fn.extend({
          bind: function (a, b, e) {
               return this.on(a, null, b, e)
          },
          unbind: function (a, b) {
               return this.off(a, null, b)
          },
          delegate: function (a, b, e, m) {
               return this.on(b, a, e, m)
          },
          undelegate: function (a, b, e) {
               return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", e)
          },
          hover: function (a, b) {
               return this.mouseenter(a).mouseleave(b ||
                    a)
          }
     });
     l.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) {
          l.fn[b] = function (e, m) {
               return 0 < arguments.length ? this.on(b, null, e, m) : this.trigger(b)
          }
     });
     var Vd = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
     l.proxy = function (a, b) {
          var e, m, q;
          if ("string" == typeof b && (e = a[b], b = a, a = e), sa(a)) return m = wb.call(arguments, 2), (q = function () {
               return a.apply(b || this, m.concat(wb.call(arguments)))
          }).guid =
               a.guid = a.guid || l.guid++, q
     };
     l.holdReady = function (a) {
          a ? l.readyWait++ : l.ready(!0)
     };
     l.isArray = Array.isArray;
     l.parseJSON = JSON.parse;
     l.nodeName = h;
     l.isFunction = sa;
     l.isWindow = nb;
     l.camelCase = V;
     l.type = N;
     l.now = Date.now;
     l.isNumeric = function (a) {
          var b = l.type(a);
          return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a))
     };
     l.trim = function (a) {
          return null == a ? "" : (a + "").replace(Vd, "")
     };
     "function" == typeof define && define.amd && define("jquery", [], function () {
          return l
     });
     var Wd = t.jQuery,
          Xd = t.$;
     return l.noConflict = function (a) {
          return t.$ ===
               l && (t.$ = Xd), a && t.jQuery === l && (t.jQuery = Wd), l
     }, "undefined" == typeof f && (t.jQuery = t.$ = l), l
});
(function (t, f) {
     "object" === typeof exports && "undefined" !== typeof module ? f(exports, require("jquery")) : "function" === typeof define && define.amd ? define(["exports", "jquery"], f) : (t = t || self, f(t.bootstrap = {}, t.jQuery))
})(this, function (t, f) {
     function R(g, n) {
          for (var c = 0; c < n.length; c++) {
               var d = n[c];
               d.enumerable = d.enumerable || !1;
               d.configurable = !0;
               "value" in d && (d.writable = !0);
               Object.defineProperty(g, d.key, d)
          }
     }
     function N(g, n, c) {
          n && R(g.prototype, n);
          c && R(g, c);
          return g
     }
     function A(g) {
          for (var n = 1; n < arguments.length; n++) {
               var c =
                    null != arguments[n] ? arguments[n] : {},
                    d = Object.keys(c);
               "function" === typeof Object.getOwnPropertySymbols && (d = d.concat(Object.getOwnPropertySymbols(c).filter(function (r) {
                    return Object.getOwnPropertyDescriptor(c, r).enumerable
               })));
               d.forEach(function (r) {
                    var B = c[r];
                    r in g ? Object.defineProperty(g, r, {
                         value: B,
                         enumerable: !0,
                         configurable: !0,
                         writable: !0
                    }) : g[r] = B
               })
          }
          return g
     }
     function h(g, n) {
          g.prototype = Object.create(n.prototype);
          g.prototype.constructor = g;
          g.__proto__ = n
     }
     function p(g) {
          var n = !1;
          return function () {
               n || (n = !0, window.Promise.resolve().then(function () {
                    n = !1;
                    g()
               }))
          }
     }
     function u(g) {
          var n = !1;
          return function () {
               n || (n = !0, setTimeout(function () {
                    n = !1;
                    g()
               }, Bc))
          }
     }
     function y(g) {
          var n = {};
          return g && "[object Function]" === n.toString.call(g)
     }
     function z(g, n) {
          if (1 !== g.nodeType) return [];
          g = g.ownerDocument.defaultView.getComputedStyle(g, null);
          return n ? g[n] : g
     }
     function E(g) {
          return "HTML" === g.nodeName ? g : g.parentNode || g.host
     }
     function L(g) {
          if (!g) return document.body;
          switch (g.nodeName) {
               case "HTML":
               case "BODY":
                    return g.ownerDocument.body;
               case "#document":
                    return g.body
          }
          var n = z(g);
          return /(auto|scroll|overlay)/.test(n.overflow + n.overflowY + n.overflowX) ? g : L(E(g))
     }
     function S(g) {
          return 11 === g ? Gb : 10 === g ? wc : Gb || wc
     }
     function V(g) {
          if (!g) return document.documentElement;
          for (var n = S(10) ? document.body : null, c = g.offsetParent || null; c === n && g.nextElementSibling;) c = (g = g.nextElementSibling).offsetParent;
          return (n = c && c.nodeName) && "BODY" !== n && "HTML" !== n ? -1 !== ["TH", "TD", "TABLE"].indexOf(c.nodeName) && "static" === z(c, "position") ? V(c) : c : g ? g.ownerDocument.documentElement :
               document.documentElement
     }
     function Q(g) {
          return null !== g.parentNode ? Q(g.parentNode) : g
     }
     function X(g, n) {
          if (!(g && g.nodeType && n && n.nodeType)) return document.documentElement;
          var c = g.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING,
               d = c ? g : n,
               r = c ? n : g;
          c = document.createRange();
          c.setStart(d, 0);
          c.setEnd(r, 0);
          c = c.commonAncestorContainer;
          if (g !== c && n !== c || d.contains(r)) return g = c.nodeName, g = "BODY" === g ? !1 : "HTML" === g || V(c.firstElementChild) === c, g ? c : V(c);
          d = Q(g);
          return d.host ? X(d.host, n) : X(g, Q(n).host)
     }
     function ea(g) {
          var n =
               "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
               c = g.nodeName;
          return "BODY" === c || "HTML" === c ? (c = g.ownerDocument.documentElement, (g.ownerDocument.scrollingElement || c)[n]) : g[n]
     }
     function ra(g, n) {
          var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !1,
               d = ea(n, "top"),
               r = ea(n, "left");
          c = c ? -1 : 1;
          g.top += d * c;
          g.bottom += d * c;
          g.left += r * c;
          g.right += r * c;
          return g
     }
     function ta(g, n) {
          n = "x" === n ? "Left" : "Top";
          var c = "Left" === n ? "Right" : "Bottom";
          return parseFloat(g["border" +
               n + "Width"], 10) + parseFloat(g["border" + c + "Width"], 10)
     }
     function Oa(g, n, c, d) {
          return Math.max(n["offset" + g], n["scroll" + g], c["client" + g], c["offset" + g], c["scroll" + g], S(10) ? parseInt(c["offset" + g]) + parseInt(d["margin" + ("Height" === g ? "Top" : "Left")]) + parseInt(d["margin" + ("Height" === g ? "Bottom" : "Right")]) : 0)
     }
     function ba(g) {
          var n = g.body;
          g = g.documentElement;
          var c = S(10) && getComputedStyle(g);
          return {
               height: Oa("Height", n, g, c),
               width: Oa("Width", n, g, c)
          }
     }
     function Z(g) {
          return gb({}, g, {
               right: g.left + g.width,
               bottom: g.top + g.height
          })
     }
     function fa(g) {
          var n = {};
          try {
               if (S(10)) {
                    n = g.getBoundingClientRect();
                    var c = ea(g, "top"),
                         d = ea(g, "left");
                    n.top += c;
                    n.left += d;
                    n.bottom += c;
                    n.right += d
               } else n = g.getBoundingClientRect()
          } catch (r) { }
          n = {
               left: n.left,
               top: n.top,
               width: n.right - n.left,
               height: n.bottom - n.top
          };
          d = "HTML" === g.nodeName ? ba(g.ownerDocument) : {};
          c = g.offsetWidth - (d.width || g.clientWidth || n.right - n.left);
          d = g.offsetHeight - (d.height || g.clientHeight || n.bottom - n.top);
          if (c || d) g = z(g), c -= ta(g, "x"), d -= ta(g, "y"), n.width -= c, n.height -= d;
          return Z(n)
     }
     function Fa(g,
          n) {
          var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !1,
               d = S(10),
               r = "HTML" === n.nodeName,
               B = fa(g),
               K = fa(n),
               O = L(g),
               ca = z(n),
               da = parseFloat(ca.borderTopWidth, 10),
               ma = parseFloat(ca.borderLeftWidth, 10);
          c && r && (K.top = Math.max(K.top, 0), K.left = Math.max(K.left, 0));
          B = Z({
               top: B.top - K.top - da,
               left: B.left - K.left - ma,
               width: B.width,
               height: B.height
          });
          B.marginTop = 0;
          B.marginLeft = 0;
          !d && r && (r = parseFloat(ca.marginTop, 10), ca = parseFloat(ca.marginLeft, 10), B.top -= da - r, B.bottom -= da - r, B.left -= ma - ca, B.right -= ma - ca, B.marginTop =
               r, B.marginLeft = ca);
          if (d && !c ? n.contains(O) : n === O && "BODY" !== O.nodeName) B = ra(B, n);
          return B
     }
     function Da(g) {
          var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1,
               c = g.ownerDocument.documentElement,
               d = Fa(g, c),
               r = Math.max(c.clientWidth, window.innerWidth || 0),
               B = Math.max(c.clientHeight, window.innerHeight || 0),
               K = n ? 0 : ea(c);
          n = n ? 0 : ea(c, "left");
          return Z({
               top: K - d.top + d.marginTop,
               left: n - d.left + d.marginLeft,
               width: r,
               height: B
          })
     }
     function W(g) {
          var n = g.nodeName;
          return "BODY" === n || "HTML" === n ? !1 : "fixed" === z(g, "position") ?
               !0 : (g = E(g)) ? W(g) : !1
     }
     function ia(g) {
          if (!g || !g.parentElement || S()) return document.documentElement;
          for (g = g.parentElement; g && "none" === z(g, "transform");) g = g.parentElement;
          return g || document.documentElement
     }
     function va(g, n, c, d) {
          var r = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : !1,
               B = {
                    top: 0,
                    left: 0
               },
               K = r ? ia(g) : X(g, n);
          if ("viewport" === d) B = Da(K, r);
          else {
               if ("scrollParent" === d) {
                    var O = L(E(n));
                    "BODY" === O.nodeName && (O = g.ownerDocument.documentElement)
               } else O = "window" === d ? g.ownerDocument.documentElement : d;
               r = Fa(O, K, r);
               "HTML" !== O.nodeName || W(K) ? B = r : (O = ba(g.ownerDocument), K = O.height, O = O.width, B.top += r.top - r.marginTop, B.bottom = K + r.top, B.left += r.left - r.marginLeft, B.right = O + r.left)
          }
          c = c || 0;
          r = "number" === typeof c;
          B.left += r ? c : c.left || 0;
          B.top += r ? c : c.top || 0;
          B.right -= r ? c : c.right || 0;
          B.bottom -= r ? c : c.bottom || 0;
          return B
     }
     function Ga(g, n, c, d, r) {
          var B = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
          if (-1 === g.indexOf("auto")) return g;
          B = va(c, d, B, r);
          var K = {
               top: {
                    width: B.width,
                    height: n.top - B.top
               },
               right: {
                    width: B.right -
                         n.right,
                    height: B.height
               },
               bottom: {
                    width: B.width,
                    height: B.bottom - n.bottom
               },
               left: {
                    width: n.left - B.left,
                    height: B.height
               }
          };
          B = Object.keys(K).map(function (ca) {
               var da = K[ca];
               return gb({
                    key: ca
               }, K[ca], {
                    area: da.width * da.height
               })
          }).sort(function (ca, da) {
               return da.area - ca.area
          });
          var O = B.filter(function (ca) {
               var da = ca.height;
               return ca.width >= c.clientWidth && da >= c.clientHeight
          });
          B = 0 < O.length ? O[0].key : B[0].key;
          O = g.split("-")[1];
          return B + (O ? "-" + O : "")
     }
     function Pa(g, n, c) {
          var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] :
               null,
               r = d ? ia(n) : X(n, c);
          return Fa(c, r, d)
     }
     function zb(g) {
          var n = g.ownerDocument.defaultView.getComputedStyle(g),
               c = parseFloat(n.marginTop || 0) + parseFloat(n.marginBottom || 0);
          n = parseFloat(n.marginLeft || 0) + parseFloat(n.marginRight || 0);
          return {
               width: g.offsetWidth + n,
               height: g.offsetHeight + c
          }
     }
     function Wb(g) {
          var n = {
               left: "right",
               right: "left",
               bottom: "top",
               top: "bottom"
          };
          return g.replace(/left|right|bottom|top/g, function (c) {
               return n[c]
          })
     }
     function Mb(g, n, c) {
          c = c.split("-")[0];
          g = zb(g);
          var d = {
               width: g.width,
               height: g.height
          },
               r = -1 !== ["right", "left"].indexOf(c),
               B = r ? "top" : "left",
               K = r ? "left" : "top",
               O = r ? "height" : "width";
          d[B] = n[B] + n[O] / 2 - g[O] / 2;
          d[K] = c === K ? n[K] - g[r ? "width" : "height"] : n[Wb(K)];
          return d
     }
     function Nb(g, n) {
          return Array.prototype.find ? g.find(n) : g.filter(n)[0]
     }
     function nc(g, n, c) {
          if (Array.prototype.findIndex) return g.findIndex(function (r) {
               return r[n] === c
          });
          var d = Nb(g, function (r) {
               return r[n] === c
          });
          return g.indexOf(d)
     }
     function pc(g, n, c) {
          (void 0 === c ? g : g.slice(0, nc(g, "name", c))).forEach(function (d) {
               d["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
               var r = d["function"] || d.fn;
               d.enabled && y(r) && (n.offsets.popper = Z(n.offsets.popper), n.offsets.reference = Z(n.offsets.reference), n = r(n, d))
          });
          return n
     }
     function fc(g, n) {
          return g.some(function (c) {
               var d = c.name;
               return c.enabled && d === n
          })
     }
     function gc(g) {
          for (var n = [!1, "ms", "Webkit", "Moz", "O"], c = g.charAt(0).toUpperCase() + g.slice(1), d = 0; d < n.length; d++) {
               var r = n[d];
               r = r ? "" + r + c : g;
               if ("undefined" !== typeof document.body.style[r]) return r
          }
          return null
     }
     function eb(g) {
          return (g = g.ownerDocument) ? g.defaultView : window
     }
     function hc(g,
          n, c, d) {
          var r = "BODY" === g.nodeName;
          g = r ? g.ownerDocument.defaultView : g;
          g.addEventListener(n, c, {
               passive: !0
          });
          r || hc(L(g.parentNode), n, c, d);
          d.push(g)
     }
     function Hc(g, n) {
          eb(g).removeEventListener("resize", n.updateBound);
          n.scrollParents.forEach(function (c) {
               c.removeEventListener("scroll", n.updateBound)
          });
          n.updateBound = null;
          n.scrollParents = [];
          n.scrollElement = null;
          n.eventsEnabled = !1;
          return n
     }
     function Ob(g) {
          return "" !== g && !isNaN(parseFloat(g)) && isFinite(g)
     }
     function ic(g, n) {
          Object.keys(n).forEach(function (c) {
               var d =
                    ""; - 1 !== "width height top right bottom left".split(" ").indexOf(c) && Ob(n[c]) && (d = "px");
               g.style[c] = n[c] + d
          })
     }
     function hb(g, n) {
          Object.keys(n).forEach(function (c) {
               !1 !== n[c] ? g.setAttribute(c, n[c]) : g.removeAttribute(c)
          })
     }
     function Bb(g, n) {
          var c = g.offsets,
               d = c.popper,
               r = Math.round,
               B = Math.floor,
               K = function (da) {
                    return da
               };
          c = r(c.reference.width);
          var O = r(d.width),
               ca = -1 !== ["left", "right"].indexOf(g.placement);
          g = -1 !== g.placement.indexOf("-");
          B = n ? ca || g || c % 2 === O % 2 ? r : B : K;
          r = n ? r : K;
          return {
               left: B(1 === c % 2 && 1 === O % 2 && !g && n ?
                    d.left - 1 : d.left),
               top: r(d.top),
               bottom: r(d.bottom),
               right: B(d.right)
          }
     }
     function xb(g, n, c) {
          var d = Nb(g, function (B) {
               return B.name === n
          });
          g = !!d && g.some(function (B) {
               return B.name === c && B.enabled && B.order < d.order
          });
          if (!g) {
               var r = "`" + n + "`";
               console.warn("`" + c + "` modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
          }
          return g
     }
     function jc(g) {
          var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1,
               c = xc.indexOf(g);
          c = xc.slice(c + 1).concat(xc.slice(0, c));
          return n ? c.reverse() :
               c
     }
     function qc(g, n, c, d) {
          var r = [0, 0],
               B = -1 !== ["right", "left"].indexOf(d);
          g = g.split(/(\+|\-)/).map(function (O) {
               return O.trim()
          });
          d = g.indexOf(Nb(g, function (O) {
               return -1 !== O.search(/,|\s/)
          }));
          g[d] && -1 === g[d].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
          var K = /\s*,\s*|\s+/;
          g = -1 !== d ? [g.slice(0, d).concat([g[d].split(K)[0]]), [g[d].split(K)[1]].concat(g.slice(d + 1))] : [g];
          g = g.map(function (O, ca) {
               var da = (1 === ca ? !B : B) ? "height" : "width",
                    ma = !1;
               return O.reduce(function (qa,
                    Na) {
                    return "" === qa[qa.length - 1] && -1 !== ["+", "-"].indexOf(Na) ? (qa[qa.length - 1] = Na, ma = !0, qa) : ma ? (qa[qa.length - 1] += Na, ma = !1, qa) : qa.concat(Na)
               }, []).map(function (qa) {
                    var Na = qa.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
                    var cb = +Na[1];
                    Na = Na[2];
                    if (cb)
                         if (0 === Na.indexOf("%")) {
                              switch (Na) {
                                   case "%p":
                                        qa = n;
                                        break;
                                   default:
                                        qa = c
                              }
                              cb *= Z(qa)[da] / 100
                         } else cb = "vh" === Na || "vw" === Na ? ("vh" === Na ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 *
                              cb : cb;
                    else cb = qa;
                    return cb
               })
          });
          g.forEach(function (O, ca) {
               O.forEach(function (da, ma) {
                    Ob(da) && (r[ca] += da * ("-" === O[ma - 1] ? -1 : 1))
               })
          });
          return r
     }
     function Ic(g, n) {
          var c = g.nodeName.toLowerCase();
          if (-1 !== n.indexOf(c)) return -1 !== Sc.indexOf(c) ? !(!g.nodeValue.match(Qc) && !g.nodeValue.match(Vb)) : !0;
          g = n.filter(function (r) {
               return r instanceof RegExp
          });
          n = 0;
          for (var d = g.length; n < d; n++)
               if (c.match(g[n])) return !0;
          return !1
     }
     function rc(g, n, c) {
          if (0 === g.length) return g;
          if (c && "function" === typeof c) return c(g);
          g = (new window.DOMParser).parseFromString(g,
               "text/html");
          var d = Object.keys(n),
               r = [].slice.call(g.body.querySelectorAll("*"));
          c = function (O, ca) {
               var da = r[O];
               O = da.nodeName.toLowerCase();
               if (-1 === d.indexOf(da.nodeName.toLowerCase())) return da.parentNode.removeChild(da), "continue";
               ca = [].slice.call(da.attributes);
               var ma = [].concat(n["*"] || [], n[O] || []);
               ca.forEach(function (qa) {
                    Ic(qa, ma) || da.removeAttribute(qa.nodeName)
               })
          };
          for (var B = 0, K = r.length; B < K; B++) c(B, K);
          return g.body.innerHTML
     }
     f = f && f.hasOwnProperty("default") ? f["default"] : f;
     var ha = {
          TRANSITION_END: "bsTransitionEnd",
          getUID: function (g) {
               do g += ~~(1E6 * Math.random()); while (document.getElementById(g));
               return g
          },
          getSelectorFromElement: function (g) {
               var n = g.getAttribute("data-target");
               n && "#" !== n || (n = (g = g.getAttribute("href")) && "#" !== g ? g.trim() : "");
               try {
                    return document.querySelector(n) ? n : null
               } catch (c) {
                    return null
               }
          },
          getTransitionDurationFromElement: function (g) {
               if (!g) return 0;
               var n = f(g).css("transition-duration");
               g = f(g).css("transition-delay");
               var c = parseFloat(n),
                    d = parseFloat(g);
               if (!c && !d) return 0;
               n = n.split(",")[0];
               g = g.split(",")[0];
               return 1E3 * (parseFloat(n) + parseFloat(g))
          },
          reflow: function (g) {
               return g.offsetHeight
          },
          triggerTransitionEnd: function (g) {
               f(g).trigger("transitionend")
          },
          supportsTransitionEnd: function () {
               return !0
          },
          isElement: function (g) {
               return (g[0] || g).nodeType
          },
          typeCheckConfig: function (g, n, c) {
               for (var d in c)
                    if (Object.prototype.hasOwnProperty.call(c, d)) {
                         var r = c[d],
                              B = n[d];
                         B = B && ha.isElement(B) ? "element" : {}.toString.call(B).match(/\s([a-z]+)/i)[1].toLowerCase();
                         if (!(new RegExp(r)).test(B)) throw Error(g.toUpperCase() + ': Option "' +
                              (d + '" provided type "' + B + '" but expected type "') + (r + '".'));
                    }
          },
          findShadowRoot: function (g) {
               return document.documentElement.attachShadow ? "function" === typeof g.getRootNode ? (g = g.getRootNode(), g instanceof ShadowRoot ? g : null) : g instanceof ShadowRoot ? g : g.parentNode ? ha.findShadowRoot(g.parentNode) : null : null
          }
     };
     f.fn.emulateTransitionEnd = function (g) {
          var n = this,
               c = !1;
          f(this).one(ha.TRANSITION_END, function () {
               c = !0
          });
          setTimeout(function () {
               c || ha.triggerTransitionEnd(n)
          }, g);
          return this
     };
     f.event.special[ha.TRANSITION_END] =
          function () {
               return {
                    bindType: "transitionend",
                    delegateType: "transitionend",
                    handle: function (g) {
                         if (f(g.target).is(this)) return g.handleObj.handler.apply(this, arguments)
                    }
               }
          }();
     var pb = f.fn.alert,
          Cb = function () {
               function g(c) {
                    this._element = c
               }
               var n = g.prototype;
               n.close = function (c) {
                    var d = this._element;
                    c && (d = this._getRootElement(c));
                    this._triggerCloseEvent(d).isDefaultPrevented() || this._removeElement(d)
               };
               n.dispose = function () {
                    f.removeData(this._element, "bs.alert");
                    this._element = null
               };
               n._getRootElement = function (c) {
                    var d =
                         ha.getSelectorFromElement(c),
                         r = !1;
                    d && (r = document.querySelector(d));
                    r || (r = f(c).closest(".alert")[0]);
                    return r
               };
               n._triggerCloseEvent = function (c) {
                    var d = f.Event("close.bs.alert");
                    f(c).trigger(d);
                    return d
               };
               n._removeElement = function (c) {
                    var d = this;
                    f(c).removeClass("show");
                    if (f(c).hasClass("fade")) {
                         var r = ha.getTransitionDurationFromElement(c);
                         f(c).one(ha.TRANSITION_END, function (B) {
                              return d._destroyElement(c, B)
                         }).emulateTransitionEnd(r)
                    } else this._destroyElement(c)
               };
               n._destroyElement = function (c) {
                    f(c).detach().trigger("closed.bs.alert").remove()
               };
               g._jQueryInterface = function (c) {
                    return this.each(function () {
                         var d = f(this),
                              r = d.data("bs.alert");
                         r || (r = new g(this), d.data("bs.alert", r));
                         if ("close" === c) r[c](this)
                    })
               };
               g._handleDismiss = function (c) {
                    return function (d) {
                         d && d.preventDefault();
                         c.close(this)
                    }
               };
               N(g, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               }]);
               return g
          }();
     f(document).on("click.bs.alert.data-api", '[data-dismiss\x3d"alert"]', Cb._handleDismiss(new Cb));
     f.fn.alert = Cb._jQueryInterface;
     f.fn.alert.Constructor = Cb;
     f.fn.alert.noConflict = function () {
          f.fn.alert =
               pb;
          return Cb._jQueryInterface
     };
     var wb = f.fn.button,
          Lb = function () {
               function g(c) {
                    this._element = c
               }
               var n = g.prototype;
               n.toggle = function () {
                    var c = !0,
                         d = !0,
                         r = f(this._element).closest('[data-toggle\x3d"buttons"]')[0];
                    if (r) {
                         var B = this._element.querySelector('input:not([type\x3d"hidden"])');
                         if (B) {
                              "radio" === B.type && (B.checked && this._element.classList.contains("active") ? c = !1 : (d = r.querySelector(".active")) && f(d).removeClass("active"));
                              if (c) {
                                   if (B.hasAttribute("disabled") || r.hasAttribute("disabled") || B.classList.contains("disabled") ||
                                        r.classList.contains("disabled")) return;
                                   B.checked = !this._element.classList.contains("active");
                                   f(B).trigger("change")
                              }
                              B.focus();
                              d = !1
                         }
                    }
                    d && this._element.setAttribute("aria-pressed", !this._element.classList.contains("active"));
                    c && f(this._element).toggleClass("active")
               };
               n.dispose = function () {
                    f.removeData(this._element, "bs.button");
                    this._element = null
               };
               g._jQueryInterface = function (c) {
                    return this.each(function () {
                         var d = f(this).data("bs.button");
                         d || (d = new g(this), f(this).data("bs.button", d));
                         if ("toggle" === c) d[c]()
                    })
               };
               N(g, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               }]);
               return g
          }();
     f(document).on("click.bs.button.data-api", '[data-toggle^\x3d"button"]', function (g) {
          g.preventDefault();
          g = g.target;
          f(g).hasClass("btn") || (g = f(g).closest(".btn"));
          Lb._jQueryInterface.call(f(g), "toggle")
     }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^\x3d"button"]', function (g) {
          var n = f(g.target).closest(".btn")[0];
          f(n).toggleClass("focus", /^focus(in)?$/.test(g.type))
     });
     f.fn.button = Lb._jQueryInterface;
     f.fn.button.Constructor =
          Lb;
     f.fn.button.noConflict = function () {
          f.fn.button = wb;
          return Lb._jQueryInterface
     };
     var sc = f.fn.carousel,
          Jb = {
               interval: 5E3,
               keyboard: !0,
               slide: !1,
               pause: "hover",
               wrap: !0,
               touch: !0
          },
          cc = {
               interval: "(number|boolean)",
               keyboard: "boolean",
               slide: "(boolean|string)",
               pause: "(string|boolean)",
               wrap: "boolean",
               touch: "boolean"
          },
          mc = {
               TOUCH: "touch",
               PEN: "pen"
          },
          qb = function () {
               function g(c, d) {
                    this._activeElement = this._interval = this._items = null;
                    this._isSliding = this._isPaused = !1;
                    this.touchTimeout = null;
                    this.touchDeltaX = this.touchStartX =
                         0;
                    this._config = this._getConfig(d);
                    this._element = c;
                    this._indicatorsElement = this._element.querySelector(".carousel-indicators");
                    this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints;
                    this._pointerEvent = !(!window.PointerEvent && !window.MSPointerEvent);
                    this._addEventListeners()
               }
               var n = g.prototype;
               n.next = function () {
                    this._isSliding || this._slide("next")
               };
               n.nextWhenVisible = function () {
                    !document.hidden && f(this._element).is(":visible") && "hidden" !== f(this._element).css("visibility") &&
                         this.next()
               };
               n.prev = function () {
                    this._isSliding || this._slide("prev")
               };
               n.pause = function (c) {
                    c || (this._isPaused = !0);
                    this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (ha.triggerTransitionEnd(this._element), this.cycle(!0));
                    clearInterval(this._interval);
                    this._interval = null
               };
               n.cycle = function (c) {
                    c || (this._isPaused = !1);
                    this._interval && (clearInterval(this._interval), this._interval = null);
                    this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible :
                         this.next).bind(this), this._config.interval))
               };
               n.to = function (c) {
                    var d = this;
                    this._activeElement = this._element.querySelector(".active.carousel-item");
                    var r = this._getItemIndex(this._activeElement);
                    if (!(c > this._items.length - 1 || 0 > c))
                         if (this._isSliding) f(this._element).one("slid.bs.carousel", function () {
                              return d.to(c)
                         });
                         else r === c ? (this.pause(), this.cycle()) : this._slide(c > r ? "next" : "prev", this._items[c])
               };
               n.dispose = function () {
                    f(this._element).off(".bs.carousel");
                    f.removeData(this._element, "bs.carousel");
                    this._indicatorsElement = this._activeElement = this._isSliding = this._isPaused = this._interval = this._element = this._config = this._items = null
               };
               n._getConfig = function (c) {
                    c = A({}, Jb, c);
                    ha.typeCheckConfig("carousel", c, cc);
                    return c
               };
               n._handleSwipe = function () {
                    var c = Math.abs(this.touchDeltaX);
                    40 >= c || (c /= this.touchDeltaX, 0 < c && this.prev(), 0 > c && this.next())
               };
               n._addEventListeners = function () {
                    var c = this;
                    if (this._config.keyboard) f(this._element).on("keydown.bs.carousel", function (d) {
                         return c._keydown(d)
                    });
                    if ("hover" === this._config.pause) f(this._element).on("mouseenter.bs.carousel",
                         function (d) {
                              return c.pause(d)
                         }).on("mouseleave.bs.carousel", function (d) {
                              return c.cycle(d)
                         });
                    this._config.touch && this._addTouchEventListeners()
               };
               n._addTouchEventListeners = function () {
                    var c = this;
                    if (this._touchSupported) {
                         var d = function (B) {
                              c._pointerEvent && mc[B.originalEvent.pointerType.toUpperCase()] ? c.touchStartX = B.originalEvent.clientX : c._pointerEvent || (c.touchStartX = B.originalEvent.touches[0].clientX)
                         },
                              r = function (B) {
                                   c._pointerEvent && mc[B.originalEvent.pointerType.toUpperCase()] && (c.touchDeltaX = B.originalEvent.clientX -
                                        c.touchStartX);
                                   c._handleSwipe();
                                   "hover" === c._config.pause && (c.pause(), c.touchTimeout && clearTimeout(c.touchTimeout), c.touchTimeout = setTimeout(function (K) {
                                        return c.cycle(K)
                                   }, 500 + c._config.interval))
                              };
                         f(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", function (B) {
                              return B.preventDefault()
                         });
                         this._pointerEvent ? (f(this._element).on("pointerdown.bs.carousel", function (B) {
                              return d(B)
                         }), f(this._element).on("pointerup.bs.carousel", function (B) {
                              return r(B)
                         }), this._element.classList.add("pointer-event")) :
                              (f(this._element).on("touchstart.bs.carousel", function (B) {
                                   return d(B)
                              }), f(this._element).on("touchmove.bs.carousel", function (B) {
                                   c.touchDeltaX = B.originalEvent.touches && 1 < B.originalEvent.touches.length ? 0 : B.originalEvent.touches[0].clientX - c.touchStartX
                              }), f(this._element).on("touchend.bs.carousel", function (B) {
                                   return r(B)
                              }))
                    }
               };
               n._keydown = function (c) {
                    if (!/input|textarea/i.test(c.target.tagName)) switch (c.which) {
                         case 37:
                              c.preventDefault();
                              this.prev();
                              break;
                         case 39:
                              c.preventDefault(), this.next()
                    }
               };
               n._getItemIndex =
                    function (c) {
                         this._items = c && c.parentNode ? [].slice.call(c.parentNode.querySelectorAll(".carousel-item")) : [];
                         return this._items.indexOf(c)
                    };
               n._getItemByDirection = function (c, d) {
                    var r = "next" === c,
                         B = "prev" === c,
                         K = this._getItemIndex(d),
                         O = this._items.length - 1;
                    if ((B && 0 === K || r && K === O) && !this._config.wrap) return d;
                    c = (K + ("prev" === c ? -1 : 1)) % this._items.length;
                    return -1 === c ? this._items[this._items.length - 1] : this._items[c]
               };
               n._triggerSlideEvent = function (c, d) {
                    var r = this._getItemIndex(c),
                         B = this._getItemIndex(this._element.querySelector(".active.carousel-item"));
                    c = f.Event("slide.bs.carousel", {
                         relatedTarget: c,
                         direction: d,
                         from: B,
                         to: r
                    });
                    f(this._element).trigger(c);
                    return c
               };
               n._setActiveIndicatorElement = function (c) {
                    if (this._indicatorsElement) {
                         var d = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
                         f(d).removeClass("active");
                         (c = this._indicatorsElement.children[this._getItemIndex(c)]) && f(c).addClass("active")
                    }
               };
               n._slide = function (c, d) {
                    var r = this,
                         B = this._element.querySelector(".active.carousel-item"),
                         K = this._getItemIndex(B),
                         O = d || B && this._getItemByDirection(c,
                              B),
                         ca = this._getItemIndex(O);
                    d = !!this._interval;
                    if ("next" === c) {
                         var da = "carousel-item-left";
                         var ma = "carousel-item-next";
                         c = "left"
                    } else da = "carousel-item-right", ma = "carousel-item-prev", c = "right";
                    if (O && f(O).hasClass("active")) this._isSliding = !1;
                    else if (!this._triggerSlideEvent(O, c).isDefaultPrevented() && B && O) {
                         this._isSliding = !0;
                         d && this.pause();
                         this._setActiveIndicatorElement(O);
                         var qa = f.Event("slid.bs.carousel", {
                              relatedTarget: O,
                              direction: c,
                              from: K,
                              to: ca
                         });
                         f(this._element).hasClass("slide") ? (f(O).addClass(ma),
                              ha.reflow(O), f(B).addClass(da), f(O).addClass(da), (K = parseInt(O.getAttribute("data-interval"), 10)) ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = K) : this._config.interval = this._config.defaultInterval || this._config.interval, K = ha.getTransitionDurationFromElement(B), f(B).one(ha.TRANSITION_END, function () {
                                   f(O).removeClass(da + " " + ma).addClass("active");
                                   f(B).removeClass("active " + ma + " " + da);
                                   r._isSliding = !1;
                                   setTimeout(function () {
                                        return f(r._element).trigger(qa)
                                   },
                                        0)
                              }).emulateTransitionEnd(K)) : (f(B).removeClass("active"), f(O).addClass("active"), this._isSliding = !1, f(this._element).trigger(qa));
                         d && this.cycle()
                    }
               };
               g._jQueryInterface = function (c) {
                    return this.each(function () {
                         var d = f(this).data("bs.carousel"),
                              r = A({}, Jb, f(this).data());
                         "object" === typeof c && (r = A({}, r, c));
                         var B = "string" === typeof c ? c : r.slide;
                         d || (d = new g(this, r), f(this).data("bs.carousel", d));
                         if ("number" === typeof c) d.to(c);
                         else if ("string" === typeof B) {
                              if ("undefined" === typeof d[B]) throw new TypeError('No method named "' +
                                   B + '"');
                              d[B]()
                         } else r.interval && r.ride && (d.pause(), d.cycle())
                    })
               };
               g._dataApiClickHandler = function (c) {
                    var d = ha.getSelectorFromElement(this);
                    if (d && (d = f(d)[0]) && f(d).hasClass("carousel")) {
                         var r = A({}, f(d).data(), f(this).data()),
                              B = this.getAttribute("data-slide-to");
                         B && (r.interval = !1);
                         g._jQueryInterface.call(f(d), r);
                         B && f(d).data("bs.carousel").to(B);
                         c.preventDefault()
                    }
               };
               N(g, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               }, {
                    key: "Default",
                    get: function () {
                         return Jb
                    }
               }]);
               return g
          }();
     f(document).on("click.bs.carousel.data-api",
          "[data-slide], [data-slide-to]", qb._dataApiClickHandler);
     f(window).on("load.bs.carousel.data-api", function () {
          for (var g = [].slice.call(document.querySelectorAll('[data-ride\x3d"carousel"]')), n = 0, c = g.length; n < c; n++) {
               var d = f(g[n]);
               qb._jQueryInterface.call(d, d.data())
          }
     });
     f.fn.carousel = qb._jQueryInterface;
     f.fn.carousel.Constructor = qb;
     f.fn.carousel.noConflict = function () {
          f.fn.carousel = sc;
          return qb._jQueryInterface
     };
     var Jc = f.fn.collapse,
          tc = {
               toggle: !0,
               parent: ""
          },
          Ha = {
               toggle: "boolean",
               parent: "(string|element)"
          },
          sa = function () {
               function g(c, d) {
                    this._isTransitioning = !1;
                    this._element = c;
                    this._config = this._getConfig(d);
                    this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle\x3d"collapse"][href\x3d"#' + c.id + '"],[data-toggle\x3d"collapse"][data-target\x3d"#' + (c.id + '"]')));
                    d = [].slice.call(document.querySelectorAll('[data-toggle\x3d"collapse"]'));
                    for (var r = 0, B = d.length; r < B; r++) {
                         var K = d[r],
                              O = ha.getSelectorFromElement(K),
                              ca = [].slice.call(document.querySelectorAll(O)).filter(function (da) {
                                   return da === c
                              });
                         null !== O && 0 < ca.length && (this._selector = O, this._triggerArray.push(K))
                    }
                    this._parent = this._config.parent ? this._getParent() : null;
                    this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray);
                    this._config.toggle && this.toggle()
               }
               var n = g.prototype;
               n.toggle = function () {
                    f(this._element).hasClass("show") ? this.hide() : this.show()
               };
               n.show = function () {
                    var c = this;
                    if (!this._isTransitioning && !f(this._element).hasClass("show")) {
                         var d;
                         if (this._parent) {
                              var r = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function (O) {
                                   return "string" ===
                                        typeof c._config.parent ? O.getAttribute("data-parent") === c._config.parent : O.classList.contains("collapse")
                              });
                              0 === r.length && (r = null)
                         }
                         if (r && (d = f(r).not(this._selector).data("bs.collapse")) && d._isTransitioning) return;
                         var B = f.Event("show.bs.collapse");
                         f(this._element).trigger(B);
                         if (!B.isDefaultPrevented()) {
                              r && (g._jQueryInterface.call(f(r).not(this._selector), "hide"), d || f(r).data("bs.collapse", null));
                              var K = this._getDimension();
                              f(this._element).removeClass("collapse").addClass("collapsing");
                              this._element.style[K] =
                                   0;
                              this._triggerArray.length && f(this._triggerArray).removeClass("collapsed").attr("aria-expanded", !0);
                              this.setTransitioning(!0);
                              r = "scroll" + (K[0].toUpperCase() + K.slice(1));
                              d = ha.getTransitionDurationFromElement(this._element);
                              f(this._element).one(ha.TRANSITION_END, function () {
                                   f(c._element).removeClass("collapsing").addClass("collapse").addClass("show");
                                   c._element.style[K] = "";
                                   c.setTransitioning(!1);
                                   f(c._element).trigger("shown.bs.collapse")
                              }).emulateTransitionEnd(d);
                              this._element.style[K] = this._element[r] +
                                   "px"
                         }
                    }
               };
               n.hide = function () {
                    var c = this;
                    if (!this._isTransitioning && f(this._element).hasClass("show")) {
                         var d = f.Event("hide.bs.collapse");
                         f(this._element).trigger(d);
                         if (!d.isDefaultPrevented()) {
                              d = this._getDimension();
                              this._element.style[d] = this._element.getBoundingClientRect()[d] + "px";
                              ha.reflow(this._element);
                              f(this._element).addClass("collapsing").removeClass("collapse").removeClass("show");
                              var r = this._triggerArray.length;
                              if (0 < r)
                                   for (var B = 0; B < r; B++) {
                                        var K = this._triggerArray[B],
                                             O = ha.getSelectorFromElement(K);
                                        null !== O && (f([].slice.call(document.querySelectorAll(O))).hasClass("show") || f(K).addClass("collapsed").attr("aria-expanded", !1))
                                   }
                              this.setTransitioning(!0);
                              this._element.style[d] = "";
                              d = ha.getTransitionDurationFromElement(this._element);
                              f(this._element).one(ha.TRANSITION_END, function () {
                                   c.setTransitioning(!1);
                                   f(c._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                              }).emulateTransitionEnd(d)
                         }
                    }
               };
               n.setTransitioning = function (c) {
                    this._isTransitioning = c
               };
               n.dispose = function () {
                    f.removeData(this._element,
                         "bs.collapse");
                    this._isTransitioning = this._triggerArray = this._element = this._parent = this._config = null
               };
               n._getConfig = function (c) {
                    c = A({}, tc, c);
                    c.toggle = !!c.toggle;
                    ha.typeCheckConfig("collapse", c, Ha);
                    return c
               };
               n._getDimension = function () {
                    return f(this._element).hasClass("width") ? "width" : "height"
               };
               n._getParent = function () {
                    var c = this;
                    if (ha.isElement(this._config.parent)) {
                         var d = this._config.parent;
                         "undefined" !== typeof this._config.parent.jquery && (d = this._config.parent[0])
                    } else d = document.querySelector(this._config.parent);
                    var r = [].slice.call(d.querySelectorAll('[data-toggle\x3d"collapse"][data-parent\x3d"' + this._config.parent + '"]'));
                    f(r).each(function (B, K) {
                         c._addAriaAndCollapsedClass(g._getTargetFromElement(K), [K])
                    });
                    return d
               };
               n._addAriaAndCollapsedClass = function (c, d) {
                    c = f(c).hasClass("show");
                    d.length && f(d).toggleClass("collapsed", !c).attr("aria-expanded", c)
               };
               g._getTargetFromElement = function (c) {
                    return (c = ha.getSelectorFromElement(c)) ? document.querySelector(c) : null
               };
               g._jQueryInterface = function (c) {
                    return this.each(function () {
                         var d =
                              f(this),
                              r = d.data("bs.collapse"),
                              B = A({}, tc, d.data(), "object" === typeof c && c ? c : {});
                         !r && B.toggle && /show|hide/.test(c) && (B.toggle = !1);
                         r || (r = new g(this, B), d.data("bs.collapse", r));
                         if ("string" === typeof c) {
                              if ("undefined" === typeof r[c]) throw new TypeError('No method named "' + c + '"');
                              r[c]()
                         }
                    })
               };
               N(g, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               }, {
                    key: "Default",
                    get: function () {
                         return tc
                    }
               }]);
               return g
          }();
     f(document).on("click.bs.collapse.data-api", '[data-toggle\x3d"collapse"]', function (g) {
          "A" === g.currentTarget.tagName &&
               g.preventDefault();
          var n = f(this);
          g = ha.getSelectorFromElement(this);
          g = [].slice.call(document.querySelectorAll(g));
          f(g).each(function () {
               var c = f(this),
                    d = c.data("bs.collapse") ? "toggle" : n.data();
               sa._jQueryInterface.call(c, d)
          })
     });
     f.fn.collapse = sa._jQueryInterface;
     f.fn.collapse.Constructor = sa;
     f.fn.collapse.noConflict = function () {
          f.fn.collapse = Jc;
          return sa._jQueryInterface
     };
     for (var nb = "undefined" !== typeof window && "undefined" !== typeof document, Aa = ["Edge", "Trident", "Firefox"], Bc = 0, l = 0; l < Aa.length; l += 1)
          if (nb &&
               0 <= navigator.userAgent.indexOf(Aa[l])) {
               Bc = 1;
               break
          } var Fb = nb && window.Promise ? p : u,
               Gb = nb && !(!window.MSInputMethodContext || !document.documentMode),
               wc = nb && /MSIE 10/.test(navigator.userAgent),
               Oc = function () {
                    function g(n, c) {
                         for (var d = 0; d < c.length; d++) {
                              var r = c[d];
                              r.enumerable = r.enumerable || !1;
                              r.configurable = !0;
                              "value" in r && (r.writable = !0);
                              Object.defineProperty(n, r.key, r)
                         }
                    }
                    return function (n, c, d) {
                         c && g(n.prototype, c);
                         d && g(n, d);
                         return n
                    }
               }(),
               Hb = function (g, n, c) {
                    n in g ? Object.defineProperty(g, n, {
                         value: c,
                         enumerable: !0,
                         configurable: !0,
                         writable: !0
                    }) : g[n] = c;
                    return g
               },
               gb = Object.assign || function (g) {
                    for (var n = 1; n < arguments.length; n++) {
                         var c = arguments[n],
                              d;
                         for (d in c) Object.prototype.hasOwnProperty.call(c, d) && (g[d] = c[d])
                    }
                    return g
               },
               $c = nb && /Firefox/i.test(navigator.userAgent),
               Pc = "auto-start auto auto-end top-start top top-end right-start right right-end bottom-end bottom bottom-start left-end left left-start".split(" "),
               xc = Pc.slice(3),
               Ya = function () {
                    function g(n, c) {
                         var d = this,
                              r = 2 < arguments.length && void 0 !== arguments[2] ?
                                   arguments[2] : {};
                         if (!(this instanceof g)) throw new TypeError("Cannot call a class as a function");
                         this.scheduleUpdate = function () {
                              return requestAnimationFrame(d.update)
                         };
                         this.update = Fb(this.update.bind(this));
                         this.options = gb({}, g.Defaults, r);
                         this.state = {
                              isDestroyed: !1,
                              isCreated: !1,
                              scrollParents: []
                         };
                         this.reference = n && n.jquery ? n[0] : n;
                         this.popper = c && c.jquery ? c[0] : c;
                         this.options.modifiers = {};
                         Object.keys(gb({}, g.Defaults.modifiers, r.modifiers)).forEach(function (K) {
                              d.options.modifiers[K] = gb({}, g.Defaults.modifiers[K] || {}, r.modifiers ? r.modifiers[K] : {})
                         });
                         this.modifiers = Object.keys(this.options.modifiers).map(function (K) {
                              return gb({
                                   name: K
                              }, d.options.modifiers[K])
                         }).sort(function (K, O) {
                              return K.order - O.order
                         });
                         this.modifiers.forEach(function (K) {
                              if (K.enabled && y(K.onLoad)) K.onLoad(d.reference, d.popper, d.options, K, d.state)
                         });
                         this.update();
                         var B = this.options.eventsEnabled;
                         B && this.enableEventListeners();
                         this.state.eventsEnabled = B
                    }
                    Oc(g, [{
                         key: "update",
                         value: function () {
                              if (!this.state.isDestroyed) {
                                   var n = {
                                        instance: this,
                                        styles: {},
                                        arrowStyles: {},
                                        attributes: {},
                                        flipped: !1,
                                        offsets: {}
                                   };
                                   n.offsets.reference = Pa(this.state, this.popper, this.reference, this.options.positionFixed);
                                   n.placement = Ga(this.options.placement, n.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
                                   n.originalPlacement = n.placement;
                                   n.positionFixed = this.options.positionFixed;
                                   n.offsets.popper = Mb(this.popper, n.offsets.reference, n.placement);
                                   n.offsets.popper.position = this.options.positionFixed ?
                                        "fixed" : "absolute";
                                   n = pc(this.modifiers, n);
                                   if (this.state.isCreated) this.options.onUpdate(n);
                                   else this.state.isCreated = !0, this.options.onCreate(n)
                              }
                         }
                    }, {
                         key: "destroy",
                         value: function () {
                              this.state.isDestroyed = !0;
                              fc(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[gc("transform")] = "");
                              this.disableEventListeners();
                              this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper);
                              return this
                         }
                    }, {
                         key: "enableEventListeners",
                         value: function () {
                              if (!this.state.eventsEnabled) {
                                   var n = this.reference,
                                        c = this.state;
                                   c.updateBound = this.scheduleUpdate;
                                   eb(n).addEventListener("resize", c.updateBound, {
                                        passive: !0
                                   });
                                   n = L(n);
                                   hc(n, "scroll", c.updateBound, c.scrollParents);
                                   c.scrollElement = n;
                                   c.eventsEnabled = !0;
                                   this.state = c
                              }
                         }
                    }, {
                         key: "disableEventListeners",
                         value: function () {
                              this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate),
                                   this.state = Hc(this.reference, this.state))
                         }
                    }]);
                    return g
               }();
     Ya.Utils = ("undefined" !== typeof window ? window : global).PopperUtils;
     Ya.placements = Pc;
     Ya.Defaults = {
          placement: "bottom",
          positionFixed: !1,
          eventsEnabled: !0,
          removeOnDestroy: !1,
          onCreate: function () { },
          onUpdate: function () { },
          modifiers: {
               shift: {
                    order: 100,
                    enabled: !0,
                    fn: function (g) {
                         var n = g.placement,
                              c = n.split("-")[0];
                         if (n = n.split("-")[1]) {
                              var d = g.offsets,
                                   r = d.reference;
                              d = d.popper;
                              var B = -1 !== ["bottom", "top"].indexOf(c);
                              c = B ? "left" : "top";
                              B = B ? "width" : "height";
                              r = {
                                   start: Hb({}, c, r[c]),
                                   end: Hb({}, c, r[c] + r[B] - d[B])
                              };
                              g.offsets.popper = gb({}, d, r[n])
                         }
                         return g
                    }
               },
               offset: {
                    order: 200,
                    enabled: !0,
                    fn: function (g, n) {
                         var c = n.offset,
                              d = g.offsets;
                         n = d.popper;
                         var r = d.reference;
                         d = g.placement.split("-")[0];
                         c = Ob(+c) ? [+c, 0] : qc(c, n, r, d);
                         "left" === d ? (n.top += c[0], n.left -= c[1]) : "right" === d ? (n.top += c[0], n.left += c[1]) : "top" === d ? (n.left += c[0], n.top -= c[1]) : "bottom" === d && (n.left += c[0], n.top += c[1]);
                         g.popper = n;
                         return g
                    },
                    offset: 0
               },
               preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function (g, n) {
                         var c = n.boundariesElement ||
                              V(g.instance.popper);
                         g.instance.reference === c && (c = V(c));
                         var d = gc("transform"),
                              r = g.instance.popper.style,
                              B = r.top,
                              K = r.left,
                              O = r[d];
                         r.top = "";
                         r.left = "";
                         r[d] = "";
                         var ca = va(g.instance.popper, g.instance.reference, n.padding, c, g.positionFixed);
                         r.top = B;
                         r.left = K;
                         r[d] = O;
                         n.boundaries = ca;
                         var da = g.offsets.popper,
                              ma = {
                                   primary: function (qa) {
                                        var Na = da[qa];
                                        da[qa] < ca[qa] && !n.escapeWithReference && (Na = Math.max(da[qa], ca[qa]));
                                        return Hb({}, qa, Na)
                                   },
                                   secondary: function (qa) {
                                        var Na = "right" === qa ? "left" : "top",
                                             cb = da[Na];
                                        da[qa] > ca[qa] &&
                                             !n.escapeWithReference && (cb = Math.min(da[Na], ca[qa] - ("right" === qa ? da.width : da.height)));
                                        return Hb({}, Na, cb)
                                   }
                              };
                         n.priority.forEach(function (qa) {
                              var Na = -1 !== ["left", "top"].indexOf(qa) ? "primary" : "secondary";
                              da = gb({}, da, ma[Na](qa))
                         });
                         g.offsets.popper = da;
                         return g
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
               },
               keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function (g) {
                         var n = g.offsets,
                              c = n.popper;
                         n = n.reference;
                         var d = g.placement.split("-")[0],
                              r = Math.floor,
                              B = -1 !== ["top", "bottom"].indexOf(d);
                         d = B ? "right" : "bottom";
                         var K = B ? "left" : "top";
                         B = B ? "width" : "height";
                         c[d] < r(n[K]) && (g.offsets.popper[K] = r(n[K]) - c[B]);
                         c[K] > r(n[d]) && (g.offsets.popper[K] = r(n[d]));
                         return g
                    }
               },
               arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function (g, n) {
                         var c;
                         if (!xb(g.instance.modifiers, "arrow", "keepTogether")) return g;
                         n = n.element;
                         if ("string" === typeof n) {
                              if (n = g.instance.popper.querySelector(n), !n) return g
                         } else if (!g.instance.popper.contains(n)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), g;
                         var d = g.placement.split("-")[0],
                              r = g.offsets,
                              B = r.popper,
                              K = r.reference,
                              O = -1 !== ["left", "right"].indexOf(d);
                         d = O ? "height" : "width";
                         var ca = O ? "Top" : "Left";
                         r = ca.toLowerCase();
                         var da = O ? "left" : "top",
                              ma = O ? "bottom" : "right";
                         O = zb(n)[d];
                         K[ma] - O < B[r] && (g.offsets.popper[r] -= B[r] - (K[ma] - O));
                         K[r] + O > B[ma] && (g.offsets.popper[r] += K[r] + O - B[ma]);
                         g.offsets.popper = Z(g.offsets.popper);
                         K = K[r] + K[d] / 2 - O / 2;
                         var qa = z(g.instance.popper);
                         ma = parseFloat(qa["margin" + ca], 10);
                         ca = parseFloat(qa["border" + ca + "Width"], 10);
                         ca = K - g.offsets.popper[r] - ma - ca;
                         ca = Math.max(Math.min(B[d] -
                              O, ca), 0);
                         g.arrowElement = n;
                         g.offsets.arrow = (c = {}, Hb(c, r, Math.round(ca)), Hb(c, da, ""), c);
                         return g
                    },
                    element: "[x-arrow]"
               },
               flip: {
                    order: 600,
                    enabled: !0,
                    fn: function (g, n) {
                         if (fc(g.instance.modifiers, "inner") || g.flipped && g.placement === g.originalPlacement) return g;
                         var c = va(g.instance.popper, g.instance.reference, n.padding, n.boundariesElement, g.positionFixed),
                              d = g.placement.split("-")[0],
                              r = Wb(d),
                              B = g.placement.split("-")[1] || "",
                              K = [];
                         switch (n.behavior) {
                              case "flip":
                                   K = [d, r];
                                   break;
                              case "clockwise":
                                   K = jc(d);
                                   break;
                              case "counterclockwise":
                                   K =
                                        jc(d, !0);
                                   break;
                              default:
                                   K = n.behavior
                         }
                         K.forEach(function (O, ca) {
                              if (d !== O || K.length === ca + 1) return g;
                              d = g.placement.split("-")[0];
                              r = Wb(d);
                              var da = g.offsets.popper;
                              O = g.offsets.reference;
                              var ma = Math.floor;
                              O = "left" === d && ma(da.right) > ma(O.left) || "right" === d && ma(da.left) < ma(O.right) || "top" === d && ma(da.bottom) > ma(O.top) || "bottom" === d && ma(da.top) < ma(O.bottom);
                              var qa = ma(da.left) < ma(c.left),
                                   Na = ma(da.right) > ma(c.right),
                                   cb = ma(da.top) < ma(c.top);
                              ma = ma(da.bottom) > ma(c.bottom);
                              da = "left" === d && qa || "right" === d && Na || "top" ===
                                   d && cb || "bottom" === d && ma;
                              var lc = -1 !== ["top", "bottom"].indexOf(d);
                              qa = !!n.flipVariations && (lc && "start" === B && qa || lc && "end" === B && Na || !lc && "start" === B && cb || !lc && "end" === B && ma);
                              if (O || da || qa) {
                                   g.flipped = !0;
                                   if (O || da) d = K[ca + 1];
                                   qa && ("end" === B ? B = "start" : "start" === B && (B = "end"));
                                   g.placement = d + (B ? "-" + B : "");
                                   g.offsets.popper = gb({}, g.offsets.popper, Mb(g.instance.popper, g.offsets.reference, g.placement));
                                   g = pc(g.instance.modifiers, g, "flip")
                              }
                         });
                         return g
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport"
               },
               inner: {
                    order: 700,
                    enabled: !1,
                    fn: function (g) {
                         var n = g.placement,
                              c = n.split("-")[0],
                              d = g.offsets,
                              r = d.popper;
                         d = d.reference;
                         var B = -1 !== ["left", "right"].indexOf(c),
                              K = -1 === ["top", "left"].indexOf(c);
                         r[B ? "left" : "top"] = d[c] - (K ? r[B ? "width" : "height"] : 0);
                         g.placement = Wb(n);
                         g.offsets.popper = Z(r);
                         return g
                    }
               },
               hide: {
                    order: 800,
                    enabled: !0,
                    fn: function (g) {
                         if (!xb(g.instance.modifiers, "hide", "preventOverflow")) return g;
                         var n = g.offsets.reference,
                              c = Nb(g.instance.modifiers, function (d) {
                                   return "preventOverflow" === d.name
                              }).boundaries;
                         if (n.bottom < c.top ||
                              n.left > c.right || n.top > c.bottom || n.right < c.left) {
                              if (!0 === g.hide) return g;
                              g.hide = !0;
                              g.attributes["x-out-of-boundaries"] = ""
                         } else {
                              if (!1 === g.hide) return g;
                              g.hide = !1;
                              g.attributes["x-out-of-boundaries"] = !1
                         }
                         return g
                    }
               },
               computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function (g, n) {
                         var c = n.x,
                              d = n.y,
                              r = g.offsets.popper,
                              B = Nb(g.instance.modifiers, function (qa) {
                                   return "applyStyle" === qa.name
                              }).gpuAcceleration;
                         void 0 !== B && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                         n = void 0 !== B ? B : n.gpuAcceleration;
                         B = V(g.instance.popper);
                         var K = fa(B);
                         r = {
                              position: r.position
                         };
                         var O = Bb(g, 2 > window.devicePixelRatio || !$c);
                         c = "bottom" === c ? "top" : "bottom";
                         d = "right" === d ? "left" : "right";
                         var ca = gc("transform"),
                              da = void 0,
                              ma = void 0;
                         ma = "bottom" === c ? "HTML" === B.nodeName ? -B.clientHeight + O.bottom : -K.height + O.bottom : O.top;
                         da = "right" === d ? "HTML" === B.nodeName ? -B.clientWidth + O.right : -K.width + O.right : O.left;
                         n && ca ? (r[ca] = "translate3d(" + da + "px, " + ma + "px, 0)", r[c] = 0, r[d] = 0, r.willChange = "transform") : (r[c] =
                              ma * ("bottom" === c ? -1 : 1), r[d] = da * ("right" === d ? -1 : 1), r.willChange = c + ", " + d);
                         g.attributes = gb({}, {
                              "x-placement": g.placement
                         }, g.attributes);
                         g.styles = gb({}, r, g.styles);
                         g.arrowStyles = gb({}, g.offsets.arrow, g.arrowStyles);
                         return g
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
               },
               applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function (g) {
                         ic(g.instance.popper, g.styles);
                         hb(g.instance.popper, g.attributes);
                         g.arrowElement && Object.keys(g.arrowStyles).length && ic(g.arrowElement, g.arrowStyles);
                         return g
                    },
                    onLoad: function (g, n, c, d, r) {
                         d = Pa(r,
                              n, g, c.positionFixed);
                         g = Ga(c.placement, d, n, g, c.modifiers.flip.boundariesElement, c.modifiers.flip.padding);
                         n.setAttribute("x-placement", g);
                         ic(n, {
                              position: c.positionFixed ? "fixed" : "absolute"
                         });
                         return c
                    },
                    gpuAcceleration: void 0
               }
          }
     };
     var ad = f.fn.dropdown,
          yc = /38|40|27/,
          ub = {
               offset: 0,
               flip: !0,
               boundary: "scrollParent",
               reference: "toggle",
               display: "dynamic"
          },
          Rc = {
               offset: "(number|string|function)",
               flip: "boolean",
               boundary: "(string|element)",
               reference: "(string|element)",
               display: "string"
          },
          vb = function () {
               function g(c, d) {
                    this._element =
                         c;
                    this._popper = null;
                    this._config = this._getConfig(d);
                    this._menu = this._getMenuElement();
                    this._inNavbar = this._detectNavbar();
                    this._addEventListeners()
               }
               var n = g.prototype;
               n.toggle = function () {
                    if (!this._element.disabled && !f(this._element).hasClass("disabled")) {
                         var c = g._getParentFromElement(this._element),
                              d = f(this._menu).hasClass("show");
                         g._clearMenus();
                         if (!d) {
                              d = {
                                   relatedTarget: this._element
                              };
                              var r = f.Event("show.bs.dropdown", d);
                              f(c).trigger(r);
                              if (!r.isDefaultPrevented()) {
                                   if (!this._inNavbar) {
                                        if ("undefined" ===
                                             typeof Ya) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                        r = this._element;
                                        "parent" === this._config.reference ? r = c : ha.isElement(this._config.reference) && (r = this._config.reference, "undefined" !== typeof this._config.reference.jquery && (r = this._config.reference[0]));
                                        "scrollParent" !== this._config.boundary && f(c).addClass("position-static");
                                        this._popper = new Ya(r, this._menu, this._getPopperConfig())
                                   }
                                   if ("ontouchstart" in document.documentElement && 0 === f(c).closest(".navbar-nav").length) f(document.body).children().on("mouseover",
                                        null, f.noop);
                                   this._element.focus();
                                   this._element.setAttribute("aria-expanded", !0);
                                   f(this._menu).toggleClass("show");
                                   f(c).toggleClass("show").trigger(f.Event("shown.bs.dropdown", d))
                              }
                         }
                    }
               };
               n.show = function () {
                    if (!(this._element.disabled || f(this._element).hasClass("disabled") || f(this._menu).hasClass("show"))) {
                         var c = {
                              relatedTarget: this._element
                         },
                              d = f.Event("show.bs.dropdown", c),
                              r = g._getParentFromElement(this._element);
                         f(r).trigger(d);
                         d.isDefaultPrevented() || (f(this._menu).toggleClass("show"), f(r).toggleClass("show").trigger(f.Event("shown.bs.dropdown",
                              c)))
                    }
               };
               n.hide = function () {
                    if (!this._element.disabled && !f(this._element).hasClass("disabled") && f(this._menu).hasClass("show")) {
                         var c = {
                              relatedTarget: this._element
                         },
                              d = f.Event("hide.bs.dropdown", c),
                              r = g._getParentFromElement(this._element);
                         f(r).trigger(d);
                         d.isDefaultPrevented() || (f(this._menu).toggleClass("show"), f(r).toggleClass("show").trigger(f.Event("hidden.bs.dropdown", c)))
                    }
               };
               n.dispose = function () {
                    f.removeData(this._element, "bs.dropdown");
                    f(this._element).off(".bs.dropdown");
                    this._menu = this._element =
                         null;
                    null !== this._popper && (this._popper.destroy(), this._popper = null)
               };
               n.update = function () {
                    this._inNavbar = this._detectNavbar();
                    null !== this._popper && this._popper.scheduleUpdate()
               };
               n._addEventListeners = function () {
                    var c = this;
                    f(this._element).on("click.bs.dropdown", function (d) {
                         d.preventDefault();
                         d.stopPropagation();
                         c.toggle()
                    })
               };
               n._getConfig = function (c) {
                    c = A({}, this.constructor.Default, f(this._element).data(), c);
                    ha.typeCheckConfig("dropdown", c, this.constructor.DefaultType);
                    return c
               };
               n._getMenuElement = function () {
                    if (!this._menu) {
                         var c =
                              g._getParentFromElement(this._element);
                         c && (this._menu = c.querySelector(".dropdown-menu"))
                    }
                    return this._menu
               };
               n._getPlacement = function () {
                    var c = f(this._element.parentNode),
                         d = "bottom-start";
                    c.hasClass("dropup") ? (d = "top-start", f(this._menu).hasClass("dropdown-menu-right") && (d = "top-end")) : c.hasClass("dropright") ? d = "right-start" : c.hasClass("dropleft") ? d = "left-start" : f(this._menu).hasClass("dropdown-menu-right") && (d = "bottom-end");
                    return d
               };
               n._detectNavbar = function () {
                    return 0 < f(this._element).closest(".navbar").length
               };
               n._getOffset = function () {
                    var c = this,
                         d = {};
                    "function" === typeof this._config.offset ? d.fn = function (r) {
                         r.offsets = A({}, r.offsets, c._config.offset(r.offsets, c._element) || {});
                         return r
                    } : d.offset = this._config.offset;
                    return d
               };
               n._getPopperConfig = function () {
                    var c = {
                         placement: this._getPlacement(),
                         modifiers: {
                              offset: this._getOffset(),
                              flip: {
                                   enabled: this._config.flip
                              },
                              preventOverflow: {
                                   boundariesElement: this._config.boundary
                              }
                         }
                    };
                    "static" === this._config.display && (c.modifiers.applyStyle = {
                         enabled: !1
                    });
                    return c
               };
               g._jQueryInterface =
                    function (c) {
                         return this.each(function () {
                              var d = f(this).data("bs.dropdown"),
                                   r = "object" === typeof c ? c : null;
                              d || (d = new g(this, r), f(this).data("bs.dropdown", d));
                              if ("string" === typeof c) {
                                   if ("undefined" === typeof d[c]) throw new TypeError('No method named "' + c + '"');
                                   d[c]()
                              }
                         })
                    };
               g._clearMenus = function (c) {
                    if (!c || 3 !== c.which && ("keyup" !== c.type || 9 === c.which))
                         for (var d = [].slice.call(document.querySelectorAll('[data-toggle\x3d"dropdown"]')), r = 0, B = d.length; r < B; r++) {
                              var K = g._getParentFromElement(d[r]),
                                   O = f(d[r]).data("bs.dropdown"),
                                   ca = {
                                        relatedTarget: d[r]
                                   };
                              c && "click" === c.type && (ca.clickEvent = c);
                              if (O && (O = O._menu, f(K).hasClass("show") && !(c && ("click" === c.type && /input|textarea/i.test(c.target.tagName) || "keyup" === c.type && 9 === c.which) && f.contains(K, c.target)))) {
                                   var da = f.Event("hide.bs.dropdown", ca);
                                   f(K).trigger(da);
                                   da.isDefaultPrevented() || ("ontouchstart" in document.documentElement && f(document.body).children().off("mouseover", null, f.noop), d[r].setAttribute("aria-expanded", "false"), f(O).removeClass("show"), f(K).removeClass("show").trigger(f.Event("hidden.bs.dropdown",
                                        ca)))
                              }
                         }
               };
               g._getParentFromElement = function (c) {
                    var d, r = ha.getSelectorFromElement(c);
                    r && (d = document.querySelector(r));
                    return d || c.parentNode
               };
               g._dataApiKeydownHandler = function (c) {
                    if (/input|textarea/i.test(c.target.tagName) ? !(32 === c.which || 27 !== c.which && (40 !== c.which && 38 !== c.which || f(c.target).closest(".dropdown-menu").length)) : yc.test(c.which))
                         if (c.preventDefault(), c.stopPropagation(), !this.disabled && !f(this).hasClass("disabled")) {
                              var d = g._getParentFromElement(this),
                                   r = f(d).hasClass("show");
                              !r || r && (27 ===
                                   c.which || 32 === c.which) ? (27 === c.which && (c = d.querySelector('[data-toggle\x3d"dropdown"]'), f(c).trigger("focus")), f(this).trigger("click")) : (d = [].slice.call(d.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")), 0 !== d.length && (r = d.indexOf(c.target), 38 === c.which && 0 < r && r--, 40 === c.which && r < d.length - 1 && r++, 0 > r && (r = 0), d[r].focus()))
                         }
               };
               N(g, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               }, {
                    key: "Default",
                    get: function () {
                         return ub
                    }
               }, {
                    key: "DefaultType",
                    get: function () {
                         return Rc
                    }
               }]);
               return g
          }();
     f(document).on("keydown.bs.dropdown.data-api", '[data-toggle\x3d"dropdown"]', vb._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api", ".dropdown-menu", vb._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", vb._clearMenus).on("click.bs.dropdown.data-api", '[data-toggle\x3d"dropdown"]', function (g) {
          g.preventDefault();
          g.stopPropagation();
          vb._jQueryInterface.call(f(this), "toggle")
     }).on("click.bs.dropdown.data-api", ".dropdown form", function (g) {
          g.stopPropagation()
     });
     f.fn.dropdown = vb._jQueryInterface;
     f.fn.dropdown.Constructor = vb;
     f.fn.dropdown.noConflict = function () {
          f.fn.dropdown = ad;
          return vb._jQueryInterface
     };
     var ac = f.fn.modal,
          na = {
               backdrop: !0,
               keyboard: !0,
               focus: !0,
               show: !0
          },
          bb = {
               backdrop: "(boolean|string)",
               keyboard: "boolean",
               focus: "boolean",
               show: "boolean"
          },
          Ub = function () {
               function g(c, d) {
                    this._config = this._getConfig(d);
                    this._element = c;
                    this._dialog = c.querySelector(".modal-dialog");
                    this._backdrop = null;
                    this._isTransitioning = this._ignoreBackdropClick = this._isBodyOverflowing =
                         this._isShown = !1;
                    this._scrollbarWidth = 0
               }
               var n = g.prototype;
               n.toggle = function (c) {
                    return this._isShown ? this.hide() : this.show(c)
               };
               n.show = function (c) {
                    var d = this;
                    if (!this._isShown && !this._isTransitioning) {
                         f(this._element).hasClass("fade") && (this._isTransitioning = !0);
                         var r = f.Event("show.bs.modal", {
                              relatedTarget: c
                         });
                         f(this._element).trigger(r);
                         this._isShown || r.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(),
                              f(this._element).on("click.dismiss.bs.modal", '[data-dismiss\x3d"modal"]', function (B) {
                                   return d.hide(B)
                              }), f(this._dialog).on("mousedown.dismiss.bs.modal", function () {
                                   f(d._element).one("mouseup.dismiss.bs.modal", function (B) {
                                        f(B.target).is(d._element) && (d._ignoreBackdropClick = !0)
                                   })
                              }), this._showBackdrop(function () {
                                   return d._showElement(c)
                              }))
                    }
               };
               n.hide = function (c) {
                    var d = this;
                    c && c.preventDefault();
                    if (this._isShown && !this._isTransitioning && (c = f.Event("hide.bs.modal"), f(this._element).trigger(c), this._isShown &&
                         !c.isDefaultPrevented())) {
                         this._isShown = !1;
                         if (c = f(this._element).hasClass("fade")) this._isTransitioning = !0;
                         this._setEscapeEvent();
                         this._setResizeEvent();
                         f(document).off("focusin.bs.modal");
                         f(this._element).removeClass("show");
                         f(this._element).off("click.dismiss.bs.modal");
                         f(this._dialog).off("mousedown.dismiss.bs.modal");
                         c ? (c = ha.getTransitionDurationFromElement(this._element), f(this._element).one(ha.TRANSITION_END, function (r) {
                              return d._hideModal(r)
                         }).emulateTransitionEnd(c)) : this._hideModal()
                    }
               };
               n.dispose =
                    function () {
                         [window, this._element, this._dialog].forEach(function (c) {
                              return f(c).off(".bs.modal")
                         });
                         f(document).off("focusin.bs.modal");
                         f.removeData(this._element, "bs.modal");
                         this._scrollbarWidth = this._isTransitioning = this._ignoreBackdropClick = this._isBodyOverflowing = this._isShown = this._backdrop = this._dialog = this._element = this._config = null
                    };
               n.handleUpdate = function () {
                    this._adjustDialog()
               };
               n._getConfig = function (c) {
                    c = A({}, na, c);
                    ha.typeCheckConfig("modal", c, bb);
                    return c
               };
               n._showElement = function (c) {
                    var d =
                         this,
                         r = f(this._element).hasClass("fade");
                    this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element);
                    this._element.style.display = "block";
                    this._element.removeAttribute("aria-hidden");
                    this._element.setAttribute("aria-modal", !0);
                    f(this._dialog).hasClass("modal-dialog-scrollable") ? this._dialog.querySelector(".modal-body").scrollTop = 0 : this._element.scrollTop = 0;
                    r && ha.reflow(this._element);
                    f(this._element).addClass("show");
                    this._config.focus &&
                         this._enforceFocus();
                    var B = f.Event("shown.bs.modal", {
                         relatedTarget: c
                    });
                    c = function () {
                         d._config.focus && d._element.focus();
                         d._isTransitioning = !1;
                         f(d._element).trigger(B)
                    };
                    r ? (r = ha.getTransitionDurationFromElement(this._dialog), f(this._dialog).one(ha.TRANSITION_END, c).emulateTransitionEnd(r)) : c()
               };
               n._enforceFocus = function () {
                    var c = this;
                    f(document).off("focusin.bs.modal").on("focusin.bs.modal", function (d) {
                         document !== d.target && c._element !== d.target && 0 === f(c._element).has(d.target).length && c._element.focus()
                    })
               };
               n._setEscapeEvent = function () {
                    var c = this;
                    if (this._isShown && this._config.keyboard) f(this._element).on("keydown.dismiss.bs.modal", function (d) {
                         27 === d.which && (d.preventDefault(), c.hide())
                    });
                    else this._isShown || f(this._element).off("keydown.dismiss.bs.modal")
               };
               n._setResizeEvent = function () {
                    var c = this;
                    if (this._isShown) f(window).on("resize.bs.modal", function (d) {
                         return c.handleUpdate(d)
                    });
                    else f(window).off("resize.bs.modal")
               };
               n._hideModal = function () {
                    var c = this;
                    this._element.style.display = "none";
                    this._element.setAttribute("aria-hidden",
                         !0);
                    this._element.removeAttribute("aria-modal");
                    this._isTransitioning = !1;
                    this._showBackdrop(function () {
                         f(document.body).removeClass("modal-open");
                         c._resetAdjustments();
                         c._resetScrollbar();
                         f(c._element).trigger("hidden.bs.modal")
                    })
               };
               n._removeBackdrop = function () {
                    this._backdrop && (f(this._backdrop).remove(), this._backdrop = null)
               };
               n._showBackdrop = function (c) {
                    var d = this,
                         r = f(this._element).hasClass("fade") ? "fade" : "";
                    if (this._isShown && this._config.backdrop) this._backdrop = document.createElement("div"), this._backdrop.className =
                         "modal-backdrop", r && this._backdrop.classList.add(r), f(this._backdrop).appendTo(document.body), f(this._element).on("click.dismiss.bs.modal", function (K) {
                              d._ignoreBackdropClick ? d._ignoreBackdropClick = !1 : K.target === K.currentTarget && ("static" === d._config.backdrop ? d._element.focus() : d.hide())
                         }), r && ha.reflow(this._backdrop), f(this._backdrop).addClass("show"), c && (r ? (r = ha.getTransitionDurationFromElement(this._backdrop), f(this._backdrop).one(ha.TRANSITION_END, c).emulateTransitionEnd(r)) : c());
                    else if (!this._isShown &&
                         this._backdrop)
                         if (f(this._backdrop).removeClass("show"), r = function () {
                              d._removeBackdrop();
                              c && c()
                         }, f(this._element).hasClass("fade")) {
                              var B = ha.getTransitionDurationFromElement(this._backdrop);
                              f(this._backdrop).one(ha.TRANSITION_END, r).emulateTransitionEnd(B)
                         } else r();
                    else c && c()
               };
               n._adjustDialog = function () {
                    var c = this._element.scrollHeight > document.documentElement.clientHeight;
                    !this._isBodyOverflowing && c && (this._element.style.paddingLeft = this._scrollbarWidth + "px");
                    this._isBodyOverflowing && !c && (this._element.style.paddingRight =
                         this._scrollbarWidth + "px")
               };
               n._resetAdjustments = function () {
                    this._element.style.paddingLeft = "";
                    this._element.style.paddingRight = ""
               };
               n._checkScrollbar = function () {
                    var c = document.body.getBoundingClientRect();
                    this._isBodyOverflowing = c.left + c.right < window.innerWidth;
                    this._scrollbarWidth = this._getScrollbarWidth()
               };
               n._setScrollbar = function () {
                    var c = this;
                    if (this._isBodyOverflowing) {
                         var d = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),
                              r = [].slice.call(document.querySelectorAll(".sticky-top"));
                         f(d).each(function (B, K) {
                              B = K.style.paddingRight;
                              var O = f(K).css("padding-right");
                              f(K).data("padding-right", B).css("padding-right", parseFloat(O) + c._scrollbarWidth + "px")
                         });
                         f(r).each(function (B, K) {
                              B = K.style.marginRight;
                              var O = f(K).css("margin-right");
                              f(K).data("margin-right", B).css("margin-right", parseFloat(O) - c._scrollbarWidth + "px")
                         });
                         d = document.body.style.paddingRight;
                         r = f(document.body).css("padding-right");
                         f(document.body).data("padding-right", d).css("padding-right", parseFloat(r) + this._scrollbarWidth +
                              "px")
                    }
                    f(document.body).addClass("modal-open")
               };
               n._resetScrollbar = function () {
                    var c = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));
                    f(c).each(function (d, r) {
                         d = f(r).data("padding-right");
                         f(r).removeData("padding-right");
                         r.style.paddingRight = d ? d : ""
                    });
                    c = [].slice.call(document.querySelectorAll(".sticky-top"));
                    f(c).each(function (d, r) {
                         d = f(r).data("margin-right");
                         "undefined" !== typeof d && f(r).css("margin-right", d).removeData("margin-right")
                    });
                    c = f(document.body).data("padding-right");
                    f(document.body).removeData("padding-right");
                    document.body.style.paddingRight = c ? c : ""
               };
               n._getScrollbarWidth = function () {
                    var c = document.createElement("div");
                    c.className = "modal-scrollbar-measure";
                    document.body.appendChild(c);
                    var d = c.getBoundingClientRect().width - c.clientWidth;
                    document.body.removeChild(c);
                    return d
               };
               g._jQueryInterface = function (c, d) {
                    return this.each(function () {
                         var r = f(this).data("bs.modal"),
                              B = A({}, na, f(this).data(), "object" === typeof c && c ? c : {});
                         r || (r = new g(this, B), f(this).data("bs.modal",
                              r));
                         if ("string" === typeof c) {
                              if ("undefined" === typeof r[c]) throw new TypeError('No method named "' + c + '"');
                              r[c](d)
                         } else B.show && r.show(d)
                    })
               };
               N(g, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               }, {
                    key: "Default",
                    get: function () {
                         return na
                    }
               }]);
               return g
          }();
     f(document).on("click.bs.modal.data-api", '[data-toggle\x3d"modal"]', function (g) {
          var n = this,
               c, d = ha.getSelectorFromElement(this);
          d && (c = document.querySelector(d));
          d = f(c).data("bs.modal") ? "toggle" : A({}, f(c).data(), f(this).data());
          "A" !== this.tagName && "AREA" !==
               this.tagName || g.preventDefault();
          var r = f(c).one("show.bs.modal", function (B) {
               if (!B.isDefaultPrevented()) r.one("hidden.bs.modal", function () {
                    f(n).is(":visible") && n.focus()
               })
          });
          Ub._jQueryInterface.call(f(c), d, this)
     });
     f.fn.modal = Ub._jQueryInterface;
     f.fn.modal.Constructor = Ub;
     f.fn.modal.noConflict = function () {
          f.fn.modal = ac;
          return Ub._jQueryInterface
     };
     var Sc = "background cite href itemtype longdesc poster src xlink:href".split(" "),
          Qc = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
          Vb = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i,
          ob = f.fn.tooltip,
          Ib = /(^|\s)bs-tooltip\S+/g,
          Kb = ["sanitize", "whiteList", "sanitizeFn"],
          bd = {
               animation: "boolean",
               template: "string",
               title: "(string|element|function)",
               trigger: "string",
               delay: "(number|object)",
               html: "boolean",
               selector: "(string|boolean)",
               placement: "(string|function)",
               offset: "(number|string|function)",
               container: "(string|element|boolean)",
               fallbackPlacement: "(string|array)",
               boundary: "(string|element)",
               sanitize: "boolean",
               sanitizeFn: "(null|function)",
               whiteList: "object"
          },
          dc = {
               AUTO: "auto",
               TOP: "top",
               RIGHT: "right",
               BOTTOM: "bottom",
               LEFT: "left"
          },
          Cc = {
               animation: !0,
               template: '\x3cdiv class\x3d"tooltip" role\x3d"tooltip"\x3e\x3cdiv class\x3d"arrow"\x3e\x3c/div\x3e\x3cdiv class\x3d"tooltip-inner"\x3e\x3c/div\x3e\x3c/div\x3e',
               trigger: "hover focus",
               title: "",
               delay: 0,
               html: !1,
               selector: !1,
               placement: "top",
               offset: 0,
               container: !1,
               fallbackPlacement: "flip",
               boundary: "scrollParent",
               sanitize: !0,
               sanitizeFn: null,
               whiteList: {
                    "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                    a: ["target", "href", "title", "rel"],
                    area: [],
                    b: [],
                    br: [],
                    col: [],
                    code: [],
                    div: [],
                    em: [],
                    hr: [],
                    h1: [],
                    h2: [],
                    h3: [],
                    h4: [],
                    h5: [],
                    h6: [],
                    i: [],
                    img: ["src", "alt", "title", "width", "height"],
                    li: [],
                    ol: [],
                    p: [],
                    pre: [],
                    s: [],
                    small: [],
                    span: [],
                    sub: [],
                    sup: [],
                    strong: [],
                    u: [],
                    ul: []
               }
          },
          kc = {
               HIDE: "hide.bs.tooltip",
               HIDDEN: "hidden.bs.tooltip",
               SHOW: "show.bs.tooltip",
               SHOWN: "shown.bs.tooltip",
               INSERTED: "inserted.bs.tooltip",
               CLICK: "click.bs.tooltip",
               FOCUSIN: "focusin.bs.tooltip",
               FOCUSOUT: "focusout.bs.tooltip",
               MOUSEENTER: "mouseenter.bs.tooltip",
               MOUSELEAVE: "mouseleave.bs.tooltip"
          },
          mb = function () {
               function g(c, d) {
                    if ("undefined" === typeof Ya) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                    this._isEnabled = !0;
                    this._timeout = 0;
                    this._hoverState = "";
                    this._activeTrigger = {};
                    this._popper = null;
                    this.element = c;
                    this.config = this._getConfig(d);
                    this.tip = null;
                    this._setListeners()
               }
               var n = g.prototype;
               n.enable = function () {
                    this._isEnabled = !0
               };
               n.disable = function () {
                    this._isEnabled = !1
               };
               n.toggleEnabled = function () {
                    this._isEnabled = !this._isEnabled
               };
               n.toggle = function (c) {
                    if (this._isEnabled)
                         if (c) {
                              var d =
                                   this.constructor.DATA_KEY,
                                   r = f(c.currentTarget).data(d);
                              r || (r = new this.constructor(c.currentTarget, this._getDelegateConfig()), f(c.currentTarget).data(d, r));
                              r._activeTrigger.click = !r._activeTrigger.click;
                              r._isWithActiveTrigger() ? r._enter(null, r) : r._leave(null, r)
                         } else f(this.getTipElement()).hasClass("show") ? this._leave(null, this) : this._enter(null, this)
               };
               n.dispose = function () {
                    clearTimeout(this._timeout);
                    f.removeData(this.element, this.constructor.DATA_KEY);
                    f(this.element).off(this.constructor.EVENT_KEY);
                    f(this.element).closest(".modal").off("hide.bs.modal");
                    this.tip && f(this.tip).remove();
                    this._activeTrigger = this._hoverState = this._timeout = this._isEnabled = null;
                    null !== this._popper && this._popper.destroy();
                    this.tip = this.config = this.element = this._popper = null
               };
               n.show = function () {
                    var c = this;
                    if ("none" === f(this.element).css("display")) throw Error("Please use show on visible elements");
                    var d = f.Event(this.constructor.Event.SHOW);
                    if (this.isWithContent() && this._isEnabled) {
                         f(this.element).trigger(d);
                         var r = ha.findShadowRoot(this.element);
                         r = f.contains(null !== r ? r : this.element.ownerDocument.documentElement, this.element);
                         if (!d.isDefaultPrevented() && r) {
                              d = this.getTipElement();
                              r = ha.getUID(this.constructor.NAME);
                              d.setAttribute("id", r);
                              this.element.setAttribute("aria-describedby", r);
                              this.setContent();
                              this.config.animation && f(d).addClass("fade");
                              r = "function" === typeof this.config.placement ? this.config.placement.call(this, d, this.element) : this.config.placement;
                              r = this._getAttachment(r);
                              this.addAttachmentClass(r);
                              var B = this._getContainer();
                              f(d).data(this.constructor.DATA_KEY,
                                   this);
                              f.contains(this.element.ownerDocument.documentElement, this.tip) || f(d).appendTo(B);
                              f(this.element).trigger(this.constructor.Event.INSERTED);
                              this._popper = new Ya(this.element, d, {
                                   placement: r,
                                   modifiers: {
                                        offset: this._getOffset(),
                                        flip: {
                                             behavior: this.config.fallbackPlacement
                                        },
                                        arrow: {
                                             element: ".arrow"
                                        },
                                        preventOverflow: {
                                             boundariesElement: this.config.boundary
                                        }
                                   },
                                   onCreate: function (K) {
                                        K.originalPlacement !== K.placement && c._handlePopperPlacementChange(K)
                                   },
                                   onUpdate: function (K) {
                                        return c._handlePopperPlacementChange(K)
                                   }
                              });
                              f(d).addClass("show");
                              if ("ontouchstart" in document.documentElement) f(document.body).children().on("mouseover", null, f.noop);
                              d = function () {
                                   c.config.animation && c._fixTransition();
                                   var K = c._hoverState;
                                   c._hoverState = null;
                                   f(c.element).trigger(c.constructor.Event.SHOWN);
                                   "out" === K && c._leave(null, c)
                              };
                              f(this.tip).hasClass("fade") ? (r = ha.getTransitionDurationFromElement(this.tip), f(this.tip).one(ha.TRANSITION_END, d).emulateTransitionEnd(r)) : d()
                         }
                    }
               };
               n.hide = function (c) {
                    var d = this,
                         r = this.getTipElement(),
                         B = f.Event(this.constructor.Event.HIDE),
                         K = function () {
                              "show" !== d._hoverState && r.parentNode && r.parentNode.removeChild(r);
                              d._cleanTipClass();
                              d.element.removeAttribute("aria-describedby");
                              f(d.element).trigger(d.constructor.Event.HIDDEN);
                              null !== d._popper && d._popper.destroy();
                              c && c()
                         };
                    f(this.element).trigger(B);
                    B.isDefaultPrevented() || (f(r).removeClass("show"), "ontouchstart" in document.documentElement && f(document.body).children().off("mouseover", null, f.noop), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1,
                         f(this.tip).hasClass("fade") ? (B = ha.getTransitionDurationFromElement(r), f(r).one(ha.TRANSITION_END, K).emulateTransitionEnd(B)) : K(), this._hoverState = "")
               };
               n.update = function () {
                    null !== this._popper && this._popper.scheduleUpdate()
               };
               n.isWithContent = function () {
                    return !!this.getTitle()
               };
               n.addAttachmentClass = function (c) {
                    f(this.getTipElement()).addClass("bs-tooltip-" + c)
               };
               n.getTipElement = function () {
                    return this.tip = this.tip || f(this.config.template)[0]
               };
               n.setContent = function () {
                    var c = this.getTipElement();
                    this.setElementContent(f(c.querySelectorAll(".tooltip-inner")),
                         this.getTitle());
                    f(c).removeClass("fade show")
               };
               n.setElementContent = function (c, d) {
                    "object" === typeof d && (d.nodeType || d.jquery) ? this.config.html ? f(d).parent().is(c) || c.empty().append(d) : c.text(f(d).text()) : this.config.html ? (this.config.sanitize && (d = rc(d, this.config.whiteList, this.config.sanitizeFn)), c.html(d)) : c.text(d)
               };
               n.getTitle = function () {
                    var c = this.element.getAttribute("data-original-title");
                    c || (c = "function" === typeof this.config.title ? this.config.title.call(this.element) : this.config.title);
                    return c
               };
               n._getOffset = function () {
                    var c = this,
                         d = {};
                    "function" === typeof this.config.offset ? d.fn = function (r) {
                         r.offsets = A({}, r.offsets, c.config.offset(r.offsets, c.element) || {});
                         return r
                    } : d.offset = this.config.offset;
                    return d
               };
               n._getContainer = function () {
                    return !1 === this.config.container ? document.body : ha.isElement(this.config.container) ? f(this.config.container) : f(document).find(this.config.container)
               };
               n._getAttachment = function (c) {
                    return dc[c.toUpperCase()]
               };
               n._setListeners = function () {
                    var c = this;
                    this.config.trigger.split(" ").forEach(function (d) {
                         if ("click" ===
                              d) f(c.element).on(c.constructor.Event.CLICK, c.config.selector, function (B) {
                                   return c.toggle(B)
                              });
                         else if ("manual" !== d) {
                              var r = "hover" === d ? c.constructor.Event.MOUSEENTER : c.constructor.Event.FOCUSIN;
                              d = "hover" === d ? c.constructor.Event.MOUSELEAVE : c.constructor.Event.FOCUSOUT;
                              f(c.element).on(r, c.config.selector, function (B) {
                                   return c._enter(B)
                              }).on(d, c.config.selector, function (B) {
                                   return c._leave(B)
                              })
                         }
                    });
                    f(this.element).closest(".modal").on("hide.bs.modal", function () {
                         c.element && c.hide()
                    });
                    this.config.selector ?
                         this.config = A({}, this.config, {
                              trigger: "manual",
                              selector: ""
                         }) : this._fixTitle()
               };
               n._fixTitle = function () {
                    var c = typeof this.element.getAttribute("data-original-title");
                    if (this.element.getAttribute("title") || "string" !== c) this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", "")
               };
               n._enter = function (c, d) {
                    var r = this.constructor.DATA_KEY;
                    d = d || f(c.currentTarget).data(r);
                    d || (d = new this.constructor(c.currentTarget, this._getDelegateConfig()), f(c.currentTarget).data(r,
                         d));
                    c && (d._activeTrigger["focusin" === c.type ? "focus" : "hover"] = !0);
                    f(d.getTipElement()).hasClass("show") || "show" === d._hoverState ? d._hoverState = "show" : (clearTimeout(d._timeout), d._hoverState = "show", d.config.delay && d.config.delay.show ? d._timeout = setTimeout(function () {
                         "show" === d._hoverState && d.show()
                    }, d.config.delay.show) : d.show())
               };
               n._leave = function (c, d) {
                    var r = this.constructor.DATA_KEY;
                    d = d || f(c.currentTarget).data(r);
                    d || (d = new this.constructor(c.currentTarget, this._getDelegateConfig()), f(c.currentTarget).data(r,
                         d));
                    c && (d._activeTrigger["focusout" === c.type ? "focus" : "hover"] = !1);
                    d._isWithActiveTrigger() || (clearTimeout(d._timeout), d._hoverState = "out", d.config.delay && d.config.delay.hide ? d._timeout = setTimeout(function () {
                         "out" === d._hoverState && d.hide()
                    }, d.config.delay.hide) : d.hide())
               };
               n._isWithActiveTrigger = function () {
                    for (var c in this._activeTrigger)
                         if (this._activeTrigger[c]) return !0;
                    return !1
               };
               n._getConfig = function (c) {
                    var d = f(this.element).data();
                    Object.keys(d).forEach(function (r) {
                         -1 !== Kb.indexOf(r) && delete d[r]
                    });
                    c = A({}, this.constructor.Default, d, "object" === typeof c && c ? c : {});
                    "number" === typeof c.delay && (c.delay = {
                         show: c.delay,
                         hide: c.delay
                    });
                    "number" === typeof c.title && (c.title = c.title.toString());
                    "number" === typeof c.content && (c.content = c.content.toString());
                    ha.typeCheckConfig("tooltip", c, this.constructor.DefaultType);
                    c.sanitize && (c.template = rc(c.template, c.whiteList, c.sanitizeFn));
                    return c
               };
               n._getDelegateConfig = function () {
                    var c = {};
                    if (this.config)
                         for (var d in this.config) this.constructor.Default[d] !== this.config[d] &&
                              (c[d] = this.config[d]);
                    return c
               };
               n._cleanTipClass = function () {
                    var c = f(this.getTipElement()),
                         d = c.attr("class").match(Ib);
                    null !== d && d.length && c.removeClass(d.join(""))
               };
               n._handlePopperPlacementChange = function (c) {
                    this.tip = c.instance.popper;
                    this._cleanTipClass();
                    this.addAttachmentClass(this._getAttachment(c.placement))
               };
               n._fixTransition = function () {
                    var c = this.getTipElement(),
                         d = this.config.animation;
                    null === c.getAttribute("x-placement") && (f(c).removeClass("fade"), this.config.animation = !1, this.hide(), this.show(),
                         this.config.animation = d)
               };
               g._jQueryInterface = function (c) {
                    return this.each(function () {
                         var d = f(this).data("bs.tooltip"),
                              r = "object" === typeof c && c;
                         if (d || !/dispose|hide/.test(c))
                              if (d || (d = new g(this, r), f(this).data("bs.tooltip", d)), "string" === typeof c) {
                                   if ("undefined" === typeof d[c]) throw new TypeError('No method named "' + c + '"');
                                   d[c]()
                              }
                    })
               };
               N(g, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               }, {
                    key: "Default",
                    get: function () {
                         return Cc
                    }
               }, {
                    key: "NAME",
                    get: function () {
                         return "tooltip"
                    }
               }, {
                    key: "DATA_KEY",
                    get: function () {
                         return "bs.tooltip"
                    }
               },
               {
                    key: "Event",
                    get: function () {
                         return kc
                    }
               }, {
                    key: "EVENT_KEY",
                    get: function () {
                         return ".bs.tooltip"
                    }
               }, {
                    key: "DefaultType",
                    get: function () {
                         return bd
                    }
               }
               ]);
               return g
          }();
     f.fn.tooltip = mb._jQueryInterface;
     f.fn.tooltip.Constructor = mb;
     f.fn.tooltip.noConflict = function () {
          f.fn.tooltip = ob;
          return mb._jQueryInterface
     };
     var Dc = f.fn.popover,
          Ec = /(^|\s)bs-popover\S+/g,
          Sb = A({}, mb.Default, {
               placement: "right",
               trigger: "click",
               content: "",
               template: '\x3cdiv class\x3d"popover" role\x3d"tooltip"\x3e\x3cdiv class\x3d"arrow"\x3e\x3c/div\x3e\x3ch3 class\x3d"popover-header"\x3e\x3c/h3\x3e\x3cdiv class\x3d"popover-body"\x3e\x3c/div\x3e\x3c/div\x3e'
          }),
          db = A({}, mb.DefaultType, {
               content: "(string|element|function)"
          }),
          Tc = {
               HIDE: "hide.bs.popover",
               HIDDEN: "hidden.bs.popover",
               SHOW: "show.bs.popover",
               SHOWN: "shown.bs.popover",
               INSERTED: "inserted.bs.popover",
               CLICK: "click.bs.popover",
               FOCUSIN: "focusin.bs.popover",
               FOCUSOUT: "focusout.bs.popover",
               MOUSEENTER: "mouseenter.bs.popover",
               MOUSELEAVE: "mouseleave.bs.popover"
          },
          bc = function (g) {
               function n() {
                    return g.apply(this, arguments) || this
               }
               h(n, g);
               var c = n.prototype;
               c.isWithContent = function () {
                    return this.getTitle() || this._getContent()
               };
               c.addAttachmentClass = function (d) {
                    f(this.getTipElement()).addClass("bs-popover-" + d)
               };
               c.getTipElement = function () {
                    return this.tip = this.tip || f(this.config.template)[0]
               };
               c.setContent = function () {
                    var d = f(this.getTipElement());
                    this.setElementContent(d.find(".popover-header"), this.getTitle());
                    var r = this._getContent();
                    "function" === typeof r && (r = r.call(this.element));
                    this.setElementContent(d.find(".popover-body"), r);
                    d.removeClass("fade show")
               };
               c._getContent = function () {
                    return this.element.getAttribute("data-content") ||
                         this.config.content
               };
               c._cleanTipClass = function () {
                    var d = f(this.getTipElement()),
                         r = d.attr("class").match(Ec);
                    null !== r && 0 < r.length && d.removeClass(r.join(""))
               };
               n._jQueryInterface = function (d) {
                    return this.each(function () {
                         var r = f(this).data("bs.popover"),
                              B = "object" === typeof d ? d : null;
                         if (r || !/dispose|hide/.test(d))
                              if (r || (r = new n(this, B), f(this).data("bs.popover", r)), "string" === typeof d) {
                                   if ("undefined" === typeof r[d]) throw new TypeError('No method named "' + d + '"');
                                   r[d]()
                              }
                    })
               };
               N(n, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               },
               {
                    key: "Default",
                    get: function () {
                         return Sb
                    }
               }, {
                    key: "NAME",
                    get: function () {
                         return "popover"
                    }
               }, {
                    key: "DATA_KEY",
                    get: function () {
                         return "bs.popover"
                    }
               }, {
                    key: "Event",
                    get: function () {
                         return Tc
                    }
               }, {
                    key: "EVENT_KEY",
                    get: function () {
                         return ".bs.popover"
                    }
               }, {
                    key: "DefaultType",
                    get: function () {
                         return db
                    }
               }
               ]);
               return n
          }(mb);
     f.fn.popover = bc._jQueryInterface;
     f.fn.popover.Constructor = bc;
     f.fn.popover.noConflict = function () {
          f.fn.popover = Dc;
          return bc._jQueryInterface
     };
     var cd = f.fn.scrollspy,
          Fc = {
               offset: 10,
               method: "auto",
               target: ""
          },
          Uc = {
               offset: "number",
               method: "string",
               target: "(string|element)"
          },
          Ab = function () {
               function g(c, d) {
                    var r = this;
                    this._element = c;
                    this._scrollElement = "BODY" === c.tagName ? window : c;
                    this._config = this._getConfig(d);
                    this._selector = this._config.target + " .nav-link," + (this._config.target + " .list-group-item,") + (this._config.target + " .dropdown-item");
                    this._offsets = [];
                    this._targets = [];
                    this._activeTarget = null;
                    this._scrollHeight = 0;
                    f(this._scrollElement).on("scroll.bs.scrollspy", function (B) {
                         return r._process(B)
                    });
                    this.refresh();
                    this._process()
               }
               var n = g.prototype;
               n.refresh = function () {
                    var c = this,
                         d = this._scrollElement === this._scrollElement.window ? "offset" : "position",
                         r = "auto" === this._config.method ? d : this._config.method,
                         B = "position" === r ? this._getScrollTop() : 0;
                    this._offsets = [];
                    this._targets = [];
                    this._scrollHeight = this._getScrollHeight();
                    [].slice.call(document.querySelectorAll(this._selector)).map(function (K) {
                         var O;
                         (K = ha.getSelectorFromElement(K)) && (O = document.querySelector(K));
                         if (O) {
                              var ca = O.getBoundingClientRect();
                              if (ca.width || ca.height) return [f(O)[r]().top +
                                   B, K
                              ]
                         }
                         return null
                    }).filter(function (K) {
                         return K
                    }).sort(function (K, O) {
                         return K[0] - O[0]
                    }).forEach(function (K) {
                         c._offsets.push(K[0]);
                         c._targets.push(K[1])
                    })
               };
               n.dispose = function () {
                    f.removeData(this._element, "bs.scrollspy");
                    f(this._scrollElement).off(".bs.scrollspy");
                    this._scrollHeight = this._activeTarget = this._targets = this._offsets = this._selector = this._config = this._scrollElement = this._element = null
               };
               n._getConfig = function (c) {
                    c = A({}, Fc, "object" === typeof c && c ? c : {});
                    if ("string" !== typeof c.target) {
                         var d = f(c.target).attr("id");
                         d || (d = ha.getUID("scrollspy"), f(c.target).attr("id", d));
                         c.target = "#" + d
                    }
                    ha.typeCheckConfig("scrollspy", c, Uc);
                    return c
               };
               n._getScrollTop = function () {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
               };
               n._getScrollHeight = function () {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
               };
               n._getOffsetHeight = function () {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
               };
               n._process = function () {
                    var c = this._getScrollTop() + this._config.offset,
                         d = this._getScrollHeight(),
                         r = this._config.offset + d - this._getOffsetHeight();
                    this._scrollHeight !== d && this.refresh();
                    if (c >= r) c = this._targets[this._targets.length - 1], this._activeTarget !== c && this._activate(c);
                    else if (this._activeTarget && c < this._offsets[0] && 0 < this._offsets[0]) this._activeTarget = null, this._clear();
                    else
                         for (d = this._offsets.length; d--;) this._activeTarget !== this._targets[d] && c >= this._offsets[d] && ("undefined" === typeof this._offsets[d +
                              1] || c < this._offsets[d + 1]) && this._activate(this._targets[d])
               };
               n._activate = function (c) {
                    this._activeTarget = c;
                    this._clear();
                    var d = this._selector.split(",").map(function (r) {
                         return r + '[data-target\x3d"' + c + '"],' + r + '[href\x3d"' + c + '"]'
                    });
                    d = f([].slice.call(document.querySelectorAll(d.join(","))));
                    d.hasClass("dropdown-item") ? (d.closest(".dropdown").find(".dropdown-toggle").addClass("active"), d.addClass("active")) : (d.addClass("active"), d.parents(".nav, .list-group").prev(".nav-link, .list-group-item").addClass("active"),
                         d.parents(".nav, .list-group").prev(".nav-item").children(".nav-link").addClass("active"));
                    f(this._scrollElement).trigger("activate.bs.scrollspy", {
                         relatedTarget: c
                    })
               };
               n._clear = function () {
                    [].slice.call(document.querySelectorAll(this._selector)).filter(function (c) {
                         return c.classList.contains("active")
                    }).forEach(function (c) {
                         return c.classList.remove("active")
                    })
               };
               g._jQueryInterface = function (c) {
                    return this.each(function () {
                         var d = f(this).data("bs.scrollspy"),
                              r = "object" === typeof c && c;
                         d || (d = new g(this, r), f(this).data("bs.scrollspy",
                              d));
                         if ("string" === typeof c) {
                              if ("undefined" === typeof d[c]) throw new TypeError('No method named "' + c + '"');
                              d[c]()
                         }
                    })
               };
               N(g, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               }, {
                    key: "Default",
                    get: function () {
                         return Fc
                    }
               }]);
               return g
          }();
     f(window).on("load.bs.scrollspy.data-api", function () {
          for (var g = [].slice.call(document.querySelectorAll('[data-spy\x3d"scroll"]')), n = g.length; n--;) {
               var c = f(g[n]);
               Ab._jQueryInterface.call(c, c.data())
          }
     });
     f.fn.scrollspy = Ab._jQueryInterface;
     f.fn.scrollspy.Constructor = Ab;
     f.fn.scrollspy.noConflict =
          function () {
               f.fn.scrollspy = cd;
               return Ab._jQueryInterface
          };
     var ec = f.fn.tab,
          Tb = function () {
               function g(c) {
                    this._element = c
               }
               var n = g.prototype;
               n.show = function () {
                    var c = this;
                    if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && f(this._element).hasClass("active") || f(this._element).hasClass("disabled"))) {
                         var d, r = f(this._element).closest(".nav, .list-group")[0],
                              B = ha.getSelectorFromElement(this._element);
                         if (r) {
                              var K = "UL" === r.nodeName || "OL" === r.nodeName ? "\x3e li \x3e .active" : ".active";
                              var O = f.makeArray(f(r).find(K));
                              O = O[O.length - 1]
                         }
                         K = f.Event("hide.bs.tab", {
                              relatedTarget: this._element
                         });
                         var ca = f.Event("show.bs.tab", {
                              relatedTarget: O
                         });
                         O && f(O).trigger(K);
                         f(this._element).trigger(ca);
                         ca.isDefaultPrevented() || K.isDefaultPrevented() || (B && (d = document.querySelector(B)), this._activate(this._element, r), r = function () {
                              var da = f.Event("hidden.bs.tab", {
                                   relatedTarget: c._element
                              }),
                                   ma = f.Event("shown.bs.tab", {
                                        relatedTarget: O
                                   });
                              f(O).trigger(da);
                              f(c._element).trigger(ma)
                         }, d ? this._activate(d, d.parentNode,
                              r) : r())
                    }
               };
               n.dispose = function () {
                    f.removeData(this._element, "bs.tab");
                    this._element = null
               };
               n._activate = function (c, d, r) {
                    var B = this,
                         K = (!d || "UL" !== d.nodeName && "OL" !== d.nodeName ? f(d).children(".active") : f(d).find("\x3e li \x3e .active"))[0],
                         O = r && K && f(K).hasClass("fade");
                    d = function () {
                         return B._transitionComplete(c, K, r)
                    };
                    K && O ? (O = ha.getTransitionDurationFromElement(K), f(K).removeClass("show").one(ha.TRANSITION_END, d).emulateTransitionEnd(O)) : d()
               };
               n._transitionComplete = function (c, d, r) {
                    if (d) {
                         f(d).removeClass("active");
                         var B = f(d.parentNode).find("\x3e .dropdown-menu .active")[0];
                         B && f(B).removeClass("active");
                         "tab" === d.getAttribute("role") && d.setAttribute("aria-selected", !1)
                    }
                    f(c).addClass("active");
                    "tab" === c.getAttribute("role") && c.setAttribute("aria-selected", !0);
                    ha.reflow(c);
                    c.classList.contains("fade") && c.classList.add("show");
                    if (c.parentNode && f(c.parentNode).hasClass("dropdown-menu")) {
                         if (d = f(c).closest(".dropdown")[0]) d = [].slice.call(d.querySelectorAll(".dropdown-toggle")), f(d).addClass("active");
                         c.setAttribute("aria-expanded",
                              !0)
                    }
                    r && r()
               };
               g._jQueryInterface = function (c) {
                    return this.each(function () {
                         var d = f(this),
                              r = d.data("bs.tab");
                         r || (r = new g(this), d.data("bs.tab", r));
                         if ("string" === typeof c) {
                              if ("undefined" === typeof r[c]) throw new TypeError('No method named "' + c + '"');
                              r[c]()
                         }
                    })
               };
               N(g, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               }]);
               return g
          }();
     f(document).on("click.bs.tab.data-api", '[data-toggle\x3d"tab"], [data-toggle\x3d"pill"], [data-toggle\x3d"list"]', function (g) {
          g.preventDefault();
          Tb._jQueryInterface.call(f(this),
               "show")
     });
     f.fn.tab = Tb._jQueryInterface;
     f.fn.tab.Constructor = Tb;
     f.fn.tab.noConflict = function () {
          f.fn.tab = ec;
          return Tb._jQueryInterface
     };
     var Vc = f.fn.toast,
          Gc = {
               animation: "boolean",
               autohide: "boolean",
               delay: "number"
          },
          oc = {
               animation: !0,
               autohide: !0,
               delay: 500
          },
          Xb = function () {
               function g(c, d) {
                    this._element = c;
                    this._config = this._getConfig(d);
                    this._timeout = null;
                    this._setListeners()
               }
               var n = g.prototype;
               n.show = function () {
                    var c = this;
                    f(this._element).trigger("show.bs.toast");
                    this._config.animation && this._element.classList.add("fade");
                    var d = function () {
                         c._element.classList.remove("showing");
                         c._element.classList.add("show");
                         f(c._element).trigger("shown.bs.toast");
                         c._config.autohide && c.hide()
                    };
                    this._element.classList.remove("hide");
                    this._element.classList.add("showing");
                    if (this._config.animation) {
                         var r = ha.getTransitionDurationFromElement(this._element);
                         f(this._element).one(ha.TRANSITION_END, d).emulateTransitionEnd(r)
                    } else d()
               };
               n.hide = function (c) {
                    var d = this;
                    this._element.classList.contains("show") && (f(this._element).trigger("hide.bs.toast"),
                         c ? this._close() : this._timeout = setTimeout(function () {
                              d._close()
                         }, this._config.delay))
               };
               n.dispose = function () {
                    clearTimeout(this._timeout);
                    this._timeout = null;
                    this._element.classList.contains("show") && this._element.classList.remove("show");
                    f(this._element).off("click.dismiss.bs.toast");
                    f.removeData(this._element, "bs.toast");
                    this._config = this._element = null
               };
               n._getConfig = function (c) {
                    c = A({}, oc, f(this._element).data(), "object" === typeof c && c ? c : {});
                    ha.typeCheckConfig("toast", c, this.constructor.DefaultType);
                    return c
               };
               n._setListeners = function () {
                    var c = this;
                    f(this._element).on("click.dismiss.bs.toast", '[data-dismiss\x3d"toast"]', function () {
                         return c.hide(!0)
                    })
               };
               n._close = function () {
                    var c = this,
                         d = function () {
                              c._element.classList.add("hide");
                              f(c._element).trigger("hidden.bs.toast")
                         };
                    this._element.classList.remove("show");
                    if (this._config.animation) {
                         var r = ha.getTransitionDurationFromElement(this._element);
                         f(this._element).one(ha.TRANSITION_END, d).emulateTransitionEnd(r)
                    } else d()
               };
               g._jQueryInterface = function (c) {
                    return this.each(function () {
                         var d =
                              f(this),
                              r = d.data("bs.toast"),
                              B = "object" === typeof c && c;
                         r || (r = new g(this, B), d.data("bs.toast", r));
                         if ("string" === typeof c) {
                              if ("undefined" === typeof r[c]) throw new TypeError('No method named "' + c + '"');
                              r[c](this)
                         }
                    })
               };
               N(g, null, [{
                    key: "VERSION",
                    get: function () {
                         return "4.3.1"
                    }
               }, {
                    key: "DefaultType",
                    get: function () {
                         return Gc
                    }
               }, {
                    key: "Default",
                    get: function () {
                         return oc
                    }
               }]);
               return g
          }();
     f.fn.toast = Xb._jQueryInterface;
     f.fn.toast.Constructor = Xb;
     f.fn.toast.noConflict = function () {
          f.fn.toast = Vc;
          return Xb._jQueryInterface
     };
     (function () {
          if ("undefined" === typeof f) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
          var g = f.fn.jquery.split(" ")[0].split(".");
          if (2 > g[0] && 9 > g[1] || 1 === g[0] && 9 === g[1] && 1 > g[2] || 4 <= g[0]) throw Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
     })();
     t.Util = ha;
     t.Alert = Cb;
     t.Button = Lb;
     t.Carousel = qb;
     t.Collapse = sa;
     t.Dropdown = vb;
     t.Modal = Ub;
     t.Popover = bc;
     t.Scrollspy = Ab;
     t.Tab = Tb;
     t.Toast = Xb;
     t.Tooltip = mb;
     Object.defineProperty(t,
          "__esModule", {
          value: !0
     })
});
! function (t, f, R, N) {
     function A(h, p) {
          this.settings = null;
          this.options = t.extend({}, A.Defaults, p);
          this.$element = t(h);
          this._handlers = {};
          this._plugins = {};
          this._supress = {};
          this._speed = this._current = null;
          this._coordinates = [];
          this._width = this._breakpoint = null;
          this._items = [];
          this._clones = [];
          this._mergers = [];
          this._widths = [];
          this._invalidated = {};
          this._pipe = [];
          this._drag = {
               time: null,
               target: null,
               pointer: null,
               stage: {
                    start: null,
                    current: null
               },
               direction: null
          };
          this._states = {
               current: {},
               tags: {
                    initializing: ["busy"],
                    animating: ["busy"],
                    dragging: ["interacting"]
               }
          };
          t.each(["onResize", "onThrottledResize"], t.proxy(function (u, y) {
               this._handlers[y] = t.proxy(this[y], this)
          }, this));
          t.each(A.Plugins, t.proxy(function (u, y) {
               this._plugins[u.charAt(0).toLowerCase() + u.slice(1)] = new y(this)
          }, this));
          t.each(A.Workers, t.proxy(function (u, y) {
               this._pipe.push({
                    filter: y.filter,
                    run: t.proxy(y.run, this)
               })
          }, this));
          this.setup();
          this.initialize()
     }
     A.Defaults = {
          items: 3,
          loop: !1,
          center: !1,
          rewind: !1,
          checkVisibility: !0,
          mouseDrag: !0,
          touchDrag: !0,
          pullDrag: !0,
          freeDrag: !1,
          margin: 0,
          stagePadding: 0,
          merge: !1,
          mergeFit: !0,
          autoWidth: !1,
          startPosition: 0,
          rtl: !1,
          smartSpeed: 250,
          fluidSpeed: !1,
          dragEndSpeed: !1,
          responsive: {},
          responsiveRefreshRate: 200,
          responsiveBaseElement: f,
          fallbackEasing: "swing",
          slideTransition: "",
          info: !1,
          nestedItemSelector: !1,
          itemElement: "div",
          stageElement: "div",
          refreshClass: "owl-refresh",
          loadedClass: "owl-loaded",
          loadingClass: "owl-loading",
          rtlClass: "owl-rtl",
          responsiveClass: "owl-responsive",
          dragClass: "owl-drag",
          itemClass: "owl-item",
          stageClass: "owl-stage",
          stageOuterClass: "owl-stage-outer",
          grabClass: "owl-grab"
     };
     A.Width = {
          Default: "default",
          Inner: "inner",
          Outer: "outer"
     };
     A.Type = {
          Event: "event",
          State: "state"
     };
     A.Plugins = {};
     A.Workers = [{
          filter: ["width", "settings"],
          run: function () {
               this._width = this.$element.width()
          }
     }, {
          filter: ["width", "items", "settings"],
          run: function (h) {
               h.current = this._items && this._items[this.relative(this._current)]
          }
     }, {
          filter: ["items", "settings"],
          run: function () {
               this.$stage.children(".cloned").remove()
          }
     }, {
          filter: ["width", "items", "settings"],
          run: function (h) {
               var p = this.settings.margin ||
                    "",
                    u = this.settings.rtl;
               p = {
                    width: "auto",
                    "margin-left": u ? p : "",
                    "margin-right": u ? "" : p
               };
               this.settings.autoWidth && this.$stage.children().css(p);
               h.css = p
          }
     }, {
          filter: ["width", "items", "settings"],
          run: function (h) {
               var p = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                    u = this._items.length,
                    y = !this.settings.autoWidth,
                    z = [];
               for (h.items = {
                    merge: !1,
                    width: p
               }; u--;) {
                    var E = this._mergers[u];
                    E = this.settings.mergeFit && Math.min(E, this.settings.items) || E;
                    h.items.merge = 1 < E || h.items.merge;
                    z[u] = y ? p * E : this._items[u].width()
               }
               this._widths =
                    z
          }
     }, {
          filter: ["items", "settings"],
          run: function () {
               var h = [],
                    p = this._items,
                    u = this.settings,
                    y = Math.max(2 * u.items, 4),
                    z = 2 * Math.ceil(p.length / 2);
               u = u.loop && p.length ? u.rewind ? y : Math.max(y, z) : 0;
               z = y = "";
               for (u /= 2; 0 < u;) h.push(this.normalize(h.length / 2, !0)), y += p[h[h.length - 1]][0].outerHTML, h.push(this.normalize(p.length - 1 - (h.length - 1) / 2, !0)), z = p[h[h.length - 1]][0].outerHTML + z, --u;
               this._clones = h;
               t(y).addClass("cloned").appendTo(this.$stage);
               t(z).addClass("cloned").prependTo(this.$stage)
          }
     }, {
          filter: ["width", "items",
               "settings"
          ],
          run: function () {
               for (var h = this.settings.rtl ? 1 : -1, p = this._clones.length + this._items.length, u = -1, y, z, E = []; ++u < p;) y = E[u - 1] || 0, z = this._widths[this.relative(u)] + this.settings.margin, E.push(y + z * h);
               this._coordinates = E
          }
     }, {
          filter: ["width", "items", "settings"],
          run: function () {
               var h = this.settings.stagePadding,
                    p = this._coordinates;
               this.$stage.css({
                    width: Math.ceil(Math.abs(p[p.length - 1])) + 2 * h,
                    "padding-left": h || "",
                    "padding-right": h || ""
               })
          }
     }, {
          filter: ["width", "items", "settings"],
          run: function (h) {
               var p = this._coordinates.length,
                    u = !this.settings.autoWidth,
                    y = this.$stage.children();
               if (u && h.items.merge)
                    for (; p--;) h.css.width = this._widths[this.relative(p)], y.eq(p).css(h.css);
               else u && (h.css.width = h.items.width, y.css(h.css))
          }
     }, {
          filter: ["items"],
          run: function () {
               1 > this._coordinates.length && this.$stage.removeAttr("style")
          }
     }, {
          filter: ["width", "items", "settings"],
          run: function (h) {
               h.current = h.current ? this.$stage.children().index(h.current) : 0;
               h.current = Math.max(this.minimum(), Math.min(this.maximum(), h.current));
               this.reset(h.current)
          }
     }, {
          filter: ["position"],
          run: function () {
               this.animate(this.coordinates(this._current))
          }
     }, {
          filter: ["width", "position", "items", "settings"],
          run: function () {
               var h, p = this.settings.rtl ? 1 : -1,
                    u = 2 * this.settings.stagePadding,
                    y = this.coordinates(this.current()) + u,
                    z = y + this.width() * p,
                    E = [];
               var L = 0;
               for (h = this._coordinates.length; L < h; L++) {
                    var S = this._coordinates[L - 1] || 0;
                    var V = Math.abs(this._coordinates[L]) + u * p;
                    (this.op(S, "\x3c\x3d", y) && this.op(S, "\x3e", z) || this.op(V, "\x3c", y) && this.op(V, "\x3e", z)) && E.push(L)
               }
               this.$stage.children(".active").removeClass("active");
               this.$stage.children(":eq(" + E.join("), :eq(") + ")").addClass("active");
               this.$stage.children(".center").removeClass("center");
               this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
          }
     }];
     A.prototype.initializeStage = function () {
          this.$stage = this.$element.find("." + this.settings.stageClass);
          this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = t("\x3c" + this.settings.stageElement + "\x3e", {
               class: this.settings.stageClass
          }).wrap(t("\x3cdiv/\x3e", {
               class: this.settings.stageOuterClass
          })),
               this.$element.append(this.$stage.parent()))
     };
     A.prototype.initializeItems = function () {
          var h = this.$element.find(".owl-item");
          if (h.length) return this._items = h.get().map(function (p) {
               return t(p)
          }), this._mergers = this._items.map(function () {
               return 1
          }), void this.refresh();
          this.replace(this.$element.children().not(this.$stage.parent()));
          this.isVisible() ? this.refresh() : this.invalidate("width");
          this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
     };
     A.prototype.initialize = function () {
          if (this.enter("initializing"),
               this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
               var h = this.$element.find("img");
               var p = this.$element.children(this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : N).width();
               h.length && 0 >= p && this.preloadAutoWidthImages(h)
          }
          this.initializeStage();
          this.initializeItems();
          this.registerEventHandlers();
          this.leave("initializing");
          this.trigger("initialized")
     };
     A.prototype.isVisible = function () {
          return !this.settings.checkVisibility ||
               this.$element.is(":visible")
     };
     A.prototype.setup = function () {
          var h = this.viewport(),
               p = this.options.responsive,
               u = -1,
               y = null;
          p ? (t.each(p, function (z) {
               z <= h && z > u && (u = Number(z))
          }), y = t.extend({}, this.options, p[u]), "function" == typeof y.stagePadding && (y.stagePadding = y.stagePadding()), delete y.responsive, y.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + u))) : y = t.extend({}, this.options);
          this.trigger("change", {
               property: {
                    name: "settings",
                    value: y
               }
          });
          this._breakpoint = u;
          this.settings = y;
          this.invalidate("settings");
          this.trigger("changed", {
               property: {
                    name: "settings",
                    value: this.settings
               }
          })
     };
     A.prototype.optionsLogic = function () {
          this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
     };
     A.prototype.prepare = function (h) {
          var p = this.trigger("prepare", {
               content: h
          });
          return p.data || (p.data = t("\x3c" + this.settings.itemElement + "/\x3e").addClass(this.options.itemClass).append(h)), this.trigger("prepared", {
               content: p.data
          }), p.data
     };
     A.prototype.update =
          function () {
               for (var h = 0, p = this._pipe.length, u = t.proxy(function (z) {
                    return this[z]
               }, this._invalidated), y = {}; h < p;)(this._invalidated.all || 0 < t.grep(this._pipe[h].filter, u).length) && this._pipe[h].run(y), h++;
               this._invalidated = {};
               !this.is("valid") && this.enter("valid")
          };
     A.prototype.width = function (h) {
          switch (h || A.Width.Default) {
               case A.Width.Inner:
               case A.Width.Outer:
                    return this._width;
               default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin
          }
     };
     A.prototype.refresh = function () {
          this.enter("refreshing");
          this.trigger("refresh");
          this.setup();
          this.optionsLogic();
          this.$element.addClass(this.options.refreshClass);
          this.update();
          this.$element.removeClass(this.options.refreshClass);
          this.leave("refreshing");
          this.trigger("refreshed")
     };
     A.prototype.onThrottledResize = function () {
          f.clearTimeout(this.resizeTimer);
          this.resizeTimer = f.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
     };
     A.prototype.onResize = function () {
          return !!this._items.length && this._width !== this.$element.width() && !!this.isVisible() &&
               (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
     };
     A.prototype.registerEventHandlers = function () {
          t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this));
          !1 !== this.settings.responsive && this.on(f, "resize", this._handlers.onThrottledResize);
          this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass),
               this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                    return !1
               }));
          this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
     };
     A.prototype.onDragStart = function (h) {
          var p = null;
          3 !== h.which && (t.support.transform ? (p = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), p = {
               x: p[16 === p.length ? 12 : 4],
               y: p[16 === p.length ?
                    13 : 5]
          }) : (p = this.$stage.position(), p = {
               x: this.settings.rtl ? p.left + this.$stage.width() - this.width() + this.settings.margin : p.left,
               y: p.top
          }), this.is("animating") && (t.support.transform ? this.animate(p.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === h.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(h.target), this._drag.stage.start = p, this._drag.stage.current = p, this._drag.pointer = this.pointer(h), t(R).on("mouseup.owl.core touchend.owl.core",
               t.proxy(this.onDragEnd, this)), t(R).one("mousemove.owl.core touchmove.owl.core", t.proxy(function (u) {
                    var y = this.difference(this._drag.pointer, this.pointer(u));
                    t(R).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this));
                    Math.abs(y.x) < Math.abs(y.y) && this.is("valid") || (u.preventDefault(), this.enter("dragging"), this.trigger("drag"))
               }, this)))
     };
     A.prototype.onDragMove = function (h) {
          var p = null,
               u = null,
               y = null,
               z = this.difference(this._drag.pointer, this.pointer(h)),
               E = this.difference(this._drag.stage.start,
                    z);
          this.is("dragging") && (h.preventDefault(), this.settings.loop ? (p = this.coordinates(this.minimum()), u = this.coordinates(this.maximum() + 1) - p, E.x = ((E.x - p) % u + u) % u + p) : (p = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), u = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), y = this.settings.pullDrag ? -1 * z.x / 5 : 0, E.x = Math.max(Math.min(E.x, p + y), u + y)), this._drag.stage.current = E, this.animate(E.x))
     };
     A.prototype.onDragEnd = function (h) {
          h = this.difference(this._drag.pointer,
               this.pointer(h));
          var p = this._drag.stage.current,
               u = 0 < h.x ^ this.settings.rtl ? "left" : "right";
          t(R).off(".owl.core");
          this.$element.removeClass(this.options.grabClass);
          (0 !== h.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(p.x, 0 !== h.x ? u : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = u, (3 < Math.abs(h.x) || 300 < (new Date).getTime() - this._drag.time) && this._drag.target.one("click.owl.core",
               function () {
                    return !1
               }));
          this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
     };
     A.prototype.closest = function (h, p) {
          var u = -1,
               y = this.width(),
               z = this.coordinates();
          return this.settings.freeDrag || t.each(z, t.proxy(function (E, L) {
               return "left" === p && h > L - 30 && h < L + 30 ? u = E : "right" === p && h > L - y - 30 && h < L - y + 30 ? u = E + 1 : this.op(h, "\x3c", L) && this.op(h, "\x3e", z[E + 1] !== N ? z[E + 1] : L - y) && (u = "left" === p ? E + 1 : E), -1 === u
          }, this)), this.settings.loop || (this.op(h, "\x3e", z[this.minimum()]) ? u = h = this.minimum() : this.op(h, "\x3c",
               z[this.maximum()]) && (u = h = this.maximum())), u
     };
     A.prototype.animate = function (h) {
          var p = 0 < this.speed();
          this.is("animating") && this.onTransitionEnd();
          p && (this.enter("animating"), this.trigger("translate"));
          t.support.transform3d && t.support.transition ? this.$stage.css({
               transform: "translate3d(" + h + "px,0px,0px)",
               transition: this.speed() / 1E3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
          }) : p ? this.$stage.animate({
               left: h + "px"
          }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd,
               this)) : this.$stage.css({
                    left: h + "px"
               })
     };
     A.prototype.is = function (h) {
          return this._states.current[h] && 0 < this._states.current[h]
     };
     A.prototype.current = function (h) {
          if (h === N) return this._current;
          if (0 === this._items.length) return N;
          if (h = this.normalize(h), this._current !== h) {
               var p = this.trigger("change", {
                    property: {
                         name: "position",
                         value: h
                    }
               });
               p.data !== N && (h = this.normalize(p.data));
               this._current = h;
               this.invalidate("position");
               this.trigger("changed", {
                    property: {
                         name: "position",
                         value: this._current
                    }
               })
          }
          return this._current
     };
     A.prototype.invalidate = function (h) {
          return "string" === t.type(h) && (this._invalidated[h] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function (p, u) {
               return u
          })
     };
     A.prototype.reset = function (h) {
          (h = this.normalize(h)) !== N && (this._speed = 0, this._current = h, this.suppress(["translate", "translated"]), this.animate(this.coordinates(h)), this.release(["translate", "translated"]))
     };
     A.prototype.normalize = function (h, p) {
          var u = this._items.length;
          p = p ? 0 : this._clones.length;
          return !this.isNumeric(h) || 1 > u ?
               h = N : (0 > h || h >= u + p) && (h = ((h - p / 2) % u + u) % u + p / 2), h
     };
     A.prototype.relative = function (h) {
          return h -= this._clones.length / 2, this.normalize(h, !0)
     };
     A.prototype.maximum = function (h) {
          var p;
          var u = this.settings;
          if (u.loop) u = this._clones.length / 2 + this._items.length - 1;
          else if (u.autoWidth || u.merge) {
               if (u = this._items.length) {
                    var y = this._items[--u].width();
                    for (p = this.$element.width(); u-- && !((y += this._items[u].width() + this.settings.margin) > p););
               }
               u += 1
          } else u = u.center ? this._items.length - 1 : this._items.length - u.items;
          return h &&
               (u -= this._clones.length / 2), Math.max(u, 0)
     };
     A.prototype.minimum = function (h) {
          return h ? 0 : this._clones.length / 2
     };
     A.prototype.items = function (h) {
          return h === N ? this._items.slice() : (h = this.normalize(h, !0), this._items[h])
     };
     A.prototype.mergers = function (h) {
          return h === N ? this._mergers.slice() : (h = this.normalize(h, !0), this._mergers[h])
     };
     A.prototype.clones = function (h) {
          var p = this._clones.length / 2,
               u = p + this._items.length;
          return h === N ? t.map(this._clones, function (y, z) {
               return 0 == z % 2 ? u + z / 2 : p - (z + 1) / 2
          }) : t.map(this._clones,
               function (y, z) {
                    return y === h ? 0 == z % 2 ? u + z / 2 : p - (z + 1) / 2 : null
               })
     };
     A.prototype.speed = function (h) {
          return h !== N && (this._speed = h), this._speed
     };
     A.prototype.coordinates = function (h) {
          var p, u = 1,
               y = h - 1;
          return h === N ? t.map(this._coordinates, t.proxy(function (z, E) {
               return this.coordinates(E)
          }, this)) : (this.settings.center ? (this.settings.rtl && (u = -1, y = h + 1), p = this._coordinates[h], p += (this.width() - p + (this._coordinates[y] || 0)) / 2 * u) : p = this._coordinates[y] || 0, p = Math.ceil(p))
     };
     A.prototype.duration = function (h, p, u) {
          return 0 === u ? 0 :
               Math.min(Math.max(Math.abs(p - h), 1), 6) * Math.abs(u || this.settings.smartSpeed)
     };
     A.prototype.to = function (h, p) {
          var u = this.current(),
               y = null,
               z = h - this.relative(u),
               E = (0 < z) - (0 > z),
               L = this._items.length,
               S = this.minimum(),
               V = this.maximum();
          this.settings.loop ? (!this.settings.rewind && Math.abs(z) > L / 2 && (z += -1 * E * L), h = u + z, (y = ((h - S) % L + L) % L + S) !== h && y - z <= V && 0 < y - z && (u = y - z, h = y, this.reset(u))) : this.settings.rewind ? (V += 1, h = (h % V + V) % V) : h = Math.max(S, Math.min(V, h));
          this.speed(this.duration(u, h, p));
          this.current(h);
          this.isVisible() &&
               this.update()
     };
     A.prototype.next = function (h) {
          h = h || !1;
          this.to(this.relative(this.current()) + 1, h)
     };
     A.prototype.prev = function (h) {
          h = h || !1;
          this.to(this.relative(this.current()) - 1, h)
     };
     A.prototype.onTransitionEnd = function (h) {
          if (h !== N && (h.stopPropagation(), (h.target || h.srcElement || h.originalTarget) !== this.$stage.get(0))) return !1;
          this.leave("animating");
          this.trigger("translated")
     };
     A.prototype.viewport = function () {
          var h;
          return this.options.responsiveBaseElement !== f ? h = t(this.options.responsiveBaseElement).width() :
               f.innerWidth ? h = f.innerWidth : R.documentElement && R.documentElement.clientWidth ? h = R.documentElement.clientWidth : console.warn("Can not detect viewport width."), h
     };
     A.prototype.replace = function (h) {
          this.$stage.empty();
          this._items = [];
          h && (h = h instanceof jQuery ? h : t(h));
          this.settings.nestedItemSelector && (h = h.find("." + this.settings.nestedItemSelector));
          h.filter(function () {
               return 1 === this.nodeType
          }).each(t.proxy(function (p, u) {
               u = this.prepare(u);
               this.$stage.append(u);
               this._items.push(u);
               this._mergers.push(1 * u.find("[data-merge]").addBack("[data-merge]").attr("data-merge") ||
                    1)
          }, this));
          this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);
          this.invalidate("items")
     };
     A.prototype.add = function (h, p) {
          var u = this.relative(this._current);
          p = p === N ? this._items.length : this.normalize(p, !0);
          h = h instanceof jQuery ? h : t(h);
          this.trigger("add", {
               content: h,
               position: p
          });
          h = this.prepare(h);
          0 === this._items.length || p === this._items.length ? (0 === this._items.length && this.$stage.append(h), 0 !== this._items.length && this._items[p - 1].after(h), this._items.push(h), this._mergers.push(1 *
               h.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[p].before(h), this._items.splice(p, 0, h), this._mergers.splice(p, 0, 1 * h.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1));
          this._items[u] && this.reset(this._items[u].index());
          this.invalidate("items");
          this.trigger("added", {
               content: h,
               position: p
          })
     };
     A.prototype.remove = function (h) {
          (h = this.normalize(h, !0)) !== N && (this.trigger("remove", {
               content: this._items[h],
               position: h
          }), this._items[h].remove(), this._items.splice(h,
               1), this._mergers.splice(h, 1), this.invalidate("items"), this.trigger("removed", {
                    content: null,
                    position: h
               }))
     };
     A.prototype.preloadAutoWidthImages = function (h) {
          h.each(t.proxy(function (p, u) {
               this.enter("pre-loading");
               u = t(u);
               t(new Image).one("load", t.proxy(function (y) {
                    u.attr("src", y.target.src);
                    u.css("opacity", 1);
                    this.leave("pre-loading");
                    this.is("pre-loading") || this.is("initializing") || this.refresh()
               }, this)).attr("src", u.attr("src") || u.attr("data-src") || u.attr("data-src-retina"))
          }, this))
     };
     A.prototype.destroy =
          function () {
               this.$element.off(".owl.core");
               this.$stage.off(".owl.core");
               t(R).off(".owl.core");
               !1 !== this.settings.responsive && (f.clearTimeout(this.resizeTimer), this.off(f, "resize", this._handlers.onThrottledResize));
               for (var h in this._plugins) this._plugins[h].destroy();
               this.$stage.children(".cloned").remove();
               this.$stage.unwrap();
               this.$stage.children().contents().unwrap();
               this.$stage.children().unwrap();
               this.$stage.remove();
               this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",
                    this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
          };
     A.prototype.op = function (h, p, u) {
          var y = this.settings.rtl;
          switch (p) {
               case "\x3c":
                    return y ? h > u : h < u;
               case "\x3e":
                    return y ? h < u : h > u;
               case "\x3e\x3d":
                    return y ? h <= u : h >= u;
               case "\x3c\x3d":
                    return y ? h >= u : h <= u
          }
     };
     A.prototype.on = function (h, p, u, y) {
          h.addEventListener ? h.addEventListener(p, u, y) : h.attachEvent && h.attachEvent("on" + p, u)
     };
     A.prototype.off = function (h, p, u, y) {
          h.removeEventListener ? h.removeEventListener(p,
               u, y) : h.detachEvent && h.detachEvent("on" + p, u)
     };
     A.prototype.trigger = function (h, p, u, y, z) {
          y = {
               item: {
                    count: this._items.length,
                    index: this.current()
               }
          };
          z = t.camelCase(t.grep(["on", h, u], function (L) {
               return L
          }).join("-").toLowerCase());
          var E = t.Event([h, "owl", u || "carousel"].join(".").toLowerCase(), t.extend({
               relatedTarget: this
          }, y, p));
          return this._supress[h] || (t.each(this._plugins, function (L, S) {
               S.onTrigger && S.onTrigger(E)
          }), this.register({
               type: A.Type.Event,
               name: h
          }), this.$element.trigger(E), this.settings && "function" ==
          typeof this.settings[z] && this.settings[z].call(this, E)), E
     };
     A.prototype.enter = function (h) {
          t.each([h].concat(this._states.tags[h] || []), t.proxy(function (p, u) {
               this._states.current[u] === N && (this._states.current[u] = 0);
               this._states.current[u]++
          }, this))
     };
     A.prototype.leave = function (h) {
          t.each([h].concat(this._states.tags[h] || []), t.proxy(function (p, u) {
               this._states.current[u]--
          }, this))
     };
     A.prototype.register = function (h) {
          if (h.type === A.Type.Event) {
               if (t.event.special[h.name] || (t.event.special[h.name] = {}), !t.event.special[h.name].owl) {
                    var p =
                         t.event.special[h.name]._default;
                    t.event.special[h.name]._default = function (u) {
                         return !p || !p.apply || u.namespace && -1 !== u.namespace.indexOf("owl") ? u.namespace && -1 < u.namespace.indexOf("owl") : p.apply(this, arguments)
                    };
                    t.event.special[h.name].owl = !0
               }
          } else h.type === A.Type.State && (this._states.tags[h.name] ? this._states.tags[h.name] = this._states.tags[h.name].concat(h.tags) : this._states.tags[h.name] = h.tags, this._states.tags[h.name] = t.grep(this._states.tags[h.name], t.proxy(function (u, y) {
               return t.inArray(u, this._states.tags[h.name]) ===
                    y
          }, this)))
     };
     A.prototype.suppress = function (h) {
          t.each(h, t.proxy(function (p, u) {
               this._supress[u] = !0
          }, this))
     };
     A.prototype.release = function (h) {
          t.each(h, t.proxy(function (p, u) {
               delete this._supress[u]
          }, this))
     };
     A.prototype.pointer = function (h) {
          var p = {
               x: null,
               y: null
          };
          return h = h.originalEvent || h || f.event, h = h.touches && h.touches.length ? h.touches[0] : h.changedTouches && h.changedTouches.length ? h.changedTouches[0] : h, h.pageX ? (p.x = h.pageX, p.y = h.pageY) : (p.x = h.clientX, p.y = h.clientY), p
     };
     A.prototype.isNumeric = function (h) {
          return !isNaN(parseFloat(h))
     };
     A.prototype.difference = function (h, p) {
          return {
               x: h.x - p.x,
               y: h.y - p.y
          }
     };
     t.fn.owlCarousel = function (h) {
          var p = Array.prototype.slice.call(arguments, 1);
          return this.each(function () {
               var u = t(this),
                    y = u.data("owl.carousel");
               y || (y = new A(this, "object" == typeof h && h), u.data("owl.carousel", y), t.each("next prev to destroy refresh replace add remove".split(" "), function (z, E) {
                    y.register({
                         type: A.Type.Event,
                         name: E
                    });
                    y.$element.on(E + ".owl.carousel.core", t.proxy(function (L) {
                         L.namespace && L.relatedTarget !== this && (this.suppress([E]),
                              y[E].apply(this, [].slice.call(arguments, 1)), this.release([E]))
                    }, y))
               }));
               "string" == typeof h && "_" !== h.charAt(0) && y[h].apply(y, p)
          })
     };
     t.fn.owlCarousel.Constructor = A
}(window.Zepto || window.jQuery, window, document);
(function (t, f, R, N) {
     var A = function (h) {
          this._core = h;
          this._visible = this._interval = null;
          this._handlers = {
               "initialized.owl.carousel": t.proxy(function (p) {
                    p.namespace && this._core.settings.autoRefresh && this.watch()
               }, this)
          };
          this._core.options = t.extend({}, A.Defaults, this._core.options);
          this._core.$element.on(this._handlers)
     };
     A.Defaults = {
          autoRefresh: !0,
          autoRefreshInterval: 500
     };
     A.prototype.watch = function () {
          this._interval || (this._visible = this._core.isVisible(), this._interval = f.setInterval(t.proxy(this.refresh,
               this), this._core.settings.autoRefreshInterval))
     };
     A.prototype.refresh = function () {
          this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
     };
     A.prototype.destroy = function () {
          var h, p;
          f.clearInterval(this._interval);
          for (h in this._handlers) this._core.$element.off(h, this._handlers[h]);
          for (p in Object.getOwnPropertyNames(this)) "function" != typeof this[p] && (this[p] = null)
     };
     t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = A
})(window.Zepto || window.jQuery, window, document);
(function (t, f, R, N) {
     var A = function (h) {
          this._core = h;
          this._loaded = [];
          this._handlers = {
               "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function (p) {
                    if (p.namespace && this._core.settings && this._core.settings.lazyLoad && (p.property && "position" == p.property.name || "initialized" == p.type)) {
                         var u = this._core.settings,
                              y = u.center && Math.ceil(u.items / 2) || u.items,
                              z = u.center && -1 * y || 0;
                         p = (p.property && p.property.value !== N ? p.property.value : this._core.current()) + z;
                         var E = this._core.clones().length,
                              L = t.proxy(function (S, V) {
                                   this.load(V)
                              }, this);
                         for (0 < u.lazyLoadEager && (y += u.lazyLoadEager, u.loop && (p -= u.lazyLoadEager, y++)); z++ < y;) this.load(E / 2 + this._core.relative(p)), E && t.each(this._core.clones(this._core.relative(p)), L), p++
                    }
               }, this)
          };
          this._core.options = t.extend({}, A.Defaults, this._core.options);
          this._core.$element.on(this._handlers)
     };
     A.Defaults = {
          lazyLoad: !1,
          lazyLoadEager: 0
     };
     A.prototype.load = function (h) {
          var p = (h = this._core.$stage.children().eq(h)) && h.find(".owl-lazy");
          !p || -1 < t.inArray(h.get(0), this._loaded) ||
               (p.each(t.proxy(function (u, y) {
                    var z, E = t(y),
                         L = 1 < f.devicePixelRatio && E.attr("data-src-retina") || E.attr("data-src") || E.attr("data-srcset");
                    this._core.trigger("load", {
                         element: E,
                         url: L
                    }, "lazy");
                    E.is("img") ? E.one("load.owl.lazy", t.proxy(function () {
                         E.css("opacity", 1);
                         this._core.trigger("loaded", {
                              element: E,
                              url: L
                         }, "lazy")
                    }, this)).attr("src", L) : E.is("source") ? E.one("load.owl.lazy", t.proxy(function () {
                         this._core.trigger("loaded", {
                              element: E,
                              url: L
                         }, "lazy")
                    }, this)).attr("srcset", L) : (z = new Image, z.onload = t.proxy(function () {
                         E.css({
                              "background-image": 'url("' +
                                   L + '")',
                              opacity: "1"
                         });
                         this._core.trigger("loaded", {
                              element: E,
                              url: L
                         }, "lazy")
                    }, this), z.src = L)
               }, this)), this._loaded.push(h.get(0)))
     };
     A.prototype.destroy = function () {
          var h, p;
          for (h in this.handlers) this._core.$element.off(h, this.handlers[h]);
          for (p in Object.getOwnPropertyNames(this)) "function" != typeof this[p] && (this[p] = null)
     };
     t.fn.owlCarousel.Constructor.Plugins.Lazy = A
})(window.Zepto || window.jQuery, window, document);
(function (t, f, R, N) {
     var A = function (h) {
          this._core = h;
          this._previousHeight = null;
          this._handlers = {
               "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (u) {
                    u.namespace && this._core.settings.autoHeight && this.update()
               }, this),
               "changed.owl.carousel": t.proxy(function (u) {
                    u.namespace && this._core.settings.autoHeight && "position" === u.property.name && this.update()
               }, this),
               "loaded.owl.lazy": t.proxy(function (u) {
                    u.namespace && this._core.settings.autoHeight && u.element.closest("." + this._core.settings.itemClass).index() ===
                         this._core.current() && this.update()
               }, this)
          };
          this._core.options = t.extend({}, A.Defaults, this._core.options);
          this._core.$element.on(this._handlers);
          this._intervalId = null;
          var p = this;
          t(f).on("load", function () {
               p._core.settings.autoHeight && p.update()
          });
          t(f).resize(function () {
               p._core.settings.autoHeight && (null != p._intervalId && clearTimeout(p._intervalId), p._intervalId = setTimeout(function () {
                    p.update()
               }, 250))
          })
     };
     A.Defaults = {
          autoHeight: !1,
          autoHeightClass: "owl-height"
     };
     A.prototype.update = function () {
          var h = this._core._current,
               p = h + this._core.settings.items,
               u = this._core.settings.lazyLoad;
          h = this._core.$stage.children().toArray().slice(h, p);
          var y = [];
          p = 0;
          t.each(h, function (z, E) {
               y.push(t(E).height())
          });
          p = Math.max.apply(null, y);
          1 >= p && u && this._previousHeight && (p = this._previousHeight);
          this._previousHeight = p;
          this._core.$stage.parent().height(p).addClass(this._core.settings.autoHeightClass)
     };
     A.prototype.destroy = function () {
          var h, p;
          for (h in this._handlers) this._core.$element.off(h, this._handlers[h]);
          for (p in Object.getOwnPropertyNames(this)) "function" !=
               typeof this[p] && (this[p] = null)
     };
     t.fn.owlCarousel.Constructor.Plugins.AutoHeight = A
})(window.Zepto || window.jQuery, window, document);
(function (t, f, R, N) {
     var A = function (h) {
          this._core = h;
          this._videos = {};
          this._playing = null;
          this._handlers = {
               "initialized.owl.carousel": t.proxy(function (p) {
                    p.namespace && this._core.register({
                         type: "state",
                         name: "playing",
                         tags: ["interacting"]
                    })
               }, this),
               "resize.owl.carousel": t.proxy(function (p) {
                    p.namespace && this._core.settings.video && this.isInFullScreen() && p.preventDefault()
               }, this),
               "refreshed.owl.carousel": t.proxy(function (p) {
                    p.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
               },
                    this),
               "changed.owl.carousel": t.proxy(function (p) {
                    p.namespace && "position" === p.property.name && this._playing && this.stop()
               }, this),
               "prepared.owl.carousel": t.proxy(function (p) {
                    if (p.namespace) {
                         var u = t(p.content).find(".owl-video");
                         u.length && (u.css("display", "none"), this.fetch(u, t(p.content)))
                    }
               }, this)
          };
          this._core.options = t.extend({}, A.Defaults, this._core.options);
          this._core.$element.on(this._handlers);
          this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function (p) {
               this.play(p)
          }, this))
     };
     A.Defaults = {
          video: !1,
          videoHeight: !1,
          videoWidth: !1
     };
     A.prototype.fetch = function (h, p) {
          h.attr("data-vimeo-id") || h.attr("data-vzaar-id");
          var u = h.attr("data-vimeo-id") || h.attr("data-youtube-id") || h.attr("data-vzaar-id"),
               y = h.attr("data-width") || this._core.settings.videoWidth,
               z = h.attr("data-height") || this._core.settings.videoHeight,
               E = h.attr("href");
          if (!E) throw Error("Missing video URL.");
          if (u = E.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/),
               -1 < u[3].indexOf("youtu")) var L = "youtube";
          else if (-1 < u[3].indexOf("vimeo")) L = "vimeo";
          else {
               if (!(-1 < u[3].indexOf("vzaar"))) throw Error("Video URL not supported.");
               L = "vzaar"
          }
          u = u[6];
          this._videos[E] = {
               type: L,
               id: u,
               width: y,
               height: z
          };
          p.attr("data-video", E);
          this.thumbnail(h, this._videos[E])
     };
     A.prototype.thumbnail = function (h, p) {
          var u, y, z = p.width && p.height ? "width:" + p.width + "px;height:" + p.height + "px;" : "",
               E = h.find("img"),
               L = "src",
               S = "",
               V = this._core.settings,
               Q = function (X) {
                    u = V.lazyLoad ? t("\x3cdiv/\x3e", {
                         class: "owl-video-tn " +
                              S,
                         srcType: X
                    }) : t("\x3cdiv/\x3e", {
                         class: "owl-video-tn",
                         style: "opacity:1;background-image:url(" + X + ")"
                    });
                    h.after(u);
                    h.after('\x3cdiv class\x3d"owl-video-play-icon"\x3e\x3c/div\x3e')
               };
          if (h.wrap(t("\x3cdiv/\x3e", {
               class: "owl-video-wrapper",
               style: z
          })), this._core.settings.lazyLoad && (L = "data-src", S = "owl-lazy"), E.length) return Q(E.attr(L)), E.remove(), !1;
          "youtube" === p.type ? (y = "//img.youtube.com/vi/" + p.id + "/hqdefault.jpg", Q(y)) : "vimeo" === p.type ? t.ajax({
               type: "GET",
               url: "//vimeo.com/api/v2/video/" + p.id + ".json",
               jsonp: "callback",
               dataType: "jsonp",
               success: function (X) {
                    y = X[0].thumbnail_large;
                    Q(y)
               }
          }) : "vzaar" === p.type && t.ajax({
               type: "GET",
               url: "//vzaar.com/api/videos/" + p.id + ".json",
               jsonp: "callback",
               dataType: "jsonp",
               success: function (X) {
                    y = X.framegrab_url;
                    Q(y)
               }
          })
     };
     A.prototype.stop = function () {
          this._core.trigger("stop", null, "video");
          this._playing.find(".owl-video-frame").remove();
          this._playing.removeClass("owl-video-playing");
          this._playing = null;
          this._core.leave("playing");
          this._core.trigger("stopped", null, "video")
     };
     A.prototype.play = function (h) {
          var p;
          h = t(h.target).closest("." + this._core.settings.itemClass);
          var u = this._videos[h.attr("data-video")],
               y = u.width || "100%",
               z = u.height || this._core.$stage.height();
          this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), h = this._core.items(this._core.relative(h.index())), this._core.reset(h.index()), p = t('\x3ciframe frameborder\x3d"0" allowfullscreen mozallowfullscreen webkitAllowFullScreen \x3e\x3c/iframe\x3e'), p.attr("height", z), p.attr("width", y), "youtube" === u.type ? p.attr("src",
               "//www.youtube.com/embed/" + u.id + "?autoplay\x3d1\x26rel\x3d0\x26v\x3d" + u.id) : "vimeo" === u.type ? p.attr("src", "//player.vimeo.com/video/" + u.id + "?autoplay\x3d1") : "vzaar" === u.type && p.attr("src", "//view.vzaar.com/" + u.id + "/player?autoplay\x3dtrue"), t(p).wrap('\x3cdiv class\x3d"owl-video-frame" /\x3e').insertAfter(h.find(".owl-video")), this._playing = h.addClass("owl-video-playing"))
     };
     A.prototype.isInFullScreen = function () {
          var h = R.fullscreenElement || R.mozFullScreenElement || R.webkitFullscreenElement;
          return h &&
               t(h).parent().hasClass("owl-video-frame")
     };
     A.prototype.destroy = function () {
          var h, p;
          this._core.$element.off("click.owl.video");
          for (h in this._handlers) this._core.$element.off(h, this._handlers[h]);
          for (p in Object.getOwnPropertyNames(this)) "function" != typeof this[p] && (this[p] = null)
     };
     t.fn.owlCarousel.Constructor.Plugins.Video = A
})(window.Zepto || window.jQuery, window, document);
(function (t, f, R, N) {
     var A = function (h) {
          this.core = h;
          this.core.options = t.extend({}, A.Defaults, this.core.options);
          this.swapping = !0;
          this.next = this.previous = N;
          this.handlers = {
               "change.owl.carousel": t.proxy(function (p) {
                    p.namespace && "position" == p.property.name && (this.previous = this.core.current(), this.next = p.property.value)
               }, this),
               "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (p) {
                    p.namespace && (this.swapping = "translated" == p.type)
               }, this),
               "translate.owl.carousel": t.proxy(function (p) {
                    p.namespace &&
                         this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
               }, this)
          };
          this.core.$element.on(this.handlers)
     };
     A.Defaults = {
          animateOut: !1,
          animateIn: !1
     };
     A.prototype.swap = function () {
          if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
               this.core.speed(0);
               var h, p = t.proxy(this.clear, this),
                    u = this.core.$stage.children().eq(this.previous),
                    y = this.core.$stage.children().eq(this.next),
                    z = this.core.settings.animateIn,
                    E = this.core.settings.animateOut;
               this.core.current() !==
                    this.previous && (E && (h = this.core.coordinates(this.previous) - this.core.coordinates(this.next), u.one(t.support.animation.end, p).css({
                         left: h + "px"
                    }).addClass("animated owl-animated-out").addClass(E)), z && y.one(t.support.animation.end, p).addClass("animated owl-animated-in").addClass(z))
          }
     };
     A.prototype.clear = function (h) {
          t(h.target).css({
               left: ""
          }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
          this.core.onTransitionEnd()
     };
     A.prototype.destroy = function () {
          var h, p;
          for (h in this.handlers) this.core.$element.off(h, this.handlers[h]);
          for (p in Object.getOwnPropertyNames(this)) "function" != typeof this[p] && (this[p] = null)
     };
     t.fn.owlCarousel.Constructor.Plugins.Animate = A
})(window.Zepto || window.jQuery, window, document);
(function (t, f, R, N) {
     var A = function (h) {
          this._core = h;
          this._call = null;
          this._timeout = this._time = 0;
          this._paused = !0;
          this._handlers = {
               "changed.owl.carousel": t.proxy(function (p) {
                    p.namespace && "settings" === p.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : p.namespace && "position" === p.property.name && this._paused && (this._time = 0)
               }, this),
               "initialized.owl.carousel": t.proxy(function (p) {
                    p.namespace && this._core.settings.autoplay && this.play()
               }, this),
               "play.owl.autoplay": t.proxy(function (p, u, y) {
                    p.namespace &&
                         this.play(u, y)
               }, this),
               "stop.owl.autoplay": t.proxy(function (p) {
                    p.namespace && this.stop()
               }, this),
               "mouseover.owl.autoplay": t.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
               }, this),
               "mouseleave.owl.autoplay": t.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
               }, this),
               "touchstart.owl.core": t.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
               }, this),
               "touchend.owl.core": t.proxy(function () {
                    this._core.settings.autoplayHoverPause &&
                         this.play()
               }, this)
          };
          this._core.$element.on(this._handlers);
          this._core.options = t.extend({}, A.Defaults, this._core.options)
     };
     A.Defaults = {
          autoplay: !1,
          autoplayTimeout: 5E3,
          autoplayHoverPause: !1,
          autoplaySpeed: !1
     };
     A.prototype._next = function (h) {
          this._call = f.setTimeout(t.proxy(this._next, this, h), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read());
          this._core.is("interacting") || R.hidden || this._core.next(h || this._core.settings.autoplaySpeed)
     };
     A.prototype.read = function () {
          return (new Date).getTime() -
               this._time
     };
     A.prototype.play = function (h, p) {
          this._core.is("rotating") || this._core.enter("rotating");
          h = h || this._core.settings.autoplayTimeout;
          var u = Math.min(this._time % (this._timeout || h), h);
          this._paused ? (this._time = this.read(), this._paused = !1) : f.clearTimeout(this._call);
          this._time += this.read() % h - u;
          this._timeout = h;
          this._call = f.setTimeout(t.proxy(this._next, this, p), h - u)
     };
     A.prototype.stop = function () {
          this._core.is("rotating") && (this._time = 0, this._paused = !0, f.clearTimeout(this._call), this._core.leave("rotating"))
     };
     A.prototype.pause = function () {
          this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, f.clearTimeout(this._call))
     };
     A.prototype.destroy = function () {
          var h, p;
          this.stop();
          for (h in this._handlers) this._core.$element.off(h, this._handlers[h]);
          for (p in Object.getOwnPropertyNames(this)) "function" != typeof this[p] && (this[p] = null)
     };
     t.fn.owlCarousel.Constructor.Plugins.autoplay = A
})(window.Zepto || window.jQuery, window, document);
(function (t, f, R, N) {
     var A = function (h) {
          this._core = h;
          this._initialized = !1;
          this._pages = [];
          this._controls = {};
          this._templates = [];
          this.$element = this._core.$element;
          this._overrides = {
               next: this._core.next,
               prev: this._core.prev,
               to: this._core.to
          };
          this._handlers = {
               "prepared.owl.carousel": t.proxy(function (p) {
                    p.namespace && this._core.settings.dotsData && this._templates.push('\x3cdiv class\x3d"' + this._core.settings.dotClass + '"\x3e' + t(p.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "\x3c/div\x3e")
               },
                    this),
               "added.owl.carousel": t.proxy(function (p) {
                    p.namespace && this._core.settings.dotsData && this._templates.splice(p.position, 0, this._templates.pop())
               }, this),
               "remove.owl.carousel": t.proxy(function (p) {
                    p.namespace && this._core.settings.dotsData && this._templates.splice(p.position, 1)
               }, this),
               "changed.owl.carousel": t.proxy(function (p) {
                    p.namespace && "position" == p.property.name && this.draw()
               }, this),
               "initialized.owl.carousel": t.proxy(function (p) {
                    p.namespace && !this._initialized && (this._core.trigger("initialize",
                         null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
               }, this),
               "refreshed.owl.carousel": t.proxy(function (p) {
                    p.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
               }, this)
          };
          this._core.options = t.extend({}, A.Defaults, this._core.options);
          this.$element.on(this._handlers)
     };
     A.Defaults = {
          nav: !1,
          navText: ['\x3cspan aria-label\x3d"Previous"\x3e\x26#x2039;\x3c/span\x3e',
               '\x3cspan aria-label\x3d"Next"\x3e\x26#x203a;\x3c/span\x3e'
          ],
          navSpeed: !1,
          navElement: 'button type\x3d"button" role\x3d"presentation"',
          navContainer: !1,
          navContainerClass: "owl-nav",
          navClass: ["owl-prev", "owl-next"],
          slideBy: 1,
          dotClass: "owl-dot",
          dotsClass: "owl-dots",
          dots: !0,
          dotsEach: !1,
          dotsData: !1,
          dotsSpeed: !1,
          dotsContainer: !1
     };
     A.prototype.initialize = function () {
          var h, p = this._core.settings;
          this._controls.$relative = (p.navContainer ? t(p.navContainer) : t("\x3cdiv\x3e").addClass(p.navContainerClass).appendTo(this.$element)).addClass("disabled");
          this._controls.$previous = t("\x3c" + p.navElement + "\x3e").addClass(p.navClass[0]).html(p.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function (u) {
               this.prev(p.navSpeed)
          }, this));
          this._controls.$next = t("\x3c" + p.navElement + "\x3e").addClass(p.navClass[1]).html(p.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function (u) {
               this.next(p.navSpeed)
          }, this));
          p.dotsData || (this._templates = [t('\x3cbutton role\x3d"button"\x3e').addClass(p.dotClass).append(t("\x3cspan\x3e")).prop("outerHTML")]);
          this._controls.$absolute = (p.dotsContainer ? t(p.dotsContainer) : t("\x3cdiv\x3e").addClass(p.dotsClass).appendTo(this.$element)).addClass("disabled");
          this._controls.$absolute.on("click", "button", t.proxy(function (u) {
               var y = t(u.target).parent().is(this._controls.$absolute) ? t(u.target).index() : t(u.target).parent().index();
               u.preventDefault();
               this.to(y, p.dotsSpeed)
          }, this));
          for (h in this._overrides) this._core[h] = t.proxy(this[h], this)
     };
     A.prototype.destroy = function () {
          var h, p, u, y;
          var z = this._core.settings;
          for (h in this._handlers) this.$element.off(h,
               this._handlers[h]);
          for (p in this._controls) "$relative" === p && z.navContainer ? this._controls[p].html("") : this._controls[p].remove();
          for (y in this.overides) this._core[y] = this._overrides[y];
          for (u in Object.getOwnPropertyNames(this)) "function" != typeof this[u] && (this[u] = null)
     };
     A.prototype.update = function () {
          var h, p, u = this._core.clones().length / 2,
               y = u + this._core.items().length,
               z = this._core.maximum(!0);
          var E = this._core.settings;
          var L = E.center || E.autoWidth || E.dotsData ? 1 : E.dotsEach || E.items;
          if ("page" !== E.slideBy &&
               (E.slideBy = Math.min(E.slideBy, E.items)), E.dots || "page" == E.slideBy)
               for (this._pages = [], E = u, p = h = 0; E < y; E++) {
                    if (h >= L || 0 === h) {
                         if (this._pages.push({
                              start: Math.min(z, E - u),
                              end: E - u + L - 1
                         }), Math.min(z, E - u) === z) break;
                         h = 0;
                         ++p
                    }
                    h += this._core.mergers(this._core.relative(E))
               }
     };
     A.prototype.draw = function () {
          var h, p = this._core.settings,
               u = this._core.items().length <= p.items,
               y = this._core.relative(this._core.current()),
               z = p.loop || p.rewind;
          this._controls.$relative.toggleClass("disabled", !p.nav || u);
          p.nav && (this._controls.$previous.toggleClass("disabled",
               !z && y <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !z && y >= this._core.maximum(!0)));
          this._controls.$absolute.toggleClass("disabled", !p.dots || u);
          p.dots && (h = this._pages.length - this._controls.$absolute.children().length, p.dotsData && 0 !== h ? this._controls.$absolute.html(this._templates.join("")) : 0 < h ? this._controls.$absolute.append(Array(h + 1).join(this._templates[0])) : 0 > h && this._controls.$absolute.children().slice(h).remove(), this._controls.$absolute.find(".active").removeClass("active"),
               this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
     };
     A.prototype.onTrigger = function (h) {
          var p = this._core.settings;
          h.page = {
               index: t.inArray(this.current(), this._pages),
               count: this._pages.length,
               size: p && (p.center || p.autoWidth || p.dotsData ? 1 : p.dotsEach || p.items)
          }
     };
     A.prototype.current = function () {
          var h = this._core.relative(this._core.current());
          return t.grep(this._pages, t.proxy(function (p, u) {
               return p.start <= h && p.end >= h
          }, this)).pop()
     };
     A.prototype.getPosition = function (h) {
          var p,
               u, y = this._core.settings;
          return "page" == y.slideBy ? (p = t.inArray(this.current(), this._pages), u = this._pages.length, h ? ++p : --p, p = this._pages[(p % u + u) % u].start) : (p = this._core.relative(this._core.current()), this._core.items(), h ? p += y.slideBy : p -= y.slideBy), p
     };
     A.prototype.next = function (h) {
          t.proxy(this._overrides.to, this._core)(this.getPosition(!0), h)
     };
     A.prototype.prev = function (h) {
          t.proxy(this._overrides.to, this._core)(this.getPosition(!1), h)
     };
     A.prototype.to = function (h, p, u) {
          var y;
          !u && this._pages.length ? (y = this._pages.length,
               t.proxy(this._overrides.to, this._core)(this._pages[(h % y + y) % y].start, p)) : t.proxy(this._overrides.to, this._core)(h, p)
     };
     t.fn.owlCarousel.Constructor.Plugins.Navigation = A
})(window.Zepto || window.jQuery, window, document);
(function (t, f, R, N) {
     var A = function (h) {
          this._core = h;
          this._hashes = {};
          this.$element = this._core.$element;
          this._handlers = {
               "initialized.owl.carousel": t.proxy(function (p) {
                    p.namespace && "URLHash" === this._core.settings.startPosition && t(f).trigger("hashchange.owl.navigation")
               }, this),
               "prepared.owl.carousel": t.proxy(function (p) {
                    if (p.namespace) {
                         var u = t(p.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                         u && (this._hashes[u] = p.content)
                    }
               }, this),
               "changed.owl.carousel": t.proxy(function (p) {
                    if (p.namespace &&
                         "position" === p.property.name) {
                         var u = this._core.items(this._core.relative(this._core.current()));
                         (p = t.map(this._hashes, function (y, z) {
                              return y === u ? z : null
                         }).join()) && f.location.hash.slice(1) !== p && (f.location.hash = p)
                    }
               }, this)
          };
          this._core.options = t.extend({}, A.Defaults, this._core.options);
          this.$element.on(this._handlers);
          t(f).on("hashchange.owl.navigation", t.proxy(function (p) {
               p = f.location.hash.substring(1);
               var u = this._core.$stage.children();
               p = this._hashes[p] && u.index(this._hashes[p]);
               p !== N && p !== this._core.current() &&
                    this._core.to(this._core.relative(p), !1, !0)
          }, this))
     };
     A.Defaults = {
          URLhashListener: !1
     };
     A.prototype.destroy = function () {
          var h, p;
          t(f).off("hashchange.owl.navigation");
          for (h in this._handlers) this._core.$element.off(h, this._handlers[h]);
          for (p in Object.getOwnPropertyNames(this)) "function" != typeof this[p] && (this[p] = null)
     };
     t.fn.owlCarousel.Constructor.Plugins.Hash = A
})(window.Zepto || window.jQuery, window, document);
(function (t, f, R, N) {
     function A(y, z) {
          var E = !1,
               L = y.charAt(0).toUpperCase() + y.slice(1);
          return t.each((y + " " + p.join(L + " ") + L).split(" "), function (S, V) {
               if (h[V] !== N) return E = !z || V, !1
          }), E
     }
     var h = t("\x3csupport\x3e").get(0).style,
          p = ["Webkit", "Moz", "O", "ms"];
     f = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd",
          transition: "transitionend"
     };
     R = {
          WebkitAnimation: "webkitAnimationEnd",
          MozAnimation: "animationend",
          OAnimation: "oAnimationEnd",
          animation: "animationend"
     };
     var u = {
          csstransforms: function () {
               return !!A("transform")
          },
          csstransforms3d: function () {
               return !!A("perspective")
          },
          csstransitions: function () {
               return !!A("transition")
          },
          cssanimations: function () {
               return !!A("animation")
          }
     };
     u.csstransitions() && (t.support.transition = new String(A("transition", !0)), t.support.transition.end = f[t.support.transition]);
     u.cssanimations() && (t.support.animation = new String(A("animation", !0)), t.support.animation.end = R[t.support.animation]);
     u.csstransforms() && (t.support.transform = new String(A("transform",
          !0)), t.support.transform3d = u.csstransforms3d())
})(window.Zepto || window.jQuery, window, document);
$(document).ready(function () {
     function t(y) {
          $("#videoModal").modal("show");
          $("#videoModal").on("shown.bs.modal", function (z) {
               $("#video").attr("src", "https://www.youtube.com/embed/" + y + "?autoplay\x3d1\x26showinfo\x3d0\x26modestbranding\x3d1\x26rel\x3d0")
          })
     }
     function f() {
          var y = $(".video-tiles .owl-carousel");
          y.removeClass("row");
          y.owlCarousel({
               margin: 30,
               nav: !0,
               dots: !0,
               responsiveClass: !0,
               navText: ["\x3cspan aria-label\x3d'Previous' class\x3d'sr-only'\x3ePrevious\x3c/span\x3e", "\x3cspan aria-label\x3d'Next' class\x3d'sr-only'\x3eNext\x3c/span\x3e"],
               items: 1
          });
          var z = y.find(".card-image").outerHeight() / 2;
          y.find(".owl-prev, .owl-next").css({
               top: z
          })
     }
     function R() {
          var y = $(".video-tiles .owl-carousel");
          y.trigger("destroy.owl.carousel");
          y.addClass("row")
     }
     function N() {
          var y = $(".four-up-stats .owl-carousel");
          y.removeClass("row");
          y.owlCarousel({
               margin: 30,
               nav: !0,
               dots: !0,
               responsiveClass: !0,
               navText: ["\x3cspan aria-label\x3d'Previous' class\x3d'sr-only'\x3ePrevious\x3c/span\x3e", "\x3cspan aria-label\x3d'Next' class\x3d'sr-only'\x3eNext\x3c/span\x3e"],
               items: 1
          })
     }
     function A() {
          var y = $(".four-up-stats .owl-carousel");
          y.trigger("destroy.owl.carousel");
          y.addClass("row")
     }
     $(".main-nav .dropdown").hover(function () {
          var y = -1 * $(this).offset().left,
               z = $(window).width();
          $(this).find(".backing").css({
               left: y,
               width: z
          })
     });
     $(window).resize(function () {
          $(".backing").removeAttr("style")
     });
     $(".main-nav .dropdown ul").each(function () {
          var y = $(this).find("\x3e li").length;
          5 < y && 10 >= y ? $(this).addClass("two-col") : 10 < y && $(this).addClass("three-col")
     });
     $(".main-nav .dropdown .expand").on("click",
          function () {
               $(this).hasClass("fa-minus") ? $(this).removeClass("fa-minus").addClass("fa-plus") : ($(".main-nav .dropdown .expand.fa-minus").removeClass("fa-minus").addClass("fa-plus"), $(".main-nav .dropdown .collapse").collapse("hide"), $(this).removeClass("fa-plus").addClass("fa-minus"))
          });
     $(".three-up-tiles .owl-carousel").owlCarousel({
          margin: 30,
          nav: !0,
          dots: !1,
          responsiveClass: !0,
          navText: ["\x3cspan aria-label\x3d'Previous' class\x3d'sr-only'\x3ePrevious\x3c/span\x3e", "\x3cspan aria-label\x3d'Next' class\x3d'sr-only'\x3eNext\x3c/span\x3e"],
          responsive: {
               0: {
                    items: 1
               },
               768: {
                    items: 3
               }
          }
     });
     $(".video-link").click(function (y) {
          y.preventDefault();
          y = $(this).attr("href").match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/);
          t(y && 11 == y[7].length ? y[7] : !1)
     });
     $("#videoModal").on("hide.bs.modal", function (y) {
          $("#video").attr("src", "")
     });
     window.addEventListener("load", function () {
          var y = document.getElementsByClassName("needs-validation");
          Array.prototype.filter.call(y, function (z) {
               z.addEventListener("submit", function (E) {
                    !1 === z.checkValidity() &&
                         (E.preventDefault(), E.stopPropagation());
                    z.classList.add("was-validated")
               }, !1)
          })
     }, !1);
     $("select.form-control").on("focus focusout change", function (y) {
          switch (y.type) {
               case "focus":
                    $(this).addClass("open");
                    break;
               case "focusout":
               case "change":
                    $(this).removeClass("open")
          }
     });
     $(document).keyup(function (y) {
          27 == y.keyCode && $("select.form-control").removeClass("open")
     });
     $("main table").each(function () {
          $(this).addClass("table");
          $(this).wrap("\x3cdiv class\x3d'table-responsive'\x3e\x3c/div\x3e")
     });
     var h = window.location.hash;
     h && $('ul.nav a[href\x3d"' + h + '"]').tab("show");
     $(".nav-tabs a").click(function (y) {
          $(this).tab("show");
          y = $("body").scrollTop() || $("html").scrollTop();
          window.location.hash = this.hash;
          $("html,body").scrollTop(y)
     });
     $(".nav-tabs").each(function (y) {
          5 < $(this).find("li").length && $(this).closest(".horizontal-nav").addClass("long")
     });
     $(".share").popover();
     $(".share").on("show.bs.popover", function () {
          $(this).popover("update")
     });
     $(".share").on("shown.bs.popover", function () {
          window.__sharethis__.initialize();
          $this =
               $(this);
          $(this).popover("update");
          setTimeout(function () {
               $this.popover("update")
          }, 100)
     });
     768 > $(window).width() ? f() : R();
     var p;
     $(window).on("resize", function (y) {
          clearTimeout(p);
          p = setTimeout(function () {
               768 > $(window).width() ? f() : R()
          }, 250)
     });
     768 > $(window).width() ? N() : A();
     var u;
     $(window).on("resize", function (y) {
          clearTimeout(u);
          u = setTimeout(function () {
               768 > $(window).width() ? N() : A()
          }, 250)
     })
});
$(document).ready(function () {
     $("form-component-sfdc form button[type\x3d'SUBMIT']").click(function (R) {
          R.preventDefault();
          $(".form-component-sfdc .btn.btn-go").click()
     });
     $("input[id\x3dreferrerUrl]").attr("value", document.referrer);
     var t = new Date,
          f = t.toDateString();
     t = t.toLocaleTimeString();
     f = f + " " + t;
     $("input[id\x3dTimeStamp]").attr("value", f);
     $("input[id\x3dWebpageURL]").attr("value", window.location.href);
     $("input[id\x3dquoteURL]").attr("value", document.referrer);
     (f = $(".form-component-sfdc input[name\x3d'thank-you-url']").val()) &&
          !f.includes(".html") && (f = $("input[name\x3d'thank-you-url']").val() + ".html", $("input[name\x3d'thank-you-url']").attr("value", f));
     (f = $(".form-component-sfdc input[name\x3d'error-url']").val()) && !f.includes(".html") && (f = $("input[name\x3d'error-url']").val() + ".html", $("input[name\x3d'error-url']").attr("value", f));
     $('a[href\x3d"/#backlink"]').click(function (R) {
          R.preventDefault();
          window.history.go(-1)
     });
     $(function () {
          var R = $(".checkbox-section.required :checkbox[required]");
          R.change(function () {
               R.is(":checked") ?
                    R.removeAttr("required") : R.attr("required", "required")
          });
          var N = $(".rad-section.required :radio[required]");
          N.change(function () {
               N.is(":checked") ? N.removeAttr("required") : N.attr("required", "required")
          })
     });
     $('.form-component-sfdc option[value\x3d"/#droprequired"]').attr("disabled", "disabled");
     $('.form-component-sfdc option[value\x3d"/#droprequired"]').parent().attr("required", "required");
     $('.form-component-sfdc option[value\x3d"/#droprequired"]').val("");
     $("input[type\x3d'checkbox'][name\x3d'confirm']").attr("required",
          "required");
     $("input[type\x3d'checkbox'][name\x3d'confirm']").closest("div.form-group").find("legend.required").addClass("confirm-legend");
     $(".form-component-sfdc .btn.btn-go").click(function (R) {
          var N = !0;
          $(".form-component-sfdc form .form-group").find("input, select, textarea").each(function () {
               if (!$(this).prop("required") || "" != $(this).val() && null != $(this).val()) N = !0;
               else return N = !1;
               if (0 < $(".checkbox-section.required :checkbox[required]").length) return N = !1;
               N = !0;
               "email" == $(this).attr("type") && (N =
                    /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val()));
               N ? ($(this).parent(".form-group").removeClass("has-error"), $(this).parent().find(".help-block").text("")) : ($(this).parent(".form-group").addClass("has-error"), "" != $(this).parent(".form-group").attr("data-desc") ? $(this).parent().find(".help-block").text($(this).parent(".form-group").attr("data-desc")) : $(this).parent().find(".help-block").text("Please enter valid input"));
               1 == $("input[type\x3d'checkbox'][name\x3d'confirm']").length &&
                    (0 == $("input[type\x3d'checkbox'][name\x3d'confirm']").prop("checked") ? ($("input[type\x3d'checkbox'][name\x3d'confirm']").closest("div.form-group").find("label").addClass("error"), $("input[type\x3d'checkbox'][name\x3d'confirm']").closest("div.form-group").find("legend.required").addClass("error"), N = !1) : ($("input[type\x3d'checkbox'][name\x3d'confirm']").closest("div.form-group").find("label").removeClass("error"), $("input[type\x3d'checkbox'][name\x3d'confirm']").closest("div.form-group").find("legend.required").removeClass("error")));
               return N
          });
          0 < $(".subscription.form-component-sfdc .form-group").length && (N ? ($("#subscription-status").removeClass("success", "error"), $("#subscription-status").html(""), $(".subscription-btn .btn.btn-go").prop("disabled", !0), $(".subscription-btn .btn.btn-go").addClass("disabled")) : ($("#subscription-status").show(), $("#subscription-status").removeClass("success", "error"), $("#subscription-status").addClass("error"), $("#subscription-status").html("Please enter a valid Email address")));
          N && (R.preventDefault(),
               grecaptcha.ready(function () {
                    grecaptcha.execute()
               }))
     })
});
function onFormSubmit(t) {
     var f = [];
     $(".form-component-sfdc form").find("input, select, textarea").each(function () {
          if ("radio" != $(this).attr("type") && "checkbox" != $(this).attr("type")) {
               var A = $(this).attr("data-et-attribute");
               "undefined" == typeof $(this).attr("data-et-attribute") && (A = "");
               var h = $(this).attr("placeholder");
               "undefined" == typeof $(this).attr("placeholder") && (h = "");
               var p = $(this).val();
               "undefined" == typeof $(this).val() && (p = "");
               var u = !1;
               "undefined" !== typeof $(this).attr("data-email") && (u = !0)
          } else $(this).is(":checked") &&
               (A = $(this).attr("data-et-attribute"), "undefined" == typeof $(this).attr("data-et-attribute") && (A = ""), h = $(this).attr("placeholder"), "undefined" == typeof $(this).attr("placeholder") && (h = ""), p = $(this).val(), "undefined" == typeof $(this).val() && (p = ""), u = !1, "undefined" !== typeof $(this).attr("data-email") && (u = !0));
          A && (A = {
               Name: A,
               Value: p,
               Placeholder: h,
               IsEmail: u
          }, f.push(A))
     });
     var R = {};
     R.jsonData = f;
     R.grecaptcharesponse = t;
     var N = $(".form-component-sfdc").hasClass("subscription");
     N || ($(".form-component-sfdc .btn.btn-go").prop("disabled",
          !0), $(".form-component-sfdc .btn.btn-go").addClass("disabled"));
     $.ajax({
          type: "POST",
          url: "/bin/aem-chubb-global/static/email-api",
          data: {
               apiData: JSON.stringify(R),
               formType: "COMBINED"
          },
          success: function (A, h, p) {
               console.log("Sending email!");
               console.log("Response status: " + p.status);
               "undefined" !== typeof $("#eagentPage").val() ? (console.log("Sending data to e-agent"), $.ajax({
                    type: "POST",
                    url: "/bin/combined/azure-post",
                    data: {
                         apiData: JSON.stringify(R)
                    },
                    success: function (u) {
                         console.log("Response from Azure received");
                         console.log(u);
                         N || ($(".form-component-sfdc .btn.btn-go").prop("disabled", !1), $(".form-component-sfdc .btn.btn-go").removeClass("disabled"));
                         window.location = encodeURI($("input[id\x3d'ThankYouPage']").val() + ".html?formName\x3d" + $("input[name\x3d'formName']").val() + "\x26formType\x3d" + $("input[name\x3d'formType']").val() + "\x26formSubmitted\x3d1")
                    },
                    error: function (u) {
                         window.location = encodeURI($("input[id\x3d'ErrorPage']").val() + ".html?formName\x3d" + $("input[name\x3d'formName']").val() + "\x26formType\x3d" +
                              $("input[name\x3d'formType']").val() + "\x26formSubmitted\x3d2")
                    }
               })) : (console.log("Not a US-\x3een / US-\x3ees e-agent form, leads wont be sent to e-agent database. "), window.location = encodeURI($("input[id\x3d'ThankYouPage']").val() + ".html?formName\x3d" + $("input[name\x3d'formName']").val() + "\x26formType\x3d" + $("input[name\x3d'formType']").val() + "\x26formSubmitted\x3d1"));
               A && (1 == $(".contact-form.success").length ? $(".contact-form.success").show(function () {
                    var u = $("html,body"),
                         y = $(".contact-form.success");
                    u.animate({
                         scrollTop: y.offset().top,
                         scrollLeft: 0
                    }, 300);
                    $("#contact-us").hide();
                    u = {
                         event: "formStep",
                         formName: $("input[name\x3d'formName']").val(),
                         formStepName: "Submit",
                         formStepNumber: 2,
                         formComplete: !0,
                         eventCallback: function () {
                              console.log("Callback FormSubmit: Datalayer Push Complete")
                         }
                    };
                    trackEvent(u)
               }) : 0 < $(".subscription.form-component-sfdc .form-group").length ? ($(".subscription-btn .btn.btn-go").removeClass("disabled"), $(".subscription-btn .btn.btn-go").prop("disabled", !1), $("#subscription-success-status").show(),
                    $("#subscription-success-status").html($("input[name\x3d'success-message']").val()), setTimeout(function () {
                         $("#subscription-success-status").hide()
                    }, 1E4)) : window.location = $("input[name\x3d'thank-you-url']").val() + "?formName\x3d" + $("input[name\x3d'formName']").val() + "\x26formSubmitted\x3d1")
          },
          error: function (A) {
               console.log(A);
               console.log("Error occured" + A);
               N || ($(".form-component-sfdc .btn.btn-go").prop("disabled", !1), $(".form-component-sfdc .btn.btn-go").removeClass("disabled"));
               window.location = encodeURI($("input[id\x3d'ErrorPage']").val() +
                    ".html?formName\x3d" + $("input[name\x3d'formName']").val() + "\x26formType\x3d" + $("input[name\x3d'formType']").val() + "\x26formSubmitted\x3d2");
               1 == $(".contact-form.failure").length ? $(".contact-form.failure").show(function () {
                    var h = $("html,body"),
                         p = $(".contact-form.failure");
                    h.animate({
                         scrollTop: p.offset().top,
                         scrollLeft: 0
                    }, 300);
                    $("#contact-us").hide()
               }) : 0 < $(".subscription.form-component-sfdc .form-group").length ? ($(".subscription-btn .btn.btn-go").prop("disabled", !1), $(".subscription-btn .btn.btn-go").removeClass("disabled"),
                    $("#subscription-success-status").show(), $("#subscription-success-status").html($("input[name\x3d'warn-message']").val()), setTimeout(function () {
                         $("#subscription-success-status").hide()
                    }, 1E4)) : window.location = $("input[name\x3d'error-url']").val()
          }
     });
     grecaptcha.reset()
}
function FormLoad(t, f) {
     trackEvent({
          event: "formStep",
          formName: t,
          formStepName: f,
          formStepNumber: 1,
          formComplete: !1,
          eventCallback: function () {
               console.log("Callback FormLoad: Datalayer Push Complete")
          }
     })
}
0 < $(".form-component-sfdc").length && FormLoad($("input[name\x3d'formName']").val(), $("input[name\x3d'formStepName']").val());
if (-1 != window.location.search.indexOf("formSubmitted") && -1 != window.location.search.indexOf("formName")) {
     var formtrackdata = {
          event: "formStep",
          formStepName: "Submit",
          formStepNumber: 2,
          formComplete: !0,
          eventCallback: function () {
               console.log("Callback FormSubmit: Datalayer Push Complete")
          }
     },
          urldata = window.location.search.substring(1).split("\x26"),
          k = 1,
          j = 1;
     $(urldata).each(function () {
          var t = this.split("\x3d");
          2 < k ? (formtrackdata["field" + j] = decodeURI(t[0]) + ":" + decodeURI(t[1]), j++) : formtrackdata[decodeURI(t[0])] =
               decodeURI(t[1]);
          k++
     });
     trackEvent(formtrackdata)
}
function trackEvent(t) {
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push(t);
     console.log(t)
}
$(document).on("change", ".form-control", function () {
     var t = $("#formName").val(),
          f = $("#formStepName").val();
     $(this).attr("data-fieldname") && ("zipCode" == $(this).attr("name") ? dataLayer.push({
          event: "formEvent",
          formName: t,
          formStepName: f,
          formEventName: $(this).attr("data-fieldname") + ": " + $(this).val()
     }) : dataLayer.push({
          event: "formEvent",
          formName: t,
          formStepName: f,
          formEventName: $(this).attr("data-fieldname")
     }));
     $(this).attr("data-ddlname") && dataLayer.push({
          event: "formEvent",
          formName: t,
          formStepName: f,
          formEventName: $(this).attr("data-ddlname") +
               ": " + $(this).val()
     })
});