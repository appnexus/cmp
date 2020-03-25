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
		specialFeature,
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
				<div>
					<a className={style.vendorLink} onClick={createOnShowVendors({isCustom: false,
						featureId: feature.id, specialFeature})}>
						<LocalLabel prefix='purposes' localizeKey='showVendors'>Show IAB vendor list</LocalLabel>
					</a>
				</div>
				<div>
					<a className={style.vendorLink} onClick={createOnShowVendors({isCustom: true,
						featureId: feature.id, specialFeature})}>
						<LocalLabel prefix='purposes' localizeKey='showCustomVendors'>Show custom vendor list</LocalLabel>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Feature;
