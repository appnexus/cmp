import { h } from 'preact';
import style from "./purposes.less";
import Label from "../../../label/label";
import Switch from '../../../switch/switch';


class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

const Purpose = (props) => {
	const {
		purpose,
		index,
		isActive,
		isLegitimateInterestActive,
		onToggle,
		onToggleLegitInterest,
		createOnShowVendors,
		isTechnical,
		specialPurpose,
		isPublisherPurpose = false
	} = props;

	const prefix = purpose.custom ? `customPurpose${purpose.id}` : `purpose${purpose.id}`;

	return (
		<div className={style.purposeDetail}>
			<div className={style.detailHeader}>
				<div className={style.title}>
					<LocalLabel localizeKey={`${prefix}.title`}>{purpose.name}</LocalLabel>
				</div>
				{!isTechnical &&
					<div className={style.active}>
						<div className={style.switch}>
							<LocalLabel localizeKey={isActive ? 'active' : 'inactive'}>{isActive ? 'Active' : 'Inactive'}</LocalLabel>
							<Switch
								isSelected={isActive}
								dataId={index}
								onClick={onToggle}
							/>
						</div>

						<div className={style.switch}>
							<LocalLabel localizeKey={'legitimateInterest'}>Uzasadniony interes</LocalLabel>
							<Switch
								isSelected={isLegitimateInterestActive}
								dataId={index}
								onClick={onToggleLegitInterest}
							/>
						</div>

					</div>
				}
			</div>
			<div className={style.body}>
				<LocalLabel localizeKey={`${prefix}.description`}>{purpose.description}</LocalLabel>
				{!isPublisherPurpose && (
					<div>
						<div>
							<a className={style.vendorLink}
							onClick={createOnShowVendors({isCustom: false, purposeId: purpose.id, specialPurpose})}>
								<LocalLabel prefix='purposes' localizeKey='showVendors'>Show IAB vendor list</LocalLabel>
							</a>
						</div>
						<div>
							<a className={style.vendorLink}
							onClick={createOnShowVendors({isCustom: true, purposeId: purpose.id, specialPurpose})}>
								<LocalLabel prefix='purposes' localizeKey='showCustomVendors'>Show custom vendor list</LocalLabel>
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Purpose;
