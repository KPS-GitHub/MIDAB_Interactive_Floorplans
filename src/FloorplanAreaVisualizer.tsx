import * as React from 'react';
import { OptFloorplanArea } from 'OptConfigurator';


const SVGOverlay = ({width, height, children}: {width: number, height: number, children: any}) => {
    

    return (
        <svg width="100%" height="100%" viewBox={"0 0 " + width + " " + height} style={{position: "absolute", top:0, left:0, zIndex:2}}>
            {children}
        </svg>
    );

}
const AreaElement = ({area, useFillImage}: { area: OptFloorplanArea, useFillImage?: any }) => {
    
    const pathString = area.getSVGPath();
    
    return (
        <path d={pathString} fill={useFillImage && "url(#" + area.optSelection.id + ")" || "blue"} opacity={0.3} data-area={area.id} data-optsel={area.optSelection ? area.optSelection.id : "-"}>
            
        </path>
    );
};

const ReverseAreaTransform = ({isReverse, width, children}: { isReverse?: boolean, width: number, children: any }) => {
    const transformString = isReverse ? "translate(" + width + ",0) scale(-1,1)" : "";
    return (
        <g transform={transformString}>
            {children}
        </g>
    );
};

export const FloorplanAreaVisualizer = ({areas, width, height, useFillImage = undefined, isReverse = undefined, children = undefined}
    : {areas: OptFloorplanArea[], width: number, height: number, useFillImage?: boolean, isReverse?: boolean, children?: any}) => {
    
    return (
        <SVGOverlay height={height} width={width}>
            {children}
            <ReverseAreaTransform isReverse={isReverse} width={width}>
                {areas.map(area => <AreaElement key={area.id} area={area} useFillImage={useFillImage} />) }
            </ReverseAreaTransform>

        </SVGOverlay>
    );
    
}

