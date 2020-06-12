/* eslint-disable quotes */
//  german / de translations

const features = {
	menu: 'Features',
	feature1: {
		name: 'Matching von Daten aus Offline-Quellen',
		description: `Kombination von Daten aus Offline-Quellen, die ursprünglich in anderen Kontexten gesammelt wurden.`,
	},
	feature2: {
		name: `Verknüpfung von Geräten`,
		description: `Ermöglichen die Verarbeitung der Daten eines Benutzers, um diesen Benutzer über mehrere Geräte zu verbinden.`,
	},
	feature3: {
		name: `Präzise geografische Standortdaten`,
		description: `Ermöglichen die Verarbeitung der genauen geografischen Standortdaten eines Benutzers zur Unterstützung eines Zwecks, für den diese bestimmte dritte Partei ihre Zustimmung erhalten hat.`,
	},
};

export default {
	banner: {
		title: 'Datenschutzoptionen',
		description: `						
			Wenn Sie diese Website besuchen, erklären Sie sich damit einverstanden, dass wir Cookies und Informationen verwenden, um personalisierte Inhalte und Anzeigen bereitzustellen und die Nutzung der Website zu messen und zu analysieren. Klicken Sie auf "Erfahren Sie mehr", um Ihre Einstellungen zu ändern.
        `,
		links: {
			data: {
				title: 'Informationen, die genutzt werden können',
				description: `						
					<ul>					
						<li>Typ und Einstellungen des Browsers</li>				
						<li>Informationen zum Betriebssystem des Geräts</li>				
						<li>Cookie-Informationen</li>				
						<li>Informationen über weitere, dem Gerät zugewiesene, Identifikatoren</li>				
						Die IP-Adresse, von der das Gerät auf die Website oder				
							App zugreift			
						</li>				
						<li>Informationen über Nutzeraktivitäten für das betreffende Gerät, einschließlich				
							besuchter oder genutzter Websites und Apps			
						</li>				
						<li>Informationen über den geografischen Standort des Geräts beim				
							Zugriff			
							auf eine Website oder App			
						</li>				
					</ul>					
				`,
			},
			purposes: {
				title: 'Zwecke der Informationsspeicherung',
			},
			manage: 'Mehr Erfahren',
			accept: 'Ok, Verstanden',
		},
	},
	summary: {
		title: 'Erfahren Sie mehr darüber, wie Informationen verwendet werden?',
		description: `Wir und ausgewählte Unternehmen dürfen auf Ihre Informationen zugreifen und sie verwenden								
			für die unten aufgeführten Zwecke. Sie können Ihre Auswahl unten anpassen oder							
			unsere Website weiterhin nutzen, wenn Sie mit den Zwecken einverstanden sind.`,
		detailLink: 'Mehr erfahren & Präferenzen festlegen',
		who: {
			title: 'Wer verwendet diese Informationen?',
			description: `Wir und vorausgewählte Unternehmen werden Ihre Informationen verwenden.					Sie können		
				jedes Unternehmen unter den oben angegebenen Links sehen oder`,
			link: 'die vollständige Liste hier finden.',
		},
		what: {
			title: 'Welche Informationen werden verwendet?',
			description: 'Verschiedene Unternehmen verwenden unterschiedliche Informationen,',
			link: 'die vollständige Liste finden Sie hier',
		},
	},
	details: {
		back: 'Zurück',
		save: 'Ok Verstanden',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `								
			<p>							
				Prüfung. Abhängig von der Art der Daten, die sie sammeln, verwenden und verarbeiten, sowie von anderen Faktoren einschließlich des "privacy by design",						
				Bestimmte Partner sind auf Ihre Zustimmung angewiesen, während andere verlangen, dass Sie sich abmelden. Für Informationen zu den einzelnen Verkäufern						
				und zur Ausübung Ihrer Wahlmöglichkeiten, siehe unten. Oder besuchen Sie zum Opt-out die						
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
			</p>							z
		`,
		purpose1: {
			description: 'Zulassen der Speicherung oder des Zugriffs von Informationen auf dem Gerät eines Benutzers.',
			menu: 'Informationsspeicherung und Zugriffstest',
			optoutDescription: '',
		},
		purpose2: {
			description: `Erlauben Sie die Verarbeitung der Daten eines Benutzers, um personalisierte Werbung (einschließlich Lieferung, Messung und Berichterstattung) bereitzustellen und zu informieren, die auf den Vorlieben oder Interessen eines Benutzers basiert, die bekannt sind oder aus Daten abgeleitet werden können, die über mehrere Sites, Anwendungen oder Geräte gesammelt wurden, und/oder um zu diesem Zweck auf Informationen auf Geräten zuzugreifen oder diese zu speichern.							
			Enthält folgende Features:							
			<ul>							
				<li>${features.feature1.name} – ${features.feature1.description}</li>
				<li>${features.feature2.name} – ${features.feature2.description}</li>
				<li>${features.feature3.name} – ${features.feature3.description}</li>
			</ul>`,
			menu: 'Personalisierung',
		},
		purpose3: {
			description: `Erlauben Sie die Verarbeitung der Daten eines Benutzers, um Inhalte oder Werbung zu übermitteln und die Übermittlung solcher Inhalte oder Werbung zu messen, Einblicke zu erhalten und Berichte zu erstellen, um die Dienstnutzung zu verstehen; und/oder Zugriff auf oder Speicherung von Informationen auf Geräten zu diesem Zweck.							
			Enthält folgende Features:							
			<ul>							
				<li>${features.feature1.name} – ${features.feature1.description}</li>
				<li>${features.feature2.name} – ${features.feature2.description}</li>
				<li>${features.feature3.name} – ${features.feature3.description}</li>
			</ul>`,
			menu: 'Anzeigenauswahl, Zustellung, Berichterstattung',
		},
		purpose4: {
			description: `Erlauben Sie die Verarbeitung der Daten eines Benutzers, um personalisierte Inhalte bereitzustellen und zu informieren (einschließlich Lieferung, Messung und Berichterstattung), die auf den Präferenzen oder Interessen eines Benutzers basieren, die bekannt sind oder aus Daten abgeleitet werden, die über mehrere Websites, Anwendungen oder Geräte gesammelt wurden; und/oder Zugriff auf oder Speicherung von Informationen auf Geräten zu diesem Zweck.							
			Enthält folgende Features:							
			<ul>							
				<li>${features.feature1.name} – ${features.feature1.description}</li>
				<li>${features.feature2.name} – ${features.feature2.description}</li>
				<li>${features.feature3.name} – ${features.feature3.description}</li>
			</ul>`,
			menu: 'Inhaltsauswahl, Zustellung, Berichterstattung',
		},
		purpose5: {
			description: `						
				Die Sammlung von Informationen über Ihre Verwendung des Inhalts und die Kombination mit zuvor gesammelten Informationen, um Ihre Nutzung des Dienstes zu messen, zu verstehen und darüber zu berichten. Dies umfasst nicht die Personalisierung, die Sammlung von Informationen über Ihre Nutzung dieses Dienstes, um im Laufe der Zeit Inhalte und/oder Werbung in anderen Zusammenhängen, d.h. auf anderen Diensten, wie Websites oder Apps, für Sie zu personalisieren.
            `,
			menu: 'Messung',
		},
	},
	vendors: {
		title: 'Wer verwendet diese Informationen?',
		description: `
			Hier ist die vollständige Liste der Unternehmen, die Ihre Informationen verwenden werden. Bitte lesen Sie deren Datenschutzrichtlinien für weitere Details.
        `,
		accept: 'Erlauben',
		acceptAll: '"Alle Erlauben',
		acceptNone: 'Alle sperren',
		optOut: 'erfordert Opt-out',
		back: 'Passen Sie an, wie diese Unternehmen Daten von der vorherigen Seite verwenden',
	},
	features,
	footer: {
		message: `								
			<h2>Wir schätzen Datenschutz</h2>							
		`,
		description: `								
			<span>							
				Um diese Website zu verbessern, zu personalisieren und zu erweitern						
				ihre Erfahrung mit Inhalten, zu Werbezwecken und zur Analyse von						
				unserem Traffic, wir und unsere Partner verwenden Technologien wie Cookies,						
				Pixel und/oder Beacons, um bestimmte Daten zu sammeln. Indem						
				Sie die Website weiterhin benutzen oder auf "OK" klicken, erklären Sie sich mit der						
				Nutzung dieser Technologie und Sammlung der Daten einverstanden.						
			</span>							
		`,
		privacyPolicy: `								
			<span>							
				Bitte besuchen Sie unsere						
				<a target="_blank" href="http://system1.com/terms/privacy.html">						
					Datenschutzerklärung					
				</a>						
				erfahren Sie mehr darüber, wie wir Daten sammeln und verwenden.						
				Sie können Ihre Einstellungen jederzeit ändern, durch Klicken auf						
			</span>							
		`,
		privacyPolicyButton: 'Datenschutz-Einstellungen verwalten',
		consentLink: 'OK',
	},
};
