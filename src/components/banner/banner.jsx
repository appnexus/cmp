import { h, Component } from 'preact';
import style from './banner.less';
import Label from '../label/label';
import Panel from '../panel/panel';
import ChevronIcon from '../chevronicon/chevronicon';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'banner'
	};
}

const PANEL_COLLECTED = 0;
const PANEL_PURPOSE = 1;

const BANNER_OFFSET = 20;

export default class Banner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
			selectedPanelIndex: 0,
		};
	}

	handleInfo = (index) => () => {
		const {isExpanded, selectedPanelIndex} = this.state;
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

	calculateBannerHeight = () => {
		const {isExpanded} = this.state;
		const {isShowing} = this.props;
		const {bannerRef, messageRef} = this;
		if (bannerRef) {
			const bannerHeight = bannerRef.getBoundingClientRect().height;
			const messageHeight = messageRef.getBoundingClientRect().height;
			let bannerBottom = 0;
			if (!isExpanded && isShowing) {
				bannerBottom = messageHeight - bannerHeight;
			}
			else if (!isShowing) {
				bannerBottom = -bannerHeight - BANNER_OFFSET;
			}

			if (bannerBottom !== this.state.bannerBottom) {
				this.setState({bannerBottom});
			}
		}
	};

	render(props, state) {
		const {isShowing, onSave} = props;
		const {selectedPanelIndex, bannerBottom, isExpanded} = state;
		this.calculateBannerHeight();

		return (
			<div
				ref={el => this.bannerRef = el}
				class={style.banner}
				style={{bottom: `${bannerBottom}px`}}
			>
				<div class={style.content}>
					<div
						class={style.message}
						ref={el => this.messageRef = el}
					>
						<div class={style.title}>
						Ads help us run this site
						</div>
						When you visit our site, pre-selected companies may access and use certain information on your device to serve relevant ads or personalized content.

						<div class={style.info}>
							<a onClick={this.handleInfo(PANEL_COLLECTED)}>
								<ChevronIcon class={[style.expand, selectedPanelIndex === PANEL_COLLECTED && isExpanded ? style.expanded : ''].join(' ')}  />
							</a>Information that may be used.
							<a onClick={this.handleInfo(PANEL_PURPOSE)}>
								<ChevronIcon class={[style.expand, selectedPanelIndex === PANEL_PURPOSE && isExpanded ? style.expanded : ''].join(' ')}  />
							</a>
							Purposes for storing information.
							<a onClick={this.handleLearnMore}>Learn More</a>
							<a onClick={onSave}>Continue to site</a>
						</div>
					</div>
					<Panel
						selectedIndex={selectedPanelIndex}
						class={style.infoExpanded}>
						<div class={style.infoExpanded}>
							Information that may be used:
							<ul>
								<li>Type of browser and its settings</li>
								<li>Information about the device's operating system</li>
								<li>Cookie information</li>
								<li>Information about other identifiers assigned to the device</li>
								<li>The IP address from which the device accesses a client's website or mobile application</li>
								<li>Information about the user's activity on that device, including web pages and mobile apps visited or used</li>
								<li>Information about the geographic location of the device when it accesses a website or mobile application</li>
							</ul>
						</div>
						<div class={style.infoExpanded}>
							How information may be used:
							<ul>
								<li>Storage and access of information</li>
								<li>Ad selection and delivery</li>
								<li>Content selection and delivery</li>
								<li>Personalization</li>
								<li>Measurement</li>
							</ul>
						</div>
					</Panel>
				</div>
			</div>
		);
	}
}
