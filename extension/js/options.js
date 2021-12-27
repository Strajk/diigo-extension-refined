var Bg = chrome.extension.getBackgroundPage(),
  Prefs = Bg.Prefs;

function getSelectedTab(a) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (b) {
      a(b[0]);
    }
  );
}
$(document).ready(function () {
  $("#btnSave").click(function () {
    save();
    $("#noticeSaved").fadeIn("slow").delay(1e3).fadeOut("slow");
    return false;
  });
  $("#btnCancel").click(function () {
    getSelectedTab(function (a) {
      chrome.tabs.remove(a.id);
    });
  });
  $(".go-premium-btn").on("click", function () {
    refreshWindow.show();
  });
  $(".diigolet-option-tip-btn").on("click", function () {
    $(this).siblings(".diigolet-option-tip-container").fadeIn();
  });
  $(".tp-close").on("click", function () {
    $(this).parents(".diigolet-option-tip-container").fadeOut();
  });
  buildSelect();
  prefs2UI();
  $(".diigolet-question-mark").hover(
    function () {
      $(this).find(".diigolet-question-mark-tip").fadeIn();
    },
    function () {
      $(this).find(".diigolet-question-mark-tip").fadeOut();
    }
  );
  $(".cancel-go-premium-btn").on("click", function () {
    $(this).parents(".diigolet-option-tip-container").fadeOut();
  });
  window.location.hash == "#search" && $("#search-tip").find(".diigolet-option-tip-container").show();
  if (Bg.GlobalData.permissions.autoShowAnnotation) $(".tip-premium").addClass("show");
  else {
    $(".tip-no-premium").addClass("show");
    $("#search-tip-premium").show();
  }
  (function () {
    var a = $("#check-autoloadBookmarkStatus"),
      b = $("#check-autoload"),
      c = $("#check-showSearchResultDirectly"),
      e = $("#check-comboSearch");
    a.change(function () {
      a.is(":checked") || b.attr("checked", false);
    });
    e.change(function () {
      e.is(":checked") || c.attr("checked", false);
    });
    b.change(function () {
      b.is(":checked") && a.attr("checked", true);
    });
    c.change(function (d) {
      if (Bg.GlobalData.permissions.autoShowAnnotation) c.is(":checked") && e.attr("checked", true);
      else {
        d.preventDefault();
        c.attr("checked", false);
        $("#search-tip").find(".diigolet-option-tip-container").show();
      }
    });
    $("#check-shortcut-annotate").change(function () {
      shortcutSwitchState("annotate");
    });
    $("#check-shortcut-bookmark").change(function () {
      shortcutSwitchState("bookmark");
    });
    $("#check-shortcut-readlater").change(function () {
      shortcutSwitchState("readlater");
    });
    $("#shortcut-annotate select").change(function () {
      var d = $(this).val();
      $("#shortcut-bookmark select option").each(function () {
        $(this).removeAttr("disabled");
      });
      $('#shortcut-bookmark select option[value="' + d + '"]').attr("disabled", true);
      $("#shortcut-readlater select option").each(function () {
        $(this).removeAttr("disabled");
      });
      $('#shortcut-readlater select option[value="' + d + '"]').attr("disabled", true);
    });
    $("#shortcut-bookmark select").change(function () {
      var d = $(this).val();
      $("#shortcut-annotate select option").each(function () {
        $(this).removeAttr("disabled");
      });
      $('#shortcut-annotate select option[value="' + d + '"]').attr("disabled", true);
      $("#shortcut-readlater select option").each(function () {
        $(this).removeAttr("disabled");
      });
      $('#shortcut-readlater select option[value="' + d + '"]').attr("disabled", true);
    });
    $("#shortcut-readlater select").change(function () {
      var d = $(this).val();
      $("#shortcut-annotate select option").each(function () {
        $(this).removeAttr("disabled");
      });
      $('#shortcut-annotate select option[value="' + d + '"]').attr("disabled", true);
      $("#shortcut-bookmark select option").each(function () {
        $(this).removeAttr("disabled");
      });
      $('#shortcut-bookmark select option[value="' + d + '"]').attr("disabled", true);
    });
  })();
});

function buildSelect() {
  for (var a = ["Q", "D"], b = $("<select></select>"), c = 48; c < 91; c++)
    if (!(c > 57 && c < 65)) {
      var e = String.fromCharCode(c);
      $("<option></option>")
        .attr({
          value: e,
        })
        .text(e)
        .appendTo(b);
    }
  b.appendTo($(".shortcut")).each(function (d) {
    this.value = a[d];
  });
}

function save() {
  $("#check-searcho").is(":checked") || _gaq.push(["_trackEvent", "Disable SearchO", "Diigo"]);
  UI2prefs();
}

function shortcutSwitchState(a) {
  $("#check-shortcut-" + a).is(":checked")
    ? $("#check-shortcut-" + a + "-ctrl,#check-shortcut-" + a + "-alt,#shortcut-" + a + " select").removeAttr("disabled")
    : $("#check-shortcut-" + a + "-ctrl,#check-shortcut-" + a + "-alt,#shortcut-" + a + " select").attr("disabled", "true");
}

function prefs2UI() {
  $("#check-bmPrivateAsDefault").attr({
    checked: Prefs.get("prefs.bookmark.privateByDefault") == "true",
  });
  $("#check-bmUnreadAsDefault").attr({
    checked: Prefs.get("prefs.bookmark.unreadByDefault") == "true",
  });
  $("#check-autoloadBookmarkStatus").attr({
    checked: Prefs.get("prefs.autoloadBookmarkStatus") == "true",
  });
  $("#check-autoload").attr({
    checked: Prefs.get("prefs.autoload") == "true",
  });
  $("#check-contextMenu").attr({
    checked: Prefs.get("prefs.contextMenu") == "true",
  });
  $("#check-comboSearch").attr({
    checked: Prefs.get("prefs.comboSearch") == "true",
  });
  $("#check-searcho").attr({
    checked: Prefs.get("prefs.SearchO") == "true",
  });
  $("#check-autoshowicon").attr({
    checked: Prefs.get("prefs.autoShowHighlightIcon") == "true",
  });
  $("#check-autoImageClipper").attr({
    checked: Prefs.get("prefs.autoImageClipper") == "true",
  });
  $("#check-autoCloseReadLater").attr({
    checked: Prefs.get("prefs.autoCloseReadLater") == "true",
  });
  $("#check-shortcut-annotate").attr({
    checked: Prefs.get("prefs.shortcutAnnotate") == "true",
  });
  $("#check-shortcut-bookmark").attr({
    checked: Prefs.get("prefs.shortcutBookmark") == "true",
  });
  $("#check-shortcut-readlater").attr({
    checked: Prefs.get("prefs.shortcutReadlater") == "true",
  });
  $("#check-showSearchResultDirectly").attr({
    checked: Prefs.get("prefs.directlyShowSearchResults") == "true",
  });
  $("#check-shortcut-annotate-ctrl").attr({
    checked: Prefs.get("prefs.shortcutAnnotateCtrl") == "true",
  });
  $("#check-shortcut-annotate-alt").attr({
    checked: Prefs.get("prefs.shortcutAnnotateAlt") == "true",
  });
  $("#shortcut-annotate select").val(Prefs.get("prefs.shortcutAnnotateKey"));
  $("#check-shortcut-bookmark-ctrl").attr({
    checked: Prefs.get("prefs.shortcutBookmarkCtrl") == "true",
  });
  $("#check-shortcut-bookmark-alt").attr({
    checked: Prefs.get("prefs.shortcutBookmarkAlt") == "true",
  });
  $("#shortcut-bookmark select").val(Prefs.get("prefs.shortcutBookmarkKey"));
  $("#check-shortcut-readlater-ctrl").attr({
    checked: Prefs.get("prefs.shortcutReadlaterCtrl") == "true",
  });
  $("#check-shortcut-readlater-alt").attr({
    checked: Prefs.get("prefs.shortcutReadlaterAlt") == "true",
  });
  $("#shortcut-readlater select").val(Prefs.get("prefs.shortcutReadlaterKey"));
  $("#check-showPdfButton").attr({
    checked: Prefs.get("prefs.showPdfButton") == "true",
  });
  shortcutSwitchState("bookmark");
  shortcutSwitchState("annotate");
  shortcutSwitchState("readlater");
}

function UI2prefs() {
  Prefs.set({
    "prefs.bookmark.privateByDefault": $("#check-bmPrivateAsDefault").is(":checked"),
  });
  Prefs.set({
    "prefs.bookmark.unreadByDefault": $("#check-bmUnreadAsDefault").is(":checked"),
  });
  Prefs.set({
    "prefs.autoloadBookmarkStatus": $("#check-autoloadBookmarkStatus").is(":checked"),
  });
  Prefs.set({
    "prefs.autoload": $("#check-autoload").is(":checked"),
  });
  Prefs.set({
    "prefs.contextMenu": $("#check-contextMenu").is(":checked"),
  });
  Prefs.set({
    "prefs.comboSearch": $("#check-comboSearch").is(":checked"),
  });
  Prefs.set({
    "prefs.SearchO": $("#check-searcho").is(":checked"),
  });
  Prefs.set({
    "prefs.autoShowHighlightIcon": $("#check-autoshowicon").is(":checked"),
  });
  Prefs.set({
    "prefs.autoImageClipper": $("#check-autoImageClipper").is(":checked"),
  });
  Prefs.set({
    "prefs.shortcutAnnotate": $("#check-shortcut-annotate").is(":checked"),
  });
  Prefs.set({
    "prefs.shortcutBookmark": $("#check-shortcut-bookmark").is(":checked"),
  });
  Prefs.set({
    "prefs.shortcutReadlater": $("#check-shortcut-readlater").is(":checked"),
  });
  Prefs.set({
    "prefs.shortcutAnnotateCtrl": $("#check-shortcut-annotate-ctrl").is(":checked"),
  });
  Prefs.set({
    "prefs.shortcutAnnotateAlt": $("#check-shortcut-annotate-alt").is(":checked"),
  });
  Prefs.set({
    "prefs.shortcutBookmarkCtrl": $("#check-shortcut-bookmark-ctrl").is(":checked"),
  });
  Prefs.set({
    "prefs.shortcutBookmarkAlt": $("#check-shortcut-bookmark-alt").is(":checked"),
  });
  Prefs.set({
    "prefs.shortcutReadlaterCtrl": $("#check-shortcut-readlater-ctrl").is(":checked"),
  });
  Prefs.set({
    "prefs.shortcutReadlaterAlt": $("#check-shortcut-readlater-alt").is(":checked"),
  });
  Prefs.set({
    "prefs.shortcutAnnotateKey": $("#shortcut-annotate select").val(),
  });
  Prefs.set({
    "prefs.shortcutBookmarkKey": $("#shortcut-bookmark select").val(),
  });
  Prefs.set({
    "prefs.shortcutReadlaterKey": $("#shortcut-readlater select").val(),
  });
  Prefs.set({
    "prefs.autoCloseReadLater": $("#check-autoCloseReadLater").is(":checked"),
  });
  Prefs.set({
    "prefs.directlyShowSearchResults": $("#check-showSearchResultDirectly").is(":checked"),
  });
  Prefs.set({
    "prefs.showPdfButton": $("#check-showPdfButton").is(":checked"),
  });
}
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-295754-35"]);
_gaq.push(["_trackPageview"]);
(function () {
  var a = document.createElement("script");
  a.type = "text/javascript";
  a.async = true;
  a.src = "https://ssl.google-analytics.com/ga.js";
  var b = document.getElementsByTagName("script")[0];
  b.parentNode.insertBefore(a, b);
})();
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
      '<div id="diigo-refresh-warning"><div id="diigo-refresh-warning-content"><div id="diigo-refresh-warning-main" class="clearfloat"><div id="diigo-refresh-warning-icon"></div><div id="diigo-refresh-warning-text"><p>After you upgrade to premium, click \u2018refresh\u2019 to access premium options.</p></div></div><div id="diigo-refresh-warning-bottom" class="clearfloat"><div id="diigo-refresh"class="diigo-refresh-warning-btn">Refresh</div><div id="diigo-refresh-warning-cancel"class="diigo-refresh-warning-btn">Cancel</div></div></div></div>'
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
                $("#premium-field").hide();
                a.destroy();
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

function showUpgradeWin() {
  var a = $(
    '<div class="modelWin-wrapper"><div class="modelWin"><div class="modelWin-close"></div><div class="modelWin-content">The ability to show highlights and notes automatically when you return to your annotated pages is a premium feature, and the free trial has expired.</div><div class="modelWin-action"><a class="modelWin-primary-btn" id="upgrade" href="https://www.diigo.com/premium" target="_blank">Upgrade now</a></div></div></div>'
  ).appendTo($("html"));
  $("#upgrade").on("click", function () {
    refreshWindow.show();
    a.remove();
  });
  $(".modelWin-close").on("click", function () {
    $(this).parents(".modelWin-wrapper").remove();
  });
}
