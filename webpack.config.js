const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createStyledComponentsTransformer =
  require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './index.web.tsx',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.web.json',
            getCustomTransformers: () => ({
              before: [styledComponentsTransformer],
            }),
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.txt$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.web.json'})],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      '@': path.resolve(__dirname, './src/'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
};
