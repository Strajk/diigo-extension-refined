function resetForm() {
  $("#subject").val("");
  $("#content").val("");
}

function isEmptyString(a) {
  return a.trim() === "";
}

function validateForm() {
  var a = $("#subject"),
    b = $("#content"),
    e = a.val(),
    c = b.val();
  if (isEmptyString(e)) {
    a.addClass("warning");
    return false;
  } else a.removeClass("warning");
  if (isEmptyString(c)) {
    b.addClass("warning");
    return false;
  } else b.removeClass("warning");
  return true;
}
$("#send-btn").on("click", function () {
  var a = this;
  if (validateForm()) {
    var b = $("#subject").val() + " (Chrome extension)",
      e = $("#content").val(),
      c = new URLSearchParams(window.location.search);
    c = decodeURIComponent(c.get("refer")) || "Chrome extension";
    var f = chrome.runtime.getManifest().version;
    b = {
      subject: b,
      message:
        e +
        "<br/><br/><br/><hr size='1'/><span style='font-weight:bold;'>Browser: </span>" +
        window.navigator.userAgent +
        "<br/><span style='font-weight:bold;'>Referrer: </span>" +
        c +
        "<br/><span style='font-weight:bold;'>Extension version: </span>" +
        f +
        "<br/>",
      from: "extension",
    };
    $(this).addClass("processing").text("SENDING...");
    $.ajax({
      type: "POST",
      url: "https://www.diigo.com/common/contact",
      data: b,
      dataType: "json",
      success: function (d) {
        $(a).removeClass("processing").text("SEND");
        $(".success-area").addClass("show");
        d = d.email;
        $("#user-email").text(d);
      },
      error: function (d) {
        $(a).removeClass("processing").text("SEND");
        console.log(d);
      },
    });
  }
});
$("#send-again").on("click", function () {
  $(".success-area").removeClass("show");
  resetForm();
});
var Bg = chrome.extension.getBackgroundPage();
Bg.GlobalData.permissions.servicePlanName != "Free"
  ? $(".main-content").find(".tip").html("As a premium user, you will get priority support.")
  : $(".main-content")
      .find(".tip")
      .html('<a href="https://www.diigo.com/premium?f=feedback_ext" target="_blank">Go premium</a> to get priority support!');
