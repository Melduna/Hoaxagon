import { TEXT_CONFIG } from "../../utils/textConfigs.js";
import { PALETTE_RGBA } from "../../utils/ColorPalette.js";

export class TimerManager {

    /**
     * The variable that keeps track of the timer in milliseconds.
     * @type {number}
     */
    timer;


    /**
     * @type {Phaser.GameObjects.Text}
     */
    timeDisplay;

    constructor(scene, positionX, positionY, initialTimeMilliseconds) {
        this.timer = initialTimeMilliseconds;

        this.timeDisplay = scene.add.text(positionX, positionY, '', TEXT_CONFIG.Heading)
            .setColor(PALETTE_RGBA.White);
        
        this.updateTimer();
    }

    update(time, dt) {
        this.timer -= dt;
    }
    
    /**
     * Updates the timer display to match the remaining time.
     */
    updateTimer() {
        let TD = this.getTime();
        const minutes = TD[0];
        const seconds = (Math.floor(TD[1] / 10)).toString() + (TD[1] % 10).toString();

        this.timeDisplay.text = (`${minutes}:${seconds}`);

        if (this.timer < 11000) this.timeDisplay.setColor(PALETTE_RGBA.RedAlert);
        else if (this.timer < 31000) this.timeDisplay.setColor(PALETTE_RGBA.AmberAlert);
        else if (this.timer < 61000) this.timeDisplay.setColor(PALETTE_RGBA.YellowAlert);
        else if (this.timer < 181000) this.timeDisplay.setColor(PALETTE_RGBA.White);
        else this.timeDisplay.setColor(PALETTE_RGBA.Teal);
    }

    /**
     * Returns an array with the number of minutes and seconds remaining on the timer.
     * @returns {Array<number>}
     */
    getTime() {
        let seconds = this.timer / 1000;
        return [Math.floor(seconds / 60), Math.floor(seconds % 60)];
    }

    /**
     * Adds the specified time to the scene timer, in milliseconds.
     * @param {number} time
     */
    addTimeMilliseconds(time) {
        this.timer = Math.max(0, this.timer += time);
        this.updateTimer();
    }

    /**
     * Adds the specified time to the scene timer, in seconds.
     * @param {number} time
     */
    addTimeSeconds(time) {
        this.timer = Math.max(0, this.timer += (time * 1000));
        this.updateTimer();
    }
}