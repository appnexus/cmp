import { h, Component } from 'preact';
import { Controlled as CodeMirror } from 'react-codemirror2';

import {
	decodeVendorConsentData,
	VENDOR_CONSENT_COOKIE_NAME
} from '../../../../lib/cookie/cookie';
import {
	decodeCookieValue,
	decodeB64toBitString,
} from '../../../../lib/cookie/cookieutils';
import {
	NUM_BITS_VERSION,
	vendorVersionMap
} from '../../../../lib/cookie/definitions';
import { readCookie } from '../../../../lib/cookie/cookie';
import Store from '../../../../lib/store';
import { validateBitString } from '../cookieDecoder';

import style from './vendorCookieInspector.less';

const GLOBAL_LIST_LOCATION = 'https://vendorlist.consensu.org/vendorlist.json';

export default class VendorCookieDecoder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vendors: [],
			vendorMap: {},
			allowedVendors: [],
			disallowedVendors: [],
			allowedPurposes: []
		};
	}

	handleInputChanged = (event) => {
		this.decodeB64(event.target.value);
	};

	decodeB64 = (b64) => {
		try {
			const decodedBitString = decodeB64toBitString(b64);
			validateBitString(decodedBitString, vendorVersionMap);
			const vendorConsentData = decodeVendorConsentData(b64);

			const store = new Store({
				vendorConsentData,
			});

			const { vendorMap, purposes, purposeMap } = this.state;
			const vendorObject = store.getVendorConsentsObject();
			const { vendorConsents, purposeConsents } = vendorObject;

			const [allowedVendors, disallowedVendors] = Object.keys(vendorConsents)
				.reduce((acc, id) => {
					const vendor = vendorMap[id];
					if (vendorConsents[id]) {
						acc[0].push(vendor ? vendor : { id, name: `Vendor ID: ${id}` });
					} else if (vendor) {
						acc[1].push(vendor);
					}
					return acc;
				}, [[], []]);

			const allowedPurposes = purposes.map(({ id, name }) => {
				return {
					id,
					name,
					allowed: purposeConsents[id]
				};
			});

			this.setState({
				b64,
				allowedVendors,
				disallowedVendors,
				allowedPurposes,
				decodedB64: decodeCookieValue(b64, vendorVersionMap),
				error: ''
			});
		}
		catch (err) {
			this.setState({
				b64,
				allowedVendors: [],
				disallowedVendors: [],
				allowedPurposes: [],
				decodedB64: {},
				error: err.message
			});
		}
	};

	fetchVendorList = () => {
		fetch(GLOBAL_LIST_LOCATION)
			.then(res => res.json())
			.then(list => {
				const { vendors, purposes, vendorListVersion } = list;
				const vendorMap = vendors.reduce((acc, vendor) => {
					return {
						...acc,
						[vendor.id]: vendor
					}
				}, {});
				const purposeMap = purposes.reduce((acc, purpose) => {
					return {
						...acc,
						[purpose.id]: purpose
					}
				}, {});

				this.setState({
					vendors,
					purposes,
					vendorListVersion,
					vendorMap,
					purposeMap
				});
			});
	};

	readCookies = () => {
		this.setState({ localCookie: readCookie(VENDOR_CONSENT_COOKIE_NAME) });
	};

	handleInspectLocal = () => {
		this.decodeB64(this.state.localCookie);
	};

	componentWillMount() {
		this.fetchVendorList();
		this.readCookies();
	}

	render(props, state) {
		const {
			vendorListVersion,
			allowedVendors,
			disallowedVendors,
			allowedPurposes,
			decodedB64,
			b64,
			localCookie,
			error
		} = state;

		return (
			<div class={style.vendorInspector}>
				<div class={style.pageTitle}>
					Vendor Cookie Inspector
				</div>
				<div class={style.cookieInfo}>
					<div class={style.cookieName}>
						euconsent (Local Domain) <button onClick={this.handleInspectLocal}>Inspect</button>
					</div>
					<div class={style.cookieValue}>{localCookie || '(Not Found)'}</div>
					<div class={style.cookieName}>Base64 Cookie Value</div>
					<input class={style.cookieInput} value={b64} onKeyUp={this.handleInputChanged} />
				</div>

				{error ?
					<div class={style.error}>
						{error}
					</div> :

					b64 && <div class={style.decoded}>

						<div class={style.decodedFields}>
							<div class={style.sectionTitle}>Decoded Fields</div>
							<CodeMirror
								className={style.decodedContent}
								value={JSON.stringify(decodedB64, null, 2)}
								options={{
									lineNumbers: true,
									indentWithTabs: true,
									smartIndent: true,
									tabSize: 2,
									mode: 'javascript',
									readOnly: true
								}} />
						</div>


						<div class={style.vendorListTitle}>
							Vendor List Version: {vendorListVersion}
						</div>
						<div class={style.vendorList}>
							<div class={style.allowedVendors}>
								<div class={style.vendorHeader}>Allowed Vendors</div>
								{!allowedVendors.length && <div class={style.empty}>(None)</div>}
								<table>
									<tbody>
									{allowedVendors.map(({ id, name }, index) => (
										<tr class={index % 2 === 0 ? style.even : style.odd}>
											<td>{id}</td>
											<td>{name}</td>
										</tr>
									))}
									</tbody>
								</table>
							</div>
							<div class={style.disallowedVendors}>
								<div class={style.vendorHeader}>Disallowed Vendors</div>
								{!disallowedVendors.length && <div class={style.empty}>(None)</div>}
								<table>
									<tbody>
									{disallowedVendors.map(({ id, name }, index) => (
										<tr class={index % 2 === 0 ? style.even : style.odd}>
											<td>{id}</td>
											<td>{name}</td>
										</tr>
									))}
									</tbody>
								</table>
							</div>
							<div class={style.purposes}>
								<div class={style.vendorHeader}>Purposes</div>
								<table>
									<tbody>
									{allowedPurposes.map(({ id, name, allowed }, index) => (
										<tr class={index % 2 === 0 ? style.even : style.odd}>
											<td>{id}</td>
											<td>{name}</td>
											<td>{allowed ? 'Allowed' : ''}</td>
										</tr>
									))}
									</tbody>
								</table>
							</div>
						</div>
					</div>}
			</div>
		);
	}
}
