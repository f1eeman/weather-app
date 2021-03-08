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
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true, // react-hot-loader
    watchContentBase: true,
    historyApiFallback: true,
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
            plugins: ['@babel/plugin-syntax-dynamic-import'],
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
        use: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: path.join(__dirname, 'src', 'assets'), to: 'assets' },
    //   ],
    // }),
  ],
};

export default config;
