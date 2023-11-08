import * as React from "react";
import { IOptSelectionPropsBase } from "./OptSelection";

export class BinaryOptSelection extends React.Component<IOptSelectionPropsBase> {
    
    private get choice() {
        const choice = this.props.menu.firstChoice;
        if (choice === undefined) {
            throw new Error("Binary option selection " + this.props.menu.optSelection.id + " has no choice!");
        }
        return choice;
    }
    
    handleChange(e: { selected: boolean }) {
        //this.setState({selectedValue: e.selected});

        this.props.optionChanged({menu: this.props.menu, choice: e.selected ? this.choice : null});

    }

    render() {
        const opt = this.props.menu.optSelection;
        const self = this;

        return <div>
            <label>
                <input type='checkbox' disabled={!this.props.menu.isAvailable || this.choice.hasBaseValue}
                       onChange={(ev) => {
                           self.handleChange({selected: ev.target.checked})
                       }}
                       checked={self.props.selectedChoice != null}/>
                {opt.name} ${this.props.menu.items[0].price}
            </label>
        </div>;


    }

}