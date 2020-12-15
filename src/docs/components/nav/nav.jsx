import { h, Component } from 'preact';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import style from './nav.less';
import Setup from '../docs/setup';
import CmpApi from '../docs/cmpApi';
import Ping from '../examples/basic/ping';
import EventListeners from '../examples/basic/eventListeners';
import CustomEventListeners from '../examples/basic/customEventListeners';
import ConsentData from '../examples/basic/consentData';
import ShowConsent from '../examples/basic/showConsent';
import VendorList from '../examples/basic/vendorList';
import RequireConsent from '../examples/advanced/requireConsent';
import InspectVendorConsent from '../examples/advanced/inspectVendorConsent';
import AdAfterConsent from '../examples/advanced/adAfterConsent';
import Intro from '../intro/intro';
import Configration from '../docs/configuration';
import QuickStart from '../docs/quickstart';
import IabToolRedirect from '../tools/iabToolRedirect';

export const navItems = [
	{
		title: 'Intro',
		items: [
			{ to: '/', title: 'Introduction To GDPR', component: Intro }
		]
	},
	{
		title: 'Docs',
		items: [
			{ to: '/quickstart', title: 'Quick Start', component: QuickStart },
			{ to: '/setup', title: 'Setup Script', component: Setup },
			{ to: '/config', title: 'Configuration', component: Configration },
			{ to: '/cmp-api', title: 'CMP API', component: CmpApi }
		]
	},
	{
		title: 'Basic Examples',
		items: [
			{ to: '/basic/ping', title: 'Ping', component: Ping },
			{ to: '/basic/show', title: 'Show Consent Tool', component: ShowConsent },
			{ to: '/basic/events', title: 'Event Listeners', component: EventListeners },
			{ to: '/basic/custom-events', title: 'Custom Event Listeners', component: CustomEventListeners },
			{ to: '/basic/data', title: 'Get Consent Data', component: ConsentData },
			{ to: '/basic/list', title: 'Get Vendor List', component: VendorList }
		]
	},
	// {
	// 	title: 'IFrame Examples',
	// 	items: [
	// 		{ to: '/iframe/show', title: 'Show Consent Tool', component: () => <IFrame iframeId='showConsentTool'/>},
	// 		{ to: '/iframe/events', title: 'Event Listeners', component: () => <IFrame iframeId='addEventListeners'/>},
	// 		{ to: '/iframe/vendor', title: 'Get Vendor Consents', component: () => <IFrame iframeId='getVendorConsents'/>},
	// 		{ to: '/iframe/data', title: 'Get Consent Data', component: () => <IFrame iframeId='getConsentData'/>},
	// 	]
	// },
	{
		title: 'Advanced Examples',
		items: [
			{ to: '/advanced/require-consent', title: 'Require Consent', component: RequireConsent },
			{
				to: '/advanced/inspect-vendor-consent',
				title: 'Inspect Vendor Consent',
				component: InspectVendorConsent
			},
			{ to: '/advanced/ad-after-consent', title: 'Load Ad After Consent', component: AdAfterConsent }
		]
	},
	{
		title: 'Tools (TCF v2.0)',
		items: [
			{
				to: '/tools/v2/encode',
				title: 'Encode Consent Cookie ',
				component: () => <IabToolRedirect encode={true}/>
			},
			{
				to: '/tools/v2/decode',
				title: 'Decode Consent Cookie ',
				component: () => <IabToolRedirect encode={false}/>
			}
		]
	}];

export default class Nav extends Component {

	handleNavItemClick = () => {
		this.props.toggleMenu(false);
	};

	render (props) {
		const { menuExpanded, toggleMenu } = props;

		return (
			<div class={classnames(style.nav, { [style.menuExpanded]: menuExpanded })}>
				<section class={style.mobileMenu}>
					<a onClick={toggleMenu}>Menu</a>
				</section>
				<section class={style.menu}>
					<div class={style.navItems}>
						{navItems.map(group => (
							<div class={style.group}>
								<span class={style.groupTitle}>{group.title}</span>
								{group.items.map(({ to, title, external }) => (
									external ? (<a href={to} target='_blank' class={style.navItem}>{title}</a>) :
										(<Link to={to} className={style.navItem}
											   onClick={this.handleNavItemClick}>{title}</Link>)
								))}
							</div>
						))}
					</div>
				</section>
			</div>
		);
	}
}
