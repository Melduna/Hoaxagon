import { KEYBINDS } from "../utils/Keybinds.js";
import { IMAGE_KEYS, SCENE_KEYS } from '../utils/CommonKeys.js'
//import SIZES from "../utils/Sizes.js";
export default class PauseScene extends Phaser.Scene{
    textsize = 72;
    constructor(){
        super(SCENE_KEYS.PAUSE_SCENE);
    }
    preload() {
        
    }
    init(){
    
    }
    create() {
        let { width, height } = this.sys.game.canvas;
        this.SCREENX = width;
        this.SCREENY = height;
        console.log(this.SCREENX);
        console.log(this.SCREENY);
                this.add.text(this.SCREENX/2-215,this.SCREENY/2-50,"PAUSED",
            { fontFamily: 'Horizon', 
                color: 'rgba(255, 255, 255, 1)', 
                fontSize: this.textsize+'px'});
        this.KEYS = this.input.keyboard.addKeys(KEYBINDS);
    }
        update(time, dt) {
        //#region input
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.PAUSE)){
            this.scene.resume("gameScene");
            this.scene.stop();
        }
        //#endregion
    }
}