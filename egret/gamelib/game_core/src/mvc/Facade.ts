/**
 *
 * @author 
 *
 */
class Facade {
    private static _dicmediator: Array<Array<IMediator>> = new Array<Array<IMediator>>();

    public constructor() {
    }

    public static sendNotification(notificationName: string, obj: any = null, obj2: any = null): void {
        var arr: Array<IMediator> = Facade._dicmediator[notificationName];
        if (arr != null) {
            for (var i: any = 0; i < arr.length; i++) {
                arr[i].executeNotification(notificationName, obj, obj2);
            }
        }
    }

    public static registerNotifListeners(mediator: IMediator): void {
        var notifications: Array<string> = mediator.notificationListeners();
        var length: any = notifications.length;

        for (var i: any = 0; i < length; i++) {
            var arr: Array<IMediator> = Facade._dicmediator[notifications[i]];
            if (arr != null) {
                arr.push(mediator);
            }
            else {
                arr = new Array<IMediator>();
                arr.push(mediator);
                Facade._dicmediator[notifications[i]] = arr;
            }
        }
    }

    public static removeNotifListeners(mediator: IMediator): void {
        var notifications: Array<string> = mediator.notificationListeners();
        var length: any = notifications.length;
        for (var i: any = 0; i < length; i++) {
            var all: Array<Array<IMediator>> = Facade._dicmediator;
            var arr: Array<IMediator> = Facade._dicmediator[notifications[i]];
            if (arr != null) {
                for (var j: any = arr.length - 1; j >= 0; j--) {
                    if (arr[j] == mediator) {
                        arr.splice(j, 1);
                    }
                }
            }
        }
    }
}

window["Facade"] = Facade;