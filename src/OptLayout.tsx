import * as React from 'react'
import {Button} from '@blueprintjs/core'
import { OptExecutionContext, OptContext, OptExecutionMenu, IAsyncImageClient, OptFloorplanContext, OptPricingContext, OptChoiceContext, OptChoice, OptSelection } from 'OptConfigurator';
import {LocationList} from "./LocationList";
import {OptionList} from "./OptionList";
import {Pricing} from "./Pricing";
import {FloorplanLayout} from "./FloorplanLayout";
import { OptSelectionChanged } from './OptSelection';
import {PrintModal} from "./PrintModal"

interface IOptLayoutProps {
    choices: OptChoiceContext;
    executionContext: OptExecutionContext;
    floorplanClient: IAsyncImageClient;
    floorplanContext: OptFloorplanContext;
    model: { price: number; adjustments: number; name: string; }
    options: OptContext;
    optionChanged: OptSelectionChanged;
    pricingContext: OptPricingContext;
    printBrochure: { (firstName: string, lastName: string, email: string, phone: string): void};
}

interface IOptLayoutState {
    currentLocation: string;
    showPrintModal: boolean;
}


export class OptLayout extends React.Component<IOptLayoutProps, IOptLayoutState> {
  
    constructor(props: IOptLayoutProps) {
        super(props);
        var currentLocation = this.props.options.optLocations[0].name;
        
        this.state = {currentLocation: currentLocation, showPrintModal: false};

    }
   
    locationChanged(ev: string) {
        this.setState({currentLocation: ev});
    }

    toggleShowPrintModal() {
        this.setState(prevState => ({
            showPrintModal: !prevState.showPrintModal
        }));
    }

    printBrochure(firstName: string, lastName: string, email: string, phone: string) {
        this.props.printBrochure(firstName, lastName, email, phone);
    }
 
    render() {
       
        const {floorplanContext, executionContext} = this.props;

        //get options by floor
        var optionsByLocation: { [index: string]: OptExecutionMenu[] } = {};
        for (const floor of floorplanContext.floors) {
            const locName = floor.name;
            optionsByLocation[locName] = [];

            for (const opt of floor.optsAffectingFloorplan()){
                const menu = executionContext.getMenu(opt.optSelection);
                if (menu && menu.isAvailable && menu.isVisible && !optionsByLocation[locName].includes(menu)) //show only visible and enabled options
                    optionsByLocation[locName].push(menu);
            }
                        
        }
     
        
        return <React.Fragment>
            <div className='kova-header'>
                <h1 className='kova-logo'>KOVA</h1>
            </div>
            <div className='conf-leftpanel'>
                <LocationList currentLocation={this.state.currentLocation} 
                              locations={floorplanContext.floors}
                              locationChanged={(ev) => this.locationChanged(ev)}>
                {
                    this.state.currentLocation && <OptionList optionChanged={this.props.optionChanged}
                                                             options={optionsByLocation[this.state.currentLocation] || []}
                                                             choices={this.props.choices}
                                                             executionContext={executionContext}
                                                             pricingContext={this.props.pricingContext}
                                                             
                    />
                }
                </LocationList>
                
            </div>
            <div className="conf-contentpanel">
                <div className="OptSelectionPanelHeader">
                    <h4 className='OptSelectionPanelHeaderOptions'>
                        <LocationList currentLocation={this.state.currentLocation} 
                              locations={floorplanContext.floors}
                              locationChanged={(ev) => this.locationChanged(ev)} 
                              />
                    </h4>
                    {/* <hr/> */}
                </div>
                {
                this.state.currentLocation && <FloorplanLayout optContext={this.props.options}
                                 currentFloorName={this.state.currentLocation}
                                 optChoiceContext={this.props.choices}
                                 floorplanContext={this.props.floorplanContext}
                                 floorplanClient={this.props.floorplanClient}
                />
                }
   
                               
                <div className="OptPicturePanel" />

            </div>
            <div className="conf-rightpanel">
                <div className="printbutton">
                    <Button intent="primary" text="Print" onClick={() => this.toggleShowPrintModal()} />
                </div>

                {this.state.showPrintModal && <PrintModal toggleShowPrintModal={() => this.toggleShowPrintModal()} 
                                                            printBrochure={(firstName, lastName, email, phone) => this.printBrochure(firstName, lastName, email, phone)} />}
  
                <div className="OptPricingPanel">
                    <Pricing pricingContext={this.props.pricingContext}  optExecutionContext={this.props.executionContext} choices={this.props.choices} />
                </div>
                               
                {/* <div className="OptPicturePanel" /> */}
               
            </div>

       <div className="conf-bottombar">
                </div>
            
        </React.Fragment>;
    }
}