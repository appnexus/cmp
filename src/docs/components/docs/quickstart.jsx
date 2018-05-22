import { h, Component } from 'preact';
import style from './docs.less';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Link } from 'react-router-dom';
import Url from 'url';
import JSCode from 'codemirror/mode/htmlmixed/htmlmixed'; // eslint-disable-line no-unused-vars

const {host, pathname} = window.location;
const SCRIPT_PATH = Url.resolve(`//${host}${pathname}`, '../cmp.complete.bundle.js');

const basicInclude = `
<html>
	<body>
		<script src="${SCRIPT_PATH}" async></script>
	</body>
</html>
`.trim();

const enableLogging = `
<html>
	<body>
		<script>window.__cmp = {config: {logging: 'debug'}}</script>
		<script src="${SCRIPT_PATH}" async></script>
	</body>
</html>
`.trim();

const manualShow = `
<html>
	<body>
		<button onclick="window.__cmp('showConsentTool')">My Consent Settings</button>
	</body>
</html>
`.trim();

export default class Setup extends Component {

	render(props, state) {

		return (
			<div>
				<section>
					<span className={style.header}>Install the CMP Script</span>
					<p>
						This single script demonstrates how the CMP can check for and conditionally ask
						for user consent.  You can include this on a site to see how it functions.
					</p>
					<p>
						<span class={style.action}>NOTE:</span> This is an example of how a CMP can function wrapped
						up into a single script.  This should NOT be used on an actual site.  Please refer to the <Link to='/setup'>setup</Link> page
						to see how to configure and install this CMP.
					</p>
					<CodeMirror
						value={basicInclude}
						options={{
							lineNumbers: true,
							indentWithTabs: true,
							tabSize: 2,
							mode: 'htmlmixed',
							viewportMargin: Infinity,
							readOnly: true
						}} />
					<p>
						This will do the following:
						<ol>
							<li>Load the CMP script from this site</li>
							<li>Request the global vendor list</li>
							<li>Lookup existing consent data from the consent cookie</li>
							<li>
								Determine if the consent tool should be shown to the user:
								<ul>
									<li>If cookies are disabled: <span class={style.action}>do nothing</span></li>
									<li>If consent data exists and the vendor list version is current: <span class={style.action}>do nothing</span></li>
									<li>If no consent data is found: <span class={style.action}>show the consent tool</span></li>
									<li>If consent data is found and the vendor list version does not match: <span class={style.action}>show the consent tool</span></li>
								</ul>
							</li>
						</ol>
					</p>
				</section>
				<section>
					<span className={style.header}>Vendors and Purposes</span>
					<p>
						The consent tool presents the user with lists of purposes and vendors that they
						can individually consent to.  These lists are controlled by a JSON file configured
						by <span className={style.highlight}>config.globalVendorListLocation</span> (default
						location: https://vendorlist.consensu.org/vendorlist.json). You can modify this
						value to point to your own custom list (NOTE: the location must serve the appropriate
						CORS headers).

						You can generate a file using this <Link to='/tools/vendor-list-builder'>tool</Link>.
					</p>
					<p>
						To declare a subset of vendors that you want to work with you can define your own pubvendors.json
						file and place it on your domain at <span className={style.highlight}>/.well-known/pubvendors.json</span>.
						This file has similar format to <span className={style.highlight}>vendorlist.json</span>. If it
						is present the CMP will limit information that is presented and persisted in the CMP to vendors
						of this file's <span className={style.highlight}>vendors</span> list.  For more information refer to the
						IAB specification: <a href='https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework'>
						https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework</a>.
					</p>
					<p>
						<span class={style.action}>NOTE:</span> IDs listed in the <Link to='/config'>config</Link> under <span className={style.highlight}>allowedVendorIds</span>will override this list.
					</p>
				</section>
				<section>
					<span className={style.header}>Manually Trigger the Consent Tool</span>
					<p>
						If you need to manually show the consent tool you could add a click event to an element:
					</p>

					<CodeMirror
						value={manualShow}
						options={{
							lineNumbers: true,
							indentWithTabs: true,
							tabSize: 2,
							mode: 'htmlmixed',
							viewportMargin: Infinity,
							readOnly: true
						}} />
					<p>
						This will show the consent tool regardless of existing consent data.
					</p>
				</section>

				<section>
					<span className={style.header}>Troubleshooting</span>
					<p>
						You can enable logging to see what the the CMP is doing by specifying the log level in the
						config object before loading the cmp script:
					</p>
					<CodeMirror
						value={enableLogging}
						options={{
							lineNumbers: true,
							indentWithTabs: true,
							tabSize: 2,
							mode: 'htmlmixed',
							viewportMargin: Infinity,
							readOnly: true
						}} />
					<p>
						Log messages will be output to your browser console.
					</p>
				</section>

				<section>
					<span className={style.header}>Demo</span>
					<p>
						See a demo of how the script functions <a href='complete.html' target='_blank'>here</a>.
					</p>
				</section>
			</div>
		);
	}
}
