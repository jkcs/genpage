"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteDevConfig = exports.getSiteDevBaseConfig = void 0;
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const webpackbar_1 = __importDefault(require("webpackbar"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const lodash_1 = require("lodash");
const path_1 = require("path");
const webpack_base_1 = require("./webpack.base");
const common_1 = require("../common");
const constant_1 = require("../common/constant");
function getSiteDevBaseConfig() {
    const vantConfig = common_1.getVantConfig();
    const baiduAnalytics = lodash_1.get(vantConfig, 'site.baiduAnalytics');
    const entry = lodash_1.get(vantConfig, 'entry');
    function getSiteConfig() {
        const siteConfig = vantConfig.site;
        if (siteConfig.locales) {
            return siteConfig.locales[siteConfig.defaultLang || 'en-US'];
        }
        return siteConfig;
    }
    function getTitle(config) {
        let { title } = config;
        if (config.description) {
            title += ` - ${config.description}`;
        }
        return title;
    }
    const siteConfig = getSiteConfig();
    const title = getTitle(siteConfig);
    // return merge(baseConfig as any, {
    // return merge({
    //   // entry: join(__dirname, '../../demo/main.js'),
    //   // entry: entry,
    //   // output: {
    //   //   path: '/',
    //   //   filename: '[name].js',
    //   //   publicPath: '/'
    //   // },
    //   devServer: {
    //     port: 8080,
    //     quiet: true,
    //     host: '0.0.0.0',
    //     stats: 'errors-only',
    //     publicPath: '/',
    //     disableHostCheck: true,
    //     contentBase: '/',
    //   },
    //   plugins: [
    //     new HtmlWebpackPlugin({
    //       title,
    //       // logo: siteConfig.logo,
    //       // description: siteConfig.description,
    //       inject: true,
    //       template: join(__dirname, '../../index.html'),
    //       filename: 'index.html'
    //     })
    //   ]
    // })
    return webpack_merge_1.default(webpack_base_1.baseConfig, {
        // entry: entry,
        devServer: {
            port: 8080,
            quiet: true,
            host: '0.0.0.0',
            stats: 'errors-only',
            publicPath: '/',
            disableHostCheck: true,
        },
        // resolve: {
        //   alias: {
        //     'site-mobile-shared': SITE_MODILE_SHARED_FILE,
        //     'site-desktop-shared': SITE_DESKTOP_SHARED_FILE,
        //   },
        // },
        output: {
            chunkFilename: '[name].js',
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    chunks: {
                        chunks: 'all',
                        minChunks: 2,
                        minSize: 0,
                        name: 'chunks',
                    },
                },
            },
        },
        plugins: [
            new webpackbar_1.default({
                name: 'Genpage Cli',
                color: constant_1.GREEN,
            }),
            // new VantCliSitePlugin(),
            new html_webpack_plugin_1.default({
                title,
                // logo: siteConfig.logo,
                // description: siteConfig.description,
                chunks: ['chunks', 'site-desktop'],
                template: path_1.join(__dirname, '../../index.html'),
                filename: 'index.html'
                // baiduAnalytics,
            })
            // new HtmlWebpackPlugin({
            //   title,
            //   logo: siteConfig.logo,
            //   description: siteConfig.description,
            //   chunks: ['chunks', 'site-mobile'],
            //   template: join(__dirname, '../../site/mobile/index.html'),
            //   filename: 'mobile.html',
            //   baiduAnalytics,
            // }),
        ],
    });
}
exports.getSiteDevBaseConfig = getSiteDevBaseConfig;
function getSiteDevConfig() {
    return common_1.getWebpackConfig(getSiteDevBaseConfig());
}
exports.getSiteDevConfig = getSiteDevConfig;
