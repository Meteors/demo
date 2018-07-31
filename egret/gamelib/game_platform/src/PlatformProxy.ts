enum PlatformType {
	None = 0,
	FanPianWan = 3
}

class PlatformProxy {

	public static Login: string = "Platform_Login";

	private static _inst: PlatformProxy;

	//通行证id
	public ppId: string;
	//通行证会话
	public ppSid: string;
	//登录帐号
	public ppUid: string;
	//服务器id
	public srvId: number;
	//时间戳
	public Ts: number;
	//key
	public Key: number;

	private _currentPlatform: IGamePlatform;

	/**
	 * 平台类型
	 */
	public platform: PlatformType;
	/**
	 * 游戏Api
	 */
	public gameApi: string;
	/**
	 * 测试游戏Api
	 */
	public gameApiDev: string;
	/**
	 * 游戏版本
	 */
	public gameVersion: string;

	public constructor() {
	}

	public static getInstance(): PlatformProxy {
		if (PlatformProxy._inst == null)
			PlatformProxy._inst = new PlatformProxy();
		return PlatformProxy._inst;
	}

	public get currentPlatform(): IGamePlatform {
		return this._currentPlatform;
	}

	public getQueryString(value: string): string {
		if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
			var reg = new RegExp("(^|&)" + value + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			var context = "";
			if (r != null)
				context = r[2];
			reg = null;
			r = null;
			return context == null || context == "" || context == "undefined" ? "" : context;
		}
		return "";
	}

	/**
	 * 初始化平台
	 */
	public init(data: any): void {
		if (data != null) {
			var gameJson: any = data;
			this.gameApi = gameJson.gameApi;
			this.gameApiDev = gameJson.gameApiDev;
			this.gameVersion = gameJson.gameVersion;
			this.platform = gameJson.platform;
			if (this.getQueryString("p") != "") {
				this.platform = +this.getQueryString("p");
			}
			if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
				this.platform = PlatformType.None;
			}
			this.platformStartInit();
		}
		else {
			console.log(this, "没有找到游戏配置文件");
		}
	}

	/**
	 * 平台开始初始化
	 */
	private platformStartInit(): void {
		if (this.platform == PlatformType.None) {
			// 如果是无平台，则自动初始化成功
			this._currentPlatform = new GamePlatform();
			this._currentPlatform.init();
			this.platformInitSuccess();
		}
		else {
			if (this.platform == PlatformType.FanPianWan) {
				this._currentPlatform = new PlatformFanPianWan();
			}
			this._currentPlatform.init();
			this._currentPlatform.login(this.platformInitSuccess, this);
		}
	}

	/**
	 * 平台初始化成功
	 */
	public platformInitSuccess(): void {
		// this.getPassport();
	}

	/**
	 * 取得通行证
	 */
	// public getPassport(): void {
	// 	var ppSid: string = "";
	// 	// this._success.call(this._thisObj);
	// 	// this._success = null;
	// 	// this._thisObj = null;
	// 	// if (this.platform == PlatformType.None) {
	// 	// 	ppSid = "";
	// 	// 	//this.getServerList();
	// 	// }
	// }

	// private onPassportSuccess(data: any): void {
	// 	var s: any = JSON.parse(data);
	// 	if (s.Code == 0) {
	// 		Log.out(this, "获取通行证成功");
	// 		// this.getServerList();
	// 	}
	// 	else {
	// 		Log.out(this, "通行证错误" + s.Code);
	// 	}
	// }

	// private onPassportFail(data: any): void {
	// 	Log.out(this, "获取通行证失败");
	// }

	/**
	 * 获取服务器列表
	 */
	// private getServerList(): void {
	// 	var pp_uid: string = "";
	// 	var userCookie: string = egret.localStorage.getItem("lastuserSG");
	// 	if (userCookie && userCookie.length) {
	// 		pp_uid = userCookie;
	// 	}
	// 	var url: string = this.gameApi + "?m=servers&version=" + this.gameVersion +
	// 		"&pp_id=" + PlatformProxy.getInstance().platform +
	// 		"&pp_uid=" + pp_uid;
	// 	NetUtil.getNetResult(url, this.onServerListSuccess, this.onServerListFail, this);
	// }

	// private onServerListSuccess(data: any): void {
	// 	// var s: any = JSON.parse(data);
	// 	// ServerProxy.getInstance().initServerList(s);
	// 	// Log.out(this, "获取服务器列表成功，共有列表数" + s.Servers.length);
	// 	// this._success.call(this._thisObj);
	// }

	// private onServerListFail(data: any): void {
	// 	Log.out(this, "获取服务器列表失败");
	// }

}

window["PlatformType"] = PlatformType;
window["PlatformProxy"] = PlatformProxy;
