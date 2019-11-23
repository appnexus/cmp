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
