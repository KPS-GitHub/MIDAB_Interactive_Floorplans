import { OptChoiceContext } from "../Choices/OptChoiceContext";
import { OptChoice } from "../Choices/OptChoice";
import { OptExecutionContext } from "./OptExecutionContext";
import { BaseOptRuleExecutor, IRuleFunction, IRuleFunctionContext, OptRuleTarget } from "./BaseOptRuleExecutor";
import { OptContext, OptQtyUnit, OptSelection, OptValue } from "../Options/OptContext";
import { IRulePerfProfiler } from "../Debugging/PerformanceProfiler";
/**
 * Executor is called by the option rules during rule evaluation and it mostly handles state updates caused by rules.
 * */
export declare class OptRuleExecutor extends BaseOptRuleExecutor {
    private readonly perf;
    private readonly previousExecutingContext;
    private readonly optExecutionContext;
    getQtyUnit(qtyUnitName: string): OptQtyUnit;
    getUpdatedChoices(): OptChoiceContext;
    constructor(optContext: OptContext, optChoiceContext: OptChoiceContext, perf: IRulePerfProfiler, previousExecutingContext: OptExecutionContext | null);
    execute(ruleFunction: IRuleFunction<OptRuleExecutor>, lastContext: IRuleFunctionContext): {
        context: IRuleFunctionContext;
        choices: OptChoiceContext;
        executionContext: OptExecutionContext;
    };
    prepareExecute(): void;
    finishExecute(): void;
    getSelectedChoiceForOptSelection(optsel: OptSelection): OptChoice | null;
    isOptionSelected(optSel: OptSelection, optVal: OptValue, style: string, color: string): boolean;
    addPrice(price: number, targetList: OptRuleTarget[]): void;
    addQuantity(quantity: number, qtyUnit: OptQtyUnit, targetList: OptRuleTarget[]): void;
    hide(targetList: OptRuleTarget[]): void;
    show(targetList: OptRuleTarget[]): void;
    unknownAvailability(targetList: OptRuleTarget[]): void;
    noop(targetList: OptRuleTarget[]): void;
    autoselect(targetList: OptRuleTarget[]): void;
    enable(targetList: OptRuleTarget[]): void;
    disable(targetList: OptRuleTarget[]): void;
    enableShow(targetList: OptRuleTarget[]): void;
    disableHide(targetList: OptRuleTarget[]): void;
    getQuantity(optSelID: string): number | null | undefined;
    matchCond(targetList: OptRuleTarget[], matchOptSelID: string): void;
    private doMatchCond;
    controlValues(targetList: OptRuleTarget[], ...matchOptSelIDs: string[]): void;
    private verifyIterable;
    private doControlValues;
    private dohide;
    private doAvailabilityUnknown;
    private doselect;
    private dodisable;
    private deselectOptVal;
}
