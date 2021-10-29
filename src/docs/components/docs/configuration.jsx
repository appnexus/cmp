import { h, Component } from 'preact';
import style from './docs.less';
import { Controlled as CodeMirror } from 'react-codemirror2';
import {js_beautify as beautify} from 'js-beautify';


const script = beautify(`
window.__tcfConfig = {
	globalVendorListLocation: 'https://vendorlist.consensu.org/v2/vendor-list.json',
	globalConsentLocation: './portal.html',
	storeConsentGlobally: true,
	logging: 'debug'
}
`);

export default class CmpApi extends Component {
	render() {

		return (
			<div className={style.configuration}>
				<span className={style.header}>CMP Configuration</span>
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

				<div className={style.functionSection}>
					<span className={style.functionSectionTitle}>Options</span>
					<span className={style.argument}>
						<span className={style.argumentType}>globalVendorListLocation (String)</span>:
						<span className={style.argumentDescription}>Location to request the global vendor list from. Default
							location is: <span className={style.highlight}>https://vendorlist.consensu.org/vendorlist.json</span></span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>globalConsentLocation (String)</span>:
						<span className={style.argumentDescription}>Location of the HTML file that is required to communicate global vendor consent data to a third-party
								domain. See: <span className={style.highlight}>/src/docs/assets/portal.js</span></span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>storeConsentGlobally (Boolean)</span>:
						<span className={style.argumentDescription}>If true then the the consent data is written to a cookie on the <span className={style.highlight}>globalConsentLocation</span> domain.
							If false then the consent data will be written to a cookie on the domain that the CMP is loaded from.</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>logging (String|Boolean)</span>:
						<span className={style.argumentDescription}>
								Can be a string defining the level of logging (debug, info, warn, error) or a boolean.  A boolean value of true is equivalent
								to <span className={style.highlight}>debug</span>.  A boolean value of false disables logging.
						</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>disableTabs (Boolean)</span>:
						<span className={style.argumentDescription}>
								If true General information tab will be hidden.
						</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>getConsentData(callback) (Function)</span>:
						<span className={style.argumentDescription}>
								Custom function to read vendor and publisher consent cookies
							<span className={style.functionSectionTitle}>Arguments</span>
							<span className={style.argument}>
								<span className={style.argumentType}>callback(err, consentData) (Function)</span>: <span>Function to be executed with consent data object consisted with required <span className={style.highlight}>vendor</span> and optional <span className={style.highlight}>publisher</span> attributes</span>
							</span>
						</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>setConsentData(consentData, callback) (Function)</span>:
						<span className={style.argumentDescription}>
								Custom function to write vendor and publisher consent cookies
							<span className={style.functionSectionTitle}>Arguments</span>
							<span className={style.argument}>
								<span className={style.argumentType}>consentData (Object)</span>: <span>Consent data object consisted with required <span className={style.highlight}>vendor</span> and optional <span className={style.highlight}>publisher</span> attributes</span>
							</span>
							<span className={style.argument}>
								<span className={style.argumentType}>callback(err) (Function)</span>: <span>Function to be executed on consent data write</span>
							</span>
						</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>getVendorList(callback) (Function)</span>:
						<span className={style.argumentDescription}>
								Custom function to read global vendor list (overwrites <span className={style.highlight}>globalVendorListLocation</span> configuration)
							<span className={style.functionSectionTitle}>Arguments</span>
							<span className={style.argument}>
								<span className={style.argumentType}>callback(err, vendorList) (Function)</span>: <span>Function to be executed with vendor list object</span>
							</span>
						</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>legIntPurposeIds (Array)</span>:
						<span className={style.argumentDescription}>
								List of (non-consentable) data purposes that will be used under legitimate interest
						</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>contractPurposeIds (Array)</span>:
						<span className={style.argumentDescription}>
								List of (non-consentable) data purposes that are required for the performance of a contract
						</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>autoDisplay (Boolean)</span>:
						<span className={style.argumentDescription}>Default is set true. If true  <span className={style.highlight}>autoDisplay: true</span> when initialize CMP the consent tool UI may be displayed automatically according to user's current consents.
							If is set false <span className={style.highlight}>autoDisplay: false</span> the consent tool UI will never be displayed when initialize CMP</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>getConsentDataTimeout (Number)</span>:
						<span className={style.argumentDescription}>
								Default is set 500 (ms). Maximum time to retrieve consents data. If the timeout is reached CMP Api will be initialized without showing the UI.
						</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>decoratePageCallHandler(Object) (Function)</span>:
						<span className={style.argumentDescription}>
								Custom function to overwrite default behaviour pageCallHandler function.
							<span className={style.functionSectionTitle}>Arguments</span>
							<span className={style.argument}>
								<span className={style.argumentType}>cmpApi (Object)</span>: <span>Instance of CmpApi class.</span>
							</span>
						</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>shouldDisplayFooter(callback) (Function)</span>:
						<span className={style.argumentDescription}>
								Function that determines if CMP UI footer should be shown
							<span className={style.functionSectionTitle}>Arguments</span>
							<span className={style.argument}>
								<span className={style.argumentType}>callback(result) (Function)</span>: <span>Callback to be executed with value returned from function.</span>
							</span>
						</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>specialPurposes (Array)</span>:
						<span className={style.argumentDescription}>
								List of Ids allowing to display custom special purposes in Publishers purposes description
						</span>
					</span>
				</div>
			</div>
		);
	}
}
