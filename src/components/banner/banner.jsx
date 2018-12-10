import { h, Component } from 'preact';
import style from './banner.less';
import Label from '../label/label';
import ChevronIcon from '../chevronicon/chevronicon';
import { SECTION_VENDOR_LIST } from '../popup/details/details';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'banner'
	};
}

class PurposesLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

const PANEL_COLLECTED = 0;
const PANEL_PURPOSE = 1;


export default class Banner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
			selectedPanelIndex: 0,
		};
	}

	handleInfo = (index) => () => {
		const { isExpanded, selectedPanelIndex } = this.state;
		this.setState({
			selectedPanelIndex: index,
			isExpanded: index !== selectedPanelIndex || !isExpanded
		});
	};

	handleWindowClick = e => {
		if (!this.bannerRef || !this.bannerRef.contains(e.target)) {
			this.props.onSave();
		}
	};

	handleLearnMore = () => {
		this.props.onShowModal(true);
	};

	handlePurposeItemClick = purposeItem => {
		return () => {
			this.props.onSelectPurpose(purposeItem);
		};
	};

	handleVendorListClick = () => {
		this.props.onChangeDetailsPanel(SECTION_VENDOR_LIST);
	};

	render(props, state) {
		const { isShowing, onSave, theme, purposes } = props;
		const { selectedPanelIndex, isExpanded } = state;
		const {
			primaryColor,
			primaryTextColor,
			backgroundColor,
			textColor,
			textLightColor,
			textLinkColor,
		} = theme;

		return (
			<div
				ref={el => this.bannerRef = el}
				class={[style.banner, !isShowing ? style.hidden : ''].join(' ')}
				style={{
					boxShadow: `0px 0px 5px ${primaryColor}`,
					backgroundColor: backgroundColor,
					color: textLightColor
				}}
			>
				<div class={style.content}>
					<div
						class={style.message}
						ref={el => this.messageRef = el}
					>
						<div class={style.info}>
							<div class={style.title} style={{ color: textColor }}>
								<LocalLabel localizeKey='title'>Ads help us run this site</LocalLabel>
							</div>
							<LocalLabel localizeKey='description'>
								When you visit our site, <a onClick={this.handleVendorListClick}>pre-selected companies</a> may access and use certain
								information on your device and about this site to serve relevant ads or personalized content.
							</LocalLabel>
							<div class={style.options}>
								<div
									class={[style.option, selectedPanelIndex === PANEL_COLLECTED && isExpanded ? style.expanded : ''].join(' ')}>
									<a
										onClick={this.handleInfo(PANEL_COLLECTED)}
										class={style.detailExpand}
									>
										<ChevronIcon color={textLinkColor}/>
										<LocalLabel localizeKey='links.data.title'>Information that may be
											used
										</LocalLabel>
									</a>
									<div
										className={style.optionDetails}
										style={{ color: textLightColor }}
									>
										<LocalLabel localizeKey='links.data.description'>
											<ul>
												<li>Type of browser and its settings</li>
												<li>Information about the device's operating system</li>
												<li>Cookie information</li>
												<li>Information about other identifiers assigned to the device</li>
												<li>The IP address from which the device accesses a client's website or
													mobile application
												</li>
												<li>Information about the user's activity on that device, including web
													pages and mobile apps visited or used
												</li>
												<li>Information about the geographic location of the device when it
													accesses
													a website or mobile application
												</li>
											</ul>
										</LocalLabel>
									</div>
								</div>
								<div
									class={[style.option, selectedPanelIndex === PANEL_PURPOSE && isExpanded ? style.expanded : ''].join(' ')}>
									<a
										onClick={this.handleInfo(PANEL_PURPOSE)}
										class={style.detailExpand}
									>
										<ChevronIcon color={textLinkColor} />
										<LocalLabel localizeKey='links.purposes.title'>Purposes for storing
											information</LocalLabel>
									</a>

									<div
										class={style.optionDetails}
										style={{ color: textLightColor }}
									>
										<ul>
											{purposes.map((purposeItem, index) => (
												<li class={style.purposeItem}>
													<a class={style.learnMore} onClick={this.handlePurposeItemClick(purposeItem)} style={{color: textLinkColor}}>
														<PurposesLabel localizeKey={`purpose${purposeItem.id}.menu`}>{purposeItem.name}</PurposesLabel>
													</a>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class={style.consent}>
							<a class={style.learnMore} onClick={this.handleLearnMore}
							   style={{ color: primaryColor, borderColor: primaryColor }}>
								<LocalLabel localizeKey='links.manage'>Manage Your Choices</LocalLabel>
							</a>
							<a
								class={style.continue}
								onClick={onSave}
								style={{
									backgroundColor: primaryColor,
									borderColor: primaryColor,
									color: primaryTextColor
								}}
							>
								<LocalLabel localizeKey='links.accept'>Continue to site</LocalLabel>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
