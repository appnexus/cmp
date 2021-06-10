import { h, Component } from 'preact';
import style from './banner.less';

import VendorList from './vendorList';
import Label from '../label/label';

import logger, { EVENTS as LOG_EVENTS } from '../../lib/logger';
import { CONSENT_SCREENS } from '../../constants';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'layer3Vendors',
		isShowing: false,
	};
}

export default class BannerVendors extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { store } = this.props;
		setTimeout(() => {
			store.toggleAutoResizeModal(false);
		}, 10);
	}

	handleBack = () => {
		const { store } = this.props;
		const {
			tcModel: { consentScreen },
		} = store;

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'back',
			label: `screen${consentScreen}`,
		});
		store.toggleConsentScreen( CONSENT_SCREENS.STACKS_LAYER1 );
	};

	handleSave = () => {
		const { store } = this.props;

		store.save();

		const {
			tcModel: { consentScreen },
		} = store;

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'save',
			label: `screen${consentScreen}`,
		});
	};

	handleContinue = () => {
		this.handleAcceptAll( 'acceptAllContinue' );
	}

	handleClose = () => {
		this.handleAcceptAll( 'acceptAllClose' );
	}

	handleAcceptAll = ( clickCategory = 'acceptAll' ) => {
		const { store } = this.props;
		const {
			tcModel: { consentScreen },
		} = store;

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: clickCategory,
			label: `screen${consentScreen}`,
		});

		store.toggleAll();
	};

	render(props) {
		const { isShowing, store } = props;
		const {
			config: { theme, shouldShowCloseX, },
			isSaveShowing,
			translations,
			maxHeightModal,		
			minHeightModal
		} = store;

		const { 
			isBannerModal,
			isBannerInline,
			primaryColor,
			primaryTextColor,
			backgroundColor,
			textLightColor,
			isFullWidth,
			shouldShowDropShadow,
			maxHeightInline
		} = theme;

		const bannerClasses = [style.banner];
		if (!isShowing) {
			bannerClasses.push(style.hidden);
		}
		if (!isFullWidth) {
			bannerClasses.push(style.bannerRounded);
		}
		if (shouldShowDropShadow) {
			bannerClasses.push(style.bannerShadow);
		}
		if (isBannerModal) {
			bannerClasses.push(style.bannerModal);
		} else if (isBannerInline) {
			bannerClasses.push(style.bannerInline);
		}

		return (
			<div
				ref={(el) => (this.bannerRef = el)}
				class={bannerClasses.join(' ')}
				style={{
					backgroundColor,
					color: textLightColor,
				}}
			>
				<div
					class={[style.content].join(' ')}
					style={{
						maxHeight: maxHeightModal,
						...(minHeightModal ? { minHeight: minHeightModal } : {}),
					}}
				>
					{ shouldShowCloseX && <div class={style.closeX} onClick={this.handleClose}>&times;</div>}
					<div class={style.message} ref={(el) => (this.messageRef = el)}>
						<div class={style.info}>
							<div class={style.title} style={{ color: theme.textColor }}>
								<LocalLabel localizeKey="title" translations={translations}>
									Who is using this information?
								</LocalLabel>
							</div>
							<div class={style.intro}>
								<LocalLabel localizeKey="description" translations={translations}>
									Depending on the type of data they collect, use, and process and other factors including privacy by
									design, certain partners rely on your consent while others require you to opt-out. For information on
									each vendor and to exercise your choices, see below. Or to opt-out, visit the{' '}
									<a
										href="http://optout.networkadvertising.org/?c=1#!/"
										target="_blank"
										style={{ color: theme.textLinkColor }}
									>
										NAI
									</a>
									,{' '}
									<a href="http://optout.aboutads.info/?c=2#!/" target="_blank" style={{ color: theme.textLinkColor }}>
										DAA
									</a>
									, and{' '}
									<a href="http://youronlinechoices.eu/" target="_blank" style={{ color: theme.textLinkColor }}>
										EDAA
									</a>{' '}
									sites.
								</LocalLabel>
							</div>
							<div class={style.optionsContainer}>{!store ? <h1>Loading</h1> : <VendorList store={store} />}</div>
						</div>
					</div>
				</div>
				<div class={style.navigation}>
					<a
						class={style.learnMore}
						onClick={this.handleBack}
						style={{ color: primaryColor, borderColor: primaryColor }}
					>
						<LocalLabel localizeKey="links.back" translations={translations}>
							Back
						</LocalLabel>
					</a>
					<a
						class={style.continue}
						onClick={this.handleContinue}
						style={{
							backgroundColor: primaryColor,
							borderColor: primaryColor,
							color: primaryTextColor,
						}}
					>
						<LocalLabel localizeKey="links.acceptAll" translations={translations}>
							Accept All
						</LocalLabel>
					</a>
					<a
						class={[style.save, !isSaveShowing ? style.hidden : ''].join(' ')}
						onClick={this.handleSave}
						style={{
							color: primaryColor,
							borderColor: primaryColor,
						}}
					>
						<LocalLabel localizeKey="links.save" translations={translations}>
							Save
						</LocalLabel>
					</a>
				</div>
			</div>
		);
	}
}
