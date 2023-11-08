import { IRuleFunction, OptRuleTarget } from "../../src/RuleExecution/BaseOptRuleExecutor";
import { OptRuleExecutor } from "../../src/RuleExecution/OptRuleExecutor";
export declare function getTestableRuleFunction(optRules: OptRule[]): IRuleFunction<OptRuleExecutor>;
export declare type OptRule = {
    readonly condition?: IOptRuleCondition;
    readonly targetList: IOptRuleTargetFactory;
    readonly effect: IOptRuleEffect;
    readonly negativeEffect?: IOptRuleEffect;
};
export declare type IOptRuleCondition = (executor: OptRuleExecutor) => boolean;
export declare type IOptRuleTargetFactory = (executor: OptRuleExecutor) => OptRuleTarget[];
export declare function OptRuleTargetFactory(optSelID: string, optValID?: string, style?: string, color?: string): IOptRuleTargetFactory;
export declare type IOptRuleEffect = (executor: OptRuleExecutor, targetList: OptRuleTarget[], conditionChanged: boolean) => void;
