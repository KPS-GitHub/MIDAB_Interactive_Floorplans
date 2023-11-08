import * as React from "react";
import { IRuleFunctionStatement, OptDebugStatementInfo } from "OptConfigurator";
export interface IRuleStatementDebug {
    eval: IRuleFunctionStatement;
    debug: OptDebugStatementInfo;
}
export interface IRuleStatementProps {
    statement: IRuleStatementDebug;
}
/** Single statement debug information. */
export declare class RuleStatement extends React.PureComponent<IRuleStatementProps> {
    render(): JSX.Element;
}
