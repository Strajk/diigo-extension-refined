window.addEventListener("message", function (b) {
  b = b.data;
  var a = b.data;
  if (b.type == "processFinish") {
    window._DIIGO_CACHE = {
      originUrl: a.url,
      originUser: "luokebi",
      charset: "utf-8",
    };
    $("#entry-content").html(a.content);
    $("#article_original_link").find("a").text(a.host).attr("href", a.url);
    $("title").text(a.title);
    $("#title").text(a.title);
    $(".top-bar").find(".title").text(a.title);
    runDiigolet();
    $("pre").each(function (d, c) {
      hljs.highlightBlock(c);
    });
    $(window).on("scroll", function () {
      document.body.scrollTop > $("#title").offset().top + $("#title").height()
        ? $(".top-bar").find(".title").addClass("show")
        : $(".top-bar").find(".title").removeClass("show");
    });
    window.parent.postMessage(
      {
        type: "processFinish",
      },
      "*"
    );
  } else if (b.type != "processStart")
    if (b.type == "doc_html")
      document.getElementById("process-frame").contentWindow.postMessage(
        {
          type: "doc_html",
          html: a.html,
          uri: a.uri,
          title: a.title,
        },
        "*"
      );
    else if (b.type == "event") console.log(a.e);
    else
      b.type == "processFailed" &&
        window.parent.postMessage(
          {
            type: "processFailed",
          },
          "*"
        );
  if (!localStorage.readability_guide) {
    Guide.show();
    localStorage.readability_guide = "true";
  }
});
$(document).ready(function () {
  function b() {
    $(".reader-area").show();
    $(".save-area").hide();
    $(".top-bar").hide();
    chrome.tabs.getSelected(function (d) {
      chrome.pageCapture.saveAsMHTML(
        {
          tabId: d.id,
        },
        function (c) {
          var e = window.URL.createObjectURL(c);
          chrome.permissions.request(
            {
              permissions: ["downloads"],
            },
            function (f) {
              f &&
                chrome.downloads.download(
                  {
                    url: e,
                    filename: $("#title").text() + ".mhtml",
                    saveAs: true,
                  },
                  function () {
                    $(".reader-area").hide();
                    $(".save-area").show();
                    $(".top-bar").show();
                    URL.revokeObjectURL(e);
                  }
                );
            }
          );
        }
      );
    });
  }

  function a() {
    var d = {
      filename: document.title + ".read",
      contentType: "application/json",
      url: window._DIIGO_CACHE.originUrl,
      blob: JSON.stringify({
        title: document.title,
        url: window._DIIGO_CACHE.originUrl,
        content: $(".left").find("#readability-content")[0].outerHTML,
      }),
    };
    Web.getCommonSharableLink(d).then(
      function () {},
      function (c) {
        console.log(c);
      }
    );
  }
  $("#print").on("click", function () {
    $(".top-bar").hide();
    window.print();
    $(".top-bar").show();
  });
  $("#saveMHTML").on("click", function () {
    $(".top-bar").hide();
    chrome.tabs.getSelected(function (d) {
      chrome.pageCapture.saveAsMHTML(
        {
          tabId: d.id,
        },
        function (c) {
          c = window.URL.createObjectURL(c);
          var e = document.createElement("a");
          e.download = $("#title").text() + ".mhtml";
          e.href = c;
          e.click();
          $(".top-bar").show();
        }
      );
    });
  });
  $("#done").on("click", function () {
    $(".save-area .left").empty().html($("#readability-content")[0].outerHTML);
    $(".reader-area").hide();
    $(".save-area").show();
  });
  $(".action-list")
    .find("a")
    .on("click", function (d) {
      d.preventDefault();
      switch ($(this).attr("data-action")) {
        case "reEdit":
          $(".reader-area").show();
          $(".save-area").hide();
          break;
        case "share":
          a();
          break;
        case "download":
          b();
          break;
        case "print":
          $(".reader-area").show();
          $(".save-area").hide();
          window.print();
          $(".reader-area").hide();
          $(".save-area").show();
          break;
      }
    });
  $("#close").on("click", function () {
    window.history.back();
  });
  $("#open-outliner").on("click", function () {
    $("body").toggleClass("outliner-open");
  });
});
