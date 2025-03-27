const dotenv = require('dotenv')
const path = require('path');
const liveServer = require('live-server');
const { DefinePlugin } = require('webpack');
const { headers } = require('./next.config');
dotenv.config();
const dev = process.env.NODE_ENV == "production"
if (dev) {
    console.log("dev live-server")
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    target: 'web',
    devServer: {
        headers: {
            key: "Access-Control-Allow-Credentials", value: "true",
            key: "Access-Control-Allow-Origin", value: "*",
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },

    },
    output: {
        crossOriginLoading: 'anonymous'
    }
}