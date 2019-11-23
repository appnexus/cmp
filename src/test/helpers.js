export const deleteAllCookies = (domain = '') => {
	let cookies = document.cookie.split(';');

	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		let eqPos = cookie.indexOf('=');
		let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + `=;${domain}expires=Thu, 01 Jan 1970 00:00:00 GMT`;
	}
};

export const setCookie = (
	name = '',
	value = '',
	expires = 30000,
	path = '/'
) => {
	document.cookie = `${name}=${value}; expires=${Date.now() +
		expires}; path=${path}`;
};

// pre 1.0.0 consent (old modal consent string)
export const oldEuconsentCookie = 'BOm168dOm168dABABAENCl-AAAAqV7_______9______9uz_Ov_v_f__33e8__9v_l_7_-___u_-3zd4u_1vf99yfm1-7etr3tp_87ues2_Xur__79__3z3_9phP78k89r7337Ew-v-3o8A';

// post 1.0.0 consent string (contains vendorList id)
export const newEuconsentCookie = 'BOm1-IOOm1-IOAmABAENCl-AAAAqV7_______9______9uz_Ov_v_f__33e8__9v_l_7_-___u_-3zd4u_1vf99yfm1-7etr3tp_87ues2_Xur__79__3z3_9phP78k89r7337Ew-v-3o8A';
