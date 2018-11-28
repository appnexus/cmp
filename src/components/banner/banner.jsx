import { h, Component } from 'preact';
import bannerStyle from './banner.less';
import modalStyle from './modal.less';
import Description from './description/description';
import config from '../../lib/config';


export default class Banner extends Component {

	constructor(props) {
		super(props);
	}

	handleWindowClick = e => {
		if (!this.bannerRef || !this.bannerRef.contains(e.target)) {
			this.props.onSave();
		}
	};

	handleLearnMore = () => {
		this.props.onShowModal(true);
	};

	handleClose = () => {

		//By now modal is disabled
		return ;
		//this.props.onSave();
	};	

	render(props, state) {
		const { isShowing, onSave, theme } = props;
		const {
			primaryColor,
			primaryTextColor,
			backgroundColor,
			overlayBackground,
			textColor,
			textLightColor,
			textLinkColor,
		} = theme;
		let imgLogo=null;
		if (config.bannerLogo){
			imgLogo = <img src={ config.bannerLogo} />
		}
		if(config.bannerModal){
			return (
				<div
					ref={el => this.bannerRef = el}
					class={[modalStyle.popup, !isShowing ? modalStyle.hidden : ''].join(' ')}
				>
					<div
						class={modalStyle.overlay}
						style={{background: overlayBackground}}
						onClick={this.handleClose}
					/>
					<div class={modalStyle.content}>
					{imgLogo}	
					<Description
						onSave={onSave}
						onClose={this.handleClose}
						onWindowClick={this.handleWindowClick}
						onLearnMoreClick={this.handleLearnMore}
						orientation='column'						
						theme={theme}					
					/>
					</div>
				</div>
			);	
		}else{
		  	return (
				<div
					ref={el => this.bannerRef = el}
					class={[bannerStyle.banner, !isShowing ? bannerStyle.hidden : ''].join(' ')}
					style={{
						boxShadow: `0px 0px 5px ${primaryColor}`,
						backgroundColor: backgroundColor,
						color: textLightColor
					}}
				>
				<div class={bannerStyle.content}>
					<Description
						onSave={onSave}
						onClose={this.handleClose}
						onWindowClick={this.handleWindowClick}
						onLearnMoreClick={this.handleLearnMore}						
						theme={theme}					
					/>
				</div>
				</div>
		);
		}
	}
}
