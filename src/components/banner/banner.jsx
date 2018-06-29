import {h, Component} from 'preact';
import style from './banner.less';
import Label from '../label/label';
import ChevronIcon from '../chevronicon/chevronicon';

class LocalLabel extends Label {
    static defaultProps = {
        prefix: 'banner'
    };
}

const PANEL_COLLECTED = 0;
const PANEL_PURPOSE = 1;


export default class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            selectedPanelIndex: 0,
        };
    }

    handleInfo = (index) => () => {
        const {isExpanded, selectedPanelIndex} = this.state;
        this.setState({
            selectedPanelIndex: index,
            isExpanded: index !== selectedPanelIndex || !isExpanded
        });
    };

    handleWindowClick = e => {
        if (!this.bannerRef || !this.bannerRef.contains(e.target)) {
            this.props.onSave();
        }
    };

    handleLearnMore = () => {
        this.props.onShowModal(true);
    };


    render(props, state) {
        const {isShowing, onSave, theme} = props;
        const {selectedPanelIndex, isExpanded} = state;

        return (
            <div
                ref={el => this.bannerRef = el}
                class={[style.banner, !isShowing ? style.hidden : ''].join(' ')}
                style={{
                    boxShadow: `0px 0px 5px ${theme.primary}`,
                    backgroundColor: theme.background,
                    color: theme.textLight
                }}
            >
                <div class={style.content}>
                    <div
                        class={style.message}
                        ref={el => this.messageRef = el}
                    >
                        <div class={style.info}>
                            <div class={style.title} style={{color: theme.text}}>
                                <LocalLabel localizeKey='title'>Ads help us run this site</LocalLabel>
                            </div>
                            <LocalLabel localizeKey='description'>
                                When you visit our site, pre-selected companies may access and use certain information
                                on your device to serve relevant ads or personalized content.
                            </LocalLabel>
                            <div class={style.options}>
                                <div
                                    class={[style.option, selectedPanelIndex === PANEL_COLLECTED && isExpanded ? style.expanded : ''].join(' ')}>
                                    <a onClick={this.handleInfo(PANEL_COLLECTED)} style={{color: theme.textLink}}>
                                        <ChevronIcon/>
                                        <LocalLabel localizeKey='links.data.title'>Information that may be
                                            used.
                                        </LocalLabel>
                                    </a>
                                    <div
                                        className={style.optionDetails}
                                        style={{color: theme.textLight}}
                                    >
                                        <LocalLabel localizeKey='links.data.description'>
                                            Information that may be used:
                                            <ul>
                                                <li>Type of browser and its settings</li>
                                                <li>Information about the device's operating system</li>
                                                <li>Cookie information</li>
                                                <li>Information about other identifiers assigned to the device</li>
                                                <li>The IP address from which the device accesses a client's website or
                                                    mobile application
                                                </li>
                                                <li>Information about the user's activity on that device, including web
                                                    pages and mobile apps visited or used
                                                </li>
                                                <li>Information about the geographic location of the device when it
                                                    accesses
                                                    a website or mobile application
                                                </li>
                                            </ul>
                                        </LocalLabel>
                                    </div>
                                </div>
                                <div
                                    class={[style.option, selectedPanelIndex === PANEL_PURPOSE && isExpanded ? style.expanded : ''].join(' ')}>
                                    <a
                                        onClick={this.handleInfo(PANEL_PURPOSE)}
                                        style={{color: theme.textLink}}
                                    >
                                        <ChevronIcon/>
                                        <LocalLabel localizeKey='links.purposes.title'>Purposes for storing
                                            information.</LocalLabel>
                                    </a>

                                    <div
                                        class={style.optionDetails}
                                        style={{color: theme.textLight}}
                                    >

                                        <LocalLabel localizeKey='links.purposes.description'>
                                            How information may be used:
                                            <ul>
                                                <li>Storage and access of information</li>
                                                <li>Ad selection and delivery</li>
                                                <li>Content selection and delivery</li>
                                                <li>Personalization</li>
                                                <li>Measurement</li>
                                            </ul>
                                        </LocalLabel>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class={style.consent}>
                            <a class={style.learnMore} onClick={this.handleLearnMore}
                               style={{color: theme.primary, borderColor: theme.primary}}>
                                <LocalLabel localizeKey='links.manage'>Learn More</LocalLabel>
                            </a>
                            <a
                                class={style.continue}
                                onClick={onSave}
                                style={{
                                    backgroundColor: theme.primary,
                                    borderColor: theme.primary,
                                    color: theme.primaryText
                                }}
                            >
                                <LocalLabel localizeKey='links.accept'>Continue to site</LocalLabel>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
