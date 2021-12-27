function ComboSearch(a, b, c, d) {
  this.query = a;
  this.tabId = b;
  this.element = c;
  this.issearcho = d;
  this.timer = null;
}
extend(ComboSearch, {
  init: function () {},
  onTabUpdated: function (a, b, c, d) {
    c = c.url;
    var e;
    if (!(b.status != "loading" || !SignInManager.isSignedIn())) {
      if (/\.google\./.test(c)) {
        e = (b = c.match(/.*(&|\?|#)q=([^&]+)(&|$)/)) && b[2];
        var f = "#rhs";
      } else if (/\.bing\./.test(c)) {
        e = (b = c.match(/(&q|\?q)=(.*?)(&|$)/)) && b[2];
        f = "#results_container";
      } else if (/\.yahoo\./.test(c)) {
        e = (b = c.match(/(&p|\?p)=(.*?)(&|$)/)) && b[2];
        f = "#web";
      }
      new this(e, a, f, d).search();
    }
  },
  isGoogleSearch: function (a) {
    if (!/\.google\./.test(a)) return null;
    return (a = a.match(/&q=(.*?)(&|$)/)) && a[1];
  },
});
extend(ComboSearch.prototype, {
  discard: function () {
    this.discarded = true;
    this.api.cancel();
  },
  inject: function () {
    var a = this;
    chrome.tabs.get(a.tabId, function (b) {
      if (isURLApplicable2(b.url)) {
        chrome.tabs.insertCSS(a.tabId, {
          file: "css/comboSearch.css",
        });
        chrome.tabs.executeScript(a.tabId, {
          file: "js/content/comboSearch.js",
        });
      }
    });
  },
  search: function () {
    var a = this;
    a.inject();
    var b = new WebAPICall();
    a.query != undefined &&
      b.invoke(
        "search_bookmark",
        {
          fullText: decodeURIComponent(a.query.replace(/\+/g, "%20")),
        },
        {
          user: GlobalData.user,
          complete: function (c) {
            if (!c.cancelled) (c = c.resp) && c.code == 1 && c.result.bookmarks.length > 0 && a.onResult(c.result);
          },
        }
      );
  },
  onResult: function (a) {
    var b = this;
    b.discarded ||
      chrome.tabs.get(b.tabId, function (c) {
        b.timer = setInterval(function () {
          chrome.tabs.executeScript(
            c.id,
            {
              code:
                "ComboSearch.showResult(" +
                JSON.stringify({
                  results: a.bookmarks,
                  total: a.total,
                  key: b.query,
                  element: b.element,
                }) +
                ")",
            },
            function () {
              clearInterval(b.timer);
            }
          );
        }, 300);
      });
  },
});

function isURLApplicable2(a) {
  if (/\/item\/pdf/i.test(a)) return false;
  else if (/^https?:\/\/chrome\.google\.com\/(extensions|webstore)/i.test(a)) return false;
  else if (/^chrome?:\/\/*/i.test(a)) return false;
  return true;
}

function SearchO(a, b, c) {
  this.query = a;
  this.tabId = b;
  this.iscombosearch = c;
}
extend(SearchO, {
  init: function (a, b, c, d) {
    c = c.url;
    if (isURLApplicable2(c)) {
      chrome.tabs.insertCSS(this.tabId, {
        file: "css/comboSearch.css",
      });
      chrome.tabs.executeScript(this.tabId, {
        file: "js/content/searcho.js",
      });
      if (b.status == "loading")
        if (/\.google\./.test(c)) {
          b = (b = c.match(/(&q|\?q)=(.*?)(&|$|#)/)) && b[2];
          new this(b, a, d).google();
        } else if (/\.bing\./.test(c)) {
          b = (b = c.match(/(&q|\?q)=(.*?)(&|$|#)/)) && b[2];
          new this(b, a, d).bing();
        } else if (/\.yahoo\./.test(c)) {
          b = (b = c.match(/(&p|\?p)=(.*?)(&|$|#)/)) && b[2];
          new this(b, a, d).yahoo();
        }
    }
  },
});
extend(SearchO.prototype, {
  google: function () {
    var a = this;
    chrome.tabs.get(a.tabId, function (b) {
      chrome.tabs.executeScript(b.id, {
        code:
          "searcho.showResult(" +
          JSON.stringify({
            query: a.query,
            iscombosearch: a.iscombosearch,
            element: "#center_col",
          }) +
          ")",
      });
    });
  },
  bing: function () {
    var a = this;
    chrome.tabs.get(a.tabId, function (b) {
      chrome.tabs.executeScript(b.id, {
        code:
          "searcho.showResult(" +
          JSON.stringify({
            query: a.query,
            iscombosearch: a.iscombosearch,
            element: "#results_container",
          }) +
          ")",
      });
    });
  },
  yahoo: function () {
    var a = this;
    chrome.tabs.get(a.tabId, function (b) {
      chrome.tabs.executeScript(b.id, {
        code:
          "searcho.showResult(" +
          JSON.stringify({
            query: a.query,
            iscombosearch: a.iscombosearch,
            element: "#web",
          }) +
          ")",
      });
    });
  },
});
