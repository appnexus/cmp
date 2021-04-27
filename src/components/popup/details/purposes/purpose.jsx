import { h } from 'preact';
import style from "./purposes.less";
import Label from "../../../label/label";
import Switch from '../../../switch/switch';


class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

const purposeOneTreatmentId = 1;

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
		isSpecial,
		isPublisherPurpose = false
	} = props;

	const purposeKey = `purpose${purpose.id}`;
	const prefix = isSpecial ? 'specialPurposes' : 'purposes';

	// user can't right to object for purpose number 1
	const canRightToObject = prefix !== 'purposes' || purpose.id != purposeOneTreatmentId;

	return (
		<div className={style.purposeDetail}>
			<div className={style.detailHeader}>
				<div className={style.title}>
					<LocalLabel prefix={prefix} localizeKey={`${purposeKey}.title`}>{purpose.name}</LocalLabel>
				</div>
				{!isTechnical &&
					<div className={style.active}>
						<div className={style.switch}>
							<LocalLabel collapseEmpty={true} className={style.caption} prefix={prefix} localizeKey='acceptButton'></LocalLabel>
							<LocalLabel prefix={prefix} localizeKey={isActive ? 'active' : 'inactive'}>{isActive ? 'Active' : 'Inactive'}</LocalLabel>
							<Switch
								isSelected={isActive}
								dataId={index}
								onClick={onToggle}
							/>
						</div>
						{!isPublisherPurpose && canRightToObject &&
							<div className={style.switch}>
								<LocalLabel className={style.caption} prefix={prefix} localizeKey={'legitimateInterest'}>Legitimate interest</LocalLabel>
								<LocalLabel collapseEmpty={true} prefix={prefix} localizeKey={isLegitimateInterestActive ? 'legIntActive' : 'legIntInactive'}></LocalLabel>
								<Switch
									isSelected={isLegitimateInterestActive}
									dataId={index}
									onClick={onToggleLegitInterest}
								/>
							</div>
						}

					</div>
				}
			</div>
			<div className={style.body}>
				<LocalLabel prefix={prefix} localizeKey={`${purposeKey}.description`}>{purpose.description}</LocalLabel>
				{!isPublisherPurpose && (
					<div>
						<div>
							<a className={style.vendorLink}
							onClick={createOnShowVendors({isCustom: false, purposeId: purpose.id, isSpecial})}>
								<LocalLabel prefix={prefix} localizeKey='showVendors'>Show IAB vendor list</LocalLabel>
							</a>
						</div>
						<div>
							<a className={style.vendorLink}
							onClick={createOnShowVendors({isCustom: true, purposeId: purpose.id, isSpecial})}>
								<LocalLabel collapseEmpty={true} prefix={prefix} localizeKey='showCustomVendors'>Show custom vendor list</LocalLabel>
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Purpose;
