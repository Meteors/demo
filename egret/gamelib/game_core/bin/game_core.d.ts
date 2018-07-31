/**
 *
 * @author
 *
 */
declare class UIComponent extends egret.DisplayObjectContainer {
    constructor();
    protected onAdded(event: egret.Event): void;
    protected onRemoved(event: egret.Event): void;
}
/**
 *
 * @author
 *
 */
declare enum UIGridType {
    Horizontal = 0,
    Vertical = 1,
}
declare class UIGridEvent extends egret.Event {
    index: number;
    param: any;
    static ITEM_CLICK: string;
    constructor(type: string, index: number, param?: any);
}
declare class UIGrid extends eui.Group {
    private _scroll;
    private _container;
    private _itemRenderer;
    private _dataProvider;
    private _gap;
    private _type;
    private _count;
    private _moved;
    private _event;
    private _children;
    private _customPoint;
    private _childskinloaded;
    private _childskin;
    constructor();
    customArray: Array<Array<number>>;
    setWidth(value: number): void;
    setHeight(value: number): void;
    protected onAdded(event: egret.Event): void;
    private onItemTouch(event);
    protected onRemoved(event: egret.Event): void;
    type: UIGridType;
    gap: number;
    getSubChildAt(index: number): egret.DisplayObject;
    readonly childrenCount: number;
    lineCount: number;
    itemRenderer: any;
    bind(): Promise<void>;
    /**
     * 加载皮肤
     */
    protected loadTheme(path: string): Promise<{}>;
    dataProvider: Array<any>;
    readonly scrollerV: number;
    scrollerH: number;
    movetoTop(): void;
    reorder(): void;
    private bindData();
    private calcPosition(c, pos);
}
/**
 *
 * @author
 *
 */
declare class Mediator implements IMediator {
    constructor();
    notificationListeners(): Array<string>;
    executeNotification(notificationName: string, obj: any): void;
}
/**
 *
 * @author
 *
 */
declare class Facade {
    private static _dicmediator;
    constructor();
    static sendNotification(notificationName: string, obj?: any, obj2?: any): void;
    static registerNotifListeners(mediator: IMediator): void;
    static removeNotifListeners(mediator: IMediator): void;
}
declare class JsonpMap {
}
declare class NetUtil {
    private static _jsonp;
    static postSubmit(url: string, params: any): any;
    static getNetResult(url: string, successFunc: Function, failFunc: Function, thisObject: any): void;
    static getNetResultByJsonP(url: string, successFunc: Function, thisObject: any): void;
}
/**
 *
 * @author
 *
 */
declare class TimeUtil {
    /**
     * 1小时内显示“刚刚”
     * 24小时以内显示“1—23小时”
     * 超过24小时，每满24小时加1天.
     */
    static getTimeStr(second: number): string;
    static getTimeString(second: number): string;
    static getTimeString2(second: number): string;
    static getTimeStringSimple(second: number, type?: string): string;
    private static format(d, fs);
    static getDateTimeString(second: number, type?: string): string;
    static getTimeStringType1(second: number): string;
    static getTimeShortStringType(second: number): string;
    static getTimeStamp(): number;
    static getServerNowTime(timeStamp: number): string;
}
/**
 *
 * @author
 *
 */
declare class ParamsUtil {
    static getQueryString(value: string): string;
    static getUrlQueryString(params: string, value: string): string;
    static getPassportString(): string;
}
/**
 *
 * @author
 *
 */
declare class RandomUtil {
    private static seed;
    private static result;
    private static a;
    private static b;
    static resetSeed(): void;
    static setSeed(seed: number): void;
    static getSeed(): number;
    private static getR();
    static getRandom(min: number, max: number): number;
}
/**
 *
 * @author
 *
 */
declare class BaseView extends eui.Component implements IMediator {
    _loaded: boolean;
    flag: any;
    constructor();
    readonly skinPath: string;
    readonly resourceGroup: string;
    readonly skinClass: string;
    notificationListeners(): Array<string>;
    executeNotification(notificationName: string, obj: any, obj2: any): void;
    protected onAdded(event: egret.Event): void;
    /**
     * 加载资源组
     */
    protected loadGroup(): Promise<void>;
    protected onSkinComplete(event: egret.Event): void;
    /**
     * 加载皮肤
     */
    /**
     * 加载完成标志
     */
    readonly loaded: boolean;
    /**
     * 加载完成回调
     */
    protected loadComplete(): void;
    protected onRemoved(event: egret.Event): void;
}
/**
 *
 * @author
 *
 */
declare class BaseRenderView extends eui.ItemRenderer implements IMediator {
    constructor();
    notificationListeners(): Array<string>;
    executeNotification(notificationName: string, obj: any, obj2: any): void;
    readonly skinPath: string;
    readonly skinClass: string;
    protected onAdded(event: egret.Event): void;
    protected onRemoved(event: egret.Event): void;
}
/**
 *
 * @author
 *
 */
declare class Log {
    private static _id;
    constructor();
    static out(object: any, message: string): void;
}
/**
 *
 * @author
 *
 */
declare class UIButton extends eui.Button {
    private _hitArea;
    private _touchdown;
    protected labelDisplay2: any;
    constructor();
    extLabel: string;
    setState(value: string): void;
    hitArea: eui.Rect;
    inArea(event: egret.TouchEvent): boolean;
    protected onTweenComplete(): void;
    protected onAdded(event: egret.Event): void;
    protected onRemoved(event: egret.Event): void;
    private scale;
    setScale(scale: number): void;
    protected onTouch(event: egret.TouchEvent): void;
}
/**
 *
 * @author
 *
 */
declare class UICircleLoading extends UIComponent {
    private _backImage;
    private _backRes;
    private _r;
    private _p;
    private _s;
    constructor();
    source: string;
    percent: number;
    private drawSector(shape, x, y, r, start?, angle?, color?);
}
/**
 *
 * @author
 *
 */
interface IMediator {
    notificationListeners(): Array<string>;
    executeNotification(notificationName: string, obj: any, obj2: any): any;
}
/**
 *
 * @author
 *
 */
declare class UIListEvent extends egret.Event {
    index: number;
    param: any;
    static ITEM_SELECTED: string;
    constructor(type: string, index: number, param?: any);
}
declare enum UIListDirection {
    Horizontal = 0,
    Vertical = 1,
}
declare class UIList extends eui.Group {
    private _container;
    private _scroll;
    private _itemRenderer;
    private _dataProvider;
    private _event;
    private _direction;
    private _widthGap;
    private _heightGap;
    private _moved;
    private _children;
    private _childskinloaded;
    private _childskin;
    constructor();
    readonly scroll: eui.Scroller;
    readonly children: Array<eui.IItemRenderer>;
    direction: UIListDirection;
    heightGap: number;
    widthGap: number;
    protected onAdded(event: egret.Event): void;
    private onItemTouch(event);
    protected onRemoved(event: egret.Event): void;
    itemRenderer: any;
    dataProvider: Array<any>;
    movetoTop(): void;
    bind(): Promise<void>;
    protected loadTheme(path: string): Promise<{}>;
    private bindData();
}
declare class LinkProxy extends egret.EventDispatcher {
    static Link_Success: string;
    static Link_Error: string;
    static Link_Close: string;
    private _socket;
    private _heartClock;
    private _opened;
    constructor();
    protected readonly socket: egret.WebSocket;
    readonly linked: boolean;
    linkTo(url: string): void;
    protected onError(event: egret.IOErrorEvent): void;
    protected onClose(event: egret.Event): void;
    protected onConnect(event: egret.Event): void;
    protected heartFunc(): void;
    protected onData(event: egret.ProgressEvent): void;
    sendOrder(ba: egret.ByteArray): void;
}
/**
 *
 * @author
 *
 */
interface IScene {
    enter(): void;
    exit(): void;
    scenename: string;
}
/**
 *
 * @author
 *
 */
declare class SceneBase implements IScene {
    constructor();
    enter(): void;
    exit(): void;
    readonly scenename: string;
}
/**
 *
 * @author
 *
 */
declare class SceneManager {
    private _dicscene;
    private _currentscene;
    private _lastscene;
    private static _instance;
    constructor();
    static getInstance(): SceneManager;
    lastSceneName: string;
    readonly currentScene: IScene;
    registerScene(scene: IScene): void;
    removeScene(scene: IScene): void;
    enterScene(sceneName: string): void;
}
declare class PopupManager extends egret.EventDispatcher {
    protected _popLayer: eui.UILayer;
    protected _msgLayer: eui.UILayer;
    protected _alertLayer: eui.UILayer;
    constructor();
    private static _instance;
    static getInstance(): PopupManager;
    init(baseLayer: eui.UILayer): void;
    private initPopLayer(baseLayer);
    private initAlertLayer(baseLayer);
    private initMsgLayer(baseLayer);
    static delPop(): void;
    static addPop(display: eui.Component): void;
    static addMsg(display: eui.Component): void;
    static delMsg(display: eui.Component): void;
    static addAlert(display: eui.Component): void;
    static delAlert(display: eui.Component): void;
}
declare class SoundManager {
    private static _inst;
    static getInstance(): SoundManager;
    private _active;
    private _clicked;
    private _stage;
    private _bgc;
    private _bgs;
    private _lastbgs;
    constructor();
    init(s: egret.Stage): void;
    private onActive(event);
    private onDeActive(event);
    private onTouch(event);
    playMusic(sound: string): Promise<void>;
    stopMusic(): void;
    playSound(sound: string): Promise<void>;
}
/**
 *
 * @author
 *
 */
interface IUpdateable {
    update(delta: number): void;
    deleted: boolean;
}
/**
 *
 * @author
 *
 */
declare class UpdateManager {
    private static _dicupdateable;
    private static _lastDelta;
    private static _started;
    constructor();
    static start(): void;
    static stop(): void;
    static init(): void;
    static update(delta: number): void;
    static addUpdateable(up: IUpdateable): void;
    static delUpdateable(up: IUpdateable): void;
}
/**
 *
 * @author
 *
 */
declare class XMLManager {
    private static _instance;
    private _dicData;
    static getInstance(): XMLManager;
    getListByName(name: string): Array<any>;
    parseAll(data: any): void;
    parse(resName: string, res: Array<any>): void;
}
declare var resourceVersion: string;
declare class DragonBonesAnimation extends egret.DisplayObjectContainer {
    static DragonBonesAnimation_LoadComplete: string;
    static DragonBonesAnimation_Complete: string;
    private _loaded;
    private _display;
    constructor();
    private onRemoved(event);
    buildArmature(resName: string): Promise<void>;
    buildArmatureDisplay(armature: string): void;
    private onComplete(event);
    play(animation: string): void;
}
