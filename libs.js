// https://web-packing.com/@cycle/run&@cycle/dom&xstream&strip-indent

/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};
/******/
/******/    // The require function
/******/    function __webpack_require__(moduleId) {
/******/
/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;
/******/
/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };
/******/
/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/        // Flag the module as loaded
/******/        module.l = true;
/******/
/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }
/******/
/******/
/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;
/******/
/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;
/******/
/******/    // identity function for calling harmory imports with the correct context
/******/    __webpack_require__.i = function(value) { return value; };
/******/
/******/    // define getter function for harmory exports
/******/    __webpack_require__.d = function(exports, name, getter) {
/******/        Object.defineProperty(exports, name, {
/******/            configurable: false,
/******/            enumerable: true,
/******/            get: getter
/******/        });
/******/    };
/******/
/******/    // getDefaultExport function for compatibility with non-harmony modules
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };
/******/
/******/    // Object.prototype.hasOwnProperty.call
/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";
/******/
/******/    // Load entry module and return exports
/******/    return __webpack_require__(__webpack_require__.s = 93);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function (value) {
    if (value == null) throw new TypeError("Cannot use null or undefined");
    return value;
};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var symbol_observable_1 = __webpack_require__(90);
var NO = {};
exports.NO = NO;
function noop() { }
function cp(a) {
    var l = a.length;
    var b = Array(l);
    for (var i = 0; i < l; ++i)
        b[i] = a[i];
    return b;
}
function and(f1, f2) {
    return function andFn(t) {
        return f1(t) && f2(t);
    };
}
function _try(c, t, u) {
    try {
        return c.f(t);
    }
    catch (e) {
        u._e(e);
        return NO;
    }
}
var NO_IL = {
    _n: noop,
    _e: noop,
    _c: noop,
};
exports.NO_IL = NO_IL;
// mutates the input
function internalizeProducer(producer) {
    producer._start = function _start(il) {
        il.next = il._n;
        il.error = il._e;
        il.complete = il._c;
        this.start(il);
    };
    producer._stop = producer.stop;
}
var StreamSub = (function () {
    function StreamSub(_stream, _listener) {
        this._stream = _stream;
        this._listener = _listener;
    }
    StreamSub.prototype.unsubscribe = function () {
        this._stream.removeListener(this._listener);
    };
    return StreamSub;
}());
var Observer = (function () {
    function Observer(_listener) {
        this._listener = _listener;
    }
    Observer.prototype.next = function (value) {
        this._listener._n(value);
    };
    Observer.prototype.error = function (err) {
        this._listener._e(err);
    };
    Observer.prototype.complete = function () {
        this._listener._c();
    };
    return Observer;
}());
var FromObservable = (function () {
    function FromObservable(observable) {
        this.type = 'fromObservable';
        this.ins = observable;
        this.active = false;
    }
    FromObservable.prototype._start = function (out) {
        this.out = out;
        this.active = true;
        this._sub = this.ins.subscribe(new Observer(out));
        if (!this.active)
            this._sub.unsubscribe();
    };
    FromObservable.prototype._stop = function () {
        if (this._sub)
            this._sub.unsubscribe();
        this.active = false;
    };
    return FromObservable;
}());
var Merge = (function () {
    function Merge(insArr) {
        this.type = 'merge';
        this.insArr = insArr;
        this.out = NO;
        this.ac = 0;
    }
    Merge.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var L = s.length;
        this.ac = L;
        for (var i = 0; i < L; i++)
            s[i]._add(this);
    };
    Merge.prototype._stop = function () {
        var s = this.insArr;
        var L = s.length;
        for (var i = 0; i < L; i++)
            s[i]._remove(this);
        this.out = NO;
    };
    Merge.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    Merge.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Merge.prototype._c = function () {
        if (--this.ac <= 0) {
            var u = this.out;
            if (u === NO)
                return;
            u._c();
        }
    };
    return Merge;
}());
var CombineListener = (function () {
    function CombineListener(i, out, p) {
        this.i = i;
        this.out = out;
        this.p = p;
        p.ils.push(this);
    }
    CombineListener.prototype._n = function (t) {
        var p = this.p, out = this.out;
        if (out === NO)
            return;
        if (p.up(t, this.i)) {
            var a = p.vals;
            var l = a.length;
            var b = Array(l);
            for (var i = 0; i < l; ++i)
                b[i] = a[i];
            out._n(b);
        }
    };
    CombineListener.prototype._e = function (err) {
        var out = this.out;
        if (out === NO)
            return;
        out._e(err);
    };
    CombineListener.prototype._c = function () {
        var p = this.p;
        if (p.out === NO)
            return;
        if (--p.Nc === 0)
            p.out._c();
    };
    return CombineListener;
}());
var Combine = (function () {
    function Combine(insArr) {
        this.type = 'combine';
        this.insArr = insArr;
        this.out = NO;
        this.ils = [];
        this.Nc = this.Nn = 0;
        this.vals = [];
    }
    Combine.prototype.up = function (t, i) {
        var v = this.vals[i];
        var Nn = !this.Nn ? 0 : v === NO ? --this.Nn : this.Nn;
        this.vals[i] = t;
        return Nn === 0;
    };
    Combine.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var n = this.Nc = this.Nn = s.length;
        var vals = this.vals = new Array(n);
        if (n === 0) {
            out._n([]);
            out._c();
        }
        else {
            for (var i = 0; i < n; i++) {
                vals[i] = NO;
                s[i]._add(new CombineListener(i, out, this));
            }
        }
    };
    Combine.prototype._stop = function () {
        var s = this.insArr;
        var n = s.length;
        var ils = this.ils;
        for (var i = 0; i < n; i++)
            s[i]._remove(ils[i]);
        this.out = NO;
        this.ils = [];
        this.vals = [];
    };
    return Combine;
}());
var FromArray = (function () {
    function FromArray(a) {
        this.type = 'fromArray';
        this.a = a;
    }
    FromArray.prototype._start = function (out) {
        var a = this.a;
        for (var i = 0, n = a.length; i < n; i++)
            out._n(a[i]);
        out._c();
    };
    FromArray.prototype._stop = function () {
    };
    return FromArray;
}());
var FromPromise = (function () {
    function FromPromise(p) {
        this.type = 'fromPromise';
        this.on = false;
        this.p = p;
    }
    FromPromise.prototype._start = function (out) {
        var prod = this;
        this.on = true;
        this.p.then(function (v) {
            if (prod.on) {
                out._n(v);
                out._c();
            }
        }, function (e) {
            out._e(e);
        }).then(noop, function (err) {
            setTimeout(function () { throw err; });
        });
    };
    FromPromise.prototype._stop = function () {
        this.on = false;
    };
    return FromPromise;
}());
var Periodic = (function () {
    function Periodic(period) {
        this.type = 'periodic';
        this.period = period;
        this.intervalID = -1;
        this.i = 0;
    }
    Periodic.prototype._start = function (out) {
        var self = this;
        function intervalHandler() { out._n(self.i++); }
        this.intervalID = setInterval(intervalHandler, this.period);
    };
    Periodic.prototype._stop = function () {
        if (this.intervalID !== -1)
            clearInterval(this.intervalID);
        this.intervalID = -1;
        this.i = 0;
    };
    return Periodic;
}());
var Debug = (function () {
    function Debug(ins, arg) {
        this.type = 'debug';
        this.ins = ins;
        this.out = NO;
        this.s = noop;
        this.l = '';
        if (typeof arg === 'string')
            this.l = arg;
        else if (typeof arg === 'function')
            this.s = arg;
    }
    Debug.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Debug.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Debug.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var s = this.s, l = this.l;
        if (s !== noop) {
            try {
                s(t);
            }
            catch (e) {
                u._e(e);
            }
        }
        else if (l)
            console.log(l + ':', t);
        else
            console.log(t);
        u._n(t);
    };
    Debug.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Debug.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Debug;
}());
var Drop = (function () {
    function Drop(max, ins) {
        this.type = 'drop';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.dropped = 0;
    }
    Drop.prototype._start = function (out) {
        this.out = out;
        this.dropped = 0;
        this.ins._add(this);
    };
    Drop.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Drop.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        if (this.dropped++ >= this.max)
            u._n(t);
    };
    Drop.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Drop.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Drop;
}());
var EndWhenListener = (function () {
    function EndWhenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    EndWhenListener.prototype._n = function () {
        this.op.end();
    };
    EndWhenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    EndWhenListener.prototype._c = function () {
        this.op.end();
    };
    return EndWhenListener;
}());
var EndWhen = (function () {
    function EndWhen(o, ins) {
        this.type = 'endWhen';
        this.ins = ins;
        this.out = NO;
        this.o = o;
        this.oil = NO_IL;
    }
    EndWhen.prototype._start = function (out) {
        this.out = out;
        this.o._add(this.oil = new EndWhenListener(out, this));
        this.ins._add(this);
    };
    EndWhen.prototype._stop = function () {
        this.ins._remove(this);
        this.o._remove(this.oil);
        this.out = NO;
        this.oil = NO_IL;
    };
    EndWhen.prototype.end = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    EndWhen.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    EndWhen.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    EndWhen.prototype._c = function () {
        this.end();
    };
    return EndWhen;
}());
var Filter = (function () {
    function Filter(passes, ins) {
        this.type = 'filter';
        this.ins = ins;
        this.out = NO;
        this.f = passes;
    }
    Filter.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Filter.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Filter.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO || !r)
            return;
        u._n(t);
    };
    Filter.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Filter.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Filter;
}());
var FlattenListener = (function () {
    function FlattenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    FlattenListener.prototype._n = function (t) {
        this.out._n(t);
    };
    FlattenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    FlattenListener.prototype._c = function () {
        this.op.inner = NO;
        this.op.less();
    };
    return FlattenListener;
}());
var Flatten = (function () {
    function Flatten(ins) {
        this.type = 'flatten';
        this.ins = ins;
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    }
    Flatten.prototype._start = function (out) {
        this.out = out;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
        this.ins._add(this);
    };
    Flatten.prototype._stop = function () {
        this.ins._remove(this);
        if (this.inner !== NO)
            this.inner._remove(this.il);
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    };
    Flatten.prototype.less = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (!this.open && this.inner === NO)
            u._c();
    };
    Flatten.prototype._n = function (s) {
        var u = this.out;
        if (u === NO)
            return;
        var _a = this, inner = _a.inner, il = _a.il;
        if (inner !== NO && il !== NO_IL)
            inner._remove(il);
        (this.inner = s)._add(this.il = new FlattenListener(u, this));
    };
    Flatten.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Flatten.prototype._c = function () {
        this.open = false;
        this.less();
    };
    return Flatten;
}());
var Fold = (function () {
    function Fold(f, seed, ins) {
        var _this = this;
        this.type = 'fold';
        this.ins = ins;
        this.out = NO;
        this.f = function (t) { return f(_this.acc, t); };
        this.acc = this.seed = seed;
    }
    Fold.prototype._start = function (out) {
        this.out = out;
        this.acc = this.seed;
        out._n(this.acc);
        this.ins._add(this);
    };
    Fold.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.acc = this.seed;
    };
    Fold.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(this.acc = r);
    };
    Fold.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Fold.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Fold;
}());
var Last = (function () {
    function Last(ins) {
        this.type = 'last';
        this.ins = ins;
        this.out = NO;
        this.has = false;
        this.val = NO;
    }
    Last.prototype._start = function (out) {
        this.out = out;
        this.has = false;
        this.ins._add(this);
    };
    Last.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.val = NO;
    };
    Last.prototype._n = function (t) {
        this.has = true;
        this.val = t;
    };
    Last.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Last.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (this.has) {
            u._n(this.val);
            u._c();
        }
        else
            u._e(new Error('last() failed because input stream completed'));
    };
    return Last;
}());
var MapOp = (function () {
    function MapOp(project, ins) {
        this.type = 'map';
        this.ins = ins;
        this.out = NO;
        this.f = project;
    }
    MapOp.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    MapOp.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    MapOp.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(r);
    };
    MapOp.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    MapOp.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return MapOp;
}());
var Remember = (function () {
    function Remember(ins) {
        this.type = 'remember';
        this.ins = ins;
        this.out = NO;
    }
    Remember.prototype._start = function (out) {
        this.out = out;
        this.ins._add(out);
    };
    Remember.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return Remember;
}());
var ReplaceError = (function () {
    function ReplaceError(replacer, ins) {
        this.type = 'replaceError';
        this.ins = ins;
        this.out = NO;
        this.f = replacer;
    }
    ReplaceError.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    ReplaceError.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    ReplaceError.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    ReplaceError.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        try {
            this.ins._remove(this);
            (this.ins = this.f(err))._add(this);
        }
        catch (e) {
            u._e(e);
        }
    };
    ReplaceError.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return ReplaceError;
}());
var StartWith = (function () {
    function StartWith(ins, val) {
        this.type = 'startWith';
        this.ins = ins;
        this.out = NO;
        this.val = val;
    }
    StartWith.prototype._start = function (out) {
        this.out = out;
        this.out._n(this.val);
        this.ins._add(out);
    };
    StartWith.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return StartWith;
}());
var Take = (function () {
    function Take(max, ins) {
        this.type = 'take';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.taken = 0;
    }
    Take.prototype._start = function (out) {
        this.out = out;
        this.taken = 0;
        if (this.max <= 0)
            out._c();
        else
            this.ins._add(this);
    };
    Take.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Take.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var m = ++this.taken;
        if (m < this.max)
            u._n(t);
        else if (m === this.max) {
            u._n(t);
            u._c();
        }
    };
    Take.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Take.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Take;
}());
var Stream = (function () {
    function Stream(producer) {
        this._prod = producer || NO;
        this._ils = [];
        this._stopID = NO;
        this._dl = NO;
        this._d = false;
        this._target = NO;
        this._err = NO;
    }
    Stream.prototype._n = function (t) {
        var a = this._ils;
        var L = a.length;
        if (this._d)
            this._dl._n(t);
        if (L == 1)
            a[0]._n(t);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._n(t);
        }
    };
    Stream.prototype._e = function (err) {
        if (this._err !== NO)
            return;
        this._err = err;
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._e(err);
        if (L == 1)
            a[0]._e(err);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._e(err);
        }
        if (!this._d && L == 0)
            throw this._err;
    };
    Stream.prototype._c = function () {
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._c();
        if (L == 1)
            a[0]._c();
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._c();
        }
    };
    Stream.prototype._x = function () {
        if (this._ils.length === 0)
            return;
        if (this._prod !== NO)
            this._prod._stop();
        this._err = NO;
        this._ils = [];
    };
    Stream.prototype._stopNow = function () {
        // WARNING: code that calls this method should
        // first check if this._prod is valid (not `NO`)
        this._prod._stop();
        this._err = NO;
        this._stopID = NO;
    };
    Stream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1)
            return;
        if (this._stopID !== NO) {
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    Stream.prototype._remove = function (il) {
        var _this = this;
        var ta = this._target;
        if (ta !== NO)
            return ta._remove(il);
        var a = this._ils;
        var i = a.indexOf(il);
        if (i > -1) {
            a.splice(i, 1);
            if (this._prod !== NO && a.length <= 0) {
                this._err = NO;
                this._stopID = setTimeout(function () { return _this._stopNow(); });
            }
            else if (a.length === 1) {
                this._pruneCycles();
            }
        }
    };
    // If all paths stemming from `this` stream eventually end at `this`
    // stream, then we remove the single listener of `this` stream, to
    // force it to end its execution and dispose resources. This method
    // assumes as a precondition that this._ils has just one listener.
    Stream.prototype._pruneCycles = function () {
        if (this._hasNoSinks(this, []))
            this._remove(this._ils[0]);
    };
    // Checks whether *there is no* path starting from `x` that leads to an end
    // listener (sink) in the stream graph, following edges A->B where B is a
    // listener of A. This means these paths constitute a cycle somehow. Is given
    // a trace of all visited nodes so far.
    Stream.prototype._hasNoSinks = function (x, trace) {
        if (trace.indexOf(x) !== -1)
            return true;
        else if (x.out === this)
            return true;
        else if (x.out && x.out !== NO)
            return this._hasNoSinks(x.out, trace.concat(x));
        else if (x._ils) {
            for (var i = 0, N = x._ils.length; i < N; i++)
                if (!this._hasNoSinks(x._ils[i], trace.concat(x)))
                    return false;
            return true;
        }
        else
            return false;
    };
    Stream.prototype.ctor = function () {
        return this instanceof MemoryStream ? MemoryStream : Stream;
    };
    /**
     * Adds a Listener to the Stream.
     *
     * @param {Listener} listener
     */
    Stream.prototype.addListener = function (listener) {
        listener._n = listener.next || noop;
        listener._e = listener.error || noop;
        listener._c = listener.complete || noop;
        this._add(listener);
    };
    /**
     * Removes a Listener from the Stream, assuming the Listener was added to it.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.removeListener = function (listener) {
        this._remove(listener);
    };
    /**
     * Adds a Listener to the Stream returning a Subscription to remove that
     * listener.
     *
     * @param {Listener} listener
     * @returns {Subscription}
     */
    Stream.prototype.subscribe = function (listener) {
        this.addListener(listener);
        return new StreamSub(this, listener);
    };
    /**
     * Add interop between most.js and RxJS 5
     *
     * @returns {Stream}
     */
    Stream.prototype[symbol_observable_1.default] = function () {
        return this;
    };
    /**
     * Creates a new Stream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {Stream}
     */
    Stream.create = function (producer) {
        if (producer) {
            if (typeof producer.start !== 'function'
                || typeof producer.stop !== 'function')
                throw new Error('producer requires both start and stop functions');
            internalizeProducer(producer); // mutates the input
        }
        return new Stream(producer);
    };
    /**
     * Creates a new MemoryStream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {MemoryStream}
     */
    Stream.createWithMemory = function (producer) {
        if (producer)
            internalizeProducer(producer); // mutates the input
        return new MemoryStream(producer);
    };
    /**
     * Creates a Stream that does nothing when started. It never emits any event.
     *
     * Marble diagram:
     *
     * ```text
     *          never
     * -----------------------
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.never = function () {
        return new Stream({ _start: noop, _stop: noop });
    };
    /**
     * Creates a Stream that immediately emits the "complete" notification when
     * started, and that's it.
     *
     * Marble diagram:
     *
     * ```text
     * empty
     * -|
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.empty = function () {
        return new Stream({
            _start: function (il) { il._c(); },
            _stop: noop,
        });
    };
    /**
     * Creates a Stream that immediately emits an "error" notification with the
     * value you passed as the `error` argument when the stream starts, and that's
     * it.
     *
     * Marble diagram:
     *
     * ```text
     * throw(X)
     * -X
     * ```
     *
     * @factory true
     * @param error The error event to emit on the created stream.
     * @return {Stream}
     */
    Stream.throw = function (error) {
        return new Stream({
            _start: function (il) { il._e(error); },
            _stop: noop,
        });
    };
    /**
     * Creates a stream from an Array, Promise, or an Observable.
     *
     * @factory true
     * @param {Array|PromiseLike|Observable} input The input to make a stream from.
     * @return {Stream}
     */
    Stream.from = function (input) {
        if (typeof input[symbol_observable_1.default] === 'function')
            return Stream.fromObservable(input);
        else if (typeof input.then === 'function')
            return Stream.fromPromise(input);
        else if (Array.isArray(input))
            return Stream.fromArray(input);
        throw new TypeError("Type of input to from() must be an Array, Promise, or Observable");
    };
    /**
     * Creates a Stream that immediately emits the arguments that you give to
     * *of*, then completes.
     *
     * Marble diagram:
     *
     * ```text
     * of(1,2,3)
     * 123|
     * ```
     *
     * @factory true
     * @param a The first value you want to emit as an event on the stream.
     * @param b The second value you want to emit as an event on the stream. One
     * or more of these values may be given as arguments.
     * @return {Stream}
     */
    Stream.of = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return Stream.fromArray(items);
    };
    /**
     * Converts an array to a stream. The returned stream will emit synchronously
     * all the items in the array, and then complete.
     *
     * Marble diagram:
     *
     * ```text
     * fromArray([1,2,3])
     * 123|
     * ```
     *
     * @factory true
     * @param {Array} array The array to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromArray = function (array) {
        return new Stream(new FromArray(array));
    };
    /**
     * Converts a promise to a stream. The returned stream will emit the resolved
     * value of the promise, and then complete. However, if the promise is
     * rejected, the stream will emit the corresponding error.
     *
     * Marble diagram:
     *
     * ```text
     * fromPromise( ----42 )
     * -----------------42|
     * ```
     *
     * @factory true
     * @param {PromiseLike} promise The promise to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromPromise = function (promise) {
        return new Stream(new FromPromise(promise));
    };
    /**
     * Converts an Observable into a Stream.
     *
     * @factory true
     * @param {any} observable The observable to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromObservable = function (obs) {
        if (obs.endWhen)
            return obs;
        return new Stream(new FromObservable(obs));
    };
    /**
     * Creates a stream that periodically emits incremental numbers, every
     * `period` milliseconds.
     *
     * Marble diagram:
     *
     * ```text
     *     periodic(1000)
     * ---0---1---2---3---4---...
     * ```
     *
     * @factory true
     * @param {number} period The interval in milliseconds to use as a rate of
     * emission.
     * @return {Stream}
     */
    Stream.periodic = function (period) {
        return new Stream(new Periodic(period));
    };
    Stream.prototype._map = function (project) {
        return new (this.ctor())(new MapOp(project, this));
    };
    /**
     * Transforms each event from the input Stream through a `project` function,
     * to get a Stream that emits those transformed events.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7------
     *    map(i => i * 10)
     * --10--30-50----70-----
     * ```
     *
     * @param {Function} project A function of type `(t: T) => U` that takes event
     * `t` of type `T` from the input Stream and produces an event of type `U`, to
     * be emitted on the output Stream.
     * @return {Stream}
     */
    Stream.prototype.map = function (project) {
        return this._map(project);
    };
    /**
     * It's like `map`, but transforms each input event to always the same
     * constant value on the output Stream.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7-----
     *       mapTo(10)
     * --10--10-10----10----
     * ```
     *
     * @param projectedValue A value to emit on the output Stream whenever the
     * input Stream emits any value.
     * @return {Stream}
     */
    Stream.prototype.mapTo = function (projectedValue) {
        var s = this.map(function () { return projectedValue; });
        var op = s._prod;
        op.type = 'mapTo';
        return s;
    };
    /**
     * Only allows events that pass the test given by the `passes` argument.
     *
     * Each event from the input stream is given to the `passes` function. If the
     * function returns `true`, the event is forwarded to the output stream,
     * otherwise it is ignored and not forwarded.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2--3-----4-----5---6--7-8--
     *     filter(i => i % 2 === 0)
     * ------2--------4---------6----8--
     * ```
     *
     * @param {Function} passes A function of type `(t: T) +> boolean` that takes
     * an event from the input stream and checks if it passes, by returning a
     * boolean.
     * @return {Stream}
     */
    Stream.prototype.filter = function (passes) {
        var p = this._prod;
        if (p instanceof Filter)
            return new Stream(new Filter(and(p.f, passes), p.ins));
        return new Stream(new Filter(passes, this));
    };
    /**
     * Lets the first `amount` many events from the input stream pass to the
     * output stream, then makes the output stream complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *    take(3)
     * --a---b--c|
     * ```
     *
     * @param {number} amount How many events to allow from the input stream
     * before completing the output stream.
     * @return {Stream}
     */
    Stream.prototype.take = function (amount) {
        return new (this.ctor())(new Take(amount, this));
    };
    /**
     * Ignores the first `amount` many events from the input stream, and then
     * after that starts forwarding events from the input stream to the output
     * stream.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *       drop(3)
     * --------------d---e--
     * ```
     *
     * @param {number} amount How many events to ignore from the input stream
     * before forwarding all events from the input stream to the output stream.
     * @return {Stream}
     */
    Stream.prototype.drop = function (amount) {
        return new Stream(new Drop(amount, this));
    };
    /**
     * When the input stream completes, the output stream will emit the last event
     * emitted by the input stream, and then will also complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c--d----|
     *       last()
     * -----------------d|
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.last = function () {
        return new Stream(new Last(this));
    };
    /**
     * Prepends the given `initial` value to the sequence of events emitted by the
     * input stream. The returned stream is a MemoryStream, which means it is
     * already `remember()`'d.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3---
     *   startWith(0)
     * 0--1---2-----3---
     * ```
     *
     * @param initial The value or event to prepend.
     * @return {MemoryStream}
     */
    Stream.prototype.startWith = function (initial) {
        return new MemoryStream(new StartWith(this, initial));
    };
    /**
     * Uses another stream to determine when to complete the current stream.
     *
     * When the given `other` stream emits an event or completes, the output
     * stream will complete. Before that happens, the output stream will behaves
     * like the input stream.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3--4----5----6---
     *   endWhen( --------a--b--| )
     * ---1---2-----3--4--|
     * ```
     *
     * @param other Some other stream that is used to know when should the output
     * stream of this operator complete.
     * @return {Stream}
     */
    Stream.prototype.endWhen = function (other) {
        return new (this.ctor())(new EndWhen(other, this));
    };
    /**
     * "Folds" the stream onto itself.
     *
     * Combines events from the past throughout
     * the entire execution of the input stream, allowing you to accumulate them
     * together. It's essentially like `Array.prototype.reduce`. The returned
     * stream is a MemoryStream, which means it is already `remember()`'d.
     *
     * The output stream starts by emitting the `seed` which you give as argument.
     * Then, when an event happens on the input stream, it is combined with that
     * seed value through the `accumulate` function, and the output value is
     * emitted on the output stream. `fold` remembers that output value as `acc`
     * ("accumulator"), and then when a new input event `t` happens, `acc` will be
     * combined with that to produce the new `acc` and so forth.
     *
     * Marble diagram:
     *
     * ```text
     * ------1-----1--2----1----1------
     *   fold((acc, x) => acc + x, 3)
     * 3-----4-----5--7----8----9------
     * ```
     *
     * @param {Function} accumulate A function of type `(acc: R, t: T) => R` that
     * takes the previous accumulated value `acc` and the incoming event from the
     * input stream and produces the new accumulated value.
     * @param seed The initial accumulated value, of type `R`.
     * @return {MemoryStream}
     */
    Stream.prototype.fold = function (accumulate, seed) {
        return new MemoryStream(new Fold(accumulate, seed, this));
    };
    /**
     * Replaces an error with another stream.
     *
     * When (and if) an error happens on the input stream, instead of forwarding
     * that error to the output stream, *replaceError* will call the `replace`
     * function which returns the stream that the output stream will replicate.
     * And, in case that new stream also emits an error, `replace` will be called
     * again to get another stream to start replicating.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2-----3--4-----X
     *   replaceError( () => --10--| )
     * --1---2-----3--4--------10--|
     * ```
     *
     * @param {Function} replace A function of type `(err) => Stream` that takes
     * the error that occurred on the input stream or on the previous replacement
     * stream and returns a new stream. The output stream will behave like the
     * stream that this function returns.
     * @return {Stream}
     */
    Stream.prototype.replaceError = function (replace) {
        return new (this.ctor())(new ReplaceError(replace, this));
    };
    /**
     * Flattens a "stream of streams", handling only one nested stream at a time
     * (no concurrency).
     *
     * If the input stream is a stream that emits streams, then this operator will
     * return an output stream which is a flat stream: emits regular events. The
     * flattening happens without concurrency. It works like this: when the input
     * stream emits a nested stream, *flatten* will start imitating that nested
     * one. However, as soon as the next nested stream is emitted on the input
     * stream, *flatten* will forget the previous nested one it was imitating, and
     * will start imitating the new nested one.
     *
     * Marble diagram:
     *
     * ```text
     * --+--------+---------------
     *   \        \
     *    \       ----1----2---3--
     *    --a--b----c----d--------
     *           flatten
     * -----a--b------1----2---3--
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.flatten = function () {
        var p = this._prod;
        return new Stream(new Flatten(this));
    };
    /**
     * Passes the input stream to a custom operator, to produce an output stream.
     *
     * *compose* is a handy way of using an existing function in a chained style.
     * Instead of writing `outStream = f(inStream)` you can write
     * `outStream = inStream.compose(f)`.
     *
     * @param {function} operator A function that takes a stream as input and
     * returns a stream as well.
     * @return {Stream}
     */
    Stream.prototype.compose = function (operator) {
        return operator(this);
    };
    /**
     * Returns an output stream that behaves like the input stream, but also
     * remembers the most recent event that happens on the input stream, so that a
     * newly added listener will immediately receive that memorised event.
     *
     * @return {MemoryStream}
     */
    Stream.prototype.remember = function () {
        return new MemoryStream(new Remember(this));
    };
    /**
     * Returns an output stream that identically behaves like the input stream,
     * but also runs a `spy` function fo each event, to help you debug your app.
     *
     * *debug* takes a `spy` function as argument, and runs that for each event
     * happening on the input stream. If you don't provide the `spy` argument,
     * then *debug* will just `console.log` each event. This helps you to
     * understand the flow of events through some operator chain.
     *
     * Please note that if the output stream has no listeners, then it will not
     * start, which means `spy` will never run because no actual event happens in
     * that case.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3-----4--
     *         debug
     * --1----2-----3-----4--
     * ```
     *
     * @param {function} labelOrSpy A string to use as the label when printing
     * debug information on the console, or a 'spy' function that takes an event
     * as argument, and does not need to return anything.
     * @return {Stream}
     */
    Stream.prototype.debug = function (labelOrSpy) {
        return new (this.ctor())(new Debug(this, labelOrSpy));
    };
    /**
     * *imitate* changes this current Stream to emit the same events that the
     * `other` given Stream does. This method returns nothing.
     *
     * This method exists to allow one thing: **circular dependency of streams**.
     * For instance, let's imagine that for some reason you need to create a
     * circular dependency where stream `first$` depends on stream `second$`
     * which in turn depends on `first$`:
     *
     * <!-- skip-example -->
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var first$ = second$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * ```
     *
     * However, that is invalid JavaScript, because `second$` is undefined
     * on the first line. This is how *imitate* can help solve it:
     *
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var secondProxy$ = xs.create();
     * var first$ = secondProxy$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * secondProxy$.imitate(second$);
     * ```
     *
     * We create `secondProxy$` before the others, so it can be used in the
     * declaration of `first$`. Then, after both `first$` and `second$` are
     * defined, we hook `secondProxy$` with `second$` with `imitate()` to tell
     * that they are "the same". `imitate` will not trigger the start of any
     * stream, it just binds `secondProxy$` and `second$` together.
     *
     * The following is an example where `imitate()` is important in Cycle.js
     * applications. A parent component contains some child components. A child
     * has an action stream which is given to the parent to define its state:
     *
     * <!-- skip-example -->
     * ```js
     * const childActionProxy$ = xs.create();
     * const parent = Parent({...sources, childAction$: childActionProxy$});
     * const childAction$ = parent.state$.map(s => s.child.action$).flatten();
     * childActionProxy$.imitate(childAction$);
     * ```
     *
     * Note, though, that **`imitate()` does not support MemoryStreams**. If we
     * would attempt to imitate a MemoryStream in a circular dependency, we would
     * either get a race condition (where the symptom would be "nothing happens")
     * or an infinite cyclic emission of values. It's useful to think about
     * MemoryStreams as cells in a spreadsheet. It doesn't make any sense to
     * define a spreadsheet cell `A1` with a formula that depends on `B1` and
     * cell `B1` defined with a formula that depends on `A1`.
     *
     * If you find yourself wanting to use `imitate()` with a
     * MemoryStream, you should rework your code around `imitate()` to use a
     * Stream instead. Look for the stream in the circular dependency that
     * represents an event stream, and that would be a candidate for creating a
     * proxy Stream which then imitates the target Stream.
     *
     * @param {Stream} target The other stream to imitate on the current one. Must
     * not be a MemoryStream.
     */
    Stream.prototype.imitate = function (target) {
        if (target instanceof MemoryStream)
            throw new Error('A MemoryStream was given to imitate(), but it only ' +
                'supports a Stream. Read more about this restriction here: ' +
                'https://github.com/staltz/xstream#faq');
        this._target = target;
        for (var ils = this._ils, N = ils.length, i = 0; i < N; i++)
            target._add(ils[i]);
        this._ils = [];
    };
    /**
     * Forces the Stream to emit the given value to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param value The "next" value you want to broadcast to all listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendNext = function (value) {
        this._n(value);
    };
    /**
     * Forces the Stream to emit the given error to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param {any} error The error you want to broadcast to all the listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendError = function (error) {
        this._e(error);
    };
    /**
     * Forces the Stream to emit the "completed" event to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     */
    Stream.prototype.shamefullySendComplete = function () {
        this._c();
    };
    /**
     * Adds a "debug" listener to the stream. There can only be one debug
     * listener, that's why this is 'setDebugListener'. To remove the debug
     * listener, just call setDebugListener(null).
     *
     * A debug listener is like any other listener. The only difference is that a
     * debug listener is "stealthy": its presence/absence does not trigger the
     * start/stop of the stream (or the producer inside the stream). This is
     * useful so you can inspect what is going on without changing the behavior
     * of the program. If you have an idle stream and you add a normal listener to
     * it, the stream will start executing. But if you set a debug listener on an
     * idle stream, it won't start executing (not until the first normal listener
     * is added).
     *
     * As the name indicates, we don't recommend using this method to build app
     * logic. In fact, in most cases the debug operator works just fine. Only use
     * this one if you know what you're doing.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.setDebugListener = function (listener) {
        if (!listener) {
            this._d = false;
            this._dl = NO;
        }
        else {
            this._d = true;
            listener._n = listener.next || noop;
            listener._e = listener.error || noop;
            listener._c = listener.complete || noop;
            this._dl = listener;
        }
    };
    return Stream;
}());
/**
 * Blends multiple streams together, emitting events from all of them
 * concurrently.
 *
 * *merge* takes multiple streams as arguments, and creates a stream that
 * behaves like each of the argument streams, in parallel.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b----c---d------
 *            merge
 * --1-a--2--b--3-c---d--4---
 * ```
 *
 * @factory true
 * @param {Stream} stream1 A stream to merge together with other streams.
 * @param {Stream} stream2 A stream to merge together with other streams. Two
 * or more streams may be given as arguments.
 * @return {Stream}
 */
Stream.merge = function merge() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return new Stream(new Merge(streams));
};
/**
 * Combines multiple input streams together to return a stream whose events
 * are arrays that collect the latest events from each input stream.
 *
 * *combine* internally remembers the most recent event from each of the input
 * streams. When any of the input streams emits an event, that event together
 * with all the other saved events are combined into an array. That array will
 * be emitted on the output stream. It's essentially a way of joining together
 * the events from multiple streams.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b-----c--d------
 *          combine
 * ----1a-2a-2b-3b-3c-3d-4d--
 * ```
 *
 * Note: to minimize garbage collection, *combine* uses the same array
 * instance for each emission.  If you need to compare emissions over time,
 * cache the values with `map` first:
 *
 * ```js
 * import pairwise from 'xstream/extra/pairwise'
 *
 * const stream1 = xs.of(1);
 * const stream2 = xs.of(2);
 *
 * xs.combine(stream1, stream2).map(
 *   combinedEmissions => ([ ...combinedEmissions ])
 * ).compose(pairwise)
 * ```
 *
 * @factory true
 * @param {Stream} stream1 A stream to combine together with other streams.
 * @param {Stream} stream2 A stream to combine together with other streams.
 * Multiple streams, not just two, may be given as arguments.
 * @return {Stream}
 */
Stream.combine = function combine() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return new Stream(new Combine(streams));
};
exports.Stream = Stream;
var MemoryStream = (function (_super) {
    __extends(MemoryStream, _super);
    function MemoryStream(producer) {
        var _this = _super.call(this, producer) || this;
        _this._has = false;
        return _this;
    }
    MemoryStream.prototype._n = function (x) {
        this._v = x;
        this._has = true;
        _super.prototype._n.call(this, x);
    };
    MemoryStream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1) {
            if (this._has)
                il._n(this._v);
            return;
        }
        if (this._stopID !== NO) {
            if (this._has)
                il._n(this._v);
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else if (this._has)
            il._n(this._v);
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    MemoryStream.prototype._stopNow = function () {
        this._has = false;
        _super.prototype._stopNow.call(this);
    };
    MemoryStream.prototype._x = function () {
        this._has = false;
        _super.prototype._x.call(this);
    };
    MemoryStream.prototype.map = function (project) {
        return this._map(project);
    };
    MemoryStream.prototype.mapTo = function (projectedValue) {
        return _super.prototype.mapTo.call(this, projectedValue);
    };
    MemoryStream.prototype.take = function (amount) {
        return _super.prototype.take.call(this, amount);
    };
    MemoryStream.prototype.endWhen = function (other) {
        return _super.prototype.endWhen.call(this, other);
    };
    MemoryStream.prototype.replaceError = function (replace) {
        return _super.prototype.replaceError.call(this, replace);
    };
    MemoryStream.prototype.remember = function () {
        return this;
    };
    MemoryStream.prototype.debug = function (labelOrSpy) {
        return _super.prototype.debug.call(this, labelOrSpy);
    };
    return MemoryStream;
}(Stream));
exports.MemoryStream = MemoryStream;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stream;
//# sourceMappingURL=index.js.map

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function (fn) {
    if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
    return fn;
};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var assign        = __webpack_require__(12)
  , normalizeOpts = __webpack_require__(20)
  , isCallable    = __webpack_require__(58)
  , contains      = __webpack_require__(23)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
    var c, e, w, options, desc;
    if ((arguments.length < 2) || (typeof dscr !== 'string')) {
        options = value;
        value = dscr;
        dscr = null;
    } else {
        options = arguments[2];
    }
    if (dscr == null) {
        c = w = true;
        e = false;
    } else {
        c = contains.call(dscr, 'c');
        e = contains.call(dscr, 'e');
        w = contains.call(dscr, 'w');
    }

    desc = { value: value, configurable: c, enumerable: e, writable: w };
    return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
    var c, e, options, desc;
    if (typeof dscr !== 'string') {
        options = set;
        set = get;
        get = dscr;
        dscr = null;
    } else {
        options = arguments[3];
    }
    if (get == null) {
        get = undefined;
    } else if (!isCallable(get)) {
        options = get;
        get = set = undefined;
    } else if (set == null) {
        set = undefined;
    } else if (!isCallable(set)) {
        options = set;
        set = undefined;
    }
    if (dscr == null) {
        c = true;
        e = false;
    } else {
        c = contains.call(dscr, 'c');
        e = contains.call(dscr, 'e');
    }

    desc = { get: get, set: set, configurable: c, enumerable: e };
    return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElement(obj) {
    var ELEM_TYPE = 1;
    var FRAG_TYPE = 11;
    return typeof HTMLElement === 'object' ?
        obj instanceof HTMLElement || obj instanceof DocumentFragment :
        obj && typeof obj === 'object' && obj !== null &&
            (obj.nodeType === ELEM_TYPE || obj.nodeType === FRAG_TYPE) &&
            typeof obj.nodeName === 'string';
}
function isClassOrId(str) {
    return str.length > 1 && (str[0] === '.' || str[0] === '#');
}
exports.isClassOrId = isClassOrId;
exports.SCOPE_PREFIX = '$$CYCLEDOM$$-';
function getElement(selectors) {
    var domElement = typeof selectors === 'string' ?
        document.querySelector(selectors) :
        selectors;
    if (typeof selectors === 'string' && domElement === null) {
        throw new Error("Cannot render into unknown element `" + selectors + "`");
    }
    else if (!isElement(domElement)) {
        throw new Error('Given container is not a DOM element neither a ' +
            'selector string.');
    }
    return domElement;
}
exports.getElement = getElement;
/**
 * The full scope of a namespace is the "absolute path" of scopes from
 * parent to child. This is extracted from the namespace, filter only for
 * scopes in the namespace.
 */
function getFullScope(namespace) {
    return namespace
        .filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) > -1; })
        .map(function (c) { return c.replace(exports.SCOPE_PREFIX, ''); })
        .join('-');
}
exports.getFullScope = getFullScope;
function getSelectors(namespace) {
    return namespace.filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) === -1; }).join(' ');
}
exports.getSelectors = getSelectors;
//# sourceMappingURL=utils.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adaptStream = function (x) { return x; };
function setAdapt(f) {
    adaptStream = f;
}
exports.setAdapt = setAdapt;
function adapt(stream) {
    return adaptStream(stream);
}
exports.adapt = adapt;
//# sourceMappingURL=adapt.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = __webpack_require__(77)() ? Symbol : __webpack_require__(79);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var vnode_1 = __webpack_require__(9);
var is = __webpack_require__(28);
function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i]))
                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i]);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode_1.vnode(sel, data, children, text, undefined);
}
exports.h = h;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = h;
//# sourceMappingURL=h.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = __webpack_require__(21)()
    ? Object.setPrototypeOf
    : __webpack_require__(22);


/***/ },
/* 9 */
/***/ function(module, exports) {

"use strict";
"use strict";
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = vnode;
//# sourceMappingURL=vnode.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(1);
function fromEvent(element, eventName, useCapture) {
    if (useCapture === void 0) { useCapture = false; }
    return xstream_1.Stream.create({
        element: element,
        next: null,
        start: function start(listener) {
            this.next = function next(event) { listener.next(event); };
            this.element.addEventListener(eventName, this.next, useCapture);
        },
        stop: function stop() {
            this.element.removeEventListener(eventName, this.next, useCapture);
        },
    });
}
exports.fromEvent = fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

"use strict";
'use strict';

var toString = Object.prototype.toString

  , id = toString.call((function () { return arguments; }()));

module.exports = function (x) { return (toString.call(x) === id); };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = __webpack_require__(53)()
    ? Object.assign
    : __webpack_require__(54);


/***/ },
/* 13 */
/***/ function(module, exports) {

"use strict";
'use strict';

var toString = Object.prototype.toString

  , id = toString.call('');

module.exports = function (x) {
    return (typeof x === 'string') || (x && (typeof x === 'object') &&
        ((x instanceof String) || (toString.call(x) === id))) || false;
};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var clear    = __webpack_require__(19)
  , assign   = __webpack_require__(12)
  , callable = __webpack_require__(2)
  , value    = __webpack_require__(0)
  , d        = __webpack_require__(3)
  , autoBind = __webpack_require__(45)
  , Symbol   = __webpack_require__(6)

  , defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , Iterator;

module.exports = Iterator = function (list, context) {
    if (!(this instanceof Iterator)) return new Iterator(list, context);
    defineProperties(this, {
        __list__: d('w', value(list)),
        __context__: d('w', context),
        __nextIndex__: d('w', 0)
    });
    if (!context) return;
    callable(context.on);
    context.on('_add', this._onAdd);
    context.on('_delete', this._onDelete);
    context.on('_clear', this._onClear);
};

defineProperties(Iterator.prototype, assign({
    constructor: d(Iterator),
    _next: d(function () {
        var i;
        if (!this.__list__) return;
        if (this.__redo__) {
            i = this.__redo__.shift();
            if (i !== undefined) return i;
        }
        if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
        this._unBind();
    }),
    next: d(function () { return this._createResult(this._next()); }),
    _createResult: d(function (i) {
        if (i === undefined) return { done: true, value: undefined };
        return { done: false, value: this._resolve(i) };
    }),
    _resolve: d(function (i) { return this.__list__[i]; }),
    _unBind: d(function () {
        this.__list__ = null;
        delete this.__redo__;
        if (!this.__context__) return;
        this.__context__.off('_add', this._onAdd);
        this.__context__.off('_delete', this._onDelete);
        this.__context__.off('_clear', this._onClear);
        this.__context__ = null;
    }),
    toString: d(function () { return '[object Iterator]'; })
}, autoBind({
    _onAdd: d(function (index) {
        if (index >= this.__nextIndex__) return;
        ++this.__nextIndex__;
        if (!this.__redo__) {
            defineProperty(this, '__redo__', d('c', [index]));
            return;
        }
        this.__redo__.forEach(function (redo, i) {
            if (redo >= index) this.__redo__[i] = ++redo;
        }, this);
        this.__redo__.push(index);
    }),
    _onDelete: d(function (index) {
        var i;
        if (index >= this.__nextIndex__) return;
        --this.__nextIndex__;
        if (!this.__redo__) return;
        i = this.__redo__.indexOf(index);
        if (i !== -1) this.__redo__.splice(i, 1);
        this.__redo__.forEach(function (redo, i) {
            if (redo > index) this.__redo__[i] = --redo;
        }, this);
    }),
    _onClear: d(function () {
        if (this.__redo__) clear.call(this.__redo__);
        this.__nextIndex__ = 0;
    })
})));

defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
    return this;
}));
defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));


/***/ },
/* 15 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
    // This works if eval is allowed (see CSP)
    g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
    // This works if the window reference is available
    if(typeof window === "object")
        g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adapt_1 = __webpack_require__(5);
var DocumentDOMSource_1 = __webpack_require__(35);
var BodyDOMSource_1 = __webpack_require__(34);
var ElementFinder_1 = __webpack_require__(36);
var fromEvent_1 = __webpack_require__(10);
var isolate_1 = __webpack_require__(41);
var EventDelegator_1 = __webpack_require__(37);
var utils_1 = __webpack_require__(4);
var eventTypesThatDontBubble = [
    "blur",
    "canplay",
    "canplaythrough",
    "change",
    "durationchange",
    "emptied",
    "ended",
    "focus",
    "load",
    "loadeddata",
    "loadedmetadata",
    "mouseenter",
    "mouseleave",
    "pause",
    "play",
    "playing",
    "ratechange",
    "reset",
    "scroll",
    "seeked",
    "seeking",
    "stalled",
    "submit",
    "suspend",
    "timeupdate",
    "unload",
    "volumechange",
    "waiting",
];
function determineUseCapture(eventType, options) {
    var result = false;
    if (typeof options.useCapture === 'boolean') {
        result = options.useCapture;
    }
    if (eventTypesThatDontBubble.indexOf(eventType) !== -1) {
        result = true;
    }
    return result;
}
function filterBasedOnIsolation(domSource, fullScope) {
    return function filterBasedOnIsolationOperator(rootElement$) {
        var initialState = {
            wasIsolated: false,
            shouldPass: false,
            element: null,
        };
        return rootElement$
            .fold(function checkIfShouldPass(state, element) {
            var isIsolated = !!domSource._isolateModule.getElement(fullScope);
            var shouldPass = isIsolated && !state.wasIsolated;
            return { wasIsolated: isIsolated, shouldPass: shouldPass, element: element };
        }, initialState)
            .drop(1)
            .filter(function (s) { return s.shouldPass; })
            .map(function (s) { return s.element; });
    };
}
var MainDOMSource = (function () {
    function MainDOMSource(_rootElement$, _sanitation$, _namespace, _isolateModule, _delegators, _name) {
        if (_namespace === void 0) { _namespace = []; }
        var _this = this;
        this._rootElement$ = _rootElement$;
        this._sanitation$ = _sanitation$;
        this._namespace = _namespace;
        this._isolateModule = _isolateModule;
        this._delegators = _delegators;
        this._name = _name;
        this.isolateSource = isolate_1.isolateSource;
        this.isolateSink = function (sink, scope) {
            if (scope === ':root') {
                return sink;
            }
            else if (utils_1.isClassOrId(scope)) {
                return isolate_1.siblingIsolateSink(sink, scope);
            }
            else {
                var prevFullScope = utils_1.getFullScope(_this._namespace);
                var nextFullScope = [prevFullScope, scope].filter(function (x) { return !!x; }).join('-');
                return isolate_1.totalIsolateSink(sink, nextFullScope);
            }
        };
    }
    MainDOMSource.prototype.elements = function () {
        var output$;
        if (this._namespace.length === 0) {
            output$ = this._rootElement$;
        }
        else {
            var elementFinder_1 = new ElementFinder_1.ElementFinder(this._namespace, this._isolateModule);
            output$ = this._rootElement$.map(function (el) { return elementFinder_1.call(el); });
        }
        var out = adapt_1.adapt(output$.remember());
        out._isCycleSource = this._name;
        return out;
    };
    Object.defineProperty(MainDOMSource.prototype, "namespace", {
        get: function () {
            return this._namespace;
        },
        enumerable: true,
        configurable: true
    });
    MainDOMSource.prototype.select = function (selector) {
        if (typeof selector !== 'string') {
            throw new Error("DOM driver's select() expects the argument to be a " +
                "string as a CSS selector");
        }
        if (selector === 'document') {
            return new DocumentDOMSource_1.DocumentDOMSource(this._name);
        }
        if (selector === 'body') {
            return new BodyDOMSource_1.BodyDOMSource(this._name);
        }
        var trimmedSelector = selector.trim();
        var childNamespace = trimmedSelector === ":root" ?
            this._namespace :
            this._namespace.concat(trimmedSelector);
        return new MainDOMSource(this._rootElement$, this._sanitation$, childNamespace, this._isolateModule, this._delegators, this._name);
    };
    MainDOMSource.prototype.events = function (eventType, options) {
        if (options === void 0) { options = {}; }
        if (typeof eventType !== "string") {
            throw new Error("DOM driver's events() expects argument to be a " +
                "string representing the event type to listen for.");
        }
        var useCapture = determineUseCapture(eventType, options);
        var namespace = this._namespace;
        var fullScope = utils_1.getFullScope(namespace);
        var keyParts = [eventType, useCapture];
        if (fullScope) {
            keyParts.push(fullScope);
        }
        var key = keyParts.join('~');
        var domSource = this;
        var rootElement$;
        if (fullScope) {
            rootElement$ = this._rootElement$
                .compose(filterBasedOnIsolation(domSource, fullScope));
        }
        else {
            rootElement$ = this._rootElement$.take(2);
        }
        var event$ = rootElement$
            .map(function setupEventDelegatorOnTopElement(rootElement) {
            // Event listener just for the root element
            if (!namespace || namespace.length === 0) {
                return fromEvent_1.fromEvent(rootElement, eventType, useCapture);
            }
            // Event listener on the origin element as an EventDelegator
            var delegators = domSource._delegators;
            var origin = domSource._isolateModule.getElement(fullScope) || rootElement;
            var delegator;
            if (delegators.has(key)) {
                delegator = delegators.get(key);
                delegator.updateOrigin(origin);
            }
            else {
                delegator = new EventDelegator_1.EventDelegator(origin, eventType, useCapture, domSource._isolateModule);
                delegators.set(key, delegator);
            }
            if (fullScope) {
                domSource._isolateModule.addEventDelegator(fullScope, delegator);
            }
            var subject = delegator.createDestination(namespace);
            return subject;
        })
            .flatten();
        var out = adapt_1.adapt(event$);
        out._isCycleSource = domSource._name;
        return out;
    };
    MainDOMSource.prototype.dispose = function () {
        this._sanitation$.shamefullySendNext(null);
        this._isolateModule.reset();
    };
    return MainDOMSource;
}());
exports.MainDOMSource = MainDOMSource;
//# sourceMappingURL=MainDOMSource.js.map

/***/ },
/* 17 */
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScopeChecker = (function () {
    function ScopeChecker(fullScope, isolateModule) {
        this.fullScope = fullScope;
        this.isolateModule = isolateModule;
    }
    /**
     * Checks whether the given element is *directly* in the scope of this
     * scope checker. Being contained *indirectly* through other scopes
     * is not valid. This is crucial for implementing parent-child isolation,
     * so that the parent selectors don't search inside a child scope.
     */
    ScopeChecker.prototype.isDirectlyInScope = function (leaf) {
        for (var el = leaf; el; el = el.parentElement) {
            var fullScope = this.isolateModule.getFullScope(el);
            if (fullScope && fullScope !== this.fullScope) {
                return false;
            }
            if (fullScope) {
                return true;
            }
        }
        return true;
    };
    return ScopeChecker;
}());
exports.ScopeChecker = ScopeChecker;
//# sourceMappingURL=ScopeChecker.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createMatchesSelector() {
    var vendor;
    try {
        var proto = Element.prototype;
        vendor = proto.matches
            || proto.matchesSelector
            || proto.webkitMatchesSelector
            || proto.mozMatchesSelector
            || proto.msMatchesSelector
            || proto.oMatchesSelector;
    }
    catch (err) {
        vendor = null;
    }
    return function match(elem, selector) {
        if (vendor) {
            return vendor.call(elem, selector);
        }
        var nodes = elem.parentNode.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i] === elem) {
                return true;
            }
        }
        return false;
    };
}
exports.matchesSelector = createMatchesSelector();
//# sourceMappingURL=matchesSelector.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear

'use strict';

var value = __webpack_require__(0);

module.exports = function () {
    value(this).length = 0;
    return this;
};


/***/ },
/* 20 */
/***/ function(module, exports) {

"use strict";
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
    var key;
    for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, â€¦options*/) {
    var result = create(null);
    forEach.call(arguments, function (options) {
        if (options == null) return;
        process(Object(options), result);
    });
    return result;
};


/***/ },
/* 21 */
/***/ function(module, exports) {

"use strict";
'use strict';

var create = Object.create, getPrototypeOf = Object.getPrototypeOf
  , x = {};

module.exports = function (/*customCreate*/) {
    var setPrototypeOf = Object.setPrototypeOf
      , customCreate = arguments[0] || create;
    if (typeof setPrototypeOf !== 'function') return false;
    return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554

'use strict';

var isObject      = __webpack_require__(59)
  , value         = __webpack_require__(0)

  , isPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty = Object.defineProperty
  , nullDesc = { configurable: true, enumerable: false, writable: true,
        value: undefined }
  , validate;

validate = function (obj, prototype) {
    value(obj);
    if ((prototype === null) || isObject(prototype)) return obj;
    throw new TypeError('Prototype must be null or an object');
};

module.exports = (function (status) {
    var fn, set;
    if (!status) return null;
    if (status.level === 2) {
        if (status.set) {
            set = status.set;
            fn = function (obj, prototype) {
                set.call(validate(obj, prototype), prototype);
                return obj;
            };
        } else {
            fn = function (obj, prototype) {
                validate(obj, prototype).__proto__ = prototype;
                return obj;
            };
        }
    } else {
        fn = function self(obj, prototype) {
            var isNullBase;
            validate(obj, prototype);
            isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
            if (isNullBase) delete self.nullPolyfill.__proto__;
            if (prototype === null) prototype = self.nullPolyfill;
            obj.__proto__ = prototype;
            if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
            return obj;
        };
    }
    return Object.defineProperty(fn, 'level', { configurable: false,
        enumerable: false, writable: false, value: status.level });
}((function () {
    var x = Object.create(null), y = {}, set
      , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

    if (desc) {
        try {
            set = desc.set; // Opera crashes at this point
            set.call(x, y);
        } catch (ignore) { }
        if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
    }

    x.__proto__ = y;
    if (Object.getPrototypeOf(x) === y) return { level: 2 };

    x = {};
    x.__proto__ = y;
    if (Object.getPrototypeOf(x) === y) return { level: 1 };

    return false;
}())));

__webpack_require__(56);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = __webpack_require__(65)()
    ? String.prototype.contains
    : __webpack_require__(66);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isIterable = __webpack_require__(70);

module.exports = function (value) {
    if (!isIterable(value)) throw new TypeError(value + " is not iterable");
    return value;
};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = __webpack_require__(72)() ? Map : __webpack_require__(76);


/***/ },
/* 26 */
/***/ function(module, exports) {

"use strict";
"use strict";
function selectorParser(_a) {
    var sel = _a.sel;
    var hashIdx = sel.indexOf('#');
    var dotIdx = sel.indexOf('.', hashIdx);
    var hash = hashIdx > 0 ? hashIdx : sel.length;
    var dot = dotIdx > 0 ? dotIdx : sel.length;
    var tagName = hashIdx !== -1 || dotIdx !== -1 ?
        sel.slice(0, Math.min(hash, dot)) :
        sel;
    var id = hash < dot ? sel.slice(hash + 1, dot) : void 0;
    var className = dotIdx > 0 ? sel.slice(dot + 1).replace(/\./g, ' ') : void 0;
    return {
        tagName: tagName,
        id: id,
        className: className,
    };
}
exports.selectorParser = selectorParser;
//# sourceMappingURL=selectorParser.js.map

/***/ },
/* 27 */
/***/ function(module, exports) {

"use strict";
"use strict";
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.htmlDomApi;
//# sourceMappingURL=htmldomapi.js.map

/***/ },
/* 28 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;
//# sourceMappingURL=is.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var h_1 = __webpack_require__(7);
function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i, old = oldVnode.data, cur = thunk.data;
    var oldArgs = old.args, args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
exports.thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return h_1.h(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.thunk;
//# sourceMappingURL=thunk.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thunk_1 = __webpack_require__(29);
exports.thunk = thunk_1.thunk;
var MainDOMSource_1 = __webpack_require__(16);
exports.MainDOMSource = MainDOMSource_1.MainDOMSource;
/**
 * A factory for the DOM driver function.
 *
 * Takes a `container` to define the target on the existing DOM which this
 * driver will operate on, and an `options` object as the second argument. The
 * input to this driver is a stream of virtual DOM objects, or in other words,
 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
 * collection of Observables queried with the methods `select()` and `events()`.
 *
 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
 * the element(s) that matches the CSS `selector` given.
 *
 * `DOMSource.events(eventType, options)` returns a stream of events of
 * `eventType` happening on the elements that match the current DOMSource. The
 * event object contains the `ownerTarget` property that behaves exactly like
 * `currentTarget`. The reason for this is that some browsers doesn't allow
 * `currentTarget` property to be mutated, hence a new property is created. The
 * returned stream is an *xstream* Stream if you use `@cycle/xstream-run` to run
 * your app with this driver, or it is an RxJS Observable if you use
 * `@cycle/rxjs-run`, and so forth. The `options` parameter can have the
 * property `useCapture`, which is by default `false`, except it is `true` for
 * event types that do not bubble. Read more here
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * about the `useCapture` and its purpose.
 *
 * `DOMSource.elements()` returns a stream of the DOM element(s) matched by the
 * selectors in the DOMSource. Also, `DOMSource.select(':root').elements()`
 * returns a stream of DOM element corresponding to the root (or container) of
 * the app on the DOM.
 *
 * @param {(String|HTMLElement)} container the DOM selector for the element
 * (or the element itself) to contain the rendering of the VTrees.
 * @param {DOMDriverOptions} options an object with two optional properties:
 *
 *   - `modules: array` overrides `@cycle/dom`'s default Snabbdom modules as
 *     as defined in [`src/modules.ts`](./src/modules.ts).
 *   - `transposition: boolean` enables/disables transposition of inner streams
 *     in the virtual DOM tree.
 * @return {Function} the DOM driver function. The function expects a stream of
 * VNode as input, and outputs the DOMSource object.
 * @function makeDOMDriver
 */
var makeDOMDriver_1 = __webpack_require__(42);
exports.makeDOMDriver = makeDOMDriver_1.makeDOMDriver;
/**
 * A factory function to create mocked DOMSource objects, for testing purposes.
 *
 * Takes a `streamAdapter` and a `mockConfig` object as arguments, and returns
 * a DOMSource that can be given to any Cycle.js app that expects a DOMSource in
 * the sources, for testing.
 *
 * The `streamAdapter` parameter is a package such as `@cycle/xstream-adapter`,
 * `@cycle/rxjs-adapter`, etc. Import it as `import a from '@cycle/rx-adapter`,
 * then provide it to `mockDOMSource. This is important so the DOMSource created
 * knows which stream library should it use to export its streams when you call
 * `DOMSource.events()` for instance.
 *
 * The `mockConfig` parameter is an object specifying selectors, eventTypes and
 * their streams. Example:
 *
 * ```js
 * const domSource = mockDOMSource(RxAdapter, {
 *   '.foo': {
 *     'click': Rx.Observable.of({target: {}}),
 *     'mouseover': Rx.Observable.of({target: {}}),
 *   },
 *   '.bar': {
 *     'scroll': Rx.Observable.of({target: {}}),
 *     elements: Rx.Observable.of({tagName: 'div'}),
 *   }
 * });
 *
 * // Usage
 * const click$ = domSource.select('.foo').events('click');
 * const element$ = domSource.select('.bar').elements();
 * ```
 *
 * The mocked DOM Source supports isolation. It has the functions `isolateSink`
 * and `isolateSource` attached to it, and performs simple isolation using
 * classNames. *isolateSink* with scope `foo` will append the class `___foo` to
 * the stream of virtual DOM nodes, and *isolateSource* with scope `foo` will
 * perform a conventional `mockedDOMSource.select('.__foo')` call.
 *
 * @param {Object} mockConfig an object where keys are selector strings
 * and values are objects. Those nested objects have `eventType` strings as keys
 * and values are streams you created.
 * @return {Object} fake DOM source object, with an API containing `select()`
 * and `events()` and `elements()` which can be used just like the DOM Driver's
 * DOMSource.
 *
 * @function mockDOMSource
 */
var mockDOMSource_1 = __webpack_require__(43);
exports.mockDOMSource = mockDOMSource_1.mockDOMSource;
exports.MockedDOMSource = mockDOMSource_1.MockedDOMSource;
/**
 * The hyperscript function `h()` is a function to create virtual DOM objects,
 * also known as VNodes. Call
 *
 * ```js
 * h('div.myClass', {style: {color: 'red'}}, [])
 * ```
 *
 * to create a VNode that represents a `DIV` element with className `myClass`,
 * styled with red color, and no children because the `[]` array was passed. The
 * API is `h(tagOrSelector, optionalData, optionalChildrenOrText)`.
 *
 * However, usually you should use "hyperscript helpers", which are shortcut
 * functions based on hyperscript. There is one hyperscript helper function for
 * each DOM tagName, such as `h1()`, `h2()`, `div()`, `span()`, `label()`,
 * `input()`. For instance, the previous example could have been written
 * as:
 *
 * ```js
 * div('.myClass', {style: {color: 'red'}}, [])
 * ```
 *
 * There are also SVG helper functions, which apply the appropriate SVG
 * namespace to the resulting elements. `svg()` function creates the top-most
 * SVG element, and `svg.g`, `svg.polygon`, `svg.circle`, `svg.path` are for
 * SVG-specific child elements. Example:
 *
 * ```js
 * svg({width: 150, height: 150}, [
 *   svg.polygon({
 *     attrs: {
 *       class: 'triangle',
 *       points: '20 0 20 150 150 20'
 *     }
 *   })
 * ])
 * ```
 *
 * @function h
 */
var h_1 = __webpack_require__(7);
exports.h = h_1.h;
var hyperscript_helpers_1 = __webpack_require__(40);
exports.svg = hyperscript_helpers_1.default.svg;
exports.a = hyperscript_helpers_1.default.a;
exports.abbr = hyperscript_helpers_1.default.abbr;
exports.address = hyperscript_helpers_1.default.address;
exports.area = hyperscript_helpers_1.default.area;
exports.article = hyperscript_helpers_1.default.article;
exports.aside = hyperscript_helpers_1.default.aside;
exports.audio = hyperscript_helpers_1.default.audio;
exports.b = hyperscript_helpers_1.default.b;
exports.base = hyperscript_helpers_1.default.base;
exports.bdi = hyperscript_helpers_1.default.bdi;
exports.bdo = hyperscript_helpers_1.default.bdo;
exports.blockquote = hyperscript_helpers_1.default.blockquote;
exports.body = hyperscript_helpers_1.default.body;
exports.br = hyperscript_helpers_1.default.br;
exports.button = hyperscript_helpers_1.default.button;
exports.canvas = hyperscript_helpers_1.default.canvas;
exports.caption = hyperscript_helpers_1.default.caption;
exports.cite = hyperscript_helpers_1.default.cite;
exports.code = hyperscript_helpers_1.default.code;
exports.col = hyperscript_helpers_1.default.col;
exports.colgroup = hyperscript_helpers_1.default.colgroup;
exports.dd = hyperscript_helpers_1.default.dd;
exports.del = hyperscript_helpers_1.default.del;
exports.dfn = hyperscript_helpers_1.default.dfn;
exports.dir = hyperscript_helpers_1.default.dir;
exports.div = hyperscript_helpers_1.default.div;
exports.dl = hyperscript_helpers_1.default.dl;
exports.dt = hyperscript_helpers_1.default.dt;
exports.em = hyperscript_helpers_1.default.em;
exports.embed = hyperscript_helpers_1.default.embed;
exports.fieldset = hyperscript_helpers_1.default.fieldset;
exports.figcaption = hyperscript_helpers_1.default.figcaption;
exports.figure = hyperscript_helpers_1.default.figure;
exports.footer = hyperscript_helpers_1.default.footer;
exports.form = hyperscript_helpers_1.default.form;
exports.h1 = hyperscript_helpers_1.default.h1;
exports.h2 = hyperscript_helpers_1.default.h2;
exports.h3 = hyperscript_helpers_1.default.h3;
exports.h4 = hyperscript_helpers_1.default.h4;
exports.h5 = hyperscript_helpers_1.default.h5;
exports.h6 = hyperscript_helpers_1.default.h6;
exports.head = hyperscript_helpers_1.default.head;
exports.header = hyperscript_helpers_1.default.header;
exports.hgroup = hyperscript_helpers_1.default.hgroup;
exports.hr = hyperscript_helpers_1.default.hr;
exports.html = hyperscript_helpers_1.default.html;
exports.i = hyperscript_helpers_1.default.i;
exports.iframe = hyperscript_helpers_1.default.iframe;
exports.img = hyperscript_helpers_1.default.img;
exports.input = hyperscript_helpers_1.default.input;
exports.ins = hyperscript_helpers_1.default.ins;
exports.kbd = hyperscript_helpers_1.default.kbd;
exports.keygen = hyperscript_helpers_1.default.keygen;
exports.label = hyperscript_helpers_1.default.label;
exports.legend = hyperscript_helpers_1.default.legend;
exports.li = hyperscript_helpers_1.default.li;
exports.link = hyperscript_helpers_1.default.link;
exports.main = hyperscript_helpers_1.default.main;
exports.map = hyperscript_helpers_1.default.map;
exports.mark = hyperscript_helpers_1.default.mark;
exports.menu = hyperscript_helpers_1.default.menu;
exports.meta = hyperscript_helpers_1.default.meta;
exports.nav = hyperscript_helpers_1.default.nav;
exports.noscript = hyperscript_helpers_1.default.noscript;
exports.object = hyperscript_helpers_1.default.object;
exports.ol = hyperscript_helpers_1.default.ol;
exports.optgroup = hyperscript_helpers_1.default.optgroup;
exports.option = hyperscript_helpers_1.default.option;
exports.p = hyperscript_helpers_1.default.p;
exports.param = hyperscript_helpers_1.default.param;
exports.pre = hyperscript_helpers_1.default.pre;
exports.progress = hyperscript_helpers_1.default.progress;
exports.q = hyperscript_helpers_1.default.q;
exports.rp = hyperscript_helpers_1.default.rp;
exports.rt = hyperscript_helpers_1.default.rt;
exports.ruby = hyperscript_helpers_1.default.ruby;
exports.s = hyperscript_helpers_1.default.s;
exports.samp = hyperscript_helpers_1.default.samp;
exports.script = hyperscript_helpers_1.default.script;
exports.section = hyperscript_helpers_1.default.section;
exports.select = hyperscript_helpers_1.default.select;
exports.small = hyperscript_helpers_1.default.small;
exports.source = hyperscript_helpers_1.default.source;
exports.span = hyperscript_helpers_1.default.span;
exports.strong = hyperscript_helpers_1.default.strong;
exports.style = hyperscript_helpers_1.default.style;
exports.sub = hyperscript_helpers_1.default.sub;
exports.sup = hyperscript_helpers_1.default.sup;
exports.table = hyperscript_helpers_1.default.table;
exports.tbody = hyperscript_helpers_1.default.tbody;
exports.td = hyperscript_helpers_1.default.td;
exports.textarea = hyperscript_helpers_1.default.textarea;
exports.tfoot = hyperscript_helpers_1.default.tfoot;
exports.th = hyperscript_helpers_1.default.th;
exports.thead = hyperscript_helpers_1.default.thead;
exports.title = hyperscript_helpers_1.default.title;
exports.tr = hyperscript_helpers_1.default.tr;
exports.u = hyperscript_helpers_1.default.u;
exports.ul = hyperscript_helpers_1.default.ul;
exports.video = hyperscript_helpers_1.default.video;
//# sourceMappingURL=index.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(1);
var adapt_1 = __webpack_require__(5);
function logToConsoleError(err) {
    var target = err.stack || err;
    if (console && console.error) {
        console.error(target);
    }
    else if (console && console.log) {
        console.log(target);
    }
}
function makeSinkProxies(drivers) {
    var sinkProxies = {};
    for (var name_1 in drivers) {
        if (drivers.hasOwnProperty(name_1)) {
            sinkProxies[name_1] = xstream_1.default.createWithMemory();
        }
    }
    return sinkProxies;
}
function callDrivers(drivers, sinkProxies) {
    var sources = {};
    for (var name_2 in drivers) {
        if (drivers.hasOwnProperty(name_2)) {
            sources[name_2] = drivers[name_2](sinkProxies[name_2], name_2);
            if (sources[name_2] && typeof sources[name_2] === 'object') {
                sources[name_2]._isCycleSource = name_2;
            }
        }
    }
    return sources;
}
// NOTE: this will mutate `sources`.
function adaptSources(sources) {
    for (var name_3 in sources) {
        if (sources.hasOwnProperty(name_3)
            && sources[name_3]
            && typeof sources[name_3]['shamefullySendNext'] === 'function') {
            sources[name_3] = adapt_1.adapt(sources[name_3]);
        }
    }
    return sources;
}
function replicateMany(sinks, sinkProxies) {
    var sinkNames = Object.keys(sinks).filter(function (name) { return !!sinkProxies[name]; });
    var buffers = {};
    var replicators = {};
    sinkNames.forEach(function (name) {
        buffers[name] = { _n: [], _e: [] };
        replicators[name] = {
            next: function (x) { return buffers[name]._n.push(x); },
            error: function (err) { return buffers[name]._e.push(err); },
            complete: function () { },
        };
    });
    var subscriptions = sinkNames
        .map(function (name) { return xstream_1.default.fromObservable(sinks[name]).subscribe(replicators[name]); });
    sinkNames.forEach(function (name) {
        var listener = sinkProxies[name];
        var next = function (x) { listener._n(x); };
        var error = function (err) { logToConsoleError(err); listener._e(err); };
        buffers[name]._n.forEach(next);
        buffers[name]._e.forEach(error);
        replicators[name].next = next;
        replicators[name].error = error;
        // because sink.subscribe(replicator) had mutated replicator to add
        // _n, _e, _c, we must also update these:
        replicators[name]._n = next;
        replicators[name]._e = error;
    });
    buffers = null; // free up for GC
    return function disposeReplication() {
        subscriptions.forEach(function (s) { return s.unsubscribe(); });
        sinkNames.forEach(function (name) { return sinkProxies[name]._c(); });
    };
}
function disposeSources(sources) {
    for (var k in sources) {
        if (sources.hasOwnProperty(k) && sources[k] && sources[k].dispose) {
            sources[k].dispose();
        }
    }
}
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
/**
 * A function that prepares the Cycle application to be executed. Takes a `main`
 * function and prepares to circularly connects it to the given collection of
 * driver functions. As an output, `setup()` returns an object with three
 * properties: `sources`, `sinks` and `run`. Only when `run()` is called will
 * the application actually execute. Refer to the documentation of `run()` for
 * more details.
 *
 * **Example:**
 * ```js
 * import {setup} from '@cycle/run';
 * const {sources, sinks, run} = setup(main, drivers);
 * // ...
 * const dispose = run(); // Executes the application
 * // ...
 * dispose();
 * ```
 *
 * @param {Function} main a function that takes `sources` as input and outputs
 * `sinks`.
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Object} an object with three properties: `sources`, `sinks` and
 * `run`. `sources` is the collection of driver sources, `sinks` is the
 * collection of driver sinks, these can be used for debugging or testing. `run`
 * is the function that once called will execute the application.
 * @function setup
 */
function setup(main, drivers) {
    if (typeof main !== "function") {
        throw new Error("First argument given to Cycle must be the 'main' " +
            "function.");
    }
    if (typeof drivers !== "object" || drivers === null) {
        throw new Error("Second argument given to Cycle must be an object " +
            "with driver functions as properties.");
    }
    if (isObjectEmpty(drivers)) {
        throw new Error("Second argument given to Cycle must be an object " +
            "with at least one driver function declared as a property.");
    }
    var sinkProxies = makeSinkProxies(drivers);
    var sources = callDrivers(drivers, sinkProxies);
    var adaptedSources = adaptSources(sources);
    var sinks = main(adaptedSources);
    if (typeof window !== 'undefined') {
        window.Cyclejs = window.Cyclejs || {};
        window.Cyclejs.sinks = sinks;
    }
    function run() {
        var disposeReplication = replicateMany(sinks, sinkProxies);
        return function dispose() {
            disposeSources(sources);
            disposeReplication();
        };
    }
    ;
    return { sinks: sinks, sources: sources, run: run };
}
exports.setup = setup;
/**
 * Takes a `main` function and circularly connects it to the given collection
 * of driver functions.
 *
 * **Example:**
 * ```js
 * import run from '@cycle/run';
 * const dispose = run(main, drivers);
 * // ...
 * dispose();
 * ```
 *
 * The `main` function expects a collection of "source" streams (returned from
 * drivers) as input, and should return a collection of "sink" streams (to be
 * given to drivers). A "collection of streams" is a JavaScript object where
 * keys match the driver names registered by the `drivers` object, and values
 * are the streams. Refer to the documentation of each driver to see more
 * details on what types of sources it outputs and sinks it receives.
 *
 * @param {Function} main a function that takes `sources` as input and outputs
 * `sinks`.
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Function} a dispose function, used to terminate the execution of the
 * Cycle.js program, cleaning up resources used.
 * @function run
 */
function run(main, drivers) {
    var _a = setup(main, drivers), run = _a.run, sinks = _a.sinks;
    if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
        window['CyclejsDevTool_startGraphSerializer'](sinks);
    }
    return run();
}
exports.run = run;
exports.default = run;
//# sourceMappingURL=index.js.map

/***/ },
/* 32 */
/***/ function(module, exports) {

"use strict";
'use strict';
module.exports = str => {
    const match = str.match(/^[ \t]*(?=\S)/gm);

    if (!match) {
        return str;
    }

    // TODO: use spread operator when targeting Node.js 6
    const indent = Math.min.apply(Math, match.map(x => x.length)); // eslint-disable-line
    const re = new RegExp(`^[ \\t]{${indent}}`, 'gm');

    return indent > 0 ? str.replace(re, '') : str;
};


/***/ },
/* 33 */
/***/ function(module, exports) {

module.exports = function(module) {
    if(!module.webpackPolyfill) {
        module.deprecate = function() {};
        module.paths = [];
        // module.parent = undefined by default
        if(!module.children) module.children = [];
        Object.defineProperty(module, "loaded", {
            enumerable: true,
            configurable: false,
            get: function() { return module.l; }
        });
        Object.defineProperty(module, "id", {
            enumerable: true,
            configurable: false,
            get: function() { return module.i; }
        });
        module.webpackPolyfill = 1;
    }
    return module;
}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(1);
var adapt_1 = __webpack_require__(5);
var fromEvent_1 = __webpack_require__(10);
var BodyDOMSource = (function () {
    function BodyDOMSource(_name) {
        this._name = _name;
    }
    BodyDOMSource.prototype.select = function (selector) {
        // This functionality is still undefined/undecided.
        return this;
    };
    BodyDOMSource.prototype.elements = function () {
        var out = adapt_1.adapt(xstream_1.default.of(document.body));
        out._isCycleSource = this._name;
        return out;
    };
    BodyDOMSource.prototype.events = function (eventType, options) {
        if (options === void 0) { options = {}; }
        var stream;
        if (options && typeof options.useCapture === 'boolean') {
            stream = fromEvent_1.fromEvent(document.body, eventType, options.useCapture);
        }
        else {
            stream = fromEvent_1.fromEvent(document.body, eventType);
        }
        var out = adapt_1.adapt(stream);
        out._isCycleSource = this._name;
        return out;
    };
    return BodyDOMSource;
}());
exports.BodyDOMSource = BodyDOMSource;
//# sourceMappingURL=BodyDOMSource.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(1);
var adapt_1 = __webpack_require__(5);
var fromEvent_1 = __webpack_require__(10);
var DocumentDOMSource = (function () {
    function DocumentDOMSource(_name) {
        this._name = _name;
    }
    DocumentDOMSource.prototype.select = function (selector) {
        // This functionality is still undefined/undecided.
        return this;
    };
    DocumentDOMSource.prototype.elements = function () {
        var out = adapt_1.adapt(xstream_1.default.of(document));
        out._isCycleSource = this._name;
        return out;
    };
    DocumentDOMSource.prototype.events = function (eventType, options) {
        if (options === void 0) { options = {}; }
        var stream;
        if (options && typeof options.useCapture === 'boolean') {
            stream = fromEvent_1.fromEvent(document, eventType, options.useCapture);
        }
        else {
            stream = fromEvent_1.fromEvent(document, eventType);
        }
        var out = adapt_1.adapt(stream);
        out._isCycleSource = this._name;
        return out;
    };
    return DocumentDOMSource;
}());
exports.DocumentDOMSource = DocumentDOMSource;
//# sourceMappingURL=DocumentDOMSource.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScopeChecker_1 = __webpack_require__(17);
var utils_1 = __webpack_require__(4);
var matchesSelector_1 = __webpack_require__(18);
function toElArray(input) {
    return Array.prototype.slice.call(input);
}
var ElementFinder = (function () {
    function ElementFinder(namespace, isolateModule) {
        this.namespace = namespace;
        this.isolateModule = isolateModule;
    }
    ElementFinder.prototype.call = function (rootElement) {
        var namespace = this.namespace;
        var selector = utils_1.getSelectors(namespace);
        if (!selector) {
            return rootElement;
        }
        var fullScope = utils_1.getFullScope(namespace);
        var scopeChecker = new ScopeChecker_1.ScopeChecker(fullScope, this.isolateModule);
        var topNode = fullScope ?
            this.isolateModule.getElement(fullScope) || rootElement :
            rootElement;
        var topNodeMatchesSelector = !!fullScope && !!selector && matchesSelector_1.matchesSelector(topNode, selector);
        return toElArray(topNode.querySelectorAll(selector))
            .filter(scopeChecker.isDirectlyInScope, scopeChecker)
            .concat(topNodeMatchesSelector ? [topNode] : []);
    };
    return ElementFinder;
}());
exports.ElementFinder = ElementFinder;
//# sourceMappingURL=ElementFinder.js.map

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(1);
var ScopeChecker_1 = __webpack_require__(17);
var utils_1 = __webpack_require__(4);
var matchesSelector_1 = __webpack_require__(18);
/**
 * Finds (with binary search) index of the destination that id equal to searchId
 * among the destinations in the given array.
 */
function indexOf(arr, searchId) {
    var minIndex = 0;
    var maxIndex = arr.length - 1;
    var currentIndex;
    var current;
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0; // tslint:disable-line:no-bitwise
        current = arr[currentIndex];
        var currentId = current.id;
        if (currentId < searchId) {
            minIndex = currentIndex + 1;
        }
        else if (currentId > searchId) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
    return -1;
}
/**
 * Manages "Event delegation", by connecting an origin with multiple
 * destinations.
 *
 * Attaches a DOM event listener to the DOM element called the "origin",
 * and delegates events to "destinations", which are subjects as outputs
 * for the DOMSource. Simulates bubbling or capturing, with regards to
 * isolation boundaries too.
 */
var EventDelegator = (function () {
    function EventDelegator(origin, eventType, useCapture, isolateModule) {
        var _this = this;
        this.origin = origin;
        this.eventType = eventType;
        this.useCapture = useCapture;
        this.isolateModule = isolateModule;
        this.destinations = [];
        this._lastId = 0;
        if (useCapture) {
            this.listener = function (ev) { return _this.capture(ev); };
        }
        else {
            this.listener = function (ev) { return _this.bubble(ev); };
        }
        origin.addEventListener(eventType, this.listener, useCapture);
    }
    EventDelegator.prototype.updateOrigin = function (newOrigin) {
        this.origin.removeEventListener(this.eventType, this.listener, this.useCapture);
        newOrigin.addEventListener(this.eventType, this.listener, this.useCapture);
        this.origin = newOrigin;
    };
    /**
     * Creates a *new* destination given the namespace and returns the subject
     * representing the destination of events. Is not referentially transparent,
     * will always return a different output for the same input.
     */
    EventDelegator.prototype.createDestination = function (namespace) {
        var _this = this;
        var id = this._lastId++;
        var selector = utils_1.getSelectors(namespace);
        var scopeChecker = new ScopeChecker_1.ScopeChecker(utils_1.getFullScope(namespace), this.isolateModule);
        var subject = xstream_1.default.create({
            start: function () { },
            stop: function () {
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(function () {
                        _this.removeDestination(id);
                    });
                }
                else {
                    _this.removeDestination(id);
                }
            },
        });
        var destination = { id: id, selector: selector, scopeChecker: scopeChecker, subject: subject };
        this.destinations.push(destination);
        return subject;
    };
    /**
     * Removes the destination that has the given id.
     */
    EventDelegator.prototype.removeDestination = function (id) {
        var i = indexOf(this.destinations, id);
        i >= 0 && this.destinations.splice(i, 1); // tslint:disable-line:no-unused-expression
    };
    EventDelegator.prototype.capture = function (ev) {
        var n = this.destinations.length;
        for (var i = 0; i < n; i++) {
            var dest = this.destinations[i];
            if (matchesSelector_1.matchesSelector(ev.target, dest.selector)) {
                dest.subject._n(ev);
            }
        }
    };
    EventDelegator.prototype.bubble = function (rawEvent) {
        var origin = this.origin;
        if (!origin.contains(rawEvent.currentTarget)) {
            return;
        }
        var roof = origin.parentElement;
        var ev = this.patchEvent(rawEvent);
        for (var el = ev.target; el && el !== roof; el = el.parentElement) {
            if (!origin.contains(el)) {
                ev.stopPropagation();
            }
            if (ev.propagationHasBeenStopped) {
                return;
            }
            this.matchEventAgainstDestinations(el, ev);
        }
    };
    EventDelegator.prototype.patchEvent = function (event) {
        var pEvent = event;
        pEvent.propagationHasBeenStopped = false;
        var oldStopPropagation = pEvent.stopPropagation;
        pEvent.stopPropagation = function stopPropagation() {
            oldStopPropagation.call(this);
            this.propagationHasBeenStopped = true;
        };
        return pEvent;
    };
    EventDelegator.prototype.matchEventAgainstDestinations = function (el, ev) {
        var n = this.destinations.length;
        for (var i = 0; i < n; i++) {
            var dest = this.destinations[i];
            if (!dest.scopeChecker.isDirectlyInScope(el)) {
                continue;
            }
            if (matchesSelector_1.matchesSelector(el, dest.selector)) {
                this.mutateEventCurrentTarget(ev, el);
                dest.subject._n(ev);
            }
        }
    };
    EventDelegator.prototype.mutateEventCurrentTarget = function (event, currentTargetElement) {
        try {
            Object.defineProperty(event, "currentTarget", {
                value: currentTargetElement,
                configurable: true,
            });
        }
        catch (err) {
            console.log("please use event.ownerTarget");
        }
        event.ownerTarget = currentTargetElement;
    };
    return EventDelegator;
}());
exports.EventDelegator = EventDelegator;
//# sourceMappingURL=EventDelegator.js.map

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapPolyfill = __webpack_require__(25);
var IsolateModule = (function () {
    function IsolateModule() {
        this.elementsByFullScope = new MapPolyfill();
        this.delegatorsByFullScope = new MapPolyfill();
        this.fullScopesBeingUpdated = [];
    }
    IsolateModule.prototype.cleanupVNode = function (_a) {
        var data = _a.data, elm = _a.elm;
        var fullScope = (data || {}).isolate || '';
        var isCurrentElm = this.elementsByFullScope.get(fullScope) === elm;
        var isScopeBeingUpdated = this.fullScopesBeingUpdated.indexOf(fullScope) >= 0;
        if (fullScope && isCurrentElm && !isScopeBeingUpdated) {
            this.elementsByFullScope.delete(fullScope);
            this.delegatorsByFullScope.delete(fullScope);
        }
    };
    IsolateModule.prototype.getElement = function (fullScope) {
        return this.elementsByFullScope.get(fullScope);
    };
    IsolateModule.prototype.getFullScope = function (elm) {
        var iterator = this.elementsByFullScope.entries();
        for (var result = iterator.next(); !!result.value; result = iterator.next()) {
            var _a = result.value, fullScope = _a[0], element = _a[1];
            if (elm === element) {
                return fullScope;
            }
        }
        return '';
    };
    IsolateModule.prototype.addEventDelegator = function (fullScope, eventDelegator) {
        var delegators = this.delegatorsByFullScope.get(fullScope);
        if (!delegators) {
            delegators = [];
            this.delegatorsByFullScope.set(fullScope, delegators);
        }
        delegators[delegators.length] = eventDelegator;
    };
    IsolateModule.prototype.reset = function () {
        this.elementsByFullScope.clear();
        this.delegatorsByFullScope.clear();
        this.fullScopesBeingUpdated = [];
    };
    IsolateModule.prototype.createModule = function () {
        var self = this;
        return {
            create: function (oldVNode, vNode) {
                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
                var oldFullScope = oldData.isolate || '';
                var fullScope = data.isolate || '';
                // Update data structures with the newly-created element
                if (fullScope) {
                    self.fullScopesBeingUpdated.push(fullScope);
                    if (oldFullScope) {
                        self.elementsByFullScope.delete(oldFullScope);
                    }
                    self.elementsByFullScope.set(fullScope, elm);
                    // Update delegators for this scope
                    var delegators = self.delegatorsByFullScope.get(fullScope);
                    if (delegators) {
                        var len = delegators.length;
                        for (var i = 0; i < len; ++i) {
                            delegators[i].updateOrigin(elm);
                        }
                    }
                }
                if (oldFullScope && !fullScope) {
                    self.elementsByFullScope.delete(fullScope);
                }
            },
            update: function (oldVNode, vNode) {
                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
                var oldFullScope = oldData.isolate || '';
                var fullScope = data.isolate || '';
                // Same element, but different scope, so update the data structures
                if (fullScope && fullScope !== oldFullScope) {
                    if (oldFullScope) {
                        self.elementsByFullScope.delete(oldFullScope);
                    }
                    self.elementsByFullScope.set(fullScope, elm);
                    var delegators = self.delegatorsByFullScope.get(oldFullScope);
                    if (delegators) {
                        self.delegatorsByFullScope.delete(oldFullScope);
                        self.delegatorsByFullScope.set(fullScope, delegators);
                    }
                }
                // Same element, but lost the scope, so update the data structures
                if (oldFullScope && !fullScope) {
                    self.elementsByFullScope.delete(oldFullScope);
                    self.delegatorsByFullScope.delete(oldFullScope);
                }
            },
            destroy: function (vNode) {
                self.cleanupVNode(vNode);
            },
            remove: function (vNode, cb) {
                self.cleanupVNode(vNode);
                cb();
            },
            post: function () {
                self.fullScopesBeingUpdated = [];
            },
        };
    };
    return IsolateModule;
}());
exports.IsolateModule = IsolateModule;
//# sourceMappingURL=IsolateModule.js.map

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var h_1 = __webpack_require__(7);
var classNameFromVNode_1 = __webpack_require__(82);
var selectorParser_1 = __webpack_require__(26);
var VNodeWrapper = (function () {
    function VNodeWrapper(rootElement) {
        this.rootElement = rootElement;
    }
    VNodeWrapper.prototype.call = function (vnode) {
        if (vnode === null) {
            return this.wrap([]);
        }
        var _a = selectorParser_1.selectorParser(vnode), selTagName = _a.tagName, selId = _a.id;
        var vNodeClassName = classNameFromVNode_1.classNameFromVNode(vnode);
        var vNodeData = vnode.data || {};
        var vNodeDataProps = vNodeData.props || {};
        var _b = vNodeDataProps.id, vNodeId = _b === void 0 ? selId : _b;
        var isVNodeAndRootElementIdentical = typeof vNodeId === 'string' &&
            vNodeId.toUpperCase() === this.rootElement.id.toUpperCase() &&
            selTagName.toUpperCase() === this.rootElement.tagName.toUpperCase() &&
            vNodeClassName.toUpperCase() === this.rootElement.className.toUpperCase();
        if (isVNodeAndRootElementIdentical) {
            return vnode;
        }
        return this.wrap([vnode]);
    };
    VNodeWrapper.prototype.wrap = function (children) {
        var _a = this.rootElement, tagName = _a.tagName, id = _a.id, className = _a.className;
        var selId = id ? "#" + id : '';
        var selClass = className ?
            "." + className.split(" ").join(".") : '';
        return h_1.h("" + tagName.toLowerCase() + selId + selClass, {}, children);
    };
    return VNodeWrapper;
}());
exports.VNodeWrapper = VNodeWrapper;
//# sourceMappingURL=VNodeWrapper.js.map

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var h_1 = __webpack_require__(7);
function isValidString(param) {
    return typeof param === 'string' && param.length > 0;
}
function isSelector(param) {
    return isValidString(param) && (param[0] === '.' || param[0] === '#');
}
function createTagFunction(tagName) {
    return function hyperscript(a, b, c) {
        var hasA = typeof a !== 'undefined';
        var hasB = typeof b !== 'undefined';
        var hasC = typeof c !== 'undefined';
        if (isSelector(a)) {
            if (hasB && hasC) {
                return h_1.h(tagName + a, b, c);
            }
            else if (hasB) {
                return h_1.h(tagName + a, b);
            }
            else {
                return h_1.h(tagName + a, {});
            }
        }
        else if (hasC) {
            return h_1.h(tagName + a, b, c);
        }
        else if (hasB) {
            return h_1.h(tagName, a, b);
        }
        else if (hasA) {
            return h_1.h(tagName, a);
        }
        else {
            return h_1.h(tagName, {});
        }
    };
}
var SVG_TAG_NAMES = [
    'a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
    'animateMotion', 'animateTransform', 'circle', 'clipPath', 'colorProfile',
    'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
    'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
    'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
    'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
    'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
    'feSpotlight', 'feTile', 'feTurbulence', 'filter', 'font', 'fontFace',
    'fontFaceFormat', 'fontFaceName', 'fontFaceSrc', 'fontFaceUri',
    'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
    'linearGradient', 'marker', 'mask', 'metadata', 'missingGlyph', 'mpath',
    'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script',
    'set', 'stop', 'style', 'switch', 'symbol', 'text', 'textPath', 'title',
    'tref', 'tspan', 'use', 'view', 'vkern',
];
var svg = createTagFunction('svg');
SVG_TAG_NAMES.forEach(function (tag) {
    svg[tag] = createTagFunction(tag);
});
var TAG_NAMES = [
    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
    'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
    'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl',
    'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
    'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
    'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript',
    'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q',
    'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small',
    'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td',
    'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video',
];
var exported = { SVG_TAG_NAMES: SVG_TAG_NAMES, TAG_NAMES: TAG_NAMES, svg: svg, isSelector: isSelector, createTagFunction: createTagFunction };
TAG_NAMES.forEach(function (n) {
    exported[n] = createTagFunction(n);
});
exports.default = exported;
//# sourceMappingURL=hyperscript-helpers.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = __webpack_require__(9);
var utils_1 = __webpack_require__(4);
function totalIsolateSource(source, scope) {
    return source.select(utils_1.SCOPE_PREFIX + scope);
}
function siblingIsolateSource(source, scope) {
    return source.select(scope);
}
function isolateSource(source, scope) {
    if (scope === ':root') {
        return source;
    }
    else if (utils_1.isClassOrId(scope)) {
        return siblingIsolateSource(source, scope);
    }
    else {
        return totalIsolateSource(source, scope);
    }
}
exports.isolateSource = isolateSource;
function siblingIsolateSink(sink, scope) {
    return sink.map(function (node) {
        return node ?
            vnode_1.vnode(node.sel + scope, node.data, node.children, node.text, node.elm) :
            node;
    });
}
exports.siblingIsolateSink = siblingIsolateSink;
function totalIsolateSink(sink, fullScope) {
    return sink.map(function (node) {
        if (!node) {
            return node;
        }
        // Ignore if already had up-to-date full scope in vnode.data.isolate
        if (node.data && node.data.isolate) {
            var isolateData = node.data.isolate;
            var prevFullScopeNum = isolateData.replace(/(cycle|\-)/g, '');
            var fullScopeNum = fullScope.replace(/(cycle|\-)/g, '');
            if (isNaN(parseInt(prevFullScopeNum))
                || isNaN(parseInt(fullScopeNum))
                || prevFullScopeNum > fullScopeNum) {
                return node;
            }
        }
        // Insert up-to-date full scope in vnode.data.isolate, and also a key if needed
        node.data = node.data || {};
        node.data.isolate = fullScope;
        if (typeof node.key === 'undefined') {
            node.key = utils_1.SCOPE_PREFIX + fullScope;
        }
        return node;
    });
}
exports.totalIsolateSink = totalIsolateSink;
//# sourceMappingURL=isolate.js.map

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var snabbdom_1 = __webpack_require__(88);
var xstream_1 = __webpack_require__(1);
var MainDOMSource_1 = __webpack_require__(16);
var tovnode_1 = __webpack_require__(89);
var VNodeWrapper_1 = __webpack_require__(39);
var utils_1 = __webpack_require__(4);
var modules_1 = __webpack_require__(44);
var IsolateModule_1 = __webpack_require__(38);
var MapPolyfill = __webpack_require__(25);
function makeDOMDriverInputGuard(modules) {
    if (!Array.isArray(modules)) {
        throw new Error("Optional modules option must be " +
            "an array for snabbdom modules");
    }
}
function domDriverInputGuard(view$) {
    if (!view$
        || typeof view$.addListener !== "function"
        || typeof view$.fold !== "function") {
        throw new Error("The DOM driver function expects as input a Stream of " +
            "virtual DOM elements");
    }
}
function dropCompletion(input) {
    return xstream_1.default.merge(input, xstream_1.default.never());
}
function unwrapElementFromVNode(vnode) {
    return vnode.elm;
}
function reportSnabbdomError(err) {
    (console.error || console.log)(err);
}
function makeDOMDriver(container, options) {
    if (!options) {
        options = {};
    }
    var modules = options.modules || modules_1.default;
    var isolateModule = new IsolateModule_1.IsolateModule();
    var patch = snabbdom_1.init([isolateModule.createModule()].concat(modules));
    var rootElement = utils_1.getElement(container) || document.body;
    var vnodeWrapper = new VNodeWrapper_1.VNodeWrapper(rootElement);
    var delegators = new MapPolyfill();
    makeDOMDriverInputGuard(modules);
    function DOMDriver(vnode$, name) {
        if (name === void 0) { name = 'DOM'; }
        domDriverInputGuard(vnode$);
        var sanitation$ = xstream_1.default.create();
        var rootElement$ = xstream_1.default.merge(vnode$.endWhen(sanitation$), sanitation$)
            .map(function (vnode) { return vnodeWrapper.call(vnode); })
            .fold(patch, tovnode_1.toVNode(rootElement))
            .drop(1)
            .map(unwrapElementFromVNode)
            .compose(dropCompletion) // don't complete this stream
            .startWith(rootElement);
        // Start the snabbdom patching, over time
        var listener = { error: reportSnabbdomError };
        if (document.readyState === 'loading') {
            document.addEventListener('readystatechange', function () {
                if (document.readyState === 'interactive') {
                    rootElement$.addListener(listener);
                }
            });
        }
        else {
            rootElement$.addListener(listener);
        }
        return new MainDOMSource_1.MainDOMSource(rootElement$, sanitation$, [], isolateModule, delegators, name);
    }
    ;
    return DOMDriver;
}
exports.makeDOMDriver = makeDOMDriver;
//# sourceMappingURL=makeDOMDriver.js.map

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(1);
var adapt_1 = __webpack_require__(5);
var SCOPE_PREFIX = '___';
var MockedDOMSource = (function () {
    function MockedDOMSource(_mockConfig) {
        this._mockConfig = _mockConfig;
        if (_mockConfig['elements']) {
            this._elements = _mockConfig['elements'];
        }
        else {
            this._elements = adapt_1.adapt(xstream_1.default.empty());
        }
    }
    MockedDOMSource.prototype.elements = function () {
        var out = this._elements;
        out._isCycleSource = 'MockedDOM';
        return out;
    };
    MockedDOMSource.prototype.events = function (eventType, options) {
        var streamForEventType = this._mockConfig[eventType];
        var out = adapt_1.adapt(streamForEventType || xstream_1.default.empty());
        out._isCycleSource = 'MockedDOM';
        return out;
    };
    MockedDOMSource.prototype.select = function (selector) {
        var mockConfigForSelector = this._mockConfig[selector] || {};
        return new MockedDOMSource(mockConfigForSelector);
    };
    MockedDOMSource.prototype.isolateSource = function (source, scope) {
        return source.select('.' + SCOPE_PREFIX + scope);
    };
    MockedDOMSource.prototype.isolateSink = function (sink, scope) {
        return sink.map(function (vnode) {
            if (vnode.sel && vnode.sel.indexOf(SCOPE_PREFIX + scope) !== -1) {
                return vnode;
            }
            else {
                vnode.sel += "." + SCOPE_PREFIX + scope;
                return vnode;
            }
        });
    };
    return MockedDOMSource;
}());
exports.MockedDOMSource = MockedDOMSource;
function mockDOMSource(mockConfig) {
    return new MockedDOMSource(mockConfig);
}
exports.mockDOMSource = mockDOMSource;
//# sourceMappingURL=mockDOMSource.js.map

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = __webpack_require__(84);
exports.ClassModule = class_1.default;
var props_1 = __webpack_require__(86);
exports.PropsModule = props_1.default;
var attributes_1 = __webpack_require__(83);
exports.AttrsModule = attributes_1.default;
var style_1 = __webpack_require__(87);
exports.StyleModule = style_1.default;
var dataset_1 = __webpack_require__(85);
exports.DatasetModule = dataset_1.default;
var modules = [style_1.default, class_1.default, props_1.default, attributes_1.default, dataset_1.default];
exports.default = modules;
//# sourceMappingURL=modules.js.map

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var copy             = __webpack_require__(55)
  , normalizeOptions = __webpack_require__(20)
  , ensureCallable   = __webpack_require__(2)
  , map              = __webpack_require__(63)
  , callable         = __webpack_require__(2)
  , validValue       = __webpack_require__(0)

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, options) {
    var value = validValue(desc) && callable(desc.value), dgs;
    dgs = copy(desc);
    delete dgs.writable;
    delete dgs.value;
    dgs.get = function () {
        if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
        desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
        defineProperty(this, name, desc);
        return this[name];
    };
    return dgs;
};

module.exports = function (props/*, options*/) {
    var options = normalizeOptions(arguments[1]);
    if (options.resolveContext != null) ensureCallable(options.resolveContext);
    return map(props, function (desc, name) { return define(name, desc, options); });
};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var toPosInt = __webpack_require__(51)
  , value    = __webpack_require__(0)

  , indexOf = Array.prototype.indexOf
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , abs = Math.abs, floor = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
    var i, l, fromIndex, val;
    if (searchElement === searchElement) { //jslint: ignore
        return indexOf.apply(this, arguments);
    }

    l = toPosInt(value(this).length);
    fromIndex = arguments[1];
    if (isNaN(fromIndex)) fromIndex = 0;
    else if (fromIndex >= 0) fromIndex = floor(fromIndex);
    else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

    for (i = fromIndex; i < l; ++i) {
        if (hasOwnProperty.call(this, i)) {
            val = this[i];
            if (val !== val) return i; //jslint: ignore
        }
    }
    return -1;
};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = __webpack_require__(48)()
    ? Math.sign
    : __webpack_require__(49);


/***/ },
/* 48 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function () {
    var sign = Math.sign;
    if (typeof sign !== 'function') return false;
    return ((sign(10) === 1) && (sign(-20) === -1));
};


/***/ },
/* 49 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function (value) {
    value = Number(value);
    if (isNaN(value) || (value === 0)) return value;
    return (value > 0) ? 1 : -1;
};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var sign = __webpack_require__(47)

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
    if (isNaN(value)) return 0;
    value = Number(value);
    if ((value === 0) || !isFinite(value)) return value;
    return sign(value) * floor(abs(value));
};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var toInteger = __webpack_require__(50)

  , max = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order

'use strict';

var callable = __webpack_require__(2)
  , value    = __webpack_require__(0)

  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
    return function (obj, cb/*, thisArg, compareFn*/) {
        var list, thisArg = arguments[2], compareFn = arguments[3];
        obj = Object(value(obj));
        callable(cb);

        list = keys(obj);
        if (compareFn) {
            list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
        }
        if (typeof method !== 'function') method = list[method];
        return call.call(method, list, function (key, index) {
            if (!propertyIsEnumerable.call(obj, key)) return defVal;
            return call.call(cb, thisArg, obj[key], key, obj, index);
        });
    };
};


/***/ },
/* 53 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function () {
    var assign = Object.assign, obj;
    if (typeof assign !== 'function') return false;
    obj = { foo: 'raz' };
    assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
    return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var keys  = __webpack_require__(60)
  , value = __webpack_require__(0)

  , max = Math.max;

module.exports = function (dest, src/*, â€¦srcn*/) {
    var error, i, l = max(arguments.length, 2), assign;
    dest = Object(value(dest));
    assign = function (key) {
        try { dest[key] = src[key]; } catch (e) {
            if (!error) error = e;
        }
    };
    for (i = 1; i < l; ++i) {
        src = arguments[i];
        keys(src).forEach(assign);
    }
    if (error !== undefined) throw error;
    return dest;
};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var assign = __webpack_require__(12)
  , value  = __webpack_require__(0);

module.exports = function (obj) {
    var copy = Object(value(obj));
    if (copy !== obj) return copy;
    return assign({}, obj);
};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

'use strict';

var create = Object.create, shim;

if (!__webpack_require__(21)()) {
    shim = __webpack_require__(22);
}

module.exports = (function () {
    var nullObject, props, desc;
    if (!shim) return create;
    if (shim.level !== 1) return create;

    nullObject = {};
    props = {};
    desc = { configurable: false, enumerable: false, writable: true,
        value: undefined };
    Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
        if (name === '__proto__') {
            props[name] = { configurable: true, enumerable: false, writable: true,
                value: undefined };
            return;
        }
        props[name] = desc;
    });
    Object.defineProperties(nullObject, props);

    Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
        enumerable: false, writable: false, value: nullObject });

    return function (prototype, props) {
        return create((prototype === null) ? nullObject : prototype, props);
    };
}());


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = __webpack_require__(52)('forEach');


/***/ },
/* 58 */
/***/ function(module, exports) {

"use strict";
// Deprecated

'use strict';

module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },
/* 59 */
/***/ function(module, exports) {

"use strict";
'use strict';

var map = { 'function': true, object: true };

module.exports = function (x) {
    return ((x != null) && map[typeof x]) || false;
};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = __webpack_require__(61)()
    ? Object.keys
    : __webpack_require__(62);


/***/ },
/* 61 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function () {
    try {
        Object.keys('primitive');
        return true;
    } catch (e) { return false; }
};


/***/ },
/* 62 */
/***/ function(module, exports) {

"use strict";
'use strict';

var keys = Object.keys;

module.exports = function (object) {
    return keys(object == null ? object : Object(object));
};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var callable = __webpack_require__(2)
  , forEach  = __webpack_require__(57)

  , call = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
    var o = {}, thisArg = arguments[2];
    callable(cb);
    forEach(obj, function (value, key, obj, index) {
        o[key] = call.call(cb, thisArg, value, key, obj, index);
    });
    return o;
};


/***/ },
/* 64 */
/***/ function(module, exports) {

"use strict";
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

module.exports = function (arg/*, â€¦args*/) {
    var set = create(null);
    forEach.call(arguments, function (name) { set[name] = true; });
    return set;
};


/***/ },
/* 65 */
/***/ function(module, exports) {

"use strict";
'use strict';

var str = 'razdwatrzy';

module.exports = function () {
    if (typeof str.contains !== 'function') return false;
    return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};


/***/ },
/* 66 */
/***/ function(module, exports) {

"use strict";
'use strict';

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
    return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var setPrototypeOf = __webpack_require__(8)
  , contains       = __webpack_require__(23)
  , d              = __webpack_require__(3)
  , Iterator       = __webpack_require__(14)

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
    if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
    Iterator.call(this, arr);
    if (!kind) kind = 'value';
    else if (contains.call(kind, 'key+value')) kind = 'key+value';
    else if (contains.call(kind, 'key')) kind = 'key';
    else kind = 'value';
    defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
    constructor: d(ArrayIterator),
    _resolve: d(function (i) {
        if (this.__kind__ === 'value') return this.__list__[i];
        if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
        return i;
    }),
    toString: d(function () { return '[object Array Iterator]'; })
});


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isArguments = __webpack_require__(11)
  , callable    = __webpack_require__(2)
  , isString    = __webpack_require__(13)
  , get         = __webpack_require__(69)

  , isArray = Array.isArray, call = Function.prototype.call
  , some = Array.prototype.some;

module.exports = function (iterable, cb/*, thisArg*/) {
    var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
    if (isArray(iterable) || isArguments(iterable)) mode = 'array';
    else if (isString(iterable)) mode = 'string';
    else iterable = get(iterable);

    callable(cb);
    doBreak = function () { broken = true; };
    if (mode === 'array') {
        some.call(iterable, function (value) {
            call.call(cb, thisArg, value, doBreak);
            if (broken) return true;
        });
        return;
    }
    if (mode === 'string') {
        l = iterable.length;
        for (i = 0; i < l; ++i) {
            char = iterable[i];
            if ((i + 1) < l) {
                code = char.charCodeAt(0);
                if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
            }
            call.call(cb, thisArg, char, doBreak);
            if (broken) break;
        }
        return;
    }
    result = iterable.next();

    while (!result.done) {
        call.call(cb, thisArg, result.value, doBreak);
        if (broken) return;
        result = iterable.next();
    }
};


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isArguments    = __webpack_require__(11)
  , isString       = __webpack_require__(13)
  , ArrayIterator  = __webpack_require__(67)
  , StringIterator = __webpack_require__(71)
  , iterable       = __webpack_require__(24)
  , iteratorSymbol = __webpack_require__(6).iterator;

module.exports = function (obj) {
    if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
    if (isArguments(obj)) return new ArrayIterator(obj);
    if (isString(obj)) return new StringIterator(obj);
    return new ArrayIterator(obj);
};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isArguments    = __webpack_require__(11)
  , isString       = __webpack_require__(13)
  , iteratorSymbol = __webpack_require__(6).iterator

  , isArray = Array.isArray;

module.exports = function (value) {
    if (value == null) return false;
    if (isArray(value)) return true;
    if (isString(value)) return true;
    if (isArguments(value)) return true;
    return (typeof value[iteratorSymbol] === 'function');
};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

'use strict';

var setPrototypeOf = __webpack_require__(8)
  , d              = __webpack_require__(3)
  , Iterator       = __webpack_require__(14)

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
    if (!(this instanceof StringIterator)) return new StringIterator(str);
    str = String(str);
    Iterator.call(this, str);
    defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
    constructor: d(StringIterator),
    _next: d(function () {
        if (!this.__list__) return;
        if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
        this._unBind();
    }),
    _resolve: d(function (i) {
        var char = this.__list__[i], code;
        if (this.__nextIndex__ === this.__length__) return char;
        code = char.charCodeAt(0);
        if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
        return char;
    }),
    toString: d(function () { return '[object String Iterator]'; })
});


/***/ },
/* 72 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function () {
    var map, iterator, result;
    if (typeof Map !== 'function') return false;
    try {
        // WebKit doesn't support arguments and crashes
        map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
    } catch (e) {
        return false;
    }
    if (String(map) !== '[object Map]') return false;
    if (map.size !== 3) return false;
    if (typeof map.clear !== 'function') return false;
    if (typeof map.delete !== 'function') return false;
    if (typeof map.entries !== 'function') return false;
    if (typeof map.forEach !== 'function') return false;
    if (typeof map.get !== 'function') return false;
    if (typeof map.has !== 'function') return false;
    if (typeof map.keys !== 'function') return false;
    if (typeof map.set !== 'function') return false;
    if (typeof map.values !== 'function') return false;

    iterator = map.entries();
    result = iterator.next();
    if (result.done !== false) return false;
    if (!result.value) return false;
    if (result.value[0] !== 'raz') return false;
    if (result.value[1] !== 'one') return false;

    return true;
};


/***/ },
/* 73 */
/***/ function(module, exports) {

"use strict";
// Exports true if environment provides native `Map` implementation,
// whatever that is.

'use strict';

module.exports = (function () {
    if (typeof Map === 'undefined') return false;
    return (Object.prototype.toString.call(new Map()) === '[object Map]');
}());


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = __webpack_require__(64)('key',
    'value', 'key+value');


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var setPrototypeOf    = __webpack_require__(8)
  , d                 = __webpack_require__(3)
  , Iterator          = __webpack_require__(14)
  , toStringTagSymbol = __webpack_require__(6).toStringTag
  , kinds             = __webpack_require__(74)

  , defineProperties = Object.defineProperties
  , unBind = Iterator.prototype._unBind
  , MapIterator;

MapIterator = module.exports = function (map, kind) {
    if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
    Iterator.call(this, map.__mapKeysData__, map);
    if (!kind || !kinds[kind]) kind = 'key+value';
    defineProperties(this, {
        __kind__: d('', kind),
        __values__: d('w', map.__mapValuesData__)
    });
};
if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

MapIterator.prototype = Object.create(Iterator.prototype, {
    constructor: d(MapIterator),
    _resolve: d(function (i) {
        if (this.__kind__ === 'value') return this.__values__[i];
        if (this.__kind__ === 'key') return this.__list__[i];
        return [this.__list__[i], this.__values__[i]];
    }),
    _unBind: d(function () {
        this.__values__ = null;
        unBind.call(this);
    }),
    toString: d(function () { return '[object Map Iterator]'; })
});
Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
    d('c', 'Map Iterator'));


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var clear          = __webpack_require__(19)
  , eIndexOf       = __webpack_require__(46)
  , setPrototypeOf = __webpack_require__(8)
  , callable       = __webpack_require__(2)
  , validValue     = __webpack_require__(0)
  , d              = __webpack_require__(3)
  , ee             = __webpack_require__(81)
  , Symbol         = __webpack_require__(6)
  , iterator       = __webpack_require__(24)
  , forOf          = __webpack_require__(68)
  , Iterator       = __webpack_require__(75)
  , isNative       = __webpack_require__(73)

  , call = Function.prototype.call
  , defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf
  , MapPoly;

module.exports = MapPoly = function (/*iterable*/) {
    var iterable = arguments[0], keys, values, self;
    if (!(this instanceof MapPoly)) throw new TypeError('Constructor requires \'new\'');
    if (isNative && setPrototypeOf && (Map !== MapPoly)) {
        self = setPrototypeOf(new Map(), getPrototypeOf(this));
    } else {
        self = this;
    }
    if (iterable != null) iterator(iterable);
    defineProperties(self, {
        __mapKeysData__: d('c', keys = []),
        __mapValuesData__: d('c', values = [])
    });
    if (!iterable) return self;
    forOf(iterable, function (value) {
        var key = validValue(value)[0];
        value = value[1];
        if (eIndexOf.call(keys, key) !== -1) return;
        keys.push(key);
        values.push(value);
    }, self);
    return self;
};

if (isNative) {
    if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
    MapPoly.prototype = Object.create(Map.prototype, {
        constructor: d(MapPoly)
    });
}

ee(defineProperties(MapPoly.prototype, {
    clear: d(function () {
        if (!this.__mapKeysData__.length) return;
        clear.call(this.__mapKeysData__);
        clear.call(this.__mapValuesData__);
        this.emit('_clear');
    }),
    delete: d(function (key) {
        var index = eIndexOf.call(this.__mapKeysData__, key);
        if (index === -1) return false;
        this.__mapKeysData__.splice(index, 1);
        this.__mapValuesData__.splice(index, 1);
        this.emit('_delete', index, key);
        return true;
    }),
    entries: d(function () { return new Iterator(this, 'key+value'); }),
    forEach: d(function (cb/*, thisArg*/) {
        var thisArg = arguments[1], iterator, result;
        callable(cb);
        iterator = this.entries();
        result = iterator._next();
        while (result !== undefined) {
            call.call(cb, thisArg, this.__mapValuesData__[result],
                this.__mapKeysData__[result], this);
            result = iterator._next();
        }
    }),
    get: d(function (key) {
        var index = eIndexOf.call(this.__mapKeysData__, key);
        if (index === -1) return;
        return this.__mapValuesData__[index];
    }),
    has: d(function (key) {
        return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
    }),
    keys: d(function () { return new Iterator(this, 'key'); }),
    set: d(function (key, value) {
        var index = eIndexOf.call(this.__mapKeysData__, key), emit;
        if (index === -1) {
            index = this.__mapKeysData__.push(key) - 1;
            emit = true;
        }
        this.__mapValuesData__[index] = value;
        if (emit) this.emit('_add', index, key);
        return this;
    }),
    size: d.gs(function () { return this.__mapKeysData__.length; }),
    values: d(function () { return new Iterator(this, 'value'); }),
    toString: d(function () { return '[object Map]'; })
}));
Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
    return this.entries();
}));
Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));


/***/ },
/* 77 */
/***/ function(module, exports) {

"use strict";
'use strict';

var validTypes = { object: true, symbol: true };

module.exports = function () {
    var symbol;
    if (typeof Symbol !== 'function') return false;
    symbol = Symbol('test symbol');
    try { String(symbol); } catch (e) { return false; }

    // Return 'true' also for polyfills
    if (!validTypes[typeof Symbol.iterator]) return false;
    if (!validTypes[typeof Symbol.toPrimitive]) return false;
    if (!validTypes[typeof Symbol.toStringTag]) return false;

    return true;
};


/***/ },
/* 78 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function (x) {
    if (!x) return false;
    if (typeof x === 'symbol') return true;
    if (!x.constructor) return false;
    if (x.constructor.name !== 'Symbol') return false;
    return (x[x.constructor.toStringTag] === 'Symbol');
};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it

'use strict';

var d              = __webpack_require__(3)
  , validateSymbol = __webpack_require__(80)

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
    NativeSymbol = Symbol;
    try {
        String(NativeSymbol());
        isNativeSafe = true;
    } catch (ignore) {}
}

var generateName = (function () {
    var created = create(null);
    return function (desc) {
        var postfix = 0, name, ie11BugWorkaround;
        while (created[desc + (postfix || '')]) ++postfix;
        desc += (postfix || '');
        created[desc] = true;
        name = '@@' + desc;
        defineProperty(objPrototype, name, d.gs(null, function (value) {
            // For IE11 issue see:
            // https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
            //    ie11-broken-getters-on-dom-objects
            // https://github.com/medikoo/es6-symbol/issues/12
            if (ie11BugWorkaround) return;
            ie11BugWorkaround = true;
            defineProperty(this, name, d(value));
            ie11BugWorkaround = false;
        }));
        return name;
    };
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
    if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
    return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
    var symbol;
    if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
    if (isNativeSafe) return NativeSymbol(description);
    symbol = create(HiddenSymbol.prototype);
    description = (description === undefined ? '' : String(description));
    return defineProperties(symbol, {
        __description__: d('', description),
        __name__: d('', generateName(description))
    });
};
defineProperties(SymbolPolyfill, {
    for: d(function (key) {
        if (globalSymbols[key]) return globalSymbols[key];
        return (globalSymbols[key] = SymbolPolyfill(String(key)));
    }),
    keyFor: d(function (s) {
        var key;
        validateSymbol(s);
        for (key in globalSymbols) if (globalSymbols[key] === s) return key;
    }),

    // To ensure proper interoperability with other native functions (e.g. Array.from)
    // fallback to eventual native implementation of given symbol
    hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
    isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
        SymbolPolyfill('isConcatSpreadable')),
    iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
    match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
    replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
    search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
    species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
    split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
    toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
    toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
    unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
    constructor: d(SymbolPolyfill),
    toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
    toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
    valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
    var symbol = validateSymbol(this);
    if (typeof symbol === 'symbol') return symbol;
    return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
    d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
    d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isSymbol = __webpack_require__(78);

module.exports = function (value) {
    if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
    return value;
};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var d        = __webpack_require__(3)
  , callable = __webpack_require__(2)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
    var data;

    callable(listener);

    if (!hasOwnProperty.call(this, '__ee__')) {
        data = descriptor.value = create(null);
        defineProperty(this, '__ee__', descriptor);
        descriptor.value = null;
    } else {
        data = this.__ee__;
    }
    if (!data[type]) data[type] = listener;
    else if (typeof data[type] === 'object') data[type].push(listener);
    else data[type] = [data[type], listener];

    return this;
};

once = function (type, listener) {
    var once, self;

    callable(listener);
    self = this;
    on.call(this, type, once = function () {
        off.call(self, type, once);
        apply.call(listener, this, arguments);
    });

    once.__eeOnceListener__ = listener;
    return this;
};

off = function (type, listener) {
    var data, listeners, candidate, i;

    callable(listener);

    if (!hasOwnProperty.call(this, '__ee__')) return this;
    data = this.__ee__;
    if (!data[type]) return this;
    listeners = data[type];

    if (typeof listeners === 'object') {
        for (i = 0; (candidate = listeners[i]); ++i) {
            if ((candidate === listener) ||
                    (candidate.__eeOnceListener__ === listener)) {
                if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
                else listeners.splice(i, 1);
            }
        }
    } else {
        if ((listeners === listener) ||
                (listeners.__eeOnceListener__ === listener)) {
            delete data[type];
        }
    }

    return this;
};

emit = function (type) {
    var i, l, listener, listeners, args;

    if (!hasOwnProperty.call(this, '__ee__')) return;
    listeners = this.__ee__[type];
    if (!listeners) return;

    if (typeof listeners === 'object') {
        l = arguments.length;
        args = new Array(l - 1);
        for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

        listeners = listeners.slice();
        for (i = 0; (listener = listeners[i]); ++i) {
            apply.call(listener, this, args);
        }
    } else {
        switch (arguments.length) {
        case 1:
            call.call(listeners, this);
            break;
        case 2:
            call.call(listeners, this, arguments[1]);
            break;
        case 3:
            call.call(listeners, this, arguments[1], arguments[2]);
            break;
        default:
            l = arguments.length;
            args = new Array(l - 1);
            for (i = 1; i < l; ++i) {
                args[i - 1] = arguments[i];
            }
            apply.call(listeners, this, args);
        }
    }
};

methods = {
    on: on,
    once: once,
    off: off,
    emit: emit
};

descriptors = {
    on: d(on),
    once: d(once),
    off: d(off),
    emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
    return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var selectorParser_1 = __webpack_require__(26);
function classNameFromVNode(vNode) {
    var _a = selectorParser_1.selectorParser(vNode).className, cn = _a === void 0 ? '' : _a;
    if (!vNode.data) {
        return cn;
    }
    var _b = vNode.data, dataClass = _b.class, props = _b.props;
    if (dataClass) {
        var c = Object.keys(dataClass)
            .filter(function (cl) { return dataClass[cl]; });
        cn += " " + c.join(" ");
    }
    if (props && props.className) {
        cn += " " + props.className;
    }
    return cn && cn.trim();
}
exports.classNameFromVNode = classNameFromVNode;
//# sourceMappingURL=classNameFromVNode.js.map

/***/ },
/* 83 */
/***/ function(module, exports) {

"use strict";
"use strict";
var NamespaceURIs = {
    "xlink": "http://www.w3.org/1999/xlink"
};
var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare",
    "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable",
    "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple",
    "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly",
    "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate",
    "truespeed", "typemustmatch", "visible"];
var booleanAttrsDict = Object.create(null);
for (var i = 0, len = booleanAttrs.length; i < len; i++) {
    booleanAttrsDict[booleanAttrs[i]] = true;
}
function updateAttrs(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs, namespaceSplit;
    if (!oldAttrs && !attrs)
        return;
    if (oldAttrs === attrs)
        return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        cur = attrs[key];
        old = oldAttrs[key];
        if (old !== cur) {
            if (!cur && booleanAttrsDict[key])
                elm.removeAttribute(key);
            else {
                namespaceSplit = key.split(":");
                if (namespaceSplit.length > 1 && NamespaceURIs.hasOwnProperty(namespaceSplit[0]))
                    elm.setAttributeNS(NamespaceURIs[namespaceSplit[0]], key, cur);
                else
                    elm.setAttribute(key, cur);
            }
        }
    }
    //remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
exports.attributesModule = { create: updateAttrs, update: updateAttrs };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.attributesModule;
//# sourceMappingURL=attributes.js.map

/***/ },
/* 84 */
/***/ function(module, exports) {

"use strict";
"use strict";
function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.classModule;
//# sourceMappingURL=class.js.map

/***/ },
/* 85 */
/***/ function(module, exports) {

"use strict";
"use strict";
var CAPS_REGEX = /[A-Z]/g;
function updateDataset(oldVnode, vnode) {
    var elm = vnode.elm, oldDataset = oldVnode.data.dataset, dataset = vnode.data.dataset, key;
    if (!oldDataset && !dataset)
        return;
    if (oldDataset === dataset)
        return;
    oldDataset = oldDataset || {};
    dataset = dataset || {};
    var d = elm.dataset;
    for (key in oldDataset) {
        if (!dataset[key]) {
            if (d) {
                delete d[key];
            }
            else {
                elm.removeAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
    for (key in dataset) {
        if (oldDataset[key] !== dataset[key]) {
            if (d) {
                d[key] = dataset[key];
            }
            else {
                elm.setAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase(), dataset[key]);
            }
        }
    }
}
exports.datasetModule = { create: updateDataset, update: updateDataset };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.datasetModule;
//# sourceMappingURL=dataset.js.map

/***/ },
/* 86 */
/***/ function(module, exports) {

"use strict";
"use strict";
function updateProps(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
exports.propsModule = { create: updateProps, update: updateProps };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.propsModule;
//# sourceMappingURL=props.js.map

/***/ },
/* 87 */
/***/ function(module, exports) {

"use strict";
"use strict";
var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function (fn) { raf(function () { raf(fn); }); };
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
}
function updateStyle(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;
    if (!oldStyle && !style)
        return;
    if (oldStyle === style)
        return;
    oldStyle = oldStyle || {};
    style = style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.removeProperty(name);
            }
            else {
                elm.style[name] = '';
            }
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed') {
            for (name in style.delayed) {
                cur = style.delayed[name];
                if (!oldHasDel || cur !== oldStyle.delayed[name]) {
                    setNextFrame(elm.style, name, cur);
                }
            }
        }
        else if (name !== 'remove' && cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.setProperty(name, cur);
            }
            else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    var style, name, elm = vnode.elm, s = vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
    });
}
exports.styleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.styleModule;
//# sourceMappingURL=style.js.map

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var vnode_1 = __webpack_require__(9);
var is = __webpack_require__(28);
var htmldomapi_1 = __webpack_require__(27);
function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = vnode_1.default('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
var h_1 = __webpack_require__(7);
exports.h = h_1.h;
var thunk_1 = __webpack_require__(29);
exports.thunk = thunk_1.thunk;
function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode_1.default(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.id = sel.slice(hash + 1, dot);
            if (dotIdx > 0)
                elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode;
    };
}
exports.init = init;
//# sourceMappingURL=snabbdom.js.map

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var vnode_1 = __webpack_require__(9);
var htmldomapi_1 = __webpack_require__(27);
function toVNode(node, domApi) {
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    var text;
    if (api.isElement(node)) {
        var id = node.id ? '#' + node.id : '';
        var cn = node.getAttribute('class');
        var c = cn ? '.' + cn.split(' ').join('.') : '';
        var sel = api.tagName(node).toLowerCase() + id + c;
        var attrs = {};
        var children = [];
        var name_1;
        var i = void 0, n = void 0;
        var elmAttrs = node.attributes;
        var elmChildren = node.childNodes;
        for (i = 0, n = elmAttrs.length; i < n; i++) {
            name_1 = elmAttrs[i].nodeName;
            if (name_1 !== 'id' && name_1 !== 'class') {
                attrs[name_1] = elmAttrs[i].nodeValue;
            }
        }
        for (i = 0, n = elmChildren.length; i < n; i++) {
            children.push(toVNode(elmChildren[i]));
        }
        return vnode_1.default(sel, { attrs: attrs }, children, undefined, node);
    }
    else if (api.isText(node)) {
        text = api.getTextContent(node);
        return vnode_1.default(undefined, undefined, undefined, text, node);
    }
    else if (api.isComment(node)) {
        text = api.getTextContent(node);
        return vnode_1.default('!', undefined, undefined, text, undefined);
    }
    else {
        return vnode_1.default('', {}, [], undefined, undefined);
    }
}
exports.toVNode = toVNode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = toVNode;
//# sourceMappingURL=tovnode.js.map

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(91);


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(92);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), __webpack_require__(33)(module)))

/***/ },
/* 92 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
    var result;
    var _Symbol = root.Symbol;

    if (typeof _Symbol === 'function') {
        if (_Symbol.observable) {
            result = _Symbol.observable;
        } else {
            result = _Symbol('observable');
            _Symbol.observable = result;
        }
    } else {
        result = '@@observable';
    }

    return result;
};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {const run = __webpack_require__(31)
const dom = __webpack_require__(30)
const xstream = __webpack_require__(1)
const stripIndent = __webpack_require__(32)
  global.packs = {run, dom, xstream, stripIndent}


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }
/******/ ]);
