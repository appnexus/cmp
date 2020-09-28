/* @noflow */
/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import { cmpVersion, commonConfig, uglifyPlugin, version } from './common.webpack.config.babel';

const ENV = process.env.NODE_ENV || 'development';

module.exports = [
	// CMP
	{
		entry: {
			cmp: './index.js',
			'cmp.complete': './complete.js',
		},

		output: {
			path: path.resolve(__dirname, '../', 'dist'),
			publicPath: './',
			filename: '[name].bundle.js',
		},
		...commonConfig,
		plugins: [
			// webpack.config.js
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV),
				__VERSION__: JSON.stringify(version),
				__CMP_VERSION__: JSON.stringify(cmpVersion),
			}),
			new webpack.ProvidePlugin({
				Promise: 'promise-polyfill',
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'index.html',
				chunks: ['cmp'],
			}),
			new CopyWebpackPlugin([{ from: '../serve.json', to: '.' }]),
		].concat(ENV === 'production' ? uglifyPlugin : []),
	},
	// Docs config
	{
		entry: {
			docs: './docs/index.jsx',
			iframeExample: './docs/iframe/iframeExample.jsx',
			portal: './docs/assets/portal.js',
		},

		output: {
			path: path.resolve(__dirname, '../', 'dist/docs'),
			publicPath: './',
			filename: '[name].bundle.js',
		},
		...commonConfig,
		plugins: [
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV),
			}),
			new webpack.ProvidePlugin({
				Promise: 'promise-polyfill',
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'docs/index.html',
				chunks: ['docs'],
			}),
			new HtmlWebpackPlugin({
				filename: 'iframeExample.html',
				template: './docs/iframe/iframeExample.html',
				chunks: ['iframeExample'],
			}),
			new HtmlWebpackPlugin({
				filename: 'portal.html',
				template: './docs/assets/portal.html',
				chunks: ['portal'],
			}),
			new CopyWebpackPlugin([{ from: 'docs/assets', to: '.' }]),
		].concat(ENV === 'production' ? uglifyPlugin : []),
	},
];
