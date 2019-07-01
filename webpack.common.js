const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          sizes: [1000, 720, 480, 360]
        }
      },
      {
        test: /\.(otf|eot|woff|woff2|mp4|webm)$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: "./src/hosted"
      },
      {
        from: "./src/robots.txt"
      },
      {
        from: "./src/sitemap.xml"
      },
      {
        from: "./src/resources/downloads"
      }
    ]),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/resources/icons/favicon.ico",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png)$/i,
      jpegtran: { progressive: true }
    })
  ]
};
