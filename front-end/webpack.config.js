const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        main: './src/index.js' // file che carica tutto il website
    },

    output: {
        path: path.resolve(__dirname, 'release'), // crea la cartella release
        filename: 'core.js' // crea il file core.js che sarà incluso <script src="core.js"></script> con tutto il codice.
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
        })
    ]
};
