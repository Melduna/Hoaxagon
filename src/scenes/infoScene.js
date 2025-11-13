import { KEYBINDS } from "../utils/Keybinds.js";
import { IMAGE_KEYS, SCENE_KEYS } from '../utils/CommonKeys.js'
import { PALETTE_HEX,PALETTE_RGBA } from "../utils/Palette.js";
import { TEXT_CONFIG } from "../utils/textConfigs.js";
import { InfoBox } from "../utils/infoBox.js";
//import SIZES from "../utils/Sizes.js";

export const INFO_TYPE = {
    FLASH_CARD: "FLASH_CARD",
    NEW_TYPE_INFO: "NEW_TYPE_INFO"
};

export default class InfoScene extends Phaser.Scene {

    constructor(){
        super(SCENE_KEYS.INFO_SCENE);
    }

    create(infoEntry, infoType = INFO_TYPE.FLASH_CARD) {
        console.assert(infoType in INFO_TYPE, "infoType must be a INFO_TYPE");

        this.cameras.main.setBackgroundColor(PALETTE_RGBA.TranslucentGrey);

        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;

        if(infoType === INFO_TYPE.FLASH_CARD) {
            new InfoBox({
                scene: this,
                x: width / 2, y: height / 2,
                width: 600, height: 400,
                info: infoEntry,
                expanded: true
            });
            
            this.add.text(
                width / 2 - 300, height / 2 + 210,
                "Pulsa en cualquier lugar para continuar.",
                TEXT_CONFIG.ParagraphBold
            )
            .setColor(PALETTE_RGBA.White);

            this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {this.scene.stop()});
            return;
        }

        if(infoType === INFO_TYPE.NEW_TYPE_INFO) {

            this.add.text(
                width / 2 - 300, height / 2 - 250,
                "NUEVA FALACIA",
                TEXT_CONFIG.SubHeading
            )
            .setColor(PALETTE_RGBA.White);

            new InfoBox({
                scene: this,
                x: width / 2, y: height / 2,
                width: 600, height: 400,
                info: infoEntry,
                expanded: true
            });

            const confirmButton = this.add.text(
                width / 2 - 20, height / 2 + 240,
                "VALE",
                TEXT_CONFIG.SubHeading2
            )
            .setColor(PALETTE_RGBA.White);

            confirmButton.setInteractive();

            confirmButton.on(Phaser.Input.Events.POINTER_DOWN, () => {this.scene.stop()});
        }
    }
}