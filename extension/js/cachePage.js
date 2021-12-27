var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder,
  CachePage = (function () {
    var e = function (a) {
      this.tabId = a.tabId;
      this.groups = a.groups;
      this.urlMD5 = a.urlMD5;
      this.username = a.username;
      this.text = a.text;
      this.html = a.html;
      this.textMD5 = MD5(e.utf8ToBytes(this.text));
      this.htmlMD5 = MD5(e.utf8ToBytes(this.html));
      this.ispdf = a.ispdf;
      this.pdfurl = a.pdfurl;
      debug("new [CachePage]", this);
    };
    extend(e, {
      UPLOAD_TYPE_PAGE_SCREEN_SHOT: 1,
      UPLOAD_TYPE_PAGE: 2,
      UPLOAD_TYPE_TEXT: 3,
      init: function () {},
      utf8ToBytes: function (a) {
        return unescape(encodeURIComponent(a));
      },
      utf8FromBytes: function (a) {
        return decodeURIComponent(escape(a));
      },
    });
    extend(e.prototype, {
      sendRequest: function (a, b, f) {
        var c = this;
        c.xhr = $.ajax({
          type: "POST",
          url: D.config.UPLOAD_SERVER + "/upload/" + a,
          data: b,
          complete: function (g) {
            try {
              var d = JSON.parse(g.responseText);
            } catch (h) {
              debug("[CachePage error parsing JSON]", h, g);
            }
            debug("[CachePage ajax response]", g.status, d);
            if (!d || g.status != 200) {
              c.hasError = true;
              d = {
                code: -1,
              };
            }
            f.call(c, c, d);
            c.xhr = null;
          },
          error: function (g, d, h) {
            debug("[CachePage ajax error]", g, d, h);
          },
        });
      },
      start: function () {
        var a = this;
        a.failed = false;
        debug("[CachePage] start uploading");
        if (a.ispdf) {
          var b = new XMLHttpRequest();
          b.open("GET", a.pdfurl);
          b.responseType = "arraybuffer";
          b.send();
          b.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              a.html = b.response;
              var f = new Uint8Array(a.html),
                c = "";
              for (i = 0; i < f.length; i++) c += f[i];
              a.htmlMD5 = hex_md5(c);
              a.upload_before();
            }
          };
        } else a.upload_before();
      },
      upload_before: function () {
        this.sendRequest(
          "before",
          {
            link_id: this.urlMD5,
            upload_type: 2,
            user_name: this.username,
            md5: this.htmlMD5,
          },
          function (a, b) {
            if (b.code == 1 && b.batch_id) {
              a.batchId = b.batch_id;
              if (a.ispdf) {
                var f =
                    "link_id=" +
                    a.urlMD5 +
                    "&type=application/pdf&upload_type=" +
                    e.UPLOAD_TYPE_PAGE +
                    "&user_name=" +
                    a.username +
                    "&batch_id=" +
                    a.batchId +
                    "&md5=" +
                    a.htmlMD5 +
                    "&charset=UTF-8&override_charset=true",
                  c = new XMLHttpRequest();
                c.open("POST", D.config.UPLOAD_SERVER + "/upload/index?" + f);
                c.setRequestHeader("Content-type", "application/pdf");
                c.send(a.html);
                c.onreadystatechange = function () {
                  if (this.readyState == 4) this.status == 200 ? a.upload_check() : a.uploadDidFail();
                };
              } else
                a.upload_upload(
                  {
                    type: "text/html",
                    uploadType: e.UPLOAD_TYPE_PAGE,
                    content: a.html,
                    md5: a.htmlMD5,
                  },
                  function () {
                    a.upload_upload(
                      {
                        type: "text/plain",
                        uploadType: e.UPLOAD_TYPE_TEXT,
                        content: a.text,
                        md5: a.textMD5,
                      },
                      function () {
                        a.upload_check();
                      }
                    );
                  }
                );
            } else if (b.code == 2) a.uploadNotNeeded();
            else
              b.over_quota
                ? a.uploadDidFail({
                    overQuota: true,
                    msg: b.msg,
                  })
                : a.uploadDidFail();
          }
        );
      },
      upload_upload: function (a, b) {
        this.sendRequest(
          "",
          {
            link_id: this.urlMD5,
            type: a.type,
            upload_type: a.uploadType,
            user_name: this.username,
            batch_id: this.batchId,
            md5: a.md5,
            content_string: a.content,
            charset: "UTF-8",
            override_charset: true,
          },
          function (f, c) {
            c.code == 1 ? b() : f.uploadDidFail();
          }
        );
      },
      upload_check: function () {
        this.sendRequest(
          "check_transaction",
          {
            link_id: this.urlMD5,
            upload_type: 2,
            user_name: this.username,
            batch_id: this.batchId,
          },
          function (a, b) {
            if (b.code == 1) {
              a.batchId = b.batch_id;
              var f, c;
              if (a.ispdf) {
                $.each(b.files, function (g, d) {
                  var h = d[2];
                  if (d[0] == e.UPLOAD_TYPE_PAGE) c = a.htmlMD5 == h;
                });
                if (c) {
                  debug("[CachePage] check OK");
                  a.upload_complete({
                    status: 1,
                  });
                  return;
                }
              } else {
                $.each(b.files, function (g, d) {
                  var h = d[0],
                    j = d[2];
                  if (h == e.UPLOAD_TYPE_TEXT) f = a.textMD5 == j;
                  else if (h == e.UPLOAD_TYPE_PAGE) c = a.htmlMD5 == j;
                });
                if (c && f) {
                  debug("[CachePage] check OK");
                  a.upload_complete({
                    status: 1,
                  });
                  return;
                }
              }
            }
            debug("[CachePage] check failed");
            a.uploadDidFail();
          }
        );
      },
      upload_complete: function (a) {
        this.sendRequest(
          "upload_complete",
          {
            link_id: this.urlMD5,
            user_name: this.username,
            batch_id: this.batchId,
            status: a.status,
            groups: JSON.stringify(this.groups),
          },
          function (b) {
            b.failed || b.uploadDidSucceed();
          }
        );
      },
      uploadDidFail: function (a) {
        a = a || {};
        this.failed = true;
        a.dontRequetComplete ||
          this.upload_complete({
            status: 0,
          });
        Messenger.send(this.tabId, {
          name: "uploadDidFail",
          details: a,
        });
      },
      uploadDidSucceed: function () {},
      uploadNotNeeded: function () {
        Messenger.send(this.tabId, {
          name: "uploadDidSucceed",
        });
      },
    });
    return e;
  })();
