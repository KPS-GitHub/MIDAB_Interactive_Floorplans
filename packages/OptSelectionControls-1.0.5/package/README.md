# Shared OptSelection controls for BrochureBuilder and DebugApp

## Environment

* [Node.js](https://nodejs.org/en/) (latest LTS, x64) with NPM

## Building

First time, to restore packages, run ```npm install```.

To build, run ```npm run build```.

To build NPM package, run ```npm run redist```. This generates OptSelectionControls-1.0.0.tgz used in other apps.

## Tests

To run tests, run ```npm run test```.

Tests are implemented using Jest + Enzyme.