var OAuth;
if (OAuth == null) OAuth = {};
OAuth.setProperties = function (a, c) {
  if (a != null && c != null) for (var b in c) a[b] = c[b];
  return a;
};
OAuth.setProperties(OAuth, {
  percentEncode: function (a) {
    if (a == null) return "";
    if (a instanceof Array) {
      for (var c = ""; 0 < a.length; ++a) {
        if (c != "") c += "&";
        c += OAuth.percentEncode(a[0]);
      }
      return c;
    }
    a = encodeURIComponent(a);
    a = a.replace(/\!/g, "%21");
    a = a.replace(/\*/g, "%2A");
    a = a.replace(/\'/g, "%27");
    a = a.replace(/\(/g, "%28");
    return (a = a.replace(/\)/g, "%29"));
  },
  decodePercent: function (a) {
    if (a != null) a = a.replace(/\+/g, " ");
    return decodeURIComponent(a);
  },
  getParameterList: function (a) {
    if (a == null) return [];
    if (typeof a != "object") return OAuth.decodeForm(a + "");
    if (a instanceof Array) return a;
    var c = [];
    for (var b in a) c.push([b, a[b]]);
    return c;
  },
  getParameterMap: function (a) {
    if (a == null) return {};
    if (typeof a != "object") return OAuth.getParameterMap(OAuth.decodeForm(a + ""));
    if (a instanceof Array) {
      for (var c = {}, b = 0; b < a.length; ++b) {
        var d = a[b][0];
        if (c[d] === undefined) c[d] = a[b][1];
      }
      return c;
    }
    return a;
  },
  getParameter: function (a, c) {
    if (a instanceof Array)
      for (var b = 0; b < a.length; ++b) {
        if (a[b][0] == c) return a[b][1];
      }
    else return OAuth.getParameterMap(a)[c];
    return null;
  },
  formEncode: function (a) {
    var c = "";
    a = OAuth.getParameterList(a);
    for (var b = 0; b < a.length; ++b) {
      var d = a[b][1];
      if (d == null) d = "";
      if (c != "") c += "&";
      c += OAuth.percentEncode(a[b][0]) + "=" + OAuth.percentEncode(d);
    }
    return c;
  },
  decodeForm: function (a) {
    var c = [];
    a = a.split("&");
    for (var b = 0; b < a.length; ++b) {
      var d = a[b];
      if (d != "") {
        var e = d.indexOf("="),
          f;
        if (e < 0) {
          f = OAuth.decodePercent(d);
          d = null;
        } else {
          f = OAuth.decodePercent(d.substring(0, e));
          d = OAuth.decodePercent(d.substring(e + 1));
        }
        c.push([f, d]);
      }
    }
    return c;
  },
  setParameter: function (a, c, b) {
    var d = a.parameters;
    if (d instanceof Array) {
      for (a = 0; a < d.length; ++a)
        if (d[a][0] == c)
          if (b === undefined) d.splice(a, 1);
          else {
            d[a][1] = b;
            b = undefined;
          }
      b !== undefined && d.push([c, b]);
    } else {
      d = OAuth.getParameterMap(d);
      d[c] = b;
      a.parameters = d;
    }
  },
  setParameters: function (a, c) {
    for (var b = OAuth.getParameterList(c), d = 0; d < b.length; ++d) OAuth.setParameter(a, b[d][0], b[d][1]);
  },
  completeRequest: function (a, c) {
    if (a.method == null) a.method = "GET";
    var b = OAuth.getParameterMap(a.parameters);
    if (b.oauth_consumer_key == null) OAuth.setParameter(a, "oauth_consumer_key", c.consumerKey || "");
    b.oauth_token == null && c.token != null && OAuth.setParameter(a, "oauth_token", c.token);
    b.oauth_version == null && OAuth.setParameter(a, "oauth_version", "1.0");
    b.oauth_timestamp == null && OAuth.setParameter(a, "oauth_timestamp", OAuth.timestamp());
    b.oauth_nonce == null && OAuth.setParameter(a, "oauth_nonce", OAuth.nonce(6));
    OAuth.SignatureMethod.sign(a, c);
  },
  setTimestampAndNonce: function (a) {
    OAuth.setParameter(a, "oauth_timestamp", OAuth.timestamp());
    OAuth.setParameter(a, "oauth_nonce", OAuth.nonce(6));
  },
  addToURL: function (a, c) {
    newURL = a;
    if (c != null) {
      var b = OAuth.formEncode(c);
      if (b.length > 0) {
        var d = a.indexOf("?");
        newURL += d < 0 ? "?" : "&";
        newURL += b;
      }
    }
    return newURL;
  },
  getAuthorizationHeader: function (a, c) {
    for (var b = 'OAuth realm="' + OAuth.percentEncode(a) + '"', d = OAuth.getParameterList(c), e = 0; e < d.length; ++e) {
      var f = d[e],
        g = f[0];
      if (g.indexOf("oauth_") == 0) b += "," + OAuth.percentEncode(g) + '="' + OAuth.percentEncode(f[1]) + '"';
    }
    return b;
  },
  correctTimestampFromSrc: function (a) {
    a = a || "oauth_timestamp";
    var c = document.getElementsByTagName("script");
    if (!(c == null || !c.length))
      if ((c = c[c.length - 1].src)) {
        var b = c.indexOf("?");
        if (!(b < 0)) {
          parameters = OAuth.getParameterMap(OAuth.decodeForm(c.substring(b + 1)));
          a = parameters[a];
          a != null && OAuth.correctTimestamp(a);
        }
      }
  },
  correctTimestamp: function (a) {
    OAuth.timeCorrectionMsec = a * 1e3 - new Date().getTime();
  },
  timeCorrectionMsec: 0,
  timestamp: function () {
    var a = new Date().getTime() + OAuth.timeCorrectionMsec;
    return Math.floor(a / 1e3);
  },
  nonce: function (a) {
    for (var c = OAuth.nonce.CHARS, b = "", d = 0; d < a; ++d) {
      var e = Math.floor(Math.random() * c.length);
      b += c.substring(e, e + 1);
    }
    return b;
  },
});
OAuth.nonce.CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
OAuth.declareClass = function (a, c, b) {
  var d = a[c];
  a[c] = b;
  if (b != null && d != null) for (var e in d) if (e != "prototype") b[e] = d[e];
  return b;
};
OAuth.declareClass(OAuth, "SignatureMethod", function () {});
OAuth.setProperties(OAuth.SignatureMethod.prototype, {
  sign: function (a) {
    var c = this.getSignature(OAuth.SignatureMethod.getBaseString(a));
    OAuth.setParameter(a, "oauth_signature", c);
    return c;
  },
  initialize: function (a, c) {
    var b;
    b = c.accessorSecret != null && a.length > 9 && a.substring(a.length - 9) == "-Accessor" ? c.accessorSecret : c.consumerSecret;
    this.key = OAuth.percentEncode(b) + "&" + OAuth.percentEncode(c.tokenSecret);
  },
});
OAuth.setProperties(OAuth.SignatureMethod, {
  sign: function (a, c) {
    var b = OAuth.getParameterMap(a.parameters).oauth_signature_method;
    if (b == null || b == "") {
      b = "HMAC-SHA1";
      OAuth.setParameter(a, "oauth_signature_method", b);
    }
    OAuth.SignatureMethod.newMethod(b, c).sign(a);
  },
  newMethod: function (a, c) {
    var b = OAuth.SignatureMethod.REGISTERED[a];
    if (b != null) {
      var d = new b();
      d.initialize(a, c);
      return d;
    }
    b = Error("signature_method_rejected");
    var e = "";
    for (d in OAuth.SignatureMethod.REGISTERED) {
      if (e != "") e += "&";
      e += OAuth.percentEncode(d);
    }
    b.oauth_acceptable_signature_methods = e;
    throw b;
  },
  REGISTERED: {},
  registerMethodClass: function (a, c) {
    for (var b = 0; b < a.length; ++b) OAuth.SignatureMethod.REGISTERED[a[b]] = c;
  },
  makeSubclass: function (a) {
    var c = OAuth.SignatureMethod,
      b = function () {
        c.call(this);
      };
    b.prototype = new c();
    b.prototype.getSignature = a;
    return (b.prototype.constructor = b);
  },
  getBaseString: function (a) {
    var c = a.action,
      b = c.indexOf("?");
    if (b < 0) b = a.parameters;
    else {
      b = OAuth.decodeForm(c.substring(b + 1));
      for (var d = OAuth.getParameterList(a.parameters), e = 0; e < d.length; ++e) b.push(d[e]);
    }
    return (
      OAuth.percentEncode(a.method.toUpperCase()) +
      "&" +
      OAuth.percentEncode(OAuth.SignatureMethod.normalizeUrl(c)) +
      "&" +
      OAuth.percentEncode(OAuth.SignatureMethod.normalizeParameters(b))
    );
  },
  normalizeUrl: function (a) {
    var c = OAuth.SignatureMethod.parseUri(a);
    a = c.protocol.toLowerCase();
    var b = c.authority.toLowerCase();
    if ((a == "http" && c.port == 80) || (a == "https" && c.port == 443)) {
      var d = b.lastIndexOf(":");
      if (d >= 0) b = b.substring(0, d);
    }
    (c = c.path) || (c = "/");
    return a + "://" + b + c;
  },
  parseUri: function (a) {
    var c = {
      key: [
        "source",
        "protocol",
        "authority",
        "userInfo",
        "user",
        "password",
        "host",
        "port",
        "relative",
        "path",
        "directory",
        "file",
        "query",
        "anchor",
      ],
      parser: {
        strict:
          /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      },
    };
    a = c.parser.strict.exec(a);
    for (var b = {}, d = 14; d--; ) b[c.key[d]] = a[d] || "";
    return b;
  },
  normalizeParameters: function (a) {
    if (a == null) return "";
    var c = OAuth.getParameterList(a);
    a = [];
    for (var b = 0; b < c.length; ++b) {
      var d = c[b];
      d[0] != "oauth_signature" && a.push([OAuth.percentEncode(d[0]) + " " + OAuth.percentEncode(d[1]), d]);
    }
    a.sort(function (e, f) {
      if (e[0] < f[0]) return -1;
      if (e[0] > f[0]) return 1;
      return 0;
    });
    c = [];
    for (b = 0; b < a.length; ++b) c.push(a[b][1]);
    return OAuth.formEncode(c);
  },
});
OAuth.SignatureMethod.registerMethodClass(
  ["PLAINTEXT", "PLAINTEXT-Accessor"],
  OAuth.SignatureMethod.makeSubclass(function () {
    return this.key;
  })
);
OAuth.SignatureMethod.registerMethodClass(
  ["HMAC-SHA1", "HMAC-SHA1-Accessor"],
  OAuth.SignatureMethod.makeSubclass(function (a) {
    b64pad = "=";
    return b64_hmac_sha1(this.key, a);
  })
);
OAuth.correctTimestampFromSrc();
