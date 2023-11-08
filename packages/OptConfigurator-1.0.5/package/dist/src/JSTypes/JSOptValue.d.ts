import { JSQtyUnit } from "./JSQtyUnit";
import { JSStyleAndColor } from "./JSStyleAndColor";
export declare type JSOptValue = {
    Name: string;
    ID: string;
    AvailabilityUnknown: boolean;
    AvailabilityDepends: boolean;
    IsNotSelectedValue: boolean;
    IsWebEnabled: boolean;
    QtyUnit: JSQtyUnit;
    StylesAndColors: JSStyleAndColor[];
    ImageURL: string;
};
