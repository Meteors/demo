class PopupManager extends egret.EventDispatcher {
    // 弹出层
    protected _popLayer: eui.UILayer;
    // 飘字层
    protected _msgLayer: eui.UILayer;
    // 警告层
    protected _alertLayer: eui.UILayer;

    public constructor() {
        super();
    }

    private static _instance: PopupManager;

    public static getInstance(): PopupManager {
        if (PopupManager._instance == null)
            PopupManager._instance = new PopupManager();
        return PopupManager._instance;
    }

    public init(baseLayer: eui.UILayer): void {
        this.initPopLayer(baseLayer);
        this.initMsgLayer(baseLayer);
        this.initAlertLayer(baseLayer);
    }

    private initPopLayer(baseLayer: eui.UILayer): void {
        this._popLayer = new eui.UILayer();
        this._popLayer.name = "pop";
        this._popLayer.touchThrough = true;
        baseLayer.addChild(this._popLayer);
    }

    private initAlertLayer(baseLayer: eui.UILayer): void {
        this._alertLayer = new eui.UILayer();
        this._alertLayer.name = "alert";
        this._alertLayer.touchThrough = true;
        baseLayer.addChild(this._alertLayer);
    }

    private initMsgLayer(baseLayer: eui.UILayer): void {
        this._msgLayer = new eui.UILayer();
        this._msgLayer.name = "msg";
        this._msgLayer.touchThrough = true;
        this._msgLayer.touchEnabled = false;
        this._msgLayer.touchChildren = false;
        baseLayer.addChild(this._msgLayer);
    }

    public static delPop() {
        PopupManager.getInstance()._popLayer.removeChildren();
    }

    public static addPop(display: eui.Component): void {
        PopupManager.getInstance()._popLayer.addChild(display);
    }

    public static addMsg(display: eui.Component): void {
        PopupManager.getInstance()._msgLayer.addChild(display);
    }

    public static delMsg(display: eui.Component) {
        PopupManager.getInstance()._msgLayer.removeChild(display);
    }

    public static addAlert(display: eui.Component): void {
        PopupManager.getInstance()._alertLayer.addChild(display);
    }

    public static delAlert(display: eui.Component) {
        PopupManager.getInstance()._alertLayer.removeChild(display);
    }
}

window["PopupManager"] = PopupManager;