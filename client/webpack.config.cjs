const path = require("path");

module.exports = {
  entry: "./src/main.jsx", // Replace with the path to your entry file
  output: {
    path: path.resolve(__dirname, "dist"), // Replace with the desired output path
    filename: "bundle.js", // Replace with the desired output filename
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
};
