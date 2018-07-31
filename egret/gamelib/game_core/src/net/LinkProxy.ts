class LinkProxy extends egret.EventDispatcher {

	public static Link_Success: string = "LinkProxy_Link_Success";
	public static Link_Error: string = "LinkProxy_Link_Error";
	public static Link_Close: string = "LinkProxy_Link_Close";

	private _socket: egret.WebSocket;
	private _heartClock: number;
	private _opened: boolean = false;

	public constructor() {
		super();
	}

	protected get socket(): egret.WebSocket {
		return this._socket;
	}

	public get linked(): boolean {
		if (this._socket != null)
			return this._socket.connected;
		return false;
	}

	public linkTo(url: string): void {
		var ws: string = "ws://";
		if (location.protocol == "http:") {
			ws = "ws://"
		}
		else if (location.protocol == "https:") {
			ws = "wss://"
		}
		this._opened = false;
		this._socket = new egret.WebSocket();
		this._socket.type = egret.WebSocket.TYPE_BINARY;
		this._socket.type = egret.WebSocket.TYPE_STRING;
		this._socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
		this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
		this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
		this._socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
		this._socket.connectByUrl(ws + url);
	}

	protected onError(event: egret.IOErrorEvent): void {
		this.dispatchEventWith(LinkProxy.Link_Error);
	}

	protected onClose(event: egret.Event): void {
		this._opened = false;
		this.dispatchEventWith(LinkProxy.Link_Close);
		window.clearTimeout(this._heartClock);
	}

	protected onConnect(event: egret.Event): void {
		this._opened = true;
		this.dispatchEventWith(LinkProxy.Link_Success);
		window.setTimeout(this.heartFunc, 10000);
	}

	protected heartFunc(): void {

	}

	protected onData(event: egret.ProgressEvent): void {

	}

	public sendOrder(ba: egret.ByteArray): void {

	}

}

window["LinkProxy"] = LinkProxy;