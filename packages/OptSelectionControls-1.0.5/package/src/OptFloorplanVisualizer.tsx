
import * as React from 'react'
import { IAsyncImageClient, OptFloorplanImage, IAsyncImageData } from 'OptConfigurator';

interface IOptFloorplanVisualizerProps {
    crop?: number[];
    imageClient: IAsyncImageClient;
    images: OptFloorplanImage[];
    isReverse?: boolean;
    transparencyColor?: number[];
}

export class OptFloorplanVisualizer extends React.Component<IOptFloorplanVisualizerProps> {
    constructor(props: IOptFloorplanVisualizerProps) {
        super(props);
        
    }
    render() {
        const { images, imageClient, crop, transparencyColor, isReverse } = this.props;
        const unloadedImages = images.filter(img => !img.imageContent && !img.broken);
        
        if (unloadedImages.length > 0) {
            const image = unloadedImages[0];
            imageClient.fetchImage(image).then(img => {
                console.log("Loaded " + img.id);
                this.forceUpdate();
            }).catch(err => {
                console.log(err);
                this.forceUpdate();
            });
               // .finally(() => this.forceUpdate());

            
        }
        if (unloadedImages.length > 0) {
            return (
            <div style={{position:"relative"}}>
                <canvas width={images[0].width} height={images[0].height} style={{width: "100%", height: "100%"}} />
                <div style={{width: "100%", height: "100%", position:"absolute", top:0, left:0, zIndex: 2}}>Loading... ({unloadedImages.length} left</div>;
            </div>
            );
            
            return 
        }
        
        return (
                
                <OptFloorplanVisualizerElement transparencyColor={transparencyColor} images={images} crop={crop} isReverse={isReverse} >
                    {this.props.children}
                </OptFloorplanVisualizerElement>
                
    );
    }
}

interface IOptFloorplanVisualizerElementProps {
    crop?: number[];
    images: OptFloorplanImage[];
    isReverse?: boolean;
    transparencyColor?: number[];
}

export class OptFloorplanVisualizerElement extends React.Component<IOptFloorplanVisualizerElementProps> {
    constructor(props: IOptFloorplanVisualizerElementProps) {
        super(props);
        this.canvasRef = React.createRef();
        this.svgRef = React.createRef();
        
    }

    canvasRef: React.RefObject<HTMLCanvasElement>;
    svgRef: React.RefObject<any>;

    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    
    updateCanvas() {
        const canvas = this.canvasRef.current; 

        if (canvas === null)
            throw new Error("Canvas is null");
        
        const { images, crop, transparencyColor, isReverse } = this.props;

        const firstImage = images[0];
        if (!firstImage || !firstImage.imageElement) {
            return; // Nothing to be done here, the base image is missing...
        }        
        const backgroundHeight = firstImage.imageElement.height;
        const backgroundWidth = firstImage.imageElement.width;
        const ctxt = canvas.getContext('2d');

        if (ctxt === null)
            throw new Error("Canvas context is null");

        for (const img of images) {
            if (!img.imageElement) continue;

            if (window.onlyImages != null && !window.onlyImages.includes(img.id)) {
                continue;
            } 
            let y = img.y;
            let x = img.x;
            
            if (crop) {
                x -= crop[0];
                y -= crop[1];
            }

            let width = img.width;
            let height = img.height;

            if (isReverse) {
                x = backgroundWidth - x - width;
                if (!img.noFlip) {
                    ctxt.save();
                    ctxt.scale(-1, 1);
                    width *= -1;
                    x *= -1;
                }
            }
                
            ctxt.drawImage(img.imageElement, x,  y, width, height);

            if (isReverse && !img.noFlip) {
                ctxt.restore();
            }

            if(transparencyColor){
                let imgData = ctxt.getImageData(0, 0, img.width, img.height);
                let pix = imgData.data;
                for(var i = 0, n = pix.length; i < n; i += 4){
                    var r = pix[i],
                    g = pix[i+1],
                    b = pix[i+2];
                    if(r == transparencyColor[0] && g == transparencyColor[1] && b == transparencyColor[2]){ 
                        pix[i+3] = 0x0;
                    }
                }                
                ctxt.putImageData(imgData, 0, 0);         
            }            
        }
    }
    
    render() {
        const { images, crop } = this.props;
        const firstImage = images[0];
        let backgroundHeight = 100;
        let width = 100;
        let height = 100;

        if (crop) {
            width = crop[2]-crop[0];
            height = crop[3]-crop[1];
        } else {
            if (firstImage != null) {
                width = firstImage.width;
                height = firstImage.height;
            }

        }
        return (
            <div style={{position:"relative"}}>
            <canvas ref={this.canvasRef} width={width} height={height} style={{width: "100%", height: "100%"}} />
                {this.props.children}
            </div>
        );
        
        
        
    }
}
export class FloorplanImageSVGOverlayElement extends React.Component<{img: OptFloorplanImage}> {

    render() {
         
       
        const { img } = this.props;
        if (img.condition === "") return null; 
       
       
        return (
            <rect x={img.x} y={img.y} width={img.width} height={img.height} stroke={"red"} fill={"none"}>
                <title>{img.condition}</title>
            </rect>
        )
    }
}

declare global {
    interface Window {
        onlyImages: string[];
    }
  }