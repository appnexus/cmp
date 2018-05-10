import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from "fs";

const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV !== 'production';

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
	output: {
		comments: false
	},
	compress: {
		unsafe_comps: true,
		properties: true,
		keep_fargs: false,
		pure_getters: true,
		collapse_vars: true,
		unsafe: true,
		warnings: false,
		screw_ie8: true,
		sequences: true,
		dead_code: true,
		drop_debugger: true,
		comparisons: true,
		conditionals: true,
		evaluate: true,
		booleans: true,
		loops: true,
		unused: true,
		hoist_funs: true,
		if_return: true,
		join_vars: true,
		cascade: true,
		drop_console: false
	}
});

const commonConfig = {
	context: path.resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.jsx', '.js', '.json', '.less'],
		modules: [
			path.resolve(__dirname, 'src/lib'),
			path.resolve(__dirname, 'node_modules'),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, 'src/components'), // used for tests
			style: path.resolve(__dirname, 'src/style'),
			react: 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},

	module: {
		rules: [
			{
				test: /\.hbs/,
				exclude: /node_modules/,
				use: "handlebars-loader"
			},
			{
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				// Transform our own .(less|css) files with PostCSS and CSS-modules
				test: /\.(less|css)$/,
				include: [
					path.resolve(__dirname, 'src/components'),
					path.resolve(__dirname, 'src/docs/components')
				],
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: CSS_MAPS,
							importLoaders: 1,
							minimize: true,
							localIdentName: '[name]_[local]--[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: CSS_MAPS,
							plugins: () => {
								autoprefixer({ browsers: ['last 2 versions'] });
							}
						}
					},
					{
						loader: 'less-loader',
						options: { sourceMap: CSS_MAPS }
					}
				]
			},
			{
				test: /\.(less|css)$/,
				include: [
					path.resolve(__dirname, 'src/docs/style'),
					path.resolve(__dirname, 'node_modules/codemirror/lib/codemirror.css')
				],
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'less-loader',
						options: { sourceMap: CSS_MAPS }
					}
				]
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				use: 'raw-loader'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: ENV === 'production' ? 'file-loader' : 'url-loader'
			}
		]
	},

	stats: { colors: true },

	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	},

	devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

	devServer: {
		port: process.env.PORT || 8080,
		host: 'localhost',
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true,
		disableHostCheck: true,
		open: false,
		openPage: 'docs/',
		https: false
	}
};
/*
module.exports = {
// 	context: path.resolve(__dirname, 'src'),
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	},
	entry: {
		s1cmp: './s1cmp.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: './',
		filename: '[name].bundle.js'
	},
	plugins: [new HtmlWebpackPlugin()]
};
*/


module.exports = [
	// S1 CMP config
	{
		entry: {
			embed: './s1/embed',
			cmp: './s1/cmp.js'
		},
		...commonConfig,
		output: {
			path: path.resolve(__dirname, 'build'),
			publicPath: './',
			filename: 's1.[name].bundle.js'
		},
		plugins: ([
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV)
			}),
			new webpack.optimize.CommonsChunkPlugin({
		    name: "vendor",
		    // filename: "vendor.js"
		    // (Give the chunk a different name)

		    minChunks: Infinity,
		    // (with more entries, this ensures that no other module
		    //  goes into the vendor chunk)
		  }),
			new HtmlWebpackPlugin({
				title: 'poop',
				filename: 's1cmp.html',
				template: 's1cmp.hbs',
				// inline: fs.readFileSync('./src/s1cmp.js', 'utf8'),
				// inject: true,
				chunks: ['embed', 'cmp'],
				inlineSource: '(embed)',
			}),
			new HtmlWebpackInlineSourcePlugin()
		]).concat(ENV === 'production' ? uglifyPlugin : [uglifyPlugin]),
	},
	// CMP config
	/*
	{
		entry: {
			cmp: './index.js',
			'cmp.complete': './complete.js'
		},

		output: {
			path: path.resolve(__dirname, 'build'),
			publicPath: './',
			filename: '[name].bundle.js'
		},
		...commonConfig,
		plugins: ([
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV)
			}),
			new webpack.ProvidePlugin({
				'Promise': 'promise-polyfill'
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'index.html',
				chunks: ['cmp']
			}),
		]).concat(ENV === 'production' ? uglifyPlugin : []),
	},
	// Docs config
	{
		entry: {
			'docs': './docs/index.jsx',
			'iframeExample': './docs/iframe/iframeExample.jsx',
			'portal': './docs/assets/portal.js'
		},

		output: {
			path: path.resolve(__dirname, 'build/docs'),
			publicPath: './',
			filename: '[name].bundle.js'
		},
		...commonConfig,
		plugins: ([
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV)
			}),
			new webpack.ProvidePlugin({
				'Promise': 'promise-polyfill'
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'docs/index.html',
				chunks: ['docs']
			}),
			new HtmlWebpackPlugin({
				filename: 'iframeExample.html',
				template: './docs/iframe/iframeExample.html',
				chunks: ['iframeExample']
			}),
			new HtmlWebpackPlugin({
				filename: 'portal.html',
				template: './docs/assets/portal.html',
				chunks: ['portal']
			}),
			new CopyWebpackPlugin([
				{ from: 'docs/assets', to: '.' },
			])
		]).concat(ENV === 'production' ? uglifyPlugin : []),
	}
	*/
];
