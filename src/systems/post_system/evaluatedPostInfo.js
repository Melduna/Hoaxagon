
export class EvaluatedPostInfo {
    /**
     * @type {Post}
     */
    postObject;

    /**
     * @type {boolean}
     */
    playerSuccessed;

    /**
     * The sentence that has been selected by the player in the inspector mode.
     * @type {number}
     */
    sentenceSelectedID = -1;

    /**
     * The fallacy object that corresponds to the selected InfoBox in th inspector mode.
     * @type {Fallacy}
     */
    selectedFallacyObj = null;

    constructor(postObject, playerSuccessed, sentenceSelectedID, selectedFallacyObj) {

        console.assert(postObject !== null, "EvaluatedPostInfo: postObject is null");
        console.assert(
            Object.hasOwn(postObject, "text") && 
            Object.hasOwn(postObject, "fallacyType"), 
            "EvaluatedPostInfo: postObject is not a Post");
        console.assert(typeof playerSuccessed === "boolean", "EvaluatedPostInfo: playerSuccessed is not a boolean");
        console.assert(typeof sentenceSelectedID === "number", "EvaluatedPostInfo: sentenceSelectedID is not a number");
        // selectedFallacyObj can be null

        this.postObject = postObject;
        this.playerSuccessed = playerSuccessed;
        this.sentenceSelectedID = sentenceSelectedID;
        this.selectedFallacyObj = selectedFallacyObj;
    }
}