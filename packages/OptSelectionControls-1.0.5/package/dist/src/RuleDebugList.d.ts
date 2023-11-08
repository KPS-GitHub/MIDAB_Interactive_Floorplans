import * as React from "react";
import { IRuleStatementDebug } from "./RuleStatement";
export interface IRuleDebugListProps {
    statements: IRuleStatementDebug[];
    statementsTargetting: IRuleStatementDebug[];
}
/** Shows list of statement debug information,
 * first grouped by statements depending / targetting, and then rule (effect) type.
 */
export declare class RuleDebugList extends React.Component<IRuleDebugListProps> {
    render(): JSX.Element;
}
interface IRuleDebugGroupProps {
    statements: IRuleStatementDebug[];
    title: string;
}
/** Groups statements by rule (effect) type */
export declare class RuleDebugGroup extends React.Component<IRuleDebugGroupProps> {
    private readonly groups;
    private readonly defaultGroup;
    private readonly groupStatements;
    render(): JSX.Element;
}
export declare class RuleStatements extends React.Component<IRuleDebugGroupProps> {
    render(): JSX.Element;
}
export {};
