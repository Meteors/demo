class DragonBonesAnimation extends egret.DisplayObjectContainer {

	public static DragonBonesAnimation_LoadComplete: string = "DragonBonesAnimation_LoadComplete";
	public static DragonBonesAnimation_Complete: string = "DragonBonesAnimation_Complete";

	private _loaded: boolean;
	private _display: dragonBones.EgretArmatureDisplay;

	public constructor() {
		super();
		this._loaded = false;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
	}

	private onRemoved(event: egret.Event): void {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);

		if (this._display) {
			this._display.removeEvent(dragonBones.EventObject.COMPLETE, this.onComplete, this);
			this._display.dispose();
		}
	}

	public async buildArmature(resName: string) {
		this._loaded = false;

		await RES.getResAsync(resName + "_tex_json");
		await RES.getResAsync(resName + "_tex_png");
		await RES.getResAsync(resName + "_ske_dbbin");
		dragonBones.EgretFactory.factory.parseDragonBonesData(RES.getRes(resName + "_ske_dbbin"));
		dragonBones.EgretFactory.factory.parseTextureAtlasData(RES.getRes(resName + "_tex_json"), RES.getRes(resName + "_tex_png"));
		this._loaded = true;
		this.dispatchEventWith(DragonBonesAnimation.DragonBonesAnimation_LoadComplete);
	}

	public buildArmatureDisplay(armature: string): void {
		if (this._display != null) {
			this._display.removeEvent(dragonBones.EventObject.COMPLETE, this.onComplete, this);
			this.removeChildren();
			this._display = null;
		}
		this._display = dragonBones.EgretFactory.factory.buildArmatureDisplay(armature);
		this._display.addEvent(dragonBones.EventObject.COMPLETE, this.onComplete, this);
		this.addChild(this._display);


	}

	private onComplete(event: dragonBones.AnimationEvent): void {
		this.dispatchEventWith(DragonBonesAnimation.DragonBonesAnimation_Complete);
	}

	public play(animation: string): void {
		if (this._loaded) {
			this._display.animation.gotoAndPlayByTime(animation);
		}
	}
}

window["DragonBonesAnimation"] = DragonBonesAnimation;