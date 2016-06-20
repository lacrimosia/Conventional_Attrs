module.exports = {
    entry: './js/main.js',
    output: {
        path: './app',
        filename: 'client.js'
    },
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
    	loaders: [
    		{
    			test: /\.js$/,
    			exclude: /node_modules/,
    			loader: 'babel',
    			query: {
    				presets: ['es2015', 'react']
    			}
    		}
    	]
    }
}
