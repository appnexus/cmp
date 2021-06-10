import { h, Component } from 'preact';
import style from './banner.less';

import Label from '../label/label';

import logger, { EVENTS as LOG_EVENTS } from '../../lib/logger';
import debounce from '../../lib/debounce';
import { CONSENT_SCREENS } from '../../constants';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'layer0Slim',
		isShowing: false,
	};
}

export default class BannerSlim extends Component {
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

		store.toggleConsentScreen(CONSENT_SCREENS.STACKS_LAYER1);
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
		const { maxHeightModal, shouldAutoResizeModal} = store;

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
			config: { theme, shouldShowCloseX},
			translations,
			maxHeightModal,
			minHeightModal
		} = store;

		const {
			isBannerModal,
			isBannerInline,
			isFullWidth,
			maxWidthModal,
			maxHeightInline,
			// maxHeightModal, // handled in store
			// minHeightModal, // handled in store
			primaryColor,
			primaryTextColor,
			backgroundColor,
			textColor,
			textLightColor,
			shouldShowDropShadow,
		} = theme;

		const bannerClasses = [style.banner, style.bannerSlim];
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

		const maxHeightStr = (isBannerInline && maxHeightInline ? `min(${maxHeightInline}, ${isNaN(maxHeightModal) ? maxHeightModal : maxHeightModal + 'px'})` : maxHeightModal);

		return (
			<div
				class={bannerClasses.join(' ')}
				style={{
					backgroundColor,
					color: textLightColor,
					...(maxWidthModal ? { maxWidth: maxWidthModal } : {}),
					...( isBannerInline ? { maxHeight: (isShowing ? maxHeightModal : 0) } : {}),
					// ...(minHeightModal ? { minHeight: minHeightModal } : {}),
				}}
			>
				<div
					class={[style.content, style.layer1, style.animated, hasScrolled ? style.scrolling : ''].join(' ')}
					ref={(el) => (this.scrollRef = el)}
					style={{
						maxHeight: maxHeightStr,
						minHeight: minHeightModal
					}}
				>
					{ shouldShowCloseX && <div class={style.closeX} onClick={this.handleClose}>&times;</div>}
					<div class={style.message}>
						<div class={style.info}>
							<div ref={(el) => (this.aboveFoldRef = el)}>
								<div class={style.title} style={{ color: textColor }}>
									<LocalLabel localizeKey="title" translations={translations}>
										We Value Your Privacy &amp; Choices
									</LocalLabel>
								</div>
								<div class={style.intro}>
									<LocalLabel localizeKey="description" translations={translations} onClick={this.handleLearnMore} theme={theme}>
									We and our partners use cookies and other technologies to store and/or access information on or from your device (with or without your permission, depending on the type of data) while you use this site, in order to personalize ads and content, analyze or measure site usage, and develop audience insights. You can learn more and change or manage your consent setting preferences via the "manage preferences" link or visiting our "privacy policy".
									</LocalLabel>
								</div>
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
							Learn More
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
						<LocalLabel localizeKey="links.accept" translations={translations}>
							OK, Got It
						</LocalLabel>
					</a>					
				</navigation>
			</div>
		);
	}
}
