import * as React from "react";
import { OptFloorplanContext, OptContext, OptChoiceContext, IAsyncImageClient } from "OptConfigurator";
import {OptFloorplanVisualizer} from "OptSelectionControls";
import {FloorplanAreaVisualizer} from "./FloorplanAreaVisualizer";

interface IFloorplanLayoutProps {
    floorplanClient: IAsyncImageClient;
    floorplanContext: OptFloorplanContext;
    optContext: OptContext;
    optChoiceContext: OptChoiceContext;
    transparencyColor?: number[];
    currentFloorName: string;
}

export class FloorplanLayout extends React.Component<IFloorplanLayoutProps> {
    getVisibleComponentsPerFloor() {
        const {floorplanContext, optContext, optChoiceContext} = this.props;

        return floorplanContext.getVisibleComponentsPerFloor(optContext, optChoiceContext);

    }

    render() {
        const visibleComponentsPerFloor = this.getVisibleComponentsPerFloor();

        const { transparencyColor, currentFloorName } = this.props;
        
        return (<React.Fragment>
                {visibleComponentsPerFloor.map((val, idx) => {
                    if (val.floor.name !== currentFloorName) return "";
                    if (val.images.length === 0) return "";
                    const {width, height} = val.images[0];
                    const allImages = this.props.floorplanContext.getFloorByID(val.floor.id)?.images.filter(image => image.condition !== "");
                    return (<div key={val.floor.name} className="visualizerImage">
                        <OptFloorplanVisualizer  transparencyColor={transparencyColor} imageClient={this.props.floorplanClient} images={val.images}>
                            <FloorplanAreaVisualizer areas={val.areas} width={width} height={height}/>

                            
                            
                        </OptFloorplanVisualizer>
                    </div>);
                })}

            </React.Fragment>
        );
    }
}