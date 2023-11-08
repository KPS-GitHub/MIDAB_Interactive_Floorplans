import * as React from "react";
import {RuleDebugComponent} from "./RuleDebugComponent";
import { OptExecutionMenu } from "OptConfigurator";

interface IOptSelectionTitleProps {
    menu: OptExecutionMenu;
    onWatchOption: any;
}

export const OptSelectionTitle = (props: IOptSelectionTitleProps) => {
    const opt = props.menu.optSelection;

    return <React.Fragment>
        {opt.name} {opt.id} <RuleDebugComponent menu={props.menu} onWatchOption={props.onWatchOption}/>
        <br />
        <span>{ opt.availabilityUnknown && "Only available if " + opt.availabilityDepends}</span> <br/>
        <span>{ props.menu.availabilityUnknown && "Associated rule not always available" }</span>
    </React.Fragment>
};
