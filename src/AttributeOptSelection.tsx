import * as React from "react";
import { IOptSelectionPropsBase } from "./OptSelection";
import { OptExecutionMenu, OptChoice, OptExecutionMenuItem } from "OptConfigurator";

export class AttributeOptSelection extends React.Component<IOptSelectionPropsBase> {
    constructor(props: IOptSelectionPropsBase) {
        super(props);
    }

    handleChange(e: OptChoice) {
        //this.setState({selectedValue: e.selected});
        this.props.optionChanged({menu: this.props.menu, choice: e});

    }

    render() {
        const opt = this.props.menu.optSelection;
        return <div>
            {opt.name} <br />
            <OptAttributeValueList onChange={(e) => this.handleChange(e)}
                                   menu={this.props.menu}
                                   selected={this.props.selectedChoice}/>


        </div>;
    }
}

interface IOptAttributeValueComponentProps {
    group: string;
    isSelected: boolean;
    index: number;
    item: OptExecutionMenuItem;
    price?: number | null;
}

class OptAttributeValueComponent extends React.Component<IOptAttributeValueComponentProps> {
    constructor(props: IOptAttributeValueComponentProps) {
        super(props);
    }

    render() {
        const {item} = this.props;
        if (!item.isAvailable) {
            return "";
        }
        if (!item.isVisible) {
            return "";
        }
        const choice = item.choice;

        let nameString = choice.optVal.name;
        if (choice.style != null) {
            nameString += " / " + choice.style;
        }
        if (choice.color != null) {
            nameString += " / " + choice.color;
        }
        
        nameString += " $" + (item.price != null ? item.price : "MISSING PRICE");

        return <option value={this.props.index}>{nameString}</option>;

    }
}

interface IOptAttributeValueListProps {
    menu: OptExecutionMenu;
    onChange: { (choice: OptChoice): void };
    selected: OptChoice | null;
}

class OptAttributeValueList extends React.Component<IOptAttributeValueListProps> {
    constructor(props: IOptAttributeValueListProps) {
        super(props);
    }

    handleChange(ev: React.ChangeEvent<HTMLSelectElement>) {
        console.log("Selected");
        console.log(ev);
        const index = parseInt(ev.target.value);
        const item = this.props.menu.items[index];
        if (!item)
            throw new Error("Value not found: " + ev.target.value);
        this.props.onChange(item.choice);
        /*for (let val of this.props.values) {
            if (val.id == ev.target.value) {
                this.props.onChange(val);
                return;
            }
        }*/

    }

    render() {
        var self = this;

        let htmlClass = "";
        if (!this.props.menu.isAvailable) {
            htmlClass = "OptSelectionDisabled";

        }
        let selectedIndex = 0;
        for (let i = 0; i < this.props.menu.items.length; ++i) {
            const val = this.props.menu.items[i];
            if (self.props.selected && val.choice.isSameChoice(self.props.selected)) {
                selectedIndex = i;
                break;
            }
        }

        return <div className={htmlClass}><select
            disabled={!this.props.menu.isAvailable}
            value={selectedIndex}
            onChange={(ev) => this.handleChange(ev)}>
            {
                this.props.menu.items.map((item, idx) => {
                    return item.isAvailable && item.isVisible && item.price !== null && 
                                <OptAttributeValueComponent isSelected={!!self.props.selected && item.choice.isSameChoice(self.props.selected)}
                                                       index={idx}
                                                       price={item.price}
                                                       key={idx}
                                                       group={self.props.menu.optSelection.id}
                                                       item={item}
                    />;

                })
            }
        </select>

        </div>


    }

}