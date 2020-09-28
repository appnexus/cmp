/**
 * Node script used to upgrade vendor-list files. Use by calling `yarn upgrade-vendor-list`
 */

global.__VERSION__ = 0; // dont need this in node context

const fs = require('fs');
const https = require('https');
const { LANGUAGES } = require('../src/s1/constants.js');

const VENDOR_LIST_URL = 'https://vendorlist.consensu.org/v2/vendor-list.json';

const externalFiles = [
	{
		url: VENDOR_LIST_URL,
		path: 'src/s1/config/2.0/vendor-list.json',
	},
];

const downloadFile = async (url, path) => {
	const file = fs.createWriteStream(path);
	return https.get(url, (response) => {
		response.pipe(file);
	});
};

const processFiles = () => {
	const getVersion = new Promise((resolve, reject) => {
		https
			.get(VENDOR_LIST_URL, (response) => {
				let body = '';
				response.on('data', (chunk) => {
					body += chunk;
				});
				response.on('end', () => {
					const vendorList = JSON.parse(body);
					resolve(vendorList.vendorListVersion);
				});
			})
			.on('error', (e) => {
				console.log('error loading vendor list', e);
				reject(e);
			});
	});

	getVersion.then((version) => {
		console.log('==================');
		console.log(`Loading vendorsListVersion ${version}`);
		console.log('==================');
		LANGUAGES.filter(({ shouldDisablePurposesFetch = false }) => !shouldDisablePurposesFetch).forEach(
			({ display, code }) => {
				downloadFile(
					`https://vendorlist.consensu.org/v2/purposes-${code}.json`,
					`src/s1/config/2.0/purposes/purposes-${code}.json`
				)
					.then(() => {
						console.log(`  ==> Updated purposes for: ${display}`);
					})
					.catch((e) => {
						console.log(`  ==> Error updating purposes for: ${display}`, e);
					});
			}
		);

		externalFiles.forEach(({ url, path }) => {
			downloadFile(url, path)
				.then(() => {
					console.log(`  ==> Updated ${path}`);
				})
				.catch((e) => {
					console.log(`  ==> Error updating ${path}`, e);
				});
		});
	});
};

processFiles();
