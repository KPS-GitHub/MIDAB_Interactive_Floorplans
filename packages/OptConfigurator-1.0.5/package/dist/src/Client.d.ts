import { IFetcher, IAsyncImageClient } from "./AsyncImageClient";
import { ConfigurationState } from "./ConfigurationState";
import { WorksheetInfo } from "./WorksheetInfo";
import { JSGetOptContext } from "./JSTypes/JSGetOptContext";
/**
 * API client for downloading worksheet.
 */
export declare class Client {
    readonly odataEndpoint: string;
    readonly token: string;
    readonly worksheetInfo: WorksheetInfo;
    odataFunction: string;
    constructor(odataEndpoint: string, token: string, worksheetInfo: WorksheetInfo, odataFunction?: string);
    private getRequestContent;
    private static getChoiceContextFromJSON;
    private getHeaders;
    private doFetch;
    get fetcher(): IFetcher;
    loadFromJSON(json: JSGetOptContext): ConfigurationState;
    static loadFromJSON(json: JSGetOptContext, floorplanClient?: IAsyncImageClient | null): ConfigurationState;
    /**
     * Downloads worksheet.
     */
    fetchWorksheet(): Promise<JSGetOptContext>;
    /**
     * Downloads and parses worksheet into configuration state.
     */
    loadWorksheet(): Promise<ConfigurationState>;
}
