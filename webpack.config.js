const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require('./package.json');

module.exports = {
	mode: "production",
	module: {
		rules: [
			{
				test: /\.txt$/,
				use: "raw-loader"
			}
		]
	},
	plugins: [new HtmlWebpackPlugin({
		title: pkg.name
	})]
};
