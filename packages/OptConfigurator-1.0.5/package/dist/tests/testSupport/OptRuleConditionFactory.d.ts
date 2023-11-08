import { IOptRuleCondition } from "./TestableRuleFunction";
import { OptSelection, OptValue } from "../../src/Options/OptContext";
import { OptRuleExpressionBinaryOperator } from "./OptRuleExpressionBinaryOperator";
export declare class OptRuleConditionFactory {
    static optionSelected(optSel: string | OptSelection, optVal: string | OptValue, style?: string, color?: string): IOptRuleCondition;
    static optionQuantity(optSel: OptSelection, operator: OptRuleExpressionBinaryOperator, qtyComparisonVal: number): IOptRuleCondition;
}
