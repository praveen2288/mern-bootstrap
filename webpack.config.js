const path = require("path");
const entryFile = path.resolve(__dirname, "src", "public", "index.js");
const outputDir = path.resolve(__dirname, "src", "public");

module.exports = {
  mode: "production",
  entry: entryFile,
  output: {
    filename: "bundle.js",
    path: outputDir
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "/src/public"),
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 5002,
    overlay: {
      // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: false, // default false
      errors: false //default false
    },
    proxy: [
      // allows redirect of requests to webpack-dev-server to another destination
      {
        context: ["/api", "/auth"], // can have multiple
        target: "http://localhost:5001", //server and port to redirect to
        secure: false //don't use https
      }
    ]
  }
};