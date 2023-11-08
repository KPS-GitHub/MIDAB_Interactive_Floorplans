import { OptChoiceContext } from "OptConfigurator";
import { JSBO, BOTypePlural, Lead, SaveLead, SaveLeadResult } from "./JSTypes";

export class ODataClient {

    public constructor(
        private readonly endpoint: string, 
        private readonly token: string) {}

    private async doFetch(url: string) {
        return await fetch(url, {
            headers: {
                "Authorization": "KovaAuth " + this.token,
                "Content-Type": "application/json"
            },
            method: "GET",
            credentials: "include" /* Needed because of the API cookie */
        });
    }

    public async getBO(boType: BOTypePlural, rid: number) {
        const url = this.endpoint + "/" + boType + "/" + rid;
        const response = await this.doFetch(url);
        const objects: JSBO = await response.json();
        return objects;        
    }

    public async getBOs(boType: BOTypePlural, query: string) {
        const url = this.endpoint + "/" + boType + (query ? ("?" + query) : "");
        const response = await this.doFetch(url);
        const objects: JSBO[] = (await response.json()).value;
        return objects;
    }

    public async saveLead(firstName: string, lastName: string, email: string, phone: string, communityRid: number | null, modelRid: number | null, choices: OptChoiceContext | undefined) {
        
        if (!communityRid || !modelRid || !choices) return;

        const url = this.endpoint.replace("WebApi/odatab", "WebConfigurator") + "/api/v4/Leads/Save";

        var selectedOptions: { [optselid: string]: string; } = {};
        for (const optselid in choices.choices) {
            const choice = choices.choices[optselid];
            var optvalStyleColor = choice.optVal.id;
            if (choice.style !== null || choice.color !== null) {
                optvalStyleColor += "|" + choice.style + "|" + choice.color;
            }
            selectedOptions[optselid] = optvalStyleColor;
        }

        const lead = {
            NameFirst: firstName,
            NameLast: lastName,
            EmailHome: email,
            PhoneHome: phone,
            PrefContactType: "Email"
        } as Lead;
        const leadRequest = {
            Lead: lead,
            CommunityRID: communityRid,
            ModelRID: modelRid,
            SelectedOptions: selectedOptions
        } as SaveLead;

        const data = JSON.stringify(leadRequest);

        const response = await fetch(url, {
            headers: {
                "Authorization": "KovaAuth " + this.token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: data,
            credentials: "include" /* Needed because of the API cookie */
        });
        const object: SaveLeadResult = await response.json();
        return object;
    }

}