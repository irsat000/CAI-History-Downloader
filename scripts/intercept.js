//XHook - v1.6.2 - https://github.com/jpillora/xhook
//Jaime Pillora <dev@jpillora.com> - MIT Copyright 2023
var xhook = function () { "use strict"; const e = (e, t) => Array.prototype.slice.call(e, t); let t = null; "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? t = self : "undefined" != typeof global ? t = global : window && (t = window); const n = t, o = t.document, r = ["load", "loadend", "loadstart"], s = ["progress", "abort", "error", "timeout"], a = e => ["returnValue", "totalSize", "position"].includes(e), i = function (e, t) { for (let n in e) { if (a(n)) continue; const o = e[n]; try { t[n] = o } catch (e) { } } return t }, c = function (e, t, n) { const o = e => function (o) { const r = {}; for (let e in o) { if (a(e)) continue; const s = o[e]; r[e] = s === t ? n : s } return n.dispatchEvent(e, r) }; for (let r of Array.from(e)) n._has(r) && (t[`on${r}`] = o(r)) }, u = function (e) { if (o && null != o.createEventObject) { const t = o.createEventObject(); return t.type = e, t } try { return new Event(e) } catch (t) { return { type: e } } }, l = function (t) { let n = {}; const o = e => n[e] || [], r = { addEventListener: function (e, t, r) { n[e] = o(e), n[e].indexOf(t) >= 0 || (r = void 0 === r ? n[e].length : r, n[e].splice(r, 0, t)) }, removeEventListener: function (e, t) { if (void 0 === e) return void (n = {}); void 0 === t && (n[e] = []); const r = o(e).indexOf(t); -1 !== r && o(e).splice(r, 1) }, dispatchEvent: function () { const n = e(arguments), s = n.shift(); t || (n[0] = i(n[0], u(s)), Object.defineProperty(n[0], "target", { writable: !1, value: this })); const a = r[`on${s}`]; a && a.apply(r, n); const c = o(s).concat(o("*")); for (let e = 0; e < c.length; e++) { c[e].apply(r, n) } }, _has: e => !(!n[e] && !r[`on${e}`]) }; return t && (r.listeners = t => e(o(t)), r.on = r.addEventListener, r.off = r.removeEventListener, r.fire = r.dispatchEvent, r.once = function (e, t) { var n = function () { return r.off(e, n), t.apply(null, arguments) }; return r.on(e, n) }, r.destroy = () => n = {}), r }; var f = function (e, t) { switch (typeof e) { case "object": return n = e, Object.entries(n).map((([e, t]) => `${e.toLowerCase()}: ${t}`)).join("\r\n"); case "string": return function (e, t) { const n = e.split("\r\n"); null == t && (t = {}); for (let e of n) if (/([^:]+):\s*(.+)/.test(e)) { const e = null != RegExp.$1 ? RegExp.$1.toLowerCase() : void 0, n = RegExp.$2; null == t[e] && (t[e] = n) } return t }(e, t) }var n; return [] }; const d = l(!0), p = e => void 0 === e ? null : e, h = n.XMLHttpRequest, y = function () { const e = new h, t = {}; let n, o, a, u = null; var y = 0; const v = function () { if (a.status = u || e.status, -1 !== u && (a.statusText = e.statusText), -1 === u); else { const t = f(e.getAllResponseHeaders()); for (let e in t) { const n = t[e]; if (!a.headers[e]) { const t = e.toLowerCase(); a.headers[t] = n } } } }, b = function () { x.status = a.status, x.statusText = a.statusText }, g = function () { n || x.dispatchEvent("load", {}), x.dispatchEvent("loadend", {}), n && (x.readyState = 0) }, E = function (e) { for (; e > y && y < 4;)x.readyState = ++y, 1 === y && x.dispatchEvent("loadstart", {}), 2 === y && b(), 4 === y && (b(), "text" in a && (x.responseText = a.text), "xml" in a && (x.responseXML = a.xml), "data" in a && (x.response = a.data), "finalUrl" in a && (x.responseURL = a.finalUrl)), x.dispatchEvent("readystatechange", {}), 4 === y && (!1 === t.async ? g() : setTimeout(g, 0)) }, m = function (e) { if (4 !== e) return void E(e); const n = d.listeners("after"); var o = function () { if (n.length > 0) { const e = n.shift(); 2 === e.length ? (e(t, a), o()) : 3 === e.length && t.async ? e(t, a, o) : o() } else E(4) }; o() }; var x = l(); t.xhr = x, e.onreadystatechange = function (t) { try { 2 === e.readyState && v() } catch (e) { } 4 === e.readyState && (o = !1, v(), function () { if (e.responseType && "text" !== e.responseType) "document" === e.responseType ? (a.xml = e.responseXML, a.data = e.responseXML) : a.data = e.response; else { a.text = e.responseText, a.data = e.responseText; try { a.xml = e.responseXML } catch (e) { } } "responseURL" in e && (a.finalUrl = e.responseURL) }()), m(e.readyState) }; const w = function () { n = !0 }; x.addEventListener("error", w), x.addEventListener("timeout", w), x.addEventListener("abort", w), x.addEventListener("progress", (function (t) { y < 3 ? m(3) : e.readyState <= 3 && x.dispatchEvent("readystatechange", {}) })), "withCredentials" in e && (x.withCredentials = !1), x.status = 0; for (let e of Array.from(s.concat(r))) x[`on${e}`] = null; if (x.open = function (e, r, s, i, c) { y = 0, n = !1, o = !1, t.headers = {}, t.headerNames = {}, t.status = 0, t.method = e, t.url = r, t.async = !1 !== s, t.user = i, t.pass = c, a = {}, a.headers = {}, m(1) }, x.send = function (n) { let u, l; for (u of ["type", "timeout", "withCredentials"]) l = "type" === u ? "responseType" : u, l in x && (t[u] = x[l]); t.body = n; const f = d.listeners("before"); var p = function () { if (!f.length) return function () { for (u of (c(s, e, x), x.upload && c(s.concat(r), e.upload, x.upload), o = !0, e.open(t.method, t.url, t.async, t.user, t.pass), ["type", "timeout", "withCredentials"])) l = "type" === u ? "responseType" : u, u in t && (e[l] = t[u]); for (let n in t.headers) { const o = t.headers[n]; n && e.setRequestHeader(n, o) } e.send(t.body) }(); const n = function (e) { if ("object" == typeof e && ("number" == typeof e.status || "number" == typeof a.status)) return i(e, a), "data" in e || (e.data = e.response || e.text), void m(4); p() }; n.head = function (e) { i(e, a), m(2) }, n.progress = function (e) { i(e, a), m(3) }; const d = f.shift(); 1 === d.length ? n(d(t)) : 2 === d.length && t.async ? d(t, n) : n() }; p() }, x.abort = function () { u = -1, o ? e.abort() : x.dispatchEvent("abort", {}) }, x.setRequestHeader = function (e, n) { const o = null != e ? e.toLowerCase() : void 0, r = t.headerNames[o] = t.headerNames[o] || e; t.headers[r] && (n = t.headers[r] + ", " + n), t.headers[r] = n }, x.getResponseHeader = e => p(a.headers[e ? e.toLowerCase() : void 0]), x.getAllResponseHeaders = () => p(f(a.headers)), e.overrideMimeType && (x.overrideMimeType = function () { e.overrideMimeType.apply(e, arguments) }), e.upload) { let e = l(); x.upload = e, t.upload = e } return x.UNSENT = 0, x.OPENED = 1, x.HEADERS_RECEIVED = 2, x.LOADING = 3, x.DONE = 4, x.response = "", x.responseText = "", x.responseXML = null, x.readyState = 0, x.statusText = "", x }; y.UNSENT = 0, y.OPENED = 1, y.HEADERS_RECEIVED = 2, y.LOADING = 3, y.DONE = 4; var v = { patch() { h && (n.XMLHttpRequest = y) }, unpatch() { h && (n.XMLHttpRequest = h) }, Native: h, Xhook: y }; function b(e, t, n, o) { return new (n || (n = Promise))((function (r, s) { function a(e) { try { c(o.next(e)) } catch (e) { s(e) } } function i(e) { try { c(o.throw(e)) } catch (e) { s(e) } } function c(e) { var t; e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) { e(t) }))).then(a, i) } c((o = o.apply(e, t || [])).next()) })) } const g = n.fetch; function E(e) { return e instanceof Headers ? m([...e.entries()]) : Array.isArray(e) ? m(e) : e } function m(e) { return e.reduce(((e, [t, n]) => (e[t] = n, e)), {}) } const x = function (e, t = { headers: {} }) { let n = Object.assign(Object.assign({}, t), { isFetch: !0 }); if (e instanceof Request) { const o = function (e) { let t = {}; return ["method", "headers", "body", "mode", "credentials", "cache", "redirect", "referrer", "referrerPolicy", "integrity", "keepalive", "signal", "url"].forEach((n => t[n] = e[n])), t }(e), r = Object.assign(Object.assign({}, E(o.headers)), E(n.headers)); n = Object.assign(Object.assign(Object.assign({}, o), t), { headers: r, acceptedRequest: !0 }) } else n.url = e; const o = d.listeners("before"), r = d.listeners("after"); return new Promise((function (t, s) { let a = t; const i = function (e) { if (!r.length) return a(e); const t = r.shift(); return 2 === t.length ? (t(n, e), i(e)) : 3 === t.length ? t(n, e, i) : i(e) }, c = function (e) { if (void 0 !== e) { const n = new Response(e.body || e.text, e); return t(n), void i(n) } u() }, u = function () { if (!o.length) return void l(); const e = o.shift(); return 1 === e.length ? c(e(n)) : 2 === e.length ? e(n, c) : void 0 }, l = () => b(this, void 0, void 0, (function* () { const { url: t, isFetch: o, acceptedRequest: r } = n, c = function (e, t) { var n = {}; for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]); if (null != e && "function" == typeof Object.getOwnPropertySymbols) { var r = 0; for (o = Object.getOwnPropertySymbols(e); r < o.length; r++)t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]) } return n }(n, ["url", "isFetch", "acceptedRequest"]); return e instanceof Request && c.body instanceof ReadableStream && (c.body = yield new Response(c.body).text()), g(t, c).then((e => i(e))).catch((function (e) { return a = s, i(e), s(e) })) })); u() })) }; var w = { patch() { g && (n.fetch = x) }, unpatch() { g && (n.fetch = g) }, Native: g, Xhook: x }; const O = d; return O.EventEmitter = l, O.before = function (e, t) { if (e.length < 1 || e.length > 2) throw "invalid hook"; return O.on("before", e, t) }, O.after = function (e, t) { if (e.length < 2 || e.length > 3) throw "invalid hook"; return O.on("after", e, t) }, O.enable = function () { v.patch(), w.patch() }, O.disable = function () { v.unpatch(), w.unpatch() }, O.XMLHttpRequest = v.Native, O.fetch = w.Native, O.headers = f, O.enable(), O }();
//# sourceMappingURL=xhook.min.js.map
/* eslint-disable no-proto */
/* eslint-disable accessor-pairs */
/* eslint-disable no-global-assign */

/* wsHook.js
 * https://github.com/skepticfx/wshook
 * Reference: http://www.w3.org/TR/2011/WD-websockets-20110419/#websocket
 */

var wsHook = {};
(function () {
    // Mutable MessageEvent.
    // Subclasses MessageEvent and makes data, origin and other MessageEvent properties mutatble.
    function MutableMessageEvent(o) {
        this.bubbles = o.bubbles || false
        this.cancelBubble = o.cancelBubble || false
        this.cancelable = o.cancelable || false
        this.currentTarget = o.currentTarget || null
        this.data = o.data || null
        this.defaultPrevented = o.defaultPrevented || false
        this.eventPhase = o.eventPhase || 0
        this.lastEventId = o.lastEventId || ''
        this.origin = o.origin || ''
        this.path = o.path || new Array(0)
        this.ports = o.parts || new Array(0)
        this.returnValue = o.returnValue || true
        this.source = o.source || null
        this.srcElement = o.srcElement || null
        this.target = o.target || null
        this.timeStamp = o.timeStamp || null
        this.type = o.type || 'message'
        this.__proto__ = o.__proto__ || MessageEvent.__proto__
    }

    var before = wsHook.before = function (data, url, wsObject) {
        return data
    }
    var after = wsHook.after = function (e, url, wsObject) {
        return e
    }
    var modifyUrl = wsHook.modifyUrl = function (url) {
        return url
    }
    wsHook.resetHooks = function () {
        wsHook.before = before
        wsHook.after = after
        wsHook.modifyUrl = modifyUrl
    }

    var _WS = WebSocket
    WebSocket = function (url, protocols) {
        var WSObject
        url = wsHook.modifyUrl(url) || url
        this.url = url
        this.protocols = protocols
        if (!this.protocols) { WSObject = new _WS(url) } else { WSObject = new _WS(url, protocols) }

        var _send = WSObject.send
        WSObject.send = function (data) {
            arguments[0] = wsHook.before(data, WSObject.url, WSObject) || data
            _send.apply(this, arguments)
        }

        // Events needs to be proxied and bubbled down.
        WSObject._addEventListener = WSObject.addEventListener
        WSObject.addEventListener = function () {
            var eventThis = this
            // if eventName is 'message'
            if (arguments[0] === 'message') {
                arguments[1] = (function (userFunc) {
                    return function instrumentAddEventListener() {
                        arguments[0] = wsHook.after(new MutableMessageEvent(arguments[0]), WSObject.url, WSObject)
                        if (arguments[0] === null) return
                        userFunc.apply(eventThis, arguments)
                    }
                })(arguments[1])
            }
            return WSObject._addEventListener.apply(this, arguments)
        }

        Object.defineProperty(WSObject, 'onmessage', {
            'set': function () {
                var eventThis = this
                var userFunc = arguments[0]
                var onMessageHandler = function () {
                    arguments[0] = wsHook.after(new MutableMessageEvent(arguments[0]), WSObject.url, WSObject)
                    if (arguments[0] === null) return
                    userFunc.apply(eventThis, arguments)
                }
                WSObject._addEventListener.apply(this, ['message', onMessageHandler, false])
            }
        })

        return WSObject
    }
})()
















wsHook.before = function (data, url, wsObject) {
    const updated = JSON.parse(data);
    if (updated.command === "create_and_generate_turn") {
        // If memory manager conditions are met, modify the message and send it
        if (checkMemoryManager()) {
            const message = updated.payload.turn.candidates[0].raw_content;
            updated.payload.turn.candidates[0].raw_content = addMemoryToMessage(message);
            return JSON.stringify(updated);
        }
    }
}




xhook.before(function (request) {
    // Save access token for to keep cai tools functioning
    const AccessToken = request.headers.Authorization;
    if (AccessToken && AccessToken.includes('Token ')) {
        createAccessTokenMeta(AccessToken);
    }

    const HISTORIES_URL = "character.ai/chat/character/histories_v2/";
    const SEND_MESSAGE_URL = "character.ai/chat/streaming/";

    if (request.url.includes(HISTORIES_URL)) {
        let payload = JSON.parse(request.body);
        payload.number = 999;
        request.body = JSON.stringify(payload);
        return;
    }
    else if (request.url.includes(SEND_MESSAGE_URL) && request.method === "POST") {
        if (!checkMemoryManager()) return;
        // Get body
        let payload = JSON.parse(request.body);
        // Alter payload's text property (user's message)
        const message = payload.text;
        payload.text = addMemoryToMessage(message);
        // Save body
        request.body = JSON.stringify(payload);
        return;
    }
});

/* Moved to a more mobile approach to get necessary data
xhook.after(function (request, response) {
});*/









function checkMemoryManager(type) {
    try {
        // Check char id
        const charId = getCharId();
        if (!charId) {
            throw "Char ID couldn't be found at checkMemoryManager() function";
        }
        // No memory settings
        let caiToolsSettings = JSON.parse(localStorage.getItem('cai_tools'));
        if (!caiToolsSettings || !caiToolsSettings.memoryManager)
            return false;
        // This char's settings are not specified
        const charMemories = caiToolsSettings.memoryManager.mmList.find(obj => obj.char === charId);
        if (!charMemories || !charMemories.list.length === 0)
            return false;

        // Different actions
        if (type === "getList") {
            // Get memory list of the character
            return charMemories.list;
        }
        else {
            // Checks memory manager active status
            if (!caiToolsSettings.memoryManager.mmActive) {
                return false;
            }
            // Check skips
            const timesSkipped = charMemories.timesSkipped ?? 0;
            console.log("Freq", caiToolsSettings.memoryManager.mmRemindFrequency, "Skipped", timesSkipped);
            if (caiToolsSettings.memoryManager.mmRemindFrequency > 0 && (!timesSkipped || timesSkipped < caiToolsSettings.memoryManager.mmRemindFrequency)) {
                // Increase times skipped
                charMemories.timesSkipped = timesSkipped + 1;
                // Save to local storage for persistent data
                localStorage.setItem('cai_tools', JSON.stringify(caiToolsSettings));
                return false;
            }
            // Reset times skipped because now we are adding memories
            charMemories.timesSkipped = 0;
            // Save to local storage for persistent data
            localStorage.setItem('cai_tools', JSON.stringify(caiToolsSettings));
            return true;
        }
    } catch (error) {
        console.log("Screenshot this error: " + error);
        return false;
    }
}

function addMemoryToMessage(original) {
    try {
        // Change commas and line breaks to prevent visual errors
        function formatMemory(memory) {
            return memory.replace(/"/g, '”').replace(/\n+/g, ' — ');
        }
        // Parse cai tools settings from storage
        let memoryPart = "";
        const charMemories = checkMemoryManager("getList");
        // Push the memories
        charMemories.forEach(memory => {
            memoryPart += `[-](#- "Memory: ${formatMemory(memory)}")\n`;
        });
        // Merge and send
        return memoryPart + original;
    } catch (error) {
        console.log("Screenshot this error: " + error);
        return original;
    }
}

//const memory = `[Memory](#- "Say I love apple if you can read this!") `;

function createAccessTokenMeta(AccessToken) {
    if (document.querySelector('meta[cai_token]')) {
        document.querySelector('meta[cai_token]')
            .setAttribute('cai_token', AccessToken);
    }
    else {
        const meta = document.createElement('meta');
        meta.setAttribute('cai_token', AccessToken);
        document.head.appendChild(meta);
    }
}


function getCharId() {
    const location = getPageType();
    // If new design
    if (location === 'character.ai/chat') {
        // path only: /chat/[charId]
        return window.location.pathname.split('/')[2];
    }
    // If legacy
    else {
        // path with query string: /chat?char=[charId]
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const charId = searchParams.get('char');
        return charId;
    }
}

// Get the "identification" of a page
function getPageType() {
    // Examples:
    // character.ai/chat
    // *.character.ai/chat2
    // *.character.ai/chat
    return window.location.hostname + '/' + window.location.pathname.split('/')[1];
}
