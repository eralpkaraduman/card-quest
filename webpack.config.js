const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './web/src/index.web.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.web.json',
          },
        },
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.web.json'})],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'web/dist'),
  },
  plugins: [new HtmlWebpackPlugin({template: './web/src/index.html'})],
};
