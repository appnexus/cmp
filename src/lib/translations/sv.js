/* eslint-disable quotes */
/**
 * SV / Swedish
 */

const features = {
	menu: 'Funktioner',
	feature1: {
		name: 'Matcha data med offline källor',
		description: `Kombinera olika data från offline källor som ursprungligen samlats in i andra sammanhang.`,
	},
	feature2: {
		name: `Länka enheter`,
		description: `Tillåt bearbetning av en viss användares data för att ansluta en sådan användare på flera enheter.`,
	},
	feature3: {
		name: `Exakta geografiska platsdata`,
		description: `Tillåt behandling av en användares exakta geografiska platsdata till stöd för ett visst syfte för vilket den tredje parten har samtycke.`,
	},
};

export default {
	banner: {
		title: 'Integritetsval',
		description: `
				Genom att använda denna webbplats så samtycker du till vår användning av cookies för att tillhandahålla ett mer personligt skräddarsytt innehåll inklusive relaterade annonser samt i syfte att mäta och analysera användningen av webbplatsen. Klicka på "Läs mer" om du vill ändra dina inställningar.
			`,
		links: {
			data: {
				title: 'Informationen som kan komma att användas',
				description: `							
						<ul>						
							<li>Typen av webbläsare och dess inställningar</li>					
							<li>Information om enhetens operativsystem</li>					
							<li>Cookienformation</li>					
							<li> Information om andra identifierare som assignats enheten</li>					
							<li>Den IP-adress från vilken enheten kommer åt en klients webbplats eller					
								mobilapplikation				
							</li>					
							<li>Information om användarens aktivitet på den enheten, inklusive					
								sidor eller mobila appar som besökts eller använts				
							</li>					
							<li>Information om enhetens geografiska plats när den					
								får åtkomst				
								till en webbplats eller mobilapplikation.				
							</li>					
						</ul>						
					`,
			},
			purposes: {
				title: 'Anledning till lagringen av information',
			},
			manage: 'Lär Dig Mer' /* Lär Dig Mer */,
			accept: 'Ok, Jag Förstår' /* OK */,
		},
	},
	summary: {
		title: 'Lär dig mer om hur informationen används?',
		description: `Vi och utvalda företag kan komma åt och använda din information									
				för nedanstående ändamål. Du kan anpassa dina val nedan eller								
				fortsätta att använda vår webbplats om du är OK med syftena.`,
		detailLink: 'Lär Dig Mer & Ange Preferenser',
		who: {
			title: 'Vem använder denna information?',
			description: `Vi och förvalda företag kommer att använda din information. Du kan se								
					varje företag i länkarna ovan eller`,
			link: 'se den kompletta listan här.',
		},
		what: {
			title: 'Vilken typ av information används?',
			description: 'Olika företag använder olika typer av information,',
			link: 'se den kompletta listan här.',
		},
	},
	details: {
		back: 'Tillbaka',
		save: 'Ok, Jag förstår',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `									
				<p>								
					Beroende på vilken typ av data som de samlar in, använder sig av och bearbetar inklusive andra faktorer såsom design integriteten ,							
					vissa partners förlitar sig på ditt samtycke medan andra kräver att du väljer att aktivt avregistrera dig. För information om varje specifik leverantör och för att							
					utöva dina val, se nedan. Eller för att avregistrera, besök							
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
			description: 'Tillåt lagring eller åtkomost av information på användarens enhet.',
			menu: 'Information lagring och åtkomst',
			optoutDescription: '',
		},
		purpose2: {
			description: `Tillåt behandling av en viss användares data för att tillhandahålla och göra användaren medveten om den personligt skräddarsydda annonseringen (inklusive leverans, mätning och rapportering) baserat på användares preferenser eller intressen vilka är kända eller kan härledas från de data som samlats in på flera webbplatser, appar eller enheter; och/eller komma åt eller lagra information på enheter för just etta ändamå.								
				Kommer att inkludera följande Funktioner:								
				<ul>								
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>`,
			menu: 'Personalisering',
		},
		purpose3: {
			description: `Tillåt behandling av en viss användares data för att kunna leverera innehåll eller annonser och mäta leveransen av sådant innehåll eller sådana annonser, extrahera användarens insikter och generera rapporter för att kunna förstå hur tjänsten används; och/eller komma åt eller lagra information på enheter för just detta ändamål.								
				Kommer att inkludera följande Funktioner:								
				<ul>								
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>`,
			menu: 'Annonsval, leverans, rapporteringg',
		},
		purpose4: {
			description: `Tillåt behandling av en användares data för att kunna tillhandahålla och informera om den personliga innehållet (inklusive leverans, mätning och rapportering) baserat på en användares preferenser eller intressen som är kända eller härledda från data som samlats in på flera webbplatser, appar eller enheter, och/eller åtkomst till eller lagring av information på enheter för detta ändamål. Kommer att innehålla följande funktioner.								
				Kommer att inkludera följande egenskaper:								
				<ul>								
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>`,
			menu: 'Valet av innehåll, leverans rapportering',
		},
		purpose5: {
			description: `
					Insamling av information om din användning av innehållet kombinerat med tidigare insamlad information som används för att mäta, förstå och rapportera om din användning av själva tjänsten. Detta inkluderar ej personliga anpassningar, insamling av information om din användning av tjänsten för att senare anpassa innehåll och/eller reklam för dig i andra sammanhang, såsom webbplatser eller appar, över tid.
				`,
			menu: 'Mätning',
		},
	},
	vendors: {
		title: 'Vem använder denna information?',
		description: `
				Här följer den kompletta listan över företag som kommer att använda din information. Se deras sekretesspolicy för mer information.
			`,
		accept: 'Tillåt',
		acceptAll: 'Tillåt Alla',
		acceptNone: 'Avvisa alla',
		optOut: 'kräv avregistrering',
		back: 'Anpassa hur dessa företag använder data från föregående sida',
	},
	features,
	footer: {
		message: `									
				<h2>Vi Värnar Om Din Integritet</h2>								
			`,
		description: `									
				<span>								
					För att hjälpa till att göra denna webbplats ännu bättre samt för att kunna anpassa							
					förbättra innehållet, både i reklamsyfte och för att analysera							
					vår trafik så använder vi och våra partners teknik såsom cookies,							
					pixlar och dylikt för att samla in vissa data. Om du							
					fortsätter att använda webbplatsen eller klickar på "OK", så samtycker du							
					till att användning av denna teknik samt insamling av data.							
				</span>								
			`,
		privacyPolicy: `									
				<span>								
					Vänligen besök vår							
					<a target="_blank" href="http://system1.com/terms/privacy.html">							
						Integritetspolicy						
					</a>							
					fför att lära dig mer om hur vi samlar och använder data. Du kan ändra							
					när du så önskar genom att klicka							
				</span>								
			`,
		privacyPolicyButton: 'Hantera sekretessinställningar',
		consentLink: 'OK',
	},
};
