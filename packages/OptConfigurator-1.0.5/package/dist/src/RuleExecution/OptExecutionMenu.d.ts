import { OptChoice } from "../Choices/OptChoice";
import { OptSelection, OptValue } from "../Options/OptContext";
interface IOptionAvailability {
    isAvailable: boolean;
    isVisible: boolean;
}
interface IOptionAvailableMaybe extends IOptionAvailability {
    availabilityUnknown: boolean;
}
interface IOptionInfo {
    id: string;
    name: string;
}
export declare type IOptMenuItem = IOptionAvailability & IOptionInfo & {
    choice: OptChoice;
    isSameItem: (other: IOptMenuItem) => boolean;
};
export declare type IOptMenu = IOptionInfo & IOptionAvailability & {
    items: IOptMenuItem[];
    optSelection: OptSelection;
};
export declare type IOptMenuExtended = IOptMenu & IOptionAvailableMaybe;
export declare type IOptMenuItemExtended = IOptMenuItem & IOptionAvailableMaybe;
export declare class OptExecutionMenuItem implements IOptMenuItemExtended {
    readonly choice: OptChoice;
    isSameItem(other: IOptMenuItem): boolean;
    get id(): string;
    get name(): string;
    isAvailable: boolean;
    isVisible: boolean;
    availabilityUnknown: boolean;
    /** Price delta (difference to base), undefined = not yet calculated. null = no price available. */
    price: number | null | undefined;
    constructor(optChoice: OptChoice, isAvailable: boolean, isVisible: boolean, availabilityUnknown: boolean);
}
export declare class OptExecutionMenu implements IOptMenuExtended {
    readonly optSelection: OptSelection;
    isAvailable: boolean;
    isVisible: boolean;
    availabilityUnknown: boolean;
    readonly items: OptExecutionMenuItem[];
    /** List of OptChoices (OptValue, Style, Color) for this menu. */
    get choices(): OptChoice[];
    get firstChoice(): OptChoice | undefined;
    get id(): string;
    get name(): string;
    constructor(optSelection: OptSelection, isAvailable: boolean, isVisible: boolean, availabilityUnknown: boolean);
    isOptValAvailable(optVal: OptValue): boolean;
    isOptValVisible(optVal: OptValue): boolean;
    setItemAttribute(optVal: OptValue | null, style: string, color: string, visibility: boolean | null, availability: boolean | null, availabilityUnknown?: boolean | null): void;
    setVisibility(optVal: OptValue | null, style: string, color: string, visibility: boolean): void;
    setAvailabilityUnknown(optVal: OptValue | null, style: string, color: string): void;
    setAvailability(optVal: OptValue | null, style: string, color: string, availability: boolean): void;
    getMenuItemForValue(optVal: OptValue, style: string | null, color: string | null): OptExecutionMenuItem | null;
    getMenuItem(choice: OptChoice): OptExecutionMenuItem | null;
}
export {};
