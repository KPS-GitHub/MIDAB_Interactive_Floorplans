import { OptContext, OptSelection, OptValue } from "./Options/OptContext";
import { OptPricingContext } from "./Pricing/OptPricingContext";
import { OptRuleExecutor } from "./RuleExecution/OptRuleExecutor";
import { OptFloorplanContext } from "./Floorplans/OptFloorplanContext";
import { OptDebugContext } from "./Debugging/OptDebugContext";
import { OptExecutionContext } from "./RuleExecution/OptExecutionContext";
import { OptChoiceContext } from "./Choices/OptChoiceContext";
import { OptChoice } from "./Choices/OptChoice";
import { IRuleFunction, IRuleFunctionContext, IRuleFunctionDefinition } from "./RuleExecution/BaseOptRuleExecutor";
import { IAsyncImageClient } from "./AsyncImageClient";
import { IRulePerfProfiler } from "./Debugging/PerformanceProfiler";
import { JSGetOptContext } from "./JSTypes/JSGetOptContext";
import { PriceCollection } from "./PriceCollection";
export declare type IConfigurationStateProps = {
    baseSelections: OptChoiceContext;
    lastRuleExecutionContext: IRuleFunctionContext | null;
    ruleEngine: IRuleFunctionDefinition;
    floorplanClient: IAsyncImageClient;
    source: JSGetOptContext;
    floorplanContext: OptFloorplanContext;
    choices: OptChoiceContext;
    debugContext: OptDebugContext | null;
    executionContext: OptExecutionContext;
    pricingContext: OptPricingContext;
    options: OptContext;
    lot: {
        premium: number;
    };
    model: {
        price: number;
        adjustments: number;
        name: string;
    };
    defaultSelections: OptChoiceContext;
};
export declare type ApplyRulesResult = {
    choices: OptChoiceContext;
    executionContext: OptExecutionContext;
    ruleExecutionContext: IRuleFunctionContext;
    iterationCount: number;
};
/**
 * Root object containing option configuration state,
 * including option selections and choices.
 * State will be recreated after each rule evaluation.
 */
export declare class ConfigurationState {
    readonly stateProps: IConfigurationStateProps;
    constructor(stateProps: IConfigurationStateProps);
    get floorplanClient(): IAsyncImageClient;
    set floorplanClient(value: IAsyncImageClient);
    /** The original JSON data that was used to initialize this ConfigurationState */
    get source(): JSGetOptContext;
    /** Floorplan images. */
    get floorplanContext(): OptFloorplanContext;
    /**
     * Which choices the customer has made.
     * */
    get choices(): OptChoiceContext;
    /** Base selections for the customer choices. */
    get baseSelections(): OptChoiceContext;
    get debugContext(): OptDebugContext | null;
    /**
     * The option menus - which are available, which are disabled
     * */
    get executionContext(): OptExecutionContext;
    /**
     * Pricing information - price of options etc.
     * */
    get pricingContext(): OptPricingContext;
    /** Current prices */
    get prices(): PriceCollection;
    /**
     * All possible options that can be selected to the model. This list is static and never changes.
     * */
    get options(): OptContext;
    /**
     * List of all possible OptSelections (and their values).
     * This list is static and never changes.
     */
    get optSelections(): OptSelection[];
    /** Lot information - lot premium etc. */
    get lot(): {
        premium: number;
    };
    /** Information about the model - name etc. */
    get model(): {
        price: number;
        adjustments: number;
        name: string;
    };
    get defaultSelections(): OptChoiceContext;
    /**
     * Returns what is different between this state and some other state. Useful to detect which options have changed,
     * and what menu items have disappeared or become visible.
     * */
    compareState(otherState: ConfigurationState): void;
    /** Gets choice based on OptSelection, OptValue and optional style/color. */
    getChoice(optSelection: OptSelection, optValue: OptValue, style?: string, color?: string): OptChoice | null;
    /** Whether choice is available and visible */
    isChoiceAvailable(choice: OptChoice): boolean;
    /** Selects an option value from an option menu. Use the same ID as optSelection to select a binary option.
     * @param optSelection OptSelection for which to make the choice.
     * @param choice Selected choice. If null, selection for that OptSelection is cleared. For binary this means unchecked.
    */
    handleOptionChange(optSelection: OptSelection, choice: OptChoice | null): ConfigurationState;
    /** This method is called internally, there should be no reason to call it manually */
    handleUpdatedChoices(updatedChoices: OptChoiceContext): ConfigurationState;
    private doHandleUpdatedChoices;
    /** Resets all choices to their defaults */
    resetDefaultChoices(): ConfigurationState;
    private static quantityChanged;
    /** This method is called internally, there should be no reason to call it manually */
    static applyRulesImpl(optContext: OptContext, originalChoices: OptChoiceContext, lastRuleExecutionContext: IRuleFunctionContext | null, executeFunction: IRuleFunction<OptRuleExecutor>, perf?: IRulePerfProfiler): ApplyRulesResult;
    /**
     * Evaluates option rules and returns the updated state.
     * This function is called automatically when choices are changed. There is usually no reason to call this manually.
     * */
    applyRules(profiler?: IRulePerfProfiler): ConfigurationState;
    private doApplyRules;
}
