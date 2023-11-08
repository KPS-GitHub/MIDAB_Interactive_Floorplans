import * as React from "react";
import { OptionList} from "./OptionList";
import { OptFloor, OptLocation } from "OptConfigurator";

interface ILocationListProps {
    currentLocation: string;
    locationChanged: { (locName: string): void };
    locations: OptFloor[];
    children?: any;
}

export class LocationList extends React.Component<ILocationListProps> {
    constructor(props: ILocationListProps) {
        super(props);
        //this.state = { currentLocation: this.props.locations[0].Name}
    }
    handleLocationClick(locname: string) {
        this.props.locationChanged(locname);
    }
    render() {
        const { locations, children } = this.props;

        /*        return locations.map((loc, idx) => {
                    return <div key={loc.Name}><h3>{loc.Name}</h3><OptionList options={optionsByLocation[loc.Name]} /></div>
                });*/

      /*  return <div><select onChange={(ev) => this.props.locationChanged(ev.target.value)}>
            {
                locations.map((loc, idx) => {
                    return <option key={loc.Name} value={loc.Name}>{loc.Name}</option>
                })

            }

      
      
            </select>
         
        </div>;
*/
      return <div>
          <ul>
              {
                  locations.map((loc, idx) => {
                      let htmlClass = "OptLocationItem";
                      if (loc.name === this.props.currentLocation) {
                          htmlClass = "OptLocationItem OptLocationItemCurrent";
                      }

                      return <li key={loc.name}><a href='#' className={htmlClass} onClick={(ev) => this.handleLocationClick(loc.name) }>{loc.name}</a>
                                {loc.name === this.props.currentLocation && children}
                             </li>
                          
                  })
              }
          </ul>
      </div>
        }
  

}
