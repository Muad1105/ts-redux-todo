const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
	mode: 'production',
	entry: path.resolve(__dirname, './src/index.tsx'),
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
	plugins: [
		// new webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')]),
		new HtmlWebpackPlugin({
			hash: true,
			template: './index.html',
			filename: '../index.html',
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
			}, 
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new CompressionPlugin({
			// asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle-[contenthash].js',
		path: path.resolve(__dirname, 'public/dist'),
		clean: true
	},
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
	   	splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
	   	},
		minimize: true,
		minimizer: [new TerserPlugin({
			parallel: true,
			test: /\.jsx(\?.*)?$/i,
			exclude: /\/node_modules/
		})],
	},
};