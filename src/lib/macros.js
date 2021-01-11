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
<p><a href="https://www.cash.ch/ueberuns/rechtliche-hinweise/datenschutzbestimmungen-detail#rechte" target="_blank" rel="noopener">Datenschutzbestimmungen</a> und <a href="https://www.cash.ch/ueberuns/unternehmen" target="_blank" rel="noopener">Impressum</a> von Cash</p>`),
		'_PRIVACY_LINKS_': prepareMacro(`<p><a onclick="__tcfapi('showConsentDetailView', 2, function () {}, {tab: 1})">Datenschutz</a> | <a onclick="__tcfapi('showConsentDetailView', 2, function () {}, {tab: 1})">Impressum</a></p>`)
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
