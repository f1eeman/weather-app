import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  mode: 'development',
  entry: [
    'core-js/modules/es6.promise',
    'core-js/modules/es6.array.iterator',
    path.join(__dirname, 'src', 'index.js'),
  ],
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    watchContentBase: true,
    historyApiFallback: true,
    clientLogLevel: 'silent',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.woff(2)?$/,
        type: 'asset/inline',
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, 'src', 'assets'), to: 'assets' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'template.html'),
      filename: 'index.html',
    }),
  ],
};

export default config;
