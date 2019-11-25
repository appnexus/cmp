import { h } from 'preact';
import style from "./purposes.less";
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'features'
	};
}

const Feature = (props) => {
	const {
		feature,
		createOnShowVendors
	} = props;

	return (
		<div className={style.purposeDetail}>
			<div className={style.detailHeader}>
				<div className={style.title}>
					<LocalLabel localizeKey={`feature${feature.id}.title`}>{feature.name}</LocalLabel>
				</div>
			</div>
			<div className={style.body}>
				<LocalLabel localizeKey={`feature${feature.id}.description`}>{feature.description}</LocalLabel>
				<a className={style.vendorLink} onClick={createOnShowVendors({isCustom: false, featuresIds: [feature.id]})}>
					<LocalLabel prefix='purposes' localizeKey='showVendors'>Show full vendor list</LocalLabel>
				</a>
				<a className={style.vendorLink} onClick={createOnShowVendors({isCustom: true, featuresIds: [feature.id]})}>
					<LocalLabel prefix='purposes' localizeKey='showCustomVendors'>Show full custom vendor list</LocalLabel>
				</a>
			</div>
		</div>
	);
};

export default Feature;
