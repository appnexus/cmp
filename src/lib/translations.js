/**
 * The default set of translated pieces of text indexed by locale.
 * Values from window.__cmp.config.localization will override these
 * per locale.  Empty values will use the english value provided
 * inline in each component.
 */
export default {
	en: {
		intro: {
			title: '',
			description: '',
			acceptAll: '',
			rejectAll: '',
			showPurposes: ''
		},
		details: {
			title: '',
			cancel: '',
			save: ''
		},
		purposes: {
			active: '',
			cookies: {
				menu: '',
				title: '',
				description: ''
			},
			purpose1: {
				menu: '',
				title: '',
				description: ''
			},
			customPurpose1: {
				menu: '',
				title: '',
				description: ''
			}
		},
		vendors: {
			title: '',
			rejectAll: '',
			acceptAll: '',
			company: '',
			offOn: '',
			description: ''
		}
	}
};
