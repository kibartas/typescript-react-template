import path from "path";
import HtmlWebPackPlugin from "html-webpack-plugin";
import ESLintPlugin from 'eslint-webpack-plugin';
import ReactRefreshTypescript from 'react-refresh-typescript';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import *  as webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

interface Configuration extends webpack.Configuration {
    devServer?: WebpackDevServer.Configuration;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration  = {
    mode: isDevelopment ? 'development' : 'production',
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
    },
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            react: path.join(__dirname, 'node_modules', 'react'),
        },
        extensions: ['.tsx', '.jsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    getCustomTransformers: () => ({
                        before: isDevelopment ? [ReactRefreshTypescript()] : [],
                    }),
                    compilerOptions: {
                        module: "ES2015"
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                loader: "file-loader",
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new ESLintPlugin({ extensions: ['.tsx', '.jsx', '.ts', '.js'] }),
    ].filter(Boolean)
};

if (isDevelopment) {
    config.plugins?.push(new ReactRefreshWebpackPlugin());
} 

export default config;