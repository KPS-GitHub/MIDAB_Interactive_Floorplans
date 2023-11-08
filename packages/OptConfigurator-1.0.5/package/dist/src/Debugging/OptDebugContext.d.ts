import { OptRuleTarget } from '../RuleExecution/BaseOptRuleExecutor';
import { OptContext, OptSelection, OptValue } from "../Options/OptContext";
import { OptRuleExpressionEffectType } from './OptRuleExpressionEffectType';
import { OptJSDebugContext, OptJSDebugStatementInfo, OptJSDebugCondition } from '../JSTypes/OptJSDebugContext';
export declare class OptDebugStatementInfo {
    readonly statementIndex: number;
    readonly effectType: OptRuleExpressionEffectType | undefined;
    readonly effectTypeRaw: string;
    readonly effectParams: string[];
    readonly sourceText: string;
    readonly conditionText: string;
    readonly conditions: OptDebugStatementConditionInfo[];
    readonly sourceInfo: {
        refObjType: string;
        refObjRID: string;
        description: string;
    } | null;
    readonly targets: {
        type: "Option";
        target: OptRuleTarget;
    }[];
    constructor(statementIndex: number, effectType: OptRuleExpressionEffectType | undefined, effectTypeRaw: string, effectParams: string[], sourceText: string, conditionText: string, conditions: OptDebugStatementConditionInfo[], sourceInfo: {
        refObjType: string;
        refObjRID: string;
        description: string;
    } | null, targets: {
        type: "Option";
        target: OptRuleTarget;
    }[]);
    static fromJSON(optContext: OptContext, jsonObject: OptJSDebugStatementInfo): OptDebugStatementInfo;
}
export declare class OptDebugStatementConditionInfo {
    readonly optSel: OptSelection;
    readonly optVal: OptValue | null;
    readonly style: string | null;
    readonly color: string | null;
    constructor(optSel: OptSelection, optVal: OptValue | null, style: string | null, color: string | null);
    static fromJSON(optContext: OptContext, jsonObject: OptJSDebugCondition): OptDebugStatementConditionInfo;
}
export declare class OptDebugContext {
    readonly statements: OptDebugStatementInfo[];
    constructor(statements: OptDebugStatementInfo[]);
    static fromJSON(optContext: OptContext, jsonObject: OptJSDebugContext): OptDebugContext;
}
