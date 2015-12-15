var srcPath = './src/js/';
module.exports = {
	entry: {
		'content/content': srcPath + 'content/content'
	},
	output: {
		path: __dirname + '/dist/js/',
		publicPath: '/assets/js/',
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js/, exclude: /node_modules/, loaders: ['babel-loader'], presets: ['es2015', 'react'] }
		]
	}
};