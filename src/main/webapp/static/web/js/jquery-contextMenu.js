/*!
 * jQuery contextMenu v2.0.1 - Plugin for simple contextMenu handling
 *
 * Version: v2.0.1
 *
 * Authors: Björn Brala (SWIS.nl), Rodney Rehm, Addy Osmani (patches for FF)
 * Web: http://swisnl.github.io/jQuery-contextMenu/
 *
 * Copyright (c) 2011-2015 SWIS BV and contributors
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 * Date: 2015-12-23T16:35:18.402Z
 */
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        if (typeof exports === "object") {
            a(require("jquery"))
        } else {
            a(jQuery)
        }
    }
})(function(j) {
    j.support.htmlMenuitem = ("HTMLMenuItemElement" in window);
    j.support.htmlCommand = ("HTMLCommandElement" in window);
    j.support.eventSelectstart = ("onselectstart" in document.documentElement);
    if (!j.ui || !j.widget) {
        j.cleanData = (function(q) {
            return function(r) {
                var t, u, s;
                for (s = 0; (u = r[s]) != null; s++) {
                    try {
                        t = j._data(u, "events");
                        if (t && t.remove) {
                            j(u).triggerHandler("remove")
                        }
                    } catch(v) {}
                }
                q(r)
            }
        })(j.cleanData)
    }
    var h = null,
    f = false,
    d = j(window),
    a = 0,
    b = {},
    i = {},
    m = {},
    g = {
        selector: null,
        appendTo: null,
        trigger: "right",
        autoHide: false,
        delay: 200,
        reposition: true,
        classNames: {
            hover: "context-menu-hover",
            disabled: "context-menu-disabled",
            visible: "context-menu-visible",
            notSelectable: "context-menu-not-selectable",
            icon: "context-menu-icon",
            iconEdit: "context-menu-icon-edit",
            iconCut: "context-menu-icon-cut",
            iconCopy: "context-menu-icon-copy",
            iconPaste: "context-menu-icon-paste",
            iconDelete: "context-menu-icon-delete",
            iconAdd: "context-menu-icon-add",
            iconQuit: "context-menu-icon-quit"
        },
        determinePosition: function(q) {
            if (j.ui && j.ui.position) {
                q.css("display", "block").position({
                    my: "center top",
                    at: "center bottom",
                    of: this,
                    offset: "0 5",
                    collision: "fit"
                }).css("display", "none")
            } else {
                var r = this.offset();
                r.top += this.outerHeight();
                r.left += this.outerWidth() / 2 - q.outerWidth() / 2;
                q.css(r)
            }
        },
        position: function(u, r, z) {
            var w;
            if (!r && !z) {
                u.determinePosition.call(this, u.$menu);
                return
            } else {
                if (r === "maintain" && z === "maintain") {
                    w = u.$menu.position()
                } else {
                    w = {
                        top: z,
                        left: r
                    }
                }
            }
            var s = d.scrollTop() + d.height(),
            t = d.scrollLeft() + d.width(),
            q = u.$menu.outerHeight(),
            v = u.$menu.outerWidth();
            if (w.top + q > s) {
                w.top -= q
            }
            if (w.top < 0) {
                w.top = 0
            }
            if (w.left + v > t) {
                w.left -= v
            }
            if (w.left < 0) {
                w.left = 0
            }
            u.$menu.css(w)
        },
        positionSubmenu: function(q) {
            if (j.ui && j.ui.position) {
                q.css("display", "block").position({
                    my: "left top",
                    at: "right top",
                    of: this,
                    collision: "flipfit fit"
                }).css("display", "")
            } else {
                var r = {
                    top: 0,
                    left: this.outerWidth()
                };
                q.css(r)
            }
        },
        zIndex: 1,
        animation: {
            duration: 50,
            show: "slideDown",
            hide: "slideUp"
        },
        events: {
            show: j.noop,
            hide: j.noop
        },
        callback: null,
        items: {}
    },
    n = {
        timer: null,
        pageX: null,
        pageY: null
    },
    p = function(s) {
        var r = 0,
        q = s;
        while (true) {
            r = Math.max(r, parseInt(q.css("z-index"), 10) || 0);
            q = q.parent();
            if (!q || !q.length || "html body".indexOf(q.prop("nodeName").toLowerCase()) > -1) {
                break
            }
        }
        return r
    },
    l = {
        abortevent: function(q) {
            q.preventDefault();
            q.stopImmediatePropagation()
        },
        contextmenu: function(u) {
            var t = j(this);
            if (u.data.trigger === "right") {
                u.preventDefault();
                u.stopImmediatePropagation()
            }
            if ((u.data.trigger !== "right" && u.data.trigger !== "demand") && u.originalEvent) {
                return
            }
            if (u.mouseButton !== undefined && u.data) {
                if (! (u.data.trigger == "left" && u.mouseButton === 0) && !(u.data.trigger == "right" && u.mouseButton === 2)) {
                    return
                }
            }
            if (t.hasClass("context-menu-active")) {
                return
            }
            if (!t.hasClass("context-menu-disabled")) {
                h = t;
                if (u.data.build) {
                    var r = u.data.build(h, u);
                    if (r === false) {
                        return
                    }
                    u.data = j.extend(true, {},
                    g, u.data, r || {});
                    if (!u.data.items || j.isEmptyObject(u.data.items)) {
                        if (window.console) { (console.error || console.log).call(console, "No items specified to show in contextMenu")
                        }
                        throw new Error("No Items specified")
                    }
                    u.data.$trigger = h;
                    k.create(u.data)
                }
                var q = false;
                for (var s in u.data.items) {
                    if (u.data.items.hasOwnProperty(s)) {
                        var v;
                        if (j.isFunction(u.data.items[s].visible)) {
                            v = u.data.items[s].visible.call(j(u.currentTarget), s, u.data)
                        } else {
                            if (typeof s.visible !== "undefined") {
                                v = u.data.items[s].visible === true
                            } else {
                                v = true
                            }
                        }
                        if (v) {
                            q = true
                        }
                    }
                }
                if (q) {
                    k.show.call(t, u.data, u.pageX, u.pageY)
                }
            }
        },
        click: function(q) {
            q.preventDefault();
            q.stopImmediatePropagation();
            j(this).trigger(j.Event("contextmenu", {
                data: q.data,
                pageX: q.pageX,
                pageY: q.pageY
            }))
        },
        mousedown: function(r) {
            var q = j(this);
            if (h && h.length && !h.is(q)) {
                h.data("contextMenu").$menu.trigger("contextmenu:hide")
            }
            if (r.button === 2) {
                h = q.data("contextMenuActive", true)
            }
        },
        mouseup: function(r) {
            var q = j(this);
            if (q.data("contextMenuActive") && h && h.length && h.is(q) && !q.hasClass("context-menu-disabled")) {
                r.preventDefault();
                r.stopImmediatePropagation();
                h = q;
                q.trigger(j.Event("contextmenu", {
                    data: r.data,
                    pageX: r.pageX,
                    pageY: r.pageY
                }))
            }
            q.removeData("contextMenuActive")
        },
        mouseenter: function(s) {
            var r = j(this),
            q = j(s.relatedTarget),
            t = j(document);
            if (q.is(".context-menu-list") || q.closest(".context-menu-list").length) {
                return
            }
            if (h && h.length) {
                return
            }
            n.pageX = s.pageX;
            n.pageY = s.pageY;
            n.data = s.data;
            t.on("mousemove.contextMenuShow", l.mousemove);
            n.timer = setTimeout(function() {
                n.timer = null;
                t.off("mousemove.contextMenuShow");
                h = r;
                r.trigger(j.Event("contextmenu", {
                    data: n.data,
                    pageX: n.pageX,
                    pageY: n.pageY
                }))
            },
            s.data.delay)
        },
        mousemove: function(q) {
            n.pageX = q.pageX;
            n.pageY = q.pageY
        },
        mouseleave: function(r) {
            var q = j(r.relatedTarget);
            if (q.is(".context-menu-list") || q.closest(".context-menu-list").length) {
                return
            }
            try {
                clearTimeout(n.timer)
            } catch(r) {}
            n.timer = null
        },
        layerClick: function(v) {
            var u = j(this),
            r = u.data("contextMenuRoot"),
            s = v.button,
            q = v.pageX,
            z = v.pageY,
            t,
            w;
            v.preventDefault();
            v.stopImmediatePropagation();
            setTimeout(function() {
                var y;
                var x = ((r.trigger === "left" && s === 0) || (r.trigger === "right" && s === 2));
                if (document.elementFromPoint && r.$layer) {
                    r.$layer.hide();
                    t = document.elementFromPoint(q - d.scrollLeft(), z - d.scrollTop());
                    r.$layer.show()
                }
                if (r.reposition && x) {
                    if (document.elementFromPoint) {
                        if (r.$trigger.is(t) || r.$trigger.has(t).length) {
                            r.position.call(r.$trigger, r, q, z);
                            return
                        }
                    } else {
                        w = r.$trigger.offset();
                        y = j(window);
                        w.top += y.scrollTop();
                        if (w.top <= v.pageY) {
                            w.left += y.scrollLeft();
                            if (w.left <= v.pageX) {
                                w.bottom = w.top + r.$trigger.outerHeight();
                                if (w.bottom >= v.pageY) {
                                    w.right = w.left + r.$trigger.outerWidth();
                                    if (w.right >= v.pageX) {
                                        r.position.call(r.$trigger, r, q, z);
                                        return
                                    }
                                }
                            }
                        }
                    }
                }
                if (t && x) {
                    r.$trigger.one("contextmenu:hidden",
                    function() {
                        j(t).contextMenu({
                            x: q,
                            y: z,
                            button: s
                        })
                    })
                }
                r.$menu.trigger("contextmenu:hide")
            },
            50)
        },
        keyStop: function(r, q) {
            if (!q.isInput) {
                r.preventDefault()
            }
            r.stopPropagation()
        },
        key: function(u) {
            var s = {};
            if (h) {
                s = h.data("contextMenu") || {}
            }
            switch (u.keyCode) {
            case 9:
            case 38:
                l.keyStop(u, s);
                if (s.isInput) {
                    if (u.keyCode === 9 && u.shiftKey) {
                        u.preventDefault();
                        s.$selected && s.$selected.find("input, textarea, select").blur();
                        s.$menu.trigger("prevcommand");
                        return
                    } else {
                        if (u.keyCode === 38 && s.$selected.find("input, textarea, select").prop("type") === "checkbox") {
                            u.preventDefault();
                            return
                        }
                    }
                } else {
                    if (u.keyCode !== 9 || u.shiftKey) {
                        s.$menu.trigger("prevcommand");
                        return
                    }
                }
            case 40:
                l.keyStop(u, s);
                if (s.isInput) {
                    if (u.keyCode === 9) {
                        u.preventDefault();
                        s.$selected && s.$selected.find("input, textarea, select").blur();
                        s.$menu.trigger("nextcommand");
                        return
                    } else {
                        if (u.keyCode === 40 && s.$selected.find("input, textarea, select").prop("type") === "checkbox") {
                            u.preventDefault();
                            return
                        }
                    }
                } else {
                    s.$menu.trigger("nextcommand");
                    return
                }
                break;
            case 37:
                l.keyStop(u, s);
                if (s.isInput || !s.$selected || !s.$selected.length) {
                    break
                }
                if (!s.$selected.parent().hasClass("context-menu-root")) {
                    var t = s.$selected.parent().parent();
                    s.$selected.trigger("contextmenu:blur");
                    s.$selected = t;
                    return
                }
                break;
            case 39:
                l.keyStop(u, s);
                if (s.isInput || !s.$selected || !s.$selected.length) {
                    break
                }
                var r = s.$selected.data("contextMenu") || {};
                if (r.$menu && s.$selected.hasClass("context-menu-submenu")) {
                    s.$selected = null;
                    r.$selected = null;
                    r.$menu.trigger("nextcommand");
                    return
                }
                break;
            case 35:
            case 36:
                if (s.$selected && s.$selected.find("input, textarea, select").length) {
                    return
                } else { (s.$selected && s.$selected.parent() || s.$menu).children(":not(." + s.classNames.disabled + ", ." + s.classNames.notSelectable + ")")[u.keyCode === 36 ? "first": "last"]().trigger("contextmenu:focus");
                    u.preventDefault();
                    return
                }
                break;
            case 13:
                l.keyStop(u, s);
                if (s.isInput) {
                    if (s.$selected && !s.$selected.is("textarea, select")) {
                        u.preventDefault();
                        return
                    }
                    break
                }
                if (typeof s.$selected !== "undefined" && s.$selected !== null) {
                    s.$selected.trigger("mouseup")
                }
                return;
            case 32:
            case 33:
            case 34:
                l.keyStop(u, s);
                return;
            case 27:
                l.keyStop(u, s);
                s.$menu.trigger("contextmenu:hide");
                return;
            default:
                var q = (String.fromCharCode(u.keyCode)).toUpperCase();
                if (s.accesskeys && s.accesskeys[q]) {
                    s.accesskeys[q].$node.trigger(s.accesskeys[q].$menu ? "contextmenu:focus": "mouseup");
                    return
                }
                break
            }
            u.stopPropagation();
            if (typeof s.$selected !== "undefined" && s.$selected !== null) {
                s.$selected.trigger(u)
            }
        },
        prevItem: function(v) {
            v.stopPropagation();
            var u = j(this).data("contextMenu") || {};
            var r = j(this).data("contextMenuRoot") || {};
            if (u.$selected) {
                var q = u.$selected;
                u = u.$selected.parent().data("contextMenu") || {};
                u.$selected = q
            }
            var t = u.$menu.children(),
            s = !u.$selected || !u.$selected.prev().length ? t.last() : u.$selected.prev(),
            x = s;
            while (s.hasClass(r.classNames.disabled) || s.hasClass(r.classNames.notSelectable)) {
                if (s.prev().length) {
                    s = s.prev()
                } else {
                    s = t.last()
                }
                if (s.is(x)) {
                    return
                }
            }
            if (u.$selected) {
                l.itemMouseleave.call(u.$selected.get(0), v)
            }
            l.itemMouseenter.call(s.get(0), v);
            var w = s.find("input, textarea, select");
            if (w.length) {
                w.focus()
            }
        },
        nextItem: function(v) {
            v.stopPropagation();
            var u = j(this).data("contextMenu") || {};
            var s = j(this).data("contextMenuRoot") || {};
            if (u.$selected) {
                var q = u.$selected;
                u = u.$selected.parent().data("contextMenu") || {};
                u.$selected = q
            }
            var t = u.$menu.children(),
            r = !u.$selected || !u.$selected.next().length ? t.first() : u.$selected.next(),
            x = r;
            while (r.hasClass(s.classNames.disabled) || r.hasClass(s.classNames.notSelectable)) {
                if (r.next().length) {
                    r = r.next()
                } else {
                    r = t.first()
                }
                if (r.is(x)) {
                    return
                }
            }
            if (u.$selected) {
                l.itemMouseleave.call(u.$selected.get(0), v)
            }
            l.itemMouseenter.call(r.get(0), v);
            var w = r.find("input, textarea, select");
            if (w.length) {
                w.focus()
            }
        },
        focusInput: function() {
            var t = j(this).closest(".context-menu-item"),
            s = t.data(),
            r = s.contextMenu,
            q = s.contextMenuRoot;
            q.$selected = r.$selected = t;
            q.isInput = r.isInput = true
        },
        blurInput: function() {
            var t = j(this).closest(".context-menu-item"),
            s = t.data(),
            r = s.contextMenu,
            q = s.contextMenuRoot;
            q.isInput = r.isInput = false
        },
        menuMouseenter: function() {
            var q = j(this).data().contextMenuRoot;
            q.hovering = true
        },
        menuMouseleave: function(r) {
            var q = j(this).data().contextMenuRoot;
            if (q.$layer && q.$layer.is(r.relatedTarget)) {
                q.hovering = false
            }
        },
        itemMouseenter: function(u) {
            var t = j(this),
            s = t.data(),
            r = s.contextMenu,
            q = s.contextMenuRoot;
            q.hovering = true;
            if (u && q.$layer && q.$layer.is(u.relatedTarget)) {
                u.preventDefault();
                u.stopImmediatePropagation()
            } (r.$menu ? r: q).$menu.children(".hover").trigger("contextmenu:blur");
            if (t.hasClass(q.classNames.disabled) || t.hasClass(q.classNames.notSelectable)) {
                r.$selected = null;
                return
            }
            t.trigger("contextmenu:focus")
        },
        itemMouseleave: function(u) {
            var t = j(this),
            s = t.data(),
            r = s.contextMenu,
            q = s.contextMenuRoot;
            if (q !== r && q.$layer && q.$layer.is(u.relatedTarget)) {
                if (typeof q.$selected !== "undefined" && q.$selected !== null) {
                    q.$selected.trigger("contextmenu:blur")
                }
                u.preventDefault();
                u.stopImmediatePropagation();
                q.$selected = r.$selected = r.$node;
                return
            }
            t.trigger("contextmenu:blur")
        },
        itemClick: function(v) {
            var u = j(this),
            t = u.data(),
            s = t.contextMenu,
            q = t.contextMenuRoot,
            r = t.contextMenuKey,
            w;
            if (!s.items[r] || u.is("." + q.classNames.disabled + ", .context-menu-submenu, .context-menu-separator, ." + q.classNames.notSelectable)) {
                return
            }
            v.preventDefault();
            v.stopImmediatePropagation();
            if (j.isFunction(q.callbacks[r]) && Object.prototype.hasOwnProperty.call(q.callbacks, r)) {
                w = q.callbacks[r]
            } else {
                if (j.isFunction(q.callback)) {
                    w = q.callback
                } else {
                    return
                }
            }
            if (w.call(q.$trigger, r, q) !== false) {
                q.$menu.trigger("contextmenu:hide")
            } else {
                if (q.$menu.parent().length) {
                    k.update.call(q.$trigger, q)
                }
            }
        },
        inputClick: function(q) {
            q.stopImmediatePropagation()
        },
        hideMenu: function(s, r) {
            var q = j(this).data("contextMenuRoot");
            k.hide.call(q.$trigger, q, r && r.force)
        },
        focusItem: function(u) {
            u.stopPropagation();
            var t = j(this),
            s = t.data(),
            r = s.contextMenu,
            q = s.contextMenuRoot;
            t.addClass([q.classNames.hover, q.classNames.visible].join(" ")).siblings().removeClass(q.classNames.visible).filter(q.classNames.hover).trigger("contextmenu:blur");
            r.$selected = q.$selected = t;
            if (r.$node) {
                q.positionSubmenu.call(r.$node, r.$menu)
            }
        },
        blurItem: function(u) {
            u.stopPropagation();
            var t = j(this),
            s = t.data(),
            r = s.contextMenu,
            q = s.contextMenuRoot;
            if (r.autoHide) {
                t.removeClass(q.classNames.visible)
            }
            t.removeClass(q.classNames.hover);
            r.$selected = null
        }
    },
    k = {
        show: function(t, r, v) {
            var q = j(this),
            s = {};
            j("#context-menu-layer").trigger("mousedown");
            t.$trigger = q;
            if (t.events.show.call(q, t) === false) {
                h = null;
                return
            }
            k.update.call(q, t);
            t.position.call(q, t, r, v);
            if (t.zIndex) {
                var u = t.zIndex;
                if (typeof t.zIndex === "function") {
                    u = t.zIndex.call(q, t)
                }
                s.zIndex = p(q) + u
            }
            k.layer.call(t.$menu, t, s.zIndex);
            t.$menu.find("ul").css("zIndex", s.zIndex + 1);
            t.$menu.css(s)[t.animation.show](t.animation.duration,
            function() {
                q.trigger("contextmenu:visible")
            });
            q.data("contextMenu", t).addClass("context-menu-active");
            j(document).off("keydown.contextMenu").on("keydown.contextMenu", l.key);
            if (t.autoHide) {
                j(document).on("mousemove.contextMenuAutoHide",
                function(w) {
                    var x = q.offset();
                    x.right = x.left + q.outerWidth();
                    x.bottom = x.top + q.outerHeight();
                    if (t.$layer && !t.hovering && (!(w.pageX >= x.left && w.pageX <= x.right) || !(w.pageY >= x.top && w.pageY <= x.bottom))) {
                        t.$menu.trigger("contextmenu:hide")
                    }
                })
            }
        },
        hide: function(r, s) {
            var q = j(this);
            if (!r) {
                r = q.data("contextMenu") || {}
            }
            if (!s && r.events && r.events.hide.call(q, r) === false) {
                return
            }
            q.removeData("contextMenu").removeClass("context-menu-active");
            if (r.$layer) {
                setTimeout((function(u) {
                    return function() {
                        u.remove()
                    }
                })(r.$layer), 10);
                try {
                    delete r.$layer
                } catch(t) {
                    r.$layer = null
                }
            }
            h = null;
            r.$menu.find("." + r.classNames.hover).trigger("contextmenu:blur");
            r.$selected = null;
            j(document).off(".contextMenuAutoHide").off("keydown.contextMenu");
            r.$menu && r.$menu[r.animation.hide](r.animation.duration,
            function() {
                if (r.build) {
                    r.$menu.remove();
                    j.each(r,
                    function(u) {
                        switch (u) {
                        case "ns":
                        case "selector":
                        case "build":
                        case "trigger":
                            return true;
                        default:
                            r[u] = undefined;
                            try {
                                delete r[u]
                            } catch(v) {}
                            return true
                        }
                    })
                }
                setTimeout(function() {
                    q.trigger("contextmenu:hidden")
                },
                10)
            })
        },
        create: function(r, q) {
            if (q === undefined) {
                q = r
            }
            r.$menu = j('<ul class="context-menu-list"></ul>').addClass(r.className || "").data({
                contextMenu: r,
                contextMenuRoot: q
            });
            j.each(["callbacks", "commands", "inputs"],
            function(u, t) {
                r[t] = {};
                if (!q[t]) {
                    q[t] = {}
                }
            });
            q.accesskeys || (q.accesskeys = {});
            function s(t) {
                var u = j("<span></span>");
                if (t._accesskey) {
                    if (t._beforeAccesskey) {
                        u.append(document.createTextNode(t._beforeAccesskey))
                    }
                    j("<span></span>").addClass("context-menu-accesskey").text(t._accesskey).appendTo(u);
                    if (t._afterAccesskey) {
                        u.append(document.createTextNode(t._afterAccesskey))
                    }
                } else {
                    u.text(t.name)
                }
                return u
            }
            j.each(r.items,
            function(A, B) {
                var u = j('<li class="context-menu-item"></li>').addClass(B.className || ""),
                y = null,
                x = null;
                u.on("click", j.noop);
                if (typeof B === "string") {
                    B = {
                        type: "cm_seperator"
                    }
                }
                B.$node = u.data({
                    contextMenu: r,
                    contextMenuRoot: q,
                    contextMenuKey: A
                });
                if (typeof B.accesskey !== "undefined") {
                    var z = c(B.accesskey);
                    for (var v = 0,
                    w; w = z[v]; v++) {
                        if (!q.accesskeys[w]) {
                            q.accesskeys[w] = B;
                            var t = B.name.match(new RegExp("^(.*?)(" + w + ")(.*)$", "i"));
                            if (t) {
                                B._beforeAccesskey = t[1];
                                B._accesskey = t[2];
                                B._afterAccesskey = t[3]
                            }
                            break
                        }
                    }
                }
                if (B.type && m[B.type]) {
                    m[B.type].call(u, B, r, q);
                    j.each([r, q],
                    function(D, C) {
                        C.commands[A] = B;
                        if (j.isFunction(B.callback)) {
                            C.callbacks[A] = B.callback
                        }
                    })
                } else {
                    if (B.type === "cm_seperator") {
                        u.addClass("context-menu-separator " + q.classNames.notSelectable)
                    } else {
                        if (B.type === "html") {
                            u.addClass("context-menu-html " + q.classNames.notSelectable)
                        } else {
                            if (B.type) {
                                y = j("<label></label>").appendTo(u);
                                s(B).appendTo(y);
                                u.addClass("context-menu-input");
                                r.hasTypes = true;
                                j.each([r, q],
                                function(D, C) {
                                    C.commands[A] = B;
                                    C.inputs[A] = B
                                })
                            } else {
                                if (B.items) {
                                    B.type = "sub"
                                }
                            }
                        }
                    }
                    switch (B.type) {
                    case "cm_seperator":
                        break;
                    case "text":
                        x = j('<input type="text" value="1" name="" value="">').attr("name", "context-menu-input-" + A).val(B.value || "").appendTo(y);
                        break;
                    case "textarea":
                        x = j('<textarea name=""></textarea>').attr("name", "context-menu-input-" + A).val(B.value || "").appendTo(y);
                        if (B.height) {
                            x.height(B.height)
                        }
                        break;
                    case "checkbox":
                        x = j('<input type="checkbox" value="1" name="" value="">').attr("name", "context-menu-input-" + A).val(B.value || "").prop("checked", !!B.selected).prependTo(y);
                        break;
                    case "radio":
                        x = j('<input type="radio" value="1" name="" value="">').attr("name", "context-menu-input-" + B.radio).val(B.value || "").prop("checked", !!B.selected).prependTo(y);
                        break;
                    case "select":
                        x = j('<select name="">').attr("name", "context-menu-input-" + A).appendTo(y);
                        if (B.options) {
                            j.each(B.options,
                            function(C, D) {
                                j("<option></option>").val(C).text(D).appendTo(x)
                            });
                            x.val(B.selected)
                        }
                        break;
                    case "sub":
                        s(B).appendTo(u);
                        B.appendTo = B.$node;
                        k.create(B, q);
                        u.data("contextMenu", B).addClass("context-menu-submenu");
                        B.callback = null;
                        break;
                    case "html":
                        j(B.html).appendTo(u);
                        break;
                    default:
                        j.each([r, q],
                        function(D, C) {
                            C.commands[A] = B;
                            if (j.isFunction(B.callback)) {
                                C.callbacks[A] = B.callback
                            }
                        });
                        if (B.usehtml) {
                            j(B.html).appendTo(u)
                        } else {
                            s(B).appendTo(u)
                        }
                        break
                    }
                    if (B.type && B.type !== "sub" && B.type !== "html" && B.type !== "cm_seperator") {
                        x.on("focus", l.focusInput).on("blur", l.blurInput);
                        if (B.events) {
                            x.on(B.events, r)
                        }
                    }
                    if (B.icon) {
                        if (j.isFunction(B.icon)) {
                            B._icon = B.icon.call(this, this, u, A, B)
                        } else {
                            B._icon = q.classNames.icon + "-" + B.icon
                        }
                        u.addClass(B._icon)
                    }
                }
                B.$input = x;
                B.$label = y;
                u.appendTo(r.$menu);
                if (!r.hasTypes && j.support.eventSelectstart) {
                    u.on("selectstart.disableTextSelect", l.abortevent)
                }
            });
            if (!r.$node) {
                r.$menu.css("display", "none").addClass("context-menu-root")
            }
            r.$menu.appendTo(r.appendTo || document.body)
        },
        resize: function(q, r) {
            q.css({
                position: "absolute",
                display: "block"
            });
            q.data("width", Math.ceil(q.outerWidth()));
            q.css({
                position: "static",
                minWidth: "0px",
                maxWidth: "100000px"
            });
            q.find("> li > ul").each(function() {
                k.resize(j(this), true)
            });
            if (!r) {
                q.find("ul").addBack().css({
                    position: "",
                    display: "",
                    minWidth: "",
                    maxWidth: ""
                }).width(function() {
                    return j(this).data("width")
                })
            }
        },
        update: function(s, r) {
            var q = this;
            if (r === undefined) {
                r = s;
                k.resize(s.$menu)
            }
            s.$menu.children().each(function() {
                var t = j(this),
                u = t.data("contextMenuKey"),
                w = s.items[u],
                v = (j.isFunction(w.disabled) && w.disabled.call(q, u, r)) || w.disabled === true,
                x;
                if (j.isFunction(w.visible)) {
                    x = w.visible.call(q, u, r)
                } else {
                    if (typeof w.visible !== "undefined") {
                        x = w.visible === true
                    } else {
                        x = true
                    }
                }
                t[x ? "show": "hide"]();
                t[v ? "addClass": "removeClass"](r.classNames.disabled);
                if (j.isFunction(w.icon)) {
                    t.removeClass(w._icon);
                    w._icon = w.icon.call(this, q, t, u, w);
                    t.addClass(w._icon)
                }
                if (w.type) {
                    t.find("input, select, textarea").prop("disabled", v);
                    switch (w.type) {
                    case "text":
                    case "textarea":
                        w.$input.val(w.value || "");
                        break;
                    case "checkbox":
                    case "radio":
                        w.$input.val(w.value || "").prop("checked", !!w.selected);
                        break;
                    case "select":
                        w.$input.val(w.selected || "");
                        break
                    }
                }
                if (w.$menu) {
                    k.update.call(q, w, r)
                }
            })
        },
        layer: function(r, s) {
            var q = r.$layer = j('<div id="context-menu-layer" style="position:fixed; z-index:' + s + '; top:0; left:0; opacity: 0; filter: alpha(opacity=0); background-color: #000;visibility:hidden;"></div>').css({
                height: d.height(),
                width: d.width(),
                display: "block"
            }).data("contextMenuRoot", r).insertBefore(this).css("visibility", "visible").on("contextmenu", l.abortevent).on("mousedown", l.layerClick);
            if (document.body.style.maxWidth === undefined) {
                q.css({
                    position: "absolute",
                    height: j(document).height()
                })
            }
            return q
        }
    };
    function c(v) {
        var s = v.split(/\s+/),
        u = [];
        for (var r = 0,
        q; q = s[r]; r++) {
            q = q.charAt(0).toUpperCase();
            u.push(q)
        }
        return u
    }
    j.fn.contextMenu = function(q) {
        var t = this,
        r = q;
        if (this.length > 0) {
            if (q === undefined) {
                this.first().trigger("contextmenu")
            } else {
                if (q.x !== undefined && q.y !== undefined) {
                    this.first().trigger(j.Event("contextmenu", {
                        pageX: q.x,
                        pageY: q.y,
                        mouseButton: q.button
                    }))
                } else {
                    if (q === "hide") {
                        var s = this.first().data("contextMenu") ? this.first().data("contextMenu").$menu: null;
                        s && s.trigger("contextmenu:hide")
                    } else {
                        if (q === "destroy") {
                            j.contextMenu("destroy", {
                                context: this
                            })
                        } else {
                            if (j.isPlainObject(q)) {
                                q.context = this;
                                j.contextMenu("create", q)
                            } else {
                                if (q) {
                                    this.removeClass("context-menu-disabled")
                                } else {
                                    if (!q) {
                                        this.addClass("context-menu-disabled")
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            j.each(i,
            function() {
                if (this.selector === t.selector) {
                    r.data = this;
                    j.extend(r.data, {
                        trigger: "demand"
                    })
                }
            });
            l.contextmenu.call(r.target, r)
        }
        return this
    };
    j.contextMenu = function(u, y) {
        if (typeof u !== "string") {
            y = u;
            u = "create"
        }
        if (typeof y === "string") {
            y = {
                selector: y
            }
        } else {
            if (y === undefined) {
                y = {}
            }
        }
        var s = j.extend(true, {},
        g, y || {});
        var t = j(document);
        var w = t;
        var x = false;
        if (!s.context || !s.context.length) {
            s.context = document
        } else {
            w = j(s.context).first();
            s.context = w.get(0);
            x = s.context !== document
        }
        switch (u) {
        case "create":
            if (!s.selector) {
                throw new Error("No selector specified")
            }
            if (s.selector.match(/.context-menu-(list|item|input)($|\s)/)) {
                throw new Error('Cannot bind to selector "' + s.selector + '" as it contains a reserved className')
            }
            if (!s.build && (!s.items || j.isEmptyObject(s.items))) {
                throw new Error("No Items specified")
            }
            a++;
            s.ns = ".contextMenu" + a;
            if (!x) {
                b[s.selector] = s.ns
            }
            i[s.ns] = s;
            if (!s.trigger) {
                s.trigger = "right"
            }
            if (!f) {
                t.on({
                    "contextmenu:hide.contextMenu": l.hideMenu,
                    "prevcommand.contextMenu": l.prevItem,
                    "nextcommand.contextMenu": l.nextItem,
                    "contextmenu.contextMenu": l.abortevent,
                    "mouseenter.contextMenu": l.menuMouseenter,
                    "mouseleave.contextMenu": l.menuMouseleave
                },
                ".context-menu-list").on("mouseup.contextMenu", ".context-menu-input", l.inputClick).on({
                    "mouseup.contextMenu": l.itemClick,
                    "contextmenu:focus.contextMenu": l.focusItem,
                    "contextmenu:blur.contextMenu": l.blurItem,
                    "contextmenu.contextMenu": l.abortevent,
                    "mouseenter.contextMenu": l.itemMouseenter,
                    "mouseleave.contextMenu": l.itemMouseleave
                },
                ".context-menu-item");
                f = true
            }
            w.on("contextmenu" + s.ns, s.selector, s, l.contextmenu);
            if (x) {
                w.on("remove" + s.ns,
                function() {
                    j(this).contextMenu("destroy")
                })
            }
            switch (s.trigger) {
            case "hover":
                w.on("mouseenter" + s.ns, s.selector, s, l.mouseenter).on("mouseleave" + s.ns, s.selector, s, l.mouseleave);
                break;
            case "left":
                w.on("click" + s.ns, s.selector, s, l.click);
                break
            }
            if (!s.build) {
                k.create(s)
            }
            break;
        case "destroy":
            var q;
            if (x) {
                var r = s.context;
                j.each(i,
                function(z, B) {
                    if (B.context !== r) {
                        return true
                    }
                    q = j(".context-menu-list").filter(":visible");
                    if (q.length && q.data().contextMenuRoot.$trigger.is(j(B.context).find(B.selector))) {
                        q.trigger("contextmenu:hide", {
                            force: true
                        })
                    }
                    try {
                        if (i[B.ns].$menu) {
                            i[B.ns].$menu.remove()
                        }
                        delete i[B.ns]
                    } catch(A) {
                        i[B.ns] = null
                    }
                    j(B.context).off(B.ns);
                    return true
                })
            } else {
                if (!s.selector) {
                    t.off(".contextMenu .contextMenuAutoHide");
                    j.each(i,
                    function(z, A) {
                        j(A.context).off(A.ns)
                    });
                    b = {};
                    i = {};
                    a = 0;
                    f = false;
                    j("#context-menu-layer, .context-menu-list").remove()
                } else {
                    if (b[s.selector]) {
                        q = j(".context-menu-list").filter(":visible");
                        if (q.length && q.data().contextMenuRoot.$trigger.is(s.selector)) {
                            q.trigger("contextmenu:hide", {
                                force: true
                            })
                        }
                        try {
                            if (i[b[s.selector]].$menu) {
                                i[b[s.selector]].$menu.remove()
                            }
                            delete i[b[s.selector]]
                        } catch(v) {
                            i[b[s.selector]] = null
                        }
                        t.off(b[s.selector])
                    }
                }
            }
            break;
        case "html5":
            if ((!j.support.htmlCommand && !j.support.htmlMenuitem) || (typeof y === "boolean" && y)) {
                j('menu[type="context"]').each(function() {
                    if (this.id) {
                        j.contextMenu({
                            selector: "[contextmenu=" + this.id + "]",
                            items: j.contextMenu.fromMenu(this)
                        })
                    }
                }).css("display", "none")
            }
            break;
        default:
            throw new Error('Unknown operation "' + u + '"')
        }
        return this
    };
    j.contextMenu.setInputValues = function(q, r) {
        if (r === undefined) {
            r = {}
        }
        j.each(q.inputs,
        function(s, t) {
            switch (t.type) {
            case "text":
            case "textarea":
                t.value = r[s] || "";
                break;
            case "checkbox":
                t.selected = r[s] ? true: false;
                break;
            case "radio":
                t.selected = (r[t.radio] || "") === t.value;
                break;
            case "select":
                t.selected = r[s] || "";
                break
            }
        })
    };
    j.contextMenu.getInputValues = function(q, r) {
        if (r === undefined) {
            r = {}
        }
        j.each(q.inputs,
        function(s, t) {
            switch (t.type) {
            case "text":
            case "textarea":
            case "select":
                r[s] = t.$input.val();
                break;
            case "checkbox":
                r[s] = t.$input.prop("checked");
                break;
            case "radio":
                if (t.$input.prop("checked")) {
                    r[t.radio] = t.value
                }
                break
            }
        });
        return r
    };
    function e(q) {
        return (q.id && j('label[for="' + q.id + '"]').val()) || q.name
    }
    function o(s, r, q) {
        if (!q) {
            q = 0
        }
        r.each(function() {
            var t = j(this),
            w = this,
            x = this.nodeName.toLowerCase(),
            u,
            v;
            if (x === "label" && t.find("input, textarea, select").length) {
                u = t.text();
                t = t.children().first();
                w = t.get(0);
                x = w.nodeName.toLowerCase()
            }
            switch (x) {
            case "menu":
                v = {
                    name: t.attr("label"),
                    items: {}
                };
                q = o(v.items, t.children(), q);
                break;
            case "a":
            case "button":
                v = {
                    name: t.text(),
                    disabled: !!t.attr("disabled"),
                    callback: (function() {
                        return function() {
                            t.click()
                        }
                    })()
                };
                break;
            case "menuitem":
            case "command":
                switch (t.attr("type")) {
                case undefined:
                case "command":
                case "menuitem":
                    v = {
                        name: t.attr("label"),
                        disabled: !!t.attr("disabled"),
                        icon: t.attr("icon"),
                        callback: (function() {
                            return function() {
                                t.click()
                            }
                        })()
                    };
                    break;
                case "checkbox":
                    v = {
                        type: "checkbox",
                        disabled: !!t.attr("disabled"),
                        name: t.attr("label"),
                        selected: !!t.attr("checked")
                    };
                    break;
                case "radio":
                    v = {
                        type: "radio",
                        disabled: !!t.attr("disabled"),
                        name: t.attr("label"),
                        radio: t.attr("radiogroup"),
                        value: t.attr("id"),
                        selected: !!t.attr("checked")
                    };
                    break;
                default:
                    v = undefined
                }
                break;
            case "hr":
                v = "-------";
                break;
            case "input":
                switch (t.attr("type")) {
                case "text":
                    v = {
                        type: "text",
                        name: u || e(w),
                        disabled: !!t.attr("disabled"),
                        value: t.val()
                    };
                    break;
                case "checkbox":
                    v = {
                        type: "checkbox",
                        name: u || e(w),
                        disabled: !!t.attr("disabled"),
                        selected: !!t.attr("checked")
                    };
                    break;
                case "radio":
                    v = {
                        type: "radio",
                        name: u || e(w),
                        disabled: !!t.attr("disabled"),
                        radio: !!t.attr("name"),
                        value: t.val(),
                        selected: !!t.attr("checked")
                    };
                    break;
                default:
                    v = undefined;
                    break
                }
                break;
            case "select":
                v = {
                    type: "select",
                    name: u || e(w),
                    disabled: !!t.attr("disabled"),
                    selected: t.val(),
                    options: {}
                };
                t.children().each(function() {
                    v.options[this.value] = j(this).text()
                });
                break;
            case "textarea":
                v = {
                    type: "textarea",
                    name: u || e(w),
                    disabled: !!t.attr("disabled"),
                    value: t.val()
                };
                break;
            case "label":
                break;
            default:
                v = {
                    type: "html",
                    html: t.clone(true)
                };
                break
            }
            if (v) {
                q++;
                s["key" + q] = v
            }
        });
        return q
    }
    j.contextMenu.fromMenu = function(r) {
        var s = j(r),
        q = {};
        o(q, s.children());
        return q
    };
    j.contextMenu.defaults = g;
    j.contextMenu.types = m;
    j.contextMenu.handle = l;
    j.contextMenu.op = k;
    j.contextMenu.menus = i
});