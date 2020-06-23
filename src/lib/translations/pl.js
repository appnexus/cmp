/* eslint-disable quotes */
/**
 * PL / Polish
 */

const features = {
	menu: 'Funkcje',
	feature1: {
		name: 'Dopasowywanie danych do źródeł offline',
		description: `łączenie danych ze źródeł offline, które początkowo były gromadzone w innych kontekstach.`,
	},
	feature2: {
		name: `Łączenie urządzeń`,
		description: `umożliwia przetwarzanie danych użytkownika w celu połączenia danego użytkownika z wieloma urządzeniami.`,
	},
	feature3: {
		name: `Precyzyjne dane lokalizacji geograficznej`,
		description: `pozwalają na przetwarzanie precyzyjnych danych lokalizacji geograficznej użytkownika w celu, na który dana osoba trzecia wyraziła zgodę.`,
	},
};

export default {
	banner: {
		title: 'Ustawienia prywatności',
		description: `
			Niniejsza strona używa informacji zapisanych za pomocą plików cookies (ciasteczek), w celu stworzenia spersonalizowanej treści i reklam i sporządzania statystyk i analizy dotyczących preferencji odwiedzających. Korzystając z tej strony użytkownik zgadza się na stosowanie tych plików. Kliknij na "Dowiedz się więcej", aby zmienić ustawienia.
		`,
		links: {
			data: {
				title: 'Informacje, z których możemy korzystać',
				description: `
				<ul>
					<li>Rodzaj przeglądarki i jej ustawienia</li>
					<li>Informacje dotyczące systemu operacyjnego danego urządzenia</li>
					<li>Informacje dotyczące plików cookies</li>
					<li>Informacje dotyczące innych identyfikatorów przydzielonych do urządzenia</li>
					<li>Adres IP urządzenia z którego odwiedzono witrynę klienta lub
						aplikację mobilną
					</li>
					<li>Informacje dotyczące aktywności użytkownika na danym urządzeniu, w tym
						odwiedzonych stron internetowych i aplikacji mobilnych
					</li>
					<li>Informacje o położeniu geograficznym urządzenia, w momencie
						korzystania ze
						strony internetowej lub aplikacji mobilnej
					</li>
				</ul>
				`,
			},
			purposes: {
				title: 'W celach przechowywania informacji',
			},
			manage: 'Dowiedz się więcej',
			accept: 'Ok, rozumiem' /* OK */,
		},
	},
	summary: {
		title: 'Dowiedz się więcej o tym, w jaki sposób korzystamy z tych danych',
		description: `
			My i wybrane firmy, które mogą mieć dostęp do i korzystać z Twoich danych
			w poniżej wymienionych celach. Możesz modyfikować swoje wybory poniżej lub
			w dalszym ciągu korzystać z tej witryny, jeśli zgadzasz się na dostęp do Twoich danych w tych celach.
		`,
		detailLink: 'Dowiedz się więcej i zmień ustawienia',
		who: {
			title: 'Kto korzysta z tych informacji?',
			description: `My oraz wybrane przez nas firmy będziemy korzystać z tych danych. Możesz zobaczyć
				każdą z tych firm lub`,
			link: 'wyświetlić pełną listę tutaj.',
		},
		what: {
			title: 'Z jakich informacji będą korzystać wymienione firmy?',
			description: 'Różne firmy korzystają z różnych informacji',
			link: 'wyświetl pełną listę tutaj.',
		},
	},
	details: {
		back: 'Wstecz',
		save: 'Ok, rozumiem',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `
			<p>
				Test. W zależności od rodzaju zebranych danych, ich przetwarzania i innych czynników, w tym ochrony prywatności w fazie projektowania
				niektóre firmy partnerskie poproszą o Twoją zgodę, z innych użytkownik będzie musiał zrezygnować sam. Aby uzyskać więcej informacji o każdej z firm i
				dokonać wyboru przeczytaj poniższe informacje. Aby zrezygnować odwiedź
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
			description: 'Wyraź zgodę na przechowywanie i dostęp do danych zawartych na urządzeniu użytkownika.',
			menu: 'Przechowywanie danych i dostęp Test',
			optoutDescription: '', // opcjonalne nadrzędne purpose-level, w przeciwnym razie przejście globalOptoutDescription
		},
		purpose2: {
			description: `
				Zezwalaj na przetwarzanie danych użytkownika w celu dostarczania spersonalizowanych reklam (w tym dostarczania, pomiaru i raportowania) na podstawie preferencji lub zainteresowań użytkownika wywodzących się z danych zebranych z wielu witryn, aplikacji lub urządzeń; i / lub uzyskiwanie dostępu do lub przechowywanie informacji w tym celu na urządzeniach.
				Zawarte zostaną poniższe funkcje:
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>
			`,
			menu: 'Personalizacja',
		},
		purpose3: {
			description: `
				Zezwalaj na przetwarzanie danych użytkownika w celu dostarczania treści lub reklam oraz mierzenie dostarczania tych treści lub reklam, uzyskiwania informacji i generowania raportów w celu zrozumienia korzystania z usług; i / lub uzyskiwanie dostępu lub przechowywanie informacji w tym celu na urządzeniach użytkownika.
				Zawarte zostaną poniższe funkcje:
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>
			`,
			menu: `Wybór reklam, dostarczanie, raportowanie`,
		},
		purpose4: {
			description: `
				Zezwalaj na przetwarzanie danych użytkownika w celu dostarczania i informowania o spersonalizowanych treściach (w tym dostarczania, pomiaru i raportowania) na podstawie preferencji lub zainteresowań użytkownika znanych lub wywodzących się z danych zebranych w wielu witrynach, aplikacjach lub urządzeniach; i / lub uzyskiwanie dostępu lub przechowywanie informacji w tym celu na urządzeniach użytkownika.
				Zawarte zostaną poniższe funkcje:
				<ul>
					<li>${features.feature1.name} – ${features.feature1.description}</li>
					<li>${features.feature2.name} – ${features.feature2.description}</li>
					<li>${features.feature3.name} – ${features.feature3.description}</li>
				</ul>
			`,
			menu: 'Wybór treści, dostarczanie, raportowanie',
		},
		purpose5: {
			description: `
				Zbieranie informacji o korzystaniu z treści oraz łączenie ich z poprzednio zebranymi informacjami służy do mierzenia, analizowania i raportowania korzystania z tych usług. Nie obejmuje to personalizacji, gromadzenia informacji o korzystaniu z tej usługi w celu późniejszej personalizacji treści i / lub reklam tworzonych dla użytkownika w innych kontekstach, tj. W innych usługach, takich jak strony internetowe lub aplikacje, w późniejszym terminie. 
			`,
			menu: 'Pomiar',
		},
	},
	vendors: {
		title: 'Kto korzysta z tych informacji?',
		description: `
			Oto pełna lista firm, które mają dostęp do Twoich danych. Prosimy o zapoznanie się z polityką prywatności tych firm, aby uzyskać więcej informacji.
		`,
		accept: 'Zezwalaj',
		acceptAll: '"Zezwalaj na wszystkie',
		acceptNone: 'Blokuj wszystkie',
		optOut: 'wymaga rezygnacji',
		back: 'Dostosuj sposób, w jaki te firmy wykorzystują dane z poprzedniej strony',
	},
	features,
	footer: {
		message: `
			<h2>Cenimy prywatność naszych użytkowników</h2>
		`,
		description: `
			<span>
				Aby ulepszyć tę witrynę oraz spersonalizować i usprawnić
				korzystanie z naszych treści przez użytkownika, w celach reklamowych i do analizy
				ruchu na naszej stronie, my i nasi partnerzy korzystamy z technologii takich jak pliki cookies,
				piksele i / lub sygnały nawigacyjne w celu zebrania niektórych danych. Klikając
				„OK” lub kontynuując korzystanie ze strony, zgadzasz się na
				użycie tej technologii i zbieranie danych.
			</span>
		`,
		privacyPolicy: `
			<span>
				Zapoznaj się z naszą
				<a target="_blank" href="http://system1.com/terms/privacy.html">
					polityką prywatności,
				</a>
				aby dowiedzieć się więcej na temat tego, w jaki sposób zbieramy i korzystamy z danych. Aby zmienić
				swoje ustawienia, w dowolnym momencie, wystarczy kliknąć na
			</span>
		`,
		privacyPolicyButton: 'Zarządzaj ustawieniami prywatności',
		consentLink: 'OK',
	},
};
