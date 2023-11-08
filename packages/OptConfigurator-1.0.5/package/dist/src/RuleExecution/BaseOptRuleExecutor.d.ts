import { OptContext, OptSelection, OptValue } from "../Options/OptContext";
import { OptChoiceContext } from "../Choices/OptChoiceContext";
export interface IRuleFunctionContext {
    statementCounter: number;
    matchingCounter: number;
    statements: IRuleFunctionStatement[];
}
export interface IRuleFunctionStatement {
    condition: boolean;
    counter: number;
}
export interface IRuleFunctionDefinition<TExecutor extends IOptRuleExecutor = IOptRuleExecutor> {
    execute: IRuleFunction<TExecutor>;
    associations: {
        [key: string]: {
            OptSelection: string;
            OptValue: string;
        }[];
    };
}
export declare type IRuleFunction<TExecutor extends IOptRuleExecutor = IOptRuleExecutor> = (executor: TExecutor, prevContext: IRuleFunctionContext) => IRuleFunctionContext;
export declare class OptRuleTarget {
    readonly optSelection: OptSelection;
    readonly optValue: OptValue | null;
    readonly style: string;
    readonly color: string;
    constructor(optSelection: OptSelection, optValue: OptValue | null, style: string, color: string);
    static fromValues(optContext: OptContext, optSelID: string, optValID: string, style: string, color: string): OptRuleTarget;
    getDebugString(): string;
}
export interface IOptRuleExecutor {
    getTarget(optSelID: string, optValID: string, style: string, color: string): OptRuleTarget;
    isOptionSelected(optSel: OptSelection, optVal: OptValue, style: string, color: string): boolean;
}
export declare class BaseOptRuleExecutor implements IOptRuleExecutor {
    protected readonly optContext: OptContext;
    protected readonly optChoiceContext: OptChoiceContext;
    constructor(optContext: OptContext, optChoiceContext: OptChoiceContext);
    getTarget(optSelID: string, optValID: string, style: string, color: string): OptRuleTarget;
    isOptionSelected(optSel: OptSelection, optVal: OptValue, style: string, color: string): boolean;
}
