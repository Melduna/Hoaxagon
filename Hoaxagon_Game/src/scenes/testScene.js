import { WordBlock } from '../post_system/wordBlock.js'

export default class TestScene extends Phaser.Scene {
	/**
	 * Escena de Título.
	 * @extends Phaser.Scene
	 */
	constructor() {
		//super(SceneKeys.TestScene);
        super("dfg");
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		let wordBlock = new WordBlock(this, 200, 200, "palabra", 0, 'Arial', 40);
		
	}

	update(time, dt) {
        
    }

}