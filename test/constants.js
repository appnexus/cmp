const PURPOSE_CONSENTS = [1, 3, 5, 7, 9];
const PURPOSE_LEGITIMATE_INTERESTS = [2, 4, 6, 8, 10];
const VENDOR_CONSENTS = [1, 2, 3, 4, 8];
const VENDOR_LEGITIMATE_INTERESTS = [1, 2, 3, 4];
const PUBLISHER_CONSENTS = [2, 4, 6, 8, 10];
const PUBLISHER_LEGITIMATE_INTERESTS = [1, 3, 5, 7, 9];
const SPECIAL_FEATURE_OPT_INS = [1, 2, 3];

const VENDOR_LIST = {
	"gvlSpecificationVersion": 2,
	"vendorListVersion": 100,
	"globalVendorListVersion": 27,
	"tcfPolicyVersion": 2,
	"lastUpdated": "2020-03-03T15:37:46.511752+00:00",
	"purposes": {
		"1": {
			"id": 1,
			"name": "Store and/or access information on a device",
			"description": "Cookies, device identifiers, or other information can be stored or accessed on your device for the purposes presented to you.",
			"descriptionLegal": "Vendors can: \\n* Store and access information on the device such as cookies and device identifiers presented to a user."
		},
		"2": {
			"id": 2,
			"name": "Select basic ads",
			"description": "Ads can be shown to you based on the content you\u2019re viewing, the app you\u2019re using, your approximate location, or your device type.",
			"descriptionLegal": "To do basic ad selection vendors can:\\n* Use real-time information about the context in which the ad will be shown, to show the ad, including information about the content and the device, such as: device type and capabilities, user agent, URL, IP address\\n* Use a user\u2019s non-precise geolocation data\\n* Control the frequency of ads shown to a user.\\n* Sequence the order in which ads are shown to a user.\\n* Prevent an ad from serving in an unsuitable editorial (brand-unsafe) context\\nVendors cannot:\\n* Create a personalised ads profile using this information for the selection of future ads.\\n* N.B. Non-precise means only an approximate location involving at least a radius of 500 meters is permitted."
		},
		"3": {
			"id": 3,
			"name": "Create a personalised ads profile",
			"description": "A profile can be built about you and your interests to show you personalised ads that are relevant to you.",
			"descriptionLegal": "To create a personalised ads profile vendors can:\\n* Collect information about a user, including a user's activity, interests, demographic information, or location, to create or edit a user profile for use in personalised advertising.\\n* Combine this information with other information previously collected, including from across websites and apps, to create or edit a user profile for use in personalised advertising."
		},
		"4": {
			"id": 4,
			"name": "Select personalised ads",
			"description": "Personalised ads can be shown to you based on a profile about you.",
			"descriptionLegal": "To select personalised ads vendors can:\\n* Select personalised ads based on a user profile or other historical user data, including a user\u2019s prior activity, interests, visits to sites or apps, location, or demographic information."
		},
		"5": {
			"id": 5,
			"name": "Create a personalised content profile",
			"description": "A profile can be built about you and your interests to show you personalised content that is relevant to you.",
			"descriptionLegal": "To create a personalised content profile vendors can:\\n* Collect information about a user, including a user's activity, interests, visits to sites or apps, demographic information, or location, to create or edit a user profile for personalising content.\\n* Combine this information with other information previously collected, including from across websites and apps, to create or edit a user profile for use in personalising content."
		},
		"6": {
			"id": 6,
			"name": "Select personalised content",
			"description": "Personalised content can be shown to you based on a profile about you.",
			"descriptionLegal": "To select personalised content vendors can:\\n* Select personalised content based on a user profile or other historical user data, including a user\u2019s prior activity, interests, visits to sites or apps, location, or demographic information."
		},
		"7": {
			"id": 7,
			"name": "Measure ad performance",
			"description": "The performance and effectiveness of ads that you see or interact with can be measured.",
			"descriptionLegal": "To measure ad performance vendors can:\\n* Measure whether and how ads were delivered to and interacted with by a user\\n* Provide reporting about ads including their effectiveness and performance\\n* Provide reporting about users who interacted with ads using data observed during the course of the user's interaction with that ad\\n* Provide reporting to publishers about the ads displayed on their property\\n* Measure whether an ad is serving in a suitable editorial environment (brand-safe) context\\n* Determine the percentage of the ad that had the opportunity to be seen and the duration of that opportunity\\n* Combine this information with other information previously collected, including from across websites and apps\\nVendors cannot:\\n*Apply panel- or similarly-derived audience insights data to ad measurement data without a Legal Basis to apply market research to generate audience insights (Purpose 9)"
		},
		"8": {
			"id": 8,
			"name": "Measure content performance",
			"description": "The performance and effectiveness of content that you see or interact with can be measured.",
			"descriptionLegal": "To measure content performance vendors can:\\n* Measure and report on how content was delivered to and interacted with by users.\\n* Provide reporting, using directly measurable or known information, about users who interacted with the content\\n* Combine this information with other information previously collected, including from across websites and apps.\\nVendors cannot:\\n* Measure whether and how ads (including native ads) were delivered to and interacted with by a user.\\n* Apply panel- or similarly derived audience insights data to ad measurement data without a Legal Basis to apply market research to generate audience insights (Purpose 9)"
		},
		"9": {
			"id": 9,
			"name": "Apply market research to generate audience insights",
			"description": "Market research can be used to learn more about the audiences who visit sites/apps and view ads.",
			"descriptionLegal": "To apply market research to generate audience insights vendors can:\\n* Provide aggregate reporting to advertisers or their representatives about the audiences reached by their ads, through panel-based and similarly derived insights.\\n* Provide aggregate reporting to publishers about the audiences that were served or interacted with content and/or ads on their property by applying panel-based and similarly derived insights.\\n* Associate offline data with an online user for the purposes of market research to generate audience insights if vendors have declared to match and combine offline data sources (Feature 1)\\n* Combine this information with other information previously collected including from across websites and apps. \\nVendors cannot:\\n* Measure the performance and effectiveness of ads that a specific user was served or interacted with, without a Legal Basis to measure ad performance.\\n* Measure which content a specific user was served and how they interacted with it, without a Legal Basis to measure content performance."
		},
		"10": {
			"id": 10,
			"name": "Develop and improve products",
			"description": "Your data can be used to improve existing systems and software, and to develop new products",
			"descriptionLegal": "To develop new products and improve products vendors can:\\n* Use information to improve their existing products with new features and to develop new products\\n* Create new models and algorithms through machine learning\\nVendors cannot:\\n* Conduct any other data processing operation allowed under a different purpose under this purpose"
		}
	},
	"specialPurposes": {
		"1": {
			"id": 1,
			"name": "Match and combine offline data sources",
			"description": "Data from offline data sources can be combined with your online activity in support of one or more purposes",
			"descriptionLegal": "To ensure security, prevent fraud and debug vendors can:\\n* Ensure data are securely transmitted\\n* Detect and prevent malicious, fraudulent, invalid, or illegal activity.\\n* Ensure correct and efficient operation of systems and processes, including to monitor and enhance the performance of systems and processes engaged in permitted purposes\\nVendors cannot:\\n* Conduct any other data processing operation allowed under a different purpose under this purpose."
		},
		"2": {
			"id": 2,
			"name": "Link different devices",
			"description": "Different devices can be determined as belonging to you or your household in support of one or more of purposes.",
			"descriptionLegal": "To deliver information and respond to technical requests vendors can:\\n* Use a user\u2019s IP address to deliver an ad over the internet\\n* Respond to a user\u2019s interaction with an ad by sending the user to a landing page\\n* Use a user\u2019s IP address to deliver content over the internet\\n* Respond to a user\u2019s interaction with content by sending the user to a landing page\\n* Use information about the device type and capabilities for delivering ads or content, for example, to deliver the right size ad creative or video file in a format supported by the device\\nVendors cannot:\\n* Conduct any other data processing operation allowed under a different purpose under this purpose"
		}
	},
	"features": {
		"1": {
			"id": 1,
			"name": "Match and combine offline data sources",
			"description": "Data from offline data sources can be combined with your online activity in support of one or more purposes",
			"descriptionLegal": "Vendors can:\\n* Combine data obtained offline with data collected online in support of one or more Purposes or Special Purposes."
		},
		"2": {
			"id": 2,
			"name": "Link different devices",
			"description": "Different devices can be determined as belonging to you or your household in support of one or more of purposes.",
			"descriptionLegal": "Vendors can:\\n* Deterministically determine that two or more devices belong to the same user or household\\n* Probabilistically determine that two or more devices belong to the same user or household\\n* Actively scan device characteristics for identification for probabilistic identification if users have allowed vendors to actively scan device characteristics for identification (Special Feature 2)"
		},
		"3": {
			"id": 3,
			"name": "Receive and use automatically-sent device characteristics for identification",
			"description": "Your device might be distinguished from other devices based on information it automatically sends, such as IP address or browser type.",
			"descriptionLegal": "Vendors can:\\n* Create an identifier using data collected automatically from a device for specific characteristics, e.g. IP address, user-agent string.\\n* Use such an identifier to attempt to re-identify a device.\\nVendors cannot:\\n* Create an identifier using data collected via actively scanning a device for specific characteristics, e.g. installed font or screen resolution without users\u2019 separate opt-in to actively scanning device characteristics for identification.\\n* Use such an identifier to re-identify a device."
		}
	},
	"specialFeatures": {
		"1": {
			"id": 1,
			"name": "Use precise geolocation data",
			"description": "Your precise geolocation data can be used in support of one or more purposes. This means your location can be accurate to within several meters.",
			"descriptionLegal": "Vendors can:\\n* Collect and process precise geolocation data in support of one or more purposes.\\nN.B. Precise geolocation means that there are no restrictions on the precision of a user\u2019s location; this can be accurate to within several meters."
		},
		"2": {
			"id": 2,
			"name": "Actively scan device characteristics for identification",
			"description": "Your device can be identified based on a scan of your device's unique combination of characteristics.",
			"descriptionLegal": "Vendors can:\\n* Create an identifier using data collected via actively scanning a device for specific characteristics, e.g. installed fonts or screen resolution.\\n* Use such an identifier to re-identify a device"
		}
	},
	"vendors": {
		"1": {
			"id": 1,
			"name": "Globex",
			"purposes": [ 1, 2, 3, 4],
			"legIntPurposes": [7, 9, 10],
			"flexiblePurposes": [
				2
			],
			"specialPurposes": [],
			"features": [2],
			"specialFeatures": [ ],
			"policyUrl": "http://www.captify.co.uk/privacy-policy/"
		},
		"2": {
			"id": 2,
			"name": "Initech",
			"purposes": [1, 2, 3, 4, 7, 10],
			"legIntPurposes": [],
			"flexiblePurposes": [],
			"specialPurposes": [1, 2],
			"features": [3],
			"specialFeatures": [ ],
			"policyUrl": "http://www.captify.co.uk/privacy-policy/"
		},
		"3": {
			"id": 3,
			"name": "CRS",
			"purposes": [ 1, 3, 4],
			"legIntPurposes": [2, 7, 9, 10],
			"flexiblePurposes": [2, 9],
			"specialPurposes": [1, 2],
			"features": [1, 2],
			"specialFeatures": [1, 2],
			"policyUrl": "http://www.captify.co.uk/privacy-policy/"
		},
		"4": {
			"id": 4,
			"name": "Umbrella",
			"purposes": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			"legIntPurposes": [],
			"flexiblePurposes": [],
			"specialPurposes": [],
			"features": [3],
			"specialFeatures": [1],
			"policyUrl": "http://www.captify.co.uk/privacy-policy/"
		},
		"10": {
			"id": 10,
			"name": "Pierce and Pierce",
			"purposes": [ 1, 2, 3, 4, 7],
			"legIntPurposes": [],
			"flexiblePurposes": [],
			"specialPurposes": [2],
			"features": [1, 3],
			"specialFeatures": [1],
			"policyUrl": "http://www.captify.co.uk/privacy-policy/"
		},
		"8": {
			"id": 8,
			"name": "Aperture",
			"purposes": [ 1, 3, 4, 5, 6, 8, 9, 10],
			"legIntPurposes": [2, 7],
			"flexiblePurposes": [],
			"specialPurposes": [1, 2],
			"features": [2],
			"specialFeatures": [],
			"policyUrl": "http://www.captify.co.uk/privacy-policy/"
		}
	}
};

export {
	PURPOSE_CONSENTS,
	PURPOSE_LEGITIMATE_INTERESTS,
	VENDOR_CONSENTS,
	VENDOR_LEGITIMATE_INTERESTS,
	PUBLISHER_CONSENTS,
	PUBLISHER_LEGITIMATE_INTERESTS,
	SPECIAL_FEATURE_OPT_INS,
	VENDOR_LIST
};
