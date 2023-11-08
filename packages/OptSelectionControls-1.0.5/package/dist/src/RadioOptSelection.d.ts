import * as React from "react";
import { IOptSelectionPropsBase } from "./OptSelection";
import { OptChoice } from "OptConfigurator";
export declare class RadioOptSelection extends React.Component<IOptSelectionPropsBase> {
    constructor(props: IOptSelectionPropsBase);
    handleChange(e: {
        selected: OptChoice;
    }): void;
    render(): JSX.Element;
}
