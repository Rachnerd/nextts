const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

module.exports = {
  target: "node",
  entry: ["webpack/hot/poll?100", "./src/server.ts"],
  mode: "development",

  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: "raw-loader"
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  },

  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?100"]
    })
  ],

  resolve: {
    extensions: [".mjs", ".ts", ".js"],
    alias: {
      "@app/env": path.resolve(__dirname, "./env/env.dev")
    }
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "server.js"
  }
};
