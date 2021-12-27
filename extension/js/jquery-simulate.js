(function (g, i) {
  var j = /^key/,
    k = /^(?:mouse|contextmenu)|click/;
  g.fn.simulate = function (d, a) {
    return this.each(function () {
      new g.simulate(this, d, a);
    });
  };
  g.simulate = function (d, a, b) {
    var c = g.camelCase("simulate-" + a);
    this.target = d;
    this.options = b;
    this[c] ? this[c]() : this.simulateEvent(d, a, b);
  };
  g.extend(g.simulate, {
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
    },
    buttonCode: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2,
    },
  });
  g.extend(g.simulate.prototype, {
    simulateEvent: function (d, a, b) {
      var c = this.createEvent(a, b);
      this.dispatchEvent(d, a, c, b);
    },
    createEvent: function (d, a) {
      if (j.test(d)) return this.keyEvent(d, a);
      if (k.test(d)) return this.mouseEvent(d, a);
    },
    mouseEvent: function (d, a) {
      var b, c, e, f;
      a = g.extend(
        {
          bubbles: true,
          cancelable: d !== "mousemove",
          view: window,
          detail: 0,
          screenX: 0,
          screenY: 0,
          clientX: 1,
          clientY: 1,
          ctrlKey: false,
          altKey: false,
          shiftKey: false,
          metaKey: false,
          button: 0,
          relatedTarget: i,
        },
        a
      );
      if (document.createEvent) {
        b = document.createEvent("MouseEvents");
        b.initMouseEvent(
          d,
          a.bubbles,
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
          a.relatedTarget || document.body.parentNode
        );
        if (b.pageX === 0 && b.pageY === 0 && Object.defineProperty) {
          c = b.relatedTarget.ownerDocument || document;
          e = c.documentElement;
          f = c.body;
          Object.defineProperty(b, "pageX", {
            get: function () {
              return a.clientX + ((e && e.scrollLeft) || (f && f.scrollLeft) || 0) - ((e && e.clientLeft) || (f && f.clientLeft) || 0);
            },
          });
          Object.defineProperty(b, "pageY", {
            get: function () {
              return a.clientY + ((e && e.scrollTop) || (f && f.scrollTop) || 0) - ((e && e.clientTop) || (f && f.clientTop) || 0);
            },
          });
        }
      } else if (document.createEventObject) {
        b = document.createEventObject();
        g.extend(b, a);
        b.button =
          {
            0: 1,
            1: 4,
            2: 2,
          }[b.button] || (b.button === -1 ? 0 : b.button);
      }
      return b;
    },
    keyEvent: function (d, a) {
      var b;
      a = g.extend(
        {
          bubbles: true,
          cancelable: true,
          view: window,
          ctrlKey: false,
          altKey: false,
          shiftKey: false,
          metaKey: false,
          keyCode: 0,
          charCode: i,
        },
        a
      );
      if (document.createEvent)
        try {
          b = document.createEvent("KeyEvents");
          b.initKeyEvent(d, a.bubbles, a.cancelable, a.view, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, a.keyCode, a.charCode);
        } catch (c) {
          b = document.createEvent("Events");
          b.initEvent(d, a.bubbles, a.cancelable);
          g.extend(b, {
            view: a.view,
            ctrlKey: a.ctrlKey,
            altKey: a.altKey,
            shiftKey: a.shiftKey,
            metaKey: a.metaKey,
            keyCode: a.keyCode,
            charCode: a.charCode,
          });
        }
      else if (document.createEventObject) {
        b = document.createEventObject();
        g.extend(b, a);
      }
      if (/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()) || {}.toString.call(window.opera) === "[object Opera]") {
        b.keyCode = a.charCode > 0 ? a.charCode : a.keyCode;
        b.charCode = i;
      }
      return b;
    },
    dispatchEvent: function (d, a, b) {
      if (d.dispatchEvent) d.dispatchEvent(b);
      else if (a === "click" && d.click && d.nodeName.toLowerCase() === "input") d.click();
      else d.fireEvent && d.fireEvent("on" + a, b);
    },
    simulateFocus: function () {
      function d() {
        b = true;
      }
      var a,
        b = false,
        c = g(this.target);
      c.bind("focus", d);
      c[0].focus();
      if (!b) {
        a = g.Event("focusin");
        a.preventDefault();
        c.trigger(a);
        c.triggerHandler("focus");
      }
      c.unbind("focus", d);
    },
    simulateBlur: function () {
      function d() {
        b = true;
      }
      var a,
        b = false,
        c = g(this.target);
      c.bind("blur", d);
      c[0].blur();
      setTimeout(function () {
        c[0].ownerDocument.activeElement === c[0] && c[0].ownerDocument.body.focus();
        if (!b) {
          a = g.Event("focusout");
          a.preventDefault();
          c.trigger(a);
          c.triggerHandler("blur");
        }
        c.unbind("blur", d);
      }, 1);
    },
  });
  g.extend(g.simulate.prototype, {
    simulateDrag: function () {
      var d = 0,
        a = this.target,
        b = a.ownerDocument,
        c = this.options,
        e;
      if (c.handle === "corner") {
        var f = a;
        e = g(f.ownerDocument);
        f = g(f);
        f = f.offset();
        e = {
          x: f.left - e.scrollLeft(),
          y: f.top - e.scrollTop(),
        };
      } else {
        e = a;
        var h = g(e.ownerDocument);
        e = g(e);
        f = e.offset();
        e = {
          x: f.left + e.outerWidth() / 2 - h.scrollLeft(),
          y: f.top + e.outerHeight() / 2 - h.scrollTop(),
        };
      }
      f = e;
      e = Math.floor(f.x);
      f = Math.floor(f.y);
      h = {
        clientX: e,
        clientY: f,
      };
      var l = c.dx || (c.x !== i ? c.x - e : 0),
        m = c.dy || (c.y !== i ? c.y - f : 0);
      c = c.moves || 3;
      for (this.simulateEvent(a, "mousedown", h); d < c; d++) {
        e += l / c;
        f += m / c;
        h = {
          clientX: Math.round(e),
          clientY: Math.round(f),
        };
        this.simulateEvent(b, "mousemove", h);
      }
      if (g.contains(b, a)) {
        this.simulateEvent(a, "mouseup", h);
        this.simulateEvent(a, "click", h);
      } else this.simulateEvent(b, "mouseup", h);
    },
  });
})(jQuery);
