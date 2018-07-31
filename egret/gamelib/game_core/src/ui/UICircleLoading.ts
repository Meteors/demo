/**
 *
 * @author 
 *
 */
class UICircleLoading extends UIComponent {
    private _backImage: egret.Bitmap;
    private _backRes: string;
    private _r: number;
    private _p: number;
    private _s: egret.Shape;

    public constructor() {
        super();
        this._backImage = new egret.Bitmap();
        this.addChild(this._backImage);
        this._s = new egret.Shape();
        this.addChild(this._s);

    }

    public set source(value: string) {
        this._backRes = value;
        this._backImage.texture = RES.getRes(value);
        this._r = this._backImage.width / 2;
    }

    public get source(): string {
        return this._backRes;
    }

    public set percent(value: number) {
        this._p = value;
        this.drawSector(this._s, this._r, this._r, this._r, 0, value * 360);
        this._backImage.mask = this._s;
    }

    private drawSector(shape: egret.Shape, x: number, y: number, r: number, start: number = 0, angle: number = 270, color = 0xFFFFFF): void {
        shape.graphics.clear();
        shape.graphics.beginFill(color);
        shape.graphics.lineStyle(0, 0xff0000);
        shape.graphics.moveTo(x, y);
        angle = (Math.abs(angle) > 360) ? 360 : angle;
        var n: number = Math.ceil(Math.abs(angle) / 45);
        var angleA: number = angle / n;
        angleA = angleA * Math.PI / 180;
        start = start * Math.PI / 180;
        shape.graphics.lineTo(x + r * Math.cos(start), y + r * Math.sin(start));
        for (var i: number = 1; i <= n; i++) {
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
    }

    public get percent(): number {
        return this._p;
    }
}

window["UICircleLoading"] = UICircleLoading;