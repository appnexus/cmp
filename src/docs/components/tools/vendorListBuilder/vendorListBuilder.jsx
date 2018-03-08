import { h, Component } from 'preact';
import style from './vendorListBuilder.less';
import Switch from '../../../../components/switch/switch';
import vendorList from '../../../assets/vendors.json';


export default class VendorListBuilder extends Component {
	constructor(props) {
		super(props);
		const {version, vendors, purposes} = vendorList;
		this.state = {
			version,
			vendors,
			purposes,
			selectedPurposeIds: new Set(purposes.map(({id}) => id)),
			selectedVendorIds: new Set(vendors.map(({id}) => id))
		};
	}

	handleSelectPurpose = id => {
		return event => {
			const {selectedPurposeIds} = this.state;
			if (selectedPurposeIds.has(id)) {
				selectedPurposeIds.delete(id);
			}
			else {
				selectedPurposeIds.add(id);
			}
			this.setState({selectedPurposeIds});
		};
	};
	handleSelectAllPurposes = all => {
		return event => {
			const {purposes} = this.state;
			if (all) {
				this.setState({selectedPurposeIds: new Set(purposes.map(({id}) => id))});
			}
			else {
				this.setState({selectedPurposeIds: new Set()});
			}
		};
	};

	handleSelectVendor = id => {
		return event => {
			const {selectedVendorIds} = this.state;
			if (selectedVendorIds.has(id)) {
				selectedVendorIds.delete(id);
			}
			else {
				selectedVendorIds.add(id);
			}
			this.setState({selectedVendorIds});
		};
	};
	handleSelectAllVendors = all => {
		return event => {
			const {vendors} = this.state;
			if (all) {
				this.setState({selectedVendorIds: new Set(vendors.map(({id}) => id))});
			}
			else {
				this.setState({selectedVendorIds: new Set()});
			}
		};
	};


	render(props, state) {

		const {
			version,
			purposes,
			vendors,
			selectedPurposeIds,
			selectedVendorIds
		} = state;

		return (
			<div class={style.vendorListBuilder}>
				<div class={style.version}>
					<span class={style.field}>Vendor List Version:</span>
					<span>{version}</span>
				</div>
				<div class={style.purposes}>
					<div class={style.controls}>
						<span class={style.field}>Purposes:</span>
					</div>
					<table>
						<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th class={style.include}>
								<a onClick={this.handleSelectAllPurposes(true)}>All</a> / <a onClick={this.handleSelectAllPurposes(false)}>None</a>
							</th>
						</tr>
						</thead>
						<tbody>
						{purposes.map(({id, name}) => (
							<tr key={id}>
								<td>{id}</td>
								<td>{name}</td>
								<td class={style.include}>
									<Switch
										isSelected={selectedPurposeIds.has(id)}
										onClick={this.handleSelectPurpose(id)}
									/>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
				<div class={style.vendors}>
					<div class={style.controls}>
						<span class={style.field}>Vendors:</span>
					</div>
					<table>
						<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th class={style.include}>
								<a onClick={this.handleSelectAllVendors(true)}>All</a> / <a onClick={this.handleSelectAllVendors(false)}>None</a>
							</th>
						</tr>
						</thead>
						<tbody>
						{vendors.map(({id, name}) => (
							<tr key={id}>
								<td>{id}</td>
								<td>{name}</td>
								<td class={style.include}>
									<Switch
										isSelected={selectedVendorIds.has(id)}
										onClick={this.handleSelectVendor(id)}
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
