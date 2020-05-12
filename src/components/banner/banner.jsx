import { h, Component } from 'preact';
import style from './banner.less';
import Label from '../label/label';
import ChevronIcon from '../chevronicon/chevronicon';
import { SECTION_VENDOR_LIST } from '../popup/details/details';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'banner',
	};
}

class PurposesLabel extends Label {
	static defaultProps = {
		prefix: 'purposes',
	};
}

const PANEL_COLLECTED = 0;
const PANEL_PURPOSE = 1;

export default class Banner extends Component {
	constructor(props) {
		super(props);
		const {
			theme: { shouldExpandPurposes = true },
		} = props;
		this.state = {
			isExpanded: shouldExpandPurposes,
			selectedPanelIndex: 1,
		};
	}

	componentDidMount = () => {
		document.addEventListener('keydown', this.onKeyDown);
		document.addEventListener('click', this.handleWindowClick);
	};

	componentWillUnmount = () => {
		document.removeEventListener('keydown', this.onKeyDown);
		document.removeEventListener('click', this.handleWindowClick);
	};

	onKeyDown = (evt) => {
		evt = evt || window.event;
		const { key = '', keyCode = '' } = evt;
		const isEscape = key === 'Escape' || key === 'Esc' || keyCode === 27;
		if (isEscape) {
			this.onAcceptAll();
		}
	};

	handleClose = () => {
		const { store } = this.props;
		const { toggleFooterShowing } = store;
		toggleFooterShowing(false);
	};

	handleShowConsent = () => {
		const { store, onShowModal } = this.props;
		const { toggleConsentToolShowing } = store;
		toggleConsentToolShowing(true);
		onShowModal(true);
	};

	onAcceptAll = () => {
		const { store, onSave } = this.props;
		const { toggleFooterShowing } = store;
		store.selectAllVendors(true);
		store.selectAllPurposes(true);
		store.selectAllCustomPurposes(true);
		onSave();
		toggleFooterShowing(false);
	};

	handleInfo = (index) => () => {
		const { isExpanded, selectedPanelIndex } = this.state;
		this.setState({
			selectedPanelIndex: index,
			isExpanded: index !== selectedPanelIndex || !isExpanded,
		});
	};

	handleWindowClick = (e) => {
		if (this.bannerRef === e.target) {
			this.onAcceptAll();
		}
	};

	handleLearnMore = () => {
		this.handleShowConsent();
	};

	handlePurposeItemClick = (purposeItem) => {
		return () => {
			this.props.onSelectPurpose(purposeItem);
		};
	};

	handleVendorListClick = () => {
		this.props.onChangeDetailsPanel(SECTION_VENDOR_LIST);
	};

	render(props, state) {
		const { isShowing, theme, purposes } = props;
		const { selectedPanelIndex, isExpanded } = state;

		const {
			isBannerModal,
			isBannerInline,
			boxShadow,
			primaryColor,
			primaryTextColor,
			backgroundColor,
			textColor,
			textLightColor,
			textLinkColor,
		} = theme;

		const {} = theme;

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
					boxShadow: boxShadow || `0px 0px 5px ${primaryColor}`,
					backgroundColor,
					color: textLightColor,
				}}
			>
				<div class={style.content}>
					<div class={style.message} ref={(el) => (this.messageRef = el)}>
						<div class={style.info}>
							<div class={style.title} style={{ color: textColor }}>
								<LocalLabel localizeKey="title">Ads help us run this site</LocalLabel>
							</div>
							<div class={style.intro}>
								<LocalLabel localizeKey="description">
									When you visit our site, <a onClick={this.handleVendorListClick}>pre-selected companies</a> may access
									and use certain information on your device and about this site to serve relevant ads or personalized
									content.
								</LocalLabel>
							</div>
							<div class={style.consent}>
								<a
									class={style.learnMore}
									onClick={this.handleLearnMore}
									style={{ color: primaryColor, borderColor: primaryColor }}
								>
									<LocalLabel localizeKey="links.manage">Manage Your Choices</LocalLabel>
								</a>
								<a
									class={style.continue}
									onClick={this.onAcceptAll}
									style={{
										backgroundColor: primaryColor,
										borderColor: primaryColor,
										color: primaryTextColor,
									}}
								>
									<LocalLabel localizeKey="links.accept">Continue to site</LocalLabel>
								</a>
							</div>
							<div class={style.options}>
								<div
									class={[
										style.option,
										selectedPanelIndex === PANEL_COLLECTED && isExpanded ? style.expanded : '',
									].join(' ')}
								>
									<a onClick={this.handleInfo(PANEL_COLLECTED)} class={style.detailExpand}>
										<ChevronIcon color={textLinkColor} />
										<LocalLabel localizeKey="links.data.title">Information that may be used</LocalLabel>
									</a>
									<div className={style.optionDetails} style={{ color: textLightColor }}>
										<LocalLabel localizeKey="links.data.description">
											<ul>
												<li>Type of browser and its settings</li>
												<li>Information about the device's operating system</li>
												<li>Cookie information</li>
												<li>Information about other identifiers assigned to the device</li>
												<li>The IP address from which the device accesses a client's website or mobile application</li>
												<li>
													Information about the user's activity on that device, including web pages and mobile apps
													visited or used
												</li>
												<li>
													Information about the geographic location of the device when it accesses a website or mobile
													application
												</li>
											</ul>
										</LocalLabel>
									</div>
								</div>
								<div
									class={[style.option, selectedPanelIndex === PANEL_PURPOSE && isExpanded ? style.expanded : ''].join(
										' '
									)}
								>
									<a onClick={this.handleInfo(PANEL_PURPOSE)} class={style.detailExpand}>
										<ChevronIcon color={textLinkColor} />
										<LocalLabel localizeKey="links.purposes.title">Purposes for storing information</LocalLabel>
									</a>
									<div class={style.optionDetails} style={{ color: textLightColor }}>
										<ul>
											{purposes.map((purposeItem, index) => (
												<li class={style.purposeItem}>
													<a
														class={style.learnMore}
														onClick={this.handlePurposeItemClick(purposeItem)}
														style={{ color: textLinkColor }}
													>
														<PurposesLabel localizeKey={`purpose${purposeItem.id}.menu`}>
															{purposeItem.name}
														</PurposesLabel>
													</a>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
