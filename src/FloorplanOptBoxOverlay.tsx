import * as React from "react";
import { FloorplanImageSVGOverlayElement } from "OptSelectionControls";
import { OptFloorplanImage } from "OptConfigurator";

interface IFloorplanOptBoxOverlayProps {
    height: number;
    images: OptFloorplanImage[];
    width: number;
    zIndex: number;
}

export class FloorplanOptBoxOverlay extends React.Component<IFloorplanOptBoxOverlayProps> {
    render() {
        const {width, height, images, zIndex} = this.props;

        return (
            <svg width={"100%"} height={"100%"} viewBox={"0 0 " + width + " " + height}
                 style={{position: "absolute", top: 0, left: 0, zIndex: zIndex}}>
                {images.map((img, idx) => {
                    return (
                        <FloorplanImageSVGOverlayElement img={img}/>
                    );
                })}
            </svg>
        );
    }
}