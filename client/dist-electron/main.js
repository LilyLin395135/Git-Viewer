import { app as mn, ipcMain as an, dialog as Gr, BrowserWindow as Hr } from "electron";
import q from "path";
import Te from "fs";
import ze, { TextEncoder as jp } from "util";
import we, { Readable as Ap } from "stream";
import aa from "http";
import sa from "https";
import Ft from "url";
import Wr from "assert";
import jt from "tty";
import Jr from "os";
import Je from "zlib";
import Pp, { EventEmitter as Lp } from "events";
import { spawn as $p } from "child_process";
import { EventEmitter as Dp } from "node:events";
import Np from "constants";
function Vr(e, n) {
  return function() {
    return e.apply(n, arguments);
  };
}
const { toString: Bp } = Object.prototype, { getPrototypeOf: ra } = Object, At = /* @__PURE__ */ ((e) => (n) => {
  const t = Bp.call(n);
  return e[t] || (e[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Re = (e) => (e = e.toLowerCase(), (n) => At(n) === e), Pt = (e) => (n) => typeof n === e, { isArray: gn } = Array, jn = Pt("undefined");
function Ip(e) {
  return e !== null && !jn(e) && e.constructor !== null && !jn(e.constructor) && Ce(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Kr = Re("ArrayBuffer");
function qp(e) {
  let n;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? n = ArrayBuffer.isView(e) : n = e && e.buffer && Kr(e.buffer), n;
}
const zp = Pt("string"), Ce = Pt("function"), Yr = Pt("number"), Lt = (e) => e !== null && typeof e == "object", Up = (e) => e === !0 || e === !1, ht = (e) => {
  if (At(e) !== "object")
    return !1;
  const n = ra(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Mp = Re("Date"), Gp = Re("File"), Hp = Re("Blob"), Wp = Re("FileList"), Jp = (e) => Lt(e) && Ce(e.pipe), Vp = (e) => {
  let n;
  return e && (typeof FormData == "function" && e instanceof FormData || Ce(e.append) && ((n = At(e)) === "formdata" || // detect form-data instance
  n === "object" && Ce(e.toString) && e.toString() === "[object FormData]"));
}, Kp = Re("URLSearchParams"), [Yp, Xp, Qp, Zp] = ["ReadableStream", "Request", "Response", "Headers"].map(Re), el = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Mn(e, n, { allOwnKeys: t = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let i, a;
  if (typeof e != "object" && (e = [e]), gn(e))
    for (i = 0, a = e.length; i < a; i++)
      n.call(null, e[i], i, e);
  else {
    const s = t ? Object.getOwnPropertyNames(e) : Object.keys(e), r = s.length;
    let p;
    for (i = 0; i < r; i++)
      p = s[i], n.call(null, e[p], p, e);
  }
}
function Xr(e, n) {
  n = n.toLowerCase();
  const t = Object.keys(e);
  let i = t.length, a;
  for (; i-- > 0; )
    if (a = t[i], n === a.toLowerCase())
      return a;
  return null;
}
const Qr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Zr = (e) => !jn(e) && e !== Qr;
function Ti() {
  const { caseless: e } = Zr(this) && this || {}, n = {}, t = (i, a) => {
    const s = e && Xr(n, a) || a;
    ht(n[s]) && ht(i) ? n[s] = Ti(n[s], i) : ht(i) ? n[s] = Ti({}, i) : gn(i) ? n[s] = i.slice() : n[s] = i;
  };
  for (let i = 0, a = arguments.length; i < a; i++)
    arguments[i] && Mn(arguments[i], t);
  return n;
}
const nl = (e, n, t, { allOwnKeys: i } = {}) => (Mn(n, (a, s) => {
  t && Ce(a) ? e[s] = Vr(a, t) : e[s] = a;
}, { allOwnKeys: i }), e), tl = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), il = (e, n, t, i) => {
  e.prototype = Object.create(n.prototype, i), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: n.prototype
  }), t && Object.assign(e.prototype, t);
}, al = (e, n, t, i) => {
  let a, s, r;
  const p = {};
  if (n = n || {}, e == null) return n;
  do {
    for (a = Object.getOwnPropertyNames(e), s = a.length; s-- > 0; )
      r = a[s], (!i || i(r, e, n)) && !p[r] && (n[r] = e[r], p[r] = !0);
    e = t !== !1 && ra(e);
  } while (e && (!t || t(e, n)) && e !== Object.prototype);
  return n;
}, sl = (e, n, t) => {
  e = String(e), (t === void 0 || t > e.length) && (t = e.length), t -= n.length;
  const i = e.indexOf(n, t);
  return i !== -1 && i === t;
}, rl = (e) => {
  if (!e) return null;
  if (gn(e)) return e;
  let n = e.length;
  if (!Yr(n)) return null;
  const t = new Array(n);
  for (; n-- > 0; )
    t[n] = e[n];
  return t;
}, ol = /* @__PURE__ */ ((e) => (n) => e && n instanceof e)(typeof Uint8Array < "u" && ra(Uint8Array)), cl = (e, n) => {
  const i = (e && e[Symbol.iterator]).call(e);
  let a;
  for (; (a = i.next()) && !a.done; ) {
    const s = a.value;
    n.call(e, s[0], s[1]);
  }
}, ul = (e, n) => {
  let t;
  const i = [];
  for (; (t = e.exec(n)) !== null; )
    i.push(t);
  return i;
}, pl = Re("HTMLFormElement"), ll = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, i, a) {
    return i.toUpperCase() + a;
  }
), is = (({ hasOwnProperty: e }) => (n, t) => e.call(n, t))(Object.prototype), dl = Re("RegExp"), eo = (e, n) => {
  const t = Object.getOwnPropertyDescriptors(e), i = {};
  Mn(t, (a, s) => {
    let r;
    (r = n(a, s, e)) !== !1 && (i[s] = r || a);
  }), Object.defineProperties(e, i);
}, ml = (e) => {
  eo(e, (n, t) => {
    if (Ce(e) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const i = e[t];
    if (Ce(i)) {
      if (n.enumerable = !1, "writable" in n) {
        n.writable = !1;
        return;
      }
      n.set || (n.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, fl = (e, n) => {
  const t = {}, i = (a) => {
    a.forEach((s) => {
      t[s] = !0;
    });
  };
  return gn(e) ? i(e) : i(String(e).split(n)), t;
}, hl = () => {
}, xl = (e, n) => e != null && Number.isFinite(e = +e) ? e : n, Qt = "abcdefghijklmnopqrstuvwxyz", as = "0123456789", no = {
  DIGIT: as,
  ALPHA: Qt,
  ALPHA_DIGIT: Qt + Qt.toUpperCase() + as
}, vl = (e = 16, n = no.ALPHA_DIGIT) => {
  let t = "";
  const { length: i } = n;
  for (; e--; )
    t += n[Math.random() * i | 0];
  return t;
};
function gl(e) {
  return !!(e && Ce(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const bl = (e) => {
  const n = new Array(10), t = (i, a) => {
    if (Lt(i)) {
      if (n.indexOf(i) >= 0)
        return;
      if (!("toJSON" in i)) {
        n[a] = i;
        const s = gn(i) ? [] : {};
        return Mn(i, (r, p) => {
          const l = t(r, a + 1);
          !jn(l) && (s[p] = l);
        }), n[a] = void 0, s;
      }
    }
    return i;
  };
  return t(e, 0);
}, yl = Re("AsyncFunction"), wl = (e) => e && (Lt(e) || Ce(e)) && Ce(e.then) && Ce(e.catch), x = {
  isArray: gn,
  isArrayBuffer: Kr,
  isBuffer: Ip,
  isFormData: Vp,
  isArrayBufferView: qp,
  isString: zp,
  isNumber: Yr,
  isBoolean: Up,
  isObject: Lt,
  isPlainObject: ht,
  isReadableStream: Yp,
  isRequest: Xp,
  isResponse: Qp,
  isHeaders: Zp,
  isUndefined: jn,
  isDate: Mp,
  isFile: Gp,
  isBlob: Hp,
  isRegExp: dl,
  isFunction: Ce,
  isStream: Jp,
  isURLSearchParams: Kp,
  isTypedArray: ol,
  isFileList: Wp,
  forEach: Mn,
  merge: Ti,
  extend: nl,
  trim: el,
  stripBOM: tl,
  inherits: il,
  toFlatObject: al,
  kindOf: At,
  kindOfTest: Re,
  endsWith: sl,
  toArray: rl,
  forEachEntry: cl,
  matchAll: ul,
  isHTMLForm: pl,
  hasOwnProperty: is,
  hasOwnProp: is,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: eo,
  freezeMethods: ml,
  toObjectSet: fl,
  toCamelCase: ll,
  noop: hl,
  toFiniteNumber: xl,
  findKey: Xr,
  global: Qr,
  isContextDefined: Zr,
  ALPHABET: no,
  generateString: vl,
  isSpecCompliantForm: gl,
  toJSONObject: bl,
  isAsyncFn: yl,
  isThenable: wl
};
function S(e, n, t, i, a) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", n && (this.code = n), t && (this.config = t), i && (this.request = i), a && (this.response = a);
}
x.inherits(S, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: x.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const to = S.prototype, io = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  io[e] = { value: e };
});
Object.defineProperties(S, io);
Object.defineProperty(to, "isAxiosError", { value: !0 });
S.from = (e, n, t, i, a, s) => {
  const r = Object.create(to);
  return x.toFlatObject(e, r, function(l) {
    return l !== Error.prototype;
  }, (p) => p !== "isAxiosError"), S.call(r, e.message, n, t, i, a), r.cause = e, r.name = e.name, s && Object.assign(r, s), r;
};
var An = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function bn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ao = we.Stream, _l = ze, kl = Oe;
function Oe() {
  this.source = null, this.dataSize = 0, this.maxDataSize = 1024 * 1024, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
}
_l.inherits(Oe, ao);
Oe.create = function(e, n) {
  var t = new this();
  n = n || {};
  for (var i in n)
    t[i] = n[i];
  t.source = e;
  var a = e.emit;
  return e.emit = function() {
    return t._handleEmit(arguments), a.apply(e, arguments);
  }, e.on("error", function() {
  }), t.pauseStream && e.pause(), t;
};
Object.defineProperty(Oe.prototype, "readable", {
  configurable: !0,
  enumerable: !0,
  get: function() {
    return this.source.readable;
  }
});
Oe.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};
Oe.prototype.resume = function() {
  this._released || this.release(), this.source.resume();
};
Oe.prototype.pause = function() {
  this.source.pause();
};
Oe.prototype.release = function() {
  this._released = !0, this._bufferedEvents.forEach((function(e) {
    this.emit.apply(this, e);
  }).bind(this)), this._bufferedEvents = [];
};
Oe.prototype.pipe = function() {
  var e = ao.prototype.pipe.apply(this, arguments);
  return this.resume(), e;
};
Oe.prototype._handleEmit = function(e) {
  if (this._released) {
    this.emit.apply(this, e);
    return;
  }
  e[0] === "data" && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e);
};
Oe.prototype._checkIfMaxDataSizeExceeded = function() {
  if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
    this._maxDataSizeExceeded = !0;
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this.emit("error", new Error(e));
  }
};
var Sl = ze, so = we.Stream, ss = kl, Cl = Y;
function Y() {
  this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2 * 1024 * 1024, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
}
Sl.inherits(Y, so);
Y.create = function(e) {
  var n = new this();
  e = e || {};
  for (var t in e)
    n[t] = e[t];
  return n;
};
Y.isStreamLike = function(e) {
  return typeof e != "function" && typeof e != "string" && typeof e != "boolean" && typeof e != "number" && !Buffer.isBuffer(e);
};
Y.prototype.append = function(e) {
  var n = Y.isStreamLike(e);
  if (n) {
    if (!(e instanceof ss)) {
      var t = ss.create(e, {
        maxDataSize: 1 / 0,
        pauseStream: this.pauseStreams
      });
      e.on("data", this._checkDataSize.bind(this)), e = t;
    }
    this._handleErrors(e), this.pauseStreams && e.pause();
  }
  return this._streams.push(e), this;
};
Y.prototype.pipe = function(e, n) {
  return so.prototype.pipe.call(this, e, n), this.resume(), e;
};
Y.prototype._getNext = function() {
  if (this._currentStream = null, this._insideLoop) {
    this._pendingNext = !0;
    return;
  }
  this._insideLoop = !0;
  try {
    do
      this._pendingNext = !1, this._realGetNext();
    while (this._pendingNext);
  } finally {
    this._insideLoop = !1;
  }
};
Y.prototype._realGetNext = function() {
  var e = this._streams.shift();
  if (typeof e > "u") {
    this.end();
    return;
  }
  if (typeof e != "function") {
    this._pipeNext(e);
    return;
  }
  var n = e;
  n((function(t) {
    var i = Y.isStreamLike(t);
    i && (t.on("data", this._checkDataSize.bind(this)), this._handleErrors(t)), this._pipeNext(t);
  }).bind(this));
};
Y.prototype._pipeNext = function(e) {
  this._currentStream = e;
  var n = Y.isStreamLike(e);
  if (n) {
    e.on("end", this._getNext.bind(this)), e.pipe(this, { end: !1 });
    return;
  }
  var t = e;
  this.write(t), this._getNext();
};
Y.prototype._handleErrors = function(e) {
  var n = this;
  e.on("error", function(t) {
    n._emitError(t);
  });
};
Y.prototype.write = function(e) {
  this.emit("data", e);
};
Y.prototype.pause = function() {
  this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
};
Y.prototype.resume = function() {
  this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
};
Y.prototype.end = function() {
  this._reset(), this.emit("end");
};
Y.prototype.destroy = function() {
  this._reset(), this.emit("close");
};
Y.prototype._reset = function() {
  this.writable = !1, this._streams = [], this._currentStream = null;
};
Y.prototype._checkDataSize = function() {
  if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this._emitError(new Error(e));
  }
};
Y.prototype._updateDataSize = function() {
  this.dataSize = 0;
  var e = this;
  this._streams.forEach(function(n) {
    n.dataSize && (e.dataSize += n.dataSize);
  }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
};
Y.prototype._emitError = function(e) {
  this._reset(), this.emit("error", e);
};
var ro = {};
const El = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphal+json": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphalforms+json": {
    source: "iana",
    compressible: !0
  },
  "application/a2l": {
    source: "iana"
  },
  "application/ace+cbor": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/at+jwt": {
    source: "iana"
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: !0
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: !0
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: !1
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/calendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: !0
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cfw": {
    source: "iana"
  },
  "application/city+json": {
    source: "iana",
    compressible: !0
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: !0
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: !0
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cpl"
    ]
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/csvm+json": {
    source: "iana",
    compressible: !0
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: !0
  },
  "application/dash+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpd"
    ]
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpp"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: !0
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: !0
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: !1
  },
  "application/edifact": {
    source: "iana",
    compressible: !1
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/elm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emma+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/epub+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: !0
  },
  "application/express": {
    source: "iana",
    extensions: [
      "exp"
    ]
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fido.trusted-apps+json": {
    compressible: !0
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: !1
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/geo+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: !0
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: !1,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: !0
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: !0
  },
  "application/jrd+json": {
    source: "iana",
    compressible: !0
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: !0,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ld+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lost+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: !1
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpf"
    ]
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/missing-blocks+cbor-seq": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: !0
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msword": {
    source: "iana",
    compressible: !1,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: !0
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/oauth-authz-req+jwt": {
    source: "iana"
  },
  "application/oblivious-dns-message": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: !1,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p21": {
    source: "iana"
  },
  "application/p21+zip": {
    source: "iana",
    compressible: !1
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana",
    extensions: [
      "asc"
    ]
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/postscript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: !1
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: !0
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: !0,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: !0
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: !0
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: !0
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sarif+json": {
    source: "iana",
    compressible: !0
  },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: !0
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/scim+json": {
    source: "iana",
    compressible: !0
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: !0
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "srx"
    ]
  },
  "application/spdx+json": {
    source: "iana",
    compressible: !0
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: !0
  },
  "application/swid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: !0
  },
  "application/taxii+json": {
    source: "iana",
    compressible: !0
  },
  "application/td+json": {
    source: "iana",
    compressible: !0
  },
  "application/tei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: !0
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/token-introspection+jwt": {
    source: "iana"
  },
  "application/toml": {
    compressible: !0,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana",
    extensions: [
      "trig"
    ]
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: !1,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+json": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.5gnas": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gtpc": {
    source: "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.lpp": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ngap": {
    source: "iana"
  },
  "application/vnd.3gpp.pfcp": {
    source: "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.s1ap": {
    source: "iana"
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.age": {
    source: "iana",
    extensions: [
      "age"
    ]
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.arrow.file": {
    source: "iana"
  },
  "application/vnd.apache.arrow.stream": {
    source: "iana"
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: !1,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.cryptomator.vault": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: !1,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: !1,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: !1,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: !1,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana",
    extensions: [
      "mvt"
    ]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.maxar.archive.3tz+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-outlook": {
    compressible: !1,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.nacamar.ybrid+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.opentimestamps.ots": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: !1,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.resilient.logic": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.syft+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veritone.aion+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: !0
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wif"
    ]
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: !0
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: !1,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: !1
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: !1,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: !0,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-iwork-keynote-sffkey": {
    extensions: [
      "key"
    ]
  },
  "application/x-iwork-numbers-sffnumbers": {
    extensions: [
      "numbers"
    ]
  },
  "application/x-iwork-pages-sffpages": {
    extensions: [
      "pages"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: !0
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: !1,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: !1
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: !0,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: !1,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: !0,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: !1,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: !1,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: !0,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: !0,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: !0,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: !0,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: !0,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: !1,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: !0,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: !0,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: !0,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: !0,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: !0
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: !1,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: !0
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xop+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yin+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: !1,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: !1,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: !1
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: !1,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: !1
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: !1
  },
  "audio/vorbis": {
    source: "iana",
    compressible: !1
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: !1,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: !1,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: !1,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana",
    extensions: [
      "avci"
    ]
  },
  "image/avcs": {
    source: "iana",
    extensions: [
      "avcs"
    ]
  },
  "image/avif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: !1
  },
  "image/png": {
    source: "iana",
    compressible: !1,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: !1,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: !0,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    compressible: !0,
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: !1
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: !1
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: !0
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: !1
  },
  "message/rfc822": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: !0,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: !1,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: !1,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/step": {
    source: "iana"
  },
  "model/step+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "stpx"
    ]
  },
  "model/step+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpz"
    ]
  },
  "model/step-xml+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpxz"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.pytha.pyox": {
    source: "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: !1,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: !1
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: !1
  },
  "multipart/form-data": {
    source: "iana",
    compressible: !1
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: !1
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: !1
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: !0,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: !0
  },
  "text/cmd": {
    compressible: !0
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: !0,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: !0
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: !0,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: !0,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: !0,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: !0,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: !0,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    source: "iana",
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: [
      "ged"
    ]
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: !0
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: !0
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: !0,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: !0,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: !0,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: !0,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    compressible: !0,
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/jxsv": {
    source: "iana"
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: !1,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/vp9": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: !1,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: !0
  },
  "x-shader/x-vertex": {
    compressible: !0
  }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var Tl = El;
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(e) {
  var n = Tl, t = q.extname, i = /^\s*([^;\s]*)(?:;|\s|$)/, a = /^text\//i;
  e.charset = s, e.charsets = { lookup: s }, e.contentType = r, e.extension = p, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = l, e.types = /* @__PURE__ */ Object.create(null), m(e.extensions, e.types);
  function s(o) {
    if (!o || typeof o != "string")
      return !1;
    var u = i.exec(o), c = u && n[u[1].toLowerCase()];
    return c && c.charset ? c.charset : u && a.test(u[1]) ? "UTF-8" : !1;
  }
  function r(o) {
    if (!o || typeof o != "string")
      return !1;
    var u = o.indexOf("/") === -1 ? e.lookup(o) : o;
    if (!u)
      return !1;
    if (u.indexOf("charset") === -1) {
      var c = e.charset(u);
      c && (u += "; charset=" + c.toLowerCase());
    }
    return u;
  }
  function p(o) {
    if (!o || typeof o != "string")
      return !1;
    var u = i.exec(o), c = u && e.extensions[u[1].toLowerCase()];
    return !c || !c.length ? !1 : c[0];
  }
  function l(o) {
    if (!o || typeof o != "string")
      return !1;
    var u = t("x." + o).toLowerCase().substr(1);
    return u && e.types[u] || !1;
  }
  function m(o, u) {
    var c = ["nginx", "apache", void 0, "iana"];
    Object.keys(n).forEach(function(f) {
      var h = n[f], g = h.extensions;
      if (!(!g || !g.length)) {
        o[f] = g;
        for (var v = 0; v < g.length; v++) {
          var b = g[v];
          if (u[b]) {
            var y = c.indexOf(n[u[b]].source), P = c.indexOf(h.source);
            if (u[b] !== "application/octet-stream" && (y > P || y === P && u[b].substr(0, 12) === "application/"))
              continue;
          }
          u[b] = f;
        }
      }
    });
  }
})(ro);
var Rl = Ol;
function Ol(e) {
  var n = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
  n ? n(e) : setTimeout(e, 0);
}
var rs = Rl, oo = Fl;
function Fl(e) {
  var n = !1;
  return rs(function() {
    n = !0;
  }), function(i, a) {
    n ? e(i, a) : rs(function() {
      e(i, a);
    });
  };
}
var co = jl;
function jl(e) {
  Object.keys(e.jobs).forEach(Al.bind(e)), e.jobs = {};
}
function Al(e) {
  typeof this.jobs[e] == "function" && this.jobs[e]();
}
var os = oo, Pl = co, uo = Ll;
function Ll(e, n, t, i) {
  var a = t.keyedList ? t.keyedList[t.index] : t.index;
  t.jobs[a] = $l(n, a, e[a], function(s, r) {
    a in t.jobs && (delete t.jobs[a], s ? Pl(t) : t.results[a] = r, i(s, t.results));
  });
}
function $l(e, n, t, i) {
  var a;
  return e.length == 2 ? a = e(t, os(i)) : a = e(t, n, os(i)), a;
}
var po = Dl;
function Dl(e, n) {
  var t = !Array.isArray(e), i = {
    index: 0,
    keyedList: t || n ? Object.keys(e) : null,
    jobs: {},
    results: t ? {} : [],
    size: t ? Object.keys(e).length : e.length
  };
  return n && i.keyedList.sort(t ? n : function(a, s) {
    return n(e[a], e[s]);
  }), i;
}
var Nl = co, Bl = oo, lo = Il;
function Il(e) {
  Object.keys(this.jobs).length && (this.index = this.size, Nl(this), Bl(e)(null, this.results));
}
var ql = uo, zl = po, Ul = lo, Ml = Gl;
function Gl(e, n, t) {
  for (var i = zl(e); i.index < (i.keyedList || e).length; )
    ql(e, n, i, function(a, s) {
      if (a) {
        t(a, s);
        return;
      }
      if (Object.keys(i.jobs).length === 0) {
        t(null, i.results);
        return;
      }
    }), i.index++;
  return Ul.bind(i, t);
}
var $t = { exports: {} }, cs = uo, Hl = po, Wl = lo;
$t.exports = Jl;
$t.exports.ascending = mo;
$t.exports.descending = Vl;
function Jl(e, n, t, i) {
  var a = Hl(e, t);
  return cs(e, n, a, function s(r, p) {
    if (r) {
      i(r, p);
      return;
    }
    if (a.index++, a.index < (a.keyedList || e).length) {
      cs(e, n, a, s);
      return;
    }
    i(null, a.results);
  }), Wl.bind(a, i);
}
function mo(e, n) {
  return e < n ? -1 : e > n ? 1 : 0;
}
function Vl(e, n) {
  return -1 * mo(e, n);
}
var fo = $t.exports, Kl = fo, Yl = Xl;
function Xl(e, n, t) {
  return Kl(e, n, null, t);
}
var Ql = {
  parallel: Ml,
  serial: Yl,
  serialOrdered: fo
}, Zl = function(e, n) {
  return Object.keys(n).forEach(function(t) {
    e[t] = e[t] || n[t];
  }), e;
}, oa = Cl, ho = ze, Zt = q, ed = aa, nd = sa, td = Ft.parse, id = Te, ad = we.Stream, ei = ro, sd = Ql, Ri = Zl, rd = N;
ho.inherits(N, oa);
function N(e) {
  if (!(this instanceof N))
    return new N(e);
  this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], oa.call(this), e = e || {};
  for (var n in e)
    this[n] = e[n];
}
N.LINE_BREAK = `\r
`;
N.DEFAULT_CONTENT_TYPE = "application/octet-stream";
N.prototype.append = function(e, n, t) {
  t = t || {}, typeof t == "string" && (t = { filename: t });
  var i = oa.prototype.append.bind(this);
  if (typeof n == "number" && (n = "" + n), ho.isArray(n)) {
    this._error(new Error("Arrays are not supported."));
    return;
  }
  var a = this._multiPartHeader(e, n, t), s = this._multiPartFooter();
  i(a), i(n), i(s), this._trackLength(a, n, t);
};
N.prototype._trackLength = function(e, n, t) {
  var i = 0;
  t.knownLength != null ? i += +t.knownLength : Buffer.isBuffer(n) ? i = n.length : typeof n == "string" && (i = Buffer.byteLength(n)), this._valueLength += i, this._overheadLength += Buffer.byteLength(e) + N.LINE_BREAK.length, !(!n || !n.path && !(n.readable && n.hasOwnProperty("httpVersion")) && !(n instanceof ad)) && (t.knownLength || this._valuesToMeasure.push(n));
};
N.prototype._lengthRetriever = function(e, n) {
  e.hasOwnProperty("fd") ? e.end != null && e.end != 1 / 0 && e.start != null ? n(null, e.end + 1 - (e.start ? e.start : 0)) : id.stat(e.path, function(t, i) {
    var a;
    if (t) {
      n(t);
      return;
    }
    a = i.size - (e.start ? e.start : 0), n(null, a);
  }) : e.hasOwnProperty("httpVersion") ? n(null, +e.headers["content-length"]) : e.hasOwnProperty("httpModule") ? (e.on("response", function(t) {
    e.pause(), n(null, +t.headers["content-length"]);
  }), e.resume()) : n("Unknown stream");
};
N.prototype._multiPartHeader = function(e, n, t) {
  if (typeof t.header == "string")
    return t.header;
  var i = this._getContentDisposition(n, t), a = this._getContentType(n, t), s = "", r = {
    // add custom disposition as third element or keep it two elements if not
    "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(i || []),
    // if no content type. allow it to be empty array
    "Content-Type": [].concat(a || [])
  };
  typeof t.header == "object" && Ri(r, t.header);
  var p;
  for (var l in r)
    r.hasOwnProperty(l) && (p = r[l], p != null && (Array.isArray(p) || (p = [p]), p.length && (s += l + ": " + p.join("; ") + N.LINE_BREAK)));
  return "--" + this.getBoundary() + N.LINE_BREAK + s + N.LINE_BREAK;
};
N.prototype._getContentDisposition = function(e, n) {
  var t, i;
  return typeof n.filepath == "string" ? t = Zt.normalize(n.filepath).replace(/\\/g, "/") : n.filename || e.name || e.path ? t = Zt.basename(n.filename || e.name || e.path) : e.readable && e.hasOwnProperty("httpVersion") && (t = Zt.basename(e.client._httpMessage.path || "")), t && (i = 'filename="' + t + '"'), i;
};
N.prototype._getContentType = function(e, n) {
  var t = n.contentType;
  return !t && e.name && (t = ei.lookup(e.name)), !t && e.path && (t = ei.lookup(e.path)), !t && e.readable && e.hasOwnProperty("httpVersion") && (t = e.headers["content-type"]), !t && (n.filepath || n.filename) && (t = ei.lookup(n.filepath || n.filename)), !t && typeof e == "object" && (t = N.DEFAULT_CONTENT_TYPE), t;
};
N.prototype._multiPartFooter = function() {
  return (function(e) {
    var n = N.LINE_BREAK, t = this._streams.length === 0;
    t && (n += this._lastBoundary()), e(n);
  }).bind(this);
};
N.prototype._lastBoundary = function() {
  return "--" + this.getBoundary() + "--" + N.LINE_BREAK;
};
N.prototype.getHeaders = function(e) {
  var n, t = {
    "content-type": "multipart/form-data; boundary=" + this.getBoundary()
  };
  for (n in e)
    e.hasOwnProperty(n) && (t[n.toLowerCase()] = e[n]);
  return t;
};
N.prototype.setBoundary = function(e) {
  this._boundary = e;
};
N.prototype.getBoundary = function() {
  return this._boundary || this._generateBoundary(), this._boundary;
};
N.prototype.getBuffer = function() {
  for (var e = new Buffer.alloc(0), n = this.getBoundary(), t = 0, i = this._streams.length; t < i; t++)
    typeof this._streams[t] != "function" && (Buffer.isBuffer(this._streams[t]) ? e = Buffer.concat([e, this._streams[t]]) : e = Buffer.concat([e, Buffer.from(this._streams[t])]), (typeof this._streams[t] != "string" || this._streams[t].substring(2, n.length + 2) !== n) && (e = Buffer.concat([e, Buffer.from(N.LINE_BREAK)])));
  return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
};
N.prototype._generateBoundary = function() {
  for (var e = "--------------------------", n = 0; n < 24; n++)
    e += Math.floor(Math.random() * 10).toString(16);
  this._boundary = e;
};
N.prototype.getLengthSync = function() {
  var e = this._overheadLength + this._valueLength;
  return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e;
};
N.prototype.hasKnownLength = function() {
  var e = !0;
  return this._valuesToMeasure.length && (e = !1), e;
};
N.prototype.getLength = function(e) {
  var n = this._overheadLength + this._valueLength;
  if (this._streams.length && (n += this._lastBoundary().length), !this._valuesToMeasure.length) {
    process.nextTick(e.bind(this, null, n));
    return;
  }
  sd.parallel(this._valuesToMeasure, this._lengthRetriever, function(t, i) {
    if (t) {
      e(t);
      return;
    }
    i.forEach(function(a) {
      n += a;
    }), e(null, n);
  });
};
N.prototype.submit = function(e, n) {
  var t, i, a = { method: "post" };
  return typeof e == "string" ? (e = td(e), i = Ri({
    port: e.port,
    path: e.pathname,
    host: e.hostname,
    protocol: e.protocol
  }, a)) : (i = Ri(e, a), i.port || (i.port = i.protocol == "https:" ? 443 : 80)), i.headers = this.getHeaders(e.headers), i.protocol == "https:" ? t = nd.request(i) : t = ed.request(i), this.getLength((function(s, r) {
    if (s && s !== "Unknown stream") {
      this._error(s);
      return;
    }
    if (r && t.setHeader("Content-Length", r), this.pipe(t), n) {
      var p, l = function(m, o) {
        return t.removeListener("error", l), t.removeListener("response", p), n.call(this, m, o);
      };
      p = l.bind(this, null), t.on("error", l), t.on("response", p);
    }
  }).bind(this)), t;
};
N.prototype._error = function(e) {
  this.error || (this.error = e, this.pause(), this.emit("error", e));
};
N.prototype.toString = function() {
  return "[object FormData]";
};
const xo = /* @__PURE__ */ bn(rd);
function Oi(e) {
  return x.isPlainObject(e) || x.isArray(e);
}
function vo(e) {
  return x.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function us(e, n, t) {
  return e ? e.concat(n).map(function(a, s) {
    return a = vo(a), !t && s ? "[" + a + "]" : a;
  }).join(t ? "." : "") : n;
}
function od(e) {
  return x.isArray(e) && !e.some(Oi);
}
const cd = x.toFlatObject(x, {}, null, function(n) {
  return /^is[A-Z]/.test(n);
});
function Dt(e, n, t) {
  if (!x.isObject(e))
    throw new TypeError("target must be an object");
  n = n || new (xo || FormData)(), t = x.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(h, g) {
    return !x.isUndefined(g[h]);
  });
  const i = t.metaTokens, a = t.visitor || o, s = t.dots, r = t.indexes, l = (t.Blob || typeof Blob < "u" && Blob) && x.isSpecCompliantForm(n);
  if (!x.isFunction(a))
    throw new TypeError("visitor must be a function");
  function m(f) {
    if (f === null) return "";
    if (x.isDate(f))
      return f.toISOString();
    if (!l && x.isBlob(f))
      throw new S("Blob is not supported. Use a Buffer instead.");
    return x.isArrayBuffer(f) || x.isTypedArray(f) ? l && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function o(f, h, g) {
    let v = f;
    if (f && !g && typeof f == "object") {
      if (x.endsWith(h, "{}"))
        h = i ? h : h.slice(0, -2), f = JSON.stringify(f);
      else if (x.isArray(f) && od(f) || (x.isFileList(f) || x.endsWith(h, "[]")) && (v = x.toArray(f)))
        return h = vo(h), v.forEach(function(y, P) {
          !(x.isUndefined(y) || y === null) && n.append(
            // eslint-disable-next-line no-nested-ternary
            r === !0 ? us([h], P, s) : r === null ? h : h + "[]",
            m(y)
          );
        }), !1;
    }
    return Oi(f) ? !0 : (n.append(us(g, h, s), m(f)), !1);
  }
  const u = [], c = Object.assign(cd, {
    defaultVisitor: o,
    convertValue: m,
    isVisitable: Oi
  });
  function d(f, h) {
    if (!x.isUndefined(f)) {
      if (u.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + h.join("."));
      u.push(f), x.forEach(f, function(v, b) {
        (!(x.isUndefined(v) || v === null) && a.call(
          n,
          v,
          x.isString(b) ? b.trim() : b,
          h,
          c
        )) === !0 && d(v, h ? h.concat(b) : [b]);
      }), u.pop();
    }
  }
  if (!x.isObject(e))
    throw new TypeError("data must be an object");
  return d(e), n;
}
function ps(e) {
  const n = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(i) {
    return n[i];
  });
}
function go(e, n) {
  this._pairs = [], e && Dt(e, this, n);
}
const bo = go.prototype;
bo.append = function(n, t) {
  this._pairs.push([n, t]);
};
bo.toString = function(n) {
  const t = n ? function(i) {
    return n.call(this, i, ps);
  } : ps;
  return this._pairs.map(function(a) {
    return t(a[0]) + "=" + t(a[1]);
  }, "").join("&");
};
function ud(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ca(e, n, t) {
  if (!n)
    return e;
  const i = t && t.encode || ud, a = t && t.serialize;
  let s;
  if (a ? s = a(n, t) : s = x.isURLSearchParams(n) ? n.toString() : new go(n, t).toString(i), s) {
    const r = e.indexOf("#");
    r !== -1 && (e = e.slice(0, r)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class ls {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(n, t, i) {
    return this.handlers.push({
      fulfilled: n,
      rejected: t,
      synchronous: i ? i.synchronous : !1,
      runWhen: i ? i.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(n) {
    this.handlers[n] && (this.handlers[n] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(n) {
    x.forEach(this.handlers, function(i) {
      i !== null && n(i);
    });
  }
}
const ua = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, pd = Ft.URLSearchParams, ld = {
  isNode: !0,
  classes: {
    URLSearchParams: pd,
    FormData: xo,
    Blob: typeof Blob < "u" && Blob || null
  },
  protocols: ["http", "https", "file", "data"]
}, pa = typeof window < "u" && typeof document < "u", dd = ((e) => pa && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product), md = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", fd = pa && window.location.href || "http://localhost", hd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: pa,
  hasStandardBrowserEnv: dd,
  hasStandardBrowserWebWorkerEnv: md,
  origin: fd
}, Symbol.toStringTag, { value: "Module" })), _e = {
  ...hd,
  ...ld
};
function xd(e, n) {
  return Dt(e, new _e.classes.URLSearchParams(), Object.assign({
    visitor: function(t, i, a, s) {
      return _e.isNode && x.isBuffer(t) ? (this.append(i, t.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, n));
}
function vd(e) {
  return x.matchAll(/\w+|\[(\w*)]/g, e).map((n) => n[0] === "[]" ? "" : n[1] || n[0]);
}
function gd(e) {
  const n = {}, t = Object.keys(e);
  let i;
  const a = t.length;
  let s;
  for (i = 0; i < a; i++)
    s = t[i], n[s] = e[s];
  return n;
}
function yo(e) {
  function n(t, i, a, s) {
    let r = t[s++];
    if (r === "__proto__") return !0;
    const p = Number.isFinite(+r), l = s >= t.length;
    return r = !r && x.isArray(a) ? a.length : r, l ? (x.hasOwnProp(a, r) ? a[r] = [a[r], i] : a[r] = i, !p) : ((!a[r] || !x.isObject(a[r])) && (a[r] = []), n(t, i, a[r], s) && x.isArray(a[r]) && (a[r] = gd(a[r])), !p);
  }
  if (x.isFormData(e) && x.isFunction(e.entries)) {
    const t = {};
    return x.forEachEntry(e, (i, a) => {
      n(vd(i), a, t, 0);
    }), t;
  }
  return null;
}
function bd(e, n, t) {
  if (x.isString(e))
    try {
      return (n || JSON.parse)(e), x.trim(e);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (t || JSON.stringify)(e);
}
const Gn = {
  transitional: ua,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(n, t) {
    const i = t.getContentType() || "", a = i.indexOf("application/json") > -1, s = x.isObject(n);
    if (s && x.isHTMLForm(n) && (n = new FormData(n)), x.isFormData(n))
      return a ? JSON.stringify(yo(n)) : n;
    if (x.isArrayBuffer(n) || x.isBuffer(n) || x.isStream(n) || x.isFile(n) || x.isBlob(n) || x.isReadableStream(n))
      return n;
    if (x.isArrayBufferView(n))
      return n.buffer;
    if (x.isURLSearchParams(n))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), n.toString();
    let p;
    if (s) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return xd(n, this.formSerializer).toString();
      if ((p = x.isFileList(n)) || i.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return Dt(
          p ? { "files[]": n } : n,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return s || a ? (t.setContentType("application/json", !1), bd(n)) : n;
  }],
  transformResponse: [function(n) {
    const t = this.transitional || Gn.transitional, i = t && t.forcedJSONParsing, a = this.responseType === "json";
    if (x.isResponse(n) || x.isReadableStream(n))
      return n;
    if (n && x.isString(n) && (i && !this.responseType || a)) {
      const r = !(t && t.silentJSONParsing) && a;
      try {
        return JSON.parse(n);
      } catch (p) {
        if (r)
          throw p.name === "SyntaxError" ? S.from(p, S.ERR_BAD_RESPONSE, this, null, this.response) : p;
      }
    }
    return n;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: _e.classes.FormData,
    Blob: _e.classes.Blob
  },
  validateStatus: function(n) {
    return n >= 200 && n < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
x.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Gn.headers[e] = {};
});
const yd = x.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), wd = (e) => {
  const n = {};
  let t, i, a;
  return e && e.split(`
`).forEach(function(r) {
    a = r.indexOf(":"), t = r.substring(0, a).trim().toLowerCase(), i = r.substring(a + 1).trim(), !(!t || n[t] && yd[t]) && (t === "set-cookie" ? n[t] ? n[t].push(i) : n[t] = [i] : n[t] = n[t] ? n[t] + ", " + i : i);
  }), n;
}, ds = Symbol("internals");
function Cn(e) {
  return e && String(e).trim().toLowerCase();
}
function xt(e) {
  return e === !1 || e == null ? e : x.isArray(e) ? e.map(xt) : String(e);
}
function _d(e) {
  const n = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = t.exec(e); )
    n[i[1]] = i[2];
  return n;
}
const kd = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ni(e, n, t, i, a) {
  if (x.isFunction(i))
    return i.call(this, n, t);
  if (a && (n = t), !!x.isString(n)) {
    if (x.isString(i))
      return n.indexOf(i) !== -1;
    if (x.isRegExp(i))
      return i.test(n);
  }
}
function Sd(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (n, t, i) => t.toUpperCase() + i);
}
function Cd(e, n) {
  const t = x.toCamelCase(" " + n);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(e, i + t, {
      value: function(a, s, r) {
        return this[i].call(this, n, a, s, r);
      },
      configurable: !0
    });
  });
}
class oe {
  constructor(n) {
    n && this.set(n);
  }
  set(n, t, i) {
    const a = this;
    function s(p, l, m) {
      const o = Cn(l);
      if (!o)
        throw new Error("header name must be a non-empty string");
      const u = x.findKey(a, o);
      (!u || a[u] === void 0 || m === !0 || m === void 0 && a[u] !== !1) && (a[u || l] = xt(p));
    }
    const r = (p, l) => x.forEach(p, (m, o) => s(m, o, l));
    if (x.isPlainObject(n) || n instanceof this.constructor)
      r(n, t);
    else if (x.isString(n) && (n = n.trim()) && !kd(n))
      r(wd(n), t);
    else if (x.isHeaders(n))
      for (const [p, l] of n.entries())
        s(l, p, i);
    else
      n != null && s(t, n, i);
    return this;
  }
  get(n, t) {
    if (n = Cn(n), n) {
      const i = x.findKey(this, n);
      if (i) {
        const a = this[i];
        if (!t)
          return a;
        if (t === !0)
          return _d(a);
        if (x.isFunction(t))
          return t.call(this, a, i);
        if (x.isRegExp(t))
          return t.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(n, t) {
    if (n = Cn(n), n) {
      const i = x.findKey(this, n);
      return !!(i && this[i] !== void 0 && (!t || ni(this, this[i], i, t)));
    }
    return !1;
  }
  delete(n, t) {
    const i = this;
    let a = !1;
    function s(r) {
      if (r = Cn(r), r) {
        const p = x.findKey(i, r);
        p && (!t || ni(i, i[p], p, t)) && (delete i[p], a = !0);
      }
    }
    return x.isArray(n) ? n.forEach(s) : s(n), a;
  }
  clear(n) {
    const t = Object.keys(this);
    let i = t.length, a = !1;
    for (; i--; ) {
      const s = t[i];
      (!n || ni(this, this[s], s, n, !0)) && (delete this[s], a = !0);
    }
    return a;
  }
  normalize(n) {
    const t = this, i = {};
    return x.forEach(this, (a, s) => {
      const r = x.findKey(i, s);
      if (r) {
        t[r] = xt(a), delete t[s];
        return;
      }
      const p = n ? Sd(s) : String(s).trim();
      p !== s && delete t[s], t[p] = xt(a), i[p] = !0;
    }), this;
  }
  concat(...n) {
    return this.constructor.concat(this, ...n);
  }
  toJSON(n) {
    const t = /* @__PURE__ */ Object.create(null);
    return x.forEach(this, (i, a) => {
      i != null && i !== !1 && (t[a] = n && x.isArray(i) ? i.join(", ") : i);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([n, t]) => n + ": " + t).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(n) {
    return n instanceof this ? n : new this(n);
  }
  static concat(n, ...t) {
    const i = new this(n);
    return t.forEach((a) => i.set(a)), i;
  }
  static accessor(n) {
    const i = (this[ds] = this[ds] = {
      accessors: {}
    }).accessors, a = this.prototype;
    function s(r) {
      const p = Cn(r);
      i[p] || (Cd(a, r), i[p] = !0);
    }
    return x.isArray(n) ? n.forEach(s) : s(n), this;
  }
}
oe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
x.reduceDescriptors(oe.prototype, ({ value: e }, n) => {
  let t = n[0].toUpperCase() + n.slice(1);
  return {
    get: () => e,
    set(i) {
      this[t] = i;
    }
  };
});
x.freezeMethods(oe);
function ti(e, n) {
  const t = this || Gn, i = n || t, a = oe.from(i.headers);
  let s = i.data;
  return x.forEach(e, function(p) {
    s = p.call(t, s, a.normalize(), n ? n.status : void 0);
  }), a.normalize(), s;
}
function wo(e) {
  return !!(e && e.__CANCEL__);
}
function Ke(e, n, t) {
  S.call(this, e ?? "canceled", S.ERR_CANCELED, n, t), this.name = "CanceledError";
}
x.inherits(Ke, S, {
  __CANCEL__: !0
});
function un(e, n, t) {
  const i = t.config.validateStatus;
  !t.status || !i || i(t.status) ? e(t) : n(new S(
    "Request failed with status code " + t.status,
    [S.ERR_BAD_REQUEST, S.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
function Ed(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Td(e, n) {
  return n ? e.replace(/\/?\/$/, "") + "/" + n.replace(/^\/+/, "") : e;
}
function la(e, n) {
  return e && !Ed(n) ? Td(e, n) : n;
}
var Rd = Ft.parse, Od = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, Fd = String.prototype.endsWith || function(e) {
  return e.length <= this.length && this.indexOf(e, this.length - e.length) !== -1;
};
function jd(e) {
  var n = typeof e == "string" ? Rd(e) : e || {}, t = n.protocol, i = n.host, a = n.port;
  if (typeof i != "string" || !i || typeof t != "string" || (t = t.split(":", 1)[0], i = i.replace(/:\d*$/, ""), a = parseInt(a) || Od[t] || 0, !Ad(i, a)))
    return "";
  var s = pn("npm_config_" + t + "_proxy") || pn(t + "_proxy") || pn("npm_config_proxy") || pn("all_proxy");
  return s && s.indexOf("://") === -1 && (s = t + "://" + s), s;
}
function Ad(e, n) {
  var t = (pn("npm_config_no_proxy") || pn("no_proxy")).toLowerCase();
  return t ? t === "*" ? !1 : t.split(/[,\s]/).every(function(i) {
    if (!i)
      return !0;
    var a = i.match(/^(.+):(\d+)$/), s = a ? a[1] : i, r = a ? parseInt(a[2]) : 0;
    return r && r !== n ? !0 : /^[.*]/.test(s) ? (s.charAt(0) === "*" && (s = s.slice(1)), !Fd.call(e, s)) : e !== s;
  }) : !0;
}
function pn(e) {
  return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
var Pd = jd, da = { exports: {} }, et = { exports: {} }, nt = { exports: {} }, ii, ms;
function Ld() {
  if (ms) return ii;
  ms = 1;
  var e = 1e3, n = e * 60, t = n * 60, i = t * 24, a = i * 7, s = i * 365.25;
  ii = function(o, u) {
    u = u || {};
    var c = typeof o;
    if (c === "string" && o.length > 0)
      return r(o);
    if (c === "number" && isFinite(o))
      return u.long ? l(o) : p(o);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(o)
    );
  };
  function r(o) {
    if (o = String(o), !(o.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        o
      );
      if (u) {
        var c = parseFloat(u[1]), d = (u[2] || "ms").toLowerCase();
        switch (d) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return c * s;
          case "weeks":
          case "week":
          case "w":
            return c * a;
          case "days":
          case "day":
          case "d":
            return c * i;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return c * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return c * n;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return c * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return c;
          default:
            return;
        }
      }
    }
  }
  function p(o) {
    var u = Math.abs(o);
    return u >= i ? Math.round(o / i) + "d" : u >= t ? Math.round(o / t) + "h" : u >= n ? Math.round(o / n) + "m" : u >= e ? Math.round(o / e) + "s" : o + "ms";
  }
  function l(o) {
    var u = Math.abs(o);
    return u >= i ? m(o, u, i, "day") : u >= t ? m(o, u, t, "hour") : u >= n ? m(o, u, n, "minute") : u >= e ? m(o, u, e, "second") : o + " ms";
  }
  function m(o, u, c, d) {
    var f = u >= c * 1.5;
    return Math.round(o / c) + " " + d + (f ? "s" : "");
  }
  return ii;
}
var ai, fs;
function _o() {
  if (fs) return ai;
  fs = 1;
  function e(n) {
    i.debug = i, i.default = i, i.coerce = m, i.disable = r, i.enable = s, i.enabled = p, i.humanize = Ld(), i.destroy = o, Object.keys(n).forEach((u) => {
      i[u] = n[u];
    }), i.names = [], i.skips = [], i.formatters = {};
    function t(u) {
      let c = 0;
      for (let d = 0; d < u.length; d++)
        c = (c << 5) - c + u.charCodeAt(d), c |= 0;
      return i.colors[Math.abs(c) % i.colors.length];
    }
    i.selectColor = t;
    function i(u) {
      let c, d = null, f, h;
      function g(...v) {
        if (!g.enabled)
          return;
        const b = g, y = Number(/* @__PURE__ */ new Date()), P = y - (c || y);
        b.diff = P, b.prev = c, b.curr = y, c = y, v[0] = i.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let L = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (M, ne) => {
          if (M === "%%")
            return "%";
          L++;
          const E = i.formatters[ne];
          if (typeof E == "function") {
            const A = v[L];
            M = E.call(b, A), v.splice(L, 1), L--;
          }
          return M;
        }), i.formatArgs.call(b, v), (b.log || i.log).apply(b, v);
      }
      return g.namespace = u, g.useColors = i.useColors(), g.color = i.selectColor(u), g.extend = a, g.destroy = i.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => d !== null ? d : (f !== i.namespaces && (f = i.namespaces, h = i.enabled(u)), h),
        set: (v) => {
          d = v;
        }
      }), typeof i.init == "function" && i.init(g), g;
    }
    function a(u, c) {
      const d = i(this.namespace + (typeof c > "u" ? ":" : c) + u);
      return d.log = this.log, d;
    }
    function s(u) {
      i.save(u), i.namespaces = u, i.names = [], i.skips = [];
      let c;
      const d = (typeof u == "string" ? u : "").split(/[\s,]+/), f = d.length;
      for (c = 0; c < f; c++)
        d[c] && (u = d[c].replace(/\*/g, ".*?"), u[0] === "-" ? i.skips.push(new RegExp("^" + u.slice(1) + "$")) : i.names.push(new RegExp("^" + u + "$")));
    }
    function r() {
      const u = [
        ...i.names.map(l),
        ...i.skips.map(l).map((c) => "-" + c)
      ].join(",");
      return i.enable(""), u;
    }
    function p(u) {
      if (u[u.length - 1] === "*")
        return !0;
      let c, d;
      for (c = 0, d = i.skips.length; c < d; c++)
        if (i.skips[c].test(u))
          return !1;
      for (c = 0, d = i.names.length; c < d; c++)
        if (i.names[c].test(u))
          return !0;
      return !1;
    }
    function l(u) {
      return u.toString().substring(2, u.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function m(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function o() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return i.enable(i.load()), i;
  }
  return ai = e, ai;
}
var hs;
function $d() {
  return hs || (hs = 1, function(e, n) {
    n.formatArgs = i, n.save = a, n.load = s, n.useColors = t, n.storage = r(), n.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), n.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function t() {
      return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function i(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const m = "color: " + this.color;
      l.splice(1, 0, m, "color: inherit");
      let o = 0, u = 0;
      l[0].replace(/%[a-zA-Z%]/g, (c) => {
        c !== "%%" && (o++, c === "%c" && (u = o));
      }), l.splice(u, 0, m);
    }
    n.log = console.debug || console.log || (() => {
    });
    function a(l) {
      try {
        l ? n.storage.setItem("debug", l) : n.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let l;
      try {
        l = n.storage.getItem("debug");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function r() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = _o()(n);
    const { formatters: p } = e.exports;
    p.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
  }(nt, nt.exports)), nt.exports;
}
var tt = { exports: {} }, si, xs;
function Dd() {
  return xs || (xs = 1, si = (e, n) => {
    n = n || process.argv;
    const t = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", i = n.indexOf(t + e), a = n.indexOf("--");
    return i !== -1 && (a === -1 ? !0 : i < a);
  }), si;
}
var ri, vs;
function Nd() {
  if (vs) return ri;
  vs = 1;
  const e = Jr, n = Dd(), t = process.env;
  let i;
  n("no-color") || n("no-colors") || n("color=false") ? i = !1 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (i = !0), "FORCE_COLOR" in t && (i = t.FORCE_COLOR.length === 0 || parseInt(t.FORCE_COLOR, 10) !== 0);
  function a(p) {
    return p === 0 ? !1 : {
      level: p,
      hasBasic: !0,
      has256: p >= 2,
      has16m: p >= 3
    };
  }
  function s(p) {
    if (i === !1)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (p && !p.isTTY && i !== !0)
      return 0;
    const l = i ? 1 : 0;
    if (process.platform === "win32") {
      const m = e.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(m[0]) >= 10 && Number(m[2]) >= 10586 ? Number(m[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in t)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((m) => m in t) || t.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in t)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(t.TEAMCITY_VERSION) ? 1 : 0;
    if (t.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in t) {
      const m = parseInt((t.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (t.TERM_PROGRAM) {
        case "iTerm.app":
          return m >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(t.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(t.TERM) || "COLORTERM" in t ? 1 : (t.TERM === "dumb", l);
  }
  function r(p) {
    const l = s(p);
    return a(l);
  }
  return ri = {
    supportsColor: r,
    stdout: r(process.stdout),
    stderr: r(process.stderr)
  }, ri;
}
var gs;
function Bd() {
  return gs || (gs = 1, function(e, n) {
    const t = jt, i = ze;
    n.init = o, n.log = p, n.formatArgs = s, n.save = l, n.load = m, n.useColors = a, n.destroy = i.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), n.colors = [6, 2, 3, 4, 5, 1];
    try {
      const c = Nd();
      c && (c.stderr || c).level >= 2 && (n.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    n.inspectOpts = Object.keys(process.env).filter((c) => /^debug_/i.test(c)).reduce((c, d) => {
      const f = d.substring(6).toLowerCase().replace(/_([a-z])/g, (g, v) => v.toUpperCase());
      let h = process.env[d];
      return /^(yes|on|true|enabled)$/i.test(h) ? h = !0 : /^(no|off|false|disabled)$/i.test(h) ? h = !1 : h === "null" ? h = null : h = Number(h), c[f] = h, c;
    }, {});
    function a() {
      return "colors" in n.inspectOpts ? !!n.inspectOpts.colors : t.isatty(process.stderr.fd);
    }
    function s(c) {
      const { namespace: d, useColors: f } = this;
      if (f) {
        const h = this.color, g = "\x1B[3" + (h < 8 ? h : "8;5;" + h), v = `  ${g};1m${d} \x1B[0m`;
        c[0] = v + c[0].split(`
`).join(`
` + v), c.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        c[0] = r() + d + " " + c[0];
    }
    function r() {
      return n.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function p(...c) {
      return process.stderr.write(i.formatWithOptions(n.inspectOpts, ...c) + `
`);
    }
    function l(c) {
      c ? process.env.DEBUG = c : delete process.env.DEBUG;
    }
    function m() {
      return process.env.DEBUG;
    }
    function o(c) {
      c.inspectOpts = {};
      const d = Object.keys(n.inspectOpts);
      for (let f = 0; f < d.length; f++)
        c.inspectOpts[d[f]] = n.inspectOpts[d[f]];
    }
    e.exports = _o()(n);
    const { formatters: u } = e.exports;
    u.o = function(c) {
      return this.inspectOpts.colors = this.useColors, i.inspect(c, this.inspectOpts).split(`
`).map((d) => d.trim()).join(" ");
    }, u.O = function(c) {
      return this.inspectOpts.colors = this.useColors, i.inspect(c, this.inspectOpts);
    };
  }(tt, tt.exports)), tt.exports;
}
var bs;
function Id() {
  return bs || (bs = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? et.exports = $d() : et.exports = Bd()), et.exports;
}
var En, qd = function() {
  if (!En) {
    try {
      En = Id()("follow-redirects");
    } catch {
    }
    typeof En != "function" && (En = function() {
    });
  }
  En.apply(null, arguments);
}, Hn = Ft, Pn = Hn.URL, zd = aa, Ud = sa, ma = we.Writable, fa = Wr, ko = qd, ha = !1;
try {
  fa(new Pn());
} catch (e) {
  ha = e.code === "ERR_INVALID_URL";
}
var Md = [
  "auth",
  "host",
  "hostname",
  "href",
  "path",
  "pathname",
  "port",
  "protocol",
  "query",
  "search",
  "hash"
], xa = ["abort", "aborted", "connect", "error", "socket", "timeout"], va = /* @__PURE__ */ Object.create(null);
xa.forEach(function(e) {
  va[e] = function(n, t, i) {
    this._redirectable.emit(e, n, t, i);
  };
});
var Fi = Wn(
  "ERR_INVALID_URL",
  "Invalid URL",
  TypeError
), ji = Wn(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
), Gd = Wn(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded",
  ji
), Hd = Wn(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
), Wd = Wn(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
), Jd = ma.prototype.destroy || Co;
function ve(e, n) {
  ma.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], n && this.on("response", n);
  var t = this;
  this._onNativeResponse = function(i) {
    try {
      t._processResponse(i);
    } catch (a) {
      t.emit("error", a instanceof ji ? a : new ji({ cause: a }));
    }
  }, this._performRequest();
}
ve.prototype = Object.create(ma.prototype);
ve.prototype.abort = function() {
  ba(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
};
ve.prototype.destroy = function(e) {
  return ba(this._currentRequest, e), Jd.call(this, e), this;
};
ve.prototype.write = function(e, n, t) {
  if (this._ending)
    throw new Wd();
  if (!Qe(e) && !Yd(e))
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  if (Ln(n) && (t = n, n = null), e.length === 0) {
    t && t();
    return;
  }
  this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({ data: e, encoding: n }), this._currentRequest.write(e, n, t)) : (this.emit("error", new Hd()), this.abort());
};
ve.prototype.end = function(e, n, t) {
  if (Ln(e) ? (t = e, e = n = null) : Ln(n) && (t = n, n = null), !e)
    this._ended = this._ending = !0, this._currentRequest.end(null, null, t);
  else {
    var i = this, a = this._currentRequest;
    this.write(e, n, function() {
      i._ended = !0, a.end(null, null, t);
    }), this._ending = !0;
  }
};
ve.prototype.setHeader = function(e, n) {
  this._options.headers[e] = n, this._currentRequest.setHeader(e, n);
};
ve.prototype.removeHeader = function(e) {
  delete this._options.headers[e], this._currentRequest.removeHeader(e);
};
ve.prototype.setTimeout = function(e, n) {
  var t = this;
  function i(r) {
    r.setTimeout(e), r.removeListener("timeout", r.destroy), r.addListener("timeout", r.destroy);
  }
  function a(r) {
    t._timeout && clearTimeout(t._timeout), t._timeout = setTimeout(function() {
      t.emit("timeout"), s();
    }, e), i(r);
  }
  function s() {
    t._timeout && (clearTimeout(t._timeout), t._timeout = null), t.removeListener("abort", s), t.removeListener("error", s), t.removeListener("response", s), t.removeListener("close", s), n && t.removeListener("timeout", n), t.socket || t._currentRequest.removeListener("socket", a);
  }
  return n && this.on("timeout", n), this.socket ? a(this.socket) : this._currentRequest.once("socket", a), this.on("socket", i), this.on("abort", s), this.on("error", s), this.on("response", s), this.on("close", s), this;
};
[
  "flushHeaders",
  "getHeader",
  "setNoDelay",
  "setSocketKeepAlive"
].forEach(function(e) {
  ve.prototype[e] = function(n, t) {
    return this._currentRequest[e](n, t);
  };
});
["aborted", "connection", "socket"].forEach(function(e) {
  Object.defineProperty(ve.prototype, e, {
    get: function() {
      return this._currentRequest[e];
    }
  });
});
ve.prototype._sanitizeOptions = function(e) {
  if (e.headers || (e.headers = {}), e.host && (e.hostname || (e.hostname = e.host), delete e.host), !e.pathname && e.path) {
    var n = e.path.indexOf("?");
    n < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, n), e.search = e.path.substring(n));
  }
};
ve.prototype._performRequest = function() {
  var e = this._options.protocol, n = this._options.nativeProtocols[e];
  if (!n)
    throw new TypeError("Unsupported protocol " + e);
  if (this._options.agents) {
    var t = e.slice(0, -1);
    this._options.agent = this._options.agents[t];
  }
  var i = this._currentRequest = n.request(this._options, this._onNativeResponse);
  i._redirectable = this;
  for (var a of xa)
    i.on(a, va[a]);
  if (this._currentUrl = /^\//.test(this._options.path) ? Hn.format(this._options) : (
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path
  ), this._isRedirect) {
    var s = 0, r = this, p = this._requestBodyBuffers;
    (function l(m) {
      if (i === r._currentRequest)
        if (m)
          r.emit("error", m);
        else if (s < p.length) {
          var o = p[s++];
          i.finished || i.write(o.data, o.encoding, l);
        } else r._ended && i.end();
    })();
  }
};
ve.prototype._processResponse = function(e) {
  var n = e.statusCode;
  this._options.trackRedirects && this._redirects.push({
    url: this._currentUrl,
    headers: e.headers,
    statusCode: n
  });
  var t = e.headers.location;
  if (!t || this._options.followRedirects === !1 || n < 300 || n >= 400) {
    e.responseUrl = this._currentUrl, e.redirects = this._redirects, this.emit("response", e), this._requestBodyBuffers = [];
    return;
  }
  if (ba(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects)
    throw new Gd();
  var i, a = this._options.beforeRedirect;
  a && (i = Object.assign({
    // The Host header was set by nativeProtocol.request
    Host: e.req.getHeader("host")
  }, this._options.headers));
  var s = this._options.method;
  ((n === 301 || n === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
  // the server is redirecting the user agent to a different resource […]
  // A user agent can perform a retrieval request targeting that URI
  // (a GET or HEAD request if using HTTP) […]
  n === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], oi(/^content-/i, this._options.headers));
  var r = oi(/^host$/i, this._options.headers), p = ga(this._currentUrl), l = r || p.host, m = /^\w+:/.test(t) ? this._currentUrl : Hn.format(Object.assign(p, { host: l })), o = Vd(t, m);
  if (ko("redirecting to", o.href), this._isRedirect = !0, Ai(o, this._options), (o.protocol !== p.protocol && o.protocol !== "https:" || o.host !== l && !Kd(o.host, l)) && oi(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers), Ln(a)) {
    var u = {
      headers: e.headers,
      statusCode: n
    }, c = {
      url: m,
      method: s,
      headers: i
    };
    a(this._options, u, c), this._sanitizeOptions(this._options);
  }
  this._performRequest();
};
function So(e) {
  var n = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  }, t = {};
  return Object.keys(e).forEach(function(i) {
    var a = i + ":", s = t[a] = e[i], r = n[i] = Object.create(s);
    function p(m, o, u) {
      return Xd(m) ? m = Ai(m) : Qe(m) ? m = Ai(ga(m)) : (u = o, o = Eo(m), m = { protocol: a }), Ln(o) && (u = o, o = null), o = Object.assign({
        maxRedirects: n.maxRedirects,
        maxBodyLength: n.maxBodyLength
      }, m, o), o.nativeProtocols = t, !Qe(o.host) && !Qe(o.hostname) && (o.hostname = "::1"), fa.equal(o.protocol, a, "protocol mismatch"), ko("options", o), new ve(o, u);
    }
    function l(m, o, u) {
      var c = r.request(m, o, u);
      return c.end(), c;
    }
    Object.defineProperties(r, {
      request: { value: p, configurable: !0, enumerable: !0, writable: !0 },
      get: { value: l, configurable: !0, enumerable: !0, writable: !0 }
    });
  }), n;
}
function Co() {
}
function ga(e) {
  var n;
  if (ha)
    n = new Pn(e);
  else if (n = Eo(Hn.parse(e)), !Qe(n.protocol))
    throw new Fi({ input: e });
  return n;
}
function Vd(e, n) {
  return ha ? new Pn(e, n) : ga(Hn.resolve(n, e));
}
function Eo(e) {
  if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname))
    throw new Fi({ input: e.href || e });
  if (/^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host))
    throw new Fi({ input: e.href || e });
  return e;
}
function Ai(e, n) {
  var t = n || {};
  for (var i of Md)
    t[i] = e[i];
  return t.hostname.startsWith("[") && (t.hostname = t.hostname.slice(1, -1)), t.port !== "" && (t.port = Number(t.port)), t.path = t.search ? t.pathname + t.search : t.pathname, t;
}
function oi(e, n) {
  var t;
  for (var i in n)
    e.test(i) && (t = n[i], delete n[i]);
  return t === null || typeof t > "u" ? void 0 : String(t).trim();
}
function Wn(e, n, t) {
  function i(a) {
    Error.captureStackTrace(this, this.constructor), Object.assign(this, a || {}), this.code = e, this.message = this.cause ? n + ": " + this.cause.message : n;
  }
  return i.prototype = new (t || Error)(), Object.defineProperties(i.prototype, {
    constructor: {
      value: i,
      enumerable: !1
    },
    name: {
      value: "Error [" + e + "]",
      enumerable: !1
    }
  }), i;
}
function ba(e, n) {
  for (var t of xa)
    e.removeListener(t, va[t]);
  e.on("error", Co), e.destroy(n);
}
function Kd(e, n) {
  fa(Qe(e) && Qe(n));
  var t = e.length - n.length - 1;
  return t > 0 && e[t] === "." && e.endsWith(n);
}
function Qe(e) {
  return typeof e == "string" || e instanceof String;
}
function Ln(e) {
  return typeof e == "function";
}
function Yd(e) {
  return typeof e == "object" && "length" in e;
}
function Xd(e) {
  return Pn && e instanceof Pn;
}
da.exports = So({ http: zd, https: Ud });
da.exports.wrap = So;
var Qd = da.exports;
const Zd = /* @__PURE__ */ bn(Qd), _t = "1.7.2";
function To(e) {
  const n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return n && n[1] || "";
}
const em = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function nm(e, n, t) {
  const i = t && t.Blob || _e.classes.Blob, a = To(e);
  if (n === void 0 && i && (n = !0), a === "data") {
    e = a.length ? e.slice(a.length + 1) : e;
    const s = em.exec(e);
    if (!s)
      throw new S("Invalid URL", S.ERR_INVALID_URL);
    const r = s[1], p = s[2], l = s[3], m = Buffer.from(decodeURIComponent(l), p ? "base64" : "utf8");
    if (n) {
      if (!i)
        throw new S("Blob is not supported", S.ERR_NOT_SUPPORT);
      return new i([m], { type: r });
    }
    return m;
  }
  throw new S("Unsupported protocol " + a, S.ERR_NOT_SUPPORT);
}
function Ro(e, n) {
  let t = 0;
  const i = 1e3 / n;
  let a = null;
  return function() {
    const r = this === !0, p = Date.now();
    if (r || p - t > i)
      return a && (clearTimeout(a), a = null), t = p, e.apply(null, arguments);
    a || (a = setTimeout(() => (a = null, t = Date.now(), e.apply(null, arguments)), i - (p - t)));
  };
}
function Oo(e, n) {
  e = e || 10;
  const t = new Array(e), i = new Array(e);
  let a = 0, s = 0, r;
  return n = n !== void 0 ? n : 1e3, function(l) {
    const m = Date.now(), o = i[s];
    r || (r = m), t[a] = l, i[a] = m;
    let u = s, c = 0;
    for (; u !== a; )
      c += t[u++], u = u % e;
    if (a = (a + 1) % e, a === s && (s = (s + 1) % e), m - r < n)
      return;
    const d = o && m - o;
    return d ? Math.round(c * 1e3 / d) : void 0;
  };
}
const it = Symbol("internals");
class ys extends we.Transform {
  constructor(n) {
    n = x.toFlatObject(n, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (p, l) => !x.isUndefined(l[p])), super({
      readableHighWaterMark: n.chunkSize
    });
    const t = this, i = this[it] = {
      length: n.length,
      timeWindow: n.timeWindow,
      ticksRate: n.ticksRate,
      chunkSize: n.chunkSize,
      maxRate: n.maxRate,
      minChunkSize: n.minChunkSize,
      bytesSeen: 0,
      isCaptured: !1,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    }, a = Oo(i.ticksRate * n.samplesCount, i.timeWindow);
    this.on("newListener", (p) => {
      p === "progress" && (i.isCaptured || (i.isCaptured = !0));
    });
    let s = 0;
    i.updateProgress = Ro(function() {
      const l = i.length, m = i.bytesSeen, o = m - s;
      if (!o || t.destroyed) return;
      const u = a(o);
      s = m, process.nextTick(() => {
        t.emit("progress", {
          loaded: m,
          total: l,
          progress: l ? m / l : void 0,
          bytes: o,
          rate: u || void 0,
          estimated: u && l && m <= l ? (l - m) / u : void 0,
          lengthComputable: l != null
        });
      });
    }, i.ticksRate);
    const r = () => {
      i.updateProgress.call(!0);
    };
    this.once("end", r), this.once("error", r);
  }
  _read(n) {
    const t = this[it];
    return t.onReadCallback && t.onReadCallback(), super._read(n);
  }
  _transform(n, t, i) {
    const a = this, s = this[it], r = s.maxRate, p = this.readableHighWaterMark, l = s.timeWindow, m = 1e3 / l, o = r / m, u = s.minChunkSize !== !1 ? Math.max(s.minChunkSize, o * 0.01) : 0;
    function c(f, h) {
      const g = Buffer.byteLength(f);
      s.bytesSeen += g, s.bytes += g, s.isCaptured && s.updateProgress(), a.push(f) ? process.nextTick(h) : s.onReadCallback = () => {
        s.onReadCallback = null, process.nextTick(h);
      };
    }
    const d = (f, h) => {
      const g = Buffer.byteLength(f);
      let v = null, b = p, y, P = 0;
      if (r) {
        const L = Date.now();
        (!s.ts || (P = L - s.ts) >= l) && (s.ts = L, y = o - s.bytes, s.bytes = y < 0 ? -y : 0, P = 0), y = o - s.bytes;
      }
      if (r) {
        if (y <= 0)
          return setTimeout(() => {
            h(null, f);
          }, l - P);
        y < b && (b = y);
      }
      b && g > b && g - b > u && (v = f.subarray(b), f = f.subarray(0, b)), c(f, v ? () => {
        process.nextTick(h, null, v);
      } : h);
    };
    d(n, function f(h, g) {
      if (h)
        return i(h);
      g ? d(g, f) : i(null);
    });
  }
  setLength(n) {
    return this[it].length = +n, this;
  }
}
const { asyncIterator: ws } = Symbol, Fo = async function* (e) {
  e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[ws] ? yield* e[ws]() : yield e;
}, tm = x.ALPHABET.ALPHA_DIGIT + "-_", $n = new jp(), He = `\r
`, im = $n.encode(He), am = 2;
class sm {
  constructor(n, t) {
    const { escapeName: i } = this.constructor, a = x.isString(t);
    let s = `Content-Disposition: form-data; name="${i(n)}"${!a && t.name ? `; filename="${i(t.name)}"` : ""}${He}`;
    a ? t = $n.encode(String(t).replace(/\r?\n|\r\n?/g, He)) : s += `Content-Type: ${t.type || "application/octet-stream"}${He}`, this.headers = $n.encode(s + He), this.contentLength = a ? t.byteLength : t.size, this.size = this.headers.byteLength + this.contentLength + am, this.name = n, this.value = t;
  }
  async *encode() {
    yield this.headers;
    const { value: n } = this;
    x.isTypedArray(n) ? yield n : yield* Fo(n), yield im;
  }
  static escapeName(n) {
    return String(n).replace(/[\r\n"]/g, (t) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[t]);
  }
}
const rm = (e, n, t) => {
  const {
    tag: i = "form-data-boundary",
    size: a = 25,
    boundary: s = i + "-" + x.generateString(a, tm)
  } = t || {};
  if (!x.isFormData(e))
    throw TypeError("FormData instance required");
  if (s.length < 1 || s.length > 70)
    throw Error("boundary must be 10-70 characters long");
  const r = $n.encode("--" + s + He), p = $n.encode("--" + s + "--" + He + He);
  let l = p.byteLength;
  const m = Array.from(e.entries()).map(([u, c]) => {
    const d = new sm(u, c);
    return l += d.size, d;
  });
  l += r.byteLength * m.length, l = x.toFiniteNumber(l);
  const o = {
    "Content-Type": `multipart/form-data; boundary=${s}`
  };
  return Number.isFinite(l) && (o["Content-Length"] = l), n && n(o), Ap.from(async function* () {
    for (const u of m)
      yield r, yield* u.encode();
    yield p;
  }());
};
class om extends we.Transform {
  __transform(n, t, i) {
    this.push(n), i();
  }
  _transform(n, t, i) {
    if (n.length !== 0 && (this._transform = this.__transform, n[0] !== 120)) {
      const a = Buffer.alloc(2);
      a[0] = 120, a[1] = 156, this.push(a, t);
    }
    this.__transform(n, t, i);
  }
}
const cm = (e, n) => x.isAsyncFn(e) ? function(...t) {
  const i = t.pop();
  e.apply(this, t).then((a) => {
    try {
      n ? i(null, ...n(a)) : i(null, a);
    } catch (s) {
      i(s);
    }
  }, i);
} : e, _s = {
  flush: Je.constants.Z_SYNC_FLUSH,
  finishFlush: Je.constants.Z_SYNC_FLUSH
}, um = {
  flush: Je.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: Je.constants.BROTLI_OPERATION_FLUSH
}, ks = x.isFunction(Je.createBrotliDecompress), { http: pm, https: lm } = Zd, dm = /https:?/, Ss = _e.protocols.map((e) => e + ":");
function mm(e, n) {
  e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.config && e.beforeRedirects.config(e, n);
}
function jo(e, n, t) {
  let i = n;
  if (!i && i !== !1) {
    const a = Pd(t);
    a && (i = new URL(a));
  }
  if (i) {
    if (i.username && (i.auth = (i.username || "") + ":" + (i.password || "")), i.auth) {
      (i.auth.username || i.auth.password) && (i.auth = (i.auth.username || "") + ":" + (i.auth.password || ""));
      const s = Buffer.from(i.auth, "utf8").toString("base64");
      e.headers["Proxy-Authorization"] = "Basic " + s;
    }
    e.headers.host = e.hostname + (e.port ? ":" + e.port : "");
    const a = i.hostname || i.host;
    e.hostname = a, e.host = a, e.port = i.port, e.path = t, i.protocol && (e.protocol = i.protocol.includes(":") ? i.protocol : `${i.protocol}:`);
  }
  e.beforeRedirects.proxy = function(s) {
    jo(s, n, s.href);
  };
}
const fm = typeof process < "u" && x.kindOf(process) === "process", hm = (e) => new Promise((n, t) => {
  let i, a;
  const s = (l, m) => {
    a || (a = !0, i && i(l, m));
  }, r = (l) => {
    s(l), n(l);
  }, p = (l) => {
    s(l, !0), t(l);
  };
  e(r, p, (l) => i = l).catch(p);
}), xm = ({ address: e, family: n }) => {
  if (!x.isString(e))
    throw TypeError("address must be a string");
  return {
    address: e,
    family: n || (e.indexOf(".") < 0 ? 6 : 4)
  };
}, Cs = (e, n) => xm(x.isObject(e) ? e : { address: e, family: n }), vm = fm && function(n) {
  return hm(async function(i, a, s) {
    let { data: r, lookup: p, family: l } = n;
    const { responseType: m, responseEncoding: o } = n, u = n.method.toUpperCase();
    let c, d = !1, f;
    if (p) {
      const k = cm(p, (C) => x.isArray(C) ? C : [C]);
      p = (C, F, Fe) => {
        k(C, F, (te, je, kn) => {
          if (te)
            return Fe(te);
          const ke = x.isArray(je) ? je.map((be) => Cs(be)) : [Cs(je, kn)];
          F.all ? Fe(te, ke) : Fe(te, ke[0].address, ke[0].family);
        });
      };
    }
    const h = new Lp(), g = () => {
      n.cancelToken && n.cancelToken.unsubscribe(v), n.signal && n.signal.removeEventListener("abort", v), h.removeAllListeners();
    };
    s((k, C) => {
      c = !0, C && (d = !0, g());
    });
    function v(k) {
      h.emit("abort", !k || k.type ? new Ke(null, n, f) : k);
    }
    h.once("abort", a), (n.cancelToken || n.signal) && (n.cancelToken && n.cancelToken.subscribe(v), n.signal && (n.signal.aborted ? v() : n.signal.addEventListener("abort", v)));
    const b = la(n.baseURL, n.url), y = new URL(b, "http://localhost"), P = y.protocol || Ss[0];
    if (P === "data:") {
      let k;
      if (u !== "GET")
        return un(i, a, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config: n
        });
      try {
        k = nm(n.url, m === "blob", {
          Blob: n.env && n.env.Blob
        });
      } catch (C) {
        throw S.from(C, S.ERR_BAD_REQUEST, n);
      }
      return m === "text" ? (k = k.toString(o), (!o || o === "utf8") && (k = x.stripBOM(k))) : m === "stream" && (k = we.Readable.from(k)), un(i, a, {
        data: k,
        status: 200,
        statusText: "OK",
        headers: new oe(),
        config: n
      });
    }
    if (Ss.indexOf(P) === -1)
      return a(new S(
        "Unsupported protocol " + P,
        S.ERR_BAD_REQUEST,
        n
      ));
    const L = oe.from(n.headers).normalize();
    L.set("User-Agent", "axios/" + _t, !1);
    const ee = n.onDownloadProgress, M = n.onUploadProgress, ne = n.maxRate;
    let E, A;
    if (x.isSpecCompliantForm(r)) {
      const k = L.getContentType(/boundary=([-_\w\d]{10,70})/i);
      r = rm(r, (C) => {
        L.set(C);
      }, {
        tag: `axios-${_t}-boundary`,
        boundary: k && k[1] || void 0
      });
    } else if (x.isFormData(r) && x.isFunction(r.getHeaders)) {
      if (L.set(r.getHeaders()), !L.hasContentLength())
        try {
          const k = await ze.promisify(r.getLength).call(r);
          Number.isFinite(k) && k >= 0 && L.setContentLength(k);
        } catch {
        }
    } else if (x.isBlob(r))
      r.size && L.setContentType(r.type || "application/octet-stream"), L.setContentLength(r.size || 0), r = we.Readable.from(Fo(r));
    else if (r && !x.isStream(r)) {
      if (!Buffer.isBuffer(r)) if (x.isArrayBuffer(r))
        r = Buffer.from(new Uint8Array(r));
      else if (x.isString(r))
        r = Buffer.from(r, "utf-8");
      else
        return a(new S(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          S.ERR_BAD_REQUEST,
          n
        ));
      if (L.setContentLength(r.length, !1), n.maxBodyLength > -1 && r.length > n.maxBodyLength)
        return a(new S(
          "Request body larger than maxBodyLength limit",
          S.ERR_BAD_REQUEST,
          n
        ));
    }
    const $ = x.toFiniteNumber(L.getContentLength());
    x.isArray(ne) ? (E = ne[0], A = ne[1]) : E = A = ne, r && (M || E) && (x.isStream(r) || (r = we.Readable.from(r, { objectMode: !1 })), r = we.pipeline([r, new ys({
      length: $,
      maxRate: x.toFiniteNumber(E)
    })], x.noop), M && r.on("progress", (k) => {
      M(Object.assign(k, {
        upload: !0
      }));
    }));
    let G;
    if (n.auth) {
      const k = n.auth.username || "", C = n.auth.password || "";
      G = k + ":" + C;
    }
    if (!G && y.username) {
      const k = y.username, C = y.password;
      G = k + ":" + C;
    }
    G && L.delete("authorization");
    let J;
    try {
      J = ca(
        y.pathname + y.search,
        n.params,
        n.paramsSerializer
      ).replace(/^\?/, "");
    } catch (k) {
      const C = new Error(k.message);
      return C.config = n, C.url = n.url, C.exists = !0, a(C);
    }
    L.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (ks ? ", br" : ""),
      !1
    );
    const D = {
      path: J,
      method: u,
      headers: L.toJSON(),
      agents: { http: n.httpAgent, https: n.httpsAgent },
      auth: G,
      protocol: P,
      family: l,
      beforeRedirect: mm,
      beforeRedirects: {}
    };
    !x.isUndefined(p) && (D.lookup = p), n.socketPath ? D.socketPath = n.socketPath : (D.hostname = y.hostname, D.port = y.port, jo(D, n.proxy, P + "//" + y.hostname + (y.port ? ":" + y.port : "") + D.path));
    let I;
    const z = dm.test(D.protocol);
    if (D.agent = z ? n.httpsAgent : n.httpAgent, n.transport ? I = n.transport : n.maxRedirects === 0 ? I = z ? sa : aa : (n.maxRedirects && (D.maxRedirects = n.maxRedirects), n.beforeRedirect && (D.beforeRedirects.config = n.beforeRedirect), I = z ? lm : pm), n.maxBodyLength > -1 ? D.maxBodyLength = n.maxBodyLength : D.maxBodyLength = 1 / 0, n.insecureHTTPParser && (D.insecureHTTPParser = n.insecureHTTPParser), f = I.request(D, function(C) {
      if (f.destroyed) return;
      const F = [C], Fe = +C.headers["content-length"];
      if (ee) {
        const be = new ys({
          length: x.toFiniteNumber(Fe),
          maxRate: x.toFiniteNumber(A)
        });
        ee && be.on("progress", (on) => {
          ee(Object.assign(on, {
            download: !0
          }));
        }), F.push(be);
      }
      let te = C;
      const je = C.req || f;
      if (n.decompress !== !1 && C.headers["content-encoding"])
        switch ((u === "HEAD" || C.statusCode === 204) && delete C.headers["content-encoding"], (C.headers["content-encoding"] || "").toLowerCase()) {
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            F.push(Je.createUnzip(_s)), delete C.headers["content-encoding"];
            break;
          case "deflate":
            F.push(new om()), F.push(Je.createUnzip(_s)), delete C.headers["content-encoding"];
            break;
          case "br":
            ks && (F.push(Je.createBrotliDecompress(um)), delete C.headers["content-encoding"]);
        }
      te = F.length > 1 ? we.pipeline(F, x.noop) : F[0];
      const kn = we.finished(te, () => {
        kn(), g();
      }), ke = {
        status: C.statusCode,
        statusText: C.statusMessage,
        headers: new oe(C.headers),
        config: n,
        request: je
      };
      if (m === "stream")
        ke.data = te, un(i, a, ke);
      else {
        const be = [];
        let on = 0;
        te.on("data", function(se) {
          be.push(se), on += se.length, n.maxContentLength > -1 && on > n.maxContentLength && (d = !0, te.destroy(), a(new S(
            "maxContentLength size of " + n.maxContentLength + " exceeded",
            S.ERR_BAD_RESPONSE,
            n,
            je
          )));
        }), te.on("aborted", function() {
          if (d)
            return;
          const se = new S(
            "maxContentLength size of " + n.maxContentLength + " exceeded",
            S.ERR_BAD_RESPONSE,
            n,
            je
          );
          te.destroy(se), a(se);
        }), te.on("error", function(se) {
          f.destroyed || a(S.from(se, null, n, je));
        }), te.on("end", function() {
          try {
            let se = be.length === 1 ? be[0] : Buffer.concat(be);
            m !== "arraybuffer" && (se = se.toString(o), (!o || o === "utf8") && (se = x.stripBOM(se))), ke.data = se;
          } catch (se) {
            return a(S.from(se, null, n, ke.request, ke));
          }
          un(i, a, ke);
        });
      }
      h.once("abort", (be) => {
        te.destroyed || (te.emit("error", be), te.destroy());
      });
    }), h.once("abort", (k) => {
      a(k), f.destroy(k);
    }), f.on("error", function(C) {
      a(S.from(C, null, n, f));
    }), f.on("socket", function(C) {
      C.setKeepAlive(!0, 1e3 * 60);
    }), n.timeout) {
      const k = parseInt(n.timeout, 10);
      if (Number.isNaN(k)) {
        a(new S(
          "error trying to parse `config.timeout` to int",
          S.ERR_BAD_OPTION_VALUE,
          n,
          f
        ));
        return;
      }
      f.setTimeout(k, function() {
        if (c) return;
        let F = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded";
        const Fe = n.transitional || ua;
        n.timeoutErrorMessage && (F = n.timeoutErrorMessage), a(new S(
          F,
          Fe.clarifyTimeoutError ? S.ETIMEDOUT : S.ECONNABORTED,
          n,
          f
        )), v();
      });
    }
    if (x.isStream(r)) {
      let k = !1, C = !1;
      r.on("end", () => {
        k = !0;
      }), r.once("error", (F) => {
        C = !0, f.destroy(F);
      }), r.on("close", () => {
        !k && !C && v(new Ke("Request stream has been aborted", n, f));
      }), r.pipe(f);
    } else
      f.end(r);
  });
}, kt = (e, n, t = 3) => {
  let i = 0;
  const a = Oo(50, 250);
  return Ro((s) => {
    const r = s.loaded, p = s.lengthComputable ? s.total : void 0, l = r - i, m = a(l), o = r <= p;
    i = r;
    const u = {
      loaded: r,
      total: p,
      progress: p ? r / p : void 0,
      bytes: l,
      rate: m || void 0,
      estimated: m && p && o ? (p - r) / m : void 0,
      event: s,
      lengthComputable: p != null
    };
    u[n ? "download" : "upload"] = !0, e(u);
  }, t);
}, gm = _e.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const n = /(msie|trident)/i.test(navigator.userAgent), t = document.createElement("a");
    let i;
    function a(s) {
      let r = s;
      return n && (t.setAttribute("href", r), r = t.href), t.setAttribute("href", r), {
        href: t.href,
        protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
        host: t.host,
        search: t.search ? t.search.replace(/^\?/, "") : "",
        hash: t.hash ? t.hash.replace(/^#/, "") : "",
        hostname: t.hostname,
        port: t.port,
        pathname: t.pathname.charAt(0) === "/" ? t.pathname : "/" + t.pathname
      };
    }
    return i = a(window.location.href), function(r) {
      const p = x.isString(r) ? a(r) : r;
      return p.protocol === i.protocol && p.host === i.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), bm = _e.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, n, t, i, a, s) {
      const r = [e + "=" + encodeURIComponent(n)];
      x.isNumber(t) && r.push("expires=" + new Date(t).toGMTString()), x.isString(i) && r.push("path=" + i), x.isString(a) && r.push("domain=" + a), s === !0 && r.push("secure"), document.cookie = r.join("; ");
    },
    read(e) {
      const n = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return n ? decodeURIComponent(n[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
), Es = (e) => e instanceof oe ? { ...e } : e;
function nn(e, n) {
  n = n || {};
  const t = {};
  function i(m, o, u) {
    return x.isPlainObject(m) && x.isPlainObject(o) ? x.merge.call({ caseless: u }, m, o) : x.isPlainObject(o) ? x.merge({}, o) : x.isArray(o) ? o.slice() : o;
  }
  function a(m, o, u) {
    if (x.isUndefined(o)) {
      if (!x.isUndefined(m))
        return i(void 0, m, u);
    } else return i(m, o, u);
  }
  function s(m, o) {
    if (!x.isUndefined(o))
      return i(void 0, o);
  }
  function r(m, o) {
    if (x.isUndefined(o)) {
      if (!x.isUndefined(m))
        return i(void 0, m);
    } else return i(void 0, o);
  }
  function p(m, o, u) {
    if (u in n)
      return i(m, o);
    if (u in e)
      return i(void 0, m);
  }
  const l = {
    url: s,
    method: s,
    data: s,
    baseURL: r,
    transformRequest: r,
    transformResponse: r,
    paramsSerializer: r,
    timeout: r,
    timeoutMessage: r,
    withCredentials: r,
    withXSRFToken: r,
    adapter: r,
    responseType: r,
    xsrfCookieName: r,
    xsrfHeaderName: r,
    onUploadProgress: r,
    onDownloadProgress: r,
    decompress: r,
    maxContentLength: r,
    maxBodyLength: r,
    beforeRedirect: r,
    transport: r,
    httpAgent: r,
    httpsAgent: r,
    cancelToken: r,
    socketPath: r,
    responseEncoding: r,
    validateStatus: p,
    headers: (m, o) => a(Es(m), Es(o), !0)
  };
  return x.forEach(Object.keys(Object.assign({}, e, n)), function(o) {
    const u = l[o] || a, c = u(e[o], n[o], o);
    x.isUndefined(c) && u !== p || (t[o] = c);
  }), t;
}
const Ao = (e) => {
  const n = nn({}, e);
  let { data: t, withXSRFToken: i, xsrfHeaderName: a, xsrfCookieName: s, headers: r, auth: p } = n;
  n.headers = r = oe.from(r), n.url = ca(la(n.baseURL, n.url), e.params, e.paramsSerializer), p && r.set(
    "Authorization",
    "Basic " + btoa((p.username || "") + ":" + (p.password ? unescape(encodeURIComponent(p.password)) : ""))
  );
  let l;
  if (x.isFormData(t)) {
    if (_e.hasStandardBrowserEnv || _e.hasStandardBrowserWebWorkerEnv)
      r.setContentType(void 0);
    else if ((l = r.getContentType()) !== !1) {
      const [m, ...o] = l ? l.split(";").map((u) => u.trim()).filter(Boolean) : [];
      r.setContentType([m || "multipart/form-data", ...o].join("; "));
    }
  }
  if (_e.hasStandardBrowserEnv && (i && x.isFunction(i) && (i = i(n)), i || i !== !1 && gm(n.url))) {
    const m = a && s && bm.read(s);
    m && r.set(a, m);
  }
  return n;
}, ym = typeof XMLHttpRequest < "u", wm = ym && function(e) {
  return new Promise(function(t, i) {
    const a = Ao(e);
    let s = a.data;
    const r = oe.from(a.headers).normalize();
    let { responseType: p } = a, l;
    function m() {
      a.cancelToken && a.cancelToken.unsubscribe(l), a.signal && a.signal.removeEventListener("abort", l);
    }
    let o = new XMLHttpRequest();
    o.open(a.method.toUpperCase(), a.url, !0), o.timeout = a.timeout;
    function u() {
      if (!o)
        return;
      const d = oe.from(
        "getAllResponseHeaders" in o && o.getAllResponseHeaders()
      ), h = {
        data: !p || p === "text" || p === "json" ? o.responseText : o.response,
        status: o.status,
        statusText: o.statusText,
        headers: d,
        config: e,
        request: o
      };
      un(function(v) {
        t(v), m();
      }, function(v) {
        i(v), m();
      }, h), o = null;
    }
    "onloadend" in o ? o.onloadend = u : o.onreadystatechange = function() {
      !o || o.readyState !== 4 || o.status === 0 && !(o.responseURL && o.responseURL.indexOf("file:") === 0) || setTimeout(u);
    }, o.onabort = function() {
      o && (i(new S("Request aborted", S.ECONNABORTED, a, o)), o = null);
    }, o.onerror = function() {
      i(new S("Network Error", S.ERR_NETWORK, a, o)), o = null;
    }, o.ontimeout = function() {
      let f = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded";
      const h = a.transitional || ua;
      a.timeoutErrorMessage && (f = a.timeoutErrorMessage), i(new S(
        f,
        h.clarifyTimeoutError ? S.ETIMEDOUT : S.ECONNABORTED,
        a,
        o
      )), o = null;
    }, s === void 0 && r.setContentType(null), "setRequestHeader" in o && x.forEach(r.toJSON(), function(f, h) {
      o.setRequestHeader(h, f);
    }), x.isUndefined(a.withCredentials) || (o.withCredentials = !!a.withCredentials), p && p !== "json" && (o.responseType = a.responseType), typeof a.onDownloadProgress == "function" && o.addEventListener("progress", kt(a.onDownloadProgress, !0)), typeof a.onUploadProgress == "function" && o.upload && o.upload.addEventListener("progress", kt(a.onUploadProgress)), (a.cancelToken || a.signal) && (l = (d) => {
      o && (i(!d || d.type ? new Ke(null, e, o) : d), o.abort(), o = null);
    }, a.cancelToken && a.cancelToken.subscribe(l), a.signal && (a.signal.aborted ? l() : a.signal.addEventListener("abort", l)));
    const c = To(a.url);
    if (c && _e.protocols.indexOf(c) === -1) {
      i(new S("Unsupported protocol " + c + ":", S.ERR_BAD_REQUEST, e));
      return;
    }
    o.send(s || null);
  });
}, _m = (e, n) => {
  let t = new AbortController(), i;
  const a = function(l) {
    if (!i) {
      i = !0, r();
      const m = l instanceof Error ? l : this.reason;
      t.abort(m instanceof S ? m : new Ke(m instanceof Error ? m.message : m));
    }
  };
  let s = n && setTimeout(() => {
    a(new S(`timeout ${n} of ms exceeded`, S.ETIMEDOUT));
  }, n);
  const r = () => {
    e && (s && clearTimeout(s), s = null, e.forEach((l) => {
      l && (l.removeEventListener ? l.removeEventListener("abort", a) : l.unsubscribe(a));
    }), e = null);
  };
  e.forEach((l) => l && l.addEventListener && l.addEventListener("abort", a));
  const { signal: p } = t;
  return p.unsubscribe = r, [p, () => {
    s && clearTimeout(s), s = null;
  }];
}, km = function* (e, n) {
  let t = e.byteLength;
  if (!n || t < n) {
    yield e;
    return;
  }
  let i = 0, a;
  for (; i < t; )
    a = i + n, yield e.slice(i, a), i = a;
}, Sm = async function* (e, n, t) {
  for await (const i of e)
    yield* km(ArrayBuffer.isView(i) ? i : await t(String(i)), n);
}, Ts = (e, n, t, i, a) => {
  const s = Sm(e, n, a);
  let r = 0;
  return new ReadableStream({
    type: "bytes",
    async pull(p) {
      const { done: l, value: m } = await s.next();
      if (l) {
        p.close(), i();
        return;
      }
      let o = m.byteLength;
      t && t(r += o), p.enqueue(new Uint8Array(m));
    },
    cancel(p) {
      return i(p), s.return();
    }
  }, {
    highWaterMark: 2
  });
}, Rs = (e, n) => {
  const t = e != null;
  return (i) => setTimeout(() => n({
    lengthComputable: t,
    total: e,
    loaded: i
  }));
}, Nt = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Po = Nt && typeof ReadableStream == "function", Pi = Nt && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (n) => e.encode(n))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Cm = Po && (() => {
  let e = !1;
  const n = new Request(_e.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !n;
})(), Os = 64 * 1024, Li = Po && !!(() => {
  try {
    return x.isReadableStream(new Response("").body);
  } catch {
  }
})(), St = {
  stream: Li && ((e) => e.body)
};
Nt && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((n) => {
    !St[n] && (St[n] = x.isFunction(e[n]) ? (t) => t[n]() : (t, i) => {
      throw new S(`Response type '${n}' is not supported`, S.ERR_NOT_SUPPORT, i);
    });
  });
})(new Response());
const Em = async (e) => {
  if (e == null)
    return 0;
  if (x.isBlob(e))
    return e.size;
  if (x.isSpecCompliantForm(e))
    return (await new Request(e).arrayBuffer()).byteLength;
  if (x.isArrayBufferView(e))
    return e.byteLength;
  if (x.isURLSearchParams(e) && (e = e + ""), x.isString(e))
    return (await Pi(e)).byteLength;
}, Tm = async (e, n) => {
  const t = x.toFiniteNumber(e.getContentLength());
  return t ?? Em(n);
}, Rm = Nt && (async (e) => {
  let {
    url: n,
    method: t,
    data: i,
    signal: a,
    cancelToken: s,
    timeout: r,
    onDownloadProgress: p,
    onUploadProgress: l,
    responseType: m,
    headers: o,
    withCredentials: u = "same-origin",
    fetchOptions: c
  } = Ao(e);
  m = m ? (m + "").toLowerCase() : "text";
  let [d, f] = a || s || r ? _m([a, s], r) : [], h, g;
  const v = () => {
    !h && setTimeout(() => {
      d && d.unsubscribe();
    }), h = !0;
  };
  let b;
  try {
    if (l && Cm && t !== "get" && t !== "head" && (b = await Tm(o, i)) !== 0) {
      let ee = new Request(n, {
        method: "POST",
        body: i,
        duplex: "half"
      }), M;
      x.isFormData(i) && (M = ee.headers.get("content-type")) && o.setContentType(M), ee.body && (i = Ts(ee.body, Os, Rs(
        b,
        kt(l)
      ), null, Pi));
    }
    x.isString(u) || (u = u ? "cors" : "omit"), g = new Request(n, {
      ...c,
      signal: d,
      method: t.toUpperCase(),
      headers: o.normalize().toJSON(),
      body: i,
      duplex: "half",
      withCredentials: u
    });
    let y = await fetch(g);
    const P = Li && (m === "stream" || m === "response");
    if (Li && (p || P)) {
      const ee = {};
      ["status", "statusText", "headers"].forEach((ne) => {
        ee[ne] = y[ne];
      });
      const M = x.toFiniteNumber(y.headers.get("content-length"));
      y = new Response(
        Ts(y.body, Os, p && Rs(
          M,
          kt(p, !0)
        ), P && v, Pi),
        ee
      );
    }
    m = m || "text";
    let L = await St[x.findKey(St, m) || "text"](y, e);
    return !P && v(), f && f(), await new Promise((ee, M) => {
      un(ee, M, {
        data: L,
        headers: oe.from(y.headers),
        status: y.status,
        statusText: y.statusText,
        config: e,
        request: g
      });
    });
  } catch (y) {
    throw v(), y && y.name === "TypeError" && /fetch/i.test(y.message) ? Object.assign(
      new S("Network Error", S.ERR_NETWORK, e, g),
      {
        cause: y.cause || y
      }
    ) : S.from(y, y && y.code, e, g);
  }
}), $i = {
  http: vm,
  xhr: wm,
  fetch: Rm
};
x.forEach($i, (e, n) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: n });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: n });
  }
});
const Fs = (e) => `- ${e}`, Om = (e) => x.isFunction(e) || e === null || e === !1, Lo = {
  getAdapter: (e) => {
    e = x.isArray(e) ? e : [e];
    const { length: n } = e;
    let t, i;
    const a = {};
    for (let s = 0; s < n; s++) {
      t = e[s];
      let r;
      if (i = t, !Om(t) && (i = $i[(r = String(t)).toLowerCase()], i === void 0))
        throw new S(`Unknown adapter '${r}'`);
      if (i)
        break;
      a[r || "#" + s] = i;
    }
    if (!i) {
      const s = Object.entries(a).map(
        ([p, l]) => `adapter ${p} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let r = n ? s.length > 1 ? `since :
` + s.map(Fs).join(`
`) : " " + Fs(s[0]) : "as no adapter specified";
      throw new S(
        "There is no suitable adapter to dispatch the request " + r,
        "ERR_NOT_SUPPORT"
      );
    }
    return i;
  },
  adapters: $i
};
function ci(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Ke(null, e);
}
function js(e) {
  return ci(e), e.headers = oe.from(e.headers), e.data = ti.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Lo.getAdapter(e.adapter || Gn.adapter)(e).then(function(i) {
    return ci(e), i.data = ti.call(
      e,
      e.transformResponse,
      i
    ), i.headers = oe.from(i.headers), i;
  }, function(i) {
    return wo(i) || (ci(e), i && i.response && (i.response.data = ti.call(
      e,
      e.transformResponse,
      i.response
    ), i.response.headers = oe.from(i.response.headers))), Promise.reject(i);
  });
}
const ya = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, n) => {
  ya[e] = function(i) {
    return typeof i === e || "a" + (n < 1 ? "n " : " ") + e;
  };
});
const As = {};
ya.transitional = function(n, t, i) {
  function a(s, r) {
    return "[Axios v" + _t + "] Transitional option '" + s + "'" + r + (i ? ". " + i : "");
  }
  return (s, r, p) => {
    if (n === !1)
      throw new S(
        a(r, " has been removed" + (t ? " in " + t : "")),
        S.ERR_DEPRECATED
      );
    return t && !As[r] && (As[r] = !0, console.warn(
      a(
        r,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), n ? n(s, r, p) : !0;
  };
};
function Fm(e, n, t) {
  if (typeof e != "object")
    throw new S("options must be an object", S.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(e);
  let a = i.length;
  for (; a-- > 0; ) {
    const s = i[a], r = n[s];
    if (r) {
      const p = e[s], l = p === void 0 || r(p, s, e);
      if (l !== !0)
        throw new S("option " + s + " must be " + l, S.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new S("Unknown option " + s, S.ERR_BAD_OPTION);
  }
}
const Di = {
  assertOptions: Fm,
  validators: ya
}, Ue = Di.validators;
class Ze {
  constructor(n) {
    this.defaults = n, this.interceptors = {
      request: new ls(),
      response: new ls()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(n, t) {
    try {
      return await this._request(n, t);
    } catch (i) {
      if (i instanceof Error) {
        let a;
        Error.captureStackTrace ? Error.captureStackTrace(a = {}) : a = new Error();
        const s = a.stack ? a.stack.replace(/^.+\n/, "") : "";
        try {
          i.stack ? s && !String(i.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + s) : i.stack = s;
        } catch {
        }
      }
      throw i;
    }
  }
  _request(n, t) {
    typeof n == "string" ? (t = t || {}, t.url = n) : t = n || {}, t = nn(this.defaults, t);
    const { transitional: i, paramsSerializer: a, headers: s } = t;
    i !== void 0 && Di.assertOptions(i, {
      silentJSONParsing: Ue.transitional(Ue.boolean),
      forcedJSONParsing: Ue.transitional(Ue.boolean),
      clarifyTimeoutError: Ue.transitional(Ue.boolean)
    }, !1), a != null && (x.isFunction(a) ? t.paramsSerializer = {
      serialize: a
    } : Di.assertOptions(a, {
      encode: Ue.function,
      serialize: Ue.function
    }, !0)), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let r = s && x.merge(
      s.common,
      s[t.method]
    );
    s && x.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (f) => {
        delete s[f];
      }
    ), t.headers = oe.concat(r, s);
    const p = [];
    let l = !0;
    this.interceptors.request.forEach(function(h) {
      typeof h.runWhen == "function" && h.runWhen(t) === !1 || (l = l && h.synchronous, p.unshift(h.fulfilled, h.rejected));
    });
    const m = [];
    this.interceptors.response.forEach(function(h) {
      m.push(h.fulfilled, h.rejected);
    });
    let o, u = 0, c;
    if (!l) {
      const f = [js.bind(this), void 0];
      for (f.unshift.apply(f, p), f.push.apply(f, m), c = f.length, o = Promise.resolve(t); u < c; )
        o = o.then(f[u++], f[u++]);
      return o;
    }
    c = p.length;
    let d = t;
    for (u = 0; u < c; ) {
      const f = p[u++], h = p[u++];
      try {
        d = f(d);
      } catch (g) {
        h.call(this, g);
        break;
      }
    }
    try {
      o = js.call(this, d);
    } catch (f) {
      return Promise.reject(f);
    }
    for (u = 0, c = m.length; u < c; )
      o = o.then(m[u++], m[u++]);
    return o;
  }
  getUri(n) {
    n = nn(this.defaults, n);
    const t = la(n.baseURL, n.url);
    return ca(t, n.params, n.paramsSerializer);
  }
}
x.forEach(["delete", "get", "head", "options"], function(n) {
  Ze.prototype[n] = function(t, i) {
    return this.request(nn(i || {}, {
      method: n,
      url: t,
      data: (i || {}).data
    }));
  };
});
x.forEach(["post", "put", "patch"], function(n) {
  function t(i) {
    return function(s, r, p) {
      return this.request(nn(p || {}, {
        method: n,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: r
      }));
    };
  }
  Ze.prototype[n] = t(), Ze.prototype[n + "Form"] = t(!0);
});
class wa {
  constructor(n) {
    if (typeof n != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(s) {
      t = s;
    });
    const i = this;
    this.promise.then((a) => {
      if (!i._listeners) return;
      let s = i._listeners.length;
      for (; s-- > 0; )
        i._listeners[s](a);
      i._listeners = null;
    }), this.promise.then = (a) => {
      let s;
      const r = new Promise((p) => {
        i.subscribe(p), s = p;
      }).then(a);
      return r.cancel = function() {
        i.unsubscribe(s);
      }, r;
    }, n(function(s, r, p) {
      i.reason || (i.reason = new Ke(s, r, p), t(i.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(n) {
    if (this.reason) {
      n(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(n) : this._listeners = [n];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(n) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(n);
    t !== -1 && this._listeners.splice(t, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let n;
    return {
      token: new wa(function(a) {
        n = a;
      }),
      cancel: n
    };
  }
}
function jm(e) {
  return function(t) {
    return e.apply(null, t);
  };
}
function Am(e) {
  return x.isObject(e) && e.isAxiosError === !0;
}
const Ni = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Ni).forEach(([e, n]) => {
  Ni[n] = e;
});
function $o(e) {
  const n = new Ze(e), t = Vr(Ze.prototype.request, n);
  return x.extend(t, Ze.prototype, n, { allOwnKeys: !0 }), x.extend(t, n, null, { allOwnKeys: !0 }), t.create = function(a) {
    return $o(nn(e, a));
  }, t;
}
const X = $o(Gn);
X.Axios = Ze;
X.CanceledError = Ke;
X.CancelToken = wa;
X.isCancel = wo;
X.VERSION = _t;
X.toFormData = Dt;
X.AxiosError = S;
X.Cancel = X.CanceledError;
X.all = function(n) {
  return Promise.all(n);
};
X.spread = jm;
X.isAxiosError = Am;
X.mergeConfig = nn;
X.AxiosHeaders = oe;
X.formToJSON = (e) => yo(x.isHTMLForm(e) ? new FormData(e) : e);
X.getAdapter = Lo.getAdapter;
X.HttpStatusCode = Ni;
X.default = X;
var Bi = {}, Do = {}, Ii = { exports: {} }, at = { exports: {} }, ui, Ps;
function Pm() {
  if (Ps) return ui;
  Ps = 1;
  var e = 1e3, n = e * 60, t = n * 60, i = t * 24, a = i * 7, s = i * 365.25;
  ui = function(o, u) {
    u = u || {};
    var c = typeof o;
    if (c === "string" && o.length > 0)
      return r(o);
    if (c === "number" && isFinite(o))
      return u.long ? l(o) : p(o);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(o)
    );
  };
  function r(o) {
    if (o = String(o), !(o.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        o
      );
      if (u) {
        var c = parseFloat(u[1]), d = (u[2] || "ms").toLowerCase();
        switch (d) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return c * s;
          case "weeks":
          case "week":
          case "w":
            return c * a;
          case "days":
          case "day":
          case "d":
            return c * i;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return c * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return c * n;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return c * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return c;
          default:
            return;
        }
      }
    }
  }
  function p(o) {
    var u = Math.abs(o);
    return u >= i ? Math.round(o / i) + "d" : u >= t ? Math.round(o / t) + "h" : u >= n ? Math.round(o / n) + "m" : u >= e ? Math.round(o / e) + "s" : o + "ms";
  }
  function l(o) {
    var u = Math.abs(o);
    return u >= i ? m(o, u, i, "day") : u >= t ? m(o, u, t, "hour") : u >= n ? m(o, u, n, "minute") : u >= e ? m(o, u, e, "second") : o + " ms";
  }
  function m(o, u, c, d) {
    var f = u >= c * 1.5;
    return Math.round(o / c) + " " + d + (f ? "s" : "");
  }
  return ui;
}
var pi, Ls;
function No() {
  if (Ls) return pi;
  Ls = 1;
  function e(n) {
    i.debug = i, i.default = i, i.coerce = m, i.disable = r, i.enable = s, i.enabled = p, i.humanize = Pm(), i.destroy = o, Object.keys(n).forEach((u) => {
      i[u] = n[u];
    }), i.names = [], i.skips = [], i.formatters = {};
    function t(u) {
      let c = 0;
      for (let d = 0; d < u.length; d++)
        c = (c << 5) - c + u.charCodeAt(d), c |= 0;
      return i.colors[Math.abs(c) % i.colors.length];
    }
    i.selectColor = t;
    function i(u) {
      let c, d = null, f, h;
      function g(...v) {
        if (!g.enabled)
          return;
        const b = g, y = Number(/* @__PURE__ */ new Date()), P = y - (c || y);
        b.diff = P, b.prev = c, b.curr = y, c = y, v[0] = i.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let L = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (M, ne) => {
          if (M === "%%")
            return "%";
          L++;
          const E = i.formatters[ne];
          if (typeof E == "function") {
            const A = v[L];
            M = E.call(b, A), v.splice(L, 1), L--;
          }
          return M;
        }), i.formatArgs.call(b, v), (b.log || i.log).apply(b, v);
      }
      return g.namespace = u, g.useColors = i.useColors(), g.color = i.selectColor(u), g.extend = a, g.destroy = i.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => d !== null ? d : (f !== i.namespaces && (f = i.namespaces, h = i.enabled(u)), h),
        set: (v) => {
          d = v;
        }
      }), typeof i.init == "function" && i.init(g), g;
    }
    function a(u, c) {
      const d = i(this.namespace + (typeof c > "u" ? ":" : c) + u);
      return d.log = this.log, d;
    }
    function s(u) {
      i.save(u), i.namespaces = u, i.names = [], i.skips = [];
      let c;
      const d = (typeof u == "string" ? u : "").split(/[\s,]+/), f = d.length;
      for (c = 0; c < f; c++)
        d[c] && (u = d[c].replace(/\*/g, ".*?"), u[0] === "-" ? i.skips.push(new RegExp("^" + u.slice(1) + "$")) : i.names.push(new RegExp("^" + u + "$")));
    }
    function r() {
      const u = [
        ...i.names.map(l),
        ...i.skips.map(l).map((c) => "-" + c)
      ].join(",");
      return i.enable(""), u;
    }
    function p(u) {
      if (u[u.length - 1] === "*")
        return !0;
      let c, d;
      for (c = 0, d = i.skips.length; c < d; c++)
        if (i.skips[c].test(u))
          return !1;
      for (c = 0, d = i.names.length; c < d; c++)
        if (i.names[c].test(u))
          return !0;
      return !1;
    }
    function l(u) {
      return u.toString().substring(2, u.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function m(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function o() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return i.enable(i.load()), i;
  }
  return pi = e, pi;
}
var $s;
function Lm() {
  return $s || ($s = 1, function(e, n) {
    n.formatArgs = i, n.save = a, n.load = s, n.useColors = t, n.storage = r(), n.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), n.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function t() {
      return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function i(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const m = "color: " + this.color;
      l.splice(1, 0, m, "color: inherit");
      let o = 0, u = 0;
      l[0].replace(/%[a-zA-Z%]/g, (c) => {
        c !== "%%" && (o++, c === "%c" && (u = o));
      }), l.splice(u, 0, m);
    }
    n.log = console.debug || console.log || (() => {
    });
    function a(l) {
      try {
        l ? n.storage.setItem("debug", l) : n.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let l;
      try {
        l = n.storage.getItem("debug");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function r() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = No()(n);
    const { formatters: p } = e.exports;
    p.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
  }(at, at.exports)), at.exports;
}
var st = { exports: {} }, li, Ds;
function $m() {
  return Ds || (Ds = 1, li = (e, n = process.argv) => {
    const t = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", i = n.indexOf(t + e), a = n.indexOf("--");
    return i !== -1 && (a === -1 || i < a);
  }), li;
}
var di, Ns;
function Bo() {
  if (Ns) return di;
  Ns = 1;
  const e = Jr, n = jt, t = $m(), { env: i } = process;
  let a;
  t("no-color") || t("no-colors") || t("color=false") || t("color=never") ? a = 0 : (t("color") || t("colors") || t("color=true") || t("color=always")) && (a = 1), "FORCE_COLOR" in i && (i.FORCE_COLOR === "true" ? a = 1 : i.FORCE_COLOR === "false" ? a = 0 : a = i.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(i.FORCE_COLOR, 10), 3));
  function s(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function r(l, m) {
    if (a === 0)
      return 0;
    if (t("color=16m") || t("color=full") || t("color=truecolor"))
      return 3;
    if (t("color=256"))
      return 2;
    if (l && !m && a === void 0)
      return 0;
    const o = a || 0;
    if (i.TERM === "dumb")
      return o;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in i)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in i) || i.CI_NAME === "codeship" ? 1 : o;
    if ("TEAMCITY_VERSION" in i)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(i.TEAMCITY_VERSION) ? 1 : 0;
    if (i.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in i) {
      const u = parseInt((i.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (i.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(i.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(i.TERM) || "COLORTERM" in i ? 1 : o;
  }
  function p(l) {
    const m = r(l, l && l.isTTY);
    return s(m);
  }
  return di = {
    supportsColor: p,
    stdout: s(r(!0, n.isatty(1))),
    stderr: s(r(!0, n.isatty(2)))
  }, di;
}
var Bs;
function Dm() {
  return Bs || (Bs = 1, function(e, n) {
    const t = jt, i = ze;
    n.init = o, n.log = p, n.formatArgs = s, n.save = l, n.load = m, n.useColors = a, n.destroy = i.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), n.colors = [6, 2, 3, 4, 5, 1];
    try {
      const c = Bo();
      c && (c.stderr || c).level >= 2 && (n.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    n.inspectOpts = Object.keys(process.env).filter((c) => /^debug_/i.test(c)).reduce((c, d) => {
      const f = d.substring(6).toLowerCase().replace(/_([a-z])/g, (g, v) => v.toUpperCase());
      let h = process.env[d];
      return /^(yes|on|true|enabled)$/i.test(h) ? h = !0 : /^(no|off|false|disabled)$/i.test(h) ? h = !1 : h === "null" ? h = null : h = Number(h), c[f] = h, c;
    }, {});
    function a() {
      return "colors" in n.inspectOpts ? !!n.inspectOpts.colors : t.isatty(process.stderr.fd);
    }
    function s(c) {
      const { namespace: d, useColors: f } = this;
      if (f) {
        const h = this.color, g = "\x1B[3" + (h < 8 ? h : "8;5;" + h), v = `  ${g};1m${d} \x1B[0m`;
        c[0] = v + c[0].split(`
`).join(`
` + v), c.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        c[0] = r() + d + " " + c[0];
    }
    function r() {
      return n.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function p(...c) {
      return process.stderr.write(i.formatWithOptions(n.inspectOpts, ...c) + `
`);
    }
    function l(c) {
      c ? process.env.DEBUG = c : delete process.env.DEBUG;
    }
    function m() {
      return process.env.DEBUG;
    }
    function o(c) {
      c.inspectOpts = {};
      const d = Object.keys(n.inspectOpts);
      for (let f = 0; f < d.length; f++)
        c.inspectOpts[d[f]] = n.inspectOpts[d[f]];
    }
    e.exports = No()(n);
    const { formatters: u } = e.exports;
    u.o = function(c) {
      return this.inspectOpts.colors = this.useColors, i.inspect(c, this.inspectOpts).split(`
`).map((d) => d.trim()).join(" ");
    }, u.O = function(c) {
      return this.inspectOpts.colors = this.useColors, i.inspect(c, this.inspectOpts);
    };
  }(st, st.exports)), st.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Ii.exports = Lm() : Ii.exports = Dm();
var Nm = Ii.exports;
(function(e) {
  var n = An && An.__importDefault || function(p) {
    return p && p.__esModule ? p : { default: p };
  };
  Object.defineProperty(e, "__esModule", { value: !0 });
  const t = Te, a = n(Nm).default("@kwsites/file-exists");
  function s(p, l, m) {
    a("checking %s", p);
    try {
      const o = t.statSync(p);
      return o.isFile() && l ? (a("[OK] path represents a file"), !0) : o.isDirectory() && m ? (a("[OK] path represents a directory"), !0) : (a("[FAIL] path represents something other than a file or directory"), !1);
    } catch (o) {
      if (o.code === "ENOENT")
        return a("[FAIL] path is not accessible: %o", o), !1;
      throw a("[FATAL] %o", o), o;
    }
  }
  function r(p, l = e.READABLE) {
    return s(p, (l & e.FILE) > 0, (l & e.FOLDER) > 0);
  }
  e.exists = r, e.FILE = 1, e.FOLDER = 2, e.READABLE = e.FILE + e.FOLDER;
})(Do);
(function(e) {
  function n(t) {
    for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i]);
  }
  Object.defineProperty(e, "__esModule", { value: !0 }), n(Do);
})(Bi);
var qi = { exports: {} }, rt = { exports: {} }, mi, Is;
function Bm() {
  if (Is) return mi;
  Is = 1;
  var e = 1e3, n = e * 60, t = n * 60, i = t * 24, a = i * 7, s = i * 365.25;
  mi = function(o, u) {
    u = u || {};
    var c = typeof o;
    if (c === "string" && o.length > 0)
      return r(o);
    if (c === "number" && isFinite(o))
      return u.long ? l(o) : p(o);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(o)
    );
  };
  function r(o) {
    if (o = String(o), !(o.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        o
      );
      if (u) {
        var c = parseFloat(u[1]), d = (u[2] || "ms").toLowerCase();
        switch (d) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return c * s;
          case "weeks":
          case "week":
          case "w":
            return c * a;
          case "days":
          case "day":
          case "d":
            return c * i;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return c * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return c * n;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return c * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return c;
          default:
            return;
        }
      }
    }
  }
  function p(o) {
    var u = Math.abs(o);
    return u >= i ? Math.round(o / i) + "d" : u >= t ? Math.round(o / t) + "h" : u >= n ? Math.round(o / n) + "m" : u >= e ? Math.round(o / e) + "s" : o + "ms";
  }
  function l(o) {
    var u = Math.abs(o);
    return u >= i ? m(o, u, i, "day") : u >= t ? m(o, u, t, "hour") : u >= n ? m(o, u, n, "minute") : u >= e ? m(o, u, e, "second") : o + " ms";
  }
  function m(o, u, c, d) {
    var f = u >= c * 1.5;
    return Math.round(o / c) + " " + d + (f ? "s" : "");
  }
  return mi;
}
var fi, qs;
function Io() {
  if (qs) return fi;
  qs = 1;
  function e(n) {
    i.debug = i, i.default = i, i.coerce = m, i.disable = r, i.enable = s, i.enabled = p, i.humanize = Bm(), i.destroy = o, Object.keys(n).forEach((u) => {
      i[u] = n[u];
    }), i.names = [], i.skips = [], i.formatters = {};
    function t(u) {
      let c = 0;
      for (let d = 0; d < u.length; d++)
        c = (c << 5) - c + u.charCodeAt(d), c |= 0;
      return i.colors[Math.abs(c) % i.colors.length];
    }
    i.selectColor = t;
    function i(u) {
      let c, d = null, f, h;
      function g(...v) {
        if (!g.enabled)
          return;
        const b = g, y = Number(/* @__PURE__ */ new Date()), P = y - (c || y);
        b.diff = P, b.prev = c, b.curr = y, c = y, v[0] = i.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let L = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (M, ne) => {
          if (M === "%%")
            return "%";
          L++;
          const E = i.formatters[ne];
          if (typeof E == "function") {
            const A = v[L];
            M = E.call(b, A), v.splice(L, 1), L--;
          }
          return M;
        }), i.formatArgs.call(b, v), (b.log || i.log).apply(b, v);
      }
      return g.namespace = u, g.useColors = i.useColors(), g.color = i.selectColor(u), g.extend = a, g.destroy = i.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => d !== null ? d : (f !== i.namespaces && (f = i.namespaces, h = i.enabled(u)), h),
        set: (v) => {
          d = v;
        }
      }), typeof i.init == "function" && i.init(g), g;
    }
    function a(u, c) {
      const d = i(this.namespace + (typeof c > "u" ? ":" : c) + u);
      return d.log = this.log, d;
    }
    function s(u) {
      i.save(u), i.namespaces = u, i.names = [], i.skips = [];
      let c;
      const d = (typeof u == "string" ? u : "").split(/[\s,]+/), f = d.length;
      for (c = 0; c < f; c++)
        d[c] && (u = d[c].replace(/\*/g, ".*?"), u[0] === "-" ? i.skips.push(new RegExp("^" + u.slice(1) + "$")) : i.names.push(new RegExp("^" + u + "$")));
    }
    function r() {
      const u = [
        ...i.names.map(l),
        ...i.skips.map(l).map((c) => "-" + c)
      ].join(",");
      return i.enable(""), u;
    }
    function p(u) {
      if (u[u.length - 1] === "*")
        return !0;
      let c, d;
      for (c = 0, d = i.skips.length; c < d; c++)
        if (i.skips[c].test(u))
          return !1;
      for (c = 0, d = i.names.length; c < d; c++)
        if (i.names[c].test(u))
          return !0;
      return !1;
    }
    function l(u) {
      return u.toString().substring(2, u.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function m(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function o() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return i.enable(i.load()), i;
  }
  return fi = e, fi;
}
var zs;
function Im() {
  return zs || (zs = 1, function(e, n) {
    n.formatArgs = i, n.save = a, n.load = s, n.useColors = t, n.storage = r(), n.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), n.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function t() {
      return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function i(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const m = "color: " + this.color;
      l.splice(1, 0, m, "color: inherit");
      let o = 0, u = 0;
      l[0].replace(/%[a-zA-Z%]/g, (c) => {
        c !== "%%" && (o++, c === "%c" && (u = o));
      }), l.splice(u, 0, m);
    }
    n.log = console.debug || console.log || (() => {
    });
    function a(l) {
      try {
        l ? n.storage.setItem("debug", l) : n.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let l;
      try {
        l = n.storage.getItem("debug");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function r() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Io()(n);
    const { formatters: p } = e.exports;
    p.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
  }(rt, rt.exports)), rt.exports;
}
var ot = { exports: {} }, Us;
function qm() {
  return Us || (Us = 1, function(e, n) {
    const t = jt, i = ze;
    n.init = o, n.log = p, n.formatArgs = s, n.save = l, n.load = m, n.useColors = a, n.destroy = i.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), n.colors = [6, 2, 3, 4, 5, 1];
    try {
      const c = Bo();
      c && (c.stderr || c).level >= 2 && (n.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    n.inspectOpts = Object.keys(process.env).filter((c) => /^debug_/i.test(c)).reduce((c, d) => {
      const f = d.substring(6).toLowerCase().replace(/_([a-z])/g, (g, v) => v.toUpperCase());
      let h = process.env[d];
      return /^(yes|on|true|enabled)$/i.test(h) ? h = !0 : /^(no|off|false|disabled)$/i.test(h) ? h = !1 : h === "null" ? h = null : h = Number(h), c[f] = h, c;
    }, {});
    function a() {
      return "colors" in n.inspectOpts ? !!n.inspectOpts.colors : t.isatty(process.stderr.fd);
    }
    function s(c) {
      const { namespace: d, useColors: f } = this;
      if (f) {
        const h = this.color, g = "\x1B[3" + (h < 8 ? h : "8;5;" + h), v = `  ${g};1m${d} \x1B[0m`;
        c[0] = v + c[0].split(`
`).join(`
` + v), c.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        c[0] = r() + d + " " + c[0];
    }
    function r() {
      return n.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function p(...c) {
      return process.stderr.write(i.formatWithOptions(n.inspectOpts, ...c) + `
`);
    }
    function l(c) {
      c ? process.env.DEBUG = c : delete process.env.DEBUG;
    }
    function m() {
      return process.env.DEBUG;
    }
    function o(c) {
      c.inspectOpts = {};
      const d = Object.keys(n.inspectOpts);
      for (let f = 0; f < d.length; f++)
        c.inspectOpts[d[f]] = n.inspectOpts[d[f]];
    }
    e.exports = Io()(n);
    const { formatters: u } = e.exports;
    u.o = function(c) {
      return this.inspectOpts.colors = this.useColors, i.inspect(c, this.inspectOpts).split(`
`).map((d) => d.trim()).join(" ");
    }, u.O = function(c) {
      return this.inspectOpts.colors = this.useColors, i.inspect(c, this.inspectOpts);
    };
  }(ot, ot.exports)), ot.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? qi.exports = Im() : qi.exports = qm();
var zm = qi.exports;
const zi = /* @__PURE__ */ bn(zm);
var fn = {};
Object.defineProperty(fn, "__esModule", { value: !0 });
var qo = fn.createDeferred = ln = fn.deferred = void 0;
function _a() {
  let e, n, t = "pending";
  return {
    promise: new Promise((a, s) => {
      e = a, n = s;
    }),
    done(a) {
      t === "pending" && (t = "resolved", e(a));
    },
    fail(a) {
      t === "pending" && (t = "rejected", n(a));
    },
    get fulfilled() {
      return t !== "pending";
    },
    get status() {
      return t;
    }
  };
}
var ln = fn.deferred = _a;
qo = fn.createDeferred = _a;
fn.default = _a;
var Bt = Object.defineProperty, Um = Object.defineProperties, Mm = Object.getOwnPropertyDescriptor, Gm = Object.getOwnPropertyDescriptors, ka = Object.getOwnPropertyNames, Ms = Object.getOwnPropertySymbols, zo = Object.prototype.hasOwnProperty, Hm = Object.prototype.propertyIsEnumerable, Gs = (e, n, t) => n in e ? Bt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Se = (e, n) => {
  for (var t in n || (n = {}))
    zo.call(n, t) && Gs(e, t, n[t]);
  if (Ms)
    for (var t of Ms(n))
      Hm.call(n, t) && Gs(e, t, n[t]);
  return e;
}, On = (e, n) => Um(e, Gm(n)), _ = (e, n) => function() {
  return e && (n = (0, e[ka(e)[0]])(e = 0)), n;
}, Wm = (e, n) => function() {
  return n || (0, e[ka(e)[0]])((n = { exports: {} }).exports, n), n.exports;
}, Z = (e, n) => {
  for (var t in n)
    Bt(e, t, { get: n[t], enumerable: !0 });
}, Jm = (e, n, t, i) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let a of ka(n))
      !zo.call(e, a) && a !== t && Bt(e, a, { get: () => n[a], enumerable: !(i = Mm(n, a)) || i.enumerable });
  return e;
}, V = (e) => Jm(Bt({}, "__esModule", { value: !0 }), e), Rn = (e, n, t) => new Promise((i, a) => {
  var s = (l) => {
    try {
      p(t.next(l));
    } catch (m) {
      a(m);
    }
  }, r = (l) => {
    try {
      p(t.throw(l));
    } catch (m) {
      a(m);
    }
  }, p = (l) => l.done ? i(l.value) : Promise.resolve(l.value).then(s, r);
  p((t = t.apply(e, n)).next());
});
function Vm(...e) {
  const n = new String(e);
  return It.set(n, e), n;
}
function Ct(e) {
  return e instanceof String && It.has(e);
}
function Hs(e) {
  return It.get(e) || [];
}
var It, Jn = _({
  "src/lib/args/pathspec.ts"() {
    It = /* @__PURE__ */ new WeakMap();
  }
}), Ie, Ye = _({
  "src/lib/errors/git-error.ts"() {
    Ie = class extends Error {
      constructor(e, n) {
        super(n), this.task = e, Object.setPrototypeOf(this, new.target.prototype);
      }
    };
  }
}), Vn, yn = _({
  "src/lib/errors/git-response-error.ts"() {
    Ye(), Vn = class extends Ie {
      constructor(e, n) {
        super(void 0, n || String(e)), this.git = e;
      }
    };
  }
}), Uo, Mo = _({
  "src/lib/errors/task-configuration-error.ts"() {
    Ye(), Uo = class extends Ie {
      constructor(e) {
        super(void 0, e);
      }
    };
  }
});
function Go(e) {
  return typeof e == "function" ? e : sn;
}
function Ho(e) {
  return typeof e == "function" && e !== sn;
}
function Wo(e, n) {
  const t = e.indexOf(n);
  return t <= 0 ? [e, ""] : [e.substr(0, t), e.substr(t + 1)];
}
function Jo(e, n = 0) {
  return Vo(e) && e.length > n ? e[n] : void 0;
}
function tn(e, n = 0) {
  if (Vo(e) && e.length > n)
    return e[e.length - 1 - n];
}
function Vo(e) {
  return !!(e && typeof e.length == "number");
}
function Kn(e = "", n = !0, t = `
`) {
  return e.split(t).reduce((i, a) => {
    const s = n ? a.trim() : a;
    return s && i.push(s), i;
  }, []);
}
function Sa(e, n) {
  return Kn(e, !0).map((t) => n(t));
}
function Ca(e) {
  return Bi.exists(e, Bi.FOLDER);
}
function B(e, n) {
  return Array.isArray(e) ? e.includes(n) || e.push(n) : e.add(n), n;
}
function Ko(e, n) {
  return Array.isArray(e) && !e.includes(n) && e.push(n), e;
}
function qt(e, n) {
  if (Array.isArray(e)) {
    const t = e.indexOf(n);
    t >= 0 && e.splice(t, 1);
  } else
    e.delete(n);
  return n;
}
function Le(e) {
  return Array.isArray(e) ? e : [e];
}
function Yo(e) {
  return e.replace(/[\s-]+(.)/g, (n, t) => t.toUpperCase());
}
function Xo(e) {
  return Le(e).map(String);
}
function H(e, n = 0) {
  if (e == null)
    return n;
  const t = parseInt(e, 10);
  return isNaN(t) ? n : t;
}
function Dn(e, n) {
  const t = [];
  for (let i = 0, a = e.length; i < a; i++)
    t.push(n, e[i]);
  return t;
}
function Nn(e) {
  return (Array.isArray(e) ? Buffer.concat(e) : e).toString("utf-8");
}
function Qo(e, n) {
  return Object.assign(
    {},
    ...n.map((t) => t in e ? { [t]: e[t] } : {})
  );
}
function Ui(e = 0) {
  return new Promise((n) => setTimeout(n, e));
}
function Zo(e) {
  if (e !== !1)
    return e;
}
var hn, sn, Yn, zt = _({
  "src/lib/utils/util.ts"() {
    hn = "\0", sn = () => {
    }, Yn = Object.prototype.toString.call.bind(Object.prototype.toString);
  }
});
function $e(e, n, t) {
  return n(e) ? e : arguments.length > 2 ? t : void 0;
}
function Ea(e, n) {
  const t = Ct(e) ? "string" : typeof e;
  return /number|string|boolean/.test(t) && (!n || !n.includes(t));
}
function Ta(e) {
  return !!e && Yn(e) === "[object Object]";
}
function ec(e) {
  return typeof e == "function";
}
var Xn, ue, nc, Et, Ra, tc = _({
  "src/lib/utils/argument-filters.ts"() {
    zt(), Jn(), Xn = (e) => Array.isArray(e), ue = (e) => typeof e == "string", nc = (e) => Array.isArray(e) && e.every(ue), Et = (e) => ue(e) || Array.isArray(e) && e.every(ue), Ra = (e) => e == null || "number|boolean|function".includes(typeof e) ? !1 : Array.isArray(e) || typeof e == "string" || typeof e.length == "number";
  }
}), Mi, Km = _({
  "src/lib/utils/exit-codes.ts"() {
    Mi = /* @__PURE__ */ ((e) => (e[e.SUCCESS = 0] = "SUCCESS", e[e.ERROR = 1] = "ERROR", e[e.NOT_FOUND = -2] = "NOT_FOUND", e[e.UNCLEAN = 128] = "UNCLEAN", e))(Mi || {});
  }
}), Bn, Ym = _({
  "src/lib/utils/git-output-streams.ts"() {
    Bn = class {
      constructor(e, n) {
        this.stdOut = e, this.stdErr = n;
      }
      asStrings() {
        return new Bn(this.stdOut.toString("utf8"), this.stdErr.toString("utf8"));
      }
    };
  }
}), j, Ve, Xm = _({
  "src/lib/utils/line-parser.ts"() {
    j = class {
      constructor(e, n) {
        this.matches = [], this.parse = (t, i) => (this.resetMatches(), this._regExp.every((a, s) => this.addMatch(a, s, t(s))) ? this.useMatches(i, this.prepareMatches()) !== !1 : !1), this._regExp = Array.isArray(e) ? e : [e], n && (this.useMatches = n);
      }
      useMatches(e, n) {
        throw new Error("LineParser:useMatches not implemented");
      }
      resetMatches() {
        this.matches.length = 0;
      }
      prepareMatches() {
        return this.matches;
      }
      addMatch(e, n, t) {
        const i = t && e.exec(t);
        return i && this.pushMatch(n, i), !!i;
      }
      pushMatch(e, n) {
        this.matches.push(...n.slice(1));
      }
    }, Ve = class extends j {
      addMatch(e, n, t) {
        return /^remote:\s/.test(String(t)) && super.addMatch(e, n, t);
      }
      pushMatch(e, n) {
        (e > 0 || n.length > 1) && super.pushMatch(e, n);
      }
    };
  }
});
function ic(...e) {
  const n = process.cwd(), t = Object.assign(
    Se({ baseDir: n }, ac),
    ...e.filter((i) => typeof i == "object" && i)
  );
  return t.baseDir = t.baseDir || n, t.trimmed = t.trimmed === !0, t;
}
var ac, Qm = _({
  "src/lib/utils/simple-git-options.ts"() {
    ac = {
      binary: "git",
      maxConcurrentProcesses: 5,
      config: [],
      trimmed: !1
    };
  }
});
function Oa(e, n = []) {
  return Ta(e) ? Object.keys(e).reduce((t, i) => {
    const a = e[i];
    return Ct(a) ? t.push(a) : Ea(a, ["boolean"]) ? t.push(i + "=" + a) : t.push(i), t;
  }, n) : n;
}
function he(e, n = 0, t = !1) {
  const i = [];
  for (let a = 0, s = n < 0 ? e.length : n; a < s; a++)
    "string|number".includes(typeof e[a]) && i.push(String(e[a]));
  return Oa(Fa(e), i), t || i.push(...Zm(e)), i;
}
function Zm(e) {
  const n = typeof tn(e) == "function";
  return $e(tn(e, n ? 1 : 0), Xn, []);
}
function Fa(e) {
  const n = ec(tn(e));
  return $e(tn(e, n ? 1 : 0), Ta);
}
function K(e, n = !0) {
  const t = Go(tn(e));
  return n || Ho(t) ? t : void 0;
}
var ef = _({
  "src/lib/utils/task-options.ts"() {
    tc(), zt(), Jn();
  }
});
function Gi(e, n) {
  return e(n.stdOut, n.stdErr);
}
function ge(e, n, t, i = !0) {
  return Le(t).forEach((a) => {
    for (let s = Kn(a, i), r = 0, p = s.length; r < p; r++) {
      const l = (m = 0) => {
        if (!(r + m >= p))
          return s[r + m];
      };
      n.some(({ parse: m }) => m(l, e));
    }
  }), e;
}
var nf = _({
  "src/lib/utils/task-parser.ts"() {
    zt();
  }
}), sc = {};
Z(sc, {
  ExitCodes: () => Mi,
  GitOutputStreams: () => Bn,
  LineParser: () => j,
  NOOP: () => sn,
  NULL: () => hn,
  RemoteLineParser: () => Ve,
  append: () => B,
  appendTaskOptions: () => Oa,
  asArray: () => Le,
  asCamelCase: () => Yo,
  asFunction: () => Go,
  asNumber: () => H,
  asStringArray: () => Xo,
  bufferToString: () => Nn,
  callTaskParser: () => Gi,
  createInstanceConfig: () => ic,
  delay: () => Ui,
  filterArray: () => Xn,
  filterFunction: () => ec,
  filterHasLength: () => Ra,
  filterPlainObject: () => Ta,
  filterPrimitives: () => Ea,
  filterString: () => ue,
  filterStringArray: () => nc,
  filterStringOrStringArray: () => Et,
  filterType: () => $e,
  first: () => Jo,
  folderExists: () => Ca,
  forEachLineWithContent: () => Sa,
  getTrailingOptions: () => he,
  including: () => Ko,
  isUserFunction: () => Ho,
  last: () => tn,
  objectToString: () => Yn,
  orVoid: () => Zo,
  parseStringResponse: () => ge,
  pick: () => Qo,
  prefixedArray: () => Dn,
  remove: () => qt,
  splitOn: () => Wo,
  toLinesWithContent: () => Kn,
  trailingFunctionArgument: () => K,
  trailingOptionsArgument: () => Fa
});
var O = _({
  "src/lib/utils/index.ts"() {
    tc(), Km(), Ym(), Xm(), Qm(), ef(), nf(), zt();
  }
}), rc = {};
Z(rc, {
  CheckRepoActions: () => Hi,
  checkIsBareRepoTask: () => cc,
  checkIsRepoRootTask: () => oc,
  checkIsRepoTask: () => tf
});
function tf(e) {
  switch (e) {
    case "bare":
      return cc();
    case "root":
      return oc();
  }
  return {
    commands: ["rev-parse", "--is-inside-work-tree"],
    format: "utf-8",
    onError: Ut,
    parser: ja
  };
}
function oc() {
  return {
    commands: ["rev-parse", "--git-dir"],
    format: "utf-8",
    onError: Ut,
    parser(n) {
      return /^\.(git)?$/.test(n.trim());
    }
  };
}
function cc() {
  return {
    commands: ["rev-parse", "--is-bare-repository"],
    format: "utf-8",
    onError: Ut,
    parser: ja
  };
}
function af(e) {
  return /(Not a git repository|Kein Git-Repository)/i.test(String(e));
}
var Hi, Ut, ja, uc = _({
  "src/lib/tasks/check-is-repo.ts"() {
    O(), Hi = /* @__PURE__ */ ((e) => (e.BARE = "bare", e.IN_TREE = "tree", e.IS_REPO_ROOT = "root", e))(Hi || {}), Ut = ({ exitCode: e }, n, t, i) => {
      if (e === 128 && af(n))
        return t(Buffer.from("false"));
      i(n);
    }, ja = (e) => e.trim() === "true";
  }
});
function sf(e, n) {
  const t = new pc(e), i = e ? dc : lc;
  return Kn(n).forEach((a) => {
    const s = a.replace(i, "");
    t.paths.push(s), (mc.test(s) ? t.folders : t.files).push(s);
  }), t;
}
var pc, lc, dc, mc, rf = _({
  "src/lib/responses/CleanSummary.ts"() {
    O(), pc = class {
      constructor(e) {
        this.dryRun = e, this.paths = [], this.files = [], this.folders = [];
      }
    }, lc = /^[a-z]+\s*/i, dc = /^[a-z]+\s+[a-z]+\s*/i, mc = /\/$/;
  }
}), Wi = {};
Z(Wi, {
  EMPTY_COMMANDS: () => Mt,
  adhocExecTask: () => fc,
  configurationErrorTask: () => xe,
  isBufferTask: () => xc,
  isEmptyTask: () => vc,
  straightThroughBufferTask: () => hc,
  straightThroughStringTask: () => de
});
function fc(e) {
  return {
    commands: Mt,
    format: "empty",
    parser: e
  };
}
function xe(e) {
  return {
    commands: Mt,
    format: "empty",
    parser() {
      throw typeof e == "string" ? new Uo(e) : e;
    }
  };
}
function de(e, n = !1) {
  return {
    commands: e,
    format: "utf-8",
    parser(t) {
      return n ? String(t).trim() : t;
    }
  };
}
function hc(e) {
  return {
    commands: e,
    format: "buffer",
    parser(n) {
      return n;
    }
  };
}
function xc(e) {
  return e.format === "buffer";
}
function vc(e) {
  return e.format === "empty" || !e.commands.length;
}
var Mt, Q = _({
  "src/lib/tasks/task.ts"() {
    Mo(), Mt = [];
  }
}), gc = {};
Z(gc, {
  CONFIG_ERROR_INTERACTIVE_MODE: () => Aa,
  CONFIG_ERROR_MODE_REQUIRED: () => Pa,
  CONFIG_ERROR_UNKNOWN_OPTION: () => La,
  CleanOptions: () => vt,
  cleanTask: () => bc,
  cleanWithOptionsTask: () => of,
  isCleanOptionsArray: () => cf
});
function of(e, n) {
  const { cleanMode: t, options: i, valid: a } = uf(e);
  return t ? a.options ? (i.push(...n), i.some(df) ? xe(Aa) : bc(t, i)) : xe(La + JSON.stringify(e)) : xe(Pa);
}
function bc(e, n) {
  return {
    commands: ["clean", `-${e}`, ...n],
    format: "utf-8",
    parser(i) {
      return sf(e === "n", i);
    }
  };
}
function cf(e) {
  return Array.isArray(e) && e.every((n) => $a.has(n));
}
function uf(e) {
  let n, t = [], i = { cleanMode: !1, options: !0 };
  return e.replace(/[^a-z]i/g, "").split("").forEach((a) => {
    pf(a) ? (n = a, i.cleanMode = !0) : i.options = i.options && lf(t[t.length] = `-${a}`);
  }), {
    cleanMode: n,
    options: t,
    valid: i
  };
}
function pf(e) {
  return e === "f" || e === "n";
}
function lf(e) {
  return /^-[a-z]$/i.test(e) && $a.has(e.charAt(1));
}
function df(e) {
  return /^-[^\-]/.test(e) ? e.indexOf("i") > 0 : e === "--interactive";
}
var Aa, Pa, La, vt, $a, yc = _({
  "src/lib/tasks/clean.ts"() {
    rf(), O(), Q(), Aa = "Git clean interactive mode is not supported", Pa = 'Git clean mode parameter ("n" or "f") is required', La = "Git clean unknown option found in: ", vt = /* @__PURE__ */ ((e) => (e.DRY_RUN = "n", e.FORCE = "f", e.IGNORED_INCLUDED = "x", e.IGNORED_ONLY = "X", e.EXCLUDING = "e", e.QUIET = "q", e.RECURSIVE = "d", e))(vt || {}), $a = /* @__PURE__ */ new Set([
      "i",
      ...Xo(Object.values(vt))
    ]);
  }
});
function mf(e) {
  const n = new _c();
  for (const t of wc(e))
    n.addValue(t.file, String(t.key), t.value);
  return n;
}
function ff(e, n) {
  let t = null;
  const i = [], a = /* @__PURE__ */ new Map();
  for (const s of wc(e, n))
    s.key === n && (i.push(t = s.value), a.has(s.file) || a.set(s.file, []), a.get(s.file).push(t));
  return {
    key: n,
    paths: Array.from(a.keys()),
    scopes: a,
    value: t,
    values: i
  };
}
function hf(e) {
  return e.replace(/^(file):/, "");
}
function* wc(e, n = null) {
  const t = e.split("\0");
  for (let i = 0, a = t.length - 1; i < a; ) {
    const s = hf(t[i++]);
    let r = t[i++], p = n;
    if (r.includes(`
`)) {
      const l = Wo(r, `
`);
      p = l[0], r = l[1];
    }
    yield { file: s, key: p, value: r };
  }
}
var _c, xf = _({
  "src/lib/responses/ConfigList.ts"() {
    O(), _c = class {
      constructor() {
        this.files = [], this.values = /* @__PURE__ */ Object.create(null);
      }
      get all() {
        return this._all || (this._all = this.files.reduce((e, n) => Object.assign(e, this.values[n]), {})), this._all;
      }
      addFile(e) {
        if (!(e in this.values)) {
          const n = tn(this.files);
          this.values[e] = n ? Object.create(this.values[n]) : {}, this.files.push(e);
        }
        return this.values[e];
      }
      addValue(e, n, t) {
        const i = this.addFile(e);
        i.hasOwnProperty(n) ? Array.isArray(i[n]) ? i[n].push(t) : i[n] = [i[n], t] : i[n] = t, this._all = void 0;
      }
    };
  }
});
function hi(e, n) {
  return typeof e == "string" && Ji.hasOwnProperty(e) ? e : n;
}
function vf(e, n, t, i) {
  const a = ["config", `--${i}`];
  return t && a.push("--add"), a.push(e, n), {
    commands: a,
    format: "utf-8",
    parser(s) {
      return s;
    }
  };
}
function gf(e, n) {
  const t = ["config", "--null", "--show-origin", "--get-all", e];
  return n && t.splice(1, 0, `--${n}`), {
    commands: t,
    format: "utf-8",
    parser(i) {
      return ff(i, e);
    }
  };
}
function bf(e) {
  const n = ["config", "--list", "--show-origin", "--null"];
  return e && n.push(`--${e}`), {
    commands: n,
    format: "utf-8",
    parser(t) {
      return mf(t);
    }
  };
}
function yf() {
  return {
    addConfig(e, n, ...t) {
      return this._runTask(
        vf(
          e,
          n,
          t[0] === !0,
          hi(
            t[1],
            "local"
            /* local */
          )
        ),
        K(arguments)
      );
    },
    getConfig(e, n) {
      return this._runTask(
        gf(e, hi(n, void 0)),
        K(arguments)
      );
    },
    listConfig(...e) {
      return this._runTask(
        bf(hi(e[0], void 0)),
        K(arguments)
      );
    }
  };
}
var Ji, kc = _({
  "src/lib/tasks/config.ts"() {
    xf(), O(), Ji = /* @__PURE__ */ ((e) => (e.system = "system", e.global = "global", e.local = "local", e.worktree = "worktree", e))(Ji || {});
  }
});
function wf(e) {
  return Sc.has(e);
}
var xi, Sc, Cc = _({
  "src/lib/tasks/diff-name-status.ts"() {
    xi = /* @__PURE__ */ ((e) => (e.ADDED = "A", e.COPIED = "C", e.DELETED = "D", e.MODIFIED = "M", e.RENAMED = "R", e.CHANGED = "T", e.UNMERGED = "U", e.UNKNOWN = "X", e.BROKEN = "B", e))(xi || {}), Sc = new Set(Object.values(xi));
  }
});
function _f(...e) {
  return new Tc().param(...e);
}
function kf(e) {
  const n = /* @__PURE__ */ new Set(), t = {};
  return Sa(e, (i) => {
    const [a, s, r] = i.split(hn);
    n.add(a), (t[a] = t[a] || []).push({
      line: H(s),
      path: a,
      preview: r
    });
  }), {
    paths: n,
    results: t
  };
}
function Sf() {
  return {
    grep(e) {
      const n = K(arguments), t = he(arguments);
      for (const a of Ec)
        if (t.includes(a))
          return this._runTask(
            xe(`git.grep: use of "${a}" is not supported.`),
            n
          );
      typeof e == "string" && (e = _f().param(e));
      const i = ["grep", "--null", "-n", "--full-name", ...t, ...e];
      return this._runTask(
        {
          commands: i,
          format: "utf-8",
          parser(a) {
            return kf(a);
          }
        },
        n
      );
    }
  };
}
var Ec, Tn, Ws, Tc, Rc = _({
  "src/lib/tasks/grep.ts"() {
    O(), Q(), Ec = ["-h"], Tn = Symbol("grepQuery"), Tc = class {
      constructor() {
        this[Ws] = [];
      }
      *[(Ws = Tn, Symbol.iterator)]() {
        for (const e of this[Tn])
          yield e;
      }
      and(...e) {
        return e.length && this[Tn].push("--and", "(", ...Dn(e, "-e"), ")"), this;
      }
      param(...e) {
        return this[Tn].push(...Dn(e, "-e")), this;
      }
    };
  }
}), Oc = {};
Z(Oc, {
  ResetMode: () => gt,
  getResetMode: () => Ef,
  resetTask: () => Cf
});
function Cf(e, n) {
  const t = ["reset"];
  return Fc(e) && t.push(`--${e}`), t.push(...n), de(t);
}
function Ef(e) {
  if (Fc(e))
    return e;
  switch (typeof e) {
    case "string":
    case "undefined":
      return "soft";
  }
}
function Fc(e) {
  return jc.includes(e);
}
var gt, jc, Ac = _({
  "src/lib/tasks/reset.ts"() {
    Q(), gt = /* @__PURE__ */ ((e) => (e.MIXED = "mixed", e.SOFT = "soft", e.HARD = "hard", e.MERGE = "merge", e.KEEP = "keep", e))(gt || {}), jc = Array.from(Object.values(gt));
  }
});
function Tf() {
  return zi("simple-git");
}
function Js(e, n, t) {
  return !n || !String(n).replace(/\s*/, "") ? t ? (i, ...a) => {
    e(i, ...a), t(i, ...a);
  } : e : (i, ...a) => {
    e(`%s ${i}`, n, ...a), t && t(i, ...a);
  };
}
function Rf(e, n, { namespace: t }) {
  if (typeof e == "string")
    return e;
  const i = n && n.namespace || "";
  return i.startsWith(t) ? i.substr(t.length + 1) : i || t;
}
function Da(e, n, t, i = Tf()) {
  const a = e && `[${e}]` || "", s = [], r = typeof n == "string" ? i.extend(n) : n, p = Rf($e(n, ue), r, i);
  return m(t);
  function l(o, u) {
    return B(
      s,
      Da(e, p.replace(/^[^:]+/, o), u, i)
    );
  }
  function m(o) {
    const u = o && `[${o}]` || "", c = r && Js(r, u) || sn, d = Js(i, `${a} ${u}`, c);
    return Object.assign(r ? c : d, {
      label: e,
      sibling: l,
      info: d,
      step: m
    });
  }
}
var Pc = _({
  "src/lib/git-logger.ts"() {
    O(), zi.formatters.L = (e) => String(Ra(e) ? e.length : "-"), zi.formatters.B = (e) => Buffer.isBuffer(e) ? e.toString("utf8") : Yn(e);
  }
}), ct, Vi, Of = _({
  "src/lib/runners/tasks-pending-queue.ts"() {
    Ye(), Pc(), ct = class {
      constructor(e = "GitExecutor") {
        this.logLabel = e, this._queue = /* @__PURE__ */ new Map();
      }
      withProgress(e) {
        return this._queue.get(e);
      }
      createProgress(e) {
        const n = ct.getName(e.commands[0]), t = Da(this.logLabel, n);
        return {
          task: e,
          logger: t,
          name: n
        };
      }
      push(e) {
        const n = this.createProgress(e);
        return n.logger("Adding task to the queue, commands = %o", e.commands), this._queue.set(e, n), n;
      }
      fatal(e) {
        for (const [n, { logger: t }] of Array.from(this._queue.entries()))
          n === e.task ? (t.info("Failed %o", e), t(
            "Fatal exception, any as-yet un-started tasks run through this executor will not be attempted"
          )) : t.info(
            "A fatal exception occurred in a previous task, the queue has been purged: %o",
            e.message
          ), this.complete(n);
        if (this._queue.size !== 0)
          throw new Error(`Queue size should be zero after fatal: ${this._queue.size}`);
      }
      complete(e) {
        this.withProgress(e) && this._queue.delete(e);
      }
      attempt(e) {
        const n = this.withProgress(e);
        if (!n)
          throw new Ie(void 0, "TasksPendingQueue: attempt called for an unknown task");
        return n.logger("Starting task"), n;
      }
      static getName(e = "empty") {
        return `task:${e}:${++ct.counter}`;
      }
    }, Vi = ct, Vi.counter = 0;
  }
});
function Xe(e, n) {
  return {
    method: Jo(e.commands) || "",
    commands: n
  };
}
function Ff(e, n) {
  return (t) => {
    n("[ERROR] child process exception %o", t), e.push(Buffer.from(String(t.stack), "ascii"));
  };
}
function Vs(e, n, t, i) {
  return (a) => {
    t("%s received %L bytes", n, a), i("%B", a), e.push(a);
  };
}
var Ki, jf = _({
  "src/lib/runners/git-executor-chain.ts"() {
    Ye(), Q(), O(), Of(), Ki = class {
      constructor(e, n, t) {
        this._executor = e, this._scheduler = n, this._plugins = t, this._chain = Promise.resolve(), this._queue = new Vi();
      }
      get cwd() {
        return this._cwd || this._executor.cwd;
      }
      set cwd(e) {
        this._cwd = e;
      }
      get env() {
        return this._executor.env;
      }
      get outputHandler() {
        return this._executor.outputHandler;
      }
      chain() {
        return this;
      }
      push(e) {
        return this._queue.push(e), this._chain = this._chain.then(() => this.attemptTask(e));
      }
      attemptTask(e) {
        return Rn(this, null, function* () {
          const n = yield this._scheduler.next(), t = () => this._queue.complete(e);
          try {
            const { logger: i } = this._queue.attempt(e);
            return yield vc(e) ? this.attemptEmptyTask(e, i) : this.attemptRemoteTask(e, i);
          } catch (i) {
            throw this.onFatalException(e, i);
          } finally {
            t(), n();
          }
        });
      }
      onFatalException(e, n) {
        const t = n instanceof Ie ? Object.assign(n, { task: e }) : new Ie(e, n && String(n));
        return this._chain = Promise.resolve(), this._queue.fatal(t), t;
      }
      attemptRemoteTask(e, n) {
        return Rn(this, null, function* () {
          const t = this._plugins.exec("spawn.binary", "", Xe(e, e.commands)), i = this._plugins.exec(
            "spawn.args",
            [...e.commands],
            Xe(e, e.commands)
          ), a = yield this.gitResponse(
            e,
            t,
            i,
            this.outputHandler,
            n.step("SPAWN")
          ), s = yield this.handleTaskData(e, i, a, n.step("HANDLE"));
          return n("passing response to task's parser as a %s", e.format), xc(e) ? Gi(e.parser, s) : Gi(e.parser, s.asStrings());
        });
      }
      attemptEmptyTask(e, n) {
        return Rn(this, null, function* () {
          return n("empty task bypassing child process to call to task's parser"), e.parser(this);
        });
      }
      handleTaskData(e, n, t, i) {
        const { exitCode: a, rejection: s, stdOut: r, stdErr: p } = t;
        return new Promise((l, m) => {
          i("Preparing to handle process response exitCode=%d stdOut=", a);
          const { error: o } = this._plugins.exec(
            "task.error",
            { error: s },
            Se(Se({}, Xe(e, n)), t)
          );
          if (o && e.onError)
            return i.info("exitCode=%s handling with custom error handler"), e.onError(
              t,
              o,
              (u) => {
                i.info("custom error handler treated as success"), i("custom error returned a %s", Yn(u)), l(
                  new Bn(
                    Array.isArray(u) ? Buffer.concat(u) : u,
                    Buffer.concat(p)
                  )
                );
              },
              m
            );
          if (o)
            return i.info(
              "handling as error: exitCode=%s stdErr=%s rejection=%o",
              a,
              p.length,
              s
            ), m(o);
          i.info("retrieving task output complete"), l(new Bn(Buffer.concat(r), Buffer.concat(p)));
        });
      }
      gitResponse(e, n, t, i, a) {
        return Rn(this, null, function* () {
          const s = a.sibling("output"), r = this._plugins.exec(
            "spawn.options",
            {
              cwd: this.cwd,
              env: this.env,
              windowsHide: !0
            },
            Xe(e, e.commands)
          );
          return new Promise((p) => {
            const l = [], m = [];
            a.info("%s %o", n, t), a("%O", r);
            let o = this._beforeSpawn(e, t);
            if (o)
              return p({
                stdOut: l,
                stdErr: m,
                exitCode: 9901,
                rejection: o
              });
            this._plugins.exec("spawn.before", void 0, On(Se({}, Xe(e, t)), {
              kill(c) {
                o = c || o;
              }
            }));
            const u = $p(n, t, r);
            u.stdout.on(
              "data",
              Vs(l, "stdOut", a, s.step("stdOut"))
            ), u.stderr.on(
              "data",
              Vs(m, "stdErr", a, s.step("stdErr"))
            ), u.on("error", Ff(m, a)), i && (a("Passing child process stdOut/stdErr to custom outputHandler"), i(n, u.stdout, u.stderr, [...t])), this._plugins.exec("spawn.after", void 0, On(Se({}, Xe(e, t)), {
              spawned: u,
              close(c, d) {
                p({
                  stdOut: l,
                  stdErr: m,
                  exitCode: c,
                  rejection: o || d
                });
              },
              kill(c) {
                u.killed || (o = c, u.kill("SIGINT"));
              }
            }));
          });
        });
      }
      _beforeSpawn(e, n) {
        let t;
        return this._plugins.exec("spawn.before", void 0, On(Se({}, Xe(e, n)), {
          kill(i) {
            t = i || t;
          }
        })), t;
      }
    };
  }
}), Lc = {};
Z(Lc, {
  GitExecutor: () => $c
});
var $c, Af = _({
  "src/lib/runners/git-executor.ts"() {
    jf(), $c = class {
      constructor(e, n, t) {
        this.cwd = e, this._scheduler = n, this._plugins = t, this._chain = new Ki(this, this._scheduler, this._plugins);
      }
      chain() {
        return new Ki(this, this._scheduler, this._plugins);
      }
      push(e) {
        return this._chain.push(e);
      }
    };
  }
});
function Pf(e, n, t = sn) {
  const i = (s) => {
    t(null, s);
  }, a = (s) => {
    (s == null ? void 0 : s.task) === e && t(
      s instanceof Vn ? Lf(s) : s,
      void 0
    );
  };
  n.then(i, a);
}
function Lf(e) {
  let n = (i) => {
    console.warn(
      `simple-git deprecation notice: accessing GitResponseError.${i} should be GitResponseError.git.${i}, this will no longer be available in version 3`
    ), n = sn;
  };
  return Object.create(e, Object.getOwnPropertyNames(e.git).reduce(t, {}));
  function t(i, a) {
    return a in e || (i[a] = {
      enumerable: !1,
      configurable: !1,
      get() {
        return n(a), e.git[a];
      }
    }), i;
  }
}
var $f = _({
  "src/lib/task-callback.ts"() {
    yn(), O();
  }
});
function Ks(e, n) {
  return fc((t) => {
    if (!Ca(e))
      throw new Error(`Git.cwd: cannot change to non-directory "${e}"`);
    return (n || t).cwd = e;
  });
}
var Df = _({
  "src/lib/tasks/change-working-directory.ts"() {
    O(), Q();
  }
});
function vi(e) {
  const n = ["checkout", ...e];
  return n[1] === "-b" && n.includes("-B") && (n[1] = qt(n, "-B")), de(n);
}
function Nf() {
  return {
    checkout() {
      return this._runTask(
        vi(he(arguments, 1)),
        K(arguments)
      );
    },
    checkoutBranch(e, n) {
      return this._runTask(
        vi(["-b", e, n, ...he(arguments)]),
        K(arguments)
      );
    },
    checkoutLocalBranch(e) {
      return this._runTask(
        vi(["-b", e, ...he(arguments)]),
        K(arguments)
      );
    }
  };
}
var Bf = _({
  "src/lib/tasks/checkout.ts"() {
    O(), Q();
  }
});
function If() {
  return {
    count: 0,
    garbage: 0,
    inPack: 0,
    packs: 0,
    prunePackable: 0,
    size: 0,
    sizeGarbage: 0,
    sizePack: 0
  };
}
function qf() {
  return {
    countObjects() {
      return this._runTask({
        commands: ["count-objects", "--verbose"],
        format: "utf-8",
        parser(e) {
          return ge(If(), [Dc], e);
        }
      });
    }
  };
}
var Dc, zf = _({
  "src/lib/tasks/count-objects.ts"() {
    O(), Dc = new j(
      /([a-z-]+): (\d+)$/,
      (e, [n, t]) => {
        const i = Yo(n);
        e.hasOwnProperty(i) && (e[i] = H(t));
      }
    );
  }
});
function Uf(e) {
  return ge({
    author: null,
    branch: "",
    commit: "",
    root: !1,
    summary: {
      changes: 0,
      insertions: 0,
      deletions: 0
    }
  }, Nc, e);
}
var Nc, Mf = _({
  "src/lib/parsers/parse-commit.ts"() {
    O(), Nc = [
      new j(/^\[([^\s]+)( \([^)]+\))? ([^\]]+)/, (e, [n, t, i]) => {
        e.branch = n, e.commit = i, e.root = !!t;
      }),
      new j(/\s*Author:\s(.+)/i, (e, [n]) => {
        const t = n.split("<"), i = t.pop();
        !i || !i.includes("@") || (e.author = {
          email: i.substr(0, i.length - 1),
          name: t.join("<").trim()
        });
      }),
      new j(
        /(\d+)[^,]*(?:,\s*(\d+)[^,]*)(?:,\s*(\d+))/g,
        (e, [n, t, i]) => {
          e.summary.changes = parseInt(n, 10) || 0, e.summary.insertions = parseInt(t, 10) || 0, e.summary.deletions = parseInt(i, 10) || 0;
        }
      ),
      new j(
        /^(\d+)[^,]*(?:,\s*(\d+)[^(]+\(([+-]))?/,
        (e, [n, t, i]) => {
          e.summary.changes = parseInt(n, 10) || 0;
          const a = parseInt(t, 10) || 0;
          i === "-" ? e.summary.deletions = a : i === "+" && (e.summary.insertions = a);
        }
      )
    ];
  }
});
function Gf(e, n, t) {
  return {
    commands: [
      "-c",
      "core.abbrev=40",
      "commit",
      ...Dn(e, "-m"),
      ...n,
      ...t
    ],
    format: "utf-8",
    parser: Uf
  };
}
function Hf() {
  return {
    commit(n, ...t) {
      const i = K(arguments), a = e(n) || Gf(
        Le(n),
        Le($e(t[0], Et, [])),
        [...$e(t[1], Xn, []), ...he(arguments, 0, !0)]
      );
      return this._runTask(a, i);
    }
  };
  function e(n) {
    return !Et(n) && xe(
      "git.commit: requires the commit message to be supplied as a string/string[]"
    );
  }
}
var Wf = _({
  "src/lib/tasks/commit.ts"() {
    Mf(), O(), Q();
  }
});
function Jf() {
  return {
    firstCommit() {
      return this._runTask(
        de(["rev-list", "--max-parents=0", "HEAD"], !0),
        K(arguments)
      );
    }
  };
}
var Vf = _({
  "src/lib/tasks/first-commit.ts"() {
    O(), Q();
  }
});
function Kf(e, n) {
  const t = ["hash-object", e];
  return n && t.push("-w"), de(t, !0);
}
var Yf = _({
  "src/lib/tasks/hash-object.ts"() {
    Q();
  }
});
function Xf(e, n, t) {
  const i = String(t).trim();
  let a;
  if (a = Bc.exec(i))
    return new bt(e, n, !1, a[1]);
  if (a = Ic.exec(i))
    return new bt(e, n, !0, a[1]);
  let s = "";
  const r = i.split(" ");
  for (; r.length; )
    if (r.shift() === "in") {
      s = r.join(" ");
      break;
    }
  return new bt(e, n, /^re/i.test(i), s);
}
var bt, Bc, Ic, Qf = _({
  "src/lib/responses/InitSummary.ts"() {
    bt = class {
      constructor(e, n, t, i) {
        this.bare = e, this.path = n, this.existing = t, this.gitDir = i;
      }
    }, Bc = /^Init.+ repository in (.+)$/, Ic = /^Rein.+ in (.+)$/;
  }
});
function Zf(e) {
  return e.includes(Na);
}
function eh(e = !1, n, t) {
  const i = ["init", ...t];
  return e && !Zf(i) && i.splice(1, 0, Na), {
    commands: i,
    format: "utf-8",
    parser(a) {
      return Xf(i.includes("--bare"), n, a);
    }
  };
}
var Na, nh = _({
  "src/lib/tasks/init.ts"() {
    Qf(), Na = "--bare";
  }
});
function Ba(e) {
  for (let n = 0; n < e.length; n++) {
    const t = Ia.exec(e[n]);
    if (t)
      return `--${t[1]}`;
  }
  return "";
}
function th(e) {
  return Ia.test(e);
}
var Ia, Qn = _({
  "src/lib/args/log-format.ts"() {
    Ia = /^--(stat|numstat|name-only|name-status)(=|$)/;
  }
}), qc, ih = _({
  "src/lib/responses/DiffSummary.ts"() {
    qc = class {
      constructor() {
        this.changed = 0, this.deletions = 0, this.insertions = 0, this.files = [];
      }
    };
  }
});
function zc(e = "") {
  const n = Uc[e];
  return (t) => ge(new qc(), n, t, !1);
}
var gi, Ys, Xs, Qs, Uc, Mc = _({
  "src/lib/parsers/parse-diff-summary.ts"() {
    Qn(), ih(), Cc(), O(), gi = [
      new j(
        /^(.+)\s+\|\s+(\d+)(\s+[+\-]+)?$/,
        (e, [n, t, i = ""]) => {
          e.files.push({
            file: n.trim(),
            changes: H(t),
            insertions: i.replace(/[^+]/g, "").length,
            deletions: i.replace(/[^-]/g, "").length,
            binary: !1
          });
        }
      ),
      new j(
        /^(.+) \|\s+Bin ([0-9.]+) -> ([0-9.]+) ([a-z]+)/,
        (e, [n, t, i]) => {
          e.files.push({
            file: n.trim(),
            before: H(t),
            after: H(i),
            binary: !0
          });
        }
      ),
      new j(
        /(\d+) files? changed\s*((?:, \d+ [^,]+){0,2})/,
        (e, [n, t]) => {
          const i = /(\d+) i/.exec(t), a = /(\d+) d/.exec(t);
          e.changed = H(n), e.insertions = H(i == null ? void 0 : i[1]), e.deletions = H(a == null ? void 0 : a[1]);
        }
      )
    ], Ys = [
      new j(
        /(\d+)\t(\d+)\t(.+)$/,
        (e, [n, t, i]) => {
          const a = H(n), s = H(t);
          e.changed++, e.insertions += a, e.deletions += s, e.files.push({
            file: i,
            changes: a + s,
            insertions: a,
            deletions: s,
            binary: !1
          });
        }
      ),
      new j(/-\t-\t(.+)$/, (e, [n]) => {
        e.changed++, e.files.push({
          file: n,
          after: 0,
          before: 0,
          binary: !0
        });
      })
    ], Xs = [
      new j(/(.+)$/, (e, [n]) => {
        e.changed++, e.files.push({
          file: n,
          changes: 0,
          insertions: 0,
          deletions: 0,
          binary: !1
        });
      })
    ], Qs = [
      new j(
        /([ACDMRTUXB])([0-9]{0,3})\t(.[^\t]*)(\t(.[^\t]*))?$/,
        (e, [n, t, i, a, s]) => {
          e.changed++, e.files.push({
            file: s ?? i,
            changes: 0,
            status: Zo(wf(n) && n),
            insertions: 0,
            deletions: 0,
            binary: !1
          });
        }
      )
    ], Uc = {
      "": gi,
      "--stat": gi,
      "--numstat": Ys,
      "--name-status": Qs,
      "--name-only": Xs
    };
  }
});
function ah(e, n) {
  return n.reduce(
    (t, i, a) => (t[i] = e[a] || "", t),
    /* @__PURE__ */ Object.create({ diff: null })
  );
}
function Gc(e = Ua, n = Hc, t = "") {
  const i = zc(t);
  return function(a) {
    const s = Kn(
      a,
      !0,
      qa
    ).map(function(r) {
      const p = r.trim().split(za), l = ah(
        p[0].trim().split(e),
        n
      );
      return p.length > 1 && p[1].trim() && (l.diff = i(p[1])), l;
    });
    return {
      all: s,
      latest: s.length && s[0] || null,
      total: s.length
    };
  };
}
var qa, za, Ua, Hc, Wc = _({
  "src/lib/parsers/parse-list-log-summary.ts"() {
    O(), Mc(), Qn(), qa = "òòòòòò ", za = " òò", Ua = " ò ", Hc = ["hash", "date", "message", "refs", "author_name", "author_email"];
  }
}), Jc = {};
Z(Jc, {
  diffSummaryTask: () => sh,
  validateLogFormatConfig: () => Gt
});
function sh(e) {
  let n = Ba(e);
  const t = ["diff"];
  return n === "" && (n = "--stat", t.push("--stat=4096")), t.push(...e), Gt(t) || {
    commands: t,
    format: "utf-8",
    parser: zc(n)
  };
}
function Gt(e) {
  const n = e.filter(th);
  if (n.length > 1)
    return xe(
      `Summary flags are mutually exclusive - pick one of ${n.join(",")}`
    );
  if (n.length && e.includes("-z"))
    return xe(
      `Summary flag ${n} parsing is not compatible with null termination option '-z'`
    );
}
var Ma = _({
  "src/lib/tasks/diff.ts"() {
    Qn(), Mc(), Q();
  }
});
function rh(e, n) {
  const t = [], i = [];
  return Object.keys(e).forEach((a) => {
    t.push(a), i.push(String(e[a]));
  }), [t, i.join(n)];
}
function oh(e) {
  return Object.keys(e).reduce((n, t) => (t in Yi || (n[t] = e[t]), n), {});
}
function Vc(e = {}, n = []) {
  const t = $e(e.splitter, ue, Ua), i = !Ea(e.format) && e.format ? e.format : {
    hash: "%H",
    date: e.strictDate === !1 ? "%ai" : "%aI",
    message: "%s",
    refs: "%D",
    body: e.multiLine ? "%B" : "%b",
    author_name: e.mailMap !== !1 ? "%aN" : "%an",
    author_email: e.mailMap !== !1 ? "%aE" : "%ae"
  }, [a, s] = rh(i, t), r = [], p = [
    `--pretty=format:${qa}${s}${za}`,
    ...n
  ], l = e.n || e["max-count"] || e.maxCount;
  if (l && p.push(`--max-count=${l}`), e.from || e.to) {
    const m = e.symmetric !== !1 ? "..." : "..";
    r.push(`${e.from || ""}${m}${e.to || ""}`);
  }
  return ue(e.file) && p.push("--follow", Vm(e.file)), Oa(oh(e), p), {
    fields: a,
    splitter: t,
    commands: [...p, ...r]
  };
}
function ch(e, n, t) {
  const i = Gc(e, n, Ba(t));
  return {
    commands: ["log", ...t],
    format: "utf-8",
    parser: i
  };
}
function uh() {
  return {
    log(...t) {
      const i = K(arguments), a = Vc(
        Fa(arguments),
        $e(arguments[0], Xn)
      ), s = n(...t) || Gt(a.commands) || e(a);
      return this._runTask(s, i);
    }
  };
  function e(t) {
    return ch(t.splitter, t.fields, t.commands);
  }
  function n(t, i) {
    return ue(t) && ue(i) && xe(
      "git.log(string, string) should be replaced with git.log({ from: string, to: string })"
    );
  }
}
var Yi, Kc = _({
  "src/lib/tasks/log.ts"() {
    Qn(), Jn(), Wc(), O(), Q(), Ma(), Yi = /* @__PURE__ */ ((e) => (e[e["--pretty"] = 0] = "--pretty", e[e["max-count"] = 1] = "max-count", e[e.maxCount = 2] = "maxCount", e[e.n = 3] = "n", e[e.file = 4] = "file", e[e.format = 5] = "format", e[e.from = 6] = "from", e[e.to = 7] = "to", e[e.splitter = 8] = "splitter", e[e.symmetric = 9] = "symmetric", e[e.mailMap = 10] = "mailMap", e[e.multiLine = 11] = "multiLine", e[e.strictDate = 12] = "strictDate", e))(Yi || {});
  }
}), yt, Yc, ph = _({
  "src/lib/responses/MergeSummary.ts"() {
    yt = class {
      constructor(e, n = null, t) {
        this.reason = e, this.file = n, this.meta = t;
      }
      toString() {
        return `${this.file}:${this.reason}`;
      }
    }, Yc = class {
      constructor() {
        this.conflicts = [], this.merges = [], this.result = "success";
      }
      get failed() {
        return this.conflicts.length > 0;
      }
      get reason() {
        return this.result;
      }
      toString() {
        return this.conflicts.length ? `CONFLICTS: ${this.conflicts.join(", ")}` : "OK";
      }
    };
  }
}), Xi, Xc, lh = _({
  "src/lib/responses/PullSummary.ts"() {
    Xi = class {
      constructor() {
        this.remoteMessages = {
          all: []
        }, this.created = [], this.deleted = [], this.files = [], this.deletions = {}, this.insertions = {}, this.summary = {
          changes: 0,
          deletions: 0,
          insertions: 0
        };
      }
    }, Xc = class {
      constructor() {
        this.remote = "", this.hash = {
          local: "",
          remote: ""
        }, this.branch = {
          local: "",
          remote: ""
        }, this.message = "";
      }
      toString() {
        return this.message;
      }
    };
  }
});
function bi(e) {
  return e.objects = e.objects || {
    compressing: 0,
    counting: 0,
    enumerating: 0,
    packReused: 0,
    reused: { count: 0, delta: 0 },
    total: { count: 0, delta: 0 }
  };
}
function Zs(e) {
  const n = /^\s*(\d+)/.exec(e), t = /delta (\d+)/i.exec(e);
  return {
    count: H(n && n[1] || "0"),
    delta: H(t && t[1] || "0")
  };
}
var Qc, dh = _({
  "src/lib/parsers/parse-remote-objects.ts"() {
    O(), Qc = [
      new Ve(
        /^remote:\s*(enumerating|counting|compressing) objects: (\d+),/i,
        (e, [n, t]) => {
          const i = n.toLowerCase(), a = bi(e.remoteMessages);
          Object.assign(a, { [i]: H(t) });
        }
      ),
      new Ve(
        /^remote:\s*(enumerating|counting|compressing) objects: \d+% \(\d+\/(\d+)\),/i,
        (e, [n, t]) => {
          const i = n.toLowerCase(), a = bi(e.remoteMessages);
          Object.assign(a, { [i]: H(t) });
        }
      ),
      new Ve(
        /total ([^,]+), reused ([^,]+), pack-reused (\d+)/i,
        (e, [n, t, i]) => {
          const a = bi(e.remoteMessages);
          a.total = Zs(n), a.reused = Zs(t), a.packReused = H(i);
        }
      )
    ];
  }
});
function Zc(e, n) {
  return ge({ remoteMessages: new nu() }, eu, n);
}
var eu, nu, tu = _({
  "src/lib/parsers/parse-remote-messages.ts"() {
    O(), dh(), eu = [
      new Ve(/^remote:\s*(.+)$/, (e, [n]) => (e.remoteMessages.all.push(n.trim()), !1)),
      ...Qc,
      new Ve(
        [/create a (?:pull|merge) request/i, /\s(https?:\/\/\S+)$/],
        (e, [n]) => {
          e.remoteMessages.pullRequestUrl = n;
        }
      ),
      new Ve(
        [/found (\d+) vulnerabilities.+\(([^)]+)\)/i, /\s(https?:\/\/\S+)$/],
        (e, [n, t, i]) => {
          e.remoteMessages.vulnerabilities = {
            count: H(n),
            summary: t,
            url: i
          };
        }
      )
    ], nu = class {
      constructor() {
        this.all = [];
      }
    };
  }
});
function mh(e, n) {
  const t = ge(new Xc(), iu, [e, n]);
  return t.message && t;
}
var er, nr, tr, ir, iu, ar, Ga, au = _({
  "src/lib/parsers/parse-pull.ts"() {
    lh(), O(), tu(), er = /^\s*(.+?)\s+\|\s+\d+\s*(\+*)(-*)/, nr = /(\d+)\D+((\d+)\D+\(\+\))?(\D+(\d+)\D+\(-\))?/, tr = /^(create|delete) mode \d+ (.+)/, ir = [
      new j(er, (e, [n, t, i]) => {
        e.files.push(n), t && (e.insertions[n] = t.length), i && (e.deletions[n] = i.length);
      }),
      new j(nr, (e, [n, , t, , i]) => t !== void 0 || i !== void 0 ? (e.summary.changes = +n || 0, e.summary.insertions = +t || 0, e.summary.deletions = +i || 0, !0) : !1),
      new j(tr, (e, [n, t]) => {
        B(e.files, t), B(n === "create" ? e.created : e.deleted, t);
      })
    ], iu = [
      new j(/^from\s(.+)$/i, (e, [n]) => void (e.remote = n)),
      new j(/^fatal:\s(.+)$/, (e, [n]) => void (e.message = n)),
      new j(
        /([a-z0-9]+)\.\.([a-z0-9]+)\s+(\S+)\s+->\s+(\S+)$/,
        (e, [n, t, i, a]) => {
          e.branch.local = i, e.hash.local = n, e.branch.remote = a, e.hash.remote = t;
        }
      )
    ], ar = (e, n) => ge(new Xi(), ir, [e, n]), Ga = (e, n) => Object.assign(
      new Xi(),
      ar(e, n),
      Zc(e, n)
    );
  }
}), sr, su, rr, fh = _({
  "src/lib/parsers/parse-merge.ts"() {
    ph(), O(), au(), sr = [
      new j(/^Auto-merging\s+(.+)$/, (e, [n]) => {
        e.merges.push(n);
      }),
      new j(/^CONFLICT\s+\((.+)\): Merge conflict in (.+)$/, (e, [n, t]) => {
        e.conflicts.push(new yt(n, t));
      }),
      new j(
        /^CONFLICT\s+\((.+\/delete)\): (.+) deleted in (.+) and/,
        (e, [n, t, i]) => {
          e.conflicts.push(new yt(n, t, { deleteRef: i }));
        }
      ),
      new j(/^CONFLICT\s+\((.+)\):/, (e, [n]) => {
        e.conflicts.push(new yt(n, null));
      }),
      new j(/^Automatic merge failed;\s+(.+)$/, (e, [n]) => {
        e.result = n;
      })
    ], su = (e, n) => Object.assign(rr(e, n), Ga(e, n)), rr = (e) => ge(new Yc(), sr, e);
  }
});
function or(e) {
  return e.length ? {
    commands: ["merge", ...e],
    format: "utf-8",
    parser(n, t) {
      const i = su(n, t);
      if (i.failed)
        throw new Vn(i);
      return i;
    }
  } : xe("Git.merge requires at least one option");
}
var hh = _({
  "src/lib/tasks/merge.ts"() {
    yn(), fh(), Q();
  }
});
function xh(e, n, t) {
  const i = t.includes("deleted"), a = t.includes("tag") || /^refs\/tags/.test(e), s = !t.includes("new");
  return {
    deleted: i,
    tag: a,
    branch: !a,
    new: !s,
    alreadyUpdated: s,
    local: e,
    remote: n
  };
}
var cr, ru, ur, vh = _({
  "src/lib/parsers/parse-push.ts"() {
    O(), tu(), cr = [
      new j(/^Pushing to (.+)$/, (e, [n]) => {
        e.repo = n;
      }),
      new j(/^updating local tracking ref '(.+)'/, (e, [n]) => {
        e.ref = On(Se({}, e.ref || {}), {
          local: n
        });
      }),
      new j(/^[=*-]\s+([^:]+):(\S+)\s+\[(.+)]$/, (e, [n, t, i]) => {
        e.pushed.push(xh(n, t, i));
      }),
      new j(
        /^Branch '([^']+)' set up to track remote branch '([^']+)' from '([^']+)'/,
        (e, [n, t, i]) => {
          e.branch = On(Se({}, e.branch || {}), {
            local: n,
            remote: t,
            remoteName: i
          });
        }
      ),
      new j(
        /^([^:]+):(\S+)\s+([a-z0-9]+)\.\.([a-z0-9]+)$/,
        (e, [n, t, i, a]) => {
          e.update = {
            head: {
              local: n,
              remote: t
            },
            hash: {
              from: i,
              to: a
            }
          };
        }
      )
    ], ru = (e, n) => {
      const t = ur(e, n), i = Zc(e, n);
      return Se(Se({}, t), i);
    }, ur = (e, n) => ge({ pushed: [] }, cr, [e, n]);
  }
}), ou = {};
Z(ou, {
  pushTagsTask: () => gh,
  pushTask: () => Ha
});
function gh(e = {}, n) {
  return B(n, "--tags"), Ha(e, n);
}
function Ha(e = {}, n) {
  const t = ["push", ...n];
  return e.branch && t.splice(1, 0, e.branch), e.remote && t.splice(1, 0, e.remote), qt(t, "-v"), B(t, "--verbose"), B(t, "--porcelain"), {
    commands: t,
    format: "utf-8",
    parser: ru
  };
}
var cu = _({
  "src/lib/tasks/push.ts"() {
    vh(), O();
  }
});
function bh() {
  return {
    showBuffer() {
      const e = ["show", ...he(arguments, 1)];
      return e.includes("--binary") || e.splice(1, 0, "--binary"), this._runTask(
        hc(e),
        K(arguments)
      );
    },
    show() {
      const e = ["show", ...he(arguments, 1)];
      return this._runTask(
        de(e),
        K(arguments)
      );
    }
  };
}
var yh = _({
  "src/lib/tasks/show.ts"() {
    O(), Q();
  }
}), pr, uu, wh = _({
  "src/lib/responses/FileStatusSummary.ts"() {
    pr = /^(.+) -> (.+)$/, uu = class {
      constructor(e, n, t) {
        if (this.path = e, this.index = n, this.working_dir = t, n + t === "R") {
          const i = pr.exec(e) || [null, e, e];
          this.from = i[1] || "", this.path = i[2] || "";
        }
      }
    };
  }
});
function lr(e) {
  const [n, t] = e.split(hn);
  return {
    from: t || n,
    to: n
  };
}
function ye(e, n, t) {
  return [`${e}${n}`, t];
}
function yi(e, ...n) {
  return n.map((t) => ye(e, t, (i, a) => B(i.conflicted, a)));
}
function _h(e, n) {
  const t = n.trim();
  switch (" ") {
    case t.charAt(2):
      return i(t.charAt(0), t.charAt(1), t.substr(3));
    case t.charAt(1):
      return i(" ", t.charAt(0), t.substr(2));
    default:
      return;
  }
  function i(a, s, r) {
    const p = `${a}${s}`, l = pu.get(p);
    l && l(e, r), p !== "##" && p !== "!!" && e.files.push(new uu(r.replace(/\0.+$/, ""), a, s));
  }
}
var dr, pu, lu, kh = _({
  "src/lib/responses/StatusSummary.ts"() {
    O(), wh(), dr = class {
      constructor() {
        this.not_added = [], this.conflicted = [], this.created = [], this.deleted = [], this.ignored = void 0, this.modified = [], this.renamed = [], this.files = [], this.staged = [], this.ahead = 0, this.behind = 0, this.current = null, this.tracking = null, this.detached = !1, this.isClean = () => !this.files.length;
      }
    }, pu = new Map([
      ye(
        " ",
        "A",
        (e, n) => B(e.created, n)
      ),
      ye(
        " ",
        "D",
        (e, n) => B(e.deleted, n)
      ),
      ye(
        " ",
        "M",
        (e, n) => B(e.modified, n)
      ),
      ye(
        "A",
        " ",
        (e, n) => B(e.created, n) && B(e.staged, n)
      ),
      ye(
        "A",
        "M",
        (e, n) => B(e.created, n) && B(e.staged, n) && B(e.modified, n)
      ),
      ye(
        "D",
        " ",
        (e, n) => B(e.deleted, n) && B(e.staged, n)
      ),
      ye(
        "M",
        " ",
        (e, n) => B(e.modified, n) && B(e.staged, n)
      ),
      ye(
        "M",
        "M",
        (e, n) => B(e.modified, n) && B(e.staged, n)
      ),
      ye("R", " ", (e, n) => {
        B(e.renamed, lr(n));
      }),
      ye("R", "M", (e, n) => {
        const t = lr(n);
        B(e.renamed, t), B(e.modified, t.to);
      }),
      ye("!", "!", (e, n) => {
        B(e.ignored = e.ignored || [], n);
      }),
      ye(
        "?",
        "?",
        (e, n) => B(e.not_added, n)
      ),
      ...yi(
        "A",
        "A",
        "U"
        /* UNMERGED */
      ),
      ...yi(
        "D",
        "D",
        "U"
        /* UNMERGED */
      ),
      ...yi(
        "U",
        "A",
        "D",
        "U"
        /* UNMERGED */
      ),
      [
        "##",
        (e, n) => {
          const t = /ahead (\d+)/, i = /behind (\d+)/, a = /^(.+?(?=(?:\.{3}|\s|$)))/, s = /\.{3}(\S*)/, r = /\son\s([\S]+)$/;
          let p;
          p = t.exec(n), e.ahead = p && +p[1] || 0, p = i.exec(n), e.behind = p && +p[1] || 0, p = a.exec(n), e.current = p && p[1], p = s.exec(n), e.tracking = p && p[1], p = r.exec(n), e.current = p && p[1] || e.current, e.detached = /\(no branch\)/.test(n);
        }
      ]
    ]), lu = function(e) {
      const n = e.split(hn), t = new dr();
      for (let i = 0, a = n.length; i < a; ) {
        let s = n[i++].trim();
        s && (s.charAt(0) === "R" && (s += hn + (n[i++] || "")), _h(t, s));
      }
      return t;
    };
  }
});
function Sh(e) {
  return {
    format: "utf-8",
    commands: [
      "status",
      "--porcelain",
      "-b",
      "-u",
      "--null",
      ...e.filter((t) => !du.includes(t))
    ],
    parser(t) {
      return lu(t);
    }
  };
}
var du, Ch = _({
  "src/lib/tasks/status.ts"() {
    kh(), du = ["--null", "-z"];
  }
});
function Tt(e = 0, n = 0, t = 0, i = "", a = !0) {
  return Object.defineProperty(
    {
      major: e,
      minor: n,
      patch: t,
      agent: i,
      installed: a
    },
    "toString",
    {
      value() {
        return `${this.major}.${this.minor}.${this.patch}`;
      },
      configurable: !1,
      enumerable: !1
    }
  );
}
function Eh() {
  return Tt(0, 0, 0, "", !1);
}
function Th() {
  return {
    version() {
      return this._runTask({
        commands: ["--version"],
        format: "utf-8",
        parser: Rh,
        onError(e, n, t, i) {
          if (e.exitCode === -2)
            return t(Buffer.from(Wa));
          i(n);
        }
      });
    }
  };
}
function Rh(e) {
  return e === Wa ? Eh() : ge(Tt(0, 0, 0, e), mu, e);
}
var Wa, mu, Oh = _({
  "src/lib/tasks/version.ts"() {
    O(), Wa = "installed=false", mu = [
      new j(
        /version (\d+)\.(\d+)\.(\d+)(?:\s*\((.+)\))?/,
        (e, [n, t, i, a = ""]) => {
          Object.assign(
            e,
            Tt(H(n), H(t), H(i), a)
          );
        }
      ),
      new j(
        /version (\d+)\.(\d+)\.(\D+)(.+)?$/,
        (e, [n, t, i, a = ""]) => {
          Object.assign(e, Tt(H(n), H(t), i, a));
        }
      )
    ];
  }
}), fu = {};
Z(fu, {
  SimpleGitApi: () => Qi
});
var Qi, Fh = _({
  "src/lib/simple-git-api.ts"() {
    $f(), Df(), Bf(), zf(), Wf(), kc(), Vf(), Rc(), Yf(), nh(), Kc(), hh(), cu(), yh(), Ch(), Q(), Oh(), O(), Qi = class {
      constructor(e) {
        this._executor = e;
      }
      _runTask(e, n) {
        const t = this._executor.chain(), i = t.push(e);
        return n && Pf(e, i, n), Object.create(this, {
          then: { value: i.then.bind(i) },
          catch: { value: i.catch.bind(i) },
          _executor: { value: t }
        });
      }
      add(e) {
        return this._runTask(
          de(["add", ...Le(e)]),
          K(arguments)
        );
      }
      cwd(e) {
        const n = K(arguments);
        return typeof e == "string" ? this._runTask(Ks(e, this._executor), n) : typeof (e == null ? void 0 : e.path) == "string" ? this._runTask(
          Ks(
            e.path,
            e.root && this._executor || void 0
          ),
          n
        ) : this._runTask(
          xe("Git.cwd: workingDirectory must be supplied as a string"),
          n
        );
      }
      hashObject(e, n) {
        return this._runTask(
          Kf(e, n === !0),
          K(arguments)
        );
      }
      init(e) {
        return this._runTask(
          eh(e === !0, this._executor.cwd, he(arguments)),
          K(arguments)
        );
      }
      merge() {
        return this._runTask(
          or(he(arguments)),
          K(arguments)
        );
      }
      mergeFromTo(e, n) {
        return ue(e) && ue(n) ? this._runTask(
          or([e, n, ...he(arguments)]),
          K(arguments, !1)
        ) : this._runTask(
          xe(
            "Git.mergeFromTo requires that the 'remote' and 'branch' arguments are supplied as strings"
          )
        );
      }
      outputHandler(e) {
        return this._executor.outputHandler = e, this;
      }
      push() {
        const e = Ha(
          {
            remote: $e(arguments[0], ue),
            branch: $e(arguments[1], ue)
          },
          he(arguments)
        );
        return this._runTask(e, K(arguments));
      }
      stash() {
        return this._runTask(
          de(["stash", ...he(arguments)]),
          K(arguments)
        );
      }
      status() {
        return this._runTask(
          Sh(he(arguments)),
          K(arguments)
        );
      }
    }, Object.assign(
      Qi.prototype,
      Nf(),
      Hf(),
      yf(),
      qf(),
      Jf(),
      Sf(),
      uh(),
      bh(),
      Th()
    );
  }
}), hu = {};
Z(hu, {
  Scheduler: () => xu
});
var mr, xu, jh = _({
  "src/lib/runners/scheduler.ts"() {
    O(), Pc(), mr = /* @__PURE__ */ (() => {
      let e = 0;
      return () => {
        e++;
        const { promise: n, done: t } = qo();
        return {
          promise: n,
          done: t,
          id: e
        };
      };
    })(), xu = class {
      constructor(e = 2) {
        this.concurrency = e, this.logger = Da("", "scheduler"), this.pending = [], this.running = [], this.logger("Constructed, concurrency=%s", e);
      }
      schedule() {
        if (!this.pending.length || this.running.length >= this.concurrency) {
          this.logger(
            "Schedule attempt ignored, pending=%s running=%s concurrency=%s",
            this.pending.length,
            this.running.length,
            this.concurrency
          );
          return;
        }
        const e = B(this.running, this.pending.shift());
        this.logger("Attempting id=%s", e.id), e.done(() => {
          this.logger("Completing id=", e.id), qt(this.running, e), this.schedule();
        });
      }
      next() {
        const { promise: e, id: n } = B(this.pending, mr());
        return this.logger("Scheduling id=%s", n), this.schedule(), e;
      }
    };
  }
}), vu = {};
Z(vu, {
  applyPatchTask: () => Ah
});
function Ah(e, n) {
  return de(["apply", ...n, ...e]);
}
var Ph = _({
  "src/lib/tasks/apply-patch.ts"() {
    Q();
  }
});
function Lh(e, n) {
  return {
    branch: e,
    hash: n,
    success: !0
  };
}
function $h(e) {
  return {
    branch: e,
    hash: null,
    success: !1
  };
}
var gu, Dh = _({
  "src/lib/responses/BranchDeleteSummary.ts"() {
    gu = class {
      constructor() {
        this.all = [], this.branches = {}, this.errors = [];
      }
      get success() {
        return !this.errors.length;
      }
    };
  }
});
function bu(e, n) {
  return n === 1 && Zi.test(e);
}
var fr, Zi, hr, Ht, Nh = _({
  "src/lib/parsers/parse-branch-delete.ts"() {
    Dh(), O(), fr = /(\S+)\s+\(\S+\s([^)]+)\)/, Zi = /^error[^']+'([^']+)'/m, hr = [
      new j(fr, (e, [n, t]) => {
        const i = Lh(n, t);
        e.all.push(i), e.branches[n] = i;
      }),
      new j(Zi, (e, [n]) => {
        const t = $h(n);
        e.errors.push(t), e.all.push(t), e.branches[n] = t;
      })
    ], Ht = (e, n) => ge(new gu(), hr, [e, n]);
  }
}), yu, Bh = _({
  "src/lib/responses/BranchSummary.ts"() {
    yu = class {
      constructor() {
        this.all = [], this.branches = {}, this.current = "", this.detached = !1;
      }
      push(e, n, t, i, a) {
        e === "*" && (this.detached = n, this.current = t), this.all.push(t), this.branches[t] = {
          current: e === "*",
          linkedWorkTree: e === "+",
          name: t,
          commit: i,
          label: a
        };
      }
    };
  }
});
function xr(e) {
  return e ? e.charAt(0) : "";
}
function wu(e) {
  return ge(new yu(), _u, e);
}
var _u, Ih = _({
  "src/lib/parsers/parse-branch.ts"() {
    Bh(), O(), _u = [
      new j(
        /^([*+]\s)?\((?:HEAD )?detached (?:from|at) (\S+)\)\s+([a-z0-9]+)\s(.*)$/,
        (e, [n, t, i, a]) => {
          e.push(xr(n), !0, t, i, a);
        }
      ),
      new j(
        new RegExp("^([*+]\\s)?(\\S+)\\s+([a-z0-9]+)\\s?(.*)$", "s"),
        (e, [n, t, i, a]) => {
          e.push(xr(n), !1, t, i, a);
        }
      )
    ];
  }
}), ku = {};
Z(ku, {
  branchLocalTask: () => zh,
  branchTask: () => qh,
  containsDeleteBranchCommand: () => Su,
  deleteBranchTask: () => Mh,
  deleteBranchesTask: () => Uh
});
function Su(e) {
  const n = ["-d", "-D", "--delete"];
  return e.some((t) => n.includes(t));
}
function qh(e) {
  const n = Su(e), t = ["branch", ...e];
  return t.length === 1 && t.push("-a"), t.includes("-v") || t.splice(1, 0, "-v"), {
    format: "utf-8",
    commands: t,
    parser(i, a) {
      return n ? Ht(i, a).all[0] : wu(i);
    }
  };
}
function zh() {
  return {
    format: "utf-8",
    commands: ["branch", "-v"],
    parser: wu
  };
}
function Uh(e, n = !1) {
  return {
    format: "utf-8",
    commands: ["branch", "-v", n ? "-D" : "-d", ...e],
    parser(t, i) {
      return Ht(t, i);
    },
    onError({ exitCode: t, stdOut: i }, a, s, r) {
      if (!bu(String(a), t))
        return r(a);
      s(i);
    }
  };
}
function Mh(e, n = !1) {
  const t = {
    format: "utf-8",
    commands: ["branch", "-v", n ? "-D" : "-d", e],
    parser(i, a) {
      return Ht(i, a).branches[e];
    },
    onError({ exitCode: i, stdErr: a, stdOut: s }, r, p, l) {
      if (!bu(String(r), i))
        return l(r);
      throw new Vn(
        t.parser(Nn(s), Nn(a)),
        String(r)
      );
    }
  };
  return t;
}
var Gh = _({
  "src/lib/tasks/branch.ts"() {
    yn(), Nh(), Ih(), O();
  }
}), Cu, Hh = _({
  "src/lib/responses/CheckIgnore.ts"() {
    Cu = (e) => e.split(/\n/g).map((n) => n.trim()).filter((n) => !!n);
  }
}), Eu = {};
Z(Eu, {
  checkIgnoreTask: () => Wh
});
function Wh(e) {
  return {
    commands: ["check-ignore", ...e],
    format: "utf-8",
    parser: Cu
  };
}
var Jh = _({
  "src/lib/tasks/check-ignore.ts"() {
    Hh();
  }
}), Tu = {};
Z(Tu, {
  cloneMirrorTask: () => Kh,
  cloneTask: () => Ru
});
function Vh(e) {
  return /^--upload-pack(=|$)/.test(e);
}
function Ru(e, n, t) {
  const i = ["clone", ...t];
  return ue(e) && i.push(e), ue(n) && i.push(n), i.find(Vh) ? xe("git.fetch: potential exploit argument blocked.") : de(i);
}
function Kh(e, n, t) {
  return B(t, "--mirror"), Ru(e, n, t);
}
var Yh = _({
  "src/lib/tasks/clone.ts"() {
    Q(), O();
  }
});
function Xh(e, n) {
  return ge({
    raw: e,
    remote: null,
    branches: [],
    tags: [],
    updated: [],
    deleted: []
  }, Ou, [e, n]);
}
var Ou, Qh = _({
  "src/lib/parsers/parse-fetch.ts"() {
    O(), Ou = [
      new j(/From (.+)$/, (e, [n]) => {
        e.remote = n;
      }),
      new j(/\* \[new branch]\s+(\S+)\s*-> (.+)$/, (e, [n, t]) => {
        e.branches.push({
          name: n,
          tracking: t
        });
      }),
      new j(/\* \[new tag]\s+(\S+)\s*-> (.+)$/, (e, [n, t]) => {
        e.tags.push({
          name: n,
          tracking: t
        });
      }),
      new j(/- \[deleted]\s+\S+\s*-> (.+)$/, (e, [n]) => {
        e.deleted.push({
          tracking: n
        });
      }),
      new j(
        /\s*([^.]+)\.\.(\S+)\s+(\S+)\s*-> (.+)$/,
        (e, [n, t, i, a]) => {
          e.updated.push({
            name: i,
            tracking: a,
            to: t,
            from: n
          });
        }
      )
    ];
  }
}), Fu = {};
Z(Fu, {
  fetchTask: () => ex
});
function Zh(e) {
  return /^--upload-pack(=|$)/.test(e);
}
function ex(e, n, t) {
  const i = ["fetch", ...t];
  return e && n && i.push(e, n), i.find(Zh) ? xe("git.fetch: potential exploit argument blocked.") : {
    commands: i,
    format: "utf-8",
    parser: Xh
  };
}
var nx = _({
  "src/lib/tasks/fetch.ts"() {
    Qh(), Q();
  }
});
function tx(e) {
  return ge({ moves: [] }, ju, e);
}
var ju, ix = _({
  "src/lib/parsers/parse-move.ts"() {
    O(), ju = [
      new j(/^Renaming (.+) to (.+)$/, (e, [n, t]) => {
        e.moves.push({ from: n, to: t });
      })
    ];
  }
}), Au = {};
Z(Au, {
  moveTask: () => ax
});
function ax(e, n) {
  return {
    commands: ["mv", "-v", ...Le(e), n],
    format: "utf-8",
    parser: tx
  };
}
var sx = _({
  "src/lib/tasks/move.ts"() {
    ix(), O();
  }
}), Pu = {};
Z(Pu, {
  pullTask: () => rx
});
function rx(e, n, t) {
  const i = ["pull", ...t];
  return e && n && i.splice(1, 0, e, n), {
    commands: i,
    format: "utf-8",
    parser(a, s) {
      return Ga(a, s);
    },
    onError(a, s, r, p) {
      const l = mh(
        Nn(a.stdOut),
        Nn(a.stdErr)
      );
      if (l)
        return p(new Vn(l));
      p(s);
    }
  };
}
var ox = _({
  "src/lib/tasks/pull.ts"() {
    yn(), au(), O();
  }
});
function cx(e) {
  const n = {};
  return Lu(e, ([t]) => n[t] = { name: t }), Object.values(n);
}
function ux(e) {
  const n = {};
  return Lu(e, ([t, i, a]) => {
    n.hasOwnProperty(t) || (n[t] = {
      name: t,
      refs: { fetch: "", push: "" }
    }), a && i && (n[t].refs[a.replace(/[^a-z]/g, "")] = i);
  }), Object.values(n);
}
function Lu(e, n) {
  Sa(e, (t) => n(t.split(/\s+/)));
}
var px = _({
  "src/lib/responses/GetRemoteSummary.ts"() {
    O();
  }
}), $u = {};
Z($u, {
  addRemoteTask: () => lx,
  getRemotesTask: () => dx,
  listRemotesTask: () => mx,
  remoteTask: () => fx,
  removeRemoteTask: () => hx
});
function lx(e, n, t) {
  return de(["remote", "add", ...t, e, n]);
}
function dx(e) {
  const n = ["remote"];
  return e && n.push("-v"), {
    commands: n,
    format: "utf-8",
    parser: e ? ux : cx
  };
}
function mx(e) {
  const n = [...e];
  return n[0] !== "ls-remote" && n.unshift("ls-remote"), de(n);
}
function fx(e) {
  const n = [...e];
  return n[0] !== "remote" && n.unshift("remote"), de(n);
}
function hx(e) {
  return de(["remote", "remove", e]);
}
var xx = _({
  "src/lib/tasks/remote.ts"() {
    px(), Q();
  }
}), Du = {};
Z(Du, {
  stashListTask: () => vx
});
function vx(e = {}, n) {
  const t = Vc(e), i = ["stash", "list", ...t.commands, ...n], a = Gc(
    t.splitter,
    t.fields,
    Ba(i)
  );
  return Gt(i) || {
    commands: i,
    format: "utf-8",
    parser: a
  };
}
var gx = _({
  "src/lib/tasks/stash-list.ts"() {
    Qn(), Wc(), Ma(), Kc();
  }
}), Nu = {};
Z(Nu, {
  addSubModuleTask: () => bx,
  initSubModuleTask: () => yx,
  subModuleTask: () => Wt,
  updateSubModuleTask: () => wx
});
function bx(e, n) {
  return Wt(["add", e, n]);
}
function yx(e) {
  return Wt(["init", ...e]);
}
function Wt(e) {
  const n = [...e];
  return n[0] !== "submodule" && n.unshift("submodule"), de(n);
}
function wx(e) {
  return Wt(["update", ...e]);
}
var _x = _({
  "src/lib/tasks/sub-module.ts"() {
    Q();
  }
});
function kx(e, n) {
  const t = isNaN(e), i = isNaN(n);
  return t !== i ? t ? 1 : -1 : t ? Bu(e, n) : 0;
}
function Bu(e, n) {
  return e === n ? 0 : e > n ? 1 : -1;
}
function Sx(e) {
  return e.trim();
}
function ut(e) {
  return typeof e == "string" && parseInt(e.replace(/^\D+/g, ""), 10) || 0;
}
var vr, Iu, Cx = _({
  "src/lib/responses/TagList.ts"() {
    vr = class {
      constructor(e, n) {
        this.all = e, this.latest = n;
      }
    }, Iu = function(e, n = !1) {
      const t = e.split(`
`).map(Sx).filter(Boolean);
      n || t.sort(function(a, s) {
        const r = a.split("."), p = s.split(".");
        if (r.length === 1 || p.length === 1)
          return kx(ut(r[0]), ut(p[0]));
        for (let l = 0, m = Math.max(r.length, p.length); l < m; l++) {
          const o = Bu(ut(r[l]), ut(p[l]));
          if (o)
            return o;
        }
        return 0;
      });
      const i = n ? t[0] : [...t].reverse().find((a) => a.indexOf(".") >= 0);
      return new vr(t, i);
    };
  }
}), qu = {};
Z(qu, {
  addAnnotatedTagTask: () => Rx,
  addTagTask: () => Tx,
  tagListTask: () => Ex
});
function Ex(e = []) {
  const n = e.some((t) => /^--sort=/.test(t));
  return {
    format: "utf-8",
    commands: ["tag", "-l", ...e],
    parser(t) {
      return Iu(t, n);
    }
  };
}
function Tx(e) {
  return {
    format: "utf-8",
    commands: ["tag", e],
    parser() {
      return { name: e };
    }
  };
}
function Rx(e, n) {
  return {
    format: "utf-8",
    commands: ["tag", "-a", "-m", n, e],
    parser() {
      return { name: e };
    }
  };
}
var Ox = _({
  "src/lib/tasks/tag.ts"() {
    Cx();
  }
}), Fx = Wm({
  "src/git.js"(e, n) {
    var { GitExecutor: t } = (Af(), V(Lc)), { SimpleGitApi: i } = (Fh(), V(fu)), { Scheduler: a } = (jh(), V(hu)), { configurationErrorTask: s } = (Q(), V(Wi)), {
      asArray: r,
      filterArray: p,
      filterPrimitives: l,
      filterString: m,
      filterStringOrStringArray: o,
      filterType: u,
      getTrailingOptions: c,
      trailingFunctionArgument: d,
      trailingOptionsArgument: f
    } = (O(), V(sc)), { applyPatchTask: h } = (Ph(), V(vu)), {
      branchTask: g,
      branchLocalTask: v,
      deleteBranchesTask: b,
      deleteBranchTask: y
    } = (Gh(), V(ku)), { checkIgnoreTask: P } = (Jh(), V(Eu)), { checkIsRepoTask: L } = (uc(), V(rc)), { cloneTask: ee, cloneMirrorTask: M } = (Yh(), V(Tu)), { cleanWithOptionsTask: ne, isCleanOptionsArray: E } = (yc(), V(gc)), { diffSummaryTask: A } = (Ma(), V(Jc)), { fetchTask: $ } = (nx(), V(Fu)), { moveTask: G } = (sx(), V(Au)), { pullTask: J } = (ox(), V(Pu)), { pushTagsTask: D } = (cu(), V(ou)), {
      addRemoteTask: I,
      getRemotesTask: z,
      listRemotesTask: k,
      remoteTask: C,
      removeRemoteTask: F
    } = (xx(), V($u)), { getResetMode: Fe, resetTask: te } = (Ac(), V(Oc)), { stashListTask: je } = (gx(), V(Du)), {
      addSubModuleTask: kn,
      initSubModuleTask: ke,
      subModuleTask: be,
      updateSubModuleTask: on
    } = (_x(), V(Nu)), { addAnnotatedTagTask: Sn, addTagTask: se, tagListTask: Op } = (Ox(), V(qu)), { straightThroughBufferTask: Fp, straightThroughStringTask: Ae } = (Q(), V(Wi));
    function R(w, T) {
      this._plugins = T, this._executor = new t(
        w.baseDir,
        new a(w.maxConcurrentProcesses),
        T
      ), this._trimmed = w.trimmed;
    }
    (R.prototype = Object.create(i.prototype)).constructor = R, R.prototype.customBinary = function(w) {
      return this._plugins.reconfigure("binary", w), this;
    }, R.prototype.env = function(w, T) {
      return arguments.length === 1 && typeof w == "object" ? this._executor.env = w : (this._executor.env = this._executor.env || {})[w] = T, this;
    }, R.prototype.stashList = function(w) {
      return this._runTask(
        je(
          f(arguments) || {},
          p(w) && w || []
        ),
        d(arguments)
      );
    };
    function ts(w, T, U, pe) {
      return typeof U != "string" ? s(`git.${w}() requires a string 'repoPath'`) : T(U, u(pe, m), c(arguments));
    }
    R.prototype.clone = function() {
      return this._runTask(
        ts("clone", ee, ...arguments),
        d(arguments)
      );
    }, R.prototype.mirror = function() {
      return this._runTask(
        ts("mirror", M, ...arguments),
        d(arguments)
      );
    }, R.prototype.mv = function(w, T) {
      return this._runTask(G(w, T), d(arguments));
    }, R.prototype.checkoutLatestTag = function(w) {
      var T = this;
      return this.pull(function() {
        T.tags(function(U, pe) {
          T.checkout(pe.latest, w);
        });
      });
    }, R.prototype.pull = function(w, T, U, pe) {
      return this._runTask(
        J(
          u(w, m),
          u(T, m),
          c(arguments)
        ),
        d(arguments)
      );
    }, R.prototype.fetch = function(w, T) {
      return this._runTask(
        $(
          u(w, m),
          u(T, m),
          c(arguments)
        ),
        d(arguments)
      );
    }, R.prototype.silent = function(w) {
      return console.warn(
        "simple-git deprecation notice: git.silent: logging should be configured using the `debug` library / `DEBUG` environment variable, this will be an error in version 3"
      ), this;
    }, R.prototype.tags = function(w, T) {
      return this._runTask(
        Op(c(arguments)),
        d(arguments)
      );
    }, R.prototype.rebase = function() {
      return this._runTask(
        Ae(["rebase", ...c(arguments)]),
        d(arguments)
      );
    }, R.prototype.reset = function(w) {
      return this._runTask(
        te(Fe(w), c(arguments)),
        d(arguments)
      );
    }, R.prototype.revert = function(w) {
      const T = d(arguments);
      return typeof w != "string" ? this._runTask(s("Commit must be a string"), T) : this._runTask(
        Ae(["revert", ...c(arguments, 0, !0), w]),
        T
      );
    }, R.prototype.addTag = function(w) {
      const T = typeof w == "string" ? se(w) : s("Git.addTag requires a tag name");
      return this._runTask(T, d(arguments));
    }, R.prototype.addAnnotatedTag = function(w, T) {
      return this._runTask(
        Sn(w, T),
        d(arguments)
      );
    }, R.prototype.deleteLocalBranch = function(w, T, U) {
      return this._runTask(
        y(w, typeof T == "boolean" ? T : !1),
        d(arguments)
      );
    }, R.prototype.deleteLocalBranches = function(w, T, U) {
      return this._runTask(
        b(w, typeof T == "boolean" ? T : !1),
        d(arguments)
      );
    }, R.prototype.branch = function(w, T) {
      return this._runTask(
        g(c(arguments)),
        d(arguments)
      );
    }, R.prototype.branchLocal = function(w) {
      return this._runTask(v(), d(arguments));
    }, R.prototype.raw = function(w) {
      const T = !Array.isArray(w), U = [].slice.call(T ? arguments : w, 0);
      for (let Ee = 0; Ee < U.length && T; Ee++)
        if (!l(U[Ee])) {
          U.splice(Ee, U.length - Ee);
          break;
        }
      U.push(...c(arguments, 0, !0));
      var pe = d(arguments);
      return U.length ? this._runTask(Ae(U, this._trimmed), pe) : this._runTask(
        s("Raw: must supply one or more command to execute"),
        pe
      );
    }, R.prototype.submoduleAdd = function(w, T, U) {
      return this._runTask(kn(w, T), d(arguments));
    }, R.prototype.submoduleUpdate = function(w, T) {
      return this._runTask(
        on(c(arguments, !0)),
        d(arguments)
      );
    }, R.prototype.submoduleInit = function(w, T) {
      return this._runTask(
        ke(c(arguments, !0)),
        d(arguments)
      );
    }, R.prototype.subModule = function(w, T) {
      return this._runTask(
        be(c(arguments)),
        d(arguments)
      );
    }, R.prototype.listRemote = function() {
      return this._runTask(
        k(c(arguments)),
        d(arguments)
      );
    }, R.prototype.addRemote = function(w, T, U) {
      return this._runTask(
        I(w, T, c(arguments)),
        d(arguments)
      );
    }, R.prototype.removeRemote = function(w, T) {
      return this._runTask(F(w), d(arguments));
    }, R.prototype.getRemotes = function(w, T) {
      return this._runTask(z(w === !0), d(arguments));
    }, R.prototype.remote = function(w, T) {
      return this._runTask(
        C(c(arguments)),
        d(arguments)
      );
    }, R.prototype.tag = function(w, T) {
      const U = c(arguments);
      return U[0] !== "tag" && U.unshift("tag"), this._runTask(Ae(U), d(arguments));
    }, R.prototype.updateServerInfo = function(w) {
      return this._runTask(
        Ae(["update-server-info"]),
        d(arguments)
      );
    }, R.prototype.pushTags = function(w, T) {
      const U = D(
        { remote: u(w, m) },
        c(arguments)
      );
      return this._runTask(U, d(arguments));
    }, R.prototype.rm = function(w) {
      return this._runTask(
        Ae(["rm", "-f", ...r(w)]),
        d(arguments)
      );
    }, R.prototype.rmKeepLocal = function(w) {
      return this._runTask(
        Ae(["rm", "--cached", ...r(w)]),
        d(arguments)
      );
    }, R.prototype.catFile = function(w, T) {
      return this._catFile("utf-8", arguments);
    }, R.prototype.binaryCatFile = function() {
      return this._catFile("buffer", arguments);
    }, R.prototype._catFile = function(w, T) {
      var U = d(T), pe = ["cat-file"], Ee = T[0];
      if (typeof Ee == "string")
        return this._runTask(
          s("Git.catFile: options must be supplied as an array of strings"),
          U
        );
      Array.isArray(Ee) && pe.push.apply(pe, Ee);
      const Xt = w === "buffer" ? Fp(pe) : Ae(pe);
      return this._runTask(Xt, U);
    }, R.prototype.diff = function(w, T) {
      const U = m(w) ? s(
        "git.diff: supplying options as a single string is no longer supported, switch to an array of strings"
      ) : Ae(["diff", ...c(arguments)]);
      return this._runTask(U, d(arguments));
    }, R.prototype.diffSummary = function() {
      return this._runTask(
        A(c(arguments, 1)),
        d(arguments)
      );
    }, R.prototype.applyPatch = function(w) {
      const T = o(w) ? h(r(w), c([].slice.call(arguments, 1))) : s(
        "git.applyPatch requires one or more string patches as the first argument"
      );
      return this._runTask(T, d(arguments));
    }, R.prototype.revparse = function() {
      const w = ["rev-parse", ...c(arguments, !0)];
      return this._runTask(
        Ae(w, !0),
        d(arguments)
      );
    }, R.prototype.clean = function(w, T, U) {
      const pe = E(w), Ee = pe && w.join("") || u(w, m) || "", Xt = c([].slice.call(arguments, pe ? 1 : 0));
      return this._runTask(
        ne(Ee, Xt),
        d(arguments)
      );
    }, R.prototype.exec = function(w) {
      const T = {
        commands: [],
        format: "utf-8",
        parser() {
          typeof w == "function" && w();
        }
      };
      return this._runTask(T);
    }, R.prototype.clearQueue = function() {
      return this;
    }, R.prototype.checkIgnore = function(w, T) {
      return this._runTask(
        P(r(u(w, o, []))),
        d(arguments)
      );
    }, R.prototype.checkIsRepo = function(w, T) {
      return this._runTask(
        L(u(w, m)),
        d(arguments)
      );
    }, n.exports = R;
  }
});
Jn();
Ye();
var jx = class extends Ie {
  constructor(e, n) {
    super(void 0, n), this.config = e;
  }
};
Ye();
Ye();
var Be = class extends Ie {
  constructor(e, n, t) {
    super(e, t), this.task = e, this.plugin = n, Object.setPrototypeOf(this, new.target.prototype);
  }
};
yn();
Mo();
uc();
yc();
kc();
Cc();
Rc();
Ac();
function Ax(e) {
  return e ? [{
    type: "spawn.before",
    action(i, a) {
      e.aborted && a.kill(new Be(void 0, "abort", "Abort already signaled"));
    }
  }, {
    type: "spawn.after",
    action(i, a) {
      function s() {
        a.kill(new Be(void 0, "abort", "Abort signal received"));
      }
      e.addEventListener("abort", s), a.spawned.on("close", () => e.removeEventListener("abort", s));
    }
  }] : void 0;
}
function Px(e) {
  return typeof e == "string" && e.trim().toLowerCase() === "-c";
}
function Lx(e, n) {
  if (Px(e) && /^\s*protocol(.[a-z]+)?.allow/.test(n))
    throw new Be(
      void 0,
      "unsafe",
      "Configuring protocol.allow is not permitted without enabling allowUnsafeExtProtocol"
    );
}
function $x(e, n) {
  if (/^\s*--(upload|receive)-pack/.test(e))
    throw new Be(
      void 0,
      "unsafe",
      "Use of --upload-pack or --receive-pack is not permitted without enabling allowUnsafePack"
    );
  if (n === "clone" && /^\s*-u\b/.test(e))
    throw new Be(
      void 0,
      "unsafe",
      "Use of clone with option -u is not permitted without enabling allowUnsafePack"
    );
  if (n === "push" && /^\s*--exec\b/.test(e))
    throw new Be(
      void 0,
      "unsafe",
      "Use of push with option --exec is not permitted without enabling allowUnsafePack"
    );
}
function Dx({
  allowUnsafeProtocolOverride: e = !1,
  allowUnsafePack: n = !1
} = {}) {
  return {
    type: "spawn.args",
    action(t, i) {
      return t.forEach((a, s) => {
        const r = s < t.length ? t[s + 1] : "";
        e || Lx(a, r), n || $x(a, i.method);
      }), t;
    }
  };
}
O();
function Nx(e) {
  const n = Dn(e, "-c");
  return {
    type: "spawn.args",
    action(t) {
      return [...n, ...t];
    }
  };
}
O();
var gr = ln().promise;
function Bx({
  onClose: e = !0,
  onExit: n = 50
} = {}) {
  function t() {
    let a = -1;
    const s = {
      close: ln(),
      closeTimeout: ln(),
      exit: ln(),
      exitTimeout: ln()
    }, r = Promise.race([
      e === !1 ? gr : s.closeTimeout.promise,
      n === !1 ? gr : s.exitTimeout.promise
    ]);
    return i(e, s.close, s.closeTimeout), i(n, s.exit, s.exitTimeout), {
      close(p) {
        a = p, s.close.done();
      },
      exit(p) {
        a = p, s.exit.done();
      },
      get exitCode() {
        return a;
      },
      result: r
    };
  }
  function i(a, s, r) {
    a !== !1 && (a === !0 ? s.promise : s.promise.then(() => Ui(a))).then(r.done);
  }
  return {
    type: "spawn.after",
    action(a, s) {
      return Rn(this, arguments, function* (r, { spawned: p, close: l }) {
        var m, o;
        const u = t();
        let c = !0, d = () => void (c = !1);
        (m = p.stdout) == null || m.on("data", d), (o = p.stderr) == null || o.on("data", d), p.on("error", d), p.on("close", (f) => u.close(f)), p.on("exit", (f) => u.exit(f));
        try {
          yield u.result, c && (yield Ui(50)), l(u.exitCode);
        } catch (f) {
          l(u.exitCode, f);
        }
      });
    }
  };
}
O();
var Ix = "Invalid value supplied for custom binary, requires a single string or an array containing either one or two strings", br = "Invalid value supplied for custom binary, restricted characters must be removed or supply the unsafe.allowUnsafeCustomBinary option";
function qx(e) {
  return !e || !/^([a-z]:)?([a-z0-9/.\\_-]+)$/i.test(e);
}
function yr(e, n) {
  if (e.length < 1 || e.length > 2)
    throw new Be(void 0, "binary", Ix);
  if (e.some(qx))
    if (n)
      console.warn(br);
    else
      throw new Be(void 0, "binary", br);
  const [i, a] = e;
  return {
    binary: i,
    prefix: a
  };
}
function zx(e, n = ["git"], t = !1) {
  let i = yr(Le(n), t);
  e.on("binary", (a) => {
    i = yr(Le(a), t);
  }), e.append("spawn.binary", () => i.binary), e.append("spawn.args", (a) => i.prefix ? [i.prefix, ...a] : a);
}
Ye();
function Ux(e) {
  return !!(e.exitCode && e.stdErr.length);
}
function Mx(e) {
  return Buffer.concat([...e.stdOut, ...e.stdErr]);
}
function Gx(e = !1, n = Ux, t = Mx) {
  return (i, a) => !e && i || !n(a) ? i : t(a);
}
function wr(e) {
  return {
    type: "task.error",
    action(n, t) {
      const i = e(n.error, {
        stdErr: t.stdErr,
        stdOut: t.stdOut,
        exitCode: t.exitCode
      });
      return Buffer.isBuffer(i) ? { error: new Ie(void 0, i.toString("utf-8")) } : {
        error: i
      };
    }
  };
}
O();
var Hx = class {
  constructor() {
    this.plugins = /* @__PURE__ */ new Set(), this.events = new Dp();
  }
  on(e, n) {
    this.events.on(e, n);
  }
  reconfigure(e, n) {
    this.events.emit(e, n);
  }
  append(e, n) {
    const t = B(this.plugins, { type: e, action: n });
    return () => this.plugins.delete(t);
  }
  add(e) {
    const n = [];
    return Le(e).forEach((t) => t && this.plugins.add(B(n, t))), () => {
      n.forEach((t) => this.plugins.delete(t));
    };
  }
  exec(e, n, t) {
    let i = n;
    const a = Object.freeze(Object.create(t));
    for (const s of this.plugins)
      s.type === e && (i = s.action(i, a));
    return i;
  }
};
O();
function Wx(e) {
  const n = "--progress", t = ["checkout", "clone", "fetch", "pull", "push"];
  return [{
    type: "spawn.args",
    action(s, r) {
      return t.includes(r.method) ? Ko(s, n) : s;
    }
  }, {
    type: "spawn.after",
    action(s, r) {
      var p;
      r.commands.includes(n) && ((p = r.spawned.stderr) == null || p.on("data", (l) => {
        const m = /^([\s\S]+?):\s*(\d+)% \((\d+)\/(\d+)\)/.exec(l.toString("utf8"));
        m && e({
          method: r.method,
          stage: Jx(m[1]),
          progress: H(m[2]),
          processed: H(m[3]),
          total: H(m[4])
        });
      }));
    }
  }];
}
function Jx(e) {
  return String(e.toLowerCase().split(" ", 1)) || "unknown";
}
O();
function Vx(e) {
  const n = Qo(e, ["uid", "gid"]);
  return {
    type: "spawn.options",
    action(t) {
      return Se(Se({}, n), t);
    }
  };
}
function Kx({
  block: e,
  stdErr: n = !0,
  stdOut: t = !0
}) {
  if (e > 0)
    return {
      type: "spawn.after",
      action(i, a) {
        var s, r;
        let p;
        function l() {
          p && clearTimeout(p), p = setTimeout(o, e);
        }
        function m() {
          var u, c;
          (u = a.spawned.stdout) == null || u.off("data", l), (c = a.spawned.stderr) == null || c.off("data", l), a.spawned.off("exit", m), a.spawned.off("close", m), p && clearTimeout(p);
        }
        function o() {
          m(), a.kill(new Be(void 0, "timeout", "block timeout reached"));
        }
        t && ((s = a.spawned.stdout) == null || s.on("data", l)), n && ((r = a.spawned.stderr) == null || r.on("data", l)), a.spawned.on("exit", m), a.spawned.on("close", m), l();
      }
    };
}
Jn();
function Yx() {
  return {
    type: "spawn.args",
    action(e) {
      const n = [];
      let t;
      function i(a) {
        (t = t || []).push(...a);
      }
      for (let a = 0; a < e.length; a++) {
        const s = e[a];
        if (Ct(s)) {
          i(Hs(s));
          continue;
        }
        if (s === "--") {
          i(
            e.slice(a + 1).flatMap((r) => Ct(r) && Hs(r) || r)
          );
          break;
        }
        n.push(s);
      }
      return t ? [...n, "--", ...t.map(String)] : n;
    }
  };
}
O();
var Xx = Fx();
function Qx(e, n) {
  var t;
  const i = new Hx(), a = ic(
    e && (typeof e == "string" ? { baseDir: e } : e) || {},
    n
  );
  if (!Ca(a.baseDir))
    throw new jx(
      a,
      "Cannot use simple-git on a directory that does not exist"
    );
  return Array.isArray(a.config) && i.add(Nx(a.config)), i.add(Dx(a.unsafe)), i.add(Yx()), i.add(Bx(a.completion)), a.abort && i.add(Ax(a.abort)), a.progress && i.add(Wx(a.progress)), a.timeout && i.add(Kx(a.timeout)), a.spawnOptions && i.add(Vx(a.spawnOptions)), i.add(wr(Gx(!0))), a.errors && i.add(wr(a.errors)), zx(i, a.binary, (t = a.unsafe) == null ? void 0 : t.allowUnsafeCustomBinary), new Xx(a, i);
}
yn();
var Zx = Qx, fe = {}, ie = {};
ie.fromCallback = function(e) {
  return Object.defineProperty(function(...n) {
    if (typeof n[n.length - 1] == "function") e.apply(this, n);
    else
      return new Promise((t, i) => {
        n.push((a, s) => a != null ? i(a) : t(s)), e.apply(this, n);
      });
  }, "name", { value: e.name });
};
ie.fromPromise = function(e) {
  return Object.defineProperty(function(...n) {
    const t = n[n.length - 1];
    if (typeof t != "function") return e.apply(this, n);
    n.pop(), e.apply(this, n).then((i) => t(null, i), t);
  }, "name", { value: e.name });
};
var Me = Np, ev = process.cwd, wt = null, nv = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return wt || (wt = ev.call(process)), wt;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var _r = process.chdir;
  process.chdir = function(e) {
    wt = null, _r.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, _r);
}
var tv = iv;
function iv(e) {
  Me.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && n(e), e.lutimes || t(e), e.chown = s(e.chown), e.fchown = s(e.fchown), e.lchown = s(e.lchown), e.chmod = i(e.chmod), e.fchmod = i(e.fchmod), e.lchmod = i(e.lchmod), e.chownSync = r(e.chownSync), e.fchownSync = r(e.fchownSync), e.lchownSync = r(e.lchownSync), e.chmodSync = a(e.chmodSync), e.fchmodSync = a(e.fchmodSync), e.lchmodSync = a(e.lchmodSync), e.stat = p(e.stat), e.fstat = p(e.fstat), e.lstat = p(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(o, u, c) {
    c && process.nextTick(c);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(o, u, c, d) {
    d && process.nextTick(d);
  }, e.lchownSync = function() {
  }), nv === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(o) {
    function u(c, d, f) {
      var h = Date.now(), g = 0;
      o(c, d, function v(b) {
        if (b && (b.code === "EACCES" || b.code === "EPERM" || b.code === "EBUSY") && Date.now() - h < 6e4) {
          setTimeout(function() {
            e.stat(d, function(y, P) {
              y && y.code === "ENOENT" ? o(c, d, v) : f(b);
            });
          }, g), g < 100 && (g += 10);
          return;
        }
        f && f(b);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, o), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(o) {
    function u(c, d, f, h, g, v) {
      var b;
      if (v && typeof v == "function") {
        var y = 0;
        b = function(P, L, ee) {
          if (P && P.code === "EAGAIN" && y < 10)
            return y++, o.call(e, c, d, f, h, g, b);
          v.apply(this, arguments);
        };
      }
      return o.call(e, c, d, f, h, g, b);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, o), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(o) {
    return function(u, c, d, f, h) {
      for (var g = 0; ; )
        try {
          return o.call(e, u, c, d, f, h);
        } catch (v) {
          if (v.code === "EAGAIN" && g < 10) {
            g++;
            continue;
          }
          throw v;
        }
    };
  }(e.readSync);
  function n(o) {
    o.lchmod = function(u, c, d) {
      o.open(
        u,
        Me.O_WRONLY | Me.O_SYMLINK,
        c,
        function(f, h) {
          if (f) {
            d && d(f);
            return;
          }
          o.fchmod(h, c, function(g) {
            o.close(h, function(v) {
              d && d(g || v);
            });
          });
        }
      );
    }, o.lchmodSync = function(u, c) {
      var d = o.openSync(u, Me.O_WRONLY | Me.O_SYMLINK, c), f = !0, h;
      try {
        h = o.fchmodSync(d, c), f = !1;
      } finally {
        if (f)
          try {
            o.closeSync(d);
          } catch {
          }
        else
          o.closeSync(d);
      }
      return h;
    };
  }
  function t(o) {
    Me.hasOwnProperty("O_SYMLINK") && o.futimes ? (o.lutimes = function(u, c, d, f) {
      o.open(u, Me.O_SYMLINK, function(h, g) {
        if (h) {
          f && f(h);
          return;
        }
        o.futimes(g, c, d, function(v) {
          o.close(g, function(b) {
            f && f(v || b);
          });
        });
      });
    }, o.lutimesSync = function(u, c, d) {
      var f = o.openSync(u, Me.O_SYMLINK), h, g = !0;
      try {
        h = o.futimesSync(f, c, d), g = !1;
      } finally {
        if (g)
          try {
            o.closeSync(f);
          } catch {
          }
        else
          o.closeSync(f);
      }
      return h;
    }) : o.futimes && (o.lutimes = function(u, c, d, f) {
      f && process.nextTick(f);
    }, o.lutimesSync = function() {
    });
  }
  function i(o) {
    return o && function(u, c, d) {
      return o.call(e, u, c, function(f) {
        m(f) && (f = null), d && d.apply(this, arguments);
      });
    };
  }
  function a(o) {
    return o && function(u, c) {
      try {
        return o.call(e, u, c);
      } catch (d) {
        if (!m(d)) throw d;
      }
    };
  }
  function s(o) {
    return o && function(u, c, d, f) {
      return o.call(e, u, c, d, function(h) {
        m(h) && (h = null), f && f.apply(this, arguments);
      });
    };
  }
  function r(o) {
    return o && function(u, c, d) {
      try {
        return o.call(e, u, c, d);
      } catch (f) {
        if (!m(f)) throw f;
      }
    };
  }
  function p(o) {
    return o && function(u, c, d) {
      typeof c == "function" && (d = c, c = null);
      function f(h, g) {
        g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), d && d.apply(this, arguments);
      }
      return c ? o.call(e, u, c, f) : o.call(e, u, f);
    };
  }
  function l(o) {
    return o && function(u, c) {
      var d = c ? o.call(e, u, c) : o.call(e, u);
      return d && (d.uid < 0 && (d.uid += 4294967296), d.gid < 0 && (d.gid += 4294967296)), d;
    };
  }
  function m(o) {
    if (!o || o.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (o.code === "EINVAL" || o.code === "EPERM"));
  }
}
var kr = we.Stream, av = sv;
function sv(e) {
  return {
    ReadStream: n,
    WriteStream: t
  };
  function n(i, a) {
    if (!(this instanceof n)) return new n(i, a);
    kr.call(this);
    var s = this;
    this.path = i, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, a = a || {};
    for (var r = Object.keys(a), p = 0, l = r.length; p < l; p++) {
      var m = r[p];
      this[m] = a[m];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        s._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(o, u) {
      if (o) {
        s.emit("error", o), s.readable = !1;
        return;
      }
      s.fd = u, s.emit("open", u), s._read();
    });
  }
  function t(i, a) {
    if (!(this instanceof t)) return new t(i, a);
    kr.call(this), this.path = i, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, a = a || {};
    for (var s = Object.keys(a), r = 0, p = s.length; r < p; r++) {
      var l = s[r];
      this[l] = a[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var rv = cv, ov = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function cv(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var n = { __proto__: ov(e) };
  else
    var n = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(t) {
    Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(e, t));
  }), n;
}
var W = Te, uv = tv, pv = av, lv = rv, pt = ze, re, Rt;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (re = Symbol.for("graceful-fs.queue"), Rt = Symbol.for("graceful-fs.previous")) : (re = "___graceful-fs.queue", Rt = "___graceful-fs.previous");
function dv() {
}
function zu(e, n) {
  Object.defineProperty(e, re, {
    get: function() {
      return n;
    }
  });
}
var en = dv;
pt.debuglog ? en = pt.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (en = function() {
  var e = pt.format.apply(pt, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!W[re]) {
  var mv = An[re] || [];
  zu(W, mv), W.close = function(e) {
    function n(t, i) {
      return e.call(W, t, function(a) {
        a || Sr(), typeof i == "function" && i.apply(this, arguments);
      });
    }
    return Object.defineProperty(n, Rt, {
      value: e
    }), n;
  }(W.close), W.closeSync = function(e) {
    function n(t) {
      e.apply(W, arguments), Sr();
    }
    return Object.defineProperty(n, Rt, {
      value: e
    }), n;
  }(W.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    en(W[re]), Wr.equal(W[re].length, 0);
  });
}
An[re] || zu(An, W[re]);
var wn = Ja(lv(W));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !W.__patched && (wn = Ja(W), W.__patched = !0);
function Ja(e) {
  uv(e), e.gracefulify = Ja, e.createReadStream = L, e.createWriteStream = ee;
  var n = e.readFile;
  e.readFile = t;
  function t(E, A, $) {
    return typeof A == "function" && ($ = A, A = null), G(E, A, $);
    function G(J, D, I, z) {
      return n(J, D, function(k) {
        k && (k.code === "EMFILE" || k.code === "ENFILE") ? cn([G, [J, D, I], k, z || Date.now(), Date.now()]) : typeof I == "function" && I.apply(this, arguments);
      });
    }
  }
  var i = e.writeFile;
  e.writeFile = a;
  function a(E, A, $, G) {
    return typeof $ == "function" && (G = $, $ = null), J(E, A, $, G);
    function J(D, I, z, k, C) {
      return i(D, I, z, function(F) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? cn([J, [D, I, z, k], F, C || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
      });
    }
  }
  var s = e.appendFile;
  s && (e.appendFile = r);
  function r(E, A, $, G) {
    return typeof $ == "function" && (G = $, $ = null), J(E, A, $, G);
    function J(D, I, z, k, C) {
      return s(D, I, z, function(F) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? cn([J, [D, I, z, k], F, C || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
      });
    }
  }
  var p = e.copyFile;
  p && (e.copyFile = l);
  function l(E, A, $, G) {
    return typeof $ == "function" && (G = $, $ = 0), J(E, A, $, G);
    function J(D, I, z, k, C) {
      return p(D, I, z, function(F) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? cn([J, [D, I, z, k], F, C || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
      });
    }
  }
  var m = e.readdir;
  e.readdir = u;
  var o = /^v[0-5]\./;
  function u(E, A, $) {
    typeof A == "function" && ($ = A, A = null);
    var G = o.test(process.version) ? function(I, z, k, C) {
      return m(I, J(
        I,
        z,
        k,
        C
      ));
    } : function(I, z, k, C) {
      return m(I, z, J(
        I,
        z,
        k,
        C
      ));
    };
    return G(E, A, $);
    function J(D, I, z, k) {
      return function(C, F) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? cn([
          G,
          [D, I, z],
          C,
          k || Date.now(),
          Date.now()
        ]) : (F && F.sort && F.sort(), typeof z == "function" && z.call(this, C, F));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var c = pv(e);
    v = c.ReadStream, y = c.WriteStream;
  }
  var d = e.ReadStream;
  d && (v.prototype = Object.create(d.prototype), v.prototype.open = b);
  var f = e.WriteStream;
  f && (y.prototype = Object.create(f.prototype), y.prototype.open = P), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return v;
    },
    set: function(E) {
      v = E;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return y;
    },
    set: function(E) {
      y = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var h = v;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return h;
    },
    set: function(E) {
      h = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = y;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return g;
    },
    set: function(E) {
      g = E;
    },
    enumerable: !0,
    configurable: !0
  });
  function v(E, A) {
    return this instanceof v ? (d.apply(this, arguments), this) : v.apply(Object.create(v.prototype), arguments);
  }
  function b() {
    var E = this;
    ne(E.path, E.flags, E.mode, function(A, $) {
      A ? (E.autoClose && E.destroy(), E.emit("error", A)) : (E.fd = $, E.emit("open", $), E.read());
    });
  }
  function y(E, A) {
    return this instanceof y ? (f.apply(this, arguments), this) : y.apply(Object.create(y.prototype), arguments);
  }
  function P() {
    var E = this;
    ne(E.path, E.flags, E.mode, function(A, $) {
      A ? (E.destroy(), E.emit("error", A)) : (E.fd = $, E.emit("open", $));
    });
  }
  function L(E, A) {
    return new e.ReadStream(E, A);
  }
  function ee(E, A) {
    return new e.WriteStream(E, A);
  }
  var M = e.open;
  e.open = ne;
  function ne(E, A, $, G) {
    return typeof $ == "function" && (G = $, $ = null), J(E, A, $, G);
    function J(D, I, z, k, C) {
      return M(D, I, z, function(F, Fe) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? cn([J, [D, I, z, k], F, C || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
      });
    }
  }
  return e;
}
function cn(e) {
  en("ENQUEUE", e[0].name, e[1]), W[re].push(e), Va();
}
var lt;
function Sr() {
  for (var e = Date.now(), n = 0; n < W[re].length; ++n)
    W[re][n].length > 2 && (W[re][n][3] = e, W[re][n][4] = e);
  Va();
}
function Va() {
  if (clearTimeout(lt), lt = void 0, W[re].length !== 0) {
    var e = W[re].shift(), n = e[0], t = e[1], i = e[2], a = e[3], s = e[4];
    if (a === void 0)
      en("RETRY", n.name, t), n.apply(null, t);
    else if (Date.now() - a >= 6e4) {
      en("TIMEOUT", n.name, t);
      var r = t.pop();
      typeof r == "function" && r.call(null, i);
    } else {
      var p = Date.now() - s, l = Math.max(s - a, 1), m = Math.min(l * 1.2, 100);
      p >= m ? (en("RETRY", n.name, t), n.apply(null, t.concat([a]))) : W[re].push(e);
    }
    lt === void 0 && (lt = setTimeout(Va, 0));
  }
}
(function(e) {
  const n = ie.fromCallback, t = wn, i = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((a) => typeof t[a] == "function");
  Object.assign(e, t), i.forEach((a) => {
    e[a] = n(t[a]);
  }), e.exists = function(a, s) {
    return typeof s == "function" ? t.exists(a, s) : new Promise((r) => t.exists(a, r));
  }, e.read = function(a, s, r, p, l, m) {
    return typeof m == "function" ? t.read(a, s, r, p, l, m) : new Promise((o, u) => {
      t.read(a, s, r, p, l, (c, d, f) => {
        if (c) return u(c);
        o({ bytesRead: d, buffer: f });
      });
    });
  }, e.write = function(a, s, ...r) {
    return typeof r[r.length - 1] == "function" ? t.write(a, s, ...r) : new Promise((p, l) => {
      t.write(a, s, ...r, (m, o, u) => {
        if (m) return l(m);
        p({ bytesWritten: o, buffer: u });
      });
    });
  }, e.readv = function(a, s, ...r) {
    return typeof r[r.length - 1] == "function" ? t.readv(a, s, ...r) : new Promise((p, l) => {
      t.readv(a, s, ...r, (m, o, u) => {
        if (m) return l(m);
        p({ bytesRead: o, buffers: u });
      });
    });
  }, e.writev = function(a, s, ...r) {
    return typeof r[r.length - 1] == "function" ? t.writev(a, s, ...r) : new Promise((p, l) => {
      t.writev(a, s, ...r, (m, o, u) => {
        if (m) return l(m);
        p({ bytesWritten: o, buffers: u });
      });
    });
  }, typeof t.realpath.native == "function" ? e.realpath.native = n(t.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(fe);
var Ka = {}, Uu = {};
const fv = q;
Uu.checkPath = function(n) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(n.replace(fv.parse(n).root, ""))) {
    const i = new Error(`Path contains invalid characters: ${n}`);
    throw i.code = "EINVAL", i;
  }
};
const Mu = fe, { checkPath: Gu } = Uu, Hu = (e) => {
  const n = { mode: 511 };
  return typeof e == "number" ? e : { ...n, ...e }.mode;
};
Ka.makeDir = async (e, n) => (Gu(e), Mu.mkdir(e, {
  mode: Hu(n),
  recursive: !0
}));
Ka.makeDirSync = (e, n) => (Gu(e), Mu.mkdirSync(e, {
  mode: Hu(n),
  recursive: !0
}));
const hv = ie.fromPromise, { makeDir: xv, makeDirSync: wi } = Ka, _i = hv(xv);
var De = {
  mkdirs: _i,
  mkdirsSync: wi,
  // alias
  mkdirp: _i,
  mkdirpSync: wi,
  ensureDir: _i,
  ensureDirSync: wi
};
const vv = ie.fromPromise, Wu = fe;
function gv(e) {
  return Wu.access(e).then(() => !0).catch(() => !1);
}
var rn = {
  pathExists: vv(gv),
  pathExistsSync: Wu.existsSync
};
const dn = fe, bv = ie.fromPromise;
async function yv(e, n, t) {
  const i = await dn.open(e, "r+");
  let a = null;
  try {
    await dn.futimes(i, n, t);
  } finally {
    try {
      await dn.close(i);
    } catch (s) {
      a = s;
    }
  }
  if (a)
    throw a;
}
function wv(e, n, t) {
  const i = dn.openSync(e, "r+");
  return dn.futimesSync(i, n, t), dn.closeSync(i);
}
var Ju = {
  utimesMillis: bv(yv),
  utimesMillisSync: wv
};
const xn = fe, ae = q, Cr = ie.fromPromise;
function _v(e, n, t) {
  const i = t.dereference ? (a) => xn.stat(a, { bigint: !0 }) : (a) => xn.lstat(a, { bigint: !0 });
  return Promise.all([
    i(e),
    i(n).catch((a) => {
      if (a.code === "ENOENT") return null;
      throw a;
    })
  ]).then(([a, s]) => ({ srcStat: a, destStat: s }));
}
function kv(e, n, t) {
  let i;
  const a = t.dereference ? (r) => xn.statSync(r, { bigint: !0 }) : (r) => xn.lstatSync(r, { bigint: !0 }), s = a(e);
  try {
    i = a(n);
  } catch (r) {
    if (r.code === "ENOENT") return { srcStat: s, destStat: null };
    throw r;
  }
  return { srcStat: s, destStat: i };
}
async function Sv(e, n, t, i) {
  const { srcStat: a, destStat: s } = await _v(e, n, i);
  if (s) {
    if (Zn(a, s)) {
      const r = ae.basename(e), p = ae.basename(n);
      if (t === "move" && r !== p && r.toLowerCase() === p.toLowerCase())
        return { srcStat: a, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (a.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${n}' with directory '${e}'.`);
    if (!a.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${n}' with non-directory '${e}'.`);
  }
  if (a.isDirectory() && Ya(e, n))
    throw new Error(Jt(e, n, t));
  return { srcStat: a, destStat: s };
}
function Cv(e, n, t, i) {
  const { srcStat: a, destStat: s } = kv(e, n, i);
  if (s) {
    if (Zn(a, s)) {
      const r = ae.basename(e), p = ae.basename(n);
      if (t === "move" && r !== p && r.toLowerCase() === p.toLowerCase())
        return { srcStat: a, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (a.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${n}' with directory '${e}'.`);
    if (!a.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${n}' with non-directory '${e}'.`);
  }
  if (a.isDirectory() && Ya(e, n))
    throw new Error(Jt(e, n, t));
  return { srcStat: a, destStat: s };
}
async function Vu(e, n, t, i) {
  const a = ae.resolve(ae.dirname(e)), s = ae.resolve(ae.dirname(t));
  if (s === a || s === ae.parse(s).root) return;
  let r;
  try {
    r = await xn.stat(s, { bigint: !0 });
  } catch (p) {
    if (p.code === "ENOENT") return;
    throw p;
  }
  if (Zn(n, r))
    throw new Error(Jt(e, t, i));
  return Vu(e, n, s, i);
}
function Ku(e, n, t, i) {
  const a = ae.resolve(ae.dirname(e)), s = ae.resolve(ae.dirname(t));
  if (s === a || s === ae.parse(s).root) return;
  let r;
  try {
    r = xn.statSync(s, { bigint: !0 });
  } catch (p) {
    if (p.code === "ENOENT") return;
    throw p;
  }
  if (Zn(n, r))
    throw new Error(Jt(e, t, i));
  return Ku(e, n, s, i);
}
function Zn(e, n) {
  return n.ino && n.dev && n.ino === e.ino && n.dev === e.dev;
}
function Ya(e, n) {
  const t = ae.resolve(e).split(ae.sep).filter((a) => a), i = ae.resolve(n).split(ae.sep).filter((a) => a);
  return t.every((a, s) => i[s] === a);
}
function Jt(e, n, t) {
  return `Cannot ${t} '${e}' to a subdirectory of itself, '${n}'.`;
}
var _n = {
  // checkPaths
  checkPaths: Cr(Sv),
  checkPathsSync: Cv,
  // checkParent
  checkParentPaths: Cr(Vu),
  checkParentPathsSync: Ku,
  // Misc
  isSrcSubdir: Ya,
  areIdentical: Zn
};
const ce = fe, In = q, { mkdirs: Ev } = De, { pathExists: Tv } = rn, { utimesMillis: Rv } = Ju, qn = _n;
async function Ov(e, n, t = {}) {
  typeof t == "function" && (t = { filter: t }), t.clobber = "clobber" in t ? !!t.clobber : !0, t.overwrite = "overwrite" in t ? !!t.overwrite : t.clobber, t.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  );
  const { srcStat: i, destStat: a } = await qn.checkPaths(e, n, "copy", t);
  if (await qn.checkParentPaths(e, i, n, "copy"), !await Yu(e, n, t)) return;
  const r = In.dirname(n);
  await Tv(r) || await Ev(r), await Xu(a, e, n, t);
}
async function Yu(e, n, t) {
  return t.filter ? t.filter(e, n) : !0;
}
async function Xu(e, n, t, i) {
  const s = await (i.dereference ? ce.stat : ce.lstat)(n);
  if (s.isDirectory()) return Pv(s, e, n, t, i);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return Fv(s, e, n, t, i);
  if (s.isSymbolicLink()) return Lv(e, n, t, i);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${n}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${n}`) : new Error(`Unknown file: ${n}`);
}
async function Fv(e, n, t, i, a) {
  if (!n) return Er(e, t, i, a);
  if (a.overwrite)
    return await ce.unlink(i), Er(e, t, i, a);
  if (a.errorOnExist)
    throw new Error(`'${i}' already exists`);
}
async function Er(e, n, t, i) {
  if (await ce.copyFile(n, t), i.preserveTimestamps) {
    jv(e.mode) && await Av(t, e.mode);
    const a = await ce.stat(n);
    await Rv(t, a.atime, a.mtime);
  }
  return ce.chmod(t, e.mode);
}
function jv(e) {
  return (e & 128) === 0;
}
function Av(e, n) {
  return ce.chmod(e, n | 128);
}
async function Pv(e, n, t, i, a) {
  n || await ce.mkdir(i);
  const s = await ce.readdir(t);
  await Promise.all(s.map(async (r) => {
    const p = In.join(t, r), l = In.join(i, r);
    if (!await Yu(p, l, a)) return;
    const { destStat: o } = await qn.checkPaths(p, l, "copy", a);
    return Xu(o, p, l, a);
  })), n || await ce.chmod(i, e.mode);
}
async function Lv(e, n, t, i) {
  let a = await ce.readlink(n);
  if (i.dereference && (a = In.resolve(process.cwd(), a)), !e)
    return ce.symlink(a, t);
  let s = null;
  try {
    s = await ce.readlink(t);
  } catch (r) {
    if (r.code === "EINVAL" || r.code === "UNKNOWN") return ce.symlink(a, t);
    throw r;
  }
  if (i.dereference && (s = In.resolve(process.cwd(), s)), qn.isSrcSubdir(a, s))
    throw new Error(`Cannot copy '${a}' to a subdirectory of itself, '${s}'.`);
  if (qn.isSrcSubdir(s, a))
    throw new Error(`Cannot overwrite '${s}' with '${a}'.`);
  return await ce.unlink(t), ce.symlink(a, t);
}
var $v = Ov;
const le = wn, zn = q, Dv = De.mkdirsSync, Nv = Ju.utimesMillisSync, Un = _n;
function Bv(e, n, t) {
  typeof t == "function" && (t = { filter: t }), t = t || {}, t.clobber = "clobber" in t ? !!t.clobber : !0, t.overwrite = "overwrite" in t ? !!t.overwrite : t.clobber, t.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: i, destStat: a } = Un.checkPathsSync(e, n, "copy", t);
  if (Un.checkParentPathsSync(e, i, n, "copy"), t.filter && !t.filter(e, n)) return;
  const s = zn.dirname(n);
  return le.existsSync(s) || Dv(s), Qu(a, e, n, t);
}
function Qu(e, n, t, i) {
  const s = (i.dereference ? le.statSync : le.lstatSync)(n);
  if (s.isDirectory()) return Hv(s, e, n, t, i);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return Iv(s, e, n, t, i);
  if (s.isSymbolicLink()) return Vv(e, n, t, i);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${n}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${n}`) : new Error(`Unknown file: ${n}`);
}
function Iv(e, n, t, i, a) {
  return n ? qv(e, t, i, a) : Zu(e, t, i, a);
}
function qv(e, n, t, i) {
  if (i.overwrite)
    return le.unlinkSync(t), Zu(e, n, t, i);
  if (i.errorOnExist)
    throw new Error(`'${t}' already exists`);
}
function Zu(e, n, t, i) {
  return le.copyFileSync(n, t), i.preserveTimestamps && zv(e.mode, n, t), Xa(t, e.mode);
}
function zv(e, n, t) {
  return Uv(e) && Mv(t, e), Gv(n, t);
}
function Uv(e) {
  return (e & 128) === 0;
}
function Mv(e, n) {
  return Xa(e, n | 128);
}
function Xa(e, n) {
  return le.chmodSync(e, n);
}
function Gv(e, n) {
  const t = le.statSync(e);
  return Nv(n, t.atime, t.mtime);
}
function Hv(e, n, t, i, a) {
  return n ? ep(t, i, a) : Wv(e.mode, t, i, a);
}
function Wv(e, n, t, i) {
  return le.mkdirSync(t), ep(n, t, i), Xa(t, e);
}
function ep(e, n, t) {
  le.readdirSync(e).forEach((i) => Jv(i, e, n, t));
}
function Jv(e, n, t, i) {
  const a = zn.join(n, e), s = zn.join(t, e);
  if (i.filter && !i.filter(a, s)) return;
  const { destStat: r } = Un.checkPathsSync(a, s, "copy", i);
  return Qu(r, a, s, i);
}
function Vv(e, n, t, i) {
  let a = le.readlinkSync(n);
  if (i.dereference && (a = zn.resolve(process.cwd(), a)), e) {
    let s;
    try {
      s = le.readlinkSync(t);
    } catch (r) {
      if (r.code === "EINVAL" || r.code === "UNKNOWN") return le.symlinkSync(a, t);
      throw r;
    }
    if (i.dereference && (s = zn.resolve(process.cwd(), s)), Un.isSrcSubdir(a, s))
      throw new Error(`Cannot copy '${a}' to a subdirectory of itself, '${s}'.`);
    if (Un.isSrcSubdir(s, a))
      throw new Error(`Cannot overwrite '${s}' with '${a}'.`);
    return Kv(a, t);
  } else
    return le.symlinkSync(a, t);
}
function Kv(e, n) {
  return le.unlinkSync(n), le.symlinkSync(e, n);
}
var Yv = Bv;
const Xv = ie.fromPromise;
var Qa = {
  copy: Xv($v),
  copySync: Yv
};
const np = wn, Qv = ie.fromCallback;
function Zv(e, n) {
  np.rm(e, { recursive: !0, force: !0 }, n);
}
function eg(e) {
  np.rmSync(e, { recursive: !0, force: !0 });
}
var Vt = {
  remove: Qv(Zv),
  removeSync: eg
};
const ng = ie.fromPromise, tp = fe, ip = q, ap = De, sp = Vt, Tr = ng(async function(n) {
  let t;
  try {
    t = await tp.readdir(n);
  } catch {
    return ap.mkdirs(n);
  }
  return Promise.all(t.map((i) => sp.remove(ip.join(n, i))));
});
function Rr(e) {
  let n;
  try {
    n = tp.readdirSync(e);
  } catch {
    return ap.mkdirsSync(e);
  }
  n.forEach((t) => {
    t = ip.join(e, t), sp.removeSync(t);
  });
}
var tg = {
  emptyDirSync: Rr,
  emptydirSync: Rr,
  emptyDir: Tr,
  emptydir: Tr
};
const ig = ie.fromPromise, rp = q, Ne = fe, op = De;
async function ag(e) {
  let n;
  try {
    n = await Ne.stat(e);
  } catch {
  }
  if (n && n.isFile()) return;
  const t = rp.dirname(e);
  let i = null;
  try {
    i = await Ne.stat(t);
  } catch (a) {
    if (a.code === "ENOENT") {
      await op.mkdirs(t), await Ne.writeFile(e, "");
      return;
    } else
      throw a;
  }
  i.isDirectory() ? await Ne.writeFile(e, "") : await Ne.readdir(t);
}
function sg(e) {
  let n;
  try {
    n = Ne.statSync(e);
  } catch {
  }
  if (n && n.isFile()) return;
  const t = rp.dirname(e);
  try {
    Ne.statSync(t).isDirectory() || Ne.readdirSync(t);
  } catch (i) {
    if (i && i.code === "ENOENT") op.mkdirsSync(t);
    else throw i;
  }
  Ne.writeFileSync(e, "");
}
var rg = {
  createFile: ig(ag),
  createFileSync: sg
};
const og = ie.fromPromise, cp = q, Ge = fe, up = De, { pathExists: cg } = rn, { areIdentical: pp } = _n;
async function ug(e, n) {
  let t;
  try {
    t = await Ge.lstat(n);
  } catch {
  }
  let i;
  try {
    i = await Ge.lstat(e);
  } catch (r) {
    throw r.message = r.message.replace("lstat", "ensureLink"), r;
  }
  if (t && pp(i, t)) return;
  const a = cp.dirname(n);
  await cg(a) || await up.mkdirs(a), await Ge.link(e, n);
}
function pg(e, n) {
  let t;
  try {
    t = Ge.lstatSync(n);
  } catch {
  }
  try {
    const s = Ge.lstatSync(e);
    if (t && pp(s, t)) return;
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  const i = cp.dirname(n);
  return Ge.existsSync(i) || up.mkdirsSync(i), Ge.linkSync(e, n);
}
var lg = {
  createLink: og(ug),
  createLinkSync: pg
};
const We = q, Fn = fe, { pathExists: dg } = rn, mg = ie.fromPromise;
async function fg(e, n) {
  if (We.isAbsolute(e)) {
    try {
      await Fn.lstat(e);
    } catch (s) {
      throw s.message = s.message.replace("lstat", "ensureSymlink"), s;
    }
    return {
      toCwd: e,
      toDst: e
    };
  }
  const t = We.dirname(n), i = We.join(t, e);
  if (await dg(i))
    return {
      toCwd: i,
      toDst: e
    };
  try {
    await Fn.lstat(e);
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureSymlink"), s;
  }
  return {
    toCwd: e,
    toDst: We.relative(t, e)
  };
}
function hg(e, n) {
  if (We.isAbsolute(e)) {
    if (!Fn.existsSync(e)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  }
  const t = We.dirname(n), i = We.join(t, e);
  if (Fn.existsSync(i))
    return {
      toCwd: i,
      toDst: e
    };
  if (!Fn.existsSync(e)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: e,
    toDst: We.relative(t, e)
  };
}
var xg = {
  symlinkPaths: mg(fg),
  symlinkPathsSync: hg
};
const lp = fe, vg = ie.fromPromise;
async function gg(e, n) {
  if (n) return n;
  let t;
  try {
    t = await lp.lstat(e);
  } catch {
    return "file";
  }
  return t && t.isDirectory() ? "dir" : "file";
}
function bg(e, n) {
  if (n) return n;
  let t;
  try {
    t = lp.lstatSync(e);
  } catch {
    return "file";
  }
  return t && t.isDirectory() ? "dir" : "file";
}
var yg = {
  symlinkType: vg(gg),
  symlinkTypeSync: bg
};
const wg = ie.fromPromise, dp = q, Pe = fe, { mkdirs: _g, mkdirsSync: kg } = De, { symlinkPaths: Sg, symlinkPathsSync: Cg } = xg, { symlinkType: Eg, symlinkTypeSync: Tg } = yg, { pathExists: Rg } = rn, { areIdentical: mp } = _n;
async function Og(e, n, t) {
  let i;
  try {
    i = await Pe.lstat(n);
  } catch {
  }
  if (i && i.isSymbolicLink()) {
    const [p, l] = await Promise.all([
      Pe.stat(e),
      Pe.stat(n)
    ]);
    if (mp(p, l)) return;
  }
  const a = await Sg(e, n);
  e = a.toDst;
  const s = await Eg(a.toCwd, t), r = dp.dirname(n);
  return await Rg(r) || await _g(r), Pe.symlink(e, n, s);
}
function Fg(e, n, t) {
  let i;
  try {
    i = Pe.lstatSync(n);
  } catch {
  }
  if (i && i.isSymbolicLink()) {
    const p = Pe.statSync(e), l = Pe.statSync(n);
    if (mp(p, l)) return;
  }
  const a = Cg(e, n);
  e = a.toDst, t = Tg(a.toCwd, t);
  const s = dp.dirname(n);
  return Pe.existsSync(s) || kg(s), Pe.symlinkSync(e, n, t);
}
var jg = {
  createSymlink: wg(Og),
  createSymlinkSync: Fg
};
const { createFile: Or, createFileSync: Fr } = rg, { createLink: jr, createLinkSync: Ar } = lg, { createSymlink: Pr, createSymlinkSync: Lr } = jg;
var Ag = {
  // file
  createFile: Or,
  createFileSync: Fr,
  ensureFile: Or,
  ensureFileSync: Fr,
  // link
  createLink: jr,
  createLinkSync: Ar,
  ensureLink: jr,
  ensureLinkSync: Ar,
  // symlink
  createSymlink: Pr,
  createSymlinkSync: Lr,
  ensureSymlink: Pr,
  ensureSymlinkSync: Lr
};
function Pg(e, { EOL: n = `
`, finalEOL: t = !0, replacer: i = null, spaces: a } = {}) {
  const s = t ? n : "";
  return JSON.stringify(e, i, a).replace(/\n/g, n) + s;
}
function Lg(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Za = { stringify: Pg, stripBom: Lg };
let vn;
try {
  vn = wn;
} catch {
  vn = Te;
}
const Kt = ie, { stringify: fp, stripBom: hp } = Za;
async function $g(e, n = {}) {
  typeof n == "string" && (n = { encoding: n });
  const t = n.fs || vn, i = "throws" in n ? n.throws : !0;
  let a = await Kt.fromCallback(t.readFile)(e, n);
  a = hp(a);
  let s;
  try {
    s = JSON.parse(a, n ? n.reviver : null);
  } catch (r) {
    if (i)
      throw r.message = `${e}: ${r.message}`, r;
    return null;
  }
  return s;
}
const Dg = Kt.fromPromise($g);
function Ng(e, n = {}) {
  typeof n == "string" && (n = { encoding: n });
  const t = n.fs || vn, i = "throws" in n ? n.throws : !0;
  try {
    let a = t.readFileSync(e, n);
    return a = hp(a), JSON.parse(a, n.reviver);
  } catch (a) {
    if (i)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
}
async function Bg(e, n, t = {}) {
  const i = t.fs || vn, a = fp(n, t);
  await Kt.fromCallback(i.writeFile)(e, a, t);
}
const Ig = Kt.fromPromise(Bg);
function qg(e, n, t = {}) {
  const i = t.fs || vn, a = fp(n, t);
  return i.writeFileSync(e, a, t);
}
const zg = {
  readFile: Dg,
  readFileSync: Ng,
  writeFile: Ig,
  writeFileSync: qg
};
var Ug = zg;
const dt = Ug;
var Mg = {
  // jsonfile exports
  readJson: dt.readFile,
  readJsonSync: dt.readFileSync,
  writeJson: dt.writeFile,
  writeJsonSync: dt.writeFileSync
};
const Gg = ie.fromPromise, ea = fe, xp = q, vp = De, Hg = rn.pathExists;
async function Wg(e, n, t = "utf-8") {
  const i = xp.dirname(e);
  return await Hg(i) || await vp.mkdirs(i), ea.writeFile(e, n, t);
}
function Jg(e, ...n) {
  const t = xp.dirname(e);
  ea.existsSync(t) || vp.mkdirsSync(t), ea.writeFileSync(e, ...n);
}
var es = {
  outputFile: Gg(Wg),
  outputFileSync: Jg
};
const { stringify: Vg } = Za, { outputFile: Kg } = es;
async function Yg(e, n, t = {}) {
  const i = Vg(n, t);
  await Kg(e, i, t);
}
var Xg = Yg;
const { stringify: Qg } = Za, { outputFileSync: Zg } = es;
function eb(e, n, t) {
  const i = Qg(n, t);
  Zg(e, i, t);
}
var nb = eb;
const tb = ie.fromPromise, me = Mg;
me.outputJson = tb(Xg);
me.outputJsonSync = nb;
me.outputJSON = me.outputJson;
me.outputJSONSync = me.outputJsonSync;
me.writeJSON = me.writeJson;
me.writeJSONSync = me.writeJsonSync;
me.readJSON = me.readJson;
me.readJSONSync = me.readJsonSync;
var ib = me;
const ab = fe, $r = q, { copy: sb } = Qa, { remove: gp } = Vt, { mkdirp: rb } = De, { pathExists: ob } = rn, Dr = _n;
async function cb(e, n, t = {}) {
  const i = t.overwrite || t.clobber || !1, { srcStat: a, isChangingCase: s = !1 } = await Dr.checkPaths(e, n, "move", t);
  await Dr.checkParentPaths(e, a, n, "move");
  const r = $r.dirname(n);
  return $r.parse(r).root !== r && await rb(r), ub(e, n, i, s);
}
async function ub(e, n, t, i) {
  if (!i) {
    if (t)
      await gp(n);
    else if (await ob(n))
      throw new Error("dest already exists.");
  }
  try {
    await ab.rename(e, n);
  } catch (a) {
    if (a.code !== "EXDEV")
      throw a;
    await pb(e, n, t);
  }
}
async function pb(e, n, t) {
  return await sb(e, n, {
    overwrite: t,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), gp(e);
}
var lb = cb;
const bp = wn, na = q, db = Qa.copySync, yp = Vt.removeSync, mb = De.mkdirpSync, Nr = _n;
function fb(e, n, t) {
  t = t || {};
  const i = t.overwrite || t.clobber || !1, { srcStat: a, isChangingCase: s = !1 } = Nr.checkPathsSync(e, n, "move", t);
  return Nr.checkParentPathsSync(e, a, n, "move"), hb(n) || mb(na.dirname(n)), xb(e, n, i, s);
}
function hb(e) {
  const n = na.dirname(e);
  return na.parse(n).root === n;
}
function xb(e, n, t, i) {
  if (i) return ki(e, n, t);
  if (t)
    return yp(n), ki(e, n, t);
  if (bp.existsSync(n)) throw new Error("dest already exists.");
  return ki(e, n, t);
}
function ki(e, n, t) {
  try {
    bp.renameSync(e, n);
  } catch (i) {
    if (i.code !== "EXDEV") throw i;
    return vb(e, n, t);
  }
}
function vb(e, n, t) {
  return db(e, n, {
    overwrite: t,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), yp(e);
}
var gb = fb;
const bb = ie.fromPromise;
var yb = {
  move: bb(lb),
  moveSync: gb
}, wb = {
  // Export promiseified graceful-fs:
  ...fe,
  // Export extra methods:
  ...Qa,
  ...tg,
  ...Ag,
  ...ib,
  ...De,
  ...yb,
  ...es,
  ...rn,
  ...Vt
};
const mt = /* @__PURE__ */ bn(wb);
function Br(e) {
  return Array.isArray(e) ? e : [e];
}
const ta = "", Ir = " ", Si = "\\", _b = /^\s+$/, kb = /(?:[^\\]|^)\\$/, Sb = /^\\!/, Cb = /^\\#/, Eb = /\r?\n/g, Tb = /^\.*\/|^\.+$/, Ci = "/";
let wp = "node-ignore";
typeof Symbol < "u" && (wp = Symbol.for("node-ignore"));
const qr = wp, Rb = (e, n, t) => Object.defineProperty(e, n, { value: t }), Ob = /([0-z])-([0-z])/g, _p = () => !1, Fb = (e) => e.replace(
  Ob,
  (n, t, i) => t.charCodeAt(0) <= i.charCodeAt(0) ? n : ta
), jb = (e) => {
  const { length: n } = e;
  return e.slice(0, n - n % 2);
}, Ab = [
  [
    // remove BOM
    // TODO:
    // Other similar zero-width characters?
    /^\uFEFF/,
    () => ta
  ],
  // > Trailing spaces are ignored unless they are quoted with backslash ("\")
  [
    // (a\ ) -> (a )
    // (a  ) -> (a)
    // (a \ ) -> (a  )
    /\\?\s+$/,
    (e) => e.indexOf("\\") === 0 ? Ir : ta
  ],
  // replace (\ ) with ' '
  [
    /\\\s/g,
    () => Ir
  ],
  // Escape metacharacters
  // which is written down by users but means special for regular expressions.
  // > There are 12 characters with special meanings:
  // > - the backslash \,
  // > - the caret ^,
  // > - the dollar sign $,
  // > - the period or dot .,
  // > - the vertical bar or pipe symbol |,
  // > - the question mark ?,
  // > - the asterisk or star *,
  // > - the plus sign +,
  // > - the opening parenthesis (,
  // > - the closing parenthesis ),
  // > - and the opening square bracket [,
  // > - the opening curly brace {,
  // > These special characters are often called "metacharacters".
  [
    /[\\$.|*+(){^]/g,
    (e) => `\\${e}`
  ],
  [
    // > a question mark (?) matches a single character
    /(?!\\)\?/g,
    () => "[^/]"
  ],
  // leading slash
  [
    // > A leading slash matches the beginning of the pathname.
    // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
    // A leading slash matches the beginning of the pathname
    /^\//,
    () => "^"
  ],
  // replace special metacharacter slash after the leading slash
  [
    /\//g,
    () => "\\/"
  ],
  [
    // > A leading "**" followed by a slash means match in all directories.
    // > For example, "**/foo" matches file or directory "foo" anywhere,
    // > the same as pattern "foo".
    // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
    // >   under directory "foo".
    // Notice that the '*'s have been replaced as '\\*'
    /^\^*\\\*\\\*\\\//,
    // '**/foo' <-> 'foo'
    () => "^(?:.*\\/)?"
  ],
  // starting
  [
    // there will be no leading '/'
    //   (which has been replaced by section "leading slash")
    // If starts with '**', adding a '^' to the regular expression also works
    /^(?=[^^])/,
    function() {
      return /\/(?!$)/.test(this) ? "^" : "(?:^|\\/)";
    }
  ],
  // two globstars
  [
    // Use lookahead assertions so that we could match more than one `'/**'`
    /\\\/\\\*\\\*(?=\\\/|$)/g,
    // Zero, one or several directories
    // should not use '*', or it will be replaced by the next replacer
    // Check if it is not the last `'/**'`
    (e, n, t) => n + 6 < t.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
  ],
  // normal intermediate wildcards
  [
    // Never replace escaped '*'
    // ignore rule '\*' will match the path '*'
    // 'abc.*/' -> go
    // 'abc.*'  -> skip this rule,
    //    coz trailing single wildcard will be handed by [trailing wildcard]
    /(^|[^\\]+)(\\\*)+(?=.+)/g,
    // '*.js' matches '.js'
    // '*.js' doesn't match 'abc'
    (e, n, t) => {
      const i = t.replace(/\\\*/g, "[^\\/]*");
      return n + i;
    }
  ],
  [
    // unescape, revert step 3 except for back slash
    // For example, if a user escape a '\\*',
    // after step 3, the result will be '\\\\\\*'
    /\\\\\\(?=[$.|*+(){^])/g,
    () => Si
  ],
  [
    // '\\\\' -> '\\'
    /\\\\/g,
    () => Si
  ],
  [
    // > The range notation, e.g. [a-zA-Z],
    // > can be used to match one of the characters in a range.
    // `\` is escaped by step 3
    /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
    (e, n, t, i, a) => n === Si ? `\\[${t}${jb(i)}${a}` : a === "]" && i.length % 2 === 0 ? `[${Fb(t)}${i}]` : "[]"
  ],
  // ending
  [
    // 'js' will not match 'js.'
    // 'ab' will not match 'abc'
    /(?:[^*])$/,
    // WTF!
    // https://git-scm.com/docs/gitignore
    // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
    // which re-fixes #24, #38
    // > If there is a separator at the end of the pattern then the pattern
    // > will only match directories, otherwise the pattern can match both
    // > files and directories.
    // 'js*' will not match 'a.js'
    // 'js/' will not match 'a.js'
    // 'js' will match 'a.js' and 'a.js/'
    (e) => /\/$/.test(e) ? `${e}$` : `${e}(?=$|\\/$)`
  ],
  // trailing wildcard
  [
    /(\^|\\\/)?\\\*$/,
    (e, n) => `${n ? `${n}[^/]+` : "[^/]*"}(?=$|\\/$)`
  ]
], zr = /* @__PURE__ */ Object.create(null), Pb = (e, n) => {
  let t = zr[e];
  return t || (t = Ab.reduce(
    (i, a) => i.replace(a[0], a[1].bind(e)),
    e
  ), zr[e] = t), n ? new RegExp(t, "i") : new RegExp(t);
}, ns = (e) => typeof e == "string", Lb = (e) => e && ns(e) && !_b.test(e) && !kb.test(e) && e.indexOf("#") !== 0, $b = (e) => e.split(Eb);
class Db {
  constructor(n, t, i, a) {
    this.origin = n, this.pattern = t, this.negative = i, this.regex = a;
  }
}
const Nb = (e, n) => {
  const t = e;
  let i = !1;
  e.indexOf("!") === 0 && (i = !0, e = e.substr(1)), e = e.replace(Sb, "!").replace(Cb, "#");
  const a = Pb(e, n);
  return new Db(
    t,
    e,
    i,
    a
  );
}, Bb = (e, n) => {
  throw new n(e);
}, qe = (e, n, t) => ns(e) ? e ? qe.isNotRelative(e) ? t(
  `path should be a \`path.relative()\`d string, but got "${n}"`,
  RangeError
) : !0 : t("path must not be empty", TypeError) : t(
  `path must be a string, but got \`${n}\``,
  TypeError
), kp = (e) => Tb.test(e);
qe.isNotRelative = kp;
qe.convert = (e) => e;
class Ib {
  constructor({
    ignorecase: n = !0,
    ignoreCase: t = n,
    allowRelativePaths: i = !1
  } = {}) {
    Rb(this, qr, !0), this._rules = [], this._ignoreCase = t, this._allowRelativePaths = i, this._initCache();
  }
  _initCache() {
    this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
  }
  _addPattern(n) {
    if (n && n[qr]) {
      this._rules = this._rules.concat(n._rules), this._added = !0;
      return;
    }
    if (Lb(n)) {
      const t = Nb(n, this._ignoreCase);
      this._added = !0, this._rules.push(t);
    }
  }
  // @param {Array<string> | string | Ignore} pattern
  add(n) {
    return this._added = !1, Br(
      ns(n) ? $b(n) : n
    ).forEach(this._addPattern, this), this._added && this._initCache(), this;
  }
  // legacy
  addPattern(n) {
    return this.add(n);
  }
  //          |           ignored : unignored
  // negative |   0:0   |   0:1   |   1:0   |   1:1
  // -------- | ------- | ------- | ------- | --------
  //     0    |  TEST   |  TEST   |  SKIP   |    X
  //     1    |  TESTIF |  SKIP   |  TEST   |    X
  // - SKIP: always skip
  // - TEST: always test
  // - TESTIF: only test if checkUnignored
  // - X: that never happen
  // @param {boolean} whether should check if the path is unignored,
  //   setting `checkUnignored` to `false` could reduce additional
  //   path matching.
  // @returns {TestResult} true if a file is ignored
  _testOne(n, t) {
    let i = !1, a = !1;
    return this._rules.forEach((s) => {
      const { negative: r } = s;
      if (a === r && i !== a || r && !i && !a && !t)
        return;
      s.regex.test(n) && (i = !r, a = r);
    }), {
      ignored: i,
      unignored: a
    };
  }
  // @returns {TestResult}
  _test(n, t, i, a) {
    const s = n && qe.convert(n);
    return qe(
      s,
      n,
      this._allowRelativePaths ? _p : Bb
    ), this._t(s, t, i, a);
  }
  _t(n, t, i, a) {
    if (n in t)
      return t[n];
    if (a || (a = n.split(Ci)), a.pop(), !a.length)
      return t[n] = this._testOne(n, i);
    const s = this._t(
      a.join(Ci) + Ci,
      t,
      i,
      a
    );
    return t[n] = s.ignored ? s : this._testOne(n, i);
  }
  ignores(n) {
    return this._test(n, this._ignoreCache, !1).ignored;
  }
  createFilter() {
    return (n) => !this.ignores(n);
  }
  filter(n) {
    return Br(n).filter(this.createFilter());
  }
  // @returns {TestResult}
  test(n) {
    return this._test(n, this._testCache, !0);
  }
}
const Ot = (e) => new Ib(e), qb = (e) => qe(e && qe.convert(e), e, _p);
Ot.isPathValid = qb;
Ot.default = Ot;
var zb = Ot;
if (
  // Detect `process` so that it can run in browsers.
  typeof process < "u" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")
) {
  const e = (t) => /^\\\\\?\\/.test(t) || /["<>|\u0000-\u001F]+/u.test(t) ? t : t.replace(/\\/g, "/");
  qe.convert = e;
  const n = /^[a-z]:\//i;
  qe.isNotRelative = (t) => n.test(t) || kp(t);
}
const Ub = /* @__PURE__ */ bn(zb), Mb = (e) => {
  for (; e; ) {
    if (Te.existsSync(q.join(e, ".git")))
      return e;
    const n = q.dirname(e);
    if (n === e) break;
    e = n;
  }
  return null;
};
var Sp = { exports: {} };
function Gb(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var ia = { exports: {} }, ft = q.sep || "/", Hb = Wb;
function Wb(e) {
  if (typeof e != "string" || e.length <= 7 || e.substring(0, 7) != "file://")
    throw new TypeError("must pass in a file:// URI to convert to a file path");
  var n = decodeURI(e.substring(7)), t = n.indexOf("/"), i = n.substring(0, t), a = n.substring(t + 1);
  return i == "localhost" && (i = ""), i && (i = ft + ft + i), a = a.replace(/^(.+)\|/, "$1:"), ft == "\\" && (a = a.replace(/\//g, "\\")), /^.+\:/.test(a) || (a = ft + a), i + a;
}
(function(e, n) {
  var t = Te, i = q, a = Hb, s = i.join, r = i.dirname, p = t.accessSync && function(o) {
    try {
      t.accessSync(o);
    } catch {
      return !1;
    }
    return !0;
  } || t.existsSync || i.existsSync, l = {
    arrow: process.env.NODE_BINDINGS_ARROW || " → ",
    compiled: process.env.NODE_BINDINGS_COMPILED_DIR || "compiled",
    platform: process.platform,
    arch: process.arch,
    nodePreGyp: "node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch,
    version: process.versions.node,
    bindings: "bindings.node",
    try: [
      // node-gyp's linked version in the "build" dir
      ["module_root", "build", "bindings"],
      // node-waf and gyp_addon (a.k.a node-gyp)
      ["module_root", "build", "Debug", "bindings"],
      ["module_root", "build", "Release", "bindings"],
      // Debug files, for development (legacy behavior, remove for node v0.9)
      ["module_root", "out", "Debug", "bindings"],
      ["module_root", "Debug", "bindings"],
      // Release files, but manually compiled (legacy behavior, remove for node v0.9)
      ["module_root", "out", "Release", "bindings"],
      ["module_root", "Release", "bindings"],
      // Legacy from node-waf, node <= 0.4.x
      ["module_root", "build", "default", "bindings"],
      // Production "Release" buildtype binary (meh...)
      ["module_root", "compiled", "version", "platform", "arch", "bindings"],
      // node-qbs builds
      ["module_root", "addon-build", "release", "install-root", "bindings"],
      ["module_root", "addon-build", "debug", "install-root", "bindings"],
      ["module_root", "addon-build", "default", "install-root", "bindings"],
      // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}
      ["module_root", "lib", "binding", "nodePreGyp", "bindings"]
    ]
  };
  function m(o) {
    typeof o == "string" ? o = { bindings: o } : o || (o = {}), Object.keys(l).map(function(b) {
      b in o || (o[b] = l[b]);
    }), o.module_root || (o.module_root = n.getRoot(n.getFileName())), i.extname(o.bindings) != ".node" && (o.bindings += ".node");
    for (var u = typeof __webpack_require__ == "function" ? __non_webpack_require__ : Gb, c = [], d = 0, f = o.try.length, h, g, v; d < f; d++) {
      h = s.apply(
        null,
        o.try[d].map(function(b) {
          return o[b] || b;
        })
      ), c.push(h);
      try {
        return g = o.path ? u.resolve(h) : u(h), o.path || (g.path = h), g;
      } catch (b) {
        if (b.code !== "MODULE_NOT_FOUND" && b.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(b.message))
          throw b;
      }
    }
    throw v = new Error(
      `Could not locate the bindings file. Tried:
` + c.map(function(b) {
        return o.arrow + b;
      }).join(`
`)
    ), v.tries = c, v;
  }
  e.exports = n = m, n.getFileName = function(u) {
    var c = Error.prepareStackTrace, d = Error.stackTraceLimit, f = {}, h;
    Error.stackTraceLimit = 10, Error.prepareStackTrace = function(v, b) {
      for (var y = 0, P = b.length; y < P; y++)
        if (h = b[y].getFileName(), h !== __filename)
          if (u) {
            if (h !== u)
              return;
          } else
            return;
    }, Error.captureStackTrace(f), f.stack, Error.prepareStackTrace = c, Error.stackTraceLimit = d;
    var g = "file://";
    return h.indexOf(g) === 0 && (h = a(h)), h;
  }, n.getRoot = function(u) {
    for (var c = r(u), d; ; ) {
      if (c === "." && (c = process.cwd()), p(s(c, "package.json")) || p(s(c, "node_modules")))
        return c;
      if (d === c)
        throw new Error(
          'Could not find module root given file: "' + u + '". Do you have a `package.json` file? '
        );
      d = c, c = s(c, "..");
    }
  };
})(ia, ia.exports);
var Jb = ia.exports, Vb = Jb("node_sqlite3.node"), Ei = {}, Ur;
function Kb() {
  if (Ur) return Ei;
  Ur = 1;
  const e = ze;
  function n(i, a, s) {
    const r = i[a];
    i[a] = function() {
      const p = new Error(), l = i.constructor.name + "#" + a + "(" + Array.prototype.slice.call(arguments).map(function(o) {
        return e.inspect(o, !1, 0);
      }).join(", ") + ")";
      typeof s > "u" && (s = -1), s < 0 && (s += arguments.length);
      const m = arguments[s];
      return typeof arguments[s] == "function" && (arguments[s] = function() {
        const u = arguments[0];
        return u && u.stack && !u.__augmented && (u.stack = t(u).join(`
`), u.stack += `
--> in ` + l, u.stack += `
` + t(p).slice(1).join(`
`), u.__augmented = !0), m.apply(this, arguments);
      }), r.apply(this, arguments);
    };
  }
  Ei.extendTrace = n;
  function t(i) {
    return i.stack.split(`
`).filter(function(a) {
      return a.indexOf(__filename) < 0;
    });
  }
  return Ei;
}
(function(e, n) {
  const t = q, i = Vb, a = Pp.EventEmitter;
  e.exports = i;
  function s(c) {
    return function(d) {
      let f;
      const h = Array.prototype.slice.call(arguments, 1);
      if (typeof h[h.length - 1] == "function") {
        const v = h[h.length - 1];
        f = function(b) {
          b && v(b);
        };
      }
      const g = new l(this, d, f);
      return c.call(this, g, h);
    };
  }
  function r(c, d) {
    for (const f in d.prototype)
      c.prototype[f] = d.prototype[f];
  }
  i.cached = {
    Database: function(c, d, f) {
      if (c === "" || c === ":memory:")
        return new p(c, d, f);
      let h;
      if (c = t.resolve(c), !i.cached.objects[c])
        h = i.cached.objects[c] = new p(c, d, f);
      else {
        h = i.cached.objects[c];
        const g = typeof d == "number" ? f : d;
        if (typeof g == "function") {
          let v = function() {
            g.call(h, null);
          };
          h.open ? process.nextTick(v) : h.once("open", v);
        }
      }
      return h;
    },
    objects: {}
  };
  const p = i.Database, l = i.Statement, m = i.Backup;
  r(p, a), r(l, a), r(m, a), p.prototype.prepare = s(function(c, d) {
    return d.length ? c.bind.apply(c, d) : c;
  }), p.prototype.run = s(function(c, d) {
    return c.run.apply(c, d).finalize(), this;
  }), p.prototype.get = s(function(c, d) {
    return c.get.apply(c, d).finalize(), this;
  }), p.prototype.all = s(function(c, d) {
    return c.all.apply(c, d).finalize(), this;
  }), p.prototype.each = s(function(c, d) {
    return c.each.apply(c, d).finalize(), this;
  }), p.prototype.map = s(function(c, d) {
    return c.map.apply(c, d).finalize(), this;
  }), p.prototype.backup = function() {
    let c;
    return arguments.length <= 2 ? c = new m(this, arguments[0], "main", "main", !0, arguments[1]) : c = new m(this, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), c.retryErrors = [i.BUSY, i.LOCKED], c;
  }, l.prototype.map = function() {
    const c = Array.prototype.slice.call(arguments), d = c.pop();
    return c.push(function(f, h) {
      if (f) return d(f);
      const g = {};
      if (h.length) {
        const v = Object.keys(h[0]), b = v[0];
        if (v.length > 2)
          for (let y = 0; y < h.length; y++)
            g[h[y][b]] = h[y];
        else {
          const y = v[1];
          for (let P = 0; P < h.length; P++)
            g[h[P][b]] = h[P][y];
        }
      }
      d(f, g);
    }), this.all.apply(this, c);
  };
  let o = !1;
  const u = ["trace", "profile", "change"];
  p.prototype.addListener = p.prototype.on = function(c) {
    const d = a.prototype.addListener.apply(this, arguments);
    return u.indexOf(c) >= 0 && this.configure(c, !0), d;
  }, p.prototype.removeListener = function(c) {
    const d = a.prototype.removeListener.apply(this, arguments);
    return u.indexOf(c) >= 0 && !this._events[c] && this.configure(c, !1), d;
  }, p.prototype.removeAllListeners = function(c) {
    const d = a.prototype.removeAllListeners.apply(this, arguments);
    return u.indexOf(c) >= 0 && this.configure(c, !1), d;
  }, i.verbose = function() {
    if (!o) {
      const c = Kb();
      [
        "prepare",
        "get",
        "run",
        "all",
        "each",
        "map",
        "close",
        "exec"
      ].forEach(function(d) {
        c.extendTrace(p.prototype, d);
      }), [
        "bind",
        "get",
        "run",
        "all",
        "each",
        "map",
        "reset",
        "finalize"
      ].forEach(function(d) {
        c.extendTrace(l.prototype, d);
      }), o = !0;
    }
    return i;
  };
})(Sp);
var Yb = Sp.exports;
const Xb = /* @__PURE__ */ bn(Yb), Qb = Xb.verbose(), Zb = mn.getPath("userData"), Cp = q.join(Zb, "gitviewer.db");
console.log("Database path:", Cp);
const Yt = new Qb.Database(Cp, (e) => {
  e ? console.error("Error opening database", e) : (console.log("Database opened successfully"), Yt.serialize(() => {
    ey();
  }));
});
function ey() {
  Yt.run(`
      CREATE TABLE IF NOT EXISTS git_info(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT NOT NULL
      )
    `, (e) => {
    e ? console.error("Error creating table", e) : console.log("Table created successfully");
  });
}
function Ep(e, n) {
  const t = Yt.prepare("INSERT INTO git_info (data) VALUES (?)", (i) => {
    if (i) {
      console.error("Error preparing statement", i), n(i, null);
      return;
    }
  });
  t.run(JSON.stringify(e), function(i) {
    i ? (console.error("Error inserting data", i), n(i, null)) : (console.log("Data inserted successfully"), n(null, this.lastID));
  }), t.finalize();
}
function ny() {
  Yt.run("DELETE FROM git_info", (e) => {
    e ? console.error("Error deleting data", e) : console.log("Data deleted successfully");
  });
}
const Mr = process.cwd();
function Tp() {
  new Hr({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: q.join(Mr, "dist/preload.js"),
      contextIsolation: !0,
      enableRemoteModule: !1
    }
  }).loadFile(q.join(Mr, "dist/index.html"));
}
an.handle("open-folder", async () => {
  const e = {
    // 設置對話框的選項
    title: "Open Folder",
    // 對話框標題
    properties: ["openDirectory"]
    // 對話框屬性：打開目錄
  }, n = await Gr.showOpenDialog(e);
  if (!n.canceled) {
    const t = n.filePaths[0], i = Te.existsSync(q.join(t, ".git"));
    return { folderPath: t, gitExists: i };
  }
  return null;
});
an.handle("init-git", async (e, n) => {
  var i, a;
  const t = Mb(q.dirname(n));
  if (t && (await Gr.showMessageBox({
    type: "question",
    buttons: ["Yes", "No"],
    defaultId: 1,
    title: "Confirm",
    message: `The parent folder ${t} is already a git repository. Do you still want to run git init?`
  })).response === 1)
    return { status: "cancelled" };
  try {
    return (await X.post("http://localhost:3000/api/git/init", { folderPath: n })).data;
  } catch (s) {
    const r = ((a = (i = s.response) == null ? void 0 : i.data) == null ? void 0 : a.error) || s.message || "Unknown error";
    throw new Error(r);
  }
});
async function Rp(e) {
  try {
    return (await X.get(`http://localhost:3000/api/git/allBranchesInfo?folderPath=${e}`)).data;
  } catch (n) {
    throw console.error("Error fetching git info:", n), n;
  }
}
an.handle("get-git-info", async (e, n) => {
  var t, i;
  try {
    return await Rp(n);
  } catch (a) {
    return { error: ((i = (t = a.response) == null ? void 0 : t.data) == null ? void 0 : i.error) || a.message };
  }
});
an.handle("prepare-temp-git-folder", async (e, n) => {
  try {
    const t = q.join(mn.getPath("userData"), "temp-git-folder");
    Te.existsSync(t) && mt.removeSync(t), mt.mkdirSync(t, { recursive: !0 });
    const i = Ub(), a = (r) => {
      const p = Te.readdirSync(r, { withFileTypes: !0 });
      for (const l of p) {
        const m = q.join(r, l.name);
        if (l.isDirectory())
          a(m);
        else if (l.isFile() && l.name === ".gitignore") {
          const o = Te.readFileSync(m).toString();
          i.add(o);
        }
      }
    };
    a(n);
    const s = async (r, p) => {
      const l = Te.readdirSync(r, { withFileTypes: !0 });
      for (const m of l) {
        const o = q.join(r, m.name), u = q.join(p, m.name), c = q.relative(n, o);
        i.ignores(c) || (m.isDirectory() ? (mt.mkdirSync(u, { recursive: !0 }), await s(o, u)) : mt.copyFileSync(o, u));
      }
    };
    return await s(n, t), t;
  } catch (t) {
    throw console.error("Error preparing temp git folder:", t), t;
  }
});
an.handle("execute-git-command", async (e, { command: n, tempFolderPath: t }) => {
  try {
    const i = Zx(t);
    let [a, ...s] = n.split(" ");
    switch (a.toLowerCase() === "git" && (a = s.shift()), console.log(`mainCommand:${a}`), console.log(`args:${s}`), a) {
      case "add":
        await i.add(s);
        break;
      case "commit":
        const p = s.indexOf("-m");
        if (p !== -1) {
          const l = s.slice(p + 1).join(" ");
          await i.commit(l, s.slice(0, p));
        } else
          await i.commit(s.join(" "));
        break;
      case "status":
        await i.status();
        break;
      default:
        await i.raw([a, ...s]);
    }
    const r = await Rp(t);
    return await new Promise((p, l) => {
      Ep(r, (m, o) => {
        m ? l(m) : p(o);
      });
    }), r;
  } catch (i) {
    throw console.error("Error executing git command:", i), i;
  }
});
an.handle("create-git-info", async (e, n) => new Promise((t, i) => {
  Ep(n, (a, s) => {
    a ? i(a) : t(s);
  });
}));
an.handle("delete-git-info", () => {
  ny();
});
mn.whenReady().then(Tp);
mn.on("window-all-closed", () => {
  process.platform !== "darwin" && mn.quit();
});
mn.on("active", () => {
  Hr.getAllWindows().length === 0 && Tp();
});
//# sourceMappingURL=main.js.map
