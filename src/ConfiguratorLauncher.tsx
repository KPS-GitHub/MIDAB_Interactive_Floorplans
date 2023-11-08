import * as React from "react";
import {Configurator} from "./Configurator";
import { ConfiguratorLoader } from "./ConfiguratorLoader";
import { ODataClient } from "./ODataClient";
import {OptConfiguratorSession, ApplyChoice, JSOptChoiceContext} from "OptConfigurator";

interface IConfiguratorLauncherProps {
    endpoint: string;
    /** API token */
    token: string;
    odataFunction: string;
    // Values from query
    modelRID: number | null;
    communityRID: number | null;
    doInitialize: boolean;
}

interface IConfiguratorLauncherState {
    community: null;
    model: null;
    session?: OptConfiguratorSession;
    communityRID: number | null;
    modelRID: number | null;
}

export class ConfiguratorLauncher extends React.Component<IConfiguratorLauncherProps, IConfiguratorLauncherState> {
    
    constructor(props: IConfiguratorLauncherProps) {
        super(props);
        this.state = {community: null, model: null, communityRID: null, modelRID: null};
        
        this.applyAction = this.applyAction.bind(this);
        this.setSession = this.setSession.bind(this);
        this.printBrochure = this.printBrochure.bind(this);
        this.setCommunity = this.setCommunity.bind(this);
        this.setModel = this.setModel.bind(this);

    }
    setSession(session: OptConfiguratorSession) {
        this.setState({session:session});
    }

    applyAction(action: ApplyChoice) {
        const {session} = this.state;
        if (!session)
            throw new Error("Session is null");
        session.applyAction(action);
        this.setState({session: session});
    }

    setCommunity(communityRid: number) {
        this.setState({communityRID:communityRid});
    }

    setModel(modelRID: number) {
        this.setState({modelRID:modelRID});
    }

    printBrochure(firstName: string, lastName: string, email: string, phone: string) {
        const client = new ODataClient(this.props.endpoint, this.props.token);
        client.saveLead(firstName, lastName, email, phone, this.state.communityRID, this.state.modelRID, this.state.session?.currentState.choices).then(
            leadResult => {
                if (leadResult && leadResult.Url){
                    //show/dowload brochure
                    var link = document.createElement('a');
                    link.href = leadResult.Url;
                    link.download = "brochure.pdf";
                    link.click();
                }
        });

    }
    
    render() {
        const { session } = this.state;
        const { endpoint, token, odataFunction, modelRID, communityRID, doInitialize } = this.props;

        const optState = session && session.currentState;
        
        let actionIndex = -1;
        if (session) actionIndex = session.actionIndex;
       
        return (
            <div className={"conf-layout"}>
                
                <ConfiguratorLoader 
                    className="conf-header" 
                    odataFunction={odataFunction} 
                    session={session} 
                    endpoint={endpoint} 
                    token={token} 
                    setSession={this.setSession}
                    modelRID={modelRID}
                    communityRID={communityRID}
                    doInitialize={doInitialize}
                    setCommunity={this.setCommunity}
                    setModel={this.setModel}
                />
                {!session && <span className="loadtextinfo">Please load the configurator state</span>}
                {session && <Configurator applyAction={this.applyAction} printBrochure={this.printBrochure} optState={session.currentState} />}
            </div>
        );

    }
}
