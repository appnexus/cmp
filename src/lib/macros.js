const prepareMacro = value => {
	return JSON.stringify(value).slice(1, -1);
};

const macros = {
	// Blick translation
	'de_blick': {
		'_PUBLISHER_': 'Ringier',
		'_POLICY_': prepareMacro(`<p>Wenn Sie der Datenbearbeitung basierend auf berechtigtem Interesse widersprechen oder ihre Einwilligung widerrufen wollen, können Sie dies in unseren <a href="https://www.blick.ch/services/datenschutzbestimmungen-id151553.html" target="_blank" rel="noopener">Datenschutzbestimmungen</a> in Kapitel 4.3 tun.
</p>`),
		'_PRIVACY_LINKS_': prepareMacro(`<p><a href="https://www.blick.ch/services/datenschutzbestimmungen-id151553.html" target="_blank" rel="noopener">Datenschutz</a> | <a href="https://www.blick.ch/services/impressum/impressum-blick-gruppe-id5697115.html" target="_blank" rel="noopener">Impressum</a></p>`)
	},
	// RASCH translation
	'de_rasch': {
		'_PUBLISHER_': 'Ringier Axel Springer Schweiz',
		'_POLICY_': prepareMacro(`<p>Wenn Sie der Datenbearbeitung basierend auf berechtigtem Interesse widersprechen oder ihre Einwilligung widerrufen wollen, können Sie dies in den entsprechenden Datenschutzbestimmungen in Kapitel 4.3 tun:</p>
<p><a href="https://www.beobachter.ch/service/beobachter-und-guider-datenschutzbestimmungen" target="_blank" rel="noopener">Datenschutzbestimmungen</a> und <a href="https://www.beobachter.ch/service/beobachter-impressum" target="_blank" rel="noopener">Impressum</a> von Beobachter</p>
<p><a href="https://www.handelszeitung.ch/datenschutz" target="_blank" rel="noopener">Datenschutzbestimmungen</a> und <a href="https://www.handelszeitung.ch/impressum" target="_blank" rel="noopener">Impressum</a> von HZ, Bilanz, Schweizer Versicherung</p>
<p><a href="https://www.schweizer-illustrierte.ch/datenschutzbestimmungen-lang" target="_blank" rel="noopener">Datenschutzbestimmungen</a> und <a href="https://www.schweizer-illustrierte.ch/impressum" target="_blank" rel="noopener">Impressum</a> der Schweizer Illustrierten</p>
<p><a href="https://www.cash.ch/ueberuns/rechtliche-hinweise/datenschutzbestimmungen-detail#rechte" target="_blank" rel="noopener">Datenschutzbestimmungen</a> und <a href="https://www.cash.ch/ueberuns/unternehmen" target="_blank" rel="noopener">Impressum</a> von Cash</p>
<p><a href="https://www.streaming.ch/datenschutz" target="_blank" rel="noopener">Datenschutzbestimmungen</a> und <a href="https://www.streaming.ch/impressum" target="_blank" rel="noopener">Impressum</a> von Streaming</p>`),
		'_PRIVACY_LINKS_': prepareMacro(`<p><a onclick="__tcfapi('showConsentDetailView', 2, function () {}, {tab: 1})">Datenschutz</a> | <a onclick="__tcfapi('showConsentDetailView', 2, function () {}, {tab: 1})">Impressum</a></p>`)
	},
	'pl_gratka': {
		'_ORGANIZATIONNAME_': 'Morizon-Gratka',
		'_ORGANIZATION1_': 'Grupa Morizon-Gratka Sp. z o.o jako dostawca',
		'_ORGANIZATION2_':  prepareMacro(`przez <a href="https://prywatnosc.gratka.pl/" target="_blank" rel="noopener">Grupę Morizon-Gratka Sp. z o.o.</a>`),
		'_ORGANIZATION3_': 'Grupę Morizon-Gratka Sp. z o.o.',
		'_ORGANIZATION4_': 'Grupa Morizon-Gratka Sp. z o.o',
		'_ORGANIZATION5_': 'Grupę Morizon-Gratka',
		'_ORGANIZATION6_': 'Grupa Morizon-Gratka',
		'_ORGANIZATION7_': 'Grupa Morizon-Gratka będzie',
		'_REGULATIONS_':  prepareMacro(`gratka.pl <a href="https://gratka.pl/regulamin/" target="_blank" rel="noopener">https://gratka.pl/regulamin/</a> oraz morizon.pl - <a href="https://www.morizon.pl/regulamin" target="_blank" rel="noopener">https://www.morizon.pl/regulamin</a> lub regulaminy innych serwisów internetowych, których wydawcą jest Grupa Morizon-Gratka`),
		'_SPECIFIC_': '',
		'_ADMINISTRATOR_': 'Administrator danych może',
		'_USE_': 'wykorzystuje również Grupa Morizon-Gratka',
		'_PROCESSING_': 'Grupę Morizon-Gratka',
		'_MAIL_': 'rodo.zgloszenia@morizon-gratka.pl',
		'_PRIVACYPOLICY_': '/polityka-prywatnosci',

	},
	pl: {
		'_ORGANIZATIONNAME_': 'RAS Polska',
		'_ORGANIZATION1_': 'Podmioty z Grupy RAS Polska jako dostawcy',
		'_ORGANIZATION2_':  prepareMacro(`przez podmioty z <a href="https://polityka-prywatnosci.onet.pl/grupa-rasp.html" target="_blank" rel="noopener">Grupy RAS Polska</a>`),
		'_ORGANIZATION3_': 'podmioty z Grupy Ringier Axel Springer Polska.',
		'_ORGANIZATION4_': 'Podmiot z Grupy RAS Polska',
		'_ORGANIZATION5_': 'dany podmiot z Grupy RAS Polska',
		'_ORGANIZATION6_': 'podmiot z Grupy RAS Polska',
		'_ORGANIZATION7_': 'podmioty z Grupy RAS Polska będą',
		'_REGULATIONS_':  prepareMacro(`Onet - <a href="https://polityka-prywatnosci.onet.pl/regulamin.html" target="_blank" rel="noopener">https://polityka-prywatnosci.onet.pl/regulamin.html</a> - lub regulaminy innych usług świadczonych przez określony podmiot z Grupy RAS Polska.`),
		'_SPECIFIC_': prepareMacro(`Administratorami Twoich danych osobowych będą także pozostałe podmioty z Grupy RAS Polska, których pełne dane możesz sprawdzić <a onclick="__tcfapi('showVendors', 2, function () {})">pod tym linkiem</a>. `),
		'_ADMINISTRATOR_': 'Administratorzy danych mogą',
		'_USE_': "wykorzystują również podmioty z Grupy RAS Polska",
		'_PROCESSING_': 'nas, inne podmioty z Grupy RAS Polska',
		'_MAIL_': 'iod@ringieraxelspringer.pl',
		'_PRIVACYPOLICY_': 'https://polityka-prywatnosci.onet.pl/index.html',
	}

};

const replaceMacros = (text, translationCode) => {
	const toReplace = macros[translationCode];
	if (!toReplace) {
		return text;
	}
	return Object.keys(toReplace).reduce((acc, key) => {
		return acc.replace(new RegExp(key, 'g'), toReplace[key]);
	}, text);
};

export default replaceMacros;
