import * as React from "react";
import { IRuleFunctionStatement, OptDebugStatementInfo, OptRuleExpressionEffectType } from "OptConfigurator";

export interface IRuleStatementDebug {
    eval: IRuleFunctionStatement;
    debug: OptDebugStatementInfo;
}

export interface IRuleStatementProps {
    statement: IRuleStatementDebug;
}

/** Single statement debug information. */
export class RuleStatement extends React.PureComponent<IRuleStatementProps> {
    render() {
        const statement = this.props.statement;
        //const condition = this.props.statement.condition;
        const style: any = {};
        style.backgroundColor = statement.eval.condition ? "#cfc" : "#fcc";

        const targetListString = statement.debug.targets
            .filter(targ => targ.type === "Option")
            .map(targ => targ.target.getDebugString())
            .join(", ");

        let effectParamsText = "";
        if (statement.debug.effectParams != null) {
            effectParamsText = "(" + statement.debug.effectParams.join(', ')  + ")";
        }

        if (statement.debug.conditionText === "T" && statement.debug.effectType === OptRuleExpressionEffectType.Price && statement.debug.effectParams[0] === "0") {
            return <span style={style}>Default price</span> 
        }

        return (
            <span style={style} title={`${statement.debug.sourceInfo?.refObjType} #${statement.debug.sourceInfo?.refObjRID} ${statement.debug.sourceInfo?.description}`}>
                {statement.debug.conditionText} -> {statement.debug.effectTypeRaw}{effectParamsText} {targetListString}
            </span>
        );
    }
}