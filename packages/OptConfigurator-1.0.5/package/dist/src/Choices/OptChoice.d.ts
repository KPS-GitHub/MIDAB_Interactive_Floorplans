import { OptContext, OptSelection, OptValue, OptQtyUnit } from "../Options/OptContext";
import { OptRuleTarget } from "../RuleExecution/BaseOptRuleExecutor";
import { OptJSSerializedOptChoice, ISelectionMode } from "./OptChoiceContext";
/**
 * OptChoice represents option value, and possible style/color for an option selection.
 *
 * Other values are immutable, except quantity, which can be modified by rules,
 * or manually for "Quantity" option selections.
 * */
export declare class OptChoice {
    readonly hasBaseValue: boolean;
    toJSON(): OptJSSerializedOptChoice;
    static fromJSON(optContext: OptContext, json: OptJSSerializedOptChoice): OptChoice;
    readonly optSel: OptSelection;
    readonly optVal: OptValue;
    readonly style: string | null;
    readonly color: string | null;
    private _quantity;
    selectionMode: ISelectionMode;
    /** Fixed price, overrides default price if not null */
    originalPrice: number | null;
    private qtyUnit?;
    constructor(optSel: OptSelection, optVal: OptValue, style?: string | null, color?: string | null, quantity?: number | null, originalPrice?: number | null, selectionMode?: ISelectionMode, hasBaseValue?: boolean);
    /**
     * Increases the quantity.
     * If current quantity is not set, it is assumed to be 0.
     */
    addQuantity(quantity: number): void;
    get quantity(): number | null;
    /**
     * Set quantity.
     * This is generally only used for option selections of type "Quantity" where the user can set quantity manually.
     * Prefer addQuantity for increasing quantity, because it will handle unset values correctly.
     * @param quantity New quantity. Setting this to null clears the quantity.
     * */
    set quantity(quantity: number | null);
    /**
     * Quantity unit.
     * This value is cached.
     */
    getQtyUnit(): OptQtyUnit;
    private doGetQtyUnit;
    isSameChoice(other: OptChoice): boolean;
    getCopy(hasBaseValue?: boolean): OptChoice;
    toTarget(): OptRuleTarget;
}
