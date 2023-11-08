import { ConfigurationState } from "./ConfigurationState";
/** Prices for current OptChoices */
export declare class PriceCollection {
    private readonly state;
    constructor(state: ConfigurationState);
    /** Prices by OptChoice */
    get applicablePrices(): import("..").ChoicePrice[];
    /** Total prices */
    get totalPrice(): import("..").TotalPrices;
}
