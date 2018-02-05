const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'webpack.bundle.js',
        path: path.resolve(__dirname, 'public/js/')
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
};