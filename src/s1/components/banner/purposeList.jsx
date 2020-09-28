import { h, Component } from 'preact';
import style from './purposeList.less';

import ChevronIcon from '../chevronicon/chevronicon';
import Switch from '../switch/switch';
import Label from '../label/label';

import logger, { EVENTS as LOG_EVENTS } from '../../lib/logger';
import { CONSENT_SCREENS } from '../../constants';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'layer1Stacks',
		isShowing: false,
	};
}

export default class PurposeList extends Component {
	state = {
		expanded: new Set(),
	};

	expandPurposeRow(id) {
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

	handleVendorsClick = () => {
		const { store } = this.props;
		const {
			tcModel: { consentScreen },
		} = store;

		store.toggleConsentScreen(CONSENT_SCREENS.VENDORS_LAYER3);

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'vendorsList',
			label: `screen${consentScreen}`,
		});
	};

	handleToggleSpecialFeature(props, state, { id }) {
		const { store } = props;
		store.toggleSpecialFeatureOptins([id]);

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'toggleSpecialFeatures',
			label: `${id}`,
		});
	}

	handleTogglePurpose(props, state, { id }) {
		const { store } = props;
		store.togglePurposeConsents([id]);

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'togglePurpose',
			label: `${id}`, // force string
		});
	}

	handleToggleStack(props, state, { id }) {
		const { store } = props;
		store.toggleStackConsent(id);

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'toggleStack',
			label: `${id}`, // force string
		});
	}

	handleToggleObjection(props, state, { id }) {
		const { store } = props;
		store.togglePurposeObjection([id]);

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'togglePurposeObjection',
			label: `${id}`, // force string
		});
	}

	renderRow(
		props,
		state,
		{
			containerClass,
			headline,
			expanded,
			theme,
			list,
			displayPrefix,
			handleConsent,
			handleObjection,
			optIns,
			optInsObjections,
		}
	) {
		return (
			<li class={[style.item, containerClass ? containerClass : ''].join(' ')}>
				{headline}
				<ul class={style.itemPurpose}>
					{list.map((item) => {
						const { name, description, descriptionLegal, id } = item;
						const displayId = `${displayPrefix}-${id}`;
						const isExpanded = expanded.has(displayId);

						return (
							<li
								className={[
									style.itemInteractive,
									isExpanded ? style.expanded : '',
									handleConsent ? style.canConsent : '',
								].join(' ')}
							>
								<a
									style={{ color: theme.textLinkColor }}
									class={[style.itemInteractiveAnchor, isExpanded ? style.detailExpand : ''].join(' ')}
									onClick={this.expandPurposeRow.bind(this, displayId)}
								>
									<ChevronIcon color={theme.textLinkColor} />
									<span style={style.purposeName}>{name}</span>
								</a>
								{handleConsent ? (
									<Switch
										color={theme.primaryColor}
										class={style.switch}
										dataId={displayId}
										isSelected={optIns.has(id)}
										onClick={handleConsent.bind(this, props, state, { id })}
									/>
								) : null}
								<div className={[style.itemDetails].join(' ')} style={{ color: theme.textLightColor }}>
									<p>{description}</p>
									{descriptionLegal ? <p>{descriptionLegal}</p> : null}
									{handleObjection ? (
										<div className={style.objectLegitInterest}>
											<Switch
												color={theme.primaryColor}
												class={style.switch}
												dataId={`objection-${displayId}`}
												isSelected={!optInsObjections.has(id)}
												onClick={handleObjection.bind(this, props, state, { id })}
											>
												<label className={style.legitInterestLabel}>
													Add objection to legitimate interest processing.
												</label>
											</Switch>
										</div>
									) : null}
								</div>
							</li>
						);
					})}
				</ul>
			</li>
		);
	}

	renderStack(
		props,
		state,
		{
			headline,
			name,
			description,
			displayPurposesStackDom,
			displaySpecialFeaturesStackDom,
			displayId,
			id,
			isConsented,
			isExpanded,
			theme,
		}
	) {
		return (
			<li class={[style.item, isExpanded ? style.expanded : ''].join(' ')}>
				{headline}
				<div className={[style.itemInteractive, isExpanded ? style.expanded : '', style.canConsent].join(' ')}>
					<a
						style={{ color: theme.textLinkColor }}
						class={[style.itemInteractiveAnchor, isExpanded ? style.detailExpand : ''].join(' ')}
						onClick={this.expandPurposeRow.bind(this, displayId)}
					>
						<ChevronIcon color={theme.textLinkColor} />
						<span class={style.purposeName}>{name}</span>
					</a>
					<Switch
						color={theme.primaryColor}
						class={style.switch}
						dataId={displayId}
						isSelected={isConsented}
						onClick={this.handleToggleStack.bind(this, props, state, { id })}
					/>
					<div className={[style.itemDetails].join(' ')} style={{ color: theme.textLightColor }}>
						<p>{description}</p>
						{displayPurposesStackDom || displaySpecialFeaturesStackDom ? (
							<ul class={style.stackList}>
								{displayPurposesStackDom || null}
								{displaySpecialFeaturesStackDom || null}
							</ul>
						) : null}
					</div>
				</div>
			</li>
		);
	}

	render(props, state) {
		const { store } = props;
		const {
			gvl,
			displayLayer1,
			config: { theme },
			tcModel,
			translations,
		} = store;

		const { stack: displayStack } = displayLayer1;
		const { features = [], purposes = [], stacks = [], specialFeatures = [], specialPurposes = [] } = gvl;
		const {
			purposes: displayPurposes = [],
			specialFeatures: displaySpecialFeatures = [],
			specialPurposes: displaySpecialPurposes = [],
			features: displayFeatures = [],
			legIntPurposes: displayLegIntPurposes = [],
		} = displayLayer1;
		const { expanded } = state;

		const displayPurposesDom = this.renderRow(props, state, {
			headline: (
				<h3 class={style.rowTitle}>
					<LocalLabel localizeKey="purposesTitle" translations={translations} onClick={this.handleVendorsClick}>
						We and{' '}
						<a style={{ color: theme.textLinkColor }} onClick={this.handleVendorsClick}>
							our partners:
						</a>
					</LocalLabel>
				</h3>
			),
			theme,
			expanded,
			handleConsent: this.handleTogglePurpose,
			optIns: tcModel.purposeConsents,
			list: displayPurposes.map((key) => purposes[key]),
			displayPrefix: 'purpose-',
		});

		let displayStackDom = null;
		if (displayStack && stacks[displayStack]) {
			const stack = stacks[displayStack];
			const stackDisplayId = `stack-${displayStack}`;
			let displayPurposesStackDom = stack.purposes.length
				? this.renderRow(props, state, {
						headline: (
							<h3 class={style.rowTitle}>
								<LocalLabel
									localizeKey="stacksPurposesTitle"
									translations={translations}
									onClick={this.handleVendorsClick}
								>
									Purposes
								</LocalLabel>
							</h3>
						),
						containerClass: style.stackListItem,
						theme,
						expanded,
						handleConsent: this.handleTogglePurpose,
						optIns: tcModel.purposeConsents,
						list: stack.purposes.map((key) => purposes[key]),
						displayPrefix: 'stack-purpose-',
				  })
				: null;

			let displaySpecialFeaturesStackDom = stack.specialFeatures.length
				? this.renderRow(props, state, {
						headline: (
							<h3 class={style.rowTitle}>
								<LocalLabel
									localizeKey="stacksSpecialFeaturesTitle"
									translations={translations}
									onClick={this.handleVendorsClick}
								>
									Special Features
								</LocalLabel>
							</h3>
						),
						containerClass: style.stackListItem,
						theme,
						expanded,
						handleConsent: this.handleToggleSpecialFeature,
						optIns: tcModel.specialFeatureOptins,
						list: stack.specialFeatures.map((key) => specialFeatures[key]),
						displayPrefix: 'stack-special-feature-',
				  })
				: null;

			displayStackDom = this.renderStack(props, state, {
				headline: (
					<h3 class={style.rowTitle}>
						<LocalLabel localizeKey="stacksTitle" translations={translations} onClick={this.handleVendorsClick}>
							We and{' '}
							<a style={{ color: theme.textLinkColor }} onClick={this.handleVendorsClick}>
								our partners
							</a>{' '}
							process personal data such as IP address, unique ID, browsing data for:
						</LocalLabel>
					</h3>
				),
				theme,
				displayId: stackDisplayId,
				isExpanded: expanded.has(stackDisplayId),
				isConsented: store.getStackOptin(displayStack),
				...stacks[displayStack],
				displayPurposesStackDom,
				displaySpecialFeaturesStackDom,
				specialFeaturesList: stacks[displayStack]
					? stacks[displayStack].specialFeatures.map((key) => specialFeatures[key])
					: [],
			});
		}

		const displaySpecialFeaturesDom = this.renderRow(props, state, {
			headline: (
				<h3 class={style.rowTitle}>
					<LocalLabel localizeKey="stacksTitle" translations={translations} onClick={this.handleVendorsClick}>
						For some of the purposes above we and{' '}
						<a style={{ color: theme.textLinkColor }} onClick={this.handleVendorsClick}>
							our partners
						</a>
						:
					</LocalLabel>
				</h3>
			),
			theme,
			expanded,
			handleConsent: this.handleToggleSpecialFeature,
			optIns: tcModel.specialFeatureOptins,
			list: displaySpecialFeatures.map((key) => specialFeatures[key]),
			displayPrefix: 'special-feature-',
		});

		const displaySpecialPurposesDom = this.renderRow(props, state, {
			headline: (
				<h3 class={style.rowTitle}>
					<LocalLabel localizeKey="specialPurposesTitle" translations={translations}>
						We need your consent for all the purposes above but we have a legitimate interest for these purposes:
					</LocalLabel>
				</h3>
			),
			theme,
			expanded,
			list: displaySpecialPurposes.map((key) => specialPurposes[key]),
			displayPrefix: 'special-purpose-',
		});

		const displayFeaturesDom = this.renderRow(props, state, {
			headline: (
				<h3 class={style.rowTitle}>
					<LocalLabel localizeKey="featuresTitle" translations={translations} onClick={this.handleVendorsClick}>
						For some of the purposes above we and{' '}
						<a style={{ color: theme.textLinkColor }} onClick={this.handleVendorsClick}>
							our partners
						</a>
						:
					</LocalLabel>
				</h3>
			),
			theme,
			expanded,
			list: displayFeatures.map((key) => features[key]),
			displayPrefix: 'features-',
		});

		const displayLegitInterestPurposesDom = this.renderRow(props, state, {
			headline: (
				<h3 class={style.rowTitle}>
					<LocalLabel localizeKey="legintPurposesTitle" translations={translations} onClick={this.handleVendorsClick}>
						Some of{' '}
						<a style={{ color: theme.textLinkColor }} onClick={this.handleVendorsClick}>
							our partners
						</a>{' '}
						have service-specific legitimate interest for these purposes:
					</LocalLabel>
				</h3>
			),
			theme,
			expanded,
			handleObjection: this.handleToggleObjection,
			optInsObjections: tcModel.purposeLegitimateInterests,
			list: displayLegIntPurposes.map((key) => purposes[key]),
			displayPrefix: 'purposes-legit-interest-',
		});

		return (
			<ul class={style.purposeList}>
				{displayPurposesDom}
				{displayStackDom}
				{displaySpecialFeaturesDom}
				{displaySpecialPurposesDom}
				{displayFeaturesDom}
				{displayLegitInterestPurposesDom}
			</ul>
		);
	}
}
