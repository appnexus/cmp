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
	fr: {
		intro: {
			title: 'Ce site utilise des cookies',
			description: 'Nos partenaires et nous-mêmes utilisons les cookies (petits fichiers texte) du navigateur afin de comprendre les centres d’intérêt de nos visiteurs et ainsi leur proposer du contenu et de la publicité pertinents. Désormais, nous avons besoin de votre consentement. Pour obtenir plus d’informations, cliquez sur le bouton "Afficher les finalités".',
			acceptAll: 'Accepter tous les cookies',
			rejectAll: 'Refuser tous les cookies',
			showPurposes: 'Afficher les finalités'
		},
		details: {
			title: 'Paramètres de confidentialité',
			back: 'Annuler',
			save: 'Sauver et quitter'
		},
		purposes: {
			active: 'Oui',
			inactive: 'Non',
			showVendors: 'Afficher les vendeurs',
			cookies: {
				menu: 'Comment nous utilisons les cookies',
				title: 'Ce site utilise des cookies',
				description: 'Nos partenaires et nous-mêmes utilisons les cookies (petits fichiers texte) du navigateur afin de comprendre les centres d’intérêts de nos visiteurs et ainsi leur proposer du contenu et de la publicité pertinents.'
			},
			purpose1: {
				menu: 'Stockage d’informations et accès',
				title: 'Stockage d’informations et accès',
				description: 'Autoriser le stockage d’informations ou l’accès à des informations déjà stockées sur votre appareil, telles que des identifiants publicitaires, des identifiants de dispositif, des cookies et des technologies similaires.'
			},
			purpose2: {
				menu: 'Personnalisation',
				title: 'Personnalisation',
				description: 'Autoriser la collecte et le traitement d’informations sur votre utilisation de ce service pour ensuite personnaliser la publicité et/ou le contenu qui vous sont proposés dans d’autres contextes, tels que sur d’autres sites ou applications, au fil du temps. En règle générale, le contenu du site ou de l’application est utilisé pour déterminer vos centres d’intérêt et permettent de déterminer le choix de la publicité et/ou du contenu.'
			},
			purpose3: {
				menu: 'Sélection d’annonces, livraison, rapports',
				title: 'Sélection d’annonces, livraison, rapports',
				description: 'Autoriser la collecte d’informations et la combinaison avec des informations précédemment collectées pour sélectionner et livrer des publicités pour vous et pour mesurer la livraison et l’efficacité de ces publicités. Cela inclut l’utilisation d’informations précédemment collectées sur vos centres d’intérêt pour sélectionner des publicités, le traitement des données d’affichage, la fréquence à laquelle elles ont été diffusées, le moment et l’endroit où elles ont été diffusées et si vous avez ou pas effectué une action en relation avec la publicité, par exemple cliqué sur l’annonce ou réalisé un achat. Cela n’inclut pas la Personnalisation, qui consiste à collecter et à traiter des informations sur votre utilisation de ce service pour ensuite personnaliser la publicité et/ou le contenu pour vous dans d’autres contextes, tels que des sites ou des applications, au fil du temps.'
			},
			purpose4: {
				menu: 'Sélection de contenu, livraison, rapports',
				title: 'Sélection de contenu, livraison, rapports',
				description: 'Autoriser la collecte d’informations et la combinaison avec des informations précédemment collectées pour sélectionner et livrer du contenu pour vous et pour mesurer la livraison et l’efficacité de ce contenu. Cela inclut l’utilisation d’informations précédemment collectées sur vos centres d’intérêt pour sélectionner du contenu, le traitement des données d’affichage, combien de fois ou combien de temps il a été diffusé, le moment et l’endroit où il a été diffusé et si vous avez ou pas effectué une action en relation avec le contenu, par exemple en cliquant sur celui-ci. Cela n’inclut pas la Personnalisation, qui consiste à collecter et à traiter des informations sur votre utilisation de ce service pour ensuite personnaliser le contenu et/ou la publicité pour vous dans d’autres contextes, tels que des sites ou des applications, au fil du temps.'
			},
			purpose5: {
				menu: 'Mesures',
				title: 'Mesures',
				description: 'Autoriser la collecte d’informations sur votre utilisation du contenu et la combinaison avec des informations précédemment collectées, utilisées pour mesurer, comprendre et rendre compte de votre utilisation du service. Cela n’inclut pas la personnalisation, la collecte d’informations sur votre utilisation de ce service pour personnaliser ultérieurement le contenu et/ou la publicité dans d’autres contextes, par exemple sur d’autres services, tels que des sites ou des applications.'
			}
		},
		vendors: {
			title: 'Nos partenaires',
			rejectAll: 'Tout rejeter',
			acceptAll: 'Tout accepter',
			company: 'Société',
			offOn: 'Non/Oui',
			description: 'Aidez-nous à vous offrir un meilleur service ! Nos partenaires utilisent les cookies de votre navigateur pour comprendre, sur le web, ce qui vous intéresse et pour vous proposer du contenu et de la publicité pertinents.',
			moreChoices: 'Autres options'
		},
		footer: {
			message: 'Vous pouvez modifier vos paramètres de confidentialité',
			consentLink: 'ici'
		}
	}
};
