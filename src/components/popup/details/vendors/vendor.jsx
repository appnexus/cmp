import {h, Component} from "preact";

import style from "./vendors.less";
import ExternalLinkIcon from "../../../externallinkicon/externallinkicon";
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'vendors'
	};
}

export default class Vendor extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		const {
			name,
			policyUrl,
			purposes,
			legIntPurposes,
			features
		} = this.props;

		return <div>
			<div class={style.vendorName}>
				{name}
				{policyUrl &&
				<a href={policyUrl} className={style.policy} target='_blank'><ExternalLinkIcon/></a>}
			</div>
			<div class={style.vendorDescription}>
				{purposes && !!purposes.length &&
				<span>
					<LocalLabel localizeKey='purposes'>Purposes</LocalLabel>{': '}
					{purposes}{'. '}
				</span>}
				{legIntPurposes && !!legIntPurposes.length &&
				<span>
					<LocalLabel localizeKey='legitimateInterestPurposes'>Legitimate interest purposes</LocalLabel>{': '}
					{legIntPurposes}{'. '}
				</span>}
				{features && !!features.length &&
				<span>
					<LocalLabel localizeKey='features'>Features</LocalLabel>{': '}
					{features}{'. '}
				</span>}
			</div>
		</div>
	}
}
