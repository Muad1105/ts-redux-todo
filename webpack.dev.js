const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	target: 'web',
	mode: 'development',
	entry: path.resolve(__dirname, './src/index.tsx'),
	devtool: 'cheap-module-source-map',
	devServer: {
		port: 8080,
		contentBase: ['./src', './public'], // both src and output dirs
		inline: true,
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$|jsx/,
				use: {
				  loader: 'babel-loader',
				  options: {
					presets: ['@babel/preset-env']
				  }
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			  },
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.less$/i,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
					{
						loader: "less-loader",
						options: {
							lessOptions: {
								javascriptEnabled: true
							}
						},
					},
				]
			},
			{
				test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/inline',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
    plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: './index.html',
		}),
		new webpack.HotModuleReplacementPlugin({
			
		})
		  
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './public/dist'),
		clean: true
	}
};