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
            back: ''
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
            back: 'Configurer comment ces sociétés récupèrent mes données'
        }
    },
    it: {
        banner: {
            title: 'I cookies ci aiutano ad offrirvi un servizio di qualità.',
            description: 'Quando visiti il nostro sito, alcune società selezionate potrebbero accedere ed usare le informazioni presenti sul tuo dispositivo per mostrare pubblicità specifiche o contenuti personalizzati.',
            links: {
                data: {
                    title: 'Informazioni che potrebbero essere utilizzate',
                    description: `Informazioni che potrebbero essere utilizzate:
								<ul>
									<li>Il tipo di browser e le sue impostazioni</li>
									<li>Sistema operativo del dispositivo</li>
									<li>Informazioni sui cookies</li>
									<li>Information about other identifiers assigned to the device</li>
									<li>Indirizzo IP dal quale il device accede al sito</li>
									<li>Informazioni sulle attività dell\'utente su quel device, incluse pagine web visitate o mobile app usate</li>
									<li>Informazioni riguardo la posizione geografica del device quando accede al sito o alla app mobile</li>
								</ul>`
                },
                purposes: {
                    title: 'Finalità per le quali è necessario salvare le informazioni.',
                    description: `Come le informazioni potrebbero essere usate:
								<ul>
									<li>Salvataggio e accesso di informazioni</li>
									<li>Selezione ed erogazione di pubblicità</li>
									<li>Selezione ed erogazione di contenuti</li>
									<li>Personalizzazioni</li>
									<li>Misurazioni</li>
								</ul>`
                },
                manage: 'Maggiori informazioni',
                accept: 'Continua sul sito'
            }
        },
        summary: {
            title: 'Scopri di più su come le informazioni vengono utilizzate',
            description: 'Selezioniamo le società che potrebbero accedere ed usare le tue informazioni per seguenti finalità. Puoi abilitarle e disabilitarle oppure continuare ad usare il sito se sei D\'ACCORDO con le finalità.',
            detailLink: 'Scopri di piu & Imposta le Preferenze',
            who: {
                title: 'Chi sta usando le tue informazioni?',
                description: `Noi pre-selezioniamo le società che utilizzeranno le tue informazioni. Puoi visualizzare ogni società nel link sopra oppure `,
                link: 'vedere la lista completa qui.'
            },
            what: {
                title: 'Che informazioni saranno usate?',
                description: 'Ogni società usa informazioni differenti,',
                link: 'vedi la lista completa qui.'
            }
        },
        details: {
            back: 'Indietro',
            save: 'Continua ad usare il sito'
        },
        purposes: {
            title: 'Che informazioni saranno usate?',
            description: 'Di seguito la lista completa delle informazioni che potrebbero essere usate',
            back: 'Personalizza come questi dati saranno usate dalla pagina precedente',
            optoutdDescription: '',
            items: `<ul>
					<li>Il tipo di browser e le sue impostazioni</li>
									<li>Sistema operativo del dispositivo</li>
									<li>Informazioni sui cookies</li>
									<li>Information about other identifiers assigned to the device</li>
									<li>Indirizzo IP dal quale il device accede al sito</li>
									<li>Informazioni sulle attività dell'utente su quel device, incluse pagine web visitate o mobile app usate</li>
									<li>Informazioni riguardo la posizione geografica del device quando accede al sito o alla app mobile</li>
								</ul>`,
            purpose1: {
                menu: 'Informazioni sulla memorizzazione e accesso',
                title: 'Informazioni sulla memorizzazione e accesso',
                description: 'Cosa significa: la memorizzazione di informazioni, o l\'accesso ad informazioni già memorizzate sul tuo dispositivo, come identificativi sulla pubblicità, indentificativi sul dispositivo, cookies e tecnologie similari.'
            },
            purpose2: {
                menu: 'Personalizzazione',
                title: 'Personalizzazione',
                description: 'Cosa significa: la raccolta e il processo delle informazioni riguardo all\'utilizzo di questo servizio per poi servire pubblicità o contenuti personalizzati sia in questo che in altri contesti.'
            },
            purpose3: {
                menu: 'Selezione pubblicità, erogazione e reporting',
                title: 'Selezione pubblicità, erogazione e reporting',
                description: 'Cosa significa: La raccolta di informazioni e la combinazione con le informazioni raccolte in precedenza per selezionare e pubblicare annunci pubblicitari per te e per misurare la consegna e l\'efficacia di tali annunci pubblicitari. Ciò include l\'utilizzo delle informazioni raccolte in precedenza sui tuoi interessi per selezionare gli annunci, l\'elaborazione dei dati su quali annunci sono stati mostrati, la frequenza con cui sono stati mostrati, quando e dove sono stati mostrati e se hai intrapreso qualche azione correlata all\'annuncio, incluso ad esempio cliccando su annuncio o fare un acquisto. Ciò non include la personalizzazione, che è la raccolta e l\'elaborazione di informazioni sull\'utilizzo di questo servizio per personalizzare successivamente la pubblicità e / o il contenuto per te in altri contesti, come siti Web o app, nel tempo.'
            },
            purpose4: {
                menu: 'Selezione del contenuto, erogazione, reporting',
                title: 'Selezione del contenuto, erogazione, reporting',
                description: 'Cosa significa: Raccolta di informazioni e combinazione con informazioni raccolte in precedenza per selezionare e fornire contenuti per te e per misurare la consegna e l\'efficacia di tali contenuti. Ciò include l\'utilizzo di informazioni raccolte in precedenza sui tuoi interessi per selezionare il contenuto, elaborare i dati su quali contenuti sono stati mostrati, con quale frequenza o quanto tempo è stato mostrato, quando e dove è stato mostrato, e se hai intrapreso qualche azione relativa al contenuto, incluso per esempio cliccando sul contenuto. Questo non include la personalizzazione, che è la raccolta e l\'elaborazione di informazioni sull\'utilizzo di questo servizio per personalizzare successivamente i contenuti e / o la pubblicità per te in altri contesti, come siti Web o app, nel tempo.'
            },
            purpose5: {
                menu: 'Misurazioni',
                title: 'Misurazioni',
                description: 'Cosa significa: La raccolta di informazioni sull\'utilizzo del contenuto e la combinazione con informazioni precedentemente raccolte, utilizzate per misurare, comprendere e riportare l\'utilizzo del servizio. Ciò non include la personalizzazione, la raccolta di informazioni sull\'utilizzo di questo servizio per personalizzare successivamente i contenuti e / o la pubblicità per te in altri contesti, ad esempio su altri servizi, quali siti Web o app, nel tempo.'
            }
        },
        vendors: {
            title: 'Chi usa questa informazioni?',
            description: 'Di seguito la lista completa delle società che useranno le tue informazioni. Ti invitiamo a consultare le loro privacy policy per maggiori informazioni',
            accept: 'Consenti',
            acceptAll: 'Consenti tutte',
            optOut: 'richiede opt-out',
            back: 'Personalizza come questi dati sono usati dalla pagina precedente'
        }
    }
};
