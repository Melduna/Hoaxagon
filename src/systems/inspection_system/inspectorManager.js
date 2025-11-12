import { PostManager } from "../post_system/postManager.js";
import { FallacyInfoPanel } from "../ui_system/fallacyInfoPanel.js";
import { InfoBox } from "../../utils/infoBox.js";

export class InspectorManager {

    /**
     * @type {Phaser.Scene}
     */
    scene;

    /**
     * @type {PostManager}
     */
    postManager;

    /**
     * @type {FallacyInfoPanel}
     */
    infoPanel;

    /**
     * @type {Phaser.GameObjects.Image}
     */
    inspectorModeButton;

    /**
     * @type {boolean}
     */
    inspectionActive = false;

    /**
     * @param {Phaser.Scene} scene 
     * @param {FallacyInfoPanel} infoPanel 
     * @param {PostManager} postManager 
     * @param {InspectorModeButton} inspectorModeButton 
     */
    constructor(scene, infoPanel, postManager, inspectorModeButton) {
        console.assert(scene instanceof Phaser.Scene, "InspectorManager: scene is not a Phaser.Scene");
        console.assert(infoPanel instanceof FallacyInfoPanel, "InspectorManager: infoPanel is not a FallacyInfoPanel");
        console.assert(postManager instanceof PostManager, "InspectorManager: postManager is not a PostManager");
        console.assert(inspectorModeButton instanceof Image, "InspectorManager: inspectorModeButton is not an Image");

        this.scene = scene;
        this.infoPanel = infoPanel;
        this.postManager = postManager;
        this.inspectorModeButton = inspectorModeButton;

        // To handle when an info box is clicked in the info panel
        this.infoPanel.onInfoBoxClicked = this.handleInfoBoxClick.bind(this);
    }

    /**
     * Handles the click event on an InfoBox.
     * @param {InfoBox} infoBox 
     */
    handleInfoBoxClick(infoBox) {
        if (!this.inspectionActive) {
            infoBox.expandInfo();
            return;
        }

        // Deselect all info boxes
        this.infoPanel.infoBoxes.forEach((infoBox) => {
            infoBox.setSelectionState(false);
        });

        // Select clicked info box
        infoBox.setSelectionState(!infoBox.isSelected);
    }
}