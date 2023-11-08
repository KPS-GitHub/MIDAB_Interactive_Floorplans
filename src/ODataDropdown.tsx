import * as React from "react";
import { JSBO, BOTypePlural } from "./JSTypes";
import {Button, MenuItem, Icon} from "@blueprintjs/core";
import {Select, ItemRenderer} from "@blueprintjs/select";
import { ODataClient } from "./ODataClient";

interface IODataDropdownProps {
    client: ODataClient;
    boType: BOTypePlural;
    endpoint: string;
    query: string;
    onSelected: { (o: JSBO | null): void };
    token: string;
    value: JSBO;
}

interface IODataDropdownState {
    objects: JSBO[] | null;
}

const JSBOSelect = Select.ofType<JSBO>();

export class ODataDropdown extends React.Component<IODataDropdownProps, IODataDropdownState> {
    constructor(props: IODataDropdownProps) {
        super(props);
        this.state = {objects: null}
    }

    idFromObject(o: JSBO) {
        if (o == null) return null;
        return o.ObjectRID;
    }

    nameFromObject(o: JSBO) {
        if (o == null) return "(null)";
        return o.Name + " #" + o.ObjectRID;
    }

    componentWillReceiveProps(nextprops: IODataDropdownProps) {
        const noChanges = nextprops.boType === this.props.boType && nextprops.query === this.props.query && nextprops.endpoint === this.props.endpoint;
        if (!noChanges) this.setState({objects: null});
    }

    componentDidMount() {

    }

    render() {

        const {boType, query} = this.props;


        if (!this.state.objects) {
            this.props.client.getBOs(boType, query).then(bos => {
                this.setState({objects: bos});
            });
        }

        const {objects} = this.state;
        if (!objects) return <span>Loading...</span>;
        const self = this;
        let selectedIndex = -1;
        
        for (let i = 0; i < objects.length; ++i) {
            const val = objects[i];
            if (this.idFromObject(val) === this.idFromObject(this.props.value)) {
                selectedIndex = i;
            }
        }

        const renderItem: ItemRenderer<JSBO> = (jsbo, { handleClick, modifiers }) => {
            return (
                <MenuItem
                    active={modifiers.active}
                    key={this.idFromObject(jsbo) ?? undefined}
                    onClick={handleClick}
                    text={this.nameFromObject(jsbo)}
                />
            );
        };  

        return (

                <JSBOSelect
                    items={objects}
                    itemRenderer={renderItem}
                    itemPredicate={(query, item) => item.ObjectRID.toString().startsWith(query) || item.Name.toLowerCase().includes(query.toLowerCase())}
                    popoverProps={{minimal: true}}
                    activeItem={this.props.value}
                    onItemSelect={obj => this.props.onSelected(obj)}
                >
                    <Button text={this.props.value ? this.nameFromObject(this.props.value) : "Select"} rightIcon="double-caret-vertical" />
                </JSBOSelect>
        );
    }
}