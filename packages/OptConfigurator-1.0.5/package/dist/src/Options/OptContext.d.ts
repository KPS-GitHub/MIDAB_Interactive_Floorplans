import { OptChoice } from "../Choices/OptChoice";
import { AsyncImageData } from "../AsyncImageClient";
import { JSOptContext } from "../JSTypes/JSOptContext";
import { JSOptLocation } from "../JSTypes/JSOptLocation";
import { JSOptSelection } from "../JSTypes/JSOptSelection";
import { JSOptValue } from "../JSTypes/JSOptValue";
import { JSQtyUnit } from "../JSTypes/JSQtyUnit";
import { JSStyleAndColor } from "../JSTypes/JSStyleAndColor";
import { JSOptChoiceContext } from "../JSTypes/JSOptChoiceContext";
export declare type OptSelectionType = "Radio" | "Attribute" | "Binary" | "Quantity";
/**
 * Option selection.
 * For example, carpet type.
 * There are multiple different types of option selections:
 * list (attribute/radio), checkbox (binary) and quantity.
 * Option selections are intended to be immutable in client.
 */
export declare class OptSelection {
    name: string;
    location: OptLocation;
    category: OptLocation;
    id: string;
    values: OptValue[];
    valuesByID: {
        [key: string]: OptValue;
    };
    pricingRequired: boolean;
    optSelectionType: OptSelectionType;
    isDesignCenterOption: boolean;
    isSalesOfficeOption: boolean;
    availabilityUnknown: boolean;
    availabilityDepends: boolean;
    IsWebEnabled: boolean;
    catGroup: OptLocation | null;
    locGroup: OptLocation | null;
    sortOrder: number;
    constructor(optContext: OptContext, jsOptSelection: JSOptSelection, location: OptLocation, category: OptLocation, locGroup: OptLocation | null, catGroup: OptLocation | null);
    findValueByID(id: string): OptValue | undefined;
    findRequiredValueByID(id: string): OptValue;
    /** Quantity is set manually, instead of quantity rules */
    get isManualQuantity(): boolean;
}
export declare class OptStyleAndColor {
    id: string;
    style: string;
    color: string;
    qtyUnit: OptQtyUnit;
    image: AsyncImageData;
    constructor(optContext: OptContext, jsStyleAndColor: JSStyleAndColor);
}
export declare class OptValue {
    id: string;
    name: string;
    stylesAndColors: OptStyleAndColor[];
    isNotSelectedValue: boolean;
    qtyUnit: OptQtyUnit;
    availabilityUnknown: boolean;
    availabilityDepends: boolean;
    IsWebEnabled: boolean;
    image: AsyncImageData;
    hasImage: boolean;
    constructor(optSel: OptSelection, optContext: OptContext, jsOptValue: JSOptValue);
    getStyleColor(style: string, color: string): OptStyleAndColor | null;
}
export declare class OptQtyUnit {
    id: string;
    roundingAccuracy: number;
    constructor(id: string, roundingAccuracy: number);
    round(quantity: number): number;
}
/**
 * Contains OptSelections, their OptValues, QtyUnits and related objects
 * from the server. This class should be immutable in client.
 */
export declare class OptContext {
    readonly qtyUnitsByID: {
        [key: string]: OptQtyUnit;
    };
    readonly qtyUnits: OptQtyUnit[];
    readonly optSelections: OptSelection[];
    readonly optSelectionsByID: {
        [key: string]: OptSelection;
    };
    readonly optLocations: OptLocation[];
    readonly optCategories: OptLocation[];
    readonly optGroups: OptLocation[];
    /**
     * List of all choices in the context, for all OptSelection, OptValue, Style and Color combinations.
     * This does not include information about choices made by the user.
     * */
    readonly availableChoices: OptChoice[];
    _handleJSQtyUnit(jsqty: JSQtyUnit): OptQtyUnit;
    constructor(jsOptContext: JSOptContext, jsBaseContext?: JSOptChoiceContext);
    private getAvailableChoices;
    getChoiceForValues(optSel: OptSelection, optVal: OptValue, style: string | null, color: string | null): OptChoice | null;
    /**
     * Gets list of choices (OptValue and Style/Color selections) for an OptSelection.
     * Choices in OptContext represent possible selections and should be immutable.
     * */
    getChoicesForOptSel(optSel: OptSelection): OptChoice[];
    findSelectionByID(id: string): OptSelection | undefined;
    findRequiredSelectionByID(id: string): OptSelection;
    findQtyUnitByName(name: string): OptQtyUnit;
    findLocationByName(name: string): OptLocation | null;
    findCategoryByName(name: string): OptLocation | null;
    findGroupByName(name: string): OptLocation | null;
}
export declare class OptLocation {
    name: string;
    sortOrder: number;
    constructor(jsOptLocation: JSOptLocation);
}
