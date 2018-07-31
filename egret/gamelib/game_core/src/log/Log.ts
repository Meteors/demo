/**
 *
 * @author 
 *
 */
class Log {
    
    private static _id: number = 1;

    public constructor() {

    }

    public static out(object: any, message: string): void {
        console.log("[" + egret.getQualifiedClassName(object) + "]\t" + message);
    }

}

window["Log"] = Log;