import { h, Component } from 'preact';
import style from './docs.less';
import { Controlled as CodeMirror } from 'react-codemirror2';
import {js_beautify as beautify} from 'js-beautify';


const script = beautify(`
window.__cmp.config = {
	globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
	globalConsentLocation: './portal.html',
	customPurposeListLocation: './purposes.json',
	storeConsentGlobally: true,
	storePublisherData: true,
	logging: 'debug'
}
`);

export default class CmpApi extends Component {
	render() {

		return (
			<div class={style.configuration}>
				<span class={style.header}>CMP Configuration</span>
				<p>
					Configuration options should be set on the CMP stub function before loading the full CMP implementation.
				</p>

				<CodeMirror
					value={script}
					style={{height: 'auto'}}
					options={{
						lineNumbers: true,
						indentWithTabs: true,
						tabSize: 2,
						mode: 'javascript',
						viewportMargin: Infinity,
						readOnly: true
					}} />

					<div class={style.functionSection}>
						<span class={style.functionSectionTitle}>Options</span>
						<span className={style.argument}>
							<span className={style.argumentType}>globalVendorListLocation (String)</span>:
							<span className={style.argumentDescription}>Location to request the global vendor list from. Default
							location is: <span class={style.highlight}>https://vendorlist.consensu.org/vendorlist.json</span></span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>globalConsentLocation (String)</span>:
							<span class={style.argumentDescription}>Location of the HTML file that is required to communicate global vendor consent data to a third-party
								domain. See: <span class={style.highlight}>/src/docs/assets/portal.js</span></span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>customPurposeListLocation (String)</span>:
							<span class={style.argumentDescription}>Location of the JSON file that holds a list of custom purposes a user can select. This file
								must be able to be requested from the domain that the CMP is loaded on.
								See: <span class={style.highlight}>/src/docs/assets/purposes.json</span></span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>storeConsentGlobally (Boolean)</span>:
							<span class={style.argumentDescription}>If true then the the consent data is written to a cookie on the <span class={style.highlight}>globalConsentLocation</span> domain.
							If false then the consent data will be written to a cookie on the domain that the CMP is loaded from.</span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>storePublisherData (Boolean)</span>:
							<span class={style.argumentDescription}>If true then custom purposes will be loaded from <span class={style.highlight}>customPurposeListLocation</span> and a the purpose consent information will be
							written into a cookie on the domain that the CMP is loaded from. This cookie is unique from the vendor consent cookie. If false
								then the <span class={style.highlight}>customPurposeListLocation</span> will not be requested and no cookie will be written with purpose consent data.</span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>logging (String|Boolean)</span>:
							<span class={style.argumentDescription}>
								Can be a string defining the level of logging (debug, info, warn, error) or a boolean.  A boolean value of true is equivalent
								to <span class={style.highlight}>debug</span>.  A boolean value of false disables logging.
							</span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>getConsentData(callback) (Function)</span>:
							<span class={style.argumentDescription}>
								Custom function to read vendor and publisher consent cookies
								<span className={style.functionSectionTitle}>Arguments</span>
								<span className={style.argument}>
									<span className={style.argumentType}>callback(err, consentData) (Function)</span>: <span>Function to be executed with consent data object consisted with required <span class={style.highlight}>vendor</span> and optional <span class={style.highlight}>publisher</span> attributes</span>
								</span>
							</span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>setConsentData(consentData, callback) (Function)</span>:
							<span class={style.argumentDescription}>
								Custom function to write vendor and publisher consent cookies
								<span className={style.functionSectionTitle}>Arguments</span>
								<span className={style.argument}>
									<span className={style.argumentType}>consentData (Object)</span>: <span>Consent data object consisted with required <span class={style.highlight}>vendor</span> and optional <span class={style.highlight}>publisher</span> attributes</span>
								</span>
								<span className={style.argument}>
									<span className={style.argumentType}>callback(err) (Function)</span>: <span>Function to be executed on consent data write</span>
								</span>
							</span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>legIntPurposeIds (Array)</span>:
							<span class={style.argumentDescription}>
								List of (non-consentable) data purposes that will be used under legitimate interest
							</span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>purposeGroups (Array)</span>:
							<span class={style.argumentDescription}>
								Array of arrays with purpose identifiers that should be organized in groups - each one with single switch which activates/deactivates all purposes in given group. For example: <span class={style.highlight}>[[1, 4], [2, 3, 5]]</span>. Purposes which are not included in any group will be displayed separatelly
							</span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>autoDisplay (Boolean)</span>:
							<span class={style.argumentDescription}>Default is set true. If true  <span class={style.highlight}>autoDisplay: true</span> when initialize CMP the consent tool UI may be displayed automatically according to user's current consents.
							If is set false <span class={style.highlight}>autoDisplay: false</span> the consent tool UI will never be displayed when initialize CMP</span>
						</span>
					</div>
			</div>
		);
	}
}
