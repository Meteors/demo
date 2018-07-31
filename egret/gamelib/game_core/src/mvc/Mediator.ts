/**
 *
 * @author 
 *
 */
class Mediator implements IMediator {
    public constructor() {
    }

    public notificationListeners(): Array<string> {
        return [];
    }

    public executeNotification(notificationName: string, obj: any) {
    }
}

window["Mediator"] = Mediator;
