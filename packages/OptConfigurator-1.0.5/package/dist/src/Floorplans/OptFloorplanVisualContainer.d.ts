import { IOptFloorplanImageClient } from "./OptFloorplanContext";
import { OptFloorplanImage } from "./OptFloorplanImage";
export interface IOptFloorplanVisualizerContent {
    images: OptFloorplanImage[];
    transparencyColor?: [number, number, number];
    crop: [number, number, number, number];
}
export declare class OptFloorplanVisualContainer {
    static getCanvasFromLoadedImages(content: IOptFloorplanVisualizerContent): HTMLCanvasElement;
    static getDataURLFromLoadedImages(content: IOptFloorplanVisualizerContent): string;
    static getBlob(content: IOptFloorplanVisualizerContent, imageClient: IOptFloorplanImageClient): Promise<Blob>;
}
