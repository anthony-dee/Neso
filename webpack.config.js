const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// css-loader adds css to outputted js file. Handles and parses CSS files
// style-loader adds css in outputted js file to html in style tag
// sass-loader handes and parses SCSS files

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/js/neso-src.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "neso.js",
        library: "Neso",
        libraryTarget: "umd",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            /*{
                test: /\.(s[ac]|c)ss$/i, // This regex adds support for .scss, .sass and .css file types
                use: [ "style-loader", "css-loader", "sass-loader", ],
            },*/
            {
                test: /\.(s[ac]|c)ss$/i, // This regex adds support for .scss, .sass and .css file types
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],
}