## [2.1.7](https://github.com/openmail/system1-cmp/compare/2.1.6...2.1.7) (2021-03-05)

### Feat

- [x] Add translations for device text

## [2.1.6](https://github.com/openmail/system1-cmp/compare/2.1.5...2.1.6) (2021-02-26)

### Refactor

- [x] Fix Monitoring; "category" should be a string not a click event

## [2.1.5](https://github.com/openmail/system1-cmp/compare/2.1.4...2.1.5) (2021-02-26)

### Feat

- [x] Upgrades cmpapi and cmpcore
- [x] Updates global vendor list
- [x] Adds Device Storage to Vendor Stack to display cookieMaxAgeSeconds 
- [x] Splits legal-disclosure for legibility in Purpose Stack
- [x] Refactor error logger

## [2.1.4](https://github.com/openmail/system1-cmp/compare/2.1.3...2.1.4) (2020-11-05)

### Feat

- [x] Adds new slim banner with feature flag
- [x] Adds full width mode with feature flag
- [x] Adds drop shadow toggle feature flag
- [x] Adds close with &times; buttom feature flag
- [x] Adds default background color override 

## [2.1.3](https://github.com/openmail/system1-cmp/compare/2.1.2...2.1.3) (2020-11-03)

### Chore
- [x] Update to vendor list versino 62

## [2.1.2](https://github.com/openmail/system1-cmp/compare/2.1.1...2.1.2) (2020-10-20)

### Refactor

- [x] Upgrade DPL

## [2.1.1](https://github.com/openmail/system1-cmp/compare/2.1.0...2.1.1) (2020-09-30)

### Fix

- [x] auto-detect `config.language` and auto-load relevant language files during CMP initialization
- [x] configurable `config.theme.maxWidthModal`

## [2.1.0](https://github.com/openmail/system1-cmp/compare/2.0.4...2.1.0) (2020-09-23)

### Refactor

- [x] `isServiceSpecific` passed through config, default true.
- [x] Upgrade to vendor-list 56
- [x] Config to turn off Stacks on Layer 1

### Dev Tooling

- [x] CMPVersion managed in package.json and incremented on each change
- [x] Add script to auto-upgrade vendor-list and remote translations using `yarn update-vendor-list`

## [2.0.4](https://github.com/openmail/system1-cmp/compare/2.0.3...2.0.4) (2020-09-17)

### Styling

- [x] Downsize fonts and spacing mobile
- [x] Downsize spacing desktop
- [x] Add scroll bar
- [x] Auto-position CMP vertically based on purposes

## [2.0.3](https://github.com/openmail/system1-cmp/compare/2.0.2...2.0.3) (2020-09-15)

### Fix

- [x] tcf-2.0-loader add check for Promise finally.
- [x] Add more information on localize fetch error log.

## [2.0.2](https://github.com/openmail/system1-cmp/compare/2.0.1...2.0.2) (2020-09-02)

### Feat

- [x] Automatically set and persist consent signal if valid TC String present on URLParam `?gdpr_consent`
- [x] Enforce boolean properties in logger

## [2.0.1](https://github.com/openmail/system1-cmp/compare/2.0.0...2.0.1) (2020-08-31)

### Refactor

- [x] Switch to node 12
- [x] Animate modal on first reveal

### Fix

- [x] Update logging Error and Save schemas
- [x] Fix initial language configuration

## [2.0.0](https://github.com/openmail/system1-cmp/compare/1.5.6...2.0.0) (2020-08-14)

### Refactor

- [x] Introduce new CMP based on TCF 2.0 framework
