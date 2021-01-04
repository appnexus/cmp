const macros = {
	// Blick translation
	'de': {
		'_PUBLISHER_': 'Ringier',
		'_POLICY_URL_': 'https://www.blick.ch/services/datenschutzbestimmungen-id151553.html'
	},
	// RASCH translation
	'de2': {
		'_PUBLISHER_': 'Ringer Axel Springer Schweiz',
		'_POLICY_URL_': 'https://www.cash.ch/ueberuns/rechtliche-hinweise/datenschutzbestimmungen-detail#rechte'
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
