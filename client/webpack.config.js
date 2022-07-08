const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    //ENTRY POINT FOR FILES
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    //OUTPUT FOR BUNDLES
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //WEBPACK PLUGIN THAT GENERATES FOR HTML FILE AND INJECTS BUNDLES
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'jate'
      }),
      //CONFIGURE WORKBOX PLUGINS FOR SERVICE WORKER AND MANIFEST
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      //CREATES A MANIFEST.JSON FILE
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'jate notepad',
        short_name: 'notepad',
        description: 'text editor',
        background_color: '#272822',
        theme_color: '#31a9e1',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      //CSS LOADER
      rules: [
        {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          //BABEL LOADER TO USE ES6
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          },
        },
      ],
    },
  };
};
