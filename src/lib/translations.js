/**
 * The default set of translated pieces of text indexed by locale.
 * Values from window.__cmp.config.localization will override these
 * per locale.  Empty values will use the english value provided
 * inline in each component. Because the purpose definitions will change,
 * you will need to update the translations regularly. As a consequence, this
 * translations.js file is very important to keep up to date.
 */
export default {
	en: {
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
					Test. Depending on the type of data they collect, use, and process and other factors including privacy by design,
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
				menu: 'Information storage and access Test',
				optoutDescription: '', // optional purpose-level override, otherwise falls back to globalOptoutDescription
			},
			purpose2: {
				description: `Allow processing of a user’s data to provide and inform personalised advertising (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices  for that purpose.
				Will include following Features:
				<ul>
					<li>Matching Data to Offline Sources - combining data from offline sources that were initially collected in other contexts.</li>
					<li>Linking Devices - allow processing of a user’s data to connect such user across multiple devices.</li>
					<li>Precise Geographic Location data - allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent.</li>
				</ul>`,
				menu: 'Personalisation',
			},
			purpose3: {
				description: `Allow processing of a user’s data to deliver content or advertisements and measure the delivery of such content or advertisements, extract insights and generate reports to understand service usage; and/or accessing or storing information on devices for that purpose.
				Will include following Features:
				<ul>
					<li>Matching Data to Offline Sources - combining data from offline sources that were initially collected in other contexts.</li>
					<li>Linking Devices - allow processing of a user’s data to connect such user across multiple devices.</li>
					<li>Precise Geographic Location data - allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent.</li>
				</ul>`,
				menu: 'Ad selection, delivery, reporting',
			},
			purpose4: {
				description: `Allow processing of a user’s data to provide and inform personalised content (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices for that purpose.
				Will include following Features:
				<ul>
					<li>Matching Data to Offline Sources - combining data from offline sources that were initially collected in other contexts.</li>
					<li>Linking Devices - allow processing of a user’s data to connect such user across multiple devices.</li>
					<li>Precise Geographic Location data - allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent.</li>
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
	},
	es: {
		banner: {
			title: 'Uso de cookies',
			description:
				'Utilizamos "cookies" propias y de terceros para elaborar información estadística y mostrarle publicidad personalizada a través del análisis de su navegación. Si continúa navegando acepta su uso.',
			links: {
				data: {
					title: 'Información que puede ser usada.',
					description: `<ul>
									<li>Tipo de navegador y su configuración</li>
									<li>Información sobre el sistema operativo del dispositivo</li>
									<li>Información sobre las cookies</li>
									<li>Información sobre otros identificadores asignados al dispositivo</li>
									<li>Dirección IP desde la cual el dispositivo accede al sitio web o aplicación móvil</li>
									<li>Información sobre la actividad del usuario en ese dispositivo, incluidas las páginas web y las aplicaciones móviles visitadas o utilizadas</li>
									<li>Información sobre la ubicación geográfica del dispositivo cuando accede a un sitio web o aplicación móvil</li>
								</ul>`,
				},
				purposes: {
					title: 'Propósitos para almacenar información.',
					description: 'Cómo puede ser usada la información:',
				},
				manage: 'Leer más',
				accept: 'Aceptar',
			},
		},
		details: {
			title: 'configuración de privacidad',
			back: 'Atrás',
			save: 'Guardar y salir',
		},
		summary: {
			title: 'Obtenga más información sobre cómo se usa la información.',
			description:
				'Nosotros y algunas empresas selectas podemos acceder y usar su información para los siguientes propósitos. Puede personalizar sus opciones a continuación o continuar usando nuestro sitio si está de acuerdo con los propósitos.',
			detailLink: 'Más información',
			who: {
				title: '¿Quién está usando esta información?',
				description:
					'Nosotros y las compañías preseleccionadas usaremos su información. Puede ver cada empresa en los enlaces de arriba o',
				link: 'mira la lista completa aquí.',
			},
			what: {
				title: '¿Qué información está siendo utilizada?',
				description: 'Diferentes compañías usan información diferente,',
				link: 'mira la lista completa aquí.',
			},
		},
		purposes: {
			title: 'Datos recolectados',
			description: 'A continuación se muestra la lista de datos que se pueden recopilar:',
			back: 'Configura cómo se usan estos datos',
			optoutdDescription:
				'Dependiendo del tipo de datos que recopilan, usan y procesan, y otros factores, incluida la privacidad por diseño, ciertos socios confían en su consentimiento, mientras que otros requieren que se excluya. Para obtener información sobre cada proveedor y ejercer sus elecciones, consulte a continuación. O para optar por no participar, visite los sitios de NAI, DAA o EDAA.',
			items: `<ul>
						<li>Tipo y configuración del navegador</li>
						<li>Información del sistema operativo</li>
						<li>Datos de cookies</li>
						<li>Información sobre el dispositivo utilizado</li>
						<li>La dirección IP desde la que el dispositivo accede al sitio web</li>
						<li>Información sobre la actividad del usuario en este dispositivo, incluidas las páginas web visitadas</li>
						<li>Información de geolocalización del dispositivo al acceder al sitio web</li>
					</ul>`,
			purpose1: {
				menu: 'Almacenamiento y acceso a la información',
				title: 'Almacenamiento y acceso a la información',
				description:
					'El almacenamiento y acceso a la información que ya está almacenada en su dispositivo, como identificadores publicitarios, identificadores de dispositivos, cookies y tecnologías similares.',
			},
			purpose2: {
				menu: 'Personalización',
				title: 'Personalización',
				description:
					'La recopilación y el procesamiento de información para personalizar posteriormente la publicidad y/o contenidos para usted, como en otros sitios web o aplicaciones, a lo largo del tiempo. Normalmente, la selección futura de publicidad y/o contenido.',
			},
			purpose3: {
				menu: 'Selección de anuncios, entregas, informes',
				title: 'Selección de anuncios, entregas, informes',
				description:
					'Recopilación de información y combinación de información recopilada previamente, para seleccionar y entregar anuncios para usted, medir la entrega y la efectividad de dichos anuncios. Esto incluye el uso de información recopilada previamente sobre sus intereses para seleccionar anuncios, procesar datos sobre qué publicidades se mostraron, con qué frecuencia se mostraron, cuándo y dónde se mostraron y si tomó alguna medida relacionada con el anuncio, incluyendo, por ejemplo, clicks sobre los anuncios o compras. Esto no incluye la personalización, que es la recopilación y el procesamiento de la información sobre el uso de este servicio para personalizar posteriormente la publicidad y / o contenido en otros contextos, como sitios web o aplicaciones, a lo largo del tiempo.',
			},
			purpose4: {
				menu: 'Selección de contenido, entrega, informes',
				title: 'Selección de contenido, entrega, informes',
				description:
					'Recopilación de información, y combinación con información recopilada previamente, para seleccionar y entregar contenido para usted, y para medir la entrega y la efectividad de dicho contenido. Esto incluye el uso de información recopilada anteriormente sobre sus intereses para seleccionar contenido, procesar datos sobre qué contenido se mostró, con qué frecuencia o durante cuánto tiempo se mostró, cuándo y dónde se mostró y si realizó alguna acción relacionada con el contenido, incluyendo por ejemplo, clicks sobre el contenido. Esto no incluye la personalización, que es la recopilación y el procesamiento de la información sobre el uso de este servicio para personalizar posteriormente el contenido y / o publicidad en otros contextos, como sitios web o aplicaciones, a lo largo del tiempo.',
			},
			purpose5: {
				menu: 'Medición',
				title: 'Medición',
				description:
					'Recopilación de información sobre su uso del contenido y la combinación con información recopilada anteriormente, utilizada para medir, comprender e informar sobre el uso que hace del servicio. Esto no incluye la personalización, la recopilación de información sobre el uso de este servicio para personalizar posteriormente el contenido y / o la publicidad en otros contextos, es decir, en otros servicios, como sitios web o aplicaciones, a lo largo del tiempo.',
			},
		},
		vendors: {
			title: 'Nuestros Partners',
			description:
				'Ayúdenos a ofrecerle un mejor servicio. Nuestros socios utilizan las cookies de su navegador para comprender, a través de la web, lo que le interesa y para ofrecerle contenido y publicidad relevantes.',
			accept: 'Aceptar',
			acceptAll: 'Aceptar todo',
			optOut: 'Requiere opt-out',
			back: 'Atrás',
		},
	},
	fr: {
		banner: {
			title: 'Utilisation des données',
			description:
				'Nos partenaires et nous utilisons des cookies afin d’adresser des contenus personnalisés et/ou publicités ciblées pour améliorer votre expérience.',
			links: {
				data: {
					title: 'Données utilisées',
					description: `<ul>
									<li>Données sur le navigateur utilisé</li>
									<li>Données sur le systeme d'exploitation utilisé</li>
									<li>Données des cookies</li>
									<li>Données spécifiques au terminal (ordinateur de bureau, mobile...)</li>
									<li>Adresse IP</li>
									<li>Données de navigation (pages visitées)</li>
									<li>Données de géolocalisation</li>
								</ul>`,
				},
				purposes: {
					title: 'Utilisation des données',
					description: 'A quoi servent ces données:',
				},
				manage: 'Préférences',
				accept: 'Continuer',
			},
		},
		summary: {
			title: 'Comment sont utilisées mes données ?',
			description:
				"Nos partenaires et nous-même utilisons les cookies (petits fichiers texte) du navigateur afin de comprendre les centres d'intérêt de nos visiteurs et ainsi leur proposer du contenu et de la publicité pertinents. Désormais, nous avons besoin de votre consentement.",
			detailLink: 'Informations et configuration',
			who: {
				title: 'Qui utilise mes données ?',
				description: `Seulement nos partenaires et nous-même pouvons utiliser vos données.
					Vous pouvez personnaliser vos choix ci-dessus ou continuer à utiliser notre site si vous êtes d'accord.`,
				link: 'Voir la liste complète de nos partenaires',
			},
			what: {
				title: 'Quelles données sont utilisées ?',
				description: 'Chaque partenaire utilise différemment vos données.',
				link: 'Voir la liste complète des données utilisées',
			},
		},
		details: {
			back: 'Retour',
			save: 'Valider et continuer sur le site',
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
				menu: "Stockage d'informations et accès",
				title: "Stockage d'informations et accès",
				description:
					'Autoriser le stockage d’informations ou l’accès à des informations déjà stockées sur votre appareil, telles que des identifiants publicitaires, des identifiants de dispositif, des cookies et des technologies similaires.',
			},
			purpose2: {
				menu: 'Personnalisation',
				title: 'Personnalisation',
				description:
					'Autoriser la collecte et le traitement d’informations sur votre utilisation de ce service pour ensuite personnaliser la publicité et/ou le contenu qui vous sont proposés dans d’autres contextes, tels que sur d’autres sites ou applications, au fil du temps. En règle générale, le contenu du site ou de l’application est utilisé pour déterminer vos centres d’intérêt et permettent de déterminer le choix de la publicité et/ou du contenu.',
			},
			purpose3: {
				menu: "Sélection d'annonces, diffusion, rapport",
				title: "Sélection d'annonces, diffusion, rapport",
				description:
					"Autoriser le traitement des données d'un utilisateur pour fournir du contenu ou des publicités et mesurer la diffusion de ces contenus ou publicités, extraire des informations et générer des rapports pour comprendre l'utilisation des services; et / ou accéder ou stocker des informations sur des dispositifs à cette fin. Inclura les caractéristiques suivantes:",
			},
			purpose4: {
				menu: 'Sélection de contenu, diffusion, rapport',
				title: 'Sélection de contenu, diffusion, rapport',
				description:
					"Autoriser le traitement des données d'un utilisateur pour la création de contenu personnalisé (y compris la diffusion, l'analyse et la création de rapports) en fonction des préférences ou des intérêts d'un utilisateur connus ou inférer à partir de données collectées sur plusieurs sites, applications ou appareils; et / ou accéder ou stocker des informations sur des dispositifs à cette fin. Inclura les caractéristiques suivantes:",
			},
			purpose5: {
				menu: 'Mesures',
				title: 'Mesures',
				description:
					'Autoriser la collecte d’informations sur votre utilisation du contenu et la combinaison avec des informations précédemment collectées, utilisées pour mesurer, comprendre et rendre compte de votre utilisation du service. Cela n’inclut pas la personnalisation, la collecte d’informations sur votre utilisation de ce service pour personnaliser ultérieurement le contenu et/ou la publicité dans d’autres contextes, par exemple sur d’autres services, tels que des sites ou des applications.',
			},
		},
		vendors: {
			title: 'Nos partenaires',
			description:
				'Aidez-nous à vous fournir une meilleure expérience en ligne! Nos partenaires utilisent des cookies et collectent des informations à partir de votre navigateur sur le Web pour vous fournir du contenu, diffuser des publicités pertinentes et analyser les audiences Web.',
			accept: 'Accepter',
			acceptAll: 'Accepter tout',
			optOut: '',
			back: 'Configurer comment ces sociétés récupèrent mes données',
		},
	},
	de: {
		banner: {
			title: 'Cookies helfen uns einen hochwertigen Service zu bieten',
			description: 'Wir und unsere Partner verwenden Cookies, um relevante Inhalte und Werbung bereitzustellen.',
			links: {
				data: {
					title: 'Verwendungszwecke',
					description: `<ul>
									<li>Browserdaten</li>
									<li>Betriebssystemdaten</li>
									<li>Cookie-Daten</li>
									<li>Gerätedaten (Desktop, Mobile etc.)</li>
									<li>IP-Adresse</li>
									<li>Nutzungsverhalten</li>
									<li>Geo-Daten</li>
								</ul>`,
				},
				purposes: {
					title: 'Verwendung von Daten',
					description: 'Wozu dienen diese Daten?',
				},
				manage: 'Einstellungen',
				accept: 'Akzeptieren und fortsetzen',
			},
		},
		summary: {
			title: 'Wie werden meine Daten verwendet?',
			description:
				'Unsere Partner und wir selbst verwenden Cookies (kleine Textdateien) des Browsers, um die Interessen unserer Besucher zu verstehen und ihnen relevante Inhalte und Werbung zur Verfügung zu stellen. Jetzt brauchen wir Ihre Zustimmung.',
			detailLink: 'Informationen und Einstellungen',
			who: {
				title: 'Wer nutzt meine Daten?',
				description:
					'Nur unsere Partner und wir können Ihre Daten verwenden. Sie können Ihre Auswahl oben anpassen oder unsere Website weiterhin nutzen, wenn Sie zustimmen.',
				link: 'Sehen Sie die komplette Liste unserer Partner',
			},
			what: {
				title: 'Welche Daten werden verwendet?',
				description: 'Jeder Partner verwendet Ihre Daten unterschiedlich.',
				link: 'Siehe die vollständige Liste der verwendeten Daten',
			},
		},
		details: {
			back: 'Zurück',
			save: 'Speichern und auf der Webseite fortfahren',
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
				description:
					'Speicherung von Informationen oder Zugriff auf Informationen, die bereits auf Ihrem Gerät gespeichert sind, z.B. Werbe-IDs, Geräte-IDs, Cookies und ähnliche Technologien.',
			},
			purpose2: {
				menu: 'Personalisierung',
				title: 'Personalisierung',
				description:
					'Die Erfassung und Verarbeitung von Informationen über Ihre Nutzung dieses Dienstes zur nachträglichen Personalisierung von Werbung und / oder Inhalten in anderen Kontexten, z.B. auf anderen Websites oder in anderen Apps. In der Regel wird der Inhalt der Website oder App verwendet, um Rückschlüsse auf Ihre Interessen zu ziehen, die die zukünftige Auswahl von Werbung und / oder Inhalten beeinflussen.',
			},
			purpose3: {
				menu: 'Auslieferung und Berichte von Anzeigen',
				title: 'Auslieferung und Berichte von Anzeigen',
				description:
					'Die Sammlung von Informationen und die Kombination mit zuvor gesammelten Informationen, um Werbung für Sie auszuwählen und zu liefern und die Lieferung und Wirksamkeit solcher Werbung zu messen. Dies beinhaltet die Verwendung zuvor gesammelter Informationen über Ihre Interessen zur Auswahl von Anzeigen, die Verarbeitung von Daten darüber, welche Werbeanzeigen gezeigt wurden, wie oft sie gezeigt wurden, wann und wo sie gezeigt wurden und ob Sie irgendwelche Maßnahmen im Zusammenhang mit der Werbung ergriffen haben, einschließlich z Anzeige oder einen Kauf tätigen. Dies umfasst nicht die Personalisierung, dh die Sammlung und Verarbeitung von Informationen über Ihre Nutzung dieses Dienstes, um später Werbung und / oder Inhalte in anderen Kontexten wie Websites oder Apps im Laufe der Zeit zu personalisieren',
			},
			purpose4: {
				menu: 'Auslieferung und Berichte von Inhalten',
				title: 'Auslieferung und Berichte von Inhalten',
				description:
					'Die Sammlung von Informationen und die Kombination mit zuvor gesammelten Informationen, um Inhalte für Sie auszuwählen und zu liefern und die Lieferung und Effektivität solcher Inhalte zu messen. Dies beinhaltet die Verwendung zuvor gesammelter Informationen über Ihre Interessen, um Inhalte auszuwählen, Daten darüber zu verarbeiten, welcher Inhalt gezeigt wurde, wie oft oder wie lange er angezeigt wurde, wann und wo er gezeigt wurde und ob Sie irgendwelche Maßnahmen in Bezug auf den Inhalt ergriffen haben zum Beispiel klicken auf Inhalt. Dies beinhaltet nicht die Personalisierung, dh die Sammlung und Verarbeitung von Informationen über Ihre Nutzung dieses Dienstes, um Inhalte und / oder Werbung für Sie später in anderen Kontexten wie Websites oder Apps zu personalisieren.',
			},
			purpose5: {
				menu: 'Zielgruppenmessung',
				title: 'Zielgruppenmessung',
				description:
					'Die Sammlung von Informationen über Ihre Nutzung des Inhalts und die Kombination mit zuvor gesammelten Informationen, die verwendet werden, um Ihre Nutzung des Dienstes zu messen, zu verstehen und darüber zu berichten. Dies umfasst nicht die Personalisierung, die Sammlung von Informationen über Ihre Nutzung dieses Dienstes, um Inhalte und / oder Werbung für Sie in anderen Kontexten, d. H. Auf anderen Diensten, wie Websites oder Apps, im Zeitverlauf zu personalisieren.',
			},
		},
		vendors: {
			title: 'Unsere Partner',
			description:
				'Helfen Sie uns, Ihnen eine bessere Online-Erfahrung zu bieten! Unsere Partner verwenden Cookies und sammeln Informationen von Ihrem Browser im Internet, um Sie mit Inhalten zu versorgen, relevante Werbung auszuliefern und Zielgruppen im Internet zu analysieren.',
			accept: 'Akzeptieren',
			acceptAll: 'Alle akzeptieren / deaktivieren',
			optOut: 'Benötigt Opt-Out',
			back: 'Zurück',
		},
	},
	pl: {
		banner: {
			title: 'Reklamy pomagają nam rozwijać tę stronę',
			description:
				'Kiedy odwiedzasz naszą stronę, wstępnie wybrane firmy mogą odczytywać i korzystać z określonych informacji zapisanych na Twoim urządzeniu, aby wyświetlać odpowiednie reklamy bądź spersonalizowane treści.',
			links: {
				data: {
					title: 'Informacje jakie mogą być używane.',
					description: `<ul>
						<li>Rodzaj przeglądarki i jej ustawienia</li>
						<li>Informacje o systemie operacyjnym urządzenia</li>
						<li>Informacje zawarte w ciasteszkach (cookie)</li>
						<li>Informacje o innych identyfikatorach przypisanych do urządzenia</li>
						<li>Adres IP z którego urządzenie łączy się ze stroną lub aplikacją mobilną</li>
						<li>Informacje o aktywności użytkownika na tym urządzeniu włącznie z odwiedzonymi bądź używanymi stronami i aplikacjami mobilnymi</li>
						<li>Informacje o lokalizacji geograficznej urządzenia podczas połączenia ze stroną bądź aplikacją mobilną</li>
					</ul>`,
				},
				purposes: {
					title: 'Cele przechowywania informacji.',
					description: 'W jaki sposób informacje mogą być używane:',
				},
				manage: 'Zobacz więcej',
				accept: '<b>Akceptuję</b>',
			},
		},
		summary: {
			title: 'W jaki sposób informacje są używane?',
			description:
				'My oraz wybrane firmy mogą odczytywać i korzystać z Twoich danych dla niżej wymienionych celów. Poniżej możesz zmienić ustawienia albo przejść do serwisu, jeżeli akceptujesz te ustawienia.',
			detailLink: 'Zobacz więcej i zmień ustawienia',
			who: {
				title: 'Kto korzysta z tych informacji?',
				description:
					'My oraz wstępnie wybrane firmy będą korzystać z Twoich danych. Możesz przejrzeć listę firm za pomocą odnośników powyżej albo',
				link: 'wyświetlić pełną listę tutaj',
			},
			what: {
				title: 'Jakie informacje mogą być używane?',
				description: 'Poszczególne firmy korzystają z różnych danych,',
				link: 'zobacz pełną listę tutaj',
			},
		},
		details: {
			back: 'Wstecz',
			save: '<b>Zapisz i przejdź do serwisu</b>',
		},
		purposes: {
			title: 'Jakie informacje mogą być używane?',
			description: 'Poniżej znajduje się pełna lista informacji, jakie mogą być gromadzone.',
			back: 'Dostosuj sposób, w jaki dane z poprzedniej strony są używane',
			optoutdDescription: `W zależności od rodzaju danych, które są zbierane, używane
			i przetwarzane, a także innych czynników włączając uwzględnienie ochrony prywatności na etapie projektowania systemu,
			niektórzy partnerzy polegają na Twojej zgodzie, podczas gdy inni wymagają odwołania zgody.
			Aby uzyskać więcej informacji oraz dokonać wyboru, zobacz poniżej.
			Ewentualnie aby odwołać zgodę odwiedź stronę <a href='http://optout.networkadvertising.org/?c=1#!/' target='_blank'>NAI</a>,
			<a href='http://optout.aboutads.info/?c=2#!/' target='_blank'>DAA</a>
			lub <a href='http://youronlinechoices.eu/' target='_blank'>EDAA</a>.`,
			items: `<ul>
				<li>Rodzaj przeglądarki i jej ustawienia</li>
				<li>Informacje o systemie operacyjnym urządzenia</li>
				<li>Informacje zawarte w ciasteszkach (cookie)</li>
				<li>Informacje o innych identyfikatorach przypisanych do urządzenia</li>
				<li>Adres IP z którego urządzenie łączy się ze stroną lub aplikacją mobilną</li>
				<li>Informacje o aktywności użytkownika na tym urządzeniu włącznie z odwiedzonymi bądź używanymi stronami i aplikacjami mobilnymi</li>
				<li>Informacje o lokalizacji geograficznej urządzenia podczas połączenia ze stroną bądź aplikacją mobilną</li>
			</ul>`,
			purpose1: {
				menu: 'Zapisywanie i odczytywanie informacji',
				title: 'Zapisywanie i odczytywanie informacji',
				description:
					'Co to oznacza: zapisywanie informacji albo odczytywanie informacji, które zostały już zapisane na Twoim urządzeniu - takich jak identyfikatory reklamowe, identyfikatory urządzenia, ciasteczka (cookie) i podobne technologie.',
			},
			purpose2: {
				menu: 'Personalizacja',
				title: 'Personalizacja',
				description:
					'Co to oznacza: zbieranie i przetwarzanie informacji o Twoim sposobie używania serwisu, aby potem z biegiem czasu personalizować dla Ciebie reklamy i/lub treść w innym kontekście - takim jak inne strony lub aplikacje. Zwykle treści ze strony lub aplikacji są używane do przewidywania Twoich zainteresowań, na podstawie których w przyszłości są dobierane reklamy i/lub treść.',
			},
			purpose3: {
				menu: 'Dobieranie, dostarczanie, raportowanie reklam',
				title: 'Dobieranie, dostarczanie, raportowanie reklam',
				description:
					'Co to oznacza: zbieranie informacji i łączenie ich z wcześniej zebranymi informacjami w celu dobrania i dostarczenia Ci reklam, a także pomiaru dostarczalności i efektywności takich reklam. To dotyczy również wcześniej zebranych informacji o Twoich zainteresowaniach w celu dobrania reklam, przetwarzania danych o reklamach które zostały wyświetlone, jak często były wyświetlane, kiedy i gdzie były wyświetlone i czy została wykonana na nich jakaś akcja - na przykład kliknięcie w reklamę albo dokonanie zakupu. To nie dotyczy personalizacji, która oznacza zbieranie i przetwarzanie informacji o Twoim sposobie używania serwisu, aby potem z biegiem czasu personalizować dla Ciebie reklamy i/lub treść w innym kontekście - takim jak inne strony lub aplikacje.',
			},
			purpose4: {
				menu: 'Dobieranie, dostarczanie, raportowanie treści',
				title: 'Dobieranie, dostarczanie, raportowanie treści',
				description:
					'Co to oznacza: zbieranie informacji i łączenie ich z wcześniej zebranymi informacjami w celu dobrania i dostarczenia Ci treści, a także pomiaru dostarczalności i efektywności takich treści. To dotyczy również wcześniej zebranych informacji o Twoich zainteresowaniach w celu dobrania treści, przetwarzania danych o treściach które zostały wyświetlone, jak często były wyświetlane, kiedy i gdzie były wyświetlone i czy została wykonana na nich jakaś akcja - na przykład kliknięcie na treści. To nie dotyczy personalizacji, która oznacza zbieranie i przetwarzanie informacji o Twoim sposobie używania serwisu, aby potem z biegiem czasu personalizować dla Ciebie reklamy i/lub treść w innym kontekście - takim jak inne strony lub aplikacje.',
			},
			purpose5: {
				menu: 'Pomiary',
				title: 'Pomiary',
				description:
					'Co to oznacza: zbieranie informacji o Twoim sposobie używania treści i łączenie ich z wcześniej zebranymi informacjami w celu pomiarów, zrozumienia i raportowania Twojego sposobu używania serwisu. To nie dotyczy personalizacji, która oznacza zbieranie i przetwarzanie informacji o Twoim sposobie używania serwisu, aby potem z biegiem czasu personalizować dla Ciebie reklamy i/lub treść w innym kontekście - takim jak inne strony lub aplikacje.',
			},
		},
		vendors: {
			title: 'Kto korzysta z tych informacji?',
			description:
				'Tutaj możesz zobaczyć pełną listę firm, które korzystają z Twoich informacji. Aby dowiedzieć się więcej, zobacz ich politykę prywatności.',
			accept: 'Akceptuję',
			acceptAll: 'Zaakceptuj wszystko',
			optOut: 'wymaga odwołania zgody',
			back: 'Dostosuj sposób, w jaki te firmy korzystają z danych z poprzedniej strony',
		},
	},
	it: {
		banner: {
			title: 'Uso dei cookies',
			description:
				'Utilizziamo i nostri "cookie" e di terze parti per raccogliere informazioni statistiche e mostrarti pubblicità personalizzata attraverso l\'analisi della tua navigazione. Se continui a navigare, accetti tale utilizzo',
			links: {
				data: {
					title: 'Informazioni che possono essere utilizzate.',
					description: `<ul>
									<li>Tipo di browser e sua configurazione</li>
									<li>Informazioni sul sistema operativo del dispositivo</li>
									<li>Informazioni sui cookie</li>
									<li>Informazioni su altri identificatori assegnati al dispositivo</li>
									<li>Indirizzo IP da cui il dispositivo accede al sito Web o all'applicazione mobile</li>
									<li>Informazioni sull'attività dell'utente su questo dispositivo, comprese le pagine Web e le applicazioni mobile visitate o utilizzate</li>
									<li>Informazioni sulla posizione geografica del dispositivo quando si accede a un sito Web o un'applicazione mobile</li>
								</ul>`,
				},
				purposes: {
					title: 'Uso dei dati.',
					description: 'Come possono essere utilizzate le informazioni:',
				},
				manage: 'Leggi di più',
				accept: 'Accetta',
			},
		},
		details: {
			title: 'Impostazioni sulla privacy',
			back: 'Indietro',
			save: 'Salva ed esci',
		},
		summary: {
			title: 'Ulteriori informazioni su come vengono utilizzate le informazioni.',
			description:
				"Noi e alcune società selezionate possiamo accedere e utilizzare le tue informazioni per i seguenti scopi. Puoi personalizzare le tue opzioni qui sotto o continuare a utilizzare il nostro sito se sei d'accordo con gli scopi.",
			detailLink: 'Maggiori informazioni',
			who: {
				title: 'Chi sta usando queste informazioni?',
				description:
					'Noi e le società preselezionate utilizziamo le tue informazioni. Puoi vedere ciascuna compagnia nei link sopra.',
				link: "Guarda l'elenco completo qui.",
			},
			what: {
				title: 'Quali informazioni vengono utilizzate?',
				description: 'Diverse aziende usano informazioni diverse,',
				link: "Guarda l'elenco completo qui.",
			},
		},
		purposes: {
			title: 'Dati raccolti',
			description: "Di seguito è riportato l'elenco dei dati che possono essere raccolti:",
			back: 'Configura come vengono utilizzati questi dati',
			optoutdDescription:
				'A seconda del tipo di dati che raccolgono, utilizzano e elaborano, e di altri fattori, inclusa la privacy in base alla progettazione, alcuni partner fanno affidamento sul loro consenso, mentre altri richiedono che vengano esclusi. Per informazioni su ciascun fornitore ed esercitare le tue scelte, vedi sotto. O per rinunciare, visitare i siti NAI, DAA o EDAA.',
			items: `<ul>
						<li>Tipo e configurazione del browser</li>
						<li>Informazioni sul sistema operativo</li>
						<li>Dati dei cookie</li>
						<li>Informazioni sul dispositivo utilizzato</li>
						<li>L'indirizzo IP da cui il dispositivo accede al sito Web</li>
						<li>Informazioni sull'attività dell'utente su questo dispositivo, comprese le pagine Web visitate</li>
						<li>Informazioni sulla posizione del dispositivo quando si accede al sito Web</li>
					</ul>`,
			purpose1: {
				menu: 'Archiviazione e accesso alle informazioni',
				title: 'Archiviazione e accesso alle informazioni',
				description:
					"La memorizzazione e l'accesso alle informazioni già memorizzate sul dispositivo, come identificatori pubblicitari, identificativi del dispositivo, cookie e tecnologie simili.",
			},
			purpose2: {
				menu: 'Personalizzazione',
				title: 'Personalizzazione',
				description:
					"La raccolta e l'elaborazione di informazioni per personalizzare successivamente la pubblicità e / o il contenuto per te, come in altri siti Web o applicazioni, nel tempo. Normalmente, la futura selezione di pubblicità e / o contenuti.",
			},
			purpose3: {
				menu: 'Selezione degli annunci, diffusione, report',
				title: 'Selezione degli annunci, diffusione, report',
				description:
					"Consentire l'elaborazione dei dati di un utente per fornire contenuti o annunci pubblicitari e misurare la diffusione di tali contenuti o pubblicità, estrarre informazioni e generare rapporti per comprendere l'uso dei servizi; e / o accedere o memorizzare informazioni sui dispositivi per questo scopo. Includi le seguenti funzionalità.",
			},
			purpose4: {
				menu: 'Selezione dei contenuti, diffusione, report',
				title: 'Selezione dei contenuti, diffusione, report',
				description:
					"Raccolta di informazioni e combinazione con informazioni precedentemente raccolte per selezionare e fornire contenuti per te e per misurare la consegna e l'efficacia di tali contenuti. Ciò include l'uso delle informazioni raccolte in precedenza sui tuoi interessi per selezionare il contenuto, elaborare i dati su quale contenuto è stato visualizzato, con quale frequenza o per quanto tempo è stato mostrato, quando e dove è stato visualizzato e se hai intrapreso qualche azione relativa al contenuto, incluso esempio, clic sul contenuto. Ciò non include la personalizzazione, che è la raccolta e l'elaborazione di informazioni sull'uso di questo servizio per personalizzare successivamente il contenuto e / o la pubblicità in altri contesti, come siti Web o applicazioni, nel tempo.",
			},
			purpose5: {
				menu: 'Misurazione',
				title: 'Misurazione',
				description:
					"Raccolta di informazioni sull'utilizzo del contenuto e sulla combinazione di informazioni raccolte in precedenza, utilizzate per misurare, comprendere e riferire sull'utilizzo del servizio. Ciò non include la personalizzazione, la raccolta di informazioni sull'uso di questo servizio per personalizzare successivamente il contenuto e / o la pubblicità in altri contesti, ovvero in altri servizi, come siti Web o applicazioni, nel tempo.",
			},
		},
		vendors: {
			title: 'I nostri partner',
			description:
				'Aiutaci ad offrirti un servizio migliore. I nostri partner utilizzano i loro cookie del browser per comprendere, attraverso il web, i loro interessi e offrire contenuti e pubblicità pertinenti.',
			accept: 'Accetta',
			acceptAll: 'Accetta tutto',
			optOut: 'Richiede la rinuncia',
			back: 'Indietro',
		},
	},
};
