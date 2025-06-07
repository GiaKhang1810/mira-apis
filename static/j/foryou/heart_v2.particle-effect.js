import {d as xc, g as em, R as Dp, e as um, r as lt, j as gl} from "/s/j/foryou/heart_v2.app.js";
import {ae as bp, f as Rp, O as Cp, P as qp, q as Bp, af as Oc, ag as Qp, ah as Yp, ai as Gp, aj as Vp, o as Xp, i as nm, K as Zp, ak as Kp, al as Qs, C as xp, am as Jp, U as Lp, V as ju, a as Wp, an as Fp} from "/s/j/foryou/heart_v2.three.module.js";
var Hc = {
    exports: {}
}
  , jl = {};
/**
 * @license React
 * react-reconciler-constants.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ys;
function Pp() {
    return Ys || (Ys = 1,
    jl.ConcurrentRoot = 1,
    jl.ContinuousEventPriority = 8,
    jl.DefaultEventPriority = 32,
    jl.DiscreteEventPriority = 2,
    jl.IdleEventPriority = 268435456,
    jl.LegacyRoot = 0,
    jl.NoEventPriority = 0),
    jl
}
var Gs;
function Ip() {
    return Gs || (Gs = 1,
    Hc.exports = Pp()),
    Hc.exports
}
var gu = Ip()
  , Uc = {
    exports: {}
}
  , _c = {}
  , rc = {
    exports: {}
}
  , Ac = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vs;
function $p() {
    if (Vs)
        return Ac;
    Vs = 1;
    var f = xc();
    function c(O, D) {
        return O === D && (O !== 0 || 1 / O === 1 / D) || O !== O && D !== D
    }
    var s = typeof Object.is == "function" ? Object.is : c
      , p = f.useState
      , m = f.useEffect
      , h = f.useLayoutEffect
      , T = f.useDebugValue;
    function A(O, D) {
        var b = D()
          , W = p({
            inst: {
                value: b,
                getSnapshot: D
            }
        })
          , x = W[0].inst
          , V = W[1];
        return h(function() {
            x.value = b,
            x.getSnapshot = D,
            z(x) && V({
                inst: x
            })
        }, [O, b, D]),
        m(function() {
            return z(x) && V({
                inst: x
            }),
            O(function() {
                z(x) && V({
                    inst: x
                })
            })
        }, [O]),
        T(b),
        b
    }
    function z(O) {
        var D = O.getSnapshot;
        O = O.value;
        try {
            var b = D();
            return !s(O, b)
        } catch {
            return !0
        }
    }
    function g(O, D) {
        return D()
    }
    var U = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : A;
    return Ac.useSyncExternalStore = f.useSyncExternalStore !== void 0 ? f.useSyncExternalStore : U,
    Ac
}
var Xs;
function wp() {
    return Xs || (Xs = 1,
    rc.exports = $p()),
    rc.exports
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zs;
function kp() {
    if (Zs)
        return _c;
    Zs = 1;
    var f = xc()
      , c = wp();
    function s(g, U) {
        return g === U && (g !== 0 || 1 / g === 1 / U) || g !== g && U !== U
    }
    var p = typeof Object.is == "function" ? Object.is : s
      , m = c.useSyncExternalStore
      , h = f.useRef
      , T = f.useEffect
      , A = f.useMemo
      , z = f.useDebugValue;
    return _c.useSyncExternalStoreWithSelector = function(g, U, O, D, b) {
        var W = h(null);
        if (W.current === null) {
            var x = {
                hasValue: !1,
                value: null
            };
            W.current = x
        } else
            x = W.current;
        W = A(function() {
            function _(B) {
                if (!N) {
                    if (N = !0,
                    X = B,
                    B = D(B),
                    b !== void 0 && x.hasValue) {
                        var ct = x.value;
                        if (b(ct, B))
                            return Y = ct
                    }
                    return Y = B
                }
                if (ct = Y,
                p(X, B))
                    return ct;
                var pt = D(B);
                return b !== void 0 && b(ct, pt) ? (X = B,
                ct) : (X = B,
                Y = pt)
            }
            var N = !1, X, Y, F = O === void 0 ? null : O;
            return [function() {
                return _(U())
            }
            , F === null ? void 0 : function() {
                return _(F())
            }
            ]
        }, [U, O, D, b]);
        var V = m(g, W[0], W[1]);
        return T(function() {
            x.hasValue = !0,
            x.value = V
        }, [V]),
        z(V),
        V
    }
    ,
    _c
}
var Ks;
function t0() {
    return Ks || (Ks = 1,
    Uc.exports = kp()),
    Uc.exports
}
var l0 = t0();
const a0 = em(l0)
  , xs = f => {
    let c;
    const s = new Set
      , p = (g, U) => {
        const O = typeof g == "function" ? g(c) : g;
        if (!Object.is(O, c)) {
            const D = c;
            c = U ?? (typeof O != "object" || O === null) ? O : Object.assign({}, c, O),
            s.forEach(b => b(c, D))
        }
    }
      , m = () => c
      , A = {
        setState: p,
        getState: m,
        getInitialState: () => z,
        subscribe: g => (s.add(g),
        () => s.delete(g))
    }
      , z = c = f(p, m, A);
    return A
}
  , e0 = f => f ? xs(f) : xs
  , {useSyncExternalStoreWithSelector: u0} = a0
  , n0 = f => f;
function c0(f, c=n0, s) {
    const p = u0(f.subscribe, f.getState, f.getInitialState, c, s);
    return Dp.useDebugValue(p),
    p
}
const Js = (f, c) => {
    const s = e0(f)
      , p = (m, h=c) => c0(s, m, h);
    return Object.assign(p, s),
    p
}
  , f0 = (f, c) => f ? Js(f, c) : Js;
var jc = {
    exports: {}
}
  , gc = {
    exports: {}
};
/**
 * @license React
 * react-reconciler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ls;
function i0() {
    return Ls || (Ls = 1,
    function(f) {
        f.exports = function(c) {
            function s(t, l, a, e) {
                return new Fm(t,l,a,e)
            }
            function p() {}
            function m(t) {
                var l = "https://react.dev/errors/" + t;
                if (1 < arguments.length) {
                    l += "?args[]=" + encodeURIComponent(arguments[1]);
                    for (var a = 2; a < arguments.length; a++)
                        l += "&args[]=" + encodeURIComponent(arguments[a])
                }
                return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
            }
            function h(t) {
                return t === null || typeof t != "object" ? null : (t = es && t[es] || t["@@iterator"],
                typeof t == "function" ? t : null)
            }
            function T(t) {
                if (t == null)
                    return null;
                if (typeof t == "function")
                    return t.$$typeof === tv ? null : t.displayName || t.name || null;
                if (typeof t == "string")
                    return t;
                switch (t) {
                case Da:
                    return "Fragment";
                case ga:
                    return "Portal";
                case xn:
                    return "Profiler";
                case ts:
                    return "StrictMode";
                case Ln:
                    return "Suspense";
                case Wn:
                    return "SuspenseList"
                }
                if (typeof t == "object")
                    switch (t.$$typeof) {
                    case Kl:
                        return (t.displayName || "Context") + ".Provider";
                    case ls:
                        return (t._context.displayName || "Context") + ".Consumer";
                    case Jn:
                        var l = t.render;
                        return t = t.displayName,
                        t || (t = l.displayName || l.name || "",
                        t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"),
                        t;
                    case Fn:
                        return l = t.displayName || null,
                        l !== null ? l : T(t.type) || "Memo";
                    case xl:
                        l = t._payload,
                        t = t._init;
                        try {
                            return T(t(l))
                        } catch {}
                    }
                return null
            }
            function A(t) {
                if (Pn === void 0)
                    try {
                        throw Error()
                    } catch (a) {
                        var l = a.stack.trim().match(/\n( *(at )?)/);
                        Pn = l && l[1] || "",
                        us = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : ""
                    }
                return `
` + Pn + t + us
            }
            function z(t, l) {
                if (!t || In)
                    return "";
                In = !0;
                var a = Error.prepareStackTrace;
                Error.prepareStackTrace = void 0;
                try {
                    var e = {
                        DetermineComponentFrameRoot: function() {
                            try {
                                if (l) {
                                    var r = function() {
                                        throw Error()
                                    };
                                    if (Object.defineProperty(r.prototype, "props", {
                                        set: function() {
                                            throw Error()
                                        }
                                    }),
                                    typeof Reflect == "object" && Reflect.construct) {
                                        try {
                                            Reflect.construct(r, [])
                                        } catch (Q) {
                                            var j = Q
                                        }
                                        Reflect.construct(t, [], r)
                                    } else {
                                        try {
                                            r.call()
                                        } catch (Q) {
                                            j = Q
                                        }
                                        t.call(r.prototype)
                                    }
                                } else {
                                    try {
                                        throw Error()
                                    } catch (Q) {
                                        j = Q
                                    }
                                    (r = t()) && typeof r.catch == "function" && r.catch(function() {})
                                }
                            } catch (Q) {
                                if (Q && j && typeof Q.stack == "string")
                                    return [Q.stack, j.stack]
                            }
                            return [null, null]
                        }
                    };
                    e.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
                    var u = Object.getOwnPropertyDescriptor(e.DetermineComponentFrameRoot, "name");
                    u && u.configurable && Object.defineProperty(e.DetermineComponentFrameRoot, "name", {
                        value: "DetermineComponentFrameRoot"
                    });
                    var n = e.DetermineComponentFrameRoot()
                      , i = n[0]
                      , v = n[1];
                    if (i && v) {
                        var d = i.split(`
`)
                          , E = v.split(`
`);
                        for (u = e = 0; e < d.length && !d[e].includes("DetermineComponentFrameRoot"); )
                            e++;
                        for (; u < E.length && !E[u].includes("DetermineComponentFrameRoot"); )
                            u++;
                        if (e === d.length || u === E.length)
                            for (e = d.length - 1,
                            u = E.length - 1; 1 <= e && 0 <= u && d[e] !== E[u]; )
                                u--;
                        for (; 1 <= e && 0 <= u; e--,
                        u--)
                            if (d[e] !== E[u]) {
                                if (e !== 1 || u !== 1)
                                    do
                                        if (e--,
                                        u--,
                                        0 > u || d[e] !== E[u]) {
                                            var H = `
` + d[e].replace(" at new ", " at ");
                                            return t.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", t.displayName)),
                                            H
                                        }
                                    while (1 <= e && 0 <= u);
                                break
                            }
                    }
                } finally {
                    In = !1,
                    Error.prepareStackTrace = a
                }
                return (a = t ? t.displayName || t.name : "") ? A(a) : ""
            }
            function g(t) {
                switch (t.tag) {
                case 26:
                case 27:
                case 5:
                    return A(t.type);
                case 16:
                    return A("Lazy");
                case 13:
                    return A("Suspense");
                case 19:
                    return A("SuspenseList");
                case 0:
                case 15:
                    return t = z(t.type, !1),
                    t;
                case 11:
                    return t = z(t.type.render, !1),
                    t;
                case 1:
                    return t = z(t.type, !0),
                    t;
                default:
                    return ""
                }
            }
            function U(t) {
                try {
                    var l = "";
                    do
                        l += g(t),
                        t = t.return;
                    while (t);
                    return l
                } catch (a) {
                    return `
Error generating stack: ` + a.message + `
` + a.stack
                }
            }
            function O(t) {
                var l = t
                  , a = t;
                if (t.alternate)
                    for (; l.return; )
                        l = l.return;
                else {
                    t = l;
                    do
                        l = t,
                        (l.flags & 4098) !== 0 && (a = l.return),
                        t = l.return;
                    while (t)
                }
                return l.tag === 3 ? a : null
            }
            function D(t) {
                if (O(t) !== t)
                    throw Error(m(188))
            }
            function b(t) {
                var l = t.alternate;
                if (!l) {
                    if (l = O(t),
                    l === null)
                        throw Error(m(188));
                    return l !== t ? null : t
                }
                for (var a = t, e = l; ; ) {
                    var u = a.return;
                    if (u === null)
                        break;
                    var n = u.alternate;
                    if (n === null) {
                        if (e = u.return,
                        e !== null) {
                            a = e;
                            continue
                        }
                        break
                    }
                    if (u.child === n.child) {
                        for (n = u.child; n; ) {
                            if (n === a)
                                return D(u),
                                t;
                            if (n === e)
                                return D(u),
                                l;
                            n = n.sibling
                        }
                        throw Error(m(188))
                    }
                    if (a.return !== e.return)
                        a = u,
                        e = n;
                    else {
                        for (var i = !1, v = u.child; v; ) {
                            if (v === a) {
                                i = !0,
                                a = u,
                                e = n;
                                break
                            }
                            if (v === e) {
                                i = !0,
                                e = u,
                                a = n;
                                break
                            }
                            v = v.sibling
                        }
                        if (!i) {
                            for (v = n.child; v; ) {
                                if (v === a) {
                                    i = !0,
                                    a = n,
                                    e = u;
                                    break
                                }
                                if (v === e) {
                                    i = !0,
                                    e = n,
                                    a = u;
                                    break
                                }
                                v = v.sibling
                            }
                            if (!i)
                                throw Error(m(189))
                        }
                    }
                    if (a.alternate !== e)
                        throw Error(m(190))
                }
                if (a.tag !== 3)
                    throw Error(m(188));
                return a.stateNode.current === a ? t : l
            }
            function W(t) {
                var l = t.tag;
                if (l === 5 || l === 26 || l === 27 || l === 6)
                    return t;
                for (t = t.child; t !== null; ) {
                    if (l = W(t),
                    l !== null)
                        return l;
                    t = t.sibling
                }
                return null
            }
            function x(t) {
                var l = t.tag;
                if (l === 5 || l === 26 || l === 27 || l === 6)
                    return t;
                for (t = t.child; t !== null; ) {
                    if (t.tag !== 4 && (l = x(t),
                    l !== null))
                        return l;
                    t = t.sibling
                }
                return null
            }
            function V(t) {
                return {
                    current: t
                }
            }
            function _(t) {
                0 > Ra || (t.current = ac[Ra],
                ac[Ra] = null,
                Ra--)
            }
            function N(t, l) {
                Ra++,
                ac[Ra] = t.current,
                t.current = l
            }
            function X(t) {
                return t >>>= 0,
                t === 0 ? 32 : 31 - (yp(t) / Sp | 0) | 0
            }
            function Y(t) {
                var l = t & 42;
                if (l !== 0)
                    return l;
                switch (t & -t) {
                case 1:
                    return 1;
                case 2:
                    return 2;
                case 4:
                    return 4;
                case 8:
                    return 8;
                case 16:
                    return 16;
                case 32:
                    return 32;
                case 64:
                    return 64;
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                    return t & 4194176;
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    return t & 62914560;
                case 67108864:
                    return 67108864;
                case 134217728:
                    return 134217728;
                case 268435456:
                    return 268435456;
                case 536870912:
                    return 536870912;
                case 1073741824:
                    return 0;
                default:
                    return t
                }
            }
            function F(t, l) {
                var a = t.pendingLanes;
                if (a === 0)
                    return 0;
                var e = 0
                  , u = t.suspendedLanes
                  , n = t.pingedLanes
                  , i = t.warmLanes;
                t = t.finishedLanes !== 0;
                var v = a & 134217727;
                return v !== 0 ? (a = v & ~u,
                a !== 0 ? e = Y(a) : (n &= v,
                n !== 0 ? e = Y(n) : t || (i = v & ~i,
                i !== 0 && (e = Y(i))))) : (v = a & ~u,
                v !== 0 ? e = Y(v) : n !== 0 ? e = Y(n) : t || (i = a & ~i,
                i !== 0 && (e = Y(i)))),
                e === 0 ? 0 : l !== 0 && l !== e && (l & u) === 0 && (u = e & -e,
                i = l & -l,
                u >= i || u === 32 && (i & 4194176) !== 0) ? l : e
            }
            function B(t, l) {
                return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0
            }
            function ct(t, l) {
                switch (t) {
                case 1:
                case 2:
                case 4:
                case 8:
                    return l + 250;
                case 16:
                case 32:
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                    return l + 5e3;
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    return -1;
                case 67108864:
                case 134217728:
                case 268435456:
                case 536870912:
                case 1073741824:
                    return -1;
                default:
                    return -1
                }
            }
            function pt() {
                var t = fu;
                return fu <<= 1,
                (fu & 4194176) === 0 && (fu = 128),
                t
            }
            function at() {
                var t = iu;
                return iu <<= 1,
                (iu & 62914560) === 0 && (iu = 4194304),
                t
            }
            function st(t) {
                for (var l = [], a = 0; 31 > a; a++)
                    l.push(t);
                return l
            }
            function et(t, l) {
                t.pendingLanes |= l,
                l !== 268435456 && (t.suspendedLanes = 0,
                t.pingedLanes = 0,
                t.warmLanes = 0)
            }
            function Ma(t, l, a, e, u, n) {
                var i = t.pendingLanes;
                t.pendingLanes = a,
                t.suspendedLanes = 0,
                t.pingedLanes = 0,
                t.warmLanes = 0,
                t.expiredLanes &= a,
                t.entangledLanes &= a,
                t.errorRecoveryDisabledLanes &= a,
                t.shellSuspendCounter = 0;
                var v = t.entanglements
                  , d = t.expirationTimes
                  , E = t.hiddenUpdates;
                for (a = i & ~a; 0 < a; ) {
                    var H = 31 - Jt(a)
                      , r = 1 << H;
                    v[H] = 0,
                    d[H] = -1;
                    var j = E[H];
                    if (j !== null)
                        for (E[H] = null,
                        H = 0; H < j.length; H++) {
                            var Q = j[H];
                            Q !== null && (Q.lane &= -536870913)
                        }
                    a &= ~r
                }
                e !== 0 && J(t, e, 0),
                n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l))
            }
            function J(t, l, a) {
                t.pendingLanes |= l,
                t.suspendedLanes &= ~l;
                var e = 31 - Jt(l);
                t.entangledLanes |= l,
                t.entanglements[e] = t.entanglements[e] | 1073741824 | a & 4194218
            }
            function ht(t, l) {
                var a = t.entangledLanes |= l;
                for (t = t.entanglements; a; ) {
                    var e = 31 - Jt(a)
                      , u = 1 << e;
                    u & l | t[e] & l && (t[e] |= l),
                    a &= ~u
                }
            }
            function ul(t) {
                return t &= -t,
                2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
            }
            function Ce(t) {
                if (Lt && typeof Lt.onCommitFiberRoot == "function")
                    try {
                        Lt.onCommitFiberRoot(Ne, t, void 0, (t.current.flags & 128) === 128)
                    } catch {}
            }
            function nl(t) {
                if (typeof Tp == "function" && Mp(t),
                Lt && typeof Lt.setStrictMode == "function")
                    try {
                        Lt.setStrictMode(Ne, t)
                    } catch {}
            }
            function ta(t, l) {
                return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l
            }
            function Rt(t, l) {
                if (typeof t == "object" && t !== null) {
                    var a = gs.get(t);
                    return a !== void 0 ? a : (l = {
                        value: t,
                        source: l,
                        stack: U(l)
                    },
                    gs.set(t, l),
                    l)
                }
                return {
                    value: t,
                    source: l,
                    stack: U(l)
                }
            }
            function ml(t, l) {
                qa[Ba++] = vu,
                qa[Ba++] = mu,
                mu = t,
                vu = l
            }
            function mt(t, l, a) {
                wt[kt++] = Ol,
                wt[kt++] = Hl,
                wt[kt++] = ma,
                ma = t;
                var e = Ol;
                t = Hl;
                var u = 32 - Jt(e) - 1;
                e &= ~(1 << u),
                a += 1;
                var n = 32 - Jt(l) + u;
                if (30 < n) {
                    var i = u - u % 5;
                    n = (e & (1 << i) - 1).toString(32),
                    e >>= i,
                    u -= i,
                    Ol = 1 << 32 - Jt(l) + u | a << u | e,
                    Hl = n + t
                } else
                    Ol = 1 << n | a << u | e,
                    Hl = t
            }
            function ot(t) {
                t.return !== null && (ml(t, 1),
                mt(t, 1, 0))
            }
            function Dl(t) {
                for (; t === mu; )
                    mu = qa[--Ba],
                    qa[Ba] = null,
                    vu = qa[--Ba],
                    qa[Ba] = null;
                for (; t === ma; )
                    ma = wt[--kt],
                    wt[kt] = null,
                    Hl = wt[--kt],
                    wt[kt] = null,
                    Ol = wt[--kt],
                    wt[kt] = null
            }
            function Mt(t, l) {
                N(Ll, l),
                N(Te, t),
                N(At, null),
                t = ev(l),
                _(At),
                N(At, t)
            }
            function bl() {
                _(At),
                _(Te),
                _(Ll)
            }
            function Oa(t) {
                t.memoizedState !== null && N(pu, t);
                var l = At.current
                  , a = uv(l, t.type);
                l !== a && (N(Te, t),
                N(At, a))
            }
            function qe(t) {
                Te.current === t && (_(At),
                _(Te)),
                pu.current === t && (_(pu),
                Ml ? sa._currentValue = ba : sa._currentValue2 = ba)
            }
            function la(t) {
                var l = Error(m(418, ""));
                throw ee(Rt(l, t)),
                nc
            }
            function Fc(t, l) {
                if (!It)
                    throw Error(m(175));
                $v(t.stateNode, t.type, t.memoizedProps, l, t) || la(t)
            }
            function Pc(t) {
                for (qt = t.return; qt; )
                    switch (qt.tag) {
                    case 3:
                    case 27:
                        pl = !0;
                        return;
                    case 5:
                    case 13:
                        pl = !1;
                        return;
                    default:
                        qt = qt.return
                    }
            }
            function le(t) {
                if (!It || t !== qt)
                    return !1;
                if (!P)
                    return Pc(t),
                    P = !0,
                    !1;
                var l = !1;
                if (Dt ? t.tag !== 3 && t.tag !== 27 && (t.tag !== 5 || zs(t.type) && !cu(t.type, t.memoizedProps)) && (l = !0) : t.tag !== 3 && (t.tag !== 5 || zs(t.type) && !cu(t.type, t.memoizedProps)) && (l = !0),
                l && bt && la(t),
                Pc(t),
                t.tag === 13) {
                    if (!It)
                        throw Error(m(316));
                    if (t = t.memoizedState,
                    t = t !== null ? t.dehydrated : null,
                    !t)
                        throw Error(m(317));
                    bt = tp(t)
                } else
                    bt = qt ? hs(t.stateNode) : null;
                return !0
            }
            function ae() {
                It && (bt = qt = null,
                P = !1)
            }
            function ee(t) {
                il === null ? il = [t] : il.push(t)
            }
            function Be() {
                for (var t = Qa, l = cc = Qa = 0; l < t; ) {
                    var a = tl[l];
                    tl[l++] = null;
                    var e = tl[l];
                    tl[l++] = null;
                    var u = tl[l];
                    tl[l++] = null;
                    var n = tl[l];
                    if (tl[l++] = null,
                    e !== null && u !== null) {
                        var i = e.pending;
                        i === null ? u.next = u : (u.next = i.next,
                        i.next = u),
                        e.pending = u
                    }
                    n !== 0 && Ic(a, u, n)
                }
            }
            function Qe(t, l, a, e) {
                tl[Qa++] = t,
                tl[Qa++] = l,
                tl[Qa++] = a,
                tl[Qa++] = e,
                cc |= e,
                t.lanes |= e,
                t = t.alternate,
                t !== null && (t.lanes |= e)
            }
            function Yu(t, l, a, e) {
                return Qe(t, l, a, e),
                Ye(t)
            }
            function Rl(t, l) {
                return Qe(t, null, null, l),
                Ye(t)
            }
            function Ic(t, l, a) {
                t.lanes |= a;
                var e = t.alternate;
                e !== null && (e.lanes |= a);
                for (var u = !1, n = t.return; n !== null; )
                    n.childLanes |= a,
                    e = n.alternate,
                    e !== null && (e.childLanes |= a),
                    n.tag === 22 && (t = n.stateNode,
                    t === null || t._visibility & 1 || (u = !0)),
                    t = n,
                    n = n.return;
                u && l !== null && t.tag === 3 && (n = t.stateNode,
                u = 31 - Jt(a),
                n = n.hiddenUpdates,
                t = n[u],
                t === null ? n[u] = [l] : t.push(l),
                l.lane = a | 536870912)
            }
            function Ye(t) {
                if (50 < ge)
                    throw ge = 0,
                    Mc = null,
                    Error(m(185));
                for (var l = t.return; l !== null; )
                    t = l,
                    l = t.return;
                return t.tag === 3 ? t.stateNode : null
            }
            function vl(t) {
                t !== Ya && t.next === null && (Ya === null ? ou = Ya = t : Ya = Ya.next = t),
                du = !0,
                fc || (fc = !0,
                Um(Hm))
            }
            function Ha(t, l) {
                if (!ic && du) {
                    ic = !0;
                    do
                        for (var a = !1, e = ou; e !== null; ) {
                            if (t !== 0) {
                                var u = e.pendingLanes;
                                if (u === 0)
                                    var n = 0;
                                else {
                                    var i = e.suspendedLanes
                                      , v = e.pingedLanes;
                                    n = (1 << 31 - Jt(42 | t) + 1) - 1,
                                    n &= u & ~(i & ~v),
                                    n = n & 201326677 ? n & 201326677 | 1 : n ? n | 2 : 0
                                }
                                n !== 0 && (a = !0,
                                kc(e, n))
                            } else
                                n = L,
                                n = F(e, e === ut ? n : 0),
                                (n & 3) === 0 || B(e, n) || (a = !0,
                                kc(e, n));
                            e = e.next
                        }
                    while (a);
                    ic = !1
                }
            }
            function Hm() {
                du = fc = !1;
                var t = 0;
                Ga !== 0 && (pv() && (t = Ga),
                Ga = 0);
                for (var l = fl(), a = null, e = ou; e !== null; ) {
                    var u = e.next
                      , n = $c(e, l);
                    n === 0 ? (e.next = null,
                    a === null ? ou = u : a.next = u,
                    u === null && (Ya = a)) : (a = e,
                    (t !== 0 || (n & 3) !== 0) && (du = !0)),
                    e = u
                }
                Ha(t)
            }
            function $c(t, l) {
                for (var a = t.suspendedLanes, e = t.pingedLanes, u = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
                    var i = 31 - Jt(n)
                      , v = 1 << i
                      , d = u[i];
                    d === -1 ? ((v & a) === 0 || (v & e) !== 0) && (u[i] = ct(v, l)) : d <= l && (t.expiredLanes |= v),
                    n &= ~v
                }
                if (l = ut,
                a = L,
                a = F(t, t === l ? a : 0),
                e = t.callbackNode,
                a === 0 || t === l && nt === 2 || t.cancelPendingCommit !== null)
                    return e !== null && e !== null && ec(e),
                    t.callbackNode = null,
                    t.callbackPriority = 0;
                if ((a & 3) === 0 || B(t, a)) {
                    if (l = a & -a,
                    l === t.callbackPriority)
                        return l;
                    switch (e !== null && ec(e),
                    ul(a)) {
                    case 2:
                    case 8:
                        a = zp;
                        break;
                    case 32:
                        a = uc;
                        break;
                    case 268435456:
                        a = Np;
                        break;
                    default:
                        a = uc
                    }
                    return e = wc.bind(null, t),
                    a = su(a, e),
                    t.callbackPriority = l,
                    t.callbackNode = a,
                    l
                }
                return e !== null && e !== null && ec(e),
                t.callbackPriority = 2,
                t.callbackNode = null,
                2
            }
            function wc(t, l) {
                var a = t.callbackNode;
                if (ca() && t.callbackNode !== a)
                    return null;
                var e = L;
                return e = F(t, t === ut ? e : 0),
                e === 0 ? null : (Ri(t, e, l),
                $c(t, fl()),
                t.callbackNode != null && t.callbackNode === a ? wc.bind(null, t) : null)
            }
            function kc(t, l) {
                if (ca())
                    return null;
                Ri(t, l, !0)
            }
            function Um(t) {
                Ev ? zv(function() {
                    (tt & 6) !== 0 ? su(js, t) : t()
                }) : su(js, t)
            }
            function Gu() {
                return Ga === 0 && (Ga = pt()),
                Ga
            }
            function _m(t, l) {
                if (Me === null) {
                    var a = Me = [];
                    sc = 0,
                    Va = Gu(),
                    Xa = {
                        status: "pending",
                        value: void 0,
                        then: function(e) {
                            a.push(e)
                        }
                    }
                }
                return sc++,
                l.then(tf, tf),
                l
            }
            function tf() {
                if (--sc === 0 && Me !== null) {
                    Xa !== null && (Xa.status = "fulfilled");
                    var t = Me;
                    Me = null,
                    Va = 0,
                    Xa = null;
                    for (var l = 0; l < t.length; l++)
                        (0,
                        t[l])()
                }
            }
            function rm(t, l) {
                var a = []
                  , e = {
                    status: "pending",
                    value: null,
                    reason: null,
                    then: function(u) {
                        a.push(u)
                    }
                };
                return t.then(function() {
                    e.status = "fulfilled",
                    e.value = l;
                    for (var u = 0; u < a.length; u++)
                        (0,
                        a[u])(l)
                }, function(u) {
                    for (e.status = "rejected",
                    e.reason = u,
                    u = 0; u < a.length; u++)
                        (0,
                        a[u])(void 0)
                }),
                e
            }
            function Vu(t) {
                t.updateQueue = {
                    baseState: t.memoizedState,
                    firstBaseUpdate: null,
                    lastBaseUpdate: null,
                    shared: {
                        pending: null,
                        lanes: 0,
                        hiddenCallbacks: null
                    },
                    callbacks: null
                }
            }
            function Xu(t, l) {
                t = t.updateQueue,
                l.updateQueue === t && (l.updateQueue = {
                    baseState: t.baseState,
                    firstBaseUpdate: t.firstBaseUpdate,
                    lastBaseUpdate: t.lastBaseUpdate,
                    shared: t.shared,
                    callbacks: null
                })
            }
            function Cl(t) {
                return {
                    lane: t,
                    tag: 0,
                    payload: null,
                    callback: null,
                    next: null
                }
            }
            function ql(t, l, a) {
                var e = t.updateQueue;
                if (e === null)
                    return null;
                if (e = e.shared,
                (tt & 2) !== 0) {
                    var u = e.pending;
                    return u === null ? l.next = l : (l.next = u.next,
                    u.next = l),
                    e.pending = l,
                    l = Ye(t),
                    Ic(t, null, a),
                    l
                }
                return Qe(t, e, l, a),
                Ye(t)
            }
            function ue(t, l, a) {
                if (l = l.updateQueue,
                l !== null && (l = l.shared,
                (a & 4194176) !== 0)) {
                    var e = l.lanes;
                    e &= t.pendingLanes,
                    a |= e,
                    l.lanes = a,
                    ht(t, a)
                }
            }
            function Zu(t, l) {
                var a = t.updateQueue
                  , e = t.alternate;
                if (e !== null && (e = e.updateQueue,
                a === e)) {
                    var u = null
                      , n = null;
                    if (a = a.firstBaseUpdate,
                    a !== null) {
                        do {
                            var i = {
                                lane: a.lane,
                                tag: a.tag,
                                payload: a.payload,
                                callback: null,
                                next: null
                            };
                            n === null ? u = n = i : n = n.next = i,
                            a = a.next
                        } while (a !== null);
                        n === null ? u = n = l : n = n.next = l
                    } else
                        u = n = l;
                    a = {
                        baseState: e.baseState,
                        firstBaseUpdate: u,
                        lastBaseUpdate: n,
                        shared: e.shared,
                        callbacks: e.callbacks
                    },
                    t.updateQueue = a;
                    return
                }
                t = a.lastBaseUpdate,
                t === null ? a.firstBaseUpdate = l : t.next = l,
                a.lastBaseUpdate = l
            }
            function ne() {
                if (mc) {
                    var t = Xa;
                    if (t !== null)
                        throw t
                }
            }
            function ce(t, l, a, e) {
                mc = !1;
                var u = t.updateQueue;
                Wl = !1;
                var n = u.firstBaseUpdate
                  , i = u.lastBaseUpdate
                  , v = u.shared.pending;
                if (v !== null) {
                    u.shared.pending = null;
                    var d = v
                      , E = d.next;
                    d.next = null,
                    i === null ? n = E : i.next = E,
                    i = d;
                    var H = t.alternate;
                    H !== null && (H = H.updateQueue,
                    v = H.lastBaseUpdate,
                    v !== i && (v === null ? H.firstBaseUpdate = E : v.next = E,
                    H.lastBaseUpdate = d))
                }
                if (n !== null) {
                    var r = u.baseState;
                    i = 0,
                    H = E = d = null,
                    v = n;
                    do {
                        var j = v.lane & -536870913
                          , Q = j !== v.lane;
                        if (Q ? (L & j) === j : (e & j) === j) {
                            j !== 0 && j === Va && (mc = !0),
                            H !== null && (H = H.next = {
                                lane: 0,
                                tag: v.tag,
                                payload: v.payload,
                                callback: null,
                                next: null
                            });
                            t: {
                                var el = t
                                  , De = v;
                                j = l;
                                var za = a;
                                switch (De.tag) {
                                case 1:
                                    if (el = De.payload,
                                    typeof el == "function") {
                                        r = el.call(za, r, j);
                                        break t
                                    }
                                    r = el;
                                    break t;
                                case 3:
                                    el.flags = el.flags & -65537 | 128;
                                case 0:
                                    if (el = De.payload,
                                    j = typeof el == "function" ? el.call(za, r, j) : el,
                                    j == null)
                                        break t;
                                    r = Kn({}, r, j);
                                    break t;
                                case 2:
                                    Wl = !0
                                }
                            }
                            j = v.callback,
                            j !== null && (t.flags |= 64,
                            Q && (t.flags |= 8192),
                            Q = u.callbacks,
                            Q === null ? u.callbacks = [j] : Q.push(j))
                        } else
                            Q = {
                                lane: j,
                                tag: v.tag,
                                payload: v.payload,
                                callback: v.callback,
                                next: null
                            },
                            H === null ? (E = H = Q,
                            d = r) : H = H.next = Q,
                            i |= j;
                        if (v = v.next,
                        v === null) {
                            if (v = u.shared.pending,
                            v === null)
                                break;
                            Q = v,
                            v = Q.next,
                            Q.next = null,
                            u.lastBaseUpdate = Q,
                            u.shared.pending = null
                        }
                    } while (!0);
                    H === null && (d = r),
                    u.baseState = d,
                    u.firstBaseUpdate = E,
                    u.lastBaseUpdate = H,
                    n === null && (u.shared.lanes = 0),
                    Il |= i,
                    t.lanes = i,
                    t.memoizedState = r
                }
            }
            function lf(t, l) {
                if (typeof t != "function")
                    throw Error(m(191, t));
                t.call(l)
            }
            function af(t, l) {
                var a = t.callbacks;
                if (a !== null)
                    for (t.callbacks = null,
                    t = 0; t < a.length; t++)
                        lf(a[t], l)
            }
            function Ge(t, l) {
                if (Wt(t, l))
                    return !0;
                if (typeof t != "object" || t === null || typeof l != "object" || l === null)
                    return !1;
                var a = Object.keys(t)
                  , e = Object.keys(l);
                if (a.length !== e.length)
                    return !1;
                for (e = 0; e < a.length; e++) {
                    var u = a[e];
                    if (!Op.call(l, u) || !Wt(t[u], l[u]))
                        return !1
                }
                return !0
            }
            function ef(t) {
                return t = t.status,
                t === "fulfilled" || t === "rejected"
            }
            function Ve() {}
            function uf(t, l, a) {
                switch (a = t[a],
                a === void 0 ? t.push(l) : a !== l && (l.then(Ve, Ve),
                l = a),
                l.status) {
                case "fulfilled":
                    return l.value;
                case "rejected":
                    throw t = l.reason,
                    t === Oe ? Error(m(483)) : t;
                default:
                    if (typeof l.status == "string")
                        l.then(Ve, Ve);
                    else {
                        if (t = ut,
                        t !== null && 100 < t.shellSuspendCounter)
                            throw Error(m(482));
                        t = l,
                        t.status = "pending",
                        t.then(function(e) {
                            if (l.status === "pending") {
                                var u = l;
                                u.status = "fulfilled",
                                u.value = e
                            }
                        }, function(e) {
                            if (l.status === "pending") {
                                var u = l;
                                u.status = "rejected",
                                u.reason = e
                            }
                        })
                    }
                    switch (l.status) {
                    case "fulfilled":
                        return l.value;
                    case "rejected":
                        throw t = l.reason,
                        t === Oe ? Error(m(483)) : t
                    }
                    throw Za = l,
                    Oe
                }
            }
            function nf() {
                if (Za === null)
                    throw Error(m(459));
                var t = Za;
                return Za = null,
                t
            }
            function Xe(t) {
                var l = He;
                return He += 1,
                Ka === null && (Ka = []),
                uf(Ka, t, l)
            }
            function fe(t, l) {
                l = l.props.ref,
                t.ref = l !== void 0 ? l : null
            }
            function Ze(t, l) {
                throw l.$$typeof === $m ? Error(m(525)) : (t = Object.prototype.toString.call(l),
                Error(m(31, t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t)))
            }
            function cf(t) {
                var l = t._init;
                return l(t._payload)
            }
            function ff(t) {
                function l(y, o) {
                    if (t) {
                        var S = y.deletions;
                        S === null ? (y.deletions = [o],
                        y.flags |= 16) : S.push(o)
                    }
                }
                function a(y, o) {
                    if (!t)
                        return null;
                    for (; o !== null; )
                        l(y, o),
                        o = o.sibling;
                    return null
                }
                function e(y) {
                    for (var o = new Map; y !== null; )
                        y.key !== null ? o.set(y.key, y) : o.set(y.index, y),
                        y = y.sibling;
                    return o
                }
                function u(y, o) {
                    return y = Zl(y, o),
                    y.index = 0,
                    y.sibling = null,
                    y
                }
                function n(y, o, S) {
                    return y.index = S,
                    t ? (S = y.alternate,
                    S !== null ? (S = S.index,
                    S < o ? (y.flags |= 33554434,
                    o) : S) : (y.flags |= 33554434,
                    o)) : (y.flags |= 1048576,
                    o)
                }
                function i(y) {
                    return t && y.alternate === null && (y.flags |= 33554434),
                    y
                }
                function v(y, o, S, M) {
                    return o === null || o.tag !== 6 ? (o = Vn(S, y.mode, M),
                    o.return = y,
                    o) : (o = u(o, S),
                    o.return = y,
                    o)
                }
                function d(y, o, S, M) {
                    var R = S.type;
                    return R === Da ? H(y, o, S.props.children, M, S.key) : o !== null && (o.elementType === R || typeof R == "object" && R !== null && R.$$typeof === xl && cf(R) === o.type) ? (o = u(o, S.props),
                    fe(o, S),
                    o.return = y,
                    o) : (o = eu(S.type, S.key, S.props, null, y.mode, M),
                    fe(o, S),
                    o.return = y,
                    o)
                }
                function E(y, o, S, M) {
                    return o === null || o.tag !== 4 || o.stateNode.containerInfo !== S.containerInfo || o.stateNode.implementation !== S.implementation ? (o = Xn(S, y.mode, M),
                    o.return = y,
                    o) : (o = u(o, S.children || []),
                    o.return = y,
                    o)
                }
                function H(y, o, S, M, R) {
                    return o === null || o.tag !== 7 ? (o = fa(S, y.mode, M, R),
                    o.return = y,
                    o) : (o = u(o, S),
                    o.return = y,
                    o)
                }
                function r(y, o, S) {
                    if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
                        return o = Vn("" + o, y.mode, S),
                        o.return = y,
                        o;
                    if (typeof o == "object" && o !== null) {
                        switch (o.$$typeof) {
                        case uu:
                            return S = eu(o.type, o.key, o.props, null, y.mode, S),
                            fe(S, o),
                            S.return = y,
                            S;
                        case ga:
                            return o = Xn(o, y.mode, S),
                            o.return = y,
                            o;
                        case xl:
                            var M = o._init;
                            return o = M(o._payload),
                            r(y, o, S)
                        }
                        if (nu(o) || h(o))
                            return o = fa(o, y.mode, S, null),
                            o.return = y,
                            o;
                        if (typeof o.then == "function")
                            return r(y, Xe(o), S);
                        if (o.$$typeof === Kl)
                            return r(y, $e(y, o), S);
                        Ze(y, o)
                    }
                    return null
                }
                function j(y, o, S, M) {
                    var R = o !== null ? o.key : null;
                    if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
                        return R !== null ? null : v(y, o, "" + S, M);
                    if (typeof S == "object" && S !== null) {
                        switch (S.$$typeof) {
                        case uu:
                            return S.key === R ? d(y, o, S, M) : null;
                        case ga:
                            return S.key === R ? E(y, o, S, M) : null;
                        case xl:
                            return R = S._init,
                            S = R(S._payload),
                            j(y, o, S, M)
                        }
                        if (nu(S) || h(S))
                            return R !== null ? null : H(y, o, S, M, null);
                        if (typeof S.then == "function")
                            return j(y, o, Xe(S), M);
                        if (S.$$typeof === Kl)
                            return j(y, o, $e(y, S), M);
                        Ze(y, S)
                    }
                    return null
                }
                function Q(y, o, S, M, R) {
                    if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
                        return y = y.get(S) || null,
                        v(o, y, "" + M, R);
                    if (typeof M == "object" && M !== null) {
                        switch (M.$$typeof) {
                        case uu:
                            return y = y.get(M.key === null ? S : M.key) || null,
                            d(o, y, M, R);
                        case ga:
                            return y = y.get(M.key === null ? S : M.key) || null,
                            E(o, y, M, R);
                        case xl:
                            var ft = M._init;
                            return M = ft(M._payload),
                            Q(y, o, S, M, R)
                        }
                        if (nu(M) || h(M))
                            return y = y.get(S) || null,
                            H(o, y, M, R, null);
                        if (typeof M.then == "function")
                            return Q(y, o, S, Xe(M), R);
                        if (M.$$typeof === Kl)
                            return Q(y, o, S, $e(o, M), R);
                        Ze(o, M)
                    }
                    return null
                }
                function el(y, o, S, M) {
                    for (var R = null, ft = null, C = o, I = o = 0, _t = null; C !== null && I < S.length; I++) {
                        C.index > I ? (_t = C,
                        C = null) : _t = C.sibling;
                        var $ = j(y, C, S[I], M);
                        if ($ === null) {
                            C === null && (C = _t);
                            break
                        }
                        t && C && $.alternate === null && l(y, C),
                        o = n($, o, I),
                        ft === null ? R = $ : ft.sibling = $,
                        ft = $,
                        C = _t
                    }
                    if (I === S.length)
                        return a(y, C),
                        P && ml(y, I),
                        R;
                    if (C === null) {
                        for (; I < S.length; I++)
                            C = r(y, S[I], M),
                            C !== null && (o = n(C, o, I),
                            ft === null ? R = C : ft.sibling = C,
                            ft = C);
                        return P && ml(y, I),
                        R
                    }
                    for (C = e(C); I < S.length; I++)
                        _t = Q(C, y, I, S[I], M),
                        _t !== null && (t && _t.alternate !== null && C.delete(_t.key === null ? I : _t.key),
                        o = n(_t, o, I),
                        ft === null ? R = _t : ft.sibling = _t,
                        ft = _t);
                    return t && C.forEach(function(wl) {
                        return l(y, wl)
                    }),
                    P && ml(y, I),
                    R
                }
                function De(y, o, S, M) {
                    if (S == null)
                        throw Error(m(151));
                    for (var R = null, ft = null, C = o, I = o = 0, _t = null, $ = S.next(); C !== null && !$.done; I++,
                    $ = S.next()) {
                        C.index > I ? (_t = C,
                        C = null) : _t = C.sibling;
                        var wl = j(y, C, $.value, M);
                        if (wl === null) {
                            C === null && (C = _t);
                            break
                        }
                        t && C && wl.alternate === null && l(y, C),
                        o = n(wl, o, I),
                        ft === null ? R = wl : ft.sibling = wl,
                        ft = wl,
                        C = _t
                    }
                    if ($.done)
                        return a(y, C),
                        P && ml(y, I),
                        R;
                    if (C === null) {
                        for (; !$.done; I++,
                        $ = S.next())
                            $ = r(y, $.value, M),
                            $ !== null && (o = n($, o, I),
                            ft === null ? R = $ : ft.sibling = $,
                            ft = $);
                        return P && ml(y, I),
                        R
                    }
                    for (C = e(C); !$.done; I++,
                    $ = S.next())
                        $ = Q(C, y, I, $.value, M),
                        $ !== null && (t && $.alternate !== null && C.delete($.key === null ? I : $.key),
                        o = n($, o, I),
                        ft === null ? R = $ : ft.sibling = $,
                        ft = $);
                    return t && C.forEach(function(gp) {
                        return l(y, gp)
                    }),
                    P && ml(y, I),
                    R
                }
                function za(y, o, S, M) {
                    if (typeof S == "object" && S !== null && S.type === Da && S.key === null && (S = S.props.children),
                    typeof S == "object" && S !== null) {
                        switch (S.$$typeof) {
                        case uu:
                            t: {
                                for (var R = S.key; o !== null; ) {
                                    if (o.key === R) {
                                        if (R = S.type,
                                        R === Da) {
                                            if (o.tag === 7) {
                                                a(y, o.sibling),
                                                M = u(o, S.props.children),
                                                M.return = y,
                                                y = M;
                                                break t
                                            }
                                        } else if (o.elementType === R || typeof R == "object" && R !== null && R.$$typeof === xl && cf(R) === o.type) {
                                            a(y, o.sibling),
                                            M = u(o, S.props),
                                            fe(M, S),
                                            M.return = y,
                                            y = M;
                                            break t
                                        }
                                        a(y, o);
                                        break
                                    } else
                                        l(y, o);
                                    o = o.sibling
                                }
                                S.type === Da ? (M = fa(S.props.children, y.mode, M, S.key),
                                M.return = y,
                                y = M) : (M = eu(S.type, S.key, S.props, null, y.mode, M),
                                fe(M, S),
                                M.return = y,
                                y = M)
                            }
                            return i(y);
                        case ga:
                            t: {
                                for (R = S.key; o !== null; ) {
                                    if (o.key === R)
                                        if (o.tag === 4 && o.stateNode.containerInfo === S.containerInfo && o.stateNode.implementation === S.implementation) {
                                            a(y, o.sibling),
                                            M = u(o, S.children || []),
                                            M.return = y,
                                            y = M;
                                            break t
                                        } else {
                                            a(y, o);
                                            break
                                        }
                                    else
                                        l(y, o);
                                    o = o.sibling
                                }
                                M = Xn(S, y.mode, M),
                                M.return = y,
                                y = M
                            }
                            return i(y);
                        case xl:
                            return R = S._init,
                            S = R(S._payload),
                            za(y, o, S, M)
                        }
                        if (nu(S))
                            return el(y, o, S, M);
                        if (h(S)) {
                            if (R = h(S),
                            typeof R != "function")
                                throw Error(m(150));
                            return S = R.call(S),
                            De(y, o, S, M)
                        }
                        if (typeof S.then == "function")
                            return za(y, o, Xe(S), M);
                        if (S.$$typeof === Kl)
                            return za(y, o, $e(y, S), M);
                        Ze(y, S)
                    }
                    return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S,
                    o !== null && o.tag === 6 ? (a(y, o.sibling),
                    M = u(o, S),
                    M.return = y,
                    y = M) : (a(y, o),
                    M = Vn(S, y.mode, M),
                    M.return = y,
                    y = M),
                    i(y)) : a(y, o)
                }
                return function(y, o, S, M) {
                    try {
                        He = 0;
                        var R = za(y, o, S, M);
                        return Ka = null,
                        R
                    } catch (C) {
                        if (C === Oe)
                            throw C;
                        var ft = s(29, C, null, y.mode);
                        return ft.lanes = M,
                        ft.return = y,
                        ft
                    } finally {}
                }
            }
            function sf(t, l) {
                t = Al,
                N(Su, t),
                N(xa, l),
                Al = t | l.baseLanes
            }
            function Ku() {
                N(Su, Al),
                N(xa, xa.current)
            }
            function xu() {
                Al = Su.current,
                _(xa),
                _(Su)
            }
            function Bl(t) {
                var l = t.alternate;
                N(Ot, Ot.current & 1),
                N(ll, t),
                ol === null && (l === null || xa.current !== null || l.memoizedState !== null) && (ol = t)
            }
            function mf(t) {
                if (t.tag === 22) {
                    if (N(Ot, Ot.current),
                    N(ll, t),
                    ol === null) {
                        var l = t.alternate;
                        l !== null && l.memoizedState !== null && (ol = t)
                    }
                } else
                    Ql()
            }
            function Ql() {
                N(Ot, Ot.current),
                N(ll, ll.current)
            }
            function Sl(t) {
                _(ll),
                ol === t && (ol = null),
                _(Ot)
            }
            function Ke(t) {
                for (var l = t; l !== null; ) {
                    if (l.tag === 13) {
                        var a = l.memoizedState;
                        if (a !== null && (a = a.dehydrated,
                        a === null || kn(a) || tc(a)))
                            return l
                    } else if (l.tag === 19 && l.memoizedProps.revealOrder !== void 0) {
                        if ((l.flags & 128) !== 0)
                            return l
                    } else if (l.child !== null) {
                        l.child.return = l,
                        l = l.child;
                        continue
                    }
                    if (l === t)
                        break;
                    for (; l.sibling === null; ) {
                        if (l.return === null || l.return === t)
                            return null;
                        l = l.return
                    }
                    l.sibling.return = l.return,
                    l = l.sibling
                }
                return null
            }
            function Et() {
                throw Error(m(321))
            }
            function Ju(t, l) {
                if (l === null)
                    return !1;
                for (var a = 0; a < l.length && a < t.length; a++)
                    if (!Wt(t[a], l[a]))
                        return !1;
                return !0
            }
            function Lu(t, l, a, e, u, n) {
                return Fl = n,
                G = l,
                l.memoizedState = null,
                l.updateQueue = null,
                l.lanes = 0,
                q.H = t === null || t.memoizedState === null ? oa : Pl,
                pa = !1,
                n = a(e, u),
                pa = !1,
                Ja && (n = pf(l, a, e, u)),
                vf(t),
                n
            }
            function vf(t) {
                q.H = dl;
                var l = k !== null && k.next !== null;
                if (Fl = 0,
                Nt = k = G = null,
                hu = !1,
                Ue = 0,
                La = null,
                l)
                    throw Error(m(300));
                t === null || Ht || (t = t.dependencies,
                t !== null && Ie(t) && (Ht = !0))
            }
            function pf(t, l, a, e) {
                G = t;
                var u = 0;
                do {
                    if (Ja && (La = null),
                    Ue = 0,
                    Ja = !1,
                    25 <= u)
                        throw Error(m(301));
                    if (u += 1,
                    Nt = k = null,
                    t.updateQueue != null) {
                        var n = t.updateQueue;
                        n.lastEffect = null,
                        n.events = null,
                        n.stores = null,
                        n.memoCache != null && (n.memoCache.index = 0)
                    }
                    q.H = da,
                    n = l(a, e)
                } while (Ja);
                return n
            }
            function Am() {
                var t = q.H
                  , l = t.useState()[0];
                return l = typeof l.then == "function" ? ie(l) : l,
                t = t.useState()[0],
                (k !== null ? k.memoizedState : null) !== t && (G.flags |= 1024),
                l
            }
            function Wu() {
                var t = Eu !== 0;
                return Eu = 0,
                t
            }
            function Fu(t, l, a) {
                l.updateQueue = t.updateQueue,
                l.flags &= -2053,
                t.lanes &= ~a
            }
            function Pu(t) {
                if (hu) {
                    for (t = t.memoizedState; t !== null; ) {
                        var l = t.queue;
                        l !== null && (l.pending = null),
                        t = t.next
                    }
                    hu = !1
                }
                Fl = 0,
                Nt = k = G = null,
                Ja = !1,
                Ue = Eu = 0,
                La = null
            }
            function Qt() {
                var t = {
                    memoizedState: null,
                    baseState: null,
                    baseQueue: null,
                    queue: null,
                    next: null
                };
                return Nt === null ? G.memoizedState = Nt = t : Nt = Nt.next = t,
                Nt
            }
            function zt() {
                if (k === null) {
                    var t = G.alternate;
                    t = t !== null ? t.memoizedState : null
                } else
                    t = k.next;
                var l = Nt === null ? G.memoizedState : Nt.next;
                if (l !== null)
                    Nt = l,
                    k = t;
                else {
                    if (t === null)
                        throw G.alternate === null ? Error(m(467)) : Error(m(310));
                    k = t,
                    t = {
                        memoizedState: k.memoizedState,
                        baseState: k.baseState,
                        baseQueue: k.baseQueue,
                        queue: k.queue,
                        next: null
                    },
                    Nt === null ? G.memoizedState = Nt = t : Nt = Nt.next = t
                }
                return Nt
            }
            function ie(t) {
                var l = Ue;
                return Ue += 1,
                La === null && (La = []),
                t = uf(La, t, l),
                l = G,
                (Nt === null ? l.memoizedState : Nt.next) === null && (l = l.alternate,
                q.H = l === null || l.memoizedState === null ? oa : Pl),
                t
            }
            function xe(t) {
                if (t !== null && typeof t == "object") {
                    if (typeof t.then == "function")
                        return ie(t);
                    if (t.$$typeof === Kl)
                        return jt(t)
                }
                throw Error(m(438, String(t)))
            }
            function Iu(t) {
                var l = null
                  , a = G.updateQueue;
                if (a !== null && (l = a.memoCache),
                l == null) {
                    var e = G.alternate;
                    e !== null && (e = e.updateQueue,
                    e !== null && (e = e.memoCache,
                    e != null && (l = {
                        data: e.data.map(function(u) {
                            return u.slice()
                        }),
                        index: 0
                    })))
                }
                if (l == null && (l = {
                    data: [],
                    index: 0
                }),
                a === null && (a = pc(),
                G.updateQueue = a),
                a.memoCache = l,
                a = l.data[l.index],
                a === void 0)
                    for (a = l.data[l.index] = Array(t),
                    e = 0; e < t; e++)
                        a[e] = km;
                return l.index++,
                a
            }
            function hl(t, l) {
                return typeof l == "function" ? l(t) : l
            }
            function Je(t) {
                var l = zt();
                return $u(l, k, t)
            }
            function $u(t, l, a) {
                var e = t.queue;
                if (e === null)
                    throw Error(m(311));
                e.lastRenderedReducer = a;
                var u = t.baseQueue
                  , n = e.pending;
                if (n !== null) {
                    if (u !== null) {
                        var i = u.next;
                        u.next = n.next,
                        n.next = i
                    }
                    l.baseQueue = u = n,
                    e.pending = null
                }
                if (n = t.baseState,
                u === null)
                    t.memoizedState = n;
                else {
                    l = u.next;
                    var v = i = null
                      , d = null
                      , E = l
                      , H = !1;
                    do {
                        var r = E.lane & -536870913;
                        if (r !== E.lane ? (L & r) === r : (Fl & r) === r) {
                            var j = E.revertLane;
                            if (j === 0)
                                d !== null && (d = d.next = {
                                    lane: 0,
                                    revertLane: 0,
                                    action: E.action,
                                    hasEagerState: E.hasEagerState,
                                    eagerState: E.eagerState,
                                    next: null
                                }),
                                r === Va && (H = !0);
                            else if ((Fl & j) === j) {
                                E = E.next,
                                j === Va && (H = !0);
                                continue
                            } else
                                r = {
                                    lane: 0,
                                    revertLane: E.revertLane,
                                    action: E.action,
                                    hasEagerState: E.hasEagerState,
                                    eagerState: E.eagerState,
                                    next: null
                                },
                                d === null ? (v = d = r,
                                i = n) : d = d.next = r,
                                G.lanes |= j,
                                Il |= j;
                            r = E.action,
                            pa && a(n, r),
                            n = E.hasEagerState ? E.eagerState : a(n, r)
                        } else
                            j = {
                                lane: r,
                                revertLane: E.revertLane,
                                action: E.action,
                                hasEagerState: E.hasEagerState,
                                eagerState: E.eagerState,
                                next: null
                            },
                            d === null ? (v = d = j,
                            i = n) : d = d.next = j,
                            G.lanes |= r,
                            Il |= r;
                        E = E.next
                    } while (E !== null && E !== l);
                    if (d === null ? i = n : d.next = v,
                    !Wt(n, t.memoizedState) && (Ht = !0,
                    H && (a = Xa,
                    a !== null)))
                        throw a;
                    t.memoizedState = n,
                    t.baseState = i,
                    t.baseQueue = d,
                    e.lastRenderedState = n
                }
                return u === null && (e.lanes = 0),
                [t.memoizedState, e.dispatch]
            }
            function wu(t) {
                var l = zt()
                  , a = l.queue;
                if (a === null)
                    throw Error(m(311));
                a.lastRenderedReducer = t;
                var e = a.dispatch
                  , u = a.pending
                  , n = l.memoizedState;
                if (u !== null) {
                    a.pending = null;
                    var i = u = u.next;
                    do
                        n = t(n, i.action),
                        i = i.next;
                    while (i !== u);
                    Wt(n, l.memoizedState) || (Ht = !0),
                    l.memoizedState = n,
                    l.baseQueue === null && (l.baseState = n),
                    a.lastRenderedState = n
                }
                return [n, e]
            }
            function of(t, l, a) {
                var e = G
                  , u = zt()
                  , n = P;
                if (n) {
                    if (a === void 0)
                        throw Error(m(407));
                    a = a()
                } else
                    a = l();
                var i = !Wt((k || u).memoizedState, a);
                if (i && (u.memoizedState = a,
                Ht = !0),
                u = u.queue,
                ln(Sf.bind(null, e, u, t), [t]),
                u.getSnapshot !== l || i || Nt !== null && Nt.memoizedState.tag & 1) {
                    if (e.flags |= 2048,
                    Ua(9, yf.bind(null, e, u, a, l), {
                        destroy: void 0
                    }, null),
                    ut === null)
                        throw Error(m(349));
                    n || (Fl & 60) !== 0 || df(e, l, a)
                }
                return a
            }
            function df(t, l, a) {
                t.flags |= 16384,
                t = {
                    getSnapshot: l,
                    value: a
                },
                l = G.updateQueue,
                l === null ? (l = pc(),
                G.updateQueue = l,
                l.stores = [t]) : (a = l.stores,
                a === null ? l.stores = [t] : a.push(t))
            }
            function yf(t, l, a, e) {
                l.value = a,
                l.getSnapshot = e,
                hf(l) && Ef(t)
            }
            function Sf(t, l, a) {
                return a(function() {
                    hf(l) && Ef(t)
                })
            }
            function hf(t) {
                var l = t.getSnapshot;
                t = t.value;
                try {
                    var a = l();
                    return !Wt(t, a)
                } catch {
                    return !0
                }
            }
            function Ef(t) {
                var l = Rl(t, 2);
                l !== null && Ct(l, t, 2)
            }
            function ku(t) {
                var l = Qt();
                if (typeof t == "function") {
                    var a = t;
                    if (t = a(),
                    pa) {
                        nl(!0);
                        try {
                            a()
                        } finally {
                            nl(!1)
                        }
                    }
                }
                return l.memoizedState = l.baseState = t,
                l.queue = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: hl,
                    lastRenderedState: t
                },
                l
            }
            function zf(t, l, a, e) {
                return t.baseState = a,
                $u(t, k, typeof e == "function" ? e : hl)
            }
            function jm(t, l, a, e, u) {
                if (Fe(t))
                    throw Error(m(485));
                if (t = l.action,
                t !== null) {
                    var n = {
                        payload: u,
                        action: t,
                        next: null,
                        isTransition: !0,
                        status: "pending",
                        value: null,
                        reason: null,
                        listeners: [],
                        then: function(i) {
                            n.listeners.push(i)
                        }
                    };
                    q.T !== null ? a(!0) : n.isTransition = !1,
                    e(n),
                    a = l.pending,
                    a === null ? (n.next = l.pending = n,
                    Nf(l, n)) : (n.next = a.next,
                    l.pending = a.next = n)
                }
            }
            function Nf(t, l) {
                var a = l.action
                  , e = l.payload
                  , u = t.state;
                if (l.isTransition) {
                    var n = q.T
                      , i = {};
                    q.T = i;
                    try {
                        var v = a(u, e)
                          , d = q.S;
                        d !== null && d(i, v),
                        Tf(t, l, v)
                    } catch (E) {
                        tn(t, l, E)
                    } finally {
                        q.T = n
                    }
                } else
                    try {
                        n = a(u, e),
                        Tf(t, l, n)
                    } catch (E) {
                        tn(t, l, E)
                    }
            }
            function Tf(t, l, a) {
                a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(e) {
                    Mf(t, l, e)
                }, function(e) {
                    return tn(t, l, e)
                }) : Mf(t, l, a)
            }
            function Mf(t, l, a) {
                l.status = "fulfilled",
                l.value = a,
                Of(l),
                t.state = a,
                l = t.pending,
                l !== null && (a = l.next,
                a === l ? t.pending = null : (a = a.next,
                l.next = a,
                Nf(t, a)))
            }
            function tn(t, l, a) {
                var e = t.pending;
                if (t.pending = null,
                e !== null) {
                    e = e.next;
                    do
                        l.status = "rejected",
                        l.reason = a,
                        Of(l),
                        l = l.next;
                    while (l !== e)
                }
                t.action = null
            }
            function Of(t) {
                t = t.listeners;
                for (var l = 0; l < t.length; l++)
                    (0,
                    t[l])()
            }
            function Hf(t, l) {
                return l
            }
            function Uf(t, l) {
                if (P) {
                    var a = ut.formState;
                    if (a !== null) {
                        t: {
                            var e = G;
                            if (P) {
                                if (bt) {
                                    var u = xv(bt, pl);
                                    if (u) {
                                        bt = hs(u),
                                        e = Jv(u);
                                        break t
                                    }
                                }
                                la(e)
                            }
                            e = !1
                        }
                        e && (l = a[0])
                    }
                }
                a = Qt(),
                a.memoizedState = a.baseState = l,
                e = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: Hf,
                    lastRenderedState: l
                },
                a.queue = e,
                a = Zf.bind(null, G, e),
                e.dispatch = a,
                e = ku(!1);
                var n = nn.bind(null, G, !1, e.queue);
                return e = Qt(),
                u = {
                    state: l,
                    dispatch: null,
                    action: t,
                    pending: null
                },
                e.queue = u,
                a = jm.bind(null, G, u, n, a),
                u.dispatch = a,
                e.memoizedState = t,
                [l, a, !1]
            }
            function _f(t) {
                var l = zt();
                return rf(l, k, t)
            }
            function rf(t, l, a) {
                l = $u(t, l, Hf)[0],
                t = Je(hl)[0],
                l = typeof l == "object" && l !== null && typeof l.then == "function" ? ie(l) : l;
                var e = zt()
                  , u = e.queue
                  , n = u.dispatch;
                return a !== e.memoizedState && (G.flags |= 2048,
                Ua(9, gm.bind(null, u, a), {
                    destroy: void 0
                }, null)),
                [l, n, t]
            }
            function gm(t, l) {
                t.action = l
            }
            function Af(t) {
                var l = zt()
                  , a = k;
                if (a !== null)
                    return rf(l, a, t);
                zt(),
                l = l.memoizedState,
                a = zt();
                var e = a.queue.dispatch;
                return a.memoizedState = t,
                [l, e, !1]
            }
            function Ua(t, l, a, e) {
                return t = {
                    tag: t,
                    create: l,
                    inst: a,
                    deps: e,
                    next: null
                },
                l = G.updateQueue,
                l === null && (l = pc(),
                G.updateQueue = l),
                a = l.lastEffect,
                a === null ? l.lastEffect = t.next = t : (e = a.next,
                a.next = t,
                t.next = e,
                l.lastEffect = t),
                t
            }
            function jf() {
                return zt().memoizedState
            }
            function Le(t, l, a, e) {
                var u = Qt();
                G.flags |= t,
                u.memoizedState = Ua(1 | l, a, {
                    destroy: void 0
                }, e === void 0 ? null : e)
            }
            function We(t, l, a, e) {
                var u = zt();
                e = e === void 0 ? null : e;
                var n = u.memoizedState.inst;
                k !== null && e !== null && Ju(e, k.memoizedState.deps) ? u.memoizedState = Ua(l, a, n, e) : (G.flags |= t,
                u.memoizedState = Ua(1 | l, a, n, e))
            }
            function gf(t, l) {
                Le(8390656, 8, t, l)
            }
            function ln(t, l) {
                We(2048, 8, t, l)
            }
            function Df(t, l) {
                return We(4, 2, t, l)
            }
            function bf(t, l) {
                return We(4, 4, t, l)
            }
            function Rf(t, l) {
                if (typeof l == "function") {
                    t = t();
                    var a = l(t);
                    return function() {
                        typeof a == "function" ? a() : l(null)
                    }
                }
                if (l != null)
                    return t = t(),
                    l.current = t,
                    function() {
                        l.current = null
                    }
            }
            function Cf(t, l, a) {
                a = a != null ? a.concat([t]) : null,
                We(4, 4, Rf.bind(null, l, t), a)
            }
            function an() {}
            function qf(t, l) {
                var a = zt();
                l = l === void 0 ? null : l;
                var e = a.memoizedState;
                return l !== null && Ju(l, e[1]) ? e[0] : (a.memoizedState = [t, l],
                t)
            }
            function Bf(t, l) {
                var a = zt();
                l = l === void 0 ? null : l;
                var e = a.memoizedState;
                if (l !== null && Ju(l, e[1]))
                    return e[0];
                if (e = t(),
                pa) {
                    nl(!0);
                    try {
                        t()
                    } finally {
                        nl(!1)
                    }
                }
                return a.memoizedState = [e, l],
                e
            }
            function en(t, l, a) {
                return a === void 0 || (Fl & 1073741824) !== 0 ? t.memoizedState = l : (t.memoizedState = a,
                t = bi(),
                G.lanes |= t,
                Il |= t,
                a)
            }
            function Qf(t, l, a, e) {
                return Wt(a, l) ? a : xa.current !== null ? (t = en(t, a, e),
                Wt(t, l) || (Ht = !0),
                t) : (Fl & 42) === 0 ? (Ht = !0,
                t.memoizedState = a) : (t = bi(),
                G.lanes |= t,
                Il |= t,
                l)
            }
            function Yf(t, l, a, e, u) {
                var n = ia();
                Gt(n !== 0 && 8 > n ? n : 8);
                var i = q.T
                  , v = {};
                q.T = v,
                nn(t, !1, l, a);
                try {
                    var d = u()
                      , E = q.S;
                    if (E !== null && E(v, d),
                    d !== null && typeof d == "object" && typeof d.then == "function") {
                        var H = rm(d, e);
                        se(t, l, H, Kt(t))
                    } else
                        se(t, l, e, Kt(t))
                } catch (r) {
                    se(t, l, {
                        then: function() {},
                        status: "rejected",
                        reason: r
                    }, Kt())
                } finally {
                    Gt(n),
                    q.T = i
                }
            }
            function Gf(t) {
                var l = t.memoizedState;
                if (l !== null)
                    return l;
                l = {
                    memoizedState: ba,
                    baseState: ba,
                    baseQueue: null,
                    queue: {
                        pending: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: hl,
                        lastRenderedState: ba
                    },
                    next: null
                };
                var a = {};
                return l.next = {
                    memoizedState: a,
                    baseState: a,
                    baseQueue: null,
                    queue: {
                        pending: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: hl,
                        lastRenderedState: a
                    },
                    next: null
                },
                t.memoizedState = l,
                t = t.alternate,
                t !== null && (t.memoizedState = l),
                l
            }
            function un() {
                return jt(sa)
            }
            function Vf() {
                return zt().memoizedState
            }
            function Xf() {
                return zt().memoizedState
            }
            function Dm(t) {
                for (var l = t.return; l !== null; ) {
                    switch (l.tag) {
                    case 24:
                    case 3:
                        var a = Kt();
                        t = Cl(a);
                        var e = ql(l, t, a);
                        e !== null && (Ct(e, l, a),
                        ue(e, l, a)),
                        l = {
                            cache: zn()
                        },
                        t.payload = l;
                        return
                    }
                    l = l.return
                }
            }
            function bm(t, l, a) {
                var e = Kt();
                a = {
                    lane: e,
                    revertLane: 0,
                    action: a,
                    hasEagerState: !1,
                    eagerState: null,
                    next: null
                },
                Fe(t) ? Kf(l, a) : (a = Yu(t, l, a, e),
                a !== null && (Ct(a, t, e),
                xf(a, l, e)))
            }
            function Zf(t, l, a) {
                var e = Kt();
                se(t, l, a, e)
            }
            function se(t, l, a, e) {
                var u = {
                    lane: e,
                    revertLane: 0,
                    action: a,
                    hasEagerState: !1,
                    eagerState: null,
                    next: null
                };
                if (Fe(t))
                    Kf(l, u);
                else {
                    var n = t.alternate;
                    if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = l.lastRenderedReducer,
                    n !== null))
                        try {
                            var i = l.lastRenderedState
                              , v = n(i, a);
                            if (u.hasEagerState = !0,
                            u.eagerState = v,
                            Wt(v, i))
                                return Qe(t, l, u, 0),
                                ut === null && Be(),
                                !1
                        } catch {} finally {}
                    if (a = Yu(t, l, u, e),
                    a !== null)
                        return Ct(a, t, e),
                        xf(a, l, e),
                        !0
                }
                return !1
            }
            function nn(t, l, a, e) {
                if (e = {
                    lane: 2,
                    revertLane: Gu(),
                    action: e,
                    hasEagerState: !1,
                    eagerState: null,
                    next: null
                },
                Fe(t)) {
                    if (l)
                        throw Error(m(479))
                } else
                    l = Yu(t, a, e, 2),
                    l !== null && Ct(l, t, 2)
            }
            function Fe(t) {
                var l = t.alternate;
                return t === G || l !== null && l === G
            }
            function Kf(t, l) {
                Ja = hu = !0;
                var a = t.pending;
                a === null ? l.next = l : (l.next = a.next,
                a.next = l),
                t.pending = l
            }
            function xf(t, l, a) {
                if ((a & 4194176) !== 0) {
                    var e = l.lanes;
                    e &= t.pendingLanes,
                    a |= e,
                    l.lanes = a,
                    ht(t, a)
                }
            }
            function cn(t, l, a, e) {
                l = t.memoizedState,
                a = a(e, l),
                a = a == null ? l : Kn({}, l, a),
                t.memoizedState = a,
                t.lanes === 0 && (t.updateQueue.baseState = a)
            }
            function Jf(t, l, a, e, u, n, i) {
                return t = t.stateNode,
                typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(e, n, i) : l.prototype && l.prototype.isPureReactComponent ? !Ge(a, e) || !Ge(u, n) : !0
            }
            function Lf(t, l, a, e) {
                t = l.state,
                typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(a, e),
                typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(a, e),
                l.state !== t && oc.enqueueReplaceState(l, l.state, null)
            }
            function aa(t, l) {
                var a = l;
                if ("ref"in l) {
                    a = {};
                    for (var e in l)
                        e !== "ref" && (a[e] = l[e])
                }
                if (t = t.defaultProps) {
                    a === l && (a = Kn({}, a));
                    for (var u in t)
                        a[u] === void 0 && (a[u] = t[u])
                }
                return a
            }
            function Pe(t, l) {
                try {
                    var a = t.onUncaughtError;
                    a(l.value, {
                        componentStack: l.stack
                    })
                } catch (e) {
                    setTimeout(function() {
                        throw e
                    })
                }
            }
            function Wf(t, l, a) {
                try {
                    var e = t.onCaughtError;
                    e(a.value, {
                        componentStack: a.stack,
                        errorBoundary: l.tag === 1 ? l.stateNode : null
                    })
                } catch (u) {
                    setTimeout(function() {
                        throw u
                    })
                }
            }
            function fn(t, l, a) {
                return a = Cl(a),
                a.tag = 3,
                a.payload = {
                    element: null
                },
                a.callback = function() {
                    Pe(t, l)
                }
                ,
                a
            }
            function Ff(t) {
                return t = Cl(t),
                t.tag = 3,
                t
            }
            function Pf(t, l, a, e) {
                var u = a.type.getDerivedStateFromError;
                if (typeof u == "function") {
                    var n = e.value;
                    t.payload = function() {
                        return u(n)
                    }
                    ,
                    t.callback = function() {
                        Wf(l, a, e)
                    }
                }
                var i = a.stateNode;
                i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
                    Wf(l, a, e),
                    typeof u != "function" && ($l === null ? $l = new Set([this]) : $l.add(this));
                    var v = e.stack;
                    this.componentDidCatch(e.value, {
                        componentStack: v !== null ? v : ""
                    })
                }
                )
            }
            function Rm(t, l, a, e, u) {
                if (a.flags |= 32768,
                e !== null && typeof e == "object" && typeof e.then == "function") {
                    if (l = a.alternate,
                    l !== null && ve(l, a, u, !0),
                    a = ll.current,
                    a !== null) {
                        switch (a.tag) {
                        case 13:
                            return ol === null ? Bn() : a.alternate === null && St === 0 && (St = 3),
                            a.flags &= -257,
                            a.flags |= 65536,
                            a.lanes = u,
                            e === yu ? a.flags |= 16384 : (l = a.updateQueue,
                            l === null ? a.updateQueue = new Set([e]) : l.add(e),
                            Yn(t, e, u)),
                            !1;
                        case 22:
                            return a.flags |= 65536,
                            e === yu ? a.flags |= 16384 : (l = a.updateQueue,
                            l === null ? (l = {
                                transitions: null,
                                markerInstances: null,
                                retryQueue: new Set([e])
                            },
                            a.updateQueue = l) : (a = l.retryQueue,
                            a === null ? l.retryQueue = new Set([e]) : a.add(e)),
                            Yn(t, e, u)),
                            !1
                        }
                        throw Error(m(435, a.tag))
                    }
                    return Yn(t, e, u),
                    Bn(),
                    !1
                }
                if (P)
                    return l = ll.current,
                    l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256),
                    l.flags |= 65536,
                    l.lanes = u,
                    e !== nc && (t = Error(m(422), {
                        cause: e
                    }),
                    ee(Rt(t, a)))) : (e !== nc && (l = Error(m(423), {
                        cause: e
                    }),
                    ee(Rt(l, a))),
                    t = t.current.alternate,
                    t.flags |= 65536,
                    u &= -u,
                    t.lanes |= u,
                    e = Rt(e, a),
                    u = fn(t.stateNode, e, u),
                    Zu(t, u),
                    St !== 4 && (St = 2)),
                    !1;
                var n = Error(m(520), {
                    cause: e
                });
                if (n = Rt(n, a),
                re === null ? re = [n] : re.push(n),
                St !== 4 && (St = 2),
                l === null)
                    return !0;
                e = Rt(e, a),
                a = l;
                do {
                    switch (a.tag) {
                    case 3:
                        return a.flags |= 65536,
                        t = u & -u,
                        a.lanes |= t,
                        t = fn(a.stateNode, e, t),
                        Zu(a, t),
                        !1;
                    case 1:
                        if (l = a.type,
                        n = a.stateNode,
                        (a.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && ($l === null || !$l.has(n))))
                            return a.flags |= 65536,
                            u &= -u,
                            a.lanes |= u,
                            u = Ff(u),
                            Pf(u, t, a, e),
                            Zu(a, u),
                            !1
                    }
                    a = a.return
                } while (a !== null);
                return !1
            }
            function rt(t, l, a, e) {
                l.child = t === null ? Ds(l, null, a, e) : va(l, t.child, a, e)
            }
            function If(t, l, a, e, u) {
                a = a.render;
                var n = l.ref;
                if ("ref"in e) {
                    var i = {};
                    for (var v in e)
                        v !== "ref" && (i[v] = e[v])
                } else
                    i = e;
                return ea(l),
                e = Lu(t, l, a, i, n, u),
                v = Wu(),
                t !== null && !Ht ? (Fu(t, l, u),
                El(t, l, u)) : (P && v && ot(l),
                l.flags |= 1,
                rt(t, l, e, u),
                l.child)
            }
            function $f(t, l, a, e, u) {
                if (t === null) {
                    var n = a.type;
                    return typeof n == "function" && !Gn(n) && n.defaultProps === void 0 && a.compare === null ? (l.tag = 15,
                    l.type = n,
                    wf(t, l, n, e, u)) : (t = eu(a.type, null, e, l, l.mode, u),
                    t.ref = l.ref,
                    t.return = l,
                    l.child = t)
                }
                if (n = t.child,
                !Sn(t, u)) {
                    var i = n.memoizedProps;
                    if (a = a.compare,
                    a = a !== null ? a : Ge,
                    a(i, e) && t.ref === l.ref)
                        return El(t, l, u)
                }
                return l.flags |= 1,
                t = Zl(n, e),
                t.ref = l.ref,
                t.return = l,
                l.child = t
            }
            function wf(t, l, a, e, u) {
                if (t !== null) {
                    var n = t.memoizedProps;
                    if (Ge(n, e) && t.ref === l.ref)
                        if (Ht = !1,
                        l.pendingProps = e = n,
                        Sn(t, u))
                            (t.flags & 131072) !== 0 && (Ht = !0);
                        else
                            return l.lanes = t.lanes,
                            El(t, l, u)
                }
                return sn(t, l, a, e, u)
            }
            function kf(t, l, a) {
                var e = l.pendingProps
                  , u = e.children
                  , n = (l.stateNode._pendingVisibility & 2) !== 0
                  , i = t !== null ? t.memoizedState : null;
                if (me(t, l),
                e.mode === "hidden" || n) {
                    if ((l.flags & 128) !== 0) {
                        if (e = i !== null ? i.baseLanes | a : a,
                        t !== null) {
                            for (u = l.child = t.child,
                            n = 0; u !== null; )
                                n = n | u.lanes | u.childLanes,
                                u = u.sibling;
                            l.childLanes = n & ~e
                        } else
                            l.childLanes = 0,
                            l.child = null;
                        return ti(t, l, e, a)
                    }
                    if ((a & 536870912) !== 0)
                        l.memoizedState = {
                            baseLanes: 0,
                            cachePool: null
                        },
                        t !== null && we(l, i !== null ? i.cachePool : null),
                        i !== null ? sf(l, i) : Ku(),
                        mf(l);
                    else
                        return l.lanes = l.childLanes = 536870912,
                        ti(t, l, i !== null ? i.baseLanes | a : a, a)
                } else
                    i !== null ? (we(l, i.cachePool),
                    sf(l, i),
                    Ql(),
                    l.memoizedState = null) : (t !== null && we(l, null),
                    Ku(),
                    Ql());
                return rt(t, l, u, a),
                l.child
            }
            function ti(t, l, a, e) {
                var u = Nn();
                return u = u === null ? null : {
                    parent: Ml ? dt._currentValue : dt._currentValue2,
                    pool: u
                },
                l.memoizedState = {
                    baseLanes: a,
                    cachePool: u
                },
                t !== null && we(l, null),
                Ku(),
                mf(l),
                t !== null && ve(t, l, e, !0),
                null
            }
            function me(t, l) {
                var a = l.ref;
                if (a === null)
                    t !== null && t.ref !== null && (l.flags |= 2097664);
                else {
                    if (typeof a != "function" && typeof a != "object")
                        throw Error(m(284));
                    (t === null || t.ref !== a) && (l.flags |= 2097664)
                }
            }
            function sn(t, l, a, e, u) {
                return ea(l),
                a = Lu(t, l, a, e, void 0, u),
                e = Wu(),
                t !== null && !Ht ? (Fu(t, l, u),
                El(t, l, u)) : (P && e && ot(l),
                l.flags |= 1,
                rt(t, l, a, u),
                l.child)
            }
            function li(t, l, a, e, u, n) {
                return ea(l),
                l.updateQueue = null,
                a = pf(l, e, a, u),
                vf(t),
                e = Wu(),
                t !== null && !Ht ? (Fu(t, l, n),
                El(t, l, n)) : (P && e && ot(l),
                l.flags |= 1,
                rt(t, l, a, n),
                l.child)
            }
            function ai(t, l, a, e, u) {
                if (ea(l),
                l.stateNode === null) {
                    var n = Ca
                      , i = a.contextType;
                    typeof i == "object" && i !== null && (n = jt(i)),
                    n = new a(e,n),
                    l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null,
                    n.updater = oc,
                    l.stateNode = n,
                    n._reactInternals = l,
                    n = l.stateNode,
                    n.props = e,
                    n.state = l.memoizedState,
                    n.refs = {},
                    Vu(l),
                    i = a.contextType,
                    n.context = typeof i == "object" && i !== null ? jt(i) : Ca,
                    n.state = l.memoizedState,
                    i = a.getDerivedStateFromProps,
                    typeof i == "function" && (cn(l, a, i, e),
                    n.state = l.memoizedState),
                    typeof a.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state,
                    typeof n.componentWillMount == "function" && n.componentWillMount(),
                    typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(),
                    i !== n.state && oc.enqueueReplaceState(n, n.state, null),
                    ce(l, e, n, u),
                    ne(),
                    n.state = l.memoizedState),
                    typeof n.componentDidMount == "function" && (l.flags |= 4194308),
                    e = !0
                } else if (t === null) {
                    n = l.stateNode;
                    var v = l.memoizedProps
                      , d = aa(a, v);
                    n.props = d;
                    var E = n.context
                      , H = a.contextType;
                    i = Ca,
                    typeof H == "object" && H !== null && (i = jt(H));
                    var r = a.getDerivedStateFromProps;
                    H = typeof r == "function" || typeof n.getSnapshotBeforeUpdate == "function",
                    v = l.pendingProps !== v,
                    H || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (v || E !== i) && Lf(l, n, e, i),
                    Wl = !1;
                    var j = l.memoizedState;
                    n.state = j,
                    ce(l, e, n, u),
                    ne(),
                    E = l.memoizedState,
                    v || j !== E || Wl ? (typeof r == "function" && (cn(l, a, r, e),
                    E = l.memoizedState),
                    (d = Wl || Jf(l, a, d, e, j, E, i)) ? (H || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(),
                    typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()),
                    typeof n.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308),
                    l.memoizedProps = e,
                    l.memoizedState = E),
                    n.props = e,
                    n.state = E,
                    n.context = i,
                    e = d) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308),
                    e = !1)
                } else {
                    n = l.stateNode,
                    Xu(t, l),
                    i = l.memoizedProps,
                    H = aa(a, i),
                    n.props = H,
                    r = l.pendingProps,
                    j = n.context,
                    E = a.contextType,
                    d = Ca,
                    typeof E == "object" && E !== null && (d = jt(E)),
                    v = a.getDerivedStateFromProps,
                    (E = typeof v == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== r || j !== d) && Lf(l, n, e, d),
                    Wl = !1,
                    j = l.memoizedState,
                    n.state = j,
                    ce(l, e, n, u),
                    ne();
                    var Q = l.memoizedState;
                    i !== r || j !== Q || Wl || t !== null && t.dependencies !== null && Ie(t.dependencies) ? (typeof v == "function" && (cn(l, a, v, e),
                    Q = l.memoizedState),
                    (H = Wl || Jf(l, a, H, e, j, Q, d) || t !== null && t.dependencies !== null && Ie(t.dependencies)) ? (E || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(e, Q, d),
                    typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(e, Q, d)),
                    typeof n.componentDidUpdate == "function" && (l.flags |= 4),
                    typeof n.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && j === t.memoizedState || (l.flags |= 4),
                    typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && j === t.memoizedState || (l.flags |= 1024),
                    l.memoizedProps = e,
                    l.memoizedState = Q),
                    n.props = e,
                    n.state = Q,
                    n.context = d,
                    e = H) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && j === t.memoizedState || (l.flags |= 4),
                    typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && j === t.memoizedState || (l.flags |= 1024),
                    e = !1)
                }
                return n = e,
                me(t, l),
                e = (l.flags & 128) !== 0,
                n || e ? (n = l.stateNode,
                a = e && typeof a.getDerivedStateFromError != "function" ? null : n.render(),
                l.flags |= 1,
                t !== null && e ? (l.child = va(l, t.child, null, u),
                l.child = va(l, null, a, u)) : rt(t, l, a, u),
                l.memoizedState = n.state,
                t = l.child) : t = El(t, l, u),
                t
            }
            function ei(t, l, a, e) {
                return ae(),
                l.flags |= 256,
                rt(t, l, a, e),
                l.child
            }
            function mn(t) {
                return {
                    baseLanes: t,
                    cachePool: si()
                }
            }
            function vn(t, l, a) {
                return t = t !== null ? t.childLanes & ~a : 0,
                l && (t |= al),
                t
            }
            function ui(t, l, a) {
                var e = l.pendingProps, u = !1, n = (l.flags & 128) !== 0, i;
                if ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (Ot.current & 2) !== 0),
                i && (u = !0,
                l.flags &= -129),
                i = (l.flags & 32) !== 0,
                l.flags &= -33,
                t === null) {
                    if (P) {
                        if (u ? Bl(l) : Ql(),
                        P) {
                            var v = bt, d;
                            (d = v) && (v = Iv(v, pl),
                            v !== null ? (l.memoizedState = {
                                dehydrated: v,
                                treeContext: ma !== null ? {
                                    id: Ol,
                                    overflow: Hl
                                } : null,
                                retryLane: 536870912
                            },
                            d = s(18, null, null, 0),
                            d.stateNode = v,
                            d.return = l,
                            l.child = d,
                            qt = l,
                            bt = null,
                            d = !0) : d = !1),
                            d || la(l)
                        }
                        if (v = l.memoizedState,
                        v !== null && (v = v.dehydrated,
                        v !== null))
                            return tc(v) ? l.lanes = 16 : l.lanes = 536870912,
                            null;
                        Sl(l)
                    }
                    return v = e.children,
                    e = e.fallback,
                    u ? (Ql(),
                    u = l.mode,
                    v = on({
                        mode: "hidden",
                        children: v
                    }, u),
                    e = fa(e, u, a, null),
                    v.return = l,
                    e.return = l,
                    v.sibling = e,
                    l.child = v,
                    u = l.child,
                    u.memoizedState = mn(a),
                    u.childLanes = vn(t, i, a),
                    l.memoizedState = dc,
                    e) : (Bl(l),
                    pn(l, v))
                }
                if (d = t.memoizedState,
                d !== null && (v = d.dehydrated,
                v !== null)) {
                    if (n)
                        l.flags & 256 ? (Bl(l),
                        l.flags &= -257,
                        l = dn(t, l, a)) : l.memoizedState !== null ? (Ql(),
                        l.child = t.child,
                        l.flags |= 128,
                        l = null) : (Ql(),
                        u = e.fallback,
                        v = l.mode,
                        e = on({
                            mode: "visible",
                            children: e.children
                        }, v),
                        u = fa(u, v, a, null),
                        u.flags |= 2,
                        e.return = l,
                        u.return = l,
                        e.sibling = u,
                        l.child = e,
                        va(l, t.child, null, a),
                        e = l.child,
                        e.memoizedState = mn(a),
                        e.childLanes = vn(t, i, a),
                        l.memoizedState = dc,
                        l = u);
                    else if (Bl(l),
                    tc(v))
                        i = Zv(v).digest,
                        e = Error(m(419)),
                        e.stack = "",
                        e.digest = i,
                        ee({
                            value: e,
                            source: null,
                            stack: null
                        }),
                        l = dn(t, l, a);
                    else if (Ht || ve(t, l, a, !1),
                    i = (a & t.childLanes) !== 0,
                    Ht || i) {
                        if (i = ut,
                        i !== null) {
                            if (e = a & -a,
                            (e & 42) !== 0)
                                e = 1;
                            else
                                switch (e) {
                                case 2:
                                    e = 1;
                                    break;
                                case 8:
                                    e = 4;
                                    break;
                                case 32:
                                    e = 16;
                                    break;
                                case 128:
                                case 256:
                                case 512:
                                case 1024:
                                case 2048:
                                case 4096:
                                case 8192:
                                case 16384:
                                case 32768:
                                case 65536:
                                case 131072:
                                case 262144:
                                case 524288:
                                case 1048576:
                                case 2097152:
                                case 4194304:
                                case 8388608:
                                case 16777216:
                                case 33554432:
                                    e = 64;
                                    break;
                                case 268435456:
                                    e = 134217728;
                                    break;
                                default:
                                    e = 0
                                }
                            if (e = (e & (i.suspendedLanes | a)) !== 0 ? 0 : e,
                            e !== 0 && e !== d.retryLane)
                                throw d.retryLane = e,
                                Rl(t, e),
                                Ct(i, t, e),
                                Rs
                        }
                        kn(v) || Bn(),
                        l = dn(t, l, a)
                    } else
                        kn(v) ? (l.flags |= 128,
                        l.child = t.child,
                        l = Jm.bind(null, t),
                        Kv(v, l),
                        l = null) : (t = d.treeContext,
                        It && (bt = Wv(v),
                        qt = l,
                        P = !0,
                        il = null,
                        pl = !1,
                        t !== null && (wt[kt++] = Ol,
                        wt[kt++] = Hl,
                        wt[kt++] = ma,
                        Ol = t.id,
                        Hl = t.overflow,
                        ma = l)),
                        l = pn(l, e.children),
                        l.flags |= 4096);
                    return l
                }
                return u ? (Ql(),
                u = e.fallback,
                v = l.mode,
                d = t.child,
                n = d.sibling,
                e = Zl(d, {
                    mode: "hidden",
                    children: e.children
                }),
                e.subtreeFlags = d.subtreeFlags & 31457280,
                n !== null ? u = Zl(n, u) : (u = fa(u, v, a, null),
                u.flags |= 2),
                u.return = l,
                e.return = l,
                e.sibling = u,
                l.child = e,
                e = u,
                u = l.child,
                v = t.child.memoizedState,
                v === null ? v = mn(a) : (d = v.cachePool,
                d !== null ? (n = Ml ? dt._currentValue : dt._currentValue2,
                d = d.parent !== n ? {
                    parent: n,
                    pool: n
                } : d) : d = si(),
                v = {
                    baseLanes: v.baseLanes | a,
                    cachePool: d
                }),
                u.memoizedState = v,
                u.childLanes = vn(t, i, a),
                l.memoizedState = dc,
                e) : (Bl(l),
                a = t.child,
                t = a.sibling,
                a = Zl(a, {
                    mode: "visible",
                    children: e.children
                }),
                a.return = l,
                a.sibling = null,
                t !== null && (i = l.deletions,
                i === null ? (l.deletions = [t],
                l.flags |= 16) : i.push(t)),
                l.child = a,
                l.memoizedState = null,
                a)
            }
            function pn(t, l) {
                return l = on({
                    mode: "visible",
                    children: l
                }, t.mode),
                l.return = t,
                t.child = l
            }
            function on(t, l) {
                return Fi(t, l, 0, null)
            }
            function dn(t, l, a) {
                return va(l, t.child, null, a),
                t = pn(l, l.pendingProps.children),
                t.flags |= 2,
                l.memoizedState = null,
                t
            }
            function ni(t, l, a) {
                t.lanes |= l;
                var e = t.alternate;
                e !== null && (e.lanes |= l),
                hn(t.return, l, a)
            }
            function yn(t, l, a, e, u) {
                var n = t.memoizedState;
                n === null ? t.memoizedState = {
                    isBackwards: l,
                    rendering: null,
                    renderingStartTime: 0,
                    last: e,
                    tail: a,
                    tailMode: u
                } : (n.isBackwards = l,
                n.rendering = null,
                n.renderingStartTime = 0,
                n.last = e,
                n.tail = a,
                n.tailMode = u)
            }
            function ci(t, l, a) {
                var e = l.pendingProps
                  , u = e.revealOrder
                  , n = e.tail;
                if (rt(t, l, e.children, a),
                e = Ot.current,
                (e & 2) !== 0)
                    e = e & 1 | 2,
                    l.flags |= 128;
                else {
                    if (t !== null && (t.flags & 128) !== 0)
                        t: for (t = l.child; t !== null; ) {
                            if (t.tag === 13)
                                t.memoizedState !== null && ni(t, a, l);
                            else if (t.tag === 19)
                                ni(t, a, l);
                            else if (t.child !== null) {
                                t.child.return = t,
                                t = t.child;
                                continue
                            }
                            if (t === l)
                                break t;
                            for (; t.sibling === null; ) {
                                if (t.return === null || t.return === l)
                                    break t;
                                t = t.return
                            }
                            t.sibling.return = t.return,
                            t = t.sibling
                        }
                    e &= 1
                }
                switch (N(Ot, e),
                u) {
                case "forwards":
                    for (a = l.child,
                    u = null; a !== null; )
                        t = a.alternate,
                        t !== null && Ke(t) === null && (u = a),
                        a = a.sibling;
                    a = u,
                    a === null ? (u = l.child,
                    l.child = null) : (u = a.sibling,
                    a.sibling = null),
                    yn(l, !1, u, a, n);
                    break;
                case "backwards":
                    for (a = null,
                    u = l.child,
                    l.child = null; u !== null; ) {
                        if (t = u.alternate,
                        t !== null && Ke(t) === null) {
                            l.child = u;
                            break
                        }
                        t = u.sibling,
                        u.sibling = a,
                        a = u,
                        u = t
                    }
                    yn(l, !0, a, null, n);
                    break;
                case "together":
                    yn(l, !1, null, null, void 0);
                    break;
                default:
                    l.memoizedState = null
                }
                return l.child
            }
            function El(t, l, a) {
                if (t !== null && (l.dependencies = t.dependencies),
                Il |= l.lanes,
                (a & l.childLanes) === 0)
                    if (t !== null) {
                        if (ve(t, l, a, !1),
                        (a & l.childLanes) === 0)
                            return null
                    } else
                        return null;
                if (t !== null && l.child !== t.child)
                    throw Error(m(153));
                if (l.child !== null) {
                    for (t = l.child,
                    a = Zl(t, t.pendingProps),
                    l.child = a,
                    a.return = l; t.sibling !== null; )
                        t = t.sibling,
                        a = a.sibling = Zl(t, t.pendingProps),
                        a.return = l;
                    a.sibling = null
                }
                return l.child
            }
            function Sn(t, l) {
                return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies,
                !!(t !== null && Ie(t)))
            }
            function Cm(t, l, a) {
                switch (l.tag) {
                case 3:
                    Mt(l, l.stateNode.containerInfo),
                    Yl(l, dt, t.memoizedState.cache),
                    ae();
                    break;
                case 27:
                case 5:
                    Oa(l);
                    break;
                case 4:
                    Mt(l, l.stateNode.containerInfo);
                    break;
                case 10:
                    Yl(l, l.type, l.memoizedProps.value);
                    break;
                case 13:
                    var e = l.memoizedState;
                    if (e !== null)
                        return e.dehydrated !== null ? (Bl(l),
                        l.flags |= 128,
                        null) : (a & l.child.childLanes) !== 0 ? ui(t, l, a) : (Bl(l),
                        t = El(t, l, a),
                        t !== null ? t.sibling : null);
                    Bl(l);
                    break;
                case 19:
                    var u = (t.flags & 128) !== 0;
                    if (e = (a & l.childLanes) !== 0,
                    e || (ve(t, l, a, !1),
                    e = (a & l.childLanes) !== 0),
                    u) {
                        if (e)
                            return ci(t, l, a);
                        l.flags |= 128
                    }
                    if (u = l.memoizedState,
                    u !== null && (u.rendering = null,
                    u.tail = null,
                    u.lastEffect = null),
                    N(Ot, Ot.current),
                    e)
                        break;
                    return null;
                case 22:
                case 23:
                    return l.lanes = 0,
                    kf(t, l, a);
                case 24:
                    Yl(l, dt, t.memoizedState.cache)
                }
                return El(t, l, a)
            }
            function fi(t, l, a) {
                if (t !== null)
                    if (t.memoizedProps !== l.pendingProps)
                        Ht = !0;
                    else {
                        if (!Sn(t, a) && (l.flags & 128) === 0)
                            return Ht = !1,
                            Cm(t, l, a);
                        Ht = (t.flags & 131072) !== 0
                    }
                else
                    Ht = !1,
                    P && (l.flags & 1048576) !== 0 && mt(l, vu, l.index);
                switch (l.lanes = 0,
                l.tag) {
                case 16:
                    t: {
                        t = l.pendingProps;
                        var e = l.elementType
                          , u = e._init;
                        if (e = u(e._payload),
                        l.type = e,
                        typeof e == "function")
                            Gn(e) ? (t = aa(e, t),
                            l.tag = 1,
                            l = ai(null, l, e, t, a)) : (l.tag = 0,
                            l = sn(null, l, e, t, a));
                        else {
                            if (e != null) {
                                if (u = e.$$typeof,
                                u === Jn) {
                                    l.tag = 11,
                                    l = If(null, l, e, t, a);
                                    break t
                                } else if (u === Fn) {
                                    l.tag = 14,
                                    l = $f(null, l, e, t, a);
                                    break t
                                }
                            }
                            throw l = T(e) || e,
                            Error(m(306, l, ""))
                        }
                    }
                    return l;
                case 0:
                    return sn(t, l, l.type, l.pendingProps, a);
                case 1:
                    return e = l.type,
                    u = aa(e, l.pendingProps),
                    ai(t, l, e, u, a);
                case 3:
                    t: {
                        if (Mt(l, l.stateNode.containerInfo),
                        t === null)
                            throw Error(m(387));
                        var n = l.pendingProps;
                        u = l.memoizedState,
                        e = u.element,
                        Xu(t, l),
                        ce(l, n, null, a);
                        var i = l.memoizedState;
                        if (n = i.cache,
                        Yl(l, dt, n),
                        n !== u.cache && En(l, [dt], a, !0),
                        ne(),
                        n = i.element,
                        It && u.isDehydrated)
                            if (u = {
                                element: n,
                                isDehydrated: !1,
                                cache: i.cache
                            },
                            l.updateQueue.baseState = u,
                            l.memoizedState = u,
                            l.flags & 256) {
                                l = ei(t, l, n, a);
                                break t
                            } else if (n !== e) {
                                e = Rt(Error(m(424)), l),
                                ee(e),
                                l = ei(t, l, n, a);
                                break t
                            } else
                                for (It && (bt = Lv(l.stateNode.containerInfo),
                                qt = l,
                                P = !0,
                                il = null,
                                pl = !0),
                                a = Ds(l, null, n, a),
                                l.child = a; a; )
                                    a.flags = a.flags & -3 | 4096,
                                    a = a.sibling;
                        else {
                            if (ae(),
                            n === e) {
                                l = El(t, l, a);
                                break t
                            }
                            rt(t, l, n, a)
                        }
                        l = l.child
                    }
                    return l;
                case 26:
                    if ($t)
                        return me(t, l),
                        t === null ? (a = Ts(l.type, null, l.pendingProps, null)) ? l.memoizedState = a : P || (l.stateNode = ip(l.type, l.pendingProps, Ll.current, l)) : l.memoizedState = Ts(l.type, t.memoizedProps, l.pendingProps, t.memoizedState),
                        null;
                case 27:
                    if (Dt)
                        return Oa(l),
                        t === null && Dt && P && (e = l.stateNode = rs(l.type, l.pendingProps, Ll.current, At.current, !1),
                        qt = l,
                        pl = !0,
                        bt = Es(e)),
                        e = l.pendingProps.children,
                        t !== null || P ? rt(t, l, e, a) : l.child = va(l, null, e, a),
                        me(t, l),
                        l.child;
                case 5:
                    return t === null && P && (np(l.type, l.pendingProps, At.current),
                    (u = e = bt) && (e = Fv(e, l.type, l.pendingProps, pl),
                    e !== null ? (l.stateNode = e,
                    qt = l,
                    bt = Es(e),
                    pl = !1,
                    u = !0) : u = !1),
                    u || la(l)),
                    Oa(l),
                    u = l.type,
                    n = l.pendingProps,
                    i = t !== null ? t.memoizedProps : null,
                    e = n.children,
                    cu(u, n) ? e = null : i !== null && cu(u, i) && (l.flags |= 32),
                    l.memoizedState !== null && (u = Lu(t, l, Am, null, null, a),
                    Ml ? sa._currentValue = u : sa._currentValue2 = u),
                    me(t, l),
                    rt(t, l, e, a),
                    l.child;
                case 6:
                    return t === null && P && (cp(l.pendingProps, At.current),
                    (t = a = bt) && (a = Pv(a, l.pendingProps, pl),
                    a !== null ? (l.stateNode = a,
                    qt = l,
                    bt = null,
                    t = !0) : t = !1),
                    t || la(l)),
                    null;
                case 13:
                    return ui(t, l, a);
                case 4:
                    return Mt(l, l.stateNode.containerInfo),
                    e = l.pendingProps,
                    t === null ? l.child = va(l, null, e, a) : rt(t, l, e, a),
                    l.child;
                case 11:
                    return If(t, l, l.type, l.pendingProps, a);
                case 7:
                    return rt(t, l, l.pendingProps, a),
                    l.child;
                case 8:
                    return rt(t, l, l.pendingProps.children, a),
                    l.child;
                case 12:
                    return rt(t, l, l.pendingProps.children, a),
                    l.child;
                case 10:
                    return e = l.pendingProps,
                    Yl(l, l.type, e.value),
                    rt(t, l, e.children, a),
                    l.child;
                case 9:
                    return u = l.type._context,
                    e = l.pendingProps.children,
                    ea(l),
                    u = jt(u),
                    e = e(u),
                    l.flags |= 1,
                    rt(t, l, e, a),
                    l.child;
                case 14:
                    return $f(t, l, l.type, l.pendingProps, a);
                case 15:
                    return wf(t, l, l.type, l.pendingProps, a);
                case 19:
                    return ci(t, l, a);
                case 22:
                    return kf(t, l, a);
                case 24:
                    return ea(l),
                    e = jt(dt),
                    t === null ? (u = Nn(),
                    u === null && (u = ut,
                    n = zn(),
                    u.pooledCache = n,
                    n.refCount++,
                    n !== null && (u.pooledCacheLanes |= a),
                    u = n),
                    l.memoizedState = {
                        parent: e,
                        cache: u
                    },
                    Vu(l),
                    Yl(l, dt, u)) : ((t.lanes & a) !== 0 && (Xu(t, l),
                    ce(l, null, null, a),
                    ne()),
                    u = t.memoizedState,
                    n = l.memoizedState,
                    u.parent !== e ? (u = {
                        parent: e,
                        cache: e
                    },
                    l.memoizedState = u,
                    l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u),
                    Yl(l, dt, e)) : (e = n.cache,
                    Yl(l, dt, e),
                    e !== u.cache && En(l, [dt], a, !0))),
                    rt(t, l, l.pendingProps.children, a),
                    l.child;
                case 29:
                    throw l.pendingProps
                }
                throw Error(m(156, l.tag))
            }
            function Yl(t, l, a) {
                Ml ? (N(zu, l._currentValue),
                l._currentValue = a) : (N(zu, l._currentValue2),
                l._currentValue2 = a)
            }
            function zl(t) {
                var l = zu.current;
                Ml ? t._currentValue = l : t._currentValue2 = l,
                _(zu)
            }
            function hn(t, l, a) {
                for (; t !== null; ) {
                    var e = t.alternate;
                    if ((t.childLanes & l) !== l ? (t.childLanes |= l,
                    e !== null && (e.childLanes |= l)) : e !== null && (e.childLanes & l) !== l && (e.childLanes |= l),
                    t === a)
                        break;
                    t = t.return
                }
            }
            function En(t, l, a, e) {
                var u = t.child;
                for (u !== null && (u.return = t); u !== null; ) {
                    var n = u.dependencies;
                    if (n !== null) {
                        var i = u.child;
                        n = n.firstContext;
                        t: for (; n !== null; ) {
                            var v = n;
                            n = u;
                            for (var d = 0; d < l.length; d++)
                                if (v.context === l[d]) {
                                    n.lanes |= a,
                                    v = n.alternate,
                                    v !== null && (v.lanes |= a),
                                    hn(n.return, a, t),
                                    e || (i = null);
                                    break t
                                }
                            n = v.next
                        }
                    } else if (u.tag === 18) {
                        if (i = u.return,
                        i === null)
                            throw Error(m(341));
                        i.lanes |= a,
                        n = i.alternate,
                        n !== null && (n.lanes |= a),
                        hn(i, a, t),
                        i = null
                    } else
                        i = u.child;
                    if (i !== null)
                        i.return = u;
                    else
                        for (i = u; i !== null; ) {
                            if (i === t) {
                                i = null;
                                break
                            }
                            if (u = i.sibling,
                            u !== null) {
                                u.return = i.return,
                                i = u;
                                break
                            }
                            i = i.return
                        }
                    u = i
                }
            }
            function ve(t, l, a, e) {
                t = null;
                for (var u = l, n = !1; u !== null; ) {
                    if (!n) {
                        if ((u.flags & 524288) !== 0)
                            n = !0;
                        else if ((u.flags & 262144) !== 0)
                            break
                    }
                    if (u.tag === 10) {
                        var i = u.alternate;
                        if (i === null)
                            throw Error(m(387));
                        if (i = i.memoizedProps,
                        i !== null) {
                            var v = u.type;
                            Wt(u.pendingProps.value, i.value) || (t !== null ? t.push(v) : t = [v])
                        }
                    } else if (u === pu.current) {
                        if (i = u.alternate,
                        i === null)
                            throw Error(m(387));
                        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(sa) : t = [sa])
                    }
                    u = u.return
                }
                t !== null && En(l, t, a, e),
                l.flags |= 262144
            }
            function Ie(t) {
                for (t = t.firstContext; t !== null; ) {
                    var l = t.context;
                    if (!Wt(Ml ? l._currentValue : l._currentValue2, t.memoizedValue))
                        return !0;
                    t = t.next
                }
                return !1
            }
            function ea(t) {
                ya = t,
                Ul = null,
                t = t.dependencies,
                t !== null && (t.firstContext = null)
            }
            function jt(t) {
                return ii(ya, t)
            }
            function $e(t, l) {
                return ya === null && ea(t),
                ii(t, l)
            }
            function ii(t, l) {
                var a = Ml ? l._currentValue : l._currentValue2;
                if (l = {
                    context: l,
                    memoizedValue: a,
                    next: null
                },
                Ul === null) {
                    if (t === null)
                        throw Error(m(308));
                    Ul = l,
                    t.dependencies = {
                        lanes: 0,
                        firstContext: l
                    },
                    t.flags |= 524288
                } else
                    Ul = Ul.next = l;
                return a
            }
            function zn() {
                return {
                    controller: new Up,
                    data: new Map,
                    refCount: 0
                }
            }
            function pe(t) {
                t.refCount--,
                t.refCount === 0 && _p(rp, function() {
                    t.controller.abort()
                })
            }
            function Nn() {
                var t = Sa.current;
                return t !== null ? t : ut.pooledCache
            }
            function we(t, l) {
                l === null ? N(Sa, Sa.current) : N(Sa, l.pool)
            }
            function si() {
                var t = Nn();
                return t === null ? null : {
                    parent: Ml ? dt._currentValue : dt._currentValue2,
                    pool: t
                }
            }
            function Vt(t) {
                t.flags |= 4
            }
            function mi(t, l) {
                if (t !== null && t.child === l.child)
                    return !1;
                if ((l.flags & 16) !== 0)
                    return !0;
                for (t = l.child; t !== null; ) {
                    if ((t.flags & 13878) !== 0 || (t.subtreeFlags & 13878) !== 0)
                        return !0;
                    t = t.sibling
                }
                return !1
            }
            function Tn(t, l, a, e) {
                if (gt)
                    for (a = l.child; a !== null; ) {
                        if (a.tag === 5 || a.tag === 6)
                            $n(t, a.stateNode);
                        else if (!(a.tag === 4 || Dt && a.tag === 27) && a.child !== null) {
                            a.child.return = a,
                            a = a.child;
                            continue
                        }
                        if (a === l)
                            break;
                        for (; a.sibling === null; ) {
                            if (a.return === null || a.return === l)
                                return;
                            a = a.return
                        }
                        a.sibling.return = a.return,
                        a = a.sibling
                    }
                else if (Jl)
                    for (var u = l.child; u !== null; ) {
                        if (u.tag === 5) {
                            var n = u.stateNode;
                            a && e && (n = ys(n, u.type, u.memoizedProps)),
                            $n(t, n)
                        } else if (u.tag === 6)
                            n = u.stateNode,
                            a && e && (n = Ss(n, u.memoizedProps)),
                            $n(t, n);
                        else if (u.tag !== 4) {
                            if (u.tag === 22 && u.memoizedState !== null)
                                n = u.child,
                                n !== null && (n.return = u),
                                Tn(t, u, !0, !0);
                            else if (u.child !== null) {
                                u.child.return = u,
                                u = u.child;
                                continue
                            }
                        }
                        if (u === l)
                            break;
                        for (; u.sibling === null; ) {
                            if (u.return === null || u.return === l)
                                return;
                            u = u.return
                        }
                        u.sibling.return = u.return,
                        u = u.sibling
                    }
            }
            function vi(t, l, a, e) {
                if (Jl)
                    for (var u = l.child; u !== null; ) {
                        if (u.tag === 5) {
                            var n = u.stateNode;
                            a && e && (n = ys(n, u.type, u.memoizedProps)),
                            os(t, n)
                        } else if (u.tag === 6)
                            n = u.stateNode,
                            a && e && (n = Ss(n, u.memoizedProps)),
                            os(t, n);
                        else if (u.tag !== 4) {
                            if (u.tag === 22 && u.memoizedState !== null)
                                n = u.child,
                                n !== null && (n.return = u),
                                vi(t, u, !(u.memoizedProps !== null && u.memoizedProps.mode === "manual"), !0);
                            else if (u.child !== null) {
                                u.child.return = u,
                                u = u.child;
                                continue
                            }
                        }
                        if (u === l)
                            break;
                        for (; u.sibling === null; ) {
                            if (u.return === null || u.return === l)
                                return;
                            u = u.return
                        }
                        u.sibling.return = u.return,
                        u = u.sibling
                    }
            }
            function pi(t, l) {
                if (Jl && mi(t, l)) {
                    t = l.stateNode;
                    var a = t.containerInfo
                      , e = ps();
                    vi(e, l, !1, !1),
                    t.pendingChildren = e,
                    Vt(l),
                    Xv(a, e)
                }
            }
            function Mn(t, l, a, e) {
                if (gt)
                    t.memoizedProps !== e && Vt(l);
                else if (Jl) {
                    var u = t.stateNode
                      , n = t.memoizedProps;
                    if ((t = mi(t, l)) || n !== e) {
                        var i = At.current;
                        n = Vv(u, a, n, e, !t, null),
                        n === u ? l.stateNode = u : (cs(n, a, e, i) && Vt(l),
                        l.stateNode = n,
                        t ? Tn(n, l, !1, !1) : Vt(l))
                    } else
                        l.stateNode = u
                }
            }
            function On(t, l, a) {
                if (dv(l, a)) {
                    if (t.flags |= 16777216,
                    !ss(l, a))
                        if (Qi())
                            t.flags |= 8192;
                        else
                            throw Za = yu,
                            vc
                } else
                    t.flags &= -16777217
            }
            function oi(t, l) {
                if (mp(l)) {
                    if (t.flags |= 16777216,
                    !_s(l))
                        if (Qi())
                            t.flags |= 8192;
                        else
                            throw Za = yu,
                            vc
                } else
                    t.flags &= -16777217
            }
            function ke(t, l) {
                l !== null && (t.flags |= 4),
                t.flags & 16384 && (l = t.tag !== 22 ? at() : 536870912,
                t.lanes |= l,
                Pa |= l)
            }
            function oe(t, l) {
                if (!P)
                    switch (t.tailMode) {
                    case "hidden":
                        l = t.tail;
                        for (var a = null; l !== null; )
                            l.alternate !== null && (a = l),
                            l = l.sibling;
                        a === null ? t.tail = null : a.sibling = null;
                        break;
                    case "collapsed":
                        a = t.tail;
                        for (var e = null; a !== null; )
                            a.alternate !== null && (e = a),
                            a = a.sibling;
                        e === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : e.sibling = null
                    }
            }
            function vt(t) {
                var l = t.alternate !== null && t.alternate.child === t.child
                  , a = 0
                  , e = 0;
                if (l)
                    for (var u = t.child; u !== null; )
                        a |= u.lanes | u.childLanes,
                        e |= u.subtreeFlags & 31457280,
                        e |= u.flags & 31457280,
                        u.return = t,
                        u = u.sibling;
                else
                    for (u = t.child; u !== null; )
                        a |= u.lanes | u.childLanes,
                        e |= u.subtreeFlags,
                        e |= u.flags,
                        u.return = t,
                        u = u.sibling;
                return t.subtreeFlags |= e,
                t.childLanes = a,
                l
            }
            function qm(t, l, a) {
                var e = l.pendingProps;
                switch (Dl(l),
                l.tag) {
                case 16:
                case 15:
                case 0:
                case 11:
                case 7:
                case 8:
                case 12:
                case 9:
                case 14:
                    return vt(l),
                    null;
                case 1:
                    return vt(l),
                    null;
                case 3:
                    return a = l.stateNode,
                    e = null,
                    t !== null && (e = t.memoizedState.cache),
                    l.memoizedState.cache !== e && (l.flags |= 2048),
                    zl(dt),
                    bl(),
                    a.pendingContext && (a.context = a.pendingContext,
                    a.pendingContext = null),
                    (t === null || t.child === null) && (le(l) ? Vt(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024,
                    il !== null && (Cn(il),
                    il = null))),
                    pi(t, l),
                    vt(l),
                    null;
                case 26:
                    if ($t) {
                        a = l.type;
                        var u = l.memoizedState;
                        return t === null ? (Vt(l),
                        u !== null ? (vt(l),
                        oi(l, u)) : (vt(l),
                        On(l, a, e))) : u ? u !== t.memoizedState ? (Vt(l),
                        vt(l),
                        oi(l, u)) : (vt(l),
                        l.flags &= -16777217) : (gt ? t.memoizedProps !== e && Vt(l) : Mn(t, l, a, e),
                        vt(l),
                        On(l, a, e)),
                        null
                    }
                case 27:
                    if (Dt) {
                        if (qe(l),
                        a = Ll.current,
                        u = l.type,
                        t !== null && l.stateNode != null)
                            gt ? t.memoizedProps !== e && Vt(l) : Mn(t, l, u, e);
                        else {
                            if (!e) {
                                if (l.stateNode === null)
                                    throw Error(m(166));
                                return vt(l),
                                null
                            }
                            t = At.current,
                            le(l) ? Fc(l, t) : (t = rs(u, e, a, t, !0),
                            l.stateNode = t,
                            Vt(l))
                        }
                        return vt(l),
                        null
                    }
                case 5:
                    if (qe(l),
                    a = l.type,
                    t !== null && l.stateNode != null)
                        Mn(t, l, a, e);
                    else {
                        if (!e) {
                            if (l.stateNode === null)
                                throw Error(m(166));
                            return vt(l),
                            null
                        }
                        t = At.current,
                        le(l) ? Fc(l, t) : (u = fv(a, e, Ll.current, t, l),
                        Tn(u, l, !1, !1),
                        l.stateNode = u,
                        cs(u, a, e, t) && Vt(l))
                    }
                    return vt(l),
                    On(l, l.type, l.pendingProps),
                    null;
                case 6:
                    if (t && l.stateNode != null)
                        a = t.memoizedProps,
                        gt ? a !== e && Vt(l) : Jl && (a !== e ? (l.stateNode = fs(e, Ll.current, At.current, l),
                        Vt(l)) : l.stateNode = t.stateNode);
                    else {
                        if (typeof e != "string" && l.stateNode === null)
                            throw Error(m(166));
                        if (t = Ll.current,
                        a = At.current,
                        le(l)) {
                            if (!It)
                                throw Error(m(176));
                            if (t = l.stateNode,
                            a = l.memoizedProps,
                            e = null,
                            u = qt,
                            u !== null)
                                switch (u.tag) {
                                case 27:
                                case 5:
                                    e = u.memoizedProps
                                }
                            wv(t, a, l, e) || la(l)
                        } else
                            l.stateNode = fs(e, t, a, l)
                    }
                    return vt(l),
                    null;
                case 13:
                    if (e = l.memoizedState,
                    t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
                        if (u = le(l),
                        e !== null && e.dehydrated !== null) {
                            if (t === null) {
                                if (!u)
                                    throw Error(m(318));
                                if (!It)
                                    throw Error(m(344));
                                if (u = l.memoizedState,
                                u = u !== null ? u.dehydrated : null,
                                !u)
                                    throw Error(m(317));
                                kv(u, l)
                            } else
                                ae(),
                                (l.flags & 128) === 0 && (l.memoizedState = null),
                                l.flags |= 4;
                            vt(l),
                            u = !1
                        } else
                            il !== null && (Cn(il),
                            il = null),
                            u = !0;
                        if (!u)
                            return l.flags & 256 ? (Sl(l),
                            l) : (Sl(l),
                            null)
                    }
                    if (Sl(l),
                    (l.flags & 128) !== 0)
                        return l.lanes = a,
                        l;
                    if (a = e !== null,
                    t = t !== null && t.memoizedState !== null,
                    a) {
                        e = l.child,
                        u = null,
                        e.alternate !== null && e.alternate.memoizedState !== null && e.alternate.memoizedState.cachePool !== null && (u = e.alternate.memoizedState.cachePool.pool);
                        var n = null;
                        e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool),
                        n !== u && (e.flags |= 2048)
                    }
                    return a !== t && a && (l.child.flags |= 8192),
                    ke(l, l.updateQueue),
                    vt(l),
                    null;
                case 4:
                    return bl(),
                    pi(t, l),
                    t === null && mv(l.stateNode.containerInfo),
                    vt(l),
                    null;
                case 10:
                    return zl(l.type),
                    vt(l),
                    null;
                case 19:
                    if (_(Ot),
                    u = l.memoizedState,
                    u === null)
                        return vt(l),
                        null;
                    if (e = (l.flags & 128) !== 0,
                    n = u.rendering,
                    n === null)
                        if (e)
                            oe(u, !1);
                        else {
                            if (St !== 0 || t !== null && (t.flags & 128) !== 0)
                                for (t = l.child; t !== null; ) {
                                    if (n = Ke(t),
                                    n !== null) {
                                        for (l.flags |= 128,
                                        oe(u, !1),
                                        t = n.updateQueue,
                                        l.updateQueue = t,
                                        ke(l, t),
                                        l.subtreeFlags = 0,
                                        t = a,
                                        a = l.child; a !== null; )
                                            Wi(a, t),
                                            a = a.sibling;
                                        return N(Ot, Ot.current & 1 | 2),
                                        l.child
                                    }
                                    t = t.sibling
                                }
                            u.tail !== null && fl() > Ae && (l.flags |= 128,
                            e = !0,
                            oe(u, !1),
                            l.lanes = 4194304)
                        }
                    else {
                        if (!e)
                            if (t = Ke(n),
                            t !== null) {
                                if (l.flags |= 128,
                                e = !0,
                                t = t.updateQueue,
                                l.updateQueue = t,
                                ke(l, t),
                                oe(u, !0),
                                u.tail === null && u.tailMode === "hidden" && !n.alternate && !P)
                                    return vt(l),
                                    null
                            } else
                                2 * fl() - u.renderingStartTime > Ae && a !== 536870912 && (l.flags |= 128,
                                e = !0,
                                oe(u, !1),
                                l.lanes = 4194304);
                        u.isBackwards ? (n.sibling = l.child,
                        l.child = n) : (t = u.last,
                        t !== null ? t.sibling = n : l.child = n,
                        u.last = n)
                    }
                    return u.tail !== null ? (l = u.tail,
                    u.rendering = l,
                    u.tail = l.sibling,
                    u.renderingStartTime = fl(),
                    l.sibling = null,
                    t = Ot.current,
                    N(Ot, e ? t & 1 | 2 : t & 1),
                    l) : (vt(l),
                    null);
                case 22:
                case 23:
                    return Sl(l),
                    xu(),
                    e = l.memoizedState !== null,
                    t !== null ? t.memoizedState !== null !== e && (l.flags |= 8192) : e && (l.flags |= 8192),
                    e ? (a & 536870912) !== 0 && (l.flags & 128) === 0 && (vt(l),
                    l.subtreeFlags & 6 && (l.flags |= 8192)) : vt(l),
                    a = l.updateQueue,
                    a !== null && ke(l, a.retryQueue),
                    a = null,
                    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool),
                    e = null,
                    l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool),
                    e !== a && (l.flags |= 2048),
                    t !== null && _(Sa),
                    null;
                case 24:
                    return a = null,
                    t !== null && (a = t.memoizedState.cache),
                    l.memoizedState.cache !== a && (l.flags |= 2048),
                    zl(dt),
                    vt(l),
                    null;
                case 25:
                    return null
                }
                throw Error(m(156, l.tag))
            }
            function Bm(t, l) {
                switch (Dl(l),
                l.tag) {
                case 1:
                    return t = l.flags,
                    t & 65536 ? (l.flags = t & -65537 | 128,
                    l) : null;
                case 3:
                    return zl(dt),
                    bl(),
                    t = l.flags,
                    (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128,
                    l) : null;
                case 26:
                case 27:
                case 5:
                    return qe(l),
                    null;
                case 13:
                    if (Sl(l),
                    t = l.memoizedState,
                    t !== null && t.dehydrated !== null) {
                        if (l.alternate === null)
                            throw Error(m(340));
                        ae()
                    }
                    return t = l.flags,
                    t & 65536 ? (l.flags = t & -65537 | 128,
                    l) : null;
                case 19:
                    return _(Ot),
                    null;
                case 4:
                    return bl(),
                    null;
                case 10:
                    return zl(l.type),
                    null;
                case 22:
                case 23:
                    return Sl(l),
                    xu(),
                    t !== null && _(Sa),
                    t = l.flags,
                    t & 65536 ? (l.flags = t & -65537 | 128,
                    l) : null;
                case 24:
                    return zl(dt),
                    null;
                case 25:
                    return null;
                default:
                    return null
                }
            }
            function di(t, l) {
                switch (Dl(l),
                l.tag) {
                case 3:
                    zl(dt),
                    bl();
                    break;
                case 26:
                case 27:
                case 5:
                    qe(l);
                    break;
                case 4:
                    bl();
                    break;
                case 13:
                    Sl(l);
                    break;
                case 19:
                    _(Ot);
                    break;
                case 10:
                    zl(l.type);
                    break;
                case 22:
                case 23:
                    Sl(l),
                    xu(),
                    t !== null && _(Sa);
                    break;
                case 24:
                    zl(dt)
                }
            }
            function de(t, l) {
                try {
                    var a = l.updateQueue
                      , e = a !== null ? a.lastEffect : null;
                    if (e !== null) {
                        var u = e.next;
                        a = u;
                        do {
                            if ((a.tag & t) === t) {
                                e = void 0;
                                var n = a.create
                                  , i = a.inst;
                                e = n(),
                                i.destroy = e
                            }
                            a = a.next
                        } while (a !== u)
                    }
                } catch (v) {
                    w(l, l.return, v)
                }
            }
            function Gl(t, l, a) {
                try {
                    var e = l.updateQueue
                      , u = e !== null ? e.lastEffect : null;
                    if (u !== null) {
                        var n = u.next;
                        e = n;
                        do {
                            if ((e.tag & t) === t) {
                                var i = e.inst
                                  , v = i.destroy;
                                if (v !== void 0) {
                                    i.destroy = void 0,
                                    u = l;
                                    var d = a;
                                    try {
                                        v()
                                    } catch (E) {
                                        w(u, d, E)
                                    }
                                }
                            }
                            e = e.next
                        } while (e !== n)
                    }
                } catch (E) {
                    w(l, l.return, E)
                }
            }
            function yi(t) {
                var l = t.updateQueue;
                if (l !== null) {
                    var a = t.stateNode;
                    try {
                        af(l, a)
                    } catch (e) {
                        w(t, t.return, e)
                    }
                }
            }
            function Si(t, l, a) {
                a.props = aa(t.type, t.memoizedProps),
                a.state = t.memoizedState;
                try {
                    a.componentWillUnmount()
                } catch (e) {
                    w(t, l, e)
                }
            }
            function ua(t, l) {
                try {
                    var a = t.ref;
                    if (a !== null) {
                        var e = t.stateNode;
                        switch (t.tag) {
                        case 26:
                        case 27:
                        case 5:
                            var u = he(e);
                            break;
                        default:
                            u = e
                        }
                        typeof a == "function" ? t.refCleanup = a(u) : a.current = u
                    }
                } catch (n) {
                    w(t, l, n)
                }
            }
            function Xt(t, l) {
                var a = t.ref
                  , e = t.refCleanup;
                if (a !== null)
                    if (typeof e == "function")
                        try {
                            e()
                        } catch (u) {
                            w(t, l, u)
                        } finally {
                            t.refCleanup = null,
                            t = t.alternate,
                            t != null && (t.refCleanup = null)
                        }
                    else if (typeof a == "function")
                        try {
                            a(null)
                        } catch (u) {
                            w(t, l, u)
                        }
                    else
                        a.current = null
            }
            function hi(t) {
                var l = t.type
                  , a = t.memoizedProps
                  , e = t.stateNode;
                try {
                    jv(e, l, a, t)
                } catch (u) {
                    w(t, t.return, u)
                }
            }
            function Ei(t, l, a) {
                try {
                    gv(t.stateNode, t.type, a, l, t)
                } catch (e) {
                    w(t, t.return, e)
                }
            }
            function zi(t) {
                return t.tag === 5 || t.tag === 3 || ($t ? t.tag === 26 : !1) || (Dt ? t.tag === 27 : !1) || t.tag === 4
            }
            function Hn(t) {
                t: for (; ; ) {
                    for (; t.sibling === null; ) {
                        if (t.return === null || zi(t.return))
                            return null;
                        t = t.return
                    }
                    for (t.sibling.return = t.return,
                    t = t.sibling; t.tag !== 5 && t.tag !== 6 && (!Dt || t.tag !== 27) && t.tag !== 18; ) {
                        if (t.flags & 2 || t.child === null || t.tag === 4)
                            continue t;
                        t.child.return = t,
                        t = t.child
                    }
                    if (!(t.flags & 2))
                        return t.stateNode
                }
            }
            function Un(t, l, a) {
                var e = t.tag;
                if (e === 5 || e === 6)
                    t = t.stateNode,
                    l ? bv(a, t, l) : rv(a, t);
                else if (!(e === 4 || Dt && e === 27) && (t = t.child,
                t !== null))
                    for (Un(t, l, a),
                    t = t.sibling; t !== null; )
                        Un(t, l, a),
                        t = t.sibling
            }
            function tu(t, l, a) {
                var e = t.tag;
                if (e === 5 || e === 6)
                    t = t.stateNode,
                    l ? Dv(a, t, l) : _v(a, t);
                else if (!(e === 4 || Dt && e === 27) && (t = t.child,
                t !== null))
                    for (tu(t, l, a),
                    t = t.sibling; t !== null; )
                        tu(t, l, a),
                        t = t.sibling
            }
            function Ni(t, l, a) {
                t = t.containerInfo;
                try {
                    ds(t, a)
                } catch (e) {
                    w(l, l.return, e)
                }
            }
            function Qm(t, l) {
                for (nv(t.containerInfo),
                Ut = l; Ut !== null; )
                    if (t = Ut,
                    l = t.child,
                    (t.subtreeFlags & 1028) !== 0 && l !== null)
                        l.return = t,
                        Ut = l;
                    else
                        for (; Ut !== null; ) {
                            t = Ut;
                            var a = t.alternate;
                            switch (l = t.flags,
                            t.tag) {
                            case 0:
                                break;
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if ((l & 1024) !== 0 && a !== null) {
                                    l = void 0;
                                    var e = t
                                      , u = a.memoizedProps;
                                    a = a.memoizedState;
                                    var n = e.stateNode;
                                    try {
                                        var i = aa(e.type, u, e.elementType === e.type);
                                        l = n.getSnapshotBeforeUpdate(i, a),
                                        n.__reactInternalSnapshotBeforeUpdate = l
                                    } catch (v) {
                                        w(e, e.return, v)
                                    }
                                }
                                break;
                            case 3:
                                (l & 1024) !== 0 && gt && Gv(t.stateNode.containerInfo);
                                break;
                            case 5:
                            case 26:
                            case 27:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                if ((l & 1024) !== 0)
                                    throw Error(m(163))
                            }
                            if (l = t.sibling,
                            l !== null) {
                                l.return = t.return,
                                Ut = l;
                                break
                            }
                            Ut = t.return
                        }
                return i = Bs,
                Bs = !1,
                i
            }
            function Ti(t, l, a) {
                var e = a.flags;
                switch (a.tag) {
                case 0:
                case 11:
                case 15:
                    Nl(t, a),
                    e & 4 && de(5, a);
                    break;
                case 1:
                    if (Nl(t, a),
                    e & 4)
                        if (t = a.stateNode,
                        l === null)
                            try {
                                t.componentDidMount()
                            } catch (v) {
                                w(a, a.return, v)
                            }
                        else {
                            var u = aa(a.type, l.memoizedProps);
                            l = l.memoizedState;
                            try {
                                t.componentDidUpdate(u, l, t.__reactInternalSnapshotBeforeUpdate)
                            } catch (v) {
                                w(a, a.return, v)
                            }
                        }
                    e & 64 && yi(a),
                    e & 512 && ua(a, a.return);
                    break;
                case 3:
                    if (Nl(t, a),
                    e & 64 && (e = a.updateQueue,
                    e !== null)) {
                        if (t = null,
                        a.child !== null)
                            switch (a.child.tag) {
                            case 27:
                            case 5:
                                t = he(a.child.stateNode);
                                break;
                            case 1:
                                t = a.child.stateNode
                            }
                        try {
                            af(e, t)
                        } catch (v) {
                            w(a, a.return, v)
                        }
                    }
                    break;
                case 26:
                    if ($t) {
                        Nl(t, a),
                        e & 512 && ua(a, a.return);
                        break
                    }
                case 27:
                case 5:
                    Nl(t, a),
                    l === null && e & 4 && hi(a),
                    e & 512 && ua(a, a.return);
                    break;
                case 12:
                    Nl(t, a);
                    break;
                case 13:
                    Nl(t, a),
                    e & 4 && Oi(t, a);
                    break;
                case 22:
                    if (u = a.memoizedState !== null || _l,
                    !u) {
                        l = l !== null && l.memoizedState !== null || yt;
                        var n = _l
                          , i = yt;
                        _l = u,
                        (yt = l) && !i ? Vl(t, a, (a.subtreeFlags & 8772) !== 0) : Nl(t, a),
                        _l = n,
                        yt = i
                    }
                    e & 512 && (a.memoizedProps.mode === "manual" ? ua(a, a.return) : Xt(a, a.return));
                    break;
                default:
                    Nl(t, a)
                }
            }
            function Mi(t) {
                var l = t.alternate;
                l !== null && (t.alternate = null,
                Mi(l)),
                t.child = null,
                t.deletions = null,
                t.sibling = null,
                t.tag === 5 && (l = t.stateNode,
                l !== null && ov(l)),
                t.stateNode = null,
                t.return = null,
                t.dependencies = null,
                t.memoizedProps = null,
                t.memoizedState = null,
                t.pendingProps = null,
                t.stateNode = null,
                t.updateQueue = null
            }
            function cl(t, l, a) {
                for (a = a.child; a !== null; )
                    _n(t, l, a),
                    a = a.sibling
            }
            function _n(t, l, a) {
                if (Lt && typeof Lt.onCommitFiberUnmount == "function")
                    try {
                        Lt.onCommitFiberUnmount(Ne, a)
                    } catch {}
                switch (a.tag) {
                case 26:
                    if ($t) {
                        yt || Xt(a, l),
                        cl(t, l, a),
                        a.memoizedState ? Os(a.memoizedState) : a.stateNode && Us(a.stateNode);
                        break
                    }
                case 27:
                    if (Dt) {
                        yt || Xt(a, l);
                        var e = Tt
                          , u = Ft;
                        Tt = a.stateNode,
                        cl(t, l, a),
                        dp(a.stateNode),
                        Tt = e,
                        Ft = u;
                        break
                    }
                case 5:
                    yt || Xt(a, l);
                case 6:
                    if (gt) {
                        if (e = Tt,
                        u = Ft,
                        Tt = null,
                        cl(t, l, a),
                        Tt = e,
                        Ft = u,
                        Tt !== null)
                            if (Ft)
                                try {
                                    Cv(Tt, a.stateNode)
                                } catch (n) {
                                    w(a, l, n)
                                }
                            else
                                try {
                                    Rv(Tt, a.stateNode)
                                } catch (n) {
                                    w(a, l, n)
                                }
                    } else
                        cl(t, l, a);
                    break;
                case 18:
                    gt && Tt !== null && (Ft ? up(Tt, a.stateNode) : ep(Tt, a.stateNode));
                    break;
                case 4:
                    gt ? (e = Tt,
                    u = Ft,
                    Tt = a.stateNode.containerInfo,
                    Ft = !0,
                    cl(t, l, a),
                    Tt = e,
                    Ft = u) : (Jl && Ni(a.stateNode, a, ps()),
                    cl(t, l, a));
                    break;
                case 0:
                case 11:
                case 14:
                case 15:
                    yt || Gl(2, a, l),
                    yt || Gl(4, a, l),
                    cl(t, l, a);
                    break;
                case 1:
                    yt || (Xt(a, l),
                    e = a.stateNode,
                    typeof e.componentWillUnmount == "function" && Si(a, l, e)),
                    cl(t, l, a);
                    break;
                case 21:
                    cl(t, l, a);
                    break;
                case 22:
                    yt || Xt(a, l),
                    yt = (e = yt) || a.memoizedState !== null,
                    cl(t, l, a),
                    yt = e;
                    break;
                default:
                    cl(t, l, a)
                }
            }
            function Oi(t, l) {
                if (It && l.memoizedState === null && (t = l.alternate,
                t !== null && (t = t.memoizedState,
                t !== null && (t = t.dehydrated,
                t !== null))))
                    try {
                        ap(t)
                    } catch (a) {
                        w(l, l.return, a)
                    }
            }
            function Ym(t) {
                switch (t.tag) {
                case 13:
                case 19:
                    var l = t.stateNode;
                    return l === null && (l = t.stateNode = new qs),
                    l;
                case 22:
                    return t = t.stateNode,
                    l = t._retryCache,
                    l === null && (l = t._retryCache = new qs),
                    l;
                default:
                    throw Error(m(435, t.tag))
                }
            }
            function rn(t, l) {
                var a = Ym(t);
                l.forEach(function(e) {
                    var u = Lm.bind(null, t, e);
                    a.has(e) || (a.add(e),
                    e.then(u, u))
                })
            }
            function Yt(t, l) {
                var a = l.deletions;
                if (a !== null)
                    for (var e = 0; e < a.length; e++) {
                        var u = a[e]
                          , n = t
                          , i = l;
                        if (gt) {
                            var v = i;
                            t: for (; v !== null; ) {
                                switch (v.tag) {
                                case 27:
                                case 5:
                                    Tt = v.stateNode,
                                    Ft = !1;
                                    break t;
                                case 3:
                                    Tt = v.stateNode.containerInfo,
                                    Ft = !0;
                                    break t;
                                case 4:
                                    Tt = v.stateNode.containerInfo,
                                    Ft = !0;
                                    break t
                                }
                                v = v.return
                            }
                            if (Tt === null)
                                throw Error(m(160));
                            _n(n, i, u),
                            Tt = null,
                            Ft = !1
                        } else
                            _n(n, i, u);
                        n = u.alternate,
                        n !== null && (n.return = null),
                        u.return = null
                    }
                if (l.subtreeFlags & 13878)
                    for (l = l.child; l !== null; )
                        Hi(l, t),
                        l = l.sibling
            }
            function Hi(t, l) {
                var a = t.alternate
                  , e = t.flags;
                switch (t.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                    Yt(l, t),
                    Zt(t),
                    e & 4 && (Gl(3, t, t.return),
                    de(3, t),
                    Gl(5, t, t.return));
                    break;
                case 1:
                    Yt(l, t),
                    Zt(t),
                    e & 512 && (yt || a === null || Xt(a, a.return)),
                    e & 64 && _l && (t = t.updateQueue,
                    t !== null && (e = t.callbacks,
                    e !== null && (a = t.shared.hiddenCallbacks,
                    t.shared.hiddenCallbacks = a === null ? e : a.concat(e))));
                    break;
                case 26:
                    if ($t) {
                        var u = sl;
                        Yt(l, t),
                        Zt(t),
                        e & 512 && (yt || a === null || Xt(a, a.return)),
                        e & 4 && (e = a !== null ? a.memoizedState : null,
                        l = t.memoizedState,
                        a === null ? l === null ? t.stateNode === null ? t.stateNode = fp(u, t.type, t.memoizedProps, t) : Hs(u, t.type, t.stateNode) : t.stateNode = Ms(u, l, t.memoizedProps) : e !== l ? (e === null ? a.stateNode !== null && Us(a.stateNode) : Os(e),
                        l === null ? Hs(u, t.type, t.stateNode) : Ms(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && Ei(t, t.memoizedProps, a.memoizedProps));
                        break
                    }
                case 27:
                    if (Dt && e & 4 && t.alternate === null) {
                        u = t.stateNode;
                        var n = t.memoizedProps;
                        try {
                            pp(u),
                            op(t.type, n, u, t)
                        } catch (H) {
                            w(t, t.return, H)
                        }
                    }
                case 5:
                    if (Yt(l, t),
                    Zt(t),
                    e & 512 && (yt || a === null || Xt(a, a.return)),
                    gt) {
                        if (t.flags & 32) {
                            l = t.stateNode;
                            try {
                                vs(l)
                            } catch (H) {
                                w(t, t.return, H)
                            }
                        }
                        e & 4 && t.stateNode != null && (l = t.memoizedProps,
                        Ei(t, l, a !== null ? a.memoizedProps : l)),
                        e & 1024 && (yc = !0)
                    }
                    break;
                case 6:
                    if (Yt(l, t),
                    Zt(t),
                    e & 4 && gt) {
                        if (t.stateNode === null)
                            throw Error(m(162));
                        e = t.memoizedProps,
                        a = a !== null ? a.memoizedProps : e,
                        l = t.stateNode;
                        try {
                            Av(l, a, e)
                        } catch (H) {
                            w(t, t.return, H)
                        }
                    }
                    break;
                case 3:
                    if ($t ? (sp(),
                    u = sl,
                    sl = lc(l.containerInfo),
                    Yt(l, t),
                    sl = u) : Yt(l, t),
                    Zt(t),
                    e & 4) {
                        if (gt && It && a !== null && a.memoizedState.isDehydrated)
                            try {
                                lp(l.containerInfo)
                            } catch (H) {
                                w(t, t.return, H)
                            }
                        if (Jl) {
                            e = l.containerInfo,
                            a = l.pendingChildren;
                            try {
                                ds(e, a)
                            } catch (H) {
                                w(t, t.return, H)
                            }
                        }
                    }
                    yc && (yc = !1,
                    Ui(t));
                    break;
                case 4:
                    $t ? (a = sl,
                    sl = lc(t.stateNode.containerInfo),
                    Yt(l, t),
                    Zt(t),
                    sl = a) : (Yt(l, t),
                    Zt(t)),
                    e & 4 && Jl && Ni(t.stateNode, t, t.stateNode.pendingChildren);
                    break;
                case 12:
                    Yt(l, t),
                    Zt(t);
                    break;
                case 13:
                    Yt(l, t),
                    Zt(t),
                    t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (zc = fl()),
                    e & 4 && (e = t.updateQueue,
                    e !== null && (t.updateQueue = null,
                    rn(t, e)));
                    break;
                case 22:
                    e & 512 && (yt || a === null || Xt(a, a.return)),
                    u = t.memoizedState !== null;
                    var i = a !== null && a.memoizedState !== null
                      , v = _l
                      , d = yt;
                    if (_l = v || u,
                    yt = d || i,
                    Yt(l, t),
                    yt = d,
                    _l = v,
                    Zt(t),
                    l = t.stateNode,
                    l._current = t,
                    l._visibility &= -3,
                    l._visibility |= l._pendingVisibility & 2,
                    e & 8192 && (l._visibility = u ? l._visibility & -2 : l._visibility | 1,
                    u && (l = _l || yt,
                    a === null || i || l || _a(t)),
                    gt && (t.memoizedProps === null || t.memoizedProps.mode !== "manual"))) {
                        t: if (a = null,
                        gt)
                            for (l = t; ; ) {
                                if (l.tag === 5 || $t && l.tag === 26 || Dt && l.tag === 27) {
                                    if (a === null) {
                                        i = a = l;
                                        try {
                                            n = i.stateNode,
                                            u ? qv(n) : Qv(i.stateNode, i.memoizedProps)
                                        } catch (H) {
                                            w(i, i.return, H)
                                        }
                                    }
                                } else if (l.tag === 6) {
                                    if (a === null) {
                                        i = l;
                                        try {
                                            var E = i.stateNode;
                                            u ? Bv(E) : Yv(E, i.memoizedProps)
                                        } catch (H) {
                                            w(i, i.return, H)
                                        }
                                    }
                                } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
                                    l.child.return = l,
                                    l = l.child;
                                    continue
                                }
                                if (l === t)
                                    break t;
                                for (; l.sibling === null; ) {
                                    if (l.return === null || l.return === t)
                                        break t;
                                    a === l && (a = null),
                                    l = l.return
                                }
                                a === l && (a = null),
                                l.sibling.return = l.return,
                                l = l.sibling
                            }
                    }
                    e & 4 && (e = t.updateQueue,
                    e !== null && (a = e.retryQueue,
                    a !== null && (e.retryQueue = null,
                    rn(t, a))));
                    break;
                case 19:
                    Yt(l, t),
                    Zt(t),
                    e & 4 && (e = t.updateQueue,
                    e !== null && (t.updateQueue = null,
                    rn(t, e)));
                    break;
                case 21:
                    break;
                default:
                    Yt(l, t),
                    Zt(t)
                }
            }
            function Zt(t) {
                var l = t.flags;
                if (l & 2) {
                    try {
                        if (gt && (!Dt || t.tag !== 27)) {
                            t: {
                                for (var a = t.return; a !== null; ) {
                                    if (zi(a)) {
                                        var e = a;
                                        break t
                                    }
                                    a = a.return
                                }
                                throw Error(m(160))
                            }
                            switch (e.tag) {
                            case 27:
                                if (Dt) {
                                    var u = e.stateNode
                                      , n = Hn(t);
                                    tu(t, n, u);
                                    break
                                }
                            case 5:
                                var i = e.stateNode;
                                e.flags & 32 && (vs(i),
                                e.flags &= -33);
                                var v = Hn(t);
                                tu(t, v, i);
                                break;
                            case 3:
                            case 4:
                                var d = e.stateNode.containerInfo
                                  , E = Hn(t);
                                Un(t, E, d);
                                break;
                            default:
                                throw Error(m(161))
                            }
                        }
                    } catch (H) {
                        w(t, t.return, H)
                    }
                    t.flags &= -3
                }
                l & 4096 && (t.flags &= -4097)
            }
            function Ui(t) {
                if (t.subtreeFlags & 1024)
                    for (t = t.child; t !== null; ) {
                        var l = t;
                        Ui(l),
                        l.tag === 5 && l.flags & 1024 && hv(l.stateNode),
                        t = t.sibling
                    }
            }
            function Nl(t, l) {
                if (l.subtreeFlags & 8772)
                    for (l = l.child; l !== null; )
                        Ti(t, l.alternate, l),
                        l = l.sibling
            }
            function _a(t) {
                for (t = t.child; t !== null; ) {
                    var l = t;
                    switch (l.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                        Gl(4, l, l.return),
                        _a(l);
                        break;
                    case 1:
                        Xt(l, l.return);
                        var a = l.stateNode;
                        typeof a.componentWillUnmount == "function" && Si(l, l.return, a),
                        _a(l);
                        break;
                    case 26:
                    case 27:
                    case 5:
                        Xt(l, l.return),
                        _a(l);
                        break;
                    case 22:
                        Xt(l, l.return),
                        l.memoizedState === null && _a(l);
                        break;
                    default:
                        _a(l)
                    }
                    t = t.sibling
                }
            }
            function Vl(t, l, a) {
                for (a = a && (l.subtreeFlags & 8772) !== 0,
                l = l.child; l !== null; ) {
                    var e = l.alternate
                      , u = t
                      , n = l
                      , i = n.flags;
                    switch (n.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Vl(u, n, a),
                        de(4, n);
                        break;
                    case 1:
                        if (Vl(u, n, a),
                        e = n,
                        u = e.stateNode,
                        typeof u.componentDidMount == "function")
                            try {
                                u.componentDidMount()
                            } catch (E) {
                                w(e, e.return, E)
                            }
                        if (e = n,
                        u = e.updateQueue,
                        u !== null) {
                            var v = e.stateNode;
                            try {
                                var d = u.shared.hiddenCallbacks;
                                if (d !== null)
                                    for (u.shared.hiddenCallbacks = null,
                                    u = 0; u < d.length; u++)
                                        lf(d[u], v)
                            } catch (E) {
                                w(e, e.return, E)
                            }
                        }
                        a && i & 64 && yi(n),
                        ua(n, n.return);
                        break;
                    case 26:
                    case 27:
                    case 5:
                        Vl(u, n, a),
                        a && e === null && i & 4 && hi(n),
                        ua(n, n.return);
                        break;
                    case 12:
                        Vl(u, n, a);
                        break;
                    case 13:
                        Vl(u, n, a),
                        a && i & 4 && Oi(u, n);
                        break;
                    case 22:
                        n.memoizedState === null && Vl(u, n, a),
                        ua(n, n.return);
                        break;
                    default:
                        Vl(u, n, a)
                    }
                    l = l.sibling
                }
            }
            function An(t, l) {
                var a = null;
                t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool),
                t = null,
                l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool),
                t !== a && (t != null && t.refCount++,
                a != null && pe(a))
            }
            function jn(t, l) {
                t = null,
                l.alternate !== null && (t = l.alternate.memoizedState.cache),
                l = l.memoizedState.cache,
                l !== t && (l.refCount++,
                t != null && pe(t))
            }
            function Xl(t, l, a, e) {
                if (l.subtreeFlags & 10256)
                    for (l = l.child; l !== null; )
                        _i(t, l, a, e),
                        l = l.sibling
            }
            function _i(t, l, a, e) {
                var u = l.flags;
                switch (l.tag) {
                case 0:
                case 11:
                case 15:
                    Xl(t, l, a, e),
                    u & 2048 && de(9, l);
                    break;
                case 3:
                    Xl(t, l, a, e),
                    u & 2048 && (t = null,
                    l.alternate !== null && (t = l.alternate.memoizedState.cache),
                    l = l.memoizedState.cache,
                    l !== t && (l.refCount++,
                    t != null && pe(t)));
                    break;
                case 12:
                    if (u & 2048) {
                        Xl(t, l, a, e),
                        t = l.stateNode;
                        try {
                            var n = l.memoizedProps
                              , i = n.id
                              , v = n.onPostCommit;
                            typeof v == "function" && v(i, l.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0)
                        } catch (d) {
                            w(l, l.return, d)
                        }
                    } else
                        Xl(t, l, a, e);
                    break;
                case 23:
                    break;
                case 22:
                    n = l.stateNode,
                    l.memoizedState !== null ? n._visibility & 4 ? Xl(t, l, a, e) : ye(t, l) : n._visibility & 4 ? Xl(t, l, a, e) : (n._visibility |= 4,
                    ra(t, l, a, e, (l.subtreeFlags & 10256) !== 0)),
                    u & 2048 && An(l.alternate, l);
                    break;
                case 24:
                    Xl(t, l, a, e),
                    u & 2048 && jn(l.alternate, l);
                    break;
                default:
                    Xl(t, l, a, e)
                }
            }
            function ra(t, l, a, e, u) {
                for (u = u && (l.subtreeFlags & 10256) !== 0,
                l = l.child; l !== null; ) {
                    var n = t
                      , i = l
                      , v = a
                      , d = e
                      , E = i.flags;
                    switch (i.tag) {
                    case 0:
                    case 11:
                    case 15:
                        ra(n, i, v, d, u),
                        de(8, i);
                        break;
                    case 23:
                        break;
                    case 22:
                        var H = i.stateNode;
                        i.memoizedState !== null ? H._visibility & 4 ? ra(n, i, v, d, u) : ye(n, i) : (H._visibility |= 4,
                        ra(n, i, v, d, u)),
                        u && E & 2048 && An(i.alternate, i);
                        break;
                    case 24:
                        ra(n, i, v, d, u),
                        u && E & 2048 && jn(i.alternate, i);
                        break;
                    default:
                        ra(n, i, v, d, u)
                    }
                    l = l.sibling
                }
            }
            function ye(t, l) {
                if (l.subtreeFlags & 10256)
                    for (l = l.child; l !== null; ) {
                        var a = t
                          , e = l
                          , u = e.flags;
                        switch (e.tag) {
                        case 22:
                            ye(a, e),
                            u & 2048 && An(e.alternate, e);
                            break;
                        case 24:
                            ye(a, e),
                            u & 2048 && jn(e.alternate, e);
                            break;
                        default:
                            ye(a, e)
                        }
                        l = l.sibling
                    }
            }
            function na(t) {
                if (t.subtreeFlags & Wa)
                    for (t = t.child; t !== null; )
                        ri(t),
                        t = t.sibling
            }
            function ri(t) {
                switch (t.tag) {
                case 26:
                    na(t),
                    t.flags & Wa && (t.memoizedState !== null ? vp(sl, t.memoizedState, t.memoizedProps) : ms(t.type, t.memoizedProps));
                    break;
                case 5:
                    na(t),
                    t.flags & Wa && ms(t.type, t.memoizedProps);
                    break;
                case 3:
                case 4:
                    if ($t) {
                        var l = sl;
                        sl = lc(t.stateNode.containerInfo),
                        na(t),
                        sl = l
                    } else
                        na(t);
                    break;
                case 22:
                    t.memoizedState === null && (l = t.alternate,
                    l !== null && l.memoizedState !== null ? (l = Wa,
                    Wa = 16777216,
                    na(t),
                    Wa = l) : na(t));
                    break;
                default:
                    na(t)
                }
            }
            function Ai(t) {
                var l = t.alternate;
                if (l !== null && (t = l.child,
                t !== null)) {
                    l.child = null;
                    do
                        l = t.sibling,
                        t.sibling = null,
                        t = l;
                    while (t !== null)
                }
            }
            function Se(t) {
                var l = t.deletions;
                if ((t.flags & 16) !== 0) {
                    if (l !== null)
                        for (var a = 0; a < l.length; a++) {
                            var e = l[a];
                            Ut = e,
                            gi(e, t)
                        }
                    Ai(t)
                }
                if (t.subtreeFlags & 10256)
                    for (t = t.child; t !== null; )
                        ji(t),
                        t = t.sibling
            }
            function ji(t) {
                switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    Se(t),
                    t.flags & 2048 && Gl(9, t, t.return);
                    break;
                case 3:
                    Se(t);
                    break;
                case 12:
                    Se(t);
                    break;
                case 22:
                    var l = t.stateNode;
                    t.memoizedState !== null && l._visibility & 4 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -5,
                    lu(t)) : Se(t);
                    break;
                default:
                    Se(t)
                }
            }
            function lu(t) {
                var l = t.deletions;
                if ((t.flags & 16) !== 0) {
                    if (l !== null)
                        for (var a = 0; a < l.length; a++) {
                            var e = l[a];
                            Ut = e,
                            gi(e, t)
                        }
                    Ai(t)
                }
                for (t = t.child; t !== null; ) {
                    switch (l = t,
                    l.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Gl(8, l, l.return),
                        lu(l);
                        break;
                    case 22:
                        a = l.stateNode,
                        a._visibility & 4 && (a._visibility &= -5,
                        lu(l));
                        break;
                    default:
                        lu(l)
                    }
                    t = t.sibling
                }
            }
            function gi(t, l) {
                for (; Ut !== null; ) {
                    var a = Ut;
                    switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Gl(8, a, l);
                        break;
                    case 23:
                    case 22:
                        if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
                            var e = a.memoizedState.cachePool.pool;
                            e != null && e.refCount++
                        }
                        break;
                    case 24:
                        pe(a.memoizedState.cache)
                    }
                    if (e = a.child,
                    e !== null)
                        e.return = a,
                        Ut = e;
                    else
                        t: for (a = t; Ut !== null; ) {
                            e = Ut;
                            var u = e.sibling
                              , n = e.return;
                            if (Mi(e),
                            e === a) {
                                Ut = null;
                                break t
                            }
                            if (u !== null) {
                                u.return = n,
                                Ut = u;
                                break t
                            }
                            Ut = n
                        }
                }
            }
            function gn(t) {
                var l = is(t);
                if (l != null) {
                    if (typeof l.memoizedProps["data-testname"] != "string")
                        throw Error(m(364));
                    return l
                }
                if (t = Nv(t),
                t === null)
                    throw Error(m(362));
                return t.stateNode.current
            }
            function Dn(t, l) {
                var a = t.tag;
                switch (l.$$typeof) {
                case Nu:
                    if (t.type === l.value)
                        return !0;
                    break;
                case Tu:
                    t: {
                        for (l = l.value,
                        t = [t, 0],
                        a = 0; a < t.length; ) {
                            var e = t[a++]
                              , u = e.tag
                              , n = t[a++]
                              , i = l[n];
                            if (u !== 5 && u !== 26 && u !== 27 || !ze(e)) {
                                for (; i != null && Dn(e, i); )
                                    n++,
                                    i = l[n];
                                if (n === l.length) {
                                    l = !0;
                                    break t
                                } else
                                    for (e = e.child; e !== null; )
                                        t.push(e, n),
                                        e = e.sibling
                            }
                        }
                        l = !1
                    }
                    return l;
                case Mu:
                    if ((a === 5 || a === 26 || a === 27) && Ov(t.stateNode, l.value))
                        return !0;
                    break;
                case Hu:
                    if ((a === 5 || a === 6 || a === 26 || a === 27) && (t = Mv(t),
                    t !== null && 0 <= t.indexOf(l.value)))
                        return !0;
                    break;
                case Ou:
                    if ((a === 5 || a === 26 || a === 27) && (t = t.memoizedProps["data-testname"],
                    typeof t == "string" && t.toLowerCase() === l.value.toLowerCase()))
                        return !0;
                    break;
                default:
                    throw Error(m(365))
                }
                return !1
            }
            function bn(t) {
                switch (t.$$typeof) {
                case Nu:
                    return "<" + (T(t.value) || "Unknown") + ">";
                case Tu:
                    return ":has(" + (bn(t) || "") + ")";
                case Mu:
                    return '[role="' + t.value + '"]';
                case Hu:
                    return '"' + t.value + '"';
                case Ou:
                    return '[data-testname="' + t.value + '"]';
                default:
                    throw Error(m(365))
                }
            }
            function Di(t, l) {
                var a = [];
                t = [t, 0];
                for (var e = 0; e < t.length; ) {
                    var u = t[e++]
                      , n = u.tag
                      , i = t[e++]
                      , v = l[i];
                    if (n !== 5 && n !== 26 && n !== 27 || !ze(u)) {
                        for (; v != null && Dn(u, v); )
                            i++,
                            v = l[i];
                        if (i === l.length)
                            a.push(u);
                        else
                            for (u = u.child; u !== null; )
                                t.push(u, i),
                                u = u.sibling
                    }
                }
                return a
            }
            function Rn(t, l) {
                if (!Ee)
                    throw Error(m(363));
                t = gn(t),
                t = Di(t, l),
                l = [],
                t = Array.from(t);
                for (var a = 0; a < t.length; ) {
                    var e = t[a++]
                      , u = e.tag;
                    if (u === 5 || u === 26 || u === 27)
                        ze(e) || l.push(e.stateNode);
                    else
                        for (e = e.child; e !== null; )
                            t.push(e),
                            e = e.sibling
                }
                return l
            }
            function Kt() {
                if ((tt & 2) !== 0 && L !== 0)
                    return L & -L;
                if (q.T !== null) {
                    var t = Va;
                    return t !== 0 ? t : Gu()
                }
                return vv()
            }
            function bi() {
                al === 0 && (al = (L & 536870912) === 0 || P ? pt() : 536870912);
                var t = ll.current;
                return t !== null && (t.flags |= 32),
                al
            }
            function Ct(t, l, a) {
                (t === ut && nt === 2 || t.cancelPendingCommit !== null) && (Aa(t, 0),
                Tl(t, L, al, !1)),
                et(t, a),
                ((tt & 2) === 0 || t !== ut) && (t === ut && ((tt & 2) === 0 && (ha |= a),
                St === 4 && Tl(t, L, al, !1)),
                vl(t))
            }
            function Ri(t, l, a) {
                if ((tt & 6) !== 0)
                    throw Error(m(327));
                var e = !a && (l & 60) === 0 && (l & t.expiredLanes) === 0 || B(t, l)
                  , u = e ? Xm(t, l) : Qn(t, l, !0)
                  , n = e;
                do {
                    if (u === 0) {
                        Fa && !e && Tl(t, l, 0, !1);
                        break
                    } else if (u === 6)
                        Tl(t, l, 0, !rl);
                    else {
                        if (a = t.current.alternate,
                        n && !Gm(a)) {
                            u = Qn(t, l, !1),
                            n = !1;
                            continue
                        }
                        if (u === 2) {
                            if (n = l,
                            t.errorRecoveryDisabledLanes & n)
                                var i = 0;
                            else
                                i = t.pendingLanes & -536870913,
                                i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
                            if (i !== 0) {
                                l = i;
                                t: {
                                    var v = t;
                                    u = re;
                                    var d = It && v.current.memoizedState.isDehydrated;
                                    if (d && (Aa(v, i).flags |= 256),
                                    i = Qn(v, i, !1),
                                    i !== 2) {
                                        if (Sc && !d) {
                                            v.errorRecoveryDisabledLanes |= n,
                                            ha |= n,
                                            u = 4;
                                            break t
                                        }
                                        n = yl,
                                        yl = u,
                                        n !== null && Cn(n)
                                    }
                                    u = i
                                }
                                if (n = !1,
                                u !== 2)
                                    continue
                            }
                        }
                        if (u === 1) {
                            Aa(t, 0),
                            Tl(t, l, 0, !0);
                            break
                        }
                        t: {
                            switch (e = t,
                            u) {
                            case 0:
                            case 1:
                                throw Error(m(345));
                            case 4:
                                if ((l & 4194176) === l) {
                                    Tl(e, l, al, !rl);
                                    break t
                                }
                                break;
                            case 2:
                                yl = null;
                                break;
                            case 3:
                            case 5:
                                break;
                            default:
                                throw Error(m(329))
                            }
                            if (e.finishedWork = a,
                            e.finishedLanes = l,
                            (l & 62914560) === l && (n = zc + 300 - fl(),
                            10 < n)) {
                                if (Tl(e, l, al, !rl),
                                F(e, 0) !== 0)
                                    break t;
                                e.timeoutHandle = iv(Ci.bind(null, e, a, yl, Uu, Ec, l, al, ha, Pa, rl, 2, -0, 0), n);
                                break t
                            }
                            Ci(e, a, yl, Uu, Ec, l, al, ha, Pa, rl, 0, -0, 0)
                        }
                    }
                    break
                } while (!0);
                vl(t)
            }
            function Cn(t) {
                yl === null ? yl = t : yl.push.apply(yl, t)
            }
            function Ci(t, l, a, e, u, n, i, v, d, E, H, r, j) {
                var Q = l.subtreeFlags;
                if ((Q & 8192 || (Q & 16785408) === 16785408) && (yv(),
                ri(l),
                l = Sv(),
                l !== null)) {
                    t.cancelPendingCommit = l(Ki.bind(null, t, a, e, u, i, v, d, 1, r, j)),
                    Tl(t, n, i, !E);
                    return
                }
                Ki(t, a, e, u, i, v, d, H, r, j)
            }
            function Gm(t) {
                for (var l = t; ; ) {
                    var a = l.tag;
                    if ((a === 0 || a === 11 || a === 15) && l.flags & 16384 && (a = l.updateQueue,
                    a !== null && (a = a.stores,
                    a !== null)))
                        for (var e = 0; e < a.length; e++) {
                            var u = a[e]
                              , n = u.getSnapshot;
                            u = u.value;
                            try {
                                if (!Wt(n(), u))
                                    return !1
                            } catch {
                                return !1
                            }
                        }
                    if (a = l.child,
                    l.subtreeFlags & 16384 && a !== null)
                        a.return = l,
                        l = a;
                    else {
                        if (l === t)
                            break;
                        for (; l.sibling === null; ) {
                            if (l.return === null || l.return === t)
                                return !0;
                            l = l.return
                        }
                        l.sibling.return = l.return,
                        l = l.sibling
                    }
                }
                return !0
            }
            function Tl(t, l, a, e) {
                l &= ~hc,
                l &= ~ha,
                t.suspendedLanes |= l,
                t.pingedLanes &= ~l,
                e && (t.warmLanes |= l),
                e = t.expirationTimes;
                for (var u = l; 0 < u; ) {
                    var n = 31 - Jt(u)
                      , i = 1 << n;
                    e[n] = -1,
                    u &= ~i
                }
                a !== 0 && J(t, a, l)
            }
            function qi() {
                return (tt & 6) === 0 ? (Ha(0),
                !1) : !0
            }
            function qn() {
                if (K !== null) {
                    if (nt === 0)
                        var t = K.return;
                    else
                        t = K,
                        Ul = ya = null,
                        Pu(t),
                        Ka = null,
                        He = 0,
                        t = K;
                    for (; t !== null; )
                        di(t.alternate, t),
                        t = t.return;
                    K = null
                }
            }
            function Aa(t, l) {
                t.finishedWork = null,
                t.finishedLanes = 0;
                var a = t.timeoutHandle;
                a !== wn && (t.timeoutHandle = wn,
                sv(a)),
                a = t.cancelPendingCommit,
                a !== null && (t.cancelPendingCommit = null,
                a()),
                qn(),
                ut = t,
                K = a = Zl(t.current, null),
                L = l,
                nt = 0,
                Pt = null,
                rl = !1,
                Fa = B(t, l),
                Sc = !1,
                Pa = al = hc = ha = Il = St = 0,
                yl = re = null,
                Ec = !1,
                (l & 8) !== 0 && (l |= l & 32);
                var e = t.entangledLanes;
                if (e !== 0)
                    for (t = t.entanglements,
                    e &= l; 0 < e; ) {
                        var u = 31 - Jt(e)
                          , n = 1 << u;
                        l |= t[u],
                        e &= ~n
                    }
                return Al = l,
                Be(),
                a
            }
            function Bi(t, l) {
                G = null,
                q.H = dl,
                l === Oe ? (l = nf(),
                nt = 3) : l === vc ? (l = nf(),
                nt = 4) : nt = l === Rs ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1,
                Pt = l,
                K === null && (St = 1,
                Pe(t, Rt(l, t.current)))
            }
            function Qi() {
                var t = ll.current;
                return t === null ? !0 : (L & 4194176) === L ? ol === null : (L & 62914560) === L || (L & 536870912) !== 0 ? t === ol : !1
            }
            function Yi() {
                var t = q.H;
                return q.H = dl,
                t === null ? dl : t
            }
            function Gi() {
                var t = q.A;
                return q.A = Ap,
                t
            }
            function Bn() {
                St = 4,
                rl || (L & 4194176) !== L && ll.current !== null || (Fa = !0),
                (Il & 134217727) === 0 && (ha & 134217727) === 0 || ut === null || Tl(ut, L, al, !1)
            }
            function Qn(t, l, a) {
                var e = tt;
                tt |= 2;
                var u = Yi()
                  , n = Gi();
                (ut !== t || L !== l) && (Uu = null,
                Aa(t, l)),
                l = !1;
                var i = St;
                t: do
                    try {
                        if (nt !== 0 && K !== null) {
                            var v = K
                              , d = Pt;
                            switch (nt) {
                            case 8:
                                qn(),
                                i = 6;
                                break t;
                            case 3:
                            case 2:
                            case 6:
                                ll.current === null && (l = !0);
                                var E = nt;
                                if (nt = 0,
                                Pt = null,
                                ja(t, v, d, E),
                                a && Fa) {
                                    i = 0;
                                    break t
                                }
                                break;
                            default:
                                E = nt,
                                nt = 0,
                                Pt = null,
                                ja(t, v, d, E)
                            }
                        }
                        Vm(),
                        i = St;
                        break
                    } catch (H) {
                        Bi(t, H)
                    }
                while (!0);
                return l && t.shellSuspendCounter++,
                Ul = ya = null,
                tt = e,
                q.H = u,
                q.A = n,
                K === null && (ut = null,
                L = 0,
                Be()),
                i
            }
            function Vm() {
                for (; K !== null; )
                    Vi(K)
            }
            function Xm(t, l) {
                var a = tt;
                tt |= 2;
                var e = Yi()
                  , u = Gi();
                ut !== t || L !== l ? (Uu = null,
                Ae = fl() + 500,
                Aa(t, l)) : Fa = B(t, l);
                t: do
                    try {
                        if (nt !== 0 && K !== null) {
                            l = K;
                            var n = Pt;
                            l: switch (nt) {
                            case 1:
                                nt = 0,
                                Pt = null,
                                ja(t, l, n, 1);
                                break;
                            case 2:
                                if (ef(n)) {
                                    nt = 0,
                                    Pt = null,
                                    Xi(l);
                                    break
                                }
                                l = function() {
                                    nt === 2 && ut === t && (nt = 7),
                                    vl(t)
                                }
                                ,
                                n.then(l, l);
                                break t;
                            case 3:
                                nt = 7;
                                break t;
                            case 4:
                                nt = 5;
                                break t;
                            case 7:
                                ef(n) ? (nt = 0,
                                Pt = null,
                                Xi(l)) : (nt = 0,
                                Pt = null,
                                ja(t, l, n, 7));
                                break;
                            case 5:
                                var i = null;
                                switch (K.tag) {
                                case 26:
                                    i = K.memoizedState;
                                case 5:
                                case 27:
                                    var v = K
                                      , d = v.type
                                      , E = v.pendingProps;
                                    if (i ? _s(i) : ss(d, E)) {
                                        nt = 0,
                                        Pt = null;
                                        var H = v.sibling;
                                        if (H !== null)
                                            K = H;
                                        else {
                                            var r = v.return;
                                            r !== null ? (K = r,
                                            au(r)) : K = null
                                        }
                                        break l
                                    }
                                }
                                nt = 0,
                                Pt = null,
                                ja(t, l, n, 5);
                                break;
                            case 6:
                                nt = 0,
                                Pt = null,
                                ja(t, l, n, 6);
                                break;
                            case 8:
                                qn(),
                                St = 6;
                                break t;
                            default:
                                throw Error(m(462))
                            }
                        }
                        Zm();
                        break
                    } catch (j) {
                        Bi(t, j)
                    }
                while (!0);
                return Ul = ya = null,
                q.H = e,
                q.A = u,
                tt = a,
                K !== null ? 0 : (ut = null,
                L = 0,
                Be(),
                St)
            }
            function Zm() {
                for (; K !== null && !hp(); )
                    Vi(K)
            }
            function Vi(t) {
                var l = fi(t.alternate, t, Al);
                t.memoizedProps = t.pendingProps,
                l === null ? au(t) : K = l
            }
            function Xi(t) {
                var l = t
                  , a = l.alternate;
                switch (l.tag) {
                case 15:
                case 0:
                    l = li(a, l, l.pendingProps, l.type, void 0, L);
                    break;
                case 11:
                    l = li(a, l, l.pendingProps, l.type.render, l.ref, L);
                    break;
                case 5:
                    Pu(l);
                default:
                    di(a, l),
                    l = K = Wi(l, Al),
                    l = fi(a, l, Al)
                }
                t.memoizedProps = t.pendingProps,
                l === null ? au(t) : K = l
            }
            function ja(t, l, a, e) {
                Ul = ya = null,
                Pu(l),
                Ka = null,
                He = 0;
                var u = l.return;
                try {
                    if (Rm(t, u, l, a, L)) {
                        St = 1,
                        Pe(t, Rt(a, t.current)),
                        K = null;
                        return
                    }
                } catch (n) {
                    if (u !== null)
                        throw K = u,
                        n;
                    St = 1,
                    Pe(t, Rt(a, t.current)),
                    K = null;
                    return
                }
                l.flags & 32768 ? (P || e === 1 ? t = !0 : Fa || (L & 536870912) !== 0 ? t = !1 : (rl = t = !0,
                (e === 2 || e === 3 || e === 6) && (e = ll.current,
                e !== null && e.tag === 13 && (e.flags |= 16384))),
                Zi(l, t)) : au(l)
            }
            function au(t) {
                var l = t;
                do {
                    if ((l.flags & 32768) !== 0) {
                        Zi(l, rl);
                        return
                    }
                    t = l.return;
                    var a = qm(l.alternate, l, Al);
                    if (a !== null) {
                        K = a;
                        return
                    }
                    if (l = l.sibling,
                    l !== null) {
                        K = l;
                        return
                    }
                    K = l = t
                } while (l !== null);
                St === 0 && (St = 5)
            }
            function Zi(t, l) {
                do {
                    var a = Bm(t.alternate, t);
                    if (a !== null) {
                        a.flags &= 32767,
                        K = a;
                        return
                    }
                    if (a = t.return,
                    a !== null && (a.flags |= 32768,
                    a.subtreeFlags = 0,
                    a.deletions = null),
                    !l && (t = t.sibling,
                    t !== null)) {
                        K = t;
                        return
                    }
                    K = t = a
                } while (t !== null);
                St = 6,
                K = null
            }
            function Ki(t, l, a, e, u, n, i, v, d, E) {
                var H = q.T
                  , r = ia();
                try {
                    Gt(2),
                    q.T = null,
                    Km(t, l, a, e, r, u, n, i, v, d, E)
                } finally {
                    q.T = H,
                    Gt(r)
                }
            }
            function Km(t, l, a, e, u, n, i, v) {
                do
                    ca();
                while (Ea !== null);
                if ((tt & 6) !== 0)
                    throw Error(m(327));
                var d = t.finishedWork;
                if (e = t.finishedLanes,
                d === null)
                    return null;
                if (t.finishedWork = null,
                t.finishedLanes = 0,
                d === t.current)
                    throw Error(m(177));
                t.callbackNode = null,
                t.callbackPriority = 0,
                t.cancelPendingCommit = null;
                var E = d.lanes | d.childLanes;
                if (E |= cc,
                Ma(t, e, E, n, i, v),
                t === ut && (K = ut = null,
                L = 0),
                (d.subtreeFlags & 10256) === 0 && (d.flags & 10256) === 0 || _u || (_u = !0,
                Nc = E,
                Tc = a,
                Wm(uc, function() {
                    return ca(),
                    null
                })),
                a = (d.flags & 15990) !== 0,
                (d.subtreeFlags & 15990) !== 0 || a ? (a = q.T,
                q.T = null,
                n = ia(),
                Gt(2),
                i = tt,
                tt |= 4,
                Qm(t, d),
                Hi(d, t),
                cv(t.containerInfo),
                t.current = d,
                Ti(t, d.alternate, d),
                Ep(),
                tt = i,
                Gt(n),
                q.T = a) : t.current = d,
                _u ? (_u = !1,
                Ea = t,
                je = e) : xi(t, E),
                E = t.pendingLanes,
                E === 0 && ($l = null),
                Ce(d.stateNode),
                vl(t),
                l !== null)
                    for (u = t.onRecoverableError,
                    d = 0; d < l.length; d++)
                        E = l[d],
                        u(E.value, {
                            componentStack: E.stack
                        });
                return (je & 3) !== 0 && ca(),
                E = t.pendingLanes,
                (e & 4194218) !== 0 && (E & 42) !== 0 ? t === Mc ? ge++ : (ge = 0,
                Mc = t) : ge = 0,
                Ha(0),
                null
            }
            function xi(t, l) {
                (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache,
                l != null && (t.pooledCache = null,
                pe(l)))
            }
            function ca() {
                if (Ea !== null) {
                    var t = Ea
                      , l = Nc;
                    Nc = 0;
                    var a = ul(je)
                      , e = 32 > a ? 32 : a;
                    a = q.T;
                    var u = ia();
                    try {
                        if (Gt(e),
                        q.T = null,
                        Ea === null)
                            var n = !1;
                        else {
                            e = Tc,
                            Tc = null;
                            var i = Ea
                              , v = je;
                            if (Ea = null,
                            je = 0,
                            (tt & 6) !== 0)
                                throw Error(m(331));
                            var d = tt;
                            if (tt |= 4,
                            ji(i.current),
                            _i(i, i.current, v, e),
                            tt = d,
                            Ha(0, !1),
                            Lt && typeof Lt.onPostCommitFiberRoot == "function")
                                try {
                                    Lt.onPostCommitFiberRoot(Ne, i)
                                } catch {}
                            n = !0
                        }
                        return n
                    } finally {
                        Gt(u),
                        q.T = a,
                        xi(t, l)
                    }
                }
                return !1
            }
            function Ji(t, l, a) {
                l = Rt(a, l),
                l = fn(t.stateNode, l, 2),
                t = ql(t, l, 2),
                t !== null && (et(t, 2),
                vl(t))
            }
            function w(t, l, a) {
                if (t.tag === 3)
                    Ji(t, t, a);
                else
                    for (; l !== null; ) {
                        if (l.tag === 3) {
                            Ji(l, t, a);
                            break
                        } else if (l.tag === 1) {
                            var e = l.stateNode;
                            if (typeof l.type.getDerivedStateFromError == "function" || typeof e.componentDidCatch == "function" && ($l === null || !$l.has(e))) {
                                t = Rt(a, t),
                                a = Ff(2),
                                e = ql(l, a, 2),
                                e !== null && (Pf(a, e, l, t),
                                et(e, 2),
                                vl(e));
                                break
                            }
                        }
                        l = l.return
                    }
            }
            function Yn(t, l, a) {
                var e = t.pingCache;
                if (e === null) {
                    e = t.pingCache = new jp;
                    var u = new Set;
                    e.set(l, u)
                } else
                    u = e.get(l),
                    u === void 0 && (u = new Set,
                    e.set(l, u));
                u.has(a) || (Sc = !0,
                u.add(a),
                t = xm.bind(null, t, l, a),
                l.then(t, t))
            }
            function xm(t, l, a) {
                var e = t.pingCache;
                e !== null && e.delete(l),
                t.pingedLanes |= t.suspendedLanes & a,
                t.warmLanes &= ~a,
                ut === t && (L & a) === a && (St === 4 || St === 3 && (L & 62914560) === L && 300 > fl() - zc ? (tt & 2) === 0 && Aa(t, 0) : hc |= a,
                Pa === L && (Pa = 0)),
                vl(t)
            }
            function Li(t, l) {
                l === 0 && (l = at()),
                t = Rl(t, l),
                t !== null && (et(t, l),
                vl(t))
            }
            function Jm(t) {
                var l = t.memoizedState
                  , a = 0;
                l !== null && (a = l.retryLane),
                Li(t, a)
            }
            function Lm(t, l) {
                var a = 0;
                switch (t.tag) {
                case 13:
                    var e = t.stateNode
                      , u = t.memoizedState;
                    u !== null && (a = u.retryLane);
                    break;
                case 19:
                    e = t.stateNode;
                    break;
                case 22:
                    e = t.stateNode._retryCache;
                    break;
                default:
                    throw Error(m(314))
                }
                e !== null && e.delete(l),
                Li(t, a)
            }
            function Wm(t, l) {
                return su(t, l)
            }
            function Fm(t, l, a, e) {
                this.tag = t,
                this.key = a,
                this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
                this.index = 0,
                this.refCleanup = this.ref = null,
                this.pendingProps = l,
                this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
                this.mode = e,
                this.subtreeFlags = this.flags = 0,
                this.deletions = null,
                this.childLanes = this.lanes = 0,
                this.alternate = null
            }
            function Gn(t) {
                return t = t.prototype,
                !(!t || !t.isReactComponent)
            }
            function Zl(t, l) {
                var a = t.alternate;
                return a === null ? (a = s(t.tag, l, t.key, t.mode),
                a.elementType = t.elementType,
                a.type = t.type,
                a.stateNode = t.stateNode,
                a.alternate = t,
                t.alternate = a) : (a.pendingProps = l,
                a.type = t.type,
                a.flags = 0,
                a.subtreeFlags = 0,
                a.deletions = null),
                a.flags = t.flags & 31457280,
                a.childLanes = t.childLanes,
                a.lanes = t.lanes,
                a.child = t.child,
                a.memoizedProps = t.memoizedProps,
                a.memoizedState = t.memoizedState,
                a.updateQueue = t.updateQueue,
                l = t.dependencies,
                a.dependencies = l === null ? null : {
                    lanes: l.lanes,
                    firstContext: l.firstContext
                },
                a.sibling = t.sibling,
                a.index = t.index,
                a.ref = t.ref,
                a.refCleanup = t.refCleanup,
                a
            }
            function Wi(t, l) {
                t.flags &= 31457282;
                var a = t.alternate;
                return a === null ? (t.childLanes = 0,
                t.lanes = l,
                t.child = null,
                t.subtreeFlags = 0,
                t.memoizedProps = null,
                t.memoizedState = null,
                t.updateQueue = null,
                t.dependencies = null,
                t.stateNode = null) : (t.childLanes = a.childLanes,
                t.lanes = a.lanes,
                t.child = a.child,
                t.subtreeFlags = 0,
                t.deletions = null,
                t.memoizedProps = a.memoizedProps,
                t.memoizedState = a.memoizedState,
                t.updateQueue = a.updateQueue,
                t.type = a.type,
                l = a.dependencies,
                t.dependencies = l === null ? null : {
                    lanes: l.lanes,
                    firstContext: l.firstContext
                }),
                t
            }
            function eu(t, l, a, e, u, n) {
                var i = 0;
                if (e = t,
                typeof t == "function")
                    Gn(t) && (i = 1);
                else if (typeof t == "string")
                    i = $t && Dt ? Ns(t, a, At.current) ? 26 : As(t) ? 27 : 5 : $t ? Ns(t, a, At.current) ? 26 : 5 : Dt && As(t) ? 27 : 5;
                else
                    t: switch (t) {
                    case Da:
                        return fa(a.children, u, n, l);
                    case ts:
                        i = 8,
                        u |= 24;
                        break;
                    case xn:
                        return t = s(12, a, l, u | 2),
                        t.elementType = xn,
                        t.lanes = n,
                        t;
                    case Ln:
                        return t = s(13, a, l, u),
                        t.elementType = Ln,
                        t.lanes = n,
                        t;
                    case Wn:
                        return t = s(19, a, l, u),
                        t.elementType = Wn,
                        t.lanes = n,
                        t;
                    case as:
                        return Fi(a, u, n, l);
                    default:
                        if (typeof t == "object" && t !== null)
                            switch (t.$$typeof) {
                            case wm:
                            case Kl:
                                i = 10;
                                break t;
                            case ls:
                                i = 9;
                                break t;
                            case Jn:
                                i = 11;
                                break t;
                            case Fn:
                                i = 14;
                                break t;
                            case xl:
                                i = 16,
                                e = null;
                                break t
                            }
                        i = 29,
                        a = Error(m(130, t === null ? "null" : typeof t, "")),
                        e = null
                    }
                return l = s(i, a, l, u),
                l.elementType = t,
                l.type = e,
                l.lanes = n,
                l
            }
            function fa(t, l, a, e) {
                return t = s(7, t, e, l),
                t.lanes = a,
                t
            }
            function Fi(t, l, a, e) {
                t = s(22, t, e, l),
                t.elementType = as,
                t.lanes = a;
                var u = {
                    _visibility: 1,
                    _pendingVisibility: 1,
                    _pendingMarkers: null,
                    _retryCache: null,
                    _transitions: null,
                    _current: null,
                    detach: function() {
                        var n = u._current;
                        if (n === null)
                            throw Error(m(456));
                        if ((u._pendingVisibility & 2) === 0) {
                            var i = Rl(n, 2);
                            i !== null && (u._pendingVisibility |= 2,
                            Ct(i, n, 2))
                        }
                    },
                    attach: function() {
                        var n = u._current;
                        if (n === null)
                            throw Error(m(456));
                        if ((u._pendingVisibility & 2) !== 0) {
                            var i = Rl(n, 2);
                            i !== null && (u._pendingVisibility &= -3,
                            Ct(i, n, 2))
                        }
                    }
                };
                return t.stateNode = u,
                t
            }
            function Vn(t, l, a) {
                return t = s(6, t, null, l),
                t.lanes = a,
                t
            }
            function Xn(t, l, a) {
                return l = s(4, t.children !== null ? t.children : [], t.key, l),
                l.lanes = a,
                l.stateNode = {
                    containerInfo: t.containerInfo,
                    pendingChildren: null,
                    implementation: t.implementation
                },
                l
            }
            function Pm(t, l, a, e, u, n, i, v) {
                this.tag = 1,
                this.containerInfo = t,
                this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
                this.timeoutHandle = wn,
                this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null,
                this.callbackPriority = 0,
                this.expirationTimes = st(-1),
                this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
                this.entanglements = st(0),
                this.hiddenUpdates = st(null),
                this.identifierPrefix = e,
                this.onUncaughtError = u,
                this.onCaughtError = n,
                this.onRecoverableError = i,
                this.pooledCache = null,
                this.pooledCacheLanes = 0,
                this.formState = v,
                this.incompleteTransitions = new Map
            }
            function Pi(t, l, a, e, u, n, i, v, d, E, H, r) {
                return t = new Pm(t,l,a,i,v,d,E,r),
                l = 1,
                n === !0 && (l |= 24),
                n = s(3, null, null, l),
                t.current = n,
                n.stateNode = t,
                l = zn(),
                l.refCount++,
                t.pooledCache = l,
                l.refCount++,
                n.memoizedState = {
                    element: e,
                    isDehydrated: a,
                    cache: l
                },
                Vu(n),
                t
            }
            function Ii(t) {
                return t ? (t = Ca,
                t) : Ca
            }
            function $i(t) {
                var l = t._reactInternals;
                if (l === void 0)
                    throw typeof t.render == "function" ? Error(m(188)) : (t = Object.keys(t).join(","),
                    Error(m(268, t)));
                return t = b(l),
                t = t !== null ? W(t) : null,
                t === null ? null : he(t.stateNode)
            }
            function wi(t, l, a, e, u, n) {
                u = Ii(u),
                e.context === null ? e.context = u : e.pendingContext = u,
                e = Cl(l),
                e.payload = {
                    element: a
                },
                n = n === void 0 ? null : n,
                n !== null && (e.callback = n),
                a = ql(t, e, l),
                a !== null && (Ct(a, t, l),
                ue(a, t, l))
            }
            function ki(t, l) {
                if (t = t.memoizedState,
                t !== null && t.dehydrated !== null) {
                    var a = t.retryLane;
                    t.retryLane = a !== 0 && a < l ? a : l
                }
            }
            function Zn(t, l) {
                ki(t, l),
                (t = t.alternate) && ki(t, l)
            }
            var Z = {}, Im = xc(), xt = um(), Kn = Object.assign, $m = Symbol.for("react.element"), uu = Symbol.for("react.transitional.element"), ga = Symbol.for("react.portal"), Da = Symbol.for("react.fragment"), ts = Symbol.for("react.strict_mode"), xn = Symbol.for("react.profiler"), wm = Symbol.for("react.provider"), ls = Symbol.for("react.consumer"), Kl = Symbol.for("react.context"), Jn = Symbol.for("react.forward_ref"), Ln = Symbol.for("react.suspense"), Wn = Symbol.for("react.suspense_list"), Fn = Symbol.for("react.memo"), xl = Symbol.for("react.lazy"), as = Symbol.for("react.offscreen"), km = Symbol.for("react.memo_cache_sentinel"), es = Symbol.iterator, tv = Symbol.for("react.client.reference"), q = Im.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Pn, us, In = !1, nu = Array.isArray, lv = c.rendererVersion, av = c.rendererPackageName, ns = c.extraDevToolsConfig, he = c.getPublicInstance, ev = c.getRootHostContext, uv = c.getChildHostContext, nv = c.prepareForCommit, cv = c.resetAfterCommit, fv = c.createInstance, $n = c.appendInitialChild, cs = c.finalizeInitialChildren, cu = c.shouldSetTextContent, fs = c.createTextInstance, iv = c.scheduleTimeout, sv = c.cancelTimeout, wn = c.noTimeout, Ml = c.isPrimaryRenderer;
            c.warnsIfNotActing;
            var gt = c.supportsMutation
              , Jl = c.supportsPersistence
              , It = c.supportsHydration
              , is = c.getInstanceFromNode;
            c.beforeActiveInstanceBlur,
            c.afterActiveInstanceBlur;
            var mv = c.preparePortalMount;
            c.prepareScopeUpdate,
            c.getInstanceFromScope;
            var Gt = c.setCurrentUpdatePriority
              , ia = c.getCurrentUpdatePriority
              , vv = c.resolveUpdatePriority;
            c.resolveEventType,
            c.resolveEventTimeStamp;
            var pv = c.shouldAttemptEagerTransition
              , ov = c.detachDeletedInstance;
            c.requestPostPaintCallback;
            var dv = c.maySuspendCommit
              , ss = c.preloadInstance
              , yv = c.startSuspendingCommit
              , ms = c.suspendInstance
              , Sv = c.waitForCommitToBeReady
              , ba = c.NotPendingTransition
              , sa = c.HostTransitionContext
              , hv = c.resetFormInstance;
            c.bindToConsole;
            var Ev = c.supportsMicrotasks
              , zv = c.scheduleMicrotask
              , Ee = c.supportsTestSelectors
              , Nv = c.findFiberRoot
              , Tv = c.getBoundingRect
              , Mv = c.getTextContent
              , ze = c.isHiddenSubtree
              , Ov = c.matchAccessibilityRole
              , Hv = c.setFocusIfFocusable
              , Uv = c.setupIntersectionObserver
              , _v = c.appendChild
              , rv = c.appendChildToContainer
              , Av = c.commitTextUpdate
              , jv = c.commitMount
              , gv = c.commitUpdate
              , Dv = c.insertBefore
              , bv = c.insertInContainerBefore
              , Rv = c.removeChild
              , Cv = c.removeChildFromContainer
              , vs = c.resetTextContent
              , qv = c.hideInstance
              , Bv = c.hideTextInstance
              , Qv = c.unhideInstance
              , Yv = c.unhideTextInstance
              , Gv = c.clearContainer
              , Vv = c.cloneInstance
              , ps = c.createContainerChildSet
              , os = c.appendChildToContainerChildSet
              , Xv = c.finalizeContainerChildren
              , ds = c.replaceContainerChildren
              , ys = c.cloneHiddenInstance
              , Ss = c.cloneHiddenTextInstance
              , kn = c.isSuspenseInstancePending
              , tc = c.isSuspenseInstanceFallback
              , Zv = c.getSuspenseInstanceFallbackErrorDetails
              , Kv = c.registerSuspenseInstanceRetry
              , xv = c.canHydrateFormStateMarker
              , Jv = c.isFormStateMarkerMatching
              , hs = c.getNextHydratableSibling
              , Es = c.getFirstHydratableChild
              , Lv = c.getFirstHydratableChildWithinContainer
              , Wv = c.getFirstHydratableChildWithinSuspenseInstance
              , Fv = c.canHydrateInstance
              , Pv = c.canHydrateTextInstance
              , Iv = c.canHydrateSuspenseInstance
              , $v = c.hydrateInstance
              , wv = c.hydrateTextInstance
              , kv = c.hydrateSuspenseInstance
              , tp = c.getNextHydratableInstanceAfterSuspenseInstance
              , lp = c.commitHydratedContainer
              , ap = c.commitHydratedSuspenseInstance
              , ep = c.clearSuspenseBoundary
              , up = c.clearSuspenseBoundaryFromContainer
              , zs = c.shouldDeleteUnhydratedTailInstances;
            c.diffHydratedPropsForDevWarnings,
            c.diffHydratedTextForDevWarnings,
            c.describeHydratableInstanceForDevWarnings;
            var np = c.validateHydratableInstance
              , cp = c.validateHydratableTextInstance
              , $t = c.supportsResources
              , Ns = c.isHostHoistableType
              , lc = c.getHoistableRoot
              , Ts = c.getResource
              , Ms = c.acquireResource
              , Os = c.releaseResource
              , fp = c.hydrateHoistable
              , Hs = c.mountHoistable
              , Us = c.unmountHoistable
              , ip = c.createHoistableInstance
              , sp = c.prepareToCommitHoistables
              , mp = c.mayResourceSuspendCommit
              , _s = c.preloadResource
              , vp = c.suspendResource
              , Dt = c.supportsSingletons
              , rs = c.resolveSingletonInstance
              , pp = c.clearSingleton
              , op = c.acquireSingletonInstance
              , dp = c.releaseSingletonInstance
              , As = c.isHostSingletonType
              , ac = []
              , Ra = -1
              , Ca = {}
              , Jt = Math.clz32 ? Math.clz32 : X
              , yp = Math.log
              , Sp = Math.LN2
              , fu = 128
              , iu = 4194304
              , su = xt.unstable_scheduleCallback
              , ec = xt.unstable_cancelCallback
              , hp = xt.unstable_shouldYield
              , Ep = xt.unstable_requestPaint
              , fl = xt.unstable_now
              , js = xt.unstable_ImmediatePriority
              , zp = xt.unstable_UserBlockingPriority
              , uc = xt.unstable_NormalPriority
              , Np = xt.unstable_IdlePriority
              , Tp = xt.log
              , Mp = xt.unstable_setDisableYieldValue
              , Ne = null
              , Lt = null
              , Wt = typeof Object.is == "function" ? Object.is : ta
              , gs = new WeakMap
              , qa = []
              , Ba = 0
              , mu = null
              , vu = 0
              , wt = []
              , kt = 0
              , ma = null
              , Ol = 1
              , Hl = ""
              , At = V(null)
              , Te = V(null)
              , Ll = V(null)
              , pu = V(null)
              , qt = null
              , bt = null
              , P = !1
              , il = null
              , pl = !1
              , nc = Error(m(519))
              , tl = []
              , Qa = 0
              , cc = 0
              , ou = null
              , Ya = null
              , fc = !1
              , du = !1
              , ic = !1
              , Ga = 0
              , Me = null
              , sc = 0
              , Va = 0
              , Xa = null
              , Wl = !1
              , mc = !1
              , Op = Object.prototype.hasOwnProperty
              , Oe = Error(m(460))
              , vc = Error(m(474))
              , yu = {
                then: function() {}
            }
              , Za = null
              , Ka = null
              , He = 0
              , va = ff(!0)
              , Ds = ff(!1)
              , xa = V(null)
              , Su = V(0)
              , ll = V(null)
              , ol = null
              , Ot = V(0)
              , Fl = 0
              , G = null
              , k = null
              , Nt = null
              , hu = !1
              , Ja = !1
              , pa = !1
              , Eu = 0
              , Ue = 0
              , La = null
              , Hp = 0
              , pc = function() {
                return {
                    lastEffect: null,
                    events: null,
                    stores: null,
                    memoCache: null
                }
            }
              , dl = {
                readContext: jt,
                use: xe,
                useCallback: Et,
                useContext: Et,
                useEffect: Et,
                useImperativeHandle: Et,
                useLayoutEffect: Et,
                useInsertionEffect: Et,
                useMemo: Et,
                useReducer: Et,
                useRef: Et,
                useState: Et,
                useDebugValue: Et,
                useDeferredValue: Et,
                useTransition: Et,
                useSyncExternalStore: Et,
                useId: Et
            };
            dl.useCacheRefresh = Et,
            dl.useMemoCache = Et,
            dl.useHostTransitionStatus = Et,
            dl.useFormState = Et,
            dl.useActionState = Et,
            dl.useOptimistic = Et;
            var oa = {
                readContext: jt,
                use: xe,
                useCallback: function(t, l) {
                    return Qt().memoizedState = [t, l === void 0 ? null : l],
                    t
                },
                useContext: jt,
                useEffect: gf,
                useImperativeHandle: function(t, l, a) {
                    a = a != null ? a.concat([t]) : null,
                    Le(4194308, 4, Rf.bind(null, l, t), a)
                },
                useLayoutEffect: function(t, l) {
                    return Le(4194308, 4, t, l)
                },
                useInsertionEffect: function(t, l) {
                    Le(4, 2, t, l)
                },
                useMemo: function(t, l) {
                    var a = Qt();
                    l = l === void 0 ? null : l;
                    var e = t();
                    if (pa) {
                        nl(!0);
                        try {
                            t()
                        } finally {
                            nl(!1)
                        }
                    }
                    return a.memoizedState = [e, l],
                    e
                },
                useReducer: function(t, l, a) {
                    var e = Qt();
                    if (a !== void 0) {
                        var u = a(l);
                        if (pa) {
                            nl(!0);
                            try {
                                a(l)
                            } finally {
                                nl(!1)
                            }
                        }
                    } else
                        u = l;
                    return e.memoizedState = e.baseState = u,
                    t = {
                        pending: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: t,
                        lastRenderedState: u
                    },
                    e.queue = t,
                    t = t.dispatch = bm.bind(null, G, t),
                    [e.memoizedState, t]
                },
                useRef: function(t) {
                    var l = Qt();
                    return t = {
                        current: t
                    },
                    l.memoizedState = t
                },
                useState: function(t) {
                    t = ku(t);
                    var l = t.queue
                      , a = Zf.bind(null, G, l);
                    return l.dispatch = a,
                    [t.memoizedState, a]
                },
                useDebugValue: an,
                useDeferredValue: function(t, l) {
                    var a = Qt();
                    return en(a, t, l)
                },
                useTransition: function() {
                    var t = ku(!1);
                    return t = Yf.bind(null, G, t.queue, !0, !1),
                    Qt().memoizedState = t,
                    [!1, t]
                },
                useSyncExternalStore: function(t, l, a) {
                    var e = G
                      , u = Qt();
                    if (P) {
                        if (a === void 0)
                            throw Error(m(407));
                        a = a()
                    } else {
                        if (a = l(),
                        ut === null)
                            throw Error(m(349));
                        (L & 60) !== 0 || df(e, l, a)
                    }
                    u.memoizedState = a;
                    var n = {
                        value: a,
                        getSnapshot: l
                    };
                    return u.queue = n,
                    gf(Sf.bind(null, e, n, t), [t]),
                    e.flags |= 2048,
                    Ua(9, yf.bind(null, e, n, a, l), {
                        destroy: void 0
                    }, null),
                    a
                },
                useId: function() {
                    var t = Qt()
                      , l = ut.identifierPrefix;
                    if (P) {
                        var a = Hl
                          , e = Ol;
                        a = (e & ~(1 << 32 - Jt(e) - 1)).toString(32) + a,
                        l = ":" + l + "R" + a,
                        a = Eu++,
                        0 < a && (l += "H" + a.toString(32)),
                        l += ":"
                    } else
                        a = Hp++,
                        l = ":" + l + "r" + a.toString(32) + ":";
                    return t.memoizedState = l
                },
                useCacheRefresh: function() {
                    return Qt().memoizedState = Dm.bind(null, G)
                }
            };
            oa.useMemoCache = Iu,
            oa.useHostTransitionStatus = un,
            oa.useFormState = Uf,
            oa.useActionState = Uf,
            oa.useOptimistic = function(t) {
                var l = Qt();
                l.memoizedState = l.baseState = t;
                var a = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: null,
                    lastRenderedState: null
                };
                return l.queue = a,
                l = nn.bind(null, G, !0, a),
                a.dispatch = l,
                [t, l]
            }
            ;
            var Pl = {
                readContext: jt,
                use: xe,
                useCallback: qf,
                useContext: jt,
                useEffect: ln,
                useImperativeHandle: Cf,
                useInsertionEffect: Df,
                useLayoutEffect: bf,
                useMemo: Bf,
                useReducer: Je,
                useRef: jf,
                useState: function() {
                    return Je(hl)
                },
                useDebugValue: an,
                useDeferredValue: function(t, l) {
                    var a = zt();
                    return Qf(a, k.memoizedState, t, l)
                },
                useTransition: function() {
                    var t = Je(hl)[0]
                      , l = zt().memoizedState;
                    return [typeof t == "boolean" ? t : ie(t), l]
                },
                useSyncExternalStore: of,
                useId: Vf
            };
            Pl.useCacheRefresh = Xf,
            Pl.useMemoCache = Iu,
            Pl.useHostTransitionStatus = un,
            Pl.useFormState = _f,
            Pl.useActionState = _f,
            Pl.useOptimistic = function(t, l) {
                var a = zt();
                return zf(a, k, t, l)
            }
            ;
            var da = {
                readContext: jt,
                use: xe,
                useCallback: qf,
                useContext: jt,
                useEffect: ln,
                useImperativeHandle: Cf,
                useInsertionEffect: Df,
                useLayoutEffect: bf,
                useMemo: Bf,
                useReducer: wu,
                useRef: jf,
                useState: function() {
                    return wu(hl)
                },
                useDebugValue: an,
                useDeferredValue: function(t, l) {
                    var a = zt();
                    return k === null ? en(a, t, l) : Qf(a, k.memoizedState, t, l)
                },
                useTransition: function() {
                    var t = wu(hl)[0]
                      , l = zt().memoizedState;
                    return [typeof t == "boolean" ? t : ie(t), l]
                },
                useSyncExternalStore: of,
                useId: Vf
            };
            da.useCacheRefresh = Xf,
            da.useMemoCache = Iu,
            da.useHostTransitionStatus = un,
            da.useFormState = Af,
            da.useActionState = Af,
            da.useOptimistic = function(t, l) {
                var a = zt();
                return k !== null ? zf(a, k, t, l) : (a.baseState = t,
                [t, a.queue.dispatch])
            }
            ;
            var oc = {
                isMounted: function(t) {
                    return (t = t._reactInternals) ? O(t) === t : !1
                },
                enqueueSetState: function(t, l, a) {
                    t = t._reactInternals;
                    var e = Kt()
                      , u = Cl(e);
                    u.payload = l,
                    a != null && (u.callback = a),
                    l = ql(t, u, e),
                    l !== null && (Ct(l, t, e),
                    ue(l, t, e))
                },
                enqueueReplaceState: function(t, l, a) {
                    t = t._reactInternals;
                    var e = Kt()
                      , u = Cl(e);
                    u.tag = 1,
                    u.payload = l,
                    a != null && (u.callback = a),
                    l = ql(t, u, e),
                    l !== null && (Ct(l, t, e),
                    ue(l, t, e))
                },
                enqueueForceUpdate: function(t, l) {
                    t = t._reactInternals;
                    var a = Kt()
                      , e = Cl(a);
                    e.tag = 2,
                    l != null && (e.callback = l),
                    l = ql(t, e, a),
                    l !== null && (Ct(l, t, a),
                    ue(l, t, a))
                }
            }
              , bs = typeof reportError == "function" ? reportError : function(t) {
                if (typeof window == "object" && typeof window.ErrorEvent == "function") {
                    var l = new window.ErrorEvent("error",{
                        bubbles: !0,
                        cancelable: !0,
                        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
                        error: t
                    });
                    if (!window.dispatchEvent(l))
                        return
                } else if (typeof process == "object" && typeof process.emit == "function") {
                    process.emit("uncaughtException", t);
                    return
                }
                console.error(t)
            }
              , Rs = Error(m(461))
              , Ht = !1
              , dc = {
                dehydrated: null,
                treeContext: null,
                retryLane: 0
            }
              , zu = V(null)
              , ya = null
              , Ul = null
              , Up = typeof AbortController < "u" ? AbortController : function() {
                var t = []
                  , l = this.signal = {
                    aborted: !1,
                    addEventListener: function(a, e) {
                        t.push(e)
                    }
                };
                this.abort = function() {
                    l.aborted = !0,
                    t.forEach(function(a) {
                        return a()
                    })
                }
            }
              , _p = xt.unstable_scheduleCallback
              , rp = xt.unstable_NormalPriority
              , dt = {
                $$typeof: Kl,
                Consumer: null,
                Provider: null,
                _currentValue: null,
                _currentValue2: null,
                _threadCount: 0
            }
              , Cs = q.S;
            q.S = function(t, l) {
                typeof l == "object" && l !== null && typeof l.then == "function" && _m(t, l),
                Cs !== null && Cs(t, l)
            }
            ;
            var Sa = V(null)
              , _l = !1
              , yt = !1
              , yc = !1
              , qs = typeof WeakSet == "function" ? WeakSet : Set
              , Ut = null
              , Bs = !1
              , Tt = null
              , Ft = !1
              , sl = null
              , Wa = 8192
              , Ap = {
                getCacheForType: function(t) {
                    var l = jt(dt)
                      , a = l.data.get(t);
                    return a === void 0 && (a = t(),
                    l.data.set(t, a)),
                    a
                }
            }
              , Nu = 0
              , Tu = 1
              , Mu = 2
              , Ou = 3
              , Hu = 4;
            if (typeof Symbol == "function" && Symbol.for) {
                var _e = Symbol.for;
                Nu = _e("selector.component"),
                Tu = _e("selector.has_pseudo_class"),
                Mu = _e("selector.role"),
                Ou = _e("selector.test_id"),
                Hu = _e("selector.text")
            }
            var jp = typeof WeakMap == "function" ? WeakMap : Map
              , tt = 0
              , ut = null
              , K = null
              , L = 0
              , nt = 0
              , Pt = null
              , rl = !1
              , Fa = !1
              , Sc = !1
              , Al = 0
              , St = 0
              , Il = 0
              , ha = 0
              , hc = 0
              , al = 0
              , Pa = 0
              , re = null
              , yl = null
              , Ec = !1
              , zc = 0
              , Ae = 1 / 0
              , Uu = null
              , $l = null
              , _u = !1
              , Ea = null
              , je = 0
              , Nc = 0
              , Tc = null
              , ge = 0
              , Mc = null;
            return Z.attemptContinuousHydration = function(t) {
                if (t.tag === 13) {
                    var l = Rl(t, 67108864);
                    l !== null && Ct(l, t, 67108864),
                    Zn(t, 67108864)
                }
            }
            ,
            Z.attemptHydrationAtCurrentPriority = function(t) {
                if (t.tag === 13) {
                    var l = Kt()
                      , a = Rl(t, l);
                    a !== null && Ct(a, t, l),
                    Zn(t, l)
                }
            }
            ,
            Z.attemptSynchronousHydration = function(t) {
                switch (t.tag) {
                case 3:
                    if (t = t.stateNode,
                    t.current.memoizedState.isDehydrated) {
                        var l = Y(t.pendingLanes);
                        if (l !== 0) {
                            for (t.pendingLanes |= 2,
                            t.entangledLanes |= 2; l; ) {
                                var a = 1 << 31 - Jt(l);
                                t.entanglements[1] |= a,
                                l &= ~a
                            }
                            vl(t),
                            (tt & 6) === 0 && (Ae = fl() + 500,
                            Ha(0))
                        }
                    }
                    break;
                case 13:
                    l = Rl(t, 2),
                    l !== null && Ct(l, t, 2),
                    qi(),
                    Zn(t, 2)
                }
            }
            ,
            Z.batchedUpdates = function(t, l) {
                return t(l)
            }
            ,
            Z.createComponentSelector = function(t) {
                return {
                    $$typeof: Nu,
                    value: t
                }
            }
            ,
            Z.createContainer = function(t, l, a, e, u, n, i, v, d, E) {
                return Pi(t, l, !1, null, a, e, n, i, v, d, E, null)
            }
            ,
            Z.createHasPseudoClassSelector = function(t) {
                return {
                    $$typeof: Tu,
                    value: t
                }
            }
            ,
            Z.createHydrationContainer = function(t, l, a, e, u, n, i, v, d, E, H, r, j) {
                return t = Pi(a, e, !0, t, u, n, v, d, E, H, r, j),
                t.context = Ii(null),
                a = t.current,
                e = Kt(),
                u = Cl(e),
                u.callback = l ?? null,
                ql(a, u, e),
                t.current.lanes = e,
                et(t, e),
                vl(t),
                t
            }
            ,
            Z.createPortal = function(t, l, a) {
                var e = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
                return {
                    $$typeof: ga,
                    key: e == null ? null : "" + e,
                    children: t,
                    containerInfo: l,
                    implementation: a
                }
            }
            ,
            Z.createRoleSelector = function(t) {
                return {
                    $$typeof: Mu,
                    value: t
                }
            }
            ,
            Z.createTestNameSelector = function(t) {
                return {
                    $$typeof: Ou,
                    value: t
                }
            }
            ,
            Z.createTextSelector = function(t) {
                return {
                    $$typeof: Hu,
                    value: t
                }
            }
            ,
            Z.defaultOnCaughtError = function(t) {
                console.error(t)
            }
            ,
            Z.defaultOnRecoverableError = function(t) {
                bs(t)
            }
            ,
            Z.defaultOnUncaughtError = function(t) {
                bs(t)
            }
            ,
            Z.deferredUpdates = function(t) {
                var l = q.T
                  , a = ia();
                try {
                    return Gt(32),
                    q.T = null,
                    t()
                } finally {
                    Gt(a),
                    q.T = l
                }
            }
            ,
            Z.discreteUpdates = function(t, l, a, e, u) {
                var n = q.T
                  , i = ia();
                try {
                    return Gt(2),
                    q.T = null,
                    t(l, a, e, u)
                } finally {
                    Gt(i),
                    q.T = n,
                    tt === 0 && (Ae = fl() + 500)
                }
            }
            ,
            Z.findAllNodes = Rn,
            Z.findBoundingRects = function(t, l) {
                if (!Ee)
                    throw Error(m(363));
                l = Rn(t, l),
                t = [];
                for (var a = 0; a < l.length; a++)
                    t.push(Tv(l[a]));
                for (l = t.length - 1; 0 < l; l--) {
                    a = t[l];
                    for (var e = a.x, u = e + a.width, n = a.y, i = n + a.height, v = l - 1; 0 <= v; v--)
                        if (l !== v) {
                            var d = t[v]
                              , E = d.x
                              , H = E + d.width
                              , r = d.y
                              , j = r + d.height;
                            if (e >= E && n >= r && u <= H && i <= j) {
                                t.splice(l, 1);
                                break
                            } else if (e !== E || a.width !== d.width || j < n || r > i) {
                                if (!(n !== r || a.height !== d.height || H < e || E > u)) {
                                    E > e && (d.width += E - e,
                                    d.x = e),
                                    H < u && (d.width = u - E),
                                    t.splice(l, 1);
                                    break
                                }
                            } else {
                                r > n && (d.height += r - n,
                                d.y = n),
                                j < i && (d.height = i - r),
                                t.splice(l, 1);
                                break
                            }
                        }
                }
                return t
            }
            ,
            Z.findHostInstance = $i,
            Z.findHostInstanceWithNoPortals = function(t) {
                return t = b(t),
                t = t !== null ? x(t) : null,
                t === null ? null : he(t.stateNode)
            }
            ,
            Z.findHostInstanceWithWarning = function(t) {
                return $i(t)
            }
            ,
            Z.flushPassiveEffects = ca,
            Z.flushSyncFromReconciler = function(t) {
                var l = tt;
                tt |= 1;
                var a = q.T
                  , e = ia();
                try {
                    if (Gt(2),
                    q.T = null,
                    t)
                        return t()
                } finally {
                    Gt(e),
                    q.T = a,
                    tt = l,
                    (tt & 6) === 0 && Ha(0)
                }
            }
            ,
            Z.flushSyncWork = qi,
            Z.focusWithin = function(t, l) {
                if (!Ee)
                    throw Error(m(363));
                for (t = gn(t),
                l = Di(t, l),
                l = Array.from(l),
                t = 0; t < l.length; ) {
                    var a = l[t++]
                      , e = a.tag;
                    if (!ze(a)) {
                        if ((e === 5 || e === 26 || e === 27) && Hv(a.stateNode))
                            return !0;
                        for (a = a.child; a !== null; )
                            l.push(a),
                            a = a.sibling
                    }
                }
                return !1
            }
            ,
            Z.getFindAllNodesFailureDescription = function(t, l) {
                if (!Ee)
                    throw Error(m(363));
                var a = 0
                  , e = [];
                t = [gn(t), 0];
                for (var u = 0; u < t.length; ) {
                    var n = t[u++]
                      , i = n.tag
                      , v = t[u++]
                      , d = l[v];
                    if ((i !== 5 && i !== 26 && i !== 27 || !ze(n)) && (Dn(n, d) && (e.push(bn(d)),
                    v++,
                    v > a && (a = v)),
                    v < l.length))
                        for (n = n.child; n !== null; )
                            t.push(n, v),
                            n = n.sibling
                }
                if (a < l.length) {
                    for (t = []; a < l.length; a++)
                        t.push(bn(l[a]));
                    return `findAllNodes was able to match part of the selector:
  ` + (e.join(" > ") + `

No matching component was found for:
  `) + t.join(" > ")
                }
                return null
            }
            ,
            Z.getPublicRootInstance = function(t) {
                if (t = t.current,
                !t.child)
                    return null;
                switch (t.child.tag) {
                case 27:
                case 5:
                    return he(t.child.stateNode);
                default:
                    return t.child.stateNode
                }
            }
            ,
            Z.injectIntoDevTools = function() {
                var t = {
                    bundleType: 0,
                    version: lv,
                    rendererPackageName: av,
                    currentDispatcherRef: q,
                    findFiberByHostInstance: is,
                    reconcilerVersion: "19.0.0"
                };
                if (ns !== null && (t.rendererConfig = ns),
                typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
                    t = !1;
                else {
                    var l = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                    if (l.isDisabled || !l.supportsFiber)
                        t = !0;
                    else {
                        try {
                            Ne = l.inject(t),
                            Lt = l
                        } catch {}
                        t = !!l.checkDCE
                    }
                }
                return t
            }
            ,
            Z.isAlreadyRendering = function() {
                return !1
            }
            ,
            Z.observeVisibleRects = function(t, l, a, e) {
                if (!Ee)
                    throw Error(m(363));
                t = Rn(t, l);
                var u = Uv(t, a, e).disconnect;
                return {
                    disconnect: function() {
                        u()
                    }
                }
            }
            ,
            Z.shouldError = function() {
                return null
            }
            ,
            Z.shouldSuspend = function() {
                return !1
            }
            ,
            Z.startHostTransition = function(t, l, a, e) {
                if (t.tag !== 5)
                    throw Error(m(476));
                var u = Gf(t).queue;
                Yf(t, u, l, ba, a === null ? p : function() {
                    var n = Gf(t).next.queue;
                    return se(t, n, {}, Kt()),
                    a(e)
                }
                )
            }
            ,
            Z.updateContainer = function(t, l, a, e) {
                var u = l.current
                  , n = Kt();
                return wi(u, n, t, l, a, e),
                n
            }
            ,
            Z.updateContainerSync = function(t, l, a, e) {
                return l.tag === 0 && ca(),
                wi(l.current, 2, t, l, a, e),
                2
            }
            ,
            Z
        }
        ,
        f.exports.default = f.exports,
        Object.defineProperty(f.exports, "__esModule", {
            value: !0
        })
    }(gc)),
    gc.exports
}
var Ws;
function s0() {
    return Ws || (Ws = 1,
    jc.exports = i0()),
    jc.exports
}
var m0 = s0();
const v0 = em(m0);
var Fs = um();
const p0 = f => typeof f == "object" && typeof f.then == "function"
  , Na = [];
function cm(f, c, s= (p, m) => p === m) {
    if (f === c)
        return !0;
    if (!f || !c)
        return !1;
    const p = f.length;
    if (c.length !== p)
        return !1;
    for (let m = 0; m < p; m++)
        if (!s(f[m], c[m]))
            return !1;
    return !0
}
function fm(f, c=null, s=!1, p={}) {
    c === null && (c = [f]);
    for (const h of Na)
        if (cm(c, h.keys, h.equal)) {
            if (s)
                return;
            if (Object.prototype.hasOwnProperty.call(h, "error"))
                throw h.error;
            if (Object.prototype.hasOwnProperty.call(h, "response"))
                return p.lifespan && p.lifespan > 0 && (h.timeout && clearTimeout(h.timeout),
                h.timeout = setTimeout(h.remove, p.lifespan)),
                h.response;
            if (!s)
                throw h.promise
        }
    const m = {
        keys: c,
        equal: p.equal,
        remove: () => {
            const h = Na.indexOf(m);
            h !== -1 && Na.splice(h, 1)
        }
        ,
        promise: (p0(f) ? f : f(...c)).then(h => {
            m.response = h,
            p.lifespan && p.lifespan > 0 && (m.timeout = setTimeout(m.remove, p.lifespan))
        }
        ).catch(h => m.error = h)
    };
    if (Na.push(m),
    !s)
        throw m.promise
}
const o0 = (f, c, s) => fm(f, c, !1, s)
  , d0 = (f, c, s) => void fm(f, c, !0, s)
  , y0 = f => {
    if (f === void 0 || f.length === 0)
        Na.splice(0, Na.length);
    else {
        const c = Na.find(s => cm(f, s.keys, s.equal));
        c && c.remove()
    }
}
;
function Jc(f, c, s) {
    if (!f)
        return;
    if (s(f) === !0)
        return f;
    let p = c ? f.return : f.child;
    for (; p; ) {
        const m = Jc(p, c, s);
        if (m)
            return m;
        p = c ? null : p.sibling
    }
}
function im(f) {
    try {
        return Object.defineProperties(f, {
            _currentRenderer: {
                get() {
                    return null
                },
                set() {}
            },
            _currentRenderer2: {
                get() {
                    return null
                },
                set() {}
            }
        })
    } catch {
        return f
    }
}
const Lc = im(lt.createContext(null));
class S0 extends lt.Component {
    render() {
        return lt.createElement(Lc.Provider, {
            value: this._reactInternals
        }, this.props.children)
    }
}
function sm() {
    const f = lt.useContext(Lc);
    if (f === null)
        throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
    const c = lt.useId();
    return lt.useMemo( () => {
        for (const s of [f, f == null ? void 0 : f.alternate]) {
            if (!s)
                continue;
            const p = Jc(s, !1, m => {
                let h = m.memoizedState;
                for (; h; ) {
                    if (h.memoizedState === c)
                        return !0;
                    h = h.next
                }
            }
            );
            if (p)
                return p
        }
    }
    , [f, c])
}
const h0 = Symbol.for("react.context")
  , E0 = f => f !== null && typeof f == "object" && "$$typeof"in f && f.$$typeof === h0;
function z0() {
    const f = sm()
      , [c] = lt.useState( () => new Map);
    c.clear();
    let s = f;
    for (; s; ) {
        const p = s.type;
        E0(p) && p !== Lc && !c.has(p) && c.set(p, lt.use(im(p))),
        s = s.return
    }
    return c
}
function N0() {
    const f = z0();
    return lt.useMemo( () => Array.from(f.keys()).reduce( (c, s) => p => lt.createElement(c, null, lt.createElement(s.Provider, {
        ...p,
        value: f.get(s)
    })), c => lt.createElement(S0, {
        ...c
    })), [f])
}
function mm(f) {
    let c = f.root;
    for (; c.getState().previousRoot; )
        c = c.getState().previousRoot;
    return c
}
const vm = f => f && f.isOrthographicCamera
  , lo = f => f && f.hasOwnProperty("current")
  , T0 = f => f != null && (typeof f == "string" || typeof f == "number" || f.isColor)
  , Bu = ( (f, c) => typeof window < "u" && (((f = window.document) == null ? void 0 : f.createElement) || ((c = window.navigator) == null ? void 0 : c.product) === "ReactNative"))() ? lt.useLayoutEffect : lt.useEffect;
function M0(f) {
    const c = lt.useRef(f);
    return Bu( () => void (c.current = f), [f]),
    c
}
function ao() {
    const f = sm()
      , c = N0();
    return lt.useMemo( () => ({children: s}) => {
        const m = !!Jc(f, !0, h => h.type === lt.StrictMode) ? lt.StrictMode : lt.Fragment;
        return gl.jsx(m, {
            children: gl.jsx(c, {
                children: s
            })
        })
    }
    , [f, c])
}
function eo({set: f}) {
    return Bu( () => (f(new Promise( () => null)),
    () => f(!1)), [f]),
    null
}
const uo = (f => (f = class extends lt.Component {
    constructor(...s) {
        super(...s),
        this.state = {
            error: !1
        }
    }
    componentDidCatch(s) {
        this.props.set(s)
    }
    render() {
        return this.state.error ? null : this.props.children
    }
}
,
f.getDerivedStateFromError = () => ({
    error: !0
}),
f))();
function pm(f) {
    var c;
    const s = typeof window < "u" ? (c = window.devicePixelRatio) != null ? c : 2 : 1;
    return Array.isArray(f) ? Math.min(Math.max(f[0], s), f[1]) : f
}
function Ia(f) {
    var c;
    return (c = f.__r3f) == null ? void 0 : c.root.getState()
}
const it = {
    obj: f => f === Object(f) && !it.arr(f) && typeof f != "function",
    fun: f => typeof f == "function",
    str: f => typeof f == "string",
    num: f => typeof f == "number",
    boo: f => typeof f == "boolean",
    und: f => f === void 0,
    nul: f => f === null,
    arr: f => Array.isArray(f),
    equ(f, c, {arrays: s="shallow", objects: p="reference", strict: m=!0}={}) {
        if (typeof f != typeof c || !!f != !!c)
            return !1;
        if (it.str(f) || it.num(f) || it.boo(f))
            return f === c;
        const h = it.obj(f);
        if (h && p === "reference")
            return f === c;
        const T = it.arr(f);
        if (T && s === "reference")
            return f === c;
        if ((T || h) && f === c)
            return !0;
        let A;
        for (A in f)
            if (!(A in c))
                return !1;
        if (h && s === "shallow" && p === "shallow") {
            for (A in m ? c : f)
                if (!it.equ(f[A], c[A], {
                    strict: m,
                    objects: "reference"
                }))
                    return !1
        } else
            for (A in m ? c : f)
                if (f[A] !== c[A])
                    return !1;
        if (it.und(A)) {
            if (T && f.length === 0 && c.length === 0 || h && Object.keys(f).length === 0 && Object.keys(c).length === 0)
                return !0;
            if (f !== c)
                return !1
        }
        return !0
    }
};
function O0(f) {
    const c = {
        nodes: {},
        materials: {},
        meshes: {}
    };
    return f && f.traverse(s => {
        s.name && (c.nodes[s.name] = s),
        s.material && !c.materials[s.material.name] && (c.materials[s.material.name] = s.material),
        s.isMesh && !c.meshes[s.name] && (c.meshes[s.name] = s)
    }
    ),
    c
}
function H0(f) {
    f.type !== "Scene" && (f.dispose == null || f.dispose());
    for (const c in f) {
        const s = f[c];
        (s == null ? void 0 : s.type) !== "Scene" && (s == null || s.dispose == null || s.dispose())
    }
}
const om = ["children", "key", "ref"];
function U0(f) {
    const c = {};
    for (const s in f)
        om.includes(s) || (c[s] = f[s]);
    return c
}
function bu(f, c, s, p) {
    const m = f;
    let h = m == null ? void 0 : m.__r3f;
    return h || (h = {
        root: c,
        type: s,
        parent: null,
        children: [],
        props: U0(p),
        object: m,
        eventCount: 0,
        handlers: {},
        isHidden: !1
    },
    m && (m.__r3f = h)),
    h
}
function Re(f, c) {
    let s = f[c];
    if (!c.includes("-"))
        return {
            root: f,
            key: c,
            target: s
        };
    s = f;
    for (const m of c.split("-")) {
        var p;
        c = m,
        f = s,
        s = (p = s) == null ? void 0 : p[c]
    }
    return {
        root: f,
        key: c,
        target: s
    }
}
const Ps = /-\d+$/;
function Ru(f, c) {
    if (it.str(c.props.attach)) {
        if (Ps.test(c.props.attach)) {
            const m = c.props.attach.replace(Ps, "")
              , {root: h, key: T} = Re(f.object, m);
            Array.isArray(h[T]) || (h[T] = [])
        }
        const {root: s, key: p} = Re(f.object, c.props.attach);
        c.previousAttach = s[p],
        s[p] = c.object
    } else
        it.fun(c.props.attach) && (c.previousAttach = c.props.attach(f.object, c.object))
}
function Cu(f, c) {
    if (it.str(c.props.attach)) {
        const {root: s, key: p} = Re(f.object, c.props.attach)
          , m = c.previousAttach;
        m === void 0 ? delete s[p] : s[p] = m
    } else
        c.previousAttach == null || c.previousAttach(f.object, c.object);
    delete c.previousAttach
}
const Yc = [...om, "args", "dispose", "attach", "object", "onUpdate", "dispose"]
  , Is = new Map;
function _0(f) {
    let c = Is.get(f.constructor);
    try {
        c || (c = new f.constructor,
        Is.set(f.constructor, c))
    } catch {}
    return c
}
function r0(f, c) {
    const s = {};
    for (const p in c)
        if (!Yc.includes(p) && !it.equ(c[p], f.props[p])) {
            s[p] = c[p];
            for (const m in c)
                m.startsWith(`${p}-`) && (s[m] = c[m])
        }
    for (const p in f.props) {
        if (Yc.includes(p) || c.hasOwnProperty(p))
            continue;
        const {root: m, key: h} = Re(f.object, p);
        if (m.constructor && m.constructor.length === 0) {
            const T = _0(m);
            it.und(T) || (s[h] = T[h])
        } else
            s[h] = 0
    }
    return s
}
const A0 = ["map", "emissiveMap", "sheenColorMap", "specularColorMap", "envMap"]
  , j0 = /^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;
function kl(f, c) {
    var s;
    const p = f.__r3f
      , m = p && mm(p).getState()
      , h = p == null ? void 0 : p.eventCount;
    for (const A in c) {
        let z = c[A];
        if (Yc.includes(A))
            continue;
        if (p && j0.test(A)) {
            typeof z == "function" ? p.handlers[A] = z : delete p.handlers[A],
            p.eventCount = Object.keys(p.handlers).length;
            continue
        }
        if (z === void 0)
            continue;
        let {root: g, key: U, target: O} = Re(f, A);
        if (O instanceof Qs && z instanceof Qs)
            O.mask = z.mask;
        else if (O instanceof xp && T0(z))
            O.set(z);
        else if (O !== null && typeof O == "object" && typeof O.set == "function" && typeof O.copy == "function" && z != null && z.constructor && O.constructor === z.constructor)
            O.copy(z);
        else if (O !== null && typeof O == "object" && typeof O.set == "function" && Array.isArray(z))
            typeof O.fromArray == "function" ? O.fromArray(z) : O.set(...z);
        else if (O !== null && typeof O == "object" && typeof O.set == "function" && typeof z == "number")
            typeof O.setScalar == "function" ? O.setScalar(z) : O.set(z);
        else {
            var T;
            g[U] = z,
            m && !m.linear && A0.includes(U) && (T = g[U]) != null && T.isTexture && g[U].format === Jp && g[U].type === Lp && (g[U].colorSpace = nm)
        }
    }
    if (p != null && p.parent && m != null && m.internal && (s = p.object) != null && s.isObject3D && h !== p.eventCount) {
        const A = p.object
          , z = m.internal.interaction.indexOf(A);
        z > -1 && m.internal.interaction.splice(z, 1),
        p.eventCount && A.raycast !== null && m.internal.interaction.push(A)
    }
    return p && p.props.attach === void 0 && (p.object.isBufferGeometry ? p.props.attach = "geometry" : p.object.isMaterial && (p.props.attach = "material")),
    p && te(p),
    f
}
function te(f) {
    var c;
    if (!f.parent)
        return;
    f.props.onUpdate == null || f.props.onUpdate(f.object);
    const s = (c = f.root) == null || c.getState == null ? void 0 : c.getState();
    s && s.internal.frames === 0 && s.invalidate()
}
function g0(f, c) {
    f.manual || (vm(f) ? (f.left = c.width / -2,
    f.right = c.width / 2,
    f.top = c.height / 2,
    f.bottom = c.height / -2) : f.aspect = c.width / c.height,
    f.updateProjectionMatrix())
}
const Bt = f => f == null ? void 0 : f.isObject3D;
function ru(f) {
    return (f.eventObject || f.object).uuid + "/" + f.index + f.instanceId
}
function dm(f, c, s, p) {
    const m = s.get(c);
    m && (s.delete(c),
    s.size === 0 && (f.delete(p),
    m.target.releasePointerCapture(p)))
}
function D0(f, c) {
    const {internal: s} = f.getState();
    s.interaction = s.interaction.filter(p => p !== c),
    s.initialHits = s.initialHits.filter(p => p !== c),
    s.hovered.forEach( (p, m) => {
        (p.eventObject === c || p.object === c) && s.hovered.delete(m)
    }
    ),
    s.capturedMap.forEach( (p, m) => {
        dm(s.capturedMap, c, p, m)
    }
    )
}
function b0(f) {
    function c(z) {
        const {internal: g} = f.getState()
          , U = z.offsetX - g.initialClick[0]
          , O = z.offsetY - g.initialClick[1];
        return Math.round(Math.sqrt(U * U + O * O))
    }
    function s(z) {
        return z.filter(g => ["Move", "Over", "Enter", "Out", "Leave"].some(U => {
            var O;
            return (O = g.__r3f) == null ? void 0 : O.handlers["onPointer" + U]
        }
        ))
    }
    function p(z, g) {
        const U = f.getState()
          , O = new Set
          , D = []
          , b = g ? g(U.internal.interaction) : U.internal.interaction;
        for (let _ = 0; _ < b.length; _++) {
            const N = Ia(b[_]);
            N && (N.raycaster.camera = void 0)
        }
        U.previousRoot || U.events.compute == null || U.events.compute(z, U);
        function W(_) {
            const N = Ia(_);
            if (!N || !N.events.enabled || N.raycaster.camera === null)
                return [];
            if (N.raycaster.camera === void 0) {
                var X;
                N.events.compute == null || N.events.compute(z, N, (X = N.previousRoot) == null ? void 0 : X.getState()),
                N.raycaster.camera === void 0 && (N.raycaster.camera = null)
            }
            return N.raycaster.camera ? N.raycaster.intersectObject(_, !0) : []
        }
        let x = b.flatMap(W).sort( (_, N) => {
            const X = Ia(_.object)
              , Y = Ia(N.object);
            return !X || !Y ? _.distance - N.distance : Y.events.priority - X.events.priority || _.distance - N.distance
        }
        ).filter(_ => {
            const N = ru(_);
            return O.has(N) ? !1 : (O.add(N),
            !0)
        }
        );
        U.events.filter && (x = U.events.filter(x, U));
        for (const _ of x) {
            let N = _.object;
            for (; N; ) {
                var V;
                (V = N.__r3f) != null && V.eventCount && D.push({
                    ..._,
                    eventObject: N
                }),
                N = N.parent
            }
        }
        if ("pointerId"in z && U.internal.capturedMap.has(z.pointerId))
            for (let _ of U.internal.capturedMap.get(z.pointerId).values())
                O.has(ru(_.intersection)) || D.push(_.intersection);
        return D
    }
    function m(z, g, U, O) {
        if (z.length) {
            const D = {
                stopped: !1
            };
            for (const b of z) {
                let W = Ia(b.object);
                if (W || b.object.traverseAncestors(x => {
                    const V = Ia(x);
                    if (V)
                        return W = V,
                        !1
                }
                ),
                W) {
                    const {raycaster: x, pointer: V, camera: _, internal: N} = W
                      , X = new ju(V.x,V.y,0).unproject(_)
                      , Y = at => {
                        var st, et;
                        return (st = (et = N.capturedMap.get(at)) == null ? void 0 : et.has(b.eventObject)) != null ? st : !1
                    }
                      , F = at => {
                        const st = {
                            intersection: b,
                            target: g.target
                        };
                        N.capturedMap.has(at) ? N.capturedMap.get(at).set(b.eventObject, st) : N.capturedMap.set(at, new Map([[b.eventObject, st]])),
                        g.target.setPointerCapture(at)
                    }
                      , B = at => {
                        const st = N.capturedMap.get(at);
                        st && dm(N.capturedMap, b.eventObject, st, at)
                    }
                    ;
                    let ct = {};
                    for (let at in g) {
                        let st = g[at];
                        typeof st != "function" && (ct[at] = st)
                    }
                    let pt = {
                        ...b,
                        ...ct,
                        pointer: V,
                        intersections: z,
                        stopped: D.stopped,
                        delta: U,
                        unprojectedPoint: X,
                        ray: x.ray,
                        camera: _,
                        stopPropagation() {
                            const at = "pointerId"in g && N.capturedMap.get(g.pointerId);
                            if ((!at || at.has(b.eventObject)) && (pt.stopped = D.stopped = !0,
                            N.hovered.size && Array.from(N.hovered.values()).find(st => st.eventObject === b.eventObject))) {
                                const st = z.slice(0, z.indexOf(b));
                                h([...st, b])
                            }
                        },
                        target: {
                            hasPointerCapture: Y,
                            setPointerCapture: F,
                            releasePointerCapture: B
                        },
                        currentTarget: {
                            hasPointerCapture: Y,
                            setPointerCapture: F,
                            releasePointerCapture: B
                        },
                        nativeEvent: g
                    };
                    if (O(pt),
                    D.stopped === !0)
                        break
                }
            }
        }
        return z
    }
    function h(z) {
        const {internal: g} = f.getState();
        for (const U of g.hovered.values())
            if (!z.length || !z.find(O => O.object === U.object && O.index === U.index && O.instanceId === U.instanceId)) {
                const D = U.eventObject.__r3f;
                if (g.hovered.delete(ru(U)),
                D != null && D.eventCount) {
                    const b = D.handlers
                      , W = {
                        ...U,
                        intersections: z
                    };
                    b.onPointerOut == null || b.onPointerOut(W),
                    b.onPointerLeave == null || b.onPointerLeave(W)
                }
            }
    }
    function T(z, g) {
        for (let U = 0; U < g.length; U++) {
            const O = g[U].__r3f;
            O == null || O.handlers.onPointerMissed == null || O.handlers.onPointerMissed(z)
        }
    }
    function A(z) {
        switch (z) {
        case "onPointerLeave":
        case "onPointerCancel":
            return () => h([]);
        case "onLostPointerCapture":
            return g => {
                const {internal: U} = f.getState();
                "pointerId"in g && U.capturedMap.has(g.pointerId) && requestAnimationFrame( () => {
                    U.capturedMap.has(g.pointerId) && (U.capturedMap.delete(g.pointerId),
                    h([]))
                }
                )
            }
        }
        return function(U) {
            const {onPointerMissed: O, internal: D} = f.getState();
            D.lastEvent.current = U;
            const b = z === "onPointerMove"
              , W = z === "onClick" || z === "onContextMenu" || z === "onDoubleClick"
              , V = p(U, b ? s : void 0)
              , _ = W ? c(U) : 0;
            z === "onPointerDown" && (D.initialClick = [U.offsetX, U.offsetY],
            D.initialHits = V.map(X => X.eventObject)),
            W && !V.length && _ <= 2 && (T(U, D.interaction),
            O && O(U)),
            b && h(V);
            function N(X) {
                const Y = X.eventObject
                  , F = Y.__r3f;
                if (!(F != null && F.eventCount))
                    return;
                const B = F.handlers;
                if (b) {
                    if (B.onPointerOver || B.onPointerEnter || B.onPointerOut || B.onPointerLeave) {
                        const ct = ru(X)
                          , pt = D.hovered.get(ct);
                        pt ? pt.stopped && X.stopPropagation() : (D.hovered.set(ct, X),
                        B.onPointerOver == null || B.onPointerOver(X),
                        B.onPointerEnter == null || B.onPointerEnter(X))
                    }
                    B.onPointerMove == null || B.onPointerMove(X)
                } else {
                    const ct = B[z];
                    ct ? (!W || D.initialHits.includes(Y)) && (T(U, D.interaction.filter(pt => !D.initialHits.includes(pt))),
                    ct(X)) : W && D.initialHits.includes(Y) && T(U, D.interaction.filter(pt => !D.initialHits.includes(pt)))
                }
            }
            m(V, U, _, N)
        }
    }
    return {
        handlePointer: A
    }
}
const $s = f => !!(f != null && f.render)
  , ym = lt.createContext(null)
  , R0 = (f, c) => {
    const s = f0( (A, z) => {
        const g = new ju
          , U = new ju
          , O = new ju;
        function D(_=z().camera, N=U, X=z().size) {
            const {width: Y, height: F, top: B, left: ct} = X
              , pt = Y / F;
            N.isVector3 ? O.copy(N) : O.set(...N);
            const at = _.getWorldPosition(g).distanceTo(O);
            if (vm(_))
                return {
                    width: Y / _.zoom,
                    height: F / _.zoom,
                    top: B,
                    left: ct,
                    factor: 1,
                    distance: at,
                    aspect: pt
                };
            {
                const st = _.fov * Math.PI / 180
                  , et = 2 * Math.tan(st / 2) * at
                  , Ma = et * (Y / F);
                return {
                    width: Ma,
                    height: et,
                    top: B,
                    left: ct,
                    factor: Y / Ma,
                    distance: at,
                    aspect: pt
                }
            }
        }
        let b;
        const W = _ => A(N => ({
            performance: {
                ...N.performance,
                current: _
            }
        }))
          , x = new Wp;
        return {
            set: A,
            get: z,
            gl: null,
            camera: null,
            raycaster: null,
            events: {
                priority: 1,
                enabled: !0,
                connected: !1
            },
            scene: null,
            xr: null,
            invalidate: (_=1) => f(z(), _),
            advance: (_, N) => c(_, N, z()),
            legacy: !1,
            linear: !1,
            flat: !1,
            controls: null,
            clock: new Fp,
            pointer: x,
            mouse: x,
            frameloop: "always",
            onPointerMissed: void 0,
            performance: {
                current: 1,
                min: .5,
                max: 1,
                debounce: 200,
                regress: () => {
                    const _ = z();
                    b && clearTimeout(b),
                    _.performance.current !== _.performance.min && W(_.performance.min),
                    b = setTimeout( () => W(z().performance.max), _.performance.debounce)
                }
            },
            size: {
                width: 0,
                height: 0,
                top: 0,
                left: 0
            },
            viewport: {
                initialDpr: 0,
                dpr: 0,
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                aspect: 0,
                distance: 0,
                factor: 0,
                getCurrentViewport: D
            },
            setEvents: _ => A(N => ({
                ...N,
                events: {
                    ...N.events,
                    ..._
                }
            })),
            setSize: (_, N, X=0, Y=0) => {
                const F = z().camera
                  , B = {
                    width: _,
                    height: N,
                    top: X,
                    left: Y
                };
                A(ct => ({
                    size: B,
                    viewport: {
                        ...ct.viewport,
                        ...D(F, U, B)
                    }
                }))
            }
            ,
            setDpr: _ => A(N => {
                const X = pm(_);
                return {
                    viewport: {
                        ...N.viewport,
                        dpr: X,
                        initialDpr: N.viewport.initialDpr || X
                    }
                }
            }
            ),
            setFrameloop: (_="always") => {
                const N = z().clock;
                N.stop(),
                N.elapsedTime = 0,
                _ !== "never" && (N.start(),
                N.elapsedTime = 0),
                A( () => ({
                    frameloop: _
                }))
            }
            ,
            previousRoot: void 0,
            internal: {
                interaction: [],
                hovered: new Map,
                subscribers: [],
                initialClick: [0, 0],
                initialHits: [],
                capturedMap: new Map,
                lastEvent: lt.createRef(),
                active: !1,
                frames: 0,
                priority: 0,
                subscribe: (_, N, X) => {
                    const Y = z().internal;
                    return Y.priority = Y.priority + (N > 0 ? 1 : 0),
                    Y.subscribers.push({
                        ref: _,
                        priority: N,
                        store: X
                    }),
                    Y.subscribers = Y.subscribers.sort( (F, B) => F.priority - B.priority),
                    () => {
                        const F = z().internal;
                        F != null && F.subscribers && (F.priority = F.priority - (N > 0 ? 1 : 0),
                        F.subscribers = F.subscribers.filter(B => B.ref !== _))
                    }
                }
            }
        }
    }
    )
      , p = s.getState();
    let m = p.size
      , h = p.viewport.dpr
      , T = p.camera;
    return s.subscribe( () => {
        const {camera: A, size: z, viewport: g, gl: U, set: O} = s.getState();
        if (z.width !== m.width || z.height !== m.height || g.dpr !== h) {
            m = z,
            h = g.dpr,
            g0(A, z),
            g.dpr > 0 && U.setPixelRatio(g.dpr);
            const D = typeof HTMLCanvasElement < "u" && U.domElement instanceof HTMLCanvasElement;
            U.setSize(z.width, z.height, D)
        }
        A !== T && (T = A,
        O(D => ({
            viewport: {
                ...D.viewport,
                ...D.viewport.getCurrentViewport(A)
            }
        })))
    }
    ),
    s.subscribe(A => f(A)),
    s
}
;
function Sm() {
    const f = lt.useContext(ym);
    if (!f)
        throw new Error("R3F: Hooks can only be used within the Canvas component!");
    return f
}
function co(f=s => s, c) {
    return Sm()(f, c)
}
function C0(f, c=0) {
    const s = Sm()
      , p = s.getState().internal.subscribe
      , m = M0(f);
    return Bu( () => p(m, c, s), [c, p, s]),
    null
}
const ws = new WeakMap
  , q0 = f => {
    var c;
    return typeof f == "function" && (f == null || (c = f.prototype) == null ? void 0 : c.constructor) === f
}
;
function hm(f, c) {
    return function(s, ...p) {
        let m;
        return q0(s) ? (m = ws.get(s),
        m || (m = new s,
        ws.set(s, m))) : m = s,
        f && f(m),
        Promise.all(p.map(h => new Promise( (T, A) => m.load(h, z => {
            Bt(z == null ? void 0 : z.scene) && Object.assign(z, O0(z.scene)),
            T(z)
        }
        , c, z => A(new Error(`Could not load ${h}: ${z == null ? void 0 : z.message}`))))))
    }
}
function Em(f, c, s, p) {
    const m = Array.isArray(c) ? c : [c]
      , h = o0(hm(s, p), [f, ...m], {
        equal: it.equ
    });
    return Array.isArray(c) ? h : h[0]
}
Em.preload = function(f, c, s) {
    const p = Array.isArray(c) ? c : [c];
    return d0(hm(s), [f, ...p])
}
;
Em.clear = function(f, c) {
    const s = Array.isArray(c) ? c : [c];
    return y0([f, ...s])
}
;
function B0(f) {
    const c = v0(f);
    return c.injectIntoDevTools({
        bundleType: 0,
        rendererPackageName: "@react-three/fiber",
        version: lt.version
    }),
    c
}
const zm = 0
  , ka = {}
  , Q0 = /^three(?=[A-Z])/
  , Qu = f => `${f[0].toUpperCase()}${f.slice(1)}`;
let Y0 = 0;
const G0 = f => typeof f == "function";
function fo(f) {
    if (G0(f)) {
        const c = `${Y0++}`;
        return ka[c] = f,
        c
    } else
        Object.assign(ka, f)
}
function Nm(f, c) {
    const s = Qu(f)
      , p = ka[s];
    if (f !== "primitive" && !p)
        throw new Error(`R3F: ${s} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);
    if (f === "primitive" && !c.object)
        throw new Error("R3F: Primitives without 'object' are invalid!");
    if (c.args !== void 0 && !Array.isArray(c.args))
        throw new Error("R3F: The args prop must be an array!")
}
function V0(f, c, s) {
    var p;
    return f = Qu(f)in ka ? f : f.replace(Q0, ""),
    Nm(f, c),
    f === "primitive" && (p = c.object) != null && p.__r3f && delete c.object.__r3f,
    bu(c.object, s, f, c)
}
function X0(f) {
    if (!f.isHidden) {
        var c;
        f.props.attach && (c = f.parent) != null && c.object ? Cu(f.parent, f) : Bt(f.object) && (f.object.visible = !1),
        f.isHidden = !0,
        te(f)
    }
}
function Tm(f) {
    if (f.isHidden) {
        var c;
        f.props.attach && (c = f.parent) != null && c.object ? Ru(f.parent, f) : Bt(f.object) && f.props.visible !== !1 && (f.object.visible = !0),
        f.isHidden = !1,
        te(f)
    }
}
function Wc(f, c, s) {
    const p = c.root.getState();
    if (!(!f.parent && f.object !== p.scene)) {
        if (!c.object) {
            var m, h;
            const T = ka[Qu(c.type)];
            c.object = (m = c.props.object) != null ? m : new T(...(h = c.props.args) != null ? h : []),
            c.object.__r3f = c
        }
        if (kl(c.object, c.props),
        c.props.attach)
            Ru(f, c);
        else if (Bt(c.object) && Bt(f.object)) {
            const T = f.object.children.indexOf(s == null ? void 0 : s.object);
            if (s && T !== -1) {
                const A = f.object.children.indexOf(c.object);
                if (A !== -1) {
                    f.object.children.splice(A, 1);
                    const z = A < T ? T - 1 : T;
                    f.object.children.splice(z, 0, c.object)
                } else
                    c.object.parent = f.object,
                    f.object.children.splice(T, 0, c.object),
                    c.object.dispatchEvent({
                        type: "added"
                    }),
                    f.object.dispatchEvent({
                        type: "childadded",
                        child: c.object
                    })
            } else
                f.object.add(c.object)
        }
        for (const T of c.children)
            Wc(c, T);
        te(c)
    }
}
function Dc(f, c) {
    c && (c.parent = f,
    f.children.push(c),
    Wc(f, c))
}
function ks(f, c, s) {
    if (!c || !s)
        return;
    c.parent = f;
    const p = f.children.indexOf(s);
    p !== -1 ? f.children.splice(p, 0, c) : f.children.push(c),
    Wc(f, c, s)
}
function Mm(f) {
    if (typeof f.dispose == "function") {
        const c = () => {
            try {
                f.dispose()
            } catch {}
        }
        ;
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? c() : Fs.unstable_scheduleCallback(Fs.unstable_IdlePriority, c)
    }
}
function Gc(f, c, s) {
    if (!c)
        return;
    c.parent = null;
    const p = f.children.indexOf(c);
    p !== -1 && f.children.splice(p, 1),
    c.props.attach ? Cu(f, c) : Bt(c.object) && Bt(f.object) && (f.object.remove(c.object),
    D0(mm(c), c.object));
    const m = c.props.dispose !== null && s !== !1;
    for (let h = c.children.length - 1; h >= 0; h--) {
        const T = c.children[h];
        Gc(c, T, m)
    }
    c.children.length = 0,
    delete c.object.__r3f,
    m && c.type !== "primitive" && c.object.type !== "Scene" && Mm(c.object),
    s === void 0 && te(c)
}
function Z0(f, c) {
    for (const s of [f, f.alternate])
        if (s !== null)
            if (typeof s.ref == "function") {
                s.refCleanup == null || s.refCleanup();
                const p = s.ref(c);
                typeof p == "function" && (s.refCleanup = p)
            } else
                s.ref && (s.ref.current = c)
}
const Du = [];
function K0() {
    for (const [s] of Du) {
        const p = s.parent;
        if (p) {
            s.props.attach ? Cu(p, s) : Bt(s.object) && Bt(p.object) && p.object.remove(s.object);
            for (const m of s.children)
                m.props.attach ? Cu(s, m) : Bt(m.object) && Bt(s.object) && s.object.remove(m.object)
        }
        s.isHidden && Tm(s),
        s.object.__r3f && delete s.object.__r3f,
        s.type !== "primitive" && Mm(s.object)
    }
    for (const [s,p,m] of Du) {
        s.props = p;
        const h = s.parent;
        if (h) {
            var f, c;
            const T = ka[Qu(s.type)];
            s.object = (f = s.props.object) != null ? f : new T(...(c = s.props.args) != null ? c : []),
            s.object.__r3f = s,
            Z0(m, s.object),
            kl(s.object, s.props),
            s.props.attach ? Ru(h, s) : Bt(s.object) && Bt(h.object) && h.object.add(s.object);
            for (const A of s.children)
                A.props.attach ? Ru(s, A) : Bt(A.object) && Bt(s.object) && s.object.add(A.object);
            te(s)
        }
    }
    Du.length = 0
}
const bc = () => {}
  , tm = {};
let Au = zm;
const x0 = 0
  , J0 = 4
  , Vc = B0({
    isPrimaryRenderer: !1,
    warnsIfNotActing: !1,
    supportsMutation: !0,
    supportsPersistence: !1,
    supportsHydration: !1,
    createInstance: V0,
    removeChild: Gc,
    appendChild: Dc,
    appendInitialChild: Dc,
    insertBefore: ks,
    appendChildToContainer(f, c) {
        const s = f.getState().scene.__r3f;
        !c || !s || Dc(s, c)
    },
    removeChildFromContainer(f, c) {
        const s = f.getState().scene.__r3f;
        !c || !s || Gc(s, c)
    },
    insertInContainerBefore(f, c, s) {
        const p = f.getState().scene.__r3f;
        !c || !s || !p || ks(p, c, s)
    },
    getRootHostContext: () => tm,
    getChildHostContext: () => tm,
    commitUpdate(f, c, s, p, m) {
        var h, T, A;
        Nm(c, p);
        let z = !1;
        if ((f.type === "primitive" && s.object !== p.object || ((h = p.args) == null ? void 0 : h.length) !== ((T = s.args) == null ? void 0 : T.length) || (A = p.args) != null && A.some( (U, O) => {
            var D;
            return U !== ((D = s.args) == null ? void 0 : D[O])
        }
        )) && (z = !0),
        z)
            Du.push([f, {
                ...p
            }, m]);
        else {
            const U = r0(f, p);
            Object.keys(U).length && (Object.assign(f.props, U),
            kl(f.object, U))
        }
        (m.sibling === null || (m.flags & J0) === x0) && K0()
    },
    finalizeInitialChildren: () => !1,
    commitMount() {},
    getPublicInstance: f => f == null ? void 0 : f.object,
    prepareForCommit: () => null,
    preparePortalMount: f => bu(f.getState().scene, f, "", {}),
    resetAfterCommit: () => {}
    ,
    shouldSetTextContent: () => !1,
    clearContainer: () => !1,
    hideInstance: X0,
    unhideInstance: Tm,
    createTextInstance: bc,
    hideTextInstance: bc,
    unhideTextInstance: bc,
    scheduleTimeout: typeof setTimeout == "function" ? setTimeout : void 0,
    cancelTimeout: typeof clearTimeout == "function" ? clearTimeout : void 0,
    noTimeout: -1,
    getInstanceFromNode: () => null,
    beforeActiveInstanceBlur() {},
    afterActiveInstanceBlur() {},
    detachDeletedInstance() {},
    prepareScopeUpdate() {},
    getInstanceFromScope: () => null,
    shouldAttemptEagerTransition: () => !1,
    trackSchedulerEvent: () => {}
    ,
    resolveEventType: () => null,
    resolveEventTimeStamp: () => -1.1,
    requestPostPaintCallback() {},
    maySuspendCommit: () => !1,
    preloadInstance: () => !0,
    startSuspendingCommit() {},
    suspendInstance() {},
    waitForCommitToBeReady: () => null,
    NotPendingTransition: null,
    HostTransitionContext: lt.createContext(null),
    setCurrentUpdatePriority(f) {
        Au = f
    },
    getCurrentUpdatePriority() {
        return Au
    },
    resolveUpdatePriority() {
        var f;
        if (Au !== zm)
            return Au;
        switch (typeof window < "u" && ((f = window.event) == null ? void 0 : f.type)) {
        case "click":
        case "contextmenu":
        case "dblclick":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
            return gu.DiscreteEventPriority;
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerenter":
        case "pointerleave":
        case "wheel":
            return gu.ContinuousEventPriority;
        default:
            return gu.DefaultEventPriority
        }
    },
    resetFormInstance() {}
})
  , Ta = new Map
  , $a = {
    objects: "shallow",
    strict: !1
};
function L0(f, c) {
    if (!c && typeof HTMLCanvasElement < "u" && f instanceof HTMLCanvasElement && f.parentElement) {
        const {width: s, height: p, top: m, left: h} = f.parentElement.getBoundingClientRect();
        return {
            width: s,
            height: p,
            top: m,
            left: h
        }
    } else if (!c && typeof OffscreenCanvas < "u" && f instanceof OffscreenCanvas)
        return {
            width: f.width,
            height: f.height,
            top: 0,
            left: 0
        };
    return {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        ...c
    }
}
function io(f) {
    const c = Ta.get(f)
      , s = c == null ? void 0 : c.fiber
      , p = c == null ? void 0 : c.store;
    c && console.warn("R3F.createRoot should only be called once!");
    const m = typeof reportError == "function" ? reportError : console.error
      , h = p || R0(Kc, am)
      , T = s || Vc.createContainer(h, gu.ConcurrentRoot, null, !1, null, "", m, m, m, null);
    c || Ta.set(f, {
        fiber: T,
        store: h
    });
    let A, z, g = !1, U = null;
    return {
        async configure(O={}) {
            let D;
            U = new Promise(mt => D = mt);
            let {gl: b, size: W, scene: x, events: V, onCreated: _, shadows: N=!1, linear: X=!1, flat: Y=!1, legacy: F=!1, orthographic: B=!1, frameloop: ct="always", dpr: pt=[1, 2], performance: at, raycaster: st, camera: et, onPointerMissed: Ma} = O
              , J = h.getState()
              , ht = J.gl;
            if (!J.gl) {
                const mt = {
                    canvas: f,
                    powerPreference: "high-performance",
                    antialias: !0,
                    alpha: !0
                }
                  , ot = typeof b == "function" ? await b(mt) : b;
                $s(ot) ? ht = ot : ht = new bp({
                    ...mt,
                    ...b
                }),
                J.set({
                    gl: ht
                })
            }
            let ul = J.raycaster;
            ul || J.set({
                raycaster: ul = new Rp
            });
            const {params: Ce, ...nl} = st || {};
            if (it.equ(nl, ul, $a) || kl(ul, {
                ...nl
            }),
            it.equ(Ce, ul.params, $a) || kl(ul, {
                params: {
                    ...ul.params,
                    ...Ce
                }
            }),
            !J.camera || J.camera === z && !it.equ(z, et, $a)) {
                z = et;
                const mt = et == null ? void 0 : et.isCamera
                  , ot = mt ? et : B ? new Cp(0,0,0,0,.1,1e3) : new qp(75,0,.1,1e3);
                mt || (ot.position.z = 5,
                et && (kl(ot, et),
                ot.manual || ("aspect"in et || "left"in et || "right"in et || "bottom"in et || "top"in et) && (ot.manual = !0,
                ot.updateProjectionMatrix())),
                !J.camera && !(et != null && et.rotation) && ot.lookAt(0, 0, 0)),
                J.set({
                    camera: ot
                }),
                ul.camera = ot
            }
            if (!J.scene) {
                let mt;
                x != null && x.isScene ? (mt = x,
                bu(mt, h, "", {})) : (mt = new Bp,
                bu(mt, h, "", {}),
                x && kl(mt, x)),
                J.set({
                    scene: mt
                })
            }
            V && !J.events.handlers && J.set({
                events: V(h)
            });
            const ta = L0(f, W);
            if (it.equ(ta, J.size, $a) || J.setSize(ta.width, ta.height, ta.top, ta.left),
            pt && J.viewport.dpr !== pm(pt) && J.setDpr(pt),
            J.frameloop !== ct && J.setFrameloop(ct),
            J.onPointerMissed || J.set({
                onPointerMissed: Ma
            }),
            at && !it.equ(at, J.performance, $a) && J.set(mt => ({
                performance: {
                    ...mt.performance,
                    ...at
                }
            })),
            !J.xr) {
                var Rt;
                const mt = (Mt, bl) => {
                    const Oa = h.getState();
                    Oa.frameloop !== "never" && am(Mt, !0, Oa, bl)
                }
                  , ot = () => {
                    const Mt = h.getState();
                    Mt.gl.xr.enabled = Mt.gl.xr.isPresenting,
                    Mt.gl.xr.setAnimationLoop(Mt.gl.xr.isPresenting ? mt : null),
                    Mt.gl.xr.isPresenting || Kc(Mt)
                }
                  , Dl = {
                    connect() {
                        const Mt = h.getState().gl;
                        Mt.xr.addEventListener("sessionstart", ot),
                        Mt.xr.addEventListener("sessionend", ot)
                    },
                    disconnect() {
                        const Mt = h.getState().gl;
                        Mt.xr.removeEventListener("sessionstart", ot),
                        Mt.xr.removeEventListener("sessionend", ot)
                    }
                };
                typeof ((Rt = ht.xr) == null ? void 0 : Rt.addEventListener) == "function" && Dl.connect(),
                J.set({
                    xr: Dl
                })
            }
            if (ht.shadowMap) {
                const mt = ht.shadowMap.enabled
                  , ot = ht.shadowMap.type;
                if (ht.shadowMap.enabled = !!N,
                it.boo(N))
                    ht.shadowMap.type = Oc;
                else if (it.str(N)) {
                    var ml;
                    const Dl = {
                        basic: Gp,
                        percentage: Yp,
                        soft: Oc,
                        variance: Qp
                    };
                    ht.shadowMap.type = (ml = Dl[N]) != null ? ml : Oc
                } else
                    it.obj(N) && Object.assign(ht.shadowMap, N);
                (mt !== ht.shadowMap.enabled || ot !== ht.shadowMap.type) && (ht.shadowMap.needsUpdate = !0)
            }
            return Vp.enabled = !F,
            g || (ht.outputColorSpace = X ? Xp : nm,
            ht.toneMapping = Y ? Zp : Kp),
            J.legacy !== F && J.set( () => ({
                legacy: F
            })),
            J.linear !== X && J.set( () => ({
                linear: X
            })),
            J.flat !== Y && J.set( () => ({
                flat: Y
            })),
            b && !it.fun(b) && !$s(b) && !it.equ(b, ht, $a) && kl(ht, b),
            A = _,
            g = !0,
            D(),
            this
        },
        render(O) {
            return !g && !U && this.configure(),
            U.then( () => {
                Vc.updateContainer(gl.jsx(W0, {
                    store: h,
                    children: O,
                    onCreated: A,
                    rootElement: f
                }), T, null, () => {}
                )
            }
            ),
            h
        },
        unmount() {
            F0(f)
        }
    }
}
function W0({store: f, children: c, onCreated: s, rootElement: p}) {
    return Bu( () => {
        const m = f.getState();
        m.set(h => ({
            internal: {
                ...h.internal,
                active: !0
            }
        })),
        s && s(m),
        f.getState().events.connected || m.events.connect == null || m.events.connect(p)
    }
    , []),
    gl.jsx(ym.Provider, {
        value: f,
        children: c
    })
}
function F0(f, c) {
    const s = Ta.get(f)
      , p = s == null ? void 0 : s.fiber;
    if (p) {
        const m = s == null ? void 0 : s.store.getState();
        m && (m.internal.active = !1),
        Vc.updateContainer(null, p, null, () => {
            m && setTimeout( () => {
                try {
                    var h, T, A, z;
                    m.events.disconnect == null || m.events.disconnect(),
                    (h = m.gl) == null || (T = h.renderLists) == null || T.dispose == null || T.dispose(),
                    (A = m.gl) == null || A.forceContextLoss == null || A.forceContextLoss(),
                    (z = m.gl) != null && z.xr && m.xr.disconnect(),
                    H0(m.scene),
                    Ta.delete(f)
                } catch {}
            }
            , 500)
        }
        )
    }
}
const P0 = new Set
  , I0 = new Set
  , $0 = new Set;
function Rc(f, c) {
    if (f.size)
        for (const {callback: s} of f.values())
            s(c)
}
function be(f, c) {
    switch (f) {
    case "before":
        return Rc(P0, c);
    case "after":
        return Rc(I0, c);
    case "tail":
        return Rc($0, c)
    }
}
let Cc, qc;
function Xc(f, c, s) {
    let p = c.clock.getDelta();
    c.frameloop === "never" && typeof f == "number" && (p = f - c.clock.elapsedTime,
    c.clock.oldTime = c.clock.elapsedTime,
    c.clock.elapsedTime = f),
    Cc = c.internal.subscribers;
    for (let m = 0; m < Cc.length; m++)
        qc = Cc[m],
        qc.ref.current(qc.store.getState(), p, s);
    return !c.internal.priority && c.gl.render && c.gl.render(c.scene, c.camera),
    c.internal.frames = Math.max(0, c.internal.frames - 1),
    c.frameloop === "always" ? 1 : c.internal.frames
}
let qu = !1, Zc = !1, Bc, lm, wa;
function Om(f) {
    lm = requestAnimationFrame(Om),
    qu = !0,
    Bc = 0,
    be("before", f),
    Zc = !0;
    for (const s of Ta.values()) {
        var c;
        wa = s.store.getState(),
        wa.internal.active && (wa.frameloop === "always" || wa.internal.frames > 0) && !((c = wa.gl.xr) != null && c.isPresenting) && (Bc += Xc(f, wa))
    }
    if (Zc = !1,
    be("after", f),
    Bc === 0)
        return be("tail", f),
        qu = !1,
        cancelAnimationFrame(lm)
}
function Kc(f, c=1) {
    var s;
    if (!f)
        return Ta.forEach(p => Kc(p.store.getState(), c));
    (s = f.gl.xr) != null && s.isPresenting || !f.internal.active || f.frameloop === "never" || (c > 1 ? f.internal.frames = Math.min(60, f.internal.frames + c) : Zc ? f.internal.frames = 2 : f.internal.frames = 1,
    qu || (qu = !0,
    requestAnimationFrame(Om)))
}
function am(f, c=!0, s, p) {
    if (c && be("before", f),
    s)
        Xc(f, s, p);
    else
        for (const m of Ta.values())
            Xc(f, m.store.getState());
    c && be("after", f)
}
const Qc = {
    onClick: ["click", !1],
    onContextMenu: ["contextmenu", !1],
    onDoubleClick: ["dblclick", !1],
    onWheel: ["wheel", !0],
    onPointerDown: ["pointerdown", !0],
    onPointerUp: ["pointerup", !0],
    onPointerLeave: ["pointerleave", !0],
    onPointerMove: ["pointermove", !0],
    onPointerCancel: ["pointercancel", !0],
    onLostPointerCapture: ["lostpointercapture", !0]
};
function so(f) {
    const {handlePointer: c} = b0(f);
    return {
        priority: 1,
        enabled: !0,
        compute(s, p, m) {
            p.pointer.set(s.offsetX / p.size.width * 2 - 1, -(s.offsetY / p.size.height) * 2 + 1),
            p.raycaster.setFromCamera(p.pointer, p.camera)
        },
        connected: void 0,
        handlers: Object.keys(Qc).reduce( (s, p) => ({
            ...s,
            [p]: c(p)
        }), {}),
        update: () => {
            var s;
            const {events: p, internal: m} = f.getState();
            (s = m.lastEvent) != null && s.current && p.handlers && p.handlers.onPointerMove(m.lastEvent.current)
        }
        ,
        connect: s => {
            const {set: p, events: m} = f.getState();
            if (m.disconnect == null || m.disconnect(),
            p(h => ({
                events: {
                    ...h.events,
                    connected: s
                }
            })),
            m.handlers)
                for (const h in m.handlers) {
                    const T = m.handlers[h]
                      , [A,z] = Qc[h];
                    s.addEventListener(A, T, {
                        passive: z
                    })
                }
        }
        ,
        disconnect: () => {
            const {set: s, events: p} = f.getState();
            if (p.connected) {
                if (p.handlers)
                    for (const m in p.handlers) {
                        const h = p.handlers[m]
                          , [T] = Qc[m];
                        p.connected.removeEventListener(T, h)
                    }
                s(m => ({
                    events: {
                        ...m.events,
                        connected: void 0
                    }
                }))
            }
        }
    }
}
const w0 = () => {
    const f = lt.useRef()
      , c = lt.useMemo( () => {
        const p = new Float32Array(3e3)
          , m = new Float32Array(1e3 * 3);
        for (let h = 0; h < 1e3; h++) {
            const T = h * 3;
            p[T] = (Math.random() - .5) * 50,
            p[T + 1] = (Math.random() - .5) * 100,
            p[T + 2] = (Math.random() - .5) * 50,
            m[T] = (Math.random() - .5) * .1,
            m[T + 1] = .02 + Math.random() * .05,
            m[T + 2] = (Math.random() - .5) * .1
        }
        return {
            positions: p,
            speeds: m
        }
    }
    , []);
    return C0( (s, p) => {
        if (f.current) {
            const m = f.current.geometry.attributes.position.array
              , h = f.current.geometry.attributes.speed.array;
            for (let T = 0; T < m.length; T += 3)
                (!isFinite(m[T]) || !isFinite(m[T + 1]) || !isFinite(m[T + 2]) || !isFinite(h[T]) || !isFinite(h[T + 1]) || !isFinite(h[T + 2])) && (console.warn(`Particle ${T / 3} bị lỗi NaN, reset lại.`),
                m[T] = (Math.random() - .5) * 50,
                m[T + 1] = -25,
                m[T + 2] = (Math.random() - .5) * 50,
                h[T] = (Math.random() - .5) * 2,
                h[T + 1] = Math.random() * 2,
                h[T + 2] = (Math.random() - .5) * 2),
                m[T] += h[T] * p * 80,
                m[T + 1] += h[T + 1] * p * 20,
                m[T + 2] += h[T + 2] * p * 80,
                m[T + 1] > 25 && (m[T + 1] = -25,
                m[T] = (Math.random() - .5) * 50,
                m[T + 2] = (Math.random() - .5) * 50);
            f.current.geometry.attributes.position.needsUpdate = !0
        }
    }
    ),
    gl.jsxs("points", {
        ref: f,
        position: [0, 0, -1],
        children: [gl.jsxs("bufferGeometry", {
            children: [gl.jsx("bufferAttribute", {
                attach: "attributes-position",
                array: c.positions,
                count: c.positions.length / 3,
                itemSize: 3
            }), gl.jsx("bufferAttribute", {
                attach: "attributes-speed",
                array: c.speeds,
                count: c.speeds.length / 3,
                itemSize: 3
            })]
        }), gl.jsx("pointsMaterial", {
            size: .03,
            color: "white"
        })]
    })
}
  , mo = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: w0
}, Symbol.toStringTag, {
    value: "Module"
}));
export {eo as B, uo as E, w0 as P, M0 as a, Bu as b, io as c, so as d, fo as e, F0 as f, co as g, C0 as h, lo as i, Em as j, S0 as m, mo as p, o0 as s, ao as u};