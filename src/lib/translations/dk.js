/* eslint-disable quotes */
//  german / de translations

const features = {
	menu: 'Udstyret med',
	feature1: {
		name: 'Matching af data til offline kilder',
		description: `Kombinering af data fra offline kilder, der oprindeligt blev indsamlet i andre sammenhænge.`,
	},
	feature2: {
		name: `Sammenkobling af enheder`,
		description: `Tillad behandling af en brugers data for at forbinde en sådan bruger på tværs af flere enheder.`,
	},
	feature3: {
		name: `Præcise geografiske placeringsdata`,
		description: `Tillad behandling af en brugers nøjagtige geografiske placeringsdata til understøttelse af et formål, som den pågældende tredjepart har samtykke til.`,
	},
};

export default {
	banner: {
		title: 'Privatlivsindstillinger',
		description: `
			Ved at bruge dette websted accepterer du vores brug af cookies og oplysninger til at levere personligt indhold og annoncer samt måle og analysere brugen af webstedet. Klik på "Lær mere" for at ændre dine indstillinger.
        `,
		links: {
			data: {
				title: 'Oplysninger der kan blive anvendt',
				description: `						
					<ul>					
						<li>Browser-typen og dens indstillinger</li>				
						<li>Oplysninger om enhedens styresystem</li>				
						<li>Oplysninger om Cookies</li>				
						<li>Oplysninger om andre identifikatorer, der er tildelt enheden</li>				
						<li>IP-adressen, hvorfra enheden får adgang til en klients hjemmeside eller				
							mobilapplikation			
						</li>				
						<li>Oplysninger om brugerens aktivitet på denne enhed, inklusiv besøgte				
							eller anvendte hjemmesider og mobile apps			
						</li>				
						<li>Oplysninger om enhedens geografiske placering, når den				
							får adgang til			
							en hjemmeside eller mobilapplikation			
						</li>				
					</ul>					
				`,
			},
			purposes: {
				title: 'Formål med opbevaring af oplysninger',
			},
			manage: 'Lær Mere',
			accept: 'Ok, Forstået',
		},
	},
	summary: {
		title: 'Lær mere om, hvordan oplysninger anvendes?',
		description: `Vi og udvalgte virksomheder kan få adgang til og anvende dine oplysninger								
			til nedenstående formål. Du kan tilpasse dine valg nedenfor eller							
			fortsætte med at bruge vores side, hvis du er ok med formålene.`,
		detailLink: 'Lær Mere & Indstil Præferencer',
		who: {
			title: 'Hvem anvender disse oplysninger?',
			description: `Vi og forudvalgte virksomheder anvender dine oplysninger. Du kan se							
				hver virksomhed i linkene ovenfor eller`,
			link: 'se den komplette liste her.',
		},
		what: {
			title: 'Hvilke oplysninger bliver anvendt?',
			description: 'Forskellige virksomheder bruger forskellige oplysninger,',
			link: 'se den komplette liste her.',
		},
	},
	details: {
		back: 'Tilbage',
		save: 'Ok, Forstået',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `								
			<p>							
				Test. Afhængig af den type data de indsamler, anvender og behandler samt andre faktorer, herunder privatliv via design,						
				er visse partnere afhængige af dit samtykke, mens andre kræver, at du fravælger det. For information om hver sælger og for at						
				udøve dine valg, se nedenfor. Eller for at fravælge, besøg						
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
			description: 'Tillad opbevaring eller adgang til oplysninger på en brugers enhed.',
			menu: 'Opbevaring og adgang til oplysninger Test',
			optoutDescription: '',
		},
		purpose2: {
			description: `Tillad behandling af en brugers data for at levere og informere personaliseret annoncering (herunder levering, måling og rapportering) baseret på en brugers præferencer eller interesser, kendt eller udledt fra data indsamlet på flere websteder, apps eller enheder; og / eller adgang til eller opbevaring af oplysninger på enheder til dette formål.							
			Vil omfatte følgende funktioner:							
			<ul>							
				<li>${features.feature1.name} – ${features.feature1.description}</li>
				<li>${features.feature2.name} – ${features.feature2.description}</li>
				<li>${features.feature3.name} – ${features.feature3.description}</li>
			</ul>`,
			menu: 'Personalisering',
		},
		purpose3: {
			description: `Tillad behandling af en brugers data for at levere indhold eller annoncer og måle leveringen af sådant indhold eller reklamer, opnå indsigt og generere rapporter for at forstå brugen af servicen; og / eller adgang til eller opbevaring af oplysninger på enheder til dette formål.							
			Vil omfatte følgende funktioner:							
			<ul>							
				<li>${features.feature1.name} – ${features.feature1.description}</li>
				<li>${features.feature2.name} – ${features.feature2.description}</li>
				<li>${features.feature3.name} – ${features.feature3.description}</li>
			</ul>`,
			menu: 'Annoncevalg, levering, rapportering',
		},
		purpose4: {
			description: `Tillad behandling af en brugers data for at levere og informere personligt indhold (herunder levering, måling og rapportering) baseret på en brugers præferencer eller interesser, kendt eller udledt fra data indsamlet på flere websteder, apps eller enheder; og / eller adgang til eller opbevaring af oplysninger på enheder til dette formål.							
			Vil omfatte følgende funktioner:							
			<ul>							
				<li>${features.feature1.name} – ${features.feature1.description}</li>
				<li>${features.feature2.name} – ${features.feature2.description}</li>
				<li>${features.feature3.name} – ${features.feature3.description}</li>
			</ul>`,
			menu: 'Valg af indhold, levering, rapportering',
		},
		purpose5: {
			description: `
				Indsamlingen af oplysninger om din brug af indholdet og kombinationen med tidligere indsamlede oplysninger, der bruges til at måle, forstå og rapportere om din brug af tjenesten. Dette inkluderer ikke personalisering, indsamling af oplysninger om din brug af denne service til efterfølgende at personalisere indhold og / eller annoncer til dig i andre sammenhænge, f.eks. på en anden service, såsom websteder eller apps, over tid.
            `,
			menu: 'Måling',
		},
	},
	vendors: {
		title: 'Hvem anvender disse oplysninger?',
		description: `
			Her er den komplette liste over virksomheder, der anvender dine oplysninger. Se venligst deres privatlivspolitik for flere detaljer.
        `,
		accept: 'Tillad',
		acceptAll: '"Tillad Alle',
		acceptNone: 'Fravælg Alle',
		optOut: 'kræver fravalg',
		back: 'Tilpas hvordan disse virksomheder bruger data via den forrige side',
	},
	features,
	footer: {
		message: `								
			<h2>Vi Værdsætter Privatliv</h2>							
		`,
		description: `								
			<span>							
				For at hjælpe med at gøre dette websted bedre og personalisere og forbedre
				din indholdsoplevelse samt til reklameformål og analyse af
				vores trafik, anvender vi og vores partnere teknologi såsom cookies,
				pixels og / eller beacons til at indsamle bestemte data. Ved
				din fortsatte brug af webstedet eller ved at klikke på "OK" accepterer du
				brugen af denne teknologi samt indsamlingen af data.
			</span>							
		`,
		privacyPolicy: `								
			<span>							
				Besøg venligst vores						
				<a target="_blank" href="http://system1.com/terms/privacy.html">						
					Privatlivspolitik					
				</a>						
				for at lære mere om, hvordan vi indsamler og bruger data. Du kan til enhver tid ændre						
				dine indstillinger ved at klikke på						
			</span>							
		`,
		privacyPolicyButton: 'Administrer privatlivsindstillinger',
		consentLink: 'OK',
	},
};
