/* eslint-disable quotes */
/**
 * ES / Spanish
 */

const features = {
	menu: 'Caracteristicas',
	feature1: {
		name: 'Emparejar datos con fuentes fuera de línea',
		description: `Combina datos de fuentes fuera de línea que se recogieron inicialmente en otros contextos`,
	},
	feature2: {
		name: `Enlazar Dispositivos`,
		description: `Permite el procesamiento de los datos de un usuario para conectar a dicho usuario a través de múltiples dispositivos.`,
	},
	feature3: {
		name: `Datos de localización geográfica precisa`,
		description: `Permite procesar datos de localización geográfica precisa de un usuario en aras de un propósito para el que ese determinado tercero ha dado su consentimiento.`,
	},
};

export default {
	banner: {
		title: 'Opciones de Privacidad',
		description: `
				Al usar este sitio, usted acepta que usemos cookies e información para suministrarle contenido y anuncios personalizados y medir y analizar el uso del sitio. Haga clic en "Más información" para cambiar su configuración
			`,
		links: {
			data: {
				title: 'Información que puede ser utilizada',
				description: `
						<ul>
							<li>Tipo de navegador y su configuración</li>	
							<li>Información sobre el sistema operativo del dispositivo</li>	
							<li>Información de las cookies</li>	
							<li>Información sobre otros identificadores asignados al dispositivo</li>	
							<li>Dirección IP desde la que el dispositivo accede al sitio web del cliente o	
								aplicación móvil
							</li>	
							<li>Información sobre la actividad del usuario en ese dispositivo, incluyendo las páginas	
								web y aplicaciones móviles visitadas o utilizadas
							</li>	
							<li>Información sobre la ubicación geográfica del dispositivo cuando	
								accede a
								un sitio web o una aplicación móvil
							</li>	
						</ul>		
					`,
			},
			purposes: {
				title: 'Propósitos del almacenamiento de información',
			},
			manage: 'Más Información',
			accept: '¡Listo!',
		},
	},
	summary: {
		title: '¿Desea más información sobre cómo se utiliza la información?',
		description: `Nosotros, y algunas empresas seleccionadas, podemos acceder y utilizar su información					
				para los siguientes propósitos. Puede personalizar sus opciones a continuación o				
				continar usando nuestro sitio, si está de acuerdo con los propósitos.
			`,
		detailLink: 'Más información y establecer preferencias',
		who: {
			title: '¿Quién está usando esta información?',
			description: `
					Nosotros y las empresas preseleccionadas usaremos su información. Puede ver				
					cada empresa en los enlaces de arriba o
				`,
			link: 'ver la lista completa aquí.',
		},
		what: {
			title: '¿Qué información se está utilizando?',
			description: 'Diferentes empresas usan diferente información,',
			link: 'vea la lista completa aquí.',
		},
	},
	details: {
		back: 'Atrás',
		save: '¡Listo!',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `
				<p>				
					Dependiendo del tipo de datos que recojan, usen y procesen, así como de otros factores, incluyendo la privacidad deliberada,			
					algunos socios asumen su consentimiento mientras que otros requieren que usted se excluya. Para obtener información sobre cada proveedor y para			
					ejercer sus opciones, vea abajo. O para optar por no participar, visite			
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
			description: 'Permitir el almacenamiento o el acceso a la información en el dispositivo de un usuario.',
			menu: 'Prueba de almacenamiento y acceso a la información',
			optoutDescription: '',
		},
		purpose2: {
			description: `
					Permitir el procesamiento de los datos de un usuario para proporcionar y modelar publicidad personalizada (incluidas la emisión, la medición y la presentación de informes) basada en las preferencias o intereses conocidos del usuario, o deducidos a partir de los datos recogidos en múltiples sitios, aplicaciones o dispositivos; y/o el acceso o almacenamiento de información en dispositivos a esos efectos.
					Incluirá las siguientes Herramientas:
					<ul>
						<li>${features.feature1.name} – ${features.feature1.description}</li>
						<li>${features.feature2.name} – ${features.feature2.description}</li>
						<li>${features.feature3.name} – ${features.feature3.description}</li>
					</ul>
				`,
			menu: 'Personalización',
		},
		purpose3: {
			description: `
				Permitir el procesamiento de los datos de un usuario para suministrarle contenido o publicidad y medir el suministro de dicho contenido o publicidad, extraer información y generar informes para comprender el uso del servicio; y/o acceder o almacenar información en dispositivos a esos efectos.				
				Incluirá las siguientes Herramientas:				
				<ul>				
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>
			`,
			menu: 'Selección de anuncios, emisión, presentación de informes',
		},
		purpose4: {
			description: `
				Permitir el procesamiento de los datos de un usuario para proporcionar y modelar publicidad personalizada (incluidas la emisión, la medición y la presentación de informes) basada en las preferencias o intereses conocidos del usuario, o deducidos a partir de los datos recogidos en múltiples sitios, aplicaciones o dispositivos; y/o el acceso o almacenamiento de información en dispositivos a esos efectos.				
				Incluirá las siguientes Herramientas:
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>`,
			menu: 'Selección de contenidos, emisión, presentación de informes',
		},
		purpose5: {
			description: `
					La recopilación de información sobre el uso que usted hace del contenido, y la combinación con la información recopilada previamente, se utiliza para medir, comprender e informar sobre el uso que usted hace del servicio. Esto no incluye la personalización, la recopilación de información sobre el uso de este servicio para personalizar posteriormente el contenido y/o la publicidad emitida para usted en otros contextos, es decir, en otros servicios, como sitios web o aplicaciones, a lo largo del tiempo.
				`,
			menu: 'Medición',
		},
	},
	vendors: {
		title: '¿Quién está usando esta información?',
		description: `				
				Aquí está la lista completa de las compañías que usarán su información. Por favor, vea su política de privacidad para más detalles.
			`,
		accept: 'Aprobar',
		acceptAll: 'Aprobar todos',
		acceptNone: 'Desaprobar todos',
		optOut: 'requiere excluirse',
		back: 'Personalizar la forma en que estas empresas utilizan los datos de la página anterior',
	},
	features,
	footer: {
		message: `
				<h2>Valoramos la Privacidad</h2>				
			`,
		description: `					
				<span>				
					Para ayudar a mejorar este sitio web, y personalizar y mejorar			
					su experiencia de contenido, con fines publicitarios, y para analizar			
					nuestro tráfico, nosotros y nuestros socios usamos tecnologías tales como cookies,			
					píxeles, y/o beacons para recoger ciertos datos. Al			
					continuar el uso del sitio o haciendo clic en "OK", usted da su consentimiento			
					par el uso de esta tecnología y la recopilación de los datos.			
				</span>				
			`,
		privacyPolicy: `
				<span>				
					Por favor, visite nuestra			
					<a target="_blank" href="http://system1.com/terms/privacy.html">			
						Política de Privacidad		
					</a>			
					para aprender más sobre cómo recogemos y usamos los datos. Puede modificar			
					su configuración en cualquier momento haciendo clic en			
				</span>				
			`,
		privacyPolicyButton: 'Administrar Herramientas de Privacidad',
		consentLink: 'OK',
	},
};
