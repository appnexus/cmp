/* @noflow */
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import fs from 'fs';
import UglifyJS from 'uglify-es';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { cmpVersion, commonConfig, name, uglifyPlugin, version } from './common.webpack.config.babel';

const ENV = process.env.NODE_ENV || 'development';

const pages = [
	{
		id: 's1cmp',
		filename: 'reference',
	},
	{
		id: 'info-acs',
	},
	{
		id: 'tcf-2.0',
	},
];

module.exports = [
	// S1 CMP
	{
		entry: {
			cmp: './s1/cmp.js',
			polyfills: './s1/polyfills.js',
			// 'tcf-2.0-loader': './s1/tcf-2.0-loader.js',
			'tcf-2.0-cmp': './s1/tcf-2.0-cmp.js',
		},
		...commonConfig,
		output: {
			path: path.resolve(__dirname, '../', `dist/${version}`),
			filename: '[name].js',
			publicPath: `https://s.flocdn.com/${name}/${version}/`,
			// publicPath: './',
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV),
				__VERSION__: JSON.stringify(version),
				__CMP_VERSION__: JSON.stringify(cmpVersion),
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
			new CopyWebpackPlugin([
				{
					from: './s1/tcf-2.0-loader.js',
					to: './tcf-2.0-loader.js',
					transform(content) {
						// Just want to uglify and copy this file over
						return Promise.resolve(Buffer.from(UglifyJS.minify(content.toString()).code, 'utf8'));
					},
				},
			]),
			new BundleAnalyzerPlugin({
				analyzerMode: 'disabled',
			}),
		].concat(ENV === 'production' ? uglifyPlugin : []),
	},
];
