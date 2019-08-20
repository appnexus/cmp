# System1 CMP Loader

The System1 CMP Loader is a shim around the [appnexus-cmp](https://github.com/appnexus/cmp); it aims to improve installation, integration, and management of the underlying CMP and to allow us to swap out the underlying CMP at a later date.

---

## Note

The `modal` is currently used in production, it implements an optional "footer" UI solution for initial consent requests that pops the CMP into a modal view. 
`master` branch has been upgraded to the latest appnexus-cmp but has not been used in production at System1 yet. 

Eventually we need to merge changes from the `modal` branch into `master` (probably manually) and upgrade master to the lastest from appnexus and apply any customizations on top. 

As of now, just apply new changes to the `modal` branch until we formalize a plan to migrate to the lastest master branch.

---


[Complete Docs Are a Work In Progress](http://s.flocdn.com/cmp/docs/#/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Terminology](#terminology)
- [Installation](#installation)
  - [Quickstart](#quickstart)
- [Roadmap](#roadmap)
- [CMP Loader API](#cmp-loader-api)
  - [init](#init)
    - [init: config](#init-config)
    - [init: callback](#init-callback)
  - [Arguments](#arguments)
  - [Possible Commands](#possible-commands)
    - [Examples](#examples)
  - [Events](#events)
    - [Examples](#examples-1)
- [Deploy](#deploy)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Terminology

| Term | Description |
| --- | --- |
| CMP Loader | System1 CMP loader or container. Provides API shell, loader, initializer for actual CMP |
| CMP | Consent Management Platform implementation detail and UI ([appnexus-cmp](https://github.com/appnexus/cmp), quantcast-cmp) |

# Installation

The CMP Loader provides a shim to the CMP SDK. Use the CMP Loader to queue commands and events asynchronously to the CMP SDK.

## Quickstart

```
<html>
<body>
  <script type="text/javascript" src="//s.flocdn.com/cmp/${VERSION}/loader.js"></script>
  <script type="text/javascript">
  const config = {
    scriptSrc: 'https://s.flocdn.com/cmp/${VERSION}/cmp.js',
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
    // allowedVendorIds: null
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

# Roadmap

The goal is to provide a CMP loader that acts as an SDK for integrating the CMP with your website where you might need more support listening for sideEffects.

- [x] Provide a CMP loader that maintains CMP scope after loading
- [x] Allow `import` of CMP so it can be included in another CMP project as an SDK
- [x] Allow CMP Loader to be directly inlined for immediate use.
- [x] Expose `init` function to allow for dynamic configuration
- [x] Set cookie `gdpr_opt_in` as boolean for user consent to all Purposes/Vendors or not
- [x] Allow customization of location for `pubvendors.json`
- [x] Add `consentChanged` event to trigger change in consent
- [x] Return consent object in onSubmit
- [x] Add `shouldAutoConsent` config flag to allow for automatic consent
- [x] Add `shouldAutoConsentWithFooter` config flag to allow for automatic consent and pop to footer


# CMP Loader API

The CMP Loader exposes access to the underlying CMP SDK: [appnexus-cmp API](http://s.flocdn.com/cmp/docs/#/cmp-api) and externalizes configuration of the CMP SDK.

## init

You must call `init` explicitly to start the CMP. Otherwise, the CMP Loader will only queue commands and not initialize the CMP SDK.

 * `config` is REQUIRED
 * `callback` is OPTIONAL

```
cmp('init', config, callback);
```

### init: config

`config` is a required argument of `init`. It allows us to configure/customize the CMP.

Example Configuration:

```
const config = {
  scriptSrc: '//s.flocdn.com/cmp/${VERSION}/cmp.js',
  gdprApplies: true,
  pubVendorListLocation: '//s.flocdn.com/cmp/pubvendors.json', // OPTIONAL, whitelists vendors
  logging: false,
  customPurposeListLocation: './purposes.json',
  globalVendorListLocation: '//vendorlist.consensu.org/vendorlist.json',
  globalConsentLocation: './portal.html',
  storeConsentGlobally: false,
  storePublisherData: false,
  localization: {},
  forceLocale: null,
  allowedVendorIds: null
}
cmp('init', config);
```

- `scriptSrc`: String: Required: location of CMP SDK.
- `gdprApplies`: Booelan: Enable / disable load of the CMP SDK
- `pubVendorListLocation`: OPTIONAL: location of pub vendor list
- `globalVendorListLocation`: OPTIONAL: global vendorList is managed by the IAB.
- `shouldAutoConsent`: OPTIONAL: automatically consent on behalf of the user.
- `shouldAutoConsentWithFooter`: OPTIONAL: automatically consent on behalf of the user and immediately open footer

### init: callback

Use the callback to determine if you should show the consent tool or not.

- `errorMsg`: STRING // detail on the result CMP initializing
- `gdprApplies`: BOOLEAN // true if in EU, false if consent not required
- `hasConsented`: BOOLEAN // true if use has consented to all permissions
- `vendorConsents`: OBJECT
- `vendorList`: OBJECT

Callback Example

```
<script type="text/javascript" src="https://s.flocdn.com/cmp/${VERSION}/loader.js"></script>

cmp('init', {
    gdprApplies: true,
    scriptSrc: '//s.flocdn.com/cmp/${VERSION}/cmp.js'
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

## Arguments

```
cmp(command, [parameter], [callback])
```

- `command` (String): Name of the command to execute
- `[parameter]` (\*): Parameter to be passed to the command function
- `[callback]` (Function): Function to be executed with the result of the command

## Possible Commands

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

# Deploy

```
yarn deploy
```

# Local Development

You can start a development server that will monitor changes to all CMP and docs files with:
```sh
yarn dev:s1
```

Access the System1 s1cmp complete reference at http://localhost:8080/reference.html
