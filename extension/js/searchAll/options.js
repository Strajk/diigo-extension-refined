var UI = {},
  Util = {},
  BG = chrome.extension.getBackgroundPage();
UI.BuildHtml = function () {
  LoadAllItems(function (b, a) {
    for (var e = a.rows, c = e.length, d = [], f = 0; f < c; f++) {
      var g = e.item(f);
      if (g.enable == 1) d.push(g);
      else {
        var h = '<li data-id="' + g.id + '"><img src="' + g.icondataurl + '" />' + g.name + "<span></span></li>";
        $("#" + g.category + "_section ul").append(h);
      }
    }
    e = JSON.parse(localStorage.customize_sort_id);
    console.log(e);
    for (f = 0; f < e.length; f++)
      for (k in d)
        if (d[k].id == e[f]) {
          h = '<li data-id="' + d[k].id + '" ><img src="' + d[k].icondataurl + '" />' + d[k].name + "<span>Remove</span></li>";
          $("#list_sortable").append(h);
          break;
        }
    console.log("html build OK");
    UI.BuildUIFunction();
  });
};
UI.BuildItem = function (b) {
  LoadItemById(b, function (a, e) {
    var c = e.rows.item(0);
    if (c.enable == 1) {
      var d = '<li data-id="' + c.id + '" ><img src="' + c.icondataurl + '" />' + c.name + "<span>Remove</span></li>";
      $("#list_sortable").append(d);
    } else if (c.category == "customize") DeleteItemFromId(b, function () {});
    else {
      d = '<li data-id="' + c.id + '"><img src="' + c.icondataurl + '" />' + c.name + "<span></span></li>";
      var f = $("#list_ecommod div").index($("#" + c.category + "_section"));
      $("#list_ecommod").accordion("option", "active", f);
      $("#" + c.category + "_section ul").append(d);
    }
    UI.Sort();
  });
};
UI.BuildUIFunction = function () {
  $("#list_sortable").sortable({
    stop: UI.Sort,
  });
  $("#list_ecommod").accordion({
    autoHeight: false,
  });
  UI.BindFunction();
};
UI.Sort = function () {
  SortArray = [];
  $.each($("#list_sortable li"), function () {
    SortArray.push($(this).attr("data-id"));
  });
  localStorage.customize_sort_id = JSON.stringify(SortArray);
  BG.util.CreateContextMenu();
};
UI.BindFunction = function () {
  $("#list_sortable li span").live("click", function () {
    if ($("#list_sortable li").length != 1) {
      var b = $(this).parent(),
        a = b.attr("data-id");
      ModifyEnable(parseInt(a), 0, function () {
        b.remove();
        UI.BuildItem(parseInt(a));
      });
    }
  });
  $("#list_ecommod ul li span").live("click", function () {
    var b = $(this).parent(),
      a = b.attr("data-id");
    ModifyEnable(parseInt(a), 1, function () {
      b.remove();
      UI.BuildItem(parseInt(a));
    });
  });
  $("#searchurl").bind("textchange", function () {
    var b = $(this).val();
    if ($("#searchname").val().length < 2) {
      var a = b.match(/\.(.*?)\./);
      a = a == null ? b.match(/(.*?)\./)[1] : a[1];
      $("#searchname").val(a);
    }
    if (!/{%s}/.test(b)) {
      console.log(b);
      a = b.indexOf("www.asos.com") > 0 ? b.replace(/searcho$/, "{%s}") : b.replace(/searcho/, "{%s}");
      console.log(a);
      a != b && $(this).val(a);
    }
  });
  $("#addnewsearch").click(function () {
    var b = $("#searchname").val(),
      a = $("#searchurl").val();
    if (b.length < 2 || !/{%s}/.test(a)) $("#tip2").fadeIn(300).delay(2e3).hide(0);
    else {
      var e = UI.getFavicon(a);
      AddCustomizeSearch(b, a, e, function (c, d) {
        var f = d.insertId;
        $("#searchname").val("");
        $("#searchurl").val("");
        UI.BuildItem(parseInt(f));
      });
    }
  });
};
UI.getFavicon = function (b) {
  b = b.match(/\/\/(.*?)\//)[1];
  var a = "chrome://favicon/https://" + b;
  try {
    requestFile(
      a,
      function (c) {
        a = makeDataUrl(c.contentType, c.data);
      },
      true
    );
  } catch (e) {
    a = "../style/favicon.png";
  }
  return a;
};
$(function () {
  $('label[for="googlelocal"]').html("Use " + chrome.i18n.getMessage("google"));
  $(":checkbox").each(function () {
    this.checked = localStorage[this.id] == "true" ? true : false;
  });
  $(":checkbox").change(function () {
    localStorage[this.id] = this.checked;
    $("#tip").fadeIn(300).delay(2e3).hide(0);
    BG.refreshOptions();
  });
  UI.BuildHtml();
});
