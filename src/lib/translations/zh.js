/* eslint-disable quotes */
/**
 * ZH / Chinese
 */

const features = {
	menu: '特点',
	feature1: {
		name: '将数据与脱机源匹配-合并来自脱机来源的数据',
		description: `这些数据最初是在其他情况下收集的。`,
	},
	feature2: {
		name: `链接设备-允许处理用户数据`,
		description: `以跨多个设备连接该用户。`,
	},
	feature3: {
		name: `精确地理位置数据-允许处理用户的精确地理位置数据`,
		description: `以支持某些第三方同意的目的。`,
	},
};
export default {
	banner: {
		title: '隐私选择',
		description: `					
			通过使用本网站，您同意我们使用cookies和信息来提供个性化的内容和广告，并评估和分析网站使用情况。点击“了解更多”更改设置。
		`,
		links: {
			data: {
				title: '可能使用的信息',
				description: `			
					<ul>		
						<li>浏览器类型及其设置</li>	
						<li>有关设备操作系统的信息</li>	
						<li>Cookie 信息</li>	
						<li>有关分配给设备的其他标识符的信息</li>	
						<li>设备用来访问客户端网站或移动应用程序的IP地址</li>	
						<li>
							有关用户在该设备上活动的信息，	
							包括访问或使用的网页和移动应用程序
						</li>
						<li>有关设备访问网站或移动应用程序时的地理位置的信息</li>	
					</ul>		
				`,
			},
			purposes: {
				title: '用于存储信息的目的',
			},
			manage: '了解更多' /* 了解更多 */,
			accept: '好的, 明白' /* 好的 */,
		},
	},
	summary: {
		title: '了解有关如何使用信息的详情',
		description: `我们和部分公司可能出于以下目的，访问和使用您的信息。					
			您可以在下面自定义您的选择，或者您觉得没问题，				
			也可以继续使用我们的网站。`,
		detailLink: '了解更多并设置首选项',
		who: {
			title: '谁在使用这些信息？',
			description: `我们和预选公司将使用您的信息。				
				您也可以在此链接查看每家公司，或者`,
			link: '在此处查看完整列表。',
		},
		what: {
			title: '哪些信息正在被使用？',
			description: '不同的公司使用不同的信息',
			link: '在此处查看完整列表。',
		},
	},
	details: {
		back: '返回',
		save: '好的，明白',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `					
			<p>				
				根据合作伙伴收集、使用和处理的数据类型，以及其他因素（包括设计隐私），			
				某些合作伙伴取决于您的同意，而其他合作伙伴则要求您选择退出。			
				有关每个供应商的信息以及要执行的选择，请参见下文。 或选择退出，请访问			
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
			description: '允许在用户设备上存储或访问信息。',
			menu: '信息存储与访问测试',
			optoutDescription: '', // optional purpose-level override, otherwise falls back to globalOptoutDescription
		},
		purpose2: {
			description: `
				允许根据用户的喜好或从多个站点、应用程序或设备上，收集的数据推断出的兴趣，对用户数据进行处理，以提供并通知个性化广告（包括投放、评估和报告）； 和/或为此目的在设备上访问或存储信息。				
				将包括以下功能：				
				<ul>				
					<li>${features.feature1.name}，${features.feature1.description}</li>
					<li>${features.feature2.name}，${features.feature2.description}</li>
					<li>${features.feature3.name}，${features.feature3.description}</li>
				</ul>
			`,
			menu: '个性化',
		},
		purpose3: {
			description: `
				允许处理用户的数据以投放内容或广告，并评估此类内容或广告的投放，提取见解并生成报告以了解服务使用情况； 和/或为此目的在设备上访问或存储信息。				
				将包括以下功能：				
				<ul>				
					<li>${features.feature1.name}，${features.feature1.description}</li>
					<li>${features.feature2.name}，${features.feature2.description}</li>
					<li>${features.feature3.name}，${features.feature3.description}</li>
				</ul>
			`,
			menu: '广告选择，投放，报告',
		},
		purpose4: {
			description: `
				允许根据用户的偏好或从多个站点、应用程序或设备上收集的数据推断出的喜好或兴趣来处理用户数据，以提供和通知个性化内容（包括投放、评估和报告）； 和/或为此目的在设备上访问或存储信息。				
				将包括以下功能：
				<ul>
					<li>${features.feature1.name}，${features.feature1.description}</li>
					<li>${features.feature2.name}，${features.feature2.description}</li>
					<li>${features.feature3.name}，${features.feature3.description}</li>
				</ul>
			`,
			menu: '内容选择，投放，报告',
		},
		purpose5: {
			description: `				
				有关您对内容使用情况的信息的收集，以及与先前收集的信息的组合，用于评估、了解和报告您对服务的使用情况。 这不包括个性化，收集有关您使用此服务的信息，以便随后在其他情况下（即，在其他服务上，如网站或应用程序上）为您个性化内容和/或广告。
			`,
			menu: '评估',
		},
	},
	vendors: {
		title: '谁在使用这些信息？',
		description: `
			这是将使用您信息的公司的完整列表。 请查看其隐私政策以了解详情。
		`,
		accept: '允许',
		acceptAll: '全部允许',
		acceptNone: '全部禁止',
		optOut: '要求退出',
		back: '自定义这些公司如何使用上一页中的数据',
	},
	features,
	footer: {
		message: `					
			<h2>我们重视隐私</h2>				
		`,
		description: `					
			<span>				
				为了帮助改善本网站、个性化和增强您的内容体验、			
				用于广告目的以及分析我们的流量，			
				我们和合作伙伴使用Cookies、			
				像素和/或信标等技术，来收集某些数据。			
				继续使用该网站或点击“确定”，			
				即表示您同意使用该技术并收集数据。			
			</span>				
		`,
		privacyPolicy: `					
			<span>				
				请访问我们的			
				<a target="_blank" href="http://system1.com/terms/privacy.html">			
					隐私政策		
				</a>			
				详细了解我们如何收集和使用数据。			
				您可以随时通过点击以下链接修改设置			
			</span>				
		`,
		privacyPolicyButton: '管理隐私设置',
		consentLink: '好',
	},
};
