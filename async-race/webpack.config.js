const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    hot: true,
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
  },
};

const esLintPlugin = (isDev) => isDev ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js'] }) ];

module.exports = ({develop}) => ({
  mode: develop ? "development" : "production",
  devtool: develop ? 'inline-source-map' : false,
  entry: {
    app: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ],
  },
  plugins: [
    ...esLintPlugin(develop),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CopyPlugin({
      patterns: [{
        from: 'public',
        noErrorOnMissing: true,
      }],
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ...esLintPlugin(develop),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  ...devServer(develop)
});
