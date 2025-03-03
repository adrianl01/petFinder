const dotenv = require('dotenv')
const path = require('path');
const liveServer = require('live-server');
const { DefinePlugin } = require('webpack');
dotenv.config();
const dev = process.env.NODE_ENV == "development"
if (dev) {
    liveServer.start({
        root: "./dist/",
        file: "index.html"
    })
}

module.exports = {
    watch: dev,
    entry: './src/App.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: { loader: 'ts-loader' },
                exclude: /node-modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader", {
                        loader: "css-loader",
                        options: { modules: true }
                    },
                ],
            },
        ],
    },
    plugins: [
        // ...
        new DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
        // ...
    ],
    resolve: { extensions: ['.tsx', '.ts', '.js'] },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
}