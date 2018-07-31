class PlatformFanPianWan extends GamePlatform {

	public realNameCertification: number = -1;

	public constructor() {
		super();
		this.appId = "600008";
		this.appKey = "zAQeydRfyX9P8wPq4JGbfjjyYa181Qdd";
	}

	public init(): void {
		super.init();
		this.params.token = PlatformProxy.getInstance().getQueryString("token");
		this.params.appId = this.appId;
		this.params.channelId = PlatformProxy.getInstance().getQueryString("channelId");
		this.params.state = PlatformProxy.getInstance().getQueryString("state");
		this.params.time = PlatformProxy.getInstance().getQueryString("time");
		this.params.sign = PlatformProxy.getInstance().getQueryString("sign");
		this.params.roomid = PlatformProxy.getInstance().getQueryString("roomid");
		this.params.codeid = PlatformProxy.getInstance().getQueryString("codeid");
		this.params.appState = PlatformProxy.getInstance().getQueryString("appState");
	}

	public getSid(): string {
		var s: string = "";
		return encodeURIComponent(s);
	}

	public login(completeFunc: Function, completeHandler: any): void {
		super.login(completeFunc, completeHandler);
		this.loginComplete();
	}

	public pay(args: any, completeFunc: Function, completeHandler: any): void {

	}

	public onShare(data: any): void {
		var para: any = {};
		if (data.ptmatchid != null) {
			para.ptmatchid = data.ptmatchid
		}
		fpclient.share({
			title: data.title,
			desc: data.desc,
			imgUrl: "",
			para: para
		}, data.shareFunc, data.shareObj);
	}
}

window["PlatformFanPianWan"] = PlatformFanPianWan;