(function (c) {
  var h, p;
  c.fn.Gtooltip = function (s) {
    var t = {
      fontSize: 12,
      bgColor: "black",
      fColor: "white",
      position: "bottom",
      content: "",
    };
    return this.each(function () {
      function q() {
        l.text(e.data("gtooltip"));
        var a;
        a = e.offset().left;
        var r = e.offset().top,
          i = e.width(),
          u = e.height(),
          f = b.width(),
          v = b.height(),
          j,
          d,
          m,
          n,
          g = navigator.userAgent.toLowerCase();
        g = g.indexOf("macintosh") != -1 || g.indexOf("mac os x") != -1 || g.indexOf("linux") != -1 ? true : false;
        switch (o.position) {
          case "bottom":
            n = g ? -9 : -10;
            j = parseInt((f + 2) / 2);
            d = a - parseInt((f + 14 - i) / 2);
            m = r + u + 5;
            break;
          case "top":
            n = g ? 22 : 23;
            j = parseInt((f + 2) / 2);
            d = a - parseInt((f + 14 - i) / 2);
            m = r - v - 15;
            break;
        }
        if (d <= 0) {
          d = a;
          j = (i - 10) / 2;
        } else if (d >= window.innerWidth - f) {
          d = a + i - f - 12;
          j = a - d + (i - 10) / 2;
        }
        a = {
          atop: n,
          aleft: j,
          left: a,
          tleft: d,
          ttop: m,
        };
        b.css("left", a.tleft).css("top", a.ttop);
        k.css({
          left: a.aleft,
          top: a.atop,
        });
        if (o.position == "top") k.css("-webkit-transform", "rotate(180deg)");
        else o.position == "bottom" && k.css("-webkit-transform", "rotate(360deg)");
        b.addClass("show");
      }
      var o = c.extend(t, s || {}),
        e = c(this),
        b,
        l,
        k;
      if (c("#gtooltip").length == 0) {
        b = c('<div id="gtooltip"></div>').appendTo(c("body"));
        l = c('<div id="gtooltip-content"></div>').appendTo(b);
        k = c('<div id="gtooltip-arrow"></div>').appendTo(b);
      } else {
        b = c("#gtooltip");
        l = c("#gtooltip-content");
        k = c("#gtooltip-arrow");
      }
      e.hover(
        function () {
          if (b.hasClass("show")) {
            clearTimeout(p);
            q();
          } else
            h = setTimeout(function () {
              q();
            }, 350);
        },
        function () {
          h != null && clearTimeout(h);
          p = setTimeout(function () {
            b.removeClass("show");
          }, 100);
        }
      ).on("click", function () {
        h != null && clearTimeout(h);
        b.hasClass("show") && b.removeClass("show");
      });
    });
  };
})(jQuery);
