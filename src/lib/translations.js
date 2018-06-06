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
	es: {
		banner: {
			title: 'Uso de cookies',
			description: 'Utilizamos "cookies" propias y de terceros para elaborar información estadística y mostrarle publicidad personalizada a través del análisis de su navegación. Si continúa navegando acepta su uso.',
			links: {
				data: {
					title: '',
					description: ''
				},
				purposes: {
					title: '',
					description: ''
				},
				manage: 'Leer más',
				accept: 'Aceptar'
			}
		},
		details: {
			title: 'configuración de privacidad',
			back: 'Atrás',
			save: 'Guardar y salir'
		},
		summary: {
			title: 'Obtenga más información sobre cómo se usa la información.',
			description: 'Nosotros y algunas empresas selectas podemos acceder y usar su información para los siguientes propósitos. Puede personalizar sus opciones a continuación o continuar usando nuestro sitio si está de acuerdo con los propósitos.',
			detailLink: 'Más información',
			who:{
				title:'¿Quién está usando esta información?',
				description:'Nosotros y las compañías preseleccionadas usaremos su información. Puede ver cada empresa en los enlaces de arriba o',
				link:'mira la lista completa aquí.'
			},
			what:{
				title:'¿Qué información está siendo utilizada?',
				description:'Diferentes compañías usan información diferente,',
				link:'mira la lista completa aquí.'
			}
		},
		purposes: {
			title: 'Datos recolectados',
			description: 'A continuación se muestra la lista de datos que se pueden recopilar:',
			back: 'Configura cómo se usan estos datos',
			optoutdDescription: 'Dependiendo del tipo de datos que recopilan, usan y procesan, y otros factores, incluida la privacidad por diseño, ciertos socios confían en su consentimiento, mientras que otros requieren que se excluya. Para obtener información sobre cada proveedor y ejercer sus elecciones, consulte a continuación. O para optar por no participar, visite los sitios de NAI, DAA o EDAA.',
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
				description: 'El almacenamiento y acceso a la información que ya está almacenada en su dispositivo, como identificadores publicitarios, identificadores de dispositivos, cookies y tecnologías similares.'
			},
			purpose2: {
				menu: 'Personalización',
				title: 'Personalización',
				description: 'La recopilación y el procesamiento de información para personalizar posteriormente la publicidad y/o contenidos para usted, como en otros sitios web o aplicaciones, a lo largo del tiempo. Normalmente, la selección futura de publicidad y/o contenido.'
			},
			purpose3: {
				menu: 'Selección de anuncios, entregas, informes',
				title: 'Selección de anuncios, entregas, informes',
				description: 'Recopilación de información y combinación de información recopilada previamente, para seleccionar y entregar anuncios para usted, medir la entrega y la efectividad de dichos anuncios. Esto incluye el uso de información recopilada previamente sobre sus intereses para seleccionar anuncios, procesar datos sobre qué publicidades se mostraron, con qué frecuencia se mostraron, cuándo y dónde se mostraron y si tomó alguna medida relacionada con el anuncio, incluyendo, por ejemplo, clicks sobre los anuncios o compras. Esto no incluye la personalización, que es la recopilación y el procesamiento de la información sobre el uso de este servicio para personalizar posteriormente la publicidad y / o contenido en otros contextos, como sitios web o aplicaciones, a lo largo del tiempo.'
				
			},
			purpose4: {
				menu: 'Selección de contenido, entrega, informes',
				title: 'Selección de contenido, entrega, informes',
				description: 'Recopilación de información, y combinación con información recopilada previamente, para seleccionar y entregar contenido para usted, y para medir la entrega y la efectividad de dicho contenido. Esto incluye el uso de información recopilada anteriormente sobre sus intereses para seleccionar contenido, procesar datos sobre qué contenido se mostró, con qué frecuencia o durante cuánto tiempo se mostró, cuándo y dónde se mostró y si realizó alguna acción relacionada con el contenido, incluyendo por ejemplo, clicks sobre el contenido. Esto no incluye la personalización, que es la recopilación y el procesamiento de la información sobre el uso de este servicio para personalizar posteriormente el contenido y / o publicidad en otros contextos, como sitios web o aplicaciones, a lo largo del tiempo.'
				
			},
			purpose5: {
				menu: 'Medición',
				title: 'Medición',
				description: 'Recopilación de información sobre su uso del contenido y la combinación con información recopilada anteriormente, utilizada para medir, comprender e informar sobre el uso que hace del servicio. Esto no incluye la personalización, la recopilación de información sobre el uso de este servicio para personalizar posteriormente el contenido y / o la publicidad en otros contextos, es decir, en otros servicios, como sitios web o aplicaciones, a lo largo del tiempo.'
				
			},
		},
		vendors: {
			title: 'Nuestros Partners',
			description: 'Ayúdenos a ofrecerle un mejor servicio. Nuestros socios utilizan las cookies de su navegador para comprender, a través de la web, lo que le interesa y para ofrecerle contenido y publicidad relevantes.',
			accept: 'Aceptar',
			acceptAll: 'Aceptar todo',
			optOut: 'Requiere opt-out',
			back : 'Atrás'
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
	}
};
