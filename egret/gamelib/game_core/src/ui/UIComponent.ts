/**
 *
 * @author 
 *
 */
class UIComponent extends egret.DisplayObjectContainer
{
	public constructor() 
	{
        super();

        this.addEventListener( egret.Event.ADDED_TO_STAGE, this.onAdded, this );
        this.addEventListener( egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this );
	}
	
    protected onAdded( event: egret.Event ): void
    {
        this.removeEventListener( egret.Event.ADDED_TO_STAGE, this.onAdded, this );
    }

    protected onRemoved( event: egret.Event ): void
    {
        this.removeEventListener( egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this );
    }
}

window["UIComponent"] = UIComponent;