var refreshWindow = {
  j: null,
  k: null,
  shown: false,
  init: function () {
    this.create();
  },
  create: function () {
    var a = this;
    a.j = $(
      '<div id="diigo-refresh-warning"><div id="diigo-refresh-warning-content"><div id="diigo-refresh-warning-main" class="clearfloat"><div id="diigo-refresh-warning-icon"></div><div id="diigo-refresh-warning-text"><p>After you upgrade to premium, click "refresh" to access premium options.</p></div></div><div id="diigo-refresh-warning-bottom" class="clearfloat"><div id="diigo-refresh"class="diigo-refresh-warning-btn">Refresh</div><div id="diigo-refresh-warning-cancel"class="diigo-refresh-warning-btn">Cancel</div></div></div></div>'
    )
      .eq(0)
      .appendTo(document.body.parentNode)
      .hide();
    a.k = $('<div id="diigo-refresh-warning-wrapper"></div>').eq(0).appendTo(document.body.parentNode).hide();
    $("#diigo-refresh").on("click", function () {
      if (!$(this).hasClass("disabled")) {
        $(this).text("Refreshing...").addClass("disabled");
        new Bg.WebAPICall().invoke(
          "user_loadMyStuff",
          {
            what: "permissions",
          },
          {
            user: Bg.GlobalData.user,
            transId: null,
            complete: function (b) {
              if (b.resp) {
                Bg.GlobalData.permissions = b.resp.result.permissions;
                a.destroy();
                if (Bg.GlobalData.permissions.autoShowAnnotation) {
                  $("#no-premium").hide();
                  $("#premium").fadeIn();
                }
                forEachWebTab(function (c) {
                  Messenger.send(c.id, {
                    name: "myStuffLoaded",
                    details: b.resp.result,
                    fromTabId: null,
                  });
                });
              }
            },
          }
        );
      }
    });
    $("#diigo-refresh-warning-cancel").on("click", function () {
      a.destroy();
    });
  },
  destroy: function () {
    this.k.remove();
    this.j.remove();
    this.j = null;
    this.shown = false;
  },
  show: function () {
    this.j || this.init();
    var a = this;
    if (a.shown != true) {
      var b = document.body.scrollWidth;
      a.k.css("height", document.body.scrollHeight).css("width", b).show();
      b = (window.screen.availHeight - 356) / 2 + document.body.scrollTop;
      this.j.css("left", (window.screen.availWidth - 356) / 2 + "px").css("top", b + "px");
      a.j.show();
      a.shown = true;
      $("#diigo-go-premium").click(function () {
        window.open("https://www.diigo.com/premium");
      });
      $("#diigo-premium-warning-cancel").click(function () {
        a.destroy();
      });
    }
  },
};
