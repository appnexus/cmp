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
			onShowPurposes,
		} = props;

		return (
			<div class={style.intro}>
				<div class={style.title}>
					<LocalLabel localizeKey='title'>This site uses cookies</LocalLabel>
				</div>
				<div class={style.description}>
					<LocalLabel localizeKey='description'>Our partners set cookies and collect information from your browser across the web to provide you with website content, deliver relevant advertising and understand web audiences. In the future we may need your approval to accept cookies for advertising, through choices such as the below example.</LocalLabel>
				</div>
				<div class={style.options}>
					<Button
						class={style.manageYourChoices}
						invert={true}
						onClick={onShowPurposes}
					>
						<LocalLabel localizeKey='manageYourChoices'>Manage Your Choices</LocalLabel>
					</Button>
					<Button
						class={style.acceptAll}
						onClick={onAcceptAll}
					>
						<LocalLabel localizeKey='acceptAll'>Accept</LocalLabel>
					</Button>
				</div>
			</div>
		);
	}
}
