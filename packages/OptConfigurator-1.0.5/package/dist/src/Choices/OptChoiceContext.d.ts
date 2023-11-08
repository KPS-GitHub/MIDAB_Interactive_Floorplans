import { OptSelection, OptValue } from "../Options/OptContext";
import { OptChoice } from "./OptChoice";
export declare type ISelectionMode = "None" | "SalesOffice" | "DesignCenter";
export declare type OptJSSerializedOptChoice = {
    optSel: string;
    optVal: string;
    style: string | null;
    color: string | null;
    quantity: number | null;
    selectionMode: ISelectionMode;
    originalPrice: number | null;
};
/**
 * Contains option choices made by user or rules.
 *
 * Quantities during rule evaluation are tracked in execution context,
 * this choice context only contains the initial quantities.
 *
 * Choice availability is tracked in OptExecutionContext.
 * */
export declare class OptChoiceContext {
    /**
     * List of choices by OptSelection ID.
     * This represents the selections made by user or autoselect rules.
     * There is 1 OptChoice per OptSelection, which identifies the active selection.
     * */
    readonly choices: {
        [key: string]: OptChoice;
    };
    private nullQuantity;
    /**
     * Compares this choice context to another.
     * Optionally tests changed quantities too.
     * @param quantityChanged Test if quantity has changed for a choice. Returns true if quantity has changed.
     */
    comparison(other: OptChoiceContext, quantityChanged?: (choice: OptChoice) => boolean): ({
        optSelection: string;
        old: string;
        new: string;
    } | {
        optSelection: string;
        old: string;
        new: null;
    } | {
        optSelection: string;
        old: null;
        new: string;
    })[];
    isChoiceSelected(choice: OptChoice): boolean;
    /**
     * This matches using the same rules as when used in condition strings - i.e. empty style and color match any style and color.
     * */
    isOptionSelected(optSel: OptSelection, optVal: OptValue, style?: string, color?: string): boolean;
    /** Gets the selected choice for an option selection. */
    getChoiceForOptSelection(optSel: OptSelection): OptChoice | null;
    /**
     * Gets the quantity for an option selection. Quantities are updated here after rule execution, not during.
     * */
    getQuantityForOptSelection(optsel: OptSelection): number | null;
    /** Gets the selected option value for an option selection. */
    getSelectedValueForOptSelection(optSel: OptSelection): OptValue | null;
    getCopy(copyChoice?: (choice: OptChoice) => OptChoice): OptChoiceContext;
    /** Selects a choice in the current context */
    select(choice: OptChoice): void;
    /**
    * Makes a copy of this context and selects a choice. Current context is not modified.
    * @return The updated context
    * */
    applySelect(optSel: OptSelection, choice: OptChoice | null): OptChoiceContext;
    constructor(choices?: {
        [key: string]: OptChoice;
    } | OptChoice[]);
    getDebugString(): string;
}
