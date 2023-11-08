import * as React from "react";
import { IRuleStatementDebug, RuleStatement } from "./RuleStatement";
import { OptRuleExpressionEffectType } from "OptConfigurator";

export interface IRuleDebugListProps {
    statements: IRuleStatementDebug[];
    statementsTargetting: IRuleStatementDebug[];
}

/** Shows list of statement debug information,
 * first grouped by statements depending / targetting, and then rule (effect) type.
 */
export class RuleDebugList extends React.Component<IRuleDebugListProps> {
    render() {
        return (<div>
            {this.props.statements.length > 0 &&
                <RuleDebugGroup title="Statements depending" statements={this.props.statements}></RuleDebugGroup>}

            {this.props.statementsTargetting.length > 0 &&
                <RuleDebugGroup title="Statements targetting" statements={this.props.statementsTargetting}></RuleDebugGroup>}
        </div>);
    }
}

/** Grouping for one or more rule effect types */
class RuleTypeGrouping {
    constructor(
        public readonly title: string, 
        public readonly effectTypes: OptRuleExpressionEffectType[] = []
    ) {}
}

interface IRuleDebugGroupProps {
    statements: IRuleStatementDebug[];
    title: string;
}

/** Groups statements by rule (effect) type */
export class RuleDebugGroup extends React.Component<IRuleDebugGroupProps> {

    private readonly groups = [
        new RuleTypeGrouping("Show / Hide", [OptRuleExpressionEffectType.Show, OptRuleExpressionEffectType.Hide]),
        new RuleTypeGrouping("Enable / Disable", [OptRuleExpressionEffectType.Enable, OptRuleExpressionEffectType.Disable]),
        new RuleTypeGrouping("Quantity", [OptRuleExpressionEffectType.Quantity]),
        new RuleTypeGrouping("Price", [OptRuleExpressionEffectType.Price])
    ];
    
    private readonly defaultGroup = new RuleTypeGrouping("Others");

    private readonly groupStatements = (array: IRuleStatementDebug[], groups: RuleTypeGrouping[], defaultGroup: RuleTypeGrouping) => {
        return array.reduce((result: Map<RuleTypeGrouping, IRuleStatementDebug[]>, currentValue: IRuleStatementDebug) => {
      
            const effectType = currentValue.debug.effectType;
            const group = groups.find(grp => effectType !== undefined && grp.effectTypes.includes(effectType)) ?? defaultGroup;

            if (result.has(group)) {
                result.get(group)?.push(currentValue)
            }
            else {
                result.set(group, [currentValue])
            }
        
            return result;
        }, new Map<RuleTypeGrouping, IRuleStatementDebug[]>());
    };

    render() {
        const grouped = this.groupStatements(this.props.statements, this.groups, this.defaultGroup);

        return (
            <>
                <h3>{this.props.title}</h3>

                {Array.from(grouped.keys()).map(group => 
                    <RuleStatements key={group.title} title={group.title} statements={grouped.get(group) ?? []} />
                )}
            </>
        );
    }

}

export class RuleStatements extends React.Component<IRuleDebugGroupProps> {
    render() {
        return (
            <>
                <h4>{this.props.title}</h4>
                <ul>
                    {this.props.statements.map((x, idx) => 
                        <li key={idx}>
                            <RuleStatement statement={x} />
                        </li>
                    )}
                </ul>
            </>
        );
    }
}