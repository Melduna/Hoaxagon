import { PostBoxObject } from "../post_system/postBoxObject.js";
import { PALETTE_HEX, PALETTE_RGBA } from "../../utils/Palette.js";
import { EvaluatedPostInfo } from "../post_system/evaluatedPostInfo.js";
import { TEXT_CONFIG } from "../../utils/textConfigs.js";

/**
 * Box that shows correction feedback to the player.
 */
export class CorrectionFeedbackBox extends Phaser.GameObjects.Container {

    /**
     * @type {Phaser.GameObjects.Rectangle}
     */
    backgroundBox;

    /**
     * @type {EvaluatedPostInfo}
     */
    evaluatedPostInfo;

    /**
     * @type {PostBoxObject}
     */
    postBoxObject;

    /**
     * @type {Phaser.GameObjects.Rectangle}
     */
    _mainRectangle;

    /**
     * @type {Phaser.GameObjects.Rectangle}
     */
    _shadowRectangle;

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {EvaluatedPostInfo} evaluatedPostInfo 
     */
    constructor(scene, x, y, width, height, evaluatedPostInfo) {
        console.assert(evaluatedPostInfo instanceof EvaluatedPostInfo, "CorrectionFeedbackBox: evaluatedPostInfo must ba a EvaluatedPostInfo object");
        
        super(scene, x, y);
        this.scene.add.existing(this);
        
        this.evaluatedPostInfo = evaluatedPostInfo;

        // Shadow rectangle
        this._shadowRectangle = this.scene.add.rectangle(10, 10, width, height, PALETTE_HEX.DarkerGrey, 0.5)
            .setOrigin(0, 0);
            
        this.add(this._shadowRectangle);

        // Main rectangle
        const boxColor = this.evaluatedPostInfo.playerSuccessed ? PALETTE_HEX.LightGreen : PALETTE_HEX.LightRed;

        this._mainRectangle = this.scene.add.rectangle(0, 0, width, height, boxColor, 1);
        this._mainRectangle.setOrigin(0, 0);
        this.add(this._mainRectangle);

        let contentHeight = 10;

        // PostBoxObject
        this.postBoxObject = new PostBoxObject(
            scene,
            10, 10,
            this.evaluatedPostInfo.postObjectDef.text,
            width - 20
        );
        this.add(this.postBoxObject);

        if(this.evaluatedPostInfo.playerSuccessed) {
            this.postBoxObject.wordBlockContainer.selectSentence(this.evaluatedPostInfo.sentenceSelectedID);
        }
        else {
            this.postBoxObject.wordBlockContainer.selectSentence(this.evaluatedPostInfo.sentenceSelectedID, PALETTE_RGBA.RedAlert);
            this.postBoxObject.wordBlockContainer.selectSentence(this.evaluatedPostInfo.postObjectDef.fallaciousSentenceID, PALETTE_RGBA.Teal);
        }

        contentHeight += this.postBoxObject.getBounds().height + 10;

        // Aclaration text

        if(this.evaluatedPostInfo.selectedFallacyObj) {
            const aclarationText = this.scene.add.text(
                10, 
                contentHeight,
                `Has seleccionado la falacia: ${this.evaluatedPostInfo.selectedFallacyObj.name}`,
                TEXT_CONFIG.Paragraph
            )
            .setTint(PALETTE_RGBA.DarkerGrey)
            .setOrigin(0, 0)
            .setWordWrapWidth(width - 20);
            
            this.add(aclarationText);

            contentHeight += aclarationText.getBounds().height + 10;
        }

        this._mainRectangle.setSize(this._mainRectangle.width, contentHeight);
        this._shadowRectangle.setSize(this._mainRectangle.width, contentHeight);
    }

}