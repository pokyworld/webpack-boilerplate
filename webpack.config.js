const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = [
    {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true
                }
            }
        ]
    },
    {
        test: /\.(txs|ts|jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }
];

module.exports = {
    target: "web",
    mode: "development",
    entry: ["./index.js", "./src/styles/scss/main.scss"],
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/",
        filename: "js/[name].app.js",
        chunkFilename: "js/[name].app.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial"
                }
            }
        }
    },
    module: { rules },
    resolve: {
        modules: ["src", "node_modules"],
        extensions: [".tsx", ".ts", ".jsx", ".js", ".scss", ".css"]
    },
    devServer: {
        https: true,
        host: "pokyworld.local",
        cert: "ssl/pokyworld.local.crt",
        key: "ssl/pokyworld.local.key",
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: true,
        compress: true,
        port: 7443
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].app.css"
        })
    ]
}
