import { h, Component } from 'preact';
import BannerStacks from './banner/bannerStacks';
import BannerVendors from './banner/bannerVendors';

import { CONSENT_SCREENS } from '../constants';

import style from './app.less';

export default class App extends Component {
	static defaultProps = {};

	state = {
		store: this.props.store,
		shouldShowModal: false,
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
		setTimeout(this.componentDidUpdate.bind(this), 100); // delay reveal on first load
	}

	componentDidUpdate() {
		const {
			store: { isModalShowing },
			shouldShowModal,
		} = this.state;
		if (shouldShowModal !== isModalShowing) {
			this.setState({
				shouldShowModal: isModalShowing,
			});
		}
	}

	render(props, state) {
		const { store, shouldShowModal } = state;
		const { tcModel } = store;
		const { consentScreen } = tcModel;

		return (
			<div class={style.gdpr}>
				{!consentScreen ||
					(consentScreen === CONSENT_SCREENS.STACKS_LAYER1 && (
						<BannerStacks store={store} isShowing={shouldShowModal && tcModel} />
					))}

				{consentScreen === CONSENT_SCREENS.VENDORS_LAYER3 && (
					<BannerVendors store={store} isShowing={shouldShowModal && tcModel} />
				)}
			</div>
		);
	}
}
