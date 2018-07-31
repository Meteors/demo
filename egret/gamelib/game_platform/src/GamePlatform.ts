class GamePlatform implements IGamePlatform {

	public appId: string;

	public appKey: string;

	public username: string;

	public params: any;

	public inited: boolean;

	private _loginFunc: Function;

	private _loginHandler: any;

	private _payFunc: Function;

	private _payHandler: any;

	public realNameCertification: number = -1;

	public constructor() {
		this.params = {};
		this.inited = false;
	}

	public init(): void {
		this.inited = true;
	}

	public login(completeFunc: Function, completeHandler: any): void {
		this._loginHandler = completeHandler;
		this._loginFunc = completeFunc;
	}

	public pay(args: any, completeFunc: Function, completeHandler: any): void {
		this._payHandler = completeHandler;
		this._payFunc = completeFunc;
	}

	public loginComplete(): void {
		if (this._loginHandler != null && this._loginFunc != null) {
			this._loginFunc.call(this._loginHandler);
		}
	}

	public payComplete(): void {
		if (this._payHandler != null && this._payFunc != null) {
			this._payFunc.call(this._payHandler);
		}
	}

	public getSid(): string {
		return "";
	}

	public onShare(data: any): void {

	}


}

window["GamePlatform"] = GamePlatform;