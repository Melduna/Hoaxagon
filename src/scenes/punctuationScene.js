import { ScoreManager } from "../systems/score_system/scoreManager.js";
import { IMAGE_KEYS, SCENE_KEYS } from "../utils/CommonKeys.js";
import { PALETTE_HEX, PALETTE_RGBA } from "../utils/Palette.js";
import { CorrectionFeedbackBox } from "../systems/ui_system/correctionFeedbackBox.js";
import { PostManager } from "../systems/post_system/postManager.js";

export default class PunctuationScene extends Phaser.Scene {

    /**
     * @type {number}
     */
    punctuation;

    /**
     * @type {ScoreManager}
     */
    scoreManager;

    /**
     * @type {PostManager}
     */
    postManager;

    /**
     * Whether the score has been fully displayed or not.
     * @type {bool}
     */
    fullScoreShown = false;

    /**
     * @type {number}
     */
    timeBetweenScoreUpdates = 10;

    /**
     * @type {number}
     */
    countDown;

    /**
     * @type {Phaser.GameObjects.Sprite}
     */
    icosamuelSprite;

    /**
     * @type {number}
     */
    icosamuelFrame = 0;

    /**
     * @type {number}
     */
    icosamuelFrameDuration = 50;

    /**
     * @type {number}
     */
    icosamuelFrameTimer = 0;

    /**
     * 
     */

    constructor() {
        super(SCENE_KEYS.PUNCTUATION_SCENE);
    }

    /**
     * 
     * @param {
     *     {
     *         punctuation: number
     *         postManager: PostManager
     *     }
     * } data 
     */
    create(data) {
        const SCREEN_HEIGHT = this.sys.game.canvas.height;
        const SCREEN_WIDTH = this.sys.game.canvas.width;

        this.cameras.main.setBackgroundColor(PALETTE_HEX.LightGrey);

        this.icosamuelSprite = this.add.sprite(SCREEN_WIDTH * 0.75, SCREEN_HEIGHT / 2, IMAGE_KEYS.ICOSAMUEL, 0);
        this.icosamuelSprite.setScale(1.2, 1.2);

        this.punctuation = data.punctuation;

        this.scoreManager = new ScoreManager(this);

        this.scoreManager.uiElementsConatiner.setPosition(100, SCREEN_HEIGHT / 2);

        this.timeBetweenScoreUpdates = 1000 / data.punctuation;

        this.countDown = this.timeBetweenScoreUpdates;

        this.fullScoreShown = false;

        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if(this.fullScoreShown)
                this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
        });

        this.postManager = data.postManager;

        let lastElementHeigjht = 0;
        this.postManager.evaluatedPostsInfo.forEach((evaluatedPostInfo, index) => {
            const feedbackBox = new CorrectionFeedbackBox(
                this,
                SCREEN_WIDTH * 0.1,
                lastElementHeigjht,
                SCREEN_WIDTH * 0.4,
                140,
                evaluatedPostInfo
            );
            this.add.existing(feedbackBox);

            lastElementHeigjht += feedbackBox.getBounds().height + 10;
        });
    }

    update(time, dt) {
        this.icosamuelFrameTimer += dt;

        if (this.icosamuelFrameTimer >= this.icosamuelFrameDuration) {
            this.icosamuelSprite.setFrame((this.icosamuelFrame + 1) % 24);
            this.icosamuelFrame++;

            this.icosamuelFrameTimer = 0;
        }

        this.countDown -= dt;

        if(this.countDown <= 0 && !this.fullScoreShown) {
            this.countDown = this.timeBetweenScoreUpdates;
            this.scoreManager.addPoints(1);
        }

        if(this.scoreManager.points === this.punctuation)
            this.fullScoreShown = true;
    }
}