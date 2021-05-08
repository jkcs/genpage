"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteDevConfig = exports.getSiteDevBaseConfig = void 0;
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const lodash_1 = require("lodash");
const path_1 = require("path");
const common_1 = require("../common");
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
    console.log(path_1.join(__dirname, '../../index.html'));
    // return merge(baseConfig as any, {
    return webpack_merge_1.default({
        // entry: join(ROOT, entry),
        // entry: entry,
        // output: {
        //   path: '/',
        //   filename: '[name].js',
        //   publicPath: '/'
        // },
        devServer: {
            port: 8080,
            quiet: true,
            host: '0.0.0.0',
            stats: 'errors-only',
            publicPath: '/',
            disableHostCheck: true,
            contentBase: '/',
        },
        plugins: [
            new html_webpack_plugin_1.default({
                title,
                // logo: siteConfig.logo,
                // description: siteConfig.description,
                inject: true,
                template: path_1.join(__dirname, '../../index.html'),
                filename: 'index.html'
            })
        ]
    });
    // return merge(baseConfig as any, {
    //   entry: entry,
    //   devServer: {
    //     port: 8080,
    //     quiet: true,
    //     host: '0.0.0.0',
    //     stats: 'errors-only',
    //     publicPath: '/',
    //     disableHostCheck: true,
    //   },
    //   resolve: {
    //     alias: {
    //       'site-mobile-shared': SITE_MODILE_SHARED_FILE,
    //       'site-desktop-shared': SITE_DESKTOP_SHARED_FILE,
    //     },
    //   },
    //   output: {
    //     chunkFilename: '[name].js',
    //   },
    //   optimization: {
    //     splitChunks: {
    //       cacheGroups: {
    //         chunks: {
    //           chunks: 'all',
    //           minChunks: 2,
    //           minSize: 0,
    //           name: 'chunks',
    //         },
    //       },
    //     },
    //   },
    //   plugins: [
    //     new WebpackBar({
    //       name: 'Vant Cli',
    //       color: GREEN,
    //     }),
    //     new VantCliSitePlugin(),
    //     new HtmlWebpackPlugin({
    //       title,
    //       logo: siteConfig.logo,
    //       description: siteConfig.description,
    //       chunks: ['chunks', 'site-desktop'],
    //       template: join(__dirname, '../../site/desktop/index.html'),
    //       filename: 'index.html',
    //       baiduAnalytics,
    //     }),
    //     new HtmlWebpackPlugin({
    //       title,
    //       logo: siteConfig.logo,
    //       description: siteConfig.description,
    //       chunks: ['chunks', 'site-mobile'],
    //       template: join(__dirname, '../../site/mobile/index.html'),
    //       filename: 'mobile.html',
    //       baiduAnalytics,
    //     }),
    //   ],
    // });
}
exports.getSiteDevBaseConfig = getSiteDevBaseConfig;
function getSiteDevConfig() {
    return common_1.getWebpackConfig(getSiteDevBaseConfig());
}
exports.getSiteDevConfig = getSiteDevConfig;
