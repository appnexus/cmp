[![Build Status](https://travis-ci.org/appnexus/cmp.svg?branch=master)](https://travis-ci.org/appnexus/cmp)

# Smaato CMP
CMP is a tool for publishers to engage users of their properties and gather & store end user consent.

This is a fork of https://github.com/smaato/cmp

## Output
The App generates a cookie with a Base64 code that will be sent to the SDK via window.location to:

```
consent://{CODE64}
```

## Given Code via query parameter
The App can read a query parameter to init the application with a given Code64:

```
{URL}?code64={CODE64}
```

## Override stored given consent and/or initialize with custom values
[src/index.jsx]
```sh
const store = new Store({
	vendorConsentData: {
		selectedVendorIds: new Set([4, 5]),
		selectedPurposeIds: new Set([1, 4])
	},
	publisherConsentData, vendorList, customPurposeList
});
```

### Installation

```sh
git clone https://github.com/smaato/cmp.git
cd cmp
yarn install
```

## Build for Production

```sh
npm run build
```
or
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
npm start
```

The documentation can be viewed at:
`http://localhost:5000/docs/`

## Development
You can start a development server that will monitor changes to all CMP and docs files with:
```sh
npm run dev
```

Development server can be accessed at:
`http://localhost:8080/`

## Testing

```sh
npm test
```
