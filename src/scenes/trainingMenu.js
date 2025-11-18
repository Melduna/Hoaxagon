import { IMAGE_KEYS, SCENE_KEYS,ANIM_KEYS,JSON_KEYS } from '../utils/CommonKeys.js'
import Button from "../utils/button.js";
import ImageButton from '../utils/imageButton.js';
import { TEXT_CONFIG } from "../utils/textConfigs.js";
import { PALETTE_HEX } from "../utils/Palette.js";
import { PALETTE_RGBA } from "../utils/Palette.js";
import { KEYBINDS } from '../utils/Keybinds.js';

export default class TrainingMenu extends Phaser.Scene{
    scrollArea;
    buttons;
    constructor(){
        super(SCENE_KEYS.TRAINING_MENU_SCENE);
    }
    create(){
        this.KEYS = this.input.keyboard.addKeys(KEYBINDS);

        this.infoDatabase = this.cache.json.get(JSON_KEYS.INFO_DB);

        this.cameras.main.setBackgroundColor(PALETTE_RGBA.MiddleGrey);

        let { width, height } = this.sys.game.canvas;

    }
    update(time,dt){
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.PAUSE)){
            this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
        }
    }
}