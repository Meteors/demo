class JsonpMap {

}

class NetUtil {

	private static _jsonp: number = 1;

	public static postSubmit(url: string, params: any): any {
		var temp = document.createElement("form");
		temp.action = url;
		temp.method = "post";
		temp.style.display = "none";
		for (var x in params) {
			var opt = document.createElement("textarea");
			opt.name = x;
			opt.value = params[x];
			temp.appendChild(opt);
			//console.log(x + "&" + params[x]);
		}
		document.body.appendChild(temp);
		temp.submit();
		return temp;
	}

	public static getNetResult(url: string, successFunc: Function, failFunc: Function, thisObject: any): void {
		var loader: egret.URLLoader = new egret.URLLoader();
		loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
		loader.once(egret.Event.COMPLETE, () => {
			successFunc.call(thisObject, loader.data);
		}, this);
		loader.once(egret.IOErrorEvent.IO_ERROR, () => {
			if (failFunc != null)
				failFunc.apply(thisObject);
		}, this);
		loader.load(new egret.URLRequest(url));
	}

	public static getNetResultByJsonP(url: string, successFunc: Function, thisObject: any): void {
		var c: number = NetUtil._jsonp++;

		JsonpMap["call_" + c] = (data) => {
			successFunc.call(this, data)
			delete JsonpMap["call_" + c];
			JsonpMap["call_" + c] = null;
			var d = document.getElementById("jsonp" + c);
			document.body.removeChild(d);
		}
		var script = document.createElement('script');
		script.id = "jsonp" + c;
		script.src = url + "&callback=JsonpMap.call_" + c;
		document.body.appendChild(script);
	}

}

window["NetUtil"] = NetUtil;