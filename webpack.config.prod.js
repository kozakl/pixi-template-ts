const webpack      = require('webpack'),
      RestOptimize = require('./tools/plugins/RestOptimize');

module.exports = {
    entry: './src/Main.ts',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new RestOptimize(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
