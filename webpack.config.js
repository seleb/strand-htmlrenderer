const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const pkg = require('./package.json');

module.exports = {
	output: {
		path: resolve(__dirname, 'docs'),
	},
	module: {
		rules: [
			{
				test: /\.strand$/,
				type: 'asset/source',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: pkg.name,
		}),
	],
};
