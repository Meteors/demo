/**
 *
 * @author 
 *
 */
interface IMediator 
{
    notificationListeners():Array<string>;
    executeNotification(notificationName: string,obj: any,obj2:any);
}
