/* eslint-disable quotes */

const features = {
	menu: 'Features',
	feature1: {
		name: 'Matching Data to Offline Sources',
		description: `Combining data from offline sources that were initially collected in other contexts.`,
	},
	feature2: {
		name: `Linking Devices`,
		description: `Allow processing of a user’s data to connect such user across multiple devices.`,
	},
	feature3: {
		name: `Precise Geographic Location data`,
		description: `Allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent.`,
	},
};

export default {
	banner: {
		title: 'Privacy Choices',
		description:
			'By using this site, you agree to our use of cookies and information to provide personalized content and ads and measure and analyze site usage. Click "Learn More" to change your settings.',
		links: {
			data: {
				title: 'Information that may be used',
				description: `
						<ul>
							<li>Type of browser and its settings</li>
							<li>Information about the device's operating system</li>
							<li>Cookie information</li>
							<li>Information about other identifiers assigned to the device</li>
							<li>The IP address from which the device accesses a client's website or
								mobile application
							</li>
							<li>Information about the user's activity on that device, including web
								pages and mobile apps visited or used
							</li>
							<li>Information about the geographic location of the device when it
								accesses
								a website or mobile application
							</li>
						</ul>
					`,
			},
			purposes: {
				title: 'Purposes for storing information',
			},
			manage: 'Learn More' /* Learn More */,
			accept: 'Ok, Got It' /* OK */,
		},
	},
	summary: {
		title: 'Learn more about how information is being used?',
		description: `We and select companies may access and use your information 
				for the below purposes. You may customize your choices below or 
				continue using our site if you're OK with the purposes.`,
		detailLink: 'Learn More & Set Preferences',
		who: {
			title: 'Who is using this information?',
			description: `We and pre-selected companies will use your information. You can see
					each company in the links above or`,
			link: 'see the complete list here.',
		},
		what: {
			title: 'What information is being used?',
			description: 'Different companies use different information,',
			link: 'see the complete list here.',
		},
	},
	details: {
		back: 'Back',
		save: 'Ok, Got It',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `
				<p>
					Depending on the type of data they collect, use, and process and other factors including privacy by design,
					certain partners rely on your consent while others require you to opt-out. For information on each vendor and to
					exercise your choices, see below. Or to opt-out, visit the
					<a href="http://optout.networkadvertising.org/?c=1#!/" target="_blank">
						NAI
					</a>
					,
					<a href="http://optout.aboutads.info/?c=2#!/" target="_blank">
						DAA
					</a>
					, and
					<a href="http://youronlinechoices.eu/" target="_blank">
						EDAA
					</a>
					sites.
				</p>
			`,
		purpose1: {
			description: 'Allow storing or accessing information on a user’s device.',
			menu: 'Information storage and access',
			optoutDescription: '',
		},
		purpose2: {
			description: `Allow processing of a user’s data to provide and inform personalised advertising (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices  for that purpose.
				Will include following Features:
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>`,
			menu: 'Personalisation',
		},
		purpose3: {
			description: `Allow processing of a user’s data to deliver content or advertisements and measure the delivery of such content or advertisements, extract insights and generate reports to understand service usage; and/or accessing or storing information on devices for that purpose.
				Will include following Features:
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>`,
			menu: 'Ad selection, delivery, reporting',
		},
		purpose4: {
			description: `Allow processing of a user’s data to provide and inform personalised content (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices for that purpose.
				Will include following Features:
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>`,
			menu: 'Content selection, delivery, reporting',
		},
		purpose5: {
			description:
				'The collection of information about your use of the content, and combination with previously collected information, used to measure, understand, and report on your usage of the service. This does not include personalisation, the collection of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, i.e. on other service, such as websites or apps, over time.',
			menu: 'Measurement',
		},
	},
	vendors: {
		title: 'Who is using this information?',
		description:
			'Here is the complete list of companies who will use your information. Please view their privacy policy for more details.',
		accept: 'Allow',
		acceptAll: '"Allow All',
		acceptNone: 'Disallow All',
		optOut: 'requires opt-out',
		back: 'Customize how these companies use data from the previous page',
	},
	features,
	footer: {
		message: `
				<h2>We Value Privacy</h2>
			`,
		description: `
				<span>
					To help make this website better, to personalize and enhance 
					your content experience, for advertising purposes and to analyze 
					our traffic, we and our partners use technology such as cookies,  
					pixels, and/or beacons to collect certain data. By 
					continuing to use the site or clicking “OK”, you agree to the 
					use of this technology and collecting the data.
				</span>
			`,
		privacyPolicy: `
				<span>
					Please visit our 
					<a target="_blank" href="http://system1.com/terms/privacy.html">
						Privacy Policy
					</a> 
					to learn more about how we collect and use data. You can modify 
					your settings at any time by clicking
				</span>
			`,
		privacyPolicyButton: 'Manage Privacy Settings',
		consentLink: 'OK',
	},
};
