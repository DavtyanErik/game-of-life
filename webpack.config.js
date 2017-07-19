const path = require('path');

const IN = path.resolve(__dirname);
const OUT = path.join(__dirname, 'public');

module.exports = {
	entry: path.join(IN, 'App.js'),
	output: {
		path: OUT,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-2']
				}
			}
		]
	}
}