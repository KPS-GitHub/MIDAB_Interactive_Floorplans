export interface IRulePerfProfiler {
    result(name: PerformanceMeasures): PerformanceResult;
    measure<TResult>(name: PerformanceMeasures, action: () => TResult): TResult;
}
export declare class NullProfiler implements IRulePerfProfiler {
    measure<TResult>(_name: PerformanceMeasures, action: () => TResult): TResult;
    result(_name: PerformanceMeasures): PerformanceResult;
}
declare type PerformanceMeasures = "applyRules" | "applyRulesImpl" | "executionContextCtor" | "execute" | "handleUpdatedChoices" | "ruleFunction";
declare type AllMeasuresMap = {
    [key in PerformanceMeasures]: PerformanceResult;
};
/** Measures rule evaluation performance */
export declare class RulePerfProfiler implements IRulePerfProfiler {
    static create(): NullProfiler | RulePerfProfiler;
    constructor();
    private endMark;
    private startMark;
    private clear;
    measure<TResult>(name: PerformanceMeasures, action: () => TResult): TResult;
    result(name: PerformanceMeasures): PerformanceResult;
    get measures(): PerformanceEntryList;
    /** List of all results, keyed by measure name */
    get results(): AllMeasuresMap;
}
export declare class PerformanceResult {
    constructor(list: PerformanceEntryList);
    readonly avgTime: number;
    get avgTimeInt(): number;
    readonly count: number;
}
export {};
