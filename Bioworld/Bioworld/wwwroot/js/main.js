var _fixed_menu;
!(function (e, i) {
    "function" == typeof define && define.amd
        ? define("jquery-bridget/jquery-bridget", ["jquery"], function (t) {
              return i(e, t);
          })
        : "object" == typeof module && module.exports
        ? (module.exports = i(e, require("jquery")))
        : (e.jQueryBridget = i(e, e.jQuery));
})(window, function (t, e) {
    "use strict";
    var i = Array.prototype.slice,
        n = t.console,
        c =
            void 0 === n
                ? function () {}
                : function (t) {
                      n.error(t);
                  };

    function o(h, o, d) {
        (d = d || e || t.jQuery) &&
            (o.prototype.option ||
                (o.prototype.option = function (t) {
                    d.isPlainObject(t) && (this.options = d.extend(!0, this.options, t));
                }),
            (d.fn[h] = function (t) {
                return "string" == typeof t
                    ? (function (t, s, r) {
                          var a,
                              l = "$()." + h + '("' + s + '")';
                          return (
                              t.each(function (t, e) {
                                  var i = d.data(e, h);
                                  if (i) {
                                      var n = i[s];
                                      if (n && "_" != s.charAt(0)) {
                                          var o = n.apply(i, r);
                                          a = void 0 === a ? o : a;
                                      } else c(l + " is not a valid method");
                                  } else c(h + " not initialized. Cannot call methods, i.e. " + l);
                              }),
                              void 0 !== a ? a : t
                          );
                      })(this, t, i.call(arguments, 1))
                    : ((function (t, n) {
                          t.each(function (t, e) {
                              var i = d.data(e, h);
                              i ? (i.option(n), i._init()) : ((i = new o(e, n)), d.data(e, h, i));
                          });
                      })(this, t),
                      this);
            }),
            s(d));
    }

    function s(t) {
        !t || (t && t.bridget) || (t.bridget = o);
    }

    return s(e || t.jQuery), o;
}),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.EvEmitter = e());
    })("undefined" != typeof window ? window : this, function () {
        function t() {}

        var e = t.prototype;
        return (
            (e.on = function (t, e) {
                if (t && e) {
                    var i = (this._events = this._events || {}),
                        n = (i[t] = i[t] || []);
                    return -1 == n.indexOf(e) && n.push(e), this;
                }
            }),
            (e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = (this._onceEvents = this._onceEvents || {});
                    return ((i[t] = i[t] || {})[e] = !0), this;
                }
            }),
            (e.off = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return -1 != n && i.splice(n, 1), this;
                }
            }),
            (e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    (i = i.slice(0)), (e = e || []);
                    for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                        var s = i[o];
                        n && n[s] && (this.off(t, s), delete n[s]), s.apply(this, e);
                    }
                    return this;
                }
            }),
            (e.allOff = function () {
                delete this._events, delete this._onceEvents;
            }),
            t
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.getSize = e());
    })(window, function () {
        "use strict";

        function y(t) {
            var e = parseFloat(t);
            return -1 == t.indexOf("%") && !isNaN(e) && e;
        }

        var i =
                "undefined" == typeof console
                    ? function () {}
                    : function (t) {
                          console.error(t);
                      },
            v = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            _ = v.length;

        function w(t) {
            var e = getComputedStyle(t);
            return e || i("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e;
        }

        var x,
            b = !1;

        function $(t) {
            if (
                ((function () {
                    if (!b) {
                        b = !0;
                        var t = document.createElement("div");
                        (t.style.width = "200px"), (t.style.padding = "1px 2px 3px 4px"), (t.style.borderStyle = "solid"), (t.style.borderWidth = "1px 2px 3px 4px"), (t.style.boxSizing = "border-box");
                        var e = document.body || document.documentElement;
                        e.appendChild(t);
                        var i = w(t);
                        (x = 200 == Math.round(y(i.width))), ($.isBoxSizeOuter = x), e.removeChild(t);
                    }
                })(),
                "string" == typeof t && (t = document.querySelector(t)),
                t && "object" == typeof t && t.nodeType)
            ) {
                var e = w(t);
                if ("none" == e.display)
                    return (function () {
                        for (
                            var t = {
                                    width: 0,
                                    height: 0,
                                    innerWidth: 0,
                                    innerHeight: 0,
                                    outerWidth: 0,
                                    outerHeight: 0,
                                },
                                e = 0;
                            e < _;
                            e++
                        )
                            t[v[e]] = 0;
                        return t;
                    })();
                var i = {};
                (i.width = t.offsetWidth), (i.height = t.offsetHeight);
                for (var n = (i.isBorderBox = "border-box" == e.boxSizing), o = 0; o < _; o++) {
                    var s = v[o],
                        r = e[s],
                        a = parseFloat(r);
                    i[s] = isNaN(a) ? 0 : a;
                }
                var l = i.paddingLeft + i.paddingRight,
                    h = i.paddingTop + i.paddingBottom,
                    d = i.marginLeft + i.marginRight,
                    c = i.marginTop + i.marginBottom,
                    u = i.borderLeftWidth + i.borderRightWidth,
                    p = i.borderTopWidth + i.borderBottomWidth,
                    g = n && x,
                    m = y(e.width);
                !1 !== m && (i.width = m + (g ? 0 : l + u));
                var f = y(e.height);
                return !1 !== f && (i.height = f + (g ? 0 : h + p)), (i.innerWidth = i.width - (l + u)), (i.innerHeight = i.height - (h + p)), (i.outerWidth = i.width + d), (i.outerHeight = i.height + c), i;
            }
        }

        return $;
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.matchesSelector = e());
    })(window, function () {
        "use strict";
        var i = (function () {
            var t = window.Element.prototype;
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i] + "MatchesSelector";
                if (t[n]) return n;
            }
        })();
        return function (t, e) {
            return t[i](e);
        };
    }),
    (function (e, i) {
        "function" == typeof define && define.amd
            ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (t) {
                  return i(e, t);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = i(e, require("desandro-matches-selector")))
            : (e.fizzyUIUtils = i(e, e.matchesSelector));
    })(window, function (h, s) {
        var d = {
                extend: function (t, e) {
                    for (var i in e) t[i] = e[i];
                    return t;
                },
                modulo: function (t, e) {
                    return ((t % e) + e) % e;
                },
            },
            e = Array.prototype.slice;
        (d.makeArray = function (t) {
            return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? e.call(t) : [t];
        }),
            (d.removeFrom = function (t, e) {
                var i = t.indexOf(e);
                -1 != i && t.splice(i, 1);
            }),
            (d.getParent = function (t, e) {
                for (; t.parentNode && t != document.body; ) if (((t = t.parentNode), s(t, e))) return t;
            }),
            (d.getQueryElement = function (t) {
                return "string" == typeof t ? document.querySelector(t) : t;
            }),
            (d.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (d.filterFindElements = function (t, n) {
                t = d.makeArray(t);
                var o = [];
                return (
                    t.forEach(function (t) {
                        if (t instanceof HTMLElement)
                            if (n) {
                                s(t, n) && o.push(t);
                                for (var e = t.querySelectorAll(n), i = 0; i < e.length; i++) o.push(e[i]);
                            } else o.push(t);
                    }),
                    o
                );
            }),
            (d.debounceMethod = function (t, e, n) {
                n = n || 100;
                var o = t.prototype[e],
                    s = e + "Timeout";
                t.prototype[e] = function () {
                    var t = this[s];
                    clearTimeout(t);
                    var e = arguments,
                        i = this;
                    this[s] = setTimeout(function () {
                        o.apply(i, e), delete i[s];
                    }, n);
                };
            }),
            (d.docReady = function (t) {
                var e = document.readyState;
                "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
            }),
            (d.toDashed = function (t) {
                return t
                    .replace(/(.)([A-Z])/g, function (t, e, i) {
                        return e + "-" + i;
                    })
                    .toLowerCase();
            });
        var c = h.console;
        return (
            (d.htmlInit = function (a, l) {
                d.docReady(function () {
                    var t = d.toDashed(l),
                        o = "data-" + t,
                        e = document.querySelectorAll("[" + o + "]"),
                        i = document.querySelectorAll(".js-" + t),
                        n = d.makeArray(e).concat(d.makeArray(i)),
                        s = o + "-options",
                        r = h.jQuery;
                    n.forEach(function (e) {
                        var t,
                            i = e.getAttribute(o) || e.getAttribute(s);
                        try {
                            t = i && JSON.parse(i);
                        } catch (t) {
                            return void (c && c.error("Error parsing " + o + " on " + e.className + ": " + t));
                        }
                        var n = new a(e, t);
                        r && r.data(e, l, n);
                    });
                });
            }),
            d
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("ev-emitter"), require("get-size")))
            : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
    })(window, function (t, e) {
        "use strict";
        var i = document.documentElement.style,
            n = "string" == typeof i.transition ? "transition" : "WebkitTransition",
            o = "string" == typeof i.transform ? "transform" : "WebkitTransform",
            s = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[n],
            r = {
                transform: o,
                transition: n,
                transitionDuration: n + "Duration",
                transitionProperty: n + "Property",
                transitionDelay: n + "Delay",
            };

        function a(t, e) {
            t && ((this.element = t), (this.layout = e), (this.position = { x: 0, y: 0 }), this._create());
        }

        var l = (a.prototype = Object.create(t.prototype));
        (l.constructor = a),
            (l._create = function () {
                (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }), this.css({ position: "absolute" });
            }),
            (l.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (l.getSize = function () {
                this.size = e(this.element);
            }),
            (l.css = function (t) {
                var e = this.element.style;
                for (var i in t) {
                    e[r[i] || i] = t[i];
                }
            }),
            (l.getPosition = function () {
                var t = getComputedStyle(this.element),
                    e = this.layout._getOption("originLeft"),
                    i = this.layout._getOption("originTop"),
                    n = t[e ? "left" : "right"],
                    o = t[i ? "top" : "bottom"],
                    s = parseFloat(n),
                    r = parseFloat(o),
                    a = this.layout.size;
                -1 != n.indexOf("%") && (s = (s / 100) * a.width),
                    -1 != o.indexOf("%") && (r = (r / 100) * a.height),
                    (s = isNaN(s) ? 0 : s),
                    (r = isNaN(r) ? 0 : r),
                    (s -= e ? a.paddingLeft : a.paddingRight),
                    (r -= i ? a.paddingTop : a.paddingBottom),
                    (this.position.x = s),
                    (this.position.y = r);
            }),
            (l.layoutPosition = function () {
                var t = this.layout.size,
                    e = {},
                    i = this.layout._getOption("originLeft"),
                    n = this.layout._getOption("originTop"),
                    o = i ? "paddingLeft" : "paddingRight",
                    s = i ? "left" : "right",
                    r = i ? "right" : "left",
                    a = this.position.x + t[o];
                (e[s] = this.getXValue(a)), (e[r] = "");
                var l = n ? "paddingTop" : "paddingBottom",
                    h = n ? "top" : "bottom",
                    d = n ? "bottom" : "top",
                    c = this.position.y + t[l];
                (e[h] = this.getYValue(c)), (e[d] = ""), this.css(e), this.emitEvent("layout", [this]);
            }),
            (l.getXValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && !e ? (t / this.layout.size.width) * 100 + "%" : t + "px";
            }),
            (l.getYValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && e ? (t / this.layout.size.height) * 100 + "%" : t + "px";
            }),
            (l._transitionTo = function (t, e) {
                this.getPosition();
                var i = this.position.x,
                    n = this.position.y,
                    o = t == this.position.x && e == this.position.y;
                if ((this.setPosition(t, e), !o || this.isTransitioning)) {
                    var s = t - i,
                        r = e - n,
                        a = {};
                    (a.transform = this.getTranslate(s, r)),
                        this.transition({
                            to: a,
                            onTransitionEnd: { transform: this.layoutPosition },
                            isCleaning: !0,
                        });
                } else this.layoutPosition();
            }),
            (l.getTranslate = function (t, e) {
                return "translate3d(" + (t = this.layout._getOption("originLeft") ? t : -t) + "px, " + (e = this.layout._getOption("originTop") ? e : -e) + "px, 0)";
            }),
            (l.goTo = function (t, e) {
                this.setPosition(t, e), this.layoutPosition();
            }),
            (l.moveTo = l._transitionTo),
            (l.setPosition = function (t, e) {
                (this.position.x = parseFloat(t)), (this.position.y = parseFloat(e));
            }),
            (l._nonTransition = function (t) {
                for (var e in (this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd)) t.onTransitionEnd[e].call(this);
            }),
            (l.transition = function (t) {
                if (parseFloat(this.layout.options.transitionDuration)) {
                    var e = this._transn;
                    for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                    for (i in t.to) (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
                    if (t.from) {
                        this.css(t.from);
                        this.element.offsetHeight;
                        null;
                    }
                    this.enableTransition(t.to), this.css(t.to), (this.isTransitioning = !0);
                } else this._nonTransition(t);
            });
        var h =
            "opacity," +
            o.replace(/([A-Z])/g, function (t) {
                return "-" + t.toLowerCase();
            });
        (l.enableTransition = function () {
            if (!this.isTransitioning) {
                var t = this.layout.options.transitionDuration;
                (t = "number" == typeof t ? t + "ms" : t),
                    this.css({
                        transitionProperty: h,
                        transitionDuration: t,
                        transitionDelay: this.staggerDelay || 0,
                    }),
                    this.element.addEventListener(s, this, !1);
            }
        }),
            (l.onwebkitTransitionEnd = function (t) {
                this.ontransitionend(t);
            }),
            (l.onotransitionend = function (t) {
                this.ontransitionend(t);
            });
        var d = { "-webkit-transform": "transform" };
        (l.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn,
                    i = d[t.propertyName] || t.propertyName;
                if (
                    (delete e.ingProperties[i],
                    (function (t) {
                        for (var e in t) return !1;
                        return !0;
                    })(e.ingProperties) && this.disableTransition(),
                    i in e.clean && ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
                    i in e.onEnd)
                )
                    e.onEnd[i].call(this), delete e.onEnd[i];
                this.emitEvent("transitionEnd", [this]);
            }
        }),
            (l.disableTransition = function () {
                this.removeTransitionStyles(), this.element.removeEventListener(s, this, !1), (this.isTransitioning = !1);
            }),
            (l._removeStyles = function (t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e);
            });
        var c = { transitionProperty: "", transitionDuration: "", transitionDelay: "" };
        return (
            (l.removeTransitionStyles = function () {
                this.css(c);
            }),
            (l.stagger = function (t) {
                (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
            }),
            (l.removeElem = function () {
                this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]);
            }),
            (l.remove = function () {
                n && parseFloat(this.layout.options.transitionDuration)
                    ? (this.once("transitionEnd", function () {
                          this.removeElem();
                      }),
                      this.hide())
                    : this.removeElem();
            }),
            (l.reveal = function () {
                delete this.isHidden, this.css({ display: "" });
                var t = this.layout.options,
                    e = {};
                (e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd),
                    this.transition({
                        from: t.hiddenStyle,
                        to: t.visibleStyle,
                        isCleaning: !0,
                        onTransitionEnd: e,
                    });
            }),
            (l.onRevealTransitionEnd = function () {
                this.isHidden || this.emitEvent("reveal");
            }),
            (l.getHideRevealTransitionEndProperty = function (t) {
                var e = this.layout.options[t];
                if (e.opacity) return "opacity";
                for (var i in e) return i;
            }),
            (l.hide = function () {
                (this.isHidden = !0), this.css({ display: "" });
                var t = this.layout.options,
                    e = {};
                (e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd),
                    this.transition({
                        from: t.visibleStyle,
                        to: t.hiddenStyle,
                        isCleaning: !0,
                        onTransitionEnd: e,
                    });
            }),
            (l.onHideTransitionEnd = function () {
                this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide"));
            }),
            (l.destroy = function () {
                this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" });
            }),
            a
        );
    }),
    (function (o, s) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (t, e, i, n) {
                  return s(o, t, e, i, n);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = s(o, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")))
            : (o.Outlayer = s(o, o.EvEmitter, o.getSize, o.fizzyUIUtils, o.Outlayer.Item));
    })(window, function (t, e, o, s, n) {
        "use strict";

        function i() {}

        var r = t.console,
            a = t.jQuery,
            l = 0,
            h = {};

        function d(t, e) {
            var i = s.getQueryElement(t);
            if (i) {
                (this.element = i), a && (this.$element = a(this.element)), (this.options = s.extend({}, this.constructor.defaults)), this.option(e);
                var n = ++l;
                (this.element.outlayerGUID = n), (h[n] = this)._create(), this._getOption("initLayout") && this.layout();
            } else r && r.error("Bad element for " + this.constructor.namespace + ": " + (i || t));
        }

        (d.namespace = "outlayer"),
            (d.Item = n),
            (d.defaults = {
                containerStyle: { position: "relative" },
                initLayout: !0,
                originLeft: !0,
                originTop: !0,
                resize: !0,
                resizeContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
                visibleStyle: { opacity: 1, transform: "scale(1)" },
            });
        var c = d.prototype;

        function u(t) {
            function e() {
                t.apply(this, arguments);
            }

            return ((e.prototype = Object.create(t.prototype)).constructor = e);
        }

        s.extend(c, e.prototype),
            (c.option = function (t) {
                s.extend(this.options, t);
            }),
            (c._getOption = function (t) {
                var e = this.constructor.compatOptions[t];
                return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
            }),
            (d.compatOptions = {
                initLayout: "isInitLayout",
                horizontal: "isHorizontal",
                layoutInstant: "isLayoutInstant",
                originLeft: "isOriginLeft",
                originTop: "isOriginTop",
                resize: "isResizeBound",
                resizeContainer: "isResizingContainer",
            }),
            (c._create = function () {
                this.reloadItems(), (this.stamps = []), this.stamp(this.options.stamp), s.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize();
            }),
            (c.reloadItems = function () {
                this.items = this._itemize(this.element.children);
            }),
            (c._itemize = function (t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
                    var s = new i(e[o], this);
                    n.push(s);
                }
                return n;
            }),
            (c._filterFindItemElements = function (t) {
                return s.filterFindElements(t, this.options.itemSelector);
            }),
            (c.getItemElements = function () {
                return this.items.map(function (t) {
                    return t.element;
                });
            }),
            (c.layout = function () {
                this._resetLayout(), this._manageStamps();
                var t = this._getOption("layoutInstant"),
                    e = void 0 !== t ? t : !this._isLayoutInited;
                this.layoutItems(this.items, e), (this._isLayoutInited = !0);
            }),
            (c._init = c.layout),
            (c._resetLayout = function () {
                this.getSize();
            }),
            (c.getSize = function () {
                this.size = o(this.element);
            }),
            (c._getMeasurement = function (t, e) {
                var i,
                    n = this.options[t];
                n ? ("string" == typeof n ? (i = this.element.querySelector(n)) : n instanceof HTMLElement && (i = n), (this[t] = i ? o(i)[e] : n)) : (this[t] = 0);
            }),
            (c.layoutItems = function (t, e) {
                (t = this._getItemsForLayout(t)), this._layoutItems(t, e), this._postLayout();
            }),
            (c._getItemsForLayout = function (t) {
                return t.filter(function (t) {
                    return !t.isIgnored;
                });
            }),
            (c._layoutItems = function (t, i) {
                if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
                    var n = [];
                    t.forEach(function (t) {
                        var e = this._getItemLayoutPosition(t);
                        (e.item = t), (e.isInstant = i || t.isLayoutInstant), n.push(e);
                    }, this),
                        this._processLayoutQueue(n);
                }
            }),
            (c._getItemLayoutPosition = function () {
                return { x: 0, y: 0 };
            }),
            (c._processLayoutQueue = function (t) {
                this.updateStagger(),
                    t.forEach(function (t, e) {
                        this._positionItem(t.item, t.x, t.y, t.isInstant, e);
                    }, this);
            }),
            (c.updateStagger = function () {
                var t = this.options.stagger;
                if (null != t)
                    return (
                        (this.stagger = (function (t) {
                            if ("number" == typeof t) return t;
                            var e = t.match(/(^\d*\.?\d*)(\w*)/),
                                i = e && e[1],
                                n = e && e[2];
                            if (!i.length) return 0;
                            i = parseFloat(i);
                            var o = p[n] || 1;
                            return i * o;
                        })(t)),
                        this.stagger
                    );
                this.stagger = 0;
            }),
            (c._positionItem = function (t, e, i, n, o) {
                n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
            }),
            (c._postLayout = function () {
                this.resizeContainer();
            }),
            (c.resizeContainer = function () {
                if (this._getOption("resizeContainer")) {
                    var t = this._getContainerSize();
                    t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1));
                }
            }),
            (c._getContainerSize = i),
            (c._setContainerMeasure = function (t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
                        (t = Math.max(t, 0)),
                        (this.element.style[e ? "width" : "height"] = t + "px");
                }
            }),
            (c._emitCompleteOnItems = function (e, t) {
                var i = this;

                function n() {
                    i.dispatchEvent(e + "Complete", null, [t]);
                }

                var o = t.length;
                if (t && o) {
                    var s = 0;
                    t.forEach(function (t) {
                        t.once(e, r);
                    });
                } else n();

                function r() {
                    ++s == o && n();
                }
            }),
            (c.dispatchEvent = function (t, e, i) {
                var n = e ? [e].concat(i) : i;
                if ((this.emitEvent(t, n), a))
                    if (((this.$element = this.$element || a(this.element)), e)) {
                        var o = a.Event(e);
                        (o.type = t), this.$element.trigger(o, i);
                    } else this.$element.trigger(t, i);
            }),
            (c.ignore = function (t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0);
            }),
            (c.unignore = function (t) {
                var e = this.getItem(t);
                e && delete e.isIgnored;
            }),
            (c.stamp = function (t) {
                (t = this._find(t)) && ((this.stamps = this.stamps.concat(t)), t.forEach(this.ignore, this));
            }),
            (c.unstamp = function (t) {
                (t = this._find(t)) &&
                    t.forEach(function (t) {
                        s.removeFrom(this.stamps, t), this.unignore(t);
                    }, this);
            }),
            (c._find = function (t) {
                if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), (t = s.makeArray(t));
            }),
            (c._manageStamps = function () {
                this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
            }),
            (c._getBoundingRect = function () {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
                };
            }),
            (c._manageStamp = i),
            (c._getElementOffset = function (t) {
                var e = t.getBoundingClientRect(),
                    i = this._boundingRect,
                    n = o(t);
                return {
                    left: e.left - i.left - n.marginLeft,
                    top: e.top - i.top - n.marginTop,
                    right: i.right - e.right - n.marginRight,
                    bottom: i.bottom - e.bottom - n.marginBottom,
                };
            }),
            (c.handleEvent = s.handleEvent),
            (c.bindResize = function () {
                t.addEventListener("resize", this), (this.isResizeBound = !0);
            }),
            (c.unbindResize = function () {
                t.removeEventListener("resize", this), (this.isResizeBound = !1);
            }),
            (c.onresize = function () {
                this.resize();
            }),
            s.debounceMethod(d, "onresize", 100),
            (c.resize = function () {
                this.isResizeBound && this.needsResizeLayout() && this.layout();
            }),
            (c.needsResizeLayout = function () {
                var t = o(this.element);
                return this.size && t && t.innerWidth !== this.size.innerWidth;
            }),
            (c.addItems = function (t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e;
            }),
            (c.appended = function (t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e));
            }),
            (c.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    (this.items = e.concat(i)), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i);
                }
            }),
            (c.reveal = function (t) {
                if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
                    var i = this.updateStagger();
                    t.forEach(function (t, e) {
                        t.stagger(e * i), t.reveal();
                    });
                }
            }),
            (c.hide = function (t) {
                if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
                    var i = this.updateStagger();
                    t.forEach(function (t, e) {
                        t.stagger(e * i), t.hide();
                    });
                }
            }),
            (c.revealItemElements = function (t) {
                var e = this.getItems(t);
                this.reveal(e);
            }),
            (c.hideItemElements = function (t) {
                var e = this.getItems(t);
                this.hide(e);
            }),
            (c.getItem = function (t) {
                for (var e = 0; e < this.items.length; e++) {
                    var i = this.items[e];
                    if (i.element == t) return i;
                }
            }),
            (c.getItems = function (t) {
                t = s.makeArray(t);
                var i = [];
                return (
                    t.forEach(function (t) {
                        var e = this.getItem(t);
                        e && i.push(e);
                    }, this),
                    i
                );
            }),
            (c.remove = function (t) {
                var e = this.getItems(t);
                this._emitCompleteOnItems("remove", e),
                    e &&
                        e.length &&
                        e.forEach(function (t) {
                            t.remove(), s.removeFrom(this.items, t);
                        }, this);
            }),
            (c.destroy = function () {
                var t = this.element.style;
                (t.height = ""),
                    (t.position = ""),
                    (t.width = ""),
                    this.items.forEach(function (t) {
                        t.destroy();
                    }),
                    this.unbindResize();
                var e = this.element.outlayerGUID;
                delete h[e], delete this.element.outlayerGUID, a && a.removeData(this.element, this.constructor.namespace);
            }),
            (d.data = function (t) {
                var e = (t = s.getQueryElement(t)) && t.outlayerGUID;
                return e && h[e];
            }),
            (d.create = function (t, e) {
                var i = u(d);
                return (
                    (i.defaults = s.extend({}, d.defaults)),
                    s.extend(i.defaults, e),
                    (i.compatOptions = s.extend({}, d.compatOptions)),
                    (i.namespace = t),
                    (i.data = d.data),
                    (i.Item = u(n)),
                    s.htmlInit(i, t),
                    a && a.bridget && a.bridget(t, i),
                    i
                );
            });
        var p = { ms: 1, s: 1e3 };
        return (d.Item = n), d;
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope-layout/js/item", ["outlayer/outlayer"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("outlayer")))
            : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
    })(window, function (t) {
        "use strict";

        function e() {
            t.Item.apply(this, arguments);
        }

        var i = (e.prototype = Object.create(t.Item.prototype)),
            n = i._create;
        (i._create = function () {
            (this.id = this.layout.itemGUID++), n.call(this), (this.sortData = {});
        }),
            (i.updateSortData = function () {
                if (!this.isIgnored) {
                    (this.sortData.id = this.id), (this.sortData["original-order"] = this.id), (this.sortData.random = Math.random());
                    var t = this.layout.options.getSortData,
                        e = this.layout._sorters;
                    for (var i in t) {
                        var n = e[i];
                        this.sortData[i] = n(this.element, this);
                    }
                }
            });
        var o = i.destroy;
        return (
            (i.destroy = function () {
                o.apply(this, arguments), this.css({ display: "" });
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("get-size"), require("outlayer")))
            : ((t.Isotope = t.Isotope || {}), (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
    })(window, function (e, i) {
        "use strict";

        function n(t) {
            (this.isotope = t) && ((this.options = t.options[this.namespace]), (this.element = t.element), (this.items = t.filteredItems), (this.size = t.size));
        }

        var o = n.prototype;
        return (
            ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function (t) {
                o[t] = function () {
                    return i.prototype[t].apply(this.isotope, arguments);
                };
            }),
            (o.needsVerticalResizeLayout = function () {
                var t = e(this.isotope.element);
                return this.isotope.size && t && t.innerHeight != this.isotope.size.innerHeight;
            }),
            (o._getMeasurement = function () {
                this.isotope._getMeasurement.apply(this, arguments);
            }),
            (o.getColumnWidth = function () {
                this.getSegmentSize("column", "Width");
            }),
            (o.getRowHeight = function () {
                this.getSegmentSize("row", "Height");
            }),
            (o.getSegmentSize = function (t, e) {
                var i = t + e,
                    n = "outer" + e;
                if ((this._getMeasurement(i, n), !this[i])) {
                    var o = this.getFirstItemSize();
                    this[i] = (o && o[n]) || this.isotope.size["inner" + e];
                }
            }),
            (o.getFirstItemSize = function () {
                var t = this.isotope.filteredItems[0];
                return t && t.element && e(t.element);
            }),
            (o.layout = function () {
                this.isotope.layout.apply(this.isotope, arguments);
            }),
            (o.getSize = function () {
                this.isotope.getSize(), (this.size = this.isotope.size);
            }),
            (n.modes = {}),
            (n.create = function (t, e) {
                function i() {
                    n.apply(this, arguments);
                }

                return ((i.prototype = Object.create(o)).constructor = i), e && (i.options = e), (n.modes[(i.prototype.namespace = t)] = i);
            }),
            n
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("outlayer"), require("get-size")))
            : (t.Masonry = e(t.Outlayer, t.getSize));
    })(window, function (t, h) {
        var e = t.create("masonry");
        e.compatOptions.fitWidth = "isFitWidth";
        var i = e.prototype;
        return (
            (i._resetLayout = function () {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), (this.colYs = []);
                for (var t = 0; t < this.cols; t++) this.colYs.push(0);
                (this.maxY = 0), (this.horizontalColIndex = 0);
            }),
            (i.measureColumns = function () {
                if ((this.getContainerWidth(), !this.columnWidth)) {
                    var t = this.items[0],
                        e = t && t.element;
                    this.columnWidth = (e && h(e).outerWidth) || this.containerWidth;
                }
                var i = (this.columnWidth += this.gutter),
                    n = this.containerWidth + this.gutter,
                    o = n / i,
                    s = i - (n % i);
                (o = Math[s && s < 1 ? "round" : "floor"](o)), (this.cols = Math.max(o, 1));
            }),
            (i.getContainerWidth = function () {
                var t = this._getOption("fitWidth") ? this.element.parentNode : this.element,
                    e = h(t);
                this.containerWidth = e && e.innerWidth;
            }),
            (i._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth,
                    i = Math[e && e < 1 ? "round" : "ceil"](t.size.outerWidth / this.columnWidth);
                i = Math.min(i, this.cols);
                for (
                    var n = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, t),
                        o = {
                            x: this.columnWidth * n.col,
                            y: n.y,
                        },
                        s = n.y + t.size.outerHeight,
                        r = i + n.col,
                        a = n.col;
                    a < r;
                    a++
                )
                    this.colYs[a] = s;
                return o;
            }),
            (i._getTopColPosition = function (t) {
                var e = this._getTopColGroup(t),
                    i = Math.min.apply(Math, e);
                return { col: e.indexOf(i), y: i };
            }),
            (i._getTopColGroup = function (t) {
                if (t < 2) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) e[n] = this._getColGroupY(n, t);
                return e;
            }),
            (i._getColGroupY = function (t, e) {
                if (e < 2) return this.colYs[t];
                var i = this.colYs.slice(t, t + e);
                return Math.max.apply(Math, i);
            }),
            (i._getHorizontalColPosition = function (t, e) {
                var i = this.horizontalColIndex % this.cols;
                i = 1 < t && i + t > this.cols ? 0 : i;
                var n = e.size.outerWidth && e.size.outerHeight;
                return (this.horizontalColIndex = n ? i + t : this.horizontalColIndex), { col: i, y: this._getColGroupY(i, t) };
            }),
            (i._manageStamp = function (t) {
                var e = h(t),
                    i = this._getElementOffset(t),
                    n = this._getOption("originLeft") ? i.left : i.right,
                    o = n + e.outerWidth,
                    s = Math.floor(n / this.columnWidth);
                s = Math.max(0, s);
                var r = Math.floor(o / this.columnWidth);
                (r -= o % this.columnWidth ? 0 : 1), (r = Math.min(this.cols - 1, r));
                for (var a = (this._getOption("originTop") ? i.top : i.bottom) + e.outerHeight, l = s; l <= r; l++) this.colYs[l] = Math.max(a, this.colYs[l]);
            }),
            (i._getContainerSize = function () {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = { height: this.maxY };
                return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t;
            }),
            (i._getContainerFitWidth = function () {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
                return (this.cols - t) * this.columnWidth - this.gutter;
            }),
            (i.needsResizeLayout = function () {
                var t = this.containerWidth;
                return this.getContainerWidth(), t != this.containerWidth;
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("../layout-mode"), require("masonry-layout")))
            : e(t.Isotope.LayoutMode, t.Masonry);
    })(window, function (t, e) {
        "use strict";
        var i = t.create("masonry"),
            n = i.prototype,
            o = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
        for (var s in e.prototype) o[s] || (n[s] = e.prototype[s]);
        var r = n.measureColumns;
        n.measureColumns = function () {
            (this.items = this.isotope.filteredItems), r.call(this);
        };
        var a = n._getOption;
        return (
            (n._getOption = function (t) {
                return "fitWidth" == t ? (void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth) : a.apply(this.isotope, arguments);
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? (module.exports = e(require("../layout-mode"))) : e(t.Isotope.LayoutMode);
    })(window, function (t) {
        "use strict";
        var e = t.create("fitRows"),
            i = e.prototype;
        return (
            (i._resetLayout = function () {
                (this.x = 0), (this.y = 0), (this.maxY = 0), this._getMeasurement("gutter", "outerWidth");
            }),
            (i._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth + this.gutter,
                    i = this.isotope.size.innerWidth + this.gutter;
                0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
                var n = { x: this.x, y: this.y };
                return (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)), (this.x += e), n;
            }),
            (i._getContainerSize = function () {
                return { height: this.maxY };
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("../layout-mode")))
            : e(t.Isotope.LayoutMode);
    })(window, function (t) {
        "use strict";
        var e = t.create("vertical", { horizontalAlignment: 0 }),
            i = e.prototype;
        return (
            (i._resetLayout = function () {
                this.y = 0;
            }),
            (i._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                    i = this.y;
                return (this.y += t.size.outerHeight), { x: e, y: i };
            }),
            (i._getContainerSize = function () {
                return { height: this.y };
            }),
            e
        );
    }),
    (function (r, a) {
        "function" == typeof define && define.amd
            ? define([
                  "outlayer/outlayer",
                  "get-size/get-size",
                  "desandro-matches-selector/matches-selector",
                  "fizzy-ui-utils/utils",
                  "isotope-layout/js/item",
                  "isotope-layout/js/layout-mode",
                  "isotope-layout/js/layout-modes/masonry",
                  "isotope-layout/js/layout-modes/fit-rows",
                  "isotope-layout/js/layout-modes/vertical",
              ], function (t, e, i, n, o, s) {
                  return a(r, t, e, i, n, o, s);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = a(
                  r,
                  require("outlayer"),
                  require("get-size"),
                  require("desandro-matches-selector"),
                  require("fizzy-ui-utils"),
                  require("isotope-layout/js/item"),
                  require("isotope-layout/js/layout-mode"),
                  require("isotope-layout/js/layout-modes/masonry"),
                  require("isotope-layout/js/layout-modes/fit-rows"),
                  require("isotope-layout/js/layout-modes/vertical")
              ))
            : (r.Isotope = a(r, r.Outlayer, r.getSize, r.matchesSelector, r.fizzyUIUtils, r.Isotope.Item, r.Isotope.LayoutMode));
    })(window, function (t, i, e, n, s, o, r) {
        var a = t.jQuery,
            l = String.prototype.trim
                ? function (t) {
                      return t.trim();
                  }
                : function (t) {
                      return t.replace(/^\s+|\s+$/g, "");
                  },
            h = i.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 });
        (h.Item = o), (h.LayoutMode = r);
        var d = h.prototype;
        (d._create = function () {
            for (var t in ((this.itemGUID = 0), (this._sorters = {}), this._getSorters(), i.prototype._create.call(this), (this.modes = {}), (this.filteredItems = this.items), (this.sortHistory = ["original-order"]), r.modes))
                this._initLayoutMode(t);
        }),
            (d.reloadItems = function () {
                (this.itemGUID = 0), i.prototype.reloadItems.call(this);
            }),
            (d._itemize = function () {
                for (var t = i.prototype._itemize.apply(this, arguments), e = 0; e < t.length; e++) {
                    t[e].id = this.itemGUID++;
                }
                return this._updateItemsSortData(t), t;
            }),
            (d._initLayoutMode = function (t) {
                var e = r.modes[t],
                    i = this.options[t] || {};
                (this.options[t] = e.options ? s.extend(e.options, i) : i), (this.modes[t] = new e(this));
            }),
            (d.layout = function () {
                this._isLayoutInited || !this._getOption("initLayout") ? this._layout() : this.arrange();
            }),
            (d._layout = function () {
                var t = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), (this._isLayoutInited = !0);
            }),
            (d.arrange = function (t) {
                this.option(t), this._getIsInstant();
                var e = this._filter(this.items);
                (this.filteredItems = e.matches), this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout();
            }),
            (d._init = d.arrange),
            (d._hideReveal = function (t) {
                this.reveal(t.needReveal), this.hide(t.needHide);
            }),
            (d._getIsInstant = function () {
                var t = this._getOption("layoutInstant"),
                    e = void 0 !== t ? t : !this._isLayoutInited;
                return (this._isInstant = e);
            }),
            (d._bindArrangeComplete = function () {
                var t,
                    e,
                    i,
                    n = this;

                function o() {
                    t && e && i && n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
                }

                this.once("layoutComplete", function () {
                    (t = !0), o();
                }),
                    this.once("hideComplete", function () {
                        (e = !0), o();
                    }),
                    this.once("revealComplete", function () {
                        (i = !0), o();
                    });
            }),
            (d._filter = function (t) {
                var e = this.options.filter;
                e = e || "*";
                for (var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
                    var a = t[r];
                    if (!a.isIgnored) {
                        var l = s(a);
                        l && i.push(a), l && a.isHidden ? n.push(a) : l || a.isHidden || o.push(a);
                    }
                }
                return { matches: i, needReveal: n, needHide: o };
            }),
            (d._getFilterTest = function (e) {
                return a && this.options.isJQueryFiltering
                    ? function (t) {
                          return a(t.element).is(e);
                      }
                    : "function" == typeof e
                    ? function (t) {
                          return e(t.element);
                      }
                    : function (t) {
                          return n(t.element, e);
                      };
            }),
            (d.updateSortData = function (t) {
                var e;
                (e = t ? ((t = s.makeArray(t)), this.getItems(t)) : this.items), this._getSorters(), this._updateItemsSortData(e);
            }),
            (d._getSorters = function () {
                var t = this.options.getSortData;
                for (var e in t) {
                    var i = t[e];
                    this._sorters[e] = c(i);
                }
            }),
            (d._updateItemsSortData = function (t) {
                for (var e = t && t.length, i = 0; e && i < e; i++) {
                    t[i].updateSortData();
                }
            });
        var c = function (t) {
            if ("string" != typeof t) return t;
            var e = l(t).split(" "),
                i = e[0],
                n = i.match(/^\[(.+)\]$/),
                o = (function (e, i) {
                    return e
                        ? function (t) {
                              return t.getAttribute(e);
                          }
                        : function (t) {
                              var e = t.querySelector(i);
                              return e && e.textContent;
                          };
                })(n && n[1], i),
                s = h.sortDataParsers[e[1]];
            return (t = s
                ? function (t) {
                      return t && s(o(t));
                  }
                : function (t) {
                      return t && o(t);
                  });
        };
        (h.sortDataParsers = {
            parseInt: function (t) {
                return parseInt(t, 10);
            },
            parseFloat: function (t) {
                return parseFloat(t);
            },
        }),
            (d._sort = function () {
                if (this.options.sortBy) {
                    var t = s.makeArray(this.options.sortBy);
                    this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
                    var e = (function (l, h) {
                        return function (t, e) {
                            for (var i = 0; i < l.length; i++) {
                                var n = l[i],
                                    o = t.sortData[n],
                                    s = e.sortData[n];
                                if (s < o || o < s) {
                                    var r = void 0 !== h[n] ? h[n] : h,
                                        a = r ? 1 : -1;
                                    return (s < o ? 1 : -1) * a;
                                }
                            }
                            return 0;
                        };
                    })(this.sortHistory, this.options.sortAscending);
                    this.filteredItems.sort(e);
                }
            }),
            (d._getIsSameSortBy = function (t) {
                for (var e = 0; e < t.length; e++) if (t[e] != this.sortHistory[e]) return !1;
                return !0;
            }),
            (d._mode = function () {
                var t = this.options.layoutMode,
                    e = this.modes[t];
                if (!e) throw new Error("No layout mode: " + t);
                return (e.options = this.options[t]), e;
            }),
            (d._resetLayout = function () {
                i.prototype._resetLayout.call(this), this._mode()._resetLayout();
            }),
            (d._getItemLayoutPosition = function (t) {
                return this._mode()._getItemLayoutPosition(t);
            }),
            (d._manageStamp = function (t) {
                this._mode()._manageStamp(t);
            }),
            (d._getContainerSize = function () {
                return this._mode()._getContainerSize();
            }),
            (d.needsResizeLayout = function () {
                return this._mode().needsResizeLayout();
            }),
            (d.appended = function (t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i = this._filterRevealAdded(e);
                    this.filteredItems = this.filteredItems.concat(i);
                }
            }),
            (d.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    this._resetLayout(), this._manageStamps();
                    var i = this._filterRevealAdded(e);
                    this.layoutItems(this.filteredItems), (this.filteredItems = i.concat(this.filteredItems)), (this.items = e.concat(this.items));
                }
            }),
            (d._filterRevealAdded = function (t) {
                var e = this._filter(t);
                return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches;
            }),
            (d.insert = function (t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i,
                        n,
                        o = e.length;
                    for (i = 0; i < o; i++) (n = e[i]), this.element.appendChild(n.element);
                    var s = this._filter(e).matches;
                    for (i = 0; i < o; i++) e[i].isLayoutInstant = !0;
                    for (this.arrange(), i = 0; i < o; i++) delete e[i].isLayoutInstant;
                    this.reveal(s);
                }
            });
        var u = d.remove;
        return (
            (d.remove = function (t) {
                t = s.makeArray(t);
                var e = this.getItems(t);
                u.call(this, t);
                for (var i = e && e.length, n = 0; i && n < i; n++) {
                    var o = e[n];
                    s.removeFrom(this.filteredItems, o);
                }
            }),
            (d.shuffle = function () {
                for (var t = 0; t < this.items.length; t++) {
                    this.items[t].sortData.random = Math.random();
                }
                (this.options.sortBy = "random"), this._sort(), this._layout();
            }),
            (d._noTransition = function (t, e) {
                var i = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var n = t.apply(this, e);
                return (this.options.transitionDuration = i), n;
            }),
            (d.getFilteredItemElements = function () {
                return this.filteredItems.map(function (t) {
                    return t.element;
                });
            }),
            h
        );
    }),
    (function (l, i, o, a) {
        function h(t, e) {
            (this.settings = null),
                (this.options = l.extend({}, h.Defaults, e)),
                (this.$element = l(t)),
                (this._handlers = {}),
                (this._plugins = {}),
                (this._supress = {}),
                (this._current = null),
                (this._speed = null),
                (this._coordinates = []),
                (this._breakpoint = null),
                (this._width = null),
                (this._items = []),
                (this._clones = []),
                (this._mergers = []),
                (this._widths = []),
                (this._invalidated = {}),
                (this._pipe = []),
                (this._drag = {
                    time: null,
                    target: null,
                    pointer: null,
                    stage: { start: null, current: null },
                    direction: null,
                }),
                (this._states = {
                    current: {},
                    tags: { initializing: ["busy"], animating: ["busy"], dragging: ["interacting"] },
                }),
                l.each(
                    ["onResize", "onThrottledResize"],
                    l.proxy(function (t, e) {
                        this._handlers[e] = l.proxy(this[e], this);
                    }, this)
                ),
                l.each(
                    h.Plugins,
                    l.proxy(function (t, e) {
                        this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
                    }, this)
                ),
                l.each(
                    h.Workers,
                    l.proxy(function (t, e) {
                        this._pipe.push({ filter: e.filter, run: l.proxy(e.run, this) });
                    }, this)
                ),
                this.setup(),
                this.initialize();
        }

        (h.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            checkVisibility: !0,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: i,
            fallbackEasing: "swing",
            slideTransition: "",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            refreshClass: "owl-refresh",
            loadedClass: "owl-loaded",
            loadingClass: "owl-loading",
            rtlClass: "owl-rtl",
            responsiveClass: "owl-responsive",
            dragClass: "owl-drag",
            itemClass: "owl-item",
            stageClass: "owl-stage",
            stageOuterClass: "owl-stage-outer",
            grabClass: "owl-grab",
        }),
            (h.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
            (h.Type = {
                Event: "event",
                State: "state",
            }),
            (h.Plugins = {}),
            (h.Workers = [
                {
                    filter: ["width", "settings"],
                    run: function () {
                        this._width = this.$element.width();
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        t.current = this._items && this._items[this.relative(this._current)];
                    },
                },
                {
                    filter: ["items", "settings"],
                    run: function () {
                        this.$stage.children(".cloned").remove();
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        var e = this.settings.margin || "",
                            i = !this.settings.autoWidth,
                            n = this.settings.rtl,
                            o = { width: "auto", "margin-left": n ? e : "", "margin-right": n ? "" : e };
                        i || this.$stage.children().css(o), (t.css = o);
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                            i = null,
                            n = this._items.length,
                            o = !this.settings.autoWidth,
                            s = [];
                        for (
                            t.items = {
                                merge: !1,
                                width: e,
                            };
                            n--;

                        )
                            (i = this._mergers[n]), (i = (this.settings.mergeFit && Math.min(i, this.settings.items)) || i), (t.items.merge = 1 < i || t.items.merge), (s[n] = o ? e * i : this._items[n].width());
                        this._widths = s;
                    },
                },
                {
                    filter: ["items", "settings"],
                    run: function () {
                        var t = [],
                            e = this._items,
                            i = this.settings,
                            n = Math.max(2 * i.items, 4),
                            o = 2 * Math.ceil(e.length / 2),
                            s = i.loop && e.length ? (i.rewind ? n : Math.max(n, o)) : 0,
                            r = "",
                            a = "";
                        for (s /= 2; 0 < s; )
                            t.push(this.normalize(t.length / 2, !0)), (r += e[t[t.length - 1]][0].outerHTML), t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)), (a = e[t[t.length - 1]][0].outerHTML + a), (s -= 1);
                        (this._clones = t), l(r).addClass("cloned").appendTo(this.$stage), l(a).addClass("cloned").prependTo(this.$stage);
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function () {
                        for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, n = 0, o = 0, s = []; ++i < e; )
                            (n = s[i - 1] || 0), (o = this._widths[this.relative(i)] + this.settings.margin), s.push(n + o * t);
                        this._coordinates = s;
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function () {
                        var t = this.settings.stagePadding,
                            e = this._coordinates,
                            i = {
                                width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                                "padding-left": t || "",
                                "padding-right": t || "",
                            };
                        this.$stage.css(i);
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        var e = this._coordinates.length,
                            i = !this.settings.autoWidth,
                            n = this.$stage.children();
                        if (i && t.items.merge) for (; e--; ) (t.css.width = this._widths[this.relative(e)]), n.eq(e).css(t.css);
                        else i && ((t.css.width = t.items.width), n.css(t.css));
                    },
                },
                {
                    filter: ["items"],
                    run: function () {
                        this._coordinates.length < 1 && this.$stage.removeAttr("style");
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        (t.current = t.current ? this.$stage.children().index(t.current) : 0), (t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current))), this.reset(t.current);
                    },
                },
                {
                    filter: ["position"],
                    run: function () {
                        this.animate(this.coordinates(this._current));
                    },
                },
                {
                    filter: ["width", "position", "items", "settings"],
                    run: function () {
                        var t,
                            e,
                            i,
                            n,
                            o = this.settings.rtl ? 1 : -1,
                            s = 2 * this.settings.stagePadding,
                            r = this.coordinates(this.current()) + s,
                            a = r + this.width() * o,
                            l = [];
                        for (i = 0, n = this._coordinates.length; i < n; i++)
                            (t = this._coordinates[i - 1] || 0), (e = Math.abs(this._coordinates[i]) + s * o), ((this.op(t, "<=", r) && this.op(t, ">", a)) || (this.op(e, "<", r) && this.op(e, ">", a))) && l.push(i);
                        this.$stage.children(".active").removeClass("active"),
                            this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"),
                            this.$stage.children(".center").removeClass("center"),
                            this.settings.center && this.$stage.children().eq(this.current()).addClass("center");
                    },
                },
            ]),
            (h.prototype.initializeStage = function () {
                (this.$stage = this.$element.find("." + this.settings.stageClass)),
                    this.$stage.length ||
                        (this.$element.addClass(this.options.loadingClass),
                        (this.$stage = l("<" + this.settings.stageElement + ">", { class: this.settings.stageClass }).wrap(l("<div/>", { class: this.settings.stageOuterClass }))),
                        this.$element.append(this.$stage.parent()));
            }),
            (h.prototype.initializeItems = function () {
                var t = this.$element.find(".owl-item");
                if (t.length)
                    return (
                        (this._items = t.get().map(function (t) {
                            return l(t);
                        })),
                        (this._mergers = this._items.map(function () {
                            return 1;
                        })),
                        void this.refresh()
                    );
                this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
            }),
            (h.prototype.initialize = function () {
                var t, e, i;
                (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) &&
                    ((t = this.$element.find("img")), (e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : a), (i = this.$element.children(e).width()), t.length && i <= 0 && this.preloadAutoWidthImages(t));
                this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized");
            }),
            (h.prototype.isVisible = function () {
                return !this.settings.checkVisibility || this.$element.is(":visible");
            }),
            (h.prototype.setup = function () {
                var e = this.viewport(),
                    t = this.options.responsive,
                    i = -1,
                    n = null;
                t
                    ? (l.each(t, function (t) {
                          t <= e && i < t && (i = Number(t));
                      }),
                      "function" == typeof (n = l.extend({}, this.options, t[i])).stagePadding && (n.stagePadding = n.stagePadding()),
                      delete n.responsive,
                      n.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i)))
                    : (n = l.extend({}, this.options)),
                    this.trigger("change", {
                        property: {
                            name: "settings",
                            value: n,
                        },
                    }),
                    (this._breakpoint = i),
                    (this.settings = n),
                    this.invalidate("settings"),
                    this.trigger("changed", {
                        property: {
                            name: "settings",
                            value: this.settings,
                        },
                    });
            }),
            (h.prototype.optionsLogic = function () {
                this.settings.autoWidth && ((this.settings.stagePadding = !1), (this.settings.merge = !1));
            }),
            (h.prototype.prepare = function (t) {
                var e = this.trigger("prepare", { content: t });
                return (
                    e.data ||
                        (e.data = l("<" + this.settings.itemElement + "/>")
                            .addClass(this.options.itemClass)
                            .append(t)),
                    this.trigger("prepared", { content: e.data }),
                    e.data
                );
            }),
            (h.prototype.update = function () {
                for (
                    var t = 0,
                        e = this._pipe.length,
                        i = l.proxy(function (t) {
                            return this[t];
                        }, this._invalidated),
                        n = {};
                    t < e;

                )
                    (this._invalidated.all || 0 < l.grep(this._pipe[t].filter, i).length) && this._pipe[t].run(n), t++;
                (this._invalidated = {}), this.is("valid") || this.enter("valid");
            }),
            (h.prototype.width = function (t) {
                switch ((t = t || h.Width.Default)) {
                    case h.Width.Inner:
                    case h.Width.Outer:
                        return this._width;
                    default:
                        return this._width - 2 * this.settings.stagePadding + this.settings.margin;
                }
            }),
            (h.prototype.refresh = function () {
                this.enter("refreshing"),
                    this.trigger("refresh"),
                    this.setup(),
                    this.optionsLogic(),
                    this.$element.addClass(this.options.refreshClass),
                    this.update(),
                    this.$element.removeClass(this.options.refreshClass),
                    this.leave("refreshing"),
                    this.trigger("refreshed");
            }),
            (h.prototype.onThrottledResize = function () {
                i.clearTimeout(this.resizeTimer), (this.resizeTimer = i.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate));
            }),
            (h.prototype.onResize = function () {
                return (
                    !!this._items.length &&
                    this._width !== this.$element.width() &&
                    !!this.isVisible() &&
                    (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
                );
            }),
            (h.prototype.registerEventHandlers = function () {
                l.support.transition && this.$stage.on(l.support.transition.end + ".owl.core", l.proxy(this.onTransitionEnd, this)),
                    !1 !== this.settings.responsive && this.on(i, "resize", this._handlers.onThrottledResize),
                    this.settings.mouseDrag &&
                        (this.$element.addClass(this.options.dragClass),
                        this.$stage.on("mousedown.owl.core", l.proxy(this.onDragStart, this)),
                        this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                            return !1;
                        })),
                    this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", l.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", l.proxy(this.onDragEnd, this)));
            }),
            (h.prototype.onDragStart = function (t) {
                var e = null;
                3 !== t.which &&
                    ((e = l.support.transform
                        ? {
                              x: (e = this.$stage
                                  .css("transform")
                                  .replace(/.*\(|\)| /g, "")
                                  .split(","))[16 === e.length ? 12 : 4],
                              y: e[16 === e.length ? 13 : 5],
                          }
                        : ((e = this.$stage.position()),
                          {
                              x: this.settings.rtl ? e.left + this.$stage.width() - this.width() + this.settings.margin : e.left,
                              y: e.top,
                          })),
                    this.is("animating") && (l.support.transform ? this.animate(e.x) : this.$stage.stop(), this.invalidate("position")),
                    this.$element.toggleClass(this.options.grabClass, "mousedown" === t.type),
                    this.speed(0),
                    (this._drag.time = new Date().getTime()),
                    (this._drag.target = l(t.target)),
                    (this._drag.stage.start = e),
                    (this._drag.stage.current = e),
                    (this._drag.pointer = this.pointer(t)),
                    l(o).on("mouseup.owl.core touchend.owl.core", l.proxy(this.onDragEnd, this)),
                    l(o).one(
                        "mousemove.owl.core touchmove.owl.core",
                        l.proxy(function (t) {
                            var e = this.difference(this._drag.pointer, this.pointer(t));
                            l(o).on("mousemove.owl.core touchmove.owl.core", l.proxy(this.onDragMove, this)), (Math.abs(e.x) < Math.abs(e.y) && this.is("valid")) || (t.preventDefault(), this.enter("dragging"), this.trigger("drag"));
                        }, this)
                    ));
            }),
            (h.prototype.onDragMove = function (t) {
                var e = null,
                    i = null,
                    n = null,
                    o = this.difference(this._drag.pointer, this.pointer(t)),
                    s = this.difference(this._drag.stage.start, o);
                this.is("dragging") &&
                    (t.preventDefault(),
                    this.settings.loop
                        ? ((e = this.coordinates(this.minimum())), (i = this.coordinates(this.maximum() + 1) - e), (s.x = ((((s.x - e) % i) + i) % i) + e))
                        : ((e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum())),
                          (i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum())),
                          (n = this.settings.pullDrag ? (-1 * o.x) / 5 : 0),
                          (s.x = Math.max(Math.min(s.x, e + n), i + n))),
                    (this._drag.stage.current = s),
                    this.animate(s.x));
            }),
            (h.prototype.onDragEnd = function (t) {
                var e = this.difference(this._drag.pointer, this.pointer(t)),
                    i = this._drag.stage.current,
                    n = (0 < e.x) ^ this.settings.rtl ? "left" : "right";
                l(o).off(".owl.core"),
                    this.$element.removeClass(this.options.grabClass),
                    ((0 !== e.x && this.is("dragging")) || !this.is("valid")) &&
                        (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
                        this.current(this.closest(i.x, 0 !== e.x ? n : this._drag.direction)),
                        this.invalidate("position"),
                        this.update(),
                        (this._drag.direction = n),
                        (3 < Math.abs(e.x) || 300 < new Date().getTime() - this._drag.time) &&
                            this._drag.target.one("click.owl.core", function () {
                                return !1;
                            })),
                    this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
            }),
            (h.prototype.closest = function (i, n) {
                var o = -1,
                    s = this.width(),
                    r = this.coordinates();
                return (
                    this.settings.freeDrag ||
                        l.each(
                            r,
                            l.proxy(function (t, e) {
                                return (
                                    "left" === n && e - 30 < i && i < e + 30
                                        ? (o = t)
                                        : "right" === n && e - s - 30 < i && i < e - s + 30
                                        ? (o = t + 1)
                                        : this.op(i, "<", e) && this.op(i, ">", r[t + 1] !== a ? r[t + 1] : e - s) && (o = "left" === n ? t + 1 : t),
                                    -1 === o
                                );
                            }, this)
                        ),
                    this.settings.loop || (this.op(i, ">", r[this.minimum()]) ? (o = i = this.minimum()) : this.op(i, "<", r[this.maximum()]) && (o = i = this.maximum())),
                    o
                );
            }),
            (h.prototype.animate = function (t) {
                var e = 0 < this.speed();
                this.is("animating") && this.onTransitionEnd(),
                    e && (this.enter("animating"), this.trigger("translate")),
                    l.support.transform3d && l.support.transition
                        ? this.$stage.css({
                              transform: "translate3d(" + t + "px,0px,0px)",
                              transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : ""),
                          })
                        : e
                        ? this.$stage.animate({ left: t + "px" }, this.speed(), this.settings.fallbackEasing, l.proxy(this.onTransitionEnd, this))
                        : this.$stage.css({ left: t + "px" });
            }),
            (h.prototype.is = function (t) {
                return this._states.current[t] && 0 < this._states.current[t];
            }),
            (h.prototype.current = function (t) {
                if (t === a) return this._current;
                if (0 === this._items.length) return a;
                if (((t = this.normalize(t)), this._current !== t)) {
                    var e = this.trigger("change", { property: { name: "position", value: t } });
                    e.data !== a && (t = this.normalize(e.data)),
                        (this._current = t),
                        this.invalidate("position"),
                        this.trigger("changed", {
                            property: {
                                name: "position",
                                value: this._current,
                            },
                        });
                }
                return this._current;
            }),
            (h.prototype.invalidate = function (t) {
                return (
                    "string" === l.type(t) && ((this._invalidated[t] = !0), this.is("valid") && this.leave("valid")),
                    l.map(this._invalidated, function (t, e) {
                        return e;
                    })
                );
            }),
            (h.prototype.reset = function (t) {
                (t = this.normalize(t)) !== a && ((this._speed = 0), (this._current = t), this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]));
            }),
            (h.prototype.normalize = function (t, e) {
                var i = this._items.length,
                    n = e ? 0 : this._clones.length;
                return !this.isNumeric(t) || i < 1 ? (t = a) : (t < 0 || i + n <= t) && (t = ((((t - n / 2) % i) + i) % i) + n / 2), t;
            }),
            (h.prototype.relative = function (t) {
                return (t -= this._clones.length / 2), this.normalize(t, !0);
            }),
            (h.prototype.maximum = function (t) {
                var e,
                    i,
                    n,
                    o = this.settings,
                    s = this._coordinates.length;
                if (o.loop) s = this._clones.length / 2 + this._items.length - 1;
                else if (o.autoWidth || o.merge) {
                    if ((e = this._items.length)) for (i = this._items[--e].width(), n = this.$element.width(); e-- && !(n < (i += this._items[e].width() + this.settings.margin)); );
                    s = e + 1;
                } else s = o.center ? this._items.length - 1 : this._items.length - o.items;
                return t && (s -= this._clones.length / 2), Math.max(s, 0);
            }),
            (h.prototype.minimum = function (t) {
                return t ? 0 : this._clones.length / 2;
            }),
            (h.prototype.items = function (t) {
                return t === a ? this._items.slice() : ((t = this.normalize(t, !0)), this._items[t]);
            }),
            (h.prototype.mergers = function (t) {
                return t === a ? this._mergers.slice() : ((t = this.normalize(t, !0)), this._mergers[t]);
            }),
            (h.prototype.clones = function (i) {
                function n(t) {
                    return t % 2 == 0 ? o + t / 2 : e - (t + 1) / 2;
                }

                var e = this._clones.length / 2,
                    o = e + this._items.length;
                return i === a
                    ? l.map(this._clones, function (t, e) {
                          return n(e);
                      })
                    : l.map(this._clones, function (t, e) {
                          return t === i ? n(e) : null;
                      });
            }),
            (h.prototype.speed = function (t) {
                return t !== a && (this._speed = t), this._speed;
            }),
            (h.prototype.coordinates = function (t) {
                var e,
                    i = 1,
                    n = t - 1;
                return t === a
                    ? l.map(
                          this._coordinates,
                          l.proxy(function (t, e) {
                              return this.coordinates(e);
                          }, this)
                      )
                    : (this.settings.center ? (this.settings.rtl && ((i = -1), (n = t + 1)), (e = this._coordinates[t]), (e += ((this.width() - e + (this._coordinates[n] || 0)) / 2) * i)) : (e = this._coordinates[n] || 0),
                      (e = Math.ceil(e)));
            }),
            (h.prototype.duration = function (t, e, i) {
                return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed);
            }),
            (h.prototype.to = function (t, e) {
                var i = this.current(),
                    n = null,
                    o = t - this.relative(i),
                    s = (0 < o) - (o < 0),
                    r = this._items.length,
                    a = this.minimum(),
                    l = this.maximum();
                this.settings.loop
                    ? (!this.settings.rewind && Math.abs(o) > r / 2 && (o += -1 * s * r), (n = (((((t = i + o) - a) % r) + r) % r) + a) !== t && n - o <= l && 0 < n - o && ((i = n - o), (t = n), this.reset(i)))
                    : (t = this.settings.rewind ? ((t % (l += 1)) + l) % l : Math.max(a, Math.min(l, t))),
                    this.speed(this.duration(i, t, e)),
                    this.current(t),
                    this.isVisible() && this.update();
            }),
            (h.prototype.next = function (t) {
                (t = t || !1), this.to(this.relative(this.current()) + 1, t);
            }),
            (h.prototype.prev = function (t) {
                (t = t || !1), this.to(this.relative(this.current()) - 1, t);
            }),
            (h.prototype.onTransitionEnd = function (t) {
                if (t !== a && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
                this.leave("animating"), this.trigger("translated");
            }),
            (h.prototype.viewport = function () {
                var t;
                return (
                    this.options.responsiveBaseElement !== i
                        ? (t = l(this.options.responsiveBaseElement).width())
                        : i.innerWidth
                        ? (t = i.innerWidth)
                        : o.documentElement && o.documentElement.clientWidth
                        ? (t = o.documentElement.clientWidth)
                        : console.warn("Can not detect viewport width."),
                    t
                );
            }),
            (h.prototype.replace = function (t) {
                this.$stage.empty(),
                    (this._items = []),
                    t && (t = t instanceof jQuery ? t : l(t)),
                    this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)),
                    t
                        .filter(function () {
                            return 1 === this.nodeType;
                        })
                        .each(
                            l.proxy(function (t, e) {
                                (e = this.prepare(e)), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
                            }, this)
                        ),
                    this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
                    this.invalidate("items");
            }),
            (h.prototype.add = function (t, e) {
                var i = this.relative(this._current);
                (e = e === a ? this._items.length : this.normalize(e, !0)),
                    (t = t instanceof jQuery ? t : l(t)),
                    this.trigger("add", {
                        content: t,
                        position: e,
                    }),
                    (t = this.prepare(t)),
                    0 === this._items.length || e === this._items.length
                        ? (0 === this._items.length && this.$stage.append(t),
                          0 !== this._items.length && this._items[e - 1].after(t),
                          this._items.push(t),
                          this._mergers.push(1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1))
                        : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
                    this._items[i] && this.reset(this._items[i].index()),
                    this.invalidate("items"),
                    this.trigger("added", {
                        content: t,
                        position: e,
                    });
            }),
            (h.prototype.remove = function (t) {
                (t = this.normalize(t, !0)) !== a &&
                    (this.trigger("remove", {
                        content: this._items[t],
                        position: t,
                    }),
                    this._items[t].remove(),
                    this._items.splice(t, 1),
                    this._mergers.splice(t, 1),
                    this.invalidate("items"),
                    this.trigger("removed", {
                        content: null,
                        position: t,
                    }));
            }),
            (h.prototype.preloadAutoWidthImages = function (t) {
                t.each(
                    l.proxy(function (t, e) {
                        this.enter("pre-loading"),
                            (e = l(e)),
                            l(new Image())
                                .one(
                                    "load",
                                    l.proxy(function (t) {
                                        e.attr("src", t.target.src), e.css("opacity", 1), this.leave("pre-loading"), this.is("pre-loading") || this.is("initializing") || this.refresh();
                                    }, this)
                                )
                                .attr("src", e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"));
                    }, this)
                );
            }),
            (h.prototype.destroy = function () {
                for (var t in (this.$element.off(".owl.core"),
                this.$stage.off(".owl.core"),
                l(o).off(".owl.core"),
                !1 !== this.settings.responsive && (i.clearTimeout(this.resizeTimer), this.off(i, "resize", this._handlers.onThrottledResize)),
                this._plugins))
                    this._plugins[t].destroy();
                this.$stage.children(".cloned").remove(),
                    this.$stage.unwrap(),
                    this.$stage.children().contents().unwrap(),
                    this.$stage.children().unwrap(),
                    this.$stage.remove(),
                    this.$element
                        .removeClass(this.options.refreshClass)
                        .removeClass(this.options.loadingClass)
                        .removeClass(this.options.loadedClass)
                        .removeClass(this.options.rtlClass)
                        .removeClass(this.options.dragClass)
                        .removeClass(this.options.grabClass)
                        .attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), ""))
                        .removeData("owl.carousel");
            }),
            (h.prototype.op = function (t, e, i) {
                var n = this.settings.rtl;
                switch (e) {
                    case "<":
                        return n ? i < t : t < i;
                    case ">":
                        return n ? t < i : i < t;
                    case ">=":
                        return n ? t <= i : i <= t;
                    case "<=":
                        return n ? i <= t : t <= i;
                }
            }),
            (h.prototype.on = function (t, e, i, n) {
                t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i);
            }),
            (h.prototype.off = function (t, e, i, n) {
                t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i);
            }),
            (h.prototype.trigger = function (t, e, i, n, o) {
                var s = { item: { count: this._items.length, index: this.current() } },
                    r = l.camelCase(
                        l
                            .grep(["on", t, i], function (t) {
                                return t;
                            })
                            .join("-")
                            .toLowerCase()
                    ),
                    a = l.Event([t, "owl", i || "carousel"].join(".").toLowerCase(), l.extend({ relatedTarget: this }, s, e));
                return (
                    this._supress[t] ||
                        (l.each(this._plugins, function (t, e) {
                            e.onTrigger && e.onTrigger(a);
                        }),
                        this.register({
                            type: h.Type.Event,
                            name: t,
                        }),
                        this.$element.trigger(a),
                        this.settings && "function" == typeof this.settings[r] && this.settings[r].call(this, a)),
                    a
                );
            }),
            (h.prototype.enter = function (t) {
                l.each(
                    [t].concat(this._states.tags[t] || []),
                    l.proxy(function (t, e) {
                        this._states.current[e] === a && (this._states.current[e] = 0), this._states.current[e]++;
                    }, this)
                );
            }),
            (h.prototype.leave = function (t) {
                l.each(
                    [t].concat(this._states.tags[t] || []),
                    l.proxy(function (t, e) {
                        this._states.current[e]--;
                    }, this)
                );
            }),
            (h.prototype.register = function (i) {
                if (i.type === h.Type.Event) {
                    if ((l.event.special[i.name] || (l.event.special[i.name] = {}), !l.event.special[i.name].owl)) {
                        var e = l.event.special[i.name]._default;
                        (l.event.special[i.name]._default = function (t) {
                            return !e || !e.apply || (t.namespace && -1 !== t.namespace.indexOf("owl")) ? t.namespace && -1 < t.namespace.indexOf("owl") : e.apply(this, arguments);
                        }),
                            (l.event.special[i.name].owl = !0);
                    }
                } else
                    i.type === h.Type.State &&
                        (this._states.tags[i.name] ? (this._states.tags[i.name] = this._states.tags[i.name].concat(i.tags)) : (this._states.tags[i.name] = i.tags),
                        (this._states.tags[i.name] = l.grep(
                            this._states.tags[i.name],
                            l.proxy(function (t, e) {
                                return l.inArray(t, this._states.tags[i.name]) === e;
                            }, this)
                        )));
            }),
            (h.prototype.suppress = function (t) {
                l.each(
                    t,
                    l.proxy(function (t, e) {
                        this._supress[e] = !0;
                    }, this)
                );
            }),
            (h.prototype.release = function (t) {
                l.each(
                    t,
                    l.proxy(function (t, e) {
                        delete this._supress[e];
                    }, this)
                );
            }),
            (h.prototype.pointer = function (t) {
                var e = { x: null, y: null };
                return (
                    (t = (t = t.originalEvent || t || i.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX
                        ? ((e.x = t.pageX), (e.y = t.pageY))
                        : ((e.x = t.clientX), (e.y = t.clientY)),
                    e
                );
            }),
            (h.prototype.isNumeric = function (t) {
                return !isNaN(parseFloat(t));
            }),
            (h.prototype.difference = function (t, e) {
                return { x: t.x - e.x, y: t.y - e.y };
            }),
            (l.fn.owlCarousel = function (e) {
                var n = Array.prototype.slice.call(arguments, 1);
                return this.each(function () {
                    var t = l(this),
                        i = t.data("owl.carousel");
                    i ||
                        ((i = new h(this, "object" == typeof e && e)),
                        t.data("owl.carousel", i),
                        l.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (t, e) {
                            i.register({
                                type: h.Type.Event,
                                name: e,
                            }),
                                i.$element.on(
                                    e + ".owl.carousel.core",
                                    l.proxy(function (t) {
                                        t.namespace && t.relatedTarget !== this && (this.suppress([e]), i[e].apply(this, [].slice.call(arguments, 1)), this.release([e]));
                                    }, i)
                                );
                        })),
                        "string" == typeof e && "_" !== e.charAt(0) && i[e].apply(i, n);
                });
            }),
            (l.fn.owlCarousel.Constructor = h);
    })(window.Zepto || window.jQuery, window, document),
    (function (e, i, t, n) {
        var o = function (t) {
            (this._core = t),
                (this._interval = null),
                (this._visible = null),
                (this._handlers = {
                    "initialized.owl.carousel": e.proxy(function (t) {
                        t.namespace && this._core.settings.autoRefresh && this.watch();
                    }, this),
                }),
                (this._core.options = e.extend({}, o.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (o.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
            (o.prototype.watch = function () {
                this._interval || ((this._visible = this._core.isVisible()), (this._interval = i.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval)));
            }),
            (o.prototype.refresh = function () {
                this._core.isVisible() !== this._visible && ((this._visible = !this._visible), this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
            }),
            (o.prototype.destroy = function () {
                var t, e;
                for (t in (i.clearInterval(this._interval), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, s, t, e) {
        var i = function (t) {
            (this._core = t),
                (this._loaded = []),
                (this._handlers = {
                    "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (t) {
                        if (t.namespace && this._core.settings && this._core.settings.lazyLoad && ((t.property && "position" == t.property.name) || "initialized" == t.type)) {
                            var e = this._core.settings,
                                i = (e.center && Math.ceil(e.items / 2)) || e.items,
                                n = (e.center && -1 * i) || 0,
                                o = (t.property && void 0 !== t.property.value ? t.property.value : this._core.current()) + n,
                                s = this._core.clones().length,
                                r = a.proxy(function (t, e) {
                                    this.load(e);
                                }, this);
                            for (0 < e.lazyLoadEager && ((i += e.lazyLoadEager), e.loop && ((o -= e.lazyLoadEager), i++)); n++ < i; ) this.load(s / 2 + this._core.relative(o)), s && a.each(this._core.clones(this._core.relative(o)), r), o++;
                        }
                    }, this),
                }),
                (this._core.options = a.extend({}, i.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (i.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
            (i.prototype.load = function (t) {
                var e = this._core.$stage.children().eq(t),
                    i = e && e.find(".owl-lazy");
                !i ||
                    -1 < a.inArray(e.get(0), this._loaded) ||
                    (i.each(
                        a.proxy(function (t, e) {
                            var i,
                                n = a(e),
                                o = (1 < s.devicePixelRatio && n.attr("data-src-retina")) || n.attr("data-src") || n.attr("data-srcset");
                            this._core.trigger(
                                "load",
                                {
                                    element: n,
                                    url: o,
                                },
                                "lazy"
                            ),
                                n.is("img")
                                    ? n
                                          .one(
                                              "load.owl.lazy",
                                              a.proxy(function () {
                                                  n.css("opacity", 1), this._core.trigger("loaded", { element: n, url: o }, "lazy");
                                              }, this)
                                          )
                                          .attr("src", o)
                                    : n.is("source")
                                    ? n
                                          .one(
                                              "load.owl.lazy",
                                              a.proxy(function () {
                                                  this._core.trigger("loaded", { element: n, url: o }, "lazy");
                                              }, this)
                                          )
                                          .attr("srcset", o)
                                    : (((i = new Image()).onload = a.proxy(function () {
                                          n.css({ "background-image": 'url("' + o + '")', opacity: "1" }),
                                              this._core.trigger(
                                                  "loaded",
                                                  {
                                                      element: n,
                                                      url: o,
                                                  },
                                                  "lazy"
                                              );
                                      }, this)),
                                      (i.src = o));
                        }, this)
                    ),
                    this._loaded.push(e.get(0)));
            }),
            (i.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Lazy = i);
    })(window.Zepto || window.jQuery, window, document),
    (function (r, i, t, e) {
        var n = function (t) {
            (this._core = t),
                (this._previousHeight = null),
                (this._handlers = {
                    "initialized.owl.carousel refreshed.owl.carousel": r.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && this.update();
                    }, this),
                    "changed.owl.carousel": r.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && "position" === t.property.name && this.update();
                    }, this),
                    "loaded.owl.lazy": r.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
                    }, this),
                }),
                (this._core.options = r.extend({}, n.Defaults, this._core.options)),
                this._core.$element.on(this._handlers),
                (this._intervalId = null);
            var e = this;
            r(i).on("load", function () {
                e._core.settings.autoHeight && e.update();
            }),
                r(i).resize(function () {
                    e._core.settings.autoHeight &&
                        (null != e._intervalId && clearTimeout(e._intervalId),
                        (e._intervalId = setTimeout(function () {
                            e.update();
                        }, 250)));
                });
        };
        (n.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
            (n.prototype.update = function () {
                var t = this._core._current,
                    e = t + this._core.settings.items,
                    i = this._core.settings.lazyLoad,
                    n = this._core.$stage.children().toArray().slice(t, e),
                    o = [],
                    s = 0;
                r.each(n, function (t, e) {
                    o.push(r(e).height());
                }),
                    (s = Math.max.apply(null, o)) <= 1 && i && this._previousHeight && (s = this._previousHeight),
                    (this._previousHeight = s),
                    this._core.$stage.parent().height(s).addClass(this._core.settings.autoHeightClass);
            }),
            (n.prototype.destroy = function () {
                var t, e;
                for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (r.fn.owlCarousel.Constructor.Plugins.AutoHeight = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (d, t, e, i) {
        var n = function (t) {
            (this._core = t),
                (this._videos = {}),
                (this._playing = null),
                (this._handlers = {
                    "initialized.owl.carousel": d.proxy(function (t) {
                        t.namespace && this._core.register({ type: "state", name: "playing", tags: ["interacting"] });
                    }, this),
                    "resize.owl.carousel": d.proxy(function (t) {
                        t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault();
                    }, this),
                    "refreshed.owl.carousel": d.proxy(function (t) {
                        t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
                    }, this),
                    "changed.owl.carousel": d.proxy(function (t) {
                        t.namespace && "position" === t.property.name && this._playing && this.stop();
                    }, this),
                    "prepared.owl.carousel": d.proxy(function (t) {
                        if (t.namespace) {
                            var e = d(t.content).find(".owl-video");
                            e.length && (e.css("display", "none"), this.fetch(e, d(t.content)));
                        }
                    }, this),
                }),
                (this._core.options = d.extend({}, n.Defaults, this._core.options)),
                this._core.$element.on(this._handlers),
                this._core.$element.on(
                    "click.owl.video",
                    ".owl-video-play-icon",
                    d.proxy(function (t) {
                        this.play(t);
                    }, this)
                );
        };
        (n.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
            (n.prototype.fetch = function (t, e) {
                var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
                    n = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
                    o = t.attr("data-width") || this._core.settings.videoWidth,
                    s = t.attr("data-height") || this._core.settings.videoHeight,
                    r = t.attr("href");
                if (!r) throw new Error("Missing video URL.");
                if (
                    -1 <
                    (n = r.match(
                        /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
                    ))[3].indexOf("youtu")
                )
                    i = "youtube";
                else if (-1 < n[3].indexOf("vimeo")) i = "vimeo";
                else {
                    if (!(-1 < n[3].indexOf("vzaar"))) throw new Error("Video URL not supported.");
                    i = "vzaar";
                }
                (n = n[6]),
                    (this._videos[r] = {
                        type: i,
                        id: n,
                        width: o,
                        height: s,
                    }),
                    e.attr("data-video", r),
                    this.thumbnail(t, this._videos[r]);
            }),
            (n.prototype.thumbnail = function (e, t) {
                function i(t) {
                    '<div class="owl-video-play-icon"></div>',
                        (n = h.lazyLoad
                            ? d("<div/>", {
                                  class: "owl-video-tn " + l,
                                  srcType: t,
                              })
                            : d("<div/>", {
                                  class: "owl-video-tn",
                                  style: "opacity:1;background-image:url(" + t + ")",
                              })),
                        e.after(n),
                        e.after('<div class="owl-video-play-icon"></div>');
                }

                var n,
                    o,
                    s = t.width && t.height ? "width:" + t.width + "px;height:" + t.height + "px;" : "",
                    r = e.find("img"),
                    a = "src",
                    l = "",
                    h = this._core.settings;
                if (
                    (e.wrap(
                        d("<div/>", {
                            class: "owl-video-wrapper",
                            style: s,
                        })
                    ),
                    this._core.settings.lazyLoad && ((a = "data-src"), (l = "owl-lazy")),
                    r.length)
                )
                    return i(r.attr(a)), r.remove(), !1;
                "youtube" === t.type
                    ? ((o = "//img.youtube.com/vi/" + t.id + "/hqdefault.jpg"), i(o))
                    : "vimeo" === t.type
                    ? d.ajax({
                          type: "GET",
                          url: "//vimeo.com/api/v2/video/" + t.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (t) {
                              (o = t[0].thumbnail_large), i(o);
                          },
                      })
                    : "vzaar" === t.type &&
                      d.ajax({
                          type: "GET",
                          url: "//vzaar.com/api/videos/" + t.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (t) {
                              (o = t.framegrab_url), i(o);
                          },
                      });
            }),
            (n.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    (this._playing = null),
                    this._core.leave("playing"),
                    this._core.trigger("stopped", null, "video");
            }),
            (n.prototype.play = function (t) {
                var e,
                    i = d(t.target).closest("." + this._core.settings.itemClass),
                    n = this._videos[i.attr("data-video")],
                    o = n.width || "100%",
                    s = n.height || this._core.$stage.height();
                this._playing ||
                    (this._core.enter("playing"),
                    this._core.trigger("play", null, "video"),
                    (i = this._core.items(this._core.relative(i.index()))),
                    this._core.reset(i.index()),
                    (e = d('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height", s),
                    e.attr("width", o),
                    "youtube" === n.type
                        ? e.attr("src", "//www.youtube.com/embed/" + n.id + "?autoplay=1&rel=0&v=" + n.id)
                        : "vimeo" === n.type
                        ? e.attr("src", "//player.vimeo.com/video/" + n.id + "?autoplay=1")
                        : "vzaar" === n.type && e.attr("src", "//view.vzaar.com/" + n.id + "/player?autoplay=true"),
                    d(e).wrap('<div class="owl-video-frame" />').insertAfter(i.find(".owl-video")),
                    (this._playing = i.addClass("owl-video-playing")));
            }),
            (n.prototype.isInFullScreen = function () {
                var t = e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement;
                return t && d(t).parent().hasClass("owl-video-frame");
            }),
            (n.prototype.destroy = function () {
                var t, e;
                for (t in (this._core.$element.off("click.owl.video"), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (d.fn.owlCarousel.Constructor.Plugins.Video = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (r, t, e, i) {
        var n = function (t) {
            (this.core = t),
                (this.core.options = r.extend({}, n.Defaults, this.core.options)),
                (this.swapping = !0),
                (this.previous = void 0),
                (this.next = void 0),
                (this.handlers = {
                    "change.owl.carousel": r.proxy(function (t) {
                        t.namespace && "position" == t.property.name && ((this.previous = this.core.current()), (this.next = t.property.value));
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": r.proxy(function (t) {
                        t.namespace && (this.swapping = "translated" == t.type);
                    }, this),
                    "translate.owl.carousel": r.proxy(function (t) {
                        t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
                    }, this),
                }),
                this.core.$element.on(this.handlers);
        };
        (n.Defaults = { animateOut: !1, animateIn: !1 }),
            (n.prototype.swap = function () {
                if (1 === this.core.settings.items && r.support.animation && r.support.transition) {
                    this.core.speed(0);
                    var t,
                        e = r.proxy(this.clear, this),
                        i = this.core.$stage.children().eq(this.previous),
                        n = this.core.$stage.children().eq(this.next),
                        o = this.core.settings.animateIn,
                        s = this.core.settings.animateOut;
                    this.core.current() !== this.previous &&
                        (s &&
                            ((t = this.core.coordinates(this.previous) - this.core.coordinates(this.next)),
                            i
                                .one(r.support.animation.end, e)
                                .css({ left: t + "px" })
                                .addClass("animated owl-animated-out")
                                .addClass(s)),
                        o && n.one(r.support.animation.end, e).addClass("animated owl-animated-in").addClass(o));
                }
            }),
            (n.prototype.clear = function (t) {
                r(t.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
            }),
            (n.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (r.fn.owlCarousel.Constructor.Plugins.Animate = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (n, o, e, t) {
        var i = function (t) {
            (this._core = t),
                (this._call = null),
                (this._time = 0),
                (this._timeout = 0),
                (this._paused = !0),
                (this._handlers = {
                    "changed.owl.carousel": n.proxy(function (t) {
                        t.namespace && "settings" === t.property.name ? (this._core.settings.autoplay ? this.play() : this.stop()) : t.namespace && "position" === t.property.name && this._paused && (this._time = 0);
                    }, this),
                    "initialized.owl.carousel": n.proxy(function (t) {
                        t.namespace && this._core.settings.autoplay && this.play();
                    }, this),
                    "play.owl.autoplay": n.proxy(function (t, e, i) {
                        t.namespace && this.play(e, i);
                    }, this),
                    "stop.owl.autoplay": n.proxy(function (t) {
                        t.namespace && this.stop();
                    }, this),
                    "mouseover.owl.autoplay": n.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "mouseleave.owl.autoplay": n.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
                    }, this),
                    "touchstart.owl.core": n.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "touchend.owl.core": n.proxy(function () {
                        this._core.settings.autoplayHoverPause && this.play();
                    }, this),
                }),
                this._core.$element.on(this._handlers),
                (this._core.options = n.extend({}, i.Defaults, this._core.options));
        };
        (i.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1,
        }),
            (i.prototype._next = function (t) {
                (this._call = o.setTimeout(n.proxy(this._next, this, t), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read())),
                    this._core.is("interacting") || e.hidden || this._core.next(t || this._core.settings.autoplaySpeed);
            }),
            (i.prototype.read = function () {
                return new Date().getTime() - this._time;
            }),
            (i.prototype.play = function (t, e) {
                var i;
                this._core.is("rotating") || this._core.enter("rotating"),
                    (t = t || this._core.settings.autoplayTimeout),
                    (i = Math.min(this._time % (this._timeout || t), t)),
                    this._paused ? ((this._time = this.read()), (this._paused = !1)) : o.clearTimeout(this._call),
                    (this._time += (this.read() % t) - i),
                    (this._timeout = t),
                    (this._call = o.setTimeout(n.proxy(this._next, this, e), t - i));
            }),
            (i.prototype.stop = function () {
                this._core.is("rotating") && ((this._time = 0), (this._paused = !0), o.clearTimeout(this._call), this._core.leave("rotating"));
            }),
            (i.prototype.pause = function () {
                this._core.is("rotating") && !this._paused && ((this._time = this.read()), (this._paused = !0), o.clearTimeout(this._call));
            }),
            (i.prototype.destroy = function () {
                var t, e;
                for (t in (this.stop(), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (n.fn.owlCarousel.Constructor.Plugins.autoplay = i);
    })(window.Zepto || window.jQuery, window, document),
    (function (s, t, e, i) {
        "use strict";
        var n = function (t) {
            (this._core = t),
                (this._initialized = !1),
                (this._pages = []),
                (this._controls = {}),
                (this._templates = []),
                (this.$element = this._core.$element),
                (this._overrides = {
                    next: this._core.next,
                    prev: this._core.prev,
                    to: this._core.to,
                }),
                (this._handlers = {
                    "prepared.owl.carousel": s.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + s(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                    }, this),
                    "added.owl.carousel": s.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop());
                    }, this),
                    "remove.owl.carousel": s.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1);
                    }, this),
                    "changed.owl.carousel": s.proxy(function (t) {
                        t.namespace && "position" == t.property.name && this.draw();
                    }, this),
                    "initialized.owl.carousel": s.proxy(function (t) {
                        t.namespace &&
                            !this._initialized &&
                            (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), (this._initialized = !0), this._core.trigger("initialized", null, "navigation"));
                    }, this),
                    "refreshed.owl.carousel": s.proxy(function (t) {
                        t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
                    }, this),
                }),
                (this._core.options = s.extend({}, n.Defaults, this._core.options)),
                this.$element.on(this._handlers);
        };
        (n.Defaults = {
            nav: !1,
            navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
        }),
            (n.prototype.initialize = function () {
                var t,
                    i = this._core.settings;
                for (t in ((this._controls.$relative = (i.navContainer ? s(i.navContainer) : s("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled")),
                (this._controls.$previous = s("<" + i.navElement + ">")
                    .addClass(i.navClass[0])
                    .html(i.navText[0])
                    .prependTo(this._controls.$relative)
                    .on(
                        "click",
                        s.proxy(function (t) {
                            this.prev(i.navSpeed);
                        }, this)
                    )),
                (this._controls.$next = s("<" + i.navElement + ">")
                    .addClass(i.navClass[1])
                    .html(i.navText[1])
                    .appendTo(this._controls.$relative)
                    .on(
                        "click",
                        s.proxy(function (t) {
                            this.next(i.navSpeed);
                        }, this)
                    )),
                i.dotsData || (this._templates = [s('<button role="button">').addClass(i.dotClass).append(s("<span>")).prop("outerHTML")]),
                (this._controls.$absolute = (i.dotsContainer ? s(i.dotsContainer) : s("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled")),
                this._controls.$absolute.on(
                    "click",
                    "button",
                    s.proxy(function (t) {
                        var e = s(t.target).parent().is(this._controls.$absolute) ? s(t.target).index() : s(t.target).parent().index();
                        t.preventDefault(), this.to(e, i.dotsSpeed);
                    }, this)
                ),
                this._overrides))
                    this._core[t] = s.proxy(this[t], this);
            }),
            (n.prototype.destroy = function () {
                var t, e, i, n, o;
                for (t in ((o = this._core.settings), this._handlers)) this.$element.off(t, this._handlers[t]);
                for (e in this._controls) "$relative" === e && o.navContainer ? this._controls[e].html("") : this._controls[e].remove();
                for (n in this.overides) this._core[n] = this._overrides[n];
                for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
            }),
            (n.prototype.update = function () {
                var t,
                    e,
                    i = this._core.clones().length / 2,
                    n = i + this._core.items().length,
                    o = this._core.maximum(!0),
                    s = this._core.settings,
                    r = s.center || s.autoWidth || s.dotsData ? 1 : s.dotsEach || s.items;
                if (("page" !== s.slideBy && (s.slideBy = Math.min(s.slideBy, s.items)), s.dots || "page" == s.slideBy))
                    for (this._pages = [], t = i, e = 0; t < n; t++) {
                        if (r <= e || 0 === e) {
                            if ((this._pages.push({ start: Math.min(o, t - i), end: t - i + r - 1 }), Math.min(o, t - i) === o)) break;
                            (e = 0), 0;
                        }
                        e += this._core.mergers(this._core.relative(t));
                    }
            }),
            (n.prototype.draw = function () {
                var t,
                    e = this._core.settings,
                    i = this._core.items().length <= e.items,
                    n = this._core.relative(this._core.current()),
                    o = e.loop || e.rewind;
                this._controls.$relative.toggleClass("disabled", !e.nav || i),
                    e.nav && (this._controls.$previous.toggleClass("disabled", !o && n <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && n >= this._core.maximum(!0))),
                    this._controls.$absolute.toggleClass("disabled", !e.dots || i),
                    e.dots &&
                        ((t = this._pages.length - this._controls.$absolute.children().length),
                        e.dotsData && 0 != t
                            ? this._controls.$absolute.html(this._templates.join(""))
                            : 0 < t
                            ? this._controls.$absolute.append(new Array(1 + t).join(this._templates[0]))
                            : t < 0 && this._controls.$absolute.children().slice(t).remove(),
                        this._controls.$absolute.find(".active").removeClass("active"),
                        this._controls.$absolute.children().eq(s.inArray(this.current(), this._pages)).addClass("active"));
            }),
            (n.prototype.onTrigger = function (t) {
                var e = this._core.settings;
                t.page = {
                    index: s.inArray(this.current(), this._pages),
                    count: this._pages.length,
                    size: e && (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items),
                };
            }),
            (n.prototype.current = function () {
                var i = this._core.relative(this._core.current());
                return s
                    .grep(
                        this._pages,
                        s.proxy(function (t, e) {
                            return t.start <= i && t.end >= i;
                        }, this)
                    )
                    .pop();
            }),
            (n.prototype.getPosition = function (t) {
                var e,
                    i,
                    n = this._core.settings;
                return (
                    "page" == n.slideBy
                        ? ((e = s.inArray(this.current(), this._pages)), (i = this._pages.length), t ? ++e : --e, (e = this._pages[((e % i) + i) % i].start))
                        : ((e = this._core.relative(this._core.current())), (i = this._core.items().length), t ? (e += n.slideBy) : (e -= n.slideBy)),
                    e
                );
            }),
            (n.prototype.next = function (t) {
                s.proxy(this._overrides.to, this._core)(this.getPosition(!0), t);
            }),
            (n.prototype.prev = function (t) {
                s.proxy(this._overrides.to, this._core)(this.getPosition(!1), t);
            }),
            (n.prototype.to = function (t, e, i) {
                var n;
                !i && this._pages.length ? ((n = this._pages.length), s.proxy(this._overrides.to, this._core)(this._pages[((t % n) + n) % n].start, e)) : s.proxy(this._overrides.to, this._core)(t, e);
            }),
            (s.fn.owlCarousel.Constructor.Plugins.Navigation = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (n, o, t, e) {
        "use strict";
        var i = function (t) {
            (this._core = t),
                (this._hashes = {}),
                (this.$element = this._core.$element),
                (this._handlers = {
                    "initialized.owl.carousel": n.proxy(function (t) {
                        t.namespace && "URLHash" === this._core.settings.startPosition && n(o).trigger("hashchange.owl.navigation");
                    }, this),
                    "prepared.owl.carousel": n.proxy(function (t) {
                        if (t.namespace) {
                            var e = n(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                            if (!e) return;
                            this._hashes[e] = t.content;
                        }
                    }, this),
                    "changed.owl.carousel": n.proxy(function (t) {
                        if (t.namespace && "position" === t.property.name) {
                            var i = this._core.items(this._core.relative(this._core.current())),
                                e = n
                                    .map(this._hashes, function (t, e) {
                                        return t === i ? e : null;
                                    })
                                    .join();
                            if (!e || o.location.hash.slice(1) === e) return;
                            o.location.hash = e;
                        }
                    }, this),
                }),
                (this._core.options = n.extend({}, i.Defaults, this._core.options)),
                this.$element.on(this._handlers),
                n(o).on(
                    "hashchange.owl.navigation",
                    n.proxy(function (t) {
                        var e = o.location.hash.substring(1),
                            i = this._core.$stage.children(),
                            n = this._hashes[e] && i.index(this._hashes[e]);
                        void 0 !== n && n !== this._core.current() && this._core.to(this._core.relative(n), !1, !0);
                    }, this)
                );
        };
        (i.Defaults = { URLhashListener: !1 }),
            (i.prototype.destroy = function () {
                var t, e;
                for (t in (n(o).off("hashchange.owl.navigation"), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (n.fn.owlCarousel.Constructor.Plugins.Hash = i);
    })(window.Zepto || window.jQuery, window, document),
    (function (o, t, e, s) {
        var r = o("<support>").get(0).style,
            a = "Webkit Moz O ms".split(" "),
            i = {
                transition: {
                    end: {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        transition: "transitionend",
                    },
                },
                animation: {
                    end: {
                        WebkitAnimation: "webkitAnimationEnd",
                        MozAnimation: "animationend",
                        OAnimation: "oAnimationEnd",
                        animation: "animationend",
                    },
                },
            },
            n = function () {
                return !!d("transform");
            },
            l = function () {
                return !!d("perspective");
            },
            h = function () {
                return !!d("animation");
            };

        function d(t, i) {
            var n = !1,
                e = t.charAt(0).toUpperCase() + t.slice(1);
            return (
                o.each((t + " " + a.join(e + " ") + e).split(" "), function (t, e) {
                    if (r[e] !== s) return (n = !i || e), !1;
                }),
                n
            );
        }

        function c(t) {
            return d(t, !0);
        }

        !(function () {
            return !!d("transition");
        })() || ((o.support.transition = new String(c("transition"))), (o.support.transition.end = i.transition.end[o.support.transition])),
            h() && ((o.support.animation = new String(c("animation"))), (o.support.animation.end = i.animation.end[o.support.animation])),
            n() && ((o.support.transform = new String(c("transform"))), (o.support.transform3d = l()));
    })(window.Zepto || window.jQuery, window, document),
    (function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(jQuery);
    })(function (s) {
        var r = function (t, e) {
            (this.$element = s(t)), (this.options = s.extend({}, r.DEFAULTS, this.dataOptions(), e)), this.init();
        };
        (r.DEFAULTS = {
            from: 0,
            to: 0,
            speed: 1e3,
            refreshInterval: 100,
            decimals: 0,
            formatter: function (t, e) {
                return t.toFixed(e.decimals);
            },
            onUpdate: null,
            onComplete: null,
        }),
            (r.prototype.init = function () {
                (this.value = this.options.from), (this.loops = Math.ceil(this.options.speed / this.options.refreshInterval)), (this.loopCount = 0), (this.increment = (this.options.to - this.options.from) / this.loops);
            }),
            (r.prototype.dataOptions = function () {
                var t = {
                        from: this.$element.data("from"),
                        to: this.$element.data("to"),
                        speed: this.$element.data("speed"),
                        refreshInterval: this.$element.data("refresh-interval"),
                        decimals: this.$element.data("decimals"),
                    },
                    e = Object.keys(t);
                for (var i in e) {
                    var n = e[i];
                    void 0 === t[n] && delete t[n];
                }
                return t;
            }),
            (r.prototype.update = function () {
                (this.value += this.increment),
                    this.loopCount++,
                    this.render(),
                    "function" == typeof this.options.onUpdate && this.options.onUpdate.call(this.$element, this.value),
                    this.loopCount >= this.loops && (clearInterval(this.interval), (this.value = this.options.to), "function" == typeof this.options.onComplete && this.options.onComplete.call(this.$element, this.value));
            }),
            (r.prototype.render = function () {
                var t = this.options.formatter.call(this.$element, this.value, this.options);
                this.$element.text(t);
            }),
            (r.prototype.restart = function () {
                this.stop(), this.init(), this.start();
            }),
            (r.prototype.start = function () {
                this.stop(), this.render(), (this.interval = setInterval(this.update.bind(this), this.options.refreshInterval));
            }),
            (r.prototype.stop = function () {
                this.interval && clearInterval(this.interval);
            }),
            (r.prototype.toggle = function () {
                this.interval ? this.stop() : this.start();
            }),
            (s.fn.countTo = function (o) {
                return this.each(function () {
                    var t = s(this),
                        e = t.data("countTo"),
                        i = "object" == typeof o ? o : {},
                        n = "string" == typeof o ? o : "start";
                    (e && "object" != typeof o) || (e && e.stop(), t.data("countTo", (e = new r(this, i)))), e[n].call(e);
                });
            });
    }),
    (function (n) {
        (n.fn.disappear = function (e, t) {
            var i = n.extend({ data: void 0 }, t);
            this.each(function () {
                var t = n(this);
                return t.bind("disappear", e, i.data), e ? void 0 : void t.trigger("disappear", i.data);
            });
        }),
            (n.fn.appear = function (i, t) {
                var a = n.extend({ data: void 0, one: !0 }, t);
                return this.each(function () {
                    var s = n(this);
                    if (((s.appeared = !1), i)) {
                        function e() {
                            if (s.is(":visible")) {
                                var t = r.scrollLeft(),
                                    e = r.scrollTop(),
                                    i = s.offset(),
                                    n = i.left,
                                    o = i.top;
                                o + s.height() >= e && o <= e + r.height() && n + s.width() >= t && n <= t + r.width() ? s.appeared || s.trigger("appear", a.data) : (s.appeared && s.trigger("disappear", a.data), (s.appeared = !1));
                            } else s.appeared = !1;
                        }

                        function t() {
                            if (((s.appeared = !0), a.one)) {
                                r.unbind("scroll", e);
                                var t = n.inArray(e, n.fn.appear.checks);
                                0 <= t && n.fn.appear.checks.splice(t, 1);
                            }
                            i.apply(this, arguments);
                        }

                        var r = n(window);
                        a.one ? s.one("appear", a.data, t) : s.bind("appear", a.data, t), r.scroll(e), n.fn.appear.checks.push(e), e();
                    } else s.trigger("appear", a.data);
                });
            }),
            n.extend(n.fn.appear, {
                checks: [],
                timeout: null,
                checkAll: function () {
                    var t = n.fn.appear.checks.length;
                    if (0 < t) for (; t--; ) n.fn.appear.checks[t]();
                },
                run: function () {
                    n.fn.appear.timeout && clearTimeout(n.fn.appear.timeout), (n.fn.appear.timeout = setTimeout(n.fn.appear.checkAll, 20));
                },
            }),
            n.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function (t, e) {
                var i = n.fn[e];
                i &&
                    (n.fn[e] = function () {
                        var t = i.apply(this, arguments);
                        return n.fn.appear.run(), t;
                    });
            });
    })(jQuery),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define(["jquery"], function (t) {
                  return e(t);
              })
            : "object" == typeof exports
            ? (module.exports = e(require("jquery")))
            : e(jQuery);
    })(0, function (i) {
        function r(t, r) {
            var i,
                e = document.createElement("canvas");
            t.appendChild(e), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(e);
            var o = e.getContext("2d");
            e.width = e.height = r.size;
            var n = 1;
            1 < window.devicePixelRatio && ((n = window.devicePixelRatio), (e.style.width = e.style.height = [r.size, "px"].join("")), (e.width = e.height = r.size * n), o.scale(n, n)),
                o.translate(r.size / 2, r.size / 2),
                o.rotate((r.rotate / 180 - 0.5) * Math.PI);
            var s = (r.size - r.lineWidth) / 2;

            function a(t, e, i) {
                var n = (i = Math.min(Math.max(-1, i || 0), 1)) <= 0;
                o.beginPath(), o.arc(0, 0, s, 0, 2 * Math.PI * i, n), (o.strokeStyle = t), (o.lineWidth = e), o.stroke();
            }

            function l() {
                r.scaleColor &&
                    (function () {
                        var t, e;
                        (o.lineWidth = 1), (o.fillStyle = r.scaleColor), o.save();
                        for (var i = 24; 0 < i; --i) (t = i % 6 == 0 ? ((e = r.scaleLength), 0) : ((e = 0.6 * r.scaleLength), r.scaleLength - e)), o.fillRect(-r.size / 2 + t, 0, e, 1), o.rotate(Math.PI / 12);
                        o.restore();
                    })(),
                    r.trackColor && a(r.trackColor, r.trackWidth || r.lineWidth, 1);
            }

            r.scaleColor && r.scaleLength && (s -= r.scaleLength + 2),
                (Date.now =
                    Date.now ||
                    function () {
                        return +new Date();
                    });
            var h =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (t) {
                    window.setTimeout(t, 1e3 / 60);
                };
            (this.getCanvas = function () {
                return e;
            }),
                (this.getCtx = function () {
                    return o;
                }),
                (this.clear = function () {
                    o.clearRect(r.size / -2, r.size / -2, r.size, r.size);
                }),
                (this.draw = function (t) {
                    var e;
                    r.scaleColor || r.trackColor ? (o.getImageData && o.putImageData ? (i ? o.putImageData(i, 0, 0) : (l(), (i = o.getImageData(0, 0, r.size * n, r.size * n)))) : (this.clear(), l())) : this.clear(),
                        (o.lineCap = r.lineCap),
                        (e = "function" == typeof r.barColor ? r.barColor(t) : r.barColor),
                        a(e, r.lineWidth, t / 100);
                }.bind(this)),
                (this.animate = function (i, n) {
                    var o = Date.now();
                    r.onStart(i, n);
                    var s = function () {
                        var t = Math.min(Date.now() - o, r.animate.duration),
                            e = r.easing(this, t, i, n - i, r.animate.duration);
                        this.draw(e), r.onStep(i, n, e), t >= r.animate.duration ? r.onStop(i, n) : h(s);
                    }.bind(this);
                    h(s);
                }.bind(this));
        }

        function n(e, i) {
            var n = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                trackWidth: void 0,
                size: 110,
                rotate: 0,
                animate: { duration: 1e3, enabled: !0 },
                easing: function (t, e, i, n, o) {
                    return (e /= o / 2) < 1 ? (n / 2) * e * e + i : (-n / 2) * (--e * (e - 2) - 1) + i;
                },
                onStart: function (t, e) {},
                onStep: function (t, e, i) {},
                onStop: function (t, e) {},
            };
            if (void 0 !== r) n.renderer = r;
            else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                n.renderer = SVGRenderer;
            }
            var o = {},
                s = 0,
                t = function () {
                    for (var t in ((this.el = e), (this.options = o), n)) n.hasOwnProperty(t) && ((o[t] = i && void 0 !== i[t] ? i[t] : n[t]), "function" == typeof o[t] && (o[t] = o[t].bind(this)));
                    "string" == typeof o.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[o.easing]) ? (o.easing = jQuery.easing[o.easing]) : (o.easing = n.easing),
                        "number" == typeof o.animate &&
                            (o.animate = {
                                duration: o.animate,
                                enabled: !0,
                            }),
                        "boolean" != typeof o.animate ||
                            o.animate ||
                            (o.animate = {
                                duration: 1e3,
                                enabled: o.animate,
                            }),
                        (this.renderer = new o.renderer(e, o)),
                        this.renderer.draw(s),
                        e.dataset && e.dataset.percent ? this.update(parseFloat(e.dataset.percent)) : e.getAttribute && e.getAttribute("data-percent") && this.update(parseFloat(e.getAttribute("data-percent")));
                }.bind(this);
            (this.update = function (t) {
                return (t = parseFloat(t)), o.animate.enabled ? this.renderer.animate(s, t) : this.renderer.draw(t), (s = t), this;
            }.bind(this)),
                (this.disableAnimation = function () {
                    return (o.animate.enabled = !1), this;
                }),
                (this.enableAnimation = function () {
                    return (o.animate.enabled = !0), this;
                }),
                t();
        }

        i.fn.easyPieChart = function (e) {
            return this.each(function () {
                var t;
                i.data(this, "easyPieChart") || ((t = i.extend({}, e, i(this).data())), i.data(this, "easyPieChart", new n(this, t)));
            });
        };
    }),
    (function (i) {
        var n = {};

        function o(t) {
            if (n[t]) return n[t].exports;
            var e = (n[t] = { i: t, l: !1, exports: {} });
            return i[t].call(e.exports, e, e.exports, o), (e.l = !0), e.exports;
        }

        (o.m = i),
            (o.c = n),
            (o.d = function (t, e, i) {
                o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
            }),
            (o.r = function (t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
            }),
            (o.t = function (e, t) {
                if ((1 & t && (e = o(e)), 8 & t)) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var i = Object.create(null);
                if (
                    (o.r(i),
                    Object.defineProperty(i, "default", {
                        enumerable: !0,
                        value: e,
                    }),
                    2 & t && "string" != typeof e)
                )
                    for (var n in e)
                        o.d(
                            i,
                            n,
                            function (t) {
                                return e[t];
                            }.bind(null, n)
                        );
                return i;
            }),
            (o.n = function (t) {
                var e =
                    t && t.__esModule
                        ? function () {
                              return t.default;
                          }
                        : function () {
                              return t;
                          };
                return o.d(e, "a", e), e;
            }),
            (o.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (o.p = ""),
            o((o.s = 11));
    })([
        ,
        ,
        function (t, e, i) {
            "use strict";
            t.exports = function (t) {
                "complete" === document.readyState || "interactive" === document.readyState
                    ? t.call()
                    : document.attachEvent
                    ? document.attachEvent("onreadystatechange", function () {
                          "interactive" === document.readyState && t.call();
                      })
                    : document.addEventListener && document.addEventListener("DOMContentLoaded", t);
            };
        },
        ,
        function (i, t, e) {
            "use strict";
            (function (t) {
                var e;
                (e = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {}), (i.exports = e);
            }.call(this, e(5)));
        },
        function (t, e, i) {
            "use strict";
            var n,
                o =
                    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                        ? function (t) {
                              return typeof t;
                          }
                        : function (t) {
                              return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                          };
            n = (function () {
                return this;
            })();
            try {
                n = n || Function("return this")() || (0, eval)("this");
            } catch (t) {
                "object" === ("undefined" == typeof window ? "undefined" : o(window)) && (n = window);
            }
            t.exports = n;
        },
        ,
        ,
        ,
        ,
        ,
        function (t, e, i) {
            t.exports = i(12);
        },
        function (t, e, i) {
            "use strict";
            var n =
                    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                        ? function (t) {
                              return typeof t;
                          }
                        : function (t) {
                              return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                          },
                o = a(i(2)),
                s = i(4),
                r = a(i(13));

            function a(t) {
                return t && t.__esModule ? t : { default: t };
            }

            var l = s.window.jarallax;
            if (
                ((s.window.jarallax = r.default),
                (s.window.jarallax.noConflict = function () {
                    return (s.window.jarallax = l), this;
                }),
                void 0 !== s.jQuery)
            ) {
                var h = function () {
                    var t = arguments || [];
                    Array.prototype.unshift.call(t, this);
                    var e = r.default.apply(s.window, t);
                    return "object" !== (void 0 === e ? "undefined" : n(e)) ? e : this;
                };
                h.constructor = r.default.constructor;
                var d = s.jQuery.fn.jarallax;
                (s.jQuery.fn.jarallax = h),
                    (s.jQuery.fn.jarallax.noConflict = function () {
                        return (s.jQuery.fn.jarallax = d), this;
                    });
            }
            (0, o.default)(function () {
                (0, r.default)(document.querySelectorAll("[data-jarallax]"));
            });
        },
        function (t, C, z) {
            "use strict";
            (function (t) {
                Object.defineProperty(C, "__esModule", { value: !0 });
                var e = function (t, e, i) {
                        return e && s(t.prototype, e), i && s(t, i), t;
                    },
                    d =
                        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                              },
                    i = r(z(2)),
                    n = r(z(14)),
                    o = z(4);

                function s(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                    }
                }

                function r(t) {
                    return t && t.__esModule ? t : { default: t };
                }

                var l = -1 < navigator.userAgent.indexOf("MSIE ") || -1 < navigator.userAgent.indexOf("Trident/") || -1 < navigator.userAgent.indexOf("Edge/"),
                    a = (function () {
                        for (var t = "transform WebkitTransform MozTransform".split(" "), e = document.createElement("div"), i = 0; i < t.length; i++) if (e && void 0 !== e.style[t[i]]) return t[i];
                        return !1;
                    })(),
                    y = void 0,
                    v = void 0,
                    h = void 0,
                    c = !1,
                    u = !1;

                function p(t) {
                    (y = o.window.innerWidth || document.documentElement.clientWidth),
                        (v = o.window.innerHeight || document.documentElement.clientHeight),
                        "object" !== (void 0 === t ? "undefined" : d(t)) || ("load" !== t.type && "dom-loaded" !== t.type) || (c = !0);
                }

                p(),
                    o.window.addEventListener("resize", p),
                    o.window.addEventListener("orientationchange", p),
                    o.window.addEventListener("load", p),
                    (0, i.default)(function () {
                        p({ type: "dom-loaded" });
                    });
                var g = [],
                    m = !1;

                function f() {
                    if (g.length) {
                        h = void 0 !== o.window.pageYOffset ? o.window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                        var e = c || !m || m.width !== y || m.height !== v,
                            i = u || e || !m || m.y !== h;
                        (u = c = !1),
                            (e || i) &&
                                (g.forEach(function (t) {
                                    e && t.onResize(), i && t.onScroll();
                                }),
                                (m = { width: y, height: v, y: h })),
                            (0, n.default)(f);
                    }
                }

                function _(t) {
                    ("object" === ("undefined" == typeof HTMLElement ? "undefined" : d(HTMLElement))
                        ? t instanceof HTMLElement
                        : t && "object" === (void 0 === t ? "undefined" : d(t)) && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName) && (t = [t]);
                    for (var e = arguments[1], i = Array.prototype.slice.call(arguments, 2), n = t.length, o = 0, s = void 0; o < n; o++)
                        if (("object" === (void 0 === e ? "undefined" : d(e)) || void 0 === e ? t[o].jarallax || (t[o].jarallax = new b(t[o], e)) : t[o].jarallax && (s = t[o].jarallax[e].apply(t[o].jarallax, i)), void 0 !== s)) return s;
                    return t;
                }

                var w =
                        !!t.ResizeObserver &&
                        new t.ResizeObserver(function (t) {
                            t &&
                                t.length &&
                                (0, n.default)(function () {
                                    t.forEach(function (t) {
                                        t.target && t.target.jarallax && (c || t.target.jarallax.onResize(), (u = !0));
                                    });
                                });
                        }),
                    x = 0,
                    b =
                        (e($, [
                            {
                                key: "css",
                                value: function (e, i) {
                                    return "string" == typeof i
                                        ? o.window.getComputedStyle(e).getPropertyValue(i)
                                        : (i.transform && a && (i[a] = i.transform),
                                          Object.keys(i).forEach(function (t) {
                                              e.style[t] = i[t];
                                          }),
                                          e);
                                },
                            },
                            {
                                key: "extend",
                                value: function (i) {
                                    var n = arguments;
                                    return (
                                        (i = i || {}),
                                        Object.keys(arguments).forEach(function (e) {
                                            n[e] &&
                                                Object.keys(n[e]).forEach(function (t) {
                                                    i[t] = n[e][t];
                                                });
                                        }),
                                        i
                                    );
                                },
                            },
                            {
                                key: "getWindowData",
                                value: function () {
                                    return { width: y, height: v, y: h };
                                },
                            },
                            {
                                key: "initImg",
                                value: function () {
                                    var t = this,
                                        e = t.options.imgElement;
                                    return (
                                        e && "string" == typeof e && (e = t.$item.querySelector(e)),
                                        e instanceof Element || (e = null),
                                        e && (t.options.keepImg ? (t.image.$item = e.cloneNode(!0)) : ((t.image.$item = e), (t.image.$itemParent = e.parentNode)), (t.image.useImgTag = !0)),
                                        !(
                                            !t.image.$item &&
                                            (null === t.image.src &&
                                                (t.image.src = t
                                                    .css(t.$item, "background-image")
                                                    .replace(/^url\(['"]?/g, "")
                                                    .replace(/['"]?\)$/g, "")),
                                            !t.image.src || "none" === t.image.src)
                                        )
                                    );
                                },
                            },
                            {
                                key: "canInitParallax",
                                value: function () {
                                    return a && !this.options.disableParallax();
                                },
                            },
                            {
                                key: "init",
                                value: function () {
                                    var t = this,
                                        e = {
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            overflow: "hidden",
                                            pointerEvents: "none",
                                        },
                                        i = {};
                                    if (!t.options.keepImg) {
                                        var n = t.$item.getAttribute("style");
                                        if ((n && t.$item.setAttribute("data-jarallax-original-styles", n), t.image.useImgTag)) {
                                            var o = t.image.$item.getAttribute("style");
                                            o && t.image.$item.setAttribute("data-jarallax-original-styles", o);
                                        }
                                    }
                                    if (
                                        ("static" === t.css(t.$item, "position") && t.css(t.$item, { position: "relative" }),
                                        "auto" === t.css(t.$item, "z-index") && t.css(t.$item, { zIndex: 0 }),
                                        (t.image.$container = document.createElement("div")),
                                        t.css(t.image.$container, e),
                                        t.css(t.image.$container, { "z-index": t.options.zIndex }),
                                        l && t.css(t.image.$container, { opacity: 0.9999 }),
                                        t.image.$container.setAttribute("id", "jarallax-container-" + t.instanceID),
                                        t.$item.appendChild(t.image.$container),
                                        t.image.useImgTag
                                            ? (i = t.extend(
                                                  {
                                                      "object-fit": t.options.imgSize,
                                                      "object-position": t.options.imgPosition,
                                                      "font-family": "object-fit: " + t.options.imgSize + "; object-position: " + t.options.imgPosition + ";",
                                                      "max-width": "none",
                                                  },
                                                  e,
                                                  i
                                              ))
                                            : ((t.image.$item = document.createElement("div")),
                                              t.image.src &&
                                                  (i = t.extend(
                                                      {
                                                          "background-position": t.options.imgPosition,
                                                          "background-size": t.options.imgSize,
                                                          "background-repeat": t.options.imgRepeat,
                                                          "background-image": 'url("' + t.image.src + '")',
                                                      },
                                                      e,
                                                      i
                                                  ))),
                                        ("opacity" !== t.options.type && "scale" !== t.options.type && "scale-opacity" !== t.options.type && 1 !== t.options.speed) || (t.image.position = "absolute"),
                                        "fixed" === t.image.position)
                                    )
                                        for (var s = 0, r = t.$item; null !== r && r !== document && 0 === s; ) {
                                            var a = t.css(r, "-webkit-transform") || t.css(r, "-moz-transform") || t.css(r, "transform");
                                            a && "none" !== a && ((s = 1), (t.image.position = "absolute")), (r = r.parentNode);
                                        }
                                    (i.position = t.image.position),
                                        t.css(t.image.$item, i),
                                        t.image.$container.appendChild(t.image.$item),
                                        t.onResize(),
                                        t.onScroll(!0),
                                        t.options.automaticResize && w && w.observe(t.$item),
                                        t.options.onInit && t.options.onInit.call(t),
                                        "none" !== t.css(t.$item, "background-image") && t.css(t.$item, { "background-image": "none" }),
                                        t.addToParallaxList();
                                },
                            },
                            {
                                key: "addToParallaxList",
                                value: function () {
                                    g.push(this), 1 === g.length && f();
                                },
                            },
                            {
                                key: "removeFromParallaxList",
                                value: function () {
                                    var i = this;
                                    g.forEach(function (t, e) {
                                        t.instanceID === i.instanceID && g.splice(e, 1);
                                    });
                                },
                            },
                            {
                                key: "destroy",
                                value: function () {
                                    var t = this;
                                    t.removeFromParallaxList();
                                    var e = t.$item.getAttribute("data-jarallax-original-styles");
                                    if ((t.$item.removeAttribute("data-jarallax-original-styles"), e ? t.$item.setAttribute("style", e) : t.$item.removeAttribute("style"), t.image.useImgTag)) {
                                        var i = t.image.$item.getAttribute("data-jarallax-original-styles");
                                        t.image.$item.removeAttribute("data-jarallax-original-styles"),
                                            i ? t.image.$item.setAttribute("style", e) : t.image.$item.removeAttribute("style"),
                                            t.image.$itemParent && t.image.$itemParent.appendChild(t.image.$item);
                                    }
                                    t.$clipStyles && t.$clipStyles.parentNode.removeChild(t.$clipStyles),
                                        t.image.$container && t.image.$container.parentNode.removeChild(t.image.$container),
                                        t.options.onDestroy && t.options.onDestroy.call(t),
                                        delete t.$item.jarallax;
                                },
                            },
                            {
                                key: "clipContainer",
                                value: function () {
                                    if ("fixed" === this.image.position) {
                                        var t = this,
                                            e = t.image.$container.getBoundingClientRect(),
                                            i = e.width,
                                            n = e.height;
                                        t.$clipStyles ||
                                            ((t.$clipStyles = document.createElement("style")),
                                            t.$clipStyles.setAttribute("type", "text/css"),
                                            t.$clipStyles.setAttribute("id", "jarallax-clip-" + t.instanceID),
                                            (document.head || document.getElementsByTagName("head")[0]).appendChild(t.$clipStyles));
                                        var o = "#jarallax-container-" + t.instanceID + " {\n           clip: rect(0 " + i + "px " + n + "px 0);\n           clip: rect(0, " + i + "px, " + n + "px, 0);\n        }";
                                        t.$clipStyles.styleSheet ? (t.$clipStyles.styleSheet.cssText = o) : (t.$clipStyles.innerHTML = o);
                                    }
                                },
                            },
                            {
                                key: "coverImage",
                                value: function () {
                                    var t,
                                        e = this,
                                        i = e.image.$container.getBoundingClientRect(),
                                        n = i.height,
                                        o = e.options.speed,
                                        s = "scroll" === e.options.type || "scroll-opacity" === e.options.type,
                                        r = 0,
                                        a = n;
                                    return (
                                        s && (o < 0 ? ((r = o * Math.max(n, v)), v < n && (r -= o * (n - v))) : (r = o * (n + v)), 1 < o ? (a = Math.abs(r - v)) : o < 0 ? (a = r / o + Math.abs(r)) : (a += (v - n) * (1 - o)), (r /= 2)),
                                        (e.parallaxScrollDistance = r),
                                        (t = s ? (v - a) / 2 : (n - a) / 2),
                                        e.css(e.image.$item, {
                                            height: a + "px",
                                            marginTop: t + "px",
                                            left: "fixed" === e.image.position ? i.left + "px" : "0",
                                            width: i.width + "px",
                                        }),
                                        e.options.onCoverImage && e.options.onCoverImage.call(e),
                                        {
                                            image: { height: a, marginTop: t },
                                            container: i,
                                        }
                                    );
                                },
                            },
                            {
                                key: "isVisible",
                                value: function () {
                                    return this.isElementInViewport || !1;
                                },
                            },
                            {
                                key: "onScroll",
                                value: function (t) {
                                    var e = this,
                                        i = e.$item.getBoundingClientRect(),
                                        n = i.top,
                                        o = i.height,
                                        s = {},
                                        r = i;
                                    if (
                                        (e.options.elementInViewport && (r = e.options.elementInViewport.getBoundingClientRect()),
                                        (e.isElementInViewport = 0 <= r.bottom && 0 <= r.right && r.top <= v && r.left <= y),
                                        t || e.isElementInViewport)
                                    ) {
                                        var a = Math.max(0, n),
                                            l = Math.max(0, o + n),
                                            h = Math.max(0, -n),
                                            d = Math.max(0, n + o - v),
                                            c = Math.max(0, o - (n + o - v)),
                                            u = Math.max(0, -n + v - o),
                                            p = 1 - (2 * (v - n)) / (v + o),
                                            g = 1;
                                        if (
                                            (o < v ? (g = 1 - (h || d) / o) : l <= v ? (g = l / v) : c <= v && (g = c / v),
                                            ("opacity" !== e.options.type && "scale-opacity" !== e.options.type && "scroll-opacity" !== e.options.type) || ((s.transform = "translate3d(0,0,0)"), (s.opacity = g)),
                                            "scale" === e.options.type || "scale-opacity" === e.options.type)
                                        ) {
                                            var m = 1;
                                            e.options.speed < 0 ? (m -= e.options.speed * g) : (m += e.options.speed * (1 - g)), (s.transform = "scale(" + m + ") translate3d(0,0,0)");
                                        }
                                        if ("scroll" === e.options.type || "scroll-opacity" === e.options.type) {
                                            var f = e.parallaxScrollDistance * p;
                                            "absolute" === e.image.position && (f -= n), (s.transform = "translate3d(0," + f + "px,0)");
                                        }
                                        e.css(e.image.$item, s),
                                            e.options.onScroll &&
                                                e.options.onScroll.call(e, {
                                                    section: i,
                                                    beforeTop: a,
                                                    beforeTopEnd: l,
                                                    afterTop: h,
                                                    beforeBottom: d,
                                                    beforeBottomEnd: c,
                                                    afterBottom: u,
                                                    visiblePercent: g,
                                                    fromViewportCenter: p,
                                                });
                                    }
                                },
                            },
                            {
                                key: "onResize",
                                value: function () {
                                    this.coverImage(), this.clipContainer();
                                },
                            },
                        ]),
                        $);

                function $(t, e) {
                    !(function (t, e) {
                        if (!(t instanceof $)) throw new TypeError("Cannot call a class as a function");
                    })(this);
                    var i = this;
                    (i.instanceID = x++),
                        (i.$item = t),
                        (i.defaults = {
                            type: "scroll",
                            speed: 0.5,
                            imgSrc: null,
                            imgElement: ".jarallax-img",
                            imgSize: "cover",
                            imgPosition: "50% 50%",
                            imgRepeat: "no-repeat",
                            keepImg: !1,
                            elementInViewport: null,
                            zIndex: -100,
                            disableParallax: !1,
                            disableVideo: !1,
                            automaticResize: !0,
                            videoSrc: null,
                            videoStartTime: 0,
                            videoEndTime: 0,
                            videoVolume: 0,
                            videoLoop: !0,
                            videoPlayOnlyVisible: !0,
                            onScroll: null,
                            onInit: null,
                            onDestroy: null,
                            onCoverImage: null,
                        });
                    var n = i.$item.getAttribute("data-jarallax"),
                        o = JSON.parse(n || "{}");
                    n && console.warn("Detected usage of deprecated data-jarallax JSON options, you should use pure data-attribute options. See info here - https://github.com/nk-o/jarallax/issues/53");
                    var s = i.$item.dataset || {},
                        r = {};
                    if (
                        (Object.keys(s).forEach(function (t) {
                            var e = t.substr(0, 1).toLowerCase() + t.substr(1);
                            e && void 0 !== i.defaults[e] && (r[e] = s[t]);
                        }),
                        (i.options = i.extend({}, i.defaults, o, r, e)),
                        (i.pureOptions = i.extend({}, i.options)),
                        Object.keys(i.options).forEach(function (t) {
                            "true" === i.options[t] ? (i.options[t] = !0) : "false" === i.options[t] && (i.options[t] = !1);
                        }),
                        (i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed)))),
                        (i.options.noAndroid || i.options.noIos) &&
                            (console.warn("Detected usage of deprecated noAndroid or noIos options, you should use disableParallax option. See info here - https://github.com/nk-o/jarallax/#disable-on-mobile-devices"),
                            i.options.disableParallax ||
                                (i.options.noIos && i.options.noAndroid
                                    ? (i.options.disableParallax = /iPad|iPhone|iPod|Android/)
                                    : i.options.noIos
                                    ? (i.options.disableParallax = /iPad|iPhone|iPod/)
                                    : i.options.noAndroid && (i.options.disableParallax = /Android/))),
                        "string" == typeof i.options.disableParallax && (i.options.disableParallax = new RegExp(i.options.disableParallax)),
                        i.options.disableParallax instanceof RegExp)
                    ) {
                        var a = i.options.disableParallax;
                        i.options.disableParallax = function () {
                            return a.test(navigator.userAgent);
                        };
                    }
                    if (
                        ("function" != typeof i.options.disableParallax &&
                            (i.options.disableParallax = function () {
                                return !1;
                            }),
                        "string" == typeof i.options.disableVideo && (i.options.disableVideo = new RegExp(i.options.disableVideo)),
                        i.options.disableVideo instanceof RegExp)
                    ) {
                        var l = i.options.disableVideo;
                        i.options.disableVideo = function () {
                            return l.test(navigator.userAgent);
                        };
                    }
                    "function" != typeof i.options.disableVideo &&
                        (i.options.disableVideo = function () {
                            return !1;
                        });
                    var h = i.options.elementInViewport;
                    h &&
                        "object" === (void 0 === h ? "undefined" : d(h)) &&
                        void 0 !== h.length &&
                        (h = (function (t, e) {
                            if (Array.isArray(t)) return t;
                            if (Symbol.iterator in Object(t))
                                return (function (t, e) {
                                    var i = [],
                                        n = !0,
                                        o = !1,
                                        s = void 0;
                                    try {
                                        for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done) && (i.push(r.value), !e || i.length !== e); n = !0);
                                    } catch (t) {
                                        (o = !0), (s = t);
                                    } finally {
                                        try {
                                            !n && a.return && a.return();
                                        } finally {
                                            if (o) throw s;
                                        }
                                    }
                                    return i;
                                })(t, e);
                            throw new TypeError("Invalid attempt to destructure non-iterable instance");
                        })(h, 1)[0]),
                        h instanceof Element || (h = null),
                        (i.options.elementInViewport = h),
                        (i.image = {
                            src: i.options.imgSrc || null,
                            $container: null,
                            useImgTag: !1,
                            position: /iPad|iPhone|iPod|Android/.test(navigator.userAgent) ? "absolute" : "fixed",
                        }),
                        i.initImg() && i.canInitParallax() && i.init();
                }

                (_.constructor = b), (C.default = _);
            }.call(this, z(5)));
        },
        function (t, e, i) {
            "use strict";
            var n = i(4),
                o =
                    n.requestAnimationFrame ||
                    n.webkitRequestAnimationFrame ||
                    n.mozRequestAnimationFrame ||
                    function (t) {
                        var e = +new Date(),
                            i = Math.max(0, 16 - (e - s)),
                            n = setTimeout(t, i);
                        return (s = e), n;
                    },
                s = +new Date(),
                r = n.cancelAnimationFrame || n.webkitCancelAnimationFrame || n.mozCancelAnimationFrame || clearTimeout;
            Function.prototype.bind && ((o = o.bind(n)), (r = r.bind(n))), ((t.exports = o).cancel = r);
        },
    ]),
    (function (g, m) {
        "use strict";

        function e(t) {
            return (
                (H.formatter = o),
                (W = g("body")),
                (I = (function () {
                    var t = {
                            WebkitTransition: "webkitTransitionEnd",
                            MozTransition: "transitionend",
                            OTransition: "oTransitionEnd",
                            transition: "transitionend",
                        },
                        e = document.createElement("div");
                    for (var i in t) if (t.hasOwnProperty(i) && i in e.style) return t[i];
                    return !1;
                })()),
                (T = !1 !== I) || (I = "transitionend.boxer"),
                g(this).on("click.boxer", g.extend({}, H, t || {}), i)
            );
        }

        function i(t) {
            if (void 0 === E.$boxer) {
                var e = g(this),
                    i = t.data.$object,
                    n = (e[0].href && e[0].href) || "",
                    o = (e[0].hash && e[0].hash) || "",
                    s = n.toLowerCase().split(".").pop().split(/\#|\?/)[0],
                    r = e.data("boxer-type") || "",
                    a = "image" === r || -1 < g.inArray(s, t.data.extensions) || "data:image" === n.substr(0, 10),
                    l = -1 < n.indexOf("youtube.com/embed") || -1 < n.indexOf("player.vimeo.com/video"),
                    h = "url" === r || (!a && !l && "http" === n.substr(0, 4) && !o),
                    d = "element" === r || (!a && !l && !h && "#" === o.substr(0, 1)),
                    c = void 0 !== i;
                if ((d && (n = o), 1 < g("#boxer").length || !(a || l || h || d || c))) return;
                if (
                    (C(t),
                    ((E = g.extend(
                        {},
                        {
                            $window: g(m),
                            $body: g("body"),
                            $target: e,
                            $object: i,
                            visible: !1,
                            resizeTimer: null,
                            touchTimer: null,
                            gallery: { active: !1 },
                            isMobile: S || t.data.mobile,
                            isAnimating: !0,
                            oldContentHeight: 0,
                            oldContentWidth: 0,
                        },
                        t.data
                    )).margin *= 2),
                    (E.type = a ? "image" : l ? "video" : "element"),
                    a || l)
                ) {
                    var u = E.$target.data("gallery") || E.$target.attr("rel");
                    void 0 !== u &&
                        !1 !== u &&
                        ((E.gallery.active = !0),
                        (E.gallery.id = u),
                        (E.gallery.$items = g("a[data-gallery= " + E.gallery.id + "], a[rel= " + E.gallery.id + "]")),
                        (E.gallery.index = E.gallery.$items.index(E.$target)),
                        (E.gallery.total = E.gallery.$items.length - 1));
                }
                var p = "";
                if (
                    (E.isMobile || (p += '<div id="boxer-overlay" class="' + E.customClass + '"></div>'),
                    (p += '<div id="boxer" class="loading animating ' + E.customClass),
                    E.fixed && (p += " fixed"),
                    E.isMobile && (p += " mobile"),
                    h && (p += " iframe"),
                    (d || c) && (p += " inline"),
                    (p += '">'),
                    (p += '<span class="boxer-close">' + E.labels.close + "</span>"),
                    (p += '<span class="boxer-loading"></span>'),
                    (p += '<div class="boxer-container">'),
                    (p += '<div class="boxer-content">'),
                    (a || l) &&
                        ((p += '<div class="boxer-meta">'),
                        E.gallery.active
                            ? ((p += '<div class="boxer-control previous">' + E.labels.previous + "</div>"),
                              (p += '<div class="boxer-control next">' + E.labels.next + "</div>"),
                              (p += '<p class="boxer-position"'),
                              E.gallery.total < 1 && (p += ' style="display: none;"'),
                              (p += ">"),
                              (p += '<span class="current">' + (E.gallery.index + 1) + "</span> " + E.labels.count + ' <span class="total">' + (E.gallery.total + 1) + "</span>"),
                              (p += "</p>"),
                              (p += '<div class="boxer-caption gallery">'))
                            : (p += '<div class="boxer-caption">'),
                        (p += E.formatter.apply(E.$body, [E.$target])),
                        (p += "</div></div>")),
                    (p += "</div></div></div>"),
                    E.$body.append(p),
                    (E.$overlay = g("#boxer-overlay")),
                    (E.$boxer = g("#boxer")),
                    (E.$container = E.$boxer.find(".boxer-container")),
                    (E.$content = E.$boxer.find(".boxer-content")),
                    (E.$meta = E.$boxer.find(".boxer-meta")),
                    (E.$position = E.$boxer.find(".boxer-position")),
                    (E.$caption = E.$boxer.find(".boxer-caption")),
                    (E.$controls = E.$boxer.find(".boxer-control")),
                    (E.paddingVertical = E.isMobile ? E.$boxer.find(".boxer-close").outerHeight() / 2 : parseInt(E.$boxer.css("paddingTop"), 10) + parseInt(E.$boxer.css("paddingBottom"), 10)),
                    (E.paddingHorizontal = E.isMobile ? 0 : parseInt(E.$boxer.css("paddingLeft"), 10) + parseInt(E.$boxer.css("paddingRight"), 10)),
                    (E.contentHeight = E.$boxer.outerHeight() - E.paddingVertical),
                    (E.contentWidth = E.$boxer.outerWidth() - E.paddingHorizontal),
                    (E.controlHeight = E.$controls.outerHeight()),
                    (function () {
                        var t = y();
                        E.$boxer.css({ top: E.fixed ? 0 : t.top });
                    })(),
                    E.gallery.active && x(),
                    E.$window.on("resize.boxer", j.resize).on("keydown.boxer", b),
                    E.$body.on("touchstart.boxer click.boxer", "#boxer-overlay, #boxer .boxer-close", f).on("touchmove.boxer", C),
                    E.gallery.active && E.$boxer.on("touchstart.boxer click.boxer", ".boxer-control", w),
                    E.$boxer.on(I, function (t) {
                        C(t),
                            g(t.target).is(E.$boxer) &&
                                (E.$boxer.off(I),
                                a
                                    ? v(n)
                                    : l
                                    ? _(n)
                                    : h
                                    ? (function (t) {
                                          (t += -1 < t.indexOf("?") ? "&" + H.requestKey + "=true" : "?" + H.requestKey + "=true"), $(g('<iframe class="boxer-iframe" src="' + t + '" />'));
                                      })(n)
                                    : d
                                    ? (function (t) {
                                          $(g(t).find(">:first-child").clone());
                                      })(n)
                                    : c
                                    ? $(E.$object)
                                    : g.error("BOXER: '" + n + "' is not valid."));
                    }),
                    W.addClass("boxer-open"),
                    T || E.$boxer.trigger(I),
                    c)
                )
                    return E.$boxer;
            }
        }

        function f(t) {
            C(t),
                void 0 !== E.$boxer &&
                    (E.$boxer
                        .on(I, function (t) {
                            C(t), g(t.target).is(E.$boxer) && (E.$boxer.off(I), E.$overlay.remove(), E.$boxer.remove(), (E = {}));
                        })
                        .addClass("animating"),
                    W.removeClass("boxer-open"),
                    T || E.$boxer.trigger(I),
                    z(E.resizeTimer),
                    E.$window.off("resize.boxer").off("keydown.boxer"),
                    E.$body.off(".boxer").removeClass("boxer-open"),
                    E.gallery.active && E.$boxer.off(".boxer"),
                    E.isMobile && "image" === E.type && E.gallery.active && E.$container.off(".boxer"),
                    E.$window.trigger("close.boxer"));
        }

        function n() {
            var t = y();
            E.isMobile || E.duration,
                E.isMobile || E.$controls.css({ marginTop: (E.contentHeight - E.controlHeight - E.metaHeight) / 2 }),
                !E.visible && E.isMobile && E.gallery.active && E.$content.on("touchstart.boxer", ".boxer-image", d),
                (E.isMobile || E.fixed) && E.$body.addClass("boxer-open"),
                E.$boxer.on(I, function (t) {
                    C(t),
                        g(t.target).is(E.$boxer) &&
                            (E.$boxer.off(I),
                            E.$container.on(I, function (t) {
                                C(t), g(t.target).is(E.$container) && (E.$container.off(I), E.$boxer.removeClass("animating"), (E.isAnimating = !1));
                            }),
                            E.$boxer.removeClass("loading"),
                            T || E.$content.trigger(I),
                            (E.visible = !0),
                            E.callback.apply(E.$boxer),
                            E.$window.trigger("open.boxer"),
                            E.gallery.active &&
                                (function (t) {
                                    var e = "";
                                    0 < E.gallery.index && (e = E.gallery.$items.eq(E.gallery.index - 1).attr("href")).indexOf("youtube.com/embed") < 0 && e.indexOf("player.vimeo.com/video") < 0 && g('<img src="' + e + '">'),
                                        E.gallery.index < E.gallery.total &&
                                            (e = E.gallery.$items.eq(E.gallery.index + 1).attr("href")).indexOf("youtube.com/embed") < 0 &&
                                            e.indexOf("player.vimeo.com/video") < 0 &&
                                            g('<img src="' + e + '">');
                                })());
                }),
                E.isMobile ||
                    E.$boxer.css({
                        height: E.contentHeight + E.paddingVertical,
                        width: E.contentWidth + E.paddingHorizontal,
                        top: E.fixed ? 0 : t.top,
                    });
            var e = E.oldContentHeight !== E.contentHeight || E.oldContentWidth !== E.contentWidth;
            (!E.isMobile && T && e) || E.$boxer.trigger(I), (E.oldContentHeight = E.contentHeight), (E.oldContentWidth = E.contentWidth);
        }

        function y() {
            if (E.isMobile) return { left: 0, top: 0 };
            var t = {
                left: (E.$window.width() - E.contentWidth - E.paddingHorizontal) / 2,
                top: E.top <= 0 ? (E.$window.height() - E.contentHeight - E.paddingVertical) / 2 : E.top,
            };
            return !0 !== E.fixed && (t.top += E.$window.scrollTop()), t;
        }

        function o(t) {
            var e = t.attr("title");
            return void 0 !== e && "" !== e.trim() ? '<p class="caption">' + e.trim() + "</p>" : "";
        }

        function v(t) {
            (E.$image = g("<img />")),
                E.$image
                    .load(function () {
                        E.$image.off("load, error");
                        var t = (function (t) {
                            var e = t[0],
                                i = new Image();
                            return void 0 !== e.naturalHeight
                                ? {
                                      naturalHeight: e.naturalHeight,
                                      naturalWidth: e.naturalWidth,
                                  }
                                : "img" === e.tagName.toLowerCase() &&
                                      ((i.src = e.src),
                                      {
                                          naturalHeight: i.height,
                                          naturalWidth: i.width,
                                      });
                        })(E.$image);
                        (E.naturalHeight = t.naturalHeight),
                            (E.naturalWidth = t.naturalWidth),
                            E.retina && ((E.naturalHeight /= 2), (E.naturalWidth /= 2)),
                            E.$content.prepend(E.$image),
                            "" === E.$caption.html() ? E.$caption.hide() : E.$caption.show(),
                            s(),
                            n();
                    })
                    .error(h)
                    .attr("src", t)
                    .addClass("boxer-image"),
                (!E.$image[0].complete && 4 !== E.$image[0].readyState) || E.$image.trigger("load");
        }

        function s() {
            var t = 0;
            for (
                E.windowHeight = E.viewportHeight = E.$window.height() - E.paddingVertical,
                    E.windowWidth = E.viewportWidth = E.$window.width() - E.paddingHorizontal,
                    E.contentHeight = 1 / 0,
                    E.contentWidth = 1 / 0,
                    E.imageMarginTop = 0,
                    E.imageMarginLeft = 0;
                E.contentHeight > E.viewportHeight && t < 2;

            )
                (E.imageHeight = 0 === t ? E.naturalHeight : E.$image.outerHeight()),
                    (E.imageWidth = 0 === t ? E.naturalWidth : E.$image.outerWidth()),
                    (E.metaHeight = 0 === t ? 0 : E.metaHeight),
                    0 === t && ((E.ratioHorizontal = E.imageHeight / E.imageWidth), (E.ratioVertical = E.imageWidth / E.imageHeight), (E.isWide = E.imageWidth > E.imageHeight)),
                    E.imageHeight < E.minHeight && (E.minHeight = E.imageHeight),
                    E.imageWidth < E.minWidth && (E.minWidth = E.imageWidth),
                    E.isMobile
                        ? (E.$meta.css({ width: E.windowWidth }),
                          (E.metaHeight = E.$meta.outerHeight(!0)),
                          (E.contentHeight = E.viewportHeight - E.paddingVertical),
                          (E.contentWidth = E.viewportWidth - E.paddingHorizontal),
                          r(),
                          (E.imageMarginTop = (E.contentHeight - E.targetImageHeight - E.metaHeight) / 2),
                          (E.imageMarginLeft = (E.contentWidth - E.targetImageWidth) / 2))
                        : (0 === t && ((E.viewportHeight -= E.margin + E.paddingVertical), (E.viewportWidth -= E.margin + E.paddingHorizontal)),
                          (E.viewportHeight -= E.metaHeight),
                          r(),
                          (E.contentHeight = E.targetImageHeight),
                          (E.contentWidth = E.targetImageWidth)),
                    E.$meta.css({ width: E.contentWidth }),
                    E.$image.css({
                        height: E.targetImageHeight,
                        width: E.targetImageWidth,
                        marginTop: E.imageMarginTop,
                        marginLeft: E.imageMarginLeft,
                    }),
                    E.isMobile || ((E.metaHeight = E.$meta.outerHeight(!0)), (E.contentHeight += E.metaHeight)),
                    t++;
        }

        function r() {
            var t = E.isMobile ? E.contentHeight - E.metaHeight : E.viewportHeight,
                e = E.isMobile ? E.contentWidth : E.viewportWidth;
            E.isWide
                ? ((E.targetImageWidth = e), (E.targetImageHeight = E.targetImageWidth * E.ratioHorizontal), E.targetImageHeight > t && ((E.targetImageHeight = t), (E.targetImageWidth = E.targetImageHeight * E.ratioVertical)))
                : ((E.targetImageHeight = t), (E.targetImageWidth = E.targetImageHeight * E.ratioVertical), E.targetImageWidth > e && ((E.targetImageWidth = e), (E.targetImageHeight = E.targetImageWidth * E.ratioHorizontal))),
                (E.targetImageWidth > E.imageWidth || E.targetImageHeight > E.imageHeight) && ((E.targetImageHeight = E.imageHeight), (E.targetImageWidth = E.imageWidth)),
                (E.targetImageWidth < E.minWidth || E.targetImageHeight < E.minHeight) &&
                    (E.targetImageWidth < E.minWidth
                        ? ((E.targetImageWidth = E.minWidth), (E.targetImageHeight = E.targetImageWidth * E.ratioHorizontal))
                        : ((E.targetImageHeight = E.minHeight), (E.targetImageWidth = E.targetImageHeight * E.ratioVertical)));
        }

        function _(t) {
            (E.$videoWrapper = g('<div class="boxer-video-wrapper" />')),
                (E.$video = g('<iframe class="boxer-video" seamless="seamless" />')),
                E.$video.attr("src", t).addClass("boxer-video").prependTo(E.$videoWrapper),
                E.$content.prepend(E.$videoWrapper),
                a(),
                n();
        }

        function a() {
            (E.windowHeight = E.viewportHeight = E.contentHeight = E.$window.height() - E.paddingVertical),
                (E.windowWidth = E.viewportWidth = E.contentWidth = E.$window.width() - E.paddingHorizontal),
                (E.videoMarginTop = 0),
                (E.videoMarginLeft = 0),
                E.isMobile
                    ? (E.$meta.css({ width: E.windowWidth }),
                      (E.metaHeight = E.$meta.outerHeight(!0)),
                      (E.viewportHeight -= E.metaHeight),
                      (E.targetVideoWidth = E.viewportWidth),
                      (E.targetVideoHeight = E.targetVideoWidth * E.videoRatio),
                      E.targetVideoHeight > E.viewportHeight && ((E.targetVideoHeight = E.viewportHeight), (E.targetVideoWidth = E.targetVideoHeight / E.videoRatio)),
                      (E.videoMarginTop = (E.viewportHeight - E.targetVideoHeight) / 2),
                      (E.videoMarginLeft = (E.viewportWidth - E.targetVideoWidth) / 2))
                    : ((E.viewportHeight = E.windowHeight - E.margin),
                      (E.viewportWidth = E.windowWidth - E.margin),
                      (E.targetVideoWidth = E.videoWidth > E.viewportWidth ? E.viewportWidth : E.videoWidth),
                      E.targetVideoWidth < E.minWidth && (E.targetVideoWidth = E.minWidth),
                      (E.targetVideoHeight = E.targetVideoWidth * E.videoRatio),
                      (E.contentHeight = E.targetVideoHeight),
                      (E.contentWidth = E.targetVideoWidth)),
                E.$meta.css({ width: E.contentWidth }),
                E.$videoWrapper.css({
                    height: E.targetVideoHeight,
                    width: E.targetVideoWidth,
                    marginTop: E.videoMarginTop,
                    marginLeft: E.videoMarginLeft,
                }),
                E.isMobile || ((E.metaHeight = E.$meta.outerHeight(!0)), (E.contentHeight = E.targetVideoHeight + E.metaHeight));
        }

        function w(t) {
            C(t);
            var e = g(this);
            E.isAnimating ||
                e.hasClass("disabled") ||
                ((E.isAnimating = !0),
                (E.gallery.index += e.hasClass("next") ? 1 : -1),
                E.gallery.index > E.gallery.total && (E.gallery.index = E.gallery.total),
                E.gallery.index < 0 && (E.gallery.index = 0),
                E.$container.on(I, function (t) {
                    if ((C(t), g(t.target).is(E.$container))) {
                        E.$container.off(I),
                            void 0 !== E.$image && E.$image.remove(),
                            void 0 !== E.$videoWrapper && E.$videoWrapper.remove(),
                            (E.$target = E.gallery.$items.eq(E.gallery.index)),
                            E.$caption.html(E.formatter.apply(E.$body, [E.$target])),
                            E.$position.find(".current").html(E.gallery.index + 1);
                        var e = E.$target.attr("href");
                        -1 < e.indexOf("youtube.com/embed") || -1 < e.indexOf("player.vimeo.com/video") ? _(e) : v(e), x();
                    }
                }),
                E.$boxer.addClass("loading animating"),
                T || E.$content.trigger(I));
        }

        function x() {
            E.$controls.removeClass("disabled"), 0 === E.gallery.index && E.$controls.filter(".previous").addClass("disabled"), E.gallery.index === E.gallery.total && E.$controls.filter(".next").addClass("disabled");
        }

        function b(t) {
            !E.gallery.active || (37 !== t.keyCode && 39 !== t.keyCode) ? 27 === t.keyCode && E.$boxer.find(".boxer-close").trigger("click") : (C(t), E.$controls.filter(37 === t.keyCode ? ".previous" : ".next").trigger("click"));
        }

        function $(t) {
            E.$content.append(t), l(t), n();
        }

        function l(t) {
            (E.windowHeight = E.$window.height() - E.paddingVertical),
                (E.windowWidth = E.$window.width() - E.paddingHorizontal),
                (E.objectHeight = t.outerHeight(!0)),
                (E.objectWidth = t.outerWidth(!0)),
                (E.targetHeight = E.targetHeight || E.$target.data("boxer-height")),
                (E.targetWidth = E.targetWidth || E.$target.data("boxer-width")),
                (E.maxHeight = E.windowHeight < 0 ? H.minHeight : E.windowHeight),
                (E.isIframe = t.is("iframe")),
                (E.objectMarginTop = 0),
                (E.objectMarginLeft = 0),
                E.isMobile || ((E.windowHeight -= E.margin), (E.windowWidth -= E.margin)),
                (E.contentHeight = void 0 !== E.targetHeight ? E.targetHeight : E.isIframe || E.isMobile ? E.windowHeight : E.objectHeight),
                (E.contentWidth = void 0 !== E.targetWidth ? E.targetWidth : E.isIframe || E.isMobile ? E.windowWidth : E.objectWidth),
                (E.isIframe || E.isObject) && E.isMobile
                    ? ((E.contentHeight = E.windowHeight), (E.contentWidth = E.windowWidth))
                    : E.isObject && ((E.contentHeight = E.contentHeight > E.windowHeight ? E.windowHeight : E.contentHeight), (E.contentWidth = E.contentWidth > E.windowWidth ? E.windowWidth : E.contentWidth));
        }

        function h(t) {
            var e = g('<div class="boxer-error"><p>Error Loading Resource</p></div>');
            (E.type = "element"), E.$meta.remove(), E.$image.off("load, error"), $(e);
        }

        function d(t) {
            if ((C(t), z(E.touchTimer), !E.isAnimating)) {
                var e = void 0 !== t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0] : null;
                (E.xStart = e ? e.pageX : t.clientX),
                    (E.leftPosition = 0),
                    (E.touchMax = 1 / 0),
                    (E.touchMin = -1 / 0),
                    (E.edge = 0.25 * E.contentWidth),
                    0 === E.gallery.index && (E.touchMax = 0),
                    E.gallery.index === E.gallery.total && (E.touchMin = 0),
                    E.$boxer.on("touchmove.boxer", c).one("touchend.boxer", u);
            }
        }

        function c(t) {
            var e = void 0 !== t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0] : null;
            (E.delta = E.xStart - (e ? e.pageX : t.clientX)), 20 < E.delta && C(t), (E.canSwipe = !0);
            var i = -E.delta;
            i < E.touchMin && ((i = E.touchMin), (E.canSwipe = !1)),
                i > E.touchMax && ((i = E.touchMax), (E.canSwipe = !1)),
                E.$image.css({ transform: "translate3D(" + i + "px,0,0)" }),
                (E.touchTimer = p(E.touchTimer, 300, function () {
                    u(t);
                }));
        }

        function u(t) {
            C(t),
                z(E.touchTimer),
                E.$boxer.off("touchmove.boxer touchend.boxer"),
                E.delta &&
                    (E.$boxer.addClass("animated"),
                    (E.swipe = !1),
                    E.canSwipe && (E.delta > E.edge || E.delta < -E.edge)
                        ? ((E.swipe = !0), E.$image.css(E.delta <= E.leftPosition ? { transform: "translate3D(" + E.contentWidth + "px,0,0)" } : { transform: "translate3D(" + -E.contentWidth + "px,0,0)" }))
                        : E.$image.css({ transform: "translate3D(0,0,0)" }),
                    E.swipe && E.$controls.filter(E.delta <= E.leftPosition ? ".previous" : ".next").trigger("click"),
                    p(E.resetTimer, E.duration, function () {
                        E.$boxer.removeClass("animated");
                    }));
        }

        function C(t) {
            t.preventDefault && (t.stopPropagation(), t.preventDefault());
        }

        function p(t, e, i) {
            return z(t), setTimeout(i, e);
        }

        function z(t) {
            t && (clearTimeout(t), (t = null));
        }

        var I,
            T,
            W = null,
            E = {},
            S = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(m.navigator.userAgent || m.navigator.vendor || m.opera),
            H = {
                callback: g.noop,
                customClass: "",
                extensions: ["jpg", "sjpg", "jpeg", "png", "gif"],
                fixed: !1,
                formatter: g.noop,
                labels: { close: "Close", count: "of", next: "Next", previous: "Previous" },
                margin: 50,
                minHeight: 100,
                minWidth: 100,
                mobile: !1,
                opacity: 0.75,
                retina: !1,
                requestKey: "boxer",
                top: 0,
                videoRatio: 0.5625,
                videoWidth: 600,
            },
            j = {
                close: function () {
                    void 0 !== E.$boxer && (E.$boxer.off(".boxer"), E.$overlay.trigger("click"));
                },
                defaults: function (t) {
                    return (H = g.extend(H, t || {})), "object" == typeof this && g(this);
                },
                destroy: function () {
                    return g(this).off(".boxer");
                },
                resize: function (t) {
                    return (
                        void 0 !== E.$boxer &&
                            ("object" != typeof t && ((E.targetHeight = t), (E.targetWidth = arguments[1])),
                            "element" === E.type ? l(E.$content.find(">:first-child")) : "image" === E.type ? s() : "video" === E.type && a(),
                            (function () {
                                if (E.visible && !E.isMobile) {
                                    var t = y();
                                    E.$controls.css({ marginTop: (E.contentHeight - E.controlHeight - E.metaHeight) / 2 }),
                                        E.$boxer.css({
                                            height: E.contentHeight + E.paddingVertical,
                                            width: E.contentWidth + E.paddingHorizontal,
                                            top: E.fixed ? 0 : t.top,
                                        });
                                }
                            })()),
                        g(this)
                    );
                },
            };
        (g.fn.boxer = function (t) {
            return j[t] ? j[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? this : e.apply(this, arguments);
        }),
            (g.boxer = function (t, e) {
                return j[t] ? j[t].apply(m, Array.prototype.slice.call(arguments, 1)) : t instanceof g ? i.apply(m, [{ data: g.extend({ $object: t }, H, e || {}) }]) : void 0;
            });
    })(jQuery, window),
    (function (d) {
        "use strict";
        var c = document.documentElement,
            u = d(window),
            o = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

        function t() {
            var o,
                t = document.getElementById("top-bar"),
                e = document.getElementById("top-bar__navigation-toggler"),
                i = document.getElementById("top-bar__navigation"),
                s = d(t),
                r = d(e),
                n = d(i),
                a = n.find("li a"),
                l = n.find(".submenu"),
                h = !1;
            l.length && l.parents("li").addClass("has-children"),
                (o = r.is(":visible") ? 70 : 80),
                a.on("touchend click", function (t) {
                    var e = d(this),
                        i = e.parent();
                    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                        var n = d(this.hash);
                        return (
                            (n = n.length ? n : d("[name=" + this.hash.slice(1) + "]")).length &&
                                d("html,body")
                                    .stop()
                                    .animate({ scrollTop: n.offset().top - o }, 1e3),
                            r.is(":visible") && (s.removeClass("expanded"), r.removeClass("active")),
                            !1
                        );
                    }
                    if (r.is(":visible") && e.next(l).length)
                        return (
                            e.next().is(":visible")
                                ? (i.removeClass("drop_active"), e.next().slideUp("fast"))
                                : (e.closest("ul").find("li").removeClass("drop_active"), e.closest("ul").find(".submenu").slideUp("fast"), i.addClass("drop_active"), e.next().slideDown("fast")),
                            !1
                        );
                }),
                r.on("touchend click", function (t) {
                    t.preventDefault();
                    var e = d(this);
                    return (h = (h ? (e.removeClass("active"), s.removeClass("expanded"), (c.style.overflow = "")) : (e.addClass("active"), s.addClass("expanded"), (c.style.overflow = "hidden")), !h)), !1;
                }),
                u.on(
                    "resize",
                    (function (i, n, o) {
                        var s;
                        return function () {
                            var t = this,
                                e = arguments;
                            clearTimeout(s),
                                (s = setTimeout(function () {
                                    (s = null), o || i.apply(t, e);
                                }, n)),
                                o && !s && i.apply(t, e);
                        };
                    })(function () {
                        767 < window.innerWidth && (s.removeClass("expanded"), r.removeClass("active"), l.removeAttr("style"), (c.style.overflow = ""), (h = !1));
                    }, 100)
                );
        }

        function e() {
            d(".skill__item").appear(function () {
                var t = d(this);
                setTimeout(function () {
                    !(function (t) {
                        d(".js-chart", t).each(function () {
                            d(this).easyPieChart({
                                easing: "easeOutElastic",
                                delay: 3e3,
                                barColor: "#369670",
                                trackColor: "",
                                scaleColor: !1,
                                lineWidth: 12,
                                trackWidth: 12,
                                size: 175,
                                lineCap: "butt",
                                onStep: function (t, e, i) {
                                    this.el.children[0].innerHTML = Math.round(i);
                                },
                            });
                        });
                    })(t);
                }, 200);
            });
        }

        function i() {
            d(".counter__item").appear(function () {
                var t = d(this);
                setTimeout(function () {
                    !(function (t) {
                        d(".js-count", t).each(function () {
                            d(this).hasClass("animate") ||
                                d(this).countTo({
                                    from: 0,
                                    speed: 2e3,
                                    refreshInterval: 100,
                                    onComplete: function () {
                                        d(this).addClass("animate");
                                    },
                                });
                        });
                    })(t);
                }, 200);
            });
        }

        function n() {
            var t = document.getElementById("btn-to-top-wrap"),
                e = d(t);
            if (0 < e.length) {
                var i = document.getElementById("btn-to-top"),
                    n = d(i),
                    o = n.data("visible-offset");
                n.on("click", function (t) {
                    return t.preventDefault(), d("body,html").stop().animate({ scrollTop: 0 }, 1500), !1;
                }),
                    u
                        .on(
                            "scroll",
                            (function (i, n, o) {
                                var s,
                                    r,
                                    a,
                                    l,
                                    h = 0;
                                o || (o = {});
                                var d = function () {
                                        (h = !1 === o.leading ? 0 : p()), (s = null), (l = i.apply(r, a)), s || (r = a = null);
                                    },
                                    t = function () {
                                        var t = p();
                                        h || !1 !== o.leading || (h = t);
                                        var e = n - (t - h);
                                        return (r = this), (a = arguments), e <= 0 || n < e ? (s && (clearTimeout(s), (s = null)), (h = t), (l = i.apply(r, a)), s || (r = a = null)) : s || !1 === o.trailing || (s = setTimeout(d, e)), l;
                                    };
                                return (
                                    (t.cancel = function () {
                                        clearTimeout(s), (h = 0), (s = r = a = null);
                                    }),
                                    t
                                );
                            })(function (t) {
                                u.scrollTop() > o ? e.is(":hidden") && e.fadeIn() : e.is(":visible") && e.fadeOut();
                            }, 400)
                        )
                        .scroll();
            }
        }

        function p() {
            return new Date().getTime();
        }

        (_fixed_menu = function () {
            var t = document.getElementById("top-bar"),
                e = d(t),
                i = e.next("header").innerHeight() - 80,
                n = !1;
            window.onscroll = function () {
                (window.pageYOffset || document.documentElement.scrollTop) >= i
                    ? n ||
                      (e
                          .off(o)
                          .addClass("fixed in")
                          .one(o, function (t) {
                              e.removeClass("in");
                          }),
                      (n = !n))
                    : n &&
                      (e
                          .addClass("out")
                          .off(o)
                          .one(o, function (t) {
                              e.removeClass("fixed out");
                          }),
                      (n = !n));
            };
        }),
            d(document).ready(function () {
                _fixed_menu(),
                    t(),
                    (function () {
                        var t = d(".feedbacks--slider");
                        0 < t.length &&
                            t.children(".owl-carousel").owlCarousel({
                                loop: !0,
                                nav: !1,
                                dots: !0,
                                autoplay: !0,
                                autoplayTimeout: 6e3,
                                autoplayHoverPause: !0,
                                autoHeight: !0,
                                smartSpeed: 1e3,
                                margin: 30,
                                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                                responsive: { 0: { items: 1 }, 992: { items: 1 } },
                            });
                    })(),
                    (function () {
                        var t = document.getElementById("gallery-set"),
                            n = d(t);
                        if (0 < n.length) {
                            var o = d(".js-isotope");
                            n.find("a").on("click", function (t) {
                                var e = d(this),
                                    i = e.data("cat");
                                return n.find(".selected").removeClass("selected"), e.addClass("selected"), "*" !== i && (i = "." + i), o.isotope({ filter: i }), !1;
                            });
                        }
                    })(),
                    e(),
                    i(),
                    // (function () {
                    //     var t = document.querySelectorAll(".jarallax");
                    //     device.desktop() && 0 < t.length && jarallax(t, { type: "scroll", zIndex: -20 });
                    // })(),
                    n(),
                    (function () {
                        var t = d("a[data-gallery]");
                        0 < t.length && t.boxer({ fixed: !0, videoWidth: 1e3 });
                    })(),
                    (function () {
                        var t = d(".js-contact-form");
                        0 < t.length &&
                            t.each(function (t, e) {
                                d(e).on("submit", function () {
                                    var e = d(this),
                                        t = e.serialize(),
                                        i = e.find(".form__note");
                                    return (
                                        d.ajax({
                                            type: "POST",
                                            url: "send_mail/contact_process.php",
                                            data: t,
                                            success: function (t) {
                                                i.html('<span style="color: green"><br/>Your message has been sent. Thank you!</span>'),
                                                    e.get(0).reset(),
                                                    setTimeout(function () {
                                                        i.html("");
                                                    }, 3e3);
                                            },
                                            error: function (t) {
                                                var e = '<span style="color: red"><br/>Your message not sent! Error: "' + t.responseJSON.message + '"</span>';
                                                i.html(e);
                                            },
                                            complete: function () {},
                                        }),
                                        !1
                                    );
                                });
                            });
                    })();
            }),
            u.on("load", function () {
                var t = d(".js-isotope");
                t.length && t.isotope("layout"),
                    (function () {
                        var n = d(".g_map");
                        if (0 < n.length) {
                            var t = n.attr("data-api-key"),
                                e = ("https:" == document.location.protocol ? "https" : "http") + "://maps.google.com/maps/api/js?" + (t ? "key=" + t + "&" : "") + "sensor=false";
                            d.getScript(e, function (t, e, i) {
                                n.each(function () {
                                    var t = d(this),
                                        e = new google.maps.LatLng(t.attr("data-longitude"), t.attr("data-latitude")),
                                        i = t.attr("data-marker"),
                                        n = {
                                            zoom: 14,
                                            center: e,
                                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                                            mapTypeControl: !1,
                                            scrollwheel: !1,
                                            draggable: !0,
                                            panControl: !1,
                                            zoomControl: !1,
                                            disableDefaultUI: !0,
                                        },
                                        o = new google.maps.Map(t[0], n),
                                        s = new google.maps.StyledMapType(
                                            [
                                                {
                                                    featureType: "all",
                                                    elementType: "all",
                                                    stylers: [{ saturation: -100 }],
                                                },
                                            ],
                                            { name: "Grayscale" }
                                        );
                                    o.mapTypes.set("Grayscale", s),
                                        o.setMapTypeId("Grayscale"),
                                        new google.maps.Marker({
                                            map: o,
                                            icon: {
                                                size: new google.maps.Size(59, 69),
                                                origin: new google.maps.Point(0, 0),
                                                anchor: new google.maps.Point(0, 69),
                                                url: i,
                                            },
                                            position: e,
                                        }),
                                        google.maps.event.addDomListener(window, "resize", function () {
                                            var t = o.getCenter();
                                            google.maps.event.trigger(o, "resize"), o.setCenter(t);
                                        });
                                });
                            });
                        }
                    })();
            });
    })(jQuery);
//# sourceMappingURL=main.min.js.map
