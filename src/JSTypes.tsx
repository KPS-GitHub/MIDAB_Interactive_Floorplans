export interface JSBO {
    BUnitRID?: number;
    Name: string;
    ObjectRID: number;
}

export type SaveLead = {
    SelectedOptions: {};
    Lead: Lead;
    CommunityRID: number;
    ModelRID: number;
}

export type Lead = {
    LeadHistEvtRID: number;
    NameFirst: string;
    NameLast: string;
    StreetAddress: string;
    ZipCode: string;
    City: string;
    StateCode: string;
    PhoneHome: string;
    EmailHome: string;
    PrefContactType: string;
}

export type SaveLeadResult = {
    Lead: Lead;
    Url: string;
}

export type BOTypePlural = "BUnits" | "Communities" | "Models" | "Lots";