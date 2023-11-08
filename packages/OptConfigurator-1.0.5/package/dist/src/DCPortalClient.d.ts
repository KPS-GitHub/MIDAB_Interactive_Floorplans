import { ConfigurationState } from "./ConfigurationState";
export declare class DCPortalClient {
    token: string;
    endpoint: string;
    odataEndpoint: string;
    constructor(endpoint: string, token: string);
    _getHeaders(): {
        Authorization: string;
        "Content-Type": string;
    };
    _doFetch(url: string, p?: any): Promise<Response>;
    loadWorksheet(): Promise<ConfigurationState | null>;
    private doLoadWorksheet;
}
