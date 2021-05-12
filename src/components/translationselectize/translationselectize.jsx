import { h, Component } from 'preact';
import Selectize from '../selectize/selectize';
import { translations } from '../../lib/translations';
import log from '../../lib/log';
import config from '../../lib/config';
import style from './translationselectize.less';

export default class TranslationSelectize extends Component {
	onChangeLanguage = event => {
		const current = event.target.value.toLowerCase();
		translations.changeLang(current)
			.then(() => {
				this.props.onChange(current);
			})
			.catch(err => {
				log.error('Failed during change translation', err);
			});
	};

	render() {
		const options = Object.keys(translations.translations).map(el => el.toUpperCase());
		if (options.length < 2) {
			return null;
		}
		const selected = translations.currentLang.toUpperCase();
		return (
			config.translationFetch ? (<Selectize classNames={style.translationSelect} selected={selected}
												  options={options}
												  onChange={this.onChangeLanguage}/>) : null
		);
	}
}
