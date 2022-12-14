var CrossPromotion = (function () {
  var g = {
    messages: null,
    lastShownIndex: -1,
    lastLoadedAt: null,
    requestCounter: 0,
    init: function () {},
    rememberReadMsg: function (b) {
      var a = this.loadReadMsgs();
      if (!find(a, b)) {
        a.push(b);
        this.saveReadMsgs(a);
      }
    },
    loadReadMsgs: function () {
      var b = Prefs.getUserData("readMsgs");
      return b ? JSON.parse(b) : [];
    },
    saveReadMsgs: function (b) {
      Prefs.setUserData({
        readMsgs: JSON.stringify(b),
      });
    },
    loadMessages: function () {
      var b = this;
      b.lastLoadedAt = new Date();
      $.ajax({
        url: "https://www." + D.config.DOMAIN + "/promotion/diigo-highlighter-crx.json",
        dataType: "json",
        success: function (a) {
          if (a && $.isArray(a)) {
            b.messages = a;
            a = b.loadReadMsgs();
            b.removeMsgs(a);
          }
        },
      });
    },
    removeMsgs: function (b) {
      var a, c, e, d, f;
      a = 0;
      for (e = b.length; a < e; a++) {
        f = b[a];
        c = 0;
        for (d = this.messages.length; c < d; c++)
          if (this.messages[c].id == f) {
            this.messages.splice(c--, 1);
            d--;
          }
      }
    },
  };
  extend(g, {
    pickMessage: function () {
      if (!this.messages || (new Date().getTime() - this.lastLoadedAt.getTime()) / 1e3 / 3600 > 2) {
        this.loadMessages();
        return null;
      }
      if (++this.requestCounter % 10 != 0) return null;
      if (++this.lastShownIndex >= this.messages.length) this.lastShownIndex = 0;
      return this.messages[this.lastShownIndex];
    },
    messageClicked: function (b) {
      var a = find(this.messages, function (c) {
        return c.id == b;
      });
      a && gaq_push(["_trackEvent", "Promotion", a.gaEventAction]);
      a = this.removeMsgs([b]);
      a > -1 && this.lastShownIndex >= a && this.lastShownIndex--;
      this.rememberReadMsg(b);
    },
    userChanged: function () {
      this.messages = null;
    },
  });
  return g;
})();
