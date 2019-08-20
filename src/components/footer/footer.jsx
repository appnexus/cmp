import { h, Component } from "preact";
import style from "./footer.less";
import Label from "../label/label";
import CloseButton from "../closebutton/closebutton";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: "footer"
	};
}

export default class Footer extends Component {
	static defaultProps = {
		onShowConsent: () => {}
	};

	handleClose = () => {
		const { store } = this.props;
		const { toggleFooterShowing } = store;
		toggleFooterShowing(false);
	};

	handleShowConsent = () => {
		const { store } = this.props;
		const { toggleConsentToolShowing } = store;
		toggleConsentToolShowing(true);
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

	render(props) {
		const { store } = props;
		const { isFooterShowing } = store;

		return (
			<div
				class={style.footer}
				style={{ display: isFooterShowing ? "flex" : "none" }}
			>
				<CloseButton
					hasBorder={false}
					class={style.close}
					onClick={this.onAcceptAll}
				/>
				<div>
					<LocalLabel localizeKey="message" class={style.title}>
						<h2>We Value Privacy</h2>
					</LocalLabel>
					<div class={style.descriptionRow}>
						<LocalLabel localizeKey="description" class={style.message}>
							<span>
								To help make this website better, to personalize and enhance
								your content experience, for advertising purposes and to analyze
								our traffic, we and our partners use technology such as cookies,
								pixels, and/or beacons to collect certain data. By
								continuing to use the site or clicking “OK”, you agree to the
								use of this technology and collecting the data.
							</span>
						</LocalLabel>
						<div class={style.privacyRow}>
							<LocalLabel localizeKey="privacyPolicy" class={style.message}>
								<span>
									Please visit our
									<a target="_blank" href="http://system1.com/terms/privacy.html">
										Privacy Policy
									</a>
									to learn more about how we collect and use data. You can modify
									your settings at any time by clicking
								</span>
							</LocalLabel>
							<a class={style.modalLink} onClick={this.handleShowConsent}>
								<LocalLabel localizeKey="privacyPolicyButton">
									Manage Privacy Settings
								</LocalLabel>
							</a>
						</div>
					</div>
				</div>
				<div class={style.consentRow}>
					<a class={style.consentBtn} onClick={this.onAcceptAll}>
						<LocalLabel localizeKey="consentLink">OK</LocalLabel>
					</a>
				</div>
			</div>
		);
	}
}
