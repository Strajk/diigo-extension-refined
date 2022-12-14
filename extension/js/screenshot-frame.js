var editor = null;

function editor_style_callback(a, b) {
  switch (a) {
    case "crop":
      if (b !== "done") {
        $("#crop-dimension").show();
        $("#cd-width").val(b.width);
        $("#cd-height").val(b.height);
      }
      break;
    case "undo":
      sendMessage({
        type: "canUndo",
        canUndo: b,
      });
      break;
    case "redo":
      $('.single-btn[data-action="redo"]').toggleClass("disabled", !b);
      break;
    case "del":
      $('.single-btn[data-action="deleteSelected"]').toggleClass("disabled", !b);
      break;
    case "clear":
      $('.single-btn[data-action="clear"]').toggleClass("disabled", b);
      break;
  }
}

function initEditor(a, b) {
  var c = $("#editor-outer-container"),
    e = c.find(".editor-container"),
    f = c.find(".doodle-canvas"),
    g = c.find(".layer-canvas"),
    h = c.find(".editor-outer-textarea"),
    i = c.find(".editor-textarea"),
    j = c.find(".editor-list-dialog"),
    d = new Image();
  editor = new Diigo.Doodle._Drawer(
    {
      out_container: c[0],
      container: e[0],
      doodle_canvas: f[0],
      layer_canvas: g[0],
      textarea: i[0],
      textarea_out: h[0],
      $list_dialog: j,
      image: d,
    },
    function (k, l) {
      editor_style_callback(k, l);
    }
  );
  d.src = a;
  d.onload = function () {
    editor.setBgImage(d, false);
    editor.setPenColor("#f00");
    editor.setPenType("curve");
    b && editor.setPenType(b);
  };
}

function sendMessage(a) {
  window.parent.postMessage(a, "*");
}
window.addEventListener("message", function (a) {
  if (a.data.type == "init") initEditor(a.data.dataUrl, a.data.initTool);
  else if (a.data.type == "changeTool") editor.setPenType(a.data.tool);
  else if (a.data.type == "changeColor") editor.setPenColor(a.data.color);
  else if (a.data.type == "undo") editor.undo();
  else if (a.data.type == "changeFontSize") editor.setFontSize(a.data.size);
  else if (a.data.type == "saveWithTag") {
    a = editor.getImageDataURL();
    sendMessage({
      type: "saveWithTag",
      dataURL: a,
    });
  } else if (a.data.type == "saveAttach") {
    a = editor.getImageDataURL();
    sendMessage({
      type: "saveAttach",
      dataURL: a,
    });
  }
  sendMessage({
    type: "canUndo",
    canUndo: editor.history.canUndo(),
  });
});
