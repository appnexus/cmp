/* eslint-disable quotes */
/**
 * PT / Portuguese
 */

const features = {
	menu: 'Funcionalidades',
	feature1: {
		name: 'Emparelhar Dados a Fontes Offline',
		description: `Combinar dados de fontes offline que foram originalmente recolhidos noutros contextos.`,
	},
	feature2: {
		name: `Associar Equipmentos`,
		description: `Permitir o processamento dos dados de um utilizador para conectar tal utilizador a múltiplos equipamentos.`,
	},
	feature3: {
		name: `Dados de Localização Geográfica Precisa`,
		description: `Permitir o processamento de dados de localização geográfica precisa de um utilizador para suporte de uma finalidade para a qual uma terceira parte tem consentimento.`,
	},
};

export default {
	banner: {
		title: 'Opções de Privacidade',
		description: `
				Ao usar este sítio concorda com o uso de cookies e de informação para providenciar conteúdo personalizado e anuncios e medir e analizar a utilização do sítio. Clique em "Saiba Mais" para alterar as suas configurações.
			`,
		links: {
			data: {
				title: 'Informação que pode ser usada',
				description: `
						<ul>
							<li>Tipo de navegador e as suas configurações</li>
							<li>Informação sobre o sistema operativo do equipamento</li>
							<li>Informação sobre cookies</li>
							<li>Informação sobre outros identificadores associados ao equipmento</li>
							<li>O endereço de IP a partir do qual o equipamento acede ao sítio do cliente ou aplicação móvel</li>
							<li>Informação sobre a atividade do utilizador naquele equipamento, incluindo páginas web e aplicações móveis visitadas ou utilizadas</li>
							<li>Informação sobre a localização geográfica do equipamento quando acede a um sítio ou aplicação móvel</li>
						</ul>					
					`,
			},
			purposes: {
				title: 'Finalidades para armazenar informação',
			},
			manage: 'Saiba Mais' /* Saiba Mais */,
			accept: 'Ok, percebi' /* OK */,
		},
	},
	summary: {
		title: 'Saber mais sobre como a informação está a ser usada?',
		description: `Nós e empresas selecionadas poderemos aceder e utilizar a sua informação								
				para as finalidades abaixo descritas. Poderá personalizar as suas escolhas abaixo ou							
				continuar a usar o nosso sítio se concordar com as finalidades.
			`,
		detailLink: 'Saiba Mais & Configure Preferências',
		who: {
			title: 'Quem está a usar esta informação?',
			description: `Nós e empresas selecionadas iremos utilizar a sua informação. Poderá visualizar							
					cada empresa nas hiperligações acima ou
				`,
			link: 'veja a lista completa aqui.',
		},
		what: {
			title: 'Qual informação está a ser usada?',
			description: 'Empresas diferentes usam informações diferentes,',
			link: 'veja a lista completa aqui.',
		},
	},
	details: {
		back: 'Voltar',
		save: 'Ok, percebi',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `								
				<p>							
					Dependendo do tipo de dados que recolham, usem e processem e outros fatores incluindo privacidade por defeito,						
					certos parceiros assumem o seu consentimento enquanto outros requerem que opte por não aceitar. Para informações sobre cada um dos fornecedores e para						
					exercer as suas escolhas, veja abaixo. Ou para optar por não aceitar, visite						
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
			description: 'Permitir armazenar ou aceder a informação num equipamento do utilizador.',
			menu: 'Armazenamento e acesso de informação',
			optoutDescription: '',
		},
		purpose2: {
			description: `Permitir processar dados do utilizador para fornecer e informar anúncios personalizados (incluindo envio, medição e reporte) baseado nas preferências ou interesses do utilizador conhecidos ou inferidos através de dados recolhidos em vários sítios, aplicações ou equipamentos; e/ou aceder ou armazenar informação em equipamentos para esse propósito.
				Irá incluir as seguintes Funcionalidades:							
				<ul>							
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>`,
			menu: 'Personalização',
		},
		purpose3: {
			description: `
					Permitir o processamento dos dados do utilizador para apresentar conteúdo ou anúncios e medir a apresentação desse conteúdo ou anúncios, extrair conclusões e gerar relatórios para compreender a utilização do serviço; e/ou aceder ou armazenar informação em equipamentos para essa finalidade.
					Irá incluir as seguintes Funcionalidades:							
					<ul>							
						<li>${features.feature1.name} – ${features.feature1.description}</li>
						<li>${features.feature2.name} – ${features.feature2.description}</li>
						<li>${features.feature3.name} – ${features.feature3.description}</li>
					</ul>
				`,
			menu: 'Seleção, apresentação, reporte de anúncios',
		},
		purpose4: {
			description: `
					Permitir processar dados do utilizador para fornecer e informar anúncios personalizados (incluindo envio, medição e reporte) baseado nas preferências ou interesses do utilizador conhecidos ou inferidos através de dados recolhidos em vários sítios, aplicações ou equipamentos; e/ou aceder ou armazenar informação em equipamentos para esse propósito.							
					Irá incluir as seguintes Funcionalidades:							
					<ul>							
						<li>${features.feature1.name} – ${features.feature1.description}</li>
						<li>${features.feature2.name} – ${features.feature2.description}</li>
						<li>${features.feature3.name} – ${features.feature3.description}</li>
					</ul>
				`,
			menu: 'Seleção, apresentação, reporte de anúncios',
		},
		purpose5: {
			description: `						
					A recolha de informação sobre a sua utilização do conteúdo e a combinação com informação recolhida anteriormente, utilizada para medir, compreender e reportar sobre a sua utilização do serviço. Isto não inclui personalização, a recolha de informação sobre a sua utilização deste serviço para consequentemente personalizar conteúdo e/ou apresentar-lhe anúncios noutros contextos, isto é, noutros serviços, tal como sítios ou aplicações, ao longo do tempo.
				`,
			menu: 'Medição',
		},
	},
	vendors: {
		title: 'Quem está a usar esta informação?',
		description: `
				Aqui está a lista completa de empresas que irão usar a sua informação. Por favor consulte as suas políticas de privacidade para mais detalhes.
			`,
		accept: 'Permitir',
		acceptAll: '"Permitir Todos',
		acceptNone: 'Rejeitar Todos',
		optOut: 'Requer auto-exclusão',
		back: 'Personalize como estas empresas usam os dados da página anterior',
	},
	features,
	footer: {
		message: `								
				<h2>Nós Damos Valor À Privacidade</h2>							
			`,
		description: `								
				<span>							
					Para melhorar este sítio, para personalizar e melhorar						
					a sua experiência, para finalidades relacionadas com publicidade e para analisar						
					o nosso tráfico, nós e os nossos parceiros utilizamos tecnologias como cookies,						
					pixels e/ou beacons para recolher determinadas informações. Ao						
					continuar a usar este sítio ou ao clicar em "OK", concorda com						
					o uso desta tecnologia e que os dados sejam recolhidos.						
				</span>							
			`,
		privacyPolicy: `								
				<span>							
					Por favor visite a nossa						
					<a target="_blank" href="http://system1.com/terms/privacy.html">						
						Política de Privacidade					
					</a>						
					para saber mais sobre como recolhemos e usamos os dados. Pode modificar						
					as suas configurações a qualquer momento clicando em						
				</span>							
			`,
		privacyPolicyButton: 'Alterar Configurações de Privacidade',
		consentLink: 'OK',
	},
};
