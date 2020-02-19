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
		onToggle,
		createOnShowVendors,
		isTechnical,
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
							<LocalLabel>Uzasadniony interes</LocalLabel>
							<Switch
								isSelected={!isActive}
								dataId={index}
								onClick={onToggle}
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
							onClick={createOnShowVendors({isCustom: false, purposeIds: [purpose.id]})}>
								<LocalLabel prefix='purposes' localizeKey='showVendors'>Show IAB vendor list</LocalLabel>
							</a>
						</div>
						<div>
							<a className={style.vendorLink}
							onClick={createOnShowVendors({isCustom: true, purposeIds: [purpose.id]})}>
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
