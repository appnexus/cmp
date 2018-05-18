import { h, Component } from 'preact';
import style from './vendorList.less';
import detailsStyle from '../details.less';
import ExternalLinkIcon from '../../../externallinkicon/externallinkicon';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'vendors'
	};
}

export default class VendorList extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		vendors: [],
	};

	render(props, state) {

		const {
			vendors,
			onBack
		} = props;

		return (
			<div class={style.vendorList}>
				<div class={style.header}>
					<div class={detailsStyle.title}>
						<LocalLabel localizeKey='title'>Who is using this information?</LocalLabel>
					</div>
				</div>
				<div class={detailsStyle.description}>
					<LocalLabel localizeKey='description'>Here is the complete list of companies who will use your information. Please view their privacy policy for more details.</LocalLabel>
				</div>
				<a onClick={onBack}><LocalLabel localizeKey='back'>Customize how these companies use data from the previous page</LocalLabel></a>
				<table>
					{vendors.map(({name, policyUrl}, index) => (
						<tr class={index % 2 === 0 ? style.even : style.odd}>
							<td>
								<div class={style.company}>
									{name}
									<a href={policyUrl} className={style.policy} target='_blank'><ExternalLinkIcon /></a>
								</div>
							</td>
						</tr>
					))}
				</table>
			</div>
		);
	}
}
