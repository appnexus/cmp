import { h, Component } from 'preact';
import style from './intro.less';
import Button from '../../button/button';
import Label from '../../label/label';
import CloseButton from '../../closebutton/closebutton';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'intro'
	};
}

export default class Intro extends Component {

	static defaultProps = {};

	render(props, state) {

		const {
			onAcceptAll,
			onShowPurposes,
		} = props;

		return (
			<div class={style.intro}>
				<CloseButton
					class={style.close}
					onClick={onAcceptAll}
				/>
				<div class={style.title}>
					<LocalLabel localizeKey='title'>Thanks for visiting</LocalLabel>
				</div>
				<div class={style.description}>
					<LocalLabel localizeKey='description'>In order to run a successful website, we and certain third parties are setting cookies and accessing and storing information on your device for various purposes. Various third parties are also collecting data to show you personalized content and ads. Some third parties require your consent to collect data to serve you personalized content and ads.</LocalLabel>
				</div>
				<div class={style.options}>
					<Button
						ariaLabel="go to advanced settings"
						class={style.rejectAll}
						invert={true}
						onClick={onShowPurposes}
					>
						<LocalLabel localizeKey='showPurposes'>Manage your choices</LocalLabel>
					</Button>
					<Button
						ariaLabel="accept and close"
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
