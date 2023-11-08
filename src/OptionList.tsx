import * as React from "react";
import { OptSelection, OptSelectionChanged } from "./OptSelection"
import { OptExecutionContext, OptExecutionMenu, OptChoice, OptChoiceContext, OptPricingContext } from "OptConfigurator";

interface IOptionListProps {
    choices: OptChoiceContext;
    executionContext: OptExecutionContext;
    options: OptExecutionMenu[];
    optionChanged: OptSelectionChanged;
    pricingContext: OptPricingContext;
}

export class OptionList extends React.Component<IOptionListProps> {
   
    render() {
        //TODO group by location
        return <ul>{this.props.options.map((opt, index) =>
            <li key={opt.optSelection.id}><OptSelection 
                optionChanged={this.props.optionChanged}                 
                                           menu={opt}
                                           selectedChoice={this.props.choices.getChoiceForOptSelection(opt.optSelection)}
                                           executionContext={this.props.executionContext}
                                           

            >



            </OptSelection></li>)}</ul>;
    }
}
