import { IMAGE_KEYS, SCENE_KEYS,ANIM_KEYS,JSON_KEYS } from '../utils/CommonKeys.js'
import Button from "../utils/button.js";
import ImageButton from '../utils/imageButton.js';
import { TEXT_CONFIG } from "../utils/textConfigs.js";
import { PALETTE_HEX } from "../utils/Palette.js";
import { PALETTE_RGBA } from "../utils/Palette.js";
import { KEYBINDS } from '../utils/Keybinds.js';
import { ScrollAreaContainer } from '../systems/scroll_system/scrollAreaContainer.js';

export default class TrainingMenu extends Phaser.Scene{
    scrollArea;
    buttons;
    constructor(){
        super(SCENE_KEYS.TRAINING_MENU_SCENE);
    }
    create(){
        this.infoDatabase = this.cache.json.get(JSON_KEYS.INFO_DB);

        let { width, height } = this.sys.game.canvas;

        this.add.text(width/2,100,"TRAINING",TEXT_CONFIG.Heading2).setColor(PALETTE_RGBA.White).setOrigin(0.5,0.5)
        this.KEYS = this.input.keyboard.addKeys(KEYBINDS);

        this.infoDatabase = this.cache.json.get(JSON_KEYS.INFO_DB);

        this.cameras.main.setBackgroundColor(PALETTE_RGBA.MiddleGrey);
        this.scrollArea = new ScrollAreaContainer(this,width/2-300,200,600,800);
        console.log(this.scrollArea);
        this.createNewButton(this.infoDatabase.FALLACIES.POST_HOC)
        //this.scrollArea.addGameObject(this.createNewButton(this.infoDatabase.FALLACIES.POST_HOC));
        //this.scrollArea.addGameObject(this.createNewButton(this.infoDatabase.FALLACIES.AD_IGNORANTIAM));
        //this.scrollArea.addGameObject(this.createNewButton(this.infoDatabase.FALLACIES.AD_VERECUNDIAM));
        //this.scrollArea.addGameObject(this.createNewButton(this.infoDatabase.FALLACIES.AD_CONSEQUENTIAM));
    }
    update(time,dt){
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.PAUSE)){
            this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
        }
    }
    createNewButton(fallacy){
        let { width, height } = this.sys.game.canvas;
        return new Button({scene:this, x:width/2,y:250,width:500,height:200,color:PALETTE_HEX.White,
            text:fallacy.name,textConfig:TEXT_CONFIG.Heading2,textColor:PALETTE_RGBA.DarkerGrey,
            clickCallback:()=>{this.scene.start(SCENE_KEYS.GAME_SCENE,{fallacies:[fallacy]})}});
    }
}