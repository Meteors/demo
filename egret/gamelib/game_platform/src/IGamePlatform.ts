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