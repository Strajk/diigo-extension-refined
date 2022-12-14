(function (k, w) {
  var q = k.document,
    x = k.navigator,
    G = k.setTimeout,
    ha = k.clearTimeout,
    ia = k.setInterval,
    ja = k.clearInterval,
    U = k.getComputedStyle,
    J = k.encodeURIComponent,
    V = k.ActiveXObject,
    ka = k.Error,
    la = k.Number.parseInt || k.parseInt,
    D = k.Number.parseFloat || k.parseFloat,
    ma = k.Number.isNaN || k.isNaN,
    W = k.Date.now,
    X = k.Object.keys,
    na = k.Object.defineProperty,
    t = k.Object.prototype.hasOwnProperty,
    oa = k.Array.prototype.slice,
    pa = (function () {
      var a = function (e) {
        return e;
      };
      if (typeof k.wrap === "function" && typeof k.unwrap === "function")
        try {
          var c = q.createElement("div"),
            b = k.unwrap(c);
          if (c.nodeType === 1 && b && b.nodeType === 1) a = k.unwrap;
        } catch (d) {}
      return a;
    })(),
    n = function (a) {
      return oa.call(a, 0);
    },
    p = function () {
      var a,
        c,
        b,
        d,
        e,
        f = n(arguments),
        h = f[0] || {};
      a = 1;
      for (c = f.length; a < c; a++)
        if ((b = f[a]) != null)
          for (d in b)
            if (t.call(b, d)) {
              e = b[d];
              if (h !== e && e !== w) h[d] = e;
            }
      return h;
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
    Y = function (a, c) {
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
    Z = function (a) {
      var c;
      if (typeof a === "string" && a) {
        a.split("#")[0].split("?");
        c = a.slice(0, a.lastIndexOf("/") + 1);
      }
      return c;
    },
    qa = function () {
      var a,
        c,
        b,
        d = q.getElementsByTagName("script");
      for (a = d.length; a--; ) {
        if (!(b = d[a].src)) {
          c = null;
          break;
        }
        b = Z(b);
        if (c == null) c = b;
        else if (c !== b) {
          c = null;
          break;
        }
      }
      return c || w;
    },
    $ = k.opener == null && ((!!k.top && k != k.top) || (!!k.parent && k != k.parent)),
    j = {
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
    y,
    z = {},
    v,
    K,
    s = {},
    L = null,
    M = 0,
    N = 0,
    ra = {
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
    sa = ["flash-unavailable", "flash-degraded", "flash-overdue", "version-mismatch", "config-mismatch", "clipboard-error"],
    A = ["flash-disabled", "flash-outdated", "flash-sandboxed", "flash-unavailable", "flash-degraded", "flash-deactivated", "flash-overdue"],
    ta = RegExp(
      "^flash-(" +
        A.map(function (a) {
          return a.replace(/^flash-/, "");
        }).join("|") +
        ")$"
    ),
    ua = RegExp(
      "^flash-(" +
        A.slice(1)
          .map(function (a) {
            return a.replace(/^flash-/, "");
          })
          .join("|") +
        ")$"
    ),
    l = {
      swfPath:
        (Z(
          (function () {
            var a, c, b;
            if (q.currentScript && (a = q.currentScript.src)) return a;
            c = q.getElementsByTagName("script");
            if (c.length === 1) return c[0].src || w;
            if ("readyState" in c[0]) for (b = c.length; b--; ) if (c[b].readyState === "interactive" && (a = c[b].src)) return a;
            if (q.readyState === "loading" && (a = c[c.length - 1].src)) return a;
            var d;
            try {
              throw new ka();
            } catch (e) {
              a = e;
            }
            if (a) {
              if (!(d = a.sourceURL)) {
                if (!(d = a.fileName)) {
                  d = a.stack;
                  var f;
                  if (typeof d === "string" && d)
                    if (
                      (a = d.match(
                        /^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/
                      )) &&
                      a[1]
                    )
                      f = a[1];
                    else if ((a = d.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/)) && a[1]) f = a[1];
                  d = f;
                }
                d = d;
              }
              d = d;
            }
            if ((a = d)) return a;
            return w;
          })()
        ) ||
          qa() ||
          "") + "ZeroClipboard.swf",
      trustedDomains: k.location.host ? [k.location.host] : [],
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
    va = function (a) {
      if (typeof a === "object" && a !== null)
        for (var c in a)
          if (t.call(a, c))
            if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(c)) l[c] = a[c];
            else if (j.bridge == null)
              if (c === "containerId" || c === "swfObjectId")
                if (typeof a[c] === "string" && a[c] && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(a[c])) l[c] = a[c];
                else throw Error("The specified `" + c + "` value is not valid as an HTML4 Element ID");
              else l[c] = a[c];
      if (typeof a === "string" && a) {
        if (t.call(l, a)) return l[a];
      } else return B(l);
    },
    wa = function () {
      O();
      for (var a = ["userAgent", "platform", "appName"], c = {}, b = 0, d = a.length; b < d; b++) if (a[b] in x) c[a[b]] = x[a[b]];
      a = ["bridge"];
      b = {};
      for (var e in j) if (a.indexOf(e) === -1) b[e] = j[e];
      return {
        browser: c,
        flash: b,
        zeroclipboard: {
          version: g.version,
          config: g.config(),
        },
      };
    },
    xa = function () {
      return !!(j.disabled || j.outdated || j.sandboxed || j.unavailable || j.degraded || j.deactivated);
    },
    ya = function (a, c) {
      var b,
        d,
        e,
        f = {};
      if (typeof a === "string" && a) e = a.toLowerCase().split(/\s+/);
      else if (typeof a === "object" && a && typeof c === "undefined")
        for (b in a) t.call(a, b) && typeof b === "string" && b && typeof a[b] === "function" && g.on(b, a[b]);
      if (e && e.length) {
        b = 0;
        for (d = e.length; b < d; b++) {
          a = e[b].replace(/^on/, "");
          f[a] = true;
          z[a] || (z[a] = []);
          z[a].push(c);
        }
        f.ready &&
          j.ready &&
          g.emit({
            type: "ready",
          });
        if (f.error) {
          b = 0;
          for (d = A.length; b < d; b++)
            if (j[A[b].replace(/^flash-/, "")] === true) {
              g.emit({
                type: "error",
                name: A[b],
              });
              break;
            }
          y !== w &&
            g.version !== y &&
            g.emit({
              type: "error",
              name: "version-mismatch",
              jsVersion: g.version,
              swfVersion: y,
            });
        }
      }
      return g;
    },
    za = function (a, c) {
      var b, d, e, f, h;
      if (arguments.length === 0) f = X(z);
      else if (typeof a === "string" && a) f = a.split(/\s+/);
      else if (typeof a === "object" && a && typeof c === "undefined")
        for (b in a) t.call(a, b) && typeof b === "string" && b && typeof a[b] === "function" && g.off(b, a[b]);
      if (f && f.length) {
        b = 0;
        for (d = f.length; b < d; b++) {
          a = f[b].toLowerCase().replace(/^on/, "");
          if ((h = z[a]) && h.length)
            if (c)
              for (e = h.indexOf(c); e !== -1; ) {
                h.splice(e, 1);
                e = h.indexOf(c, e);
              }
            else h.length = 0;
        }
      }
      return g;
    },
    Aa = function (a) {
      return typeof a === "string" && a ? B(z[a]) || null : B(z);
    },
    Ca = function (a) {
      var c, b, d;
      if ((a = aa(a))) {
        var e = a,
          f = e.target || v || null,
          h = e._source === "swf";
        delete e._source;
        switch (e.type) {
          case "error":
            if (!(f = e.name === "flash-sandboxed")) {
              f = null;
              if ($ === false || (e && e.type === "error" && e.name && sa.indexOf(e.name) !== -1)) f = false;
              f = f;
            }
            f = f;
            if (typeof f === "boolean") j.sandboxed = f;
            if (A.indexOf(e.name) !== -1)
              p(j, {
                disabled: e.name === "flash-disabled",
                outdated: e.name === "flash-outdated",
                unavailable: e.name === "flash-unavailable",
                degraded: e.name === "flash-degraded",
                deactivated: e.name === "flash-deactivated",
                overdue: e.name === "flash-overdue",
                ready: false,
              });
            else if (e.name === "version-mismatch") {
              y = e.swfVersion;
              p(j, {
                disabled: false,
                outdated: false,
                unavailable: false,
                degraded: false,
                deactivated: false,
                overdue: false,
                ready: false,
              });
            }
            H();
            break;
          case "ready":
            y = e.swfVersion;
            f = j.deactivated === true;
            p(j, {
              disabled: false,
              outdated: false,
              sandboxed: false,
              unavailable: false,
              degraded: false,
              deactivated: false,
              overdue: f,
              ready: !f,
            });
            H();
            break;
          case "beforecopy":
            K = f;
            break;
          case "copy":
            var i, m;
            f = e.relatedTarget;
            if (
              !(s["text/html"] || s["text/plain"]) &&
              f &&
              (m = f.value || f.outerHTML || f.innerHTML) &&
              (i = f.value || f.textContent || f.innerText)
            ) {
              e.clipboardData.clearData();
              e.clipboardData.setData("text/plain", i);
              m !== i && e.clipboardData.setData("text/html", m);
            } else if (!s["text/plain"] && e.target && (i = e.target.getAttribute("data-clipboard-text"))) {
              e.clipboardData.clearData();
              e.clipboardData.setData("text/plain", i);
            }
            break;
          case "aftercopy":
            Ba(e);
            g.clearData();
            if ((i = f)) {
              var o;
              try {
                o = q.activeElement;
              } catch (P) {
                o = null;
              }
              i = f !== o && f.focus;
            }
            i && f.focus();
            break;
          case "_mouseover":
            g.focus(f);
            if (l.bubbleEvents === true && h) {
              f &&
                f !== e.relatedTarget &&
                !Y(e.relatedTarget, f) &&
                C(
                  p({}, e, {
                    type: "mouseenter",
                    bubbles: false,
                    cancelable: false,
                  })
                );
              C(
                p({}, e, {
                  type: "mouseover",
                })
              );
            }
            break;
          case "_mouseout":
            g.blur();
            if (l.bubbleEvents === true && h) {
              f &&
                f !== e.relatedTarget &&
                !Y(e.relatedTarget, f) &&
                C(
                  p({}, e, {
                    type: "mouseleave",
                    bubbles: false,
                    cancelable: false,
                  })
                );
              C(
                p({}, e, {
                  type: "mouseout",
                })
              );
            }
            break;
          case "_mousedown":
            ba(f, l.activeClass);
            l.bubbleEvents === true &&
              h &&
              C(
                p({}, e, {
                  type: e.type.slice(1),
                })
              );
            break;
          case "_mouseup":
            E(f, l.activeClass);
            l.bubbleEvents === true &&
              h &&
              C(
                p({}, e, {
                  type: e.type.slice(1),
                })
              );
            break;
          case "_click":
            K = null;
            l.bubbleEvents === true &&
              h &&
              C(
                p({}, e, {
                  type: e.type.slice(1),
                })
              );
            break;
          case "_mousemove":
            l.bubbleEvents === true &&
              h &&
              C(
                p({}, e, {
                  type: e.type.slice(1),
                })
              );
            break;
        }
        if (/^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type)) c = true;
        if (!c) {
          if (a.type === "ready" && j.overdue === true)
            return g.emit({
              type: "error",
              name: "flash-overdue",
            });
          c = p({}, a);
          if (typeof c === "object" && c && c.type) {
            e = ca(c);
            if ((f = (z["*"] || []).concat(z[c.type] || [])) && f.length) {
              var r;
              i = 0;
              for (m = f.length; i < m; i++) {
                o = f[i];
                h = this;
                if (typeof o === "string" && typeof k[o] === "function") o = k[o];
                if (typeof o === "object" && o && typeof o.handleEvent === "function") {
                  h = o;
                  o = o.handleEvent;
                }
                if (typeof o === "function") {
                  r = p({}, c);
                  da(o, h, [r], e);
                }
              }
            }
          }
          if (a.type === "copy") {
            b = {};
            a = {};
            if (typeof s === "object" && s) {
              for (d in s)
                if (d && t.call(s, d) && typeof s[d] === "string" && s[d])
                  switch (d.toLowerCase()) {
                    case "text/plain":
                    case "text":
                    case "air:text":
                    case "flash:text":
                      b.text = s[d];
                      a.text = d;
                      break;
                    case "text/html":
                    case "html":
                    case "air:html":
                    case "flash:html":
                      b.html = s[d];
                      a.html = d;
                      break;
                    case "application/rtf":
                    case "text/rtf":
                    case "rtf":
                    case "richtext":
                    case "air:rtf":
                    case "flash:rtf":
                      b.rtf = s[d];
                      a.rtf = d;
                      break;
                    default:
                      break;
                  }
              d = {
                data: b,
                formatMap: a,
              };
            } else d = void 0;
            b = d.data;
            L = d.formatMap;
          }
          return b;
        }
      }
    },
    Ea = function () {
      var a = j.sandboxed;
      O();
      if (typeof j.ready !== "boolean") j.ready = false;
      if (j.sandboxed !== a && j.sandboxed === true) {
        j.ready = false;
        g.emit({
          type: "error",
          name: "flash-sandboxed",
        });
      } else if (!g.isFlashUnusable() && j.bridge === null) {
        a = l.flashLoadTimeout;
        if (typeof a === "number" && a >= 0)
          M = G(function () {
            if (typeof j.deactivated !== "boolean") j.deactivated = true;
            j.deactivated === true &&
              g.emit({
                type: "error",
                name: "flash-deactivated",
              });
          }, a);
        j.overdue = false;
        Da();
      }
    },
    Ga = function () {
      g.clearData();
      g.blur();
      g.emit("destroy");
      Fa();
      g.off();
    },
    Ha = function (a, c) {
      var b;
      if (typeof a === "object" && a && typeof c === "undefined") {
        b = a;
        g.clearData();
      } else if (typeof a === "string" && a) {
        b = {};
        b[a] = c;
      } else return;
      for (var d in b) if (typeof d === "string" && d && t.call(b, d) && typeof b[d] === "string" && b[d]) s[d] = b[d];
    },
    Ia = function (a) {
      if (typeof a === "undefined") {
        if (s) for (var c in s) t.call(s, c) && delete s[c];
        L = null;
      } else typeof a === "string" && t.call(s, a) && delete s[a];
    },
    Ja = function (a) {
      if (typeof a === "undefined") return B(s);
      else if (typeof a === "string" && t.call(s, a)) return s[a];
    },
    Ka = function (a) {
      if (a && a.nodeType === 1) {
        if (v) {
          E(v, l.activeClass);
          v !== a && E(v, l.hoverClass);
        }
        v = a;
        ba(a, l.hoverClass);
        var c = a.getAttribute("title") || l.title;
        if (typeof c === "string" && c) {
          var b = F(j.bridge);
          b && b.setAttribute("title", c);
        }
        a = l.forceHandCursor === true || ea(a, "cursor") === "pointer";
        if (j.ready === true)
          if (j.bridge && typeof j.bridge.setHandCursor === "function") j.bridge.setHandCursor(a);
          else j.ready = false;
        var d;
        if (v && (d = F(j.bridge))) {
          a = Q(v);
          p(d.style, {
            width: a.width + "px",
            height: a.height + "px",
            top: a.top + "px",
            left: a.left + "px",
            zIndex: "" + R(l.zIndex),
          });
        }
      }
    },
    La = function () {
      var a = F(j.bridge);
      if (a) {
        a.removeAttribute("title");
        a.style.left = "0px";
        a.style.top = "-9999px";
        a.style.width = "1px";
        a.style.height = "1px";
      }
      if (v) {
        E(v, l.hoverClass);
        E(v, l.activeClass);
        v = null;
      }
    },
    Ma = function () {
      return v || null;
    },
    aa = function (a) {
      var c;
      if (typeof a === "string" && a) {
        c = a;
        a = {};
      } else if (typeof a === "object" && a && typeof a.type === "string" && a.type) c = a.type;
      if (c) {
        c = c.toLowerCase();
        if (!a.target && (/^(copy|aftercopy|_click)$/.test(c) || (c === "error" && a.name === "clipboard-error"))) a.target = K;
        p(a, {
          type: c,
          target: a.target || v || null,
          relatedTarget: a.relatedTarget || null,
          currentTarget: (j && j.bridge) || null,
          timeStamp: a.timeStamp || W() || null,
        });
        c = ra[a.type];
        if (a.type === "error" && a.name && c) c = c[a.name];
        if (c) a.message = c;
        a.type === "ready" &&
          p(a, {
            target: null,
            version: j.version,
          });
        if (a.type === "error") {
          ta.test(a.name) &&
            p(a, {
              target: null,
              minimumVersion: "11.0.0",
            });
          ua.test(a.name) &&
            p(a, {
              version: j.version,
            });
        }
        if (a.type === "copy")
          a.clipboardData = {
            setData: g.setData,
            clearData: g.clearData,
          };
        if (a.type === "aftercopy") {
          a = a;
          c = L;
          if (typeof a === "object" && a && typeof c === "object" && c) {
            var b = {};
            for (var d in a)
              if (t.call(a, d))
                if (d === "errors") {
                  b[d] = a[d] ? a[d].slice() : [];
                  for (var e = 0, f = b[d].length; e < f; e++) b[d][e].format = c[b[d][e].format];
                } else if (d !== "success" && d !== "data") b[d] = a[d];
                else {
                  b[d] = {};
                  e = a[d];
                  for (var h in e) if (h && t.call(e, h) && t.call(c, h)) b[d][c[h]] = e[h];
                }
            a = b;
          } else a = a;
        }
        if (a.target && !a.relatedTarget) {
          d = a;
          h = (h = (h = a.target) && h.getAttribute && h.getAttribute("data-clipboard-target")) ? q.getElementById(h) : null;
          d.relatedTarget = h;
        }
        if ((d = a) && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(d.type)) {
          h = d.target;
          a = d.type === "_mouseover" && d.relatedTarget ? d.relatedTarget : w;
          c = d.type === "_mouseout" && d.relatedTarget ? d.relatedTarget : w;
          e = Q(h);
          b = e.left + (typeof d._stageX === "number" ? d._stageX : 0);
          e = e.top + (typeof d._stageY === "number" ? d._stageY : 0);
          f = b - (q.body.scrollLeft + q.documentElement.scrollLeft);
          var i = e - (q.body.scrollTop + q.documentElement.scrollTop),
            m = (k.screenLeft || k.screenX || 0) + f,
            o = (k.screenTop || k.screenY || 0) + i,
            P = typeof d.movementX === "number" ? d.movementX : 0,
            r = typeof d.movementY === "number" ? d.movementY : 0;
          delete d._stageX;
          delete d._stageY;
          p(d, {
            srcElement: h,
            fromElement: a,
            toElement: c,
            screenX: m,
            screenY: o,
            pageX: b,
            pageY: e,
            clientX: f,
            clientY: i,
            x: f,
            y: i,
            movementX: P,
            movementY: r,
            offsetX: 0,
            offsetY: 0,
            layerX: 0,
            layerY: 0,
          });
        }
        return d;
      }
    },
    ca = function (a) {
      return !/^(?:(?:before)?copy|destroy)$/.test((a && typeof a.type === "string" && a.type) || "");
    },
    da = function (a, c, b, d) {
      d
        ? G(function () {
            a.apply(c, b);
          }, 0)
        : a.apply(c, b);
    },
    Ba = function (a) {
      if (a.errors && a.errors.length > 0) {
        var c = B(a);
        p(c, {
          type: "error",
          name: "clipboard-error",
        });
        delete c.success;
        G(function () {
          g.emit(c);
        }, 0);
      }
    },
    C = function (a) {
      if (a && typeof a.type === "string" && a) {
        var c,
          b = a.target || null;
        c = (b && b.ownerDocument) || q;
        a = p(
          {
            view: c.defaultView || k,
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
      var a = l.flashLoadTimeout;
      if (typeof a === "number" && a >= 0) {
        var c = l.swfObjectId + "_fallbackContent";
        N = ia(function () {
          var b;
          var d = q.getElementById(c);
          if (d) {
            b = U(d, null);
            var e = D(b.height) > 0,
              f = D(b.width) > 0,
              h = D(b.top) >= 0,
              i = D(b.left) >= 0,
              m = e && f && h && i;
            d = m ? null : Q(d);
            b =
              b.display !== "none" &&
              b.visibility !== "collapse" &&
              (m || (!!d && (e || d.height > 0) && (f || d.width > 0) && (h || d.top >= 0) && (i || d.left >= 0)));
          } else b = false;
          if (b) {
            H();
            j.deactivated = null;
            g.emit({
              type: "error",
              name: "swf-not-found",
            });
          }
        }, Math.min(1e3, a / 10));
      }
    },
    F = function (a) {
      for (a = a && a.parentNode; a && a.nodeName === "OBJECT" && a.parentNode; ) a = a.parentNode;
      return a || null;
    },
    Da = function () {
      var a,
        c = j.bridge,
        b = F(c);
      if (!c) {
        c = Oa(k.location.host, l);
        var d = c === "never" ? "none" : "all",
          e;
        b = p(
          {
            jsVersion: g.version,
          },
          l
        );
        var f,
          h,
          i,
          m = "",
          o = [];
        if (b.trustedDomains)
          if (typeof b.trustedDomains === "string") e = [b.trustedDomains];
          else if (typeof b.trustedDomains === "object" && "length" in b.trustedDomains) e = b.trustedDomains;
        if (e && e.length) {
          f = 0;
          for (h = e.length; f < h; f++)
            if (t.call(e, f) && e[f] && typeof e[f] === "string")
              if ((i = S(e[f]))) {
                if (i === "*") {
                  o.length = 0;
                  o.push(i);
                  break;
                }
                o.push.apply(o, [i, "//" + i, k.location.protocol + "//" + i]);
              }
        }
        if (o.length) m += "trustedOrigins=" + J(o.join(","));
        if (b.forceEnhancedClipboard === true) m += (m ? "&" : "") + "forceEnhancedClipboard=true";
        if (typeof b.swfObjectId === "string" && b.swfObjectId) m += (m ? "&" : "") + "swfObjectId=" + J(b.swfObjectId);
        if (typeof b.jsVersion === "string" && b.jsVersion) m += (m ? "&" : "") + "jsVersion=" + J(b.jsVersion);
        e = m;
        f = l.swfPath + (l == null || (l && l.cacheBust === true) ? (l.swfPath.indexOf("?") === -1 ? "?" : "&") + "noCache=" + W() : "");
        b = q.createElement("div");
        b.id = l.containerId;
        b.className = l.containerClass;
        b.style.position = "absolute";
        b.style.left = "0px";
        b.style.top = "-9999px";
        b.style.width = "1px";
        b.style.height = "1px";
        b.style.zIndex = "" + R(l.zIndex);
        b = b;
        h = q.createElement("div");
        b.appendChild(h);
        q.body.appendChild(b);
        i = q.createElement("div");
        m = j.pluginType === "activex";
        i.innerHTML =
          '<object id="' +
          l.swfObjectId +
          '" name="' +
          l.swfObjectId +
          '" width="100%" height="100%" ' +
          (m ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + f + '"') +
          ">" +
          (m ? '<param name="movie" value="' + f + '"/>' : "") +
          '<param name="allowScriptAccess" value="' +
          c +
          '"/><param name="allowNetworking" value="' +
          d +
          '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' +
          e +
          '"/><div id="' +
          l.swfObjectId +
          '_fallbackContent">&nbsp;</div></object>';
        c = i.firstChild;
        pa(c).ZeroClipboard = g;
        b.replaceChild(c, h);
        Na();
      }
      if (!c) {
        if ((c = q[l.swfObjectId]) && (a = c.length)) c = c[a - 1];
        if (!c && b) c = b.firstChild;
      }
      j.bridge = c || null;
      return c;
    },
    Fa = function () {
      var a = j.bridge;
      if (a) {
        var c = F(a);
        if (c)
          if (j.pluginType === "activex" && "readyState" in a) {
            a.style.display = "none";
            (function b() {
              if (a.readyState === 4) {
                for (var d in a) if (typeof a[d] === "function") a[d] = null;
                a.parentNode && a.parentNode.removeChild(a);
                c.parentNode && c.parentNode.removeChild(c);
              } else G(b, 10);
            })();
          } else {
            a.parentNode && a.parentNode.removeChild(a);
            c.parentNode && c.parentNode.removeChild(c);
          }
        H();
        j.ready = null;
        j.bridge = null;
        j.deactivated = null;
        y = w;
      }
    },
    S = function (a) {
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
        var b = S(c.swfPath);
        if (b === null) b = a;
        var d = c.trustedDomains,
          e,
          f,
          h,
          i = [];
        if (typeof d === "string") d = [d];
        if (typeof d === "object" && d && typeof d.length === "number") {
          e = 0;
          for (f = d.length; e < f; e++)
            if (t.call(d, e) && (h = S(d[e]))) {
              if (h === "*") {
                i.length = 0;
                i.push("*");
                break;
              }
              i.indexOf(h) === -1 && i.push(h);
            }
        }
        d = i.length;
        if (d > 0) {
          if (d === 1 && i[0] === "*") return "always";
          if (i.indexOf(a) !== -1) {
            if (d === 1 && a === b) return "sameDomain";
            return "always";
          }
        }
        return "never";
      };
    })(),
    ba = function (a, c) {
      var b,
        d,
        e,
        f = [];
      if (typeof c === "string" && c) f = c.split(/\s+/);
      if (a && a.nodeType === 1 && f.length > 0)
        if (a.classList) {
          b = 0;
          for (d = f.length; b < d; b++) a.classList.add(f[b]);
        } else if (a.hasOwnProperty("className")) {
          e = " " + a.className + " ";
          b = 0;
          for (d = f.length; b < d; b++) if (e.indexOf(" " + f[b] + " ") === -1) e += f[b] + " ";
          a.className = e.replace(/^\s+|\s+$/g, "");
        }
      return a;
    },
    E = function (a, c) {
      var b,
        d,
        e,
        f = [];
      if (typeof c === "string" && c) f = c.split(/\s+/);
      if (a && a.nodeType === 1 && f.length > 0)
        if (a.classList && a.classList.length > 0) {
          b = 0;
          for (d = f.length; b < d; b++) a.classList.remove(f[b]);
        } else if (a.className) {
          e = (" " + a.className + " ").replace(/[\r\n\t]/g, " ");
          b = 0;
          for (d = f.length; b < d; b++) e = e.replace(" " + f[b] + " ", " ");
          a.className = e.replace(/^\s+|\s+$/g, "");
        }
      return a;
    },
    ea = function (a, c) {
      var b = U(a, null).getPropertyValue(c);
      if (c === "cursor") if (!b || b === "auto") if (a.nodeName === "A") return "pointer";
      return b;
    },
    Q = function (a) {
      var c = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
      if (a.getBoundingClientRect) {
        a = a.getBoundingClientRect();
        var b = k.pageXOffset,
          d = k.pageYOffset,
          e = q.documentElement.clientLeft || 0,
          f = q.documentElement.clientTop || 0,
          h = 0,
          i = 0;
        if (ea(q.body, "position") === "relative") {
          i = q.body.getBoundingClientRect();
          var m = q.documentElement.getBoundingClientRect();
          h = i.left - m.left || 0;
          i = i.top - m.top || 0;
        }
        c.left = a.left + b - e - h;
        c.top = a.top + d - f - i;
        c.width = "width" in a ? a.width : a.right - a.left;
        c.height = "height" in a ? a.height : a.bottom - a.top;
      }
      return c;
    },
    H = function () {
      ha(M);
      M = 0;
      ja(N);
      N = 0;
    },
    R = function (a) {
      if (/^(?:auto|inherit)$/.test(a)) return a;
      var c;
      if (typeof a === "number" && !ma(a)) c = a;
      else if (typeof a === "string") c = R(la(a, 10));
      return typeof c === "number" ? c : "auto";
    },
    O = function (a) {
      var c,
        b,
        d,
        e = j.sandboxed,
        f = null;
      a = a === true;
      if ($ === false) f = false;
      else {
        try {
          b = k.frameElement || null;
        } catch (h) {
          d = {
            name: h.name,
            message: h.message,
          };
        }
        if (b && b.nodeType === 1 && b.nodeName === "IFRAME")
          try {
            f = b.hasAttribute("sandbox");
          } catch (i) {
            f = null;
          }
        else {
          try {
            c = document.domain || null;
          } catch (m) {
            c = null;
          }
          if (c === null || (d && d.name === "SecurityError" && /(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(d.message.toLowerCase())))
            f = true;
        }
      }
      j.sandboxed = f;
      e !== f && !a && fa(V);
      return f;
    },
    fa = function (a) {
      function c(r) {
        r = r.match(/[\d]+/g);
        r.length = 3;
        return r.join(".");
      }

      function b(r) {
        if (r) {
          e = true;
          if (r.version) i = c(r.version);
          if (!i && r.description) i = c(r.description);
          if (r.filename) {
            r = r.filename;
            h =
              !!r &&
              (r = r.toLowerCase()) &&
              (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(r) || r.slice(-13) === "chrome.plugin");
          }
        }
      }
      var d,
        e = false,
        f = false,
        h = false,
        i = "";
      if (x.plugins && x.plugins.length) {
        a = x.plugins["Shockwave Flash"];
        b(a);
        if (x.plugins["Shockwave Flash 2.0"]) {
          e = true;
          i = "2.0.0.11";
        }
      } else if (x.mimeTypes && x.mimeTypes.length) {
        a = (a = x.mimeTypes["application/x-shockwave-flash"]) && a.enabledPlugin;
        b(a);
      } else if (typeof a !== "undefined") {
        f = true;
        try {
          d = new a("ShockwaveFlash.ShockwaveFlash.7");
          e = true;
          i = c(d.GetVariable("$version"));
        } catch (m) {
          try {
            d = new a("ShockwaveFlash.ShockwaveFlash.6");
            e = true;
            i = "6.0.21";
          } catch (o) {
            try {
              d = new a("ShockwaveFlash.ShockwaveFlash");
              e = true;
              i = c(d.GetVariable("$version"));
            } catch (P) {
              f = false;
            }
          }
        }
      }
      j.disabled = e !== true;
      j.outdated = i && D(i) < D("11.0.0");
      j.version = i || "0.0.0";
      j.pluginType = h ? "pepper" : f ? "activex" : e ? "netscape" : "unknown";
    };
  fa(V);
  O(true);
  var g = function () {
    if (!(this instanceof g)) return new g();
    typeof g._createClient === "function" && g._createClient.apply(this, n(arguments));
  };
  na(g, "version", {
    value: "2.2.0",
    writable: false,
    configurable: true,
    enumerable: true,
  });
  g.config = function () {
    return va.apply(this, n(arguments));
  };
  g.state = function () {
    return wa.apply(this, n(arguments));
  };
  g.isFlashUnusable = function () {
    return xa.apply(this, n(arguments));
  };
  g.on = function () {
    return ya.apply(this, n(arguments));
  };
  g.off = function () {
    return za.apply(this, n(arguments));
  };
  g.handlers = function () {
    return Aa.apply(this, n(arguments));
  };
  g.emit = function () {
    return Ca.apply(this, n(arguments));
  };
  g.create = function () {
    return Ea.apply(this, n(arguments));
  };
  g.destroy = function () {
    return Ga.apply(this, n(arguments));
  };
  g.setData = function () {
    return Ha.apply(this, n(arguments));
  };
  g.clearData = function () {
    return Ia.apply(this, n(arguments));
  };
  g.getData = function () {
    return Ja.apply(this, n(arguments));
  };
  g.focus = g.activate = function () {
    return Ka.apply(this, n(arguments));
  };
  g.blur = g.deactivate = function () {
    return La.apply(this, n(arguments));
  };
  g.activeElement = function () {
    return Ma.apply(this, n(arguments));
  };
  var Pa = 0,
    u = {},
    Qa = 0,
    I = {},
    T = {};
  p(l, {
    autoActivate: true,
  });
  var Ra = function (a) {
      var c = this;
      c.id = "" + Pa++;
      u[c.id] = {
        instance: c,
        elements: [],
        handlers: {},
      };
      a && c.clip(a);
      g.on("*", function (b) {
        return c.emit(b);
      });
      g.on("destroy", function () {
        c.destroy();
      });
      g.create();
    },
    Sa = function (a, c) {
      var b,
        d,
        e,
        f = {},
        h = (d = u[this.id]) && d.handlers;
      if (!d) throw Error("Attempted to add new listener(s) to a destroyed ZeroClipboard client instance");
      if (typeof a === "string" && a) e = a.toLowerCase().split(/\s+/);
      else if (typeof a === "object" && a && typeof c === "undefined")
        for (b in a) t.call(a, b) && typeof b === "string" && b && typeof a[b] === "function" && this.on(b, a[b]);
      if (e && e.length) {
        b = 0;
        for (d = e.length; b < d; b++) {
          a = e[b].replace(/^on/, "");
          f[a] = true;
          h[a] || (h[a] = []);
          h[a].push(c);
        }
        f.ready &&
          j.ready &&
          this.emit({
            type: "ready",
            client: this,
          });
        if (f.error) {
          b = 0;
          for (d = A.length; b < d; b++)
            if (j[A[b].replace(/^flash-/, "")]) {
              this.emit({
                type: "error",
                name: A[b],
                client: this,
              });
              break;
            }
          y !== w &&
            g.version !== y &&
            this.emit({
              type: "error",
              name: "version-mismatch",
              jsVersion: g.version,
              swfVersion: y,
            });
        }
      }
      return this;
    },
    Ta = function (a, c) {
      var b,
        d,
        e,
        f,
        h,
        i = (d = u[this.id]) && d.handlers;
      if (!i) return this;
      if (arguments.length === 0) f = X(i);
      else if (typeof a === "string" && a) f = a.split(/\s+/);
      else if (typeof a === "object" && a && typeof c === "undefined")
        for (b in a) t.call(a, b) && typeof b === "string" && b && typeof a[b] === "function" && this.off(b, a[b]);
      if (f && f.length) {
        b = 0;
        for (d = f.length; b < d; b++) {
          a = f[b].toLowerCase().replace(/^on/, "");
          if ((h = i[a]) && h.length)
            if (c)
              for (e = h.indexOf(c); e !== -1; ) {
                h.splice(e, 1);
                e = h.indexOf(c, e);
              }
            else h.length = 0;
        }
      }
      return this;
    },
    Ua = function (a) {
      var c = null,
        b = u[this.id] && u[this.id].handlers;
      if (b) c = typeof a === "string" && a ? (b[a] ? b[a].slice(0) : []) : B(b);
      return c;
    },
    Wa = function (a) {
      if (Va.call(this, a)) {
        if (typeof a === "object" && a && typeof a.type === "string" && a.type) a = p({}, a);
        a = p({}, aa(a), {
          client: this,
        });
        var c = u[this.id];
        if (typeof a === "object" && a && a.type && c) {
          var b = ca(a);
          if ((c = ((c && c.handlers["*"]) || []).concat((c && c.handlers[a.type]) || [])) && c.length) {
            var d, e, f, h, i;
            d = 0;
            for (e = c.length; d < e; d++) {
              f = c[d];
              h = this;
              if (typeof f === "string" && typeof k[f] === "function") f = k[f];
              if (typeof f === "object" && f && typeof f.handleEvent === "function") {
                h = f;
                f = f.handleEvent;
              }
              if (typeof f === "function") {
                i = p({}, a);
                da(f, h, [i], b);
              }
            }
          }
        }
      }
      return this;
    },
    Ya = function (a) {
      if (!u[this.id]) throw Error("Attempted to clip element(s) to a destroyed ZeroClipboard client instance");
      a = ga(a);
      for (var c = 0; c < a.length; c++)
        if (t.call(a, c) && a[c] && a[c].nodeType === 1) {
          if (a[c].zcClippingId) I[a[c].zcClippingId].indexOf(this.id) === -1 && I[a[c].zcClippingId].push(this.id);
          else {
            a[c].zcClippingId = "zcClippingId_" + Qa++;
            I[a[c].zcClippingId] = [this.id];
            l.autoActivate === true && Xa(a[c]);
          }
          var b = u[this.id] && u[this.id].elements;
          b.indexOf(a[c]) === -1 && b.push(a[c]);
        }
      return this;
    },
    Za = function (a) {
      var c = u[this.id];
      if (!c) return this;
      c = c.elements;
      var b;
      a = typeof a === "undefined" ? c.slice(0) : ga(a);
      for (var d = a.length; d--; )
        if (t.call(a, d) && a[d] && a[d].nodeType === 1) {
          for (b = 0; (b = c.indexOf(a[d], b)) !== -1; ) c.splice(b, 1);
          var e = I[a[d].zcClippingId];
          if (e) {
            for (b = 0; (b = e.indexOf(this.id, b)) !== -1; ) e.splice(b, 1);
            if (e.length === 0) {
              if (l.autoActivate === true)
                if ((b = a[d]) && b.nodeType === 1) {
                  e = T[b.zcClippingId];
                  if (typeof e === "object" && e) {
                    for (var f = void 0, h = void 0, i = ["move", "leave", "enter", "out", "over"], m = 0, o = i.length; m < o; m++) {
                      f = "mouse" + i[m];
                      h = e[f];
                      typeof h === "function" && b.removeEventListener(f, h, false);
                    }
                    delete T[b.zcClippingId];
                  }
                }
              delete a[d].zcClippingId;
            }
          }
        }
      return this;
    },
    $a = function () {
      var a = u[this.id];
      return a && a.elements ? a.elements.slice(0) : [];
    },
    ab = function () {
      if (u[this.id]) {
        this.unclip();
        this.off();
        delete u[this.id];
      }
    },
    Va = function (a) {
      if (!(a && a.type)) return false;
      if (a.client && a.client !== this) return false;
      var c = u[this.id],
        b = c && c.elements,
        d = !!b && b.length > 0,
        e = !a.target || (d && b.indexOf(a.target) !== -1);
      b = a.relatedTarget && d && b.indexOf(a.relatedTarget) !== -1;
      a = a.client && a.client === this;
      if (!c || !(e || b || a)) return false;
      return true;
    },
    ga = function (a) {
      if (typeof a === "string") a = [];
      return typeof a.length !== "number" ? [a] : a;
    },
    Xa = function (a) {
      if (a && a.nodeType === 1) {
        var c = function (d) {
            if (d || (d = k.event)) {
              if (d._source !== "js") {
                d.stopImmediatePropagation();
                d.preventDefault();
              }
              delete d._source;
            }
          },
          b = function (d) {
            if (d || (d = k.event)) {
              c(d);
              g.focus(a);
            }
          };
        a.addEventListener("mouseover", b, false);
        a.addEventListener("mouseout", c, false);
        a.addEventListener("mouseenter", c, false);
        a.addEventListener("mouseleave", c, false);
        a.addEventListener("mousemove", c, false);
        T[a.zcClippingId] = {
          mouseover: b,
          mouseout: c,
          mouseenter: c,
          mouseleave: c,
          mousemove: c,
        };
      }
    };
  g._createClient = function () {
    Ra.apply(this, n(arguments));
  };
  g.prototype.on = function () {
    return Sa.apply(this, n(arguments));
  };
  g.prototype.off = function () {
    return Ta.apply(this, n(arguments));
  };
  g.prototype.handlers = function () {
    return Ua.apply(this, n(arguments));
  };
  g.prototype.emit = function () {
    return Wa.apply(this, n(arguments));
  };
  g.prototype.clip = function () {
    return Ya.apply(this, n(arguments));
  };
  g.prototype.unclip = function () {
    return Za.apply(this, n(arguments));
  };
  g.prototype.elements = function () {
    return $a.apply(this, n(arguments));
  };
  g.prototype.destroy = function () {
    return ab.apply(this, n(arguments));
  };
  g.prototype.setText = function (a) {
    if (!u[this.id]) throw Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
    g.setData("text/plain", a);
    return this;
  };
  g.prototype.setHtml = function (a) {
    if (!u[this.id]) throw Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
    g.setData("text/html", a);
    return this;
  };
  g.prototype.setRichText = function (a) {
    if (!u[this.id]) throw Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
    g.setData("application/rtf", a);
    return this;
  };
  g.prototype.setData = function () {
    if (!u[this.id]) throw Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
    g.setData.apply(this, n(arguments));
    return this;
  };
  g.prototype.clearData = function () {
    if (!u[this.id]) throw Error("Attempted to clear pending clipboard data from a destroyed ZeroClipboard client instance");
    g.clearData.apply(this, n(arguments));
    return this;
  };
  g.prototype.getData = function () {
    if (!u[this.id]) throw Error("Attempted to get pending clipboard data from a destroyed ZeroClipboard client instance");
    return g.getData.apply(this, n(arguments));
  };
  if (typeof define === "function" && define.amd)
    define(function () {
      return g;
    });
  else if (typeof module === "object" && module && typeof module.exports === "object" && module.exports) module.exports = g;
  else k.ZeroClipboard = g;
})(
  (function () {
    return this || window;
  })()
);
