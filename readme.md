# Web Configurator Sample

Application for selecting options and showing floor plans for a model in a community. 

## Environment

* [Node.js](https://nodejs.org/en/) (latest LTS, x64)

## Building

First time, to restore packages, run ```npm install```.

To build, run ```npm run build```.

## Updating OptConfigurator library

If OptConfigurator has changed, first build it, then pack and reinstall here.

The OptConfigurator and OptSelectionControls libraries needs to be included when redistributing this Web Configurator Sample.

```npm install OptConfigurator --force```

(force is needed because package version is 1.0.0 for now)

## Query parameters

* endpoint: OData endpoint, for example "https://localhost/WebApi".
* token: Authentication token for an API user that can access Communities, Models and GetOptContext2. Can be generate in KovaSiteName/Utility/AuthenticationTokens.aspx

## Setup

The Web Configurator Sample has to be hosted from a web site since API calls originating from local file system can't access Kova APIs due to Cross-Origin Resource Sharing (CORS) policy. If you are hosting it separately from the Kova WebConfigurator site, please update the following CORS paramater in Kova.

In Kova the Configuration Parameter Web.Configurator.CORS.Accept.Addresses needs to include the domain addresses of sites hosting the Web Configurator Sample, for example, “https://customer.com,https://www.customertest.com”.

## Usage

Go to WebConfigurator/sitespecific/webconfiguratorsample/webconfigurator.html to launch the configurator. Set the query parameters or hard code them in WebConfigurator.tsx.

Select Community and Model and click Load. Once the the configurator state is loaded, available options affecting floors are shown on the left. Floor plans and floor is shown in the middle. Print to button to send the selected options, customer information and print the brochure is on the right.
# MIDAB_Interactive_Floorplans
