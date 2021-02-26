import { h, Component } from 'preact';
import style from './purposeList.less';

import ChevronIcon from '../chevronicon/chevronicon';
import Switch from '../switch/switch';
import ExternalLinkIcon from '../externallinkicon/externallinkicon';
import Label from '../label/label';
import { lookup, secondsToNearestInt } from '../../lib/localize';

import logger, { EVENTS as LOG_EVENTS } from '../../lib/logger';

const LOCAL_PREFIX = 'layer3Vendors';
class LocalLabel extends Label {
	static defaultProps = {
		prefix: LOCAL_PREFIX,
		isShowing: false,
	};
}

export default class VendorList extends Component {
	state = {
		expanded: new Set(),
	};

	expandRow(id) {
		const { store } = this.props;
		const { expanded } = this.state;
		if (expanded.has(id)) {
			expanded.delete(id);
		} else {
			expanded.add(id);
		}

		this.setState({
			expanded,
		});

		store.toggleAutoResizeModal(false);
	}

	handleConsent(props, state, { id }) {
		const { store } = props;
		store.toggleVendorConsents([id]);

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'toggleVendor',
			label: `${id}`, // force string
		});
	}

	handleObjection(props, state, { id }) {
		const { store } = props;
		store.toggleVendorObjection([id]);

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'toggleVendorObjection',
			label: `${id}`, // force string
		});
	}

	renderRow(
		props,
		state,
		{ headline, expanded, theme, list, displayPrefix, handleConsent, handleObjection, optIns, optInsObjections }
	) {
		const { store } = this.props;
		const { gvl, translations } = store;
		const {
			purposes: globalPurposes,
			specialPurposes: globalSpecialPurposes,
			specialFeatures: globalSpecialFeatures,
			features: globalFeatures,
		} = gvl;

		return (
			<li class={style.item}>
				{headline}
				<ul class={[style.itemPurpose].join(' ')}>
					{list.map((item) => {
						const {
							cookieMaxAgeSeconds,
							name,
							id,
							policyUrl,
							purposes = [],
							legIntPurposes = [],
							specialPurposes = [],
							specialFeatures = [],
							features = [],
						} = item;
						const displayId = `${displayPrefix}-${id}`;
						const isExpanded = expanded.has(displayId);
						const canConsent = handleConsent && (purposes.length || specialFeatures.length);
						const {unit: maxAgeUnit, value: maxAgeUnitVal} = secondsToNearestInt(cookieMaxAgeSeconds);

						return (
							<li
								className={[
									style.itemInteractive,
									isExpanded ? style.expanded : '',
									canConsent ? style.canConsent : '',
								].join(' ')}
							>
								<a
									style={{ color: theme.textLinkColor }}
									class={[style.itemInteractiveAnchor, isExpanded ? style.detailExpand : ''].join(' ')}
									onClick={this.expandRow.bind(this, displayId)}
								>
									<ChevronIcon color={theme.textLinkColor} />
									<span className={style.detailName}>
										{name} <small class={style.reference}>(#{id})</small>
									</span>
								</a>
								{canConsent ? (
									<Switch
										color={theme.primaryColor}
										class={style.switch}
										dataId={displayId}
										isSelected={optIns.has(id)}
										onClick={handleConsent.bind(this, props, state, { id })}
									/>
								) : (
									<span>Requires Opt-out</span>
								)}
								{isExpanded && (
									<div
										className={[style.itemDetails, style.vendorDetails].join(' ')}
										style={{ color: theme.textLightColor }}
									>
										<p>
											<a
												class={style.privacyPolicy}
												href={policyUrl}
												target="_blank"
												title={`Privacy Policy for ${name}`}
											>
												<LocalLabel localizeKey="privacy" translations={translations}>
													Privacy Policy:
												</LocalLabel>
												<span>{policyUrl}</span>
												<ExternalLinkIcon color={theme.textLinkColor} />
											</a>
										</p>

										{purposes.length > 0 && (
											<div>
												<h4>
													{lookup({
														label: 'Purposes (Consent)',
														prefix: LOCAL_PREFIX,
														localizeKey: 'purposesConsent',
														translations,
													})}
												</h4>
												<ul>
													{purposes
														.filter((key) => !legIntPurposes.includes(key))
														.map((key) => {
															const { name: purposeName } = globalPurposes[key];
															return <li>{purposeName}</li>;
														})}
												</ul>
											</div>
										)}

										{specialPurposes.length > 0 && (
											<div>
												<h4>Special Purposes</h4>
												<ul>
													{specialPurposes.map((key) => {
														const { name: purposeName } = globalSpecialPurposes[key];
														return <li>{purposeName}</li>;
													})}
												</ul>
											</div>
										)}

										{features.length > 0 && (
											<div>
												<h4>Features</h4>
												<ul>
													{features.map((key) => {
														const { name: featureName } = globalFeatures[key];
														return <li>{featureName}</li>;
													})}
												</ul>
											</div>
										)}

										{specialFeatures.length > 0 && (
											<div>
												<h4>Special Features</h4>
												<ul>
													{specialFeatures.map((key) => {
														const { name: featureName } = globalSpecialFeatures[key];
														return <li>{featureName}</li>;
													})}
												</ul>
											</div>
										)}

										{legIntPurposes.length > 0 && (
											<div>
												<h4>
													<LocalLabel localizeKey="purposesLegit" translations={translations}>
													Purposes (Legitimate Interest)
													</LocalLabel>
												</h4>
												<ul>
													{legIntPurposes.map((key) => {
														const { name: purposeName } = globalPurposes[key];
														return <li>{purposeName}</li>;
													})}
												</ul>
												<div className={style.objectLegitInterest}>
													<Switch
														color={theme.primaryColor}
														class={style.switch}
														dataId={displayId}
														isSelected={!optInsObjections.has(id)}
														onClick={handleObjection.bind(this, props, state, { id })}
													>
														<label className={style.legitInterestLabel}>
															Add objection to legitimate interest processing.
														</label>
													</Switch>
												</div>
											</div>
										)}
										<div>
											<h4>
												<LocalLabel localizeKey="deviceStorage" translations={translations}>
													Device Storage:
												</LocalLabel>
											</h4>
											<p>
												{` ${name} `}
												{cookieMaxAgeSeconds > 0 ?
													(
														<span>
															<LocalLabel localizeKey="deviceStorageMax" translations={translations}>
																stores cookies with a maximum duration of about
															</LocalLabel>
															{` ${maxAgeUnitVal} `}
															<LocalLabel localizeKey={`deviceStorageUnit${maxAgeUnit.replace(/^./, str => str.toUpperCase())}`} translations={translations}>
																{maxAgeUnit}
															</LocalLabel>
															{` (${cookieMaxAgeSeconds.toLocaleString()} `}
															<LocalLabel localizeKey="deviceStorageUnitSeconds" translations={translations}>
																seconds
															</LocalLabel>
															)
														</span>
													) :
													(
														<LocalLabel localizeKey="deviceStorageMin" translations={translations}>
															stores cookies for the duration of your browsing session.
														</LocalLabel>
													)
												}
											</p>
										</div>
									</div>
								)}
							</li>
						);
					})}
				</ul>
			</li>
		);
	}

	render(props, state) {
		const { store } = props;
		const {
			config: { theme },
			tcModel,
			gvl,
			translations,
		} = store;

		const { vendorConsents, vendorLegitimateInterests } = tcModel;

		const { vendors } = gvl;

		const { expanded } = state;

		const displayVendorsDom = this.renderRow(props, state, {
			headline: (
				<h3 class={style.rowTitle}>
					<LocalLabel localizeKey="partnersTitle" translations={translations}>
						Partners who are part of the IAB TCF
					</LocalLabel>
				</h3>
			),
			theme,
			expanded,
			handleConsent: this.handleConsent,
			handleObjection: this.handleObjection,
			optIns: vendorConsents,
			optInsObjections: vendorLegitimateInterests,
			list: Object.keys(vendors).map((key) => vendors[key]),
			// .sort((a, b) => {
			// 	var nameA = a.name.toUpperCase(); // ignore upper and lowercase
			// 	var nameB = b.name.toUpperCase(); // ignore upper and lowercase
			// 	if (nameA < nameB) {
			// 		return -1;
			// 	}
			// 	if (nameA > nameB) {
			// 		return 1;
			// 	}
			// 	// names must be equal
			// 	return 0;
			// }),
			displayPrefix: 'vendors-',
		});

		return <ul class={style.purposeList}>{displayVendorsDom}</ul>;
	}
}
