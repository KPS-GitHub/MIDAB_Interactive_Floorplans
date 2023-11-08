import { IOptRuleCondition, OptRule } from "./TestableRuleFunction";
import { OptContext, OptQtyUnit, OptSelection, OptValue } from "../../src/Options/OptContext";
import { OptRuleExpressionEffectType } from "../../src/Debugging/OptRuleExpressionEffectType";
/** Various factory methods for creating OptRules */
export declare class OptRuleFactory {
    createPriceRule(price: number, optSelID: string | OptSelection, optValID: string | OptValue): OptRule;
    createPriceRules(optContext: OptContext): OptRule[];
    createQuantityRule(quantity: number, qtyUnit: string | OptQtyUnit, optSel: string | OptSelection): OptRule;
    private getNegatedEffectType;
    private getEffectFunction;
    createRule(effect: OptRuleExpressionEffectType, target: OptRuleTargetData, condition?: IOptRuleCondition, value?: number | string | null, value2?: string | null): OptRule;
}
export declare class OptRuleTargetData {
    private optSelection;
    private optValue;
    style?: string | undefined;
    color?: string | undefined;
    constructor(optSelection: string | OptSelection, optValue?: string | OptValue | null, style?: string | undefined, color?: string | undefined);
    get optSelID(): string;
    get optValID(): string;
}
