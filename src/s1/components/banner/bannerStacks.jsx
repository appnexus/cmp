import { h, Component } from 'preact';
import style from './banner.less';

import PurposeList from './purposeList';
import Label from '../label/label';

import logger, { EVENTS as LOG_EVENTS } from '../../lib/logger';
import debounce from '../../lib/debounce';
import { CONSENT_SCREENS } from '../../constants';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'layer1Stacks',
		isShowing: false,
	};
}

export default class BannerStacks extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		hasScrolled: false,
	};

	componentDidMount() {
		const {
			store: { theme: shouldAutoResizeModal },
		} = this.props;

		if (window && shouldAutoResizeModal) {
			window.addEventListener('resize', this.handleResize);
		}

		if (this.scrollRef) {
			this.scrollRef.addEventListener('scroll', this.handleScroll);
		}

		this.handleResize();
	}

	componentWillUnmount() {
		const {
			store: { theme: shouldAutoResizeModal },
		} = this.props;

		if (window && shouldAutoResizeModal) {
			window.removeEventListener('resize', this.handleResize);
		}

		if (this.scrollRef) {
			this.scrollRef.removeEventListener('scroll', this.handleScroll);
		}

		debounce.clear();
	}

	handleAcceptAll = () => {
		const { store } = this.props;
		const {
			tcModel: { consentScreen },
		} = store;

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'acceptAll',
			label: `screen${consentScreen}`,
		});

		store.toggleAll();
	};

	handleLearnMore = () => {
		const { store } = this.props;
		const {
			tcModel: { consentScreen },
		} = store;

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'learnMore',
			label: `screen${consentScreen}`,
		});

		store.toggleConsentScreen(CONSENT_SCREENS.VENDORS_LAYER3);
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

	handleResize = debounce(() => {
		const { store } = this.props;
		const { maxHeightModal, shouldAutoResizeModal } = store;

		let newMaxHeightModal = maxHeightModal;

		if (shouldAutoResizeModal && this.aboveFoldRef && this.aboveFoldRef.clientHeight) {
			newMaxHeightModal = this.aboveFoldRef.clientHeight + 100;
		}

		store.toggleAutoResizeModal(shouldAutoResizeModal, newMaxHeightModal);
	}, 100);

	handleScroll = debounce(() => {
		this.setState({
			hasScrolled: true,
		});

		if (this.scrollRef) {
			this.scrollRef.removeEventListener('scroll', this.handleScroll);
		}
	});

	render(props, state) {
		const { hasScrolled } = state;
		const { isShowing, store } = props;
		const {
			config: { theme },
			translations,
			displayLayer1,
			isSaveShowing,
			maxHeightModal,
		} = store;

		const {
			isBannerModal,
			isBannerInline,
			// maxHeightModal, // handled in store
			primaryColor,
			primaryTextColor,
			backgroundColor,
			textColor,
			textLightColor,
		} = theme;

		const bannerClasses = [style.banner];
		if (!isShowing) {
			bannerClasses.push(style.hidden);
		}
		if (isBannerModal) {
			bannerClasses.push(style.bannerModal);
		} else if (isBannerInline) {
			bannerClasses.push(style.bannerInline);
		}

		return (
			<div
				class={bannerClasses.join(' ')}
				style={{
					backgroundColor,
					color: textLightColor,
				}}
			>
				<div
					class={[style.content, style.layer1, hasScrolled ? style.scrolling : ''].join(' ')}
					ref={(el) => (this.scrollRef = el)}
					style={{
						maxHeight: maxHeightModal,
					}}
				>
					<div class={style.message}>
						<div class={style.info}>
							<div ref={(el) => (this.aboveFoldRef = el)}>
								<div class={style.title} style={{ color: textColor }}>
									<LocalLabel localizeKey="title" translations={translations}>
										Ads help us run this site
									</LocalLabel>
								</div>
								<div class={style.intro}>
									<LocalLabel localizeKey="description" translations={translations} onClick={this.handleLearnMore}>
										When you visit our site, <a>pre-selected companies</a> may access and use certain information on
										your device and about this site to serve relevant ads or personalized content.
									</LocalLabel>
								</div>
							</div>
							<div class={style.optionsContainer}>
								{!displayLayer1 ? <h1>Loading</h1> : <PurposeList store={store} />}
							</div>
						</div>
					</div>
				</div>
				<navigation class={style.navigation}>
					<a
						class={style.learnMore}
						onClick={this.handleLearnMore}
						style={{ color: primaryColor, borderColor: primaryColor }}
					>
						<LocalLabel localizeKey="links.manage" translations={translations}>
							Manage Your Choices
						</LocalLabel>
					</a>
					<a
						class={style.continue}
						onClick={this.handleAcceptAll}
						style={{
							backgroundColor: primaryColor,
							borderColor: primaryColor,
							color: primaryTextColor,
						}}
					>
						<LocalLabel localizeKey="links.accept" translations={translations}>
							Continue to site
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
				</navigation>
			</div>
		);
	}
}
