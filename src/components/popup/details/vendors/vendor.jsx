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
	static defaultProps = {
		name: '',
		policyUrl: '',
		purposes: [],
		legIntPurposes: [],
		specialPurposes: [],
		features: [],
		specialFeatures: []
	};

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const {
			name,
			policyUrl,
			purposes,
			legIntPurposes,
			features,
			specialPurposes,
			specialFeatures
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
					<b><LocalLabel localizeKey='purposes'>Purposes</LocalLabel></b>{': '}
					{purposes}{'. '}
				</span>}
				{legIntPurposes && !!legIntPurposes.length &&
				<span>
					<b><LocalLabel localizeKey='legitimateInterestPurposes'>Legitimate interest purposes</LocalLabel></b>{': '}
					{legIntPurposes}{'. '}
				</span>}
				{specialPurposes && !!specialPurposes.length &&
				<span>
					<b><LocalLabel localizeKey='specialPurposes'>Special purposes</LocalLabel></b>{': '}
					{specialPurposes}{'. '}
				</span>}
				{features && !!features.length &&
				<span>
					<b><LocalLabel localizeKey='features'>Features</LocalLabel></b>{': '}
					{features}{'. '}
				</span>}
				{specialFeatures && !!specialFeatures.length &&
				<span>
					<b><LocalLabel localizeKey='specialFeatures'>Special features</LocalLabel></b>{': '}
					{specialFeatures}{'. '}
				</span>}
			</div>
		</div>
	}
}
