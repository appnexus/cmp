import { h, Component } from 'preact';
import style from './banner.less';
import Label from '../label/label';
import ChevronIcon from '../chevronicon/chevronicon';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'banner'
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

	// Ensures the right aligned buttons are centered vertically but won't slide around when options are expanded.
	calculateButtonOffset = () => {
		const {messageRef} = this;

		if (messageRef) {
			const height = messageRef.getBoundingClientRect().height;
			const buttonOffset = (height - 48) / 2;

			if (!this.state.buttonOffset) {
				this.setState({buttonOffset});
			}
		}
	};

	render(props, state) {
		const {isShowing, onSave} = props;
		const {selectedPanelIndex, buttonOffset, isExpanded} = state;
		this.calculateButtonOffset();

		return (
			<div
				ref={el => this.bannerRef = el}
				class={style.banner}
			>
				<div class={style.content}>
					<div
						class={style.message}
						ref={el => this.messageRef = el}
					>
						<div class={style.info}>
							<div class={style.title}>
							Ads help us run this site
							</div>
							When you visit our site, pre-selected companies may access and use certain information on your device to serve relevant ads or personalized content.

							<div class={style.options}>
								<div class={[style.option, selectedPanelIndex === PANEL_COLLECTED && isExpanded ? style.expanded : ''].join(' ')}>
									<a onClick={this.handleInfo(PANEL_COLLECTED)}>
										<ChevronIcon />
										Information that may be used.
									</a>

									<div class={style.optionDetails}>
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
								</div>
								<div class={[style.option, selectedPanelIndex === PANEL_PURPOSE && isExpanded ? style.expanded : ''].join(' ')}>
									<a onClick={this.handleInfo(PANEL_PURPOSE)}>
										<ChevronIcon />
										Purposes for storing information.
									</a>

									<div class={style.optionDetails}>
										<ul>
											<li>Storage and access of information</li>
											<li>Ad selection and delivery</li>
											<li>Content selection and delivery</li>
											<li>Personalization</li>
											<li>Measurement</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class={style.consent}>
							<a
								class={style.learnMore}
								onClick={this.handleLearnMore}
								style={{top: `${buttonOffset}px`}}
							>
								Learn More
							</a>
							<a
								class={style.continue}
								onClick={onSave}
								style={{top: `${buttonOffset}px`}}
							>
								Continue to site
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
