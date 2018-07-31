/**
 *
 * @author 
 *
 */
class BaseRenderView extends eui.ItemRenderer implements IMediator {


    public constructor() {
        super();

        this.touchChildren = false;
        this.touchEnabled = true;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);

        this.skinName = this.skinClass;
    }

    public notificationListeners(): Array<string> {
        return [];
    }

    public executeNotification(notificationName: string, obj: any, obj2: any)
    { }

    public get skinPath(): string {
        return "";
    }

    public get skinClass(): string {
        return "";
    }

    protected onAdded(event: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        Facade.registerNotifListeners(this);
    }

    protected onRemoved(event: egret.Event): void {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        Facade.removeNotifListeners(this);
        this.removeChildren();
    }


}

window["BaseRenderView"] = BaseRenderView;