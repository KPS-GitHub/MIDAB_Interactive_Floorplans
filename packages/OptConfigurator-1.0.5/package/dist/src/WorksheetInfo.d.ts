export declare class WorksheetInfo {
    readonly bunitRID: number;
    readonly modelRID: number;
    readonly lotRID: number;
    /** Sales worksheet (SlsWsh) RID. Optional. */
    readonly slsWshRID?: number | undefined;
    constructor(bunitRID: number, modelRID: number, lotRID: number, 
    /** Sales worksheet (SlsWsh) RID. Optional. */
    slsWshRID?: number | undefined);
}
