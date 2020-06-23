/* eslint-disable quotes */
/**
 * FR / French
 */

const features = {
	menu: 'Fonctionnalités',
	feature1: {
		name: 'Correspondance des données avec des sources hors ligne',
		description: `Combinaison des données provenant de sources hors ligne qui ont été initialement recueillies dans d'autres contextes.`,
	},
	feature2: {
		name: `Mise en lien d'appareils`,
		description: `Permet le traitement des données d'un utilisateur pour connecter cet utilisateur sur plusieurs appareils.`,
	},
	feature3: {
		name: `Données précises sur l'emplacement géographique`,
		description: `Permettent le traitement des données de localisation géographique précises d'un utilisateur à l'appui de la réalisation d'un objectif pour lequel un tiers mentionné ici a obtenu un consentement.`,
	},
};

export default {
	banner: {
		title: `Choix en matière de vie privée`,
		description: `
			En utilisant ce site, vous acceptez l’utilisation des cookies et des informations nécessaires pour vous fournir un contenu et des publicités personnalisées, ainsi que pour mesurer et analyser l’utilisation du site. Cliquez sur "En savoir plus" pour modifier vos paramètres.
		`,
		links: {
			data: {
				title: `Informations pouvant être utilisées`,
				description: `
					<ul>
						<li>Type de navigateur et ses paramètres</li>
						<li>Informations sur le système d'exploitation de l'appareil</li>
						<li>Informations cookies</li>
						<li>Informations sur d'autres identifiants attribués à l'appareil</li>
						<li>L'adresse IP à partir de laquelle l'appareil accède au site Internet ou
							à l'application mobile d'un client
						</li>
						<li>Informations sur l'activité de l'utilisateur sur cet appareil, y compris les pages
							web et les applications mobiles visitées ou utilisées
						</li>
						<li>Informations sur l'emplacement géographique de l'appareil lorsqu'il
							accède
							à un site Internet ou à une application mobile
						</li>
					</ul>
				`,
			},
			purposes: {
				title: `Finalités du stockage d'informations`,
			},
			manage: 'En savoir plus',
			accept: 'OK, j’ai compris',
		},
	},
	summary: {
		title: 'En savoir plus sur la façon dont les informations sont utilisées ?',
		description: `Nous et certaines sociétés sélectionnées pouvons accéder à vos informations et les utiliser
			pour les raisons exposées ci-dessous. Vous pouvez personnaliser vos choix ci-dessous ou
			continuer à utiliser notre site si vous êtes d'accord avec ces raisons.`,
		detailLink: 'En savoir plus et Définir les préférences',
		who: {
			title: 'Qui utilise ces informations ?',
			description: `Nous et les sociétés présélectionnées utiliserons vos informations. Vous pouvez consulter
				chaque société figurant dans les liens ci-dessus ou`,
			link: 'consulter la liste complète ici.',
		},
		what: {
			title: 'Quelles informations sont utilisées ?',
			description: 'Différentes sociétés utilisent différentes informations,',
			link: 'consultez la liste complète ici.',
		},
	},
	details: {
		back: 'Retour',
		save: 'Ok, j’ai compris',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `
			<p>
				Test. Selon le type de données qu'ils collectent, utilisent et traitent, ainsi que d'autres facteurs y compris la vie privée dès la conception,
				certains partenaires comptent sur votre consentement tandis que d'autres vous demandent de vous désinscrire. Pour plus d'informations sur chaque fournisseur et pour
				appliquer vos choix, voir ci-dessous. Ou visitez ces sites
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
				pour vous désinscrire.
			</p>
		`,
		purpose1: {
			description: `Autoriser le stockage ou l'accès aux informations sur l'appareil d'un utilisateur.`,
			menu: `Test de stockage et d'accès aux informations`,
			optoutDescription: '',
		},
		purpose2: {
			description: `
				Autoriser le traitement des données d'un utilisateur pour fournir et générer de la publicité personnalisée (y compris la diffusion, la mesure et les rapports) en fonction des préférences d'un utilisateur ou de ses intérêts connus ou déduits à partir des données recueillies sur plusieurs sites, applications ou appareils ; et / ou accéder à ou stocker des informations sur des appareils à cette fin.
				Comprendra les fonctionnalités suivantes :
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>
			`,
			menu: 'Personnalisation',
		},
		purpose3: {
			description: `
				Autoriser le traitement des données d'un utilisateur pour distribuer du contenu ou des publicités et mesurer la diffusion de ces contenus ou publicités, extraire des informations et générer des rapports pour comprendre l'utilisation des services ; et / ou accéder à ou stocker des informations sur des appareils à cette fin.
				Comprendra les fonctionnalités suivantes :
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>
			`,
			menu: 'Sélection de publicités, diffusion, rapports',
		},
		purpose4: {
			description: `
				Autoriser le traitement des données d'un utilisateur pour fournir et générer du contenu personnalisé (y compris la diffusion, la mesure et les rapports) en fonction des préférences d'un utilisateur ou de ses intérêts connus ou déduits à partir des données recueillies sur plusieurs sites, applications ou appareils ; et / ou accéder à ou stocker des informations sur des appareils à cette fin.
				Comprendra les fonctionnalités suivantes :
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>
			`,
			menu: 'Sélection de contenus, diffusion, rapports',
		},
		purpose5: {
			description: `
				La collecte d'informations sur votre utilisation du contenu et la combinaison avec des informations précédemment collectées, sont utilisées pour mesurer, comprendre et rendre compte de votre utilisation du service. Cela n'inclut pas la personnalisation, la collecte d'informations sur votre utilisation de ce service pour personnaliser ultérieurement le contenu et / ou la publicité qui vous sera adressé dans d'autres contextes, c'est-à-dire sur d'autres services, tels que des sites Internet ou des applications, au fil du temps.
			`,
			menu: 'Mesures',
		},
	},
	vendors: {
		title: 'Qui utilise ces informations ?',
		description: `
			Voici la liste complète des sociétés qui utiliseront vos informations. Veuillez consulter leur politique de confidentialité pour plus de détails.
		`,
		accept: 'Autoriser',
		acceptAll: '"Autoriser tout',
		acceptNone: 'Refuser tout',
		optOut: 'requiert une désinscription',
		back: 'Personnalisez la façon dont ces sociétés utilisent les données à partir de la page précédente',
	},
	features,
	footer: {
		message: `
			<h2>Nous respectons la vie privée</h2>
		`,
		description: `
			<span>
				Pour aider à améliorer ce site Internet, personnaliser et améliorer
				votre expérience de contenu, à des fins publicitaires et pour analyser
				notre fréquentation, nous et nos partenaires utilisons des technologies telles que les cookies,
				les pixels et / ou les balises pour collecter certaines données. En
				poursuivant votre navigation sur le site ou en cliquant sur "OK", vous acceptez
				l'utilisation de cette technologie et la collecte des données.
			</span>
		`,
		privacyPolicy: `
			<span>
				Veuillez consulter notre
				<a target="_blank" href="http://system1.com/terms/privacy.html">
					Politique de confidentialité
				</a>
				pour en savoir plus sur la façon dont nous recueillons et utilisons les données. Vous pouvez modifier
				vos paramètres à tout moment en cliquant sur
			</span>
		`,
		privacyPolicyButton: 'Gérer les Paramètres de confidentialité',
		consentLink: 'OK',
	},
};
