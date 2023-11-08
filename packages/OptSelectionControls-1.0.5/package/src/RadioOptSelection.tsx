import * as React from "react";
import {OptSelectionTitle} from "./OptSelectionTitle";
import { IOptSelectionPropsBase } from "./OptSelection";
import { OptExecutionMenu, OptChoice, OptSelection, OptExecutionMenuItem } from "OptConfigurator";

export class RadioOptSelection extends React.Component<IOptSelectionPropsBase> {
    constructor(props: IOptSelectionPropsBase) {
        super(props);
    }

    handleChange(e: { selected: OptChoice }) {
        //this.setState({selectedValue: e.selected});
        this.props.optionChanged({menu: this.props.menu, choice: e.selected});

    }

    render() {
        const opt = this.props.menu.optSelection;
        const self = this;
        return <div>
            <OptSelectionTitle menu={this.props.menu} onWatchOption={this.props.onWatchOption} />
            <OptRadioValueList onChange={(e) => this.handleChange(e)}
                               menu={this.props.menu}
                               selected={this.props.selectedChoice}/>
        </div>;
    }
}

interface IOptValueComponentProps {
    group: string;
    item: OptExecutionMenuItem;
    isSelected: boolean;
    onChange: { (ev: { selected: OptChoice }): void };
}

class OptValueComponent extends React.Component<IOptValueComponentProps> {
    constructor(props: IOptValueComponentProps) {
        super(props);

    }

    render() {
        var self = this;
        const {item} = self.props;

        const qty = item.choice.getQtyUnit();
        const qtyText = item.choice.quantity + " " + (qty ? qty.id : "nul");

        if (item.isVisible == false) {
            return <span>{item.choice.optVal.id} hidden</span>;
        }
        
        return <div>
            <label>Qty: {qtyText}
                <input type='radio' 
                    disabled={!item.isAvailable}
                    onChange={() => self.props.onChange({selected: item.choice})}
                    checked={self.props.isSelected} />
                {item.choice.optVal.name} ${item.price}
            </label>
            <span>{item.availabilityUnknown && "Associated rule not always available" }</span>
            
            <br/>
            

        </div>;
    }
}

interface IOptRadioValueListProps {
    menu: OptExecutionMenu;
    onChange: { (ev: { selected: OptChoice }): void };
    selected: OptChoice | null;
}

class OptRadioValueList extends React.Component<IOptRadioValueListProps> {
    constructor(props: IOptRadioValueListProps) {
        super(props);
    }

    handleChange(ev: { selected: OptChoice }) {
        console.log("Selected");
        console.log(ev);
        this.props.onChange(ev);
    }

    render() {
        var self = this;

        return <ul>
            {
                this.props.menu.items.map((item: OptExecutionMenuItem, idx) => {
                    return <li key={idx}>
                        <OptValueComponent isSelected={!!self.props.selected && item.choice.isSameChoice(self.props.selected)}
                                           group={self.props.menu.optSelection.id}
                                           item={item}
                                           onChange={(ev) => this.handleChange(ev)}/>
                    </li>;
                })
            }
        </ul>


    }

}