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
	logging: 'debug',
	allowedVendorIds: [1,2,3]
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
							<span class={style.argumentType}>allowedVendorIds (Array[number])</span>:
							<span class={style.argumentDescription}>
								White list of vendor IDs to display and persist data for in the CMP.  This will override a list provided
								by pubvendors.json.
							</span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>gdprApplies (Boolean)</span>:
							<span class={style.argumentDescription}>
								Indicates that the publisher has configured the CMP to apply GDPR. This flag does not change the behavior of the CMP.
							</span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>gdprAppliesGlobally (Boolean)</span>:
							<span class={style.argumentDescription}>
								Indicates that the publisher has configured the CMP to apply GDPR to all (including non-EU) visitors.
								This flag does not change the behavior of the CMP.
							</span>
						</span>
						<span class={style.argument}>
							<span class={style.argumentType}>theme (Object)</span>:
							<span class={style.argumentDescription}>
								Some basic colors can be changed through the <span class={style.highlight}>theme</span> object.
								<span class={style.argument}><span class={style.argumentType}>overlayBackground</span></span>
								<span class={style.argument}><span class={style.argumentType}>primaryColor</span></span>
								<span class={style.argument}><span class={style.argumentType}>primaryTextColor</span></span>
								<span class={style.argument}><span class={style.argumentType}>secondaryColor</span></span>
								<span class={style.argument}><span class={style.argumentType}>secondaryTextColor</span></span>
								<span class={style.argument}><span class={style.argumentType}>textLinkColor</span></span>
								<span class={style.argument}><span class={style.argumentType}>backgroundColor</span></span>
								<span class={style.argument}><span class={style.argumentType}>textColor</span></span>
								<span class={style.argument}><span class={style.argumentType}>textLightColor</span></span>
								<span class={style.argument}><span class={style.argumentType}>dividerColor</span></span>
							</span>
						</span>
					</div>
			</div>
		);
	}
}
