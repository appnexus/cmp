import { h, Component } from 'preact';
import style from './vendorList.less';
import detailsStyle from '../details.less';
import ExternalLinkIcon from '../../../externallinkicon/externallinkicon';

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
			onBack,
			theme,
		} = props;

		return (
			<div class={style.vendorList}>
				<div class={style.header}>
					<div class={detailsStyle.title} style={{color: theme.text}}>
						Who is using this information?
					</div>
				</div>
				<div class={detailsStyle.description} style={{color: theme.textLight}}>
					Here is the complete list of companies who may use your information. You can review their privacy policies for specific
					data use, security, and retention practices.
				</div>
				<a onClick={onBack} style={{color: theme.textLink}}>Customize how these companies use your data from the previous page</a>
				<table>
					{vendors.map(({name, policyUrl}, index) => (
						<tr class={index % 2 === 0 ? style.even : style.odd}>
							<td>
								<div class={style.company} style={{color: theme.textLight}}>
									{name}
									<a href={policyUrl} className={style.policy} target='_blank'><ExternalLinkIcon color={theme.textLink} /></a>
								</div>
							</td>
						</tr>
					))}
				</table>
			</div>
		);
	}
}
