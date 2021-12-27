var Bg = chrome.extension.getBackgroundPage(),
  Prefs = Bg.Prefs,
  BoxOAuth = {
    Box_AuthCode: null,
    Box_Acesstoken: null,
    DropBox_AuthCode: null,
    DropBox_Token: null,
    box_getOauthCode_url: "https://account.box.com/api/oauth2/authorize",
    box_accesstoken_url: "https://api.box.com/oauth2/token",
    dropBox_getOauthCode_url: "https://www.dropbox.com/oauth2/authorize",
    dropBox_accesstoken_url: "https://api.dropboxapi.com/oauth2/token",
    Box_client_id: "ulhusf6e8z6vaz6jzh5bloh1gkipgvmu",
    Box_serert: "eMiQjk9T28IA5ByL3XaY1dIgBeYsRmJd",
    DropBoxkey: "s9959tffnnfeyie",
    DropBoxserert: "3cg7o2nmkhlr3nd",
    init: function (a) {
      var b = this;
      b.channel = a;
      b.reset();
      b.tabUpdatededListener = function () {
        return b.onTabUpdated.apply(b, [].slice.call(arguments));
      };
      chrome.tabs.getCurrent(function (c) {
        b.id = c.id;
      });
    },
    onTabUpdated: function (a, b, c) {
      if (this.oauthPinTab && this.oauthPinTab.id == a && /error=/.test(c.url)) {
        chrome.tabs.remove(this.oauthPinTab.id);
        chrome.tabs.update(this.id, {
          selected: true,
        });
        closeFilePicker();
      } else !this.oauthPinTab || this.oauthPinTab.id != a || !/localhost\/\?code=/.test(c.url) || this.getAuthCode(c.url);
    },
    reset: function () {
      this.oauthPinTab = null;
      chrome.tabs.onUpdated.removeListener(this.tabUpdatededListener);
      if (this.channel == Box) this.Box_Acesstoken = this.Box_AuthCode = null;
      else if (this.channel == Dropbox) this.DropBox_Token = this.DropBox_AuthCode = null;
    },
    removeUser: function () {
      if (this.channel == Box) Prefs.removeUserData("BoxToken");
      else this.channel == Dropbox && Prefs.removeUserData("DropBoxToken");
    },
    tryGetAuthCode: function () {
      var a = this;
      a.reset();
      var b, c;
      if (a.channel == Box) {
        b = a.Box_client_id;
        c = a.box_getOauthCode_url;
      } else if (a.channel == Dropbox) {
        b = a.DropBoxkey;
        c = a.dropBox_getOauthCode_url;
      }
      b &&
        chrome.tabs.create(
          {
            url: c + "?response_type=code&redirect_uri=https://localhost&client_id=" + b,
            selected: true,
          },
          function (d) {
            a.oauthPinTab = d;
            chrome.tabs.onUpdated.addListener(a.tabUpdatededListener);
          }
        );
    },
    getAuthCode: function (a) {
      if ((a = a.match(/localhost\/\?code=(.*)/)[1])) {
        this.Box_AuthCode = a;
        chrome.tabs.remove(this.oauthPinTab.id);
        chrome.tabs.update(this.id, {
          selected: true,
        });
        this.getAccessToken(a);
        chrome.tabs.onUpdated.removeListener(this.tabUpdatededListener);
      }
    },
    loadTokenInfo: function () {
      if (this.channel == Box) {
        var a = Prefs.getUserData("BoxToken");
        if (a) return (this.Box_Acesstoken = a);
      } else if (this.channel == Dropbox) if ((a = Prefs.getUserData("DropBoxToken"))) return (this.DropBox_Token = a);
      return null;
    },
    storeTokenInfo: function (a) {
      if (this.channel == Box) {
        this.Box_Acesstoken = a;
        Prefs.setUserData({
          BoxToken: a,
        });
      } else if (this.channel == Dropbox) {
        this.DropBox_Token = a;
        Prefs.setUserData({
          DropBoxToken: a,
        });
      }
    },
    getAccessToken: function (a) {
      var b = this,
        c,
        d,
        f;
      if (b.channel == Box) {
        c = b.Box_client_id;
        f = b.box_accesstoken_url;
        d = b.Box_serert;
      } else if (b.channel == Dropbox) {
        c = b.DropBoxkey;
        f = b.dropBox_accesstoken_url;
        d = b.DropBoxserert;
      }
      a &&
        $.ajax({
          type: "POST",
          url: f,
          data: {
            grant_type: "authorization_code",
            code: a,
            client_id: c,
            client_secret: d,
            redirect_uri: "https://localhost",
          },
          dataType: "json",
          success: function (e) {
            b.storeTokenInfo(e.access_token);
            buildBoxItem(e.access_token);
          },
          error: function (e) {
            console.log(e);
          },
        });
    },
  };
