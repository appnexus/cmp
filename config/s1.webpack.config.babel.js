/* @noflow */
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import fs from 'fs';
import UglifyJS from 'uglify-es';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { commonConfig, uglifyPlugin, version } from './common.webpack.config.babel';

const ENV = process.env.NODE_ENV || 'development';

const pages = [
	{
		id: 's1cmp',
		filename: 'reference',
	},
	{
		id: 'info-acs',
	},
];

module.exports = [
	// S1 CMP
	{
		entry: {
			cmp: './s1/cmp.js',
		},
		...commonConfig,
		output: {
			path: path.resolve(__dirname, '../', `dist/${version}`),
			publicPath: './',
			filename: 'cmp.js',
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV),
				__VERSION__: JSON.stringify(version),
			}),
			...pages.map(
				({ id, filename }) =>
					new HtmlWebpackPlugin({
						template: `./s1/reference/${id}.html`,
						filename: `./${filename || id}.html`,
						cache: true,
						showErrors: true,
						inject: false,
						templateParameters() {
							return {
								version,
								date: new Date().toTimeString(),
								loader: UglifyJS.minify(fs.readFileSync('./src/s1/loader.js', 'utf8')).code,
							};
						},
					})
			),
			new CopyWebpackPlugin([
				{
					from: './s1/config',
					to: './config',
				},
			]),
			new CopyWebpackPlugin([
				{
					from: './s1/loader.js',
					to: './loader.js',
					transform(content) {
						// Just want to uglify and copy this file over
						return Promise.resolve(Buffer.from(UglifyJS.minify(content.toString()).code, 'utf8'));
					},
				},
			]),
		].concat(ENV === 'production' ? uglifyPlugin : []),
	},
];
