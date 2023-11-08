export declare type JSOptChoiceContext = {
    OptChoices: JSOptChoice[];
};
declare type JSOptChoice = {
    OptSelectionID: string;
    OptValueID: string;
    Style: string;
    Color: string;
    Quantity: number;
    Price?: number | null;
    SelectionMode: SelectionMode;
};
export {};
