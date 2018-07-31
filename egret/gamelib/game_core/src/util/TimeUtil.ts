/**
 *
 * @author 
 *
 */
class TimeUtil {
    /**
     * 1小时内显示“刚刚”
     * 24小时以内显示“1—23小时”
     * 超过24小时，每满24小时加1天.
     */
    public static getTimeStr(second: number): string {
        if (second < 3600) {
            return "刚刚";
        }
        else if (second >= 3600 && second < 86400) {
            return Math.floor(second / 3600) + "小时前";
        }
        else {
            return Math.floor(second / 86400) + "天" + Math.floor(second % 86400 / 3600) + "小时前";
        }
    }

    public static getTimeString(second: number): string {
        var t: number = second;
        var s: number = second % 60;
        t = (t - s) / 60;
        var m: number = t % 60;
        t = (t - m) / 60;
        var h: number = t;
        //10000060:小时
        //10000061:分钟
        //10000062:秒
        return "" + h + "小时" + m + "分钟" + s + "秒";
    }

    public static getTimeString2(second: number): string {
        var t: number = second;
        var s: number = second % 60;
        t = (t - s) / 60;
        var m: number = t % 60;
        t = (t - m) / 60;
        var h: number = t;
        //10000060:小时
        //10000061:分钟
        //10000062:秒
        var hh: string = "00" + h;
        var mm: string = "00" + m;
        var ss: string = "00" + s;
        hh = hh.substr(hh.length - 2, 2);
        mm = mm.substr(mm.length - 2, 2);
        ss = ss.substr(ss.length - 2, 2);

        return "" + hh + ":" + mm + ":" + ss + "";
    }

    public static getTimeStringSimple(second: number, type: string = "hh:mm:ss"): string {
        var t: number = second;
        var s: number = t % 60;
        var sStr: string = "00" + s;

        t = (t - s) / 60;
        var m: number = t % 60;
        var mStr: string = "00" + m;

        t = (t - m) / 60;
        var h: number = t;
        var hStr: string = "00" + h;

        if (type == "mm:ss") {
            m = m + h * 60
            return m > 99 ? m + "" : mStr.substring(mStr.length - 2) + ":" + sStr.substring(sStr.length - 2);
        }
        else
            return hStr.substring(hStr.length - 2) + ":" + mStr.substring(mStr.length - 2) + ":" + sStr.substring(sStr.length - 2);
    }

    private static format(d: Date, fs: string): string {
        var o = {
            "M+": d.getMonth() + 1, //月份 
            "d+": d.getDate(), //日 
            "h+": d.getHours(), //小时 
            "m+": d.getMinutes(), //分 
            "s+": d.getSeconds(), //秒 
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
            "S": d.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fs)) fs = fs.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fs)) fs = fs.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fs;
    }

    public static getDateTimeString(second: number, type: string = "yyyy-MM-dd hh:mm"): string {
        //yyyy-MM-dd hh:mm
        //MM-dd hh:mm
        var d: Date = new Date(second * 1000);
        return this.format(d, type);
    }

    //天 00:00:00
    public static getTimeStringType1(second: number): string {
        var day: number = 0;
        var t: number;
        if (second > 86400) {
            day = Math.floor(second / 86400);
            t = second % 86400;
        } else {
            t = second;
        }
        if (day != 0) {
            //10000063:天
            return day + "天" + this.getTimeStringSimple(t);
        } else {
            return this.getTimeStringSimple(t);
        }
    }
    //天 00:00:00
    public static getTimeShortStringType(second: number): string {
        var str: string = "";
        if (second <= 0) {
            //10000064:1秒
            str = "1秒";
        } else if (second < 60) {
            //10000065:秒
            str = Math.floor(second) + "秒";
        } else if (second / 60 < 60) {
            //10000066:分钟
            str = Math.floor(second / 60) + "分钟";
        } else if (second / 60 / 60 < 24) {
            //10000067:小时
            str = Math.floor(second / 60 / 60) + "小时";
        } else {
            //10000068:天
            str = Math.floor(second / 60 / 60 / 24) + "天";
        }
        return str;
    }

    public static getTimeStamp(): number {
        return (new Date()).getTime();
    }

    public static getServerNowTime(timeStamp: number): string {
        var d: Date = new Date(timeStamp * 1000);
        var h: string = "00" + d.getHours();
        var m: string = "00" + d.getMinutes();
        var s: string = "00" + d.getSeconds();
        return h.substr(h.length - 2, 2) + ":" + m.substr(m.length - 2, 2) + ":" + s.substr(s.length - 2, 2);
    }
}

window["TimeUtil"] = TimeUtil;