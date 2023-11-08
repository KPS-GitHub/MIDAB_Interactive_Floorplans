import * as React from "react";
import { IOptSelectionPropsBase } from "./OptSelection";
import { OptChoice } from "OptConfigurator";
export declare class AttributeOptSelection extends React.Component<IOptSelectionPropsBase> {
    constructor(props: IOptSelectionPropsBase);
    handleChange(e: OptChoice): void;
    render(): JSX.Element;
}
