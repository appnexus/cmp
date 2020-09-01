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
		const { expanded } = this.state;
		if (expanded.has(id)) {
			expanded.delete(id);
		} else {
			expanded.add(id);
		}

		this.setState({
			expanded,
		});
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

	renderRow(props, state, { headline, expanded, theme, list, displayPrefix, handleConsent, optIns }) {
		return (
			<li class={style.item}>
				{headline}
				<ul class={style.itemPurpose}>
					{list.map((item) => {
						const { name, description, id } = item;
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
								</div>
							</li>
						);
					})}
				</ul>
			</li>
		);
	}

	renderStack(props, state, { headline, name, description, isConsented, id, displayId, isExpanded, theme }) {
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

		const stackDisplayId = `stack-${displayStack}`;
		const displayStackDom = displayStack
			? this.renderStack(props, state, {
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
			  })
			: null;

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

		return (
			<ul class={style.purposeList}>
				{displayPurposesDom}
				{displayStackDom}
				{displaySpecialFeaturesDom}
				{displaySpecialPurposesDom}
				{displayFeaturesDom}
			</ul>
		);
	}
}
