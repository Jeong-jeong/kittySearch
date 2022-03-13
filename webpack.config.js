const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      // html 파일 추출
      template: "index.html",
      inject: true,
    }),
    new MiniCssExtractPlugin({}), // css 파일 별도 추출
    new CleanWebpackPlugin(), // 번들시 기존 public 폴더 내 초기화
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /src/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // css, js minize, js uglify
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
};
