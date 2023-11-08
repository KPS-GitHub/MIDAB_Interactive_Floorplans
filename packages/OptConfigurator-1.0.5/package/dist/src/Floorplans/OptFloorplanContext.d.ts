import { IRuleFunctionDefinition } from "../RuleExecution/BaseOptRuleExecutor";
import { OptContext, OptSelection } from "../Options/OptContext";
import { OptChoiceContext } from "../Choices/OptChoiceContext";
import { IAsyncImageData, AsyncImageClient, IAsyncImageClient } from "../AsyncImageClient";
import { OptFloorplanImage } from "./OptFloorplanImage";
import { JSOptFloorplanContext, JSArea } from "../JSTypes/JSOptFloorplanContext";
export declare type IOptSerializedImages = {
    images: {
        [key: string]: string;
    };
};
export interface IOptFloorplanImageClient {
    fetchImage(floorplanImage: OptFloorplanImage): Promise<OptFloorplanImage>;
    getBlobUrl(floorplanImage: OptFloorplanImage): Promise<string>;
}
export declare class NullOptFloorplanImageClient implements IAsyncImageClient {
    constructor();
    fetchImage<T extends IAsyncImageData>(floorplanImage: T): Promise<T>;
    getBlobUrl<T extends IAsyncImageData>(floorplanImage: T): Promise<never>;
}
export declare class SerializedFloorplanImageClient implements IAsyncImageClient {
    images: {
        [key: string]: string;
    };
    constructor(images: {
        images: {
            [key: string]: string;
        };
    });
    getBlobUrl<T extends IAsyncImageData>(floorplanImage: T): Promise<string>;
    fetchImage<T extends IAsyncImageData>(floorplanImage: T): Promise<T>;
}
export declare class OptFloorplanImageClient extends AsyncImageClient {
}
export declare class OptFloor {
    name: string;
    id: string;
    images: OptFloorplanImage[];
    areas: OptFloorplanArea[];
    constructor(name: string, id: string, images: OptFloorplanImage[], areas: OptFloorplanArea[]);
    optsAffectingFloorplan(): import("./OptFloorplanImage").OptFloorplanAffectingOption[];
    optSelectionsAffectingFloorplan(): OptSelection[];
}
export declare class OptFloorplanContext {
    images: OptFloorplanImage[];
    imagesByID: {
        [key: string]: OptFloorplanImage;
    };
    areas: OptFloorplanArea[];
    areasByID: {
        [key: string]: OptFloorplanArea;
    };
    floors: OptFloor[];
    floorplanRuleFunction: IRuleFunctionDefinition;
    floorplanImageAssociations: {
        [key: string]: {
            OptSelection: string;
            OptValue: string;
        }[];
    };
    constructor(jsData: JSOptFloorplanContext, optContext: OptContext);
    getFloorByID(id: string): OptFloor | null;
    getSerializedImages(): IOptSerializedImages;
    getVisibleFloorplanComponents(optContext: OptContext, optChoiceContext: OptChoiceContext): {
        images: OptFloorplanImage[];
        areas: OptFloorplanArea[];
    };
    getVisibleComponentsPerFloor(optContext: OptContext, optChoiceContext: OptChoiceContext): {
        floor: OptFloor;
        images: OptFloorplanImage[];
        areas: OptFloorplanArea[];
    }[];
}
export declare class OptFloorplanArea {
    readonly id: string;
    readonly points: [number, number][];
    readonly condition: string;
    readonly optSelection: OptSelection;
    constructor(id: string, points: [number, number][], condition: string, optSelection: OptSelection);
    static fromJSArea(optContext: OptContext, jsArea: JSArea): OptFloorplanArea;
    getSVGPath(): string;
}
