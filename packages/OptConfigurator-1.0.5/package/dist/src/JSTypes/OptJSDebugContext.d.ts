export declare type OptJSDebugContext = {
    Statements: OptJSDebugStatementInfo[];
};
export declare type OptJSDebugStatementInfo = {
    StatementIndex: number;
    EffectType: string;
    EffectParams: string[];
    SourceText: string;
    ConditionText: string;
    SourceInfo: {
        RefObjType: string;
        RefObjRID: string;
        Description: string;
    };
    Conditions: OptJSDebugCondition[];
    OptionTargets: OptJSDebugTarget[];
};
declare type OptJSDebugTarget = {
    Type: "Option";
    Target: [string, string, string, string];
};
export declare type OptJSDebugCondition = {
    OptSelID: string;
    OptValID: string;
    Style: string;
    Color: string;
};
export {};
