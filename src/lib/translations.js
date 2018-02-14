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
			showVendors: '',
			cookies: {
				menu: '',
				title: '',
				description: ''
			},
			purpose1: {
				description: 'Allow storing or accessing information on a user’s device.'
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
	},
	de: {
		intro: {
			title: 'Diese Website verwendet Cookies',
			description: 'Wir und unsere Partner verwenden sogenannte Cookies (kleine Textdateien) im Webbrowser um zu verstehen, was unsere Besucher interessiert und entsprechend relevante Inhalte und Werbung anbieten zu können. Zukünftig benötigen wir wahrscheinlich ihr/euer Einverständnis dazu. Ein Beispiel, wie dies aussehen könnte, finden sie/findet ihr unter dieser Erklärung ',
			acceptAll: 'Alle Cookies akzeptieren',
			rejectAll: 'Alle Cookies ablehnen',
			showPurposes: 'Verwendungszwecke zeigen'
		},
		details: {
			title: 'Datenschutzeinstellungen',
			cancel: 'Abbrechen',
			save: 'Sichern und Beenden'
		},
		purposes: {
			active: 'Aktiv',
			showVendors: '',
			cookies: {
				menu: 'Wie wir Cookies einsetzen',
				title: 'Diese Website verwendet Cookies',
				description: 'Unsere Partner und wir setzen Cookies (kleine Textdateien) und sammeln Informationen während des Surfens im Web in diesem Browser. Dies dient dazu zu verstehen, was unsere Besucher interessiert und entsprechend relevante Inhalte und Werbung anbieten zu können.'
			},
			purpose1: {
				menu: 'Zugriff auf ein Gerät',
				title: 'Zugriff auf ein Gerät',
				description: 'Die Erlaubnis zum Speichern und Abrufen von Informationen auf dem Gerät eines Website-Besuchers.Das ist notwendig, um Cookies im Web-Browser zu speichern und zur Anzeige relevanter Informationen und Werbung abrufen zu können.'
			},
			purpose2: {
				menu: 'Persönlich angepaßte Werbung',
				title: 'Persönlich angepaßte Werbung',
				description: 'Die Erlaubnis, Besucherdaten so zu verarbeiten und/oder zu speichern und abzurufen, dass persönlich angepaßte Werbung angeboten und angezeigt werden kann (dies umfaßt die Auslieferung, Messung und die Erstellung von Berichten darüber). Dies erfolgt auf der Basis bekannter Präferenzen oder Interessen, oder durch das Schließen auf Präferenzen oder Interessen durch die Erfassung von Daten auch über verschiedene Websites, Apps oder Geräte hinweg zu diesem Zweck.'
			},
			purpose3: {
				menu: 'Analysen',
				title: 'Analysen',
				description: 'Die Erlaubnis, Besucherdaten zur Anzeige von Inhalten oder Werbung zu verarbeiten, und zur Messung der Auslieferung solcher Inhalte oder Werbung. Umfasst ist die Gewinnung von Erkenntnissen und die Generierung von Berichten um die Nutzung des angebotenen Service zu verstehen, und/oder das Abrufen oder Speichern von Informationen auf Geräten zu diesem Zweck.'
			},
			purpose4: {
				menu: 'Persönlich angepasste Inhalte',
				title: 'Persönlich angepasste Inhalte',
				description: 'Die Erlaubnis, Besucherdaten zur Anzeige von personalisierten Inhalten zu verarbeiten, und zur Messung der Auslieferung. Umfasst ist die Gewinnung von Erkenntnissen darüber und die Generierung von Berichten dazu. Dies erfolgt auf der Basis bekannter Präferenzen oder Interessen, oder durch das Schließen auf Präferenzen oder Interessen durch die Erfassung von Daten auch über verschiedene Websites, Apps oder Geräte hinweg zu diesem Zweck.'
			}
		},
		vendors: {
			title: 'Unsere Partner',
			rejectAll: 'Alle ablehnen',
			acceptAll: 'Alle akzeptieren',
			company: 'Unternehmen',
			offOn: 'Aus/An',
			description: 'Helfen Sie uns, Ihnen einen besseren Service zu bieten! Unsere Partner verwenden Cookies Ihres Browsers, um quer durch das Web zu verstehen, was Sie interessiert und Ihnen entsprechend relevante Inhalte und Werbung anzubieten.'
		}
	}
};
