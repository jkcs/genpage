const a = {
    mode: 'production',
    context: 'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment',
    devtool: false,
    node: {
      setImmediate: false,
      process: 'mock',
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    output: {
      path: 'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\lib',
      filename: '[name].js',
      chunkFilename: '[id].js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      alias: {
        '@': 'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\src',
        'vue$': 'vue/dist/vue.runtime.esm.js',
        '@demo': 'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\demo'
      },
      extensions: [
        '.tsx',  '.ts',
        '.mjs',  '.js',
        '.jsx',  '.vue',
        '.json', '.wasm'
      ],
      modules: [
        'node_modules',
        'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\node_modules',
        'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\node_modules\\@vue\\cli-service\\node_modules'
      ],
      plugins: [ [Object] ]
    },
    resolveLoader: {
      modules: [
        'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\node_modules\\@vue\\cli-plugin-typescript\\node_modules',
        'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
        'node_modules',
        'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\node_modules',
        'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\node_modules\\@vue\\cli-service\\node_modules'
      ],
      plugins: [ [Object] ]
    },
    module: {
      noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
      rules: [
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object]
      ]
    },
    optimization: {
      splitChunks: { cacheGroups: [Object] },
      minimizer: [ [TerserPlugin] ],
      namedModules: false
    },
    plugins: [
      VueLoaderPlugin(),
      DefinePlugin(),
      CaseSensitivePathsPlugin(),
      FriendlyErrorsWebpackPlugin(),
      MiniCssExtractPlugin(),
      OptimizeCssnanoPlugin(),
      HashedModuleIdsPlugin(),
      NamedChunksPlugin(),
      HtmlWebpackPlugin(),
      PreloadPlugin(),
      PreloadPlugin(),
      CopyPlugin(),
      ForkTsCheckerWebpackPlugin (),
      WebpackBarPlugin()
    ],
    entry: {
      card: 'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\src\\card\\card.tsx',
      overlay: 'D:\\awork\\workspace-tmp\\genpage\\packages\\genpage-aliment\\src\\overlay\\overlay.tsx'
    }
  }