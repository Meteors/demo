/**
 *
 * @author 
 *
 */
class UIButton extends eui.Button {
    private _hitArea: eui.Rect;
    private _touchdown: boolean;

    protected labelDisplay2: any;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        this.touchChildren = false;
    }

    public set extLabel(value: string) {
        if (this.labelDisplay2 != null)
            this.labelDisplay2.text = value;
    }

    public get extLabel(): string {
        if (this.labelDisplay2 != null)
            return this.labelDisplay2.text;
        return "";
    }

    public setState(value: string): void {
        this.currentState = value;//"locked";"normal";
        this.invalidateState();
    }

    public set hitArea(rect: eui.Rect) {
        this._hitArea = rect;
        this._hitArea.visible = false;
    }

    public get hitArea(): eui.Rect {
        return this._hitArea;
    }

    public inArea(event: egret.TouchEvent): boolean {
        var rect: egret.Rectangle = this._hitArea.getTransformedBounds(this.stage);
        var b: boolean = rect.containsPoint(new egret.Point(event.stageX, event.stageY));
        return b;
    }

    protected onTweenComplete(): void {
    }

    protected onAdded(event: egret.Event): void {
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
    }

    protected onRemoved(event: egret.Event): void {

        //this.removeChildren();

        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
    }

    private scale: number = 1.05;

    public setScale(scale: number): void {
        this.scale = scale;
    }

    protected onTouch(event: egret.TouchEvent): void {
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
    }
}

window["UIButton"] = UIButton;