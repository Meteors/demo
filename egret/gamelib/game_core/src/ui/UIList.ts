/**
 *
 * @author 
 *
 */
class UIListEvent extends egret.Event {
    public index: number;
    public param: any;
    public static ITEM_SELECTED: string = "UIList_Item_Selected";

    public constructor(type: string, index: number, param: any = null) {
        super(type);
        this.index = index;
        this.param = param;
    }
}

enum UIListDirection {
    Horizontal,
    Vertical
}

class UIList extends eui.Group {
    private _container: eui.Group;
    private _scroll: eui.Scroller;
    private _itemRenderer: any;
    private _dataProvider: Array<any>;
    private _event: UIListEvent;
    private _direction: UIListDirection;

    private _widthGap: number = 0;
    private _heightGap: number = 0;

    private _moved: boolean;
    private _children: Array<eui.IItemRenderer>;

    private _childskinloaded: boolean;
    private _childskin: any;

    public constructor() {
        super();

        this._container = new eui.Group();
        this._container.name = "container"
        this._event = new UIListEvent(UIListEvent.ITEM_SELECTED, 0);
        this._scroll = new eui.Scroller();
        this._scroll.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.addChild(this._scroll);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        this.direction = UIListDirection.Vertical;
    }

    public get scroll(): eui.Scroller {
        return this._scroll;
    }

    public get children(): Array<eui.IItemRenderer> {
        return this._children;
    }

    public set direction(value: UIListDirection) {
        this._direction = value;
        if (this._direction == UIListDirection.Vertical) {
            this._scroll.scrollPolicyH = eui.ScrollPolicy.OFF;
            this._scroll.scrollPolicyV = eui.ScrollPolicy.AUTO;
        }
        else if (this._direction == UIListDirection.Horizontal) {
            this._scroll.scrollPolicyH = eui.ScrollPolicy.AUTO;
            this._scroll.scrollPolicyV = eui.ScrollPolicy.OFF;
        }
    }

    public get direction(): UIListDirection {
        return this._direction;
    }

    public set heightGap(value: number) {
        this._heightGap = value;
        this.bind();
    }
    public set widthGap(value: number) {
        this._heightGap = value;
        this.bind();
    }
    public get widthGap(): number {
        return this._widthGap;
    }
    public get heightGap(): number {
        return this._heightGap;
    }

    protected onAdded(event: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);

        //this._container.addEventListener( egret.TouchEvent.TOUCH_BEGIN , this.onItemTouch, this );
        //this.stage.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.onItemTouch, this );
        //this._container.addEventListener( egret.TouchEvent.TOUCH_END, this.onItemTouch, this );
        this._scroll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        this._scroll.width = this.width;
        this._scroll.height = this.height;
        this._scroll.viewport = this._container;
    }


    private onItemTouch(event: egret.TouchEvent): void {

        if (egret.is(event.target, "eui.ItemRenderer")) {
            var r: eui.ItemRenderer = <eui.ItemRenderer>event.target;
            this._event.index = r.itemIndex;
            this._event.param = r.data;
            this.dispatchEvent(this._event);

        }

        if (egret.is(event.target, "BaseRenderView")) {
            var len: number = this._children.length;
            for (var i: number = 0; i < len; i++) {
                var b: eui.IItemRenderer = this._children[i];
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

    }

    protected onRemoved(event: egret.Event): void {
        this._scroll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        //this._container.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onItemTouch, this );
        //this.stage.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.onItemTouch, this );
        //this._container.removeEventListener( egret.TouchEvent.TOUCH_END, this.onItemTouch, this );
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }

    public set itemRenderer(cls: any) {
        this._itemRenderer = cls;
    }

    public set dataProvider(value: Array<any>) {
        this._dataProvider = value;
    }

    public get dataProvider(): Array<any> {
        return this._dataProvider;
    }

    public movetoTop(): void {
        this._scroll.viewport.scrollV = 0;
        this._scroll.viewport.scrollH = 0;
    }

    public async bind(): Promise<void> {
        var ins: any = new this._itemRenderer();

        if (egret.is(ins, "BaseRenderView")) {
            var v: BaseRenderView = <BaseRenderView>ins;
            await this.loadTheme(v.skinPath);
            this.bindData();
        }

    }

    protected loadTheme(path: string): Promise<{}> {
        return new Promise((resolve, reject) => {
            EXML.load(path, (clazz: any, url: string) => {
                this._childskin = clazz;
                resolve();
            }, this);
        });
    }

    private bindData(): void {
        if (this.parent) {
            // bind
            this._container.removeChildren();
            this._children = [];
            if (this._itemRenderer && this._dataProvider) {
                var len: number = this._dataProvider.length;
                for (var i: number = 0; i < len; i++) {
                    var c: any = new this._itemRenderer();
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
    }
}

window["UIList"] = UIList;