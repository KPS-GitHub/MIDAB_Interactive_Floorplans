import * as React from 'react';
import { IAsyncImageClient, OptFloorplanImage } from 'OptConfigurator';
interface IOptFloorplanVisualizerProps {
    crop?: number[];
    imageClient: IAsyncImageClient;
    images: OptFloorplanImage[];
    isReverse?: boolean;
    transparencyColor?: number[];
}
export declare class OptFloorplanVisualizer extends React.Component<IOptFloorplanVisualizerProps> {
    constructor(props: IOptFloorplanVisualizerProps);
    render(): JSX.Element | undefined;
}
interface IOptFloorplanVisualizerElementProps {
    crop?: number[];
    images: OptFloorplanImage[];
    isReverse?: boolean;
    transparencyColor?: number[];
}
export declare class OptFloorplanVisualizerElement extends React.Component<IOptFloorplanVisualizerElementProps> {
    constructor(props: IOptFloorplanVisualizerElementProps);
    canvasRef: React.RefObject<HTMLCanvasElement>;
    svgRef: React.RefObject<any>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updateCanvas(): void;
    render(): JSX.Element;
}
export declare class FloorplanImageSVGOverlayElement extends React.Component<{
    img: OptFloorplanImage;
}> {
    render(): JSX.Element | null;
}
declare global {
    interface Window {
        onlyImages: string[];
    }
}
export {};
