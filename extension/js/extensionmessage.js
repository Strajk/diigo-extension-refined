function useGA() {
  window._gaq = window._gaq || [];
  _gaq.push(["_setAccount", "UA-295754-32"]);
  _gaq.push(["_trackPageview"]);
  (function () {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = "https://ssl.google-analytics.com/ga.js";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
  })();
}

function gaq_push(a) {
  window._gaq && _gaq.push(a);
}
var RLF_ID = "decdfngdidijkdjgbknlnepdljfaepji",
  AW_ID = "alelhddbbhepgpmgidjdcjakblofbmce",
  QN_ID = "mijlebbfndhelmdpmllgcfadlkankhok",
  DIIGO_ID = "oojbgadfejifecebmdnhhkbhdjaphole";

function sendsettingtoother(a) {
  chrome.runtime.sendMessage(
    AW_ID,
    {
      action: "setoption",
      key: a,
    },
    function (b) {
      console.log(b.message);
    }
  );
  chrome.runtime.sendMessage(
    QN_ID,
    {
      action: "setoption",
      key: a,
    },
    function (b) {
      console.log(b.message);
    }
  );
  chrome.runtime.sendMessage(
    RLF_ID,
    {
      action: "setoption",
      key: a,
    },
    function (b) {
      console.log(b.message);
    }
  );
}

function getsettingformother() {
  chrome.runtime.sendMessage(
    AW_ID,
    {
      action: "getoption",
    },
    function (a) {
      a.key == "false" &&
        Prefs.set({
          "prefs.SearchO": false,
        });
    }
  );
  chrome.runtime.sendMessage(
    QN_ID,
    {
      action: "getoption",
    },
    function (a) {
      a.key == "false" &&
        Prefs.set({
          "prefs.SearchO": false,
        });
    }
  );
  chrome.runtime.sendMessage(
    RLF_ID,
    {
      action: "getoption",
    },
    function (a) {
      a.key == "false" &&
        Prefs.set({
          "prefs.SearchO": false,
        });
    }
  );
}
