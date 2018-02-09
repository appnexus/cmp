import { h, Component } from 'preact';
import style from './intro.less';
import Button from '../../button/button';

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
					This site uses cookies
				</div>
				<div class={style.description}>
					Our partners set cookies and collect information from your browser across the web to provide you with website content, deliver relevant advertising and understand web audiences.
				</div>
				<div class={style.options}>
					<Button
						class={style.rejectAll}
						invert={true}
						onClick={onRejectAll}
					>
						Reject All Cookies
					</Button>
					<Button
						class={style.acceptAll}
						onClick={onAcceptAll}
					>
						Accept All Cookies
					</Button>
				</div>
				<a class={style.purposes} onClick={onShowPurposes}>Show purposes</a>
			</div>
		);
	}
}
