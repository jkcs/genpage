"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseConfig = void 0;
const friendly_errors_webpack_plugin_1 = __importDefault(require("friendly-errors-webpack-plugin"));
const vue_loader_1 = require("vue-loader");
const path_1 = require("path");
const fs_1 = require("fs");
const logger_1 = require("../common/logger");
const constant_1 = require("../common/constant");
const { loadModule } = require('../common/module');
console.log(loadModule('vue-loader', path_1.join(__dirname, '../../')));
console.log(path_1.join(__dirname, '../../node_modules/cache-loader'));
const CACHE_LOADER = {
    // loader: loadModule('cache-loader', join(__dirname, '../../')),
    loader: path_1.join(__dirname, '../../node_modules/cache-loader'),
    options: {
        cacheDirectory: constant_1.CACHE_DIR,
    },
};
const CSS_LOADERS = [
    'style-loader',
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            config: {
                path: constant_1.POSTCSS_CONFIG_FILE,
            },
        },
    },
];
const plugins = [
    new vue_loader_1.VueLoaderPlugin(),
    new friendly_errors_webpack_plugin_1.default({
        clearConsole: false,
        logLevel: 'WARNING',
    }),
];
const tsconfigPath = path_1.join(constant_1.CWD, 'tsconfig.json');
if (fs_1.existsSync(tsconfigPath)) {
    const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
    plugins.push(new ForkTsCheckerPlugin({
        formatter: 'codeframe',
        vue: { enabled: true },
        logger: {
            // skip info message
            info() { },
            warn(message) {
                logger_1.consola.warn(message);
            },
            error(message) {
                logger_1.consola.error(message);
            },
        },
    }));
}
exports.baseConfig = {
    mode: 'development',
    resolve: {
        extensions: [...constant_1.SCRIPT_EXTS, ...constant_1.STYLE_EXTS],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    CACHE_LOADER,
                    {
                        // loader: 'vue-loader',
                        // loader: loadModule('vue-loader', join(__dirname, '../../')),
                        loader: path_1.join(__dirname, '../../node_modules/vue-loader'),
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins,
};
