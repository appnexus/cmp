[![Build Status](https://travis-ci.org/appnexus/cmp.svg?branch=master)](https://travis-ci.org/appnexus/cmp)

> **WARNING**: This demo CMP code is absolutely not production-ready without additional time investment, and is not compatible with TCF 2.0.

# AppNexus CMP
This sample CMP was designed to facilitate support for the initial adoption of TCF 1.0, and is not being actively maintained, and will not be updated to support TCF 2.0. We strongly recommend that you either adopt a commercial CMP or another open source alternative, then register the CMP with the IAB Europe to be recognized as sending valid signals in the advertising ecosystem. AppNexus requires the use of a CMP registered with the IAB Europe if using the TCF for GDPR/ePrivacy. 

### Installation

```sh
git clone https://github.com/appnexus/cmp.git
cd cmp
yarn install
```

## Build for Production

```sh
yarn build
```

This produces a production build of the `cmp` script and the docs application:
+ `./build/cmp.bundle.js` - CMP script to include on your site
+ `./build/docs/` - Application hosting the documentation

## Documentation

Instructions to install the CMP as well as API docs and examples are available in the `docs`
application included with the repo.

```sh
yarn start
```

The documentation can be viewed at:
`http://localhost:5000/docs/`

## Development
You can start a development server that will monitor changes to all CMP and docs files with:
```sh
yarn dev
```

Development server can be accessed at:
`http://localhost:8080/`

## Testing

```sh
yarn test
```
