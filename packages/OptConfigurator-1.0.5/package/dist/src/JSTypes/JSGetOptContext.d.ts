import { JSOptContext } from "./JSOptContext";
import { JSLotPrice } from "./JSLotPrice";
import { JSModelPrice } from "./JSModelPrice";
import { JSOptFloorplanContext } from "./JSOptFloorplanContext";
import { OptJSDebugContext } from "./OptJSDebugContext";
import { JSOptChoiceContext } from "./JSOptChoiceContext";
export declare type JSGetOptContext = {
    OptContext: JSOptContext;
    DefaultContext: JSOptChoiceContext;
    OptChoiceContext: JSOptChoiceContext;
    IncludedChoices: JSOptChoiceContext;
    Model: JSModelPrice;
    Lot: JSLotPrice;
    RuleCode: string;
    FloorplanContext: JSOptFloorplanContext;
    DebugInfo: OptJSDebugContext;
};
