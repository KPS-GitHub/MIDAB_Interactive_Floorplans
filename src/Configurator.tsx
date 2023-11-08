import * as React from 'react';
import {OptLayout} from "./OptLayout";
import { ConfigurationState, ApplyChoice, OptExecutionMenu, OptChoice } from 'OptConfigurator';

interface IConfiguratorProps {
    applyAction: { (action: ApplyChoice): void };
    printBrochure: { (firstName: string, lastName: string, email: string, phone: string): void };
    optState: ConfigurationState;
}

export class Configurator extends React.Component<IConfiguratorProps> {
    constructor(props: IConfiguratorProps) {
        super(props);
    }
    
    handleOptionChange(ev: { menu: OptExecutionMenu, choice: OptChoice | null }) {
        const os = ev.menu.optSelection;
        this.props.applyAction(new ApplyChoice(os, ev.choice));
    }
   
    render() {
       const { optState } = this.props;
        window.optState = optState;        
        return ( 
        <OptLayout optionChanged={(e: { menu: OptExecutionMenu, choice: OptChoice | null }) => this.handleOptionChange(e)} 
                   printBrochure={this.props.printBrochure}
                      options={optState.options} 
                      choices={optState.choices} 
                   model={optState.model}
                   executionContext={optState.executionContext}
                   pricingContext={optState.pricingContext}
                   floorplanContext={optState.floorplanContext}
                   floorplanClient={optState.stateProps.floorplanClient}
        
        />);
        ;
    }
  
}















