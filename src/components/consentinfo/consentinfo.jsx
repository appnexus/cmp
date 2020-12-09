import { h, Component } from 'preact';
import Label from '../label/label';
import { Localize } from '../../lib/localize';
import style from './consentinfo.less';


const lookup = new Localize().lookup;
const PREFIX = 'consentInfo';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: PREFIX
	};
}

export default class ConsentInfo extends Component {
	render (props) {
		return (
			<div>
				{props.fields.map((key) => <div
					class={style.consentInfo}
					style={{ display: lookup([PREFIX, key, 'title'].join('.')) ? 'block' : 'none' }}>
					<LocalLabel class={style.title} localizeKey={key + ".title"}></LocalLabel>
					<LocalLabel class={style.description} localizeKey={key + ".description"}></LocalLabel>
				</div>)}
			</div>
		);
	}
}
