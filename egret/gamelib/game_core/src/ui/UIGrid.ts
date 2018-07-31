/**
 *
 * @author 
 *
 */
enum UIGridType {
    Horizontal,
    Vertical
}

class UIGridEvent extends egret.Event {
    public index: number;
    public param: any;
    public static ITEM_CLICK: string = "UIGrid_Item_Click";

    public constructor(type: string, index: number, param: any = null) {
        super(type);
        this.index = index;
        this.param = param;
    }
}

class UIGrid extends eui.Group {
    private _scroll: eui.Scroller;
    private _container: eui.Group;
    private _itemRenderer: any;
    private _dataProvider: Array<any>;
    private _gap: number = 0;
    private _type: UIGridType;
    private _count: number = 5;
    private _moved: boolean;
    private _event: UIGridEvent;
    private _children: Array<eui.IItemRenderer>;
    private _customPoint: Array<Array<number>>;
    private _childskinloaded: boolean;
    private _childskin: any;

    public constructor() {
        super();

        this._container = new eui.Group();
        this._container.name = "container";
        this._container.touchEnabled = true;
        this._container.touchThrough = true;

        this.addChild(this._container);
        this._scroll = new eui.Scroller();
        this._scroll.name = "scroll";

        this.type = UIGridType.Vertical;
        this.addChild(this._scroll);
        this._scroll.viewport = this._container;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);

        this._event = new UIGridEvent(UIGridEvent.ITEM_CLICK, 0);
        this._customPoint = null;
        this._childskinloaded = false;
    }

    public set customArray(a: Array<Array<number>>) {
        this._customPoint = a;
    }

    public get customArray(): Array<Array<number>> {
        return this._customPoint;
    }

    public setWidth(value: number): void {
        this.width = value;
        this._container.width = this.width;
        this._scroll.width = this.width;
    }

    public setHeight(value: number): void {
        this.height = value;
        this._container.height = this.height;
        this._scroll.height = this.height;
    }

    protected onAdded(event: egret.Event): void {
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
        this._container.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        //this._container.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onItemTouch, this );
        //this._container.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.onItemTouch, this );
        //this._container.removeEventListener( egret.TouchEvent.TOUCH_END, this.onItemTouch, this );

        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }

    public set type(value: UIGridType) {
        this._type = value;
        this.reorder();
    }

    public set gap(value: number) {
        this._gap = value;
        this.reorder();
    }

    public getSubChildAt(index: number): egret.DisplayObject {
        return this._children[index];
    }

    public get childrenCount(): number {
        return this._container.numChildren;
    }

    public set lineCount(value: number) {
        this._count = value;
        this.reorder();
    }

    public set itemRenderer(cls: any) {
        this._itemRenderer = cls;
    }

    public async bind(): Promise<void> {
        var ins: any = new this._itemRenderer();

        if (egret.is(ins, "BaseRenderView")) {
            var v: BaseRenderView = <BaseRenderView>ins;
            await this.loadTheme(v.skinPath);
            this.bindData();
        }

    }

    /**
     * 加载皮肤
     */
    protected loadTheme(path: string): Promise<{}> {
        return new Promise((resolve, reject) => {
            EXML.load(path, (clazz: any, url: string) => {
                this._childskin = clazz;
                resolve();
            }, this);
        });
    }

    public set dataProvider(value: Array<any>) {
        this._dataProvider = value;
    }

    public get dataProvider(): Array<any> {
        return this._dataProvider;
    }

    public get scrollerV(): number {
        return this._scroll.viewport.scrollV;
    }

    public set scrollerH(value: number) {
        this._scroll.viewport.scrollH = value;
    }

    public movetoTop(): void {
        this._scroll.viewport.scrollV = 0;
        this._scroll.viewport.scrollH = 0;
    }

    public reorder(): void {
        if (this.parent && this._children) {
            var pos: number = 0, len: number = this._children.length;
            for (var i: number = 0; i < len; i++) {
                var c: any = this._children[i];
                if (c.visible) {
                    this.calcPosition(c, pos);
                    pos++;
                } else {
                    c.x = c.y = 0;
                }
            }
        }
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
                    c.name = egret.getQualifiedClassName(c) + i;
                    c.data = this._dataProvider[i];
                    this.calcPosition(c, i);
                    this._container.addChild(c);
                    this._children.push(c);
                }
            }
            this.movetoTop();
        }
    }

    private calcPosition(c: any, pos: number): void {
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
    }
}

window["UIGrid"] = UIGrid;