import * as React from "react";
import { OptExecutionContext, OptExecutionMenu, OptChoice } from "OptConfigurator";
import * as OptConfigurator from "OptConfigurator";
import { AttributeOptSelection} from "./AttributeOptSelection";
import { RadioOptSelection} from "./RadioOptSelection";
import { BinaryOptSelection} from "./BinaryOptSelection";
import { QuantityOptSelection } from "./QuantityOptSelection";

export type OptSelectionChangedParams = { 
    menu: OptExecutionMenu,
    /** Selected choice. Can be null if clearing selection. */ 
    choice: OptChoice | null
}

export type OptSelectionChanged = { 
    (ev: OptSelectionChangedParams): void;
}

export interface IOptSelectionPropsBase {
    menu: OptExecutionMenu;
    optionChanged: OptSelectionChanged;
    onWatchOption?: {(optSelection: OptConfigurator.OptSelection): void };
    selectedChoice: OptChoice | null;
}

interface IOptSelectionProps extends IOptSelectionPropsBase {
    executionContext: OptExecutionContext;
}

export class OptSelection extends React.Component<IOptSelectionProps> {
    constructor(props: IOptSelectionProps) {
        super(props);
    }
    
    render() {
        const opt = this.props.menu.optSelection;
        
        switch (opt.optSelectionType) {
            case "Radio":
                return <RadioOptSelection {...this.props} />;
            case "Attribute":
                return <AttributeOptSelection {...this.props} />; 
            case "Binary":
                return <BinaryOptSelection {...this.props} />;
            case "Quantity":
                return <QuantityOptSelection {...this.props} />;
        }

    }
}


