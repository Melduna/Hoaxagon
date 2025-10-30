import { IMAGE_KEYS } from '../utils/CommonKeys.js'
import { WordBlockContainer } from './wordBlockContainer.js'

const NINE_SLICE_DIMENSIONS = {
    WIDTH: 686,
    HEIGHT: 411,
    LEFT_WIDTH: 20,
    RIGHT_WIDTH: 20,
    TOP_WIDTH: 20,
    BOTTOM_WIDTH: 48
};

const REALATIVE_POSITIONS = {
    PHOTO_X: 10,
    PHOTO_Y: 10,
    WORD_BLOCK_CONTAINER_X: 10,
    WORD_BLOCK_CONTAINER_Y: 30,
};

export class PostBoxObject extends Phaser.GameObjects.Container {

    /**
     * @type {Phaser.GameObjects.NineSlice}
     */
    boxNineSlice;

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} positionX 
     * @param {number} positionY 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(scene, positionX, positionY, width) {
        super(scene, positionX, positionY);

        scene.add.existing(this);

        this.boxNineSlice = scene.add.nineslice(
            0, 0, 
            IMAGE_KEYS.TEMP_POST_CONTAINER, null, 
            NINE_SLICE_DIMENSIONS.WIDTH, NINE_SLICE_DIMENSIONS.HEIGHT,
            NINE_SLICE_DIMENSIONS.LEFT_WIDTH, NINE_SLICE_DIMENSIONS.RIGHT_WIDTH, 
            NINE_SLICE_DIMENSIONS.TOP_WIDTH, NINE_SLICE_DIMENSIONS.BOTTOM_WIDTH
        );
        this.boxNineSlice.setOrigin(0, 0);

        let wordBlockContainer = new WordBlockContainer(
            scene, 
            REALATIVE_POSITIONS.WORD_BLOCK_CONTAINER_X,
            REALATIVE_POSITIONS.WORD_BLOCK_CONTAINER_Y,
            'Arial', 20,
            width - REALATIVE_POSITIONS.WORD_BLOCK_CONTAINER_X * 2
        );

        /*const text = "Esto es un texto de sección 0, esto de la 1. ¿Y esto de la 2?\n"
			+ "Esto de la 3, la 4 💡 ¡¡¡La 5 (incluido esto)!!!";*/
        const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

		wordBlockContainer.buidText(text);

        this.add(this.boxNineSlice)
        this.add(wordBlockContainer);

        const height = NINE_SLICE_DIMENSIONS.BOTTOM_WIDTH + NINE_SLICE_DIMENSIONS.TOP_WIDTH 
            + REALATIVE_POSITIONS.WORD_BLOCK_CONTAINER_X*2 + wordBlockContainer.getBounds().height;
        
        //this.setSize(width, height);
        this.boxNineSlice.setSize(width, height);
    }
}