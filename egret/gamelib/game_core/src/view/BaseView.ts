/**
 *
 * @author 
 *
 */
class BaseView extends eui.Component implements IMediator {

    public _loaded: boolean;

    public flag: any;

    public constructor() {
        super();
        this._loaded = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        this.touchEnabled = false;
        this.touchChildren = false;
    }

    public get skinPath(): string {
        return "";
    }

    public get resourceGroup(): string {
        return "";
    }

    public get skinClass(): string {
        return "";
    }

    public notificationListeners(): Array<string> {
        return [];
    }

    public executeNotification(notificationName: string, obj: any, obj2: any)
    { }

    protected onAdded(event: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.loadGroup();
    }

    /**
     * 加载资源组
     */
    protected async loadGroup(): Promise<void> {
        this.touchEnabled = false;
        this.touchChildren = false;
        if (this.resourceGroup.length > 0)
            await RES.loadGroup(this.resourceGroup);
        // if (this.skinPath.length > 0)
        //     await this.loadTheme();
        this.addEventListener(egret.Event.COMPLETE, this.onSkinComplete, this);
        this.skinName = this.skinClass;

    }

    protected onSkinComplete(event: egret.Event): void {
        this.loadComplete();
    }

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
    public get loaded(): boolean {
        return this._loaded;
    }

    /**
     * 加载完成回调
     */
    protected loadComplete(): void {
        this.touchEnabled = true;
        this.touchChildren = true;
        this._loaded = true;
        Facade.registerNotifListeners(this);
    }

    protected onRemoved(event: egret.Event): void {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        Facade.removeNotifListeners(this);
        this.removeChildren();
    }

}

window["BaseView"] = BaseView;