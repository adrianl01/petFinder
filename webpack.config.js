const path = require('path');
const liveServer = require('live-server')
const dev = process.env.NODE_ENV == "development"
// if (dev) {
//     liveServer.start({
//         root: "./",
//         file: "index.html"
//     })
// }

module.exports = {
    watch: dev,
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
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
    resolve: { extensions: ['.tsx', '.ts', '.js'] },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devServer: {
        port: 3000
    }

}