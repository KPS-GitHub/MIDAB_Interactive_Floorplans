import * as React from "react";
import { OptSelection, OptExecutionMenu } from "OptConfigurator";

interface IRuleDebugComponentProps {
    menu: OptExecutionMenu;
    onWatchOption?: {(optSelection: OptSelection): void };
}

interface IRuleDebugComponentState {
    isVisible: boolean;
}

/** Debug button "?" for a single OptionSelection */
export class RuleDebugComponent extends React.Component<IRuleDebugComponentProps, IRuleDebugComponentState> {
    
    toggleClick(e: React.SyntheticEvent, isVisible: boolean) {
        e.preventDefault();
        if (this.props.onWatchOption)
            this.props.onWatchOption(this.props.menu.optSelection);        
    }

    constructor(props: IRuleDebugComponentProps) {
        super(props);
        this.state = {isVisible:false};
    }

    render() {        
        const isVisible = this.state.isVisible;
        const listContent = "";
        
        return (
            <>
                &nbsp;
                <a onClick={e => this.toggleClick(e, !isVisible)} href="">
                    ?
                </a>
            </>
        );
    }
}
