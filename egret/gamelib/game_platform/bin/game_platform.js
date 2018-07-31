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
var GamePlatform = (function () {
    function GamePlatform() {
        this.realNameCertification = -1;
        this.params = {};
        this.inited = false;
    }
    GamePlatform.prototype.init = function () {
        this.inited = true;
    };
    GamePlatform.prototype.login = function (completeFunc, completeHandler) {
        this._loginHandler = completeHandler;
        this._loginFunc = completeFunc;
    };
    GamePlatform.prototype.pay = function (args, completeFunc, completeHandler) {
        this._payHandler = completeHandler;
        this._payFunc = completeFunc;
    };
    GamePlatform.prototype.loginComplete = function () {
        if (this._loginHandler != null && this._loginFunc != null) {
            this._loginFunc.call(this._loginHandler);
        }
    };
    GamePlatform.prototype.payComplete = function () {
        if (this._payHandler != null && this._payFunc != null) {
            this._payFunc.call(this._payHandler);
        }
    };
    GamePlatform.prototype.getSid = function () {
        return "";
    };
    GamePlatform.prototype.onShare = function (data) {
    };
    return GamePlatform;
}());
__reflect(GamePlatform.prototype, "GamePlatform", ["IGamePlatform"]);
window["GamePlatform"] = GamePlatform;
var PlatformFanPianWan = (function (_super) {
    __extends(PlatformFanPianWan, _super);
    function PlatformFanPianWan() {
        var _this = _super.call(this) || this;
        _this.realNameCertification = -1;
        _this.appId = "600008";
        _this.appKey = "zAQeydRfyX9P8wPq4JGbfjjyYa181Qdd";
        return _this;
    }
    PlatformFanPianWan.prototype.init = function () {
        _super.prototype.init.call(this);
        this.params.token = PlatformProxy.getInstance().getQueryString("token");
        this.params.appId = this.appId;
        this.params.channelId = PlatformProxy.getInstance().getQueryString("channelId");
        this.params.state = PlatformProxy.getInstance().getQueryString("state");
        this.params.time = PlatformProxy.getInstance().getQueryString("time");
        this.params.sign = PlatformProxy.getInstance().getQueryString("sign");
        this.params.roomid = PlatformProxy.getInstance().getQueryString("roomid");
        this.params.codeid = PlatformProxy.getInstance().getQueryString("codeid");
        this.params.appState = PlatformProxy.getInstance().getQueryString("appState");
    };
    PlatformFanPianWan.prototype.getSid = function () {
        var s = "";
        return encodeURIComponent(s);
    };
    PlatformFanPianWan.prototype.login = function (completeFunc, completeHandler) {
        _super.prototype.login.call(this, completeFunc, completeHandler);
        this.loginComplete();
    };
    PlatformFanPianWan.prototype.pay = function (args, completeFunc, completeHandler) {
    };
    PlatformFanPianWan.prototype.onShare = function (data) {
        var para = {};
        if (data.ptmatchid != null) {
            para.ptmatchid = data.ptmatchid;
        }
        fpclient.share({
            title: data.title,
            desc: data.desc,
            imgUrl: "",
            para: para
        }, data.shareFunc, data.shareObj);
    };
    return PlatformFanPianWan;
}(GamePlatform));
__reflect(PlatformFanPianWan.prototype, "PlatformFanPianWan");
window["PlatformFanPianWan"] = PlatformFanPianWan;
var PlatformType;
(function (PlatformType) {
    PlatformType[PlatformType["None"] = 0] = "None";
    PlatformType[PlatformType["FanPianWan"] = 3] = "FanPianWan";
})(PlatformType || (PlatformType = {}));
var PlatformProxy = (function () {
    function PlatformProxy() {
    }
    PlatformProxy.getInstance = function () {
        if (PlatformProxy._inst == null)
            PlatformProxy._inst = new PlatformProxy();
        return PlatformProxy._inst;
    };
    Object.defineProperty(PlatformProxy.prototype, "currentPlatform", {
        get: function () {
            return this._currentPlatform;
        },
        enumerable: true,
        configurable: true
    });
    PlatformProxy.prototype.getQueryString = function (value) {
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
    /**
     * 初始化平台
     */
    PlatformProxy.prototype.init = function (data) {
        if (data != null) {
            var gameJson = data;
            this.gameApi = gameJson.gameApi;
            this.gameApiDev = gameJson.gameApiDev;
            this.gameVersion = gameJson.gameVersion;
            this.platform = gameJson.platform;
            if (this.getQueryString("p") != "") {
                this.platform = +this.getQueryString("p");
            }
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                this.platform = PlatformType.None;
            }
            this.platformStartInit();
        }
        else {
            console.log(this, "没有找到游戏配置文件");
        }
    };
    /**
     * 平台开始初始化
     */
    PlatformProxy.prototype.platformStartInit = function () {
        if (this.platform == PlatformType.None) {
            // 如果是无平台，则自动初始化成功
            this._currentPlatform = new GamePlatform();
            this._currentPlatform.init();
            this.platformInitSuccess();
        }
        else {
            if (this.platform == PlatformType.FanPianWan) {
                this._currentPlatform = new PlatformFanPianWan();
            }
            this._currentPlatform.init();
            this._currentPlatform.login(this.platformInitSuccess, this);
        }
    };
    /**
     * 平台初始化成功
     */
    PlatformProxy.prototype.platformInitSuccess = function () {
        // this.getPassport();
    };
    PlatformProxy.Login = "Platform_Login";
    return PlatformProxy;
}());
__reflect(PlatformProxy.prototype, "PlatformProxy");
window["PlatformType"] = PlatformType;
window["PlatformProxy"] = PlatformProxy;
