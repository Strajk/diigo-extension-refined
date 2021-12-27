var cloneRoot = null,
  waitCount = 1;

function incrementWait() {
  waitCount++;
}

function decrementWait() {
  waitCount--;
  if ((!waitCount || waitCount < 0) && cloneRoot) originalContent = cloneRoot.innerHTML;
}
var toBase64Table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  base64Pad = "=";

function toBase64(c) {
  var a = "",
    d = c.length,
    b;
  for (b = 0; b < d - 2; b += 3) {
    a += toBase64Table[(c.charCodeAt(b) & 255) >> 2];
    a += toBase64Table[((c.charCodeAt(b) & 3) << 4) + ((c.charCodeAt(b + 1) & 255) >> 4)];
    a += toBase64Table[((c.charCodeAt(b + 1) & 15) << 2) + ((c.charCodeAt(b + 2) & 255) >> 6)];
    a += toBase64Table[c.charCodeAt(b + 2) & 63];
  }
  if (d % 3) {
    b = d - (d % 3);
    a += toBase64Table[(c.charCodeAt(b) & 255) >> 2];
    if (d % 3 == 2) {
      a += toBase64Table[((c.charCodeAt(b) & 3) << 4) + ((c.charCodeAt(b + 1) & 255) >> 4)];
      a += toBase64Table[(c.charCodeAt(b + 1) & 15) << 2];
      a += base64Pad;
    } else {
      a += toBase64Table[(c.charCodeAt(b) & 3) << 4];
      a += base64Pad + base64Pad;
    }
  }
  return a;
}

function makeDataUrl(c, a) {
  return "data:" + c + ";base64," + toBase64(a);
}

function requestFile(c, a, d) {
  incrementWait();
  (function (b) {
    try {
      var e = new XMLHttpRequest();
      e.open("GET", b.href, false);
      b.binary && e.overrideMimeType("text/plain; charset=x-user-defined");
      e.send();
      if (e.readyState == 4 && e.status == 200) {
        b.contentType = e.getResponseHeader("Content-Type");
        b.data = e.responseText;
      } else b.error = "Unexpected error";
    } catch (f) {
      console.error("Download error: " + f.message);
      b.error = f.message;
    }
    a(b);
  })({
    href: c,
    binary: d,
  });
}

function processLink(c, a) {
  switch (a.rel.toLowerCase()) {
    case "stylesheet":
      return;
  }
  c.appendChild(a.cloneNode(false));
}

function processAnchor(c, a) {
  var d = a.cloneNode(false);
  if (a.href) d.href = a.href;
  c.appendChild(d);
  return d;
}

function handleImageFile(c) {
  return function (a) {
    if (a.data && a.contentType) c.src = makeDataUrl(a.contentType, a.data);
    decrementWait();
  };
}

function processImage(c, a) {
  var d = a.cloneNode(false),
    b = a.src;
  d.url = b;
  console.log("Image url: " + b);
  c.appendChild(d);
  b && b.toLowerCase().match(/^https?:\/\//) && requestFile(b, handleImageFile(d), true);
}

function processElement(c, a) {
  var d = null;
  console.log(a.nodeName);
  console.log(waitCount);
  switch (a.nodeName.toLowerCase()) {
    case "link":
      processLink(c, a);
      return;
    case "a":
      d = processAnchor(c, a);
      break;
    case "img":
      processImage(c, a);
      return;
    case "style":
      return;
    case "script":
      return;
    default:
      d = a.cloneNode(false);
      c.appendChild(d);
  }
  if (d != null) for (var b = a.firstChild; b != null; b = b.nextSibling) processRecursive(d, b);
}

function processRecursive(c, a) {
  switch (a.nodeType) {
    case a.TEXT_NODE:
    case a.CDATA_SECTION_NODE:
      c.appendChild(a.cloneNode(false));
      break;
    case a.COMMENT_NODE:
      break;
    case a.ELEMENT_NODE:
      processElement(c, a);
      break;
    default:
      console.log("Unhandled node: " + a);
      break;
  }
}

function processDoc(c, a) {
  for (var d = a.firstChild; d != null; d = d.nextSibling) processRecursive(c, d);
}

function processStyleSheet(c) {
  if (!c.cssRules) {
    console.warn("Empty cssRules. Saved page will look incorrect.");
    return "";
  }
  for (var a = [], d = 0; d < c.cssRules.length; d++) {
    var b = c.cssRules[d];
    if (b.type == b.IMPORT_RULE) a.push(processStyleSheet(b.styleSheet));
    else b.type != b.CHARSET_RULE && a.push(b.cssText);
  }
  return a.join("\n");
}

function handleStyleFile(c) {
  return function (a) {
    a.data && c.appendChild(document.createTextNode(a.data));
    decrementWait();
  };
}

function processStyles(c) {
  if (document.styleSheets)
    for (var a = 0; a < document.styleSheets.length; a++) {
      var d = document.styleSheets[a],
        b = document.createElement("style");
      if (d.media.length) b.media = d.media.mediaText;
      b.type = d.type;
      if (d.cssRules == null && d.href) {
        console.warn("Downloading stylesheet.");
        requestFile(d.href, handleStyleFile(b), false);
      } else b.appendChild(document.createTextNode(processStyleSheet(d)));
      c.appendChild(b);
    }
}

function cleanPlugins() {
  for (var c = ["embed", "object", "applet"], a = 0, d = c.length; a < d; a++)
    for (var b = cloneRoot.getElementsByTagName(c[a]), e = 0, f = b.length; e < f; e++) if (b[e]) b[e].style.display = "none";
}

function processDocument(c) {
  var a = document.documentElement;
  cloneRoot = a.cloneNode(false);
  cloneRoot.innerHTML = c;
  processDoc(cloneRoot, a);
  processStyles(cloneRoot);
  cleanPlugins();
}
