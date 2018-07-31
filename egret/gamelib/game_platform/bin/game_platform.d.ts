declare class GamePlatform implements IGamePlatform {
    appId: string;
    appKey: string;
    username: string;
    params: any;
    inited: boolean;
    private _loginFunc;
    private _loginHandler;
    private _payFunc;
    private _payHandler;
    realNameCertification: number;
    constructor();
    init(): void;
    login(completeFunc: Function, completeHandler: any): void;
    pay(args: any, completeFunc: Function, completeHandler: any): void;
    loginComplete(): void;
    payComplete(): void;
    getSid(): string;
    onShare(data: any): void;
}
interface IGamePlatform {
    inited: boolean;
    params: any;
    username: string;
    /**
     * 0：不强制实名认证 1：强制实名认证（默认：-1：不实名认证 ）
     */
    realNameCertification: number;
    init(): void;
    login(completeFunc: Function, completeHandler: any): void;
    pay(args: any, completeFunc: Function, completeHandler: any): void;
    loginComplete(): void;
    payComplete(): void;
    getSid(): string;
    onShare(data: any): void;
}
declare class PlatformFanPianWan extends GamePlatform {
    realNameCertification: number;
    constructor();
    init(): void;
    getSid(): string;
    login(completeFunc: Function, completeHandler: any): void;
    pay(args: any, completeFunc: Function, completeHandler: any): void;
    onShare(data: any): void;
}
declare enum PlatformType {
    None = 0,
    FanPianWan = 3,
}
declare class PlatformProxy {
    static Login: string;
    private static _inst;
    ppId: string;
    ppSid: string;
    ppUid: string;
    srvId: number;
    Ts: number;
    Key: number;
    private _currentPlatform;
    /**
     * 平台类型
     */
    platform: PlatformType;
    /**
     * 游戏Api
     */
    gameApi: string;
    /**
     * 测试游戏Api
     */
    gameApiDev: string;
    /**
     * 游戏版本
     */
    gameVersion: string;
    constructor();
    static getInstance(): PlatformProxy;
    readonly currentPlatform: IGamePlatform;
    getQueryString(value: string): string;
    /**
     * 初始化平台
     */
    init(data: any): void;
    /**
     * 平台开始初始化
     */
    private platformStartInit();
    /**
     * 平台初始化成功
     */
    platformInitSuccess(): void;
}
