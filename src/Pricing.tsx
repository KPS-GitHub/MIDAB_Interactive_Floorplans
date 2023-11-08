import * as React from "react"
import { OptPricingContext, OptChoiceContext, OptExecutionContext } from "OptConfigurator";

interface IPricingProps {
    choices: OptChoiceContext;
    optExecutionContext: OptExecutionContext;
    pricingContext: OptPricingContext;
}

export class Pricing extends React.Component<IPricingProps> {
    
    render() {
        var price = this.props.pricingContext.calculatePrice(this.props.choices, this.props.optExecutionContext);
        
        return (
            <ul>
                <li>Base Price: {price.base}</li>
           <li>Buyer Selections: {price.selections}</li>
                <li>Lot Premium: {price.lotPremium}</li>
                <li>Total: {price.base+price.selections+price.lotPremium}</li>
            </ul>
        );
    }
}