export declare type JSOptFloorplanContext = {
    Floors: JSOptFloor[];
    RuleCode: string;
};
declare type JSOptFloor = {
    Areas: JSArea[];
    Images: JSImage[];
    Name: string;
    ID: string;
};
export declare type JSArea = {
    Points: {
        X: number;
        Y: number;
    }[];
    Name: string;
    ID: string;
    OptSelectionID: string;
    Condition: string;
};
declare type JSImage = {
    ID: string;
    Condition: string;
    ImageURL: string;
    LocX: number;
    LocY: number;
    X: number;
    Y: number;
    Width: number;
    Height: number;
    NoFlip: boolean;
};
export {};
