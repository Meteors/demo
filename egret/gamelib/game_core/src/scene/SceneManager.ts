/**
 *
 * @author 
 *
 */
class SceneManager {

    private _dicscene: Array<IScene> = new Array<IScene>();

    private _currentscene: IScene = null;

    private _lastscene: string = "";

    private static _instance: SceneManager;

    public constructor() {
    }

    public static getInstance(): SceneManager {
        if (SceneManager._instance == null)
            SceneManager._instance = new SceneManager();
        return SceneManager._instance;
    }

    public get lastSceneName(): string {
        return this._lastscene;
    }

    public set lastSceneName(value: string) {
        this._lastscene = value;
    }

    public get currentScene(): IScene {
        return this._currentscene;
    }

    public registerScene(scene: IScene): void {
        if (this._dicscene[scene.scenename] == null) {
            this._dicscene[scene.scenename] = scene;
        }
        else {
            Log.out(this, scene.scenename + " is exists");
        }
    }

    public removeScene(scene: IScene): void {
        if (this._dicscene[scene.scenename] != null) {
            this._dicscene[scene.scenename] = null;
        }
    }

    public enterScene(sceneName: string): void {
        var scene: IScene = this._dicscene[sceneName];
        if (scene != null && scene != this._currentscene) {
            if (this._currentscene != null) {
                this._lastscene = this.currentScene.scenename;
                this._currentscene.exit();
            }
            this._currentscene = scene;
            this._currentscene.enter();
        }
        else {
            Log.out(this, sceneName + " is null");
        }
    }
}

window["SceneManager"] = SceneManager;