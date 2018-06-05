/**
 * The default set of translated pieces of text indexed by locale.
 * Values from window.__cmp.config.localization will override these
 * per locale.  Empty values will use the english value provided
 * inline in each component.
 */
export default {
	en: {
		banner: {
			title: '',
			description: '',
			links: {
				data: {
					title: '',
					description: ''
				},
				purposes: {
					title: '',
					description: ''
				},
				manage: '',
				accept: ''
			}
		},
		summary: {
			title: '',
			description: '',
			who: {
				title: '',
				description: ''
			},
			what: {
				title: '',
				description: ''
			}
		},
		details: {
			back: '',
			save: ''
		},
		purposes: {
			title: '',
			description: '',
			back: '',
			optoutdDescription: ``,
			purpose1: {
				description: `Allow storing or accessing information on a user's device.`
			},
			purpose2: {
				description: `Allow processing of a user's data to provide and inform personalised advertising (including delivery, measurement, and reporting) based on a user's preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices  for that purpose.
				Will include following Features:
				<ul>
					<li>Matching Data to Offline Sources - combining data from offline sources that were initially collected in other contexts.</li>
					<li>Linking Devices - allow processing of a user's data to connect such user across multiple devices.</li>
					<li>Precise Geographic Location data - allow processing of a user's precise geographic location data in support of a purpose for which that certain third party has consent.</li>
				</ul>`
			},
			purpose3: {
				description: `Allow processing of a user's data to deliver content or advertisements and measure the delivery of such content or advertisements, extract insights and generate reports to understand service usage; and/or accessing or storing information on devices for that purpose.
				Will include following Features:
				<ul>
					<li>Matching Data to Offline Sources - combining data from offline sources that were initially collected in other contexts.</li>
					<li>Linking Devices - allow processing of a user's data to connect such user across multiple devices.</li>
					<li>Precise Geographic Location data - allow processing of a user's precise geographic location data in support of a purpose for which that certain third party has consent.</li>
				</ul>`
			},
			purpose4: {
				description: `Allow processing of a user's data to provide and inform personalised content (including delivery, measurement, and reporting) based on a user's preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices for that purpose.
				Will include following Features:
				<ul>
					<li>Matching Data to Offline Sources - combining data from offline sources that were initially collected in other contexts.</li>
					<li>Linking Devices - allow processing of a user's data to connect such user across multiple devices.</li>
					<li>Precise Geographic Location data - allow processing of a user's precise geographic location data in support of a purpose for which that certain third party has consent.</li>
				</ul>`
			}
		},
		vendors: {
			title: '',
			description: '',
			accept: '',
			acceptAll: '',
			optOut: '',
			back : ''
		}
	},
	fr: {
		banner: {
			title: 'Les cookies nous aident à vous délivrer un service de qualité.',
			description: 'Nos partenaires et nous-même utilisons les cookies afin de proposer du contenu et de la publicité pertinents.',
			links: {
				data: {
					title: 'Données utilisées',
					description: `Données pouvant être utilisées:
								<ul>
									<li>Données sur le navigateur utilisé</li>
									<li>Données sur le systeme d'exploitation utilisé</li>
									<li>Données des cookies</li>
									<li>Données spécifiques au terminal (ordinateur de bureau, mobile...)</li>
									<li>Adresse IP</li>
									<li>Données de navigation (pages visitées)</li>
									<li>Données de géolocalisation</li>
								</ul>`
				},
				purposes: {
					title: 'Utilisation des données',
					description: `A quoi servent ces données:
								<ul>
									<li>Stockage et accès à ces données</li>
									<li>Publicités personnalisées</li>
									<li>Contenus personnalisés</li>
									<li>Mesure d'audience</li>
								</ul>`
				},
				manage: 'Préférences',
				accept: 'Continuer'
			}
		},
		summary: {
			title: 'Comment sont utilisées mes données ?',
			description: 'Nos partenaires et nous-même utilisons les cookies (petits fichiers texte) du navigateur afin de comprendre les centres d\'intérêt de nos visiteurs et ainsi leur proposer du contenu et de la publicité pertinents. Désormais, nous avons besoin de votre consentement.',
			detailLink: 'Informations et configuration',
			who: {
				title: 'Qui utilise mes données ?',
				description: `Seulement nos partenaires et nous-même pouvons utiliser vos données. 
					Vous pouvez personnaliser vos choix ci-dessus ou continuer à utiliser notre site si vous êtes d'accord.`,
				link: 'Voir la liste complète de nos partenaires'
			},
			what: {
				title: 'Quelles données sont utilisées ?',
				description: 'Chaque partenaire utilise différemment vos données.',
				link: 'Voir la liste complète des données utilisées'
			}
		},
		details: {
			back: 'Retour',
			save: 'Valider et continuer sur le site'
		},
		purposes: {
			title: 'Données collectées',
			description: 'Ci-dessous la liste des données pouvant être collectées :',
			back: 'Configurer comment ces données sont utilisées',
			optoutdDescription: '',
			items: `<ul>
						<li>Type de navigateur et son paramétrage</li>
						<li>Informations sur le système d'exploitation</li>
						<li>Données des cookies</li>
						<li>Informations sur l'appareil utilisé</li>
						<li>L'adresse IP à partir de laquelle l'appareil accède au site Web</li>
						<li>Informations sur l'activité de l'utilisateur sur cet appareil, y compris les pages Web visitées</li>
						<li>Informations de géolocalisation de l'appareil lorsqu'il accède au site Web</li>
					</ul>`,
			purpose1: {
				menu: 'Stockage d\'informations et accès',
				title: 'Stockage d\'informations et accès',
				description: 'Autoriser le stockage d’informations ou l’accès à des informations déjà stockées sur votre appareil, telles que des identifiants publicitaires, des identifiants de dispositif, des cookies et des technologies similaires.'
			},
			purpose2: {
				menu: 'Personnalisation',
				title: 'Personnalisation',
				description: 'Autoriser la collecte et le traitement d’informations sur votre utilisation de ce service pour ensuite personnaliser la publicité et/ou le contenu qui vous sont proposés dans d’autres contextes, tels que sur d’autres sites ou applications, au fil du temps. En règle générale, le contenu du site ou de l’application est utilisé pour déterminer vos centres d’intérêt et permettent de déterminer le choix de la publicité et/ou du contenu.'
			},
			purpose3: {
				menu: 'Sélection d\'annonces, diffusion, rapport',
				title: 'Sélection d\'annonces, diffusion, rapport',
				description: 'Autoriser le traitement des données d\'un utilisateur pour fournir du contenu ou des publicités et mesurer la diffusion de ces contenus ou publicités, extraire des informations et générer des rapports pour comprendre l\'utilisation des services; et / ou accéder ou stocker des informations sur des dispositifs à cette fin. Inclura les caractéristiques suivantes:'
			},
			purpose4: {
				menu: 'Sélection de contenu, diffusion, rapport',
				title: 'Sélection de contenu, diffusion, rapport',
				description: 'Autoriser le traitement des données d\'un utilisateur pour la création de contenu personnalisé (y compris la diffusion, l\'analyse et la création de rapports) en fonction des préférences ou des intérêts d\'un utilisateur connus ou inférer à partir de données collectées sur plusieurs sites, applications ou appareils; et / ou accéder ou stocker des informations sur des dispositifs à cette fin. Inclura les caractéristiques suivantes:'
			},
			purpose5: {
				menu: 'Mesures',
				title: 'Mesures',
				description: 'Autoriser la collecte d’informations sur votre utilisation du contenu et la combinaison avec des informations précédemment collectées, utilisées pour mesurer, comprendre et rendre compte de votre utilisation du service. Cela n’inclut pas la personnalisation, la collecte d’informations sur votre utilisation de ce service pour personnaliser ultérieurement le contenu et/ou la publicité dans d’autres contextes, par exemple sur d’autres services, tels que des sites ou des applications.'
			}
		},
		vendors: {
			title: 'Nos partenaires',
			description: 'Aidez-nous à vous fournir une meilleure expérience en ligne! Nos partenaires utilisent des cookies et collectent des informations à partir de votre navigateur sur le Web pour vous fournir du contenu, diffuser des publicités pertinentes et analyser les audiences Web.',
			accept: 'Accepter',
			acceptAll: 'Accepter tout',
			optOut: '',
			back : 'Configurer comment ces sociétés récupèrent mes données'
		}
	},
	de: {
		banner: {
			title: 'Cookies helfen uns einen hochwertigen Service zu bieten',
			description: 'Wir und unsere Partner verwenden Cookies, um relevante Inhalte und Werbung bereitzustellen.',
			links: {
				data: {
					title: 'Verwendungszwecke',
					description: `Datenverwendungszwecke:
								<ul>
									<li>Browserdaten</li>
									<li>Betriebssystemdaten</li>
									<li>Cookie-Daten</li>
									<li>Gerätedaten (Desktop, Mobile etc.)</li>
									<li>IP-Adresse</li>
									<li>Nutzungsverhalten</li>
									<li>Geo-Daten</li>
								</ul>`
				},
				purposes: {
					title: 'Verwendung von Daten',
					description: `Wozu dienen diese Daten?
								<ul>
									<li>Speicherung und Zugriff auf diese Daten</li>
									<li>Personalisierte Anzeigen</li>
									<li>Personalisierter Inhalt</li>
									<li>Zielgruppenmessung</li>
								</ul>`
				},
				manage: 'Einstellungen',
				accept: 'Akzeptieren und fortsetzen'
			}
		},
		summary: {
			title: 'Wie werden meine Daten verwendet?',
			description: 'Unsere Partner und wir selbst verwenden Cookies (kleine Textdateien) des Browsers, um die Interessen unserer Besucher zu verstehen und ihnen relevante Inhalte und Werbung zur Verfügung zu stellen. Jetzt brauchen wir Ihre Zustimmung.',
			detailLink: 'Informationen und Einstellungen',
			who: {
				title: 'Wer nutzt meine Daten?',
				description: `Nur unsere Partner und wir können Ihre Daten verwenden. Sie können Ihre Auswahl oben anpassen oder unsere Website weiterhin nutzen, wenn Sie zustimmen.`,
				link: 'Sehen Sie die komplette Liste unserer Partner'
			},
			what: {
				title: 'Welche Daten werden verwendet?',
				description: 'Jeder Partner verwendet Ihre Daten unterschiedlich.',
				link: 'Siehe die vollständige Liste der verwendeten Daten'
			}
		},
		details: {
			back: 'Zurück',
			save: 'Speichern und auf der Webseite fortfahren'
		},
		purposes: {
			title: 'Gesammelte Daten',
			description: 'Liste der Daten, die gesammelt werden',
			back: 'Konfigurieren Sie, wie diese Daten verwendet werden',
			optoutdDescription: '',
			items: `<ul>
						<li>Browsertyp und Einstellungen</li>
						<li>Informationen zum Betriebssystem</li>
						<li>Cookie-Daten</li>
						<li>Geräteinformationen</li>
						<li>Die IP-Adresse, von der aus das Gerät auf die Website zugreift</li>
						<li>Informationen zur Benutzeraktivität auf diesem Gerät, einschließlich der besuchten Webseiten</li>
						<li>Geolokalisierungsinformationen des Geräts beim Zugriff auf die Website</li>
					</ul>`,
			purpose1: {
				menu: 'Speicherung und Zugriff auf Informationen',
				title: 'Speicherung von Informationen und Zugriff',
				description: 'Speicherung von Informationen oder Zugriff auf Informationen, die bereits auf Ihrem Gerät gespeichert sind, z.B. Werbe-IDs, Geräte-IDs, Cookies und ähnliche Technologien.'
			},
			purpose2: {
				menu: 'Personalisierung',
				title: 'Personalisierung',
				description: 'Die Erfassung und Verarbeitung von Informationen über Ihre Nutzung dieses Dienstes zur nachträglichen Personalisierung von Werbung und / oder Inhalten in anderen Kontexten, z.B. auf anderen Websites oder in anderen Apps. In der Regel wird der Inhalt der Website oder App verwendet, um Rückschlüsse auf Ihre Interessen zu ziehen, die die zukünftige Auswahl von Werbung und / oder Inhalten beeinflussen.'
			},
			purpose3: {
				menu: 'Auslieferung und Berichte von Anzeigen',
				title: 'Auslieferung und Berichte von Anzeigen',
				description: 'Die Sammlung von Informationen und die Kombination mit zuvor gesammelten Informationen, um Werbung für Sie auszuwählen und zu liefern und die Lieferung und Wirksamkeit solcher Werbung zu messen. Dies beinhaltet die Verwendung zuvor gesammelter Informationen über Ihre Interessen zur Auswahl von Anzeigen, die Verarbeitung von Daten darüber, welche Werbeanzeigen gezeigt wurden, wie oft sie gezeigt wurden, wann und wo sie gezeigt wurden und ob Sie irgendwelche Maßnahmen im Zusammenhang mit der Werbung ergriffen haben, einschließlich z Anzeige oder einen Kauf tätigen. Dies umfasst nicht die Personalisierung, dh die Sammlung und Verarbeitung von Informationen über Ihre Nutzung dieses Dienstes, um später Werbung und / oder Inhalte in anderen Kontexten wie Websites oder Apps im Laufe der Zeit zu personalisieren'
			},
			purpose4: {
				menu: 'Auslieferung und Berichte von Inhalten',
				title: 'Auslieferung und Berichte von Inhalten',
				description: 'Die Sammlung von Informationen und die Kombination mit zuvor gesammelten Informationen, um Inhalte für Sie auszuwählen und zu liefern und die Lieferung und Effektivität solcher Inhalte zu messen. Dies beinhaltet die Verwendung zuvor gesammelter Informationen über Ihre Interessen, um Inhalte auszuwählen, Daten darüber zu verarbeiten, welcher Inhalt gezeigt wurde, wie oft oder wie lange er angezeigt wurde, wann und wo er gezeigt wurde und ob Sie irgendwelche Maßnahmen in Bezug auf den Inhalt ergriffen haben zum Beispiel klicken auf Inhalt. Dies beinhaltet nicht die Personalisierung, dh die Sammlung und Verarbeitung von Informationen über Ihre Nutzung dieses Dienstes, um Inhalte und / oder Werbung für Sie später in anderen Kontexten wie Websites oder Apps zu personalisieren.'
			},
			purpose5: {
				menu: 'Zielgruppenmessung',
				title: 'Zielgruppenmessung',
				description: 'Die Sammlung von Informationen über Ihre Nutzung des Inhalts und die Kombination mit zuvor gesammelten Informationen, die verwendet werden, um Ihre Nutzung des Dienstes zu messen, zu verstehen und darüber zu berichten. Dies umfasst nicht die Personalisierung, die Sammlung von Informationen über Ihre Nutzung dieses Dienstes, um Inhalte und / oder Werbung für Sie in anderen Kontexten, d. H. Auf anderen Diensten, wie Websites oder Apps, im Zeitverlauf zu personalisieren.'
			}
		},
		vendors: {
			title: 'Unsere Partner',
			description: 'Helfen Sie uns, Ihnen eine bessere Online-Erfahrung zu bieten! Unsere Partner verwenden Cookies und sammeln Informationen von Ihrem Browser im Internet, um Sie mit Inhalten zu versorgen, relevante Werbung auszuliefern und Zielgruppen im Internet zu analysieren.',
			accept: 'Akzeptieren',
			acceptAll: 'Alle akzeptieren / deaktivieren',
			optOut: 'Benötigt Opt-Out',
			back : 'Zurück'
		}
	}	
};
