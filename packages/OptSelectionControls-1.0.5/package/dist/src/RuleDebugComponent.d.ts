import * as React from "react";
import { OptSelection, OptExecutionMenu } from "OptConfigurator";
interface IRuleDebugComponentProps {
    menu: OptExecutionMenu;
    onWatchOption?: {
        (optSelection: OptSelection): void;
    };
}
interface IRuleDebugComponentState {
    isVisible: boolean;
}
/** Debug button "?" for a single OptionSelection */
export declare class RuleDebugComponent extends React.Component<IRuleDebugComponentProps, IRuleDebugComponentState> {
    toggleClick(e: React.SyntheticEvent, isVisible: boolean): void;
    constructor(props: IRuleDebugComponentProps);
    render(): JSX.Element;
}
export {};
