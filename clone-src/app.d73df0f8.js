(function(t) {
    function s(s) {
        for (var a, r, c = s[0], n = s[1], u = s[2], d = 0, h = []; d < c.length; d++) r = c[d], Object.prototype.hasOwnProperty.call(i, r) && i[r] && h.push(i[r][0]), i[r] = 0;
        for (a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
        o && o(s);
        while (h.length) h.shift()();
        return l.push.apply(l, u || []), e()
    }

    function e() {
        for (var t, s = 0; s < l.length; s++) {
            for (var e = l[s], a = !0, c = 1; c < e.length; c++) {
                var n = e[c];
                0 !== i[n] && (a = !1)
            }
            a && (l.splice(s--, 1), t = r(r.s = e[0]))
        }
        return t
    }
    var a = {},
        i = {
            app: 0
        },
        l = [];

    function r(s) {
        if (a[s]) return a[s].exports;
        var e = a[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return t[s].call(e.exports, e, e.exports, r), e.l = !0, e.exports
    }
    r.m = t, r.c = a, r.d = function(t, s, e) {
        r.o(t, s) || Object.defineProperty(t, s, {
            enumerable: !0,
            get: e
        })
    }, r.r = function(t) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function(t, s) {
        if (1 & s && (t = r(t)), 8 & s) return t;
        if (4 & s && "object" === typeof t && t && t.__esModule) return t;
        var e = Object.create(null);
        if (r.r(e), Object.defineProperty(e, "default", {
                enumerable: !0,
                value: t
            }), 2 & s && "string" != typeof t)
            for (var a in t) r.d(e, a, function(s) {
                return t[s]
            }.bind(null, a));
        return e
    }, r.n = function(t) {
        var s = t && t.__esModule ? function() {
            return t["default"]
        } : function() {
            return t
        };
        return r.d(s, "a", s), s
    }, r.o = function(t, s) {
        return Object.prototype.hasOwnProperty.call(t, s)
    }, r.p = "/";
    var c = window["webpackJsonp"] = window["webpackJsonp"] || [],
        n = c.push.bind(c);
    c.push = s, c = c.slice();
    for (var u = 0; u < c.length; u++) s(c[u]);
    var o = n;
    l.push([0, "chunk-vendors"]), e()
})({
    0: function(t, s, e) {
        t.exports = e("56d7")
    },
    2146: function(t, s, e) {
        "use strict";
        var a = e("b92c"),
            i = e.n(a);
        i.a
    },
    "36ab": function(t, s, e) {},
    "3c61": function(t, s, e) {},
    "3d20": function(t, s, e) {},
    "4d87": function(t, s, e) {
        t.exports = e.p + "img/logo.ed37d024.svg"
    },
    "50fd": function(t, s, e) {
        "use strict";
        var a = e("c599"),
            i = e.n(a);
        i.a
    },
    "56d7": function(t, s, e) {
        "use strict";
        e.r(s);
        var a = e("2b0e"),
            i = function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    class: t.theme
                }, [e("div", {
                    staticClass: "container-fluid bg"
                }, [e("div", {
                    staticClass: "row notify"
                }, [t._m(0), e("div", {
                    staticClass: "col-4 text-right"
                }, [e("a", {
                    staticClass: "text-warning",
                    attrs: {
                        href: ""
                    },
                    on: {
                        click: function(s) {
                            return s.preventDefault(), t.goto("/game/" + t.$route.params.id)
                        }
                    }
                }, [t._v("Đánh đề")]), t._v(" | "), e("a", {
                    staticClass: "text-warning",
                    attrs: {
                        href: ""
                    },
                    on: {
                        click: function(s) {
                            return s.preventDefault(), t.goto("/history/" + t.$route.params.id)
                        }
                    }
                }, [t._v("Sao kê")]), t._v(" | "), e("a", {
                    staticClass: "text-warning",
                    attrs: {
                        href: ""
                    },
                    on: {
                        click: function(s) {
                            return s.preventDefault(), t.goto("/result/" + t.$route.params.id)
                        }
                    }
                }, [t._v("Kết quả")])])])]), e("div", {
                    staticClass: "container-fluid"
                }, [e("router-view")], 1), e("app-modal")], 1)
            },
            l = [function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "col-8"
                }, [e("i", {
                    staticClass: "fas fa-bullhorn text-warning"
                }), t._v("Cơ hội chiến thắng chưa bao giờ dễ dàng như vậy. Cược ngay con số may mắn và có ngay kết quả sau vài phút.")])
            }],
            r = {
                data() {
                    return {
                        theme: "theme-blue"
                    }
                },
                mounted() {
                    this.theme = this.$route.query.style ? "theme-" + this.$route.query.style : "theme-blue"
                }
            },
            c = r,
            n = e("2877"),
            u = Object(n["a"])(c, i, l, !1, null, null, null),
            o = u.exports,
            d = e("8c4f"),
            h = function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "ld-container"
                }, [e("Left"), e("Center"), e("Right")], 1)
            },
            v = [],
            m = function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "ld-left"
                }, [e("div", {
                    staticClass: "user-area"
                }, [e("div", {
                    staticClass: "media"
                }, [t._m(0), t.user ? e("div", {
                    staticClass: "media-body"
                }, [e("h5", {
                    staticClass: "mt-0 username"
                }, [t._v(t._s(t.user.fullname))]), e("p", {
                    staticClass: "balance"
                }, [t._v(t._s(t.user.balance.toKVD()) + " K")])]) : e("div", {
                    staticClass: "media-body"
                }, [e("h5", {
                    staticClass: "mt-3 username"
                }, [t._v("Khách")])])])]), e("div", {
                    staticClass: "left-tab"
                }, [e("div", {
                    staticClass: "tab-head"
                }, [e("a", {
                    class: 1 == t.tab ? "active" : "",
                    attrs: {
                        href: ""
                    },
                    on: {
                        click: function(s) {
                            s.preventDefault(), t.tab = 1
                        }
                    }
                }, [t._v("BIÊN ĐỀ")]), e("a", {
                    class: 2 == t.tab ? "active" : "",
                    attrs: {
                        href: ""
                    },
                    on: {
                        click: function(s) {
                            s.preventDefault(), t.tab = 2
                        }
                    }
                }, [t._v("BẢNG CƯỢC")])]), e("div", {
                    staticClass: "tab-content"
                }, [1 == t.tab && 0 == t.selectedNum.length ? e("div", {
                    staticClass: "msg"
                }, [t._m(1)]) : t._e(), 1 == t.tab && t.selectedNum.length ? e("div", {
                    staticClass: "biende"
                }, [e("div", {
                    staticClass: "bd-items"
                }, [e("div", {
                    staticClass: "biende-group"
                }, [e("div", {
                    staticClass: "bd-head"
                }, [t._v(t._s(t.cate.name) + " @" + t._s(t.cate.rate))]), e("ul", {
                    staticClass: "bd-content"
                }, [e("li", t._l(t.selectedNum, (function(s, a) {
                    return e("span", {
                        key: a,
                        staticClass: "num"
                    }, [t._v(t._s(s))])
                })), 0)]), e("div", {
                    staticClass: "bd-foot"
                }, [e("div", {
                    staticClass: "igroup"
                }, [e("span", [t._v("Số tiền 1 con (k)")]), e("vue-numeric", {
                    attrs: {
                        currency: "",
                        separator: ",",
                        min: 1,
                        minus: !1,
                        precision: 2
                    },
                    on: {
                        focus: function(s) {
                            t.focus = 1
                        },
                        blur: function(s) {
                            t.focus = 0
                        }
                    },
                    model: {
                        value: t.one,
                        callback: function(s) {
                            t.one = s
                        },
                        expression: "one"
                    }
                })], 1), e("div", {
                    staticClass: "igroup",
                    staticStyle: {
                        "margin-top": "10px"
                    }
                }, [e("span", [t._v("Tổng tiền cược (k)")]), e("vue-numeric", {
                    attrs: {
                        currency: "",
                        separator: ",",
                        min: 1,
                        minus: !1,
                        precision: 2
                    },
                    on: {
                        focus: function(s) {
                            t.focus = 2
                        },
                        blur: function(s) {
                            t.focus = 0
                        }
                    },
                    model: {
                        value: t.amount,
                        callback: function(s) {
                            t.amount = s
                        },
                        expression: "amount"
                    }
                })], 1)])])]), e("div", {
                    staticClass: "biende-foot"
                }, [e("span", [t._v("TIỀN THẮNG 1 CON (K): ")]), e("span", {
                    staticClass: "cur"
                }, [t._v(t._s((t.one * t.cate.rate).curency()))]), e("div", {
                    staticClass: "btn-group"
                }, [e("button", {
                    staticClass: "btn btn-huy",
                    on: {
                        click: function(s) {
                            return t.cancel()
                        }
                    }
                }, [t._v("HỦY")]), e("button", {
                    staticClass: "btn btn-submit",
                    on: {
                        click: function(s) {
                            return t.submit()
                        }
                    }
                }, [t._v("XÁC NHẬN")])])])]) : t._e(), 2 != t.tab || t.bettable && 0 != t.bettable.length ? t._e() : e("div", {
                    staticClass: "msg"
                }, [t._m(2)]), 2 == t.tab && t.bettable && t.bettable.length ? e("div", {
                    staticClass: "bangcuoc"
                }, [e("div", {
                    staticClass: "bd-items"
                }, t._l(t.bettable, (function(s, a) {
                    return e("div", {
                        key: a,
                        staticClass: "biende-group"
                    }, [e("div", {
                        staticClass: "bd-head"
                    }, [t._v(t._s(s.cate_name) + " @" + t._s(s.rate))]), e("div", {
                        staticClass: "bd-content"
                    }, [e("div", {
                        staticClass: "line"
                    }, t._l(s.numbers, (function(s, a) {
                        return e("span", {
                            key: a,
                            staticClass: "num"
                        }, [t._v(t._s(s))])
                    })), 0), e("div", {
                        staticClass: "line"
                    }, [e("div", {
                        staticClass: "line2"
                    }, [t._v("\n                  Tiền cược (K):"), e("span", [t._v(t._s(s.amount.toKVD()))])])])]), e("div", {
                        staticClass: "bd-foot"
                    }, [e("div", {
                        staticClass: "time"
                    }, [t._v("\n                Thời gian: "), e("span", [t._v(t._s(s.created_at))])]), e("div", {
                        staticClass: "time"
                    }, [t._v("\n                Lượt sổ: "), e("span", [t._v(t._s(s.times))])])])])
                })), 0)]) : t._e()])]), t.waiting ? e("div", {
                    staticClass: "waiting"
                }, [e("i", {
                    staticClass: "fas fa-spin fa-spinner"
                })]) : t._e()])
            },
            p = [function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "avatar align-self-start mr-3"
                }, [e("i", {
                    staticClass: "fas fa-user-circle"
                })])
            }, function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "msg-head"
                }, [t._v("\n          Bạn chưa có cược nào!\n          "), e("div", {
                    staticClass: "text-danger f14"
                }, [t._v("Hãy chọn 1 số để tạo cược.")])])
            }, function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "msg-head"
                }, [t._v("\n          Bạn chưa có cược nào!\n          "), e("div", {
                    staticClass: "text-danger f14"
                }, [t._v("Hãy chọn 1 số để tạo cược.")])])
            }],
            _ = e("d85e"),
            g = e.n(_);
        const C = "RESULT_GET",
            b = "RESULT_SUCCESS",
            f = "SESSION_SUCCESS",
            y = "DATE_BET_GET",
            w = "DATE_BET_SUCCESS",
            x = "ANALY_GET",
            S = "ANALY_SUCCESS",
            k = "USER_SUCCESS",
            $ = "USER_GET",
            z = "TIME_GET",
            N = "BETTABLE_GET",
            T = "BETTABLE_SUCCESS";
        var P = {
                components: {
                    VueNumeric: g.a
                },
                data() {
                    return {
                        tab: 1,
                        countNum: 0,
                        one: 1,
                        amount: 0,
                        ferror: {},
                        waiting: !1
                    }
                },
                methods: {
                    changeOne(t) {
                        this.cacl(t, null)
                    },
                    changeAmount(t) {
                        console.log("change amount"), this.cacl(null, t)
                    },
                    input_one() {
                        this.cacl(this.one, null)
                    },
                    input_amount() {
                        this.cacl(null, this.amount)
                    },
                    cacl(t, s) {
                        if (t *= 1, s *= 1, this.ferror.one = !1, this.ferror.amount = !1, t < 1 && !s) return this.ferror.one = !0, this.one = 0;
                        if (!this.selectedNum.length) return this.amount = 0, this.win = 0;
                        if (s || t) {
                            if (s && !t ? this.cate.multi && this.selectedNum.length > 1 ? this.one = (s / this.cate.pay_number / this.selectedNum.length).toFixed(2) : this.one = (s / this.cate.pay_number).toFixed(2) : this.cate.multi && this.selectedNum.length > 1 ? this.amount = (this.one * this.cate.pay_number * this.selectedNum.length).toFixed(2) : this.amount = (this.one * this.cate.pay_number).toFixed(2), this.amount > this.cate.max_amount) return this.ferror.amount = !0;
                            if (this.ferror.one = !1, this.win = this.one * this.cate.rate, this.one < 1) return this.ferror.one = !0;
                            this.win || (this.win = this.cate.rate)
                        }
                    },
                    cancel() {
                        this.selectedNum = [], this.one = 1, this.amount = 0, this.win = 0
                    },
                    submit() {
                        if (this.lockbet || this.waiting) return;
                        if (this.selectedNum.length <= 0 && (this.ferror.number = !0), this.cate.max_number && this.selectedNum.length != this.cate.max_number) return alert("Bạn chỉ được chọn " + this.cate.max_number + " số đánh");
                        if (this.one && this.amount || (this.ferror.one = !0), this.one < 1) return this.ferror.one = !0;
                        if (this.ferror.one || this.ferror.number) return;
                        if (!this.$route.query.token) return this.$modal.show("Bạn cần đăng nhập để đánh đề");
                        if ("loxien" == this.cate.type && this.selectedNum.length != this.cate.max_number) return this.$modal.show("Bạn phải chọn " + this.cate.max_number + " số");
                        let t = {
                            amount: this.amount,
                            category_id: this.cate.id,
                            numbers: this.selectedNum,
                            amount_one: this.one,
                            times: this.session.next,
                            token: this.$route.query.token
                        };
                        this.waiting = !0, this.$store.dispatch("submitOrder", t).then(t => (this.$store.dispatch(N, {
                            token: this.$route.query.token
                        }), this.waiting = !1, this.$modal.show(t.msg), this.tab = 2, this.cancel())).catch(t => {
                            this.waiting = !1, t.response.data.msg ? this.$modal.show(t.response.data.msg) : this.$modal.show("Có lỗi xảy ra, vui lòng thử lại sau")
                        })
                    }
                },
                mounted() {
                    this.$store.dispatch(N, {
                        token: this.$route.query.token
                    })
                },
                watch: {
                    one: function(t, s) {
                        1 == this.focus && (clearInterval(this.t1), this.t1 = setInterval(() => {
                            clearInterval(this.t1), this.cacl(t, null)
                        }, 400))
                    },
                    amount: function(t, s) {
                        2 == this.focus && (clearInterval(this.t2), this.t2 = setInterval(() => {
                            clearInterval(this.t2), this.cacl(null, t)
                        }, 400))
                    },
                    selectedNum: function(t, s) {
                        t.length && (this.ferror.number = !1, this.tab = 1), t.length && this.cacl(this.one, null)
                    }
                },
                computed: {
                    selectedNum: {
                        get() {
                            return this.$store.getters.getSelectedNum
                        },
                        set(t) {
                            this.$store.dispatch("dpcSelectedNum", t)
                        }
                    },
                    cate() {
                        return this.$store.getters.getSelectedCate
                    },
                    session() {
                        return this.$store.getters.getSession
                    },
                    lockbet() {
                        return this.$store.getters.getLockBet
                    },
                    bettable() {
                        return this.$store.getters.getBettable
                    },
                    user() {
                        return this.$store.getters.getUser
                    }
                }
            },
            E = P,
            L = (e("2146"), Object(n["a"])(E, m, p, !1, null, "08c3a6a7", null)),
            O = L.exports,
            G = function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "ld-center",
                    style: t.$config.hideRight ? {
                        right: "0px"
                    } : {}
                }, [e("Header"), e("div", {
                    staticClass: "cattab"
                }, [e("div", {
                    staticClass: "cattab-head"
                }, t._l(t.categories, (function(s, a) {
                    return e("div", {
                        key: a,
                        staticClass: "cattab-items"
                    }, [e("a", {
                        class: t.category.type == s.type ? "active" : "",
                        on: {
                            click: function(s) {
                                return s.preventDefault(), t.setCate(a)
                            }
                        }
                    }, [t._v(t._s(s.name))])])
                })), 0), e("div", {
                    staticClass: "cattab-content"
                }, [e("div", {
                    staticClass: "subcat"
                }, t._l(t.category.children, (function(s, a) {
                    return e("div", {
                        key: a,
                        staticClass: "subcat-item"
                    }, [e("a", {
                        class: s.id == t.subCate.id ? "active" : "",
                        on: {
                            click: function(e) {
                                return e.preventDefault(), t.setSubCate(s)
                            }
                        }
                    }, [t._v(t._s(s.name))])])
                })), 0), e("div", {
                    staticClass: "subcat-content"
                }, [e("div", {
                    staticClass: "padhead"
                }, [e("div", {
                    staticStyle: {
                        display: "flex",
                        "flex-grow": "1"
                    }
                }, [e("div", {
                    staticClass: "inputs-group",
                    class: t.iError ? "error" : ""
                }, [e("label", {
                    attrs: {
                        for: ""
                    }
                }, [t._v("Nhập số")]), e("input", {
                    attrs: {
                        type: "tel",
                        placeholder: "Ví dụ: 8383237"
                    },
                    domProps: {
                        value: t.iText
                    },
                    on: {
                        keypress: function(s) {
                            return t.typeNum(s)
                        },
                        keyup: function(s) {
                            return t.typeNum(s)
                        }
                    }
                }), e("button", {
                    staticClass: "btn",
                    on: {
                        click: function(s) {
                            return t.iEnter()
                        }
                    }
                }, [t._v("Xác nhận")])]), t._m(0)]), e("div", {
                    staticClass: "guide"
                }, [e("button", {
                    staticClass: "btn"
                }, [e("i", {
                    staticClass: "fas fa-question-circle"
                }), t._v(" Luật chơi\n              "), e("div", {
                    staticClass: "guide-c"
                }, [t.category && t.subCate ? e("div", {
                    staticClass: "guide-des"
                }, [e("h6", {
                    staticClass: "guide-t"
                }, [t._v("\n                    Cược " + t._s(t.subCate.name) + " -\n                    "), e("span", [t._v("1 ăn " + t._s(t.subCate.rate))])]), e("p", {
                    domProps: {
                        innerHTML: t._s(t.subCate.guide)
                    }
                })]) : t._e()])])])]), "dauduoi" != t.subCate.type ? e("table", {
                    staticClass: "danhlo-table"
                }, [t.subCate && 1e3 == t.subCate.max ? e("tr", [e("td"), t._l(t.row, (function(s) {
                    return e("td", {
                        key: s,
                        staticClass: "numTab"
                    }, [e("a", {
                        class: t.groupNumActive == s + 1 ? "active" : "",
                        attrs: {
                            href: "#"
                        },
                        on: {
                            click: function(e) {
                                e.preventDefault(), t.setNumPad(100 * s, 1e3, 1e3), t.groupNumActive = 10
                            }
                        }
                    }, [t._v(t._s(0 == s ? "000-099" : 100 * s + "-" + (100 * s + 99)))])])
                }))], 2) : t._e(), e("tr", [e("td"), t._l(10, (function(s) {
                    return e("td", {
                        key: s,
                        staticClass: "tdscol"
                    }, [e("a", {
                        staticClass: "s-col",
                        attrs: {
                            href: ""
                        },
                        on: {
                            click: function(e) {
                                return e.preventDefault(), t.selectCol(s - 1)
                            }
                        }
                    }, [e("i", {
                        staticClass: "fas fa-chevron-down"
                    })])])
                }))], 2), t._l(t.row, (function(s) {
                    return e("tr", {
                        key: s
                    }, [e("td", {
                        staticClass: "tdsrow"
                    }, [e("a", {
                        attrs: {
                            href: ""
                        },
                        on: {
                            click: function(e) {
                                return e.preventDefault(), t.selectRow(10 * s)
                            }
                        }
                    }, [e("i", {
                        staticClass: "fas fa-chevron-right"
                    })])]), t._l(t.col, (function(a) {
                        return e("td", {
                            key: a,
                            staticClass: "tdscol"
                        }, [e("span", [e("label", {
                            staticClass: "input-num"
                        }, [e("input", {
                            directives: [{
                                name: "model",
                                rawName: "v-model",
                                value: t.numPadSelected,
                                expression: "numPadSelected"
                            }],
                            attrs: {
                                type: "checkbox"
                            },
                            domProps: {
                                value: t.numPad[10 * s + a],
                                checked: Array.isArray(t.numPadSelected) ? t._i(t.numPadSelected, t.numPad[10 * s + a]) > -1 : t.numPadSelected
                            },
                            on: {
                                click: function(s) {
                                    return t.check(s)
                                },
                                change: function(e) {
                                    var i = t.numPadSelected,
                                        l = e.target,
                                        r = !!l.checked;
                                    if (Array.isArray(i)) {
                                        var c = t.numPad[10 * s + a],
                                            n = t._i(i, c);
                                        l.checked ? n < 0 && (t.numPadSelected = i.concat([c])) : n > -1 && (t.numPadSelected = i.slice(0, n).concat(i.slice(n + 1)))
                                    } else t.numPadSelected = r
                                }
                            }
                        }), e("div", {
                            staticClass: "checkmark"
                        }, [t._v(t._s(t.numPad[10 * s + a]))])])])])
                    }))], 2)
                }))], 2) : t._e(), "dauduoi" == t.subCate.type ? e("table", {
                    staticClass: "danhlo-table"
                }, [e("tr", t._l(t.col, (function(s) {
                    return e("td", {
                        key: s,
                        staticClass: "tdscol"
                    }, [e("span", [e("label", {
                        staticClass: "input-num"
                    }, [e("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.numPadSelected,
                            expression: "numPadSelected"
                        }],
                        attrs: {
                            type: "checkbox"
                        },
                        domProps: {
                            value: t.numPad[s],
                            checked: Array.isArray(t.numPadSelected) ? t._i(t.numPadSelected, t.numPad[s]) > -1 : t.numPadSelected
                        },
                        on: {
                            click: function(s) {
                                return t.check(s)
                            },
                            change: function(e) {
                                var a = t.numPadSelected,
                                    i = e.target,
                                    l = !!i.checked;
                                if (Array.isArray(a)) {
                                    var r = t.numPad[s],
                                        c = t._i(a, r);
                                    i.checked ? c < 0 && (t.numPadSelected = a.concat([r])) : c > -1 && (t.numPadSelected = a.slice(0, c).concat(a.slice(c + 1)))
                                } else t.numPadSelected = l
                            }
                        }
                    }), e("div", {
                        staticClass: "checkmark"
                    }, [t._v(t._s(t.numPad[s]))])])])])
                })), 0)]) : t._e()])])])], 1)
            },
            B = [function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "ortext"
                }, [e("span", [t._v("hoặc")]), t._v(" chọn số bên dưới")])
            }],
            A = function() {
                var t = this,
                    s = t.$createElement,
                    a = t._self._c || s;
                return a("div", {
                    staticClass: "header"
                }, [a("div", {
                    staticClass: "logo"
                }, [a("img", {
                    attrs: {
                        src: e("4d87"),
                        alt: ""
                    }
                }), a("h6", [t._v("XỔ SỐ SIÊU TỐC")]), a("h1", [t._v(t._s(t.selected.name))])]), a("div", {
                    staticClass: "select-mode"
                }, [a("div", {
                    staticClass: "dropdown"
                }, [a("button", {
                    staticClass: "btn dropdown-toggle",
                    on: {
                        click: function(s) {
                            t.droped = !t.droped
                        }
                    }
                }, [t._v("Siêu tốc " + t._s(t.selected.name))]), a("div", {
                    staticClass: "dropdown-menu",
                    style: {
                        display: t.droped ? "block" : "none"
                    }
                }, t._l(t.gameList, (function(s, e) {
                    return a("a", {
                        key: e,
                        staticClass: "dropdown-item",
                        on: {
                            click: function(e) {
                                return e.preventDefault(), t.selectGame(s)
                            }
                        }
                    }, [t._v("Siêu tốc " + t._s(s.name))])
                })), 0)])]), a("div", {
                    staticClass: "phien-info"
                }, [a("div", {
                    staticClass: "info"
                }, [a("div", {
                    staticClass: "phien"
                }, [t._v("\n        Lượt xổ tiếp theo\n        "), a("h6", [t._v(t._s(t.next))])]), a("div", {
                    staticClass: "minute"
                }, [a("h3", [t._v(t._s(t.minute))]), a("span", [t._v("Phút")])]), t._m(0), a("div", {
                    staticClass: "minute"
                }, [a("h3", [t._v(t._s(t.second))]), a("span", [t._v("Giây")])])])])])
            },
            U = [function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "twodot"
                }, [e("h3", [t._v(":")])])
            }],
            D = e("bc3a"),
            R = e.n(D);
        const q = {
            test: {
                api: "https://api-rng.quayso.club/"
            },
            development: {
                api: "https://api-rng.apixld.com/"
            },
            production: {
                api: "https://api-rng.apixld.com/"
            },
            apiCommon: {
                user: "user",
                categories: "categories/",
                gameList: "game-list",
                result: "results/",
                history: "history/"
            },
            other: {
                currency: "K",
                hideRight: !1,
                apiGame: {
                    timeLeft: "time-left/",
                    order: "order/",
                    bettable: "bettable/",
                    analy: "analytics/"
                }
            }
        };
        var j = { ...q["production"],
            apiUrl: q.apiCommon,
            ...q.other
        };
        const I = ({
                url: t,
                method: s,
                ...e
            }) => new Promise((a, i) => {
                try {
                    R()({
                        method: s || "get",
                        url: t,
                        ...e
                    }).then(t => {
                        t.data.success ? a(t.data) : i(t.data)
                    }).catch(t => {
                        i(t)
                    })
                } catch (l) {
                    i(new Error(l))
                }
            }),
            H = t => I({
                url: j.api + t,
                method: "GET"
            }),
            K = (t, s) => I({
                url: j.api + t,
                method: "POST",
                data: s
            }),
            J = (t, s) => I({
                url: j.api + t,
                method: "PUT",
                data: s
            });
        var M = {
                get: H,
                post: K,
                put: J
            },
            F = {
                data() {
                    return {
                        gameList: [],
                        selected: {},
                        droped: !1,
                        minute: 0,
                        second: 0,
                        timer: null,
                        next: ""
                    }
                },
                mounted() {
                    let t = this.$route.params;
                    M.get(this.$config.apiUrl.gameList).then(s => {
                        this.gameList = s.rows, t && t.id ? this.gameList.forEach(s => {
                            s.id == t.id && this.selectGame(s)
                        }) : this.selectGame(s.rows[0])
                    })
                },
                methods: {
                    selectGame(t) {
                        if (this.selected = t, this.droped = !1, Object.keys(this.$config.apiGame).forEach(s => {
                                this.$config.apiUrl[s] = this.$config.apiGame[s] + t.id
                            }), "game" == this.$route.name && this.$route.params.id == t.id) return this.reload();
                        this.goto("/game/" + t.id), this.reload()
                    },
                    reload() {
                        this.$store.commit("showLoading"), this.getTimeLeft()
                    },
                    getTimeLeft() {
                        M.get(this.$config.apiUrl.timeLeft).then(t => {
                            this.setTimer(t.rows.timeleft), this.calcTime(t.rows.timeleft), this.next = t.rows.next, this.$store.commit(f, {
                                next: t.rows.next,
                                current: t.rows.current,
                                last: t.rows.last
                            }), this.$route.query.token && this.$store.dispatch(N, {
                                token: this.$route.query.token
                            }), this.$store.dispatch(x, 100), this.$store.commit(b, t.rows.result), this.$store.commit("hideLoading")
                        })
                    },
                    setTimer(t) {
                        clearInterval(this.timer), this.timer = setInterval(() => {
                            t--, t >= 0 && this.calcTime(t), t <= 4 ? this.$store.commit("setLockBet", !0) : this.$store.commit("setLockBet", !1), t < -4 && this.getTimeLeft()
                        }, 1e3)
                    },
                    calcTime(t) {
                        let s = t % 60,
                            e = (t / 60 + "").split(".")[0];
                        this.minute = "0" + e, this.second = s > 9 ? s : "0" + s
                    }
                }
            },
            W = F,
            V = Object(n["a"])(W, A, U, !1, null, null, null),
            X = V.exports,
            Y = {
                components: {
                    Header: X
                },
                data() {
                    return {
                        subCate: {
                            max: 1e3
                        },
                        groupNumActive: 1,
                        numPad: [],
                        categories: [],
                        category: {},
                        matchA: [],
                        selectedNum: [],
                        iText: "",
                        iTimer: null,
                        iError: !1,
                        row: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                        col: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    }
                },
                mounted() {
                    M.get(this.$config.apiUrl.categories).then(t => {
                        this.categories = t.rows, this.setCate(0)
                    });
                    for (let t = 0; t < 10; t++) this.matchA.push(t + "");
                    this.matchA.push(" "), this.matchA.push("-"), this.matchA.push("Enter")
                },
                methods: {
                    selectCol(t) {
                        let s = [],
                            e = "",
                            a = 0;
                        for (let i = 0; i < 10; i++) e = this.numPad[10 * i + t], this.numPadSelected.indexOf(e) > -1 && a++, s.push(e);
                        if (this.numPadSelected = [], a != s.length) return this.subCate.max_number > 0 && this.subCate.max_number < 10 ? alert("Bạn chỉ được chọn tối đa " + this.subCate.max_number + " số") : void(this.numPadSelected = s)
                    },
                    selectRow(t) {
                        let s = [],
                            e = "",
                            a = 0;
                        for (let i = 0; i < 10; i++) e = this.numPad[i + t], this.numPadSelected.indexOf(e) > -1 && a++, s.push(e);
                        if (this.numPadSelected = [], a != s.length) return this.subCate.max_number > 0 && this.subCate.max_number < 10 ? alert("Bạn chỉ được chọn tối đa " + this.subCate.max_number + " số") : void(this.numPadSelected = s)
                    },
                    typeNum(t) {
                        if ("keypress" != t.type) {
                            if ("Enter" == t.key) return this.iEnter();
                            var s = this.subCate.max + "";
                            s = s.replace("1", "").length, clearTimeout(this.iTimer), this.iTimer = setTimeout(() => {
                                this.selectedNum = [];
                                let e = "",
                                    a = t.target.value.replace(/[- ]/g, "");
                                a = a.replace(/[^\d,]/g, "");
                                for (let t = 0; t < a.length; t++) e += a.charAt(t), (t + 1) % s == 0 && (this.selectedNum.indexOf(e) < 0 && this.selectedNum.push(e), e = "");
                                e.length ? (this.selectedNum.push(e), this.iError = !0) : this.iError = !1, this.iText = "", this.iText = this.selectedNum.join(" - ")
                            }, 300)
                        } else -1 == this.matchA.indexOf(t.key) && t.preventDefault()
                    },
                    iEnter() {
                        if (!this.selectedNum.length) return;
                        let t = [];
                        var s = this.subCate.max + "";
                        s = s.replace("1", "").length, this.selectedNum.forEach(e => {
                            e.length == s && t.push(e)
                        }), this.numPadSelected = t, this.selectedNum = [], this.iText = ""
                    },
                    check(t) {
                        let s = 0 == this.subCate.max_number ? 100 : this.subCate.max_number;
                        t.target.checked && this.subCate && s <= this.numPadSelected.length && (alert("Bạn chỉ được chọn tối đa " + s + " số"), t.target.checked = !1)
                    },
                    setNumPad(t, s, e = 100) {
                        0 == t && 1e3 == s && (s = 100), this.numPad = [];
                        for (let a = t; a < s; a++) 1e3 == e ? a < 10 ? this.numPad.push("00" + a) : a < 100 ? this.numPad.push("0" + a) : this.numPad.push(a) : 100 == e && a < 10 ? this.numPad.push("0" + a) : this.numPad.push(a)
                    },
                    setSubCate(t) {
                        let s = JSON.parse(JSON.stringify(t));
                        s.guide = s.guide.replace(/\{\{ODDS\}\}/g, '<strong class="text-danger">' + s.rate + "</strong>"), this.subCate = s;
                        1e3 == s.max || s.max;
                        this.setNumPad(0, s.max, s.max), this.$store.commit("setSelectedCate", s), this.numPadSelected = [], this.iText = ""
                    },
                    setCate(t) {
                        t = t || 0, this.category = this.categories[t], this.setSubCate(this.category.children[0])
                    }
                },
                computed: {
                    numPadSelected: {
                        get() {
                            return this.$store.getters.getSelectedNum
                        },
                        set(t) {
                            this.$store.dispatch("dpcSelectedNum", t)
                        }
                    },
                    waitSm() {
                        return this.$store.getters.getWaitSm
                    }
                }
            },
            Q = Y,
            Z = Object(n["a"])(Q, G, B, !1, null, null, null),
            tt = Z.exports,
            st = function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "ld-right",
                    style: t.$config.hideRight && !t.arrowOpen ? {
                        right: "0",
                        width: 0,
                        padding: 0
                    } : t.arrowOpen ? {
                        borderLeft: "1px solid #e8e8e8"
                    } : {}
                }, [t.$config.hideRight ? e("div", {
                    staticClass: "arrow-btn"
                }, [e("a", {
                    staticStyle: {
                        display: "block",
                        padding: "20px 10px"
                    },
                    attrs: {
                        href: "#"
                    },
                    on: {
                        click: function(s) {
                            s.preventDefault(), t.arrowOpen = !t.arrowOpen
                        }
                    }
                }, [e("i", {
                    staticClass: "fas",
                    class: t.arrowOpen ? "fa-angle-double-right" : "fa-angle-double-left"
                })])]) : t._e(), e("div", {
                    staticClass: "tab-right",
                    style: t.$config.hideRight && !t.arrowOpen ? {
                        display: "none"
                    } : {}
                }, [e("div", {
                    staticClass: "tab-head"
                }, [e("a", {
                    class: 1 == t.tab ? "active" : "",
                    attrs: {
                        href: ""
                    },
                    on: {
                        click: function(s) {
                            s.preventDefault(), t.tab = 1
                        }
                    }
                }, [t._v("Kết quả xổ số")]), e("a", {
                    class: 2 == t.tab ? "active" : "",
                    attrs: {
                        href: ""
                    },
                    on: {
                        click: function(s) {
                            s.preventDefault(), t.tab = 2
                        }
                    }
                }, [t._v("Thống kê")])]), e("h6", {
                    staticClass: "text-center"
                }, [t._v(t._s(t.$route.params.id / 60) + " phút xổ 1 lần")]), 1 == t.tab ? e("div", {
                    staticClass: "tab-content"
                }, [e("div", {
                    staticClass: "sphien"
                }, [e("select", {
                    staticClass: "form-control",
                    attrs: {
                        id: ""
                    },
                    on: {
                        change: function(s) {
                            return t.getResult(s.target.value)
                        }
                    }
                }, t._l(t.session.last, (function(s, a) {
                    return e("option", {
                        key: a,
                        domProps: {
                            value: s,
                            textContent: t._s(s)
                        }
                    })
                })), 0)]), e("ResultTable", {
                    attrs: {
                        result: t.cr,
                        loading: t.lockbet
                    }
                })], 1) : t._e(), 2 == t.tab ? e("div", {
                    staticClass: "tab-content"
                }, [e("select", {
                    staticClass: "form-control",
                    staticStyle: {
                        "margin-bottom": "12px"
                    },
                    on: {
                        change: function(s) {
                            return t.changeLimit(s)
                        }
                    }
                }, [e("option", {
                    attrs: {
                        value: "100"
                    }
                }, [t._v("100 kỳ xổ số gần nhất")]), e("option", {
                    attrs: {
                        value: "300"
                    }
                }, [t._v("300 kỳ xổ số gần nhất")])]), e("div", {
                    staticClass: "card"
                }, [e("div", {
                    staticClass: "card-header"
                }, [t._v("Chưa về")]), e("div", {
                    staticClass: "card-body"
                }, [t.analytics ? e("table", [e("tbody", t._l(t.tlidx, (function(s, a) {
                    return e("tr", {
                        key: a
                    }, [e("td", [e("div", {
                        staticClass: "numst"
                    }, [e("div", {
                        staticClass: "num"
                    }, [t._v(t._s(t.analytics.longtimes[s].number))]), t._v("\n                    " + t._s(t.analytics.longtimes[s].longtimes) + " lần\n                  ")])]), e("td", [e("div", {
                        staticClass: "numst"
                    }, [e("div", {
                        staticClass: "num"
                    }, [t._v(t._s(t.analytics.longtimes[s + 1].number))]), t._v("\n                    " + t._s(t.analytics.longtimes[s + 1].longtimes) + " lượt\n                  ")])])])
                })), 0)]) : t._e()])]), e("div", {
                    staticClass: "row-ll5"
                }, [e("div", {
                    staticClass: "card col-6"
                }, [e("div", {
                    staticClass: "card-header"
                }, [t._v("Xuất hiện nhiều")]), e("div", {
                    staticClass: "card-body"
                }, [t.analytics ? e("table", [e("tbody", t._l(7, (function(s, a) {
                    return e("tr", {
                        key: a
                    }, [e("td", [e("div", {
                        staticClass: "numst"
                    }, [e("div", {
                        staticClass: "num"
                    }, [t._v(t._s(t.analytics.inc[a].number))]), t._v("\n                      " + t._s(t.analytics.inc[a].existed) + " lần\n                        "), t.analytics.inc[a].change > 0 ? e("small", {
                        staticClass: "text-success"
                    }, [t._v("↑" + t._s(t.analytics.inc[a].change))]) : e("small", {
                        staticClass: "text-danger"
                    }, [t._v("↓" + t._s(-1 * t.analytics.inc[a].change))])])])])
                })), 0)]) : t._e()])]), e("div", {
                    staticClass: "card col-6"
                }, [e("div", {
                    staticClass: "card-header"
                }, [t._v("Xuất hiện ít")]), e("div", {
                    staticClass: "card-body"
                }, [t.analytics ? e("table", [e("tbody", t._l(7, (function(s, a) {
                    return e("tr", {
                        key: a
                    }, [e("td", [e("div", {
                        staticClass: "numst"
                    }, [e("div", {
                        staticClass: "num"
                    }, [t._v(t._s(t.analytics.aba[a].number))]), t._v("\n                      " + t._s(t.analytics.aba[a].existed) + " lần \n                        "), t.analytics.aba[a].change > 0 ? e("small", {
                        staticClass: "text-success"
                    }, [t._v("↑" + t._s(t.analytics.aba[a].change))]) : e("small", {
                        staticClass: "text-danger"
                    }, [t._v("↓" + t._s(-1 * t.analytics.aba[a].change))])])])])
                })), 0)]) : t._e()])])])]) : t._e()])])
            },
            et = [],
            at = function() {
                var t = this,
                    s = t.$createElement,
                    a = t._self._c || s;
                return a("div", {
                    staticClass: "result-table"
                }, [a("ul", {
                    staticClass: "table-head"
                }, [a("li", [a("a", {
                    class: 1 == t.tab ? "active" : "",
                    attrs: {
                        href: ""
                    },
                    on: {
                        click: function(s) {
                            s.preventDefault(), t.tab = 1
                        }
                    }
                }, [t._v("Normal")])]), a("li", [a("a", {
                    class: 2 == t.tab ? "active" : "",
                    attrs: {
                        href: ""
                    },
                    on: {
                        click: function(s) {
                            s.preventDefault(), t.tab = 2
                        }
                    }
                }, [t._v("2 Số")])]), a("li", [a("a", {
                    class: 3 == t.tab ? "active" : "",
                    attrs: {
                        href: ""
                    },
                    on: {
                        click: function(s) {
                            s.preventDefault(), t.tab = 3
                        }
                    }
                }, [t._v("3 Số")])])]), t.result ? a("table", [1 == t.tab ? a("tbody", [a("tr", {
                    staticClass: "light special"
                }, [a("th", [t._v("Giải ĐB")]), t.loading ? t._e() : a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.special))])])]), t.loading ? a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])])]) : t._e()]), a("tr", [a("th", [t._v("Giải Nhất")]), t.loading ? t._e() : a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize1))])])]), t.loading ? a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])])]) : t._e()]), t.result.prize2 ? a("tr", {
                    staticClass: "light"
                }, [a("th", [t._v("Giải Nhì")]), t.loading ? t._e() : a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize2[0]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize2[1]))])])]), t.loading ? a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])])]) : t._e()]) : t._e(), t.result.prize3 ? a("tr", [a("th", [t._v("Giải Ba")]), t.loading ? t._e() : a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[0]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[1]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[2]))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[3]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[4]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[5]))])])]), t.loading ? a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])])]) : t._e()]) : t._e(), t.result.prize4 ? a("tr", {
                    staticClass: "light"
                }, [a("th", [t._v("Giải Tư")]), t.loading ? t._e() : a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[0]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[1]))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[2]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[3]))])])]), t.loading ? a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])])]) : t._e()]) : t._e(), t.result.prize5 ? a("tr", [a("th", [t._v("Giải Năm")]), t.loading ? t._e() : a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[0]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[1]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[2]))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[3]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[4]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[5]))])])]), t.loading ? a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])])]) : t._e()]) : t._e(), t.result.prize6 ? a("tr", {
                    staticClass: "light"
                }, [a("th", [t._v("Giải Sáu")]), t.loading ? t._e() : a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize6[0]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize6[1]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize6[2]))])])]), t.loading ? a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])])]) : t._e()]) : t._e(), t.result.prize7 ? a("tr", [a("th", [t._v("Giải Bảy")]), t.loading ? t._e() : a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[0]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[1]))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[2]))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[3]))])])]), t.loading ? a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })]), a("div", {
                    staticClass: "result-cell pd-0"
                }, [a("img", {
                    staticStyle: {
                        height: "35px"
                    },
                    attrs: {
                        src: e("e660"),
                        alt: ""
                    }
                })])])]) : t._e()]) : t._e()]) : t._e(), 2 == t.tab ? a("tbody", [a("tr", {
                    staticClass: "light special"
                }, [a("th", [t._v("Giải ĐB")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.special.substr(-2)))])])])]), a("tr", [a("th", [t._v("Giải Nhất")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize1.substr(-2)))])])])]), a("tr", {
                    staticClass: "light"
                }, [a("th", [t._v("Giải Nhì")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize2[0].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize2[1].substr(-2)))])])])]), a("tr", [a("th", [t._v("Giải Ba")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[0].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[1].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[2].substr(-2)))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[3].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[4].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[5].substr(-2)))])])])]), a("tr", {
                    staticClass: "light"
                }, [a("th", [t._v("Giải Tư")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[0].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[1].substr(-2)))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[2].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[3].substr(-2)))])])])]), a("tr", [a("th", [t._v("Giải Năm")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[0].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[1].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[2].substr(-2)))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[3].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[4].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[5].substr(-2)))])])])]), a("tr", {
                    staticClass: "light"
                }, [a("th", [t._v("Giải Sáu")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize6[0].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize6[1].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize6[2].substr(-2)))])])])]), a("tr", [a("th", [t._v("Giải Bảy")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[0].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[1].substr(-2)))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[2].substr(-2)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[3].substr(-2)))])])])])]) : t._e(), 3 == t.tab ? a("tbody", [a("tr", {
                    staticClass: "light special"
                }, [a("th", [t._v("Giải ĐB")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.special.substr(-3)))])])])]), a("tr", [a("th", [t._v("Giải Nhất")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize1.substr(-3)))])])])]), a("tr", {
                    staticClass: "light"
                }, [a("th", [t._v("Giải Nhì")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize2[0].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize2[1].substr(-3)))])])])]), a("tr", [a("th", [t._v("Giải Ba")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[0].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[1].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[2].substr(-3)))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[3].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[4].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize3[5].substr(-3)))])])])]), a("tr", {
                    staticClass: "light"
                }, [a("th", [t._v("Giải Tư")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[0].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[1].substr(-3)))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[2].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize4[3].substr(-3)))])])])]), a("tr", [a("th", [t._v("Giải Năm")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[0].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[1].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[2].substr(-3)))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[3].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[4].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize5[5].substr(-3)))])])])]), a("tr", {
                    staticClass: "light"
                }, [a("th", [t._v("Giải Sáu")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize6[0].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize6[1].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize6[2].substr(-3)))])])])]), a("tr", [a("th", [t._v("Giải Bảy")]), a("td", [a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[0].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[1].substr(-3)))])]), a("div", {
                    staticClass: "result-row"
                }, [a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[2].substr(-3)))]), a("div", {
                    staticClass: "result-cell"
                }, [t._v(t._s(t.result.prize7[3].substr(-3)))])])])])]) : t._e()]) : t._e()])
            },
            it = [],
            lt = {
                props: ["result", "loading"],
                data() {
                    return {
                        tab: 1
                    }
                },
                methods: {}
            },
            rt = lt,
            ct = (e("db64"), Object(n["a"])(rt, at, it, !1, null, null, null)),
            nt = ct.exports,
            ut = {
                components: {
                    ResultTable: nt
                },
                data() {
                    return {
                        arrowOpen: !1,
                        tab: 1,
                        cr: {},
                        tlidx: [0, 2, 4, 5, 6, 8]
                    }
                },
                mounted() {
                    let t = setInterval(() => {
                        this.result[0] && (this.cr = JSON.parse(JSON.stringify(this.result[0])), clearInterval(t))
                    }, 500)
                },
                methods: {
                    changeLimit(t) {
                        this.$store.dispatch(x, t.target.value)
                    },
                    getResult(t) {
                        t = t.replace("-", "");
                        for (let s = 0; s < this.result.length; s++) {
                            const e = this.result[s];
                            e.times == t && (this.cr = JSON.parse(JSON.stringify(e)))
                        }
                    }
                },
                watch: {
                    result(t) {
                        this.cr = JSON.parse(JSON.stringify(t[0]))
                    }
                },
                computed: {
                    session() {
                        return this.$store.getters.getSession
                    },
                    result() {
                        return this.$store.getters.getResult
                    },
                    lockbet() {
                        return this.$store.getters.getLockBet
                    },
                    analytics() {
                        return this.$store.getters.getAnalytics
                    }
                }
            },
            ot = ut,
            dt = Object(n["a"])(ot, st, et, !1, null, null, null),
            ht = dt.exports,
            vt = {
                components: {
                    Left: O,
                    Center: tt,
                    Right: ht
                }
            },
            mt = vt,
            pt = Object(n["a"])(mt, h, v, !1, null, null, null),
            _t = pt.exports,
            gt = function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "container"
                }, [e("div", {
                    staticClass: "row"
                }, [e("nav", {
                    staticClass: "navbar navbar-expand-lg"
                }, [e("span", {
                    staticClass: "navbar-brand",
                    attrs: {
                        href: "#"
                    }
                }, [t._v("Kết quả")]), e("div", {
                    staticClass: "collapse navbar-collapse",
                    attrs: {
                        id: "navbarSupportedContent"
                    }
                }, [e("ul", {
                    staticClass: "navbar-nav mr-auto"
                }, [e("li", {
                    staticClass: "nav-item mr-2"
                }, [e("select", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.game,
                        expression: "game"
                    }],
                    staticClass: "form-control mr-sm-2",
                    on: {
                        change: [function(s) {
                            var e = Array.prototype.filter.call(s.target.options, (function(t) {
                                return t.selected
                            })).map((function(t) {
                                var s = "_value" in t ? t._value : t.value;
                                return s
                            }));
                            t.game = s.target.multiple ? e : e[0]
                        }, function(s) {
                            return t.changeGame(s.target.value)
                        }]
                    }
                }, [e("option", {
                    domProps: {
                        value: 60
                    }
                }, [t._v("1 phút xổ 1 lần")]), e("option", {
                    domProps: {
                        value: 180
                    }
                }, [t._v("3 phút xổ 1 lần")]), e("option", {
                    domProps: {
                        value: 300
                    }
                }, [t._v("5 phút xổ 1 lần")])])]), e("li", {
                    staticClass: "nav-item mr-2"
                }, [e("button", {
                    staticClass: "btn btn-outline-warning my-2 my-sm-0",
                    class: 1 == t.tab ? "active" : "",
                    on: {
                        click: function(s) {
                            return t.changeTab(1)
                        }
                    }
                }, [t._v("Hôm nay")])]), e("li", {
                    staticClass: "nav-item mr-2"
                }, [e("button", {
                    staticClass: "btn btn-outline-warning my-2 my-sm-0",
                    class: 2 == t.tab ? "active" : "",
                    on: {
                        click: function(s) {
                            return t.changeTab(2)
                        }
                    }
                }, [t._v("Hôm qua")])]), e("li", {
                    staticClass: "nav-item mr-2"
                }, [e("button", {
                    staticClass: "btn btn-outline-warning my-2 my-sm-0",
                    class: 3 == t.tab ? "active" : "",
                    on: {
                        click: function(s) {
                            return t.changeTab(3)
                        }
                    }
                }, [t._v("7 ngày qua")])]), e("li", {
                    staticClass: "nav-item mr-2"
                }, [e("button", {
                    staticClass: "btn btn-outline-warning my-2 my-sm-0",
                    class: 4 == t.tab ? "active" : "",
                    on: {
                        click: function(s) {
                            return t.changeTab(4)
                        }
                    }
                }, [t._v("Tháng này")])])]), e("form", {
                    staticClass: "form-inline my-2 my-lg-0"
                }, [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.ip,
                        expression: "ip"
                    }],
                    staticClass: "form-control mr-sm-2",
                    attrs: {
                        type: "search",
                        placeholder: "Search",
                        "aria-label": "Search"
                    },
                    domProps: {
                        value: t.ip
                    },
                    on: {
                        input: function(s) {
                            s.target.composing || (t.ip = s.target.value)
                        }
                    }
                }), e("button", {
                    staticClass: "btn btn-outline-warning my-2 my-sm-0",
                    on: {
                        click: function(s) {
                            return s.preventDefault(), t.search()
                        }
                    }
                }, [t._v("Search")])])])])]), e("div", {
                    staticClass: "row row2 mt-3"
                }, t._l(t.result, (function(s, a) {
                    return e("div", {
                        key: a,
                        staticClass: "col-sm-4"
                    }, [e("div", {
                        staticClass: "card"
                    }, [e("div", {
                        staticClass: "card-header"
                    }, [t._v(t._s(t.parseTimes(s.times + "")))]), e("ResultTable", {
                        attrs: {
                            result: t.parseResult(s)
                        }
                    })], 1)])
                })), 0), e("nav", {
                    attrs: {
                        "aria-label": "Page navigation example"
                    }
                }, [e("ul", {
                    staticClass: "pagination"
                }, t._l(t.pagi.range, (function(s, a) {
                    return e("li", {
                        key: a,
                        staticClass: "page-item"
                    }, [e("a", {
                        staticClass: "page-link",
                        attrs: {
                            href: "#"
                        },
                        on: {
                            click: function(e) {
                                return e.preventDefault(), t.getList(s)
                            }
                        }
                    }, [t._v(t._s(s))])])
                })), 0)])])
            },
            Ct = [],
            bt = {
                components: {
                    ResultTable: nt
                },
                data() {
                    return {
                        tab: 1,
                        game: 60,
                        result: [],
                        pagi: {},
                        ip: ""
                    }
                },
                mounted() {
                    this.game = this.$route.params.id, this.getList(1)
                },
                methods: {
                    search() {
                        this.tab = this.ip, this.getList(1)
                    },
                    changeTab(t) {
                        this.tab = t, this.ip = "", this.getList()
                    },
                    changeGame(t) {
                        this.game = t, this.goto("/result/" + t), this.getList()
                    },
                    getList(t) {
                        M.get(this.$config.apiUrl.result + this.game + "?page=" + t + "&type=" + this.tab).then(t => {
                            this.result = t.rows, this.genPanigate(t.attrs)
                        })
                    },
                    genPanigate(t) {
                        let s = t.current_page - 2;
                        s < 1 && (s = 1);
                        let e = t.current_page + 2;
                        e > t.last_page && (e = t.last_page);
                        let a = [];
                        for (let i = s; i <= e; i++) a.push(i);
                        this.pagi = {
                            range: a,
                            cur: t.current_page
                        }
                    },
                    parseTimes(t) {
                        return t.substr(0, 8) + "-" + t.substr(8)
                    },
                    parseResult(t) {
                        let s = ["prize2", "prize3", "prize4", "prize5", "prize6", "prize7"];
                        for (let e = 0; e < s.length; e++) t[s[e]] = t[s[e]].split(" - ");
                        return t
                    }
                }
            },
            ft = bt,
            yt = (e("be02"), Object(n["a"])(ft, gt, Ct, !1, null, "d90b35e8", null)),
            wt = yt.exports,
            xt = function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("div", {
                    staticClass: "container"
                }, [e("div", {
                    staticClass: "row"
                }, [e("nav", {
                    staticClass: "navbar navbar-expand-lg"
                }, [e("span", {
                    staticClass: "navbar-brand",
                    attrs: {
                        href: "#"
                    }
                }, [t._v("Sao kê")]), e("div", {
                    staticClass: "collapse navbar-collapse",
                    attrs: {
                        id: "navbarSupportedContent"
                    }
                }, [e("ul", {
                    staticClass: "navbar-nav mr-auto"
                }, [e("li", {
                    staticClass: "nav-item mr-2"
                }, [e("select", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.game,
                        expression: "game"
                    }],
                    staticClass: "form-control mr-sm-2",
                    on: {
                        change: [function(s) {
                            var e = Array.prototype.filter.call(s.target.options, (function(t) {
                                return t.selected
                            })).map((function(t) {
                                var s = "_value" in t ? t._value : t.value;
                                return s
                            }));
                            t.game = s.target.multiple ? e : e[0]
                        }, function(s) {
                            return t.changeGame(s.target.value)
                        }]
                    }
                }, [e("option", {
                    attrs: {
                        value: "60"
                    }
                }, [t._v("1 phút xổ 1 lần")]), e("option", {
                    attrs: {
                        value: "180"
                    }
                }, [t._v("3 phút xổ 1 lần")]), e("option", {
                    attrs: {
                        value: "300"
                    }
                }, [t._v("5 phút xổ 1 lần")])])])])])])]), t.user ? e("table", {
                    staticClass: "table table-response"
                }, [t._m(0), e("tbody", t._l(t.rows, (function(s, a) {
                    return e("tr", {
                        key: a
                    }, [e("td", [t._v(t._s(s.id))]), e("td", [t._v(t._s(t.parseTimes(s.times + "")))]), e("td", [t._v(t._s(s.date))]), e("td", [t._v(t._s(s.cate))]), e("td", t._l(s.numbers, (function(a, i) {
                        return e("span", {
                            key: i,
                            staticClass: "badge mr-1",
                            class: s.numbers_win && (s.numbers_win.indexOf(a) > -1 || s.numbers_win.indexOf(1 * a) > -1) ? "badge-success" : ""
                        }, [t._v(t._s(a))])
                    })), 0), e("td", [t._v(t._s(s.amount.curency()))]), e("td", [t._v(t._s(s.amount_win.curency()))]), e("td", [0 == s.status ? e("span", {
                        staticClass: "badge badge-secondary badge-pill"
                    }, [t._v("Đang chờ")]) : t._e(), 1 == s.status ? e("span", {
                        staticClass: "badge badge-success badge-pill"
                    }, [t._v("Thắng")]) : t._e(), 2 == s.status ? e("span", {
                        staticClass: "badge badge-secondary badge-pill"
                    }, [t._v("Thua")]) : t._e(), 3 == s.status ? e("span", {
                        staticClass: "badge badge-secondary badge-pill"
                    }, [t._v("Hủy")]) : t._e()])])
                })), 0)]) : e("div", {
                    staticClass: "text-center text-danger"
                }, [e("h6", [t._v("Bạn chưa đăng nhập")])]), e("nav", {
                    attrs: {
                        "aria-label": "Page navigation example"
                    }
                }, [e("ul", {
                    staticClass: "pagination"
                }, t._l(t.pagi.range, (function(s, a) {
                    return e("li", {
                        key: a,
                        staticClass: "page-item"
                    }, [e("a", {
                        staticClass: "page-link",
                        attrs: {
                            href: "#"
                        },
                        on: {
                            click: function(e) {
                                return e.preventDefault(), t.getList(s)
                            }
                        }
                    }, [t._v(t._s(s))])])
                })), 0)])])
            },
            St = [function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return e("thead", [e("tr", [e("th", [t._v("ID")]), e("th", [t._v("Lượt xổ")]), e("th", [t._v("Thời gian")]), e("th", [t._v("Loại đề")]), e("th", [t._v("Số cược")]), e("th", [t._v("Tiền cược")]), e("th", [t._v("Tiền thắng")]), e("th", [t._v("Trạng thái")])])])
            }],
            kt = {
                components: {
                    ResultTable: nt
                },
                data() {
                    return {
                        tab: 1,
                        game: 60,
                        rows: [],
                        pagi: {}
                    }
                },
                mounted() {
                    this.game = this.$route.params.id, this.getList(1)
                },
                methods: {
                    changeTab(t) {
                        this.tab = t, this.getList()
                    },
                    changeGame(t) {
                        this.game = t, this.goto("/history/" + t), this.getList()
                    },
                    getList(t) {
                        M.get(this.$config.apiUrl.history + this.game + "?page=" + t + "&token=" + this.$route.query.token).then(t => {
                            this.rows = t.rows, this.genPanigate(t.attrs)
                        })
                    },
                    genPanigate(t) {
                        let s = t.current_page - 2;
                        s < 1 && (s = 1);
                        let e = t.current_page + 2;
                        e > t.last_page && (e = t.last_page);
                        let a = [];
                        for (let i = s; i <= e; i++) a.push(i);
                        this.pagi = {
                            range: a,
                            cur: t.current_page
                        }
                    },
                    parseTimes(t) {
                        return t.substr(0, 8) + "-" + t.substr(8)
                    }
                },
                computed: {
                    user() {
                        return this.$store.getters.getUser
                    }
                }
            },
            $t = kt,
            zt = (e("50fd"), Object(n["a"])($t, xt, St, !1, null, "3572e242", null)),
            Nt = zt.exports;
        a["a"].use(d["a"]);
        const Tt = new d["a"]({
            mode: "history",
            base: "/",
            routes: [{
                path: "/",
                name: "home",
                component: _t
            }, {
                path: "/game/:id",
                name: "game",
                component: _t
            }, {
                path: "/result/:id",
                name: "result",
                component: wt
            }, {
                path: "/history/:id",
                name: "history",
                component: Nt
            }]
        });
        var Pt = Tt,
            Et = (e("3c61"), e("2f62"));
        const Lt = {
                loading: !1
            },
            Ot = {
                getLoading: t => t.loading
            },
            Gt = {
                showLoading: t => t.loading = !0,
                hideLoading: t => t.loading = !1
            },
            Bt = {};
        var At = {
            state: Lt,
            getters: Ot,
            actions: Bt,
            mutations: Gt
        };
        const Ut = {
                categories: {}
            },
            Dt = {
                getCate: t => t.categories
            },
            Rt = {
                CATE_GET: ({
                    commit: t
                }, s) => new Promise((s, e) => {
                    M.get(j.apiUrl.categories).then(e => {
                        t("CATE_SUCCESS", e.rows), s(e.rows)
                    }).catch(t => {
                        e(t)
                    })
                })
            },
            qt = {
                CATE_SUCCESS: (t, s) => {
                    t.categories = s
                }
            };
        var jt = {
            state: Ut,
            getters: Dt,
            actions: Rt,
            mutations: qt
        };
        const It = {
                results: {},
                session: "",
                cities: [],
                analy: {}
            },
            Ht = {
                getResult: t => t.results,
                getCities: t => t.cities,
                getSession: t => t.session,
                getAnalytics: t => t.analy
            },
            Kt = {
                [C]: ({
                    commit: t,
                    rootState: s
                }, e) => new Promise((s, a) => {
                    M.get(j.apiUrl.result + "?date=" + e.date + "&city=" + e.city).then(e => {
                        t(b, e.rows), t("hideLoading"), s(e.rows)
                    }).catch(t => {
                        a(t)
                    })
                }),
                [x]: ({
                    commit: t
                }, s) => {
                    M.get(j.apiUrl.analy + "?limit=" + s).then(s => t(S, s.rows))
                }
            },
            Jt = {
                [f]: (t, s) => {
                    t.session = s
                },
                [b]: (t, s) => {
                    t.results = s
                },
                [S]: (t, s) => {
                    t.analy = s
                }
            };
        var Mt = {
            state: It,
            getters: Ht,
            actions: Kt,
            mutations: Jt
        };
        const Ft = {
                user: null,
                bettable: null
            },
            Wt = {
                getUser: t => t.user,
                getBettable: t => t.bettable
            },
            Vt = {
                [$]: ({
                    commit: t
                }, s) => new Promise((e, a) => {
                    M.get(j.apiUrl.user + "?token=" + s.token + "&nolog=1" + s.nolog).then(s => {
                        t(k, s.rows), e(s.rows)
                    }).catch(t => a(t))
                }),
                [N]: ({
                    commit: t
                }, s) => new Promise((e, a) => {
                    M.get(j.apiUrl.bettable + "?token=" + s.token).then(s => {
                        t(T, s.rows)
                    })
                })
            },
            Xt = {
                [k]: (t, s) => {
                    t.user = s
                },
                [T]: (t, s) => {
                    t.bettable = s
                }
            };
        var Yt = {
            state: Ft,
            getters: Wt,
            actions: Vt,
            mutations: Xt
        };
        const Qt = {
                region: {
                    id: "bac",
                    name: "Miền Bắc"
                },
                date: "",
                cates: [],
                city: null
            },
            Zt = {
                getRegion: t => t.region,
                getDateBet: t => t.date
            },
            ts = {
                [y]: ({
                    commit: t,
                    dispatch: s,
                    rootState: e,
                    state: a
                }) => new Promise((s, e) => {
                    M.get(j.apiUrl.startdate).then(e => {
                        t(w, e.rows.date), s(e.rows.date)
                    }).catch(t => {
                        e(t)
                    })
                }),
                [z]: ({
                    rootState: t
                }, s) => new Promise((t, e) => {
                    M.get(j.apiUrl.release + "?id=" + s.id + "&date=" + s.date).then(s => {
                        t(s.rows)
                    }).catch(t => {
                        e(t)
                    })
                })
            },
            ss = {
                setRegion: (t, s) => t.region = s,
                [w]: (t, s) => t.date = s
            };
        var es = {
            state: Qt,
            getters: Zt,
            actions: ts,
            mutations: ss
        };
        const as = {
                selectedNum: [],
                lockBet: !1,
                selectedCate: {},
                waitSm: []
            },
            is = {
                getSelectedNum: t => t.selectedNum,
                getSelectedCate: t => t.selectedCate,
                getLockBet: t => t.lockBet,
                getWaitSm: t => t.waitSm
            },
            ls = {
                dpcSelectedNum: ({
                    commit: t
                }, s) => {
                    t("setSelectedNum", s)
                },
                dpcWaitSm: ({
                    commit: t
                }, s) => {
                    t("setStoreWaitSm", s)
                },
                submitOrder: ({
                    commit: t
                }, s, e) => new Promise((t, e) => {
                    M.post(j.apiUrl.order, s).then(s => {
                        t(s)
                    }).catch(t => e(t))
                })
            },
            rs = {
                setSelectedNum: (t, s) => t.selectedNum = s,
                setSelectedCate: (t, s) => t.selectedCate = s,
                setLockBet: (t, s) => t.lockBet = s,
                setStoreWaitSm: (t, s) => t.waitSm = s
            };
        var cs = {
            state: as,
            getters: is,
            actions: ls,
            mutations: rs
        };
        a["a"].use(Et["a"]);
        const ns = !1;
        var us = new Et["a"].Store({
                modules: {
                    loading: At,
                    cate: jt,
                    results: Mt,
                    user: Yt,
                    order: es,
                    order_form: cs
                },
                strict: ns
            }),
            os = function() {
                var t = this,
                    s = t.$createElement,
                    e = t._self._c || s;
                return t.visible ? e("div", {
                    staticClass: "modal-bg"
                }, [e("div", {
                    staticClass: "modal-wrapper"
                }, [e("p", [t._v(t._s(t.text))]), e("div", {
                    staticClass: "modal-buttons"
                }, [e("button", {
                    staticClass: "modal-button",
                    on: {
                        click: t.hide
                    }
                }, [t._v("Đóng")]), t.onConfirm ? e("button", {
                    staticClass: "modal-button",
                    on: {
                        click: t.confirm
                    }
                }, [t._v("Confirm")]) : t._e()])])]) : t._e()
            },
            ds = [],
            hs = {
                data() {
                    return {
                        visible: !1,
                        title: "",
                        text: "",
                        onConfirm: {}
                    }
                },
                methods: {
                    hide() {
                        this.visible = !1
                    },
                    confirm() {
                        "function" === typeof this.onConfirm ? (this.onConfirm(), this.hide()) : this.hide()
                    },
                    show(t, s) {
                        this.visible = !0, this.text = t, this.onConfirm = s
                    }
                },
                beforeMount() {
                    gs.EventBus.$on("show", (t, s) => {
                        this.show(t, s)
                    })
                }
            },
            vs = hs,
            ms = (e("9e8f"), Object(n["a"])(vs, os, ds, !1, null, "937d5714", null)),
            ps = ms.exports;
        const _s = {
            install(t, s) {
                this.EventBus = new t, t.component("app-modal", ps), t.prototype.$modal = {
                    show(t, s) {
                        _s.EventBus.$emit("show", t, s)
                    }
                }
            }
        };
        var gs = _s;
        window.innerWidth < 1540 && (j.hideRight = !0), a["a"].config.productionTip = !0, a["a"].prototype.$config = j, a["a"].use(gs), Number.prototype.curency = function(t, s) {
            var e = "\\d(?=(\\d{" + (s || 3) + "})+" + (t > 0 ? "\\." : "$") + ")";
            return this.toFixed(Math.max(0, ~~t)).replace(new RegExp(e, "g"), "$&,")
        }, Number.prototype.toKVD = function() {
            var t = "\\d(?=(\\d{3})+\\.)";
            return (this / 1e3).toFixed(2).replace(new RegExp(t, "g"), "$&,")
        }, a["a"].mixin({
            methods: {
                goto(t) {
                    let s = this.$route.query;
                    this.$router.replace({
                        path: t,
                        query: s
                    })
                }
            }
        }), new a["a"]({
            router: Pt,
            store: us,
            render: t => t(o),
            mounted() {
                this.$store.dispatch("CATE_GET"), this.$route.query.token && "undefined" != typeof this.$route.query.token && (this.$store.dispatch($, {
                    token: this.$route.query.token,
                    nolog: 0
                }), setInterval(() => {
                    this.$store.dispatch($, {
                        token: this.$route.query.token,
                        nolog: 1
                    })
                }, 5e3)), this.$router.beforeResolve((t, s, e) => {
                    this.$store.commit("showLoading"), e()
                })
            }
        }).$mount("#app")
    },
    "7a2f": function(t, s, e) {},
    "9e8f": function(t, s, e) {
        "use strict";
        var a = e("36ab"),
            i = e.n(a);
        i.a
    },
    b92c: function(t, s, e) {},
    be02: function(t, s, e) {
        "use strict";
        var a = e("7a2f"),
            i = e.n(a);
        i.a
    },
    c599: function(t, s, e) {},
    db64: function(t, s, e) {
        "use strict";
        var a = e("3d20"),
            i = e.n(a);
        i.a
    },
    e660: function(t, s, e) {
        t.exports = e.p + "img/loading.5c4b603f.svg"
    }
});
//# sourceMappingURL=app.d73df0f8.js.map