var hexcase = 0,
  b64pad = "",
  chrsz = 8;

function hex_sha1(a) {
  return binb2hex(core_sha1(str2binb(a), a.length * chrsz));
}

function b64_sha1(a) {
  return binb2b64(core_sha1(str2binb(a), a.length * chrsz));
}

function str_sha1(a) {
  return binb2str(core_sha1(str2binb(a), a.length * chrsz));
}

function hex_hmac_sha1(a, c) {
  return binb2hex(core_hmac_sha1(a, c));
}

function b64_hmac_sha1(a, c) {
  return binb2b64(core_hmac_sha1(a, c));
}

function str_hmac_sha1(a, c) {
  return binb2str(core_hmac_sha1(a, c));
}

function sha1_vm_test() {
  return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

function core_sha1(a, c) {
  a[c >> 5] |= 128 << (24 - (c % 32));
  a[(((c + 64) >> 9) << 4) + 15] = c;
  for (var b = Array(80), d = 1732584193, e = -271733879, f = -1732584194, h = 271733878, i = -1009589776, j = 0; j < a.length; j += 16) {
    for (var k = d, l = e, m = f, n = h, o = i, g = 0; g < 80; g++) {
      b[g] = g < 16 ? a[j + g] : rol(b[g - 3] ^ b[g - 8] ^ b[g - 14] ^ b[g - 16], 1);
      var p = safe_add(safe_add(rol(d, 5), sha1_ft(g, e, f, h)), safe_add(safe_add(i, b[g]), sha1_kt(g)));
      i = h;
      h = f;
      f = rol(e, 30);
      e = d;
      d = p;
    }
    d = safe_add(d, k);
    e = safe_add(e, l);
    f = safe_add(f, m);
    h = safe_add(h, n);
    i = safe_add(i, o);
  }
  return Array(d, e, f, h, i);
}

function sha1_ft(a, c, b, d) {
  if (a < 20) return (c & b) | (~c & d);
  if (a < 40) return c ^ b ^ d;
  if (a < 60) return (c & b) | (c & d) | (b & d);
  return c ^ b ^ d;
}

function sha1_kt(a) {
  return a < 20 ? 1518500249 : a < 40 ? 1859775393 : a < 60 ? -1894007588 : -899497514;
}

function core_hmac_sha1(a, c) {
  var b = str2binb(a);
  if (b.length > 16) b = core_sha1(b, a.length * chrsz);
  for (var d = Array(16), e = Array(16), f = 0; f < 16; f++) {
    d[f] = b[f] ^ 909522486;
    e[f] = b[f] ^ 1549556828;
  }
  b = core_sha1(d.concat(str2binb(c)), 512 + c.length * chrsz);
  return core_sha1(e.concat(b), 672);
}

function safe_add(a, c) {
  var b = (a & 65535) + (c & 65535);
  return (((a >> 16) + (c >> 16) + (b >> 16)) << 16) | (b & 65535);
}

function rol(a, c) {
  return (a << c) | (a >>> (32 - c));
}

function str2binb(a) {
  for (var c = [], b = (1 << chrsz) - 1, d = 0; d < a.length * chrsz; d += chrsz)
    c[d >> 5] |= (a.charCodeAt(d / chrsz) & b) << (32 - chrsz - (d % 32));
  return c;
}

function binb2str(a) {
  for (var c = "", b = (1 << chrsz) - 1, d = 0; d < a.length * 32; d += chrsz) c += String.fromCharCode((a[d >> 5] >>> (32 - chrsz - (d % 32))) & b);
  return c;
}

function binb2hex(a) {
  for (var c = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", b = "", d = 0; d < a.length * 4; d++)
    b += c.charAt((a[d >> 2] >> ((3 - (d % 4)) * 8 + 4)) & 15) + c.charAt((a[d >> 2] >> ((3 - (d % 4)) * 8)) & 15);
  return b;
}

function binb2b64(a) {
  for (var c = "", b = 0; b < a.length * 4; b += 3)
    for (
      var d =
          (((a[b >> 2] >> (8 * (3 - (b % 4)))) & 255) << 16) |
          (((a[(b + 1) >> 2] >> (8 * (3 - ((b + 1) % 4)))) & 255) << 8) |
          ((a[(b + 2) >> 2] >> (8 * (3 - ((b + 2) % 4)))) & 255),
        e = 0;
      e < 4;
      e++
    )
      c +=
        b * 8 + e * 6 > a.length * 32 ? b64pad : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((d >> (6 * (3 - e))) & 63);
  return c;
}
