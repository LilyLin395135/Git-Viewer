import { app as Ee, ipcMain as ze, dialog as ki, BrowserWindow as Ci } from "electron";
import H from "path";
import ee from "fs";
import je, { TextEncoder as Ec } from "util";
import ue, { Readable as Rc } from "stream";
import la from "http";
import da from "https";
import Gn from "url";
import Sc from "assert";
import Wn from "tty";
import Ti from "os";
import Re from "zlib";
import Oc, { EventEmitter as jc } from "events";
import { spawn as Fc } from "child_process";
import { EventEmitter as Ac } from "node:events";
function Ei(e, n) {
  return function() {
    return e.apply(n, arguments);
  };
}
const { toString: Lc } = Object.prototype, { getPrototypeOf: ma } = Object, Vn = /* @__PURE__ */ ((e) => (n) => {
  const t = Lc.call(n);
  return e[t] || (e[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), he = (e) => (e = e.toLowerCase(), (n) => Vn(n) === e), Kn = (e) => (n) => typeof n === e, { isArray: Ve } = Array, an = Kn("undefined");
function Pc(e) {
  return e !== null && !an(e) && e.constructor !== null && !an(e.constructor) && de(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ri = he("ArrayBuffer");
function Bc(e) {
  let n;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? n = ArrayBuffer.isView(e) : n = e && e.buffer && Ri(e.buffer), n;
}
const Dc = Kn("string"), de = Kn("function"), Si = Kn("number"), Jn = (e) => e !== null && typeof e == "object", Nc = (e) => e === !0 || e === !1, Ln = (e) => {
  if (Vn(e) !== "object")
    return !1;
  const n = ma(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, zc = he("Date"), qc = he("File"), Ic = he("Blob"), Uc = he("FileList"), Mc = (e) => Jn(e) && de(e.pipe), $c = (e) => {
  let n;
  return e && (typeof FormData == "function" && e instanceof FormData || de(e.append) && ((n = Vn(e)) === "formdata" || // detect form-data instance
  n === "object" && de(e.toString) && e.toString() === "[object FormData]"));
}, Hc = he("URLSearchParams"), [Gc, Wc, Vc, Kc] = ["ReadableStream", "Request", "Response", "Headers"].map(he), Jc = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ln(e, n, { allOwnKeys: t = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let a, s;
  if (typeof e != "object" && (e = [e]), Ve(e))
    for (a = 0, s = e.length; a < s; a++)
      n.call(null, e[a], a, e);
  else {
    const i = t ? Object.getOwnPropertyNames(e) : Object.keys(e), r = i.length;
    let u;
    for (a = 0; a < r; a++)
      u = i[a], n.call(null, e[u], u, e);
  }
}
function Oi(e, n) {
  n = n.toLowerCase();
  const t = Object.keys(e);
  let a = t.length, s;
  for (; a-- > 0; )
    if (s = t[a], n === s.toLowerCase())
      return s;
  return null;
}
const ji = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Fi = (e) => !an(e) && e !== ji;
function Dt() {
  const { caseless: e } = Fi(this) && this || {}, n = {}, t = (a, s) => {
    const i = e && Oi(n, s) || s;
    Ln(n[i]) && Ln(a) ? n[i] = Dt(n[i], a) : Ln(a) ? n[i] = Dt({}, a) : Ve(a) ? n[i] = a.slice() : n[i] = a;
  };
  for (let a = 0, s = arguments.length; a < s; a++)
    arguments[a] && ln(arguments[a], t);
  return n;
}
const Yc = (e, n, t, { allOwnKeys: a } = {}) => (ln(n, (s, i) => {
  t && de(s) ? e[i] = Ei(s, t) : e[i] = s;
}, { allOwnKeys: a }), e), Xc = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Qc = (e, n, t, a) => {
  e.prototype = Object.create(n.prototype, a), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: n.prototype
  }), t && Object.assign(e.prototype, t);
}, Zc = (e, n, t, a) => {
  let s, i, r;
  const u = {};
  if (n = n || {}, e == null) return n;
  do {
    for (s = Object.getOwnPropertyNames(e), i = s.length; i-- > 0; )
      r = s[i], (!a || a(r, e, n)) && !u[r] && (n[r] = e[r], u[r] = !0);
    e = t !== !1 && ma(e);
  } while (e && (!t || t(e, n)) && e !== Object.prototype);
  return n;
}, ep = (e, n, t) => {
  e = String(e), (t === void 0 || t > e.length) && (t = e.length), t -= n.length;
  const a = e.indexOf(n, t);
  return a !== -1 && a === t;
}, np = (e) => {
  if (!e) return null;
  if (Ve(e)) return e;
  let n = e.length;
  if (!Si(n)) return null;
  const t = new Array(n);
  for (; n-- > 0; )
    t[n] = e[n];
  return t;
}, tp = /* @__PURE__ */ ((e) => (n) => e && n instanceof e)(typeof Uint8Array < "u" && ma(Uint8Array)), ap = (e, n) => {
  const a = (e && e[Symbol.iterator]).call(e);
  let s;
  for (; (s = a.next()) && !s.done; ) {
    const i = s.value;
    n.call(e, i[0], i[1]);
  }
}, sp = (e, n) => {
  let t;
  const a = [];
  for (; (t = e.exec(n)) !== null; )
    a.push(t);
  return a;
}, ip = he("HTMLFormElement"), op = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, a, s) {
    return a.toUpperCase() + s;
  }
), ns = (({ hasOwnProperty: e }) => (n, t) => e.call(n, t))(Object.prototype), rp = he("RegExp"), Ai = (e, n) => {
  const t = Object.getOwnPropertyDescriptors(e), a = {};
  ln(t, (s, i) => {
    let r;
    (r = n(s, i, e)) !== !1 && (a[i] = r || s);
  }), Object.defineProperties(e, a);
}, cp = (e) => {
  Ai(e, (n, t) => {
    if (de(e) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const a = e[t];
    if (de(a)) {
      if (n.enumerable = !1, "writable" in n) {
        n.writable = !1;
        return;
      }
      n.set || (n.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, pp = (e, n) => {
  const t = {}, a = (s) => {
    s.forEach((i) => {
      t[i] = !0;
    });
  };
  return Ve(e) ? a(e) : a(String(e).split(n)), t;
}, up = () => {
}, lp = (e, n) => e != null && Number.isFinite(e = +e) ? e : n, dt = "abcdefghijklmnopqrstuvwxyz", ts = "0123456789", Li = {
  DIGIT: ts,
  ALPHA: dt,
  ALPHA_DIGIT: dt + dt.toUpperCase() + ts
}, dp = (e = 16, n = Li.ALPHA_DIGIT) => {
  let t = "";
  const { length: a } = n;
  for (; e--; )
    t += n[Math.random() * a | 0];
  return t;
};
function mp(e) {
  return !!(e && de(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const fp = (e) => {
  const n = new Array(10), t = (a, s) => {
    if (Jn(a)) {
      if (n.indexOf(a) >= 0)
        return;
      if (!("toJSON" in a)) {
        n[s] = a;
        const i = Ve(a) ? [] : {};
        return ln(a, (r, u) => {
          const l = t(r, s + 1);
          !an(l) && (i[u] = l);
        }), n[s] = void 0, i;
      }
    }
    return a;
  };
  return t(e, 0);
}, hp = he("AsyncFunction"), xp = (e) => e && (Jn(e) || de(e)) && de(e.then) && de(e.catch), f = {
  isArray: Ve,
  isArrayBuffer: Ri,
  isBuffer: Pc,
  isFormData: $c,
  isArrayBufferView: Bc,
  isString: Dc,
  isNumber: Si,
  isBoolean: Nc,
  isObject: Jn,
  isPlainObject: Ln,
  isReadableStream: Gc,
  isRequest: Wc,
  isResponse: Vc,
  isHeaders: Kc,
  isUndefined: an,
  isDate: zc,
  isFile: qc,
  isBlob: Ic,
  isRegExp: rp,
  isFunction: de,
  isStream: Mc,
  isURLSearchParams: Hc,
  isTypedArray: tp,
  isFileList: Uc,
  forEach: ln,
  merge: Dt,
  extend: Yc,
  trim: Jc,
  stripBOM: Xc,
  inherits: Qc,
  toFlatObject: Zc,
  kindOf: Vn,
  kindOfTest: he,
  endsWith: ep,
  toArray: np,
  forEachEntry: ap,
  matchAll: sp,
  isHTMLForm: ip,
  hasOwnProperty: ns,
  hasOwnProp: ns,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ai,
  freezeMethods: cp,
  toObjectSet: pp,
  toCamelCase: op,
  noop: up,
  toFiniteNumber: lp,
  findKey: Oi,
  global: ji,
  isContextDefined: Fi,
  ALPHABET: Li,
  generateString: dp,
  isSpecCompliantForm: mp,
  toJSONObject: fp,
  isAsyncFn: hp,
  isThenable: xp
};
function k(e, n, t, a, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", n && (this.code = n), t && (this.config = t), a && (this.request = a), s && (this.response = s);
}
f.inherits(k, Error, {
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
      config: f.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Pi = k.prototype, Bi = {};
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
  Bi[e] = { value: e };
});
Object.defineProperties(k, Bi);
Object.defineProperty(Pi, "isAxiosError", { value: !0 });
k.from = (e, n, t, a, s, i) => {
  const r = Object.create(Pi);
  return f.toFlatObject(e, r, function(l) {
    return l !== Error.prototype;
  }, (u) => u !== "isAxiosError"), k.call(r, e.message, n, t, a, s), r.cause = e, r.name = e.name, i && Object.assign(r, i), r;
};
var as = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Yn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Di = ue.Stream, vp = je, gp = xe;
function xe() {
  this.source = null, this.dataSize = 0, this.maxDataSize = 1024 * 1024, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
}
vp.inherits(xe, Di);
xe.create = function(e, n) {
  var t = new this();
  n = n || {};
  for (var a in n)
    t[a] = n[a];
  t.source = e;
  var s = e.emit;
  return e.emit = function() {
    return t._handleEmit(arguments), s.apply(e, arguments);
  }, e.on("error", function() {
  }), t.pauseStream && e.pause(), t;
};
Object.defineProperty(xe.prototype, "readable", {
  configurable: !0,
  enumerable: !0,
  get: function() {
    return this.source.readable;
  }
});
xe.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};
xe.prototype.resume = function() {
  this._released || this.release(), this.source.resume();
};
xe.prototype.pause = function() {
  this.source.pause();
};
xe.prototype.release = function() {
  this._released = !0, this._bufferedEvents.forEach((function(e) {
    this.emit.apply(this, e);
  }).bind(this)), this._bufferedEvents = [];
};
xe.prototype.pipe = function() {
  var e = Di.prototype.pipe.apply(this, arguments);
  return this.resume(), e;
};
xe.prototype._handleEmit = function(e) {
  if (this._released) {
    this.emit.apply(this, e);
    return;
  }
  e[0] === "data" && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e);
};
xe.prototype._checkIfMaxDataSizeExceeded = function() {
  if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
    this._maxDataSizeExceeded = !0;
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this.emit("error", new Error(e));
  }
};
var bp = je, Ni = ue.Stream, ss = gp, yp = q;
function q() {
  this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2 * 1024 * 1024, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
}
bp.inherits(q, Ni);
q.create = function(e) {
  var n = new this();
  e = e || {};
  for (var t in e)
    n[t] = e[t];
  return n;
};
q.isStreamLike = function(e) {
  return typeof e != "function" && typeof e != "string" && typeof e != "boolean" && typeof e != "number" && !Buffer.isBuffer(e);
};
q.prototype.append = function(e) {
  var n = q.isStreamLike(e);
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
q.prototype.pipe = function(e, n) {
  return Ni.prototype.pipe.call(this, e, n), this.resume(), e;
};
q.prototype._getNext = function() {
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
q.prototype._realGetNext = function() {
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
    var a = q.isStreamLike(t);
    a && (t.on("data", this._checkDataSize.bind(this)), this._handleErrors(t)), this._pipeNext(t);
  }).bind(this));
};
q.prototype._pipeNext = function(e) {
  this._currentStream = e;
  var n = q.isStreamLike(e);
  if (n) {
    e.on("end", this._getNext.bind(this)), e.pipe(this, { end: !1 });
    return;
  }
  var t = e;
  this.write(t), this._getNext();
};
q.prototype._handleErrors = function(e) {
  var n = this;
  e.on("error", function(t) {
    n._emitError(t);
  });
};
q.prototype.write = function(e) {
  this.emit("data", e);
};
q.prototype.pause = function() {
  this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
};
q.prototype.resume = function() {
  this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
};
q.prototype.end = function() {
  this._reset(), this.emit("end");
};
q.prototype.destroy = function() {
  this._reset(), this.emit("close");
};
q.prototype._reset = function() {
  this.writable = !1, this._streams = [], this._currentStream = null;
};
q.prototype._checkDataSize = function() {
  if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this._emitError(new Error(e));
  }
};
q.prototype._updateDataSize = function() {
  this.dataSize = 0;
  var e = this;
  this._streams.forEach(function(n) {
    n.dataSize && (e.dataSize += n.dataSize);
  }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
};
q.prototype._emitError = function(e) {
  this._reset(), this.emit("error", e);
};
var zi = {};
const wp = {
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
var _p = wp;
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(e) {
  var n = _p, t = H.extname, a = /^\s*([^;\s]*)(?:;|\s|$)/, s = /^text\//i;
  e.charset = i, e.charsets = { lookup: i }, e.contentType = r, e.extension = u, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = l, e.types = /* @__PURE__ */ Object.create(null), d(e.extensions, e.types);
  function i(p) {
    if (!p || typeof p != "string")
      return !1;
    var c = a.exec(p), o = c && n[c[1].toLowerCase()];
    return o && o.charset ? o.charset : c && s.test(c[1]) ? "UTF-8" : !1;
  }
  function r(p) {
    if (!p || typeof p != "string")
      return !1;
    var c = p.indexOf("/") === -1 ? e.lookup(p) : p;
    if (!c)
      return !1;
    if (c.indexOf("charset") === -1) {
      var o = e.charset(c);
      o && (c += "; charset=" + o.toLowerCase());
    }
    return c;
  }
  function u(p) {
    if (!p || typeof p != "string")
      return !1;
    var c = a.exec(p), o = c && e.extensions[c[1].toLowerCase()];
    return !o || !o.length ? !1 : o[0];
  }
  function l(p) {
    if (!p || typeof p != "string")
      return !1;
    var c = t("x." + p).toLowerCase().substr(1);
    return c && e.types[c] || !1;
  }
  function d(p, c) {
    var o = ["nginx", "apache", void 0, "iana"];
    Object.keys(n).forEach(function(h) {
      var x = n[h], g = x.extensions;
      if (!(!g || !g.length)) {
        p[h] = g;
        for (var v = 0; v < g.length; v++) {
          var w = g[v];
          if (c[w]) {
            var _ = o.indexOf(n[c[w]].source), F = o.indexOf(x.source);
            if (c[w] !== "application/octet-stream" && (_ > F || _ === F && c[w].substr(0, 12) === "application/"))
              continue;
          }
          c[w] = h;
        }
      }
    });
  }
})(zi);
var kp = Cp;
function Cp(e) {
  var n = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
  n ? n(e) : setTimeout(e, 0);
}
var is = kp, qi = Tp;
function Tp(e) {
  var n = !1;
  return is(function() {
    n = !0;
  }), function(a, s) {
    n ? e(a, s) : is(function() {
      e(a, s);
    });
  };
}
var Ii = Ep;
function Ep(e) {
  Object.keys(e.jobs).forEach(Rp.bind(e)), e.jobs = {};
}
function Rp(e) {
  typeof this.jobs[e] == "function" && this.jobs[e]();
}
var os = qi, Sp = Ii, Ui = Op;
function Op(e, n, t, a) {
  var s = t.keyedList ? t.keyedList[t.index] : t.index;
  t.jobs[s] = jp(n, s, e[s], function(i, r) {
    s in t.jobs && (delete t.jobs[s], i ? Sp(t) : t.results[s] = r, a(i, t.results));
  });
}
function jp(e, n, t, a) {
  var s;
  return e.length == 2 ? s = e(t, os(a)) : s = e(t, n, os(a)), s;
}
var Mi = Fp;
function Fp(e, n) {
  var t = !Array.isArray(e), a = {
    index: 0,
    keyedList: t || n ? Object.keys(e) : null,
    jobs: {},
    results: t ? {} : [],
    size: t ? Object.keys(e).length : e.length
  };
  return n && a.keyedList.sort(t ? n : function(s, i) {
    return n(e[s], e[i]);
  }), a;
}
var Ap = Ii, Lp = qi, $i = Pp;
function Pp(e) {
  Object.keys(this.jobs).length && (this.index = this.size, Ap(this), Lp(e)(null, this.results));
}
var Bp = Ui, Dp = Mi, Np = $i, zp = qp;
function qp(e, n, t) {
  for (var a = Dp(e); a.index < (a.keyedList || e).length; )
    Bp(e, n, a, function(s, i) {
      if (s) {
        t(s, i);
        return;
      }
      if (Object.keys(a.jobs).length === 0) {
        t(null, a.results);
        return;
      }
    }), a.index++;
  return Np.bind(a, t);
}
var Xn = { exports: {} }, rs = Ui, Ip = Mi, Up = $i;
Xn.exports = Mp;
Xn.exports.ascending = Hi;
Xn.exports.descending = $p;
function Mp(e, n, t, a) {
  var s = Ip(e, t);
  return rs(e, n, s, function i(r, u) {
    if (r) {
      a(r, u);
      return;
    }
    if (s.index++, s.index < (s.keyedList || e).length) {
      rs(e, n, s, i);
      return;
    }
    a(null, s.results);
  }), Up.bind(s, a);
}
function Hi(e, n) {
  return e < n ? -1 : e > n ? 1 : 0;
}
function $p(e, n) {
  return -1 * Hi(e, n);
}
var Gi = Xn.exports, Hp = Gi, Gp = Wp;
function Wp(e, n, t) {
  return Hp(e, n, null, t);
}
var Vp = {
  parallel: zp,
  serial: Gp,
  serialOrdered: Gi
}, Kp = function(e, n) {
  return Object.keys(n).forEach(function(t) {
    e[t] = e[t] || n[t];
  }), e;
}, fa = yp, Wi = je, mt = H, Jp = la, Yp = da, Xp = Gn.parse, Qp = ee, Zp = ue.Stream, ft = zi, eu = Vp, Nt = Kp, nu = A;
Wi.inherits(A, fa);
function A(e) {
  if (!(this instanceof A))
    return new A(e);
  this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], fa.call(this), e = e || {};
  for (var n in e)
    this[n] = e[n];
}
A.LINE_BREAK = `\r
`;
A.DEFAULT_CONTENT_TYPE = "application/octet-stream";
A.prototype.append = function(e, n, t) {
  t = t || {}, typeof t == "string" && (t = { filename: t });
  var a = fa.prototype.append.bind(this);
  if (typeof n == "number" && (n = "" + n), Wi.isArray(n)) {
    this._error(new Error("Arrays are not supported."));
    return;
  }
  var s = this._multiPartHeader(e, n, t), i = this._multiPartFooter();
  a(s), a(n), a(i), this._trackLength(s, n, t);
};
A.prototype._trackLength = function(e, n, t) {
  var a = 0;
  t.knownLength != null ? a += +t.knownLength : Buffer.isBuffer(n) ? a = n.length : typeof n == "string" && (a = Buffer.byteLength(n)), this._valueLength += a, this._overheadLength += Buffer.byteLength(e) + A.LINE_BREAK.length, !(!n || !n.path && !(n.readable && n.hasOwnProperty("httpVersion")) && !(n instanceof Zp)) && (t.knownLength || this._valuesToMeasure.push(n));
};
A.prototype._lengthRetriever = function(e, n) {
  e.hasOwnProperty("fd") ? e.end != null && e.end != 1 / 0 && e.start != null ? n(null, e.end + 1 - (e.start ? e.start : 0)) : Qp.stat(e.path, function(t, a) {
    var s;
    if (t) {
      n(t);
      return;
    }
    s = a.size - (e.start ? e.start : 0), n(null, s);
  }) : e.hasOwnProperty("httpVersion") ? n(null, +e.headers["content-length"]) : e.hasOwnProperty("httpModule") ? (e.on("response", function(t) {
    e.pause(), n(null, +t.headers["content-length"]);
  }), e.resume()) : n("Unknown stream");
};
A.prototype._multiPartHeader = function(e, n, t) {
  if (typeof t.header == "string")
    return t.header;
  var a = this._getContentDisposition(n, t), s = this._getContentType(n, t), i = "", r = {
    // add custom disposition as third element or keep it two elements if not
    "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(a || []),
    // if no content type. allow it to be empty array
    "Content-Type": [].concat(s || [])
  };
  typeof t.header == "object" && Nt(r, t.header);
  var u;
  for (var l in r)
    r.hasOwnProperty(l) && (u = r[l], u != null && (Array.isArray(u) || (u = [u]), u.length && (i += l + ": " + u.join("; ") + A.LINE_BREAK)));
  return "--" + this.getBoundary() + A.LINE_BREAK + i + A.LINE_BREAK;
};
A.prototype._getContentDisposition = function(e, n) {
  var t, a;
  return typeof n.filepath == "string" ? t = mt.normalize(n.filepath).replace(/\\/g, "/") : n.filename || e.name || e.path ? t = mt.basename(n.filename || e.name || e.path) : e.readable && e.hasOwnProperty("httpVersion") && (t = mt.basename(e.client._httpMessage.path || "")), t && (a = 'filename="' + t + '"'), a;
};
A.prototype._getContentType = function(e, n) {
  var t = n.contentType;
  return !t && e.name && (t = ft.lookup(e.name)), !t && e.path && (t = ft.lookup(e.path)), !t && e.readable && e.hasOwnProperty("httpVersion") && (t = e.headers["content-type"]), !t && (n.filepath || n.filename) && (t = ft.lookup(n.filepath || n.filename)), !t && typeof e == "object" && (t = A.DEFAULT_CONTENT_TYPE), t;
};
A.prototype._multiPartFooter = function() {
  return (function(e) {
    var n = A.LINE_BREAK, t = this._streams.length === 0;
    t && (n += this._lastBoundary()), e(n);
  }).bind(this);
};
A.prototype._lastBoundary = function() {
  return "--" + this.getBoundary() + "--" + A.LINE_BREAK;
};
A.prototype.getHeaders = function(e) {
  var n, t = {
    "content-type": "multipart/form-data; boundary=" + this.getBoundary()
  };
  for (n in e)
    e.hasOwnProperty(n) && (t[n.toLowerCase()] = e[n]);
  return t;
};
A.prototype.setBoundary = function(e) {
  this._boundary = e;
};
A.prototype.getBoundary = function() {
  return this._boundary || this._generateBoundary(), this._boundary;
};
A.prototype.getBuffer = function() {
  for (var e = new Buffer.alloc(0), n = this.getBoundary(), t = 0, a = this._streams.length; t < a; t++)
    typeof this._streams[t] != "function" && (Buffer.isBuffer(this._streams[t]) ? e = Buffer.concat([e, this._streams[t]]) : e = Buffer.concat([e, Buffer.from(this._streams[t])]), (typeof this._streams[t] != "string" || this._streams[t].substring(2, n.length + 2) !== n) && (e = Buffer.concat([e, Buffer.from(A.LINE_BREAK)])));
  return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
};
A.prototype._generateBoundary = function() {
  for (var e = "--------------------------", n = 0; n < 24; n++)
    e += Math.floor(Math.random() * 10).toString(16);
  this._boundary = e;
};
A.prototype.getLengthSync = function() {
  var e = this._overheadLength + this._valueLength;
  return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e;
};
A.prototype.hasKnownLength = function() {
  var e = !0;
  return this._valuesToMeasure.length && (e = !1), e;
};
A.prototype.getLength = function(e) {
  var n = this._overheadLength + this._valueLength;
  if (this._streams.length && (n += this._lastBoundary().length), !this._valuesToMeasure.length) {
    process.nextTick(e.bind(this, null, n));
    return;
  }
  eu.parallel(this._valuesToMeasure, this._lengthRetriever, function(t, a) {
    if (t) {
      e(t);
      return;
    }
    a.forEach(function(s) {
      n += s;
    }), e(null, n);
  });
};
A.prototype.submit = function(e, n) {
  var t, a, s = { method: "post" };
  return typeof e == "string" ? (e = Xp(e), a = Nt({
    port: e.port,
    path: e.pathname,
    host: e.hostname,
    protocol: e.protocol
  }, s)) : (a = Nt(e, s), a.port || (a.port = a.protocol == "https:" ? 443 : 80)), a.headers = this.getHeaders(e.headers), a.protocol == "https:" ? t = Yp.request(a) : t = Jp.request(a), this.getLength((function(i, r) {
    if (i && i !== "Unknown stream") {
      this._error(i);
      return;
    }
    if (r && t.setHeader("Content-Length", r), this.pipe(t), n) {
      var u, l = function(d, p) {
        return t.removeListener("error", l), t.removeListener("response", u), n.call(this, d, p);
      };
      u = l.bind(this, null), t.on("error", l), t.on("response", u);
    }
  }).bind(this)), t;
};
A.prototype._error = function(e) {
  this.error || (this.error = e, this.pause(), this.emit("error", e));
};
A.prototype.toString = function() {
  return "[object FormData]";
};
const Vi = /* @__PURE__ */ Yn(nu);
function zt(e) {
  return f.isPlainObject(e) || f.isArray(e);
}
function Ki(e) {
  return f.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function cs(e, n, t) {
  return e ? e.concat(n).map(function(s, i) {
    return s = Ki(s), !t && i ? "[" + s + "]" : s;
  }).join(t ? "." : "") : n;
}
function tu(e) {
  return f.isArray(e) && !e.some(zt);
}
const au = f.toFlatObject(f, {}, null, function(n) {
  return /^is[A-Z]/.test(n);
});
function Qn(e, n, t) {
  if (!f.isObject(e))
    throw new TypeError("target must be an object");
  n = n || new (Vi || FormData)(), t = f.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(x, g) {
    return !f.isUndefined(g[x]);
  });
  const a = t.metaTokens, s = t.visitor || p, i = t.dots, r = t.indexes, l = (t.Blob || typeof Blob < "u" && Blob) && f.isSpecCompliantForm(n);
  if (!f.isFunction(s))
    throw new TypeError("visitor must be a function");
  function d(h) {
    if (h === null) return "";
    if (f.isDate(h))
      return h.toISOString();
    if (!l && f.isBlob(h))
      throw new k("Blob is not supported. Use a Buffer instead.");
    return f.isArrayBuffer(h) || f.isTypedArray(h) ? l && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function p(h, x, g) {
    let v = h;
    if (h && !g && typeof h == "object") {
      if (f.endsWith(x, "{}"))
        x = a ? x : x.slice(0, -2), h = JSON.stringify(h);
      else if (f.isArray(h) && tu(h) || (f.isFileList(h) || f.endsWith(x, "[]")) && (v = f.toArray(h)))
        return x = Ki(x), v.forEach(function(_, F) {
          !(f.isUndefined(_) || _ === null) && n.append(
            // eslint-disable-next-line no-nested-ternary
            r === !0 ? cs([x], F, i) : r === null ? x : x + "[]",
            d(_)
          );
        }), !1;
    }
    return zt(h) ? !0 : (n.append(cs(g, x, i), d(h)), !1);
  }
  const c = [], o = Object.assign(au, {
    defaultVisitor: p,
    convertValue: d,
    isVisitable: zt
  });
  function m(h, x) {
    if (!f.isUndefined(h)) {
      if (c.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + x.join("."));
      c.push(h), f.forEach(h, function(v, w) {
        (!(f.isUndefined(v) || v === null) && s.call(
          n,
          v,
          f.isString(w) ? w.trim() : w,
          x,
          o
        )) === !0 && m(v, x ? x.concat(w) : [w]);
      }), c.pop();
    }
  }
  if (!f.isObject(e))
    throw new TypeError("data must be an object");
  return m(e), n;
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
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(a) {
    return n[a];
  });
}
function Ji(e, n) {
  this._pairs = [], e && Qn(e, this, n);
}
const Yi = Ji.prototype;
Yi.append = function(n, t) {
  this._pairs.push([n, t]);
};
Yi.toString = function(n) {
  const t = n ? function(a) {
    return n.call(this, a, ps);
  } : ps;
  return this._pairs.map(function(s) {
    return t(s[0]) + "=" + t(s[1]);
  }, "").join("&");
};
function su(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ha(e, n, t) {
  if (!n)
    return e;
  const a = t && t.encode || su, s = t && t.serialize;
  let i;
  if (s ? i = s(n, t) : i = f.isURLSearchParams(n) ? n.toString() : new Ji(n, t).toString(a), i) {
    const r = e.indexOf("#");
    r !== -1 && (e = e.slice(0, r)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class us {
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
  use(n, t, a) {
    return this.handlers.push({
      fulfilled: n,
      rejected: t,
      synchronous: a ? a.synchronous : !1,
      runWhen: a ? a.runWhen : null
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
    f.forEach(this.handlers, function(a) {
      a !== null && n(a);
    });
  }
}
const xa = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, iu = Gn.URLSearchParams, ou = {
  isNode: !0,
  classes: {
    URLSearchParams: iu,
    FormData: Vi,
    Blob: typeof Blob < "u" && Blob || null
  },
  protocols: ["http", "https", "file", "data"]
}, va = typeof window < "u" && typeof document < "u", ru = ((e) => va && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product), cu = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", pu = va && window.location.href || "http://localhost", uu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: va,
  hasStandardBrowserEnv: ru,
  hasStandardBrowserWebWorkerEnv: cu,
  origin: pu
}, Symbol.toStringTag, { value: "Module" })), ce = {
  ...uu,
  ...ou
};
function lu(e, n) {
  return Qn(e, new ce.classes.URLSearchParams(), Object.assign({
    visitor: function(t, a, s, i) {
      return ce.isNode && f.isBuffer(t) ? (this.append(a, t.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, n));
}
function du(e) {
  return f.matchAll(/\w+|\[(\w*)]/g, e).map((n) => n[0] === "[]" ? "" : n[1] || n[0]);
}
function mu(e) {
  const n = {}, t = Object.keys(e);
  let a;
  const s = t.length;
  let i;
  for (a = 0; a < s; a++)
    i = t[a], n[i] = e[i];
  return n;
}
function Xi(e) {
  function n(t, a, s, i) {
    let r = t[i++];
    if (r === "__proto__") return !0;
    const u = Number.isFinite(+r), l = i >= t.length;
    return r = !r && f.isArray(s) ? s.length : r, l ? (f.hasOwnProp(s, r) ? s[r] = [s[r], a] : s[r] = a, !u) : ((!s[r] || !f.isObject(s[r])) && (s[r] = []), n(t, a, s[r], i) && f.isArray(s[r]) && (s[r] = mu(s[r])), !u);
  }
  if (f.isFormData(e) && f.isFunction(e.entries)) {
    const t = {};
    return f.forEachEntry(e, (a, s) => {
      n(du(a), s, t, 0);
    }), t;
  }
  return null;
}
function fu(e, n, t) {
  if (f.isString(e))
    try {
      return (n || JSON.parse)(e), f.trim(e);
    } catch (a) {
      if (a.name !== "SyntaxError")
        throw a;
    }
  return (t || JSON.stringify)(e);
}
const dn = {
  transitional: xa,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(n, t) {
    const a = t.getContentType() || "", s = a.indexOf("application/json") > -1, i = f.isObject(n);
    if (i && f.isHTMLForm(n) && (n = new FormData(n)), f.isFormData(n))
      return s ? JSON.stringify(Xi(n)) : n;
    if (f.isArrayBuffer(n) || f.isBuffer(n) || f.isStream(n) || f.isFile(n) || f.isBlob(n) || f.isReadableStream(n))
      return n;
    if (f.isArrayBufferView(n))
      return n.buffer;
    if (f.isURLSearchParams(n))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), n.toString();
    let u;
    if (i) {
      if (a.indexOf("application/x-www-form-urlencoded") > -1)
        return lu(n, this.formSerializer).toString();
      if ((u = f.isFileList(n)) || a.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return Qn(
          u ? { "files[]": n } : n,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return i || s ? (t.setContentType("application/json", !1), fu(n)) : n;
  }],
  transformResponse: [function(n) {
    const t = this.transitional || dn.transitional, a = t && t.forcedJSONParsing, s = this.responseType === "json";
    if (f.isResponse(n) || f.isReadableStream(n))
      return n;
    if (n && f.isString(n) && (a && !this.responseType || s)) {
      const r = !(t && t.silentJSONParsing) && s;
      try {
        return JSON.parse(n);
      } catch (u) {
        if (r)
          throw u.name === "SyntaxError" ? k.from(u, k.ERR_BAD_RESPONSE, this, null, this.response) : u;
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
    FormData: ce.classes.FormData,
    Blob: ce.classes.Blob
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
f.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  dn.headers[e] = {};
});
const hu = f.toObjectSet([
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
]), xu = (e) => {
  const n = {};
  let t, a, s;
  return e && e.split(`
`).forEach(function(r) {
    s = r.indexOf(":"), t = r.substring(0, s).trim().toLowerCase(), a = r.substring(s + 1).trim(), !(!t || n[t] && hu[t]) && (t === "set-cookie" ? n[t] ? n[t].push(a) : n[t] = [a] : n[t] = n[t] ? n[t] + ", " + a : a);
  }), n;
}, ls = Symbol("internals");
function Qe(e) {
  return e && String(e).trim().toLowerCase();
}
function Pn(e) {
  return e === !1 || e == null ? e : f.isArray(e) ? e.map(Pn) : String(e);
}
function vu(e) {
  const n = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let a;
  for (; a = t.exec(e); )
    n[a[1]] = a[2];
  return n;
}
const gu = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ht(e, n, t, a, s) {
  if (f.isFunction(a))
    return a.call(this, n, t);
  if (s && (n = t), !!f.isString(n)) {
    if (f.isString(a))
      return n.indexOf(a) !== -1;
    if (f.isRegExp(a))
      return a.test(n);
  }
}
function bu(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (n, t, a) => t.toUpperCase() + a);
}
function yu(e, n) {
  const t = f.toCamelCase(" " + n);
  ["get", "set", "has"].forEach((a) => {
    Object.defineProperty(e, a + t, {
      value: function(s, i, r) {
        return this[a].call(this, n, s, i, r);
      },
      configurable: !0
    });
  });
}
class K {
  constructor(n) {
    n && this.set(n);
  }
  set(n, t, a) {
    const s = this;
    function i(u, l, d) {
      const p = Qe(l);
      if (!p)
        throw new Error("header name must be a non-empty string");
      const c = f.findKey(s, p);
      (!c || s[c] === void 0 || d === !0 || d === void 0 && s[c] !== !1) && (s[c || l] = Pn(u));
    }
    const r = (u, l) => f.forEach(u, (d, p) => i(d, p, l));
    if (f.isPlainObject(n) || n instanceof this.constructor)
      r(n, t);
    else if (f.isString(n) && (n = n.trim()) && !gu(n))
      r(xu(n), t);
    else if (f.isHeaders(n))
      for (const [u, l] of n.entries())
        i(l, u, a);
    else
      n != null && i(t, n, a);
    return this;
  }
  get(n, t) {
    if (n = Qe(n), n) {
      const a = f.findKey(this, n);
      if (a) {
        const s = this[a];
        if (!t)
          return s;
        if (t === !0)
          return vu(s);
        if (f.isFunction(t))
          return t.call(this, s, a);
        if (f.isRegExp(t))
          return t.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(n, t) {
    if (n = Qe(n), n) {
      const a = f.findKey(this, n);
      return !!(a && this[a] !== void 0 && (!t || ht(this, this[a], a, t)));
    }
    return !1;
  }
  delete(n, t) {
    const a = this;
    let s = !1;
    function i(r) {
      if (r = Qe(r), r) {
        const u = f.findKey(a, r);
        u && (!t || ht(a, a[u], u, t)) && (delete a[u], s = !0);
      }
    }
    return f.isArray(n) ? n.forEach(i) : i(n), s;
  }
  clear(n) {
    const t = Object.keys(this);
    let a = t.length, s = !1;
    for (; a--; ) {
      const i = t[a];
      (!n || ht(this, this[i], i, n, !0)) && (delete this[i], s = !0);
    }
    return s;
  }
  normalize(n) {
    const t = this, a = {};
    return f.forEach(this, (s, i) => {
      const r = f.findKey(a, i);
      if (r) {
        t[r] = Pn(s), delete t[i];
        return;
      }
      const u = n ? bu(i) : String(i).trim();
      u !== i && delete t[i], t[u] = Pn(s), a[u] = !0;
    }), this;
  }
  concat(...n) {
    return this.constructor.concat(this, ...n);
  }
  toJSON(n) {
    const t = /* @__PURE__ */ Object.create(null);
    return f.forEach(this, (a, s) => {
      a != null && a !== !1 && (t[s] = n && f.isArray(a) ? a.join(", ") : a);
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
    const a = new this(n);
    return t.forEach((s) => a.set(s)), a;
  }
  static accessor(n) {
    const a = (this[ls] = this[ls] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function i(r) {
      const u = Qe(r);
      a[u] || (yu(s, r), a[u] = !0);
    }
    return f.isArray(n) ? n.forEach(i) : i(n), this;
  }
}
K.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
f.reduceDescriptors(K.prototype, ({ value: e }, n) => {
  let t = n[0].toUpperCase() + n.slice(1);
  return {
    get: () => e,
    set(a) {
      this[t] = a;
    }
  };
});
f.freezeMethods(K);
function xt(e, n) {
  const t = this || dn, a = n || t, s = K.from(a.headers);
  let i = a.data;
  return f.forEach(e, function(u) {
    i = u.call(t, i, s.normalize(), n ? n.status : void 0);
  }), s.normalize(), i;
}
function Qi(e) {
  return !!(e && e.__CANCEL__);
}
function Oe(e, n, t) {
  k.call(this, e ?? "canceled", k.ERR_CANCELED, n, t), this.name = "CanceledError";
}
f.inherits(Oe, k, {
  __CANCEL__: !0
});
function Me(e, n, t) {
  const a = t.config.validateStatus;
  !t.status || !a || a(t.status) ? e(t) : n(new k(
    "Request failed with status code " + t.status,
    [k.ERR_BAD_REQUEST, k.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
function wu(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function _u(e, n) {
  return n ? e.replace(/\/?\/$/, "") + "/" + n.replace(/^\/+/, "") : e;
}
function ga(e, n) {
  return e && !wu(n) ? _u(e, n) : n;
}
var ku = Gn.parse, Cu = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, Tu = String.prototype.endsWith || function(e) {
  return e.length <= this.length && this.indexOf(e, this.length - e.length) !== -1;
};
function Eu(e) {
  var n = typeof e == "string" ? ku(e) : e || {}, t = n.protocol, a = n.host, s = n.port;
  if (typeof a != "string" || !a || typeof t != "string" || (t = t.split(":", 1)[0], a = a.replace(/:\d*$/, ""), s = parseInt(s) || Cu[t] || 0, !Ru(a, s)))
    return "";
  var i = $e("npm_config_" + t + "_proxy") || $e(t + "_proxy") || $e("npm_config_proxy") || $e("all_proxy");
  return i && i.indexOf("://") === -1 && (i = t + "://" + i), i;
}
function Ru(e, n) {
  var t = ($e("npm_config_no_proxy") || $e("no_proxy")).toLowerCase();
  return t ? t === "*" ? !1 : t.split(/[,\s]/).every(function(a) {
    if (!a)
      return !0;
    var s = a.match(/^(.+):(\d+)$/), i = s ? s[1] : a, r = s ? parseInt(s[2]) : 0;
    return r && r !== n ? !0 : /^[.*]/.test(i) ? (i.charAt(0) === "*" && (i = i.slice(1)), !Tu.call(e, i)) : e !== i;
  }) : !0;
}
function $e(e) {
  return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
var Su = Eu, ba = { exports: {} }, _n = { exports: {} }, kn = { exports: {} }, vt, ds;
function Ou() {
  if (ds) return vt;
  ds = 1;
  var e = 1e3, n = e * 60, t = n * 60, a = t * 24, s = a * 7, i = a * 365.25;
  vt = function(p, c) {
    c = c || {};
    var o = typeof p;
    if (o === "string" && p.length > 0)
      return r(p);
    if (o === "number" && isFinite(p))
      return c.long ? l(p) : u(p);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(p)
    );
  };
  function r(p) {
    if (p = String(p), !(p.length > 100)) {
      var c = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        p
      );
      if (c) {
        var o = parseFloat(c[1]), m = (c[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return o * i;
          case "weeks":
          case "week":
          case "w":
            return o * s;
          case "days":
          case "day":
          case "d":
            return o * a;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return o * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return o * n;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return o * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return o;
          default:
            return;
        }
      }
    }
  }
  function u(p) {
    var c = Math.abs(p);
    return c >= a ? Math.round(p / a) + "d" : c >= t ? Math.round(p / t) + "h" : c >= n ? Math.round(p / n) + "m" : c >= e ? Math.round(p / e) + "s" : p + "ms";
  }
  function l(p) {
    var c = Math.abs(p);
    return c >= a ? d(p, c, a, "day") : c >= t ? d(p, c, t, "hour") : c >= n ? d(p, c, n, "minute") : c >= e ? d(p, c, e, "second") : p + " ms";
  }
  function d(p, c, o, m) {
    var h = c >= o * 1.5;
    return Math.round(p / o) + " " + m + (h ? "s" : "");
  }
  return vt;
}
var gt, ms;
function Zi() {
  if (ms) return gt;
  ms = 1;
  function e(n) {
    a.debug = a, a.default = a, a.coerce = d, a.disable = r, a.enable = i, a.enabled = u, a.humanize = Ou(), a.destroy = p, Object.keys(n).forEach((c) => {
      a[c] = n[c];
    }), a.names = [], a.skips = [], a.formatters = {};
    function t(c) {
      let o = 0;
      for (let m = 0; m < c.length; m++)
        o = (o << 5) - o + c.charCodeAt(m), o |= 0;
      return a.colors[Math.abs(o) % a.colors.length];
    }
    a.selectColor = t;
    function a(c) {
      let o, m = null, h, x;
      function g(...v) {
        if (!g.enabled)
          return;
        const w = g, _ = Number(/* @__PURE__ */ new Date()), F = _ - (o || _);
        w.diff = F, w.prev = o, w.curr = _, o = _, v[0] = a.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let j = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (D, X) => {
          if (D === "%%")
            return "%";
          j++;
          const Q = a.formatters[X];
          if (typeof Q == "function") {
            const me = v[j];
            D = Q.call(w, me), v.splice(j, 1), j--;
          }
          return D;
        }), a.formatArgs.call(w, v), (w.log || a.log).apply(w, v);
      }
      return g.namespace = c, g.useColors = a.useColors(), g.color = a.selectColor(c), g.extend = s, g.destroy = a.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (h !== a.namespaces && (h = a.namespaces, x = a.enabled(c)), x),
        set: (v) => {
          m = v;
        }
      }), typeof a.init == "function" && a.init(g), g;
    }
    function s(c, o) {
      const m = a(this.namespace + (typeof o > "u" ? ":" : o) + c);
      return m.log = this.log, m;
    }
    function i(c) {
      a.save(c), a.namespaces = c, a.names = [], a.skips = [];
      let o;
      const m = (typeof c == "string" ? c : "").split(/[\s,]+/), h = m.length;
      for (o = 0; o < h; o++)
        m[o] && (c = m[o].replace(/\*/g, ".*?"), c[0] === "-" ? a.skips.push(new RegExp("^" + c.slice(1) + "$")) : a.names.push(new RegExp("^" + c + "$")));
    }
    function r() {
      const c = [
        ...a.names.map(l),
        ...a.skips.map(l).map((o) => "-" + o)
      ].join(",");
      return a.enable(""), c;
    }
    function u(c) {
      if (c[c.length - 1] === "*")
        return !0;
      let o, m;
      for (o = 0, m = a.skips.length; o < m; o++)
        if (a.skips[o].test(c))
          return !1;
      for (o = 0, m = a.names.length; o < m; o++)
        if (a.names[o].test(c))
          return !0;
      return !1;
    }
    function l(c) {
      return c.toString().substring(2, c.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function d(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function p() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return a.enable(a.load()), a;
  }
  return gt = e, gt;
}
var fs;
function ju() {
  return fs || (fs = 1, function(e, n) {
    n.formatArgs = a, n.save = s, n.load = i, n.useColors = t, n.storage = r(), n.destroy = /* @__PURE__ */ (() => {
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
    function a(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const d = "color: " + this.color;
      l.splice(1, 0, d, "color: inherit");
      let p = 0, c = 0;
      l[0].replace(/%[a-zA-Z%]/g, (o) => {
        o !== "%%" && (p++, o === "%c" && (c = p));
      }), l.splice(c, 0, d);
    }
    n.log = console.debug || console.log || (() => {
    });
    function s(l) {
      try {
        l ? n.storage.setItem("debug", l) : n.storage.removeItem("debug");
      } catch {
      }
    }
    function i() {
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
    e.exports = Zi()(n);
    const { formatters: u } = e.exports;
    u.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (d) {
        return "[UnexpectedJSONParseError]: " + d.message;
      }
    };
  }(kn, kn.exports)), kn.exports;
}
var Cn = { exports: {} }, bt, hs;
function Fu() {
  return hs || (hs = 1, bt = (e, n) => {
    n = n || process.argv;
    const t = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", a = n.indexOf(t + e), s = n.indexOf("--");
    return a !== -1 && (s === -1 ? !0 : a < s);
  }), bt;
}
var yt, xs;
function Au() {
  if (xs) return yt;
  xs = 1;
  const e = Ti, n = Fu(), t = process.env;
  let a;
  n("no-color") || n("no-colors") || n("color=false") ? a = !1 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (a = !0), "FORCE_COLOR" in t && (a = t.FORCE_COLOR.length === 0 || parseInt(t.FORCE_COLOR, 10) !== 0);
  function s(u) {
    return u === 0 ? !1 : {
      level: u,
      hasBasic: !0,
      has256: u >= 2,
      has16m: u >= 3
    };
  }
  function i(u) {
    if (a === !1)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (u && !u.isTTY && a !== !0)
      return 0;
    const l = a ? 1 : 0;
    if (process.platform === "win32") {
      const d = e.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(d[0]) >= 10 && Number(d[2]) >= 10586 ? Number(d[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in t)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((d) => d in t) || t.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in t)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(t.TEAMCITY_VERSION) ? 1 : 0;
    if (t.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in t) {
      const d = parseInt((t.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (t.TERM_PROGRAM) {
        case "iTerm.app":
          return d >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(t.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(t.TERM) || "COLORTERM" in t ? 1 : (t.TERM === "dumb", l);
  }
  function r(u) {
    const l = i(u);
    return s(l);
  }
  return yt = {
    supportsColor: r,
    stdout: r(process.stdout),
    stderr: r(process.stderr)
  }, yt;
}
var vs;
function Lu() {
  return vs || (vs = 1, function(e, n) {
    const t = Wn, a = je;
    n.init = p, n.log = u, n.formatArgs = i, n.save = l, n.load = d, n.useColors = s, n.destroy = a.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), n.colors = [6, 2, 3, 4, 5, 1];
    try {
      const o = Au();
      o && (o.stderr || o).level >= 2 && (n.colors = [
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
    n.inspectOpts = Object.keys(process.env).filter((o) => /^debug_/i.test(o)).reduce((o, m) => {
      const h = m.substring(6).toLowerCase().replace(/_([a-z])/g, (g, v) => v.toUpperCase());
      let x = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(x) ? x = !0 : /^(no|off|false|disabled)$/i.test(x) ? x = !1 : x === "null" ? x = null : x = Number(x), o[h] = x, o;
    }, {});
    function s() {
      return "colors" in n.inspectOpts ? !!n.inspectOpts.colors : t.isatty(process.stderr.fd);
    }
    function i(o) {
      const { namespace: m, useColors: h } = this;
      if (h) {
        const x = this.color, g = "\x1B[3" + (x < 8 ? x : "8;5;" + x), v = `  ${g};1m${m} \x1B[0m`;
        o[0] = v + o[0].split(`
`).join(`
` + v), o.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        o[0] = r() + m + " " + o[0];
    }
    function r() {
      return n.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function u(...o) {
      return process.stderr.write(a.formatWithOptions(n.inspectOpts, ...o) + `
`);
    }
    function l(o) {
      o ? process.env.DEBUG = o : delete process.env.DEBUG;
    }
    function d() {
      return process.env.DEBUG;
    }
    function p(o) {
      o.inspectOpts = {};
      const m = Object.keys(n.inspectOpts);
      for (let h = 0; h < m.length; h++)
        o.inspectOpts[m[h]] = n.inspectOpts[m[h]];
    }
    e.exports = Zi()(n);
    const { formatters: c } = e.exports;
    c.o = function(o) {
      return this.inspectOpts.colors = this.useColors, a.inspect(o, this.inspectOpts).split(`
`).map((m) => m.trim()).join(" ");
    }, c.O = function(o) {
      return this.inspectOpts.colors = this.useColors, a.inspect(o, this.inspectOpts);
    };
  }(Cn, Cn.exports)), Cn.exports;
}
var gs;
function Pu() {
  return gs || (gs = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? _n.exports = ju() : _n.exports = Lu()), _n.exports;
}
var Ze, Bu = function() {
  if (!Ze) {
    try {
      Ze = Pu()("follow-redirects");
    } catch {
    }
    typeof Ze != "function" && (Ze = function() {
    });
  }
  Ze.apply(null, arguments);
}, mn = Gn, sn = mn.URL, Du = la, Nu = da, ya = ue.Writable, wa = Sc, eo = Bu, _a = !1;
try {
  wa(new sn());
} catch (e) {
  _a = e.code === "ERR_INVALID_URL";
}
var zu = [
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
], ka = ["abort", "aborted", "connect", "error", "socket", "timeout"], Ca = /* @__PURE__ */ Object.create(null);
ka.forEach(function(e) {
  Ca[e] = function(n, t, a) {
    this._redirectable.emit(e, n, t, a);
  };
});
var qt = fn(
  "ERR_INVALID_URL",
  "Invalid URL",
  TypeError
), It = fn(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
), qu = fn(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded",
  It
), Iu = fn(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
), Uu = fn(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
), Mu = ya.prototype.destroy || to;
function se(e, n) {
  ya.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], n && this.on("response", n);
  var t = this;
  this._onNativeResponse = function(a) {
    try {
      t._processResponse(a);
    } catch (s) {
      t.emit("error", s instanceof It ? s : new It({ cause: s }));
    }
  }, this._performRequest();
}
se.prototype = Object.create(ya.prototype);
se.prototype.abort = function() {
  Ea(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
};
se.prototype.destroy = function(e) {
  return Ea(this._currentRequest, e), Mu.call(this, e), this;
};
se.prototype.write = function(e, n, t) {
  if (this._ending)
    throw new Uu();
  if (!Pe(e) && !Gu(e))
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  if (on(n) && (t = n, n = null), e.length === 0) {
    t && t();
    return;
  }
  this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({ data: e, encoding: n }), this._currentRequest.write(e, n, t)) : (this.emit("error", new Iu()), this.abort());
};
se.prototype.end = function(e, n, t) {
  if (on(e) ? (t = e, e = n = null) : on(n) && (t = n, n = null), !e)
    this._ended = this._ending = !0, this._currentRequest.end(null, null, t);
  else {
    var a = this, s = this._currentRequest;
    this.write(e, n, function() {
      a._ended = !0, s.end(null, null, t);
    }), this._ending = !0;
  }
};
se.prototype.setHeader = function(e, n) {
  this._options.headers[e] = n, this._currentRequest.setHeader(e, n);
};
se.prototype.removeHeader = function(e) {
  delete this._options.headers[e], this._currentRequest.removeHeader(e);
};
se.prototype.setTimeout = function(e, n) {
  var t = this;
  function a(r) {
    r.setTimeout(e), r.removeListener("timeout", r.destroy), r.addListener("timeout", r.destroy);
  }
  function s(r) {
    t._timeout && clearTimeout(t._timeout), t._timeout = setTimeout(function() {
      t.emit("timeout"), i();
    }, e), a(r);
  }
  function i() {
    t._timeout && (clearTimeout(t._timeout), t._timeout = null), t.removeListener("abort", i), t.removeListener("error", i), t.removeListener("response", i), t.removeListener("close", i), n && t.removeListener("timeout", n), t.socket || t._currentRequest.removeListener("socket", s);
  }
  return n && this.on("timeout", n), this.socket ? s(this.socket) : this._currentRequest.once("socket", s), this.on("socket", a), this.on("abort", i), this.on("error", i), this.on("response", i), this.on("close", i), this;
};
[
  "flushHeaders",
  "getHeader",
  "setNoDelay",
  "setSocketKeepAlive"
].forEach(function(e) {
  se.prototype[e] = function(n, t) {
    return this._currentRequest[e](n, t);
  };
});
["aborted", "connection", "socket"].forEach(function(e) {
  Object.defineProperty(se.prototype, e, {
    get: function() {
      return this._currentRequest[e];
    }
  });
});
se.prototype._sanitizeOptions = function(e) {
  if (e.headers || (e.headers = {}), e.host && (e.hostname || (e.hostname = e.host), delete e.host), !e.pathname && e.path) {
    var n = e.path.indexOf("?");
    n < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, n), e.search = e.path.substring(n));
  }
};
se.prototype._performRequest = function() {
  var e = this._options.protocol, n = this._options.nativeProtocols[e];
  if (!n)
    throw new TypeError("Unsupported protocol " + e);
  if (this._options.agents) {
    var t = e.slice(0, -1);
    this._options.agent = this._options.agents[t];
  }
  var a = this._currentRequest = n.request(this._options, this._onNativeResponse);
  a._redirectable = this;
  for (var s of ka)
    a.on(s, Ca[s]);
  if (this._currentUrl = /^\//.test(this._options.path) ? mn.format(this._options) : (
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path
  ), this._isRedirect) {
    var i = 0, r = this, u = this._requestBodyBuffers;
    (function l(d) {
      if (a === r._currentRequest)
        if (d)
          r.emit("error", d);
        else if (i < u.length) {
          var p = u[i++];
          a.finished || a.write(p.data, p.encoding, l);
        } else r._ended && a.end();
    })();
  }
};
se.prototype._processResponse = function(e) {
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
  if (Ea(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects)
    throw new qu();
  var a, s = this._options.beforeRedirect;
  s && (a = Object.assign({
    // The Host header was set by nativeProtocol.request
    Host: e.req.getHeader("host")
  }, this._options.headers));
  var i = this._options.method;
  ((n === 301 || n === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
  // the server is redirecting the user agent to a different resource […]
  // A user agent can perform a retrieval request targeting that URI
  // (a GET or HEAD request if using HTTP) […]
  n === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], wt(/^content-/i, this._options.headers));
  var r = wt(/^host$/i, this._options.headers), u = Ta(this._currentUrl), l = r || u.host, d = /^\w+:/.test(t) ? this._currentUrl : mn.format(Object.assign(u, { host: l })), p = $u(t, d);
  if (eo("redirecting to", p.href), this._isRedirect = !0, Ut(p, this._options), (p.protocol !== u.protocol && p.protocol !== "https:" || p.host !== l && !Hu(p.host, l)) && wt(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers), on(s)) {
    var c = {
      headers: e.headers,
      statusCode: n
    }, o = {
      url: d,
      method: i,
      headers: a
    };
    s(this._options, c, o), this._sanitizeOptions(this._options);
  }
  this._performRequest();
};
function no(e) {
  var n = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  }, t = {};
  return Object.keys(e).forEach(function(a) {
    var s = a + ":", i = t[s] = e[a], r = n[a] = Object.create(i);
    function u(d, p, c) {
      return Wu(d) ? d = Ut(d) : Pe(d) ? d = Ut(Ta(d)) : (c = p, p = ao(d), d = { protocol: s }), on(p) && (c = p, p = null), p = Object.assign({
        maxRedirects: n.maxRedirects,
        maxBodyLength: n.maxBodyLength
      }, d, p), p.nativeProtocols = t, !Pe(p.host) && !Pe(p.hostname) && (p.hostname = "::1"), wa.equal(p.protocol, s, "protocol mismatch"), eo("options", p), new se(p, c);
    }
    function l(d, p, c) {
      var o = r.request(d, p, c);
      return o.end(), o;
    }
    Object.defineProperties(r, {
      request: { value: u, configurable: !0, enumerable: !0, writable: !0 },
      get: { value: l, configurable: !0, enumerable: !0, writable: !0 }
    });
  }), n;
}
function to() {
}
function Ta(e) {
  var n;
  if (_a)
    n = new sn(e);
  else if (n = ao(mn.parse(e)), !Pe(n.protocol))
    throw new qt({ input: e });
  return n;
}
function $u(e, n) {
  return _a ? new sn(e, n) : Ta(mn.resolve(n, e));
}
function ao(e) {
  if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname))
    throw new qt({ input: e.href || e });
  if (/^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host))
    throw new qt({ input: e.href || e });
  return e;
}
function Ut(e, n) {
  var t = n || {};
  for (var a of zu)
    t[a] = e[a];
  return t.hostname.startsWith("[") && (t.hostname = t.hostname.slice(1, -1)), t.port !== "" && (t.port = Number(t.port)), t.path = t.search ? t.pathname + t.search : t.pathname, t;
}
function wt(e, n) {
  var t;
  for (var a in n)
    e.test(a) && (t = n[a], delete n[a]);
  return t === null || typeof t > "u" ? void 0 : String(t).trim();
}
function fn(e, n, t) {
  function a(s) {
    Error.captureStackTrace(this, this.constructor), Object.assign(this, s || {}), this.code = e, this.message = this.cause ? n + ": " + this.cause.message : n;
  }
  return a.prototype = new (t || Error)(), Object.defineProperties(a.prototype, {
    constructor: {
      value: a,
      enumerable: !1
    },
    name: {
      value: "Error [" + e + "]",
      enumerable: !1
    }
  }), a;
}
function Ea(e, n) {
  for (var t of ka)
    e.removeListener(t, Ca[t]);
  e.on("error", to), e.destroy(n);
}
function Hu(e, n) {
  wa(Pe(e) && Pe(n));
  var t = e.length - n.length - 1;
  return t > 0 && e[t] === "." && e.endsWith(n);
}
function Pe(e) {
  return typeof e == "string" || e instanceof String;
}
function on(e) {
  return typeof e == "function";
}
function Gu(e) {
  return typeof e == "object" && "length" in e;
}
function Wu(e) {
  return sn && e instanceof sn;
}
ba.exports = no({ http: Du, https: Nu });
ba.exports.wrap = no;
var Vu = ba.exports;
const Ku = /* @__PURE__ */ Yn(Vu), qn = "1.7.2";
function so(e) {
  const n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return n && n[1] || "";
}
const Ju = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function Yu(e, n, t) {
  const a = t && t.Blob || ce.classes.Blob, s = so(e);
  if (n === void 0 && a && (n = !0), s === "data") {
    e = s.length ? e.slice(s.length + 1) : e;
    const i = Ju.exec(e);
    if (!i)
      throw new k("Invalid URL", k.ERR_INVALID_URL);
    const r = i[1], u = i[2], l = i[3], d = Buffer.from(decodeURIComponent(l), u ? "base64" : "utf8");
    if (n) {
      if (!a)
        throw new k("Blob is not supported", k.ERR_NOT_SUPPORT);
      return new a([d], { type: r });
    }
    return d;
  }
  throw new k("Unsupported protocol " + s, k.ERR_NOT_SUPPORT);
}
function io(e, n) {
  let t = 0;
  const a = 1e3 / n;
  let s = null;
  return function() {
    const r = this === !0, u = Date.now();
    if (r || u - t > a)
      return s && (clearTimeout(s), s = null), t = u, e.apply(null, arguments);
    s || (s = setTimeout(() => (s = null, t = Date.now(), e.apply(null, arguments)), a - (u - t)));
  };
}
function oo(e, n) {
  e = e || 10;
  const t = new Array(e), a = new Array(e);
  let s = 0, i = 0, r;
  return n = n !== void 0 ? n : 1e3, function(l) {
    const d = Date.now(), p = a[i];
    r || (r = d), t[s] = l, a[s] = d;
    let c = i, o = 0;
    for (; c !== s; )
      o += t[c++], c = c % e;
    if (s = (s + 1) % e, s === i && (i = (i + 1) % e), d - r < n)
      return;
    const m = p && d - p;
    return m ? Math.round(o * 1e3 / m) : void 0;
  };
}
const Tn = Symbol("internals");
class bs extends ue.Transform {
  constructor(n) {
    n = f.toFlatObject(n, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (u, l) => !f.isUndefined(l[u])), super({
      readableHighWaterMark: n.chunkSize
    });
    const t = this, a = this[Tn] = {
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
    }, s = oo(a.ticksRate * n.samplesCount, a.timeWindow);
    this.on("newListener", (u) => {
      u === "progress" && (a.isCaptured || (a.isCaptured = !0));
    });
    let i = 0;
    a.updateProgress = io(function() {
      const l = a.length, d = a.bytesSeen, p = d - i;
      if (!p || t.destroyed) return;
      const c = s(p);
      i = d, process.nextTick(() => {
        t.emit("progress", {
          loaded: d,
          total: l,
          progress: l ? d / l : void 0,
          bytes: p,
          rate: c || void 0,
          estimated: c && l && d <= l ? (l - d) / c : void 0,
          lengthComputable: l != null
        });
      });
    }, a.ticksRate);
    const r = () => {
      a.updateProgress.call(!0);
    };
    this.once("end", r), this.once("error", r);
  }
  _read(n) {
    const t = this[Tn];
    return t.onReadCallback && t.onReadCallback(), super._read(n);
  }
  _transform(n, t, a) {
    const s = this, i = this[Tn], r = i.maxRate, u = this.readableHighWaterMark, l = i.timeWindow, d = 1e3 / l, p = r / d, c = i.minChunkSize !== !1 ? Math.max(i.minChunkSize, p * 0.01) : 0;
    function o(h, x) {
      const g = Buffer.byteLength(h);
      i.bytesSeen += g, i.bytes += g, i.isCaptured && i.updateProgress(), s.push(h) ? process.nextTick(x) : i.onReadCallback = () => {
        i.onReadCallback = null, process.nextTick(x);
      };
    }
    const m = (h, x) => {
      const g = Buffer.byteLength(h);
      let v = null, w = u, _, F = 0;
      if (r) {
        const j = Date.now();
        (!i.ts || (F = j - i.ts) >= l) && (i.ts = j, _ = p - i.bytes, i.bytes = _ < 0 ? -_ : 0, F = 0), _ = p - i.bytes;
      }
      if (r) {
        if (_ <= 0)
          return setTimeout(() => {
            x(null, h);
          }, l - F);
        _ < w && (w = _);
      }
      w && g > w && g - w > c && (v = h.subarray(w), h = h.subarray(0, w)), o(h, v ? () => {
        process.nextTick(x, null, v);
      } : x);
    };
    m(n, function h(x, g) {
      if (x)
        return a(x);
      g ? m(g, h) : a(null);
    });
  }
  setLength(n) {
    return this[Tn].length = +n, this;
  }
}
const { asyncIterator: ys } = Symbol, ro = async function* (e) {
  e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[ys] ? yield* e[ys]() : yield e;
}, Xu = f.ALPHABET.ALPHA_DIGIT + "-_", rn = new Ec(), Te = `\r
`, Qu = rn.encode(Te), Zu = 2;
class el {
  constructor(n, t) {
    const { escapeName: a } = this.constructor, s = f.isString(t);
    let i = `Content-Disposition: form-data; name="${a(n)}"${!s && t.name ? `; filename="${a(t.name)}"` : ""}${Te}`;
    s ? t = rn.encode(String(t).replace(/\r?\n|\r\n?/g, Te)) : i += `Content-Type: ${t.type || "application/octet-stream"}${Te}`, this.headers = rn.encode(i + Te), this.contentLength = s ? t.byteLength : t.size, this.size = this.headers.byteLength + this.contentLength + Zu, this.name = n, this.value = t;
  }
  async *encode() {
    yield this.headers;
    const { value: n } = this;
    f.isTypedArray(n) ? yield n : yield* ro(n), yield Qu;
  }
  static escapeName(n) {
    return String(n).replace(/[\r\n"]/g, (t) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[t]);
  }
}
const nl = (e, n, t) => {
  const {
    tag: a = "form-data-boundary",
    size: s = 25,
    boundary: i = a + "-" + f.generateString(s, Xu)
  } = t || {};
  if (!f.isFormData(e))
    throw TypeError("FormData instance required");
  if (i.length < 1 || i.length > 70)
    throw Error("boundary must be 10-70 characters long");
  const r = rn.encode("--" + i + Te), u = rn.encode("--" + i + "--" + Te + Te);
  let l = u.byteLength;
  const d = Array.from(e.entries()).map(([c, o]) => {
    const m = new el(c, o);
    return l += m.size, m;
  });
  l += r.byteLength * d.length, l = f.toFiniteNumber(l);
  const p = {
    "Content-Type": `multipart/form-data; boundary=${i}`
  };
  return Number.isFinite(l) && (p["Content-Length"] = l), n && n(p), Rc.from(async function* () {
    for (const c of d)
      yield r, yield* c.encode();
    yield u;
  }());
};
class tl extends ue.Transform {
  __transform(n, t, a) {
    this.push(n), a();
  }
  _transform(n, t, a) {
    if (n.length !== 0 && (this._transform = this.__transform, n[0] !== 120)) {
      const s = Buffer.alloc(2);
      s[0] = 120, s[1] = 156, this.push(s, t);
    }
    this.__transform(n, t, a);
  }
}
const al = (e, n) => f.isAsyncFn(e) ? function(...t) {
  const a = t.pop();
  e.apply(this, t).then((s) => {
    try {
      n ? a(null, ...n(s)) : a(null, s);
    } catch (i) {
      a(i);
    }
  }, a);
} : e, ws = {
  flush: Re.constants.Z_SYNC_FLUSH,
  finishFlush: Re.constants.Z_SYNC_FLUSH
}, sl = {
  flush: Re.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: Re.constants.BROTLI_OPERATION_FLUSH
}, _s = f.isFunction(Re.createBrotliDecompress), { http: il, https: ol } = Ku, rl = /https:?/, ks = ce.protocols.map((e) => e + ":");
function cl(e, n) {
  e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.config && e.beforeRedirects.config(e, n);
}
function co(e, n, t) {
  let a = n;
  if (!a && a !== !1) {
    const s = Su(t);
    s && (a = new URL(s));
  }
  if (a) {
    if (a.username && (a.auth = (a.username || "") + ":" + (a.password || "")), a.auth) {
      (a.auth.username || a.auth.password) && (a.auth = (a.auth.username || "") + ":" + (a.auth.password || ""));
      const i = Buffer.from(a.auth, "utf8").toString("base64");
      e.headers["Proxy-Authorization"] = "Basic " + i;
    }
    e.headers.host = e.hostname + (e.port ? ":" + e.port : "");
    const s = a.hostname || a.host;
    e.hostname = s, e.host = s, e.port = a.port, e.path = t, a.protocol && (e.protocol = a.protocol.includes(":") ? a.protocol : `${a.protocol}:`);
  }
  e.beforeRedirects.proxy = function(i) {
    co(i, n, i.href);
  };
}
const pl = typeof process < "u" && f.kindOf(process) === "process", ul = (e) => new Promise((n, t) => {
  let a, s;
  const i = (l, d) => {
    s || (s = !0, a && a(l, d));
  }, r = (l) => {
    i(l), n(l);
  }, u = (l) => {
    i(l, !0), t(l);
  };
  e(r, u, (l) => a = l).catch(u);
}), ll = ({ address: e, family: n }) => {
  if (!f.isString(e))
    throw TypeError("address must be a string");
  return {
    address: e,
    family: n || (e.indexOf(".") < 0 ? 6 : 4)
  };
}, Cs = (e, n) => ll(f.isObject(e) ? e : { address: e, family: n }), dl = pl && function(n) {
  return ul(async function(a, s, i) {
    let { data: r, lookup: u, family: l } = n;
    const { responseType: d, responseEncoding: p } = n, c = n.method.toUpperCase();
    let o, m = !1, h;
    if (u) {
      const R = al(u, (S) => f.isArray(S) ? S : [S]);
      u = (S, G, we) => {
        R(S, G, ($, ve, Ye) => {
          if ($)
            return we($);
          const pe = f.isArray(ve) ? ve.map((oe) => Cs(oe)) : [Cs(ve, Ye)];
          G.all ? we($, pe) : we($, pe[0].address, pe[0].family);
        });
      };
    }
    const x = new jc(), g = () => {
      n.cancelToken && n.cancelToken.unsubscribe(v), n.signal && n.signal.removeEventListener("abort", v), x.removeAllListeners();
    };
    i((R, S) => {
      o = !0, S && (m = !0, g());
    });
    function v(R) {
      x.emit("abort", !R || R.type ? new Oe(null, n, h) : R);
    }
    x.once("abort", s), (n.cancelToken || n.signal) && (n.cancelToken && n.cancelToken.subscribe(v), n.signal && (n.signal.aborted ? v() : n.signal.addEventListener("abort", v)));
    const w = ga(n.baseURL, n.url), _ = new URL(w, "http://localhost"), F = _.protocol || ks[0];
    if (F === "data:") {
      let R;
      if (c !== "GET")
        return Me(a, s, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config: n
        });
      try {
        R = Yu(n.url, d === "blob", {
          Blob: n.env && n.env.Blob
        });
      } catch (S) {
        throw k.from(S, k.ERR_BAD_REQUEST, n);
      }
      return d === "text" ? (R = R.toString(p), (!p || p === "utf8") && (R = f.stripBOM(R))) : d === "stream" && (R = ue.Readable.from(R)), Me(a, s, {
        data: R,
        status: 200,
        statusText: "OK",
        headers: new K(),
        config: n
      });
    }
    if (ks.indexOf(F) === -1)
      return s(new k(
        "Unsupported protocol " + F,
        k.ERR_BAD_REQUEST,
        n
      ));
    const j = K.from(n.headers).normalize();
    j.set("User-Agent", "axios/" + qn, !1);
    const W = n.onDownloadProgress, D = n.onUploadProgress, X = n.maxRate;
    let Q, me;
    if (f.isSpecCompliantForm(r)) {
      const R = j.getContentType(/boundary=([-_\w\d]{10,70})/i);
      r = nl(r, (S) => {
        j.set(S);
      }, {
        tag: `axios-${qn}-boundary`,
        boundary: R && R[1] || void 0
      });
    } else if (f.isFormData(r) && f.isFunction(r.getHeaders)) {
      if (j.set(r.getHeaders()), !j.hasContentLength())
        try {
          const R = await je.promisify(r.getLength).call(r);
          Number.isFinite(R) && R >= 0 && j.setContentLength(R);
        } catch {
        }
    } else if (f.isBlob(r))
      r.size && j.setContentType(r.type || "application/octet-stream"), j.setContentLength(r.size || 0), r = ue.Readable.from(ro(r));
    else if (r && !f.isStream(r)) {
      if (!Buffer.isBuffer(r)) if (f.isArrayBuffer(r))
        r = Buffer.from(new Uint8Array(r));
      else if (f.isString(r))
        r = Buffer.from(r, "utf-8");
      else
        return s(new k(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          k.ERR_BAD_REQUEST,
          n
        ));
      if (j.setContentLength(r.length, !1), n.maxBodyLength > -1 && r.length > n.maxBodyLength)
        return s(new k(
          "Request body larger than maxBodyLength limit",
          k.ERR_BAD_REQUEST,
          n
        ));
    }
    const ut = f.toFiniteNumber(j.getContentLength());
    f.isArray(X) ? (Q = X[0], me = X[1]) : Q = me = X, r && (D || Q) && (f.isStream(r) || (r = ue.Readable.from(r, { objectMode: !1 })), r = ue.pipeline([r, new bs({
      length: ut,
      maxRate: f.toFiniteNumber(Q)
    })], f.noop), D && r.on("progress", (R) => {
      D(Object.assign(R, {
        upload: !0
      }));
    }));
    let Ae;
    if (n.auth) {
      const R = n.auth.username || "", S = n.auth.password || "";
      Ae = R + ":" + S;
    }
    if (!Ae && _.username) {
      const R = _.username, S = _.password;
      Ae = R + ":" + S;
    }
    Ae && j.delete("authorization");
    let wn;
    try {
      wn = ha(
        _.pathname + _.search,
        n.params,
        n.paramsSerializer
      ).replace(/^\?/, "");
    } catch (R) {
      const S = new Error(R.message);
      return S.config = n, S.url = n.url, S.exists = !0, s(S);
    }
    j.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (_s ? ", br" : ""),
      !1
    );
    const J = {
      path: wn,
      method: c,
      headers: j.toJSON(),
      agents: { http: n.httpAgent, https: n.httpsAgent },
      auth: Ae,
      protocol: F,
      family: l,
      beforeRedirect: cl,
      beforeRedirects: {}
    };
    !f.isUndefined(u) && (J.lookup = u), n.socketPath ? J.socketPath = n.socketPath : (J.hostname = _.hostname, J.port = _.port, co(J, n.proxy, F + "//" + _.hostname + (_.port ? ":" + _.port : "") + J.path));
    let Ie;
    const Je = rl.test(J.protocol);
    if (J.agent = Je ? n.httpsAgent : n.httpAgent, n.transport ? Ie = n.transport : n.maxRedirects === 0 ? Ie = Je ? da : la : (n.maxRedirects && (J.maxRedirects = n.maxRedirects), n.beforeRedirect && (J.beforeRedirects.config = n.beforeRedirect), Ie = Je ? ol : il), n.maxBodyLength > -1 ? J.maxBodyLength = n.maxBodyLength : J.maxBodyLength = 1 / 0, n.insecureHTTPParser && (J.insecureHTTPParser = n.insecureHTTPParser), h = Ie.request(J, function(S) {
      if (h.destroyed) return;
      const G = [S], we = +S.headers["content-length"];
      if (W) {
        const oe = new bs({
          length: f.toFiniteNumber(we),
          maxRate: f.toFiniteNumber(me)
        });
        W && oe.on("progress", (Ue) => {
          W(Object.assign(Ue, {
            download: !0
          }));
        }), G.push(oe);
      }
      let $ = S;
      const ve = S.req || h;
      if (n.decompress !== !1 && S.headers["content-encoding"])
        switch ((c === "HEAD" || S.statusCode === 204) && delete S.headers["content-encoding"], (S.headers["content-encoding"] || "").toLowerCase()) {
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            G.push(Re.createUnzip(ws)), delete S.headers["content-encoding"];
            break;
          case "deflate":
            G.push(new tl()), G.push(Re.createUnzip(ws)), delete S.headers["content-encoding"];
            break;
          case "br":
            _s && (G.push(Re.createBrotliDecompress(sl)), delete S.headers["content-encoding"]);
        }
      $ = G.length > 1 ? ue.pipeline(G, f.noop) : G[0];
      const Ye = ue.finished($, () => {
        Ye(), g();
      }), pe = {
        status: S.statusCode,
        statusText: S.statusMessage,
        headers: new K(S.headers),
        config: n,
        request: ve
      };
      if (d === "stream")
        pe.data = $, Me(a, s, pe);
      else {
        const oe = [];
        let Ue = 0;
        $.on("data", function(V) {
          oe.push(V), Ue += V.length, n.maxContentLength > -1 && Ue > n.maxContentLength && (m = !0, $.destroy(), s(new k(
            "maxContentLength size of " + n.maxContentLength + " exceeded",
            k.ERR_BAD_RESPONSE,
            n,
            ve
          )));
        }), $.on("aborted", function() {
          if (m)
            return;
          const V = new k(
            "maxContentLength size of " + n.maxContentLength + " exceeded",
            k.ERR_BAD_RESPONSE,
            n,
            ve
          );
          $.destroy(V), s(V);
        }), $.on("error", function(V) {
          h.destroyed || s(k.from(V, null, n, ve));
        }), $.on("end", function() {
          try {
            let V = oe.length === 1 ? oe[0] : Buffer.concat(oe);
            d !== "arraybuffer" && (V = V.toString(p), (!p || p === "utf8") && (V = f.stripBOM(V))), pe.data = V;
          } catch (V) {
            return s(k.from(V, null, n, pe.request, pe));
          }
          Me(a, s, pe);
        });
      }
      x.once("abort", (oe) => {
        $.destroyed || ($.emit("error", oe), $.destroy());
      });
    }), x.once("abort", (R) => {
      s(R), h.destroy(R);
    }), h.on("error", function(S) {
      s(k.from(S, null, n, h));
    }), h.on("socket", function(S) {
      S.setKeepAlive(!0, 1e3 * 60);
    }), n.timeout) {
      const R = parseInt(n.timeout, 10);
      if (Number.isNaN(R)) {
        s(new k(
          "error trying to parse `config.timeout` to int",
          k.ERR_BAD_OPTION_VALUE,
          n,
          h
        ));
        return;
      }
      h.setTimeout(R, function() {
        if (o) return;
        let G = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded";
        const we = n.transitional || xa;
        n.timeoutErrorMessage && (G = n.timeoutErrorMessage), s(new k(
          G,
          we.clarifyTimeoutError ? k.ETIMEDOUT : k.ECONNABORTED,
          n,
          h
        )), v();
      });
    }
    if (f.isStream(r)) {
      let R = !1, S = !1;
      r.on("end", () => {
        R = !0;
      }), r.once("error", (G) => {
        S = !0, h.destroy(G);
      }), r.on("close", () => {
        !R && !S && v(new Oe("Request stream has been aborted", n, h));
      }), r.pipe(h);
    } else
      h.end(r);
  });
}, In = (e, n, t = 3) => {
  let a = 0;
  const s = oo(50, 250);
  return io((i) => {
    const r = i.loaded, u = i.lengthComputable ? i.total : void 0, l = r - a, d = s(l), p = r <= u;
    a = r;
    const c = {
      loaded: r,
      total: u,
      progress: u ? r / u : void 0,
      bytes: l,
      rate: d || void 0,
      estimated: d && u && p ? (u - r) / d : void 0,
      event: i,
      lengthComputable: u != null
    };
    c[n ? "download" : "upload"] = !0, e(c);
  }, t);
}, ml = ce.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const n = /(msie|trident)/i.test(navigator.userAgent), t = document.createElement("a");
    let a;
    function s(i) {
      let r = i;
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
    return a = s(window.location.href), function(r) {
      const u = f.isString(r) ? s(r) : r;
      return u.protocol === a.protocol && u.host === a.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), fl = ce.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, n, t, a, s, i) {
      const r = [e + "=" + encodeURIComponent(n)];
      f.isNumber(t) && r.push("expires=" + new Date(t).toGMTString()), f.isString(a) && r.push("path=" + a), f.isString(s) && r.push("domain=" + s), i === !0 && r.push("secure"), document.cookie = r.join("; ");
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
), Ts = (e) => e instanceof K ? { ...e } : e;
function De(e, n) {
  n = n || {};
  const t = {};
  function a(d, p, c) {
    return f.isPlainObject(d) && f.isPlainObject(p) ? f.merge.call({ caseless: c }, d, p) : f.isPlainObject(p) ? f.merge({}, p) : f.isArray(p) ? p.slice() : p;
  }
  function s(d, p, c) {
    if (f.isUndefined(p)) {
      if (!f.isUndefined(d))
        return a(void 0, d, c);
    } else return a(d, p, c);
  }
  function i(d, p) {
    if (!f.isUndefined(p))
      return a(void 0, p);
  }
  function r(d, p) {
    if (f.isUndefined(p)) {
      if (!f.isUndefined(d))
        return a(void 0, d);
    } else return a(void 0, p);
  }
  function u(d, p, c) {
    if (c in n)
      return a(d, p);
    if (c in e)
      return a(void 0, d);
  }
  const l = {
    url: i,
    method: i,
    data: i,
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
    validateStatus: u,
    headers: (d, p) => s(Ts(d), Ts(p), !0)
  };
  return f.forEach(Object.keys(Object.assign({}, e, n)), function(p) {
    const c = l[p] || s, o = c(e[p], n[p], p);
    f.isUndefined(o) && c !== u || (t[p] = o);
  }), t;
}
const po = (e) => {
  const n = De({}, e);
  let { data: t, withXSRFToken: a, xsrfHeaderName: s, xsrfCookieName: i, headers: r, auth: u } = n;
  n.headers = r = K.from(r), n.url = ha(ga(n.baseURL, n.url), e.params, e.paramsSerializer), u && r.set(
    "Authorization",
    "Basic " + btoa((u.username || "") + ":" + (u.password ? unescape(encodeURIComponent(u.password)) : ""))
  );
  let l;
  if (f.isFormData(t)) {
    if (ce.hasStandardBrowserEnv || ce.hasStandardBrowserWebWorkerEnv)
      r.setContentType(void 0);
    else if ((l = r.getContentType()) !== !1) {
      const [d, ...p] = l ? l.split(";").map((c) => c.trim()).filter(Boolean) : [];
      r.setContentType([d || "multipart/form-data", ...p].join("; "));
    }
  }
  if (ce.hasStandardBrowserEnv && (a && f.isFunction(a) && (a = a(n)), a || a !== !1 && ml(n.url))) {
    const d = s && i && fl.read(i);
    d && r.set(s, d);
  }
  return n;
}, hl = typeof XMLHttpRequest < "u", xl = hl && function(e) {
  return new Promise(function(t, a) {
    const s = po(e);
    let i = s.data;
    const r = K.from(s.headers).normalize();
    let { responseType: u } = s, l;
    function d() {
      s.cancelToken && s.cancelToken.unsubscribe(l), s.signal && s.signal.removeEventListener("abort", l);
    }
    let p = new XMLHttpRequest();
    p.open(s.method.toUpperCase(), s.url, !0), p.timeout = s.timeout;
    function c() {
      if (!p)
        return;
      const m = K.from(
        "getAllResponseHeaders" in p && p.getAllResponseHeaders()
      ), x = {
        data: !u || u === "text" || u === "json" ? p.responseText : p.response,
        status: p.status,
        statusText: p.statusText,
        headers: m,
        config: e,
        request: p
      };
      Me(function(v) {
        t(v), d();
      }, function(v) {
        a(v), d();
      }, x), p = null;
    }
    "onloadend" in p ? p.onloadend = c : p.onreadystatechange = function() {
      !p || p.readyState !== 4 || p.status === 0 && !(p.responseURL && p.responseURL.indexOf("file:") === 0) || setTimeout(c);
    }, p.onabort = function() {
      p && (a(new k("Request aborted", k.ECONNABORTED, s, p)), p = null);
    }, p.onerror = function() {
      a(new k("Network Error", k.ERR_NETWORK, s, p)), p = null;
    }, p.ontimeout = function() {
      let h = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const x = s.transitional || xa;
      s.timeoutErrorMessage && (h = s.timeoutErrorMessage), a(new k(
        h,
        x.clarifyTimeoutError ? k.ETIMEDOUT : k.ECONNABORTED,
        s,
        p
      )), p = null;
    }, i === void 0 && r.setContentType(null), "setRequestHeader" in p && f.forEach(r.toJSON(), function(h, x) {
      p.setRequestHeader(x, h);
    }), f.isUndefined(s.withCredentials) || (p.withCredentials = !!s.withCredentials), u && u !== "json" && (p.responseType = s.responseType), typeof s.onDownloadProgress == "function" && p.addEventListener("progress", In(s.onDownloadProgress, !0)), typeof s.onUploadProgress == "function" && p.upload && p.upload.addEventListener("progress", In(s.onUploadProgress)), (s.cancelToken || s.signal) && (l = (m) => {
      p && (a(!m || m.type ? new Oe(null, e, p) : m), p.abort(), p = null);
    }, s.cancelToken && s.cancelToken.subscribe(l), s.signal && (s.signal.aborted ? l() : s.signal.addEventListener("abort", l)));
    const o = so(s.url);
    if (o && ce.protocols.indexOf(o) === -1) {
      a(new k("Unsupported protocol " + o + ":", k.ERR_BAD_REQUEST, e));
      return;
    }
    p.send(i || null);
  });
}, vl = (e, n) => {
  let t = new AbortController(), a;
  const s = function(l) {
    if (!a) {
      a = !0, r();
      const d = l instanceof Error ? l : this.reason;
      t.abort(d instanceof k ? d : new Oe(d instanceof Error ? d.message : d));
    }
  };
  let i = n && setTimeout(() => {
    s(new k(`timeout ${n} of ms exceeded`, k.ETIMEDOUT));
  }, n);
  const r = () => {
    e && (i && clearTimeout(i), i = null, e.forEach((l) => {
      l && (l.removeEventListener ? l.removeEventListener("abort", s) : l.unsubscribe(s));
    }), e = null);
  };
  e.forEach((l) => l && l.addEventListener && l.addEventListener("abort", s));
  const { signal: u } = t;
  return u.unsubscribe = r, [u, () => {
    i && clearTimeout(i), i = null;
  }];
}, gl = function* (e, n) {
  let t = e.byteLength;
  if (!n || t < n) {
    yield e;
    return;
  }
  let a = 0, s;
  for (; a < t; )
    s = a + n, yield e.slice(a, s), a = s;
}, bl = async function* (e, n, t) {
  for await (const a of e)
    yield* gl(ArrayBuffer.isView(a) ? a : await t(String(a)), n);
}, Es = (e, n, t, a, s) => {
  const i = bl(e, n, s);
  let r = 0;
  return new ReadableStream({
    type: "bytes",
    async pull(u) {
      const { done: l, value: d } = await i.next();
      if (l) {
        u.close(), a();
        return;
      }
      let p = d.byteLength;
      t && t(r += p), u.enqueue(new Uint8Array(d));
    },
    cancel(u) {
      return a(u), i.return();
    }
  }, {
    highWaterMark: 2
  });
}, Rs = (e, n) => {
  const t = e != null;
  return (a) => setTimeout(() => n({
    lengthComputable: t,
    total: e,
    loaded: a
  }));
}, Zn = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", uo = Zn && typeof ReadableStream == "function", Mt = Zn && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (n) => e.encode(n))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), yl = uo && (() => {
  let e = !1;
  const n = new Request(ce.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !n;
})(), Ss = 64 * 1024, $t = uo && !!(() => {
  try {
    return f.isReadableStream(new Response("").body);
  } catch {
  }
})(), Un = {
  stream: $t && ((e) => e.body)
};
Zn && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((n) => {
    !Un[n] && (Un[n] = f.isFunction(e[n]) ? (t) => t[n]() : (t, a) => {
      throw new k(`Response type '${n}' is not supported`, k.ERR_NOT_SUPPORT, a);
    });
  });
})(new Response());
const wl = async (e) => {
  if (e == null)
    return 0;
  if (f.isBlob(e))
    return e.size;
  if (f.isSpecCompliantForm(e))
    return (await new Request(e).arrayBuffer()).byteLength;
  if (f.isArrayBufferView(e))
    return e.byteLength;
  if (f.isURLSearchParams(e) && (e = e + ""), f.isString(e))
    return (await Mt(e)).byteLength;
}, _l = async (e, n) => {
  const t = f.toFiniteNumber(e.getContentLength());
  return t ?? wl(n);
}, kl = Zn && (async (e) => {
  let {
    url: n,
    method: t,
    data: a,
    signal: s,
    cancelToken: i,
    timeout: r,
    onDownloadProgress: u,
    onUploadProgress: l,
    responseType: d,
    headers: p,
    withCredentials: c = "same-origin",
    fetchOptions: o
  } = po(e);
  d = d ? (d + "").toLowerCase() : "text";
  let [m, h] = s || i || r ? vl([s, i], r) : [], x, g;
  const v = () => {
    !x && setTimeout(() => {
      m && m.unsubscribe();
    }), x = !0;
  };
  let w;
  try {
    if (l && yl && t !== "get" && t !== "head" && (w = await _l(p, a)) !== 0) {
      let W = new Request(n, {
        method: "POST",
        body: a,
        duplex: "half"
      }), D;
      f.isFormData(a) && (D = W.headers.get("content-type")) && p.setContentType(D), W.body && (a = Es(W.body, Ss, Rs(
        w,
        In(l)
      ), null, Mt));
    }
    f.isString(c) || (c = c ? "cors" : "omit"), g = new Request(n, {
      ...o,
      signal: m,
      method: t.toUpperCase(),
      headers: p.normalize().toJSON(),
      body: a,
      duplex: "half",
      withCredentials: c
    });
    let _ = await fetch(g);
    const F = $t && (d === "stream" || d === "response");
    if ($t && (u || F)) {
      const W = {};
      ["status", "statusText", "headers"].forEach((X) => {
        W[X] = _[X];
      });
      const D = f.toFiniteNumber(_.headers.get("content-length"));
      _ = new Response(
        Es(_.body, Ss, u && Rs(
          D,
          In(u, !0)
        ), F && v, Mt),
        W
      );
    }
    d = d || "text";
    let j = await Un[f.findKey(Un, d) || "text"](_, e);
    return !F && v(), h && h(), await new Promise((W, D) => {
      Me(W, D, {
        data: j,
        headers: K.from(_.headers),
        status: _.status,
        statusText: _.statusText,
        config: e,
        request: g
      });
    });
  } catch (_) {
    throw v(), _ && _.name === "TypeError" && /fetch/i.test(_.message) ? Object.assign(
      new k("Network Error", k.ERR_NETWORK, e, g),
      {
        cause: _.cause || _
      }
    ) : k.from(_, _ && _.code, e, g);
  }
}), Ht = {
  http: dl,
  xhr: xl,
  fetch: kl
};
f.forEach(Ht, (e, n) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: n });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: n });
  }
});
const Os = (e) => `- ${e}`, Cl = (e) => f.isFunction(e) || e === null || e === !1, lo = {
  getAdapter: (e) => {
    e = f.isArray(e) ? e : [e];
    const { length: n } = e;
    let t, a;
    const s = {};
    for (let i = 0; i < n; i++) {
      t = e[i];
      let r;
      if (a = t, !Cl(t) && (a = Ht[(r = String(t)).toLowerCase()], a === void 0))
        throw new k(`Unknown adapter '${r}'`);
      if (a)
        break;
      s[r || "#" + i] = a;
    }
    if (!a) {
      const i = Object.entries(s).map(
        ([u, l]) => `adapter ${u} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let r = n ? i.length > 1 ? `since :
` + i.map(Os).join(`
`) : " " + Os(i[0]) : "as no adapter specified";
      throw new k(
        "There is no suitable adapter to dispatch the request " + r,
        "ERR_NOT_SUPPORT"
      );
    }
    return a;
  },
  adapters: Ht
};
function _t(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Oe(null, e);
}
function js(e) {
  return _t(e), e.headers = K.from(e.headers), e.data = xt.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), lo.getAdapter(e.adapter || dn.adapter)(e).then(function(a) {
    return _t(e), a.data = xt.call(
      e,
      e.transformResponse,
      a
    ), a.headers = K.from(a.headers), a;
  }, function(a) {
    return Qi(a) || (_t(e), a && a.response && (a.response.data = xt.call(
      e,
      e.transformResponse,
      a.response
    ), a.response.headers = K.from(a.response.headers))), Promise.reject(a);
  });
}
const Ra = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, n) => {
  Ra[e] = function(a) {
    return typeof a === e || "a" + (n < 1 ? "n " : " ") + e;
  };
});
const Fs = {};
Ra.transitional = function(n, t, a) {
  function s(i, r) {
    return "[Axios v" + qn + "] Transitional option '" + i + "'" + r + (a ? ". " + a : "");
  }
  return (i, r, u) => {
    if (n === !1)
      throw new k(
        s(r, " has been removed" + (t ? " in " + t : "")),
        k.ERR_DEPRECATED
      );
    return t && !Fs[r] && (Fs[r] = !0, console.warn(
      s(
        r,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), n ? n(i, r, u) : !0;
  };
};
function Tl(e, n, t) {
  if (typeof e != "object")
    throw new k("options must be an object", k.ERR_BAD_OPTION_VALUE);
  const a = Object.keys(e);
  let s = a.length;
  for (; s-- > 0; ) {
    const i = a[s], r = n[i];
    if (r) {
      const u = e[i], l = u === void 0 || r(u, i, e);
      if (l !== !0)
        throw new k("option " + i + " must be " + l, k.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new k("Unknown option " + i, k.ERR_BAD_OPTION);
  }
}
const Gt = {
  assertOptions: Tl,
  validators: Ra
}, Ce = Gt.validators;
class Be {
  constructor(n) {
    this.defaults = n, this.interceptors = {
      request: new us(),
      response: new us()
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
    } catch (a) {
      if (a instanceof Error) {
        let s;
        Error.captureStackTrace ? Error.captureStackTrace(s = {}) : s = new Error();
        const i = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          a.stack ? i && !String(a.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (a.stack += `
` + i) : a.stack = i;
        } catch {
        }
      }
      throw a;
    }
  }
  _request(n, t) {
    typeof n == "string" ? (t = t || {}, t.url = n) : t = n || {}, t = De(this.defaults, t);
    const { transitional: a, paramsSerializer: s, headers: i } = t;
    a !== void 0 && Gt.assertOptions(a, {
      silentJSONParsing: Ce.transitional(Ce.boolean),
      forcedJSONParsing: Ce.transitional(Ce.boolean),
      clarifyTimeoutError: Ce.transitional(Ce.boolean)
    }, !1), s != null && (f.isFunction(s) ? t.paramsSerializer = {
      serialize: s
    } : Gt.assertOptions(s, {
      encode: Ce.function,
      serialize: Ce.function
    }, !0)), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let r = i && f.merge(
      i.common,
      i[t.method]
    );
    i && f.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete i[h];
      }
    ), t.headers = K.concat(r, i);
    const u = [];
    let l = !0;
    this.interceptors.request.forEach(function(x) {
      typeof x.runWhen == "function" && x.runWhen(t) === !1 || (l = l && x.synchronous, u.unshift(x.fulfilled, x.rejected));
    });
    const d = [];
    this.interceptors.response.forEach(function(x) {
      d.push(x.fulfilled, x.rejected);
    });
    let p, c = 0, o;
    if (!l) {
      const h = [js.bind(this), void 0];
      for (h.unshift.apply(h, u), h.push.apply(h, d), o = h.length, p = Promise.resolve(t); c < o; )
        p = p.then(h[c++], h[c++]);
      return p;
    }
    o = u.length;
    let m = t;
    for (c = 0; c < o; ) {
      const h = u[c++], x = u[c++];
      try {
        m = h(m);
      } catch (g) {
        x.call(this, g);
        break;
      }
    }
    try {
      p = js.call(this, m);
    } catch (h) {
      return Promise.reject(h);
    }
    for (c = 0, o = d.length; c < o; )
      p = p.then(d[c++], d[c++]);
    return p;
  }
  getUri(n) {
    n = De(this.defaults, n);
    const t = ga(n.baseURL, n.url);
    return ha(t, n.params, n.paramsSerializer);
  }
}
f.forEach(["delete", "get", "head", "options"], function(n) {
  Be.prototype[n] = function(t, a) {
    return this.request(De(a || {}, {
      method: n,
      url: t,
      data: (a || {}).data
    }));
  };
});
f.forEach(["post", "put", "patch"], function(n) {
  function t(a) {
    return function(i, r, u) {
      return this.request(De(u || {}, {
        method: n,
        headers: a ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: r
      }));
    };
  }
  Be.prototype[n] = t(), Be.prototype[n + "Form"] = t(!0);
});
class Sa {
  constructor(n) {
    if (typeof n != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(i) {
      t = i;
    });
    const a = this;
    this.promise.then((s) => {
      if (!a._listeners) return;
      let i = a._listeners.length;
      for (; i-- > 0; )
        a._listeners[i](s);
      a._listeners = null;
    }), this.promise.then = (s) => {
      let i;
      const r = new Promise((u) => {
        a.subscribe(u), i = u;
      }).then(s);
      return r.cancel = function() {
        a.unsubscribe(i);
      }, r;
    }, n(function(i, r, u) {
      a.reason || (a.reason = new Oe(i, r, u), t(a.reason));
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
      token: new Sa(function(s) {
        n = s;
      }),
      cancel: n
    };
  }
}
function El(e) {
  return function(t) {
    return e.apply(null, t);
  };
}
function Rl(e) {
  return f.isObject(e) && e.isAxiosError === !0;
}
const Wt = {
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
Object.entries(Wt).forEach(([e, n]) => {
  Wt[n] = e;
});
function mo(e) {
  const n = new Be(e), t = Ei(Be.prototype.request, n);
  return f.extend(t, Be.prototype, n, { allOwnKeys: !0 }), f.extend(t, n, null, { allOwnKeys: !0 }), t.create = function(s) {
    return mo(De(e, s));
  }, t;
}
const I = mo(dn);
I.Axios = Be;
I.CanceledError = Oe;
I.CancelToken = Sa;
I.isCancel = Qi;
I.VERSION = qn;
I.toFormData = Qn;
I.AxiosError = k;
I.Cancel = I.CanceledError;
I.all = function(n) {
  return Promise.all(n);
};
I.spread = El;
I.isAxiosError = Rl;
I.mergeConfig = De;
I.AxiosHeaders = K;
I.formToJSON = (e) => Xi(f.isHTMLForm(e) ? new FormData(e) : e);
I.getAdapter = lo.getAdapter;
I.HttpStatusCode = Wt;
I.default = I;
var Vt = {}, fo = {}, Kt = { exports: {} }, En = { exports: {} }, kt, As;
function Sl() {
  if (As) return kt;
  As = 1;
  var e = 1e3, n = e * 60, t = n * 60, a = t * 24, s = a * 7, i = a * 365.25;
  kt = function(p, c) {
    c = c || {};
    var o = typeof p;
    if (o === "string" && p.length > 0)
      return r(p);
    if (o === "number" && isFinite(p))
      return c.long ? l(p) : u(p);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(p)
    );
  };
  function r(p) {
    if (p = String(p), !(p.length > 100)) {
      var c = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        p
      );
      if (c) {
        var o = parseFloat(c[1]), m = (c[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return o * i;
          case "weeks":
          case "week":
          case "w":
            return o * s;
          case "days":
          case "day":
          case "d":
            return o * a;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return o * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return o * n;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return o * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return o;
          default:
            return;
        }
      }
    }
  }
  function u(p) {
    var c = Math.abs(p);
    return c >= a ? Math.round(p / a) + "d" : c >= t ? Math.round(p / t) + "h" : c >= n ? Math.round(p / n) + "m" : c >= e ? Math.round(p / e) + "s" : p + "ms";
  }
  function l(p) {
    var c = Math.abs(p);
    return c >= a ? d(p, c, a, "day") : c >= t ? d(p, c, t, "hour") : c >= n ? d(p, c, n, "minute") : c >= e ? d(p, c, e, "second") : p + " ms";
  }
  function d(p, c, o, m) {
    var h = c >= o * 1.5;
    return Math.round(p / o) + " " + m + (h ? "s" : "");
  }
  return kt;
}
var Ct, Ls;
function ho() {
  if (Ls) return Ct;
  Ls = 1;
  function e(n) {
    a.debug = a, a.default = a, a.coerce = d, a.disable = r, a.enable = i, a.enabled = u, a.humanize = Sl(), a.destroy = p, Object.keys(n).forEach((c) => {
      a[c] = n[c];
    }), a.names = [], a.skips = [], a.formatters = {};
    function t(c) {
      let o = 0;
      for (let m = 0; m < c.length; m++)
        o = (o << 5) - o + c.charCodeAt(m), o |= 0;
      return a.colors[Math.abs(o) % a.colors.length];
    }
    a.selectColor = t;
    function a(c) {
      let o, m = null, h, x;
      function g(...v) {
        if (!g.enabled)
          return;
        const w = g, _ = Number(/* @__PURE__ */ new Date()), F = _ - (o || _);
        w.diff = F, w.prev = o, w.curr = _, o = _, v[0] = a.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let j = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (D, X) => {
          if (D === "%%")
            return "%";
          j++;
          const Q = a.formatters[X];
          if (typeof Q == "function") {
            const me = v[j];
            D = Q.call(w, me), v.splice(j, 1), j--;
          }
          return D;
        }), a.formatArgs.call(w, v), (w.log || a.log).apply(w, v);
      }
      return g.namespace = c, g.useColors = a.useColors(), g.color = a.selectColor(c), g.extend = s, g.destroy = a.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (h !== a.namespaces && (h = a.namespaces, x = a.enabled(c)), x),
        set: (v) => {
          m = v;
        }
      }), typeof a.init == "function" && a.init(g), g;
    }
    function s(c, o) {
      const m = a(this.namespace + (typeof o > "u" ? ":" : o) + c);
      return m.log = this.log, m;
    }
    function i(c) {
      a.save(c), a.namespaces = c, a.names = [], a.skips = [];
      let o;
      const m = (typeof c == "string" ? c : "").split(/[\s,]+/), h = m.length;
      for (o = 0; o < h; o++)
        m[o] && (c = m[o].replace(/\*/g, ".*?"), c[0] === "-" ? a.skips.push(new RegExp("^" + c.slice(1) + "$")) : a.names.push(new RegExp("^" + c + "$")));
    }
    function r() {
      const c = [
        ...a.names.map(l),
        ...a.skips.map(l).map((o) => "-" + o)
      ].join(",");
      return a.enable(""), c;
    }
    function u(c) {
      if (c[c.length - 1] === "*")
        return !0;
      let o, m;
      for (o = 0, m = a.skips.length; o < m; o++)
        if (a.skips[o].test(c))
          return !1;
      for (o = 0, m = a.names.length; o < m; o++)
        if (a.names[o].test(c))
          return !0;
      return !1;
    }
    function l(c) {
      return c.toString().substring(2, c.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function d(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function p() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return a.enable(a.load()), a;
  }
  return Ct = e, Ct;
}
var Ps;
function Ol() {
  return Ps || (Ps = 1, function(e, n) {
    n.formatArgs = a, n.save = s, n.load = i, n.useColors = t, n.storage = r(), n.destroy = /* @__PURE__ */ (() => {
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
    function a(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const d = "color: " + this.color;
      l.splice(1, 0, d, "color: inherit");
      let p = 0, c = 0;
      l[0].replace(/%[a-zA-Z%]/g, (o) => {
        o !== "%%" && (p++, o === "%c" && (c = p));
      }), l.splice(c, 0, d);
    }
    n.log = console.debug || console.log || (() => {
    });
    function s(l) {
      try {
        l ? n.storage.setItem("debug", l) : n.storage.removeItem("debug");
      } catch {
      }
    }
    function i() {
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
    e.exports = ho()(n);
    const { formatters: u } = e.exports;
    u.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (d) {
        return "[UnexpectedJSONParseError]: " + d.message;
      }
    };
  }(En, En.exports)), En.exports;
}
var Rn = { exports: {} }, Tt, Bs;
function jl() {
  return Bs || (Bs = 1, Tt = (e, n = process.argv) => {
    const t = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", a = n.indexOf(t + e), s = n.indexOf("--");
    return a !== -1 && (s === -1 || a < s);
  }), Tt;
}
var Et, Ds;
function xo() {
  if (Ds) return Et;
  Ds = 1;
  const e = Ti, n = Wn, t = jl(), { env: a } = process;
  let s;
  t("no-color") || t("no-colors") || t("color=false") || t("color=never") ? s = 0 : (t("color") || t("colors") || t("color=true") || t("color=always")) && (s = 1), "FORCE_COLOR" in a && (a.FORCE_COLOR === "true" ? s = 1 : a.FORCE_COLOR === "false" ? s = 0 : s = a.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(a.FORCE_COLOR, 10), 3));
  function i(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function r(l, d) {
    if (s === 0)
      return 0;
    if (t("color=16m") || t("color=full") || t("color=truecolor"))
      return 3;
    if (t("color=256"))
      return 2;
    if (l && !d && s === void 0)
      return 0;
    const p = s || 0;
    if (a.TERM === "dumb")
      return p;
    if (process.platform === "win32") {
      const c = e.release().split(".");
      return Number(c[0]) >= 10 && Number(c[2]) >= 10586 ? Number(c[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in a)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((c) => c in a) || a.CI_NAME === "codeship" ? 1 : p;
    if ("TEAMCITY_VERSION" in a)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(a.TEAMCITY_VERSION) ? 1 : 0;
    if (a.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in a) {
      const c = parseInt((a.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (a.TERM_PROGRAM) {
        case "iTerm.app":
          return c >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(a.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(a.TERM) || "COLORTERM" in a ? 1 : p;
  }
  function u(l) {
    const d = r(l, l && l.isTTY);
    return i(d);
  }
  return Et = {
    supportsColor: u,
    stdout: i(r(!0, n.isatty(1))),
    stderr: i(r(!0, n.isatty(2)))
  }, Et;
}
var Ns;
function Fl() {
  return Ns || (Ns = 1, function(e, n) {
    const t = Wn, a = je;
    n.init = p, n.log = u, n.formatArgs = i, n.save = l, n.load = d, n.useColors = s, n.destroy = a.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), n.colors = [6, 2, 3, 4, 5, 1];
    try {
      const o = xo();
      o && (o.stderr || o).level >= 2 && (n.colors = [
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
    n.inspectOpts = Object.keys(process.env).filter((o) => /^debug_/i.test(o)).reduce((o, m) => {
      const h = m.substring(6).toLowerCase().replace(/_([a-z])/g, (g, v) => v.toUpperCase());
      let x = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(x) ? x = !0 : /^(no|off|false|disabled)$/i.test(x) ? x = !1 : x === "null" ? x = null : x = Number(x), o[h] = x, o;
    }, {});
    function s() {
      return "colors" in n.inspectOpts ? !!n.inspectOpts.colors : t.isatty(process.stderr.fd);
    }
    function i(o) {
      const { namespace: m, useColors: h } = this;
      if (h) {
        const x = this.color, g = "\x1B[3" + (x < 8 ? x : "8;5;" + x), v = `  ${g};1m${m} \x1B[0m`;
        o[0] = v + o[0].split(`
`).join(`
` + v), o.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        o[0] = r() + m + " " + o[0];
    }
    function r() {
      return n.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function u(...o) {
      return process.stderr.write(a.formatWithOptions(n.inspectOpts, ...o) + `
`);
    }
    function l(o) {
      o ? process.env.DEBUG = o : delete process.env.DEBUG;
    }
    function d() {
      return process.env.DEBUG;
    }
    function p(o) {
      o.inspectOpts = {};
      const m = Object.keys(n.inspectOpts);
      for (let h = 0; h < m.length; h++)
        o.inspectOpts[m[h]] = n.inspectOpts[m[h]];
    }
    e.exports = ho()(n);
    const { formatters: c } = e.exports;
    c.o = function(o) {
      return this.inspectOpts.colors = this.useColors, a.inspect(o, this.inspectOpts).split(`
`).map((m) => m.trim()).join(" ");
    }, c.O = function(o) {
      return this.inspectOpts.colors = this.useColors, a.inspect(o, this.inspectOpts);
    };
  }(Rn, Rn.exports)), Rn.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Kt.exports = Ol() : Kt.exports = Fl();
var Al = Kt.exports;
(function(e) {
  var n = as && as.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(e, "__esModule", { value: !0 });
  const t = ee, s = n(Al).default("@kwsites/file-exists");
  function i(u, l, d) {
    s("checking %s", u);
    try {
      const p = t.statSync(u);
      return p.isFile() && l ? (s("[OK] path represents a file"), !0) : p.isDirectory() && d ? (s("[OK] path represents a directory"), !0) : (s("[FAIL] path represents something other than a file or directory"), !1);
    } catch (p) {
      if (p.code === "ENOENT")
        return s("[FAIL] path is not accessible: %o", p), !1;
      throw s("[FATAL] %o", p), p;
    }
  }
  function r(u, l = e.READABLE) {
    return i(u, (l & e.FILE) > 0, (l & e.FOLDER) > 0);
  }
  e.exists = r, e.FILE = 1, e.FOLDER = 2, e.READABLE = e.FILE + e.FOLDER;
})(fo);
(function(e) {
  function n(t) {
    for (var a in t) e.hasOwnProperty(a) || (e[a] = t[a]);
  }
  Object.defineProperty(e, "__esModule", { value: !0 }), n(fo);
})(Vt);
var Jt = { exports: {} }, Sn = { exports: {} }, Rt, zs;
function Ll() {
  if (zs) return Rt;
  zs = 1;
  var e = 1e3, n = e * 60, t = n * 60, a = t * 24, s = a * 7, i = a * 365.25;
  Rt = function(p, c) {
    c = c || {};
    var o = typeof p;
    if (o === "string" && p.length > 0)
      return r(p);
    if (o === "number" && isFinite(p))
      return c.long ? l(p) : u(p);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(p)
    );
  };
  function r(p) {
    if (p = String(p), !(p.length > 100)) {
      var c = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        p
      );
      if (c) {
        var o = parseFloat(c[1]), m = (c[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return o * i;
          case "weeks":
          case "week":
          case "w":
            return o * s;
          case "days":
          case "day":
          case "d":
            return o * a;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return o * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return o * n;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return o * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return o;
          default:
            return;
        }
      }
    }
  }
  function u(p) {
    var c = Math.abs(p);
    return c >= a ? Math.round(p / a) + "d" : c >= t ? Math.round(p / t) + "h" : c >= n ? Math.round(p / n) + "m" : c >= e ? Math.round(p / e) + "s" : p + "ms";
  }
  function l(p) {
    var c = Math.abs(p);
    return c >= a ? d(p, c, a, "day") : c >= t ? d(p, c, t, "hour") : c >= n ? d(p, c, n, "minute") : c >= e ? d(p, c, e, "second") : p + " ms";
  }
  function d(p, c, o, m) {
    var h = c >= o * 1.5;
    return Math.round(p / o) + " " + m + (h ? "s" : "");
  }
  return Rt;
}
var St, qs;
function vo() {
  if (qs) return St;
  qs = 1;
  function e(n) {
    a.debug = a, a.default = a, a.coerce = d, a.disable = r, a.enable = i, a.enabled = u, a.humanize = Ll(), a.destroy = p, Object.keys(n).forEach((c) => {
      a[c] = n[c];
    }), a.names = [], a.skips = [], a.formatters = {};
    function t(c) {
      let o = 0;
      for (let m = 0; m < c.length; m++)
        o = (o << 5) - o + c.charCodeAt(m), o |= 0;
      return a.colors[Math.abs(o) % a.colors.length];
    }
    a.selectColor = t;
    function a(c) {
      let o, m = null, h, x;
      function g(...v) {
        if (!g.enabled)
          return;
        const w = g, _ = Number(/* @__PURE__ */ new Date()), F = _ - (o || _);
        w.diff = F, w.prev = o, w.curr = _, o = _, v[0] = a.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let j = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (D, X) => {
          if (D === "%%")
            return "%";
          j++;
          const Q = a.formatters[X];
          if (typeof Q == "function") {
            const me = v[j];
            D = Q.call(w, me), v.splice(j, 1), j--;
          }
          return D;
        }), a.formatArgs.call(w, v), (w.log || a.log).apply(w, v);
      }
      return g.namespace = c, g.useColors = a.useColors(), g.color = a.selectColor(c), g.extend = s, g.destroy = a.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (h !== a.namespaces && (h = a.namespaces, x = a.enabled(c)), x),
        set: (v) => {
          m = v;
        }
      }), typeof a.init == "function" && a.init(g), g;
    }
    function s(c, o) {
      const m = a(this.namespace + (typeof o > "u" ? ":" : o) + c);
      return m.log = this.log, m;
    }
    function i(c) {
      a.save(c), a.namespaces = c, a.names = [], a.skips = [];
      let o;
      const m = (typeof c == "string" ? c : "").split(/[\s,]+/), h = m.length;
      for (o = 0; o < h; o++)
        m[o] && (c = m[o].replace(/\*/g, ".*?"), c[0] === "-" ? a.skips.push(new RegExp("^" + c.slice(1) + "$")) : a.names.push(new RegExp("^" + c + "$")));
    }
    function r() {
      const c = [
        ...a.names.map(l),
        ...a.skips.map(l).map((o) => "-" + o)
      ].join(",");
      return a.enable(""), c;
    }
    function u(c) {
      if (c[c.length - 1] === "*")
        return !0;
      let o, m;
      for (o = 0, m = a.skips.length; o < m; o++)
        if (a.skips[o].test(c))
          return !1;
      for (o = 0, m = a.names.length; o < m; o++)
        if (a.names[o].test(c))
          return !0;
      return !1;
    }
    function l(c) {
      return c.toString().substring(2, c.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function d(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function p() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return a.enable(a.load()), a;
  }
  return St = e, St;
}
var Is;
function Pl() {
  return Is || (Is = 1, function(e, n) {
    n.formatArgs = a, n.save = s, n.load = i, n.useColors = t, n.storage = r(), n.destroy = /* @__PURE__ */ (() => {
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
    function a(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const d = "color: " + this.color;
      l.splice(1, 0, d, "color: inherit");
      let p = 0, c = 0;
      l[0].replace(/%[a-zA-Z%]/g, (o) => {
        o !== "%%" && (p++, o === "%c" && (c = p));
      }), l.splice(c, 0, d);
    }
    n.log = console.debug || console.log || (() => {
    });
    function s(l) {
      try {
        l ? n.storage.setItem("debug", l) : n.storage.removeItem("debug");
      } catch {
      }
    }
    function i() {
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
    e.exports = vo()(n);
    const { formatters: u } = e.exports;
    u.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (d) {
        return "[UnexpectedJSONParseError]: " + d.message;
      }
    };
  }(Sn, Sn.exports)), Sn.exports;
}
var On = { exports: {} }, Us;
function Bl() {
  return Us || (Us = 1, function(e, n) {
    const t = Wn, a = je;
    n.init = p, n.log = u, n.formatArgs = i, n.save = l, n.load = d, n.useColors = s, n.destroy = a.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), n.colors = [6, 2, 3, 4, 5, 1];
    try {
      const o = xo();
      o && (o.stderr || o).level >= 2 && (n.colors = [
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
    n.inspectOpts = Object.keys(process.env).filter((o) => /^debug_/i.test(o)).reduce((o, m) => {
      const h = m.substring(6).toLowerCase().replace(/_([a-z])/g, (g, v) => v.toUpperCase());
      let x = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(x) ? x = !0 : /^(no|off|false|disabled)$/i.test(x) ? x = !1 : x === "null" ? x = null : x = Number(x), o[h] = x, o;
    }, {});
    function s() {
      return "colors" in n.inspectOpts ? !!n.inspectOpts.colors : t.isatty(process.stderr.fd);
    }
    function i(o) {
      const { namespace: m, useColors: h } = this;
      if (h) {
        const x = this.color, g = "\x1B[3" + (x < 8 ? x : "8;5;" + x), v = `  ${g};1m${m} \x1B[0m`;
        o[0] = v + o[0].split(`
`).join(`
` + v), o.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        o[0] = r() + m + " " + o[0];
    }
    function r() {
      return n.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function u(...o) {
      return process.stderr.write(a.formatWithOptions(n.inspectOpts, ...o) + `
`);
    }
    function l(o) {
      o ? process.env.DEBUG = o : delete process.env.DEBUG;
    }
    function d() {
      return process.env.DEBUG;
    }
    function p(o) {
      o.inspectOpts = {};
      const m = Object.keys(n.inspectOpts);
      for (let h = 0; h < m.length; h++)
        o.inspectOpts[m[h]] = n.inspectOpts[m[h]];
    }
    e.exports = vo()(n);
    const { formatters: c } = e.exports;
    c.o = function(o) {
      return this.inspectOpts.colors = this.useColors, a.inspect(o, this.inspectOpts).split(`
`).map((m) => m.trim()).join(" ");
    }, c.O = function(o) {
      return this.inspectOpts.colors = this.useColors, a.inspect(o, this.inspectOpts);
    };
  }(On, On.exports)), On.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Jt.exports = Pl() : Jt.exports = Bl();
var Dl = Jt.exports;
const Yt = /* @__PURE__ */ Yn(Dl);
var Ge = {};
Object.defineProperty(Ge, "__esModule", { value: !0 });
var go = Ge.createDeferred = He = Ge.deferred = void 0;
function Oa() {
  let e, n, t = "pending";
  return {
    promise: new Promise((s, i) => {
      e = s, n = i;
    }),
    done(s) {
      t === "pending" && (t = "resolved", e(s));
    },
    fail(s) {
      t === "pending" && (t = "rejected", n(s));
    },
    get fulfilled() {
      return t !== "pending";
    },
    get status() {
      return t;
    }
  };
}
var He = Ge.deferred = Oa;
go = Ge.createDeferred = Oa;
Ge.default = Oa;
var et = Object.defineProperty, Nl = Object.defineProperties, zl = Object.getOwnPropertyDescriptor, ql = Object.getOwnPropertyDescriptors, ja = Object.getOwnPropertyNames, Ms = Object.getOwnPropertySymbols, bo = Object.prototype.hasOwnProperty, Il = Object.prototype.propertyIsEnumerable, $s = (e, n, t) => n in e ? et(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, le = (e, n) => {
  for (var t in n || (n = {}))
    bo.call(n, t) && $s(e, t, n[t]);
  if (Ms)
    for (var t of Ms(n))
      Il.call(n, t) && $s(e, t, n[t]);
  return e;
}, tn = (e, n) => Nl(e, ql(n)), y = (e, n) => function() {
  return e && (n = (0, e[ja(e)[0]])(e = 0)), n;
}, Ul = (e, n) => function() {
  return n || (0, e[ja(e)[0]])((n = { exports: {} }).exports, n), n.exports;
}, M = (e, n) => {
  for (var t in n)
    et(e, t, { get: n[t], enumerable: !0 });
}, Ml = (e, n, t, a) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let s of ja(n))
      !bo.call(e, s) && s !== t && et(e, s, { get: () => n[s], enumerable: !(a = zl(n, s)) || a.enumerable });
  return e;
}, N = (e) => Ml(et({}, "__esModule", { value: !0 }), e), nn = (e, n, t) => new Promise((a, s) => {
  var i = (l) => {
    try {
      u(t.next(l));
    } catch (d) {
      s(d);
    }
  }, r = (l) => {
    try {
      u(t.throw(l));
    } catch (d) {
      s(d);
    }
  }, u = (l) => l.done ? a(l.value) : Promise.resolve(l.value).then(i, r);
  u((t = t.apply(e, n)).next());
});
function $l(...e) {
  const n = new String(e);
  return nt.set(n, e), n;
}
function Mn(e) {
  return e instanceof String && nt.has(e);
}
function Hs(e) {
  return nt.get(e) || [];
}
var nt, hn = y({
  "src/lib/args/pathspec.ts"() {
    nt = /* @__PURE__ */ new WeakMap();
  }
}), ke, Fe = y({
  "src/lib/errors/git-error.ts"() {
    ke = class extends Error {
      constructor(e, n) {
        super(n), this.task = e, Object.setPrototypeOf(this, new.target.prototype);
      }
    };
  }
}), xn, Ke = y({
  "src/lib/errors/git-response-error.ts"() {
    Fe(), xn = class extends ke {
      constructor(e, n) {
        super(void 0, n || String(e)), this.git = e;
      }
    };
  }
}), yo, wo = y({
  "src/lib/errors/task-configuration-error.ts"() {
    Fe(), yo = class extends ke {
      constructor(e) {
        super(void 0, e);
      }
    };
  }
});
function _o(e) {
  return typeof e == "function" ? e : qe;
}
function ko(e) {
  return typeof e == "function" && e !== qe;
}
function Co(e, n) {
  const t = e.indexOf(n);
  return t <= 0 ? [e, ""] : [e.substr(0, t), e.substr(t + 1)];
}
function To(e, n = 0) {
  return Eo(e) && e.length > n ? e[n] : void 0;
}
function Ne(e, n = 0) {
  if (Eo(e) && e.length > n)
    return e[e.length - 1 - n];
}
function Eo(e) {
  return !!(e && typeof e.length == "number");
}
function vn(e = "", n = !0, t = `
`) {
  return e.split(t).reduce((a, s) => {
    const i = n ? s.trim() : s;
    return i && a.push(i), a;
  }, []);
}
function Fa(e, n) {
  return vn(e, !0).map((t) => n(t));
}
function Aa(e) {
  return Vt.exists(e, Vt.FOLDER);
}
function L(e, n) {
  return Array.isArray(e) ? e.includes(n) || e.push(n) : e.add(n), n;
}
function Ro(e, n) {
  return Array.isArray(e) && !e.includes(n) && e.push(n), e;
}
function tt(e, n) {
  if (Array.isArray(e)) {
    const t = e.indexOf(n);
    t >= 0 && e.splice(t, 1);
  } else
    e.delete(n);
  return n;
}
function be(e) {
  return Array.isArray(e) ? e : [e];
}
function So(e) {
  return e.replace(/[\s-]+(.)/g, (n, t) => t.toUpperCase());
}
function Oo(e) {
  return be(e).map(String);
}
function B(e, n = 0) {
  if (e == null)
    return n;
  const t = parseInt(e, 10);
  return isNaN(t) ? n : t;
}
function cn(e, n) {
  const t = [];
  for (let a = 0, s = e.length; a < s; a++)
    t.push(n, e[a]);
  return t;
}
function pn(e) {
  return (Array.isArray(e) ? Buffer.concat(e) : e).toString("utf-8");
}
function jo(e, n) {
  return Object.assign(
    {},
    ...n.map((t) => t in e ? { [t]: e[t] } : {})
  );
}
function Xt(e = 0) {
  return new Promise((n) => setTimeout(n, e));
}
function Fo(e) {
  if (e !== !1)
    return e;
}
var We, qe, gn, at = y({
  "src/lib/utils/util.ts"() {
    We = "\0", qe = () => {
    }, gn = Object.prototype.toString.call.bind(Object.prototype.toString);
  }
});
function ye(e, n, t) {
  return n(e) ? e : arguments.length > 2 ? t : void 0;
}
function La(e, n) {
  const t = Mn(e) ? "string" : typeof e;
  return /number|string|boolean/.test(t) && (!n || !n.includes(t));
}
function Pa(e) {
  return !!e && gn(e) === "[object Object]";
}
function Ao(e) {
  return typeof e == "function";
}
var bn, Y, Lo, $n, Ba, Po = y({
  "src/lib/utils/argument-filters.ts"() {
    at(), hn(), bn = (e) => Array.isArray(e), Y = (e) => typeof e == "string", Lo = (e) => Array.isArray(e) && e.every(Y), $n = (e) => Y(e) || Array.isArray(e) && e.every(Y), Ba = (e) => e == null || "number|boolean|function".includes(typeof e) ? !1 : Array.isArray(e) || typeof e == "string" || typeof e.length == "number";
  }
}), Qt, Hl = y({
  "src/lib/utils/exit-codes.ts"() {
    Qt = /* @__PURE__ */ ((e) => (e[e.SUCCESS = 0] = "SUCCESS", e[e.ERROR = 1] = "ERROR", e[e.NOT_FOUND = -2] = "NOT_FOUND", e[e.UNCLEAN = 128] = "UNCLEAN", e))(Qt || {});
  }
}), un, Gl = y({
  "src/lib/utils/git-output-streams.ts"() {
    un = class {
      constructor(e, n) {
        this.stdOut = e, this.stdErr = n;
      }
      asStrings() {
        return new un(this.stdOut.toString("utf8"), this.stdErr.toString("utf8"));
      }
    };
  }
}), O, Se, Wl = y({
  "src/lib/utils/line-parser.ts"() {
    O = class {
      constructor(e, n) {
        this.matches = [], this.parse = (t, a) => (this.resetMatches(), this._regExp.every((s, i) => this.addMatch(s, i, t(i))) ? this.useMatches(a, this.prepareMatches()) !== !1 : !1), this._regExp = Array.isArray(e) ? e : [e], n && (this.useMatches = n);
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
        const a = t && e.exec(t);
        return a && this.pushMatch(n, a), !!a;
      }
      pushMatch(e, n) {
        this.matches.push(...n.slice(1));
      }
    }, Se = class extends O {
      addMatch(e, n, t) {
        return /^remote:\s/.test(String(t)) && super.addMatch(e, n, t);
      }
      pushMatch(e, n) {
        (e > 0 || n.length > 1) && super.pushMatch(e, n);
      }
    };
  }
});
function Bo(...e) {
  const n = process.cwd(), t = Object.assign(
    le({ baseDir: n }, Do),
    ...e.filter((a) => typeof a == "object" && a)
  );
  return t.baseDir = t.baseDir || n, t.trimmed = t.trimmed === !0, t;
}
var Do, Vl = y({
  "src/lib/utils/simple-git-options.ts"() {
    Do = {
      binary: "git",
      maxConcurrentProcesses: 5,
      config: [],
      trimmed: !1
    };
  }
});
function Da(e, n = []) {
  return Pa(e) ? Object.keys(e).reduce((t, a) => {
    const s = e[a];
    return Mn(s) ? t.push(s) : La(s, ["boolean"]) ? t.push(a + "=" + s) : t.push(a), t;
  }, n) : n;
}
function te(e, n = 0, t = !1) {
  const a = [];
  for (let s = 0, i = n < 0 ? e.length : n; s < i; s++)
    "string|number".includes(typeof e[s]) && a.push(String(e[s]));
  return Da(Na(e), a), t || a.push(...Kl(e)), a;
}
function Kl(e) {
  const n = typeof Ne(e) == "function";
  return ye(Ne(e, n ? 1 : 0), bn, []);
}
function Na(e) {
  const n = Ao(Ne(e));
  return ye(Ne(e, n ? 1 : 0), Pa);
}
function z(e, n = !0) {
  const t = _o(Ne(e));
  return n || ko(t) ? t : void 0;
}
var Jl = y({
  "src/lib/utils/task-options.ts"() {
    Po(), at(), hn();
  }
});
function Zt(e, n) {
  return e(n.stdOut, n.stdErr);
}
function ie(e, n, t, a = !0) {
  return be(t).forEach((s) => {
    for (let i = vn(s, a), r = 0, u = i.length; r < u; r++) {
      const l = (d = 0) => {
        if (!(r + d >= u))
          return i[r + d];
      };
      n.some(({ parse: d }) => d(l, e));
    }
  }), e;
}
var Yl = y({
  "src/lib/utils/task-parser.ts"() {
    at();
  }
}), No = {};
M(No, {
  ExitCodes: () => Qt,
  GitOutputStreams: () => un,
  LineParser: () => O,
  NOOP: () => qe,
  NULL: () => We,
  RemoteLineParser: () => Se,
  append: () => L,
  appendTaskOptions: () => Da,
  asArray: () => be,
  asCamelCase: () => So,
  asFunction: () => _o,
  asNumber: () => B,
  asStringArray: () => Oo,
  bufferToString: () => pn,
  callTaskParser: () => Zt,
  createInstanceConfig: () => Bo,
  delay: () => Xt,
  filterArray: () => bn,
  filterFunction: () => Ao,
  filterHasLength: () => Ba,
  filterPlainObject: () => Pa,
  filterPrimitives: () => La,
  filterString: () => Y,
  filterStringArray: () => Lo,
  filterStringOrStringArray: () => $n,
  filterType: () => ye,
  first: () => To,
  folderExists: () => Aa,
  forEachLineWithContent: () => Fa,
  getTrailingOptions: () => te,
  including: () => Ro,
  isUserFunction: () => ko,
  last: () => Ne,
  objectToString: () => gn,
  orVoid: () => Fo,
  parseStringResponse: () => ie,
  pick: () => jo,
  prefixedArray: () => cn,
  remove: () => tt,
  splitOn: () => Co,
  toLinesWithContent: () => vn,
  trailingFunctionArgument: () => z,
  trailingOptionsArgument: () => Na
});
var E = y({
  "src/lib/utils/index.ts"() {
    Po(), Hl(), Gl(), Wl(), Vl(), Jl(), Yl(), at();
  }
}), zo = {};
M(zo, {
  CheckRepoActions: () => ea,
  checkIsBareRepoTask: () => Io,
  checkIsRepoRootTask: () => qo,
  checkIsRepoTask: () => Xl
});
function Xl(e) {
  switch (e) {
    case "bare":
      return Io();
    case "root":
      return qo();
  }
  return {
    commands: ["rev-parse", "--is-inside-work-tree"],
    format: "utf-8",
    onError: st,
    parser: za
  };
}
function qo() {
  return {
    commands: ["rev-parse", "--git-dir"],
    format: "utf-8",
    onError: st,
    parser(n) {
      return /^\.(git)?$/.test(n.trim());
    }
  };
}
function Io() {
  return {
    commands: ["rev-parse", "--is-bare-repository"],
    format: "utf-8",
    onError: st,
    parser: za
  };
}
function Ql(e) {
  return /(Not a git repository|Kein Git-Repository)/i.test(String(e));
}
var ea, st, za, Uo = y({
  "src/lib/tasks/check-is-repo.ts"() {
    E(), ea = /* @__PURE__ */ ((e) => (e.BARE = "bare", e.IN_TREE = "tree", e.IS_REPO_ROOT = "root", e))(ea || {}), st = ({ exitCode: e }, n, t, a) => {
      if (e === 128 && Ql(n))
        return t(Buffer.from("false"));
      a(n);
    }, za = (e) => e.trim() === "true";
  }
});
function Zl(e, n) {
  const t = new Mo(e), a = e ? Ho : $o;
  return vn(n).forEach((s) => {
    const i = s.replace(a, "");
    t.paths.push(i), (Go.test(i) ? t.folders : t.files).push(i);
  }), t;
}
var Mo, $o, Ho, Go, ed = y({
  "src/lib/responses/CleanSummary.ts"() {
    E(), Mo = class {
      constructor(e) {
        this.dryRun = e, this.paths = [], this.files = [], this.folders = [];
      }
    }, $o = /^[a-z]+\s*/i, Ho = /^[a-z]+\s+[a-z]+\s*/i, Go = /\/$/;
  }
}), na = {};
M(na, {
  EMPTY_COMMANDS: () => it,
  adhocExecTask: () => Wo,
  configurationErrorTask: () => ae,
  isBufferTask: () => Ko,
  isEmptyTask: () => Jo,
  straightThroughBufferTask: () => Vo,
  straightThroughStringTask: () => ne
});
function Wo(e) {
  return {
    commands: it,
    format: "empty",
    parser: e
  };
}
function ae(e) {
  return {
    commands: it,
    format: "empty",
    parser() {
      throw typeof e == "string" ? new yo(e) : e;
    }
  };
}
function ne(e, n = !1) {
  return {
    commands: e,
    format: "utf-8",
    parser(t) {
      return n ? String(t).trim() : t;
    }
  };
}
function Vo(e) {
  return {
    commands: e,
    format: "buffer",
    parser(n) {
      return n;
    }
  };
}
function Ko(e) {
  return e.format === "buffer";
}
function Jo(e) {
  return e.format === "empty" || !e.commands.length;
}
var it, U = y({
  "src/lib/tasks/task.ts"() {
    wo(), it = [];
  }
}), Yo = {};
M(Yo, {
  CONFIG_ERROR_INTERACTIVE_MODE: () => qa,
  CONFIG_ERROR_MODE_REQUIRED: () => Ia,
  CONFIG_ERROR_UNKNOWN_OPTION: () => Ua,
  CleanOptions: () => Bn,
  cleanTask: () => Xo,
  cleanWithOptionsTask: () => nd,
  isCleanOptionsArray: () => td
});
function nd(e, n) {
  const { cleanMode: t, options: a, valid: s } = ad(e);
  return t ? s.options ? (a.push(...n), a.some(od) ? ae(qa) : Xo(t, a)) : ae(Ua + JSON.stringify(e)) : ae(Ia);
}
function Xo(e, n) {
  return {
    commands: ["clean", `-${e}`, ...n],
    format: "utf-8",
    parser(a) {
      return Zl(e === "n", a);
    }
  };
}
function td(e) {
  return Array.isArray(e) && e.every((n) => Ma.has(n));
}
function ad(e) {
  let n, t = [], a = { cleanMode: !1, options: !0 };
  return e.replace(/[^a-z]i/g, "").split("").forEach((s) => {
    sd(s) ? (n = s, a.cleanMode = !0) : a.options = a.options && id(t[t.length] = `-${s}`);
  }), {
    cleanMode: n,
    options: t,
    valid: a
  };
}
function sd(e) {
  return e === "f" || e === "n";
}
function id(e) {
  return /^-[a-z]$/i.test(e) && Ma.has(e.charAt(1));
}
function od(e) {
  return /^-[^\-]/.test(e) ? e.indexOf("i") > 0 : e === "--interactive";
}
var qa, Ia, Ua, Bn, Ma, Qo = y({
  "src/lib/tasks/clean.ts"() {
    ed(), E(), U(), qa = "Git clean interactive mode is not supported", Ia = 'Git clean mode parameter ("n" or "f") is required', Ua = "Git clean unknown option found in: ", Bn = /* @__PURE__ */ ((e) => (e.DRY_RUN = "n", e.FORCE = "f", e.IGNORED_INCLUDED = "x", e.IGNORED_ONLY = "X", e.EXCLUDING = "e", e.QUIET = "q", e.RECURSIVE = "d", e))(Bn || {}), Ma = /* @__PURE__ */ new Set([
      "i",
      ...Oo(Object.values(Bn))
    ]);
  }
});
function rd(e) {
  const n = new er();
  for (const t of Zo(e))
    n.addValue(t.file, String(t.key), t.value);
  return n;
}
function cd(e, n) {
  let t = null;
  const a = [], s = /* @__PURE__ */ new Map();
  for (const i of Zo(e, n))
    i.key === n && (a.push(t = i.value), s.has(i.file) || s.set(i.file, []), s.get(i.file).push(t));
  return {
    key: n,
    paths: Array.from(s.keys()),
    scopes: s,
    value: t,
    values: a
  };
}
function pd(e) {
  return e.replace(/^(file):/, "");
}
function* Zo(e, n = null) {
  const t = e.split("\0");
  for (let a = 0, s = t.length - 1; a < s; ) {
    const i = pd(t[a++]);
    let r = t[a++], u = n;
    if (r.includes(`
`)) {
      const l = Co(r, `
`);
      u = l[0], r = l[1];
    }
    yield { file: i, key: u, value: r };
  }
}
var er, ud = y({
  "src/lib/responses/ConfigList.ts"() {
    E(), er = class {
      constructor() {
        this.files = [], this.values = /* @__PURE__ */ Object.create(null);
      }
      get all() {
        return this._all || (this._all = this.files.reduce((e, n) => Object.assign(e, this.values[n]), {})), this._all;
      }
      addFile(e) {
        if (!(e in this.values)) {
          const n = Ne(this.files);
          this.values[e] = n ? Object.create(this.values[n]) : {}, this.files.push(e);
        }
        return this.values[e];
      }
      addValue(e, n, t) {
        const a = this.addFile(e);
        a.hasOwnProperty(n) ? Array.isArray(a[n]) ? a[n].push(t) : a[n] = [a[n], t] : a[n] = t, this._all = void 0;
      }
    };
  }
});
function Ot(e, n) {
  return typeof e == "string" && ta.hasOwnProperty(e) ? e : n;
}
function ld(e, n, t, a) {
  const s = ["config", `--${a}`];
  return t && s.push("--add"), s.push(e, n), {
    commands: s,
    format: "utf-8",
    parser(i) {
      return i;
    }
  };
}
function dd(e, n) {
  const t = ["config", "--null", "--show-origin", "--get-all", e];
  return n && t.splice(1, 0, `--${n}`), {
    commands: t,
    format: "utf-8",
    parser(a) {
      return cd(a, e);
    }
  };
}
function md(e) {
  const n = ["config", "--list", "--show-origin", "--null"];
  return e && n.push(`--${e}`), {
    commands: n,
    format: "utf-8",
    parser(t) {
      return rd(t);
    }
  };
}
function fd() {
  return {
    addConfig(e, n, ...t) {
      return this._runTask(
        ld(
          e,
          n,
          t[0] === !0,
          Ot(
            t[1],
            "local"
            /* local */
          )
        ),
        z(arguments)
      );
    },
    getConfig(e, n) {
      return this._runTask(
        dd(e, Ot(n, void 0)),
        z(arguments)
      );
    },
    listConfig(...e) {
      return this._runTask(
        md(Ot(e[0], void 0)),
        z(arguments)
      );
    }
  };
}
var ta, nr = y({
  "src/lib/tasks/config.ts"() {
    ud(), E(), ta = /* @__PURE__ */ ((e) => (e.system = "system", e.global = "global", e.local = "local", e.worktree = "worktree", e))(ta || {});
  }
});
function hd(e) {
  return tr.has(e);
}
var jt, tr, ar = y({
  "src/lib/tasks/diff-name-status.ts"() {
    jt = /* @__PURE__ */ ((e) => (e.ADDED = "A", e.COPIED = "C", e.DELETED = "D", e.MODIFIED = "M", e.RENAMED = "R", e.CHANGED = "T", e.UNMERGED = "U", e.UNKNOWN = "X", e.BROKEN = "B", e))(jt || {}), tr = new Set(Object.values(jt));
  }
});
function xd(...e) {
  return new ir().param(...e);
}
function vd(e) {
  const n = /* @__PURE__ */ new Set(), t = {};
  return Fa(e, (a) => {
    const [s, i, r] = a.split(We);
    n.add(s), (t[s] = t[s] || []).push({
      line: B(i),
      path: s,
      preview: r
    });
  }), {
    paths: n,
    results: t
  };
}
function gd() {
  return {
    grep(e) {
      const n = z(arguments), t = te(arguments);
      for (const s of sr)
        if (t.includes(s))
          return this._runTask(
            ae(`git.grep: use of "${s}" is not supported.`),
            n
          );
      typeof e == "string" && (e = xd().param(e));
      const a = ["grep", "--null", "-n", "--full-name", ...t, ...e];
      return this._runTask(
        {
          commands: a,
          format: "utf-8",
          parser(s) {
            return vd(s);
          }
        },
        n
      );
    }
  };
}
var sr, en, Gs, ir, or = y({
  "src/lib/tasks/grep.ts"() {
    E(), U(), sr = ["-h"], en = Symbol("grepQuery"), ir = class {
      constructor() {
        this[Gs] = [];
      }
      *[(Gs = en, Symbol.iterator)]() {
        for (const e of this[en])
          yield e;
      }
      and(...e) {
        return e.length && this[en].push("--and", "(", ...cn(e, "-e"), ")"), this;
      }
      param(...e) {
        return this[en].push(...cn(e, "-e")), this;
      }
    };
  }
}), rr = {};
M(rr, {
  ResetMode: () => Dn,
  getResetMode: () => yd,
  resetTask: () => bd
});
function bd(e, n) {
  const t = ["reset"];
  return cr(e) && t.push(`--${e}`), t.push(...n), ne(t);
}
function yd(e) {
  if (cr(e))
    return e;
  switch (typeof e) {
    case "string":
    case "undefined":
      return "soft";
  }
}
function cr(e) {
  return pr.includes(e);
}
var Dn, pr, ur = y({
  "src/lib/tasks/reset.ts"() {
    U(), Dn = /* @__PURE__ */ ((e) => (e.MIXED = "mixed", e.SOFT = "soft", e.HARD = "hard", e.MERGE = "merge", e.KEEP = "keep", e))(Dn || {}), pr = Array.from(Object.values(Dn));
  }
});
function wd() {
  return Yt("simple-git");
}
function Ws(e, n, t) {
  return !n || !String(n).replace(/\s*/, "") ? t ? (a, ...s) => {
    e(a, ...s), t(a, ...s);
  } : e : (a, ...s) => {
    e(`%s ${a}`, n, ...s), t && t(a, ...s);
  };
}
function _d(e, n, { namespace: t }) {
  if (typeof e == "string")
    return e;
  const a = n && n.namespace || "";
  return a.startsWith(t) ? a.substr(t.length + 1) : a || t;
}
function $a(e, n, t, a = wd()) {
  const s = e && `[${e}]` || "", i = [], r = typeof n == "string" ? a.extend(n) : n, u = _d(ye(n, Y), r, a);
  return d(t);
  function l(p, c) {
    return L(
      i,
      $a(e, u.replace(/^[^:]+/, p), c, a)
    );
  }
  function d(p) {
    const c = p && `[${p}]` || "", o = r && Ws(r, c) || qe, m = Ws(a, `${s} ${c}`, o);
    return Object.assign(r ? o : m, {
      label: e,
      sibling: l,
      info: m,
      step: d
    });
  }
}
var lr = y({
  "src/lib/git-logger.ts"() {
    E(), Yt.formatters.L = (e) => String(Ba(e) ? e.length : "-"), Yt.formatters.B = (e) => Buffer.isBuffer(e) ? e.toString("utf8") : gn(e);
  }
}), jn, aa, kd = y({
  "src/lib/runners/tasks-pending-queue.ts"() {
    Fe(), lr(), jn = class {
      constructor(e = "GitExecutor") {
        this.logLabel = e, this._queue = /* @__PURE__ */ new Map();
      }
      withProgress(e) {
        return this._queue.get(e);
      }
      createProgress(e) {
        const n = jn.getName(e.commands[0]), t = $a(this.logLabel, n);
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
          throw new ke(void 0, "TasksPendingQueue: attempt called for an unknown task");
        return n.logger("Starting task"), n;
      }
      static getName(e = "empty") {
        return `task:${e}:${++jn.counter}`;
      }
    }, aa = jn, aa.counter = 0;
  }
});
function Le(e, n) {
  return {
    method: To(e.commands) || "",
    commands: n
  };
}
function Cd(e, n) {
  return (t) => {
    n("[ERROR] child process exception %o", t), e.push(Buffer.from(String(t.stack), "ascii"));
  };
}
function Vs(e, n, t, a) {
  return (s) => {
    t("%s received %L bytes", n, s), a("%B", s), e.push(s);
  };
}
var sa, Td = y({
  "src/lib/runners/git-executor-chain.ts"() {
    Fe(), U(), E(), kd(), sa = class {
      constructor(e, n, t) {
        this._executor = e, this._scheduler = n, this._plugins = t, this._chain = Promise.resolve(), this._queue = new aa();
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
        return nn(this, null, function* () {
          const n = yield this._scheduler.next(), t = () => this._queue.complete(e);
          try {
            const { logger: a } = this._queue.attempt(e);
            return yield Jo(e) ? this.attemptEmptyTask(e, a) : this.attemptRemoteTask(e, a);
          } catch (a) {
            throw this.onFatalException(e, a);
          } finally {
            t(), n();
          }
        });
      }
      onFatalException(e, n) {
        const t = n instanceof ke ? Object.assign(n, { task: e }) : new ke(e, n && String(n));
        return this._chain = Promise.resolve(), this._queue.fatal(t), t;
      }
      attemptRemoteTask(e, n) {
        return nn(this, null, function* () {
          const t = this._plugins.exec("spawn.binary", "", Le(e, e.commands)), a = this._plugins.exec(
            "spawn.args",
            [...e.commands],
            Le(e, e.commands)
          ), s = yield this.gitResponse(
            e,
            t,
            a,
            this.outputHandler,
            n.step("SPAWN")
          ), i = yield this.handleTaskData(e, a, s, n.step("HANDLE"));
          return n("passing response to task's parser as a %s", e.format), Ko(e) ? Zt(e.parser, i) : Zt(e.parser, i.asStrings());
        });
      }
      attemptEmptyTask(e, n) {
        return nn(this, null, function* () {
          return n("empty task bypassing child process to call to task's parser"), e.parser(this);
        });
      }
      handleTaskData(e, n, t, a) {
        const { exitCode: s, rejection: i, stdOut: r, stdErr: u } = t;
        return new Promise((l, d) => {
          a("Preparing to handle process response exitCode=%d stdOut=", s);
          const { error: p } = this._plugins.exec(
            "task.error",
            { error: i },
            le(le({}, Le(e, n)), t)
          );
          if (p && e.onError)
            return a.info("exitCode=%s handling with custom error handler"), e.onError(
              t,
              p,
              (c) => {
                a.info("custom error handler treated as success"), a("custom error returned a %s", gn(c)), l(
                  new un(
                    Array.isArray(c) ? Buffer.concat(c) : c,
                    Buffer.concat(u)
                  )
                );
              },
              d
            );
          if (p)
            return a.info(
              "handling as error: exitCode=%s stdErr=%s rejection=%o",
              s,
              u.length,
              i
            ), d(p);
          a.info("retrieving task output complete"), l(new un(Buffer.concat(r), Buffer.concat(u)));
        });
      }
      gitResponse(e, n, t, a, s) {
        return nn(this, null, function* () {
          const i = s.sibling("output"), r = this._plugins.exec(
            "spawn.options",
            {
              cwd: this.cwd,
              env: this.env,
              windowsHide: !0
            },
            Le(e, e.commands)
          );
          return new Promise((u) => {
            const l = [], d = [];
            s.info("%s %o", n, t), s("%O", r);
            let p = this._beforeSpawn(e, t);
            if (p)
              return u({
                stdOut: l,
                stdErr: d,
                exitCode: 9901,
                rejection: p
              });
            this._plugins.exec("spawn.before", void 0, tn(le({}, Le(e, t)), {
              kill(o) {
                p = o || p;
              }
            }));
            const c = Fc(n, t, r);
            c.stdout.on(
              "data",
              Vs(l, "stdOut", s, i.step("stdOut"))
            ), c.stderr.on(
              "data",
              Vs(d, "stdErr", s, i.step("stdErr"))
            ), c.on("error", Cd(d, s)), a && (s("Passing child process stdOut/stdErr to custom outputHandler"), a(n, c.stdout, c.stderr, [...t])), this._plugins.exec("spawn.after", void 0, tn(le({}, Le(e, t)), {
              spawned: c,
              close(o, m) {
                u({
                  stdOut: l,
                  stdErr: d,
                  exitCode: o,
                  rejection: p || m
                });
              },
              kill(o) {
                c.killed || (p = o, c.kill("SIGINT"));
              }
            }));
          });
        });
      }
      _beforeSpawn(e, n) {
        let t;
        return this._plugins.exec("spawn.before", void 0, tn(le({}, Le(e, n)), {
          kill(a) {
            t = a || t;
          }
        })), t;
      }
    };
  }
}), dr = {};
M(dr, {
  GitExecutor: () => mr
});
var mr, Ed = y({
  "src/lib/runners/git-executor.ts"() {
    Td(), mr = class {
      constructor(e, n, t) {
        this.cwd = e, this._scheduler = n, this._plugins = t, this._chain = new sa(this, this._scheduler, this._plugins);
      }
      chain() {
        return new sa(this, this._scheduler, this._plugins);
      }
      push(e) {
        return this._chain.push(e);
      }
    };
  }
});
function Rd(e, n, t = qe) {
  const a = (i) => {
    t(null, i);
  }, s = (i) => {
    (i == null ? void 0 : i.task) === e && t(
      i instanceof xn ? Sd(i) : i,
      void 0
    );
  };
  n.then(a, s);
}
function Sd(e) {
  let n = (a) => {
    console.warn(
      `simple-git deprecation notice: accessing GitResponseError.${a} should be GitResponseError.git.${a}, this will no longer be available in version 3`
    ), n = qe;
  };
  return Object.create(e, Object.getOwnPropertyNames(e.git).reduce(t, {}));
  function t(a, s) {
    return s in e || (a[s] = {
      enumerable: !1,
      configurable: !1,
      get() {
        return n(s), e.git[s];
      }
    }), a;
  }
}
var Od = y({
  "src/lib/task-callback.ts"() {
    Ke(), E();
  }
});
function Ks(e, n) {
  return Wo((t) => {
    if (!Aa(e))
      throw new Error(`Git.cwd: cannot change to non-directory "${e}"`);
    return (n || t).cwd = e;
  });
}
var jd = y({
  "src/lib/tasks/change-working-directory.ts"() {
    E(), U();
  }
});
function Ft(e) {
  const n = ["checkout", ...e];
  return n[1] === "-b" && n.includes("-B") && (n[1] = tt(n, "-B")), ne(n);
}
function Fd() {
  return {
    checkout() {
      return this._runTask(
        Ft(te(arguments, 1)),
        z(arguments)
      );
    },
    checkoutBranch(e, n) {
      return this._runTask(
        Ft(["-b", e, n, ...te(arguments)]),
        z(arguments)
      );
    },
    checkoutLocalBranch(e) {
      return this._runTask(
        Ft(["-b", e, ...te(arguments)]),
        z(arguments)
      );
    }
  };
}
var Ad = y({
  "src/lib/tasks/checkout.ts"() {
    E(), U();
  }
});
function Ld() {
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
function Pd() {
  return {
    countObjects() {
      return this._runTask({
        commands: ["count-objects", "--verbose"],
        format: "utf-8",
        parser(e) {
          return ie(Ld(), [fr], e);
        }
      });
    }
  };
}
var fr, Bd = y({
  "src/lib/tasks/count-objects.ts"() {
    E(), fr = new O(
      /([a-z-]+): (\d+)$/,
      (e, [n, t]) => {
        const a = So(n);
        e.hasOwnProperty(a) && (e[a] = B(t));
      }
    );
  }
});
function Dd(e) {
  return ie({
    author: null,
    branch: "",
    commit: "",
    root: !1,
    summary: {
      changes: 0,
      insertions: 0,
      deletions: 0
    }
  }, hr, e);
}
var hr, Nd = y({
  "src/lib/parsers/parse-commit.ts"() {
    E(), hr = [
      new O(/^\[([^\s]+)( \([^)]+\))? ([^\]]+)/, (e, [n, t, a]) => {
        e.branch = n, e.commit = a, e.root = !!t;
      }),
      new O(/\s*Author:\s(.+)/i, (e, [n]) => {
        const t = n.split("<"), a = t.pop();
        !a || !a.includes("@") || (e.author = {
          email: a.substr(0, a.length - 1),
          name: t.join("<").trim()
        });
      }),
      new O(
        /(\d+)[^,]*(?:,\s*(\d+)[^,]*)(?:,\s*(\d+))/g,
        (e, [n, t, a]) => {
          e.summary.changes = parseInt(n, 10) || 0, e.summary.insertions = parseInt(t, 10) || 0, e.summary.deletions = parseInt(a, 10) || 0;
        }
      ),
      new O(
        /^(\d+)[^,]*(?:,\s*(\d+)[^(]+\(([+-]))?/,
        (e, [n, t, a]) => {
          e.summary.changes = parseInt(n, 10) || 0;
          const s = parseInt(t, 10) || 0;
          a === "-" ? e.summary.deletions = s : a === "+" && (e.summary.insertions = s);
        }
      )
    ];
  }
});
function zd(e, n, t) {
  return {
    commands: [
      "-c",
      "core.abbrev=40",
      "commit",
      ...cn(e, "-m"),
      ...n,
      ...t
    ],
    format: "utf-8",
    parser: Dd
  };
}
function qd() {
  return {
    commit(n, ...t) {
      const a = z(arguments), s = e(n) || zd(
        be(n),
        be(ye(t[0], $n, [])),
        [...ye(t[1], bn, []), ...te(arguments, 0, !0)]
      );
      return this._runTask(s, a);
    }
  };
  function e(n) {
    return !$n(n) && ae(
      "git.commit: requires the commit message to be supplied as a string/string[]"
    );
  }
}
var Id = y({
  "src/lib/tasks/commit.ts"() {
    Nd(), E(), U();
  }
});
function Ud() {
  return {
    firstCommit() {
      return this._runTask(
        ne(["rev-list", "--max-parents=0", "HEAD"], !0),
        z(arguments)
      );
    }
  };
}
var Md = y({
  "src/lib/tasks/first-commit.ts"() {
    E(), U();
  }
});
function $d(e, n) {
  const t = ["hash-object", e];
  return n && t.push("-w"), ne(t, !0);
}
var Hd = y({
  "src/lib/tasks/hash-object.ts"() {
    U();
  }
});
function Gd(e, n, t) {
  const a = String(t).trim();
  let s;
  if (s = xr.exec(a))
    return new Nn(e, n, !1, s[1]);
  if (s = vr.exec(a))
    return new Nn(e, n, !0, s[1]);
  let i = "";
  const r = a.split(" ");
  for (; r.length; )
    if (r.shift() === "in") {
      i = r.join(" ");
      break;
    }
  return new Nn(e, n, /^re/i.test(a), i);
}
var Nn, xr, vr, Wd = y({
  "src/lib/responses/InitSummary.ts"() {
    Nn = class {
      constructor(e, n, t, a) {
        this.bare = e, this.path = n, this.existing = t, this.gitDir = a;
      }
    }, xr = /^Init.+ repository in (.+)$/, vr = /^Rein.+ in (.+)$/;
  }
});
function Vd(e) {
  return e.includes(Ha);
}
function Kd(e = !1, n, t) {
  const a = ["init", ...t];
  return e && !Vd(a) && a.splice(1, 0, Ha), {
    commands: a,
    format: "utf-8",
    parser(s) {
      return Gd(a.includes("--bare"), n, s);
    }
  };
}
var Ha, Jd = y({
  "src/lib/tasks/init.ts"() {
    Wd(), Ha = "--bare";
  }
});
function Ga(e) {
  for (let n = 0; n < e.length; n++) {
    const t = Wa.exec(e[n]);
    if (t)
      return `--${t[1]}`;
  }
  return "";
}
function Yd(e) {
  return Wa.test(e);
}
var Wa, yn = y({
  "src/lib/args/log-format.ts"() {
    Wa = /^--(stat|numstat|name-only|name-status)(=|$)/;
  }
}), gr, Xd = y({
  "src/lib/responses/DiffSummary.ts"() {
    gr = class {
      constructor() {
        this.changed = 0, this.deletions = 0, this.insertions = 0, this.files = [];
      }
    };
  }
});
function br(e = "") {
  const n = yr[e];
  return (t) => ie(new gr(), n, t, !1);
}
var At, Js, Ys, Xs, yr, wr = y({
  "src/lib/parsers/parse-diff-summary.ts"() {
    yn(), Xd(), ar(), E(), At = [
      new O(
        /^(.+)\s+\|\s+(\d+)(\s+[+\-]+)?$/,
        (e, [n, t, a = ""]) => {
          e.files.push({
            file: n.trim(),
            changes: B(t),
            insertions: a.replace(/[^+]/g, "").length,
            deletions: a.replace(/[^-]/g, "").length,
            binary: !1
          });
        }
      ),
      new O(
        /^(.+) \|\s+Bin ([0-9.]+) -> ([0-9.]+) ([a-z]+)/,
        (e, [n, t, a]) => {
          e.files.push({
            file: n.trim(),
            before: B(t),
            after: B(a),
            binary: !0
          });
        }
      ),
      new O(
        /(\d+) files? changed\s*((?:, \d+ [^,]+){0,2})/,
        (e, [n, t]) => {
          const a = /(\d+) i/.exec(t), s = /(\d+) d/.exec(t);
          e.changed = B(n), e.insertions = B(a == null ? void 0 : a[1]), e.deletions = B(s == null ? void 0 : s[1]);
        }
      )
    ], Js = [
      new O(
        /(\d+)\t(\d+)\t(.+)$/,
        (e, [n, t, a]) => {
          const s = B(n), i = B(t);
          e.changed++, e.insertions += s, e.deletions += i, e.files.push({
            file: a,
            changes: s + i,
            insertions: s,
            deletions: i,
            binary: !1
          });
        }
      ),
      new O(/-\t-\t(.+)$/, (e, [n]) => {
        e.changed++, e.files.push({
          file: n,
          after: 0,
          before: 0,
          binary: !0
        });
      })
    ], Ys = [
      new O(/(.+)$/, (e, [n]) => {
        e.changed++, e.files.push({
          file: n,
          changes: 0,
          insertions: 0,
          deletions: 0,
          binary: !1
        });
      })
    ], Xs = [
      new O(
        /([ACDMRTUXB])([0-9]{0,3})\t(.[^\t]*)(\t(.[^\t]*))?$/,
        (e, [n, t, a, s, i]) => {
          e.changed++, e.files.push({
            file: i ?? a,
            changes: 0,
            status: Fo(hd(n) && n),
            insertions: 0,
            deletions: 0,
            binary: !1
          });
        }
      )
    ], yr = {
      "": At,
      "--stat": At,
      "--numstat": Js,
      "--name-status": Xs,
      "--name-only": Ys
    };
  }
});
function Qd(e, n) {
  return n.reduce(
    (t, a, s) => (t[a] = e[s] || "", t),
    /* @__PURE__ */ Object.create({ diff: null })
  );
}
function _r(e = Ja, n = kr, t = "") {
  const a = br(t);
  return function(s) {
    const i = vn(
      s,
      !0,
      Va
    ).map(function(r) {
      const u = r.trim().split(Ka), l = Qd(
        u[0].trim().split(e),
        n
      );
      return u.length > 1 && u[1].trim() && (l.diff = a(u[1])), l;
    });
    return {
      all: i,
      latest: i.length && i[0] || null,
      total: i.length
    };
  };
}
var Va, Ka, Ja, kr, Cr = y({
  "src/lib/parsers/parse-list-log-summary.ts"() {
    E(), wr(), yn(), Va = "òòòòòò ", Ka = " òò", Ja = " ò ", kr = ["hash", "date", "message", "refs", "author_name", "author_email"];
  }
}), Tr = {};
M(Tr, {
  diffSummaryTask: () => Zd,
  validateLogFormatConfig: () => ot
});
function Zd(e) {
  let n = Ga(e);
  const t = ["diff"];
  return n === "" && (n = "--stat", t.push("--stat=4096")), t.push(...e), ot(t) || {
    commands: t,
    format: "utf-8",
    parser: br(n)
  };
}
function ot(e) {
  const n = e.filter(Yd);
  if (n.length > 1)
    return ae(
      `Summary flags are mutually exclusive - pick one of ${n.join(",")}`
    );
  if (n.length && e.includes("-z"))
    return ae(
      `Summary flag ${n} parsing is not compatible with null termination option '-z'`
    );
}
var Ya = y({
  "src/lib/tasks/diff.ts"() {
    yn(), wr(), U();
  }
});
function em(e, n) {
  const t = [], a = [];
  return Object.keys(e).forEach((s) => {
    t.push(s), a.push(String(e[s]));
  }), [t, a.join(n)];
}
function nm(e) {
  return Object.keys(e).reduce((n, t) => (t in ia || (n[t] = e[t]), n), {});
}
function Er(e = {}, n = []) {
  const t = ye(e.splitter, Y, Ja), a = !La(e.format) && e.format ? e.format : {
    hash: "%H",
    date: e.strictDate === !1 ? "%ai" : "%aI",
    message: "%s",
    refs: "%D",
    body: e.multiLine ? "%B" : "%b",
    author_name: e.mailMap !== !1 ? "%aN" : "%an",
    author_email: e.mailMap !== !1 ? "%aE" : "%ae"
  }, [s, i] = em(a, t), r = [], u = [
    `--pretty=format:${Va}${i}${Ka}`,
    ...n
  ], l = e.n || e["max-count"] || e.maxCount;
  if (l && u.push(`--max-count=${l}`), e.from || e.to) {
    const d = e.symmetric !== !1 ? "..." : "..";
    r.push(`${e.from || ""}${d}${e.to || ""}`);
  }
  return Y(e.file) && u.push("--follow", $l(e.file)), Da(nm(e), u), {
    fields: s,
    splitter: t,
    commands: [...u, ...r]
  };
}
function tm(e, n, t) {
  const a = _r(e, n, Ga(t));
  return {
    commands: ["log", ...t],
    format: "utf-8",
    parser: a
  };
}
function am() {
  return {
    log(...t) {
      const a = z(arguments), s = Er(
        Na(arguments),
        ye(arguments[0], bn)
      ), i = n(...t) || ot(s.commands) || e(s);
      return this._runTask(i, a);
    }
  };
  function e(t) {
    return tm(t.splitter, t.fields, t.commands);
  }
  function n(t, a) {
    return Y(t) && Y(a) && ae(
      "git.log(string, string) should be replaced with git.log({ from: string, to: string })"
    );
  }
}
var ia, Rr = y({
  "src/lib/tasks/log.ts"() {
    yn(), hn(), Cr(), E(), U(), Ya(), ia = /* @__PURE__ */ ((e) => (e[e["--pretty"] = 0] = "--pretty", e[e["max-count"] = 1] = "max-count", e[e.maxCount = 2] = "maxCount", e[e.n = 3] = "n", e[e.file = 4] = "file", e[e.format = 5] = "format", e[e.from = 6] = "from", e[e.to = 7] = "to", e[e.splitter = 8] = "splitter", e[e.symmetric = 9] = "symmetric", e[e.mailMap = 10] = "mailMap", e[e.multiLine = 11] = "multiLine", e[e.strictDate = 12] = "strictDate", e))(ia || {});
  }
}), zn, Sr, sm = y({
  "src/lib/responses/MergeSummary.ts"() {
    zn = class {
      constructor(e, n = null, t) {
        this.reason = e, this.file = n, this.meta = t;
      }
      toString() {
        return `${this.file}:${this.reason}`;
      }
    }, Sr = class {
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
}), oa, Or, im = y({
  "src/lib/responses/PullSummary.ts"() {
    oa = class {
      constructor() {
        this.remoteMessages = {
          all: []
        }, this.created = [], this.deleted = [], this.files = [], this.deletions = {}, this.insertions = {}, this.summary = {
          changes: 0,
          deletions: 0,
          insertions: 0
        };
      }
    }, Or = class {
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
function Lt(e) {
  return e.objects = e.objects || {
    compressing: 0,
    counting: 0,
    enumerating: 0,
    packReused: 0,
    reused: { count: 0, delta: 0 },
    total: { count: 0, delta: 0 }
  };
}
function Qs(e) {
  const n = /^\s*(\d+)/.exec(e), t = /delta (\d+)/i.exec(e);
  return {
    count: B(n && n[1] || "0"),
    delta: B(t && t[1] || "0")
  };
}
var jr, om = y({
  "src/lib/parsers/parse-remote-objects.ts"() {
    E(), jr = [
      new Se(
        /^remote:\s*(enumerating|counting|compressing) objects: (\d+),/i,
        (e, [n, t]) => {
          const a = n.toLowerCase(), s = Lt(e.remoteMessages);
          Object.assign(s, { [a]: B(t) });
        }
      ),
      new Se(
        /^remote:\s*(enumerating|counting|compressing) objects: \d+% \(\d+\/(\d+)\),/i,
        (e, [n, t]) => {
          const a = n.toLowerCase(), s = Lt(e.remoteMessages);
          Object.assign(s, { [a]: B(t) });
        }
      ),
      new Se(
        /total ([^,]+), reused ([^,]+), pack-reused (\d+)/i,
        (e, [n, t, a]) => {
          const s = Lt(e.remoteMessages);
          s.total = Qs(n), s.reused = Qs(t), s.packReused = B(a);
        }
      )
    ];
  }
});
function Fr(e, n) {
  return ie({ remoteMessages: new Lr() }, Ar, n);
}
var Ar, Lr, Pr = y({
  "src/lib/parsers/parse-remote-messages.ts"() {
    E(), om(), Ar = [
      new Se(/^remote:\s*(.+)$/, (e, [n]) => (e.remoteMessages.all.push(n.trim()), !1)),
      ...jr,
      new Se(
        [/create a (?:pull|merge) request/i, /\s(https?:\/\/\S+)$/],
        (e, [n]) => {
          e.remoteMessages.pullRequestUrl = n;
        }
      ),
      new Se(
        [/found (\d+) vulnerabilities.+\(([^)]+)\)/i, /\s(https?:\/\/\S+)$/],
        (e, [n, t, a]) => {
          e.remoteMessages.vulnerabilities = {
            count: B(n),
            summary: t,
            url: a
          };
        }
      )
    ], Lr = class {
      constructor() {
        this.all = [];
      }
    };
  }
});
function rm(e, n) {
  const t = ie(new Or(), Br, [e, n]);
  return t.message && t;
}
var Zs, ei, ni, ti, Br, ai, Xa, Dr = y({
  "src/lib/parsers/parse-pull.ts"() {
    im(), E(), Pr(), Zs = /^\s*(.+?)\s+\|\s+\d+\s*(\+*)(-*)/, ei = /(\d+)\D+((\d+)\D+\(\+\))?(\D+(\d+)\D+\(-\))?/, ni = /^(create|delete) mode \d+ (.+)/, ti = [
      new O(Zs, (e, [n, t, a]) => {
        e.files.push(n), t && (e.insertions[n] = t.length), a && (e.deletions[n] = a.length);
      }),
      new O(ei, (e, [n, , t, , a]) => t !== void 0 || a !== void 0 ? (e.summary.changes = +n || 0, e.summary.insertions = +t || 0, e.summary.deletions = +a || 0, !0) : !1),
      new O(ni, (e, [n, t]) => {
        L(e.files, t), L(n === "create" ? e.created : e.deleted, t);
      })
    ], Br = [
      new O(/^from\s(.+)$/i, (e, [n]) => void (e.remote = n)),
      new O(/^fatal:\s(.+)$/, (e, [n]) => void (e.message = n)),
      new O(
        /([a-z0-9]+)\.\.([a-z0-9]+)\s+(\S+)\s+->\s+(\S+)$/,
        (e, [n, t, a, s]) => {
          e.branch.local = a, e.hash.local = n, e.branch.remote = s, e.hash.remote = t;
        }
      )
    ], ai = (e, n) => ie(new oa(), ti, [e, n]), Xa = (e, n) => Object.assign(
      new oa(),
      ai(e, n),
      Fr(e, n)
    );
  }
}), si, Nr, ii, cm = y({
  "src/lib/parsers/parse-merge.ts"() {
    sm(), E(), Dr(), si = [
      new O(/^Auto-merging\s+(.+)$/, (e, [n]) => {
        e.merges.push(n);
      }),
      new O(/^CONFLICT\s+\((.+)\): Merge conflict in (.+)$/, (e, [n, t]) => {
        e.conflicts.push(new zn(n, t));
      }),
      new O(
        /^CONFLICT\s+\((.+\/delete)\): (.+) deleted in (.+) and/,
        (e, [n, t, a]) => {
          e.conflicts.push(new zn(n, t, { deleteRef: a }));
        }
      ),
      new O(/^CONFLICT\s+\((.+)\):/, (e, [n]) => {
        e.conflicts.push(new zn(n, null));
      }),
      new O(/^Automatic merge failed;\s+(.+)$/, (e, [n]) => {
        e.result = n;
      })
    ], Nr = (e, n) => Object.assign(ii(e, n), Xa(e, n)), ii = (e) => ie(new Sr(), si, e);
  }
});
function oi(e) {
  return e.length ? {
    commands: ["merge", ...e],
    format: "utf-8",
    parser(n, t) {
      const a = Nr(n, t);
      if (a.failed)
        throw new xn(a);
      return a;
    }
  } : ae("Git.merge requires at least one option");
}
var pm = y({
  "src/lib/tasks/merge.ts"() {
    Ke(), cm(), U();
  }
});
function um(e, n, t) {
  const a = t.includes("deleted"), s = t.includes("tag") || /^refs\/tags/.test(e), i = !t.includes("new");
  return {
    deleted: a,
    tag: s,
    branch: !s,
    new: !i,
    alreadyUpdated: i,
    local: e,
    remote: n
  };
}
var ri, zr, ci, lm = y({
  "src/lib/parsers/parse-push.ts"() {
    E(), Pr(), ri = [
      new O(/^Pushing to (.+)$/, (e, [n]) => {
        e.repo = n;
      }),
      new O(/^updating local tracking ref '(.+)'/, (e, [n]) => {
        e.ref = tn(le({}, e.ref || {}), {
          local: n
        });
      }),
      new O(/^[=*-]\s+([^:]+):(\S+)\s+\[(.+)]$/, (e, [n, t, a]) => {
        e.pushed.push(um(n, t, a));
      }),
      new O(
        /^Branch '([^']+)' set up to track remote branch '([^']+)' from '([^']+)'/,
        (e, [n, t, a]) => {
          e.branch = tn(le({}, e.branch || {}), {
            local: n,
            remote: t,
            remoteName: a
          });
        }
      ),
      new O(
        /^([^:]+):(\S+)\s+([a-z0-9]+)\.\.([a-z0-9]+)$/,
        (e, [n, t, a, s]) => {
          e.update = {
            head: {
              local: n,
              remote: t
            },
            hash: {
              from: a,
              to: s
            }
          };
        }
      )
    ], zr = (e, n) => {
      const t = ci(e, n), a = Fr(e, n);
      return le(le({}, t), a);
    }, ci = (e, n) => ie({ pushed: [] }, ri, [e, n]);
  }
}), qr = {};
M(qr, {
  pushTagsTask: () => dm,
  pushTask: () => Qa
});
function dm(e = {}, n) {
  return L(n, "--tags"), Qa(e, n);
}
function Qa(e = {}, n) {
  const t = ["push", ...n];
  return e.branch && t.splice(1, 0, e.branch), e.remote && t.splice(1, 0, e.remote), tt(t, "-v"), L(t, "--verbose"), L(t, "--porcelain"), {
    commands: t,
    format: "utf-8",
    parser: zr
  };
}
var Ir = y({
  "src/lib/tasks/push.ts"() {
    lm(), E();
  }
});
function mm() {
  return {
    showBuffer() {
      const e = ["show", ...te(arguments, 1)];
      return e.includes("--binary") || e.splice(1, 0, "--binary"), this._runTask(
        Vo(e),
        z(arguments)
      );
    },
    show() {
      const e = ["show", ...te(arguments, 1)];
      return this._runTask(
        ne(e),
        z(arguments)
      );
    }
  };
}
var fm = y({
  "src/lib/tasks/show.ts"() {
    E(), U();
  }
}), pi, Ur, hm = y({
  "src/lib/responses/FileStatusSummary.ts"() {
    pi = /^(.+) -> (.+)$/, Ur = class {
      constructor(e, n, t) {
        if (this.path = e, this.index = n, this.working_dir = t, n + t === "R") {
          const a = pi.exec(e) || [null, e, e];
          this.from = a[1] || "", this.path = a[2] || "";
        }
      }
    };
  }
});
function ui(e) {
  const [n, t] = e.split(We);
  return {
    from: t || n,
    to: n
  };
}
function re(e, n, t) {
  return [`${e}${n}`, t];
}
function Pt(e, ...n) {
  return n.map((t) => re(e, t, (a, s) => L(a.conflicted, s)));
}
function xm(e, n) {
  const t = n.trim();
  switch (" ") {
    case t.charAt(2):
      return a(t.charAt(0), t.charAt(1), t.substr(3));
    case t.charAt(1):
      return a(" ", t.charAt(0), t.substr(2));
    default:
      return;
  }
  function a(s, i, r) {
    const u = `${s}${i}`, l = Mr.get(u);
    l && l(e, r), u !== "##" && u !== "!!" && e.files.push(new Ur(r.replace(/\0.+$/, ""), s, i));
  }
}
var li, Mr, $r, vm = y({
  "src/lib/responses/StatusSummary.ts"() {
    E(), hm(), li = class {
      constructor() {
        this.not_added = [], this.conflicted = [], this.created = [], this.deleted = [], this.ignored = void 0, this.modified = [], this.renamed = [], this.files = [], this.staged = [], this.ahead = 0, this.behind = 0, this.current = null, this.tracking = null, this.detached = !1, this.isClean = () => !this.files.length;
      }
    }, Mr = new Map([
      re(
        " ",
        "A",
        (e, n) => L(e.created, n)
      ),
      re(
        " ",
        "D",
        (e, n) => L(e.deleted, n)
      ),
      re(
        " ",
        "M",
        (e, n) => L(e.modified, n)
      ),
      re(
        "A",
        " ",
        (e, n) => L(e.created, n) && L(e.staged, n)
      ),
      re(
        "A",
        "M",
        (e, n) => L(e.created, n) && L(e.staged, n) && L(e.modified, n)
      ),
      re(
        "D",
        " ",
        (e, n) => L(e.deleted, n) && L(e.staged, n)
      ),
      re(
        "M",
        " ",
        (e, n) => L(e.modified, n) && L(e.staged, n)
      ),
      re(
        "M",
        "M",
        (e, n) => L(e.modified, n) && L(e.staged, n)
      ),
      re("R", " ", (e, n) => {
        L(e.renamed, ui(n));
      }),
      re("R", "M", (e, n) => {
        const t = ui(n);
        L(e.renamed, t), L(e.modified, t.to);
      }),
      re("!", "!", (e, n) => {
        L(e.ignored = e.ignored || [], n);
      }),
      re(
        "?",
        "?",
        (e, n) => L(e.not_added, n)
      ),
      ...Pt(
        "A",
        "A",
        "U"
        /* UNMERGED */
      ),
      ...Pt(
        "D",
        "D",
        "U"
        /* UNMERGED */
      ),
      ...Pt(
        "U",
        "A",
        "D",
        "U"
        /* UNMERGED */
      ),
      [
        "##",
        (e, n) => {
          const t = /ahead (\d+)/, a = /behind (\d+)/, s = /^(.+?(?=(?:\.{3}|\s|$)))/, i = /\.{3}(\S*)/, r = /\son\s([\S]+)$/;
          let u;
          u = t.exec(n), e.ahead = u && +u[1] || 0, u = a.exec(n), e.behind = u && +u[1] || 0, u = s.exec(n), e.current = u && u[1], u = i.exec(n), e.tracking = u && u[1], u = r.exec(n), e.current = u && u[1] || e.current, e.detached = /\(no branch\)/.test(n);
        }
      ]
    ]), $r = function(e) {
      const n = e.split(We), t = new li();
      for (let a = 0, s = n.length; a < s; ) {
        let i = n[a++].trim();
        i && (i.charAt(0) === "R" && (i += We + (n[a++] || "")), xm(t, i));
      }
      return t;
    };
  }
});
function gm(e) {
  return {
    format: "utf-8",
    commands: [
      "status",
      "--porcelain",
      "-b",
      "-u",
      "--null",
      ...e.filter((t) => !Hr.includes(t))
    ],
    parser(t) {
      return $r(t);
    }
  };
}
var Hr, bm = y({
  "src/lib/tasks/status.ts"() {
    vm(), Hr = ["--null", "-z"];
  }
});
function Hn(e = 0, n = 0, t = 0, a = "", s = !0) {
  return Object.defineProperty(
    {
      major: e,
      minor: n,
      patch: t,
      agent: a,
      installed: s
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
function ym() {
  return Hn(0, 0, 0, "", !1);
}
function wm() {
  return {
    version() {
      return this._runTask({
        commands: ["--version"],
        format: "utf-8",
        parser: _m,
        onError(e, n, t, a) {
          if (e.exitCode === -2)
            return t(Buffer.from(Za));
          a(n);
        }
      });
    }
  };
}
function _m(e) {
  return e === Za ? ym() : ie(Hn(0, 0, 0, e), Gr, e);
}
var Za, Gr, km = y({
  "src/lib/tasks/version.ts"() {
    E(), Za = "installed=false", Gr = [
      new O(
        /version (\d+)\.(\d+)\.(\d+)(?:\s*\((.+)\))?/,
        (e, [n, t, a, s = ""]) => {
          Object.assign(
            e,
            Hn(B(n), B(t), B(a), s)
          );
        }
      ),
      new O(
        /version (\d+)\.(\d+)\.(\D+)(.+)?$/,
        (e, [n, t, a, s = ""]) => {
          Object.assign(e, Hn(B(n), B(t), a, s));
        }
      )
    ];
  }
}), Wr = {};
M(Wr, {
  SimpleGitApi: () => ra
});
var ra, Cm = y({
  "src/lib/simple-git-api.ts"() {
    Od(), jd(), Ad(), Bd(), Id(), nr(), Md(), or(), Hd(), Jd(), Rr(), pm(), Ir(), fm(), bm(), U(), km(), E(), ra = class {
      constructor(e) {
        this._executor = e;
      }
      _runTask(e, n) {
        const t = this._executor.chain(), a = t.push(e);
        return n && Rd(e, a, n), Object.create(this, {
          then: { value: a.then.bind(a) },
          catch: { value: a.catch.bind(a) },
          _executor: { value: t }
        });
      }
      add(e) {
        return this._runTask(
          ne(["add", ...be(e)]),
          z(arguments)
        );
      }
      cwd(e) {
        const n = z(arguments);
        return typeof e == "string" ? this._runTask(Ks(e, this._executor), n) : typeof (e == null ? void 0 : e.path) == "string" ? this._runTask(
          Ks(
            e.path,
            e.root && this._executor || void 0
          ),
          n
        ) : this._runTask(
          ae("Git.cwd: workingDirectory must be supplied as a string"),
          n
        );
      }
      hashObject(e, n) {
        return this._runTask(
          $d(e, n === !0),
          z(arguments)
        );
      }
      init(e) {
        return this._runTask(
          Kd(e === !0, this._executor.cwd, te(arguments)),
          z(arguments)
        );
      }
      merge() {
        return this._runTask(
          oi(te(arguments)),
          z(arguments)
        );
      }
      mergeFromTo(e, n) {
        return Y(e) && Y(n) ? this._runTask(
          oi([e, n, ...te(arguments)]),
          z(arguments, !1)
        ) : this._runTask(
          ae(
            "Git.mergeFromTo requires that the 'remote' and 'branch' arguments are supplied as strings"
          )
        );
      }
      outputHandler(e) {
        return this._executor.outputHandler = e, this;
      }
      push() {
        const e = Qa(
          {
            remote: ye(arguments[0], Y),
            branch: ye(arguments[1], Y)
          },
          te(arguments)
        );
        return this._runTask(e, z(arguments));
      }
      stash() {
        return this._runTask(
          ne(["stash", ...te(arguments)]),
          z(arguments)
        );
      }
      status() {
        return this._runTask(
          gm(te(arguments)),
          z(arguments)
        );
      }
    }, Object.assign(
      ra.prototype,
      Fd(),
      qd(),
      fd(),
      Pd(),
      Ud(),
      gd(),
      am(),
      mm(),
      wm()
    );
  }
}), Vr = {};
M(Vr, {
  Scheduler: () => Kr
});
var di, Kr, Tm = y({
  "src/lib/runners/scheduler.ts"() {
    E(), lr(), di = /* @__PURE__ */ (() => {
      let e = 0;
      return () => {
        e++;
        const { promise: n, done: t } = go();
        return {
          promise: n,
          done: t,
          id: e
        };
      };
    })(), Kr = class {
      constructor(e = 2) {
        this.concurrency = e, this.logger = $a("", "scheduler"), this.pending = [], this.running = [], this.logger("Constructed, concurrency=%s", e);
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
        const e = L(this.running, this.pending.shift());
        this.logger("Attempting id=%s", e.id), e.done(() => {
          this.logger("Completing id=", e.id), tt(this.running, e), this.schedule();
        });
      }
      next() {
        const { promise: e, id: n } = L(this.pending, di());
        return this.logger("Scheduling id=%s", n), this.schedule(), e;
      }
    };
  }
}), Jr = {};
M(Jr, {
  applyPatchTask: () => Em
});
function Em(e, n) {
  return ne(["apply", ...n, ...e]);
}
var Rm = y({
  "src/lib/tasks/apply-patch.ts"() {
    U();
  }
});
function Sm(e, n) {
  return {
    branch: e,
    hash: n,
    success: !0
  };
}
function Om(e) {
  return {
    branch: e,
    hash: null,
    success: !1
  };
}
var Yr, jm = y({
  "src/lib/responses/BranchDeleteSummary.ts"() {
    Yr = class {
      constructor() {
        this.all = [], this.branches = {}, this.errors = [];
      }
      get success() {
        return !this.errors.length;
      }
    };
  }
});
function Xr(e, n) {
  return n === 1 && ca.test(e);
}
var mi, ca, fi, rt, Fm = y({
  "src/lib/parsers/parse-branch-delete.ts"() {
    jm(), E(), mi = /(\S+)\s+\(\S+\s([^)]+)\)/, ca = /^error[^']+'([^']+)'/m, fi = [
      new O(mi, (e, [n, t]) => {
        const a = Sm(n, t);
        e.all.push(a), e.branches[n] = a;
      }),
      new O(ca, (e, [n]) => {
        const t = Om(n);
        e.errors.push(t), e.all.push(t), e.branches[n] = t;
      })
    ], rt = (e, n) => ie(new Yr(), fi, [e, n]);
  }
}), Qr, Am = y({
  "src/lib/responses/BranchSummary.ts"() {
    Qr = class {
      constructor() {
        this.all = [], this.branches = {}, this.current = "", this.detached = !1;
      }
      push(e, n, t, a, s) {
        e === "*" && (this.detached = n, this.current = t), this.all.push(t), this.branches[t] = {
          current: e === "*",
          linkedWorkTree: e === "+",
          name: t,
          commit: a,
          label: s
        };
      }
    };
  }
});
function hi(e) {
  return e ? e.charAt(0) : "";
}
function Zr(e) {
  return ie(new Qr(), ec, e);
}
var ec, Lm = y({
  "src/lib/parsers/parse-branch.ts"() {
    Am(), E(), ec = [
      new O(
        /^([*+]\s)?\((?:HEAD )?detached (?:from|at) (\S+)\)\s+([a-z0-9]+)\s(.*)$/,
        (e, [n, t, a, s]) => {
          e.push(hi(n), !0, t, a, s);
        }
      ),
      new O(
        new RegExp("^([*+]\\s)?(\\S+)\\s+([a-z0-9]+)\\s?(.*)$", "s"),
        (e, [n, t, a, s]) => {
          e.push(hi(n), !1, t, a, s);
        }
      )
    ];
  }
}), nc = {};
M(nc, {
  branchLocalTask: () => Bm,
  branchTask: () => Pm,
  containsDeleteBranchCommand: () => tc,
  deleteBranchTask: () => Nm,
  deleteBranchesTask: () => Dm
});
function tc(e) {
  const n = ["-d", "-D", "--delete"];
  return e.some((t) => n.includes(t));
}
function Pm(e) {
  const n = tc(e), t = ["branch", ...e];
  return t.length === 1 && t.push("-a"), t.includes("-v") || t.splice(1, 0, "-v"), {
    format: "utf-8",
    commands: t,
    parser(a, s) {
      return n ? rt(a, s).all[0] : Zr(a);
    }
  };
}
function Bm() {
  return {
    format: "utf-8",
    commands: ["branch", "-v"],
    parser: Zr
  };
}
function Dm(e, n = !1) {
  return {
    format: "utf-8",
    commands: ["branch", "-v", n ? "-D" : "-d", ...e],
    parser(t, a) {
      return rt(t, a);
    },
    onError({ exitCode: t, stdOut: a }, s, i, r) {
      if (!Xr(String(s), t))
        return r(s);
      i(a);
    }
  };
}
function Nm(e, n = !1) {
  const t = {
    format: "utf-8",
    commands: ["branch", "-v", n ? "-D" : "-d", e],
    parser(a, s) {
      return rt(a, s).branches[e];
    },
    onError({ exitCode: a, stdErr: s, stdOut: i }, r, u, l) {
      if (!Xr(String(r), a))
        return l(r);
      throw new xn(
        t.parser(pn(i), pn(s)),
        String(r)
      );
    }
  };
  return t;
}
var zm = y({
  "src/lib/tasks/branch.ts"() {
    Ke(), Fm(), Lm(), E();
  }
}), ac, qm = y({
  "src/lib/responses/CheckIgnore.ts"() {
    ac = (e) => e.split(/\n/g).map((n) => n.trim()).filter((n) => !!n);
  }
}), sc = {};
M(sc, {
  checkIgnoreTask: () => Im
});
function Im(e) {
  return {
    commands: ["check-ignore", ...e],
    format: "utf-8",
    parser: ac
  };
}
var Um = y({
  "src/lib/tasks/check-ignore.ts"() {
    qm();
  }
}), ic = {};
M(ic, {
  cloneMirrorTask: () => $m,
  cloneTask: () => oc
});
function Mm(e) {
  return /^--upload-pack(=|$)/.test(e);
}
function oc(e, n, t) {
  const a = ["clone", ...t];
  return Y(e) && a.push(e), Y(n) && a.push(n), a.find(Mm) ? ae("git.fetch: potential exploit argument blocked.") : ne(a);
}
function $m(e, n, t) {
  return L(t, "--mirror"), oc(e, n, t);
}
var Hm = y({
  "src/lib/tasks/clone.ts"() {
    U(), E();
  }
});
function Gm(e, n) {
  return ie({
    raw: e,
    remote: null,
    branches: [],
    tags: [],
    updated: [],
    deleted: []
  }, rc, [e, n]);
}
var rc, Wm = y({
  "src/lib/parsers/parse-fetch.ts"() {
    E(), rc = [
      new O(/From (.+)$/, (e, [n]) => {
        e.remote = n;
      }),
      new O(/\* \[new branch]\s+(\S+)\s*-> (.+)$/, (e, [n, t]) => {
        e.branches.push({
          name: n,
          tracking: t
        });
      }),
      new O(/\* \[new tag]\s+(\S+)\s*-> (.+)$/, (e, [n, t]) => {
        e.tags.push({
          name: n,
          tracking: t
        });
      }),
      new O(/- \[deleted]\s+\S+\s*-> (.+)$/, (e, [n]) => {
        e.deleted.push({
          tracking: n
        });
      }),
      new O(
        /\s*([^.]+)\.\.(\S+)\s+(\S+)\s*-> (.+)$/,
        (e, [n, t, a, s]) => {
          e.updated.push({
            name: a,
            tracking: s,
            to: t,
            from: n
          });
        }
      )
    ];
  }
}), cc = {};
M(cc, {
  fetchTask: () => Km
});
function Vm(e) {
  return /^--upload-pack(=|$)/.test(e);
}
function Km(e, n, t) {
  const a = ["fetch", ...t];
  return e && n && a.push(e, n), a.find(Vm) ? ae("git.fetch: potential exploit argument blocked.") : {
    commands: a,
    format: "utf-8",
    parser: Gm
  };
}
var Jm = y({
  "src/lib/tasks/fetch.ts"() {
    Wm(), U();
  }
});
function Ym(e) {
  return ie({ moves: [] }, pc, e);
}
var pc, Xm = y({
  "src/lib/parsers/parse-move.ts"() {
    E(), pc = [
      new O(/^Renaming (.+) to (.+)$/, (e, [n, t]) => {
        e.moves.push({ from: n, to: t });
      })
    ];
  }
}), uc = {};
M(uc, {
  moveTask: () => Qm
});
function Qm(e, n) {
  return {
    commands: ["mv", "-v", ...be(e), n],
    format: "utf-8",
    parser: Ym
  };
}
var Zm = y({
  "src/lib/tasks/move.ts"() {
    Xm(), E();
  }
}), lc = {};
M(lc, {
  pullTask: () => ef
});
function ef(e, n, t) {
  const a = ["pull", ...t];
  return e && n && a.splice(1, 0, e, n), {
    commands: a,
    format: "utf-8",
    parser(s, i) {
      return Xa(s, i);
    },
    onError(s, i, r, u) {
      const l = rm(
        pn(s.stdOut),
        pn(s.stdErr)
      );
      if (l)
        return u(new xn(l));
      u(i);
    }
  };
}
var nf = y({
  "src/lib/tasks/pull.ts"() {
    Ke(), Dr(), E();
  }
});
function tf(e) {
  const n = {};
  return dc(e, ([t]) => n[t] = { name: t }), Object.values(n);
}
function af(e) {
  const n = {};
  return dc(e, ([t, a, s]) => {
    n.hasOwnProperty(t) || (n[t] = {
      name: t,
      refs: { fetch: "", push: "" }
    }), s && a && (n[t].refs[s.replace(/[^a-z]/g, "")] = a);
  }), Object.values(n);
}
function dc(e, n) {
  Fa(e, (t) => n(t.split(/\s+/)));
}
var sf = y({
  "src/lib/responses/GetRemoteSummary.ts"() {
    E();
  }
}), mc = {};
M(mc, {
  addRemoteTask: () => of,
  getRemotesTask: () => rf,
  listRemotesTask: () => cf,
  remoteTask: () => pf,
  removeRemoteTask: () => uf
});
function of(e, n, t) {
  return ne(["remote", "add", ...t, e, n]);
}
function rf(e) {
  const n = ["remote"];
  return e && n.push("-v"), {
    commands: n,
    format: "utf-8",
    parser: e ? af : tf
  };
}
function cf(e) {
  const n = [...e];
  return n[0] !== "ls-remote" && n.unshift("ls-remote"), ne(n);
}
function pf(e) {
  const n = [...e];
  return n[0] !== "remote" && n.unshift("remote"), ne(n);
}
function uf(e) {
  return ne(["remote", "remove", e]);
}
var lf = y({
  "src/lib/tasks/remote.ts"() {
    sf(), U();
  }
}), fc = {};
M(fc, {
  stashListTask: () => df
});
function df(e = {}, n) {
  const t = Er(e), a = ["stash", "list", ...t.commands, ...n], s = _r(
    t.splitter,
    t.fields,
    Ga(a)
  );
  return ot(a) || {
    commands: a,
    format: "utf-8",
    parser: s
  };
}
var mf = y({
  "src/lib/tasks/stash-list.ts"() {
    yn(), Cr(), Ya(), Rr();
  }
}), hc = {};
M(hc, {
  addSubModuleTask: () => ff,
  initSubModuleTask: () => hf,
  subModuleTask: () => ct,
  updateSubModuleTask: () => xf
});
function ff(e, n) {
  return ct(["add", e, n]);
}
function hf(e) {
  return ct(["init", ...e]);
}
function ct(e) {
  const n = [...e];
  return n[0] !== "submodule" && n.unshift("submodule"), ne(n);
}
function xf(e) {
  return ct(["update", ...e]);
}
var vf = y({
  "src/lib/tasks/sub-module.ts"() {
    U();
  }
});
function gf(e, n) {
  const t = isNaN(e), a = isNaN(n);
  return t !== a ? t ? 1 : -1 : t ? xc(e, n) : 0;
}
function xc(e, n) {
  return e === n ? 0 : e > n ? 1 : -1;
}
function bf(e) {
  return e.trim();
}
function Fn(e) {
  return typeof e == "string" && parseInt(e.replace(/^\D+/g, ""), 10) || 0;
}
var xi, vc, yf = y({
  "src/lib/responses/TagList.ts"() {
    xi = class {
      constructor(e, n) {
        this.all = e, this.latest = n;
      }
    }, vc = function(e, n = !1) {
      const t = e.split(`
`).map(bf).filter(Boolean);
      n || t.sort(function(s, i) {
        const r = s.split("."), u = i.split(".");
        if (r.length === 1 || u.length === 1)
          return gf(Fn(r[0]), Fn(u[0]));
        for (let l = 0, d = Math.max(r.length, u.length); l < d; l++) {
          const p = xc(Fn(r[l]), Fn(u[l]));
          if (p)
            return p;
        }
        return 0;
      });
      const a = n ? t[0] : [...t].reverse().find((s) => s.indexOf(".") >= 0);
      return new xi(t, a);
    };
  }
}), gc = {};
M(gc, {
  addAnnotatedTagTask: () => kf,
  addTagTask: () => _f,
  tagListTask: () => wf
});
function wf(e = []) {
  const n = e.some((t) => /^--sort=/.test(t));
  return {
    format: "utf-8",
    commands: ["tag", "-l", ...e],
    parser(t) {
      return vc(t, n);
    }
  };
}
function _f(e) {
  return {
    format: "utf-8",
    commands: ["tag", e],
    parser() {
      return { name: e };
    }
  };
}
function kf(e, n) {
  return {
    format: "utf-8",
    commands: ["tag", "-a", "-m", n, e],
    parser() {
      return { name: e };
    }
  };
}
var Cf = y({
  "src/lib/tasks/tag.ts"() {
    yf();
  }
}), Tf = Ul({
  "src/git.js"(e, n) {
    var { GitExecutor: t } = (Ed(), N(dr)), { SimpleGitApi: a } = (Cm(), N(Wr)), { Scheduler: s } = (Tm(), N(Vr)), { configurationErrorTask: i } = (U(), N(na)), {
      asArray: r,
      filterArray: u,
      filterPrimitives: l,
      filterString: d,
      filterStringOrStringArray: p,
      filterType: c,
      getTrailingOptions: o,
      trailingFunctionArgument: m,
      trailingOptionsArgument: h
    } = (E(), N(No)), { applyPatchTask: x } = (Rm(), N(Jr)), {
      branchTask: g,
      branchLocalTask: v,
      deleteBranchesTask: w,
      deleteBranchTask: _
    } = (zm(), N(nc)), { checkIgnoreTask: F } = (Um(), N(sc)), { checkIsRepoTask: j } = (Uo(), N(zo)), { cloneTask: W, cloneMirrorTask: D } = (Hm(), N(ic)), { cleanWithOptionsTask: X, isCleanOptionsArray: Q } = (Qo(), N(Yo)), { diffSummaryTask: me } = (Ya(), N(Tr)), { fetchTask: ut } = (Jm(), N(cc)), { moveTask: Ae } = (Zm(), N(uc)), { pullTask: wn } = (nf(), N(lc)), { pushTagsTask: J } = (Ir(), N(qr)), {
      addRemoteTask: Ie,
      getRemotesTask: Je,
      listRemotesTask: R,
      remoteTask: S,
      removeRemoteTask: G
    } = (lf(), N(mc)), { getResetMode: we, resetTask: $ } = (ur(), N(rr)), { stashListTask: ve } = (mf(), N(fc)), {
      addSubModuleTask: Ye,
      initSubModuleTask: pe,
      subModuleTask: oe,
      updateSubModuleTask: Ue
    } = (vf(), N(hc)), { addAnnotatedTagTask: Xe, addTagTask: V, tagListTask: Cc } = (Cf(), N(gc)), { straightThroughBufferTask: Tc, straightThroughStringTask: ge } = (U(), N(na));
    function T(b, C) {
      this._plugins = C, this._executor = new t(
        b.baseDir,
        new s(b.maxConcurrentProcesses),
        C
      ), this._trimmed = b.trimmed;
    }
    (T.prototype = Object.create(a.prototype)).constructor = T, T.prototype.customBinary = function(b) {
      return this._plugins.reconfigure("binary", b), this;
    }, T.prototype.env = function(b, C) {
      return arguments.length === 1 && typeof b == "object" ? this._executor.env = b : (this._executor.env = this._executor.env || {})[b] = C, this;
    }, T.prototype.stashList = function(b) {
      return this._runTask(
        ve(
          h(arguments) || {},
          u(b) && b || []
        ),
        m(arguments)
      );
    };
    function es(b, C, P, Z) {
      return typeof P != "string" ? i(`git.${b}() requires a string 'repoPath'`) : C(P, c(Z, d), o(arguments));
    }
    T.prototype.clone = function() {
      return this._runTask(
        es("clone", W, ...arguments),
        m(arguments)
      );
    }, T.prototype.mirror = function() {
      return this._runTask(
        es("mirror", D, ...arguments),
        m(arguments)
      );
    }, T.prototype.mv = function(b, C) {
      return this._runTask(Ae(b, C), m(arguments));
    }, T.prototype.checkoutLatestTag = function(b) {
      var C = this;
      return this.pull(function() {
        C.tags(function(P, Z) {
          C.checkout(Z.latest, b);
        });
      });
    }, T.prototype.pull = function(b, C, P, Z) {
      return this._runTask(
        wn(
          c(b, d),
          c(C, d),
          o(arguments)
        ),
        m(arguments)
      );
    }, T.prototype.fetch = function(b, C) {
      return this._runTask(
        ut(
          c(b, d),
          c(C, d),
          o(arguments)
        ),
        m(arguments)
      );
    }, T.prototype.silent = function(b) {
      return console.warn(
        "simple-git deprecation notice: git.silent: logging should be configured using the `debug` library / `DEBUG` environment variable, this will be an error in version 3"
      ), this;
    }, T.prototype.tags = function(b, C) {
      return this._runTask(
        Cc(o(arguments)),
        m(arguments)
      );
    }, T.prototype.rebase = function() {
      return this._runTask(
        ge(["rebase", ...o(arguments)]),
        m(arguments)
      );
    }, T.prototype.reset = function(b) {
      return this._runTask(
        $(we(b), o(arguments)),
        m(arguments)
      );
    }, T.prototype.revert = function(b) {
      const C = m(arguments);
      return typeof b != "string" ? this._runTask(i("Commit must be a string"), C) : this._runTask(
        ge(["revert", ...o(arguments, 0, !0), b]),
        C
      );
    }, T.prototype.addTag = function(b) {
      const C = typeof b == "string" ? V(b) : i("Git.addTag requires a tag name");
      return this._runTask(C, m(arguments));
    }, T.prototype.addAnnotatedTag = function(b, C) {
      return this._runTask(
        Xe(b, C),
        m(arguments)
      );
    }, T.prototype.deleteLocalBranch = function(b, C, P) {
      return this._runTask(
        _(b, typeof C == "boolean" ? C : !1),
        m(arguments)
      );
    }, T.prototype.deleteLocalBranches = function(b, C, P) {
      return this._runTask(
        w(b, typeof C == "boolean" ? C : !1),
        m(arguments)
      );
    }, T.prototype.branch = function(b, C) {
      return this._runTask(
        g(o(arguments)),
        m(arguments)
      );
    }, T.prototype.branchLocal = function(b) {
      return this._runTask(v(), m(arguments));
    }, T.prototype.raw = function(b) {
      const C = !Array.isArray(b), P = [].slice.call(C ? arguments : b, 0);
      for (let fe = 0; fe < P.length && C; fe++)
        if (!l(P[fe])) {
          P.splice(fe, P.length - fe);
          break;
        }
      P.push(...o(arguments, 0, !0));
      var Z = m(arguments);
      return P.length ? this._runTask(ge(P, this._trimmed), Z) : this._runTask(
        i("Raw: must supply one or more command to execute"),
        Z
      );
    }, T.prototype.submoduleAdd = function(b, C, P) {
      return this._runTask(Ye(b, C), m(arguments));
    }, T.prototype.submoduleUpdate = function(b, C) {
      return this._runTask(
        Ue(o(arguments, !0)),
        m(arguments)
      );
    }, T.prototype.submoduleInit = function(b, C) {
      return this._runTask(
        pe(o(arguments, !0)),
        m(arguments)
      );
    }, T.prototype.subModule = function(b, C) {
      return this._runTask(
        oe(o(arguments)),
        m(arguments)
      );
    }, T.prototype.listRemote = function() {
      return this._runTask(
        R(o(arguments)),
        m(arguments)
      );
    }, T.prototype.addRemote = function(b, C, P) {
      return this._runTask(
        Ie(b, C, o(arguments)),
        m(arguments)
      );
    }, T.prototype.removeRemote = function(b, C) {
      return this._runTask(G(b), m(arguments));
    }, T.prototype.getRemotes = function(b, C) {
      return this._runTask(Je(b === !0), m(arguments));
    }, T.prototype.remote = function(b, C) {
      return this._runTask(
        S(o(arguments)),
        m(arguments)
      );
    }, T.prototype.tag = function(b, C) {
      const P = o(arguments);
      return P[0] !== "tag" && P.unshift("tag"), this._runTask(ge(P), m(arguments));
    }, T.prototype.updateServerInfo = function(b) {
      return this._runTask(
        ge(["update-server-info"]),
        m(arguments)
      );
    }, T.prototype.pushTags = function(b, C) {
      const P = J(
        { remote: c(b, d) },
        o(arguments)
      );
      return this._runTask(P, m(arguments));
    }, T.prototype.rm = function(b) {
      return this._runTask(
        ge(["rm", "-f", ...r(b)]),
        m(arguments)
      );
    }, T.prototype.rmKeepLocal = function(b) {
      return this._runTask(
        ge(["rm", "--cached", ...r(b)]),
        m(arguments)
      );
    }, T.prototype.catFile = function(b, C) {
      return this._catFile("utf-8", arguments);
    }, T.prototype.binaryCatFile = function() {
      return this._catFile("buffer", arguments);
    }, T.prototype._catFile = function(b, C) {
      var P = m(C), Z = ["cat-file"], fe = C[0];
      if (typeof fe == "string")
        return this._runTask(
          i("Git.catFile: options must be supplied as an array of strings"),
          P
        );
      Array.isArray(fe) && Z.push.apply(Z, fe);
      const lt = b === "buffer" ? Tc(Z) : ge(Z);
      return this._runTask(lt, P);
    }, T.prototype.diff = function(b, C) {
      const P = d(b) ? i(
        "git.diff: supplying options as a single string is no longer supported, switch to an array of strings"
      ) : ge(["diff", ...o(arguments)]);
      return this._runTask(P, m(arguments));
    }, T.prototype.diffSummary = function() {
      return this._runTask(
        me(o(arguments, 1)),
        m(arguments)
      );
    }, T.prototype.applyPatch = function(b) {
      const C = p(b) ? x(r(b), o([].slice.call(arguments, 1))) : i(
        "git.applyPatch requires one or more string patches as the first argument"
      );
      return this._runTask(C, m(arguments));
    }, T.prototype.revparse = function() {
      const b = ["rev-parse", ...o(arguments, !0)];
      return this._runTask(
        ge(b, !0),
        m(arguments)
      );
    }, T.prototype.clean = function(b, C, P) {
      const Z = Q(b), fe = Z && b.join("") || c(b, d) || "", lt = o([].slice.call(arguments, Z ? 1 : 0));
      return this._runTask(
        X(fe, lt),
        m(arguments)
      );
    }, T.prototype.exec = function(b) {
      const C = {
        commands: [],
        format: "utf-8",
        parser() {
          typeof b == "function" && b();
        }
      };
      return this._runTask(C);
    }, T.prototype.clearQueue = function() {
      return this;
    }, T.prototype.checkIgnore = function(b, C) {
      return this._runTask(
        F(r(c(b, p, []))),
        m(arguments)
      );
    }, T.prototype.checkIsRepo = function(b, C) {
      return this._runTask(
        j(c(b, d)),
        m(arguments)
      );
    }, n.exports = T;
  }
});
hn();
Fe();
var Ef = class extends ke {
  constructor(e, n) {
    super(void 0, n), this.config = e;
  }
};
Fe();
Fe();
var _e = class extends ke {
  constructor(e, n, t) {
    super(e, t), this.task = e, this.plugin = n, Object.setPrototypeOf(this, new.target.prototype);
  }
};
Ke();
wo();
Uo();
Qo();
nr();
ar();
or();
ur();
function Rf(e) {
  return e ? [{
    type: "spawn.before",
    action(a, s) {
      e.aborted && s.kill(new _e(void 0, "abort", "Abort already signaled"));
    }
  }, {
    type: "spawn.after",
    action(a, s) {
      function i() {
        s.kill(new _e(void 0, "abort", "Abort signal received"));
      }
      e.addEventListener("abort", i), s.spawned.on("close", () => e.removeEventListener("abort", i));
    }
  }] : void 0;
}
function Sf(e) {
  return typeof e == "string" && e.trim().toLowerCase() === "-c";
}
function Of(e, n) {
  if (Sf(e) && /^\s*protocol(.[a-z]+)?.allow/.test(n))
    throw new _e(
      void 0,
      "unsafe",
      "Configuring protocol.allow is not permitted without enabling allowUnsafeExtProtocol"
    );
}
function jf(e, n) {
  if (/^\s*--(upload|receive)-pack/.test(e))
    throw new _e(
      void 0,
      "unsafe",
      "Use of --upload-pack or --receive-pack is not permitted without enabling allowUnsafePack"
    );
  if (n === "clone" && /^\s*-u\b/.test(e))
    throw new _e(
      void 0,
      "unsafe",
      "Use of clone with option -u is not permitted without enabling allowUnsafePack"
    );
  if (n === "push" && /^\s*--exec\b/.test(e))
    throw new _e(
      void 0,
      "unsafe",
      "Use of push with option --exec is not permitted without enabling allowUnsafePack"
    );
}
function Ff({
  allowUnsafeProtocolOverride: e = !1,
  allowUnsafePack: n = !1
} = {}) {
  return {
    type: "spawn.args",
    action(t, a) {
      return t.forEach((s, i) => {
        const r = i < t.length ? t[i + 1] : "";
        e || Of(s, r), n || jf(s, a.method);
      }), t;
    }
  };
}
E();
function Af(e) {
  const n = cn(e, "-c");
  return {
    type: "spawn.args",
    action(t) {
      return [...n, ...t];
    }
  };
}
E();
var vi = He().promise;
function Lf({
  onClose: e = !0,
  onExit: n = 50
} = {}) {
  function t() {
    let s = -1;
    const i = {
      close: He(),
      closeTimeout: He(),
      exit: He(),
      exitTimeout: He()
    }, r = Promise.race([
      e === !1 ? vi : i.closeTimeout.promise,
      n === !1 ? vi : i.exitTimeout.promise
    ]);
    return a(e, i.close, i.closeTimeout), a(n, i.exit, i.exitTimeout), {
      close(u) {
        s = u, i.close.done();
      },
      exit(u) {
        s = u, i.exit.done();
      },
      get exitCode() {
        return s;
      },
      result: r
    };
  }
  function a(s, i, r) {
    s !== !1 && (s === !0 ? i.promise : i.promise.then(() => Xt(s))).then(r.done);
  }
  return {
    type: "spawn.after",
    action(s, i) {
      return nn(this, arguments, function* (r, { spawned: u, close: l }) {
        var d, p;
        const c = t();
        let o = !0, m = () => void (o = !1);
        (d = u.stdout) == null || d.on("data", m), (p = u.stderr) == null || p.on("data", m), u.on("error", m), u.on("close", (h) => c.close(h)), u.on("exit", (h) => c.exit(h));
        try {
          yield c.result, o && (yield Xt(50)), l(c.exitCode);
        } catch (h) {
          l(c.exitCode, h);
        }
      });
    }
  };
}
E();
var Pf = "Invalid value supplied for custom binary, requires a single string or an array containing either one or two strings", gi = "Invalid value supplied for custom binary, restricted characters must be removed or supply the unsafe.allowUnsafeCustomBinary option";
function Bf(e) {
  return !e || !/^([a-z]:)?([a-z0-9/.\\_-]+)$/i.test(e);
}
function bi(e, n) {
  if (e.length < 1 || e.length > 2)
    throw new _e(void 0, "binary", Pf);
  if (e.some(Bf))
    if (n)
      console.warn(gi);
    else
      throw new _e(void 0, "binary", gi);
  const [a, s] = e;
  return {
    binary: a,
    prefix: s
  };
}
function Df(e, n = ["git"], t = !1) {
  let a = bi(be(n), t);
  e.on("binary", (s) => {
    a = bi(be(s), t);
  }), e.append("spawn.binary", () => a.binary), e.append("spawn.args", (s) => a.prefix ? [a.prefix, ...s] : s);
}
Fe();
function Nf(e) {
  return !!(e.exitCode && e.stdErr.length);
}
function zf(e) {
  return Buffer.concat([...e.stdOut, ...e.stdErr]);
}
function qf(e = !1, n = Nf, t = zf) {
  return (a, s) => !e && a || !n(s) ? a : t(s);
}
function yi(e) {
  return {
    type: "task.error",
    action(n, t) {
      const a = e(n.error, {
        stdErr: t.stdErr,
        stdOut: t.stdOut,
        exitCode: t.exitCode
      });
      return Buffer.isBuffer(a) ? { error: new ke(void 0, a.toString("utf-8")) } : {
        error: a
      };
    }
  };
}
E();
var If = class {
  constructor() {
    this.plugins = /* @__PURE__ */ new Set(), this.events = new Ac();
  }
  on(e, n) {
    this.events.on(e, n);
  }
  reconfigure(e, n) {
    this.events.emit(e, n);
  }
  append(e, n) {
    const t = L(this.plugins, { type: e, action: n });
    return () => this.plugins.delete(t);
  }
  add(e) {
    const n = [];
    return be(e).forEach((t) => t && this.plugins.add(L(n, t))), () => {
      n.forEach((t) => this.plugins.delete(t));
    };
  }
  exec(e, n, t) {
    let a = n;
    const s = Object.freeze(Object.create(t));
    for (const i of this.plugins)
      i.type === e && (a = i.action(a, s));
    return a;
  }
};
E();
function Uf(e) {
  const n = "--progress", t = ["checkout", "clone", "fetch", "pull", "push"];
  return [{
    type: "spawn.args",
    action(i, r) {
      return t.includes(r.method) ? Ro(i, n) : i;
    }
  }, {
    type: "spawn.after",
    action(i, r) {
      var u;
      r.commands.includes(n) && ((u = r.spawned.stderr) == null || u.on("data", (l) => {
        const d = /^([\s\S]+?):\s*(\d+)% \((\d+)\/(\d+)\)/.exec(l.toString("utf8"));
        d && e({
          method: r.method,
          stage: Mf(d[1]),
          progress: B(d[2]),
          processed: B(d[3]),
          total: B(d[4])
        });
      }));
    }
  }];
}
function Mf(e) {
  return String(e.toLowerCase().split(" ", 1)) || "unknown";
}
E();
function $f(e) {
  const n = jo(e, ["uid", "gid"]);
  return {
    type: "spawn.options",
    action(t) {
      return le(le({}, n), t);
    }
  };
}
function Hf({
  block: e,
  stdErr: n = !0,
  stdOut: t = !0
}) {
  if (e > 0)
    return {
      type: "spawn.after",
      action(a, s) {
        var i, r;
        let u;
        function l() {
          u && clearTimeout(u), u = setTimeout(p, e);
        }
        function d() {
          var c, o;
          (c = s.spawned.stdout) == null || c.off("data", l), (o = s.spawned.stderr) == null || o.off("data", l), s.spawned.off("exit", d), s.spawned.off("close", d), u && clearTimeout(u);
        }
        function p() {
          d(), s.kill(new _e(void 0, "timeout", "block timeout reached"));
        }
        t && ((i = s.spawned.stdout) == null || i.on("data", l)), n && ((r = s.spawned.stderr) == null || r.on("data", l)), s.spawned.on("exit", d), s.spawned.on("close", d), l();
      }
    };
}
hn();
function Gf() {
  return {
    type: "spawn.args",
    action(e) {
      const n = [];
      let t;
      function a(s) {
        (t = t || []).push(...s);
      }
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        if (Mn(i)) {
          a(Hs(i));
          continue;
        }
        if (i === "--") {
          a(
            e.slice(s + 1).flatMap((r) => Mn(r) && Hs(r) || r)
          );
          break;
        }
        n.push(i);
      }
      return t ? [...n, "--", ...t.map(String)] : n;
    }
  };
}
E();
var Wf = Tf();
function Vf(e, n) {
  var t;
  const a = new If(), s = Bo(
    e && (typeof e == "string" ? { baseDir: e } : e) || {},
    n
  );
  if (!Aa(s.baseDir))
    throw new Ef(
      s,
      "Cannot use simple-git on a directory that does not exist"
    );
  return Array.isArray(s.config) && a.add(Af(s.config)), a.add(Ff(s.unsafe)), a.add(Gf()), a.add(Lf(s.completion)), s.abort && a.add(Rf(s.abort)), s.progress && a.add(Uf(s.progress)), s.timeout && a.add(Hf(s.timeout)), s.spawnOptions && a.add($f(s.spawnOptions)), a.add(yi(qf(!0))), s.errors && a.add(yi(s.errors)), Df(a, s.binary, (t = s.unsafe) == null ? void 0 : t.allowUnsafeCustomBinary), new Wf(s, a);
}
Ke();
var pa = Vf;
const Kf = (e) => {
  for (; e; ) {
    if (ee.existsSync(H.join(e, ".git")))
      return e;
    const n = H.dirname(e);
    if (n === e) break;
    e = n;
  }
  return null;
};
var bc = { exports: {} };
function Jf(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var ua = { exports: {} }, An = H.sep || "/", Yf = Xf;
function Xf(e) {
  if (typeof e != "string" || e.length <= 7 || e.substring(0, 7) != "file://")
    throw new TypeError("must pass in a file:// URI to convert to a file path");
  var n = decodeURI(e.substring(7)), t = n.indexOf("/"), a = n.substring(0, t), s = n.substring(t + 1);
  return a == "localhost" && (a = ""), a && (a = An + An + a), s = s.replace(/^(.+)\|/, "$1:"), An == "\\" && (s = s.replace(/\//g, "\\")), /^.+\:/.test(s) || (s = An + s), a + s;
}
(function(e, n) {
  var t = ee, a = H, s = Yf, i = a.join, r = a.dirname, u = t.accessSync && function(p) {
    try {
      t.accessSync(p);
    } catch {
      return !1;
    }
    return !0;
  } || t.existsSync || a.existsSync, l = {
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
  function d(p) {
    typeof p == "string" ? p = { bindings: p } : p || (p = {}), Object.keys(l).map(function(w) {
      w in p || (p[w] = l[w]);
    }), p.module_root || (p.module_root = n.getRoot(n.getFileName())), a.extname(p.bindings) != ".node" && (p.bindings += ".node");
    for (var c = typeof __webpack_require__ == "function" ? __non_webpack_require__ : Jf, o = [], m = 0, h = p.try.length, x, g, v; m < h; m++) {
      x = i.apply(
        null,
        p.try[m].map(function(w) {
          return p[w] || w;
        })
      ), o.push(x);
      try {
        return g = p.path ? c.resolve(x) : c(x), p.path || (g.path = x), g;
      } catch (w) {
        if (w.code !== "MODULE_NOT_FOUND" && w.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(w.message))
          throw w;
      }
    }
    throw v = new Error(
      `Could not locate the bindings file. Tried:
` + o.map(function(w) {
        return p.arrow + w;
      }).join(`
`)
    ), v.tries = o, v;
  }
  e.exports = n = d, n.getFileName = function(c) {
    var o = Error.prepareStackTrace, m = Error.stackTraceLimit, h = {}, x;
    Error.stackTraceLimit = 10, Error.prepareStackTrace = function(v, w) {
      for (var _ = 0, F = w.length; _ < F; _++)
        if (x = w[_].getFileName(), x !== __filename)
          if (c) {
            if (x !== c)
              return;
          } else
            return;
    }, Error.captureStackTrace(h), h.stack, Error.prepareStackTrace = o, Error.stackTraceLimit = m;
    var g = "file://";
    return x.indexOf(g) === 0 && (x = s(x)), x;
  }, n.getRoot = function(c) {
    for (var o = r(c), m; ; ) {
      if (o === "." && (o = process.cwd()), u(i(o, "package.json")) || u(i(o, "node_modules")))
        return o;
      if (m === o)
        throw new Error(
          'Could not find module root given file: "' + c + '". Do you have a `package.json` file? '
        );
      m = o, o = i(o, "..");
    }
  };
})(ua, ua.exports);
var Qf = ua.exports, Zf = Qf("node_sqlite3.node"), Bt = {}, wi;
function eh() {
  if (wi) return Bt;
  wi = 1;
  const e = je;
  function n(a, s, i) {
    const r = a[s];
    a[s] = function() {
      const u = new Error(), l = a.constructor.name + "#" + s + "(" + Array.prototype.slice.call(arguments).map(function(p) {
        return e.inspect(p, !1, 0);
      }).join(", ") + ")";
      typeof i > "u" && (i = -1), i < 0 && (i += arguments.length);
      const d = arguments[i];
      return typeof arguments[i] == "function" && (arguments[i] = function() {
        const c = arguments[0];
        return c && c.stack && !c.__augmented && (c.stack = t(c).join(`
`), c.stack += `
--> in ` + l, c.stack += `
` + t(u).slice(1).join(`
`), c.__augmented = !0), d.apply(this, arguments);
      }), r.apply(this, arguments);
    };
  }
  Bt.extendTrace = n;
  function t(a) {
    return a.stack.split(`
`).filter(function(s) {
      return s.indexOf(__filename) < 0;
    });
  }
  return Bt;
}
(function(e, n) {
  const t = H, a = Zf, s = Oc.EventEmitter;
  e.exports = a;
  function i(o) {
    return function(m) {
      let h;
      const x = Array.prototype.slice.call(arguments, 1);
      if (typeof x[x.length - 1] == "function") {
        const v = x[x.length - 1];
        h = function(w) {
          w && v(w);
        };
      }
      const g = new l(this, m, h);
      return o.call(this, g, x);
    };
  }
  function r(o, m) {
    for (const h in m.prototype)
      o.prototype[h] = m.prototype[h];
  }
  a.cached = {
    Database: function(o, m, h) {
      if (o === "" || o === ":memory:")
        return new u(o, m, h);
      let x;
      if (o = t.resolve(o), !a.cached.objects[o])
        x = a.cached.objects[o] = new u(o, m, h);
      else {
        x = a.cached.objects[o];
        const g = typeof m == "number" ? h : m;
        if (typeof g == "function") {
          let v = function() {
            g.call(x, null);
          };
          x.open ? process.nextTick(v) : x.once("open", v);
        }
      }
      return x;
    },
    objects: {}
  };
  const u = a.Database, l = a.Statement, d = a.Backup;
  r(u, s), r(l, s), r(d, s), u.prototype.prepare = i(function(o, m) {
    return m.length ? o.bind.apply(o, m) : o;
  }), u.prototype.run = i(function(o, m) {
    return o.run.apply(o, m).finalize(), this;
  }), u.prototype.get = i(function(o, m) {
    return o.get.apply(o, m).finalize(), this;
  }), u.prototype.all = i(function(o, m) {
    return o.all.apply(o, m).finalize(), this;
  }), u.prototype.each = i(function(o, m) {
    return o.each.apply(o, m).finalize(), this;
  }), u.prototype.map = i(function(o, m) {
    return o.map.apply(o, m).finalize(), this;
  }), u.prototype.backup = function() {
    let o;
    return arguments.length <= 2 ? o = new d(this, arguments[0], "main", "main", !0, arguments[1]) : o = new d(this, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), o.retryErrors = [a.BUSY, a.LOCKED], o;
  }, l.prototype.map = function() {
    const o = Array.prototype.slice.call(arguments), m = o.pop();
    return o.push(function(h, x) {
      if (h) return m(h);
      const g = {};
      if (x.length) {
        const v = Object.keys(x[0]), w = v[0];
        if (v.length > 2)
          for (let _ = 0; _ < x.length; _++)
            g[x[_][w]] = x[_];
        else {
          const _ = v[1];
          for (let F = 0; F < x.length; F++)
            g[x[F][w]] = x[F][_];
        }
      }
      m(h, g);
    }), this.all.apply(this, o);
  };
  let p = !1;
  const c = ["trace", "profile", "change"];
  u.prototype.addListener = u.prototype.on = function(o) {
    const m = s.prototype.addListener.apply(this, arguments);
    return c.indexOf(o) >= 0 && this.configure(o, !0), m;
  }, u.prototype.removeListener = function(o) {
    const m = s.prototype.removeListener.apply(this, arguments);
    return c.indexOf(o) >= 0 && !this._events[o] && this.configure(o, !1), m;
  }, u.prototype.removeAllListeners = function(o) {
    const m = s.prototype.removeAllListeners.apply(this, arguments);
    return c.indexOf(o) >= 0 && this.configure(o, !1), m;
  }, a.verbose = function() {
    if (!p) {
      const o = eh();
      [
        "prepare",
        "get",
        "run",
        "all",
        "each",
        "map",
        "close",
        "exec"
      ].forEach(function(m) {
        o.extendTrace(u.prototype, m);
      }), [
        "bind",
        "get",
        "run",
        "all",
        "each",
        "map",
        "reset",
        "finalize"
      ].forEach(function(m) {
        o.extendTrace(l.prototype, m);
      }), p = !0;
    }
    return a;
  };
})(bc);
var nh = bc.exports;
const th = /* @__PURE__ */ Yn(nh), ah = th.verbose(), sh = Ee.getPath("userData"), yc = H.join(sh, "gitviewer.db");
console.log("Database path:", yc);
const pt = new ah.Database(yc, (e) => {
  e ? console.error("Error opening database", e) : (console.log("Database opened successfully"), pt.serialize(() => {
    ih();
  }));
});
function ih() {
  pt.run(`
      CREATE TABLE IF NOT EXISTS git_info(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT NOT NULL
      )
    `, (e) => {
    e ? console.error("Error creating table", e) : console.log("Table created successfully");
  });
}
function wc(e, n) {
  const t = pt.prepare("INSERT INTO git_info (data) VALUES (?)", (a) => {
    if (a) {
      console.error("Error preparing statement", a), n(a, null);
      return;
    }
  });
  t.run(JSON.stringify(e), function(a) {
    a ? (console.error("Error inserting data", a), n(a, null)) : (console.log("Data inserted successfully"), n(null, this.lastID));
  }), t.finalize();
}
function oh() {
  pt.run("DELETE FROM git_info", (e) => {
    e ? console.error("Error deleting data", e) : console.log("Data deleted successfully");
  });
}
const _i = process.cwd();
function _c() {
  new Ci({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: H.join(_i, "dist/preload.js"),
      contextIsolation: !0,
      enableRemoteModule: !1
    }
  }).loadFile(H.join(_i, "dist/index.html"));
}
ze.handle("open-folder", async () => {
  const e = {
    // 設置對話框的選項
    title: "Open Folder",
    // 對話框標題
    properties: ["openDirectory"]
    // 對話框屬性：打開目錄
  }, n = await ki.showOpenDialog(e);
  if (!n.canceled) {
    const t = n.filePaths[0], a = ee.existsSync(H.join(t, ".git"));
    return { folderPath: t, gitExists: a };
  }
  return null;
});
ze.handle("init-git", async (e, n) => {
  var a, s;
  const t = Kf(H.dirname(n));
  if (t && (await ki.showMessageBox({
    type: "question",
    buttons: ["Yes", "No"],
    defaultId: 1,
    title: "Confirm",
    message: `The parent folder ${t} is already a git repository. Do you still want to run git init?`
  })).response === 1)
    return { status: "cancelled" };
  try {
    return (await I.post("http://localhost:3000/api/git/init", { folderPath: n })).data;
  } catch (i) {
    const r = ((s = (a = i.response) == null ? void 0 : a.data) == null ? void 0 : s.error) || i.message || "Unknown error";
    throw new Error(r);
  }
});
async function kc(e) {
  try {
    return (await I.get(`http://localhost:3000/api/git/allBranchesInfo?folderPath=${e}`)).data;
  } catch (n) {
    throw console.error("Error fetching git info:", n), n;
  }
}
ze.handle("get-git-info", async (e, n) => {
  var t, a;
  try {
    return await kc(n);
  } catch (s) {
    return { error: ((a = (t = s.response) == null ? void 0 : t.data) == null ? void 0 : a.error) || s.message };
  }
});
ze.handle("prepare-temp-git-folder", async (e, n) => {
  try {
    const t = H.join(Ee.getPath("userData"), "temp-git-folder"), a = H.join(t, "temp-worktree"), s = pa(n);
    await s.raw(["worktree", "prune"]), (await s.raw(["worktree", "list"])).includes(a) && await s.raw(["worktree", "remove", a]), ee.existsSync(t) && ee.rmSync(t, { recursive: !0, force: !0 }), ee.mkdirSync(t, { recursive: !0 });
    const r = (await s.branch()).current, l = (await s.raw(["ls-files", "--others", "--exclude-standard"])).split(`
`).filter(Boolean);
    await s.raw(["worktree", "add", "-f", a, r]);
    for (const o of l) {
      const m = H.join(n, o), h = H.join(a, o), x = H.dirname(h);
      ee.existsSync(x) || ee.mkdirSync(x, { recursive: !0 }), ee.copyFileSync(m, h);
    }
    const d = pa(a), p = await s.diff(["--cached"]);
    if (p.trim()) {
      const o = H.join(Ee.getPath("userData"), "cached-temp.patch");
      ee.writeFileSync(o, p), await d.raw(["apply", "--index", o]), ee.unlinkSync(o);
    }
    const c = await s.diff();
    if (c.trim()) {
      const o = H.join(Ee.getPath("userData"), "working-temp.patch");
      ee.writeFileSync(o, c), await d.raw(["apply", o]), ee.unlinkSync(o);
    }
    if (l.length > 0) {
      await d.raw(["add", "--intent-to-add", ...l]);
      for (const o of l)
        await d.raw(["reset", "HEAD", o]);
    }
    return a;
  } catch (t) {
    throw console.error("Error preparing temp git folder:", t), t;
  }
});
ze.handle("execute-git-command", async (e, { command: n, tempFolderPath: t }) => {
  try {
    const a = pa(t);
    let [s, ...i] = n.split(" ");
    switch (s.toLowerCase() === "git" && (s = i.shift()), console.log(`mainCommand:${s}`), console.log(`args:${i}`), s) {
      case "add":
        await a.add(i);
        break;
      case "commit":
        const u = i.indexOf("-m");
        if (u !== -1) {
          const l = i.slice(u + 1).join(" ");
          await a.commit(l, i.slice(0, u));
        } else
          await a.commit(i.join(" "));
        break;
      case "status":
        await a.status();
        break;
      default:
        await a.raw([s, ...i]);
    }
    const r = await kc(t);
    return await new Promise((u, l) => {
      wc(r, (d, p) => {
        d ? l(d) : u(p);
      });
    }), r;
  } catch (a) {
    throw console.error("Error executing git command:", a), a;
  }
});
ze.handle("create-git-info", async (e, n) => new Promise((t, a) => {
  wc(n, (s, i) => {
    s ? a(s) : t(i);
  });
}));
ze.handle("delete-git-info", () => {
  oh();
});
Ee.whenReady().then(_c);
Ee.on("window-all-closed", () => {
  process.platform !== "darwin" && Ee.quit();
});
Ee.on("active", () => {
  Ci.getAllWindows().length === 0 && _c();
});
