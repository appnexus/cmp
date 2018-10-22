import { h, Component } from 'preact';
import style from './coder.less';
import { Controlled as CodeMirror } from 'react-codemirror2';

import {
	decodeCookieBitValue,
	decodeB64toBitString,
	decodeBitsToInt,
	decodeField,
} from '../../../lib/cookie/cookieutils';
import { NUM_BITS_VERSION } from '../../../lib/cookie/definitions/index';


export function validateBitString(bitString, versionMap) {
	const cookieVersion = decodeBitsToInt(bitString, 0, NUM_BITS_VERSION);
	if (typeof cookieVersion !== 'number') {
		throw Error('Could not find cookieVersion to decode');
	}
	else if (!versionMap[cookieVersion]) {
		throw Error(`Could not find definition to decode cookie version ${cookieVersion}`);
	}
	let cookieFields = versionMap[cookieVersion].fields;

	let position = 0;
	const acc = {};
	for (let field of cookieFields) {
		const { name, numBits, validator } = field;
		if (typeof validator !== 'function' || validator(acc)) {
			const bitCount = typeof numBits === 'function' ? numBits(acc) : numBits;
			if (position + bitCount > bitString.length) {
				throw Error(`Input ended before ${name} could be decoded`);
			}
			const { fieldValue, newPosition } = decodeField({
				input: bitString,
				output: acc,
				startPosition: position,
				field
			});
			if (fieldValue !== undefined) {
				acc[name] = fieldValue;
			}
			if (newPosition !== undefined) {
				position = newPosition;
			}
			else if (typeof numBits === 'number') {
				position += numBits;
			}
		}
	}
}

export default class CookieDecoder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bitString: '',
			b64: '',
			decodeError: ''
		};
	}

	decodeB64 = (e) => {
		const input = e.target.value;
		try {
			const decodedBitString = decodeB64toBitString(input);
			validateBitString(decodedBitString, this.props.versionMap);
			this.setState({
				b64: input,
				decodedB64: decodeCookieBitValue(decodedBitString, this.props.versionMap),
				b64Error: '',
			});
		}
		catch (err) {
			this.setState({
				b64: input,
				b64Error: err.message
			});
		}
	};

	decodeBits = (e) => {
		const input = e.target.value;
		try {
			validateBitString(input, this.props.versionMap);
			this.setState({
				bitString: input,
				decodedBits: decodeCookieBitValue(input, this.props.versionMap),
				bitError: '',
			});
		}
		catch (err) {
			this.setState({
				b64: input,
				bitError: err.message
			});
		}
	};

	render(props, state) {
		const { title } = props;
		const { bitError, b64Error, bitString, b64, decodedBits, decodedB64 } = state;

		return (
			<div className={style.cookieDecoder}>
				<span className={style.sectionTitle}>{title} Binary Cookie Value</span>
				{bitError && <div className={style.errorMessage}>{bitError}</div>}
				<textarea
					className={style.encodedInput}
					onKeyUp={this.decodeBits}
				>
					{bitString}
				</textarea>
				{bitString &&
				<CodeMirror
					className={style.decodedContent}
					value={JSON.stringify(decodedBits, null, 2)}
					options={{
						lineNumbers: true,
						indentWithTabs: true,
						smartIndent: true,
						tabSize: 2,
						mode: 'javascript',
						readOnly: true
					}} />
				}

				<span className={style.sectionTitle}>{title} Base64 Cookie Value</span>
				{b64Error && <div className={style.errorMessage}>{b64Error}</div>}
				<textarea
					className={style.encodedInput}
					onKeyUp={this.decodeB64}
				>
					{b64}
				</textarea>
				{b64 &&
				<CodeMirror
					className={style.decodedContent}
					value={JSON.stringify(decodedB64, null, 2)}
					options={{
						lineNumbers: true,
						indentWithTabs: true,
						smartIndent: true,
						tabSize: 2,
						mode: 'javascript',
						readOnly: true
					}} />
				}
			</div>
		);
	}
}
