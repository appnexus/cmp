import { h, Component } from 'preact';
import style from './purposes.less';
import Button from '../../../button/button';
import Switch from '../../../switch/switch';

export default class Purposes extends Component {
	state = {
		selectedPurposeIndex: -1
	};

	static defaultProps = {
		onShowVendors: () => {},
		purposes: [],
		customPurposes: [],
		selectedPurposeIds: new Set(),
		selectedCustomPurposeIds: new Set()
	};


	handleSelectPurposeDetail = index => {
		return () => {
			this.setState({
				selectedPurposeIndex: index
			});
		};
	};

	handleSelectPurpose = ({isSelected}) => {
		const {selectedPurposeIndex} = this.state;
		const {
			purposes,
			customPurposes,
			selectPurpose,
			selectCustomPurpose
		} = this.props;
		const allPurposes = [...purposes, ...customPurposes];
		const id = allPurposes[selectedPurposeIndex].id;

		if (selectedPurposeIndex < purposes.length) {
				selectPurpose(id, isSelected);
		}
		else {
			selectCustomPurpose(id, isSelected);
		}
	};


	render(props, state) {

		const {
			onShowVendors,
			purposes,
			customPurposes,
			selectedPurposeIds,
			selectedCustomPurposeIds
		} = props;

		const {selectedPurposeIndex} = state;

		const allPurposes = [...purposes, ...customPurposes];
		const selectedPurpose = allPurposes[selectedPurposeIndex];
		const selectedPurposeId = selectedPurpose && selectedPurpose.id;
		const purposeIsActive = selectedPurposeIndex < purposes.length ?
			selectedPurposeIds.has(selectedPurposeId) :
			selectedCustomPurposeIds.has(selectedPurposeId);

		return (
			<div class={style.purposes}>
				<div class={style.purposeList}>
					<div class={[style.purposeItem, selectedPurposeIndex === -1 ? style.selectedPurpose : ''].join(' ')}
					onClick={this.handleSelectPurposeDetail(-1)}
					>
						How we use cookies
					</div>
					{allPurposes.map((purpose, index) => (
						<div class={[style.purposeItem, selectedPurposeIndex === index ? style.selectedPurpose : ''].join(' ')}
							 onClick={this.handleSelectPurposeDetail(index)}
						 >
							{purpose.name}
						</div>
					))}
				</div>
				<div class={style.purposeDescription}>
					{selectedPurposeIndex < 0 &&
					<div class={style.purposeDetail}>
						<div class={style.title}>
							This website uses cookies
						</div>
						<div class={style.body}>
							Our partners set cookies and collect information from your browser across the web to provide you with website content, deliver relevant advertising and understand web audiences.
							<a class={style.vendorLink} onClick={onShowVendors}>Show full vendor list</a>
						</div>
					</div>}
					{selectedPurposeIndex > -1 &&
					<div class={style.purposeDetail}>
						<div class={style.detailHeader}>
							<div class={style.title}>
								{allPurposes[selectedPurposeIndex].name}
							</div>
							<div class={style.active}>
								Active
								<Switch
									isSelected={purposeIsActive}
									onClick={this.handleSelectPurpose}
									/>
							</div>
						</div>
						<div class={style.body}>
							{allPurposes[selectedPurposeIndex].name} help make websites usable by enabling basic functions like page navigation and acess to secure areas of the website. The website cannot function properly without these cookies.
						</div>
					</div>}
				</div>
			</div>
		);
	}
}
