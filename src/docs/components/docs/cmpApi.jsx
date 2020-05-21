import { h, Component } from 'preact';
import style from './docs.less';


const commands = [
	{
		command: 'getTCData',
		parameters: [{
			type: '[parameter] (Array)',
			description: 'Array of vendor IDs. Omitting the parameter returns all vendor consents'
		}],
		callback: {
			resultType: 'result (Object, Boolean)',
			resultDescription: 'Object containing consent data for vendor IDs requested'
		}
	},
	{
		command: 'getConsentObject',
		parameters: [{
			type: 'parameter (Object)',
			description: 'Object that contains established consents'
		}, {
			type: 'parameter (Object)',
			description: 'Valid vendor list'
		}],
		callback: {
			resultType: 'result (Object, Boolean)',
			resultDescription: 'Object containing consent data for vendor IDs requested'
		}
	},
	{
		command: 'getConsentFieldsV1',
		parameters: [{
			type: 'parameter (Object)',
			description: 'Object that contains established consents'
		}],
		callback: {
			resultType: 'result (Object, Boolean)',
			resultDescription: 'Object containing consent data in TCF v1.1 format'
		}
	},
	{
		command: 'getVendorList',
		parameters: [{
			type: 'int or string',
			description: 'vendorListVersion'
		}],
		callback: {
			resultType: 'result (Object, Boolean)',
			resultDescription: 'Object containing the entire vendor list of IDs and names'
		}
	},
	{
		command: 'getVendorListVersion',
		parameters: [],
		callback: {
			resultType: 'result (Integer)',
			resultDescription: 'Vendor list version when transparency was established, null otherwise.'
		}
	},
	{
		command: 'showConsentTool',
		parameters: [{
			type: '[parameter]',
			description: '(ignored)'
		}],
		callback: {
			resultType: 'result (Boolean)',
			resultDescription: 'true'
		}
	},
	{
		command: 'showConsentDetailView',
		parameters: [{
			type: '[parameter]',
			description: '(ignored)'
		}],
		callback: {
			resultType: 'result (Boolean)',
			resultDescription: 'true'
		}
	},
	{
		command: 'showVendors',
		parameters: [{
			type: '[parameter]',
			description: '(ignored)'
		}],
		callback: {
			resultType: 'result (Boolean)',
			resultDescription: 'true'
		}
	},
    {
		command: 'showFooter',
		parameters: [{
			type: '[parameter]',
			description: '(ignored)'
		}],
		callback: {
			resultType: 'result (Boolean)',
			resultDescription: 'true'
		}
	},
	{
		command: 'addEventListener',
		parameters: [{
			type: 'parameter',
			description: '(ignored)'
		}],
		callback: {
			description: 'Function to execute when the event is fired',
			resultType: 'result (Object, Boolean)',
			resultDescription: 'Object containing the event name and any data the event may return'
		}
	},
	{
		command: 'registerEventListener',
		parameters: [{
			type: 'parameter (Object)',
			description: 'Object with \'event\' property'
		}],
		callback: {
			description: 'Callback function to remove as a listener',
			resultType: 'result (Object)',
			resultDescription: 'Object containing the event name and any data the event may return'
		}
	},
	{
		command: 'removeEventListener',
		parameters: [{
			type: 'parameter',
			description: '(ignored)'
		}],
		callback: {
			description: 'Callback function to remove as a listener',
			resultType: 'result (Object, Boolean)',
			resultDescription: 'Object containing the event name and any data the event may return'
		},
	},
	{
		command: 'unregisterEventListener',
		parameters: [{
			type: 'parameter (Object)',
			description: 'Object with \'event\' property'
		}],
		callback: {
			description: 'Callback function to remove as a listener',
			resultType: 'result (Object, boolean)',
			resultDescription: 'Object containing the event name and any data the event may return'
		}
	}
];

const events = [
	{
		name: 'isLoaded',
		description: 'Fired when the full CMP implementation has been loaded and assigned to window.__cmp.  The vendors list from vendors.json is not guaranteed to be loaded. If the CMP is loaded before an event listener is added the listener will be fired immediately after being added.',
		result: '{"event":"isLoaded"}'
	},
	{
		name: 'cmpReady',
		description: 'Fired when the full CMP implementation has been loaded AND all vendor list information has been successfully retrieved or failed. If the CMP is ready before an event listener is added the listener will be fired immediately after being added.',
		result: '{"event":"cmpReady","data":{"success":true}}'
	},
	{
		name: 'openConsentTool',
		description: 'Fired when the CMP ConsentTool wants to be opened',
		result: '{"event":"openConsentTool"}'
	},
	{
		name: 'onSubmit',
		description: 'Fired when the user submits consent data via the consent tool UI',
		result: '{"event":"onSubmit"}'
	}
];

export default class CmpApi extends Component {
	render () {

		return (
			<div className={style.api}>
				<span className={style.header}>CMP API</span>
				<div className={style.function}>__tcfapi(command, 2, [callback], [parameter])</div>
				<div className={style.functionSection}>
					<span className={style.functionSectionTitle}>Arguments</span>
					<span className={style.argument}>
						<span className={style.argumentType}>command (String)</span>: <span>Name of the command to execute</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>[callback] (Function)</span>: <span>Function to be executed with the result of the command</span>
					</span>
					<span className={style.argument}>
						<span className={style.argumentType}>[parameter] (*)</span>: <span>Parameter to be passed to the command function</span>
					</span>
				</div>
				<span className={style.functionSectionTitle}>Commands</span>
				<div className={style.commands}>
					{commands.map(({command, parameters, callback}) => (
						<div className={style.functionSection}>
							<div className={style.option}>{command}</div>
							<span className={style.argument}>
								<span className={style.argumentType}>command</span>: <span>"{command}"</span>
							</span>
							<span className={style.argument}>
								{parameters.map(parameter => (
									<div>
										<span className={style.argumentType}>{parameter.type}</span>: <span>{parameter.description}</span>
									</div>
								))}
							</span>
							<span className={style.argument}>
								<span className={style.argumentType}>[callback(result)]</span>: <span>{callback.description || 'Function to be executed with the result of the command'}</span>
							</span>
							<div className={style.commandArguments}>
								<span className={style.functionSectionTitle}>Arguments</span>
								<span className={style.argument}>
									<span className={style.argumentType}>{callback.resultType}</span>: <span>{callback.resultDescription}</span>
								</span>
							</div>
						</div>
					))}
				</div>

				<div className={style.function}>Events</div>
				<div className={style.functionSection}>
					<div className={style.commands}>
						{events.map(({name, description, result}) => (
							<div class={style.event}>
								<div className={style.option}>{name}</div>
								<span className={style.argument}>{description}</span>
								<span className={style.argument}>
									<span className={style.argumentType}>callback result</span>: <span>{result}</span>
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}
