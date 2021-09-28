import { h, Component } from 'preact';
import style from './intro.less';
import Button from '../../button/button';
import Label from '../../label/label';
import CloseButton from '../../closebutton/closebutton';
import TranslationSelectize from '../../translationselectize/translationselectize';
import { translations } from '../../../lib/translations';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'intro'
	};
}

export default class Intro extends Component {
	state = {
		lang: translations.currentLang
	};

	static defaultProps = {};

	changeState = lang => {
		this.setState({
			lang
		});
	};

	render(props) {

		const {
			onAcceptAll,
			onShowPurposes
		} = props;

		return (
			<div class={style.intro}>
				<div class={style.closeSection}>
					<TranslationSelectize onChange={this.changeState}/>
					<CloseButton
						class={style.close}
						onClick={onAcceptAll}
						prefix={LocalLabel.defaultProps.prefix}
					/>
				</div>
				<div class={style.portalLogo}></div>
				<div class={style.owner}>
					<LocalLabel localizeKey='ownerLabel' collapseEmpty={true}></LocalLabel>
				</div>
				<div class={style.title}>
					<LocalLabel localizeKey='title'>Thanks for visiting</LocalLabel>
				</div>
				<div class={style.description}>
					<LocalLabel localizeKey='description'>In order to run a successful website, we and certain third parties are setting cookies and accessing and storing information on your device for various purposes. Various third parties are also collecting data to show you personalized content and ads. Some third parties require your consent to collect data to serve you personalized content and ads.</LocalLabel>
				</div>
				<div class={style.options}>
					<Button
						ariaLabel='go to advanced settings'
						class={style.rejectAll}
						invert={true}
						onClick={onShowPurposes}
					>
						<LocalLabel localizeKey='showPurposes'>Manage your choices</LocalLabel>
					</Button>
					<Button
						ariaLabel='accept and close'
						class={style.acceptAll}
						onClick={onAcceptAll}
					>
						<LocalLabel localizeKey='acceptAll'>Got it, thanks!</LocalLabel>
					</Button>
				</div>
			</div>
		);
	}
}
