const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "/public"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
      ignoreOrder: true,
    }),
  ],
  devServer: {
    proxy: {
      '/api': 'http://localhost:5001',
    },
    port: 3000,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: { localIdentName: '[local]' },
              importLoaders: 1,
            },
          },
          "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: { limit: false },
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, 'src'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      components: path.resolve(__dirname, 'src/components'),
      api: path.resolve(__dirname, 'src/api'),
      context: path.resolve(__dirname, 'src/context'),
      pages: path.resolve(__dirname, 'src/pages'),
    },
  },
}