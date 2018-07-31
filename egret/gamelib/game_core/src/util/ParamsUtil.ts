/**
 *
 * @author 
 *
 */
class ParamsUtil {
    public static getQueryString(value: string): string {
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

    public static getUrlQueryString(params: string, value: string): string {
        var ret: string = "";
        var sa: string[] = params.split("&");
        for (var i: number = 0; i < sa.length; i++) {
            var sa2: string[] = sa[i].split("=");
            if (sa2.length == 2) {
                if (sa2[0] == value) {
                    ret = sa2[1];
                    break;
                }
            }
        }
        return ret;
    }
    public static getPassportString(): string {
        var passport: string = "";
        passport = window.location.search;
        return passport.substring(1);
    }
}

window["ParamsUtil"] = ParamsUtil;