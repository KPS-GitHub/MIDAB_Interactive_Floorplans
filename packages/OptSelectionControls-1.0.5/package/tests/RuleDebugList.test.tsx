import * as React from "react";
import { shallow } from 'enzyme';
import { RuleDebugList, RuleDebugGroup, RuleStatements } from '../src/RuleDebugList';
import { IRuleStatementDebug, RuleStatement } from "../src/RuleStatement";
import { OptDebugStatementInfo, OptRuleExpressionEffectType } from "OptConfigurator";

function createStatement(effectType: OptRuleExpressionEffectType = OptRuleExpressionEffectType.AutoSelect): IRuleStatementDebug {
    return { eval: { condition: true, counter: 0 }, debug: { effectType: effectType } as OptDebugStatementInfo };
}

describe("RuleDebugList", () => {

    it("works with empty statements", () => {
        const ruleDebugList = shallow(<RuleDebugList statements={[]} statementsTargetting={[]} />);
        expect(ruleDebugList.find(RuleDebugGroup)).toHaveLength(0);
    });

    it("works with statements depending", () => {

        const statements = [
            createStatement()
        ];

        const ruleDebugList = shallow(<RuleDebugList statements={statements} statementsTargetting={[]} />);
        expect(ruleDebugList.find(RuleDebugGroup)).toHaveLength(1);

    });
    
});

describe("RuleDebugGroup", () => {

    it("works with a single rule", () => {

        const statements = [
            createStatement()
        ];

        const ruleDebugGroup = shallow(<RuleDebugGroup title="Statements depending" statements={statements} />);

        const ruleStatementsLists = ruleDebugGroup.find(RuleStatements);
        expect(ruleStatementsLists).toHaveLength(1);
        expect(ruleStatementsLists.props().title).toBe("Others");
        expect(ruleStatementsLists.props().statements).toHaveLength(1);

        const ruleStatements = ruleStatementsLists.shallow().find(RuleStatement);
        expect(ruleStatements).toHaveLength(1);
        expect(ruleStatements.props().statement?.debug?.effectType).toBe(OptRuleExpressionEffectType.AutoSelect);

    });

    it("works with rules of different types", () => {

        const statements = [
            createStatement(OptRuleExpressionEffectType.Show),
            createStatement(OptRuleExpressionEffectType.Hide),
            createStatement(OptRuleExpressionEffectType.Price),
            createStatement(OptRuleExpressionEffectType.AutoSelect)
        ];

        const ruleDebugGroup = shallow(<RuleDebugGroup title="Statements depending" statements={statements} />);
       
        const ruleStatementsLists = ruleDebugGroup.find(RuleStatements);
        expect(ruleStatementsLists.length).toBe(3);

        const hideShow = ruleStatementsLists.filterWhere(grp => grp.props().title === "Show / Hide");
        expect(hideShow).toHaveLength(1);
        expect(hideShow.props().statements).toHaveLength(2);
        expect(hideShow.props().statements[0].debug?.effectType).toBe(OptRuleExpressionEffectType.Show);

        const price = ruleStatementsLists.filterWhere(grp => grp.props().title === "Price");
        expect(price).toHaveLength(1);
        expect(price.props().statements).toHaveLength(1);
        expect(price.props().statements[0].debug?.effectType).toBe(OptRuleExpressionEffectType.Price);

    });

});