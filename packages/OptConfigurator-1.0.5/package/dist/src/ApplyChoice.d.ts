import { OptJSSerializedOptChoice } from "./Choices/OptChoiceContext";
import { OptChoice } from "./Choices/OptChoice";
import { OptContext, OptSelection } from "./Options/OptContext";
import { ConfigurationState } from "./ConfigurationState";
export declare type ApplyChoiceJSON = {
    optSelection: string;
    choice?: OptJSSerializedOptChoice;
};
/**
 * Represents a choice, that is option value + style + color, made by a user or rule for a particular option selection.
 * Choice can be null if the value is cleared.
 * */
export declare class ApplyChoice {
    readonly optSelection: OptSelection;
    readonly choice: OptChoice | null;
    toJSON(): ApplyChoiceJSON;
    static fromJSON(optContext: OptContext, json: ApplyChoiceJSON): ApplyChoice;
    constructor(optSelection: OptSelection, choice: OptChoice | null);
    apply(optState: ConfigurationState): ConfigurationState;
    get description(): string;
}
