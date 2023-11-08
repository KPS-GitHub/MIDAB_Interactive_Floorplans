import * as React from "react";
import * as OptConfigurator from "OptConfigurator";
import { ODataDropdown } from "./ODataDropdown";
import { JSBO } from "./JSTypes";
import { ODataClient } from "./ODataClient";
import {SyntheticEvent} from "react";

interface IConfiguratorLoaderProps {
    className: string;
    endpoint: string;
    token: string;
    setSession: { (session: OptConfigurator.OptConfiguratorSession): void };
    setCommunity: { (communityRID: number): void };
    setModel: { (modelRID: number): void };
    session?: OptConfigurator.OptConfiguratorSession;
    odataFunction: string;
    // Values from query
    modelRID: number | null;
    communityRID: number | null;
    doInitialize: boolean;
}

interface IConfiguratorLoaderState {
    community: JSBO | null;
    model: JSBO | null;
    session?: OptConfigurator.OptConfiguratorSession | null;
    /** Debugger is currently loading state from server. */
    initializing: boolean;
}


export class ConfiguratorLoader extends React.Component<IConfiguratorLoaderProps, IConfiguratorLoaderState> {

    public componentDidMount() {
        this.getInitialBOs();        
    }

    private async getInitialBOs() {
        //TODO get available communities and models
        const client = new ODataClient(this.props.endpoint, this.props.token);
        if (this.props.communityRID && !this.state.community) {
            const community = await client.getBO("Communities", this.props.communityRID);
            this.communitySelected(community);
        }
        if (this.props.modelRID && !this.state.model) {
            const model = await client.getBO("Models", this.props.modelRID);
            this.modelSelected(model);
        }
    }

    public componentDidUpdate() {

        // Create session automatically when all fields are filled and not already loading
        const {initializing} = this.state;
        
        const allowInitialize = this.modelRID > 0 && this.bunitRID > 0;
        const doInitialize = allowInitialize && !initializing && this.props.session == null && this.props.doInitialize;
        if (doInitialize) {
            this.createSession();
        }

    }

    private communitySelected(community: JSBO | null) {
        this.setState({community: community});
        if (community)
            this.props.setCommunity(community.ObjectRID);
    }

    private modelSelected(model: JSBO | null) {
        this.setState({model: model});
        if (model)
            this.props.setModel(model.ObjectRID);
    }

    /** Load OptContext and rules from server and setup debugger session */
    private readonly createSession = () => {
        if (this.state.initializing)
            return;
        this.setState({initializing: true});
        const worksheet = new OptConfigurator.WorksheetInfo(this.bunitRID, this.modelRID, 0);
        const client = new OptConfigurator.Client(this.props.endpoint, this.props.token, worksheet);
        client.odataFunction = this.props.odataFunction;
        client.loadWorksheet().then(state => {
            this.props.setSession(new OptConfigurator.OptConfiguratorSession(state));
            this.setState({initializing: false});
        });
    }

    private get searchParams() { return new URLSearchParams(window.location.search); }

    private get bunitRID() {
        if (this.state.community)
            return this.state.community.BUnitRID ?? 0;
        return parseInt(this.searchParams.get("bunitRID") ?? "0");
    }

    private get modelRID() {
        if (this.state.model)
            return this.state.model.ObjectRID;
        return this.props.modelRID ?? 0;        
    }
    
    constructor(props: IConfiguratorLoaderProps) {
        super(props);
        this.state = {community: null, model: null, initializing: false};
        this.modelSelected = this.modelSelected.bind(this);
        this.communitySelected = this.communitySelected.bind(this);


    }

    render() {
        const {community, model, initializing} = this.state;
        const client = new ODataClient(this.props.endpoint, this.props.token);
        
        const allowInitialize = !!community && !!model && this.bunitRID > 0;

        return (
            <div className={this.props.className}>
                <h3>Web Configurator</h3>
                    
                <div style={{display: 'inline'}}>
                    <span>
                    Community: <ODataDropdown value={community!} onSelected={this.communitySelected} {...this.props}
                                              boType="Communities" query={"$orderby=Name"} client={client} />
                        
                    </span>
                    
                    {community &&
                    <span>
                    Model: <ODataDropdown value={model!} onSelected={this.modelSelected} {...this.props}
                                          boType="Models" query={"$orderby=Name"} client={client}/>
                    </span>
                    }

                    <button onClick={this.createSession} disabled={!allowInitialize || initializing}>Load</button>

                    {initializing && <span>Loading...</span>}

                </div>
            </div>
        );
    }
}