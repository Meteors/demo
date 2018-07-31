/**
 *
 * @author 
 *
 */
class SceneBase implements IScene {
    public constructor() {

    }

    public enter(): void {
    }

    public exit(): void {
    }

    public get scenename(): string {
        return "";
    }
}

window["SceneBase"] = SceneBase;
