window.addEventListener("message", function (a) {
  a = a.data;
  if (a.type == "doc_html") {
    document.body.innerHTML = a.html;
    var b = new Readability(a.uri, document, {
      debug: false,
    }).parse();
    b && b.content
      ? window.parent.postMessage(
          {
            type: "processFinish",
            data: {
              content: b.content,
              url: a.uri.spec,
              host: a.uri.host,
              title: a.title,
            },
          },
          "*"
        )
      : window.parent.postMessage(
          {
            type: "processFailed",
            data: {},
          },
          "*"
        );
  }
});
setTimeout(function () {
  window.parent.parent.postMessage(
    {
      type: "processStart",
    },
    "*"
  );
}, 500);
