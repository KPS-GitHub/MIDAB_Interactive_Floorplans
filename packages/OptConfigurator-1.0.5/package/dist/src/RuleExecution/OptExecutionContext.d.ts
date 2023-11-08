import { OptPrice, OptPricingContext } from "../Pricing/OptPricingContext";
import { OptExecutionMenu } from "./OptExecutionMenu";
import { OptChoiceContext } from "../Choices/OptChoiceContext";
import { OptChoice } from "../Choices/OptChoice";
import { OptContext, OptSelection, OptValue } from "../Options/OptContext";
import { OptFloorplanImage } from "../Floorplans/OptFloorplanImage";
/**
 * Option rule execution context.
 * Execution context is created for each rule iteration.
 * Contains pricing information, quantities and choice availability.
 * Choices in the execution context are copied from OptContext.
 * User's choices are tracked in OptChoiceContext, instead of execution context.
 * */
export declare class OptExecutionContext {
    static readonly defaultQuantity: number;
    readonly menus: OptExecutionMenu[];
    private readonly menusByID;
    visibleFloorplanImages: OptFloorplanImage[];
    private readonly prices;
    /** This method is called internally, there should be no reason to call it manually */
    updatePrices(pricingContext: OptPricingContext): void;
    /** Whether choice is available and visible */
    isChoiceAvailable(choice: OptChoice): boolean;
    /**
     * Gets unit price for a choice.
     * @returns Unit price. Can be null if not found.
     * */
    getUnitPrice(choice: OptChoice): OptPrice | null;
    /** This method is called internally, there should be no reason to call it manually */
    addPrice(optsel: OptSelection, optval: OptValue, style: string | null, color: string | null, price: number): void;
    constructor(optContext: OptContext, choices: OptChoiceContext);
    getMenu(optSel: OptSelection): OptExecutionMenu | undefined;
    getRequiredMenu(optSel: OptSelection): OptExecutionMenu;
    /** Gets current quantity for choice. This value is updated during rule execution. */
    getQuantity(choice: OptChoice): number | null;
    /** Tests whether option selection is marked as available */
    isOptSelAvailable(optSel: OptSelection): boolean;
    /** Tests whether option selection is marked as visible */
    isOptSelVisible(optSel: OptSelection): boolean;
}
