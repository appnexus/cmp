/* eslint-disable quotes */
/**
 * NL / Dutch
 */

const features = {
	menu: 'Functies',
	feature1: {
		name: 'Matching Data to Offline Sources',
		description: `Het combineren van gegevens uit offline bronnen die in eerste instantie in andere contexten zijn verzameld.`,
	},
	feature2: {
		name: `Koppeling van apparaten`,
		description: `Maakt het mogelijk om de gegevens van een gebruiker te verwerken om die gebruiker over meerdere apparaten te verbinden.`,
	},
	feature3: {
		name: `Precieze geografische locatiegegevens`,
		description: `Maken het mogelijk de precieze geografische locatiegegevens van een gebruiker te verwerken ter ondersteuning van een doel waarvoor die bepaalde derde partij toestemming heeft gegeven.`,
	},
};

export default {
	banner: {
		title: 'Privacykeuzes',
		description: `
				Door deze site te gebruiken, gaat u akkoord met ons gebruik van cookies en informatie om gepersonaliseerde inhoud en advertenties te leveren en het gebruik van de site te meten en te analyseren. Klik op "Meer informatie" om uw instellingen te wijzigen.
			`,
		links: {
			data: {
				title: 'Informatie die mag gebruikt worden',
				description: `
						<ul>				
							<li>Type browser en zijn instellingen</li>			
							<li>Information over het besturingssysteem van het toestel</li>			
							<li>Cookie informatie</li>			
							Door deze site te gebruiken, gaat u akkoord met ons gebruik van cookies en informatie om gepersonaliseerde inhoud en advertenties te leveren en het gebruik van de site te meten en te analyseren. Klik op "Meer informatie" om uw instellingen te wijzigen,			
							<li>Het IP-adres van waaruit het apparaat toegang heeft tot de website van een klant of			
								mobiele applicatie		
							</li>			
							<li>Informatie over de activiteit van de gebruiker op dat apparaat, met inbegrip van web			
								pagina's en bezochte of gebruikte mobiele apps		
							</li>			
							<li>Informatie over de geografische locatie van het apparaat wanneer het			
								een website of		
								mobiele applicatie opent		
							</li>			
						</ul>				
					`,
			},
			purposes: {
				title: 'Doeleinden voor gegevensopslag',
			},
			manage: 'Meer Leren' /* Meer Leren */,
			accept: 'Ok, Begrepen' /* OK */,
		},
	},
	summary: {
		title: 'Meer weten over hoe de informatie wordt gebruikt?',
		description: `
				Wij en geselecteerde bedrijven kunnen uw informatie raadplegen en gebruiken							
				voor de volgende doeleinden. U kunt uw keuzes hieronder aanpassen of						
				blijf onze site gebruiken als je akkoord gaat met de doeleinden.
			`,
		detailLink: 'Meer Leren & Selecteer Voorkeuren',
		who: {
			title: 'Wie gebruikt deze informatie?',
			description: `Wij en vooraf gekozen bedrijven zullen uw informatie gebruiken. Je kunt						
					elk bedrijf in de links hierboven bekijken of`,
			link: 'bekijk hier de volledige lijst.',
		},
		what: {
			title: 'Welke informatie wordt gebruikt?',
			description: 'Verschillende bedrijven gebruiken verschillende informatie,',
			link: 'bekijk hier de volledige lijst.',
		},
	},
	details: {
		back: 'Terug',
		save: 'Ok, Begrepen',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `							
				<p>						
					Afhankelijk van het soort gegevens dat ze verzamelen, gebruiken en verwerken en andere factoren, waaronder privacy by design,					
					vertrouwen sommige partners op uw toestemming, terwijl andere u vragen om een opt-out. Voor informatie over elke verkoper en om					
					je keuzes te maken, kijk hieronder. Of om u af te melden, bezoek					
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
			description: 'Laat toe om informatie op het apparaat van een gebruiker op te slaan of te raadplegen.',
			menu: 'Gegevensopslag en toegangstest',
			optoutDescription: '',
		},
		purpose2: {
			description: `
					Sta de verwerking van de gegevens van een gebruiker toe om gepersonaliseerde reclame te leveren en te informeren (inclusief levering, meting en rapportage) op basis van de voorkeuren of interesses van een gebruiker die bekend zijn of die worden afgeleid uit gegevens die op meerdere sites, apps of apparaten zijn verzameld; en/of toegang hebben tot of informatie opslaan op apparaten met dat doeleinde.'						
					Will include following Features:						
					<ul>						
						<li>${features.feature1.name} – ${features.feature1.description}</li>
						<li>${features.feature2.name} – ${features.feature2.description}</li>
						<li>${features.feature3.name} – ${features.feature3.description}</li>
					</ul>
				`,
			menu: 'Personalisatie',
		},
		purpose3: {
			description: `
					Sta de verwerking van de gebruikersgegevens toe om inhoud of advertenties te leveren en de levering van dergelijke inhoud of advertenties te meten, inzichten te verkrijgen en rapporten te genereren om het gebruik van de dienst te begrijpen; en/of toegang hebben tot informatie of informatie opslaan op apparaten met dat doeleinde.						
					Will include following Features:						
					<ul>						
						<li>${features.feature1.name} – ${features.feature1.description}</li>
						<li>${features.feature2.name} – ${features.feature2.description}</li>
						<li>${features.feature3.name} – ${features.feature3.description}</li>
					</ul>
				`,
			menu: 'Selectie van advertenties, levering, rapportage',
		},
		purpose4: {
			description: `
					Sta verwerking van gebruikersgegevens toe om gepersonaliseerde inhoud te leveren en te informeren (inclusief levering, meting en rapportage) op basis van de voorkeuren of interesses van een gebruiker die bekend zijn of die worden afgeleid uit gegevens die via meerdere sites, apps of apparaten zijn verzameld; en/of met dat doeleinde toegang te krijgen tot informatie of die informatie op apparaten op te slaan.'						
					Will include following Features:						
					<ul>						
						<li>${features.feature1.name} – ${features.feature1.description}</li>
						<li>${features.feature2.name} – ${features.feature2.description}</li>
						<li>${features.feature3.name} – ${features.feature3.description}</li>
					</ul>
				`,
			menu: 'Content selectie, levering, rapportage',
		},
		purpose5: {
			description: `					
					Het verzamelen van informatie over uw gebruik van de inhoud, en de combinatie met eerder verzamelde informatie, wordt gebruikt om uw gebruiksgedrag te meten, te begrijpen en te rapporteren. Dit omvat niet de personalisatie, het verzamelen van informatie over uw gebruik van deze dienst om vervolgens de inhoud en/of de reclame voor u in andere contexten te personaliseren, d.w.z. op andere diensten, zoals websites of apps, na verloop van tijd.
				`,
			menu: 'Measurement',
		},
	},
	vendors: {
		title: 'Wie gebruikt deze informatie?',
		description: `
				Hier is de volledige lijst van bedrijven die uw informatie zullen gebruiken. Bekijk hun privacybeleid voor meer details.
			`,
		accept: 'Sta toe',
		acceptAll: '"Sta toe aan iedereen',
		acceptNone: 'Alles afwijzen',
		optOut: 'vereist uitschrijving',
		back: 'Pas aan hoe deze bedrijven gegevens van de vorige pagina gebruiken',
	},
	features,
	footer: {
		message: `							
				<h2>Wij hechten belang aan privacy</h2>						
			`,
		description: `							
				<span>						
					Om deze website beter te maken, en je contentervaring					
					te personaliseren en te verbeteren, voor reclamedoeleinden en om ons verkeer					
					te analyseren, maken wij en onze partners gebruik van technologie zoals cookies,					
					pixels, en/of bakens om bepaalde gegevens te verzamelen. Door					
					de site te blijven gebruiken of op "OK" te klikken, ga je akkoord met					
					het gebruik van deze technologie en de gegevensverzameling.					
				</span>						
			`,
		privacyPolicy: `							
				<span>						
					Bezoek aub onze					
					<a target="_blank" href="http://system1.com/terms/privacy.html">					
						Privacy Policy				
					</a>					
					om meer te weten te komen over hoe we gegevens verzamelen en gebruiken. U kunt					
					uw instellingen op elk moment wijzigen door te klikken op					
				</span>						
			`,
		privacyPolicyButton: 'Beheer Privacyinstellingen',
		consentLink: 'OK',
	},
};
