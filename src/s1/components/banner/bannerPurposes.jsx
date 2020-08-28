import { h, Component } from 'preact';
import style from './banner.less';

import Label from '../label/label';

import logger, { EVENTS as LOG_EVENTS } from '../../lib/logger';
import { CONSENT_SCREENS } from '../../constants';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes',
		isShowing: false,
	};
}

export default class BannerPurposes extends Component {
	constructor(props) {
		super(props);
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
		store.toggleConsentScreen(CONSENT_SCREENS.STACKS_LAYER1);
	};

	render(props) {
		const { isShowing, store } = props;
		const {
			config: { theme },
			isSaveShowing,
		} = store;

		const {
			isBannerModal,
			isBannerInline,
			maxHeightModal,
			primaryColor,
			primaryTextColor,
			backgroundColor,
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
				ref={(el) => (this.bannerRef = el)}
				class={bannerClasses.join(' ')}
				style={{
					backgroundColor,
					color: textLightColor,
				}}
			>
				<div
					class={style.content}
					style={{
						...(maxHeightModal ? { maxHeight: maxHeightModal } : {}),
					}}
				>
					<div class={style.message} ref={(el) => (this.messageRef = el)}>
						<div class={style.info}>
							<div class={style.consent}>
								<a
									class={style.learnMore}
									onClick={this.handleBack}
									style={{ color: primaryColor, borderColor: primaryColor }}
								>
									<LocalLabel localizeKey="links.back">Back</LocalLabel>
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
									<LocalLabel localizeKey="links.accept">Continue to site</LocalLabel>
								</a>
								<a
									class={[style.save, !isSaveShowing ? style.hidden : ''].join(' ')}
									onClick={this.handleSave}
									style={{
										color: primaryColor,
										borderColor: primaryColor,
									}}
								>
									<LocalLabel localizeKey="links.save">Save</LocalLabel>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
