const path = require("path");

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
        ],
    },
    mode: "development",
}