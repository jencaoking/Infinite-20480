export default function(global, globalThis, window, $app_exports$, $app_evaluate$) {
    var org_app_require = $app_require$;
    (function(global, globalThis, window, $app_exports$, $app_evaluate$) {
        var setTimeout = global.setTimeout;
        var setInterval = global.setInterval;
        var clearTimeout = global.clearTimeout;
        var clearInterval = global.clearInterval;
        var $app_require$1 = global.$app_require$ || org_app_require;
        var createPageHandler = function() {
            return (()=>{
                var __webpack_modules__ = {};
                var __webpack_module_cache__ = {};
                function __webpack_require__(moduleId) {
                    var cachedModule = __webpack_module_cache__[moduleId];
                    if (void 0 !== cachedModule) return cachedModule.exports;
                    var module = __webpack_module_cache__[moduleId] = {
                        exports: {}
                    };
                    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
                    return module.exports;
                }
                (()=>{
                    __webpack_require__.g = (()=>{
                        if ('object' == typeof globalThis) return globalThis;
                        try {
                            return this || new Function('return this')();
                        } catch (e) {
                            if ('object' == typeof window) return window;
                        }
                    })();
                })();
                (()=>{
                    __webpack_require__.rv = ()=>"1.4.11";
                })();
                (()=>{
                    __webpack_require__.ruid = "bundler=rspack@1.4.11";
                })();
                var $app_style$ = [
                    [
                        [
                            [
                                2,
                                "text"
                            ]
                        ],
                        {
                            fontWeight: "bold",
                            textAlign: "center"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "score"
                            ]
                        ],
                        {
                            position: "absolute",
                            left: "0px",
                            top: "75px",
                            width: "192px",
                            fontSize: "28px",
                            color: "rgba(255, 255, 255, 0.6)"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "square"
                            ]
                        ],
                        {
                            width: "40px",
                            height: "40px",
                            marginTop: "4px",
                            marginLeft: "4px",
                            borderRadius: "13px",
                            fontSize: "15px",
                            color: "#59503f"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "bg"
                            ]
                        ],
                        {
                            position: "absolute",
                            width: "192px",
                            height: "469px",
                            backgroundColor: "black"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "btn"
                            ]
                        ],
                        {
                            position: "absolute",
                            left: "45px",
                            top: "504px"
                        }
                    ]
                ];
                var $app_script$ = function __scriptModule__(module, exports, $app_require$1) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = void 0;
                    var _system = _interopRequireDefault($app_require$1("@app-module/system.prompt"));
                    var _system2 = _interopRequireDefault($app_require$1("@app-module/system.storage"));
                    var _system3 = _interopRequireDefault($app_require$1("@app-module/system.folme"));
                    function _interopRequireDefault(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        };
                    }
                    var sc = 0, ls, lhs, board = Array(4), added = Array(4), over = 0, lm = Array(4), that;
                    for(let i = 0; i < 4; i++){
                        lm[i] = new Array(4);
                        board[i] = new Array(4);
                        added[i] = new Array(4);
                    }
                    var _default = exports.default = {
                        public: {
                            blocks: [
                                "0",
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8",
                                "9",
                                "10",
                                "11",
                                "12",
                                "13",
                                "14",
                                "15"
                            ],
                            md: [],
                            hsc: 0,
                            sco: sc,
                            bgc: [],
                            ise: [],
                            ch: 0,
                            dark: false,
                            menuFlag: false,
                            ani: true
                        },
                        onInit () {
                            that = this;
                            let tempc = "rgba(0,0,0,0) #EFE5DA #F0E0C9 #fcb477 #ff9c61 #ff865d #ff6a38 #ebcf71 #ebcc5f #ebc94f #ebc53f #ebc22c #F2B6B6 #E8ED51 #FFE3FB #E8FF8C #FFDEC9 #F5A433 #E6109B #96C4E6 #E560CD".split(" ");
                            tempc.forEach((a, index)=>{
                                this.bgc[2 ** index] = a;
                            });
                            this.bgc[""] = "rgba(0, 0, 0, 0)";
                            _system2.default.get({
                                key: "score",
                                success: (data)=>{
                                    if (data) {
                                        let o = JSON.parse(data);
                                        board = o.map;
                                        rm0(o.map);
                                        this.hsc = o.hs;
                                        this.sco = o.sc;
                                        this.ch = 0;
                                        this.dark = o.dark;
                                        this.ani = o.ani;
                                    } else this.new_game();
                                }
                            });
                            clear(added);
                        },
                        chcb () {
                            if (1 == this.ch) {
                                this.hsc = lhs;
                                this.sco = ls;
                                for(let i = 0; i < 4; i++){
                                    for(let j = 0; j < 4; j++)board[i][j] = lm[i][j];
                                }
                                rm0(board);
                                over = 0;
                                this.save();
                                this.ch = 0;
                            } else _system.default.showToast({
                                message: "不能再撤啦",
                                duration: 1000
                            });
                        },
                        new_game () {
                            backup();
                            newgame();
                            this.sco = 0;
                            this.save();
                            clearani();
                        },
                        move (eve) {
                            if (this.menuFlag) {
                                if ("right" == eve.direction) this.exit('e');
                                return;
                            }
                            mo(eve.direction);
                            if (this.sco > this.hsc) this.hsc = this.sco;
                            this.save();
                        },
                        save () {
                            let o = {
                                map: board,
                                hs: this.hsc,
                                sc: this.sco,
                                dark: this.dark,
                                ani: this.ani
                            };
                            _system2.default.set({
                                key: "score",
                                value: JSON.stringify(o),
                                success: ()=>{},
                                fail: ()=>{}
                            });
                        },
                        exit (a) {
                            if ('right' == a.direction || "e" == a) if (this.menuFlag) {
                                _system3.default.to({
                                    id: "about",
                                    toState: {
                                        translateX: "192px"
                                    },
                                    config: {
                                        duration: 0.1,
                                        ease: "out"
                                    }
                                });
                                setTimeout(()=>{
                                    this.menuFlag = false;
                                }, 100);
                            } else this.$app.exit();
                        },
                        openMenu () {
                            this.menuFlag = true;
                            setTimeout(()=>{
                                _system3.default.to({
                                    id: "about",
                                    toState: {
                                        translateX: "0px"
                                    },
                                    config: {
                                        duration: 0.1,
                                        ease: "out"
                                    }
                                });
                            }, 50);
                        },
                        changeMode () {
                            this.dark = !this.dark;
                            this.save();
                        },
                        changeani () {
                            this.ani = !this.ani;
                            this.save();
                        },
                        onBackPress () {
                            this.exit('e');
                            return true;
                        }
                    };
                    function rm0(sm) {
                        let a = 0;
                        for(let i = 0; i < 4; i++){
                            for(var b = 0; 4 > b; b++){
                                if (0 == sm[i][b]) {
                                    that.md[a] = "";
                                    that.ise[a] = "#00000000";
                                } else {
                                    that.ise[a] = "#ffffff20";
                                    that.md[a] = sm[i][b];
                                }
                                a++;
                            }
                        }
                        return;
                    }
                    function clear(m) {
                        for(let i = 0; i < 4; i++)m[i].fill(0);
                    }
                    function newgame() {
                        over = 0;
                        clear(board);
                        newblock();
                        newblock();
                        rm0(board);
                    }
                    function rand_num() {
                        return Math.floor(1000 * Math.random());
                    }
                    function newblock() {
                        for(var a = 3, b = rand_num() % 4, c = rand_num() % 4, d = 50 < rand_num() % 100 ? 4 : 2; 0 < a;){
                            if (0 == board[b][c]) return board[b][c] = d;
                            b = rand_num() % 4;
                            c = rand_num() % 4;
                            a--;
                        }
                        for(a = 0; 4 > a; a++)for(b = 0; 4 > b; b++)if (0 == board[a][b]) return board[a][b] = 2;
                    }
                    function mo(dir) {
                        let up = canMoveUp(board), down = canMoveDown(board), right = canMoveRight(board), left = canMoveLeft(board);
                        if (up || left || down || right) {
                            if (eval(dir)) {
                                backup();
                                eval("move" + dir + "()");
                                clear(added);
                                if (that.ani) {
                                    setTimeout(()=>{
                                        clearani();
                                    }, 120);
                                    setTimeout(()=>{
                                        newblock();
                                        rm0(board);
                                    }, 110);
                                } else {
                                    newblock();
                                    rm0(board);
                                }
                            }
                        }
                        rm0(board);
                        return;
                    }
                    function backup() {
                        for(let i = 0; i < 4; i++){
                            for(let j = 0; j < 4; j++)lm[i][j] = board[i][j];
                        }
                        ls = that.sco;
                        lhs = that.hsc;
                        that.ch = 1;
                        return;
                    }
                    function fromTo(id1, id2) {
                        if (that.ani) {
                            id1 = id1.toString();
                            id2 = id2.toString();
                            let x1, y1, x2, y2;
                            that.$element(id1).getBoundingClientRect({
                                success: (data)=>{
                                    let { top, bottom, left, right, width, height } = data;
                                    x1 = left;
                                    y1 = top;
                                }
                            });
                            that.$element(id2).getBoundingClientRect({
                                success: (data)=>{
                                    let { top, bottom, left, right, width, height } = data;
                                    x2 = left;
                                    y2 = top;
                                }
                            });
                            x2 -= x1;
                            y2 -= y1;
                            _system3.default.fromTo({
                                id: id1,
                                fromState: {
                                    translateY: "0px",
                                    translateX: "0px"
                                },
                                toState: {
                                    translateY: y2 + "px",
                                    translateX: x2 + "px"
                                },
                                config: {
                                    duration: 0.1
                                }
                            });
                        }
                        return 0;
                    }
                    function clearani() {
                        for(let i = 0; i < 16; i++){
                            let id = i.toString();
                            _system3.default.cancel({
                                id: id
                            });
                            _system3.default.setTo({
                                id: id,
                                toState: {
                                    translateY: "0px",
                                    translateX: "0px"
                                }
                            });
                        }
                    }
                    function moveleft() {
                        for(var a = 0; 4 > a; a++)for(var b = 1; 4 > b; b++)if (0 != board[a][b]) for(var c = 0; c < b; c++)if (0 == board[a][c] && noBlockHorizontal(a, c, b, board)) {
                            board[a][c] = board[a][b], board[a][b] = 0;
                            fromTo(4 * a + b, 4 * a + c);
                            break;
                        } else board[a][c] == board[a][b] && noBlockHorizontal(a, c, b, board) && (0 != added[a][c] ? (board[a][c + 1] = board[a][b], board[a][b] = 0, fromTo(4 * a + b, 4 * a + c + 1)) : (board[a][c] += board[a][b], that.sco += 2 * board[a][b], board[a][b] = 0, added[a][c] = 1, fromTo(4 * a + b, 4 * a + c)));
                        return !0;
                    }
                    function moveright() {
                        for(var a = 0; 4 > a; a++)for(var b = 2; 0 <= b; b--)if (0 != board[a][b]) for(var c = 3; c > b; c--)if (0 == board[a][c] && noBlockHorizontal(a, b, c, board)) {
                            board[a][c] = board[a][b], board[a][b] = 0;
                            fromTo(4 * a + b, 4 * a + c);
                            break;
                        } else board[a][c] == board[a][b] && noBlockHorizontal(a, b, c, board) && (0 != added[a][c] ? (board[a][c - 1] = board[a][b], board[a][b] = 0, fromTo(4 * a + b, 4 * a + c - 1)) : (board[a][c] += board[a][b], that.sco += 2 * board[a][b], board[a][b] = 0, added[a][c] = 1, fromTo(4 * a + b, 4 * a + c)));
                        return !0;
                    }
                    function moveup() {
                        for(var a = 0; 4 > a; a++)for(var b = 1; 4 > b; b++)if (0 != board[b][a]) for(var c = 0; c < b; c++)if (0 == board[c][a] && noBlockVertical(a, c, b, board)) {
                            board[c][a] = board[b][a], board[b][a] = 0;
                            fromTo(4 * b + a, 4 * c + a);
                            break;
                        } else board[c][a] == board[b][a] && noBlockVertical(a, c, b, board) && (0 != added[c][a] ? (board[c + 1][a] = board[b][a], board[b][a] = 0, fromTo(4 * b + a, (c + 1) * 4 + a)) : (board[c][a] += board[b][a], that.sco += board[c][a], board[b][a] = 0, added[c][a] = 1, fromTo(4 * b + a, 4 * c + a)));
                    }
                    function movedown() {
                        for(var a = 0; 4 > a; a++)for(var b = 2; 0 <= b; b--)if (0 != board[b][a]) for(var c = 3; c > b; c--)if (0 == board[c][a] && noBlockVertical(a, b, c, board)) {
                            board[c][a] = board[b][a], board[b][a] = 0;
                            fromTo(4 * b + a, 4 * c + a);
                            break;
                        } else board[c][a] == board[b][a] && noBlockVertical(a, b, c, board) && (0 != added[c][a] ? (board[c - 1][a] = board[b][a], board[b][a] = 0, fromTo(4 * b + a, (c - 1) * 4 + a)) : (board[c][a] += board[b][a], that.sco += board[c][a], board[b][a] = 0, added[c][a] = 1, fromTo(4 * b + a, 4 * c + a)));
                    }
                    function canMoveLeft(a) {
                        for(var b = 0; 4 > b; b++)for(var c = 0; 4 > c; c++)if (0 != a[b][c] && 0 != c && (0 == a[b][c - 1] || a[b][c - 1] == a[b][c])) return !0;
                        return !1;
                    }
                    function canMoveRight(a) {
                        for(var b = 0; 4 > b; b++)for(var c = 0; 4 > c; c++)if (0 != a[b][c] && 3 != c && (0 == a[b][c + 1] || a[b][c + 1] == a[b][c])) return !0;
                        return !1;
                    }
                    function canMoveUp(a) {
                        for(var b = 0; 4 > b; b++)for(var c = 0; 4 > c; c++)if (0 != a[b][c] && 0 != b && (0 == a[b - 1][c] || a[b - 1][c] == a[b][c])) return !0;
                        return !1;
                    }
                    function canMoveDown(a) {
                        for(var b = 0; 4 > b; b++)for(var c = 0; 4 > c; c++)if (0 != a[b][c] && 3 != b && (0 == a[b + 1][c] || a[b + 1][c] == a[b][c])) return !0;
                        return !1;
                    }
                    function noBlockHorizontal(a, b, c, d) {
                        for(b += 1; b < c; b++)if (0 != d[a][b]) return !1;
                        return !0;
                    }
                    function noBlockVertical(a, b, c, d) {
                        for(b += 1; b < c; b++)if (0 != d[b][a]) return !1;
                        return !0;
                    }
                    const moduleOwn = exports.default || module.exports;
                    const accessors = [
                        'public',
                        'protected',
                        'private'
                    ];
                    if (moduleOwn.data && accessors.some(function(acc) {
                        return moduleOwn[acc];
                    })) throw new Error('页面VM对象中的属性data不可与"' + accessors.join(',') + '"同时存在，请使用private替换data名称');
                    if (!moduleOwn.data) {
                        moduleOwn.data = {};
                        moduleOwn._descriptor = {};
                        accessors.forEach(function(acc) {
                            const accType = typeof moduleOwn[acc];
                            if ('object' === accType) {
                                moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
                                for(const name in moduleOwn[acc])moduleOwn._descriptor[name] = {
                                    access: acc
                                };
                            } else if ('function' === accType) console.warn('页面VM对象中的属性' + acc + '的值不能是函数，请使用对象');
                        });
                    }
                };
                var $app_template$ = function(vm) {
                    const _vm_ = vm || this;
                    return aiot.__ce__("div", {
                        __vm__: _vm_,
                        __opts__: {
                            events: {
                                swipe: function(evt) {
                                    return _vm_.move(evt);
                                }
                            },
                            classList: [
                                "bg"
                            ]
                        }
                    }, [
                        aiot.__ci__({
                            __vm__: _vm_,
                            __opts__: {
                                shown: function() {
                                    return _vm_.dark;
                                }
                            }
                        }, function() {
                            return [
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "bg"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            src: "/common/bg2.png",
                                            classList: [
                                                "bg"
                                            ]
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "8px",
                                                top: "347px"
                                            },
                                            src: "/common/reset_b.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.new_game(evt);
                                                }
                                            }
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "100px",
                                                top: "347px"
                                            },
                                            src: "/common/undo_b.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.chcb(evt);
                                                }
                                            }
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "56px",
                                                top: "405px"
                                            },
                                            src: "/common/info_b.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.openMenu(evt);
                                                }
                                            }
                                        }
                                    }, [])
                                ])
                            ];
                        }),
                        aiot.__ci__({
                            __vm__: _vm_,
                            __opts__: {
                                shown: function() {
                                    return !_vm_.dark;
                                }
                            }
                        }, function() {
                            return [
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "bg"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            src: "/common/bg1.png",
                                            classList: [
                                                "bg"
                                            ]
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "8px",
                                                top: "347px"
                                            },
                                            src: "/common/reset.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.new_game(evt);
                                                }
                                            }
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "100px",
                                                top: "347px"
                                            },
                                            src: "/common/undo.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.chcb(evt);
                                                }
                                            }
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "56px",
                                                top: "405px"
                                            },
                                            src: "/common/info.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.openMenu(evt);
                                                }
                                            }
                                        }
                                    }, [])
                                ])
                            ];
                        }),
                        aiot.__ce__("div", {
                            __vm__: _vm_,
                            __opts__: {
                                style: {
                                    position: "absolute",
                                    left: "5px",
                                    top: "156px",
                                    width: "186px",
                                    height: "186px",
                                    paddingTop: "3px",
                                    paddingLeft: "3px",
                                    display: "flex",
                                    flexWrap: "wrap"
                                }
                            }
                        }, [
                            aiot.__ci__({
                                __vm__: _vm_,
                                __opts__: {
                                    shown: function() {
                                        return !_vm_.dark;
                                    }
                                }
                            }, function() {
                                return [
                                    aiot.__cf__({
                                        __vm__: _vm_,
                                        __opts__: {
                                            exp: function() {
                                                return _vm_.blocks;
                                            },
                                            key: "$idx",
                                            value: "$item"
                                        }
                                    }, function($idx, $item) {
                                        return [
                                            aiot.__ce__("text", {
                                                __vm__: _vm_,
                                                __opts__: {
                                                    classList: [
                                                        "square"
                                                    ],
                                                    style: function() {
                                                        return __webpack_require__.g.$translateStyle$("background-color: " + _vm_.bgc[_vm_.md[$item]] + ";");
                                                    },
                                                    id: function() {
                                                        return $item;
                                                    },
                                                    value: function() {
                                                        return _vm_.md[$item];
                                                    }
                                                }
                                            }, [])
                                        ];
                                    })
                                ];
                            }),
                            aiot.__ci__({
                                __vm__: _vm_,
                                __opts__: {
                                    shown: function() {
                                        return !!_vm_.dark;
                                    }
                                }
                            }, function() {
                                return [
                                    aiot.__cf__({
                                        __vm__: _vm_,
                                        __opts__: {
                                            exp: function() {
                                                return _vm_.blocks;
                                            },
                                            key: "$idx",
                                            value: "$item"
                                        }
                                    }, function($idx, $item) {
                                        return [
                                            aiot.__ce__("text", {
                                                __vm__: _vm_,
                                                __opts__: {
                                                    classList: [
                                                        "square"
                                                    ],
                                                    style: function() {
                                                        return __webpack_require__.g.$translateStyle$("color: " + _vm_.bgc[_vm_.md[$item]] + ";background-color: " + _vm_.ise[$item]);
                                                    },
                                                    id: function() {
                                                        return $item;
                                                    },
                                                    value: function() {
                                                        return _vm_.md[$item];
                                                    }
                                                }
                                            }, [])
                                        ];
                                    })
                                ];
                            })
                        ]),
                        aiot.__ce__("text", {
                            __vm__: _vm_,
                            __opts__: {
                                classList: [
                                    "score"
                                ],
                                value: function() {
                                    return "最高 " + _vm_.hsc;
                                }
                            }
                        }, []),
                        aiot.__ce__("text", {
                            __vm__: _vm_,
                            __opts__: {
                                classList: [
                                    "score"
                                ],
                                style: {
                                    top: "115px"
                                },
                                value: function() {
                                    return "当前 " + _vm_.sco;
                                }
                            }
                        }, []),
                        aiot.__ci__({
                            __vm__: _vm_,
                            __opts__: {
                                shown: function() {
                                    return _vm_.menuFlag;
                                }
                            }
                        }, function() {
                            return [
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "bg"
                                        ],
                                        style: {
                                            backgroundColor: "rgba(0, 0, 0, 0)"
                                        }
                                    }
                                }, [
                                    aiot.__ce__("scroll", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "bg"
                                            ],
                                            scrollY: "true",
                                            bounces: "true",
                                            id: "about",
                                            style: {
                                                transform: "{\"translateX\":\"192px\"}"
                                            }
                                        }
                                    }, [
                                        aiot.__ce__("image", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                src: "/common/about.png"
                                            }
                                        }, []),
                                        aiot.__ci__({
                                            __vm__: _vm_,
                                            __opts__: {
                                                shown: function() {
                                                    return _vm_.dark;
                                                }
                                            }
                                        }, function() {
                                            return [
                                                aiot.__ce__("image", {
                                                    __vm__: _vm_,
                                                    __opts__: {
                                                        src: "/common/true.png",
                                                        classList: [
                                                            "btn"
                                                        ],
                                                        events: {
                                                            click: function(evt) {
                                                                return _vm_.changeMode(evt);
                                                            }
                                                        }
                                                    }
                                                }, [])
                                            ];
                                        }),
                                        aiot.__ci__({
                                            __vm__: _vm_,
                                            __opts__: {
                                                shown: function() {
                                                    return !_vm_.dark;
                                                }
                                            }
                                        }, function() {
                                            return [
                                                aiot.__ce__("image", {
                                                    __vm__: _vm_,
                                                    __opts__: {
                                                        src: "/common/false.png",
                                                        classList: [
                                                            "btn"
                                                        ],
                                                        events: {
                                                            click: function(evt) {
                                                                return _vm_.changeMode(evt);
                                                            }
                                                        }
                                                    }
                                                }, [])
                                            ];
                                        }),
                                        aiot.__ci__({
                                            __vm__: _vm_,
                                            __opts__: {
                                                shown: function() {
                                                    return _vm_.ani;
                                                }
                                            }
                                        }, function() {
                                            return [
                                                aiot.__ce__("image", {
                                                    __vm__: _vm_,
                                                    __opts__: {
                                                        src: "/common/true.png",
                                                        classList: [
                                                            "btn"
                                                        ],
                                                        style: {
                                                            top: "674px"
                                                        },
                                                        events: {
                                                            click: function(evt) {
                                                                return _vm_.changeani(evt);
                                                            }
                                                        }
                                                    }
                                                }, [])
                                            ];
                                        }),
                                        aiot.__ci__({
                                            __vm__: _vm_,
                                            __opts__: {
                                                shown: function() {
                                                    return !_vm_.ani;
                                                }
                                            }
                                        }, function() {
                                            return [
                                                aiot.__ce__("image", {
                                                    __vm__: _vm_,
                                                    __opts__: {
                                                        src: "/common/false.png",
                                                        classList: [
                                                            "btn"
                                                        ],
                                                        events: {
                                                            click: function(evt) {
                                                                return _vm_.changeani(evt);
                                                            }
                                                        },
                                                        style: {
                                                            top: "674px"
                                                        }
                                                    }
                                                }, [])
                                            ];
                                        })
                                    ])
                                ])
                            ];
                        }),
                        aiot.__ci__({
                            __vm__: _vm_,
                            __opts__: {
                                shown: function() {
                                    return _vm_.dark || _vm_.menuFlag;
                                }
                            }
                        }, function() {
                            return [
                                aiot.__ce__("image", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        style: {
                                            position: "absolute",
                                            left: "45px",
                                            top: "6px"
                                        },
                                        src: "/common/back_b.png",
                                        events: {
                                            click: function(evt) {
                                                return _vm_.exit("e", evt);
                                            }
                                        }
                                    }
                                }, [])
                            ];
                        }),
                        aiot.__ci__({
                            __vm__: _vm_,
                            __opts__: {
                                shown: function() {
                                    return !(_vm_.dark || _vm_.menuFlag);
                                }
                            }
                        }, function() {
                            return [
                                aiot.__ce__("image", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        style: {
                                            position: "absolute",
                                            left: "45px",
                                            top: "6px"
                                        },
                                        src: "/common/back.png",
                                        events: {
                                            click: function(evt) {
                                                return _vm_.exit("e", evt);
                                            }
                                        }
                                    }
                                }, [])
                            ];
                        })
                    ]);
                };
                $app_exports$['entry'] = function($app_exports$) {
                    $app_script$({}, $app_exports$, $app_require$1);
                    $app_exports$.default.template = $app_template$;
                    $app_exports$.default.style = $app_style$;
                };
            })();
        };
        return createPageHandler();
    })(global, globalThis, window, $app_exports$, $app_evaluate$);
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXNcXGluZGV4XFxpbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvcnNwYWNrX3ZlcnNpb24iLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9yc3BhY2tfdW5pcXVlX2lkIiwid2VicGFjazovLy9zcmMvcGFnZXMvaW5kZXgvaW5kZXgudXgiXSwic291cmNlc0NvbnRlbnQiOlsiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKCgpID0+IHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ydiA9ICgpID0+IChcIjEuNC4xMVwiKSIsIl9fd2VicGFja19yZXF1aXJlX18ucnVpZCA9IFwiYnVuZGxlcj1yc3BhY2tAMS40LjExXCI7XG4iLCI8dGVtcGxhdGU+XHJcblx0PGRpdiBvbnN3aXBlPVwibW92ZVwiIGNsYXNzPVwiYmdcIj5cclxuXHRcdDwhLS3og4zmma8r5oyJ6ZKuLS0+XHJcblx0XHQ8ZGl2IGNsYXNzPVwiYmdcIiBpZj1cInt7ZGFya319XCI+XHJcblx0XHRcdDxpbWcgc3JjPVwiL2NvbW1vbi9iZzIucG5nXCIgY2xhc3M9XCJiZ1wiLz5cclxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA4cHg7dG9wOiAzNDdweDtcIiBzcmM9XCIvY29tbW9uL3Jlc2V0X2IucG5nXCIgQGNsaWNrPVwibmV3X2dhbWVcIiAvPlxyXG5cdFx0XHQ8aW1nIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlO2xlZnQ6IDEwMHB4O3RvcDogMzQ3cHg7XCIgc3JjPVwiL2NvbW1vbi91bmRvX2IucG5nXCIgQGNsaWNrPVwiY2hjYlwiIC8+XHJcblx0XHRcdDxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogNTZweDt0b3A6IDQwNXB4O1wiIHNyYz1cIi9jb21tb24vaW5mb19iLnBuZ1wiIEBjbGljaz1cIm9wZW5NZW51KClcIi8+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDxkaXYgY2xhc3M9XCJiZ1wiIGVsc2U+XHJcblx0XHRcdDxpbWcgc3JjPVwiL2NvbW1vbi9iZzEucG5nXCIgY2xhc3M9XCJiZ1wiLz5cclxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA4cHg7dG9wOiAzNDdweDtcIiBzcmM9XCIvY29tbW9uL3Jlc2V0LnBuZ1wiIEBjbGljaz1cIm5ld19nYW1lXCIgLz5cclxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiAxMDBweDt0b3A6IDM0N3B4O1wiIHNyYz1cIi9jb21tb24vdW5kby5wbmdcIiBAY2xpY2s9XCJjaGNiXCIgLz5cclxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA1NnB4O3RvcDogNDA1cHg7XCIgc3JjPVwiL2NvbW1vbi9pbmZvLnBuZ1wiIEBjbGljaz1cIm9wZW5NZW51KClcIi8+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDwhLS3kuK3pl7QtLT5cclxuXHRcdDxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogNXB4O3RvcDogMTU2cHg7d2lkdGg6IDE4NnB4O2hlaWdodDogMTg2cHg7cGFkZGluZy10b3A6IDNweDtwYWRkaW5nLWxlZnQ6M3B4O2Rpc3BsYXk6IGZsZXg7ZmxleC13cmFwOiB3cmFwO1wiID5cclxuXHRcdFx0PHRleHQgY2xhc3M9XCJzcXVhcmVcIiBmb3I9XCJ7e2Jsb2Nrc319XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB7e2JnY1ttZFskaXRlbV1dfX07XCIgaWQ9e3skaXRlbX19ICBpZj1cInt7IWRhcmt9fVwiPlxyXG5cdFx0XHRcdHt7IG1kWyRpdGVtXSB9fVxyXG5cdFx0XHQ8L3RleHQ+XHJcblx0XHRcdDx0ZXh0IGNsYXNzPVwic3F1YXJlXCIgZm9yPVwie3tibG9ja3N9fVwiIHN0eWxlPVwiY29sb3I6IHt7YmdjW21kWyRpdGVtXV19fTtiYWNrZ3JvdW5kLWNvbG9yOiB7e2lzZVskaXRlbV19fVwiIGlkPXt7JGl0ZW19fSBlbHNlID5cclxuXHRcdFx0XHR7eyBtZFskaXRlbV0gfX0gXHJcblx0XHRcdDwvdGV4dD5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PCEtLeenr+WIhueJiC0tPlxyXG5cdFx0PHRleHQgY2xhc3M9XCJzY29yZVwiPuacgOmrmCB7eyBoc2MgfX08L3RleHQ+XHJcblx0XHQ8dGV4dCBjbGFzcz1cInNjb3JlXCJzdHlsZT1cInRvcDogMTE1cHg7XCI+5b2T5YmNIHt7IHNjbyB9fTwvdGV4dD5cclxuXHRcdDwhLS1hYm91dC0tPlxyXG5cdFx0PGRpdiBjbGFzcz1cImJnXCIgaWY9XCJ7e21lbnVGbGFnfX1cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwwKVwiPlxyXG5cdFx0PHNjcm9sbCBjbGFzcz1cImJnXCIgc2Nyb2xsLXk9XCJ0cnVlXCIgYm91bmNlcz1cInRydWVcIiBpZD1cImFib3V0XCIgc3R5bGU9XCJ0cmFuc2Zvcm06dHJhbnNsYXRlWCgxOTJweClcIj5cclxuXHRcdFx0PGltZyBzcmM9XCIvY29tbW9uL2Fib3V0LnBuZ1wiLz5cclxuXHRcdFx0PGltZyBzcmM9XCIvY29tbW9uL3RydWUucG5nXCIgaWY9XCJ7e2Rhcmt9fVwiIGNsYXNzPVwiYnRuXCJvbmNsaWNrPVwiY2hhbmdlTW9kZVwiLz5cclxuXHRcdFx0PGltZyBzcmM9XCIvY29tbW9uL2ZhbHNlLnBuZ1wiIGVsc2UgY2xhc3M9XCJidG5cIm9uY2xpY2s9XCJjaGFuZ2VNb2RlXCIvPlxyXG5cdFx0XHQ8aW1nIHNyYz1cIi9jb21tb24vdHJ1ZS5wbmdcIiBpZj1cInt7YW5pfX1cIiBjbGFzcz1cImJ0blwiIHN0eWxlPVwidG9wOiA2NzRweDtcIiBvbmNsaWNrPVwiY2hhbmdlYW5pXCIvPlxyXG5cdFx0XHQ8aW1nIHNyYz1cIi9jb21tb24vZmFsc2UucG5nXCIgZWxzZSBjbGFzcz1cImJ0blwib25jbGljaz1cImNoYW5nZWFuaVwic3R5bGU9XCJ0b3A6IDY3NHB4O1wiLz5cclxuXHRcdDwvc2Nyb2xsPjwvZGl2PlxyXG5cdFx0PCEtLWJhY2stLT5cclxuXHRcdDxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogNDVweDt0b3A6IDZweDtcIiBzcmM9XCIvY29tbW9uL2JhY2tfYi5wbmdcIiBAY2xpY2s9XCJleGl0KCdlJylcIiBpZj1cInt7ZGFya3x8bWVudUZsYWd9fVwiLz5cclxuXHRcdDxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogNDVweDt0b3A6IDZweDtcIiBzcmM9XCIvY29tbW9uL2JhY2sucG5nXCIgQGNsaWNrPVwiZXhpdCgnZScpXCIgZWxzZS8+XHJcblx0PC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c3R5bGU+XHJcbnRleHR7XHJcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5zY29yZSB7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdGxlZnQ6IDBweDtcclxuXHR0b3A6IDc1cHg7XHJcblx0d2lkdGg6IDE5MnB4O1xyXG5cdGZvbnQtc2l6ZTogMjhweDtcclxuXHRjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xyXG59XHJcbi5zcXVhcmUge1xyXG5cdHdpZHRoOiA0MHB4O1xyXG5cdGhlaWdodDogNDBweDtcclxuXHRtYXJnaW4tdG9wOiA0cHg7XHJcblx0bWFyZ2luLWxlZnQ6IDRweDtcclxuXHRib3JkZXItcmFkaXVzOiAxM3B4O1xyXG5cdGZvbnQtc2l6ZTogMTVweDtcclxuXHRjb2xvcjogIzU5NTAzZjtcclxufVxyXG4uYmd7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHdpZHRoOiAxOTJweDtcclxuICBoZWlnaHQ6IDQ2OXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG59XHJcbi5idG57XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdGxlZnQ6IDQ1cHg7XHJcblx0dG9wOiA1MDRweDtcclxufVxyXG48L3N0eWxlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHByb21wdCBmcm9tIFwiQHN5c3RlbS5wcm9tcHRcIjtcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIkBzeXN0ZW0uc3RvcmFnZVwiO1xyXG5pbXBvcnQgZm9sbWUgZnJvbSAnQHN5c3RlbS5mb2xtZSdcclxuXHJcbnZhciBzYyA9IDAsXHJcblx0bHMsXHJcblx0bGhzLFxyXG5cdGJvYXJkID0gQXJyYXkoNCksXHJcblx0YWRkZWQgPSBBcnJheSg0KSxcclxuXHRvdmVyID0gMCxcclxuXHRsbSA9QXJyYXkoNCksXHJcblx0dGhhdDtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtsbVtpXT1uZXcgQXJyYXkoNCk7Ym9hcmRbaV09bmV3IEFycmF5KDQpO2FkZGVkW2ldPW5ldyBBcnJheSg0KX1cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdHB1YmxpYzoge1xyXG5cdFx0YmxvY2tzOiBbXHJcblx0XHRcdFwiMFwiLFxyXG5cdFx0XHRcIjFcIixcclxuXHRcdFx0XCIyXCIsXHJcblx0XHRcdFwiM1wiLFxyXG5cdFx0XHRcIjRcIixcclxuXHRcdFx0XCI1XCIsXHJcblx0XHRcdFwiNlwiLFxyXG5cdFx0XHRcIjdcIixcclxuXHRcdFx0XCI4XCIsXHJcblx0XHRcdFwiOVwiLFxyXG5cdFx0XHRcIjEwXCIsXHJcblx0XHRcdFwiMTFcIixcclxuXHRcdFx0XCIxMlwiLFxyXG5cdFx0XHRcIjEzXCIsXHJcblx0XHRcdFwiMTRcIixcclxuXHRcdFx0XCIxNVwiLFxyXG5cdFx0XSxcclxuXHRcdG1kOiBbXSxcclxuXHRcdGhzYzogMCxcclxuXHRcdHNjbzogc2MsXHJcblx0XHRiZ2M6IFtdLFxyXG5cdFx0aXNlOiBbXSxcclxuXHRcdGNoOjAsXHJcblx0XHRkYXJrOmZhbHNlLFxyXG5cdFx0bWVudUZsYWc6ZmFsc2UsXHJcblx0XHRhbmk6dHJ1ZVxyXG5cdH0sXHJcblx0b25Jbml0KCkge1xyXG5cdFx0dGhhdCA9IHRoaXM7XHJcblx0XHRsZXQgdGVtcGMgPVxyXG5cdFx0XHRcInJnYmEoMCwwLDAsMCkgI0VGRTVEQSAjRjBFMEM5ICNmY2I0NzcgI2ZmOWM2MSAjZmY4NjVkICNmZjZhMzggI2ViY2Y3MSAjZWJjYzVmICNlYmM5NGYgI2ViYzUzZiAjZWJjMjJjICNGMkI2QjYgI0U4RUQ1MSAjRkZFM0ZCICNFOEZGOEMgI0ZGREVDOSAjRjVBNDMzICNFNjEwOUIgIzk2QzRFNiAjRTU2MENEXCIuc3BsaXQoXHJcblx0XHRcdFx0XCIgXCJcclxuXHRcdFx0KTtcclxuXHRcdHRlbXBjLmZvckVhY2goKGEsIGluZGV4KSA9PiB7XHJcblx0XHRcdHRoaXMuYmdjWzIgKiogaW5kZXhdID0gYTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5iZ2NbXCJcIl0gPSBcInJnYmEoMCwgMCwgMCwgMClcIjtcclxuXHRcdHN0b3JhZ2UuZ2V0KHtcclxuXHRcdFx0a2V5OiBcInNjb3JlXCIsXHJcblx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdGxldCBvID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRcdGJvYXJkPW8ubWFwXHJcblx0XHRcdFx0XHRybTAoby5tYXApO1xyXG5cdFx0XHRcdFx0dGhpcy5oc2MgPSBvLmhzO1xyXG5cdFx0XHRcdFx0dGhpcy5zY289by5zY1xyXG5cdFx0XHRcdFx0dGhpcy5jaCA9IDA7XHJcblx0XHRcdFx0XHR0aGlzLmRhcms9by5kYXJrXHJcblx0XHRcdFx0XHR0aGlzLmFuaT1vLmFuaVxyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHR9IGVsc2UgdGhpcy5uZXdfZ2FtZSgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGNsZWFyKGFkZGVkKVxyXG5cdH0sXHJcblx0Y2hjYigpIHtcclxuXHRcdGlmICh0aGlzLmNoID09MSkge1xyXG5cdFx0XHR0aGlzLmhzYyA9IGxocztcclxuXHRcdFx0dGhpcy5zY28gPSBscztcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPDQ7IGkrKykge1xyXG5cdFx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKSB7XHJcblx0XHRcdFx0XHRib2FyZFtpXVtqXT1sbVtpXVtqXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRybTAoYm9hcmQpO1xyXG5cdFx0XHRvdmVyPTA7XHJcblx0XHRcdHRoaXMuc2F2ZSgpO1xyXG5cdFx0XHR0aGlzLmNoID0gMDtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICBcdFx0bWVzc2FnZTogXCLkuI3og73lho3mkqTllaZcIixcclxuICAgICAgICBcdFx0ZHVyYXRpb246IDEwMDBcclxuICAgICAgXHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bmV3X2dhbWUoKSB7XHJcblx0XHRiYWNrdXAoKVxyXG5cdFx0bmV3Z2FtZSgpO1xyXG5cdFx0dGhpcy5zY28gPSAwO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0XHRjbGVhcmFuaSgpXHJcblx0fSxcclxuXHRtb3ZlKGV2ZSkge1xyXG5cdFx0aWYodGhpcy5tZW51RmxhZyl7XHJcblx0XHRcdGlmKGV2ZS5kaXJlY3Rpb249PVwicmlnaHRcIil0aGlzLmV4aXQoJ2UnKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdG1vKGV2ZS5kaXJlY3Rpb24pO1xyXG5cdFx0aWYgKHRoaXMuc2NvID4gdGhpcy5oc2MpIHtcclxuXHRcdFx0dGhpcy5oc2MgPSB0aGlzLnNjbztcclxuXHRcdH1cclxuXHRcdHRoaXMuc2F2ZSgpO1xyXG5cdH0sXHJcblx0c2F2ZSgpIHtcclxuXHRcdGxldCBvID0ge1xyXG5cdFx0XHRtYXA6IGJvYXJkLFxyXG5cdFx0XHRoczogdGhpcy5oc2MsXHJcblx0XHRcdHNjOiB0aGlzLnNjbyxcclxuXHRcdFx0ZGFyazp0aGlzLmRhcmssXHJcblx0XHRcdGFuaTp0aGlzLmFuaVxyXG5cdFx0fTtcclxuXHRcdC8vbz1cIlwiXHJcblx0XHRzdG9yYWdlLnNldCh7XHJcblx0XHRcdGtleTogXCJzY29yZVwiLFxyXG5cdFx0XHR2YWx1ZTogSlNPTi5zdHJpbmdpZnkobyksXHJcblx0XHRcdHN1Y2Nlc3M6KCk9PnsvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG8pKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmYWlsOigpPT57fSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGV4aXQoYSkge1xyXG4gIFx0XHRpZihhLmRpcmVjdGlvbj09J3JpZ2h0J3x8YT09XCJlXCIpe1xyXG5cdFx0XHRpZih0aGlzLm1lbnVGbGFnKXtcclxuXHRcdFx0XHRmb2xtZS50byh7aWQ6XCJhYm91dFwiLHRvU3RhdGU6e3RyYW5zbGF0ZVg6XCIxOTJweFwifSxjb25maWc6e2R1cmF0aW9uOjAuMSxlYXNlOlwib3V0XCJ9fSk7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7dGhpcy5tZW51RmxhZyA9ZmFsc2U7fSwgMTAwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHRoaXMuJGFwcC5leGl0KCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0b3Blbk1lbnUoKSB7Ly/miZPlvIBhYm91dFxyXG4gIFx0XHR0aGlzLm1lbnVGbGFnID10cnVlO1xyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdGZvbG1lLnRvKHtpZDpcImFib3V0XCIsdG9TdGF0ZTp7dHJhbnNsYXRlWDpcIjBweFwifSxjb25maWc6e2R1cmF0aW9uOjAuMSxlYXNlOlwib3V0XCJ9fSk7XHJcblx0XHR9LCA1MCk7XHJcblx0fSxcclxuXHJcblx0Y2hhbmdlTW9kZSgpe1xyXG5cdFx0dGhpcy5kYXJrPSF0aGlzLmRhcms7XHJcblx0XHR0aGlzLnNhdmUoKVxyXG5cdH0sXHJcblx0Y2hhbmdlYW5pKCl7XHJcblx0XHR0aGlzLmFuaT0hdGhpcy5hbmk7XHJcblx0XHR0aGlzLnNhdmUoKVxyXG5cdH0sb25CYWNrUHJlc3MoKXtcclxuXHRcdHRoaXMuZXhpdCgnZScpXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn07XHJcbmZ1bmN0aW9uIHJtMChzbSkge1xyXG5cdGxldCBhPTA7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuXHRcdGZvciAodmFyIGIgPSAwOyA0ID4gYjsgYisrKSBcclxuXHRcdHtcclxuXHRcdFx0aWYgKHNtW2ldW2JdID09IDApIHtcclxuXHRcdFx0XHR0aGF0Lm1kW2FdPVwiXCJcclxuXHRcdFx0XHR0aGF0LmlzZVthXT1cIiMwMDAwMDAwMFwiO1xyXG5cdFx0XHR9IGVsc2Uge3RoYXQuaXNlW2FdPVwiI2ZmZmZmZjIwXCI7dGhhdC5tZFthXT1zbVtpXVtiXX1cclxuXHRcdFx0YSsrXHJcblx0XHR9fVxyXG5cdHJldHVyblxyXG59XHJcbmZ1bmN0aW9uIGNsZWFyKG0pey8v5riF56m65pWw57uEXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHttW2ldLmZpbGwoMCl9XHJcbn1cclxuZnVuY3Rpb24gbmV3Z2FtZSgpIHtcclxuXHQgKG92ZXIgPSAwKTtcclxuXHRjbGVhcihib2FyZClcclxuXHRuZXdibG9jaygpO1xyXG5cdG5ld2Jsb2NrKCk7XHJcblx0cm0wKGJvYXJkKTtcclxufVxyXG5mdW5jdGlvbiByYW5kX251bSgpey8v55Sf5oiQ6ZqP5py65pWw77yM5Li65LqG6YCC6YWNOOeahOS7o+eggVxyXG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMClcclxufVxyXG5mdW5jdGlvbiBuZXdibG9jaygpIHsvL+eUn+aIkOaWsOaWueWdl1xyXG5cdGZvciAodmFyIGEgPSAzLCBiID0gcmFuZF9udW0oKSAlIDQsIGMgPSByYW5kX251bSgpICUgNCwgZCA9IDUwIDwgcmFuZF9udW0oKSAlIDEwMCA/IDQgOiAyOyAwIDwgYTspIHtcclxuXHRcdGlmICgwID09IGJvYXJkW2JdW2NdKSByZXR1cm4gYm9hcmRbYl1bY10gPSBkXHJcblx0XHRiID0gcmFuZF9udW0oKSAlIDQ7XHJcblx0XHRjID0gcmFuZF9udW0oKSAlIDQ7XHJcblx0XHRhLS1cclxuXHR9XHJcblx0Zm9yIChhID0gMDsgNCA+IGE7IGErKylcclxuXHRcdGZvciAoYiA9IDA7IDQgPiBiOyBiKyspXHJcblx0XHRcdGlmICgwID09IGJvYXJkW2FdW2JdKSByZXR1cm4gYm9hcmRbYV1bYl0gPSAyXHJcbn1cclxuZnVuY3Rpb24gbW8oZGlyKSB7Ly/np7vliqjlh73mlbAyXG5cdFx0bGV0IHVwID0gY2FuTW92ZVVwKGJvYXJkKSxcblx0XHRcdGRvd24gPSBjYW5Nb3ZlRG93bihib2FyZCksXG5cdFx0XHRyaWdodCA9IGNhbk1vdmVSaWdodChib2FyZCksXG5cdFx0XHRsZWZ0ID0gY2FuTW92ZUxlZnQoYm9hcmQpO1xuXHRcdGlmICh1cCB8fCBsZWZ0IHx8IGRvd24gfHwgcmlnaHQpIHtcblx0XHRcdGlmKGV2YWwoZGlyKSl7XG5cdFx0XHRcdGJhY2t1cCgpXG5cdFx0XHRcdGV2YWwoXCJtb3ZlXCIrZGlyK1wiKClcIik7XG5cdFx0XHRcdGNsZWFyKGFkZGVkKVxuXHRcdFx0XHRpZih0aGF0LmFuaSl7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7Y2xlYXJhbmkoKX0sIDEyMCk7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7bmV3YmxvY2soKTtcblx0XHRcdFx0XHRybTAoYm9hcmQpO1xuXHRcdFx0XHRcdH0sIDExMCk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdG5ld2Jsb2NrKCk7XG5cdFx0XHRcdFx0cm0wKGJvYXJkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gXG5cdFx0cm0wKGJvYXJkKTtyZXR1cm5cblx0fVxyXG5mdW5jdGlvbiBiYWNrdXAoKXsvL+S9v+iDveWkn+aSpOWbnlxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDw0OyBpKyspIHtcclxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKSB7XHJcblx0XHRcdGxtW2ldW2pdPWJvYXJkW2ldW2pdXHJcblx0XHR9XHJcblx0fVxyXG5cdGxzID0gdGhhdC5zY29cclxuXHRsaHMgPSB0aGF0LmhzY1xyXG5cdHRoYXQuY2g9MVxyXG5cdHJldHVyblxyXG59XHJcbmZ1bmN0aW9uIGZyb21UbyhpZDEsaWQyKXsvL+WKqOeUu+WHveaVsO+8jOiuqWlkMeeahOeJqeWTgeenu+WKqOWIsGlkMlxyXG5cdGlmKHRoYXQuYW5pKXtcclxuXHRcdGlkMT1pZDEudG9TdHJpbmcoKVxyXG5cdFx0aWQyPWlkMi50b1N0cmluZygpXHJcblx0XHRsZXQgeDEseTEseDIseTI7XHJcblx0XHR0aGF0LiRlbGVtZW50KGlkMSkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KHtcclxuXHRcdFx0c3VjY2VzczogKGRhdGEpPT57XHJcblx0XHRcdFx0bGV0IHsgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0LCB3aWR0aCwgaGVpZ2h0IH0gPSBkYXRhO1xyXG5cdFx0XHRcdHgxPWxlZnQ7eTE9dG9wXHJcblx0XHR9fSlcclxuXHRcdHRoYXQuJGVsZW1lbnQoaWQyKS5nZXRCb3VuZGluZ0NsaWVudFJlY3Qoe1xyXG5cdFx0XHRzdWNjZXNzOiAoZGF0YSk9PntcclxuXHRcdFx0XHRsZXQgeyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQsIHdpZHRoLCBoZWlnaHQgfSA9IGRhdGE7XHJcblx0XHRcdFx0eDI9bGVmdDt5Mj10b3BcclxuXHRcdH19KVxyXG5cdFx0eDItPXgxO3kyLT15MVxyXG5cdFx0Zm9sbWUuZnJvbVRvKHtpZDppZDEsZnJvbVN0YXRlOnt0cmFuc2xhdGVZOlwiMHB4XCIsdHJhbnNsYXRlWDpcIjBweFwifSx0b1N0YXRlOnt0cmFuc2xhdGVZOnkyK1wicHhcIix0cmFuc2xhdGVYOngyK1wicHhcIn0sY29uZmlnOntkdXJhdGlvbjowLjF9fSk7XHJcblx0fVxyXG5cdHJldHVybiAwXHJcbn1cclxuZnVuY3Rpb24gY2xlYXJhbmkoKXsvL+a4hemZpOWKqOeUu1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgMTY7IGkrKykge1xyXG5cdFx0bGV0IGlkPWkudG9TdHJpbmcoKVxyXG5cdFx0Zm9sbWUuY2FuY2VsKHtpZDppZH0pXHJcblx0XHRmb2xtZS5zZXRUbyh7aWQ6aWQsdG9TdGF0ZTp7dHJhbnNsYXRlWTpcIjBweFwiLHRyYW5zbGF0ZVg6XCIwcHhcIn19KVxyXG5cdH1cclxufVxyXG5mdW5jdGlvbiBtb3ZlbGVmdCgpIHtcclxuXHRmb3IgKHZhciBhID0gMDsgNCA+IGE7IGErKylcclxuXHRcdGZvciAodmFyIGIgPSAxOyA0ID4gYjsgYisrKVxyXG5cdFx0XHRpZiAoMCAhPSBib2FyZFthXVtiXSlcclxuXHRcdFx0XHRmb3IgKHZhciBjID0gMDsgYyA8IGI7IGMrKykge1xyXG5cdFx0XHRcdFx0aWYoMCA9PSBib2FyZFthXVtjXSAmJiBub0Jsb2NrSG9yaXpvbnRhbChhLCBjLCBiLCBib2FyZCkpe1xyXG5cdFx0XHRcdFx0XHRib2FyZFthXVtjXSA9IGJvYXJkW2FdW2JdLCBib2FyZFthXVtiXSA9IDA7XHJcblx0XHRcdFx0XHRcdGZyb21UbyhhKjQrYixhKjQrYylcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgYm9hcmRbYV1bY10gPT0gYm9hcmRbYV1bYl0gJiYgbm9CbG9ja0hvcml6b250YWwoYSwgYywgYiwgYm9hcmQpICYmICgwICE9IGFkZGVkW2FdW2NdID8gKGJvYXJkW2FdW2MgKyAxXSA9IGJvYXJkW2FdW2JdLCBib2FyZFthXVtiXSA9IDAsZnJvbVRvKGEqNCtiLGEqNCtjKzEpKSA6IChib2FyZFthXVtjXSArPSBib2FyZFthXVtiXSx0aGF0LnNjbys9Ym9hcmRbYV1bYl0qMiwgYm9hcmRbYV1bYl0gPSAwLCBhZGRlZFthXVtjXSA9IDEsZnJvbVRvKGEqNCtiLGEqNCtjKSkpO31cclxuXHRcclxuXHRcclxuXHRyZXR1cm4gITBcclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZXJpZ2h0KCkge1xyXG5cdGZvciAodmFyIGEgPSAwOyA0ID4gYTsgYSsrKVxyXG5cdFx0Zm9yICh2YXIgYiA9IDI7IDAgPD0gYjsgYi0tKVxyXG5cdFx0XHRpZiAoMCAhPSBib2FyZFthXVtiXSlcclxuXHRcdFx0XHRmb3IgKHZhciBjID0gMzsgYyA+IGI7IGMtLSlcclxuXHRcdFx0XHRcdGlmKDAgPT0gYm9hcmRbYV1bY10gJiYgbm9CbG9ja0hvcml6b250YWwoYSwgYiwgYywgYm9hcmQpKXtib2FyZFthXVtjXSA9IGJvYXJkW2FdW2JdLCBib2FyZFthXVtiXSA9IDA7ZnJvbVRvKGEqNCtiLGEqNCtjKTticmVha31cclxuXHRcdFx0XHRcdGVsc2UgYm9hcmRbYV1bY10gPT0gYm9hcmRbYV1bYl0gJiYgbm9CbG9ja0hvcml6b250YWwoYSwgYiwgYywgYm9hcmQpICYmICgwICE9IGFkZGVkW2FdW2NdID8gKGJvYXJkW2FdW2MgLSAxXSA9IGJvYXJkW2FdW2JdLCBib2FyZFthXVtiXSA9IDAsZnJvbVRvKGEqNCtiLGEqNCtjLTEpKSA6IChib2FyZFthXVtjXSArPSBib2FyZFthXVtiXSx0aGF0LnNjbys9Ym9hcmRbYV1bYl0qMiwgYm9hcmRbYV1bYl0gPSAwLCBhZGRlZFthXVtjXSA9IDEsZnJvbVRvKGEqNCtiLGEqNCtjKSkpO1xyXG5cdFxyXG5cdFxyXG5cdHJldHVybiAhMFxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZldXAoKSB7XHJcblx0Zm9yICh2YXIgYSA9IDA7IDQgPiBhOyBhKyspXHJcblx0XHRmb3IgKHZhciBiID0gMTsgNCA+IGI7IGIrKylcclxuXHRcdFx0aWYgKDAgIT0gYm9hcmRbYl1bYV0pXHJcblx0XHRcdFx0Zm9yICh2YXIgYyA9IDA7IGMgPCBiOyBjKyspe1xyXG5cdFx0XHRcdFx0aWYoMCA9PSBib2FyZFtjXVthXSAmJiBub0Jsb2NrVmVydGljYWwoYSwgYywgYiwgYm9hcmQpKXtib2FyZFtjXVthXSA9IGJvYXJkW2JdW2FdLCBib2FyZFtiXVthXSA9IDA7ZnJvbVRvKGIqNCthLGMqNCthKTticmVha31cclxuXHRcdFx0XHRcdGVsc2UgYm9hcmRbY11bYV0gPT0gYm9hcmRbYl1bYV0gJiYgbm9CbG9ja1ZlcnRpY2FsKGEsIGMsIGIsIGJvYXJkKSAmJiAoMCAhPSBhZGRlZFtjXVthXSA/IChib2FyZFtjICsgMV1bYV0gPSBib2FyZFtiXVthXSwgYm9hcmRbYl1bYV0gPSAwLGZyb21UbyhiKjQrYSwoYysxKSo0K2EpKSA6IChib2FyZFtjXVthXSArPSBib2FyZFtiXVthXSx0aGF0LnNjbys9Ym9hcmRbY11bYV0sIGJvYXJkW2JdW2FdID0gMCwgYWRkZWRbY11bYV0gPSAxLGZyb21UbyhiKjQrYSxjKjQrYSkpKTt9XHJcbn1cclxuZnVuY3Rpb24gbW92ZWRvd24oKSB7XHJcblx0Zm9yICh2YXIgYSA9IDA7IDQgPiBhOyBhKyspXHJcblx0XHRmb3IgKHZhciBiID0gMjsgMCA8PSBiOyBiLS0pXHJcblx0XHRcdGlmICgwICE9IGJvYXJkW2JdW2FdKVxyXG5cdFx0XHRcdGZvciAodmFyIGMgPSAzOyBjID4gYjsgYy0tKXtpZigwID09IGJvYXJkW2NdW2FdICYmIG5vQmxvY2tWZXJ0aWNhbChhLCBiLCBjLCBib2FyZCkpe2JvYXJkW2NdW2FdID0gYm9hcmRbYl1bYV0sIGJvYXJkW2JdW2FdID0gMDtmcm9tVG8oYio0K2EsYyo0K2EpO2JyZWFrfWVsc2UgYm9hcmRbY11bYV0gPT0gYm9hcmRbYl1bYV0gJiYgbm9CbG9ja1ZlcnRpY2FsKGEsIGIsIGMsIGJvYXJkKSAmJiAoMCAhPSBhZGRlZFtjXVthXSA/IChib2FyZFtjIC0gMV1bYV0gPSBib2FyZFtiXVthXSwgYm9hcmRbYl1bYV0gPSAwLGZyb21UbyhiKjQrYSwoYy0xKSo0K2EpKSA6IChib2FyZFtjXVthXSArPSBib2FyZFtiXVthXSx0aGF0LnNjbys9Ym9hcmRbY11bYV0sIGJvYXJkW2JdW2FdID0gMCwgYWRkZWRbY11bYV0gPSAxLGZyb21UbyhiKjQrYSxjKjQrYSkpKTt9XHJcbn1cclxuZnVuY3Rpb24gY2FuTW92ZUxlZnQoYSkge1xyXG5cdGZvciAodmFyIGIgPSAwOyA0ID4gYjsgYisrKVxyXG5cdFx0Zm9yICh2YXIgYyA9IDA7IDQgPiBjOyBjKyspXHJcblx0XHRcdGlmICgwICE9IGFbYl1bY10gJiYgMCAhPSBjICYmICgwID09IGFbYl1bYyAtIDFdIHx8IGFbYl1bYyAtIDFdID09IGFbYl1bY10pKSByZXR1cm4gITA7XHJcblx0cmV0dXJuICExXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbk1vdmVSaWdodChhKSB7XHJcblx0Zm9yICh2YXIgYiA9IDA7IDQgPiBiOyBiKyspXHJcblx0XHRmb3IgKHZhciBjID0gMDsgNCA+IGM7IGMrKylcclxuXHRcdFx0aWYgKDAgIT0gYVtiXVtjXSAmJiAzICE9IGMgJiYgKDAgPT0gYVtiXVtjICsgMV0gfHwgYVtiXVtjICsgMV0gPT0gYVtiXVtjXSkpIHJldHVybiAhMDtcclxuXHRyZXR1cm4gITFcclxufVxyXG5cclxuZnVuY3Rpb24gY2FuTW92ZVVwKGEpIHtcclxuXHRmb3IgKHZhciBiID0gMDsgNCA+IGI7IGIrKylcclxuXHRcdGZvciAodmFyIGMgPSAwOyA0ID4gYzsgYysrKVxyXG5cdFx0XHRpZiAoMCAhPSBhW2JdW2NdICYmIDAgIT0gYiAmJiAoMCA9PSBhW2IgLSAxXVtjXSB8fCBhW2IgLSAxXVtjXSA9PSBhW2JdW2NdKSkgcmV0dXJuICEwO1xyXG5cdHJldHVybiAhMVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYW5Nb3ZlRG93bihhKSB7XHJcblx0Zm9yICh2YXIgYiA9IDA7IDQgPiBiOyBiKyspXHJcblx0XHRmb3IgKHZhciBjID0gMDsgNCA+IGM7IGMrKylcclxuXHRcdFx0aWYgKDAgIT0gYVtiXVtjXSAmJiAzICE9IGIgJiYgKDAgPT0gYVtiICsgMV1bY10gfHwgYVtiICsgMV1bY10gPT0gYVtiXVtjXSkpIHJldHVybiAhMDtcclxuXHRyZXR1cm4gITFcclxufVxyXG5cclxuZnVuY3Rpb24gbm9CbG9ja0hvcml6b250YWwoYSwgYiwgYywgZCkge1xyXG5cdGZvciAoYiArPSAxOyBiIDwgYzsgYisrKVxyXG5cdFx0aWYgKDAgIT0gZFthXVtiXSkgcmV0dXJuICExO1xyXG5cdHJldHVybiAhMFxyXG59XHJcblxyXG5mdW5jdGlvbiBub0Jsb2NrVmVydGljYWwoYSwgYiwgYywgZCkge1xyXG5cdGZvciAoYiArPSAxOyBiIDwgYzsgYisrKVxyXG5cdFx0aWYgKDAgIT0gZFtiXVthXSkgcmV0dXJuICExO1xyXG5cdHJldHVybiAhMFxyXG59XHJcblxyXG48L3NjcmlwdD4iXSwibmFtZXMiOlsiX193ZWJwYWNrX3JlcXVpcmVfXyIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImUiLCJ3aW5kb3ciLCJfc3lzdGVtIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIiRhcHBfcmVxdWlyZSQiLCJfc3lzdGVtMiIsIl9zeXN0ZW0zIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJzYyIsImxzIiwibGhzIiwiYm9hcmQiLCJBcnJheSIsImFkZGVkIiwib3ZlciIsImxtIiwidGhhdCIsImkiLCJfZGVmYXVsdCIsImV4cG9ydHMiLCJwdWJsaWMiLCJibG9ja3MiLCJtZCIsImhzYyIsInNjbyIsImJnYyIsImlzZSIsImNoIiwiZGFyayIsIm1lbnVGbGFnIiwiYW5pIiwib25Jbml0IiwidGVtcGMiLCJzcGxpdCIsImZvckVhY2giLCJhIiwiaW5kZXgiLCJzdG9yYWdlIiwiZ2V0Iiwia2V5Iiwic3VjY2VzcyIsImRhdGEiLCJvIiwiSlNPTiIsInBhcnNlIiwibWFwIiwicm0wIiwiaHMiLCJuZXdfZ2FtZSIsImNsZWFyIiwiY2hjYiIsImoiLCJzYXZlIiwicHJvbXB0Iiwic2hvd1RvYXN0IiwibWVzc2FnZSIsImR1cmF0aW9uIiwiYmFja3VwIiwibmV3Z2FtZSIsImNsZWFyYW5pIiwibW92ZSIsImV2ZSIsImRpcmVjdGlvbiIsImV4aXQiLCJtbyIsInNldCIsInZhbHVlIiwic3RyaW5naWZ5IiwiZmFpbCIsImZvbG1lIiwidG8iLCJpZCIsInRvU3RhdGUiLCJ0cmFuc2xhdGVYIiwiY29uZmlnIiwiZWFzZSIsInNldFRpbWVvdXQiLCIkYXBwIiwib3Blbk1lbnUiLCJjaGFuZ2VNb2RlIiwiY2hhbmdlYW5pIiwib25CYWNrUHJlc3MiLCJzbSIsImIiLCJtIiwiZmlsbCIsIm5ld2Jsb2NrIiwicmFuZF9udW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjIiwiZCIsImRpciIsInVwIiwiY2FuTW92ZVVwIiwiZG93biIsImNhbk1vdmVEb3duIiwicmlnaHQiLCJjYW5Nb3ZlUmlnaHQiLCJsZWZ0IiwiY2FuTW92ZUxlZnQiLCJldmFsIiwiZnJvbVRvIiwiaWQxIiwiaWQyIiwidG9TdHJpbmciLCJ4MSIsInkxIiwieDIiLCJ5MiIsIiRlbGVtZW50IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiYm90dG9tIiwid2lkdGgiLCJoZWlnaHQiLCJmcm9tU3RhdGUiLCJ0cmFuc2xhdGVZIiwiY2FuY2VsIiwic2V0VG8iLCJtb3ZlbGVmdCIsIm5vQmxvY2tIb3Jpem9udGFsIiwibW92ZXJpZ2h0IiwibW92ZXVwIiwibm9CbG9ja1ZlcnRpY2FsIiwibW92ZWRvd24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQUFBLG9CQUFvQixDQUFDLEdBQUcsQUFBQzt3QkFDeEIsSUFBSSxBQUFzQixZQUF0QixPQUFPQyxZQUF5QixPQUFPQTt3QkFDM0MsSUFBSTs0QkFDSCxPQUFPLElBQUksSUFBSSxJQUFJQyxTQUFTO3dCQUM3QixFQUFFLE9BQU9DLEdBQUc7NEJBQ1gsSUFBSSxBQUFrQixZQUFsQixPQUFPQyxRQUFxQixPQUFPQTt3QkFDeEM7b0JBQ0Q7OztvQkNQQUosb0JBQW9CLEVBQUUsR0FBRyxJQUFP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