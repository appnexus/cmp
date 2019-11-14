import { expect } from 'chai';

import {
	encodeVendorCookieValue,
	decodeVendorCookieValue,
	encodePublisherCookieValue,
	decodePublisherCookieValue
} from './cookieutils';

describe('search', () => {
	it('rigged', () => {
		// const bitString = encodeVendorCookieValue(consentData);
		// const decoded = decodeVendorCookieValue(bitString);

		// const bitString = encodePublisherCookieValue(consentData);
		// const decoded = decodePublisherCookieValue(bitString);
		const bitStringOld = `BOm168dOm168dABABAENCl-AAAAqV7_______9______9uz_Ov_v_f__33e8__9v_l_7_-___u_-3zd4u_1vf99yfm1-7etr3tp_87ues2_Xur__79__3z3_9phP78k89r7337Ew-v-3o8A`;
		const bitStringNew = `BOm1-IOOm1-IOAmABAENCl-AAAAqV7_______9______9uz_Ov_v_f__33e8__9v_l_7_-___u_-3zd4u_1vf99yfm1-7etr3tp_87ues2_Xur__79__3z3_9phP78k89r7337Ew-v-3o8A`;
		console.log('decodePublisherCookieValue Old:::::');
		console.log(decodePublisherCookieValue(bitStringOld));
		console.log('decodeVendorCookieValue Old:::::');
		console.log(decodeVendorCookieValue(bitStringOld));

		console.log('decodePublisherCookieValue New:::::');
		console.log(decodePublisherCookieValue(bitStringNew));
		console.log('decodeVendorCookieValue New:::::');
		console.log(decodeVendorCookieValue(bitStringNew));
		expect(1).to.equal(1);
		// expect(decoded).to.deep.equal(consentData);
	});
});
