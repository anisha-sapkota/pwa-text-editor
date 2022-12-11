const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      database: "./src/js/database.js",
      editor: "./src/js/editor.js",
      header: "./src/js/header.js",
      install: "./src/js/install.js",
      main: "./src/js/index.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Webpack plugin that generates our html file and injects our bundles.
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
        favicon: "./favicon.ico",
      }),

      // Injects our custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "Takes notes with JavaScript syntax highlighting!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        scope: ".",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    // Add CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
