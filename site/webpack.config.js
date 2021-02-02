const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /\.svg$/,
				use: ['svg-sprite-loader', 'svg-transform-loader', 'svgo-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				include: [
					path.resolve(__dirname, '../packages'),
					path.resolve(__dirname,'.')
				],
				use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
	],
}
