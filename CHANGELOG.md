## [1.4.3](https://github.com/openmail/system1-cmp/compare/v1.4.2...v1.4.3) (2020-02-22)

### Refactor

- [x] `allowedVendorIds` now filters vendors out of the display list, but keeps all vendors in memory
- [x] `pubvendors.json` can now provide custom features
- [x] Update cached global vendor list to v190.
- [x] Fix conflicting eslint, prettier, editorconfig settings


<a name="1.4.2"></a>

## [1.4.2](https://github.com/openmail/system1-cmp/compare/v1.4.1...v1.4.2) (2020-02-21)

### Fix

- [x] Fixes yarn dev and the ReactNative window detection

<a name="1.4.1"></a>

## [1.4.1](https://github.com/openmail/system1-cmp/compare/v1.4.0...v1.4.1) (2020-02-21)

### Refactor

- [x] Adds postMessage to Native Device from info-acs.html

<a name="1.4.0"></a>

## [1.4.0](https://github.com/openmail/system1-cmp/compare/v1.3.5...v1.4.0) (2020-02-20)

### Docs

- [x] Surface more overrides in the `theme` object
- [x] Create new info-acs.html reference as standalone CMP for the info.com Android Choice Screen
- [x] Refactor build for config json files and mutiple html templates

<a name="1.3.5"></a>

## [1.3.5](https://github.com/openmail/system1-cmp/compare/v1.3.4...v1.3.5) (2020-02-19)

### Docs

- [x] Add react native call in reference.html file and bump version

<a name="1.3.4"></a>

## [1.3.4](https://github.com/openmail/system1-cmp/compare/v1.3.3...v1.3.4) (2019-12-03)

### Refactor

- [x] `getCookieDomain()` allows wildcard cookie on naked primary domain (ex: setting `cookieDomain: '.zoo.com'` while on `https://zoo.com`)

<a name="1.3.3"></a>

## [1.3.3](https://github.com/openmail/system1-cmp/compare/v1.3.2...v1.3.3) (2019-12-02)

### Feature

- [x] Add `cookieDomain` config option to allow subdomain cookies

### Fix

- [x] Remove inference of domain in cookie setting because `co.uk` style public-suffixes make this difficult to implement

<a name="1.3.2"></a>

## [1.3.2](https://github.com/openmail/system1-cmp/compare/v1.3.1...v1.3.2) (2019-11-22)

### Refactor

- [x] Trigger onConsentChanged after callback in init to avoid double calls
- [x] eslint / prettier configs and run updates to fix formatting incongruities

### Fix

- [x] Coerce cookie to Boolean to fix '0' coercing to True in onConsentChanged
- [x] Fix failing autoConsent footer test to test Banner

<a name="1.3.1"></a>

## [1.3.1](https://github.com/openmail/system1-cmp/compare/v1.3.0...v1.3.1) (2019-11-21)

### Refactor

- [x] autoconsent should open Banner instead of interstitial

<a name="1.3.0"></a>

## [1.3.0](https://github.com/openmail/system1-cmp/compare/v1.2.0...v1.3.0) (2019-11-20)

### Feat

- [x] add `theme.isBannerModal` config option to enable banner or modal version
- [x] updates styling and moves buttons on initial banner
- [x] vendor consent seelcted ON when inspected instead of OFF by default
- [x] upgrade to node 10 since node 8 EOL in Decemeber
- [x] merge optional pubvendors data and languages data to provide custom purposes, custom vendors, custom features with language overrides
- [x] auto consent when ESC key hit
- [x] auto consent when Banner closed by clicking outside

<a name="1.2.0"></a>

## [1.2.0](https://github.com/openmail/system1-cmp/compare/v1.1.1...v1.2.0) (2019-11-19)

### Refactor

- [x] add `shouldAutoUpgradeConsent` feature to auto-correct consent when the vendor list changes
- [x] Does not trigger onConsentChange event during auto-correct consent or when error received

<a name="1.1.1"></a>

## [1.1.1](https://github.com/openmail/system1-cmp/compare/v1.1.0...v1.1.1) (2019-09-04)

### Refactor

- [x] For Policy Check 3 (provide a direct link to the vendor list in first UI layer), render the `<Banner>` with the Vendor Purposes accordion expanded.

<a name="1.1.0"></a>

## [1.1.0](https://github.com/openmail/system1-cmp/compare/v1.0.0...v1.1.0) (2019-09-03)

### Feature

- [x] Add Vendor Features UI for Policy Check 10 and 13 (insert names and definitions of Features somewhere in your UI and add these information on a vendor per vendor basis. You can find names and definitions of Features and their employment per vendor in the GVL.)

<a name="1.0.0"></a>

## [1.0.0](https://github.com/openmail/system1-cmp/compare/v0.0.1...v1.0.0) (2019-08-19)

### Refactor

- [x] Merge latest from upstream repo
- [x] Merge latest System1 customizations from `modal` branch into footer-UI refactor (see docs in modal branch: https://github.com/Openmail/system1-cmp/tree/modal)

<a name="0.0.1"></a>

## [0.0.1](https://github.com/openmail/system1-cmp/compare/v0.0.0...v0.0.1) (2018-07-02)

### Features

- [x] Initial Release!
- [x] Versioned Deployment and updated README for installing CMP
