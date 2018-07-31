/**
 *
 * @author 
 *
 */
class XMLManager {
    private static _instance: XMLManager;

    private _dicData: Array<Array<any>> = new Array<Array<any>>();

    public static getInstance(): XMLManager {
        if (XMLManager._instance == null)
            XMLManager._instance = new XMLManager();
        return XMLManager._instance;
    }

    public getListByName(name: string): Array<any> {
        return this._dicData[name];
    }

    public parseAll(data: any): void {
        for (var s in data) {
            this.parse(s, <Array<any>>data[s]);
        }
    }

    public parse(resName: string, res: Array<any>): void {
        var cls: any = egret.getDefinitionByName(resName + "Vo");

        if (res != null && cls != null) {
            var list: Array<any> = new Array<any>();
            for (var i: number = 0; i < res.length; i++) {
                var vo: any = new cls(res[i]);
                list.push(vo);
            }
            this._dicData[resName] = list;
        }
        else {
            Log.out(this, "parse error " + res);
        }
    }
}

window["XMLManager"] = XMLManager;