import * as React from "react";

interface IFloorplanCropOverlayProps {
    onCropChange: any;
    width: number;
    height: number;
    crop: number[];
}

type DragInfo = { isDragging: boolean, startCoords?: number[], endCoords?: number[] };

export class FloorplanCropOverlay extends React.Component<IFloorplanCropOverlayProps> {
    constructor(props: IFloorplanCropOverlayProps) {
        super(props);
        this.cropRect = React.createRef();
        this.svgElement = React.createRef();
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.dragInfo = {isDragging: false};

    }

    cropRect: React.RefObject<SVGRectElement>;
    svgElement: React.RefObject<SVGSVGElement>;
    dragInfo: DragInfo;

    onMouseUp() {
        const {onCropChange} = this.props;
        const rect = this.cropRect.current;

        if (rect === null)
            throw new Error("Rect was null");

        console.log('UP');
        // TODO process drag info
        const drag = this.dragInfo;

        this.dragInfo = {isDragging: false};
        rect.setAttribute("visibility", "hidden");
        this.unregisterListeners();
        onCropChange(this.getRectCoords(drag));
    }

    onMouseMove(ev: MouseEvent) {
        const coords = this.getSvgCoords(ev.clientX, ev.clientY);
        this.dragInfo.endCoords = coords;
        const rectCoords = this.getRectCoords(this.dragInfo);
        const width = rectCoords[2] - rectCoords[0];
        const height = rectCoords[3] - rectCoords[1];

        const rect = this.cropRect.current;
        if (rect === null)
            throw new Error("Rect was null");

        rect.setAttribute("visibility", "");


        rect.setAttribute("x", rectCoords[0].toString());
        rect.setAttribute("y", rectCoords[1].toString());
        rect.setAttribute("width", width.toString());
        rect.setAttribute("height", height.toString());

        console.log(ev);

    }

    getRectCoords(dragInfo: DragInfo): number[] {
        var x0 = dragInfo.startCoords![0];
        var x1 = dragInfo.endCoords![0];

        var y0 = dragInfo.startCoords![1];
        var y1 = dragInfo.endCoords![1];

        return [Math.min(x0, x1), Math.min(y0, y1), Math.max(x0, x1), Math.max(y0, y1)];

    }

    getSvgCoords(clientX: number, clientY: number) {
        const svgElem = this.svgElement.current;

        if (svgElem === null)
            throw new Error("SVGElement was null");

        const x = clientX;
        const y = clientY;

        var pt = svgElem.createSVGPoint();
        pt.x = x;
        pt.y = y;
        pt = pt.matrixTransform(svgElem.getScreenCTM()!.inverse());

        /*const svgClientRect = svgElem.getBoundingClientRect();
        const svgX = x - svgClientRect.x;
        const svgY = y - svgClientRect.y;*/

        return [pt.x, pt.y];

    }

    registerListeners() {
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
    }

    onMouseDown(ev: React.MouseEvent<SVGSVGElement>) {
        console.log(ev);
        this.dragInfo = {isDragging: true, startCoords: this.getSvgCoords(ev.clientX, ev.clientY)};
        this.registerListeners();
    }

    componentDidMount() {


    }

    unregisterListeners() {
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
    }

    componentDidUnmount() {
        this.unregisterListeners();


    }

    render() {
        // width and height of the coordinate system i.e. the viewBox of the SVG element.


        const {width, height, crop} = this.props;

        let cropCoords = [0, 0, 0, 0];
        if (crop != null) {
            cropCoords = crop;
        }
        const vis = crop != null ? "" : "hidden";

        return (<svg ref={this.svgElement} width={"100%"} height={"100%"} viewBox={"0 0 " + width + " " + height}
                     style={{position: "absolute", top: 0, left: 0, zIndex: 2}}
                     onMouseDown={this.onMouseDown}
            >
                <rect ref={this.cropRect} visibility={vis} x={cropCoords[0]} y={cropCoords[1]}
                      width={cropCoords[2] - cropCoords[0]} height={cropCoords[3] - cropCoords[1]}
                      style={{strokeDasharray: "10 5", stroke: "black", fill: "black", fillOpacity: 0.1}}/>
            </svg>
        );

    }

}