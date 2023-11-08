import { OptContext, OptSelectionType } from "../../src/Options/OptContext";
/** Creates OptContext from IOptContextDefinition (a simplified version of the JSON for testing) */
export declare class OptContextFactory {
    create(definition: IOptContextDefinition): OptContext;
    private readonly defaultQtyUnit;
    private readonly optLoc;
    private readonly optCat;
    private readonly optGrp;
    private readonly optValuesById;
    private createQtyUnit;
    private createOptSel;
    private createOptVal;
    private createStyleColor;
}
interface IOptContextDefinition {
    optSelections: IOptSelectionDefinition[];
}
interface IOptSelectionDefinition {
    id: string;
    name: string;
    type?: OptSelectionType;
    values?: IOptValueDefinition[];
}
interface IOptValueDefinition {
    id: string;
    name?: string;
    stylesAndColors?: IStyleColorDefinition[];
    qtyUnit?: string;
}
interface IStyleColorDefinition {
    style?: string;
    color?: string;
    qtyUnit?: string;
}
export {};
