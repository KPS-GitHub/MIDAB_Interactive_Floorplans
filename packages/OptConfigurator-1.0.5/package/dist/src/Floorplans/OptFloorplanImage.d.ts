import { IAsyncImageData } from "../AsyncImageClient";
import { OptSelection, OptValue } from "../Options/OptContext";
export declare class OptFloorplanImage implements IAsyncImageData {
    id: string;
    condition: string;
    imageURL: string;
    broken: boolean;
    noFlip: boolean;
    imageContent: string | null;
    locX: number;
    locY: number;
    x: number;
    y: number;
    width: number;
    height: number;
    points: number[];
    color: string;
    affectingOptions: OptFloorplanAffectingOption[];
    imageElement: HTMLImageElement | null;
    get hasImage(): boolean;
    constructor(id: string, condition: string, imageURL: string, locX: number, locY: number, x: number, y: number, width: number, height: number, noFlip: boolean | false);
    isInsideArea(ax0: number, ay0: number, ax1: number, ay1: number): boolean;
    optSelectionsAffecting(): Set<OptSelection>;
    getDebugString(): string;
    getCanvas(): HTMLCanvasElement;
    getDataURL(): string;
    logToConsole(): void;
}
export declare type OptFloorplanAffectingOption = {
    optSelection: OptSelection;
    optValue?: OptValue;
};
