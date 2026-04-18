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
                    var sc = 0, ls, lhs, board = Array(4), added = Array(4), over = 0, lm = Array(4), that, POSITIONS = [];
                    for(let i = 0; i < 4; i++){
                        lm[i] = new Array(4);
                        board[i] = new Array(4);
                        added[i] = new Array(4);
                    }
                    for(let row = 0; row < 4; row++){
                        for(let col = 0; col < 4; col++)POSITIONS[4 * row + col] = {
                            x: 44 * col + 3,
                            y: 44 * row + 3
                        };
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
                            clearArray(added);
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
                    function clearArray(m) {
                        for(let i = 0; i < 4; i++)m[i].fill(0);
                    }
                    function newgame() {
                        over = 0;
                        clearArray(board);
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
                    var moveFunctions = {
                        left: moveleft,
                        right: moveright,
                        up: moveup,
                        down: movedown
                    };
                    function mo(dir) {
                        let up = canMoveUp(board), down = canMoveDown(board), right = canMoveRight(board), left = canMoveLeft(board);
                        if (up || left || down || right) {
                            let moveFn = moveFunctions[dir];
                            if (moveFn && moveFn()) {
                                backup();
                                clearArray(added);
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
                            id1 = parseInt(id1);
                            id2 = parseInt(id2);
                            let dx = POSITIONS[id2].x - POSITIONS[id1].x;
                            let dy = POSITIONS[id2].y - POSITIONS[id1].y;
                            _system3.default.fromTo({
                                id: id1.toString(),
                                fromState: {
                                    translateY: "0px",
                                    translateX: "0px"
                                },
                                toState: {
                                    translateY: dy + "px",
                                    translateX: dx + "px"
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
                        } else board[c][a] == board[b][a] && noBlockVertical(a, c, b, board) && (0 != added[c][a] ? (board[c + 1][a] = board[b][a], board[b][a] = 0, fromTo(4 * b + a, (c + 1) * 4 + a)) : (board[c][a] += board[b][a], that.sco += board[b][a], board[b][a] = 0, added[c][a] = 1, fromTo(4 * b + a, 4 * c + a)));
                        return !0;
                    }
                    function movedown() {
                        for(var a = 0; 4 > a; a++)for(var b = 2; 0 <= b; b--)if (0 != board[b][a]) for(var c = 3; c > b; c--)if (0 == board[c][a] && noBlockVertical(a, b, c, board)) {
                            board[c][a] = board[b][a], board[b][a] = 0;
                            fromTo(4 * b + a, 4 * c + a);
                            break;
                        } else board[c][a] == board[b][a] && noBlockVertical(a, b, c, board) && (0 != added[c][a] ? (board[c + 1][a] = board[b][a], board[b][a] = 0, fromTo(4 * b + a, (c + 1) * 4 + a)) : (board[c][a] += board[b][a], that.sco += board[b][a], board[b][a] = 0, added[c][a] = 1, fromTo(4 * b + a, 4 * c + a)));
                        return !0;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXNcXGluZGV4XFxpbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvcnNwYWNrX3ZlcnNpb24iLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9yc3BhY2tfdW5pcXVlX2lkIiwid2VicGFjazovLy9zcmMvcGFnZXMvaW5kZXgvaW5kZXgudXgiXSwic291cmNlc0NvbnRlbnQiOlsiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKCgpID0+IHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ydiA9ICgpID0+IChcIjEuNC4xMVwiKSIsIl9fd2VicGFja19yZXF1aXJlX18ucnVpZCA9IFwiYnVuZGxlcj1yc3BhY2tAMS40LjExXCI7XG4iLCI8dGVtcGxhdGU+XHJcblx0PGRpdiBvbnN3aXBlPVwibW92ZVwiIGNsYXNzPVwiYmdcIj5cclxuXHRcdDwhLS3og4zmma8r5oyJ6ZKuLS0+XHJcblx0XHQ8ZGl2IGNsYXNzPVwiYmdcIiBpZj1cInt7ZGFya319XCI+XHJcblx0XHRcdDxpbWcgc3JjPVwiL2NvbW1vbi9iZzIucG5nXCIgY2xhc3M9XCJiZ1wiLz5cclxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA4cHg7dG9wOiAzNDdweDtcIiBzcmM9XCIvY29tbW9uL3Jlc2V0X2IucG5nXCIgQGNsaWNrPVwibmV3X2dhbWVcIiAvPlxyXG5cdFx0XHQ8aW1nIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlO2xlZnQ6IDEwMHB4O3RvcDogMzQ3cHg7XCIgc3JjPVwiL2NvbW1vbi91bmRvX2IucG5nXCIgQGNsaWNrPVwiY2hjYlwiIC8+XHJcblx0XHRcdDxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogNTZweDt0b3A6IDQwNXB4O1wiIHNyYz1cIi9jb21tb24vaW5mb19iLnBuZ1wiIEBjbGljaz1cIm9wZW5NZW51KClcIi8+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDxkaXYgY2xhc3M9XCJiZ1wiIGVsc2U+XHJcblx0XHRcdDxpbWcgc3JjPVwiL2NvbW1vbi9iZzEucG5nXCIgY2xhc3M9XCJiZ1wiLz5cclxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA4cHg7dG9wOiAzNDdweDtcIiBzcmM9XCIvY29tbW9uL3Jlc2V0LnBuZ1wiIEBjbGljaz1cIm5ld19nYW1lXCIgLz5cclxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiAxMDBweDt0b3A6IDM0N3B4O1wiIHNyYz1cIi9jb21tb24vdW5kby5wbmdcIiBAY2xpY2s9XCJjaGNiXCIgLz5cclxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA1NnB4O3RvcDogNDA1cHg7XCIgc3JjPVwiL2NvbW1vbi9pbmZvLnBuZ1wiIEBjbGljaz1cIm9wZW5NZW51KClcIi8+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDwhLS3kuK3pl7QtLT5cclxuXHRcdDxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogNXB4O3RvcDogMTU2cHg7d2lkdGg6IDE4NnB4O2hlaWdodDogMTg2cHg7cGFkZGluZy10b3A6IDNweDtwYWRkaW5nLWxlZnQ6M3B4O2Rpc3BsYXk6IGZsZXg7ZmxleC13cmFwOiB3cmFwO1wiID5cclxuXHRcdFx0PHRleHQgY2xhc3M9XCJzcXVhcmVcIiBmb3I9XCJ7e2Jsb2Nrc319XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB7e2JnY1ttZFskaXRlbV1dfX07XCIgaWQ9e3skaXRlbX19ICBpZj1cInt7IWRhcmt9fVwiPlxyXG5cdFx0XHRcdHt7IG1kWyRpdGVtXSB9fVxyXG5cdFx0XHQ8L3RleHQ+XHJcblx0XHRcdDx0ZXh0IGNsYXNzPVwic3F1YXJlXCIgZm9yPVwie3tibG9ja3N9fVwiIHN0eWxlPVwiY29sb3I6IHt7YmdjW21kWyRpdGVtXV19fTtiYWNrZ3JvdW5kLWNvbG9yOiB7e2lzZVskaXRlbV19fVwiIGlkPXt7JGl0ZW19fSBlbHNlID5cclxuXHRcdFx0XHR7eyBtZFskaXRlbV0gfX0gXHJcblx0XHRcdDwvdGV4dD5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PCEtLeenr+WIhueJiC0tPlxyXG5cdFx0PHRleHQgY2xhc3M9XCJzY29yZVwiPuacgOmrmCB7eyBoc2MgfX08L3RleHQ+XHJcblx0XHQ8dGV4dCBjbGFzcz1cInNjb3JlXCJzdHlsZT1cInRvcDogMTE1cHg7XCI+5b2T5YmNIHt7IHNjbyB9fTwvdGV4dD5cclxuXHRcdDwhLS1hYm91dC0tPlxyXG5cdFx0PGRpdiBjbGFzcz1cImJnXCIgaWY9XCJ7e21lbnVGbGFnfX1cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwwKVwiPlxyXG5cdFx0PHNjcm9sbCBjbGFzcz1cImJnXCIgc2Nyb2xsLXk9XCJ0cnVlXCIgYm91bmNlcz1cInRydWVcIiBpZD1cImFib3V0XCIgc3R5bGU9XCJ0cmFuc2Zvcm06dHJhbnNsYXRlWCgxOTJweClcIj5cclxuXHRcdFx0PGltZyBzcmM9XCIvY29tbW9uL2Fib3V0LnBuZ1wiLz5cclxuXHRcdFx0PGltZyBzcmM9XCIvY29tbW9uL3RydWUucG5nXCIgaWY9XCJ7e2Rhcmt9fVwiIGNsYXNzPVwiYnRuXCJvbmNsaWNrPVwiY2hhbmdlTW9kZVwiLz5cclxuXHRcdFx0PGltZyBzcmM9XCIvY29tbW9uL2ZhbHNlLnBuZ1wiIGVsc2UgY2xhc3M9XCJidG5cIm9uY2xpY2s9XCJjaGFuZ2VNb2RlXCIvPlxyXG5cdFx0XHQ8aW1nIHNyYz1cIi9jb21tb24vdHJ1ZS5wbmdcIiBpZj1cInt7YW5pfX1cIiBjbGFzcz1cImJ0blwiIHN0eWxlPVwidG9wOiA2NzRweDtcIiBvbmNsaWNrPVwiY2hhbmdlYW5pXCIvPlxyXG5cdFx0XHQ8aW1nIHNyYz1cIi9jb21tb24vZmFsc2UucG5nXCIgZWxzZSBjbGFzcz1cImJ0blwib25jbGljaz1cImNoYW5nZWFuaVwic3R5bGU9XCJ0b3A6IDY3NHB4O1wiLz5cclxuXHRcdDwvc2Nyb2xsPjwvZGl2PlxyXG5cdFx0PCEtLWJhY2stLT5cclxuXHRcdDxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogNDVweDt0b3A6IDZweDtcIiBzcmM9XCIvY29tbW9uL2JhY2tfYi5wbmdcIiBAY2xpY2s9XCJleGl0KCdlJylcIiBpZj1cInt7ZGFya3x8bWVudUZsYWd9fVwiLz5cclxuXHRcdDxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogNDVweDt0b3A6IDZweDtcIiBzcmM9XCIvY29tbW9uL2JhY2sucG5nXCIgQGNsaWNrPVwiZXhpdCgnZScpXCIgZWxzZS8+XHJcblx0PC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c3R5bGU+XHJcbnRleHR7XHJcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5zY29yZSB7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdGxlZnQ6IDBweDtcclxuXHR0b3A6IDc1cHg7XHJcblx0d2lkdGg6IDE5MnB4O1xyXG5cdGZvbnQtc2l6ZTogMjhweDtcclxuXHRjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xyXG59XHJcbi5zcXVhcmUge1xyXG5cdHdpZHRoOiA0MHB4O1xyXG5cdGhlaWdodDogNDBweDtcclxuXHRtYXJnaW4tdG9wOiA0cHg7XHJcblx0bWFyZ2luLWxlZnQ6IDRweDtcclxuXHRib3JkZXItcmFkaXVzOiAxM3B4O1xyXG5cdGZvbnQtc2l6ZTogMTVweDtcclxuXHRjb2xvcjogIzU5NTAzZjtcclxufVxyXG4uYmd7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHdpZHRoOiAxOTJweDtcclxuICBoZWlnaHQ6IDQ2OXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG59XHJcbi5idG57XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdGxlZnQ6IDQ1cHg7XHJcblx0dG9wOiA1MDRweDtcclxufVxyXG48L3N0eWxlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHByb21wdCBmcm9tIFwiQHN5c3RlbS5wcm9tcHRcIjtcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIkBzeXN0ZW0uc3RvcmFnZVwiO1xyXG5pbXBvcnQgZm9sbWUgZnJvbSAnQHN5c3RlbS5mb2xtZSdcclxuXHJcbnZhciBzYyA9IDAsXHJcblx0bHMsXHJcblx0bGhzLFxyXG5cdGJvYXJkID0gQXJyYXkoNCksXHJcblx0YWRkZWQgPSBBcnJheSg0KSxcclxuXHRvdmVyID0gMCxcclxuXHRsbSA9QXJyYXkoNCksXHJcblx0dGhhdCxcclxuXHRQT1NJVElPTlMgPSBbXTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtsbVtpXT1uZXcgQXJyYXkoNCk7Ym9hcmRbaV09bmV3IEFycmF5KDQpO2FkZGVkW2ldPW5ldyBBcnJheSg0KX1cclxuZm9yIChsZXQgcm93ID0gMDsgcm93IDwgNDsgcm93KyspIHtcclxuICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDQ7IGNvbCsrKSB7XHJcbiAgICAgICAgUE9TSVRJT05TW3JvdyAqIDQgKyBjb2xdID0geyB4OiBjb2wgKiA0NCArIDMsIHk6IHJvdyAqIDQ0ICsgMyB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRwdWJsaWM6IHtcclxuXHRcdGJsb2NrczogW1xyXG5cdFx0XHRcIjBcIixcclxuXHRcdFx0XCIxXCIsXHJcblx0XHRcdFwiMlwiLFxyXG5cdFx0XHRcIjNcIixcclxuXHRcdFx0XCI0XCIsXHJcblx0XHRcdFwiNVwiLFxyXG5cdFx0XHRcIjZcIixcclxuXHRcdFx0XCI3XCIsXHJcblx0XHRcdFwiOFwiLFxyXG5cdFx0XHRcIjlcIixcclxuXHRcdFx0XCIxMFwiLFxyXG5cdFx0XHRcIjExXCIsXHJcblx0XHRcdFwiMTJcIixcclxuXHRcdFx0XCIxM1wiLFxyXG5cdFx0XHRcIjE0XCIsXHJcblx0XHRcdFwiMTVcIixcclxuXHRcdF0sXHJcblx0XHRtZDogW10sXHJcblx0XHRoc2M6IDAsXHJcblx0XHRzY286IHNjLFxyXG5cdFx0YmdjOiBbXSxcclxuXHRcdGlzZTogW10sXHJcblx0XHRjaDowLFxyXG5cdFx0ZGFyazpmYWxzZSxcclxuXHRcdG1lbnVGbGFnOmZhbHNlLFxyXG5cdFx0YW5pOnRydWVcclxuXHR9LFxyXG5cdG9uSW5pdCgpIHtcclxuXHRcdHRoYXQgPSB0aGlzO1xyXG5cdFx0bGV0IHRlbXBjID1cclxuXHRcdFx0XCJyZ2JhKDAsMCwwLDApICNFRkU1REEgI0YwRTBDOSAjZmNiNDc3ICNmZjljNjEgI2ZmODY1ZCAjZmY2YTM4ICNlYmNmNzEgI2ViY2M1ZiAjZWJjOTRmICNlYmM1M2YgI2ViYzIyYyAjRjJCNkI2ICNFOEVENTEgI0ZGRTNGQiAjRThGRjhDICNGRkRFQzkgI0Y1QTQzMyAjRTYxMDlCICM5NkM0RTYgI0U1NjBDRFwiLnNwbGl0KFxyXG5cdFx0XHRcdFwiIFwiXHJcblx0XHRcdCk7XHJcblx0XHR0ZW1wYy5mb3JFYWNoKChhLCBpbmRleCkgPT4ge1xyXG5cdFx0XHR0aGlzLmJnY1syICoqIGluZGV4XSA9IGE7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuYmdjW1wiXCJdID0gXCJyZ2JhKDAsIDAsIDAsIDApXCI7XHJcblx0XHRzdG9yYWdlLmdldCh7XHJcblx0XHRcdGtleTogXCJzY29yZVwiLFxyXG5cdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdFx0XHRsZXQgbyA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0XHRib2FyZD1vLm1hcFxyXG5cdFx0XHRcdFx0cm0wKG8ubWFwKTtcclxuXHRcdFx0XHRcdHRoaXMuaHNjID0gby5ocztcclxuXHRcdFx0XHRcdHRoaXMuc2NvPW8uc2NcclxuXHRcdFx0XHRcdHRoaXMuY2ggPSAwO1xyXG5cdFx0XHRcdFx0dGhpcy5kYXJrPW8uZGFya1xyXG5cdFx0XHRcdFx0dGhpcy5hbmk9by5hbmlcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGRhdGEpXHJcblx0XHRcdFx0fSBlbHNlIHRoaXMubmV3X2dhbWUoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRjbGVhckFycmF5KGFkZGVkKVxyXG5cdH0sXHJcblx0Y2hjYigpIHtcclxuXHRcdGlmICh0aGlzLmNoID09MSkge1xyXG5cdFx0XHR0aGlzLmhzYyA9IGxocztcclxuXHRcdFx0dGhpcy5zY28gPSBscztcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPDQ7IGkrKykge1xyXG5cdFx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKSB7XHJcblx0XHRcdFx0XHRib2FyZFtpXVtqXT1sbVtpXVtqXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRybTAoYm9hcmQpO1xyXG5cdFx0XHRvdmVyPTA7XHJcblx0XHRcdHRoaXMuc2F2ZSgpO1xyXG5cdFx0XHR0aGlzLmNoID0gMDtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICBcdFx0bWVzc2FnZTogXCLkuI3og73lho3mkqTllaZcIixcclxuICAgICAgICBcdFx0ZHVyYXRpb246IDEwMDBcclxuICAgICAgXHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bmV3X2dhbWUoKSB7XHJcblx0XHRiYWNrdXAoKVxyXG5cdFx0bmV3Z2FtZSgpO1xyXG5cdFx0dGhpcy5zY28gPSAwO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0XHRjbGVhcmFuaSgpXHJcblx0fSxcclxuXHRtb3ZlKGV2ZSkge1xyXG5cdFx0aWYodGhpcy5tZW51RmxhZyl7XHJcblx0XHRcdGlmKGV2ZS5kaXJlY3Rpb249PVwicmlnaHRcIil0aGlzLmV4aXQoJ2UnKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdG1vKGV2ZS5kaXJlY3Rpb24pO1xyXG5cdFx0aWYgKHRoaXMuc2NvID4gdGhpcy5oc2MpIHtcclxuXHRcdFx0dGhpcy5oc2MgPSB0aGlzLnNjbztcclxuXHRcdH1cclxuXHRcdHRoaXMuc2F2ZSgpO1xyXG5cdH0sXHJcblx0c2F2ZSgpIHtcclxuXHRcdGxldCBvID0ge1xyXG5cdFx0XHRtYXA6IGJvYXJkLFxyXG5cdFx0XHRoczogdGhpcy5oc2MsXHJcblx0XHRcdHNjOiB0aGlzLnNjbyxcclxuXHRcdFx0ZGFyazp0aGlzLmRhcmssXHJcblx0XHRcdGFuaTp0aGlzLmFuaVxyXG5cdFx0fTtcclxuXHRcdC8vbz1cIlwiXHJcblx0XHRzdG9yYWdlLnNldCh7XHJcblx0XHRcdGtleTogXCJzY29yZVwiLFxyXG5cdFx0XHR2YWx1ZTogSlNPTi5zdHJpbmdpZnkobyksXHJcblx0XHRcdHN1Y2Nlc3M6KCk9PnsvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG8pKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmYWlsOigpPT57fSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGV4aXQoYSkge1xyXG4gIFx0XHRpZihhLmRpcmVjdGlvbj09J3JpZ2h0J3x8YT09XCJlXCIpe1xyXG5cdFx0XHRpZih0aGlzLm1lbnVGbGFnKXtcclxuXHRcdFx0XHRmb2xtZS50byh7aWQ6XCJhYm91dFwiLHRvU3RhdGU6e3RyYW5zbGF0ZVg6XCIxOTJweFwifSxjb25maWc6e2R1cmF0aW9uOjAuMSxlYXNlOlwib3V0XCJ9fSk7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7dGhpcy5tZW51RmxhZyA9ZmFsc2U7fSwgMTAwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHRoaXMuJGFwcC5leGl0KCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0b3Blbk1lbnUoKSB7Ly/miZPlvIBhYm91dFxyXG4gIFx0XHR0aGlzLm1lbnVGbGFnID10cnVlO1xyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdGZvbG1lLnRvKHtpZDpcImFib3V0XCIsdG9TdGF0ZTp7dHJhbnNsYXRlWDpcIjBweFwifSxjb25maWc6e2R1cmF0aW9uOjAuMSxlYXNlOlwib3V0XCJ9fSk7XHJcblx0XHR9LCA1MCk7XHJcblx0fSxcclxuXHJcblx0Y2hhbmdlTW9kZSgpe1xyXG5cdFx0dGhpcy5kYXJrPSF0aGlzLmRhcms7XHJcblx0XHR0aGlzLnNhdmUoKVxyXG5cdH0sXHJcblx0Y2hhbmdlYW5pKCl7XHJcblx0XHR0aGlzLmFuaT0hdGhpcy5hbmk7XHJcblx0XHR0aGlzLnNhdmUoKVxyXG5cdH0sb25CYWNrUHJlc3MoKXtcclxuXHRcdHRoaXMuZXhpdCgnZScpXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn07XHJcbmZ1bmN0aW9uIHJtMChzbSkge1xyXG5cdGxldCBhPTA7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuXHRcdGZvciAodmFyIGIgPSAwOyA0ID4gYjsgYisrKSBcclxuXHRcdHtcclxuXHRcdFx0aWYgKHNtW2ldW2JdID09IDApIHtcclxuXHRcdFx0XHR0aGF0Lm1kW2FdPVwiXCJcclxuXHRcdFx0XHR0aGF0LmlzZVthXT1cIiMwMDAwMDAwMFwiO1xyXG5cdFx0XHR9IGVsc2Uge3RoYXQuaXNlW2FdPVwiI2ZmZmZmZjIwXCI7dGhhdC5tZFthXT1zbVtpXVtiXX1cclxuXHRcdFx0YSsrXHJcblx0XHR9fVxyXG5cdHJldHVyblxyXG59XHJcbmZ1bmN0aW9uIGNsZWFyQXJyYXkobSl7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHttW2ldLmZpbGwoMCl9XHJcbn1cclxuZnVuY3Rpb24gbmV3Z2FtZSgpIHtcclxuXHQgKG92ZXIgPSAwKTtcclxuXHRjbGVhckFycmF5KGJvYXJkKVxyXG5cdG5ld2Jsb2NrKCk7XHJcblx0bmV3YmxvY2soKTtcclxuXHRybTAoYm9hcmQpO1xyXG59XHJcbmZ1bmN0aW9uIHJhbmRfbnVtKCl7Ly/nlJ/miJDpmo/mnLrmlbDvvIzkuLrkuobpgILphY0455qE5Luj56CBXHJcblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwKVxyXG59XHJcbmZ1bmN0aW9uIG5ld2Jsb2NrKCkgey8v55Sf5oiQ5paw5pa55Z2XXHJcblx0Zm9yICh2YXIgYSA9IDMsIGIgPSByYW5kX251bSgpICUgNCwgYyA9IHJhbmRfbnVtKCkgJSA0LCBkID0gNTAgPCByYW5kX251bSgpICUgMTAwID8gNCA6IDI7IDAgPCBhOykge1xyXG5cdFx0aWYgKDAgPT0gYm9hcmRbYl1bY10pIHJldHVybiBib2FyZFtiXVtjXSA9IGRcclxuXHRcdGIgPSByYW5kX251bSgpICUgNDtcclxuXHRcdGMgPSByYW5kX251bSgpICUgNDtcclxuXHRcdGEtLVxyXG5cdH1cclxuXHRmb3IgKGEgPSAwOyA0ID4gYTsgYSsrKVxyXG5cdFx0Zm9yIChiID0gMDsgNCA+IGI7IGIrKylcclxuXHRcdFx0aWYgKDAgPT0gYm9hcmRbYV1bYl0pIHJldHVybiBib2FyZFthXVtiXSA9IDJcclxufVxyXG52YXIgbW92ZUZ1bmN0aW9ucyA9IHtcclxuXHRsZWZ0OiBtb3ZlbGVmdCxcclxuXHRyaWdodDogbW92ZXJpZ2h0LFxyXG5cdHVwOiBtb3ZldXAsXHJcblx0ZG93bjogbW92ZWRvd25cclxufTtcclxuZnVuY3Rpb24gbW8oZGlyKSB7XG5cdFx0bGV0IHVwID0gY2FuTW92ZVVwKGJvYXJkKSxcblx0XHRcdGRvd24gPSBjYW5Nb3ZlRG93bihib2FyZCksXG5cdFx0XHRyaWdodCA9IGNhbk1vdmVSaWdodChib2FyZCksXG5cdFx0XHRsZWZ0ID0gY2FuTW92ZUxlZnQoYm9hcmQpO1xuXHRcdGlmICh1cCB8fCBsZWZ0IHx8IGRvd24gfHwgcmlnaHQpIHtcblx0XHRcdGxldCBtb3ZlRm4gPSBtb3ZlRnVuY3Rpb25zW2Rpcl07XG5cdFx0XHRpZihtb3ZlRm4gJiYgbW92ZUZuKCkpe1xuXHRcdFx0XHRiYWNrdXAoKVxuXHRcdFx0XHRjbGVhckFycmF5KGFkZGVkKVxuXHRcdFx0XHRpZih0aGF0LmFuaSl7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7Y2xlYXJhbmkoKX0sIDEyMCk7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7bmV3YmxvY2soKTtcblx0XHRcdFx0XHRybTAoYm9hcmQpO1xuXHRcdFx0XHRcdH0sIDExMCk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdG5ld2Jsb2NrKCk7XG5cdFx0XHRcdFx0cm0wKGJvYXJkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gXG5cdFx0cm0wKGJvYXJkKTtyZXR1cm5cblx0fVxyXG5mdW5jdGlvbiBiYWNrdXAoKXsvL+S9v+iDveWkn+aSpOWbnlxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDw0OyBpKyspIHtcclxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKSB7XHJcblx0XHRcdGxtW2ldW2pdPWJvYXJkW2ldW2pdXHJcblx0XHR9XHJcblx0fVxyXG5cdGxzID0gdGhhdC5zY29cclxuXHRsaHMgPSB0aGF0LmhzY1xyXG5cdHRoYXQuY2g9MVxyXG5cdHJldHVyblxyXG59XHJcbmZ1bmN0aW9uIGZyb21UbyhpZDEsaWQyKXtcclxuXHRpZih0aGF0LmFuaSl7XHJcblx0XHRpZDE9cGFyc2VJbnQoaWQxKTtcclxuXHRcdGlkMj1wYXJzZUludChpZDIpO1xyXG5cdFx0bGV0IGR4PVBPU0lUSU9OU1tpZDJdLngtUE9TSVRJT05TW2lkMV0ueDtcclxuXHRcdGxldCBkeT1QT1NJVElPTlNbaWQyXS55LVBPU0lUSU9OU1tpZDFdLnk7XHJcblx0XHRmb2xtZS5mcm9tVG8oe2lkOmlkMS50b1N0cmluZygpLGZyb21TdGF0ZTp7dHJhbnNsYXRlWTpcIjBweFwiLHRyYW5zbGF0ZVg6XCIwcHhcIn0sdG9TdGF0ZTp7dHJhbnNsYXRlWTpkeStcInB4XCIsdHJhbnNsYXRlWDpkeCtcInB4XCJ9LGNvbmZpZzp7ZHVyYXRpb246MC4xfX0pO1xyXG5cdH1cclxuXHRyZXR1cm4gMFxyXG59XHJcbmZ1bmN0aW9uIGNsZWFyYW5pKCl7Ly/muIXpmaTliqjnlLtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcclxuXHRcdGxldCBpZD1pLnRvU3RyaW5nKClcclxuXHRcdGZvbG1lLmNhbmNlbCh7aWQ6aWR9KVxyXG5cdFx0Zm9sbWUuc2V0VG8oe2lkOmlkLHRvU3RhdGU6e3RyYW5zbGF0ZVk6XCIwcHhcIix0cmFuc2xhdGVYOlwiMHB4XCJ9fSlcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gbW92ZWxlZnQoKSB7XHJcblx0Zm9yICh2YXIgYSA9IDA7IDQgPiBhOyBhKyspXHJcblx0XHRmb3IgKHZhciBiID0gMTsgNCA+IGI7IGIrKylcclxuXHRcdFx0aWYgKDAgIT0gYm9hcmRbYV1bYl0pXHJcblx0XHRcdFx0Zm9yICh2YXIgYyA9IDA7IGMgPCBiOyBjKyspIHtcclxuXHRcdFx0XHRcdGlmKDAgPT0gYm9hcmRbYV1bY10gJiYgbm9CbG9ja0hvcml6b250YWwoYSwgYywgYiwgYm9hcmQpKXtcclxuXHRcdFx0XHRcdFx0Ym9hcmRbYV1bY10gPSBib2FyZFthXVtiXSwgYm9hcmRbYV1bYl0gPSAwO1xyXG5cdFx0XHRcdFx0XHRmcm9tVG8oYSo0K2IsYSo0K2MpXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGJvYXJkW2FdW2NdID09IGJvYXJkW2FdW2JdICYmIG5vQmxvY2tIb3Jpem9udGFsKGEsIGMsIGIsIGJvYXJkKSAmJiAoMCAhPSBhZGRlZFthXVtjXSA/IChib2FyZFthXVtjICsgMV0gPSBib2FyZFthXVtiXSwgYm9hcmRbYV1bYl0gPSAwLGZyb21UbyhhKjQrYixhKjQrYysxKSkgOiAoYm9hcmRbYV1bY10gKz0gYm9hcmRbYV1bYl0sdGhhdC5zY28rPWJvYXJkW2FdW2JdKjIsIGJvYXJkW2FdW2JdID0gMCwgYWRkZWRbYV1bY10gPSAxLGZyb21UbyhhKjQrYixhKjQrYykpKTt9XHJcblx0XHJcblx0XHJcblx0cmV0dXJuICEwXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdmVyaWdodCgpIHtcclxuXHRmb3IgKHZhciBhID0gMDsgNCA+IGE7IGErKylcclxuXHRcdGZvciAodmFyIGIgPSAyOyAwIDw9IGI7IGItLSlcclxuXHRcdFx0aWYgKDAgIT0gYm9hcmRbYV1bYl0pXHJcblx0XHRcdFx0Zm9yICh2YXIgYyA9IDM7IGMgPiBiOyBjLS0pXHJcblx0XHRcdFx0XHRpZigwID09IGJvYXJkW2FdW2NdICYmIG5vQmxvY2tIb3Jpem9udGFsKGEsIGIsIGMsIGJvYXJkKSl7Ym9hcmRbYV1bY10gPSBib2FyZFthXVtiXSwgYm9hcmRbYV1bYl0gPSAwO2Zyb21UbyhhKjQrYixhKjQrYyk7YnJlYWt9XHJcblx0XHRcdFx0XHRlbHNlIGJvYXJkW2FdW2NdID09IGJvYXJkW2FdW2JdICYmIG5vQmxvY2tIb3Jpem9udGFsKGEsIGIsIGMsIGJvYXJkKSAmJiAoMCAhPSBhZGRlZFthXVtjXSA/IChib2FyZFthXVtjIC0gMV0gPSBib2FyZFthXVtiXSwgYm9hcmRbYV1bYl0gPSAwLGZyb21UbyhhKjQrYixhKjQrYy0xKSkgOiAoYm9hcmRbYV1bY10gKz0gYm9hcmRbYV1bYl0sdGhhdC5zY28rPWJvYXJkW2FdW2JdKjIsIGJvYXJkW2FdW2JdID0gMCwgYWRkZWRbYV1bY10gPSAxLGZyb21UbyhhKjQrYixhKjQrYykpKTtcclxuXHRcclxuXHRcclxuXHRyZXR1cm4gITBcclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZXVwKCkge1xyXG5cdGZvciAodmFyIGEgPSAwOyA0ID4gYTsgYSsrKVxyXG5cdFx0Zm9yICh2YXIgYiA9IDE7IDQgPiBiOyBiKyspXHJcblx0XHRcdGlmICgwICE9IGJvYXJkW2JdW2FdKVxyXG5cdFx0XHRcdGZvciAodmFyIGMgPSAwOyBjIDwgYjsgYysrKXtcclxuXHRcdFx0XHRcdGlmKDAgPT0gYm9hcmRbY11bYV0gJiYgbm9CbG9ja1ZlcnRpY2FsKGEsIGMsIGIsIGJvYXJkKSl7Ym9hcmRbY11bYV0gPSBib2FyZFtiXVthXSwgYm9hcmRbYl1bYV0gPSAwO2Zyb21UbyhiKjQrYSxjKjQrYSk7YnJlYWt9XHJcblx0XHRcdFx0XHRlbHNlIGJvYXJkW2NdW2FdID09IGJvYXJkW2JdW2FdICYmIG5vQmxvY2tWZXJ0aWNhbChhLCBjLCBiLCBib2FyZCkgJiYgKDAgIT0gYWRkZWRbY11bYV0gPyAoYm9hcmRbYyArIDFdW2FdID0gYm9hcmRbYl1bYV0sIGJvYXJkW2JdW2FdID0gMCxmcm9tVG8oYio0K2EsKGMrMSkqNCthKSkgOiAoYm9hcmRbY11bYV0gKz0gYm9hcmRbYl1bYV0sdGhhdC5zY28rPWJvYXJkW2JdW2FdLCBib2FyZFtiXVthXSA9IDAsIGFkZGVkW2NdW2FdID0gMSxmcm9tVG8oYio0K2EsYyo0K2EpKSk7fVxyXG5cdHJldHVybiAhMFxyXG59XHJcbmZ1bmN0aW9uIG1vdmVkb3duKCkge1xyXG5cdGZvciAodmFyIGEgPSAwOyA0ID4gYTsgYSsrKVxyXG5cdFx0Zm9yICh2YXIgYiA9IDI7IDAgPD0gYjsgYi0tKVxyXG5cdFx0XHRpZiAoMCAhPSBib2FyZFtiXVthXSlcclxuXHRcdFx0XHRmb3IgKHZhciBjID0gMzsgYyA+IGI7IGMtLSl7aWYoMCA9PSBib2FyZFtjXVthXSAmJiBub0Jsb2NrVmVydGljYWwoYSwgYiwgYywgYm9hcmQpKXtib2FyZFtjXVthXSA9IGJvYXJkW2JdW2FdLCBib2FyZFtiXVthXSA9IDA7ZnJvbVRvKGIqNCthLGMqNCthKTticmVha31lbHNlIGJvYXJkW2NdW2FdID09IGJvYXJkW2JdW2FdICYmIG5vQmxvY2tWZXJ0aWNhbChhLCBiLCBjLCBib2FyZCkgJiYgKDAgIT0gYWRkZWRbY11bYV0gPyAoYm9hcmRbYyArIDFdW2FdID0gYm9hcmRbYl1bYV0sIGJvYXJkW2JdW2FdID0gMCxmcm9tVG8oYio0K2EsKGMrMSkqNCthKSkgOiAoYm9hcmRbY11bYV0gKz0gYm9hcmRbYl1bYV0sdGhhdC5zY28rPWJvYXJkW2JdW2FdLCBib2FyZFtiXVthXSA9IDAsIGFkZGVkW2NdW2FdID0gMSxmcm9tVG8oYio0K2EsYyo0K2EpKSk7fVxyXG5cdHJldHVybiAhMFxyXG59XHJcbmZ1bmN0aW9uIGNhbk1vdmVMZWZ0KGEpIHtcclxuXHRmb3IgKHZhciBiID0gMDsgNCA+IGI7IGIrKylcclxuXHRcdGZvciAodmFyIGMgPSAwOyA0ID4gYzsgYysrKVxyXG5cdFx0XHRpZiAoMCAhPSBhW2JdW2NdICYmIDAgIT0gYyAmJiAoMCA9PSBhW2JdW2MgLSAxXSB8fCBhW2JdW2MgLSAxXSA9PSBhW2JdW2NdKSkgcmV0dXJuICEwO1xyXG5cdHJldHVybiAhMVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYW5Nb3ZlUmlnaHQoYSkge1xyXG5cdGZvciAodmFyIGIgPSAwOyA0ID4gYjsgYisrKVxyXG5cdFx0Zm9yICh2YXIgYyA9IDA7IDQgPiBjOyBjKyspXHJcblx0XHRcdGlmICgwICE9IGFbYl1bY10gJiYgMyAhPSBjICYmICgwID09IGFbYl1bYyArIDFdIHx8IGFbYl1bYyArIDFdID09IGFbYl1bY10pKSByZXR1cm4gITA7XHJcblx0cmV0dXJuICExXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbk1vdmVVcChhKSB7XHJcblx0Zm9yICh2YXIgYiA9IDA7IDQgPiBiOyBiKyspXHJcblx0XHRmb3IgKHZhciBjID0gMDsgNCA+IGM7IGMrKylcclxuXHRcdFx0aWYgKDAgIT0gYVtiXVtjXSAmJiAwICE9IGIgJiYgKDAgPT0gYVtiIC0gMV1bY10gfHwgYVtiIC0gMV1bY10gPT0gYVtiXVtjXSkpIHJldHVybiAhMDtcclxuXHRyZXR1cm4gITFcclxufVxyXG5cclxuZnVuY3Rpb24gY2FuTW92ZURvd24oYSkge1xyXG5cdGZvciAodmFyIGIgPSAwOyA0ID4gYjsgYisrKVxyXG5cdFx0Zm9yICh2YXIgYyA9IDA7IDQgPiBjOyBjKyspXHJcblx0XHRcdGlmICgwICE9IGFbYl1bY10gJiYgMyAhPSBiICYmICgwID09IGFbYiArIDFdW2NdIHx8IGFbYiArIDFdW2NdID09IGFbYl1bY10pKSByZXR1cm4gITA7XHJcblx0cmV0dXJuICExXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vQmxvY2tIb3Jpem9udGFsKGEsIGIsIGMsIGQpIHtcclxuXHRmb3IgKGIgKz0gMTsgYiA8IGM7IGIrKylcclxuXHRcdGlmICgwICE9IGRbYV1bYl0pIHJldHVybiAhMTtcclxuXHRyZXR1cm4gITBcclxufVxyXG5cclxuZnVuY3Rpb24gbm9CbG9ja1ZlcnRpY2FsKGEsIGIsIGMsIGQpIHtcclxuXHRmb3IgKGIgKz0gMTsgYiA8IGM7IGIrKylcclxuXHRcdGlmICgwICE9IGRbYl1bYV0pIHJldHVybiAhMTtcclxuXHRyZXR1cm4gITBcclxufVxyXG5cclxuPC9zY3JpcHQ+Il0sIm5hbWVzIjpbIl9fd2VicGFja19yZXF1aXJlX18iLCJnbG9iYWxUaGlzIiwiRnVuY3Rpb24iLCJlIiwid2luZG93IiwiX3N5c3RlbSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCIkYXBwX3JlcXVpcmUkIiwiX3N5c3RlbTIiLCJfc3lzdGVtMyIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0Iiwic2MiLCJscyIsImxocyIsImJvYXJkIiwiQXJyYXkiLCJhZGRlZCIsIm92ZXIiLCJsbSIsInRoYXQiLCJQT1NJVElPTlMiLCJpIiwicm93IiwiY29sIiwieCIsInkiLCJfZGVmYXVsdCIsImV4cG9ydHMiLCJwdWJsaWMiLCJibG9ja3MiLCJtZCIsImhzYyIsInNjbyIsImJnYyIsImlzZSIsImNoIiwiZGFyayIsIm1lbnVGbGFnIiwiYW5pIiwib25Jbml0IiwidGVtcGMiLCJzcGxpdCIsImZvckVhY2giLCJhIiwiaW5kZXgiLCJzdG9yYWdlIiwiZ2V0Iiwia2V5Iiwic3VjY2VzcyIsImRhdGEiLCJvIiwiSlNPTiIsInBhcnNlIiwibWFwIiwicm0wIiwiaHMiLCJuZXdfZ2FtZSIsImNsZWFyQXJyYXkiLCJjaGNiIiwiaiIsInNhdmUiLCJwcm9tcHQiLCJzaG93VG9hc3QiLCJtZXNzYWdlIiwiZHVyYXRpb24iLCJiYWNrdXAiLCJuZXdnYW1lIiwiY2xlYXJhbmkiLCJtb3ZlIiwiZXZlIiwiZGlyZWN0aW9uIiwiZXhpdCIsIm1vIiwic2V0IiwidmFsdWUiLCJzdHJpbmdpZnkiLCJmYWlsIiwiZm9sbWUiLCJ0byIsImlkIiwidG9TdGF0ZSIsInRyYW5zbGF0ZVgiLCJjb25maWciLCJlYXNlIiwic2V0VGltZW91dCIsIiRhcHAiLCJvcGVuTWVudSIsImNoYW5nZU1vZGUiLCJjaGFuZ2VhbmkiLCJvbkJhY2tQcmVzcyIsInNtIiwiYiIsIm0iLCJmaWxsIiwibmV3YmxvY2siLCJyYW5kX251bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImMiLCJkIiwibW92ZUZ1bmN0aW9ucyIsImxlZnQiLCJtb3ZlbGVmdCIsInJpZ2h0IiwibW92ZXJpZ2h0IiwidXAiLCJtb3ZldXAiLCJkb3duIiwibW92ZWRvd24iLCJkaXIiLCJjYW5Nb3ZlVXAiLCJjYW5Nb3ZlRG93biIsImNhbk1vdmVSaWdodCIsImNhbk1vdmVMZWZ0IiwibW92ZUZuIiwiZnJvbVRvIiwiaWQxIiwiaWQyIiwicGFyc2VJbnQiLCJkeCIsImR5IiwidG9TdHJpbmciLCJmcm9tU3RhdGUiLCJ0cmFuc2xhdGVZIiwiY2FuY2VsIiwic2V0VG8iLCJub0Jsb2NrSG9yaXpvbnRhbCIsIm5vQmxvY2tWZXJ0aWNhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFBQUEsb0JBQW9CLENBQUMsR0FBRyxBQUFDO3dCQUN4QixJQUFJLEFBQXNCLFlBQXRCLE9BQU9DLFlBQXlCLE9BQU9BO3dCQUMzQyxJQUFJOzRCQUNILE9BQU8sSUFBSSxJQUFJLElBQUlDLFNBQVM7d0JBQzdCLEVBQUUsT0FBT0MsR0FBRzs0QkFDWCxJQUFJLEFBQWtCLFlBQWxCLE9BQU9DLFFBQXFCLE9BQU9BO3dCQUN4QztvQkFDRDs7O29CQ1BBSixvQkFBb0IsRUFBRSxHQUFHLElBQU87OztvQkNBaENBLG9CQUFv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