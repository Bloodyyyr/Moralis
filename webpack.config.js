/* eslint @typescript-eslint/no-var-requires: "off" */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Env vars for webpack
require('dotenv').config({ path: './webpack.app.env' });

// Dotenv instance for app
const Dotenv = require('dotenv-webpack');
// const { config } = require('@swc/core/spack');

const APP_BUILD_DIR = process.env.APP_BUILD_DIR || 'build';

const DEV_PORT = process.env.DEV_PORT || 3000;
// const DEV_ANALYZER_PORT = process.env.DEV_ANALYZER_PORT || 8888;
// const DEV_ANALYZER_SIZES = process.env.DEV_ANALYZER_SIZES || 'gzip';
const DISPLAY_ESLINT_ON_CLIENT = (process.env.DISPLAY_ESLINT_ON_CLIENT=="true"?true:false) || false ;
const NODE_ENV = process.env.NODE_ENV || "development";

const ENV = new String(NODE_ENV)

// Try the environment variable, otherwise use root
// const ASSET_PATH = process.env.ASSET_PATH || '/';
const ASSET_PATH = '/';
// const ASSET_PATH = "http://localhost:/8080";


//module.exports = {
let config = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, APP_BUILD_DIR),
    // filename: 'bundle.js',
    // filename: "static/js/[name].js",
    filename: '[name].[chunkhash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    // chunkFilename: "static/js/[name].chunk.js",
    chunkFilename: '[id].[chunkhash:8].js',
    publicPath: ASSET_PATH
  },
  devtool: 'inline-source-map',

  resolve: {
      // tsconfig-paths-webpack-plugin
    plugins: [new TsconfigPathsPlugin({/* options: see below */

      //configFile: "./tsconfig.json",
      logLevel: "info",
      extensions: [".js", ".ts", ".tsx" /*, ".mjs"*/],
      mainFields: ["browser", "main"],
      // baseUrl: "/foo"

    })],
    extensions: ['.tsx', '.ts', '.js', '.json' /*, ".mjs"*/],

    fallback: {
      assert: require.resolve('assert/'),
      buffer: require.resolve("buffer/"), // Work around for util.js:33 Uncaught ReferenceError: Buffer is not defined
      crypto: require.resolve("crypto-browserify"),
      http: false,
      https: false,
      os: false,
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
      util: require.resolve("util/"),
    },
    alias: {
      'magic-sdk': path.resolve(__dirname, 'node_modules/magic-sdk/dist/cjs/index.js'),
    },
  },
  module: {
    rules:
    [
      /*
      {
        enforce: 'pre',
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "eslint todo"
        ],
      },
*/
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },
/* TailWind */
      {
        test: /\.css$/,
        exclude: [/(node_modules)/, [/(server)/]],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "postcss-loader"
        ],
      },

      {
        test: /\.svg/,
        use:
        {
          loader: "svg-url-loader",
          options:
          {
            // make all svg images to work in IE
            iesafe: true,
            // make loader to behave like url-loader, for all svg files
            encoding: "base64",
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: {
           loader: "url-loader",
           options: {
             limit: 8192,
             name: "static/media/[name].[hash:8].[ext]"
           }
         }
          
      },

      {
        test: /\.(j|t)sx?$/,
        exclude: [/(node_modules)/, [/(server)/]],
        use: {
          loader: "swc-loader",
          options: {
            parseMap: true // When used with babel-loader, the parseMap option must be set to true
          },
        },
      } ,
    ],
  },
  plugins:
    [
      new ESLintWebpackPlugin({
        context: '../', // <-- change context path
        emitError: true,
        emitWarning: true,
        failOnError: false,
        failOnWarning: false,
        extensions: ["js","ts", "tsx"],
        overrideConfigFile: "./.eslintrc.json"
    }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      // Work around for util.js:33 Uncaught ReferenceError: Buffer is not defined
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        favicon: 'public/favicon.ico'
        })
      ,
      new Dotenv({
        path: 'app.env',
//        prefix: 'App.'
      })
      ,
      new Dotenv({
        path: 'app.secret.env',
//        prefix: 'App.'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "public", }, // Copy ressources from public folder to $APP_BUILD_DIR
          // { from: "other", to: "public" },
        ],
      }),
    ]
  ,
  devServer: {
    host: 'localhost',
    port: DEV_PORT,
    historyApiFallback: true,
    // open: true // automatically opens default browser on server launch
    client: {
      overlay: DISPLAY_ESLINT_ON_CLIENT, // error display : true = show Eslint warning/error on browser
    },

  }

} // module.exports

/*
if (ENV.length>0) {
  if (ENV.includes("HEROKU")) {

  // config.plugins.push
  // (
  //   new BundleAnalyzerPlugin
  //   ({
  //     openAnalyzer: false,
  //     analyzerPort: DEV_ANALYZER_PORT,
  //     defaultSizes: 'gzip',
  //     analyzerMode: 'static'
  //   })
  // )


  } else {
    config.plugins.push
    (
      new BundleAnalyzerPlugin
      ({
        openAnalyzer: false,
        defaultSizes: 'gzip'
      })
    )
  
  }
} // ENV.length>0
*/
 module.exports = config