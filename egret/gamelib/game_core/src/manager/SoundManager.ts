class SoundManager {

	private static _inst: SoundManager;

	public static getInstance(): SoundManager {
		if (SoundManager._inst == null)
			SoundManager._inst = new SoundManager();
		return SoundManager._inst;
	}

	private _active: boolean;
	private _clicked: boolean;
	private _stage: egret.Stage;
	private _bgc: egret.SoundChannel;
	private _bgs: string;
	private _lastbgs: string;

	public constructor() {
		this._active = true;
		this._clicked = false;
		this._bgs = "";
		this._bgc = null;
		this._lastbgs = "";
	}

	public init(s: egret.Stage): void {
		this._stage = s;
		this._stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this._stage.addEventListener(egret.Event.ACTIVATE, this.onActive, this);
		this._stage.addEventListener(egret.Event.DEACTIVATE, this.onDeActive, this);
	}

	private onActive(event: egret.Event): void {
		this._active = true;
		this.playMusic(this._lastbgs);
	}

	private onDeActive(event: egret.Event): void {
		this._active = false;
		this._lastbgs = this._bgs;
		this.stopMusic();
	}

	private onTouch(event: egret.TouchEvent): void {
		this._stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this._active = false;
		this._clicked = true;
	}

	public async playMusic(sound: string): Promise<void> {
		if (sound == "")
			return;
		console.log("prepare play sound " + sound);
		if (this._clicked) {
			console.log("prepare load sound " + sound);
			await RES.getResAsync(sound);
			console.log(" load sound " + sound + "complete");
			this._bgs = sound;
			if (this._bgc != null) {
				this._bgc.stop();
				this._bgc = null;
			}
			if (this._bgs != "") {
				var res: egret.Sound = RES.getRes(this._bgs);
				if (res != null) {
					this._bgc = res.play();
					console.log("play sound " + sound);
				}
			}
		}
		else {
			console.log("not prepare");
			if (this._clicked == false)
				console.log("not click");
			if (this._bgs == sound)
				console.log("same name");
		}
	}

	public stopMusic(): void {
		if (this._bgc != null) {
			this._bgc.stop();
			this._bgc = null;
		}
		this._bgs = "";
	}

	public async playSound(sound: string): Promise<void> {
		if (this._clicked) {
			await RES.getResAsync(sound);
			var res: egret.Sound = RES.getRes(sound);
			if (res != null) {
				res.play(0, 1);
			}
			else {
			}
		}
	}

}

window["SoundManager"] = SoundManager;