import { WordBlock } from './wordBlock.js'

/**
 * Container that keeps a list of `WordBlock` that form part of a sencence (the words contain
 * the same `sentenceID` value) in order to form a text box with a fixed width.
 */
export class WordBlockContainer extends Phaser.GameObjects.Container {

    /**
     * Space between text lines.
     * @type {number}
     */
    lineSpacing = 0;

    /**
     * Array of `WordBlock` objects.
     * @type {Array(WordBlock)}
     */
    wordList = new Array();

    /**
     * @type {String}
     */
    textFontFamily;

    /**
     * @type {number}
     */
    textFontSize;

    /**
     * @type {number}
     */
    lineMaxWidth;
    
    /**
     * In which line is the container currently adding `WordBlock` objects.
     * @type {number}
     */
    _currentLineIndex = 0;

    /**
     * How long the line is in width. Used to control when is it necessary to continue 
     * in the next line.
     * @type {number}
     */
    _currentLineWidth = 0;

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} positionX 
     * @param {number} positionY 
     */
    constructor(scene, positionX, positionY, textFontFamily, textFontSize, lineMaxWidth) {
        super(scene, positionX, positionY);
        
        this.lineMaxWidth = lineMaxWidth;
        this.textFontSize = textFontSize;
        this.textFontFamily = textFontFamily;

        scene.add.existing(this);
    }

    /**
     * Returns the size that a `WordBlock` would have.
     * @param {String} str
     * @returns {Phaser.Types.GameObjects.Text.TextMetrics}
     */
    getSizeOfText(str) {
        if (!this.textFontFamily || !this.textFontSize) {
            console.error("Font not defined correctly.");
            return { width: 0, height: 0 };
        }

        // Define the style of the text that we are considering 
        const styleConfig = {
            fontFamily: this.textFontFamily,
            fontSize: this.textFontSize
        };

        const tempText = new Phaser.GameObjects.Text(this.scene, 0, 0, str, styleConfig);

        const metrics = {
            width: tempText.width,
            height: tempText.height
        };

        tempText.destroy(); 

        return metrics;
    }

    /**
     * 
     * @param {String} wordString 
     * @param {number} sentenceID 
     * @returns 
     */
    buildAndAddWord(wordString, sentenceID) {     
        const WORD_SIZE = this.getSizeOfText(wordString);

        const LINE_HEIGHT = this.getSizeOfText('A').height;

        let leftoverWordPart = "";

        if(WORD_SIZE.width <= this.lineMaxWidth) {
            // The word only fits entirely in the next line
            if(this._currentLineWidth + WORD_SIZE.width > this.lineMaxWidth) {
                this._currentLineIndex++;
                this._currentLineWidth = 0;
            }
        }
        else { // The word needs to ocupy more than one single line
            this._currentLineIndex++;
            this._currentLineWidth = 0;

            let i = 0;
            let w = this.getSizeOfText(wordString[0]).width; 

            while(i < wordString.length && w <= this.lineMaxWidth) {
                w += this.getSizeOfText(wordString[i]).width;
                i++;
            }

            if(i < wordString.length) { // The whole word didn't fit -> word divission
                leftoverWordPart = wordString.slice(i);
                wordString = wordString.slice(0, i);
            }  
        }

        const posX = this._currentLineWidth;
        const posY = this._currentLineIndex * (LINE_HEIGHT + this.lineSpacing);

        const wordBlock = new WordBlock(this.scene, posX, posY, wordString, sentenceID, this.textFontFamily, this.textFontSize);
        this.add(wordBlock);
        this.wordList.push(wordBlock);

        this._currentLineWidth += this.getSizeOfText(wordString).width;
         
        // Repeat process with the rest of the word if needed
        if(leftoverWordPart != "")
            this.buildAndAddWord(restOfWord, sentenceID);
    }

    displayBounds() {
      /*  this.scene.graphics.clear();
        this.scene.graphics.lineStyle(1, 0xffff00);
        this.scene.graphics.strokeRectShape(this.getBounds());*/
    }
}