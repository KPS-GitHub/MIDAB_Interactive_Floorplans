import * as ReactDOM from "react-dom";
import * as React from "react";
import { ConfiguratorLauncher} from "./ConfiguratorLauncher";

function getRID(searchParams: URLSearchParams, name: string) {
    const val = searchParams.get(name);
    return val ? parseInt(val) : null;
}

const searchParams = new URLSearchParams(window.location.search);
const communityRID = getRID(searchParams, "communityRID");
const modelRID = getRID(searchParams, "modelRID");
const doInitialize = !!searchParams.get("initialize");
const token = searchParams.get("token") ?? "";
const odataEndpoint = searchParams.get("endpoint") ?? "https://localhost/Kova1WebApi/odatab";
const odataFunction = searchParams.get("odataFunction") || "SBEntities.GetOptContext2";

const app = <ConfiguratorLauncher 
    token={token} 
    endpoint={odataEndpoint} 
    odataFunction={odataFunction}
    modelRID={modelRID}
    communityRID={communityRID}
    doInitialize={doInitialize}
/>;

window.app = app;

ReactDOM.render(app, document.getElementById('root'));
