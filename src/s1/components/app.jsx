import { h, Component } from 'preact';
import BannerStacks from './banner/bannerStacks';
import BannerPurposes from './banner/bannerPurposes';
import BannerVendors from './banner/bannerVendors';

import { CONSENT_SCREENS } from '../constants';

import style from './app.less';

export default class App extends Component {
	static defaultProps = {};

	state = {
		store: this.props.store,
	};

	updateState(store) {
		this.setState({ store });
	}

	componentDidCatch(error, errorInfo) {
		console.error('componentCaughtError', error, errorInfo);
	}

	componentDidMount() {
		const { store } = this.props;
		store.subscribe(this.updateState.bind(this));
	}

	render(props, state) {
		const { store } = state;
		const { isModalShowing, tcModel } = store;
		const { consentScreen } = tcModel;

		return (
			<div class={style.gdpr}>
				{!consentScreen ||
					(consentScreen === CONSENT_SCREENS.STACKS_LAYER1 && (
						<BannerStacks store={store} isShowing={isModalShowing && tcModel} />
					))}

				{consentScreen === CONSENT_SCREENS.PURPOSES_LAYER2 && (
					<BannerPurposes store={store} isShowing={isModalShowing && tcModel} />
				)}

				{consentScreen === CONSENT_SCREENS.VENDORS_LAYER3 && (
					<BannerVendors store={store} isShowing={isModalShowing && tcModel} />
				)}
			</div>
		);
	}
}
