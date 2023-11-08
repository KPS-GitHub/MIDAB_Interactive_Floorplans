import * as React from "react";
import { IOptSelectionPropsBase } from "./OptSelection";
export declare class BinaryOptSelection extends React.Component<IOptSelectionPropsBase> {
    private get choice();
    handleChange(e: {
        selected: boolean;
    }): void;
    render(): JSX.Element;
}
