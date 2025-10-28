import { WordBlock } from '../post_system/wordBlock.js'
import { WordBlockContainer } from '../post_system/wordBlockContainer.js'

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

		//let wordBlock = new WordBlock(this, 200, 200, "palabra", 0, 'Arial', 40);
		let wordContainer = new WordBlockContainer(this, 200, 200, 'Arial', 20, 200);
		for(let i = 0; i < 20; i++){
			wordContainer.buildAndAddWord("word", 0);
		}
	}

	update(time, dt) {
        
    }

}