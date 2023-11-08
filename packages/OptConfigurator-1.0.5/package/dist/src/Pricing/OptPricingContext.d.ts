import { OptSelection, OptValue } from "../Options/OptContext";
import { OptChoiceContext } from "../Choices/OptChoiceContext";
import { OptChoice } from "../Choices/OptChoice";
import { OptExecutionContext } from "../RuleExecution/OptExecutionContext";
import { JSLotPrice } from "../JSTypes/JSLotPrice";
import { JSModelPrice } from "../JSTypes/JSModelPrice";
export declare class OptPrice {
    optsel: OptSelection;
    optval: OptValue;
    style: string;
    color: string;
    price: number;
    constructor(optsel: OptSelection, optval: OptValue, style: string, color: string, price: number);
    increasePrice(price: number): void;
}
export declare class OptPricingContext {
    private model;
    private lot;
    baseContext: OptChoiceContext;
    prices: {};
    constructor(model: JSModelPrice, lot: JSLotPrice, baseContext: OptChoiceContext);
    applicablePrices(optChoiceContext: OptChoiceContext, executionContext: OptExecutionContext): ChoicePrice[];
    calculatePrice(optChoiceContext: OptChoiceContext, executionContext: OptExecutionContext): TotalPrices;
    /**
     * This method returns the difference of the selected option value to the base option value.
     *     i.e. this is the "actual" price the customer has to pay
     */
    getPriceDelta(executionContext: OptExecutionContext, choice: OptChoice): number | null;
}
/** Price for OptChoice */
export interface ChoicePrice {
    choice: OptChoice;
    /** Price delta, meaning difference compared to base price, multiplied by quantity. */
    price: number;
}
export declare type TotalPrices = {
    /** Base price */
    base: number;
    /** Prices from customer's selections */
    selections: number;
    /** Lot premium */
    lotPremium: number;
    /** Prices from sales office selections */
    selectionsDC: number;
    adjustments: number;
};
