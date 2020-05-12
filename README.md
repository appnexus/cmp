# system1-cmp

System1-CMP is a container around the [appnexus-cmp](https://github.com/appnexus/cmp) that provides additional features for loading the CMP and for providing a complete CMP solution. We would like to customize the CMP but still be able to upgrade the CMP SDK as the upstream [appnexus-cmp](https://github.com/appnexus/cmp) improves over time.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [Installation](#installation)
- [CMP Loader API](#cmp-loader-api)
  - [init](#init)
    - [init: config](#init-config)
    - [init: callback](#init-callback)
  - [Arguments](#arguments)
  - [Possible Commands](#possible-commands)
  - [Examples](#examples)
- [Events](#events)
  - [Examples](#examples-1)
- [Build](#build)
- [Deploy](#deploy)
- [Upload](#upload)
- [AppNexus CMP](#appnexus-cmp)
  - [Installation](#installation-1)
  - [Build for Production](#build-for-production)
  - [Documentation](#documentation)
  - [Development](#development)
  - [Testing](#testing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Check the version you want to use, new versions are opt-in only.

```
<html>
<body>
  <script type="text/javascript" src="//s.flocdn.com/cmp/1.1.2/loader.js"></script>
  <script type="text/javascript">
  const config = {
    scriptSrc: 'https://s.flocdn.com/cmp/1.1.2/cmp.js',
    gdprApplies: true,
    // logging: true,
    // pubVendorListLocation: '/.well-known/pubvendors.json',
    // customPurposeListLocation: './purposes.json',
    // globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
    // globalConsentLocation: './portal.html',
    // storeConsentGlobally: false,
    // storePublisherData: false,
    // localization: {},
    // forceLocale: null,
    // allowedVendorIds: ,
    // shouldAutoConsent: false,
	  // shouldAutoConsentWithFooter: false,
	  // shouldAutoUpgradeConsent: true
  }

  function onConsentChanged(result) {
    if (document.cookie.indexOf("gdpr_opt_in=1") < 0) {
      console.log("all:consent:failed", result);
      // window.location.reload();
    } else {
      console.log("all:consent:succeeded", result);
    }
  }

  cmp('init', config, (result) => {
    if (result.gdprApplies) {
      if (result.errorMsg) {
        cmp('showConsentTool');
        cmp('addEventListener', 'onConsentChanged', onConsentChanged);
      } else {
        // consent achieved
        if (document.cookie.indexOf("gdpr_opt_in=1") >= 0) {
          console.log("cmp:init: all consent achieved", result);
        } else {
          console.log("cmp:init: only some consent achieved", result);
        }
      }
    } else {
      console.log("cmp:init: consent not required", result);
    }
  });
  </script>
</body>
</html>
```

## API and Configuration

### init

You must call `init` explicitly to start the CMP. Otherwise, the CMP Loader will only queue commands and not initialize the CMP SDK.

- `config` is REQUIRED
- `callback` is OPTIONAL

```
cmp('init', config, callback);
```

#### init: config

`config` is a required argument of `init`. It configures/customizes the CMP.

Example Configuration:

```
const config = {
  scriptSrc: '//s.flocdn.com/cmp/0.0.1/cmp.js',
  gdprApplies: true,
  pubVendorListLocation: '//s.flocdn.com/cmp/pubvendors.json', // OPTIONAL, whitelists vendors
  logging: false,
  customPurposeListLocation: './purposes.json',
  cookieDomain: '.example.com',
  globalVendorListLocation: '//vendorlist.consensu.org/vendorlist.json',
  globalConsentLocation: './portal.html',
  storeConsentGlobally: false,
  storePublisherData: false,
  localization: {},
  forceLocale: null,
  allowedVendorIds: null,
  shouldAutoConsent: false,
	shouldAutoConsentWithFooter: false,
	shouldAutoUpgradeConsent: true,
  theme: { //
    isBannerModal: true // OPTIONAL, to enable Banner as a modal or footer component
    shouldExpandPurposes: true, // true by default, expands purposes on initial Baner
    primaryColor: '#09f',
    textLinkColor: '#09f',
    boxShadow: 'none',
    secondaryColor: '#869cc0',
    featuresColor: '#d0d3d7'
  }

}
cmp('init', config);
```

- `scriptSrc`: String: Required: location of CMP SDK.
- `gdprApplies`: Booelan: Enable / disable load of the CMP SDK
- `pubVendorListLocation`: OPTIONAL: location of pub vendor list
- `globalVendorListLocation`: OPTIONAL: global vendorList is managed by the IAB.
- `shouldAutoConsent`: OPTIONAL: false by default, agrees to all consents on behalf of user
- `shouldAutoConsentWithFooter`: OPTIONAL: false by default, agrees to all consents on behalf of user and displays a notice
- `shouldAutoUpgradeConsent`: OPTIONAL: true by default, if user previously consented and vendor list changed, automatically upgrade consent and display a notice
- `theme`: OPTIONAL object to provide style overrides,
  - `isBannerModal`: OPTIONAL: boolean, false by deafult, true to use Modal on initial CMP banner
- `cookieDomain`: String: OPTIONAL: domain cookie is written to (used for subdomaining a cookie), (ex: `.example.com` writes a cookie readable by \*.example.com)

#### init: callback

Use the callback to determine if you should show the consent tool or not.

- `errorMsg`: STRING // detail on the result CMP initializing
- `warningMsg`: STRING // detail on the result CMP initializing and automatically handling edge-cases
- `gdprApplies`: BOOLEAN // true if in EU, false if consent not required
- `hasConsented`: BOOLEAN // true if use has consented to all permissions
- `vendorConsents`: OBJECT
- `vendorList`: OBJECT

Callback Example

```
<script type="text/javascript" src="https://s.flocdn.com/cmp/loader.js"></script>

cmp('init', {
    gdprApplies: true,
    scriptSrc: '//s.flocdn.com/cmp/0.0.1/cmp.js'
  }, (result) => {

  // Consent is required and there was an error
    if (result.gdprApplies && result.errorMsg) {
    cmp('showConsentTool');
    }

  // Consent is required and a user has not consented to all permissions
  if (result.gdprApplies && !result.hasConsented) {
  cmp('showConsentTool');
  }
});
```

### Arguments

```
cmp(command, [parameter], [callback])
```

- `command` (String): Name of the command to execute
- `[parameter]` (\*): Parameter to be passed to the command function
- `[callback]` (Function): Function to be executed with the result of the command

### Possible Commands

- `init` REQUIRED, can only be called once
- `addEventListener`
- `removeEventListener`
- `showConsentTool`

- `getVendorConsents`
- `getPublisherConsents`
- `getConsentData`
- `getVendorList`

### Examples

```
cmp('getVendorConsents', null, (response) => console.log(response));
cmp('getPublisherConsents', null, (response) => console.log(response));
cmp('getConsentData', null, (response) => console.log(response));
cmp('showConsentTool');
```

## Events

- `onConsentChanged` CUSTOM: triggers whenever consent has changed
- `isLoaded`
- `cmpReady`
- `onSubmit`

### Examples

```
cmp('addEventListener', 'onConsentChanged', (event) => console.log(event));
cmp('addEventListener', 'onSubmit', (event) => console.log(event));
```

## Build

Build the original project and the System1 project:

```
yarn build          # builds both projects
yarn build:s1       # builds just the System1 loader and "complete" CMP SDK.
yarn build:original # builds just the original CMP provided by appnexus
```

## Deploy

Deploy will build and upload the project files to a System1 S3 bucket for public use

```
yarn deploy         # builds and uploads both projects
yarn build:s1       # builds and uploads just the versioned S1 project
yarn build:original # builds and uploads just the original project
```

## Upload

The system1-cmp project lives in `dist/{version}` and is immutable, you can't upload it more than once.
This _should_ be a safe operation to make as you'll just see an error in the terminal telling you the files already exist.
You will need to bump the `package.json` version in order to publish any changes to S3.

```
yarn upload:s1
```

The original project gets deployed to S3, but it's for reference only, it will invalidate automatically, and no one should have a production dependency on it.
This should be a safe operation as it does not affect production files.

```
yarn upload:original
```

[![Build Status](https://travis-ci.org/appnexus/cmp.svg?branch=master)](https://travis-ci.org/appnexus/cmp)

# AppNexus CMP

CMP is a tool for publishers to engage users of their properties and gather & store end user consent.

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

- `./build/cmp.bundle.js` - CMP script to include on your site
- `./build/docs/` - Application hosting the documentation

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
yarn dev:s1
```

Development server can be accessed at:
`http://localhost:8080/reference.html`

## Testing

```sh
yarn test
```

## Deployment

- [x] Bump the version in package.json for any new release
- [x] There are 2 branches, `master` and `modal`.
  - `master` branch is the latest CMP, it's not used anywhere in production yet. - `modal` branch is the MODAL-based CMP (based on an older version), but it is in use across many sites in production.
- [x] PR against master or modal depending on your work and get an approval
- [x] Once approved, you can use `yarn deploy` which will build and upload an immutable version of the System-1 CMP (and non-modified appnexus CMP + docs) to S3.

```sh
yarn deploy
```
