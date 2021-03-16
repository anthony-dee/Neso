const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: path.resolve(__dirname, "src/js/neso-src.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "neso.js",
        library: "Neso",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css', //isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: '[id].css',  //isDevelopment ? '[id].css' : '[id].[hash].css'
       })
    ],
    mode: "development",
}