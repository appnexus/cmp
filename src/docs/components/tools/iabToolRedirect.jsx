import { h } from 'preact';
import style from '../intro/intro.less';

const IabToolRedirect = (props) => {
	return (
		<div>
			<h1 className={style.header}>{props.encode ? "Encode consent cookie" : "Decode consent cookie"}</h1>
			<p>
				{props.encode ? (
					<a href="http://iabtcf.com/#/encode">Click here</a>
				) : (
					<a href="http://iabtcf.com/#/decode">Click here</a>
				)}
			</p>
		</div>);
};

export default IabToolRedirect;
