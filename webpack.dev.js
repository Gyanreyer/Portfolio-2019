const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist_dev"),
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist_dev"),
    compress: true,
    port: 9000,
    historyApiFallback: true
  }
});
