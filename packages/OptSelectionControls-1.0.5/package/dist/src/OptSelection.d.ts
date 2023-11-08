import * as React from "react";
import { OptExecutionContext, OptExecutionMenu, OptChoice } from "OptConfigurator";
import * as OptConfigurator from "OptConfigurator";
export declare type OptSelectionChangedParams = {
    menu: OptExecutionMenu;
    /** Selected choice. Can be null if clearing selection. */
    choice: OptChoice | null;
};
export declare type OptSelectionChanged = {
    (ev: OptSelectionChangedParams): void;
};
export interface IOptSelectionPropsBase {
    menu: OptExecutionMenu;
    optionChanged: OptSelectionChanged;
    onWatchOption?: {
        (optSelection: OptConfigurator.OptSelection): void;
    };
    selectedChoice: OptChoice | null;
}
interface IOptSelectionProps extends IOptSelectionPropsBase {
    executionContext: OptExecutionContext;
}
export declare class OptSelection extends React.Component<IOptSelectionProps> {
    constructor(props: IOptSelectionProps);
    render(): JSX.Element;
}
export {};
