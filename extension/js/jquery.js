(function (I, z) {
  function qb(a) {
    var b = (Ba[a] = {}),
      d,
      e;
    a = a.split(/\s+/);
    d = 0;
    for (e = a.length; d < e; d++) b[a[d]] = true;
    return b;
  }

  function Ca(a, b, d) {
    if (d === z && a.nodeType === 1) {
      d = "data-" + b.replace(rb, "-$1").toLowerCase();
      d = a.getAttribute(d);
      if (typeof d === "string") {
        try {
          d = d === "true" ? true : d === "false" ? false : d === "null" ? null : c.isNumeric(d) ? parseFloat(d) : sb.test(d) ? c.parseJSON(d) : d;
        } catch (e) {}
        c.data(a, b, d);
      } else d = z;
    }
    return d;
  }

  function qa(a) {
    for (var b in a) if (!(b === "data" && c.isEmptyObject(a[b]))) if (b !== "toJSON") return false;
    return true;
  }

  function Da(a, b, d) {
    var e = b + "defer",
      f = b + "queue",
      g = b + "mark",
      i = c._data(a, e);
    if (i && (d === "queue" || !c._data(a, f)) && (d === "mark" || !c._data(a, g)))
      setTimeout(function () {
        if (!c._data(a, f) && !c._data(a, g)) {
          c.removeData(a, e, true);
          i.fire();
        }
      }, 0);
  }

  function $() {
    return false;
  }

  function ha() {
    return true;
  }

  function Ea(a, b, d) {
    b = b || 0;
    if (c.isFunction(b))
      return c.grep(a, function (f, g) {
        return !!b.call(f, g, f) === d;
      });
    else if (b.nodeType)
      return c.grep(a, function (f) {
        return (f === b) === d;
      });
    else if (typeof b === "string") {
      var e = c.grep(a, function (f) {
        return f.nodeType === 1;
      });
      if (tb.test(b)) return c.filter(b, e, !d);
      else b = c.filter(b, e);
    }
    return c.grep(a, function (f) {
      return c.inArray(f, b) >= 0 === d;
    });
  }

  function Fa(a) {
    var b = Ga.split("|");
    a = a.createDocumentFragment();
    if (a.createElement) for (; b.length; ) a.createElement(b.pop());
    return a;
  }

  function Ha(a, b) {
    if (!(b.nodeType !== 1 || !c.hasData(a))) {
      var d, e, f;
      e = c._data(a);
      var g = c._data(b, e),
        i = e.events;
      if (i) {
        delete g.handle;
        g.events = {};
        for (d in i) {
          e = 0;
          for (f = i[d].length; e < f; e++) c.event.add(b, d + (i[d][e].namespace ? "." : "") + i[d][e].namespace, i[d][e], i[d][e].data);
        }
      }
      if (g.data) g.data = c.extend({}, g.data);
    }
  }

  function Ia(a, b) {
    var d;
    if (b.nodeType === 1) {
      b.clearAttributes && b.clearAttributes();
      b.mergeAttributes && b.mergeAttributes(a);
      d = b.nodeName.toLowerCase();
      if (d === "object") b.outerHTML = a.outerHTML;
      else if (d === "input" && (a.type === "checkbox" || a.type === "radio")) {
        if (a.checked) b.defaultChecked = b.checked = a.checked;
        if (b.value !== a.value) b.value = a.value;
      } else if (d === "option") b.selected = a.defaultSelected;
      else if (d === "input" || d === "textarea") b.defaultValue = a.defaultValue;
      b.removeAttribute(c.expando);
    }
  }

  function ia(a) {
    return typeof a.getElementsByTagName !== "undefined"
      ? a.getElementsByTagName("*")
      : typeof a.querySelectorAll !== "undefined"
      ? a.querySelectorAll("*")
      : [];
  }

  function Ja(a) {
    if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked;
  }

  function Ka(a) {
    var b = (a.nodeName || "").toLowerCase();
    if (b === "input") Ja(a);
    else b !== "script" && typeof a.getElementsByTagName !== "undefined" && c.grep(a.getElementsByTagName("input"), Ja);
  }

  function ub(a, b) {
    b.src
      ? c.ajax({
          url: b.src,
          async: false,
          dataType: "script",
        })
      : c.globalEval((b.text || b.textContent || b.innerHTML || "").replace(vb, "/*$0*/"));
    b.parentNode && b.parentNode.removeChild(b);
  }

  function La(a, b, d) {
    var e = b === "width" ? a.offsetWidth : a.offsetHeight,
      f = b === "width" ? wb : xb,
      g = 0,
      i = f.length;
    if (e > 0) {
      if (d !== "border")
        for (; g < i; g++) {
          d || (e -= parseFloat(c.css(a, "padding" + f[g])) || 0);
          if (d === "margin") e += parseFloat(c.css(a, d + f[g])) || 0;
          else e -= parseFloat(c.css(a, "border" + f[g] + "Width")) || 0;
        }
      return e + "px";
    }
    e = aa(a, b, b);
    if (e < 0 || e == null) e = a.style[b] || 0;
    e = parseFloat(e) || 0;
    if (d)
      for (; g < i; g++) {
        e += parseFloat(c.css(a, "padding" + f[g])) || 0;
        if (d !== "padding") e += parseFloat(c.css(a, "border" + f[g] + "Width")) || 0;
        if (d === "margin") e += parseFloat(c.css(a, d + f[g])) || 0;
      }
    return e + "px";
  }

  function Ma(a) {
    return function (b, d) {
      if (typeof b !== "string") {
        d = b;
        b = "*";
      }
      if (c.isFunction(d))
        for (var e = b.toLowerCase().split(Na), f = 0, g = e.length, i, l; f < g; f++) {
          i = e[f];
          if ((l = /^\+/.test(i))) i = i.substr(1) || "*";
          i = a[i] = a[i] || [];
          i[l ? "unshift" : "push"](d);
        }
    };
  }

  function ja(a, b, d, e, f, g) {
    f = f || b.dataTypes[0];
    g = g || {};
    g[f] = true;
    f = a[f];
    for (var i = 0, l = f ? f.length : 0, m = a === ra, p; i < l && (m || !p); i++) {
      p = f[i](b, d, e);
      if (typeof p === "string")
        if (!m || g[p]) p = z;
        else {
          b.dataTypes.unshift(p);
          p = ja(a, b, d, e, p, g);
        }
    }
    if ((m || !p) && !g["*"]) p = ja(a, b, d, e, "*", g);
    return p;
  }

  function Oa(a, b) {
    var d,
      e,
      f = c.ajaxSettings.flatOptions || {};
    for (d in b) if (b[d] !== z) (f[d] ? a : e || (e = {}))[d] = b[d];
    e && c.extend(true, a, e);
  }

  function sa(a, b, d, e) {
    if (c.isArray(b))
      c.each(b, function (g, i) {
        d || yb.test(a) ? e(a, i) : sa(a + "[" + (typeof i === "object" || c.isArray(i) ? g : "") + "]", i, d, e);
      });
    else if (!d && b != null && typeof b === "object") for (var f in b) sa(a + "[" + f + "]", b[f], d, e);
    else e(a, b);
  }

  function Pa() {
    try {
      return new I.XMLHttpRequest();
    } catch (a) {}
  }

  function Qa() {
    setTimeout(zb, 0);
    return (ka = c.now());
  }

  function zb() {
    ka = z;
  }

  function ba(a, b) {
    var d = {};
    c.each(Ra.concat.apply([], Ra.slice(0, b)), function () {
      d[this] = a;
    });
    return d;
  }

  function Sa(a) {
    if (!ta[a]) {
      var b = B.body,
        d = c("<" + a + ">").appendTo(b),
        e = d.css("display");
      d.remove();
      if (e === "none" || e === "") {
        if (!R) {
          R = B.createElement("iframe");
          R.frameBorder = R.width = R.height = 0;
        }
        b.appendChild(R);
        if (!ca || !R.createElement) {
          ca = (R.contentWindow || R.contentDocument).document;
          ca.write((B.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>");
          ca.close();
        }
        d = ca.createElement(a);
        ca.body.appendChild(d);
        e = c.css(d, "display");
        b.removeChild(R);
      }
      ta[a] = e;
    }
    return ta[a];
  }

  function ua(a) {
    return c.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false;
  }
  var B = I.document,
    Ab = I.navigator,
    Bb = I.location,
    c = (function () {
      function a() {
        if (!b.isReady) {
          try {
            B.documentElement.doScroll("left");
          } catch (k) {
            setTimeout(a, 1);
            return;
          }
          b.ready();
        }
      }
      var b = function (k, t) {
          return new b.fn.init(k, t, f);
        },
        d = I.jQuery,
        e = I.$,
        f,
        g = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        i = /\S/,
        l = /^\s+/,
        m = /\s+$/,
        p = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        v = /^[\],:{}\s]*$/,
        s = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        A = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        w = /(?:^|:|,)(?:\s*\[)+/g,
        F = /(webkit)[ \/]([\w.]+)/,
        J = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        M = /(msie) ([\w.]+)/,
        K = /(mozilla)(?:.*? rv:([\w.]+))?/,
        T = /-([a-z]|[0-9])/gi,
        O = /^-ms-/,
        G = function (k, t) {
          return (t + "").toUpperCase();
        },
        Q = Ab.userAgent,
        h,
        j,
        n = Object.prototype.toString,
        o = Object.prototype.hasOwnProperty,
        q = Array.prototype.push,
        r = Array.prototype.slice,
        C = String.prototype.trim,
        x = Array.prototype.indexOf,
        H = {};
      b.fn = b.prototype = {
        constructor: b,
        init: function (k, t, y) {
          var u;
          if (!k) return this;
          if (k.nodeType) {
            this.context = this[0] = k;
            this.length = 1;
            return this;
          }
          if (k === "body" && !t && B.body) {
            this.context = B;
            this[0] = B.body;
            this.selector = k;
            this.length = 1;
            return this;
          }
          if (typeof k === "string")
            if ((u = k.charAt(0) === "<" && k.charAt(k.length - 1) === ">" && k.length >= 3 ? [null, k, null] : g.exec(k)) && (u[1] || !t))
              if (u[1]) {
                y = (t = t instanceof b ? t[0] : t) ? t.ownerDocument || t : B;
                if ((k = p.exec(k)))
                  if (b.isPlainObject(t)) {
                    k = [B.createElement(k[1])];
                    b.fn.attr.call(k, t, true);
                  } else k = [y.createElement(k[1])];
                else {
                  k = b.buildFragment([u[1]], [y]);
                  k = (k.cacheable ? b.clone(k.fragment) : k.fragment).childNodes;
                }
                return b.merge(this, k);
              } else {
                if ((t = B.getElementById(u[2])) && t.parentNode) {
                  if (t.id !== u[2]) return y.find(k);
                  this.length = 1;
                  this[0] = t;
                }
                this.context = B;
                this.selector = k;
                return this;
              }
            else return !t || t.jquery ? (t || y).find(k) : this.constructor(t).find(k);
          else if (b.isFunction(k)) return y.ready(k);
          if (k.selector !== z) {
            this.selector = k.selector;
            this.context = k.context;
          }
          return b.makeArray(k, this);
        },
        selector: "",
        jquery: "1.7.1",
        length: 0,
        size: function () {
          return this.length;
        },
        toArray: function () {
          return r.call(this, 0);
        },
        get: function (k) {
          return k == null ? this.toArray() : k < 0 ? this[this.length + k] : this[k];
        },
        pushStack: function (k, t, y) {
          var u = this.constructor();
          b.isArray(k) ? q.apply(u, k) : b.merge(u, k);
          u.prevObject = this;
          u.context = this.context;
          if (t === "find") u.selector = this.selector + (this.selector ? " " : "") + y;
          else if (t) u.selector = this.selector + "." + t + "(" + y + ")";
          return u;
        },
        each: function (k, t) {
          return b.each(this, k, t);
        },
        ready: function (k) {
          b.bindReady();
          h.add(k);
          return this;
        },
        eq: function (k) {
          k = +k;
          return k === -1 ? this.slice(k) : this.slice(k, k + 1);
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        slice: function () {
          return this.pushStack(r.apply(this, arguments), "slice", r.call(arguments).join(","));
        },
        map: function (k) {
          return this.pushStack(
            b.map(this, function (t, y) {
              return k.call(t, y, t);
            })
          );
        },
        end: function () {
          return this.prevObject || this.constructor(null);
        },
        push: q,
        sort: [].sort,
        splice: [].splice,
      };
      b.fn.init.prototype = b.fn;
      b.extend = b.fn.extend = function () {
        var k,
          t,
          y,
          u,
          E,
          D = arguments[0] || {},
          L = 1,
          N = arguments.length,
          W = false;
        if (typeof D === "boolean") {
          W = D;
          D = arguments[1] || {};
          L = 2;
        }
        if (typeof D !== "object" && !b.isFunction(D)) D = {};
        if (N === L) {
          D = this;
          --L;
        }
        for (; L < N; L++)
          if ((k = arguments[L]) != null)
            for (t in k) {
              y = D[t];
              u = k[t];
              if (D !== u)
                if (W && u && (b.isPlainObject(u) || (E = b.isArray(u)))) {
                  if (E) {
                    E = false;
                    y = y && b.isArray(y) ? y : [];
                  } else y = y && b.isPlainObject(y) ? y : {};
                  D[t] = b.extend(W, y, u);
                } else if (u !== z) D[t] = u;
            }
        return D;
      };
      b.extend({
        noConflict: function (k) {
          if (I.$ === b) I.$ = e;
          if (k && I.jQuery === b) I.jQuery = d;
          return b;
        },
        isReady: false,
        readyWait: 1,
        holdReady: function (k) {
          if (k) b.readyWait++;
          else b.ready(true);
        },
        ready: function (k) {
          if ((k === true && !--b.readyWait) || (k !== true && !b.isReady)) {
            if (!B.body) return setTimeout(b.ready, 1);
            b.isReady = true;
            if (!(k !== true && --b.readyWait > 0)) {
              h.fireWith(B, [b]);
              b.fn.trigger && b(B).trigger("ready").off("ready");
            }
          }
        },
        bindReady: function () {
          if (!h) {
            h = b.Callbacks("once memory");
            if (B.readyState === "complete") return setTimeout(b.ready, 1);
            if (B.addEventListener) {
              B.addEventListener("DOMContentLoaded", j, false);
              I.addEventListener("load", b.ready, false);
            } else if (B.attachEvent) {
              B.attachEvent("onreadystatechange", j);
              I.attachEvent("onload", b.ready);
              var k = false;
              try {
                k = I.frameElement == null;
              } catch (t) {}
              B.documentElement.doScroll && k && a();
            }
          }
        },
        isFunction: function (k) {
          return b.type(k) === "function";
        },
        isArray:
          Array.isArray ||
          function (k) {
            return b.type(k) === "array";
          },
        isWindow: function (k) {
          return k && typeof k === "object" && "setInterval" in k;
        },
        isNumeric: function (k) {
          return !isNaN(parseFloat(k)) && isFinite(k);
        },
        type: function (k) {
          return k == null ? String(k) : H[n.call(k)] || "object";
        },
        isPlainObject: function (k) {
          if (!k || b.type(k) !== "object" || k.nodeType || b.isWindow(k)) return false;
          try {
            if (k.constructor && !o.call(k, "constructor") && !o.call(k.constructor.prototype, "isPrototypeOf")) return false;
          } catch (t) {
            return false;
          }
          var y;
          for (y in k);
          return y === z || o.call(k, y);
        },
        isEmptyObject: function (k) {
          for (var t in k) return false;
          return true;
        },
        error: function (k) {
          throw Error(k);
        },
        parseJSON: function (k) {
          if (typeof k !== "string" || !k) return null;
          k = b.trim(k);
          if (I.JSON && I.JSON.parse) return I.JSON.parse(k);
          if (v.test(k.replace(s, "@").replace(A, "]").replace(w, ""))) return new Function("return " + k)();
          b.error("Invalid JSON: " + k);
        },
        parseXML: function (k) {
          var t, y;
          try {
            if (I.DOMParser) {
              y = new DOMParser();
              t = y.parseFromString(k, "text/xml");
            } else {
              t = new ActiveXObject("Microsoft.XMLDOM");
              t.async = "false";
              t.loadXML(k);
            }
          } catch (u) {
            t = z;
          }
          if (!t || !t.documentElement || t.getElementsByTagName("parsererror").length) b.error("Invalid XML: " + k);
          return t;
        },
        noop: function () {},
        globalEval: function (k) {
          if (k && i.test(k))
            (
              I.execScript ||
              function (t) {
                I.eval.call(I, t);
              }
            )(k);
        },
        camelCase: function (k) {
          return k.replace(O, "ms-").replace(T, G);
        },
        nodeName: function (k, t) {
          return k.nodeName && k.nodeName.toUpperCase() === t.toUpperCase();
        },
        each: function (k, t, y) {
          var u,
            E = 0,
            D = k.length,
            L = D === z || b.isFunction(k);
          if (y)
            if (L)
              for (u in k) {
                if (t.apply(k[u], y) === false) break;
              }
            else
              for (; E < D; ) {
                if (t.apply(k[E++], y) === false) break;
              }
          else if (L)
            for (u in k) {
              if (t.call(k[u], u, k[u]) === false) break;
            }
          else for (; E < D; ) if (t.call(k[E], E, k[E++]) === false) break;
          return k;
        },
        trim: C
          ? function (k) {
              return k == null ? "" : C.call(k);
            }
          : function (k) {
              return k == null ? "" : k.toString().replace(l, "").replace(m, "");
            },
        makeArray: function (k, t) {
          var y = t || [];
          if (k != null) {
            var u = b.type(k);
            k.length == null || u === "string" || u === "function" || u === "regexp" || b.isWindow(k) ? q.call(y, k) : b.merge(y, k);
          }
          return y;
        },
        inArray: function (k, t, y) {
          var u;
          if (t) {
            if (x) return x.call(t, k, y);
            u = t.length;
            for (y = y ? (y < 0 ? Math.max(0, u + y) : y) : 0; y < u; y++) if (y in t && t[y] === k) return y;
          }
          return -1;
        },
        merge: function (k, t) {
          var y = k.length,
            u = 0;
          if (typeof t.length === "number") for (var E = t.length; u < E; u++) k[y++] = t[u];
          else for (; t[u] !== z; ) k[y++] = t[u++];
          k.length = y;
          return k;
        },
        grep: function (k, t, y) {
          var u = [],
            E;
          y = !!y;
          for (var D = 0, L = k.length; D < L; D++) {
            E = !!t(k[D], D);
            y !== E && u.push(k[D]);
          }
          return u;
        },
        map: function (k, t, y) {
          var u,
            E,
            D = [],
            L = 0,
            N = k.length;
          if (k instanceof b || (N !== z && typeof N === "number" && ((N > 0 && k[0] && k[N - 1]) || N === 0 || b.isArray(k))))
            for (; L < N; L++) {
              u = t(k[L], L, y);
              if (u != null) D[D.length] = u;
            }
          else
            for (E in k) {
              u = t(k[E], E, y);
              if (u != null) D[D.length] = u;
            }
          return D.concat.apply([], D);
        },
        guid: 1,
        proxy: function (k, t) {
          if (typeof t === "string") {
            var y = k[t];
            t = k;
            k = y;
          }
          if (!b.isFunction(k)) return z;
          var u = r.call(arguments, 2);
          y = function () {
            return k.apply(t, u.concat(r.call(arguments)));
          };
          y.guid = k.guid = k.guid || y.guid || b.guid++;
          return y;
        },
        access: function (k, t, y, u, E, D) {
          var L = k.length;
          if (typeof t === "object") {
            for (var N in t) b.access(k, N, t[N], u, E, y);
            return k;
          }
          if (y !== z) {
            u = !D && u && b.isFunction(y);
            for (N = 0; N < L; N++) E(k[N], t, u ? y.call(k[N], N, E(k[N], t)) : y, D);
            return k;
          }
          return L ? E(k[0], t) : z;
        },
        now: function () {
          return new Date().getTime();
        },
        uaMatch: function (k) {
          k = k.toLowerCase();
          k = F.exec(k) || J.exec(k) || M.exec(k) || (k.indexOf("compatible") < 0 && K.exec(k)) || [];
          return {
            browser: k[1] || "",
            version: k[2] || "0",
          };
        },
        sub: function () {
          function k(y, u) {
            return new k.fn.init(y, u);
          }
          b.extend(true, k, this);
          k.superclass = this;
          k.fn = k.prototype = this();
          k.fn.constructor = k;
          k.sub = this.sub;
          k.fn.init = function (y, u) {
            if (u && u instanceof b && !(u instanceof k)) u = k(u);
            return b.fn.init.call(this, y, u, t);
          };
          k.fn.init.prototype = k.fn;
          var t = k(B);
          return k;
        },
        browser: {},
      });
      b.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (k, t) {
        H["[object " + t + "]"] = t.toLowerCase();
      });
      Q = b.uaMatch(Q);
      if (Q.browser) {
        b.browser[Q.browser] = true;
        b.browser.version = Q.version;
      }
      if (b.browser.webkit) b.browser.safari = true;
      if (i.test("\u00a0")) {
        l = /^[\s\xA0]+/;
        m = /[\s\xA0]+$/;
      }
      f = b(B);
      if (B.addEventListener)
        j = function () {
          B.removeEventListener("DOMContentLoaded", j, false);
          b.ready();
        };
      else if (B.attachEvent)
        j = function () {
          if (B.readyState === "complete") {
            B.detachEvent("onreadystatechange", j);
            b.ready();
          }
        };
      return b;
    })(),
    Ba = {};
  c.Callbacks = function (a) {
    a = a ? Ba[a] || qb(a) : {};
    var b = [],
      d = [],
      e,
      f,
      g,
      i,
      l,
      m = function (s) {
        var A, w, F, J;
        A = 0;
        for (w = s.length; A < w; A++) {
          F = s[A];
          J = c.type(F);
          if (J === "array") m(F);
          else if (J === "function") if (!a.unique || !v.has(F)) b.push(F);
        }
      },
      p = function (s, A) {
        A = A || [];
        e = !a.memory || [s, A];
        f = true;
        l = g || 0;
        g = 0;
        for (i = b.length; b && l < i; l++)
          if (b[l].apply(s, A) === false && a.stopOnFalse) {
            e = true;
            break;
          }
        f = false;
        if (b)
          if (a.once)
            if (e === true) v.disable();
            else b = [];
          else if (d && d.length) {
            e = d.shift();
            v.fireWith(e[0], e[1]);
          }
      },
      v = {
        add: function () {
          if (b) {
            var s = b.length;
            m(arguments);
            if (f) i = b.length;
            else if (e && e !== true) {
              g = s;
              p(e[0], e[1]);
            }
          }
          return this;
        },
        remove: function () {
          if (b)
            for (var s = arguments, A = 0, w = s.length; A < w; A++)
              for (var F = 0; F < b.length; F++)
                if (s[A] === b[F]) {
                  if (f)
                    if (F <= i) {
                      i--;
                      F <= l && l--;
                    }
                  b.splice(F--, 1);
                  if (a.unique) break;
                }
          return this;
        },
        has: function (s) {
          if (b) for (var A = 0, w = b.length; A < w; A++) if (s === b[A]) return true;
          return false;
        },
        empty: function () {
          b = [];
          return this;
        },
        disable: function () {
          b = d = e = z;
          return this;
        },
        disabled: function () {
          return !b;
        },
        lock: function () {
          d = z;
          if (!e || e === true) v.disable();
          return this;
        },
        locked: function () {
          return !d;
        },
        fireWith: function (s, A) {
          if (d)
            if (f) a.once || d.push([s, A]);
            else (a.once && e) || p(s, A);
          return this;
        },
        fire: function () {
          v.fireWith(this, arguments);
          return this;
        },
        fired: function () {
          return !!e;
        },
      };
    return v;
  };
  var va = [].slice;
  c.extend({
    Deferred: function (a) {
      var b = c.Callbacks("once memory"),
        d = c.Callbacks("once memory"),
        e = c.Callbacks("memory"),
        f = "pending",
        g = {
          resolve: b,
          reject: d,
          notify: e,
        },
        i = {
          done: b.add,
          fail: d.add,
          progress: e.add,
          state: function () {
            return f;
          },
          isResolved: b.fired,
          isRejected: d.fired,
          then: function (p, v, s) {
            l.done(p).fail(v).progress(s);
            return this;
          },
          always: function () {
            l.done.apply(l, arguments).fail.apply(l, arguments);
            return this;
          },
          pipe: function (p, v, s) {
            return c
              .Deferred(function (A) {
                c.each(
                  {
                    done: [p, "resolve"],
                    fail: [v, "reject"],
                    progress: [s, "notify"],
                  },
                  function (w, F) {
                    var J = F[0],
                      M = F[1],
                      K;
                    c.isFunction(J)
                      ? l[w](function () {
                          (K = J.apply(this, arguments)) && c.isFunction(K.promise)
                            ? K.promise().then(A.resolve, A.reject, A.notify)
                            : A[M + "With"](this === l ? A : this, [K]);
                        })
                      : l[w](A[M]);
                  }
                );
              })
              .promise();
          },
          promise: function (p) {
            if (p == null) p = i;
            else for (var v in i) p[v] = i[v];
            return p;
          },
        },
        l = i.promise({}),
        m;
      for (m in g) {
        l[m] = g[m].fire;
        l[m + "With"] = g[m].fireWith;
      }
      l.done(
        function () {
          f = "resolved";
        },
        d.disable,
        e.lock
      ).fail(
        function () {
          f = "rejected";
        },
        b.disable,
        e.lock
      );
      a && a.call(l, l);
      return l;
    },
    when: function (a) {
      function b(v) {
        return function (s) {
          e[v] = arguments.length > 1 ? va.call(arguments, 0) : s;
          --l || m.resolveWith(m, e);
        };
      }

      function d(v) {
        return function (s) {
          i[v] = arguments.length > 1 ? va.call(arguments, 0) : s;
          m.notifyWith(p, i);
        };
      }
      var e = va.call(arguments, 0),
        f = 0,
        g = e.length,
        i = Array(g),
        l = g,
        m = g <= 1 && a && c.isFunction(a.promise) ? a : c.Deferred(),
        p = m.promise();
      if (g > 1) {
        for (; f < g; f++)
          if (e[f] && e[f].promise && c.isFunction(e[f].promise)) e[f].promise().then(b(f), m.reject, d(f));
          else --l;
        l || m.resolveWith(m, e);
      } else if (m !== a) m.resolveWith(m, g ? [a] : []);
      return p;
    },
  });
  c.support = (function () {
    var a,
      b,
      d,
      e,
      f,
      g,
      i,
      l,
      m = B.createElement("div");
    m.setAttribute("className", "t");
    m.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
    b = m.getElementsByTagName("*");
    d = m.getElementsByTagName("a")[0];
    if (!b || !b.length || !d) return {};
    e = B.createElement("select");
    f = e.appendChild(B.createElement("option"));
    b = m.getElementsByTagName("input")[0];
    a = {
      leadingWhitespace: m.firstChild.nodeType === 3,
      tbody: !m.getElementsByTagName("tbody").length,
      htmlSerialize: !!m.getElementsByTagName("link").length,
      style: /top/.test(d.getAttribute("style")),
      hrefNormalized: d.getAttribute("href") === "/a",
      opacity: /^0.55/.test(d.style.opacity),
      cssFloat: !!d.style.cssFloat,
      checkOn: b.value === "on",
      optSelected: f.selected,
      getSetAttribute: m.className !== "t",
      enctype: !!B.createElement("form").enctype,
      html5Clone: B.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
      submitBubbles: true,
      changeBubbles: true,
      focusinBubbles: false,
      deleteExpando: true,
      noCloneEvent: true,
      inlineBlockNeedsLayout: false,
      shrinkWrapBlocks: false,
      reliableMarginRight: true,
    };
    b.checked = true;
    a.noCloneChecked = b.cloneNode(true).checked;
    e.disabled = true;
    a.optDisabled = !f.disabled;
    try {
      delete m.test;
    } catch (p) {
      a.deleteExpando = false;
    }
    if (!m.addEventListener && m.attachEvent && m.fireEvent) {
      m.attachEvent("onclick", function () {
        a.noCloneEvent = false;
      });
      m.cloneNode(true).fireEvent("onclick");
    }
    b = B.createElement("input");
    b.value = "t";
    b.setAttribute("type", "radio");
    a.radioValue = b.value === "t";
    b.setAttribute("checked", "checked");
    m.appendChild(b);
    d = B.createDocumentFragment();
    d.appendChild(m.lastChild);
    a.checkClone = d.cloneNode(true).cloneNode(true).lastChild.checked;
    a.appendChecked = b.checked;
    d.removeChild(b);
    d.appendChild(m);
    m.innerHTML = "";
    if (I.getComputedStyle) {
      b = B.createElement("div");
      b.style.width = "0";
      b.style.marginRight = "0";
      m.style.width = "2px";
      m.appendChild(b);
      a.reliableMarginRight =
        (parseInt(
          (
            I.getComputedStyle(b, null) || {
              marginRight: 0,
            }
          ).marginRight,
          10
        ) || 0) === 0;
    }
    if (m.attachEvent)
      for (i in {
        submit: 1,
        change: 1,
        focusin: 1,
      }) {
        b = "on" + i;
        l = b in m;
        if (!l) {
          m.setAttribute(b, "return;");
          l = typeof m[b] === "function";
        }
        a[i + "Bubbles"] = l;
      }
    d.removeChild(m);
    d = e = f = b = m = b = null;
    c(function () {
      var v,
        s,
        A,
        w,
        F = B.getElementsByTagName("body")[0];
      if (F) {
        v = B.createElement("div");
        v.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
        F.insertBefore(v, F.firstChild);
        m = B.createElement("div");
        v.appendChild(m);
        m.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
        g = m.getElementsByTagName("td");
        l = g[0].offsetHeight === 0;
        g[0].style.display = "";
        g[1].style.display = "none";
        a.reliableHiddenOffsets = l && g[0].offsetHeight === 0;
        m.innerHTML = "";
        m.style.width = m.style.paddingLeft = "1px";
        c.boxModel = a.boxModel = m.offsetWidth === 2;
        if (typeof m.style.zoom !== "undefined") {
          m.style.display = "inline";
          m.style.zoom = 1;
          a.inlineBlockNeedsLayout = m.offsetWidth === 2;
          m.style.display = "";
          m.innerHTML = "<div style='width:4px;'></div>";
          a.shrinkWrapBlocks = m.offsetWidth !== 2;
        }
        m.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;visibility:hidden;border:0;";
        m.innerHTML =
          "<div style='position:absolute;top:0;left:0;width:1px;height:1px;margin:0;border:5px solid #000;padding:0;'><div></div></div><table style='position:absolute;top:0;left:0;width:1px;height:1px;margin:0;border:5px solid #000;padding:0;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
        s = m.firstChild;
        A = s.firstChild;
        w = {
          doesNotAddBorder: A.offsetTop !== 5,
          doesAddBorderForTableAndCells: s.nextSibling.firstChild.firstChild.offsetTop === 5,
        };
        A.style.position = "fixed";
        A.style.top = "20px";
        w.fixedPosition = A.offsetTop === 20 || A.offsetTop === 15;
        A.style.position = A.style.top = "";
        s.style.overflow = "hidden";
        s.style.position = "relative";
        w.subtractsBorderForOverflowNotVisible = A.offsetTop === -5;
        w.doesNotIncludeMarginInBodyOffset = F.offsetTop !== 1;
        F.removeChild(v);
        m = null;
        c.extend(a, w);
      }
    });
    return a;
  })();
  var sb = /^(?:\{.*\}|\[.*\])$/,
    rb = /([A-Z])/g;
  c.extend({
    cache: {},
    uuid: 0,
    expando: "jQuery" + (c.fn.jquery + Math.random()).replace(/\D/g, ""),
    noData: {
      embed: true,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: true,
    },
    hasData: function (a) {
      a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando];
      return !!a && !qa(a);
    },
    data: function (a, b, d, e) {
      if (c.acceptData(a)) {
        var f;
        f = c.expando;
        var g = typeof b === "string",
          i = a.nodeType,
          l = i ? c.cache : a,
          m = i ? a[f] : a[f] && f,
          p = b === "events";
        if (!((!m || !l[m] || (!p && !e && !l[m].data)) && g && d === z)) {
          if (!m)
            if (i) a[f] = m = ++c.uuid;
            else m = f;
          if (!l[m]) {
            l[m] = {};
            if (!i) l[m].toJSON = c.noop;
          }
          if (typeof b === "object" || typeof b === "function")
            if (e) l[m] = c.extend(l[m], b);
            else l[m].data = c.extend(l[m].data, b);
          f = a = l[m];
          if (!e) {
            if (!a.data) a.data = {};
            a = a.data;
          }
          if (d !== z) a[c.camelCase(b)] = d;
          if (p && !a[b]) return f.events;
          if (g) {
            d = a[b];
            if (d == null) d = a[c.camelCase(b)];
          } else d = a;
          return d;
        }
      }
    },
    removeData: function (a, b, d) {
      if (c.acceptData(a)) {
        var e,
          f,
          g,
          i = c.expando,
          l = a.nodeType,
          m = l ? c.cache : a,
          p = l ? a[i] : i;
        if (m[p]) {
          if (b)
            if ((e = d ? m[p] : m[p].data)) {
              if (!c.isArray(b))
                if (b in e) b = [b];
                else {
                  b = c.camelCase(b);
                  b = b in e ? [b] : b.split(" ");
                }
              f = 0;
              for (g = b.length; f < g; f++) delete e[b[f]];
              if (!(d ? qa : c.isEmptyObject)(e)) return;
            }
          if (!d) {
            delete m[p].data;
            if (!qa(m[p])) return;
          }
          if (c.support.deleteExpando || !m.setInterval) delete m[p];
          else m[p] = null;
          if (l)
            if (c.support.deleteExpando) delete a[i];
            else if (a.removeAttribute) a.removeAttribute(i);
            else a[i] = null;
        }
      }
    },
    _data: function (a, b, d) {
      return c.data(a, b, d, true);
    },
    acceptData: function (a) {
      if (a.nodeName) {
        var b = c.noData[a.nodeName.toLowerCase()];
        if (b) return !(b === true || a.getAttribute("classid") !== b);
      }
      return true;
    },
  });
  c.fn.extend({
    data: function (a, b) {
      var d,
        e,
        f,
        g = null;
      if (typeof a === "undefined") {
        if (this.length) {
          g = c.data(this[0]);
          if (this[0].nodeType === 1 && !c._data(this[0], "parsedAttrs")) {
            e = this[0].attributes;
            for (var i = 0, l = e.length; i < l; i++) {
              f = e[i].name;
              if (f.indexOf("data-") === 0) {
                f = c.camelCase(f.substring(5));
                Ca(this[0], f, g[f]);
              }
            }
            c._data(this[0], "parsedAttrs", true);
          }
        }
        return g;
      } else if (typeof a === "object")
        return this.each(function () {
          c.data(this, a);
        });
      d = a.split(".");
      d[1] = d[1] ? "." + d[1] : "";
      if (b === z) {
        g = this.triggerHandler("getData" + d[1] + "!", [d[0]]);
        if (g === z && this.length) {
          g = c.data(this[0], a);
          g = Ca(this[0], a, g);
        }
        return g === z && d[1] ? this.data(d[0]) : g;
      } else
        return this.each(function () {
          var m = c(this),
            p = [d[0], b];
          m.triggerHandler("setData" + d[1] + "!", p);
          c.data(this, a, b);
          m.triggerHandler("changeData" + d[1] + "!", p);
        });
    },
    removeData: function (a) {
      return this.each(function () {
        c.removeData(this, a);
      });
    },
  });
  c.extend({
    _mark: function (a, b) {
      if (a) {
        b = (b || "fx") + "mark";
        c._data(a, b, (c._data(a, b) || 0) + 1);
      }
    },
    _unmark: function (a, b, d) {
      if (a !== true) {
        d = b;
        b = a;
        a = false;
      }
      if (b) {
        d = d || "fx";
        var e = d + "mark";
        if ((a = a ? 0 : (c._data(b, e) || 1) - 1)) c._data(b, e, a);
        else {
          c.removeData(b, e, true);
          Da(b, d, "mark");
        }
      }
    },
    queue: function (a, b, d) {
      var e;
      if (a) {
        b = (b || "fx") + "queue";
        e = c._data(a, b);
        if (d)
          if (!e || c.isArray(d)) e = c._data(a, b, c.makeArray(d));
          else e.push(d);
        return e || [];
      }
    },
    dequeue: function (a, b) {
      b = b || "fx";
      var d = c.queue(a, b),
        e = d.shift(),
        f = {};
      if (e === "inprogress") e = d.shift();
      if (e) {
        b === "fx" && d.unshift("inprogress");
        c._data(a, b + ".run", f);
        e.call(
          a,
          function () {
            c.dequeue(a, b);
          },
          f
        );
      }
      if (!d.length) {
        c.removeData(a, b + "queue " + b + ".run", true);
        Da(a, b, "queue");
      }
    },
  });
  c.fn.extend({
    queue: function (a, b) {
      if (typeof a !== "string") {
        b = a;
        a = "fx";
      }
      if (b === z) return c.queue(this[0], a);
      return this.each(function () {
        var d = c.queue(this, a, b);
        a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a);
      });
    },
    dequeue: function (a) {
      return this.each(function () {
        c.dequeue(this, a);
      });
    },
    delay: function (a, b) {
      a = c.fx ? c.fx.speeds[a] || a : a;
      b = b || "fx";
      return this.queue(b, function (d, e) {
        var f = setTimeout(d, a);
        e.stop = function () {
          clearTimeout(f);
        };
      });
    },
    clearQueue: function (a) {
      return this.queue(a || "fx", []);
    },
    promise: function (a, b) {
      function d() {
        --i || e.resolveWith(f, [f]);
      }
      if (typeof a !== "string") {
        b = a;
        a = z;
      }
      a = a || "fx";
      for (var e = c.Deferred(), f = this, g = f.length, i = 1, l = a + "defer", m = a + "queue", p = a + "mark", v; g--; )
        if (
          (v =
            c.data(f[g], l, z, true) || ((c.data(f[g], m, z, true) || c.data(f[g], p, z, true)) && c.data(f[g], l, c.Callbacks("once memory"), true)))
        ) {
          i++;
          v.add(d);
        }
      d();
      return e.promise();
    },
  });
  var Ta = /[\n\t\r]/g,
    la = /\s+/,
    Cb = /\r/g,
    Db = /^(?:button|input)$/i,
    Eb = /^(?:button|input|object|select|textarea)$/i,
    Fb = /^a(?:rea)?$/i,
    Ua = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    Va = c.support.getSetAttribute,
    S,
    Wa,
    Xa;
  c.fn.extend({
    attr: function (a, b) {
      return c.access(this, a, b, true, c.attr);
    },
    removeAttr: function (a) {
      return this.each(function () {
        c.removeAttr(this, a);
      });
    },
    prop: function (a, b) {
      return c.access(this, a, b, true, c.prop);
    },
    removeProp: function (a) {
      a = c.propFix[a] || a;
      return this.each(function () {
        try {
          this[a] = z;
          delete this[a];
        } catch (b) {}
      });
    },
    addClass: function (a) {
      var b, d, e, f, g, i, l;
      if (c.isFunction(a))
        return this.each(function (m) {
          c(this).addClass(a.call(this, m, this.className));
        });
      if (a && typeof a === "string") {
        b = a.split(la);
        d = 0;
        for (e = this.length; d < e; d++) {
          f = this[d];
          if (f.nodeType === 1)
            if (!f.className && b.length === 1) f.className = a;
            else {
              g = " " + f.className + " ";
              i = 0;
              for (l = b.length; i < l; i++) ~g.indexOf(" " + b[i] + " ") || (g += b[i] + " ");
              f.className = c.trim(g);
            }
        }
      }
      return this;
    },
    removeClass: function (a) {
      var b, d, e, f, g, i, l;
      if (c.isFunction(a))
        return this.each(function (m) {
          c(this).removeClass(a.call(this, m, this.className));
        });
      if ((a && typeof a === "string") || a === z) {
        b = (a || "").split(la);
        d = 0;
        for (e = this.length; d < e; d++) {
          f = this[d];
          if (f.nodeType === 1 && f.className)
            if (a) {
              g = (" " + f.className + " ").replace(Ta, " ");
              i = 0;
              for (l = b.length; i < l; i++) g = g.replace(" " + b[i] + " ", " ");
              f.className = c.trim(g);
            } else f.className = "";
        }
      }
      return this;
    },
    toggleClass: function (a, b) {
      var d = typeof a,
        e = typeof b === "boolean";
      if (c.isFunction(a))
        return this.each(function (f) {
          c(this).toggleClass(a.call(this, f, this.className, b), b);
        });
      return this.each(function () {
        if (d === "string")
          for (var f, g = 0, i = c(this), l = b, m = a.split(la); (f = m[g++]); ) {
            l = e ? l : !i.hasClass(f);
            i[l ? "addClass" : "removeClass"](f);
          }
        else if (d === "undefined" || d === "boolean") {
          this.className && c._data(this, "__className__", this.className);
          this.className = this.className || a === false ? "" : c._data(this, "__className__") || "";
        }
      });
    },
    hasClass: function (a) {
      a = " " + a + " ";
      for (var b = 0, d = this.length; b < d; b++)
        if (this[b].nodeType === 1 && (" " + this[b].className + " ").replace(Ta, " ").indexOf(a) > -1) return true;
      return false;
    },
    val: function (a) {
      var b,
        d,
        e,
        f = this[0];
      if (arguments.length) {
        e = c.isFunction(a);
        return this.each(function (g) {
          var i = c(this);
          if (this.nodeType === 1) {
            g = e ? a.call(this, g, i.val()) : a;
            if (g == null) g = "";
            else if (typeof g === "number") g += "";
            else if (c.isArray(g))
              g = c.map(g, function (l) {
                return l == null ? "" : l + "";
              });
            b = c.valHooks[this.nodeName.toLowerCase()] || c.valHooks[this.type];
            if (!b || !("set" in b) || b.set(this, g, "value") === z) this.value = g;
          }
        });
      } else if (f) {
        if ((b = c.valHooks[f.nodeName.toLowerCase()] || c.valHooks[f.type]) && "get" in b && (d = b.get(f, "value")) !== z) return d;
        d = f.value;
        return typeof d === "string" ? d.replace(Cb, "") : d == null ? "" : d;
      }
    },
  });
  c.extend({
    valHooks: {
      option: {
        get: function (a) {
          var b = a.attributes.value;
          return !b || b.specified ? a.value : a.text;
        },
      },
      select: {
        get: function (a) {
          var b,
            d,
            e = a.selectedIndex,
            f = [],
            g = a.options,
            i = a.type === "select-one";
          if (e < 0) return null;
          a = i ? e : 0;
          for (d = i ? e + 1 : g.length; a < d; a++) {
            b = g[a];
            if (
              b.selected &&
              (c.support.optDisabled ? !b.disabled : b.getAttribute("disabled") === null) &&
              (!b.parentNode.disabled || !c.nodeName(b.parentNode, "optgroup"))
            ) {
              b = c(b).val();
              if (i) return b;
              f.push(b);
            }
          }
          if (i && !f.length && g.length) return c(g[e]).val();
          return f;
        },
        set: function (a, b) {
          var d = c.makeArray(b);
          c(a)
            .find("option")
            .each(function () {
              this.selected = c.inArray(c(this).val(), d) >= 0;
            });
          if (!d.length) a.selectedIndex = -1;
          return d;
        },
      },
    },
    attrFn: {
      val: true,
      css: true,
      html: true,
      text: true,
      data: true,
      width: true,
      height: true,
      offset: true,
    },
    attr: function (a, b, d, e) {
      var f,
        g,
        i = a.nodeType;
      if (!(!a || i === 3 || i === 8 || i === 2)) {
        if (e && b in c.attrFn) return c(a)[b](d);
        if (typeof a.getAttribute === "undefined") return c.prop(a, b, d);
        if ((e = i !== 1 || !c.isXMLDoc(a))) {
          b = b.toLowerCase();
          g = c.attrHooks[b] || (Ua.test(b) ? Wa : S);
        }
        if (d !== z)
          if (d === null) c.removeAttr(a, b);
          else if (g && "set" in g && e && (f = g.set(a, d, b)) !== z) return f;
          else {
            a.setAttribute(b, "" + d);
            return d;
          }
        else if (g && "get" in g && e && (f = g.get(a, b)) !== null) return f;
        else {
          f = a.getAttribute(b);
          return f === null ? z : f;
        }
      }
    },
    removeAttr: function (a, b) {
      var d,
        e,
        f,
        g,
        i = 0;
      if (b && a.nodeType === 1) {
        e = b.toLowerCase().split(la);
        for (g = e.length; i < g; i++)
          if ((f = e[i])) {
            d = c.propFix[f] || f;
            c.attr(a, f, "");
            a.removeAttribute(Va ? f : d);
            if (Ua.test(f) && d in a) a[d] = false;
          }
      }
    },
    attrHooks: {
      type: {
        set: function (a, b) {
          if (Db.test(a.nodeName) && a.parentNode) c.error("type property can't be changed");
          else if (!c.support.radioValue && b === "radio" && c.nodeName(a, "input")) {
            var d = a.value;
            a.setAttribute("type", b);
            if (d) a.value = d;
            return b;
          }
        },
      },
      value: {
        get: function (a, b) {
          if (S && c.nodeName(a, "button")) return S.get(a, b);
          return b in a ? a.value : null;
        },
        set: function (a, b, d) {
          if (S && c.nodeName(a, "button")) return S.set(a, b, d);
          a.value = b;
        },
      },
    },
    propFix: {
      tabindex: "tabIndex",
      readonly: "readOnly",
      for: "htmlFor",
      class: "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable",
    },
    prop: function (a, b, d) {
      var e,
        f,
        g = a.nodeType;
      if (!(!a || g === 3 || g === 8 || g === 2)) {
        if (g !== 1 || !c.isXMLDoc(a)) {
          b = c.propFix[b] || b;
          f = c.propHooks[b];
        }
        return d !== z ? (f && "set" in f && (e = f.set(a, d, b)) !== z ? e : (a[b] = d)) : f && "get" in f && (e = f.get(a, b)) !== null ? e : a[b];
      }
    },
    propHooks: {
      tabIndex: {
        get: function (a) {
          var b = a.getAttributeNode("tabindex");
          return b && b.specified ? parseInt(b.value, 10) : Eb.test(a.nodeName) || (Fb.test(a.nodeName) && a.href) ? 0 : z;
        },
      },
    },
  });
  c.attrHooks.tabindex = c.propHooks.tabIndex;
  Wa = {
    get: function (a, b) {
      var d,
        e = c.prop(a, b);
      return e === true || (typeof e !== "boolean" && (d = a.getAttributeNode(b)) && d.nodeValue !== false) ? b.toLowerCase() : z;
    },
    set: function (a, b, d) {
      if (b === false) c.removeAttr(a, d);
      else {
        b = c.propFix[d] || d;
        if (b in a) a[b] = true;
        a.setAttribute(d, d.toLowerCase());
      }
      return d;
    },
  };
  if (!Va) {
    Xa = {
      name: true,
      id: true,
    };
    S = c.valHooks.button = {
      get: function (a, b) {
        var d;
        return (d = a.getAttributeNode(b)) && (Xa[b] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : z;
      },
      set: function (a, b, d) {
        var e = a.getAttributeNode(d);
        if (!e) {
          e = B.createAttribute(d);
          a.setAttributeNode(e);
        }
        return (e.nodeValue = b + "");
      },
    };
    c.attrHooks.tabindex.set = S.set;
    c.each(["width", "height"], function (a, b) {
      c.attrHooks[b] = c.extend(c.attrHooks[b], {
        set: function (d, e) {
          if (e === "") {
            d.setAttribute(b, "auto");
            return e;
          }
        },
      });
    });
    c.attrHooks.contenteditable = {
      get: S.get,
      set: function (a, b, d) {
        if (b === "") b = "false";
        S.set(a, b, d);
      },
    };
  }
  c.support.hrefNormalized ||
    c.each(["href", "src", "width", "height"], function (a, b) {
      c.attrHooks[b] = c.extend(c.attrHooks[b], {
        get: function (d) {
          d = d.getAttribute(b, 2);
          return d === null ? z : d;
        },
      });
    });
  if (!c.support.style)
    c.attrHooks.style = {
      get: function (a) {
        return a.style.cssText.toLowerCase() || z;
      },
      set: function (a, b) {
        return (a.style.cssText = "" + b);
      },
    };
  if (!c.support.optSelected)
    c.propHooks.selected = c.extend(c.propHooks.selected, {
      get: function () {
        return null;
      },
    });
  if (!c.support.enctype) c.propFix.enctype = "encoding";
  c.support.checkOn ||
    c.each(["radio", "checkbox"], function () {
      c.valHooks[this] = {
        get: function (a) {
          return a.getAttribute("value") === null ? "on" : a.value;
        },
      };
    });
  c.each(["radio", "checkbox"], function () {
    c.valHooks[this] = c.extend(c.valHooks[this], {
      set: function (a, b) {
        if (c.isArray(b)) return (a.checked = c.inArray(c(a).val(), b) >= 0);
      },
    });
  });
  var wa = /^(?:textarea|input|select)$/i,
    Ya = /^([^\.]*)?(?:\.(.+))?$/,
    Gb = /\bhover(\.\S+)?\b/,
    Hb = /^key/,
    Ib = /^(?:mouse|contextmenu)|click/,
    Za = /^(?:focusinfocus|focusoutblur)$/,
    Jb = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
    Kb = function (a) {
      if ((a = Jb.exec(a))) {
        a[1] = (a[1] || "").toLowerCase();
        a[3] = a[3] && RegExp("(?:^|\\s)" + a[3] + "(?:\\s|$)");
      }
      return a;
    },
    $a = function (a) {
      return c.event.special.hover ? a : a.replace(Gb, "mouseenter$1 mouseleave$1");
    };
  c.event = {
    add: function (a, b, d, e, f) {
      var g, i, l, m, p, v, s, A, w;
      if (!(a.nodeType === 3 || a.nodeType === 8 || !b || !d || !(g = c._data(a)))) {
        if (d.handler) {
          s = d;
          d = s.handler;
        }
        if (!d.guid) d.guid = c.guid++;
        l = g.events;
        if (!l) g.events = l = {};
        i = g.handle;
        if (!i) {
          g.handle = i = function (F) {
            return typeof c !== "undefined" && (!F || c.event.triggered !== F.type) ? c.event.dispatch.apply(i.elem, arguments) : z;
          };
          i.elem = a;
        }
        b = c.trim($a(b)).split(" ");
        for (g = 0; g < b.length; g++) {
          m = Ya.exec(b[g]) || [];
          p = m[1];
          v = (m[2] || "").split(".").sort();
          w = c.event.special[p] || {};
          p = (f ? w.delegateType : w.bindType) || p;
          w = c.event.special[p] || {};
          m = c.extend(
            {
              type: p,
              origType: m[1],
              data: e,
              handler: d,
              guid: d.guid,
              selector: f,
              quick: Kb(f),
              namespace: v.join("."),
            },
            s
          );
          A = l[p];
          if (!A) {
            A = l[p] = [];
            A.delegateCount = 0;
            if (!w.setup || w.setup.call(a, e, v, i) === false)
              if (a.addEventListener) a.addEventListener(p, i, false);
              else a.attachEvent && a.attachEvent("on" + p, i);
          }
          if (w.add) {
            w.add.call(a, m);
            if (!m.handler.guid) m.handler.guid = d.guid;
          }
          f ? A.splice(A.delegateCount++, 0, m) : A.push(m);
          c.event.global[p] = true;
        }
        a = null;
      }
    },
    global: {},
    remove: function (a, b, d, e, f) {
      var g = c.hasData(a) && c._data(a),
        i,
        l,
        m,
        p,
        v,
        s,
        A,
        w,
        F,
        J;
      if (g && (A = g.events)) {
        b = c.trim($a(b || "")).split(" ");
        for (i = 0; i < b.length; i++) {
          l = Ya.exec(b[i]) || [];
          m = p = l[1];
          l = l[2];
          if (m) {
            w = c.event.special[m] || {};
            m = (e ? w.delegateType : w.bindType) || m;
            F = A[m] || [];
            v = F.length;
            l = l ? RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
            for (s = 0; s < F.length; s++) {
              J = F[s];
              if (
                (f || p === J.origType) &&
                (!d || d.guid === J.guid) &&
                (!l || l.test(J.namespace)) &&
                (!e || e === J.selector || (e === "**" && J.selector))
              ) {
                F.splice(s--, 1);
                J.selector && F.delegateCount--;
                w.remove && w.remove.call(a, J);
              }
            }
            if (F.length === 0 && v !== F.length) {
              if (!w.teardown || w.teardown.call(a, l) === false) c.removeEvent(a, m, g.handle);
              delete A[m];
            }
          } else for (m in A) c.event.remove(a, m + b[i], d, e, true);
        }
        if (c.isEmptyObject(A)) {
          if ((b = g.handle)) b.elem = null;
          c.removeData(a, ["events", "handle"], true);
        }
      }
    },
    customEvent: {
      getData: true,
      setData: true,
      changeData: true,
    },
    trigger: function (a, b, d, e) {
      if (!(d && (d.nodeType === 3 || d.nodeType === 8))) {
        var f = a.type || a,
          g = [],
          i,
          l,
          m,
          p,
          v;
        if (!Za.test(f + c.event.triggered)) {
          if (f.indexOf("!") >= 0) {
            f = f.slice(0, -1);
            i = true;
          }
          if (f.indexOf(".") >= 0) {
            g = f.split(".");
            f = g.shift();
            g.sort();
          }
          if (!((!d || c.event.customEvent[f]) && !c.event.global[f])) {
            a = typeof a === "object" ? (a[c.expando] ? a : new c.Event(f, a)) : new c.Event(f);
            a.type = f;
            a.isTrigger = true;
            a.exclusive = i;
            a.namespace = g.join(".");
            a.namespace_re = a.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
            i = f.indexOf(":") < 0 ? "on" + f : "";
            if (d) {
              a.result = z;
              if (!a.target) a.target = d;
              b = b != null ? c.makeArray(b) : [];
              b.unshift(a);
              m = c.event.special[f] || {};
              if (!(m.trigger && m.trigger.apply(d, b) === false)) {
                v = [[d, m.bindType || f]];
                if (!e && !m.noBubble && !c.isWindow(d)) {
                  p = m.delegateType || f;
                  g = Za.test(p + f) ? d : d.parentNode;
                  for (l = null; g; g = g.parentNode) {
                    v.push([g, p]);
                    l = g;
                  }
                  if (l && l === d.ownerDocument) v.push([l.defaultView || l.parentWindow || I, p]);
                }
                for (l = 0; l < v.length && !a.isPropagationStopped(); l++) {
                  g = v[l][0];
                  a.type = v[l][1];
                  (p = (c._data(g, "events") || {})[a.type] && c._data(g, "handle")) && p.apply(g, b);
                  (p = i && g[i]) && c.acceptData(g) && p.apply(g, b) === false && a.preventDefault();
                }
                a.type = f;
                if (!e && !a.isDefaultPrevented())
                  if ((!m._default || m._default.apply(d.ownerDocument, b) === false) && !(f === "click" && c.nodeName(d, "a")) && c.acceptData(d))
                    if (i && d[f] && ((f !== "focus" && f !== "blur") || a.target.offsetWidth !== 0) && !c.isWindow(d)) {
                      if ((l = d[i])) d[i] = null;
                      c.event.triggered = f;
                      d[f]();
                      c.event.triggered = z;
                      if (l) d[i] = l;
                    }
                return a.result;
              }
            } else {
              d = c.cache;
              for (l in d) d[l].events && d[l].events[f] && c.event.trigger(a, b, d[l].handle.elem, true);
            }
          }
        }
      }
    },
    dispatch: function (a) {
      a = c.event.fix(a || I.event);
      var b = (c._data(this, "events") || {})[a.type] || [],
        d = b.delegateCount,
        e = [].slice.call(arguments, 0),
        f = !a.exclusive && !a.namespace,
        g = [],
        i,
        l,
        m,
        p,
        v,
        s,
        A;
      e[0] = a;
      a.delegateTarget = this;
      if (d && !a.target.disabled && !(a.button && a.type === "click")) {
        m = c(this);
        m.context = this.ownerDocument || this;
        for (l = a.target; l != this; l = l.parentNode || this) {
          v = {};
          s = [];
          m[0] = l;
          for (i = 0; i < d; i++) {
            p = b[i];
            A = p.selector;
            if (v[A] === z) {
              var w = v,
                F = A,
                J;
              if (p.quick) {
                J = p.quick;
                var M = l.attributes || {};
                J =
                  (!J[1] || l.nodeName.toLowerCase() === J[1]) &&
                  (!J[2] || (M.id || {}).value === J[2]) &&
                  (!J[3] || J[3].test((M["class"] || {}).value));
              } else J = m.is(A);
              w[F] = J;
            }
            v[A] && s.push(p);
          }
          s.length &&
            g.push({
              elem: l,
              matches: s,
            });
        }
      }
      b.length > d &&
        g.push({
          elem: this,
          matches: b.slice(d),
        });
      for (i = 0; i < g.length && !a.isPropagationStopped(); i++) {
        d = g[i];
        a.currentTarget = d.elem;
        for (b = 0; b < d.matches.length && !a.isImmediatePropagationStopped(); b++) {
          p = d.matches[b];
          if (f || (!a.namespace && !p.namespace) || (a.namespace_re && a.namespace_re.test(p.namespace))) {
            a.data = p.data;
            a.handleObj = p;
            p = ((c.event.special[p.origType] || {}).handle || p.handler).apply(d.elem, e);
            if (p !== z) {
              a.result = p;
              if (p === false) {
                a.preventDefault();
                a.stopPropagation();
              }
            }
          }
        }
      }
      return a.result;
    },
    props:
      "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (a, b) {
        if (a.which == null) a.which = b.charCode != null ? b.charCode : b.keyCode;
        return a;
      },
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (a, b) {
        var d,
          e,
          f = b.button,
          g = b.fromElement;
        if (a.pageX == null && b.clientX != null) {
          d = a.target.ownerDocument || B;
          e = d.documentElement;
          d = d.body;
          a.pageX = b.clientX + ((e && e.scrollLeft) || (d && d.scrollLeft) || 0) - ((e && e.clientLeft) || (d && d.clientLeft) || 0);
          a.pageY = b.clientY + ((e && e.scrollTop) || (d && d.scrollTop) || 0) - ((e && e.clientTop) || (d && d.clientTop) || 0);
        }
        if (!a.relatedTarget && g) a.relatedTarget = g === a.target ? b.toElement : g;
        if (!a.which && f !== z) a.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0;
        return a;
      },
    },
    fix: function (a) {
      if (a[c.expando]) return a;
      var b,
        d,
        e = a,
        f = c.event.fixHooks[a.type] || {},
        g = f.props ? this.props.concat(f.props) : this.props;
      a = c.Event(e);
      for (b = g.length; b; ) {
        d = g[--b];
        a[d] = e[d];
      }
      if (!a.target) a.target = e.srcElement || B;
      if (a.target.nodeType === 3) a.target = a.target.parentNode;
      if (a.metaKey === z) a.metaKey = a.ctrlKey;
      return f.filter ? f.filter(a, e) : a;
    },
    special: {
      ready: {
        setup: c.bindReady,
      },
      load: {
        noBubble: true,
      },
      focus: {
        delegateType: "focusin",
      },
      blur: {
        delegateType: "focusout",
      },
      beforeunload: {
        setup: function (a, b, d) {
          if (c.isWindow(this)) this.onbeforeunload = d;
        },
        teardown: function (a, b) {
          if (this.onbeforeunload === b) this.onbeforeunload = null;
        },
      },
    },
    simulate: function (a, b, d, e) {
      a = c.extend(new c.Event(), d, {
        type: a,
        isSimulated: true,
        originalEvent: {},
      });
      e ? c.event.trigger(a, null, b) : c.event.dispatch.call(b, a);
      a.isDefaultPrevented() && d.preventDefault();
    },
  };
  c.event.handle = c.event.dispatch;
  c.removeEvent = B.removeEventListener
    ? function (a, b, d) {
        a.removeEventListener && a.removeEventListener(b, d, false);
      }
    : function (a, b, d) {
        a.detachEvent && a.detachEvent("on" + b, d);
      };
  c.Event = function (a, b) {
    if (!(this instanceof c.Event)) return new c.Event(a, b);
    if (a && a.type) {
      this.originalEvent = a;
      this.type = a.type;
      this.isDefaultPrevented = a.defaultPrevented || a.returnValue === false || (a.getPreventDefault && a.getPreventDefault()) ? ha : $;
    } else this.type = a;
    b && c.extend(this, b);
    this.timeStamp = (a && a.timeStamp) || c.now();
    this[c.expando] = true;
  };
  c.Event.prototype = {
    preventDefault: function () {
      this.isDefaultPrevented = ha;
      var a = this.originalEvent;
      if (a)
        if (a.preventDefault) a.preventDefault();
        else a.returnValue = false;
    },
    stopPropagation: function () {
      this.isPropagationStopped = ha;
      var a = this.originalEvent;
      if (a) {
        a.stopPropagation && a.stopPropagation();
        a.cancelBubble = true;
      }
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = ha;
      this.stopPropagation();
    },
    isDefaultPrevented: $,
    isPropagationStopped: $,
    isImmediatePropagationStopped: $,
  };
  c.each(
    {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
    },
    function (a, b) {
      c.event.special[a] = {
        delegateType: b,
        bindType: b,
        handle: function (d) {
          var e = d.relatedTarget,
            f = d.handleObj,
            g;
          if (!e || (e !== this && !c.contains(this, e))) {
            d.type = f.origType;
            g = f.handler.apply(this, arguments);
            d.type = b;
          }
          return g;
        },
      };
    }
  );
  if (!c.support.submitBubbles)
    c.event.special.submit = {
      setup: function () {
        if (c.nodeName(this, "form")) return false;
        c.event.add(this, "click._submit keypress._submit", function (a) {
          a = a.target;
          if ((a = c.nodeName(a, "input") || c.nodeName(a, "button") ? a.form : z) && !a._submit_attached) {
            c.event.add(a, "submit._submit", function (b) {
              this.parentNode && !b.isTrigger && c.event.simulate("submit", this.parentNode, b, true);
            });
            a._submit_attached = true;
          }
        });
      },
      teardown: function () {
        if (c.nodeName(this, "form")) return false;
        c.event.remove(this, "._submit");
      },
    };
  if (!c.support.changeBubbles)
    c.event.special.change = {
      setup: function () {
        if (wa.test(this.nodeName)) {
          if (this.type === "checkbox" || this.type === "radio") {
            c.event.add(this, "propertychange._change", function (a) {
              if (a.originalEvent.propertyName === "checked") this._just_changed = true;
            });
            c.event.add(this, "click._change", function (a) {
              if (this._just_changed && !a.isTrigger) {
                this._just_changed = false;
                c.event.simulate("change", this, a, true);
              }
            });
          }
          return false;
        }
        c.event.add(this, "beforeactivate._change", function (a) {
          a = a.target;
          if (wa.test(a.nodeName) && !a._change_attached) {
            c.event.add(a, "change._change", function (b) {
              this.parentNode && !b.isSimulated && !b.isTrigger && c.event.simulate("change", this.parentNode, b, true);
            });
            a._change_attached = true;
          }
        });
      },
      handle: function (a) {
        var b = a.target;
        if (this !== b || a.isSimulated || a.isTrigger || (b.type !== "radio" && b.type !== "checkbox"))
          return a.handleObj.handler.apply(this, arguments);
      },
      teardown: function () {
        c.event.remove(this, "._change");
        return wa.test(this.nodeName);
      },
    };
  c.support.focusinBubbles ||
    c.each(
      {
        focus: "focusin",
        blur: "focusout",
      },
      function (a, b) {
        var d = 0,
          e = function (f) {
            c.event.simulate(b, f.target, c.event.fix(f), true);
          };
        c.event.special[b] = {
          setup: function () {
            d++ === 0 && B.addEventListener(a, e, true);
          },
          teardown: function () {
            --d === 0 && B.removeEventListener(a, e, true);
          },
        };
      }
    );
  c.fn.extend({
    on: function (a, b, d, e, f) {
      var g, i;
      if (typeof a === "object") {
        if (typeof b !== "string") {
          d = b;
          b = z;
        }
        for (i in a) this.on(i, b, d, a[i], f);
        return this;
      }
      if (d == null && e == null) {
        e = b;
        d = b = z;
      } else if (e == null)
        if (typeof b === "string") {
          e = d;
          d = z;
        } else {
          e = d;
          d = b;
          b = z;
        }
      if (e === false) e = $;
      else if (!e) return this;
      if (f === 1) {
        g = e;
        e = function (l) {
          c().off(l);
          return g.apply(this, arguments);
        };
        e.guid = g.guid || (g.guid = c.guid++);
      }
      return this.each(function () {
        c.event.add(this, a, e, d, b);
      });
    },
    one: function (a, b, d, e) {
      return this.on.call(this, a, b, d, e, 1);
    },
    off: function (a, b, d) {
      if (a && a.preventDefault && a.handleObj) {
        var e = a.handleObj;
        c(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
        return this;
      }
      if (typeof a === "object") {
        for (e in a) this.off(e, b, a[e]);
        return this;
      }
      if (b === false || typeof b === "function") {
        d = b;
        b = z;
      }
      if (d === false) d = $;
      return this.each(function () {
        c.event.remove(this, a, d, b);
      });
    },
    bind: function (a, b, d) {
      return this.on(a, null, b, d);
    },
    unbind: function (a, b) {
      return this.off(a, null, b);
    },
    live: function (a, b, d) {
      c(this.context).on(a, this.selector, b, d);
      return this;
    },
    die: function (a, b) {
      c(this.context).off(a, this.selector || "**", b);
      return this;
    },
    delegate: function (a, b, d, e) {
      return this.on(b, a, d, e);
    },
    undelegate: function (a, b, d) {
      return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, d);
    },
    trigger: function (a, b) {
      return this.each(function () {
        c.event.trigger(a, b, this);
      });
    },
    triggerHandler: function (a, b) {
      if (this[0]) return c.event.trigger(a, b, this[0], true);
    },
    toggle: function (a) {
      var b = arguments,
        d = a.guid || c.guid++,
        e = 0,
        f = function (g) {
          var i = (c._data(this, "lastToggle" + a.guid) || 0) % e;
          c._data(this, "lastToggle" + a.guid, i + 1);
          g.preventDefault();
          return b[i].apply(this, arguments) || false;
        };
      for (f.guid = d; e < b.length; ) b[e++].guid = d;
      return this.click(f);
    },
    hover: function (a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    },
  });
  c.each(
    "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
      " "
    ),
    function (a, b) {
      c.fn[b] = function (d, e) {
        if (e == null) {
          e = d;
          d = null;
        }
        return arguments.length > 0 ? this.on(b, null, d, e) : this.trigger(b);
      };
      if (c.attrFn) c.attrFn[b] = true;
      if (Hb.test(b)) c.event.fixHooks[b] = c.event.keyHooks;
      if (Ib.test(b)) c.event.fixHooks[b] = c.event.mouseHooks;
    }
  );
  (function () {
    function a(h, j, n, o, q, r) {
      q = 0;
      for (var C = o.length; q < C; q++) {
        var x = o[q];
        if (x) {
          var H = false;
          for (x = x[h]; x; ) {
            if (x[e] === n) {
              H = o[x.sizset];
              break;
            }
            if (x.nodeType === 1 && !r) {
              x[e] = n;
              x.sizset = q;
            }
            if (x.nodeName.toLowerCase() === j) {
              H = x;
              break;
            }
            x = x[h];
          }
          o[q] = H;
        }
      }
    }

    function b(h, j, n, o, q, r) {
      q = 0;
      for (var C = o.length; q < C; q++) {
        var x = o[q];
        if (x) {
          var H = false;
          for (x = x[h]; x; ) {
            if (x[e] === n) {
              H = o[x.sizset];
              break;
            }
            if (x.nodeType === 1) {
              if (!r) {
                x[e] = n;
                x.sizset = q;
              }
              if (typeof j !== "string") {
                if (x === j) {
                  H = true;
                  break;
                }
              } else if (s.filter(j, [x]).length > 0) {
                H = x;
                break;
              }
            }
            x = x[h];
          }
          o[q] = H;
        }
      }
    }
    var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
      e = "sizcache" + (Math.random() + "").replace(".", ""),
      f = 0,
      g = Object.prototype.toString,
      i = false,
      l = true,
      m = /\\/g,
      p = /\r\n/g,
      v = /\W/;
    [0, 0].sort(function () {
      l = false;
      return 0;
    });
    var s = function (h, j, n, o) {
      n = n || [];
      var q = (j = j || B);
      if (j.nodeType !== 1 && j.nodeType !== 9) return [];
      if (!h || typeof h !== "string") return n;
      var r,
        C,
        x,
        H,
        k,
        t = true,
        y = s.isXML(j),
        u = [],
        E = h;
      do {
        d.exec("");
        if ((r = d.exec(E))) {
          E = r[3];
          u.push(r[1]);
          if (r[2]) {
            H = r[3];
            break;
          }
        }
      } while (r);
      if (u.length > 1 && F.exec(h))
        if (u.length === 2 && w.relative[u[0]]) C = Q(u[0] + u[1], j, o);
        else
          for (C = w.relative[u[0]] ? [j] : s(u.shift(), j); u.length; ) {
            h = u.shift();
            if (w.relative[h]) h += u.shift();
            C = Q(h, C, o);
          }
      else {
        if (!o && u.length > 1 && j.nodeType === 9 && !y && w.match.ID.test(u[0]) && !w.match.ID.test(u[u.length - 1])) {
          r = s.find(u.shift(), j, y);
          j = r.expr ? s.filter(r.expr, r.set)[0] : r.set[0];
        }
        if (j) {
          r = o
            ? {
                expr: u.pop(),
                set: K(o),
              }
            : s.find(u.pop(), u.length === 1 && (u[0] === "~" || u[0] === "+") && j.parentNode ? j.parentNode : j, y);
          C = r.expr ? s.filter(r.expr, r.set) : r.set;
          if (u.length > 0) x = K(C);
          else t = false;
          for (; u.length; ) {
            r = k = u.pop();
            if (w.relative[k]) r = u.pop();
            else k = "";
            if (r == null) r = j;
            w.relative[k](x, r, y);
          }
        } else x = [];
      }
      x || (x = C);
      x || s.error(k || h);
      if (g.call(x) === "[object Array]")
        if (t)
          if (j && j.nodeType === 1)
            for (h = 0; x[h] != null; h++) {
              if (x[h] && (x[h] === true || (x[h].nodeType === 1 && s.contains(j, x[h])))) n.push(C[h]);
            }
          else for (h = 0; x[h] != null; h++) x[h] && x[h].nodeType === 1 && n.push(C[h]);
        else n.push.apply(n, x);
      else K(x, n);
      if (H) {
        s(H, q, n, o);
        s.uniqueSort(n);
      }
      return n;
    };
    s.uniqueSort = function (h) {
      if (O) {
        i = l;
        h.sort(O);
        if (i) for (var j = 1; j < h.length; j++) h[j] === h[j - 1] && h.splice(j--, 1);
      }
      return h;
    };
    s.matches = function (h, j) {
      return s(h, null, null, j);
    };
    s.matchesSelector = function (h, j) {
      return s(j, null, null, [h]).length > 0;
    };
    s.find = function (h, j, n) {
      var o, q, r, C, x, H;
      if (!h) return [];
      q = 0;
      for (r = w.order.length; q < r; q++) {
        x = w.order[q];
        if ((C = w.leftMatch[x].exec(h))) {
          H = C[1];
          C.splice(1, 1);
          if (H.substr(H.length - 1) !== "\\") {
            C[1] = (C[1] || "").replace(m, "");
            o = w.find[x](C, j, n);
            if (o != null) {
              h = h.replace(w.match[x], "");
              break;
            }
          }
        }
      }
      o || (o = typeof j.getElementsByTagName !== "undefined" ? j.getElementsByTagName("*") : []);
      return {
        set: o,
        expr: h,
      };
    };
    s.filter = function (h, j, n, o) {
      for (var q, r, C, x, H, k, t, y, u = h, E = [], D = j, L = j && j[0] && s.isXML(j[0]); h && j.length; ) {
        for (C in w.filter)
          if ((q = w.leftMatch[C].exec(h)) != null && q[2]) {
            k = w.filter[C];
            H = q[1];
            r = false;
            q.splice(1, 1);
            if (H.substr(H.length - 1) !== "\\") {
              if (D === E) E = [];
              if (w.preFilter[C])
                if ((q = w.preFilter[C](q, D, n, E, o, L))) {
                  if (q === true) continue;
                } else r = x = true;
              if (q)
                for (t = 0; (H = D[t]) != null; t++)
                  if (H) {
                    x = k(H, q, t, D);
                    y = o ^ x;
                    if (n && x != null)
                      if (y) r = true;
                      else D[t] = false;
                    else if (y) {
                      E.push(H);
                      r = true;
                    }
                  }
              if (x !== z) {
                n || (D = E);
                h = h.replace(w.match[C], "");
                if (!r) return [];
                break;
              }
            }
          }
        if (h === u)
          if (r == null) s.error(h);
          else break;
        u = h;
      }
      return D;
    };
    s.error = function (h) {
      throw Error("Syntax error, unrecognized expression: " + h);
    };
    var A = (s.getText = function (h) {
        var j, n;
        j = h.nodeType;
        var o = "";
        if (j)
          if (j === 1 || j === 9)
            if (typeof h.textContent === "string") return h.textContent;
            else if (typeof h.innerText === "string") return h.innerText.replace(p, "");
            else for (h = h.firstChild; h; h = h.nextSibling) o += A(h);
          else {
            if (j === 3 || j === 4) return h.nodeValue;
          }
        else for (j = 0; (n = h[j]); j++) if (n.nodeType !== 8) o += A(n);
        return o;
      }),
      w = (s.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
          ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
          CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
          NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
          ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
          TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
          CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
          POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
          PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/,
        },
        leftMatch: {},
        attrMap: {
          class: "className",
          for: "htmlFor",
        },
        attrHandle: {
          href: function (h) {
            return h.getAttribute("href");
          },
          type: function (h) {
            return h.getAttribute("type");
          },
        },
        relative: {
          "+": function (h, j) {
            var n = typeof j === "string",
              o = n && !v.test(j);
            n = n && !o;
            if (o) j = j.toLowerCase();
            o = 0;
            for (var q = h.length, r; o < q; o++)
              if ((r = h[o])) {
                for (; (r = r.previousSibling) && r.nodeType !== 1; );
                h[o] = n || (r && r.nodeName.toLowerCase() === j) ? r || false : r === j;
              }
            n && s.filter(j, h, true);
          },
          ">": function (h, j) {
            var n,
              o = typeof j === "string",
              q = 0,
              r = h.length;
            if (o && !v.test(j))
              for (j = j.toLowerCase(); q < r; q++) {
                if ((n = h[q])) {
                  n = n.parentNode;
                  h[q] = n.nodeName.toLowerCase() === j ? n : false;
                }
              }
            else {
              for (; q < r; q++) if ((n = h[q])) h[q] = o ? n.parentNode : n.parentNode === j;
              o && s.filter(j, h, true);
            }
          },
          "": function (h, j, n) {
            var o,
              q = f++,
              r = b;
            if (typeof j === "string" && !v.test(j)) {
              o = j = j.toLowerCase();
              r = a;
            }
            r("parentNode", j, q, h, o, n);
          },
          "~": function (h, j, n) {
            var o,
              q = f++,
              r = b;
            if (typeof j === "string" && !v.test(j)) {
              o = j = j.toLowerCase();
              r = a;
            }
            r("previousSibling", j, q, h, o, n);
          },
        },
        find: {
          ID: function (h, j, n) {
            if (typeof j.getElementById !== "undefined" && !n) return (h = j.getElementById(h[1])) && h.parentNode ? [h] : [];
          },
          NAME: function (h, j) {
            if (typeof j.getElementsByName !== "undefined") {
              for (var n = [], o = j.getElementsByName(h[1]), q = 0, r = o.length; q < r; q++) o[q].getAttribute("name") === h[1] && n.push(o[q]);
              return n.length === 0 ? null : n;
            }
          },
          TAG: function (h, j) {
            if (typeof j.getElementsByTagName !== "undefined") return j.getElementsByTagName(h[1]);
          },
        },
        preFilter: {
          CLASS: function (h, j, n, o, q, r) {
            h = " " + h[1].replace(m, "") + " ";
            if (r) return h;
            r = 0;
            for (var C; (C = j[r]) != null; r++)
              if (C)
                if (q ^ (C.className && (" " + C.className + " ").replace(/[\t\n\r]/g, " ").indexOf(h) >= 0)) n || o.push(C);
                else if (n) j[r] = false;
            return false;
          },
          ID: function (h) {
            return h[1].replace(m, "");
          },
          TAG: function (h) {
            return h[1].replace(m, "").toLowerCase();
          },
          CHILD: function (h) {
            if (h[1] === "nth") {
              h[2] || s.error(h[0]);
              h[2] = h[2].replace(/^\+|\s*/g, "");
              var j = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
                (h[2] === "even" && "2n") || (h[2] === "odd" && "2n+1") || (!/\D/.test(h[2]) && "0n+" + h[2]) || h[2]
              );
              h[2] = j[1] + (j[2] || 1) - 0;
              h[3] = j[3] - 0;
            } else h[2] && s.error(h[0]);
            h[0] = f++;
            return h;
          },
          ATTR: function (h, j, n, o, q, r) {
            j = h[1] = h[1].replace(m, "");
            if (!r && w.attrMap[j]) h[1] = w.attrMap[j];
            h[4] = (h[4] || h[5] || "").replace(m, "");
            if (h[2] === "~=") h[4] = " " + h[4] + " ";
            return h;
          },
          PSEUDO: function (h, j, n, o, q) {
            if (h[1] === "not")
              if ((d.exec(h[3]) || "").length > 1 || /^\w/.test(h[3])) h[3] = s(h[3], null, null, j);
              else {
                h = s.filter(h[3], j, n, true ^ q);
                n || o.push.apply(o, h);
                return false;
              }
            else if (w.match.POS.test(h[0]) || w.match.CHILD.test(h[0])) return true;
            return h;
          },
          POS: function (h) {
            h.unshift(true);
            return h;
          },
        },
        filters: {
          enabled: function (h) {
            return h.disabled === false && h.type !== "hidden";
          },
          disabled: function (h) {
            return h.disabled === true;
          },
          checked: function (h) {
            return h.checked === true;
          },
          selected: function (h) {
            return h.selected === true;
          },
          parent: function (h) {
            return !!h.firstChild;
          },
          empty: function (h) {
            return !h.firstChild;
          },
          has: function (h, j, n) {
            return !!s(n[3], h).length;
          },
          header: function (h) {
            return /h\d/i.test(h.nodeName);
          },
          text: function (h) {
            var j = h.getAttribute("type"),
              n = h.type;
            return h.nodeName.toLowerCase() === "input" && "text" === n && (j === n || j === null);
          },
          radio: function (h) {
            return h.nodeName.toLowerCase() === "input" && "radio" === h.type;
          },
          checkbox: function (h) {
            return h.nodeName.toLowerCase() === "input" && "checkbox" === h.type;
          },
          file: function (h) {
            return h.nodeName.toLowerCase() === "input" && "file" === h.type;
          },
          password: function (h) {
            return h.nodeName.toLowerCase() === "input" && "password" === h.type;
          },
          submit: function (h) {
            var j = h.nodeName.toLowerCase();
            return (j === "input" || j === "button") && "submit" === h.type;
          },
          image: function (h) {
            return h.nodeName.toLowerCase() === "input" && "image" === h.type;
          },
          reset: function (h) {
            var j = h.nodeName.toLowerCase();
            return (j === "input" || j === "button") && "reset" === h.type;
          },
          button: function (h) {
            var j = h.nodeName.toLowerCase();
            return (j === "input" && "button" === h.type) || j === "button";
          },
          input: function (h) {
            return /input|select|textarea|button/i.test(h.nodeName);
          },
          focus: function (h) {
            return h === h.ownerDocument.activeElement;
          },
        },
        setFilters: {
          first: function (h, j) {
            return j === 0;
          },
          last: function (h, j, n, o) {
            return j === o.length - 1;
          },
          even: function (h, j) {
            return j % 2 === 0;
          },
          odd: function (h, j) {
            return j % 2 === 1;
          },
          lt: function (h, j, n) {
            return j < n[3] - 0;
          },
          gt: function (h, j, n) {
            return j > n[3] - 0;
          },
          nth: function (h, j, n) {
            return n[3] - 0 === j;
          },
          eq: function (h, j, n) {
            return n[3] - 0 === j;
          },
        },
        filter: {
          PSEUDO: function (h, j, n, o) {
            var q = j[1],
              r = w.filters[q];
            if (r) return r(h, n, j, o);
            else if (q === "contains") return (h.textContent || h.innerText || A([h]) || "").indexOf(j[3]) >= 0;
            else if (q === "not") {
              j = j[3];
              n = 0;
              for (o = j.length; n < o; n++) if (j[n] === h) return false;
              return true;
            } else s.error(q);
          },
          CHILD: function (h, j) {
            var n, o, q, r, C, x;
            n = j[1];
            x = h;
            switch (n) {
              case "only":
              case "first":
                for (; (x = x.previousSibling); ) if (x.nodeType === 1) return false;
                if (n === "first") return true;
                x = h;
              case "last":
                for (; (x = x.nextSibling); ) if (x.nodeType === 1) return false;
                return true;
              case "nth":
                n = j[2];
                o = j[3];
                if (n === 1 && o === 0) return true;
                q = j[0];
                if ((r = h.parentNode) && (r[e] !== q || !h.nodeIndex)) {
                  C = 0;
                  for (x = r.firstChild; x; x = x.nextSibling) if (x.nodeType === 1) x.nodeIndex = ++C;
                  r[e] = q;
                }
                x = h.nodeIndex - o;
                return n === 0 ? x === 0 : x % n === 0 && x / n >= 0;
            }
          },
          ID: function (h, j) {
            return h.nodeType === 1 && h.getAttribute("id") === j;
          },
          TAG: function (h, j) {
            return (j === "*" && h.nodeType === 1) || (!!h.nodeName && h.nodeName.toLowerCase() === j);
          },
          CLASS: function (h, j) {
            return (" " + (h.className || h.getAttribute("class")) + " ").indexOf(j) > -1;
          },
          ATTR: function (h, j) {
            var n = j[1];
            n = s.attr ? s.attr(h, n) : w.attrHandle[n] ? w.attrHandle[n](h) : h[n] != null ? h[n] : h.getAttribute(n);
            var o = n + "",
              q = j[2],
              r = j[4];
            return n == null
              ? q === "!="
              : !q && s.attr
              ? n != null
              : q === "="
              ? o === r
              : q === "*="
              ? o.indexOf(r) >= 0
              : q === "~="
              ? (" " + o + " ").indexOf(r) >= 0
              : !r
              ? o && n !== false
              : q === "!="
              ? o !== r
              : q === "^="
              ? o.indexOf(r) === 0
              : q === "$="
              ? o.substr(o.length - r.length) === r
              : q === "|="
              ? o === r || o.substr(0, r.length + 1) === r + "-"
              : false;
          },
          POS: function (h, j, n, o) {
            var q = w.setFilters[j[2]];
            if (q) return q(h, n, j, o);
          },
        },
      }),
      F = w.match.POS,
      J = function (h, j) {
        return "\\" + (j - 0 + 1);
      };
    for (var M in w.match) {
      w.match[M] = RegExp(w.match[M].source + /(?![^\[]*\])(?![^\(]*\))/.source);
      w.leftMatch[M] = RegExp(/(^(?:.|\r|\n)*?)/.source + w.match[M].source.replace(/\\(\d+)/g, J));
    }
    var K = function (h, j) {
      h = Array.prototype.slice.call(h, 0);
      if (j) {
        j.push.apply(j, h);
        return j;
      }
      return h;
    };
    try {
      Array.prototype.slice.call(B.documentElement.childNodes, 0);
    } catch (T) {
      K = function (h, j) {
        var n = 0,
          o = j || [];
        if (g.call(h) === "[object Array]") Array.prototype.push.apply(o, h);
        else if (typeof h.length === "number") for (var q = h.length; n < q; n++) o.push(h[n]);
        else for (; h[n]; n++) o.push(h[n]);
        return o;
      };
    }
    var O, G;
    if (B.documentElement.compareDocumentPosition)
      O = function (h, j) {
        if (h === j) {
          i = true;
          return 0;
        }
        if (!h.compareDocumentPosition || !j.compareDocumentPosition) return h.compareDocumentPosition ? -1 : 1;
        return h.compareDocumentPosition(j) & 4 ? -1 : 1;
      };
    else {
      O = function (h, j) {
        if (h === j) {
          i = true;
          return 0;
        } else if (h.sourceIndex && j.sourceIndex) return h.sourceIndex - j.sourceIndex;
        var n,
          o,
          q = [],
          r = [];
        n = h.parentNode;
        o = j.parentNode;
        var C = n;
        if (n === o) return G(h, j);
        else if (n) {
          if (!o) return 1;
        } else return -1;
        for (; C; ) {
          q.unshift(C);
          C = C.parentNode;
        }
        for (C = o; C; ) {
          r.unshift(C);
          C = C.parentNode;
        }
        n = q.length;
        o = r.length;
        for (C = 0; C < n && C < o; C++) if (q[C] !== r[C]) return G(q[C], r[C]);
        return C === n ? G(h, r[C], -1) : G(q[C], j, 1);
      };
      G = function (h, j, n) {
        if (h === j) return n;
        for (h = h.nextSibling; h; ) {
          if (h === j) return -1;
          h = h.nextSibling;
        }
        return 1;
      };
    }
    (function () {
      var h = B.createElement("div"),
        j = "script" + new Date().getTime(),
        n = B.documentElement;
      h.innerHTML = "<a name='" + j + "'/>";
      n.insertBefore(h, n.firstChild);
      if (B.getElementById(j)) {
        w.find.ID = function (o, q, r) {
          if (typeof q.getElementById !== "undefined" && !r)
            return (q = q.getElementById(o[1]))
              ? q.id === o[1] || (typeof q.getAttributeNode !== "undefined" && q.getAttributeNode("id").nodeValue === o[1])
                ? [q]
                : z
              : [];
        };
        w.filter.ID = function (o, q) {
          var r = typeof o.getAttributeNode !== "undefined" && o.getAttributeNode("id");
          return o.nodeType === 1 && r && r.nodeValue === q;
        };
      }
      n.removeChild(h);
      n = h = null;
    })();
    (function () {
      var h = B.createElement("div");
      h.appendChild(B.createComment(""));
      if (h.getElementsByTagName("*").length > 0)
        w.find.TAG = function (j, n) {
          var o = n.getElementsByTagName(j[1]);
          if (j[1] === "*") {
            for (var q = [], r = 0; o[r]; r++) o[r].nodeType === 1 && q.push(o[r]);
            o = q;
          }
          return o;
        };
      h.innerHTML = "<a href='#'></a>";
      if (h.firstChild && typeof h.firstChild.getAttribute !== "undefined" && h.firstChild.getAttribute("href") !== "#")
        w.attrHandle.href = function (j) {
          return j.getAttribute("href", 2);
        };
      h = null;
    })();
    B.querySelectorAll &&
      (function () {
        var h = s,
          j = B.createElement("div");
        j.innerHTML = "<p class='TEST'></p>";
        if (!(j.querySelectorAll && j.querySelectorAll(".TEST").length === 0)) {
          s = function (o, q, r, C) {
            q = q || B;
            if (!C && !s.isXML(q)) {
              var x = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(o);
              if (x && (q.nodeType === 1 || q.nodeType === 9))
                if (x[1]) return K(q.getElementsByTagName(o), r);
                else if (x[2] && w.find.CLASS && q.getElementsByClassName) return K(q.getElementsByClassName(x[2]), r);
              if (q.nodeType === 9) {
                if (o === "body" && q.body) return K([q.body], r);
                else if (x && x[3]) {
                  var H = q.getElementById(x[3]);
                  if (H && H.parentNode) {
                    if (H.id === x[3]) return K([H], r);
                  } else return K([], r);
                }
                try {
                  return K(q.querySelectorAll(o), r);
                } catch (k) {}
              } else if (q.nodeType === 1 && q.nodeName.toLowerCase() !== "object") {
                x = q;
                var t = (H = q.getAttribute("id")) || "__sizzle__",
                  y = q.parentNode,
                  u = /^\s*[+~]/.test(o);
                if (H) t = t.replace(/'/g, "\\$&");
                else q.setAttribute("id", t);
                if (u && y) q = q.parentNode;
                try {
                  if (!u || y) return K(q.querySelectorAll("[id='" + t + "'] " + o), r);
                } catch (E) {
                } finally {
                  H || x.removeAttribute("id");
                }
              }
            }
            return h(o, q, r, C);
          };
          for (var n in h) s[n] = h[n];
          j = null;
        }
      })();
    (function () {
      var h = B.documentElement,
        j = h.matchesSelector || h.mozMatchesSelector || h.webkitMatchesSelector || h.msMatchesSelector;
      if (j) {
        var n = !j.call(B.createElement("div"), "div"),
          o = false;
        try {
          j.call(B.documentElement, "[test!='']:sizzle");
        } catch (q) {
          o = true;
        }
        s.matchesSelector = function (r, C) {
          C = C.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
          if (!s.isXML(r))
            try {
              if (o || (!w.match.PSEUDO.test(C) && !/!=/.test(C))) {
                var x = j.call(r, C);
                if (x || !n || (r.document && r.document.nodeType !== 11)) return x;
              }
            } catch (H) {}
          return s(C, null, null, [r]).length > 0;
        };
      }
    })();
    (function () {
      var h = B.createElement("div");
      h.innerHTML = "<div class='test e'></div><div class='test'></div>";
      if (!(!h.getElementsByClassName || h.getElementsByClassName("e").length === 0)) {
        h.lastChild.className = "e";
        if (h.getElementsByClassName("e").length !== 1) {
          w.order.splice(1, 0, "CLASS");
          w.find.CLASS = function (j, n, o) {
            if (typeof n.getElementsByClassName !== "undefined" && !o) return n.getElementsByClassName(j[1]);
          };
          h = null;
        }
      }
    })();
    s.contains = B.documentElement.contains
      ? function (h, j) {
          return h !== j && (h.contains ? h.contains(j) : true);
        }
      : B.documentElement.compareDocumentPosition
      ? function (h, j) {
          return !!(h.compareDocumentPosition(j) & 16);
        }
      : function () {
          return false;
        };
    s.isXML = function (h) {
      return (h = (h ? h.ownerDocument || h : 0).documentElement) ? h.nodeName !== "HTML" : false;
    };
    var Q = function (h, j, n) {
      var o,
        q = [],
        r = "";
      for (j = j.nodeType ? [j] : j; (o = w.match.PSEUDO.exec(h)); ) {
        r += o[0];
        h = h.replace(w.match.PSEUDO, "");
      }
      h = w.relative[h] ? h + "*" : h;
      o = 0;
      for (var C = j.length; o < C; o++) s(h, j[o], q, n);
      return s.filter(r, q);
    };
    s.attr = c.attr;
    s.selectors.attrMap = {};
    c.find = s;
    c.expr = s.selectors;
    c.expr[":"] = c.expr.filters;
    c.unique = s.uniqueSort;
    c.text = s.getText;
    c.isXMLDoc = s.isXML;
    c.contains = s.contains;
  })();
  var Lb = /Until$/,
    Mb = /^(?:parents|prevUntil|prevAll)/,
    Nb = /,/,
    tb = /^.[^:#\[\.,]*$/,
    Ob = Array.prototype.slice,
    ab = c.expr.match.POS,
    Pb = {
      children: true,
      contents: true,
      next: true,
      prev: true,
    };
  c.fn.extend({
    find: function (a) {
      var b = this,
        d,
        e;
      if (typeof a !== "string")
        return c(a).filter(function () {
          d = 0;
          for (e = b.length; d < e; d++) if (c.contains(b[d], this)) return true;
        });
      var f = this.pushStack("", "find", a),
        g,
        i,
        l;
      d = 0;
      for (e = this.length; d < e; d++) {
        g = f.length;
        c.find(a, this[d], f);
        if (d > 0)
          for (i = g; i < f.length; i++)
            for (l = 0; l < g; l++)
              if (f[l] === f[i]) {
                f.splice(i--, 1);
                break;
              }
      }
      return f;
    },
    has: function (a) {
      var b = c(a);
      return this.filter(function () {
        for (var d = 0, e = b.length; d < e; d++) if (c.contains(this, b[d])) return true;
      });
    },
    not: function (a) {
      return this.pushStack(Ea(this, a, false), "not", a);
    },
    filter: function (a) {
      return this.pushStack(Ea(this, a, true), "filter", a);
    },
    is: function (a) {
      return (
        !!a &&
        (typeof a === "string" ? (ab.test(a) ? c(a, this.context).index(this[0]) >= 0 : c.filter(a, this).length > 0) : this.filter(a).length > 0)
      );
    },
    closest: function (a, b) {
      var d = [],
        e,
        f,
        g = this[0];
      if (c.isArray(a)) {
        for (f = 1; g && g.ownerDocument && g !== b; ) {
          for (e = 0; e < a.length; e++)
            c(g).is(a[e]) &&
              d.push({
                selector: a[e],
                elem: g,
                level: f,
              });
          g = g.parentNode;
          f++;
        }
        return d;
      }
      var i = ab.test(a) || typeof a !== "string" ? c(a, b || this.context) : 0;
      e = 0;
      for (f = this.length; e < f; e++)
        for (g = this[e]; g; )
          if (i ? i.index(g) > -1 : c.find.matchesSelector(g, a)) {
            d.push(g);
            break;
          } else {
            g = g.parentNode;
            if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break;
          }
      d = d.length > 1 ? c.unique(d) : d;
      return this.pushStack(d, "closest", a);
    },
    index: function (a) {
      if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
      if (typeof a === "string") return c.inArray(this[0], c(a));
      return c.inArray(a.jquery ? a[0] : a, this);
    },
    add: function (a, b) {
      var d = typeof a === "string" ? c(a, b) : c.makeArray(a && a.nodeType ? [a] : a),
        e = c.merge(this.get(), d);
      return this.pushStack(
        !d[0] || !d[0].parentNode || d[0].parentNode.nodeType === 11 || !e[0] || !e[0].parentNode || e[0].parentNode.nodeType === 11 ? e : c.unique(e)
      );
    },
    andSelf: function () {
      return this.add(this.prevObject);
    },
  });
  c.each(
    {
      parent: function (a) {
        return (a = a.parentNode) && a.nodeType !== 11 ? a : null;
      },
      parents: function (a) {
        return c.dir(a, "parentNode");
      },
      parentsUntil: function (a, b, d) {
        return c.dir(a, "parentNode", d);
      },
      next: function (a) {
        return c.nth(a, 2, "nextSibling");
      },
      prev: function (a) {
        return c.nth(a, 2, "previousSibling");
      },
      nextAll: function (a) {
        return c.dir(a, "nextSibling");
      },
      prevAll: function (a) {
        return c.dir(a, "previousSibling");
      },
      nextUntil: function (a, b, d) {
        return c.dir(a, "nextSibling", d);
      },
      prevUntil: function (a, b, d) {
        return c.dir(a, "previousSibling", d);
      },
      siblings: function (a) {
        return c.sibling(a.parentNode.firstChild, a);
      },
      children: function (a) {
        return c.sibling(a.firstChild);
      },
      contents: function (a) {
        return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes);
      },
    },
    function (a, b) {
      c.fn[a] = function (d, e) {
        var f = c.map(this, b, d);
        Lb.test(a) || (e = d);
        if (e && typeof e === "string") f = c.filter(e, f);
        f = this.length > 1 && !Pb[a] ? c.unique(f) : f;
        if ((this.length > 1 || Nb.test(e)) && Mb.test(a)) f = f.reverse();
        return this.pushStack(f, a, Ob.call(arguments).join(","));
      };
    }
  );
  c.extend({
    filter: function (a, b, d) {
      if (d) a = ":not(" + a + ")";
      return b.length === 1 ? (c.find.matchesSelector(b[0], a) ? [b[0]] : []) : c.find.matches(a, b);
    },
    dir: function (a, b, d) {
      var e = [];
      for (a = a[b]; a && a.nodeType !== 9 && (d === z || a.nodeType !== 1 || !c(a).is(d)); ) {
        a.nodeType === 1 && e.push(a);
        a = a[b];
      }
      return e;
    },
    nth: function (a, b, d) {
      b = b || 1;
      for (var e = 0; a; a = a[d]) if (a.nodeType === 1 && ++e === b) break;
      return a;
    },
    sibling: function (a, b) {
      for (var d = []; a; a = a.nextSibling) a.nodeType === 1 && a !== b && d.push(a);
      return d;
    },
  });
  var Ga =
      "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    Qb = / jQuery\d+="(?:\d+|null)"/g,
    xa = /^\s+/,
    bb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    cb = /<([\w:]+)/,
    Rb = /<tbody/i,
    Sb = /<|&#?\w+;/,
    Tb = /<(?:script|style)/i,
    Ub = /<(?:script|object|embed|option|style)/i,
    db = RegExp("<(?:" + Ga + ")", "i"),
    eb = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Vb = /\/(java|ecma)script/i,
    vb = /^\s*<!(?:\[CDATA\[|\-\-)/,
    P = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      area: [1, "<map>", "</map>"],
      _default: [0, "", ""],
    },
    fb = Fa(B);
  P.optgroup = P.option;
  P.tbody = P.tfoot = P.colgroup = P.caption = P.thead;
  P.th = P.td;
  if (!c.support.htmlSerialize) P._default = [1, "div<div>", "</div>"];
  c.fn.extend({
    text: function (a) {
      if (c.isFunction(a))
        return this.each(function (b) {
          var d = c(this);
          d.text(a.call(this, b, d.text()));
        });
      if (typeof a !== "object" && a !== z) return this.empty().append(((this[0] && this[0].ownerDocument) || B).createTextNode(a));
      return c.text(this);
    },
    wrapAll: function (a) {
      if (c.isFunction(a))
        return this.each(function (d) {
          c(this).wrapAll(a.call(this, d));
        });
      if (this[0]) {
        var b = c(a, this[0].ownerDocument).eq(0).clone(true);
        this[0].parentNode && b.insertBefore(this[0]);
        b.map(function () {
          for (var d = this; d.firstChild && d.firstChild.nodeType === 1; ) d = d.firstChild;
          return d;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (a) {
      if (c.isFunction(a))
        return this.each(function (b) {
          c(this).wrapInner(a.call(this, b));
        });
      return this.each(function () {
        var b = c(this),
          d = b.contents();
        d.length ? d.wrapAll(a) : b.append(a);
      });
    },
    wrap: function (a) {
      var b = c.isFunction(a);
      return this.each(function (d) {
        c(this).wrapAll(b ? a.call(this, d) : a);
      });
    },
    unwrap: function () {
      return this.parent()
        .each(function () {
          c.nodeName(this, "body") || c(this).replaceWith(this.childNodes);
        })
        .end();
    },
    append: function () {
      return this.domManip(arguments, true, function (a) {
        this.nodeType === 1 && this.appendChild(a);
      });
    },
    prepend: function () {
      return this.domManip(arguments, true, function (a) {
        this.nodeType === 1 && this.insertBefore(a, this.firstChild);
      });
    },
    before: function () {
      if (this[0] && this[0].parentNode)
        return this.domManip(arguments, false, function (b) {
          this.parentNode.insertBefore(b, this);
        });
      else if (arguments.length) {
        var a = c.clean(arguments);
        a.push.apply(a, this.toArray());
        return this.pushStack(a, "before", arguments);
      }
    },
    after: function () {
      if (this[0] && this[0].parentNode)
        return this.domManip(arguments, false, function (b) {
          this.parentNode.insertBefore(b, this.nextSibling);
        });
      else if (arguments.length) {
        var a = this.pushStack(this, "after", arguments);
        a.push.apply(a, c.clean(arguments));
        return a;
      }
    },
    remove: function (a, b) {
      for (var d = 0, e; (e = this[d]) != null; d++)
        if (!a || c.filter(a, [e]).length) {
          if (!b && e.nodeType === 1) {
            c.cleanData(e.getElementsByTagName("*"));
            c.cleanData([e]);
          }
          e.parentNode && e.parentNode.removeChild(e);
        }
      return this;
    },
    empty: function () {
      for (var a = 0, b; (b = this[a]) != null; a++)
        for (b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*")); b.firstChild; ) b.removeChild(b.firstChild);
      return this;
    },
    clone: function (a, b) {
      a = a == null ? false : a;
      b = b == null ? a : b;
      return this.map(function () {
        return c.clone(this, a, b);
      });
    },
    html: function (a) {
      if (a === z) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Qb, "") : null;
      else if (
        typeof a === "string" &&
        !Tb.test(a) &&
        (c.support.leadingWhitespace || !xa.test(a)) &&
        !P[(cb.exec(a) || ["", ""])[1].toLowerCase()]
      ) {
        a = a.replace(bb, "<$1></$2>");
        try {
          for (var b = 0, d = this.length; b < d; b++)
            if (this[b].nodeType === 1) {
              c.cleanData(this[b].getElementsByTagName("*"));
              this[b].innerHTML = a;
            }
        } catch (e) {
          this.empty().append(a);
        }
      } else
        c.isFunction(a)
          ? this.each(function (f) {
              var g = c(this);
              g.html(a.call(this, f, g.html()));
            })
          : this.empty().append(a);
      return this;
    },
    replaceWith: function (a) {
      if (this[0] && this[0].parentNode) {
        if (c.isFunction(a))
          return this.each(function (b) {
            var d = c(this),
              e = d.html();
            d.replaceWith(a.call(this, b, e));
          });
        if (typeof a !== "string") a = c(a).detach();
        return this.each(function () {
          var b = this.nextSibling,
            d = this.parentNode;
          c(this).remove();
          b ? c(b).before(a) : c(d).append(a);
        });
      } else return this.length ? this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a) : this;
    },
    detach: function (a) {
      return this.remove(a, true);
    },
    domManip: function (a, b, d) {
      var e,
        f,
        g,
        i = a[0],
        l = [];
      if (!c.support.checkClone && arguments.length === 3 && typeof i === "string" && eb.test(i))
        return this.each(function () {
          c(this).domManip(a, b, d, true);
        });
      if (c.isFunction(i))
        return this.each(function (v) {
          var s = c(this);
          a[0] = i.call(this, v, b ? s.html() : z);
          s.domManip(a, b, d);
        });
      if (this[0]) {
        e = i && i.parentNode;
        e =
          c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length
            ? {
                fragment: e,
              }
            : c.buildFragment(a, this, l);
        g = e.fragment;
        if ((f = g.childNodes.length === 1 ? (g = g.firstChild) : g.firstChild)) {
          b = b && c.nodeName(f, "tr");
          f = 0;
          for (var m = this.length, p = m - 1; f < m; f++)
            d.call(
              b
                ? c.nodeName(this[f], "table")
                  ? this[f].getElementsByTagName("tbody")[0] || this[f].appendChild(this[f].ownerDocument.createElement("tbody"))
                  : this[f]
                : this[f],
              e.cacheable || (m > 1 && f < p) ? c.clone(g, true, true) : g
            );
        }
        l.length && c.each(l, ub);
      }
      return this;
    },
  });
  c.buildFragment = function (a, b, d) {
    var e,
      f,
      g,
      i,
      l = a[0];
    if (b && b[0]) i = b[0].ownerDocument || b[0];
    i.createDocumentFragment || (i = B);
    if (
      a.length === 1 &&
      typeof l === "string" &&
      l.length < 512 &&
      i === B &&
      l.charAt(0) === "<" &&
      !Ub.test(l) &&
      (c.support.checkClone || !eb.test(l)) &&
      (c.support.html5Clone || !db.test(l))
    ) {
      f = true;
      if ((g = c.fragments[l]) && g !== 1) e = g;
    }
    if (!e) {
      e = i.createDocumentFragment();
      c.clean(a, i, e, d);
    }
    if (f) c.fragments[l] = g ? e : 1;
    return {
      fragment: e,
      cacheable: f,
    };
  };
  c.fragments = {};
  c.each(
    {
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith",
    },
    function (a, b) {
      c.fn[a] = function (d) {
        var e = [];
        d = c(d);
        var f = this.length === 1 && this[0].parentNode;
        if (f && f.nodeType === 11 && f.childNodes.length === 1 && d.length === 1) {
          d[b](this[0]);
          return this;
        } else {
          f = 0;
          for (var g = d.length; f < g; f++) {
            var i = (f > 0 ? this.clone(true) : this).get();
            c(d[f])[b](i);
            e = e.concat(i);
          }
          return this.pushStack(e, a, d.selector);
        }
      };
    }
  );
  c.extend({
    clone: function (a, b, d) {
      var e, f, g;
      if (c.support.html5Clone || !db.test("<" + a.nodeName)) e = a.cloneNode(true);
      else {
        e = B.createElement("div");
        fb.appendChild(e);
        e.innerHTML = a.outerHTML;
        e = e.firstChild;
      }
      var i = e;
      if ((!c.support.noCloneEvent || !c.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !c.isXMLDoc(a)) {
        Ia(a, i);
        e = ia(a);
        f = ia(i);
        for (g = 0; e[g]; ++g) f[g] && Ia(e[g], f[g]);
      }
      if (b) {
        Ha(a, i);
        if (d) {
          e = ia(a);
          f = ia(i);
          for (g = 0; e[g]; ++g) Ha(e[g], f[g]);
        }
      }
      return i;
    },
    clean: function (a, b, d, e) {
      b = b || B;
      if (typeof b.createElement === "undefined") b = b.ownerDocument || (b[0] && b[0].ownerDocument) || B;
      for (var f = [], g, i = 0, l; (l = a[i]) != null; i++) {
        if (typeof l === "number") l += "";
        if (l) {
          if (typeof l === "string")
            if (Sb.test(l)) {
              l = l.replace(bb, "<$1></$2>");
              g = (cb.exec(l) || ["", ""])[1].toLowerCase();
              var m = P[g] || P._default,
                p = m[0],
                v = b.createElement("div");
              b === B ? fb.appendChild(v) : Fa(b).appendChild(v);
              for (v.innerHTML = m[1] + l + m[2]; p--; ) v = v.lastChild;
              if (!c.support.tbody) {
                p = Rb.test(l);
                m = g === "table" && !p ? v.firstChild && v.firstChild.childNodes : m[1] === "<table>" && !p ? v.childNodes : [];
                for (g = m.length - 1; g >= 0; --g) c.nodeName(m[g], "tbody") && !m[g].childNodes.length && m[g].parentNode.removeChild(m[g]);
              }
              !c.support.leadingWhitespace && xa.test(l) && v.insertBefore(b.createTextNode(xa.exec(l)[0]), v.firstChild);
              l = v.childNodes;
            } else l = b.createTextNode(l);
          var s;
          if (!c.support.appendChecked)
            if (l[0] && typeof (s = l.length) === "number") for (g = 0; g < s; g++) Ka(l[g]);
            else Ka(l);
          if (l.nodeType) f.push(l);
          else f = c.merge(f, l);
        }
      }
      if (d) {
        a = function (A) {
          return !A.type || Vb.test(A.type);
        };
        for (i = 0; f[i]; i++)
          if (e && c.nodeName(f[i], "script") && (!f[i].type || f[i].type.toLowerCase() === "text/javascript"))
            e.push(f[i].parentNode ? f[i].parentNode.removeChild(f[i]) : f[i]);
          else {
            if (f[i].nodeType === 1) {
              b = c.grep(f[i].getElementsByTagName("script"), a);
              f.splice.apply(f, [i + 1, 0].concat(b));
            }
            d.appendChild(f[i]);
          }
      }
      return f;
    },
    cleanData: function (a) {
      for (var b, d, e = c.cache, f = c.event.special, g = c.support.deleteExpando, i = 0, l; (l = a[i]) != null; i++)
        if (!(l.nodeName && c.noData[l.nodeName.toLowerCase()]))
          if ((d = l[c.expando])) {
            if ((b = e[d]) && b.events) {
              for (var m in b.events) f[m] ? c.event.remove(l, m) : c.removeEvent(l, m, b.handle);
              if (b.handle) b.handle.elem = null;
            }
            if (g) delete l[c.expando];
            else l.removeAttribute && l.removeAttribute(c.expando);
            delete e[d];
          }
    },
  });
  var ya = /alpha\([^)]*\)/i,
    Wb = /opacity=([^)]*)/,
    Xb = /([A-Z]|^ms)/g,
    gb = /^-?\d+(?:px)?$/i,
    Yb = /^-?\d/,
    Zb = /^([\-+])=([\-+.\de]+)/,
    $b = {
      position: "absolute",
      visibility: "hidden",
      display: "block",
    },
    wb = ["Left", "Right"],
    xb = ["Top", "Bottom"],
    aa,
    hb,
    ib;
  c.fn.css = function (a, b) {
    if (arguments.length === 2 && b === z) return this;
    return c.access(this, a, b, true, function (d, e, f) {
      return f !== z ? c.style(d, e, f) : c.css(d, e);
    });
  };
  c.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var d = aa(a, "opacity", "opacity");
            return d === "" ? "1" : d;
          } else return a.style.opacity;
        },
      },
    },
    cssNumber: {
      fillOpacity: true,
      fontWeight: true,
      lineHeight: true,
      opacity: true,
      orphans: true,
      widows: true,
      zIndex: true,
      zoom: true,
    },
    cssProps: {
      float: c.support.cssFloat ? "cssFloat" : "styleFloat",
    },
    style: function (a, b, d, e) {
      if (!(!a || a.nodeType === 3 || a.nodeType === 8 || !a.style)) {
        var f,
          g = c.camelCase(b),
          i = a.style,
          l = c.cssHooks[g];
        b = c.cssProps[g] || g;
        if (d !== z) {
          e = typeof d;
          if (e === "string" && (f = Zb.exec(d))) {
            d = +(f[1] + 1) * +f[2] + parseFloat(c.css(a, b));
            e = "number";
          }
          if (!(d == null || (e === "number" && isNaN(d)))) {
            if (e === "number" && !c.cssNumber[g]) d += "px";
            if (!l || !("set" in l) || (d = l.set(a, d)) !== z)
              try {
                i[b] = d;
              } catch (m) {}
          }
        } else {
          if (l && "get" in l && (f = l.get(a, false, e)) !== z) return f;
          return i[b];
        }
      }
    },
    css: function (a, b, d) {
      var e, f;
      b = c.camelCase(b);
      f = c.cssHooks[b];
      b = c.cssProps[b] || b;
      if (b === "cssFloat") b = "float";
      if (f && "get" in f && (e = f.get(a, true, d)) !== z) return e;
      else if (aa) return aa(a, b);
    },
    swap: function (a, b, d) {
      var e = {};
      for (var f in b) {
        e[f] = a.style[f];
        a.style[f] = b[f];
      }
      d.call(a);
      for (f in b) a.style[f] = e[f];
    },
  });
  c.curCSS = c.css;
  c.each(["height", "width"], function (a, b) {
    c.cssHooks[b] = {
      get: function (d, e, f) {
        var g;
        if (e) {
          if (d.offsetWidth !== 0) return La(d, b, f);
          else
            c.swap(d, $b, function () {
              g = La(d, b, f);
            });
          return g;
        }
      },
      set: function (d, e) {
        if (gb.test(e)) {
          e = parseFloat(e);
          if (e >= 0) return e + "px";
        } else return e;
      },
    };
  });
  if (!c.support.opacity)
    c.cssHooks.opacity = {
      get: function (a, b) {
        return Wb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : "";
      },
      set: function (a, b) {
        var d = a.style,
          e = a.currentStyle,
          f = c.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
          g = (e && e.filter) || d.filter || "";
        d.zoom = 1;
        if (b >= 1 && c.trim(g.replace(ya, "")) === "") {
          d.removeAttribute("filter");
          if (e && !e.filter) return;
        }
        d.filter = ya.test(g) ? g.replace(ya, f) : g + " " + f;
      },
    };
  c(function () {
    if (!c.support.reliableMarginRight)
      c.cssHooks.marginRight = {
        get: function (a, b) {
          var d;
          c.swap(
            a,
            {
              display: "inline-block",
            },
            function () {
              d = b ? aa(a, "margin-right", "marginRight") : a.style.marginRight;
            }
          );
          return d;
        },
      };
  });
  if (B.defaultView && B.defaultView.getComputedStyle)
    hb = function (a, b) {
      var d, e, f;
      b = b.replace(Xb, "-$1").toLowerCase();
      if ((e = a.ownerDocument.defaultView) && (f = e.getComputedStyle(a, null))) {
        d = f.getPropertyValue(b);
        if (d === "" && !c.contains(a.ownerDocument.documentElement, a)) d = c.style(a, b);
      }
      return d;
    };
  if (B.documentElement.currentStyle)
    ib = function (a, b) {
      var d,
        e,
        f = a.currentStyle && a.currentStyle[b],
        g = a.style;
      if (f === null && g && (d = g[b])) f = d;
      if (!gb.test(f) && Yb.test(f)) {
        d = g.left;
        if ((e = a.runtimeStyle && a.runtimeStyle.left)) a.runtimeStyle.left = a.currentStyle.left;
        g.left = b === "fontSize" ? "1em" : f || 0;
        f = g.pixelLeft + "px";
        g.left = d;
        if (e) a.runtimeStyle.left = e;
      }
      return f === "" ? "auto" : f;
    };
  aa = hb || ib;
  if (c.expr && c.expr.filters) {
    c.expr.filters.hidden = function (a) {
      var b = a.offsetHeight;
      return (
        (a.offsetWidth === 0 && b === 0) || (!c.support.reliableHiddenOffsets && ((a.style && a.style.display) || c.css(a, "display")) === "none")
      );
    };
    c.expr.filters.visible = function (a) {
      return !c.expr.filters.hidden(a);
    };
  }
  var ac = /%20/g,
    yb = /\[\]$/,
    jb = /\r?\n/g,
    bc = /#.*$/,
    cc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    dc = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    ec = /^(?:GET|HEAD)$/,
    fc = /^\/\//,
    kb = /\?/,
    gc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    hc = /^(?:select|textarea)/i,
    Na = /\s+/,
    ic = /([?&])_=[^&]*/,
    lb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
    mb = c.fn.load,
    ra = {},
    nb = {},
    X,
    Y,
    ob = ["*/"] + ["*"];
  try {
    X = Bb.href;
  } catch (qc) {
    X = B.createElement("a");
    X.href = "";
    X = X.href;
  }
  Y = lb.exec(X.toLowerCase()) || [];
  c.fn.extend({
    load: function (a, b, d) {
      if (typeof a !== "string" && mb) return mb.apply(this, arguments);
      else if (!this.length) return this;
      var e = a.indexOf(" ");
      if (e >= 0) {
        var f = a.slice(e, a.length);
        a = a.slice(0, e);
      }
      e = "GET";
      if (b)
        if (c.isFunction(b)) {
          d = b;
          b = z;
        } else if (typeof b === "object") {
          b = c.param(b, c.ajaxSettings.traditional);
          e = "POST";
        }
      var g = this;
      c.ajax({
        url: a,
        type: e,
        dataType: "html",
        data: b,
        complete: function (i, l, m) {
          m = i.responseText;
          if (i.isResolved()) {
            i.done(function (p) {
              m = p;
            });
            g.html(f ? c("<div>").append(m.replace(gc, "")).find(f) : m);
          }
          d && g.each(d, [m, l, i]);
        },
      });
      return this;
    },
    serialize: function () {
      return c.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        return this.elements ? c.makeArray(this.elements) : this;
      })
        .filter(function () {
          return this.name && !this.disabled && (this.checked || hc.test(this.nodeName) || dc.test(this.type));
        })
        .map(function (a, b) {
          var d = c(this).val();
          return d == null
            ? null
            : c.isArray(d)
            ? c.map(d, function (e) {
                return {
                  name: b.name,
                  value: e.replace(jb, "\r\n"),
                };
              })
            : {
                name: b.name,
                value: d.replace(jb, "\r\n"),
              };
        })
        .get();
    },
  });
  c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
    c.fn[b] = function (d) {
      return this.on(b, d);
    };
  });
  c.each(["get", "post"], function (a, b) {
    c[b] = function (d, e, f, g) {
      if (c.isFunction(e)) {
        g = g || f;
        f = e;
        e = z;
      }
      return c.ajax({
        type: b,
        url: d,
        data: e,
        success: f,
        dataType: g,
      });
    };
  });
  c.extend({
    getScript: function (a, b) {
      return c.get(a, z, b, "script");
    },
    getJSON: function (a, b, d) {
      return c.get(a, b, d, "json");
    },
    ajaxSetup: function (a, b) {
      if (b) Oa(a, c.ajaxSettings);
      else {
        b = a;
        a = c.ajaxSettings;
      }
      Oa(a, b);
      return a;
    },
    ajaxSettings: {
      url: X,
      isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(Y[1]),
      global: true,
      type: "GET",
      contentType: "application/x-www-form-urlencoded",
      processData: true,
      async: true,
      accepts: {
        xml: "application/xml, text/xml",
        html: "text/html",
        text: "text/plain",
        json: "application/json, text/javascript",
        "*": ob,
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/,
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
      },
      converters: {
        "* text": I.String,
        "text html": true,
        "text json": c.parseJSON,
        "text xml": c.parseXML,
      },
      flatOptions: {
        context: true,
        url: true,
      },
    },
    ajaxPrefilter: Ma(ra),
    ajaxTransport: Ma(nb),
    ajax: function (a, b) {
      function d(j, n, o, q) {
        if (K !== 2) {
          K = 2;
          J && clearTimeout(J);
          F = z;
          A = q || "";
          G.readyState = j > 0 ? 4 : 0;
          var r, C, x;
          q = n;
          if (o) {
            var H = e,
              k = G,
              t = H.contents,
              y = H.dataTypes,
              u = H.responseFields,
              E,
              D,
              L,
              N;
            for (D in u) if (D in o) k[u[D]] = o[D];
            for (; y[0] === "*"; ) {
              y.shift();
              if (E === z) E = H.mimeType || k.getResponseHeader("content-type");
            }
            if (E)
              for (D in t)
                if (t[D] && t[D].test(E)) {
                  y.unshift(D);
                  break;
                }
            if (y[0] in o) L = y[0];
            else {
              for (D in o) {
                if (!y[0] || H.converters[D + " " + y[0]]) {
                  L = D;
                  break;
                }
                N || (N = D);
              }
              L = L || N;
            }
            if (L) {
              L !== y[0] && y.unshift(L);
              o = o[L];
            } else o = void 0;
          } else o = z;
          o = o;
          if ((j >= 200 && j < 300) || j === 304) {
            if (e.ifModified) {
              if ((E = G.getResponseHeader("Last-Modified"))) c.lastModified[p] = E;
              if ((E = G.getResponseHeader("Etag"))) c.etag[p] = E;
            }
            if (j === 304) {
              q = "notmodified";
              r = true;
            } else
              try {
                E = e;
                o = o;
                if (E.dataFilter) o = E.dataFilter(o, E.dataType);
                var W = E.dataTypes;
                D = {};
                var ga,
                  ma,
                  jc = W.length,
                  na,
                  U = W[0],
                  da,
                  za,
                  V,
                  Z,
                  ea;
                for (ga = 1; ga < jc; ga++) {
                  if (ga === 1) for (ma in E.converters) if (typeof ma === "string") D[ma.toLowerCase()] = E.converters[ma];
                  da = U;
                  U = W[ga];
                  if (U === "*") U = da;
                  else if (da !== "*" && da !== U) {
                    za = da + " " + U;
                    V = D[za] || D["* " + U];
                    if (!V) {
                      ea = z;
                      for (Z in D) {
                        na = Z.split(" ");
                        if (na[0] === da || na[0] === "*")
                          if ((ea = D[na[1] + " " + U])) {
                            Z = D[Z];
                            if (Z === true) V = ea;
                            else if (ea === true) V = Z;
                            break;
                          }
                      }
                    }
                    V || ea || c.error("No conversion from " + za.replace(" ", " to "));
                    if (V !== true) o = V ? V(o) : ea(Z(o));
                  }
                }
                C = o;
                q = "success";
                r = true;
              } catch (kc) {
                q = "parsererror";
                x = kc;
              }
          } else {
            x = q;
            if (!q || j) {
              q = "error";
              if (j < 0) j = 0;
            }
          }
          G.status = j;
          G.statusText = "" + (n || q);
          r ? i.resolveWith(f, [C, q, G]) : i.rejectWith(f, [G, q, x]);
          G.statusCode(m);
          m = z;
          if (T) g.trigger("ajax" + (r ? "Success" : "Error"), [G, e, r ? C : x]);
          l.fireWith(f, [G, q]);
          if (T) {
            g.trigger("ajaxComplete", [G, e]);
            --c.active || c.event.trigger("ajaxStop");
          }
        }
      }
      if (typeof a === "object") {
        b = a;
        a = z;
      }
      b = b || {};
      var e = c.ajaxSetup({}, b),
        f = e.context || e,
        g = f !== e && (f.nodeType || f instanceof c) ? c(f) : c.event,
        i = c.Deferred(),
        l = c.Callbacks("once memory"),
        m = e.statusCode || {},
        p,
        v = {},
        s = {},
        A,
        w,
        F,
        J,
        M,
        K = 0,
        T,
        O,
        G = {
          readyState: 0,
          setRequestHeader: function (j, n) {
            if (!K) {
              var o = j.toLowerCase();
              j = s[o] = s[o] || j;
              v[j] = n;
            }
            return this;
          },
          getAllResponseHeaders: function () {
            return K === 2 ? A : null;
          },
          getResponseHeader: function (j) {
            var n;
            if (K === 2) {
              if (!w) for (w = {}; (n = cc.exec(A)); ) w[n[1].toLowerCase()] = n[2];
              n = w[j.toLowerCase()];
            }
            return n === z ? null : n;
          },
          overrideMimeType: function (j) {
            if (!K) e.mimeType = j;
            return this;
          },
          abort: function (j) {
            j = j || "abort";
            F && F.abort(j);
            d(0, j);
            return this;
          },
        };
      i.promise(G);
      G.success = G.done;
      G.error = G.fail;
      G.complete = l.add;
      G.statusCode = function (j) {
        if (j) {
          var n;
          if (K < 2) for (n in j) m[n] = [m[n], j[n]];
          else {
            n = j[G.status];
            G.then(n, n);
          }
        }
        return this;
      };
      e.url = ((a || e.url) + "").replace(bc, "").replace(fc, Y[1] + "//");
      e.dataTypes = c
        .trim(e.dataType || "*")
        .toLowerCase()
        .split(Na);
      if (e.crossDomain == null) {
        M = lb.exec(e.url.toLowerCase());
        e.crossDomain = !!(M && (M[1] != Y[1] || M[2] != Y[2] || (M[3] || (M[1] === "http:" ? 80 : 443)) != (Y[3] || (Y[1] === "http:" ? 80 : 443))));
      }
      if (e.data && e.processData && typeof e.data !== "string") e.data = c.param(e.data, e.traditional);
      ja(ra, e, b, G);
      if (K === 2) return false;
      T = e.global;
      e.type = e.type.toUpperCase();
      e.hasContent = !ec.test(e.type);
      T && c.active++ === 0 && c.event.trigger("ajaxStart");
      if (!e.hasContent) {
        if (e.data) {
          e.url += (kb.test(e.url) ? "&" : "?") + e.data;
          delete e.data;
        }
        p = e.url;
        if (e.cache === false) {
          M = c.now();
          var Q = e.url.replace(ic, "$1_=" + M);
          e.url = Q + (Q === e.url ? (kb.test(e.url) ? "&" : "?") + "_=" + M : "");
        }
      }
      if ((e.data && e.hasContent && e.contentType !== false) || b.contentType) G.setRequestHeader("Content-Type", e.contentType);
      if (e.ifModified) {
        p = p || e.url;
        c.lastModified[p] && G.setRequestHeader("If-Modified-Since", c.lastModified[p]);
        c.etag[p] && G.setRequestHeader("If-None-Match", c.etag[p]);
      }
      G.setRequestHeader(
        "Accept",
        e.dataTypes[0] && e.accepts[e.dataTypes[0]]
          ? e.accepts[e.dataTypes[0]] + (e.dataTypes[0] !== "*" ? ", " + ob + "; q=0.01" : "")
          : e.accepts["*"]
      );
      for (O in e.headers) G.setRequestHeader(O, e.headers[O]);
      if (e.beforeSend && (e.beforeSend.call(f, G, e) === false || K === 2)) {
        G.abort();
        return false;
      }
      for (O in {
        success: 1,
        error: 1,
        complete: 1,
      })
        G[O](e[O]);
      if ((F = ja(nb, e, b, G))) {
        G.readyState = 1;
        T && g.trigger("ajaxSend", [G, e]);
        if (e.async && e.timeout > 0)
          J = setTimeout(function () {
            G.abort("timeout");
          }, e.timeout);
        try {
          K = 1;
          F.send(v, d);
        } catch (h) {
          if (K < 2) d(-1, h);
          else throw h;
        }
      } else d(-1, "No Transport");
      return G;
    },
    param: function (a, b) {
      var d = [],
        e = function (g, i) {
          i = c.isFunction(i) ? i() : i;
          d[d.length] = encodeURIComponent(g) + "=" + encodeURIComponent(i);
        };
      if (b === z) b = c.ajaxSettings.traditional;
      if (c.isArray(a) || (a.jquery && !c.isPlainObject(a)))
        c.each(a, function () {
          e(this.name, this.value);
        });
      else for (var f in a) sa(f, a[f], b, e);
      return d.join("&").replace(ac, "+");
    },
  });
  c.extend({
    active: 0,
    lastModified: {},
    etag: {},
  });
  var lc = c.now(),
    oa = /(\=)\?(&|$)|\?\?/i;
  c.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      return c.expando + "_" + lc++;
    },
  });
  c.ajaxPrefilter("json jsonp", function (a, b, d) {
    b = a.contentType === "application/x-www-form-urlencoded" && typeof a.data === "string";
    if (a.dataTypes[0] === "jsonp" || (a.jsonp !== false && (oa.test(a.url) || (b && oa.test(a.data))))) {
      var e,
        f = (a.jsonpCallback = c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback),
        g = I[f],
        i = a.url,
        l = a.data,
        m = "$1" + f + "$2";
      if (a.jsonp !== false) {
        i = i.replace(oa, m);
        if (a.url === i) {
          if (b) l = l.replace(oa, m);
          if (a.data === l) i += (/\?/.test(i) ? "&" : "?") + a.jsonp + "=" + f;
        }
      }
      a.url = i;
      a.data = l;
      I[f] = function (p) {
        e = [p];
      };
      d.always(function () {
        I[f] = g;
        e && c.isFunction(g) && I[f](e[0]);
      });
      a.converters["script json"] = function () {
        e || c.error(f + " was not called");
        return e[0];
      };
      a.dataTypes[0] = "json";
      return "script";
    }
  });
  c.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
    },
    contents: {
      script: /javascript|ecmascript/,
    },
    converters: {
      "text script": function (a) {
        c.globalEval(a);
        return a;
      },
    },
  });
  c.ajaxPrefilter("script", function (a) {
    if (a.cache === z) a.cache = false;
    if (a.crossDomain) {
      a.type = "GET";
      a.global = false;
    }
  });
  c.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var b,
        d = B.head || B.getElementsByTagName("head")[0] || B.documentElement;
      return {
        send: function (e, f) {
          b = B.createElement("script");
          b.async = "async";
          if (a.scriptCharset) b.charset = a.scriptCharset;
          b.src = a.url;
          b.onload = b.onreadystatechange = function (g, i) {
            if (i || !b.readyState || /loaded|complete/.test(b.readyState)) {
              b.onload = b.onreadystatechange = null;
              d && b.parentNode && d.removeChild(b);
              b = z;
              i || f(200, "success");
            }
          };
          d.insertBefore(b, d.firstChild);
        },
        abort: function () {
          b && b.onload(0, 1);
        },
      };
    }
  });
  var Aa = I.ActiveXObject
      ? function () {
          for (var a in fa) fa[a](0, 1);
        }
      : false,
    mc = 0,
    fa;
  c.ajaxSettings.xhr = I.ActiveXObject
    ? function () {
        var a;
        if (!(a = !this.isLocal && Pa()))
          a: {
            try {
              a = new I.ActiveXObject("Microsoft.XMLHTTP");
              break a;
            } catch (b) {}
            a = void 0;
          }
        return a;
      }
    : Pa;
  (function (a) {
    c.extend(c.support, {
      ajax: !!a,
      cors: !!a && "withCredentials" in a,
    });
  })(c.ajaxSettings.xhr());
  c.support.ajax &&
    c.ajaxTransport(function (a) {
      if (!a.crossDomain || c.support.cors) {
        var b;
        return {
          send: function (d, e) {
            var f = a.xhr(),
              g,
              i;
            a.username ? f.open(a.type, a.url, a.async, a.username, a.password) : f.open(a.type, a.url, a.async);
            if (a.xhrFields) for (i in a.xhrFields) f[i] = a.xhrFields[i];
            a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType);
            if (!a.crossDomain && !d["X-Requested-With"]) d["X-Requested-With"] = "XMLHttpRequest";
            try {
              for (i in d) f.setRequestHeader(i, d[i]);
            } catch (l) {}
            f.send((a.hasContent && a.data) || null);
            b = function (m, p) {
              var v, s, A, w, F;
              try {
                if (b && (p || f.readyState === 4)) {
                  b = z;
                  if (g) {
                    f.onreadystatechange = c.noop;
                    Aa && delete fa[g];
                  }
                  if (p) f.readyState !== 4 && f.abort();
                  else {
                    v = f.status;
                    A = f.getAllResponseHeaders();
                    w = {};
                    if ((F = f.responseXML) && F.documentElement) w.xml = F;
                    w.text = f.responseText;
                    try {
                      s = f.statusText;
                    } catch (J) {
                      s = "";
                    }
                    if (!v && a.isLocal && !a.crossDomain) v = w.text ? 200 : 404;
                    else if (v === 1223) v = 204;
                  }
                }
              } catch (M) {
                p || e(-1, M);
              }
              w && e(v, s, w, A);
            };
            if (!a.async || f.readyState === 4) b();
            else {
              g = ++mc;
              if (Aa) {
                if (!fa) {
                  fa = {};
                  c(I).unload(Aa);
                }
                fa[g] = b;
              }
              f.onreadystatechange = b;
            }
          },
          abort: function () {
            b && b(0, 1);
          },
        };
      }
    });
  var ta = {},
    R,
    ca,
    nc = /^(?:toggle|show|hide)$/,
    oc = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
    pa,
    Ra = [
      ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
      ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
      ["opacity"],
    ],
    ka;
  c.fn.extend({
    show: function (a, b, d) {
      if (a || a === 0) return this.animate(ba("show", 3), a, b, d);
      else {
        d = 0;
        for (var e = this.length; d < e; d++) {
          a = this[d];
          if (a.style) {
            b = a.style.display;
            if (!c._data(a, "olddisplay") && b === "none") b = a.style.display = "";
            b === "" && c.css(a, "display") === "none" && c._data(a, "olddisplay", Sa(a.nodeName));
          }
        }
        for (d = 0; d < e; d++) {
          a = this[d];
          if (a.style) {
            b = a.style.display;
            if (b === "" || b === "none") a.style.display = c._data(a, "olddisplay") || "";
          }
        }
        return this;
      }
    },
    hide: function (a, b, d) {
      if (a || a === 0) return this.animate(ba("hide", 3), a, b, d);
      else {
        d = 0;
        for (var e = this.length; d < e; d++) {
          a = this[d];
          if (a.style) {
            b = c.css(a, "display");
            b !== "none" && !c._data(a, "olddisplay") && c._data(a, "olddisplay", b);
          }
        }
        for (d = 0; d < e; d++) if (this[d].style) this[d].style.display = "none";
        return this;
      }
    },
    _toggle: c.fn.toggle,
    toggle: function (a, b, d) {
      var e = typeof a === "boolean";
      if (c.isFunction(a) && c.isFunction(b)) this._toggle.apply(this, arguments);
      else
        a == null || e
          ? this.each(function () {
              var f = e ? a : c(this).is(":hidden");
              c(this)[f ? "show" : "hide"]();
            })
          : this.animate(ba("toggle", 3), a, b, d);
      return this;
    },
    fadeTo: function (a, b, d, e) {
      return this.filter(":hidden").css("opacity", 0).show().end().animate(
        {
          opacity: b,
        },
        a,
        d,
        e
      );
    },
    animate: function (a, b, d, e) {
      function f() {
        g.queue === false && c._mark(this);
        var i = c.extend({}, g),
          l = this.nodeType === 1,
          m = l && c(this).is(":hidden"),
          p,
          v,
          s,
          A,
          w;
        i.animatedProperties = {};
        for (s in a) {
          p = c.camelCase(s);
          if (s !== p) {
            a[p] = a[s];
            delete a[s];
          }
          v = a[p];
          if (c.isArray(v)) {
            i.animatedProperties[p] = v[1];
            v = a[p] = v[0];
          } else i.animatedProperties[p] = (i.specialEasing && i.specialEasing[p]) || i.easing || "swing";
          if ((v === "hide" && m) || (v === "show" && !m)) return i.complete.call(this);
          if (l && (p === "height" || p === "width")) {
            i.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
            if (c.css(this, "display") === "inline" && c.css(this, "float") === "none")
              if (!c.support.inlineBlockNeedsLayout || Sa(this.nodeName) === "inline") this.style.display = "inline-block";
              else this.style.zoom = 1;
          }
        }
        if (i.overflow != null) this.style.overflow = "hidden";
        for (s in a) {
          l = new c.fx(this, i, s);
          v = a[s];
          if (nc.test(v))
            if ((p = c._data(this, "toggle" + s) || (v === "toggle" ? (m ? "show" : "hide") : 0))) {
              c._data(this, "toggle" + s, p === "show" ? "hide" : "show");
              l[p]();
            } else l[v]();
          else {
            p = oc.exec(v);
            A = l.cur();
            if (p) {
              v = parseFloat(p[2]);
              w = p[3] || (c.cssNumber[s] ? "" : "px");
              if (w !== "px") {
                c.style(this, s, (v || 1) + w);
                A = ((v || 1) / l.cur()) * A;
                c.style(this, s, A + w);
              }
              if (p[1]) v = (p[1] === "-=" ? -1 : 1) * v + A;
              l.custom(A, v, w);
            } else l.custom(A, v, "");
          }
        }
        return true;
      }
      var g = c.speed(b, d, e);
      if (c.isEmptyObject(a)) return this.each(g.complete, [false]);
      a = c.extend({}, a);
      return g.queue === false ? this.each(f) : this.queue(g.queue, f);
    },
    stop: function (a, b, d) {
      if (typeof a !== "string") {
        d = b;
        b = a;
        a = z;
      }
      if (b && a !== false) this.queue(a || "fx", []);
      return this.each(function () {
        function e(m, p, v) {
          p = p[v];
          c.removeData(m, v, true);
          p.stop(d);
        }
        var f,
          g = false,
          i = c.timers,
          l = c._data(this);
        d || c._unmark(true, this);
        if (a == null) for (f in l) l[f] && l[f].stop && f.indexOf(".run") === f.length - 4 && e(this, l, f);
        else if (l[(f = a + ".run")] && l[f].stop) e(this, l, f);
        for (f = i.length; f--; )
          if (i[f].elem === this && (a == null || i[f].queue === a)) {
            d ? i[f](true) : i[f].saveState();
            g = true;
            i.splice(f, 1);
          }
        (d && g) || c.dequeue(this, a);
      });
    },
  });
  c.each(
    {
      slideDown: ba("show", 1),
      slideUp: ba("hide", 1),
      slideToggle: ba("toggle", 1),
      fadeIn: {
        opacity: "show",
      },
      fadeOut: {
        opacity: "hide",
      },
      fadeToggle: {
        opacity: "toggle",
      },
    },
    function (a, b) {
      c.fn[a] = function (d, e, f) {
        return this.animate(b, d, e, f);
      };
    }
  );
  c.extend({
    speed: function (a, b, d) {
      var e =
        a && typeof a === "object"
          ? c.extend({}, a)
          : {
              complete: d || (!d && b) || (c.isFunction(a) && a),
              duration: a,
              easing: (d && b) || (b && !c.isFunction(b) && b),
            };
      e.duration = c.fx.off
        ? 0
        : typeof e.duration === "number"
        ? e.duration
        : e.duration in c.fx.speeds
        ? c.fx.speeds[e.duration]
        : c.fx.speeds._default;
      if (e.queue == null || e.queue === true) e.queue = "fx";
      e.old = e.complete;
      e.complete = function (f) {
        c.isFunction(e.old) && e.old.call(this);
        if (e.queue) c.dequeue(this, e.queue);
        else f !== false && c._unmark(this);
      };
      return e;
    },
    easing: {
      linear: function (a, b, d, e) {
        return d + e * a;
      },
      swing: function (a, b, d, e) {
        return (-Math.cos(a * Math.PI) / 2 + 0.5) * e + d;
      },
    },
    timers: [],
    fx: function (a, b, d) {
      this.options = b;
      this.elem = a;
      this.prop = d;
      b.orig = b.orig || {};
    },
  });
  c.fx.prototype = {
    update: function () {
      this.options.step && this.options.step.call(this.elem, this.now, this);
      (c.fx.step[this.prop] || c.fx.step._default)(this);
    },
    cur: function () {
      if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
      var a,
        b = c.css(this.elem, this.prop);
      return isNaN((a = parseFloat(b))) ? (!b || b === "auto" ? 0 : b) : a;
    },
    custom: function (a, b, d) {
      function e(i) {
        return f.step(i);
      }
      var f = this,
        g = c.fx;
      this.startTime = ka || Qa();
      this.end = b;
      this.now = this.start = a;
      this.pos = this.state = 0;
      this.unit = d || this.unit || (c.cssNumber[this.prop] ? "" : "px");
      e.queue = this.options.queue;
      e.elem = this.elem;
      e.saveState = function () {
        f.options.hide && c._data(f.elem, "fxshow" + f.prop) === z && c._data(f.elem, "fxshow" + f.prop, f.start);
      };
      if (e() && c.timers.push(e) && !pa) pa = setInterval(g.tick, g.interval);
    },
    show: function () {
      var a = c._data(this.elem, "fxshow" + this.prop);
      this.options.orig[this.prop] = a || c.style(this.elem, this.prop);
      this.options.show = true;
      a !== z ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
      c(this.elem).show();
    },
    hide: function () {
      this.options.orig[this.prop] = c._data(this.elem, "fxshow" + this.prop) || c.style(this.elem, this.prop);
      this.options.hide = true;
      this.custom(this.cur(), 0);
    },
    step: function (a) {
      var b,
        d = ka || Qa(),
        e = true,
        f = this.elem,
        g = this.options;
      if (a || d >= g.duration + this.startTime) {
        this.now = this.end;
        this.pos = this.state = 1;
        this.update();
        g.animatedProperties[this.prop] = true;
        for (b in g.animatedProperties) if (g.animatedProperties[b] !== true) e = false;
        if (e) {
          g.overflow != null &&
            !c.support.shrinkWrapBlocks &&
            c.each(["", "X", "Y"], function (i, l) {
              f.style["overflow" + l] = g.overflow[i];
            });
          g.hide && c(f).hide();
          if (g.hide || g.show)
            for (b in g.animatedProperties) {
              c.style(f, b, g.orig[b]);
              c.removeData(f, "fxshow" + b, true);
              c.removeData(f, "toggle" + b, true);
            }
          if ((a = g.complete)) {
            g.complete = false;
            a.call(f);
          }
        }
        return false;
      } else {
        if (g.duration == Infinity) this.now = d;
        else {
          a = d - this.startTime;
          this.state = a / g.duration;
          this.pos = c.easing[g.animatedProperties[this.prop]](this.state, a, 0, 1, g.duration);
          this.now = this.start + (this.end - this.start) * this.pos;
        }
        this.update();
      }
      return true;
    },
  };
  c.extend(c.fx, {
    tick: function () {
      for (var a, b = c.timers, d = 0; d < b.length; d++) {
        a = b[d];
        !a() && b[d] === a && b.splice(d--, 1);
      }
      b.length || c.fx.stop();
    },
    interval: 13,
    stop: function () {
      clearInterval(pa);
      pa = null;
    },
    speeds: {
      slow: 600,
      fast: 200,
      _default: 400,
    },
    step: {
      opacity: function (a) {
        c.style(a.elem, "opacity", a.now);
      },
      _default: function (a) {
        if (a.elem.style && a.elem.style[a.prop] != null) a.elem.style[a.prop] = a.now + a.unit;
        else a.elem[a.prop] = a.now;
      },
    },
  });
  c.each(["width", "height"], function (a, b) {
    c.fx.step[b] = function (d) {
      c.style(d.elem, b, Math.max(0, d.now) + d.unit);
    };
  });
  if (c.expr && c.expr.filters)
    c.expr.filters.animated = function (a) {
      return c.grep(c.timers, function (b) {
        return a === b.elem;
      }).length;
    };
  var pc = /^t(?:able|d|h)$/i,
    pb = /^(?:body|html)$/i;
  c.fn.offset =
    "getBoundingClientRect" in B.documentElement
      ? function (a) {
          var b = this[0],
            d;
          if (a)
            return this.each(function (i) {
              c.offset.setOffset(this, a, i);
            });
          if (!b || !b.ownerDocument) return null;
          if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
          try {
            d = b.getBoundingClientRect();
          } catch (e) {}
          var f = b.ownerDocument,
            g = f.documentElement;
          if (!d || !c.contains(g, b))
            return d
              ? {
                  top: d.top,
                  left: d.left,
                }
              : {
                  top: 0,
                  left: 0,
                };
          b = f.body;
          f = ua(f);
          return {
            top: d.top + (f.pageYOffset || (c.support.boxModel && g.scrollTop) || b.scrollTop) - (g.clientTop || b.clientTop || 0),
            left: d.left + (f.pageXOffset || (c.support.boxModel && g.scrollLeft) || b.scrollLeft) - (g.clientLeft || b.clientLeft || 0),
          };
        }
      : function (a) {
          var b = this[0];
          if (a)
            return this.each(function (v) {
              c.offset.setOffset(this, a, v);
            });
          if (!b || !b.ownerDocument) return null;
          if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
          var d,
            e = b.offsetParent,
            f = b,
            g = b.ownerDocument,
            i = g.documentElement,
            l = g.body;
          d = (g = g.defaultView) ? g.getComputedStyle(b, null) : b.currentStyle;
          for (var m = b.offsetTop, p = b.offsetLeft; (b = b.parentNode) && b !== l && b !== i; ) {
            if (c.support.fixedPosition && d.position === "fixed") break;
            d = g ? g.getComputedStyle(b, null) : b.currentStyle;
            m -= b.scrollTop;
            p -= b.scrollLeft;
            if (b === e) {
              m += b.offsetTop;
              p += b.offsetLeft;
              if (c.support.doesNotAddBorder && !(c.support.doesAddBorderForTableAndCells && pc.test(b.nodeName))) {
                m += parseFloat(d.borderTopWidth) || 0;
                p += parseFloat(d.borderLeftWidth) || 0;
              }
              f = e;
              e = b.offsetParent;
            }
            if (c.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible") {
              m += parseFloat(d.borderTopWidth) || 0;
              p += parseFloat(d.borderLeftWidth) || 0;
            }
            d = d;
          }
          if (d.position === "relative" || d.position === "static") {
            m += l.offsetTop;
            p += l.offsetLeft;
          }
          if (c.support.fixedPosition && d.position === "fixed") {
            m += Math.max(i.scrollTop, l.scrollTop);
            p += Math.max(i.scrollLeft, l.scrollLeft);
          }
          return {
            top: m,
            left: p,
          };
        };
  c.offset = {
    bodyOffset: function (a) {
      var b = a.offsetTop,
        d = a.offsetLeft;
      if (c.support.doesNotIncludeMarginInBodyOffset) {
        b += parseFloat(c.css(a, "marginTop")) || 0;
        d += parseFloat(c.css(a, "marginLeft")) || 0;
      }
      return {
        top: b,
        left: d,
      };
    },
    setOffset: function (a, b, d) {
      var e = c.css(a, "position");
      if (e === "static") a.style.position = "relative";
      var f = c(a),
        g = f.offset(),
        i = c.css(a, "top"),
        l = c.css(a, "left"),
        m = {},
        p = {};
      if ((e === "absolute" || e === "fixed") && c.inArray("auto", [i, l]) > -1) {
        p = f.position();
        e = p.top;
        l = p.left;
      } else {
        e = parseFloat(i) || 0;
        l = parseFloat(l) || 0;
      }
      if (c.isFunction(b)) b = b.call(a, d, g);
      if (b.top != null) m.top = b.top - g.top + e;
      if (b.left != null) m.left = b.left - g.left + l;
      "using" in b ? b.using.call(a, m) : f.css(m);
    },
  };
  c.fn.extend({
    position: function () {
      if (!this[0]) return null;
      var a = this[0],
        b = this.offsetParent(),
        d = this.offset(),
        e = pb.test(b[0].nodeName)
          ? {
              top: 0,
              left: 0,
            }
          : b.offset();
      d.top -= parseFloat(c.css(a, "marginTop")) || 0;
      d.left -= parseFloat(c.css(a, "marginLeft")) || 0;
      e.top += parseFloat(c.css(b[0], "borderTopWidth")) || 0;
      e.left += parseFloat(c.css(b[0], "borderLeftWidth")) || 0;
      return {
        top: d.top - e.top,
        left: d.left - e.left,
      };
    },
    offsetParent: function () {
      return this.map(function () {
        for (var a = this.offsetParent || B.body; a && !pb.test(a.nodeName) && c.css(a, "position") === "static"; ) a = a.offsetParent;
        return a;
      });
    },
  });
  c.each(["Left", "Top"], function (a, b) {
    var d = "scroll" + b;
    c.fn[d] = function (e) {
      var f, g;
      if (e === z) {
        f = this[0];
        if (!f) return null;
        return (g = ua(f))
          ? "pageXOffset" in g
            ? g[a ? "pageYOffset" : "pageXOffset"]
            : (c.support.boxModel && g.document.documentElement[d]) || g.document.body[d]
          : f[d];
      }
      return this.each(function () {
        if ((g = ua(this))) g.scrollTo(!a ? e : c(g).scrollLeft(), a ? e : c(g).scrollTop());
        else this[d] = e;
      });
    };
  });
  c.each(["Height", "Width"], function (a, b) {
    var d = b.toLowerCase();
    c.fn["inner" + b] = function () {
      var e = this[0];
      return e ? (e.style ? parseFloat(c.css(e, d, "padding")) : this[d]()) : null;
    };
    c.fn["outer" + b] = function (e) {
      var f = this[0];
      return f ? (f.style ? parseFloat(c.css(f, d, e ? "margin" : "border")) : this[d]()) : null;
    };
    c.fn[d] = function (e) {
      var f = this[0];
      if (!f) return e == null ? null : this;
      if (c.isFunction(e))
        return this.each(function (l) {
          var m = c(this);
          m[d](e.call(this, l, m[d]()));
        });
      if (c.isWindow(f)) {
        var g = f.document.documentElement["client" + b],
          i = f.document.body;
        return (f.document.compatMode === "CSS1Compat" && g) || (i && i["client" + b]) || g;
      } else if (f.nodeType === 9)
        return Math.max(
          f.documentElement["client" + b],
          f.body["scroll" + b],
          f.documentElement["scroll" + b],
          f.body["offset" + b],
          f.documentElement["offset" + b]
        );
      else if (e === z) {
        f = c.css(f, d);
        g = parseFloat(f);
        return c.isNumeric(g) ? g : f;
      } else return this.css(d, typeof e === "string" ? e : e + "px");
    };
  });
  I.jQuery = I.$ = c;
  typeof define === "function" &&
    define.amd &&
    define.amd.jQuery &&
    define("jquery", [], function () {
      return c;
    });
})(window);
