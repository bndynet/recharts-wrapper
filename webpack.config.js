const path = require("path");
const HeaderInjectionWebpackPlugin = require("@bndynet/header-injection-webpack-plugin");

module.exports = {
    entry: {
        "index": "./src/index.ts",
        "index.min": "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "./lib/umd"),
        filename: "[name].js",
        libraryTarget: "umd",
        library: "BLib",
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            ...resolveTsconfigPathsToAlias(),
        },
    },
    externals: {
        // Don't bundle react, react-dom and some else
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React",
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM",
        },
        // classnames: {
        //     commonjs: "classnames",
        //     commonjs2: "classnames",
        //     amd: "classnames",
        //     root: "classNames",
        // },
        recharts: {
            commonjs: "recharts",
            commonjs2: "recharts",
            amd: "Recharts",
            root: "Recharts",
        },
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HeaderInjectionWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
};

function resolveTsconfigPathsToAlias({
    tsconfigPath = "./tsconfig.json",
    webpackConfigBasePath = "./",
} = {}) {
    const { paths } = require(tsconfigPath).compilerOptions;

    const aliases = {};

    if (paths) {
        Object.keys(paths).forEach(item => {
            const key = item.replace("/*", "");
            const value = path.resolve(
                webpackConfigBasePath,
                paths[item][0].replace("/*", ""),
            );

            aliases[key] = value;
        });
    }

    return aliases;
}
