/*
 * Diigo inc.
 * PDF reader and annotations
 *
 * use for general use
 *
 * Jiangbin
 * April 2014
 *
 * */
//Use window.DEBUG to turn on/off debug output.
window.DEBUG = false;
window.DIIGO_PDF_URL = null;
window.DIIGO_LINK_ID = null;
window.DIIGO_PDF_TITLE = null;
window.DIIGO_REQUEST_SERVER = "https://www.diigo.com";
var Bg = chrome.extension.getBackgroundPage();
if (window.DEBUG) {
  log = function (message) {
    console.log(message);
  };
  TODO = function (todo) {
    console.warn(todo);
  };
} else {
  log = function (message) {
    return;
  };
  TODO = function (todo) {
    return;
  };
}

var diigoUtils = {
  isDiigoSignedIn: function () {
    return this.getUsername();
  },
  getUsername: function () {
    return Bg.GlobalData.user;
  },
  signoutDiigoAccount: function () {
    DiigoData.user = "";
  },
  getRequestURL: function () {
    var server = "";
    if (window.DIIGO_REQUEST_SERVER) {
      server = window.DIIGO_REQUEST_SERVER;
    } else {
      server = "https://" + document.domain;
    }
    return server + "/chappai/pv=#{pv}/ct=pj/cv=#{cv}/user=#{user}/cmd=#{cmd}/from=#{from}/";
  },
  forEach: function (obj, callback) {
    for (var key in obj) {
      callback(key, obj[key]);
    }
  },
  some: function (arr, fn, z) {
    for (var i = 0, l = arr.length; i < l; i++) if (fn.call(z, arr[i], i)) return true;

    return false;
  },

  each: function (obj, fn, thiz) {
    if (obj.forEach) obj.forEach(fn, thiz);
    else
      for (var k in obj) {
        fn.call(thiz, obj[k], k);
      }
  },
  // remove a value from Array
  // only suitable for string,number

  removeFromArray: function (value, array) {
    var l = array.length;
    for (var i = 0; i < l; i++) {
      if (array[i] === value) {
        array.splice(i, 1);
      }
    }
    return array;
  },

  extendFiltered: function (/* dst, src1, src2, ..., srcn, filterFn*/) {
    var args = [].slice.call(arguments),
      dst = args.shift(),
      filterFn = args.pop();

    for (var i = 0, l = args.length, src; (src = args[i]), i < l; i++) {
      for (var k in src) {
        var kk = filterFn(k);

        if (kk) {
          dst[kk === true ? k : kk] = src[k];
        }
      }
    }
    return dst;
  },

  toQueryString: function (obj) {
    var add = function (key, value) {
      key = encodeURIComponent(key);
      if (value === undefined) parts.push(key);
      else parts.push(key + "=" + (value == null ? "" : encodeURIComponent(value)));
    };

    var parts = [];

    this.forEach(obj, function (key, value) {
      if (!key) return;

      if (value && typeof value == "object") {
        if (isArray(value))
          value.forEach(function (value) {
            add(key, value);
          });
        return;
      }
      add(key, value);
    });

    return parts.join("&");
  },

  addToExistArray: function (existArr, newArr) {
    newArr.forEach(function (tag) {
      if (existArr.indexOf(tag) == -1) existArr.push(tag);
    });
  },

  evalTpl: function (tpl, object) {
    function str_interpret(value) {
      return value == null ? "" : String(value);
    }

    function gsub(str, pattern, replacement) {
      var result = "",
        source = str,
        match;

      while (source.length > 0) {
        if ((match = source.match(pattern))) {
          result += source.slice(0, match.index);
          result += str_interpret(replacement(match));
          source = source.slice(match.index + match[0].length);
        } else {
          (result += source), (source = "");
        }
      }
      return result;
    }

    var tplPattern = /(^|.|\r|\n)(#\{(.*?)\})/;

    return gsub(tpl, tplPattern, function (match) {
      if (object == null) return "";

      var before = match[1] || "";
      if (before == "\\") return match[2];

      var ctx = object,
        expr = match[3];
      var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].indexOf("[") === 0 ? gsub(match[2], "\\\\]", "]") : match[1];
        ctx = ctx[comp];
        if (null == ctx || "" == match[3]) break;
        expr = expr.substring("[" == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + str_interpret(ctx);
    });
  },

  showTpl: function (s, data) {
    if (data.toTemplateReplacements) data = data.toTemplateReplacements();

    return s.replace(/(^|.|\r|\n)(#\{(.*?)\})/g, function (m, m1, m2, m3) {
      if (data == null) return "";

      //escape sequence
      var before = m1 || "";
      if (before == "\\") return m2;

      var ctx = data,
        expr = m3;
      var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/,
        match = pattern.exec(expr);
      if (match == null) return "";

      while (match != null) {
        var comp = match[1][0] == "[" ? match[2].replace(/\\\\]/g, "]") : match[1];
        ctx = ctx[comp];
        if (null == ctx || "" == match[3]) break;
        expr = expr.substring("[" == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + (ctx == null ? "" : String(ctx));
    });
  },
  md5: function RectListMD5FromString(sMessage) {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
      var lX4, lY4, lX8, lY8, lResult;
      lX8 = lX & 0x80000000;
      lY8 = lY & 0x80000000;
      lX4 = lX & 0x40000000;
      lY4 = lY & 0x40000000;
      lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
      if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
        else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      } else return lResult ^ lX8 ^ lY8;
    }

    function F(x, y, z) {
      return (x & y) | (~x & z);
    }

    function G(x, y, z) {
      return (x & z) | (y & ~z);
    }

    function H(x, y, z) {
      return x ^ y ^ z;
    }

    function I(x, y, z) {
      return y ^ (x | ~z);
    }

    function FF(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }

    function GG(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }

    function HH(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }

    function II(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }

    function ConvertToWordArray(sMessage) {
      var lWordCount;
      var lMessageLength = sMessage.length;
      var lNumberOfWords_temp1 = lMessageLength + 8;
      var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
      var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
      var lWordArray = Array(lNumberOfWords - 1);
      var lBytePosition = 0;
      var lByteCount = 0;
      var isStr = typeof sMessage == "string";
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | ((isStr ? sMessage.charCodeAt(lByteCount) : sMessage[lByteCount]) << lBytePosition);
        lByteCount++;
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    }

    function WordToHex(lValue) {
      var WordToHexValue = "",
        WordToHexValue_temp = "",
        lByte,
        lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValue_temp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
      }
      return WordToHexValue;
    }

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22;
    var S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20;
    var S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23;
    var S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21;
    // Steps 1 and 2.  Append padding bits and length and convert to words
    x = ConvertToWordArray(sMessage);
    // Step 3.  Initialise
    a = 0x67452301;
    b = 0xefcdab89;
    c = 0x98badcfe;
    d = 0x10325476;
    // Step 4.  Process the message in 16-word blocks
    for (k = 0; k < x.length; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
      d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
      c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
      b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
      a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
      d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
      c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
      b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
      d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
      c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
      b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
      a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
      d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
      c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
      b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
      a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
      d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
      c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
      b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
      a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
      d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
      b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
      a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
      d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
      c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
      b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
      a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
      d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
      c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
      b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
      a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
      d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
      c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
      b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
      a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
      d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
      c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
      b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
      a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
      d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
      c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
      b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
      a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
      d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
      c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
      b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
      a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
      d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
      c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
      b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
      a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
      d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
      c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
      b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
      a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
      d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
      c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
      b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
      a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
      d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
      c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
      b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
      a = AddUnsigned(a, AA);
      b = AddUnsigned(b, BB);
      c = AddUnsigned(c, CC);
      d = AddUnsigned(d, DD);
    }
    // Step 5.  Output the 128 bit digest
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
  },
};
