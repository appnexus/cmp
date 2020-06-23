/* eslint-disable quotes */
/**
 * IT / Italian
 */

const features = {
	menu: 'Funzionalità',
	feature1: {
		name: 'Abbinamento dei dati a fonti offline',
		description: `Combinazione di dati da fonti offline che erano inizialmente raccolte in altri contesti.`,
	},
	feature2: {
		name: `Collegamento dei dispositivi`,
		description: `Consentire l'elaborazione dei dati utente per connettere tale utente attraverso dispositivi multipli.`,
	},
	feature3: {
		name: `Dati di collocazione geografica precisa`,
		description: `Consenti elaborazione dati di collocazione geografica precisa di un utente a sostegno di uno scopo per cui quella certa terza parte possiede il consenso.`,
	},
};

export default {
	banner: {
		title: 'Scelte Privacy',
		description: `
				Utilizando questo sito, acconsenti al nostro uso dei cookie e delle informazioni per fornire contenuto personalizzato e pubblicità e per misurare ed analizzare l'utilizzo del sito. Clicca su "Maggiori inforrmazioni" per cambiare le tue impostazioni.
			`,
		links: {
			data: {
				title: 'Informazioni che potrebbero essere utilizzate',
				description: `
						<ul>
							<li>Tipo di browser e sue impostazioni</li>
							<li>Informazioni sul sistema operativo del dispositivo</li>
							<li>Informazioni sui cookie</li>
							<li>Informazioni su altri identificatori assegnati al dispositivo</li>
							<li>Indirizzo IP dal quale il dispositivo accede al sito web di un cliente o
								a un'applicazione mobile
							</li>
							<li>Informazioni sulle attività dell'utente su quel dispositivo, tra cui pagine
								web e app mobili visitate o utilizzate
							</li>
							<li>Informazioni in merito alla posizione geografica del dispositivo quando
								accede
								a un sito web o ad una applicazione mobile
							</li>
						</ul>
					`,
			},
			purposes: {
				title: `Scopi dell'archiviazione di informazioni`,
			},
			manage: 'Maggiori informazioni',
			accept: 'Ok, Capito',
		},
	},
	summary: {
		title: 'Maggiori informazioni su come vengono usate le informazioni?',
		description: `
			Noi e società selezionate potremmo avere accesso e utilizzare le tue informazioni
			per gli scopi sottostanti. Puoi personalizzare le tue scelte qui sotto o
			continuare a usare il nostro sito se sei d'accordo con gli scopi.
		`,
		detailLink: 'Maggiori informazioni & Imposta preferenze',
		who: {
			title: 'Chi usa queste informazioni?',
			description: `Noi e società preselezionate utilizzeremo le tue informazioni. Puoi vedere
					ogni società nei link qui sopra o`,
			link: `vedi qui l'elenco completo.`,
		},
		what: {
			title: 'Quali informazioni vengono usate?',
			description: 'Diverse società utilizzano informazioni diverse,',
			link: `vedi qui l'elenco completo.`,
		},
	},
	details: {
		back: 'Indietro',
		save: 'Ok, capito',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `
				<p>
					A seconda del tipo di dati che raccolgono, utilizzano ed elaborano, e di altri fattori compresa la privacy by design,
					alcuni partner contano sul tuo consenso, mentre altri ti chiedono di disattivare. Per informazioni su ciascun fornitore e per
					esercitare le tue scelte, vedi sotto. O, per disattivare, visita
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
			description: `Permetti archiviazione o accesso a informazioni su un dispositivo dell'utente.`,
			menu: 'Archiviazione delle informazioni e Test di accesso',
			optoutDescription: '',
		},
		purpose2: {
			description: `
				Consenti elaborazione dati utente per fornire e notificare pubblicità personalizzata (inclusi fornitura, misurazione e report) basandosi su preferenze o interessi di un utente conosciuti o dedotti dai dati raccolti attraverso siti, app o dispositivi multipli; e/o accesso a, o archiviazione di, informazioni su dispositivi con quello scopo.
				Comprenderà le seguenti caratteristiche:
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>
			`,
			menu: 'Personalizzazione',
		},
		purpose3: {
			description: `
				Consenti elaborazione dati utente per fornire contenuto o pubblicità e misurare la fornitura di tale contenuto o pubblicità, estrarre indicazioni e generare report per comprendere l'utilizzo del servizio; e/o accedere a o archiviare informazioni su dispositivi con quello scopo.
				Comprenderà le seguenti caratteristiche:
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>
			`,
			menu: 'Selezione pubblicità, fornitura, report',
		},
		purpose4: {
			description: `
				Consenti elaborazioni dati utente per fornire e notificare contenuto personalizzato (tra cui fornitura, misurazione e report) basato sulle preferenze o interessi dell'utente noti o dedotti da dati raccolti attraverso siti, app o dispositivi multipli; e/o accesso a o archiviazione di informazioni su dispositivi a quello scopo.
				Comprenderà le seguenti caratteristiche:
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>
			`,
			menu: 'Selezione contenuto, fornitura, report',
		},
		purpose5: {
			description: `
					Taccolta di informazioni in merito all'utilizzo del contenuto e alla combinazione con informazioni precedentemente raccolte, utilizzate per misurare, comprendere e fornire un report dell'utilizzo del servizio. Questo non comprende la personalizzazione, la raccolta di informazioni sull'utilizzo di questo servizio per personalizzare di conseguenza contenuto e/o pubblicità in altri contesti, ad es. su altri servizi, come siti web o app, nel corso del tempo.
				`,
			menu: 'Misurazione',
		},
	},
	vendors: {
		title: 'Chi sta utilizzando queste informazioni?',
		description: `
				Ecco l'elenco competo delle società che utilizzeranno le tue informazioni. Per maggiori dettagli si prega di vedere la loro informativa sulla privacy.
			`,
		accept: 'Consenti',
		acceptAll: '"Consenti tutto',
		acceptNone: 'Rifiuta tutto',
		optOut: 'Richiede disattivazione',
		back: 'Personalizza il modo in cui queste società utilizzano i dati dalla pagina precedente',
	},
	features,
	footer: {
		message: `
				<h2>Noi diamo valore alla privacy</h2>
			`,
		description: `
				<span>
					Per aiutare a rendere migliore questo sito, per personalizzare e valorizzare
					il contenuto che vedi, per scopi pubblicitari e di analisi del
					nostro traffico, noi e i nostri partner utilizziamo tecnologia come cookie,
					pixel e/o beacon per raccogliere determinati dati.
					Continuando a utilizzare il sito o cliccando su “OK”, acconsenti
					all'utilizzo di tale tecnologia e alla raccolta dei dati.
				</span>
			`,
		privacyPolicy: `
				<span>
					Si prega di visitare la nostra
					<a target="_blank" href="http://system1.com/terms/privacy.html">
						Informativa sulla Privacy
					</a>
					per avere maggiori informazioni su come raccogliamo e utilizziamo i dati. Puoi modificare
					le tue impostazioni in qualsiasi momento cliccando
				</span>
			`,
		privacyPolicyButton: 'Gestisci impostazioni Privacy',
		consentLink: 'OK',
	},
};
