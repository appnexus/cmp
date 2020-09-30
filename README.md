<img align="right" width="50" src="https://s.flocdn.com/@s1/ads-coordinator/reference/fa9924f562bd5be7831df8ca2d285b1f.gif" />

# system1-cmp

System1's implementation of IAB's Transparency and Consent 2.0 Consent Management Platform. A TCF 2.0 compliant CMP that passes all IAB compliance checks and has been validated to participate as a CMP for private use as CMP 38.

This CMP passes technical and policy compliance checks, but that does not necessarily guarantee legal compliance. Each organisation must make their own assessment of whether they are compliant with the law.

Feel free to fork this CMP and submit to IAB for private use.

[Reference Page and Demo](https://s.flocdn.com/cmp/test/tcf-2.0.html)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [SDK / Package Details](#sdk--package-details)
- [Installation / Use](#installation--use)
- [API](#api)
  - [Customized API](#customized-api)
  - [init](#init)
  - [onConsentAllChanged](#onconsentallchanged)
  - [offConsentAllChanged](#offconsentallchanged)
  - [showConsentTool](#showconsenttool)
  - [changeLanguage](#changelanguage)
- [Configuration / Config](#configuration--config)
  - [theme](#theme)
- [Initialize With Euconsent String from URL Param](#initialize-with-euconsent-string-from-url-param)
- [Background and Resources](#background-and-resources)
- [TODO](#todo)
- [Support Matrix](#support-matrix)
- [Contributing](#contributing)
  - [Update Vendor List](#update-vendor-list)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## SDK / Package Details

- `tcf-2.0-loader.js` is < 1kb. It loads the CMP sdk and dynamically checks compatibility and loads the polyfill if necessary.
- `tcf-2.0-cmp.js` is < 50kb. It contains the TCF 2.0 framework (core/api), UI layer for interacting with the CMP, and custom store for persisting choices.
- `polyfills.js` is < 15kb. It contains polyfills required for the CMP to function in IE11.

## Installation / Use

See a [working example in codepen](https://codepen.io/potench/pen/GRZZprw).

```html
<script src="https://s.flocdn.com/cmp/2.1.1/tcf-2.0-loader.js"></script>
<script>
	__tcfapi('onConsentAllChanged', 2, function (store) {
		const hasConsented = document.cookie.indexOf('gdpr_opt_in=1') >= 0;
		if (hasConsented) {
			console.log('cmp:onConsentAllChanged: all consent achieved', store.tcData.tcString);
		} else {
			console.log('cmp:onConsentAllChanged: only some consent achieved', store.tcData.tcString);
		}
	});

	__tcfapi(
		'init',
		2,
		function (store, error) {
			console.log('initialization complete', store, error);
		},
		{
			business: 'business:unit',
			gdprApplies: true, // true for EU false for CA
			ccpaApplies: false, // true for CA false for EU
			canLog: true,
			canDebug: true,
			isServiceSpecific: true, // on service-specific use supported right now
			baseUrl: 'https://s.flocdn.com/cmp/2.1.1/config/2.0', // base url
			scriptSrc: 'https://s.flocdn.com/cmp/2.1.1/tcf-2.0-cmp.js', // cmp SDK
			publisherCountryCode: 'US',
			// language: '', // empty string or unset to default to browser language
			shouldUseStacks: true,
			// narrowedVendors: [1, 2, 3, 4, 5, 6],
			theme: {
				boxShadow: 'none',
				featuresColor: '#d0d3d7',
				maxHeightModal: '40vh',
				primaryColor: '#0099ff',
				secondaryColor: '#869cc0',
				shouldAutoResizeModal: true, // resizes modal on stacks screen to push stacks below fold
				textLinkColor: '#0099ff',
			},
		}
	);
</script>
```

## API

Read more about [\_\_tcfapi built-in API](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#cmp-api-v20)

- ping
- addEventListener
- removeEventListener
- getTCData
- getInAppTCData
- getVendorList

### Customized API

- [init](#init)
- [onConsentAllChanged](#onConsentAllChanged)
- [offConsentAllChanged](#offConsentAllChanged)
- [showConsentTool](#showConsentTool)
- [changeLanguage](#changeLanguage)

### init

Calling `__tcfapi('init', 2, (store) => {})` will trigger the seed-file or loader to async load the larger CMP UI application. Once loaded, the cmp library calls `init` function to load additional dependencies and render the application.

`init` callback should be called regardless of internal errors as errors need to be handled gracefully internally to not disrupt the parent website.

```js
/**
 * @param 'init' // required string command
 * @param apiVersion // required number, 2, version of api in use,
 * @param callback // required function, called when init completes, called with `store`
 * @param configurationOptions // optional object, used customize the CMP
 * @return void
 */
__tcfapi('init', apiVersion, callback, configurationOptions);
```

### onConsentAllChanged

Calling `__tcfapi('onConsentAllChanged', 2, (store) => {})` triggers the callback whenever the `gdpr_opt_in` cookie changes.
We track an all-or-nothing `hasConsentedAll` mode so you can more easily toggle an anonymous mode on your website.

```js
/**
 * @param 'onConsentAllChanged' // required string command
 * @param apiVersion // required number, 2, version of api in use,
 * @param callback // required function, called when gdpr_opt_in value changes from undefined (no consent yet), 1 (contented all), 0 (declined anything)
 * @return cachedListener // cache the callback if you need to remove this listener later
 */
const cachedListener = __tcfapi('onConsentAllChanged', apiVersion, callback);
```

### offConsentAllChanged

Calling `__tcfapi('offConsentAllChanged', 2, cachedListener)` removes the listener setup in `__tcfapi('onConsentAllChanged')`.

```js
/**
 * @param 'onConsentAllChanged' // required string command
 * @param apiVersion // required number, 2, version of api in use,
 * @param cachedListener // optional function, include to remove a specific listener that was setup with `onConsentAllChanged`
 * @return void
 */
const cachedListener = __tcfapi('onConsentAllChanged', apiVersion, callback);
__tcfapi('offConsentAllChanged', apiVersion, cachedListener); // remove a specific event listener
__tcfapi('offConsentAllChanged', apiVersion); // remove all `onConsentAllChanged` event listeners
```

### showConsentTool

Calling `__tcfapi('showConsentTool', 2, () => {})` will display the CMP UI.

```js
/**
 * @param 'showConsentTool' // required string command
 * @param apiVersion // required number 2
 * @param callback // required function, called when showConsentTool complete, called with `store`
 */
__tcfapi('showConsentTool', 2, (store) => {});
```

### changeLanguage

Calling `__tcfapi('changeLanguage', 2, () => {}, language)` will use cached version or load language dependencies and re-render the application in the desired language

```js
/**
 * @param 'changeLanguage' // required string command
 * @param apiVersion // required number 2
 * @param callback // required function, called when changeLanguage completes, called with `store` and result
 * @param language // required string, 2-letter language-code en,bg,ca,cs,da,de... etc. See constants.js file for supported languages
 */
__tcfapi('changeLanguage', 2, (store) => {}, 'pt'); // changes to Portuguese
```

## Configuration / Config

Set configuration for your CMP during the `init` phase.

```js
__tcfapi('init', 2, () => {}, {
	theme: {
		maxHeightModal: '50vh',
		shouldAutoResizeModal: true,
		primaryColor: '#0099ff',
	},
	canLog: true, // pixel logging for monitoring and alerting
	canDebug: false, // console.logs for dev debugging
	narrowedVendors: [1, 2, 3, 4, 5], // only show a select vendors
	cookieDomain: '', // which domain to set the euconsent and gdpr_opt_in cookie on
});
```

| Config Property        | Type             | Default                                 | Detail                                                                                                            |
| ---------------------- | ---------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `canLog`               | optional boolean | `false`                                 | true enables DPL logging for health monitoring. Add `#s1&debug=true` to URL for easy DPL debugging                |
| `canDebug`             | optional boolean | `false`                                 | true enables internal console logging for debugging                                                               |
| `baseUrl`              | optional string  | `./config/2.0`                          | relative or absolute url to load the global vendor list. Combines with `versionedFilename` to load vendorlist.    |
| `versionedFilename`    | optional string  | `vendor-list.json`                      | file name of the global vendor list.                                                                              |
| `narrowedVendors`      | optional array   | `[]`                                    | Only show select vendors. Example [1,4,5,19]                                                                      |
| `language`             | optional string  | null                                    | 2-character language code to initialize CMP with. If no language matches, CMP boots with `en` Ex 'en', 'ja', 'it' |
| `languageFilename`     | optional string  | `purposes/purposes-[LANG].json`         | file name template for gvl localized purpose json files                                                           |
| `translationFilename`  | optional string  | `translations/translations-[LANG].json` | file name template for custom localized json files for UI layer                                                   |
| `cookieDomain`         | optional string  | null                                    | manage consent across subdomains. Example `.mysite.com`                                                           |
| `gdprApplies`          | optional boolean | `false`                                 | Please pass `true` if being used on EU traffic where active consent is required                                   |
| `ccpaApplies`          | optional boolean | `false`                                 | Please pass `true` if being used on USA:CA traffic where "Do Not Sell" initiates CMP passively                    |
| `experimentId`         | optional string  | `control`                               | use to indicate changes / upgrades in your CMP implementation for reporting / monitoring purposes.                |
| `business`             | optional string  | `dev`                                   | used to correlate CMP events for monitoring across a businessline.                                                |
| `theme`                | optional object  | [details below](#theme)                 | Override styling choices using the following properties.                                                          |
| `publisherCountryCode` | optional string  | `US`                                    | String representing country code of parent website business                                                       |
| `isServiceSpecific`    | optional boolean | `true`                                  | true uses publisher consent, false uses global consent                                                            |
| `shouldUseStacks`      | optional boolean | `true`                                  | true uses stacks on Layer1, TODO stacks need purposes/custom-features toggle to be compliant                      |

### theme

Themeing is a bit limited right now. Pass in a `config.theme` object during initialization. Use the following to override styling choices:

| Theme Property          | Type             | Default  | Detail                                                                                     |
| ----------------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------ |
| `maxHeightModal`        | optional string  | `45vh`   | CSS style for max height of the CMP UI. Example: `45vh`, `50%`, `350px`                    |
| `maxWidthModal`         | optional string  | `1024px` | CSS style for max width of the CMP UI. Example: `1024px`, `calc(90% - 100px)`              |
| `shouldAutoResizeModal` | optional boolean | true     | Auto detects Layer1 height to minimize UI. UI resizes to `maxHeightModal` upon interaction |
| `primaryColor`          | optional string  | null     | Example: `#0099ff`                                                                         |
| `textLinkColor`         | optional string  | null     | Example: `#0099ff`                                                                         |
| `secondaryColor`        | optional string  | null     | Example: `#869cc0`                                                                         |
| `featuresColor`         | optional string  | null     | Example: `#d0d3d7`                                                                         |
| `featuresColor`         | optional string  | null     | Example: `#d0d3d7`                                                                         |

## Initialize With Euconsent String from URL Param

We can leverage the spec provided for [URL-based services to process the TC String when it can't execute JavaScript](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#how-does-a-url-based-service-process-the-tc-string-when-it-cant-execute-javascript) to pass along consent when domains are owned by the same entity.

Using a URLParam `gdpr_consent` you can pass consent to another domain that is using this CMP.

```
?gdpr_consent=${TC_STRING}
```

The CMP will use `?gdpr_consent` URLParam to automatically persist consent and trigger consent change-events _if there is not already an existing consent signal stored in the EUConsent cookie_.

## Background and Resources

The UI layer is inspired by this [IAB TCF CMP UI Webinar presentation](https://iabeurope.eu/wp-content/uploads/2020/01/2020-01-21-TCF-v2.0-CMP-UI-Webinar.pdf).

This CMP leverages the [core](https://github.com/InteractiveAdvertisingBureau/iabtcf-es/blob/master/modules/core#iabtcfcore), [cmpapi](https://github.com/InteractiveAdvertisingBureau/iabtcf-es/blob/master/modules/cmpapi#iabtcfcmpapi), and [stub](https://github.com/InteractiveAdvertisingBureau/iabtcf-es/blob/master/modules/stub#iabtcfstub) modules from IAB's official TCF 2.0 JS SDK [iabtcf-es](https://github.com/InteractiveAdvertisingBureau/iabtcf-es).

The component library was forked and edited from the original [TCF 1.0 CMP](https://github.com/appnexus/cmp) by AppNexus.

Following Google's [Additional Consent Mode](https://support.google.com/admanager/answer/9681920?hl=en&ref_topic=9760861) and [Interoperability guidance for vendors](https://support.google.com/admanager/answer/9461778?hl=en) this CMP provides cached versions of the [vendor-list-test-google](https://vendorlist.consensu.org/v2/vendor-list-test-google.json) and standard [vendor-list](https://vendorlist.consensu.org/v2/vendor-list.json) vendor list.

## TODO

- [ ] Write Unit Tests and Integration Tests
- [ ] Improve Theming
- [ ] Implement global-scope and group-scope
- [ ] Updated hosted iframe for TCF 2.0
- [ ] Delete unused TCF 1.1 and reorganize

## Support Matrix

- `✔ Level 1`: Tested and fully supported, all functional and visual bugs should be fixed.
- `✢ Level 2`: Untested or Partially tested, functional bugs reported are fixed, visual appearance may differ.
- `✳ Level 3`: A separate solution or codebase exists to support this browser
- `✘ Not Supported`: Untested tested, functional bugs expected and not fixed.

| Browser         | ✔ Level 1       | ✢ Level 2            | ✳ Level 3 | ✘ Not Supported   |
| :-------------- | :-------------- | :------------------- | --------- | ----------------- |
| Chrome          | ✔ Latest        | ✢ Latest - 2         |           |                   |
| Safari          | ✔ Latest        | ✢ Latest - 2         |           |                   |
| Edge            | ✔ Latest        | ✢ Latest - 2 (Win10) |           |                   |
| IE              | ✔ IE11 (Win8.1) | ✢ IE11(Win7 / Metro) |           | ✘ IE10, IE9,...   |
| Firefox         | ✔ Latest        | ✢ Latest - 2         |           |                   |
| iOS Safari      | ✔ Latest        | ✢ Latest - 2         |           |                   |
| Android Chrome  | ✔ Latest        | ✢ Latest - 2         |           |                   |
| Android Browser |                 |                      |           | ✘ Default Browser |
| Opera           |                 |                      |           | ✘                 |

## Contributing

For now the TCF 1.1 and TCF 2.0 CMPs both live in this repository. We will deprecate and remove TCF 1.1 and update all tests against the new 2.0 package. To contribute, make updates to the files in `src/s1`.

```
yarn
yarn dev
# browse to http://localhost:8080/tcf-2.0.html
```

### Update Vendor List

IAB updates the vendor list every Friday. Use the included to script to automatically upgrade all vendor-lists. Commit, merge, publish the changes to take effect.

```
yarn upgrade-vendor-list
```
