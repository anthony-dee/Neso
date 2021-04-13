const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// css-loader adds css to outputted js file. Handles and parses CSS files
// style-loader adds css in outputted js file to html in style tag
// sass-loader handes and parses SCSS files

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    mode: mode,
    entry: path.resolve(__dirname, "src/js/neso-src.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "neso.js",
        library: "Neso",
        libraryTarget: "umd",
    },
    devtool: "source-map",
    devServer: {
        contentBase: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.(s[ac]|c)ss$/i, // This regex adds support for .scss, .sass and .css file types
                use: [
                    mode === 'development' ? "style-loader" :  MiniCssExtractPlugin.loader,
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
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
    },
}