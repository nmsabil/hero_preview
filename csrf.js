(function (c) {
     c.Granite = c.Granite || {};
     c.Granite.HTTP = c.Granite.HTTP || {};
     var f = null;
     c.Granite.HTTP.externalize = c.Granite.HTTP.externalize || function (g) {
          if (null === f) a: {
               var n = /^(?:http|https):\/\/[^/]+(\/.*)\/(?:etc\.clientlibs|etc(\/.*)*\/clientlibs|libs(\/.*)*\/clientlibs|apps(\/.*)*\/clientlibs|etc\/designs).*\.js(\?.*)?$/;
               try {
                    if (c.CQURLInfo) f = CQURLInfo.contextPath || "";
                    else {
                         for (var h = document.getElementsByTagName("script"), k = 0; k < h.length; k++) {
                              var l = n.exec(h[k].src);
                              if (l) {
                                   f = l[1];
                                   break a
                              }
                         }
                         f = ""
                    }
               } catch (p) { }
          }
          try {
               0 ===
                    g.indexOf("/") && f && 0 !== g.indexOf(f + "/") && (g = f + g)
          } catch (p) { }
          return g
     }
})(this);
(function (c) {
     window.Granite.csrf || (window.Granite.csrf = c(window.Granite.HTTP))
})(function (c) {
     function f() {
          this._handler = []
     }
     function g(a) {
          var b = "//" + document.location.host,
               d = document.location.protocol + b;
          return a === d || a.slice(0, d.length + 1) === d + "/" || a === b || a.slice(0, b.length + 1) === b + "/" || !/^(\/\/|http:|https:).*/.test(a)
     }
     function n(a) {
          window.console && console.warn("CSRF data not available;The data may be unavailable by design, such as during non-authenticated requests: " + a)
     }
     function h() {
          var a = new f;
          q =
               a;
          var b = new XMLHttpRequest;
          b.onreadystatechange = function () {
               if (4 === b.readyState) try {
                    e = JSON.parse(b.responseText).token, a.resolve(e)
               } catch (d) {
                    n(d), a.reject(b.responseText)
               }
          };
          b.open("GET", r, !0);
          b.send();
          return a
     }
     function k() {
          var a = new XMLHttpRequest;
          a.open("GET", r, !1);
          a.send();
          try {
               return e = JSON.parse(a.responseText).token
          } catch (b) {
               n(b)
          }
     }
     function l(a) {
          var b = a.getAttribute("action");
          "GET" === a.method.toUpperCase() || b && !g(b) || (e || k(), e && (b = a.querySelector('input[name\x3d":cq_csrf_token"]'), b || (b = document.createElement("input"),
               b.setAttribute("type", "hidden"), b.setAttribute("name", ":cq_csrf_token"), a.appendChild(b)), b.setAttribute("value", e)))
     }
     function p(a) {
          var b = function (a) {
               a = a.target;
               "FORM" === a.nodeName && l(a)
          };
          a.addEventListener ? a.addEventListener("submit", b, !0) : a.attachEvent && a.attachEvent("submit", b)
     }
     f.prototype = {
          then: function (a, b) {
               this._handler.push({
                    resolve: a,
                    reject: b
               })
          },
          resolve: function () {
               this._execute("resolve", arguments)
          },
          reject: function () {
               this._execute("reject", arguments)
          },
          _execute: function (a, b) {
               if (null === this._handler) throw Error("Promise already completed.");
               for (var d = 0, c = this._handler.length; d < c; d++) this._handler[d][a].apply(window, b);
               this.then = function (c, d) {
                    ("resolve" === a ? c : d).apply(window, b)
               };
               this._handler = null
          }
     };
     var r = c.externalize("/libs/granite/csrf/token.json"),
          q, e;
     p(document);
     var t = XMLHttpRequest.prototype.open;
     XMLHttpRequest.prototype.open = function (a, b, c) {
          "get" !== a.toLowerCase() && g(b) && (this._csrf = !0, this._async = c);
          return t.apply(this, arguments)
     };
     var m = XMLHttpRequest.prototype.send;
     XMLHttpRequest.prototype.send = function () {
          if (this._csrf)
               if (e) this.setRequestHeader("CSRF-Token",
                    e), m.apply(this, arguments);
               else if (!1 === this._async) k(), e && this.setRequestHeader("CSRF-Token", e), m.apply(this, arguments);
               else {
                    var a = this,
                         b = Array.prototype.slice.call(arguments);
                    q.then(function (c) {
                         a.setRequestHeader("CSRF-Token", c);
                         m.apply(a, b)
                    }, function () {
                         m.apply(a, b)
                    })
               } else m.apply(this, arguments)
     };
     var u = HTMLFormElement.prototype.submit;
     HTMLFormElement.prototype.submit = function () {
          l(this);
          return u.apply(this, arguments)
     };
     if (window.Node) {
          var v = Node.prototype.appendChild;
          Node.prototype.appendChild = function () {
               var a =
                    v.apply(this, arguments);
               if ("IFRAME" === a.nodeName) try {
                    a.contentWindow && !a._csrf && (a._csrf = !0, p(a.contentWindow.document))
               } catch (b) {
                    a.src && a.src.length && g(a.src) && window.console && console.error("Unable to attach CSRF token to an iframe element on the same origin")
               }
               return a
          }
     }
     h();
     setInterval(function () {
          h()
     }, 3E5);
     return {
          initialised: !1,
          refreshToken: h,
          _clearToken: function () {
               e = void 0;
               h()
          }
     }
});