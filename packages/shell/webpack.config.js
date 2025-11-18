const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env files
const envPath = path.resolve(__dirname, '../../.env.' + (process.env.NODE_ENV || 'development'));
const envVars = dotenv.config({ path: envPath }).parsed || {};

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.tsx',
  mode: isDev ? 'development' : 'production',
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        mfeProducts: isDev
          ? 'mfeProducts@http://localhost:3001/remoteEntry.js'
          : `mfeProducts@${envVars.MFE_PRODUCTS_URL || 'http://localhost:3001'}/remoteEntry.js`,
        mfeCart: isDev
          ? 'mfeCart@http://localhost:3002/remoteEntry.js'
          : `mfeCart@${envVars.MFE_CART_URL || 'http://localhost:3002'}/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        zustand: {
          singleton: true,
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.MFE_PRODUCTS_URL': JSON.stringify(
        envVars.MFE_PRODUCTS_URL || 'http://localhost:3001'
      ),
      'process.env.MFE_CART_URL': JSON.stringify(envVars.MFE_CART_URL || 'http://localhost:3002'),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
