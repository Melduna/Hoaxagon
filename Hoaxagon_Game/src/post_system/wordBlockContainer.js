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
     * @type {number}
     */
    wordList = Array();

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
    constructor(scene, positionX, positionY, lineMaxWidth) {
        super(scene, positionX, positionY);
        
        this.lineMaxWidth = lineMaxWidth;
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

        return Phaser.GameObjects.Text.MeasureText(styleConfig, str, false); // word wrap = false
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

        if(WORD_SIZE.width <= this.lineMaxWidth) {
            // The word only fits entirely in the next line
            if(this._currentLineWidth + WORD_SIZE.width > this.lineMaxWidth) {
                this._currentLineIndex++;
                this._currentLineWidth = 0;
            }

            const posX = this._currentLineWidth;
            const posY = this._currentLineIndex * (LINE_HEIGHT + this.lineSpacing);

            const wordBlock = new WordBlock(this.scene, posX, posY, wordString, sentenceID, this.textFontFamily, this.textFontSize);
            this.add(wordBlock);
            this.wordList.push(wordBlock);

            return;
        }

        // The word ocupies more than one line
        this._currentLineIndex++;
        this._currentLineWidth = 0;

        let i = 0;
        let w = 0; 
        while(i < wordString.length-1 && w + this.getSizeOfText(wordString[i+1]).width) i++;

        const wordToWrite = wordString.slice(0, );
    }

    displayBounds() {

        this.scene.graphics.clear();
        this.scene.graphics.lineStyle(1, 0xffff00);
        this.scene.graphics.strokeRectShape(this.getBounds());
    }
}