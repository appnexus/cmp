import { h, Component } from 'preact';
import style from './intro.less';

export default class Intro extends Component {
	render() {

		return (
			<div>
				<h1 className={style.header}>What is a CMP</h1>
				<p>
				CMP is a tool for publishers to engage users of their properties and gather & store end user consent.
				A CMP product may offer various features such as displaying of consent notifications properly on
				various devices, consent reporting, and engaging with any vendor code on the pub's page (including
				widgets and non-adtech vendors).
				</p>

				<p>
				Consent framework is the protocol established by IAB EU to enable CMPs to pass consent information
				to any adtech vendor who may run code on the publisher's property, such as adserver tags.
				</p>

				<p>
				AppNexus is supporting and contributing to the IAB EU consent framework. Our adserver, SSP, and
				headerbidding tags will fully support the protocol in order to ingest user consent. We also have a
				proof-of-concept CMP to demonstrate how consent is captured and stored based on consent framework.
				</p>

				<h1 className={style.header}>Where is Consent Stored</h1>
				<p>
				Consent can technically be stored anywhere as long as the infomration is exposed through the CMP API.
				We have implemented a reference implemetnation that allows for two different modes of
				consent <em>Site-Wide</em> and Global using browser cookies.
				</p>

				<strong>Site-Wide</strong>
				<p>
				Site-wide consent stores the user consent information in the publishers first party cookie. The consent
				information and approved vendors are contained and restricted for use within that site. Consent information
				collected on other domains/properties will not be used.
				</p>

				<em>Pros</em>
				<ul>
					<li>More publisher control over what vendors can obtain consent.</li>
					<li>Less risk of vendor optout due to external parties.</li>
				</ul>

				<em>Cons</em>
				<ul>
					<li>Consent information does not transfer. The publisher must obtain consent for every user themselves.</li>
					<li>The end-user has to got to each publisher to change consent information instead of a central place to manage everything.</li>
				</ul>

				<strong>Global</strong>
				<p>
					In the global consent model multiple publishers work together to obtain consent information. All
					information is stored in a 3rd party domain that the CMP can access. Consent gathered from one
					domain/property is automatically transfered to other properties that use the same CMP/3rd party domain.
				</p>


				<em>Pros</em>
				<ul>
					<li>Consent obtained from one party automatically transfers to everyone else in the global pool.</li>
					<li>The end user has a central place to manage consent information.</li>
				</ul>

				<em>Cons</em>
				<ul>
					<li>Publisher has less control over what vendors are given consent.</li>
				</ul>
			</div>
		);
	}
}
