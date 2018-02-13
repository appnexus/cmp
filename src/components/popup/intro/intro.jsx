import { h, Component } from 'preact';
import style from './intro.less';
import Button from '../../button/button';
import Label from '../../label/label';

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
			onRejectAll,
			onShowPurposes,
		} = props;

		return (
			<div class={style.intro}>
				<div class={style.title}>
					<LocalLabel localizeKey='title'>This site uses cookies</LocalLabel>
				</div>
				<div class={style.description}>
					<LocalLabel localizeKey='description'>Our partners set cookies and collect information from your browser across the web to provide you with website content, deliver relevant advertising and understand web audiences.</LocalLabel>
				</div>
				<div class={style.options}>
					<Button
						class={style.rejectAll}
						invert={true}
						onClick={onRejectAll}
					>
						<LocalLabel localizeKey='rejectAll'>Reject All Cookies</LocalLabel>
					</Button>
					<Button
						class={style.acceptAll}
						onClick={onAcceptAll}
					>
						<LocalLabel localizeKey='acceptAll'>Accept All Cookies</LocalLabel>
					</Button>
				</div>
				<a class={style.purposes} onClick={onShowPurposes}><LocalLabel localizeKey='showPurposes'>Show purposes</LocalLabel></a>
			</div>
		);
	}
}
