import { h, Component } from 'preact';
import style from './vendors.less';
import Button from '../../../button/button';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'vendors'
	};
}

export default class Vendors extends Component {

	static defaultProps = {
		vendors: [],
		selectedVendorIds: new Set(),
		selectVendor: () => {}
	};

	handleAcceptAll = () => {
		this.props.selectAllVendors(true);
	};

	handleRejectAll = () => {
		this.props.selectAllVendors(false);
	};

	handleSelectVendor = ({dataId, isSelected}) => {
		this.props.selectVendor(dataId, isSelected);
	};

	render(props, state) {

		const {
			vendors,
			selectedVendorIds,
		} = props;

		return (
			<div class={style.vendors}>
				<div class={style.header}>
					<div class={style.title}>
						<LocalLabel localizeKey='title'>Our partners</LocalLabel>
					</div>
					<div class={style.options}>
						<Button
							class={style.button}
							invert={true}
							onClick={this.handleRejectAll}
						>
							<LocalLabel localizeKey='rejectAll'>Reject All</LocalLabel>
						</Button>
						<Button
							class={style.button}
							onClick={this.handleAcceptAll}
						>
							<LocalLabel localizeKey='acceptAll'>Accept All</LocalLabel>
						</Button>
					</div>
				</div>
				<div class={style.description}>
					<LocalLabel localizeKey='description'>
						Help us provide you with a better online experience! Our partners set cookies and collect information from your browser across the web to provide you with website content, deliver relevant advertising and understand web audiences.
					</LocalLabel>
				</div>
				<div class={style.vendorHeader}>
					<table class={style.vendorList}>
						<thead>
						<tr>
							<th><LocalLabel localizeKey='company'>Company</LocalLabel></th>
							<th><LocalLabel localizeKey='offOn'>Off/On</LocalLabel></th>
						</tr>
						</thead>
					</table>
				</div>
				<div class={style.vendorContent}>
					<table class={style.vendorList}>
						<tbody>
						{vendors.map(({ id, name }, index) => (
							<tr key={id} class={index % 2 === 1 ? style.even : ''}>
								<td>{name}</td>
								<td>
									<Switch
										dataId={id}
										isSelected={selectedVendorIds.has(id)}
										onClick={this.handleSelectVendor}
									/>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
