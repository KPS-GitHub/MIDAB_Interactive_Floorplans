import * as React from "react";
import { IOptSelectionPropsBase } from "./OptSelection";
export declare class QuantityOptSelection extends React.Component<IOptSelectionPropsBase> {
    private handleChange;
    /** Quantity selections have only one value/choice/menu item. */
    private get defaultChoice();
    render(): JSX.Element;
}
