var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 *
 * @author
 *
 */
var UIComponent = (function (_super) {
    __extends(UIComponent, _super);
    function UIComponent() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        return _this;
    }
    UIComponent.prototype.onAdded = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    };
    UIComponent.prototype.onRemoved = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    };
    return UIComponent;
}(egret.DisplayObjectContainer));
__reflect(UIComponent.prototype, "UIComponent");
window["UIComponent"] = UIComponent;
/**
 *
 * @author
 *
 */
var UIGridType;
(function (UIGridType) {
    UIGridType[UIGridType["Horizontal"] = 0] = "Horizontal";
    UIGridType[UIGridType["Vertical"] = 1] = "Vertical";
})(UIGridType || (UIGridType = {}));
var UIGridEvent = (function (_super) {
    __extends(UIGridEvent, _super);
    function UIGridEvent(type, index, param) {
        if (param === void 0) { param = null; }
        var _this = _super.call(this, type) || this;
        _this.index = index;
        _this.param = param;
        return _this;
    }
    UIGridEvent.ITEM_CLICK = "UIGrid_Item_Click";
    return UIGridEvent;
}(egret.Event));
__reflect(UIGridEvent.prototype, "UIGridEvent");
var UIGrid = (function (_super) {
    __extends(UIGrid, _super);
    function UIGrid() {
        var _this = _super.call(this) || this;
        _this._gap = 0;
        _this._count = 5;
        _this._container = new eui.Group();
        _this._container.name = "container";
        _this._container.touchEnabled = true;
        _this._container.touchThrough = true;
        _this.addChild(_this._container);
        _this._scroll = new eui.Scroller();
        _this._scroll.name = "scroll";
        _this.type = UIGridType.Vertical;
        _this.addChild(_this._scroll);
        _this._scroll.viewport = _this._container;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        _this._event = new UIGridEvent(UIGridEvent.ITEM_CLICK, 0);
        _this._customPoint = null;
        _this._childskinloaded = false;
        return _this;
    }
    Object.defineProperty(UIGrid.prototype, "customArray", {
        get: function () {
            return this._customPoint;
        },
        set: function (a) {
            this._customPoint = a;
        },
        enumerable: true,
        configurable: true
    });
    UIGrid.prototype.setWidth = function (value) {
        this.width = value;
        this._container.width = this.width;
        this._scroll.width = this.width;
    };
    UIGrid.prototype.setHeight = function (value) {
        this.height = value;
        this._container.height = this.height;
        this._scroll.height = this.height;
    };
    UIGrid.prototype.onAdded = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this._container.width = this.width;
        this._container.height = this.height;
        //this._container.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onItemTouch, this );
        //this._container.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.onItemTouch, this );
        //this._container.addEventListener( egret.TouchEvent.TOUCH_END, this.onItemTouch, this );
        this._container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        this._scroll.width = this.width;
        this._scroll.height = this.height;
        //this.bind();
    };
    UIGrid.prototype.onItemTouch = function (event) {
        if (egret.is(event.target, "eui.ItemRenderer")) {
            var r = event.target;
            this._event.index = r.itemIndex;
            this._event.param = r.data;
            this.dispatchEvent(this._event);
        }
        if (egret.is(event.target, "BaseRenderView")) {
            var len = this._children.length;
            for (var i = 0; i < len; i++) {
                var b = this._children[i];
                if (this._children[i] == event.target) {
                    if (b["setCurrentState"])
                        b["setCurrentState"]("selected");
                }
                else {
                    if (b["setCurrentState"])
                        b["setCurrentState"]("normal");
                }
            }
        }
    };
    UIGrid.prototype.onRemoved = function (event) {
        this._container.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        //this._container.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onItemTouch, this );
        //this._container.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.onItemTouch, this );
        //this._container.removeEventListener( egret.TouchEvent.TOUCH_END, this.onItemTouch, this );
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    };
    Object.defineProperty(UIGrid.prototype, "type", {
        set: function (value) {
            this._type = value;
            this.reorder();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIGrid.prototype, "gap", {
        set: function (value) {
            this._gap = value;
            this.reorder();
        },
        enumerable: true,
        configurable: true
    });
    UIGrid.prototype.getSubChildAt = function (index) {
        return this._children[index];
    };
    Object.defineProperty(UIGrid.prototype, "childrenCount", {
        get: function () {
            return this._container.numChildren;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIGrid.prototype, "lineCount", {
        set: function (value) {
            this._count = value;
            this.reorder();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIGrid.prototype, "itemRenderer", {
        set: function (cls) {
            this._itemRenderer = cls;
        },
        enumerable: true,
        configurable: true
    });
    UIGrid.prototype.bind = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ins, v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ins = new this._itemRenderer();
                        if (!egret.is(ins, "BaseRenderView")) return [3 /*break*/, 2];
                        v = ins;
                        return [4 /*yield*/, this.loadTheme(v.skinPath)];
                    case 1:
                        _a.sent();
                        this.bindData();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载皮肤
     */
    UIGrid.prototype.loadTheme = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            EXML.load(path, function (clazz, url) {
                _this._childskin = clazz;
                resolve();
            }, _this);
        });
    };
    Object.defineProperty(UIGrid.prototype, "dataProvider", {
        get: function () {
            return this._dataProvider;
        },
        set: function (value) {
            this._dataProvider = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIGrid.prototype, "scrollerV", {
        get: function () {
            return this._scroll.viewport.scrollV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIGrid.prototype, "scrollerH", {
        set: function (value) {
            this._scroll.viewport.scrollH = value;
        },
        enumerable: true,
        configurable: true
    });
    UIGrid.prototype.movetoTop = function () {
        this._scroll.viewport.scrollV = 0;
        this._scroll.viewport.scrollH = 0;
    };
    UIGrid.prototype.reorder = function () {
        if (this.parent && this._children) {
            var pos = 0, len = this._children.length;
            for (var i = 0; i < len; i++) {
                var c = this._children[i];
                if (c.visible) {
                    this.calcPosition(c, pos);
                    pos++;
                }
                else {
                    c.x = c.y = 0;
                }
            }
        }
    };
    UIGrid.prototype.bindData = function () {
        if (this.parent) {
            // bind
            this._container.removeChildren();
            this._children = [];
            if (this._itemRenderer && this._dataProvider) {
                var len = this._dataProvider.length;
                for (var i = 0; i < len; i++) {
                    var c = new this._itemRenderer();
                    c.skinName = this._childskin;
                    c.itemIndex = i;
                    c.name = egret.getQualifiedClassName(c) + i;
                    c.data = this._dataProvider[i];
                    this.calcPosition(c, i);
                    this._container.addChild(c);
                    this._children.push(c);
                }
            }
            this.movetoTop();
        }
    };
    UIGrid.prototype.calcPosition = function (c, pos) {
        if (this._customPoint == null) {
            if (this._type == UIGridType.Horizontal) {
                c.y = (pos % this._count) * (c.height + this._gap);
                c.x = (Math.floor(pos / this._count)) * (c.width + this._gap);
            }
            else if (this._type == UIGridType.Vertical) {
                c.x = (pos % this._count) * (c.width + this._gap);
                c.y = (Math.floor(pos / this._count)) * (c.height + this._gap);
            }
        }
        else {
            c.y = this._customPoint[c.itemIndex][1];
            c.x = this._customPoint[c.itemIndex][0];
        }
    };
    return UIGrid;
}(eui.Group));
__reflect(UIGrid.prototype, "UIGrid");
window["UIGrid"] = UIGrid;
/**
 *
 * @author
 *
 */
var Mediator = (function () {
    function Mediator() {
    }
    Mediator.prototype.notificationListeners = function () {
        return [];
    };
    Mediator.prototype.executeNotification = function (notificationName, obj) {
    };
    return Mediator;
}());
__reflect(Mediator.prototype, "Mediator", ["IMediator"]);
window["Mediator"] = Mediator;
/**
 *
 * @author
 *
 */
var Facade = (function () {
    function Facade() {
    }
    Facade.sendNotification = function (notificationName, obj, obj2) {
        if (obj === void 0) { obj = null; }
        if (obj2 === void 0) { obj2 = null; }
        var arr = Facade._dicmediator[notificationName];
        if (arr != null) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].executeNotification(notificationName, obj, obj2);
            }
        }
    };
    Facade.registerNotifListeners = function (mediator) {
        var notifications = mediator.notificationListeners();
        var length = notifications.length;
        for (var i = 0; i < length; i++) {
            var arr = Facade._dicmediator[notifications[i]];
            if (arr != null) {
                arr.push(mediator);
            }
            else {
                arr = new Array();
                arr.push(mediator);
                Facade._dicmediator[notifications[i]] = arr;
            }
        }
    };
    Facade.removeNotifListeners = function (mediator) {
        var notifications = mediator.notificationListeners();
        var length = notifications.length;
        for (var i = 0; i < length; i++) {
            var all = Facade._dicmediator;
            var arr = Facade._dicmediator[notifications[i]];
            if (arr != null) {
                for (var j = arr.length - 1; j >= 0; j--) {
                    if (arr[j] == mediator) {
                        arr.splice(j, 1);
                    }
                }
            }
        }
    };
    Facade._dicmediator = new Array();
    return Facade;
}());
__reflect(Facade.prototype, "Facade");
window["Facade"] = Facade;
var JsonpMap = (function () {
    function JsonpMap() {
    }
    return JsonpMap;
}());
__reflect(JsonpMap.prototype, "JsonpMap");
var NetUtil = (function () {
    function NetUtil() {
    }
    NetUtil.postSubmit = function (url, params) {
        var temp = document.createElement("form");
        temp.action = url;
        temp.method = "post";
        temp.style.display = "none";
        for (var x in params) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = params[x];
            temp.appendChild(opt);
            //console.log(x + "&" + params[x]);
        }
        document.body.appendChild(temp);
        temp.submit();
        return temp;
    };
    NetUtil.getNetResult = function (url, successFunc, failFunc, thisObject) {
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.once(egret.Event.COMPLETE, function () {
            successFunc.call(thisObject, loader.data);
        }, this);
        loader.once(egret.IOErrorEvent.IO_ERROR, function () {
            if (failFunc != null)
                failFunc.apply(thisObject);
        }, this);
        loader.load(new egret.URLRequest(url));
    };
    NetUtil.getNetResultByJsonP = function (url, successFunc, thisObject) {
        var _this = this;
        var c = NetUtil._jsonp++;
        JsonpMap["call_" + c] = function (data) {
            successFunc.call(_this, data);
            delete JsonpMap["call_" + c];
            JsonpMap["call_" + c] = null;
            var d = document.getElementById("jsonp" + c);
            document.body.removeChild(d);
        };
        var script = document.createElement('script');
        script.id = "jsonp" + c;
        script.src = url + "&callback=JsonpMap.call_" + c;
        document.body.appendChild(script);
    };
    NetUtil._jsonp = 1;
    return NetUtil;
}());
__reflect(NetUtil.prototype, "NetUtil");
window["NetUtil"] = NetUtil;
/**
 *
 * @author
 *
 */
var TimeUtil = (function () {
    function TimeUtil() {
    }
    /**
     * 1小时内显示“刚刚”
     * 24小时以内显示“1—23小时”
     * 超过24小时，每满24小时加1天.
     */
    TimeUtil.getTimeStr = function (second) {
        if (second < 3600) {
            return "刚刚";
        }
        else if (second >= 3600 && second < 86400) {
            return Math.floor(second / 3600) + "小时前";
        }
        else {
            return Math.floor(second / 86400) + "天" + Math.floor(second % 86400 / 3600) + "小时前";
        }
    };
    TimeUtil.getTimeString = function (second) {
        var t = second;
        var s = second % 60;
        t = (t - s) / 60;
        var m = t % 60;
        t = (t - m) / 60;
        var h = t;
        //10000060:小时
        //10000061:分钟
        //10000062:秒
        return "" + h + "小时" + m + "分钟" + s + "秒";
    };
    TimeUtil.getTimeString2 = function (second) {
        var t = second;
        var s = second % 60;
        t = (t - s) / 60;
        var m = t % 60;
        t = (t - m) / 60;
        var h = t;
        //10000060:小时
        //10000061:分钟
        //10000062:秒
        var hh = "00" + h;
        var mm = "00" + m;
        var ss = "00" + s;
        hh = hh.substr(hh.length - 2, 2);
        mm = mm.substr(mm.length - 2, 2);
        ss = ss.substr(ss.length - 2, 2);
        return "" + hh + ":" + mm + ":" + ss + "";
    };
    TimeUtil.getTimeStringSimple = function (second, type) {
        if (type === void 0) { type = "hh:mm:ss"; }
        var t = second;
        var s = t % 60;
        var sStr = "00" + s;
        t = (t - s) / 60;
        var m = t % 60;
        var mStr = "00" + m;
        t = (t - m) / 60;
        var h = t;
        var hStr = "00" + h;
        if (type == "mm:ss") {
            m = m + h * 60;
            return m > 99 ? m + "" : mStr.substring(mStr.length - 2) + ":" + sStr.substring(sStr.length - 2);
        }
        else
            return hStr.substring(hStr.length - 2) + ":" + mStr.substring(mStr.length - 2) + ":" + sStr.substring(sStr.length - 2);
    };
    TimeUtil.format = function (d, fs) {
        var o = {
            "M+": d.getMonth() + 1,
            "d+": d.getDate(),
            "h+": d.getHours(),
            "m+": d.getMinutes(),
            "s+": d.getSeconds(),
            "q+": Math.floor((d.getMonth() + 3) / 3),
            "S": d.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fs))
            fs = fs.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fs))
                fs = fs.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fs;
    };
    TimeUtil.getDateTimeString = function (second, type) {
        if (type === void 0) { type = "yyyy-MM-dd hh:mm"; }
        //yyyy-MM-dd hh:mm
        //MM-dd hh:mm
        var d = new Date(second * 1000);
        return this.format(d, type);
    };
    //天 00:00:00
    TimeUtil.getTimeStringType1 = function (second) {
        var day = 0;
        var t;
        if (second > 86400) {
            day = Math.floor(second / 86400);
            t = second % 86400;
        }
        else {
            t = second;
        }
        if (day != 0) {
            //10000063:天
            return day + "天" + this.getTimeStringSimple(t);
        }
        else {
            return this.getTimeStringSimple(t);
        }
    };
    //天 00:00:00
    TimeUtil.getTimeShortStringType = function (second) {
        var str = "";
        if (second <= 0) {
            //10000064:1秒
            str = "1秒";
        }
        else if (second < 60) {
            //10000065:秒
            str = Math.floor(second) + "秒";
        }
        else if (second / 60 < 60) {
            //10000066:分钟
            str = Math.floor(second / 60) + "分钟";
        }
        else if (second / 60 / 60 < 24) {
            //10000067:小时
            str = Math.floor(second / 60 / 60) + "小时";
        }
        else {
            //10000068:天
            str = Math.floor(second / 60 / 60 / 24) + "天";
        }
        return str;
    };
    TimeUtil.getTimeStamp = function () {
        return (new Date()).getTime();
    };
    TimeUtil.getServerNowTime = function (timeStamp) {
        var d = new Date(timeStamp * 1000);
        var h = "00" + d.getHours();
        var m = "00" + d.getMinutes();
        var s = "00" + d.getSeconds();
        return h.substr(h.length - 2, 2) + ":" + m.substr(m.length - 2, 2) + ":" + s.substr(s.length - 2, 2);
    };
    return TimeUtil;
}());
__reflect(TimeUtil.prototype, "TimeUtil");
window["TimeUtil"] = TimeUtil;
/**
 *
 * @author
 *
 */
var ParamsUtil = (function () {
    function ParamsUtil() {
    }
    ParamsUtil.getQueryString = function (value) {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            var reg = new RegExp("(^|&)" + value + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            var context = "";
            if (r != null)
                context = r[2];
            reg = null;
            r = null;
            return context == null || context == "" || context == "undefined" ? "" : context;
        }
        return "";
    };
    ParamsUtil.getUrlQueryString = function (params, value) {
        var ret = "";
        var sa = params.split("&");
        for (var i = 0; i < sa.length; i++) {
            var sa2 = sa[i].split("=");
            if (sa2.length == 2) {
                if (sa2[0] == value) {
                    ret = sa2[1];
                    break;
                }
            }
        }
        return ret;
    };
    ParamsUtil.getPassportString = function () {
        var passport = "";
        passport = window.location.search;
        return passport.substring(1);
    };
    return ParamsUtil;
}());
__reflect(ParamsUtil.prototype, "ParamsUtil");
window["ParamsUtil"] = ParamsUtil;
/**
 *
 * @author
 *
 */
var RandomUtil = (function () {
    function RandomUtil() {
    }
    RandomUtil.resetSeed = function () {
        this.setSeed((new Date()).valueOf());
    };
    RandomUtil.setSeed = function (seed) {
        RandomUtil.seed = seed;
        RandomUtil.result = RandomUtil.seed;
    };
    RandomUtil.getSeed = function () {
        return RandomUtil.seed;
    };
    RandomUtil.getR = function () {
        RandomUtil.result = (RandomUtil.result * RandomUtil.a + RandomUtil.b) % ((1 << 31) - 1);
        return RandomUtil.result;
    };
    RandomUtil.getRandom = function (min, max) {
        return min + this.getR() % (max - min);
    };
    RandomUtil.seed = 19830729;
    RandomUtil.result = 830729;
    RandomUtil.a = 777;
    RandomUtil.b = 22;
    return RandomUtil;
}());
__reflect(RandomUtil.prototype, "RandomUtil");
window["RandomUtil"] = RandomUtil;
/**
 *
 * @author
 *
 */
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        _this._loaded = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    Object.defineProperty(BaseView.prototype, "skinPath", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseView.prototype, "resourceGroup", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseView.prototype, "skinClass", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    BaseView.prototype.notificationListeners = function () {
        return [];
    };
    BaseView.prototype.executeNotification = function (notificationName, obj, obj2) { };
    BaseView.prototype.onAdded = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.loadGroup();
    };
    /**
     * 加载资源组
     */
    BaseView.prototype.loadGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.touchEnabled = false;
                        this.touchChildren = false;
                        if (!(this.resourceGroup.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, RES.loadGroup(this.resourceGroup)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // if (this.skinPath.length > 0)
                        //     await this.loadTheme();
                        this.addEventListener(egret.Event.COMPLETE, this.onSkinComplete, this);
                        this.skinName = this.skinClass;
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseView.prototype.onSkinComplete = function (event) {
        this.loadComplete();
    };
    Object.defineProperty(BaseView.prototype, "loaded", {
        /**
         * 加载皮肤
         */
        // protected loadTheme(): Promise<{}> {
        //     return new Promise((resolve, reject) => {
        //         // EXML.load(this.skinPath, (clazz: any, url: string) => {
        //         //     this.skinName = clazz;
        //         //     resolve();
        //         // }, this);
        //         this.addEventListener(eui.UIEvent.COMPLETE, () => {
        //             this.skinName = "resource/testSkin.exml";
        //         }, this);
        //     });
        // }
        /**
         * 加载完成标志
         */
        get: function () {
            return this._loaded;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载完成回调
     */
    BaseView.prototype.loadComplete = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
        this._loaded = true;
        Facade.registerNotifListeners(this);
    };
    BaseView.prototype.onRemoved = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        Facade.removeNotifListeners(this);
        this.removeChildren();
    };
    return BaseView;
}(eui.Component));
__reflect(BaseView.prototype, "BaseView", ["IMediator"]);
window["BaseView"] = BaseView;
/**
 *
 * @author
 *
 */
var BaseRenderView = (function (_super) {
    __extends(BaseRenderView, _super);
    function BaseRenderView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = false;
        _this.touchEnabled = true;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        _this.skinName = _this.skinClass;
        return _this;
    }
    BaseRenderView.prototype.notificationListeners = function () {
        return [];
    };
    BaseRenderView.prototype.executeNotification = function (notificationName, obj, obj2) { };
    Object.defineProperty(BaseRenderView.prototype, "skinPath", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderView.prototype, "skinClass", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    BaseRenderView.prototype.onAdded = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        Facade.registerNotifListeners(this);
    };
    BaseRenderView.prototype.onRemoved = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        Facade.removeNotifListeners(this);
        this.removeChildren();
    };
    return BaseRenderView;
}(eui.ItemRenderer));
__reflect(BaseRenderView.prototype, "BaseRenderView", ["IMediator"]);
window["BaseRenderView"] = BaseRenderView;
/**
 *
 * @author
 *
 */
var Log = (function () {
    function Log() {
    }
    Log.out = function (object, message) {
        console.log("[" + egret.getQualifiedClassName(object) + "]\t" + message);
    };
    Log._id = 1;
    return Log;
}());
__reflect(Log.prototype, "Log");
window["Log"] = Log;
/**
 *
 * @author
 *
 */
var UIButton = (function (_super) {
    __extends(UIButton, _super);
    function UIButton() {
        var _this = _super.call(this) || this;
        _this.scale = 1.05;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        _this.touchChildren = false;
        return _this;
    }
    Object.defineProperty(UIButton.prototype, "extLabel", {
        get: function () {
            if (this.labelDisplay2 != null)
                return this.labelDisplay2.text;
            return "";
        },
        set: function (value) {
            if (this.labelDisplay2 != null)
                this.labelDisplay2.text = value;
        },
        enumerable: true,
        configurable: true
    });
    UIButton.prototype.setState = function (value) {
        this.currentState = value; //"locked";"normal";
        this.invalidateState();
    };
    Object.defineProperty(UIButton.prototype, "hitArea", {
        get: function () {
            return this._hitArea;
        },
        set: function (rect) {
            this._hitArea = rect;
            this._hitArea.visible = false;
        },
        enumerable: true,
        configurable: true
    });
    UIButton.prototype.inArea = function (event) {
        var rect = this._hitArea.getTransformedBounds(this.stage);
        var b = rect.containsPoint(new egret.Point(event.stageX, event.stageY));
        return b;
    };
    UIButton.prototype.onTweenComplete = function () {
    };
    UIButton.prototype.onAdded = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
        // this._group = new eui.Group();
        // while (this.numChildren > 0) {
        //     this._group.addChild(this.getChildAt(0));
        // }
        // this.addChild(this._group);
        this._hitArea = new eui.Rect();
        this._hitArea.fillAlpha = 0;
        this._hitArea.fillColor = 0x000000;
        this.addChild(this._hitArea);
    };
    UIButton.prototype.onRemoved = function (event) {
        //this.removeChildren();
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
    };
    UIButton.prototype.setScale = function (scale) {
        this.scale = scale;
    };
    UIButton.prototype.onTouch = function (event) {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            this._touchdown = true;
            this._hitArea.width = this.width;
            this._hitArea.height = this.height;
            this.scaleX = this.scale;
            this.scaleY = this.scale;
            this._hitArea.x = -this.width * 0.1 / 2;
            this._hitArea.y = -this.height * 0.1 / 2;
        }
        else if (event.type == egret.TouchEvent.TOUCH_MOVE) {
            this._touchdown = false;
            this.scaleX = 1.0;
            this.scaleY = 1.0;
            this._hitArea.x = 0;
            this._hitArea.y = 0;
        }
        else if (event.type == egret.TouchEvent.TOUCH_END) {
            this.scaleX = 1.0;
            this.scaleY = 1.0;
            this._hitArea.x = 0;
            this._hitArea.y = 0;
        }
        else if (event.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
            this.scaleX = 1.0;
            this.scaleY = 1.0;
            this._hitArea.x = 0;
            this._hitArea.y = 0;
        }
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
    };
    return UIButton;
}(eui.Button));
__reflect(UIButton.prototype, "UIButton");
window["UIButton"] = UIButton;
/**
 *
 * @author
 *
 */
var UICircleLoading = (function (_super) {
    __extends(UICircleLoading, _super);
    function UICircleLoading() {
        var _this = _super.call(this) || this;
        _this._backImage = new egret.Bitmap();
        _this.addChild(_this._backImage);
        _this._s = new egret.Shape();
        _this.addChild(_this._s);
        return _this;
    }
    Object.defineProperty(UICircleLoading.prototype, "source", {
        get: function () {
            return this._backRes;
        },
        set: function (value) {
            this._backRes = value;
            this._backImage.texture = RES.getRes(value);
            this._r = this._backImage.width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UICircleLoading.prototype, "percent", {
        get: function () {
            return this._p;
        },
        set: function (value) {
            this._p = value;
            this.drawSector(this._s, this._r, this._r, this._r, 0, value * 360);
            this._backImage.mask = this._s;
        },
        enumerable: true,
        configurable: true
    });
    UICircleLoading.prototype.drawSector = function (shape, x, y, r, start, angle, color) {
        if (start === void 0) { start = 0; }
        if (angle === void 0) { angle = 270; }
        if (color === void 0) { color = 0xFFFFFF; }
        shape.graphics.clear();
        shape.graphics.beginFill(color);
        shape.graphics.lineStyle(0, 0xff0000);
        shape.graphics.moveTo(x, y);
        angle = (Math.abs(angle) > 360) ? 360 : angle;
        var n = Math.ceil(Math.abs(angle) / 45);
        var angleA = angle / n;
        angleA = angleA * Math.PI / 180;
        start = start * Math.PI / 180;
        shape.graphics.lineTo(x + r * Math.cos(start), y + r * Math.sin(start));
        for (var i = 1; i <= n; i++) {
            start += angleA;
            var angleMid = start - angleA / 2;
            var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
            var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
            var cx = x + r * Math.cos(start);
            var cy = y + r * Math.sin(start);
            shape.graphics.curveTo(bx, by, cx, cy);
        }
        if (angle != 360) {
            shape.graphics.lineTo(x, y);
        }
        shape.graphics.endFill();
    };
    return UICircleLoading;
}(UIComponent));
__reflect(UICircleLoading.prototype, "UICircleLoading");
window["UICircleLoading"] = UICircleLoading;
/**
 *
 * @author
 *
 */
var UIListEvent = (function (_super) {
    __extends(UIListEvent, _super);
    function UIListEvent(type, index, param) {
        if (param === void 0) { param = null; }
        var _this = _super.call(this, type) || this;
        _this.index = index;
        _this.param = param;
        return _this;
    }
    UIListEvent.ITEM_SELECTED = "UIList_Item_Selected";
    return UIListEvent;
}(egret.Event));
__reflect(UIListEvent.prototype, "UIListEvent");
var UIListDirection;
(function (UIListDirection) {
    UIListDirection[UIListDirection["Horizontal"] = 0] = "Horizontal";
    UIListDirection[UIListDirection["Vertical"] = 1] = "Vertical";
})(UIListDirection || (UIListDirection = {}));
var UIList = (function (_super) {
    __extends(UIList, _super);
    function UIList() {
        var _this = _super.call(this) || this;
        _this._widthGap = 0;
        _this._heightGap = 0;
        _this._container = new eui.Group();
        _this._container.name = "container";
        _this._event = new UIListEvent(UIListEvent.ITEM_SELECTED, 0);
        _this._scroll = new eui.Scroller();
        _this._scroll.scrollPolicyH = eui.ScrollPolicy.OFF;
        _this.addChild(_this._scroll);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        _this.direction = UIListDirection.Vertical;
        return _this;
    }
    Object.defineProperty(UIList.prototype, "scroll", {
        get: function () {
            return this._scroll;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIList.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIList.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
            if (this._direction == UIListDirection.Vertical) {
                this._scroll.scrollPolicyH = eui.ScrollPolicy.OFF;
                this._scroll.scrollPolicyV = eui.ScrollPolicy.AUTO;
            }
            else if (this._direction == UIListDirection.Horizontal) {
                this._scroll.scrollPolicyH = eui.ScrollPolicy.AUTO;
                this._scroll.scrollPolicyV = eui.ScrollPolicy.OFF;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIList.prototype, "heightGap", {
        get: function () {
            return this._heightGap;
        },
        set: function (value) {
            this._heightGap = value;
            this.bind();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIList.prototype, "widthGap", {
        get: function () {
            return this._widthGap;
        },
        set: function (value) {
            this._heightGap = value;
            this.bind();
        },
        enumerable: true,
        configurable: true
    });
    UIList.prototype.onAdded = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        //this._container.addEventListener( egret.TouchEvent.TOUCH_BEGIN , this.onItemTouch, this );
        //this.stage.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.onItemTouch, this );
        //this._container.addEventListener( egret.TouchEvent.TOUCH_END, this.onItemTouch, this );
        this._scroll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        this._scroll.width = this.width;
        this._scroll.height = this.height;
        this._scroll.viewport = this._container;
    };
    UIList.prototype.onItemTouch = function (event) {
        if (egret.is(event.target, "eui.ItemRenderer")) {
            var r = event.target;
            this._event.index = r.itemIndex;
            this._event.param = r.data;
            this.dispatchEvent(this._event);
        }
        if (egret.is(event.target, "BaseRenderView")) {
            var len = this._children.length;
            for (var i = 0; i < len; i++) {
                var b = this._children[i];
                if (this._children[i] == event.target) {
                    if (b["setCurrentState"])
                        b["setCurrentState"]("selected");
                }
                else {
                    if (b["setCurrentState"])
                        b["setCurrentState"]("normal");
                }
            }
        }
    };
    UIList.prototype.onRemoved = function (event) {
        this._scroll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        //this._container.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onItemTouch, this );
        //this.stage.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.onItemTouch, this );
        //this._container.removeEventListener( egret.TouchEvent.TOUCH_END, this.onItemTouch, this );
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    };
    Object.defineProperty(UIList.prototype, "itemRenderer", {
        set: function (cls) {
            this._itemRenderer = cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIList.prototype, "dataProvider", {
        get: function () {
            return this._dataProvider;
        },
        set: function (value) {
            this._dataProvider = value;
        },
        enumerable: true,
        configurable: true
    });
    UIList.prototype.movetoTop = function () {
        this._scroll.viewport.scrollV = 0;
        this._scroll.viewport.scrollH = 0;
    };
    UIList.prototype.bind = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ins, v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ins = new this._itemRenderer();
                        if (!egret.is(ins, "BaseRenderView")) return [3 /*break*/, 2];
                        v = ins;
                        return [4 /*yield*/, this.loadTheme(v.skinPath)];
                    case 1:
                        _a.sent();
                        this.bindData();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    UIList.prototype.loadTheme = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            EXML.load(path, function (clazz, url) {
                _this._childskin = clazz;
                resolve();
            }, _this);
        });
    };
    UIList.prototype.bindData = function () {
        if (this.parent) {
            // bind
            this._container.removeChildren();
            this._children = [];
            if (this._itemRenderer && this._dataProvider) {
                var len = this._dataProvider.length;
                for (var i = 0; i < len; i++) {
                    var c = new this._itemRenderer();
                    c.skinName = this._childskin;
                    c.itemIndex = i;
                    c.data = this._dataProvider[i];
                    if (this.direction == UIListDirection.Vertical) {
                        c.x = 0;
                        c.y = i * (c.height + this._heightGap);
                    }
                    else if (this.direction == UIListDirection.Horizontal) {
                        c.x = i * (c.width + this._widthGap);
                        c.y = 0;
                    }
                    this._container.addChild(c);
                    this._children.push(c);
                }
            }
        }
    };
    return UIList;
}(eui.Group));
__reflect(UIList.prototype, "UIList");
window["UIList"] = UIList;
var LinkProxy = (function (_super) {
    __extends(LinkProxy, _super);
    function LinkProxy() {
        var _this = _super.call(this) || this;
        _this._opened = false;
        return _this;
    }
    Object.defineProperty(LinkProxy.prototype, "socket", {
        get: function () {
            return this._socket;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkProxy.prototype, "linked", {
        get: function () {
            if (this._socket != null)
                return this._socket.connected;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    LinkProxy.prototype.linkTo = function (url) {
        var ws = "ws://";
        if (location.protocol == "http:") {
            ws = "ws://";
        }
        else if (location.protocol == "https:") {
            ws = "wss://";
        }
        this._opened = false;
        this._socket = new egret.WebSocket();
        this._socket.type = egret.WebSocket.TYPE_BINARY;
        this._socket.type = egret.WebSocket.TYPE_STRING;
        this._socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
        this._socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
        this._socket.connectByUrl(ws + url);
    };
    LinkProxy.prototype.onError = function (event) {
        this.dispatchEventWith(LinkProxy.Link_Error);
    };
    LinkProxy.prototype.onClose = function (event) {
        this._opened = false;
        this.dispatchEventWith(LinkProxy.Link_Close);
        window.clearTimeout(this._heartClock);
    };
    LinkProxy.prototype.onConnect = function (event) {
        this._opened = true;
        this.dispatchEventWith(LinkProxy.Link_Success);
        window.setTimeout(this.heartFunc, 10000);
    };
    LinkProxy.prototype.heartFunc = function () {
    };
    LinkProxy.prototype.onData = function (event) {
    };
    LinkProxy.prototype.sendOrder = function (ba) {
    };
    LinkProxy.Link_Success = "LinkProxy_Link_Success";
    LinkProxy.Link_Error = "LinkProxy_Link_Error";
    LinkProxy.Link_Close = "LinkProxy_Link_Close";
    return LinkProxy;
}(egret.EventDispatcher));
__reflect(LinkProxy.prototype, "LinkProxy");
window["LinkProxy"] = LinkProxy;
/**
 *
 * @author
 *
 */
var SceneBase = (function () {
    function SceneBase() {
    }
    SceneBase.prototype.enter = function () {
    };
    SceneBase.prototype.exit = function () {
    };
    Object.defineProperty(SceneBase.prototype, "scenename", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    return SceneBase;
}());
__reflect(SceneBase.prototype, "SceneBase", ["IScene"]);
window["SceneBase"] = SceneBase;
/**
 *
 * @author
 *
 */
var SceneManager = (function () {
    function SceneManager() {
        this._dicscene = new Array();
        this._currentscene = null;
        this._lastscene = "";
    }
    SceneManager.getInstance = function () {
        if (SceneManager._instance == null)
            SceneManager._instance = new SceneManager();
        return SceneManager._instance;
    };
    Object.defineProperty(SceneManager.prototype, "lastSceneName", {
        get: function () {
            return this._lastscene;
        },
        set: function (value) {
            this._lastscene = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "currentScene", {
        get: function () {
            return this._currentscene;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.registerScene = function (scene) {
        if (this._dicscene[scene.scenename] == null) {
            this._dicscene[scene.scenename] = scene;
        }
        else {
            Log.out(this, scene.scenename + " is exists");
        }
    };
    SceneManager.prototype.removeScene = function (scene) {
        if (this._dicscene[scene.scenename] != null) {
            this._dicscene[scene.scenename] = null;
        }
    };
    SceneManager.prototype.enterScene = function (sceneName) {
        var scene = this._dicscene[sceneName];
        if (scene != null && scene != this._currentscene) {
            if (this._currentscene != null) {
                this._lastscene = this.currentScene.scenename;
                this._currentscene.exit();
            }
            this._currentscene = scene;
            this._currentscene.enter();
        }
        else {
            Log.out(this, sceneName + " is null");
        }
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
window["SceneManager"] = SceneManager;
var PopupManager = (function (_super) {
    __extends(PopupManager, _super);
    function PopupManager() {
        return _super.call(this) || this;
    }
    PopupManager.getInstance = function () {
        if (PopupManager._instance == null)
            PopupManager._instance = new PopupManager();
        return PopupManager._instance;
    };
    PopupManager.prototype.init = function (baseLayer) {
        this.initPopLayer(baseLayer);
        this.initMsgLayer(baseLayer);
        this.initAlertLayer(baseLayer);
    };
    PopupManager.prototype.initPopLayer = function (baseLayer) {
        this._popLayer = new eui.UILayer();
        this._popLayer.name = "pop";
        this._popLayer.touchThrough = true;
        baseLayer.addChild(this._popLayer);
    };
    PopupManager.prototype.initAlertLayer = function (baseLayer) {
        this._alertLayer = new eui.UILayer();
        this._alertLayer.name = "alert";
        this._alertLayer.touchThrough = true;
        baseLayer.addChild(this._alertLayer);
    };
    PopupManager.prototype.initMsgLayer = function (baseLayer) {
        this._msgLayer = new eui.UILayer();
        this._msgLayer.name = "msg";
        this._msgLayer.touchThrough = true;
        this._msgLayer.touchEnabled = false;
        this._msgLayer.touchChildren = false;
        baseLayer.addChild(this._msgLayer);
    };
    PopupManager.delPop = function () {
        PopupManager.getInstance()._popLayer.removeChildren();
    };
    PopupManager.addPop = function (display) {
        PopupManager.getInstance()._popLayer.addChild(display);
    };
    PopupManager.addMsg = function (display) {
        PopupManager.getInstance()._msgLayer.addChild(display);
    };
    PopupManager.delMsg = function (display) {
        PopupManager.getInstance()._msgLayer.removeChild(display);
    };
    PopupManager.addAlert = function (display) {
        PopupManager.getInstance()._alertLayer.addChild(display);
    };
    PopupManager.delAlert = function (display) {
        PopupManager.getInstance()._alertLayer.removeChild(display);
    };
    return PopupManager;
}(egret.EventDispatcher));
__reflect(PopupManager.prototype, "PopupManager");
window["PopupManager"] = PopupManager;
var SoundManager = (function () {
    function SoundManager() {
        this._active = true;
        this._clicked = false;
        this._bgs = "";
        this._bgc = null;
        this._lastbgs = "";
    }
    SoundManager.getInstance = function () {
        if (SoundManager._inst == null)
            SoundManager._inst = new SoundManager();
        return SoundManager._inst;
    };
    SoundManager.prototype.init = function (s) {
        this._stage = s;
        this._stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this._stage.addEventListener(egret.Event.ACTIVATE, this.onActive, this);
        this._stage.addEventListener(egret.Event.DEACTIVATE, this.onDeActive, this);
    };
    SoundManager.prototype.onActive = function (event) {
        this._active = true;
        this.playMusic(this._lastbgs);
    };
    SoundManager.prototype.onDeActive = function (event) {
        this._active = false;
        this._lastbgs = this._bgs;
        this.stopMusic();
    };
    SoundManager.prototype.onTouch = function (event) {
        this._stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this._active = false;
        this._clicked = true;
    };
    SoundManager.prototype.playMusic = function (sound) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sound == "")
                            return [2 /*return*/];
                        console.log("prepare play sound " + sound);
                        if (!this._clicked) return [3 /*break*/, 2];
                        console.log("prepare load sound " + sound);
                        return [4 /*yield*/, RES.getResAsync(sound)];
                    case 1:
                        _a.sent();
                        console.log(" load sound " + sound + "complete");
                        this._bgs = sound;
                        if (this._bgc != null) {
                            this._bgc.stop();
                            this._bgc = null;
                        }
                        if (this._bgs != "") {
                            res = RES.getRes(this._bgs);
                            if (res != null) {
                                this._bgc = res.play();
                                console.log("play sound " + sound);
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        console.log("not prepare");
                        if (this._clicked == false)
                            console.log("not click");
                        if (this._bgs == sound)
                            console.log("same name");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SoundManager.prototype.stopMusic = function () {
        if (this._bgc != null) {
            this._bgc.stop();
            this._bgc = null;
        }
        this._bgs = "";
    };
    SoundManager.prototype.playSound = function (sound) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._clicked) return [3 /*break*/, 2];
                        return [4 /*yield*/, RES.getResAsync(sound)];
                    case 1:
                        _a.sent();
                        res = RES.getRes(sound);
                        if (res != null) {
                            res.play(0, 1);
                        }
                        else {
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
window["SoundManager"] = SoundManager;
/**
 *
 * @author
 *
 */
var UpdateManager = (function () {
    function UpdateManager() {
    }
    UpdateManager.start = function () {
        this._started = true;
    };
    UpdateManager.stop = function () {
        this._started = false;
    };
    UpdateManager.init = function () {
        this._lastDelta = egret.getTimer();
        egret.Ticker.getInstance().register(this.update, this);
    };
    UpdateManager.update = function (delta) {
        if (this._started) {
            for (var i = this._dicupdateable.length - 1; i >= 0; i--) {
                if (this._dicupdateable[i].deleted) {
                    this._dicupdateable.splice(i, 1);
                }
                else {
                    this._dicupdateable[i].update(delta);
                }
            }
        }
    };
    UpdateManager.addUpdateable = function (up) {
        var index = this._dicupdateable.indexOf(up);
        up.deleted = false;
        if (index == -1) {
            this._dicupdateable.push(up);
        }
        else {
            //this._dicupdateable[index].deleted = false;
        }
    };
    UpdateManager.delUpdateable = function (up) {
        var index = this._dicupdateable.indexOf(up);
        if (index > -1) {
            this._dicupdateable[index].deleted = true;
        }
    };
    UpdateManager._dicupdateable = [];
    UpdateManager._started = false;
    return UpdateManager;
}());
__reflect(UpdateManager.prototype, "UpdateManager");
window["UpdateManager"] = UpdateManager;
/**
 *
 * @author
 *
 */
var XMLManager = (function () {
    function XMLManager() {
        this._dicData = new Array();
    }
    XMLManager.getInstance = function () {
        if (XMLManager._instance == null)
            XMLManager._instance = new XMLManager();
        return XMLManager._instance;
    };
    XMLManager.prototype.getListByName = function (name) {
        return this._dicData[name];
    };
    XMLManager.prototype.parseAll = function (data) {
        for (var s in data) {
            this.parse(s, data[s]);
        }
    };
    XMLManager.prototype.parse = function (resName, res) {
        var cls = egret.getDefinitionByName(resName + "Vo");
        if (res != null && cls != null) {
            var list = new Array();
            for (var i = 0; i < res.length; i++) {
                var vo = new cls(res[i]);
                list.push(vo);
            }
            this._dicData[resName] = list;
        }
        else {
            Log.out(this, "parse error " + res);
        }
    };
    return XMLManager;
}());
__reflect(XMLManager.prototype, "XMLManager");
window["XMLManager"] = XMLManager;
var DragonBonesAnimation = (function (_super) {
    __extends(DragonBonesAnimation, _super);
    function DragonBonesAnimation() {
        var _this = _super.call(this) || this;
        _this._loaded = false;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        return _this;
    }
    DragonBonesAnimation.prototype.onRemoved = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        if (this._display) {
            this._display.removeEvent(dragonBones.EventObject.COMPLETE, this.onComplete, this);
            this._display.dispose();
        }
    };
    DragonBonesAnimation.prototype.buildArmature = function (resName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._loaded = false;
                        return [4 /*yield*/, RES.getResAsync(resName + "_tex_json")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync(resName + "_tex_png")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync(resName + "_ske_dbbin")];
                    case 3:
                        _a.sent();
                        dragonBones.EgretFactory.factory.parseDragonBonesData(RES.getRes(resName + "_ske_dbbin"));
                        dragonBones.EgretFactory.factory.parseTextureAtlasData(RES.getRes(resName + "_tex_json"), RES.getRes(resName + "_tex_png"));
                        this._loaded = true;
                        this.dispatchEventWith(DragonBonesAnimation.DragonBonesAnimation_LoadComplete);
                        return [2 /*return*/];
                }
            });
        });
    };
    DragonBonesAnimation.prototype.buildArmatureDisplay = function (armature) {
        if (this._display != null) {
            this._display.removeEvent(dragonBones.EventObject.COMPLETE, this.onComplete, this);
            this.removeChildren();
            this._display = null;
        }
        this._display = dragonBones.EgretFactory.factory.buildArmatureDisplay(armature);
        this._display.addEvent(dragonBones.EventObject.COMPLETE, this.onComplete, this);
        this.addChild(this._display);
    };
    DragonBonesAnimation.prototype.onComplete = function (event) {
        this.dispatchEventWith(DragonBonesAnimation.DragonBonesAnimation_Complete);
    };
    DragonBonesAnimation.prototype.play = function (animation) {
        if (this._loaded) {
            this._display.animation.play(animation);
        }
    };
    DragonBonesAnimation.DragonBonesAnimation_LoadComplete = "DragonBonesAnimation_LoadComplete";
    DragonBonesAnimation.DragonBonesAnimation_Complete = "DragonBonesAnimation_Complete";
    return DragonBonesAnimation;
}(egret.DisplayObjectContainer));
__reflect(DragonBonesAnimation.prototype, "DragonBonesAnimation");
window["DragonBonesAnimation"] = DragonBonesAnimation;
