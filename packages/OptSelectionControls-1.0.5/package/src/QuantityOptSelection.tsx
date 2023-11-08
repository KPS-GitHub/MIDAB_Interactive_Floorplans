import * as React from "react";
import { RuleDebugComponent} from "./RuleDebugComponent";
import { IOptSelectionPropsBase } from "./OptSelection";

export class QuantityOptSelection extends React.Component<IOptSelectionPropsBase> {

    private handleChange(e: { value: number }) {
        const choice = this.defaultChoice;
        choice.quantity = e.value;
        this.props.optionChanged({menu: this.props.menu, choice: choice});
    }

    /** Quantity selections have only one value/choice/menu item. */
    private get defaultChoice() {
        return this.props.menu.choices[0];
    }

    render() {
        const menu = this.props.menu;
        const opt = menu.optSelection;
        const self = this;
        const qty = this.defaultChoice.getQtyUnit();
        const qtyText = this.defaultChoice.quantity + " " + (qty ? qty.id : "nul");
        const item = menu.items[0];

        return <div>
            <label>
                <input type='number' disabled={!menu.isAvailable}
                       onChange={(ev) => {
                           self.handleChange({value: ev.target.valueAsNumber })
                       }}
                       value={this.defaultChoice.quantity ?? undefined}/>
                {opt.name} {opt.id} Qty: {qtyText} {(item.price != null ? "$" + item.price : "MISSING PRICE")}
            </label>
            <RuleDebugComponent menu={menu} onWatchOption={this.props.onWatchOption}/>
        </div>;

    }
}