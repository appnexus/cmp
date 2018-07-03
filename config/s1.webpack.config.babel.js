/* @noflow */
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import fs from 'fs';
import UglifyJS from 'uglify-es';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import {
	commonConfig,
	uglifyPlugin,
	version
} from './common.webpack.config.babel';

const ENV = process.env.NODE_ENV || 'development';

module.exports = [
	// S1 CMP
	{
		entry: {
			cmp: './s1/cmp.js'
		},
		...commonConfig,
		output: {
			path: path.resolve(__dirname, '../', `dist/${version}`),
			publicPath: './',
			filename: 'cmp.js'
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV)
			}),
			new HtmlWebpackPlugin({
				filename: '../reference.html',
				template: 's1/reference.hbs',
				inject: false,
				inline: UglifyJS.minify(fs.readFileSync('./src/s1/loader.js', 'utf8')).code,
				version
			}),
			new CopyWebpackPlugin([
				{
					from: 's1/loader.js',
					to: './loader.js',
					transform(content) {
						// Just want to uglify and copy this file over
						return Promise.resolve(
							Buffer.from(UglifyJS.minify(content.toString()).code, 'utf8')
						);
					}
				}
			])
		].concat(ENV === 'production' ? uglifyPlugin : [])
	}
];
