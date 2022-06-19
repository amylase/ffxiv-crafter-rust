const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    bootstrap: "./src/bootstrap.js",
    worker: "./src/rust/worker.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.js$/, loader: "source-map-loader" },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({patterns: [{from: 'index.html'}]})
  ],
  experiments: {
    asyncWebAssembly: true,
  }
};
