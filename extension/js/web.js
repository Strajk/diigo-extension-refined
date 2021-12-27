$.ajaxTransport("+binary", function (a, b, c) {
  if (
    window.FormData &&
    ((a.dataType && a.dataType == "binary") ||
      (a.data && ((window.ArrayBuffer && a.data instanceof ArrayBuffer) || (window.Blob && a.data instanceof Blob))))
  )
    return {
      send: function (d, e) {
        var f = new XMLHttpRequest(),
          h = a.url,
          i = a.type,
          j = a.responseType || "blob",
          k = a.data || null;
        f.addEventListener("load", function () {
          var g = {};
          g[a.dataType] = f.response;
          e(f.status, f.statusText, g, f.getAllResponseHeaders());
        });
        f.open(i, h, true);
        f.responseType = j;
        f.send(k);
      },
      abort: function () {
        c.abort();
      },
    };
});
var Web = {
  getCommonSharableLink: function (a) {
    var b = this,
      c = "",
      d = "";
    return b
      .getUploadUrl(a)
      .then(function (e) {
        c = e.VisitUrl;
        d = e.Id;
        return b.uploadFile(e.PresignedUrl, a.contentType, a.blob);
      })
      .then(
        function () {
          $.get("https://www.diigo.com/share_annotation/success?id=" + d);
          return c;
        },
        function () {
          $.get("https://www.diigo.com/share_annotation/failed?id=" + d);
        }
      );
  },
  getPDFSharableLink: function (a) {
    var b = this;
    return this.getUploadUrl(a).then(function (c) {
      return b.uploadPDF(c, a.blob, a.bm);
    });
  },
  getUploadUrl: function (a) {
    var b = {
      fileName: a.filename,
      contentType: a.contentType,
    };
    if (a.url) b.url = a.url;
    if (a.title) b.title = a.title;
    return new Promise(function (c, d) {
      $.ajax({
        type: "GET",
        url: "https://www.diigo.com/share_annotation/presign",
        data: b,
        dataType: "json",
        success: function (e) {
          c(e);
        },
        error: function () {
          d("Get upload url error");
        },
      });
    });
  },
  uploadFile: function (a, b, c) {
    return new Promise(function (d, e) {
      $.ajax({
        type: "PUT",
        url: a,
        headers: {
          "Content-Type": b,
          "content-encoding": "utf-8",
          "x-amz-meta-key": "REPLACE",
        },
        data: c,
        processData: false,
        success: function (f) {
          d(f);
        },
        error: function () {
          e("Upload file error");
        },
      });
    });
  },
  downloadAnnotatedPdf: function (a) {
    return new Promise(function (b, c) {
      var d = new FormData();
      d.append("ann", a.ann);
      d.append("name", a.name);
      d.append("pdf", a.file);
      $.ajax({
        type: "POST",
        url: "https://www.diigo.com/share_annotation/pdfwithann",
        data: d,
        dataType: "binary",
        processData: false,
        contentType: false,
        success: function (e) {
          b(e);
        },
        error: function (e) {
          c(e);
        },
      });
    });
  },
  uploadPDF: function (a, b, c) {
    var d = a.AnnPresignedUrl;
    return Promise.all([this.uploadFile(a.PresignedUrl, "application/pdf", b), this.uploadFile(d, "application/json", c)]).then(
      function () {
        $.get("https://www.diigo.com/share_annotation/success?id=" + a.Id);
        return a.VisitUrl;
      },
      function () {
        $.get("https://www.diigo.com/share_annotation/failed?id=" + a.Id);
        reject("Upload pdf error");
      }
    );
  },
  createList: function (a) {
    return new Promise(function (b) {
      Bg.WebAPI.createList(a, function (c) {
        b(c);
      });
    });
  },
  refreshStuff: function () {
    return new Promise(function (a) {
      Bg.WebAPI.refreshStuff(function (b) {
        a(b);
      });
    });
  },
};
