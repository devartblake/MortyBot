'use strict';
process.env.BABEL_ENV = 'server'

let webpack = require('webpack');
let path = require('path');
let fs = require('fs');
let _ = require('lodash');
let uglifyJsPlugin = require('uglifyjs-webpack-plugin')

let nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

let serverConfig = {
	target: 'node',
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: true,
		__dirname: true
	},

    entry: { 
        server: path.join(__dirname, './server/index.js')
     },

	output: {
		path: path.join(__dirname, '../dist/server'),
		filename: 'bundle.js'
	},

	externals: _.defaults(nodeModules, {
		'../../config.js': 'commonjs ../config.js'
	}),

	// devtool: 'sourcemap',

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [/node_modules/, /vendor/]
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			WEBPACK_BUNDLE: true			
		}),
         
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})		
    ],

    optimization: {
        minimizer: [
            new uglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        mangle: true,
                        warnings: false
                    }
                },                
                cache: true,
                parallel: true
            }),
        ]
    }
};

module.exports = serverConfig