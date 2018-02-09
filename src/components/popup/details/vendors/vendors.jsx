import { h, Component } from 'preact';
import style from './vendors.less';
import Button from '../../../button/button';
import Switch from '../../../switch/switch';

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
						Our partners
					</div>
					<div class={style.options}>
						<Button
							class={style.button}
							invert={true}
							onClick={this.handleRejectAll}
						>
							Reject All
						</Button>
						<Button
							class={style.button}
							onClick={this.handleAcceptAll}
						>
							Accept All
						</Button>
					</div>
				</div>
				<div class={style.description}>
					Help us provide you with a better online experience! Our partners set cookies and collect information from your browser across the web to provide you with website content, deliver relevant advertising and understand web audiences.
				</div>
				<div class={style.vendorHeader}>
					<table class={style.vendorList}>
						<thead>
						<tr>
							<th>Company</th>
							<th>Off/On</th>
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
