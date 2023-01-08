/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({ filename: 'assets/css/[fullhash].css' }),
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /.*\.css$/,
          attributes: { as: 'style', type: 'text/css' },
        },
      ],
    }),
    new WebpackPwaManifest({
      name: 'UPTOME RESTORANT',
      short_name: 'katalog resto',
      description: 'resto uptome is katalog restoran',
      start_url: './index.html',
      display: 'standalone',
      orientation: 'any',
      publicPath: './',
      filename: 'manifest.json',
      ios: true,
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/icon.png'),
          size: 180,
          ios: true,
        },
        {
          src: path.resolve(__dirname, 'src/public/icon.png'),
          sizes: [72, 96, 128, 192, 256, 384, 512],
          purpose: 'any',
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src/scripts/sw.js',
      swDest: 'sw.js',
    }),
  ],
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin({
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
          CssMinimizerPlugin.cssoMinify,
          CssMinimizerPlugin.cleanCssMinify,
        ],
      }),
    ],
  },
});