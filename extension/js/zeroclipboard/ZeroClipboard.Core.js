(function (l, z) {
  var o = l.document,
    x = l.navigator,
    I = l.setTimeout,
    ca = l.clearTimeout,
    da = l.setInterval,
    ea = l.clearInterval,
    U = l.getComputedStyle,
    L = l.encodeURIComponent,
    V = l.ActiveXObject,
    fa = l.Error,
    ga = l.Number.parseInt || l.parseInt,
    D = l.Number.parseFloat || l.parseFloat,
    ha = l.Number.isNaN || l.isNaN,
    W = l.Date.now,
    ia = l.Object.keys,
    ja = l.Object.defineProperty,
    t = l.Object.prototype.hasOwnProperty,
    ka = l.Array.prototype.slice,
    la = (function () {
      var a = function (f) {
        return f;
      };
      if (typeof l.wrap === "function" && typeof l.unwrap === "function")
        try {
          var c = o.createElement("div"),
            b = l.unwrap(c);
          if (c.nodeType === 1 && b && b.nodeType === 1) a = l.unwrap;
        } catch (d) {}
      return a;
    })(),
    u = function (a) {
      return ka.call(a, 0);
    },
    p = function () {
      var a,
        c,
        b,
        d,
        f,
        g = u(arguments),
        e = g[0] || {};
      a = 1;
      for (c = g.length; a < c; a++)
        if ((b = g[a]) != null)
          for (d in b)
            if (t.call(b, d)) {
              f = b[d];
              if (e !== f && f !== z) e[d] = f;
            }
      return e;
    },
    B = function (a) {
      var c, b, d;
      if (typeof a !== "object" || a == null || typeof a.nodeType === "number") c = a;
      else if (typeof a.length === "number") {
        c = [];
        b = 0;
        for (d = a.length; b < d; b++) if (t.call(a, b)) c[b] = B(a[b]);
      } else {
        c = {};
        for (b in a) if (t.call(a, b)) c[b] = B(a[b]);
      }
      return c;
    },
    X = function (a, c) {
      if (
        a &&
        a.nodeType === 1 &&
        a.ownerDocument &&
        c &&
        ((c.nodeType === 1 && c.ownerDocument && c.ownerDocument === a.ownerDocument) ||
          (c.nodeType === 9 && !c.ownerDocument && c === a.ownerDocument))
      ) {
        do {
          if (a === c) return true;
          a = a.parentNode;
        } while (a);
      }
      return false;
    },
    Y = function (a) {
      var c;
      if (typeof a === "string" && a) {
        a.split("#")[0].split("?");
        c = a.slice(0, a.lastIndexOf("/") + 1);
      }
      return c;
    },
    ma = function () {
      var a,
        c,
        b,
        d = o.getElementsByTagName("script");
      for (a = d.length; a--; ) {
        if (!(b = d[a].src)) {
          c = null;
          break;
        }
        b = Y(b);
        if (c == null) c = b;
        else if (c !== b) {
          c = null;
          break;
        }
      }
      return c || z;
    },
    Z = l.opener == null && ((!!l.top && l != l.top) || (!!l.parent && l != l.parent)),
    h = {
      bridge: null,
      version: "0.0.0",
      pluginType: "unknown",
      disabled: null,
      outdated: null,
      sandboxed: null,
      unavailable: null,
      degraded: null,
      deactivated: null,
      overdue: null,
      ready: null,
    },
    E,
    y = {},
    v,
    M,
    q = {},
    N = null,
    O = 0,
    P = 0,
    na = {
      ready: "Flash communication is established",
      error: {
        "flash-disabled": "Flash is disabled or not installed. May also be attempting to run Flash in a sandboxed iframe, which is impossible.",
        "flash-outdated": "Flash is too outdated to support ZeroClipboard",
        "flash-sandboxed": "Attempting to run Flash in a sandboxed iframe, which is impossible",
        "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
        "flash-degraded": "Flash is unable to preserve data fidelity when communicating with JavaScript",
        "flash-deactivated":
          "Flash is too outdated for your browser and/or is configured as click-to-activate.\nThis may also mean that the ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity.\nMay also be attempting to run Flash in a sandboxed iframe, which is impossible.",
        "flash-overdue": "Flash communication was established but NOT within the acceptable time limit",
        "version-mismatch": "ZeroClipboard JS version number does not match ZeroClipboard SWF version number",
        "clipboard-error": "At least one error was thrown while ZeroClipboard was attempting to inject your data into the clipboard",
        "config-mismatch": "ZeroClipboard configuration does not match Flash's reality",
        "swf-not-found": "The ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity",
      },
    },
    oa = ["flash-unavailable", "flash-degraded", "flash-overdue", "version-mismatch", "config-mismatch", "clipboard-error"],
    F = ["flash-disabled", "flash-outdated", "flash-sandboxed", "flash-unavailable", "flash-degraded", "flash-deactivated", "flash-overdue"],
    pa = RegExp(
      "^flash-(" +
        F.map(function (a) {
          return a.replace(/^flash-/, "");
        }).join("|") +
        ")$"
    ),
    qa = RegExp(
      "^flash-(" +
        F.slice(1)
          .map(function (a) {
            return a.replace(/^flash-/, "");
          })
          .join("|") +
        ")$"
    ),
    m = {
      swfPath:
        (Y(
          (function () {
            var a, c, b;
            if (o.currentScript && (a = o.currentScript.src)) return a;
            c = o.getElementsByTagName("script");
            if (c.length === 1) return c[0].src || z;
            if ("readyState" in c[0]) for (b = c.length; b--; ) if (c[b].readyState === "interactive" && (a = c[b].src)) return a;
            if (o.readyState === "loading" && (a = c[c.length - 1].src)) return a;
            var d;
            try {
              throw new fa();
            } catch (f) {
              a = f;
            }
            if (a) {
              if (!(d = a.sourceURL)) {
                if (!(d = a.fileName)) {
                  d = a.stack;
                  var g;
                  if (typeof d === "string" && d)
                    if (
                      (a = d.match(
                        /^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/
                      )) &&
                      a[1]
                    )
                      g = a[1];
                    else if ((a = d.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/)) && a[1]) g = a[1];
                  d = g;
                }
                d = d;
              }
              d = d;
            }
            if ((a = d)) return a;
            return z;
          })()
        ) ||
          ma() ||
          "") + "ZeroClipboard.swf",
      trustedDomains: l.location.host ? [l.location.host] : [],
      cacheBust: true,
      forceEnhancedClipboard: false,
      flashLoadTimeout: 3e4,
      autoActivate: true,
      bubbleEvents: true,
      containerId: "global-zeroclipboard-html-bridge",
      containerClass: "global-zeroclipboard-container",
      swfObjectId: "global-zeroclipboard-flash-bridge",
      hoverClass: "zeroclipboard-is-hover",
      activeClass: "zeroclipboard-is-active",
      forceHandCursor: false,
      title: null,
      zIndex: 999999999,
    },
    ra = function (a) {
      if (typeof a === "object" && a !== null)
        for (var c in a)
          if (t.call(a, c))
            if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(c)) m[c] = a[c];
            else if (h.bridge == null)
              if (c === "containerId" || c === "swfObjectId")
                if (typeof a[c] === "string" && a[c] && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(a[c])) m[c] = a[c];
                else throw Error("The specified `" + c + "` value is not valid as an HTML4 Element ID");
              else m[c] = a[c];
      if (typeof a === "string" && a) {
        if (t.call(m, a)) return m[a];
      } else return B(m);
    },
    sa = function () {
      Q();
      for (var a = ["userAgent", "platform", "appName"], c = {}, b = 0, d = a.length; b < d; b++) if (a[b] in x) c[a[b]] = x[a[b]];
      a = ["bridge"];
      b = {};
      for (var f in h) if (a.indexOf(f) === -1) b[f] = h[f];
      return {
        browser: c,
        flash: b,
        zeroclipboard: {
          version: i.version,
          config: i.config(),
        },
      };
    },
    ta = function () {
      return !!(h.disabled || h.outdated || h.sandboxed || h.unavailable || h.degraded || h.deactivated);
    },
    ua = function (a, c) {
      var b,
        d,
        f,
        g = {};
      if (typeof a === "string" && a) f = a.toLowerCase().split(/\s+/);
      else if (typeof a === "object" && a && typeof c === "undefined")
        for (b in a) t.call(a, b) && typeof b === "string" && b && typeof a[b] === "function" && i.on(b, a[b]);
      if (f && f.length) {
        b = 0;
        for (d = f.length; b < d; b++) {
          a = f[b].replace(/^on/, "");
          g[a] = true;
          y[a] || (y[a] = []);
          y[a].push(c);
        }
        g.ready &&
          h.ready &&
          i.emit({
            type: "ready",
          });
        if (g.error) {
          b = 0;
          for (d = F.length; b < d; b++)
            if (h[F[b].replace(/^flash-/, "")] === true) {
              i.emit({
                type: "error",
                name: F[b],
              });
              break;
            }
          E !== z &&
            i.version !== E &&
            i.emit({
              type: "error",
              name: "version-mismatch",
              jsVersion: i.version,
              swfVersion: E,
            });
        }
      }
      return i;
    },
    va = function (a, c) {
      var b, d, f, g, e;
      if (arguments.length === 0) g = ia(y);
      else if (typeof a === "string" && a) g = a.split(/\s+/);
      else if (typeof a === "object" && a && typeof c === "undefined")
        for (b in a) t.call(a, b) && typeof b === "string" && b && typeof a[b] === "function" && i.off(b, a[b]);
      if (g && g.length) {
        b = 0;
        for (d = g.length; b < d; b++) {
          a = g[b].toLowerCase().replace(/^on/, "");
          if ((e = y[a]) && e.length)
            if (c)
              for (f = e.indexOf(c); f !== -1; ) {
                e.splice(f, 1);
                f = e.indexOf(c, f);
              }
            else e.length = 0;
        }
      }
      return i;
    },
    wa = function (a) {
      return typeof a === "string" && a ? B(y[a]) || null : B(y);
    },
    Ca = function (a) {
      var c, b, d;
      a = a;
      var f;
      if (typeof a === "string" && a) {
        f = a;
        a = {};
      } else if (typeof a === "object" && a && typeof a.type === "string" && a.type) f = a.type;
      if (f) {
        f = f.toLowerCase();
        if (!a.target && (/^(copy|aftercopy|_click)$/.test(f) || (f === "error" && a.name === "clipboard-error"))) a.target = M;
        p(a, {
          type: f,
          target: a.target || v || null,
          relatedTarget: a.relatedTarget || null,
          currentTarget: (h && h.bridge) || null,
          timeStamp: a.timeStamp || W() || null,
        });
        f = na[a.type];
        if (a.type === "error" && a.name && f) f = f[a.name];
        if (f) a.message = f;
        a.type === "ready" &&
          p(a, {
            target: null,
            version: h.version,
          });
        if (a.type === "error") {
          pa.test(a.name) &&
            p(a, {
              target: null,
              minimumVersion: "11.0.0",
            });
          qa.test(a.name) &&
            p(a, {
              version: h.version,
            });
        }
        if (a.type === "copy")
          a.clipboardData = {
            setData: i.setData,
            clearData: i.clearData,
          };
        if (a.type === "aftercopy") {
          a = a;
          f = N;
          if (typeof a === "object" && a && typeof f === "object" && f) {
            var g = {};
            for (var e in a)
              if (t.call(a, e))
                if (e === "errors") {
                  g[e] = a[e] ? a[e].slice() : [];
                  for (var j = 0, n = g[e].length; j < n; j++) g[e][j].format = f[g[e][j].format];
                } else if (e !== "success" && e !== "data") g[e] = a[e];
                else {
                  g[e] = {};
                  j = a[e];
                  for (var k in j) if (k && t.call(j, k) && t.call(f, k)) g[e][f[k]] = j[k];
                }
            a = g;
          } else a = a;
        }
        if (a.target && !a.relatedTarget) {
          e = a;
          k = (k = (k = a.target) && k.getAttribute && k.getAttribute("data-clipboard-target")) ? o.getElementById(k) : null;
          e.relatedTarget = k;
        }
        if ((a = a) && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)) {
          e = a.target;
          k = a.type === "_mouseover" && a.relatedTarget ? a.relatedTarget : z;
          f = a.type === "_mouseout" && a.relatedTarget ? a.relatedTarget : z;
          j = R(e);
          g = j.left + (typeof a._stageX === "number" ? a._stageX : 0);
          j = j.top + (typeof a._stageY === "number" ? a._stageY : 0);
          n = g - (o.body.scrollLeft + o.documentElement.scrollLeft);
          var J = j - (o.body.scrollTop + o.documentElement.scrollTop),
            s = (l.screenLeft || l.screenX || 0) + n,
            xa = (l.screenTop || l.screenY || 0) + J,
            ya = typeof a.movementX === "number" ? a.movementX : 0,
            za = typeof a.movementY === "number" ? a.movementY : 0;
          delete a._stageX;
          delete a._stageY;
          p(a, {
            srcElement: e,
            fromElement: k,
            toElement: f,
            screenX: s,
            screenY: xa,
            pageX: g,
            pageY: j,
            clientX: n,
            clientY: J,
            x: n,
            y: J,
            movementX: ya,
            movementY: za,
            offsetX: 0,
            offsetY: 0,
            layerX: 0,
            layerY: 0,
          });
        }
        a = a;
      } else a = void 0;
      if (a) {
        e = a;
        k = e.target || v || null;
        f = e._source === "swf";
        delete e._source;
        switch (e.type) {
          case "error":
            var r;
            if (!(r = e.name === "flash-sandboxed")) {
              r = null;
              if (Z === false || (e && e.type === "error" && e.name && oa.indexOf(e.name) !== -1)) r = false;
              r = r;
            }
            r = r;
            if (typeof r === "boolean") h.sandboxed = r;
            if (F.indexOf(e.name) !== -1)
              p(h, {
                disabled: e.name === "flash-disabled",
                outdated: e.name === "flash-outdated",
                unavailable: e.name === "flash-unavailable",
                degraded: e.name === "flash-degraded",
                deactivated: e.name === "flash-deactivated",
                overdue: e.name === "flash-overdue",
                ready: false,
              });
            else if (e.name === "version-mismatch") {
              E = e.swfVersion;
              p(h, {
                disabled: false,
                outdated: false,
                unavailable: false,
                degraded: false,
                deactivated: false,
                overdue: false,
                ready: false,
              });
            }
            K();
            break;
          case "ready":
            E = e.swfVersion;
            r = h.deactivated === true;
            p(h, {
              disabled: false,
              outdated: false,
              sandboxed: false,
              unavailable: false,
              degraded: false,
              deactivated: false,
              overdue: r,
              ready: !r,
            });
            K();
            break;
          case "beforecopy":
            M = k;
            break;
          case "copy":
            var C,
              w = e.relatedTarget;
            if (
              !(q["text/html"] || q["text/plain"]) &&
              w &&
              (C = w.value || w.outerHTML || w.innerHTML) &&
              (r = w.value || w.textContent || w.innerText)
            ) {
              e.clipboardData.clearData();
              e.clipboardData.setData("text/plain", r);
              C !== r && e.clipboardData.setData("text/html", C);
            } else if (!q["text/plain"] && e.target && (r = e.target.getAttribute("data-clipboard-text"))) {
              e.clipboardData.clearData();
              e.clipboardData.setData("text/plain", r);
            }
            break;
          case "aftercopy":
            Aa(e);
            i.clearData();
            if ((r = k)) {
              try {
                w = o.activeElement;
              } catch (Pa) {
                w = null;
              }
              r = k !== w && k.focus;
            }
            r && k.focus();
            break;
          case "_mouseover":
            i.focus(k);
            if (m.bubbleEvents === true && f) {
              k &&
                k !== e.relatedTarget &&
                !X(e.relatedTarget, k) &&
                A(
                  p({}, e, {
                    type: "mouseenter",
                    bubbles: false,
                    cancelable: false,
                  })
                );
              A(
                p({}, e, {
                  type: "mouseover",
                })
              );
            }
            break;
          case "_mouseout":
            i.blur();
            if (m.bubbleEvents === true && f) {
              k &&
                k !== e.relatedTarget &&
                !X(e.relatedTarget, k) &&
                A(
                  p({}, e, {
                    type: "mouseleave",
                    bubbles: false,
                    cancelable: false,
                  })
                );
              A(
                p({}, e, {
                  type: "mouseout",
                })
              );
            }
            break;
          case "_mousedown":
            $(k, m.activeClass);
            m.bubbleEvents === true &&
              f &&
              A(
                p({}, e, {
                  type: e.type.slice(1),
                })
              );
            break;
          case "_mouseup":
            G(k, m.activeClass);
            m.bubbleEvents === true &&
              f &&
              A(
                p({}, e, {
                  type: e.type.slice(1),
                })
              );
            break;
          case "_click":
            M = null;
            m.bubbleEvents === true &&
              f &&
              A(
                p({}, e, {
                  type: e.type.slice(1),
                })
              );
            break;
          case "_mousemove":
            m.bubbleEvents === true &&
              f &&
              A(
                p({}, e, {
                  type: e.type.slice(1),
                })
              );
            break;
        }
        if (/^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type)) c = true;
        if (!c) {
          if (a.type === "ready" && h.overdue === true)
            return i.emit({
              type: "error",
              name: "flash-overdue",
            });
          c = p({}, a);
          if (typeof c === "object" && c && c.type) {
            r = !/^(?:(?:before)?copy|destroy)$/.test((c && typeof c.type === "string" && c.type) || "");
            if ((C = (y["*"] || []).concat(y[c.type] || [])) && C.length) {
              w = 0;
              for (e = C.length; w < e; w++) {
                k = C[w];
                f = this;
                if (typeof k === "string" && typeof l[k] === "function") k = l[k];
                if (typeof k === "object" && k && typeof k.handleEvent === "function") {
                  f = k;
                  k = k.handleEvent;
                }
                if (typeof k === "function") {
                  g = p({}, c);
                  Ba(k, f, [g], r);
                }
              }
            }
          }
          if (a.type === "copy") {
            b = {};
            c = {};
            if (typeof q === "object" && q) {
              for (d in q)
                if (d && t.call(q, d) && typeof q[d] === "string" && q[d])
                  switch (d.toLowerCase()) {
                    case "text/plain":
                    case "text":
                    case "air:text":
                    case "flash:text":
                      b.text = q[d];
                      c.text = d;
                      break;
                    case "text/html":
                    case "html":
                    case "air:html":
                    case "flash:html":
                      b.html = q[d];
                      c.html = d;
                      break;
                    case "application/rtf":
                    case "text/rtf":
                    case "rtf":
                    case "richtext":
                    case "air:rtf":
                    case "flash:rtf":
                      b.rtf = q[d];
                      c.rtf = d;
                      break;
                    default:
                      break;
                  }
              d = {
                data: b,
                formatMap: c,
              };
            } else d = void 0;
            b = d.data;
            N = d.formatMap;
          }
          return b;
        }
      }
    },
    Ea = function () {
      var a = h.sandboxed;
      Q();
      if (typeof h.ready !== "boolean") h.ready = false;
      if (h.sandboxed !== a && h.sandboxed === true) {
        h.ready = false;
        i.emit({
          type: "error",
          name: "flash-sandboxed",
        });
      } else if (!i.isFlashUnusable() && h.bridge === null) {
        a = m.flashLoadTimeout;
        if (typeof a === "number" && a >= 0)
          O = I(function () {
            if (typeof h.deactivated !== "boolean") h.deactivated = true;
            h.deactivated === true &&
              i.emit({
                type: "error",
                name: "flash-deactivated",
              });
          }, a);
        h.overdue = false;
        Da();
      }
    },
    Ga = function () {
      i.clearData();
      i.blur();
      i.emit("destroy");
      Fa();
      i.off();
    },
    Ha = function (a, c) {
      var b;
      if (typeof a === "object" && a && typeof c === "undefined") {
        b = a;
        i.clearData();
      } else if (typeof a === "string" && a) {
        b = {};
        b[a] = c;
      } else return;
      for (var d in b) if (typeof d === "string" && d && t.call(b, d) && typeof b[d] === "string" && b[d]) q[d] = b[d];
    },
    Ia = function (a) {
      if (typeof a === "undefined") {
        if (q) for (var c in q) t.call(q, c) && delete q[c];
        N = null;
      } else typeof a === "string" && t.call(q, a) && delete q[a];
    },
    Ja = function (a) {
      if (typeof a === "undefined") return B(q);
      else if (typeof a === "string" && t.call(q, a)) return q[a];
    },
    Ka = function (a) {
      if (a && a.nodeType === 1) {
        if (v) {
          G(v, m.activeClass);
          v !== a && G(v, m.hoverClass);
        }
        v = a;
        $(a, m.hoverClass);
        var c = a.getAttribute("title") || m.title;
        if (typeof c === "string" && c) {
          var b = H(h.bridge);
          b && b.setAttribute("title", c);
        }
        a = m.forceHandCursor === true || aa(a, "cursor") === "pointer";
        if (h.ready === true)
          if (h.bridge && typeof h.bridge.setHandCursor === "function") h.bridge.setHandCursor(a);
          else h.ready = false;
        var d;
        if (v && (d = H(h.bridge))) {
          a = R(v);
          p(d.style, {
            width: a.width + "px",
            height: a.height + "px",
            top: a.top + "px",
            left: a.left + "px",
            zIndex: "" + S(m.zIndex),
          });
        }
      }
    },
    La = function () {
      var a = H(h.bridge);
      if (a) {
        a.removeAttribute("title");
        a.style.left = "0px";
        a.style.top = "-9999px";
        a.style.width = "1px";
        a.style.height = "1px";
      }
      if (v) {
        G(v, m.hoverClass);
        G(v, m.activeClass);
        v = null;
      }
    },
    Ma = function () {
      return v || null;
    },
    Ba = function (a, c, b, d) {
      d
        ? I(function () {
            a.apply(c, b);
          }, 0)
        : a.apply(c, b);
    },
    Aa = function (a) {
      if (a.errors && a.errors.length > 0) {
        var c = B(a);
        p(c, {
          type: "error",
          name: "clipboard-error",
        });
        delete c.success;
        I(function () {
          i.emit(c);
        }, 0);
      }
    },
    A = function (a) {
      if (a && typeof a.type === "string" && a) {
        var c,
          b = a.target || null;
        c = (b && b.ownerDocument) || o;
        a = p(
          {
            view: c.defaultView || l,
            canBubble: true,
            cancelable: true,
            detail: a.type === "click" ? 1 : 0,
            button: typeof a.which === "number" ? a.which - 1 : typeof a.button === "number" ? a.button : c.createEvent ? 0 : 1,
          },
          a
        );
        if (b)
          if (c.createEvent && b.dispatchEvent) {
            a = [
              a.type,
              a.canBubble,
              a.cancelable,
              a.view,
              a.detail,
              a.screenX,
              a.screenY,
              a.clientX,
              a.clientY,
              a.ctrlKey,
              a.altKey,
              a.shiftKey,
              a.metaKey,
              a.button,
              a.relatedTarget,
            ];
            c = c.createEvent("MouseEvents");
            if (c.initMouseEvent) {
              c.initMouseEvent.apply(c, a);
              c._source = "js";
              b.dispatchEvent(c);
            }
          }
      }
    },
    Na = function () {
      var a = m.flashLoadTimeout;
      if (typeof a === "number" && a >= 0) {
        var c = m.swfObjectId + "_fallbackContent";
        P = da(function () {
          var b;
          var d = o.getElementById(c);
          if (d) {
            b = U(d, null);
            var f = D(b.height) > 0,
              g = D(b.width) > 0,
              e = D(b.top) >= 0,
              j = D(b.left) >= 0,
              n = f && g && e && j;
            d = n ? null : R(d);
            b =
              b.display !== "none" &&
              b.visibility !== "collapse" &&
              (n || (!!d && (f || d.height > 0) && (g || d.width > 0) && (e || d.top >= 0) && (j || d.left >= 0)));
          } else b = false;
          if (b) {
            K();
            h.deactivated = null;
            i.emit({
              type: "error",
              name: "swf-not-found",
            });
          }
        }, Math.min(1e3, a / 10));
      }
    },
    H = function (a) {
      for (a = a && a.parentNode; a && a.nodeName === "OBJECT" && a.parentNode; ) a = a.parentNode;
      return a || null;
    },
    Da = function () {
      var a,
        c = h.bridge,
        b = H(c);
      if (!c) {
        c = Oa(l.location.host, m);
        var d = c === "never" ? "none" : "all",
          f;
        b = p(
          {
            jsVersion: i.version,
          },
          m
        );
        var g,
          e,
          j,
          n = "",
          k = [];
        if (b.trustedDomains)
          if (typeof b.trustedDomains === "string") f = [b.trustedDomains];
          else if (typeof b.trustedDomains === "object" && "length" in b.trustedDomains) f = b.trustedDomains;
        if (f && f.length) {
          g = 0;
          for (e = f.length; g < e; g++)
            if (t.call(f, g) && f[g] && typeof f[g] === "string")
              if ((j = T(f[g]))) {
                if (j === "*") {
                  k.length = 0;
                  k.push(j);
                  break;
                }
                k.push.apply(k, [j, "//" + j, l.location.protocol + "//" + j]);
              }
        }
        if (k.length) n += "trustedOrigins=" + L(k.join(","));
        if (b.forceEnhancedClipboard === true) n += (n ? "&" : "") + "forceEnhancedClipboard=true";
        if (typeof b.swfObjectId === "string" && b.swfObjectId) n += (n ? "&" : "") + "swfObjectId=" + L(b.swfObjectId);
        if (typeof b.jsVersion === "string" && b.jsVersion) n += (n ? "&" : "") + "jsVersion=" + L(b.jsVersion);
        f = n;
        g = m.swfPath + (m == null || (m && m.cacheBust === true) ? (m.swfPath.indexOf("?") === -1 ? "?" : "&") + "noCache=" + W() : "");
        b = o.createElement("div");
        b.id = m.containerId;
        b.className = m.containerClass;
        b.style.position = "absolute";
        b.style.left = "0px";
        b.style.top = "-9999px";
        b.style.width = "1px";
        b.style.height = "1px";
        b.style.zIndex = "" + S(m.zIndex);
        b = b;
        e = o.createElement("div");
        b.appendChild(e);
        o.body.appendChild(b);
        j = o.createElement("div");
        n = h.pluginType === "activex";
        j.innerHTML =
          '<object id="' +
          m.swfObjectId +
          '" name="' +
          m.swfObjectId +
          '" width="100%" height="100%" ' +
          (n ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + g + '"') +
          ">" +
          (n ? '<param name="movie" value="' + g + '"/>' : "") +
          '<param name="allowScriptAccess" value="' +
          c +
          '"/><param name="allowNetworking" value="' +
          d +
          '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' +
          f +
          '"/><div id="' +
          m.swfObjectId +
          '_fallbackContent">&nbsp;</div></object>';
        c = j.firstChild;
        la(c).ZeroClipboard = i;
        b.replaceChild(c, e);
        Na();
      }
      if (!c) {
        if ((c = o[m.swfObjectId]) && (a = c.length)) c = c[a - 1];
        if (!c && b) c = b.firstChild;
      }
      h.bridge = c || null;
      return c;
    },
    Fa = function () {
      var a = h.bridge;
      if (a) {
        var c = H(a);
        if (c)
          if (h.pluginType === "activex" && "readyState" in a) {
            a.style.display = "none";
            (function b() {
              if (a.readyState === 4) {
                for (var d in a) if (typeof a[d] === "function") a[d] = null;
                a.parentNode && a.parentNode.removeChild(a);
                c.parentNode && c.parentNode.removeChild(c);
              } else I(b, 10);
            })();
          } else {
            a.parentNode && a.parentNode.removeChild(a);
            c.parentNode && c.parentNode.removeChild(c);
          }
        K();
        h.ready = null;
        h.bridge = null;
        h.deactivated = null;
        E = z;
      }
    },
    T = function (a) {
      if (a == null || a === "") return null;
      a = a.replace(/^\s+|\s+$/g, "");
      if (a === "") return null;
      var c = a.indexOf("//");
      a = c === -1 ? a : a.slice(c + 2);
      var b = a.indexOf("/");
      if ((a = b === -1 ? a : c === -1 || b === 0 ? null : a.slice(0, b)) && a.slice(-4).toLowerCase() === ".swf") return null;
      return a || null;
    },
    Oa = (function () {
      return function (a, c) {
        var b = T(c.swfPath);
        if (b === null) b = a;
        var d = c.trustedDomains,
          f,
          g,
          e,
          j = [];
        if (typeof d === "string") d = [d];
        if (typeof d === "object" && d && typeof d.length === "number") {
          f = 0;
          for (g = d.length; f < g; f++)
            if (t.call(d, f) && (e = T(d[f]))) {
              if (e === "*") {
                j.length = 0;
                j.push("*");
                break;
              }
              j.indexOf(e) === -1 && j.push(e);
            }
        }
        d = j.length;
        if (d > 0) {
          if (d === 1 && j[0] === "*") return "always";
          if (j.indexOf(a) !== -1) {
            if (d === 1 && a === b) return "sameDomain";
            return "always";
          }
        }
        return "never";
      };
    })(),
    $ = function (a, c) {
      var b,
        d,
        f,
        g = [];
      if (typeof c === "string" && c) g = c.split(/\s+/);
      if (a && a.nodeType === 1 && g.length > 0)
        if (a.classList) {
          b = 0;
          for (d = g.length; b < d; b++) a.classList.add(g[b]);
        } else if (a.hasOwnProperty("className")) {
          f = " " + a.className + " ";
          b = 0;
          for (d = g.length; b < d; b++) if (f.indexOf(" " + g[b] + " ") === -1) f += g[b] + " ";
          a.className = f.replace(/^\s+|\s+$/g, "");
        }
      return a;
    },
    G = function (a, c) {
      var b,
        d,
        f,
        g = [];
      if (typeof c === "string" && c) g = c.split(/\s+/);
      if (a && a.nodeType === 1 && g.length > 0)
        if (a.classList && a.classList.length > 0) {
          b = 0;
          for (d = g.length; b < d; b++) a.classList.remove(g[b]);
        } else if (a.className) {
          f = (" " + a.className + " ").replace(/[\r\n\t]/g, " ");
          b = 0;
          for (d = g.length; b < d; b++) f = f.replace(" " + g[b] + " ", " ");
          a.className = f.replace(/^\s+|\s+$/g, "");
        }
      return a;
    },
    aa = function (a, c) {
      var b = U(a, null).getPropertyValue(c);
      if (c === "cursor") if (!b || b === "auto") if (a.nodeName === "A") return "pointer";
      return b;
    },
    R = function (a) {
      var c = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
      if (a.getBoundingClientRect) {
        a = a.getBoundingClientRect();
        var b = l.pageXOffset,
          d = l.pageYOffset,
          f = o.documentElement.clientLeft || 0,
          g = o.documentElement.clientTop || 0,
          e = 0,
          j = 0;
        if (aa(o.body, "position") === "relative") {
          j = o.body.getBoundingClientRect();
          var n = o.documentElement.getBoundingClientRect();
          e = j.left - n.left || 0;
          j = j.top - n.top || 0;
        }
        c.left = a.left + b - f - e;
        c.top = a.top + d - g - j;
        c.width = "width" in a ? a.width : a.right - a.left;
        c.height = "height" in a ? a.height : a.bottom - a.top;
      }
      return c;
    },
    K = function () {
      ca(O);
      O = 0;
      ea(P);
      P = 0;
    },
    S = function (a) {
      if (/^(?:auto|inherit)$/.test(a)) return a;
      var c;
      if (typeof a === "number" && !ha(a)) c = a;
      else if (typeof a === "string") c = S(ga(a, 10));
      return typeof c === "number" ? c : "auto";
    },
    Q = function (a) {
      var c,
        b,
        d,
        f = h.sandboxed,
        g = null;
      a = a === true;
      if (Z === false) g = false;
      else {
        try {
          b = l.frameElement || null;
        } catch (e) {
          d = {
            name: e.name,
            message: e.message,
          };
        }
        if (b && b.nodeType === 1 && b.nodeName === "IFRAME")
          try {
            g = b.hasAttribute("sandbox");
          } catch (j) {
            g = null;
          }
        else {
          try {
            c = document.domain || null;
          } catch (n) {
            c = null;
          }
          if (c === null || (d && d.name === "SecurityError" && /(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(d.message.toLowerCase())))
            g = true;
        }
      }
      h.sandboxed = g;
      f !== g && !a && ba(V);
      return g;
    },
    ba = function (a) {
      function c(s) {
        s = s.match(/[\d]+/g);
        s.length = 3;
        return s.join(".");
      }

      function b(s) {
        if (s) {
          f = true;
          if (s.version) j = c(s.version);
          if (!j && s.description) j = c(s.description);
          if (s.filename) {
            s = s.filename;
            e =
              !!s &&
              (s = s.toLowerCase()) &&
              (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(s) || s.slice(-13) === "chrome.plugin");
          }
        }
      }
      var d,
        f = false,
        g = false,
        e = false,
        j = "";
      if (x.plugins && x.plugins.length) {
        a = x.plugins["Shockwave Flash"];
        b(a);
        if (x.plugins["Shockwave Flash 2.0"]) {
          f = true;
          j = "2.0.0.11";
        }
      } else if (x.mimeTypes && x.mimeTypes.length) {
        a = (a = x.mimeTypes["application/x-shockwave-flash"]) && a.enabledPlugin;
        b(a);
      } else if (typeof a !== "undefined") {
        g = true;
        try {
          d = new a("ShockwaveFlash.ShockwaveFlash.7");
          f = true;
          j = c(d.GetVariable("$version"));
        } catch (n) {
          try {
            d = new a("ShockwaveFlash.ShockwaveFlash.6");
            f = true;
            j = "6.0.21";
          } catch (k) {
            try {
              d = new a("ShockwaveFlash.ShockwaveFlash");
              f = true;
              j = c(d.GetVariable("$version"));
            } catch (J) {
              g = false;
            }
          }
        }
      }
      h.disabled = f !== true;
      h.outdated = j && D(j) < D("11.0.0");
      h.version = j || "0.0.0";
      h.pluginType = e ? "pepper" : g ? "activex" : f ? "netscape" : "unknown";
    };
  ba(V);
  Q(true);
  var i = function () {
    if (!(this instanceof i)) return new i();
    typeof i._createClient === "function" && i._createClient.apply(this, u(arguments));
  };
  ja(i, "version", {
    value: "2.2.0",
    writable: false,
    configurable: true,
    enumerable: true,
  });
  i.config = function () {
    return ra.apply(this, u(arguments));
  };
  i.state = function () {
    return sa.apply(this, u(arguments));
  };
  i.isFlashUnusable = function () {
    return ta.apply(this, u(arguments));
  };
  i.on = function () {
    return ua.apply(this, u(arguments));
  };
  i.off = function () {
    return va.apply(this, u(arguments));
  };
  i.handlers = function () {
    return wa.apply(this, u(arguments));
  };
  i.emit = function () {
    return Ca.apply(this, u(arguments));
  };
  i.create = function () {
    return Ea.apply(this, u(arguments));
  };
  i.destroy = function () {
    return Ga.apply(this, u(arguments));
  };
  i.setData = function () {
    return Ha.apply(this, u(arguments));
  };
  i.clearData = function () {
    return Ia.apply(this, u(arguments));
  };
  i.getData = function () {
    return Ja.apply(this, u(arguments));
  };
  i.focus = i.activate = function () {
    return Ka.apply(this, u(arguments));
  };
  i.blur = i.deactivate = function () {
    return La.apply(this, u(arguments));
  };
  i.activeElement = function () {
    return Ma.apply(this, u(arguments));
  };
  if (typeof define === "function" && define.amd)
    define(function () {
      return i;
    });
  else if (typeof module === "object" && module && typeof module.exports === "object" && module.exports) module.exports = i;
  else l.ZeroClipboard = i;
})(
  (function () {
    return this || window;
  })()
);
