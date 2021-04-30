const AlimentPackage = require('./package.json')

module.exports = function (api) {
  if (api) {
    api.cache.never()
  }

  const { BABEL_MODULE, NODE_ENV } = process.env
  const isTest = NODE_ENV === 'test'
  const useESModules = BABEL_MODULE !== 'commonjs' && !isTest

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: useESModules ? false : 'commonjs',
        },
      ],
      [
        '@vue/babel-preset-jsx',
        {
          functional: false,
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        'transform-define',
        {
          __ALIMENT_VERSION__: AlimentPackage.version,
          __REQUIRED_VUE__: AlimentPackage.peerDependencies.vue,
        },
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: false,
            useESModules,
          },
        ],
        [
          'import',
          {
            libraryName: 'aliment',
            libraryDirectory: useESModules ? 'es' : 'lib',
            style: true,
          },
          'aliment',
        ],
        '@babel/plugin-transform-object-assign'
      ]
    ]
  }
}
